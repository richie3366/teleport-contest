// pray_pat_spell_gcrown.js — C pray.c pleased() pat_on_head cases 6–8: give_spell(), gcrownu().
// C refs: pray.c give_spell, gcrownu, pat_on_head cases 6–8; mkobj.c mkobj(SPBOOK_no_NOVEL), mksobj_init SPBOOK;
//         objnam.c rnd_class; spell.c known_spell, force_learn_spell, spell_skilltype (objects[].oc_skill); spell.h KEEN.

import { rnd, rn2 } from './rng.js';
import { pline, newsym } from './display.js';
import { FROMOUTSIDE, A_LAWFUL, A_NEUTRAL, A_CHAOTIC, P_ISRESTRICTED, P_LONG_SWORD, P_BROAD_SWORD } from './const.js';
import { NH5_SPBOOK_CLASS, NH5_WEAPON_CLASS } from './nh5_objclass.js';
import { SPBOOK_CLASS_MKOBJ_OC_PROB_ROWS, SPELLBOOK_OTYP_LEVEL, SPELLBOOK_OTYP_OC_SKILL } from './mkobj_wizard_ini_inv_data.js';
import { SPELLBOOK_SKILL_LEVEL_ROWS } from './spellbook_skill_level_data.js';
import { placeFloorObjectInLevel, stackObjOnFloorInLevel } from './floorobj.js';
import { observeObjectHeroMinimalLikeC, discoverObjectHeroLikeC, doname } from './objnam.js';
import { updateInventory } from './invent.js';
import { isWeptoolObjLikeC } from './hero_hands.js';
import { addWeaponSkill, unrestrictWeaponSkill } from './u_init_skills.js';
import { weaponType } from './weapon_kind.js';

/** C: pray.c `#define PIOUS 20` */
const PIOUS = 20;
/** C: spell.h `KEEN` */
const KEEN = 20000;
/** C: spell.h `NO_SPELL` */
const NO_SPELL = 0;
/** C: include/spell.h enum spellknowledge */
const spe_Forgotten = -1;
const spe_Unknown = 0;
const spe_Fresh = 1;
const spe_GoingStale = 2;

const OTYP_SPE_BLANK_PAPER = 407;
const OTYP_SPE_BOOK_OF_THE_DEAD = 409;
const OTYP_MAGIC_MARKER = 242;
const OTYP_SPE_FINGER_OF_DEATH = 371;
const OTYP_SPE_RESTORE_ABILITY = 392;
const OTYP_LONG_SWORD = 55;
const OTYP_RUNESWORD = 59;
const STRANGE_OBJECT = 0;

/** C: spl_book[] size — LAST_SPELL + 1 style; safe upper bound for force_learn loops. */
const MAXSPELL = 52;

/** @param {readonly (readonly [number, number])[]} rows */
function ocProbMapFromRows(rows) {
    /** @type {Map<number, number>} */
    const m = new Map();
    for (const r of rows) m.set(r[0] | 0, r[1] | 0);
    return m;
}

const SPBOOK_OC_PROB = ocProbMapFromRows(SPBOOK_CLASS_MKOBJ_OC_PROB_ROWS);

/**
 * C: objnam.c rnd_class(first, last) — sum objects[i].oc_prob.
 * @param {number} first
 * @param {number} last
 */
function rndClassSpbookOtypLikeC(first, last) {
    const lo = first | 0;
    const hi = last | 0;
    if (hi <= lo) return lo === hi ? lo : STRANGE_OBJECT;
    let sum = 0;
    for (let i = lo; i <= hi; i++) sum += SPBOOK_OC_PROB.get(i) | 0;
    if (!sum) return rn1(hi - lo + 1, lo);
    let x = rnd(sum);
    for (let i = lo; i <= hi; i++) {
        x -= SPBOOK_OC_PROB.get(i) | 0;
        if (x <= 0) return i;
    }
    return hi;
}

/** C: mkobj.c next_ident — context.ident += rnd(2) (contest: consume draw only). */
function nextIdentLikeC() {
    rnd(2);
}

/**
 * C: mkobj.c blessorcurse(otmp, chance) on fresh obj (!blessed && !cursed).
 * @param {{ blessed?: number; cursed?: number }} bc
 * @param {number} chance
 */
function blessorcurseFreshObjLikeC(bc, chance) {
    if (bc.blessed | 0 || bc.cursed | 0) return;
    if (!rn2(chance)) {
        if (!rn2(2)) bc.cursed = 1;
        else bc.blessed = 1;
    }
}

/** C: spell.c spell_skilltype — objects[booktype].oc_skill */
function spellSkilltypeLikeC(otyp) {
    return SPELLBOOK_OTYP_OC_SKILL.get(otyp | 0) ?? P_ISRESTRICTED;
}

/** @param {import('./gstate.js').game} g */
function pRestrictedSkillLikeC(g, skill) {
    const u = g.u;
    if (!u?.weapon_skills?.[skill | 0]) return true;
    return (u.weapon_skills[skill | 0].skill | 0) === P_ISRESTRICTED;
}

/** @param {import('./gstate.js').game} g */
function ensureSplBookLikeC(g) {
    const u = g.u;
    if (!u) return;
    if (!Array.isArray(u.spl_book) || u.spl_book.length !== MAXSPELL) {
        u.spl_book = Array.from({ length: MAXSPELL }, () => ({ sp_id: NO_SPELL, sp_lev: 0, sp_know: 0 }));
    }
}

/**
 * C: spell.c known_spell
 * @param {import('./gstate.js').game} g
 * @param {number} otyp
 */
function knownSpellLikeC(g, otyp) {
    ensureSplBookLikeC(g);
    const book = g.u.spl_book;
    for (let i = 0; i < MAXSPELL; i++) {
        const id = book[i].sp_id | 0;
        if (id === NO_SPELL) break;
        if (id === (otyp | 0)) {
            const k = book[i].sp_know | 0;
            if (k > KEEN / 10) return spe_Fresh;
            if (k > 0) return spe_GoingStale;
            return spe_Forgotten;
        }
    }
    return spe_Unknown;
}

/**
 * C: spell.c force_learn_spell — returns '\0' or spell letter.
 * @param {import('./gstate.js').game} g
 * @param {number} otyp
 * @returns {string} single char or '\0'
 */
function forceLearnSpellLikeC(g, otyp) {
    const t = otyp | 0;
    if (t === OTYP_SPE_BLANK_PAPER || t === OTYP_SPE_BOOK_OF_THE_DEAD) return '\0';
    if (knownSpellLikeC(g, t) === spe_Fresh) return '\0';

    ensureSplBookLikeC(g);
    const book = g.u.spl_book;
    let i;
    for (i = 0; i < MAXSPELL; i++) {
        const id = book[i].sp_id | 0;
        if (id === NO_SPELL || id === t) break;
    }
    if (i >= MAXSPELL) return '\0';

    book[i].sp_id = t;
    book[i].sp_lev = SPELLBOOK_OTYP_LEVEL.get(t) | 0;
    book[i].sp_know = KEEN;
    if (i < 26) return String.fromCharCode('a'.charCodeAt(0) + i);
    return String.fromCharCode('A'.charCodeAt(0) + (i - 26));
}

/** @param {import('./gstate.js').game} g */
function carryingOtypInInventLikeC(g, otyp) {
    const t = otyp | 0;
    for (let o = g.invent; o; o = o.nobj) {
        if ((o.otyp | 0) === t) return true;
    }
    return false;
}

/** C: pray.c / wield.c u_wield_art — stub: no artifact wield check yet. */
function uWieldArtStub() {
    return false;
}

/** C: pray.c ok_wep */
function okWepLikeC(g, o) {
    if (!o) return false;
    const oc = o.oclass | 0;
    if (oc === NH5_WEAPON_CLASS) return true;
    return isWeptoolObjLikeC(o);
}

function spellObjNameFromOtyp(otyp) {
    const row = SPELLBOOK_SKILL_LEVEL_ROWS.find((r) => (r.otyp | 0) === (otyp | 0));
    if (!row?.sn) return 'spell';
    return row.sn
        .replace(/^SPE_/, '')
        .replace(/_/g, ' ')
        .toLowerCase();
}

/**
 * C: pray.c at_your_feet (Something when Blind).
 * @param {import('./gstate.js').game} g
 * @param {string} str
 */
async function atYourFeetLikeC(g, str) {
    const u = g.u;
    if (!u) return;
    const blind = !!(u.Blind | 0) || !!(u.ublind | 0) || (u.timed?.blind ?? 0) > 0;
    const s = blind ? 'Something' : str;
    if (u.uswallow | 0) {
        await pline(`${s} drop into something's stomach!`); /* C: mon_nam — stub */
    } else if (u.Levitation | 0) {
        await pline(`${s} lands beneath you!`);
    } else {
        await pline(`${s} appear at your feet!`);
    }
}

/**
 * C: invent.c makeknown(otyp) for spellbooks — `g.objectDiscovery` + discover_object.
 * @param {import('./gstate.js').game} g
 * @param {number} otyp
 */
function makeknownSpellbookLikeC(g, otyp) {
    const t = otyp | 0;
    if (!(g.objectDiscovery instanceof Set)) g.objectDiscovery = new Set();
    g.objectDiscovery.add(t);
    discoverObjectHeroLikeC(g, t, true, false, false);
}

/**
 * C: pray.c give_spell
 * @param {import('./gstate.js').game} g
 */
export async function giveSpellHeroLikeC(g) {
    const u = g.u;
    if (!u || !g.level) return;

    const firstSpb = SPBOOK_CLASS_MKOBJ_OC_PROB_ROWS[0][0] | 0;
    let otyp = rndClassSpbookOtypLikeC(firstSpb, OTYP_SPE_BLANK_PAPER);
    const bc = { blessed: 0, cursed: 0 };
    nextIdentLikeC();
    blessorcurseFreshObjLikeC(bc, 17);

    let tryct = (u.ulevel | 0) + 1;
    while (--tryct > 0) {
        if ((otyp | 0) !== OTYP_SPE_BLANK_PAPER) {
            if (
                knownSpellLikeC(g, otyp) <= spe_Unknown
                && !pRestrictedSkillLikeC(g, spellSkilltypeLikeC(otyp))
            ) {
                break;
            }
        } else {
            const blankKnown = g.objectDiscovery instanceof Set && g.objectDiscovery.has(OTYP_SPE_BLANK_PAPER);
            if (!blankKnown || carryingOtypInInventLikeC(g, OTYP_MAGIC_MARKER)) break;
        }
        otyp = rndClassSpbookOtypLikeC(firstSpb, OTYP_SPE_BLANK_PAPER);
    }

    /** @type {import('./gstate.js').game['invent'] extends infer T ? T : never} */
    const otmp = {
        otyp: otyp | 0,
        oclass: NH5_SPBOOK_CLASS,
        ox: -1,
        oy: -1,
        quan: 1,
        owt: 50,
        cursed: bc.cursed | 0,
        blessed: bc.blessed | 0,
        spe: 0,
        spestudied: 0,
        bknown: 0,
        dknown: 0,
        nobj: null,
        nexthere: null,
    };

    if ((otyp | 0) !== OTYP_SPE_BLANK_PAPER && !rn2(4)) {
        const speKnowledge = knownSpellLikeC(g, otyp | 0);
        if (speKnowledge !== spe_Fresh) {
            const speLet = forceLearnSpellLikeC(g, otyp | 0);
            if (speLet !== '\0') {
                const speName = spellObjNameFromOtyp(otyp);
                if (speKnowledge === spe_Unknown) {
                    await pline(
                        `Divine knowledge of ${speName} fills your mind! Spell '${speLet}'.`,
                    );
                } else {
                    const how = speKnowledge === spe_Forgotten ? 'restored' : 'refreshed';
                    await pline(`Your knowledge of spell '${speLet}' - ${speName} is ${how}.`);
                }
            }
            return;
        }
    }

    observeObjectHeroMinimalLikeC(g, otmp);
    if ((otyp | 0) === OTYP_SPE_BLANK_PAPER || !rn2(100)) makeknownSpellbookLikeC(g, otyp | 0);
    otmp.blessed = 1;
    otmp.cursed = 0;
    const blind = !!(u.Blind | 0) || !!(u.ublind | 0) || (u.timed?.blind ?? 0) > 0;
    const feetStr = blind ? 'Something' : doname(otmp, g);
    await atYourFeetLikeC(g, feetStr);
    const x = u.ux | 0;
    const y = u.uy | 0;
    placeFloorObjectInLevel(g, otmp, x, y);
    stackObjOnFloorInLevel(g, otmp);
    await newsym(x, y);
}

/**
 * C: pray.c godvoice(resp, words) with words=="" — ROLL_FROM(godvoices) consumes rn2(SIZE).
 */
async function godvoiceLikeC(g, gAlign, words, godvoices) {
    const gv = godvoices[rn2(godvoices.length)];
    const w = words || '';
    const quot = w ? '"' : '';
    await pline(`The voice of ${alignGnameGcrownLikeC(g, gAlign)} ${gv}: ${quot}${w}${quot}`);
}

function alignGnameGcrownLikeC(g, aligntyp) {
    const u = g.u;
    const heroT = u?.ualign?.type ?? 0;
    if ((aligntyp | 0) === (heroT | 0)) {
        const role = g.urole?.name?.m || 'Tourist';
        if (role) return role; /* stub: u_gname() */
    }
    if ((aligntyp | 0) === A_LAWFUL) return 'a Lawful deity';
    if ((aligntyp | 0) === A_CHAOTIC) return 'a Chaotic deity';
    if ((aligntyp | 0) === A_NEUTRAL) return 'a Neutral deity';
    return 'the void';
}

/** C: pray.c exist_artifact — stub false (no artifact DB yet). */
function existArtifactStub() {
    return false;
}

/**
 * C: pray.c gcrownu (subset with full RNG spine for mksobj calls).
 * @param {import('./gstate.js').game} g
 * @param {readonly string[]} godvoices
 */
export async function gcrownuHeroLikeC(g, godvoices) {
    const u = g.u;
    if (!u) return;

    u.HSee_invisible = (u.HSee_invisible | 0) | FROMOUTSIDE;
    u.See_invisible = (u.See_invisible | 0) | FROMOUTSIDE;
    u.HFire_resistance = (u.HFire_resistance | 0) | FROMOUTSIDE;
    u.Fire_resistance = (u.Fire_resistance | 0) | FROMOUTSIDE;
    u.HCold_resistance = (u.HCold_resistance | 0) | FROMOUTSIDE;
    u.Cold_resistance = (u.Cold_resistance | 0) | FROMOUTSIDE;
    u.HShock_resistance = (u.HShock_resistance | 0) | FROMOUTSIDE;
    u.Shock_resistance = (u.Shock_resistance | 0) | FROMOUTSIDE;
    u.HSleep_resistance = (u.HSleep_resistance | 0) | FROMOUTSIDE;
    u.Sleep_resistance = (u.Sleep_resistance | 0) | FROMOUTSIDE;
    u.HPoison_resistance = (u.HPoison_resistance | 0) | FROMOUTSIDE;
    u.Poison_resistance = (u.Poison_resistance | 0) | FROMOUTSIDE;

    await godvoiceLikeC(g, u.ualign?.type ?? 0, '', godvoices);

    let classGift = STRANGE_OBJECT;
    if (
        g.urole?.abbr === 'Wiz'
        && !uWieldArtStub()
        && !carryingOtypInInventLikeC(g, OTYP_SPE_FINGER_OF_DEATH)
    ) {
        classGift = OTYP_SPE_FINGER_OF_DEATH;
    } else if (
        g.urole?.abbr === 'Mon'
        && (!u.uwep || !(u.uwep.oartifact | 0))
        && !carryingOtypInInventLikeC(g, OTYP_SPE_RESTORE_ABILITY)
    ) {
        classGift = OTYP_SPE_RESTORE_ABILITY;
    }

    let obj = okWepLikeC(g, u.uwep) ? u.uwep : null;

    u.uevent = u.uevent || {};
    const al = u.ualign?.type | 0;
    const inHandVorpal = uWieldArtStub();
    const alreadyVorpal = existArtifactStub();
    const inHandStorm = uWieldArtStub();
    const alreadyStorm = existArtifactStub();
    const classGiftNonStrange = classGift !== STRANGE_OBJECT;

    if (al === A_LAWFUL) {
        u.uevent.uhand_of_elbereth = 1;
        await pline('I crown thee... The Hand of Elbereth!');
    } else if (al === A_NEUTRAL) {
        u.uevent.uhand_of_elbereth = 2;
        await pline('Thou shalt be my Envoy of Balance!');
    } else if (al === A_CHAOTIC) {
        u.uevent.uhand_of_elbereth = 3;
        const what =
            ((alreadyVorpal && !inHandVorpal) || classGiftNonStrange) ? 'take lives' : 'steal souls';
        await pline(`Thou art chosen to ${what} for My Glory!`);
    }

    if (classGift !== STRANGE_OBJECT && SPELLBOOK_OTYP_OC_SKILL.has(classGift)) {
        const bc = { blessed: 0, cursed: 0 };
        nextIdentLikeC();
        blessorcurseFreshObjLikeC(bc, 17);
        const book = {
            otyp: classGift | 0,
            oclass: NH5_SPBOOK_CLASS,
            ox: -1,
            oy: -1,
            quan: 1,
            owt: 50,
            cursed: bc.cursed | 0,
            blessed: bc.blessed | 0,
            spe: 0,
            spestudied: 0,
            bknown: 1,
            dknown: 0,
            nobj: null,
            nexthere: null,
        };
        book.blessed = 1;
        book.cursed = 0;
        observeObjectHeroMinimalLikeC(g, book);
        const blind = !!(u.Blind | 0) || !!(u.ublind | 0) || (u.timed?.blind ?? 0) > 0;
        await atYourFeetLikeC(g, blind ? 'Something' : doname(book, g));
        const x = u.ux | 0;
        const y = u.uy | 0;
        placeFloorObjectInLevel(g, book, x, y);
        stackObjOnFloorInLevel(g, book);
        await newsym(x, y);
        u.ugifts = (u.ugifts | 0) + 1;
        if (knownSpellLikeC(g, classGift) !== spe_Unknown && okWepLikeC(g, u.uwep)) obj = u.uwep;
    }

    if (al === A_LAWFUL) {
        if (classGift === STRANGE_OBJECT && obj && (obj.otyp | 0) === OTYP_LONG_SWORD && !(obj.oartifact | 0)) {
            /* C: Excalibur transform — deferred */
        }
        unrestrictWeaponSkill(u, P_LONG_SWORD);
    } else if (al === A_NEUTRAL) {
        if (classGift === STRANGE_OBJECT && obj && inHandVorpal) {
            observeObjectHeroMinimalLikeC(g, obj);
        } else if (classGift === STRANGE_OBJECT && !alreadyVorpal) {
            nextIdentLikeC();
            const sw = {
                otyp: OTYP_LONG_SWORD,
                oclass: NH5_WEAPON_CLASS,
                ox: -1,
                oy: -1,
                quan: 1,
                owt: 40,
                cursed: 0,
                blessed: 0,
                spe: 1,
                oartifact: 0,
                oeroded: 0,
                oeroded2: 0,
                oerodeproof: 0,
                bknown: 0,
                nobj: null,
                nexthere: null,
            };
            await atYourFeetLikeC(g, 'A sword');
            placeFloorObjectInLevel(g, sw, u.ux | 0, u.uy | 0);
            stackObjOnFloorInLevel(g, sw);
            await newsym(u.ux | 0, u.uy | 0);
            u.ugifts = (u.ugifts | 0) + 1;
            obj = sw;
        }
        unrestrictWeaponSkill(u, P_LONG_SWORD);
    } else if (al === A_CHAOTIC) {
        if (classGift === STRANGE_OBJECT && obj && inHandStorm) {
            observeObjectHeroMinimalLikeC(g, obj);
        } else if (classGift === STRANGE_OBJECT && !alreadyStorm) {
            nextIdentLikeC();
            const sw = {
                otyp: OTYP_RUNESWORD,
                oclass: NH5_WEAPON_CLASS,
                ox: -1,
                oy: -1,
                quan: 1,
                owt: 40,
                cursed: 0,
                blessed: 0,
                spe: 1,
                oartifact: 0,
                oeroded: 0,
                oeroded2: 0,
                oerodeproof: 0,
                bknown: 0,
                nobj: null,
                nexthere: null,
            };
            await atYourFeetLikeC(g, 'A black sword');
            placeFloorObjectInLevel(g, sw, u.ux | 0, u.uy | 0);
            stackObjOnFloorInLevel(g, sw);
            await newsym(u.ux | 0, u.uy | 0);
            u.ugifts = (u.ugifts | 0) + 1;
            obj = sw;
        }
        unrestrictWeaponSkill(u, P_BROAD_SWORD);
    }

    if (okWepLikeC(g, obj)) {
        obj.blessed = 1;
        obj.cursed = 0;
        obj.oeroded = 0;
        obj.oeroded2 = 0;
        obj.oerodeproof = 1;
        obj.bknown = 1;
        obj.rknown = 1;
        if ((obj.spe | 0) < 1) obj.spe = 1;
        const wt = weaponType(obj);
        if (wt > 0) unrestrictWeaponSkill(u, wt);
    } else if (classGift === STRANGE_OBJECT) {
        await pline('You feel unworthy.');
    }

    if (g.iflags?.perm_invent) updateInventory();
    addWeaponSkill(u, 1);
    g.disp = g.disp || {};
    g.disp.botl = true;
}

/**
 * C: pray.c pat_on_head cases 6–8.
 * @param {import('./gstate.js').game} g
 * @param {readonly string[]} godvoices
 */
export async function applyPleasedPatOnHeadCases678LikeC(g, godvoices) {
    const u = g.u;
    if (!u) return;
    const record = u.ualign?.record | 0;
    u.uevent = u.uevent || {};
    if (record >= PIOUS && !(u.uevent.uhand_of_elbereth | 0)) {
        await gcrownuHeroLikeC(g, godvoices);
        return;
    }
    await giveSpellHeroLikeC(g);
}
