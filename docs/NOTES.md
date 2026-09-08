# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Scenario corpus = work picker:** `hidden-proxy queue`; singletons Deferred; themed-room step-0 → `geom-probe`.
- **distfleeck park:** body port proven no-movement; 4th session via D-2108; writers in the Parked row.
- **mcalcmove park:** D-2066 shipped; Rogue-92137/Knight-92188 = slime-lifesave writer (see Parked).

- **Parks (do not pop):** show_conduct, ready_weapon, mdrop_obj/dopush, dosearch, save_dungeon, do_statusline2, spoteffects (falsifiers in Parked rows).
- **Fortress guards.** Do not reopen display_inventory dismiss / gameover heading / keep_status, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue `S_ndoor`, bigrm-2, getpos, summonmu, lookat, `do_statusline1`, snapshot, fakewiz, Ice/Boulder, `roles[]`, pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **Luck runs when invulnerable; dialogues do not** (`timeout.c:623`); STONED/SLIMED expiry silent.
- **`sit.js` lay-egg `morehungry` unawaited; `losedogs` rebuilds `migrating_mons`.** Clone drift: zap useupf; detect/potion/read/spell `useup`; Elbereth; teleport `accessible`; helm_simple_name; pickup `ysimple_name`; getobj_* clones.
- **next_ident = symptom owner:** fix the WRITER, not the table reader.
- **obj_resists park:** 3-writer symptom (detail: Parked). S2 fire-trap skip; S3 cube paradox.
- **m_move symptom-owner park:** loop body faithful; D-2069 shipped; Caveman-92202 cnt-j off-by-one (detail + falsifier: Parked; do not re-pop).
- **rloc park:** body faithful (D-0686); writer is a draw-free migration creator (detail + falsifier: Parked; do not re-pop).
- **lightdamage park:** `mzapwand` MORE-transient misattributed to zap.c (D-1366 faithful); capture artifact, not state (detail + falsifier: Parked; do not re-pop).
- **mattackm/can_carry park:** writer can_carry; import alone ETIMEDOUT — trio only, do not pop.
- **spoteffects park:** Samurai-92161 step 35 topline-literal misattribution; writer is `mthrowu.c` flight/catch (forcehit + catch-inventory). Full measurement + falsifier in LOOP-QUEUE Parked row; do not re-pop.

## Don't re-check (≤15)

- D-1790…D-2125 ports stand (range-covered). Scars: `m_seenres` is boolean, never `!== 0`; no second `genus`/`accessible`/trailing-`confdir`/`locomotion`/`unconscious`/`free_mgivenname`/`is_axe`/`carrying`/`end_running`.
- D-1795 `mattacku`/`getmattk` and D-1816 NATTK abort stand (range-covered). Scars: keep sleep `rn2(10)`; no second `m_monnam`/`simple_typename`; seed4500 `[2]` (D-1817): keep `flush_screen(1)`, never hide `[2]`.
- No `stay` rebuild; no `u.Punished`; no `rn2(20)` on ordinary pit farlook.
- seed0014 I-glyph is D-1774; findone tail D-1775. Do not revert D-0078 H2344 / offx 72 (D-1185). `g` is not Unknown (D-1186). PREFIXCMD D-1582.
  ParanoidTrap / `domagicportal` / `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 are D-1187/1188. No rhack raw-ETX (D-1189). Never FORCE the falsified mineralize TRC (76,14)/(77,14) (D-1849).
- `Val-*`/`Sam-*` loaders shipped D-1852/D-1858 — check `load_val_*`/`load_sam_*` before refilling.
- Don't re-apply D-0480 glyph `tty_map_color` (D-0483). Don't skip painting spaces or emit mid-row space runs >4 (D-0931). Do not FORCE shk satdoor/`onlineu` (D-0376) or linedup/FlipX (#1092). Do not blanket-restore overlay `_pending_message` (D-0929). Do not HEAVY_IRON_BALL `owt!=0` (#1194). Judge does **not** elide RC (D-0933); do not extend §1.2. Do not chase public LB in-loop.
- Do not memcpy gi worn/ball (D-1035) / `setnotworn` from `owornmask` (D-1020) / `delobj` tutorial loot / off-level timers (D-1037) / omit `msounds[]` (D-1053) / tut-1 keys (D-1065) / skip `tutorial()` (D-1066). Do not skip D-1067…D-2125.
- Do not import `monmove.js` `sticks` for sit / rewrite `confer_oc_oprop` / delete emin / stub `make_happy_shk` (D-1540) / bones→options fruitadd (D-1541). No `reset_glyphmap` / `notice_all_mons` / savelev-freeing / lua `lspo_reset_level`. No `wield.js`/`pickup.js`→`polyself.js` for `body_part`. No static `end.js`←`dog.js`. No makemon→hack/`artifact`/`minion`. Do not re-port D-1682…D-2125.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-2125: `js/weapon.js` only — the `:918–928` arm in exact C order (`begin_burn(obj, false)` before the visibility branch so lamplit/radius are set first, matc Named: none new. mwelded refuse-wield plines + weld-on-wield + autoreturn tether stay deferred (m
- D-2124: `js/mon.js` only — `else { await growl(mtmp); }` in exact C position with C cite; `growl` was already imported from pre-existing `./sounds.js` edge (n Named: none new.
- D-2123: `js/worn.js` — `cantweararm` exported (import-the-export, no second copy; `breakarm`/`sliparm` stay private). Named: none new.
- D-2122: `js/end.js` — `done_in_by` ports the full `:326–340` chain in C order (`mlet` on `mtmp.data`, `zombie_maker` live import, `Race_if(PM_HUMAN)` as `urac Named: none new.
- D-2121: `js/objnam.js` only — `xname` returns bare `ONAME` (`The` downcase + strip leading `the `) when `obj_is_pname(obj) && has_oname(obj)`; `doname` uses t Named: none new.
- D-2120: `js/dbridge.js` exports the four D-1967 predicates (import-the-export, no second macro implementation); `js/invent.js` extends the same-edge static `. Named: Wwalking arm (`:1755–1756`, needs a `walking_on_water` clone); blocked-Lev/Fly + clinger a
- D-2119: `js/cmd.js` only, exact C shape — `game.kickedloc = { x: 0, y: 0 }` unconditional in `domove()`'s `finally` beside `game.domove_attempting = 0` (C `:2 Named: none new.
- D-2118: `js/pray.js` only — `Inhell()` now the dungeon `hellish` flag; `GEHENNOM` import dropped. Named: same-shape `dnum===GEHENNOM` clones left untouched (no corpus session proves them this ite
- D-2117: full C-order port in `js/polyself.js` (energy cost lands before the prompt, so a cancelled breath still costs 15 — dosummon botl idiom); `BZ_U_BREATH` Named: none new in `dobreathe` (fully ported; the seed0108 `uen<15` refuse path is unchanged and 
- D-2116: `js/zap.js` — canonical `resist` gains the Conflict early pass + mplayer dlev (needs `is_mplayer`, same-module import extension, no new edge); ZT_SLEE Named: `tell → shieldeff_mon` display stays deferred (pre-existing `void tell`); sleep `Resists_E
- D-2115: `js/dig.js` only, exact C order and guards (`On_stairs` called twice as in C): `Is_airlevel`/`Is_waterlevel` (pre-existing `const.js` edge) + `!(u.uin Named: unchanged — swallowed pierce; pitdig conjoined / `adj_pit_checks` / `pit_flow` (map + `zap
- D-2114: `js/quest.js` only — `prisoner_speaks` in exact C order: `mndx` compare for the `data` identity (JS `mtmp.data` is a value, not a pointer — `sounds.js Named: `MS_NEMESIS` → `nemesis_speaks` (no live export — `quest.js` header + map).
- D-2113: `js/were.js` only — `were_change` is now `async` and awaits `new_were` (C is fully sequential; the armor tail must settle before the `canseemon` read) Named: none new in this function (Soundeffect is a live no-op, not an omission).
- D-2112: `js/invent.js` only — `const noeyes = !haseyes(game.youmonst?.data)` in exact C position. Named: Infravision race-`mons` fallback (`invent.js:5519–5527`, `display.js hero_has_infravision`
- D-2111: `js/weapon.js` only — `const PM_NINJA = monsterNames.indexOf('PM_NINJA')` beside the existing PM_PONY/SHADE/BALROG locals (pre-existing `monsters_data Named: `monmulti` mplayer `+1` arm (`mthrowu.c:220`, no corpus coverage — ninja is not mplayer, u
<!-- landmarks:end -->
