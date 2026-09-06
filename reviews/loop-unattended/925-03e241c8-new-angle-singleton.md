# Review 925 — 03e241c8 — vision.c new_angle vision-angle singleton (D-1955)

Metadata: SHA `03e241c8`, D-1955, `js/vision.js` (one function +
three call-site rewires). Reviewer re-ran C locus, guard lines, call
sites, sym, banned grep, and `hidden-proxy verify --base`.

Intent vs deliverable: subject promises the `new_angle` seen-angle
singleton with all three main-loop sites wired. Diff actually adds
exported `new_angle(lev, sv, row, col)` after `seenv_matrix` and
re-points exactly the three `loc.seenv = … | sv` sites to
`| new_angle(loc, sv, row, col)`. Promise kept.

Inventory: one new JS function (`new_angle`, `js/vision.js:49`,
sync, per `sym.mjs`). No helpers, no imports, no clones, no deleted
symbols.

C ↔ JS fidelity — confirm against `vision.c:452–461` (read at
HEAD): `/*#define EXTEND_SPINE*/` is commented (`:366`), so the
`#else` arm is live and the compiled-C `new_angle` is the identity
macro `#define new_angle(lev, sv, row, col) (*sv)` (`:461`) with the
comment "The other parameters are not used." JS `return sv | 0`
is that identity (`sv` ≡ C `*sv`, `| 0` int idiom); unused params
kept for C shape. The `#ifdef` staticfn body (`:413–451`,
crosswall/T-wall spine extension) is compiled out — correctly
named as omit, correctly NOT ported (porting it would diverge from
compiled C). All three C `lev->seenv |= new_angle(lev, sv, row,
col)` sites (`:749` night/xray arm, `:776` door/wall-lit arm,
`:790` plain-lit arm — `:749`'s call is the tail of a `|=` split
across two lines, verified by reading the range) map to the three
rewired JS sites, arm by arm: `:749` (sees via night/xray-vision,
`next_row[col] & IN_SIGHT`) → first JS hunk (same `nv & IN_SIGHT`
test); `:776` (lit door/wall/SDOOR gated on the adjacent square
being lit) → second hunk (same `IS_DOOR`/lit gating above it in
`vision_recalc`); `:790` (plain lit square) → third hunk. The
surrounding `oldseenv`/`newsym(col, row)` update logic is untouched
at all three sites. No RNG either side. The rewire is
behavior-neutral by construction (`| sv` → `| (sv|0)`); full suite
confirms.
Type note: C `*sv` is `unsigned char` (0–255); JS `sv | 0` is the
same value, and `loc.seenv` OR-accumulates bits identically. The
kept-but-unused `lev`/`row`/`col` params are pure C shape under the
macro (the comment says "not used") — no deref, so the C `struct
rm *` vs JS cell-object difference is unobservable; under a
hypothetical EXTEND_SPINE build they would matter, which is exactly
why the compiled-out body must stay unported. Adjacent surface
outside this SHA: the `sv` values themselves come from the
pre-existing `seenv_matrix` table (not touched here); its
correctness was established before D-1955 and is unchanged by this
rewire.

Hallucinations / overclaim: none. D-log claims identity-macro shape
and compiled-out body with exact ranges — all check out. No
dispatch-over-stub shape (leaf macro, no callees).

Density: §2b right size — one C macro + its three call sites, one
module. Map deferral (EXTEND_SPINE) named in-envelope. OK.

Verification: D-log Verify shows preflight PASS, `verify.mjs --fn
new_angle` → PASS syntax/rule2/green/strict/cohort/full-44/44
(auto: shared file), explicitly vacuous hidden note with no
corpus-PASS claim ("the full suite is the probe" — fair, the arm
runs every turn). Reviewer re-measured: `hidden-proxy verify
new_angle --base 03e241c8~1` → "0 session(s) blocked (0 at
baseline, 0 in working scoreboard)". Honest. Diff-body banned grep
clean; Rule #2 clean (no imports at all).

Actionable C-wrongs: none.

Verdict: **ACCEPT**
