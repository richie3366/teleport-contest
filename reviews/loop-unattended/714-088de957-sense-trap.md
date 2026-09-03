# Review 714 — 088de957 — detect.c sense_trap / display_trap_map (D-1753)

## Metadata
- Full / short hash: `088de9572b016dd84c3ef961104b5671feeb9d4d` / `088de957`
- Parent: `1e18143c` (D-1752). This file audits **this SHA only** (fifth of nine `js/` commits since review **709**). Archive **Addressed:** D-1753 `088de957`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-03 02:32:11 +0200
- D-id: **D-1753**
- Stats: `js/detect.js` +257/−31; `js/display.js` +10/−1; `js/hack.js` +1/−1. Total `js/` insertions **268** >250. Band **200–450**.
- Claims to close: Open `sense_trap` after D-1752 (parent `trap_detect` inlined `map_trap` over empty `game.ftrap`; maketrap pushes `level.traps`). Not `gold_detect`. Not findone `flash_glyph_at`/`foundone`/mimic. `reviews/loop-2026-08-15/` has no unpaid sense_trap Must-fix.
- JS / map: `detect.js` `sense_trap` / `detect_obj_traps` / `display_trap_map` / `trap_detect` / `findone`; `display.js` `random_object`; `hack.js` `closed_door`. `c-js-map/data.md` / `turns.md`.
- Prior: **699** cmap trap glyphs; this SHA is Hallu/cursed fake-object paint + chest/door/`strange_feeling`.

## Intent vs deliverable

Git subject promises: Hallu/cursed traps paint as `GOLD_PIECE` / `random_object` quan, and `trap_detect` walks chests, doors, and `strange_feeling`, instead of inlining `map_trap` over an empty `ftrap` after D-1752.

`node scripts/csym.mjs sense_trap` → `detect.c:864–897`. `--callers sense_trap`: `:942` dummy; `:979` ftrap; `:988` door dummy; `:1674`/`:1683` findone; zap.c comment only. `detect_obj_traps` `:904–953` (16 refs, findone + display + trap_detect). `display_trap_map` `:955–1003` (only trap_detect). `trap_detect` `:1010–1088` (`detect.c:1352` crystal ball; `read.c:2041` confused/cursed scroll). `findone` `:1637–1726`. `random_object` `display.h:187`. `map_redisplay` `:93–102`. `gold_detect` `:334–475` (not this SHA). `strange_feeling` `potion.c:1460–1476`.

```864:882:nethack-c/upstream/src/detect.c
    if (Hallucination || src_cursed) {
        struct obj obj; /* fake object */
        obj = cg.zeroobj;
        ...
        obj.otyp = !Hallucination ? GOLD_PIECE : random_object(rn2);
        obj.quan = (long) ((obj.otyp == GOLD_PIECE) ? rnd(10)
                           : objects[obj.otyp].oc_merge ? rnd(2) : 1);
        obj.corpsenm = random_monster(rn2); /* if otyp == CORPSE */
        map_object(&obj, 1);
```

```1010:1088:nethack-c/upstream/src/detect.c
    /* floor traps: first remote → display_trap_map return 0 */
    /* chests fobj / buried / minvent / invent */
    /* doors D_TRAPPED skip SDOOR */
    /* !found → strange_feeling toes stop itching return 1 */
    /* else Your toes itch return 0 */
```

Parent: no `sense_trap`; `trap_detect` scanned `game.ftrap` (empty) then `map_trap`+browse; findone `tseen`+`newsym`; no chests/doors/`strange_feeling`. The diff **does** add `sense_trap` (youprop `Hallucination()`, gameplay `rn2`/`rnd`), `detect_obj_traps`, `display_trap_map` (`cls`/`unconstrain`/`browse`/`reconstrain`), `trap_detect` chest/door/steed/`strange_feeling`, findone trap/door/chest via `sense_trap`, export `random_object` and `closed_door`. It **does not** add `flash_glyph_at`/`foundone`/mimic/hider/invis. Named. It **does not** add `gold_detect`. Named (`NOT FOUND`). It **does not** call `under_water`/`under_ground` after `docrt`. Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `sense_trap` `:864–897` | LIVE | Hallu/cursed fake obj; else `map_trap`+`tseen`; obsolete BEAR_TRAP kept |
| `detect_obj_traps` `:904–953` | LIVE local (C static) | `get_obj_location` + recurse `cobj`; flash/`foundone` OMIT named |
| `display_trap_map` `:955–1003` | LIVE local | unconstrain+chests+ftrap+doors+browse; under_* OMIT |
| `trap_detect` `:1010–1088` | LIVE repaired | `ftrap_list` = `level.traps`; chests/doors/`strange_feeling` |
| `findone` trap/door/chest | LIVE partial | `sense_trap` + `detect_obj_traps`; flash/mimic still OMIT |
| `random_object` `:187` | LIVE export | `rng(NUM_OBJECTS-FIRST_OBJECT)+FIRST_OBJECT` |
| `random_monster` | LIVE export | already existed; now exported for `corpsenm` |
| `closed_door` | LIVE import | hack.js export; did **not** add clone #11 |
| `map_object` / `map_trap` | LIVE | display.js |
| `get_obj_location` | LIVE import | timeout.js; BURIED_TOO\|CONTAINED_TOO |
| `strange_feeling` | LIVE | detect.js export; null sobj returns |
| `unconstrain_map` / `reconstrain_map` | LIVE | detect.js; called from display_trap_map |
| `Hallucination()` | LIVE import | display.js youprop (not sticky) for GOLD vs random |
| `ftrap_list` / `floor_objects` / `iter_objs` | JS-only | fobj/nobj stand-ins |
| `flash_glyph_at` / `foundone` | OMIT named | NOT FOUND |
| `gold_detect` | OMIT named | NOT FOUND |
| `under_water` / `under_ground` | OMIT named | after map_redisplay docrt |

`node scripts/sym.mjs` (deleted/re-pointed + new):

```
sense_trap       js/detect.js:1504   sync
detect_obj_traps LOCAL js/detect.js:1535  (C staticfn — not clone #2)
display_trap_map LOCAL js/detect.js:1575
trap_detect      js/detect.js:1629   ASYNC
random_object    js/display.js:964   sync
random_monster   js/display.js:956   sync
closed_door      js/hack.js:103   sync  (+ 10 other clones; this SHA imports)
gold_detect      NOT FOUND
flash_glyph_at   NOT FOUND
foundone         NOT FOUND
map_trap         js/display.js:1395   sync
strange_feeling  js/detect.js:203   ASYNC
get_obj_location js/timeout.js:628   sync
Hallucination    js/display.js:455   sync
```

Re-point: none (no prior local `sense_trap`/`random_object`). `closed_door` local in hack → export. `node scripts/imports.mjs --can detect.js display.js random_object` / `timeout.js get_obj_location` / `hack.js closed_door`: **ALREADY**. FORCE/DIAG/`getRngLog`/`fastforward`/seed names in the `js/` hunks: **none**. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**`sense_trap` Hallu/cursed (`:867–882`).** C `Hallucination \|\| src_cursed` then fake `zeroobj`; coords from trap else x,y; `otyp = !Hallucination ? GOLD_PIECE : random_object(rn2)`; quan `rnd(10)` / `oc_merge ? rnd(2) : 1`; **always** `random_monster(rn2)` into `corpsenm`; `map_object(&obj, 1)`. JS `Hallucination()` (youprop) twice like C’s macro; `const obj = {}` (not a full zeroobj — `map_object`/`obj_glyph` read `otyp`/`ox`/`oy`/`oclass` from `game.objects[otyp]`). **Match the rng order:** `random_object(rn2)` then `rnd` then `random_monster(rn2)`. `src_cursed && !Hallu` → GOLD + `rnd(10)` — **Match.** Then `map_object` → C `obj_to_glyph(..., newsym_rn2)` Hallu arm **discards** that otyp and burns **display** rng (`random_obj_to_glyph`). JS `obj_glyph` does the same **if** sticky `u.Hallucination` (pre-existing vs youprop). Cursed-not-Hallu does **not** take that arm. **Match compiled C for the GOLD path.** Do not stamp “Match C sticky vs youprop in `obj_glyph`.”

**Non-Hallu trap (`:883–885`).** `map_trap(trap, 1); trap->tseen = 1`. JS the same. LIVE `map_trap`. **Match.** Dummy door/chest objects are traps with `ttyp` TRAPPED_DOOR/CHEST.

**Obsolete no-trap (`:886–895`).** C comment unreachable; still sets dummy BEAR_TRAP + `map_trap`. JS keeps it. **Match the dead arm.**

**`detect_obj_traps` (`:904–953`).** `dummytrap.ttyp = TRAPPED_CHEST`. For each nobj: if box+otrapped **or** Has_contents → `get_obj_location(..., BURIED_TOO\|CONTAINED_TOO)` else continue (skips recurse). Box+otrapped: `tknown`, `observe_object`, `OTRAP_HERE` if `u_at` else THERE; **if ft: `flash_glyph_at`**; if show: `sense_trap` dummy; **if ft: `foundone` + `num_traps++`**. Then Has_contents recurse `cobj`. JS the same predicates and bits; **skips flash/`foundone`**, still increments `num_traps` when `ft`. Named. `how` is cursed_src (0/1) into `sense_trap`. **Match the live callees.** `iter_objs` array vs nobj is the invent/fobj stand-in, not a second C function.

**`display_trap_map` order (`:955–1003`).** C: `cls`; `unconstrain_map`; buried chests; **fobj** chests; fmon minvent (skip dead/gd !mx); invent; **ftrap** `sense_trap`; dummy TRAPPED_DOOR over `doors[0..doorindex)` skip SDOOR; `glyph_at` hero: if not trap and not object → `newsym` + `TER_MON`; `You_feel` greedy/entrapped; `browse_map`; `map_redisplay` (reconstrain+`docrt`+under_*). JS: `cls`; `unconstrain_map` **LIVE** (clears uinwater/uburied/uswallow into iflags); buried; `floor_objects()` (cell `nexthere`, no fobj chain); fmon; invent; `ftrap_list()` (`level.traps`); doors; hero cell clone (below); `You_feel`; extra `flush_topl_more`; `browse_map`; **`reconstrain_map` then `map_redisplay`**. JS `map_redisplay` is `docrt`+`flush_screen` **without** reconstrain/under_* — reconstrain was lifted to this caller so browse still sees the unconstrained map. **Match C order.** `under_water(2)` / `under_ground(2)` after `docrt` named.

**Hero `glyph_is_trap \|\| glyph_is_object` (`:992–996`).** C reads gbuf after `sense_trap`. JS: `disp_kind === 'unexplored' \|\| !disp_ch` → `newsym`+`TER_MON`. After `cls`, empty cells are unexplored. After `map_object`/`map_trap`, `show_glyph_cell` sets `disp_ch` (gold/trap is not space) so the clone **skips** `newsym` like C skip on object/trap glyphs. Hallu/cursed underfoot does **not** set `tseen`; occupancy `gbuf_show_kind` may stamp `'other'` not `'object'`; the empty-ch test still skips. Extra `newsym` would require paint leaving empty `disp_ch` — `show_glyph_cell` stores `ch`. **Clone matches the skip/keep split**, not integer `glyph_is_*`. Named: no `GLYPH_*` ids.

**`trap_detect` (`:1010–1088`).** `cursed_src = sobj && sobj->cursed` (crystal ball NULL → 0). Steed `mx,my = ux,uy`. First **remote** ftrap → full map return 0; underfoot-only sets `found`. Then fobj / buried / minvent with `OTRAP_THERE` → map; invent **never** early-maps (carried chest = toes itch). Doors skip SDOOR; remote D_TRAPPED → map. `!found` → `strange_feeling(sobj, "Your toes stop itching.")` return 1; else `Your toes itch` return 0. JS `ftrap_list` uses `level.traps` (parent’s empty `game.ftrap` was the named lie). `floor_objects` for fobj. `strange_feeling` LIVE; null `sobj` returns after pline (`potion.c:1469–1470`). **Match the Open.** Parent returned 1 with **no** strange_feeling.

**`findone` (`:1637–1726`).** C: dead/gd null mtmp; `ft_cc = zx,zy`; SDOOR/SCORR flash+cvt+`foundone`; trap `!tseen` && not STATUE: flash, tseen, **`sense_trap`**, foundone, count; closed_door && D_TRAPPED: dummy, flash, tseen, sense_trap, foundone, count; `detect_obj_traps` buried/fobj/minvent/invent with `ft`; mimic/hider/invis. JS this SHA: `ft_cc`; SDOOR/SCORR still no flash (pre-existing named); trap tseen+`sense_trap`+count; door dummy+sense_trap+count; `detect_obj_traps` with `ft` (counts, no flash); **still no** mimic/hider/invis. Named. `closed_door` import **Match C `:1678`.** Parent used `newsym` instead of `sense_trap` (no Hallu gold). **Match the trap/door/chest add.**

**`random_object` (`display.h:187`).** `(*rng)(NUM_OBJECTS - FIRST_OBJECT) + FIRST_OBJECT`. JS the same; default display rng, `sense_trap` passes gameplay `rn2`. **Match.**

**RNG call-for-call (Hallu trap).** `random_object(rn2)` + `rnd(10\|2)` + `random_monster(rn2)` then `map_object` display rng. Uncursed not-Hallu: **no** those burns (`map_trap` only). Catch `!found` / toes: **no** rng in `sense_trap`. Canary 13/13 covered GOLD `rnd(10)` and Hallu object+merge+`random_monster`. **Match those burns.** `flash_glyph_at` rng named omit (findone would burn it).

**`You_feel` + browse (`:997–1000`).** C `You_feel("%s.", cursed_src ? "very greedy" : "entrapped")` then `browse_map(ter_typ, cursed_src ? "gold" : "trap of interest")`. JS the same strings; extra `flush_topl_more` before getpos (JS `--More--`, not a C `if`). `ter_typ` starts `TER_DETECT | (cursed_src ? TER_OBJ : TER_TRP)`; `TER_MON` only when hero `newsym`. **Match.**

**`unconstrain_map` (`:68–81`).** Snapshot/clear `uinwater`/`uburied`/`uswallow` (bypass `set_uinwater`). JS writes `iflags.save_*` and zeros the three. Return value unused here (C `(void)`). **Match.** Swallow/water hero sees the unconstrained map during `browse_map`, then reconstrain. Parent never cleared those flags.

**`cls` then paint.** C `cls()` blanks gbuf. JS `cls` sets cells unexplored. Then `sense_trap` `show_glyph_cell` writes `disp_ch`. Hero-cell clone relies on that. **Match the sequence.**

**`OTRAP_NONE/HERE/THERE`.** C `#define` 0/1/2. JS the same. Invent-only trapped box: `OTRAP_HERE`, `found=TRUE`, no `display_trap_map`. **Match C `:1060–1061`.**

**`STATUE_TRAP` skip (`:1670–1672`).** findone does not reveal statue traps. JS `ttmp.ttyp !== STATUE_TRAP`. **Match.**

**`D_TRAPPED` vs `wall_info`.** C skip SDOOR because the bit overlays wall_info. JS skip `typ === SDOOR`; `doormask ?? flags`. Doors[] should be doors. **Match the skip.**

**`map_object_observe_near` on the fake obj.** C `map_object` may `observe_object` if generic + `cansee` + near + !Hallu. Fake GOLD is not generic-unidentified in the usual sense; cursed-not-Hallu GOLD can take the observe arm. Pre-existing `map_object`. Not a new clone.

**`trap_detect` first remote ftrap returns immediately** — does **not** scan remaining chests first. C the same (`:1026–1028`). A remote floor trap hides whether chests exist until `display_trap_map` walks everything. **Match.**

**Crystal ball `trap_detect(NULL)` (`:1352`).** `cursed_src` 0; `strange_feeling(NULL, ...)` returns after pline (`:1469–1470`). JS `sobj` falsy. **Match.** Scroll `read.c:2041` confused/cursed uses this function; blessed gold is `gold_detect` (named, NOT FOUND).

**`dummytrap` reuse.** C one static; JS one object. Door arm overwrites `ttyp`/`tx`/`ty`. Chest arm sets `TRAPPED_CHEST` at the start of each `detect_obj_traps`. **Match.** Do not allocate per call.

**`show_them` vs `how`.** trap_detect scan uses `FALSE, 0` (count only). display_trap_map uses `TRUE, cursed_src` (paint, maybe GOLD). findone uses `TRUE, 0, found` (paint + count). JS the same three signatures. **Match.**

**Parent `trap_detect` `You_feel('entrapped')` always** even for cursed_src. This SHA uses greedy vs entrapped from `cursed_src`. **Match C `:997`.**

**`BODY_PART(TOE)` / `makeplural`.** LIVE. “stop itching” vs “itch”. **Match the two messages.**

**`browse_map` `getpos`.** LIVE detect.js. Terrainmode + autodescribe. Not a stub. **Match C `:1000`.**

**Callee closure (`sense_trap` + `trap_detect` → `display_trap_map`).** LIVE: `Hallucination()`, `random_object`, `random_monster`, `rnd`/`rn2`, `map_object`, `map_trap`, `detect_obj_traps` (body ports C minus flash), `get_obj_location`, `observe_object`, `unconstrain_map`, `reconstrain_map`, `cls`, `browse_map`, `strange_feeling`, `body_part`/`makeplural`, `closed_door`, `You_feel`. OMIT named: `flash_glyph_at`, `foundone`, mimic/hider/invis, `gold_detect`, `under_water`/`under_ground`. STUB in the Hallu/`trap_detect` arms: **none**. findone flash is a **named** skip in a pre-existing partial, not a new TODO stub pretending to flash. Not “dispatch ported, callee stubbed” for the Open (`sense_trap` / chests / doors / strange_feeling).

## Hallucinations / overclaim

Subject “Hallu/cursed GOLD/`random_object` quan; trap_detect chests/doors/`strange_feeling`”: **true**. D-log “empty `game.ftrap`”: **true** (`ftrap_list` → `level.traps`). Do **not** stamp “Match C `gold_detect`.” Do **not** stamp “Match C `flash_glyph_at`/`foundone`.” Do **not** stamp “Match C findone mimic/hider/invis.” Do **not** stamp “Match C `under_water`/`under_ground`.” Do **not** stamp “Match C integer `glyph_is_trap`.” Do **not** stamp “Match C `obj_glyph` youprop Hallucination” (sticky). Journal “fortress held” is not a crystal-ball trap map. Cohort **7**/7 (D-log), not 9. Canary **public-unhit** for browse_map / Hallu gbuf. Admit that.

## Density

§2b: `sense_trap` + its display/detect/findone callers so Hallu gold and chests/doors share one helper. +268. Related `random_object` export + `closed_door` export. Did **not** glue `gold_detect` / `sound_speak`. Did **not** invent flash. Did **not** reopen D-1752 SetVoice.

## Verification

D-log: save-oracle skip (untagged `detect.c:sense_trap`); node 13/13 (cursed GOLD `rnd(10)`; uncursed tseen; Hallu object+merge+`random_monster`; empty trap_detect returns 1); green+strict seed8000/0900; CURRENT cohort **7**/7 + strict. Rule #2 clean. Crystal-ball / cursed-gold-scroll trap map **public-unhit**. Admit that.

## Actionable C-wrongs

None for Must-fix (`sense_trap` rng/GOLD/`map_trap` and `trap_detect` chest/door/`strange_feeling` match C; remaining are named). Named: findone flash/`foundone`/mimic/hider/invis; `gold_detect`; `under_water`/`under_ground`; integer `glyph_is_*`. Do **not** add `flash_glyph_at` that `fopen`s. Do **not** walk empty `game.ftrap`. Do **not** `newsym` instead of `sense_trap` on findone traps. Do **not** skip `strange_feeling` when `!found`. Do **not** add `closed_door` clone #11. Do **not** re-port D-1752. Do **not** make `SetVoice`/`sound_speak` this cluster.

Verdict: **ACCEPT-WITH-DEBT**
