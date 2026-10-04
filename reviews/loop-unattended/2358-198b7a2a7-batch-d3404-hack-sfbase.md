# Review 2358 — 198b7a2a7 — batch hack/mkroom/detect/sfbase (D-3404)

- SHA: `198b7a2a7` — "batch @e2943671c: hack/mkroom/detect/sfbase remainder (100 fns, 0 left open) (D-3404)."
- D-entry: D-3404. Diff: 10 js files, +686/−119 (sfbase 64 stubs dominate);
  ledger + journal + index + queue-archive + scoreboard.
- Manifest check: reproduced `ledger.mjs batch` in a worktree at base
  `e2943671c`: "100 function(s) in hack/mkroom/detect/sfbase — open 64 ·
  partial 17 · recheck 19" — fn set diff vs `d like '%D-3404%'` rows is
  EMPTY (MANIFEST-MATCH). No overage, nothing Left open, no Must-fix
  bundled (queue diff is Open-coverage archive+refill, not Must-fix).
- Fixed sample (19): hot-12 `mkshop food_detect trapped_chest_at
  rock_disappear_msg monster_detect moverock_core still_chewing test_move
  u_rooted swim_move_danger domove_swap_with_pet avoid_moving_on_liquid`;
  random-4 `norm_ptrs_u_conduct norm_ptrs_bill_x u_locomotion
  norm_ptrs_monst`; audited-3 `long_to_any isbig monst_to_any` (first two
  draws duped the hot set). food_detect + monster_detect pinned to SHA
  (D-3406 later); rest D-3404-most-recent.

## Intent vs deliverable

Promise: 100 manifest fns; 64 empty norm_ptrs stubs; Known_* renames;
Levitation_st/can_fog wirings; test_move TEST_TRAV fall-through; two
disclosed non-manifest cause fixes (findtravelpath arrival-from, muse
appear message).

Diff actually adds: all of that, plus u_locomotion poly arm + teleport
clone retirement, moverock Levitation_st, still_chewing livelog,
u_rooted air/water, swim Known gates, avoid-liquid inversion fix,
mhidden.getpos_help doc, stone-to-flesh soko timer, pickup_checks ×2,
Known rename ×3 files. Promise == deliverable.

`sym.mjs` on the deleted clone:

```text
u_locomotion     js/hack.js:2264   sync
```

Single live home; teleport.js local verified gone, both call sites
(teleport.c:1066/1547) use the import.

## Inventory

Bullet status | ledger JS home | C range (100 entries; `*` = omit text
corrupted by this SHA — see Actionable 2):

```text
uint_to_any/long_to_any/monst_to_any/obj_to_any | audited | js/hack.js | C hack.c:73-102
rock_disappear_msg/moverock_done | audited | js/hack.js | C hack.c:315-333
moverock_core | partial | js/hack.js | C hack.c:348-638
still_chewing | ported | js/hack.js | C hack.c:647-822
cant_squeeze_thru | ported | js/mon.js | C hack.c:953-979
test_move | partial* | js/hack.js | C hack.c:991-1255
is_valid_travelpt | ported | js/cmd.js | C hack.c:1526-1544
u_rooted | ported | js/cmd.js | C hack.c:1694-1705
notice_mons_cmp | audited | js/hack.js | C hack.c:1735-1741
u_locomotion | ported | js/hack.js:2264 | C hack.c:1817-1829
u_simple_floortyp | ported | js/hack.js | C hack.c:1833-1848
swim_move_danger | ported | js/hack.js | C hack.c:1885-1921
domove_swap_with_pet | partial* | js/hack.js:1381 | C hack.c:2098-2225
avoid_moving_on_liquid | ported | js/hack.js | C hack.c:2463-2490
avoid_trap_andor_region | ported | js/hack.js | C hack.c:2515-2582
domove_core | partial* | js/cmd.js | C hack.c:2712-2991
pickup_checks | ported | js/pickup.js | C hack.c:3788-3872
doorless_door | audited | js/hack.js | C hack.c:4063-4074
crawl_destination | ported | js/hack.js | C hack.c:4079-4101
isbig | audited | js/mklev.js:28675 local | C mkroom.c:42-48
mkshop | audited | js/mklev.js:28758 local | C mkroom.c:95-216
has_dnstairs/has_upstairs | audited | js/mklev.js | C mkroom.c:640-663
save_rooms | audited | js/mkroom.js | C mkroom.c:863-871
trapped_chest_at | audited | js/detect.js:1601 | C detect.c:139-177
food_detect | ported | js/detect.js @SHA | C detect.c:479-594
monster_detect | partial | js/detect.js @SHA | C detect.c:798-862
reveal_terrain_getglyph | partial | js/display.js | C detect.c:2167-2288
sfo_genericptr/sf_log/sfvalue_genericptr/complex_dump | audited | js/files.js | C sfbase.c:290-639
norm_ptrs_* ×64 | ported | js/sfbase.js | C sfbase.c:767-1084 (3-line empties)
```

100/100 Ledger entries; Left open none (true).

## C ↔ JS fidelity

- `mkshop` WHOLE — SHOPTYPE dispatch (backslash literal evaluates to 1
  char, verified by eval), gottype walk, light loop, `rnd(100)` pick +
  isbig clamp, rtype/topologize/needfill. RNG exact.
- `food_detect` WHOLE at SHA — counters, `(!ct||!ctu)` loop shape,
  steed sync, 3 outcomes, blessed/uedibility/beginner arms, map loops
  with per-mon break, TER_MON/newsym, messages, exercise, browse,
  redisplay, `!stale` return.
- `trapped_chest_at` WHOLE — glyph gate, TRAPPED_CHEST + Hallu rn2(20),
  floor/invent/steed/m_at chain; C's own TODO named.
- `rock_disappear_msg`/`long_to_any`/`monst_to_any`/`isbig` WHOLE
  (collapsed-handle idiom documented).
- `monster_detect` partial CORRECT at SHA — mndx worm helper (right
  idiom), wake-helpless, display_self, messages, EDetect/brownse/
  redisplay; blessed persistent-map arm named.
- `moverock_core` partial CORRECT — Levitation_st() ≡ C macro
  (verified youprop.h:240); sticky flat dead but harmless.
- `still_chewing` WHOLE (delta) — `food++` guard + thruwhat chain +
  livelog exact; genuine partial→ported transition.
- `test_move` delta WHOLE — TEST_TRAV/TRAP fall-through restructure
  verified equivalent (DO_MOVE-gated messaging per C :1092; TRAV runs
  diagonal gate then falls through; TEST_MOVE returns FALSE).
- `u_rooted` delta WHOLE modulo pre-existing nit — air/water arms
  exact; `H||E` lacks C's `!BLevitation` (blocked-in-rock corner,
  message-only, contrived: mmove==0 + levitation + rock) and keeps the
  dead sticky disjunct. Pre-existing, unwired corner — nit, noted.
- `swim_move_danger` delta WHOLE — Known_wwalking/Known_lwalking gates
  ≡ C :1901-1905; genuine partial→ported transition. BUT the entry
  guard reads never-written `u.Underwater` (pre-existing D-0357, same
  family as 2348.1) — see Actionable 1.
- `domove_swap_with_pet` body WHOLE — 6 cant-swap arms, swap, message,
  minliquid/mintrap switch, guilt `rn2(4)` — but its row omit text is
  moverock_core's (corrupted; D-log has truth) — see Actionable 2.
- `avoid_moving_on_liquid` WHOLE — inversion fix exact vs C :2476.
- `norm_ptrs_*` ×3 sampled WHOLE — C bodies are 3-line empties.
- `u_locomotion` WHOLE — capitalize + Lev/Fly/poly-locomotion exact;
  teleport clone retirement verified (no behavior change).

Non-sample spots (confirmed): findtravelpath arrival-from fix ≡ C
:1404-1406 (x/y vs tx/ty); is_valid_travelpt glyph gate ≡ C :1535-1538;
cant_squeeze_thru can_fog ≡ C :962-965; muse appear-message wiring ≡ C
makemon.c:1472-1500 order (pre-existing live callee, town-94102
evidence); stone-to-flesh soko timer; pickup_checks ×2; Known rename
mechanical. Cause fixes are faithful, disclosed, session-evidenced;
muse.c is a non-manifest file but the change is 6-line caller-wiring
(rot_corpse precedent, review 2355).

## Hallucinations / overclaim

None on code. Ledger-write defect (below) is the SHA's own: D-log prose
carries the true omits while 3 rows carry moverock_core's text.

## Density

Manifest-exact (100/100), ≤100 fns, 0 Left open, no bundled Must-fix,
per-function entries + Verify line. Code verdict all-whole; ledger
write corrupted 3 rows (audit-trail damage, truth recoverable) →
ACCEPT-WITH-DEBT.

## Verification

- Re-measured all 19 sampled fns in one call (`--base 198b7a2a7~1
  --reach-all`): moverock 3 PASS, test_move 1 PASS + 1 moved past,
  food_detect 1 moved past (6 sessions, matches D-log exactly),
  mkshop reach 64/64, rest 0-blocked + smoke 24/24 → REACH-OK. Zero
  regressed, 0 worse anywhere.
- `imports.mjs --rulecheck` → Rule #2 clean (this iteration). Diff
  grep: no FORCE/DIAG/getRngLog/seed/fastforward/coordinate gates.
- Full-44/44 + green + strict claims re-proven by the end-of-iteration
  rescore on this tree.

## Actionable C-wrongs

1. `u.Underwater` never-written alias family (pre-existing, 2348.1's
   deferred brief) — C `Underwater` ≡ `u.uinwater` (youprop.h:279)
   but 12 read sites test `u.Underwater`, which zero code port-wide
   ever writes (assign/bracket/save grep clean): js/hack.js:2320
   swim_move_danger entry guard (dead → underwater pool-danger arms
   run where C returns FALSE), js/monmove.js:1017,1452,
   js/mondata.js:1090, js/read.js:436, js/pager.js:1410,2099,2146,
   js/pickup.js:1062,1086,1965, js/apply.js:819 (+ display.js fixed in
   D-3400). Fix in one iter: flip each to `(u.uinwater|0)` (D-3400
   idiom) after verifying its C locus says Underwater + verify incl.
   full (shared files). **Addressed:** D-3414 (3a47d2089)
2. D-3404 pasted-omit ledger corruption — `test_move`,
   `domove_swap_with_pet`, `domove_core` rows carry moverock_core's
   omit text instead of their own (pre-rows + D-log C-locus hold
   truth: test_move block/cmdq/defsyms/autodig minus stale
   block_door/block_entry; swap `:2147` assert; domove_core
   displaceu/travel/CLIPPING). Fix in one iter: `ledger.mjs set` each
   row to its true omit (verify each sub-omit still unshipped) +
   re-run `hidden-proxy verify` on the three + confirm no other
   D-3404 row mislabels (D-3415 `a1eee6cb2` misfired on swap/core rows). **Addressed:** D-3419 `3043e75f2`

Verdict: **ACCEPT-WITH-DEBT**
