# Review 1749 — 167912450 — nmcpy comma stop (D-2790)

- SHA: `167912450` (`options.c` nmcpy stops before a comma, D-2790)
- Files: `js/options.js` (+28/−15)
- Queue row: Must-fix from review 1742 (comma kept). 0 corpus blocks cited.
- Banned grep: 0 hits in the hunk (`AUTOUNLOCK_FORCE` is an unrelated flag name). `imports.mjs --rulecheck`: "Rule #2 clean" (this audit).

Closes review 1742. That file already stamps `**Addressed:** D-2790 `167912450``.

## Intent vs deliverable

Subject promises a restart of `nmcpy` so a copy stops before `','` or
`'\0'`, and that `fruitadd` uses it at the `makesingular` site and the
`candied ` tail. Diff replaces the local `nmcpy` body and the two
`fruitadd` slices. `optfn_fruit` and `optfn_role` already called it;
only their `:line` comments move to the caller lines `csym` prints
(`:1748`, `:1753`, `:3609`). No new function. Nothing deleted.

## Inventory

| JS symbol | Class | C (csym range) |
|-----------|-------|----------------|
| `nmcpy` | clone, now matches | `options.c:6859–6871` |
| `fruitadd` | existing body; two call sites retargeted | `:8192`, `:8239` |
| `optfn_fruit` / `optfn_role` | existing callers, comments only | `:1748`, `:1753`, `:3609` |

`csym --callers nmcpy`: prototype `:342` plus eleven calls (`:866`,
`:1748`, `:1753`, `:2561`, `:3609`, `:4870`, `:4972`, `:7134`, `:7283`,
`:8192`, `:8239`).

`sym.mjs` (rewritten clone, not a delete):

```
nmcpy            NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/options.js:3863
```

(At this SHA the function is `js/options.js:3785`. Later ports shifted it.)

## C ↔ JS fidelity

C `for (count = 1; count < maxlen; count++)` breaks when `*src` is
`','` or `'\0'` and does not store that byte, then writes a trailing
NUL (`:6865–6870`). JS uses the same count, `charCodeAt(count - 1)`,
breaks on `0x2c`, `0`, or past-the-end (C's NUL), and returns the
prefix. `maxlen <= 1` copies nothing. `fruit:apple,banana` with
`PL_FSIZ` is `apple` on both sides.

`fruitadd` user path: `nmcpy(pl_fruit, makesingular(str), PL_FSIZ)`
(`:8192`) then, on the food-name gate, `Strcpy` of `"candied "` (8
chars) and `nmcpy(pl_fruit + 8, buf, PL_FSIZ - 8)` (`:8238–8239`).
JS is `'candied ' + nmcpy(buf, PL_FSIZ - 8)`, which stores at most
`PL_FSIZ - 1` characters. The comma stop on the tail is live. No RNG.

`optfn_fruit` still does `nmcpy` then `sanitize_name` then the empty
`"slime mold"` `nmcpy` (`:1748–1753`). `optfn_role` still copies
`pl_character` (`:3609`).

A null `src` returns `""`. C would not be called on NULL. Named.

## Hallucinations / overclaim

"Stops before a comma" matches `:6866–6867`. "Whole-body" is true for
`nmcpy`. It is not a claim that every C caller is wired. The D-log
lists the five unwired sites and the `#ifdef WINCHAIN` site. D-log
line cites (`nmcpy :3785`, `fruitadd :3673` and `:3715`, `optfn_fruit
:3859`/`:3862`, `optfn_role :4363`) match this SHA. The `goodfruit`
comment says `:1748`; the label is `:1747` and the call is `:1748`.
Comment only.

## Density

~28 insertions for a 13-line C function plus two existing call sites.
Must-fix, one item. Under the 200-line band because C is that small.

## Verification

Re-ran `node scripts/hidden-proxy.mjs verify optfn_fruit --base
167912450~1 --reach-all`:

```
verify optfn_fruit: baseline 167912450~1 (scoreboard at 086317c06, 2026-09-25T17:42:23.809Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify optfn_fruit: no corpus session is blocked on it at 167912450~1 — a vacuous verify is NOT a corpus PASS. …
smoke optfn_fruit: no RNG-tagged reach; fixed smoke spread (1 run, 1.4s): 1 PASS, 0 regressed → REACH-OK
```

Review 1742 cited 0 blocks. No REGRESSED session. D-log's full 44/44
is the port iter's gate, not re-run here.

## Actionable C-wrongs

None. Unwired callers (`petname_optfn` `:866`, `optfn_name` `:2561`,
`optfn_windowtype` `:4972`, `initoptions_init` `:7134` and `:7283`)
are named; `optfn_windowchain` `:4870` is inside `#ifdef WINCHAIN`.

Verdict: **ACCEPT**
