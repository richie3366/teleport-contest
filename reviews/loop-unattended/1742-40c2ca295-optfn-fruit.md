# Review 1742 — 40c2ca295 — optfn_fruit (D-2783)

- SHA: `40c2ca295` (`options.c` optfn_fruit whole-body port, D-2783)
- Files: `js/options.js` (+108/−30), docs
- Queue row: Open coverage (whole `optfn_fruit`), 0 corpus blocks cited
- Banned grep: 0 hits in the hunk. `imports.mjs --rulecheck`: "Rule #2 clean" (this audit).

**Addressed:** D-2790

## Intent vs deliverable

Subject promises a restart of `optfn_fruit` (`options.c:1706–1774`)
in C order, replacing `optfn_fruit_set`, plus a local `nmcpy` described
as "hack.h strncpy `n-1` + NUL". Diff adds `nmcpy`, `optfn_fruit`
(do_init / do_set / get_val), two `parseNethackrc` arms, the doset
getlin call, `simple_opt_get_val` via get_val, and `allopt` `optfn`.
`optfn_fruit_set` is gone.

## Inventory

| JS symbol | Class | C (csym range) |
|-----------|-------|----------------|
| `optfn_fruit` | C body | `options.c:1705–1774` |
| `nmcpy` | clone, **diverges** | `options.c:6859–6871` (staticfn in this file, not hack.h) |
| `string_for_opt` | existing local | `options.c:6664–6680` (sink omitted; this caller re-adds it) |
| `bad_negation` | existing no-op | `options.c:6693–6700` |
| `config_error_add` | imported no-op sink | botl export |
| `fruit_from_name` | imported | `objnam.c:442–519` (`*highest_fid` → `.fid`) |
| `fruitadd` / `mungspaces` / `sanitize_name` / `set_optbuf` | imported | live |

`csym --callers optfn_fruit`: 0 (function pointer, `optlist.h:339`).
`sym.mjs` (deleted name + new clone):

```
optfn_fruit      js/options.js:3805   sync
nmcpy            NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/options.js:3781
optfn_fruit_set  NOT FOUND in js/** (no export, no local function/const).
string_for_opt   NOT EXPORTED — 1 LOCAL at js/options.js:6239
bad_negation     NOT EXPORTED — 1 LOCAL at js/options.js:6252
config_error_add js/botl.js:1152   sync
fruit_from_name  js/objnam.js:1648   sync
fruitadd         js/options.js:3668   sync
mungspaces       js/getline.js:1348   sync
sanitize_name    js/bones.js:90   sync
```

## C ↔ JS fidelity

`do_init` returns `optn_ok`. `do_set` calls `string_for_opt(opts,
negated || !go.opt_initial)` (`:1717`). Negated + non-empty →
`bad_negation` + `optn_err`. Negated + empty → `goodfruit` with an
empty source, so `nmcpy` + `sanitize_name` land on "slime mold"
(`:1752–1754`) and skip `fruitadd` while `opt_initial`. Non-negated
empty → `optn_err` with no second message. Non-empty: `mungspaces`,
then if `!opt_initial` the `fruit_from_name(op, FALSE, &fnum)` /
`made_fruit` / `fnum >= 100` early `optn_ok` (prior name kept).
`goodfruit` then `nmcpy`, `sanitize_name`, empty→"slime mold",
`fruitadd` + `pline` only when `!opt_initial` and `give_opt_msg`.
get_val / get_cnf_val `Sprintf` `pl_fruit`. No `do_handler`. No RNG.

JS follows that order. `fruit_from_name` writes `highest_fid.fid`
(`objnam.js:1649–1654`), which is C's `*highest_fid`. Rc passes
`optInitial true`; doset getlin passes `false`. `give_opt_msg !== false`
matches the static TRUE at `options.c:108`.

**C-wrong:** C `nmcpy` (`:6865–6870`) copies while `count < maxlen`
and stops **before** a comma or NUL, so the comma is not stored.
JS `slice(0, n-1)` keeps commas. `fruit:apple,banana` becomes
`apple` in C and `apple,banana` in JS. The subject calls this
"hack.h strncpy"; pinned C has no such macro. `nmcpy` is
`options.c:6859–6871`.

`bad_negation` and `config_error_add` still do not print (named in
`startup.md`). Control returns match. `pline` is not awaited (named).

## Hallucinations / overclaim

"hack.h strncpy" is false. "Whole-body" is true for `optfn_fruit`'s
branches and false for the callee `nmcpy`, which the subject presents
as a matched helper.

## Density

~108 JS lines for a 70-line C function plus the helper and three
call sites. In range. The comma stop is not a named omit.

## Verification

Re-ran `node scripts/hidden-proxy.mjs verify optfn_fruit --base
40c2ca295~1 --reach-all`:

```
verify optfn_fruit: baseline 40c2ca295~1 (scoreboard at 88a3ddc8f, 2026-09-25T15:46:14.759Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify optfn_fruit: no corpus session is blocked on it at 40c2ca295~1 — a vacuous verify is NOT a corpus PASS. …
smoke optfn_fruit: no RNG-tagged reach; fixed smoke spread (1 run, 1.3s): 1 PASS, 0 regressed → REACH-OK
```

0 blocks were cited. Smoke is one cached recording (REACH-OK, no
REGRESSED). D-log's 24/24 is this environment's missing recordings,
not a WORSE row.

## Actionable C-wrongs

1. `js/options.js` `nmcpy` must match `options.c:6859–6871`: copy at
   most `maxlen-1` chars and stop before `','` or `'\0'` (do not keep
   the comma). `optfn_fruit` is the live caller.

Verdict: **QUALITY-RISK**
