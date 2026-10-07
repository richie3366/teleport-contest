# Review 2496 — b226c2d08 — peffect_polymorph min-macro double draw (D-3615)

- SHA: `b226c2d088e0aa677eb81ee3ce819e2d0c206f99`
- Subject: `potion.c` peffect_polymorph: C `min` is a macro (Valkyrie-92195
  PASS) (D-3615)
- Type: cliff (1 C function), js +12/−2 in `js/potion.js` + new test
- Prior reviews closed: none

## Intent vs deliverable

Promise (terse subject; detail in D-3615): expand the min macro in C order
so the losing branch draws `rn2(15)` twice; Valkyrie-92195 → PASS. Diff does
exactly that. Matches.

## Inventory

- `peffect_polymorph` (`js/potion.js:1749+`) — changed, 1 expression. C:
  `nethack-c/upstream/src/potion.c:1317-1330` (`csym` range, whole body read)
  + `min` at hack.h:1518.
- No new/deleted symbols; no new imports.

## C ↔ JS fidelity

C :1327 `u.mtimedone = min(u.mtimedone, rn2(15) + 10)` with
`#define min(x, y) ((x) < (y) ? (x) : (y))` expands to: condition draws
`rn2(15)` once; true arm keeps mtimedone (1 draw total); false arm evaluates
`rn2(15)+10` again (2 draws). JS `const d1 = rn2(15); if (!(mt < d1+10))
mt = rn2(15)+10;` is the expansion in C order — both arms' draw counts and
values exact. Probe dice confirm: C `13, 10` → mtimedone 20; old JS drew
once → 23 and shifted the keystream. Same-file audit verified myself:
potion.c's other min/max (:671, :1827, :2524) take no RNG args — no
companions needed. Caller (peffects POT_POLYMORPH → js :2173) pre-wired per
D-1428; the D-2177 polyself arm is a different arm, correctly not re-ported.

Cheat grep: clean. Rule #2 clean (run this iteration).

## Hallucinations / overclaim

None. "Condition-true arm ported but unpinned" is honest about the untested
arm (reachable only with scaled-down mtimedone, `ulevel < mlvl`).

## Density

Cliff phase: owner peffect_polymorph is the probe head itself; one function,
probe PASS. Per-function verdict: peffect_polymorph — ACCEPT.

## Verification

Re-measured myself: `verify peffect_polymorph --base b226c2d08~1
--reach-all` → Valkyrie-92195 PASS, `1 PASS → PROGRESS`, smoke reach 24/24,
0 regressed. Matches the D-log exactly.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
