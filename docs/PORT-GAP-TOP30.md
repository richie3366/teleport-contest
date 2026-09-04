# Top 30 port gaps by hidden-score risk

**What this is.** The 30 pinned-C functions most likely to cost points on
sessions we cannot see: functions an ordinary game reaches often, that
draw RNG or print, and whose `js/` port is missing or thin. The local
public suite is **42/44** until
`docs/2026-09-04-fortress-regression-42-44.md` Must-fix ships (then
44/44 again). Nothing here is a FAIL peel — Open waits until
Must-fix is empty. These are the paths a *different* seed, role or
play style would walk into.

**Reproduce:** `node scripts/port-coverage.mjs --limit 40` (add `--md`
for a table, `--name <fn>` to explain one function). The script indexes
4,868 C functions in `nethack-c/upstream/src/*.c`, indexes `js/**`
exports and locals, builds the C call graph, and BFSes from the turn
loop (`moveloop` / `rhack` / `domove` / `movemon` / `dochug` / `docrt` /
`newsym` / `mklev` / `nh_timeout` / `vision_recalc` / …).

## How a row is scored

| Signal | Meaning |
|---|---|
| **hops** | shortest call-graph distance from the turn loop. 0 = runs every turn. |
| **callers** | distinct call sites in pinned C — how many ways the game reaches it. |
| **RNG** | `rn2`/`rnd`/`rn1`/`rne`/`rnz`/`rnl`/`d()` calls in the C body. A missing arm here does not merely misprint, it **desynchronises the RNG stream** and every later screen with it. |
| **msg** | `pline`/`You`/`Your`/`You_hear`/`verbalize`/… calls — direct screen surface. |
| **C ln / JS ln** | C body lines vs the same-named JS body. |
| **dead** | C callees of this function with **no symbol and no mention anywhere in `js/`** — behaviour the port cannot perform at all. |

`score = reach × call-breadth × loudness × coverage-gap`, where the gap
is amplified by dead callees and damped when a "missing" name is clearly
ported piecewise under other names.

**Hand-verified.** Line-ratio alone lies when this port splits one C
function into helpers. Checked and **excluded** as false positives:
`makelevel` (split into `makelevel` + `makelevel_ordinary`),
`display_pickinv` (ported across five `js/invent.js` helpers),
`mon_arrive`, `look_at_monster`, `do_screen_description`, `really_done`'s
caller `done`, `make_corpse`'s caller chain. Every "dead callee" named
below was confirmed absent with `node scripts/sym.mjs`.

## The 30

| # | C function | C file:line | C ln | JS ln | hops | callers | RNG | msg | What is missing |
|--:|---|---|--:|--:|--:|--:|--:|--:|---|
| 1 | `newuhs` | `eat.c:3362` | 151 | 14 | 3 | 15 | 1 | 8 | JS is a field update only. **All hunger messages, `end_running`, ATEMP WEAK crossover, faint/starve are deferred.** Every session long enough to get Hungry diverges. |
| 2 | `nh_timeout` | `timeout.c:588` | 360 | 233 | **0** | 2 | 6 | 18 | 13 dead callees: `stoned_dialogue`, `slime_dialogue`, `vomiting_dialogue`, `choke_dialogue`, `sickness_dialogue`, `levitation_dialogue`, `phaze_dialogue`, `stone_luck`, … Runs **every turn**; each dialogue prints on a schedule. |
| 3 | `dmgval` | `weapon.c:216` | 140 | 57 | 3 | 26 | **13** | 0 | Blessed-vs-hater `rnd(4)`, axe-vs-wooden `rnd(4)`, silver `rnd(20)`, `artifact_light` `rnd(8)`, `spec_dbon` halving, `greatest_erosion`. Every one is an **RNG draw on every weapon hit**. |
| 4 | `make_corpse` | `mon.c:564` | 377 | 62 | 4 | 6 | **19** | 1 | Dragon scales, unicorn horn, worm tooth and the rest of the special-corpse table, each with its own draws. Fires on **every kill that leaves a corpse**. |
| 5 | `mattacku` | `mhitu.c:491` | 461 | 226 | 1 | 9 | 7 | 18 | Roughly half the C body. Every monster attack on the hero routes through it; audit the attack-type switch arm by arm before porting. |
| 6 | `xkilled` | `mon.c:3477` | 261 | 104 | 3 | 37 | 2 | 14 | `LEVEL_SPECIFIC_NOCORPSE`, the `accessible \|\| is_pool` gate, artifact un-create. **Every monster the hero kills.** |
| 7 | `dochug` | `monmove.c:690` | 299 | 212 | **0** | 7 | 10 | 2 | Dead callee `wormhitu`; ~90 lines of C unaccounted. Runs for **every monster, every turn**. |
| 8 | `spoteffects` | `hack.c:3312` | 150 | 36 | 1 | 42 | 3 | 8 | Recursion guards, levitation-timeout adjust, Warning-on-ice, and most of the "what is on this square" chain. Fires on **every step**. |
| 9 | `test_move` + `domove_core` | `hack.c:991` / `:2712` | 261 / 279 | helpers only | 2 | 19 | 0 | 14 | Only `test_move_hero_passes_bars` / `_chews_bars` exist. Dead callees `water_friction`, `avoid_running_into_trap_or_liquid`, `domove_fight_ironbars`, `domove_fight_web`, `exercise_steed`. **Every move**, plus all `mention_walls` text. |
| 10 | `moveloop_core` | `allmain.c:177` | 387 | 238 | 1 | 1 | 7 | 2 | 9 dead callees: `do_storms`, `glibr`, `mkot_trap_warn`, `end_of_input`, `do_positionbar`, `runmode_delay_output`, … The **per-turn spine**. |
| 11 | `xname_flags` | `objnam.c:581` | 446 | via `xname` | 3 | 2 | 0 | 17 | Dead callees `tshirt_text`, `apron_text`, `hawaiian_motif`, `xcalled`, `find_artifact`, `releaseobuf`. Object naming reaches **every inventory line and most messages**; a Tourist starts wearing the Hawaiian shirt. |
| 12 | `x_monnam` | `do_name.c:827` | 200 | 100 | 2 | **61** | 1 | 16 | Dead callees `nextmbuf`, `lcase`; saddle / `ARTICLE_*` / `M2_PNAME` / Wizard-article arms named. **Every monster name printed.** |
| 13 | `getobj` | `invent.c:1752` | 334 | 133 | 3 | 48 | 0 | 8 | `in_doagain` readchar and most of the prompt/filter machinery. Every "What do you want to …?" prompt. |
| 14 | `yn_function` | `cmd.c:5471` | 108 | 40 | 1 | 40 | 5 | 0 | Two-thirds of the C body, including its RNG arms. Every y/n prompt. |
| 15 | `getdir` | `cmd.c:3958` | 161 | 10 + helpers | 2 | 29 | 5 | 2 | `help_dir` / cmdassist / "strange direction" (NEED_MORE key-eating), `dxdy_moveok`, `yn_function_menu`. Every directional command. |
| 16 | `vpline` | `pline.c:153` | 138 | — | 2 | 16 | 0 | 3 | Dead callees `msgtype_type`, `execplinehandler`, `maybe_play_sound`. This is the **duplicate-message suppression layer** — NOREP/NOSHOW behaviour under every `pline`. |
| 17 | `domonnoise` | `sounds.c:679` | 563 | 209 | 2 | 7 | **17** | 9 | Dead callees `genus`, `mon_is_gecko`, `doconsult`, `shk_chat`; MS_PRIEST `priest_talk`, FULL_MOON howl. `#chat` and every speaking monster. |
| 18 | `use_defensive` | `muse.c:796` | 423 | 51 | 1 | 3 | 7 | **22** | 12% ported. Dead callees `mreadmsg`, `reveal_trap`, `mon_escape`, `mon_consume_unstone`. A hurt monster with a potion or scroll takes this path. |
| 19 | `use_offensive` | `muse.c:1824` | 208 | 66 | 2 | 1 | 4 | 7 | Most wand / horn / scroll cases deferred. A monster zapping at the hero. |
| 20 | `use_misc` | `muse.c:2383` | 243 | 162 | 1 | 2 | 2 | 17 | Dead callees `muse_newcham_mon`, `mloot_container`; poly / bag / `you_aggravate`. |
| 21 | `really_done` | `end.c:1130` | 460 | 127 | 2 | 5 | 1 | 9 | Dead callees `fixup_death`, `force_launch_placement`, `clearlocks`, `free_pickinv_cache`, `timet_delta`; `clearpriests`/`paygd`, logfile/xlogfile. **The end screen of every session that dies.** |
| 22 | `untrap` | `trap.c:5848` | 245 | 94 | 5 | 4 | 3 | 17 | Dead callees `disarm_holdingtrap`, `disarm_landmine`, `disarm_shooting_trap`, `disarm_box`, `help_monster_out`. |
| 23 | `drown` | `trap.c:5059` | 140 | 36 | 2 | 14 | 4 | 13 | `rnd_nextto_goodpos`, `emergency_disrobe` (stub), crawl-out / "Pheew!", Amphibious arms. |
| 24 | `lava_effects` | `trap.c:6794` | 193 | 22 | 2 | 10 | 3 | 9 | 11% ported: Fire_resistance / Wwalking survival, inventory burn flags, the whole sink-and-die sequence. |
| 25 | `newcham` | `mon.c:5278` | 254 | 104 | 2 | **40** | 2 | 4 | Dead callee `monst_to_any`; `NC_VIA_WAND_OR_SPELL` `mon_break_armor`, boulder arms. Shapechangers and every polymorph of a monster. |
| 26 | `dismount_steed` | `steed.c:576` | 245 | 111 | 2 | 29 | 2 | 10 | Poly / engulfed / bones polish, water and lava steed death. |
| 27 | `hmonas` | `uhitm.c:5424` | 436 | 192 | 3 | 3 | 5 | 11 | Under half. Every attack made by a polymorphed hero. |
| 28 | `artifact_hit` | `artifact.c:1447` | 269 | 37 | 3 | 7 | 3 | **19** | 14% ported: `realizes_damage` plines, destroy_items / ignite, the drain-life and blinding arms. |
| 29 | `findtravelpath` | `hack.c:1266` | 257 | — | 2 | 3 | 0 | 1 | Absent. Travel (`_`) is adjacent/greedy only; full `TEST_TRAV` / GUESS / travelmap deferred, so any hidden session that travels walks a different path. |
| 30 | `vision_recalc` | `vision.c:512` | 345 | 180 | **0** | 36 | 0 | 0 | Dead callees `get_unused_cs`, `new_angle`. Runs on every move; **audit before touching** — the fortress leans on it heavily. |

## Honourable mentions (next band)

`getpos` (`getpos.c:771`, 396/249) · `mattackm` (`mhitm.c:293`, 297/175) ·
`explode` (`explode.c:199`, 491/287) · `bhit` (`zap.c:3827`, 306/223) ·
`mintrap` (`trap.c:3733`, 107/54) · `dotrap` (`trap.c:2996`, 64/39) ·
`grow_up` (`makemon.c:2051`, 127/67) · `hitmu` (`mhitu.c:1144`, 123/72) ·
`pickup` (`pickup.c:672`, 238/135) · `makeplural` (`objnam.c:2836`,
186/59, `ch_ksound` dead) · `mon_break_armor` (`worn.c:1177`, absent,
23 messages) · `flush_screen` · `adjattrib` · `rehumanize`.

Deliberately **not** listed: polymorph-only paths (`polymon`, `polyself`,
`dogaze`, `dospinweb`, `dohide`, `domindblast`), endgame/Gehennom paths
(`demon_talk`, `cuss`, `mv_bubble`, `muse_unslime`), wizard-mode
`readobjnam` wishing, and `restore.c getlev` (the port uses a JSON
analogue by Rule #2). They score high on loudness but a hidden session
is unlikely to reach them.

## Queue mapping

`docs/LOOP-QUEUE.md` **Open** now holds rows 1–12 of this table, in
order. Rows 13–30 follow as that queue drains. The map-driven rows this
displaced are still valid and still named in `docs/c-js-map/*.md`; they
were single-arm cleanups, not hidden-score risk:

- `apply.c` corpse gender PRONOUN_NO_IT arm `:230–248`
- `mon.c` maybe_unhide_at wiring into `hack.c` movobj / `ball.c`
- `ball.c` drop_ball
- `obj.h` is_helmet clones in `u_init.js` / `worn.js`
- `teleport.c` level_tele Nowhere ynq + deepest clamp
- `eat.c` doeat edibility_prompts `u.uedibility` consumer
- `dog.c` mon_leave no_charge / set_residency / wormno
- `display.c` map_glyphinfo has_rogue_color colour sets
- `dungeon.c` on_level 13 clones → one export

## Caveats

- Every row still needs the ordinary loop discipline: re-read the C
  function, name the omissions you keep, and gate on green + cohort.
  A high rank is a reason to look, not a licence to skip verification.
- Rows 7, 9, 10, 30 touch the turn loop and the display. They are the
  highest-value and the highest-risk entries here; port them in small,
  separately verified units, not in one commit.
- The ranking is static. It cannot see that a hidden session never
  descends, never fights, or dies on turn 12. It is a prior, not a
  measurement.
