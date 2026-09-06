# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Park `show_conduct` (HEAD c209ccc7):** premise stale (859 @baf24c95 → 824 x_monnam); owner insight.c:2122 is a C comment; DontAsk-flags arm alone REGRESSES 859→824 (reverted) — display-timing iteration must ride WITH the flags arm. Detail + falsifier in LOOP-QUEUE Parked. UPDATE: replays 859, rng identical; re-baseline first.
- **Park `mdrop_obj`:** capture-point divergence (C mid-turn --More-- frame vs JS post-turn; draws identical 2706/2706); full port = verify no-op. Detail in Parked.
- **Park `dopush` (mimic-viz, not the push):** step 127/175 single cell r13c32 C `` ` `` vs JS `·`, RNG 12853/12853 tied; push itself faithful. Needs C-side viz at 127 or `view_from` boundary audit. Detail in Parked; re-apply reverted `movobj` cleanup with the fix.
- **Geometry owners:** probe first (D-1849). Refills must not cite the current D-ID.
- **Fortress guards.** Do not reopen display_inventory dismiss / gameover heading / keep_status, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue `S_ndoor`, bigrm-2, getpos, summonmu, lookat, `do_statusline1`, snapshot, fakewiz, Ice/Boulder, `roles[]`, pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **Luck runs when invulnerable; dialogues do not** (`timeout.c:623`); STONED/SLIMED expiry silent.
- **`sit.js` lay-egg `morehungry` unawaited; `losedogs` rebuilds `migrating_mons`.** Clone drift: zap useupf; detect/potion/read/spell `useup`; Elbereth; teleport `accessible`; helm_simple_name; pickup `ysimple_name`; getobj_* clones.

## Don't re-check (≤15)

- D-1796…D-1950 ports stand (`drown`→`xkilled`, `yn_function`, `getobj`, `moveloop_core`, …; range-covered below). Scars: `m_seenres` is boolean, never `!== 0`; no second `genus`/`accessible`/trailing-`confdir`/`locomotion`/`unconscious`.
- D-1795 `mattacku`/`getmattk` and D-1816 NATTK abort stand (range-covered). Scars: keep sleep `rn2(10)`; no second `m_monnam`/`simple_typename`; seed4500 `[2]` (D-1817): keep `flush_screen(1)`, never hide `[2]`.
- D-1790…D-1950 stand (`make_corpse`, `dmgval`, `nh_timeout`, `newuhs`, `monverbself`; range-covered). Scar: no second `free_mgivenname`/`is_axe`/`carrying`/`end_running`.
- No `stay` rebuild; no `u.Punished`; no `rn2(20)` on ordinary pit farlook.
- seed0014 I-glyph is D-1774; findone tail D-1775. Do not revert D-0078 H2344 / offx 72 (D-1185). `g` is not Unknown (D-1186). PREFIXCMD D-1582.
  ParanoidTrap / `domagicportal` / `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 are D-1187/1188. No rhack raw-ETX (D-1189). Never FORCE the falsified mineralize TRC (76,14)/(77,14) (D-1849).
- `Val-*`/`Sam-*` loaders shipped D-1852/D-1858 — check `load_val_*`/`load_sam_*` before refilling.
- Don't re-apply D-0480 glyph `tty_map_color` (D-0483). Don't skip painting spaces or emit mid-row space runs >4 (D-0931). Do not FORCE shk satdoor/`onlineu` (D-0376) or linedup/FlipX (#1092). Do not blanket-restore overlay `_pending_message` (D-0929). Do not HEAVY_IRON_BALL `owt!=0` (#1194). Judge does **not** elide RC (D-0933); do not extend §1.2. Do not chase public LB in-loop.
- Do not memcpy gi worn/ball (D-1035) / `setnotworn` from `owornmask` (D-1020) / `delobj` tutorial loot / off-level timers (D-1037) / omit `msounds[]` (D-1053) / tut-1 keys (D-1065) / skip `tutorial()` (D-1066). Do not skip D-1067…D-1950.
- Do not import `monmove.js` `sticks` for sit / rewrite `confer_oc_oprop` / delete emin / stub `make_happy_shk` (D-1540) / bones→options fruitadd (D-1541). No `reset_glyphmap` / `notice_all_mons` / savelev-freeing / lua `lspo_reset_level`. No `wield.js`/`pickup.js`→`polyself.js` for `body_part`. No static `end.js`←`dog.js`. No makemon→hack/`artifact`/`minion`. Do not re-port D-1682…D-1950.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-1950: `js/mklev.js` — exported `On_ladder(x, y)` in C order (`stairway_at(x | 0, y | 0)` then `!!(stway && stway.isladder)` for C boolean; `| 0` int idiom p Named: caller wiring (function live, unwired): `dig.c:1812` `adj_pit_checks` ladder + `supporting
- D-1949: `js/steed.js` — exported `exercise_steed()` in C order (`!u.usteed` early return; `| 0` int idiom, which also covers fresh JS saves where `urideturns` Named: none new — the domove steed envelope around the call site stays as named in `c-js-map/turn
- D-1948: `js/monsters.js` — exported `mon_hates_light(mon)` (`return hates_light(mon?.data)`), placed directly after `hates_light` beside the sibling `mon_hate Named: caller wiring (function live, unwired): `uhitm.c:1039` hitmsg `lightobj` arm has no JS sym
- D-1947: `js/mthrowu.js` — exported `async ucatchgem(gem, mon)` in C order (`| 0` int idiom; `game.youmonst?.data` per the allmain/apply idiom; `gem_xname` the Named: `m_throw` envelope still named per review 296 (pre-existing, not this arm): `thrwmu` alway
- D-1946: `js/vault.js` — exported `move_gold(gold, vroom)` in C order (ox/oy saved before extract since C reads them post-extract; `obj_extract_self` → `newsym Named: caller wiring (function live, unwired): `wallify_vault` body (still stub — wall repair / w
- D-1945: `js/steal.js` — exported async `stealamulet(mtmp)` in C order (`!--n` pre-decrement pick; `++n` + trailing-target sweep shape, last match wins before  Named: caller wiring (function live, unwired): `mhitm_ad_samu` `!rn2(20)` arm (`uhitm.c:4584` — n
- D-1944: `js/mklev.js` — file-local `selection_recalc_bounds(sel)` (C endpoint semantics; unconditional recompute — the Set model has no dirty flag since set e Named: `l_selection_xor` (`~` — no `dat/*.lua` use, verified by grep); mutating `selection_clear`
- D-1943: `js/dbridge.js` — file-local `occupants()` (C decl.c zero-init shape, lazily ENTITIES `{emon:null,edata:null,ex:0,ey:0}` records on `game`); exported  Named: caller wiring (functions live, unwired): `do_entity` crush/jump/relocate (`e_jumps`/`e_sur
- D-1942: `js/do_wear.js` — exported async `Armor_gone()` in C order (was_arti_light snapshot before setnotworn since unwearing clears the W_ARM bit artifact_li Named: caller wiring (functions live, unwired): polyself `break_armor` suit arms (`polyself.c:117
- D-1941: ported the family in C branch order (`| 0` int idiom; `sym.h` `is_cmap_*` macro shape for the three missing predicates; `IS_DOOR` ≡ C `(typ == DOOR)`; Named: `getpos_menu` listing; `S_goodpos` tmp_at hilite; engraving full showsyms; `docrtRefresh` 
- D-1940: `js/pray.js` — exported async `at_your_feet(str)` and `gcrownu()` in C order (`| 0` int idiom; `ok_wep` arrow from the C macro; otyp via `objectNames. Named: caller wiring (functions live, unwired): pleased pat_on_head case 7/8 `gcrownu()` gate (`:
- D-1939: `js/zap.js` — exported async `polyuse(objhdr, mat, minwt)` in C order (`| 0` int idiom, `nexthere` prefetch, `*u.ushops` as `(game.u?.ushops || '')[0] Named: caller wiring (functions live, unwired): `create_polymon` itself (`:1547–1630`, `makemon` 
- D-1938: `js/objnam.js` — canonical export `Doname2(obj)` (`upstart(doname(obj))`, the C highc shape; pre-existing clones stay). Named: caller wiring (functions live, unwired): `in_container` put-in `mbag_explodes` explosion a
- D-1937: `js/uhitm.js` — exported `backstabbable(mon)` (file-local `helpless` + already-imported `canseemon`, new names `amorphous`/`noncorporeal` on the exist Named: rogue `hmon_hitmon_weapon_melee` arm (`uhitm.c:960` `You("strike %s from behind!")` + `rnd
- D-1936: `js/artifact.js` — exported sync `spec_ability(otmp, abil)` in C order (`get_artifact` → `!== list[ART_NONARTIFACT]` short-circuit → `((spfx | 0) & (a Named: `artifact_hit` SPFX_BEHEAD (`:1550`) / SPFX_DRLI (`:1645`) arms (still deferred under `art
<!-- landmarks:end -->
