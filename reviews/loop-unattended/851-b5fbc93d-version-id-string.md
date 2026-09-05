# Review 851 — b5fbc93d — mdlib.c version_id_string + version.c doversion ('V' versionshort) (D-1881)

## Metadata

- SHA: `b5fbc93d` ("mdlib.c version_id_string + version.c doversion ('V' versionshort) (D-1881).")
- D-id: D-1881. Queue row: Open (version corpus owner), popped in order.
- Files: `js/version.js` (+101), `js/pager.js`, `js/cmd.js`, `js/getline.js`,
  docs + map + scoreboard.

## Intent vs deliverable

Subject promises: port the version-string family + wire the `V`
(versionshort) key end to end. Diff actually adds: four pure functions
in `version.js`; `doversion` + `getversionstring()` first line in
`doextversion` (pager.js); `versionshort` EXT_CMDS runner (getline.js);
`V` in repeat map/txt map/direct rhack arm (cmd.js). Promise kept.

## Inventory

| JS function | Status |
|---|---|
| `mdlib_version_string` | new port of C `mdlib.c` (`"%d.%d.%d"`) |
| `version_id_string` | new port of C `mdlib.c:315–344` |
| `version_string` / `getversionstring` | new ports of C `version.c` / `:34–79` |
| `doversion` (pager.js:1805, async export) | new port of C `version.c:155–165` |
| `V` bindings (cmd.js ×3, getline.js ×1) | wiring for C `cmd.c:1926` entry |

No deleted/re-pointed symbols (`sym.mjs` needed only for the new
`doversion` export — confirmed at pager.js:1805, async).

## C ↔ JS fidelity

- **`version_id_string`** (C `mdlib.c:315–344` via csym): RELEASED ⇒
  `statusbuf` empty; no `PORT_SUB_ID` on this port ⇒ `subbuf` empty;
  `PORT_ID "MacOS"` under `__APPLE__` (`global.h:192`) — JS matches all
  three. `"build"` vs `"revision"`: `date_via_env` is static FALSE,
  set TRUE only in the build-time tool (`makedefs.c:1800`), and the
  contest patch pins the date (`001-deterministic-runtime.patch:133`,
  `"May  2 2026 12:00:00"` unless an env override that cannot exist in
  this runtime) — hardcoding both is the compiled-C truth, and the
  measured C row confirms it byte-for-byte.
- **`getversionstring`** (C `version.c:34–79`): dot-strip → `" ("` →
  sha/branch/prefix arms → strip-back-if-empty → dot-restore. JS
  replicates the structure including the strip-back. The git_branch arm
  is comment-only in JS — correct, because C's `#if (NH_DEVEL_STATUS
  != NH_STATUS_RELEASED)` compiles it out of this build entirely; there
  is no branch arm in the C being ported. sha/prefix arms present with
  null data (named). With all data unset the output equals the input —
  verified by execution, not by reading (see below).
- **`doversion`** (C `version.c:155–165`): `menu_requested → doextversion`
  else `pline(getversionstring)`, `ECMD_OK`. JS identical, `return 0`.
- **Dispatch**: C `cmd.c:1926` `'V' versionshort … doversion,
  IFBURIED|GENERALCMD|CMD_M_PREFIX`, no AUTOCOMPLETE. JS EXT_CMDS entry
  (`getline.js:569`: `wiz:false, autocomplete:false, run→doversion`) and
  the three cmd.js sites match; no RNG, no turn (`move = 0`). Callee
  closure: `getversionstring` LIVE (version.js, pure — the new
  pager→version edge cannot cycle); `doextversion`/`doversion` LIVE;
  `pline` already imported. No STUB, no clone.

Measured, not inferred: `node -e` import gives
`MacOS NetHack Version 5.0.0 - last build May  2 2026 12:00:00.`
(double space after May) — byte-identical to the C symptom row.

## Hallucinations / overclaim

None. The D-log's smoke triple matches my own run exactly.

## Density

~140 insertions across 4 files, one C family (strings + command +
binding) with map + verify. Good §2b density.

## Verification

- Diff grep: no FORCE/DIAG/seed/coordinate content (version strings +
  dispatch only). `version.js` has zero imports — Rule #2 trivially clean.
- Re-measured myself: `node scripts/hidden-proxy.mjs verify
  version_id_string --base b5fbc93d~1` → `1 PASS → PROGRESS`
  (`...-614da9aa: PASS`). Matches the D-log exactly.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
