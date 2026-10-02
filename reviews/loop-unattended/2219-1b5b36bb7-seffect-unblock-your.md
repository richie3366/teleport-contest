# Review 2219 — 1b5b36bb7 — seffect Rogue unblock + Your declare

Metadata: SHA `1b5b36bb74f5efc942fa682941d65164be31763a` (D-3258, 2026-10-02).
js/ delta ~10 lines in `js/read.js` + `scripts/seffect-magic-mapping.test.mjs`
(2/2, re-run green) + 12 ledger stale-declares (docs-only).

Intent vs deliverable: subject promises "seffect_magic_mapping Rogue
blessed-scroll unblock_point + `Your` stale-declare". The diff delivers
the one-arm completion (replacing two C-counterpart-less calls) and the
ledger declares. Delivers what it promises.

Inventory:

- `seffect_magic_mapping` blessed-SDOOR arm (`js/read.js:338`): per-door
  `vision_recalc(1)` + `newsym` → `if (Is_rogue_level(u.uz))
  unblock_point(x, y);`. `unblock_point` extends the pre-existing
  vision.js import (no new edge, no `--can` needed); sync export,
  correctly un-awaited. Doc + both header omission lines retired.
- `Your`: no code — ledger stale-declare of `js/display.js:7878`.
- 11 sibling stale-declares (touch_artifact, is_pool_or_lava, Monnam,
  currency, monstseesu, an, dohide, d, reseed_random→by-design,
  skiprange→split, seffect note touch). Spot-checked three (below);
  all carry file:line evidence in the note.

**C ↔ JS fidelity**

- SDOOR arm — C `read.c:2101–2153`, sweep at :2124–2131:
  `if (typ == SDOOR) { cvt_sdoor_to_door; if (Is_rogue_level)
  unblock_point(x,y); }` — no repaint per door (do_mapping repaints).
  JS is now C-exact: same loop bounds (x 1..COLNO, y 0..ROWNO), same
  gate, same call; the two removed calls indeed have no C counterpart
  (verified by reading the arm, not by trusting the message). Rest of
  the body (nommap arms, cval window, notice_mon wrap, do_mapping)
  walked: order-exact; `pline('Your …')` in nommap arms is
  message-identical to `Your('…')`; the `u.Confusion`≈HConfusion cval
  window is pre-existing and disclosed (D-3254). No RNG in the arm.
- `Your` — C `pline.c:377–385` (YouMessage "Your " prefix + vpline):
  JS :7878 `vpline('Your '+fmt)` + the five wrappers' shared
  null/empty guard. Equivalent on all reachable inputs. Declare
  legitimate.
- Stale-declare spot-checks: `d` — C `rnd.c:175–188` computes
  n + ΣRND(x) over n draws; JS `rng.js:126` computes Σ(1+RND(x)) —
  identical value and draw count; the DEVEL impossible-guard is
  `#if`-compiled out of release as the note says. `Monnam` —
  `highc(mon_nam())`, trivially whole. Both declares hold; the other
  nine carry the same grade of evidence and none is contradicted by
  any later port in this batch.
- Callers: seffect's single C site read.c:2265 → read.js:2082
  (pre-existing). `Your`'s 229 C refs are call-site migrations owned
  by other ports; the canonical export stands.
- Banned-pattern grep on js/ hunks: clean. Rule #2 clean (2212 run).

Hallucinations / overclaim: none. Notably, this SHA corrects the
record twice: it ships the arm D-3251 prose-wrongly called "whole"
(stale in prose only — row stayed Open, no harm), and its own test
fails pre-fix inside the removed `vision_recalc` ("even throws
headless"), proving the old arm was worse than approximate.

Density (§2b): ~10 js ins + test — under the floor with the escape
clause (read.c all ok/ported; closure live-or-declared). One arm made
C-exact + 12 picker-cleaning declares. ACCEPT.

Verification: re-measured:
`verify seffect_magic_mapping,Your --base 1b5b36bb7~1 --reach-all` →
both vacuous (D-log says exactly that) + smoke 24/24 REACH-OK both, 0
regressed. Committed test re-run green (2/2) at HEAD.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
