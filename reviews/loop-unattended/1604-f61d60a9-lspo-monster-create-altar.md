# Review 1604 — f61d60a9 — sp_lev.c lspo_monster + create_altar whole-body ports (D-2645)

**Metadata:** SHA `f61d60a9`, `sp_lev.c` `lspo_monster` + `create_altar`, D-2645.
JS: `js/mklev.js` (+330: 5 file-local helpers + exported async
`l_create_monster` + exported `splev_create_altar`) + `js/trap.js`
(one keyword: local `set_levltyp` → export). No prior review claimed closed.

## Intent vs deliverable

Subject promises: unpacked `des.monster` binding + same-file
`create_altar` whole-body ports in C order, `set_levltyp` clone→live
export, gender `rn2(2)` burning once in C position. Diff delivers all
of it. Promise matches deliverable.

## Inventory

- `get_table_align_unpacked` (mklev.js, file-local) — C `get_table_align :3113–3128`.
- `lspo_bool_opt` (file-local) — unpacked `get_table_boolean_opt`.
- `lspo_monster_appear` (file-local) — C `:3326–3344` prefix parse.
- `lspo_monster_from_string` (file-local) — C `:3246–3295` string forms.
- `lspo_monster_normalize_table` (file-local) — C `:3296–3380` table defaults.
- `l_create_monster` (mklev.js:19991, async) — C `lspo_monster :3214–3400`.
- `splev_create_altar` (mklev.js:20082, sync) — C `create_altar :2445–2486`.
- `set_levltyp` (trap.js:861) — existing local clone, now exported, no body change.
- No deleted symbol; the one re-point (clone→export, not clone→import)
  keeps the D-1280 named omits in its doc comment.

## C ↔ JS fidelity

C loci read here: `lspo_monster sp_lev.c:3213–3400` (188 L, via
`csym.mjs` + remainder lines), `create_altar :2445–2486` (42 L),
`set_levltyp mkmaze.c:76–121` (46 L), `get_table_align :3113–3128`.
`--callers lspo_monster`: sole C ref is the Lua dispatch decl
(`sp_lev.c:147`) — no C caller to wire; JS keeps live fills on
`splev_create_monster`, correctly not rewired.

Branch-by-branch confirm (no `rn2`/`rnd` in the normalize path itself):

- Table defaults `:3300–3317` ≡ JS line-for-line (peaceful/asleep
  BOOL_RANDOM, name null, align, female BOOL_RANDOM, invis/cancelled/
  revived/avenge 0, fleeing/blinded/paralyzed ints, stunned/confused/
  waiting 0, m_lev_adj 0) ✓. (The struct-init `female = 0` at `:3229`
  is overwritten by the table default — JS's BOOL_RANDOM matches C.)
- mm-flags `:3314–3324` tail/group default-true, adjacentok/ignorewater
  default-false, countbirth default-true ✓; seentraps TODO stays 0,
  named ✓.
- appear_as `:3326–3344` case-sensitive `obj:`/`mon:`/`ter:` prefix +
  throw on unknown ✓ (`appear_as: ''` on absent ≡ C NULL downstream).
- coord `:3346` / montype `:3350` / monclass `:3369` order kept ✓;
  unknown id throws ≡ C `nhl_error` ✓; classLetter via live `monsym`
  ≡ C `monsym(&mons[id])` ✓.
- mgend rule `:3355–3367` + BOOL_RANDOM safety net ✓ (single-gender
  guard via live `is_female`/`is_male`, fallback to 0).
- has_invent `:3371–3380` CUSTOM/DEFAULT/NO_INVENT from inventFn
  presence + keep_default_invent ✓.
- Post-spawn `:1994–:2186` in C order: christen, female-over-replay,
  cancelled/revived/avenge/stunned/confused/invis, blinded/paralyzed/
  fleeing with `% 127` (verified against C `:2141–2159` quoted below),
  waiting+vampshifted newcham, m_lev_adj clamp (49/0 shape ≡ C
  `:2168–2175`), default-invent drop, CUSTOM global, inventFn +
  `m_dowear` + null (≡ `spo_end_moninvent` + stack pop) ✓.
- The one apparent gap — C `:2160` sets `mstrategy |= STRAT_WAITFORU`
  while JS's post-spawn block only does the newcham — closes via the
  opts path: `waiting` is forwarded to `splev_create_monster`, which
  sets STRAT_WAITFORU at mklev.js:19178–19179 (and :11931/:17515 for
  sibling paths). Covered, not dropped ✓.
- String forms `:3246–3295`: 1-char class vs name + coord-table/x,y
  split ✓; gender `rn2(2)` burns inside the live `splev_create_monster`
  `find_montype` path (mklev.js:17509), once, in C position — the
  pre-existing path live fills already use, so no double-burn ✓.
- `create_altar`: croom/get_free_room_loc vs get_location_coord+TEMPLE
  adopt, `set_levltyp` FALSE→null (≡ C void return), amask write,
  `rn2(2)` only when `shrine < 0`, `!croom_is_temple || !shrine` early
  return, priestini + SHRINE + SANCTUM-if-2 + has_temple ✓. RNG
  call-for-call (single `rn2(2)`, same gate) ✓.
- `set_levltyp` clone audit (export-only, body unchanged): isok/type
  gate, CAN_OVERWRITE_TERRAIN, ICE→melt arms, LAVA lit, incremental
  fountain/sink counts all live; doc names SDOOR→AIR + full
  `count_level_features` as omits. With newtyp ALTAR the SDOOR arm is
  unreachable and the incremental counts are the D-1280-established
  equivalent — verified CLONE, export direction is right (mklev already
  statically imports trap.js; `--can`: ALREADY, no new edge) ✓.
- One narrowing, unpacked-API-only: unknown align string → RANDOM in
  JS; C `get_table_option` with dflt `"random"` errors on unknown.
  No Lua layer exists in JS, so no caller can hit the divergence;
  not queueable. Noted, not filed.

Callees: `splev_create_monster`, `christen_monst`, `newcham`,
`vampshifted`, `is_female/is_male`, `name_to_monplus`, `monsym`,
`mdrop_special_objs`, `discard_minvent`, `m_dowear`, `get_free_room_loc`,
`get_location_coord`, `in_rooms`, `sp_amask_to_amask`, `priestini` —
all live imports on pre-existing edges (`--can` ALREADY ×5 cited).
No STUB in any live arm. OMITs (Lua argc dispatch, stack juggling/GC
Free, G_UNIQ/G_GONE pre-existing splev behavior, FURNITURE/OBJECT
appear fixup deferral) are named in the D-log with C citations.

## Hallucinations / overclaim

None. "Gender rn2(2) burns once in C position" verified against the
live splev path. "SDOOR→AIR + count-scan deltas unobservable with
newtyp ALTAR" verified against C `mkmaze.c:76–121` (SDOOR arm gated
on `newtyp == AIR`). No "Match C" dispatch-over-stub.

## Density

Breadth phase: 330 insertions covering the whole 188 L binding + 42 L
placer + 5 helpers — one C function family, right-sized. No second
subsystem.

## Verification

D-log Verify bullet claims PASS on both fns + smoke REACH-OK +
44/44 + probe 3/3. Re-measured here:
`hidden-proxy.mjs verify lspo_monster --base f61d60a9~1 --reach-all`
→ 0 blocked at baseline and working tree (vacuous note quoted
verbatim, correctly labeled NOT a corpus PASS) + smoke 24/24
REACH-OK, no REGRESSED. D-log says exactly this — claim true.
`imports.mjs --rulecheck`: clean (re-run this iteration).
Diff grep: no FORCE/DIAG/getRngLog/seed/coordinate/fastforward.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
