# Review 2617 — 91497e5d4 — prompt paints honor vpline's u.ux gate (D-3750)

Metadata. SHA `91497e5d4` (2026-10-09), D-3750, parent
`43f6bc696`. js diff: `js/getline.js` +14/−4 (new
`prompt_paint_flush` helper + 4 call sites) and
`js/display.js` +1 (re-export `_paintToplineOnly`) +
`scripts/bones-prompt-blank-status.test.mjs` (new, 1 it).
Ledger: `tty_yn_function` partial + `hooked_tty_getlin`
split (D-3750 appended, notes unchanged). Works its HEAD's
cliffs head (`wintty.c` process_menu_window, 10 blocked —
verified in the parent queue; region-heuristic owner,
writer = the prompt-paint flush).

## Intent vs deliverable

Promise (subject + D-log): 10 scen-chain sessions diverge
kind=screen at wintty.c:1709 with identical «Get bones?
[yn] (n)» toplines; row 22 is C «» vs JS «Wizard the
Troglodyte …». The wizard bones yn fires mid-level-gen,
pre-placement (u.ux==0), before C's first bot() (newgame
tail); C vpline flushes only `if (u.ux)`, so WIN_STATUS is
still empty — JS's four prompt paints flushed
unconditionally, running bot() → render_status. Gate them:
ux ? flush_screen(1) : paint_topline_only().

Diff actually adds exactly the helper + export + 4 call
sites. Promise and diff match. No signature change.

## Inventory

Changed JS (1 helper + 1 export + 4 sites):

- prompt_paint_flush — `js/getline.js:49–52` (new, local).
  C: `pline.c` vpline `:152–291` (printed range), gate
  `if (u.ux) flush_screen(...)` at **:273–274**
  (see cite note below).
- paint_topline_only — `js/display.js:6962` re-export of
  `_paintToplineOnly` (:7402).
- Call sites: getlin :307, get_ext_cmd :1651,
  tty_yn_function :2150, yn_collect_number :2243.
  C chain: `win/tty/topl.c` tty_yn_function custompline
  `:420,425` (verified) → custompline `:305` calls
  `vpline(line, the_args)` (verified) → gate; wizard yn
  `bones.c` getbones `:671` (verified); first bot()
  `allmain.c` newgame tail `:819` (verified: docrt,
  flush_screen, bot).

## C ↔ JS fidelity

**Gate exact.** C paints the topline via putmesg
regardless, then flushes only if `u.ux`. JS: `game.u?.ux`
falsy (0/undefined, pre-placement) → `paint_topline_only()`,
which paints rows 0–1 from `_pending_message` and touches
no status rows, no bot(), no map (body read); post-placement
→ `flush_screen(1)` exactly as before. All four sites set
`game._pending_message` before the call and set the cursor
explicitly after — verified in each hunk. Behavior change
is confined to u.ux==0 prompts. Import edge already
exists (`--can`: "getline.js already statically imports
display.js"), so no cycle/TDZ concern.

**Callees:** flush_screen (LIVE), paint_topline_only
(LIVE export of the existing painter — not a clone).
No stubs, no new omits.

**Falsified-first-hypothesis discipline:** the D-log
records that the `_buildScreenOutput` fallback was tried,
failed to fix the committed test, and reverted — the
writer is proven by elimination + setCell trace, not
assumed. The committed test replays the chain-prefix
shape and pins rows 22–23 blank at the recorded probe
screen. Good.

**Cite drift (observation, not a C-wrong):** the D-entry
and JS comment cite the vpline gate as `:277–278`; the
pinned body has it at `:273–274` (single `if (u.ux)` in
pline.c). Behavior is exact; the next port iter may fix
the two cites with the test file's comment if touched.

## Hallucinations / overclaim

None. The "no C bot() pre-placement" claim is audited
(callers listed); the region-heuristic call (identical
toplines, empty C status rows) matches the queue row.
Diff grep (FORCE / DIAG / getRngLog / fastforward / seed
/ coords / u.ux comparisons): zero hits. No symbol
deleted or re-pointed (pure additive export), so no
`sym.mjs` paste required. Rule #2: global re-check this
audit → clean.

## Density

Cliff-phase §2b: parent head is process_menu_window (10
blocked, RNG lost 58320); this commit ships the writer
the divergence names (D-3736 read once, different arm —
correctly not re-ported), moves all 10 probes (6 FULL
PASS at ship). One cliff, one C locus, no bundling.
Correct gates (green/strict/cohort + full 44/44).

## Verification

D-log Verify (`verify.mjs --fn process_menu_window`): 6
PASS + 4 moved + 0 + 0 → PROGRESS (95418/95435/95438/
95417/95421/95439 PASS; 95416 → slime_dialogue@114,
95410 → skiprange@669, 95420 → next_ident@864, 95423 →
test_move@859); smoke 24/24 → REACH-OK; green/strict/
cohort PASS; full 44/44. New test pre-fix FAIL → PASS.

Re-measured by this audit (`verify process_menu_window
--base 91497e5d4~1 --reach-all`; HEAD code includes 5
later SHAs, so later movement is expected):

```text
verify process_menu_window: 7 PASS, 3 moved past, 0 unchanged, 0 worse → PROGRESS
smoke process_menu_window: no RNG-tagged reach; fixed smoke spread (24 run, 9.3s): 24 PASS, 0 regressed → REACH-OK
```

95420 is now FULL PASS under the later next_ident ships;
95416/95410/95423 sit exactly where named. No vacuous
check (row cited 10; all 10 itemized).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
