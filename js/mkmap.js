// mkmap.js — Cavernous-level cellular-automata passes + joined-map room removal.
// C ref: nethack-c/upstream/src/mkmap.c — get_map, pass_one, pass_two,
// pass_three, remove_room, remove_rooms.
// Partial: mkmap(), init_map(), init_fill(), join_map(),
// join_map_cleanup() and finish_map() are NOT ported yet (named in
// docs/c-js-map/data.md); the INIT_MAP cavern styles in sp_lev.c level_init
// (:3010) have no live JS path, so nothing imports this module yet.
// RNG: none of these six functions draw (init_fill's rn1/rnd live in the
// deferred mkmap envelope).

import { game } from './gstate.js';
import {
    COLNO, ROWNO, ROOMOFFSET,
} from './const.js';
import { impossible } from './display.js';

// C mkmap.c:8-9: HEIGHT is (ROWNO-1), WIDTH is (COLNO-2).
const HEIGHT = ROWNO - 1;
const WIDTH = COLNO - 2;

// C mkmap.c:62-65: 8-neighbour offsets, row-major pairs.
const DIRS = [
    -1, -1, -1, 0, -1, 1, 0, -1,
    0, 1, 1, -1, 1, 0, 1, 1,
];

// C ref: mkmap.c:54-60 get_map().
// Out-of-range reads report the background type, exactly like C.
export function get_map(col, row, bg_typ) {
    if (col <= 0 || row < 0 || col > WIDTH || row >= HEIGHT)
        return bg_typ;
    const loc = game.level.at(col, row);
    return loc ? loc.typ : bg_typ;
}

// Count fg_typ cells among the 8 neighbours of (x, y). C mkmap.c:75-78,
// :108-111, :131-134 (identical loop in all three passes).
function count_neighbours(x, y, bg_typ, fg_typ) {
    let count = 0;
    for (let dr = 0; dr < 8; dr++)
        if (get_map(x + DIRS[dr * 2], y + DIRS[dr * 2 + 1], bg_typ) === fg_typ)
            count++;
    return count;
}

// C ref: mkmap.c:67-96 pass_one().
// In-place cellular automaton step: 0-2 fg neighbours kill the cell,
// 5-8 breed it, 3-4 leave it. Writes go straight to levl, so later cells
// in the same sweep already see updated neighbours — preserved here.
export function pass_one(bg_typ, fg_typ) {
    const map = game.level;
    for (let x = 2; x <= WIDTH; x++)
        for (let y = 1; y < HEIGHT; y++) {
            const count = count_neighbours(x, y, bg_typ, fg_typ);
            switch (count) {
            case 0: /* death */
            case 1:
            case 2:
                map.at(x, y).typ = bg_typ;
                break;
            case 5:
            case 6:
            case 7:
            case 8:
                map.at(x, y).typ = fg_typ;
                break;
            default:
                break;
            }
        }
}

// Scratch-buffer layout. C mkmap.c:98:
// new_loc(i,j) is *(gn.new_locations + j*(WIDTH+1) + i); gn.new_locations is
// alloc'd once per mkmap() (:460) and freed at :485. Every pass below fully
// rewrites its region before the copy-back loop reads it, so a per-call
// scratch array is observationally identical to the reused C buffer.
function new_loc_index(i, j) {
    return j * (WIDTH + 1) + i;
}

// C ref: mkmap.c:100-121 pass_two().
// Double-buffered: exactly-5 neighbours become bg, everything else keeps
// its current type; the second loop copies the buffer back to levl.
export function pass_two(bg_typ, fg_typ) {
    const map = game.level;
    const nl = new Array((WIDTH + 1) * HEIGHT);
    for (let x = 2; x <= WIDTH; x++)
        for (let y = 1; y < HEIGHT; y++) {
            if (count_neighbours(x, y, bg_typ, fg_typ) === 5)
                nl[new_loc_index(x, y)] = bg_typ;
            else
                nl[new_loc_index(x, y)] = get_map(x, y, bg_typ);
        }

    for (let x = 2; x <= WIDTH; x++)
        for (let y = 1; y < HEIGHT; y++)
            map.at(x, y).typ = nl[new_loc_index(x, y)];
}

// C ref: mkmap.c:123-144 pass_three().
// Double-buffered smoothing: fewer than 3 fg neighbours become bg,
// everything else keeps its type; then copy back.
export function pass_three(bg_typ, fg_typ) {
    const map = game.level;
    const nl = new Array((WIDTH + 1) * HEIGHT);
    for (let x = 2; x <= WIDTH; x++)
        for (let y = 1; y < HEIGHT; y++) {
            if (count_neighbours(x, y, bg_typ, fg_typ) < 3)
                nl[new_loc_index(x, y)] = bg_typ;
            else
                nl[new_loc_index(x, y)] = get_map(x, y, bg_typ);
        }

    for (let x = 2; x <= WIDTH; x++)
        for (let y = 1; y < HEIGHT; y++)
            map.at(x, y).typ = nl[new_loc_index(x, y)];
}

// C ref: mkmap.c:378-401 remove_rooms().
// Removes every room totally overlapped by [lx,hx)x[ly,hy); a partially
// overlapped room is left in place (C TODO) and, when regular, reported via
// impossible(). Async only because JS impossible() awaits a bug pline.
// Note: remove_rooms has no callers in pinned upstream src (it is extern in
// include/extern.h:1614); it is ported as the public entry C provides.
export async function remove_rooms(lx, ly, hx, hy) {
    const g = game;
    for (let i = g.level.nroom - 1; i >= 0; --i) {
        const croom = g.level.rooms[i];
        if (croom.hx < lx || croom.lx >= hx || croom.hy < ly
            || croom.ly >= hy)
            continue; /* no overlap */

        if (croom.lx < lx || croom.hx >= hx || croom.ly < ly
            || croom.hy >= hy) { /* partial overlap */
            /* TODO: ensure remaining parts of room are still joined */

            if (!croom.irregular)
                await impossible('regular room in joined map');
        } else {
            /* total overlap, remove the room */
            remove_room(i);
        }
    }
}

// C ref: mkmap.c:403-436 remove_room().
// Swaps the last room over the removed slot (corridors are already dug, so
// array order no longer matters), rewrites levl roomno cells that pointed
// at the moved room, and tombstones the dead slot with hx = -1.
export function remove_room(roomno) {
    const g = game;
    const rooms = g.level.rooms;
    const croom = rooms[roomno];
    const maxroom = rooms[--g.level.nroom];

    if (croom !== maxroom) {
        /* C does *croom = *maxroom (struct copy). JS rooms are objects, so
           copy fields into the vacated slot — never alias maxroom, or the
           hx = -1 tombstone below would also kill the moved room. */
        rooms[roomno] = { ...maxroom };

        /* since maxroom moved, update affected level roomno values */
        const oroomno = g.level.nroom + ROOMOFFSET;
        const newroomno = roomno + ROOMOFFSET;
        const moved = rooms[roomno];
        /* JS-only ownership: roomnoidx caches the slot index (dog.js,
           hack.js, mklev.js derive levl roomno from it), so restamp it like
           the C levl rewrite restamps cells. */
        moved.roomnoidx = roomno;
        for (let x = moved.lx; x <= moved.hx; ++x)
            for (let y = moved.ly; y <= moved.hy; ++y) {
                const loc = g.level.at(x, y);
                if (loc && loc.roomno === oroomno)
                    loc.roomno = newroomno;
            }
    }

    maxroom.hx = -1; /* just like add_room */
}
