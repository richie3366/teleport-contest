# Review 1668 — ee23c6dc — `selvar.c` selection_do_grow restart + selection_do_ellipse (D-2709)

Metadata: commit `ee23c6dc`, D-2709, `js/mklev.js` only (+171/−~30: `selvar_getbounds_rect` helper, `selection_do_grow` restart+export, new exported `selection_do_ellipse`). Pops head Open-coverage row (do_grow PARTIAL) + same-C-file row (ellipse MISSING). No prior review claimed closed.

## Intent vs deliverable

Subject promises: do_grow whole-body restart (getbounds recalc + free) + ellipse live. Diff actually ships all three: file-local `selvar_getbounds_rect`, exported `selection_do_grow` in C order, exported `selection_do_ellipse` in C order. Promise matches deliverable.

## Inventory

Changed JS: `selvar_getbounds_rect` (new file-local); `selection_do_grow` local→exported + restarted; `selection_do_ellipse` new export. No imports touched (all callees in-module). No deleted symbols besides the old local body (re-point local→export — see sym below).

## Callee closure

Required `sym.mjs` outputs pasted verbatim (re-point local→export for do_grow; ellipse/free/recalc all live):

```text
selection_do_grow js/mklev.js:27798   sync
selection_do_ellipse js/mklev.js:27852   sync
selection_free   js/mklev.js:27371   sync
selection_recalc_bounds js/mklev.js:27660   sync
```

| JS callee | Class |
|---|---|
| `selection_new/getpoint/setpoint/free/recalc_bounds` | LIVE, in-module |
| `random_wdir` | LIVE file-local |
| `selvar_getbounds_rect` | new file-local helper porting C `selection_getbounds` (not a clone of `region.js:1146` — named in the comment) |

No STUB in any arm. No `--can` needed (no new edge). Callers: C `nhlsel.c:650 l_selection_grow` → in-file `selection_grow` chain (unchanged, pre-existing); C `sp_lev.c:5625 lspo_region` argc==2 → per-level `des.region` light sites (pre-existing). Ellipse C callers (`nhlsel.c:799/850` Lua bridges) have no JS dispatcher — named omission in the map.

## C ↔ JS fidelity

C loci: `selection_do_grow` `selvar.c:320–367` (csym, 48 L), `selection_getbounds` `:76–95` (csym, 20 L), `selection_do_ellipse` `:455–538` (csym, 84 L) — all whole bodies read. RNG: none on these paths (W_RANDOM roll delegates to live `random_wdir`). Branch walk:

- do_grow: guard `:328–329` ✓ → scratch `:331` ✓ → W_RANDOM roll `:333–334` ✓ → getbounds `:336` via the helper (recalc `:82` + empty `lx >= wid`→full-map `:84–89` + stored `:90–94`; `wid ?? COLNO` default is defensive, `selection_new` sets wid) ✓ → clamped ±1 scan with all 8 disjuncts verbatim in C order `:338–358` (compared token-for-token against the csym body — WEST, WEST|NORTH, NORTH, NORTH|EAST, EAST, EAST|SOUTH, SOUTH, SOUTH|WEST with matching neighbor offsets) ✓ → second getbounds `:361` ✓ → getpoint-gated copy-back `:363–366` (replaces the old `selection_iterate` sweep, which also copied unset cells) ✓ → `selection_free(tmp, TRUE)` `:368` ✓ (`selection_free(sel, freesel)` — `true` ≡ TRUE).
- The recalc is load-bearing (dirty-bounds subset skip): old code read cached `ov.lx..hy`; new code recalcs first. D-log's differential oracle (107/107 incl. dirty-subset negative control) is /tmp scratch and not re-runnable here, but the C-vs-JS line match stands on its own.
- ellipse: init `x=0, y=b`, `a2/b2`, `crit1/2/3` with `Math.trunc(a2/4)` ≡ C `long` division (non-negative radii; JS `%` matches C99 truncation) ✓; `t/dxt/dyt/d2xt/d2yt/width` ✓; `!ov` guard ✓; `filled = !filled` double negation kept ✓; outline arm `:482–506` and fill arm `:509–538` with scanline `width` loops, `y !== 0` mirrors, and x/y stepping in C order ✓. float64 vs `long` is exact at these magnitudes.

## Hallucinations / overclaim

None. D-log discloses the Lua-bridge omission and the `region.js:1146` copy relationship.

## Density

Breadth phase: two whole C functions (48 + 84 L) + one 20 L helper port, one module, same C file. Right-sized.

## Verification

Re-measured per-SHA re-runs (`--base ee23c6dc~1 --reach-all`, both functions):

```text
smoke selection_do_grow: no RNG-tagged reach; fixed smoke spread (24 run, 3.5s): 24 PASS, 0 regressed → REACH-OK
smoke selection_do_ellipse: no RNG-tagged reach; fixed smoke spread (24 run, 3.5s): 24 PASS, 0 regressed → REACH-OK
```

Both 0-blocked vacuous + REACH-OK, no REGRESSED — as disclosed. Diff grep: no FORCE/DIAG/seed/fastforward/coords. Rulecheck clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
