# Review 1750 — 38d6c8a36 — duplicate before role optfn (D-2791)

- SHA: `38d6c8a36` (rc role/race/gender/align set `duplicate` before the optfn, D-2791)
- Files: `js/options.js` (+111), `js/player_selection.js` (+7/−3)
- Queue row: Must-fix from review 1745. 0 corpus blocks cited.
- Banned grep: 0 hits in the JS hunk. `imports.mjs --rulecheck`: "Rule #2 clean" (this audit).

Closes review 1745. That file already stamps `**Addressed:** D-2791 `38d6c8a36``.

## Intent vs deliverable

Subject promises `rc_do_set_role_family` sets `go.opt_initial`,
`go.opt_from_file`, and `duplicateOpt` from `duplicate_opt_detection`
before the four optfns, that `OPTN_SILENTERR` does not write the rc
bag, that `parseNethackrc` clears the duplicate counters at entry, and
that `rolefilterstring` returns a filter starting with `'!'`. Diff adds
that helper, rewires the eight valued and valueless arms, resets at
`parseNethackrc` entry, and changes the filter builder's seed from
`' '` to `''`. No symbol deleted.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `rc_do_set_role_family` | local glue for `parseoptions` `:502–505` + `:621–623` | not a C function |
| `duplicate_opt_detection` | existing clone | `options.c:6781–6787` |
| `reset_duplicate_opt_detection` | existing export | `options.c:6773–6780`; call `cfgfiles.c:1633` |
| `complain_about_duplicate` | existing no-op | `options.c:6790–6807` |
| `parse_role_opt` | existing body; reads `duplicateOpt` | `:7987–7990` |
| `rolefilterstring` | C body, prefix fix | `role.c:1316–1355` |

`csym --callers duplicate_opt_detection`: prototype `:352` and the one
call at `options.c:621`.

`sym.mjs`:

```
duplicate_opt_detection NOT EXPORTED — 1 LOCAL at js/options.js:6543
reset_duplicate_opt_detection js/options.js:6489   sync
rc_do_set_role_family NOT EXPORTED — 1 LOCAL at js/options.js:2370
rolefilterstring js/player_selection.js:120   sync
complain_about_duplicate NOT EXPORTED — 1 LOCAL at js/options.js:6558
parse_role_opt   NOT EXPORTED — 1 LOCAL at js/options.js:4369
duplicateOpt     NOT FOUND (module boolean, not a function)
```

At this SHA the helper is `:2367`, the detection call `:2375`, the
reset `:2394`, and the `duplicateOpt` read `:4295`.

## C ↔ JS fidelity

`duplicate_opt_detection` returns the pre-increment count and only
counts when both `opt_initial` and `opt_from_file` are set
(`:6784–6786`). JS `was !== 0` is that boolean. First sighting is
false; the second is true. The helper forces both flags, assigns
`duplicateOpt`, skips `complain_about_duplicate` because role, race,
gender, and alignment are in `OPT_DUPEOK_YES` (`:622` `dupeok`), calls
the optfn, then restores the three values. The per-row counter is not
restored, so a later line in the same file still sees the increment.

`parse_role_opt` on a positive token: if `duplicateOpt` and `preval`
starts with `'!'`, `complain_about_duplicate` and return false
(`:7987–7990`). The optfn turns that false into `OPTN_SILENTERR`. The
rc arms then leave `result.role` / `race` / `gender` / `align` alone.

`rolefilterstring`: `outbuf[0] = outbuf[1] = '\0'`, each hit
`Sprintf(eos, " !…")`, return `&outbuf[1]` (`:1321–1354`). JS starts
at `''`, appends `" !token"`, and `slice(1)`. A hit is `!Cav` (roles
`%.3s`) or `!noun` / `!adj`. Empty filter is `''`. The old seed `' '`
produced `" !Cav"`, so `*preval == '!'` was false and a second
same-phase negation cleared the filter. That prefix was part of the
1745 failure mode. Default `?` matches `Strcpy " ?"` then `&outbuf[1]`.
No RNG.

`read_config_file` also resets after `parse_conf_file` (same function,
`:1623–1647`). JS resets only at entry. The next `parseNethackrc`
entry clears again, and `duplicate_opt_detection` stays false unless
both flags are set, which the helper restores. Not a live second-file
miss.

## Hallucinations / overclaim

The duplicate assignment and the `'!'` prefix match the cited lines.
D-log cites match this SHA. "The `read_config_file` bracket" is the
entry reset only. Comma-separated `OPTIONS=` is still left to right.
C `parseoptions` `:513–519` recurses on the tail first, so
`role:!cav,role:val` applies `val` before the filter. The subject and
D-log say so. The map sentence for D-2791 does not. Pre-existing
walker, not a new arm.

This commit also replaces `hidden-corpus/scoreboard.json` (953
sessions, 614 PASS, stamp `086317c06`) with 12 PASS rows stamped
`802fa59b6`. Later SHAs keep that 12-row board. Not a JS C-wrong. The
parent baseline for this verify is still the full board.

## Density

~118 JS lines for the glue, eight call sites, and a 40-line prefix
fix. Must-fix, one item. In range for the glue plus the filter.

## Verification

Re-ran `node scripts/hidden-proxy.mjs verify optfn_gender --base
38d6c8a36~1 --reach-all`:

```
verify optfn_gender: baseline 38d6c8a36~1 (scoreboard at 086317c06, 2026-09-25T17:42:23.809Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify optfn_gender: no corpus session is blocked on it at 38d6c8a36~1 — a vacuous verify is NOT a corpus PASS. …
smoke optfn_gender: no RNG-tagged reach; fixed smoke spread (1 run, 1.3s): 1 PASS, 0 regressed → REACH-OK
```

Review 1745 cited 0 blocks. Baseline is the full board. No REGRESSED
session. Smoke is one cached recording.

## Actionable C-wrongs

None. The comma-list order stays the named D-log omission
(`options.c:513–519`). `config_error_add` and
`complain_about_duplicate` stay no-op sinks. `using_alias` is still
unset on the `character` / `align` aliases (complaint text only).

Verdict: **ACCEPT**
