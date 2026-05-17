// mkobj_food_class_rng_like_c.js — C mkobj.c mkobj(FOOD_CLASS) + mksobj FOOD_CLASS init for u_init ini_inv.
// C refs: mkobj.c mkobj(), mksobj(), mksobj_init() FOOD_CLASS; u_init.c ini_inv_mkobj_filter(FOOD_CLASS);
//         mkobj.c rndmonnum_adj() Plan B; monflag.h G_* masks.
//
// rndmonnum: Plan A (rndmonst_adj) is not ported here — only the mkobj.c fallback loop after rndmonst
// returns Null (same excludeflags as C with Inhell==FALSE on newgame D:1). Egg/tin/corpse tails use this.

import { rnd, rn1, rn2 } from './rng.js';

const G_UNIQ = 0x1000;
const G_NOHELL = 0x0800;
const G_NOGEN = 0x0200;
/** C `monflag.h` **`G_NOCORPSE`** — corpse/tin meat filters. */
const G_NOCORPSE = 0x0010;

/** C `permonst.h` — **`SPECIAL_PM`** == **`PM_LONG_WORM_TAIL`** enum index (**`mons[]`** order). */
const SPECIAL_PM = 338;
const LOW_PM = 0;

/** C `objects.h` FOOD_CLASS slice **`mons[]` index order** — **`[otyp, oc_prob]`** incl. **`MEAT_RING`** (**`oc_prob`** **0**). */
const FOOD_CLASS_MKOBJ_WALK = /** @type {readonly (readonly [number, number])[]} */ ([
    [173, 140],
    [174, 0],
    [175, 85],
    [176, 0],
    [177, 0],
    [178, 0],
    [179, 0],
    [180, 0],
    [181, 0],
    [182, 0],
    [183, 0],
    [184, 0],
    [185, 3],
    [186, 15],
    [187, 10],
    [188, 10],
    [189, 10],
    [190, 10],
    [191, 15],
    [192, 7],
    [193, 7],
    [194, 75],
    [195, 0],
    [196, 25],
    [197, 13],
    [198, 55],
    [199, 25],
    [200, 20],
    [201, 20],
    [202, 380],
    [203, 0],
    [204, 0],
    [205, 75],
]);

let _foodClassProbTotal = 0;
for (const [, p] of FOOD_CLASS_MKOBJ_WALK) _foodClassProbTotal += p | 0;

/** C `mkobj.c` **`mkobj(FOOD_CLASS, artif)`** — **`rnd(oclass_prob_total)`** + **`oc_prob`** walk (**`MEAT_RING`** **0** steps). */
export function mkobjOtypFoodClassIniInvLikeC() {
    let prob = rnd(_foodClassProbTotal);
    let i = 0;
    while (i < FOOD_CLASS_MKOBJ_WALK.length) {
        const p = FOOD_CLASS_MKOBJ_WALK[i][1] | 0;
        prob -= p;
        if (prob <= 0) return FOOD_CLASS_MKOBJ_WALK[i][0] | 0;
        i++;
    }
    return FOOD_CLASS_MKOBJ_WALK[FOOD_CLASS_MKOBJ_WALK.length - 1][0] | 0;
}

/** C `monsters.h` / **`monflag.h`** — **`mons[mndx].geno`** for **`LOW_PM..SPECIAL_PM-1`** (parsed for this repo slice). */
const MONS_GENO_PLAN_B = /** @type {readonly number[]} */ (JSON.parse(`[163,98,162,161,35,544,34,34,34,161,37,33,163,33,161,528,33,33,33,33,162,528,2210,162,2081,1185,1057,5632,49,37,2098,50,50,34,33,33,34,33,33,33,34,33,34,34,33,34,35,33,34,33,33,33,113,34,33,1137,34,35,34,33,34,33,33,33,33,36,34,33,33,34,34,34,34,34,608,98,97,97,33,33,36,34,33,164,33,34,33,34,34,33,161,162,33,528,34,544,162,33,33,34,34,34,34,34,33,33,34,34,50,50,2097,49,1074,1073,32,32,34,34,179,35,52,50,34,2193,2065,2065,2065,2065,161,34,34,34,33,33,33,32,32,32,32,32,32,32,32,32,32,32,33,33,33,33,33,33,33,33,33,33,33,35,17,17,17,17,36,33,34,33,33,33,34,161,34,33,33,545,161,161,161,2209,33,161,1,544,33,33,608,672,544,544,49,49,1073,1073,49,49,49,49,49,49,49,49,32,32,32,32,33,33,33,33,161,34,34,50,49,1073,49,35,33,34,1058,97,34,608,33,33,33,34,2081,33,544,33,34,49,49,49,4624,49,34,49,33,33,162,35,34,33,33,49,49,177,177,177,177,49,49,49,528,17,17,17,17,17,17,1,17,17,17,17,512,1,1,1,512,162,162,162,162,33,33,512,512,512,4608,512,4608,161,161,35,33,33,673,545,4608,4608,4608,5648,528,528,528,1042,1170,1041,1170,1170,1170,1042,1041,1042,1041,1041,5648,5648,5648,5648,5648,5648,5648,5648,4608,4608,4608,528,528,544,672,544,544,544,544,37,37,37,32,37,34,33,1025,4624,512,512]`));

/**
 * C: mkobj.c **`rndmonnum_adj`** Plan B — **`Inhell`** false on **D:1** newgame (**`G_NOHELL`** excludes).
 * @returns {number} monster index **`mndx`**
 */
export function rndmonnumIniInvPlanBLikeC() {
    const excludeflags = G_UNIQ | G_NOGEN | G_NOHELL;
    let i;
    do {
        i = rn1(SPECIAL_PM - LOW_PM, LOW_PM);
    } while ((MONS_GENO_PLAN_B[i] & excludeflags) !== 0);
    return i;
}

/** C: mkobj.c **`next_ident`** — **`ident += rnd(2)`** */
function nextIdentLikeC() {
    rnd(2);
}

function blessorcurseLikeC(chance) {
    if (!rn2(chance)) {
        rn2(2);
    }
}

/** C `include/hack.h` **`NON_PM`** */
const NON_PM = -1;

/** C: mon.c **`can_be_hatched`** — SCORPIUS remap + permissive hatch (**`lays_eggs`** not fully ported). */
function canBeHatchedIniInvLikeC(mnum) {
    const m = mnum | 0;
    if (m === 145) return 146; /* PM_SCORPIUS -> PM_SCORPION */
    return m;
}

function deadSpeciesIniInvLikeC() {
    return false;
}

/** C: mkobj.c **`mksobj_init`** — **`FOOD_CLASS`** after **`mkobj`/`mksobj`** (**`init` TRUE**). */
export function mksobjInitFoodClassIniInvAfterOtypLikeC(otyp) {
    const t = otyp | 0;
    switch (t) {
        case 174 /* CORPSE */: {
            let tryct = 50;
            let cm = 0;
            do {
                cm = rndmonnumIniInvPlanBLikeC(); /* C: **`undead_to_corpse`** — identity at chargen */
            } while ((MONS_GENO_PLAN_B[cm] & G_NOCORPSE) && --tryct > 0);
            break;
        }
        case 175 /* EGG */:
            if (!rn2(3)) {
                for (let tryct = 200; tryct > 0; tryct--) {
                    const mndx = canBeHatchedIniInvLikeC(rndmonnumIniInvPlanBLikeC());
                    if (mndx !== NON_PM && !deadSpeciesIniInvLikeC()) break;
                }
            }
            break;
        case 205 /* TIN */:
            if (!rn2(6)) {
                /* SPINACH_TIN — **`set_tin_variety`** leaf RNG folded */
            } else {
                let tryct = 200;
                while (tryct-- > 0) {
                    const mndx = rndmonnumIniInvPlanBLikeC();
                    if ((MONS_GENO_PLAN_B[mndx] & G_NOCORPSE) === 0) break;
                }
                rn2(1); /* C **`set_tin_variety(RANDOM_TIN)`** leaf */
            }
            blessorcurseLikeC(10);
            break;
        case 194 /* SLIME_MOLD */:
            /* spe = current_fruit — no RNG when default fruit */
            break;
        case 184 /* KELP_FROND */:
            rnd(2);
            break;
        case 197 /* CANDY_BAR */:
            rnd(32);
            break;
        default:
            break;
    }
    if (t >= 180 && t <= 183) {
        rn2(5); /* C **`start_glob_timeout`** when **`when`** **< 1** */
    } else if (t !== 174 && t !== 179 /* MEAT_RING */ && t !== 184 && !rn2(6)) {
        /* default food stack **`quan`** **2** */
    }
}

/**
 * C: **`ini_inv`** one **`FOOD_CLASS`** **`UNDEF_TYP`** draw: **`mkobj`** + **`mksobj`** (**`next_ident`** + **`mksobj_init`**).
 */
export function iniInvOneMkobjFoodUndefDrawLikeC() {
    const otyp = mkobjOtypFoodClassIniInvLikeC();
    nextIdentLikeC();
    mksobjInitFoodClassIniInvAfterOtypLikeC(otyp);
    rn2(1);
}
