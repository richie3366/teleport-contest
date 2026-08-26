# Review 506 — adfba7fc — worm.c detect_wsegs + map_monst showtail (D-1545)

## Metadata
- Full / short hash: `adfba7fce96b0d1fa0cb6abdf82d5a8fad2340cf` / `adfba7fc`
- Parent: `c9f09e97` (D-1544). This file audits **this SHA only** (sixth of nine `js/` commits since review **500**). Archive **Addressed:** D-1545 `adfba7fc`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-26 09:44:51 +0200
- D-id: **D-1545**
- Stats: `js/worm.js` +31 / −5, `js/detect.js` +26 / −15, `js/display.js` +20 / −1. Band 150–350 (js/ insertions 77).
- Claims to close: Open `worm.c` `detect_wsegs` (named from D-1544 / review **490**). Not `see_wsegs`. `reviews/loop-2026-08-15/` has no unpaid detect-wsegs Must-fix.
- JS / map: `worm.js` `detect_wsegs`; `detect.js` `map_monst` / `monster_detect`; `display.js` `show_wseg_detect_glyph`. `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **490** named `detect_wsegs`.

## Intent vs deliverable

Git subject promises: monster detection paints worm body segs via `show_glyph` (`what_mon` once, pet/mon/detected), not only the head.

Pinned C `worm.c` `detect_wsegs` `:502–519`; caller `detect.c` `map_monst` `:120–134` (`:132–133` `showtail && data==&mons[PM_LONG_WORM]`, always `detect_wsegs(mtmp,0)`); `monster_detect` `:831–834` TRUE + `S_WORM_TAIL` class; `do_vicinity_map` `:1531` FALSE. `display.h` `what_mon` `:197` `Hallucination ? random_monster(rng) : mon`; `random_monster` `(*rng)(NUMMONS)`.

```502:518:nethack-c/upstream/src/worm.c
void
detect_wsegs(struct monst *worm, boolean use_detection_glyph)
{
    int num;
    struct wseg *curr = wtails[worm->wormno];
    int what_tail = what_mon(PM_LONG_WORM_TAIL, newsym_rn2);

    while (curr != wheads[worm->wormno]) {
        num = use_detection_glyph ? detected_monnum_to_glyph(what_tail, ...)
              : worm->mtame ? petnum_to_glyph(what_tail, ...)
                : monnum_to_glyph(what_tail, ...);
        show_glyph(curr->wx, curr->wy, num);
        curr = curr->nseg;
    }
}
```

Old JS: `see_wsegs` live; `map_monst` painted the head only.

The diff **does** add `detect_wsegs` (what_mon once, skip dummy head, `show_glyph` not `newsym`) and wires `map_monst(showtail)` / `monster_detect` TRUE / vicinity FALSE / `S_WORM_TAIL`. It **does not** port head `pet_to_glyph`/`detected_mon_to_glyph`, male/fem offsets, `worm_known`, cutworm. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `detect_wsegs` `:502` | C, **LIVE this SHA** | body is C |
| `what_mon` | C `display.h:197`, **CLONE** inline | Hallu `rn2_on_display_rng(NUMMONS)` |
| `show_wseg_detect_glyph` | C `show_glyph`+pet/detected, **LIVE this SHA** | |
| `map_monst` showtail | C `:132–133`, **LIVE call / DEAD gate** | `data === mons(PM_LONG_WORM)` |
| `monster_detect` S_WORM_TAIL | C `:831–833`, **same DEAD gate** | |
| `do_vicinity_map` FALSE | C `:1531`, **LIVE** | no tails |
| `see_wsegs` | C `:487`, **LIVE** | not this SHA |
| head pet/detected glyphs | C `:124–129`, **OMIT named** | |
| `worm_known` / cutworm | C, **OMIT named** | |

`node scripts/sym.mjs detect_wsegs map_monst show_wseg_detect_glyph what_mon Hallucination see_wsegs`:

```
detect_wsegs     js/worm.js:285   sync
map_monst        NOT EXPORTED — 1 LOCAL js/detect.js:1105
show_wseg_detect_glyph js/display.js:287   sync
what_mon         NOT FOUND in js/** (inlined)
Hallucination    js/display.js:342   sync
see_wsegs        js/worm.js:250   sync
```

No clone deleted. `detect_wsegs` is a new export.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **Display RNG only** (`rn2_on_display_rng`); no core `rn2`.

## C ↔ JS fidelity

Body. `wtails[wormno]` until `!== wheads`; skip dummy. `what_mon` **before** the loop so dummy-only still burns display rng when Hallu. **Match `:506–518`.** JS extra `curr &&` vs C’s unchecked pointer is harmless if tails exist.

Glyphs. `use_detection_glyph` → inverse; else `mtame` → `mon_map_attr`; else plain `monnum_to_display_glyph`. `map_monst` always passes `false` like C `0`. **Match this caller.** Male/fem offsets named (same mlet on tty). `show_glyph` not `newsym`: minvis tails still paint. **Match.**

Hallu. `Hallucination()` then `rn2_on_display_rng(NUMMONS)` ≡ `random_monster(newsym_rn2)`. One roll for all segs. **Match `what_mon`.**

**Dispatch is not C.** C `:132` `mtmp->data == &mons[PM_LONG_WORM]` (static slot). JS `mons()` **allocates a new ptr every call** (`monsters.js:199–223`); `makemon` stores the spawn-time object (`data: ptr`). `mtmp.data === mons(PM_LONG_WORM)` is therefore **never true**. Same test in `monster_detect` for `S_WORM_TAIL`. `detect_wsegs` is live but **unreachable**. That is a C-wrong, not a named omit. Use `mndx`/`mnum`.

S_WORM_TAIL. C `mclass == S_WORM_TAIL` (`~`). JS `'S_WORM_TAIL'` matches this port’s mlet strings **if the gate ran**. It does not.

Head `map_monst` still `mon_glyph` (not pet/detected). **Named.**

Callee closure (showtail arm). LIVE: detect_wsegs body, show_wseg_detect_glyph, Hallucination, display rng. CLONE: what_mon inline. **STUB/dead: the PM_LONG_WORM identity test.** The arm must not have shipped behind a never-true `===`.

## Hallucinations / overclaim

Subject body segs via show_glyph: **true of the helper, false of any caller.** D-log canary “body `~` not dummy” cannot exercise production `map_monst` if it used `=== mons()`. Stamping **Addressed:** D-1545 as “Match C detect_wsegs” is **overclaim for the detect path**. This **is** “dispatch ported, callee never reached.” Do **not** stamp “Match C `worm_known`.” Do **not** stamp “Match C head `pet_to_glyph`.”

## Density

+77 JS: `detect_wsegs` + map_monst/monster_detect wiring. Did not glue `wake_nearto`. §2b OK **except** the dead gate.

## Branch-by-branch confirm

1. Helper dummy-only: no show_glyph; Hallu still rolls. **Match the function.**
2. Helper body segs: `~` / Hallu mnum, pet hilite, not newsym. **Match the function.**
3. `map_monst(true)` on a long worm: **does not call** `detect_wsegs`. **Not C.**
4. Vicinity `false`: heads only. **Match** (gate irrelevant).
5. Class `S_WORM_TAIL`: extra map **never**. **Not C.**

## Callers / RNG ledger

C: monster_detect TRUE; vicinity FALSE. JS the same signatures. Public-unhit. No seed gate. Canary that constructs worms and calls `detect_wsegs` directly would pass while detect maps stay head-only.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE.

## Verification

D-log canary **24**/24 (grep; dummy; body `~`; minvis; pet; inverse; Hallu one rng; dummy-only Hallu; Rule #2); green+strict; cohort **7**/7. **Public-unhit.** Admit it. Canary does **not** prove `map_monst` identity.

## Actionable C-wrongs

1. **`detect.c` `map_monst` / `monster_detect` PM_LONG_WORM test** (`:132`, `:832–833`): replace `mtmp.data === mons(PM_LONG_WORM)` with `mndx`/`mnum` (C `&mons[PM_LONG_WORM]`). One port. Do **not** re-do `detect_wsegs` body, `see_wsegs`, or head pet/detected glyphs.

Verdict: **QUALITY-RISK**

**Addressed:** D-1549 `34013957`
