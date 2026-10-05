# Review 2345 — 09c225bf5 — free_ebones + two stale flips

**SHA:** `09c225bf5` — "`bones.c` free_ebones mextra+EBONES free+null (D-3390)."
**Scope:** js/bones.js +15/−1 (export + import name) + 3 ledger flips (1 live, 2 stale). Single function.
**Prior reviews closed:** none.
**Addressed:** D-3446 `7d9b2864f`

## Intent vs deliverable

Promise: the whole 3-line free_ebones body at C-home plus two stale-row ledger flips (cmp_weights, worn_wield_only). Delivered exactly; both stale claims verified true below. No drift in `js/`; one stale ledger note (see Actionable 1).

## Inventory

| # | JS change | Kind | C locus (csym range) |
|---|-----------|------|----------------------|
| 1 | free_ebones js/bones.js:553 (export) | whole C body (0 callees) | bones.c:832–839 |
| 2 | EBONES import name :13 | import extension, no new edge | — |
| 3 | ledger: cmp_weights absent→ported (stale) | recording | hack.c:4485–4493 |
| 4 | ledger: worn_wield_only partial→ported (stale) | recording | invent.c:5309–5325 |

No deletion/re-point; no re-point sym owed. Zero callees (macro reader + GC). `EBONES` is the live const.js reader (:3166); the `= 0` sentinel matches dealloc_mextra's idiom (mon.js:3454) ✓.

## C ↔ JS fidelity

**free_ebones — Confirm.** C: `if (mextra && EBONES) { free(EBONES); EBONES = 0; }`. JS: `if (mtmp.mextra && EBONES(mtmp)) mtmp.mextra.ebones = 0;` — free()≡GC, sentinel≡idiom, short-circuit preserved. Callers: decl-only extern.h:260 + sfctool.c:1050 dup (unscored standalone tool) — no live callers, no wiring owed ✓ D-log accurate. No RNG. D-log cite :832–839 matches csym exactly.

**Stale flips — both Confirm.** cmp_weights: C staticfn strcmp with the wt-subtraction commented out (:4485–4493) ≡ file-local js/hack.js:4012 ✓. worn_wield_only: C `#if 1` live arm (`owornmask != 0`) ≡ js/invent.js:4395, and the `#else` (is_weptool/ring-class check) is genuinely compiled out — documented-not-ported in the JS doc, which is exactly the correct handling of compiled-out code (contrast review 2344's recover finding). The erased omit was indeed a safeq paste-error. Both notes carry proper stale evidence.

```c
/* bones.c:832–839 */ if (mtmp->mextra && EBONES(mtmp)) {
        free((genericptr_t) EBONES(mtmp)); EBONES(mtmp) = (struct ebones *) 0; }
```

## Hallucinations / overclaim

None. "None — whole C body live (0 C callees)" holds; the /tmp probe claims match the three code paths (clear, no-op ×2, idempotent).

## Density

Single-fn ship under the documented exception (CURRENT at the time: only Open-status row in bones.c; callee closure empty) + two legitimate stale flips in the same iteration — the playbook's stale-detour shape. One `Ledger:` entry for the live row; stale rows carry evidence notes. No Must-fix bundled.

## Verification

Re-measured (`verify free_ebones --base 09c225bf5~1 --reach-all`): 0 blocked + vacuous note + smoke 24/24 REACH-OK — matches the D-log, 0 regressed. D-log Verify also shows green 2/2 + strict ×2 + cohort 7/7 → VERIFY: PASS. Verbatim:

```text
smoke free_ebones: no RNG-tagged reach; fixed smoke spread (24 run, 11.2s): 24 PASS, 0 regressed → REACH-OK
``` Diff grep: no FORCE/DIAG/RNG-log/fastforward/coordinate hits. Rule #2: clean (iteration-wide run, cited in 2338).

## Actionable C-wrongs

1. **free_ebones ledger row keeps a stale "measured MISSING" note (refresh family, same as 2343.1).** The flip adds `js:["js/bones.js:free_ebones"]` + ported but keeps `note:"refresh: no JS symbol (measured MISSING)"` — self-contradictory. Fix with the planned ledger pass (now seven rows with 2333.1/2336.1/2343.1/2344.2): `ledger.mjs set free_ebones ported` with a true note (or note-clear). Docs-only; zero behavioral impact. (Sweep candidates for the same pass, pre-existing, not this SHA's: spot_checks + cinv_ansimpleoname carry the same stale note; dump_weights carries a spot_checks-bullet omit.) Source: reviews/loop-unattended/2345-09c225bf5-… (debt, not Must-fix).

Verdict: **ACCEPT-WITH-DEBT**
