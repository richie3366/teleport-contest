# Review 1893 — 75f0544f8 — shuffle_customizations (D-2934)

- SHA: `75f0544f8` (coverage; `glyphs.c` `shuffle_customizations` and `maybe_shuffle_customizations`)
- Files: `js/glyphs.js` adds `ensure_glyphmap`, the static shuffle, and the exported wrapper. `js/allmain.js` `moveloop_core` calls the wrapper when `pending_customizations` is set, through `import()`.
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` diff. `imports.mjs --rulecheck` (this iteration): "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- `sym.mjs`:

```
shuffle_customizations NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/glyphs.js:845
maybe_shuffle_customizations js/glyphs.js:826   sync
dupstr           js/dungeon.js:263   sync
```

C `shuffle_customizations` is `staticfn`, so the file-local function is the one body, not a second clone. `imports.mjs --can js/glyphs.js js/dungeon.js dupstr` → `ALREADY`. `--can js/allmain.js js/glyphs.js maybe_shuffle_customizations` did not finish: `findPaths` backtracks the whole graph. A BFS on the same static edges finds `display.js → mkobj.js → topten.js → allmain.js`. `display.js` runs every static import before `export const S_sw_tl` (`display.js:672`). `glyphs.js:72` reads `S_sw_tl` at load. A static `allmain.js → glyphs.js` edge would hit that read while `display.js` is still initializing. The dynamic `import()` is the break for that TDZ, not a cycle excuse.

## Intent vs deliverable

Subject promises the compiled `shuffle_customizations` (`glyphs.c:644–732`, `ENHANCED_SYMBOLS` on), the wrapper, and the `moveloop_core` call. The diff is those three. `alloc` is an object literal. `free` clears `utf8str` and drops the object. `dupstr` is the `dungeon.js` export.

## Inventory

| JS | Class | C |
|----|-------|---|
| `shuffle_customizations` | file-local `glyphs.js:845` | `glyphs.c:644–732` |
| `maybe_shuffle_customizations` | live sync `:826` | `glyphs.c:580–587` |
| `ensure_glyphmap` | JS stand-in for the C global | `display.c:1672–1680` |
| `dupstr` | live `dungeon.js:263` | `alloc.c:235–247` |
| `moveloop_core` call | `allmain.js:1110–1112` | `allmain.c:189–190` |

## C ↔ JS fidelity

`config.h:368` defines `ENHANCED_SYMBOLS`. `config1.h:35–37` undefines it only under `MSDOS`. The `#else` body is the one this build compiles. The `#if 0` body at `:589–642` is not. JS includes the unicode arms.

`glyphs.c:648–730`: two offsets, `GLYPH_OBJ_OFF` and `GLYPH_OBJ_PILETOP_OFF`. For each bank, clear `duplicate` to -1, `tmp_u` to null, and the color temps to 0. For each object `i`, `idx = objects[i].oc_descr_idx`. If `duplicate[idx] >= 0`, copy that earlier temp's `customcolor` and `color256idx`; if its unicode pointer is non-null, `alloc` a new struct, copy it, and `dupstr` `utf8str` when non-null. Otherwise copy `customcolor`, `color256idx`, and `u` from `glyphmap[offset + idx]`. If that slot's `u` is non-null or `customcolor != 0`, record `duplicate[idx] = i` and clear `u`, `customcolor`, and `color256idx` on the source. `color256idx` alone does not. Then for each `i`, `free` a leftover `u` (`utf8str`, then the struct) and write the temp unicode, `customcolor`, and `color256idx`. JS is that order. `unicode_representation` is `utf32ch` plus `utf8str` (`wintype.h:82–85`); the object literal copies both. `>>> 0` and `& 0xffff` are the `uint32` / `uint16` stores.

`maybe_shuffle_customizations` (`:582–585`): if `iflags.pending_customizations`, shuffle, then store 0. JS does that when `game.iflags` exists. A missing `iflags` skips. Named.

`allmain.c:189–190` is the same flag test, then the call, after `do_positionbar` and before `dobjsfree`. JS matches that place. The call is `await import('./glyphs.js')` only when the flag is set, so that turn yields before `dobjsfree`. C does not yield. The flag writer `apply_customizations` (`glyphs.c:530`) is still unported, so the yield does not run.

`display.c:1672–1680` zero-fills `glyphmap[MAX_GLYPH]` and sets `[0].sym.color = NO_COLOR`. `ensure_glyphmap` does that on the first shuffle, or replaces an array whose length is not `MAX_GLYPH`. Named.

Callers: `glyphs.c:49` prototype. `glyphs.c:584` is the wrapper → `glyphs.js:829`. `allmain.c:190` → `allmain.js:1111`. No other C call.

## Hallucinations / overclaim

The subject says no compiled arm is omitted. The init loop, the repeated-`oc_descr_idx` copy, the first-take-and-clear, and the leftover free plus write-back are present, including unicode. The `#if 0` body is correctly excluded. `apply_customizations`, `set_map_u`, and `set_map_customcolor` are named as still unported. They are not arms of this function.

## Density

The coverage row asked for `shuffle_customizations`. The compiled body shipped, and its one caller is the wrapper, which `moveloop_core` calls. Not an arm peel. The unported writer means the new code does not run until `pending_customizations` is set.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify shuffle_customizations --base 75f0544f8~1 --reach-all`.

```
verify shuffle_customizations: baseline 75f0544f8~1 (scoreboard at b88b8599f, 2026-09-27T02:19:54.792Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify shuffle_customizations: no corpus session is blocked on it at 75f0544f8~1 — a vacuous verify is NOT a corpus PASS. …
smoke shuffle_customizations: no RNG-tagged reach; fixed smoke spread (12 run, 3.5s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The D-log's green, strict, cohort, and full 44 are the port's own verify line (shared `allmain.js`).

## Actionable C-wrongs

None. The shuffle follows `oc_descr_idx`, and the `moveloop_core` call is behind the same flag as C. The `import()` yield is the load-order break for `S_sw_tl`, and it stays off while `apply_customizations` is unported.

Verdict: **ACCEPT**
