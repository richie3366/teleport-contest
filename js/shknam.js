// shknam.js — Shop type table (shtypes).
// C ref: shknam.c shtypes[] — probabilities and class symbols for mkshop.
// stock_room / shkinit / mkshobj_at / shknms / iprobs deferred (C-JS-MAP).

import {
    RANDOM_CLASS,
    ARMOR_CLASS,
    SCROLL_CLASS,
    POTION_CLASS,
    WEAPON_CLASS,
    FOOD_CLASS,
    RING_CLASS,
    WAND_CLASS,
    TOOL_CLASS,
    SPBOOK_CLASS,
} from './objects.js';

/** C ref: shknam.c shtypes[] — shop-type pick uses name/symb/prob only here. */
export const shtypes = [
    { name: 'general store', symb: RANDOM_CLASS, prob: 42 },
    { name: 'used armor dealership', symb: ARMOR_CLASS, prob: 14 },
    { name: 'second-hand bookstore', symb: SCROLL_CLASS, prob: 10 },
    { name: 'liquor emporium', symb: POTION_CLASS, prob: 10 },
    { name: 'antique weapons outlet', symb: WEAPON_CLASS, prob: 5 },
    { name: 'delicatessen', symb: FOOD_CLASS, prob: 5 },
    { name: 'jewelers', symb: RING_CLASS, prob: 3 },
    { name: 'quality apparel and accessories', symb: WAND_CLASS, prob: 3 },
    { name: 'hardware store', symb: TOOL_CLASS, prob: 3 },
    { name: 'rare books', symb: SPBOOK_CLASS, prob: 3 },
    { name: 'health food store', symb: FOOD_CLASS, prob: 2 },
    // Unique shops (prob 0) — special-level only; kept for index parity
    { name: 'lighting store', symb: TOOL_CLASS, prob: 0 },
];
