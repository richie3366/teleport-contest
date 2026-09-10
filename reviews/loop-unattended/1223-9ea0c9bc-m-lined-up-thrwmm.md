# Review 1223 — 9ea0c9bc — m_lined_up mux + thrwmm (D-2257)

Metadata: SHA `9ea0c9bc` (D-2257). Queue row `mthrowu.c` m_lined_up,
2 sessions in traces (not as owner). Adjacent to D-2252 `lined_up`.
js/ +~107/−52 (mthrowu.js +146/−45 mixed, mhitm.js +7/−7).

## Intent vs deliverable

Subject promises mux/muy `|0` (no `u.ux` fallback), C Upolyd
`rn2(25)` concealment chain, C-order `thrwmm`, and `mattackm`
AT_WEAP `distmin>1` wiring. Diff is that. Promise kept.

## Inventory

Changed: `m_lined_up`, `spitmm` tx/ty, `monshoot`, `thrwmu`
retreat dist. New: `export async function thrwmm`. Wired:
`mattackm` AT_WEAP ranged. `sym.mjs`:

```text
thrwmm           js/mthrowu.js:1296   ASYNC
m_lined_up       js/mthrowu.js:355   sync
monshoot         NOT EXPORTED — 1 LOCAL js/mthrowu.js:1244
lined_up         js/mthrowu.js:381   sync
select_rwep      js/weapon.js:465   sync
mon_wield_item   js/weapon.js:704   ASYNC
monmulti         js/weapon.js:1459   sync
some_mon_nam     js/do_name.js:1039   sync
obj_is_pname     js/objnam.js:2403   sync
m_throw          js/mthrowu.js:997   ASYNC
is_pole          js/wield.js:154   sync
linedup          js/mthrowu.js:321   sync
```

`--can mhitm.js mthrowu.js thrwmm` ALREADY. `monshoot` stays
module-local (C `staticfn`).

Callee closure — `thrwmm` (`mthrowu.c:968–1012`): `mon_wield_item`
LIVE, `select_rwep` LIVE, `is_pole` LIVE, `m_lined_up` LIVE,
`ammo_and_launcher` LIVE, `monshoot` LIVE (same-file), `nomul`
LIVE. Polearm vs-mon skip is C (`!ispole && m_lined_up` else
MISS) — not the named `thrwmu` polearm omit. `monshoot`
(`:261–314`): `monmulti` LIVE, `xname`/`singular`/`the`/`an`
LIVE, `obj_is_pname` LIVE, `some_mon_nam` LIVE, `set_msg_xy`
LIVE, `m_throw` LIVE. `mattackm` AT_WEAP (`mhitm.c:393–404`):
`thrwmm` LIVE, then pretend HIT + DEF_DIED/AGR_DIED.

## C ↔ JS fidelity

- `m_lined_up` vs `:1375–1393`: `utarget` hero; tx/ty =
  `mux|0`/`muy|0` (C reads mux even when 0; JS `undefined|0`
  is 0, same as zeromonst); ignore_boulders 1|2 vs 0;
  `Upolyd && rn2(25) && (uundetected || unusual AP)` as one
  `&&` chain (`M_AP_TYPE(you)` = C `U_AP_TYPE`); `linedup`.
  Diff deletes the four `mux ?? u.ux` sites. C.
- Concealment RNG is the same draw as the old nested `if
  (rn2(25)) { if (undetected||AP) }` — order matches C's
  short-circuit (rn2 always when utarget&&Upolyd).
- `thrwmm`: NEED_WEAPON/`!MON_WEP` → NEED_RANGED_WEAPON;
  wield ≠0 → MISS; no rwep → MISS; `!ispole && m_lined_up`;
  `chance = max(BOLT_LIM-distmin,1)`; `!mflee || !rn2(chance)`;
  ammo `dist2 > PET_MISSILE_RANGE2` (const 36) → MISS;
  marcher/mtarget + `monshoot` + clear + `nomul(0)` → HIT.
  C. RNG: one `rn2` on the flee gate only.
- `monshoot`: dm from mtarg mx/my else mux/muy `|0`; `m_shot`;
  canseemon `the` vs `an` + `" at "` `some_mon_nam`; volley
  `m_throw`; `mhp<1` breaks remaining (`DEADMONSTER`); reset.
  C. `m_shot.o = 0` is STRANGE_OBJECT.
- `mattackm` AT_WEAP `distmin>1`: strike from thrwmm MISS test,
  pretend HIT, DEF_DIED assignment, AGR_DIED or, break (no
  FALLTHROUGH into melee). C.

## Hallucinations / overclaim

None. Hidden is labeled not a corpus PASS. `thrwmm` is a real
export, not a stub; the AT_WEAP arm is not “dispatch ported,
callee stubbed.” Named omits (`thrwmu` polearm / always_toss,
`linedup_callback`) are outside this body.

## Density

+~107 for mux fix + 45-line `thrwmm` + `monshoot` C-shape +
one `mattackm` arm. One throw envelope. In-band.

## Verification

Audit re-ran the corpus claim itself:

```text
verify m_lined_up: baseline 9ea0c9bc~1 — 0 session(s) blocked
on it (0 at baseline, 0 in the working scoreboard)
```

Vacuous-0-confirmed as owner (row was trace reach). Green 2/2 +
strict ×2 + cohort 7/7; skip full (mthrowu/mhitm not auto-full);
hand 44/44 pasted because `monshoot` is on the hero throw path.
Diff grep: no FORCE/DIAG/seed/coordinates/fs. Rule #2 clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
