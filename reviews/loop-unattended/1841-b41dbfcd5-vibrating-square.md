# Review 1841 — b41dbfcd5 — trapeffect_vibrating_square (D-2882)

- SHA: `b41dbfcd5` (coverage; `trap.c` `trapeffect_vibrating_square`, plus file-local `m_in_air`)
- Files: `js/trap.js` (+63/−). 63 `js/` insertions.
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises one `trapeffect_vibrating_square` and a `has_ceiling` term on this file's `m_in_air`. The diff adds the function, the `VIBRATING_SQUARE` selector arm, and that term. `sym.mjs`:

```
feeltrap    js/trap.js:2449   sync
seetrap     js/trap.js:1282   sync
cansee      js/vision.js:1215   sync
mon_nam     js/do_name.js:1141   sync
mbodypart   js/polyself.js:552   sync
makeplural  js/objnam.js:2189   sync
strsubst    js/hacklib.js:394   sync
nolimbs     js/monsters.js:362   sync
You_see     js/display.js:7696   ASYNC — await required
s_suffix    js/do_name.js:390   sync
m_in_air    NOT EXPORTED — 4 LOCAL CLONES:
            js/do.js:547  js/mon.js:2291  js/teleport.js:212  js/trap.js:1140
has_ceiling_trap NOT EXPORTED — local js/trap.js:1686
```

`canseemon` in this function is the file-local at `trap.js:1130`, not the `display.js` export. `dist2` is the existing import from `mon.js` (`:1105`), squared Euclidean.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `trapeffect_vibrating_square` | file-local `trap.js:5821` | `trap.c:2725–2764` |
| `m_in_air` | file-local clone, updated | `mon.c:2130–2135` |
| `has_ceiling_trap` | local clone of `has_ceiling` | `dungeon.c:1689–1698` |
| `feeltrap` / `seetrap` | same-file functions | `trap.c` |
| `You_see` | async import | `pline.c:454–469` |
| selector case | caller | `trap.c:2986` |

## C ↔ JS fidelity

`csym` body is `trap.c:2724–2764`. Callers: declaration `trap.c:40`, and `trapeffect_selector` at `:2986`. That case is `js/trap.js:5911`. `VIBRATING_SQUARE` is 23 (`trap.h:82`, `js/mklev.js:382`). `trflags` is unused. No RNG. Return is always `Trap_Effect_Finished`.

Hero (`mtmp == &gy.youmonst`; JS `is_youmonst`) only `feeltrap`s. A monster computes `in_sight` (`canseemon` or `u.usteed`) before `see_it = cansee(mx, my)`. The local `canseemon` is `_canseemon` (`display.h:117–120`): worm tail via `worm_known`, else `cansee` or `see_with_infrared`, then `mon_visible`. `see_it && !Blind` calls `seetrap` before either message.

`nolimbs(mtmp->data) || m_in_air(mtmp)` copies `mon_nam`. Otherwise `s_suffix(monnm)`, a space, then `makeplural(mbodypart(FOOT))`, and `strsubst` of `"rear "` starts at the foot text. JS builds that foot string first and concatenates. `strsubst` (`hacklib.js:394`) replaces the first hit, as C does. `You_see` is awaited; `vpline` expands the `%s`.

The other message uses `mdistu(mtmp) <= 2 * 2` (`hack.h:1532` → `dist2` to `u.ux,u.uy`). JS `dist2` is the same square. `nearby` / `in the distance` match.

`m_in_air` is flyer, floater, or clinger && `has_ceiling(&u.uz)` && `mundetected`. `has_ceiling_trap` is that function: endgame and not earth is false, otherwise true. A null `data` returns false; C is `NONNULL`. The same clone is what `trap.c:1441`, `:1530`, `:2608`, and `:2683` use in this file (`trap.js:3971`, `:3615`, `:5736`, `:2828`).

## Hallucinations / overclaim

`You_see` (`pline.c:456–466`) still prints only "You see ". Unaware's "You dream that you see " is omitted. This caller already requires `!Blind`, so the "You sense " prefix cannot run. The commit says that. The other three `m_in_air` clones still skip `has_ceiling`. Named, not claimed as updated.

## Density

The 41-line function, its selector caller, and the `m_in_air` predicate that function calls. 63 insertions.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify trapeffect_vibrating_square --base b41dbfcd5~1 --reach-all` and the same for `m_in_air` (the clone this commit changed).

```
verify trapeffect_vibrating_square: baseline b41dbfcd5~1 (scoreboard at a0c180a68) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke trapeffect_vibrating_square: no RNG-tagged reach; fixed smoke spread (12 run, 3.4s): 12 PASS, 0 regressed → REACH-OK
verify m_in_air: … 0 session(s) blocked … smoke (12 run, 3.3s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
