# Review 1266 — d8b36251 — worm.c place_wsegs restore/replmon callers (D-2300)

Metadata: SHA `d8b36251`, D-2300, closes the `place_wsegs` named omit left by D-2299. Method: `git show` stat + full `js/` diff (3 files); C call-site grep across `src/*.c`; `csym.mjs place_wsegs` body; C `restore.c:1193–1195` position check; JS body read; `sym.mjs` + `imports.mjs --can`; `hidden-proxy verify --base` re-run; diff grep for banned patterns.

## Intent vs deliverable

Subject promises: both `place_wsegs` callers wired in C order over live callees — replmon takeover + getlev occupancy.
Diff actually adds (`git show d8b36251 -- js/`): one guarded call in `replmon` (`js/mon.js`), one guarded call in `getlev_place_monsters` (`js/do.js`), import-name extensions, comment refreshes. Promise kept; nothing else touched.

## Inventory

- `replmon` — `if ((mtmp2.wormno | 0)) place_wsegs(mtmp2, mtmp)` after the steed-gated `place_monster`.
- `getlev_place_monsters` — `if ((mtmp.wormno | 0)) place_wsegs(mtmp, null)` between `place_monster` and `hideunder`.
- `place_wsegs` body itself untouched (already live).

## C ↔ JS fidelity

Callees first: `place_wsegs` is LIVE — sole sync export `js/worm.js:227` (`sym.mjs`), and its body ports `worm.c:614–635` arm-for-arm (seg walk to the head dummy, `oldworm`-match clear vs over-another-mon `impossible` vs empty-spot `impossible`, `place_worm_seg` per seg, head-dummy co-location with the worm — verified by reading the JS body against the csym range). No STUB, no clone.
All three C call sites enumerated by grep (no hidden fourth):

| C call site | JS wiring | Match |
|---|---|---|
| `mon.c:2537` `place_wsegs(mtmp2, mtmp)` after steed-gated `place_monster` | `replmon`: identical position, args, `wormno` guard | verbatim |
| `restore.c:1195` `place_wsegs(mtmp, NULL)` between `place_monster` (`:1193`) and `hideunder` (`:1196`) | `getlev_place_monsters`: identical position incl. `NULL`→`null` | verbatim |
| `worm.c:471` cutworm split | out of this row's scope, untouched | — |

Guard shapes: C `if (mtmp2->wormno)` / `if (mtmp->wormno)` ≡ JS `if ((…wormno | 0))` — identical truthiness on the integer field.
Getlev context (from the diff): the new call sits after the steed/ustuck `m_id` remap and `place_monster`, before `hideunder` — so a restored worm regains head + tail cells before any hide-under logic runs, matching C's order where `hideunder` sees the fully placed monster. Why it matters: without the call, a restored worm's `wormno` is nonzero (kept in the field) while its tail cells are absent from `_level_monsters` — grid-only readers (`level_mon_at` path) would see head but no tail, where C repopulates both from the restored wseg chain. Same for replmon: the old worm's segs were cleared by the D-2299 `remove_worm`, and the replacement inherits the wormno (`zap.c:783` per the D-log), so without re-occupation the revived tail is grid-invisible.
Edges: `place_wsegs` joins the already-imported `worm.js` edge in `mon.js`; `node scripts/imports.mjs --can do.js worm.js place_wsegs` → "ALREADY: do.js already statically imports worm.js" — stronger than the D-log's "new but SAFE" (no new edge at all). Both callers stay sync (`void impossible` inside the callee). Remaining Nameds (replmon light-swap/replshk/dealloc, save/rest wseg chain, getlev ghostly remap) are untouched and correctly carried.

## Hallucinations / overclaim

None. The D-log's one imprecision (calling the do.js edge "new") errs toward caution and the `--can` verdict it cites is real; the actual state is ALREADY, which only strengthens the claim.

## Density

Two one-line wirings + comments closing the previous SHA's named omit — the canonical dense follow-up; shipping it separately from D-2299 kept each commit to one callee family. OK.

## Verification

D-log: preflight clean-tree green, `verify --fn place_wsegs` syntax/rule2/green/strict/cohort/full-44 PASS, hidden vacuous (explicitly NOT a corpus PASS). Re-measured by this review:

```text
verify place_wsegs: baseline d8b36251~1 (scoreboard at 614cdcf0) —
0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
```

Matches "row cited 0". No hand probe; justified (guarded one-liners over a live helper, no corpus reach, full-44 on shared files). Diff grep: no FORCE/DIAG/seed/coordinate/RNG-index reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
