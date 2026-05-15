// enlight_wield.js — Weapon / hands lines for #attributes (enlightenment).
// C ref: cmd.c (weaponless / uwep / twoweapon branch before skill titles).

/** Until youmonst is ported, assume hero polyform is humanoid for wield text. */
function humanoidHero() {
    return true;
}

/**
 * @param {object} u — game.u
 * @param {object} _g — game (reserved for youmonst / poly)
 */
export function enlightWieldLine(u, _g) {
    if (u.twoweap)
        return '  You are wielding two weapons at once.';
    if (u.uwep) {
        if (typeof u.uwep === 'string')
            return `  You are wielding ${u.uwep}.`;
        // C: weapon_descr(uwep) — port with obj/invent
        return '  You are wielding something.';
    }
    if (u.uarmg)
        return '  You are empty handed.';
    if (humanoidHero())
        return '  You are bare handed.';
    return '  You are not wielding anything.';
}

/** C: skill title after wield state — bare-handed stub until weapon.c. */
export function enlightWieldSkillLine(u) {
    if (!u.uwep)
        return '  You are unskilled in bare handed combat.';
    return '  You are unskilled in that weapon type.';
}
