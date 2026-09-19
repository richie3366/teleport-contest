# Review 1517 — 90ae7d1d — version.c doextversion (D-2558)

## Metadata

- SHA: `90ae7d1d`
- D-id: D-2558. Next index: 1517.
- Files: `js/pager.js` (+164/−67: restarted
  `doextversion`, file-local `strip_newline` +
  `insert_rtoption` + `LUA_COPYRIGHT_JS`,
  `do_runtime_info` import join, hardcoded
  `doextversion_runtime_lines` deleted).
- C locus: `nethack-c/upstream/src/version.c:168–277`
  (`doextversion`, 110 L; `csym.mjs` range) plus
  `insert_rtoption` `:338–353`, `strip_newline`
  (`hacklib.c:180–190`, read directly), both C
  callers (`pager.c:2792`, `version.c:161`).

## Intent vs deliverable

Subject promises: the whole `#version` body in C
order over live `do_runtime_info` with both C
callers wired. Diff delivers that, replacing the
old hardcoded 38-line list with the live loop.
Promise matches deliverable. No RNG of its own
(`get_lua_version_shuffle` at entry, as before —
no behavior change); version-split and loop arms
in C positions.

## Inventory

- New/restarted: `doextversion()` (exported
  async), `strip_newline(s)`, `insert_rtoption(buf)`
  (both file-local sync — C staticfns stay local),
  `LUA_COPYRIGHT_JS` const.
- Callees, all LIVE: `getversionstring`,
  `do_runtime_info` (version.js, ALREADY-edge
  join), `strstri`/`strsubst`, `COLNO`/`BUFSZ`,
  `ECMD_OK`, pre-existing file-local `tabexpand`
  (`sym.mjs`: single local clone in pager.js —
  reused, no clone #2), `show_text_pages`.
- Deleted-symbol audit (`sym.mjs`, required):
  `doextversion_runtime_lines` NOT FOUND anywhere
  in `js/**` — clean removal, no dangling refs.

## C ↔ JS fidelity

`doextversion` vs C `:168–277`, in order:

- `:182–183` OPTIONS_AT_RUNTIME (force-defined
  `version.c:13–15`, verified) → `use_dlb =
  false`, `done_rt = false` ✓; dlb arms
  (`:206–214`, `:237–241`, `:272–273`) kept as
  dead branches — named ✓.
- `:191–204` git-info split (`COLNO`,
  `lastIndexOf('(')`, space-before +
  not-`x` guards, `extra = ' ' + tail`) ✓,
  including the `(oi + 1)`-past-end edge (JS
  `undefined !== 'x'` ≡ C `'\0' !== 'x'`) ✓.
- `:236–270` loop shape exact: dlb-fgets dead
  arm / `do_runtime_info({i})` with `== null`
  exhaustion / break; `slice(0, BUFSZ-1)` ≡
  `strncpy` + NUL ✓; outdented-header separator
  + prolog/blank skip ✓; colon-line
  `insert_rtoption` ✓; `putstr` iff non-empty ✓.
- `insert_rtoption` vs C `:338–353`: lazy lua
  init, PATMATCH/LUAVERSION/LUACOPYRIGHT order,
  ci-test + cs-substitute, no early break ✓.
  `regex_id` verified `"posixregex"`
  (`sys/share/posixregex.c:52`) ✓; lua values
  byte-checked against the live 38-line dump
  per the D-log ✓.
- Callers: `hmenu_doextversion` (`pager.c:2792`)
  wired in-file (`pager.js:3144`), `doversion`
  menu_requested arm (`version.c:161`) wired
  (`pager.js:2965`) ✓. `return ECMD_OK` ✓.

**Gap (C-wrong 1, below):** `strip_newline`. C
truncates at the last `'\n'` (`*p = '\0'`,
tail dropped); JS splices the newline out
(`slice(0,end) + slice(i+1)`, tail kept). They
agree on trailing-newline input (the only shape
`do_runtime_info` emits today) but contradict C
on any interior newline (`"a\nb"` → C `"a"`,
JS `"ab"`). Fresh code in this SHA, un-named in
the map, one-line fix.

## Hallucinations / overclaim

One near-miss short of overclaim: the D-log
calls `strip_newline` "LOAD-BEARING" with the
right C cite, but the implementation keeps the
post-newline tail C drops. Not a dispatch/stub
issue — every callee is live.

## Density

One 110-line C function + 2 small staticfns,
one file, ~165 insertions. Right-sized per §2b.

## Verification

- D-log: `verify.mjs --fn doextversion` → PASS,
  honestly framed as `#version` path / 0-blocked.
- Re-run here: `hidden-proxy.mjs verify
  doextversion --base 90ae7d1d~1 --reach-all` →
  0 blocked both trees (vacuous, honestly
  reported) + smoke 24 PASS, 0 regressed →
  REACH-OK. Matches.
- `imports.mjs --rulecheck`: clean (re-run this
  iteration). Diff grep: no FORCE/DIAG/getRngLog/
  fastforward/seed gates or hardcoded coordinates.

## Actionable C-wrongs

1. `strip_newline` splice-vs-truncate
   (`js/pager.js`, new this SHA): return
   `str.slice(0, end)` per `hacklib.c:180–190`
   instead of re-appending `str.slice(i + 1)`.
   One-line fix, no caller changes (all current
   inputs are trailing-newline, so output is
   unchanged today — this pins the primitive to
   C before a multi-line entry exposes it).

Verdict: **QUALITY-RISK**

**Addressed:** D-2565
