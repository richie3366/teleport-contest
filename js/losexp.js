// losexp.js — Experience / max-HP floor helpers (exper.c + attrib.c subset).
// C ref: exper.c losexp(), attrib.c minuhpmax(), setuhpmax(), role.c Goodbye().

import { pline } from './display.js';
import { newuexp } from './explevel.js';
import { resistsDrliHeroLikeC } from './mondata.js';

/**
 * C: role.c Goodbye() — role-specific farewell word before " level N.".
 * @param {object} g
 */
export function goodbyeWordLikeC(g) {
    const abbr = g?.urole?.abbr;
    switch (abbr) {
        case 'Kni':
            return 'Fare thee well';
        case 'Sam':
            return 'Sayonara';
        case 'Tou':
            return 'Aloha';
        case 'Val':
            return 'Farvel';
        default:
            return 'Goodbye';
    }
}

/**
 * C: attrib.c minuhpmax(altmin) — max(u.ulevel, altmin), altmin floored at 1.
 * @param {object} u
 * @param {number} altmin
 */
export function minuhpmaxLikeC(u, altmin) {
    let a = altmin | 0;
    if (a < 1) a = 1;
    return Math.max(u?.ulevel | 0, a);
}

/**
 * C: attrib.c setuhpmax(newmax, even_when_polyd) — human u.uhpmax / u.uhp / u.uhppeak when !Upolyd
 * or even_when_polyd (losexp uses TRUE for clamp calls).
 * @param {object} g
 * @param {number} newmax
 * @param {boolean} evenWhenPolyd
 */
export function setUhpmaxHumanLikeC(g, newmax, evenWhenPolyd) {
    const u = g?.u;
    if (!u) return;
    if ((u.Upolyd | 0) && !evenWhenPolyd) return;
    const nm = newmax | 0;
    if ((u.uhpmax | 0) !== nm) {
        u.uhpmax = nm;
        if ((u.uhppeak | 0) < (u.uhpmax | 0)) u.uhppeak = u.uhpmax | 0;
    }
    if ((u.uhp | 0) > (u.uhpmax | 0)) u.uhp = u.uhpmax | 0;
    g.disp = g.disp || {};
    g.disp.botl = true;
}

/**
 * C: exper.c losexp(drainer) with drainer==NULL — trap.c dofiretrap human branch;
 * not fatal at XL 1; skips poly rehumanize tail until monhp_per_lvl is ported.
 * @param {object} g
 */
export async function losexpNullLikeC(g) {
    const u = g.u;
    if (!u) return;
    if (resistsDrliHeroLikeC(g)) return;

    if ((u.ulevel | 0) > 1) {
        await pline(`${goodbyeWordLikeC(g)} level ${u.ulevel | 0}.`);
    }

    if ((u.ulevel | 0) > 1) {
        u.ulevel = (u.ulevel | 0) - 1;
        /* C: attrib.c adjabil(old, new) — intrinsic strip on XL loss; TODO */
    } else {
        u.uexp = 0;
    }

    const olduhpmax = u.uhpmax | 0;
    const uhpmin = minuhpmaxLikeC(u, 10);
    let num = u.uhpinc?.[u.ulevel | 0] | 0;
    u.uhpmax = (u.uhpmax | 0) - num;
    if ((u.uhpmax | 0) < uhpmin) {
        setUhpmaxHumanLikeC(g, uhpmin, true);
    }
    if ((u.uhpmax | 0) > olduhpmax) {
        setUhpmaxHumanLikeC(g, olduhpmax, true);
    }

    u.uhp = (u.uhp | 0) - num;
    if ((u.uhp | 0) < 1) u.uhp = 1;
    else if ((u.uhp | 0) > (u.uhpmax | 0)) u.uhp = u.uhpmax | 0;

    num = u.ueninc?.[u.ulevel | 0] | 0;
    u.uenmax = Math.max(0, (u.uenmax | 0) - num);
    u.uen = (u.uen | 0) - num;
    if ((u.uen | 0) < 0) u.uen = 0;
    else if ((u.uen | 0) > (u.uenmax | 0)) u.uen = u.uenmax | 0;

    if ((u.uexp | 0) > 0) {
        u.uexp = newuexp(u.ulevel | 0) - 1;
    }

    if (u.Upolyd | 0) {
        /* C: exper.c losexp — monhp_per_lvl, rehumanize; TODO */
    }

    g.disp = g.disp || {};
    g.disp.botl = true;
}
