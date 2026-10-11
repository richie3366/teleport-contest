# Review 2684 — b2dce99c3 — panic port (Oops + getret wait) + statue-donor newsym

Metadata: SHA `b2dce99c3`, D-3820, cliffs head `o_init.c`
randomize_gem_colors writer, HEAD `bc0bec095`. JS: `js/end.js`
(`NhPanic`/`panic`/`panic_tail`), `js/display.js` (`xwaitforspace`,
`getret`, `tty_raw_print`, NOMUX raw shadow), `js/jsmain.js`
(runSegment catch), `js/trap.js` (donor), `js/cmd.js` (export),
throw→panic re-points in 11 files. Test:
`scripts/panic-oops-getret.test.mjs`. Harness:
`scripts/lib/hidden-worker.mjs` (`jsPanic`).

## Intent vs deliverable

Promise: C `panic()` was a bare JS throw that voided the run; port
panic (Oops raw print + getret wait, then abort) plus the
mk_trap_statue donor repaint; claimed 95230 + 95244 → PASS. Diff
actually does: exactly that — new panic family, 40 call sites
re-pointed with messages preserved, donor completed, scorer
distinguishes JS-only panics. Match.

## Inventory

- `panic` (js/end.js:1064) — new: message format, BUFSZ clamp,
  panicking latch, throws `NhPanic`. C `end.c:393–402` (read
  directly; `csym.mjs panic` cannot parse the `VA_DECL` definer).
- `panic_tail` (js/end.js) — new: C `:403–471` after the latch.
- `xwaitforspace` (js/display.js) — new. C
  `getline.c:229–257` (csym).
- `getret` (js/display.js) — rewritten (prompt paint deleted).
  C `wintty.c:763–781` (csym; the `:788–805` cite is drift).
- `tty_raw_print` + `nomux_raw_emit`/`nomux_raw_putch`
  (js/display.js) — new. C `wintty.c:4003–4018` (csym; the
  `:4065–4082` cite is drift) + contest patch
  `006-nomux-capture.patch` (raw shadow).
- `mongone_statue_donor` (js/trap.js) — completed. C
  `mongone :3266–3283`, `m_detach :2733–2803`,
  `mon_leaving_level :2694–2730` (csym).
- runSegment `try/catch` (js/jsmain.js) — NhPanic runs the tail,
  anything else still throws. `tty_exit_nhwindows` export-only.

## C ↔ JS fidelity

panic entry: latch `was = panicking|0; panicking = was+1; abort =
was!==0` matches C `:400–402` (first call proceeds, re-entry
aborts); JS `panic_tail` early-return on `abort` ≡ C's immediate
`NH_abort(NULL)` (nothing captured either way). `set_bot_disabled`
≡ `:403`; window_inited gate (Oops → wait_synch → exit →
window_inited=0) ≡ `:404–411`; the three-way collapse message ≡
`:413–417` verbatim incl. nesting; support/wizard-list/WIZARD_NAME
≡ `:426–441`; `vsnprintf` hoisted to entry is pure (buf feeds only
raw_print/paniclog) and the `BUFSZ-1` slice matches. Recorder
`end.c:464–471` confirms the CRASHREPORT claim (unconditional
`NH_abort`, `really_done(PANICKED)` unreachable) — only the cited
numbers (`:472–476`/`:479`) are drift. Omitted arms verified dead
in the recorded build: `sound_exit_nhsound` is NULL under
`sounds.c:1726–1730` nosound default; dosave0/paniclog/NH_abort
report uncaptured (process dies at the wait). No RNG; none added.

xwaitforspace: `x = disp ? dismiss_more : 10`, `morc = 0`, ESC arm,
`(s && strchr)` incl. NUL (`c === 0 ||`), `c == x`, bell-only-under-
cbreak — all match `:229–257` arm-for-arm (the `(x=='\n' && c=='\r')`
arm is dead in both — `\r` breaks earlier). getret drops only the
uncaptured xputs/standout writes, keeps `raw_printed = 0`.
tty_wait_synch's getret+reset arm (js/display.js:8595) matches C
`:3623–3647`. NOMUX shadow matches the patch: enter-on-first-
nonempty (markers-on assumption holds in the harness), clear+home,
`\n` row advance, control-char drop (so `\r\nOops...` lands at row
1), cursor = raw row/col. EOF/input-exhaustion aborts the JS tail
where C continues it — unobservable (no capture follows the wait
in either runtime; C aborts, JS returns).

Donor: minvent pre-emptied per `mk_trap_statue :389–414` (csym), so
isgd/unstuck/mdrop/discard/m_unleash/steed/stealmid/isshk are
provably no-ops on the fresh donor; light arm keeps C's `mx > 0`
(`:2744`); remove_worm/remove_monster/mundetected/seemimic/
fill_pit/newsym follow `:2698–2726` in order; wormgone + endgame
bit follow `:2786–2789`. `purge_monsters++` skipped with the
MON_DETACH latch it counts — self-consistent (JS drains it only as
a nonzero trigger, js/do.js:1857, js/save.js:602; `polearm.hitmon`
cannot name a fresh struct). `void fill_pit` float is named (pit+
boulder arm only; near-impossible here). All 40 re-points keep
their C texts, printf-ified with `%s` guards for interpolated
strings — no literal-`%` hazard. Gap: none in behavior.

## Hallucinations / overclaim

None. "Match C" is earned per arm above; the D-log's "Only
95230/95244 report jsPanic" is subsumed by my zero-regression
re-measure (a spurious panic fails its session). Two doc-level
(not-C-wrong) drifts: (1) the D-log/JS cites `:472–476`/`:479`,
`:788–805`, `:4065–4082` are off by ~8 lines against pinned C;
(2) the D-log `Ledger:` bullet was never written — `docs/ledger/`
untouched by this SHA (`mk_trap_statue` still partial with a stale
omit, `xwaitforspace`/`getret` notes stale, `tty_raw_print`
unknown, `panic` rowless). Per playbook both are one `ledger.mjs
set` inside a real iteration, never a row; `ledger.mjs` is
additionally broken in this env (`node:sqlite` on Node v20 — see
journal). Neither misdirects the picker (coverage uses measured
class).

## Density

Cliff-phase: head writer correct (panic, named by the D-3733/
D-3767 voids — not a re-port of the whole owner). Every ported
function whole, every callee LIVE (`tty_raw_print`,
`tty_wait_synch`, `tty_exit_nhwindows`, `set_bot_disabled`,
worm.js trio, `seemimic`, `newsym`) or named (vraw_printf path,
MON_DETACH+dmonsfree stand-in, fill_pit float). No STUB in a live
arm. Ledger bullet present in the D-log (application drift noted
above). Not unreached: 2 probes PASS. Not a batch: 6 units + text-
preserving re-points.

## Verification

js-hunk grep: clean (one `ENCUMBER` const-name hit). Rule #2 clean
(iteration-wide run). `sym.mjs panic` → `panic
js/end.js:1064 sync`; no deleted symbols, no clone→import
re-points; every touched edge reports ALREADY (incl. end↔cmd,
display↔end — hoisted decls, runtime use). Re-measure (mine):
`verify randomize_gem_colors,mk_trap_statue --base b2dce99c3~1
--reach-all` → `verify randomize_gem_colors: 2 PASS, 0 moved
past, 0 unchanged, 0 worse → PROGRESS` (95230, 95244 PASS) and
`reach … 1078/1078 PASS, 0 regressed → REACH-OK`; `verify
mk_trap_statue` vacuous at baseline (as the D-log says) + smoke
24/24 REACH-OK. Exactly the D-log claim, zero regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
