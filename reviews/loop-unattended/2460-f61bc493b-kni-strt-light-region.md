# Review 2460 — f61bc493b — Kni-strt string regions via light_region (D-3578)

**Metadata.** SHA `f61bc493b` (2026-10-06, D-3578). Type: **cliff**:
writer port for the cliffs head `teleport.c level_tele`. `js/`
insertions: 28 (`js/mklev.js` +14/−14, net deletion of the local
helper).

## Intent vs deliverable

Promise: `load_kni_strt`'s local `kniLit` (raw-rect lit set, no wall
growth) replaced by live in-module `light_region` for the three
string-form des regions; throne-block raw relight deleted as a subset
of add_room's; probe Knight-94336 41→loot_mon@213.

Diff actually adds: two `light_region` calls (whole-map lit, middle
unlit), one east-room lit call, the helper + relight deleted, des
cites. Promise matches diff.

## Inventory

| # | Function | Status | JS | C range |
|---|----------|--------|----|---------|
| 1 | load_kni_strt (region arms) | ported | [mklev.js](/home/debian/dev/teleport-contest/js/mklev.js:8625) | sp_lev.c:5613–5631 (lspo_region argc=2) + :2838–2862 (light_region) + table path :5685–5690 |

Helpers: `light_region` is the live in-module export
(mklev.js:29989, mirrors C line-for-line — verified: ±1 clamp
x1..COLNO-1/y0..ROWNO-1 when lit, `IS_LAVA→1` rule). No clones, no
new edges.

## C ↔ JS fidelity

**String-form rule confirmed.** C lspo_region argc=2 (:5613–5631,
read): `if (rlit) selection_do_grow(sel, W_ANY)` then
`selection_iterate(sel, sel_set_lit, &rlit)` — grow-when-lit,
no-grow-unlit ✓. **Equivalence is exact, not approximate:**
`sel_set_lit` (sp_lev.c:5534–5540 via `csym`) is `(IS_LAVA||lit)?1:0`
— the same lava rule `light_region` carries — and grow on a solid
rect is exactly ±1 (selvar.c:338–366 growth arms read) ✓. So
`light_region(rect, lit)` ≡ grow+sel_set_lit in all four cases.

**Des coords exact.** Kni-strt.lua:37–40 read: `area(00,00,49,15)
"lit"`, `area(04,04,45,11) "unlit"`, table `{06,06,22,09} lit=1
throne`, `area(27,06,43,09) "lit"` — byte-for-byte the JS calls ✓.

**Throne deletion safe.** C table path (:5668–5714, read) lights via
`add_room(rlit)` only — no sel_set_lit, no light_region on that path
✓. C `do_room_or_subroom` (mklev.c:230–301 via `csym`) lights
lowx−1..hix+1 when lit; JS `add_room→do_room_or_subroom`
(mklev.js:32705/32724, read) does the identical loop. The deleted
kniLit(6,6,22,9) rect ⊆ add_room's lit span — redundant in both C
and JS ✓. Blast radius confined: `protofile==='Kni-strt'` gate
confirmed (mklev.js:3562); sibling raw-rect loaders disclosed as
left-for-their-cliffs.

## Hallucinations / overclaim

None. The three NO-MOVEMENT proofs are structural (dispatch-gated to
Kni-strt; each still arrives on a different level) and the
opposite-direction Wizard-94196 note correctly points at a different
writer rather than claiming coverage.

## Density

Cliff §10.18: head writer, one loader's region arms, own `Ledger:`
touch (sp_lev row gains D-3578; header omit retired in-code;
humidity/ensure_way_out omits untouched). Per-function verdict
ACCEPT → SHA ACCEPT.

## Verification

- Added-code grep: clean (calls + cites; helper deleted).
- Rule #2: clean this iteration (see 2453).
- Re-measure (mine): `verify level_tele --base f61bc493b~1
  --reach-all` → **0 PASS, 1 moved** (Knight-94336 41 →
  loot_mon@213), **3 unchanged, 0 worse** + smoke 24/24 REACH-OK —
  the D-log's numbers exactly.
- Committed test pins the wall row lit; full `sessions` 44/44
  claimed in-ship, re-covered by this audit's gates.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
