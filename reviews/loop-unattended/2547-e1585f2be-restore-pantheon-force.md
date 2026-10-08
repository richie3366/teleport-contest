# Review 2547 — e1585f2be — restore pantheon force delete (D-3672)

- SHA: `e1585f2be6d8e67d2ef44f88d1a4aa07d31d5602`
- Subject: next live head (D-3668 Next (2)): restore-path pantheon force burned a spurious randrole on every Priest restore — 4 welcome-back sessions → PASS, corpus RNG 100% (D-3672)
- D-entry: D-3672. Type: cliff (writer port, 1 changed function).
- Diff size: `js/save.js` +11/−10 (net: −3 code lines, comment rewrite); + test `scripts/restore-priest-pantheon.test.mjs`; ledger `restore.c` D-tag.

## Intent vs deliverable

Promise: delete the force/save/restore `pantheon = -1` triplet in
`try_restore_save` so `role_init` runs with restored flags, matching
C's `Sfi_flag :571` → `role_init() :596` order; 4 Priest
welcome-back sessions → PASS; pantheon end-value unchanged.

Diff actually does: removes `savedPantheon`/`= -1`/restore (3
lines), rewrites the comment with the `:571`/`:596` order cite.
Nothing else in `js/`.

## Inventory

| JS function | Change | C locus |
|---|---|---|
| `try_restore_save` (`js/save.js:962–985`) | −3 lines + comment | `restore.c:571` + `:596`, `role.c:2009`, `:2064–2077` |

No helpers added/deleted/re-pointed. `sym.mjs` re-point check:
not applicable.

## C ↔ JS fidelity

Order claim verified against pinned C:

- `restore.c:571`: `Sfi_flag(nhfp, &flags, "gamestate-flags");`
- `restore.c:596`: `role_init(); /* Reset the initial role … */`
- `role.c:2007–2010`: `if (flags.pantheon == -1) { /* new game */`
  gender re-check.
- `role.c:2064–2077`: `if (flags.pantheon == -1) { /* new game */`
  pantheon re-roll (`while (!roles[flags.pantheon].lgod …)
  flags.pantheon = randrole(FALSE)`).
- `role.c:284`: Priest entry `0, 0, 0, /* deities from a randomly
  chosen other role will be used */` — godless, so forcing −1
  draws `randrole` → `rn2(13)`.

JS side (`js/save.js:962–963`): `game.flags = { …newgameflags,
…(payload.flags || {}) }` runs before the `role_init()` call —
the same Sfi-then-init order as C. JS `role_init` mirrors both
`pantheon === -1` gates (`js/roles.js:1302`, `:1365`), so with
restored pantheon only the ldrgend/nemgend `rn2(100)` arms burn —
exactly what C burns on restore (same arms, same conditions).

Branch-by-branch confirm:

- **Priest restore:** before, forced −1 → re-roll loop draws
  `rn2(13)=8` (recorded divergence value); after, restored
  pantheon skips both arms. C seg1 opens with `rn2(3),rn2(2) @
  shuffle` (restore_luadata), which the committed test now pins
  (`jsAll[0] === "rn2(3)=0"`, `[1] === "rn2(2)=0"`).
- **Non-Priest:** with −1 forced, `pantheon = initrole` hits a
  role with `lgod` → loop body never runs; gender arm is
  RNG-free. Claim "drew nothing either way" holds.
- **Pantheon end-value:** identical (was restored around the call
  anyway). Claim holds.
- **Named (2)** (legacy payloads without `flags.pantheon):
  reviewed, not a C-wrong — C cannot produce this input
  (`Sfi_flag` restores the whole struct). In practice the launch
  `role_init` leaves a valid pantheon in `newgameflags`, so the
  merge keeps a valid index; no recorded session hits the gap.

## Hallucinations / overclaim

None. The verify section honestly reports `hidden note ×2`
(vacuous `--fn` on owner-null sessions) and presents the
`score --ids` rescore as the movement evidence — the D-3672
precedent it cites is itself. No FORCE/DIAG/seed reads in the
diff. Rule #2 clean (this iteration's `--rulecheck`).

## Density

Cliff phase: ships D-3668 Next (2), the next live head after the
unworkable `mon_wield_item` head — one writer (the restore-path
force), whole-arm delete, code + ledger + verify in one handoff.
Right-sized. Each sampled function verdict: `try_restore_save` —
faithful.

## Verification

D-log claim: `score --ids` on the 4 probes ALL FULL PASS
(94107 5145/5145+263/263, 94114 11465/11465+222/222, 94170
3728/3728+183/183, 94213 5673/5673+344/344); board 912→916;
REACH-OK both fns; green/strict/cohort/full 44/44.

Audit re-measure
(`hidden-proxy.mjs verify dorecover,role_init --base e1585f2be~1 --reach-all`):

```text
verify dorecover: … 0 session(s) blocked on it … → vacuous (as D-logged)
smoke dorecover: … 24 PASS, 0 regressed → REACH-OK
verify role_init: … 0 session(s) blocked on it … → vacuous (as D-logged)
reach role_init: 158 baseline-PASS … 158 PASS, 0 regressed → REACH-OK
```

Vacuous `--fn` confirmed as disclosed (owner-null class). Movement
independently confirmed from the committed board diff at this SHA:
exactly 4 `passed: false→true` flips, `kind: rng→null`, steps
166/167/233/72 — the 4 claimed sessions, 0 reversals. Current
working board still shows all 4 PASS with the exact claimed
RNG/screen totals. No REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
