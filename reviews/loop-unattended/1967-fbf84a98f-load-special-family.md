# Review 1967 — fbf84a98f — sp_lev.c load_special + des-entry family (D-3007)

Metadata: SHA `fbf84a98f`, D-3007, five-function `sp_lev.c`
cluster. Stat: `js/mklev.js` +166 (loader wrapper +
sel_set_door + three lspo entries + makemaz rewire). No
prior review file on disk. Cluster commit → Method per
function below.

## Intent vs deliverable

Subject promises the General loader under its C name, four
des-table entries whole, and the makemaz caller rewired.
Diff actually adds all five plus the one-line rewire. No
new cross-module imports (same-file locals + consts).
Promise and diff match.

## Inventory (per function)

- `load_special` (NEW, exported async, `js/mklev.js:3012`):
  LEV_EXT strip + `load_special_proto` dispatch.
- `sel_set_door` (NEW, file-local, `:18736`): point door
  setter (C staticfn → file-local ✓).
- `lspo_door` (NEW, exported, `:18766`): des.door entry,
  triple- or table-form args.
- `lspo_wallify` (NEW, exported, `:18819`): des.wallify
  entry.
- `lspo_mineralize` (NEW, exported, `:18847`):
  des.mineralize entry.
- Rewire: `makemaz` calls `load_special(levfile)` with the
  extension (`:2937`); `load_special_proto` kept as the
  entry/exit/dispatch engine. No symbol deleted or
  re-pointed from a clone, so no `sym.mjs` deletion output
  is required (`load_special js/mklev.js:3012 ASYNC`
  spot-checked).

## C ↔ JS fidelity (per function)

`load_special`, `csym` `sp_lev.c:6453–6502` (50 lines, read
whole): C entry `create_des_coder :6459` + `load_lua
:6461` + 10-step epilogue `:6464–6494` + give_up free/NULL
`:6497–6499`. JS is a deliberate split, disclosed in the
doc comment and D-entry: stem-strip wrapper reusing the
pre-existing `load_special_proto` entry/exit/dispatch
(whose `finally` is the give_up), per-level epilogues
running inline in each level port (shared whole form
`lspo_finalize_level :6014–6064`), `load_lua` file IO a
by-design nhlua omit (Rule #2). Caller `mkmaze.c:1188`
(now `load_special(levfile)` with LEV_EXT, exactly C
`:1186–1188` Strcat-then-call) ✓; `wizcmds.c:389`
`wiz_load_splua` named (unported wizard-debug) ✓. The
wrapper adds a `String(name ?? '')` null-guard C lacks —
leniency, unobservable at the two C call sites. Verdict:
OK (split, named).

`sel_set_door`, `csym` `sp_lev.c:4646–4662` (17 lines, read
whole): typ write `:4653–4654` (SDOOR iff D_SECRET) ✓;
strip + D_CLOSED promotion `:4655–4658` ✓; orientation
`:4659` ✓; doormask `:4660` ✓; SpLev_Map `:4661` ✓
(`if (game.SpLev_Map)` guard is the JS null-map idiom).
C takes `(genericptr_t)&typ` as a selection callback;
only live call is `:4730` (the `:4723` iterate is
commented out in C itself), so taking the int directly is
exact at every live site ✓. Sole caller `:4730` wired in
this same commit ✓. The 58 older coord-form des.door
closures keep inlined code per the D-2695/D-2697 split —
pre-existing, disclosed, not rewired here. Verdict: OK.

`lspo_door`, `csym` `:4671–4734` (wall + coord arms read;
head per D-log cites): state tables `:4674–4680` verbatim
✓; `create_des_coder :4686` on both arms ✓; triple vs
table dispatch `:4688–4700` ✓; `msk==-1 → rnddoor :4702`
✓; wall form `:4704–4721` — `secret`, and critically
`mask: msk` (NOT typ) per `:4716` so -1 still rolls
inside create_door, exactly as C ✓; coord arm
`:4724–4730` — resolve, isok-gate with nhl_error throw
(C NOTREACHED), `sel_set_door` ✓. lcheck_param_table is
the by-design nhlua omit; des dispatch via nhl_functions
named (no scored Lua VM, Constitution §7) ✓. Verdict: OK.

`lspo_wallify`, `csym` `sp_lev.c:5964–5989` (26 lines, read
whole): defaults -1 `:5969` ✓; coder `:5976` ✓; one-table-
arg gate `:5978` (JS `arguments.length===1 && object`)
✓; required-key reads `:5979–5982` — verified against
`nhlua.c:1017–1025` that C `get_table_int` uses
`luaL_checkinteger`, which THROWS on missing keys, so the
JS throw-via-`luaL_checkinteger_unpacked` (documented in
the comment) matches C exactly, not just plausibly ✓;
gx/gy fallbacks `:5984–5987` ≡ `game.splev_*`
(reset_xystart_size precedent) ✓; `return 0 :5988` ✓.
C's TODOs (clamp, two-table coords) are C's own.
Verdict: OK.

`lspo_mineralize`, `csym` `sp_lev.c:3938–3955` (18 lines,
read whole): coder `:3944` ✓; lcheck_param_table leniency
(`o ?? {}`) ✓; four `_opt` reads with -1 defaults
`:3948–3951` ✓; call `:3953` — argument order
`(kelp_pool, kelp_moat, gold_prob, gem_prob, TRUE)`
matches C exactly (the reads list gem first; the call
does not — JS preserves the call order) ✓; live
`mineralize` untouched ✓; `return 0` ✓. Verdict: OK.

Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed hits.
Rule #2 clean (re-verified 1963).

## Hallucinations / overclaim

None. The required-key throw claim was the one sentence
that could have been an invention; pinned-C verification
(`nhlua.c:1022`) proves it true. No dispatch-over-stub:
the des-dispatch absence is named, and the entries are
exported for that future caller.

## Density

One-C-file closure (loader + its des entries), 5
functions, +166 lines — inside the §2b envelope.
Per-function verdicts: all five OK. SHA verdict: OK.

## Verification

D-log: `verify.mjs --fn (all 5)` → syntax · rule2 · 5×
note hidden + REACH-OK (smoke 24 each) · green 2/2 ·
strict ×2 · cohort 7/7 · full 44/44 · VERIFY: PASS, plus
the 44-levels load-path smoke (unknown-stem `return
false` preserves the impossible + maze-fallback arm).
Re-measured here (`--base fbf84a98f~1 --reach-all`, all
five in one call): each reports 0 blocked at baseline
and in the working scoreboard with
`fixed smoke spread (24 run): 24 PASS, 0 regressed →
REACH-OK` (all five lines observed in-session across two
calls). Honest vacuous notes for coverage rows. Zero
REGRESSED. No seed/step/coordinate/RNG-index reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
