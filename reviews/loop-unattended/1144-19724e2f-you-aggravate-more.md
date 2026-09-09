# Review 1144 — 19724e2f — muse.c you_aggravate WIN_MAP blocking → more() (D-2178)

Metadata: SHA `19724e2f`, js/ +5/−5 in `muse.js` only (import
name swap). D-log D-2178. Subject promises: WIN_MAP blocking
needs `more()`, not flush+nhgetch (Wizard-92048 88→113).

Intent vs deliverable: promise matches diff. Actually adds: one
4-line body swap (`flush_screen(1)` + lazy `nhgetch()` →
`await more()`), import cleanup, comment re-cite. Display-
mapping correction, zero game logic.

Inventory: no new/deleted functions. `sym.mjs`: `more`
(display.js:6938, ASYNC, awaited correctly). Same-module import
swap only — no new edge, no TDZ. `grep flush_screen js/muse.js`
→ zero remaining uses: the dropped import is clean, no dangling
reference. Lazy `input.js` import removed (sole use per D-log;
`more()` owns its key wait).

**C ↔ JS fidelity**: confirm, two loci read at HEAD.

- `muse.c:2630–2651` (`you_aggravate`): pline → `cls()` →
  CLIPPING-guarded cliparound (named omit, kept) → show_glyph →
  display_self → `You_feel("aggravated…")` →
  `display_nhwindow(WIN_MAP, TRUE)` → `docrt()` → unconscious
  arm. JS order unchanged except the WIN_MAP-block mapping.
- `wintty.c:1889–1896` (NHW_MAP blocking): `end_glyphout()`,
  topline non-empty → `TOPLINE_NEED_MORE`, then
  `tty_display_nhwindow(WIN_MESSAGE, TRUE)` → `more()` paints
  `--More--` and waits. The old JS comment ("no --More--",
  D-1811) contradicted this C path: the wait happened but the
  More was never painted and topline-clear semantics skipped.
  New mapping matches the established detect.js mfind0 / eat.js
  mimic `display_nhwindow(WIN_MAP,TRUE)` arms — consistency,
  not invention.

RNG: none in this arm either side (`show_glyph` display RNG
predates; movement claim untouched).

Hallucinations / overclaim: none. The row was checked off on
*movement* (88→113 next_ident), not a PASS — and the residual
is handed to the existing `mkobj.c next_ident` Open row with an
explicit do-not-re-pop. No NO-MOVEMENT-as-omission.

Density: ~8 insertions; C body 20 lines, rest live since D-1811
— density exception (C arm that small).

Verification: D-log cites `verify.mjs --fn you_aggravate` → 0
PASS + 1 moved past, green 2/2, strict ×2, cohort 7/7.
Re-measured independently: `hidden-proxy.mjs verify
you_aggravate --base 19724e2f~1` → baseline 1 blocked, `0 PASS,
1 moved past, 0 unchanged, 0 worse → PROGRESS` (Wizard-92048
88→113 next_ident). Exact match. `rulecheck` clean. No
DIAG/FORCE/seed gates.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
