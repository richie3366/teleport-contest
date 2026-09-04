# Held-out coverage gaps — what to port next

**What this is.** A refill source for `docs/LOOP-QUEUE.md` **Open**, ordered
**cheapest × most-reached first**. Where `docs/PORT-GAP-TOP30.md` ranks *functions*
by hidden-score risk, this file ranks **content and subsystem coverage** — the
things a hidden session walks into that the port cannot render at all.

**Provenance.** Derived on 2026-09-04 from the public leaderboard
(`https://mazesofmenace.ai/leaderboard/data.json`), the pinned C source, and the 44
recorded sessions in `sessions/`. A peer fork was inspected **only** to count which
C functions and `dat/*.lua` levels it references — no third-party code was read for
porting purposes, and none may be. **Port every row from
`nethack-c/upstream/` (the pinned C and its `dat/*.lua`) only.** Consulting another
contestant's implementation for a row in this file is plagiarism and forfeits the
entry. The C source is the sole authority; it is also strictly more complete than
any fork, so there is never a reason to look elsewhere.

## Why this file exists

Public score is **maxed and tied** with the fork ahead of us: 11405, 44/44, 100%
screen. The entire deficit is **held-out**: 6/44 passing, 43.2% screen, against
17/44 and 78.4% for the fork one rank up. Nothing visible in `sessions/` will
find the gap — by construction, we already pass all of it.

Breadth is **not** the problem. Grep-checking all 5156 pinned-C functions
(name length ≥ 4) against each `js/` tree: **we reference 3594 (69.7%), they
reference 3341 (64.8%)**. We are ahead on 34 C files (`cmd.c` +34, `invent.c` +29,
`shk.c` +26, `artifact.c` +22, `dungeon.c` +21, `timeout.c` +19). The deficit is
**content we never generate** plus a few deep behaviour clusters.

## The overfitting tell

Quest-level coverage, cross-referenced against the roles in `sessions/`:

| role | quest levels ported | public sessions with that role |
|---|---|---|
| Arc | **5/5** | 1 — `seed0361-archeologist-tour` |
| Pri | **5/5** | 2 — `seed0367-priest-quest-tour` |
| Bar | 4/5 | 1 — `seed0373-barbarian-quest-tour` |
| Wiz | 4/5 | 11 — incl. `seed0360-wizard-world-tour` |
| Kni | 1/5 (`kni-goal` only) | 5 — `seed4500-knight-coverage` |
| Cav, Hea, Mon, Ran, Rog, Sam, Tou, Val | **0/5** | 20 sessions combined |

We have implemented **exactly the quest levels the visible suite forced us to, and
no others.** Every role the public set never sends to its quest has zero coverage.
That is the shape of the held-out deficit, and it generalises: the same is true of
Big Room variants, Medusa variants and the endgame planes.

## What a miss costs

`mklev.js` `makemaz` builds a protofile, then `load_special_proto` returns false for
anything unimplemented and the level is left **blank**:

> `// C: impossible → create_maze; deferred — leave empty rather than wrong RNG`

The hero stands in an empty level. **Every subsequent step of that session
mismatches** — it is a cliff, not a gradual loss. Where the C picks a variant with
`rnd(nlevels)` (`mkmaze.c:1134`, uniform), partial coverage is a per-visit coin flip:

| proto | C variants | ported | blank-level chance per visit |
|---|---|--:|---|
| `bigrm` | 13 | 7 | **46%** (Big Room is 40% per game, Dlvl 10–12) |
| `medusa` | 4 | 2 | **50%** |
| `soko2` | 2 | 1 | **50%** |
| `minend` | 3 | 2 | **33%** |
| `soko1`/`soko3`/`soko4`/`minetn` | 2/2/2/7 | complete | — |

**Totals: C ships 126 level scripts in `nethack-c/upstream/dat`; we implement 64.**

## Cost is transcription, not machinery

Every one of the 62 missing levels was checked for `des.*` primitives it needs
against the 28 primitives our 64 implemented levels already prove:

```
altar door drawbridge engraving exclusion feature gold ladder level_flags
level_init levregion map mazewalk message monster non_diggable non_passwall
object portal random_corridors region replace_terrain room stair terrain
teleport_region trap wallify
```

**No missing level — including all 65 quest levels — needs a primitive we do not
already have.** There is no architectural blocker: the whole backlog is bounded
transcription against `dat/*.lua`. Do **not** treat a generic Lua/`lspo_*`
interpreter as a prerequisite; it is an optional refactor, not a gate.

## Reproduce

```sh
# level inventory (note: protofiles are case-sensitive — Bar-strt, not bar-strt)
rg -o "protofile === '([A-Za-z0-9_-]+)'" js/mklev.js -r '$1' | sort -u
ls nethack-c/upstream/dat/*.lua            # 126 level scripts + nhlib/levels/quest-levels/nhcore/quest
rg -n 'rndlevs|nlevels' nethack-c/upstream/dat/dungeon.lua
node scripts/port-coverage.mjs --limit 40  # function-level risk (the TOP30 view)
```

## Tier A — content: cheap, high coverage *(queue rows 1–12 draw from here)*

Cost is the C `dat/*.lua` line count. "Reach" is why a hidden session hits it.

| # | Item | lua ln | Reach |
|--:|---|--:|---|
| 1 | `wiz-goal` | 132 | **Wizard is 11/44 public sessions.** Completes Wiz quest (4/5 → 5/5). Best ratio in the file. |
| 2 | `bar-goal` | 95 | Completes Bar quest (4/5 → 5/5); a public Barbarian quest-tour already exists. |
| 3 | `soko2-2` | 72 | Kills a **50%** coin flip on every Sokoban level 2. Sokoban is entered from Dlvl 6–9. |
| 4 | `bigrm-5`,`-6`,`-11` | 54/48/39 | Three smallest Big Room variants. |
| 5 | `bigrm-1`,`-10`,`-13` | 81/61/82 | Completes Big Room → 46% blank becomes 0%. |
| 6 | `minend-3` | 107 | **33%** blank at Mine's End; the Mines are entered by most descending games. |
| 7 | `medusa-2`, `medusa-4` | 129/152 | **50%** blank at Medusa (Dlvl 21–24). |
| 8 | `water` | 102 | Endgame plane **4 of 5**. We have earth/air/fire, so an ascension run goes blank here. Needs `mkmaze.c` `save_waterlevel`/`restore_waterlevel`/`unsetup_waterlevel`/`set_wportal` + bubbles. |
| 9 | `astral` | 187 | Endgame plane 5 of 5. |
| 10 | `kni-strt`,`-loca`,`-fila`,`-filb` | 321 | **Knight is 5/44 sessions**; only `kni-goal` exists. |
| 11 | `rog-strt`,`-loca`,`-goal`,`-fila`,`-filb` | 503 | **Rogue is 6/44 sessions** — the largest 0/5 role. |
| 12 | `fakewiz1`, `fakewiz2` | 44/44 | Tiny; on the Wizard-of-Yendor path every ascension run walks. |

## Tier B — content: remaining levels

Order within the tier by role frequency in `sessions/`, then by cost.

| Item | lua ln | Reach |
|---|--:|---|
| `val-*` (5) | 371 | Valkyrie 3/44 |
| `sam-*` (5) | 447 | Samurai 3/44 |
| `tou-*` (5) | 520 | Tourist 3/44 |
| `ran-*` (5) | 360 | Ranger 3/44 |
| `hea-*` (5) | 388 | Healer 2/44 |
| `mon-*` (5) | 402 | Monk 2/44 |
| `cav-*` (5) | 330 | Caveman 1/44 |
| `knox` | 167 | Fort Ludios — magic portal from a vault |
| `tut-2` | 27 | Trivial; completes the tutorial pair |

## Tier C — behaviour clusters

190 C functions are defined in the peer fork and absent from our entire `js/` tree.
Grouped by C file, largest first. Port from the C body; the names below are the
pinned-C names, cited so the row can be located — nothing more.

| C file | ours/C | Missing |
|---|--:|---|
| `mcastu.c` | 12/26 | `castmu`'s switch handles only HASTE_SELF / CURE_SELF / SUMMON_MONS / PSI_BOLT / OPEN_WOUNDS / BLIND_YOU then falls through `default:`. Missing `mcast_clone_wiz`, `mcast_confuse_you`, `mcast_death_touch`, `mcast_destroy_armor`, `mcast_disappear`, `mcast_fire_pillar`, `mcast_geyser`, `mcast_insects`, `mcast_lightning`, `mcast_paralyze`, `mcast_stun_you`, `mcast_weaken_you`, `touch_of_death`, `death_inflicted_by`. **Every clerical caster desyncs the RNG on cast.** |
| `polyself.c` | 23/34 | `domonability` (`js/polyself.js:1151`) already names its omissions. Missing `dopoly`, `dohide`, `dogaze`, `dospit`, `dospinweb`, `dosummon`, `domindblast`, `doremove`, `armor_to_dragon`, `check_strangling`, `livelog_newform`. |
| `uhitm.c` | 66/102 | `hmon_hitmon_do_hit`/`_jousting`/`_poison`/`_potion`/`_weapon`/`_weapon_ranged`/`_splitmon`/`_msg_silver`/`_msg_lightobj`; `backstabbable`, `disguised_as_mon`, `disguised_as_non_mon`, `nohandglow`, `theft_petrifies`. **`mhitm_ad_*`:** C has 40, we have 18 C-named + 11 local `_u` variants. `AD_ACID`/`AD_STCK`/`AD_RUST`/`AD_CORR`/`AD_PLYS` are inline; **`AD_SLIM`, `AD_TLPT`, `AD_WERE`, `AD_SGLD` have no handling anywhere**, `AD_SLEE`/`AD_DRLI` partial. |
| `dbridge.c` | 19/28 | The whole entity abstraction: `e_at`, `m_to_e`, `u_to_e`, `e_nam`, `E_phrase`, `e_survives_at`, `e_jumps`, `e_missed`, `automiss`. `js/dbridge.js` header already names "set_entity/do_entity crush death" as omitted. |
| `read.c` | 48/62 | `seffect_amnesia`, `seffect_charging`, `seffect_confuse_monster`, `seffect_earth`, `seffect_enchant_armor`, `seffect_mail`, `seffect_scare_monster`, `seffect_stinking_cloud`, `do_stinking_cloud`, `can_center_cloud`, `p_glow3`. |
| `muse.c` | 38/44 | `cures_sliming`, `cures_stoning`, `munslime`, `muse_unslime`, `green_mon`, `m_sees_sleepy_soldier`. |
| `wizard.c` | 15/21 | `clonewiz`, `mon_has_arti`, `other_mon_has_arti`, `which_arti`, `on_ground`, `wizdeadorgone`. Plus `quest.c` `leaddead`, `nemdead`, `nemesis_stinks`. |
| `mkmap.c` | 8/14 | `get_map`, `pass_one`, `pass_two`, `pass_three`, `remove_room`, `remove_rooms` — the cavern generator, called from `sp_lev.c:3010` for `level_init` styles. |
| `mkmaze.c` | 36/44 | `save_waterlevel`, `restore_waterlevel`, `unsetup_waterlevel`, `set_wportal`, `populate_maze`, `maybe_adjust_hero_bubble`, `mazexy`, `is_solid`. Pairs with Tier A row 8. |
| `pager.c` | 28/46 | `dohistory`, `add_cmap_descr`, `add_quoted_engraving`, `look_region_nearby`, `hmenu_dowhatis`, `dispfile_*`. |
| `role.c` | 27/47 | `str2role`, `str2race`, `str2gend`, `str2align`, `setup_rolemenu`/`racemenu`/`gendmenu`/`algnmenu`, `root_plselection_prompt`. |
| `options.c` | 45/236 | 48 `optfn_*` setters plus `initoptions`, `get_option_value`, `count_cond`, `is_wc2_option`, `term_for_boolean`. |
| `getpos.c` | — | `gloc_filter_init`/`_done`/`_floodfill`/`_floodfill_matcharea`/`_classify_glyph`. |
| `do_wear.c` | 72/79 | `Armor_gone`, `count_worn_armor`, `doremring`, `ia_dotakeoff`, `remove_ok`, `any_worn_armor_ok`. |
| misc | — | `pickup.c` `boh_loss`/`do_boh_explosion`/`mbag_item_gone`; `zap.c` `polyuse`/`mon_spell_hits_spot`/`wish_history_menu`; `artifact.c` `find_artifact`/`found_artifact`/`spec_ability`; `pray.c` `gcrownu`/`at_your_feet`; `sp_lev.c` `lspo_*` + `selvar.c` selection primitives. |
| singletons | — | `stealamulet`, `ucatchgem`, `move_gold`, `mon_hates_light`, `exercise_steed`, `On_ladder`, `doclassdisco`, `readmail`, `tin_variety_txt`, `pmatch`, `new_angle`, `obj_adjust_light_radius`, `spot_time_expires`, `mnum_leashable`, `better_not_try_to_drop_that`, `avoid_ceiling`, `inside_rect`, `armcat_to_wornmask`, `give_may_advance_msg`, `row_refresh`, `init_sound_disp_gamewindows`, `l_selection_iterate`. |

## Do not regress

570 C functions are referenced here and not in the peer fork — `cmd.c` (+34),
`invent.c` (+29), `shk.c` (+26), `artifact.c` (+22), `dungeon.c` (+21),
`timeout.c` (+19), `restore.c` (+16), `pickup.c` (+16), `files.c` (+16),
`trap.c` (+14), `save.c` (+13), `hack.c` (+12), plus `stairway_find_forwiz` and
`tele_trap`. This is our lead. Nothing in this file justifies trading it away.

## Queue mapping

`docs/LOOP-QUEUE.md` **Open** holds Tier A rows 1–12. Tier B then Tier C refill it
as it drains. `docs/PORT-GAP-TOP30.md` rows remain valid and are the better source
when the goal is *depth in a reached function* rather than *content we cannot
render*; alternate between the two files as the queue empties.

The 12 rows this displaced were the previous map-driven Open list. They are not
lost — all nine are still named in `docs/PORT-GAP-TOP30.md` (rows 22–30 and its
honourable-mentions band) and in `docs/c-js-map/*.md`:
`trap.c` lava_effects · `mon.c` newcham · `steed.c` dismount_steed ·
`uhitm.c` hmonas · `artifact.c` artifact_hit · `hack.c` findtravelpath ·
`getpos.c` getpos · `mhitm.c` mattackm · `worn.c` mon_break_armor.
They are depth-in-a-reached-function work; this file's rows are
cannot-render-at-all work, which is why they go first.

`PORT-GAP-TOP30.md` explicitly excluded "polymorph-only paths … endgame/Gehennom
paths … a hidden session is unlikely to reach them." **The session data contradicts
that.** Five public sessions reach Dlvl 34–48, three are named `*-quest-tour`, and
the fork one rank ahead ports exactly those paths. Treat that exclusion as retired.

## Caveats

- Session-depth statistics come from the 44 **public** sessions. Held-out is assumed
  to be drawn the same way. That is a prior, not a measurement.
- Role frequencies are counted from role names appearing in session JSON; a session
  that mentions two roles is attributed to the more frequent one. Treat ±1 as noise.
- The blank-level probabilities assume the level is reached at all. They are
  conditional, not per-session.
- Every row still takes the ordinary loop discipline: re-read the C, name the
  omissions kept, gate on green + cohort. A high rank is a reason to look, not a
  licence to skip verification.
