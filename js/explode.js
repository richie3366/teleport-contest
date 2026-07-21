// explode.js — Explosion effects (partial).
// C ref: explode.c mon_explodes / explode / explosionmask;
//        zap.c destroy_items / resist / zap_over_floor
//        (D-0949 shopdamage → pay_for_damage; D-0968 AD_FIRE combat).
//
// Branch envelope: AT_BOOM AD_PHYS / AD_FIRE → MON_EXPLODE;
// WAND_CLASS / BURNING_OIL / SCROLL / TRAP_EXPLODE olet preamble;
// adtyp from type; explosionmask Fire_resistance / resists_fire;
// 3x3 zap_over_floor + shop pay; PHYS + AD_FIRE mon/hero damage
// (destroy_items, burnarmor, resist, cold×2 vs fire, Half_phys,
//  exercise A_STR, xkilled/monkilled); wake_nearto.
// Named omissions: AD_COLD/ELEC/… mon/hero combat; hallu rndmonnam;
// sparkle/shield glyphs; ugolemeffects/golemeffects; Invulnerable;
// burn_away_slime; ignite_items body; grabbing/engulf double-damage;
// wake_nearto beyond msleeping; Role_switch damu only for known role pm;
// non-FIRE AT_BOOM spheres (cold/elec/…).

import { game } from './gstate.js';
import { d, rn2 } from './rng.js';
import { pline } from './display.js';
import { cansee } from './vision.js';
import { m_at, setmangry } from './mon.js';
import { Monnam } from './do_name.js';
import { maybe_half_phys } from './hack.js';
import { exercise, A_STR } from './attrib.js';
import {
    isok, u_at, PHYS_EXPL_TYPE, MON_EXPLODE, EXPL_NOXIOUS, EXPL_FIERY,
    STRAT_WAITMASK, KILLED_BY_AN, KILLED_BY, NO_KILLER_PREFIX,
    BURNING_OIL, TRAP_EXPLODE, XKILL_GIVEMSG, XKILL_NOCORPSE, BURNING, DIED,
} from './const.js';
import { pmnames, G_UNIQ, MR_FIRE, MR_COLD } from './monsters.js';
import {
    PM_CLERIC, PM_MONK, PM_WIZARD, PM_HEALER, PM_KNIGHT, monsterNames,
} from './generated/monsters_data.js';
import { WAND_CLASS, SCROLL_CLASS, objectNames, RAY } from './objects.js';

const PM_PAPER_GOLEM = monsterNames.indexOf('PM_PAPER_GOLEM');
const PM_STRAW_GOLEM = monsterNames.indexOf('PM_STRAW_GOLEM');

const AD_PHYS = 0;
const AD_MAGM = 1;
const AD_FIRE = 2;
const AD_COLD = 3;
const AD_DISN = 5;
const AD_ELEC = 6;
const AD_DRST = 7;
const AD_ACID = 8;

/** C ref: explode.c enum explode_action */
const EXPL_NONE = 0;
const EXPL_MON = 1;
const EXPL_HERO = 2;
const EXPL_SKIP = 4;

const WAN_MAGIC_MISSILE = objectNames.indexOf('WAN_MAGIC_MISSILE');
const WAN_DIGGING = objectNames.indexOf('WAN_DIGGING');
const WAN_SLEEP = objectNames.indexOf('WAN_SLEEP');
const POT_OIL = objectNames.indexOf('POT_OIL');
const SCR_FIRE = objectNames.indexOf('SCR_FIRE');

/** C ref: hacklib.c s_suffix */
function s_suffix(s) {
    const buf = String(s ?? '');
    const low = buf.toLowerCase();
    if (low === 'it') return `${buf}s`;
    if (low === 'you') return `${buf}r`;
    if (buf.endsWith('s') || buf.endsWith('S')) return `${buf}'`;
    return `${buf}'s`;
}

/** C ref: permonst pmname — neutral slot for ordinary monsters. */
function pmname_mon(mon) {
    const mndx = mon?.mnum ?? mon?.data?.mndx;
    if (mndx != null && pmnames[mndx]) {
        const pn = pmnames[mndx];
        return pn[2] || pn[0] || pn[1] || 'monster';
    }
    const raw = mon?.data?.name || 'monster';
    return String(raw).replace(/^PM_/, '').replace(/_/g, ' ').toLowerCase();
}

/** C ref: youprop.h Fire_resistance */
function Fire_resistance() {
    const u = game.u || {};
    return !!(u.Fire_resistance || u.HFire_resistance || u.EFire_resistance);
}

/** C ref: monst.h resists_fire / resists_cold */
function mon_resists_bit(mon, mrBit) {
    if (!mon) return false;
    const bits = (mon.data?.mresists | 0)
        | (mon.mextrinsics | 0)
        | (mon.mintrinsics | 0);
    return !!(bits & mrBit);
}
function resists_fire(mon) { return mon_resists_bit(mon, MR_FIRE); }
function resists_cold(mon) { return mon_resists_bit(mon, MR_COLD); }

/** C ref: mondata.c completelyburns — paper/straw golem. */
function completelyburns(data) {
    const mndx = data?.mndx ?? data?.mnum;
    return mndx === PM_PAPER_GOLEM || mndx === PM_STRAW_GOLEM;
}

/**
 * C ref: zap.c resist — burn rn2; MON_EXPLODE oclass uses default alev=ulevel.
 * tell/shield and HP application deferred (caller applies damage; C passes 0).
 */
function resist(mtmp, oclass, damage, tell) {
    void damage;
    void tell;
    void oclass;
    const alev = game.u?.ulevel | 0;
    let dlev = mtmp.m_lev | 0;
    if (dlev > 50) dlev = 50;
    else if (dlev < 1) dlev = 1;
    const mr = mtmp.data?.mr | 0;
    return rn2(100 + alev - dlev) < mr;
}

/** C ref: zap.c ignite_items — body deferred (no RNG). */
function ignite_items(_objchn) {
    // oil lamp / candle ignition deferred
}

/**
 * C ref: explode.c explosionmask — PHYS none; FIRE → Fire_resistance /
 * resists_fire. Other adtyps named omit (no shield).
 */
function explosionmask(m, adtyp, olet) {
    void olet;
    const isHero = !m || m === game.youmonst || m._youmonst;
    if (isHero) {
        switch (adtyp) {
        case AD_PHYS:
            return EXPL_NONE;
        case AD_FIRE:
            return Fire_resistance() ? EXPL_HERO : EXPL_NONE;
        default:
            return EXPL_NONE;
        }
    }
    switch (adtyp) {
    case AD_PHYS:
        return EXPL_NONE;
    case AD_FIRE:
        return resists_fire(m) ? EXPL_MON : EXPL_NONE;
    default:
        return EXPL_NONE;
    }
}

/** C ref: explode.c adtyp_to_expltype */
function adtyp_to_expltype(adtyp) {
    if (adtyp === AD_FIRE) return EXPL_FIERY;
    return EXPL_NOXIOUS; // AD_PHYS / gas spore
}

/** C ref: mon.c wake_nearto — clear sleep in radius (no RNG). */
function wake_nearto(x, y, distance) {
    for (const mtmp of game.fmon || []) {
        if (!mtmp || mtmp.mx == null) continue;
        const dx = (mtmp.mx | 0) - (x | 0);
        const dy = (mtmp.my | 0) - (y | 0);
        if (distance === 0 || dx * dx + dy * dy < distance) {
            mtmp.msleeping = 0;
            const geno = mtmp.data?.geno | 0;
            if (!(geno & G_UNIQ) && mtmp.mstrategy != null) {
                mtmp.mstrategy &= ~STRAT_WAITMASK;
            }
        }
    }
}

function Role_if(pm) {
    return game.urole?.mnum === pm;
}

/**
 * C ref: explode.c explode — PHYS + AD_FIRE mon/hero combat (D-0968) +
 * WAND/SCROLL/OIL/TRAP olet → zap_over_floor + pay_for_damage (D-0949).
 * Visual beam / shield sparkle deferred; other adtyp combat deferred.
 */
export async function explode(x, y, typeIn, dam, olet, _expltype) {
    void _expltype;
    let type = typeIn | 0;
    let damu = dam | 0;
    let uhurt = 0; // 0=unhurt, 1=items only, 2=you+items
    let str = '';
    let exploding_wand_typ = 0;
    const you_exploding = olet === MON_EXPLODE && type >= 0;
    const shopdamage = { v: false };

    // C: olet preamble before adtyp
    if (olet === WAND_CLASS) {
        if (type < 0) {
            type = -type;
            exploding_wand_typ = type | 0;
            const oc = game.objects?.[type];
            if ((oc?.oc_dir | 0) === RAY
                && type !== WAN_DIGGING && type !== WAN_SLEEP) {
                type -= WAN_MAGIC_MISSILE;
                if (type < 0 || type > 9) type = 0;
            } else {
                type = 0;
            }
        }
        if (Role_if(PM_CLERIC) || Role_if(PM_MONK) || Role_if(PM_WIZARD)) {
            damu = Math.trunc(damu / 5);
        } else if (Role_if(PM_HEALER) || Role_if(PM_KNIGHT)) {
            damu = Math.trunc(damu / 2);
        }
    } else if (olet === BURNING_OIL) {
        exploding_wand_typ = POT_OIL;
    } else if (olet === SCROLL_CLASS) {
        exploding_wand_typ = SCR_FIRE;
    } else if (olet === TRAP_EXPLODE) {
        type = 0;
    }

    let adtyp = AD_PHYS;
    if (type === PHYS_EXPL_TYPE) {
        adtyp = AD_PHYS;
    } else {
        switch (Math.abs(type) % 10) {
        case 0: adtyp = AD_MAGM; str = 'magical blast'; break;
        case 1:
            adtyp = AD_FIRE;
            str = olet === BURNING_OIL ? 'burning oil'
                : olet === SCROLL_CLASS ? 'tower of flame'
                    : 'fireball';
            break;
        case 2: adtyp = AD_COLD; str = 'ball of cold'; break;
        case 4:
            adtyp = AD_DISN;
            str = olet === WAND_CLASS ? 'death field' : 'disintegration field';
            break;
        case 5: adtyp = AD_ELEC; str = 'ball of lightning'; break;
        case 6: adtyp = AD_DRST; str = 'poison gas cloud'; break;
        case 7: adtyp = AD_ACID; str = 'splash of acid'; break;
        default:
            adtyp = AD_MAGM;
            str = 'magical blast';
            break;
        }
    }

    if (olet === MON_EXPLODE && !you_exploding) {
        str = game.killer?.name || 'explosion';
    }

    const you = game.youmonst || { _youmonst: true };
    const explmask = [];
    for (let i = 0; i < 3; i++) {
        explmask[i] = [];
        for (let j = 0; j < 3; j++) {
            const xx = x + i - 1;
            const yy = y + j - 1;
            if (!isok(xx, yy)) {
                explmask[i][j] = EXPL_SKIP;
                continue;
            }
            explmask[i][j] = EXPL_NONE;
            if (u_at(xx, yy)) {
                explmask[i][j] = explosionmask(you, adtyp, olet);
            }
            let mtmp = m_at(xx, yy);
            if (!mtmp && u_at(xx, yy)) mtmp = game.u?.usteed;
            if (mtmp && (mtmp.mhp | 0) < 1) mtmp = null;
            if (mtmp) {
                explmask[i][j] |= explosionmask(mtmp, adtyp, olet);
            }
        }
    }

    // Visible blast glyphs / delay deferred
    if (!game.u?.Deaf) {
        await pline('Boom!');
    }

    const inside_engulfer = !!(game.u?.uswallow && type >= 0);
    const { zap_over_floor, destroy_items } = await import('./zap.js');
    const combat_ok = adtyp === AD_PHYS || adtyp === AD_FIRE;

    if (dam) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (explmask[i][j] === EXPL_SKIP) continue;
                const xx = x + i - 1;
                const yy = y + j - 1;
                if (u_at(xx, yy)) {
                    uhurt = ((explmask[i][j] & EXPL_HERO) !== 0) ? 1 : 2;
                    if (!game.context?.mon_moving && you_exploding) uhurt = 0;
                } else if (inside_engulfer) {
                    continue;
                }

                // C: zap_over_floor unless swallowed hero-caused blast
                if (!(game.u?.uswallow && !game.context?.mon_moving)) {
                    await zap_over_floor(
                        xx, yy, type, shopdamage, false, exploding_wand_typ,
                    );
                }

                if (!combat_ok) continue;

                let mtmp = m_at(xx, yy);
                if (!mtmp && u_at(xx, yy)) mtmp = game.u?.usteed;
                if (!mtmp) continue;
                if ((mtmp.mhp | 0) < 1) continue;

                if (cansee(xx, yy)) {
                    await pline(`${Monnam(mtmp)} is caught in the ${str}!`);
                }

                const itemdmg = await destroy_items(mtmp, adtyp, dam);
                if (adtyp === AD_FIRE) {
                    const { burnarmor } = await import('./trap.js');
                    await burnarmor(mtmp);
                    ignite_items(mtmp.minvent);
                }

                if ((explmask[i][j] & EXPL_MON) !== 0) {
                    // golemeffects deferred — shield: item destruction only
                    mtmp.mhp = (mtmp.mhp | 0) - itemdmg;
                } else {
                    let mdam = dam;
                    if (resist(mtmp, olet, 0, false)) {
                        if (cansee(xx, yy) || inside_engulfer) {
                            await pline(
                                `${Monnam(mtmp)} resists the ${str}!`,
                            );
                        }
                        mdam = Math.trunc((dam + 1) / 2);
                    }
                    // grabbed double-damage deferred
                    if (resists_cold(mtmp) && adtyp === AD_FIRE) mdam *= 2;
                    else if (resists_fire(mtmp) && adtyp === AD_COLD) {
                        mdam *= 2;
                    }
                    mtmp.mhp = (mtmp.mhp | 0) - (mdam + itemdmg);
                }

                if ((mtmp.mhp | 0) < 1) {
                    mtmp.mhp = 0;
                    const xkflg = (adtyp === AD_FIRE
                        && completelyburns(mtmp.data))
                        ? XKILL_NOCORPSE
                        : 0;
                    if (!game.context?.mon_moving) {
                        const { xkilled } = await import('./uhitm.js');
                        await xkilled(mtmp, XKILL_GIVEMSG | xkflg);
                    } else {
                        const { monkilled } = await import('./mhitm.js');
                        let how = adtyp;
                        if (xkflg) how = 242; // AD_RBRE — no corpse
                        await monkilled(mtmp, '', how);
                    }
                } else if (!game.context?.mon_moving) {
                    setmangry(mtmp, true);
                }
            }
        }
    }

    if (uhurt && combat_ok) {
        // C: verbose && (type < 0 || olet != SCROLL_CLASS)
        if (game.flags?.verbose !== false
            && (type < 0 || olet !== SCROLL_CLASS)) {
            await pline(`You are caught in the ${str}!`);
        }
        // burn_away_slime / Invulnerable deferred
        if (adtyp === AD_PHYS || adtyp === AD_ACID) {
            damu = maybe_half_phys(damu);
        }
        if (adtyp === AD_FIRE) {
            const { burnarmor } = await import('./trap.js');
            await burnarmor(you);
            ignite_items(game.invent);
        }
        await destroy_items(you, adtyp, dam);
        // ugolemeffects deferred

        const u = game.u;
        if (uhurt === 2 && u) {
            if (u.Upolyd) u.mh = (u.mh | 0) - damu;
            else u.uhp = (u.uhp | 0) - damu;
            if (game.flags) game.flags.botl = true;
            if (game.disp) game.disp.botl = true;
        }

        if (u && ((u.uhp | 0) <= 0 || (u.Upolyd && (u.mh | 0) <= 0))) {
            // Upolyd rehumanize deferred — fatal path as non-poly
            if (!game.killer) game.killer = { name: '', format: 0 };
            if (olet === MON_EXPLODE) {
                if (str && str !== game.killer.name) {
                    game.killer.name = str;
                }
                game.killer.format = KILLED_BY_AN;
            } else if (type >= 0 && olet !== SCROLL_CLASS) {
                game.killer.format = NO_KILLER_PREFIX;
                game.killer.name =
                    `caught himself in his own ${str}`;
            } else {
                const towerOrBall = str === 'tower of flame'
                    || str === 'fireball';
                game.killer.format = towerOrBall ? KILLED_BY_AN : KILLED_BY;
                game.killer.name = str;
            }
            await pline(`The ${str} is fatal.`);
            const { done } = await import('./end.js');
            await done(adtyp === AD_FIRE ? BURNING : DIED);
        }
        exercise(A_STR, false);
    }

    if (shopdamage.v) {
        const { pay_for_damage } = await import('./shk.js');
        const dmgstr = adtyp === AD_FIRE ? 'burn away'
            : adtyp === AD_COLD ? 'shatter'
                : adtyp === AD_DISN ? 'disintegrate'
                    : 'destroy';
        await pay_for_damage(dmgstr, false);
    }

    let i = dam * dam;
    if (i < 50) i = 50;
    if (inside_engulfer) i = Math.trunc((i + 3) / 4);
    wake_nearto(x, y, i);
}

/**
 * C ref: explode.c mon_explodes — roll boom damage, kill if live, explode.
 * Branch envelope: AD_PHYS + AD_FIRE. Other AT_BOOM adtyps deferred.
 */
export async function mon_explodes(mon, mattk) {
    let dmg;
    if (mattk.damn) {
        dmg = d(mattk.damn | 0, mattk.damd | 0);
    } else if (mattk.damd) {
        dmg = d(((mon.data?.mlevel | 0) + 1), mattk.damd | 0);
    } else {
        dmg = 0;
    }

    let type;
    const ad = mattk.adtyp | 0;
    if (ad === AD_PHYS) {
        type = PHYS_EXPL_TYPE;
    } else if (ad === AD_FIRE) {
        // C: type = -((adtyp - 1) + 20) for AD_MAGM..AD_SPC2
        type = -((ad - 1) + 20);
    } else {
        // Non-PHYS / non-FIRE AT_BOOM deferred
        return;
    }

    if ((mon.mhp | 0) >= 1) {
        mon.mhp = 0;
    }

    if (!game.killer) game.killer = {};
    game.killer.name = `${s_suffix(pmname_mon(mon))} explosion`;
    game.killer.format = KILLED_BY_AN;

    await explode(
        mon.mx | 0,
        mon.my | 0,
        type,
        dmg,
        MON_EXPLODE,
        adtyp_to_expltype(ad),
    );

    game.killer.name = '';
}
