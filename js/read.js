// read.js — Read command / scroll effects (partial).
// C ref: read.c doread, seffects, seffect_magic_mapping, seffect_teleportation,
// seffect_light / litroom / set_lit; invent.c getobj; detect.c do_mapping;
// spell.c study_book (via spell.js); teleport.c scrolltele/safe_teleds;
// zap.c lightdamage (non-gremlin stub).
//
// Branch envelope: getobj read loop (scrolls/spellbooks + ?/* pickinv) +
// SCROLL_CLASS path for SCR_MAGIC_MAPPING / SCR_TELEPORTATION / SCR_LIGHT +
// SPBOOK_CLASS → study_book (already-known refresh yn). Named omissions:
// fortune/shirt/credit-card/marker/coin/orb/candy/Braille Blind gates;
// study_book occupation/learn / novel / cursed_book; other seffect_*;
// nommap/Hallucination/blessed-SDOOR convert body; notice_mon_off/on;
// trycall; can_chant silently; check_capacity; SPE_MAGIC_MAPPING cast;
// cursed/confused level_tele; Teleport_control getpos; confused light
// yellow/black-light pets; snuff_lit / impact_arti_light / Punished ball;
// gremlin light-hit list; Rogue whole-room light; Sunsword radius-0.

import { game } from './gstate.js';
import { nhgetch } from './input.js';
import { flush_screen, flush_topl_more, pline, newsym } from './display.js';
import { SCROLL_CLASS, SPBOOK_CLASS, objectNames } from './objects.js';
import { weight } from './mkobj.js';
import { A_WIS, exercise } from './attrib.js';
import { makeknown, display_pickinv_reply } from './invent.js';
import { more_experienced } from './exper.js';
import { do_mapping, cvt_sdoor_to_door } from './detect.js';
import { study_book } from './spell.js';
import { scrolltele } from './teleport.js';
import {
    COLNO, ROWNO, SDOOR, CORR, ROOMOFFSET, Is_rogue_level, Is_waterlevel,
} from './const.js';
import { vision_recalc, do_clear_area } from './vision.js';

const SCR_MAGIC_MAPPING = objectNames.indexOf('SCR_MAGIC_MAPPING');
const SCR_TELEPORTATION = objectNames.indexOf('SCR_TELEPORTATION');
const SCR_LIGHT = objectNames.indexOf('SCR_LIGHT');
const SCR_BLANK_PAPER = objectNames.indexOf('SCR_BLANK_PAPER');
const SPE_BOOK_OF_THE_DEAD = objectNames.indexOf('SPE_BOOK_OF_THE_DEAD');
const SPE_NOVEL = objectNames.indexOf('SPE_NOVEL');
const SPE_BLANK_PAPER = objectNames.indexOf('SPE_BLANK_PAPER');

/** C gk.known — scroll effect observed this read */
let known = false;

/** Invent-order letters for scrolls + spellbooks (C read_ok SUGGEST). */
function read_lets() {
    const lets = [];
    for (const o of game.invent || []) {
        if (!o?.invlet) continue;
        if (o.oclass === SCROLL_CLASS || o.oclass === SPBOOK_CLASS) {
            lets.push(o.invlet);
        }
    }
    return lets.join('');
}

/**
 * C ref: invent.c getobj("read", read_ok, GETOBJ_PROMPT)
 * Loop on missing letter; Esc/space/return → Never mind; ?/* → pickinv.
 */
async function getobj_read() {
    for (;;) {
        await flush_topl_more();
        const lets = read_lets();
        const query = lets
            ? `What do you want to read? [${lets} or ?*]`
            : 'What do you want to read? [*]';
        const prompt = `${query} `;

        game._pending_message = prompt;
        const disp = game.nhDisplay;
        await flush_screen(1);
        if (disp?.setCursor) disp.setCursor(prompt.length, 0);

        const key = await nhgetch();
        const ch = String.fromCharCode(key);

        if (key === 27 || ch === ' ' || ch === '\n' || ch === '\r') {
            if (game.flags?.verbose !== false) await pline('Never mind.');
            return null;
        }
        if (ch === '?' || ch === '*') {
            // C: display_pickinv(lets or all, want_reply) → selected invlet
            const ilet = await display_pickinv_reply(ch === '*' ? '*' : lets);
            if (ilet === '\x1b') {
                if (game.flags?.verbose !== false) await pline('Never mind.');
                return null;
            }
            if (!ilet) continue; // Space/Return → re-prompt getobj
            const picked = (game.invent || []).find((o) => o.invlet === ilet);
            if (!picked) {
                await pline("You don't have that object.");
                continue;
            }
            if (picked.oclass !== SCROLL_CLASS && picked.oclass !== SPBOOK_CLASS) {
                await pline('That is a silly thing to read.');
                return null;
            }
            game._pending_message = '';
            return picked;
        }

        const otmp = (game.invent || []).find(o => o.invlet === ch);
        if (!otmp) {
            await pline("You don't have that object.");
            continue;
        }
        // DOWNPLAY non-scroll/book → silly_thing; seed path is scroll/book
        if (otmp.oclass !== SCROLL_CLASS && otmp.oclass !== SPBOOK_CLASS) {
            await pline('That is a silly thing to read.');
            return null;
        }
        game._pending_message = '';
        return otmp;
    }
}

/** C ref: invent.c useup() — consume one from a stack / remove if gone. */
function useup(otmp) {
    if (!otmp) return;
    if ((otmp.quan || 1) > 1) {
        otmp.quan--;
        otmp.owt = weight(otmp);
        return;
    }
    const inv = game.invent || [];
    const idx = inv.indexOf(otmp);
    if (idx >= 0) inv.splice(idx, 1);
}

/**
 * C ref: read.c learnscrolltyp / learnscroll — makeknown + XP when new.
 */
function learnscroll(scroll) {
    if (!scroll || scroll.oclass === SPBOOK_CLASS) return;
    const otyp = scroll.otyp | 0;
    const oc = game.objects?.[otyp];
    if (!oc) return;
    if (!game.u?.Blind) scroll.dknown = true;
    if (!oc.oc_name_known) {
        makeknown(otyp);
        more_experienced(0, 10);
    }
}

/**
 * C ref: read.c seffect_magic_mapping
 * nommap / Hallucination / blessed full SDOOR convert / confused-cursed
 * map-screw path included for call order; notice_mon deferred.
 */
async function seffect_magic_mapping(sobj) {
    const is_scroll = sobj.oclass === SCROLL_CLASS;
    const sblessed = !!sobj.blessed;
    const scursed = !!sobj.cursed;
    const confused = !!(game.u?.Confusion);
    const lf = game.level?.flags;

    if (is_scroll) {
        if (lf?.nommap) {
            await pline('Your mind is filled with crazy lines!');
            if (game.u?.Hallucination) await pline('Wow!  Modern art.');
            else await pline('Your head spins in bewilderment.');
            // make_confused deferred
            return;
        }
        if (sblessed) {
            for (let x = 1; x < COLNO; x++) {
                for (let y = 0; y < ROWNO; y++) {
                    const lev = game.level?.at(x, y);
                    if (!lev || lev.typ !== SDOOR) continue;
                    cvt_sdoor_to_door(lev);
                    if (Is_rogue_level(game.u?.uz)) vision_recalc(1);
                    newsym(x, y);
                }
            }
        }
        known = true;
    }

    if (lf?.nommap) {
        await pline('Your head spins as something blocks the spell!');
        // make_confused deferred
        return;
    }
    await pline('A map coalesces in your mind!');
    const cval = scursed && !confused;
    const u = game.u || (game.u = {});
    if (cval) u.Confusion = 1; // screw up map
    // notice_mon_off deferred
    do_mapping();
    // notice_mon_on deferred
    if (cval) {
        u.Confusion = 0;
        await pline("Unfortunately, you can't grasp the details.");
    }
}

/**
 * C ref: read.c seffect_teleportation
 * Uncursed unconfused → scrolltele (learnscroll inside).
 * Cursed/confused level_tele deferred (named omission).
 */
async function seffect_teleportation(sobj) {
    const scursed = !!sobj.cursed;
    const confused = !!(game.u?.Confusion);
    if (confused || scursed) {
        // level_tele deferred (named omission)
        known = true;
        return;
    }
    await scrolltele(sobj);
    // learnscroll handled inside scrolltele; do not set known here
}

/**
 * C ref: read.c set_lit — levl[x][y].lit = !!val; gremlin queue deferred.
 */
function set_lit(x, y, val) {
    const loc = game.level?.at(x, y);
    if (!loc) return;
    if (val) {
        loc.lit = 1;
        // PM_GREMLIN light-hit list deferred
    } else {
        loc.lit = 0;
        // snuff_light_source deferred
    }
}

/**
 * C ref: zap.c lightdamage — non-gremlin returns amt (no RNG).
 * Gremlin rnd/losehp path deferred.
 */
function lightdamage(_obj, _ordinary, amt) {
    return amt;
}

/**
 * C ref: read.c litroom — light/darken nearby terrain + message.
 * Envelope: ordinary scroll light/dark; Rogue whole-room; swallow/water
 * no_op message; vision_recalc(2) + delayed full recalc.
 * Deferred: snuff_lit / artifact_light / Punished move_bc / gremlin hits /
 * Sunsword spot / Underwater beyond no_op gate.
 */
async function litroom(on, obj) {
    const u = game.u || {};
    const Blind = !!(u.Blind || u.ublind);
    const blessed_effect = !!(obj && obj.oclass === SCROLL_CLASS && obj.blessed);
    const no_op = !!(u.uswallow || u.Underwater || Is_waterlevel(u.uz));

    if (!on) {
        // Inventory lamp snuff / artifact impact deferred
        if (!Blind) {
            if (u.uswallow) {
                await pline('It seems even darker in here than before.');
            } else {
                await pline('You are surrounded by darkness!');
            }
        }
    } else {
        // Blessed artifact_light impact deferred
        if (u.uswallow) {
            // engulfer-lit messages deferred (Blind-silent matches C)
        } else if (!Blind && (!Is_rogue_level(u.uz)
            || game.level?.at(u.ux, u.uy)?.typ !== CORR)) {
            await pline(`A lit field ${no_op ? 'briefly ' : ''}surrounds you!`);
        }
    }

    if (no_op) return;

    if (Is_rogue_level(u.uz)) {
        const rnum = (game.level?.at(u.ux, u.uy)?.roomno | 0) - ROOMOFFSET;
        const rooms = game.rooms || game.level?.rooms;
        if (rnum >= 0 && rooms?.[rnum]) {
            const rm = rooms[rnum];
            for (let rx = rm.lx - 1; rx <= rm.hx + 1; rx++) {
                for (let ry = rm.ly - 1; ry <= rm.hy + 1; ry++) {
                    set_lit(rx, ry, on ? 1 : null);
                }
            }
            rm.rlit = on ? 1 : 0;
        }
    } else {
        // Sunsword radius-0 path deferred (scrolls use clear_area)
        do_clear_area(
            u.ux, u.uy,
            blessed_effect ? 9 : 5,
            set_lit,
            on ? 1 : null,
        );
    }

    if (!Blind) {
        vision_recalc(2);
        // Punished move_bc restore deferred
    }
    game.vision_full_recalc = 1;
    // gremlin light_hits after forced recalc deferred
}

/**
 * C ref: read.c seffect_light
 * Unconfused: litroom(!cursed) + lightdamage when !cursed.
 * Confused yellow/black-light pets deferred (named omission).
 */
async function seffect_light(sobj) {
    const scursed = !!sobj.cursed;
    const confused = !!(game.u?.Confusion);
    const Blind = !!(game.u?.Blind || game.u?.ublind);

    if (!confused) {
        if (!Blind) known = true;
        await litroom(!scursed, sobj);
        if (!scursed) {
            if (lightdamage(sobj, true, 5)) known = true;
        }
    } else {
        // confused PM_YELLOW_LIGHT / PM_BLACK_LIGHT swarm deferred
        await pline('Tiny lights sparkle in the air momentarily.');
    }
}

/**
 * C ref: read.c seffects — oc_magic exercise + otyp dispatch.
 * @returns {number} 0 = caller useup/learn; 1 = already used up;
 *   -1 = unimplemented (caller must not useup)
 */
async function seffects(sobj) {
    const otyp = sobj.otyp;
    const oc = game.objects?.[otyp];

    // C: exercise before switch for any oc_magic
    if (oc?.oc_magic) exercise(A_WIS, true);

    switch (otyp) {
    case SCR_MAGIC_MAPPING:
        await seffect_magic_mapping(sobj);
        break;
    case SCR_TELEPORTATION:
        await seffect_teleportation(sobj);
        break;
    case SCR_LIGHT:
        await seffect_light(sobj);
        break;
    default:
        // Other seffect_* deferred — do not useup
        await pline('That scroll is not implemented yet.');
        return -1;
    }
    // sobj gone → 1; still present → 0 (caller useup)
    return sobj ? 0 : 1;
}

/**
 * C ref: read.c doread / #read ('r')
 * @returns {Promise<number>} 0 = cancel/no turn, 1 = took time
 */
export async function doread() {
    known = false;
    // check_capacity deferred

    const scroll = await getobj_read();
    if (!scroll) return 0;

    const otyp = scroll.otyp;
    // cookie / shirt / credit / marker / coin / orb / candy deferred

    if (scroll.oclass !== SCROLL_CLASS && scroll.oclass !== SPBOOK_CLASS) {
        await pline('That is a silly thing to read.');
        return 0;
    }

    // Blind formula gates deferred (starting Wizard not Blind)

    // C: literate conduct before SPBOOK study_book (exclude Dead/novel/blank)
    if (otyp !== SPE_BOOK_OF_THE_DEAD && otyp !== SPE_NOVEL
        && otyp !== SPE_BLANK_PAPER && otyp !== SCR_BLANK_PAPER) {
        if (!game.u) game.u = {};
        if (!game.u.uconduct) game.u.uconduct = {};
        game.u.uconduct.literate = (game.u.uconduct.literate | 0) + 1;
        // livelog deferred
    }

    if (scroll.oclass === SPBOOK_CLASS) {
        // C: return study_book(scroll) ? ECMD_TIME : ECMD_OK
        return (await study_book(scroll)) ? 1 : 0;
    }

    // Gate unported scroll otyps before disappear/useup (C would seffect)
    if (otyp !== SCR_MAGIC_MAPPING && otyp !== SCR_BLANK_PAPER
        && otyp !== SCR_TELEPORTATION && otyp !== SCR_LIGHT) {
        await pline('That scroll is not implemented yet.');
        return 0;
    }

    scroll.in_use = true;
    if (otyp !== SCR_BLANK_PAPER) {
        const Blind = !!(game.u?.Blind || game.u?.ublind);
        if (Blind) {
            await pline(
                'As you pronounce the formula on it, the scroll disappears.',
            );
        } else {
            await pline('As you read the scroll, it disappears.');
        }
        // Confusion mispronounce deferred
    }

    const sr = await seffects(scroll);
    if (sr < 0) {
        scroll.in_use = false;
        return 0;
    }
    if (!sr) {
        const oc = game.objects?.[otyp];
        if (oc && !oc.oc_name_known) {
            if (known) learnscroll(scroll);
            // else trycall deferred
        }
        scroll.in_use = false;
        if (otyp !== SCR_BLANK_PAPER) useup(scroll);
    }
    return 1;
}
