# Review — `2ae43a8b` — D-1036 `hatch_egg` body, dispatch **not** wired

## Metadata
- Full / short hash: `2ae43a8b9a3116097d7c57f54857ad9dfd59f31a` / `2ae43a8b`
- Parent: `7b1251f3` (D-1035 nhl_gamestate)
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-15 18:45
- D-id: **D-1036**
- Stats: 12 files, **+442 / −76** — `js/timeout.js` **+280**, `js/sounds.js` **+41**; **cadence #1305 mixed in**
- JS / map / cadence: `timeout.js` `hatch_egg`/`learn_egg_type`; `sounds.js` `cry_sound`; `mkobj.js` `run_timers` **drops** HATCH_EGG; cadence 44/44 in the same SHA

## Intent vs deliverable
Git promise (rarely this honest): port the callback **and** keep `run_timers` **dropping** HATCH_EGG until `where` parity.

Actual deliverable: body ported; dispatch **deliberately** omitted after a trial that put the fortress at **42/44** (seed0014 / seed4500). Cadence #1305 measured **after** the unwind. This is the only SHA in the run where a public FAIL was used as a **falsifier**, not a peel to “align”.

## Disposition (catch-up 2026-08-15)

| Risk | Status |
|------|--------|
| 1 Do not dispatch until `where` parity | **Addressed:** D-1037 `7247025c` (`save_timers RANGE_LEVEL` + hatch dispatch) |
| 3 Empty `msound` → always chitter | **Must-fix** |
| 4 `get_obj_location` flags `0` vs CONTAINED | **Must-fix** |

## Inventory
| File | Role |
|------|------|
| `js/timeout.js` | `hatch_egg` / `learn_egg_type` |
| `js/sounds.js` | `cry_sound` (`monflag.h` constants) |
| `js/mkobj.js` | comment + **no** `case HATCH_EGG` in `run_timers` |
| cadence CURRENT | 44/44 Scr 11405 RNG 100% `31+0.27/turn` |

## C ↔ JS fidelity

### `hatch_egg` — C envelope copied
C `timeout.c:1017–1189`. JS `timeout.js:1007–1152`.

- `corpsenm == NON_PM` return (sterile).
- `mnum = big_to_little(corpsenm)`.
- `yours = spe \|\| (!female && carried && !rn2(2))` — **short-circuit**: true `spe` ⇒ no `rn2` (matches clang LTR).
- `silent = timeout != moves`.
- `get_obj_location(egg, 0)`: INVENT/FLOOR/MINVENT only.
- `hatchcount = rnd(quan)` **before** the geno skip (C too: `rnd` even if G_UNIQ/GENOD/EXTINCT then skip spawn — **RNG is consumed**). JS: `rnd` only `if (loc)` then skip spawn in `if (ptr && !UNIQ && !GENOD)` — if loc exists but geno skips, C already did `rnd(quan)` **and** `cansee_hatchspot`; JS also `hatchcount = rnd` before the geno if. Match.
- loop `enexto`+`makemon(NO_MINVENT\|MM_NOMSG)`; tame `yours&&!silent` or carried dragon; `mtame=20` non-dragon invent; EXTINCT break; `hatchcount -= i`; `quan -=`.
- INVENT/FLOOR/MINVENT messages; `learn_egg_type` if cansee && knows_egg.
- leftover `attach_egg_hatch_timeout(rnd(12))`; invent `useup`; floor extract+`obfree`+`hideunder`.

`#if 0` migrating: both omit. C `impossible(where)` vs JS default break.

### `learn_egg_type` / `cry_sound`
C: `little_to_big` then `MV_KNOWS_EGG` + `update_inventory`. JS: flags, **no** `update_inventory` (named).

`cry_sound`: JS local constants `MS_SILENT=0 … MS_MUMBLE=21` = `monflag.h` (checked). Default chitter / eel gurgle. D-log: JS `ptr.msound` often empty → everything falls to default. **Not a number hallucination**; an incomplete monster table.

### Dispatch — the point that matters
C `run_timers` calls `hatch_egg` when the action is HATCH_EGG.

JS `mkobj.js:844–876`: ROT_CORPSE / ORGANIC / MELT / BURN / SHRINK / FIG_TRANSFORM. **No** HATCH_EGG. The timer is **removed from the list** (while pop) **without** callback: `timed--` happens, the egg does **not** hatch, **no** hatch `rnd`/`enexto`/`makemon`.

This is **deliberate**. Wired trial: seed0014 RNG 45430/59178 Scr 635/714; seed4500 100939/108275 Scr 1572/1814. NOTES hypothesis: JS attaches/fires HATCH_EGG on typed floor eggs (giant spider attach OBJ_FREE, fire OBJ_FLOOR) while matching C is a no-op (NON_PM or not floor). **Do not re-wire without a C dump of `where`/`corpsenm`.**

The drop is not C. It is a **suite-parity shim** until egg timers exist in the same places. Constitutionally: no FORCE, no hardcoded coords. Process: correct. Runtime fidelity: **JS HATCH_EGG timers are swallowed with no effect** — C divergence until attach parity.

*(D-1037 later proved the 42/44 was off-level floor eggs still on the live queue after `goto_level`. C `save_timers(RANGE_LEVEL)` peels them. Dispatch is now wired.)*

### Mixed cadence
#1305 full sessions in the same SHA as the port. Recurring PROCESS-SMELL, **less bad** here: the cadence **proves the unwind**, it is not a score glued to a dead dump.

## Constitution / playbook
Bans clean. “Public traces” hypothesis in the `run_timers` comment: seed0014/4500 reasoning, **not** `if (seed)`. Acceptable. Do not re-wire to “finish D-1036”.

## Density (§2b)
**Right size**: callback + `cry_sound` + the non-wire. Not hatch+revive+zombie.

## Documentation
Best of the run: CURRENT next = C dump **before** wire; NOTES hypothesis + falsifier; D-log 42/44 numbered. Overclaim “fixed” in D-log status is too strong (**partial** is in the title — OK).

## Verification
Private hatch node (NON_PM, cry, leftover) ≠ dispatch. Cadence 44/44 **after** the drop. Real proof of the wire hazard: the two cited FAIL seeds.

## Risks / debt
1. **Do not dispatch** until `attach_egg_hatch_timeout` / `where` ≠ C. *(Superseded by D-1037 peel, not by ignoring this review.)*
2. JS eggs: timers pop without hatch → eggs that **will never hatch** even off-suite (gameplay outside traces).
3. Empty `msound` → cry always chitter.
4. JS `get_obj_location` flags `0`: if the implementation accepts CONTAINED, C does not.

## Verdict
- Verdict: **ACCEPT-WITH-DEBT**
- Score: **7.5 / 10**
- One sentence: the body is a C copy (`yours`/`rnd(quan)`/`rnd(12)` RNG); **do not relaunch the loop to wire it** — the 42/44 is the falsifier, the drop is the right decision, not a TODO.

## Follow-up (human, not loop)
Temp C dump: for an egg that timers out on seed0014/4500, `where`, `corpsenm`, `spe`, carried. Then align JS **attach**, then one `run_timers` → `hatch_egg` line.
