// insight.js — #chronicle / show_gamelog (partial).
// C ref: insight.c do_gamelog / show_gamelog.
//
// Branch envelope: in-progress Logged events NHW_TEXT; empty → pline;
// spoiler filter for !wizard. Final/Major dump path + vanquished deferred.

import { game } from './gstate.js';
import { ECMD_OK, ENL_GAMEINPROGRESS, LL_SPOILER } from './const.js';
import { pline } from './display.js';
import { show_text_pages } from './pager.js';

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

function majorevent(llmsg) {
    return ((llmsg.flags | 0) & LL_MAJORS) !== 0;
}

function spoilerevent(llmsg) {
    return ((llmsg.flags | 0) & LL_SPOILER) !== 0;
}

function wizardMode() {
    return !!(game.flags?.debug || game.flags?.wizard);
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
