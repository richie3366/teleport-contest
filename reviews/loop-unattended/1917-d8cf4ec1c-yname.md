# Review 1917 — d8cf4ec1c — yname (D-2958)

- SHA: `d8cf4ec1c` (coverage; `objnam.c` `yname`, and the local copies that were not that function)
- Files: `js/objnam.js` caps the `shk_your` append. `js/music.js`, `js/pickup.js`, and `js/uhitm.js` delete their `yname` copies. `js/dig.js`, `js/ball.js`, and `js/zap.js` call the export.
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunks. `imports.mjs --rulecheck`: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- The three local `yname` functions were deleted. `sym.mjs`:

```
yname            js/objnam.js:2792   sync
Yname2           js/objnam.js:2811   sync
             !! ALSO 3 LOCAL CLONE(S) in 3 files — IMPORT the export; do NOT add another
               js/do.js:482  js/music.js:265  js/timeout.js:1671
shk_your         js/objnam.js:2764   sync
```

No second `function yname` remains in `js/`.

## Intent vs deliverable

Subject promises one exported `yname`: `cxname` first, then `shk_your` plus a `BUFSZ-1` cap unless the object is a carried proper-name artifact below `ART_ORB_OF_DETECTION`. The diff is that cap, the deletion of three copies, and the dig / litter / destroy call sites. `Yname2` capitalizes the result.

## Inventory

| JS | Class | C |
|----|-------|---|
| `yname` | live sync `objnam.js:2792` | `objnam.c:2358–2374` |
| `shk_your` | live `:2764` | `shk.c:5861–5874` |
| `Yname2` | live `:2811` `upstart(yname)` | `objnam.c:2377–2384` |
| `carried_objnam` | `where === OBJ_INVENT` `:2746` | `obj.h` `carried` |
| `obj_is_pname` | live `:2714` | artifact gate |
| deleted `yname` | music / pickup / uhitm | were "your"/"the" + `cxname` |

## C ↔ JS fidelity

`objnam.c:2361–2372`. `s = cxname(obj)`. The prefix runs when `!carried` or `!obj_is_pname` or `oartifact >= ART_ORB_OF_DETECTION`. Then `shk_your(nextobuf(), obj)`, `space_left = BUFSZ - 1 - strlen(outbuf)`, `strncat(outbuf, s, space_left)`. Otherwise `s` stays `cxname`. `BUFSZ` is 256 (`global.h:389`, `js/const.js:947`). `ART_ORB_OF_DETECTION` is 21 in `artifacts_data.js`.

JS `:2793–2804` is that condition. `shk_your` returns the prefix string (the obuf ring is `releaseobuf`, named). `space_left > 0` slices `cxname`; otherwise the prefix is returned alone. C converts a negative `space_left` to `size_t`. The commit names that and does not. A normal prefix ("your ", "the ", "Foobar's ", or empty for a pname corpse) leaves room. No RNG.

`shk.c:5867–5873`. A pname corpse returns the empty buffer with no space. A unique corpse is `"the"`. Otherwise shop, monster, or `the_your[carried]`, then a trailing space. JS `:2764–2777` is that shape, including the trailing space on the non-empty arms. `yname` concatenates, so it does not insert a second space.

`Yname2` (`:2380–2382`) is `highc` of the first character of `yname`. `upstart` (`hacklib.js:302`) is that. `zap.c:5910` uses `Yname2` when `cnt == 1 && quan == 1`, else `yname`. `zap.js:1677` is that test. The old `u_carry` / bare `xname` arm is gone.

Wired in this diff: `dig.c:340` → `dig.js:2192`. `dig.c:1187` → `dig.js:2572`. `ball.c:975` → `ball.js:176` (`otense(otmp, "fall")` is still the local `falls`/`fall` pair). `music.c:554` / `:605` / `:652` call the import (`music.js:766`, `:867`, `:823`). `uhitm.c:543` and `:1628` call the import. `pickup.js` had no remaining call. `yname_dig` (`dig.js:2452`) is still `your ${xname}` and is only used by `yobjnam_dig`.

`music.js:265` `Yname2` calls `yname` and capitalizes. `potion.js` `Yname2_pot`, `trap.js` `Yname2_pit`, `zap.js` `Yname2_destroy`, and `apply.js` `Yname2_snuff` do too. `apply.js` `Yname2_oil` still builds `shk_your_apply` plus `xname`. `do.js:482` is `The(xname)`. `timeout.js:1671` is `your`/`The` plus `xname`. Those three are not this function.

## Hallucinations / overclaim

The subject says no arm of the prefix gate is omitted. Both the artifact return and the capped append are present. It says the three local functions are gone. `sym.mjs` shows one `yname`. It also says the `Yname2` helpers in music, apply, potion, trap, and zap call this `yname`. `Yname2_oil` does not. The `do.js` and `timeout.js` clones are the ones `sym.mjs` still lists, and `music.js:265` does call the export.

## Density

The coverage row asked for `yname`. The 17-line body shipped, including the cap that the previous body skipped. The deleted copies were the callers that did not use `shk_your`. Not an arm peel. The remaining `Yname2` stand-ins are a different function.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify yname --base d8cf4ec1c~1 --reach-all`.

```
verify yname: baseline d8cf4ec1c~1 (scoreboard at b88b8599f, 2026-09-27T02:19:54.792Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify yname: no corpus session is blocked on it at d8cf4ec1c~1 — a vacuous verify is NOT a corpus PASS. …
smoke yname: no RNG-tagged reach; fixed smoke spread (12 run, 3.4s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty blocked-line is the vacuous note. No `REGRESSED` session. The D-log's green, strict, and cohort are the port's own verify line; full suite was skipped because none of the seven files is on the shared-file list.

## Actionable C-wrongs

None in `yname`. `Yname2_oil`, `do.js` `Yname2`, and `timeout.js` `Yname2` still do not call it; they are named leftovers of `Yname2`, not a missing arm of this gate.

Verdict: **ACCEPT**
