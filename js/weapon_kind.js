// weapon_kind.js — weapon_type() / is_ammo() object helpers.
// C ref: weapon.c weapon_type(); include/obj.h is_ammo.

import {
    P_NONE,
    P_BARE_HANDED_COMBAT,
    P_BOW,
    P_CROSSBOW,
} from './const.js';
import { OC_SKILL_ROW_BY_OTYP } from './obj_oc_skill_data.js';
import { NH5_WEAPON_CLASS, NH5_TOOL_CLASS, NH5_GEM_CLASS } from './nh5_objclass.js';

/** @param {number} otyp */
function objectOcSkill(otyp) {
    return OC_SKILL_ROW_BY_OTYP.get(otyp | 0)?.oc_skill ?? 0;
}

/**
 * C: weapon_type(struct obj *obj)
 * @param {{ otyp?: number, oclass?: number }|null|undefined} obj
 * @returns {number}
 */
export function weaponType(obj) {
    if (!obj) return P_BARE_HANDED_COMBAT;
    const oc = obj.oclass | 0;
    if (oc !== NH5_WEAPON_CLASS && oc !== NH5_TOOL_CLASS && oc !== NH5_GEM_CLASS) return P_NONE;
    const type = objectOcSkill(obj.otyp | 0);
    return type < 0 ? -type : type;
}

/**
 * C: is_ammo(otmp) — include/obj.h
 * @param {{ otyp?: number, oclass?: number }|null|undefined} obj
 * @returns {boolean}
 */
export function isAmmo(obj) {
    if (!obj) return false;
    const oc = obj.oclass | 0;
    if (oc !== NH5_WEAPON_CLASS && oc !== NH5_GEM_CLASS) return false;
    const sk = objectOcSkill(obj.otyp | 0);
    return sk >= -P_CROSSBOW && sk <= -P_BOW;
}

/**
 * C: wield.c bimanual(obj) — two-handed wield; stub **false** until **`objects[]`** **`oc_bimanual`** port.
 * @param {{ otyp?: number }|null|undefined} obj
 * @returns {boolean}
 */
export function bimanual(obj) {
    void obj;
    return false;
}
