# Review 564 — d1a832a1 — allmain.c/restore.c beyond_savefile_load (D-1603)

## Metadata
- Full / short hash: `d1a832a16bad9176b9d45ce38d323f471b20e9e0` / `d1a832a1`
- Parent: `b113f1cc` (audit of D-1594–D-1602). This file audits **this SHA only** (first of nine `js/` commits since review **563**). Archive **Addressed:** D-1603 `d1a832a1`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 00:13:36 +0200
- D-id: **D-1603**
- Stats: `js/allmain.js` +9/−1, `js/save.js` +5, `js/invent.js` +2 comments. Band **150–350** (js/ insertions **16**).
- Claims to close: Must-fix review **561** (gate copied, store never written). Not tty WIN_INVEN create. Not `#perminv`. Not `optfn_perminv_mode`. `reviews/loop-2026-08-15/` has no unpaid beyond_savefile Must-fix.
- JS / map: `allmain.js` `moveloop_preamble`; `save.js` `try_restore_save`; reader still `invent.js` `sync_perminvent`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **561** Actionable #1 (QUALITY-RISK). Review file already stamped `**Addressed:** D-1603 d1a832a1`.

## Intent vs deliverable

Git subject promises: `beyond_savefile_load` is set after a new game or restore so perm_invent InvInUse can run.

Pinned C `allmain.c` `moveloop_preamble` `:47–111`. New-game store `:70–71`. After `in_moveloop=1`, `if (iflags.perm_invent) update_inventory()` `:107–110`. `restore.c` `dorecover` `:788–951`, store `:942` after `restoring=0` / `early_raw_messages` and before `docrt()`. Reader `invent.c` `sync_perminvent` `:5653–5656`. Window create `init_sound_disp_gamewindows` `:698–763` (`WIN_INVEN = create_nhwindow(NHW_MENU)` `:726`). `--callers moveloop_preamble`: `moveloop` `:589`. `--callers dorecover`: `unixmain.c:263`. `--callers sync_perminvent`: toggle `:5673`; options `:5515`; `wintty.c:3609`. `--callers update_inventory`: `allmain.c:110` plus 140+ gameplay sites.

```70:71:nethack-c/upstream/src/allmain.c
    if (!resuming) { /* new game */
        program_state.beyond_savefile_load = 1; /* for TTY_PERM_INVENT */
```

```939:944:nethack-c/upstream/src/restore.c
        wait_synch();
    }
    u.usteed_mid = u.ustuck_mid = 0;
    program_state.beyond_savefile_load = 1;

    docrt();
```

Old JS: `jsmain.js:192` `program_state = {}`; preamble set `in_moveloop` only; `try_restore_save` never wrote the field. Review **561** copied `:5653` and left InvInUse dead.

The diff **does** assign `beyond_savefile_load = 1` on `!resuming` and on restore success, and calls `update_inventory()` after `in_moveloop` when `iflags.perm_invent`. It **does not** create `WIN_INVEN` at `:726`, paint tty, `#perminv`, or `optfn_perminv_mode`. Named. Preamble(`true`) still does **not** set the field (C restore writes it in `dorecover`, not preamble).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `beyond_savefile_load` new-game store | C `:71`, **LIVE this SHA** | field, not a function |
| `beyond_savefile_load` restore store | C `:942`, **LIVE this SHA** | `try_restore_save` stand-in |
| `in_moveloop` then `update_inventory` | C `:107–110`, **LIVE this SHA** | Default Off no-op |
| `sync_perminvent` `:5653` reader | C `:5653–5656`, **LIVE** | D-1600; now reachable |
| `update_inventory` | C `:2778–2810`, **LIVE** | already required `in_moveloop` |
| `pickinv_build_perm` | C WIN_INVEN `display_pickinv`, **CLONE** | D-1600; do not add #2 |
| `WIN_INVEN` `create_nhwindow` | C `:726`, **OMIT named** | still Open-shaped map debt |
| `#perminv` / `optfn_perminv_mode` | C cmd/options, **OMIT named** | |
| `early_raw_messages` wait | C `:933–939`, **OMIT named** | restore stand-in |
| `reset_glyphmap` / `inven_inuse` | C dorecover, **OMIT named** | pre-existing restore subset |
| `ctrl_nhwindow_perm` maxslot | **STUB named** | assesstty; not this SHA |

`node scripts/csym.mjs moveloop_preamble` → `:47-111`. `dorecover` → `:788-951`. `sync_perminvent` → `:5564-5658`. `update_inventory` → `:2778-2810`. `init_sound_disp_gamewindows` → `:698-763`. `moveloop` → `:586-597`.

RNG: `rnd(9000)` / `rnd(30)` already in the `!resuming` arm (pre-existing). This SHA adds no RNG. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names (field store + existing `update_inventory` import; no clone→import):

```
beyond_savefile_load NOT FOUND in js/** (no export, no local function/const).
             This index includes js/generated/. Do not add a local clone.
moveloop_preamble js/allmain.js:137   ASYNC — await required
try_restore_save js/save.js:319   sync
update_inventory js/invent.js:2632   sync
sync_perminvent  js/invent.js:2563   sync
pickinv_build_perm NOT EXPORTED — 1 LOCAL (invent.js:1743). Do NOT write clone #2.
```

`--can allmain.js invent.js update_inventory`: ALREADY. `save.js` does not import invent (field store only). Do **not** stamp “cycle-forced clone.” Do **not** add `pickinv_build_perm` #2. Do **not** add a `beyond_savefile_load()` helper.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

New-game store. `if (!resuming) { program_state.beyond_savefile_load = 1;` then `rndencode` / `set_wear` / `reset_justpicked` / seer / umovement / `initrack`. **Match `:70–71` then `:72–83` order** (JS still defers C `pickup(1)` — pre-existing, not this SHA). That is the **561** C-wrong.

`in_moveloop` then perm_invent. C `:107–110` sets `in_moveloop=1` then `if (iflags.perm_invent) update_inventory()`. JS does the same. `update_inventory` itself returns when `!in_moveloop` (`:2786`). **Match.** Default Off: `iflags.perm_invent` falsy → skip. **Match.** Public path unchanged.

Restore store. C `:942` after `restoring=0` and the `early_raw_messages && !beyond_savefile_load` wait, before `docrt()`. JS `try_restore_save` writes the field after payload rebuild and before `vfsDeleteFile`. `jsmain.js:224–232` then `docrt` / `welcome(false)` / `moveloop_preamble(true)`. Flag-before-`docrt` **matches C relative order**. Preamble(`true`) does not rewrite the field. **Match** the Must-fix constraint. `early_raw_messages` / `usteed_mid` / `restoring` flags / `reset_glyphmap` / `inven_inuse` / `run_timers` stay the restore stand-in. Named.

`:5653` reader. `WIN_INVEN != WIN_ERR && beyond_savefile_load` then `pickinv_build_perm`. The boolean is now 1 on new game and restore success. **Match the store.** `WIN_INVEN` is still not created at `:726`; default Off never needs it. On-path without tty create is the named omit, not a missed store.

Callee closure (this SHA’s writers). LIVE: `update_inventory` → `sync_perminvent` → D-1600 builder. OMIT named: window create / `#perminv` / options / early_raw wait. STUB: none in the two stores. Combined-arm may ship. Not “dispatch ported, callee stubbed.” InvInUse helpers remain D-1600.

## Hallucinations / overclaim

Subject new-game/restore can run InvInUse: **true of the `:5653` gate**; still false of tty paint until `WIN_INVEN` exists. D-log “preamble writer, not a poked flag”: **true** (`allmain.js:159`, `save.js:437`). D-log “Default Off still no-ops”: **true.** Do **not** stamp “Match C `init_sound_disp_gamewindows` `:726` WIN_INVEN create.” Do **not** stamp “Match C `#perminv` (`cmd.c:1797`).” Do **not** stamp “Match C `optfn_perminv_mode`.” Do **not** stamp “Match C `early_raw_messages` wait.” Do **not** stamp “Match C `dorecover` `reset_glyphmap` / `inven_inuse`.” Private canary 13/13 that asserts the preamble store does not prove tty two-column paint.

## Density

Must-fix one item: the two C stores plus the same-function `:107–110` `update_inventory` after `in_moveloop`. +16 JS. Playbook §2b “unless C is that small” / Must-fix stays alone. Did not glue `#perminv`. OK.

## Branch-by-branch confirm

1. New game `!resuming`: set flag then starting-gear RNG. **Match `:70–83`.**
2. Restore `try_restore_save` success: set flag; preamble(true) does not. **Match `:942` vs preamble.**
3. `in_moveloop=1` then `if (perm_invent) update_inventory()`. **Match `:107–110`.**
4. Default Off: skip that call; `sync_perminvent` still returns before display. **Match.**
5. Restore `docrt` after the flag in `jsmain`. **Match relative order.**
6. `WIN_INVEN` create / `#perminv` / options / early_raw wait. **Named.**

## Callers / RNG ledger

Wired: `moveloop_preamble(false)` from `allmain.js` newgame path; `try_restore_save` then `moveloop_preamble(true)` from `jsmain.js`. Extra `rnd` in the new-game arm is pre-existing C. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. Do not poke `beyond_savefile_load` from a seed name to “prove” InvInUse. Do not add `pickinv_build_perm` #2. Do not treat invented `maxslot` as `assesstty`. Do not skip Off no-op. Do not wrap `wildmiss` as `pline_mon`.

## Verification

D-log private canary **13**/13 (preamble writer, restore stand-in, InvInUse `is_inuse` list); green+strict seed8000/0900; cohort **10**/10 + strict (1500/1800/0012/0004/0007/2200/0383 + restore 0013). **Public-unhit** for `perm_invent` On / InvInUse window. Fortress does not prove tty paint. Restore 0013 hits `try_restore_save` with default Off (flag set, display still no-op).

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): `init_sound_disp_gamewindows` `WIN_INVEN = create_nhwindow(NHW_MENU)` (`allmain.c:726`); tty WIN_INVEN paint; InvSparse; `#perminv` `doperminv`; `optfn_perminv_mode`; `consume_obj_charge` `update_inventory`; Off-toggle `docrt`; restore `early_raw_messages` wait (`:933–939`). Do not add `pickinv_build_perm` #2. Do not restore the missing store as an “Off early-return.” InvInUse helpers are D-1600.

Verdict: **ACCEPT-WITH-DEBT**
