// display.js — Map rendering and terminal output.
// C ref: display.c — newsym, feel_newsym, feel_location, show_glyph, docrt, cls, flush_screen.

import { game } from './gstate.js';
import { cansee, setSeenvTowardHero } from './vision.js';
import {
    COLNO, ROWNO, isok, STONE, ROOM, CORR, DOOR, STAIRS, LADDER,
    HWALL, VWALL, TLCORNER, TRCORNER, BLCORNER, BRCORNER,
    CROSSWALL, TUWALL, TDWALL, TLWALL, TRWALL,
    D_NODOOR, D_ISOPEN, D_CLOSED, D_LOCKED,
    SDOOR, SCORR, IRONBARS, TREE, POOL, MOAT, WATER, ICE,
    FOUNTAIN, SINK, ALTAR, GRAVE, THRONE, LAVAPOOL, LAVAWALL,
    ARROW_TRAP, DART_TRAP, ROCKTRAP, SQKY_BOARD, BEAR_TRAP, LANDMINE,
    ROLLING_BOULDER_TRAP, SLP_GAS_TRAP, RUST_TRAP, FIRE_TRAP,
    PIT, SPIKED_PIT, HOLE, TRAPDOOR, TELEP_TRAP, LEVEL_TELEP,
    MAGIC_PORTAL, WEB, STATUE_TRAP, MAGIC_TRAP, ANTI_MAGIC, POLY_TRAP,
    VIBRATING_SQUARE, TRAPPED_DOOR, TRAPPED_CHEST,
    A_STR, A_INT, A_WIS, A_DEX, A_CON, A_CHA,
} from './const.js';
import { acurr } from './attrib.js';
import { NO_COLOR, CLR_GRAY, CLR_BROWN, CLR_WHITE, CLR_YELLOW, CLR_GREEN, CLR_BLUE, CLR_CYAN, CLR_RED, CLR_MAGENTA, CLR_BRIGHT_BLUE, CLR_BRIGHT_MAGENTA, CLR_BRIGHT_CYAN, DEC_TO_UNICODE } from './terminal.js';
import { paintInventoryIntoDisplay } from './invent.js';
import { paintOverlayScreen } from './overlay_screens.js';

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
// C ref: display.c mapglyph / levl typ → cmap (simplified).
export function mapTerrainGlyph(loc, x, y) {
    const typ = loc.typ;
    switch (typ) {
    case STONE:     return { ch: ' ', color: NO_COLOR, dec: false };
    case ROOM:      return { ch: '~', color: NO_COLOR, dec: true };  // DEC middle dot
    case CORR:      return { ch: '#', color: NO_COLOR, dec: false };
    case DOOR:
        if (loc.doormask & D_ISOPEN) return { ch: '|', color: CLR_BROWN, dec: false };
        if (loc.doormask & (D_CLOSED | D_LOCKED)) return { ch: '+', color: CLR_BROWN, dec: false };
        return { ch: '~', color: NO_COLOR, dec: true };  // D_NODOOR = floor
    case STAIRS:
        // Check upstair vs downstair
        if (game.level?.upstair?.x === x && game.level?.upstair?.y === y)
            return { ch: '<', color: CLR_YELLOW, dec: false };
        return { ch: '>', color: CLR_YELLOW, dec: false };
    // Wall types → DEC line-drawing characters
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
    case SDOOR:
        // C: looks like a wall until found — use same DEC glyphs as HWALL/VWALL
        return loc.horizontal
            ? { ch: 'q', color: NO_COLOR, dec: true }
            : { ch: 'x', color: NO_COLOR, dec: true };
    case SCORR:
        return { ch: '#', color: NO_COLOR, dec: false };
    case IRONBARS:
        return { ch: '#', color: CLR_GRAY, dec: false };
    case TREE:
        return { ch: '#', color: CLR_GREEN, dec: false };
    case POOL:
    case MOAT:
    case WATER:
        return { ch: '~', color: CLR_BRIGHT_BLUE, dec: false };
    case ICE:
        return { ch: '.', color: CLR_CYAN, dec: false };
    case FOUNTAIN:
        return { ch: '}', color: CLR_BLUE, dec: false };
    case SINK:
        return { ch: '{', color: CLR_BRIGHT_BLUE, dec: false };
    case ALTAR:
        return { ch: '_', color: CLR_BRIGHT_MAGENTA, dec: false };
    case THRONE:
        return { ch: '^', color: CLR_YELLOW, dec: false };
    case GRAVE:
        return { ch: '|', color: CLR_GRAY, dec: false };
    case LAVAPOOL:
    case LAVAWALL:
        return { ch: '}', color: CLR_RED, dec: false };
    case LADDER:
        return { ch: '>', color: CLR_YELLOW, dec: false };
    default:        return { ch: '?', color: NO_COLOR, dec: false };
    }
}

function trapAtCell(x, y) {
    const traps = game.level?.traps;
    if (!traps?.length) return null;
    return traps.find((t) => t.tx === x && t.ty === y) ?? null;
}

/** Seen trap → glyph (C mapglyph / defsym; simplified until symbols.js). */
function seenTrapGlyphColor(trap) {
    const t = trap.ttyp;
    switch (t) {
    case WEB: return { ch: '"', color: NO_COLOR, dec: false };
    case SQKY_BOARD: return { ch: '^', color: CLR_BROWN, dec: false };
    case BEAR_TRAP: return { ch: '^', color: CLR_BROWN, dec: false };
    case LANDMINE: return { ch: '^', color: CLR_RED, dec: false };
    case FIRE_TRAP: return { ch: '^', color: CLR_RED, dec: false };
    case POLY_TRAP:
    case MAGIC_TRAP: return { ch: '^', color: CLR_BRIGHT_MAGENTA, dec: false };
    case ANTI_MAGIC: return { ch: '^', color: CLR_GRAY, dec: false };
    case TELEP_TRAP:
    case LEVEL_TELEP: return { ch: '^', color: CLR_BRIGHT_CYAN, dec: false };
    case MAGIC_PORTAL: return { ch: '^', color: CLR_MAGENTA, dec: false };
    case PIT:
    case SPIKED_PIT:
    case HOLE:
    case TRAPDOOR: return { ch: '^', color: CLR_BROWN, dec: false };
    case ARROW_TRAP:
    case DART_TRAP:
    case ROCKTRAP:
    case RUST_TRAP:
    case SLP_GAS_TRAP:
    case ROLLING_BOULDER_TRAP:
    default: return { ch: '^', color: CLR_RED, dec: false };
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
        const tg = mapTerrainGlyph(loc, x, y);
        loc.remembered_glyph = { ch: tg.ch, color: tg.color, decgfx: tg.dec };
        return;
    }

    // Contestants: add monster, object, and trap display here.
    const trap = trapAtCell(x, y);
    if (trap?.tseen) {
        const vis = cansee(x, y);
        const tg = seenTrapGlyphColor(trap);
        if (vis) {
            show_glyph_cell(x, y, tg.ch, tg.color, tg.dec);
            if (game.level?.flags?.hero_memory) {
                loc.remembered_glyph = { ch: tg.ch, color: tg.color, decgfx: tg.dec };
            }
        } else if (loc.remembered_glyph) {
            show_glyph_cell(x, y, loc.remembered_glyph.ch,
                loc.remembered_glyph.color, loc.remembered_glyph.decgfx);
        }
        return;
    }

    const tg = mapTerrainGlyph(loc, x, y);
    // Only update display/memory if cell is IN_SIGHT (lit and visible)
    if (cansee(x, y)) {
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

/** C: invent.c / display.c — `suppress_map_output` subset (avoid invent↔display cycle). */
function suppressMapOutputDisplay() {
    const g = game;
    const ps = g.program_state || {};
    if (g.in_mklev || ps.saving || ps.restoring) return true;
    return false;
}

function heroBlindForMap() {
    const u = game.u;
    return !!(u?.ublind || (u?.timed?.blind ?? 0) > 0);
}

/**
 * C: display.c feel_location() — blind hero learns tile (**`detect.c`** / **`drown()`** callers).
 * @param {number} x
 * @param {number} y
 */
export function feelLocation(x, y) {
    if (suppressMapOutputDisplay()) return;
    if (!isok(x, y)) return;
    const u = game.u;
    const lvl = game.level;
    if (!u || !lvl) return;
    setSeenvTowardHero(u.ux, u.uy, x, y);
    const loc = lvl.at(x, y);
    if (!loc) return;
    const tg = mapTerrainGlyph(loc, x, y);
    if (lvl.flags?.hero_memory !== false) {
        loc.remembered_glyph = { ch: tg.ch, color: tg.color, decgfx: tg.dec };
    }
    show_glyph_cell(x, y, tg.ch, tg.color, tg.dec);
}

/**
 * C: display.c feel_newsym(x, y) — hero learns tile (**`trap.c`** **`drown()`**, **`lava_effects()`**).
 * @param {number} x
 * @param {number} y
 */
export function feelNewsym(x, y) {
    if (heroBlindForMap()) feelLocation(x, y);
    else newsym(x, y);
}

// ── docrt ──
export async function docrt() {
    if (!game.level) return;
    for (let y = 0; y < ROWNO; y++)
        for (let x = 1; x < COLNO; x++) {
            const loc = game.level.at(x, y);
            if (loc?.remembered_glyph) {
                show_glyph_cell(x, y, loc.remembered_glyph.ch,
                    loc.remembered_glyph.color, loc.remembered_glyph.decgfx);
            }
        }
    if (game.u?.ux > 0) show_glyph_cell(game.u.ux, game.u.uy, '@', CLR_WHITE, false);
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
    const name = game.plname || 'Hero';
    const role = game.urole?.rank?.m || game.urole?.name?.m || 'Adventurer';
    const title = `${name} the ${role}`;
    const stats = `St:${acurr(A_STR) || '?'} Dx:${acurr(A_DEX) || '?'} Co:${acurr(A_CON) || '?'} In:${acurr(A_INT) || '?'} Wi:${acurr(A_WIS) || '?'} Ch:${acurr(A_CHA) || '?'}`;
    const align = u.ualign?.type === 0 ? 'Neutral' : u.ualign?.type > 0 ? 'Lawful' : 'Chaotic';
    // C uses cursor-forward for gap between title and stats
    // C pads to align stats starting at a fixed column
    const gap = Math.max(1, 31 - title.length);
    if (gap > 4) return `${title}\x1b[${gap}C${stats} ${align}`;
    return `${title}${' '.repeat(gap)}${stats} ${align}`;
}

function _statusLine2() {
    const u = game.u;
    if (!u) return '';
    return `Dlvl:${u.uz?.dlevel || 1} $:${game._goldCount || 0} HP:${u.uhp || 0}(${u.uhpmax || 0}) Pw:${u.uen || 0}(${u.uenmax || 0}) AC:${u.uac ?? 10} Xp:${u.ulevel || 1}/${u.uexp || 0} T:${game.moves || 1}`;
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

    if (game._overlayScreen) {
        display.clearScreen();
        game._pending_message = '';
        paintOverlayScreen(display, game._overlayScreen);
        game._screen_output = display.terminal?.serialize ? display.terminal.serialize() : '';
        return;
    }

    if (game._inventoryMode) {
        display.clearScreen();
        game._pending_message = '';
        paintInventoryIntoDisplay(display);
        const s1 = _statusLine1().replace(/\x1b\[[0-9;]*[A-Za-z]/g, (m) =>
            (m.match(/\x1b\[\d+C/) ? ' '.repeat(parseInt(m.slice(2), 10)) : ''));
        for (let c = 0; c < Math.min(s1.length, display.cols); c++)
            display.setCell(c, 22, s1[c], NO_COLOR, 0);
        const s2 = _statusLine2();
        for (let c = 0; c < Math.min(s2.length, display.cols); c++)
            display.setCell(c, 23, s2[c], NO_COLOR, 0);
        display.setCursor(38, 20);
        display.cursorVisible = true;
        game._screen_output = display.terminal?.serialize ? display.terminal.serialize() : '';
        return;
    }

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
        // Message line
        const msg = game._pending_message || '';
        for (let c = 0; c < Math.min(msg.length, display.cols); c++)
            display.setCell(c, 0, msg[c], NO_COLOR, 0);
        // Map — write characters to grid (DEC → Unicode for browser display)
        for (let y = 0; y < ROWNO; y++) {
            for (let x = 1; x < COLNO; x++) {
                const loc = game.level?.at(x, y);
                if (!loc?.disp_ch || loc.disp_ch === ' ') continue;
                const ch = loc.disp_decgfx ? (DEC_TO_UNICODE[loc.disp_ch] || loc.disp_ch) : loc.disp_ch;
                display.setCell(x - 1, y + 1, ch, loc.disp_color ?? NO_COLOR, loc.disp_attr ?? 0);
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
        // Cursor at hero
        if (game.u?.ux > 0)
            display.setCursor(game.u.ux - 1, game.u.uy + 1);
    }
}

// ── flush_screen ──
export async function flush_screen(mode) {
    _buildScreenOutput();
}

/** C: display.c shieldeff() — sparkle shield animation at (x,y). Full shield_static loop TODO. */
export async function shieldeffLikeC(g, x, y) {
    if (!(g.flags?.sparkle)) return;
    if (!cansee(x, y)) return;
    await flush_screen(1);
    newsym(x, y);
}

// ── cls ──
export async function cls() {
    const display = game?.nhDisplay;
    if (display?.clearScreen) display.clearScreen();
    game._pending_message = '';
}

// ── bot ──
export async function bot() {
    // Status line updates happen in _buildScreenOutput
}

// ── pline ──
export async function pline(msg) {
    game._pending_message = msg;
}
