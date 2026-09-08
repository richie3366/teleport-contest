# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Scenario corpus = work picker:** `hidden-proxy queue`; singletons Deferred; themed-room step-0 → `geom-probe`.
- **Fortress guards.** Do not reopen display_inventory dismiss / gameover heading / keep_status, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue `S_ndoor`, bigrm-2, getpos, summonmu, lookat, `do_statusline1`, snapshot, fakewiz, Ice/Boulder, `roles[]`, pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **Luck runs when invulnerable; dialogues do not** (`timeout.c:623`); STONED/SLIMED expiry silent.
- **next_ident = symptom owner:** fix the WRITER, not the table reader.
- **obj_resists park:** 3-writer symptom (detail: Parked).
- **m_move symptom-owner park:** loop faithful (D-2069); Caveman-92202 cnt-j off-by-one (detail: Parked; do not re-pop).
- **rloc park:** body faithful (D-0686); writer is a draw-free migration creator (detail: Parked; do not re-pop).
- **lightdamage park:** `mzapwand` MORE-transient, capture artifact not state (D-1366 faithful; detail: Parked; do not re-pop).
- **mattackm/can_carry park:** writer can_carry; import alone ETIMEDOUT — trio only, do not pop.
- **spoteffects park:** topline-literal misattribution; writer `mthrowu.c` flight/catch (detail + falsifier: Parked; do not re-pop).
- **mon_adjust_speed park:** topline-literal misattribution; writer is summon glyph paint (detail: Parked; do not re-pop).
- **zapyourself park:** monster-zap dobuzz misattribution (detail: Parked; do not re-pop).
- **doname_base park:** wield `prinv`+shine More-timing misattribution (detail: Parked; do not re-pop).
- **Healer-92107 residual (D-2137 Next):** destroy double-count (`mhitu.js:901` `+=` vs C `(void)`); audit fire/elec arms.
- **hmonas park:** see LOOP-QUEUE Parked (More-transient misattribution). Do not re-pop.

## Don't re-check (≤15)

- D-1790…D-2144 ports stand (range-covered). Scars: `m_seenres` is boolean, never `!== 0`; no second `genus`/`accessible`/trailing-`confdir`/`locomotion`/`unconscious`/`free_mgivenname`/`is_axe`/`carrying`/`end_running`.
- D-1795 `mattacku`/`getmattk` and D-1816 NATTK abort stand (range-covered). Scars: keep sleep `rn2(10)`; no second `m_monnam`/`simple_typename`; seed4500 `[2]` (D-1817): keep `flush_screen(1)`, never hide `[2]`.
- No `stay` rebuild; no `u.Punished`; no `rn2(20)` on ordinary pit farlook.
- seed0014 I-glyph is D-1774; findone tail D-1775. Do not revert D-0078 H2344 / offx 72 (D-1185). `g` is not Unknown (D-1186). PREFIXCMD D-1582.
  ParanoidTrap / `domagicportal` / `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 are D-1187/1188. No rhack raw-ETX (D-1189). Never FORCE the falsified mineralize TRC (76,14)/(77,14) (D-1849).
- `Val-*`/`Sam-*` loaders shipped D-1852/D-1858 — check `load_val_*`/`load_sam_*` before refilling.
- Don't re-apply D-0480 glyph `tty_map_color` (D-0483). Don't skip painting spaces or emit mid-row space runs >4 (D-0931). Do not FORCE shk satdoor/`onlineu` (D-0376) or linedup/FlipX (#1092). Do not blanket-restore overlay `_pending_message` (D-0929). Do not HEAVY_IRON_BALL `owt!=0` (#1194). Judge does **not** elide RC (D-0933); do not extend §1.2. Do not chase public LB in-loop.
- Do not memcpy gi worn/ball (D-1035) / `setnotworn` from `owornmask` (D-1020) / `delobj` tutorial loot / off-level timers (D-1037) / omit `msounds[]` (D-1053) / tut-1 keys (D-1065) / skip `tutorial()` (D-1066). Do not skip D-1067…D-2144.
- Do not import `monmove.js` `sticks` for sit / rewrite `confer_oc_oprop` / delete emin / stub `make_happy_shk` (D-1540) / bones→options fruitadd (D-1541). No `reset_glyphmap` / `notice_all_mons` / savelev-freeing / lua `lspo_reset_level`. No `wield.js`/`pickup.js`→`polyself.js` for `body_part`. No static `end.js`←`dog.js`. No makemon→hack/`artifact`/`minion`. Do not re-port D-1682…D-2144.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-2144: `js/artifact.js` only — full BEHEAD arm in C order and short-circuit (Tsurugi `ART_TSURUGI_OF_MURAMASA` + Vorpal `ART_VORPAL_BLADE` from `generated/ar Named: SPFX_DRLI arm stays named (map `data.md`, untouched by this path); `Mb_hit` stays named; d
- D-2143: new exported async `runmode_delay_output()` in `js/hack.js` (C-faithful home, `// src/hack.c:2995` cite): raw-string normalization with C's prefix tab Named: the `optfn_runmode` options-table setter itself stays unported (normalization lives inside
- D-2142: `js/uhitm.js` only — `near_capacity` joins the existing static `invent.js` edge (`imports.mjs --can`: already imported, no new edge); `find_roll_to_hi Named: `find_roll_to_hit` monk-armor + orc-vs-elf arms stay named (map `turns.md:3336`, untouched
- D-2141: `js/invent.js` only — `await dropy(obj)` after `obj_extract_self(obj)` in the refuse arm (C `:1229`), with C cite. Named: `hold_another_object` wasUpolyd revert-grip arm + crysknife restore + fatal-wished-corpse 
- D-2140: `js/mcastu.js` only — full C switch in C order and short-circuit: FIRE (`pline("You're enveloped in flames.")`, `Fire_resistance()` → `shieldeff` + re Named: `mcast_spell` FIRE_PILLAR/LIGHTNING/GEYSER `mon_spell_hits_spot` arms stay named (file-loc
- D-2139: `js/dothrow.js` only — (1) coin gate is now `if COIN_CLASS && obj !== uquiver → throw_gold`; quivered coins fall through to the live m_shot loop (spli Named: map `turns.md:2543` paren retires «quivered gold» (live this entry); unsplitobj D-0720 / d
- D-2138: `js/polyself.js` only — `can_teleport`/`control_teleport` added to the existing `monsters.js` edge (the edge `eat.js`/`dokick.js` already use; hoisted Named: remaining `set_uasmon` PROPSETs (ANTIMAGIC/SICK_RES/STUNNED/SEE_INVIS/TELEPAT/INFRAVISION/
- D-2137: `js/mcastu.js` only — module-local `async cursetxt(mtmp, undirected)` in exact C order and short-circuit (Invis/Displaced read from `game.u` like `mca Named: `buzzmu` `cursetxt(mtmp, FALSE)` call stays named (`js/mcastu.js` buzzmu header; whole zap
- D-2136: `js/mklev.js` only — border now built with the shared `selection_rect_rel(0, 0, 78, 20)` (same `get_location_coord` origin shift C applies: `game.sple Named: none new — sibling hell styles use selection ops (already origin-shifted) or have no hand-
- D-2135: extractor captures `lm.group(4)` as `mr` (+ fallback 0) and emits `export const mrs = [...]` (225/383 nonzero); `js/monsters.js` imports `mrs` (same l Named: none new — all six `data.mr` readers are pre-existing live call sites fixed by the data (n
- D-2134: `js/invent.js` only — refuse arm returns after `obj_extract_self` with no pline, exact C order, C cite `:1227–1231` in place. Named: `dropy` on the refuse arm + wasUpolyd arm + crysknife restore stay named (`turns.md` hold_
- D-2133: `js/zap.js` only, exact C order — dobuzz hero arm: reflect path `monstseesu(M_SEEN_REFL)` + `await shieldeff(sx, sy)`; non-reflect `monstunseesu(M_SEE Named: usteed `rn2(3)`+`mon_reflects` redirect stays named (dobuzz header; `mon_reflects` has no 
- D-2132: `js/potion.js` only — file-local `stagger_poly` clone of `mondata.c:1394–1407` (same clone as the `mhitm.js` `stagger`; `is_floater`/`is_flyer`/`slith Named: usteed saddle wobble stays named (`potion.js` header; no corpus session reaches it this it
- D-2131: `js/polyself.js` — new exported `uunstick()` in exact C order (`impossible` on null via the already-imported `display.js` edge, `set_ustuck(null)` via Named: `polyman` was_mimicking/`ugenocided`/`skinback`/strangling/pool-spoteffects/retouch arms s
- D-2130: `js/mhitu.js` only — `mswings` now gates on the same-module live `Blind()` (`youprop.h` `(H||E)&&!B` + roleplay/ublind mirrors, D-0716 convention; no  Named: none new.
<!-- landmarks:end -->
