# Review 2241 — 1d636ae22 — migrate light tail + set_mon_lastmove

Metadata: SHA `1d636ae22b37c066e14dbfa4a06896c98d9b894a` (D-3280,
2026-10-02). `js/teleport.js` (+tail, +light edge) and
`js/dog.js` (+staticfn mirror). Two functions:
`migrate_to_level` tail (C dog.c:886–932) +
`set_mon_lastmove` whole body (C dog.c:286–290).

Intent vs deliverable: subject promises the light tail
+ staticfn mirror. The diff appends the `:928–931`
tail in C position, adds the non-exported
set_mon_lastmove + sole-caller wiring, and sharpens
the :906 doc omit with the sync-wall proof. Delivers
what it promises; the relmon/leash arms stay named
with measured cause (wired next SHA via sync mirror
— judged there).

Inventory:

- `migrate_to_level` tail (teleport.js:2937): `if
  (emits_light(mtmp.data)) vision_recalc(0);` after
  mx=my=0. `emits_light` new light.js edge
  (post-commit `--can`: ALREADY); `vision_recalc`
  import pre-existed (:48).
- `set_mon_lastmove` (dog.js:1256): non-exported
  `mtmp.mlstmv = game.moves | 0`, C-staticfn-shaped;
  mon_catchup_elapsed_time tail (:1348) wired;
  stale `:715`/mon.c cites → `:723`/dog.c.
- No symbol deleted or re-pointed → no required
  `sym.mjs` paste; ran anyway: `emits_light`
  light.js:46 sync, `vision_recalc` vision.js:1049
  sync — both live ✓.

**C ↔ JS fidelity — `migrate_to_level` tail**: C
dog.c:928–931 sits immediately after `mtmp->mx =
mtmp->my = 0` — JS position identical, predicate
and call verbatim ✓. Callee closure: both callees
LIVE sync, no RNG (vision recalc only) ✓.
**`set_mon_lastmove`**: C body is one line
(`mlstmv = svm.moves`) — JS identical ✓; sole C
caller dog.c:723 (verified: only refs are decl :10
+ call :723) wired ✓; non-exported like C ✓.
Citation nit: D-log cites `:287–290`, csym prints
286–290 (the `staticfn void` line) — trivia.
**Named omits** (`:898–901` leash, `:906` relmon +
panics): the sync-wall evidence verified myself —
migrate_orc (:2510), stolen_booty (:2589),
fixup_special_tail (:2781) are all sync `function`s
in the level-gen chain, so sync `migrate_to_level`
cannot await async relmon/m_unleash; the replmon
precedent (sync, names the same take-off) is real
(mon.js:3722). Named, evidenced, not hidden.

Hallucinations / overclaim: none. "17 C call sites
pre-wired" counts correctly (dig + keepdogs +
mkmaze + migrate_mon + muse ×10 + shk + teleport +
wizcmds); this iter touched the callee tail only.

Density: ~32 insertions, below-80 exception
documented (rows carry the two arms; closure holds
nothing else portable — dog.c unknowns measure ok,
neighbors re-port-banned). `Ledger:
migrate_to_level partial; set_mon_lastmove ported` +
per-function Verify ✓.

Verification: D-log Verify shows VERIFY: PASS +
smoke REACH-OK ×2 + green/strict/cohort/full 44/44.
Re-measured (`hidden-proxy.mjs verify
migrate_to_level,set_mon_lastmove --base 1d636ae22~1
--reach-all`): both 0 blocked (rows cited none —
honest) + smoke 24/24 each → REACH-OK. Zero
regressed. Banned-pattern grep: clean. Rule #2 clean
(2238).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
