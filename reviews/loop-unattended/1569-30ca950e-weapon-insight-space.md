# Review 1569 — 30ca950e — insight.c weapon_insight leading-space restore (D-2610)

**Metadata:** SHA `30ca950e`, `insight.c` `weapon_insight`, D-2610.
JS: `js/invent.js` (2 literals, +2/−2). New: `scripts/weapon-insight-twoweapon.test.mjs`
(3 its, unscored). Closes review 1568 Must-fix item 1.

## Intent vs deliverable

Subject promises: restore the leading space in both primary-compare `sfx`
literals (`js/invent.js:5393,5398`), no caller/control-flow/RNG change, plus
a focused regression test. Diff actually adds: exactly the two one-space
literal changes, and the new test file. Promise matches deliverable —
nothing more, nothing less.

## Inventory

- `weapon_insight` primary arms, `js/invent.js:5393,5398` (this SHA) —
  `sfx` gains the leading space in the `twoskl < sklvl` arm and the
  `twoskl > sklvl` arm.
- `scripts/weapon-insight-twoweapon.test.mjs` (new) — both primary arms at
  `final=0` + `was` tense at `final=1`, asserting spaced phrasing present
  and `islimited`/`waslimited` absent.

No new helper, no deleted symbol, no re-pointed import.

## C ↔ JS fidelity

C locus `insight.c:1269–1465` (via `node scripts/csym.mjs weapon_insight`;
range printed by the tool). The two relevant arms read (verified with
`sed -n '1350,1375p'`):

```c
Sprintf(pfx, "Your skill in %s ", skill_name(wtype));
Sprintf(sfx, " limited by being %s with two weapons", twobuf);
...
Strcpy(pfx, "Your two weapon skill ");
Strcpy(sfx, " limited by ");
```

Both C literals carry the leading space (`enlght_line` is plain concat —
review 1568 verified `enlght_line_txt` is `` ` ${start}${middle}${end}${ps}.` ``).
The post-fix JS (`js/invent.js:5561,5566` at HEAD after later inserts) reads:

```js
sfx = ` limited by being ${twobuf} with two weapons`;
sfx = ' limited by ';
```

Branch-by-branch confirm: the `twoskl < sklvl` arm now emits
`Your skill in X` + `is`/`was` + ` limited by being …` = C's
`Your skill in long sword is limited by being unskilled with two weapons.`
The `twoskl > sklvl` arm appends `being ${sklvlbuf}` / `having no skill` +
`` ` with ${skill_name(wtype)}` `` onto the spaced base — C order
(`:1369–1375`, `eos(sfx)` appends). The secondary arms
(`` ` ${also}limited …` ``, HEAD `:5591,5594`) already had theirs and are
untouched. No RNG (`rn2`/`rnd`/`rn1`/`d`) anywhere near this path in C or
JS — string-only change, so no keystream movement is possible.

Callee closure: none — no callee added, removed, or re-pointed. `sym.mjs`
confirms `weapon_insight` remains a single sync export (`js/invent.js:5469`
at HEAD). No `sym.mjs`-on-deleted-symbol output is required because no
symbol was deleted or re-pointed (local clone → import did not occur).

## Hallucinations / overclaim

D-log claims: fortress breach at D-2609 SHA (43/44, seed0107 97/98 with
RNG 2902/2902), parent `dba7a580` 44/44, breach session re-run PASS
98/98 after the fix. The breach narrative is independently corroborated:
review 1568's postscript recorded the same 43/44 + seed0107 97/98 on the
D-2609 SHA, so the "fortress breach" framing is measured, not invented.
The "fails on the pre-fix body — confirmed via stash" test claim is
plausible (the test asserts absence of `islimited`, which the pre-fix
body printed); re-verified here by the test passing 3/3 on the fixed
body. "No caller, control-flow, or RNG change" is exactly true — two
string literals. No dispatch/stub split, no "Match C" overclaim.

## Density

Must-fix one-liner (review-1568 queue head) + regression test. Right-sized
for a Must-fix; breadth-phase whole-function density does not apply to a
queued C-wrong repair.

## Verification

- `node scripts/imports.mjs --rulecheck` → Rule #2 clean (whole `js/`).
- Diff grep: 0 hits for `FORCE|DIAG|getRngLog|fastforward|rn2|rnd` in the
  `js/` hunk. No seed/step/coordinate reads.
- Re-measured: `hidden-proxy.mjs verify weapon_insight --base 30ca950e~1
  --reach-all` → `0 session(s) blocked` at baseline and working tree
  (vacuous-note path, correctly framed for an RNG-0 function — the D-log
  does not present it as a corpus PASS) + `smoke 24/24 PASS, 0 regressed
  → REACH-OK`. Both summary lines cited; matches the D-log claim.
- `scripts/weapon-insight-twoweapon.test.mjs` → pass 3, fail 0 (re-run
  here, this iteration).
- Breach-session restoration (seed0107 98/98) is D-log-asserted; the
  end-of-iteration full `sessions` cadence run below re-checks the
  fortress independently.

## Actionable C-wrongs

None. The C-wrong from review 1568 is repaired exactly; no new gap found.

Verdict: **ACCEPT**
