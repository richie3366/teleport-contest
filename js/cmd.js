// cmd.js — Command dispatch and movement.
// C ref: cmd.c rhack(), hack.c domove(); trap.c dotrap (nomul prefix when trap present);
// trap.c drown() pool entry — drown.js maybeHeroPoolEnter after moves.
//
// Movement: hjklyubn; peaceful/tame mons → swap (hack.c displace); else bump attack stub.
// Contestants should add: search, kick, eat, drink, read, zap,
// wear, wield, drop, throw, pray, cast, and all other commands.

import { game } from './gstate.js';
import { nhgetch } from './input.js';
import { newsym, flush_screen, pline, docrt } from './display.js';
import { vision_recalc } from './vision.js';
import { dosearch, tAt } from './search.js';
import { maybeSmudgeEngr } from './engrave.js';
import { checkHere } from './pickup.js';
import { dotrap } from './trap.js';
import { runExtcmdFromHashPrefix } from './extcmd.js';
import { doBumpMeleeAttack } from './attack.js';
import { tryPeacefulSwap } from './peaceful_displace.js';
import { blocksMovementAt, diagonalHeroMoveBlocked } from './walkable.js';
import { maybeHeroPoolEnter } from './drown.js';
import { NO_TRAP_FLAGS } from './const.js';

// Direction deltas: y u k
//                   h . l
//                   b j n
const DIR_DX = { h: -1, l: 1, j: 0, k: 0, y: -1, u: 1, b: -1, n: 1 };
const DIR_DY = { h: 0, l: 0, j: 1, k: -1, y: -1, u: -1, b: 1, n: 1 };

function isMovementKey(ch) {
    return 'hjklyubn'.includes(ch);
}

// C ref: walkable.js blocksMovementAt (hack.c / goodpos terrain slice)
function blocksMove(x, y) {
    return blocksMovementAt(x, y);
}

// C ref: cmd.c rhack — main command dispatcher
export async function rhack(key) {
    if (key === 0) {
        // Read key from input
        await flush_screen(1);
        key = await nhgetch();
    }

    if (key === 27) {
        // C: ESC — dismiss overlays; clear top line (tty dismiss echo)
        if (game._inventoryMode) {
            game._inventoryMode = false;
            game._pending_message = '';
            await docrt();
            await flush_screen(1);
        } else if (game._overlayScreen) {
            game._overlayScreen = null;
            game._pending_message = '';
            await docrt();
            await flush_screen(1);
        } else {
            game._pending_message = '';
            await flush_screen(1);
        }
        game.context.move = 0;
        return;
    }

    if (key === 24) {
        // C: #attributes (Ctrl-X) — enlightenment-style pager
        game._overlayScreen = 'attr1';
        game.context.move = 0;
        await flush_screen(1);
        return;
    }

    const ch = String.fromCharCode(key);

    if (ch === ' ' && game._overlayScreen === 'attr1') {
        game._overlayScreen = 'attr2';
        game.context.move = 0;
        await flush_screen(1);
        return;
    }
    if (ch === ' ' && game._overlayScreen === 'attr2') {
        game._overlayScreen = null;
        game._pending_message = '';
        await docrt();
        await flush_screen(1);
        game.context.move = 0;
        return;
    }

    if (ch === '#') {
        await runExtcmdFromHashPrefix();
        return;
    }

    if (isMovementKey(ch)) {
        game.context.move = (await domove(DIR_DX[ch], DIR_DY[ch])) ? 1 : 0;
    } else if (ch === 's') {
        // C: cmd.c rhack — #search → dosearch() → dosearch0 (detect.c)
        game.context.move = 1;
        await dosearch();
    } else if (ch === 'i') {
        // C: cmd.c #inventory — minimal full-screen list (invent.c)
        game.context.move = 0;
        game._inventoryMode = true;
        await flush_screen(1);
    } else if (ch === '+') {
        // C: spell menu — no spells known yet
        game.context.move = 0;
        await pline("You don't know any spells right now.");
        game._retainMessageAfterCommand = true;
        await flush_screen(1);
    } else if (ch === ':') {
        // C: invent.c dolook → pickup.c check_here (look_here / engravings)
        game.context.move = 0;
        await checkHere(false);
    } else if (ch === '\\') {
        // C: #discoveries (\\)
        game.context.move = 0;
        game._overlayScreen = 'discoveries';
        await flush_screen(1);
    } else {
        // Unknown command
        game.context.move = 0;
        await pline(`Unknown command '${ch}'.`);
    }
}

// C ref: hack.c domove — execute a movement; returns true if hero moved or attacked.
function mAt(x, y) {
    return game.level?.monsters?.find((m) => m.mx === x && m.my === y) ?? null;
}

async function domove(dx, dy) {
    const u = game.u;
    const newx = u.ux + dx;
    const newy = u.uy + dy;

    if (blocksMove(newx, newy)) {
        // Can't move there — no game time (C: domove returns without moving)
        return false;
    }
    if (diagonalHeroMoveBlocked(dx, dy, newx, newy)) {
        // C: hack.c test_move — `bad_rock` corners + `cant_squeeze_thru` + `NODIAG`
        return false;
    }

    const mtmp = mAt(newx, newy);
    if (mtmp) {
        if (mtmp.mpeaceful | 0) {
            const ox = u.ux, oy = u.uy;
            const { swapped } = await tryPeacefulSwap(mtmp, ox, oy, newx, newy);
            if (swapped) {
                u.ux0 = ox;
                u.uy0 = oy;
                maybeSmudgeEngr(ox, oy, newx, newy);
                const trSwap = tAt(newx, newy);
                if (trSwap) await dotrap(trSwap, NO_TRAP_FLAGS);
                await maybeHeroPoolEnter(game);
                const hx = u.ux, hy = u.uy;
                newsym(ox, oy);
                if (hx !== newx || hy !== newy) newsym(newx, newy);
                newsym(hx, hy);
            } else {
                newsym(newx, newy);
            }
        } else {
            await doBumpMeleeAttack(mtmp);
            newsym(newx, newy);
        }
        game._pending_message = '';
        game._overlayScreen = null;
        game._inventoryMode = false;
        vision_recalc(1);
        return true;
    }

    // Move the hero
    const oldx = u.ux, oldy = u.uy;
    u.ux0 = oldx;
    u.uy0 = oldy;
    u.ux = newx;
    u.uy = newy;
    // C: hack.c domove — after domove_core walk/rush
    maybeSmudgeEngr(oldx, oldy, newx, newy);
    const tr = tAt(newx, newy);
    if (tr) await dotrap(tr, NO_TRAP_FLAGS);
    await maybeHeroPoolEnter(game);
    const hx = u.ux, hy = u.uy;
    game._pending_message = '';
    game._overlayScreen = null;
    game._inventoryMode = false;

    // Update display (hero may have crawled from pool to `hx,hy` ≠ `newx,newy`)
    newsym(oldx, oldy);
    vision_recalc(1);
    if (hx !== newx || hy !== newy) newsym(newx, newy);
    newsym(hx, hy);
    return true;
}
