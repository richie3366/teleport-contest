# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

## Active

- **#1546** D-1217 `#lookaround`/`dolookaround` shipped. Fortress **44**/44.
  Next Open `options.c` `opt_accessiblemsg` wire `a11y.accessiblemsg`
  (named). Not dolookaround. Do not revert D-1201–D-1217. Default
  `glyph_updates` Off. Do not add lookaround AUTOCOMPLETE. Corridor-goes-to
  / outside-room TODO / integer glyph_at / full `do_screen_description` /
  GFILTER_AREA / aA cycle still named. Do not prepend Must-fix for named
  omits (hideunder / impact / remaining `pline_mon` / run>=2 boulder /
  `DIR_UP` const swap).

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown or inner-`parse` after it (D-1186).
  Do not skip ParanoidTrap portal yn (D-1187).
  Do not skip hero `domagicportal` / `undestroyable_trap` escape
  / `mktrap` dst / `goto_level` uz0 reset (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip
  D-1190…D-1217 (`kill_genocided` / `run_timers` / wizkit FALSE /
  `deliver_obj_to_mon` / `goto_level` `notice_mon_off` wrap /
  rloc wand `makeknown` / dest-msg `set_msg_xy` / `scrolltele`
  W-tower Override yn / `migrate_to_level` W-tower xyflags bit 2 /
  `mon_arrive` After_you `my=xyflags` / newgame `notice_mon_off` /
  `init_artifacts` / REVIVE/ZOMBIFY / `#levelchange` drain /
  `SCR_MAIL`/`uwepgone` light / `scrolltele` unconscious / steed
  `whobuf` `mon_nam` / `vpline` accessiblemsg consume / `dotele`
  trap-at-feet teledest / `dotelecmd` m-prefix / xkilled
  `zombie_maker`+`gz.zombify` / mhitm `monkilled` zombify /
  `revive_corpse` MINVENT/CONTAINED + Adjmonnam /
  `rot_corpse` invent/minvent worn /
  `disturb_buried_zombies` rumble/tread/wake/grounded-move /
  `pline_xy`/`pline_mon` youmonst (0,0) /
  `set_msg_dir`/`pline_dir` dirtocoord+ux,uy /
  `#lookaround`/`dolookaround` + GLOC_INTERESTING FALLTHROUGH).
- Don't re-apply D-0480 **glyph** `tty_map_color` (D-0483).
- Don't skip painting spaces or emit mid-row space runs >4 (D-0931).
- Do not FORCE shk satdoor/`onlineu` (D-0376) or linedup/FlipX (#1092).
- Do not blanket-restore overlay `_pending_message` (D-0929).
- Do not HEAVY_IRON_BALL `owt!=0` (#1194). Judge does **not** elide
  RC (D-0933); do not extend §1.2. Do not chase public LB in-loop.
- Do not push shared `maketrap` PIT morph (D-0972).
- Do not memcpy gi worn/ball pointers (D-1035) / `setnotworn` from
  `owornmask` (D-1020) / `delobj` tutorial loot / off-level timers
  (D-1037) / omit `msounds[]` (D-1053).
- Do not restore tut-1 hardcoded keys (D-1065) / skip `tutorial()`
  nhcore (D-1066) / dosit `"your steed"` (D-1067) / skip hider clear
  (D-1068) / Levitation-only `dosit` (D-1069) / sticky `u.Levitation`
  in `can_reach_floor` (D-1070).
- Do not skip D-1071…D-1217 / later D-ids in CURRENT. Do not skip D-1213
  invent Your / minvent `setmnotwielded`. Do not skip D-1214
  rumble/tread/`wake_nearto`/grounded `MMOVE_MOVED`. Do not restore
  youmonst `pline_mon` as ux,uy (D-1215). Do not skip `dirtocoord`
  no-op then +=ux,uy (D-1216). Do not zero loc on invalid dir.
  Do not restore empty glyph_updates then-arm (D-1217).
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop` to save a youprop clone (D-1060 / D-1085 /
  D-1089). Do not rewrite other `Antimagic()` clones.
- Do not pull `reset_glyphmap` / vision.c `notice_all_mons` /
  `makemap_prepost` / `wiz_makemap` / `restore_artifacts`.
  Default `spot_monsters` Off. Default `glyph_updates` Off.
  remaining `pline_mon` callers / `msg_mon_movement` /
  rolling-boulder TELEP `pline_xy` / run>=2 boulder `pline_dir` /
  LEVEL_TELEP yn / energy/`spelleffects` / `#teleport` `doextcmd` /
  BURIED `!is_zomb` impossible / Soundeffect / `opt_accessiblemsg`
  / `show_glyph_change` still named.
  Do not treat D-1209 `'s'` as live spellcast. Do not treat
  `dothrow` `game.thrownobj` as wired (review **172**).
  Do not Must-fix `DIR_UP`/`DIR_DOWN` const swap on a pline writer
  (arrays already match `decl.c`; review **178**).

## Landmarks (≤15)

- #1546 D-1217 dolookaround; cadence 44/44; next
  `opt_accessiblemsg`. Map-driven / one cluster, not FAIL peels.
