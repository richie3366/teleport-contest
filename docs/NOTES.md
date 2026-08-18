# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Fortress 44/44** after D-1237 rolling-boulder TELEP `pline_xy`
  (`rloco`/migrate). Cadence **#1565** (`976094e5`). Next: Open
  `monmove.c` `mind_blast`. Not msg_mon_movement. Must-fix empty.
  Do not skip D-1237…D-1229. Do not pull glob / doname
  CXN_ARTICLE|CXN_NOCORPSE / container_impact / hideunder /
  passivemm / AT_HUGS/EXPL/ENGL / altwep / `demonpet` /
  landmine·pit mid-roll. Do not wrap `msg_mon_movement` as
  `pline_mon`. Do not restore Hallu `gbuf_show_kind`. No FORCE.
- Do not revert D-1217–D-1237. Do not Must-fix named omits
  (glob/doname CXN / other Soundeffect / remaining `pline_mon` /
  `mind_blast`).

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown or inner-`parse` after it (D-1186).
  Do not skip ParanoidTrap portal yn (D-1187) / hero
  `domagicportal` / `undestroyable_trap` / `mktrap` dst /
  `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip
  D-1190…D-1237 (CURRENT keep; rolling-boulder TELEP D-1237).
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
- Do not skip D-1071…D-1237. Keep se_scratching; `troll_baned`
  wraps; `#teleport` doextcmd; gulpmm `m_at` swap; unique/pname
  `corpse_xname` adjective / rot CXN_NO_PFX; `spot_monsters` →
  `a11y.mon_notices`; `mon_movement` → `a11y.mon_movement`;
  rolling-boulder TELEP `pline_xy` D-1237. Glob / doname
  CXN_ARTICLE|CXN_NOCORPSE / snuff_lit / AT_HUGS / `demonpet` /
  landmine·pit mid-roll / `mind_blast` still named. Do not “fix”
  seed0383 with ALIGN/FORCE.
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop` / other `Antimagic()` clones (D-1060 / D-1085 /
  D-1089).
- Do not pull `reset_glyphmap` / vision.c `notice_all_mons` /
  `makemap_prepost` / `wiz_makemap` / `restore_artifacts`.
  Default `spot_monsters`/`glyph_updates`/`mon_movement` Off.
  Remaining uhitm/worn/trap `pline_mon` / `mind_blast` / other
  Soundeffect / landmine·pit mid-roll named. Do not treat `dothrow`
  `game.thrownobj` as wired (review **172**). Do not Must-fix
  `DIR_UP`/`DIR_DOWN` const swap (review **178**).

## Landmarks (≤15)

- D-1237: rolling-boulder TELEP `pline_xy` + `rloco`/migrate;
  landmine/pit still named.
- D-1236: `mon_movement` addr `&a11y.mon_movement`; default Off.
- D-1235: `spot_monsters` addr `&a11y.mon_notices`; default Off.
- D-1234: unique/pname `corpse_xname` adjective + rot `CXN_NO_PFX`;
  glob / doname CXN_ARTICLE|CXN_NOCORPSE still named.
- D-1233: `hmonas`/`damageum` `troll_baned` ternary/`uwep`;
  AT_HUGS/EXPL/ENGL / altwep / `demonpet` still named.
- D-1232: `hmon_hitmon` `troll_baned` TRUE-only around `killed`.
- D-1231: gulpmm `m_at` swap + `mattackm` AT_ENGL `gulpmm`;
  snuff_lit / !goodpos / AD_DGST eat named.
- D-1230: `#teleport` `doextcmd` → `dotelecmd`; no AUTOCOMPLETE;
  `#` keeps m.
- Review **192–195** ACCEPT-WITH-DEBT. Cadence **#1565** **44**/44
  including seed0383. Next audit @**#1570**.
- D-1229: `impact_disturbs_zombies` owt/flimsy; dropz / throwit
  `!IS_SOFT` / kick place; hideunder / container_impact named.
- D-1228: `msg_mon_movement` dest `pline_xy` after place; not
  `pline_mon`; optlist `&a11y.mon_movement` addr D-1236.
- D-1227: monmove remaining `pline_mon` (flee/web/door/itsstuck).
- D-1226: `test_move` run>=2 boulder `pline_dir`; cannot_push named.
- D-1225: `known_spell` + `spelleffects` SPE_TELEPORT_AWAY atme.
- D-1223: mhitm `troll_baned`; gulpmm D-1231; hmon D-1232;
  hmonas D-1233.
