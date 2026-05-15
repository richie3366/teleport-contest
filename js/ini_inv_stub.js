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

/** C ref: u_init.c — apply role starting pack (Tourist only for now). */
export function initIniInvStub(game) {
    const role = game.urole?.name?.m || game.urole?.name?.f || '';
    if (role !== 'Tourist') {
        game._iniInvRows = [];
        game.discoveryGroups = [];
        return;
    }
    game._iniInvRows = TOURIST_INI_INV;
    game.discoveryGroups = discoveryGroupsFromIniInv(TOURIST_INI_INV);
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
