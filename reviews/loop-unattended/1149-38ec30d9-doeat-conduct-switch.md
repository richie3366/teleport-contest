# Review 1149 — 38ec30d9 — eat.c doeat food-class conduct switch (D-2183)

Metadata: SHA `38ec30d9`, js/ +24/−0 in `eat.js` only. D-log
D-2183. Subject promises: port the FLESH/eggs-milk `unvegan`
switch in C order — 2 show_conduct sessions PASS, row fully
resolved (other 4 rows stale/misattributed, resolved zero-diff).

Intent vs deliverable: promise matches diff. Actually adds: the
conduct block before reqtime + 5 local otyp consts + MAT_FLESH.
One C switch, one symptom (vegan vs vegetarian disclosure).

Inventory: no new/deleted functions, no import change (house
`objectNames.indexOf` const pattern). `violated_vegetarian`
(eat.js:1007, pre-existing local clone) now called from one
more site. No deleted/re-pointed symbols.

**C ↔ JS fidelity**: confirm against `eat.c:2998–3024` (+
`violated_vegetarian` `eat.c:1375–1384`).

- Gate: C `switch (oc_material) case FLESH / default` ↔ JS
  `if/else-if` — equivalent dispatch on one value.
  `MAT_FLESH = 4` verified against `objclass.h:17`. Material
  read via `game.objects` oc_material (same table the rest of
  doeat uses).
- FLESH arm: `unvegan++` both sides; non-EGG →
  `violated_vegetarian()`. C prints the Monk guilt pline
  inside (sync); JS clone returns bool and the call site
  plines — the house async convention, already used at the
  eatcorpse site (:2108). unvegetarian++/Monk-only-guilt/
  align-1 all present in the clone. Same convention, same
  outcome.
- Eggs/milk list: PANCAKE / FORTUNE_COOKIE / CREAM_PIE /
  CANDY_BAR / LUMP_OF_ROYAL_JELLY — all five, exact.
  `unvegan++` only (no vegetarian break) both sides.
- Placement: before reqtime/rotten, matching C order (diff
  context shows reqtime assignment immediately after).
- Livelog first-time lines: deferred both arms — house
  convention (`doeat_nonfood`/`eating_conducts` do the same),
  display-neutral for the conduct-menu symptom. Named in the
  D-log; correctly not Must-fix.
- Pre-existing note the D-log owns: `doeat_nonfood` still
  ignores the return (Monk guilt pline dropped there) — named,
  no corpus session reaches it.

RNG: none in this switch either side.

Hallucinations / overclaim: none. The 4 stale rows are
explained (comment-line owner `insight.c:2122`, zero-diff
resolution with per-session outcomes), not swept under the
2-PASS claim.

Density: ~24 insertions — small but this is Must-fix-adjacent
corpus work on a 27-line C switch; below the 40-line guide yet
each line is load-bearing branch order. Acceptable, barely —
noting only because §2b asks; no action.

Verification: D-log cites `verify.mjs --fn show_conduct` → 3
PASS + 3 moved + fortress conduct sessions 4/4. Re-measured
independently: `hidden-proxy.mjs verify show_conduct --base
38ec30d9~1` → baseline 6 blocked, `3 PASS, 3 moved past, 0
unchanged, 0 worse → PROGRESS` (seed0360/Rogue-92225/
Knight-92132 PASS; 92002→unstuck@52; 92112→distfleeck@96;
91117→monflee@80). Exact match. `rulecheck` clean (re-ran this
iter). No DIAG/FORCE/seed gates.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
