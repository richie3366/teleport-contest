# Review 1948 — 080c16023 — version.c getversionstring buf/bufsz port (D-2988)

## Metadata

- Full / short hash: `080c160233fec3ab234bc3b76058e5f55d5353a2` / `080c16023`
- Parent: `05a11d7e9` (D-2987 part 2, review 1947 ACCEPT).
- Author, date: debian (Co-authored-by Cursor), 2026-09-27 20:33:15 +0200
- D-id: **D-2988**
- Stats: `js/version.js` +83/−17, `js/earlyarg.js` +2/−1, `js/pager.js`
  +3/−3. `js/` insertions **~88**. Band 80–350.
- Claims to close: coverage row `version.c getversionstring` (0 blocks).

## Intent vs deliverable

Subject promises: `getversionstring` builds the long version line in C
order. Body promises buf/bufsz args, embedded-NUL stop, non-NULL-empty
git handling via `!= null`, inlined `eos` + `Snprintf` size math with
`c++`-before-write, version.js staying import-free (D-1881).

Diff actually adds: restarted `getversionstring(_buf, bufsz)` with local
`eosIndex` + `snprintfAppend`, `VERSION_BUFSZ`, `NH_*`/`RUNTIME_PORT_ID`
consts, and three call-site updates (earlyarg, doextversion, doversion).
Promise matches deliverable.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `getversionstring` | LIVE repaired | restart, `js/version.js:174`, sync |
| `eosIndex` | CLONE kept | TDZ-forced, verified below |
| `snprintfAppend` | local helper | inlined `nh_snprintf` size math, no C symbol |
| 3 call sites | LIVE repaired | new `(buf, BUFSZ)` signature |
| `RUNTIME_PORT_ID` arm | compiled out | `windconf.h:77` WIN32-only; D-entry named |
| `git_branch` arm | compiled out | `NH_DEVEL_STATUS == NH_STATUS_RELEASED`, `patchlevel.h:25,33` |

`node scripts/sym.mjs eos`:

```
eos              js/hacklib.js:216   sync
```

No symbol deleted or re-pointed. `--can version.js hacklib.js eos`:
**SAFE** (hoisted function) — but the clone stands on the TDZ read, not
the cycle: `js/const.js:21` imports `COMMIT_NUMBER` from version.js and
`js/const.js:33` reads it at top level in a template literal, so a
version.js → hacklib.js → const.js edge breaks version-first entries.
Clone is TDZ-forced and legitimate. Diff grep
`FORCE|DIAG|getRngLog|fastforward`: 0. Rule #2 clean.

## C ↔ JS fidelity

C locus: `node scripts/csym.mjs getversionstring` →
`nethack-c/upstream/src/version.c:34-79` (46 lines). Callers: `end.c:559`,
`report.c:320`, `version.c:163`, `:191`, `:287` (+ proto).

Branch walk:

- `:37` Strcpy → `out = id.slice(0, eosIndex(id))`; embedded NUL stops.
  `_buf` contents ignored = overwrite. Match.
- `:44–49` `p`/`dotoff`/`Strcpy(p," (")` → `:213–216`. Match.
- `:50–55` RUNTIME_PORT_ID → `if (false)` shape with cite; compiled out
  here (windconf.h WIN32-only). Match-by-naming.
- `:56–68` git arms → `!= null` pointer checks (`GIT_*` are `null` at
  `js/version.js:35–37`), comma from `c` then `c += 1` **before**
  `snprintfAppend` — `c++` evaluated even when the write truncates. Match.
- size math: `nh_snprintf` (`hacklib.c:854`) is a `vsnprintf(str, size)`
  passthrough, so max chars = `(bufsz−len)−1−1`; JS `size =
  (limit−len)−1`, `maxChars = size−1`. Exact. Wrap arm (`len ≥ limit`)
  appends whole text; unreachable at BUFSZ 256. Sane.
- `:69–73` `c ? ")" : *p=0` → `:243–247`. Match. `:74–76` dot restore →
  `:248–250`. Match. `:78` return → `:251`. Match.

Callers: `version.c:163` doversion → `pager.js:2983` ✓; `:191`
doextversion → `pager.js:2918` ✓; `:287` early_version_info (with `:285`
"test" fill) → `earlyarg.js:172–173` ✓. `end.c:559` sits in
`dump_everything` (`:542`, `in_dumplog` gate — DUMPLOG retired D-1776)
and `report.c:320` in `submit_web_report` (crash reporter, unported);
both unwired by subsystem retirement, not by miss. Old zero-arg callers
would still work (`bufsz == null` → 256), so no breakage either way.

No RNG in C; none in JS.

## Hallucinations / overclaim

None. The "c++ separator increments even when the write does not fit"
claim is real in the code (`c += 1` precedes the append).

## Density

§2b: whole 46-line C function + all portable callers, ~88 JS lines.
Right size.

## Verification

D-log: vacuous hidden note (0 blocks) + REACH-OK + green/strict/cohort,
full skipped (no shared file). Re-ran:

```
verify getversionstring: baseline 080c16023~1 ... 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke getversionstring: no RNG-tagged reach; fixed smoke spread (12 run, 3.6s): 12 PASS, 0 regressed → REACH-OK
```

Honest vacuous + REACH-OK, no REGRESSED. Claim holds.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
