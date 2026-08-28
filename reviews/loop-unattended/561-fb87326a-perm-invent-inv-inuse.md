# Review 561 — fb87326a — invent.c perm_invent InvInUse (D-1600)

## Metadata
- Full / short hash: `fb87326acf4befb5422ef521726befd808af87aa` / `fb87326a`
- Parent: `95ad0f11` (D-1599). This file audits **this SHA only** (seventh of nine `js/` commits since review **554**). Archive **Addressed:** D-1600 `fb87326a`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-28 23:00:30 +0200
- D-id: **D-1600**
- Stats: `js/const.js` +19, `js/invent.js` +249/−25. Band **150–350**; js/ insertions **268** so ceiling **450**.
- Claims to close: Open perm_invent `InvInUse` after D-1589. Not `#perminv` scroll. Not InvSparse grid. Not `optfn_perminv_mode`. Not `consume_obj_charge` redraw. `reviews/loop-2026-08-15/` has no unpaid InvInUse Must-fix.
- JS / map: `invent.js` `prepare_perminvent` / `sync_perminvent` / `pickinv_build_perm`; `const.js` `InvInUse`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **550** named perm_invent `InvInUse` (`:3112`).

## Intent vs deliverable

Git subject promises: the persistent inventory window filters to items currently in use instead of listing the whole pack.

Pinned C `invent.c` `prepare_perminvent` `:5548–5562`. `display_pickinv` WIN_INVEN `:3108–3113` (`show_gold = invmode & InvShowGold`, `inuse_only = invmode & InvInUse`). Header `"In use"` `:3277–3280`. Skip unquivered gold `:3281–3286`. Empty strings `:3372–3375`. `sync_perminvent` `:5564–5658` then `display_inventory(NULL, FALSE)` iff `WIN_INVEN != WIN_ERR && program_state.beyond_savefile_load` (`:5653–5656`). `perm_invent_toggled` `:5660–5677`. `wintype.h:192` `InvInUse = 8`. `allmain.c:71` **sets** `beyond_savefile_load = 1` on new game “for TTY_PERM_INVENT”. `restore.c:942` sets it after load. `--callers prepare_perminvent`: allmain `:733`; display_pickinv `:3110`; sync `:5577`. `--callers sync_perminvent`: toggle `:5673`; options `:5515`; `wintty.c:3609`.

```70:71:nethack-c/upstream/src/allmain.c
    if (!resuming) { /* new game */
        program_state.beyond_savefile_load = 1; /* for TTY_PERM_INVENT */
```

```5653:5656:nethack-c/upstream/src/invent.c
    if (WIN_INVEN != WIN_ERR && program_state.beyond_savefile_load) {
        gi.in_sync_perminvent = 1;
        (void) display_inventory((char *) 0, FALSE);
```

Old JS: `sync_perminvent` returned before any WIN_INVEN build when Off (and On was named). `inuse_only` lived only for `flags.sortloot=='i'` (D-1589).

The diff **does** copy inv_modes, `prepare_perminvent`, toggle, `pickinv_build_perm` InvInUse/`is_inuse`, InvShowGold gold skip, `"In use"` / empty placeholders, and the C `:5653` gate. It **does not** set `beyond_savefile_load` at `allmain.c:71` or `restore.c:942`. JS `jsmain.js:192` starts `program_state = {}`; `allmain.js` sets `in_moveloop` only. `pickinv_build_perm` is therefore unreachable in a running game. Named: tty paint, InvSparse, `#perminv`, `optfn_perminv_mode`, assesstty geometry, `consume_obj_charge`.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `InvInUse` / `InvOpt*` | C `wintype.h:189–204`, **LIVE** | `8` / `InvOptInUse` |
| `prepare_perminvent` | C `:5548–5562`, **LIVE this SHA** | |
| `perm_invent_toggled` | C `:5660–5677`, **LIVE this SHA** | |
| `sync_perminvent` On arm | C `:5564–5658`, **LIVE envelope** | |
| `pickinv_build_perm` | C `display_pickinv` WIN_INVEN, **CLONE** | local extract |
| `pickinv_build_inuse` `doing_perm_invent` | C `:3277–3375`, **LIVE** | D-1589 + this header/empty |
| `is_inuse` | C `:2164–2170`, **LIVE** | import/same module |
| `ctrl_nhwindow_perm` | C `tty_ctrl_nhwindow` `:2850–2910`, **STUB** | invented `maxslot` 16/32; assesstty named |
| `obj_glyph` | C `obj_to_glyph` + display RNG, **LIVE** | |
| `beyond_savefile_load` assign | C `allmain.c:71` / `restore.c:942`, **missed** | gate copied, store never written |
| tty WIN_INVEN paint / InvSparse / `#perminv` | C wintty / `cmd.c:1797`, **OMIT named** | |
| `optfn_perminv_mode` | C options, **OMIT named** | |
| `consume_obj_charge` `update_inventory` | C, **OMIT named** (still Open) | |
| `docrt` on Off-toggle | C `:5588`, **OMIT named** | |

`node scripts/csym.mjs prepare_perminvent` → `:5548-5562`. `sync_perminvent` → `:5564-5658`. `is_inuse` → `:2164-2170`. `perm_invent_toggled` → `:5660-5677`.

RNG: `obj_glyph` may consume `rn2_on_display_rng` under Hallu **if** the build ran. Default Off never reaches it. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
prepare_perminvent js/invent.js:273   sync
perm_invent_toggled js/invent.js:289   sync
sync_perminvent  js/invent.js:2561   sync
InvInUse         js/const.js:336   sync   export const
InvShowGold      js/const.js:334   sync   export const
InvOptOn         js/const.js:338   sync   export const
is_inuse         js/invent.js:685   sync
pickinv_build_perm NOT EXPORTED — 1 LOCAL (invent.js:1741). Do NOT write clone #2.
pickinv_build_inuse NOT EXPORTED — 1 LOCAL (invent.js:1668). Do NOT write clone #2.
ctrl_nhwindow_perm NOT EXPORTED — 1 LOCAL (invent.js:253). Do NOT write clone #2.
perminvent_listed js/invent.js:1779   sync
obj_glyph        js/display.js:1224   sync
```

`--can invent.js display.js obj_glyph`: ALREADY. `ctrl_nhwindow_perm` is a **local** tty subset, not an import. Do **not** add `tty_ctrl_nhwindow` in `invent.js`. Do **not** add `is_inuse` #2.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

Constants. `InvNormal=1` `InvShowGold=2` `InvSparse=4` `InvInUse=8` `InvOptOn=InvNormal` `InvOptInUse=InvInUse` `toggling_off=-1` `set_mode=1` `request_settings=2` `too_small=0x002` `prohibited=0x004` `too_early=0x010`. **Match `wintype.h:181–213`.**

`prepare_perminvent`. Copy `iflags.perminv_mode` onto `wri_info.fromcore.invmode` when `perminv_flags` differs. **Match `:5548–5562`.**

`perm_invent_toggled`. Negated: direction off, `WIN_INVEN=WIN_ERR`, `core_invent_state=0`. Else: direction on, `InvOptNone` → `InvOptOn`, `sync_perminvent`. **Match `:5660–5677`.** JS also clears `perminvent_*` arrays (WIN_INVEN destroy stand-in).

Default Off. `WIN_INVEN==WIN_ERR`, core 0, static `wri` null → return at `!wri || maxslot==0`. **Match.** Public path unchanged. Subsequent Off `update_inventory` still enters `sync_perminvent` (C does too; tty then no-ops).

`allmain.js` already sets `program_state.in_moveloop = 1` (C `allmain.c` moveloop). It does **not** set `beyond_savefile_load`. C splits those stores: `:71` is explicitly “for TTY_PERM_INVENT”, restore `:942` is after `restoring=0` and before `docrt()`. Copying only the `:5653` reader is not a Match of those writers.

InvInUse filter (the claim). `inuse_only = invmode & InvInUse` → `sortloot(SORTLOOT_INUSE, is_inuse)`, `"In use"` heading, fake-hands-only dropped to empty `"Not using any items"`. **Match `:3108–3113` + `:3186–3218` + `:3277–3280` + `:3372–3375` if `pickinv_build_perm` ran.** `is_inuse` is carried && (worn \|\| tool_being_used). **Match `:2164–2170`.** Gold skip when `!show_gold && invlet==GOLD_SYM && !owornmask`. **Match `:3281–3286`.** Non-inuse perm uses `SORTLOOT_INVLET` (C tty forces that under `TTY_PERM_INVENT` `:3180–3184`). **Match that ifdef.**

**The live call never happens.** `sync_perminvent` copies `:5653` but JS never writes `beyond_savefile_load`. C new-game **must** set it (`allmain.c:71`, comment names TTY_PERM_INVENT). Restore sets it at `:942`. That is a C-wrong, not a named omit.

`ctrl_nhwindow_perm`. set_mode returns wri. request_settings invents `maxslot` 16 (inuse) / 32 (else), never `too_small`. C `tty_ctrl_nhwindow` `:2875–2899` uses `assesstty` geometry (`maxslot = (maxrow-2) * (!inuse_only ? 2 : 1)`). Named. STUB on the On arm; window-port stand-in, not the InvInUse miss. `WIN_INVEN_ID = 20` is the same class of stand-in as C `create_nhwindow(NHW_MENU)` when toggling on (`:5648–5650`).

Callee closure (InvInUse WIN_INVEN). LIVE: `is_inuse`, `sortloot` INUSE, `prepare_perminvent`, `obj_glyph`. CLONE: `pickinv_build_perm` / inuse header. STUB: `ctrl_nhwindow_perm` maxslot (named assesstty). OMIT named: paint / sparse / `#perminv` / options. **Missed store:** `beyond_savefile_load`. Combined-arm must not ship as “filter live in-game.” Hallucination: “Match C InvInUse” is the helper, not the moveloop.

## Hallucinations / overclaim

Subject WIN_INVEN filters unused pack: **true of `pickinv_build_perm`, false of any session** until `beyond_savefile_load` is set. D-log “default Off still no-ops”: **true.** D-log “live invmode + WIN_INVEN stand-in”: **helpers only.** Do **not** stamp “Match C tty two-column paint.” Do **not** stamp “Match C InvSparse grid.” Do **not** stamp “Match C `#perminv` (`cmd.c:1797`).” Do **not** stamp “Match C `optfn_perminv_mode`.” Do **not** stamp “Match C `consume_obj_charge` `update_inventory`.” Private canary 23/23 that assigns the flag itself does not falsify the missing `allmain.c:71` store. This **is** “dispatch ported, production gate stuck closed.”

## Density

One perm_invent invmode cluster + toggle/sync envelope. +268 JS. Did not glue `#perminv` / options. §2b OK. The missed `allmain.c:71` store is a hole inside that envelope, not extra density.

## Branch-by-branch confirm

1. Off, core 0, `wri` null: return before display. **Match.**
2. `invmode & InvInUse` → `is_inuse` list + `"In use"`. **Match helper.**
3. Fake hands only → `"Not using any items"`. **Match helper** (`:3214–3217` + `:3372`).
4. `!InvShowGold` skip unquivered `$`. **Match helper.**
5. `beyond_savefile_load` after new game. **Miss.** JS never assigns.
6. tty paint / sparse / `#perminv` / options. **Named.**

## Callers / RNG ledger

Wired: `update_inventory` → `sync_perminvent` (already D-1126). Toggle exported. `allmain.c:733` `prepare_perminvent` at window create unwired (named paint). options `:5513` unwired (named). Display RNG only if the gated build ran. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. Do not add `is_inuse` #2. Do not add `pickinv_build_perm` #2. Do not treat invented `maxslot` as `assesstty`. Do not skip Off no-op. Do not set `beyond_savefile_load` from a seed name.

## Verification

D-log private canary **23**/23; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** (`perm_invent` Off). Fortress does not prove InvInUse. A canary that pokes `beyond_savefile_load` does not prove `allmain.js` matches `:71`.

## Actionable C-wrongs

1. Set `game.program_state.beyond_savefile_load = 1` where C does: `allmain.c:71` new game (comment: TTY_PERM_INVENT) and `restore.c:942` after load, so `sync_perminvent` `:5653` can call the InvInUse builder. One port iter. Do not glue `#perminv` or `optfn_perminv_mode`.

Named (map, not Must-fix): `ctrl_nhwindow` `assesstty` geometry; tty WIN_INVEN paint; InvSparse; `#perminv` `doperminv`; `optfn_perminv_mode`; `consume_obj_charge` `update_inventory`; Off-toggle `docrt`. Do not add `ctrl_nhwindow_perm` #2. Do not restore the Off early-return as the InvInUse “fix.”

Verdict: **QUALITY-RISK**

**Addressed:** D-1603
