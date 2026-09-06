// mkmap.js — Cavernous-level cellular-automata generator.
// C ref: nethack-c/upstream/src/mkmap.c — get_map, pass_one, pass_two,
// pass_three, remove_room, remove_rooms, init_map, init_fill, litstate_rnd,
// mkmap.
// Partial: join_map(), join_map_cleanup() and finish_map() are NOT ported
// yet (queued rows after this one, named in docs/c-js-map/data.md); the
// mkmap() driver below delegates those two calls to the live mklev.js
// clones until their rows land, so nothing imports this module yet.
// (The live LVLINIT_MINES path in js/mklev.js splev_initlev still runs its
// own clones; cutting it over is queued with the join_map/finish_map rows.)
// RNG: init_fill draws rn1/rnd, litstate_rnd draws rnd/rn2 on the negative
// arm; the six D-1902 functions draw nothing.

import { game } from './gstate.js';
import {
    COLNO, ROWNO, ROOMOFFSET, NO_ROOM,
} from './const.js';
import { impossible } from './display.js';
import { rn2, rnd, rn1 } from './rng.js';
import { depth as depth_of_level } from './hacklib.js';
// Temporary delegation: canonical join_map/finish_map are queued rows;
// until they land, mkmap() drives the live mklev.js clones (same C order,
// same argument order). join_map-fixed drops C's somexy-failure
// impossible() arm — adjudicated in the join_map row, not here.
import { join_map_fixed as mklev_join_map, finish_map as mklev_finish_map } from './mklev.js';

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

// C ref: mkmap.c:438-440 — tuning knobs for the cavern CA driver below.
// Kept as named exports (not inlined literals) so the driver cites C.
export const N_P1_ITER = 1; /* tune map generation via this value */
export const N_P2_ITER = 1; /* tune map generation via this value */
export const N_P3_ITER = 2; /* tune map smoothing via this value */

// C ref: mkmap.c:23-34 init_map().
// Blanket-fill: every cell x in [1,COLNO), y in [0,ROWNO) gets NO_ROOM,
// the background type, and lit FALSE — field order preserved.
export function init_map(bg_typ) {
    const map = game.level;
    for (let x = 1; x < COLNO; x++)
        for (let y = 0; y < ROWNO; y++) {
            const loc = map.at(x, y);
            if (!loc) continue;
            loc.roomno = NO_ROOM;
            loc.typ = bg_typ;
            loc.lit = false;
        }
}

// C ref: mkmap.c:36-52 init_fill().
// RNG envelope: scatter exactly limit = (WIDTH*HEIGHT*2)/5 foreground cells
// at x = rn1(WIDTH-1, 2) in [2,WIDTH], y = rnd(HEIGHT-1) in [1,HEIGHT-1];
// occupied cells do not count (loop retries without drawing extra RNG).
export function init_fill(bg_typ, fg_typ) {
    const map = game.level;
    const limit = (WIDTH * HEIGHT * 2) / 5;
    let count = 0;
    while (count < limit) {
        const x = rn1(WIDTH - 1, 2);
        const y = rnd(HEIGHT - 1);
        const loc = map.at(x, y);
        if (loc && loc.typ === bg_typ) {
            loc.typ = fg_typ;
            count++;
        }
    }
}

// C ref: mkmap.c:442-448 litstate_rnd().
// Negative input resolves against dungeon depth: rnd(1+|depth|) < 11 gates
// rn2(77), exactly like C's short-circuit &&. Non-negative passes through
// as boolean (C returns (boolean) litstate into an xint16).
export function litstate_rnd(litstate) {
    if (litstate < 0) {
        const d = depth_of_level(game.u?.uz);
        return (rnd(1 + Math.abs(d)) < 11 && rn2(77)) ? true : false;
    }
    return !!litstate;
}

// C ref: mkmap.c:450-486 mkmap().
// Cavern assembly driver: resolve lit, blanket the map, scatter the RNG
// fill, run the CA passes N_P1_ITER/N_P2_ITER (and N_P3_ITER smoothing)
// times, join the regions, finish (wallify/lit/lava-ice), then stamp the
// walled+joined level cavernous, not mazelike (-dlc).
// new_locations ownership (C :460 alloc / :485 free): C threads one
// (WIDTH+1)*HEIGHT scratch buffer through pass_two/pass_three via the
// new_loc macro. The JS passes above keep per-call scratch at the same
// new_loc layout instead (see new_loc_index); that is observationally
// identical — every pass fully rewrites its region before its copy-back
// loop reads it, and this driver calls the passes strictly sequentially —
// so there is no shared buffer for mkmap() itself to own or free.
export function mkmap(init_lev) {
    const bg_typ = init_lev.bg;
    const fg_typ = init_lev.fg;
    const smooth = !!init_lev.smoothed;
    const join = !!init_lev.joined;
    let lit = init_lev.lit;
    const walled = !!init_lev.walled;
    let i;

    lit = litstate_rnd(lit);

    init_map(bg_typ);
    init_fill(bg_typ, fg_typ);

    for (i = 0; i < N_P1_ITER; i++)
        pass_one(bg_typ, fg_typ);

    for (i = 0; i < N_P2_ITER; i++)
        pass_two(bg_typ, fg_typ);

    if (smooth)
        for (i = 0; i < N_P3_ITER; i++)
            pass_three(bg_typ, fg_typ);

    if (join)
        mklev_join_map(bg_typ, fg_typ);

    mklev_finish_map(fg_typ, bg_typ, !!lit, walled, !!init_lev.icedpools);
    /* a walled, joined level is cavernous, not mazelike -dlc */
    if (walled && join) {
        game.level.flags.is_maze_lev = false;
        game.level.flags.is_cavernous_lev = true;
    }
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
