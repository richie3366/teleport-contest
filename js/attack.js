// attack.js — Hero vs monster melee (stub until uhitm.c).
// C ref: hack.c do_attack(), uhitm.c

import { pline } from './display.js';
import { overexertHpIfEncumberedPlines } from './eat_hunger.js';

/**
 * C: domove → do_attack / uhitm — bump into adjacent monster (no damage roll yet).
 * Hunger: allmain moveloop_core already runs gethungry() after moves++; use
 * overexertHpIfEncumberedPlines only (matches overexertion tail without double gethungry).
 * @param {unknown} _mtmp — reserved for mon_nam, hit roll, …
 */
export async function doBumpMeleeAttack(_mtmp) {
    void _mtmp;
    for (const line of overexertHpIfEncumberedPlines()) await pline(line);
}
