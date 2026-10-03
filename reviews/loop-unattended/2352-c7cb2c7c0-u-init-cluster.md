# Review 2352 — c7cb2c7c0 — u_init pauper gates + init gaps (6 fns)

**SHA:** `c7cb2c7c0` — "u_init.c pauper gates + init gaps (6-function cluster) (D-3397)."
**Scope:** js/u_init.js +48/−8 (6 arms, 3 import touches). Six functions, one C file. Per-function blocks below.
**Prior reviews closed:** none.

## Intent vs deliverable

Promise: head row `knows_object` pauper gate + five same-file partial arms (class gate; misc ×4; adjust ×2; shield ×2; attrs gold), each in C order with citations, plus the cohort-caught female-coercion fix. Delivered exactly. No drift.

## Inventory (per function)

| Fn | JS change | Kind | C locus (csym/cited range) |
|---|---|---|---|
| knows_object | gate `:1285–1287` + param rename | missing arm | u_init.c:575–581 |
| knows_class | gate `:1296–1299` | missing arm | u_init.c:586–629 (gate :591) |
| u_init_misc | female/moved/blind/rank arms | 4 missing arms | u_init.c:944–1036 |
| ini_inv_adjust_obj | opoisoned clear + trotyp marker key | missing arm + key fix | u_init.c:1208–1250 |
| ini_inv_use_obj | shield bimanual gate + set_twoweap | 2 missing arms | u_init.c:1254–1298 |
| u_init_inventory_attrs | `umoney0 += hidden_gold(true)` | missing arm | u_init.c:1373–1393 (:1388) |
| imports | set_twoweap→wield edge; A_CHAOTIC→const; max_rank_sz→botl; hidden_gold→vault | 1 const + 3 symbol extensions | — |

No deletion/re-point; no re-point sym owed. Callee sym: `discover_object` live ✓; `set_twoweap wield.js:1172 sync` ✓; `max_rank_sz botl.js:2280 sync` ✓; `hidden_gold vault.js:95 sync` ✓; `bimanual` local :1269 (pre-existing, also :1394) ✓; `otypByName` local :108 ✓; A_CHAOTIC/FROMOUTSIDE/NON_PM imports ✓. `imports.mjs --can` on both "new" edges returns ALREADY (file edges pre-existed — symbol extensions only, safer than the D-log's "new edges" phrasing).

## C ↔ JS fidelity (per function)

**knows_object — Confirm.** C `:577` `if (u.uroleplay.pauper && !override_pauper) return;` ≡ JS verbatim ✓. Caller audit: 40 C refs = decl + comment + **38 calls** — D-log's "38" exact (queue row said 39, corrected here). Both TRUE overrides pass true in JS (:1636 POT_WATER, :2117 preknown — verified); FALSE/omitted sites keep the gate ✓. Non-pauper behavior identical; paupers newly gated ✓.

**knows_class — Confirm.** C `:591` unconditional `if (pauper) return;` (no override param) ≡ JS ✓. 11/11 call sites confirmed by grep (:1576–1716, matching the D-log's pair/singleton map) ✓. Walk pre-existing, untouched.

**u_init_misc — Confirm.** `:949 female` ≡ `!!initgend` (C boolean assignment; the cohort incident — bare 0 misread by allmain `!== false` — honestly disclosed, coerced, re-greened ✓). `:987–989` ≡ `false/0/NON_PM` ✓. `:1027–1028 blind` ≡ `(HBlinded\|\|0)\|FROMOUTSIDE` ✓. `:1033 max_rank_sz()` pure (string measuring, no RNG — verified body) ✓. Order nit (unobservable): C runs spl_book :1004 *before* blind :1027; JS runs blind then `init_spl_book()` — swapped independent pure writes, zero interaction. Not Actionable (churn, no observable difference).

**ini_inv_adjust_obj — Confirm.** `:1225` opoisoned clear ≡ JS (position after cursed, before quan ✓). `:1235` trotyp key: JS `typeof` idiom matches the ini_inv :1481 precedent (kit entries hold `trotyp: () => …` — verified :115–120), `otypByName('MAGIC_MARKER')` resolves (objectNames ✓), `spe < 96` + `rn2(4)` preserved — only the key moved from post-substitution otyp to kit trotyp, toward C ✓. RNG call-for-call (same single rn2(4)).

**ini_inv_use_obj — Confirm.** `:1263` shield triple-gate ≡ JS ✓; `:1268 set_twoweap(FALSE)` ≡ `set_twoweap(false)` ✓ (academic per C's own comment, kept for fidelity). No RNG.

**u_init_inventory_attrs — Confirm.** `:1388` ≡ `game.u.umoney0 += hidden_gold(true);` in C position (after ini_inv(Money), before init_attr) ✓. Callee RNG-audited: `hidden_gold` + `contained_gold` are pure inventory scans (no rn2/rnd — verified bodies), so the init keystream is untouched — consistent with full 44/44 holding.

## Hallucinations / overclaim

None. "38 live call sites", "ALREADY/SAFE edges" (actually ALREADY — safer), "80/707 + 80/115 spreads" (my --reach-all ran the *full* 707 + 115 spreads: all PASS, stronger), and the cohort incident narrative all check out. "No tests/ dir" justification for fortress-only verification is accurate.

## Density

Six whole functions (each: gate/arm + live callees + wired callers), one C file, single js/ file, +48/−8 — legitimate §2b cluster (head + same-file partials; no Must-fix bundled). One `Ledger:` entry per function (6 flips to ported; residuals carried as audit-accepted Named notes — spot-verified the init_uhunger inline :2005–2006 vs C :1002). Per-function verdicts: knows_object ACCEPT · knows_class ACCEPT · u_init_misc ACCEPT · ini_inv_adjust_obj ACCEPT · ini_inv_use_obj ACCEPT · u_init_inventory_attrs ACCEPT.

## Verification

Re-measured (`verify <all six> --base c7cb2c7c0~1 --reach-all`): 0 blocked ×6 + `reach u_init_misc: 707 run, 707 PASS, 0 regressed → REACH-OK` + `reach ini_inv_adjust_obj: 115 run, 115 PASS, 0 regressed → REACH-OK` + 24/24 smokes ×4 — matches or exceeds the D-log (full spreads vs its 80-spreads). D-log shows green/strict/cohort/full-44-forced gates. Diff grep: no FORCE/DIAG/RNG-log/fastforward/seed/coordinate hits. Rule #2: clean (iteration-wide run). u_init.js loads clean (import graph intact).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
