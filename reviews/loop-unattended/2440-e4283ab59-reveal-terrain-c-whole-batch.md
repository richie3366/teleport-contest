# Review 2440 — e4283ab59 — reveal_terrain C-whole + impossible + 7 audits

**Metadata.** SHA `e4283ab59` (2026-10-06, D-3556). Type: legacy breadth-phase
batch (manifest @b39cb750e, 9 fn) + Open-head row (`impossible`); 10
functions, judged under §10.17 (landed before cliff-phase `aa9ebd345`).
`js/` insertions: ~68 (`js/detect.js` reveal_terrain + 1 import name;
`js/display.js` 1 comment). Only `reveal_terrain` has a JS change; the other
9 are audits. `ledger.mjs sql` is broken on this box (`node:sqlite` missing),
so the (a)/(b) random draws were replaced by full coverage: whole Method on
the changed function + all 3 required `audited` checks + structural checks
on the remaining 6.

## Intent vs deliverable

Promise: "`detect.c reveal_terrain` completed — the C `:2375–2376`
unconstrain_map/docrt arm wired, the `:2363` gate via live `You`, remaining
omits verified already-live inside `reveal_terrain_getglyph`, function
C-whole with no Named omissions"; honest "VERIFY: FAIL only on the two
pre-existing NO MOVEMENTs".

Diff actually adds: `You` import name; gate via `You(...)`; swallowed
capture kept; `if (unconstrain_map()) await docrt();` in C order; per-arm
cites; doc Named rewritten; display.js stale "arboreal deferred" comment
corrected. No other JS function added/changed. Promise matches diff.

## Inventory

Ledger bullet lists 10: `reveal_terrain` ported (detect.c:2354–2414,
JS [detect.js](/home/debian/dev/teleport-contest/js/detect.js:1382)); audited: `mayberem`
(mhitu.c:2308–2352, js/mhitu.js:1153), `spellretention` (spell.c:2294–2336,
js/spell.js:1363), `goto_level` (do.c:1479–1998), `getpos`
(getpos.c:771–1167), `relink_light_sources` (light.c:516–563,
js/light.js:282), `makerooms` (mklev.c:367–436), `initoptions_init`
(options.c:7119–7305), `seffect_destroy_armor` (read.c:1324–1396),
`impossible` (pline.c:583–634, [display.js](/home/debian/dev/teleport-contest/js/display.js:8971)).

## C ↔ JS fidelity

**`reveal_terrain` (full Method).** C detect.c:2354–2414 vs JS walked
arm-by-arm: `:2360` full ✓; `:2362–2363` disoriented gate now via live async
`You` (C callee; message bytes identical; early-return ≡ C if/else) ✓;
`:2369–2371` keep_* (+ `keep_mons` "not used" note; buf math still matches
C `:2393–2402` exactly, comma/and placement verified token-for-token) ✓;
`:2372` swallowed captured pre-unconstrain (`!!u.uswallow`; C `u.uswallow`
is boolean — identical) ✓; **`:2375–2376` wired**: `unconstrain_map()` is
the same-file local at detect.js:1056, body-identical to C staticfn
detect.c:68–81 (res = water||buried||swallow; save+clear; return res) — C
itself is staticfn, so file-local is the correct homing, not clone drift;
`docrt` already imported ✓; `:2379–2384` loop via `reveal_terrain_show_map`
✓; `:2388` flush ✓; `:2389–2403` buf ✓; `:2404` Showing ✓; `:2408` TER_MAP
✓; `:2409` browse_map ✓; `:2411` map_redisplay (reconstrains, balancing the
new arm — the D-log's ordering claim holds) ✓. No RNG either side. C callers
cmd.c:1170/1173/1176/1179 → JS doterrain :1522/1525/1528/1531, all four wired
with matching bit combos ✓. The five getglyph clauses (arboreal default,
keep_traps restore, M_AP_FURNITURE, region/gascloud, TER_FULL) spot-checked
live in [display.js](/home/debian/dev/teleport-contest/js/display.js:4475) (`default_id/default_cell`
arboreal, TER_FULL `back_to_glyph` arm, `visible_region_at` gascloud arm,
`trap_to_glyph` restore, `M_AP_FURNITURE` mimic arm) — `ported` with Named:
none is true.

**Audited sample (c), all TRUE — no second sample:** `mayberem`: JS
file-local matches C mhitu.c:2308–2352 call-for-call (`rn2(20)<ACURR`,
nested `!rn2(2)` lover/dear/sweetheart in C short-circuit order, uarm-chain
verbalize, `remove_worn_item(obj,TRUE)`; staticfn→local correct).
`spellretention`: percent/accuracy/range math matches C spell.c:2294–2336
(`Math.trunc` on both divisions; single JS caller uses the return value —
string-return idiom sound). `relink_light_sources`: arm-for-arm vs C
light.c:516–563 (FIXUP walk, OBJECT/MONSTER, find_oid/find_mid, which-miss
and bad-type panics→throws); the `lookup_bones_id`-for-`lookup_id_mapping`
substitution is explicitly in the ledger omit as its own row — named, not a
C-wrong.

**Remaining 6 (structural):** `impossible` verified whole in review 2439
this iteration. `goto_level`/`getpos`/`initoptions_init`/`seffect_destroy_armor`:
file-level last JS touch (D-3431/D-3433/D-3463/D-3414) predates each cited
full verification (D-3539/D-3553/D-3545/D-3543) — audit stands on unchanged
code, omit texts accurate. `makerooms`: all 46 `js/mklev.js` hunks since
D-3535 sit in loader regions (≤ ~:14k), none in :29572–29643 — untouched ✓.

## Hallucinations / overclaim

None. The two NO MOVEMENTs are reported as VERIFY: FAIL with per-block
proofs, not dressed as PASS; neither block was cited by its batch row
(batch rows cited none — true, manifest rows are partials/rechecks without
corpus cites). Proof (1) re-confirmed from the bodies: the gate path prints
and returns with zero RNG and zero map writes on both sides, so the row-17
cell cannot come from `reveal_terrain` on step 135. The queue row's
`:2380–2381` numbering is correctly called stale (`:2375–2376` in pinned C).

## Density

Legacy §10.17: manifest of its HEAD ✓, 10 ≤ 100 functions ✓, `Left open:
none` (2 pre-existing blocks each carry a proof, the batch-era convention)
✓, one Verify line per function ✓, sweep line (full 44/44) ✓. Per-function
verdicts: all 10 ACCEPT. SHA verdict: ACCEPT.

## Verification

- Diff grep (`FORCE|DIAG|getRngLog|fastforward|gx ===|gy ===`): clean.
- Rule #2: `imports.mjs --rulecheck` clean this iteration (see 2439).
- Re-measure (mine, one call, `--base e4283ab59~1 --reach-all`):
  `reveal_terrain`: 1 blocked (trap-94001 s135), "still reveal_terrain at
  step 135", 0/0/1/0 → NO MOVEMENT, smoke 24/24 REACH-OK; `getpos`: 1
  blocked (tour-92093 s87), unchanged → NO MOVEMENT, smoke 24/24 REACH-OK
  (HEAD code incl. D-3557's getpos.js change — still unchanged, not worse);
  other 8: 0 blocked; `mayberem` reach 2/2, `goto_level` 35/35,
  `makerooms` 720/720, smokes 24/24 — **0 regressed anywhere**. Matches the
  D-log's claim line-for-line; no vacuous PASS (it said FAIL).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
