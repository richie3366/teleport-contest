# Review 2458 — 6edaf1e61 — tty status delivery family + doset wizard rows (D-3576)

**Metadata.** SHA `6edaf1e61` (2026-10-06, D-3576). Type: **cliff**:
writer port for the cliffs head `botl.c do_statusline2` (painter
faithful, not re-ported). `js/` insertions: ~950 (`botl.js` +745,
`display.js` +120, `options.js` +74, `const.js` +13, `allmain.js`
comment-only). 16 ledger functions + harness glue.

## Intent vs deliverable

Promise: live `tty_status_update` delivery (wintty.c:4454 + static
family) called from `status_update`, so row 23 paints delivered field
values instead of live state (Satiated one turn early); wincap2 status
bits on (VIA_WINDOWPORT true); `switch_symbols(false)` at init;
simple-menu do_set status arms; 7 wizard bool rows spliced in
optlist.h order; 4 PASS + 1 moved.

Diff actually adds: the whole family with dense C cites, the wincap2
bits, the options arms/rows, `glyphmap_symidx` +
`set_committed_status_lines` + `_statusSuppressed` symmetry. Promise
matches diff.

## Inventory

| # | Function | Status | JS | C range |
|---|----------|--------|----|---------|
| 1 | tty_status_update | ported | botl.js:393 | wintty.c:4454–4579 |
| 2 | make_things_fit | ported | botl.js | wintty.c:4583–4638 |
| 3 | check_fields | ported | botl.js | wintty.c:4646–4743 |
| 4 | set_condition_length | ported | botl.js | wintty.c:4844–4857 |
| 5 | shrink_enc | ported | botl.js | wintty.c:4860–4868 |
| 6 | shrink_dlvl | ported | botl.js | wintty.c:4871–4884 |
| 7 | check_windowdata | ported | botl.js | wintty.c:4891–4901 |
| 8 | condcolor | ported | botl.js | wintty.c:4908–4918 |
| 9 | condattr | ported | botl.js | wintty.c:4921–4953 |
| 10 | tty_putstatusfield | ported | botl.js | wintty.c:4803–4840 |
| 11 | render_status | ported | botl.js | wintty.c:4992–5264 |
| 12 | decode_glyph | ported | botl.js | windows.c:1439–1463 |
| 13 | decode_mixed | ported | botl.js | windows.c:1466–1512 |
| 14 | term_attr_fixup | ported | botl.js | termcap.c:1411–1428 |
| 15 | term_start/end_color | ported | botl.js | termcap.c:1474–1485 |
| 16 | glyphmap_symidx (+3 helpers) | ported | display.js:253 | display.c:2774–3066 |
| 17 | options arms/rows (switch_symbols call, do_set mirror, wizard splice) | ported | options.js | options.c:5330–5390, :8820–8849; optlist.h |

Helpers: begin/end_attr, hl_to_cell_attr, status_curs,
status_cl_end (C Begin/End_Attr, tty_curs, cl_end adaptations),
set_committed_status_lines (harness glue, disclosed — C keeps rows in
cw->data). No clones; all callees live (`sym.mjs`: repad_with_dashes,
stat_cap_indx, statusRows, switch_symbols, status_initialize,
classify_terrain; `via_windowport`/`reset` locals match C
macro/static shape).

## C ↔ JS fidelity

**Dispatch + fit + layout (1–3): exact.** `tty_status_update`
compared against C :4454–4579 arm-for-arm: guards, RESET/FALLTHROUGH,
CONDITION stash, GOLD→default fallthrough, fmt default + row-first
blank skip, Sprintf (all 27 initblstats fmts verified single-`%s`,
no other directives; `$`-safe replacer), blank-suppress, and the
whole second switch (HP/hitpointbar, LEVELDESC/HUNGER strip, TITLE
30+2, GOLD `\G` count, CAP) ✓. `make_things_fit` and `check_fields`
match line-for-line incl. the `otheroptions++`-on-3-rows shape and
the update_right/matchprev ladder; `#if 0` noted; `do_field_opt=1`
✓ (`DISABLE_TTY_FIELD_OPT` unset); sanity-check compiled out ✓
(patchlevel.h:33). No RNG, no pline in added code (grep).

**Render side (4–11): exact.** shrink/set/cond/putfield match their C
ranges line-for-line. `render_status` verified arm-by-arm against
:4992–5264: CONDITION 3rd-row indent + cond_idx word loop +
truncation warn, hitpointbar split math + writeback, VERS
right-justify + FIXME resync, ordinary field incl. the shared :5228
putfield. Documented adaptations, all sound: paniclog→drop (Rule #2),
Begin/End_Attr→HL mask (nets zero), term_start_color NO_COLOR no-op
(all call sites guard, as do C's), ATR_BLINK-no-cell-bit (dormant),
`status_cl_end` clears the mirror too (disclosed invariant; CE arm
verified :648–663). One trivial gap: the C :5000–5004 WIN_ERR guard
has no JS twin — provably unreachable (render requires
check_windowdata-TRUE or truncationExpected, which requires a prior
TRUE cycle). Tables byte-exact: encvals :4269–4273, HEXDD decl.c:74,
init_blstats guard matches C :1761–1767 with correct cross-game
semantics.

**Decode (12–13, 16): exact.** `decode_glyph` mirrors :1439–1463
(hexdd halves, check-word gate, counts). `decode_mixed` mirrors
:1466–1512 (save/str++, `G` advance `dcount+1`, forgery-literal,
`\\` single-copy, trailing-backslash keep, default drop). All 30+
`glyphmap_symidx` banks verified against :2774–3066: chain order,
every symidx formula, `&0x7`/`&0x3` masks, altar single-slot, stone
base, boulder override, mlet via the pre-existing MLET_CH table;
default arm is a safe out-of-range adaptation (C has no else). Minor:
missing-showsyms yields `'?'` where C writes the raw (possibly NUL)
byte — unobservable with populated showsyms (now wired at init).

**Termcap (14–15): exact.** `term_attr_fixup` matches :1411–1428
with has_US/MB/MH=1 — correct for the contest terminal (recorder
TERM=xterm-256color, record-session.mjs:452). Start/end color →
render-state is the right cell-grid adaptation, dormant without
hilite rules.

**Caps + options (17): exact.** TTY_WINCAP2 now equals C's unix tty
set :111–125 bit-for-bit (SELECTSAVED config.h:575, STATUS_HILITES
:616 verified; no WRAPTEXT → C skips `wraptext` in doset, so the
D-log's tail claim holds). do_set mirror matches :5330–5351/:5386–5390
incl. the classify_terrain fallthrough, the wc2_supported early
return (skipped JS tail is disjoint — OPT_GLYPH_RESET has no status
member — exactly as C's disjoint cases), and all four
showexp/time/showscore/showvers members. Wizard splice verified
against optlist.h line-by-line: debug×3 set_wiznofuz after dark_room
(deaf in_config correctly skipped), menu_tab_sep set_wizonly after
menu_overlay, monpoly/montele set_wizonly before null (news/nudist
in_config correctly skipped), sanity_check after safe_wait,
wizmgender/wizweight tail; `wiznofuz = wizard && !debug_fuzzer`
matches :8844–8845. bot() windowport arm mirrors the putstr arm's
`_statusSuppressed=false` ✓.

## Hallucinations / overclaim

One doc nit (ledger-text, not a C-wrong, never a row): the D-log says
the decode rows "overwrite the by-design seed notes", but both rows
still carry `"note":"seed: no scored analogue (file)"` — status
flipped to `ported`, note text stale. A future real iteration can
`ledger.mjs set` it.

## Density

Cliff §10.18: head writer, one delivery family + its same-render
callers, 16 `Ledger:` entries (spot-checked 4: ranges + js refs
correct). The in-commit Ranger-94031 regression was root-caused to
the menu (hitpointbar-vs-montelecontrol row slip) and fixed in-commit
— disclosed, and the session sits at its pre-existing early-menu
block now. Per-function verdicts ACCEPT ×17 → SHA ACCEPT.

## Verification

- Added-code grep: clean (no FORCE/DIAG/seed/coords; no RNG/pline).
- Rule #2: clean this iteration (see 2453).
- Re-measure (mine): `verify do_statusline2 --base 6edaf1e61~1
  --reach-all` → **4 PASS, 1 moved, 11 unchanged, 0 worse** + smoke
  24/24 REACH-OK — the D-log's numbers exactly (nothing later moved
  these sessions).
- Full `sessions` 44/44 claimed in-ship, re-covered by this audit's
  gates.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
