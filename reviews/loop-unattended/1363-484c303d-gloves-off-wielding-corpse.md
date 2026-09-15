# Review 1363 — 484c303d — do_wear.c Gloves_off wielding_corpse pair (D-2397)

- SHA: `484c303d`, D-2397 (review-1361 Must-fix). JS files:
  `js/do_wear.js` (+38/−8), `js/polyself.js` (+1/−1),
  `js/steal.js` (+1/−1). Plus committed shape test
  `scripts/gloves-off-wielding-corpse.test.mjs` (5/5, stated).
- Prior reviews closed: 1361 (its single C-wrong is the work packet).

## Intent vs deliverable

Subject promises the C `:687/696` pair + async cascade over every C
call site. Diff delivers exactly that: capture + `on_purpose`
pre-clear, mask clear, `clear_worn`, CORPSE-gated pair (KMH comment
kept), and `await` at all five JS call sites. Promise kept in full.

## Inventory

| JS symbol | Kind | Status |
|---|---|---|
| `Gloves_off` (do_wear.js:799) | sync → async export | re-point, `sym.mjs → ASYNC — await required` |
| `wielding_corpse` call ×2 | same-file callee | LIVE, no new edge |
| 5 call sites (armoroff, do_takeoff, wornarm_destroyed, break_armor, remove_worn_item) | `await` added | all awaited, grep confirms no other caller |
| null-gloves early arm | house invention | benign (C derefs `uarmg` at `:649/651` — never null there) |

Nothing deleted, so no deletion `sym.mjs` owed beyond the re-point
above. No clone → import swaps.

## C ↔ JS fidelity

C locus: `Gloves_off` (`do_wear.c:645–702`, csym range) + all callers
(`--callers`: do_wear.c:1986/2862/3164, polyself.c:1255, steal.c:254,
steal.c:751 comment).

- Capture order exact: `gloves` + `on_purpose =
  !mon_moving && !in_use` pre-clear (C `:647–651`), mask clear, then
  `clear_worn` (≡ `setworn(NULL, W_ARMG)`), then the pair on the
  captured gloves post-clear. ✓
- Pair gates exact: `u.uwep && (otyp|0)===CORPSE`, then
  `u.twoweap && u.uswapwep && CORPSE` with KMH comment verbatim. ✓
- Caller closure complete against C: 1986 armoroff → :1429 ✓, 2862
  do_takeoff → :1906 ✓, 3164 wornarm_destroyed → :3368 ✓, polyself
  1255 → polyself.js:1102 ✓, steal 254 → steal.js:260 ✓, steal 751
  is a comment routing through `remove_worn_item` ✓. (The D-log's
  "afternmv :1373" aside matches no csym reference — harmless; C has
  no such call site.)
- Named omits legitimate: Fumbling/Power/Dexterity switch, Glib cure,
  `encumber_msg` (all pre-existing, review-scoped out). Two one-line
  residuals go unnamed in the D-log — `takeoff.cancelled_don = FALSE`
  (C `:672`) and the condtests-`botl` tail — but both are pre-existing
  (bare `clear_worn` before) and display/flag-only; map-nit, not a
  C-wrong.
- No RNG in these arms. ✓

## Hallucinations / overclaim

None. D-log states the vacuous verify explicitly, marks the live
petrify path "said here not claimed", and the null arm is disclosed
as house shape. The "every C call site" claim checks out above.

## Density

One Must-fix item + pinning test, code + map + verify. Right-sized.

## Verification

- Added-line grep `FORCE|DIAG|getRngLog|fastforward|hardcod|seed|step` → 0.
- Re-measured: `hidden-proxy verify Gloves_off --base 484c303d~1` →
  `0 session(s) blocked (0 at baseline, 0 working)`. Matches D-log.
- `imports.mjs --rulecheck` → Rule #2 clean (re-run this iter).
- D-log's green 2/2 + strict ×2 + cohort 7/7 accepted (test + gates
  quoted with the vacuous-verify caveat stated).

## Actionable C-wrongs

None. The 1361 Must-fix is fully delivered; residuals are named
pre-existing omits.

Verdict: **ACCEPT**
