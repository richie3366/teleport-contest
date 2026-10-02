# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).

## Active

Parks are indexed in `LOOP-QUEUE.md` **Parked** (proofs in `docs/archive/LOOP-QUEUE-PARKED.md`). Live hypotheses only:

- **Breadth phase (architect, 2026-09-18 — Constitution §10.17):**
  hypothesis: held-out (11/44, RNG 26.6 %, screens 50 %) is bounded by
  *missing C*, not by the corpus residuals — 2,345/4,868 pinned-C functions
  MISSING/THIN, held-out sessions are wizard-mode tours that walk into them.
  Falsifier: `node scripts/leaderboard.mjs` after ~30 whole-function
  iterations (≈ iteration 3190); held-out passing/RNG % not moving while
  the ledger's declared-ported count rises (`docs/ledger/SNAPSHOTS.tsv`,
  one line per audit) ⇒ the picker is wrong, human
  revisits. Phase-2 rows (`[measure]`, parks, `hidden-proxy queue`) stay
  closed meanwhile; the corpus is guarded by REACH in `verify.mjs`.
  Everything below this bullet is phase-2 context — do not act on it now.
- Audit 2167–2175 gap: D-3189/D-3190 lack per-SHA audits (counts live in CURRENT Score + journal).

- **obj_resists writers (D-2407/2413-15, MEASURED):** `steal.c` relobj `flooreffects` + Knight/Arch/Healer arms (detail in D-logs). Falsified — do not re-check: fire-trap burn, fmon-order, polyuse, monstone, bury, steal.

- **Corpus remainder is paint-timing + writer misattribution, not bodies:**
  `hidden-proxy queue` now prints the differing screen row (e.g. row 23
  `AC:6` vs `AC:10`; row 4 «You were held by a pit fiend» vs «You weren't
  hungry»). The value's writer is the port; the painter is proven faithful
  (do_statusline1/2, one_characteristic parks).
- **disclose→enlightenment (measured):** Priest-92179 s100 map diff is display-stream-only (RNG 3081/3081); no writer row — disclose parks as SYMPTOM on the park's C display-RNG-trace falsifier (proof in park archive).
- **R-1082 music path live:** `seemimic` js/music.js:312; omit is trap-clone-only.
- **Eval-order TDZ (D-2349):** no static edge to polyself at eval; late-bind setters.
- **Fortress guards** (do not reopen): display_inventory, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue S_ndoor, bigrm-2, getpos, summonmu, lookat, do_statusline1, snapshot, fakewiz, Ice/Boulder, roles[], pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **distfleeck residuals (D-2420 MEASURED):** W5/W6 shipped (D-2714/D-2717); W1/W4 shipped, W2/W3 parked with `[measure]` rows (Phase 2 section). Falsified — do not re-check: scared re-port, MAIL arm, seed/step/coords logic.
- **do_statusline2 residuals (D-2425 MEASURED):** W1 mhitm_ad_cold + W2 eat-progress uhs/botl shipped (D-2718/D-2720). Monk-92194 Pw = D-2161 gulpmu residual, no new row.
## Don't re-check (≤15)

- D-1790…D-3304 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Corpus recordings present (953 entries); full scores need unfiltered `score`.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- `Val/Sam` D-1852/D-1858 — check loaders before refilling.
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-3304.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-3304 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-3304: four by-design resolutions + two stale-complete + one module-local port (C staticfn idiom, D-3293 precedent; same module as callee, no new import). Named: - `l_register_des`: the registration itself — no `lua_State`/global table exists in scored
- D-3303: whole-body port in C order as an export in js/vision.js (C file order, before vision_init); `isok` added to the existing `./const.js` import (`imports Named: - `get_viz_clear`: C caller levl_sanity_check (wizcmds.c:1443–1457) unported — no JS call 
- D-3302: none in `js/` — four by-design resolutions + one stale-complete, all documented here and booked via Ledger. Named: - `discardexcess`: the FILE* drain itself — no stream exists post-split (readentry docbloc
- D-3301: added three module-local functions in C-cite form (C staticfn idiom, D-3293 precedent); rewired all three C caller sites to the named functions. Named: none — every arm, callee (live), and C caller wired.
- D-3300: - `nextobuf`: ledger by-design — no JS symbol to add (a `return ''` stub would be dead; every C caller is ported on fresh strings). Named: - `nextobuf`: the pool itself — `obufs[NUMOBUF][BUFSZ]` rotation has no JS counterpart (im
- D-3299: - `There`: deleted the do.js:505 clone (C-cite comment left at the site); added `There` to the existing `./display.js` import (do.js:65; `imports.mjs  Named: - `There`: none in-body — whole C body live in the canonical export (You_buf growth + free
- D-3298: - `program_state_init`: `export function program_state_init()` in `js/decl.js` (C file order, before `decl_globals_init`), body `game.program_state =  Named: - `program_state_init`: none — whole C body live (single assignment; no merge/restore sema
- D-3297: - `digit`: `export function digit(c)` in C order, char-or-code param (highc/lowc idiom); single-char string compare is code compare, all below 128 (no Named: - `digit`: none in-body — whole C body live (unwired callers keep C-exact inlines, listed 
- D-3296: - `levltyp_to_name`: `export const levltyp` (39 entries, C `:1073–1085` order verbatim) + `export function levltyp_to_name` in C order (`typ >= 0 && t Named: - `levltyp_to_name`: none in-body — whole C body + table live (both C callers unwired as a
- D-3295: - `getpos_getvalids_selection`: module-local `function getpos_getvalids_selection(sel, validf)` in C order (guard + sel.wid/sel.hei scans + `selection Named: - `getpos_getvalids_selection`: none in-body — whole C body live (`typeof validf` guard is
- D-3294: - `whichrng`: added `const rnglist` table (CORE/DISP entries, C :26–29 order + cites) + module-local `function whichrng(fn)` in C order (`===` identit Named: - `whichrng`: no live JS caller (sole C caller split into both-streams `initRng`); module-
- D-3293: added module-local `function nomerge_exception` (C staticfn; same-file `is_mines_prize`/`is_soko_prize` live, C order, boolean return); `obj_nexto` nu Named: - `nomerge_exception`: caller insane_obj_bits unported by design (wizard sanity debug path
- D-3292: added module-local `async function vamp_shift` (C staticfn; async because JS newcham may await via pline→more→nhgetch), C order, C int 1/0 at the retu Named: - `vamp_shift`: none in-body — whole C body live (`display_nhwindow(WIN_MESSAGE, FALSE)` t
- D-3291: added module-local `async function dropp(obj)` (C staticfn; async because dropx is async in JS) iterating `game.invent` (hero-invent array idiom, cf.  Named: - `dropp`: none in-body — whole C body live.
- D-3290: ported `swallow_to_glyph` whole in C order (module-local, C staticfn; `what_mon` same-file canonical; bad-loc arm keeps `l = S_sw_br` with the report  Named: - `swallow_to_glyph`: impossible-report text stays a cite (async-only in JS; arm unreachab
<!-- landmarks:end -->
