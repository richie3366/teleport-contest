# Review 2758 — ea3f0bb5e — sort_rooms in-place head, subrooms survive

- SHA: `ea3f0bb5e07affb59b47b3dbc87c189d6817f296`
- Subject: D-3902 sort_rooms slice-assign dropped subroom shops (Healer-585512 s669 → s781)
- Type: cliff (≤10 functions), whole Method on the function
- D-entry: `## D-3902` (DIVERGENCE-LOG.md)

## Intent vs deliverable

Promise: JS `sort_rooms` slice-assigned `rooms[0..n)` and rewrote a
sentinel, deleting subrooms at rooms[41+]; subroom shops lost their
greeting and "(for sale)" price. Fix sorts the head and writes it back
in place, drops the non-C sentinel; Healer-585512 moves 669→781 with
RNG fully matched.

Diff actually adds: `js/mklev.js` sort_rooms body restart (+14/−7:
in-place head write, sentinel deletion, C cites) + new focused test
`scripts/sort-rooms-subrooms.test.mjs`. No other `js/` hunks, no new
edge, no helper added or deleted.

## Inventory

| JS function | C locus | Status |
|---|---|---|
| `sort_rooms` (js/mklev.js:33084, local) | mklev.c:208–228 (csym) | changed: in-place head + sentinel drop |

## C ↔ JS fidelity

C (`mklev.c:208–228`, csym): `qsort(svr.rooms, n, ...)` sorts the first
n entries in place — subrooms past MAXNROFROOMS+1 are untouched since
`svr.rooms` is one flat array; then `ri` remap (`:218–219`) and the levl
remap with C's own `rno < MAXNROFROOMS+1` bound (`:221–227`). C writes
no sentinel here.

JS now matches arm-for-arm: `slice(0,n).sort(mkroom_cmp)` + write-back
`rooms[i] = head[i]` preserves indices ≥ n (subrooms survive);
sentinel rewrite deleted; `oldToNew` + `roomnoidx` update and the levl
loop with the same bound are unchanged and already C-exact. RNG:
none on either side — level-gen RNG matched across the board per the
D-log, consistent.

Callers (csym `--callers`: mklev.c:1301 sole call, mkmap.c:300
don't-call comment): JS `makerooms → sort_rooms → generate_stairs`
wired pre-existing, unchanged.

Helper classification: none added; `mkroom_cmp` is a pre-existing local
callee, untouched. `sym.mjs sort_rooms` → local clone at
js/mklev.js:33084, sole site — no drift, nothing deleted or re-pointed
so no re-point paste is owed. Grep: zero `FORCE`/`DIAG`/`getRngLog`/
seed/coords in the `js/` hunks; `imports.mjs --rulecheck` → Rule #2 clean.

Pre-existing, out of diff: `oldToNew` sized n vs C's `ri[MAXNROFROOMS+1]`
(levl roomnos ≥ ROOMOFFSET+n would read undefined) — same shape before
and after; no session evidence. `mkroom_cmp` 0/1 ties are libc-defined
order both sides with a self-consistent remap (D-log names it).

## Hallucinations / overclaim

None. "Comparator + levl remap untouched (already C-exact)" verified in
the diff. The s781 forward-note (subroom-less Dlvl 3, fix inert there)
is falsifiable and was confirmed by D-3910's independent diagnosis.

## Density

Cliff phase: level_tele row-2 with the head UNPORTABLE-terminal
(D-3885+D-3895+D-3905, fresh `show` each time); the override precedent
is documented, the owner verified symptom-only, the writer ported whole.
`Ledger: sort_rooms ported` present. Not a no-op: real `js/`, moved session.

## Verification

D-log: `verify level_tele: 0 PASS, 1 moved` (669→781, RNG 26002→37186
full match), reach 23/23, green/strict/cohort, full 44/44.
Audit re-measure (`verify level_tele,sort_rooms --base ea3f0bb5e~1
--reach-all`, HEAD code): `scen-sweep-Healer-585512: PASS`;
`1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS`; reach
level_tele 23/23 → REACH-OK; sort_rooms vacuous-note honest (0 blocked
at baseline) + smoke 24/24 → REACH-OK. PASS ⊇ the claimed move (later
D-3910 completed s781); no REGRESSED. Claim confirmed, no vacuity.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
