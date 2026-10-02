# Review 2261 — 3442eb4d9 — mklev vault/branch/sort triple

Metadata: SHA
`3442eb4d95c4617f338c47ef3618248a32ee6fc4`
(D-3301, 2026-10-02). `js/mklev.js`
only (+32/−3). Three C staticfns
new whole (module-local) + 3
caller rewirings.

Intent vs deliverable: subject
promises pos_to_room + makevtele
+ mkroom_cmp with all callers
wired. The diff ships all three
plus the vault rewire, the sort
rewire, and the place_branch
else arm. Delivers what it
promises.

Inventory (per-function):

- `function pos_to_room(x, y)`
  (:33329): nroom scan via
  inside_room, null fallthrough.
- `async function makevtele()`
  (:33202): `await
  makeniche(TELEP_TRAP)`.
- `function mkroom_cmp(x, y)`
  (:32426): -1/0/1 on lx.
- Rewires: vault site → `await
  makevtele()` (:28304); sort →
  `.sort(mkroom_cmp)` (:32437);
  place_branch gains the else
  arm (:33353–3355).
- No symbol deleted; no import
  touched (same-file).

**C ↔ JS fidelity**:

`pos_to_room` (C mklev.c:1676–
1687, staticfn): pointer-walk
over svr.rooms × svn.nroom,
inside_room gate, `(struct
mkroom *) 0` fallthrough (the
stray `;` after the loop is a
no-op, rightly ignored) ✓. JS
index loop over
g.level.rooms[0..nroom) is the
same walk; `curr &&` is a
JS-only null-hole guard,
disclosed and unobservable
under C semantics; NULL →
null ✓. Sole caller :1714
`(void) pos_to_room(x, y)` →
JS :33354 inside the
`if (!x)…else` matching C
:1708–1714 (read) ✓, discard
preserved; the call is pure in
both languages (zero behavior
delta, faithfully kept) ✓.

`makevtele` (C mklev.c:820–
824, staticfn): single
`makeniche(TELEP_TRAP)` ✓.
async wrapper is required (JS
makeniche awaits maketrap);
caller :1333 under `if
(!noteleport && !rn2(3))`
(read :1332–1333) → JS :28304
under the unchanged guard —
RNG draw order preserved ✓.

`mkroom_cmp` (C mklev.c:59–69,
staticfn): casts + `if (x->lx
< y->lx) return -1; return
(x->lx > y->lx)` ✓ JS exact.
Caller sort_rooms :215
`qsort(..., mkroom_cmp)`
confirmed by read (csym
callers missed it — the D-log
honestly notes "brief refs
missed it, found via tree
grep") → JS :32437 ✓.
Replaces `(a?.lx||0)-(b?.lx
||0)`: identical guard
expression (nullish/NaN
behavior preserved bit-for-
bit) and identical sign, so
the same total order; sort
stability unchanged
(pre-existing `.sort`) ✓.

`sym.mjs` (required): all
three print the generic
"LOCAL CLONE" tag at
mklev.js:33329/33202/32426 —
verified it means "local, no
export exists": all three are
C staticfn, so module-local is
the correct idiom (D-3293
precedent), not drift.
inside_room is the live
same-file export (:32971;
D-log :32964 is pre-insertion
drift, substance right) ✓.

Hallucinations / overclaim:
none. "All callers wired" is
exact (3/3 sites read in C
and JS); the csym miss is
disclosed rather than hidden.

Density: 3 whole C functions,
one C file, ≤10 ✓. 32 js
insertions, defended: the
D-log states these were the
last 3 ledger gaps in mklev.c.
Own `Ledger:` entries (all
ported) + Verify ✓.

Verification: D-log Verify
summarizes (not verbatim, but
complete: syntax/rule2/3×
hidden-note/3× REACH-OK/green/
strict/cohort/full 44/44).
Re-measured (`hidden-proxy
verify a,b,c --base
3442eb4d9~1 --reach-all`): `0
blocked` ×3 + `smoke 24 PASS,
0 regressed → REACH-OK` ×3.
Match; zero REGRESSED. Queue
rows cited no blocks, so
vacuous is honest. Banned
grep: clean. Rule #2 clean
(iteration-wide).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
