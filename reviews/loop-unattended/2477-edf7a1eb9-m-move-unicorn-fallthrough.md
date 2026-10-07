# Review 2477 — edf7a1eb9 — m_move cornered-unicorn fall-through (D-3596)

**Metadata.** SHA `edf7a1eb9` (2026-10-07, D-3596). Type: **cliff**:
the cliffs head itself (`monmove.c m_move`, parked SYMPTOM — the
park proved only the selection loop for other sessions, never the
`:1926` gate). `js/` insertions: 8 (`js/monmove.js` +8/−3) +
committed test.

## Intent vs deliverable

Promise: JS carried an extra `cnt==0 → NOMOVES` return with no C
counterpart, so a cornered unicorn never reached the `:2064`
`rn2(2)` teleport arm; deleting it (plus awaiting `rloc` with
`RLOC_MSG` and unconditional MOVED) PASSes both sokoban probes.

Diff actually adds: the deletion, the arm rewrite, C cites.
Promise matches diff. No symbols deleted or re-pointed (`rloc`,
`RLOC_MSG` already imported).

## Inventory

| # | Function | Status | JS | C range |
|---|----------|--------|----|---------|
| 1 | m_move cnt==0 gate + unicorn arm | partial (arm now whole) | [monmove.js](/home/debian/dev/teleport-contest/js/monmove.js:2108) | monmove.c:1715–2075, gate :1926–1930, arm :2064–2067 |

Helpers: none added. `rloc` is LIVE async
(`sym.mjs`: teleport.js:1215, now awaited); the Tengu arm at
:2205 is the live `await rloc(mtmp, RLOC_MSG)` precedent.

## C ↔ JS fidelity

**Gate and arm are now C-textual.** C :1926 (read): `if (cnt == 0
&& !is_unicorn(mtmp->data))` — the unicorn falls through; the
deleted JS line contradicted this textually ✓. C :2064–2067
(read): `if (is_unicorn(ptr) && rn2(2) && !tele_restrict(mtmp)) {
(void) rloc(mtmp, RLOC_MSG); return MMOVE_MOVED; }` — JS now
matches call-for-call: same predicate order (RNG drawn only when
the unicorn test passes), awaited rloc with RLOC_MSG (old code
passed 0 and gated MOVED on a floating promise — both wrong),
result ignored, unconditional MOVED ✓. `is_unicorn ≡
mlet==S_UNICORN && likes_gems` (mondata.h:149, read) ⟺ the JS
predicate ✓. Fall-through safety: with cnt==0 both JS loops
(`i<cnt`, `j<jcnt` with jcnt=−1) run zero times exactly like C's,
mmoved stays NOTHING, worm_nomove/tele_restrict precede as in C
✓. Real C callers are monmove.c:911 + uhitm.c:558 (rest of the
13 `--callers` refs are comments/prototype/termcap) ⟺
monmove.js:2847 + uhitm.js:5082, both awaited ✓.

**Map finding (repaired in this audit, not a C-wrong):** the SHA
silently dropped the `m_move` row's still-true `omit` (D-3572's
You_hear-gates/other-files note — the door arms at
monmove.js:1778–1811 still emit plain pline, verified live).
Unexplained in the D-log; the `js/` change is unrelated to it. I
restored the omit verbatim via `ledger.mjs set` (d-list intact,
sanctioned tool; audit iters fix wrong rows) — see the working
`docs/ledger/monmove.c.jsonl` diff in this commit. No session
impact; no Must-fix (ledger notes are never rows).

## Hallucinations / overclaim

None. The SYMPTOM-tag override is argued from the park's actual
scope (selection loop, other sessions) plus fresh measurements
(awake unicorns, replicated cnt=0, matched prefix draws) — the
right way to dispute a tag. Nits: D-log cites the uhitm caller
at :5088, live at :5082 (drift); "Tengu arm above" is 170 lines
up, still the same function.

## Density

Cliff §10.18: head owner, one gate + one arm completing the row's
port, own `Ledger:` touch (D-append; omit restored here).
Per-function verdict ACCEPT → SHA ACCEPT.

## Verification

- Added-code grep: clean.
- Rule #2: clean this iteration (see 2471).
- Committed test `monmove-unicorn-cornered.test.mjs`: 1/1 PASS
  now (12 seeds, never NOMOVES, failed-rloc-still-MOVED).
- Re-measure (mine): `verify m_move --base edf7a1eb9~1
  --reach-all` → **2 PASS, 0 moved past, 0 unchanged, 0 worse**
  (both sokoban probes PASS) + real reach **730/730 REACH-OK**
  (in-ship sampled 80/80; `--reach-all` covers all). No
  REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
