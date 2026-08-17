# Review 97 — 52aea3d1 — mongrantswish tmp_at glyph hide (D-1136)

## Metadata
- Full / short hash: `52aea3d11a7cdde9336d2649a2479060b2b7cc7c` / `52aea3d1`
- Parent: `b166bda5` (D-1135). This file audits **this SHA only**. The fix stamped **Addressed:** D-1136 without the short hash; this review commit fills `52aea3d1`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 05:00:33 +0200
- D-id: **D-1136**
- Stats: 11 files, +136 / −47 — `js/fountain.js` +38 / −13 (`mongrantswish` snapshot + `tmp_at` wrap). Also stamps review **86** D-1136 line (hash left blank — filled here).
- Claims to close: Open queue `fountain.c` `mongrantswish` `tmp_at` glyph hide (named). Not dowaterdemon makemon. Review **86** named omit 3 / **85** named hide; D-1135 next-port. `reviews/loop-2026-08-15/` has no open mongrantswish Must-fix.
- JS / map: `fountain.js` `mongrantswish` / `dowaterdemon`; `display.js` `tmp_at` (untouched); `zap.js` `makewish` (untouched). `c-js-map/data.md` fountain. Full C `mongone` / `djinni_from_bottle` still named.
- Prior reviews this SHA claims to close: **86** named `tmp_at` hide; **85** named gas/`hcolor` leftovers.

## Intent vs deliverable

Git subject promises: “Match C potion.c mongrantswish so the wish prompt still shows the monster via tmp_at(DISP_ALWAYS, glyph_at) after removal, instead of leaving an empty cell.”

Old JS spliced the demon off `fmon`, zeroed `mx/my`, `newsym`’d, then `makewish` — the prompt map showed the uncovered fountain. C `potion.c:2794–2811` captures `glyph_at(mx,my)` (gbuf, **not** `levl[].glyph`), `mongone`s, nulls the caller pointer, then `tmp_at(DISP_ALWAYS, glyph)` / `tmp_at(mx,my)` around `makewish`, then `tmp_at(DISP_END, 0)`.

The diff **does** snapshot `loc.disp_*` before the existing D-0472 splice+newsym and wrap `makewish` in real `tmp_at`. It does **not** call `mon.js` `mongone()`, port `mdrop_special_objs` / `discard_minvent` / `m_detach`, or wire `djinni_from_bottle`. Named. It does **not** recompute `mon_to_glyph` (would burn Hallu display-rng C does not burn here).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `mongrantswish` tmp_at wrap | C body, **rewritten** | `potion.c:2794–2811` |
| `glyph_at` | C callee, **clone** | `display.c:2478–2482` gbuf; JS `loc.disp_*` copy |
| `tmp_at` | C callee, **imported** | `display.js:1696+`; `DISP_ALWAYS=-5` / `DISP_END=-7` ≡ `display.h` |
| `makewish` | C callee, **imported** | `zap.js`; getlin + `readobjnam` (partial, pre-existing) |
| splice+newsym | C `mongone` subset, **kept** | D-0472; not `mon.js` `mongone()` |
| `mongone` full | C callee, **named omit** | `mon.c:3267–3283` mdrop / discard / `m_detach` |
| `*monp = 0` | C caller notify, **named omit** | JS pass-by-reference object; `dowaterdemon` does not use `mtmp` after |
| `djinni_from_bottle` | C caller, **named omit** | `potion.c:2845`; JS still unwired |
| `dowaterdemon` | C caller, **untouched** | already `await mongrantswish(mtmp)` |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. `mx/my` are the live monster cell captured **before** zeroing. Rule #2 clean. Frozen contracts untouched.

**New RNG on this path:** none in the snapshot/`tmp_at` wrap. Capturing `disp_*` avoids `mon_to_glyph` / `newsym_rn2` Hallu display-rng (C `glyph_at` is gbuf, not a recompute). `makewish` may later burn core rng on a granted object — existing helper.

## Constitution / playbook

Grep of the fountain hunk: no trace-index gates. Contest Rule #2: in-process ESM. Do not `mon_to_glyph` here. Do not pull full `mongone` or `djinni_from_bottle` into this SHA. Do not skip `DISP_ALWAYS` for `!cansee` (that is FLASH).

## C ↔ JS fidelity

### Order

C `potion.c:2796–2811`:

```
mon = *monp;
mx = mon->mx; my = mon->my; glyph = glyph_at(mx, my);
mongone(mon);
*monp = 0;
tmp_at(DISP_ALWAYS, glyph);
tmp_at(mx, my);
makewish();
tmp_at(DISP_END, 0);
```

JS `537–565`: save `mx/my`; build `{ch,color,dec}` from `game.level.at(mx,my).disp_*` (or `'.'` / color 0 if missing); splice `fmon`; zero `mtmp.mx/my`; `newsym` if `mx||my`; `tmp_at(DISP_ALWAYS, glyph)`; `tmp_at(mx, my)` using the **saved** coords; `await makewish()`; `tmp_at(DISP_END, 0)`. Capture-before-removal then overlay-during-prompt then END matches C’s hide comment. Match on the Open **wrap**.

### `glyph_at` clone vs C gbuf

C `display.c:2478–2482`: OOB (`x<0\|\|y<0\|\|x>=COLNO\|\|y>=ROWNO`) → `cmap_to_glyph(S_room)`; else `gg.gbuf[y][x].glyphinfo.glyph` — the third screen, **not** `levl[].glyph`. JS has no integer glyphs. `show_glyph_cell` (`display.js:1416–1428`) writes `loc.disp_ch/color/decgfx`; serialize reads those fields. Copying `disp_*` **before** `newsym` is the gbuf analog, not `levl.typ`. OOB fallback `{ch:'.', color:0}` is S_room-ish, not a themerms coordinate. A live water demon is on-map (`makemon` at/near hero), so the OOB arm is not the Open path.

This is a **clone**, not a no-op. It is not `mon_to_glyph(mtmp, newsym_rn2)` (would Hallu-roll). C explicitly uses gbuf so the wish map shows whatever was already drawn (hero, `I`, or the demon). JS same if `disp_*` was last painted by `newsym` after `makemon`. Named as analog, not Must-fix: the port has no shared `glyph_at()` integer, and this copy is the same representation `tmp_at` already consumes (`glyph` object `{ch,color,dec}`).

### `tmp_at` is not a stub

Say it explicitly: this is **not** “Match C dispatch, callee is a stub.” `tmp_at` (`display.js:1696–1781`) already implements DISP_ALWAYS (paint even when `!cansee`; FLASH would `break` at `:1772`) and DISP_END (`newsym` of the saved cell, pop glyph stack). Constants `DISP_ALWAYS=-5`, `DISP_END=-7` match `display.h:231–233`. Open: `tmp_at(DISP_ALWAYS, glyph)` stores the glyph object and `flush_screen(0)`. Step: `tmp_at(mx,my)` `show_glyph_cell`s that glyph onto the saved cell. Close: `newsym` restores the fountain under the overlay. `makewish` is a real getlin prompt (help/history/random-after-MAXWISHTRY still named on zap.js). The Open line is the **hide around that prompt**.

C captures glyph **before** `mongone` so gbuf still holds the monster (or `I`, or `@` if they share a cell). JS copies `disp_*` before `newsym`. After `makemon` of a water demon, `newsym` has already painted that cell; the copy is that paint, not a second glyph computation. `dowaterdemon` `makemon(..., u.ux, u.uy, MM_NOMSG)` typically `enexto`s off the hero, so gbuf at `(mx,my)` is the demon, not `@`.

### `mongone` remains a subset

C `mon.c:3267–3283`:

```
mdef->mhp = 0;
if (mdef->isgd && !grddead(mdef))
    return;
unstuck(mdef);
mdrop_special_objs(mdef);
discard_minvent(mdef, FALSE);
m_detach(mdef, mdef->data, FALSE);
```

JS does **not** call `mon.js` `mongone()` (itself already a named subset: splice, zero, `newsym`, clear ustuck/usteed, `minvent=null`). The inline peel only splices + zeros + `newsym`. Amulet-on-demon / invent discard / `m_detach` timers stay named (D-0472). C keeps stale `mx/my` on the object after `m_detach` unlinks it from the map; JS zeros “so later `m_at` misses” — documented clone, not this SHA’s claim. `dowaterdemon` does not `mintrap` after a wish (`if` / `else if`), so `*monp=0` is not needed to prevent a second arm. `djinni_from_bottle` is unwired.

Do not read the tmp_at wrap as a close of full `mongone`. The subset is enough to keep the demon out of a wish-fatal bones file (off `fmon`), which is C’s stated reason for removing first (`potion.c:2800–2802`).

## Hallucinations / overclaim

D-log / CURRENT / subject say the wish prompt still shows the monster via `tmp_at(DISP_ALWAYS, glyph_at)` after removal, gbuf not `mon_glyph`. That is the hunk: snapshot, splice+newsym, ALWAYS+step, `makewish`, END. They name full `mongone` and `djinni_from_bottle`. Stamping **Addressed:** D-1136 is fair for the Open **hide**. Fill hash `52aea3d1` in this commit. Do **not** stamp it as “Match C `mongone`” or a `djinni_from_bottle` wish. `glyph_at` here is a **gbuf clone** (`loc.disp_*`), not a new shared `glyph_at()` — say so; it is not a stub of the hide.

## Density

One C function’s hide envelope (capture, remove, `tmp_at` sandwich). Full `mongone` / djinni left named. ~38 JS. Right size (§2b caller/callee cluster). Slightly denser than D-1134; not “finish potion.c wishes.”

## Verification

Journal: private canary **27**/27 (source order; gbuf copy not `mon_glyph`; ALWAYS vs FLASH `!cansee`; hide during `makewish`; off-fmon bones; END restores fountain; nothing-wish no core rng; null/`mx=0`); green+strict seed8000/0900; cohort **24**/24 including 0006 demon + 0014 fountain + 0007 snakes + 0002 drinksink + 0383/0399 Hallu + 0108/0360/2200/4500 + strict 8000/0900/0002/0014/0006/0106/0108/0360/2200/4500/0030. Path **public-unhit** on the wish hide (seed0006 spawn still matches). This audit’s full `sessions` (cadence **#1445**) **44**/44 Scr **11405**/11405 RNG **792838**/792838 — no regression.

C read of `potion.c:2794–2811`, `:2840–2846`, `display.c:2478–2482`, `display.h:231–233`, `mon.c:3267–3283`, `fountain.c:78–82`; JS `fountain.js:537–565`, `:606–624`, `display.js:1416–1428`, `:1696–1781`, `mon.js:1631–1647`. Hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| capture then mongone then overlay | gbuf; mongone; ALWAYS | **gbuf clone; subset remove; ALWAYS** |
| `!cansee` dest | ALWAYS still paints | **same** (not FLASH) |
| `makewish` prompt | monster glyph visible | **same intent** |
| DISP_END | `newsym` saved cell | **same** |
| Hallu recompute | no (`glyph_at` gbuf) | **same** (no `mon_glyph`) |
| full `mongone` | mdrop/discard/detach | **named subset** |
| `djinni_from_bottle` | also calls | **named skip** |

## Actionable C-wrongs

None that Must-fix this next iter. The Open wrap matches `potion.c:2805–2811`. `tmp_at` is the real callee. The `glyph_at` clone is the gbuf analog this port uses everywhere else.

Named omits / do-nots (map / Open, not Must-fix):

1. Full C `mongone` (`mon.c:3267–3283`) — `mdrop_special_objs` / `discard_minvent` / `m_detach`; JS does not even call `mon.js` `mongone()`.
2. `djinni_from_bottle` `mongrantswish(&mtmp)` (`potion.c:2845`).
3. Shared integer `glyph_at()`; OOB `cmap_to_glyph(S_room)` vs `'.'`.
4. Next Open: `region.c` `make_gas_cloud` enveloped pline (`region.c:1197–1203`). Not `create_gas_cloud` size-1. **Addressed:** D-1137 `50136436`.
5. Do not restore splice+`makewish` without `tmp_at`. Do not `mon_to_glyph` here. Do not use DISP_FLASH (would skip `!cansee`). Do not pull `djinni_from_bottle` into this hide peel.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `mongrantswish` now snapshots gbuf `disp_*` and wraps `makewish` in real `tmp_at(DISP_ALWAYS)` so the prompt still shows the removed monster, while full `mongone` and `djinni_from_bottle` stay named.
- Must-fix stays empty for this SHA; next port popped Open `region.c` `make_gas_cloud` enveloped pline. **Addressed:** D-1137 `50136436`. Not create_gas_cloud size-1.
