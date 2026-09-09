# Review 1182 — e6ad2c9b — populate_maze + makemaz fallback (D-2216)

Metadata: SHA `e6ad2c9b`, `js/mklev.js` only
(+90/−), D-2216. Queue row `walkfrom` family
(0 blocked) — named-deferred at data.md:883:
`populate_maze` had no JS body and no caller; both
`makemaz` maze paths returned an empty level where
C mazifies (`:1197–1222`); plus two live-clone
C-wrongs in the same envelope.

Intent vs deliverable: subject promises new
`populate_maze`, new `makemaz_maze_fallback` wired
into both maze paths, and two small fixes (walkfrom
flags, mazexy bounds). Diff delivers all three,
nothing else. No new cross-module edge — every
callee same-module or already imported, so `--can`
is correctly skipped (nothing to paste).

Inventory: new module-local `makemaz_maze_fallback`
+ `populate_maze` (C callees all LIVE). Changed:
`makemaz` (2 wiring sites + map comment),
`walkfrom` (1 line), `mazexy` (4 bound reads).
No imports added or deleted.

**C ↔ JS fidelity**: verified against pinned C.
`populate_maze` matches `mkmaze.c:1096–1124`
loop-for-loop — rn1(8,11) gem/RANDOM, rn1(10,2)
BOULDER via mksobj_at TRUE/FALSE, rn2(3) minotaur,
rn1(5,7) random, rn1(6,7) gold. The 6th trap loop
(`mktrap(0,MKTRAP_MAZEFLAG,…)` — random type +
maze-aware spot chosen internally) is omitted and
named in-code + map — the correct call, since JS
only has `maketrap(x,y,type)` and any invented type
would add RNG draws C never makes. Fallback matches
`:1197–1222` verbatim: is_maze_lev; `corrmaze =
!rn2(3)` (≡ `rn2(3)===0`); Invocation-gated
`create_maze(-1,-1,!rn2(5))` vs `(1,1,FALSE)`
(C `rn2(2)` truthiness ≡ JS 0/1); gated
wallification; mazexy+mkstairs up/down (JS
`mkstairs(x,y,up,croom=0,force=false)` at
`mklev.js:27850` ≡ C `(…,NULL,FALSE)`);
vibrating-square via live pick_vibrasquare_location
+ svi_inv_pos + maketrap; `place_branch(
is_branchlev(),0,0)` (line-604 idiom, pre-existing);
populate_maze. Wiring matches C control flow: the
`if (*protofile)` gate means empty-proto skips to
mazification, and load-failure prints C's exact
impossible literal («Couldn't load … - making a
maze.») then mazifies. walkfrom fix correct: C
`:1306` sets the intermediate wall cell typ only —
the `flags=0` at `:1293–1294` belongs to the start
cell (already handled above in JS); old code cleared
both. mazexy fix correct: C `:1316–1350` reads
`gx.x_maze_max/gy.y_maze_max` in both the `rnd()`
probes and the fallback scan (panic tail already
present in JS); JS `maze_x_max()/maze_y_max()`
return the `create_maze`-scaled `game.x/y_maze_max`
(`mklev.js:18229–18239`, mirroring C) defaulting to
X/Y_MAZE_MAX — identical values on the fallback path
where create_maze just ran, strictly more faithful
inside scaled mazes. Residuals (trap loop,
`dmonsfree`, SPLEVTYPE/`getenv`) all map-named.

Hallucinations / overclaim: none.
«Behavior-identical today» is accurate and honestly
scoped to the fallback path.

Density: §2b right-size — one C family, one module,
90 lines.

Verification: D-log explicitly notes hidden vacuous
(0 blocked, NOT claimed as a corpus PASS).
Confirmed: `verify populate_maze` → 0 blocked with
the runner's own vacuous-not-a-PASS warning. That
honesty is exactly what §6 requires; no `--base`
re-run is owed. Green/strict/cohort + full 44/44
claimed for the shared-file change; the
end-of-iteration cadence re-run re-confirms at HEAD.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
