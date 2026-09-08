# Review 1099 — 33a49868 — dobuzz hero arm + zhitu MM-Antimagic shieldeff (D-2133)

Metadata: SHA `33a49868`, `js/zap.js` +38/−? only (one module).
Queue row `zap.c` dobuzz, 2 sessions: (1) scen-wish-Samurai-92087
step 65/288, RNG-first at `zap.c:4989` (C `d(6,50)=119 @ dobuzz` vs
JS `rn2(19) @ exercise`); C «The bolt of lightning bounces! ... hits
you!--More--» vs JS without `--More--`. (2) scen-wish-Wizard-92048
step 37/116, screen-first at `zap.c:4964`, identical toplines, one
cell row 18 col 33 C `@` vs JS beam remnant — JS never repainted
after the MM hit. No prior review claimed closed.

## Intent vs deliverable

Subject promises: JS omitted lightning `flashburn(d(nd,50))` and the
zhitu MM-Antimagic `shieldeff`. Diff actually adds: dobuzz hero-arm
reflect/non-reflect/miss/lightning/tail lines, the zhitu MM-Antimagic
arm (renaming unused `_sx/_sy` to used `sx/sy`), and three import
extensions. Promise matches diff.

## Inventory

Changed JS: `dobuzz` hero-hit arm, `zhitu` ZT_MAGIC_MISSILE arm.
Callees, all LIVE: `monstseesu`/`monstunseesu` (mondata.js:622 sync,
hoisted; `--can js/zap.js js/mondata.js` → ALREADY statically
imports, no new edge), `shieldeff` (display.js:4411 async, awaited),
`flashburn` (same-file zap.js:4201 async), `stop_occupation`
(pre-existing hack.js edge, zap.js:250), `body_part` (pre-existing
polyself.js edge, zap.js:293), `ARM`/`M_SEEN_MAGR`/`M_SEEN_REFL`
(const.js edge extension). `Your` (zap.js:852) is a pre-existing
same-file clone, untouched. No stub, no no-op; `imports.mjs
--rulecheck` clean at HEAD.

## C ↔ JS fidelity

`csym.mjs dobuzz` has no body entry (declaration only in
extern.h:4008), so audited against the D-log-cited range directly.
C `zap.c:4963–4991`: reflect path `monstseesu(M_SEEN_REFL)` → negate
→ `shieldeff(sx,sy)` → `gas_hit=FALSE` — JS identical, including
monstseesu *before* the negate. Non-reflect: `zhitu(...)` then
`monstunseesu(M_SEEN_REFL)` past the gameover guard — JS identical
(C zhitu-death is noreturn, so skipping the clear on gameover is
correct). Miss ladder `!Blind whizzes / LIGHTNING tingles` —
identical, `Your(body_part(ARM))` matches `Your("%s tingles.",
body_part(ARM))`. Tail `if LIGHTNING flashburn(d(nd,50),TRUE)` +
`stop_occupation()` + `nomul(0)` — identical and, as C, unconditional
within the arm (hit, missed, or reflected). C `zhitu :4410–4419`
read: Antimagic → shieldeff, pline, monstseesu(M_SEEN_MAGR); else
`d(nd,6)` + exercise + monstunseesu(M_SEEN_MAGR) — JS arm-identical,
including the pre-existing dam/exercise lines it anchors to.
`mon_reflects` usteed redirect stays named, justified: `sym.mjs`
confirms NOT EXPORTED (only the mhitu.js:3177 private copy), so no
import-the-export exists. FIRE/COLD shieldeff + ugolemeffects stays
named in the header.

## Hallucinations / overclaim

None. "Exact C order" verified arm-by-arm above; the D-log's
mechanism claims (Samurai missing `d(nd,50)` draws; Wizard missing
shieldeff's closing newsym repaint) follow directly from the cited
C lines. No dispatch-with-stubbed-callee: every callee added here is
live and awaited.

## Density

One C locus family (`dobuzz` hero arm + its direct `zhitu` MM callee,
which the arm calls), one JS module. Right-sized per §2b.

## Verification

D-log Verify bullet shows `verify.mjs --fn dobuzz` → hidden 1 PASS
+ 1 moved past (Samurai-92087 PASS; Wizard-92048 dobuzz@37 →
you_aggravate@88) + green 2/2 + strict ×2 + cohort 7/7.
Re-measured: `hidden-proxy.mjs verify dobuzz --base 33a49868~1` →
`1 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS`
(Samurai-92087: PASS; Wizard-92048: moved → you_aggravate at step
88, was 37). Claim true; both outcomes are forward movement, none
worse. No seed/step/coordinate reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
