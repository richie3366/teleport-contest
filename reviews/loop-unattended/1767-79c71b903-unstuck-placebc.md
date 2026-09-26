# Review 1767 — 79c71b903 — unstuck placebc on swallow exit (D-2808)

- SHA: `79c71b903` (Must-fix from review 1763; not a coverage row)
- Files: `js/mhitu.js` `unstuck` (`:1637`); comment-only `js/dothrow.js` `thitmonst` (`:753–755`)
- Queue row: review 1763 C-wrong, 0 corpus blocks cited
- Banned grep: 0 hits in the hunk. `imports.mjs --rulecheck` on this SHA: "Rule #2 clean".
- No symbol was deleted or re-pointed. `placebc` and `Punished` were already imported. `OBJ_FLOOR` joins the existing `const.js` import.

## Intent vs deliverable

Subject promises that after `ux`/`uy` and before `vision_full_recalc`, `unstuck` calls `placebc` when `Punished()` and `uchain.where` is not `OBJ_FLOOR`. The diff adds that call (`mhitu.js:1649–1650`) and drops the comment that said the call was still missing. It does not otherwise rewrite `unstuck`.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `unstuck` | C body, async | `mon.c:3438–3466` |
| `set_ustuck` | same file, sync | clears `uswallow` and `uswldtim` |
| `placebc` | imported `ball.js:380`, sync | `ball.c:191–209` → `placebc_core` |
| `Punished` | imported `pray.js:245`, sync | `youprop.h:77` `uball != 0` |
| `docrt` | imported, awaited | after the new `placebc` |
| `dmgtype` | file-local clone `mhitu.js:1081` | `mondata.c:711` via `dmgtype_fromattack` `AT_ANY` |
| `attacktype_aatyp` | file-local clone `mhitu.js:1143` | `attacktype` = `attacktype_fordmg` with `AD_ANY` (`mondata.c:41–50`) |

`csym --callers unstuck` (live calls, not comments): `dog.c:1189` → `dog.js:606`; `end.c:754` → `end.js:1815`; `mhitu.c:299` → `mhitu.js:1688`; `mon.c:2703` → `mon.js:2101` (hero-kill stand-in `uhitm.js:861`); `mon.c:3276` → `mon.js:3490`; `mon.c:3857` → `mon.js:1877`; `mon.c:5447` → `makemon.js:1804`; `monmove.c:368` → `monmove.js:2341`; `monmove.c:937` → `monmove.js:2586`; `teleport.c:1696` → `teleport.js:804`; `teleport.c:2281` → `teleport.js:1827`; `uhitm.c:5381` → `mhitm.js:2813`; `zap.c:602` → `zap.js:2669`. `dogmove.c:1058` is inside `#if 0` (`dogmove.c:1055–1061`). `mhitu.c:1367` and `mon.c:3459` / `:5445` are comments. `mhitm.c:1255` is the named `slept_monst` caller (below).

`sym.mjs` (callees the new lines use; nothing was re-pointed):

```
Punished         js/pray.js:245   sync
placebc          js/ball.js:380   sync
docrt            js/display.js:5731   ASYNC — await required
dmgtype          js/monsters.js:531   sync
             !! ALSO 5 LOCAL CLONE(S) in 5 files
               js/eat.js:391  js/engrave.js:362  js/mhitm.js:785  js/mhitu.js:1081  js/monmove.js:1232
attacktype_aatyp NOT EXPORTED — 2 LOCAL CLONE(S)
               js/mhitu.js:1143  js/uhitm.js:664
```

`imports.mjs --can mhitu.js ball.js placebc` → `ALREADY`. Same for `pray.js` `Punished`.

## C ↔ JS fidelity

`mon.c:3440–3446`: if `u.ustuck == mtmp`, save `swallowed`, then `set_ustuck(0)` so `docrt` sees a clear swallow. JS `:1639–1642` matches, including the early return when the grabber is someone else.

Swallow exit (`:3448–3455`): clear `mswallower`, copy `mx`/`my` onto `u.ux`/`u.uy`, then:

```3451:3455:nethack-c/upstream/src/mon.c
            if (Punished && uchain->where != OBJ_FLOOR)
                placebc();
            gv.vision_full_recalc = 1;
            docrt();
```

JS `:1643–1653` is that order. `OBJ_FLOOR` is 1 and `OBJ_FREE` is 0 (`const.js:1352–1353`). A chain `unplacebc` left at `OBJ_FREE` fails the floor test and `placebc` runs. A chain already at `OBJ_FLOOR` skips it. `placebc` is sync, so it is not awaited. `docrt` is awaited.

`placebc` (`ball.c:194–207`) refuses when `check_restriction` fails, `impossible`s when `where != OBJ_FREE`, else `placebc_core`. The JS export (`ball.js:380–397`) returns when either object is missing or `where` is set and not `OBJ_FREE`, then `place_object`s the ball unless `carried` and always places the chain, then `newsym`. `flooreffects` and `bcrestriction` stay the named omissions on that callee. On the swallow path `gulpmu` has already `unplacebc`'d, so `where` is free and this call does place `uball`. That is what `thitmonst`'s `return true` (`dothrow.c:2240–2241`, `dothrow.js:757–758`) assumes. The dothrow hunk only deletes the "still omits" comment.

Re-engulf (`:3462–3465`): `!mspec_used` and (`dmgtype(AD_STCK)` or `attacktype(AT_ENGL)` or `attacktype(AT_HUGS)`) then `mspec_used = rnd(2)`. JS `:1655–1659` is that predicate and that one `rnd(2)`, after `docrt`. The local `dmgtype` walks `mattk` for `adtyp`; C `dmgtype_fromattack` walks `NATTK` with `AT_ANY`. The local `attacktype_aatyp` matches `aatyp` the way `attacktype_fordmg(..., AD_ANY)` does. Both are pre-existing clones on this path, not new stubs.

`mhitm.c:1250–1256` `slept_monst` calls `unstuck` only when `helpless && mon == u.ustuck && !sticks(youmonst.data) && !u.uswallow`. Three clones still assign `u.ustuck = null` (`mhitm.js:1381` `slept_slee_mm`, `music.js:328`, `potion.js:3730`) and skip `set_ustuck` / `rnd(2)`. The C gate is `!u.uswallow`, so this commit's `placebc` would not run there. Named in the D-log and in `turns.md`, not a silent arm of the function this SHA changed.

## Hallucinations / overclaim

The subject does not say the whole of `unstuck` was newly ported. The `placebc` claim matches the hunk. D-2808's caller list matches the sites above; `expels` is `mhitu.js:1688` (the log says 1683). `dogmove.c:1058` is correctly not a live caller.

## Density

One call inside an existing function, which is what review 1763 asked for. Not an arm sold as the function. The `slept_monst` clones stay a named caller omit.

## Verification

Re-run on this SHA: `node scripts/hidden-proxy.mjs verify unstuck --base 79c71b903~1 --reach-all`.

```
verify unstuck: baseline 79c71b903~1 (scoreboard at 7041ab3e4) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke unstuck: no RNG-tagged reach; fixed smoke spread (12 run, 3.3s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note, not a false PASS. D-2808's green 2/2, strict ×2, and cohort 7/7 were not re-run here.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
