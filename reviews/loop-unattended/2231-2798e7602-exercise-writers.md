# Review 2231 — 2798e7602 — exercise + 2 caller writers

Metadata: SHA `2798e76028cb25454ded852eecc1b861fd30d79e` (D-3270,
2026-10-02). `js/attrib.js` (doc) + `js/timeout.js` (move) +
`js/mthrowu.js` (fallthrough) + new `scripts/exercise.test.mjs`
(unscored). Single function `exercise` + two caller-path
writers — one fidelity block per changed path below.

Intent vs deliverable: subject promises "exercise + 2 caller
writers (nh_timeout mtimedone-before-uprops order; thitu
lifesave fallthrough to A_STR)". The diff delivers both
writers plus doc-only exercise comment and a 5-it test.
Delivers what it promises.

Inventory:

- `exercise` (`js/attrib.js:214`): doc-only — C range
  :489–518 cited, both omissions named in code. Zero
  behavior change.
- `nh_timeout` (`js/timeout.js:1042`): mtimedone block moved
  up (byte-identical body) to right after sleep_dialogue,
  before the uprops `--` loop. Same file, no import changes.
- `thitu` (`js/mthrowu.js:706`): after finish_losehp_done,
  `return 1` only if gameover still set; lifesave falls
  through to the pre-existing `exercise(A_STR, false)`.
- `scripts/exercise.test.mjs` (new): 5 its pinning the draw
  envelope (INT/CHA no-draw, rn2(19), rn2(2), |AEXE|≥50
  gate, poly split). 5/5 pass (re-run).
- No symbols deleted or re-pointed; no new cross-module
  edges. `sym.mjs` spot: exercise attrib.js:214 sync ✓.

**C ↔ JS fidelity — `exercise`** (JS :214–231 vs C
attrib.c:488–518): INT/CHA guard ✓, Upolyd non-WIS guard
✓, |AEXE|<50 gate ✓, `(rn2(19) > ACURR) : -rn2(2)` ✓
exact incl. comparison-then-add shape. RNG: exactly one
draw per open-gate call, none otherwise ✓ (test-pinned).
Named omits legitimate: debugpline0/3 are EMPTY macros —
lint.h `#ifdef DEBUG` guard, DEBUG undefined in
recorder/player builds — zero-effect ✓; :516–517
encumber_msg() tail is message-only with no RNG (it can
print, but the 297-site sync fan-out cannot await pline;
named in code + D-log + `Ledger: exercise partial` —
correctly partial, not ported). The Valyrie-94041
encumber_msg Open row already tracks that writer.

**C ↔ JS fidelity — `nh_timeout` order** (C timeout.c:600–
700 walked): C runs sleep_dialogue (:639–640) →
mtimedone tick (:641) → ucreamed (:649) → dissipate
(:652–661) → ugallop (:663) → uprops loop (:668+). JS now
places the identical mtimedone body immediately after
sleep_dialogue and before the uprops loop ✓ — the Tourist
one-turn-early rehumanize cause is exactly this inversion
(uprops SLIMED :686–688 → polymon sets mtimedone, then the
misplaced tick decremented it the same turn). Remaining
dissipate-after-uprops inversion is pre-existing, disclosed
in both the code comment and the D-log, and draw-free ✓.

**C ↔ JS fidelity — `thitu` lifesave path** (C
mthrowu.c:100–155): C runs `losehp(...); exercise(A_STR,
FALSE);` unconditionally (:150–151) — done() returns on
lifesave. The old JS comment ("done() does not return")
was wrong; the fix matches C: gameover cleared by savelife
(end.js:2216, verified in the survive path with no
really_done) falls through to exercise; true death
(really_done keeps gameover set) returns 1 ✓. The potion
arm's unconditional `return 1` matches C (no trailing
exercise there) ✓ — though its `// done() does not return`
comment is now stale (nit only; behavior correct).

Hallucinations / overclaim: none. The D-log is exemplary:
262→297 fan-out gap disclosed as unaudited Next (with the
REACH behavioral backstop stated, not oversold), usptime
debt disclosed, thitu-bug-class follow-up named. `Ledger:
partial` is the honest status.

Density: small js/ diff but 2 blocked→PASS sessions + full
44/44 + 638-session reach — movement, not waste. Corpus-row
pop legitimate (generated coverage block empty). Ledger +
Verify lines present.

Verification: D-log Verify shows PROGRESS (2 PASS) + 80-run
reach sample + green/strict/cohort + full 44/44 + 5/5
tests. Re-measured (`hidden-proxy.mjs verify exercise
--base 2798e7602~1 --reach-all`): `2 PASS, 0 moved past, 0
unchanged, 0 worse → PROGRESS` (Tourist-92095 PASS,
Knight-94015 PASS — both named sessions confirmed) +
`reach 638 baseline-PASS (638 run): 638 PASS, 0 regressed
→ REACH-OK` — stronger than the D-log's 80-sample. Zero
regressed. Banned-pattern grep: clean. Rule #2 clean (2229).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
