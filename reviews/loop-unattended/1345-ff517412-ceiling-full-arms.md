# Review 1345 — ff517412 — dungeon.c ceiling full arms via trap.js export

- SHA: `ff517412`, D-2379. JS files: `js/trap.js` (full port), `js/potion.js`
  (clone deleted, 2 call sites rewired).
- Prior reviews closed: none.

## Intent vs deliverable

Subject promises: full `ceiling()` arms in the trap.js export, retiring the potion.js
`ceiling_at` clone. Diff actually adds the 9 post-room arms + `!Is_earthlevel` gate,
deletes the clone, rewires `peffect_levitation` + `peffect_gain_level`. Matches the
promise; no extra scope.

## Inventory

| JS symbol | Kind | Status |
|---|---|---|
| `ceiling` (trap.js:3421) | C callee port (dungeon.c:1713–1747) | LIVE, exported sync |
| deleted `ceiling_at` (potion.js) | local clone → import | retired ✓ |
| `ceiling_at` (dothrow.js:1060) | remaining clone | named own row, untouched |

`sym.mjs ceiling` → `js/trap.js:3421 sync`; `sym.mjs ceiling_at` → only the dothrow
clone ("Do NOT write clone #2" — this commit writes none). Required re-point output
pasted. `imports.mjs --can potion.js trap.js ceiling` → ALREADY (no new edge).

## C ↔ JS fidelity

C body (`csym` → `dungeon.c:1713–1747`, 35 lines) vs JS, in C order: vault ✓,
temple ✓, shop ✓ (`in_rooms`, already imported), water-level ✓ (before AIR, as C),
sky ✓, fire ✓, quest ✓ (`uz = game.u?.uz` passed explicitly — matches the
`const.js:3209–3214` predicate signatures), Underwater → "water's surface" via
`(uinwater|0)` ✓ exact (`#define Underwater (u.uinwater)`, `youprop.h:279`; the
dead `u.Underwater` read in zap.js is separately named, not touched here),
`(IS_ROOM && !Is_earthlevel) || WALL || DOOR || SDOOR` → 'ceiling' ✓, else
'rock cavern' ✓. Literals byte-match C; no RNG either side. `at?.` null-safe read
is a safe superset of C's direct deref. The old clone's two drops (vault/temple/shop
arms, water/air/fire/quest/Underwater arms, earthlevel gate) are exactly what this
restores — a pure gain with live screen surface (levitation/gain-level plines + 10
other call sites served by the same export).

## Hallucinations / overclaim

"Cross-checked against ceiling_updown" — consistent (same C literals). Named items
(dothrow clone, zap dead-Underwater, has_ceiling clones incl. unaudited mon.js:3075
honestly flagged "not audited") are precise. Verify bullet notes full-suite skip
reason (no shared file changed) — honest. No overclaim.

## Density

~50 js/ insertions for a 35-line C function + clone retirement + 2 rewires: one C
locus, right-sized (§2b).

## Verification

- `imports.mjs --rulecheck` → Rule #2 clean (this review).
- Diff grep → 1 hit, commit-message prose ("FORCE" substring), no code.
- Re-measured: `hidden-proxy verify ceiling --base ff517412~1` → "0 at baseline,
  0 working" — row cited 0 blocks, vacuous note correctly labeled. No seed/step/
  coordinate reads in the diff.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
