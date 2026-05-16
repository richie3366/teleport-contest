// attack.js — Hero vs monster melee (stub until uhitm.c).
// C ref: hack.c do_attack(), uhitm.c

import { game } from './gstate.js';
import { rn2 } from './rng.js';
import { pline } from './display.js';
import { overexertHpIfEncumberedPlines } from './eat_hunger.js';
import { useSkill } from './u_init_skills.js';
import { weaponType } from './weapon_kind.js';
import { P_NONE, P_BARE_HANDED_COMBAT } from './const.js';

/** @param {{ monnam?: string, data?: { mname?: string } }} mtmp */
function monsterName(mtmp) {
    if (mtmp?.monnam) return mtmp.monnam;
    const n = mtmp?.data?.mname;
    return n || 'monster';
}

function meleeWeaponSkill() {
    const sk = weaponType(game.u?.uwep);
    if (sk === P_NONE) return P_BARE_HANDED_COMBAT;
    return sk;
}

/**
 * C: domove → do_attack / uhitm — bump into adjacent monster.
 * Hunger: allmain moveloop_core runs gethungry() after moves++; use
 * overexertHpIfEncumberedPlines only (no double gethungry).
 * Peaceful: no hit / no practice (subset of uhitm).
 * Damage: stub 1 + rn2(4); removes mtmp from level.monsters at 0 hp (no corpse).
 * @param {{ mpeaceful?: number, mhp?: number, mx?: number, my?: number, monnam?: string, data?: { mname?: string } }} mtmp
 */
export async function doBumpMeleeAttack(mtmp) {
    if (!mtmp) return;
    if (mtmp.mpeaceful | 0) {
        await pline('You stop to avoid hitting the peaceful creature.');
        return;
    }
    const who = monsterName(mtmp);
    await pline(`You hit the ${who}.`);
    const dmg = 1 + rn2(4);
    mtmp.mhp = (mtmp.mhp | 0) - dmg;
    useSkill(game.u, meleeWeaponSkill(), 1);

    if ((mtmp.mhp | 0) <= 0) {
        const arr = game.level?.monsters;
        if (arr) {
            const i = arr.indexOf(mtmp);
            if (i >= 0) arr.splice(i, 1);
        }
        await pline('You kill it!');
    }
    for (const line of overexertHpIfEncumberedPlines()) await pline(line);
}
