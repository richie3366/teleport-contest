# Review 2808 — ffbaf451a — C0 emit invisibility + pile-inverse bank gate

- **SHA:** `ffbaf451a` (Wed 2026-10-14) — cliffs-head writer (D-3962).
- **D-entry:** D-3962. **Ledger:** `newsym` ported, `show_glyph` split (D-3962 appended).
- **Diff size:** `js/display.js` 3 hunks (+37/−6); +1 test.
- **Method:** cliff (display emit path + `newsym` arm) — whole Method + movement re-measure.

## Intent vs deliverable (promise vs diff)

The subject promises: the `do_screen_description` cliff head (5 symset
sessions) is a region-heuristic misattribution — the writer is
emit-visibility. C's `g_putch` emits RogueEpyx control bytes (S_human
0x01, S_coin 0x0f) raw, and the nomux capture drops `ch < 32`, keeping
the stale cell; JS painted cleared `' '` cells. Companion: `newsym`'s
memory branch applied pile-inverse regardless of the painted glyph's
bank; C needs MG_OBJPILE/MG_FEMALE on the painted id. 5/5 moved.

The diff is exactly that: the `' '` mapping deleted in
`symset_render_char`, a C0 skip in both grid writers, and the
`inverseBank` gate in `newsym`. Promise and diff agree.

## Inventory

| # | JS change | C source | Status |
|---|-----------|----------|--------|
| 1 | `symset_render_char` returns raw C0 byte (gbuf layer) | wintty.c g_putch :3739–3790, IBM arm :3753–3758 raw `putchar(ch)` | C-exact |
| 2 | `_paint_gbuf_cell` + `paint_gbuf_level_to_terminal` skip `ch < 32` | patch 006 nomux_putch :216 `if (!ttyDisplay \|\| ch < 32) return;` | C-exact |
| 3 | `newsym` mem branch: inverse gated on gid in [STATUE_OFF, UNEXPLORED_OFF) | tty_print_glyph :3930–3936 (flag on painted id) + reset_glyphmap :2788–2835 (flags on piletop/statue banks) | C-exact direction, slight over-width (see Fidelity) |
| 4 | `scripts/c0-control-drop.test.mjs` (prefix replay pins stale grid + raw disp bytes) | Caveman-50059032 s16 | test-only |

No helper, no import change, no symbol re-pointed (`sym.mjs` not
required — nothing deleted or re-pointed). Diff grep: no FORCE, DIAG,
getRngLog, seed names, fastforward, or hardcoded coordinates in
production. Rule #2 clean iteration-wide (`imports.mjs --rulecheck`:
"no bare/node specifiers or fs calls in js/").

## C ↔ JS fidelity

**C0 drop (confirmed end to end).** `g_putch` (`csym`: wintty.c
:3739–3790) — the IBM arm (`:3753–3758`) is one raw `(void)
putchar(ch)`, no control mapping ✓. Patch 006 hooks `g_putch` with a
bare `nomux_putch(stripped)` and **no cursor advance** (patch :681–689;
`g_putch` never touches `curx`), and `nomux_putch` itself returns
early on `ch < 32` (patch :214–225, defined in the `win/tty/termcap.c`
hunk — the D-log's "termcap.c nomux_putch" citation is exact) ✓. So a
C0 map byte writes nothing and the capture keeps the stale cell —
exactly what the two JS grid-write skips mirror. The old `' '`
mapping contradicted C; deleting it is pure fidelity gain.

**Pile-inverse gate (confirmed, one residual).** `tty_print_glyph`
(`csym`: :3854–3977) sets inverse only from flags on the painted
`glyphinfo` (`:3930–3936`: MG_OBJPILE&&hilite_pile,
MG_FEMALE&&wizard&&wizmgender, MG_DETECT/BW chain) ✓. `reset_glyphmap`
(`csym`: display.c :2738–3086) sets MG_OBJPILE only on the four
piletop banks and MG_FEMALE on statue banks ✓, and display.h :535–544
orders them all inside [GLYPH_STATUE_OFF, GLYPH_UNEXPLORED_OFF) ✓ —
so the JS `inverseBank` range covers every C-inverse-eligible bank.
The Knight arrow-trap case (trap gid below the range → attr 0) matches
C, which paints a flagless trap glyph ✓. Residual: the range also
admits the two *plain* statue banks, which carry no MG_OBJPILE — a
remembered plain statue with a live unseen pile would take inverse in
JS where C (non-wizard) paints none. Exotic, no session evidence;
map-note grade, not a C-wrong (the pre-existing code was wider still).

**Callers.** The D-log's caller claim (central emit path: all map
flushes via `_paint_gbuf_cell`, getpos via
`paint_gbuf_level_to_terminal`) matches the two skip sites; the
inverse gate touches only the `newsym` memory branch, live piletop
paints carry piletop ids and are unaffected ✓.

## Hallucinations / overclaim

None. The temp-C flushtrace discipline (ignored recorder tree,
byte-identical prefix re-record, reverted + rebuilt) is stated with
falsifiable detail; the "D-3961 refuted / D-3960 theory refuted, data
stands" handling reads both cited entries once, as the parked tag
requires. The two `js-throw` labels in Verify are the null-owner
fallback — I re-checked Healer-50255063 myself (`error: null,
jsPanic: null, kind: screen, owner: null`).

## Density

Cliff discipline holds: the writer (emit-visibility), not the symptom
(`do_screen_description`, which paints no map cells), was ported; the
pile-inverse companion is the same C file's gate on the same sessions'
evidence (Knight s211), not bundled unrelated work. Each function has
its Ledger entry (appended, not new). The later 6-session AmigaFont
regression (found by the D-3963 full rescore, queued by `ee1a1cebf`,
shipped as D-3964) was this SHA's correct drops exposing a latent
getpos corner bug — not a C-wrong here; repaired in-window, no new
Must-fix from this review.

## Verification

Re-measured myself (`verify do_screen_description --base ffbaf451a~1
--reach-all`) — reproduces the D-log **exactly**, on current HEAD code:

```
verify do_screen_description: 0 PASS, 5 moved past, 0 unchanged, 0 worse → PROGRESS
smoke do_screen_description: no RNG-tagged reach; fixed smoke spread (24 run, 22.6s): 24 PASS, 0 regressed → REACH-OK
```

Per-session landings match too (do_symset@354, flooreffects@784,
owner-null@37/@259, x_monnam@55). No REGRESSED session; movement persists.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
