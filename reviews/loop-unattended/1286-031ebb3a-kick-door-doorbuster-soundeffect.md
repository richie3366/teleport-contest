# Review 1286 — 031ebb3a — dokick.c kick_door giant doorbuster + Soundeffect residuals (D-2320)

Metadata: SHA `031ebb3a`, D-2320, C-fidelity residuals (row cited 0 blocks). Method: `git show` full `js/` hunk (`js/dokick.js` +9/−3); C `kick_door dokick.c:909-970` (`csym.mjs` range + full body read); `sym.mjs is_giant` + `Soundeffect` (required — re-point to live imports, outputs pasted below); `imports.mjs --rulecheck` + `--can dokick.js monsters.js is_giant`; added-lines banned-pattern grep (0 hits); `hidden-proxy verify kick_door --base 031ebb3a~1` re-run.

## Intent vs deliverable

Subject promises: giant doorbuster predicate fix (old `data.is_giant` flag exists on no permonst struct — always false, so giant-poly heroes wrongly burned `rnl(35)`) + shatter/crash `Soundeffect` in C order. Diff delivers exactly that plus retiring the stale docstring omit. Promise kept.

## Inventory

- `is_giant` joins the existing `monsters.js` import; `Soundeffect` joins the existing `sndprocs.js` import; `se_kick_door_it_shatters` / `se_kick_door_it_crashes_open` via `generated/seffects_data.js` (the `trap.js:145` convention).
- `doorbuster`: `Upolyd(game.u) && is_giant(game.youmonst?.data)` (was `!!game.youmonst?.data?.is_giant`).
- Both success arms: `Soundeffect(se_*, 50)` immediately before the `pline`, with C-cite comments.

## C ↔ JS fidelity

Doorbuster vs C `:930` (`doorbuster = Upolyd && is_giant(gy.youmonst.data)`): exact, including the `||` short-circuit that skips `rnl(35)` for giants — the RNG fix is the point (giant-poly no longer burns the bust roll) ✓. `is_giant` is the live M2_GIANT predicate (`js/monsters.js:610`, `!!(mflags2 & M2_GIANT)` ≡ `mondata.h`), not a data flag ✓. Required `sym.mjs` output:

```text
is_giant         js/monsters.js:610   sync
Soundeffect      js/sndprocs.js:36   sync
```

Both LIVE, both sync (called un-awaited — correct). `--can`: ALREADY, no new edge; both joins extend existing static imports, no TDZ risk. Shatter arm vs C `:936-941` and crash arm vs C `:942-946`: `Soundeffect` before message, `exercise(A_STR,TRUE)`, `D_NODOOR`/`D_BROKEN` — order and constants exact ✓ (draw-free no-op in this build per `sndprocs.js:36`, the D-2318/D-2316/D-2315 convention — honestly disclosed, not presented as audible). No STUB in a live arm. Named omits (vision_recalc display refresh, cell-rep sync, get_iter_mons clones, kick_nondoor/SDOOR) each name an owning row or standing pattern.

RNG walk: branch order `doorbuster || rnl(35) < chance` ≡ C; `Soundeffect` draws nothing; `rn2(5)` shatter gate untouched. Stream matches C call-for-call.

Untouched surroundings: the fail arm (`feel_location` / `exercise(A_STR,TRUE)` / Thwack-vs-Whammm `rn2(3)` / `watchman_door_damage`) and the trapped-door arm (`b_trapped`, verbose gate) are byte-identical pre/post — the diff touches only the predicate line and the two success-arm sound lines, so no adjacent-arm regression is possible. `Upolyd` is a pre-existing import (`js/dokick.js:88`), not introduced here; `se_*` constants resolve through the generated-data convention whose breakage would fail the syntax gate (verify PASS syntax confirms resolution).

Operand order preserved: C `Upolyd && is_giant(gy.youmonst.data)` → JS `Upolyd(game.u) && is_giant(game.youmonst?.data)` — the `?.` only guards the JS null-hero case C cannot hit; short-circuit RNG semantics identical.

## Hallucinations / overclaim

None. Vacuous-explicit hidden note, no `--base` owed (row cited 0 — confirmed by this review's re-run), probe honesty (deleted `/tmp`, predicate check only), preflight-on-clean-tree disclosed.

## Density

+9/−3 for a predicate C-wrong + two one-line C calls — C is that small. One envelope. Good.

## Verification

D-log: preflight `verify --no-cohort` PASS on clean tree, `verify --fn kick_door` syntax/rule2/green 2/2/strict ×2/cohort 7/7 PASS with vacuous-honest hidden note, final verify after last `js/` edit. Re-measured by this review:

```text
verify kick_door: baseline 031ebb3a~1 (scoreboard at 775e5959) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
```

Matches. Added-lines grep: 0 banned-pattern hits. `imports.mjs --rulecheck`: clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
