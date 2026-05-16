// kick.js — Hero #kick (dokick.c) + shop door billing (shk.c add_damage / pay_for_damage).
// C ref: dokick.c dokick(), kick_door(), kick_dumb(), kick_ouch(), kick_nondoor() tail;
//        mon.c wake_nearby()/wake_nearto(); trap.c b_trapped(); engrave.c u_wipe_engr().

import { nhgetch } from './input.js';
import { pline, newsym } from './display.js';
import { vision_recalc, cansee } from './vision.js';
import { dist2 } from './hacklib.js';
import { acurr, exercise } from './attrib.js';
import { rnd, rn2, rnl } from './rng.js';
import { uWipeEngr } from './engrave.js';
import { floorObjKey } from './floorobj.js';
import { losehp, maybeHalfPhys } from './mthrowu.js';
import { heroPassesWalls } from './walkable.js';
import { permonstHuman, slithy, verysmall } from './mondata.js';
import {
    IS_DOOR,
    D_ISOPEN,
    D_BROKEN,
    D_NODOOR,
    D_TRAPPED,
    isok,
    IS_POOL,
    LAVAWALL,
    OTYP_BOULDER,
    LA_DOWN,
    Is_airlevel,
    RIGHT_SIDE,
    IS_STWALL,
    STAIRS,
    LADDER,
    TT_PIT,
    TT_WEB,
    TT_BEARTRAP,
    SHOP_DOOR_COST,
    PM_LIZARD,
    A_STR,
    A_DEX,
    A_CON,
} from './const.js';
import { nearCapacity, ENC } from './encumbr.js';
import { inRoomsShopbaseRoomnos, addDamageAt, payForDamage } from './shop.js';

/** C: skills.h martial_bonus() — Samurai / Monk only (not boots / sasquatch here). */
function martialBonusRole(g) {
    const a = g.urole?.abbr;
    return a === 'Sam' || a === 'Mon';
}

/** C: dokick.c martial() macro — boots / bigfoot TODO; role martial_bonus matches kick door odds. */
function martialLike(g) {
    return martialBonusRole(g);
}

function heroYoumonstPtr(g) {
    const u = g.u;
    if (!(u?.Upolyd | 0)) return g.urace?.permonst ?? permonstHuman;
    return g.youmonst?.data ?? permonstHuman;
}

function heroNoLegsKick(g) {
    const ptr = heroYoumonstPtr(g);
    const m1 = ptr?.mflags1 | 0;
    /* C: mondata.h M1_NOLIMBS 0x00000400 — monflag.h */
    return (m1 & 0x400) !== 0 || slithy(ptr);
}

function heroBlindLike(g) {
    const u = g.u;
    return !!(u?.ublind || (u?.timed?.blind ?? 0) > 0);
}

function heroDeafLike(g) {
    return ((g.u?.timed?.deaf ?? 0) > 0);
}

function monnamCap(mtmp) {
    const s = mtmp?.monnam || mtmp?.data?.mname || 'monster';
    return s.charAt(0).toUpperCase() + s.slice(1);
}

/** C: mon.c wake_nearby(FALSE) → wake_nearto_core(u.ux,u.uy, u.ulevel*20, FALSE). */
async function wakeNearbyFalseAtHero(g) {
    const u = g.u;
    if (!u) return;
    const ux = u.ux | 0;
    const uy = u.uy | 0;
    const lim = (u.ulevel | 0) * 20;
    const monsters = g.level?.monsters ?? [];
    for (let i = 0; i < monsters.length; i++) {
        const mtmp = monsters[i];
        if (!mtmp || (mtmp.mhp | 0) <= 0) continue;
        if (lim !== 0 && dist2(mtmp.mx | 0, mtmp.my | 0, ux, uy) >= lim) continue;
        if ((mtmp.msleeping | 0) && cansee(mtmp.mx | 0, mtmp.my | 0)) {
            await pline(`${monnamCap(mtmp)} wakes up.`);
        }
        mtmp.msleeping = 0;
    }
}

/** C: mon.c wake_nearto(x,y,5*5) — kick_ouch subset. */
async function wakeNearto5(g, x, y) {
    const monsters = g.level?.monsters ?? [];
    for (let i = 0; i < monsters.length; i++) {
        const mtmp = monsters[i];
        if (!mtmp || (mtmp.mhp | 0) <= 0) continue;
        if (dist2(mtmp.mx | 0, mtmp.my | 0, x | 0, y | 0) >= 25) continue;
        if ((mtmp.msleeping | 0) && cansee(mtmp.mx | 0, mtmp.my | 0)) {
            await pline(`${monnamCap(mtmp)} wakes up.`);
        }
        mtmp.msleeping = 0;
    }
}

const VI_DIRS = Object.freeze({
    h: [-1, 0], l: [1, 0], j: [0, 1], k: [0, -1], y: [-1, -1], u: [1, -1], b: [-1, 1], n: [1, 1],
});

/**
 * C: cmd.c getdir — one keystroke from replay queue (no yn window).
 * @returns {{ dx: number, dy: number }|null} null = cancel / invalid
 */
async function readKickDirectionDelta() {
    const code = await nhgetch();
    if (code === 27) return null;
    const ch = typeof code === 'number' ? String.fromCharCode(code) : String(code);
    const pair = VI_DIRS[ch];
    if (!pair) {
        if (ch === '.') return { dx: 0, dy: 0 };
        return null;
    }
    return { dx: pair[0], dy: pair[1] };
}

/**
 * C: trap.c b_trapped("door", FOOT) — minimal (door trap branch); **`make_stunned`** not ported.
 */
async function bTrappedDoorFootLikeC(g) {
    const dlevel = (g.u?.uz?.dlevel ?? 1) | 0;
    const lvl = dlevel;
    const dmg = rnd(5 + (lvl < 5 ? lvl : 2 + Math.trunc(lvl / 2)));
    await pline('KABOOM!! The door was booby-trapped!');
    await wakeNearbyFalseAtHero(g);
    losehp(maybeHalfPhys(dmg), 'explosion', 0);
    exercise(A_STR, false);
    exercise(A_CON, false);
}

/** C: dokick.c kick_dumb */
async function kickDumbAt(g) {
    exercise(A_DEX, false);
    if (martialLike(g) || acurr(A_DEX) >= 16 || rn2(3)) {
        await pline('You kick at empty space.');
        if (heroBlindLike(g)) {
            /* C: feel_location — newsym enough for harness */
            newsym(g.u.ux | 0, g.u.uy | 0);
        }
    } else {
        await pline('Dumb move! You strain a muscle.');
        exercise(A_STR, false);
        const u = g.u;
        u.wounded_legs = 5 + rnd(5);
        u.wounded_leg_side = RIGHT_SIDE;
    }
    if ((Is_airlevel(g.u?.uz) || (g.u.Levitation | 0)) && rn2(2)) {
        /* C: hurtle(-u.dx,-u.dy,1,TRUE) — not ported; rn2(2) consumed like C guard */
    }
}

/** C: dokick.c kick_ouch(x,y,"") */
async function kickOuchAt(g, x, y) {
    await pline('Ouch! That hurts!');
    exercise(A_DEX, false);
    exercise(A_STR, false);
    if (isok(x, y)) {
        if (heroBlindLike(g)) newsym(x | 0, y | 0);
        await wakeNearto5(g, x | 0, y | 0);
    }
    if (!rn2(3)) {
        g.u.wounded_legs = 5 + rnd(5);
        g.u.wounded_leg_side = RIGHT_SIDE;
    }
    const dmg = rnd(acurr(A_CON) > 15 ? 3 : 5);
    losehp(maybeHalfPhys(dmg), 'kicking something', 0);
    if (Is_airlevel(g.u?.uz) || (g.u.Levitation | 0)) {
        /* C: hurtle — rn1(2,4) inside hurtle; omit full hurtle */
    }
}

/** C: dokick.c kick_door */
async function kickDoorAt(g, x, y, loc, avrgAttrib) {
    const mask = loc.doormask | 0;
    if (mask === D_ISOPEN || mask === D_BROKEN || mask === D_NODOOR) {
        await kickDumbAt(g);
        return;
    }
    if (g.u.Levitation | 0) {
        await pline('Ouch! That hurts!');
        return;
    }

    exercise(A_DEX, true);
    const doorbuster = !!(g.u?.Upolyd | 0) && false; /* is_giant — not ported */
    const shopdoor = inRoomsShopbaseRoomnos(g, x | 0, y | 0).length > 0;

    if (doorbuster || (rnl(35) < avrgAttrib + (!martialLike(g) ? 0 : acurr(A_DEX)))) {
        if (mask & D_TRAPPED) {
            if (g.flags?.verbose) await pline('You kick the door.');
            exercise(A_STR, false);
            loc.doormask = D_NODOOR;
            await bTrappedDoorFootLikeC(g);
        } else if (acurr(A_STR) > 18 && !rn2(5) && !shopdoor) {
            await pline('As you kick the door, it shatters to pieces!');
            exercise(A_STR, true);
            loc.doormask = D_NODOOR;
        } else {
            await pline('As you kick the door, it crashes open!');
            exercise(A_STR, true);
            loc.doormask = D_BROKEN;
        }
        newsym(x | 0, y | 0);
        vision_recalc(1);
        if (shopdoor) {
            addDamageAt(g, x | 0, y | 0, SHOP_DOOR_COST);
            await payForDamage(g, 'break', false);
        }
        /* C: in_town + watchman — not ported (level.has_town stub) */
    } else {
        if (heroBlindLike(g)) newsym(x | 0, y | 0);
        exercise(A_STR, true);
        await pline(`${heroDeafLike(g) || !rn2(3) ? 'Thwack' : 'Whammm'}!!`);
        /* in_town watchman_door_damage — skipped */
    }
}

/** C: dokick.c kick_nondoor — STAIRS/LADDER/STWALL vs default kick_dumb. */
async function kickNondoorTailLikeC(g, x, y, loc, avrgAttrib) {
    void avrgAttrib;
    const typ = loc.typ | 0;
    if (typ === STAIRS || typ === LADDER || IS_STWALL(typ)) {
        if (!IS_STWALL(typ) && (loc.ladder | 0) === LA_DOWN) {
            await kickDumbAt(g);
            return;
        }
        await kickOuchAt(g, x, y);
        return;
    }
    await kickDumbAt(g);
}

function boulderOnHeroTile(g) {
    const u = g.u;
    const k = floorObjKey(u.ux | 0, u.uy | 0);
    const head = g.level?.floorObjHeads?.get(k);
    for (let o = head; o; o = o.nexthere) {
        if ((o.otyp | 0) === OTYP_BOULDER) return true;
    }
    return false;
}

/**
 * C: dokick.c dokick() — getdir, wake_nearby, u_wipe_engr, door / nondoor subset.
 * @param {import('./gstate.js').game} g
 */
export async function dokickFromCmd(g) {
    const u = g.u;
    if (!u || !g.level) {
        g.context.move = 0;
        return;
    }

    let noKick = false;
    const yptr = heroYoumonstPtr(g);

    if (heroNoLegsKick(g)) {
        await pline('You have no legs to kick with.');
        noKick = true;
    } else if (verysmall(yptr)) {
        await pline('You are too small to do any kicking.');
        noKick = true;
    } else if (u.usteed) {
        await pline('You decide not to kick your steed.');
        g.context.move = 0;
        return;
    } else if ((u.wounded_legs | 0) && !u.usteed) {
        await pline('Your legs are in no shape for kicking.');
        noKick = true;
    } else if (nearCapacity() > ENC.SLT_ENCUMBER) {
        await pline('Your load is too heavy to balance yourself for a kick.');
        noKick = true;
    } else if ((u.Upolyd | 0) && (u.umonnum | 0) === PM_LIZARD) {
        await pline('Your legs cannot kick effectively.');
        noKick = true;
    } else if ((u.underwater | 0) && !rn2(2)) {
        await pline("Your slow motion kick doesn't hit anything.");
        noKick = true;
    } else if (u.utrap | 0) {
        noKick = true;
        const tt = u.utraptype | 0;
        if (tt === TT_PIT) {
            if (!heroPassesWalls(g)) {
                await pline("There's not enough room to kick down here.");
            } else {
                noKick = false;
            }
        } else if (tt === TT_WEB || tt === TT_BEARTRAP) {
            await pline("You can't move your leg!");
        }
    } else if (boulderOnHeroTile(g) && !heroPassesWalls(g)) {
        await pline("There's not enough room to kick in here.");
        noKick = true;
    }

    if (noKick) {
        g.context.move = 0;
        return;
    }

    const delta = await readKickDirectionDelta();
    if (delta == null) {
        g.context.move = 0;
        return;
    }
    if (!delta.dx && !delta.dy) {
        g.context.move = 0;
        return;
    }

    u.dx = delta.dx;
    u.dy = delta.dy;

    if (g.u.uswallow) {
        switch (rn2(3)) {
            case 0:
                await pline("You can't move your leg!");
                break;
            default:
                await pline('Your feeble kick has no effect.');
                break;
        }
        g.context.move = 1;
        return;
    }

    if ((u.utrap | 0) && (u.utraptype | 0) === TT_PIT && heroPassesWalls(g)) {
        await pline('You kick at the side of the pit.');
        g.context.move = 1;
        return;
    }

    if (g.u.Levitation | 0) {
        const xx = (u.ux | 0) - delta.dx;
        const yy = (u.uy | 0) - delta.dy;
        const back = isok(xx, yy) ? g.level.at(xx, yy) : null;
        const bt = back?.typ | 0;
        const fk = floorObjKey(xx, yy);
        const backObjs = g.level?.floorObjHeads?.get(fk);
        let backBoulder = false;
        for (let o = backObjs; o; o = o.nexthere) {
            if ((o.otyp | 0) === OTYP_BOULDER) backBoulder = true;
        }
        if (
            isok(xx, yy)
            && !IS_STWALL(bt)
            && !IS_DOOR(bt)
            && (!Is_airlevel(u.uz) || !backBoulder)
        ) {
            await pline('You have nothing to brace yourself against.');
            g.context.move = 0;
            return;
        }
    }

    const x = (u.ux | 0) + delta.dx;
    const y = (u.uy | 0) + delta.dy;
    const mtmp = g.level.monsters?.find((m) => (m.mx | 0) === x && (m.my | 0) === y) ?? null;
    if (mtmp) {
        await pline('You kick at something.');
        g.context.move = 1;
        return;
    }

    await wakeNearbyFalseAtHero(g);
    uWipeEngr(2);

    if (!isok(x, y)) {
        await kickOuchAt(g, x, y);
        g.context.move = 1;
        return;
    }

    const loc = g.level.at(x, y);
    if (!loc) {
        g.context.move = 0;
        return;
    }

    const typ = loc.typ | 0;
    const poolLike = IS_POOL(typ) || typ === LAVAWALL;
    if (poolLike !== !!(u.underwater | 0)) {
        const liq = typ === LAVAWALL ? 'lava' : 'water';
        await pline(`You splash some ${liq} around.`);
        g.context.move = 1;
        return;
    }

    const fk = floorObjKey(x, y);
    if (g.level.floorObjHeads?.get(fk)) {
        await kickOuchAt(g, x, y);
        g.context.move = 1;
        return;
    }

    /* C: KMH kicking boots → avrg_attrib 99 — not ported (no otyp constant wired). */
    const avrg = Math.trunc((acurr(A_STR) + acurr(A_DEX) + acurr(A_CON)) / 3);

    if (IS_DOOR(typ)) await kickDoorAt(g, x, y, loc, avrg);
    else await kickNondoorTailLikeC(g, x, y, loc, avrg);

    g.context.move = 1;
}
