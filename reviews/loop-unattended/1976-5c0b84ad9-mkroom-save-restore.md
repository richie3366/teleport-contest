# Review 1976 — 5c0b84ad9 — mkroom save/restore closure (new js/mkroom.js)

Metadata: SHA `5c0b84ad9` (D-3016). Scored diff: new `js/mkroom.js`
(178 L) + wiring in `js/lev_json.js` (save), `js/save.js`/`js/do.js`/
`js/bones.js` (3 restore installs). Subject promises: port the whole
`mkroom.c:843–906` closure as JSON records, replace the blind `jsonClone`
in `serLevel`, wire all getlev analogues.

## Intent vs deliverable

Promise: `save_room`/`save_rooms` + `rest_room`/`rest_rooms` with C
linkage (staticfn → file-local, extern → exported), live/stash duality in
`serLevel`, three getlev installs.
Diff actually adds exactly that. Promise kept.

## Inventory

- `save_room` (file-local — C `:843–857` `staticfn`), `save_rooms()` +
  `save_rooms_from(level)` (exported — C `:862–871` extern), `rest_room`
  (file-local — C `:874–886` `staticfn`), `rest_rooms(stored)`
  (exported — C `:892–906` extern). Linkage matches C in all four.
- Callers wired: save via `serLevel` live/stash duality; restore at
  save.js:926 (dorecover), do.js:1881 (goto_level), bones.js:692
  (getlev_bones) — each immediately after `game.level` assignment,
  matching restore.c:1132.

## C ↔ JS fidelity

### save_room / save_rooms — verdict: exact-C modulo named pointer omit, ACCEPT

C (`:843–857`):

```c
Sfo_mkroom(nhfp, r, "room-mkroom");
for (i = 0; i < r->nsubrooms; i++) {
    save_room(nhfp, r->sbrooms[i]);
}
```

JS: 14-scalar copy then one nested `subrooms` record per subroom in
order, bound `nsubrooms` like C. Scalar list verified field-by-field
against `mkroom.h:12–22` — exactly the 14 non-pointer fields
(lx/hx/ly/hy/rtype/orig_rtype/rlit/needfill/needjoining/doorct/fdoor/
nsubrooms/irregular/roomnoidx); `sbrooms`/`resident` excluded, which C
itself excuses (`:848–851` "who cares?") while restore re-derives both.
`save_rooms` (`:862–871`): count first, rooms `0..nroom-1` in order.
Absent-keys-stay-absent preserves the `orig_rtype ?? rtype` fallback
readers depend on (writing an explicit 0 would break it). Confirm.

### rest_room / rest_rooms — verdict: exact-C, ACCEPT

C (`:874–886`, `:892–906`):

```c
Sfi_mkroom(nhfp, r, "room-mkroom");
for (i = 0; i < r->nsubrooms; i++) {
    r->sbrooms[i] = &gs.subrooms[gn.nsubroom];
    rest_room(nhfp, &gs.subrooms[gn.nsubroom]);
    gs.subrooms[gn.nsubroom++].resident = (struct monst *) 0;
}
...
svr.rooms[svn.nroom].hx = -1; /* restore ending flags */
gs.subrooms[gn.nsubroom].hx = -1;
```

JS: link-slot-before-recurse (`level.rooms[SUBROOM_BASE + nsubroom]`
before recursing), recurse, null resident + bump — same order. The base
mapping verified, not trusted: `decl.c:1169`
(`gs.subrooms = &svr.rooms[MAXNROFROOMS + 1]`) ≡ `SUBROOM_BASE =
MAXNROFROOMS + 1` with `MAXNROFROOMS = 40` both sides. Loop bound is the
record's `nsubrooms` (`:880`) like C; records never mutated. Both
`{hx:-1}` terminators stamped (`:904–905`); fresh-array-vs-fixed-array is
GC-equivalent and documented. RNG: none in C closure, none added.
Confirm.

### Callee closure

Only `game`/`MAXNROFROOMS` — no live callees needed, no clones, no
stubs. Required `sym.mjs` output: single exports `save_rooms`
(js/mkroom.js:94) / `rest_rooms` (js/mkroom.js:155), no clones. No new
import edges (gstate/const only).

## Hallucinations / overclaim

None. D-log correctly names the old defect (monster refs + aliased
sbrooms in the blob, `nsubroom` unsnapshotted) and the two Named omissions
(Sfo binary encode; pointer garbage). The ghostly-residency follow-up is
honestly scoped out. Diff grep: no banned patterns.

## Density

Breadth-phase: 4 whole functions of one C file + 4 caller wirings, ~178
new lines. One closure, compliant. Each function has ledger/D-log
coverage.

## Verification

Re-measured
(`hidden-proxy.mjs verify save_room,save_rooms,rest_room,rest_rooms
--base 5c0b84ad9~1 --reach-all`):

```text
verify ×4: 0 session(s) blocked at baseline (vacuous, honest)
smoke ×4: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
```

Zero REGRESSED. Matches D-log.

## Actionable C-wrongs

None.

Ledger: closure ported, REACH-OK via smoke.
Verify lines: hidden vacuous ×4 (honest) + smoke per D-log, re-run
confirms.

Verdict: **ACCEPT**
