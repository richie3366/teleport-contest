// chargen_tty.js — Tty splash + askname + role/race/gender + ynaq confirmation.
// C ref: win/tty/wintty.c tty_askname; role.c genl_player_setup / build_plselection_prompt;
// role.c setup_rolemenu / setup_racemenu / setup_gendmenu.

import { nhgetch } from './input.js';
import { NO_COLOR, ATR_INVERSE } from './terminal.js';
import { roles, races, aligns, genders } from './roles.js';
import {
    rigidRoleChecksJs,
    ROLE_NONE,
    ROLE_RANDOM,
    PICK_RANDOM,
    okRaceJs,
    okGendJs,
    okAlignJs,
    pickRoleJs,
    pickRaceJs,
    pickGendJs,
    pickAlignJs,
} from './chargen_rigid.js';
import { applyIdentityFromNethackrc } from './chargen.js';

const COPYRIGHT_A = 'NetHack, Copyright 1985-2026';
const COPYRIGHT_B = 'By Stichting Mathematisch Centrum and M. Stephenson.';
const COPYRIGHT_D = 'See license for details.';
const COPYRIGHT_C = 'Version 5.0.0 (NetHack 5.0 port)';

const MENU_COL = 41;
const NAME_ROW = 12;

function lowc(ch) {
    return ch.toLowerCase();
}
function highc(ch) {
    return ch === ch.toLowerCase() ? ch.toUpperCase() : ch.toLowerCase();
}

/** C build_plselection_prompt when all four facets unspecified (strsubst applied). */
export function buildShallPickPrompt() {
    return "Shall I pick character's race, role, gender and alignment for you? [ynaq]";
}

export function needsFullInteractiveChargen(opts) {
    return !opts.explicitRoleInRc;
}

/** Role (and usually race/align) fixed in rc but name must be typed — C askname(). */
export function needsAsknameOnly(opts) {
    return opts.explicitRoleInRc && !opts.explicitNameInRc;
}

function paintCopyrightAt(disp, startRow) {
    disp.putstr(0, startRow, COPYRIGHT_A, NO_COLOR);
    disp.putstr(9, startRow + 1, COPYRIGHT_B, NO_COLOR);
    disp.putstr(9, startRow + 2, COPYRIGHT_C, NO_COLOR);
    disp.putstr(9, startRow + 3, COPYRIGHT_D, NO_COLOR);
}

/** C tty_askname initial + per-char echo. */
export async function ttyAsknameLikeC(disp, g) {
    disp.clearScreen();
    paintCopyrightAt(disp, 4);
    const prompt = 'Who are you?';
    disp.putstr(0, NAME_ROW, prompt, NO_COLOR);
    disp.cursorVisible = true;
    disp.setCursor(prompt.length, NAME_ROW);
    let buf = '';
    for (;;) {
        const c = await nhgetch();
        if (c === 13 || c === 10) break;
        if (c === 27) {
            buf = '';
            disp.clearRow(NAME_ROW);
            disp.putstr(0, NAME_ROW, prompt, NO_COLOR);
            disp.setCursor(prompt.length, NAME_ROW);
            continue;
        }
        if (c === 8 || c === 127) {
            if (buf.length) {
                buf = buf.slice(0, -1);
                disp.putstr(prompt.length, NAME_ROW, `${buf} `, NO_COLOR);
                disp.setCursor(prompt.length + buf.length, NAME_ROW);
            }
            continue;
        }
        let ch = String.fromCodePoint(c);
        if (ch !== '-' && ch !== '@') {
            if (!/[a-zA-Z]/.test(ch) && !(ch >= '0' && ch <= '9' && buf.length > 0)) ch = '_';
        }
        if (buf.length < 31) buf += ch;
        disp.putstr(prompt.length, NAME_ROW, buf, NO_COLOR);
        disp.setCursor(prompt.length + buf.length, NAME_ROW);
    }
    g.plname = buf || 'X';
}

export function paintPostNameYnaqScreen(disp, plname) {
    const p0 = buildShallPickPrompt();
    disp.clearScreen();
    disp.putstr(0, 0, p0, NO_COLOR);
    disp.setCursor(p0.length, 0);
    paintCopyrightAt(disp, 4);
    disp.putstr(0, NAME_ROW, `Who are you? ${plname}`, NO_COLOR);
}

/** C yn_function for [ynaq] after name (role.c ~2260). */
export async function readYnaqPick4u() {
    for (;;) {
        const c = await nhgetch();
        let k = lowc(String.fromCodePoint(c));
        if (k === '\x1b' || k === 'q') return 'q';
        if (k === ' ' || k === '\n' || k === '\r') k = 'y';
        else if (k === '@' || k === '*') k = 'a';
        if (k === 'y' || k === 'n' || k === 'a') return k;
    }
}

function roleMenuEntries() {
    const out = [];
    let lastch = '\x00';
    for (let i = 0; i < roles.length; i++) {
        let ch = lowc(roles[i].name.m[0]);
        if (ch === lastch) ch = highc(roles[i].name.m[0]);
        lastch = lowc(ch);
        let label = roles[i].name.m;
        if (roles[i].name.f && roles[i].name.f !== roles[i].name.m) {
            label = `${roles[i].name.m}/${roles[i].name.f}`;
        }
        const art = /^[aeiou]/i.test(label) ? 'an' : 'a';
        out.push({ ri: i, ch, label, art });
    }
    return out;
}

export function paintRoleMenu(disp) {
    disp.clearScreen();
    disp.putstr(0, 0, ' ', NO_COLOR);
    disp.putstr(1, 0, 'Pick a role or profession', NO_COLOR, ATR_INVERSE);
    disp.putstr(0, 2, ' <role> <race> <gender> <alignment>', NO_COLOR);
    let row = 4;
    for (const e of roleMenuEntries()) {
        disp.putstr(0, row, ` ${e.ch} - ${e.art} ${e.label}`, NO_COLOR);
        row++;
    }
    const extras = [
        '* * Random',
        '/ - Pick race first',
        '" - Pick gender first',
        '[ - Pick alignment first',
        '~ - Set role/race/&c filtering',
        'q - Quit',
        '(end)',
    ];
    for (const line of extras) {
        disp.putstr(0, row, ` ${line}`, NO_COLOR);
        row++;
    }
    disp.cursorVisible = true;
    disp.setCursor(0, 23);
}

function roleNameForDisplay(ri, gi) {
    const r = roles[ri];
    if (!r) return '<role>';
    if (gi === 1 && r.name.f) return r.name.f;
    return r.name.m;
}

function paintRaceMenu(disp, f) {
    rigidRoleChecksJs(f);
    disp.clearScreen();
    disp.putstr(MENU_COL, 0, 'Pick a race or species', NO_COLOR, ATR_INVERSE);
    const rn = roleNameForDisplay(f.initrole, f.initgend);
    const an = f.initalign >= 0 ? aligns[f.initalign].adj : '<alignment>';
    disp.putstr(MENU_COL, 2, `${rn} <race> <gender> ${an}`, NO_COLOR);
    let row = 4;
    for (let i = 0; i < races.length; i++) {
        if (!okRaceJs(f.initrole, i, f.initgend, f.initalign)) continue;
        const ch = races[i].name[0];
        disp.putstr(MENU_COL, row, `${ch} - ${races[i].name}`, NO_COLOR);
        row++;
    }
    disp.putstr(MENU_COL, row, '* * Random', NO_COLOR);
    row++;
    disp.putstr(MENU_COL, row, '', NO_COLOR);
    row++;
    disp.putstr(MENU_COL, row, '? - Pick another role first', NO_COLOR);
    row++;
    disp.putstr(MENU_COL, row, '" - Pick gender first', NO_COLOR);
    row++;
    disp.putstr(45, row, 'role forces chaotic', NO_COLOR);
    row++;
    disp.putstr(MENU_COL, row, '~ - Set role/race/&c filtering', NO_COLOR);
    row++;
    disp.putstr(MENU_COL, row, 'q - Quit', NO_COLOR);
    row++;
    disp.putstr(MENU_COL, row, '(end)', NO_COLOR);
    disp.cursorVisible = true;
    disp.setCursor(MENU_COL, 23);
}

async function readRaceChoice(disp, f) {
    const valid = [];
    for (let i = 0; i < races.length; i++) {
        if (okRaceJs(f.initrole, i, f.initgend, f.initalign)) valid.push({ i, ch: races[i].name[0] });
    }
    if (valid.length === 1) return valid[0].i;
    const map = new Map(valid.map((v) => [lowc(String(v.ch)), v.i]));
    for (;;) {
        paintRaceMenu(disp, f);
        const c = await nhgetch();
        const k = lowc(String.fromCodePoint(c));
        if (map.has(k)) return /** @type {number} */ (map.get(k));
    }
}

function paintGenderMenu(disp, f) {
    rigidRoleChecksJs(f);
    disp.clearScreen();
    disp.putstr(MENU_COL, 0, 'Pick a gender or sex', NO_COLOR, ATR_INVERSE);
    const rn = roleNameForDisplay(f.initrole, f.initgend);
    const raceNoun = f.initrace >= 0 ? races[f.initrace].name : '<race>';
    const an = f.initalign >= 0 ? aligns[f.initalign].adj : '<alignment>';
    disp.putstr(MENU_COL, 2, `${rn} ${raceNoun} <gender> ${an}`, NO_COLOR);
    let row = 4;
    disp.putstr(MENU_COL, row, 'm - male', NO_COLOR);
    row++;
    disp.putstr(MENU_COL, row, 'f - female', NO_COLOR);
    row++;
    disp.putstr(MENU_COL, row, '* * Random', NO_COLOR);
    row++;
    disp.putstr(MENU_COL, row, '', NO_COLOR);
    row++;
    disp.putstr(MENU_COL, row, '? - Pick another role first', NO_COLOR);
    row++;
    disp.putstr(MENU_COL, row, '/ - Pick another race first', NO_COLOR);
    row++;
    disp.putstr(45, row, 'role forces chaotic', NO_COLOR);
    row++;
    disp.putstr(MENU_COL, row, '~ - Set role/race/&c filtering', NO_COLOR);
    row++;
    disp.putstr(MENU_COL, row, 'q - Quit', NO_COLOR);
    row++;
    disp.putstr(MENU_COL, row, '(end)', NO_COLOR);
    disp.cursorVisible = true;
    disp.setCursor(MENU_COL, 23);
}

async function readGenderChoice(disp, f) {
    const valid = [];
    for (let gi = 0; gi < genders.length; gi++) {
        if (okGendJs(f.initrole, f.initrace, gi, f.initalign)) valid.push(gi);
    }
    if (valid.length === 1) return valid[0];
    const map = new Map([
        ['m', 0],
        ['f', 1],
    ]);
    for (;;) {
        paintGenderMenu(disp, f);
        const c = await nhgetch();
        const k = lowc(String.fromCodePoint(c));
        if (map.has(k) && valid.includes(/** @type {number} */ (map.get(k)))) return /** @type {number} */ (map.get(k));
    }
}

/** First key NetHack tty uses for each alignment row (lawful / neutral / chaotic). */
const ALIGN_MENU_KEYS = ['l', 'n', 'c'];

function paintAlignMenu(disp, f) {
    rigidRoleChecksJs(f);
    disp.clearScreen();
    disp.putstr(MENU_COL, 0, 'Pick an alignment', NO_COLOR, ATR_INVERSE);
    const rn = roleNameForDisplay(f.initrole, f.initgend);
    const raceNoun = f.initrace >= 0 ? races[f.initrace].name : '<race>';
    const gd = f.initgend === 1 ? 'female' : 'male';
    disp.putstr(MENU_COL, 2, `${rn} ${raceNoun} ${gd} <alignment>`, NO_COLOR);
    let row = 4;
    for (let ai = 0; ai < aligns.length; ai++) {
        if (!okAlignJs(f.initrole, f.initrace, f.initgend, ai)) continue;
        const ch = ALIGN_MENU_KEYS[ai];
        disp.putstr(MENU_COL, row, `${ch} - ${aligns[ai].name}`, NO_COLOR);
        row++;
    }
    disp.putstr(MENU_COL, row, '* * Random', NO_COLOR);
    row++;
    disp.putstr(MENU_COL, row, '', NO_COLOR);
    row++;
    disp.putstr(MENU_COL, row, '? - Pick another role first', NO_COLOR);
    row++;
    disp.putstr(MENU_COL, row, '/ - Pick another race first', NO_COLOR);
    row++;
    disp.putstr(MENU_COL, row, '" - Pick another gender first', NO_COLOR);
    row++;
    disp.putstr(MENU_COL, row, '~ - Set role/race/&c filtering', NO_COLOR);
    row++;
    disp.putstr(MENU_COL, row, 'q - Quit', NO_COLOR);
    row++;
    disp.putstr(MENU_COL, row, '(end)', NO_COLOR);
    disp.cursorVisible = true;
    disp.setCursor(MENU_COL, 23);
}

async function readAlignChoice(disp, f) {
    const valid = [];
    for (let ai = 0; ai < aligns.length; ai++) {
        if (okAlignJs(f.initrole, f.initrace, f.initgend, ai)) valid.push(ai);
    }
    if (valid.length === 1) return valid[0];
    const map = new Map(valid.map((ai) => [ALIGN_MENU_KEYS[ai], ai]));
    for (;;) {
        paintAlignMenu(disp, f);
        const c = await nhgetch();
        const k = lowc(String.fromCodePoint(c));
        if (k === '*') {
            const t = pickAlignJs(f.initrole, f.initrace, f.initgend, PICK_RANDOM);
            if (t !== ROLE_NONE) return t;
            continue;
        }
        if (map.has(k)) return /** @type {number} */ (map.get(k));
    }
}

function paintConfirmMenu(disp, f, plname) {
    rigidRoleChecksJs(f);
    disp.clearScreen();
    disp.putstr(MENU_COL, 0, 'Is this ok? [ynaq]', NO_COLOR, ATR_INVERSE);
    const rn = roleNameForDisplay(f.initrole, f.initgend);
    const raceAdj = f.initrace >= 0 ? races[f.initrace].adj : '???';
    const gd = f.initgend === 1 ? 'female' : 'male';
    const an = f.initalign >= 0 ? aligns[f.initalign].adj : '???';
    disp.putstr(MENU_COL, 2, `${plname} the ${an} ${gd} ${raceAdj} ${rn}`, NO_COLOR);
    let row = 4;
    disp.putstr(MENU_COL, row, 'y * Yes; start game', NO_COLOR);
    row++;
    disp.putstr(MENU_COL, row, 'n - No; choose role again', NO_COLOR);
    row++;
    disp.putstr(MENU_COL, row, 'a - Not yet; choose another name', NO_COLOR);
    row++;
    disp.putstr(MENU_COL, row, 'q - Quit', NO_COLOR);
    row++;
    disp.putstr(MENU_COL, row, '(end)', NO_COLOR);
    disp.cursorVisible = true;
    disp.setCursor(MENU_COL, 23);
}

async function readConfirmAnswer(disp, f, plname) {
    for (;;) {
        paintConfirmMenu(disp, f, plname);
        const c = await nhgetch();
        const k = lowc(String.fromCodePoint(c));
        if (k === 'y' || k === 'a' || k === 'n' || k === 'q' || k === '\x1b') return k;
    }
}

/**
 * C tty role hub: pick role, or `[` / `"` / `/` to pick alignment / gender / race first
 * (setup_rolemenu) before the role letter.
 * @param {import('./game_display.js').GameDisplay} disp
 * @param {{ initrole: number, initrace: number, initgend: number, initalign: number }} f
 */
async function pickManualChargenFacets(disp, f) {
    const entries = roleMenuEntries();
    const roleByMenuKey = new Map(entries.map((e) => [String(e.ch), e.ri]));
    for (;;) {
        rigidRoleChecksJs(f);
        if (f.initrole !== ROLE_NONE && f.initrace !== ROLE_NONE && f.initgend !== ROLE_NONE && f.initalign !== ROLE_NONE) {
            return;
        }

        if (f.initrole === ROLE_NONE) {
            paintRoleMenu(disp);
            const c = await nhgetch();
            const kRaw = String.fromCodePoint(c);
            const k = lowc(kRaw);
            if (k === 'q') throw new Error('Player quit role menu');
            if (k === '[') {
                if (f.initalign === ROLE_NONE) f.initalign = await readAlignChoice(disp, f);
                continue;
            }
            if (k === '"') {
                if (f.initgend === ROLE_NONE) f.initgend = await readGenderChoice(disp, f);
                continue;
            }
            if (k === '/') {
                if (f.initrace === ROLE_NONE) f.initrace = await readRaceChoice(disp, f);
                continue;
            }
            let ri = roleByMenuKey.get(kRaw);
            if (ri === undefined) ri = roleByMenuKey.get(k);
            if (ri === undefined) ri = roleByMenuKey.get(highc(kRaw));
            if (ri !== undefined) {
                f.initrole = ri;
                continue;
            }
            continue;
        }

        if (f.initrace === ROLE_NONE) {
            f.initrace = await readRaceChoice(disp, f);
            continue;
        }
        if (f.initgend === ROLE_NONE) {
            f.initgend = await readGenderChoice(disp, f);
            continue;
        }
        if (f.initalign === ROLE_NONE) {
            f.initalign = await readAlignChoice(disp, f);
            continue;
        }
    }
}

/**
 * Full tty chargen when OPTIONS omits name and/or role.
 * @param {import('./game_display.js').GameDisplay} disp
 * @param {import('./gstate.js').game} g
 * @param {ReturnType<typeof import('./options.js').parseNethackrc>} opts
 */
export async function runInteractiveTtyChargen(disp, g, opts) {
    top: for (;;) {
        await ttyAsknameLikeC(disp, g);
        paintPostNameYnaqScreen(disp, g.plname);
        const pick4u = await readYnaqPick4u();
        if (pick4u === 'q') throw new Error('Player quit during chargen');
        if (pick4u === 'y' || pick4u === 'a') {
            const f = { initrole: ROLE_NONE, initrace: ROLE_NONE, initgend: ROLE_NONE, initalign: ROLE_NONE };
            f.initrole = pickRoleJs(ROLE_RANDOM, ROLE_RANDOM, ROLE_RANDOM, PICK_RANDOM);
            if (f.initrole === ROLE_NONE) throw new Error('pick_role failed');
            rigidRoleChecksJs(f);
            if (f.initrace === ROLE_NONE) f.initrace = pickRaceJs(f.initrole, f.initgend, f.initalign, PICK_RANDOM);
            if (f.initgend === ROLE_NONE) f.initgend = pickGendJs(f.initrole, f.initrace, f.initalign, PICK_RANDOM);
            if (f.initalign === ROLE_NONE) {
                const t = pickAlignJs(f.initrole, f.initrace, f.initgend, PICK_RANDOM);
                if (t !== ROLE_NONE) f.initalign = t;
            }
            if (pick4u === 'a') {
                /* C: skip confirmation for "a" (all random, no confirm). */
                applyChargenFlagsToGame(g, opts, f);
                return;
            }
            const ok = await readConfirmAnswer(disp, f, g.plname);
            if (ok === 'y') {
                applyChargenFlagsToGame(g, opts, f);
                return;
            }
            if (ok === 'q' || ok === '\x1b') throw new Error('Player quit confirm');
            if (ok === 'a') continue top;
            /* 'n': repick random (C: treat as restart ynaq from name). */
            continue top;
        }

        outer: for (;;) {
            const f = { initrole: ROLE_NONE, initrace: ROLE_NONE, initgend: ROLE_NONE, initalign: ROLE_NONE };
            await pickManualChargenFacets(disp, f);
            rigidRoleChecksJs(f);
            const ok = await readConfirmAnswer(disp, f, g.plname);
            if (ok === 'y') {
                applyChargenFlagsToGame(g, opts, f);
                return;
            }
            if (ok === 'q' || ok === '\x1b') throw new Error('Player quit confirm');
            if (ok === 'a') continue top;
            if (ok === 'n') continue outer;
        }
    }
}

function applyChargenFlagsToGame(g, opts, f) {
    if (f.initrole < 0 || f.initrole >= roles.length) throw new Error(`chargen: bad initrole ${f.initrole}`);
    if (f.initrace < 0 || f.initrace >= races.length) throw new Error(`chargen: bad initrace ${f.initrace}`);
    if (f.initalign < 0 || f.initalign >= aligns.length) throw new Error(`chargen: bad initalign ${f.initalign}`);
    const role = roles[f.initrole];
    const race = races[f.initrace];
    const female = f.initgend === 1;
    const align = aligns[f.initalign];
    opts.role = role.abbr;
    opts.race = race.name;
    opts.gender = female ? 'female' : 'male';
    opts.align = align.name;
    opts.name = g.plname;
    opts.explicitNameInRc = true;
    opts.explicitRoleInRc = true;
    applyIdentityFromNethackrc(g, opts);
}
