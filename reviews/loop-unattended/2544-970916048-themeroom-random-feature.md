# Review 2544 — 970916048 — themeroom random-feature contents

Metadata: SHA `9709160485e02fd0750a336606f85c94b936363a`, D-3668,
4 owner-null step-0 RNG cliffs via `themerms.lua` Random-feature
contents. js diff +39/−3 in `js/mklev.js` (new
`themeroom_random_feature_contents` + dispatch arm); + focused test
`scripts/themeroom-random-feature.test.mjs`.

## Intent vs deliverable

Promise: 4 sessions diverged at step 0 with C `rn2(5) @
shuffle(nhlib.lua:19)` vs JS `rnd_rect` — the D-1836 omission (no
arm for the 'Random dungeon feature' pick) skipped the feature
shuffle. Port the contents closure: shuffle {C,L,I,P,T}, set the
room center. Diff does exactly that; nothing bundled.

## Inventory

- `themeroom_random_feature_contents(croom)` (`js/mklev.js:31589`):
  feature list → `nhlib_shuffle` → `l_push_mkroom_table` center →
  `isok` → `sel_set_ter(…, SET_LIT_NOCHANGE)`.
- Dispatch arm (`:32611`) + omission comment retired.
- C: `dat/themerms.lua:446–457`, `dat/nhlib.lua:17–22`,
  `sp_lev.c` lspo_terrain `:4978–5038`, `nhlua.c` char2typ.
- Helper class: C-calque on live same-file callees (no new edge).

## C ↔ JS fidelity

- Lua `:446–457` (direct read): wid/hei `3+rn2(3)*2` (always odd —
  center integral ✓), inner contents = feature list + shuffle +
  `des.terrain((w-1)/2,(h-1)/2,feature[1])` ✓. JS dispatch order
  matches C exactly: wid/hei `:32560–32562` (verbatim formula) →
  `rn2(100)` build_room (`:32586`) → `create_room` (retries) →
  contents shuffle → `add_doors_to_room` ✓; the shuffle-after-room
  position matches the recorded C anatomy (shuffle follows
  create_room retries).
- Shuffle: C `for i=#list..2: j=1+rn2(i)` = draws rn2(5,4,3,2) ✓;
  JS `nhlib_shuffle` (`:32338`, direct read) identical loop/draws/
  swap ✓. List order {C,L,I,P,T}, first-pick ✓.
- char2typ (direct read): C→CLOUD, L→LAVAPOOL, I→ICE, P→POOL,
  T→TREE ✓ all five.
- lspo_terrain argc==3 (direct read): x/y integers, tlit stays
  `SET_LIT_NOCHANGE`, room-relative `get_location_coord` + isok +
  `sel_set_ter` ✓ — JS mirrors each (Pillars-idiom call shape).
- Center uses actual room dims via `l_push_mkroom_table`
  (`1+(hx-lx)` ✓), like C's `rm.width`.
- Callee closure: `nhlib_shuffle`, `l_push_mkroom_table`, `isok`,
  `sel_set_ter`, terrain constants — all live same-file.

## Hallucinations / overclaim

None. The "unverifiable by --fn" disclosure is accurate (0 blocked
on makerooms at baseline — owner-null by construction), and the
D-log carries movement via rescore rows instead of pretending
otherwise. "Provably inert" reach claim confirmed below at 881.

## Density

Cliff-phase §2b: one cliff family (4 sessions, one signature),
owner function ported whole in C order, Ledger row updated, 3
Named items all genuinely other-work. Per-function: ACCEPT.

## Verification

- Diff grep: no `FORCE`/`DIAG`/`getRngLog`/seed/coords/`fastforward`.
- Movement re-measured in two scratch worktrees (`score --ids` on
  the 4 sessions): parent code = 4× FAIL step-0 kind=rng
  owner-null, with `show` reproducing the exact claimed signature
  (`C rn2(5)=4 @ shuffle(nhlib.lua:19)` vs `JS rn2(4)=2 @
  rnd_rect`, prev `rnd(3) @ create_room(sp_lev.c:1596)`); SHA code
  = 3 PASS (94356/94042/94216) + 94391 moved 0→`do_statusline2`@44
  with RNG 4796/4796 full. Board 908→911 reproduced. No REGRESSED.
- `verify makerooms --base 970916048~1 --reach-all` on SHA code:
  vacuous-note (as disclosed) + reach **881/881 → REACH-OK**
  (stronger than the D-log's default-spread 80/80).
- Focused test on SHA code: 1/1 green.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
