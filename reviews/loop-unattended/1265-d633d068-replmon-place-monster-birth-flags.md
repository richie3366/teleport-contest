# Review 1265 — d633d068 — mon.c replmon place_monster arm + makemon birth flags (D-2299)

Metadata: SHA `d633d068`, D-2299. Reviewed at the SHA's own tree (`git show d633d068:js/mon.js`), not HEAD — HEAD already contains D-2300's `place_wsegs` follow-up. Method: `git show` stat + `js/` hunks; `csym.mjs replmon` + `relmon` + `mon_leaving_level`; C `makemon.c:1295–1301` read directly; `sym.mjs` on `mon_set_minvis`/`remove_worm`/`place_monster`; `imports.mjs --can` ×3; `hidden-proxy verify --base` re-run; diff grep for banned patterns.

## Intent vs deliverable

Subject promises: `replmon` grid placement in C order over live callees; `makemon` birth flags (`mgenmklev`/`MM_MINVIS`); `makemon` grid write attempted then honestly reverted with its own Open row.
Diff actually adds (`git show d633d068 -- js/`, 2 files): `replmon` inventory-inconsistency `impossible`, polearm swap, stale-safe grid clear, steed-gated `place_monster`, fmon prepend (all in `js/mon.js`); `makemon` flag block + `MM_MINVIS` arm (in `js/makemon.js`); import-name extensions only. The reverted grid write leaves only its documenting comment in the shipped tree. Promise kept.

## Inventory

- `replmon` (js/mon.js) — four C arms added; `place_wsegs` left as a named comment (closed by D-2300, the next SHA).
- `makemon` birth tail — `mcansee/mcanmove` re-set, `mgenmklev`, `seen_resistance`, `MM_MINVIS` arm.
- No new functions; `OBJ_MINVENT`/`MM_MINVIS`/`M_SEEN_NOTHING` join existing const imports.

## C ↔ JS fidelity

C `replmon` `mon.c:2514–2556` (csym; JS cites `:2515–2563`, patch-shift drift, cosmetic), walked in C order:

| C (`mon.c`) | JS (`replmon` at d633d068) | Match |
|---|---|---|
| inventory loop + `impossible` on `where`/`ocarry` mismatch | `void impossible` (fire-and-forget, stays sync) | verbatim |
| polearm `hitmon` swap before relmon | same position (+ JS-shape `m_id` sync, no C effect) | verbatim |
| `relmon(mtmp, NULL)` → off-map + fmon removal | stale-safe grid clear + splice (see below) | verbatim shape |
| `if (mtmp != u.usteed) place_monster(mtmp2, mtmp2->mx, mtmp2->my)` | `if (mtmp !== u?.usteed) place_monster(mtmp2, mtmp2.mx, mtmp2.my)` | verbatim |
| `if (mtmp2->wormno) place_wsegs(mtmp2, mtmp)` | named comment (ships D-2300) | named, not stubbed |
| light-source swap | named | named |
| fmon prepend, then ustuck/usteed, isshk `replshk`, `dealloc_monst` | prepend then ustuck/usteed present (verified at SHA — predate this diff); replshk/dealloc named | verbatim + named |

Grid clear checked against C `relmon` (`:2559–2594`) → `mon_leaving_level` (`:2694–2730`): C clears via `remove_worm` iff wormno else `remove_monster` when the cell holds the mon. JS does `remove_worm` iff wormno else delete-only-if-cell-holds-old-mon — the non-worm branch is a conservative subset of C (identical whenever the cell holds the old mon; safer otherwise); the worm branch drops C's onmap gate, safe since `remove_worm` on seg-less state is a no-op. Noted, not a wrong. The rest of `mon_leaving_level` (unstuck/fill_pit/newsym/seemimic/mundetected) stays in the pre-existing take-off-map named package (D-1789 debt).
C `makemon` tail (verified at `makemon.c:1295–1301`): `place_monster` (deferred — see below), `mcansee=mcanmove=TRUE`, `mgenmklev=gi.in_mklev` (JS `game.in_mklev ? 1 : 0`; field live across `js/makemon.js`), `seen_resistance=M_SEEN_NOTHING`, MM_ANGRY ternary (pre-existing D-2294 line, untouched), `MM_MINVIS → mon_set_minvis(mtmp, FALSE)` (JS `false`; callee LIVE sync `js/worn.js:618`).
The reverted grid write is the honest core of this commit: attempted in-tree, bisected (grid ON regresses the pony ride — dismount More + missing `rn2(3) @ corpse_chance`; flags-only passes everything), reverted with a code comment, a map entry, and its own Open row naming the movement-parity prerequisite. That is the playbook working, not a gap.
Callee closure, all LIVE (`sym.mjs`): `place_monster js/steed.js:1083`, `remove_worm js/worm.js:139`, `mon_set_minvis js/worn.js:618`. `imports.mjs --can` ×3: all ALREADY, no new edge. No STUB in a live arm.

## Hallucinations / overclaim

None. "Ports C order over live callees only" is accurate — the one non-live callee (`place_wsegs`) was left as a named comment, not stubbed, and shipped in D-2300.

## Density

~52 insertions over two files: one `replmon` envelope + the birth-flag tail it shares callees with, plus a documented revert. One falsifier family (grid-occupancy correctness), one row. OK.

## Verification

D-log: preflight clean-tree green, `verify --fn place_monster` syntax/rule2/green/strict/cohort/full-44 PASS, hidden vacuous (explicitly NOT a corpus PASS). Re-measured by this review:

```text
verify place_monster: baseline d633d068~1 (scoreboard at 614cdcf0) —
0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
```

Matches "row cited 0". No hand probe; justified (unreached arms + full-44 on shared files, same class as D-2294/2295). Diff grep: no FORCE/DIAG/seed/coordinate/RNG-index reads.

## Actionable C-wrongs

None. (makemon-grid row is already Open per the D-log; `place_wsegs` arrives in D-2300.)

Verdict: **ACCEPT**
