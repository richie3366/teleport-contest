# Review 1612 — 12de9b19 — date.c populate_nomakedefs whole-body port (D-2653)

**Metadata:** SHA `12de9b19`, `date.c` `populate_nomakedefs`, D-2653.
JS: new C-home `js/date.js` (+187) + `js/version.js` (+24: hook +
`:842` wire) + `js/pager.js` (+5: side-effect import). No prior
review claimed closed (1494 named populate as omitted — now live;
no stamp needed, nothing addressed).

## Intent vs deliverable

Subject promises: whole-body port with per-arm cites, pinned-literal
date parse, Date.UTC build_time, 12 fields in global.h order with
`>>> 0`, git arms → null, dummies deliberately not copied,
`mdlib.c:842` caller wired via hook. Diff delivers all of it.
Promise matches deliverable.

## Inventory

- `populate_nomakedefs(version)` (date.js:107, sync, exported) — C
  `date.c:51–131` (81 L).
- File-local: `extract_field` (`:44–49`), `case_insensitive_comp`
  (hacklib.c:921–937), `md_ignored_features` (mdlib.c:235–242),
  `bannerc_string` (mdlib.c:348–370), `interimVersionInfo`
  (make_version stand-in), `nomakedefs_populated` guard (`:23`).
- version.js: `PINNED_BUILD_DATE` export (was const),
  `__setPopulateNomakedefs` hook + `:842` call in
  `runtime_info_init` (C order :839/:841-via-interim/:842/:843/:844
  kept); pager.js side-effect import on the do_runtime_info path.
- `sym.mjs populate_nomakedefs`: live sync export ✓. No deleted
  symbol, no clone→import re-point.

## C ↔ JS fidelity

C loci read here in full: `populate_nomakedefs :51–131` (quoted
above), `md_ignored_features :235–242`, `bannerc_string :348–370`.
No RNG either side. Confirm:

- Extract offsets (year 4,7 / mon 3,0 / mday 2,4 / hour 2,12 /
  min 2,15 / sec 2,18), space-skip mday, month loop with
  no-match→Jan default, `:85` length gate ✓ all exact.
- `case_insensitive_comp`: ASCII-only lower, uchar compare,
  `u1-u2`, NUL termination ≡ C `:921–937` ✓ (verified CLONE of a
  hacklib static — correct locality).
- `md_ignored_features` ≡ `(1<<19)|SFCTOOL_BIT` byte-equal to C ✓
  (live const.js import).
- `bannerc_string`: 9-space lead, `Version %s MacOS%s, built %s.`
  ≡ C format; subbuf "" (no PORT_SUB_ID, PC-only), no Beta/WIP
  (RELEASED), "built" (date_via_env FALSE) — all three contest
  resolutions cited with loci ✓.
- `ignored_features`/`version_number`/`features`/`sanity1` values
  identical to the files.js:849–859 pins (same formulas, same
  generated counts) — interim and pins agree today, converge on
  the make_version row ✓.
- mktime→`Date.UTC/1000`: contest pins UTC (001 patch), recorder
  TZ=UTC ⇒ mktime == timegm; Date.UTC is zone-independent
  (Rule #2 safe in Node/Chrome) ✓. Probe asserts build_time
  1777723200 AND version_id byte-equal to the recorded C
  `#version` screen — C-observed equality, the strongest
  verification of the nine SHAs.
- Git arms → null with readers null-tolerant (`?.`/`??` at
  botl.js:1935/1958) ⇒ populating changes no observed value;
  1987 dummies rightly not copied ✓. `dupstr`≡assignment noted
  per site, no helper — right call.
- OMITs named with cites: free_nomakedefs (own remainder),
  make_version (interim collapses on its row), `__DATE__`-absent
  `#else` (compiled out), NETHACK_GIT_* (compiled out), May-3
  banner (version.c/askname path, untouched).
- Degenerate-only narrowings, not filed: parseInt→NaN vs atoi→0
  on non-numeric input (pinned literal all-numeric); Snprintf cap
  absent on banner returns (strings short).

## Hallucinations / overclaim

None. "Byte-equal to recorded C screen" is a measured probe claim,
not self-comparison. No dispatch-over-stub (sole boundary calls go
through the hook to live version.js functions).

## Density

Breadth phase: 187-line new C-home for an 81 L C function +
callees + caller wire — one function family, right-sized.

## Verification

D-log Verify bullet claims PASS + full 44/44 + probe 12/12.
Re-measured here: `hidden-proxy.mjs verify populate_nomakedefs
--base 12de9b19~1 --reach-all` → 0 blocked both sides (vacuous
note quoted verbatim, correctly labeled) + smoke 24/24 REACH-OK,
no REGRESSED. Claim true. Diff grep: no FORCE/DIAG/getRngLog/
seed/coordinates/fastforward.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
