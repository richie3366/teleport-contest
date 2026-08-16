# Review 14 — 178d60f2 — cry_sound msound C monflag.h (D-1053)

## Metadata
- Full / short hash: `178d60f24361ac6406b4ec02b3c4bd4ed1aceb9a` / `178d60f2`
- Parent: `1710bd41` (D-1052)
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 01:49:20 +0200
- D-id: **D-1053**
- Stats: 16 files, +216 / −126 — `js/sounds.js` +65 / −? net, `scripts/extract-monsters.py` +65, `js/generated/monsters_data.js` +1 line (`msounds[]`), `js/monsters.js` +2; **cadence #1325 mixed in**
- Claims to close: D-1036 **risk 3** (empty `msound` → `cry_sound` always chitter). Stamped **Addressed:** D-1053 on that review **without** the short hash (chicken-egg). This review commit fills `178d60f2`.
- JS / map: extractor SIZ sound → `msounds[]` / `mons().msound`; growl/cry numbers unified; `c-js-map/data.md`. Cadence **#1325** **44**/44 Scr **11405**/11405 RNG **100%**.

## Intent vs deliverable

Git subject promises: “Match C SIZ/monflag.h msound so cry_sound uses real monster cries instead of always-chitter.”

D-1036 risk 3: `cry_sound` already used C `monflag.h` numbers **locally**, but `mons()` omitted `msound`, so `ptr.msound|0` was 0 (`MS_SILENT`) → default chitter (eel gurgle). Growl table numbering also diverged (`MS_ROAR=6` vs C `3`).

The diff **does** capture `SIZ(wt,nut,sound,sz)`’s third argument into `msounds[]`, attach `mons().msound`, delete the duplicate local enum inside `cry_sound`, fill missing `growl_sound` arms, and drop the `domonnoise` `msound===0` leader shim.

It does **not** make `peace_minded` / `set_malign` / `m_initweap` read `ptr.msound` (mndx/urole gates remain). D-log names those. The subject does not claim them.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `msounds[]` | extracted C field | `monst.c` `SIZ(wt,nut,snd,siz)` 3rd arg; `monflag.h` enum |
| `mons().msound` | C field on `permonst` | `js/monsters.js` copy from table |
| `cry_sound` | C function, retouched | `sounds.c:617–654`; reads `ptr.msound` not `mon_msound` |
| `growl_sound` | C function, retouched | `sounds.c:351–397`; now uses unified C numbers |
| `mon_msound` | adapter | returns `ptr.msound` when present; leftover mlet infer for stubs |
| `MS_*` locals in `sounds.js` | C enum copies | `monflag.h:10–59`; growl/cry share one table |
| `domonnoise` leader remap | C branch, retouched | `sounds.c:696–697` `msound > MS_ANIMAL` |
| `is_silent_hatch` | C predicate | `mondata.h` `msound == MS_SILENT`; now can be true **or** false |
| `peace_minded` / `set_malign` | named omit | still unread |
| `dogmove.js` `'MS_LEADER'` strings | pre-existing clone | compares **string** to numeric `msound`; still dead |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates in the JS hunk. Extractor is `scripts/`, not scored `js/`. Generated table is embed (D-0477). Rule #2 clean. Frozen contracts untouched.

## Constitution / playbook

Grep of the JS hunks: no FORCE/DIAG/fs/seed-gate. Mixing cadence **#1325** into the port SHA is process-smell (score was due), not a C-wrong. `msounds[]` in `js/generated/` is the D-0477 embed path, not a runtime `readFileSync` of `monsters.h`.

## C ↔ JS fidelity

### Extractor vs `SIZ` / `monflag.h`

C `monst.c:35`: `#define SIZ(wt, nut, snd, siz) wt, nut, snd, siz`. The old regex skipped `snd` and took the last identifier as `msize` (size was already correct). New regex: group 3 = sound, group 4 = size. `MS_SOUNDS` dict matches `monflag.h:10–59` including the dual `MS_TRUMPET = MS_ANIMAL = 17`.

Sampled `msounds[mndx]` against C `monsters.h` SIZ (35/35, `NUMMONS=383`):

| PM | C SIZ sound | table |
|----|-------------|------:|
| giant ant | `MS_SILENT` | 0 |
| killer bee / queen bee | `MS_BUZZ` | 10 |
| chickatrice | `MS_HISS` | 9 |
| jackal | `MS_BARK` | 1 |
| kitten | `MS_MEW` | 2 |
| raven | `MS_SQAWK` | 7 |
| baby / adult gray dragon | `MS_ROAR` | 3 |
| naga hatchling / adult red naga | `MS_MUMBLE` | 21 |
| giant eel | `MS_SILENT` | 0 |
| shopkeeper | `MS_SELL` | 39 |
| Twoflower / Carnarvon / Arch Priest | `MS_LEADER` | 36 |
| Minion of Huhetotl | `MS_NEMESIS` | 37 |
| student | `MS_GUARDIAN` | 38 |
| mumak | `MS_TRUMPET` | 17 |
| baby crocodile / crocodile | `MS_CHIRP` / `MS_BELLOW` | 8 / 4 |
| human zombie | `MS_GROAN` | 44 |

Not a hallucinated enum. Adult nagas are 21, not a skipped-field zero.

`mlets[]` stores `"S_ANT"` / `"S_EEL"` names, not C `monsym` characters. `cry_sound`’s eel test is `ptr.mlet === 'S_EEL'`, which matches **this** encoding (`defsym.h` `S_EEL` is `';'` in C). Equivalent.

### `cry_sound` — branch-by-branch, no RNG

C `sounds.c:617–654`: `ptr = mtmp->data`; `switch (ptr->msound)` with `default`+`MS_SILENT` → eel gurgle else chitter; `MS_HISS` hiss; `MS_ROAR`+`MS_GROWL` growl; `MS_CHIRP` chirp; `MS_BUZZ` buzz; `MS_SQAWK` screech; `MS_GRUNT` grunt; `MS_MUMBLE` mumble. Comment: oviparous subset, not every `MS_*`.

JS `sounds.js:405–427`: `ms = ptr?.msound | 0` — **C field**, not `mon_msound` inference. Same cases, `return` instead of `break`. **No `rn2` in `cry_sound`.** Hatch RNG lives in `hatch_egg` (`rnd(quan)`, maybe `rn2(2)` for `yours`, leftover `rnd(12)`). This SHA does not retouch those.

Before: every hatch hit default chitter. After: bee egg buzz, chickatrice hiss, baby dragon growl, raven screech, naga hatchling mumble, eel gurgle, ant chitter. That is the Must-fix. **Not** “Match C dispatch, callee is a stub.” `hatch_egg` already called real `cry_sound` (D-1036/D-1037); the **table** was the stub.

C caller (`timeout.c:1121`): `ing_suffix(cry_sound(mon))` in the carried-egg mommy/daddy gag. JS `timeout.js` already imported `cry_sound`; this SHA only stopped feeding it 0. `is_silent_hatch` (`timeout.js:894–896`) is `ptr.msound === 0`; with a real table, a buzzing bee hatch is not silent. C `is_silent` is the same test (`mondata.h`).

### `growl_sound` — C arms, unified numbers

Old growl locals: `MS_ROAR=6`, `MS_SQEEK=8`, `MS_SQAWK=9`, `MS_WAIL=12` vs C 3/6/7/14. Dogs still growled because inferred `MS_BARK=1` collided with C. Baby dragons (not inferred) would have hit `default` → `"scream"` instead of `"roar"`.

C `sounds.c:355–396`: MEW/HISS hiss; BARK/GROWL growl; ROAR roar; BELLOW bellow; BUZZ buzz; SQEEK squeal; SQAWK screech; NEIGH neigh; WAIL wail; GROAN groan; MOO `"low"`; SILENT commotion; default scream.

JS `sounds.js:438–468`: same arms, same strings, now on C numbers via `mon_msound` → `ptr.msound`. **No RNG in `growl_sound`.** Hallu `ROLL_FROM(h_sounds)` `rn2(35)` is in `growl`/`yelp`/`whimper`, unchanged (`H_SOUNDS.length` is 35). Match.

Side effect: jaguar is C `MS_GROWL=5`, not inferred `MS_MEW`. `yelp` now takes the GROWL arm (`"yelp"`/`"recoil"`) instead of MEW `"yowl"`. That is **more** C-faithful (`sounds.c:444–447`). Not a C-wrong.

### `mon_msound` leftover infer

```
if (ptr.msound != null) return ptr.msound | 0;
if (mlet === 'S_DOG') return MS_BARK;
…
```

After extract, real `mons()` always has a number (including `0`). `0 != null` is true, so silent ants return `MS_SILENT`, **not** a false bark. Inference is only for stub `data` without the field. Not a diverging clone on live monsters.

`cry_sound` does **not** go through this helper. Correct: C uses `ptr->msound`.

### `domonnoise` leader — dropped the omit-table shim

C `sounds.c:696–697`: `if (m_id == leader_m_id && msound > MS_ANIMAL) msound = MS_LEADER`. Then (else-if chain) guardian remap, `isshk → MS_SELL`, orc/moo/gecko.

Old JS: `(msound === 0 || msound > MS_ANIMAL)` because omitted tables made every leader look silent. New JS: `msound > MS_ANIMAL` only. Quest leaders extract as 36 (`> 17`). A poly’d leader whose form is `MS_SILENT` is **not** remapped in C; old JS would have remapped. Dropping the shim is C, not a regression.

JS still lacks C’s `isshk → MS_SELL`, guardian-genus remap, ORC→HUMANOID, MOO→BELLOW, gecko Hallu. Pre-existing named omit. This SHA did not claim full `domonnoise`. Early `msound === 0 && !isshk return` matches C `is_silent && !isshk` (`sounds.c:692–693`) now that silent is a real 0 and shopkeepers are 39.

### Callers still not reading the field

`peace_minded` / `set_malign` / several `m_initweap` MS_PRIEST/GUARDIAN/NEMESIS arms still gate by mndx/`urole`. Filling the table does not secretly finish those. Honest D-log. Map.

`dogmove.js` compares `data.msound === 'MS_LEADER'` (string). Numeric 36 never matches. Pre-existing dead clone; this SHA did not touch `dogmove.js`. Do not Must-fix it onto a cry_sound commit.

## Hallucinations / overclaim

“Match C SIZ/monflag.h msound so cry_sound uses real monster cries instead of always-chitter” is **true for the table and for `cry_sound`/`growl_sound` numbers.** This is **not** “Match C dispatch, callee is a stub.” `cry_sound` was already the C function; the omission was `permonst.msound`. Stamping D-1036 risk 3 **Addressed** is fair. Fill hash `178d60f2` in this commit.

Cadence **#1325** 44/44 does not prove a hatch mommy/daddy gag. Journal admits public **unhit**. Private stems (bee buzz / hiss / growl / screech / grunt / chirp / mumble / eel gurgle / ant chitter) are the right falsifier. Mixed cadence in the same SHA is the recurring process smell (score refresh was due at #1325); the port is not a score glued to a dead dump.

## Density (§2b)

One Must-fix: stop treating every `msound` as 0. Extractor field + `mons()` copy + cry/growl number unify. Related `domonnoise` shim deletion (same field). Right size. Not “finish sounds.c.” `peace_minded` left unread on purpose.

## Verification

Journal: private cry stems match C; green+strict PASS; quest/hatch cohort **7**/7 after the leader shim (seed0361/0367/0373/4500/0014). Full `sessions` **44**/44 Scr **11405**/11405 RNG **100%** speed `32+0.26/turn` (R² 0.87). Path **unhit** by public traces. Adequate: fortress plus private cry checks. Public traces do not hatch a bee egg in view.

This review iter did not re-run sessions (cadence already measured on this SHA). C read + table sample + JS hunk grep is the audit.

## Actionable C-wrongs

None that belong on Must-fix from **this** SHA. D-1036 risk 3 (empty `msound` → always chitter) is actually closed.

Named omits (map, not queue): `peace_minded`/`set_malign` **Addressed:** D-1079 `d7d679c1`; `m_initweap` priest/guardian **Addressed:** D-1088 `049af16e`; MS_NEMESIS mitem **Addressed:** D-1094 `46775b20`; `domonnoise` isshk/guardian/orc/moo/gecko; `dogmove` pal/target **Addressed:** D-1093 `e0b68f1d`; leftover `mon_msound` mlet infer for stubs.

Do not restore empty `msounds[]` or the `msound===0` leader shim. Do not restore growl `MS_ROAR=6`. Remaining Must-fix is D-1036 risk 4 `get_obj_location` flags `0` vs CONTAINED.

Note for that next pop (not a finding against **this** SHA): `js/timeout.js` `get_obj_location` already does C `zap.c:682–685` (`OBJ_CONTAINED` only if `locflags & CONTAINED_TOO`; `CONTAINED_TOO=0x1`). Hatch calls `get_obj_location(egg, 0)` (`timeout.c:1041`; JS `timeout.js:1025`). A port that “fixes” that switch without a C citation of a still-wrong `where` encoding or a diverging clone (`shk.js` local `locflags & 0x1`, `zap.js` `get_obj_location_zap`) is hunting a ghost. Prove the remaining gap or close the queue row.

C hatch comment (`timeout.c:1038–1040`): only INVENT/FLOOR/MINVENT; fail for MIGRATING, and for CONTAINED/BURIED when those flags are omitted. JS `where` enum matches `obj.h:75–81` (`OBJ_CONTAINED=2`). If contained eggs still hatch, the bug is `egg.where` not the flags mask.

## Verdict

- Verdict: **ACCEPT**
- Score: **8.5 / 10**
- One sentence: `mons().msound` is C `SIZ`/`monflag.h`, so `cry_sound` is no longer always-chitter and growl numbers match C; peace/malign still do not read the field.

Peace/malign later **Addressed:** D-1079 `d7d679c1`.
