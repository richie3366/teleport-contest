# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Scenario corpus = work picker:** queue from `hidden-proxy queue`; singletons Deferred; themed-room step-0 → `geom-probe` (scores live in CURRENT.md).
- **distfleeck park (2026-09-08):** body port proven no-movement; writers Healer-92218 `domove_bump_mon` / Tourist-92061 interleave / Rogue-92030 m_move (see Parked).
- **mcalcmove park (2026-09-08):** Archeologist shipped D-2066; Rogue-92137/Knight-92188 = slime-lifesave writer (see Parked).

- **Parks (Parked rows; do not pop):** show_conduct, ready_weapon Knight-92204, mdrop_obj/dopush, dosearch grid-bug, save_dungeon, do_statusline2 lembas pair (falsifiers in Parked rows).
- **Fortress guards.** Do not reopen display_inventory dismiss / gameover heading / keep_status, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue `S_ndoor`, bigrm-2, getpos, summonmu, lookat, `do_statusline1`, snapshot, fakewiz, Ice/Boulder, `roles[]`, pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **Luck runs when invulnerable; dialogues do not** (`timeout.c:623`); STONED/SLIMED expiry silent.
- **`sit.js` lay-egg `morehungry` unawaited; `losedogs` rebuilds `migrating_mons`.** Clone drift: zap useupf; detect/potion/read/spell `useup`; Elbereth; teleport `accessible`; helm_simple_name; pickup `ysimple_name`; getobj_* clones.
- **next_ident = symptom owner:** fix the WRITER, not the table reader.
- **obj_resists park (2026-09-08):** 3-writer symptom (detail: Parked). S1 shipped D-2068; S2 fire-trap skip; S3 cube paradox.
- **m_move symptom-owner park (2026-09-08):** loop body faithful; Wizard-92076 shipped D-2069; Caveman-92202 cnt-j off-by-one (D-1868 arms live) — needs C per-turn cnt/mtrack dump (detail: Parked; do not re-pop).

## Don't re-check (≤15)

- D-1790…D-2089 ports stand (range-covered). Scars: `m_seenres` is boolean, never `!== 0`; no second `genus`/`accessible`/trailing-`confdir`/`locomotion`/`unconscious`/`free_mgivenname`/`is_axe`/`carrying`/`end_running`.
- D-1795 `mattacku`/`getmattk` and D-1816 NATTK abort stand (range-covered). Scars: keep sleep `rn2(10)`; no second `m_monnam`/`simple_typename`; seed4500 `[2]` (D-1817): keep `flush_screen(1)`, never hide `[2]`.
- No `stay` rebuild; no `u.Punished`; no `rn2(20)` on ordinary pit farlook.
- seed0014 I-glyph is D-1774; findone tail D-1775. Do not revert D-0078 H2344 / offx 72 (D-1185). `g` is not Unknown (D-1186). PREFIXCMD D-1582.
  ParanoidTrap / `domagicportal` / `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 are D-1187/1188. No rhack raw-ETX (D-1189). Never FORCE the falsified mineralize TRC (76,14)/(77,14) (D-1849).
- `Val-*`/`Sam-*` loaders shipped D-1852/D-1858 — check `load_val_*`/`load_sam_*` before refilling.
- Don't re-apply D-0480 glyph `tty_map_color` (D-0483). Don't skip painting spaces or emit mid-row space runs >4 (D-0931). Do not FORCE shk satdoor/`onlineu` (D-0376) or linedup/FlipX (#1092). Do not blanket-restore overlay `_pending_message` (D-0929). Do not HEAVY_IRON_BALL `owt!=0` (#1194). Judge does **not** elide RC (D-0933); do not extend §1.2. Do not chase public LB in-loop.
- Do not memcpy gi worn/ball (D-1035) / `setnotworn` from `owornmask` (D-1020) / `delobj` tutorial loot / off-level timers (D-1037) / omit `msounds[]` (D-1053) / tut-1 keys (D-1065) / skip `tutorial()` (D-1066). Do not skip D-1067…D-2089.
- Do not import `monmove.js` `sticks` for sit / rewrite `confer_oc_oprop` / delete emin / stub `make_happy_shk` (D-1540) / bones→options fruitadd (D-1541). No `reset_glyphmap` / `notice_all_mons` / savelev-freeing / lua `lspo_reset_level`. No `wield.js`/`pickup.js`→`polyself.js` for `body_part`. No static `end.js`←`dog.js`. No makemon→hack/`artifact`/`minion`. Do not re-port D-1682…D-2089.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-2089: `js/readobjnam.js` — gold condition is now `if (!d.typ && isGold && GOLD_PIECE >= 0)` with a C cite (`return 2` skips this block); corrected the stale Named: none new — retires the `isGold` `!d.typ` guard (review 1054 Actionable 1).
- D-2088: `js/monmove.js` — `wake_msg` joins the pre-existing `./mon.js` import (imports.mjs ALREADY, no new edge; hoisted function decl, call-time use only, no Named: none new — retires `wake_msg` on `disturb` (map turns.md:2596/2619) and the rogue object-s
- D-2087: `js/trap.js` `resists_elem` now ORs `mtmp.data.mresists` for monsters only — `is_youmonst` gate preserves hero behavior (C ignores species bits for th Named: none new — this retires the `data->mresists` species-bits omission on `resists_elem` (map 
- D-2086: `js/makemon.js` — file-local `See_invisible_misc()` (`youprop.h:152` cite; H||E+sticky flat, the muse.js:2147/trap.js/mhitm.js file idiom; `game` alre Named: none new — this retires the last one on `rnd_misc_item` (See_invisible treat-as-false).
- D-2085: `js/monmove.js` — ported the missing C guards verbatim in C order (isshk+inhishop, then !mtame → in_rooms(SHOPBASE) → rn2(25), so the draw stays shop- Named: none new — this retires four from the mpickstuff doc comment: shopkeeper inhishop gate, in
- D-2084: `js/readobjnam.js` — ported the full conditional verbatim in C position (ahead of the no-`of` scan; glob intercept above it stays map-named): guards v Named: none new — this retires `tin of`/`of`-split + `mgend`/`contents`/`tvariety` parsing + `set
- D-2083: `js/potion.js` — both calls gated on the local `Fixed_abil()` (`potion.js:1786`, C `youprop.h:385` cite) in verbatim C order (poisontell, then adjattr Named: none new — this retires two: poisontell wording, Fixed_abil gate.
- D-2082: `js/pickup.js` — restored the 5-line C arm verbatim (`if (!obj.lknown) { obj.lknown = 1; if (held) update_inventory(); }`) ahead of the olocked check  Named: none new — chest trap, bag-of-tricks/horn, cursed-mbag, shop billing, altarizing (tipconta
- D-2081: `js/detect.js` — deleted the `flush_topl_more()` call and its import (no other user in this function); replaced the stale comment with the C cite (`de Named: none new — cursed-otmp wake, blessed persistent display_nhwindow, and unconstrain underwat
- D-2080: `js/read.js` — `scroll.pickup_prev = 0` (eat.js/apply.js idiom, C `:359`); Blind gate ports C branch order verbatim (`Zblind` uses the same `u.Blind | Named: none new — this retires three: doread Blind formula/book gate, mail conduct/confused envel
- D-2079: `js/const.js` — `Upolyd(player)` is now `((player.umonnum | 0) !== (player.umonster | 0))` with the `you.h:554` cite (plus why-mtimedone-fails note). Named: none new.
- D-2078: `js/spell.js` — amulet arm ports C branch order verbatim (`(game.u?.uhave?.amulet || game.u?.uhave_amulet) && uen >= energy` — the eat.js/teleport.js  Named: none new — the amulet arm retires a named omission.
- D-2077: `js/do_wear.js` — `armor_doff_simple_name` now dispatches exactly the C arms: suit→`suit_simple_name`, shield→`shield_simple_name` (local, silver/smoo Named: `armoroff` unknown-armcat default still returns 'armor' where C leaves `what=0` (no nomove
- D-2076: `js/wield.js` — both arms now print `${Yname2(otmp)}` (`Yname2` joins the existing `./objnam.js` import — same module edge as `xname`, no new cycle, n Named: artifact-resist arm still uses `xname` (live `Yobjnam2` export not wired; local clone at w
- D-2075: `js/mhitu.js` — new `mhitm_ad_stun_u` (`hitmsg` always; `!(mtmp.mcan|0) && !rn2(4)` → `make_stunned(((game.u?.HStun|0) & TIMEOUT) + (mhm.damage|0), tr Named: `mhitm_ad_stun` uhitm arm (`:4394–4402` — hero-as-attacker `!Blind` stagger pline + phys, 
<!-- landmarks:end -->
