# Review 2507 — 5e1ad1736 — erase_menu_or_text whole + corner dismiss routing

Metadata: SHA `5e1ad1736` (D-3627), cliffs-head `end.c` disclose writer (parked
SYMPTOM; writer named by the D-3626 `[measure]`). js diff: `js/display.js` +52
(new export), `js/pager.js` +14/−11, `js/invent.js` +9/−7, new
`scripts/erase-menu-or-text.test.mjs`. ≤10-function SHA: full Method on all.

## Intent vs deliverable

Promise: new `erase_menu_or_text(offx, offy, maxrow, clear)` export in
`js/display.js` porting C `win/tty/wintty.c:965–984` whole (all 4 arms in C
order); route `show_nhw_menu_text` dismiss, `show_text_pages` dismiss, and
`dismiss_nhw_menu` corner through it with clearscreen=FALSE; remove the
D-0929 dismiss-time topline save/restore as dead. Claims 2 PASS
(tour-Priest-92235, wish-Tourist-92067) + 1 moved (wish-Priest-92179
102→save_dungeon@103) + REACH-OK; same-edge import-name swaps only.

Diff actually adds: exactly that — one new async export, three routed dismiss
sites, two import-line swaps (`pager.js` docrt→erase_menu_or_text, `invent.js`
docorner→erase_menu_or_text), no new edges. Matches the promise.

## Inventory

- `erase_menu_or_text` (`js/display.js:7880`, async) — new, whole C body.
- `show_text_pages` dismiss (`js/pager.js`) — docrt+flush → export call,
  behavior-identical fullscreen arm.
- `dismiss_nhw_menu` corner (`js/invent.js`) — inline docorner → export call,
  behavior-identical.
- `show_nhw_menu_text` dismiss (`js/pager.js`) — unconditional docrt →
  export call + corner-only flush; the actual behavior fix.

## C ↔ JS fidelity

C `erase_menu_or_text` (`nethack-c/upstream/win/tty/wintty.c:965–984`, via
`csym.mjs`): `offx==0` → offy→`tty_curs(window,1,0)`+`cl_eos()`; else
clear→`term_clear_screen()`; else `docrt()`+`flush_screen(1)`;
`offx!=0` → `docorner(offx, maxrow+1, 0)`. Callers: `:1098`
(`tty_clear_nhwindow`, clear=TRUE) and `:1999` (`tty_destroy_nhwindow`,
clearscreen) — confirmed, plus the `:1990–1997` in_role_selection
clearscreen=TRUE guard (verified in C source).

Arm-by-arm confirm:

- offy arm (`:972–975`): C `tty_curs(1,0)` maps to screen (0+offx, 0+offy)
  via `:2112–2116` (`cw->curx = --x; x += cw->offx; y += cw->offy` —
  verified), then `cl_eos` clears to end of screen. JS clears grid rows
  offy..end and sets cursor (0, offy). Equivalent grid op, correctly cited.
- clear arm (`:976–977`): C `term_clear_screen()` ⟺ JS
  `display.clearScreen()`. Equivalent.
- fullscreen else (`:978–981`): C `docrt(); flush_screen(1);` ⟺ JS
  `await docrt(); await flush_screen(1);` — live same-module calls. Exact.
- corner (`:982–984`): C `docorner(offx, maxrow+1, 0)` ⟺ JS
  `await docorner(offx|0, (maxrow|0)+1, 0)`. Exact, no flush — matches C.
- RNG: none in C body or JS; display-only. No `rn2` walk needed.

Caller wiring: C `:1999` → all three JS dismiss sites via the export (verified
`await` at each); C `:1098` clear=TRUE arm ships with no JS caller — named,
with the no-core-caller rationale; C `:1990–1997` chargen clearscreen=TRUE →
named (chargen keeps its own helper). No silent stubs: every callee
(docrt/flush_screen/docorner) is a live same-module call.

Import-swap safety (required `sym.mjs` check): `sym.mjs erase_menu_or_text`
→ `js/display.js:7880 ASYNC — await required`, and all three call sites
await. Post-swap grep: `pager.js` has no remaining `docrt(` code use (comments
only); `invent.js` has no remaining `docorner(` code use — both removals safe.

One disclosed deviation: `show_nhw_menu_text` adds `flush_screen(1)` on the
corner path where C has none. Justified as JS screen cadence (C writes the tty
immediately; without the flush the docorner repaint would not commit), and the
old code flushed unconditionally too — so the only behavior delta is
docrt→docorner. Not a C-wrong. The removed D-0929 save/restore is dead as
claimed (docorner touches no toplin state); paint-time leftover keep stays.

## Hallucinations / overclaim

None. The D-log credits the D-3626 measurement for naming the writer and
honestly notes Tourist passed beyond the measure's prediction. The wish-Priest
move names the new owner and differing writer (epitaph truncation, RNG
3097/3097). Named omissions are in the D-entry, not silent. No "Match C"
dispatch-over-stub: the export's callees are all live.

Diff grep: no `FORCE`/`DIAG`/`getRngLog`/seed/step/coordinate reads/
`fastforward`/hardcoded coords. Rule #2: global `--rulecheck` clean (see 2506).

## Density

Cliff phase: one cliff — the disclose head's measured writer, ported whole
(all 4 C arms, every `:1999` dismiss caller wired), code + ledger + verify in
one handoff. `Ledger: erase_menu_or_text ported`. Pre-fix code even admitted
the C-wrong ("JS still docrt() for Hallu see_monsters burns") — this SHA
deletes a hack instead of stacking one. No second-file work. Not a no-op.

## Verification

Re-measured, one call:
`node scripts/hidden-proxy.mjs verify disclose,erase_menu_or_text --base 5e1ad1736~1 --reach-all`:

- `verify disclose: 2 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS`
  (tour-Priest-92235 PASS, wish-Tourist-92067 PASS, wish-Priest-92179 moved →
  save_dungeon@103, was 102)
- `smoke disclose: 24 PASS, 0 regressed → REACH-OK`
- `verify erase_menu_or_text: no corpus session is blocked` (writer, 0 blocked
  — D-log says exactly this, no PASS claim)
- `smoke erase_menu_or_text: 24 PASS, 0 regressed → REACH-OK`

Matches the D-log Verify bullet exactly. No REGRESSED session. Committed test
re-ran: 1 pass / 0 fail.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
