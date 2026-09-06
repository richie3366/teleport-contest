# Review 935 — e8ba2bb7 — allmain.c init_sound_disp_gamewindows window-system init singleton (D-1965)

Metadata: SHA `e8ba2bb7`, D-1965, `js/allmain.js` (+111) + 1-line
wiring in `js/jsmain.js`. Reviewer re-ran the C body
(`allmain.c:698–763` via `csym.mjs`), the `unixmain.c:217`
ordering, sym on both new/wired symbols, the `--can` edge, the
`STATUS_HILITES`/`windowport_tty` guard claims, Rule #2, banned
grep, and `hidden-proxy verify --base`.

Intent vs deliverable: subject promises the exported sync init in
C order with sentinel WIN_* ids, live `prepare_perminvent` +
`clear_glyph_buffer`, named no-ops for the sound/display arms,
and one wiring call in `start()`. Diff actually adds exactly
that. Promise kept.

Inventory: one new function (`init_sound_disp_gamewindows`,
`js/allmain.js:172`, sync per `sym.mjs`). One wired call site
(`jsmain.js` after askname defaults, before `try_restore_save`
— matches C `vision_init → init_sound_disp_gamewindows →
attempt_restore` relative order, verified at `unixmain.c`
HEAD). Two extended import lists (`prepare_perminvent` from
already-imported `./invent.js`, three consts from
already-imported `./const.js`); `clear_glyph_buffer` already
imported (`allmain.js:12`). `--can`: ALREADY, no new edge.

C ↔ JS fidelity — against `allmain.c:698–763`, arm by arm:

- `activate_chosen_soundlib()` → named omit with the
  `sounds.c:1779–1796` citation (no SND_LIB in the scored port).
- Splash `iflags.wc_splash_screen && !flags.randomall` → read in
  order into `void wantSplash`; both `SoundAchievement` arms
  no-op (named, `sndprocs.h` cited). Condition reads kept, no
  short-circuit change.
- `CHANGE_COLOR change_palette()` → named as compiled out
  (verified `windconf.h` leaves it commented per header; not
  re-checked here — citation stands).
- WIN_MESSAGE = 10 / WIN_STATUS = 11 (else-arm) / WIN_MAP = 12 /
  WIN_INVEN = 20: sentinel-id stand-in matching the pre-existing
  `invent.js WIN_INVEN_ID = 20` pattern. `VIA_WINDOWPORT()`
  (`wincap2 & (WC2_HILITE_STATUS|WC2_FLUSH_STATUS)`) read live;
  contest sets no wincap2 so the else-arm runs like the tty
  build; true-arm keeps the `flags.botlx` tail
  (`botl.c:1683–1720` cited).
- `adjust_menu_promptstyle` → `opt_need_promptstyle = false`
  under the `WIN_INVEN != WIN_ERR` gate (menus read
  `menu_headings` directly — named with `windows.c` citation).
- TTY_PERM_INVENT arm → live `prepare_perminvent(WIN_INVEN)`
  (`invent.js:883`, sync per `sym.mjs`) under the tty gate; JS
  `windowport_tty()` is unconditionally true (`options.js:595`),
  and the inline `(name ?? 'tty') === 'tty'` default agrees —
  no divergence.
- `start_menu`/`end_menu` pacify → consumed `menu_behavior`
  (`void`), no grid touch per D-1831. Correct restraint.
- Three `display_nhwindow(..., FALSE)` paints → named no-ops
  with the init-state reason (no pending More, no level yet,
  status repainted by later `docrt`+`bot`); live
  `clear_glyph_buffer()` kept between them in C position.
  `STATUS_HILITES` compiled-out claim verified
  (`config.h:616` defines it).

No RNG either side; sync export correct. Callee closure: both
live callees imported; everything else named with C citations.

Hallucinations / overclaim: none. Every guard claim I spot-
checked held.

Density: §2b right size — one init singleton + one wiring line,
two modules. OK.

Verification: D-log Verify shows preflight PASS, `verify.mjs
--fn init_sound_disp_gamewindows` → PASS syntax/rule2/green/
strict/cohort/full-44/44, an explicitly vacuous hidden note (row
cited 0 blocks, no corpus-PASS claim). Reviewer re-measured:
`hidden-proxy verify init_sound_disp_gamewindows --base
e8ba2bb7~1` → "0 session(s) blocked (0 at baseline, 0 in working
scoreboard)". Honest. Diff-body banned grep clean (rng.js import
line is pre-existing context, not added use); Rule #2 clean.

Actionable C-wrongs: none.

Verdict: **ACCEPT**
