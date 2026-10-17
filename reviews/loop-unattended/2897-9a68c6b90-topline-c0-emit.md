# Review 2897 — 9a68c6b90 — topline C0 emit invisibility

- SHA: `9a68c6b90` (cliff writer: message-row emit rule, 2 paint sites)
- D-entry: D-4056; Ledger: wintty.c (`tty_putstr partial`,
  D-4056 appended)
- `js/` diff: `js/display.js` +26/−~15 (two writers + cites);
  `scripts/c0-control-drop.test.mjs` +28 (Healer-prefix case)

## Intent vs deliverable

Promise (subject + D-log): both message-row grid writers get the
D-3962 C0 rule verbatim (skip `charCodeAt < 32`, column still
advances, tail cleared from line end); Healer/Rogue/Ranger symset
farlook sessions PASS; Knight/Caveman keep future rows. Delivers
exactly that: `_buildScreenOutput` line0/line1 and
`_paintToplineOnly` both rows, blanket pre-clear removed, one
focused test. Promise = diff.

## Inventory

- `_buildScreenOutput` message rows — display.js:7955–7985: C0
  skip per line + tail clear from `line.length`. C: patch-006
  `nomux_putch` (drop `ch < 32`) + topl.c `topl_putsym` (curx++
  for every non-`\n` char).
- `_paintToplineOnly` — display.js:8160–8175: same rule on both
  rows; blanket row-0 pre-clear removed. Same C locus.

No new exports, no deleted symbols, no re-pointed clones — step-3
`sym.mjs` paste not triggered.

## C ↔ JS fidelity

C (patch-006 `nomux_putch`, patch line ~216):

```c
void nomux_putch(int ch) {
    int row, col;
    if (!ttyDisplay || ch < 32) return;   /* stale cell kept */
    ...
}
```

Hook (topl.c, patch hunks): `curx` is incremented **before**
`putchar` (pinned topl.c:330–341: `default:` arm does
`ttyDisplay->curx++` for every char except `\n`), and the hook
only borrows `curx-1` for the shadow write. So for a C0 byte C
advances the column and keeps the stale capture cell — exactly
the JS `continue` (no `setCell`, loop index still advances).

`getpos.c:889–890` (autodescribe resets `msg_given`, no
`clear_nhwindow` on the `;` path) justifies removing the blanket
clear: C paints home + overwrite + cl_end. Byte-identity for
C0-free lines verified by reading, all edges: line longer than
cols (every cell overwritten either way), empty message
(`''.split('\n')` → `['']`, tail clear from 0 = full clear),
single-line (row 1 untouched before and after).

The `\x01` source chain is cited, not assumed: pager.c
do_screen_description `:1266–1271` looked prefix via
`encglyph`, windows.c decode_mixed `:1466–1512`, dat/symbols:573
RogueEpyx `S_human: \x01` (only set defining it; IBM wall bytes
prove it active). Stale letters traced to the previous steps'
col 0 ('U' s255, 'P' s54). Message store keeps the raw byte
(`_pending_message[0] === '\x01'` asserted) — C `putmixed` keeps
it too; only the capture drops it. No RNG on this path
(kind=screen, RNG fully matched).

## Hallucinations / overclaim

None. Owner `x_monnam` verified whole via brief (js/do_name.js:942,
ledger ported) and explicitly not re-ported — the name strings
match, only the C0 prefix byte differs. Rows 1–10 re-verified
live as D-4016/D-4028 kin with falsifiers unfired before working
row 11 — stated in the D-entry Status, not silently skipped.

## Density

Cliff writer with movement on all three owned sessions (3 PASS).
Whole-function holds for the shipped rule; the remainder is a
declared `partial` with C-cited omissions (menu/text/base-window
C0, rest of tty_putstr `:2226–2422`, Knight/Caveman causes).
One `Ledger:` entry, accurate (`at` stamp predates the commit by
the audit-SHA convention — prose only). No unreached work.

## Verification

Re-measure (`--base 9a68c6b90~1 --no-reach`):

```text
verify x_monnam: baseline 9a68c6b90~1 — 4 session(s) blocked on it
  scen-shop-Knight-50455511: still x_monnam at step 182
  scen-sweep-Caveman-50850017: still x_monnam at step 172
  scen-symset-Ranger-50155013: PASS
  scen-symset-Rogue-50059048: PASS
verify x_monnam: 2 PASS, 0 moved past, 2 unchanged, 0 worse → PROGRESS
```

Matches the D-log's 2 kin PASS + 2 unchanged (same steps,
same toplines). The probe Healer-50255063 is absent from the
*committed*-baseline x_monnam set (it carries a stale reserve
row, owner-null@37) — but the D-entry discloses exactly this
("live re-score moves Healer past its carried reserve row to
x_monnam@256"), and `show` on HEAD's code gives FULL PASS
(RNG 9171/9171, screens 668/668) vs baseline FAIL. Movement is
real, not vacuous. Focused test 2/2 green on HEAD; RED pre-fix
is certain by code reading (parent code unconditionally painted
`\x01` at col 0 after a blanket clear). No FORCE/DIAG/seed
strings (grep 0). Rule #2 clean (window rulecheck).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
