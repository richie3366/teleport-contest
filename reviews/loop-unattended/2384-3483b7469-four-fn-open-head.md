# Review 2384 — 3483b7469 — mhitm_ad_blnd can_blnd + disclose quit/died + mattackm bhitpos + mimic chest (D-3443)

- SHA: `3483b7469` — "Open head: mhitm_ad_blnd live can_blnd + disclose quit/died + mattackm bhitpos + mimic trapped-chest (D-3443)."
- js/: `js/mhitm.js` (+17/−14), `js/mhitu.js` (+7/−29), `js/uhitm.js` (+42/−16), `js/end.js` (+2/−1). Ledger: mhitm_ad_blnd split; disclose + that_is_a_mimic ported; mattackm partial.
- Method: full C↔JS on all four (≤10-function SHA); all 10 JS mattackm call sites stamp-checked against C; all 5 NO-MOVEMENT triages independently verified; re-measure verify on all four.

## Intent vs deliverable

Subject promises (a) mhitm/mhitu AD_BLND arms → live can_blnd with both subsets deleted, (b) disclose possessions quit/died, (c) mattackm bhitpos read + the missing steed stamp, (d) mimic trapped-chest disjunct — plus 5 disclosed NO-MOVEMENTs with per-session triage. The diff delivers all four code changes (two deletions, one read fix, one new stamp, one disjunct, import-name additions only). No new helpers or stubs. Diff grep: no FORCE/DIAG/getRngLog/fastforward/coords/seeds.

## Inventory

| JS function | File:line | C locus | Change |
|---|---|---|---|
| `mhitm_ad_blnd` | mhitm.js:861–864 (mhitm) + mhitu.js:729–735 (`_u`) | uhitm.c:2967/:2980/:2988 gates | live can_blnd at both; 14/17-line subsets deleted |
| `disclose` | js/end.js:814–817 | end.c:629–630 (possessions query) | hardcoded 'died' → quit/died ternary |
| `mattackm` | mhitm.js:6259–6266 + mhitu.js:3884–3890 | mhitm.c:379 read; stamps incl. mhitu.c:545 | bhitpos read + missing steed stamp added |
| `that_is_a_mimic` | uhitm.js:4550–4574 | uhitm.c:6228–6230 disjunct | trapped-chest cmap disjunct in M_AP_OBJECT arm |
| imports | uhitm.js:44 | — | glyph_is_cmap/glyph_to_cmap added to existing display block |

mhitu.js:1650 `gulpmu_can_blnd` is the distinct queued R3 subset — untouched, correctly out of scope. Diff grep: no FORCE/DIAG/getRngLog/fastforward/coords/seeds.

## C ↔ JS fidelity

**mhitm_ad_blnd — C `uhitm.c:2958–3012`.** All three C arms call `can_blnd(magr, mdef, aatyp, NULL)` (:2967/:2980/:2988); JS now does at all three sites (uhitm arm pre-existing :850). Deleted subsets were strictly weaker (mm: WEAP/SPIT/NONE+null TRUE vs C FALSE, resists_blnd_mm vs resists_blnd; u: no light-attack/ENGL/CLAW-visor/raven/perma-blind). `sym.mjs can_blnd` → `js/uhitm.js:359 sync`; mhitm.js:159 + mhitu.js:85 import names confirmed present (no new edges). The resists_blnd_mm/gulpmu_can_blnd remainders are separate queued rows (R2/R3), correctly out of scope. Confirm.

**disclose — C `end.c:629–630`.** `(how == QUIT) ? "quit" : "died"` — JS identical. Confirm.

**mattackm — C `mhitm.c:379` + 11 call sites.** The read now matches C exactly. Stamp audit (this SHA newly makes stamps load-bearing — every JS `mattackm(` call site grepped, each stamp read):

| C site | C stamp | JS call | JS stamp | Match |
|---|---|---|---|---|
| dogmove.c:923 | mtmp sq, FALSE (:921) | dogmove.js:1260 | mtmp sq, false | exact (odd aggressor-square stamp matched verbatim) |
| dogmove.c:946 | mtmp sq, FALSE (:944) | dogmove.js:1273 | mtmp sq, false | exact |
| dogmove.c:1151 | nx,ny + notonhead (:1149) | dogmove.js:1453 | nx,ny + notonhead expr | exact |
| dogmove.c:1165 | mtmp sq, FALSE (:1163) | dogmove.js:1468 | mtmp sq, false | exact |
| mhitm.c:143 fightm | mon sq (:141) | mhitm.js:6532 | mon sq | exact |
| mhitm.c:164 fightm | mtmp sq (:162) | mhitm.js:6550 | mtmp sq | exact |
| monmove.c:2097 | x,y + notonhead (:2094) | monmove.js:2006 | x,y + notonhead expr | exact |
| monmove.c:2111 | mtmp sq (:2108) | monmove.js:2027 | mtmp sq | exact |
| mhitu.c:537 | "already set" (:459 hero) | mhitu.js:3879 | targeting stamp u.ux,u.uy | exact |
| mhitu.c:547 | mtmp sq (:545–546) **new** | mhitu.js:3891 | mtmp sq + notonhead=false | exact |

C writes bhitpos nowhere inside the attack loop (grepped mhitm.c/uhitm.c/zap.c — reads only) — neither does JS. The 11th C site (monmove.c:1794 covetous, stamped :1792–1793) has no JS mattackm call — pre-existing caller gap, untouched by this diff, not a regression. Precedence check: `game.bhitpos?.x | 0` parses as `(…?.x) | 0`; undefined → 0 ≡ C zero-init. Confirm.

**that_is_a_mimic — C `uhitm.c:6201–6276` (full body read).** New disjunct ≡ :6228–6230 (shown cmap + S_trapped_chest → furniture wording); S_TRAPPED_CHEST=73 ≡ defsym.h:182; live `glyph_is_cmap`/`glyph_to_cmap` (display.js:905/:759 sync). Rest of body verified: Blind arm, monster arm, minvis/what= selection, omit_wait skip, seemimic — all match; C has no hallu arm (D-log claim TRUE; the JS doc "Named: hallu glyphs" is stale notes, not a C arm). The ap-first (vs C glyph-first) dispatch predates this SHA (D-1543 model) and agrees wherever shown-type == ap-type; the disjunct closes C's one named exception. `ported` stands. Confirm.

**Ledger defect (the debt):** mattackm's row carries mhitm_ad_blnd's Named line (`- \`mhitm_ad_blnd\`: none — whole ...`, verified at HEAD via `ledger.mjs show`) — the finish first-line paste again (D-3443's finish; the other three rows verified clean: disclose/mimic sole omits shipped → ported correct; mhitm_ad_blnd split correct). Status `partial` is right; only the omit text is wrong. Repair already queued as live Must-fix row 3 (mattackm 1-row repair, exact restore text) — **covered, not re-queued** (review 2377 precedent: "covered by 2376.1, not re-queued" → WITH-DEBT). Repair is GO: restore text = D-3443 Named mattackm line, and I re-verified the arms still absent (JS :6233 generic-Suddenly-only vs C :332–349 — the code comment's "Unaware absent" is stale, Unaware() live, as the queue row notes; cosmetic, for the repair iter).

## Hallucinations / overclaim

None. "8 C sites → 8 JS sites" undercounts (11 C / 10 JS — monmove pair missed) but every unstated site stamps correctly, so the conclusion holds; the covetous caller gap predates the diff.

## Density

≤10-function SHA, whole Method per function. Verdict per function:

| Function | Verdict |
|---|---|
| mhitm_ad_blnd | whole ✓ (3/3 arms on live can_blnd; R2/R3 subsets separately queued) |
| disclose | whole ✓ (sole omit shipped) |
| mattackm | whole modulo named + queued R1 notice arms ✓ (bhitpos exact, 10/10 stamps) |
| that_is_a_mimic | whole ✓ (disjunct + full-body check) |

Left open none. Not a batch commit (Open-head iteration), §10.17 batch rules N/A. Each function has its Ledger entry and its Verify line. The SHA verdict is WITH-DEBT solely on the mattackm ledger paste (covered, below) — code 4/4 exact.

## Verification

Re-measured (`hidden-proxy.mjs verify mhitm_ad_blnd,disclose,mattackm,that_is_a_mimic --base 3483b7469~1 --reach-all`, one call):

| Function | Blocked at parent | Reach line |
|---|---|---|
| mhitm_ad_blnd | 0 (vacuous) | smoke 24/24 REACH-OK |
| disclose | 3 (unchanged, not worse) | smoke 24/24 REACH-OK |
| mattackm | 1 (unchanged, not worse) | reach 229/229 REACH-OK |
| that_is_a_mimic | 1 (unchanged, not worse) | smoke 24/24 REACH-OK |

0 regressed — matches the D-log line-for-line. All 5 triages independently verified, not trusted:

- disclose ×3 (Priest-92235 s106, Priest-92179 s102, Tourist-92067 s226): byte-identical C/J toplines at later conduct/overview queries — the shipped possessions arm passes identically and the divergence is downstream (Priest-92179 is the parked disclose SYMPTOM per NOTES).
- mattackm ×1 (Archeologist-94276 s246): C "You notice the garter snake" vs J "Suddenly, you notice a garter snake" — exactly the named last_hider omit (C :347–348 `You("notice…")` vs the generic Suddenly arm), i.e. queued refill R1.
- mimic ×1 (Healer-92189 s89): C "A strange object appears next to you." vs J "A green gem appears next to you." — C makemon.c:1486–1499's appear message via mhidden_description, never that_is_a_mimic's "That X actually is…" reveal format — misattributed owner, TRUE.

## Actionable C-wrongs

None requiring a new Must-fix line (the one defect is covered):

1. `mattackm` ledger row (D-3443 paste of mhitm_ad_blnd's Named line) — repair queued (Must-fix row 3, restore text verified GO above). Not re-queued to avoid a double repair line.

Verdict: **ACCEPT-WITH-DEBT**
