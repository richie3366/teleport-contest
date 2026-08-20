# Review 250 — b741fb93 — cmd.c makemap_prepost → u_on_rndspot (D-1288)

## Metadata
- Full / short hash: `b741fb9314d28053779e7994721741264920fc0a` / `b741fb93`
- Parent: `04b325fd` (D-1287). This file audits **this SHA only**. Archive row **Addressed:** D-1288 `b741fb93` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 16:22:56 +0200
- D-id: **D-1288**
- Stats: 14 files, +221 / −45 — `js/wizcmds.js` +97; `js/getline.js` +10; exports `js/do.js` `deliver_splev_message` / `u_collide_m`; comments `js/hack.js` / `js/mklev.js` / `js/mon.js`.
- Claims to close: Open `cmd.c` wiz-level `u_on_rndspot` (named from D-1278 / reviews **240** / **249**). Not sstairs. `reviews/loop-2026-08-15/` has no unpaid wizmakemap Must-fix.
- JS / map: `wizcmds.js` `makemap_prepost` / `wiz_makemap`; `getline.js` `#wizmakemap`; live `mklev.js` `u_on_rndspot`; `c-js-map/turns.md`. `makemap_remove_mons` / savelev-freeing / lua lspo / `On_W_tower_level` / goto_level bit 2 named.
- Prior reviews this SHA claims to close: **240** / **249** named omit cmd wiz rndspot after stairs fallback.

## Intent vs deliverable

Git subject promises: “Match C cmd.c makemap_prepost so #wizmakemap places via u_on_rndspot(amulet|wiztower), instead of skipping that caller.”

C `makemap_prepost` (`cmd.c:986–1066`): pre discards (`makemap_remove_mons`, mapseen, mine/soko prize, Punished ball, pick/dig, travelcc, polearm, `reset_utrap`, `check_special_room(TRUE)`, memset dests, ustuck/swallow, `set_uinwater(0)`, `uundetected`, `dmonsfree`/`dobjsfree`, savelev-freeing). Post `:1040–1065`: `vision_reset` / `cls` / **`u_on_rndspot((u.uhave.amulet?1:0)|(wiztower?2:0))`** (comment: was `safe_teleds`) / `losedogs` / `kill_genocided_monsters` / `u_collide_m` / `initrack` / Punished placebc / `docrt` / `flush_screen(1)` / `deliver_splev_message` / `check_special_room(FALSE)` / INSURANCE. Caller `wizcmds.c` `wiz_makemap` `:156–171`: snapshot `In_W_tower` **before** pre, `makemap_prepost(TRUE)`, `mklev`, `makemap_prepost(FALSE)`; else `unavailcmd`. Extcmd `:1980–1981` `IFBURIED|WIZMODECMD` (no AUTOCOMPLETE).

Old JS: no `#wizmakemap`; rndspot callers were `goto_level` / `u_on_sstairs` only.

The diff **does** `#wizmakemap` + post `u_on_rndspot` with C flags + the post chain (losedogs / collide / initrack / docrt / splev / room). Pre is partial (ball, travelcc, trap, room-exit, dest zero, stuck/swallow, `set_uinwater(0)`, `uundetected`). It does **not** port `makemap_remove_mons`, `rm_mapseen`, prizes, pick/dig/polearm, `dmonsfree`/`dobjsfree`, savelev-freeing, INSURANCE, lua `lspo_*`. Named. JS `mklev` → `clear_level_structures` still replaces `fmon`/`GameMap` (not C savelev).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `makemap_prepost` post rndspot | C `:1043–1046`, **new** | live D-1278 callee |
| `makemap_prepost` pre dest/`set_uinwater` | C `:1026–1031`, **partial** | discard helpers named |
| `wiz_makemap` | C `:156–171`, **new** | `In_W_tower` snapshot then mklev |
| `#wizmakemap` EXT_CMDS | C `:1980`, **wired** | `autocomplete: false`; not in `EXT_CMD_AC` |
| `u_on_rndspot` | C `dungeon.c:1605`, **imported live** | |
| `losedogs` / `kill_genocided_monsters` / `u_collide_m` / `initrack` / `docrt` / `deliver_splev_message` / `check_special_room` / `set_uinwater` | C, **imported live** | collide/splev newly exported, bodies pre-existing |
| `In_W_tower` | C `dungeon.c:1923`, **imported live** | no `impossible` when `!nlx` |
| `zero_dest_area` | C `memset` dest_area, **clone** | eight coord fields only (`dungeon.h:46–51`) |
| `unavailcmd` | C `"Unavailable command '%s'."`, **clone** | generic “You can't do that.” like other wizcmds |
| `makemap_remove_mons` / savelev-freeing / lua lspo | C, **named omit** | |
| `On_W_tower_level` / goto_level bit 2 | C, **named omit** | rndspot gate still D-1179 |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Dynamic `import('./mklev.js')` is relative ESM. Rule #2 clean. **No new gameplay RNG** in pre/post (rndspot `rn1` is the live place).

## C ↔ JS fidelity

Pinned C post (`cmd.c:1043–1046`):

```
        /* was using safe_teleds() but that doesn't honor arrival region */
        u_on_rndspot((u.uhave.amulet ? 1 : 0) /* 'going up' flag */
                     | (wiztower ? 2 : 0));
```

JS: `await u_on_rndspot((amulet ? 1 : 0) | (wiztower ? 2 : 0))` with `amulet = !!(u.uhave?.amulet || u.uhave_amulet)` (same dual field as other JS amulet sites) and `wiztower` from the **pre-mklev** `In_W_tower` snapshot. Callee is live D-1278 (place + `switch_terrain`), not `safe_teleds`. This is **not** “Match C dispatch, callee is a stub.” Bit 2 still needs `dndest.nlx` after mklev; `On_W_tower_level` inside rndspot stays named — when dests are rebuilt, the exclusion arm runs; when `nlx==0`, place uses empty dest (`!lx` → whole map), same as C memset-then-mklev-without-levregion.

Post order after rndspot: `losedogs` → `kill_genocided_monsters` → `m_at`/`u_collide_m` → `initrack` → Punished `unplacebc`/`placebc` (`u.uball` ≡ `Punished`) → `docrt` → `flush_screen(1)` → `deliver_splev_message` → `check_special_room(false)`. Match `:1047–1062` minus INSURANCE.

Pre: skips the discard/prize/savelev block; keeps ballrelease, travelcc 0, `reset_utrap(false)`, `check_special_room(true)`, dest zero, ustuck/swallow, `set_uinwater(0)` (live D-1267), `uundetected=0`. `mklev`’s `clear_level_structures` drops `fmon` without C `makemap_remove_mons` migration — pets-on-#wizmakemap is that named omit, not a fake rndspot.

`wiz_makemap` non-wizard: doextcmd already rejects `ec.wiz`; inner pline is the same generic unavail clone as `#wizmap`. No AUTOCOMPLETE: not in `EXT_CMD_AC`. Match C flags minus IFBURIED buried-gate (JS has no buried cmd filter).

## Hallucinations / overclaim

Subject + D-1288 say `#wizmakemap` places via `u_on_rndspot(amulet|wiztower)`. **The post call + flags + `In_W_tower` snapshot are the hunk.** Stamping **Addressed:** D-1288 is fair. Do **not** stamp “Match C `makemap_remove_mons` / savelev-freeing.” Do **not** stamp “Match C mine/soko prize revoke.” Do **not** stamp “Match C `On_W_tower_level` / goto_level bit 2.” Do **not** stamp “Match C `unavailcmd` `%s`.” `mklev` replacing `GameMap` is not C `savelev`.

## Density

One C caller (`makemap_prepost` post) plus its `wiz_makemap` wrapper and extcmd row. ~97 JS lines in `wizcmds.js`. Related pre dest-zero so post dests come from the new mklev. Did not glue trap-name wishes. Right size.

## Branch-by-branch confirm

1. Wizard `#wizmakemap`, no amulet, not in tower: `u_on_rndspot(0)` then losedogs/docrt. Match flags 0.
2. Carrying Amulet: bit 1 set → updest `LR_UPTELE`. Match `:1045`.
3. Snapshot `In_W_tower` true: bit 2 ORed even after pre zeros dest. Match caller `:159–166`.
4. Bit 2 + new-level `dndest.nlx`: exclusion place then `switch_terrain`. Match rndspot when dest rebuilt.
5. Bit 2 + `nlx==0`: whole-map place (named `On_W_tower_level` / dest). Not a skipped rndspot.
6. Pre `set_uinwater(0)`: live D-1267 if `uinwater` was 1. Match `:1030`.
7. Monster on landing cell: `u_collide_m`. Match `:1052–1053`.
8. `u.uball`: unplace/place after initrack. Match Punished `:1055–1058`.
9. Non-wizard `#wizmakemap`: wizard-mode reject / generic unavail. Named wording.
10. Autocomplete `#wiz…`: `wizmakemap` not in `EXT_CMD_AC`. Match no AUTOCOMPLETE. Public-unhit unless a wizard recreates the level.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `await import('./hack.js')` etc. are relative ESM. Plain ESM.

## Verification

Journal: private canary **10**/10; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless `#wizmakemap` with leftover Lev/Fly `FROMOUTSIDE`. Cadence this audit: full `sessions` at HEAD `67c863ad` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `36+0.30/turn` (R² 0.85). I did not re-run the private canary.

## Actionable C-wrongs

None for Must-fix. Post placement is C `:1045–1046` into live rndspot; snapshot/flags/order after place match; discard helpers are named later arms, not a post that still calls `safe_teleds`.

Named omits (map, not Must-fix):

1. `makemap_remove_mons` / `rm_mapseen` / mine·soko prize
2. savelev-freeing / `dmonsfree` / `dobjsfree` / lua `lspo_reset_level` / `lspo_finalize_level`
3. `maybe_reset_pick` / digging memset / `polearm.hitmon` / INSURANCE
4. `On_W_tower_level` / goto_level bit 2; `unavailcmd` `ecname_from_fn`

Do not Must-fix “dynamic import instead of a static cycle.” Do not Must-fix “generic unavail string.” Do not Must-fix “JS mklev clears `fmon`.” Do not pull trap wishes this SHA.

## Callers / RNG ledger

C: `wiz_makemap` only. JS: `EXT_CMDS` `wizmakemap` → `wiz_makemap`. Place `rn1` inside rndspot. Public fortress is not evidence `#wizmakemap` honored updest.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: `#wizmakemap` post now awaits live `u_on_rndspot(amulet|wiztower)`; discard/savelev/lua stay named.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1288 `b741fb93`.
