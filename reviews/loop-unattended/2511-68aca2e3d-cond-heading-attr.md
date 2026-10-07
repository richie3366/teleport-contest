# Review 2511 — 68aca2e3d — cond_menu heading attr via shared export

Metadata: SHA `68aca2e3d` (D-3631), cliffs-head `botl.c` cond_menu (region
owner; writer is the heading-attr store). js diff: `js/options.js` +10/−8
(rename + export), `js/botl.js` +4/−2 (dynamic-import join + attr on the
heading row), `scripts/cond-menu.test.mjs` +59 (4 new cases). ≤10-function
SHA: full Method on all touched.

## Intent vs deliverable

Promise: rename `ape_heading_attr` → exported `menu_heading_attr`
(`js/options.js:7051`, logic untouched — gameover → ATR_NONE, else C-domain
`iflags.menu_headings.attr` default MC_ATR_INVERSE translated to terminal
bits); `cond_menu` joins it to the existing dynamic options.js import and the
`:1409–1411` heading row carries `attr: menu_heading_attr()`. Paint-only, no
control-flow/RNG/state change. Claims Healer-94211 PASS + Barbarian-94251
110→do_statusline1@151 + REACH-OK.

Diff actually adds: exactly that — rename, export, one import-name join, one
row field, tests. Matches the promise.

## Inventory

- `menu_heading_attr` (`js/options.js:7051`, sync, new export) — renamed
  helper, body untouched.
- `cond_menu` (`js/botl.js:2145`, async) — dynamic import gains the name;
  heading row gains `attr:`.
- `handler_autopickup_exception` — call-site rename only, behavior identical.

## C ↔ JS fidelity

C `add_menu_heading` (`nethack-c/upstream/src/windows.c:1815–1828`, via
`csym.mjs`): `attr = iflags.menu_headings.attr`, `color =
iflags.menu_headings.color`; gameover → `ATR_NONE`/`NO_COLOR`; then `add_menu`
with the attr. JS: gameover → `ATR_NONE`; else read `iflags.menu_headings.attr`
(default `MC_ATR_INVERSE`) and translate BOLD/ULINE/INVERSE to terminal bits,
else `ATR_NONE`. Matches C's attr selection; the color half staying NO_COLOR
on the corner painter is named (pre-existing, unchanged — no per-row color
there). RNG: none on this path.

C call site (`botl.c:1409–1411`, read at the pinned path):
`Sprintf(mbuf, "sorted %s", ...)` + `add_menu_heading(tmpwin, mbuf)` — JS row
`{ text: \`sorted ${menutitle[order]}\`, selectable: false, attr:
menu_heading_attr() }` is that call with the shared attr. The winid/add_menu
plumbing stays mapped to row pushes per D-2635 (named, architectural).

Required `sym.mjs` check (deleted/re-pointed symbols): `sym.mjs
menu_heading_attr` → `js/options.js:7051 sync`, single definition; grep finds
zero remaining `ape_heading_attr` references in `js/` + `scripts/` — clean
rename, no dangling caller. Import edge:
`node scripts/imports.mjs --can js/botl.js js/options.js menu_heading_attr`
→ "ALREADY: botl.js already statically imports options.js. No new edge
needed." — the subject's ALREADY-edge claim confirmed; the name joins the
pre-existing dynamic import, no new static edge, no cycle question.

Nit (non-actionable): the inline cite on the gameover line (`:1820–1821`)
is off — the gameover if/set sit at `:1823–1824` (the doc comment's
`:1822–1824` is right). Comment-only cite drift, logic correct; per Row
eligibility not Must-fix evidence. A port iter touching those lines may
correct it; not queued.

## Hallucinations / overclaim

None. The "writer is the heading-attr store, not the painter" framing is
measured (cell-attr decode, text identical). The Barbarian landing
(do_statusline1@151, 41 steps downstream) is disclosed as the pre-existing
next cliff, and the committed queue's do_statusline1 row confirms that HEAD
state. No dispatch-over-stub: the export's logic is the verified C mapping.

Diff grep: no `FORCE`/`DIAG`/`getRngLog`/seed/step/coordinate reads/
`fastforward`/hardcoded coords. Rule #2: global `--rulecheck` clean (2506).

## Density

Cliff phase: one cliff — the cond_menu head, writer ported at the exact
diverging field, both existing heading-row producers (ape, cond) sharing one
verified helper instead of a second clone. `Ledger: cond_menu ported`. No
second-file work. Not a no-op (1 PASS + 1 strictly-later move).

## Verification

Re-measured:
`node scripts/hidden-proxy.mjs verify cond_menu --base 68aca2e3d~1 --reach-all`:

- `verify cond_menu: 1 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS`
  (Healer-94211 PASS; Barbarian-94251 moved → do_statusline1@151, was 110)
- `smoke cond_menu: 24 PASS, 0 regressed → REACH-OK`

Matches the D-log Verify bullet exactly. No REGRESSED session. Committed
tests re-ran: `cond-menu.test.mjs` 9 pass / 0 fail.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
