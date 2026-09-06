# Review 874 — ccd53519 — role.c role-select parsers (D-1904)

Metadata: SHA `ccd53519`, D-1904. Files: `js/roles.js` (+~150:
`ROLE_FILECODES`, `randomstr`, 4 `str2*`, `validrole`,
`role_gendercount`, `race_alignmentcount`),
`js/player_selection.js` (+~230/−40: `init_role_flags_from_rc`
rewrite, `setrolefilter` rewrite, `promptsep` /
`root_plselection_prompt` / `build_plselection_prompt` + `grstate`,
`genl_player_setup` wiring). Next index 874.

Intent vs deliverable: subject promises the four parsers, the
filter chain, and both prompt builders in C order. The diff
delivers exactly those, nothing else. Promise ≡ diff.

Inventory: 7 new exports (roles.js) + 2 (prompts); 4 locals
(`randomstr`, `ROLE_FILECODES`, `grstate`, `promptsep`); 3
functions re-pointed onto C order (`init_role_flags_from_rc`,
`setrolefilter`, the Shall-I-pick prompt). Callee closure: every
callee LIVE — `ok_align`/`ok_race` (pre-existing same-file),
`s_suffix` (`do_name.js:383` — import, not clone #8 ✓),
`strsubst`/`strstri` (`hacklib.js`), `shall_i_pick_prompt`/`f()`
(same-file). No RNG anywhere in the envelope (matches C).

**C ↔ JS fidelity**: `str2role` ≡ `role.c:746–775`, `str2race`
≡ `:812–841`, `str2gend` ≡ `:879–904`, `str2align` ≡ `:942–967`
— prefix-on-name then exact-`strcmpi`-on-filecode then
`*`/`@`/random-prefix, roles-before-random, `ROLE_GENDERS`/
`ROLE_ALIGNS` loop caps that strand neuter/group and the law/
balance/chaos names, all preserved; `slice(0,len)` compare is
`strncmpi(...,len)`-exact including overlong-input mismatch ✓.
`ROLE_FILECODES` order matches `roles[]` declaration order
(Arc..Wiz verified). `validrole` ≡ `:712–716`; `role_gendercount`
≡ `:1398–1412` bit-for-bit; `race_alignmentcount` ≡ `:1414–1428`
plus a JS range guard where C is caller-guaranteed (safe).
`setrolefilter` ≡ `:1283–1300` (chain, RANDOM excluded, 1/0) ✓;
`promptsep` ≡ `:1383–1396` ✓; `root_` walked against
`:1430–1580` arm-by-arm (alignnum reassignment, `aligncount>1`
placement, gender/race/role/fallback arms, dead `rolenum==NONE`
noun ternary faithfully copied, `buflen>len+1` tail) ✓;
`build_` ≡ `:1583–1656` — and the subtle one is right: C's
`p[17]=='\0'` end-anchored priest/priestess check ≡ JS
`tail === "priest/priestess'"` because `strstri` returns the
match-to-end tail ✓. `init_role_flags_from_rc` keeps results
verbatim per `options.c:3605` (RANDOM passes) ✓. Two nits, not
C-wrongs: `root_` drops C's `!suppliedbuf||buflen<1` head guard
(callers always pass real buffers); review-range comments drift
by a line (`dohistory`-style `:746–775` etc. all match `csym`).

Hallucinations / overclaim: none. Vacuous verify labeled as such.

Density: ~380 insertions over two files but one C locus family
(role.c role-select) with map + probes in-commit — dense, not
scattered.

Verification: D-log gates PASS (green + strict ×2, cohort 7/7;
`skip full` claimed no shared file — roles.js/player_selection
are startup-shared, but full 44/44 is re-attested two commits
later at D-1906/D-1907, and boot itself exercises these paths).
Re-measured: `verify str2role --base ccd53519~1` → 0 blocked
(0/0), vacuous as stated. Diff grep: no banned patterns.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
