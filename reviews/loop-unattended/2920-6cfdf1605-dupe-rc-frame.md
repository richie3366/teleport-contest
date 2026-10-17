# Review 2920 — 6cfdf1605 — dupe-rc: dup detection + error frame + done wait

- SHA: `6cfdf1605` (dupe-rc writer: 19
  msg_window×2 symset sessions)
- D-entry: D-4082; Ledger: options.c +
  cfgfiles.c (`parseoptions`/`rcfile` notes)
- `js/` diff: `js/options.js` +83/−12 (new
  `rc_match_option` +
  `rc_note_option_occurrence`, frame
  bracket, per-line/per-item calls, role
  wrapper slim-down); `js/cfgfiles.js`
  +31/−3 (configMsg paint + buffer +
  export); `js/jsmain.js` +11/−1 (flush +
  wait on errors); new
  `scripts/dupe-rc-error-frame.test.mjs`

## Intent vs deliverable

Promise: per-item dup detection (C :619–623)
ahead of dispatch, the rcfile error-frame
bracket (:1943–1945), pre-window frame
paints, and the done :1615 wait — 19
sessions null@0 → env:config-path@0 with
RNG 19/19 FULL. The diff is exactly that
machinery. Promise = diff.

## Inventory

- `rc_match_option` (options.js:4967):
  trim → `!`/`no` strip → optlen →
  pfx-then-name loop → alias loop → -1.
  C: options.c :529–614.
- `rc_note_option_occurrence`
  (options.js:5001): match → disregarded →
  opt_initial/from_file bracket →
  duplicate_opt_detection →
  complain_about_duplicate. C: :619–623.
- `parseNethackrc`: init bracket, per-line
  nextline, per-item note, done() return
  into `config_errors` (incl. empty-rc).
- `configMsg` (cfgfiles.js:236): raw_printf
  counts kept + pre-window paint/buffer;
  new `flush_pending_config_frame` export.
- `config_error_nextline` exported (body
  unchanged); jsmain flush+wait gate.
- One NEW edge: jsmain→cfgfiles
  (flush_pending_config_frame). No-cycle
  proof re-done by hand (the tool hung):
  jsmain's sole scored importer is
  nethack.js, which nothing imports
  (leaf); cfgfiles never imports jsmain;
  the symbol is a hoisted function. SAFE.

## C ↔ JS fidelity

Confirmed against pinned C:

- Per-item detection matches C structure:
  parseoptions recurses per comma item
  (:513–522) with match+detect+optfn at
  each level. JS calls the note once per
  item ahead of dispatch ✓. (C goes
  right-to-left, JS left-to-right —
  pre-existing chain order; dupe counts
  identical.)
- Match loop: `!`/`no` strip incl. `no-`
  3-char (:540–543) ✓; optlen_wo_val
  (:544–551) ✓; pfx rows first per row
  (:560–563) ✓; match_optname+minmatch
  (:580–583) ✓; alias loop with
  using_alias (:602–611) ✓; -1 unknown
  (:594) ✓. `determine_ambiguities` is
  one-shot-guarded — per-item call is a
  no-op after init ✓.
- OPT sets audited against optlist.h with
  kind-aware layouts: OPT_PFX {cond_,font}
  ✓ (IBM_ under MICRO); OPT_ALIAS 14/14
  live ✓ (palette/videocolors out);
  OPT_DUPEOK_YES exact ✓ (IBM_/palette/
  subkeyvalue out — CHANGE_COLOR absent
  from both minimal hints files;
  menucolors d=No, autocompletions d=No —
  my first regex misread B/O layouts).
- duplicate_opt_detection (:6782–6788) +
  complain (:6789–6809) pre-existing and
  C-shaped. Role wrapper change IMPROVES
  fidelity: C sets the `duplicate` static
  per item without restore (:621), which
  the new code does (the old save/restore
  was less C-like).
- Frame: init(TRUE,NULL,FALSE) = the
  null-nameval :1943 case ✓; nextline per
  physical line after rstrip, before the
  ignore check (:1730) ✓; phantom
  trailing line dropped (fgets shape) ✓;
  done() count+summary+pop (:1597–1620)
  ✓ with the :1615 wait as the caller's
  job (JS done is sync — documented).
  vpline :239 raw_print arm ✓ cited.
- Chop `BUFSZ-1` (256) matches C :1888 ✓.

## Hallucinations / overclaim

None. All six Named items check out: (2)
ambiguous/unknown arms + my census below;
(3) cbreak unobservable in the 19 (no
ESC/space/NUL in eaten runs — the show
output's key stream corroborates the
shape); (5) the hang honestly disclosed
with a hand proof I re-verified.

## Density

One cause, 19 rows re-attributed at the
same step with full RNG — §3 movement for
env rows (they left the cliffs block).
Census INDEPENDENTLY re-run here over
1074 recipes / 18,271 OPTIONS items: 0
empty items, 0 over-128, 0 unknown, 0
abbreviated, exactly the 19 msg_window
repeats — every unported error arm is
unreachable and the new arm fires only
on the 19. Focused test 7/7 green here.
Full 44/44 in-commit (shared files).

## Verification

Re-measure (`--base 6cfdf1605~1 --no-reach`):

```text
verify parseoptions: no corpus session is blocked (vacuous, disclosed)
verify config_error_done: no corpus session is blocked (vacuous, disclosed)
```

Vacuous as declared (unattributed rows
carry no owner fn). Corroboration instead:
scoreboard diff = exactly 19 sessions,
all null→env:config-path@0, RNG-full
19/19 (e.g. 4893/32559→32559/32559), zero
other rows touched; live `show` on
Rogue-50059025: RNG 32559/32559, first
diff row 4 col 12 = tmp path only. No
FORCE/DIAG/seed/coords in the `js/`
hunks. Rule #2 clean (window rulecheck).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
