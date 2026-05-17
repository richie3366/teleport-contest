// u_init_find_ac.js — Hero armor class from form + worn gear (C find_ac / ARM_BONUS subset).
// C ref: do_wear.c find_ac(); hack.h ARM_BONUS(); obj.h greatest_erosion()

import { game } from './gstate.js';
import { permonstHuman } from './mondata.js';
import {
    INTRINSIC,
    OTYP_AMULET_OF_GUARDING,
    OTYP_GRAY_DRAGON_SCALE_MAIL,
    OTYP_GRAY_DRAGON_SCALES,
    OTYP_RIN_PROTECTION,
    OTYP_YELLOW_DRAGON_SCALE_MAIL,
    OTYP_YELLOW_DRAGON_SCALES,
} from './const.js';

const AC_MAX = 99;

/**
 * C `objects[].a_ac` (= OBJECT `10 - ac` in objects.h `ARMOR`/`HELM`/`CLOAK`/…) for NH5 `objects_nums`
 * `otyp` values. NH5 **`objects_nums`**: helms **90–101** from **`objects.h`** armor section with **`#if 0`** deferred dragons skipped (elven … telepathy, then **`GRAY_DRAGON_SCALE_MAIL`** **102** via **`const.js`** loops). Shirts through boots use cpp **`OBJECTS_ENUM`** order (**`LEATHER_ARMOR` 134**, **`HAWAIIAN_SHIRT` 136**, …). Dragon mail/scales still filled from **`OTYP_GRAY_DRAGON_*`** … **`OTYP_YELLOW_DRAGON_*`** below.
 * @type {Map<number, number>}
 */
const OBJECTS_A_AC_ARMOR = new Map([
    /* Helms — C `objects.h` order with `#if 0` dragon deferrals skipped; `otyp` 90…102 = elven helm … gray dragon mail anchor (see loops below). */
    [90, 1], /* ELVEN_LEATHER_HELM — ac 9 */
    [91, 1], /* ORCISH_HELM */
    [92, 2], /* DWARVISH_IRON_HELM — ac 8 */
    [93, 0], /* FEDORA — ac 10 */
    [94, 0], /* CORNUTHAUM */
    [95, 0], /* DUNCE_CAP */
    [96, 1], /* DENTED_POT — ac 9 */
    [97, 1], /* HELM_OF_BRILLIANCE */
    [98, 1], /* HELMET */
    [99, 1], /* HELM_OF_CAUTION */
    [100, 1], /* HELM_OF_OPPOSITE_ALIGNMENT */
    [101, 1], /* HELM_OF_TELEPATHY */
    [124, 6], /* SPLINT_MAIL — ac 4 */
    [132, 3], /* RING_MAIL — ac 7 */
    [134, 2], /* LEATHER_ARMOR — ac 8 */
    [135, 1], /* LEATHER_JACKET — ac 9 */
    [136, 0], /* HAWAIIAN_SHIRT — ac 10 */
    [137, 0], /* T_SHIRT — ac 10 */
    [138, 0], /* MUMMY_WRAPPING — ac 10 */
    [139, 1], /* ELVEN_CLOAK — ac 9 */
    [140, 0], /* ORCISH_CLOAK — ac 10 */
    [141, 0], /* DWARVISH_CLOAK */
    [142, 1], /* OILSKIN_CLOAK — ac 9 */
    [143, 2], /* ROBE (cloak) — ac 8 */
    [144, 1], /* ALCHEMY_SMOCK — ac 9 */
    [145, 1], /* LEATHER_CLOAK */
    [146, 3], /* CLOAK_OF_PROTECTION — ac 7 */
    [147, 1], /* CLOAK_OF_INVISIBILITY */
    [148, 1], /* CLOAK_OF_MAGIC_RESISTANCE */
    [149, 1], /* CLOAK_OF_DISPLACEMENT */
    [150, 1], /* SMALL_SHIELD */
    [151, 1], /* SHIELD_OF_DRAIN_RESISTANCE */
    [152, 1], /* SHIELD_OF_SHOCK_RESISTANCE */
    [153, 2], /* ELVEN_SHIELD — ac 8 */
    [154, 1], /* URUK_HAI_SHIELD */
    [155, 1], /* ORCISH_SHIELD */
    [156, 2], /* LARGE_SHIELD — ac 8 */
    [157, 2], /* DWARVISH_ROUNDSHIELD */
    [158, 2], /* SHIELD_OF_REFLECTION */
    [159, 1], /* LEATHER_GLOVES */
    [160, 1], /* GAUNTLETS_OF_FUMBLING */
    [161, 1], /* GAUNTLETS_OF_POWER */
    [162, 1], /* GAUNTLETS_OF_DEXTERITY */
    [163, 1], /* LOW_BOOTS — ac 9 */
    [164, 2], /* IRON_SHOES — ac 8 */
    [165, 2], /* HIGH_BOOTS — ac 8 */
    [166, 1], /* SPEED_BOOTS — ac 9 */
    [167, 1], /* WATER_WALKING_BOOTS */
    [168, 1], /* JUMPING_BOOTS */
    [169, 1], /* ELVEN_BOOTS */
    [170, 1], /* KICKING_BOOTS */
    [171, 1], /* FUMBLE_BOOTS */
    [172, 1], /* LEVITATION_BOOTS */
]);

/* C DRGN_ARMR — all dragon scale mail `ac` 1 (`a_ac` 9); all dragon scales `ac` 7 (`a_ac` 3). */
for (let o = OTYP_GRAY_DRAGON_SCALE_MAIL; o <= OTYP_YELLOW_DRAGON_SCALE_MAIL; o++) {
    OBJECTS_A_AC_ARMOR.set(o, 9);
}
for (let o = OTYP_GRAY_DRAGON_SCALES; o <= OTYP_YELLOW_DRAGON_SCALES; o++) {
    OBJECTS_A_AC_ARMOR.set(o, 3);
}

/**
 * C: obj.h **`greatest_erosion(otmp)`** — max of rust/burn vs corr/rot counters.
 * @param {{ oeroded?: number, oeroded2?: number } | null | undefined} obj
 */
function greatestErosionLikeC(obj) {
    if (!obj) return 0;
    const a = obj.oeroded | 0;
    const b = obj.oeroded2 | 0;
    return a > b ? a : b;
}

/**
 * C: hack.h **`ARM_BONUS(obj)`** — `a_ac + spe - min(greatest_erosion, a_ac)`.
 * @param {{ otyp?: number, spe?: number, oeroded?: number, oeroded2?: number } | null | undefined} obj
 */
export function armBonusLikeC(obj) {
    if (!obj) return 0;
    const otyp = obj.otyp | 0;
    const aAc = OBJECTS_A_AC_ARMOR.get(otyp);
    if (aAc === undefined) {
        /* C uses objects[otyp].a_ac; unknown here — treat as 0 (non-armor / not tabulated). */
        return 0;
    }
    const spe = obj.spe | 0;
    const ge = greatestErosionLikeC(obj);
    return aAc + spe - Math.min(ge, aAc);
}

/**
 * C: do_wear.c **`find_ac`**
 * @param {import('./gstate.js').game} [g]
 */
export function findAc(g = game) {
    const u = g.u;
    if (!u) return;

    const pm = g.urace?.permonst ?? g.youmonst?.data ?? permonstHuman;
    let uac = /** @type {{ ac?: number }} */ (pm).ac ?? 10;

    const armorSlots = ['uarm', 'uarmc', 'uarmh', 'uarmf', 'uarms', 'uarmg', 'uarmu'];
    for (let i = 0; i < armorSlots.length; i++) {
        const o = u[armorSlots[i]];
        if (o) uac -= armBonusLikeC(o);
    }

    /* C find_ac — protection rings use enchantment only (not full ARM_BONUS). */
    if (u.uleft && (u.uleft.otyp | 0) === OTYP_RIN_PROTECTION) uac -= u.uleft.spe | 0;
    if (u.uright && (u.uright.otyp | 0) === OTYP_RIN_PROTECTION) uac -= u.uright.spe | 0;
    if (u.uamul && (u.uamul.otyp | 0) === OTYP_AMULET_OF_GUARDING) uac -= 2;

    /* C: youprop.h HProtection & INTRINSIC → uac -= u.ublessed (pray.c divine protection, …) */
    if ((u.HProtection | 0) & INTRINSIC) uac -= u.ublessed | 0;
    uac -= u.uspellprot | 0;

    if (Math.abs(uac) > AC_MAX) uac = Math.sign(uac) * AC_MAX;

    if (uac !== u.uac) {
        u.uac = uac;
        g.disp = g.disp || {};
        g.disp.botl = true;
    }
}
