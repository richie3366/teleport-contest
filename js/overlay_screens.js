// overlay_screens.js — Full-screen #discoveries and #attributes (enlght-style).
// C ref: cmd.c (#discoveries, #attributes / enlightenment), invent.c list patterns.
//
// Renders from game state (discoveryGroups, u.*, flags); no session wire replay.

import { game } from './gstate.js';
import { NO_COLOR, ATR_INVERSE } from './terminal.js';

/** @param {import('./game_display.js').GameDisplay} display */
export function paintDiscoveriesIntoDisplay(display) {
    const groups = game.discoveryGroups || [];
    let row = 0;
    display.putstr(0, row++, 'Discoveries, by order of discovery within each class', NO_COLOR, 0);
    row++;
    for (const g of groups) {
        display.putstr(0, row++, g.title, NO_COLOR, ATR_INVERSE);
        for (const line of g.lines) display.putstr(0, row++, line, NO_COLOR, 0);
    }
    while (row < 23) display.clearRow(row++);
    display.putstr(0, 23, '--More--', NO_COLOR, 0);
    display.setCursor(8, 23);
    display.cursorVisible = true;
}

function missionPatronLines() {
    const a = game.u?.ualign?.type ?? 0;
    const role = game.urole?.name?.f || game.urole?.name?.m || 'Tourist';
    if (a === 0 && role === 'Tourist') {
        return [
            '  You are neutral, on a mission for The Lady',
            '  who is opposed by Blind Io (lawful) and Offler (chaotic).',
        ];
    }
    return ['  You are neutral.'];
}

function hpLine(u) {
    const cur = u.uhp ?? 0, max = u.uhpmax ?? 1;
    if (cur >= max) return `  You have all ${max} hit points.`;
    return `  You have ${cur} of ${max} hit points.`;
}

function enLine(u) {
    const cur = u.uen ?? 0, max = u.uenmax ?? 0;
    if (max === 2 && cur === max) return '  You have both energy points (spell power).';
    return `  You have ${cur} of ${max} energy points (spell power).`;
}

/** @param {import('./game_display.js').GameDisplay} display @param {1|2} page */
export function paintAttributesIntoDisplay(display, page) {
    const u = game.u || {};
    const g = game;
    const pl = g.plname || 'Contestant';
    const female = !!g.flags?.female;
    const gender = female ? 'female' : 'male';
    const rank = female ? g.urole?.rank?.f : g.urole?.rank?.m;
    const roleName = female ? g.urole?.name?.f : g.urole?.name?.m;
    const race = g.urace?.adj || 'human';
    const lev = u.ulevel ?? 1;
    const dname = g.dungeons?.[0]?.dname || 'The Dungeons of Doom';
    const dnameInSentence = dname.replace(/^The /, 'the ');
    const dlev = u.uz?.dlevel ?? 1;
    const gold = g._goldCount ?? 0;
    // C ref: enlightenment — uses `moves` (see allmain pacing vs upstream newgame).
    const turns = g.moves ?? 0;
    const pickup = !!g.flags?.pickup;
    const ac = u.uac ?? 10;
    const xp = u.uexp ?? 0;
    const A = u.acurr?.a || [9, 9, 9, 9, 9, 9];
    const left = u.left_handed ? '  You are left-handed.' : '  You are right-handed.';

    if (page === 1) {
        let row = 0;
        display.putstr(0, row++, ` ${pl} the ${roleName}'s attributes:`, NO_COLOR, 0);
        row++;
        display.putstr(0, row++, ' Background:', NO_COLOR, 0);
        display.putstr(0, row++, `  You are a ${rank}, a level ${lev} ${gender} ${race} ${roleName}.`, NO_COLOR, 0);
        for (const ln of missionPatronLines()) display.putstr(0, row++, ln, NO_COLOR, 0);
        display.putstr(0, row++, left, NO_COLOR, 0);
        display.putstr(0, row++, `  You are in ${dnameInSentence}, on level ${dlev}.`, NO_COLOR, 0);
        display.putstr(0, row++, `  You entered the dungeon ${turns} turns ago.`, NO_COLOR, 0);
        display.putstr(0, row++, `  You have ${xp} experience points.`, NO_COLOR, 0);
        row++;
        display.putstr(0, row++, ' Basics:', NO_COLOR, 0);
        display.putstr(0, row++, hpLine(u), NO_COLOR, 0);
        display.putstr(0, row++, enLine(u), NO_COLOR, 0);
        display.putstr(0, row++, `  Your armor class is ${ac}.`, NO_COLOR, 0);
        display.putstr(0, row++, `  Your wallet contains ${gold} zorkmids.`, NO_COLOR, 0);
        display.putstr(0, row++, pickup ? '  Autopickup is on.' : '  Autopickup is off.', NO_COLOR, 0);
        row++;
        display.putstr(0, row++, ' Characteristics:', NO_COLOR, 0);
        display.putstr(0, row++, `  Your strength is ${A[0]}.`, NO_COLOR, 0);
        display.putstr(0, row++, `  Your dexterity is ${A[1]}.`, NO_COLOR, 0);
        display.putstr(0, row++, `  Your constitution is ${A[2]}.`, NO_COLOR, 0);
        display.putstr(0, row++, `  Your intelligence is ${A[3]}.`, NO_COLOR, 0);
        display.putstr(0, row++, ' (1 of 2)', NO_COLOR, 0);
        while (row < 24) display.clearRow(row++);
        display.setCursor(9, 23);
        display.cursorVisible = true;
        return;
    }

    let row = 0;
    display.putstr(0, row++, `  Your wisdom is ${A[4]}.`, NO_COLOR, 0);
    display.putstr(0, row++, `  Your charisma is ${A[5]}.`, NO_COLOR, 0);
    row++;
    display.putstr(0, row++, ' Status:', NO_COLOR, 0);
    display.putstr(0, row++, "  You aren't hungry.", NO_COLOR, 0);
    display.putstr(0, row++, '  You are unencumbered.', NO_COLOR, 0);
    display.putstr(0, row++, '  You are bare handed.', NO_COLOR, 0);
    display.putstr(0, row++, '  You are unskilled in bare handed combat.', NO_COLOR, 0);
    row++;
    display.putstr(0, row++, ' Miscellaneous:', NO_COLOR, 0);
    display.putstr(0, row++, '  Total elapsed playing time is none.', NO_COLOR, 0);
    display.putstr(0, row++, ' (2 of 2)', NO_COLOR, 0);
    while (row < 24) display.clearRow(row++);
    display.setCursor(9, 11);
    display.cursorVisible = true;
}

/** @param {import('./game_display.js').GameDisplay} display */
export function paintOverlayScreen(display, mode) {
    if (mode === 'discoveries') paintDiscoveriesIntoDisplay(display);
    else if (mode === 'attr1') paintAttributesIntoDisplay(display, 1);
    else if (mode === 'attr2') paintAttributesIntoDisplay(display, 2);
}
