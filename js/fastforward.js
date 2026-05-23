// fastforward.js — Transitional RNG harness (NOT a design target).
//
// Blocks below replay leaf PRNG calls captured from a reference session so the
// ISAAC stream stays aligned while init/mklev/moveloop pieces are still stubs.
// They must be deleted or narrowed as real ports land:
//   • fastforward_pre_mklev / post_mklev → o_init, dungeon.c, u_init.c (mklev fill
//     + mineralize run in mklev.js makelevel / level_finalize_topology).
//   • Per-turn tail: allmain.js moveloop_core → monmove.js + moveloop_aux.js
//     (replacing fastforward_step); this file keeps startup fill/replay only.
//
// Session JSON was only the extraction source; behavior must converge by
// matching C, not by tuning to fixtures.
//
// Derived from a frozen reference session RNG log (historical extraction).

import { rn2 } from "./rng.js";
import { game } from "./gstate.js";
import { runUInitRoleRngAfterMklevLikeC } from "./u_init_post_mklev.js";

// Pre-mklev startup: dungeon init, u_init_misc (handedness rn2(10) in allmain.js before l_nhcore_init)
// init_objects gem/shuffle/WAN — js/o_init.js initObjectsLikeC (session indices 0-198)
export function fastforward_pre_mklev() {
    /* init_objects gem/shuffle/WAN — js/o_init.js initObjectsLikeC */
    // random
    rn2(3); rn2(2);
    // init_dungeon_dungeons
    rn2(100); rn2(5);
    // init_level
    rn2(100); rn2(100); rn2(100); rn2(100); rn2(100);
    // place_level
    rn2(4); rn2(5); rn2(4); rn2(1);
    // init_dungeon_dungeons
    rn2(100); rn2(5);
    // parent_dlevel
    rn2(1);
    // init_level
    rn2(100); rn2(100); rn2(100); rn2(100); rn2(100); rn2(100); rn2(100); rn2(100);
    rn2(100); rn2(100); rn2(100);
    // place_level
    rn2(1); rn2(1); rn2(4); rn2(3); rn2(5); rn2(6); rn2(1); rn2(1);
    rn2(4); rn2(4); rn2(3);
    // init_dungeon_dungeons
    rn2(100); rn2(2);
    // parent_dlevel
    rn2(3);
    // init_level
    rn2(100); rn2(100);
    // place_level
    rn2(2); rn2(1);
    // init_dungeon_dungeons
    rn2(100); rn2(2);
    // parent_dlevel
    rn2(2);
    // init_level
    rn2(100); rn2(100); rn2(100);
    // place_level
    rn2(1); rn2(1); rn2(1);
    // init_dungeon_dungeons
    rn2(100);
    // parent_dlevel
    rn2(1);
    // init_level
    rn2(100); rn2(100); rn2(100); rn2(100);
    // place_level
    rn2(1); rn2(1); rn2(1); rn2(1);
    // init_dungeon_dungeons
    rn2(100);
    // parent_dlevel
    rn2(4);
    // init_level
    rn2(100);
    // place_level
    rn2(1);
    // init_dungeon_dungeons
    rn2(100);
    // parent_dlevel
    rn2(5);
    // init_level
    rn2(100); rn2(100); rn2(100);
    // place_level
    rn2(1); rn2(1); rn2(1);
    // init_dungeon_dungeons
    rn2(100);
    // parent_dlevel
    rn2(1);
    // init_level
    rn2(100); rn2(100); rn2(100); rn2(100); rn2(100); rn2(100);
    // place_level
    rn2(1); rn2(1); rn2(1); rn2(1); rn2(1); rn2(1);
    // init_dungeon_dungeons
    rn2(100);
    // init_level
    rn2(100); rn2(100);
    // place_level
    rn2(1); rn2(1);
    // init_castle_tune (dungeon.c init_castle_tune — store for pray.c pleased pat_on_head)
    {
        let tune = '';
        for (let i = 0; i < 5; i++) tune += String.fromCharCode(65 + rn2(7));
        game._castleTuneStr = tune;
    }
    /* C u_init.c u_init_misc — `u.uhandedness = rn2(10) ? …` (allmain.js newgame, after g.u scaffold) */
}

/** @deprecated Use runUInitRoleRngAfterMklevLikeC from u_init_post_mklev.js */
export function fastforward_post_mklev() {
    runUInitRoleRngAfterMklevLikeC();
}

