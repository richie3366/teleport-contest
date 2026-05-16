// zap_dig.js — dig.c zap_dig() hero wand/spell digging beam (horizontal slice).
// C ref: dig.c zap_dig() (NetHack 5.0); hack.c may_dig(); trap.c conjoined_pits();
//        cmd.c xytodir().
//
// Deferred vs C: tmp_at / nh_delay_output; watch_dig / in_town watchmen; u.uswallow
// and u.dz branches; pit_flow + fillholetyp; full dighole() when digging from a pit.

import { rn1 } from './rng.js';
import { pline, newsym } from './display.js';
import { vision_recalc, cansee } from './vision.js';
import { inTownLikeC } from './hacklib.js';
import { isClosedDoorLoc } from './walkable.js';
import { payAfterHeroDigShopHoleLikeC } from './dig_pay.js';
import { addDamageAt, inRoomsShopbaseRoomnos } from './shop.js';
import {
    isok,
    xdir,
    ydir,
    DIR_ERR,
    DIR_180,
    STONE,
    SCORR,
    CORR,
    ROOM,
    DOOR,
    SDOOR,
    TREE,
    IRONBARS,
    SINK,
    FOUNTAIN,
    THRONE,
    ALTAR,
    STAIRS,
    LADDER,
    DRAWBRIDGE_DOWN,
    DBWALL,
    D_NODOOR,
    W_NONDIGGABLE,
    IS_WALL,
    IS_STWALL,
    IS_OBSTRUCTED,
    IS_POOL,
    IS_LAVA,
    is_pit,
    TT_PIT,
    Is_earthlevel,
    SHOP_DOOR_COST,
    SHOP_WALL_COST,
} from './const.js';

/** C: cmd.c xytodir */
function xyToDir(dx, dy) {
    const x = dx | 0;
    const y = dy | 0;
    for (let dd = 0; dd < 8; dd++) {
        if (x === xdir[dd] && y === ydir[dd]) return dd;
    }
    return DIR_ERR;
}

/** C: trap.c t_at */
function trapAtG(g, x, y) {
    const traps = g.level?.traps;
    if (!traps?.length) return null;
    return traps.find((t) => (t.tx | 0) === (x | 0) && (t.ty | 0) === (y | 0)) ?? null;
}

function isTreeTyp(g, typ) {
    const t = typ | 0;
    if (t === TREE) return true;
    return !!(g.level?.flags?.arboreal && t === STONE);
}

/** C: hack.c may_dig — only meaningful on STWALL / tree + W_NONDIGGABLE */
function mayDigAt(g, x, y) {
    const loc = g.level?.at(x | 0, y | 0);
    if (!loc) return true;
    const typ = loc.typ | 0;
    const wi = loc.wall_info | 0;
    if ((IS_STWALL(typ) || isTreeTyp(g, typ)) && (wi & W_NONDIGGABLE)) return false;
    return true;
}

/**
 * C: trap.c conjoined_pits(trap2, trap1, u_entering_trap2)
 * @param {import('./gstate.js').game} g
 */
function conjoinedPitsLikeC(g, trap2, trap1, uEnteringTrap2) {
    if (!trap1 || !trap2) return false;
    const t1x = trap1.tx | 0;
    const t1y = trap1.ty | 0;
    const t2x = trap2.tx | 0;
    const t2y = trap2.ty | 0;
    if (!isok(t2x, t2y) || !isok(t1x, t1y)) return false;
    if (!is_pit(trap2.ttyp | 0) || !is_pit(trap1.ttyp | 0)) return false;
    const u = g.u;
    if (uEnteringTrap2 && (!(u?.utrap | 0) || (u?.utraptype | 0) !== TT_PIT)) return false;
    const dx = Math.sign(t2x - t1x);
    const dy = Math.sign(t2y - t1y);
    const diridx = xyToDir(dx, dy);
    if (diridx === DIR_ERR) return false;
    const adjidx = DIR_180(diridx);
    const c1 = trap1.conjoined | 0;
    const c2 = trap2.conjoined | 0;
    if ((c1 & (1 << diridx)) && (c2 & (1 << adjidx))) return true;
    return false;
}

function inShopbaseRooms(g, x, y) {
    return inRoomsShopbaseRoomnos(g, x | 0, y | 0).length > 0;
}

/**
 * C: dig.c adj_pit_checks (no RNG).
 * @returns {{ ok: boolean, msg: string }}
 */
function adjPitChecksLikeC(g, cc) {
    const loc = g.level?.at(cc.x | 0, cc.y | 0);
    if (!loc) return { ok: false, msg: '' };
    const ltyp = loc.typ | 0;
    const foundation =
        'The foundation is too hard to dig through from this angle.';
    if (IS_POOL(ltyp) || IS_LAVA(ltyp)) return { ok: false, msg: '' };
    if (isClosedDoorLoc(loc) || ltyp === SDOOR) return { ok: false, msg: foundation };
    if (IS_WALL(ltyp)) return { ok: false, msg: foundation };
    if (isTreeTyp(g, ltyp)) return { ok: false, msg: "The tree's roots glow then fade." };
    if (ltyp === STONE || ltyp === SCORR) {
        if ((loc.wall_info | 0) & W_NONDIGGABLE) {
            return { ok: false, msg: 'The rock glows then fades.' };
        }
    } else if (ltyp === IRONBARS) {
        return { ok: false, msg: 'The bars go much deeper than your pit.' };
    } else if (ltyp === SINK) {
        return { ok: false, msg: 'A tangled mass of plumbing remains below the sink.' };
    } else if (ltyp === STAIRS || ltyp === LADDER) {
        return { ok: false, msg: 'The ladder is unaffected.' };
    } else {
        let supporting = '';
        if (ltyp === FOUNTAIN) supporting = 'fountain';
        else if (ltyp === THRONE) supporting = 'throne';
        else if (ltyp === ALTAR) supporting = 'altar';
        else if (ltyp === DRAWBRIDGE_DOWN || ltyp === DBWALL) supporting = 'drawbridge';
        if (supporting) {
            return {
                ok: false,
                msg: `The ${supporting} supporting structures remain intact.`,
            };
        }
    }
    return { ok: true, msg: '' };
}

/**
 * C: dig.c zap_dig — horizontal beam (**`!u.dz`**) after swallow / vertical early-outs.
 * Shop **`add_damage`** + **`pay_for_damage`** tail via **`dig_pay.js`**.
 *
 * @param {import('./gstate.js').game} g
 */
export async function heroZapDigHorizontalLikeC(g) {
    const u = g.u;
    const lvl = g.level;
    if (!u || !lvl) return;

    /* C: zap_dig — u.uswallow / u.dz branches omit **`rn1(18,8)`**; keep ordering for future wire. */
    if (u.uswallow) return;
    if ((u.dz | 0) !== 0) return;

    let shopdoor = false;
    let shopwall = false;
    const mazeDig = !!(lvl.flags?.is_maze_lev && !Is_earthlevel(u.uz));
    let zx = (u.ux | 0) + (u.dx | 0);
    let zy = (u.uy | 0) + (u.dy | 0);

    let trapWithU = null;
    let pitdig = false;
    if ((u.utrap | 0) && (u.utraptype | 0) === TT_PIT) {
        trapWithU = trapAtG(g, u.ux | 0, u.uy | 0);
        pitdig = !!trapWithU;
    }
    const diridx = pitdig ? xyToDir(u.dx | 0, u.dy | 0) : 8;

    let digdepth = rn1(18, 8);
    let pitflow = false;
    let flowX = -1;
    let flowY = -1;

    while (--digdepth >= 0) {
        if (!isok(zx, zy)) break;
        const loc = lvl.at(zx, zy);
        if (!loc) break;

        if (pitdig) {
            const adjpit = trapAtG(g, zx, zy);
            if (
                diridx !== DIR_ERR
                && !conjoinedPitsLikeC(g, adjpit, trapWithU, false)
            ) {
                digdepth = 0;
                if (!(adjpit && is_pit(adjpit.ttyp | 0))) {
                    const cc = { x: zx, y: zy };
                    const ap = adjPitChecksLikeC(g, cc);
                    if (!ap.ok) {
                        if (ap.msg) await pline(ap.msg);
                    } else {
                        /* C: dighole(TRUE, TRUE, &cc) — terrain + RNG not fully ported */
                    }
                }
                const adjAfter = trapAtG(g, zx, zy);
                if (adjAfter && is_pit(adjAfter.ttyp | 0) && trapWithU) {
                    const adjidx = DIR_180(diridx);
                    if (!trapWithU.conjoined) trapWithU.conjoined = 0;
                    if (!adjAfter.conjoined) adjAfter.conjoined = 0;
                    trapWithU.conjoined |= 1 << diridx;
                    adjAfter.conjoined |= 1 << adjidx;
                    flowX = zx;
                    flowY = zy;
                    pitflow = true;
                }
                const locP = lvl.at(zx, zy);
                const tpool = locP?.typ | 0;
                if (IS_POOL(tpool) || IS_LAVA(tpool)) {
                    flowX = zx - (u.dx | 0);
                    flowY = zy - (u.dy | 0);
                    pitflow = true;
                }
                break;
            }
        } else if (isClosedDoorLoc(loc) || loc.typ === SDOOR) {
            if (inShopbaseRooms(g, zx, zy)) {
                addDamageAt(g, zx, zy, SHOP_DOOR_COST);
                shopdoor = true;
            }
            if (loc.typ === SDOOR) {
                loc.typ = DOOR;
            } else if (cansee(zx, zy)) {
                await pline('The door is razed!');
            }
            loc.doormask = D_NODOOR;
            vision_recalc(1);
            newsym(zx, zy);
            digdepth -= 2;
            if (mazeDig) break;
        } else if (mazeDig) {
            const typ = loc.typ | 0;
            if (IS_WALL(typ)) {
                if (!((loc.wall_info | 0) & W_NONDIGGABLE)) {
                    if (inShopbaseRooms(g, zx, zy)) {
                        addDamageAt(g, zx, zy, SHOP_WALL_COST);
                        shopwall = true;
                    }
                    loc.typ = ROOM;
                    loc.flags = 0;
                    vision_recalc(1);
                    newsym(zx, zy);
                } else if (cansee(zx, zy)) {
                    await pline('The wall glows then fades.');
                }
                break;
            } else if (isTreeTyp(g, typ)) {
                if (!((loc.wall_info | 0) & W_NONDIGGABLE)) {
                    loc.typ = ROOM;
                    loc.flags = 0;
                    vision_recalc(1);
                    newsym(zx, zy);
                } else if (cansee(zx, zy)) {
                    await pline('The tree shudders but is unharmed.');
                }
                break;
            } else if (typ === STONE || typ === SCORR) {
                if (!((loc.wall_info | 0) & W_NONDIGGABLE)) {
                    loc.typ = CORR;
                    loc.flags = 0;
                    vision_recalc(1);
                    newsym(zx, zy);
                } else if (cansee(zx, zy)) {
                    await pline('The rock glows then fades.');
                }
                break;
            }
        } else if (IS_OBSTRUCTED(loc.typ | 0)) {
            if (!mayDigAt(g, zx, zy)) break;
            const typ = loc.typ | 0;
            if (IS_WALL(typ) || typ === SDOOR) {
                if (inShopbaseRooms(g, zx, zy)) {
                    addDamageAt(g, zx, zy, SHOP_WALL_COST);
                    shopwall = true;
                }
                if (lvl.flags?.is_cavernous_lev && !inTownLikeC(g, zx, zy)) {
                    loc.typ = CORR;
                    loc.flags = 0;
                } else {
                    loc.typ = DOOR;
                    loc.doormask = D_NODOOR;
                }
                digdepth -= 2;
            } else if (isTreeTyp(g, typ)) {
                loc.typ = ROOM;
                loc.flags = 0;
                digdepth -= 2;
            } else {
                loc.typ = CORR;
                loc.flags = 0;
                digdepth--;
            }
            vision_recalc(1);
            newsym(zx, zy);
        }
        zx += u.dx | 0;
        zy += u.dy | 0;
    }

    /* C: pit_flow(flow_x, flow_y) after tmp_at end — deferred (pitflow / fillholetyp). */
    void pitflow;
    void flowX;
    void flowY;

    await payAfterHeroDigShopHoleLikeC(g, shopdoor, shopwall);
}
