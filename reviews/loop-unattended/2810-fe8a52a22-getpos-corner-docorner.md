# Review 2810 — fe8a52a22 — getpos-tip corner dismiss via erase_menu_or_text

- **SHA:** `fe8a52a22` (Wed 2026-10-14) — Must-fix regression repair (D-3964).
- **D-entry:** D-3964. **Ledger:** `getpos` stays partial (D-3964 appended).
- **Diff size:** `js/getpos.js` 2 hunks (+1 import, corner arm rewire); +1 test.
- **Method:** cliff Must-fix (1 dismiss path) — whole Method + movement re-measure.

## Intent vs deliverable (promise vs diff)

The subject promises: the 6 AmigaFont PASS→FAIL since `ffbaf451a`
are tip-overlay residue — the corner dismiss skipped C's docorner
cl_end, and post-D-3962 the C0 reprint drop leaves the overlay char
where C shows the cl_end blank. The row's hypothesized mechanism
(getpos symbol-scan reader) is refuted by key measurement; the fix
wires the corner arm to the shared ported `erase_menu_or_text`
(docorner cl_end + row_refresh) and clears `_tty_menu_geom` in both
arms. 6/6 back to PASS, 5 D-3962 sessions kept.

The diff is exactly that rewire. Promise and diff agree.

## Inventory

| # | JS change | C source | Status |
|---|-----------|----------|--------|
| 1 | corner arm → `erase_menu_or_text(offx, 0, maxrow, false)` | erase_menu_or_text wintty.c :965–984, corner `:982–984` → `docorner(offx, maxrow+1, 0)` | LIVE callee, C-ordered |
| 2 | `_tty_menu_geom` cleared in both arms | destroy chain: nhl_text → tty_destroy_nhwindow `:2020` → tty_dismiss_nhwindow :1952–2006 (MENU arm `clearscreen=FALSE` → erase) — C destroys the window either way | C-exact |
| 3 | fullscreen arm unchanged (`docrt()`) | `:976–979` arm | untouched ✓ |
| 4 | `getpos-tip-c0-blank.test.mjs` (0x11/0x13 doors: grid blank, gbuf raw C0) | Tourist-50255028 s4, Priest-50155027 s77 | test-only |

`sym.mjs` on the re-pointed symbol (required):

```
erase_menu_or_text js/display.js:8649   ASYNC — await required
```

LIVE and awaited at the call site ✓. Its body maps C's arms exactly
(offx==0 → offy/cl_eos, clear, else docrt+flush; else
`docorner(offx, maxrow+1, 0)`, no flush — D-3626), and getpos awaits
`flush_screen(1)` after, the established cadence ✓. No clone, no
no-op. Import is getpos→display, the pre-existing edge (+1) —
no new cycle. Diff grep: no banned patterns. Rule #2 clean (2808).

## C ↔ JS fidelity

**Dismiss chain (confirmed).** `csym tty_dismiss_nhwindow`:
:1952–2006, MENU/TEXT arm passes `clearscreen=FALSE` to
`erase_menu_or_text` ✓; `csym erase_menu_or_text`: :965–984, corner
arm is exactly `docorner(offx, maxrow+1, 0)` ✓. The D-log's
:966–985/:982–984 cites match (range-end off-by-one only).

**C0-door mechanism (confirmed both ends).** dat/symbols:1024+:
AmigaFont S_vodoor/S_hodoor/S_vcdoor/S_hcdoor = 0x91–0x94 ✓; the
g_putch high-bit path emits them as 0x11–0x14 (0x93→0x13 arithmetic
exact ✓), nomux drops `ch < 32` (2808), so C's capture keeps the
docorner cl_end blank ✓. Old JS repainted the C0 cell as `' '` by
luck (matching the blank); post-D-3962 the drop is correct and the
missing cl_end is exposed — the regression was latent here, not a
C-wrong in D-3962. The "keys `^F _ space ESC…`, no symbol key"
refutation of the symbol-scan theory is measurement, and the residue
char being tip text (col 49 `l` of "location") pins the overlay.

**maxrow mapping.** `(maxrow > 0 ? maxrow : endRow+1)` prefers C's
`cw->maxrow` with a JS-geom fallback — defensive, same value in the
normal case; acceptable.

## Hallucinations / overclaim

None. The stale-cache note (`show` reads working-scores, briefly
masked the live FAIL) is honest tooling disclosure, and the board
rebuild ("stale f0282c7f3-era rows → 10 fake PASS→FAIL; rebuilt from
HEAD + fresh rows only") is stated rather than smoothed over.

## Density

Must-fix discipline holds: ships alone, names the 6 sessions, refutes
the wrong mechanism with measurement instead of patching it, wires a
LIVE callee rather than cloning, keeps the D-3962 movement (my 2808
re-measure shows identical landings on HEAD code — kept ✓). Ledger
re-tagged, no bundled work.

## Verification

Re-measured myself (`verify getpos,dotravel --base fe8a52a22~1
--reach-all`), one call, both summary lines:

```
verify getpos: 15 PASS, 13 moved past, 8 unchanged, 0 worse → PROGRESS
smoke getpos: fixed smoke spread (24 run, 23.3s): 24 PASS, 0 regressed → REACH-OK
verify dotravel: 1 PASS, 5 moved past, 2 unchanged, 0 worse → PROGRESS
smoke dotravel: fixed smoke spread (24 run, 23.0s): 24 PASS, 0 regressed → REACH-OK
```

dotravel matches the D-log exactly (Wizard PASS ✓). getpos reads
15/13/**8** vs the claimed 15/13/7 — same PASS, same moved, 0 worse;
I confirmed all 5 Must-fix getpos sessions PASS individually, and the
unchanged bucket is the documented pre-existing `Unknown direction`
symbol-scan cause. The ±1 is working-set drift (the D-log's board was
itself a rebuilt hybrid; Grow #9 has since added sessions) — not a
false claim: the Must-fix deliverable (6/6 PASS, 0 worse) verifies.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
