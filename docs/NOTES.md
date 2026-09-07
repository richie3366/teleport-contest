# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Scenario corpus = work picker (2026-09-06, human):** `scen-*` 7/275 is the held-out shape; mutants 255/278 saturated. Queue from `hidden-proxy queue`; singletons Deferred; themed-room step-0 → `geom-probe`.

- **Park `show_conduct` (c209ccc7):** stale (859→824 x_monnam); owner is a C comment; DontAsk arm REGRESSES (reverted). See Parked; re-baseline first.
- **Park `ready_weapon` (Knight-92204 spin):** moves 5/6; Knight spins 99% CPU past step-25 → downstream loop. See Parked; needs stack/profile.
- **Parks `mdrop_obj`/`dopush`:** capture-point / one-cell-r13c32 mimic-viz; ports are verify no-ops; needs C viz at step 127 or `view_from` audit.
- **Geometry owners:** probe first (D-1849). Refills must not cite the current D-ID.
- **Fortress guards.** Do not reopen display_inventory dismiss / gameover heading / keep_status, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue `S_ndoor`, bigrm-2, getpos, summonmu, lookat, `do_statusline1`, snapshot, fakewiz, Ice/Boulder, `roles[]`, pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **Luck runs when invulnerable; dialogues do not** (`timeout.c:623`); STONED/SLIMED expiry silent.
- **`sit.js` lay-egg `morehungry` unawaited; `losedogs` rebuilds `migrating_mons`.** Clone drift: zap useupf; detect/potion/read/spell `useup`; Elbereth; teleport `accessible`; helm_simple_name; pickup `ysimple_name`; getobj_* clones.
- **next_ident = symptom owner (D-2021/D-2022):** fix the WRITER. Wish `cursed slime mold`: C zero-draw vs JS `rn2(76)`, identical tables — falsifier = C-recorder wish experiment.

## Don't re-check (≤15)

- D-1790…D-2035 ports stand (range-covered). Scars: `m_seenres` is boolean, never `!== 0`; no second `genus`/`accessible`/trailing-`confdir`/`locomotion`/`unconscious`/`free_mgivenname`/`is_axe`/`carrying`/`end_running`.
- D-1795 `mattacku`/`getmattk` and D-1816 NATTK abort stand (range-covered). Scars: keep sleep `rn2(10)`; no second `m_monnam`/`simple_typename`; seed4500 `[2]` (D-1817): keep `flush_screen(1)`, never hide `[2]`.
- No `stay` rebuild; no `u.Punished`; no `rn2(20)` on ordinary pit farlook.
- seed0014 I-glyph is D-1774; findone tail D-1775. Do not revert D-0078 H2344 / offx 72 (D-1185). `g` is not Unknown (D-1186). PREFIXCMD D-1582.
  ParanoidTrap / `domagicportal` / `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 are D-1187/1188. No rhack raw-ETX (D-1189). Never FORCE the falsified mineralize TRC (76,14)/(77,14) (D-1849).
- `Val-*`/`Sam-*` loaders shipped D-1852/D-1858 — check `load_val_*`/`load_sam_*` before refilling.
- Don't re-apply D-0480 glyph `tty_map_color` (D-0483). Don't skip painting spaces or emit mid-row space runs >4 (D-0931). Do not FORCE shk satdoor/`onlineu` (D-0376) or linedup/FlipX (#1092). Do not blanket-restore overlay `_pending_message` (D-0929). Do not HEAVY_IRON_BALL `owt!=0` (#1194). Judge does **not** elide RC (D-0933); do not extend §1.2. Do not chase public LB in-loop.
- Do not memcpy gi worn/ball (D-1035) / `setnotworn` from `owornmask` (D-1020) / `delobj` tutorial loot / off-level timers (D-1037) / omit `msounds[]` (D-1053) / tut-1 keys (D-1065) / skip `tutorial()` (D-1066). Do not skip D-1067…D-2035.
- Do not import `monmove.js` `sticks` for sit / rewrite `confer_oc_oprop` / delete emin / stub `make_happy_shk` (D-1540) / bones→options fruitadd (D-1541). No `reset_glyphmap` / `notice_all_mons` / savelev-freeing / lua `lspo_reset_level`. No `wield.js`/`pickup.js`→`polyself.js` for `body_part`. No static `end.js`←`dog.js`. No makemon→hack/`artifact`/`minion`. Do not re-port D-1682…D-2035.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-2035: `js/timeout.js` — new `!(next & TIMEOUT) && p === STRANGLED` arm after SLIMED in C order (killer init mirrors the STONED arm; `done_timeout(DIED, STRA Named: none new — `done`/`Die?`/`savelife` (end.js), `useup` (invent.js), `choke_dialogue` all li
- D-2034: `js/end.js` — new `give_to_nearby_mon` verbatim from C (loop/guard order, `!rn2(nmon)` reservoir, `can_carry`→`add_to_minv` else `place_object`; the e Named: `drop_upon_death` mtmp/cont arms (`add_to_minv(mtmp)` / `add_to_container`) + `artifact_li
- D-2033: `js/mhitu.js` — new `mhitm_ad_famn_u` (pline_mon reach-out, exercise(A_CON), morehungry(rn1(40,40)) unless fainted, leftover d() kept); `js/mhitm.js` — non-eater zero + mdamagem dispatch. Named: none — dead uhitm arm documented, all callees live.
- D-2032: `js/read.js` — new `seffect_fire` in C order (already_known before useup; dam `Math.trunc((2*(rn1(3,3)+2*cval)+1)/3)`; useup + `learnscrolltyp(SCR_FIR Named: none — every arm's callee is live (`explode`, `burn_away_slime`, `shieldeff`, `getpos` fam
- D-2031: `js/potion.js` — Strangled gate first (uprops intrinsic per the C macro, plus flat `u.Strangled` for the same C value per the `do.js` danger_uprops du Named: none new — every arm's callee is live (`djinni_from_bottle` D-1144, `drinkfountain` D-0237
- D-2030: `js/wizard.js` — new `you_have` static (u.uhave amulet/bell/menorah/book/questart switch); new `target_on` static (M_Wants inline, STRAT_PLAYER at her Named: none — every arm's callee is live; the two judgment calls above (m_at-for-grid, lazy mgoal
- D-2029: `js/timeout.js` — new STONED expiry arm before SLIMED (C switch order): `find_delayed_killer(STONED)` name (default «killed by petrification»/`NO_KILL Named: HALLUC/STUNNED/SEE_INVIS/SLEEPY/… expiry messages; `region_dialogue`/`sleep_dialogue` (pre
- D-2028: `js/pickup.js` — `Tobjnam` + `thesimpleoname as thesimpleoname_objnam` extend the pre-existing `./objnam.js` import (same SCC edge, runtime-only reads Named: chest trap; bag-of-tricks/horn; cursed-mbag `boh_loss` + `"now "` (pre-existing envelope, 
- D-2027: `js/makemon.js` `pick_nasty` — verbatim port of the `:567–579` gate (`pmnames[alt]?.[NEUTRAL]`, `lastIndexOf(' ')`→slice for `lastspace`, `startsWith( Named: rogue-level monsym uppercase re-ROLL (`:545–547`, pre-existing, untouched — monsym table n
- D-2026: `js/eat.js` `done_eating` — nomovemsg arm first (print when message, always clear to null, cf. Named: `start_eating` `:2048–2062` old/save_nomovemsg dance around the bite-finish `done_eating(F
- D-2025: `js/invent.js` enlightenment Attributes Displaced/Regen/Polycontrol arms (final + overlay, C order) + `hero_Polymorph_control`/`hero_Regeneration`; `js/artifact.js` `abil_to_spfx` 12-row table, `what_gives` takes propidx; `js/attrib.js` `from_what` passes it. Named: cspfx/adtyp/Sunsword/EWarn-guard; final-path Jump/Teleport/Aggravate/Conflict/Slowdig/combat-inc/defense/Unchanging/Poly/Upolyd/Adorn/Invis.
- D-2024: `export` on `makemon.js golemhp` (no clone #2); `polyself.js` imports `{ golemhp, is_home_elemental }` from `./makemon.js` (new edge, same 90-module S Named: dragon-arm `In_endgame` gate (already live, untouched); polymon Stoned/Sick/Slimed/strangl
- D-2023: `js/timeout.js` — new `done_timeout(how, which)` (C `:574–585` verbatim shape) + new `slimed_to_death(kptr)` (killer setup, emits_light/del_light_sour Named: STONED `done_timeout` (same switch, no corpus coverage — untouched); genocided-lifesave sl
- D-2022: (1) makemon.js: `if (no_of_wizards === 1 && Is_earthlevel(game.u?.uz)) mitem = otyp('SPE_DIG')` (C `:1372–1373` gate verbatim; `imports.mjs --can make Named: arrow-trap Soundeffect / steedintrap / gone-arm pline_mon / in_sight seetrap gating / obfr
- D-2021: `js/readobjnam.js` — `real `/`fake ` preparse arms + `d.real`/`d.fake` fields (C `:4125–4133`); Amulet real/fake block before `makesingular` (C `:4284 Named: `named`/`called`/`labeled`/`of spinach` strips; `o_ranges` + postparse2 stone/gem/glass br
<!-- landmarks:end -->
