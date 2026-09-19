# Review 1540 — d57c144b — read.c seffect_enchant_armor + wand_explode (D-2581)

## Metadata

- SHA: `d57c144b`
- D-id: D-2581. Next index: 1540.
- Files:
  - `js/do_wear.js` (+29: new exported `adj_abon`).
  - `js/read.js` (+32/−24: live-macro calls, adj_abon wire, `known`
    fix, ENCHANT_ARMOR refresh, wand_explode reorder + useup fix).
  - `js/worn.js` (+4/−3: `is_shield`/`is_elven_armor` promoted to
    exports).
- C locus:
  - `nethack-c/upstream/src/read.c:1114–1290`
    (`seffect_enchant_armor`, staticfn).
  - `nethack-c/upstream/src/read.c:2413–2457` (`wand_explode`).
  - `nethack-c/upstream/src/read.c:2288–2290` (ENCHANT_ARMOR tail).
  - `nethack-c/upstream/src/do_wear.c:3318–3336` (`adj_abon`).
  - `nethack-c/upstream/include/obj.h:278–302` (macros).
  - All `csym.mjs`/read verified this iteration.

## Intent vs deliverable

Subject promises: adj_abon live, three inline clones replaced by live
macros, `gk.known` paraphrase fixed, ENCHANT_ARMOR refresh, and a
wand_explode C-order restart fixing a live `TypeError` (destructured
`useup` from `./eat.js`, which has no such export — probed
`eat.useup: undefined`). Diff delivers all of it. Promise matches
deliverable.

## Inventory

- New: `adj_abon(otmp, delta)` — exported, `js/do_wear.js`.
  `sym.mjs` single export.
- Re-pointed (required `sym.mjs` discussion, pasted here):
  - `is_shield` / `is_elven_armor` promoted from file-locals to
    exports (`js/worn.js:135` / `:155`, single each) — promotion, not
    clone #2.
  - `Yname2_read` clone deleted; canonical `Yname2`
    (objnam.js:2755) imported. (The 3 remaining local `Yname2`
    clones in do/music/timeout are pre-existing debt elsewhere.)
  - `useup as useup_live` resolves to the live `invent.js:4135`
    export — note: a bare `sym.mjs useup_live` query hits the alias
    name and returns NOT FOUND; the import at `read.js:107` confirms
    the source is the live export. No clone.
  - `Is_dragon_scales` (makemon.js:445, live) replaces the
    `GRAY..YELLOW` range test.
- No STUB in any live arm.

## C ↔ JS fidelity

`adj_abon` vs `:3318–3336` (read in full here):

- uarmg/DEX + uarmh/INT+WIS halves, makeknown + ABON only when delta
  nonzero, botl unconditional. Exact (`ABON(x) = u.abon.a[x]` per
  `attrib.h:22`; the `if (!u.abon)` guard is JS-nullability only).

Enchant deltas, each verified:

- `is_shield` now reads `oclass + armcat == ARM_SHIELD` per
  `obj.h:280–282` — the replaced inline clone tested
  `oc_skill === 1`, the wrong field. So this was a live C-wrong and
  this commit fixes it. (Counts toward the commit's value, not a new
  row — fixed on arrival.)
- `is_elven_armor` 5-type disjunction verbatim (`:299–302`). Match.
- Mail arithmetic kept on `otmp.otyp` per `:1233`. Match.
- `if (applied) adj_abon` with `applied = spe − oldspe` post-`cap_spe`
  (`:1277–1279`, `js/read.js:1559`). Match.
- `known = !!otmp.known` (`:1280`) — the old
  `otmp.known ? true : known` kept stale true; fixed. Match.
- ENCHANT_ARMOR `update_inventory()` before `return 1`
  (`:2288–2290`, `sobj`-gone arm). Match.
- Tail vibrate pline (`rn2(7)` arm) untouched. Match.

`wand_explode` now in exact C order (`:2413–2457`, read in full here):

- chg → 2 (`:2418–2419`), n = spe+chg min 2 (`:2421`). Match.
- k-table 12 / 10×4 / 8×4 / 4 / default 6 (`:2423–2438`). Match.
- `dmg = d(n,k)` BEFORE in_use/pline (`:2440–2443` — old code rolled
  inside losehp after pline; order restored). Match.
- Live Yname2, `explode_losehp` (= `Maybe_Half_Phys` + KILLED_BY_AN +
  wail/done tail, read at `read.js:764`), live useup,
  `exercise(A_STR, FALSE)` (`:2444–2456`). Match.
- RNG: no call added, removed, or reordered relative to C — the
  reorder restores C order.

## Hallucinations / overclaim

None. The pre-existing file-local `useup` / `cap_spe` clones stay
map-named rather than claimed.

## Density

~65 `js/` insertions for a 177-line staticfn's deltas + a 45-line
restart + one 19-line new export — one file family (read.c + its
callee), right size (§2b).

## Verification

- D-log claims double VERIFY PASS with real reach on enchant (2
  sessions) and smoke on wand.
- Re-ran both here (required):
  - `seffect_enchant_armor --base d57c144b~1 --reach-all` → 0 blocked
    + **2 baseline-PASS reach sessions, 2 PASS, 0 regressed →
    REACH-OK** (genuine reach, not smoke).
  - `wand_explode --base d57c144b~1 --reach-all` → 0 blocked + smoke
    24/24 REACH-OK.
- Both confirmed. The `TypeError` fix is behaviorally load-bearing:
  every wand explosion (engrave backfire, recharge overcharge) threw
  post-losehp before this commit.
- `imports.mjs --rulecheck`: clean (run this iteration).
- Diff grep: no FORCE/DIAG/seed/coordinate/`fastforward` content.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
