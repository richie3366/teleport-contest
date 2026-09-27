# Review 1955 — b2a5f3fb7 — muse.c m_next2m + Knox guard (D-2995)

## Metadata

- Full / short hash: `b2a5f3fb7b18dab5745bb4cc2b6ce258c9a97f19` / `b2a5f3fb7`
- Parent: `d2d72caa6` (D-2994, review 1954 ACCEPT).
- Author, date: debian (Co-authored-by Cursor), 2026-09-27 22:46:36 +0200
- D-id: **D-2995**
- Stats: `js/muse.js` only, +~25/−2, new
  `scripts/m-next2m.test.mjs`. `js/` insertions **~25**. Band 80–350.
- Claims to close: coverage row `m_next2m` (0 blocks) + the R-778 named
  debt (review 778 ACCEPT-WITH-DEBT, "Knox `m_next2m` tryescape" omit).

## Intent vs deliverable

Subject promises the `m_next2m` whole-body port + Knox guard wiring,
retiring R-778. Body promises the C-order file-local, the wired
`:457–460` guard, +2 import names, and an 8/8 test.

Diff actually adds exactly that. Promise matches deliverable.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `m_next2m` | LIVE new | `js/muse.js:268`, file-local, C staticfn |
| `find_defensive` guard | LIVE repaired | named-omit comment → wired guard |
| `mon_offmap` / `Is_knox` | LIVE import | ALREADY edges, +1 name each |
| `isok` / `m_at` / `m_next2u` | LIVE pre-existing | same-file/imported |

`node scripts/sym.mjs m_next2m`:

```
m_next2m         NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/muse.js:268
```

"CLONE" flag is a false positive: C is `staticfn`, single file-local
in its home module. No symbol deleted or re-pointed. Diff grep
`FORCE|DIAG|getRngLog|fastforward`: 0. Rule #2 clean.

## C ↔ JS fidelity

C locus: `node scripts/csym.mjs m_next2m` →
`nethack-c/upstream/src/muse.c:419-436` (18 lines). Sole caller: `:459`
in `find_defensive` (`:441–462` read for placement).

- `:426–427` `DEADMONSTER || mon_offmap` → `(mhp|0)<1 ||
  mon_offmap` (`DEADMONSTER ≡ mhp < 1`, `monst.h:214`; file idiom).
  Match.
- `:430–434` x-outer/y-inner 3×3 with `isok` continue and `m_at` +
  `m2 !== mtmp` early-TRUE (own square counts only for a different
  monster). Match line-for-line.
- Guard `:457–460` → `tryescape && Is_knox(game.u?.uz) &&
  !m_next2u(mtmp) && m_next2m(mtmp) → return false`, placed between
  the dist-check and the uswallow-check exactly like C, with `&&`
  short-circuit in C order. `Is_knox(uz)` ≡ `Is_knox_level`
  (`const.js:3264`). Match.
- R-778 retirement is legitimate: review 778's named omit was
  precisely this guard, and this commit ports the function whole and
  wires the sole call site. No Must-fix stamp applies (778 carried
  none).

No RNG in C; none in JS. Sync throughout — no async mismatch.

## Hallucinations / overclaim

None. "Every arm ported, every callee live, the sole caller wired"
holds for the 18-line locus.

## Density

§2b: whole C function + caller guard + test, ~25 JS lines. Below ~40
insertions but C is 18 lines. Right size.

## Verification

D-log: vacuous hidden note + REACH-OK + gates, focused test 8/8 with
a falsification probe (stashed muse.js → exactly guard-fires fails).
Re-ran here:

```
verify m_next2m: baseline b2a5f3fb7~1 ... 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke m_next2m: no RNG-tagged reach; fixed smoke spread (12 run, 3.5s): 12 PASS, 0 regressed → REACH-OK
node --test scripts/m-next2m.test.mjs → pass 8, fail 0
```

Honest vacuous + REACH-OK, no REGRESSED; test reproduced 8/8. Claims
hold.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
