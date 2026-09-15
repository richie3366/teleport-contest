# Review 1352 — 74e2f96f — handle_tip TIP_GETPOS arm + getpos call-site + l_nhcore_call dispatch

- SHA: `74e2f96f`, D-2386. JS files: `js/hack.js` + `js/do.js` +
  `js/getpos.js` + committed `scripts/handle-tip.test.mjs` (12 files).
- Prior reviews closed: none (pops its own Open row; 0 blocks).

## Intent vs deliverable

Subject promises the TIP_GETPOS arm, the canonical getpos call-site,
and the nhcore dispatch. Diff delivers all three, plus the guard test
and a +5 TOP30 refill after popping its own queue row (allowed source
#2; queue stays in band). Promise matches diff.

## Inventory

| JS symbol | Kind | Status |
|---|---|---|
| `handle_tip` (hack.js:1563) | changed, C `hack.c:1851–1881` | LIVE |
| `l_nhcore_call` (do.js) | changed, C `nhlua.c:168–194` | LIVE |
| `getpos` call-site (getpos.js) | changed, C `getpos.c:838–839` | LIVE, verbatim |
| `show_getpos_tip` (getpos.js:1140) | newly exported | LIVE, async, awaited |
| `context.tips_given` parallel flag | deleted | fully gone (grep: zero hits) |
| `scripts/handle-tip.test.mjs` | new committed test, 3 cases | passes 3/3 (re-run) |

Required `sym.mjs` output: `show_getpos_tip → js/getpos.js:1140 ASYNC`;
`handle_tip → js/hack.js:1563 ASYNC`. Nothing else deleted/re-pointed.
`imports.mjs --can do.js getpos.js show_getpos_tip` → ALREADY (D-log's
"one new edge" is overstated in the safe direction — do.js already
imports getpos.js). `handle_tip` rides the existing getpos→hack edge;
`l_nhcore_call` the existing hack→do edge.

## C ↔ JS fidelity

C loci opened: `handle_tip` `:1851–1881` (full 31 lines),
`l_nhcore_call` `:168–194`, `getpos.c:838–839` (sed-confirmed),
upstream `dat/nhcore.lua:108,137–138`.

- `handle_tip`: tips gate, `NUM_TIPS` range (`TIP_GETPOS+1` ≡ the old
  hardcoded 4, now canonical), bit test + set **before** the switch
  (`hack.js:1569` ≡ C `tips |=` before switch) ✓, arms in C switch
  order ENHANCE/SWIM/UNTRAP_MON/GETPOS ✓, GETPOS does
  `await l_nhcore_call(NHCORE_GETPOS_TIP); return true` ≡ C `:1871–1873`
  + TRUE ✓. In-range unknown tip is dead (enum covers 0–3), so C's
  `impossible` default needs no port.
- `l_nhcore_call`: C pcall-if-function-else-disable ≡ JS unconditional
  `await show_getpos_tip()` + `avail[callidx] = false` tail — valid
  because upstream `nhcore.lua` always defines
  `getpos_tip = show_getpos_tip` in the table, so the C function-exists
  path is statically taken. The tail simplification is correct (GETPOS
  returns early; the tail only runs for genuinely missing entries).
- Call-site `if (await handle_tip(TIP_GETPOS)) show_goal_msg = true` ≡
  C `:838–839` verbatim ✓. Both claimed latent C-wrongs check out
  against the parent code (old `handle_tip` fell to `return false`;
  old getpos had no `flags.tips` gate, so the tip showed with tips
  disabled).
- Callee closure: all LIVE; no STUB in a live arm. Named: `context.tips`
  save-persistence (systemic since D-1963 — own row on falsifier),
  `msg_given` default (pre-existing, out of scope).

## Hallucinations / overclaim

One citation nit (doc-only, no queue action — the code comment is
right): the D-log body cites the TIP_GETPOS arm as "`:1583–1587`" but
those are the new JS lines; the C arm is `:1871–1873`. Everything else
verified; no corpus PASS claimed. The test file's scope note (first-time
arm needs nhgetch → covered by sessions) is honest.

## Density

One C function + two chain ends, one cluster, ~30 js lines + an honest
45-line guard test. Right-sized §2b.

## Verification

- Re-run by me: `node --test scripts/handle-tip.test.mjs` → pass 3,
  fail 0 ✓. `verify handle_tip --base 74e2f96f~1` → 0 blocked at
  baseline and working ✓.
- Green 2/2 + strict ×2 + cohort 7/7 + full 44/44 per D-log accepted.
- `imports.mjs --rulecheck` → Rule #2 clean. Zero banned-pattern hits.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
