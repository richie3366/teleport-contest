// mondata.js — Monster type predicates and locomotion phrasing.
// C ref: mondata.h (is_floater, is_flyer, swims, amphibious, fire_resistant, …), mondata.c raceptr(),
// dmgtype/dmgtype_fromattack, passes_bars, stagger(), monflag.h M1_*, MR_*, MZ_*, G_NOCORPSE; mon.c make_corpse (corpse gate stub).

import { game } from './gstate.js';
import {
    XKILL_NOCORPSE,
    PM_FIRE_ELEMENTAL,
    PM_SALAMANDER,
    PM_AIR_ELEMENTAL,
    PM_EARTH_ELEMENTAL,
    PM_WATER_ELEMENTAL,
    PM_DEATH,
    PM_PESTILENCE,
    PM_FAMINE,
    PM_LICHEN,
    PM_LIZARD,
    OTYP_AMULET_OF_YENDOR,
    Is_airlevel,
    Is_firelevel,
    Is_earthlevel,
    Is_waterlevel,
} from './const.js';

/**
 * C: mondata.h is_rider(ptr) — `mons[mnum]` is Death / Pestilence / Famine.
 * @param {number} mnum
 * @returns {boolean}
 */
export function isRiderMnum(mnum) {
    const m = mnum | 0;
    return m === PM_DEATH || m === PM_PESTILENCE || m === PM_FAMINE;
}

/**
 * C: **`mons[corpsenm].mlet == S_TROLL`** — NH 5.0 **`monsters.h`** TROLL through OLOG_HAI (**`PM`** **225**–**229**).
 * @param {number} mnum
 */
export function isTrollCorpsenm(mnum) {
    const m = mnum | 0;
    return m >= 225 && m <= 229;
}

/**
 * C: **`mons[corpsenm]`** stub for **`goodpos`/`enexto`** ( **`mlet`** + **`permonstHuman`** base).
 * @param {number} mnum
 * @returns {Permonst}
 */
export function stubPermonstForCorpsenm(mnum) {
    const m = mnum | 0;
    let mlet = S_HUMAN;
    if (isTrollCorpsenm(m)) mlet = S_TROLL;
    else if (m === PM_LIZARD) mlet = S_LIZARD;
    else if (m === PM_LICHEN) mlet = S_FUNGUS;
    /* C: permonst `cnutrit` / `mconveys` / `geno` — shk.c corpse/tin/egg pricing; eat.c intrinsic_possible */
    return { ...permonstHuman, mlet, mnum: m, cnutrit: 0, mconveys: 0, geno: 0 };
}

/**
 * C: **`struct monst`** fakemon for **`teleport.c`** **`goodpos`** / **`enexto`** ( **`set_mon_data`** subset).
 * @param {number} mnum
 */
export function fakemonForCorpsenm(mnum) {
    const m = mnum | 0;
    return { mx: 0, my: 0, mnum: m, wormno: 0, data: stubPermonstForCorpsenm(m) };
}

/** C: monattk.h / permonst.h */
export const AT_ANY = -1;
/** C: monattk.h — damage kinds used by passes_bars (iron bars). */
export const AD_RUST = 24;
export const AD_CORR = 42;
/** C: permonst.h NATTK — mattk[] slots scanned by dmgtype_fromattack. */
export const NATTK = 6;

/** @typedef {{ adtyp: number, aatyp: number }} Mattack */
/** @typedef {{ mlet: number, mflags1: number, mflags2?: number, msize: number, mmove: number, mlevel?: number, ac?: number, mvflags?: number, mresists?: number, mnum?: number, mattk?: readonly Mattack[], msound?: number }} Permonst */

/** C: monflag.h `G_NOCORPSE` — no ordinary corpse (mon.c make_corpse; genocided / unique rules). */
export const G_NOCORPSE = 0x0010;

/** C: monflag.h `MR_FIRE` — innate fire resistance (goodpos lava, trap.c, …). */
export const MR_FIRE = 0x01;
/** C: monflag.h `MR_SLEEP` — sleep resistance (trap.c sleep gas, …). */
export const MR_SLEEP = 0x04;

// C: monflag.h (subset used by locomotion / stagger / goodpos)
const M1_FLY = 0x00000001;
/** C: monflag.h `M1_CLING` — **`mon.c`** **`minliquid_core`** / **`m_in_air`**. */
const M1_CLING = 0x00000010;
const M1_SWIM = 0x00000002;
const M1_AMORPHOUS = 0x00000004;
const M1_WALLWALK = 0x00000008;
const M1_UNSOLID = 0x00100000;
const M1_AMPHIBIOUS = 0x00000200;
const M1_BREATHLESS = 0x00000400;
const M1_NOLIMBS = 0x00006000;
const M1_SLITHY = 0x00080000;
const M1_NOTAKE = 0x00000080;
/** C: monflag.h — diet (gethungry ordinary uhunger--); M1_OMNIVORE = CARNIVORE|HERBIVORE */
const M1_CARNIVORE = 0x20000000;
const M1_HERBIVORE = 0x40000000;
const M1_METALLIVORE = 0x80000000;

/** C: monflag.h `M2_ROCKTHROW` — `throws_rocks` / goodpos boulder squares (teleport.c). */
const M2_ROCKTHROW = 0x08000000;

const MZ_SMALL = 1;
/** C: monflag.h `MZ_MEDIUM` / `MZ_LARGE` — `verysmall` / `bigmonst` (mondata.h). */
export const MZ_MEDIUM = 2;
export const MZ_LARGE = 3;

// C: sym.h / defsym.h — S_EYE, S_LIGHT, S_VORTEX, S_ELEMENTAL, S_HUMAN enum indices
const S_EYE = 5;
const S_LIGHT = 25;
const S_VORTEX = 22;
/** C: defsym.h / monsym.h — **`S_ELEMENTAL`**. */
export const S_ELEMENTAL = 31;
const S_HUMAN = 53;
/** C: defsym.h MONSYM — troll / lizard / fungus (lichen). */
const S_TROLL = 46;
const S_LIZARD = 58;
const S_FUNGUS = 32;
/** C: defsym.h / monsym.h — `S_GHOST` (noncorporeal). */
const S_GHOST = 54;

/** C: monflag.h MZ_SMALL — used by bear trap and encumber paths. */
export { MZ_SMALL };

/**
 * C: mondata.c dmgtype_fromattack(ptr, dtyp, atyp)
 * @param {Permonst|null|undefined} ptr
 * @param {number} dtyp
 * @param {number} atyp `AT_ANY` matches any attack slot.
 * @returns {Mattack|null}
 */
export function dmgtypeFromattack(ptr, dtyp, atyp) {
    const attacks = ptr?.mattk;
    if (!attacks) return null;
    for (let i = 0; i < NATTK; i++) {
        const a = attacks[i];
        if (!a) continue;
        if (a.adtyp === dtyp && (atyp === AT_ANY || a.aatyp === atyp)) return a;
    }
    return null;
}

/**
 * C: mondata.c dmgtype(ptr, dtyp)
 * @param {Permonst|null|undefined} ptr
 * @param {number} dtyp
 */
export function dmgtype(ptr, dtyp) {
    return dmgtypeFromattack(ptr, dtyp, AT_ANY) != null;
}

/** Innate human (PM_HUMAN–style) for encumber / stagger when not polymorphed. */
export const permonstHuman = Object.freeze({
    mlet: S_HUMAN,
    /* C: mons[PM_HUMAN] — M1_HUMANOID | M1_OMNIVORE (ordinary food consumption in eat.c gethungry) */
    mflags1: 0x00020000 | (M1_CARNIVORE | M1_HERBIVORE),
    mflags2: 0,
    msize: 2, /* MZ_MEDIUM */
    mmove: 12,
    mlevel: 1, /* C: mons[].mlevel — `dofiretrap` / `mhmax` floor vs polymonst */
    ac: 10, /* C: mons[].ac — find_ac() base for naked humanoid hero */
    mvflags: 0,
    mresists: 0,
});

/**
 * C: mon.c make_corpse — `svm.mvitals[mndx].mvflags & G_NOCORPSE`, plus per-monst overrides.
 * Stub: `mtmp.mvflags`, `mtmp.data.mvflags`, or `g.mvitals[mnum].mvflags` when those exist.
 * `xkillFlags`: C `mondead` / `xkilled` — `XKILL_NOCORPSE` suppresses corpse regardless of mvitals.
 * @param {{ mnum?: number, mvflags?: number, data?: Permonst }} mtmp
 * @param {typeof game} [g]
 * @param {number} [xkillFlags]
 */
export function monsterLeavesCorpse(mtmp, g = game, xkillFlags = 0) {
    if (!mtmp) return false;
    if (((xkillFlags | 0) & XKILL_NOCORPSE) !== 0) return false;
    if (((mtmp.mvflags | 0) & G_NOCORPSE) !== 0) return false;
    const d = mtmp.data;
    if (d && ((d.mvflags | 0) & G_NOCORPSE) !== 0) return false;
    const mndx = mtmp.mnum | 0;
    const slot = g?.mvitals?.[mndx];
    if (slot && ((slot.mvflags | 0) & G_NOCORPSE) !== 0) return false;
    return true;
}

/** C: mondata.h carnivorous(ptr) — true for carnivores and omnivores */
export function carnivorous(/** @type {Permonst} */ ptr) {
    return ((ptr?.mflags1 ?? 0) & M1_CARNIVORE) !== 0;
}

/** C: mondata.h herbivorous(ptr) */
export function herbivorous(/** @type {Permonst} */ ptr) {
    return ((ptr?.mflags1 ?? 0) & M1_HERBIVORE) !== 0;
}

/** C: mondata.h metallivorous(ptr) */
export function metallivorous(/** @type {Permonst} */ ptr) {
    return ((ptr?.mflags1 ?? 0) & M1_METALLIVORE) !== 0;
}

/**
 * C: eat.c gethungry — (carnivorous||herbivorous||metallivorous)(gy.youmonst.data).
 * When polymorphed, uses `game.youmonst.data` (stub with permonstHuman if unset).
 */
export function heroEatsOrdinaryFood() {
    const g = game;
    const u = g.u;
    const ptr = (u?.Upolyd | 0) ? (g.youmonst?.data ?? permonstHuman) : raceptr(g.youmonst);
    return carnivorous(ptr) || herbivorous(ptr) || metallivorous(ptr);
}

/** C: mondata.h breathless */
export function breathless(/** @type {Permonst} */ ptr) {
    return (ptr.mflags1 & M1_BREATHLESS) !== 0;
}

/** C: mondata.h passes_walls */
export function passesWalls(/** @type {Permonst} */ ptr) {
    return (ptr.mflags1 & M1_WALLWALK) !== 0;
}

/** C: mondata.h throws_rocks — giants, xorns, titans, … (goodpos boulder tile). */
export function throwsRocks(/** @type {Permonst} */ ptr) {
    return ((ptr?.mflags2 ?? 0) & M2_ROCKTHROW) !== 0;
}

/** C: mondata.h verysmall */
export function verysmall(/** @type {Permonst} */ ptr) {
    return ((ptr?.msize ?? MZ_MEDIUM) | 0) < MZ_SMALL;
}

/** C: mondata.h bigmonst */
export function bigmonst(/** @type {Permonst} */ ptr) {
    return ((ptr?.msize ?? 0) | 0) >= MZ_LARGE;
}

/** C: mondata.h unsolid */
export function unsolid(/** @type {Permonst} */ ptr) {
    return (ptr.mflags1 & M1_UNSOLID) !== 0;
}

/** C: mondata.h passes_rocks */
export function passesRocks(/** @type {Permonst} */ ptr) {
    return passesWalls(ptr) && !unsolid(ptr);
}

/** C: mondata.h webmaker — PM_CAVE_SPIDER / PM_GIANT_SPIDER; false until pmidx wired. */
export function webmaker(/** @type {Permonst} */ ptr) {
    void ptr;
    return false;
}

/**
 * C: raceptr(mtmp) — innate race permonst; hero uses mons[urace.mnum] when !Upolyd.
 * @param {{ data?: Permonst }|null|undefined} mtmp
 * @returns {Permonst}
 */
export function raceptr(mtmp) {
    const g = game;
    if (mtmp === g.youmonst && !g.u?.Upolyd) return g.urace?.permonst ?? permonstHuman;
    return mtmp?.data ?? permonstHuman;
}

function highc(ch) {
    if (!ch || typeof ch !== 'string') return ch;
    const c = ch[0];
    return c === c.toLowerCase() ? c.toUpperCase() : c;
}

/** C: mondata.h is_floater */
export function isFloater(/** @type {Permonst} */ ptr) {
    return ptr.mlet === S_EYE || ptr.mlet === S_LIGHT;
}

/** C: mondata.h is_flyer */
export function isFlyer(/** @type {Permonst} */ ptr) {
    return (ptr.mflags1 & M1_FLY) !== 0;
}

/** C: mondata.h **`is_clinger`** */
export function isClinger(/** @type {Permonst} */ ptr) {
    return ((ptr?.mflags1 ?? 0) & M1_CLING) !== 0;
}

/** C: mondata.h **`cant_drown`** (`is_swimmer` ≡ **`swims`**) */
export function cantDrown(/** @type {Permonst} */ ptr) {
    return swims(ptr) || amphibious(ptr) || breathless(ptr);
}

/** C: mondata.h swims */
export function swims(/** @type {Permonst} */ ptr) {
    return (ptr.mflags1 & M1_SWIM) !== 0;
}

/** C: mondata.h amphibious */
export function amphibious(/** @type {Permonst} */ ptr) {
    return (ptr.mflags1 & M1_AMPHIBIOUS) !== 0;
}

/** C: mondata.h fire_resistant — `mons[].mresists & MR_FIRE` (subset). */
export function fireResistant(/** @type {Permonst} */ ptr) {
    return ((ptr?.mresists ?? 0) & MR_FIRE) !== 0;
}

/** C: mondata.h resists_sleep — `mons[].mresists & MR_SLEEP` (subset; no `defended`/`resist()` yet). */
export function resistsSleep(/** @type {Permonst} */ ptr) {
    return ((ptr?.mresists ?? 0) & MR_SLEEP) !== 0;
}

/** C: mondata.h likes_lava(ptr) — fire elemental or salamander (`mons[]` identity). */
export function likesLava(/** @type {Permonst} */ ptr) {
    const m = ptr?.mnum | 0;
    return m === PM_FIRE_ELEMENTAL || m === PM_SALAMANDER;
}

/** C: mondata.h slithy */
export function slithy(/** @type {Permonst} */ ptr) {
    return (ptr.mflags1 & M1_SLITHY) !== 0;
}

/** C: mondata.h amorphous */
export function amorphous(/** @type {Permonst} */ ptr) {
    return (ptr.mflags1 & M1_AMORPHOUS) !== 0;
}

/**
 * C: wizard.c **`mon_has_amulet(mtmp)`** — walk **`minvent`** for **`AMULET_OF_YENDOR`**.
 * @param {{ minvent?: { otyp?: number, nobj?: unknown } | null }} mtmp
 */
export function monHasAmulet(mtmp) {
    for (let o = mtmp?.minvent; o; o = o.nobj) {
        if ((o.otyp | 0) === OTYP_AMULET_OF_YENDOR) return true;
    }
    return false;
}

/**
 * C: makemon.c **`is_home_elemental(ptr)`** — **`monsndx`** vs plane (**`u.uz`**).
 * @param {{ mnum?: number, data?: Permonst } | null} mtmp
 * @param {{ dnum?: number, dlevel?: number }} [uz]
 */
export function isHomeElemental(mtmp, uz) {
    if (!mtmp) return false;
    const ptr = raceptr(mtmp);
    if ((ptr.mlet | 0) !== S_ELEMENTAL) return false;
    const m = mtmp.mnum | 0;
    if (m === PM_AIR_ELEMENTAL) return Is_airlevel(uz);
    if (m === PM_FIRE_ELEMENTAL) return Is_firelevel(uz);
    if (m === PM_EARTH_ELEMENTAL) return Is_earthlevel(uz);
    if (m === PM_WATER_ELEMENTAL) return Is_waterlevel(uz);
    return false;
}

/** C: mondata.h is_whirly — vortex or air elemental (C: &mons[PM_AIR_ELEMENTAL]). */
export function isWhirly(/** @type {Permonst} */ ptr) {
    if (ptr.mlet === S_VORTEX) return true;
    /* Air: elemental, unsolid, flies; fire elemental also flies but has M1_NOTAKE. */
    return ptr.mlet === S_ELEMENTAL && unsolid(ptr) && isFlyer(ptr)
        && (ptr.mflags1 & M1_NOTAKE) === 0;
}

/**
 * C: mondata.c passes_bars — iron bars (`hack.c` test_move).
 * Rust/corr via `dmgtype`; `still_chewing` / occupation not ported in `walkable.js`.
 */
export function passesBars(/** @type {Permonst} */ ptr) {
    return passesWalls(ptr) || amorphous(ptr) || unsolid(ptr) || isWhirly(ptr)
        || verysmall(ptr) || dmgtype(ptr, AD_RUST) || dmgtype(ptr, AD_CORR)
        || metallivorous(ptr) || (slithy(ptr) && !bigmonst(ptr));
}

/** C: mondata.h noncorporeal */
export function noncorporeal(/** @type {Permonst} */ ptr) {
    return ptr.mlet === S_GHOST;
}

/**
 * C: monmove.c can_fog — vampshifter fog escape under doors.
 * @param {Record<string, unknown>} [_g]
 */
export function canFogHero(_g) {
    void _g;
    return false;
}

/** C: mondata.h nolimbs */
function nolimbs(/** @type {Permonst} */ ptr) {
    return (ptr.mflags1 & M1_NOLIMBS) === M1_NOLIMBS;
}

/** C: mondata.c static locoverbs */
const LEVITATE = ['float', 'Float', 'wobble', 'Wobble'];
const FLYS = ['fly', 'Fly', 'flutter', 'Flutter'];
const FLYL = ['fly', 'Fly', 'stagger', 'Stagger'];
const SLITHER = ['slither', 'Slither', 'falter', 'Falter'];
const OOZE = ['ooze', 'Ooze', 'tremble', 'Tremble'];
const IMMOBILE = ['wiggle', 'Wiggle', 'pulsate', 'Pulsate'];
const CRAWL = ['crawl', 'Crawl', 'falter', 'Falter'];

/**
 * Shared branch table: returns table string or null to use caller `def`.
 * @param {Permonst} ptr
 * @param {0|1|2|3} locoindx
 * @returns {string|null}
 */
function locomotionBranch(ptr, locoindx) {
    if (isFloater(ptr)) return LEVITATE[locoindx];
    if (isFlyer(ptr) && ptr.msize <= MZ_SMALL) return FLYS[locoindx];
    if (isFlyer(ptr) && ptr.msize > MZ_SMALL) return FLYL[locoindx];
    if (slithy(ptr)) return SLITHER[locoindx];
    if (amorphous(ptr)) return OOZE[locoindx];
    if (!ptr.mmove) return IMMOBILE[locoindx];
    if (nolimbs(ptr)) return CRAWL[locoindx];
    return null;
}

/**
 * C: locomotion(const struct permonst *ptr, const char *def)
 * @param {Permonst|null|undefined} ptr
 * @param {string} def
 * @returns {string}
 */
export function locomotion(ptr, def) {
    if (!ptr || typeof def !== 'string' || !def.length) return def || 'move';
    const locoindx = def[0] !== highc(def[0]) ? 0 : 1;
    return locomotionBranch(ptr, locoindx) ?? def;
}

/**
 * C: stagger(const struct permonst *ptr, const char *def)
 * @param {Permonst|null|undefined} ptr
 * @param {string} def
 * @returns {string}
 */
export function stagger(ptr, def) {
    if (!ptr || typeof def !== 'string' || !def.length) return def || 'stagger';
    const locoindx = def[0] !== highc(def[0]) ? 2 : 3;
    return locomotionBranch(ptr, locoindx) ?? def;
}
