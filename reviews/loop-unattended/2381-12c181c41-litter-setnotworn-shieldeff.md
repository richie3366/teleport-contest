# Review 2381 — 12c181c41 — litter setnotworn fix + chest_trap shieldeff (D-3437)

- SHA: `12c181c41` — "Open head: litter setnotworn fix + chest_trap shieldeff + 8 stale audits (D-3437)."
- js/: `js/ball.js` (+10/−16), `js/trap.js` (+1/−1). Ledger: litter/chest_trap ported; impossible/Helmet_on/setnotworn/maketrap/find_misc/use_misc/pick_nasty audited.
- Method: full C↔JS on both changed functions; 3 audited declarations sampled (setnotworn, pick_nasty, Helmet_on); re-measure verify on all 9.

## Intent vs deliverable

Subject promises (a) review-2374 litter C-wrong fixed — inline slot-nulling subset replaced by the live whole `setnotworn` call; (b) chest_trap shock arm's deferred `shieldeff` wired; (c) 8 stale audits. The diff delivers exactly (a) and (b): one import extension + one live call in `litter`, one awaited call in `chest_trap`. Ledger diff confirms 2 ported + 7 audited rows (see Density for the "8" count slip).

## Inventory

| JS function | File:line | C locus | Change |
|---|---|---|---|
| `litter` | js/ball.js:180 (file-local; C `staticfn`) | ball.c:964–983, callers :1012/:1028 | −14-line subset, +`setnotworn(otmp)` at C `:980` position |
| `chest_trap` shock arm | js/trap.js:8162 | trap.c:6443–6457 (cases 8/7/6) | `// shieldeff deferred` → awaited live call |
| import | js/ball.js:22 | — | `flooreffects` → `flooreffects, setnotworn` (existing do.js edge) |

No new helpers, no clones, no stubs. Diff grep: no FORCE/DIAG/getRngLog/fastforward/coords/seeds. Ledger: litter + chest_trap re-stamped ported (both already ported; D-3437 re-certifies after the fix); 7 audited rows (impossible stays partial with the D-3420 Rule #2 omit; Helmet_on/setnotworn/maketrap/find_misc/use_misc/pick_nasty stay ported + "audited D-3437" note).

## C ↔ JS fidelity

**litter — C `nethack-c/upstream/src/ball.c:964–983`, callers `:1012`/`:1028`.** C order: nextobj walk → uball skip + `rnd(capacity)<=owt` → `canletgo(otmp,"")` → stairs pline → `setnotworn` → `freeinv` → `hitfloor(FALSE)`. JS (read at HEAD, unchanged since except this hunk) keeps loop/gate/plines and now calls the live export at exactly the C `:980` position, before `freeinv_ball`/`hitfloor`. Branch order and the single RNG call (`rnd(capacity)`) untouched. Confirm.

**setnotworn (callee) — C `worn.c:149–184` vs js/do.js:516.** Compared line-by-line:

| C | JS | Match |
|---|---|---|
| `if (!obj) return` | `if (!obj) return` | exact |
| twoweap clear (uwep/uswapwep) | `set_twoweap(false)` under same predicate | exact |
| `for (wp = worn; wp->w_mask; wp++)` | `for (const [slot, mask] of WORN_SLOTS)` | exact — both lists read: 14 slots incl. W_WEP/W_SWAPWEP/W_QUIVER/W_BALL/W_CHAIN, same order |
| cancel_doff, slot null, unworn accumulate | same three statements | exact |
| `u.uprops[p].extrinsic &= ~mask` (p = oc_oprop) | `confer_oc_oprop(obj, mask, false)` | equivalent (house extrinsic writer) |
| monstunseesu_prop, owornmask strip, artifact intrinsic, w_blocks | same four, same order | exact |
| tux (`!uarm`), botl gate, update_inventory, telepat | same tail | exact |

LIVE. (The BBlinded/BInvis/BClairvoyant sync lines mirror JS's dual uprops/B-field model; additive, pre-existing, not this diff.) The old litter subset covered only slot nulls + owornmask=0 — dropping twoweap, cancel_doff, extrinsics, artifacts, w_blocks, botl, update_inventory, telepat — so the D-log's reachability claim (wielded artifact keeps intrinsics + twoweap stuck) follows directly.

`sym.mjs` (required — subset → import re-point):
`setnotworn  js/do.js:516  sync`; `shieldeff  js/display.js:5030  ASYNC — await required`.
`imports.mjs --can ball.js do.js setnotworn` → ALREADY (extended existing edge, no TDZ). Rule #2: `imports.mjs --rulecheck` → clean across scored js/.

**chest_trap shock arm — C `trap.c:6443–6457` (cases 8/7/6) vs js/trap.js:8156–8176.** `d(4,4)` → jolt pline → Shock_resistance gate → `shieldeff(u.ux,u.uy)` (now awaited; export is async, correct) → unaffected pline → monstseesu(M_SEEN_ELEC) → dmg=0; else monstunseesu; destroy_items AD_ELEC orig_dmg (dynamic zap.js import, pre-existing cycle dodge); losehp. Exact, including the else arm the old comment sat beside.

**Audited sample (3 of 7, rule (c)):** setnotworn (full compare above — whole) plus:
- pick_nasty (C `wizard.c:537–581` vs js/makemon.js:1196): ROLL_FROM→`NASTIES[rn2(len)]`, rogue re-ROLL (`monsym_isupper`), genocided/difcap/hell→big_to_little, juvenile guard (`baby ` prefix + ` hatchling`/` pup`/` cub` suffixes via lastIndexOf) — every arm matches, RNG order preserved (re-ROLL before the filter, exactly as C).
- Helmet_on: C `staticfn` (do_wear.c:434), single caller `:1564`, both inside do_wear.c — file-local JS (do_wear.js:1307) is the correct linkage; `sym.mjs` "LOCAL CLONE" flag is a staticfn false positive (same class as learnring, verified again in this audit's seeded sample). Body carried by D-3426 + measured ok (C 62/JS 70).
- impossible correctly stays partial: the D-3420 omit (paniclog + CRASHREPORT prompt/raw_print/network) is Rule #2-unshippable, and the row text is unchanged by this SHA.

maketrap/find_misc/use_misc carried (prior-D bodies, measured ok, re-measure clean below).

## Hallucinations / overclaim

None. "Match C" claims are per-arm and the callee (`setnotworn`) is live whole, verified above — not a dispatch/callee split. The D-log's "8 stale audits" counts 7 audited Ledger names (litter/chest_trap are the 2 ported of 9 verified); trivial count slip, ledger rows themselves correct.

## Density

≤10-function SHA, whole Method per function. Verdict per function:

| Function | Kind | Verdict |
|---|---|---|
| litter | changed | whole ✓ (live callee at C `:980` position) |
| chest_trap | arm fix | shock arm exact; rest pre-ported ✓ |
| setnotworn | audited (sampled) | whole ✓ (table above) |
| pick_nasty | audited (sampled) | whole ✓ |
| Helmet_on | audited (sampled) | whole ✓ (linkage + carried body) |
| maketrap / find_misc / use_misc | audited (carried) | ✓ (measured ok, re-measure clean) |
| impossible | audited (carried) | ✓ (partial, Rule #2 omit correct) |

Left open: none. No manifest (Open-head iteration, batch empty per D-log — not a batch commit, §10.17 batch rules N/A). Each function has its Ledger entry and its Verify line.

## Verification

D-log Verify claims hidden-note ×9 + REACH-OK ×9 + green/strict/cohort + a litter 23/24 first-sweep flake re-run to 24/24. Re-measured (`hidden-proxy.mjs verify <all 9> --base 12c181c41~1 --reach-all`, one call):

| Function | Blocked at parent | Reach line |
|---|---|---|
| litter / chest_trap / impossible / Helmet_on / setnotworn / maketrap | 0 (vacuous, disclosed) | smoke 24/24 REACH-OK |
| find_misc | 0 | reach 13/13 REACH-OK |
| use_misc | 0 | reach 12/12 REACH-OK |
| pick_nasty | 0 | reach 38/38 REACH-OK |

0 regressed anywhere. Claim true. The unattributed js-throw triage ("environmental flake") is supported by 5 same-run PASSes + this clean re-run (litter 24/24 here — flake not reproduced); no Must-fix — a throw that never reproduces across 30 runs is not a §10.14 row. No queue row cited blocks for any of the 9, so the vacuous verifies are correctly presented as coverage-row notes, not corpus PASSes.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
