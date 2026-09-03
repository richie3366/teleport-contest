# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Suite 44/44.** Map-driven: named omissions / cluster density, not
  FAIL peels. Audit 728–737: ten ACCEPT-WITH-DEBT, Must-fix empty.
  **Next:** `detect.c` food_detect (named). Falsify: C `food_detect`
  body vs JS omit. Not object_detect. Do not invent a FAIL.
- **Recent ports — do not re-clone or re-order** (detail in the D-log):
  `lev_by_name` + `find_branch` `pd == NULL` (D-1780, `js/dungeon.js`);
  `trap_description` + `trapped_chest_at`/`trapped_door_at` (D-1779);
  `ballfall` + `hard_helmet`/`is_helmet` exports in `js/do_wear.js`
  (D-1778); Blind bc glyph arms (D-1777); pronoun helpers in
  `js/mondata.js` (D-1776).
- **RNG order traps in those ports.** `pronoun_gender` draws `rn2(4)`
  *before* either gate; `ballfall` computes `gets_hit`'s `rn2(5)`
  *before* `ballrelease` and draws nothing when the ball is on the
  hero's spot or is `uwep`; `trap_description` runs the chest gate
  before the door gate and each draws `rn2(20)` under Hallucination.
- `u.bglyph`/`u.cglyph` hold remembered **cells**, not int glyph ids —
  `levl_glyph_at` / `set_levl_glyph` in `js/ball.js`.
- The gehennom/hell → `valley` rewrite in `lev_by_name` is
  load-bearing: the bare branch name lands on the castle.
- **`strict-output-check.mjs` leaks state across sessions in one
  process** (pre-existing; reproduced on HEAD). seed0012 / seed0014
  report a bogus mid-run RNG mismatch when batched after seed4500 and
  PASS alone. Run it per session, or trust `ps_test_runner sessions`.
- **No public session** is Punished+Blind (D-1777), Punished-while-
  falling (D-1778), farlooking a trapped chest/door (D-1779), or
  level-porting by name (D-1780). The suite cannot regress-test those
  arms — probe directly.
- **`end.c` DUMPLOG is retired (D-1776), not deferred — do not
  re-enqueue.** `nethack-c/macosx-minimal` passes no `-DDUMPLOG`, so
  all `end.c` `#ifdef DUMPLOG` blocks are compiled out of the scored
  build. `DUMPLOG_CORE` is on via macOS `CRASHREPORT`, but its
  `saved_plines[]` ring is write-only — the sole compiled-in reader is
  `report.c:579`. No screen, no RNG.
- Named still: `mon_nam_too`/`monverbself` (mhitm clone); `apply.c`
  corpse NO_IT arm; `type_is_pname` insight clone;
  FOUND_FLASH_COUNT==0 `tmp_at` path; food_detect;
  object_detect `clear_stale_map` caller; DUMPLOG; `noit_mhim` Hallu;
  Blind `move_bc`/`unplacebc`/ballfall; pager `trap_description`;
  `lev_by_name`; keepdogs leash; `qst_guardians_respond`; Elbereth;
  zap.js useupf clone; detect/potion/read/spell useup clones;
  `ridden_mon_to_glyph` usteed.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not re-check 40/44 at D-1765 / D-1766; D-1767 recovered three
  FAILs; seed0014 leftover was I-glyph `newsym` (D-1774), not gbuf
  and not skipped `nonrotting_corpse`. findone's tail is live
  (D-1775) — do not re-port flash/foundone/mimic/hider/invis.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown (D-1186). PREFIXCMD inner parse is D-1582.
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1780.
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
  nhcore (D-1066). Do not skip D-1067…D-1780 (index).
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop`. Do not re-port `eyecount`. Do not delete emin
  (**487**). Do not stub `make_happy_shk` pacify-only (D-1540). Do
  not import bones→options for fruitadd (D-1541).
- Do not pull `reset_glyphmap` / `notice_all_mons` /
  `makemap_remove_mons` / binary savelev-freeing / lua
  `lspo_reset_level`. JSON `cant_go_back` is D-1722;
  `restore_artifacts` is D-1698. Default `spot_monsters` Off. No
  timeout.c `mon_is_local` for LS_MONSTER (D-1708). No stamp every
  `fmon` in `update_mlstmv` (D-1709).
- Do not import `wield.js`/`pickup.js`→`polyself.js` for `body_part`
  (`objnam.js` `body_part_latebound`). No static `end.js`←`dog.js`.
  No makemon→hack/`artifact`/`minion`. No fourth town gnome. Do not
  stub door/furnsyms/DELPHI (D-1536/D-1543/D-1556). Do not skip
  `block_point` (D-1557). Do not revert D-1574 `dig_point`/`seemimic`
  or global `recalc` as `vision_reset`. No yn ^P glue / `ing_suffix`
  clone #3 / InvInUse poke (D-1603) / zap sticky Blind (D-1604). No
  `dat/tribute` indent=2. No static `files.js`←`spell.js` (TDZ).
  REST_LEVELS where getlev catchup reads it. Do not re-port
  D-1682…D-1774. D-1774 is I-glyph `newsym` (not findone /
  eatcorpse rot). D-1773 is `gold_detect` (not findone /
  food_detect / object_detect `clear_stale_map` caller /
  sense_trap D-1753). D-1772 Halt. D-1771 `useupf`. D-1770 zap
  `delete_contents`. D-1769 `set_bc`. D-1768 Unaware talk. D-1767
  gbuf stamp. No trailing `confdir` in shared `getdir`.

## Landmarks (≤15)

- D-1774: `newsym` `:1032` I-arm `lev->glyph`; fight_empty `glyph_at`;
  atk_done; mondead. Named: findone; usteed ridden glyph.
- D-1773: `gold_detect` `:334–475`; `o_in`/`o_material`/`clear_stale_map`;
  `seffect_gold_detection`; steal.c `findgold`. Named: food_detect;
  object_detect `clear_stale_map` caller; findone flash.
- D-1772: `peacefuls_respond` `:4162–4257`; `setmangry` `:4317`;
  `big_little_match`. Named: `qst_guardians_respond`; Elbereth.
- D-1771: invent.c `useupf` `:4762–4783`; eat.c `carried()?useup:useupf`.
  Named: shop bill; zap.js useupf clone; detect/potion/read/spell clones.
- D-1770: `delete_contents` `:1174–1183`; zap `poly_obj`. Named: trap.js
  chest; mklev.js `create_object_delete_contents`.
- D-1769: `set_bc` `:379–424`. Named: Blind `move_bc`/`unplacebc`/ballfall.
- D-1768: `make_blinded` Unaware talk=FALSE. Punished `set_bc` is D-1769.
- D-1767: `show_glyph` `:2039` always overwrite gbuf. Named: usteed;
  `map_glyphinfo`.
- D-1766: `cancel_doff` `:1643–1659`. Named: setnotworn `monstunseesu_prop`.
- D-1765: integer `GLYPH_*_OFF` / `map_monst`. gbuf stamp is D-1767.
- D-1764: heaven `u_left_shop`+Cloud 9/`done(DIED)`. Named: `lev_by_name`.
- D-1763: `beg` `:518–542`. Named: `dog_hunger` wire. Halt is D-1772.
- D-1762: `maybe_gasp` `:545–610`. Halt is D-1772.
- D-1761: `sound_speak` `:2184–2220` !SND_SPEECH no-op.
- D-1760: `explode` `:378–452` `map_invisible` / You_hear vs Boom!.
