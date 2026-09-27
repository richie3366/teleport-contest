# Review 1871 — a5d5677e6 — readobjnam_init (D-2912)

- SHA: `a5d5677e6` (coverage; `objnam.c` `readobjnam_init`)
- Files: `js/readobjnam.js` only
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunk. `imports.mjs --rulecheck` (this tree): "Rule #2 clean: no bare/node specifiers or fs calls in js/." No new import.
- `sym.mjs`:

```
readobjnam_init  NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/readobjnam.js:1396
readobjnam       js/readobjnam.js:1454   sync
```

C is `staticfn`. One file-local function is that function, not a second clone.

## Intent vs deliverable

Subject promises a file-local `readobjnam_init` that zeros the wish record, called before the null-`bp` path, with `fruitbuf` still empty until after the nothing/nil/none return. The diff extracts that function and calls it at the start of `readobjnam`. `p` and `globbuf` are set.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `readobjnam_init` | file-local `readobjnam.js:1396` | `objnam.c:3932–3961` |
| caller | `readobjnam.js:1463` | `objnam.c:4914` |
| `RANDOM_TIN` | `-2` | `hack.h:1400` |
| `TIN_UNDEFINED` | file `0` | `objnam.c:3928` |
| `NON_PM` | `-1` | monster index sentinel |
| `current_fruit` | `game.context.current_fruit` | `svc.context.current_fruit` |

## C ↔ JS fidelity

`csym` body is `objnam.c:3932–3961`. No RNG. The only call is `readobjnam` at `:4914`. `objnam.c:54` is the forward declaration.

`otmp` is null. Then `cnt`, `spe`, `spesgn`, `typ` are 0. The long chain stores 0 through `very`, `rechrg`, blessed/uncursed/cursed, poisoned, greased, both erosion fields, `erodeproof`, `halfeaten`, `islit`, `unlabeled`, `ishistoric`, `isdiluted`, trapped/locked/unlocked/broken, open/closed/`doorless`, `looted`, `real`, and `fake`. Then `tvariety = RANDOM_TIN` (`-2`), `mgend = -1`, `mntmp = NON_PM`, `contents = TIN_UNDEFINED` (`0`), `oclass = 0`, null `actualn`/`dn`/`un`, `wetness` and `gsize` 0, `zombify` 0. `bp` and `origbp` alias the caller pointer. `p` and `name` are null. `ftype` is `current_fruit` (`| 0` when the field is missing). `globbuf` and `fruitbuf` are `''`. C `memset`s a `BUFSZ` slab; the subject names the empty string.

`tmp` and `tinv` are not written. C does not touch them either.

`readobjnam` calls init before `if (!bp) goto any`. JS calls it before `if (bp == null) return readobjnam_any(d)`. `mungspaces` in C edits that buffer in place, so the aliases already see the munged text. JS `mungspaces` returns a new string, and the caller then assigns `d.bp` and `d.origbp` to it. That assignment is outside the init function. `Strcpy(d.fruitbuf, bp)` stays after the nothing/nil/none return (`:4922–4926`). An empty string or `ESC` returns `any` before that copy; an empty copy would still be `''`.

## Hallucinations / overclaim

The subject says no arm is omitted and that `tmp`/`tinv` stay unset. Both match the C function. The postparse1 `Sprintf` into `globbuf` is a later write, not this memset. The subject does not claim `mungspaces` edits the JS string in place.

## Density

One static function and its one caller. No callee. The zero list is the whole body.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify readobjnam_init --base a5d5677e6~1 --reach-all`.

```
verify readobjnam_init: baseline a5d5677e6~1 (scoreboard at 884da82f5, 2026-09-26T23:49:24.198Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify readobjnam_init: no corpus session is blocked on it at a5d5677e6~1 — a vacuous verify is NOT a corpus PASS. If the queue row cited N corpus blocks, re-run with --base <the commit that row was queued at>; otherwise ship with the public gates + the reach line below and say so in the D-log.
smoke readobjnam_init: no RNG-tagged reach; fixed smoke spread (12 run, 3.5s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The D-log's green, strict, and cohort are the port's own verify line.

## Actionable C-wrongs

None. The zero chain, the tin and monster defaults, the buffer aliases, and the empty `globbuf`/`fruitbuf` match `objnam.c:3935–3960`.

Verdict: **ACCEPT**
