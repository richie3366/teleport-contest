# Review 656 — c33608ff — do.c savelev stash lights/billobjs/mlstmv (D-1695)

## Metadata
- Full / short hash: `c33608ff4834a8a2c7209869c9206a5079e4e277` / `c33608ff`
- Parent: `23e4c80a` (D-1694). This file audits **this SHA only** (third of fifteen `js/` commits since review **653**). Archive **Addressed:** D-1695 `c33608ff`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-30 01:43:12 +0200
- D-id: **D-1695**
- Stats: `js/do.js` +21/−6; `js/mkobj.js` +56/−7; `js/dog.js` +12; `js/priest.js` +15/−1; `js/bones.js` +4; `js/light.js` +1/−1. Total `js/` insertions **109** <250. Band **150–350**.
- Claims to close: ledger Cluster 1 in-memory `savelev` stash. Not JSON `serLevel` (D-1696). Not cant_go_back FREEING. `reviews/loop-2026-08-15/` has no unpaid savelev-light Must-fix.
- JS / map: `do.js` `goto_level`; `mkobj.js` `save_light_sources`; `dog.js` `update_mlstmv`; `priest.js` `forget_temple_entry`. `c-js-map/turns.md` / `harness.md`.
- Prior reviews this SHA claims to close: none written; D-1037 timers already peeled RANGE_LEVEL.

## Intent vs deliverable

Git subject promises: level leave peels RANGE_LEVEL lights and billobjs, updates `mlstmv`, and forgets temple entry, instead of wiping pack lamps with `clear_light_sources`.

`node scripts/csym.mjs update_mlstmv` → `dog.c:293–298`. `--callers`: `do.c:1642`; `bones.c:620`. `set_mon_lastmove` `:287–290`. `iter_mons` `mon.c:4527–4537` skips `DEADMONSTER` / `mon_offmap`. `save_light_sources` `light.c:420–471` (`--callers` `save.c:297` RANGE_GLOBAL, `:540` RANGE_LEVEL, `:1101` free). `maybe_write_ls` `:571–603`. `restore_light_sources` `:478–493`. `forget_temple_entry` `priest.c:543–555` (`--callers` `save.c:894` savemonchn; `mkobj.c:2160` save_mtraits). `save_mtraits` `mkobj.c:2156–2195`. `goto_level` `do.c:1640–1650` `cant_go_back`. `savedamage` `save.c:640–662`. `obj_is_local` `timeout.c:2560–2577`. timeout `mon_is_local` `:2584–2596`. **light.c `:373` `#define mon_is_local(mon) ((mon)->mx > 0)` through `:983`.**

```1640:1650:nethack-c/upstream/src/do.c
    cant_go_back = ((newdungeon && In_endgame(newlevel)) || leaving_tutorial);
    if (!cant_go_back) {
        update_mlstmv();
        ...
    }
    nhfp->mode = cant_go_back ? FREEING : (WRITING | FREEING);
    savelev(nhfp, ledger_no(&u.uz));
```

```373:373:nethack-c/upstream/src/light.c
#define mon_is_local(mon) ((mon)->mx > 0)
```

```449:454:nethack-c/upstream/src/light.c
                case LS_OBJECT:
                    is_global = !obj_is_local(curr->id.a_obj);
                    break;
                case LS_MONSTER:
                    is_global = !mon_is_local(curr->id.a_monst);
```

Parent: stash timers/regions/track; `clear_light_sources()` + `relight_monsters()`; no billobjs; no mlstmv/temple. The diff **does** `update_mlstmv` after `keepdogs`; `forget_temple_entry` on `fmon` ispriest; RANGE_LEVEL peel via `save_light_sources`; stash+null `billobjs`; `restore_light_sources` on getlev; bones `update_mlstmv`; `save_mtraits` zeros EPRI times; export `discard_flashes`. It **does not** gate on `cant_go_back`. Named. It **does not** use light.c `mx > 0` for LS_MONSTER.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `update_mlstmv` | LIVE body, **C-wrong skip** | stamps every `fmon`; C `iter_mons` skips dead/offmap |
| `save_light_sources` | LIVE peel, **C-wrong LS_MONSTER** | `obj_is_local` LIVE; LS_MONSTER uses timeout.c `mon_is_local` |
| `restore_light_sources` | LIVE in-memory analogue | push not C prepend; live `ls.id` pointers |
| `discard_flashes` | LIVE | re-pointed local → export; `--can` ALREADY |
| `forget_temple_entry` | LIVE | skips C `impossible` |
| `save_mtraits` EPRI | CLONE | inlines zeros; C calls `forget_temple_entry` |
| `obj_is_local` | LIVE | timeout.c; pack lamps RANGE_GLOBAL |
| `clear_light_sources` / `relight_monsters` | deleted from `do.js` | still exported `light.js`; do **not** restore the wipe |
| `cant_go_back` FREEING | OMIT named | worms/bubbles/exclusions/JSON serLevel too |

`node scripts/sym.mjs`:

```
update_mlstmv    js/dog.js:338   sync
forget_temple_entry js/priest.js:48   sync
save_light_sources js/mkobj.js:893   sync
restore_light_sources js/mkobj.js:913   sync
discard_flashes  js/light.js:230   sync
clear_light_sources js/light.js:82   sync
relight_monsters js/light.js:90   sync
obj_is_local     js/mkobj.js:802   sync
mon_is_local     js/mkobj.js:786   sync
save_mtraits     js/mkobj.js:2703   sync
```

Re-points: `do.js` dropped `clear_light_sources`/`relight_monsters`; added `save_light_sources`/`restore_light_sources`/`update_mlstmv`/`forget_temple_entry`. `--can js/do.js js/mkobj.js save_light_sources` / `js/dog.js update_mlstmv` / `js/priest.js forget_temple_entry`; `--can js/mkobj.js js/light.js discard_flashes`; `--can js/bones.js js/dog.js update_mlstmv`: all **ALREADY**. No new TDZ edge. Do **not** add `forget_temple_entry` #2 (save_mtraits already inlined). Do **not** add `mon_is_local` #2. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: none. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**`update_mlstmv`.** C `iter_mons(set_mon_lastmove)`: `mlstmv = svm.moves` only for living on-floor (`DEADMONSTER` `mhp<1`, `mon_offmap` `mstate != MON_FLOOR`). Callers: ordinary leave `:1642` **after** `keepdogs` (followers already on `mydogs`); bones `:620`. JS walks `game.fmon || []` and stamps every truthy pointer. **Does not skip dead/offmap.** Bones call after the VFS exists check: **Match caller site**, not `iter_mons` filter. JS also runs on endgame/tutorial leave; C skips when `cant_go_back`. Named omit vs extra JS work.

**RANGE_LEVEL lights.** C `savelev_core` `:540` `save_light_sources(RANGE_LEVEL)`: `discard_flashes`; `vision_full_recalc=0`; write via `maybe_write_ls`; FREEING removes `is_global ^ (range==RANGE_LEVEL)`. Pack lamps `OBJ_INVENT` → `obj_is_local` FALSE → global → **kept** on `light_base`. JS peel `light_is_local === (range==RANGE_LEVEL)` into the stash, rest kept. **Match the pack-lamp fix vs `clear_light_sources`.** `LS_OBJECT` uses timeout `obj_is_local` like C `:450`. **LS_MONSTER does not.** C `:373`/` :453` / `maybe_write_ls` `:586` is **`mx > 0`**, not timeout.c migrating/mydogs (`:2584–2596`). Comment “Uses obj_is_local / mon_is_local (timeout.c), not a cloned test” is **false for LS_MONSTER**. A mydogs follower with `mx>0` is local in C light.c (peeled onto the left level) and non-local in JS (stays on `light_base`). **C-wrong.**

**Restore.** C `:478–493` prepends file records. JS `push` of the same live objects. Relink-by-id is Cluster 2/4 (JSON). In-memory stash: **Match pointers.** `relight_monsters` removed; C getlev does not call it here.

**billobjs / damage.** C `saveobjchn(&gb.billobjs)` then FREEING zeros. JS stash `billobjs` then `game.billobjs = null`; restore `info.billobjs`. **Match ordinary leave.** `damagelist` copied onto the stash **and** still lives on the same `GameMap` object (`info.level`); restore does not re-assign. In-memory: list survives. JSON `serLevel` later. Not a live wipe.

**Temple.** C savemonchn `:891–895` `forget_temple_entry` only when `update_file` (WRITING). JS after keepdogs walks `fmon` ispriest. Ordinary leave **Match**. `save_mtraits` C `:2159–2160` **calls** `forget_temple_entry`. JS inlines the four zeros (no `impossible`). **CLONE of a LIVE just added.**

Callee closure (ordinary leave). LIVE: `update_mlstmv` (filter wrong), `save_light_sources` (LS_MONSTER wrong), `restore_light_sources`, `discard_flashes`, `forget_temple_entry`, `obj_is_local`. CLONE: `save_mtraits` EPRI. OMIT named: cant_go_back; worms/bubbles/exclusions; JSON serLevel. STUB: **none** — `clear_light_sources` is deleted, not stubbed. Combined-arm ships **with C-wrongs in live callees**. Not “callee stubbed”; **callee disagrees with C**.

## Hallucinations / overclaim

Subject “peels RANGE_LEVEL lights … instead of wiping pack lamps”: **true for LS_OBJECT / invent lamps.** D-log “via `obj_is_local`/`mon_is_local`”: **true for objects, false for monster lights** — C light.c macro is `mx>0`. Do **not** stamp “Match C `iter_mons`.” Do **not** stamp “Match C `cant_go_back` FREEING.” Do **not** restore `clear_light_sources` on leave. Do **not** stamp “Match C `savedamage` JSON.” `clear_light_sources` remains for other callers (`light.js:82`).

## Density

§2b: one `savelev` leave envelope (mlstmv + lights + billobjs + temple + bones caller). Related. +109. Did not glue `serLevel` JSON.

## Verification

Journal: green+strict seed8000/0900; seed0013 restore; seed0015/0700/0014 stairs; seed0105 lamp; trap-same-floor 17/17. Public stairs/leave **is** hit. LS_MONSTER `mx` vs mydogs **public-unhit**. Pack-lamp keep is the seed0105 canary, not yellow-light followers.

## Actionable C-wrongs

1. **`save_light_sources` LS_MONSTER `mx > 0`** — `light.c:373` / `:453` / `maybe_write_ls` `:586`. One port: `light_is_local` for `LS_MONSTER` is `(ls.id.mx | 0) > 0`. Keep timeout.c `obj_is_local` / `mon_is_local` for **timers** and `LS_OBJECT`. Do **not** delete the timeout.c helpers. Do **not** restore `clear_light_sources` on `goto_level`.
   **Addressed:** D-1708 `0c0f29fe`
2. **`update_mlstmv` `iter_mons` filter** — `mon.c:4531–4535` skip `DEADMONSTER` (`mhp<1`) and `mon_offmap` (`mstate != MON_FLOOR`). One port: same skip in `dog.js` `update_mlstmv`.
   **Addressed:** D-1709
3. Named / clone: `save_mtraits` should `forget_temple_entry(mtmp)` not inline; `cant_go_back` skip; C `impossible` on non-priest; JSON `serLevel`; worms/bubbles/exclusions. Do **not** add `forget_temple_entry` #3. Do **not** re-port RANGE_LEVEL timers (D-1037). Do **not** re-port savetrapchn (D-1694).

Verdict: **QUALITY-RISK**
