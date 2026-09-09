# Review 1213 — e8c22613 — mhitm_ad_acid/dren/conf mhitu arms

Metadata: SHA `e8c22613` (D-2247). Queue row `mhitu.c` hitmu, no
corpus block. js/ mhitu.js +75/−5 (three arms + three dispatcher
cases + one const import).

## Intent vs deliverable

Subject promises the three C mhitu arms (AD_ACID/AD_DREN/AD_CONF hero
hits fell into the silent draw-free default). Diff adds exactly the
three `_u` functions plus their `AD_*` cases and retires them from
the map comment. Promise kept.

## Inventory

New: `mhitm_ad_acid_u` (:2720), `mhitm_ad_dren_u` (:2745),
`mhitm_ad_conf_u` (:2759) — all module-local per `sym.mjs`, matching
the file's sibling-`_u` convention (C dispatches them file-locally
through `mhitm_adtyping`, so local is the right shape, not a clone).
Changed: `mhitm_adtyping_u` (+3 cases), map comment (remaining arms
still named). One new import name: `M_SEEN_ACID` (const edge only).
Callee closure per arm — all LIVE: `hitmsg`, `rn2`, `pline`,
`hliquid`, `exercise`, `monstseesu`/`monstunseesu`,
`mhitm_mgc_atk_negated`, `drain_en`, `make_confused`. No STUB in a
live arm; uhitm/mhitm arms stay named in-commit.

## C ↔ JS fidelity

- acid mhitu vs `uhitm.c:2742–2786` (pasted): hitmsg always;
  `!mcan && !rn2(3)` → `Acid_resistance` (`youprop.h:61` H||E — JS
  reads both flats) harmless + seesu + zero, else burns + exercise +
  unsee with the leftover `d()` kept (no zeroing — exact); else
  zero. RNG call-for-call.
- dren mhitu vs `:2418–2442` (pasted): negated-first (draws burn even
  when negated), hitmsg, `!negated && !rn2(4)` → `drain_en(damage,
  FALSE)`, always zero after — exact. The `null` mdef is the file's
  documented hero convention (`mhitm.js:2067`: null →
  `magic_negation_you()`, ≡ C `magic_negation(&youmonst)`), shared
  with ~10 sibling call sites — not a shortcut invented here.
- conf mhitu vs `:3690–3726` (pasted): hitmsg; `!mcan && !rn2(4) &&
  !mspec_used` → `mspec_used += damage + rn2(6)`, `Confusion`
  (`youprop.h:84` ≡ HConfusion only — JS reads exactly HConfusion)
  picks the pline, `make_confused(HConfusion + damage, FALSE)`;
  damage zeroed outside the gate — exact.

## Hallucinations / overclaim

None. D-log distinguishes "in 14 stepFns but owns none" from
blocking, and labels the check vacuous.

## Density

75 insertions for three C arms (46+26+38 lines). In-band.

## Verification

Audit re-ran the corpus claim itself:

```text
verify hitmu: baseline e8c22613~1 — 0 session(s) blocked
(0 at baseline, 0 in the working scoreboard)
```

Vacuous-0-confirmed, exactly as labeled. Green 2/2 + strict ×2 +
cohort 7/7 pasted. Diff grep: no FORCE/DIAG/seed/coordinates. Rule
#2 clean (re-run here, repo-wide).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
