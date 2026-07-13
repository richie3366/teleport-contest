// insight.js — #chronicle / #conduct (partial).
// C ref: insight.c do_gamelog / show_gamelog / doconduct / show_conduct.
//
// Branch envelope:
//   chronicle: in-progress Logged events NHW_TEXT; empty → pline;
//              spoiler filter for !wizard. Final/Major dump deferred.
//   conduct: in-progress NHW_MENU Voluntary challenges (ENL_GAMEINPROGRESS);
//            uroleplay reroll/blind/deaf/pauper/nudist; food/vegan/veg;
//            gnostic/weaphit/killer/literate/pets; num_genocides;
//            polypiles/polyselfs/wishes(+wisharti); sokoban_in_play;
//            wizard count detail lines. show_achievements only when
//            final||wizard (deferred body). Final disclosure path deferred.

import { game } from './gstate.js';
import {
    ACH_SOKO,
    ECMD_OK,
    ENL_GAMEINPROGRESS,
    G_GENOD,
    LL_SPOILER,
    LOW_PM,
} from './const.js';
import { pline } from './display.js';
import { show_text_pages, show_nhw_menu_text } from './pager.js';
import { NUMMONS } from './monsters.js';

/** C LL_majors — only used for final dumplog path (deferred). */
const LL_MAJORS =
    0x0001 | // LL_WISH
    0x0002 | // LL_ACHIEVE
    0x0004 | // LL_UMONST
    0x0008 | // LL_DIVINEGIFT
    0x0010 | // LL_LIFESAVE
    0x0040 | // LL_ARTIFACT
    0x0080 | // LL_GENOCIDE
    0x4000;  // LL_DUMP

const You_ = 'You ';
const have = 'have ';
const were = 'were ';
const have_been = 'have been ';
const have_never = 'have never ';
const never = 'never ';

const CONTRA = [
    [' are not ', " aren't "],
    [' were not ', " weren't "],
    [' have not ', " haven't "],
    [' had not ', " hadn't "],
    [' can not ', " can't "],
    [' could not ', " couldn't "],
];

function majorevent(llmsg) {
    return ((llmsg.flags | 0) & LL_MAJORS) !== 0;
}

function spoilerevent(llmsg) {
    return ((llmsg.flags | 0) & LL_SPOILER) !== 0;
}

function wizardMode() {
    return !!(game.flags?.debug || game.flags?.wizard);
}

function plur(n) {
    return (n | 0) === 1 ? '' : 's';
}

/** C ref: insight.c N_times */
function N_times(n) {
    switch (n | 0) {
        case 1: return 'once';
        case 2: return 'twice';
        case 3: return 'thrice';
        default: return `${n | 0} times`;
    }
}

/**
 * C ref: insight.c enlght_line + contractions.
 * Builds " %s%s%s%s." then contracts " not " forms.
 */
function enlght_line(start, middle, end, ps) {
    let buf = ` ${start}${middle}${end}${ps}.`;
    if (buf.includes(' not ')) {
        for (const [from, to] of CONTRA) {
            if (buf.includes(from)) buf = buf.split(from).join(to);
        }
    }
    return buf;
}

/** C ref: insight.c enl_msg macro — present vs past by final. */
function enl_msg(final, prefix, present, past, suffix, ps = '') {
    return enlght_line(prefix, final ? past : present, suffix, ps);
}

function you_have_been(final, goodthing) {
    return enl_msg(final, You_, have_been, were, goodthing, '');
}

function you_have_never(final, badthing) {
    return enl_msg(final, You_, have_never, never, badthing, '');
}

function you_have_X(final, something) {
    return enl_msg(final, You_, have, '', something, '');
}

/** C ref: insight.c num_genocides */
function num_genocides() {
    const mv = game.mvitals || [];
    let n = 0;
    for (let i = LOW_PM; i < NUMMONS; i++) {
        if (((mv[i]?.mvflags ?? 0) & G_GENOD) !== 0) n++;
    }
    return n;
}

/** C ref: insight.c sokoban_in_play — ACH_SOKO in u.uachieved */
function sokoban_in_play() {
    const ach = game.u?.uachieved;
    if (!ach) return false;
    for (let i = 0; ach[i]; i++) {
        if ((ach[i] | 0) === ACH_SOKO) return true;
    }
    return false;
}

/**
 * C ref: insight.c show_achievements — empty unless final||wizard.
 * Achievement list body deferred.
 */
function show_achievements_lines(final) {
    if (!final && !wizardMode()) return [];
    // count_achievements / ordered disclosure deferred
    return [];
}

/**
 * C ref: insight.c show_gamelog — NHW_TEXT journal.
 * final==0 → "Logged events:"; else "Major events:" + majors only.
 */
export async function show_gamelog(final) {
    const lines = [];
    lines.push(`${final ? 'Major' : 'Logged'} events:`);
    let eventcnt = 0;
    const list = game.gamelog || [];
    for (const llmsg of list) {
        if (final && !majorevent(llmsg)) continue;
        if (!final && !wizardMode() && spoilerevent(llmsg)) continue;
        if (!eventcnt++) lines.push(' Turn');
        const turn = String(llmsg.turn | 0).padStart(5, ' ');
        lines.push(`${turn}: ${llmsg.text}`);
    }
    if (!eventcnt) lines.push(' none');
    await show_text_pages(lines, { moreAtEnd: true });
}

/**
 * C ref: insight.c do_gamelog (#chronicle).
 */
export async function do_gamelog() {
    if (game.gamelog && game.gamelog.length) {
        await show_gamelog(ENL_GAMEINPROGRESS);
    } else {
        await pline('No chronicled events.');
    }
    return ECMD_OK;
}

/**
 * C ref: insight.c show_conduct — NHW_MENU "Voluntary challenges:".
 * @param {number} final ENL_GAMEINPROGRESS / GAMEOVER*
 */
export async function show_conduct(final) {
    const u = game.u || {};
    if (!u.uconduct) u.uconduct = {};
    if (!u.uroleplay) u.uroleplay = {};
    const c = u.uconduct;
    const rp = u.uroleplay;
    const wiz = wizardMode();
    const lines = [];

    lines.push('Voluntary challenges:');

    // rerolling (always past-tense wording in C)
    if (!rp.reroll) {
        lines.push(' Character rerolling was not enabled.');
    } else if (!(rp.numrerolls | 0)) {
        lines.push(' Your character was not rerolled.');
    } else {
        lines.push(` Your character was rerolled ${N_times(rp.numrerolls)}.`);
    }

    if (rp.blind) lines.push(you_have_been(final, 'blind from birth'));
    if (rp.deaf) lines.push(you_have_been(final, 'deaf from birth'));
    if (rp.pauper) {
        const invent = game.invent;
        lines.push(enl_msg(
            final,
            You_,
            invent ? 'started' : 'are',
            'started out',
            ' without possessions',
            '',
        ));
    }
    if (rp.nudist) lines.push(you_have_been(final, 'faithfully nudist'));

    if (!(c.food | 0)) {
        lines.push(enl_msg(final, You_, 'have gone', 'went', ' without food', ''));
    } else if (!(c.unvegan | 0)) {
        lines.push(you_have_X(final, 'followed a strict vegan diet'));
    } else if (!(c.unvegetarian | 0)) {
        lines.push(you_have_been(final, 'vegetarian'));
    }

    if (!(c.gnostic | 0)) lines.push(you_have_been(final, 'an atheist'));

    if (!(c.weaphit | 0)) {
        lines.push(you_have_never(final, 'hit with a wielded weapon'));
    } else if (wiz) {
        const n = c.weaphit | 0;
        lines.push(you_have_X(final, `hit with a wielded weapon ${n} time${plur(n)}`));
    }

    if (!(c.killer | 0)) lines.push(you_have_been(final, 'a pacifist'));

    if (!(c.literate | 0)) {
        lines.push(you_have_been(final, 'illiterate'));
    } else if (wiz) {
        const n = c.literate | 0;
        lines.push(you_have_X(final, `read items or engraved ${n} time${plur(n)}`));
    }

    if (!(c.pets | 0)) lines.push(you_have_never(final, 'had a pet'));

    const ngenocided = num_genocides();
    if (ngenocided === 0) {
        lines.push(you_have_never(final, 'genocided any monsters'));
    } else {
        lines.push(you_have_X(
            final,
            `genocided ${ngenocided} type${plur(ngenocided)} of monster${plur(ngenocided)}`,
        ));
    }

    if (!(c.polypiles | 0)) {
        lines.push(you_have_never(final, 'polymorphed an object'));
    } else if (wiz) {
        const n = c.polypiles | 0;
        lines.push(you_have_X(final, `polymorphed ${n} item${plur(n)}`));
    }

    if (!(c.polyselfs | 0)) {
        lines.push(you_have_never(final, 'changed form'));
    } else if (wiz) {
        const n = c.polyselfs | 0;
        lines.push(you_have_X(final, `changed form ${n} time${plur(n)}`));
    }

    if (!(c.wishes | 0)) {
        lines.push(you_have_X(final, 'used no wishes'));
    } else {
        const wishes = c.wishes | 0;
        const wisharti = c.wisharti | 0;
        let buf = `used ${wishes} wish${wishes > 1 ? 'es' : ''}`;
        if (wisharti) {
            if (wisharti === wishes) {
                buf += ` (${wisharti > 2 ? 'all ' : wisharti === 2 ? 'both ' : ''}`;
            } else {
                buf += ` (${wisharti} `;
            }
            buf += `for ${wisharti === 1 ? 'an artifact' : 'artifacts'})`;
        }
        lines.push(you_have_X(final, buf));
        if (!wisharti) {
            lines.push(enl_msg(
                final,
                You_,
                'have not wished',
                'did not wish',
                ' for any artifacts',
                '',
            ));
        }
    }

    if (sokoban_in_play()) {
        let presentverb = 'have violated';
        let pastverb = 'violated';
        let buf;
        if (!(c.sokocheat | 0)) {
            presentverb = 'have not violated';
            pastverb = 'did not violate';
            buf = ' any of the special Sokoban rules';
        } else {
            buf = ` the special Sokoban rules ${N_times(c.sokocheat)}`;
        }
        lines.push(enl_msg(final, You_, presentverb, pastverb, buf, ''));
    }

    for (const L of show_achievements_lines(final)) lines.push(L);

    await show_nhw_menu_text(lines);
}

/**
 * C ref: insight.c doconduct (#conduct).
 */
export async function doconduct() {
    await show_conduct(ENL_GAMEINPROGRESS);
    return ECMD_OK;
}
