# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Suite 44/44** fortress after D-1539 (Scr **11,405** RNG
  **792,838**/792,838 = 100%, `38+0.30/turn` R² 0.841).
  seed0367 FULL. cspfx W_ART live (D-1539). Wander/`somexy`
  live (D-1538). `#altdip` INTERNALCMD live (D-1537).
  **Hypothesis:** next Open `ghostfruit` is still a named
  omit vs C `restore.c` (not goodfruit).
  **Falsify:** map row + C `ghostfruit` before coding; not a
  public FAIL peel.
  **Next:** Open `restore.c` `ghostfruit`. Not goodfruit.
  Do not skip D-1539…D-1229. No FORCE / `wildmiss` wrap /
  trailing `confdir` in shared `getdir`. pickup `body_part`
  latebound. Do not delete emin. Do not type `#altdip` as
  a user extcmd. Do not import dog→mklev for `somexy`.
  Do not zero `cspfx` on W_ART. Furnsyms still named.
- Named still: Light source fill;
  furnsyms; ghostfruit; getpos fakeobj; `that_is_a_mimic`;
  detect_wsegs; `worm_known`. Palantir `#if 0`. CMDQ_INT /
  pickinv count / `finish_splitting`. `splev_create_monster`
  RANDOM-only. `tamedog` `wake_nearto` / FULL_MOON S_DOG /
  ustuck named. Other mcast_spell bodies; sit/pray
  `eyecount` always-2. muse quantum-loot; escape
  `Schroedingers_cat` HP. Eyes `is_plural`; other
  INTERNALCMD bodies. defn/cary resist; SEARCH/REGEN/XRAY/
  PROTECT; inv_prop drop; questart `artitouch`.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown or inner-`parse` after it (D-1186).
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1539.
- Don't re-apply D-0480 **glyph** `tty_map_color` (D-0483).
- Don't skip painting spaces or emit mid-row space runs >4 (D-0931).
- Do not FORCE shk satdoor/`onlineu` (D-0376) or linedup/FlipX (#1092).
- Do not blanket-restore overlay `_pending_message` (D-0929).
- Do not HEAVY_IRON_BALL `owt!=0` (#1194). Judge does **not** elide
  RC (D-0933); do not extend §1.2. Do not chase public LB in-loop.
- Do not memcpy gi worn/ball pointers (D-1035) / `setnotworn` from
  `owornmask` (D-1020) / `delobj` tutorial loot / off-level timers
  (D-1037) / omit `msounds[]` (D-1053).
- Do not restore tut-1 hardcoded keys (D-1065) / skip `tutorial()`
  nhcore (D-1066). Do not skip D-1067…D-1539 (index).
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop` / other `Antimagic()` clones. Do not skip
  D-1520…D-1539 fruit/emin/`mk_roamer`/`tamedog`/`o->lit`/EYE/FOOT
  /door `S_hcdoor` / `#altdip` INTERNALCMD / wander `somexy` /
  cspfx W_ART (index). Do not delete emin to fix seed0367 (review **487**).
- Do not pull `reset_glyphmap` / `notice_all_mons` /
  `makemap_remove_mons` / savelev-freeing / lua `lspo_reset_level`
  / `restore_artifacts`. Default `spot_monsters` Off.
- Do not import `wield.js`/`pickup.js`→`polyself.js` for
  `body_part` (use `objnam.js` `body_part_latebound`).
- Do not import `makemon.js`→`hack.js` for `in_town` (D-1517)
  or `makemon.js`→`artifact.js` for `u_wield_art` (D-1518)
  or `makemon.js`→`minion.js` for `Inhell` (hellish). No
  `fruitadd` after objects exist; `init_fruit_chain` only.
  No fourth town gnome (D-1513). Do not gate `create_object`
  `o->lit` on tile.lit (mktrap_victim is D-1519). Do not treat
  Blindfolded as C `Blinded` in `mcast_blind_you` (D-1534).
  Do not import pickup→polyself for FOOT (D-1535). Do not
  stub door/wall mimic `appear=0` (D-1536). Do not make
  typed `#altdip` a user extcmd (D-1537). Do not import
  `dog.js`→`mklev.js` for `somexy` (D-1538). Do not zero
  `cspfx` when `wp_mask===W_ART` (D-1539).

## Landmarks (≤15)

- D-1539: cspfx W_ART carry ESP/STLTH/TCTRL/WARN/EREGEN/HSPDAM/
  HPHDAM; invent addinv/freeinv callers; extractor A() s2.
  defn/cary resist / SEARCH/REGEN/XRAY/PROTECT / inv_prop drop
  / questart `artitouch` named.
- D-1538: `mon_arrive` wander/`somexy` after catchup; EXACT_XY
  zeros wander; `in_rooms` live; mkroom clone (mklev→trap→dog).
  kops / Before_you / failed_arrivals / `Wiz_arrive` named.
- D-1537: INTERNALCMD `#altdip` table + canned `CMDQ_EXTCMD` /
  `can_do_extcmd` buried; typed `#` unknown. Eyes `is_plural`
  / other INTERNALCMD bodies named.
- D-1536: `set_mimic_sym` door/wall `S_hcdoor` left-connect /
  rogue `S_hwall`. Furnsyms / Protection / `block_point` named.
- D-1535: `observe_quantum_cat` FOOT latebound + loot/tip/disclose.
  Live leaves spe; `Schroedinger's cat!`. muse/escape HP named.
- D-1534: `mcast_blind_you` EYE scales + `make_blinded` 200/100;
  `eyecount` in `monsters.js`. Blinded `H&&!B`.
- D-1533: `create_object` `o->lit` `begin_burn` after
  `stackobj`. Table lit default 0. Light source fill named.
- D-1532: `tamedog` is_covetous + is_demon-vs-hero / quest
  leader / blessed +2 / `make_happy_shk` / givemsg / `mon_wield`.
  `wake_nearto` / FULL_MOON S_DOG / ustuck named.
- D-1531: Pri-loca `align=noalign` cleric `mk_roamer_splev`
  (`MM_EMIN`, `A_NONE`), not `makemon(..., 0)`. Emin kept.
- D-1530: getobj ALLOWCNT `get_count` + throw-one + `split_otmp`.
  Palantir / CMDQ_INT / pickinv count named.
- D-1529: `see_wsegs` body segs except dummy; `is_worm_tail` `~`.
  detect_wsegs / `worm_known` named.
- D-1528: `show_region` S_cloud / S_poisoncloud unless mon
  overrides. DRAWBRIDGE_UP under named.
- D-1527: `#timeout` `visible_region_summary`; ttl+1; poison
  vs vapor. tid `timer_id++` from 1.
- D-1526: emin roaming after LONG_WORM. Cleric always; angel
  `!rn2(3)`. Pri-loca noalign is D-1531.
- D-1525: TEMPLE `S_altar`; `MCORPSENM` Align2amask; hellish
  not minion `Inhell`. Door is D-1536.
