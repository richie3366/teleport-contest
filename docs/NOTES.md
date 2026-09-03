# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Suite 44/44.** **D-1790** shipped the first Open: `mon_nam_too` +
  `monverbself` have one home in `js/do_name.js` and `makeplural` grew
  C’s pronoun block. Must-fix is still **empty** — pop the first Open.
  Do not invent a FAIL.
- **Next cluster:** first Open — `apply.c` corpse gender PRONOUN_NO_IT
  arm `:230–248` (named). Not `pronoun_gender`.
- **`monverbself` prints what C writes, not what C’s comment says.**
  makeplural("It") is "They" (genders[2].he beats .him), and
  `do_name.c:1240` rewrites that to genders[3].him, so a hallucinated
  steed reads **“Them rouse themselves!”** and an already-“They” subject
  becomes **“Theys”**. Do not “correct” either to “they”.
- **Never rebuild a C list from a survivors array.** C walks `fmon` /
  `migrating_mons` with `mtmp2 = mtmp->nmon` saved *before* the body,
  because `relmon` / `migrate_to_level` unlink mid-walk. Rebuilding
  deletes whatever a splice skipped past and whatever a callee
  appended. `losedogs` (`js/dog.js:1030`) still has that shape over
  `migrating_mons` — different C function, not yet queued.
- **Traps in the recent ports** (detail in the D-log): `do_clear_area`
  is one async export and `openit`/`findit` pass `openone`/`findone`
  **by identity** — that is what arms `override_vision` (D-1785;
  `dog_goal` async). lookat tnum is the gbuf glyph (D-1787); a ridden
  steed uses `ridden_mon_to_glyph` (D-1784); `keepdogs` is async and
  its `fmon` walk is fixed (D-1783/D-1789); `food_detect` scroll and
  `#cast` are live (D-1781/D-1788); `on_level` is exported, 12 clones
  remain; ballfall callers are D-1786.
- **RNG order traps.** `pronoun_gender` draws `rn2(4)` *before* either
  gate; `ballfall` computes `gets_hit` `rn2(5)` *before* `ballrelease`;
  `trap_description` chest gate then door (one tnum can draw at most
  one `rn2(20)`; ordinary pit farlook draws none).
- `u.bglyph`/`u.cglyph` hold remembered **cells**, not int glyph ids;
  the gehennom/hell → `valley` rewrite in `lev_by_name` is load-bearing
  (the bare branch name lands on the castle).
- **`strict-output-check.mjs` leaks state across sessions in one
  process** (pre-existing). seed0012 / seed0014 report a bogus mid-run
  RNG mismatch when batched after seed4500 and PASS alone. Run it per
  session, or trust `ps_test_runner sessions`.
- **No public session** is Punished+Blind, Punished-while-falling,
  farlooking a trapped chest/door, level-porting by name, food/object
  detect, `#cast` food-detect, or leaving a level with a stuck
  leashed pet. Probe those.
- **`end.c` DUMPLOG is retired (D-1776) — do not re-enqueue.** Open
  work lives in `LOOP-QUEUE.md`, not here; do not re-port from a list
  in this file.
- Still unqueued clone drift worth folding when you touch it:
  `zap.js` useupf; detect/potion/read/spell `useup`;
  `qst_guardians_respond`; Elbereth.

## Don't re-check (≤15)

- Do not treat reviews **728–736** as unpaid Must-fix (those AWD
  held). Review **737** AWD was **wrong**; **747** is **D-1786**;
  **748** lookat `t_at` is **D-1787**; **750** food-spell is
  **D-1788**; **752** keepdogs `fmon` walk is **D-1789** — do not
  re-add a `stay` rebuild there. Do not rewrite `monverbself`’s
  genders[3] arm to “they” (D-1790). Do not re-gate on `tseen` / ftrap,
  and do not claim
  `#cast` DETECT_FOOD still prints `Nothing happens.` Do not
  rubber-stamp “fortress held” as Match C. Do not assign
  `u.Punished`. Do not invent `rn2(20)` on ordinary pit farlook.
- Do not re-check 40/44 at D-1765 / D-1766; D-1767 recovered three
  FAILs; seed0014 leftover was I-glyph `newsym` (D-1774), not gbuf
  and not skipped `nonrotting_corpse`. findone's tail is live
  (D-1775) — do not re-port flash/foundone/mimic/hider/invis.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown (D-1186). PREFIXCMD inner parse is D-1582.
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1790.
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
  nhcore (D-1066). Do not skip D-1067…D-1790 (index).
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
  D-1682…D-1790 — read the index row before assuming a function is
  unported. No trailing `confdir` in shared `getdir`.

## Landmarks (≤15)

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
- D-1766: `cancel_doff` `:1643–1659`. Named: setnotworn `monstunseesu_prop`.
- D-1765: integer `GLYPH_*_OFF` / `map_monst`. gbuf stamp is D-1767.
