# Review 748 — e8515402 — pager.c trap_description / detect.c trapped_* (D-1779)

## Metadata
- Full / short hash: `e851540277cbdd7eff0ac7ce45a6b578a54b268c` / `e8515402`
- Parent: `f33d241d` (audit 728–737). First `js/` SHA after that overlay. This file audits **this SHA only**.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-03 19:03:21 +0200
- D-id: **D-1779**
- Stats: `js/detect.js` +65/−1; `js/pager.js` +33/−4. Total `js/` insertions **92** ≤250. Band **150–350**.
- Claims to close: Open `pager.c` `trap_description`. The SHA itself enqueued lookat `glyph_to_trap` vs `t_at` as the **next** Open row — that is the live path, not optional plumbing.
- JS / map: `pager.js` `trap_description`; `detect.js` `trapped_chest_at`/`trapped_door_at`. `c-js-map/turns.md`.
- Archive **Addressed:** D-1779 `e8515402` — helper bodies; lookat tnum is **not** fixed.

## Intent vs deliverable

Git subject promises: Match C `pager.c` `trap_description` so a **detected trapped chest or door is named as one** and **burns its Hallucination `rn2(20)`**, instead of every trap glyph answering with `trapname`.

`node scripts/csym.mjs trap_description` → `pager.c:166–181`. `trapped_chest_at` `detect.c:137–177`. `trapped_door_at` `:180–197`. `--callers trap_description`: `lookat` `:719–721` (`glyph_is_trap` → `glyph_to_trap(glyph)` → `trap_description`); `look_traps` `:2093–2094`. `glyph_to_trap` `display.h:671–674`.

```719:721:nethack-c/upstream/src/pager.c
    } else if (glyph_is_trap(glyph)) {
        int tnum = glyph_to_trap(glyph);
        trap_description(buf, tnum, x, y);
```

Parent: every trap glyph → `trapname`. The diff **does** port the three helpers (chest-before-door, ttyp-before-Hallu short-circuit). It **does** call `trap_description` from `brief_at` / `describe_looked`, still gated on **`t_at && tseen`**. `maketrap` returns null for `TRAPPED_DOOR`/`TRAPPED_CHEST` (`js/trap.js:854`). Detection paints via `dummytrap` + `map_trap`; nothing is on `ftrap`. **`t_at` can never see the semi-real traps this function exists for.** `auto_describe_text` still `trapname`. `look_traps` still a stub. `glyph_to_trap` is **NOT FOUND**.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `trap_description` | LIVE new (local) | C `staticfn`; do not write #2 |
| `trapped_chest_at` / `trapped_door_at` | LIVE new | detect.js exports |
| `trapname` | LIVE import | fallback |
| `glyph_is_trap` | LIVE import | |
| `glyph_to_trap` | **OMIT** | `sym.mjs` NOT FOUND — C lookat’s tnum |
| `t_at` | LIVE (wrong tnum) | still the lookat gate |
| `brief_at` / `describe_looked` | LIVE repaired **wrong gate** | comments cite `:719–721` |
| `auto_describe_text` | missed clone | `getpos.js:666` still `trapname` |
| `look_traps` | STUB pre-existing | `pager.js:1250`; `do_look` `t`/`T` calls it |
| `doidtrap` | OMIT | NOT FOUND |

`node scripts/sym.mjs`:

```
trapped_chest_at js/detect.js:1513   sync
trapped_door_at  js/detect.js:1547   sync
trap_description NOT EXPORTED — 1 LOCAL js/pager.js:226
trapname         js/trap.js:1475   sync
glyph_is_trap    js/display.js:652   sync
glyph_to_trap    NOT FOUND in js/**
t_at             js/trap.js:981   sync
Hallucination    js/display.js:797   sync
look_traps       NOT EXPORTED — 1 LOCAL js/pager.js:1250
doidtrap         NOT FOUND
```

`--can pager.js detect.js trapped_chest_at`: **ALREADY**. FORCE/DIAG/`getRngLog`/`fastforward`/seed-in-control-flow: **none**. Rule #2 **clean**.

## C ↔ JS fidelity

**Helper bodies — match C.** Chest-before-door; else `trapname(tnum, FALSE)`. **Match.**

**RNG / short-circuit.** C `ttyp != TRAPPED_CHEST || (Hallucination && rn2(20))` — if ttyp is a pit, **`rn2` is not evaluated**. JS the same clang `||`. Door gate identical with `TRAPPED_DOOR`. Wrong-ttyp → 0 draws. Hallu + matching ttyp → one `rn2(20)`. **Match the gates.** Direct probes that call `trapped_chest_at(TRAPPED_CHEST, …)` prove the helper, not lookat.

**Floor vs invent.** Floor: `sobj_at(CHEST) || sobj_at(LARGE_BOX)` — presence, not `otrapped`. Invent/steed/minvent: `Is_box && otrapped`. **Match.**

**Live lookat arm — does not match C.** JS `brief_at` / `describe_looked`:

```985:989:js/pager.js
    const trap = t_at(x, y);
    if (trap && trap.tseen) {
        return trap_description(trap.ttyp, x, y);
    }
```

Extra vs C: requires an **ftrap** and **`tseen`**. C uses the **gbuf glyph**. Detected chest/door: trap glyph, no ftrap → C names it (and may `rn2(20)`); JS never enters `trap_description`. `describe_looked` also still ranks `loc.objects` **before** the trap arm. After `map_trap`, gbuf is a trap; a floor chest pile still makes JS print `doname`.

The SHA’s own comment names this: “callers hand us the live `t_at` ttyp rather than `glyph_to_trap(glyph_at)`.” Naming the hole does not make the subject true. The Open row this SHA added is the live path.

**`auto_describe_text`.** C `auto_describe` → `lookat` → `trap_description`. JS `getpos.js:666` still `t_at && tseen → trapname` (not pager.js). Detection `browse_map` with `autodescribe` uses this clone. Until lookat tnum is the glyph, autodescribe cannot name a detected chest either.

**`look_traps`.** Exists at `pager.js:1250`. C: `glyph_is_trap` → `trap_description`. JS prints `trap at (x,y)`. D-log “call site does not exist” is **false**.

**Callee closure of the helpers:** LIVE. **Callee closure of C lookat’s trap arm:** `glyph_to_trap` OMIT; dispatch still `t_at`.

## Hallucinations / overclaim

Subject / D-log “detected trapped chest or door is named as one and burns `rn2(20)`”: **false** on every lookat path this SHA shipped. “Every farlook at a trap glyph under Hallucination was RNG-visible”: **false** — C only draws `rn2(20)` when tnum is chest/door. Ordinary pits never did. “`look_traps` unported so its call site does not exist”: **false**. Direct gate probes: true of the **helper**, not of `/` or autodescribe. Fortress 44/44 is no-regression, not a trapped-chest farlook.

## Density

§2b: one `staticfn` + two detect gates. +92. Helpers without C’s tnum source are not a finished lookat peel.

## Verification

Commit: green+strict; 44/44; hallu seeds; **direct** `trapped_chest_at` probes. Those probes do not call `brief_at` / `describe_looked` / `auto_describe_text` / `look_traps`. They cannot falsify the `t_at` wiring. This audit: `csym` lookat `:719–721`, `maketrap` null for chest/door, HEAD `brief_at` still `t_at&&tseen`, `glyph_to_trap` NOT FOUND.

## Actionable C-wrongs

1. **Lookat trap tnum = `glyph_to_trap(glyph_at)`, not `t_at.ttyp`.** Port `display.h` `glyph_to_trap` `:671–674`. In `brief_at`, `describe_looked`, and `getpos.js` `auto_describe_text`, enter the arm on `glyph_is_trap(gbuf)` (no `tseen`, no ftrap). Pass that tnum into `trap_description`. Until this lands, detected chest/door cannot be named and cannot burn `rn2(20)`. Same iter: `describe_looked` must not let floor `loc.objects` beat a trap **glyph**.

Named, **not** this Must-fix: `look_traps` `:2093–2094`; `doidtrap`; C TODO recursive/buried. Do **not** “fix” the door re-entry to pass `TRAPPED_CHEST` — C passes `ttyp`. Do **not** invent `rn2(20)` on ordinary pit farlook. Do **not** add `sobj_at` clone #13.

Verdict: **QUALITY-RISK**
