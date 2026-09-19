# Review 1550 — 0a3136de — shk.c shk_fixes_damage + find_damage (D-2591)

## Metadata

- SHA: `0a3136de`
- D-id: D-2591. Next index: 1550.
- Files: `js/shk.js` (+56/−9).
- C locus:
  - `nethack-c/upstream/src/shk.c:4490–4506` (`find_damage`),
    `:4555–4577` (`shk_fixes_damage`), via `node scripts/csym.mjs
    shk_fixes_damage` plus direct reads of `:4470–4500`
    (repairable tail + find), `:4509–4577` (discard + body),
    `:4880–4900` (shk_move caller `:4892–4893`) here.
  - `hack.h:49` (BOLT_LIM 8).

## Intent vs deliverable

Subject promises both whole-body ports with the deps convention,
the mdistu closeby arm, the Deaf gate, unconditional discard, and
the shk_move caller wiring. Diff delivers all of it. Promise
matches deliverable.

## Inventory

- New file-local: `find_damage(shkp, deps)` — correct single local
  for a C staticfn.
- New exported async: `shk_fixes_damage(shkp)` (`js/shk.js:1584`).
- Wired caller: shk_move `:4189` under `inhishop`, placed after the
  omx/omy save and before the udist computation — same site and
  order as C `:4889–4895`.
- No deleted symbols.
- Callee closure (all LIVE or verified file-local, no STUB):
  - `repair_damage js/shk.js:1428` (file-local single; signature
    `(shkp, tmp_dam, catchup, deps)` matches the call's
    `(shkp, dam, false, deps)` — checked here).
  - `discard_damage_struct`, `repairable_damage`, `shk_impaired`,
    `mdistu_mon`, `hero_deaf` — file-local singles in shk.js
    (correct: all five are C staticfns or file-idiom helpers).
  - `se_mutter_incantation js/generated/seffects_data.js:135
    export const` — LIVE.
  - `Soundeffect js/sndprocs.js:38` — sync, no float.
  - `BOLT_LIM` joins the existing const.js import; `You_hear` the
    existing hack.js import. `hero_deaf` (`js/shk.js:1613`, Deaf =
    intrinsic/extrinsic/roleplay) is the pre-existing file idiom
    for C `!Deaf`.
- `mdistu` equivalence checked: C `mdistu(shkp)` = distu of the
  monster pos; JS `mdistu_mon` = `distu_xy(mx, my)`. Same quantity;
  `(8/2)² = 16` both sides (BOLT_LIM 8 confirmed at hack.h:49).
- No RNG in either C function and none added.

## C ↔ JS fidelity

- find_damage vs `:4490–4506`: damagelist head, impaired → null,
  loop with `repairable_damage → return`, `dam = dam->next`,
  fallthrough null. Match, in order.
- Body vs `:4556–4577`: find → early return; closeby arm; canseemon
  → `whispers an incantation|something`; elif `!Deaf && closeby` →
  soundeffect + You_hear with the C strings; `repair_damage(shkp,
  dam, FALSE)` with the return discarded (`await` on a value is
  inert — the value is unused); **unconditional**
  `discard_damage_struct` — the fix_shop_damage distinction the D-log
  calls out is real in C (fix path gates the unlink on nonzero).
  Match on every line.
- The old "shk_fixes_damage named omit" header comment is retired;
  allmain/bones fix_shop_damage callers stay named (untouched).

## Hallucinations / overclaim

None. The D-log states the deps mechanism (dynamic per the
fix_shop_damage precedent) and names what stays deferred.

## Density

56 insertions for a 23-line C function + a 17-line staticfn + caller
wiring — one function family, right size (§2b).

## Verification

- D-log claims `verify.mjs --fn shk_fixes_damage` → VERIFY: PASS
  (coverage row, 0 blocked at baseline — honestly stated).
- Re-ran here (required):
  - `hidden-proxy verify shk_fixes_damage --base 0a3136de~1
    --reach-all`
  - → 0 blocked both sides (vacuous note, expected — draws no RNG)
  - → smoke 24/24 REACH-OK.
- Claim confirmed, not vacuous-by-rewrite.
- Diff grep: no FORCE/DIAG/`getRngLog`/seed/coordinate/`fastforward`.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
