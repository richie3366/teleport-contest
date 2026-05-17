// pray_hero.js — C pray.c dopray / can_pray / prayer_done / angrygods subset for `#pray`.
// C ref: pray.c dopray, can_pray, prayer_done, angrygods (incl. adjattrib/losexp, attrcurse/rndcurse),
//        gods_upset, water_prayer
//
// Extended commands read a tty line after `#` (terminated by `\n` or `\r`); see extcmd.js.
// C dopray uses nomul(-3); JS drains three moveloop-equivalent ticks (moveloop_turn_advance.js)
// before prayer_done so monster RNG interleaving matches the recorder harness.

import { nhgetch } from './input.js';
import { flush_screen, pline } from './display.js';
import {
    A_CHAOTIC,
    A_LAWFUL,
    A_NEUTRAL,
    A_NONE,
    A_WIS,
    AM_MASK,
    IS_ALTAR,
    In_hell,
    Amask2align,
} from './const.js';
import { heroLuck } from './water_damage.js';
import { enlightMissionLines } from './enlght_patrons.js';
import { rn2, rnz, rnl } from './rng.js';
import { adjattrib, changeLuck } from './attrib.js';
import { losexpNullLikeC } from './losexp.js';
import { floorObjKey } from './floorobj.js';
import { NH5_POTION_CLASS } from './nh5_objclass.js';
import { executeHelplessMoveloopTickLikeC } from './moveloop_turn_advance.js';
import { clearUblessedAngryGodsLikeC, grantGodsFifthPleasedGiftProtectionLikeC } from './divine_protection.js';
import { attrcurseHeroLikeC, rndcurseHeroLikeC } from './sit_hero.js';

const STRIDENT = 4;
const OTYP_POT_WATER = 321;
/** C: defsym.h **`MONSYM(..., HUMAN, S_HUMAN, ...)`** — **`gy.youmonst.data->mlet`** in pray.c */
const S_HUMAN_MLET = 53;

/** @param {import('./gstate.js').game} g */
function alignGnamePrayTargetLikeC(g, aligntyp) {
    const heroT = g.u?.ualign?.type ?? 0;
    if ((aligntyp | 0) === (heroT | 0)) {
        const role = g.urole?.name?.m || 'Tourist';
        const lines = enlightMissionLines(role, heroT);
        const m = lines[0]?.match(/for ([^.]+)/);
        if (m) return m[1].trim();
    }
    if ((aligntyp | 0) === A_LAWFUL) return 'a Lawful deity';
    if ((aligntyp | 0) === A_CHAOTIC) return 'a Chaotic deity';
    if ((aligntyp | 0) === A_NEUTRAL) return 'a Neutral deity';
    return 'the void';
}

/** @param {import('./gstate.js').game} g */
function alignGnameRespGodLikeC(g, respGod) {
    return alignGnamePrayTargetLikeC(g, respGod);
}

/** C: pray.c in_trouble — worst problem; stub 0 (no serious trouble). */
function inTroublePrayStubLikeC() {
    return 0;
}

/**
 * C: pray.c can_pray — sets g._prayGp { p_aligntyp, p_trouble, p_type }.
 * @param {import('./gstate.js').game} g
 * @param {boolean} praying
 */
async function canPraySetupLikeC(g, praying) {
    const u = g.u;
    if (!u || !g.level) return false;
    u.ublesscnt = u.ublesscnt ?? 0;
    u.ugangr = u.ugangr ?? 0;
    u.uluck = u.uluck ?? 0;
    u.ualign = u.ualign || { type: A_NEUTRAL, record: 0 };

    const ux = u.ux | 0;
    const uy = u.uy | 0;
    const levl = g.level?.levl;
    const typ = levl?.[ux]?.[uy]?.typ | 0;
    const onAltar = IS_ALTAR(typ);
    const pAligntyp = onAltar
        ? Amask2align((levl[ux][uy].altarmask | 0) & AM_MASK)
        : (u.ualign.type | 0);

    const pTrouble = inTroublePrayStubLikeC();

    g._prayGp = { p_aligntyp: pAligntyp, p_trouble: pTrouble, p_type: 0 };

    if (praying) {
        await pline(`You begin praying to ${alignGnamePrayTargetLikeC(g, pAligntyp)}.`);
    }

    let alignment;
    if (u.ualign.type && u.ualign.type === -pAligntyp) alignment = -(u.ualign.record | 0);
    else if ((u.ualign.type | 0) !== (pAligntyp | 0)) alignment = Math.trunc((u.ualign.record | 0) / 2);
    else alignment = u.ualign.record | 0;

    const Luck = heroLuck(g);
    if ((pAligntyp | 0) === A_NONE) {
        g._prayGp.p_type = -2;
    } else if (
        (pTrouble > 0 ? u.ublesscnt > 200 : pTrouble < 0 ? u.ublesscnt > 100 : u.ublesscnt > 0)
    ) {
        g._prayGp.p_type = 0;
    } else if (Luck < 0 || (u.ugangr | 0) || alignment < 0) {
        g._prayGp.p_type = 1;
    } else if (onAltar && (u.ualign.type | 0) !== (pAligntyp | 0)) {
        g._prayGp.p_type = 2;
    } else {
        g._prayGp.p_type = 3;
    }

    return true;
}

/**
 * C: pray.c water_prayer — bless/curse water on altar (floorObjHeads only).
 * @param {import('./gstate.js').game} g
 * @param {boolean} blessWater
 */
async function waterPrayerLikeC(g, blessWater) {
    const u = g.u;
    const lvl = g.level;
    if (!u || !lvl?.floorObjHeads) return false;
    const k = floorObjKey(u.ux | 0, u.uy | 0);
    let changed = 0;
    let other = false;
    for (let o = lvl.floorObjHeads.get(k); o; o = o.nexthere) {
        if (
            (o.otyp | 0) === OTYP_POT_WATER
            && (blessWater ? !(o.blessed | 0) : !(o.cursed | 0))
        ) {
            o.blessed = blessWater ? 1 : 0;
            o.cursed = blessWater ? 0 : 1;
            changed += o.quan | 0 || 1;
        } else if ((o.oclass | 0) === NH5_POTION_CLASS) {
            other = true;
        }
    }
    if (changed && !(u.Blind | 0)) {
        const col = blessWater ? 'light blue' : 'black';
        await pline(
            `${other && changed > 1 ? 'Some of the' : other ? 'One of the' : 'The'} potion${
                other || changed > 1 ? 's' : ''
            } on the altar glow${changed > 1 ? '' : 's'} ${col} for a moment.`,
        );
    }
    return changed > 0;
}

/**
 * C: pray.c angrygods — switch (rn2(maxanger)); tail rnz(300) for u.ublesscnt.
 * @param {import('./gstate.js').game} g
 * @param {number} respGod
 */
async function angrygodsLikeC(g, respGod) {
    const u = g.u;
    if (!u) return;
    let rg = respGod | 0;
    if (In_hell(u.uz)) rg = A_NONE;

    clearUblessedAngryGodsLikeC(g);

    const Luck = heroLuck(g);
    const rec = u.ualign?.record | 0;
    const ug = u.ugangr | 0;
    let maxanger;
    if (rg !== (u.ualign?.type | 0)) {
        maxanger = Math.trunc(rec / 2) + (Luck > 0 ? -Math.trunc(Luck / 3) : -Luck);
    } else {
        maxanger =
            3 * ug +
            (Luck > 0 || rec >= STRIDENT ? -Math.trunc(Luck / 3) : -Luck);
    }
    if (maxanger < 1) maxanger = 1;
    else if (maxanger > 15) maxanger = 15;

    const sw = rn2(maxanger);
    const hallu = !!(u.Hallucination | 0);
    const ugodAngry = (u.ualign?.record | 0) < 0;

    switch (sw) {
        case 0:
        case 1:
            await pline(
                `You feel that ${alignGnameRespGodLikeC(g, rg)} is ${hallu ? 'bummed' : 'displeased'}.`,
            );
            break;
        case 2:
        case 3: {
            const mortalOrCreature =
                (u.youmonst?.data?.mlet | 0) === S_HUMAN_MLET ? 'mortal' : 'creature';
            await pline(
                `The voice of ${alignGnameRespGodLikeC(g, rg)} thunders: "Thou ${
                    ugodAngry && rg === (u.ualign?.type | 0) ? 'hast strayed from the path' : 'art arrogant'
                }, ${mortalOrCreature}."`,
            );
            await pline('Thou must relearn thy lessons!');
            adjattrib(A_WIS, -1, false);
            await losexpNullLikeC(g);
            break;
        }
        case 6:
            if (!(u.Punished | 0)) {
                await pline(`The voice of ${alignGnameRespGodLikeC(g, rg)} thunders: "Thou hast angered me."`);
                await pline('You are being punished for your misbehavior!');
                /* C: read.c punish(NULL) — mkobj CHAIN/BALL, placebc; not ported (RNG when exercised). */
                break;
            }
            /* FALLTHRU */
        case 4:
        case 5: {
            await pline(`The voice of ${alignGnameRespGodLikeC(g, rg)} thunders: "Thou hast angered me."`);
            const blind = !!(u.Blind | 0);
            const antimagic = !!(u.Antimagic | 0);
            if (!blind && !antimagic) await pline('A black glow surrounds you.');
            if (rn2(2)) await rndcurseHeroLikeC(g);
            else {
                const stripped = await attrcurseHeroLikeC(g);
                if (!stripped) await rndcurseHeroLikeC(g);
            }
            break;
        }
        case 7:
        case 8: {
            const mortalOrCreature =
                (u.youmonst?.data?.mlet | 0) === S_HUMAN_MLET ? 'mortal' : 'creature';
            const onAltar = IS_ALTAR(g.level?.levl?.[u.ux | 0]?.[u.uy | 0]?.typ | 0);
            const aa = onAltar
                ? Amask2align((g.level.levl[u.ux | 0][u.uy | 0].altarmask | 0) & AM_MASK)
                : (u.ualign?.type | 0);
            await pline(
                `The voice of ${alignGnameRespGodLikeC(g, rg)} thunders: "Thou durst ${
                    onAltar && aa !== rg ? 'scorn' : 'call upon'
                } me?"`,
            );
            await pline(`"Then die, ${mortalOrCreature}!"`);
            break;
        }
        default:
            await pline(`The voice of ${alignGnameRespGodLikeC(g, rg)} thunders: "Thou hast angered me."`);
            await pline('Suddenly, a bolt of lightning strikes you!');
            await pline(`${alignGnameRespGodLikeC(g, rg)} is not deterred...`);
            await pline('A wide-angle disintegration beam hits you!');
            break;
    }

    const newUblesscnt = rnz(300);
    if (newUblesscnt > (u.ublesscnt | 0)) u.ublesscnt = newUblesscnt;
}

/** C: pray.c gods_upset */
async function godsUpsetLikeC(g, gAlign) {
    const u = g.u;
    if (!u) return;
    const t = u.ualign?.type | 0;
    if ((gAlign | 0) === t) u.ugangr = (u.ugangr | 0) + 1;
    else if (u.ugangr | 0) u.ugangr = (u.ugangr | 0) - 1;
    await angrygodsLikeC(g, gAlign);
}

/**
 * C: pray.c prayer_done
 * @param {import('./gstate.js').game} g
 */
async function prayerDoneLikeC(g) {
    const u = g.u;
    const gp = g._prayGp;
    if (!u || !gp) return;
    const alignment = gp.p_aligntyp | 0;

    if (In_hell(u.uz)) {
        await pline(`Since you are in Gehennom, ${alignGnamePrayTargetLikeC(g, alignment)} can't help you.`);
        if ((u.ualign?.record | 0) <= 0 || rnl(u.ualign.record | 0)) {
            await angrygodsLikeC(g, u.ualign.type | 0);
        }
        return;
    }

    if (gp.p_type === -2) {
        await pline('You hear diabolical laughter all around you...');
        return;
    }
    if (gp.p_type === -1) {
        await pline('You feel like you are falling apart.');
        return;
    }

    const onAltar = IS_ALTAR(g.level?.levl?.[u.ux | 0]?.[u.uy | 0]?.typ | 0);

    if (gp.p_type === 0) {
        if (onAltar && (u.ualign.type | 0) !== alignment) await waterPrayerLikeC(g, false);
        u.ublesscnt = (u.ublesscnt | 0) + rnz(250);
        changeLuck(-3);
        await godsUpsetLikeC(g, u.ualign.type | 0);
    } else if (gp.p_type === 1) {
        if (onAltar && (u.ualign.type | 0) !== alignment) await waterPrayerLikeC(g, false);
        await angrygodsLikeC(g, u.ualign.type | 0);
    } else if (gp.p_type === 2) {
        if (await waterPrayerLikeC(g, false)) {
            u.ublesscnt = (u.ublesscnt | 0) + rnz(250);
            changeLuck(-3);
            await godsUpsetLikeC(g, u.ualign.type | 0);
        } else {
            grantGodsFifthPleasedGiftProtectionLikeC(g);
        }
    } else {
        if (onAltar) {
            await waterPrayerLikeC(g, true);
        }
        grantGodsFifthPleasedGiftProtectionLikeC(g);
    }
}

/**
 * C: pray.c dopray + prayer_done timing (ParanoidPray confirm, can_pray, nomul(-3) as three ticks).
 * @param {import('./gstate.js').game} g
 */
export async function runDoprayExtcmdFlowLikeC(g) {
    await pline('Are you sure you want to pray? [yn] (n)');
    g._retainMessageAfterCommand = true;
    await flush_screen(1);
    const ans = await nhgetch();
    if (ans !== 121 && ans !== 89) {
        return;
    }

    await canPraySetupLikeC(g, true);

    for (let i = 0; i < 3; i++) {
        await executeHelplessMoveloopTickLikeC(g);
    }

    await prayerDoneLikeC(g);
    await pline('You finish your prayer.');
    g._retainMessageAfterCommand = true;
    await flush_screen(1);
}
