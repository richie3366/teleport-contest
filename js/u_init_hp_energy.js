// u_init_hp_energy.js — Birth hit points and spell energy from role + race.
// C ref: attrib.c newhp() (u.ulevel == 0 branch), exper.c newpw() (u.ulevel == 0).

import { game } from './gstate.js';
import { rnd } from './rng.js';

/**
 * @param {{ infix: number, inrnd: number, lofix: number, lornd: number, hifix: number, hirnd: number }} adv
 */
function sumRoleAdvance(adv) {
    let n = adv.infix;
    if (adv.inrnd > 0) n += rnd(adv.inrnd);
    return n;
}

/** C: attrib.c newhp — only the u.ulevel == 0 initial-hero path. */
export function newhpInitial() {
    const role = game.urole;
    const race = game.urace;
    if (!role?.hpadv || !race?.hpadv) return 10;
    let hp = sumRoleAdvance(role.hpadv) + sumRoleAdvance(race.hpadv);
    if (hp <= 0) hp = 1;
    return hp;
}

/** C: exper.c newpw — only the u.ulevel == 0 initial-hero path (no enermod). */
export function newpwInitial() {
    const role = game.urole;
    const race = game.urace;
    if (!role?.enadv || !race?.enadv) return 2;
    let en = sumRoleAdvance(role.enadv) + sumRoleAdvance(race.enadv);
    if (en <= 0) en = 1;
    return en;
}

/**
 * C: u_init.c u_init_misc — u.uhp = u.uhpmax = u.uhppeak = newhp();
 * then adjabil(0,1); u.ulevel = 1 (adjabil not ported; caller sets ulevel).
 */
export function applyBirthHpEnergy() {
    const u = game.u;
    if (!u) return;
    const hp = newhpInitial();
    const en = newpwInitial();
    u.uhp = hp;
    u.uhpmax = hp;
    u.uhppeak = hp;
    u.uen = en;
    u.uenmax = en;
    u.uenpeak = en;
}
