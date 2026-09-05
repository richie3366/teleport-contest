# Review 853 — c9e049a8 — uhitm.c erode_armor export + mhitm_ad_rust mhitu arm (D-1883)

## Metadata

- SHA: `c9e049a8` ("uhitm.c erode_armor export + mhitm_ad_rust mhitu arm (erode_armor corpus owner) (D-1883).")
- D-id: D-1883. Queue row: Open (`erode_armor` corpus owner), popped in order.
- Files: `js/mhitm.js`, `js/mhitu.js`, `js/worn.js`, docs + map + scoreboard.

## Intent vs deliverable

Subject promises: export `erode_armor`, port the `which_armor` hero slot
table, add the `mhitm_ad_rust` mhitu arm + `AD_RUST` dispatch. Diff
actually adds exactly that (rename-export + caller update; slot table;
`mhitm_ad_rust_u` + case + `AD_RUST = 24`). Promise kept.

## Inventory

| JS change | Status |
|---|---|
| `erode_armor_mm` → exported `erode_armor` (mhitm.js:1526) | rename, same body; `passivemm` caller updated |
| `which_armor` youmonst arm (worn.js) | new port of C `worn.c:1006–1036` hero half |
| `mhitm_ad_rust_u` + `case AD_RUST` | new port of C `uhitm.c:2299–2316` (mhitu arm) |

Required `sym.mjs` paste: `erode_armor_mm` → NOT FOUND (fully renamed,
zero leftovers in `js/`); `erode_armor` → `js/mhitm.js:1526` ASYNC
(single export, no duplicate).

## C ↔ JS fidelity

- **`erode_armor`** (C `uhitm.c:125–185` via csym): `while(1)` /
  `rn2(5)` slot loop, cases 0/2/3/4 (which_armor slot, `erode_obj`
  `EF_GREASE`, `ER_NOTHING`→continue), case 1 (cloak always erodes with
  `EF_GREASE|EF_VERBOSE`, else body, else under-robe, always break).
  JS body matches case-for-case, flag-for-flag (only `void`→`await`).
  RNG call-for-call. ✓
- **mhitu arm** (C `uhitm.c:2280–2335`, arm `:2299–2316`): `hitmsg` →
  `mcan` return → `completelyrusts(pd)` (`mondata.h:227`,
  `ptr == &mons[PM_IRON_GOLEM]`) → `You("rust!")` + `rehumanize()` +
  return → `erode_armor(&youmonst, ERODE_RUST)`. JS identical order;
  crucially the mhitu arm does **not** touch `mhm->damage` in C
  (only the uhitm/mhitm arms zero it), and JS `void mhm`s likewise —
  base `hitmu` `d()` is kept. C `hitmu` order confirmed via csym
  (`damage = d()` → `mhitm_adtyping` → `mhitm_knockback` → `mdamageu`),
  so erosion `rn2(5)` now precedes knockback `rn2(3)` — exactly the
  symptom's RNG fix. ✓
- **`which_armor`** (C `worn.c:1006–1036`, read at HEAD): `mon ==
  &gy.youmonst` → 7-slot `u.uarm*` table, `impossible("bad flag…")` +
  return 0 default; else minvent `owornmask` scan. JS: same 7 slots in
  the same order, same impossible text, minvent scan untouched. The
  `|| !!mon._youmonst` disjunct covers the repo's sentinel stand-in
  idiom (`{ _youmonst: true }`, e.g. artifact.js:205) — both disjuncts
  mean "is hero", faithful to the pointer test. ✓
- Constants: `AD_RUST = 24` = `monattk.h:66`; `ERODE_RUST = 1` =
  `obj.h:456`. ✓

Callee closure: `hitmsg` LIVE same-module (mhitu.js:325, C-cited),
`erode_armor` LIVE async (awaited), `rehumanize` LIVE async
(polyself.js:655, awaited), `impossible` joins the existing
worn→display edge, `--can mhitu.js mhitm.js erode_armor` → ALREADY
(D-log's "no new module edges" confirmed). CORR/DCAY mhitu arms,
uhitm/mhitm arms, and passive-erosion wirings are named with C
citations, no corpus block — legitimate combined-arm boundary: every
callee the shipped arm reaches is LIVE.

Nits (not C-wrongs): bare `impossible(...)` in sync `which_armor`
while the helper is async — repo-wide idiom (do_wear.js:528), and the
arm is unreachable with valid `W_*` flags; `void mhm` documents the
intentional non-use.

## Hallucinations / overclaim

None. "Same body" (rename-only) verified by reading both; "already
static" edge verified via `--can`.

## Density

Export + slot table + arm + dispatch = one C family (rust-erosion
path), ~70 lines, map + verify. Good §2b density.

## Verification

- Diff grep: no FORCE/DIAG/seed/coordinate content. Rule #2 clean
  (same-edge imports only).
- Re-measured myself: `node scripts/hidden-proxy.mjs verify erode_armor
  --base c9e049a8~1` → `1 PASS → PROGRESS`
  (`tour-Healer-70025-d5-8-15-17-22: PASS`). Matches the D-log exactly.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
