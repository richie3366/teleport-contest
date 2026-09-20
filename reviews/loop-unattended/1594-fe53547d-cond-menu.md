# Review 1594 — fe53547d — botl.c cond_menu whole-body port (D-2635)

**Metadata:** SHA `fe53547d`, `botl.c` `cond_menu`, D-2635 (+ 2
stale parks). JS: `js/botl.js` (+122/−1), `js/options.js` (+9/−2),
plus committed `scripts/cond-menu.test.mjs` (+95).
Coverage row (MISSING → live). No prior review claimed closed.

## Intent vs deliverable

Subject promises: status-conditions PICK_ANY menu + doset caller.
Diff delivers both — async export in its C home, `othrPicks` arm
calling it — plus the two comparators and a committed focused
test. Promise matches deliverable.

## Inventory

- `strcmpi_fold` / `cond_cmp` / `menualpha_cmp` — new file-locals
  (match C staticfns).
- `cond_menu()` — new async export (botl.js:951).
- options.js: import name + `othrPicks` "status condition fields"
  arm (`if (await cond_menu()) opt_set_in_config[PFX_COND_IDX] =
  true`).
- `MENU_ITEMFLAGS_SKIPINVERT` / `ATR_INVERSE` joined to existing
  const/terminal imports.
- `scripts/cond-menu.test.mjs` — new committed focused test (5
  its, 5/5 quoted).
- No deleted symbol, no local→import re-point.
- Required `sym.mjs` output pasted:

```text
cond_menu        js/botl.js:951   ASYNC — await required
```

Single export, awaited at the doset call site.

## C ↔ JS fidelity

C locus `botl.c:1374–1454` (81 L, via `csym.mjs cond_menu`) +
comparators `:1330–1351` (read directly). Full C body read here.
Arm-by-arm confirm:

- Per-iteration sequence rebuild + sortorder read from the live
  store (`game.gc.condmenu_sortorder`, decl.h:229 → game.gc
  precedent) — exact; sort toggle mutates the store mid-loop like
  C's `gc.condmenu_sortorder`.
- `cond_cmp` (ranking asc + strcmpi alpha tiebreak) and
  `menualpha_cmp` (alpha-only) verified against C `:1332–1351` —
  exact. Unique useroptions make C-qsort/JS-sort stability moot
  (no tie survives either comparator) — the claim holds because
  the *tiebreak input*, not the sort algorithm, decides.
- Sort-change row: a_int 1, 'S' accelerator, SKIPINVERT (`:1402–
  1408`) — exact. Heading row (`:1409–1411`) — exact.
- Condition rows: `cond_%-14s` ≡ padEnd(14) — exact (C never
  truncates either, and every useroption is under 14 chars);
  a_int idx+2, choice=FALSE reset, SELECTED-when-enabled
  (`:1412–1420`) — exact.
- ESC(−1)/finish-empty(0)/picks(>0) trichotomy via
  `{ cancelValue: -1 }` (protocol exists at options.js:2473) —
  exact: C res −1 skips the enable/disable loop while res 0 runs
  it (`:1428` vs `:1445`).
- Sort-toggle break, leftover-`idx` test clear (`:1449` clears on
  the leftover, not `i` — replicated exactly), `disp.botl` setting
  both `game.flags.botl` + `game.disp.botl` (hack.js:2932
  precedent), `changed` flag, `res >= 0` gate — exact.
- Caller: C options.c `:8436–8439` (`if (cond_menu())
  opt_set_in_config[pfx_cond_] = TRUE`) → JS exact including the
  flag set. C `:5032` ("not used") correctly has no JS site.
- `conditions`/`condtests` tables pre-existing (botl.js:824/860).

Callee closure: window layer → one `select_menu_pick_any` call
(getpos_menu precedent, dynamic import for the options.js cycle —
`--can`: same 98-module SCC, no top-level read). `cg.zeroany`/
`nul_glyphinfo`/`alloc`/`free` correctly have no JS carrier.
"Named" list accurate, including the out-of-body `cond_idx`
init-sort and the hardcoded-16 `get_val` display (not in
cond_menu's body; screens unchanged).

## Hallucinations / overclaim

None on fidelity. Observation (not a C-wrong): the focused test
lives at `scripts/cond-menu.test.mjs` — scripts/ is normally
untouched by port iters; benign, explicitly reported, and
stronger than a throwaway probe. Supervisor's call whether to
keep the location.

## Density

81-line C function + caller, +127/−3 js plus a 95-line committed
test. Right-sized; the test earns its lines (ESC-noop, enable,
sort-rebuild, sort-then-ESC).

## Verification

- `node scripts/imports.mjs --rulecheck` → Rule #2 clean (whole `js/`).
- Diff grep: 0 `FORCE`/`DIAG`/`getRngLog`/`fastforward`/seed names/
  hardcoded coordinates in control flow.
- Re-measured: `hidden-proxy.mjs verify cond_menu --base
  fe53547d~1 --reach-all` → `0 session(s) blocked` (vacuous-note
  path, honestly labeled) + `smoke 24/24 PASS, 0 regressed →
  REACH-OK`. Both summary lines cited; no REGRESSED session. Full
  44/44 re-run claimed for the shared files changed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
