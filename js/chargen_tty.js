// chargen_tty.js — Tty splash + askname + role/race/gender + ynaq confirmation.
// C ref: win/tty/wintty.c tty_init_nhwindows (copyright @ y=4, blank, curs y=11), tty_askname;
// src/version.c copyright_banner_line; include/patchlevel.h COPYRIGHT_BANNER_*;
// role.c genl_player_setup / build_plselection_prompt; role.c setup_rolemenu /
// reset_role_filtering / role_menu_extra(RS_filter, '~').

import { nhgetch } from './input.js';
import {
    COPYRIGHT_BANNER_A,
    COPYRIGHT_BANNER_B,
    COPYRIGHT_BANNER_C,
    COPYRIGHT_BANNER_D,
} from './const.js';
import { NO_COLOR, ATR_INVERSE } from './terminal.js';
import { roles, races, aligns, genders } from './roles.js';
import {
    rigidRoleChecksJs,
    ROLE_NONE,
    ROLE_RANDOM,
    PICK_RANDOM,
    clearChargenRfilterLikeC,
    trySetrolefilterTokenLikeC,
    gotChargenRfilterLikeC,
    resetFilterMenuRoleRowOkLikeC,
    resetFilterMenuRaceRowOkLikeC,
    resetFilterMenuGendRowOkLikeC,
    resetFilterMenuAlignRowOkLikeC,
    okRaceJs,
    okGendJs,
    okAlignJs,
    okRoleJs,
    pickRoleJs,
    pickRaceJs,
    pickGendJs,
    pickAlignJs,
} from './chargen_rigid.js';
import { applyIdentityFromNethackrc } from './chargen.js';

const MENU_COL = 41;

/** C wintty.c tty_init_nhwindows: tty_curs(BASE_WINDOW,1,4) then 4×copyright + blank. */
const TTY_COPYRIGHT_START_ROW = 4;
/** One blank line after the four copyright rows (C tty_putstr empty before display). */
const TTY_POST_COPYRIGHT_BLANK_ROW = 8;
/** C tty_curs(BASE_WINDOW,1,11) — default row for chargen / [ynaq] (y is 0-based in tty_curs). */
const TTY_CHARSEL_DEFAULT_ROW = 11;
/** Line under the [ynaq] prompt for the typed-name recap (after Enter in tty_askname). */
const WHO_ARE_YOU_RECAP_ROW = 12;

/** C clearrolefilter at each chargen top (new name / restart). */
export function resetChargenRfilter() {
    clearChargenRfilterLikeC();
}

function filterMenuExtraLine() {
    return `~ - ${gotChargenRfilterLikeC() ? 'Reset' : 'Set'} role/race/&c filtering`;
}

/**
 * C reset_role_filtering end_menu prompt (role.c ~2754–2755).
 */
function paintResetRoleFilterHelpOverlay(disp) {
    for (let r = 1; r <= 8; r++) disp.clearRow(r);
    const lines = [
        'Pick all facets you want marked UNACCEPTABLE (C PICK_ANY).',
        'Toggled [x] entries are excluded like setrolefilter() after Enter.',
        gotChargenRfilterLikeC()
            ? 'C also allows unpicking entries that no longer apply.'
            :         'Empty selection after Enter clears all filters (C n==0).',
        '',
        'Accelerators match role.c setup_*menu(FALSE): roles a/A, races H…',
        'Keys: < > scroll  Enter apply  ESC cancel (no filter/facet change) — any key…',
    ];
    for (let i = 0; i < lines.length; i++) {
        const t = lines[i].length > 80 ? lines[i].slice(0, 80) : lines[i];
        disp.putstr(0, 1 + i, t, NO_COLOR);
    }
}

/** @returns {{ key: string, token: string, label: string, section: string }[]} */
function buildResetFilterMenuEntriesLikeC() {
    /** @type {{ key: string, token: string, label: string, section: string }[]} */
    const entries = [];
    let lastch = '\x00';
    for (let ri = 0; ri < roles.length; ri++) {
        const r = roles[ri];
        let thisch = lowc(r.name.m[0]);
        if (thisch === lastch) thisch = highc(r.name.m[0]);
        lastch = thisch;
        let label = r.name.m;
        if (r.name.f && r.name.f !== r.name.m) label = `${r.name.m}/${r.name.f}`;
        entries.push({ key: thisch, token: r.name.m, label, section: 'roles' });
    }
    for (let rai = 0; rai < races.length; rai++) {
        const rc = races[rai];
        const thisch = highc(rc.name[0]);
        entries.push({ key: thisch, token: rc.name, label: rc.name, section: 'races' });
    }
    for (let gi = 0; gi < genders.length; gi++) {
        const g = genders[gi];
        const thisch = highc(g.name[0]);
        entries.push({ key: thisch, token: g.name, label: g.name, section: 'genders' });
    }
    for (let ai = 0; ai < aligns.length; ai++) {
        const a = aligns[ai];
        const thisch = highc(a.name[0]);
        entries.push({ key: thisch, token: a.name, label: a.name, section: 'aligns' });
    }

    const used = new Set();
    const spare = '0123456789';
    let si = 0;
    for (const e of entries) {
        let k = e.key;
        while (used.has(k)) {
            k = spare[si++] ?? '?';
        }
        used.add(k);
        e.key = k;
    }
    return entries;
}

/**
 * C role.c reset_role_filtering() + select_menu(PICK_ANY): Enter applies
 * (n>=0 → clearrolefilter, setrolefilter per selected, ROLE=RACE=GEND=ALGN=NONE);
 * ESC → n<0 skips that block (filters and facets unchanged). Return (n>0).
 * Accelerators: setup_*menu(FALSE) (plus collision fallback digits).
 * @param {import('./game_display.js').GameDisplay} disp
 * @param {{ initrole: number, initrace: number, initgend: number, initalign: number }} f
 * @returns {Promise<boolean>} C truth value: true iff applied with at least one selection.
 */
async function runResetRoleFilteringMenuLikeC(disp, f) {
    const entries = buildResetFilterMenuEntriesLikeC();

    const selected = new Set();
    for (let ri = 0; ri < roles.length; ri++) {
        if (!resetFilterMenuRoleRowOkLikeC(ri)) selected.add(roles[ri].name.m);
    }
    for (let rai = 0; rai < races.length; rai++) {
        if (!resetFilterMenuRaceRowOkLikeC(rai)) selected.add(races[rai].name);
    }
    for (let gi = 0; gi < genders.length; gi++) {
        if (!resetFilterMenuGendRowOkLikeC(gi)) selected.add(genders[gi].name);
    }
    for (let ai = 0; ai < aligns.length; ai++) {
        if (!resetFilterMenuAlignRowOkLikeC(ai)) selected.add(aligns[ai].name);
    }

    const keyToToken = new Map();
    for (const e of entries) {
        keyToToken.set(e.key, e.token);
    }

    const VIEW_H = 16;
    const maxScroll = Math.max(0, entries.length - VIEW_H);
    let scroll = 0;
    let applied = false;
    /** C select_menu count n (selected rows) at apply time. */
    let nApplied = 0;

    for (;;) {
        disp.clearScreen();
        disp.putstr(0, 0, 'reset_role_filtering (C role.c) — unacceptable facets', NO_COLOR);
        disp.putstr(0, 1, 'Rl…=facet  ?=help  < > | C accel setup_*menu(FALSE)', NO_COLOR);
        let row = 2;
        for (let j = 0; j < VIEW_H && scroll + j < entries.length; j++) {
            const e = entries[scroll + j];
            const mark = selected.has(e.token) ? '[x]' : '[ ]';
            const tag = e.section === 'roles' ? 'Rl'
                : e.section === 'races' ? 'Rc'
                    : e.section === 'genders' ? 'Gn'
                        : 'Al';
            disp.putstr(0, row, `${tag} ${e.key} ${mark} ${e.label}`, NO_COLOR);
            row++;
        }
        const foot = maxScroll > 0
            ? `Enter apply  ESC cancel (C n<0) — scroll ${scroll + 1}/${maxScroll + 1}`
            : 'Enter apply  ESC cancel (C n<0) — C end_menu';
        disp.putstr(0, 22, foot.length > 80 ? foot.slice(0, 80) : foot, NO_COLOR);
        disp.putstr(0, 23, '', NO_COLOR);
        disp.cursorVisible = true;
        disp.setCursor(0, 23);

        const c = await nhgetch();
        if (c === 27) break;
        if (c === 13 || c === 10) {
            applied = true;
            nApplied = selected.size;
            clearChargenRfilterLikeC();
            for (const e of entries) {
                if (selected.has(e.token)) trySetrolefilterTokenLikeC(e.token);
            }
            break;
        }
        if (c === 63) {
            paintResetRoleFilterHelpOverlay(disp);
            await nhgetch();
            continue;
        }
        if (c === 62 || c === 46) {
            if (scroll < maxScroll) scroll++;
            continue;
        }
        if (c === 60 || c === 44) {
            if (scroll > 0) scroll--;
            continue;
        }
        const inch = String.fromCodePoint(c);
        const tok = keyToToken.get(inch);
        if (tok) {
            if (selected.has(tok)) selected.delete(tok);
            else selected.add(tok);
        }
    }

    if (applied) {
        f.initrole = ROLE_NONE;
        f.initrace = ROLE_NONE;
        f.initgend = ROLE_NONE;
        f.initalign = ROLE_NONE;
        return nApplied > 0;
    }
    return false;
}

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

/** C version.c copyright_banner_line(indx); indx 3 ↔ nomakedefs.copyright_banner_c → const.js. */
function copyrightBannerLineLikeC(indx) {
    switch (indx) {
        case 1:
            return COPYRIGHT_BANNER_A;
        case 2:
            return COPYRIGHT_BANNER_B;
        case 3:
            return COPYRIGHT_BANNER_C;
        case 4:
            return COPYRIGHT_BANNER_D;
        default:
            return '';
    }
}

/** C wintty: tty_putstr(BASE_WINDOW, 0, copyright_banner_line(i)) for i in 1..4. */
function paintCopyrightAt(disp, startRow = TTY_COPYRIGHT_START_ROW) {
    for (let i = 0; i < 4; i++) {
        const line = copyrightBannerLineLikeC(i + 1);
        const t = line.length > 80 ? line.slice(0, 80) : line;
        disp.putstr(0, startRow + i, t, NO_COLOR);
    }
}

function paintChargenCopyrightBlockLikeC(disp) {
    paintCopyrightAt(disp, TTY_COPYRIGHT_START_ROW);
    disp.clearRow(TTY_POST_COPYRIGHT_BLANK_ROW);
}

/** C tty_askname initial + per-char echo. */
export async function ttyAsknameLikeC(disp, g) {
    disp.clearScreen();
    paintChargenCopyrightBlockLikeC(disp);
    /* C: static const char who_are_you[] = "Who are you? "; */
    const prompt = 'Who are you? ';
    disp.putstr(0, TTY_CHARSEL_DEFAULT_ROW, prompt, NO_COLOR);
    disp.cursorVisible = true;
    disp.setCursor(prompt.length, TTY_CHARSEL_DEFAULT_ROW);
    let buf = '';
    for (;;) {
        const c = await nhgetch();
        if (c === 13 || c === 10) break;
        if (c === 27) {
            buf = '';
            disp.clearRow(TTY_CHARSEL_DEFAULT_ROW);
            disp.putstr(0, TTY_CHARSEL_DEFAULT_ROW, prompt, NO_COLOR);
            disp.setCursor(prompt.length, TTY_CHARSEL_DEFAULT_ROW);
            continue;
        }
        if (c === 8 || c === 127) {
            if (buf.length) {
                buf = buf.slice(0, -1);
                disp.putstr(prompt.length, TTY_CHARSEL_DEFAULT_ROW, `${buf} `, NO_COLOR);
                disp.setCursor(prompt.length + buf.length, TTY_CHARSEL_DEFAULT_ROW);
            }
            continue;
        }
        let ch = String.fromCodePoint(c);
        if (ch !== '-' && ch !== '@') {
            if (!/[a-zA-Z]/.test(ch) && !(ch >= '0' && ch <= '9' && buf.length > 0)) ch = '_';
        }
        if (buf.length < 31) buf += ch;
        disp.putstr(prompt.length, TTY_CHARSEL_DEFAULT_ROW, buf, NO_COLOR);
        disp.setCursor(prompt.length + buf.length, TTY_CHARSEL_DEFAULT_ROW);
    }
    g.plname = buf || 'X';
}

export function paintPostNameYnaqScreen(disp, plname) {
    const p0 = buildShallPickPrompt();
    disp.clearScreen();
    /* Rows 0–3 left empty like C (room for early topline-style prompts). */
    paintChargenCopyrightBlockLikeC(disp);
    disp.putstr(0, TTY_CHARSEL_DEFAULT_ROW, p0, NO_COLOR);
    disp.setCursor(p0.length, TTY_CHARSEL_DEFAULT_ROW);
    disp.putstr(0, WHO_ARE_YOU_RECAP_ROW, `Who are you? ${plname}`, NO_COLOR);
}

/** C role.c genl_player_setup comment on [ynaq] after name (~2248–2254). */
function paintYnaqHelpOverlay(disp) {
    for (let r = 1; r <= 8; r++) disp.clearRow(r);
    const lines = [
        'y (or space/enter) — game picks role, race, gender, align; then confirm',
        'n — you pick each facet from the role/race/gender/align menus',
        "a (or @ or *) — random all four, skip confirm (C 'a' / randomall)",
        'q (or escape) — quit character creation',
        '',
        'Press any key to return to the prompt...',
    ];
    for (let i = 0; i < lines.length; i++) {
        const t = lines[i].length > 80 ? lines[i].slice(0, 80) : lines[i];
        disp.putstr(0, 1 + i, t, NO_COLOR);
    }
}

/** C confirm [ynaq] one-line gloss (role.c confirmation loop ~2675–2677 PICK_ONE). */
function paintConfirmYnaqHelpOverlay(disp) {
    for (let r = 1; r <= 6; r++) disp.clearRow(r);
    const lines = [
        'y (or space/enter) — start game (C preselected y / n==0 default)',
        'n — pick role again from the role menu',
        'a — choose a different name (back to Who are you?)',
        'q / escape — quit',
        '',
        'Press any key...',
    ];
    for (let i = 0; i < lines.length; i++) {
        disp.putstr(MENU_COL, 1 + i, lines[i].length > 40 ? lines[i].slice(0, 40) : lines[i], NO_COLOR);
    }
}

/**
 * C genl_player_setup [ynaq] loop (role.c ~2260); tty shows prompt at wintty default row 11.
 * @param {import('./game_display.js').GameDisplay} disp
 * @param {string} plname
 */
export async function readYnaqPick4u(disp, plname) {
    for (;;) {
        const c = await nhgetch();
        let k = lowc(String.fromCodePoint(c));
        if (k === '\x1b' || k === 'q') return 'q';
        if (k === '?') {
            paintYnaqHelpOverlay(disp);
            await nhgetch();
            paintPostNameYnaqScreen(disp, plname);
            continue;
        }
        if (k === ' ' || k === '\n' || k === '\r') k = 'y';
        else if (k === '@' || k === '*') k = 'a';
        if (k === 'y' || k === 'n' || k === 'a') return k;
    }
}

function roleMenuEntries(f) {
    const rai = f.initrace >= 0 ? f.initrace : ROLE_RANDOM;
    const gi = f.initgend >= 0 ? f.initgend : ROLE_RANDOM;
    const ai = f.initalign >= 0 ? f.initalign : ROLE_RANDOM;
    const out = [];
    let lastch = '\x00';
    for (let i = 0; i < roles.length; i++) {
        if (!okRoleJs(i, rai, gi, ai) || !okRaceJs(i, rai, gi, ai) || !okGendJs(i, rai, gi, ai) || !okAlignJs(i, rai, gi, ai)) {
            continue;
        }
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

export function paintRoleMenu(disp, f) {
    disp.clearScreen();
    disp.putstr(0, 0, ' ', NO_COLOR);
    disp.putstr(1, 0, 'Pick a role or profession', NO_COLOR, ATR_INVERSE);
    disp.putstr(0, 2, ' <role> <race> <gender> <alignment>', NO_COLOR);
    let row = 4;
    for (const e of roleMenuEntries(f)) {
        disp.putstr(0, row, ` ${e.ch} - ${e.art} ${e.label}`, NO_COLOR);
        row++;
    }
    const extras = [
        '* * Random',
        '/ - Pick race first',
        '" - Pick gender first',
        '[ - Pick alignment first',
        filterMenuExtraLine(),
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
    const an = f.initalign >= 0 ? aligns[f.initalign].name : '<alignment>';
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
    disp.putstr(MENU_COL, row, filterMenuExtraLine(), NO_COLOR);
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
        if (k === '~') {
            f.initrace = ROLE_NONE;
            const repickRole = await runResetRoleFilteringMenuLikeC(disp, f);
            if (!repickRole) f.chargenResumePick = 'race';
            continue;
        }
        if (k === '\x1b' || k === 'q') throw new Error('Player quit race menu');
        if (k === '*') {
            const t = pickRaceJs(f.initrole, f.initgend, f.initalign, PICK_RANDOM);
            if (t !== ROLE_NONE) return t;
            continue;
        }
        if (map.has(k)) return /** @type {number} */ (map.get(k));
    }
}

function paintGenderMenu(disp, f) {
    rigidRoleChecksJs(f);
    disp.clearScreen();
    disp.putstr(MENU_COL, 0, 'Pick a gender or sex', NO_COLOR, ATR_INVERSE);
    const rn = roleNameForDisplay(f.initrole, f.initgend);
    const raceNoun = f.initrace >= 0 ? races[f.initrace].name : '<race>';
    const an = f.initalign >= 0 ? aligns[f.initalign].name : '<alignment>';
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
    disp.putstr(MENU_COL, row, filterMenuExtraLine(), NO_COLOR);
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
        if (k === '~') {
            f.initgend = ROLE_NONE;
            const repickRole = await runResetRoleFilteringMenuLikeC(disp, f);
            if (!repickRole) f.chargenResumePick = 'gender';
            continue;
        }
        if (k === '\x1b' || k === 'q') throw new Error('Player quit gender menu');
        if (k === '*') {
            const t = pickGendJs(f.initrole, f.initrace, f.initalign, PICK_RANDOM);
            if (t !== ROLE_NONE) return t;
            continue;
        }
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
    disp.putstr(MENU_COL, row, filterMenuExtraLine(), NO_COLOR);
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
        if (k === '~') {
            f.initalign = ROLE_NONE;
            const repickRole = await runResetRoleFilteringMenuLikeC(disp, f);
            if (!repickRole) f.chargenResumePick = 'align';
            continue;
        }
        if (k === '\x1b' || k === 'q') throw new Error('Player quit align menu');
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
    const an = f.initalign >= 0 ? aligns[f.initalign].name : '???';
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
        let k = lowc(String.fromCodePoint(c));
        if (k === '?') {
            paintConfirmYnaqHelpOverlay(disp);
            await nhgetch();
            continue;
        }
        /* C: choice = (n>0) ? selected[n-1].a_int : (n==0) ? 1 : -1; space/return = implicit y */
        if (k === '\x1b') return 'q';
        if (k === ' ' || k === '\n' || k === '\r') return 'y';
        if (k === 'y' || k === 'a' || k === 'n' || k === 'q') return k;
    }
}

/**
 * C tty role hub: pick role, or `[` / `"` / `/` to pick alignment / gender / race first
 * (setup_rolemenu) before the role letter.
 * @param {import('./game_display.js').GameDisplay} disp
 * @param {{ initrole: number, initrace: number, initgend: number, initalign: number,
 *   chargenResumePick?: 'race' | 'gender' | 'align' }} f
 */
async function pickManualChargenFacets(disp, f) {
    const entries = roleMenuEntries(f);
    const roleByMenuKey = new Map(entries.map((e) => [String(e.ch), e.ri]));
    for (;;) {
        rigidRoleChecksJs(f);
        if (f.initrole !== ROLE_NONE && f.initrace !== ROLE_NONE && f.initgend !== ROLE_NONE && f.initalign !== ROLE_NONE) {
            delete f.chargenResumePick;
            return;
        }

        /* C genl_player_setup: after ~ on race/gender/align, reset() false → nextpick RS_RACE/RS_GENDER/RS_ALGNMNT
         * (skip RS_ROLE block next iteration); true → RS_ROLE (normal hub order). */
        if (f.chargenResumePick === 'race') {
            delete f.chargenResumePick;
            if (f.initrace === ROLE_NONE) {
                f.initrace = await readRaceChoice(disp, f);
                continue;
            }
        }
        if (f.chargenResumePick === 'gender') {
            delete f.chargenResumePick;
            if (f.initgend === ROLE_NONE) {
                f.initgend = await readGenderChoice(disp, f);
                continue;
            }
        }
        if (f.chargenResumePick === 'align') {
            delete f.chargenResumePick;
            if (f.initalign === ROLE_NONE) {
                f.initalign = await readAlignChoice(disp, f);
                continue;
            }
        }

        if (f.initrole === ROLE_NONE) {
            paintRoleMenu(disp, f);
            const c = await nhgetch();
            const kRaw = String.fromCodePoint(c);
            const k = lowc(kRaw);
            if (k === '\x1b' || k === 'q') throw new Error('Player quit role menu');
            if (k === '~') {
                f.initrole = ROLE_NONE;
                await runResetRoleFilteringMenuLikeC(disp, f);
                continue;
            }
            if (k === '*') {
                const t = pickRoleJs(
                    f.initrace >= 0 ? f.initrace : ROLE_RANDOM,
                    f.initgend >= 0 ? f.initgend : ROLE_RANDOM,
                    f.initalign >= 0 ? f.initalign : ROLE_RANDOM,
                    PICK_RANDOM,
                );
                if (t !== ROLE_NONE) f.initrole = t;
                continue;
            }
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
        resetChargenRfilter();
        await ttyAsknameLikeC(disp, g);
        paintPostNameYnaqScreen(disp, g.plname);
        const pick4u = await readYnaqPick4u(disp, g.plname);
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
