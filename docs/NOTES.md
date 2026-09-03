# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Suite 44/44.** **D-1786** closed review **747**: both ballfall
  callers now gate on `u.uball` (C `Punished`). Must-fix pops first.
  Falsify next: `lookat` still takes `t_at&&tseen` so a detected
  trapped chest/door is named with `trapname`, and
  `glyph_to_trap(glyph_at)` is never consulted (review **748**).
  Do not invent a FAIL.
- **Next cluster:** `pager.c` lookat trap tnum =
  `glyph_to_trap(glyph_at)`, not `t_at&&tseen` (`maketrap` returns
  null for chest/door). Source: review **748**. Not `trapname` Hallu.
  Not `look_traps`.
- **Two more Must-fix after that:** `spell.c` `SPE_DETECT_FOOD` must
  `seffects(pseudo)`; `keepdogs` must not `for-of` live `fmon` while
  `migrate_to_level` splices it. Do not re-enqueue
  `observe_recursively` (already recurses `cobj`).
- **`do_clear_area` is one async export in `js/vision.js`** (D-1785).
  `openit`/`findit` must pass `openone`/`findone` **by identity** —
  `detecting()` is what turns on `override_vision`. `dog_goal` is
  async; `dog_move` awaits it.
- **Traps in the recent ports** (full detail in the D-log):
  a ridden steed uses `ridden_mon_to_glyph` (D-1784). `keepdogs` is
  **async**; `do.js`/`end.js` await it (D-1783) — the walk is still
  C-wrong. `object_detect` gate/`rnd(10)` is D-1782. `food_detect`
  scroll is live; `#cast` is not (D-1781). `on_level` is exported;
  12 clones remain. Ballfall callers are D-1786.
- **RNG order traps.** `pronoun_gender` draws `rn2(4)` *before* either
  gate; `ballfall` computes `gets_hit` `rn2(5)` *before* `ballrelease`;
  `trap_description` chest gate then door (one tnum can draw at most
  one `rn2(20)`).
- `u.bglyph`/`u.cglyph` hold remembered **cells**, not int glyph ids.
- The gehennom/hell → `valley` rewrite in `lev_by_name` is
  load-bearing: the bare branch name lands on the castle.
- **`strict-output-check.mjs` leaks state across sessions in one
  process** (pre-existing). seed0012 / seed0014 report a bogus mid-run
  RNG mismatch when batched after seed4500 and PASS alone. Run it per
  session, or trust `ps_test_runner sessions`.
- **No public session** is Punished+Blind, Punished-while-falling,
  farlooking a trapped chest/door, level-porting by name, food/object
  detect, or leaving a level with a stuck leashed pet. Probe those.
- **`end.c` DUMPLOG is retired (D-1776), not deferred — do not
  re-enqueue.**
- **Open work lives in `LOOP-QUEUE.md`, not here.** Do not re-port
  from a list in this file.
- Still unqueued clone drift worth folding when you touch it:
  `zap.js` useupf; detect/potion/read/spell `useup`;
  `qst_guardians_respond`; Elbereth.

## Don't re-check (≤15)

- Do not treat reviews **728–736** as unpaid Must-fix (those AWD
  held). Review **737** AWD was **wrong**; **747** QUALITY-RISK is
  **D-1786** (callers now `u.uball`). Do not rubber-stamp “fortress
  held” as Match C. Do not re-open the dead `u.Punished` ballfall
  gate. Do not assign `u.Punished`.
- Do not re-check 40/44 at D-1765 / D-1766; D-1767 recovered three
  FAILs; seed0014 leftover was I-glyph `newsym` (D-1774), not gbuf
  and not skipped `nonrotting_corpse`. findone's tail is live
  (D-1775) — do not re-port flash/foundone/mimic/hider/invis.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown (D-1186). PREFIXCMD inner parse is D-1582.
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1786.
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
  nhcore (D-1066). Do not skip D-1067…D-1786 (index).
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
  D-1682…D-1786 — read the index row before assuming a function is
  unported. No trailing `confdir` in shared `getdir`.

## Landmarks (≤15)

- D-1786: ballfall callers `u.uball` (C `Punished`); helper is D-1778.
- D-1774: `newsym` `:1032` I-arm `lev->glyph`; fight_empty `glyph_at`.
- D-1773: `gold_detect`; `o_in`/`o_material`/`clear_stale_map`.
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
