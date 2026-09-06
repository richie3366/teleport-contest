# Review 913 — 82cffe79 — dbridge entity family (D-1943)

Metadata: SHA `82cffe79`, D-1943 (HEAD). Files:
`js/dbridge.js` only (+130/−6: file-local
`occupants()` + eight exports). Map-driven Open row
(HELDOUT Tier C dbridge), 0 corpus blocks cited.

Intent vs deliverable: subject promises the record
helpers (scan/fill/wiring deferred to `do_entity`).
The diff delivers exactly that. Promise ≡ diff.

Inventory: eight new sync exports (single
definitions) + one file-local helper. Three new
edges, all `--can`-cleared in-commit. No stub, no
new omit beyond named `do_entity` wiring.

**C ↔ JS fidelity**: walked all nine against
pinned C. `e_at` (`dbridge.c:285–301` via csym) —
scan order exact, early-return ≡ break+index,
D_DEBUG-only debugpline omitted (JSDoc-said).
`m_to_e` (`:303–318`) — emon first, wormno
off-head → `&mons[PM_LONG_WORM_TAIL]`, null →
edata-null + ex=ey=0 — exact. `u_to_e`
(`:320–327`) — emon/ex/ey/edata exact (null-guard
on `game.youmonst` is unreachable-defensive; hero
always exists). `set_entity` (`:329–338` via
csym) — u_at/m_at branch order exact, null-m_at
note kept. `is_u`/`e_canseemon` (`:340–342`, read
directly) — pointer-identity and macro order
exact; `=== game.youmonst` is the established
repo idiom (dig/display/do_name/dothrow).
`e_nam` (`:351–355`) — "you"/mon_nam exact.
`E_phrase` (`:360–374` via csym) — You/Monnam,
`!verb||!verb[0]` ≡ `!verb||!*verb`, verb
unconverted for hero else `vtense(null, verb)`
(JS vtense documents the null-subj → 3rd-person
rule); static-80 buffer → returned string is the
right JS shape while callers stay unwired (named).
`occupants()` matches decl.c `{ { 0 } }` zero-init
(ENTITIES=2 both sides). No RNG either side.
Callee closure all LIVE: canseemon, mon_nam/Monnam,
vtense, m_at, mons, PM_LONG_WORM_TAIL/ENTITIES.

Hallucinations / overclaim: none. Hand-probe
results are constructor-level smoke, labeled so.

Density: 130 lines for a nine-symbol family — one
C locus, right-sized per §2b.

Verification: re-measured `hidden-proxy verify
e_at --base 82cffe79~1` → `0 session(s) blocked
(0 at baseline, 0 working)` — vacuous as stated.
D-log gates: preflight + post green 2/2 + strict
×2, cohort 7/7; full skipped (single file) —
legitimate. Rule #2 clean (suite-wide re-check).
Diff grep: zero banned hits.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
