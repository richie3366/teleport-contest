# Review 842 — 8e602b91 — wintty.c process_menu_window page keys (D-1872)

Metadata: SHA `8e602b91`, D-1872, `js/invent.js` (+74/−8: page-key arms in
three menu loops + const imports + doc updates), map + queue/archive
stamps. Paste wart: the commit-message Verify line shows syntax only — the
full D-log Verify bullet (hidden + green + strict + cohort) exists and is
what I audited below.

## Intent vs deliverable

Subject promises the four page-key arms (`>`/`<`/`^`/`|`) in the menu loops
for the proxy-`minimal_xname` corpus owner (JS stuck on inventory page 1,
C on page 2; 54 screens blocked, RNG in sync). Diff delivers the arms in
all three `process_menu_window` subsets plus PICK_NONE bell parity.
Matches.

## Inventory

Changed: `select_menu_pick_none`, `display_pickinv_reply` loop,
`display_used_invlets` loop; new const names on a pre-existing const.js
import (`MENU_FIRST/LAST/NEXT/PREVIOUS_PAGE` = `^`/`|`/`>`/`<`, verified
at `const.js:1271–1274`). `process_menu_search` still exists for other
menus (usage removed from PICK_NONE only — no deletion). No new functions,
no deleted symbols.

## C ↔ JS fidelity

C locus `win/tty/wintty.c` `process_menu_window` (found at
`win/tty/wintty.c`, not `src/` — the D-log's `win/tty/` path is right),
arms read directly:

- `case ' '/MENU_NEXT_PAGE` (`:1624–1631`): turn unless on last page; only
  `' '` finishes there (`else if (morc == ' ')`) — JS `if (curr_page <
  npages-1) curr_page++; continue` reproduces exactly the `>` half,
  including "`>` never finishes" ✓.
- PREV/FIRST/LAST (`:1632–1649`) with `npages > 0` guards — JS drops the
  guards, which is safe: all three loops compute
  `npages = Math.max(1, …)` (invent.js:2534/3310/7313), so `npages ≥ 1`
  always and the C/JJ conditions agree on every reachable state
  (checked, not assumed) ✓. `page_start = 0` has no JS counterpart to
  miss (loops re-render from `curr_page`) ✓.
- `MENU_SEARCH` on PICK_NONE → bell (`:1701–1703`) ✓ — the old
  `process_menu_search` dispatch on `:` is removed, which is the fix, not
  a regression. Default (`:1738`): PICK_NONE → bell ✓ (`tty_nhbell` is
  screen-silent: `display.js:2277` no-ops unless un-silenced).
- Placement ahead of gacc/letter match in the two PICK_ONE loops matches C
  (distinct `case`s — page keys can never be letter/gacc hits) ✓. The
  D-log's note that default letter match scans the current page only
  (`:1753`) correctly explains steps 825–826 `J`/`n` being ignored.

Attribution note is the strongest part of this commit: proxy owner
`minimal_xname` is a literal-match artifact, screens 824–826 match
cell-for-cell on the `xprname`/`doname` path, step keys are
`i`/`J`/`n`/`>` — porting `minimal_xname` would have been NO MOVEMENT.
Measured, with the session PASS as the receipt.

Callee closure: no new callees (`tty_nhbell` pre-existing import).
Remaining defers (SELECT/UNSELECT/INVERT arms, PICK_NONE digit counting,
keypad remaps) are named in commit + map, not stubs in these arms.

## Hallucinations / overclaim

None in the D-log. One correction to my own interim suspicion: the thin
commit-message Verify line is truncation, not absence — the D-log bullet
has the full matrix. Retiring the `MENU_PREV/FIRST/LAST` map omits is
earned (all three loops ported). Archiving the `minimal_xname` queue row
as **Addressed:** D-1872 is legitimate: the row cited the step-827 block,
that block now PASSES (re-measured), and the unported function stays map
debt under D-0881 with the reasoning on record.

## Density

One C switch family across its three JS subsets (~74 lines, one module).
Explicitly right-sized per §2b (whole practical switch).

## Verification

Re-ran myself: `hidden-proxy.mjs verify minimal_xname --base 8e602b91~1`
→ `1 blocked → d03fe605: PASS → PROGRESS` (D-log claim true); green gate
2/2 PASS + `strict-output-check` PASS on both (ran in this review —
`8e602b91` tree, `js/` untouched by reviews). Cohort 7/7 per D-log, not
re-run by me: accepted residual risk — the change is RNG-neutral (page
keys burn no RNG) and screen-neutral except on page-key input, and green +
strict + corpus all confirm. Rule #2 clean (re-ran `imports.mjs
--rulecheck` this iteration). No FORCE/DIAG/seed/coordinate hits.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
