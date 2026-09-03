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

Score last measured: **2026-09-03** — full `sessions` at **D-1790**
(`monverbself`). **44**/44,
Scr **11,405**/11,405, RNG **792,838**/792,838 = **100%**.
Speed `41+0.33/turn` (R² 0.855). Fortress held. Re-audit **738–754**
is **paid off**: **D-1786** closed 747 (`u.uball` ballfall callers),
**D-1787** closed 748 (lookat `glyph_to_trap`), **D-1788** closed 750
(`SPE_DETECT_FOOD` → `seffects`), **D-1789** closed 752 (keepdogs
walks a snapshot). Must-fix is **empty**; pop the first Open.
No public session is Punished-while-falling,
farlooking a trapped chest/door, level-porting by name, food/object
detect, `#cast` food-detect, or leaving a level with a stuck leashed
pet — probes, not the suite.

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** (100%) |
| Speed label | `41+0.33/turn` (R² 0.855) |
| Role-init throws | **0 / 44** |

**PASS (44):** seed8000, seed0900, seed1500, seed1800, seed0060,
seed0102, seed0700, seed1150, seed0017, seed0077, seed0106, seed0501,
seed0105, seed0016, seed0015, seed0200, seed0101, seed0103, seed0104,
seed0013-rogue, seed0013-friday13-restore, seed0107,
seed0012, seed0004, seed0002, seed0006, seed0007, seed0009, seed0398,
seed0373, seed5006, seed0116, seed0361, seed0367, seed0108, seed5002,
seed0360, seed0399, seed2600, seed2200, seed0383, seed0030, seed4500,
seed0014-dequa-fountain-explore.

**Notable non-PASS:** none (local public fortress).

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

**Suite 44/44** held at D-1790. **D-1790** shipped the first Open
(`mon_nam_too` + `monverbself`; the mirror / wand / steed arms had each
dropped the reflexive). Must-fix is **empty** — pop the first **Open**
row. Save-oracle required for tagged restore/other-floor Open
(`save-oracle.mjs probe --omit`).
**Next cluster:** `apply.c` corpse gender PRONOUN_NO_IT arm
`:230–248` (named). Not `pronoun_gender`.
**`end.c` DUMPLOG is retired, do not re-enqueue** (D-1776):
`nethack-c/macosx-minimal` passes no `-DDUMPLOG`, so every `end.c`
`#ifdef DUMPLOG` block is compiled out of the scored build, and the
surviving `DUMPLOG_CORE` `saved_plines[]` ring is write-only (only
reader is `report.c` crash path).
**Do not skip D-1531…D-1790 (index).** Keep mention_map addr.
Do not wrap `wildmiss` or `msg_mon_movement` as `pline_mon`.
Do not rewrite `confer_oc_oprop`. Do not add trailing
`confdir` inside shared `getdir`.
**Do not re-break D-0660…D-1790.** Do not FORCE
CLOSE/movement/umov / shk satdoor/`onlineu` (D-0376).
**Do not re-apply D-0480 glyph `tty_map_color` in serialize (D-0483).**
**Keep:** D-0845…D-1790 (index). Recent: **D-1790**
`do_name.c` `mon_nam_too` `:1189` + `monverbself` `:1219` — one home in
`js/do_name.js`, `mhitm.js` clone deleted, `makeplural` pronoun block
`objnam.c:2853` ported. `monverbself`’s genders[3] arm is C **as
written**: makeplural("It")="They" then `:1240` → `genders[3].him`, so
a hallucinated steed is “Them rouse themselves!” and “They” → “Theys”.
Do not correct it. Named: `mplayhorn` `:218`, fire-breath `:3145`,
`uhitm.c:4168`. **D-1789**
`dog.c` `keepdogs` `:793–794` — C saves `mtmp2 = mtmp->nmon` before
the body because `relmon` `:863` and `migrate_to_level` `:906` both
unlink `mtmp`; JS walks `[...(game.fmon || [])]` and splices
departers out of the live array. **No `game.fmon = stay` rebuild** —
it deleted whatever a mid-walk splice skipped. Named: `relmon` /
`mon_leaving_level` (JS `unstuck` is async), `mon_leave`. **D-1788**
`spell.c` `spelleffects` `:1517–1531` — `SPE_DETECT_FOOD` skilled
bless then FALLTHROUGH `seffects(pseudo)` with MAGIC_MAPPING /
CREATE_MONSTER; helper is D-1781. **D-1787**
`pager.c` lookat `:718–721` + `display.h` `glyph_to_trap` `:671–674`
+ `display.c` `glyph_at` `:2477` — tnum is the gbuf glyph, not
`t_at&&tseen`; `brief_at` / `describe_looked` / `auto_describe_text`
enter on `glyph_is_trap`; floor objects do not beat a trap glyph.
**D-1786** ballfall callers `do.c:1805` / `trap.c:1955` — C `Punished`
≡ `uball != 0`; the sticky `u.Punished` they gated on is never written.
**D-1785** `do_clear_area` `:2106` — one **async** export plus
`override_vision` via `detecting`; `openit` passes `openone` itself
(identity matters); `dog_goal` async. **D-1784** `maybe_display_usteed`
`:246` — ridden steed uses `ridden_mon_to_glyph`, and `display_self`'s
wizmgender attr follows the **steed's** gender. **D-1783** `keepdogs` `:786` stay_behind + both leash arms + `mintrap`
escape + steed `mdrop_special_objs` + `keep_mon_accessible`; async at
both callers; `on_level` exported. **D-1782** `object_detect` `:602` — `clear_stale_map` gate, `ctu`
"sense nearby", `o_in`, buried+minvent+cursed-mimic, `findgold`
**`rnd(10)`**, boulder dual-class. **D-1781** `food_detect` `:478` +
`seffect_food_detection`: confused **or cursed** searches POTION_CLASS,
nothing-found returns `!stale`, blessed sets `u.uedibility`.
**D-1780** `lev_by_name` `:2096` + `find_branch` `pd == NULL` — gates
are `dlev_in_current_branch` and wizard-or-VISITED; keep the
gehennom·hell→valley alias.
**D-1779** `trap_description` hallu `rn2(20)` chest-then-door.
**D-1778** `ballfall` `gets_hit` `rn2(5)` before `ballrelease`;
`hard_helmet` one export. **D-1777** Blind `move_bc`; `u.bglyph`/
`u.cglyph` are remembered **cells**, not int ids. **D-1776**
`pronoun_gender` one home, hallu `rn2(4)` **first**; DUMPLOG retired.
**D-1775** `findone` flash+`foundone` tail is live.
**D-1774** `newsym` `:1032` I-arm `lev->glyph` (not gbuf); fight_empty
`glyph_at`. **D-1773** `gold_detect`.
**D-1772** `peacefuls_respond` Halt. **D-1771** invent `useupf`.
**D-1770** zap `delete_contents`. **D-1769** Punished `set_bc`.
**D-1768** Unaware talk=FALSE. **D-1767** `show_glyph` gbuf stamp.
D-1766…D-1755 (index).
**Do not / rejects:** FORCE/RNG; HEAVY_IRON_BALL `owt!=0`;
judge-elides-RC (D-0933); extend §1.2; LB peels; skip painting
spaces; wrap `wildmiss` / `msg_mon_movement` as `pline_mon`;
Do not skip D-1229…D-1790 (index). No `reset_glyphmap` /
`notice_all_mons` / `makemap_remove_mons` / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE.
No trailing `confdir` in shared `getdir`. Latebound `body_part`.
No fourth town gnome. No makemon→hack/`artifact`/`minion`.
Do not delete emin. `#altdip` stays INTERNALCMD. No
bones→options fruitadd. Do not rewrite `confer_oc_oprop`.
Do not re-port D-1660…D-1790 (index). No generic `dknown` on
`otyp < FIRST_OBJECT`. No dump_fmtstr / paniclog filesystem. DUMPLOG retired (D-1776).
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
