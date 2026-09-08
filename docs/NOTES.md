# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Scenario corpus = work picker:** `hidden-proxy queue`; singletons Deferred; themed-room step-0 → `geom-probe`.
- **distfleeck/mcalcmove parks:** symptom owners; writers in Parked rows (mcalcmove: slime-lifesave).

- **dump_artifact_info FIRED by D-2134:** Priest-92136 dump@126 → dog_goal@136; re-queue under dog_goal.
- **Other parks (do not pop; falsifiers in Parked rows):** show_conduct, ready_weapon, mdrop_obj/dopush, dosearch, save_dungeon, do_statusline2.
- **Fortress guards.** Do not reopen display_inventory dismiss / gameover heading / keep_status, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue `S_ndoor`, bigrm-2, getpos, summonmu, lookat, `do_statusline1`, snapshot, fakewiz, Ice/Boulder, `roles[]`, pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **Luck runs when invulnerable; dialogues do not** (`timeout.c:623`); STONED/SLIMED expiry silent.
- **next_ident = symptom owner:** fix the WRITER, not the table reader.
- **obj_resists park:** 3-writer symptom (detail: Parked).
- **m_move symptom-owner park:** loop body faithful; D-2069 shipped; Caveman-92202 cnt-j off-by-one (detail + falsifier: Parked; do not re-pop).
- **rloc park:** body faithful (D-0686); writer is a draw-free migration creator (detail + falsifier: Parked; do not re-pop).
- **lightdamage park:** `mzapwand` MORE-transient misattributed to zap.c (D-1366 faithful); capture artifact, not state (detail + falsifier: Parked; do not re-pop).
- **mattackm/can_carry park:** writer can_carry; import alone ETIMEDOUT — trio only, do not pop.
- **spoteffects park:** Samurai-92161 step 35 topline-literal misattribution; writer is `mthrowu.c` flight/catch (forcehit + catch-inventory). Falsifier in Parked row; do not re-pop.
- **mon_adjust_speed park:** topline-literal misattribution; writer is summon glyph paint, not the speed printer (detail + falsifier: Parked row; do not re-pop).
- **zapyourself park:** monster-zap dobuzz misattribution (detail + falsifier: Parked row; do not re-pop).
- **doname_base park:** wield `prinv`+shine More-timing misattribution (detail + falsifier: Parked row; do not re-pop).

## Don't re-check (≤15)

- D-1790…D-2136 ports stand (range-covered). Scars: `m_seenres` is boolean, never `!== 0`; no second `genus`/`accessible`/trailing-`confdir`/`locomotion`/`unconscious`/`free_mgivenname`/`is_axe`/`carrying`/`end_running`.
- D-1795 `mattacku`/`getmattk` and D-1816 NATTK abort stand (range-covered). Scars: keep sleep `rn2(10)`; no second `m_monnam`/`simple_typename`; seed4500 `[2]` (D-1817): keep `flush_screen(1)`, never hide `[2]`.
- No `stay` rebuild; no `u.Punished`; no `rn2(20)` on ordinary pit farlook.
- seed0014 I-glyph is D-1774; findone tail D-1775. Do not revert D-0078 H2344 / offx 72 (D-1185). `g` is not Unknown (D-1186). PREFIXCMD D-1582.
  ParanoidTrap / `domagicportal` / `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 are D-1187/1188. No rhack raw-ETX (D-1189). Never FORCE the falsified mineralize TRC (76,14)/(77,14) (D-1849).
- `Val-*`/`Sam-*` loaders shipped D-1852/D-1858 — check `load_val_*`/`load_sam_*` before refilling.
- Don't re-apply D-0480 glyph `tty_map_color` (D-0483). Don't skip painting spaces or emit mid-row space runs >4 (D-0931). Do not FORCE shk satdoor/`onlineu` (D-0376) or linedup/FlipX (#1092). Do not blanket-restore overlay `_pending_message` (D-0929). Do not HEAVY_IRON_BALL `owt!=0` (#1194). Judge does **not** elide RC (D-0933); do not extend §1.2. Do not chase public LB in-loop.
- Do not memcpy gi worn/ball (D-1035) / `setnotworn` from `owornmask` (D-1020) / `delobj` tutorial loot / off-level timers (D-1037) / omit `msounds[]` (D-1053) / tut-1 keys (D-1065) / skip `tutorial()` (D-1066). Do not skip D-1067…D-2136.
- Do not import `monmove.js` `sticks` for sit / rewrite `confer_oc_oprop` / delete emin / stub `make_happy_shk` (D-1540) / bones→options fruitadd (D-1541). No `reset_glyphmap` / `notice_all_mons` / savelev-freeing / lua `lspo_reset_level`. No `wield.js`/`pickup.js`→`polyself.js` for `body_part`. No static `end.js`←`dog.js`. No makemon→hack/`artifact`/`minion`. Do not re-port D-1682…D-2136.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-2136: `js/mklev.js` only — border now built with the shared `selection_rect_rel(0, 0, 78, 20)` (same `get_location_coord` origin shift C applies: `game.sple Named: none new — sibling hell styles use selection ops (already origin-shifted) or have no hand-
- D-2135: extractor captures `lm.group(4)` as `mr` (+ fallback 0) and emits `export const mrs = [...]` (225/383 nonzero); `js/monsters.js` imports `mrs` (same l Named: none new — all six `data.mr` readers are pre-existing live call sites fixed by the data (n
- D-2134: `js/invent.js` only — refuse arm returns after `obj_extract_self` with no pline, exact C order, C cite `:1227–1231` in place. Named: `dropy` on the refuse arm + wasUpolyd arm + crysknife restore stay named (`turns.md` hold_
- D-2133: `js/zap.js` only, exact C order — dobuzz hero arm: reflect path `monstseesu(M_SEEN_REFL)` + `await shieldeff(sx, sy)`; non-reflect `monstunseesu(M_SEE Named: usteed `rn2(3)`+`mon_reflects` redirect stays named (dobuzz header; `mon_reflects` has no 
- D-2132: `js/potion.js` only — file-local `stagger_poly` clone of `mondata.c:1394–1407` (same clone as the `mhitm.js` `stagger`; `is_floater`/`is_flyer`/`slith Named: usteed saddle wobble stays named (`potion.js` header; no corpus session reaches it this it
- D-2131: `js/polyself.js` — new exported `uunstick()` in exact C order (`impossible` on null via the already-imported `display.js` edge, `set_ustuck(null)` via Named: `polyman` was_mimicking/`ugenocided`/`skinback`/strangling/pool-spoteffects/retouch arms s
- D-2130: `js/mhitu.js` only — `mswings` now gates on the same-module live `Blind()` (`youprop.h` `(H||E)&&!B` + roleplay/ublind mirrors, D-0716 convention; no  Named: none new.
- D-2129: `js/pray.js` only, exact C order + short-circuit — `if (((u.ualign?.record | 0) <= 0) || rnl(u.ualign?.record | 0)) await angrygods(u.ualign?.type ??  Named: none new. p_type −2/−1/1/2 outcome bodies + `pray_revive` stay named (`pray.js` header; no
- D-2128: `js/mhitm.js` only — new exported `mhitm_ad_plys(magr, mattk, mdef, mhm)` in exact C short-circuit order (`mcanmove`, `!rn2(3)`, mgc-negated(TRUE) via Named: mhitu you-as-def arm stays named → open D-2005 (`hitmsg` + `nomul` + `dynamic_multi_reason
- D-2127: `js/zap.js` only, exact C order — `if (spellcaster) tmp = spell_damage_bonus(tmp)` (same-module live helper), shield + `tmp = 0`, the blind gate with  Named: none new.
- D-2126: `js/display.js` only — `hero_Invis()` now ORs flats + `uprops[INVIS]` intrinsic/extrinsic/blocked, `hero_See_invisible()` ORs flats + sticky + `uprops Named: none new.
- D-2125: `js/weapon.js` only — the `:918–928` arm in exact C order (`begin_burn(obj, false)` before the visibility branch so lamplit/radius are set first, matc Named: none new. mwelded refuse-wield plines + weld-on-wield + autoreturn tether stay deferred (m
- D-2124: `js/mon.js` only — `else { await growl(mtmp); }` in exact C position with C cite; `growl` was already imported from pre-existing `./sounds.js` edge (n Named: none new.
- D-2123: `js/worn.js` — `cantweararm` exported (import-the-export, no second copy; `breakarm`/`sliparm` stay private). Named: none new.
- D-2122: `js/end.js` — `done_in_by` ports the full `:326–340` chain in C order (`mlet` on `mtmp.data`, `zombie_maker` live import, `Race_if(PM_HUMAN)` as `urac Named: none new.
<!-- landmarks:end -->
