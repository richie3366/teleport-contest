# Review 1961 — 84557918b — dungeon.c breadth cluster (D-3001)

Metadata: SHA `84557918b`, D-3001, six `dungeon.c` ports + two
by-design + two stale dispositions. Stat: `js/dungeon.js`
(+140/−3), 8 caller files (+12/+11/+5/+5/+4/+4/+2/+1),
`scripts/dungeon-breadth.test.mjs` (new, 6 tests). Total
+184/−9 across 9 `js/` files. No prior review file on disk.
Cluster commit → Method applied per function below.

## Intent vs deliverable

Subject promises: "`dungeon.c` breadth cluster:
free_proto_dungeon + assign_rnd_level + save/load_exclusions +
rm_mapseen + mapseen_temple; Fread/indent by-design;
free_exclusions/remdun_mapseen stale (D-3001)." The body names
the head coverage row plus five same-file companions, and the
real bug fixed along the way (levels silently lost
teleport/mongen exclusions on every leave+return).

Diff actually adds the six ports with per-arm `:line` cites,
stash/serLevel/dorecover/bones wiring for the serde pair, both
sole-caller wirings for the mapseen pair, and doc retirements.
Promise and diff match; nothing outside the cluster.

## Inventory (per function)

- `free_proto_dungeon` (NEW, file-local, sync,
  `js/dungeon.js:1539`): C staticfn teardown, three free loops.
  Wired in `init_dungeons` (`:1640`).
- `assign_rnd_level` (NEW, exported, sync, `:1045`): dnum copy +
  ±rnd jitter + clamp. Caller (`do.c:1548`) NAMED, not wired.
- `save_exclusions` (NEW, exported, sync, `:2589`): list →
  record array. Callers: do.js stash, serLevel live path.
- `load_exclusions` (NEW, exported, sync, `:2612`): prepend
  loop. Callers: do.js getlev, save.js dorecover, bones.js
  ghostly install.
- `rm_mapseen` (NEW, exported, sync, `:2638`): find + release +
  unlink. Wired in makemap_prepost pre-top.
- `mapseen_temple` (NEW, exported, sync, `:2665`): valley /
  msanctum flag. Wired in intemple.
- Support: `rnd` +1 name on the existing dungeon→rng edge;
  `bones.js` gains its only dungeon import (`load_exclusions` —
  new edge at commit time); stash/detach/install + ser/deser/
  payload keys + `delete_levelfile` null.

## C ↔ JS fidelity (per function)

`free_proto_dungeon`, `csym` range `dungeon.c:1184–1201`
(staticfn; sole caller `:1315`): branch loop `:1189–1191`,
level loop + chainlvl guard `:1192–1196`, dungeon loop over
`svn.n_dgns` `:1197–1200` → three JS loops in C order with the
`:1194–1195` guard and the subtle `game.n_dgns` third bound
(not a `pd` field) ✓. Each free ⇔ null release (free_region
precedent); GC owns the strings. Zero RNG both sides. Caller
`:1315`→`:1640` ✓.

`assign_rnd_level`, `csym` range `dungeon.c:1985–1995`: dnum
copy `:1988`, `+rnd(range)/-rnd(-range)` `:1989` (range=0
takes the same `-rnd(0)` arm on both sides), clamp
`:1991–1994` → identical, except C calls the pure
`dunlevs_in_dungeon` twice and JS once — same value ✓. One
`rnd`, call-for-call exact. Callees `dunlevs_in_dungeon`
(same-file export) + `rnd` (`js/rng.js:97`) LIVE. Sole C
caller `do.c:1548` unwired — sits in the Gehennom
mystery-force arm, a pre-existing named omit (`js/do.js:1610`,
cited `:1609` pre-commit numbering); disclosed in Callers +
Named with the reason (needs `do.c` behavior outside this
cluster). NAMED, not silent.

`save_exclusions`, `csym` range `dungeon.c:2595–2614`
(caller `save.c:552`): count loop `:2601–2602` ⇔ length;
`update_file` gate `:2604` ⇔ WRITING-only callers (do.js stash,
serLevel live; the non-live path re-serializes the stash
without calling it) — C's unobservable count-on-FREEING is
correctly skipped; five record fields `:2606–2612` in C order
✓. Zero RNG. Both savelev counterparts wired.

`load_exclusions`, `csym` range `dungeon.c:2616–2634`
(caller `restore.c:1227`): count `:2622`, alloc+read
`:2624–2630`, PREPEND `:2631–2632` → JS prepends each record
onto `game.exclusion_zones`, so restore runs reversed vs save
order exactly like C ✓. No clear-first on either side (fresh
context; callers detach). All three getlev counterparts
wired after rest_bubbles / before rest_track like C ✓.

`rm_mapseen`, `csym` range `dungeon.c:2664–2692` (sole caller
`cmd.c:993`): raw `ledger_start + dlevel` match `:2670–2673`
(no normalization — like C) ✓; miss `:2674–2675` → return ✓;
custom `:2677–2678` → null ✓; cemetery chain `:2680–2684` →
head dropped (GC; unobservable beyond release) ✓; unlink
`:2686–2691` → splice (head/middle uniform under the array
rendering) ✓. Wired at the pre-top (`js/wizcmds.js:592`,
dynamic import per file idiom), position-matching C `:993`
after the still-named `makemap_remove_mons`.

`mapseen_temple`, `csym` range `dungeon.c:3265–3278` (sole
caller `priest.c:500`; the JS doc cites `:3263` — 2-line range-
start drift, nit only): `find_mapseen` `:3270`, silent miss
`:3272–3273`, valley `:3274–3275`, msanctum `:3276–3277`,
priest UNUSED → `_priest` ✓. Callees `find_mapseen`
(same-file local), `Is_valley`/`Is_sanctum` (imported from
const, `:139–140` — LIVE, not the clones sym reports in other
files). Wired in intemple's tended branch before `} else {`
(`js/priest.js:429`), matching C `:498–500` position ✓.

Dispositions re-checked, not trusted: `Fread` sits under
`#ifndef SFCTOOL` + `#if 0` with zero callers (only the `:39`
decl) — never compiled ✓; `indent` def + both call sites
(`:689`/`:701`) under `#ifdef DDEBUG` — never compiled ✓;
`free_exclusions` complete at `js/mklev.js:2188` (null ⇔
walk+free+NULL), caller `mklev.c:921`⇔`:2758` ✓;
`remdun_mapseen` live `#if 1` mark arm complete (the `#else`
is compiled-out deletion code), callers `do.c:1661`⇔
`js/do.js:1778` (cited `:1774` — this SHA's own +4 shift, nit)
and `quest.c:203`⇔`js/quest.js:268` exact ✓.

`sym.mjs` (no symbol deleted or re-pointed local→import; new
exports for the record — all sync like C):

```text
assign_rnd_level js/dungeon.js:1045   sync
save_exclusions  js/dungeon.js:2589   sync
load_exclusions  js/dungeon.js:2612   sync
rm_mapseen       js/dungeon.js:2638   sync
mapseen_temple   js/dungeon.js:2665   sync
```

No clone, no stub, no silent omit. Import safety: bones→
dungeon was new at commit time; `load_exclusions` is a hoisted
sync export called only at runtime in getlev_bones — no
top-level TDZ read (`--can` now ALREADY; post-commit full
44/44 green). Diff grep clean. Rule #2 re-verified clean
under 1956 on this tree.

## Hallucinations / overclaim

None. The "levels silently lost exclusions" bug claim is
substantiated by the wiring (no stash/ser keys before, six
install sites after). The unwired `do.c:1548` caller is named
in two D-log sections with its reason, not buried. The
5/6→6/6 focused-test narrative names the cause (bare-harness
RNG unseeded) and the harness-only fix (`initRng(7)`).

## Density

One C file, 6 ports + 4 dispositions = 10 ledger items at the
ceiling (not over), no Must-fix bundled, head row + same-file
companions. Every function has its `Ledger:` entry and a
Verify line (`--fn` names all 10). Focused tests fail-first
only for the harness seed — acceptable: the port tests assert
post-fix behavior (bounds, reversal, detach survival).

- `free_proto_dungeon`: whole, sole caller wired → OK.
- `assign_rnd_level`: whole body, caller NAMED → OK.
- `save_exclusions`: whole, both save counterparts → OK.
- `load_exclusions`: whole, all three getlev sites → OK.
- `rm_mapseen`: whole, sole caller wired → OK.
- `mapseen_temple`: whole, sole caller wired → OK.

## Verification

D-log: focused 6/6; `verify.mjs --fn <all 10>` → PASS (syntax
9 files; rule2; hidden note ×10; smoke 24/24 ×10; green 2/2;
strict ×2; cohort 7/7; full 44/44). Re-measured here in one
call (`--base 84557918b~1 --reach-all`): all 10 report 0
blocked at baseline and in the working scoreboard with
`fixed smoke spread (24 run): 24 PASS, 0 regressed →
REACH-OK` — e.g.:

```text
verify free_proto_dungeon: baseline 84557918b~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke free_proto_dungeon: no RNG-tagged reach; fixed smoke spread (24 run, 8.0s): 24 PASS, 0 regressed → REACH-OK
```

(identical pairs for the other nine, captured in-session).
Coverage cluster, so the vacuous notes are honest. Zero
REGRESSED. No seed/step/coordinate/RNG-index reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
