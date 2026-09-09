# Review 1140 — bc1f21f5 — uhitm.c mhitm_ad_ench mhitu arm (D-2174)

Metadata: SHA `bc1f21f5`, js/ +44/−2 in `mhitu.js` (+3 import
names to already-imported modules). D-log D-2174. Subject
promises: JS skipped the non-verbose MC gate (and hitmsg) before
knockback (Knight-92034 PASS; Monk-92013 residual More-only).

Intent vs deliverable: promise matches diff. Actually adds: new
file-local `mhitm_ad_ench_u` + `AD_ENCH` dispatch case + doc-list
line. One C arm wired into an existing switch — no unrelated
subsystem.

Inventory: one new function (`mhitm_ad_ench_u` — ENCH mhitu arm;
C's uhitm/mhitm arms are explicit no-ops, correctly not ported).
No deleted/re-pointed symbols. Callee closure (all LIVE, verified
via `sym.mjs`): `mhitm_mgc_atk_negated` (mhitm.js:2018, async,
awaited), `hitmsg` (mhitu.js:402, async, awaited), `some_armor`
(do_wear.js:2488, sync), `drain_item` (zap.js:5096, async,
awaited), `Yobjnam2` (objnam.js:2514, sync; its 2 clones in
sit.js/wield.js untouched, reuse-not-dedupe). No STUB, no new
edge (`--can` ALREADY ×3 per D-log; import lines confirm same-
module name additions only).

**C ↔ JS fidelity**: confirm against pinned C `uhitm.c:3603–3644`
(read at HEAD). Branch order exact: non-verbose gate
`(magr, mdef, FALSE)` first → unconditional `hitmsg` → `if
(!negated)`: `some_armor(mdef)` else `rn2(5)` ring switch
(0 break / 1 uright / 2 uleft / 3 uamul / 4 ublindf) → `if (obj
&& drain_item(obj, FALSE))` → `pline("%s less effective.",
Yobjnam2(obj, "seem"))`. JS mirrors every line including the
`void mhm` UNUSED idiom and the C comment quotes. RNG
call-for-call: `rn2(10)` in the gate, `rn2(5)` only on the
no-armor path — the two draws whose absence flipped the
`study_book` sleep outcome. One adaptation checked:
JS passes `null` (not youmonst) as gate mdef — the house
hero-defender idiom (`mhitm.js:2022–2024`: null → you; and
non-verbose, so no message path reads mdef). `some_armor(game.
youmonst)` ≡ C `some_armor(mdef)` since mdef is youmonst in the
mhitu arm. Both faithful.

Hallucinations / overclaim: none. D-log marks the row partial
and leaves it Open (Monk residual honestly undisplaced at commit
time); the banked C-side dice for step 79 + falsifier name a
display-control writer, never a More hack. No PASS-by-vacuous-
verify: the cited row blocked 2 sessions.

Density: ~50 insertions; C mhitu arm is 30 lines — density
exception allowed (C that small), and the dispatch wiring
requires the case + doc line.

Verification: D-log cites `verify.mjs --fn mhitm_mgc_atk_negated`
→ 1 PASS + 1 unchanged, green 2/2, strict ×2, cohort 7/7.
Re-measured independently: `hidden-proxy.mjs verify
mhitm_mgc_atk_negated --base bc1f21f5~1` → baseline 2 blocked,
`1 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS`
(Knight-92034 PASS — independently confirmed fully PASS at HEAD
in review 1139; Monk-92013 79→121 mcast_disappear, moved by the
later D-2175 fumble port, not this SHA — the D-log's "unchanged"
was true at commit time). Claim reproduced, residual tracked.
`rulecheck` clean. No DIAG/FORCE/seed gates.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
