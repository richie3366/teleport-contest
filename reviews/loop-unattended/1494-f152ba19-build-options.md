# Review 1494 — f152ba19 — mdlib.c build_options (D-2535)

## Metadata

- SHA: `f152ba19`
- D-id: D-2535. Next index: 1494.
- Files: `js/version.js` (+366, zero new imports).
- C locus: `nethack-c/upstream/src/mdlib.c:668–830`
  (`build_options`, staticfn, 163 L) + family `:90–104`,
  `:112–164`, `:184–232`, `:390–666`, `:800–872`.

## Intent vs deliverable

Subject promises: whole build_options family in C order
(MISSING → live) with every compiled-out arm named, plus a
reverted TDZ inversion. Diff actually adds: opttext state,
`build_savebones_compat_string`, 26-entry `build_opts`,
`window_opts`/`soundlib_opts` + count fns, `opt_out_words`,
`LUA_INFO`, `build_options`, `runtime_info_init`/
`do_runtime_info`/`release_runtime_info`, file-local `datamodel`.
Zero `+import` lines — the import-free invariant held. Promise
matches deliverable. No RNG in C; none added.

## Inventory

- New: `build_options` (exported sync `js/version.js:345`),
  `datamodel`/`runtime_info_init`/`do_runtime_info`/
  `release_runtime_info` (exported), five file-local helpers,
  five module tables/consts.
- No symbol deleted or re-pointed; no clone→import paste owed
  (nothing imported at all).

## C ↔ JS fidelity

`csym.mjs` body `:668–830` + family sections read in C:

- `:681–700`: savebones-compat build, STOREOPTTEXT, RELEASED
  `STATUS_ARG ""`, version line, header, `length = COLNO+1`,
  `datamodel(0) + " data model,"`. JS identical
  (`OPT_COLNO=80` local; `opt_indent` 4sp verified at
  `mdlib.c:104`). Confirm.
- `:701–712` build_opts loop with `(i < SIZE−1) ? "," : "."`.
  C indices preserved via the `null` `:597` live slot (reads
  the live compat var, so punctuation lands on the true last
  entry). 26 contest entries each cited per C line with the
  compiled-out set enumerated in one comment block. Confirm
  (order/punctuation; entry strings covered by the oracle
  below).
- `:716–747` winsys: count+validate, blank, header with
  `winsyscnt > 1` plural, fencepost loop, Oxford punctuation
  (`1: "." / 2: " and"+default / 3+: ", and"+default`),
  `cnt > 1 → with a default of "tty"`. JS matches. Confirm.
- `:751–795` soundlib section (USER_SOUNDS arms compiled out),
  same Oxford shape on `soundlibcnt`. `strncmp 9` strip of
  `soundlib_` prefix exact. Confirm.
- `:798–828` Lua block: LUA_INFO strings verified byte-equal
  against C (adjacent-literal pair folded into one entry —
  correct, C concatenation), NULL-terminated loop ≡ length
  loop, trailing blank line. `:TAG:` deferral named. Confirm.
- `opt_out_words` (`:640–666`, read in C): wrap past
  `COLNO−5`, STORE+indent vs space-separate. Empty-word and
  trailing-space behavior re-derived: C `str += len+(word?1:0)`
  lands on NUL either way; JS `pos = sp<0 ? len : sp+1`
  identical. C-exact. Confirm.
- `do_runtime_info` (`:848–861`, read in C): one-shot init,
  `idxopttext && rtcontext` gate, MAXOPT bound, `{ i }`
  holder for `int *`, null exhaustion. JS matches (undefined
  vs NULL past `idxopttext` is unobservable — callers stop at
  the first falsy). `release_runtime_info` resets the flag
  (`:870`); `make_version`/`populate_nomakedefs`/
  `free_nomakedefs` named (no JS save-compat reader).
  Confirm.
- `datamodel` (`hacklib.c:981–997`): all-five-match, retidx 0
  name else platform, `Unknown` fallthrough. Live sizes
  `[2,4,8,8,8]` consistent with the D-2530 gcc probe. Confirm.
- TDZ: first cut imported COLNO/datamodel, crashed on
  `const.js:33`-reads-`COMMIT_NUMBER`, reverted to locals —
  disclosed in the message with mechanism, and the diff proves
  the revert (zero imports). The right call; `imports.mjs
  --can` had flagged it pre-commit.

Callee closure: no imports at all — every callee file-local.
Omits (WIN32/GUILaunched, DLB, DUMPLOG, TIMED_DELAY,
USER_SOUNDS, VERSION_COMPATIBILITY, `eos`, save-struct fns,
`:TAG:`, trailing-space trim, doextversion rewire) each named
with C lines. No STUB in any live arm.

## Hallucinations / overclaim

None. The strongest claim (byte-equality) is backed by the
D-log's independent oracle: live opttext + probe-only
doextversion filter == hardcoded pager.js array AND all 3
recorded C `#version` screens (probe in /tmp, uncommitted —
method-correct). The 2-trailing-spaces trim is disclosed as a
deviation, not hidden.

## Density

One 163-line C function + its small family, +366 in one file.
Within §2b (200–800). Right-sized.

## Verification

- D-log: syntax (1 changed) · rule2 (seed-in-comment trip
  caught and reworded pre-ship — the gate worked) · hidden
  note (0 blocked) · smoke 24/24 · green 2/2 · strict ×2 ·
  cohort 7/7 · full 44/44 PASS → VERIFY: PASS, plus the
  /tmp oracle above.
- Re-run here: `hidden-proxy.mjs verify build_options
  --base f152ba19~1 --reach-all` → 0 blocked both trees
  (vacuous note, honestly reported) + smoke 24 PASS,
  0 regressed → REACH-OK. Matches.
- Global `imports.mjs --rulecheck`: clean (re-verified this
  iteration — the reworded comment holds).

## Actionable C-wrongs

None. No Must-fix, no CURRENT change.

Verdict: **ACCEPT**
