// display.js — Map rendering and terminal output.
// C ref: display.c — newsym, show_glyph, docrt, cls, flush_screen.

import { game } from './gstate.js';
import { cansee } from './vision.js';
import { objects_at } from './mkobj.js';
import { mcolors } from './monsters.js';
import {
    COLNO, ROWNO, STONE, ROOM, CORR, DOOR, STAIRS,
    HWALL, VWALL, TLCORNER, TRCORNER, BLCORNER, BRCORNER,
    CROSSWALL, TUWALL, TDWALL, TLWALL, TRWALL,
    SDOOR, SCORR, POOL, MOAT, WATER, LAVAPOOL, LAVAWALL,
    D_NODOOR, D_ISOPEN, D_CLOSED, D_LOCKED,
} from './const.js';
import {
    ILLOBJ_CLASS, WEAPON_CLASS, ARMOR_CLASS, RING_CLASS, AMULET_CLASS,
    TOOL_CLASS, FOOD_CLASS, POTION_CLASS, SCROLL_CLASS, SPBOOK_CLASS,
    WAND_CLASS, COIN_CLASS, GEM_CLASS, ROCK_CLASS, BALL_CLASS, CHAIN_CLASS,
    VENOM_CLASS, objectNames,
} from './objects.js';
import { NO_COLOR, CLR_GRAY, CLR_BROWN, CLR_WHITE, CLR_YELLOW, DEC_TO_UNICODE } from './terminal.js';

const CORPSE_OTYP = objectNames.indexOf('CORPSE');

// C ref: defsym.h OBJCLASS_DRAWING — default object-class map symbols
const DEF_OC_SYM = {
    [ILLOBJ_CLASS]: ']',
    [WEAPON_CLASS]: ')',
    [ARMOR_CLASS]: '[',
    [RING_CLASS]: '=',
    [AMULET_CLASS]: '"',
    [TOOL_CLASS]: '(',
    [FOOD_CLASS]: '%',
    [POTION_CLASS]: '!',
    [SCROLL_CLASS]: '?',
    [SPBOOK_CLASS]: '+',
    [WAND_CLASS]: '/',
    [COIN_CLASS]: '$',
    [GEM_CLASS]: '*',
    [ROCK_CLASS]: '`',
    [BALL_CLASS]: '0',
    [CHAIN_CLASS]: '_',
    [VENOM_CLASS]: '.',
};

// C ref: defsym.h MONSYM — letter from mlet; color from mons[].mcolor (not mlet).
// HI_DOMESTIC (CLR_WHITE) for pets — color.h.
const MLET_CH = {
    S_DOG: 'd',
    S_FELINE: 'f',
    S_RODENT: 'r',
    S_LIZARD: ':',
    S_HUMAN: '@',
};

function mon_at_display(x, y) {
    for (const m of game.fmon || []) {
        if (m && m.mx === x && m.my === y && (m.mhp == null || m.mhp > 0))
            return m;
    }
    return null;
}

// C ref: display.c map_glyph / mon_color(monsndx) — per-species mcolor.
// Newt is CLR_YELLOW; gecko/lizard are CLR_GREEN — mlet-only color is wrong.
function mon_glyph(mtmp) {
    const mlet = mtmp.data?.mlet || mtmp.mlet;
    const ch = MLET_CH[mlet] || '?';
    if (mtmp.mtame) return { ch, color: CLR_WHITE };
    const mnum = mtmp.mnum ?? mtmp.data?.mndx;
    const color = (mnum != null && mnum >= 0)
        ? (mcolors[mnum] ?? CLR_GRAY)
        : CLR_GRAY;
    return { ch, color };
}

// C ref: display.h covers_objects
function covers_objects(x, y) {
    const loc = game.level?.at(x, y);
    if (!loc) return false;
    const t = loc.typ;
    return t === POOL || t === MOAT || t === WATER || t === LAVAPOOL || t === LAVAWALL;
}

// C ref: display.c map_object / display.h obj_to_glyph + mon_color for corpses
function obj_glyph(obj) {
    const def = game.objects?.[obj.otyp];
    const oclass = obj.oclass ?? def?.oc_class ?? ILLOBJ_CLASS;
    const ch = DEF_OC_SYM[oclass] || ']';
    // C: body glyphs use mon_color(corpsenm), not objects[CORPSE].oc_color
    if (obj.otyp === CORPSE_OTYP && obj.corpsenm != null && obj.corpsenm >= 0) {
        const color = mcolors[obj.corpsenm] ?? def?.oc_color ?? NO_COLOR;
        return { ch, color, dec: false };
    }
    const color = def?.oc_color ?? NO_COLOR;
    return { ch, color, dec: false };
}

// C ref: wintty.h / topl.c — topline --More-- state
const TOPLINE_EMPTY = 0;
const TOPLINE_NEED_MORE = 1;
let _toplines = '';
let _toplin = TOPLINE_EMPTY;
let _win_stop = false;

// ── ANSI color codes ──
// Maps CLR_* constants (0-15) to ANSI SGR color codes.
// C ref: wintty.c term_start_color
const ANSI_DEFAULT = 39;
const ANSI_COLOR = [
    30,  // CLR_BLACK     0
    31,  // CLR_RED       1
    32,  // CLR_GREEN     2
    33,  // CLR_BROWN     3
    34,  // CLR_BLUE      4
    35,  // CLR_MAGENTA   5
    36,  // CLR_CYAN      6
    37,  // CLR_GRAY      7
    39,  // NO_COLOR      8 → default
    91,  // CLR_ORANGE    9
    92,  // CLR_BRIGHT_GREEN  10
    93,  // CLR_YELLOW    11
    94,  // CLR_BRIGHT_BLUE   12
    95,  // CLR_BRIGHT_MAGENTA 13
    96,  // CLR_BRIGHT_CYAN   14
    97,  // CLR_WHITE     15
];

// ── Terrain to display character + color + DEC flag ──
function terrain_glyph(loc, x, y) {
    const typ = loc.typ;
    switch (typ) {
    case STONE:     return { ch: ' ', color: NO_COLOR, dec: false };
    case SCORR:     return { ch: ' ', color: NO_COLOR, dec: false }; // C: like stone until found
    case ROOM:      return { ch: '~', color: NO_COLOR, dec: true };  // DEC middle dot
    case CORR:
        // C: lit_corridor → S_litcorr; same glyph as S_corr → CLR_WHITE
        return {
            ch: '#',
            color: game.flags?.lit_corridor ? CLR_WHITE : NO_COLOR,
            dec: false,
        };
    case DOOR:
        if (loc.doormask & D_ISOPEN) return { ch: '|', color: CLR_BROWN, dec: false };
        if (loc.doormask & (D_CLOSED | D_LOCKED)) return { ch: '+', color: CLR_BROWN, dec: false };
        return { ch: '~', color: NO_COLOR, dec: true };  // D_NODOOR = floor
    case STAIRS:
        // C recordings use CLR_YELLOW for ordinary up/down stairs (matches
        // prior green sessions). defsym.h lists CLR_GRAY; branch stairs yellow.
        if (game.level?.upstair?.x === x && game.level?.upstair?.y === y)
            return { ch: '<', color: CLR_YELLOW, dec: false };
        return { ch: '>', color: CLR_YELLOW, dec: false };
    // Wall types → DEC line-drawing characters
    case SDOOR:
        // C ref: display.c back_to_glyph — SDOOR falls through to wall; use
        // horizontal bit (set when carved from HWALL/VWALL). Full wall_angle
        // deferred.
        if (loc.horizontal) return { ch: 'q', color: NO_COLOR, dec: true };
        return { ch: 'x', color: NO_COLOR, dec: true };
    case HWALL:     return { ch: 'q', color: NO_COLOR, dec: true };  // ─
    case VWALL:     return { ch: 'x', color: NO_COLOR, dec: true };  // │
    case TLCORNER:  return { ch: 'l', color: NO_COLOR, dec: true };  // ┌
    case TRCORNER:  return { ch: 'k', color: NO_COLOR, dec: true };  // ┐
    case BLCORNER:  return { ch: 'm', color: NO_COLOR, dec: true };  // └
    case BRCORNER:  return { ch: 'j', color: NO_COLOR, dec: true };  // ┘
    case CROSSWALL: return { ch: 'n', color: NO_COLOR, dec: true };  // ┼
    case TUWALL:    return { ch: 'v', color: NO_COLOR, dec: true };  // ┴
    case TDWALL:    return { ch: 'w', color: NO_COLOR, dec: true };  // ┬
    case TLWALL:    return { ch: 'u', color: NO_COLOR, dec: true };  // ┤
    case TRWALL:    return { ch: 't', color: NO_COLOR, dec: true };  // ├
    default:        return { ch: '?', color: NO_COLOR, dec: false };
    }
}

// ── show_glyph_cell ──
export function show_glyph_cell(x, y, ch, color = NO_COLOR, decgfx = false, attr = 0) {
    const loc = game.level?.at(x, y);
    if (!loc) return;
    loc.disp_ch = ch;
    loc.disp_color = color;
    loc.disp_decgfx = !!decgfx;
    loc.disp_attr = attr | 0;
    loc.gnew = 1;
}

// ── newsym ──
export function newsym(x, y) {
    const loc = game.level?.at(x, y);
    if (!loc) return;

    if (game.u?.ux === x && game.u?.uy === y) {
        // Hero
        show_glyph_cell(x, y, '@', CLR_WHITE, false);
        const tg = terrain_glyph(loc, x, y);
        loc.remembered_glyph = { ch: tg.ch, color: tg.color, decgfx: tg.dec };
        return;
    }

    // C ref: display.c newsym — visible monster overrides object/terrain
    const mtmp = mon_at_display(x, y);
    if (mtmp && cansee(x, y)) {
        const mg = mon_glyph(mtmp);
        show_glyph_cell(x, y, mg.ch, mg.color, false);
        const tg = terrain_glyph(loc, x, y);
        if (game.level?.flags?.hero_memory) {
            loc.remembered_glyph = { ch: tg.ch, color: tg.color, decgfx: tg.dec };
        }
        return;
    }

    // C ref: display.c _map_location — vobj_at before trap/background
    if (cansee(x, y)) {
        const obj = objects_at(x, y);
        if (obj && !covers_objects(x, y)) {
            const og = obj_glyph(obj);
            show_glyph_cell(x, y, og.ch, og.color, og.dec);
            if (game.level?.flags?.hero_memory) {
                loc.remembered_glyph = { ch: og.ch, color: og.color, decgfx: og.dec };
            }
            return;
        }
        const tg = terrain_glyph(loc, x, y);
        show_glyph_cell(x, y, tg.ch, tg.color, tg.dec);
        if (game.level?.flags?.hero_memory) {
            loc.remembered_glyph = { ch: tg.ch, color: tg.color, decgfx: tg.dec };
        }
    } else if (loc.remembered_glyph) {
        // Out of sight but remembered — show remembered glyph
        show_glyph_cell(x, y, loc.remembered_glyph.ch,
            loc.remembered_glyph.color, loc.remembered_glyph.decgfx);
    }
}

// ── docrt ──
export async function docrt() {
    if (!game.level) return;
    for (let y = 0; y < ROWNO; y++)
        for (let x = 1; x < COLNO; x++)
            newsym(x, y);
}

// ── Serialize a map row with DEC line-drawing and ANSI colors ──
function render_map_row(y) {
    if (!game.level) return '';
    let firstCol = -1, lastCol = -1;
    for (let x = 1; x < COLNO; x++) {
        const loc = game.level.at(x, y);
        if (loc?.disp_ch && loc.disp_ch !== ' ') {
            if (firstCol < 0) firstCol = x;
            lastCol = x;
        }
    }
    if (firstCol < 0) return '';

    let output = '';
    let activeColor = ANSI_DEFAULT;  // default
    let activeDec = false;

    // Leading gap
    const gap = firstCol - 1;
    if (gap > 4) output += `\x1b[${gap}C`;
    else if (gap > 0) output += ' '.repeat(gap);

    for (let x = firstCol; x <= lastCol; x++) {
        const loc = game.level.at(x, y);
        const ch = loc?.disp_ch ?? ' ';
        const color = loc?.disp_color ?? NO_COLOR;
        const dec = !!loc?.disp_decgfx;

        if (ch === ' ') {
            // Space runs
            let run = 1;
            while (x + run <= lastCol && (game.level.at(x + run, y)?.disp_ch ?? ' ') === ' ') run++;
            if (activeDec) { output += '\x0f'; activeDec = false; }
            if (run > 4) output += `\x1b[${run}C`;
            else output += ' '.repeat(run);
            x += run - 1;
            continue;
        }

        let wantAnsi = ANSI_COLOR[color] ?? ANSI_DEFAULT;
        if (wantAnsi !== activeColor) {
            output += `\x1b[${wantAnsi}m`;
            activeColor = wantAnsi;
        }

        // DEC mode switching
        if (dec && !activeDec) { output += '\x0e'; activeDec = true; }
        else if (!dec && activeDec) { output += '\x0f'; activeDec = false; }

        output += ch;
    }

    // Reset state at end of row (C does per-row SO/SI)
    if (activeColor !== ANSI_DEFAULT) output += `\x1b[${ANSI_DEFAULT}m`;
    if (activeDec) output += '\x0f';

    return output;
}

// ── Status lines ──
function _statusLine1() {
    const u = game.u;
    if (!u) return '';
    let name = game.plname || 'Hero';
    // C ref: botl.c — capitalize first letter of plname for status only
    if (name.length && name.charCodeAt(0) >= 97 && name.charCodeAt(0) <= 122) {
        name = String.fromCharCode(name.charCodeAt(0) - 32) + name.slice(1);
    }
    const role = game.urole?.rank?.m || game.urole?.name?.m || 'Adventurer';
    const title = `${name} the ${role}`;
    // C botl order: St/Dx/Co/In/Wi/Ch ← STR/DEX/CON/INT/WIS/CHA (attrib.h)
    const a = u.acurr?.a;
    const stats = a
        ? `St:${a[0]} Dx:${a[3]} Co:${a[4]} In:${a[1]} Wi:${a[2]} Ch:${a[5]}`
        : 'St:? Dx:? Co:? In:? Wi:? Ch:?';
    const align = u.ualign?.type === 0 ? 'Neutral' : u.ualign?.type > 0 ? 'Lawful' : 'Chaotic';
    // C uses cursor-forward for gap between title and stats
    // C pads to align stats starting at a fixed column
    const gap = Math.max(1, 31 - title.length);
    if (gap > 4) return `${title}\x1b[${gap}C${stats} ${align}`;
    return `${title}${' '.repeat(gap)}${stats} ${align}`;
}

// C ref: botl.c — Xp:/T: gated by flags.showexp / flags.time (default off)
function _statusLine2() {
    const u = game.u;
    if (!u) return '';
    const flags = game.flags || {};
    let s = `Dlvl:${u.uz?.dlevel || 1} $:${game._goldCount || 0} HP:${u.uhp || 0}(${u.uhpmax || 0}) Pw:${u.uen || 0}(${u.uenmax || 0}) AC:${u.uac ?? 10} Xp:${u.ulevel || 1}`;
    if (flags.showexp) s += `/${u.uexp || 0}`;
    if (flags.time) s += ` T:${game.moves || 1}`;
    return s;
}

export { _statusLine2 as status_line_2 };

/** Expand CSI cursor-forward in status for overlay painting. */
export function snapshot_status_lines() {
    const s1 = _statusLine1().replace(/\x1b\[[0-9;]*[A-Za-z]/g, m =>
        m.match(/\x1b\[\d+C/) ? ' '.repeat(parseInt(m.slice(2), 10) || 0) : '');
    return [s1, _statusLine2()];
}

// ── Serialize terminal grid for screen comparison ──
export function serialize_terminal_grid(display) {
    let output = '';
    let lastRow = 0;
    for (let r = 0; r < display.rows; r++) {
        for (let c = 0; c < display.cols; c++) {
            if (display.grid[r][c].ch !== ' ') { lastRow = r; break; }
        }
    }
    for (let r = 0; r <= lastRow; r++) {
        let lastCol = -1;
        for (let c = display.cols - 1; c >= 0; c--) {
            if (display.grid[r][c].ch !== ' ') { lastCol = c; break; }
        }
        if (lastCol < 0) { if (r < lastRow) output += '\n'; continue; }
        let firstCol = 0;
        for (let c = 0; c <= lastCol; c++) {
            if (display.grid[r][c].ch !== ' ') { firstCol = c; break; }
        }
        if (firstCol > 4) output += `\x1b[${firstCol}C`;
        else if (firstCol > 0) output += ' '.repeat(firstCol);
        for (let c = firstCol; c <= lastCol; c++) output += display.grid[r][c].ch;
        if (r < lastRow) output += '\n';
    }
    return output;
}

// ── Build screen output ──
function _buildScreenOutput() {
    const display = game?.nhDisplay;
    if (!display) return;

    let output = '';
    // Row 0: message
    output += (game._pending_message || '') + '\n';

    // Rows 1-21: map (rendered with DEC + ANSI, per-row SO/SI)
    for (let y = 0; y < ROWNO; y++) {
        output += render_map_row(y) + '\n';
    }

    // Row 22-23: status
    output += _statusLine1() + '\n';
    output += _statusLine2();

    game._screen_output = output;

    // Also write to grid for serialize_terminal_grid
    if (display.grid) {
        display.clearScreen();
        // Message line(s) — --More-- may sit on row 1 when msg is long
        const msg = game._pending_message || '';
        const msgLines = msg.split('\n');
        for (let r = 0; r < msgLines.length && r < 2; r++) {
            const line = msgLines[r];
            for (let c = 0; c < Math.min(line.length, display.cols); c++)
                display.setCell(c, r, line[c], NO_COLOR, 0);
        }
        // Map — write characters to grid (DEC → Unicode for browser display)
        // Row 1 may already hold --More--; only fill cells that have glyphs
        for (let y = 0; y < ROWNO; y++) {
            for (let x = 1; x < COLNO; x++) {
                const loc = game.level?.at(x, y);
                if (!loc?.disp_ch || loc.disp_ch === ' ') continue;
                const ch = loc.disp_decgfx ? (DEC_TO_UNICODE[loc.disp_ch] || loc.disp_ch) : loc.disp_ch;
                const sr = y + 1;
                // Don't clobber --More-- on row 1
                if (sr === 1 && msgLines.length > 1) continue;
                display.setCell(x - 1, sr, ch, loc.disp_color ?? NO_COLOR, loc.disp_attr ?? 0);
            }
        }
        // Status lines
        const s1 = _statusLine1().replace(/\x1b\[[0-9;]*[A-Za-z]/g, m =>
            m.match(/\x1b\[\d+C/) ? ' '.repeat(parseInt(m.slice(2))) : '');
        for (let c = 0; c < Math.min(s1.length, display.cols); c++)
            display.setCell(c, 22, s1[c], NO_COLOR, 0);
        const s2 = _statusLine2();
        for (let c = 0; c < Math.min(s2.length, display.cols); c++)
            display.setCell(c, 23, s2[c], NO_COLOR, 0);
        // Cursor: prompts stay on topline; otherwise hero.
        if (msg.startsWith('Count:')) {
            display.setCursor(msg.length, 0);
        } else if (msg.endsWith('--More--') && !msg.includes('\n')) {
            display.setCursor(msg.length, 0);
        } else if (msg.includes('\n--More--')) {
            display.setCursor(8, 1);
        } else if (msg.match(/^What do you want to /)) {
            display.setCursor(msg.length, 0);
        } else if (game.u?.ux > 0) {
            display.setCursor(game.u.ux - 1, game.u.uy + 1);
        }
    }
}

// ── flush_screen ──
export async function flush_screen(mode) {
    // Menu/text overlays paint the Terminal grid directly; don't clobber them.
    // C ref: invent display / NHW_MENU / NHW_TEXT stay until dismissed.
    if (game._menu_overlay) return;
    _buildScreenOutput();
}

// ── cls ──
export async function cls() {
    const display = game?.nhDisplay;
    if (display?.clearScreen) display.clearScreen();
    game._pending_message = '';
    _toplines = '';
    _toplin = TOPLINE_EMPTY;
}

// ── bot ──
export async function bot() {
    // Status line updates happen in _buildScreenOutput
}

// C ref: getline.c xwaitforspace("\033 ") — only ESC/space/return dismiss
// Other keys are consumed (bell) and the wait continues. Each nhgetch is a
// capture boundary, matching C session steps with 0 RNG at --More--.
export async function more() {
    // Lazy import avoids display ↔ input cycle (nhgetch calls topline hooks).
    const { nhgetch } = await import('./input.js');
    const CO = game?.nhDisplay?.cols || 80;
    const base = (_toplines || game._pending_message || '').replace(/--More--$/, '');
    // C ref: topl.c more() — if curx >= CO-8, newline before --More--
    if (base.length >= CO - 8) {
        game._pending_message = `${base}\n--More--`;
    } else {
        game._pending_message = base + '--More--';
    }
    await flush_screen(1);
    const disp = game?.nhDisplay;
    if (disp) {
        const msg = game._pending_message || '';
        if (msg.includes('\n')) {
            // Second-line --More--; C seed0900 welcome-more cursor at col 8
            disp.setCursor(8, 1);
        } else {
            // Same-line --More—; cursor just past the prompt
            disp.setCursor(msg.length, 0);
        }
    }

    for (;;) {
        const c = await nhgetch();
        if (c === 27) { // ESC → WIN_STOP
            _win_stop = true;
            break;
        }
        if (c === 32 || c === 13 || c === 10) break;
        // tty_nhbell(); discard
    }

    _toplines = '';
    _toplin = TOPLINE_EMPTY;
    game._pending_message = '';
}

/** C ref: flush pending topline --More-- before menus / non-pline UI */
export async function flush_topl_more() {
    if (_toplin === TOPLINE_NEED_MORE && !_win_stop) {
        await more();
    }
}

// Clear stop/need-more acknowledgment helpers (also applied in nhgetch).
export function clear_win_stop() {
    _win_stop = false;
}

// C ref: tty_nhgetch — after key read, NEED_MORE → NON_EMPTY ("seen")
export function mark_topline_seen() {
    if (_toplin === TOPLINE_NEED_MORE) _toplin = TOPLINE_EMPTY; // NON_EMPTY≈no more
}

export function get_win_stop() {
    return _win_stop;
}

// ── pline ──
// C ref: topl.c update_topl / addtopl — append if room, else more() then replace
export async function pline(msg) {
    if (msg == null || msg === '') return;
    const CO = game?.nhDisplay?.cols || 80;
    // Capture skip before more(); C still paints the new line with the
    // pre-more skip flag even if ESC sets WIN_STOP during more().
    const skip = _win_stop;
    const notdied = !String(msg).startsWith('You die');

    if ((_toplin === TOPLINE_NEED_MORE || skip)
        && _toplines.length + 3 + msg.length < CO - 8
        && notdied) {
        _toplines = _toplines ? `${_toplines}  ${msg}` : msg;
        if (!skip) game._pending_message = _toplines;
        return;
    }
    if (!skip && _toplin === TOPLINE_NEED_MORE) {
        await more();
    }
    if (!notdied) _win_stop = false;
    _toplines = msg;
    if (!skip) {
        game._pending_message = msg;
        _toplin = TOPLINE_NEED_MORE;
    }
}
