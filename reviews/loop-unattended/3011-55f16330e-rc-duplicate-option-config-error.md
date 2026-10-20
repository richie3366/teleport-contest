# Review 3011 — 55f16330e — duplicate rc option complaint and the pre-window getret

- SHA: `55f16330e` (cliff; the whole Open — cliffs block: 12
  `unattributed scen-symset-*` rows, 18 corpus recipes with
  `msg_window:reversed` twice)
- D-entry: D-4171; Ledger: parseoptions split (parseoptions +
  parseoptions_match), config_error_done partial, vpline ported
- `js/` diff: options.js +118 −51, display.js +45 −11, jsmain.js +20 −5,
  nomux_capture.js +15 −6, cfgfiles.js +15 −5, input.js +3 −2

## Intent vs deliverable

Promise: a repeated compound option makes C's parseoptions complain
(`:621–623`). Before init_nhwindows, the complaint is a raw_print, and
rcfile's config_error_done (`:1945`) prints «1 error in …» and waits in
getret. The recorder's raw mode then sticks, so every marker reports the
raw cursor (0,6).

Diff: parseoptions' match block moves verbatim into
`parseoptions_match`. A new `rc_parseoptions_dups` runs the duplicate
step right to left for each OPTIONS= line. parseNethackrc calls
config_error_nextline for every physical line. jsmain start brackets the
rc with `config_error_init(true, null, false)` … `if
(config_error_done()) await tty_wait_synch()` and keeps cbreak off until
the display install. vpline's pre-window arm calls tty_raw_print. The
three raw statics are now ints shared with nomux_marker. The diff
delivers what the subject promises.

## Inventory

- parseoptions_match — options.js (C options.c `:539–613`): extracted,
  body unchanged.
- rc_parseoptions_dups — options.js (C `:513–537`, `:617–623`): new.
- parseNethackrc — options.js: line split (fgets has no line after the
  final `\n`), config_error_nextline per line, `dups[ei]` into the 8
  rc_do_set_role_family sites.
- config_error_nextline — cfgfiles.js (C `:1492–1512`): export only.
- configMsg — cfgfiles.js: `void pline` pre-window instead of raw_printf.
- vpline — display.js (C pline.c `:243–249`): pre-window raw_print live.
- nomux_raw_statics / nomux_raw_poke / nomux_shadow — display.js:
  recorder statics (patch 006 termcap.c `:871–960`).
- nomux_marker — nomux_capture.js: loads and stores the raw statics
  around the overflow model.
- NethackGame.start, captureBoundary — jsmain.js; nhgetch — input.js.

## C ↔ JS fidelity

- **Duplicate detection.** `csym duplicate_opt_detection`
  (options.c:6781–6787): returns `dupdetected++` only under
  `opt_initial && opt_from_file`. rc_parseoptions_dups sets both before
  the loop and restores them after, as parseoptions `:504–505` does.
- **Gate and order.** The gate `got_match && 0 <= matchidx < OPTCOUNT
  && !disregarded` (`:619–620`) matches. So does `duplicate &&
  !dupeok` → complain_about_duplicate (`:621–623`, CompOpt →
  "compound", `using_alias` suffix; JS resets usingAliasOpt per element,
  `:503`). The right-to-left order matches the `:513–520` recursion.
- **Split from dispatch.** C detects each element's duplicate just
  before its optfn. JS detects all of a line's duplicates first, then
  dispatches. Nothing between the two reads or prints in a way that can
  reorder: JS's optfns raise no config errors here (named), so the
  complaints still precede any output of the line.
- **One counter.** No other path bumps the counter
  (`grep -anw dupdetected`: only the detector and
  reset_duplicate_opt_detection), so the role-family sites no longer
  double-count.
- **config_error_done.** `csym` cfgfiles.c:1591–1621: `pline("\n%d
  error%s %s %s.\n")` with source `""` → configfile, then wait_synch.
  The JS body prints the same text through configMsg and returns n. The
  wait moves to the caller, which waits exactly when n ≠ 0, as C does.
- **tty_wait_synch** (wintty.c:3623–3647). With `!ttyDisplay` it calls
  getret. JS start runs before the display install, and cbreak is false
  (setftty, wintty.c `:533`, has not run).
- **Recorder model.** nomux_raw_emit enters raw mode on the first
  non-empty raw_print and nothing clears it. With a real raw_print and
  the overflow model sharing one copy of the statics, this matches the
  recorder's single C static. The guard `if (game.nhDisplay && !s)`
  keeps an in-game empty flush from entering raw mode. Pre-window, C's
  nomux_buf exists and `game._nomuxShadow` stands in for it.

## Hallucinations / overclaim

None. The subject says "11,819 screens", not "PASS". The D-log says the
18 rows stay failing on the recorder's temp-dir path (`env:config-path`,
the same class as the pre-existing seed2200 rows), and that the
config_error_done verify is vacuous (owner-null).

## Density

A cliff: one root cause behind the entire cliffs block. Every function
touched is on that one path from rcfile to the marker. Right-sized for a
cross-file C path; the six files are one call chain, not "while here"
work.

## Verification

```text
verify config_error_done,parseoptions --base 55f16330e~1 --no-reach
  config_error_done: 0 blocked (vacuous; owner-null rows)
  parseoptions:      0 blocked (vacuous)
frozen ps_test_runner on the 18 recordings (HEAD 878852b8f):
  every one rngCalls matched == total; screens e.g.
  Samurai-50555047 922/938, Rogue-50059025 963/983,
  Valkyrie-50950047 721/865, Ranger-50059028 491/580,
  Wizard-50359017 325/354
```

These reproduce the D-log's figures exactly.

## Actionable C-wrongs

None queued. Debt, all named in the D-log: the other
config_error_done callers (sysconf, parse_conf_str, earlyarg, wizkit)
still do not wait. parseNethackrc reports no other element error (too
long / empty / ambiguous / bad negation). No corpus row reaches any of
these.

Verdict: **ACCEPT-WITH-DEBT**
