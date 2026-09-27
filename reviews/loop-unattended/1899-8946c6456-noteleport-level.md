# Review 1899 — 8946c6456 — noteleport_level (D-2940)

- SHA: `8946c6456` (coverage; `teleport.c` `noteleport_level`, plus the walker it calls)
- Files: `js/teleport.js` replaces the local `get_iter_mons_tele` and the `M3_COVETOUS` mask with `get_iter_mons` and `is_covetous`. `js/monmove.js` exports `get_iter_mons` beside `mon_offmap`. `js/shk.js` reads `uevent?.udemigod`.
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` diff. `imports.mjs --rulecheck`: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- `sym.mjs` (the diff deletes `get_iter_mons_tele` and re-points the call at the export):

```
noteleport_level js/teleport.js:848   sync
get_iter_mons    js/monmove.js:212   sync
             !! ALSO 4 LOCAL CLONE(S) in 4 files — IMPORT the export; do NOT add another
               js/dig.js:963  js/dokick.js:370  js/fountain.js:230  js/sounds.js:446
m_blocks_teleporting NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/teleport.js:834
is_covetous      js/monsters.js:310   sync
```

`m_blocks_teleporting` is C `staticfn` (`teleport.c:20–26`). One file-local body is the right shape. `imports.mjs --can js/teleport.js js/monmove.js get_iter_mons` → `ALREADY`.

## Intent vs deliverable

Subject promises one `noteleport_level` in C order, an on-map demon-court walk, and a missing stasis long treated as 0. The diff is that. It also changes the shop honorific so a missing `uevent` is the zero bit instead of a throw.

## Inventory

| JS | Class | C |
|----|-------|---|
| `noteleport_level` | live sync `teleport.js:848` | `teleport.c:29–47` |
| `m_blocks_teleporting` | file-local `:834` | `teleport.c:20–26` |
| `get_iter_mons` | live sync `monmove.js:212` | `mon.c:4542–4556` |
| `Inhell` | same-file `teleport.js:2244` | `dungeon.h:140` `In_hell(&u.uz)`; body `dungeon.c:1941–1945` |
| `is_dlord` / `is_dprince` | `monsters.js:868`, `:871` | `mondata.h:140–141` |
| `is_covetous` | `monsters.js:310` | `mondata.h:153`; mask `monflag.h:168` `0x001f` |
| `mon_offmap` | `monmove.js:194` | `monst.h:255` |

## C ↔ JS fidelity

`teleport.c:33–35`: in Hell, and the mover is not a demon lord or prince, return true when some monster passes `m_blocks_teleporting`. JS `Inhell()` is `dungeons[u.uz.dnum].flags.hellish` (`dungeon.c:1943`). `is_dlord` / `is_dprince` are `is_demon && is_lord` / `is_prince`. `m_blocks_teleporting` (`:22–25`) is that same pair, then false. JS `:834–836` is that.

`teleport.c:38–39`: `level.flags.noteleport && !is_covetous(mon->data)`. JS uses the export. `M3_COVETOUS` is `0x001f` in both `monflag.h:168` and `monsters.js:173`. The old inline mask was the same value; the call is the macro.

`teleport.c:44–45`: `stasis_until >= moves`, and that arm does not test covetous. JS uses `?? 0` for a missing long. A missing field used to be `-1`, so it never blocked. Zero matches a zero-initialized `long`.

No `rn2` in this function.

`get_iter_mons` (`mon.c:4548–4555`) saves `nmon`, skips `DEADMONSTER` (`mhp < 1`, `monst.h:214`) and `mon_offmap`, and returns the first monster whose callback is true. JS saves the next array element, skips `mhp < 1` and `mon_offmap`, and returns on a true callback. On a list the callback does not splice, that is the C walk. `m_blocks_teleporting` does not splice. If a callback removes the saved successor, `indexOf` misses and the walk returns null. C would still visit that pointer. The commit names that stop. No caller of this export does it.

The four older `get_iter_mons` copies stay. `dokick.js`, `fountain.js`, and `sounds.js` `await` the callback, so they cannot call this sync export. `dig.js:963` is sync (`watchman_canseeu` does not print) and `dig.js` already imports `monmove.js`, but it still skips `mx <= 0` instead of `mon_offmap`. That copy is older than this SHA. The commit names it as staying. It is not the walker `noteleport_level` calls.

`shk.js`: `rn2(4) + udemigod` now uses `uevent?.udemigod`. C's `uevent` is always present and the bit starts at 0. A missing object reads as that 0 and still draws `rn2`. Not a seed, step, or coordinate test.

## Hallucinations / overclaim

The subject says no arm of `noteleport_level` is omitted. The three arms are the Hell court, the level flag, and stasis. All three are present. A null `mon` throws on `mon.data` (`NONNULLARG1`). A null `data` makes `is_dlord` / `is_covetous` false because those exports optional-chain `mflags2` / `mflags3`. C would dereference. Named, and it does not invent a pass.

## Density

The coverage row asked for `noteleport_level`. The whole body shipped. Every C caller in the `csym --callers` list except `extern.h:3190` calls this export: `apply.c:503`, `dokick.c:272`, `mon.c:2117`, `monmove.c:746` and `:1939`, `muse.c:394`, `:687`, `:701`, `:866`, `:1235`, `:1512`, `teleport.c:819`, `:854`, `:1502`, `:1952`, `:1968`, `:2278`, `trap.c:5130`, and the seven `wizard.c` sites (`:389` through `:459`). Not an arm peel.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify noteleport_level --base 8946c6456~1 --reach-all`.

```
verify noteleport_level: baseline 8946c6456~1 (scoreboard at b88b8599f, 2026-09-27T02:19:54.792Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify noteleport_level: no corpus session is blocked on it at 8946c6456~1 — a vacuous verify is NOT a corpus PASS. …
smoke noteleport_level: no RNG-tagged reach; fixed smoke spread (12 run, 3.3s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The D-log's green, strict, cohort, and full 44/44 are the port's own verify line (`monmove.js` is shared).

## Actionable C-wrongs

None in `noteleport_level`. The dig/dokick/fountain/sounds walkers are the older copies the commit left in place.

Verdict: **ACCEPT**
