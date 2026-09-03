# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Suite 44/44.** **D-1792** shipped the first Open: `timeout.c`
  `nh_timeout` property dialogues + `attrib.c` `stone_luck` +
  `eat.c` `Popeye`. Must-fix is still **empty** — pop the first Open.
  Do not invent a FAIL.
- **Open is hidden-score ordered now** (`docs/PORT-GAP-TOP30.md`,
  rebuilt by `node scripts/port-coverage.mjs`). Pop rows in order; do
  not re-derive a different priority from the map.
- **Next cluster:** first Open — `weapon.c` `dmgval` blessed/axe/
  silver/`artifact_light` bonus `rnd()` + `greatest_erosion` (RNG).
  Not `spec_abon`.
- **Luck still runs when invulnerable.** Dialogues do not. C
  `timeout.c:597–621` then `:623` `if (u.uinvulnerable) return`.
- **STONED/SLIMED expiry is still a silent clear.** `done_timeout` /
  `slimed_to_death` are named omissions — do not "fix" that by
  inventing a death message.
- **`sit.js` lay-egg `morehungry` is still not awaited.** Making
  `morehungry` async left that one caller fire-and-forget (file-count
  cap). Await it when you next touch sit.
- **Never rebuild a C list from a survivors array.** C walks `fmon` /
  `migrating_mons` with `mtmp2 = mtmp->nmon` saved *before* the body.
  `losedogs` (`js/dog.js:1030`) still has that shape over
  `migrating_mons` — different C function, not yet queued.
- **`strict-output-check.mjs` leaks state across sessions in one
  process** (pre-existing). seed0012 / seed0014 report a bogus mid-run
  RNG mismatch when batched after seed4500 and PASS alone. Run it per
  session, or trust `ps_test_runner sessions`.
- **`end.c` DUMPLOG is retired (D-1776) — do not re-enqueue.** Open
  work lives in `LOOP-QUEUE.md`, not here.
- Clone drift to fold when you touch it: `zap.js` useupf;
  detect/potion/read/spell `useup`; `qst_guardians_respond`; Elbereth.

## Don't re-check (≤15)

- Do not treat `nh_timeout` as missing stoned/slime/vomiting/choke/
  sickness/levitation/phaze or luck (D-1792). Do not write a second
  `carrying` (C invent.c; live export is `hack.js`). Do not "correct"
  silent STONED/SLIMED expiry (`done_timeout` still omitted). Do not
  treat `newuhs` as a field-update stub (D-1791). Do not write a
  second `end_running` (C home is `hack.js`). Do not "correct"
  `monverbself`'s genders[3] arm to "they" (D-1790). Do not treat
  reviews **728–736** as unpaid Must-fix (those AWD held). Review
  **737** AWD was **wrong**; **747** is **D-1786**; **748** lookat
  `t_at` is **D-1787**; **750** food-spell is **D-1788**; **752**
  keepdogs `fmon` walk is **D-1789** — do not re-add a `stay` rebuild
  there. Do not re-gate on `tseen` / ftrap. Do not rubber-stamp
  “fortress held” as Match C. Do not assign `u.Punished`. Do not
  invent `rn2(20)` on ordinary pit farlook.
- Do not re-check 40/44 at D-1765 / D-1766; D-1767 recovered three
  FAILs; seed0014 leftover was I-glyph `newsym` (D-1774), not gbuf
  and not skipped `nonrotting_corpse`. findone's tail is live
  (D-1775) — do not re-port flash/foundone/mimic/hider/invis.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown (D-1186). PREFIXCMD inner parse is D-1582.
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1792.
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
  nhcore (D-1066). Do not skip D-1067…D-1792 (index).
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
  D-1682…D-1792 — read the index row before assuming a function is
  unported. No trailing `confdir` in shared `getdir`.

## Landmarks (≤15)

- D-1792: `nh_timeout` dialogues + `stone_luck` + `Popeye`; luck still
  runs when invulnerable. Named: `region_dialogue` / `sleep_dialogue`;
  STONED/SLIMED `done_timeout` / `slimed_to_death`.
- D-1791: `newuhs` messages / faint / starve / ATEMP / `end_running`;
  `unfaint` afternmv; `gethungry` async. sit.js egg `morehungry` still
  not awaited.
- D-1790: `mon_nam_too`/`monverbself` one home; makeplural pronoun
  block. Hallu steed is “Them rouse themselves!” — C as written.
- D-1789: `keepdogs` walks `[...fmon]`, departers splice in place;
  named `relmon` / `mon_leaving_level` (async `unstuck`).
- D-1788: `#cast` SPE_DETECT_FOOD `seffects(pseudo)` skilled bless;
  helper D-1781. Remaining scroll-duplicate `#cast` otyps named.
- D-1787: lookat tnum `glyph_to_trap(glyph_at)`; helpers D-1779.
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
