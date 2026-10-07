# Review 2521 — aab90e6bc — m_dowear creation sync-through (D-3642)

## Metadata

- SHA: `aab90e6bc` (2026-10-08) — cliffs-head writer, D-3642
- D-entry: D-3642 (m_dowear / m_dowear_type / update_mon_extrinsics FAST arms)
- js diff: `js/worn.js` +67/−8, `js/makemon.js` comment-only (+5/−4, no code)
- Type: cliff (≤10 functions) — whole Method per function + movement re-measure

## Intent vs deliverable

Promise (subject + D-log): scen-impaired-Rogue-94310 step 245 diverges —
C's `#monster` appear message names «green slime», JS's «Angel» (both
Hallu; main RNG 5165/5165). Cause: JS `m_dowear(mtmp, true)` is
fire-forgotten from sync `makemon`, but an `await` always suspends even
on a resolved promise, so the 7 creation namings (per-slot `mon_nam` →
`rndmonnam` under Hallu) split around the caller's newsym + appear
message, shifting every later display draw. Fix: the creation path takes
no await anywhere — `m_dowear` bifurcates into a sync creation branch
(8 slots, C guard order), the two `update_mon_extrinsics` sites skip
their await on creation, and the FAST arms yield only when !silently.
Probe 245 → 260 (disclose), screens 251 → 263.

Diff actually adds: exactly that — creation branch in `m_dowear`,
`if (creation)` no-await at both extrinsics sites, `if (!silently) yield
spd` in both FAST arms, plus comments. !creation paths untouched.

## Inventory

| # | JS change | C locus | Status |
|---|-----------|---------|--------|
| 1 | `m_dowear` creation branch, 8 slots (`worn.js:1092–1121`) | `worn.c:775–795` | ports C |
| 2 | `:959`-site no-await on creation (`:1027`) | `worn.c:962` (cite says `:959` — nit) | ports C |
| 3 | `:992`-site no-await on creation (`:1057`) | `worn.c:992` | ports C |
| 4 | FAST on-arm no-yield-under-silently (`:796–807`) | `worn.c:601–607` + `:487–564` | ports C |
| 5 | FAST off-arm no-yield-under-silently (`:835–845`) | `worn.c:638–644` + `:487–564` | ports C |
| 6 | makemon comment refresh | `makemon.c:1445` | comment only |

`Ledger:` m_dowear + m_dowear_type + update_mon_extrinsics ported — consistent.

## C ↔ JS fidelity

C `m_dowear` (`worn.c:756–796`, via `csym`): entry guards
(verysmall/nohands/is_animal; mindless+creation mummy/skeleton) then 8
slots — AMUL; ARMU under `can_wear_armor && !(misc_worn_check & W_ARM)`;
ARMC under `can_wear_armor \|\| WrappingAllowed`; ARMH; ARMS under
`!MON_WEP \|\| !bimanual`; ARMG; ARMF under `!slithy && mlet != CENTAUR`;
ARM (+RACE_EXCEPTION else). The new JS creation branch reproduces all 8
guards in the same order, and is line-identical to the pre-existing
awaited path below it except for the awaits — verified by direct
comparison. Cites: the branch comment says `:775–793` but the slots run
to `:795` (the W_ARM else), and the `:959` site is really `:962`
(`:992` exact) — comment-only nits, code correct, no queue item.

Sync-through audit (the actual claim — every await on the creation path):

- `update_mon_extrinsics` returns `finish_worn_call(gen)` (`worn.js:502`),
  which runs the generator synchronously and returns a plain value unless
  a *thenable is yielded*. The generator's only two yields are the FAST
  arms — now `!silently`-gated. Its tail `update_mon_maybe_blocks` returns
  a promise only for the steed-saddle dismount — unreachable on creation
  (a newborn is never `u.usteed`, and armor slots never hold saddles).
  So on creation it executes fully sync and returns void. ✓
- `mon_adjust_speed` (`muse.js:2882`): all three awaits sit inside `if
  (give_msg && …)` with `learnwand` — matching C `worn.c:544–561`
  exactly (message + learnwand both inside the `give_msg` gate). Forced
  `in_mklev` under silently clears `give_msg` (`!in_mklev`, C `:494`);
  adjust=0 keeps it cleared (C `:505–507`). Zero awaits taken; the
  discarded promise is already resolved with effects applied. ✓
- The in_mklev restore reorder (restore-before-yield vs old
  restore-after-resume) is a no-op on the sounding path: forcing only
  happens `if (silently)`, and only the silently path changed. The old
  shape suspended with `in_mklev` forced — the leak the D-log names. ✓
- `m_dowear_type`: every remaining await is inside `if (!creation)` (wear
  plines, shine plines, visibility pline) — verified by reading the whole
  body. `curse(best)` awaits only on hero-uswapwep / studied-book /
  lamplit arms (`mkobj.js:635`), all off for fresh monster armor (nothing
  lit it yet — `begin_burn` runs after). `end_burn/begin_burn/
  artifact_light/Monnam/mon_nam/vision_recalc` all `sym.mjs`-verified
  sync. ✓

RNG: no draw added/removed — the fix only reorders existing draws back
into C's consecutive slot order. The D-log's post-fix TEMP-trace (117-draw
seg1 display sequences identical C vs JS, reverted before verify) is the
display-stream proof; main RNG 5165/5165 held throughout.

No helper added/deleted/re-pointed; no clone/stub/no-op question. The
«Untouched by design» list (makemon sync, mon_adjust_speed async,
slime_dialogue whole, disclose@260 as future cliff) is accurate —
disclose is the known parked SYMPTOM class, correctly left for the queue.

## Hallucinations / overclaim

None. «Exactly like C» is claimed for the creation path's synchrony and
slot order — both verified above against `worn.c`. The mechanism (await-
always-yields splitting namings) is JS-semantics fact, and the 117-draw
trace corroborates the lockstep rather than asserting it.

## Density

Cliff phase §10.18: one cliff (slime_dialogue row), the writer family
(`worn.c` creation path) shipped whole with all three `Ledger:` entries,
code + verify in one handoff. Owner-vs-writer correct (slime_dialogue
whole, writer = m_dowear creation). No foreign-file work (makemon
hunk is comment-only), no re-audit. Right-sized.

## Verification

D-log claims: `verify slime_dialogue: 0 PASS, 1 moved` (245 →
disclose@260, screens 251 → 263), both functions REACH-OK (smoke 24/24),
green + strict + cohort, full 44/44 (shared file changed).
`m_dowear` vacuous at baseline (writer) — stated.

Re-measured:
`node scripts/hidden-proxy.mjs verify slime_dialogue,m_dowear --base aab90e6bc~1 --reach-all`:

- `verify slime_dialogue: 0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS`
  (scen-impaired-Rogue-94310: moved → disclose at step 260, was 245)
- `smoke slime_dialogue: … 24 PASS, 0 regressed → REACH-OK`
- `verify m_dowear: no corpus session is blocked on it at aab90e6bc~1`
  (vacuous as the D-log says) + `smoke … 24 PASS → REACH-OK`

Movement claim reproduces exactly; no REGRESSED, no WORSE. Rule #2 clean
globally; diff grep for FORCE/DIAG/getRngLog/fastforward/coords: 0 hits.
No seed/step/coordinate reads. Committed focused test present
(`scripts/mdowear-creation-syncthrough.test.mjs`).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
