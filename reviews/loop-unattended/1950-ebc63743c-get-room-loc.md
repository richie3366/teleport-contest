# Review 1950 — ebc63743c — sp_lev.c get_room_loc whole-body port (D-2990)

## Metadata

- Full / short hash: `ebc63743cb83942353858fd7b8e9f15aa661bbaf` / `ebc63743c`
- Parent: `0daa1a65f` (D-2989, review 1949 ACCEPT).
- Author, date: debian (Co-authored-by Cursor), 2026-09-27 21:00:23 +0200
- D-id: **D-2990**
- Stats: `js/mklev.js` only, +~30/−4. `js/` insertions **~30**. Band
  80–350.
- Claims to close: coverage row `get_room_loc` (0 blocks) + three stale
  rows (`root_plselection_prompt`, `lspo_monster`/`create_altar` splits).

## Intent vs deliverable

Subject promises `get_room_loc` whole-body port + three stale rows.
Body promises file-local `get_room_loc(c, croom)` in C order, holder
mutation, `rn2` spans, `:1369` panic as loud throw, both retry loops
calling it, and the -1,-1 re-seed guard.

Diff actually adds exactly that. Promise matches deliverable.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `get_room_loc` | LIVE local | `js/mklev.js:22662`, C staticfn, correct shape |
| `get_free_room_loc` / `..._coord` loops | LIVE repaired | somexy-inline → callee call |
| `somexy` / `rn2` | LIVE | same-file / already imported; no new imports |

`node scripts/sym.mjs get_room_loc`:

```
get_room_loc     NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mklev.js:22662
```

The "CLONE" flag is a false positive: C is `staticfn`
(`sp_lev.c:1359`), and the single file-local in the sp_lev JS home is
the correct port shape, not drift. No symbol deleted or re-pointed.
Diff grep `FORCE|DIAG|getRngLog|fastforward`: 0. Rule #2 clean.

## C ↔ JS fidelity

C locus: `node scripts/csym.mjs get_room_loc` →
`nethack-c/upstream/src/sp_lev.c:1359-1378` (20 lines). Sole code caller:
`:1397` in `get_free_room_loc` (`:1385-1405`); its only callers are
`:1823` create_trap and `:2454` create_altar.

- Both-negative → somexy-or-panic (`:1364–1369`): JS early-returns on
  success, throws on failure. The throw replaces the old loop-`break`,
  which swallowed a C panic — this commit moves toward C. Match
  (message drops C's pre-colon space; cosmetic, throw text).
- Per-axis `rn2(hx−lx+1)` / `rn2(hy−ly+1)` x-then-y (`:1371–1374`), then
  origin add (`:1375–1376`). Match call-for-call.
- Re-seed guard: verified both call sites pass `x = y = -1` with no
  assignment between decl and call (`:1817→:1823`, `:2446→:2454`), so
  live retries always take the somexy arm. The JS `rx,ry` params are the
  packed-`pos` analogue feeding only the initial probe — ignoring them
  in the retry matches C (`try_x = *x` re-seed, `pos` untouched). The
  per-axis arms stay ported-but-unreached: correct whole-body shape.
- Pre-existing, out of scope: the post-loop `return pos` lacks C's
  `:1401–1402` `trycnt > 100` panic (identical before this commit).
  Noted, not queued from this SHA.

No RNG-order risk: at live sites the sequence is somexy-identical to
the inlined predecessor; the rn2 arms are unreached but C-ordered.

## Hallucinations / overclaim

None. "Sole C caller wired in both JS shapes" is accurate (`:1397` →
both loop bodies). Stale rows cite prior ACCEPT reviews (874, 1604).

## Density

§2b: 20-line C function + caller wiring, ~30 JS lines. Whole body, not
an arm. Right size for a small C locus.

## Verification

D-log: vacuous hidden note + REACH-OK + full 44/44. Re-ran:

```
verify get_room_loc: baseline ebc63743c~1 ... 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke get_room_loc: no RNG-tagged reach; fixed smoke spread (12 run, 3.6s): 12 PASS, 0 regressed → REACH-OK
```

Honest vacuous + REACH-OK, no REGRESSED. Claim holds.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
