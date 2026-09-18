// pager.js — whatis / help / encyclopedia (partial).
// C ref: pager.c do_look / dowhatis / dohelp / checkfile;
//        version.c doextversion; nhlua.c get_lua_version.
//
// Branch envelope: `/` menu (lootabc false) → map getpos / invent pick /
// (itemed `/` cmdq_pop KEY + display_inventory canned KEY D-1686) /
// symbol-or-name getlin / look_all|traps|engrs; `?` help menu + About
// (OPTIONS_AT_RUNTIME → get_lua_version nhlib shuffle) + display_file
// dat/* pages + dokeylist/domenucontrols/docontact; data.base lookups for
// checkfile. object_from_map + look_at_object (SLIME_MOLD spe =
// current_fruit). getpos auto_describe / brief_at glyph_is_object
// fakeobj (D-1547). mhidden_description (D-1554). howmonseen look
// monbuf (D-1562). Full glyph encyclopedia, whatdoes keyhelp body, and
// PORT_HELP deferred.

import { game } from './gstate.js';
import { getversionstring } from './version.js';
import { rn2, rn2_on_display_rng } from './rng.js';
import { nhgetch } from './input.js';
import {
    flush_screen, flush_topl_more, pline, impossible, docrt, more,
    mon_glyph, obj_glyph, look_shown_at, terrain_glyph, Hallucination,
    glyph_to_obj_at, glyph_at, glyph_is_trap, glyph_to_trap, trap_to_glyph,
    glyph_is_monster, glyph_is_object, glyph_is_statue, glyph_is_warning,
    glyph_is_invisible_id, glyph_is_nothing, glyph_is_unexplored,
    glyph_is_cmap, glyph_to_cmap, glyph_to_obj, glyph_to_warning,
    canspotself, mon_to_glyph, hero_Invisible, NO_GLYPH,
    set_bot_disabled, tty_nhbell,
} from './display.js';
import { howmonseen, couldsee, cansee } from './vision.js';
import { getlin, y_n } from './getline.js';
import {
    paint_corner_nhw_menu, dismiss_nhw_menu, dfeature_at, display_inventory,
    observe_object, process_menu_search, trap_predicament,
} from './invent.js';
import { stairway_at, known_branch_stairs } from './mklev.js';
import {
    getpos, LOOK_QUICK, LOOK_ONCE, LOOK_VERBOSE, room_cmap_explanation,
    maybe_blocked_staircase_down,
} from './getpos.js';
import { mon_at, defsym_explanation } from './uhitm.js';
import { sobj_at, mksobj, mkobj, obj_stop_timers } from './mkobj.js';
import {
    doname, an, the, xname, singular, ansimpleoname, distant_name, simpleonames,
    makeplural, makesingular, fruit_from_name,
} from './objnam.js';
import { strstri, lcase } from './hacklib.js';
import { distant_monnam, coyotename, PM_COYOTE, pmname, Mgender, Ugender, mon_nam, rndmonnam } from './do_name.js';
import { hides_under, is_hider, is_clinger, is_flyer, mons,
    M2_HUMAN, M2_ELF, M2_ORC, M2_DEMON, pmnames, NEUTRAL,
} from './monsters.js';
import { mlet_class_explain } from './mondata.js';
import { is_pool, is_lava, closed_door, waterbody_name } from './hack.js';
import { altarmask_at } from './pray.js';
import { align_str } from './roles.js';
import { is_drawbridge_wall } from './dbridge.js';
import { PM_WIZARD, PM_GNOME, PM_HUMAN, PM_ELF } from './generated/monsters_data.js';
import { visible_region_at } from './region.js';
import { engr_at, sticks } from './engrave.js';
import { digests } from './mhitu.js';
import { option_help_lines } from './options.js';
import { dokeylist_lines, domenucontrols_lines } from './dokeylist.js';
import { trapname, t_at } from './trap.js';
import { trapped_chest_at, trapped_door_at } from './detect.js';
import { costly_spot } from './shk.js';
import { cmdq_pop, cmdq_clear, pmatch } from './cmd.js';
import {
    objectNames, objectNameStrs, COIN_CLASS, def_oc_syms,
    ROCK_CLASS, VENOM_CLASS,
} from './objects.js';
import {
    BOLT_LIM, COLNO, ROWNO, STAIRS, LA_DOWN, ROOM, CORR, STONE, SCORR, SDOOR,
    GPCOORDS_NONE, GPCOORDS_MAP, GPCOORDS_COMPASS, GPCOORDS_SCREEN,
    STRAT_WAITMASK, IS_WALL, Upolyd, Is_airlevel, Is_waterlevel, Is_astralevel,
    u_at, TER_MON, Amask2align, AM_SANCTUM, AM_MASK, D_BROKEN, D_TRAPPED,
    S_altar, S_ndoor, S_cloud, S_pool, S_water, S_lava, S_lavawall, S_ice,
    S_engroom, S_engrcorr, S_stone, S_grave, S_arrow_trap, S_vibrating_square,
    S_vodbridge, S_hcdbridge, MAXTCHARS, VIBRATING_SQUARE, def_warnsyms,
    POOL, MOAT, WATER, LAVAPOOL, LAVAWALL, ICE,
    HELP, SHELP, HISTORY, LICENSE, OPTIONFILE, OPTMENUHELP, USAGEHELP, DEBUGHELP,
    ECMD_OK, BUFSZ, QBUFSZ,
    OBJ_FREE, OBJ_FLOOR, OBJ_BURIED, M_AP_OBJECT, M_AP_FURNITURE, M_AP_MONSTER,
    M_AP_TYPMASK, M_AP_F_DKNOWN, M_AP_TYPE,
    MCORPSENM, has_mcorpsenm, MALE, FEMALE,
    ARTICLE_NONE, BEAR_TRAP, WEB, NO_TRAP, is_pit,
    MHID_PREFIX, MHID_ARTICLE, MHID_ALTMON, MHID_REGION,
    MONSEEN_NORMAL, MONSEEN_SEEINVIS, MONSEEN_INFRAVIS, MONSEEN_TELEPAT,
    MONSEEN_XRAYVIS, MONSEEN_DETECT, MONSEEN_WARNMON,
    CMDQ_KEY, MENU_SEARCH, PICK_ONE, I_SPECIAL,
} from './const.js';
import { ATR_INVERSE, NO_COLOR, DEC_TO_UNICODE } from './terminal.js';
import { DAT_TEXT } from './generated/dat_text.js';

const CHK_USR = 1;
const CHK_DONT_ASK = 2;
/** C ref: pager.c chkfilIaCheck — lookup only, no display (itemed `/`). */
const CHK_IA_CHECK = 4;

const STRANGE_OBJECT = objectNames.indexOf('STRANGE_OBJECT');
const SLIME_MOLD = objectNames.indexOf('SLIME_MOLD');
const LEASH = objectNames.indexOf('LEASH');

/**
 * Contest Rule #2: no runtime filesystem. Texts are embedded via
 * scripts/extract-dat-text.py → js/generated/dat_text.js.
 * C DATAFILE "data" is built from data.base; key "data" holds that source.
 */
function readDat(name) {
    const raw = DAT_TEXT[name];
    return raw == null ? null : raw;
}

/**
 * C ref: nhlua.c get_lua_version — nhl_init loads nhlib.lua → shuffle(align).
 * First call only (gl.lua_ver empty).
 */
function get_lua_version_shuffle() {
    if (game._lua_ver) return;
    const align = ['law', 'neutral', 'chaos'];
    for (let i = align.length; i > 1; i--) {
        const j = rn2(i);
        [align[i - 1], align[j]] = [align[j], align[i - 1]];
    }
    game._lua_ver = '5.4';
    game._nhl_version_align = align;
}

/**
 * C ref: hacklib.c tabexpand — expand tabs to 8-column stops in place.
 */
function tabexpand(s) {
    let out = '';
    let idx = 0;
    for (const ch of String(s || '')) {
        if (ch === '\t') {
            do {
                out += ' ';
                idx++;
            } while (idx % 8);
        } else {
            out += ch;
            idx++;
        }
        if (idx >= 255) break; // BUFSZ-1ish truncate
    }
    return out;
}

/**
 * C ref: wintty.c tty_display_nhwindow(NHW_TEXT) + process_text_window.
 * NHW_TEXT forces maxcol=cols → offx=0 fullscreen; after lines, H2344
 * cl_eos from cury+1; --More-- on rows-1; dmore offset 1 → cursor [8,23].
 */
/**
 * C ref: wintty.c dmore → getline.c xwaitforspace(quitchars)
 * quitchars = " \\r\\n\\033". Non-matching keys bell and stay on the page
 * (each nhgetch is still a capture boundary). ESC cancels (WIN_CANCELLED).
 * @returns {Promise<boolean>} true if ESC cancelled
 */
async function text_page_wait() {
    for (;;) {
        const c = await nhgetch();
        if (c === 27) return true;
        if (c === 32 || c === 13 || c === 10) return false;
        // tty_nhbell(); ignore
    }
}

/**
 * C ref: wintty.c process_text_window NHW_TEXT + H2344 putstr page-at-a-time.
 * Paint bound: after tty_curs(1,n) curx is 0-based 0; the put loop is
 * `++curx < cols` → at most cols-1 glyphs (col cols-1 stays blank). Long
 * no-space lines (e.g. get_configfile paths) are stored whole by tty_putstr
 * but only the first cols-1 cells are emitted (D-0933).
 * @returns {Promise<boolean>} true if ESC cancelled remaining pages
 */
/**
 * C ref: win/tty/wintty.c compress_str — tty_putstr runs every non-message
 * window line with strlen >= CO (or containing '\n') through this: leading
 * spaces are discarded, runs collapse to one, '\n' becomes ' ', trailing
 * space removed (BUFSZ-capped). A 94-col gamelog wish line thus shows as
 * `1: made his first wish ...` in C. Display-only; no RNG.
 * @param {string} str
 * @param {number} [co=80] terminal columns (C global CO)
 * @returns {string}
 */
export function compress_str(str, co = 80) {
    const s = String(str ?? '');
    if (s.length < co && !s.includes('\n')) return s;
    let out = '';
    let capped = false;
    let was_space = true; // C: TRUE discards all leading spaces
    for (const c0 of s) {
        if (out.length >= 255) { capped = true; break; } // C cbuf[BUFSZ-1]
        const c = c0 === '\n' ? ' ' : c0;
        if (was_space && c === ' ') continue;
        out += c;
        was_space = (c === ' ');
    }
    if ((was_space && out.length > 0) || capped) out = out.slice(0, -1);
    return out;
}

/**
 * C ref: win/tty/wintty.c tty_putstr NHW_TEXT arm — after compress_str, a
 * stored line with n0 = strlen+1 > CO is word-wrapped: scan back from
 * str[CO-1] for ' ' (or '\n'); the stored fragment keeps the break space
 * (`data[++i] = 0`) and the remainder re-enters tty_putstr from AFTER the
 * break space (`&str[i]` post-`++i`, so the space is consumed, not kept).
 * No break point →
 * stored whole (paint truncates). Returns the display lines in order.
 * @param {string} str raw putstr line
 * @param {number} [co=80] terminal columns (C global CO)
 * @returns {string[]}
 */
export function wrap_text_window_line(str, co = 80) {
    const out = [];
    let s = compress_str(str, co);
    for (;;) {
        if (s.length < co) { out.push(s); break; } // C: n0 = len+1 <= CO
        let i = co - 1;
        while (i && s[i] !== ' ' && s[i] !== '\n') i--;
        if (!i) { out.push(s); break; } // no break point: stored whole
        out.push(s.slice(0, i + 1)); // keeps the break space (C data[++i]=0)
        s = compress_str(s.slice(i + 1), co); // C: &str[i] after ++i — break space consumed
    }
    return out;
}

/**
 * @param {Array<string|{text:string,attr?:number}>} lines
 * @param {{ moreAtEnd?: boolean }} [opts]
 */
export async function show_text_pages(lines, { moreAtEnd = true } = {}) {
    const disp = game.nhDisplay;
    if (!disp) {
        await nhgetch();
        return false;
    }
    const cols = disp.cols || 80;
    const textCols = cols - 1; // C: ++curx < cols from curx==0
    const rows = 24;
    const pageRows = rows - 1; // leave bottom for --More-- / (end)
    // C: wrap fragments are data lines before paging (putstr-time wrap).
    const expanded = [];
    for (const entry of lines) {
        const raw = typeof entry === 'string' ? (entry || '') : (entry?.text || '');
        const attr = typeof entry === 'string' ? 0 : (entry?.attr || 0);
        // C wintty.c tty_putstr NHW_TEXT: compress_str + word-wrap (D-1892).
        for (const text of wrap_text_window_line(raw, cols))
            expanded.push(typeof entry === 'string' ? text : { text, attr });
    }
    let offset = 0;
    let cancelled = false;
    while (offset < expanded.length || (offset === 0 && expanded.length === 0)) {
        game._menu_overlay = true;
        game._pending_message = '';
        disp.clearScreen();
        const chunk = expanded.slice(offset, offset + pageRows);
        for (let r = 0; r < chunk.length; r++) {
            const entry = chunk[r];
            const text = typeof entry === 'string' ? entry : (entry?.text || '');
            const attr = typeof entry === 'string' ? 0 : (entry?.attr || 0);
            for (let i = 0; i < text.length && i < textCols; i++)
                disp.setCell(i, r, text[i], NO_COLOR, attr);
        }
        // C H2344: tty_curs(1, cury+1); cl_eos(); then more on rows-1
        for (let r = chunk.length; r < rows - 1; r++) {
            for (let c = 0; c < cols; c++)
                disp.setCell(c, r, ' ', NO_COLOR, 0);
        }
        const last = offset + pageRows >= expanded.length;
        const footer = last && !moreAtEnd ? '(end) ' : '--More--';
        const moreRow = rows - 1;
        for (let c = 0; c < cols; c++)
            disp.setCell(c, moreRow, ' ', NO_COLOR, 0);
        for (let i = 0; i < footer.length && i < cols; i++)
            disp.setCell(i, moreRow, footer[i], NO_COLOR, 0);
        // C dmore NHW_TEXT: cursor after prompt; help_dir uses [8,23] for "--More--"
        disp.setCursor(footer.startsWith('--More--') ? 8 : footer.length, moreRow);
        await flush_screen(1);
        cancelled = await text_page_wait();
        if (cancelled) break;
        offset += pageRows;
        if (last) break;
    }
    game._menu_overlay = false;
    await docrt();
    await flush_screen(1);
    return cancelled;
}

/**
 * C ref: getpos.c coord_desc GPCOORDS_MAP — "<x,y>"; y<10 gets trailing
 * space so %8s columns line up (pager.c look_all).
 */
/**
 * C ref: pager.c trap_description `:164–181` — name the thing a trap
 * glyph stands for. Trap detection used to draw a bear trap over
 * trapped doors and trapped containers; those are semi-real traps now
 * (real ttyp, but not on the `ftrap` chain), so the two `detect.c`
 * gates get first refusal before falling back to `trapname`.
 * C order matters beyond wording: each gate draws `rn2(20)` while the
 * hero is hallucinating, and `trapped_door_at` can call
 * `trapped_chest_at` again — keep chest first, then door.
 * Callers (lookat `:718–721`, `look_traps` `:2093–2094`) pass
 * `glyph_to_trap(glyph_at(x, y))`, not `t_at.ttyp`. `doidtrap` still named.
 */
export function trap_description(tnum, x, y) {
    if (trapped_chest_at(tnum, x, y)) {
        return 'trapped chest'; /* might actually be a large box */
    }
    if (trapped_door_at(tnum, x, y)) {
        return 'trapped door'; /* not "trap door"... */
    }
    return trapname(tnum, false);
}

function coord_desc(x, y, cmode = GPCOORDS_MAP) {
    if (cmode === GPCOORDS_SCREEN) {
        return `[${String(y + 2).padStart(2, '0')},${String(x).padStart(2, '0')}]`;
    }
    if (cmode === GPCOORDS_COMPASS || cmode === 'f') {
        return '(here)'; // full compass deferred; look_all defaults to MAP
    }
    let s = `<${x},${y}>`;
    if (cmode === GPCOORDS_MAP && y < 10) s += ' ';
    return s;
}

function look_coord_prefix(x, y, cmode) {
    const coordbuf = coord_desc(x, y, cmode);
    if (cmode === GPCOORDS_SCREEN) return `${coordbuf}  `;
    if (cmode === GPCOORDS_MAP) return `${coordbuf.padStart(8, ' ')}  `;
    return `${coordbuf.padStart(12, ' ')}  `;
}

function look_getpos_cmode() {
    const gpc = game.iflags?.getpos_coords;
    if (gpc && gpc !== GPCOORDS_NONE) return gpc;
    return GPCOORDS_MAP;
}

/**
 * C monst.h U_AP_TYPE / pager.c youmonst for self_lookat.
 * JS artifact youmonst is a sentinel; fill data/m_ap from u when needed.
 */
function youmonst_for_hidden() {
    const u = game.u || {};
    const ym = game.youmonst;
    const mndx = u.umonnum ?? game.urole?.mnum;
    const data = ym?.data || (mndx != null ? mons(mndx) : null);
    if (ym && (ym.data || ym.m_ap_type || ym.mappearance)) {
        if (!ym.data && data) ym.data = data;
        if (ym.mundetected == null) ym.mundetected = !!u.uundetected;
        if (ym.female == null) ym.female = !!(u.mfemale ?? game.flags?.female);
        ym._youmonst = true;
        return ym;
    }
    return {
        _youmonst: true,
        mx: u.ux | 0,
        my: u.uy | 0,
        data,
        m_ap_type: (ym?.m_ap_type | 0),
        mappearance: (ym?.mappearance | 0),
        mundetected: !!u.uundetected,
        female: !!(u.mfemale ?? game.flags?.female),
    };
}

/**
 * C ref: pager.c self_lookat — race adj + pmname(umonnum,Ugender) + called
 * plname + mhidden_description (D-1554) + Punished ", chained to %s" +
 * utrap ", <trap_predicament>" (pager.c:131).
 * Steed (y_monnam) deferred, own row on a falsifier.
 */
function self_lookat() {
    const u = game.u || {};
    // C: race only when !Upolyd; Sprintf(race, "%s ", urace.adj)
    let race = '';
    if (!Upolyd(u)) {
        const adj = game.urace?.adj || game.urace?.noun || 'human';
        race = `${String(adj)} `;
    }
    const mndx = u.umonnum ?? game.urole?.mnum;
    const form = pmname(mndx, Ugender());
    const plname = game.plname || 'hero';
    const invis =
        u.Invis && (u.senseself || !u.Blind) ? 'invisible ' : '';
    let buf = `${invis}${race}${form} called ${plname}`;
    const youm = youmonst_for_hidden();
    const u_ap = (youm.m_ap_type | 0) & M_AP_TYPMASK;
    // C: if (u.uundetected || (Upolyd && U_AP_TYPE) || visible_region_at)
    if (u.uundetected || (Upolyd(u) && u_ap) || visible_region_at(u.ux, u.uy)) {
        buf += mhidden_description(youm,
            MHID_PREFIX | MHID_ARTICLE | MHID_REGION);
    }
    // C: if (Punished) … uball ? ansimpleoname(uball) : "nothing?"
    // C: Punished ≡ (uball != 0)
    if (u.uball) {
        buf += `, chained to ${ansimpleoname(u.uball)}`;
    }
    // C pager.c:131 — bear trap, pit, web, in-floor, in-lava, tethered.
    // final=0, no wizard suffix (self_lookat is never a final disclosure).
    if ((u.utrap | 0)) buf += `, ${trap_predicament(0, false)}`;
    // Steed arm (y_monnam) deferred, own row on a falsifier.
    return buf;
}

/**
 * C ref: pager.c monhealthdescr `:138–160` — the `#if 0` block is disabled,
 * so this always stores empty (`nhUse(mon); nhUse(addspace); *outbuf =
 * '\0'`). Shared by look_at_monster() and done_in_by().
 */
export function monhealthdescr(mon) {
    return '';
}

/**
 * C ref: pager.c look_at_monster `:422–555` — full body in C order.
 * `buf` arms: coyote (`do_name.c:1526` via live `coyotename`) vs
 * `distant_monnam(ARTICLE_NONE)` gated on `accurate = !Hallucination`
 * (`:430–432`); worm-tail "tail of "/"tail of a " on look-vs-mon pos
 * with the isshk&&accurate split (`:433–436`); `monhealthdescr` prefix
 * (always empty, see above) (`:437`); tame/peaceful gated on accurate
 * (`:438–442`); ustuck swallowed/engulfing via `digests` vs held/holding
 * via `Upolyd && sticks(youmonst.data)` (`:443–451`); mfrozen /
 * msleeping / STRAT_WAITMASK (`:452–464`); mleashed (`:466–467`);
 * mtrapped + `cansee` + `t_at` BEAR_TRAP/is_pit/WEB with `tseen = 1`
 * (`:468–478`); `mhidden_description` on mundetected/M_AP_TYPE/
 * `visible_region_at(look x,y)` (D-1554) (`:479–484`). `monbuf` arms
 * (`:486–554`): `howmonseen` bits (D-1562) in C bit order with C ", "
 * separators; WARNMON hallu "paranoid delusion" vs warntype/mflags2
 * human/elf/orc/demon/`pmname(data, Mgender)` + `makeplural`.
 * look_all passes NULL monbuf; describe_looked appends " [seen: %s]".
 */
export function look_at_monster(mtmp, x, y) {
    if (!mtmp) return { buf: 'monster', monbuf: '' };
    const u = game.u || {};
    const accurate = !Hallucination(); // C :429
    // C :430–432 — data == &mons[PM_COYOTE] compares the permonst ptr;
    // JS mons() builds fresh objects so compare data.mndx (do_name.c idiom).
    const mndx = mtmp.data?.mndx ?? mtmp.mnum;
    const name = (mndx === PM_COYOTE && accurate)
        ? coyotename(mtmp)
        : distant_monnam(mtmp, ARTICLE_NONE);
    // C :433–442 Sprintf(buf, "%s%s%s%s", tail, health, tamepeace, name).
    const tail = (mtmp.mx !== x || mtmp.my !== y)
        ? ((mtmp.isshk && accurate) ? 'tail of ' : 'tail of a ')
        : '';
    const health = accurate ? monhealthdescr(mtmp) : '';
    const tamepeace = (mtmp.mtame && accurate)
        ? 'tame '
        : (mtmp.mpeaceful && accurate)
            ? 'peaceful '
            : '';
    let buf = `${tail}${health}${tamepeace}${name}`;
    // C :443–451 — u.ustuck == mtmp pointer compare.
    if (u.ustuck && mtmp && u.ustuck === mtmp) {
        if (u.uswallow || game.iflags?.save_uswallow) {
            buf += digests(mtmp.data) ? ', swallowing you' : ', engulfing you';
        } else {
            buf += (Upolyd(u) && sticks(game.youmonst?.data))
                ? ', being held' : ', holding you';
        }
    }
    // C :452–464 (excerpt from mstatusline for stethoscope/probe).
    if (mtmp.mfrozen) {
        buf += ", can't move (paralyzed or sleeping or busy)";
    } else if (mtmp.msleeping) {
        buf += ', asleep';
    } else if ((mtmp.mstrategy || 0) & STRAT_WAITMASK) {
        buf += ', meditating';
    }
    // C :466–467.
    if (mtmp.mleashed) buf += ', leashed to you';
    // C :468–478 — newsym lets you know of the trap, so mention it here.
    if (mtmp.mtrapped && cansee(mtmp.mx | 0, mtmp.my | 0)) {
        const t = t_at(mtmp.mx | 0, mtmp.my | 0);
        const tt = t ? t.ttyp : NO_TRAP;
        if (tt === BEAR_TRAP || is_pit(tt) || tt === WEB) {
            buf += `, trapped in ${an(trapname(tt, false))}`;
            t.tseen = 1;
        }
    }
    // C :479–484 — shown via persistent detection; x,y are the LOOK
    // coords (worm-tail FIXME reads mx,my inside mhidden itself).
    if (mtmp.mundetected || M_AP_TYPE(mtmp) || visible_region_at(x, y)) {
        buf += mhidden_description(mtmp,
            MHID_PREFIX | MHID_ARTICLE | MHID_REGION);
    }
    // C :486–554 monbuf; [0] = '\0' then bits in fixed order, ", "
    // appended while bits remain (mirrored below, not join()).
    let monbuf = '';
    let how_seen = howmonseen(mtmp) | 0;
    if (how_seen !== 0 && how_seen !== MONSEEN_NORMAL) {
        if (how_seen & MONSEEN_NORMAL) {
            monbuf += 'normal vision';
            how_seen &= ~MONSEEN_NORMAL;
            if (how_seen) monbuf += ', ';
        }
        if (how_seen & MONSEEN_SEEINVIS) {
            monbuf += 'see invisible';
            how_seen &= ~MONSEEN_SEEINVIS;
            if (how_seen) monbuf += ', ';
        }
        if (how_seen & MONSEEN_INFRAVIS) {
            monbuf += 'infravision';
            how_seen &= ~MONSEEN_INFRAVIS;
            if (how_seen) monbuf += ', ';
        }
        if (how_seen & MONSEEN_TELEPAT) {
            monbuf += 'telepathy';
            how_seen &= ~MONSEEN_TELEPAT;
            if (how_seen) monbuf += ', ';
        }
        if (how_seen & MONSEEN_XRAYVIS) {
            // C: Eyes of the Overworld.
            monbuf += 'astral vision';
            how_seen &= ~MONSEEN_XRAYVIS;
            if (how_seen) monbuf += ', ';
        }
        if (how_seen & MONSEEN_DETECT) {
            monbuf += 'monster detection';
            how_seen &= ~MONSEEN_DETECT;
            if (how_seen) monbuf += ', ';
        }
        if (how_seen & MONSEEN_WARNMON) {
            if (Hallucination()) {
                monbuf += 'paranoid delusion';
            } else {
                const wt = game.context?.warntype || {};
                const mW = (wt.obj | 0) | (wt.polyd | 0);
                const m2 = mtmp.data?.mflags2 | 0;
                const whom = ((mW & M2_HUMAN & m2) ? 'human'
                    : (mW & M2_ELF & m2) ? 'elf'
                      : (mW & M2_ORC & m2) ? 'orc'
                        : (mW & M2_DEMON & m2) ? 'demon'
                          : pmname(mtmp.data, Mgender(mtmp)));
                monbuf += `warned of ${makeplural(whom)}`;
            }
            how_seen &= ~MONSEEN_WARNMON;
            if (how_seen) monbuf += ', ';
        }
        // C :550–553 — all 7 bits consumed above, so leftover is
        // unreachable; C logs impossible() (async debug path, skipped in
        // this sync look) and still appends "(%u)". Suffix preserved.
        if (how_seen) monbuf += `(${how_seen >>> 0})`;
    }
    return { buf, monbuf };
}

/**
 * C ref: pager.c look_at_monster `:433–484` buf half (see look_at_monster).
 * Callers: lookat `:710` (with monbuf), look_all `:2002` (NULL monbuf),
 * do_screen_description monster arm (with [seen:] suffix).
 */
function look_at_monster_buf(mtmp, x, y) {
    return look_at_monster(mtmp, x, y).buf;
}

/**
 * C ref: pager.c look_at_monster `:486–554` monbuf half (D-1562).
 * Empty when 0 or NORMAL-only. look_all passes NULL monbuf;
 * describe_looked appends " [seen: %s]".
 */
function howmonseen_look_buf(mtmp) {
    return look_at_monster(mtmp, mtmp?.mx | 0, mtmp?.my | 0).monbuf;
}

/**
 * C ref: pager.c checkfile → create_nhwindow(NHW_MENU) + putstr +
 *        display_nhwindow → wintty process_text_window (cw->data path).
 * H2344_BROKEN offx; leading pad at offx; text at offx+1; dmore
 * defmorestr "--More--" with MENU offset 2 → prompt at offx+1;
 * cursor past prompt at offx+1+strlen("--More--").
 * Corner path keeps map/status (no term_clear_screen).
 */
/**
 * Exported for insight.c putstr NHW_MENU paths (#conduct, etc.).
 * C ref: wintty.c process_text_window corner/fullscreen for NHW_MENU data.
 */
/**
 * C ref: wintty.c process_text_window + dmore(cw, quitchars) for NHW_MENU
 * putstr windows (look_here, etc.). Corner (offx≠0) paints all rows then
 * one dmore; fullscreen pages at rows-1. Both use xwaitforspace(quitchars)
 * — only space/CR/ESC advance; hjklyubn stay on the page (capture still).
 *
 * @param {string[]} lines
 * @param {{ keep_message_leftover?: boolean }} [opts]
 *   When true (look_here only): model invent.c `display_nhwindow(WIN_MESSAGE,
 *   FALSE)` before the menu — toplin EMPTY without wipe, so NHW_MENU's
 *   `tty_clear_nhwindow(WIN_MESSAGE)` is a no-op and getpos leftovers stay
 *   left of offx through dismiss. Ordinary corner menus clear (D-0929).
 */
export async function show_nhw_menu_text(lines, opts = {}) {
    // C ref: wintty.c tty_display_nhwindow(NHW_MENU) — toplin NEED_MORE
    // flushes WIN_MESSAGE blocking first (the look putmixed + --More--
    // wait precedes the checkfile menu paint).
    await flush_topl_more();
    const disp = game.nhDisplay;
    if (!disp) {
        await text_page_wait();
        return;
    }
    const cols = disp.cols || 80;
    const rows = 24;
    const morestr = '--More--';
    let maxcol = 0;
    for (const line of lines) {
        const n0 = String(line || '').length + 1; // tty_putstr
        if (n0 > maxcol) maxcol = n0;
    }
    // C wintty.c tty_putstr NHW_MENU: compress_str + word-wrap run at
    // storage time, so the wrapped fragments are the data rows the menu
    // pages and paints (maxcol above still tracks the raw lines, as in C).
    // Same shape as show_text_pages' NHW_TEXT expansion (D-1892).
    const stored = [];
    for (const line of lines) {
        for (const text of wrap_text_window_line(String(line ?? ''), cols))
            stored.push(text);
    }
    lines = stored;
    let offx = Math.min(Math.min(82, Math.floor(cols / 2)), cols - maxcol - 1);
    if (offx < 0) offx = 0;
    const maxrow = lines.length;
    if (maxrow >= rows || game.flags?.menu_overlay === false) offx = 0;

    // Default: clear topline (C NHW_MENU corner tty_clear when toplin!=EMPTY,
    // fullscreen always). look_here opts.keep_message_leftover skips clear
    // for corner — prior WIN_MESSAGE FALSE left glyphs / _pending_message.
    const keepLeftover = !!opts.keep_message_leftover && offx !== 0;
    if (!keepLeftover) game._pending_message = '';
    game._menu_overlay = false;
    await flush_screen(1);

    if (offx === 0) {
        // Fullscreen NHW_MENU / tall entry — clear then paint col-0 text.
        // C process_text_window + dmore(NHW_MENU): --More-- at col 1
        // (leading blank), cursor at 1+strlen (tty_curs offx+1 then +offset).
        disp.clearScreen();
        const pageRows = rows - 1;
        let offset = 0;
        while (offset < lines.length || (offset === 0 && lines.length === 0)) {
            game._menu_overlay = true;
            const chunk = lines.slice(offset, offset + pageRows);
            disp.clearScreen();
            // C process_text_window: ++curx < cols from curx==0 → cols-1 glyphs
            const textCols = cols - 1;
            for (let r = 0; r < chunk.length; r++) {
                const text = chunk[r] || '';
                for (let i = 0; i < text.length && i < textCols; i++)
                    disp.setCell(i, r, text[i], NO_COLOR, 0);
            }
            const last = offset + pageRows >= lines.length;
            const fr = Math.min(rows - 1, Math.max(chunk.length, 1));
            disp.setCell(0, fr, ' ', NO_COLOR, 0);
            for (let i = 0; i < morestr.length && 1 + i < cols; i++)
                disp.setCell(1 + i, fr, morestr[i], NO_COLOR, 0);
            disp.setCursor(1 + morestr.length, fr);
            const cancelled = await text_page_wait();
            if (cancelled) break;
            offset += pageRows;
            if (last) break;
        }
    } else {
        // C process_text_window corner: cl_end from offx; putchar(' '); text.
        // No mid-list page break when offx≠0 — all rows then one dmore.
        for (let r = 0; r < lines.length; r++) {
            for (let c = offx; c < cols; c++)
                disp.setCell(c, r, ' ', NO_COLOR, 0);
            disp.setCell(offx, r, ' ', NO_COLOR, 0);
            const text = lines[r] || '';
            for (let i = 0; i < text.length && offx + 1 + i < cols; i++)
                disp.setCell(offx + 1 + i, r, text[i], NO_COLOR, 0);
        }
        const moreRow = lines.length;
        for (let c = offx; c < cols; c++)
            disp.setCell(c, moreRow, ' ', NO_COLOR, 0);
        // dmore NHW_MENU: prompt at offx+1
        for (let i = 0; i < morestr.length && offx + 1 + i < cols; i++)
            disp.setCell(offx + 1 + i, moreRow, morestr[i], NO_COLOR, 0);
        disp.setCursor(offx + 1 + morestr.length, moreRow);
        game._menu_overlay = true;
        await text_page_wait();
    }

    game._menu_overlay = false;
    // C erase_menu_or_text: offx==0 → docrt; else docorner. JS still
    // docrt() for Hallu see_monsters burns (cohort RNG); cls() wipes
    // _pending_message, so restore only look_here leftovers C leaves
    // left of offx (D-0929 — not every corner menu).
    const savedTopl = keepLeftover ? (game._pending_message || '') : '';
    await docrt();
    if (savedTopl) game._pending_message = savedTopl;
    await flush_screen(1);
}

/**
 * C ref: files.c / windows.c display_file — page a dat text file.
 */
async function display_file(fname, _warn) {
    const raw = readDat(fname);
    if (!raw) {
        await pline(`Cannot open '${fname}' file!`);
        return;
    }
    const lines = raw.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
    // C keeps intentional trailing blank lines (e.g. usagehlp ends with
    // an empty putstr page). Only drop the split artifact from a final \n.
    if (lines.length && lines[lines.length - 1] === '') lines.pop();
    await show_text_pages(lines);
}

/**
 * Parse data.base: keys (non-# non-tab lines) → tab-indented body lines.
 * Returns the entry body plus its key-block line index so checkfile can
 * skip a pass-0 hit on the same entry C already showed for pass 1
 * (C compares dlb offsets; same body at the same index is the same entry).
 */
function lookup_data_base_entry(query) {
    const raw = readDat('data');
    if (!raw) return null;
    const q = String(query || '').toLowerCase();
    if (!q) return null;
    const lines = raw.split('\n');
    let i = 0;
    while (i < lines.length) {
        const line = lines[i];
        if (!line || line.startsWith('#') || line.startsWith('\t')
            || line.startsWith(' ')) {
            i++;
            continue;
        }
        const keyIndex = i;
        // Collect key block until body. Keys keep file case: C matches
        // them with case-sensitive pmatch (strutil.c:144-148) against
        // lcase(dbase_str) (pager.c:866), so q is lowered but keys are
        // not (measured: dat/data.base has a single uppercase key,
        // `A.S*`, which C matches only against un-lowered pass-1 alt).
        const keys = [];
        while (i < lines.length) {
            const k = lines[i];
            if (!k || k.startsWith('#')) { i++; continue; }
            if (k.startsWith('\t') || k.startsWith(' ')) break;
            keys.push(k.trim());
            i++;
        }
        const body = [];
        while (i < lines.length) {
            const b = lines[i];
            if (!b) { body.push(''); i++; continue; }
            if (b.startsWith('#')) { i++; continue; }
            if (!(b.startsWith('\t') || b.startsWith(' '))) break;
            // C checkfile: strip one leading tab (or up to 8 spaces), then
            // tabexpand if any remaining tab (attribution indents).
            let tp = b;
            if (tp.startsWith('\t')) tp = tp.slice(1);
            else if (tp.startsWith(' ')) {
                let n = 0;
                while (n < 8 && tp[n] === ' ') n++;
                tp = tp.slice(n);
            }
            if (tp.includes('\t')) tp = tabexpand(tp);
            body.push(tp);
            i++;
        }
        // C pager.c:1024 checkfile pass-0 arm: pmatch(key, dbase_str).
        // pmatch with no wildcards is exact equality, so no fast path
        // is needed — the call below is the C call (D-1954).
        let matched = false;
        for (const key of keys) {
            if (key.startsWith('~')) continue;
            if (pmatch(key, q)) { matched = true; break; }
        }
        // Leading ~ keys exclude (C chk_skip arm, pager.c:1023-1029:
        // a matching ~ key skips the entry).
        if (matched) {
            for (const key of keys) {
                if (!key.startsWith('~')) continue;
                if (pmatch(key.slice(1), q)) { matched = false; break; }
            }
        }
        if (matched) return { body, index: keyIndex };
    }
    return null;
}

/**
 * C pager.c checkfile `:867–935` — prefix strips over the lowered lookup
 * string, in C order with C's else-if chains (not independent patterns:
 * `a/an/the/some/digit-count` are one chain, `tame/peaceful` one chain,
 * `blessed/uncursed/cursed` one chain, `partly used/partly eaten` one
 * chain, `statue/figurine` one chain).
 */
function checkfile_dbase_str(s) {
    if (s.startsWith('interior of ')) s = s.slice(12); // :872-873
    if (s.startsWith('a ')) s = s.slice(2); // :874-875
    else if (s.startsWith('an ')) s = s.slice(3); // :876-877
    else if (s.startsWith('the ')) s = s.slice(4); // :878-879
    else if (s.startsWith('some ')) s = s.slice(5); // :880-881
    else if (s.length && s[0] >= '0' && s[0] <= '9') { // :882-888 count
        let i = 0;
        while (i < s.length && s[i] >= '0' && s[i] <= '9') i++;
        s = s.slice(i);
        if (s.startsWith(' ')) s = s.slice(1);
    }
    if (s.startsWith('pair of ')) s = s.slice(8); // :889-890
    if (s.startsWith('tame ')) s = s.slice(5); // :891-892
    else if (s.startsWith('peaceful ')) s = s.slice(9); // :893-894
    if (s.startsWith('invisible ')) s = s.slice(10); // :895-896
    if (s.startsWith('saddled ')) s = s.slice(8); // :897-898
    if (s.startsWith('blessed ')) s = s.slice(8); // :899-900
    else if (s.startsWith('uncursed ')) s = s.slice(9); // :901-902
    else if (s.startsWith('cursed ')) s = s.slice(7); // :903-904
    if (s.startsWith('empty ')) s = s.slice(6); // :905-906
    if (s.startsWith('partly used ')) s = s.slice(12); // :907-908
    else if (s.startsWith('partly eaten ')) s = s.slice(13); // :909-910
    if (s.startsWith('statue of ')) s = 'statue'; // :911-912 [6]='\0'
    else if (s.startsWith('figurine of ')) s = 'figurine'; // :913-914 [8]
    // :918-925 — remove enchantment ("+0 aklys").
    if (s.length > 1 && (s[0] === '+' || s[0] === '-')
        && s[1] >= '0' && s[1] <= '9') {
        let i = 1;
        while (i < s.length && s[i] >= '0' && s[i] <= '9') i++;
        s = s.slice(i);
        if (s.startsWith(' ')) s = s.slice(1);
    }
    // :929-934 — "moist towel" asks about "wet towel" (memcpy over "moist").
    if (s.startsWith('moist towel')) s = `wet${s.slice(5)}`;
    return s;
}

/**
 * C pager.c checkfile `:944–976` — split the named/called given name off the
 * base description. dbase is already lowered (C splits dbase_str after
 * lcase, so indexOf matches C strstri there); supplemental_name is copied
 * from the original-case inp (C strstri over inp, `:956–958`). Truncation
 * `*ep = '\0'` keeps the base when the match sits past position 0.
 */
function checkfile_split_names(dbase, inp, supplementalHolder) {
    let alt = null;
    let ep;
    const iNamed = dbase.indexOf(' named '); // :945-950
    const iCalled = dbase.indexOf(' called ');
    if (iNamed >= 0) {
        alt = dbase.slice(iNamed + 7);
        ep = (iCalled >= 0 && iCalled < iNamed) ? iCalled : iNamed;
    } else if (iCalled >= 0) { // :951-958
        alt = dbase.slice(iCalled + 8);
        if (supplementalHolder && inp != null) {
            const tail = strstri(String(inp), ' called ');
            if (tail) supplementalHolder.s = tail.slice(8, 8 + BUFSZ - 1);
        }
        ep = iCalled;
    } else { // :959-960 ", " fallback
        ep = dbase.indexOf(', ');
    }
    if (ep > 0) dbase = dbase.slice(0, ep); // :961-962
    if (alt) { // :967-976 article + " (" suffix off the given name
        if (alt.startsWith('a ') || alt.startsWith('the '))
            alt = alt.slice(alt.indexOf(' ') + 1);
        else if (alt.startsWith('an ')) alt = alt.slice(3);
        const pi = alt.indexOf(' (');
        if (pi > 0) alt = alt.slice(0, pi);
        alt = alt.trim();
        if (!alt) alt = null;
    }
    return { dbase, alt };
}

/**
 * C pager.c checkfile `:984–996` — alternate description when the name
 * carries no given name: the player's fruit name maps to the generic
 * slime-mold entry, else the singular of the base description.
 */
function checkfile_alt_for(dbase) {
    if (fruit_from_name(dbase, true, null)) // :990-992
        return 'slime mold'; // C obj_descr[SLIME_MOLD].oc_name
    return makesingular(dbase); // :995-996
}

/**
 * C pager.c checkfile `:829–1129` (staticfn; callers `:813` ia_checkfile,
 * `:1838` do_look `/i`, `:1853` `?`, `:1948` verbose glance — pm is NULL at
 * all four sites: do_look never assigns its pm local, only supplemental_pm
 * flows to do_screen_description).
 * Encyclopedia lookup over the embedded data.base text (Contest Rule #2:
 * dlb_fopen/fseek/fgets/fclose over the built `data` file become reads of
 * the checked-in `js/generated/dat_text.js` extract (D-0477); the key scan
 * with `~` exclusion is lookup_data_base_entry, `:1009–1040`).
 * In C order: flags (`:839–841`), data-open guard (`:845–849`), bad-buffer
 * impossible (`:851–856`), pm override + lcase (`:862–866`), prefix strips,
 * named/called split + supplemental, fruit/singular alt, the alt-first
 * two-pass pmatch loop with the pass-1 offset skip (`:998–1054`), y_n ask
 * (`:1055–1072`, `== 'y'`), NHW_MENU display (`:1073–1103`), user-typed
 * miss message (`:1104–1106`).
 * Named omissions: do_supplemental_info (`pager.c:2255`, own row — the
 * verbose-glance caller still fills supplemental_name live); dlb I/O-error
 * arms (`? Seek error`, `bad_data_file` format impossibles — no dlb over
 * embedded text).
 */
async function checkfile(inp, pm = null, chkflags = 0, supplementalHolder = null) {
    const user_typed_name = (chkflags & CHK_USR) !== 0; // :839-841 UsrTyped
    const without_asking = (chkflags & CHK_DONT_ASK) !== 0; // :840 DontAsk
    const ia_checking = (chkflags & CHK_IA_CHECK) !== 0; // :841 IaCheck
    let res = false;
    const raw = readDat('data'); // :845-849 dlb_fopen(DATAFILE, "r")
    if (!raw) {
        await pline("Cannot open 'data' file!");
        return res;
    }
    if (inp == null || String(inp).length > BUFSZ - 1) { // :851-856
        await impossible(
            'bad do_look buffer passed (%s)!', inp == null ? 'null' : 'too long');
        return res; // C goto checkfile_done (datawin == WIN_ERR)
    }
    let dbase; // :862-866 pm override unless user-typed, then lcase
    if (pm != null && !user_typed_name) {
        const mndx = typeof pm === 'number' ? pm : pm.mndx;
        dbase = lcase(pmnames[mndx]?.[NEUTRAL] ?? '');
    } else {
        dbase = lcase(String(inp));
    }
    dbase = checkfile_dbase_str(dbase); // :867-935
    if (!dbase) return res; // :938 empty name skips to checkfile_done
    const split = checkfile_split_names(dbase, inp, supplementalHolder); // :944-976
    dbase = split.dbase;
    let alt = split.alt;
    if (!alt) alt = checkfile_alt_for(dbase); // :984-996
    let pass1found_in_file = false; // :941
    let pass1Index = -1; // C pass1offset: text offset of the pass-1 entry
    for (let pass = alt !== dbase ? 1 : 0; pass >= 0; --pass) { // :998
        const q = pass ? alt : dbase;
        const hit = lookup_data_base_entry(q); // :1009-1040 key scan
        if (hit) {
            if (pass === 1) { // :1043-1046
                pass1found_in_file = true;
                pass1Index = hit.index;
            } else if (hit.index === pass1Index) { // :1047-1049
                break; // C goto checkfile_done (already shown)
            }
            let yes_to_moreinfo = false; // :1055-1072
            if (!user_typed_name && !without_asking) {
                let question = 'More info about "';
                question += q.slice(0, QBUFSZ - 1 - (question.length + 2));
                question += '"?';
                if ((await y_n(question)) === 'y') yes_to_moreinfo = true;
            }
            if (user_typed_name || without_asking || yes_to_moreinfo) { // :1073+
                res = true;
                if (ia_checking) break; // C goto checkfile_done
                // :1083-1103 NHW_MENU putstr + display (tab/space strip and
                // tabexpand already applied by the lookup parser per line).
                await show_nhw_menu_text(hit.body.map(l => l || ''));
            }
        } else if (user_typed_name && pass === 0 && !pass1found_in_file) { // :1104-1106
            await pline("You don't have any information on those things.");
        }
    }
    return res; // :1122-1128 checkfile_done
}

/**
 * C pager.c ia_checkfile `:808–815` — singular(xname) lookup with
 * chkfilIaCheck|chkfilDontAsk (offers `/` in item actions). Lookup-only:
 * shares checkfile's sync core (strip → split → fruit/singular alt →
 * alt-first two passes) with no yn prompt or menu display, matching C
 * checkfile with IaCheck (found entry → res TRUE, straight to done).
 */
export function ia_checkfile(otmp) {
    if (!otmp) return false;
    const itemnam = singular(otmp, xname);
    if (!itemnam || itemnam.length > BUFSZ - 1) return false;
    const dbase = checkfile_dbase_str(lcase(itemnam));
    if (!dbase) return false;
    const split = checkfile_split_names(dbase, itemnam, null);
    const base = split.dbase;
    const alt = split.alt || checkfile_alt_for(base);
    const queries = alt !== base ? [alt, base] : [base];
    for (const q of queries) {
        if (lookup_data_base_entry(q)) return true;
    }
    return false;
}

/**
 * C ref: pager.c look_region_nearby `:1966–1974` — `/M` nearby window is
 * u±BOLT_LIM clamped (lo_x≥1, lo_y≥0, hi≤COLNO-1/ROWNO-1), else whole map.
 * C writes through coordxy pointers in lo_y/lo_x/hi_y/hi_x order; JS takes
 * a holder object (pointer equivalent) and mutates it, returning void.
 */
export function look_region_nearby(out, nearby) {
    const u = game.u || {};
    const ux = u.ux | 0;
    const uy = u.uy | 0;
    out.lo_y = nearby ? Math.max(uy - BOLT_LIM, 0) : 0;
    out.lo_x = nearby ? Math.max(ux - BOLT_LIM, 1) : 1;
    out.hi_y = nearby ? Math.min(uy + BOLT_LIM, ROWNO - 1) : ROWNO - 1;
    out.hi_x = nearby ? Math.min(ux + BOLT_LIM, COLNO - 1) : COLNO - 1;
}

function look_region(nearby) {
    const out = {};
    look_region_nearby(out, !!nearby);
    return out;
}

/**
 * C ref: pager.c append_str `:82–106` — append " or "+new_str unless new_str
 * already occurs in buf (case-insensitive strstri). BUFSZ-capped: at most
 * BUFSZ-1 chars total; sep then truncated new_str. Returns 1 if anything
 * was appended (even a partial " or "), else 0.
 */
export function append_str(bufHolder, new_str) {
    if (strstri(bufHolder.s, new_str)) return 0;
    const oldlen = bufHolder.s.length;
    if (oldlen >= BUFSZ - 1) return 0;
    const space_left = BUFSZ - 1 - oldlen;
    const sep = ' or ';
    bufHolder.s += sep.slice(0, space_left);
    if (space_left > sep.length) {
        bufHolder.s += String(new_str).slice(0, space_left - sep.length);
    }
    return 1;
}

/** C ref: include/sym.h `:98` is_cmap_trap — trap cmap range. */
function is_cmap_trap(idx) {
    return (idx | 0) >= S_arrow_trap && (idx | 0) < S_arrow_trap + MAXTCHARS;
}

/** C ref: include/sym.h `:99` is_cmap_drawbridge — drawbridge cmap range. */
function is_cmap_drawbridge(idx) {
    return (idx | 0) >= S_vodbridge && (idx | 0) <= S_hcdbridge;
}

/** C ref: dungeon.c In_hell `:1941–1945` via dungeon.h Inhell — dungeon hellish flag. */
function Inhell_pager() {
    return !!(game.dungeons?.[game.u?.uz?.dnum | 0]?.flags?.hellish);
}

/**
 * C ref: pager.c add_cmap_descr `:1133–1245` (extracted from
 * do_screen_description) — fold one cmap defsym match into out_str.
 * C signature (found, idx, glyph, article, cc, x_str, prefix, *hit_trap,
 * **firstmatch, *out_str) returns found; JS holders ({v}/{s}) stand in for
 * the C out-pointers and are mutated in place. Branch/short-circuit order,
 * waterbody override with levl+typ save/restore and EHalluc_resistance=1,
 * "pool"→"pool"/"molten lava"→"lava" shortening, the article-suppression
 * prefix list, first-match "a trap" arm, and the hit_trap/drawbridge/
 * vibrating-square append guards are all preserved.
 */
export function add_cmap_descr(
    found, idx, glyph, article, cc, x_str, prefix, hitTrap, firstMatch, outStr,
) {
    const absidx = Math.abs(idx | 0);
    idx = idx | 0;
    glyph = glyph | 0;

    if (glyph === NO_GLYPH) {
        if (x_str === 'water') {
            if (idx === S_pool) {
                x_str = 'pool of water';
            } else if (idx === S_water) {
                x_str = !Is_waterlevel(game.u?.uz) ? 'wall of water' : 'limitless water';
            }
        }
        if (absidx === S_pool) idx = S_pool;
    } else if (
        absidx === S_pool || idx === S_water
        || idx === S_lava || idx === S_lavawall || idx === S_ice
    ) {
        const u = game.u || {};
        const loc = game.level?.at?.(cc.x, cc.y);
        const save_ltyp = loc ? loc.typ : null;
        const save_prop = u.EHalluc_resistance | 0;
        if (loc) {
            if (absidx === S_pool) {
                loc.typ = idx === S_pool ? POOL : MOAT;
                idx = S_pool;
            } else {
                loc.typ = idx === S_water ? WATER
                    : idx === S_lava ? LAVAPOOL
                    : idx === S_lavawall ? LAVAWALL
                    : ICE;
            }
        } else if (absidx === S_pool) {
            idx = S_pool;
        }
        // C grabs mon_nam(&gy.youmonst) as a scratch buffer for *firstmatch;
        // JS strings are values, so no scratch buffer is needed.
        u.EHalluc_resistance = 1;
        let mbuf = waterbody_name(cc.x, cc.y);
        u.EHalluc_resistance = save_prop;
        if (loc && save_ltyp !== null) loc.typ = save_ltyp;

        if (mbuf === 'pool of water') mbuf = 'pool';
        else if (mbuf === 'molten lava') mbuf = 'lava';
        x_str = mbuf;
        const sp = x_str.indexOf(' ');
        const iceSuffix = sp !== -1 && x_str.slice(sp).toLowerCase() === ' ice';
        article = !(
            x_str.startsWith('water')
            || x_str.startsWith('ice')
            || x_str.startsWith('pool')
            || x_str.startsWith('moat')
            || x_str.startsWith('lava')
            || x_str.startsWith('swamp')
            || x_str.startsWith('molten')
            || x_str.startsWith('shallow')
            || x_str.startsWith('limitless')
            || x_str.startsWith('wall of lava')
            || x_str.startsWith('wall of water')
            || x_str.startsWith('frozen')
            || iceSuffix
        ) ? 1 : 0;
        // C overwrites article here, so the `article === 2` arm below is dead
        // on this path per C (waterbody matches never emit "the").
    }

    if (!found) {
        if (is_cmap_trap(idx) && idx !== S_vibrating_square) {
            outStr.s = `${prefix}a trap`;
            hitTrap.v = true;
        } else {
            outStr.s = `${prefix}${article === 2 ? the(x_str) : article === 1 ? an(x_str) : x_str}`;
        }
        firstMatch.v = x_str;
        found = 1;
    } else if (
        !(hitTrap.v && is_cmap_trap(idx))
        && !(found >= 3 && is_cmap_drawbridge(idx))
        && (idx !== S_vibrating_square || Inhell_pager()
            || (glyph_is_trap(glyph) && glyph_to_trap(glyph) === VIBRATING_SQUARE))
    ) {
        found += append_str(
            outStr, article === 2 ? the(x_str) : article === 1 ? an(x_str) : x_str,
        );
        if (is_cmap_trap(idx) && idx !== S_vibrating_square) hitTrap.v = true;
    }
    return found;
}

/**
 * C ref: pager.c add_quoted_engraving `:1631–1667` — append the remembered
 * (or unread) engraving text to a " (engraving" / " (grave" look buffer.
 * bufHolder ({s}) is the C char* buf, mutated with BUFSZ strncat capping;
 * returns TRUE when text was appended. Short-circuit order preserved:
 * no-engraving → non-floor/non-grave without force → eread remembered-text
 * vs unread; caller supplies the closing paren.
 */
export function add_quoted_engraving(x, y, bufHolder, force) {
    const buf = bufHolder.s;
    const ep = engr_at(x, y);
    const floorengr = buf === ' (engraving';
    const headstone = buf === ' (grave';

    if (!ep) return false;
    if (!floorengr && !headstone && !force) return false;

    const txt = typeof ep.engr_txt === 'string'
        ? ep.engr_txt
        : (ep.engr_txt?.remembered_text ?? ep.engr_txt?.actual_text ?? '');
    let temp_buf;
    if (ep.eread) {
        temp_buf = ` with ${headstone ? 'headstone reading' : 'remembered text'}: "${txt}"`;
    } else {
        temp_buf = ` ${headstone ? 'whose headstone' : 'that'} you haven't read`;
    }
    const space = BUFSZ - bufHolder.s.length - 1;
    if (space > 0) bufHolder.s += temp_buf.slice(0, space);
    return true;
}

/**
 * C ref: display.c back_to_glyph STAIRS/LADDER + defsym.h explanation.
 * known_branch_stairs → S_brupstair/S_brdnstair ("branch staircase …");
 * else S_upstair/S_dnstair ("staircase …"). lookat copies defsyms[].explanation.
 */
function stair_cmap_explanation(x, y) {
    const sway = stairway_at(x, y);
    const loc = game.level?.at?.(x, y);
    const up = sway
        ? !!sway.up
        : !!(loc && !(loc.ladder & LA_DOWN));
    if (known_branch_stairs(sway)) {
        return up ? 'branch staircase up' : 'branch staircase down';
    }
    return up ? 'staircase up' : 'staircase down';
}

function is_stair_spot(x, y) {
    const sway = stairway_at(x, y);
    if (sway) return true;
    const loc = game.level?.at?.(x, y);
    return !!(loc && loc.typ === STAIRS);
}

/** C youprop.h Blind ≡ (HBlinded || EBlinded) && !BBlinded. */
function Blind_look() {
    const u = game.u || {};
    if (u.uroleplay?.blind) return true;
    return !!(((u.HBlinded | 0) || (u.EBlinded | 0)) && !(u.BBlinded | 0));
}

/** C you.h next2u — distu <= 2 (orthogonal or diagonal adjacent, or self). */
function next2u_look(x, y) {
    const u = game.u || {};
    const dx = (x | 0) - (u.ux | 0);
    const dy = (y | 0) - (u.uy | 0);
    return dx * dx + dy * dy <= 2;
}

/** C monst.h is_obj_mappear — M_AP_TYPE (masked) == M_AP_OBJECT. */
function is_obj_mappear_look(mon, otyp) {
    return ((mon?.m_ap_type | 0) & M_AP_TYPMASK) === M_AP_OBJECT
        && (mon.mappearance | 0) === (otyp | 0);
}

/**
 * C ref: pager.c object_from_map `:284–377`.
 * JS has no integer glyph ids; callers pass glyphotyp (C glyph_to_obj).
 * cmap trapped-chest CHEST|LARGE_BOX, glyph_is_body / glyph_is_statue
 * corpsenm from glyph id named. Returns { fakeobj, otmp }.
 */
export function object_from_map(glyphotyp, x, y) {
    const otyp = glyphotyp | 0;
    let fakeobj = false;
    let mimic_obj = false;
    let otmp = sobj_at(otyp, x, y);
    if (!otmp) {
        for (let b = game.level?.buriedobjlist || null; b; b = b.nobj) {
            if ((b.ox | 0) === (x | 0) && (b.oy | 0) === (y | 0)
                && (b.otyp | 0) === otyp) {
                otmp = b;
                break;
            }
        }
    }

    let mtmp = mon_at(x, y);
    if (mtmp && is_obj_mappear_look(mtmp, otyp)) {
        otmp = null;
        mimic_obj = true;
    } else {
        mtmp = null;
    }

    if (!otmp || (otmp.otyp | 0) !== otyp) {
        // C OBJ_NAME(objects[glyphotyp]) — oc_name; JS objectNameStrs
        // is null for shuffled-out extra types (SC01 / WAN1…).
        if (objectNameStrs[otyp]) {
            otmp = mksobj(otyp, false, false);
        } else {
            const oclass = game.objects?.[otyp]?.oc_class | 0;
            otmp = mkobj(oclass, false);
        }
        if (otmp?.timed) obj_stop_timers(otmp);
        fakeobj = true;
        if ((otmp.oclass | 0) === COIN_CLASS) {
            otmp.quan = 2;
        } else if ((otmp.otyp | 0) === SLIME_MOLD) {
            // C: give it a type — mksobj(init=FALSE) left spe 0
            otmp.spe = game.context?.current_fruit | 0;
        }
        if (mtmp && has_mcorpsenm(mtmp)) {
            if ((otmp.otyp | 0) === SLIME_MOLD) {
                // C: override current_fruit so look stays stable if fruit
                // option changes after the mimic appeared
                otmp.spe = MCORPSENM(mtmp) | 0;
            } else {
                otmp.corpsenm = MCORPSENM(mtmp) | 0;
            }
        }
        // glyph_is_body / glyph_is_statue corpsenm named (no integer glyphs)
        if ((otmp.otyp | 0) === LEASH) {
            otmp.leashmon = 0;
        }
        otmp.where = OBJ_FLOOR;
        otmp.ox = x | 0;
        otmp.oy = y | 0;
        otmp.no_charge = ((otmp.otyp | 0) === STRANGE_OBJECT
            && costly_spot(x, y)) ? 1 : 0;
    }
    if (otmp && next2u_look(x, y) && !Blind_look() && !Hallucination()
        && (fakeobj || (otmp.where | 0) === OBJ_FLOOR)
        && !(game.iflags?.terrainmode | 0)) {
        observe_object(otmp);
    }
    if (fakeobj && mtmp && mimic_obj && otmp
        && (otmp.dknown
            || ((mtmp.m_ap_type | 0) & M_AP_F_DKNOWN))) {
        mtmp.m_ap_type = (mtmp.m_ap_type | 0) | M_AP_F_DKNOWN;
        observe_object(otmp);
    }
    return { fakeobj, otmp: otmp || null };
}

/**
 * C ref: pager.c look_at_object `:380–399`.
 * Callers: lookat / look_all / getpos auto_describe + brief_at (D-1547).
 * doname_with_price / doname_vague_quan named — doname stand-in.
 * Tree suffix named (needs is_treefruit for dangling vs stuck).
 */
export function look_at_object(x, y, glyphotyp) {
    const { fakeobj, otmp } = object_from_map(glyphotyp, x, y);
    let buf = 'something';
    if (otmp) {
        buf = ((otmp.otyp | 0) !== STRANGE_OBJECT)
            ? distant_name(otmp, doname)
            : (objectNameStrs[STRANGE_OBJECT] || 'strange object');
        if (fakeobj) {
            // C: object_from_map set OBJ_FLOOR; never placed on fobj
            otmp.where = OBJ_FREE;
        }
    }
    if (otmp && !fakeobj) {
        // C ref: pager.c look_at_object `:388–399` — buried/embedded
        // suffixes read the looked cell. The tree arm stays named
        // (needs is_treefruit for dangling vs stuck); fakes take no
        // suffix (C deallocs the fake, so otmp is NULL below).
        const typ = game.level?.at?.(x, y)?.typ | 0;
        if ((otmp.where | 0) === OBJ_BURIED) buf += ' (buried)';
        else if (typ === STONE || typ === SCORR) buf += ' embedded in stone';
        else if (IS_WALL(typ) || typ === SDOOR) buf += ' embedded in a wall';
        else if (closed_door(x, y)) buf += ' embedded in a door';
        else if (is_pool(x, y)) buf += ' in water';
        else if (is_lava(x, y)) buf += ' in molten lava';
    }
    return buf;
}

/** C monst.h M_AP_TYPE — mask F_DKNOWN. */
function hidden_ap_type(mon) {
    return (mon?.m_ap_type | 0) & M_AP_TYPMASK;
}

/** C pager.c: mon == &gy.youmonst. */
function hidden_isyou(mon) {
    return !!(mon && (mon._youmonst || mon === game.youmonst));
}

/**
 * C pager.c mhidden_description glyph pick: hero_memory && !isyou →
 * levl.glyph (remembered otyp), else glyph_at (gbuf). JS has no integer
 * glyph ids; remembered_glyph.otyp / glyph_to_obj_at stand in for
 * glyph_is_object + glyph_to_obj.
 */
function hidden_object_glyphotyp(x, y, isyou) {
    const loc = game.level?.at?.(x, y);
    if (!loc) return -1;
    const heroMem = game.level?.flags?.hero_memory !== false;
    if (heroMem && !isyou) {
        const rg = loc.remembered_glyph;
        if (rg && !rg.invisible && rg.otyp != null && (rg.otyp | 0) >= 0) {
            return rg.otyp | 0;
        }
        return -1;
    }
    return glyph_to_obj_at(x, y);
}

/**
 * C pager.c objfrommap label inside mhidden_description.
 * fakeobj: object_from_map set OBJ_FLOOR; free via OBJ_FREE (GC; no
 * dealloc_obj clone).
 */
function hidden_objfrommap(incl_article, glyphotyp, x, y) {
    const { fakeobj, otmp } = object_from_map(glyphotyp, x, y);
    let what = (otmp && (otmp.otyp | 0) !== STRANGE_OBJECT)
        ? simpleonames(otmp)
        : (objectNameStrs[STRANGE_OBJECT] || 'strange object');
    if (incl_article && (!otmp || (otmp.quan | 0) === 1)) {
        what = an(what);
    }
    if (fakeobj && otmp) {
        otmp.where = OBJ_FREE;
    }
    return what;
}

/**
 * C ref: pager.c mhidden_description `:184–280`.
 * Returns the suffix C writes into outbuf (callers append).
 * Callers: self_lookat / look_at_monster; insight mstatusline;
 * makemon appear; uhitm flash_hits_mon.
 * Named: dungeon.c surface ice/pool/altar/swallow (trapper uses
 * "floor"); long-worm tail coords (C FIXME); glyph_is_cmap region
 * ids (JS string 'S_poisoncloud').
 */
export function mhidden_description(mon, mhid_flags) {
    if (!mon) return '';
    const incl_prefix = (mhid_flags & MHID_PREFIX) !== 0;
    const incl_article = (mhid_flags & MHID_ARTICLE) !== 0;
    const show_altmon = (mhid_flags & MHID_ALTMON) !== 0;
    const force_region = (mhid_flags & MHID_REGION) !== 0;
    const isyou = hidden_isyou(mon);
    const u = game.u || {};
    const x = isyou ? (u.ux | 0) : (mon.mx | 0);
    const y = isyou ? (u.uy | 0) : (mon.my | 0);
    const ap = hidden_ap_type(mon);
    const ptr = mon.data;
    // C: one glyph pick (memory vs glyph_at); glyph_is_object ≡ otyp>=0
    const gtyp = hidden_object_glyphotyp(x, y, isyou);
    let outbuf = '';

    if (ap === M_AP_FURNITURE || ap === M_AP_OBJECT) {
        if (incl_prefix) outbuf = ', mimicking ';
        if (ap === M_AP_FURNITURE) {
            let what = defsym_explanation(mon.mappearance | 0);
            if (incl_article) what = an(what);
            outbuf += what;
        } else if (ap === M_AP_OBJECT && gtyp >= 0) {
            outbuf += hidden_objfrommap(incl_article, gtyp, x, y);
        } else {
            outbuf += 'something';
        }
    } else if (ap === M_AP_MONSTER) {
        if (show_altmon) {
            if (incl_prefix) outbuf += ', masquerading as ';
            let what = pmname(mon.mappearance | 0,
                mon.female ? FEMALE : MALE);
            // C: article follows incl_prefix, not incl_article
            if (incl_prefix) what = an(what);
            outbuf += what;
        }
    } else if (isyou ? u.uundetected : mon.mundetected) {
        outbuf = ', hiding';
        if (hides_under(ptr)) {
            outbuf += ' under ';
            if (gtyp >= 0) {
                outbuf += hidden_objfrommap(incl_article, gtyp, x, y);
            } else {
                outbuf += 'something';
            }
        } else if (is_hider(ptr)) {
            // C ceiling_hider macro — inline, no fourth named clone.
            const ceil = (is_clinger(ptr) && ptr.mlet !== 'S_MIMIC')
                || is_flyer(ptr);
            // C surface() ice/pool/altar/swallow named; trapper floor.
            outbuf += ` on the ${ceil ? 'ceiling' : 'floor'}`;
        } else if (ptr?.mlet === 'S_EEL' && is_pool(x, y)) {
            outbuf += ' in murky water';
        }
    }

    const reg = visible_region_at(x, y);
    if (reg) {
        const xr = u.xray_range | 0;
        const r = xr > 1 ? xr : 1;
        const dx = (x | 0) - (u.ux | 0);
        const dy = (y | 0) - (u.uy | 0);
        if (dx * dx + dy * dy <= r * (r + 1) || force_region) {
            const poison = reg.glyph === 'S_poisoncloud';
            outbuf += `, in a cloud of ${poison ? 'poison gas' : 'vapor'}`;
        }
    }
    return outbuf;
}

/**
 * C pager.c invisexplain — remembered unseen creature (lookat `:727`).
 */
const INVIS_EXPLAIN = 'remembered, unseen, creature';

/**
 * C ref: pager.c lookat `:656–802`.
 * Fills firstmatch for auto_describe / whatis getpos (do_screen_description
 * overwrites firstmatch with this buf when found>1 || need_to_look).
 * Glyph-first: GLYPH_UNEXPLORED → "unexplored area"; cmap S_stone +
 * !seenv → "unexplored"; other cmap default is defsyms[].explanation
 * (S_room / S_darkroom have no special cases — DARKROOMSYM is newsym).
 * Returns { buf, monbuf, pm }.
 */
export function lookat(x, y) {
    const u = game.u || {};
    let buf = '';
    let monbuf = '';
    let pm = null;
    const glyph = glyph_at(x, y);
    const terrainmode = game.iflags?.terrainmode | 0;
    const save_uswallow = !!(game.iflags?.save_uswallow);

    if (
        u_at(x, y) && canspotself()
        && !(save_uswallow
            && u.ustuck
            && glyph === mon_to_glyph(u.ustuck, rn2_on_display_rng))
        && (!terrainmode || (terrainmode & TER_MON) !== 0)
    ) {
        buf = self_lookat();
        /* file lookup can't distinguish "gnomish wizard" vs the role */
        if (
            (game.urole?.mnum | 0) === PM_WIZARD
            && (game.urace?.mnum | 0) === PM_GNOME
            && !Upolyd(u)
        ) {
            pm = mons(PM_WIZARD);
        }
        if (
            (hero_Invisible() || u.uundetected)
            && !Blind_look()
            && !(u.uswallow || save_uswallow)
        ) {
            let how = 0;
            if ((u.HInfravision | 0) || (u.EInfravision | 0) || u.Infravision) {
                how |= 1;
            }
            if ((u.ETelepat | 0) || u.Unblind_telepat) how |= 2;
            if (
                (u.HDetect_monsters | 0)
                || (u.EDetect_monsters | 0)
                || u.Detect_monsters
            ) {
                how |= 4;
            }
            if (how) {
                buf += ` [seen: ${how & 1 ? 'infravision' : ''}${
                    (how & 3) > 2 ? ', ' : ''}${
                    how & 2 ? 'telepathy' : ''}${
                    (how & 7) > 4 ? ', ' : ''}${
                    how & 4 ? 'monster detection' : ''}]`;
            }
        }
    } else if (u.uswallow) {
        buf = `interior of ${mon_nam(u.ustuck)}`;
        pm = u.ustuck?.data || null;
    } else if (glyph_is_monster(glyph)) {
        const mtmp = mon_at(x, y);
        if (mtmp) {
            // C lookat `:710` — look_at_monster(buf, monbuf, mtmp, x, y).
            const seen = look_at_monster(mtmp, x, y);
            buf = seen.buf;
            monbuf = seen.monbuf;
            pm = mtmp.data || null;
        } else if (Hallucination()) {
            buf = rndmonnam(null);
        }
    } else if (glyph_is_object(glyph)) {
        buf = look_at_object(x, y, glyph_to_obj(glyph));
    } else if (glyph_is_trap(glyph)) {
        buf = trap_description(glyph_to_trap(glyph), x, y);
    } else if (glyph_is_warning(glyph)) {
        const warnindx = glyph_to_warning(glyph);
        buf = def_warnsyms[warnindx]?.desc
            || def_warnsyms[warnindx]?.explanation
            || 'unknown creature causing you worry';
    } else if (glyph_is_invisible_id(glyph)) {
        buf = INVIS_EXPLAIN;
    } else if (glyph_is_nothing(glyph)) {
        buf = 'dark part of a room';
    } else if (glyph_is_unexplored(glyph)) {
        if (u.Underwater && !Is_waterlevel(u.uz)) {
            buf = next2u_look(x, y) ? 'land' : 'unknown';
        } else {
            buf = 'unexplored area';
        }
    } else if (glyph_is_cmap(glyph)) {
        const loc = game.level?.at?.(x, y);
        const symidx = glyph_to_cmap(glyph);
        switch (symidx) {
        case S_altar: {
            const amsk = altarmask_at(x, y);
            const algn = Amask2align(amsk & AM_MASK);
            const high = (amsk & AM_SANCTUM) ? 'high ' : '';
            const aligned = (Is_astralevel(u.uz) && !next2u_look(x, y)
                && (amsk & AM_SANCTUM))
                ? 'aligned'
                : align_str(algn);
            buf = `${aligned} ${high}altar`;
            break;
        }
        case S_ndoor:
            if (is_drawbridge_wall(x, y) >= 0) {
                buf = 'open drawbridge portcullis';
            } else if (((loc?.doormask | 0) & ~D_TRAPPED) === D_BROKEN) {
                buf = 'broken door';
            } else {
                buf = 'doorway';
            }
            break;
        case S_cloud:
            buf = Is_airlevel(u.uz) ? 'cloudy area' : 'fog/vapor cloud';
            break;
        case S_pool:
        case S_water:
        case S_lava:
        case S_lavawall:
        case S_ice:
            buf = waterbody_name(x, y);
            break;
          case S_engroom:
          case S_engrcorr:
              buf = 'engraving';
              break;
          case S_stone:
            if (!loc?.seenv) {
                buf = 'unexplored';
                break;
            } else if (u.Underwater && !Is_waterlevel(u.uz)) {
                buf = next2u_look(x, y) ? 'land' : 'unknown';
                break;
            } else if ((loc?.typ | 0) === STONE || (loc?.typ | 0) === SCORR) {
                buf = 'stone';
                break;
            }
            /* FALLTHROUGH — remembered S_stone on other typ */
            buf = defsym_explanation(symidx);
            break;
        default:
            buf = defsym_explanation(symidx);
            break;
        }
    } else {
        buf = 'unexplored area';
    }
    return {
        buf,
        monbuf,
        pm: (pm && !Hallucination()) ? pm : null,
    };
}

/**
 * C ref: getpos.c auto_describe — prints firstmatch after
 * do_screen_description(+lookat), not the full out_str / dfeature_at.
 * Stairs: DECgraphics showsyms keep '<'/'>' for stairs while ladders use
 * ≤/≥, so cmap match is ordinary+branch staircase only; lookat overwrites
 * firstmatch with S_br* / S_*stair explanation.
 *
 * C do_screen_description didlook: blocked-staircase rewrite after lookat.
 */
function brief_at(x, y) {
    const { buf } = lookat(x, y);
    return maybe_blocked_staircase_down(buf);
}

/**
 * C ref: pager.c do_screen_description + lookat for looked stairs.
 * Ambiguous '<'/'>' → "a staircase … or a branch staircase … (lookat)".
 * After lookat parenthetical, C sets found=1 so checkfile can look up
 * firstmatch (e.g. "branch staircase up") — D-0334.
 * Ladder showsyms deferred (ASCII where ladders share '<' would add two more).
 */
function describe_stairs_looked(x, y) {
    // C: lookat firstmatch, then blocked-stair rewrite before parenthetical
    const look = maybe_blocked_staircase_down(stair_cmap_explanation(x, y));
    const up = look.endsWith(' up');
    const ordinary = up ? 'staircase up' : 'staircase down';
    const branch = up ? 'branch staircase up' : 'branch staircase down';
    const ch = up ? '<' : '>';
    const out = `${ch}        ${an(ordinary)} or ${an(branch)} (${look})`;
    // C: found = 1 after lookat supplies firstmatch for checkfile
    return { out, first: look, found: 1 };
}

/**
 * C ref: pager.c is_swallow_sym — gs.showsyms[S_sw_tl..S_sw_br].
 * Full showsyms table deferred; match dat/symbols DECgraphics overrides
 * (tc/ml/mr/bc) plus Primary defaults for unset swallow corners.
 */
function is_swallow_sym(c) {
    if (c == null || c === '') return false;
    if (game.iflags?.decgraphics) {
        // DEC: S_sw_ml/mr \xf8→'x', S_sw_tc \xef→'o', S_sw_bc \xf3→'s';
        // corners keep Primary '/' '\'.
        return c === 'x' || c === 'o' || c === 's' || c === '/' || c === '\\';
    }
    // Primary defsym.h: / - \ | | \ - /
    return c === '|' || c === '-' || c === '/' || c === '\\';
}

/**
 * C ref: pager.c do_screen_description cmap walls + lookat defsyms "wall".
 * DECgraphics S_vwall ('x') shares showsym with S_sw_ml/mr → swallow
 * "the interior of a monster" then "a wall" + lookat "(wall)".
 * Message prefix: C putmixed encglyph uses SO+letter+SI; JS topline has
 * no decgfx flag, so paint DEC_TO_UNICODE like ROOM's · (D-0083).
 */
function describe_wall_looked(loc, x, y) {
    const look = 'wall';
    const tg = terrain_glyph(loc, x, y);
    const raw = tg?.ch || (game.iflags?.decgraphics ? 'x' : '|');
    // Unseen wall_angle → S_stone space; treat as not a seen wall glyph.
    if (!raw || raw === ' ') {
        return { out: '        dark part of a room', first: 'dark part of a room', found: 1 };
    }
    const ch = (tg?.dec && DEC_TO_UNICODE[raw]) ? DEC_TO_UNICODE[raw] : raw;
    if (is_swallow_sym(raw)) {
        // found>1 → lookat parenthetical; firstmatch = look_buf ("wall")
        const out = `${ch}        the interior of a monster or a wall (${look})`;
        return { out, first: look, found: 1 };
    }
    // found==1 && !need_to_look → no parenthetical
    const out = `${ch}        ${an(look)}`;
    return { out, first: look, found: 1 };
}

function describe_looked(x, y) {
    const u = game.u || {};
    const plname = game.plname || 'hero';
    if (u.ux === x && u.uy === y) {
        // C lookat → self_lookat firstmatch (pmname + Ugender)
        const first = self_lookat();
        // C pager.c:1346–1353 — '@' that refers to you when your race
        // isn't normally shown as '@': tack on "or you" via
        // found += append_str(out_str, "you") (append_str returns 1,
        // so C found goes 1→2 here). But didlook `:1591–1616`
        // (found > 1 || need_to_look) then appends the lookat
        // parenthetical and resets found = 1 ("we have something to
        // look up"), so do_look `:1941` (found == 1) still runs
        // checkfile. Return the post-didlook count.
        const raceMnum = game.urace?.mnum | 0;
        const orYou = (raceMnum !== PM_HUMAN && raceMnum !== PM_ELF
            && !Upolyd(u)) ? ' or you' : '';
        const out = `@        a human or elf${orYou} (${first})`;
        return { out, first, found: 1 };
    }
    // C lookat `:718–721` — gbuf trap glyph before floor objects.
    // Detected chest: trap glyph, pile still on fobj; C names the trap.
    const glyph = glyph_at(x, y);
    if (glyph_is_trap(glyph)) {
        // C ref: pager.c do_screen_description — add_cmap_descr `:1220`
        // first-matches a trap glyph as literally "a trap" (prefix `:1271`
        // is the `^` glyph + 8 spaces; hit_trap + need_to_look), then the
        // didlook block `:1611-1614` appends " (lookat)" with
        // firstmatch = lookat `:718-721` trap_description `:164-181`.
        const nm = trap_description(glyph_to_trap(glyph), x, y);
        return { out: `^        a trap (${nm})`, first: nm, found: 1 };
    }
    // C ref: pager.c do_screen_description `:1406–1417` — the
    // DEF_INVISIBLE arm is glyph-driven (sym from the shown glyph_at),
    // not m_at-driven: a shown 'I' describes as invisexplain even when
    // mon_at returns the hidden monster (and when it returns none).
    if (glyph_is_invisible_id(glyph)) {
        const uu = game.u || {};
        const usealt = ((uu.EDetect_monsters | 0) & I_SPECIAL) !== 0;
        const unseen = (usealt || uu.Blind)
            ? 'unseen creature'
            : 'remembered, unseen, creature';
        return { out: `I        ${an(unseen)}`, first: unseen, found: 1 };
    }
    const mtmp = mon_at(x, y);
    if (mtmp) {
        // C ref: pager.c do_screen_description check_monsters (looked) +
        // didlook `:1607–1640`. The shown ttychar selects the class row and
        // out is `an(explain)` under a glyph+8-space prefix; didlook then
        // appends " (lookat)" and firstmatch becomes look_buf (found back
        // to 1 for checkfile). S_invisible is skipped by the class loop; a
        // shown 'I' takes the DEF_INVISIBLE arm (`:1406–1417`, no didlook:
        // found stays 1 with need_to_look clear, so no parenthetical).
        const ch = mon_glyph(mtmp).ch || '?';
        if (ch === 'I') {
            const u = game.u || {};
            const usealt = ((u.EDetect_monsters | 0) & I_SPECIAL) !== 0;
            const unseen = (usealt || u.Blind)
                ? 'unseen creature'
                : 'remembered, unseen, creature';
            return { out: `I        ${an(unseen)}`, first: unseen, found: 1 };
        }
        // C do_screen_description check_monsters: same look_at_monster
        // buf + [seen: monbuf] pair as lookat (x,y are the looked coords).
        const looked = look_at_monster(mtmp, x, y);
        const explain = mlet_class_explain(mtmp.data?.mlet) || 'monster';
        let out = `${ch}        ${an(explain)}`;
        let first = explain;
        if (looked.buf) {
            out += ` (${looked.buf})`;
            first = looked.buf;
        }
        if (looked.monbuf) out += ` [seen: ${looked.monbuf}]`;
        return { out, first, found: 1 };
    }
    const loc = game.level?.at?.(x, y);
    // C ref: pager.c do_screen_description object loop `:1355–1400` —
    // looked sym matches the oclass showsym → out is `an(explain)` with
    // need_to_look; the didlook block `:1607–1640` appends the lookat buf
    // in parens and firstmatch becomes look_buf (found back to 1 for
    // checkfile). Floor piles live in objects_at, never loc.objects, so
    // drive off the shown glyph exactly as C matches sym; lookat names
    // the pile top through object_from_map. Statues keep the old
    // fallthrough (their C line needs the monster-class prefix from the
    // unexported mlet table); venom likewise (C lists the shared '.'-sym
    // cmap row there, not "a splash of venom").
    const otyp = glyph_to_obj(glyph);
    const oclass = game.objects?.[otyp]?.oc_class | 0;
    if (glyph_is_object(glyph) && !glyph_is_statue(glyph)
        && oclass >= 1 && oclass <= 17 && oclass !== VENOM_CLASS) {
        // C `:1370–1378` — boulder/statue split; only shown '`' reaches
        // here (statues excluded above), so "boulder".
        const ocPtr = oclass === ROCK_CLASS
            ? 'boulder'
            : ((def_oc_syms[oclass] || {}).explain || 'strange object');
        const ocCh = (def_oc_syms[oclass] || {}).sym || '?';
        const look = look_at_object(x, y, otyp);
        const out = `${ocCh}        ${an(ocPtr)} (${look})`;
        return { out, first: look, found: 1 };
    }
    if (is_stair_spot(x, y)) return describe_stairs_looked(x, y);
    // C ref: pager.c do_screen_description — walls before room/corr
    // (cmap order); DECgraphics S_vwall↔swallow mid (D-0425).
    if (loc && IS_WALL(loc.typ)) return describe_wall_looked(loc, x, y);
    // C lookat glyph_at S_stone before typ CORR/ROOM: blank + stone memory
    // → lookat "stone" (even when typ was updated to CORR).
    if (loc && (!loc.disp_ch || loc.disp_ch === ' ')) {
        if (!loc.seenv) {
            // C ref: pager.c do_screen_description — looked sym ' '
            // (DEF_NOTHING, hack.h) matches S_GHOST monsym ' ' ("space
            // symbol", defsym.h) → "a ghost" + need_to_look; SYM_NOTHING
            // showsym ' ' → "the dark part of a room"; glyph_is_unexplored
            // (or sym == showsyms[SYM_UNEXPLORED]) → "unexplored"; cmap
            // S_stone ' ' → "stone" and S_air ' ' → "air" (S_expl_mc ' '
            // has no explanation, skipped). found=5 > 4 → prefix + "can be
            // many things"; didlook lookat appends "(look)" — "unexplored
            // area" for an unexplored glyph, "unexplored" for remembered
            // stone, "dark part of a room" for a nothing glyph — and forces
            // found=1 for checkfile.
            const look = maybe_blocked_staircase_down(lookat(x, y).buf)
                || 'unexplored';
            const out = `         can be many things (${look})`;
            return { out, first: look, found: 1 };
        }
        const last = game.lastseentyp?.[x]?.[y] | 0;
        if (
            last === STONE || last === SCORR
            || loc.typ === STONE || loc.typ === SCORR
        ) {
            // C: space matches many cmap entries (found>4) → "can be many
            // things"; lookat parenthetical still "(stone)".
            const look = 'stone';
            const out = `         can be many things (${look})`;
            return { out, first: look, found: 1 };
        }
    }
    // C ref: pager.c do_screen_description — DECgraphics shares showsym
    // \xfe among S_ndoor/S_room/S_darkroom/S_ice; lookat parenthetical.
    // Full showsyms-driven cmap scan deferred (ASCII ladders/rooms differ).
    // C: when lookat fills firstmatch, found = 1 for checkfile (even if
    // the cmap symbol matched multiple defsyms).
    if (loc?.typ === ROOM) {
        // C lookat firstmatch: S_room vs S_darkroom (room_cmap_explanation)
        const look = room_cmap_explanation(x, y, loc);
        // C encglyph of DECgraphics S_room is SO+'~'+SI → middle dot ·
        // (frozen serialize has no decgfx; paint Unicode like map glyphs).
        const ch = '\u00b7';
        const out = `${ch}        a doorway or the floor of a room or the dark part of a room or ice (${look})`;
        return { out, first: look, found: 1 };
    }
    if (loc?.typ === CORR) {
        // C: found > 4 under DECgraphics '#' (corr/bars/tree/bridges/…)
        // → "can be many things"; lookat still supplies (corridor) and
        // forces found=1 for checkfile.
        const look = 'corridor';
        const out = `#        can be many things (${look})`;
        return { out, first: look, found: 1 };
    }
    const feat = dfeature_at(x, y);
    if (feat) {
        const out = `${feat[0] || '.'}        ${an(feat)}`;
        return { out, first: feat, found: 1 };
    }
    const e = engr_at(x, y);
    if (e?.engr_txt) {
        return {
            out: `        an engraving "${e.engr_txt}"`,
            first: 'engraving',
            found: 1,
        };
    }
    return { out: '        dark part of a room', first: 'dark part of a room', found: 1 };
}

/**
 * C ref: pager.c look_all — NHW_TEXT list of monsters or objects.
 * Filters via newsym-equivalent "currently shown" (glyph_at), not raw
 * mon_at/objects_at. Invis/warning glyphs deferred. Shown floor objects
 * go through look_at_object / object_from_map (real pile → sobj_at).
 * Remembered-gone object glyphs without stored otyp still named.
 */
async function look_all(nearby, do_mons) {
    const { lo_x, lo_y, hi_x, hi_y } = look_region(nearby);
    const lines = [];
    let count = 0;
    const u = game.u || {};
    const cmode = look_getpos_cmode();
    for (let y = lo_y; y <= hi_y; y++) {
        for (let x = lo_x; x <= hi_x; x++) {
            const shown = look_shown_at(x, y);
            let lookbuf = '';
            let glyphCh = '';
            if (do_mons) {
                if (shown?.kind === 'hero') {
                    lookbuf = self_lookat();
                    glyphCh = '@';
                } else if (shown?.kind === 'mon') {
                    // C look_all `:2002` — look_at_monster(lookbuf, NULL,
                    // mtmp, x, y); NULL monbuf, so buf half only.
                    lookbuf = look_at_monster_buf(shown.mtmp, x, y);
                    glyphCh = mon_glyph(shown.mtmp).ch || '?';
                }
            } else if (shown?.kind === 'obj') {
                lookbuf = look_at_object(x, y, shown.obj.otyp);
                glyphCh = obj_glyph(shown.obj).ch || '?';
            }
            if (lookbuf) {
                count++;
                if (count === 1) {
                    const which = do_mons ? 'monsters' : 'objects';
                    if (nearby) {
                        const where =
                            cmode !== GPCOORDS_COMPASS
                                ? coord_desc(u.ux, u.uy, cmode).replace(/ $/, '')
                                : 'you';
                        lines.push(
                            `${which[0].toUpperCase()}${which.slice(1)} currently shown near ${where}:`,
                        );
                    } else {
                        lines.push(
                            `All ${which} currently shown on the map:`,
                        );
                    }
                    lines.push('    ');
                }
                const prefix = look_coord_prefix(x, y, cmode);
                lines.push(`${prefix}${glyphCh}  ${lookbuf}`);
            }
        }
    }
    if (count) {
        await show_text_pages(lines, { moreAtEnd: true });
    } else {
        await pline(
            `No ${do_mons ? 'monsters' : 'objects'} are currently shown ${
                nearby ? 'nearby' : 'on the map'
            }.`,
        );
    }
}

/**
 * C ref: pager.c look_traps `:2077–2141` — `/t` (`nearby`) / `/T` (level)
 * list of seen or remembered traps. The map glyph gets first refusal:
 * `glyph_is_trap(glyph_at(x, y))` → `tnum = glyph_to_trap(glyph)` →
 * `trap_description` — a detected trapped chest or door has a trap glyph
 * but no `ftrap` entry, so only the glyph path names it (and only that
 * path can burn the Hallucination `rn2(20)`). Otherwise a `tseen` `t_at`
 * trap (skipped on water/air levels unless `couldsee`, for traps moved
 * by bubbles or clouds) prints `trapname` + ", obscured by <covering
 * glyph>", with the glyph re-pointed at `trap_to_glyph(t)`.
 * `encglyph` has no JS table (glyphmap[] deferred), so the covering char
 * follows `look_engrs`: hero/mon/obj char, else the cell's shown char;
 * the trap char comes from `trap_to_glyph`, the same defsym table C's
 * `encglyph` reads. `lookbuf` is capped so prefix + text fit BUFSZ (C
 * `lookbuf[sizeof lookbuf - 1 - strlen(outbuf)] = '\0'`). Header is
 * `upstart` (hacklib.c) + the `"    "` separator, like `look_all`.
 * Named: `doidtrap` (the `^` single-cell command, C `:2335+`).
 */
async function look_traps(nearby) {
    const { lo_x, lo_y, hi_x, hi_y } = look_region(nearby);
    const u = game.u || {};
    const cmode = look_getpos_cmode();
    const onWaterAir = Is_waterlevel(u.uz) || Is_airlevel(u.uz);
    let count = 0;
    const lines = [];
    for (let y = lo_y; y <= hi_y; y++) {
        for (let x = lo_x; x <= hi_x; x++) {
            let lookbuf = '';
            let glyphCh = '';
            const glyph = glyph_at(x, y);
            if (glyph_is_trap(glyph)) {
                const tnum = glyph_to_trap(glyph);
                lookbuf = trap_description(tnum, x, y);
                glyphCh = trap_to_glyph({ ttyp: tnum }).ch || '^';
                count++;
            } else {
                const t = t_at(x, y);
                if (t && t.tseen && (!onWaterAir || couldsee(x, y))) {
                    // C `", obscured by %s", encglyph(glyph)` — covering glyph
                    const shown = look_shown_at(x, y);
                    let coverCh = '';
                    if (shown?.kind === 'hero') coverCh = '@';
                    else if (shown?.kind === 'mon') {
                        coverCh = mon_glyph(shown.mtmp).ch || '?';
                    } else if (shown?.kind === 'obj') {
                        coverCh = obj_glyph(shown.obj).ch || '?';
                    } else {
                        coverCh = game.level?.at?.(x, y)?.disp_ch || '?';
                    }
                    lookbuf = `${trapname(t.ttyp, false)}, obscured by ${coverCh}`;
                    glyphCh = trap_to_glyph(t).ch || '^';
                    count++;
                }
            }
            if (lookbuf) {
                if (count === 1) {
                    const title =
                        `${nearby ? 'nearby ' : ''}seen or remembered traps${
                            nearby ? '' : ' on this level'
                        }:`;
                    lines.push(title.replace(/^./, c => c.toUpperCase()));
                    lines.push('    ');
                }
                const prefix = look_coord_prefix(x, y, cmode);
                const head = `${prefix}${glyphCh}  `;
                // C BUFSZ guard: outbuf already holds prefix + glyph
                const maxLook = BUFSZ - 1 - head.length;
                if (lookbuf.length > maxLook) {
                    lookbuf = lookbuf.slice(0, Math.max(maxLook, 0));
                }
                lines.push(`${head}${lookbuf}`);
            }
        }
    }
    if (count) {
        await show_text_pages(lines, { moreAtEnd: true });
    } else {
        await pline(
            `No traps seen or remembered${nearby ? ' nearby' : ''}.`,
        );
    }
}

/**
 * C ref: pager.c look_engrs — NHW_TEXT; seenv + eread remembered text;
 * covered by hero/mon/obj → ", obscured by <glyph>" and engraving_to_glyph
 * '`' (S_engroom). Grave/headstone and S_engrcorr deferred.
 */
async function look_engrs(nearby) {
    const { lo_x, lo_y, hi_x, hi_y } = look_region(nearby);
    const lines = [];
    let count = 0;
    const cmode = look_getpos_cmode();
    for (let y = lo_y; y <= hi_y; y++) {
        for (let x = lo_x; x <= hi_x; x++) {
            const loc = game.level?.at?.(x, y);
            if (!loc?.seenv) continue;
            const e = engr_at(x, y);
            if (!e) continue;
            const txt = e.engr_txt;
            const remembered =
                (typeof txt === 'string'
                    ? txt
                    : txt?.remembered_text || txt?.actual_text || '') || '';
            // After C strsubst("(engraving with " → ""): leading space retained
            let lookbuf = e.eread
                ? ` remembered text: "${remembered}"`
                : ' that you haven\'t read';

            const shown = look_shown_at(x, y);
            // Engraving cmap shown only when nothing covers; else obscured.
            // JS map rarely paints S_engroom; treat cover as hero/mon/obj.
            let glyphCh = '`'; // S_engroom / engraving_to_glyph
            if (shown?.kind === 'hero') {
                lookbuf += ', obscured by @';
            } else if (shown?.kind === 'mon') {
                lookbuf += `, obscured by ${mon_glyph(shown.mtmp).ch || '?'}`;
            } else if (shown?.kind === 'obj') {
                lookbuf += `, obscured by ${obj_glyph(shown.obj).ch || '?'}`;
            }

            count++;
            if (count === 1) {
                lines.push(
                    `${nearby ? 'Nearby seen or remembered engravings' : 'Seen or remembered engravings on this level'}:`,
                );
                lines.push('    ');
            }
            // look_engrs: no y<10 kitten on coord_desc (unlike look_all)
            const raw = `<${x},${y}>`;
            const prefix =
                cmode === GPCOORDS_SCREEN
                    ? `${coord_desc(x, y, cmode)}  `
                    : cmode === GPCOORDS_MAP
                      ? `${raw.padStart(8, ' ')}  `
                      : `${raw.padStart(12, ' ')}  `;
            // C: "%s " after encglyph (one space); lookbuf already has leading space
            lines.push(`${prefix}${glyphCh} ${lookbuf}`);
        }
    }
    if (count) await show_text_pages(lines);
    else {
        await pline(
            `No engravings seen or remembered${nearby ? ' nearby' : ''}.`,
        );
    }
}

async function whatis_menu_choice() {
    await flush_topl_more();
    const entries = [
        { text: 'What do you want to look at:', attr: ATR_INVERSE },
        { text: '', attr: 0 },
        { text: '/ - something on the map', attr: 0 },
        { text: "i - something you're carrying", attr: 0 },
        { text: '? - something else (by symbol or name)', attr: 0 },
        { text: '', attr: 0 },
        { text: 'm - nearby monsters', attr: 0 },
        { text: 'M - all monsters shown on map', attr: 0 },
        { text: 'o - nearby objects', attr: 0 },
        { text: 'O - all objects shown on map', attr: 0 },
        { text: 't - nearby traps', attr: 0 },
        { text: 'T - all seen or remembered traps', attr: 0 },
        { text: 'e - nearby engravings', attr: 0 },
        { text: 'E - all seen or remembered engravings', attr: 0 },
    ];
    const searchItems = entries
        .filter((e) => e.text && e.text[1] === ' ' && e.text[0] !== '')
        .filter((e) => '/i?mMoOtTeE'.includes(e.text[0]))
        .map((e) => ({
            selectable: true,
            selector: e.text[0],
            menuStr: e.text,
        }));
    // C windows.c select_menu gb.bot_disabled wrap.
    const _botPrev = set_bot_disabled(true);
    try {
        await paint_corner_nhw_menu(entries, '(end) ');
        await flush_screen(1);
        for (;;) {
            const key = await nhgetch();
            const ch = String.fromCharCode(key);
            // C process_menu_window MENU_SEARCH `:1698–1731` before dismiss.
            if (ch === MENU_SEARCH) {
                const res = await process_menu_search(searchItems, PICK_ONE);
                if (res.kind === 'finish' && res.item) {
                    await dismiss_nhw_menu();
                    return res.item.selector;
                }
                continue;
            }
            if (key === 27) {
                await dismiss_nhw_menu();
                return 'q';
            }
            // C wintty.c process_menu_window default arm: 'q' is no
            // selector, gacc, or page-key in this PICK_ONE menu, so C
            // tty_nhbell()s and keeps the menu (no reselect, screen-silent).
            if (ch === 'q') {
                tty_nhbell();
                continue;
            }
            if (ch === '\r' || ch === '\n' || ch === ' ') {
                // C PICK_ONE space on last page finishes with n==0; look-at
                // treats that as re-prompt. Do not docrt/cls.
                continue;
            }
            // lootabc false: y ≡ /, n ≡ ?
            if (ch === 'y') {
                await dismiss_nhw_menu();
                return '/';
            }
            if (ch === 'n') {
                await dismiss_nhw_menu();
                return '?';
            }
            if ('/i?mMoOtTeE'.includes(ch)) {
                await dismiss_nhw_menu();
                return ch;
            }
            // C process_menu_window default: tty_nhbell(); no redraw.
            tty_nhbell();
        }
    } finally {
        set_bot_disabled(_botPrev);
    }
}

/**
 * C ref: pager.c do_look(mode=0) / dowhatis.
 * cmdq_pop KEY skips the look-at menu (itemed `/` queues 'i', D-1686).
 * Returns ECMD_OK (0) — never takes time.
 */
export async function do_look(mode = 0) {
    const quick = mode === 1;
    let i = 0;
    let from_screen = false;
    let sym = 0;
    const cc = { x: game.u?.ux || 1, y: game.u?.uy || 0 };

    /* C pager.c `:1692–1700` — cmdq_pop KEY is the look choice;
       else cmdq_clear; goto dowhatiscmd (skip the menu). */
    const cmdq = cmdq_pop();
    if (cmdq) {
        if (cmdq.typ === CMDQ_KEY || cmdq.typ === 'key') {
            i = typeof cmdq.key === 'string'
                ? cmdq.key.charCodeAt(0)
                : (cmdq.key | 0);
        } else {
            cmdq_clear();
        }
    } else if (quick) {
        i = 'y'.charCodeAt(0);
    } else {
        i = (await whatis_menu_choice()).charCodeAt(0);
    }

    const ch = String.fromCharCode(i);
    switch (ch) {
    default:
    case 'q':
        return 0;
    case 'y':
    case '/':
        from_screen = true;
        sym = 0;
        cc.x = game.u.ux;
        cc.y = game.u.uy;
        break;
    case 'i': {
        /* C `:1822–1840` — display_inventory(NULL, TRUE); canned KEY
           is consumed there (D-1686). Lookup uses singular(xname). */
        const invlet = await display_inventory(null, true);
        if (!invlet || invlet === '\x1b') return 0;
        let name = '';
        for (const obj of game.invent || []) {
            if (obj.invlet === invlet) {
                name = singular(obj, xname);
                break;
            }
        }
        if (name) await checkfile(name, null, CHK_USR | CHK_DONT_ASK, null);
        return 0;
    }
    case '?': {
        from_screen = false;
        let out_str = await getlin('Specify what? (type the word)');
        if (out_str === ' ') {
            /* keep */
        } else {
            out_str = String(out_str || '').trim().replace(/\s+/g, ' ');
        }
        if (!out_str || out_str.charCodeAt(0) === 27) return 0;
        if (out_str.length > 1) {
            await checkfile(out_str, null, CHK_USR | CHK_DONT_ASK, null);
            return 0;
        }
        sym = out_str.charCodeAt(0);
        break;
    }
    case 'm':
        await look_all(true, true);
        return 0;
    case 'M':
        await look_all(false, true);
        return 0;
    case 'o':
        await look_all(true, false);
        return 0;
    case 'O':
        await look_all(false, false);
        return 0;
    case 't':
        await look_traps(true);
        return 0;
    case 'T':
        await look_traps(false);
        return 0;
    case 'e':
        await look_engrs(true);
        return 0;
    case 'E':
        await look_engrs(false);
        return 0;
    }

    const save_verbose = game.flags?.verbose !== false;
    if (game.flags) game.flags.verbose = save_verbose && !quick;

    let ans = 0;
    do {
        if (from_screen) {
            if (game.flags?.verbose !== false) {
                await pline(
                    'Please move the cursor to a monster, object or location.',
                );
            } else {
                await pline('Pick a monster, object or location.');
            }
            // Force --More-- before getpos when message is long
            if ((game._pending_message || '').length > 40) await more();
            // C: getpos(&cc, quick, …) — quick glance uses force=TRUE
            ans = await getpos(
                cc,
                quick,
                'a monster, object or location',
                brief_at,
            );
            if (ans < 0 || cc.x < 0) break;
            if (game.flags) game.flags.verbose = false;
        }

        if (from_screen) {
            const { out, first, found } = describe_looked(cc.x, cc.y);
            if (found) {
                // C: putmixed(WIN_MESSAGE) — no forced more(); pline wrap
                // already more()'s when out_str spans lines.
                await pline(out);
                // C: checkfile only when !LOOK_QUICK/ONCE && (VERBOSE || (help && !quick))
                if (
                    found === 1
                    && ans !== LOOK_QUICK
                    && ans !== LOOK_ONCE
                    && (ans === LOOK_VERBOSE || (game.flags?.help !== false && !quick))
                ) {
                    // C `:1944–1951`: (ans == LOOK_VERBOSE) ? chkfilDontAsk
                    // : chkfilNone — ':' shows the entry without asking.
                    // temp_buf + supplemental_name for do_supplemental_info
                    // (named omit: pager.c:2255, own row — the fill stays live).
                    const supplHolder = { s: '' };
                    await checkfile(
                        first, null, ans === LOOK_VERBOSE ? CHK_DONT_ASK : 0,
                        supplHolder,
                    );
                }
            } else {
                await pline("I've never heard of such things.");
            }
        } else if (sym) {
            await pline(`${String.fromCharCode(sym)}        (symbol lookup stub)`);
            await more();
        }
    } while (from_screen && !quick && ans !== LOOK_ONCE);

    if (game.flags) game.flags.verbose = save_verbose;
    return 0;
}

/** C ref: pager.c dowhatis */
export async function dowhatis() {
    return do_look(0);
}

/** C ref: pager.c doquickwhatis — ';' glance */
export async function doquickwhatis() {
    return do_look(1);
}

/**
 * C ref: mdlib.c build_options + version.c doextversion OPTIONS_AT_RUNTIME
 * path (do_runtime_info). Contest MacOS tty/nosound feature set; :PATMATCH:
 * / :LUACOPYRIGHT: already substituted (posixregex / Lua copyright).
 * Outdented headers get a blank separator; blank/prolog lines are skipped.
 */
function doextversion_runtime_lines() {
    // C putstr order after getversionstring; prolog "    NetHack version…"
    // from build_options is skipped by doextversion's prolog flag.
    const runtime = [
        'Options compiled into this edition:',
        '    I32LP64 data model, color, data file compression, deferred handling of',
        '    hangup signal, insurance files for recovering from crashes, live logging',
        '    support, log file, extended log file, errors and warnings log file, mail',
        '    daemon, news file, internal pager used for viewing help files, pattern',
        '    matching via posixregex, pseudo random numbers generated by ISAAC64,',
        '    strong PRNG seed from /dev/random, restore saved games via menu, screen',
        '    clipping, shell command, traditional status display, status via',
        '    windowport with highlighting, suspend command, terminal info library,',
        '    system configuration at run-time, show stack trace on error, launch',
        '    browser to report issues, save and bones files accepted from version',
        '    5.0.0 only, and basic NetHack features.',
        'Supported windowing system:',
        '    "tty" (traditional text with optional line-drawing).',
        'Supported soundlib:',
        '    "nosound".',
        "NetHack 5.0.* uses the 'Lua' interpreter to process some data:",
        '    Lua 5.4.8  Copyright (C) 1994-2025 Lua.org, PUC-Rio',
        // mdlib.lua_info Permission block (5-space continuation indent)
        '    "Permission is hereby granted, free of charge, to any person obtaining',
        '     a copy of this software and associated documentation files (the',
        '     "Software"), to deal in the Software without restriction including',
        '     without limitation the rights to use, copy, modify, merge, publish,',
        '     distribute, sublicense, and/or sell copies of the Software, and to',
        '     permit persons to whom the Software is furnished to do so, subject to',
        '     the following conditions:',
        '     The above copyright notice and this permission notice shall be',
        '     included in all copies or substantial portions of the Software."',
    ];
    const out = [];
    for (const buf of runtime) {
        if (buf && buf[0] !== ' ') out.push(''); // outdented header separator
        if (!buf) continue;
        out.push(buf);
    }
    return out;
}

/**
 * C ref: version.c doextversion — version text + runtime options;
 * triggers get_lua_version → nhlib shuffle once.
 * Also `#version` via extcmdlist (cmd.c).
 */
export async function doextversion() {
    get_lua_version_shuffle();
    // C getversionstring → nomakedefs.version_id (runner normalizes date).
    const lines = [
        getversionstring(),
        ...doextversion_runtime_lines(),
    ];
    await show_text_pages(lines);
    return 0;
}

/**
 * C ref: version.c doversion `:156–165` — the #versionshort command
 * (cmd.c key 'V'). menu_requested (m prefix, CMD_M_PREFIX) takes the
 * doextversion arm; otherwise pline the getversionstring text.
 * ECMD_OK, no turn, no RNG.
 * @returns {Promise<number>}
 */
export async function doversion() {
    if (game.iflags?.menu_requested) return doextversion();
    await pline(getversionstring());
    return 0;
}

/**
 * C ref: cmd.c key2txt — short label for one-byte key.
 */
function key2txt(c) {
    if (c === 32) return '<space>';
    if (c === 27) return '<esc>';
    if (c === 10 || c === 13) return '<enter>';
    if (c === 127) return '<del>';
    if (c >= 1 && c <= 26) return `^${String.fromCharCode(c + 64)}`;
    return String.fromCharCode(c);
}

/**
 * C ref: cmd.c key2extcmddesc — description for a command key.
 * Branch envelope: letters bound in rhack/cmd.js + common meta; full
 * misc_keys / number_pad / rush-run prefixes deferred.
 */
function key2extcmddesc(key) {
    const ch = typeof key === 'number' ? String.fromCharCode(key) : String(key);
    /** @type {Record<string, [string, string]>} ef_desc, ef_txt */
    const binds = {
        i: ['show your inventory', 'inventory'],
        ':': ['look here', 'look'],
        ',': ['pick up things', 'pickup'],
        '.': ['rest one move', 'wait'],
        s: ['search for traps and secret doors', 'search'],
        o: ['open a door', 'open'],
        c: ['close a door', 'close'],
        a: ['apply (use) something', 'apply'],
        e: ['eat something', 'eat'],
        q: ['quaff (drink) something', 'quaff'],
        r: ['read a scroll or spellbook', 'read'],
        z: ['zap a wand', 'zap'],
        t: ['throw something', 'throw'],
        f: ['fire ammunition', 'fire'],
        w: ['wield a weapon', 'wield'],
        W: ['wear armor', 'wear'],
        T: ['take off armor', 'takeoff'],
        P: ['put on an accessory', 'puton'],
        R: ['remove an accessory', 'remove'],
        E: ['engrave into the floor', 'engrave'],
        d: ['drop an item', 'drop'],
        '/': ['identify a glyph or creature', 'whatis'],
        '?': ['get this help menu', 'help'],
        '<': ['go up a staircase', 'up'],
        '>': ['go down a staircase', 'down'],
        '_': ['travel to a map location', 'travel'],
        ' ': ['rest one move', 'wait'],
    };
    const b = binds[ch];
    if (!b) return null;
    return `${b[0]} (#${b[1]})`;
}

/**
 * C ref: pager.c whatdoes_help — page KEYHELP with leading WS stripped.
 */
async function whatdoes_help() {
    const raw = readDat('keyhelp');
    if (!raw) {
        await pline('Cannot open "keyhelp" data file!');
        await more();
        return;
    }
    const lines = [];
    for (const line of raw.replace(/\r\n/g, '\n').split('\n')) {
        if (line.startsWith('#')) continue;
        let p = 0;
        while (p < line.length && (line[p] === ' ' || line[p] === '\t')) p++;
        lines.push(line.slice(p));
    }
    while (lines.length && lines[lines.length - 1] === '') lines.pop();
    await show_text_pages(lines);
}

/**
 * C ref: pager.c dowhatdoes_core — key2extcmddesc → "%-8s%s.".
 * help_dir (cmd.c) looks up the Ctrl-letter for an invalid getdir
 * key when the prompt is "^".
 */
export function dowhatdoes_core(q) {
    const ec = key2extcmddesc(q);
    if (!ec) return null;
    const keybuf = key2txt(q).padEnd(8, ' ');
    return `${keybuf}${ec}.`;
}

/**
 * C ref: pager.c dowhatdoes — tip once, yn_function "What command?", describe.
 */
export async function dowhatdoes() {
    if (!game._whatdoes_once) {
        await pline("Ask about '&' or '?' to get more info.");
        // C: previous topline / yn_function path surfaces --More-- before prompt
        await more();
        game._whatdoes_once = true;
    }
    // C: yn_function("What command?", NULL, '\0', TRUE) — prompt + one key
    game._pending_message = 'What command? ';
    await flush_screen(1);
    const disp = game.nhDisplay;
    if (disp?.setCursor) disp.setCursor(14, 0); // after "What command? "
    const q = await nhgetch();
    game._pending_message = '';
    const reslt = dowhatdoes_core(q);
    if (reslt) {
        if (q === 38 || q === 63) await whatdoes_help(); // '&' or '?'
        const nl = reslt.indexOf('\n');
        if (nl < 0) {
            await pline(reslt);
        } else {
            await pline(`${reslt.slice(0, nl)},`);
            await pline(`${reslt.slice(0, 8)}${reslt.slice(nl + 1)}`);
        }
    } else {
        const label = key2txt(q);
        await pline(
            `No such command '${label}', char code ${q} (0${q.toString(8).padStart(3, '0')} or 0x${q.toString(16).padStart(2, '0')}).`,
        );
    }
    return 0;
}

/**
 * C ref: pager.c dispfile_help `:2748–2752` — display_file(HELP, TRUE).
 */
async function dispfile_help() {
    await display_file(HELP, true);
}

/** C ref: pager.c dispfile_shelp `:2754–2758` — display_file(SHELP, TRUE). */
async function dispfile_shelp() {
    await display_file(SHELP, true);
}

/** C ref: pager.c dispfile_optionfile `:2760–2764`. */
async function dispfile_optionfile() {
    await display_file(OPTIONFILE, true);
}

/** C ref: pager.c dispfile_optmenu `:2766–2770`. */
async function dispfile_optmenu() {
    await display_file(OPTMENUHELP, true);
}

/** C ref: pager.c dispfile_license `:2772–2776`. */
async function dispfile_license() {
    await display_file(LICENSE, true);
}

/** C ref: pager.c dispfile_debughelp `:2778–2782`. */
async function dispfile_debughelp() {
    await display_file(DEBUGHELP, true);
}

/** C ref: pager.c dispfile_usagehelp `:2784–2788`. */
async function dispfile_usagehelp() {
    await display_file(USAGEHELP, true);
}

/**
 * C ref: pager.c dohistory `:2961–2965` — the 'V' command; display HISTORY.
 */
export async function dohistory() {
    await display_file(HISTORY, true);
    return ECMD_OK;
}

/** C ref: pager.c hmenu_doextversion `:2790–2794` — (void) doextversion(). */
async function hmenu_doextversion() {
    await doextversion();
}

/** C ref: pager.c hmenu_dohistory `:2796–2800` — (void) dohistory(). */
async function hmenu_dohistory() {
    await dohistory();
}

/** C ref: pager.c hmenu_dowhatis `:2802–2805` — (void) dowhatis(). */
async function hmenu_dowhatis() {
    await dowhatis();
}

/** C ref: pager.c hmenu_dowhatdoes `:2808–2812` — (void) dowhatdoes(). */
async function hmenu_dowhatdoes() {
    await dowhatdoes();
}

/** C ref: pager.c hmenu_doextlist `:2814–2818` — (void) doextlist(). */
async function hmenu_doextlist() {
    const { doextlist } = await import('./cmd.js');
    await doextlist();
}

/**
 * C ref: pager.c dohelp — help menu.
 */
export async function dohelp() {
    await flush_topl_more();
    const items = [
        { key: 'a', text: 'About NetHack (version information).', fn: hmenu_doextversion },
        { key: 'b', text: 'Long description of the game and commands.', fn: dispfile_help },
        { key: 'c', text: 'List of game commands.', fn: dispfile_shelp },
        { key: 'd', text: 'Concise history of NetHack.', fn: hmenu_dohistory },
        { key: 'e', text: 'Info on a character in the game display.', fn: hmenu_dowhatis },
        { key: 'f', text: 'Info on what a given key does.', fn: hmenu_dowhatdoes },
        // C ref: options.c option_help via pager.c dohelp help_menu
        { key: 'g', text: 'List of game options.', fn: async () => {
            await show_text_pages(option_help_lines());
        } },
        { key: 'h', text: 'Longer explanation of game options.', fn: dispfile_optionfile },
        { key: 'i', text: "Using the '#optionsfull' or 'm O' command to set options.", fn: dispfile_optmenu },
        // C ref: cmd.c dokeylist
        { key: 'j', text: 'Full list of keyboard commands.', fn: async () => {
            await show_text_pages(dokeylist_lines());
        } },
        { key: 'k', text: 'List of extended commands.', fn: hmenu_doextlist },
        // C ref: pager.c domenucontrols → options.c show_menu_controls
        { key: 'l', text: 'List menu control keys.', fn: async () => {
            await show_text_pages(domenucontrols_lines());
        } },
        { key: 'm', text: "Description of NetHack's command line.", fn: dispfile_usagehelp },
        { key: 'n', text: 'The NetHack license.', fn: dispfile_license },
        // C ref: pager.c docontact
        { key: 'o', text: 'Support information.', fn: async () => {
            await show_text_pages([
                'To contact the NetHack development team directly,',
                "see the 'Contact' form on our website or email <devteam@nethack.org>.",
                '',
                'For more information on NetHack, or to report a bug,',
                'visit our website "https://www.nethack.org/".',
            ]);
        } },
    ];
    if (game.flags?.debug || game.wizard) {
        items.push({
            key: 'p',
            text: 'List of wizard-mode commands.',
            fn: dispfile_debughelp,
        });
    }

    const entries = [
        { text: 'Select one item:', attr: ATR_INVERSE },
        { text: '', attr: 0 },
        ...items.map(it => ({ text: `${it.key} - ${it.text}`, attr: 0 })),
    ];

    await paint_corner_nhw_menu(entries, '(end) ');
    await flush_screen(1);
    for (;;) {
        const key = await nhgetch();
        const ch = String.fromCharCode(key);
        if (key === 27 || ch === 'q') {
            await dismiss_nhw_menu();
            return 0;
        }
        if (ch === '\r' || ch === '\n' || ch === ' ') continue;
        const it = items.find(x => x.key === ch);
        if (it) {
            await dismiss_nhw_menu();
            await it.fn();
            return 0;
        }
        // C process_menu_window default: tty_nhbell(); no docrt/cls.
        tty_nhbell();
    }
}
