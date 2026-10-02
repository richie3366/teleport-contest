# Review 2255 — 6f1e33d59 — whichrng dispatch + rnd.c exhaustion

Metadata: SHA `6f1e33d59ea08096cfce30f61a130958f033cd9d` (D-3294,
2026-10-02). `js/rng.js` only (+22: table +
fn). One function new whole: `whichrng` (C
rnd.c:31–40, staticfn) + `rnglist` table (C
:26–29) + 4 ledger-only rows (init_random
split; RND/rnd_on_display_rng/shuffle_int_
array stale→ported).

Intent vs deliverable: subject promises the
fn-dispatch port + file exhaustion. The diff
ships the table + canon fn; the ledger diff
marks all five rows as described. Delivers
what it promises.

Inventory:

- `const rnglist` (:31): CORE/DISP entries
  in C order, `{fn, init:false}`.
- Module-local `function whichrng(fn)`
  (:43): identity scan, index or -1. C
  staticfn → module-local ✓.
- Zero import changes; grep confirms no
  other `rnglist`/`whichrng` users (dormant
  dispatch, disclosed). No symbol deleted
  or re-pointed → ran `sym.mjs` anyway:
  shuffle_int_array rng.js:189 sync, RND
  rng.js:77 local (C staticfn ✓) — LIVE ✓.

**C ↔ JS fidelity**: `whichrng` ≡ C :31–40
(`SIZE(rnglist)` → `.length`, `==` → `===`,
-1 fallthrough) ✓. Table ≡ C :26–29 (fn
order CORE=0/DISP=1, FALSE inits); the
`rng_state` member stays in game.coreCtx/
game.dispCtx per the documented split ✓.
Hoisting verified: both table cites are
`export function` declarations (:86/:111),
so the :31 `const` evaluation cannot TDZ
✓. Sole C caller init_isaac64 :47 confirmed;
JS initRng seeds both streams unconditionally
(D-3033), so the dispatch is dormant-by-
construction — named, not wired ✓. No RNG
drawn by either addition ✓. Stale rows
spot-verified: `rnd_on_display_rng` ledger
:96 exact (I first misread it as the `rn2_`
sibling at :86 — confirmed :96); JS RND
(:77–80) ≡ C RND (:61–64, isaac64 % x) ✓.
Nit (no action): the RND ledger note cites
"C RND :62-66" where the body is :62–64 —
range wobble in a note, substance correct.

Hallucinations / overclaim: none. "No corpus
divergence — coverage rows" disclosed; the
dormant dispatch is presented as structure,
not behavior.

Density: one whole 10-line C staticfn + its
table + ledger-only exhaustion of the same
file, ≤10 fns ✓. `Ledger: whichrng ported`
+ Verify ✓; four ledger rows carry stale/
split notes with JS cites ✓.

Verification: D-log Verify pastes the
`verify.mjs --fn whichrng` tail verbatim
(hidden note + smoke 24/24 + green/strict/
cohort/full). Re-measured (`verify whichrng
--base 6f1e33d59~1 --reach-all`): `0
blocked` + vacuous note + `smoke 24 PASS, 0
regressed → REACH-OK`. Exact match; zero
REGRESSED. Banned-pattern grep: clean
(`getRngLog` appears only as the pre-existing
rng.js accessor definition, not a gate).
Rule #2 clean (iteration-wide).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
