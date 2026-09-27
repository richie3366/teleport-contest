# Review 1908 — 515ca9981 — maybe_reset_pick (D-2949)

- SHA: `515ca9981` (coverage; `lock.c` `maybe_reset_pick`, and the callers that skipped it)
- Files: `js/lock.js` adds the export and imports `eat.js` `carried`. `js/shk.js` deletes its invent-array clone and calls this export from `obfree`. `js/do.js`, `js/mkobj.js`, and `js/wizcmds.js` call it with null or the migrating container.
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` diff. `imports.mjs --rulecheck`: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- `sym.mjs` (the diff deletes the `shk.js` clone and re-points that call at the export):

```
maybe_reset_pick js/lock.js:367   sync
carried          js/eat.js:2617   sync
             !! ALSO 3 LOCAL CLONE(S) in 3 files — IMPORT the export; do NOT add another
               js/artifact.js:1787  js/ball.js:70  js/timeout.js:1627
reset_pick       js/lock.js:347   sync
```

`imports.mjs --can js/lock.js js/eat.js carried` → `ALREADY`. The commit's pre-import check was `SAFE` (hoisted). The `shk.js` clone is gone.

## Intent vs deliverable

Subject promises one `maybe_reset_pick`: a container clears context only when it is `xlock.box`; a null container clears when that box is absent or not carried. The diff is that function, the deleted `shk.js` copy, and the four C call sites. `reset_pick` is the same-file export.

## Inventory

| JS | Class | C |
|----|-------|---|
| `maybe_reset_pick` | live sync `lock.js:367` | `lock.c:268–285` |
| `carried` | live `eat.js:2617`, wider than the macro | `obj.h:332` |
| `reset_pick` | live `lock.js:347` | the clear |
| `obfree` | caller `shk.js:4086` | `shk.c:1202` |
| `add_to_migration` | caller `mkobj.js:3360` | `mkobj.c:2710` |
| `goto_level` | caller `do.js:1567` | `do.c:1605` |
| `makemap_prepost` | caller `wizcmds.js:589` | `cmd.c:1015` |

## C ↔ JS fidelity

`lock.c:282–284`. `if (container ? (container == gx.xlock.box) : (!gx.xlock.box || !carried(gx.xlock.box))) reset_pick()`. A specific container does not clear when it is some other object. Null clears when the box is null (door context) or not carried. No `rn2`. The comment at `:272–281` is the same text JS copies.

`carried` is `(o)->where == OBJ_INVENT` (`obj.h:332`). `eat.js:2617–2620` returns true on that test, and also when `game.invent` contains the object. A null object is false; C would dereference. The extra array test is what this commit names: `addinv` often leaves `where` unset, so membership is the carried bit those objects have. The null arm uses that export. The old `shk.js` reader was only `invent.includes`.

A missing `game.xlock` makes `box` null, so a null container calls `reset_pick` and a non-null container does not (`container === null` is false). C's `gx.xlock` is a struct; `.box` can still be null. Named.

Callers, all under the C condition: `shk.c:1201–1202` `Is_container` → `shk.js:4086`. `mkobj.c:2709–2710` `Is_container` → `mkobj.js:3360`. `do.c:1605` null, before the departing level is freed → `do.js:1567`, then `reset_trapset`. `cmd.c:1015` null → `wizcmds.js:589`. `do.c:1604` is the comment. No fifth call.

`add_to_migration` still assigns `where = OBJ_FREE` instead of panicking when `where != OBJ_FREE` (`mkobj.c:2700–2701`), and it still skips the unpaid `impossible` (`:2703–2705`). Those run before the identity compare, which does not read `where`. `makemap_prepost` still skips the digging `memset` (`cmd.c:1017–1019`) and `polearm.hitmon`. Named, and not arms of this function.

## Hallucinations / overclaim

The subject says no arm is omitted. The container test, the null test, and `reset_pick` are present. `sym.mjs` shows one `maybe_reset_pick`. The three other `carried` clones are not this call. The unpaid panic and the digging clear are named and were not claimed as part of this body.

## Density

The coverage row asked for `maybe_reset_pick`. The 18-line body shipped. The four C callers call it. Not an arm peel.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify maybe_reset_pick --base 515ca9981~1 --reach-all`.

```
verify maybe_reset_pick: baseline 515ca9981~1 (scoreboard at b88b8599f, 2026-09-27T02:19:54.792Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify maybe_reset_pick: no corpus session is blocked on it at 515ca9981~1 — a vacuous verify is NOT a corpus PASS. …
smoke maybe_reset_pick: no RNG-tagged reach; fixed smoke spread (12 run, 3.3s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The D-log's green, strict, cohort, and full 44/44 are the port's own verify line (`do.js` / `lock.js` are shared).

## Actionable C-wrongs

None in this function. The invent-array arm of `carried` is the named `addinv` gap, and this call uses that export.

Verdict: **ACCEPT**
