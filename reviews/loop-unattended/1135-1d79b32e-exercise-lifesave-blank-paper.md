# Review 1135 — 1d79b32e — attrib.c exercise row: lifesave continuation + blank paper (D-2169)

Metadata: SHA `1d79b32e`, js/ +29/−2 across `artifact.js`, `end.js`,
`read.js` (+ map row). D-log D-2169. Subject promises: lifesaved
touch_artifact blast skipped `exercise(A_WIS,FALSE)` + blank-paper
read took no time (1 PASS + 1 moved past).

Intent vs deliverable: promise matches diff. Actually adds: (a)
`touch_artifact` early-return gated on the invented `gameover` flag
instead of unconditional, (b) `done()` survive arm clears that flag,
(c) new `seffect_blank_paper` + `SCR_BLANK_PAPER` seffects case. Two
blocked sessions of one queue row (`attrib.c` exercise), one arm
family each — combined but related, not unrelated subsystems.

Inventory: one new function (`seffect_blank_paper` — CLONE of a C
`staticfn`, so a local port is the only option, not an import). No
deleted/re-pointed symbols.

**C ↔ JS fidelity**: confirm against pinned C, three loci.

(a) Blast continuation. C `artifact.c:953–959`: `d()` damage,
`losehp(dmg, buf, KILLED_BY)`, then *unconditional*
`exercise(A_WIS, FALSE)`. The exercise runs on survival because C
`done()` returns normally after savelife / wizard `Die?` decline —
only a real death never returns. JS now mirrors this: after
`finish_losehp_done()` it returns early only while
`game.program_state?.gameover` is still set, otherwise falls through
to `exercise(A_WIS,false)` and the evade/control arms in C order.
Flag lifecycle verified at HEAD: set only in `really_done`
(`end.js:955`), cleared in the survive arm covering BOTH lifesave
(`Lifesaved && how <= GENOCIDED`, `end.js:1627+`) and wizard/discover
`Die?` decline, read by the moveloop/zap gates (`jsmain.js:395`,
`allmain.js:975,1095,1214`, `zap.js` ×5). Real death still sets the
flag via `really_done` — the early return still fires there. Correct.

(b) Blank paper. C `read.c:2005–2012` (`seffect_blank_paper`: Blind
`You("don't remember…")` else `pline("This scroll seems to be
blank.")`, `gk.known = TRUE`) — JS matches line-for-line; the bare
`known = true` writes the module-level `let known` (`read.js:222–223`,
the house `gk.known` mirror, reset at `doread` entry), so no scope
bug and the downstream learnscroll path sees it like every other arm.
C `:2222` case + `:643–646` (`otyp != SCR_BLANK_PAPER` skips useup,
always `return ECMD_TIME`) — JS `break`s to the shared `sobj ? 0 :
1` return (scroll kept via the existing `:2074` gate, takes time).
The moves%10 exerper-tick mechanism the D-log cites follows: with
time taken, `game.moves` stays aligned and step 313's tick fires.

(c) No RNG in any shipped span — none added. The step-313 exercise
is the next turn's tick, not this arm's draw, as the D-log states.

Hallucinations / overclaim: none. Both session traces are
C-cited and specific (wish `d(4,10)` blast + More-prompt draws +
`Die?` decline sequencing for 92014; draw-free blank read + `j`-move
tick for 92206).

Density: ~29 insertions across 3 files, each arm that small —
right-sized per §2b; the exercise body itself (D-0449) needed no
change.

Verification: D-log cites `verify.mjs --fn exercise` → 1 PASS +
1 moved past (92206 PASS; 92014 48→49 touch_artifact), green 2/2,
cohort 7/7. Re-measured independently: `hidden-proxy.mjs verify
exercise --base 1d79b32e~1` → baseline 2 blocked, `1 PASS, 1 moved
past, 0 unchanged, 0 worse → PROGRESS` (92014 → touch_artifact@49,
92206 PASS). Exact match. `rulecheck` clean; zero banned-pattern
hits.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
