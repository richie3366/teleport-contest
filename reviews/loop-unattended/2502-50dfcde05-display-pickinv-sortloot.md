# Review 2502 — 50dfcde05 — display_pickinv sortloot order (D-3621)

SHA: `50dfcde05` — cliffs-head inuse_classify writer display_pickinv. D-3621.

## Intent vs deliverable

Promise: the inventory menu iterated fixed invent order; C sorts via
`sortloot` then lists per `inv_order` class. Fix ports the sortflags +
nextclass loop into the `display_pickinv_reply` else-branch: 4 PASS.

Diff actually adds: `js/invent.js` (+36/−14, one branch) +
`scripts/pickinv-sortloot-full.test.mjs` (2 cases). All callees in-file, no
new imports. No other `js/`.

## Inventory

- `display_pickinv_reply` else-branch (`js/invent.js:3987–4041`, changed) —
  C `invent.c:3181–3184` sortflags + `:3207` filter + `:3262–3343` nextclass
  + `:3368` unsortloot. Status: fixed.

## C ↔ JS fidelity

Branch-by-branch against C `invent.c`: sortflags
(`(sortloot=='f') ? LOOT : INVLET`, `|= PACK` if sortpack, `:3181–3184`) —
exact, including the correct exclusion of the TTY_PERM_INVENT override
(other branch) and the inuse_only override (other branch, `SORTLOOT_INUSE`
+ `is_inuse` filter). Lets-filter `:3271` (`lets && !strchr`) → `allow` set
check — exact. Class gate `:3273` (`!sortpack || oclass == *invlet`) → the
`[null]` single pass vs per-class passes — exact; the unpinned `!sortpack`
headerless arm ships in-branch as C writes it. Header on first listed item
(`:3290–3300`, `let_to_name(*invlet, FALSE, withsym)`) — exact, withsym
preserved; the per-item body is the unchanged existing block
(observe/obj_glyph/doname/maybereleaseobuf). Venom `:3337–3339` (extra pass
after `inv_order`) → append-if-absent — exact and duplication-safe.
`unsortloot` end — exact.

`sortloot` returns a dense array (no C sentinel), so `if (!otmp) continue`
is dead-but-harmless rather than a semantic change. `classcount++` sits
outside the header `if` where C keeps it inside —observably identical
(header fires exactly on the first listed item per pass). Helpers are all
pre-existing in-file/live: `sortloot` (`invent.js:2534`, the one export),
`sortpack_on` (`:1477`), `inv_order_classes` (`:1484`, `inv_order` with
DEF_INV_ORDER fallback — more faithful than the old fixed order),
`SORTLOOT_*` via the existing const.js edge.

Helper class: C callee closure, all LIVE. No clone created or re-pointed
(`sym.mjs sortloot` clean; `sortpack_on`'s "LOCAL CLONE" tag is sym's
non-export heuristic on a pre-existing in-file helper, not drift).
No FORCE/DIAG/seed/coordinate in the hunk.

## Hallucinations / overclaim

None. The hand-verified C orders (missile subclass, loot_xname, enchant)
are sortloot_cmp's pre-existing behavior and the 4 PASS corroborate them.
The named keeps (invent_lines, pickinv_build_perm, wizid, query_objlist)
are genuinely other C functions/arms.

## Density

Cliff commit, one branch of the writer, writer correctly chosen (owner
never runs on this path per the D-2121 precedent, read once). Ledger:
`display_pickinv` row updated (D-3621). Own head per its HEAD queue.

## Verification

Re-measured: `hidden-proxy.mjs verify inuse_classify --base 50dfcde05~1
--reach-all` → `4 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS`
(all four D-log sessions still PASS); smoke reach 24/24 → REACH-OK. Exact
match. Unit test: 2 pass, 0 fail.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
