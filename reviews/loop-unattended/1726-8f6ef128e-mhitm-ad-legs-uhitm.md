# Review 1726 — 8f6ef128e — mhitm_ad_legs uhitm arm + damageum caller (D-2767)

- SHA: `8f6ef128e` (`uhitm.c` mhitm_ad_legs hero-attacker arm, D-2767)
- Files: `js/uhitm.js` (+9), `js/mhitm.js` (comment-only, +4/−3), docs
- Queue row: Open (coverage THIN/PARTIAL for `mhitm_ad_legs`)
- Banned grep: 0 hits. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises the uhitm arm of `mhitm_ad_legs` and the `damageum`
caller. Diff adds `const AD_LEGS = 17` and one `damageum_adtyping`
else-if arm calling same-file `damageum_ad_phys`. The mhitm arm (D-2490)
and the mhitu arm (`mhitm_ad_legs_u`) were already live, so this was the
last missing arm of the function. Promise kept.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `damageum_adtyping` AD_LEGS arm | dispatch, C `mhitm_adtyping` row | `uhitm.c:4424–4489` uhitm arm `:4429–4439` |
| `damageum_ad_phys` | CLONE of the uhitm arm of `mhitm_ad_phys` (file-local) | `uhitm.c:3980–4200`, uhitm arm `:3988–4020` |
| `AD_LEGS` | const | `monattk.h:59` = 17 ✓ |

`sym.mjs damageum_ad_phys` → "NOT EXPORTED — 1 LOCAL CLONE(S) …
js/uhitm.js:1831"; `sym.mjs mhitm_ad_phys` → "NOT EXPORTED — 1 LOCAL
CLONE(S) … js/mhitm.js:1859". These are two per-direction halves of one
C function, both pre-existing; this commit re-uses the uhitm half and
does not add a third copy.

## C ↔ JS fidelity

C uhitm arm: `#if 0` ucancelled block (dead), then
`mhitm_ad_phys(magr, mattk, mdef, mhm); if (mhm->done) return;`. The JS
arm calls `damageum_ad_phys(mdef, mattk, mhm)`; `damageum` already
returns on `mhm.done` after the adtyping dispatch, so the trailing
`done` check is equivalent (the phys uhitm arm never sets `done`
anyway).

Verified `damageum_ad_phys` against the C hero-attacker arm branch by
branch: shade → damage 0 ✓ (the `impossible` when `!specialdmg` is
the pre-existing named gap); `+= specialdmg` ✓; AT_WEAP → 0 ✓;
KICK/CLAW/TUCH/HUGS thick-skinned → kick 0 else `(d+1)/2` truncating
✓; `udaminc > 0` add unconditionally, else add only when damage > 0
and clamp to 1 ✓. No RNG in either arm, so the hero-xan path adds no
RNG calls, as in C.

Before the fix the AD_LEGS hero attack fell through with the raw `d()`
leftover and no specialdmg/shade/AT_WEAP handling — a real
behavior gap this commit closes.

## Hallucinations / overclaim

None. The mhitm.js hunk is comments only, and they now point at the
real dispatch row.

## Density

9 behavior lines, under the ~40 floor, but the C arm is 11 lines and
the other two arms were already live; the row was effectively this arm.
Acceptable per the "unless C is that small" clause.

## Verification

Re-ran `node scripts/hidden-proxy.mjs verify mhitm_ad_legs --base
8f6ef128e~1 --reach-all`:
- `0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)`
- `reach … 13 baseline-PASS session(s) reach it (13 run, 5.4s): 13 PASS, 0 regressed → REACH-OK`

Matches the D-log (13 reach, 0 regressed).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
