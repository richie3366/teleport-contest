// extcmd.js — Extended commands (`#` prefix, doextcmd).
// C ref: cmd.c doextcmd, extcmdlist
//
// JS extras: wizard **`#F`**/**`#c`** — hero **`ubuzz`**; **`#d`** — **`dig.c`** **`zap_dig`** (**`u.dz`** + horizontal);
// **`#D`** — **`dig.c`** **`dig()`** wall/door completion harness (**`dig_hero.js`**);
// **`#m`**/**`#B`** — monster **`mbuzz`** (**`muse.c`** **`BZ_M_WAND`/`BZ_M_BREATH`** from neighbor toward hero);
// **`#l`**/**`#L`** — **`pickup.c`** **`use_container`** trapped (**`held`** floor vs invent) → **`trap.c`** **`chest_trap`** (**`pickup.js`**);
// **`#p`**/**`#P`** — **`lock.c`** **`picklock()`** success tail on locked floor box (**`lock_hero.js`**; instant success, no occupation);
// wizard **`z`** — **`dozap.js`**.

import { game } from './gstate.js';
import { nhgetch } from './input.js';
import { readDirIntoU } from './dir_input.js';
import { flush_screen, pline, docrt } from './display.js';
import { versionPlineText } from './nethack_version.js';
import { enhanceWeaponSkillOneStep } from './u_init_skills.js';
import { ZT_SPELL, ZT_COLD, ZT_WAND } from './zap_over_floor.js';
import { tAt } from './search.js';
import { is_pit } from './const.js';
import { canReachFloor } from './engrave.js';
import { doname } from './objnam.js';
import { theObjnamLikeC } from './trap.js';
import { floorContainerAtHeroFeetPickupLikeC, heroOpenTrappedContainerPickupLikeC, carriedTrappedUnlockedContainerPickupLikeC } from './pickup.js';
import { uHandsyHeroLikeC } from './hero_hands.js';
import { applyPicklockSucceededOnFloorBoxHeroLikeC, heroFirstLockToolOtypLikeC } from './lock_hero.js';
import {
    ubuzzOverFloor,
    mbuzzTowardHeroFromFacingNeighbor,
    mbuzzOffensiveWandFromMonsterTowardMux,
    BZ_M_BREATH,
    BZ_OFS_AD,
    AD_COLD,
    WAN_COLD,
} from './buzz.js';
import { heroZapDigLikeC } from './zap_dig.js';
import { heroDigCompleteWallDoorOrSecretLikeC } from './dig_hero.js';

/** C: doextcmd — echo '#' on the top line, then read the next key (tty). */
export async function runExtcmdFromHashPrefix() {
    game.context.move = 0;
    if (game._overlayScreen || game._inventoryMode) {
        game._overlayScreen = null;
        game._inventoryMode = false;
        await docrt();
    }
    game._pending_message = '#';
    await flush_screen(1);
    const k = await nhgetch();
    game._pending_message = '';
    if (k === 27) {
        await flush_screen(1);
        return;
    }
    const ch2 = String.fromCharCode(k);
    if (ch2 === 'v' || ch2 === 'V') {
        await pline(versionPlineText());
        game._retainMessageAfterCommand = true;
        await flush_screen(1);
        return;
    }
    if (ch2 === 'e' || ch2 === 'E') {
        /* C: cmd.c doextcmd → enhance_weapon_skill — menu not ported; wizard y_n → speedy */
        let speedy = false;
        if (game.flags?.wizard) {
            await pline('Advance skills without practice? [yn]');
            game._retainMessageAfterCommand = true;
            await flush_screen(1);
            const ans = await nhgetch();
            speedy = ans === 121 || ans === 89; /* y Y */
        }
        const r = enhanceWeaponSkillOneStep(game, { speedy });
        if (!r.ok) await pline('You cannot enhance any skills at the moment.');
        else {
            for (const line of r.plines) {
                await pline(line);
            }
        }
        game._retainMessageAfterCommand = true;
        await flush_screen(1);
        return;
    }
    if (ch2 === 'F' && game.flags?.wizard) {
        /* C: zap.c ubuzz — cone of cold (**`ZT_SPELL(ZT_COLD)`**), wizard harness. */
        await ubuzzOverFloor(game, ZT_SPELL(ZT_COLD), 0);
        await flush_screen(1);
        return;
    }
    if (ch2 === 'c' && game.flags?.wizard) {
        /* C: zap.c weffects — wand of cold (**`ZT_WAND(ZT_COLD)`**), same facing as **`#F`**. */
        await ubuzzOverFloor(game, ZT_WAND(ZT_COLD), 6);
        await flush_screen(1);
        return;
    }
    if (ch2 === 'd' && game.flags?.wizard) {
        /* C: dig.c zap_dig — wand of digging; same facing as **`#c`** (**`WAN_DIGGING`**). */
        await heroZapDigLikeC(game);
        await flush_screen(1);
        return;
    }
    if (ch2 === 'D' && game.flags?.wizard) {
        /* C: dig.c **`dig()`** completion at adjacent cell (**`dpx,dpy`**) — wall/SDOOR/closed door + shop billing. */
        await pline('Dig toward which wall or door?');
        game._retainMessageAfterCommand = true;
        await flush_screen(1);
        if (!(await readDirIntoU(game))) {
            await pline('Never mind.');
            await flush_screen(1);
            return;
        }
        const u = game.u;
        const tx = (u.ux | 0) + (u.dx | 0);
        const ty = (u.uy | 0) + (u.dy | 0);
        if (!(await heroDigCompleteWallDoorOrSecretLikeC(game, tx, ty))) {
            await pline('Nothing happens.');
            game._retainMessageAfterCommand = true;
        }
        await flush_screen(1);
        return;
    }
    if (ch2 === 'm' && game.flags?.wizard) {
        /* C: muse.c **`use_offensive`** ray wand — same geometry as neighbor harness (**`mx,my`→`mux,muy`**). */
        const u = game.u;
        let ok = false;
        if (u) {
            const dx0 = u.dx | 0;
            const dy0 = u.dy | 0;
            if (dx0 !== 0 || dy0 !== 0) {
                const mtmp = {
                    mx: (u.ux + dx0) | 0,
                    my: (u.uy + dy0) | 0,
                    mux: u.ux | 0,
                    muy: u.uy | 0,
                    mwandexp: 1,
                };
                ok = await mbuzzOffensiveWandFromMonsterTowardMux(game, mtmp, WAN_COLD);
            }
        }
        if (!ok) {
            await pline('Nothing happens.');
            game._retainMessageAfterCommand = true;
        }
        await flush_screen(1);
        return;
    }
    if (ch2 === 'B' && game.flags?.wizard) {
        /* C: zap.c **`dobuzz`** monster breath — **`BZ_M_BREATH(BZ_OFS_AD(AD_COLD))`**. */
        const breath = BZ_M_BREATH(BZ_OFS_AD(AD_COLD));
        if (!(await mbuzzTowardHeroFromFacingNeighbor(game, breath, 6))) {
            await pline('Nothing happens.');
            game._retainMessageAfterCommand = true;
        }
        await flush_screen(1);
        return;
    }
    if (ch2 === 'l' || ch2 === 'L') {
        /* C: pickup.c **`use_container`** — trapped container: floor (**`held`** false) or invent (**`held`** true); **`chest_trap(HAND)`**. */
        const g = game;
        const u = g.u;
        if (!u || !g.level) {
            await pline('Nothing happens.');
            game._retainMessageAfterCommand = true;
            await flush_screen(1);
            return;
        }
        if (!(await uHandsyHeroLikeC(g))) {
            game._retainMessageAfterCommand = true;
            await flush_screen(1);
            return;
        }
        const tr = tAt(u.ux | 0, u.uy | 0);
        const reach = canReachFloor(!!(tr && is_pit(tr.ttyp)));
        const boxF = reach ? floorContainerAtHeroFeetPickupLikeC(g) : null;
        const boxC = carriedTrappedUnlockedContainerPickupLikeC(g);

        if (boxF && !(boxF.olocked | 0) && (boxF.otrapped | 0)) {
            if (await heroOpenTrappedContainerPickupLikeC(g, boxF, false)) game.context.move = 1;
        } else if (boxC) {
            if (await heroOpenTrappedContainerPickupLikeC(g, boxC, true)) game.context.move = 1;
        } else if (boxF && (boxF.olocked | 0)) {
            await pline(`${theObjnamLikeC(doname(boxF, g))} is locked.`);
        } else if (boxF && !(boxF.otrapped | 0)) {
            await pline('That container is not trapped. (Full #loot not ported.)');
        } else if (!reach) {
            await pline('You cannot reach the floor!');
        } else {
            await pline('There is no trapped container here or in your pack.');
        }
        game._retainMessageAfterCommand = true;
        await flush_screen(1);
        return;
    }
    if (ch2 === 'p' || ch2 === 'P') {
        /* C: lock.c picklock() — locked floor container: toggle **`olocked`**, **`lknown`**, **`chest_trap(..., FINGER)`** (no **`rn2(100)`** loop). */
        const g = game;
        const u = g.u;
        if (!u || !g.level) {
            await pline('Nothing happens.');
            game._retainMessageAfterCommand = true;
            await flush_screen(1);
            return;
        }
        const tr = tAt(u.ux | 0, u.uy | 0);
        if (!canReachFloor(!!(tr && is_pit(tr.ttyp)))) {
            await pline('You cannot reach the floor!');
            game._retainMessageAfterCommand = true;
            await flush_screen(1);
            return;
        }
        const box = floorContainerAtHeroFeetPickupLikeC(g);
        if (!box) {
            await pline('There is no container here.');
        } else if (!(box.olocked | 0)) {
            await pline('That container is not locked.');
        } else {
            const pickOtyp = heroFirstLockToolOtypLikeC(g);
            if (pickOtyp == null) {
                await pline("You don't have anything to pick that lock with.");
            } else {
                await applyPicklockSucceededOnFloorBoxHeroLikeC(g, box, pickOtyp);
                g.context.move = 1;
            }
        }
        game._retainMessageAfterCommand = true;
        await flush_screen(1);
        return;
    }
    await pline(`Unknown extended command '#${ch2}'.`);
    game._retainMessageAfterCommand = true;
    await flush_screen(1);
}
