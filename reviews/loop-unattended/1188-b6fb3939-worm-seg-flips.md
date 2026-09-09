# Review 1188 — b6fb3939 — worm segment flips + flip_level wormno arm (D-2222)

Metadata: SHA `b6fb3939`, `js/worm.js` + `js/mklev.js`,
D-2222. Queue row worm flip family (named
data.md:606, 0 blocked) — both walkers absent, wormno
arm missing from `flip_level`.

Intent vs deliverable: subject promises the two
walkers plus the caller arm. Diff delivers both
exports and the `else if (mtmp.wormno)` arm in C
position, plus doc updates retiring the omits.
Nothing else.

Inventory: two new sync exports in `worm.js`; one new
arm in `mklev.js` extending the pre-existing static
`worm.js` edge (`imports.mjs --can` → ALREADY, no new
edge, no TDZ read). No body deleted, no clone added,
no symbol deleted or re-pointed.

**C ↔ JS fidelity**: checked against pinned C.
Walkers character-for-character: vertical
`worm.c:967–976` `curr->wy = (maxy - curr->wy +
miny)` over `wtails[wormno]` ≡ JS `:478–484` ✓;
horizontal `:978–987` `wx = (maxx - wx + minx)` ≡ JS
`:492–498` ✓; no wormno re-check inside, matching C
✓; draw-free field walks, no RNG either side ✓.
Caller (`sp_lev.c:661–666`, lines read directly):
head FlipY/FlipX + mgoal, then priest/shk/wormno
chain — JS `:16989–17002` identical order, `flp & 1`
→ vertical(miny, maxy), `flp & 2` →
horizontal(minx, maxx) ✓. Parameter order matches C
(`mtmp, miny, maxy` / `mtmp, minx, maxx`); the
priest/shk arms above are pre-existing and
untouched. Import extension stays inside the
pre-existing static edge (`imports.mjs --can mklev.js
worm.js flip_worm_segs_vertical` → ALREADY, no TDZ
read). Callee closure: both LIVE, no STUB, no symbol
deleted or re-pointed (nothing to paste from
`sym.mjs` beyond the new-export check — both names
resolve to the new `worm.js` exports). Remaining
omits (save/rest wsegs, isgd/vault-guard extras,
ball/chain, flip_visuals) stay named, untouched.

Hallucinations / overclaim: none. D-log claims no
corpus PASS (vacuous-hidden noted).

Density: §2b right-size — one tight caller/callee
cluster across two already-linked modules.

Verification: re-measured —
`verify flip_worm_segs_vertical --base b6fb3939~1` →
0 blocked at baseline and working scoreboard +
vacuous warning. Row cited 0 blocks; honest. Full
44/44 claimed (shared file changed); HEAD
re-confirmation with the cadence run. Rule #2 clean;
no banned patterns in the diff.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
