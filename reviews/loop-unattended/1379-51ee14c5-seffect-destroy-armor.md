# Review 1379 — 51ee14c5 — seffect_destroy_armor cursed disintegrate arm (D-2416)

- SHA: `51ee14c5`, D-2416 (Open row: Healer-92173 step 230,
  obj_resists writer measured in D-2413). JS files: `js/read.js`
  only (one `else if` + import name + export + envelope doc).
- Prior reviews closed: none (corpus-owner row, 1 block).

## Intent vs deliverable

Subject promises the `:1380–1383` scursed arm
(`disintegrate_arm` → `known = true`, scroll survives) in C
order. Diff delivers exactly that — 4 added lines plus joins.

## Inventory

| JS symbol | Kind | Status |
|---|---|---|
| scursed `else if` arm | new branch | LIVE — C `read.c:1380–1383` |
| `disintegrate_arm` (do_wear.js:3388, async) | C callee | LIVE — joined existing static edge, awaited |
| `seffect_destroy_armor` (now exported) | changed fn | LIVE — export for the test pin (cf. D-2412) |

No symbols deleted or re-pointed.

## C ↔ JS fidelity

C locus read in pinned source: `read.c:1354–1364` (csym range for
`seffect_destroy_armor` is `:1323–1396`).

- Gate: C `if (otmp && otmp->cursed)` (vibrate) /
  `else if (disintegrate_arm(otmp))` ≡ JS `if (otmp &&
  otmp.cursed)` / `else if (await disintegrate_arm(otmp))`. ✓
- Effect: C `gk.known = TRUE; return;` (void return = scroll
  survives, no useup) ≡ JS `known = true;` falling to `return
  sobj;` (caller at `read.js:2002` keeps the scroll on a
  truthy return). The old code returned `sobj` without setting
  `known` — the exact reported symptom (gloves stay, scroll
  unidentified). ✓
- RNG: the arm draws nothing in C (vibrate's `rn1` sits in the
  sibling arm, still deferred and named); `disintegrate_arm`
  body untouched. ✓
- Named (not charged): vibrate `adj_abon` + `make_stunned`
  body, blessed getobj choice + `disintegrate_cursed_armor`,
  confused `p_glow2`/COST_DEGRD — all pre-existing, envelope
  doc updated to match. ✓

## Hallucinations / overclaim

None. The D-log reports `1 PASS, 2 unchanged` without inflating
the two unchanged sessions, and names the still-open writers
(D-2414/D-2415) that own them.

## Density

~10 `js/` lines + a 2-case unit test for one measured writer.
Right-sized.

## Verification

- Added-line grep `FORCE|DIAG|getRngLog|fastforward|seed|coord` → 0.
- `imports.mjs --rulecheck` → Rule #2 clean (re-run this audit).
- Re-measured: `hidden-proxy verify obj_resists --base
  51ee14c5~1` on the working tree → `3 PASS, 0 moved past, 0
  unchanged, 0 worse` (Healer-92173 + Arch-92238 + Knight-92182).
  Stronger than the D-log's contemporaneous `1 PASS, 2
  unchanged`: the other two moved under later commits (D-2417),
  all in the PROGRESS direction, 0 worse. No D-1831 shape.
- `node --test scripts/seffect-destroy-armor.test.mjs` → 2/2
  (re-run this audit). Green/cohort per D-log accepted.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
