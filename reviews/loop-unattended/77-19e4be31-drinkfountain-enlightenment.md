# Review 77 — 19e4be31 — `drinkfountain` case 19 MAGIC enlightenment (D-1116)

## Metadata
- Full / short hash: `19e4be31643f0ed99631460ec7608d4f49cbe193` / `19e4be31`
- Parent: `79438232` (D-1115). This file audits **this SHA only**. The fix stamped **Addressed:** D-1116 without the short hash; this review commit fills `19e4be31`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 23:39:04 +0200
- D-id: **D-1116**
- Stats: 11 files, +174 / −88 — `js/fountain.js` +15 / −7 (case 19 call); `js/invent.js` +107 / −88 (`doattributes(enl_mode)` BASIC vs MAGIC gates).
- Claims to close: Open queue `fountain.c` `drinkfountain` enlightenment body (named). Not dryup. Map already named MAGIC vs BASIC ^X. `reviews/loop-2026-08-15/` has no open enlightenment Must-fix.
- JS / map: `fountain.js` `drinkfountain`; `invent.js` `enlightenment` / `doattributes`. `c-js-map/data.md` fountain row. Potion/zap/artifact MAGIC callers, `fmt_elapsed_time`, remaining `attributes_enlightenment` arms still named.
- Prior reviews this SHA claims to close: none as Must-fix. Named Open after D-1115.

## Intent vs deliverable

Git subject promises: “Match C fountain.c drinkfountain so fate 19 shows MAGIC-only enlightenment instead of skipping it or routing through BASIC ^X.”

Old JS case 19 printed self-knowledgeable / `flush_topl_more` / exercise / subsides and **commented out** `enlightenment(MAGICENLIGHTENMENT, ENL_GAMEINPROGRESS)`. Even if it had called `enlightenment(..., final=0)`, that helper always ran `doattributes()` with no args — C `insight.c:2009–2018` ^X: `BASIC | (wizard||discover ? MAGIC : 0)`. A tourist fountain drink would have gotten Background/Basics/Characteristics and **no** MAGIC attributes (`magic` was `wizard||discover`). C `fountain.c:287–293` calls `enlightenment(MAGICENLIGHTENMENT, ENL_GAMEINPROGRESS)`: skip BASIC sections, always `status_enlightenment`, MAGIC `attributes_enlightenment`, Miscellaneous header + elapsed, bones/debug only if BASIC.

The diff **does** call `enlightenment(MAGICENLIGHTENMENT, ENL_GAMEINPROGRESS)` and teaches `doattributes(enl_mode)` those gates. It does **not** port potion/wand/artifact callers (they already go through `enlightenment` if they pass MAGIC — only fountain was skipping). It does **not** replace overlay `"none"` elapsed with `fmt_elapsed_time`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `drinkfountain` case 19 | C body, **rewritten** | `fountain.c:287–293`; was skip |
| `enlightenment` `!final` | C function, **retouched** | `insight.c:383–463`; JS overlay analog |
| `doattributes(enl_mode)` | C ^X wrapper, **retouched** | C `:2009–2018` calls enlightenment; JS inverted |
| BASIC background/basics/chars | C body, **gated** | skip when MAGIC-only |
| `status_enlightenment` | C body, **pre-existing subset** | always; `status_core_lines` |
| `attributes_enlightenment` | C body, **gated on MAGIC** | was wizard\|\|discover |
| Miscellaneous bones/debug | C body, **gated** | `insight.c:428` BASIC && (wizard\|\|discover\|\|final) |
| elapsed | C `fmt_elapsed_time`, **clone/wrong string** | overlay still `"none"` |
| `MAGICENLIGHTENMENT` / `BASIC` / `ENL_GAMEINPROGRESS` | C constants, **imported** | 2 / 1 / 0 ≡ `const.js` |
| `flush_topl_more` | C `display_nhwindow(WIN_MESSAGE,FALSE)`, **imported** | pre-existing |
| potion/zap MAGIC callers | C callers, **named omit** | other functions; shared callee now honors MAGIC |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched. **No new RNG** (case 19 has none; outer `rnd(30)` / mgkftn / `dryup` unchanged). Overlay paging still `nhgetch` (space/CR/ESC) — C in-progress uses a PICK_NONE menu; JS overlay analog is pre-existing, not a new input cheat.

## Constitution / playbook

Grep of the `js/fountain.js` + `js/invent.js` hunks: no trace-index gates. Contest Rule #2: no Node builtins. One await boundary still `nhgetch`.

## C ↔ JS fidelity

### drinkfountain case 19

C `fountain.c:287–293`:

```
case 19: /* Self-knowledge */
    You_feel("self-knowledgeable...");
    display_nhwindow(WIN_MESSAGE, FALSE);
    enlightenment(MAGICENLIGHTENMENT, ENL_GAMEINPROGRESS);
    exercise(A_WIS, TRUE);
    pline_The("feeling subsides.");
    break;
```

Then `dryup` after the switch (`:389`). JS `809–816` + `:917`: same order, `flush_topl_more` for the message window, `ENL_GAMEINPROGRESS` is 0. Match. This is **not** a skip and **not** `doattributes()` with no args.

### Call graph vs section gates

C: `doattributes` ( ^X ) **calls** `enlightenment(mode, 0)` with BASIC (OR MAGIC if wizard/discover). Fountain **calls** `enlightenment(MAGIC, 0)` directly.

JS: `enlightenment(mode, final=0)` **calls** `doattributes(mode)` and returns. `doattributes(null)` (cmd.js ^X) still builds BASIC | MAGIC-if-wizard. `doattributes(MAGICENLIGHTENMENT)` skips BASIC blocks.

The call graph is **inverted** (pre-existing: in-progress enlightenment was already the overlay). This SHA passes `mode` through so the overlay’s `if (mode & BASIC)` / `if (magic)` / bones gate match C `enlightenment` at `insight.c:406–428`, not C `doattributes`’s always-BASIC.

Say it explicitly: this is **not** “Match C dispatch, callee is a stub.” Case 19 calls `enlightenment`. The callee is the JS overlay analog of C `enlightenment`, not an empty function. It **is** still a partial analog of `status_enlightenment` / `attributes_enlightenment` (named in `invent.js` already: poly/vamp, most troubles, many resists). Wiring MAGIC-only through that analog is the C fix for this Open line.

### Section-by-section

C `insight.c:403–449` for MAGIC-only, `final=0`:

1. Title `"Name the Role's attributes:"` — JS title always.
2. `if (BASIC)` background / basics / characteristics — JS skipped.
3. `status_enlightenment` always — JS always `' Status:'` + `status_core_lines(..., { magic })` + weapon insight. C status includes weapon_insight. Match structure; content still a subset.
4. `if (MAGIC)` `attributes_enlightenment` — JS `if (magic)` Attributes block. **Old** JS used `magic = wizard \|\| discover`, so a non-wizard fountain drink would skip Attributes. **New** `magic = !!(mode & MAGICENLIGHTENMENT)` shows them. That is the C attributes gate.
5. `"Miscellaneous:"` always — JS always.
6. bones/debug iff BASIC && (wizard\|\|discover\|\|final) — JS BASIC && (wizard\|\|discover). MAGIC-only wizard fountain: **no** debug line. C same. ^X wizard: BASIC is set, debug line stays.
7. `fmt_elapsed_time` always — JS still `Total elapsed playing time is none`. Wrong string, pre-existing overlay debt, now visible on this newly wired path. Named. Not a skipped elapsed **line**.

Wizard ^X (`doattributes()` no args): mode = BASIC|MAGIC. Background stays. Match C `doattributes`. Non-wizard ^X: BASIC only, no Attributes. Match.

### dryup / exercise

C exercise then subsides then (after switch) dryup. JS same. Match.

## Hallucinations / overclaim

“Match C so fate 19 shows MAGIC-only enlightenment instead of skipping it or routing through BASIC ^X” is **true for the call, the BASIC skip, MAGIC attributes for non-wizards, and BASIC-gated bones/debug.** It is **not** true that the overlay is C’s NHW_MENU `enlightenment` pixel-for-pixel, that elapsed is `fmt_elapsed_time`, or that `attributes_enlightenment` is complete. The comment “MAGIC-only is not doattributes()” means “not the ^X BASIC wrapper”; the code **does** route in-progress MAGIC through `doattributes(mode)`.

Stamping **Addressed:** D-1116 is fair for the Open case-19 line. Hash `19e4be31` is filled on the archive row by this review commit.

## Density (§2b)

One Open cluster: C’s case 19 call + the in-progress enlightenment callee that call requires (mode gates). ~15 fountain + ~100 invent of related overlay gating, not “finish insight.c.” Did not pull `gush` `minliquid` / vomit poly / `update_inventory` (queue said not dryup).

## Verification

Journal: private canary **54**/54 (MAGIC vs ^X sections; wizard/explore bones-gate; stealth/MR/piety/mortality; drink 19 overlay + subsides; Levitation; mgkftn; default; refresh); green+strict seed8000/0900; cohort **22**/22 including 0014/0060/0116/0360/0361/0367/0373/0383/4500/2200 + strict 0014/0360/4500/2200/0004/0030/0009/0367/0116/0373/0060/0383. Path **public-unhit**. Cadence fortress is not a fate-19 proof.

C read of `fountain.c:243–390` / `:287–293`, `insight.c:383–463` / `:2009–2018`; JS `fountain.js:809–816`, `invent.js:1955–1961` / `2299–2738`, `cmd.js:1482–1483`, `const.js:1685–1687`. Hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| fate 19 tourist | MAGIC overlay, no Background, yes Attributes | **same gates** |
| fate 19 wizard | MAGIC, no debug Miscellaneous | **same** |
| ^X tourist | BASIC, no Attributes | **same** (no-arg) |
| ^X wizard | BASIC\|MAGIC + debug line | **same** |
| skip case 19 | (old JS) | **gone** |
| BASIC ^X on fountain | (old JS if called) | **gone** |
| elapsed text | `fmt_elapsed_time` | **still `"none"`** (named) |
| `dryup` after | yes | **same** |

## Actionable C-wrongs

None that Must-fix this next iter. Case 19 matches `fountain.c:287–293` and the MAGIC/BASIC gates match `insight.c:406–428`.

Named omits / do-nots (map / Open, not Must-fix):

1. Overlay elapsed `"none"` vs C `fmt_elapsed_time` (`insight.c:448–449`). Pre-existing analog; now on MAGIC-only too.
2. Remaining `attributes_enlightenment` / `status_enlightenment` arms (invent.js header already lists them).
3. Potion / wand / artifact MAGIC callers as first-class ports (shared callee now honors MAGIC if they call `enlightenment(MAGIC,0)`).
4. `gush` `minliquid` body. Live Open. Not this SHA.
5. Do not restore the case-19 skip. Do not route MAGIC-only through no-arg `doattributes()` (BASIC ^X). Do not drop Attributes for non-wizard MAGIC. Do not show bones/debug on MAGIC-only. Do not rewrite other `Antimagic()` clones this peel.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: fountain fate 19 now calls MAGIC-only enlightenment (no Background/Basics, yes Status/Attributes, no BASIC bones/debug) instead of skipping it or showing ^X, while overlay elapsed `"none"` and remaining insight arms stay named.
- Must-fix stays empty for this SHA; next port pops Open `fountain.c` `gush` `minliquid` body. Not dogushforth.
