# Review 1745 — 6864eb3d8 — optfn_gender family (D-2786)

- SHA: `6864eb3d8` (gender/race/role/alignment optfns, D-2786)
- Files: `js/options.js` (+450), `js/player_selection.js` (export filters + `rolefilterstring`)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: 0 hits. `imports.mjs --rulecheck`: "Rule #2 clean" (this audit).

## Intent vs deliverable

Subject promises the four optfns plus `parse_role_opt`, `saveoptstr`,
`getoptstr`, `opt2roleopt`, `get_cnf_role_opt`, and `rolestring`, and
the filter helpers exported from one `rfilter`. Diff delivers that,
rc do_init / do_set sites that also copy `init*` onto the rc bag, and
`allopt.optfn` wiring.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `optfn_gender` | C body | `options.c:1776–1812` |
| `optfn_race` | C body | `:3506–3542` |
| `optfn_role` | C body | `:3588–3624` |
| `optfn_alignment` | C body | `:884–919` |
| `parse_role_opt` | C body, local | `:7904–8016` |
| `rolestring` | macro expansion, local | `:72–73` (`none` is `"(none)"`, `randomrole` is `"random"`, `:124`) |
| `saveoptstr` / `getoptstr` / `opt2roleopt` / `get_cnf_role_opt` | C bodies, local | `:757–772`, `:733–754`, `:714–730`, `:8019–8033` |
| `rolefilterstring` | imported | `role.c:1316–1355` |
| `clearrolefilter` / `setrolefilter` | imported, now exported | existing `rfilter` |
| `nmcpy` | existing clone, still wrong | `options.c:6859–6871` (review 1742) |

`sym.mjs`:

```
optfn_gender     js/options.js:4255   sync
parse_role_opt   NOT EXPORTED — 1 LOCAL at js/options.js:4171
rolefilterstring js/player_selection.js:120   sync
clearrolefilter  js/player_selection.js:79   sync
setrolefilter    js/player_selection.js:94   sync
rolestring       NOT EXPORTED — 1 LOCAL at js/options.js:4071
saveoptstr       NOT EXPORTED — 1 LOCAL at js/options.js:4126
nmcpy            NOT EXPORTED — 1 LOCAL at js/options.js:3781
```

## C ↔ JS fidelity

Each optfn: `do_init` → `optn_ok`. `do_set` calls `parse_role_opt`;
false → `optn_silenterr`. If `*op != '!'`, `str2*` into `initgend` /
`initrace` / `initrole` / `initalign`; `ROLE_NONE` → `config_error_add`
+ `optn_err`; else `saveoptstr` of `rolestring`. Gender also sets
`flags.female`. Race also stores `*op` in `pl_race`. Role also
`nmcpy(pl_character, op, PL_NSIZ)`. get_val is `rolestring` of the
init field (0 when unset). get_cnf_val is `get_cnf_role_opt` or the
literal `"none"`. No RNG.

`parse_role_opt` matches the loop: `string_for_env_opt`, `mungspaces`,
skip spaces, toggle on `!` / `no` / `no-`, reject empty, reject mixed
negation and a second positive token, split on space, negation filter
via `clearrolefilter` / `setrolefilter` / `rolefilterstring` and
`opp = "!"`, positive path `saveoptstr` of the raw token. `rolestring`
matches the macro, including `"(none)"` / `"random"`. `rolefilterstring`
uses `!%.3s` for roles and full nouns/adjectives otherwise; the gender
loop is `length - 1` (C `SIZE(genders) - 1`).

**C-wrong:** C `parseoptions` sets `duplicate` (`:621`) before the
optfn. `parse_role_opt:7987` returns false when that flag is set and
the saved string starts with `'!'`. The new rc arms call the optfns
directly and never assign `duplicateOpt` (`js/options.js:2441–2467`
and the valueless sites). A later positive `role`/`race`/`gender`/
`align` in the same phase after a `!` filter is rejected in C and
accepted in JS.

`optfn_role` calls the review-1742 `nmcpy` (comma not a terminator).
Same family, already Must-fix. `config_error_add` and
`complain_about_duplicate` still do not print (named).

## Hallucinations / overclaim

"Whole-body" holds for the four optfns and `parse_role_opt`'s loop.
It does not hold for the `duplicate` input that loop reads. "nmcpy
are the live exports" is the comma-blind clone, not `options.c:6859`.

## Density

~484 lines for four 37-line optfns plus `parse_role_opt` (113 lines)
and the helpers. In the raised band. One missing caller flag, not an
omitted arm of the optfn switch.

## Verification

Re-ran `node scripts/hidden-proxy.mjs verify optfn_gender --base
6864eb3d8~1 --reach-all`:

```
verify optfn_gender: baseline 6864eb3d8~1 (scoreboard at 310accbad, 2026-09-25T16:10:15.463Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify optfn_gender: no corpus session is blocked on it at 6864eb3d8~1 — a vacuous verify is NOT a corpus PASS. …
smoke optfn_gender: no RNG-tagged reach; fixed smoke spread (1 run, 1.3s): 1 PASS, 0 regressed → REACH-OK
```

0 blocks cited. No REGRESSED session. The duplicate gap is not on a
corpus path.

## Actionable C-wrongs

1. `parseNethackrc` role/race/gender/align do_set arms must set
   `duplicateOpt` from `duplicate_opt_detection` before the optfn,
   as `parseoptions` `:621` does, so `parse_role_opt` `:7987–7990`
   rejects a positive value when the same-phase saved string starts
   with `'!'`.

Verdict: **QUALITY-RISK**
