// objnam.js — Object naming for messages (minimal until objnam.c is ported).
// C ref: objnam.c doname(), doname_with_price(), xname_flags (subset), distant_name(),
// An()/just_an() for floor burn plines.

import { game } from './gstate.js';
import { NH5_SCROLL_CLASS, NH5_SPBOOK_CLASS } from './nh5_objclass.js';
import { isSpellbookOtyp, spellbookAppearanceNounPhrase } from './spellbook_discovery_lines.js';
import { nh5HeroObjectClass } from './water_damage.js';
import { OC_SKILL_ROW_BY_OTYP } from './obj_oc_skill_data.js';
import { cansee } from './vision.js';
import { OTYP_GLOB_OF_GREEN_SLIME } from './const.js';

export { discoverScrollOtyp } from './discover_scroll.js';

/** C: objects.h GOLD_PIECE (matches mklev.js stub constant). */
const GOLD_PIECE = 466;

/** C: objnam.c vowels[] subset for just_an(). */
const VOWELS = new Set(['a', 'e', 'i', 'o', 'u']);

/**
 * C: objnam.c just_an() — returns "", "a ", or "an " (lowercase article only).
 * @param {string} str
 */
export function justArticlePrefix(str) {
    if (!str) return 'a ';
    const c0 = str[0].toLowerCase();
    if (!str[1] || str[1] === ' ') {
        return 'aehilmnosx'.includes(c0) ? 'an ' : 'a ';
    }
    const low = str.toLowerCase();
    if (low.startsWith('the ') || low === 'molten lava' || low === 'iron bars' || low === 'ice') return '';
    if (
        (VOWELS.has(c0) &&
            (!low.startsWith('one') || (str[3] && !'-_ '.includes(str[3]))) &&
            !low.startsWith('eu') &&
            !low.startsWith('uke') &&
            !low.startsWith('ukulele') &&
            !low.startsWith('unicorn') &&
            !low.startsWith('uranium') &&
            !low.startsWith('useful')) ||
        (c0 === 'x' && str[1] && !VOWELS.has(str[1].toLowerCase()))
    )
        return 'an ';
    return 'a ';
}

/**
 * C: objnam.c An() — article + capitalize first character of result.
 * @param {string} str
 */
export function An(str) {
    if (!str) return 'Something';
    const art = justArticlePrefix(str);
    const out = art ? `${art}${str}` : str;
    return out.charAt(0).toUpperCase() + out.slice(1);
}

export function scrollAppearanceFromOtyp(otyp) {
    const row = OC_SKILL_ROW_BY_OTYP.get(otyp | 0);
    if (!row?.name) return '???';
    let s = row.name;
    if (s.startsWith('SCR_')) s = s.slice(4);
    return s.toLowerCase().replace(/_/g, ' ');
}

function spellbookAppearanceFromOtyp(otyp) {
    const row = OC_SKILL_ROW_BY_OTYP.get(otyp | 0);
    if (!row?.name) return 'parchment';
    let s = row.name;
    if (s.startsWith('SPE_')) s = s.slice(4);
    return s.toLowerCase().replace(/_/g, ' ');
}

/**
 * C: xname(obj) core for zap.c burn_floor_objects classes only (no leading article).
 * Uses `obj.dknown` / `g.objectDiscovery` (spellbooks) / `g.scrollDiscovery` (scrolls, Set<otyp>) when wired.
 * @param {{ otyp?: number, oclass?: number, quan?: number, dknown?: number, oartifact?: number }} obj
 * @param {object} [g]
 */
export function xnameBurnFloor(obj, g = game) {
    const t = obj.otyp | 0;
    const oc = nh5HeroObjectClass(obj);
    if (t === OTYP_GLOB_OF_GREEN_SLIME) return 'glob of green slime';
    if (oc === NH5_SCROLL_CLASS) {
        if (!(obj.dknown | 0)) return 'scroll';
        const scrollKnown = g?.scrollDiscovery instanceof Set && g.scrollDiscovery.has(t);
        if (scrollKnown) {
            const tail = scrollAppearanceFromOtyp(t);
            return `scroll of ${tail}`;
        }
        return `scroll labeled ${scrollAppearanceFromOtyp(t)}`;
    }
    if (oc === NH5_SPBOOK_CLASS || isSpellbookOtyp(t)) {
        if (!(obj.dknown | 0)) return 'spellbook';
        const known = g?.objectDiscovery instanceof Set && g.objectDiscovery.has(t);
        if (known) {
            const ph = spellbookAppearanceNounPhrase(t);
            if (ph) return ph;
        }
        return `${spellbookAppearanceFromOtyp(t)} spellbook`;
    }
    return 'item';
}

/**
 * C: objnam.c distant_name(obj, xname) for floor burn — near tile + cansee uses xname;
 * else blind-at-a-distance style base nouns (subset of gd.distantname path).
 * @param {object} obj
 * @param {number} x
 * @param {number} y
 * @param {object} [g]
 */
export function distantNameBurnFloor(obj, x, y, g = game) {
    const u = g.u;
    if (!u) return xnameBurnFloor(obj, g);
    if ((u.ux | 0) === x && (u.uy | 0) === y) return xnameBurnFloor(obj, g);
    if (obj.oartifact | 0) return xnameBurnFloor(obj, g);

    const dx = (u.ux | 0) - x;
    const dy = (u.uy | 0) - y;
    const dist2 = dx * dx + dy * dy;
    const xr = (u.xray_range | 0) > 2 ? u.xray_range | 0 : 2;
    const neardist = xr * xr * 2 - xr;
    if (cansee(x, y) && dist2 <= neardist) return xnameBurnFloor(obj, g);

    const oc = nh5HeroObjectClass(obj);
    const t = obj.otyp | 0;
    if (t === OTYP_GLOB_OF_GREEN_SLIME) return 'glob of green slime';
    if (oc === NH5_SCROLL_CLASS) return 'scroll';
    if (oc === NH5_SPBOOK_CLASS || isSpellbookOtyp(t)) return 'spellbook';
    return 'item';
}

/**
 * C: xname pluralization (makeplural) subset for burn_floor_objects buf2.
 * @param {string} s
 */
export function makePluralBurn(s) {
    if (s === 'glob of green slime') return 'globs of green slime';
    if (s === 'scroll') return 'scrolls';
    if (s === 'spellbook') return 'spellbooks';
    if (s.startsWith('scroll of ')) return `scrolls of ${s.slice('scroll of '.length)}`;
    if (s.startsWith('scroll labeled ')) return `scrolls labeled ${s.slice('scroll labeled '.length)}`;
    if (s.startsWith('spellbook of ')) return `spellbooks of ${s.slice('spellbook of '.length)}`;
    if (s.endsWith(' spellbook')) {
        const base = s.slice(0, -'spellbook'.length);
        return `${base}spellbooks`;
    }
    return `${s}s`;
}

/**
 * C: doname(obj) — very small subset for invent.c look_here().
 * Spellbooks: if `otyp` is an NH5 spellbook and `g.objectDiscovery` contains it,
 * name like `a spellbook of force bolt` (C appearance after skill_based_spellbook_id).
 * Scrolls: `g.scrollDiscovery` Set drives **`scroll of`** vs **`scroll labeled`** when `dknown`.
 * @param {{ otyp?: number, quan?: number, oclass?: number }} otmp
 * @param {object} [g]
 */
export function doname(otmp, g = game) {
    if (!otmp) return 'nothing';
    const q = otmp.quan ?? 1;
    if (otmp.otyp === GOLD_PIECE) {
        return q === 1 ? 'a gold piece' : `${q} gold pieces`;
    }
    const otyp = otmp.otyp | 0;
    const oc = nh5HeroObjectClass(otmp);
    const treatAsSpellbook = oc === NH5_SPBOOK_CLASS || isSpellbookOtyp(otyp);
    if (oc === NH5_SCROLL_CLASS) {
        const dknown = otmp.dknown | 0;
        if (!dknown) return q === 1 ? 'a scroll' : `${q} scrolls`;
        const scrollKnown = g?.scrollDiscovery instanceof Set && g.scrollDiscovery.has(otyp);
        const tail = scrollAppearanceFromOtyp(otyp);
        if (scrollKnown) {
            if (q === 1) return `a scroll of ${tail}`;
            return `${q} scrolls of ${tail}`;
        }
        if (q === 1) return `a scroll labeled ${tail}`;
        return `${q} scrolls labeled ${tail}`;
    }
    if (treatAsSpellbook && isSpellbookOtyp(otyp)) {
        const known = g?.objectDiscovery instanceof Set && g.objectDiscovery.has(otyp);
        const phrase = known ? spellbookAppearanceNounPhrase(otyp) : 'spellbook';
        if (!phrase) return q === 1 ? 'a spellbook' : `${q} spellbooks`;
        if (q === 1) return `a ${phrase}`;
        /* plural: spellbook of X → spellbooks of X */
        if (known && phrase.startsWith('spellbook of ')) {
            const tail = phrase.slice('spellbook of '.length);
            return `${q} spellbooks of ${tail}`;
        }
        return `${q} ${phrase}s`;
    }
    return `an object (${otmp.otyp})`;
}

/**
 * C: objnam.c ansimpleoname(obj) — subset: strip leading indefinite article from **`doname`**.
 * @param {{ otyp?: number, quan?: number, oclass?: number }} otmp
 * @param {object} [g]
 */
export function ansimpleonameLikeC(otmp, g = game) {
    let s = doname(otmp, g);
    if (s.startsWith('an ')) return s.slice(3);
    if (s.startsWith('a ')) return s.slice(2);
    return s;
}

/**
 * C: decl.c **`upstart(str)`** — capitalize first character (ASCII).
 * @param {string} str
 */
export function upstartLikeC(str) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * C: o_init.c **`discover_object(oindx, mark_as_known, mark_as_encountered, credit_hero)`** — **`disco[]`** slot + **`oc_encountered`** / **`oc_name_known`**.
 * JS: **`g.objectEncountered`** (**`Set<otyp>`**) when **`mark_as_encountered`**; **`oc_name_known`** only via existing **`scrollDiscovery`** / **`objectDiscovery`** when **`mark_as_known`**.
 * Omits **`svb.bases[]`**, Samurai **`Japanese_item_name`**, **`gem_learned`**, **`update_inventory`**, **`exercise`**.
 * @param {import('./gstate.js').game} g
 * @param {number} oindx
 * @param {boolean} markAsKnown
 * @param {boolean} markAsEncountered
 * @param {boolean} [_creditHero]
 */
export function discoverObjectHeroLikeC(g, oindx, markAsKnown, markAsEncountered, _creditHero) {
    const t = oindx | 0;
    if (t < 1) return;

    if (!(g.objectEncountered instanceof Set)) g.objectEncountered = new Set();
    const alreadyEnc = g.objectEncountered.has(t);

    const scrollKnown = g.scrollDiscovery instanceof Set && g.scrollDiscovery.has(t);
    const spellKnown = g.objectDiscovery instanceof Set && g.objectDiscovery.has(t);
    const partialNameKnown = scrollKnown || spellKnown;

    /* C: outer **`if`** — no **`objects[]`** yet; spell/scroll Sets approximate **`oc_name_known`** for those classes only. */
    const enter = (markAsKnown && !partialNameKnown) || (markAsEncountered && !alreadyEnc);
    if (!enter) return;

    /* C: **`svd.disco[dindx] = oindx`** — ordering deferred. */
    if (markAsEncountered) g.objectEncountered.add(t);

    if (markAsKnown && !partialNameKnown) {
        /* C: **`objects[oindx].oc_name_known`**, **`exercise`**, **`gem_learned`**, **`update_inventory`** — TODO per class. */
        void _creditHero;
    }
}

/**
 * C: o_init.c **`observe_object(obj)`** — **`dknown`** + **`discover_object`** (**`mark_as_encountered`**).
 * JS: **`dknown`** when not hallucinating; **`discover_object(..., FALSE, TRUE, FALSE)`** (**`objectEncountered`**).
 * @param {import('./gstate.js').game} g
 * @param {{ otyp?: number, dknown?: number }} obj
 */
export function observeObjectHeroMinimalLikeC(g, obj) {
    const u = g?.u;
    if (!obj || !u) return;
    if ((u.Hallucination | 0) || (u.timed?.hallucination ?? 0) > 0) return;
    const oindx = obj.otyp | 0;
    if (oindx < 1) return;
    obj.dknown = 1;
    discoverObjectHeroLikeC(g, oindx, false, true, false);
}
