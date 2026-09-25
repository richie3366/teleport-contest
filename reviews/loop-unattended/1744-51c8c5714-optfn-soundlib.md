# Review 1744 — 51c8c5714 — optfn_soundlib (D-2785)

- SHA: `51c8c5714` (`options.c` optfn_soundlib, D-2785)
- Files: `js/options.js` (+144/−3)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: 0 hits. `imports.mjs --rulecheck`: "Rule #2 clean". `imports.mjs --can js/sounds.js js/options.js assign_soundlib`: "ALREADY: sounds.js already statically imports options.js." The three sounds callees live in `options.js` for that reason. Not a top-level TDZ.

## Intent vs deliverable

Subject promises `optfn_soundlib` plus `assign_soundlib`,
`get_soundlib_name`, and `soundlib_id_from_opt` on a nosound-only
table. Diff delivers those four, rc do_init and both do_set sites
(negation skipped), the doset column via get_val, and `allopt.optfn`.

## Inventory

| JS symbol | Class | C (csym range) |
|-----------|-------|----------------|
| `optfn_soundlib` | C body | `options.c:3823–3860` |
| `assign_soundlib` | C body, local (cycle) | `sounds.c:1797–1805` |
| `get_soundlib_name` | C body, local | `sounds.c:1862–1880` |
| `soundlib_id_from_opt` | C body, local | `sounds.c:1882–1895` |
| `soundlib_choices` | nosound row only | `sounds.c:1745–1776` (`#ifdef SND_LIB_*` empty here) |
| `string_for_env_opt` | existing local | `options.c:6682–6690` |

`sym.mjs`:

```
assign_soundlib  js/options.js:3951   sync
get_soundlib_name js/options.js:3967   sync
soundlib_id_from_opt js/options.js:3988   sync
optfn_soundlib   js/options.js:4014   sync
```

`csym --callers optfn_soundlib` is 0 (pointer, `optlist.h:693`,
negateok No).

## C ↔ JS fidelity

`do_init` returns `optn_ok`. `do_set`: `string_for_env_opt(name, opts,
FALSE)`; empty → `optn_err`; else `get_soundlib_name(buf, WINTYPELEN)`
(result discarded), `soundlib_id_from_opt(op)` stored in
`chosen_soundlib`, then `assign_soundlib` of that value. get_val and
get_cnf_val both `Sprintf` the active name. No do_handler. No RNG.

`get_soundlib_name` copies while `count < maxlen` and stops before
comma or NUL (`:1874–1878`). JS does that. `WINTYPELEN` is 16.
`soundlib_id_from_opt` is exact `strcmp`, else nosound's id.
`assign_soundlib` indexes `soundlib_choices` and panics when
`IndexOk` fails; JS throws. With only the nosound row, id 0 is index
0, so the store-then-assign pair leaves `chosen_soundlib` at 0 for
every name, including unknown ones. That is what C does on this
build: no `SND_LIB_*` is set in the pinned headers or contest patches.

`activate_chosen_soundlib` (`sounds.c:1778–1795`) is not a callee of
this function. C calls it from `allmain`. Named, not a stubbed arm.
`#if 0` `choose_soundlib` is compiled out. Negated rc lines are
skipped; C `parseoptions:626` rejects them before the optfn
(`bad_negation`, named sink). The option stays unset either way.

## Hallucinations / overclaim

"Nosound-only" matches the ifdefs. "Unknown names return nosound's
id, then assign_soundlib(0)" matches `:1886–1894` and `:3847–3849`
on this table. get_val reads `active_soundlib`, not the chosen id
(`:1869`).

## Density

~144 lines for a 38-line optfn and three small callees. In range.
The other sound libraries are ifdef-off, not a missing arm.

## Verification

Re-ran `node scripts/hidden-proxy.mjs verify optfn_soundlib --base
51c8c5714~1 --reach-all`:

```
verify optfn_soundlib: baseline 51c8c5714~1 (scoreboard at 40c2ca295, 2026-09-25T16:03:09.507Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify optfn_soundlib: no corpus session is blocked on it at 51c8c5714~1 — a vacuous verify is NOT a corpus PASS. …
smoke optfn_soundlib: no RNG-tagged reach; fixed smoke spread (1 run, 1.3s): 1 PASS, 0 regressed → REACH-OK
```

0 blocks cited. No REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
