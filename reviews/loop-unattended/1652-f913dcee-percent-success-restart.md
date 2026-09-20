# Review 1652 — f913dcee — `spell.c` percent_success C-order restart (D-2693)

Metadata: commit `f913dcee`, D-2693, `js/spell.js` only (63 changed
lines: 2 new int consts + full-function restart with per-arm C
cites). No prior review claimed closed. Pops the brief-verified
PARTIAL `percent_success` row (removed from the queue in this
commit).

## Intent vs deliverable

Subject promises: C-order restart with int-otyp consts. Diff
actually restarts `percent_success` arm-for-arm in C order,
replacing per-call `objectNames[otyp] === 'ROBE'` (×2),
`=== 'QUARTERSTAFF'`, six `otypByName('SPE_*')`, and per-call
`otypByName('SMALL_SHIELD')` with module int consts (new
`ROBE`/`SMALL_SHIELD` beside `QUARTERSTAFF`; the six `SPE_*`
consts verified defined at js/spell.js:267–286 this session).
No behavior delta beyond shape — the old lookups were
value-equivalent — plus a corrected envelope comment (the old
one misdescribed the oversized-shield arm as absent while the
code implemented it). Matches the promise.

## Inventory

Changed JS: `percent_success` (js/spell.js:1159, file-local
staticfn — no export, no new cross-module edge). No deleted or
re-pointed symbols. Callees all pre-existing: `spell_skilltype`,
`spellid`, `spellev`, `P_SKILL`, `acurr`, `is_metallic`,
`weight`, `isqrt` (local at :340). `sym.mjs isqrt`: NO export —
2 local clones (`dothrow.js:264`, `spell.js:340`), both
pre-existing, neither added here; the D-log discloses the
spell.js one as local. No clone action for this commit.

## C ↔ JS fidelity

C locus: `percent_success` `spell.c:2172–2292` (csym, 121 L —
whole body read). Callers: `spell.c:1371` → `js/spell.js:1827`
(`spelleffects_check`, pre-existing); `spell.c:2122` →
`js/spell.js:1511` (`dospellmenu` Fail% column, pre-existing);
`insight.c:1817` is a comment reference, not a call site
(correctly not wired). No RNG in C.

Step-by-step confirm against the printed C body:

- `paladin_bonus` (`:2182–2184`): `Role_if(PM_KNIGHT)` ≡
  `urole.mnum === PM_KNIGHT` (you.h:247 per D-log) `&&`
  clerical skilltype. Confirm.
- Armor/robe (`:2192–2196`): if/else-if shape, `spelarmr / 2`
  via `Math.trunc` (spelarmr non-negative), paladin skip.
  Confirm.
- Shield (`:2197–2198`), quarterstaff −3 (`:2200–2201`),
  helm/gauntlets/boots 4/6/2 with paladin skip (`:2203–2209`;
  consts verified :330–332), spelspec + spelsbon
  (`:2211–2212`), healing six + special (`:2215–2221`),
  upper-only splcaster clamp (`:2223–2224`). Confirm.
- `chance = 11 * statused / 2`, `skill = max − 1`,
  `difficulty` formula, isqrt penalty vs capped learning
  (`:2231–2256`); 0/120 clamp (`:2263–2266`); shield
  halve/quarter (`:2272–2278`); combine
  `chance * (20 − splcaster) / 15 − splcaster` (`:2285`);
  percentile clamp (`:2288–2291`). `Math.trunc` matches C `/`
  truncation on every division (C truncates toward zero;
  `Math.trunc` does too, for all signs — the D-log's
  "non-negative" qualifier is unnecessary but the conclusion
  holds). Confirm.

Classify: all callees LIVE (in-file or already imported);
`isqrt` a pre-existing local with no canonical home (not
drift-from-export); no CLONE added, no STUB in any arm.
Named omissions: none in this function.

Diff grep: no FORCE/DIAG/seed/coordinate. No import change.
Rule #2 clean (iteration-wide check at end of audit).

## Hallucinations / overclaim

None. The D-log calls this a shape restart, not a behavior
fix — accurate, since every replaced lookup was
value-equivalent. No "Match C" claim over a stubbed callee.

## Density

63 insertions for a 121-line C function restart: within the
breadth-phase band for a small-file restart. Not padded
(comment lines carry the per-arm `:line` cites the phase
requires).

## Verification

D-log Verify pattern per siblings. Re-ran
`hidden-proxy.mjs verify percent_success --base f913dcee~1
--reach-all`: "0 blocked (0 at baseline…)" — vacuous note
properly stated — plus "24 PASS, 0 regressed → REACH-OK". No
REGRESSED. Queue row cited 0 blocks, so honest, not D-1831.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
