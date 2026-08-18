# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

## Active

- **#1540** review D-1209–D-1212 against pinned C. All four
  ACCEPT-WITH-DEBT; Must-fix empty. Cadence **44**/44 R² 0.829.
  Next `rot_corpse` invent worn plines. Do not revert D-1201–D-1212.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown or inner-`parse` after it (D-1186).
  Do not skip ParanoidTrap portal yn (D-1187).
  Do not skip hero `domagicportal` / `undestroyable_trap` escape
  / `mktrap` dst / `goto_level` uz0 reset (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip
  D-1190…D-1212 (`kill_genocided` / `run_timers` / wizkit FALSE /
  `deliver_obj_to_mon` / `goto_level` `notice_mon_off` wrap /
  rloc wand `makeknown` / dest-msg `set_msg_xy` / `scrolltele`
  W-tower Override yn / `migrate_to_level` W-tower xyflags bit 2 /
  `mon_arrive` After_you `my=xyflags` / newgame `notice_mon_off` /
  `init_artifacts` / REVIVE/ZOMBIFY / `#levelchange` drain /
  `SCR_MAIL`/`uwepgone` light / `scrolltele` unconscious / steed
  `whobuf` `mon_nam` / `vpline` accessiblemsg consume / `dotele`
  trap-at-feet teledest / `dotelecmd` m-prefix / xkilled
  `zombie_maker`+`gz.zombify` / mhitm `monkilled` zombify /
  `revive_corpse` MINVENT/CONTAINED + Adjmonnam).
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
- Do not skip D-1071…D-1211 (hugs through mhitm zombify) / later
  D-ids in CURRENT. Do not skip D-1212 MINVENT/CONTAINED plines or
  restore silent sack/nymph revive.
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop` to save a youprop clone (D-1060 / D-1085 /
  D-1089). Do not rewrite other `Antimagic()` clones.
- Do not pull `reset_glyphmap` / vision.c `notice_all_mons` /
  `makemap_prepost` / `wiz_makemap` / `restore_artifacts`.
  Default `spot_monsters` Off.
  `rot_corpse` invent worn / `disturb_buried_zombies` /
  LEVEL_TELEP yn / energy/`spelleffects` / `#teleport` `doextcmd`
  / BURIED `!is_zomb` impossible / Soundeffect still named.
  Do not treat D-1209 `'s'` as live spellcast. Do not treat
  `dothrow` `game.thrownobj` as wired (review **172**).

## Landmarks (≤15)

- #1540 review 171–174 ACCEPT-WITH-DEBT; next `rot_corpse` worn.
