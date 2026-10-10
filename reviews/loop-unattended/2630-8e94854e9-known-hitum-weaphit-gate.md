# Review 2630 — 8e94854e9 — known_hitum weaphit gate (D-3764)

Metadata. SHA `8e94854e9` (2026-10-10), D-3764, parent
`1311dbb62` (HEAD). js diff: `js/uhitm.js` +3/−1 (one
predicate + comment) +
`scripts/known-hitum-weaphit-gate.test.mjs` (new, 2
its). Ledger: `known_hitum` ported (D-3764 appended;
dothrow.c.jsonl per stat — the fn lives in uhitm.c but
the row file is the loop's existing placement).
Works its HEAD's cliffs head (`dothrow.c` thitmonst, 1
blocked: 95312 — verified head of the parent queue
@4b1f3e45b).

## Intent vs deliverable

Promise (subject + D-log): 95312@1040 kind=screen —
`#conduct` «You have hit with a wielded weapon 17
times.» (C) vs «…18 times.» (JS). RNG fully matched,
so exactly one extra `uconduct.weaphit++` in JS.
Temp-trace (env-gated, removed): exactly one gate
misfire in all 1515 steps — a melee hit with a wielded
BRASS_LANTERN (otyp 226, TOOL_CLASS, oc_skill 0 =
P_NONE). The old gate (`oclass === WEAPON_CLASS ||
oc_skill != null`) misfires because P_NONE (0) is !=
null; C's gate is `WEAPON_CLASS || is_weptool`.
Replace with the live export.

Diff actually adds exactly the predicate swap. Promise
and diff match. No import change (already imported).

## Inventory

Changed JS (1 gate):

- known_hitum weaphit gate — `js/uhitm.js:3122–3124`
  (`weapon && (weapon.oclass === WEAPON_CLASS ||
  is_weptool(weapon))`).
  C: `uhitm.c:616` (`if (weapon && (weapon->oclass ==
  WEAPON_CLASS || is_weptool(weapon)))
  u.uconduct.weaphit++;` — body read, with the
  oldhp/oldweaphit context matching JS).

## C ↔ JS fidelity

**Gate character-exact.** JS now mirrors C `:616`
token-for-token. The callee `is_weptool`
(`js/wield.js:116`, exported, pre-existing import at
`js/uhitm.js:53`) implements C `obj.h:249–250`
(`oclass == TOOL_CLASS && oc_skill != P_NONE` — macro
read), plus a 5-name fallback (PICK_AXE,
GRAPPLING_HOOK, UNICORN_HORN, AKLYS, BULLWHIP) that
only fires when JS object data lacks oc_skill — all
five are genuine C weptools, so the fallback agrees
with C wherever data is complete and never fires for
the lantern (BRASS_LANTERN not in the list,
oc_skill 0 = P_NONE → false). The old `oc_skill !=
null` arm had no C counterpart — a diverging CLONE
predicate, now a LIVE import. Same call shape as the
sibling gates (`:1048/:1053` read — identical
`oclass === WEAPON_CLASS || is_weptool(…)` form).

**Callees:** is_weptool (LIVE). No stubs. No symbol
deleted or re-pointed (predicate arm, not a symbol),
so no sym.mjs paste is owed.

**Test.** Exported do_attack, level-30 always-hits
hero vs grid bug: dagger control must wound +
weaphit 1, lantern must wound + weaphit 0. Re-ran:
2/2 (this audit); D-log's pre-fix 1/2 (lantern fails)
is the authentic shape.

## Hallucinations / overclaim

None. Diff grep (FORCE / DIAG / getRngLog / fastforward
/ seed / coords): zero hits. The "exactly one gate
misfire in all 1515 steps" measurement explains the
off-by-one exactly (17 vs 18); the RNG-fully-matched
premise makes the event-stream inference sound.

## Density

Cliff-phase §2b: parent head thitmonst (1 blocked,
RNG lost 33985); this commit ships the writer
(known_hitum's weaphit gate — owner already whole per
D-2804, read once) with 1 moved (815→1492; the D-log
honestly splits this fix's leg as 1040 show_conduct →
1492 auto_describe, +452, RNG 72638/72638 intact).
One cliff, one C locus (`uhitm.c:616`), no bundling.
Correct gates (green/strict/cohort; full skipped with
the uhitm.js-not-shared D-3251 precedent + manual
44/44).

## Verification

D-log Verify: `verify thitmonst` 0 PASS + 1 moved
(815→1492), reach 66/66; `verify.mjs --fn
known_hitum` vacuous + 80/80 spread reach; gates +
manual full PASS.

Re-measured by this audit (`verify
thitmonst,known_hitum --base 8e94854e9~1 --reach-all`;
HEAD code, no later SHAs):

```text
verify thitmonst: 0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-sweep-Rogue-95312: moved → auto_describe at step 1492 (was 815)
reach thitmonst: 66 baseline-PASS session(s) reach it (66 run, 57.6s): 66 PASS, 0 regressed → REACH-OK
verify known_hitum: no corpus session is blocked on it at 8e94854e9~1 — a vacuous verify is NOT a corpus PASS. […]
reach known_hitum: 328 baseline-PASS session(s) reach it (328 run, 242.0s): 328 PASS, 0 regressed → REACH-OK
```

Movement matches the D-log exactly (815→1492,
auto_describe); full (non-spread) reach on
known_hitum, all 328, 0 regressed. No vacuous check
(row cited 1; that session itemized).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
