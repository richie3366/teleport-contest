# Review 1832 — f7125aef2 — wish_history_add (D-2873)

**Addressed:** D-2880

- SHA: `f7125aef2` (coverage; `zap.c` `wish_history_add`)
- Files: `js/zap.js` (+58/−), `js/files.js` (+10). 68 `js/` insertions.
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises one `wish_history_add`: non-wizard returns, then a 20-slot scan from the index, skip nulls, break when a stored line is a case-blind prefix of the new text, otherwise replace that slot and advance. `makewish` records `bufcpy` on the terrain arm and the object arm. `proc_wizkit_line` records before `wizkit_addinv`. The diff adds that function and those three calls. `sym.mjs`:

```
wish_history_add   js/zap.js:7178   sync
wish_history_menu  js/zap.js:7208   sync
wish_history_flush NOT FOUND
str_start_is       js/hacklib.js:132   sync
```

`imports.mjs --can files.js zap.js wish_history_add` → `ALREADY: files.js already statically imports zap.js`. No top-level read of `wish_history_add`.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `wish_history_add` | export `zap.js:7178` | `zap.c:6226–6255` |
| `str_start_is` | import | `strncmpi(hist, buf, strlen(hist))` at `:6240` |
| `makewish` | caller, two sites | `zap.c:6375`, `:6379` |
| `proc_wizkit_line` | caller | `files.c:2572` |
| `wish_history_menu` | existing empty export | `zap.c:6275–6309` |

## C ↔ JS fidelity

`csym` body is `zap.c:6226–6255`, inside `#ifdef DEBUG`. `patchlevel.h:35–36` defines `DEBUG`. Callers: `files.c:2572`, `zap.c:6375`, `zap.c:6379`. `wizard` is `flags.debug` (`flag.h:30`). No RNG.

The loop matches. `i` runs `0 .. 19`. Slot `(idx + i) % 20`. Null is skipped. `str_start_is(text, hist, true)` is true when `hist` is a case-blind prefix of `text` (`hacklib.js:132–147`, ASCII `lowc`), which is `!strncmpi(hist, buf, strlen(hist))`. A hit `break`s and does not replace the slot. If `i` stays 20, the write index is `(idx + 20) % 20`, the same slot C frees and `strcpy`s, then `idx` advances. No second clone.

`makewish` copies `bufcpy` after the help/escape loop and before `readobjnam_wish` (`zap.c:6359`). Failed parse and explicit nothing return without a history call (`:6361–6372`). `HANDS_OBJ` records then returns (`:6374–6377`). Any other object records before artifact bookkeeping (`:6379`). Those two sites pass `bufcpy`.

`proc_wizkit_line` does not. C is `readobjnam(buf)` then, when the object is real and not `&hands_obj`, `wish_history_add(buf)` (`files.c:2568–2573`). `readobjnam` rewrites that buffer: `mungspaces` at `objnam.c:4919`, then the parsers assign through `d.bp` (the same pointer). JS (`files.js` `proc_wizkit_line`) passes the length-clipped input `line`. `readobjnam` does `bp = mungspaces(bp)` on a local (`readobjnam.js:1326`) and later replaces `d.bp` (`:328`, `:375`, `:1013`, `:1512`, and the other cuts). The caller's string is unchanged, and the success return does not hand `d.bp` back (`missOut.d` is set only on the miss path, `:1605`). A wizkit line and a later wizard wish therefore prefix-match different text than C.

`wish_history_menu` is still an empty function. `makewish` never calls it. C does, when `iflags.menu_requested && wish_history[0] && tries == 0` (`zap.c:6334–6335`). The commit names that, and names `wish_history_flush` (`zap.c:6259–6269`) as unported. `config_error_add` on a bad wizkit line stays omitted. An older map sentence (`docs/c-js-map/turns.md` D-1939) still calls the menu a production no-op; this commit's sentence says `DEBUG` is on and the menu is deferred.

## Hallucinations / overclaim

The subject says `proc_wizkit_line` records the line before `wizkit_addinv`. The call is before `wizkit_addinv`. It does not say the argument is the buffer `readobjnam` left. The function body itself is the C loop. The menu stub is named, not described as matching C.

## Density

One 30-line function plus its three C call sites. 68 insertions. The menu is a separate named function, not an arm of `wish_history_add`.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify wish_history_add --base f7125aef2~1 --reach-all`.

```
verify wish_history_add: baseline f7125aef2~1 (scoreboard at 1ad43f20e) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke wish_history_add: no RNG-tagged reach; fixed smoke spread (12 run, 3.3s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. Wizard wish history is not on that smoke path.

## Actionable C-wrongs

1. `proc_wizkit_line` must pass the post-`readobjnam` buffer into `wish_history_add` (`files.c:2568–2573`). `js/files.js` records the length-clipped input. `readobjnam` has already run `mungspaces` (`objnam.c:4919`) and rewritten `bp`.

Verdict: **QUALITY-RISK**
