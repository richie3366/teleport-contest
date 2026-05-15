// cmd.js — Command dispatch and movement.
// C ref: cmd.c rhack(), hack.c domove().
//
// Minimal skeleton: only hjklyubn movement is implemented.
// Contestants should add: search, kick, eat, drink, read, zap,
// wear, wield, drop, throw, pray, cast, and all other commands.

import { game } from './gstate.js';
import { nhgetch } from './input.js';
import { newsym, flush_screen, pline, docrt } from './display.js';
import { vision_recalc } from './vision.js';
import { dosearch } from './search.js';
import { COLNO, ROWNO, STONE, DOOR, D_CLOSED, D_LOCKED,
         IS_WALL, IS_OBSTRUCTED } from './const.js';

// Direction deltas: y u k
//                   h . l
//                   b j n
const DIR_DX = { h: -1, l: 1, j: 0, k: 0, y: -1, u: 1, b: -1, n: 1 };
const DIR_DY = { h: 0, l: 0, j: 1, k: -1, y: -1, u: -1, b: 1, n: 1 };

function isMovementKey(ch) {
    return 'hjklyubn'.includes(ch);
}

// C ref: hack.c — check if a cell blocks movement
function blocksMove(x, y) {
    const loc = game.level?.at(x, y);
    if (!loc) return true;
    if (loc.typ === STONE) return true;
    if (IS_WALL(loc.typ)) return true;
    if (loc.typ === DOOR && (loc.doormask & (D_CLOSED | D_LOCKED))) return true;
    return false;
}

// C ref: cmd.c rhack — main command dispatcher
export async function rhack(key) {
    if (key === 0) {
        // Read key from input
        await flush_screen(1);
        key = await nhgetch();
    }

    if (key === 27) {
        // C: ESC — dismiss inventory; clear top line (tty dismiss echo)
        if (game._inventoryMode) {
            game._inventoryMode = false;
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

    const ch = String.fromCharCode(key);

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
        // C: look at floor / dolook — empty cell
        game.context.move = 0;
        await pline('You see no objects here.');
        game._retainMessageAfterCommand = true;
        await flush_screen(1);
    } else {
        // Unknown command
        game.context.move = 0;
        await pline(`Unknown command '${ch}'.`);
    }
}

// C ref: hack.c domove — execute a movement; returns true if hero moved.
async function domove(dx, dy) {
    const u = game.u;
    const newx = u.ux + dx;
    const newy = u.uy + dy;

    if (blocksMove(newx, newy)) {
        // Can't move there — no game time (C: domove returns without moving)
        return false;
    }

    // Move the hero
    const oldx = u.ux, oldy = u.uy;
    u.ux0 = oldx;
    u.uy0 = oldy;
    u.ux = newx;
    u.uy = newy;
    game._pending_message = '';

    // Update display
    newsym(oldx, oldy);
    vision_recalc(1);
    newsym(newx, newy);
    return true;
}
