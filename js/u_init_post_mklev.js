// u_init_post_mklev.js — C u_init.c u_init_role / ini_inv RNG after mklev (allmain.c newgame).
// C ref: allmain.c newgame — mklev, u_on_upstairs, vision_reset, check_special_room(FALSE), makedog,
//        u_init_inventory_attrs().

import { rn2, rnd } from './rng.js';
import { game } from './gstate.js';
import { races } from './roles.js';
import { applyRoleStartingUmoney0 } from './u_init_money.js';
import { initIniInvStub } from './ini_inv_stub.js';
import { applyHiddenGoldToUmoney0 } from './u_init_hidden_gold.js';
import { applyInitAttrPipeline, uInitCarryAttrBoostLikeC } from './u_init_attr.js';
import {
    consumeRogueHumanIniInvUinitRoleRngLikeC,
    consumeSamuraiHumanIniInvUinitRoleRngLikeC,
    consumeValkyrieHumanIniInvUinitRoleRngLikeC,
    consumeKnightHumanIniInvUinitRoleRngLikeC,
    consumeMonkHumanIniInvUinitRoleRngLikeC,
    consumeWizardHumanIniInvUinitRoleRngLikeC,
    consumeArcheologistHumanIniInvUinitRoleRngLikeC,
    consumeHealerHumanIniInvUinitRoleRngLikeC,
    consumePriestHumanIniInvUinitRoleRngLikeC,
    consumeBarbarianHumanIniInvUinitRoleRngLikeC,
    consumeCaveDwellerHumanIniInvUinitRoleRngLikeC,
    consumeRangerHumanIniInvUinitRoleRngLikeC,
    consumeTouristHumanIniInvUinitRoleRngLikeC,
    consumeIniInvWishingDiscoverRngIfLikeC,
    consumeIniInvMoneyRngIfLikeC,
    consumeUInitRaceIniInvAfterRoleLikeC,
} from './u_init_role_rng.js';

/**
 * C: u_init.c `u_init_role()` — role `ini_inv` PRNG only (race tail is separate).
 * @param {import('./gstate.js').game} g
 */
function consumeUInitRoleIniInvCoreLikeC(g) {
    const humanIdx = races.findIndex((r) => r.name === 'human');
    const rog = g.urole?.abbr === 'Rog' && (g.initrace | 0) === humanIdx;
    if (rog) {
        consumeRogueHumanIniInvUinitRoleRngLikeC();
        return;
    }
    const sam = g.urole?.abbr === 'Sam' && (g.initrace | 0) === humanIdx;
    if (sam) {
        consumeSamuraiHumanIniInvUinitRoleRngLikeC();
        return;
    }
    const val = g.urole?.abbr === 'Val' && (g.initrace | 0) === humanIdx;
    if (val) {
        consumeValkyrieHumanIniInvUinitRoleRngLikeC();
        return;
    }
    const kni = g.urole?.abbr === 'Kni' && (g.initrace | 0) === humanIdx;
    if (kni) {
        consumeKnightHumanIniInvUinitRoleRngLikeC();
        return;
    }
    const mon = g.urole?.abbr === 'Mon' && (g.initrace | 0) === humanIdx;
    if (mon) {
        consumeMonkHumanIniInvUinitRoleRngLikeC();
        return;
    }
    /* C: u_init_role PM_WIZARD — ini_inv(Wizard[]) same for all races (race extras in u_init_race). */
    if (g.urole?.abbr === 'Wiz') {
        consumeWizardHumanIniInvUinitRoleRngLikeC();
        return;
    }
    const arc = g.urole?.abbr === 'Arc' && (g.initrace | 0) === humanIdx;
    if (arc) {
        consumeArcheologistHumanIniInvUinitRoleRngLikeC();
        return;
    }
    const hea = g.urole?.abbr === 'Hea' && (g.initrace | 0) === humanIdx;
    if (hea) {
        consumeHealerHumanIniInvUinitRoleRngLikeC();
        return;
    }
    const pri = g.urole?.abbr === 'Pri' && (g.initrace | 0) === humanIdx;
    if (pri) {
        consumePriestHumanIniInvUinitRoleRngLikeC();
        return;
    }
    const bar = g.urole?.abbr === 'Bar' && (g.initrace | 0) === humanIdx;
    if (bar) {
        consumeBarbarianHumanIniInvUinitRoleRngLikeC();
        return;
    }
    const ran = g.urole?.abbr === 'Ran' && (g.initrace | 0) === humanIdx;
    if (ran) {
        consumeRangerHumanIniInvUinitRoleRngLikeC();
        return;
    }
    const tou = g.urole?.abbr === 'Tou' && (g.initrace | 0) === humanIdx;
    if (tou) {
        consumeTouristHumanIniInvUinitRoleRngLikeC();
        return;
    }
    const cav = g.urole?.abbr === 'Cav' && (g.initrace | 0) === humanIdx;
    if (cav) {
        consumeCaveDwellerHumanIniInvUinitRoleRngLikeC();
        return;
    }
    /* Generic u_init_role replay — delete as each role gets u_init_role_rng.js. */
    rn2(20); rnd(2); rn2(6); rn2(11); rn2(10); rn2(10); rn2(100); rn2(20); rn2(1);
    rnd(1000); rnd(2); rn2(6); rnd(1000); rnd(2); rn2(6); rnd(1000); rnd(2); rn2(6); rnd(1000);
    rnd(2); rn2(6); rnd(1000); rnd(2); rn2(6); rnd(1000); rnd(2); rn2(6); rnd(1000); rnd(2);
    rn2(6); rnd(1000); rnd(2); rn2(6); rnd(1000); rnd(2); rn2(6); rnd(1000); rnd(2); rn2(6);
    rn2(3); rn2(4); rn2(5); rn2(7); rn2(8); rn2(11); rn2(15); rn2(16); rn2(21); rn2(15); rn2(10);
    rn2(6); rn2(1); rnd(2); rn2(4); rn2(2); rnd(2); rn2(4); rn2(2); rn2(1); rnd(2); rn2(4);
    rnd(2); rn2(4); rnd(2); rn2(4); rnd(2); rn2(4); rn2(1); rnd(2); rn2(10); rn2(11); rn2(10);
    rn2(10); rn2(1); rnd(2); rn2(70); rn2(1); rn2(1); rnd(2); rn2(1); rn2(25); rn2(25); rn2(25);
    rn2(20); rn2(1); rnd(2);
}

/**
 * C: u_init_role + u_init_race ini_inv PRNG (inside u_init_inventory_attrs after makedog).
 * @param {import('./gstate.js').game} [g]
 */
export function runUInitRoleRngAfterMklevLikeC(g = game) {
    /* C: u_init.c u_init_role — svm.moves = 1L before ini_inv (invent init boundary). */
    g.moves = 1;
    consumeUInitRoleIniInvCoreLikeC(g);
    consumeUInitRaceIniInvAfterRoleLikeC(g);
}

/**
 * C: u_init.c u_init_inventory_attrs() — role/race invent RNG, money, ini_inv, attrs (no skill_init).
 * @param {import('./gstate.js').game} [g]
 */
export function uInitInventoryAttrsLikeC(g = game) {
    runUInitRoleRngAfterMklevLikeC(g);
    applyRoleStartingUmoney0();
    /* C: u_init_inventory_attrs — discover Wishing[] then Money[] (not inside u_init_role). */
    consumeIniInvWishingDiscoverRngIfLikeC(g);
    consumeIniInvMoneyRngIfLikeC(g);
    initIniInvStub(g);
    applyHiddenGoldToUmoney0(g);
    applyInitAttrPipeline(75);
    uInitCarryAttrBoostLikeC(g);
}
