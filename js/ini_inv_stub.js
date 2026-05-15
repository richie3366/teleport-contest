// ini_inv_stub.js — Stand-in for u_init.c ini_inv() until objects/invent.c are ported.
// One structured list drives #inventory painting and #discoveries (per-class lines).

import { game } from './gstate.js';
import { NO_COLOR, ATR_INVERSE } from './terminal.js';

const INV_COL = 32;

/** @type {Array<{ type: 'cat', name: string } | { type: 'item', text: string | ((g: object) => string), oclass?: string, discoveryLine?: string }>} */
const TOURIST_INI_INV = [
    { type: 'cat', name: 'Coins' },
    { type: 'item', text: (g) => `$ - ${g._goldCount ?? 0} gold pieces` },
    { type: 'cat', name: 'Weapons' },
    { type: 'item', text: 'a - 27 +2 darts (at the ready)' },
    { type: 'cat', name: 'Armor' },
    { type: 'item', text: 'j - an uncursed +0 Hawaiian shirt (being worn)' },
    { type: 'cat', name: 'Comestibles' },
    { type: 'item', text: 'b - 6 uncursed food rations' },
    { type: 'item', text: 'c - an uncursed apple' },
    { type: 'item', text: 'd - 2 uncursed fortune cookies' },
    { type: 'item', text: 'e - an uncursed clove of garlic' },
    { type: 'item', text: 'f - an uncursed slime mold' },
    { type: 'item', text: 'g - 2 uncursed tins of lichen' },
    { type: 'cat', name: 'Scrolls' },
    {
        type: 'item',
        text: 'i - 4 uncursed scrolls of magic mapping',
        oclass: 'Scrolls',
        discoveryLine: '  scroll of magic mapping (ANDOVA BEGARIN)',
    },
    { type: 'cat', name: 'Potions' },
    {
        type: 'item',
        text: 'h - 2 uncursed potions of extra healing',
        oclass: 'Potions',
        discoveryLine: '  potion of extra healing (murky)',
    },
    { type: 'cat', name: 'Tools' },
    { type: 'item', text: 'k - an expensive camera (0:34)' },
    { type: 'item', text: 'l - an uncursed credit card' },
    { type: 'item', text: '(end)' },
];

/** C: u_init.c Wizard[] — static labels for overlay until mkobj/ini_inv port. */
const WIZARD_INI_INV = [
    { type: 'cat', name: 'Weapons' },
    { type: 'item', text: 'a - a blessed +1 quarterstaff (weapon in hands)' },
    { type: 'cat', name: 'Armor' },
    { type: 'item', text: 'b - an uncursed +0 cloak of magic resistance (being worn)' },
    { type: 'cat', name: 'Wands' },
    {
        type: 'item',
        text: 'c - a wand of fire (0:5)',
        oclass: 'Wands',
        discoveryLine: '  wand of fire',
    },
    { type: 'cat', name: 'Rings' },
    {
        type: 'item',
        text: 'd - an uncursed ring of see invisible',
        oclass: 'Rings',
        discoveryLine: '  ring of see invisible',
    },
    {
        type: 'item',
        text: 'e - an uncursed ring of adornment',
        oclass: 'Rings',
        discoveryLine: '  ring of adornment',
    },
    { type: 'cat', name: 'Potions' },
    {
        type: 'item',
        text: 'f - 3 uncursed potions of booze',
        oclass: 'Potions',
        discoveryLine: '  potion of booze',
    },
    { type: 'cat', name: 'Scrolls' },
    {
        type: 'item',
        text: 'g - 3 uncursed scrolls of identify',
        oclass: 'Scrolls',
        discoveryLine: '  scroll of identify',
    },
    { type: 'cat', name: 'Spellbooks' },
    {
        type: 'item',
        text: 'h - a blessed spellbook of force bolt',
        oclass: 'Spellbooks',
        discoveryLine: '  spellbook of force bolt',
    },
    {
        type: 'item',
        text: 'i - an uncursed spellbook of detect monsters',
        oclass: 'Spellbooks',
        discoveryLine: '  spellbook of detect monsters',
    },
    { type: 'cat', name: 'Tools' },
    {
        type: 'item',
        text: 'j - a magic marker (19:0)',
        oclass: 'Tools',
        discoveryLine: '  magic marker',
    },
    { type: 'item', text: '(end)' },
];

/** C: u_init.c Valkyrie[] — static overlay until ini_inv/mkobj. */
const VALKYRIE_INI_INV = [
    { type: 'cat', name: 'Coins' },
    { type: 'item', text: (g) => `$ - ${g._goldCount ?? 0} gold pieces` },
    { type: 'cat', name: 'Weapons' },
    { type: 'item', text: 'a - a blessed +1 spear (weapon in hands)' },
    { type: 'item', text: 'b - an uncursed +0 dagger (alternate weapon; not wielded)' },
    { type: 'cat', name: 'Armor' },
    { type: 'item', text: 'c - an uncursed +3 small shield (being worn)' },
    { type: 'cat', name: 'Comestibles' },
    { type: 'item', text: 'd - an uncursed food ration' },
    { type: 'item', text: '(end)' },
];

/** C: u_init.c Barbarian_0[] (C randomly uses Barbarian_0 vs Barbarian_1). */
const BARBARIAN_INI_INV = [
    { type: 'cat', name: 'Coins' },
    { type: 'item', text: (g) => `$ - ${g._goldCount ?? 0} gold pieces` },
    { type: 'cat', name: 'Weapons' },
    { type: 'item', text: 'a - an uncursed +0 two-handed sword (weapon in hands)' },
    { type: 'item', text: 'b - an uncursed +0 axe' },
    { type: 'cat', name: 'Armor' },
    { type: 'item', text: 'c - an uncursed +0 ring mail (being worn)' },
    { type: 'cat', name: 'Comestibles' },
    { type: 'item', text: 'd - an uncursed food ration' },
    { type: 'item', text: '(end)' },
];

/** C: u_init.c Archeologist[] */
const ARCHEOLOGIST_INI_INV = [
    { type: 'cat', name: 'Coins' },
    { type: 'item', text: (g) => `$ - ${g._goldCount ?? 0} gold pieces` },
    { type: 'cat', name: 'Weapons' },
    {
        type: 'item',
        text: 'a - a blessed +2 bullwhip (weapon in hands)',
        oclass: 'Weapons',
        discoveryLine: '  bullwhip',
    },
    { type: 'cat', name: 'Armor' },
    {
        type: 'item',
        text: 'b - an uncursed +0 leather jacket (being worn)',
        oclass: 'Armor',
        discoveryLine: '  leather jacket',
    },
    {
        type: 'item',
        text: 'c - an uncursed +0 fedora',
        oclass: 'Armor',
        discoveryLine: '  fedora',
    },
    { type: 'cat', name: 'Comestibles' },
    { type: 'item', text: 'd - 3 uncursed food rations' },
    { type: 'cat', name: 'Tools' },
    {
        type: 'item',
        text: 'e - an uncursed pick-axe',
        oclass: 'Tools',
        discoveryLine: '  pick-axe',
    },
    {
        type: 'item',
        text: 'f - an uncursed tinning kit (0:0)',
        oclass: 'Tools',
        discoveryLine: '  tinning kit',
    },
    { type: 'item', text: 'g - an empty uncursed sack' },
    { type: 'cat', name: 'Gems' },
    {
        type: 'item',
        text: 'h - an uncursed touchstone',
        oclass: 'Gems',
        discoveryLine: '  touchstone',
    },
    { type: 'item', text: '(end)' },
];

/** @param {Array<{ type: 'cat', name: string } | { type: 'item', text: string | ((g: object) => string), oclass?: string, discoveryLine?: string }>} rows */
function discoveryGroupsFromIniInv(rows) {
    const groups = [];
    const indexByClass = new Map();
    for (const row of rows) {
        if (row.type !== 'item' || !row.oclass || !row.discoveryLine) continue;
        let ix = indexByClass.get(row.oclass);
        if (ix === undefined) {
            ix = groups.length;
            indexByClass.set(row.oclass, ix);
            groups.push({ title: row.oclass, lines: [] });
        }
        groups[ix].lines.push(row.discoveryLine);
    }
    return groups;
}

/** C ref: u_init.c — apply role starting pack (static labels until mkobj/ini_inv). */
export function initIniInvStub(/** @type {import('./gstate.js').game} */ g) {
    const role = g.urole?.name?.m || g.urole?.name?.f || '';
    if (role === 'Tourist') {
        g._iniInvRows = TOURIST_INI_INV;
        g.discoveryGroups = discoveryGroupsFromIniInv(TOURIST_INI_INV);
    } else if (role === 'Wizard') {
        g._iniInvRows = WIZARD_INI_INV;
        g.discoveryGroups = discoveryGroupsFromIniInv(WIZARD_INI_INV);
    } else if (role === 'Valkyrie') {
        g._iniInvRows = VALKYRIE_INI_INV;
        g.discoveryGroups = discoveryGroupsFromIniInv(VALKYRIE_INI_INV);
    } else if (role === 'Barbarian') {
        g._iniInvRows = BARBARIAN_INI_INV;
        g.discoveryGroups = discoveryGroupsFromIniInv(BARBARIAN_INI_INV);
    } else if (role === 'Archeologist') {
        g._iniInvRows = ARCHEOLOGIST_INI_INV;
        g.discoveryGroups = discoveryGroupsFromIniInv(ARCHEOLOGIST_INI_INV);
    } else {
        g._iniInvRows = [];
        g.discoveryGroups = [];
    }
}

/** @param {import('./game_display.js').GameDisplay} display */
export function paintIniInvStubIntoDisplay(display) {
    const rows = game._iniInvRows || [];
    let i = 0;
    for (const row of rows) {
        if (row.type === 'cat') {
            display.putstr(INV_COL, i, row.name, NO_COLOR, ATR_INVERSE);
        } else {
            const t = typeof row.text === 'function' ? row.text(game) : row.text;
            display.putstr(INV_COL, i, t, NO_COLOR, 0);
        }
        i++;
    }
    display.clearRow(21);
}
