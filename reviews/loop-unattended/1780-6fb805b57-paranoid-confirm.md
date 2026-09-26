# Review 1780 — 6fb805b57 — optfn_paranoid_confirmation (D-2821)

- SHA: `6fb805b57` (coverage; confirmation-set parser)
- Files: `js/options.js` `paranoia` `:1250`, `paranoiaNofoo` `:1280`, `rcEnsureParanoiaDefault` `:1614`, `optfn_paranoid_confirmation` `:1632`; three `parseNethackrc` call sites
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: 0 hits in the hunk. `imports.mjs --rulecheck` on the working tree: "Rule #2 clean".
- `imports.mjs --can options.js botl.js config_error_add`: `ALREADY`.

## Intent vs deliverable

Subject promises one `optfn_paranoid_confirmation`, a `paranoia[]` that keeps the flagmask-0 `"none"` row in front of `"all"`, and the init default applied on the rc flags bag before a relative `+`/`-`. The diff adds that function, the table fields, `rcEnsureParanoiaDefault`, and the three rc call sites. `config_error_add` stays the empty sink. The menu handler was already `handler_paranoid_confirmation`.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `optfn_paranoid_confirmation` | C body, sync | `options.c:2817–3043` `staticfn` |
| `paranoia[]` | file table | `options.c:136–182` |
| `paranoiaNofoo` | local helper for the `lowc` boolean | `options.c:2971–2974` |
| `rcEnsureParanoiaDefault` | local; `initoptions_init` default | `options.c:7173` |
| `handler_paranoid_confirmation` | existing async | `options.c:5952–6008` |
| `config_error_add` | imported no-op `botl.js:1152` | error text discarded |
| `mungspaces` | imported `getline.js:1348` | collapse whitespace |
| `match_optname` | same file `:7273` | `options.c:6760–6771` |

`csym --callers` prints 0 references. The slot is `optlist.h:556` `NHOPTC(paranoid_confirmation, ...)`, and `allopt` `:6976` stores the function. `doset` `:6580` awaits `doset_optfn_do_handler`, which calls the handler when the name is `paranoid_confirmation` (`:2588`).

`sym.mjs`:

```
optfn_paranoid_confirmation js/options.js:1632   sync
config_error_add js/botl.js:1152   sync
handler_paranoid_confirmation js/options.js:1570   ASYNC — await required
```

## C ↔ JS fidelity

`do_init` returns `optn_ok` and does not write bits (`:2847–2848`). The default `PARANOID_PRAY | PARANOID_SWIM | PARANOID_TRAP` is `initoptions_init` `:7173` (`0x0020 | 0x0400 | 0x0800`). `jsmain.js:123` stores that on a new game. `rcEnsureParanoiaDefault` writes it only when the rc bag's field is still `null`, before `do_set`, so `+quit` ORs onto the default and a bare `quit` still clears first.

`do_set`. `strncmpi(opts, "prayconfirm", 4)` is `optStrncasecmp`. A nonempty `op` is `optn_silenterr`. `COMPLAIN_ABOUT_PRAYCONFIRM` is on (`options.c:20`), so the deprecation `config_error_add` runs and then the value becomes `+pray` or `-pray` and `opt_negated` is cleared. `!paranoid_confirm` with an empty value zeroes the bits and returns; a value is `silenterr`. A bare name with an empty value is `silenterr`.

`mungspaces`, then if the first character is not `+` or `-` the bits are cleared. Otherwise `plus_or_minus` is set, `opt_negated` becomes "the first character was `-`", and one optional space is skipped. Each token: a leading `!` (and one space) sets `fld_negated`. Otherwise `paranoiaNofoo`.

C `:2971–2972` is `lowc(op[2] != 'n' && lowc(op[2]) != '\0')`. `&&` is 0 or 1. `lowc` (`hacklib.c:82–86`) returns that byte unchanged when it is not `A`–`Z`, so the call is the boolean. JS `c2 !== 'n' && lowc(c2) !== '\0'` is that boolean. `"none"` stays the word none (`op[2] == 'n'`). `"nofoo"` skips two characters. `"NONE"` has `op[2] == 'N'`, so both sides treat it as `no` + `NE`, not as the word none.

`match_optname` on `argname`/`argMinLen`, then the synonym. Flagmask 0 is `"none"`: clear only when `plus_or_minus` is false. Otherwise negate clears the mask and a positive token ORs it. `"all"` is `~0`, so `|=` sets every bit and `&= ~mask` clears every bit. No match is `silenterr` after earlier tokens have already stuck. The next token starts after the space. Then `optn_ok`.

The table order and masks match `flag.h:83–95` and `options.c:149–181`, including `"none"` (min 4) before `"all"` (min 3). The menu and `get_val` loops stop at flagmask 0, so `"all"` is not a menu row.

`get_val` / `get_cnf_val`: append `" "` + `argname` for each set bit, hide `PARANOID_BONES` unless `wizard` or `get_cnf_val`, skip the leading space, or `"none"`, cut at `BUFSZ - 1`.

`do_handler` is not inside the optfn. `doset_optfn_do_handler` awaits `handler_paranoid_confirmation`, which walks flagmask ≠ 0, skips bones when not wizard, and on a non-cancel rebuilds the bits from the picks. The `'m'` substitution in the swim explanation stays the named omit.

## Hallucinations / overclaim

The subject says the optfn follows that C order and the error sink discards text. `config_error_add` returns without storing the string (`botl.js:1152`). The bit updates and the `silenterr` returns still happen. `parseNethackrc` not stripping a leading `no` is outside this function; the optfn itself accepts `"nofoo"`.

## Density

One option function, its table, and the rc callers in the same file. The menu body was already present.

## Verification

Re-run on this SHA: `node scripts/hidden-proxy.mjs verify optfn_paranoid_confirmation --base 6fb805b57~1 --reach-all`.

```
verify optfn_paranoid_confirmation: baseline 6fb805b57~1 (scoreboard at 678f36702) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke optfn_paranoid_confirmation: no RNG-tagged reach; fixed smoke spread (12 run, 3.5s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note, not a false PASS. No `REGRESSED` session. D-2821's green, strict, cohort, and full 44 were not re-run here.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
