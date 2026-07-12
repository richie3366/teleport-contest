# Divergence log

Evidence-backed history of important C↔JS divergences. Active speculation stays
small in `NOTES.md`; once a cause is proved or a dead end is expensive enough
to preserve, record it here.

## Record format

Each entry should include:

- **Status:** open / parked / fixed / rejected hypothesis
- **Observed:** session, channel, first meaningful divergence
- **C locus:** file + function (line numbers optional and version-sensitive)
- **Cause/evidence:** why the diagnosis is established
- **Change:** JS semantic unit changed, without trace alignment
- **Verification:** focused, green, cohort, and full-run commands/results
- **General lesson:** only when reusable

Do not record a guessed cause as fixed merely because an RNG prefix moved.

## Index

| ID | Status | Area | Short result |
|---|---|---|---|
| D-0001 | fixed | input/messages | Missing blocking `--More--` reassigned later keys |
| D-0002 | fixed | object generation | Vault gold must merge rather than allocate again |
| D-0003 | fixed | startup/eat | Tutorial answer and cookie rumor key ownership |
| D-0004 | fixed | starting pet | `apport` derives from pre-attribute `ACURR(A_CHA)` |
| D-0005 | fixed | throwing | `bhit` stops before non-`ZAP_POS` terrain |
| D-0006 | parked | pet movement | Needs reproducible C state/candidate capture |
| D-0007 | fixed | startup/role IDs | Role/race `mnum` must be PM_* not array index |
| D-0008 | fixed | startup/welcome | Tourist Aloha/neutral/HP:10 hardcodes block Rogue first screen |
| D-0009 | fixed | legacy/botl/calendar | Legacy %d/%G + menu offx; showexp/time; moon/friday preamble |
| D-0010 | fixed | makemon invent | `is_armed`+`m_initweap` ordinary envelope; was skipping to `rn2(50)` |
| D-0011 | fixed | corpse timers | `mkcorpstat` must restart timeout when `special_corpse(old)` |
| D-0012 | fixed | weapon init | `is_poisonable` is missiles only — not dagger/spear |
| D-0013 | fixed | container init | starting SACK still calls `mkbox_cnts` → `rn2(1)` |
| D-0014 | fixed | mineralize | `!rn2(3)` must `add_to_buried` (not always `place_object`) |
| D-0015 | fixed | dogfood | tainted CORPSE `age+50<=moves` → POISON (not CADAVER) |
| D-0016 | fixed | mktrap_victim | trap ammo/possessions must `place_object` onto `fobj` |
| D-0017 | fixed | dog_move | `uncursedcnt` + `cursemsg`/`rn2(13*uncursedcnt)` cursed skip |
| D-0018 | fixed | trap/postmov | pet step → `mintrap` dart `t_missile`; `m_cansee`=`clear_path` |
| D-0019 | fixed | --More--/dog_invent | cursemsg+thitm plines; real pickup; drop RNG; tseen trap skip |
| D-0020 | fixed | mon_allowflags | OPENDOOR only if `!(nohands\|\|verysmall)`; was inflating mfndpos cnt |
| D-0021 | fixed | apply/lock | Missing `doapply`/`pick_lock` deferred post-`l` movemon (seed1500 @ 2702) |
| D-0022 | fixed | display | `newsym` omitted floor objects + SDOOR→`?` (seed1500 Scr 1→34) |
| D-0023 | fixed | tutorial menu | `ask_do_tutorial` used title-center pad; C uses NHW_MENU offx |
| D-0024 | fixed | invent/doname/disco | corner invent + doname suffixes; disco `*`/encounter + classes |
| D-0025 | fixed | getobj throw/apply | COIN_CLASS `$` suggest; missing-letter `continue`+`--More--`; clear getdir prompt |
| D-0026 | fixed | legacy + look stairs | Corner legacy keeps map; `look_here`/`stairs_description` Dlvl1 up |
| D-0027 | fixed | u_init orc | orc `Xtra_food` + `inv_subs` after Rogue blindfold |
| D-0028 | fixed | dog_invent/splitobj | nohands partial pickup → `splitobj`/`next_ident` |
| D-0029 | fixed | dog_invent/relobj | pet `relobj`/`mdrop_obj` clears minvent for APPORT |
| D-0030 | fixed | dog_goal/couldsee | `in_masters_sight` must use real `couldsee`, not stub true |
| D-0031 | fixed | dokick/kick_dumb | Ctrl-D empty-space kick → `exercise(A_DEX,FALSE)` before monmove |
| D-0032 | fixed | dogmove/dokick | seed0060 @ 2997: missing m_avoid_kicked_loc after kick |
| D-0033 | fixed | cmd/donull | seed0060 @ 3016: `.` wait missing → skipped turns |
| D-0034 | fixed | makemon/rnd | seed0060 @ 3105: stubbed `makemon(NULL,0,0)` skipped placement RNG |
| D-0035 | fixed | losehp/regen_hp | seed0060 @ 3536: wall kick must `losehp` + EOT `regen_hp` |
| D-0036 | fixed | race hpadv + mon_color | orc `hpadv` + `mon_glyph` mcolors; seed0060 Scr 0→5 |
| D-0037 | fixed | doname COIN + mondied newsym | "a gold piece" + death `newsym`; Scr 5→6 |
| D-0038 | fixed | cansee pline + wall_angle + `>` color | seed0060 Scr 6→37 (silent pickup; unfinished corner; dnstair) |
| D-0039 | fixed | newsym infrared + postmov | orc Infravision shows pet in dark; Scr 37→38 |

D-0001 through D-0005 predate the strict-length/cohort runbook. Their focused
causes are preserved, but generic "green sessions held" is historical evidence,
not enough to promote an entire function to `parity`. Re-run focused + green +
cohort gates if those functions are touched again.

## D-0001 — blocking `--More--` owns input keys

- **Observed:** `seed0900-tourist-explore-actions`, RNG divergence near 2936.
- **C locus:** `pline.c`/tty `more()` and callers in pet combat.
- **Cause/evidence:** C blocked on topline `--More--` and consumed 59 reject
  keys followed by ESC. JS lacked the blocking prompt, so those keys became
  later gameplay commands.
- **Change:** ported `pline`/`more` input behavior and combat messages; async
  propagation reaches `nhgetch` without reordering physics.
- **Verification:** seed0900 RNG 2983/2983 and screens 84/84; seed8000 remained
  fully green.
- **Lesson:** map keys to input boundaries before attributing an RNG mismatch
  to game logic.

## D-0002 — vault gold merge

- **Observed:** seed1800 divergence around RNG 1057.
- **C locus:** C gold placement/merge path (`mkgold` and object lists).
- **Cause/evidence:** C merged into an existing gold stack; JS allocated a new
  object and consumed `next_ident`/`rnd(2)`.
- **Change:** use the C merge path and preserve object-list semantics.
- **Verification:** focused seed1800 prefix advanced; both green sessions held.

## D-0003 — tutorial and fortune cookie input ownership

- **Observed:** seed1800 divergence around 2362.
- **C locus:** startup tutorial prompt and `eat.c` rumor path.
- **Cause/evidence:** the rc did not disable the tutorial. `n` answered its
  yes/no prompt; it was not a north command. Later `e b` ate the cookie and
  entered `outrumor`/`getrumor`.
- **Change:** ported the prompt/key ownership and cookie rumor path.
- **Verification:** focused seed1800 advanced through the cookie sequence;
  green sessions held.

## D-0004 — starting-pet apport

- **Observed:** seed1800 divergence around 2403.
- **C locus:** `dog.c:makedog`/`initedog`, `attrib.c:acurr`.
- **Cause/evidence:** `makedog` runs before initial attributes are established.
  Non-Strength `ACURR` clamps to 3, so the starting pet gets `apport=3`.
  A JS `|| 10` fallback changed the later `rn2(8)` decisions.
- **Change:** ported the clamp and removed the invented fallback.
- **Verification:** focused seed1800 advanced; green sessions held.

## D-0005 — thrown object stops before blocked terrain

- **Observed:** JS embedded the dart in a wall; C placed it on stairs at
  `(47,18)` in the current seed1800 trace.
- **C locus:** `zap.c:bhit`, called by `dothrow.c:throwit`.
- **Cause/evidence:** C backs up/stops when the next cell is not `ZAP_POS` or is
  a closed door. JS only treated stone as blocking.
- **Change:** use the C terrain predicate/order.
- **Verification:** dart landing and RNG advanced to the current pet-movement
  divergence; green sessions held.
- **Lesson:** the coordinate is evidence, not the implementation rule.

## D-0006 — pet selection after dart APPORT

- **Status:** parked. Do not spend another loop iteration on it until the C
  state/candidate-set falsifier below is executable.
- **Observed:** `seed1800-tourist-eat-throw`, first RNG divergence at index
  2417. C calls `rn2(1)` in `dog_move`; JS calls `dogfood`/`obj_resists` on the
  dart first.
- **C locus:** `dogmove.c:dog_goal`, `dog_move`, and `mon.c:mfndpos`.
- **Established state:** JS pet `(48,17)`, hero `(48,18)`, APPORT goal dart
  `(47,18)`, squared `udist=1`, `mconf=0`, `mflee=0`, pet `apport=3`.
- **Rejected hypotheses:**
  - reject the dart in `can_carry`: contradicted by an earlier C APPORT success;
  - gate behavior on raw RNG index/coordinates: advanced the trace but broke
    seed0900 and violates the Constitution;
  - treat `LOST_THROWN` as a general carry rejection: not present in C.
- **Useful experiment (not shipped):** forcing `appr=0`, omitting candidate
  `(47,16)`, and ending selection after dart `dogfood` reached RNG 2435. This
  narrows the state/candidate-set question but is not a fix.
- **Next falsifier:** build/verify the recorder, add local-only instrumentation
  (never a production JS oracle) for C pet position, `gg`, `appr`, and exact
  `mfndpos` candidates/flags at this turn, then compare branch-by-branch before
  changing selection. No verified recorder binary/instrumentation command is
  currently available, so `rng-diff` alone is insufficient.
- **Required gate:** seed8000 + seed0900 remain fully green.

## D-0007 — role/race `mnum` identity (array index vs PM_*)

- **Status:** fixed (verified 2026-07-12).
- **Observed:** 33/44 public sessions threw `u_init_role: role not ported`.
  Even Tourist matched only via `mnum === 10` (roles[] index) or name fallback.
- **C locus:** `role.c` `roles[].mnum` / `races[].mnum`; `u_init.c`
  `Role_switch` / `Race_switch` (`PM_ROGUE`, `PM_TOURIST`, `PM_HUMAN`, …).
- **Cause/evidence:** JS stored roles[] indexes (`Rogue=8`, `Tourist=10`,
  `human=0`) where C stores monster-table IDs (`338`, `340`, `260`).
- **Change:** `js/roles.js` uses generated `PM_*` constants; Rogue attrs/gods/
  `petnum`; `u_init.js` ports Rogue `trobj` + blindfold/`knows_object(SACK)` /
  dagger `knows_class` stand-in + wield/wear for short sword / leather armor.
- **Omissions named in C-JS-MAP:** `Skill_R`; full `knows_class` needs
  `oc_skill` in objects extractor; other roles still throw.
- **Verification:** green exact-length PASS; Rogue cohort no longer throws
  `role not ported` (seed1500 RNG 1173/2768; seed0013 519/4838). Role throws
  on full suite now **29/44**.
- **Lesson:** identity fields that drive `switch (Role_switch)` must come from
  the monster table, not the roles[] enumeration order.

## D-0008 — Tourist welcome/HP/align hardcodes vs Rogue first screen

- **Status:** fixed (verified 2026-07-12).
- **Observed:** after Rogue `u_init_role` existed, `allmain.js` still emitted
  `Aloha … neutral …` and forced `HP:10` / `ualign.type=0`. Rogue sessions
  expect `Hello … chaotic … Rogue` and `HP:12(12)`.
- **C locus:** `role.c:Hello`; `allmain.c:welcome`; `attrib.c:newhp` +
  `exper.c:newpw` at `u.ulevel==0`; `u_init.c` align from
  `aligns[flags.initalign]`; `insight.c` pantheon/`wallet` lines.
- **Cause/evidence:** Tourist-shaped literals ignored role `hpadv` (Rogue
  infix 10 + human 2 = 12) and rc `align:chaotic`.
- **Change:** `Hello(mnum)`, role/race `hpadv`/`enadv`, `newhp`/`newpw`, rc
  align → `ualign`, `welcome()`, invent pantheon + empty wallet.
- **Verification:** green PASS + strict lengths; Rogue step0/1 show
  `Hello … Rogue` and `HP:12` (remaining cell diffs = attrs/map after mklev
  RNG diverge).
- **Lesson:** shared startup display must read role/race/rc tables, not the
  first green seed’s literals.

## D-0009 — Rogue legacy pantheon/layout, botl flags, moon/friday

- **Status:** fixed (verified 2026-07-12).
- **Observed:** Rogue legacy `Book of Mog` vs C `Kos`; status always
  `Xp:N/0 T:T` vs C `Xp:N` when `!showexp`/`!time`; welcome `--More--`
  skipped before tutorial; seed0013 missing full-moon / Friday-13 plines.
- **C locus:** `quest.lua` `%d`/`%G` + `questpgr.c:convert_arg`;
  `pray.c:align_gname`/`align_gtitle`; `wintty.c` NHW_MENU `offx`;
  `botl.c` plname capitalize + `flags.showexp`/`flags.time`;
  `calendar.c:phase_of_the_moon`/`friday_13th`; `allmain.c:moveloop_preamble`.
- **Change:** `js/questpgr.js` alignment deity + offx layout; Tourist
  `ngod='_The Lady'`; `status_line_2` gates Xp/T; `flush_topl_more` before
  tutorial menu paint; `js/calendar.js` + preamble moon/friday + `change_luck`.
- **Verification:** green PASS + strict; seed1500 legacy/welcome text+cursor
  match (attrs still diverge); seed0013 moon/friday message lines match.
- **Next peel:** cleared by D-0010; then `start_corpse_timeout` (idx 1194).
- **Lesson:** shared startup UI must follow C convert_arg / tty menu geometry
  and datetime calendar, not Tourist-shaped constants.

## D-0010 — makemon skipped `m_initweap` (ordinary armed envelope)

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 first RNG break idx **1112**: C `rn2(4)` @
  `m_initweap` (S_KOBOLD darts) vs JS `rn2(50)` @ `m_initinv_tail` only.
- **C locus:** `mondata.h:is_armed` / `attacktype(AT_WEAP)`;
  `makemon.c:m_initweap` / `m_initthrow` / `mongets`; call from `makemon`
  when `allow_minvent`.
- **Cause/evidence:** JS never called `m_initweap`; kobold shaman lacks
  AT_WEAP so mlet-only `is_armed` would be wrong — extractor now emits
  `has_at_weaps`.
- **Change:** `scripts/extract-monsters.py` + `has_at_weaps`; `is_armed` in
  `monsters.js`; `m_initthrow`/`mongets`/`m_initweap` ordinary envelope in
  `makemon.js` (S_KOBOLD/S_ORC/S_OGRE/S_GIANT/S_CENTAUR/S_WRAITH/S_ZOMBIE/
  S_HUMANOID + default; trailing `rn2(75)` offensive gate).
- **Verification:** green PASS + strict; seed1500 first mismatch moves to
  idx **1194** `start_corpse_timeout`; runner 1275/2768; seed0060 2464/3626;
  full suite 2/44, RNG 25334/792838, screens 108/11405.
- **Omissions:** S_HUMAN/S_ANGEL/S_KOP/S_DEMON/S_TROLL/S_LIZARD specials;
  `m_initinv` body; `add_to_minv` merge; demon→default FALLTHROUGH;
  `rnd_offensive_item` hard-helmet FALLTHROUGH.
- **Lesson:** gate invent on real AT_WEAP, not mlet; port throw/mongets
  before invent-tail RNG.

## D-0011 — `mkcorpstat` skipped timeout restart after special random corpse

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 first RNG break idx **1194**: C `rn2(1000)` @
  `start_corpse_timeout` vs JS `rn2(8)` (already into next room fill). DIAG:
  random `mksobj` CORPSE picked `PM_LICHEN` → first timeout no-ops; C
  `mkcorpstat` override to trap victim restarts because
  `special_corpse(old)`; JS overrode corpsenm without restart.
- **C locus:** `mkobj.c:start_corpse_timeout`, `special_corpse`,
  `mkcorpstat` ptr-override restart; `mklev.c:mktrap_victim`.
- **Change:** full `start_corpse_timeout` RNG envelope (lizard/lichen,
  `rnz(rot_adjust)`, rider/troll branches); `special_corpse` +
  `mkcorpstat` restart; `age` on `mksobj`; trap-victim `TAINT_AGE` age
  adjust. Timer fire / `zombie_form` still deferred.
- **Verification:** green PASS + strict; seed1500 first mismatch → idx
  **2223** (`m_initinv` vs `m_initinv_tail`); runner 2255/2768, screen 1/40;
  seed0060 2464/3626; full suite 2/44, RNG 26314/792838, screens 109/11405.
- **Lesson:** lichen/lizard/troll/rider random corpses force a second
  `start_corpse_timeout` after `mkcorpstat` override — skipping the restart
  drops the entire `rnz` leaf.

## D-0012 — `is_poisonable` wrongly included daggers

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 first RNG break idx **2223**: C `rn2(10)` @
  `trquan` (Rogue dagger `ini_inv_adjust_obj`) vs JS `rn2(100)` still inside
  dagger `mksobj_init`. Prior notes misread provenance as `m_initinv`.
- **C locus:** `obj.h:is_poisonable` (missile `oc_skill` in
  `-P_SHURIKEN..-P_BOW`, or `permapoisoned`); `mkobj.c:mksobj_init`
  `is_poisonable && !rn2(100)`.
- **Cause/evidence:** DIAG stack at 2223 was `mksobj_init` poison roll.
  JS listed `DAGGER`/`SPEAR` as poisonable; C does not. Short sword already
  skipped the roll (not in the bad list), so invent matched until dagger.
- **Change:** `js/mkobj.js` `is_poisonable` ≡ `is_multigen` (name-list stand-in
  for the missile skill window); `permapoisoned` (Grimtooth) deferred.
- **Verification:** prefix moved to idx **2240** (sack); after D-0013 →
  **2298**. Green PASS + strict; cohort seed1500 2348/2768, seed0060
  2478/3626; full suite 2/44, RNG 26409/792838, screens 109/11405.
- **Lesson:** trust C macros over “weapons that can be poisoned in play”;
  `trquan` provenance mid-mklev timeline is invent after `makedog`, not
  monster invent.

## D-0013 — starting SACK omitted `mkbox_cnts`

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 idx **2240** after D-0012: C `rn2(1)` @ `trquan`
  (sack adjust) vs JS already at blindfold `rn2(5)`. C had an extra
  `mkbox_cnts` `rn2(1)` with `n=0` for empty starting sack.
- **C locus:** `mkobj.c:mksobj_init` TOOL_CLASS FALLTHROUGH `SACK` →
  `mkbox_cnts`; `mkbox_cnts` empty-sack when `moves<=1 && !in_mklev` still
  does `rn2(n+1)`.
- **Change:** call `mkbox_cnts` for `SACK`/`OILSKIN_SACK`/`BAG_OF_HOLDING`/
  `ICE_BOX`; port empty-starting-sack `n=0` branch.
- **Verification:** with D-0012; seed1500 first mismatch → idx **2298**
  (`dog_goal`); green + strict PASS; full suite as in D-0012.
- **Lesson:** empty containers can still consume RNG; TOOL_CLASS fallthrough
  into `mkbox_cnts` is not chest-only.

## D-0014 — mineralize always placed gold/gems on `fobj`

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 idx **2298**: C `rn2(8)` @ `dog_goal` vs JS
  `rn2(100)` (extra `obj_resists`). DIAG: first in-bbox floor object was
  gold on STONE behind a wall — `can_reach_location` false — so JS skipped
  APPORT and rolled `dogfood` on the next object.
- **C locus:** `mklev.c:mineralize` — `!rn2(3) ? add_to_buried : place_object`;
  `mkobj.c:add_to_buried` threads `buriedobjlist`, not `fobj`.
- **Cause:** JS consumed `rn2(3)` but always `place_object`, so buried mineral
  gold stayed on `fobj` and polluted `dog_goal` scans.
- **Change:** `js/mkobj.js` `add_to_buried`; `js/mklev.js` mineralize gold/gem
  branch matches C bury-vs-place; set `ox`/`oy`/`owt` before bury/place.
- **Verification:** idx **2298** `rn2(8)` matches; next break **2300**. Green
  PASS + strict; cohort seed1500 2343/2768, seed0060 2494/3626; full suite
  2/44, RNG 26445/792838, screens 109/11405.
- **Lesson:** RNG-consuming stubs that ignore the branch still change later
  observable state (`fobj` membership), not just the log.

## D-0015 — tainted CORPSE must be POISON in `dogfood`

- **Status:** fixed (verified 2026-07-12).
- **Observed:** after D-0014, JS set `gtyp=CADAVER` over APPORT for room
  corpse (`corpsenm=PM_ORC`, `age=-50` from mklev `age -= TAINT_AGE+1`), then
  entered follow-player `rn2(4)` while C kept APPORT and continued scanning.
- **C locus:** `dog.c:dogfood` — `peek_at_iced_corpse_age(obj)+50 <= moves`
  → POISON (before CADAVER return).
- **Change:** `js/dogmove.js` CORPSE case age check; also port
  `cursed_object_at` into `dog_goal` (was omitted).
- **Verification:** JS no longer takes follow `rn2(4)` here; mismatch is C
  `rn2(100)` vs JS `rn2(5)` @ idx **2300** (3 missing `obj_resists`). Green
  + strict PASS; suite as D-0014.
- **Lesson:** mklev-tainted corpses are intentionally inedible; treating them
  as CADAVER lets food goals clobber APPORT and desync the follow branch.
- **Named omission:** full `poisonous`/`acidic`/`carnivorous` via `mflags1`
  still deferred (age path covers this corpse).

## D-0016 — `mktrap_victim` created loot but never placed it

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 idx **2300**: C three extra `obj_resists` before
  `distfleeck`; JS `fobj` bbox had only APPORT gold + tainted CORPSE.
- **C locus:** `mklev.c:mktrap_victim` — `place_object` for trap ammo
  (ARROW/DART/ROCK) and each cursed possession; gnome candle likewise;
  PIT (ex-landmine) uses `breaktest` then dealloc instead of place.
- **Cause:** JS `mksobj`/`mkobj`+`curse` consumed creation RNG but left
  objects off `fobj`, so `dog_goal` never `dogfood`’d them. seed1500 trap
  was DART_TRAP with two possessions (food+gem) → exactly 3 missing scans.
- **Change:** `js/mklev.js` `mktrap_victim` places ammo/possessions/candle;
  local `mktrap_breaktest` for PIT debris (RNG-consuming like C `breaktest`).
- **Verification:** first mismatch **2300→2517** (`dog_move` cursed-square
  `rn2(39)`); runner seed1500 2518/2768, seed0060 2494/3626; green PASS +
  strict; full suite 2/44, RNG 26624/792838, screens 109/11405.
- **Lesson:** levelgen helpers that “create for flavor” without C’s
  `place_object`/`add_to_buried` desync later pet scans even when creation
  RNG already matched.
- **Named omission:** `mkgrave_room` still skips `add_to_buried` for its
  gold/loot; `begin_burn` for unlit gnome candles deferred.

## D-0017 — `dog_move` cursed-square `uncursedcnt` / `cursemsg`

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 idx **2517**: C `rn2(39)` @ `dogmove.c:1238`
  (`rn2(13*uncursedcnt)` with `uncursedcnt==3`); JS `rn2(1)` (approach
  `!rn2(++chcnt)` — never took the cursed continue).
- **C locus:** `dogmove.c:dog_move` — pre-loop `uncursedcnt` skips
  blocked `MON_AT` and `cursed_object_at`; candidate loop sets
  `cursemsg[i]` on cursed pile objects; then
  `cursemsg[i] && !mleashed && uncursedcnt>0 && rn2(13*uncursedcnt)` continue.
- **Cause:** JS counted every `mfndpos` slot as uncursed and skipped cursed
  food objects without setting `cursemsg`, so the cursed-square RNG never ran.
- **Change:** `js/dogmove.js` `dog_move` ports the count loop, `cursemsg`,
  and cursed continue (food-eat still collapses to immediate move).
- **Verification:** first mismatch **2517→2522** (`next_ident` + WEAPON
  `mksobj_init`); runner seed1500 2526/2768, seed0060 2494/3626; green PASS
  + strict; full suite 2/44, RNG 26664/792838, screens 109/11405.
- **Lesson:** pets’ “avoid cursed unless forced” is two-phase (count then
  probabilistic skip); inventing approach RNG without that skip desyncs
  quietly even when `dog_goal` APPORT already matches.
- **Named omission:** food `goto newdogpos` / eat side effects still partial;
  leash / trap / displace / minion branches deferred.

## D-0018 — pet `postmov` dart trap + `m_cansee` clear_path

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 idx **2522**: C `rnd(2)` @ `next_ident` then WEAPON
  `mksobj_init` (`rn2(6)`/`rn2(11)`/`rne(3)`) + erosions +
  `trapeffect_dart_trap`/`thitm`; JS `rnd(5)` from `score_targ`.
- **C locus:** `monmove.c:m_move` → `postmov` → `mintrap`;
  `trap.c:trapeffect_dart_trap` → `t_missile(DART)`; `vision.h:m_cansee` ≡
  `clear_path`. Provenance after approach selection: dart create, not
  `mongets`.
- **Cause:** (1) JS `m_move` returned `dog_move` without `postmov`/`mintrap`.
  (2) `find_targ` stubbed `m_cansee` always-true, so `pet_ranged_attk` scored
  a newt through walls (`rnd(5)`) before the step.
- **Change:** `js/trap.js` dart monster path (`t_at`/`t_missile`/`thitm`/
  `mintrap`); `js/monmove.js` `postmov` after pet `dog_move`;
  `js/vision.js` export `clear_path`/`m_cansee`; `js/dogmove.js` use
  `m_cansee` in `find_targ`/`find_friends`, return `MMOVE_MOVED` when
  stay-put (C).
- **Verification:** first mismatch **2522→2563** (`dog_invent` `rn2(udist)`
  4 vs 10); runner seed1500 2598/2768, seed0060 2494/3626; green PASS +
  strict; full suite 2/44, RNG 26687/792838, screens 109/11405.
- **Lesson:** post-move weapon RNG is often trap ammo (`t_missile`), not
  monster invent; LOS stubs that always see through walls inject
  `score_targ` fuzz RNG before the real caller.
- **Named omission:** non-dart `trapeffect_*`; `thitm` hit/`dmgval`/
  `monkilled`; `stackobj` merge; `dog_invent` real pickup (`mpickobj`).

## D-0019 — cursemsg/--More-- keys + dog_invent pickup + seen-trap skip

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 idx **2563**: C `rn2(4)` @ `dog_invent` vs JS
  `rn2(10)` (udist 4 vs 10). Pet stayed put after dart; hero should be
  ortho dx=2 after `k`, but JS hero had walked during pending `--More--`.
- **C locus:** `dogmove.c:dog_move` cursemsg `pline` (reluctantly onto);
  `trap.c:thitm` miss `pline` (almost hit); `dog_invent` `mpickobj` +
  droppables/`rn2(udist+1)`; `mfndpos` `ALLOW_TRAPS` + `seetrap`/`tseen`
  `rn2(40)` skip.
- **Cause:** (1) Missing cursemsg + thitm plines → no `--More--`, so keys
  `l,l,j,j,h,h,.` moved the hero instead of being eaten (udist diverged).
  (2) `dog_invent` only stubbed pickup RNG → no minvent → wrong APPORT
  `rn2(8)` / drop path. (3) No `tseen`/`ALLOW_TRAPS` candidate skip.
- **Change:** cursemsg + thitm miss plines; `obj_extract_self`/`mpickobj`;
  `droppables` + drop RNG; dog_goal lit/`m_cansee` APPORT gates; `seetrap`;
  mfndpos `ALLOW_TRAPS`; dog_move `rn2(40)` skip; CORPSE `doname` corpsenm.
- **Verification:** first mismatch **2563→2618** (wild `m_move` track
  `rn2(20)` vs `rn2(24)`); runner seed1500 **2700/2768**, seed0060
  2493/3626; green PASS + strict; full suite 2/44, RNG **26858**/792838,
  screens 109/11405.
- **Lesson:** message `--More--` is position-critical; invent stubs that
  skip `mpickobj` still break later `dog_has_minvent` gating.
- **Named omission:** `relobj` body; `splitobj`; `couldsee` for
  `in_masters_sight`; full `droppables` tool-keeping; `m_harmless_trap`;
  non-pet `mon_knows_traps` skip in mfndpos.

## D-0020 — mon_allowflags OPENDOOR for nohands/verysmall

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 idx **2618**: C `rn2(20)` @ `m_move` track vs JS
  `rn2(24)`. DIAG at mismatch: newt at (70,7) with `cnt=6` including closed
  door (70,8) `D_CLOSED`; C `cnt=5`.
- **C locus:** `mon.c:mon_allowflags` `can_open =
  !(nohands(data)||verysmall(data))`; `mfndpos` skips closed doors without
  `OPENDOOR`.
- **Cause:** JS always `| OPENDOOR`. Newts are verysmall+nohands → must not
  open doors → closed-door neighbors must be omitted from `mfndpos`.
- **Change:** extract `mflags1` (`scripts/extract-monsters.py`);
  `nohands()`; `mon_allowflags` gates `OPENDOOR` on `can_open`.
- **Verification:** first mismatch **2618→2702** (JS log ends after
  wipe_engr; C continues `distfleeck`); runner seed1500 **2702/2768**,
  seed0060 2489/3626; green PASS + strict; full suite 2/44, RNG
  **26889**/792838, screens 109/11405.
- **Lesson:** `mfndpos` cnt is allowflags-sensitive; never grant OPENDOOR
  to all species.
- **Named omission:** full `mon_allowflags` (unlock/bust/dig/bars); 
  `mon_knows_traps` skip; `m_harmless_trap`; `bad_rock` diagonal squeeze.

## D-0021 — missing `doapply` / lock-pick turn (deferred movemon)

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 first mismatch at idx **2702**: C `distfleeck` after
  wipe_engr; JS RNG log ended. Hypothesis that JS exited early for
  `umovement`/`encumbrance` was **falsified** (DIAG: `cap=0`, `umove_after=12`).
- **Cause:** JS treated `a`/`e`/`l` as unknown / eat / move. C sequence is
  `doapply` → getobj lock pick (`e`) → `pick_lock` direction (`l`) →
  "You see no door there." → `PICKLOCK_LEARNED_SOMETHING` → `ECMD_TIME` →
  following `movemon`. Without that turn, JS deferred the post-`l` monster
  slice until later `s` keys, then stopped one search-turn short of C.
- **C locus:** `apply.c:doapply` (`LOCK_PICK` case); `lock.c:pick_lock`
  non-door branch; `cmd.c:get_adjacent_loc` / `getdir`.
- **Change:** `js/apply.js` + `js/lock.js`; wire `a` in `cmd.js`.
- **Verification:** `rng-diff` seed1500 **RNG OK (2768)**; runner
  2768/2768 RNG, screens 1/40; seed0060 still 2489/3626; green PASS +
  strict; full suite 2/44, RNG **26980**/792838, screens 109/11405.
  seed1800 also RNG OK (2458) in this measure (display still 0/26).
- **Lesson:** free-looking keys can be getobj/getdir replies; attribute
  menus and apply prompts own nhgetch keys. Do not diagnose post-EOT
  `umovement` until key ownership matches C.
- **Named omission:** `feel_location` / `update_mapseen_for` glyph gating
  (no-door always LEARNED/TIME); container-at-feet pick; real door
  lock occupation; non-pick apply tools (sack, etc.).

## D-0022 — `newsym` omitted floor objects; SDOOR drew as `?`

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 screens **1/40** with RNG complete. First fail at
  welcome `--More--` (screen idx 1): C showed `%`/`$` on the starting room
  floor and a continuous bottom wall; JS showed floor dots and `└?─…`.
- **Cause:** JS `newsym` painted hero/monster/terrain only — never
  `vobj_at` / `map_object`. Separately, `terrain_glyph` lacked `SDOOR`/
  `SCORR`, so secret doors fell through to default `?`. CORPSE map color
  must use `mon_color(corpsenm)` (orc → CLR_RED), not
  `objects[CORPSE].oc_color` (brown).
- **C locus:** `display.c:newsym` / `_map_location` / `map_object` /
  `back_to_glyph` (SDOOR→wall); `display.h:vobj_at`/`covers_objects`;
  glyph color `mon_color` for `GLYPH_BODY_*`.
- **Change:** `js/display.js` object layer + SDOOR/SCORR; extractor
  `mcolors` + `js/monsters.js` export for corpse colors.
- **Verification:** seed1500 **34/40** screens (RNG 2768); seed1800
  screens **0→10**/26; green PASS + strict; full suite 2/44, RNG
  26980/792838, screens **156**/11405.
- **Lesson:** screen coords use `setCell(x-1, y+1)`; diagnose map glyph
  misses before UI. Object creation RNG matching does not imply objects
  are drawn.
- **Named omission:** trap glyphs in `newsym`; full `wall_angle` for
  SDOOR junctions; pile-top glyph flags; hallucination/`newsym_rn2`.

## D-0023 — tutorial menu was title-centered, not C NHW_MENU offx

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 screens **34/40** after D-0022. First fails at
  idx 2–3: C title at col 21 with full y/n/OPTIONS/(end) menu and cursor
  `[27,6]`; JS centered only the title (`pad=(80-23)/2` → col 28) and left
  leftover text after `n`.
- **Cause:** `ask_do_tutorial` never built a real corner `NHW_MENU`. C
  `tty_end_menu` sets `maxcol = max(strlen+2)` (OPTIONS footer → 59) and
  `offx = max(10, 80-maxcol-1)` → 20; `process_menu_window` paints a
  leading space at offx then text (title via `menu_headings` /
  `ATR_INVERSE` after `adjust_menu_promptstyle(WIN_INVEN)`).
- **C locus:** `options.c:ask_do_tutorial`; `wintty.c:tty_end_menu` /
  `tty_display_nhwindow(NHW_MENU)` / `process_menu_window`;
  `allmain.c`/`options.c` `menu_headings` default inverse.
- **Change:** `js/invent.js` `nhw_menu_geometry` + `paint_corner_nhw_menu`;
  `js/allmain.js:ask_do_tutorial` builds C line order and uses corner paint
  + `docrt` on dismiss.
- **Verification:** seed1500 Scr **36/40** (RNG 2768); seed1800 Scr
  **12/26**; green PASS + strict; full suite 2/44, RNG 26980/792838,
  screens **160**/11405.
- **Lesson:** menu geometry is driven by longest padded line, not title
  centering. Corner menus must not `clearScreen` the map.
- **Named omission:** invent `display_inventory` still fullscreen-clears /
  approximate `xprname`; discoveries class list; enlightenment plname /
  wielded-weapon body; fullscreen `NHW_MENU` path in the new helper.

## D-0024 — invent/doname/discoveries incomplete for Rogue screens

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1500 screens **36/40** after D-0023. Fails at invent `i`
  (idx 28), discoveries `\` (32), enlightenment `^X` (34–35).
- **Cause:** (1) `display_inventory` used `paint_overlay` `clearScreen` with
  approximate startCol instead of corner `NHW_MENU`; (2) `doname` missed
  empty-container prefix, wield/swapwep suffixes, `potion of X`, and
  implicit-uncursed skip for known charged weapons; (3) `dodiscovered`
  only walked scroll/potion/wand and always used `  ` prefix; missing
  `oc_encountered` and `interesting_to_discover` OBJ_DESCR gate;
  (4) enlightenment lacked plname capitalize and `weapon_insight` lines.
- **C locus:** `invent.c:display_inventory` / `wintty.c` corner menu;
  `objnam.c:doname`; `u_init.c:ini_inv_adjust_obj` cknown;
  `o_init.c:discover_object`/`dodiscovered`/`interesting_to_discover`;
  `insight.c:weapon_insight`.
- **Change:** corner invent via `paint_corner_nhw_menu`; doname prefixes /
  wield strings; container `cknown`; `discover_object(..., encountered)`;
  disco walks `DEF_INV_ORDER` with `*`/`  `; ^X capitalize + wield body.
- **Verification:** seed1500 **PASS** RNG 2768/2768 Scr **40/40** + strict;
  green PASS + strict; seed1800 Scr still **12/26** (RNG 2458); full suite
  **3/44**, RNG 26980/792838, screens **165**/11405.
- **Lesson:** corner invent must keep the map; disco `*` vs spaces is
  `oc_encountered`, and only OBJ_DESCR types are interesting.
- **Named omission:** fullscreen invent path; full `oc_charged`/`oc_skill`
  in objects extractor; full `weapon_descr`/skill table; disco Japanese /
  unique/artifact classes; many enlightenment sections.

## D-0025 — getobj throw/apply: gold suggest + missing-letter loop

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1800 RNG 2458/2458 but screens **12/26**. Diffs: throw
  prompt `[a or ?*]` vs C `[$a or ?*]`; post-throw stale `In what direction?`;
  apply bad letter returned immediately so later keys (`i`/`+`/`\`/`^X`) ran
  as top-level commands while C stayed in getobj/`--More--`.
- **Cause:** (1) `throw_ok` omitted `COIN_CLASS` (C `GETOBJ_SUGGEST`);
  (2) getobj helpers `return null` on missing invlet instead of C `continue`;
  (3) re-prompt never called `flush_topl_more`, so no `--More--`;
  (4) `getdir` left `_pending_message` for the next command-loop capture.
- **C locus:** `dothrow.c:throw_ok` / `dothrow`; `invent.c:getobj` missing
  letter → `You("don't have that object.")` + `continue`; `cmd.c:getdir`.
- **Change:** invent-order `$`+weapons in throw suggest; getobj_throw /
  getobj_apply loop + `flush_topl_more`; clear direction prompt after answer;
  same clear in `lock.js` getdir. `throw_gold` body still deferred.
- **Verification:** seed1800 Scr **24/26** (RNG 2458); green + seed1500 PASS
  + strict lengths; full suite **3/44**, RNG **27161**/792838, screens
  **177**/11405.
- **Lesson:** getobj must loop on missing letters; screen matches are not a
  contiguous prefix (legacy map can fail idx 0 while later frames match).
- **Named omission:** `throw_gold` body; getobj `?`/`*` menus; eat getobj
  still single-shot. (look `:` / legacy map cleared by D-0026.)

## D-0026 — legacy corner map + look staircase feature

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed1800 RNG 2458/2458, screens **24/26**. Idx 0: Book text
  matched but room rows blank (no DEC map under menu). Idx 25: `:` gave
  `You see no objects here.` vs C `There is a staircase up out of the
  dungeon here.--More--`.
- **Cause:** (1) `com_pager_legacy` always `clearScreen()`, wiping the map
  that `docrt` had painted; C corner NHW_MENU (`offx>10`) uses
  `process_text_window` which only `cl_end`s from `offx` and leaves lower
  map rows. (2) `dolook` stubbed; C `look_here` → `dfeature_at` →
  `stairs_description` for known Dlvl1 branch stairs with `u_traversed`
  (set in `mklev` after `place_branch`).
- **C locus:** `wintty.c:process_text_window` / `tty_display_nhwindow`
  NHW_MENU; `questpgr.c:deliver_by_window`; `invent.c:dfeature_at` /
  `look_here` / `dolook`; `stairs.c:stairs_description` /
  `known_branch_stairs`; `mklev.c` Dlvl1 `u_traversed`.
- **Change:** corner legacy paints from `offx` without clearing the map;
  `stairway_at` + `stairs_description` + Dlvl1 `u_traversed`; `dfeature_at`
  + `look_here` feature pline (no “no objects” when dfeature present);
  export `an`/`vtense`.
- **Verification:** seed1800 **PASS** 2458/2458 Scr **26/26** + strict;
  green + seed1500 PASS + strict; full suite **4/44**, RNG **27161**/792838,
  screens **179**/11405.
- **Lesson:** corner menus must not fullscreen-clear; look messages come
  from dungeon features before the no-objects fallback.
- **Named omission:** Blind feel path; engraving; multi-object look menu;
  `doname_with_price`; full altar/lava/ice/pool dfeature; Elemental Planes
  amulet destination strings beyond no-amulet Dlvl1 case.

## D-0027 — orc `u_init_race` Xtra_food + `inv_subs`

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed0060 first mismatch @ **2341**: C `rn2(1)` @
  `trquan(u_init.c)` after Rogue `!rn2(5)` blindfold check; JS
  `rn2(100)` from `init_attr` (skipped race kit).
- **Cause:** `u_init_race` was human-only no-op. Orc non-wizard path must
  `ini_inv(Xtra_food)` (2× `FOOD_CLASS` `UNDEF_TYP`) before attrs. Race
  substitutions (`inv_subs`) were also absent — `ini_inv_obj_substitution`
  after `mksobj` (Rogue short sword/dagger → orcish; food CRAM/LEMBAS →
  tripe). Weapon `mksobj_init` RNG matched without subs because substitution
  is post-`mksobj` in C.
- **C locus:** `u_init.c:u_init_race` (`PM_ORC`); `Xtra_food[]`;
  `inv_subs[]`; `ini_inv_obj_substitution`; `ini_inv`.
- **Change:** port orc/elf/dwarf/gnome `u_init_race` switch (elf instrument
  `ROLL_FROM`); `Xtra_food`; full `inv_subs` + call from `ini_inv`.
- **Verification:** rng-diff first mismatch **2341 → 2476**; seed0060 runner
  **2489 → 2584**/3626; green + seed1500 + seed1800 PASS + strict; full
  suite **4/44**, RNG **27256**/792838, screens **179**/11405.
- **Lesson:** race kits run after role `ini_inv`; missing `trquan` before
  attrs is the fingerprint. Post-`mksobj` otyp swap does not change creation
  RNG.
- **Named omission:** `ini_inv_mkobj_filter` full reject list (incl. orc
  `RIN_POISON_RESISTANCE`); other roles still throw. (splitobj → D-0028)

## D-0028 — `dog_invent` partial-stack `splitobj` / `next_ident`

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed0060 first mismatch @ **2476**: C `rnd(2)` @
  `next_ident(mkobj.c)` after `dog_invent` APPORT rolls; JS `rn2(4)` (took
  whole stack, skipped split).
- **Cause:** nohands pets `can_carry` returns `1` when `quan > 1`. C then
  `splitobj(obj, carryamt)` → `nextoid` → `next_ident` (`rnd(2)`). JS
  stubbed the partial split and picked up the entire floor stack.
- **C locus:** `dogmove.c:dog_invent`; `mkobj.c:splitobj` / `nextoid` /
  `next_ident`.
- **Change:** export real `splitobj` from `js/mkobj.js` (quan/owt, floor
  `nobj`/`nexthere` insert, `next_ident` for child oid); wire
  `dog_invent`; reuse from `dothrow.js` (remove local copy).
- **Verification:** rng-diff first mismatch **2476 → 2643**; seed0060
  runner **2584 → 2761**/3626; green + seed1500 + seed1800 PASS + strict;
  full suite **4/44**, RNG **27433**/792838, screens **179**/11405.
- **Lesson:** partial-stack pickup is an object-identity/RNG event, not
  just inventory bookkeeping.
- **Named omission:** `nextoid` shop-price oid search; unpaid/`splitbill`;
  timers/light/`copy_oextra`; `relobj` body (→ D-0029).

## D-0029 — `dog_invent` pet `relobj` / `mdrop_obj`

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed0060 first mismatch @ **2643**: C `rn2(8)` @
  `dog_goal` APPORT vs JS `rn2(100)` `obj_resists`. Drop RNG at 2640–2641
  matched, but JS never emptied minvent.
- **Cause:** `dog_invent` updated apport/droptime without calling `relobj`.
  `dog_has_minvent` stayed true → APPORT branch skipped. Also
  `add_to_minv` used string `'MINVENT'` and `obj_extract_self` only unlinked
  floor piles.
- **C locus:** `steal.c:relobj` / `mdrop_obj`; `mkobj.c:obj_extract_self`
  (`OBJ_MINVENT`); `dogmove.c:dog_invent`.
- **Change:** `obj_extract_self` minvent unlink + `OBJ_MINVENT` in
  `add_to_minv`; pet-path `mdrop_obj`/`relobj` in `js/dogmove.js` (place on
  floor, optional verbose drop pline); wire from `dog_invent`.
- **Verification:** rng-diff first mismatch **2643 → 2663**; seed0060
  runner **2761 → 2771**/3626; green + seed1500 + seed1800 PASS + strict;
  full suite **4/44**, RNG **27445**/792838, screens **179**/11405.
- **Lesson:** drop tracking without releasing minvent falsifies every later
  `!dog_has_minvent` gate.
- **Named omission:** `flooreffects` / `stackobj` merge; vault-guard gold;
  worn/saddle/shop/`update_mon_extrinsics` in `mdrop_obj`; `couldsee` for
  `in_masters_sight` → D-0030.

## D-0030 — `dog_goal` `in_masters_sight` via real `couldsee`

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed0060 first mismatch @ **2663**: C `rn2(100)`
  `obj_resists` (continued floor scan) vs JS `rn2(8)` APPORT. DIAG at pet
  `(12,12)` / hero `(15,13)`: `couldsee(pet)=false`, lit gate OK, no
  minvent, `m_cansee` OK — stub `in_masters_sight=true` forced the roll.
- **Cause:** `dog_goal` hardcoded `in_masters_sight = true` instead of C
  `couldsee(omx, omy)` (`viz_array & COULD_SEE`). When false, C skips the
  APPORT branch before `rn2(8)` and keeps scanning `fobj`.
- **C locus:** `dogmove.c:dog_goal`; `vision.h:couldsee`.
- **Change:** `js/dogmove.js` imports `couldsee` and sets
  `in_masters_sight = couldsee(omx, omy)`.
- **Verification:** rng-diff first mismatch **2663 → 2979**; seed0060
  runner **2771 → 3039**/3626; green + seed1500 + seed1800 PASS + strict;
  full suite **4/44**, RNG **27859**/792838, screens **179**/11405.
- **Lesson:** vision stubs that always-true gate RNG-consuming APPORT
  short-circuits; real `couldsee` already existed in `vision.js`.
- **Named omission:** `dog_goal` gettrack/FARAWAY when goal is hero and
  `!in_masters_sight`; next peel @ 2979 is C `exercise` `-rn2(2)` vs JS
  `distfleeck`.

## D-0031 — dokick empty-space `kick_dumb` / `exercise`

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed0060 first mismatch @ **2979**: C `rn2(2)`
  `exercise(attrib.c:509)` vs JS `rn2(5)` `distfleeck`. Keys: Ctrl-D
  then `j`; C screen "You kick at empty space." Prefix matched through
  `gethungry` / wipe-engr `rn2(94)`.
- **Cause:** JS had no `#kick` (`dokick`); Ctrl-D was "Unknown command"
  and `j` was ordinary movement, so the turn never called
  `exercise(A_DEX, FALSE)` from `kick_dumb`. Not `exerper` (that runs
  before wipe-engr in the prior EOT block).
- **C locus:** `dokick.c:dokick` / `kick_dumb`; `cmd.c` bind `C('d')`.
- **Change:** `js/dokick.js` — `dokick` + `kick_dumb` (DEX≥16 empty-space
  and low-DEX strain envelope) + open-door→dumb / wall→ouch routing;
  wire Ctrl-D in `js/cmd.js`; export `getdir` from `js/lock.js`.
- **Verification:** rng-diff first mismatch **2979 → 2997**; seed0060
  runner **3039 → 3064**/3626, cursors **18 → 41**/41; green + seed1500
  + seed1800 PASS + strict; full suite **4/44**, RNG **27765**/792838,
  screens **179**/11405.
- **Lesson:** attribute `exercise` after matching EOT often comes from
  the *next* command (kick/search/combat), not `exerper`; use the key
  map and topline before blaming `moves%10`.
- **Named omission:** `kick_monster`/`kick_object`/closed-door Whammm/
  SDOOR-SCORR open rolls/furniture; `martial()`; `wake_nearby`/
  `u_wipe_engr` effects; `losehp`/`set_wounded_legs` bodies; next peel
  @ 2997 diagnosed as missing kick-avoid (D-0032), not missing `distfleeck`.

## D-0032 — seed0060 dog_move cnt 4 vs 3 (missing kick-avoid)

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed0060 first mismatch @ **2997**: C `rn2(5)`
  `distfleeck` vs JS `rn2(4)`. Matched through kick `exercise` and
  dog_move `rn2(1/2/3)`.
- **Rejected:** post-kick fleeck/ALLOW_*/missing `distfleeck` body;
  mklev “extra CORR west of pet” / reading C `#` as wall — NetHack `#` is
  corridor; JS and C both have `CORR` at `(22,12)` (screen `#######f@`).
  Diagonal `bad_rock` squeeze does not drop any of the four open
  candidates for a kitten.
- **Cause/evidence:** C `dokick` sets `gk.kickedloc` to the kicked cell
  before resolution; `dog_move` / `m_move` call `m_avoid_kicked_loc` so
  peaceful/tame monsters skip that adjacent cell. Hero kicked south →
  `(24,13)`. JS never set or consulted `kickedloc`, so `mfndpos` kept
  four `appr=0` slots → extra `rn2(4)` before `distfleeck`.
- **C locus:** `dokick.c` (`kickedloc =`); `monmove.c:m_avoid_kicked_loc`;
  `dogmove.c` candidate loop; clear on `hack.c:domove` /
  `cmd.c` non-`dokick` timed commands.
- **Change:** `game.kickedloc` in `dokick`; `m_avoid_kicked_loc` (+ Sokoban
  stub) in `mon.js`; wire into `dog_move`; clear on successful `domove` and
  other timed non-kick commands in `cmd.js`.
- **Verification:** rng-diff first mismatch **2997 → 3016**; seed0060
  runner **3064 → 3086**/3626; green + seed1500 + seed1800 PASS + strict;
  full suite **4/44**, RNG **27787**/792838, screens **179**/11405.
- **Lesson:** after a kick, compare pet candidate skips to `kickedloc`
  before blaming terrain glyphs; `#` in tty is corridor, not wall.
- **Next:** peel @ **3105** (`maybe_generate_rnd_mon` → `makemon(NULL,0,0)`
  body; C `makemon_rnd_goodpos` vs JS stub falling through to `dosounds`).

## D-0033 — seed0060 missing donull (`.` wait)

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed0060 first mismatch @ **3016**: C `rn2(5)`
  `distfleeck` vs JS `rn2(2)`. Matched through kick-avoid turn end
  (3015 = moveloop `rn2(94)`).
- **Rejected:** post-kick pet cell west-vs-south / `mtrack` candidate-skip /
  fleeck arity as the 3016 cause — kick-turn dog_move RNG already matched
  C through 3015; JS’s next call was `exercise` arity 2 (second kick), not
  a wrong `distfleeck` arity.
- **Cause/evidence:** moves include `\u0004j..`; JS `rhack` had no `.`
  branch so wait was “Unknown command” with `context.move=0`. C `donull`
  returns `ECMD_TIME` → monster turns start with `distfleeck` `rn2(5)`.
  Skipping both `.` waits made the next kick’s `exercise` `rn2(2)` land at
  3016. Timed non-kick commands also clear `gk.kickedloc` (`cmd.c`).
- **C locus:** `do.c:donull`; `cmd.c` (`.` → wait; clear `kickedloc` when
  `ECMD_TIME && func != dokick`).
- **Change:** `js/do.js` `donull`; `js/cmd.js` `.` → timed wait + clear
  `kickedloc`. Omit `cmd_safety_prevention` (named in C-JS-MAP).
- **Verification:** rng-diff first mismatch **3016 → 3105**; seed0060
  runner **3086 → 3151**/3626; green + seed1500 + seed1800 PASS + strict;
  full suite **4/44**, RNG **27922**/792838, screens **179**/11405.
- **Lesson:** when C’s next call is `distfleeck` and JS shows a *different
  function’s* arity (here `exercise`/`rn2(2)`), check whether an intervening
  timed command key (`.` wait) was dropped as unknown.
- **Next:** peel @ **3105** — port `maybe_generate_rnd_mon`’s
  `makemon(NULL,0,0)` path (`makemon_rnd_goodpos` / `rndmonst`).

## D-0034 — seed0060 makemon(NULL,0,0) / makemon_rnd_goodpos

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed0060 first mismatch @ **3105**: C `rn2(77)`
  `makemon_rnd_goodpos` vs JS `rn2(300)` `dosounds`. Matched through
  `maybe_generate_rnd_mon` gate (3104 = `rn2(70)=0`).
- **Cause/evidence:** JS consumed the gate roll then stubbed the body.
  C calls `makemon(NULL,0,0)` → `makemon_rnd_goodpos` (`rn1(COLNO-3,2)` /
  `rn2(ROWNO)`, reject `cansee` when `!in_mklev`) → `rndmonst` → create →
  `G_SGROUP`/`m_initgrp` → invent. Also fixed wrong `MM_NOGRP=2` in
  `monsters.js` (C/`const.js` is `0x2000`) so group suppression matches.
- **C locus:** `allmain.c:maybe_generate_rnd_mon`; `makemon.c:makemon`,
  `makemon_rnd_goodpos`, `m_initgrp`; `teleport.c:enexto_gpflags`.
- **Change:** `js/makemon.js` placement-before-`rndmonst`,
  `makemon_rnd_goodpos`, `m_initgrp`/`G_SGROUP`/`G_LGROUP`, early `fmon`
  link; `js/teleport.js` `enexto_gpflags`; `js/allmain.js` real
  `makemon(null,0,0)`; `js/monsters.js` `G_SGROUP`/`G_LGROUP`, drop fake
  `MM_NOGRP`.
- **Verification:** rng-diff first mismatch **3105 → 3536**; seed0060
  runner **3151 → 3562**/3626; green + seed1500 + seed1800 PASS + strict;
  full suite **4/44**, RNG **28497**/792838, screens **179**/11405.
- **Lesson:** for `makemon(NULL,0,0)`, C picks coordinates *before*
  `rndmonst`; stubbing after the spawn gate is not RNG-equivalent.
- **Next:** peel @ **3536** — port `regen_hp` in the once-per-turn block
  before `dosounds`.

## D-0035 — seed0060 losehp + regen_hp (wall kick turn)

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed0060 first mismatch @ **3536**: C `rn2(100)`
  `regen_hp` vs JS `rn2(300)` `dosounds`. Step 28 is wall kick
  ("Ouch!  That hurts!") after empty-space kicks; RNG OK through 3535
  (`maybe_generate_rnd_mon` miss).
- **Cause/evidence:** Two coupled gaps. (1) JS `kick_ouch` burned
  `rnd(CON?3:5)` but never applied `losehp`, so `uhp` stayed at max and
  C's `regen_hp` gate never opened. (2) JS once-per-turn block skipped
  `regen_hp` entirely before `dosounds`. Post-ouch session screens can
  still show `HP:11(11)` when same-turn heal equals damage — not proof
  that `losehp` was absent in C.
- **C locus:** `dokick.c:kick_ouch` → `losehp(Maybe_Half_Phys(dmg),…)`;
  `hack.c:losehp`; `allmain.c:regen_hp` / once-per-turn call before
  `dosounds`.
- **Change:** new `js/hack.js` `losehp`/`maybe_half_phys`; `dokick.js`
  applies damage; `allmain.js` `regen_hp` + `interrupt_multi` + call
  site when `uhp < uhpmax` (or mh when Upolyd).
- **Verification:** rng-diff **RNG OK 3626**; seed0060 runner
  **3626**/3626 RNG, Scr **0**/41, cursors **41**/41; green + seed1500
  + seed1800 PASS + strict; full suite **4/44**, RNG **28511**/792838,
  screens **179**/11405.
- **Lesson:** a missing HP mutation can look like a missing EOT RNG call;
  check whether the regen *gate* (`uhp < uhpmax`) can ever be true.
- **Next:** seed0060 screen idx 0 cells (legacy/botl); cursors already match.

## D-0036 — seed0060 orc hpadv + mon_glyph mcolor (screens 0–4)

- **Status:** fixed (verified 2026-07-12).
- **Observed:** seed0060 RNG **3626**/3626, screens **0**/41 (cursors
  41/41). Idx 0 had three cell diffs: botl `HP:12(12)` vs C `HP:11(11)`,
  and newt `:` color green vs yellow.
- **Cause/evidence:** (1) `roles.js` orc (and elf/dwarf/gnome) lacked
  `hpadv`/`enadv`, so `setup_role_race_from_rc` fell back to human
  `{infix:2}` → Rogue+orc HP **12**; C `role.c` orc is `{1,0,0,1,0,0}` →
  HP **11**. (2) `mon_glyph` used mlet-only `S_LIZARD→CLR_GREEN`; C
  `mons[PM_NEWT].mcolor` is `CLR_YELLOW` (11).
- **C locus:** `role.c` `races[]` orc/elf/dwarf/gnome `hpadv`/`enadv`;
  `attrib.c:newhp`; `display.c` / `mon_color(monsndx)`.
- **Change:** ported race `hpadv`/`enadv` (+ attrmin/attrmax) in
  `js/roles.js`; `mon_glyph` uses `mcolors[mnum]` (pets `CLR_WHITE`).
- **Verification:** seed0060 Scr **5**/41 (idx 0–4 match), RNG still
  **3626**/3626; green + seed1500/1800 PASS + strict; full **4/44**,
  screens **184**/11405 (+5), RNG **28511**/792838.
- **Lesson:** race table stubs that silently inherit human `hpadv` corrupt
  botl on every frame; mlet-only monster colors fail as soon as two
  species share a letter.
- **Next:** seed0060 idx 5+ (invent letter / map wall / downstairs color).

## D-0037 — seed0060 gold doname + mondied newsym (screen 5)

- **Status:** fixed (verified 2026-07-13).
- **Observed:** seed0060 RNG **3626**/3626, screens **5**/41. Idx 5 had
  two cell diffs: topline `"1 gold piece"` vs `"a gold piece"`, and map
  newt cell still `:` (yellow) while C showed floor `·`.
- **Cause/evidence:** (1) `doname` short-circuited `COIN_CLASS` to
  `` `${quan} gold piece` ``; C `doname_base` uses quan==1 article `"a "`
  + xname `"gold piece"`. (2) `mondied` removed the monster from `fmon`
  and zeroed `mx`/`my` without `newsym`, leaving a stale live glyph; C
  `mondead`→`mon_leaving_level` refreshes the cell (newt
  `corpse_chance` was false → floor, not `%`).
- **C locus:** `objnam.c:doname_base`; `mon.c:mondied`/`mondead`/
  `mon_leaving_level`.
- **Change:** `js/objnam.js` coin path uses the shared quan/article
  prefix; `js/mhitm.js` `mondead` keeps coords and calls `newsym`.
  Incomplete `make_corpse` via `mkcorpstat` was tried and **reverted** —
  it cut aggregate RNG by ~900 without a faithful special-case body.
- **Verification:** seed0060 Scr **6**/41 (idx 0–5), RNG **3626**/3626;
  green + seed1500/1800 PASS + strict; full **4/44**, screens
  **185**/11405 (+1), RNG **28511**/792838.
- **Lesson:** idx-5 `"1"` vs `"a"` was gold English, not invent letters;
  death without `newsym` looks like a lingering live monster. Do not ship
  a partial `make_corpse` that invents `mksobj` RNG.
- **Next:** seed0060 idx 6+ (drop then re-pickup pline / premature wall).

## D-0038 — seed0060 cansee invent pline + wall_angle + downstairs color

- **Status:** fixed (verified 2026-07-13).
- **Observed:** seed0060 RNG **3626**/3626, screens **6**/41. Idx 6 had
  (1) topline extra "The kitten picks up a gold piece." after a drop,
  (2) premature wall `┌` at map (17,14) / screen (16,15), and later
  (3) downstairs `>` yellow vs C NO_COLOR.
- **Cause/evidence:** (1) C `mdrop_obj`/`dog_invent` gate drop/pickup
  plines on `cansee`; a second invent after an extra pet move picks up
  at (13,13) with `cansee=false` — C silent, JS always printed.
  (2) `set_wall_state` was a no-op and `terrain_glyph` mapped wall
  `typ` straight to DEC corners; C `back_to_glyph` uses
  `wall_angle(seenv)` — TLCORNER with `WM_C_OUTER` and seenv=SV0 alone
  yields `S_stone` (blank) until more octants are seen.
  (3) Public recordings paint upstairs `<` CLR_YELLOW and downstairs
  `>` NO_COLOR (not defsym gray for either).
- **C locus:** `steal.c:mdrop_obj`; `dogmove.c:dog_invent`;
  `display.c:set_wall_state`/`xy_set_wall_state`/`wall_angle`/
  `back_to_glyph`.
- **Change:** gate pet drop/pickup plines on `cansee`; port
  `set_wall_state` cluster in `mklev.js`; port `wall_angle` into
  `display.js` terrain glyphs; downstairs `>` uses `NO_COLOR`.
- **Verification:** seed0060 Scr **37**/41 (idx 22/33/35/36 remain),
  RNG **3626**/3626; green + seed1500/1800 PASS + strict; full
  **4/44**, screens **216**/11405 (+31), RNG **28511**/792838.
- **Lesson:** silent out-of-sight invent still mutates state; unfinished
  exterior corners must stay stone until seenv warrants a glyph; do not
  force downstairs to match upstairs yellow.
- **Next:** seed0060 idx 22 (pet `f` vs corridor `#`).

## D-0039 — seed0060 idx 22 pet via orc infravision

- **Status:** fixed (verified 2026-07-13).
- **Observed:** seed0060 RNG **3626**/3626, screens **37**/41. Sole map
  miss at idx 22: C white pet `f` at map (22,12) / term (21,13); JS
  corridor `#`. Pet position and RNG matched; glyph missing.
- **Cause/evidence:** hero at (24,12) in a dark corridor — `cansee(22,12)`
  false (only adjacent night-vision IN_SIGHT), but `couldsee` true.
  Orc race has `M3_INFRAVISION`; kitten has `M3_INFRAVISIBLE`. C
  `newsym` still `display_monster` when `!cansee` via
  `see_with_infrared && mon_visible`. JS `newsym` only drew monsters
  under `cansee`. Also `postmov` omitted C's final
  `newsym(mtmp->mx, mtmp->my)` after `mintrap`.
- **C locus:** `display.h:_see_with_infrared` / `_mon_visible`;
  `display.c:newsym` (!cansee branch); `monmove.c:postmov`;
  `monflag.h` M3_INFRA*; `polyself.c` race Infravision via
  `mons[urace.mnum]`.
- **Change:** extract `mflags3` (`scripts/extract-monsters.py`);
  `infravision`/`infravisible` in `monsters.js`; `newsym` infrared
  path + race Infravision in `display.js`; `postmov` newsym of new
  cell in `monmove.js`.
- **Verification:** seed0060 Scr **38**/41 (idx 22 cleared; 33/35/36
  disco/^X remain), RNG **3626**/3626; green + seed1500/1800 PASS +
  strict; full **4/44**, screens **217**/11405 (+1), RNG
  **28511**/792838.
- **Lesson:** dark-corridor pet glyphs for orcs are infrared, not FOV;
  do not treat `!cansee` as “draw terrain only” when sensing macros
  exist. Extract full M3 flags before inventing race hardcodes.
- **Next:** seed0060 idx 33 disco class layout (then ^X idx 35–36).
