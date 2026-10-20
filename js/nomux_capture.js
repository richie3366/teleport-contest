// Contest recorder screen-capture overflow (patch 006, win/tty/termcap.c).
//
// The C recorder emits one marker per input boundary and per animation
// frame (nomux_emit_marker `:680–696`): it renders the shadow screen into
// `static char nomux_out[24 * 256]` (nomux_capture_screen `:795–862`), then
// reads the cursor (nomux_get_cursor `:952–960`) for the marker's CX/CY.
// nomux_capture_screen never bounds-checks: a screen whose escape-coded
// payload is longer than 6144 bytes (dense colour + DECgraphics, e.g. a
// level full of blue water) writes its tail, and the terminating '\0',
// past the buffer. In the recorder binary the next statics are
// `int nomux_raw_active, nomux_raw_row, nomux_raw_col` (nm: 0x49d620,
// right after nomux_out's 0x1800 bytes). raw_active turns non-zero, so
// every later marker reports CX=raw_col, CY=raw_row: status-line bytes
// read as little-endian ints (scen-tour-Healer-51152023 step 60:
// "64) Pw:52(52" → CY 893024080, CX 842344498). A later short screen
// does not rewrite them, so the garbage persists.
//
// This is a bug in the contest's recorder, not in NetHack; it is ported
// because the recorded cursor is part of every scored screen
// (frozen/ps_test_runner.mjs `:214–221`). Fix belongs upstream in
// termcap.c (bound nomux_out writes).
//
// Past 0x130 bytes of overflow the payload reaches `obuf` (0x49d750),
// tty's setbuf(stdout) buffer, 1024 bytes. nomux_emit_marker then
// fprintf()s the header into obuf (empty at every marker: the previous
// marker fflush()ed it, measured 0 pending bytes on every overflow), and
// fwrite(scr, L) first fills the rest of obuf with scr[0..) before it
// writes the remainder straight from scr, whose bytes 6448..7471 *are*
// obuf. So the delivered payload, and the recorded screen, holds the
// marker's own header and a second copy of the screen's first bytes from
// payload offset 6448 (the parked "OSC marker leak" rows; measured on
// scen-sweep-Monk-49956033 SEQ 87: header at exactly 6448).
//
// Named omissions: overflow bytes also overwrite termcap.c's `nilstring`
// and `nulstr`, the emit256/emit24bit color scratch and the tty message
// history statics (snapshot_mesgs, putmsghistory.initd) before obuf, and
// past 7472 wintty.c's erasing_tty_screen, clipping/clipx/clipy/
// clipxmax/clipymax, calling_from_update_inventory, resize_mesg,
// fieldorder and tty_status; JS models none of their later effects.
// With raw_active stuck, C's raw_print path (nomux_raw_emit) skips
// nomux_enter_raw_mode, so end-of-game raw output is not shadowed and
// raw_putch bumps raw_col; not modelled. Animation-frame screens keep the
// plain serialization (the supplemental frame metric).

import { game } from './gstate.js';
import { nomux_cell_gbuf } from './display.js';

const NOMUX_OUT_SIZE = 24 * 256;   // termcap.c `:795`
const RAW_STATICS = 12;            // raw_active, raw_row, raw_col (3 × int)
const OBUF_OFF = 0x130;            // obuf (0x49d750) − nomux_out end (0x49d620)
const OBUF_SIZE = 1024;            // tty setbuf(stdout, obuf) BUFSIZ
const CLR_GRAY = 7;
const NO_COLOR = 8;

function sgrFg(fg) { // termcap.c nomux_sgr_fg
    if (fg >= 0 && fg <= 7) return 30 + fg;
    if (fg >= 8 && fg <= 15) return 90 + (fg - 8);
    return 37;
}

// nomux_set_fg: CLR_BLACK → 8 under wc2_darkgray (C default on); out of
// range → 7. NO_COLOR and gray are the default fg 7 the C cell holds.
// Map cells pass the unmapped glyph color; other cells only have the
// tty_map_color'd one, where CLR_BLACK is already NO_COLOR (named).
function cellFg(color) {
    const c = color | 0;
    if (c === NO_COLOR || c === CLR_GRAY || c < 0 || c >= 16) return 7;
    if (c === 0) return game.iflags?.wc2_darkgray !== false ? 8 : 7;
    return c;
}

function pushStr(out, s) {
    for (let i = 0; i < s.length; i++) out.push(s.charCodeAt(i) & 0xff);
}

/**
 * termcap.c nomux_capture_screen `:796–862`, byte for byte, over the
 * Terminal grid (map cells take their DEC byte + decgfx from the gbuf).
 * @returns {number[]} payload bytes, without the trailing '\0'
 */
export function nomux_capture_bytes(term) {
    const out = [];
    const grid = term?.grid;
    if (!grid) return out;
    for (let row = 0; row < 24; row++) {
        const cells = [];
        for (let col = 0; col < 80; col++) {
            const t = grid[row]?.[col];
            const tch = t?.ch || ' ';
            const gb = t ? nomux_cell_gbuf(col, row, t) : null;
            const dec = gb ? gb.dec : null;
            cells.push({
                ch: dec != null ? dec : tch,
                fg: cellFg(gb ? gb.color : (t?.color ?? NO_COLOR)),
                attr: (t?.attr | 0) & 7,
                decgfx: dec != null ? 1 : 0,
            });
        }
        let curFg = 7;
        let curAttr = 0;
        let end = 79;
        while (end >= 0 && (cells[end].ch === ' ' || cells[end].ch === '\0')
               && cells[end].attr === 0
               && (cells[end].fg === 7 || cells[end].fg === 0))
            end--;
        let inDec = 0;
        for (let col = 0; col <= end; col++) {
            const c = cells[col];
            const ch = (c.ch && c.ch !== '\0') ? c.ch : ' ';
            const fg = c.fg ? c.fg : 7;
            const at = c.attr;
            if (at !== curAttr) {
                if ((at & 1) && !(curAttr & 1)) pushStr(out, '\x1b[7m');
                if (!(at & 1) && (curAttr & 1)) pushStr(out, '\x1b[27m');
                if ((at & 2) && !(curAttr & 2)) pushStr(out, '\x1b[1m');
                if (!(at & 2) && (curAttr & 2)) pushStr(out, '\x1b[22m');
                if ((at & 4) && !(curAttr & 4)) pushStr(out, '\x1b[4m');
                if (!(at & 4) && (curAttr & 4)) pushStr(out, '\x1b[24m');
                curAttr = at;
            }
            if (fg !== curFg) {
                pushStr(out, fg === 7 ? '\x1b[39m' : `\x1b[${sgrFg(fg)}m`);
                curFg = fg;
            }
            if (c.decgfx && !inDec) { out.push(0x0e); inDec = 1; }
            else if (!c.decgfx && inDec) { out.push(0x0f); inDec = 0; }
            out.push(ch.charCodeAt(0) & 0xff);
        }
        if (inDec) { out.push(0x0f); inDec = 0; }
        if (curAttr) pushStr(out, '\x1b[0m');
        else if (curFg !== 7) pushStr(out, '\x1b[39m');
        if (row < 23) out.push(0x0a);
    }
    return out;
}

function int32le(mem, off) {
    return (mem[off] | (mem[off + 1] << 8) | (mem[off + 2] << 16)
        | (mem[off + 3] << 24));
}

/**
 * One recorder marker: render the payload, apply its overflow to the
 * raw-mode statics, and return the cursor the marker reports (CX/CY).
 * @param {object} state per-game `{ mem: Uint8Array(12) }`
 * @param {object} term Terminal
 * @param {Array|null} cursor the tty cursor [col, row, visible]
 * @param {object} [hdr] input markers: `{ kind, seq, anim }` — when the
 *   overflow reaches obuf, `screen` is the recorded (corrupted) screen
 * @returns {{ cursor: Array|null, screen: string|null }}
 */
export function nomux_marker(state, term, cursor, hdr) {
    const bytes = nomux_capture_bytes(term);
    const len = bytes.length;
    // Indices len (the '\0') and below that reach past nomux_out land in
    // the statics; indices beyond len are untouched.
    for (let i = NOMUX_OUT_SIZE; i <= len && i < NOMUX_OUT_SIZE + RAW_STATICS; i++)
        state.mem[i - NOMUX_OUT_SIZE] = i < len ? bytes[i] : 0;
    // nomux_get_cursor: raw mode reports the raw counters.
    let cx = cursor ? cursor[0] : 0;
    let cy = cursor ? cursor[1] : 0;
    let outCursor = cursor;
    if (int32le(state.mem, 0) !== 0) {
        cx = int32le(state.mem, 8);
        cy = int32le(state.mem, 4);
        outCursor = [cx, cy, 1];
    }
    let screen = null;
    const base = NOMUX_OUT_SIZE + OBUF_OFF;
    if (hdr && len > base) {
        // termcap.c `:690–694` header, then the obuf aliasing above.
        const header = `\x1b]7777;KIND=${hdr.kind};SEQ=${hdr.seq};ANIM=${hdr.anim}`
            + `;CX=${cx};CY=${cy};LEN=${len}\x07`;
        const h = header.length;
        const out = bytes.slice();
        for (let j = base; j < len && j < base + OBUF_SIZE; j++) {
            const o = j - base;
            out[j] = o < h ? header.charCodeAt(o) : bytes[o - h];
        }
        let payload = '';
        for (let j = 0; j < len; j++) payload += String.fromCharCode(out[j]);
        screen = recorder_screen(payload);
    }
    return { cursor: outCursor, screen };
}

// scripts/record-session.mjs payloadToLines + encodeScreenAnsiRle: how
// the recorder stores a payload as a session screen.
function recorder_screen(payload) {
    const lines = payload.split('\n');
    while (lines.length < 24) lines.push('');
    const compressed = lines.slice(0, 24).map((line) => {
        const stripped = line.replace(/ +$/u, '');
        let o = '';
        let i = 0;
        while (i < stripped.length) {
            if (stripped[i] === ' ') {
                const start = i;
                while (i < stripped.length && stripped[i] === ' ') i++;
                const run = i - start;
                o += run >= 5 ? `\x1b[${run}C` : ' '.repeat(run);
            } else {
                o += stripped[i];
                i += 1;
            }
        }
        return o;
    });
    while (compressed.length > 0 && compressed[compressed.length - 1] === '')
        compressed.pop();
    return compressed.join('\n');
}
