# Review 878 — 8d0304fd — mkmap.c mkmap + init_map/init_fill cavern assembly + RNG fill envelope (D-1908)

Metadata: SHA `8d0304fd`, D-1908. Files: `js/mkmap.js` (+~90:
`N_P1/2/3_ITER`, `init_map`, `init_fill`, `litstate_rnd`,
`mkmap` + aliased clone imports), `js/mklev.js` (2×
`function`→`export function`, behavior-neutral). Next index 878.

Intent vs deliverable: subject promises the canonical driver +
RNG envelope, with join/finish delegating to the live clones
until their rows land. The diff delivers exactly that. Promise
≡ diff.

Inventory: 4 new exports + 3 const exports; 2 locals re-pointed
local→export (`sym`: single homes `mklev.js:17805,17871`, no
dupes ✓). Callee closure: `rn1/rnd/rn2` (rng.js), `depth`
(`hacklib.js:34` ✓), `NO_ROOM` const, pass_* (same-module
D-1902). Nothing imports `mkmap.js` — still dead code; the live
MINES path runs untouched clones (mklev hunk is export
keywords only).

**C ↔ JS fidelity**: `init_map` ≡ `:23–34` (x [1,COLNO), y
[0,ROWNO), NO_ROOM/typ/unlit field order; `!loc` skip is JS
memory-safety) ✓; `init_fill` ≡ `:36–52` (limit
`(78·20·2)/5`=624 exact — no float-division edge,
`rn1(WIDTH-1,2)`/`rnd(HEIGHT-1)`, occupied-retry draws no extra
RNG) ✓; knobs ≡ `:438–440` (1/1/2, with C's tune comments) ✓;
`litstate_rnd` ≡ `:442–448` (`rnd(1+|depth|)<11 && rn2(77)`
short-circuit preserved — `rn2` burns only on the negative
arm's first-pass, exactly like C; non-negative boolean
passthrough) ✓; `mkmap` ≡ `:450–486` in full C order (lit
resolve → init_map → init_fill → N_P1/N_P2 loops →
smooth-gated N_P3 → join-gated join → `finish_map(fg, bg,
lit, walled, icedpools)` arg order exact → walled&&join
cavernous stamp) ✓. The `:460`/`:485` alloc/free mapping to
per-call scratch is sound (sequential calls, full rewrite
before copy-back — established in review 872).

Hallucinations / overclaim: none. The `somexy`-failure
`impossible()` arm dropped by the delegated clone is disclosed
in the D-log and assigned to the join_map row — not hidden.

Density: one driver + envelope, map + full gates in-commit —
right size.

Verification: D-log gates PASS incl. full 44/44 (shared file).
Re-measured: `verify mkmap --base 8d0304fd~1` → 0 blocked
(0/0), vacuous as stated. Diff grep: no banned patterns.
Rule #2 clean.

**Actionable C-wrongs**: none. Condition (not a wrong): the
queued `join_map` row must land the canonical port + the
dropped `impossible()` arm + the live MINES cutover together —
already the next Open row after the review-873 Must-fix.

Verdict: **ACCEPT**

Condition landed in part — **Addressed:** D-1910 (canonical `join_map`/`join_map_cleanup` + the dropped `impossible()` arm; live MINES cutover rides with the `finish_map` row).
Condition landed in full — **Addressed:** D-1911 (canonical `finish_map` + live MINES cutover to `js/mkmap.js`, envelope clones deleted).
