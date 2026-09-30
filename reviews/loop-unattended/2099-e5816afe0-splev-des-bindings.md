# Review 2099 — e5816afe0 — sp_lev.c stair/altar/grave des-binding closure

- SHA: `e5816afe071d8ad0d6ea2cb2a85901b84f740a4e` (D-3139)
- Parent: `042bdf039`
- Files: `js/mklev.js` (+105), `js/engrave.js` (+1/−1); docs + ledger otherwise
- Cluster: 1 gap-fill + 4 new ports (all sp_lev.c) + 1 one-line C-fix (engrave.c) + 7 stale dispositions

## Intent vs deliverable

Subject promises: "l_create_stairway gap + lspo_stair/ladder/grave/altar + 7 stale proofs".
Diff actually adds: the `create_des_coder()` guard + ok_fn comment in `l_create_stairway`, 4 new
exports, and the `make_grave` NULL-edge fix. Promise matches deliverable.

## Inventory

| JS function | kind | C locus (csym) |
|---|---|---|
| `l_create_stairway` (gap-fill) | +guard/comment | `sp_lev.c:4146–4213` |
| `lspo_stair` | new export | `sp_lev.c:4222–4226` |
| `lspo_ladder` | new export | `sp_lev.c:4231–4235` |
| `lspo_grave` | new export | `sp_lev.c:4242–4278` |
| `lspo_altar` | new export | `sp_lev.c:4282–4318` |
| `make_grave` (1-line) | C-fix | `engrave.c:1686–1703` |

No clones; no deleted symbols. All lspo callees are live in-file locals of the unpacked-loader
family (`create_des_coder` :2863, `luaL_checkinteger_unpacked` :22096, `get_table_xy_or_coord` :22172,
`get_table_align_unpacked` :22434, `splev_opt_index` :1126, `get_location_coord` :21682,
`splev_create_altar` :22744) or pre-existing cross-module imports (`make_grave`, `t_at`, `isok`).

## C ↔ JS fidelity

**l_create_stairway** — confirm. `create_des_coder()` added at the C `:4159` position (line-counted
in the csym body: decls `:4149–4157`, guard `:4159`). The ok_fn comment's citations check out:
C `:1287–1288` is `if (is_ok_location_func) return is_ok_location_func(x, y)` (verified in-file),
and the JS random arm is the only one passing `good_stair_loc` (via `get_location_coord_in_room` /
`get_location_random`), matching C's set-guard-only-in-random-arm + reset(NULL) shape. Lua-parse
arms stay by-design unpacked (pre-existing, kept).

**lspo_stair / lspo_ladder** — confirm. C forwards `(L, FALSE/TRUE)`; JS unpacked defaults
`up = 0` (C `:4157` "default is down"), `rx = ry = -1` (C `:4152` x=y=-1), flag fixed, `return 0` ✓.

**lspo_grave** (`:4242–4278`) — confirm in C order: coder (`:4249`); number-first-arg triple
(`:4251–4255` checkinteger×2 + checkstring-throws — JS throws `bad argument 'text'` likewise);
table form (`:4256–4261`) with object check (lcheck), `get_table_xy_or_coord`, text NULL/string
plus zero-arg function pcall — the pcall shape matches `get_table_str_opt` (nhlua.c:1055–1075:
LUA_TFUNCTION → `nhl_pcall_handle(L, 0, 1, …)`, error text `get_table_str_opt: no string` echoed
exactly); −1,−1 → RANDOM else PACK (`:4263–4266`) via `get_location_coord` (`rx<0 && ry<0` → random,
else croom/splev offset — idiom verified at mklev.js:21682); `isok && !t_at` → GRAVE + `make_grave`
(`:4270–4272`, NULL-txt noted); GC ≡ Free; `return 0`. JS-only `croom` param + 2nd-arg room are
documented with the `lspo_monster_from_string` precedent.

**lspo_altar** (`:4282–4318`) — confirm: `shrines`/`shrines2i` literals exact (`:4285–4289`);
coder (`:4296`); table check (`:4298`); xy-or-coord (`:4300`); align (`:4302`); `type` via
`splev_opt_index(o.type, 'altar', shrines)` (absent → default index 0, unknown → throw like C's
checkoption) mapped through `shrines2i` (`:4303`); fields into the D-2990 `splev_create_altar`
split port, which re-derives (−1,−1) stably and handles the tmpaltar.coord/sp_amask/shrine +
create_altar steps (`:4305–4315`); shrine from this caller is always 0/1/2 so the split port's
`shrine<0 → rn2(2)` arm never fires here, as claimed. `return 0` ✓.

**make_grave 1-line fix** — confirm C-faithful: C `if (!str)` on `const char *` is NULL-only
(`:1700`); `""` engraves empty in C. Old JS `!text` randomized on `""`. All 7 live callers
verified null-or-non-empty (end.js:1189 template, fountain.js:1081 null, mklev.js:22917/28505/33152,
readobjnam.js:621 null, vault.js:1457 non-empty template) — behavior-preserving outside the `""` edge.

Callers: lspo_* have no C callers (Lua des dispatch — 0 JS callers, lspo_map precedent, stated);
l_create_stairway's C callers (`:4225`, `:4234`) are now wired. Callee closure: all LIVE or GC/named.
Grep: no FORCE/DIAG/getRngLog/seed-gates/fastforward/coords. Rule #2: clean (see 2096).

**7 stale:** ledger rows carry JS line cites + D/review refs (spot-checked `get_table_montype` →
split note citing D-2645 design + review 1957, which exists and covers it; `lspo_map`/`where_name`/
`datamodel` cite live bodies + wired callers).

## Hallucinations / overclaim

None. "Verified, not assumed" for the `:1287–1288` emulation is borne out — the lines are exactly
the claimed early-return.

## Density

Breadth-phase cluster: 5 sp_lev.c functions + a same-closure 1-line C-fix, one C file (+1 engrave.c
line the new grave path depends on), 107 js insertions. The engrave.c line is a genuine dependency
of `lspo_grave`, not a second subsystem. 7 stale pops are the sanctioned detour with proofs.
Per-function verdicts: all ACCEPT.

## Verification

Re-measured: `hidden-proxy.mjs verify l_create_stairway,lspo_stair,lspo_ladder,lspo_grave,lspo_altar
--base e5816afe0~1 --reach-all` → all five `0 blocked` + `smoke 24 PASS, 0 regressed → REACH-OK`.
No REGRESSED. Matches the D-log Verify bullet.

## Actionable C-wrongs

None.

## Verdict

Verdict: **ACCEPT**
