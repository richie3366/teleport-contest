# Current (hot pack)

**Single source of truth for each loop iteration.** Cap: `check-hot-docs.mjs`.
Do not paste completed D-chains here — those live in `DIVERGENCE-INDEX.md`
and `archive/PROGRESS-HISTORY.md`.

**HARD (Contest Rule #2):** scored `js/` = plain ESM for Node **and** Chrome —
no `fs`/`path`/`url`/`node:*`, no runtime filesystem. Persist only via
`storage.js` VFS; dat texts live in `js/generated/` (D-0477 / Constitution §1.5).

## Public score cadence

**Every 10 global loop iterations** (`iteration-count % 10 == 0`) is an
**audit**: write the C-fidelity review **and** run:

```bash
node frozen/ps_test_runner.mjs sessions
```

Update Score: pass count, screen/RNG aggregates, speed, PASS list,
notable non-PASS. Do not invent suite totals from one focused session.

Score last measured: **2026-08-29** — full `sessions` at **D-1674**
(`115570e2`, cadence **#2080**). **44**/44,
Scr **11,405**/11,405, RNG **792,838**/792,838 = **100%**.
Speed `39+0.31/turn` (R² 0.858). seed0367 FULL still PASS.
Prior FAIL seed4500 at **D-1574** `1ba35e31` is PASS again.
Prior audit **#2070** was 44/44 at `784e3060` (R² 0.862).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** (100%) |
| Speed label | `39+0.31/turn` (R² 0.858) |
| Role-init throws | **0 / 44** |

**PASS (44):** seed8000, seed0900, seed1500, seed1800, seed0060,
seed0102, seed0700, seed1150, seed0017, seed0077, seed0106, seed0501,
seed0105, seed0016, seed0015, seed0200, seed0101, seed0103, seed0104,
seed0030, seed0013-rogue, seed0013-friday13-restore, seed0107,
seed0012, seed0004, seed0002, seed0006, seed0007, seed0009, seed0398,
seed0373, seed5006, seed0116, seed0361, seed0367, seed0108, seed5002,
seed0360, seed0399, seed0014, seed2600, seed2200, seed0383, seed4500.

**Notable non-PASS:** none.

## Green gate

```bash
node frozen/ps_test_runner.mjs \
  sessions/seed8000-tourist-starter.session.json \
  sessions/seed0900-tourist-explore-actions.session.json
node scripts/strict-output-check.mjs \
  sessions/seed8000-tourist-starter.session.json \
  sessions/seed0900-tourist-explore-actions.session.json
```

Both must remain full RNG + screen PASS with exact lengths.

## Primary objective

**Suite 44/44** after D-1675 (seed4500 still PASS). **Next cluster:**
Open `iactions.c` IA_BUY_OBJ shop pay (named). Not offer/tip/invoke.
**Do not skip D-1531…D-1675 (index).** Keep mention_map addr.
Do not wrap `wildmiss` or `msg_mon_movement` as `pline_mon`.
Do not rewrite `confer_oc_oprop`. Do not add trailing
`confdir` inside shared `getdir`.
**Do not re-break D-0660…D-1675.** Do not FORCE
CLOSE/movement/umov / shk satdoor/`onlineu` (D-0376).
**Do not re-apply D-0480 glyph `tty_map_color` in serialize (D-0483).**
**Keep:** D-0845…D-1675 (index). Recent: **D-1675**
`itemactions_pushkeys` IA_UNWIELD/NAME/EAT/ENGRAVE + `remarm_swapwep`.
Not remaining buy/rub/swap/two-weapon/whatis. `oc_uses_known` is D-1674.
`distant_monnam` astral is D-1673. `docall` sink-fluid is D-1672.
cmdq_pop canned is D-1671. artifact_name slip is D-1670.
**Do not / rejects:** FORCE/RNG; HEAVY_IRON_BALL `owt!=0`;
judge-elides-RC (D-0933); extend §1.2; LB peels; skip painting
spaces; wrap `wildmiss` / `msg_mon_movement` as `pline_mon`;
Do not skip D-1229…D-1675 (index). No `reset_glyphmap` /
`notice_all_mons` / `makemap_remove_mons` / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / `restore_artifacts`.
No trailing `confdir` in shared `getdir`. Latebound `body_part`.
No fourth town gnome. No makemon→hack/`artifact`/`minion`.
Do not delete emin. `#altdip` stays INTERNALCMD. No
bones→options fruitadd. Do not rewrite `confer_oc_oprop`.
Do not re-port `mongets` sword `spe`. Do not re-port
`gain_guardian_angel`. Do not re-port `m_unleash`.
Do not re-port `initedog` ogoal / first-pet livelog.
Do not re-port getline ^P / yn ^P.
Do not re-port `get_count` historicmsg.
Do not re-port `restore_msghistory`.
Do not re-port `consume_obj_charge` known `update_inventory`.
Do not re-port `reset_hostility`.
Do not re-port dog_move Conflict `lose_guardian_angel`.
Do not re-port `mplayer_talk`.
Do not re-port peaceful MS_HUMANOID / `"threatens you."`.
Do not re-port MS_BOAST hostile giants.
Do not re-port `take_off` occupation / `do_takeoff`.
Do not re-port floor TRADITIONAL `query_classes`.
Do not re-port `adjust_split`.
Do not re-port `check_invent_gold`.
Do not re-port `doperminv` / tty WIN_INVEN `assesstty`.
Do not re-port `com_pager_core` synopsis.
Do not re-port yn post-answer `toplines`.
Do not re-port EDIT_GETLIN (config.h commented).
Do not re-port `doextlist`.
Do not re-port BIND= M('?') / rhack `cmdbind_get` default.
Do not re-port overlay BIND= on if/else keys.
Do not re-port ACH_ENDG/ASTR/BGRM / Knox alarm / entered livelog.
Do not re-port `dismount_steed` DISMOUNT_THROWN HP.
Do not re-port `landing_spot` KNOCKED preferred-dir / enexto.
Do not re-port `restore_gamelog`.
Do not re-port `restore_luadata` / `save_luadata`.
Do not re-port `newcham` mleashed / Elbereth `monflee`.
Do not re-port await `newcham` at async NO_NC_FLAGS sites.
Do not re-port MENU_SEARCH / `tty_wait_synch`.
Do not re-port `restore_cham`.
Do not re-port `do_mgivenname`.
Do not re-port `lookup_novel`.
Do not re-port `'o'` getobj `"call"`.
Do not re-port `optfn_perminv_mode`.
Do not re-port `can_set_perm_invent` InvOptOn import.
Do not re-port `qt_pager` common fallback.
Do not re-port `dounpaid`.
Do not re-port `sanity_check` gold/invlet.
Do not re-port `eyecount`.
Do not re-port `rename_disco`.
Do not re-port `free_edog` / restmon `newedog`.
Do not re-port `menu_remarm`.
Do not re-port `tty_nhbell` / yn `cw->cury` / `intr`.
Do not re-port kill_char / getlin empty-erase bell / getline `intr--`.
Do not re-port ESC-nonempty fallthrough / `hooked_getlin_handle_esc`.
Do not re-port files.c `read_tribute` / `choose_passage` / SPE_NOVEL.
Do not re-port `Death_quote` / `u_have_novel`.
Do not re-port `convert_line` pronoun `%Xh` / `qtext_pronoun`.
Do not re-port `convert_arg` catalogue.
Do not re-port `dooverview` PICK_ONE / `show_overview` why==-1.
Do not re-port `print_mapseen` altar-god coalign / `altarmask_at`.
Do not re-port `print_mapseen` cemetery bones list.
Do not re-port `safe_qbuf` / pickup Pick up / Continue? / tip ynq.
Do not re-port `invlet_constant` / `reassign` / `obj_to_let`.
Do not re-port `use_grease` / trailing `update_inventory`.
Do not re-port `doddrop` / ggetobj drop / `menu_drop`.
Do not re-port `sanity_check` gold/invlet.
Do not re-port remaining pushkeys offer/tip/invoke / `offer_ok` /
`floorfood("sacrifice")` / `doinvoke` live getobj / `dotip` `tip_ok`.
Do not re-port remaining pushkeys buy/rub/swap/two-weapon/whatis.
Do not re-port `can_set_perm_invent` InvOptOn import.
Do not re-port `dosacrifice` ECMD_TIME after floorfood pick.
Do not re-port `noarmor` uskin.
Do not re-port wizweight after-change / doname `aum`.
Do not re-port `do_oname` artifact_name slip / `restrict_name`.
Do not re-port `docallcmd` cmdq_pop canned / lootabc / invent i/o.
Do not re-port `docall` sink-fluid / `safe_qbuf` Call/:/thing.
Do not re-port `distant_monnam` astral high-cleric.
Do not re-port remaining pushkeys unwield/name/eat/engrave /
`remarm_swapwep` / floorfood_eat `iflags.menu_requested`.
Do not re-port `oc_uses_known` extract / class-name uskn stand-in.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007
+ seed2200 + seed0383 + strict lengths.

## Parked (diagnose only — do not implement)

| ID | Why parked |
|----|------------|
| **D-0006** | seed1800 pet movement — needs C state/candidate capture |

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md` ·
journal tail · `archive/PROGRESS-HISTORY.md`.

## Handoff rule

Update **this file** when score, green gate, or primary objective changes.
On every 10th global iteration, write the C-fidelity review **and**
refresh Score from a full `sessions` run.
Journal; divergence + index; one C-JS-MAP section. No completed D-lists.
