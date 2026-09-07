# Review 1017 — d0c254aa — m_search_items shop gate + scan arms (D-2047)

Metadata: SHA `d0c254aa`, D-2047, Open-row port (queue
owner `m_search_items`; RNG-first `rn2(25)` in-shop
draw, 2 sessions). js/ touches 1 file: `monmove.js`
(~90 insertions). No stamp owed.

## Intent vs deliverable

Subject promises: shop `in_rooms+rn2(25)||isshk`
skip-gate plus the cell/item scan arms in C order.
Diff actually adds: `shopSkip` gate, hides/onscary/
costly/prize/touch arms, two import names. Promise ≡
diff. Inner stubs named with ticket status.

## Inventory

- Changed JS: `m_search_items` (`js/monmove.js`),
  sync (no await added — gate + scan are RNG/pure).
- `sym.mjs`: `onscary js/mon.js:330 sync` (real body,
  inner omits named in its doc comment);
  `costly_spot js/shk.js:761 sync`;
  `is_mines_prize/is_soko_prize js/mkobj.js:2729/:2735
  sync`; `in_rooms`/`SHOPBASE`/`hides_under`/`cansee`
  pre-existing imports (grep-confirmed).
  `can_touch_safely` (monmove.js:232, file-local,
  currently `return true`) and
  `mon_would_consume_item` (monmove.js:328, stub
  false) are pre-existing clones — this SHA newly
  CALLS them but adds neither. No symbol deleted or
  re-pointed.

## C ↔ JS fidelity

C locus `nethack-c/upstream/src/monmove.c:1329-1450`
(122 lines, full body via `csym.mjs`).
Branch-by-branch confirm against C order:

- Minr guards (`:1346-1351`), bounds (`:1357-1361`),
  xx-outer/yy-inner, OBJ_AT→`objects_at` null,
  minr/distmin, `could_reach_item` — all pre-existing,
  order kept.
- Shop gate (`:1353-1355`): `*in_rooms(omx,omy,
  SHOPBASE) && (rn2(25) || isshk)` → `goto
  finish_search` ≡ JS `shopSkip` + `if (!shopSkip)`
  with the tail as fall-through. `&&` short-circuit
  preserves "rn2 draws only in shop" ✓ — the
  load-bearing RNG fact (both corpus draws nonzero →
  skip arm both times).
- Cell arms in C position: hides+cansee (`:1370`),
  m_at block (`:1373-1380`, with the pre-existing
  extra arms kept), onscary (`:1381`), trap-known +
  gg-redirect (`:1384-1391`, pre-existing),
  m_cansee (`:1392`), per-cell `costly =
  costly_spot` (`:1396`).
- Item arms in C position: ROCK, prizes (`:1401`),
  `costly && !no_charge` (`:1404`), `((take &&
  carry>0) || consume) && touch` (`:1408-1411`) with
  C short-circuit preserved.
- `helpless` expansion `!mcanmove||msleeping` ≡
  `monst.h:251` (`msleeping || !mcanmove`) — comment
  citation correct. Underfoot `return TRUE` /
  `break`-rest-of-pile / finish tail — pre-existing
  structure kept.

Callee closure: gate arm fully LIVE. Scan arms —
LIVE (`hides_under`, `cansee`, `onscary` with named
inner omits, `costly_spot`, prizes, take/carry) +
two neutral-valued pre-existing clones
(`consume`=false, `touch`=true — pure pass-throughs
today, no screen/RNG effect) + map/code-named omits
(consume body: turns.md rows; touch inner arms:
in-code + D-log Named; onscary inner arms: mon.js
doc + D-log). No live arm hides unlisted behavior;
"no corpus session reaches the inner arms in
isolation" stated honestly — the corpus-verified arm
is the shop gate.

Observation (not a wrong): `mpickstuff`'s doc block
still lists "in_rooms shop rn2(25)" as ITS named omit
— pre-existing, refers to the mon.c arm, untouched
here. Do not "fix" it in the Must-fix iter.

## Hallucinations / overclaim

None. "2 re-attributed at the same step" is exactly
what the re-run shows (owners change, steps don't).

## Density

~90 insertions / 1 file / 1 C function, one
falsifier (shop-gate draw) + same-function arms.
Right-sized; the arms are indivisible from the gate
(the gate's whole purpose is skipping them).

## Verification

- Diff-hunk grep: no FORCE/DIAG/getRngLog/seed gates;
  the only `rn2(25)` is the C draw itself. Full
  `--rulecheck` once for the iteration (below).
- Re-measured `hidden-proxy verify m_search_items
  --base d0c254aa~1`: `0 PASS, 2 moved past
  (2 re-attributed at the same step), 0 unchanged,
  0 worse → PROGRESS` (Samurai-92032 →
  obj_resists@59; Tourist-92100 → mpickstuff@100)
  — matches the D-log line-for-line.
- Green 2/2 + strict ×2, cohort 7/7, full 44/44 per
  pasted tail (shared-file change ⇒ full auto-ran;
  iteration cadence re-runs full `sessions` next).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
