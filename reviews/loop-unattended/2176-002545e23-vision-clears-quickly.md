# Review 2176 — 002545e23 — vision_clears "quickly" text

SHA `002545e23`, D-3216; 2026-10-01; 10 js files (+12/−12, text-only).
Must-fix closing review 2174's queued item (blnd "quickly" family).

**Addressed:** — (Must-fix fix; no new item)

## Metadata

- Subject: "vision_clears \"quickly\" text (review 2174: 12 literals +
  VISION_CLEARS const) (D-3216)".
- Promises: 12 literals → 'Your vision quickly clears.', VISION_CLEARS
  const fixed, comment cites corrected idiom, zero new edges, 13 C sites
  = 13 JS emitters verified by upstream grep both sides.

## Intent vs deliverable

Kept exactly. Pure string-value fix, no control-flow change, no new
imports, no caller touched.

## Inventory — mhitm_ad_blnd (text family)

12 one-line literal edits (`'Your vision clears.'` →
`'Your vision quickly clears.'`) in detect/dothrow/eat/engrave/mcastu/
mhitu×4/mthrowu/potion/zap + `VISION_CLEARS` const (trap.js:537) +
mhitu.js:761 comment. No new/changed functions, no deleted symbols —
no `sym.mjs` output required (nothing deleted or re-pointed).

## C ↔ JS fidelity — mhitm_ad_blnd

C value re-verified: `decl.c:49` reads `"vision quickly clears."`
(10th positional in `c_common_strings`, struct order hack.h:267–272
as review 2174 counted). `Your1(vision_clears)` ≡
`Your("%s",·)` (hack.h:1027) + that string ⇒ C emits "Your vision
quickly clears." Census on current tree:

- `grep -rn "Your vision clears" js/` → empty (0 lines) ✓
- `grep -rn "quickly clears" js/` → 13 code emitters + 1 comment
  (mhitu.js:760) ✓ — exactly the 13 sites review 2174 named.

Guards untouched (`!Blind()`, `!was_blinded && !Blind()`,
`!Blind_props()` preserved per-site). No RNG in the C arms; none
added. Verdict on the function: ACCEPT.

Diff grep: 0 FORCE/DIAG/getRngLog/fastforward hits. Rule #2 clean
(iteration-wide rulecheck: "no bare/node specifiers or fs calls").

## Hallucinations / overclaim

None. "13 C sites = 13 JS emitters, verified by upstream grep both
sides" checks out; the trap.js:5082 composition claim is unchanged
C-order code, const value now correct.

## Density

Must-fix ships alone per §2b (§2b: "Must-fix stays one item, alone").
~12 insertions of text fix — below the 80-line density floor but a
Must-fix, which is exempt by rule.

- Ledger: mhitm_ad_blnd split — ACCEPT (text-exact).

## Verification

Re-measured (current tree incl. this SHA):

```text
verify mhitm_ad_blnd: baseline 002545e23~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke mhitm_ad_blnd: no RNG-tagged reach; fixed smoke spread (24 run, 10.9s): 24 PASS, 0 regressed → REACH-OK
```

Matches the D-log (vacuous note stated + REACH-OK, `--full` PASS).
No REGRESSED session. The text C-wrong is corpus-invisible
(Eyes-gated message), so the grep census above is the evidence.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
