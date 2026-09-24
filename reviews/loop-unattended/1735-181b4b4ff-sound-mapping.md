# Review 1735 — 181b4b4ff — sound mapping + filename (D-2776)

- SHA: `181b4b4ff` (`sounds.c` add_sound_mapping + base_soundname_to_filename, D-2776)
- Files: `js/sounds.js` (+261/−1), `js/options.js` (+6/−3, three `export` keywords), docs
- Queue rows: two Open coverage rows (MISSING), 0 corpus blocks cited
- Banned grep: 0 hits. `imports.mjs --rulecheck`: "Rule #2 clean" (re-run this audit).

## Intent vs deliverable

Subject promises both whole bodies with measured sscanf emulation.
Diff delivers: `sscanf_sound_mapping` (four-pattern emulation),
`add_sound_mapping`, `base_soundname_to_filename`, module `sounddir` /
`soundmap` state, `sff_*` consts, always-false `can_read_file`, three
re-exports from options.js, and the new import. Deliberately unwired
(contest C compiles out the caller) — correct per the D-2393 lesson.

## Inventory

| JS symbol | Class | C (csym range) |
|-----------|-------|----------------|
| `sscanf_sound_mapping` (new, local) | C sscanf semantics | `sounds.c` patterns `:1568–1577` |
| `add_sound_mapping` (new, export) | C body | `sounds.c:1555–1626` |
| `base_soundname_to_filename` (new, export) | C body | `sounds.c:2083–2152` |
| `can_read_file` (new, local) | NAMED (Rule #2, map) | `cfgfiles.c:1442–1446` (`access(2)`) |
| `regex_init/compile/free` (newly exported) | LIVE (behavior-neutral) | posixregex.c ports |
| `msgtype_parse_add` (imported) | LIVE (pre-existing export) | `options.c:7843–7866` |

Nothing deleted or re-pointed. `sym.mjs`: `msgtype_parse_add`
`options.js:366`, `regex_compile` `:269`. New imports are called at
runtime only (no top-level TDZ read) — the `--can` SAFE claim holds
by inspection.

## C ↔ JS fidelity

Build guards verified first: USER_SOUNDS spans `:1539–1691`
(`add_sound_mapping` inside ✓); AUTOMAP ends `:2081`
(`base_soundname_to_filename` outside both ✓); `-DUSER_SOUNDS`
only in xcodeproj/multisnd1-hints/windows makefiles, and the
recorder build uses linux/minimal hints ✓ — contest C compiles
only the second function, whose callers are Windows-only. Leaving
both exports unwired matches C.

sscanf emulation re-derived by hand against libc semantics (not just
trusted from the D-log): literal `MESG` anchor ✓; format-space as
zero+ `isspace` ✓; `%255[^"]` as `{1,255}` ✓; `%*[\t ]` as strict
`[ \t]+` ✓; `%d` as `[+-]?[0-9]+` with `| 0` storage ✓; trailing
garbage ignored ✓; `||` order preserved ✓. The two subtle claims
check out: the first-msgtyp-char whitespace exclusion is *required*
for equivalence (C's space directive is greedy without backtrack,
so a regex without it would misfire `msgtyp=' '` on P1-shaped
lines); and whenever the backtracking regex matches, C's greedy
take provably matches too (a shorter take can only end at a
consumed non-quote char, so C's greedy take reaches the same
quote). P1/P4 `msgtyp=""` holds: P2/P3 either never run or fail
before writing on P4-shaped input; partial residue only reaches
the dead `:1620` arm ✓.

Remainder walked: sounddir default ✓, 256-guard ✓, filespec ✓,
`idx>=0` short-circuit ✓, node shape/order (next captured, prepend
at `:1613`) ✓, `regex_compile` fail arm with live return ✓,
`%.10s "%.230s"` + ignored `msgtype_parse_add` return ✓, all four
returns live with outputs named ✓. Filename function: null-buf
arm ✓, havedir slash test (`/` or `\`) incl. empty-dir leading
slash ✓, `!baselen || consumes > cap || existinglen >= cap` ✓,
`#if 0` block cited-not-ported ✓, both Snprintf arms as exact
concatenation (guard precludes truncation — re-checked the
arithmetic both ways) ✓, `sff_default`/`sff_baseknown_add_rest` →
null ✓. sff enum 0–3 matches `sndprocs.h:296–301` ✓. No RNG.

## Hallucinations / overclaim

None. "Contest C compiles none of it" and the SOUND-error-arm
`:1600–1605` routing both verified against the guards above.

## Density

~250 behavior lines for two C functions in the same file, both
whole: in range. Named omits (access, raw_print ×4 with live
returns, regex_error_desc, sound_matches_message, dispatch) are
in the map in this commit.

## Verification

Re-ran `node scripts/hidden-proxy.mjs verify add_sound_mapping
--base 181b4b4ff~1 --reach-all`: 0 blocked + vacuous note
(expected) + smoke 24/24 REACH-OK. Matches the D-log.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
