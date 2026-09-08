# Review 1129 — b128b07a — sp_lev.c link_doors_rooms wizard3 epilogue (D-2163)

Metadata: SHA `b128b07a`, js/ +5/−1 in `mklev.js`
(`load_wizard3` epilogue) + map row. D-log D-2163. Subject
promises: wizard3 missed the global door linkage — beehive
queen 4th not 8th; scen-tour-Tourist-92134 step 47/84,
RNG-first at `makemon.c:1042` (C `d(13,8)=55` queen 4th of 6
vs JS `d(1,8)=2` bee, queen 8th of 10).

Intent vs deliverable: promise matches diff. Actually adds:
`link_doors_rooms(); remove_boundary_syms();` before
`map_cleanup()` in `load_wizard3`, plus a corrected house
comment. Wiring-only, single C call site. No scope creep.

Inventory: no new functions. Callee closure: both callees are
same-file locals — `link_doors_rooms (js/mklev.js:16686)` and
`remove_boundary_syms (:16659)`. `sym.mjs` reports each as "NOT
EXPORTED, 1 LOCAL CLONE, do NOT write clone #2" — obeyed: the
commit writes no clone, it calls the existing ones from the
same module (same resolution as sibling `load_fakewiz_tower`).
No deleted/redirected symbols.

**C ↔ JS fidelity**: confirm. C epilogue order read at both
sites — `lspo_finalize_level (:6022–6029)` and `load_lua
(:6464–6471)` — is `link_doors_rooms(); remove_boundary_syms();
… map_cleanup();` (only `ensure_way_out`, a named omit,
between). JS now matches that order. Clone check (this review
audited the pre-existing clones since this commit newly
exercises them on wizard3): `link_doors_rooms` mirrors C
`:1121–1142` arm-for-arm (y-outer/x-inner scan, IS_DOOR||SDOOR
gate, `set_door_orientation`, per-room + per-subroom
`maybe_add_door`). One nuance: JS hoists C's `droom->hx >= 0`
guard (inside C `maybe_add_door`) to the caller loop with
`continue`, additionally skipping that slot's subrooms — but
hx<0 slots are unallocated (no live subrooms; C iterates only
`svn.nroom`), so this is equivalent in practice, and the guard
protects against stale `sbrooms`. Verified CLONE, not a
C-wrong. The causal chain (arrival west secret door unlinked →
fdoor=north → `fill_zoo` skips wrong row → 10 placed) is
measured per the D-log, and `remove_boundary_syms` early-returns
here (no CROSSWALL in wizard3) as the comment states.

Hallucinations / overclaim: none. Owner-vs-writer is explicit
(newmonhp is the draw site/symptom owner, door linkage the
writer — same parked-class discipline). The scoreboard-refresh
caveat is disclosed in-commit.

Density: 5 insertions — far below the floor, but the D-log
says so itself ("density owed to diagnosis, not code"); C-side
the fix is two calls. Acceptable.

Verification: D-log Verify bullet shows `verify.mjs --fn
newmonhp` → hidden moved newmonhp@47 → mcast_death_touch@71 +
green + strict + cohort + full 44/44. Re-measured myself:
`hidden-proxy.mjs verify newmonhp --base b128b07a~1` →
`0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS`
(Tourist-92134 moved → mcast_death_touch at step 71, was 47) —
matches exactly, later owner, no regression. No
FORCE/DIAG/seed-gate in the diff.

**Actionable C-wrongs**: none. (Other loaders lacking the
epilogue are correctly left as future corpus-named rows, not
Must-fix.)

Verdict: **ACCEPT**
