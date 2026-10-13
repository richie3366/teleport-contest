# Review 2755 — 96bd880b4 — venom/pie arm reads live Blind()

- SHA: `96bd880b46e8cf334707758a120397e24a47b68b`
- Subject: D-3899 use_pick_axe2-row writer venom Blind arm (Samurai-585501 FULL PASS)
- Type: cliff (≤10 functions), whole Method on the function
- D-entry: `## D-3899` (DIVERGENCE-LOG.md)

## Intent vs deliverable

Promise: the CREAM_PIE/BLINDING_VENOM hit arm read a stale Blind
snapshot (`game.Blind || game.u?.Blind`) so blind-hero spit venom
printed the sighted branch; fix deletes both shadowing consts and calls
live `Blind()`, moving Samurai-585501 to FULL PASS. The `use_pick_axe2`
owner is a literal-matcher misattribution («Splash!» also at dig.c:1225).

Diff actually adds: `js/uhitm.js` — same 2-line predicate swap at both
sites (`hmon_hitmon_misc_obj` :1387, `hmon_hitmon` inline :1925) + C-cite
comments; new `scripts/spit-venom-blind-splash.test.mjs`. `Blind` already
imported (:57), no new edge. No other `js/` hunks.

## Inventory

| JS function | C locus | Status |
|---|---|---|
| `hmon_hitmon_misc_obj` (js/uhitm.js:1387) | uhitm.c:1265–1317, arm :1273 | changed, predicate |
| `hmon_hitmon` inline block (:1925) | same C arm (JS restructure) | changed, predicate |

## C ↔ JS fidelity

C (`uhitm.c:1265–1295`, read in pinned C): `case CREAM_PIE: /
BLINDING_VENOM:` → msleeping=0 → `can_blnd(...)` → `if (Blind)` (:1273)
→ "Splat!"/"Splash!", else venom-blinds / pie-splashes verbose arms,
then setmangry + mcansee=0 + `rn1(25,21)` mblinded. JS mirrors arm order
exactly; only the predicate changed. `Blind` is `youprop.h:103`
(`(HBlinded || EBlinded) && !BBlinded`); JS `Blind()`
(`js/invent.js:371`, sync export) implements exactly that (+ standard
roleplay gate) over live `game.u` fields — C-exact, while the deleted
const read the save-time snapshot the D-log cites (do.js:3797).

Helper classification: no helpers added; two shadowing consts (stale
clones) removed in favor of the LIVE import. `sym.mjs Blind` →
`js/invent.js:371 sync` (+30 unrelated file-local clones elsewhere —
pre-existing, untouched). Other stale reads (:3309, :4806) named as
different arms without session evidence — sibling rule, acceptable.

Grep: zero `FORCE`/`DIAG`/`getRngLog`/`fastforward` in `js/` hunks.

## Hallucinations / overclaim

None. Misattribution claim is evidenced (C's step-600 RNG log opens with
the spat-glob + thitmonst + `rn2(25)@uhitm.c:1295` draws — the venom HIT
path, not dig.c). "C hero Blind proven TRUE by message+draw" follows.

## Density

Cliff phase: `use_pick_axe2` was the cliffs head; writer
`hmon_hitmon_misc_obj` correctly ported. `Ledger:` entry present
(uhitm.c). One cliff, no bundling. Not a no-op.

## Verification

D-log: `verify use_pick_axe2: 1 PASS` (FULL PASS 1227/1227),
hmon_hitmon_misc_obj vacuous disclosed, reach 2/2 + 12/12, green/strict/
cohort. Audit re-measure (`verify use_pick_axe2,hmon_hitmon_misc_obj
--base 96bd880b4~1 --reach-all`): Samurai-585501 PASS;
`1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS`; reaches 2/2
and 12/12 → REACH-OK. No REGRESSED.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
