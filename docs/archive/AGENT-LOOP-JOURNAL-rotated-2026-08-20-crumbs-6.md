# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-08-20 — D-1292 dothrow.c throwit slip

**Objective:** Open `dothrow.c` throwit slip (named from D-1283).
Not stamina.
**C locus:** `dothrow.c` `throwit` `:1526–1547` (before thrownobj);
`throwing_weapon` `:1430–1438`; `ammo_and_launcher`.
**Change:** cursed/greased horizontal `!rn2(7)` misfire/slip;
`rn2(3)-1` dx/dy, `dz=1` if both 0, `impaired=true`; `notonhead`
reset. Stamina / steed / boomhit named. Rule #2: no fs.
**Verified:** private canary **13**/13; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Public-unhit** unless a session throws cursed/greased horizontally.
**Next:** Open `dothrow.c` throwit stamina. Not slip.
**Blocked:** none.

## 2026-08-20 — D-1291 mhitu.c wildmiss set_msg_xy then pline

**Objective:** Open `mhitu.c` wildmiss `set_msg_xy` then `pline`
(named from D-1286). Not `pline_mon`. Not missmu.
**C locus:** `mhitu.c` `wildmiss` `:176–261` (`:206` `set_msg_xy`
then `pline`); callers `mattacku` `:816`/`:920`.
**Change:** one `set_msg_xy(mx,my)` then existing `pline` arms;
`nolimbs` `"lunges"`. Did not wrap as `pline_mon`. Some_Monnam
impossible / mswings / AT_ENGL gulps/lunges named. Rule #2: no fs.
**Verified:** private canary **20**/20; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Public-unhit** unless `accessiblemsg` On on a wildmiss line.
**Next:** Open `dothrow.c` throwit slip. Not stamina.
**Blocked:** none.

## 2026-08-20 — #1635 review D-1287–D-1290 + cadence

**Objective:** audit — C-fidelity reviews **249–252** of JS SHAs
since `955022fe`, plus full `sessions` score. No `js/` port.
**C locus:** `stairs.c` `u_on_sstairs`; `cmd.c` `makemap_prepost`;
`objnam.c` wizterrainwish trap loop; door/wall.
**Change:** four reviews, all **ACCEPT-WITH-DEBT**. No Must-fix
(named omits stay map: savelev-freeing; SCORR; drawbridge;
`pooleffects`). Filled D-1290 archive hash `67c863ad`. Open
first row was a C-wrong name (`wildmiss` `pline_mon`); collapsed
to C `:206` `set_msg_xy` then `pline`. Open 10 (no refill).
Rule #2: no fs.
**Score:** cadence **#1635** HEAD `67c863ad` **44**/44 Scr
**11,405**/11,405 RNG **792,838**/792,838 (100%) speed
`36+0.30/turn` (R² 0.85). seed0383 PASS. Next audit @**#1640**.
**Verified:** `__RESULTS_JSON__` at HEAD `67c863ad`; branch-by-branch
vs pinned C (sstairs else live rndspot; post
`u_on_rndspot(amulet|wiztower)`; `str_start_is`+live `maketrap`;
doormask/HWALL + live `fix_wall_spines`).
**Next:** Open `mhitu.c` wildmiss `set_msg_xy` then `pline`. Not
`pline_mon`.
**Blocked:** none.

## 2026-08-20 — D-1290 objnam.c wizterrainwish door/wall

**Objective:** Open `objnam.c` wizterrainwish door/wall (named from
D-1279). Not traps.
**C locus:** `objnam.c` `wizterrainwish` `:3740–3835`; helper
`set_wallprop_from_str`; door-state preparse `:4037–4065`.
**Change:** door location gate + doormask/secret/rogue/trapped;
wall HWALL/VWALL + live `fix_wall_spines`; `set_wallprop_from_str`
on tree/bars/wall; locked/open/broken/doorless/`trapped ` prefixes.
Named: secret corridor; drawbridge; `pooleffects`. Rule #2: no fs.
**Score:** fortress 44/44; public-unhit unless a wizard wishes
door/wall. Next audit @**#1635**.
**Verified:** private canary **30**/30; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `mhitu.c` `wildmiss` `pline_mon` (named from
D-1261). Not missmu.
**Blocked:** none.

## 2026-08-20 — D-1289 objnam.c wizterrainwish trap loop maketrap

**Objective:** Open `objnam.c` wizterrainwish traps (named from
D-1279). Not door/wall.
**C locus:** `objnam.c` `wizterrainwish` `:3563–3582` before furniture;
callee live `trap.c` `maketrap`; `hacklib.c` `str_start_is`.
**Change:** trap names via `str_start_is` + live `maketrap`/`trapname`;
hole `!Can_fall_thru`→ROCKTRAP; portal "to nowhere"; fail still
`hands_obj`. Named: door/wall/secret corridor; drawbridge;
`pooleffects`; `trapped ` preparse. Rule #2: no fs.
**Score:** fortress 44/44; public-unhit unless a wizard wishes a
trap by `trapname`. Next audit @**#1635**.
**Verified:** private canary **20**/20; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
**Next:** Open `objnam.c` wizterrainwish door/wall (named from
D-1279). Not traps.
**Blocked:** none.

## 2026-08-20 — D-1288 cmd.c makemap_prepost → u_on_rndspot

**Objective:** Open `cmd.c` wiz-level `u_on_rndspot` (named from
D-1278). Not sstairs.
**C locus:** `cmd.c` `makemap_prepost` `:1045–1046`; caller
`wizcmds.c` `wiz_makemap` `:154–171`.
**Change:** post-arm places via live `u_on_rndspot` with C
amulet|wiztower flags (not safe_teleds), then losedogs/collide/
initrack/docrt. Thin pre zeros dest. `#wizmakemap` no AUTOCOMPLETE.
Named: `makemap_remove_mons`; savelev-freeing; lua lspo;
`On_W_tower_level`; goto_level bit 2. Rule #2: no fs.
**Score:** fortress 44/44; public-unhit unless `#wizmakemap` with
leftover Lev/Fly FROMOUTSIDE. Next audit @**#1635**.
**Verified:** private canary **10**/10; green+strict seed8000/0900;
cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383.
