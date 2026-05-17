// legacy_intro_paint.js — tty grid for C `com_pager("legacy")` (quest.lua common.legacy).
// Kept separate from display.js to avoid circular imports (display wires status rows).

import { game } from './gstate.js';
import { NO_COLOR } from './terminal.js';
import { rankHeroTitleLikeC } from './roles.js';

/** C role.c pantheon: lgod, ngod, cgod. */
const ROLE_PANTHEON = {
    Arc: ['Quetzalcoatl', 'Camaxtli', 'Huhetotl'],
    Bar: ['Mitra', 'Crom', 'Set'],
    Cav: ['Anu', '_Ishtar', 'Anshar'],
    Hea: ['_Athena', 'Hermes', 'Poseidon'],
    Kni: ['Lugh', '_Brigit', 'Manannan Mac Lir'],
    Mon: ['Shan Lai Ching', 'Chih Sung-tzu', 'Huan Ti'],
    Pri: ['Quetzalcoatl', 'Camaxtli', 'Huhetotl'], /* C role.c: 0,0,0 — pantheon copied from randrole at role_init; stub until Priest pantheon is wired */
    Ran: ['Mercury', '_Venus', 'Mars'],
    Rog: ['Issek', 'Mog', 'Kos'],
    Sam: ['_Amaterasu Omikami', 'Raijin', 'Susanowo'],
    Tou: ['Blind Io', '_The Lady', 'Offler'],
    Val: ['Tyr', 'Odin', 'Loki'],
    Wiz: ['Ptah', 'Thoth', 'Anhur'],
};

function alignGnameLikeC(g) {
    const t = g.u?.ualign?.type ?? 0;
    const abbr = g.urole?.abbr;
    const tri = abbr ? ROLE_PANTHEON[abbr] : null;
    if (!tri) return 'someone';
    let s;
    if (t > 0) s = tri[0];
    else if (t < 0) s = tri[2];
    else s = tri[1];
    if (s.startsWith('_')) s = s.slice(1);
    return s;
}

function alignGtitleLikeC(g) {
    const t = g.u?.ualign?.type ?? 0;
    const abbr = g.urole?.abbr;
    const tri = abbr ? ROLE_PANTHEON[abbr] : null;
    if (!tri) return 'god';
    const gnam = t > 0 ? tri[0] : t < 0 ? tri[2] : tri[1];
    if (gnam && gnam.startsWith('_')) return 'goddess';
    return 'god';
}

function rankTitleAtNewgameLikeC(g) {
    return rankHeroTitleLikeC(g);
}

function substituteLegacyLine(line, g) {
    const d = alignGnameLikeC(g);
    const G = alignGtitleLikeC(g);
    const r = rankTitleAtNewgameLikeC(g);
    return line.replace(/%d/g, d).replace(/%G/g, G).replace(/%r/g, r);
}

const LEGACY_TEMPLATE = `It is written in the Book of %d:

    After the Creation, the cruel god Moloch rebelled
    against the authority of Marduk the Creator.
    Moloch stole from Marduk the most powerful of all
    the artifacts of the gods, the Amulet of Yendor,
    and he hid it in the dark cavities of Gehennom, the
    Under World, where he now lurks, and bides his time.

Your %G %d seeks to possess the Amulet, and with it
to gain deserved ascendance over the other gods.

You, a newly trained %r, have been heralded
from birth as the instrument of %d.  You are destined
to recover the Amulet for your deity, or die in the
attempt.  Your hour of destiny has come.  For the sake
of us all:  Go bravely with %d!`;

const MORE_STR = '--More--';

/**
 * @param {import('./game_display.js').GameDisplay} display
 */
export function paintLegacyIntroIntoDisplay(display) {
    const g = game;
    display.clearScreen();

    const rawLines = LEGACY_TEMPLATE.split('\n');
    const rows = rawLines.map((raw) => substituteLegacyLine(raw.replace(/^\s+/, ''), g));

    let inMoloch = false;
    let r = 0;
    for (const line of rows) {
        if (line.startsWith('After the Creation')) inMoloch = true;
        if (line) {
            const col = inMoloch ? 27 : 23;
            display.putstr(col, r, line, NO_COLOR, 0);
        }
        if (line.includes('bides his time.')) inMoloch = false;
        r++;
    }

    display.putstr(23, r, MORE_STR, NO_COLOR, 0);
    display.setCursor(23 + MORE_STR.length, r);
    display.cursorVisible = true;
}
