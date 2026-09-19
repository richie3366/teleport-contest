# Review 1522 — fe99f208 — weapon.c select_rwep (D-2563)

## Metadata

- SHA: `fe99f208`
- D-id: D-2563. Next index: 1522.
- Files: `js/weapon.js` (+178/−~50: restarted
  `select_rwep`, `PWEP_NAMES` table,
  `mwelded_mon` clone deleted, import joins).
- C locus: `nethack-c/upstream/src/weapon.c:532–676`
  (`select_rwep`, 145 L; `csym.mjs` range) plus
  tables `pwep` `:506–510`, `rwep` `:498–504`,
  `arwep` `:513–517`, `Oselect` `:469–472`,
  `mwelded` (`wield.c:1077–1084`), `is_art`
  (`artifact.c:2807–2813`) — all read directly.
  Callers: `monmove.c:855`, `mthrowu.c:984`,
  `:1192`, `weapon.c:814`.

## Intent vs deliverable

Subject promises: the whole 143-line body in C
order with all 4 C callers wired. Diff delivers
exactly that, promoting five deferred arms
(egg/Kop pie/boulder Oselect, polearm walk,
AKLYS walk, gem-sling, launcher switch) from
the old header comment into live code. Promise
matches deliverable. No RNG in C; none added.

## Inventory

- Restarted: `select_rwep(mtmp)` (exported
  sync); new `PWEP_NAMES` (order verified
  against `pwep[]` — exact, all 13).
- Callees, all LIVE: `oselect` (file-local,
  pre-existing), `throws_rocks`/`likes_gems`/
  `mindless`/`is_animal`/`strongmonst`/
  `mon_hates_silver`/`mons`, `couldsee`
  (`vision.js:1110`, `(x, y)` — matches),
  `is_art` (`artifact.js:2302`, verified
  body-equal to C `:2807–2813`),
  `ART_SNICKERSNEE` (generated leaf),
  `m_carrying`, `MON_WEP`, `dist2`,
  `oc_big` for `oc_bimanual`
  (`objclass.h:65` — verified alias).
- Re-point audit (`sym.mjs`, required):
  local `mwelded_mon` (`obj && obj.cursed`)
  DELETED — `sym.mjs` confirms NOT FOUND
  anywhere; live `mwelded`
  (`js/wield.js:179`) verified body-equal to C
  `wield.c:1077–1084` (`owornmask & W_WEP &&
  will_weld`). The re-point is a fidelity fix,
  not just a dedup: the clone under-checked.
  (One remaining `mwelded` clone in
  `monmove.js:565` predates this SHA and lives
  in another file — noted, not owed here.)

## C ↔ JS fidelity

Body vs C `:532–676`, in order:

- `:542–547` propellor init + EGG / Kop-pie
  (`mlet === 'S_KOP'` — the file-wide mlet
  string idiom) / boulder Oselect early
  returns (`Oselect` macro verified
  return-on-hit) ✓.
- `:556–587` polearm arm: `mweponly` via live
  `mwelded`, range-13 `dist2` + `couldsee`,
  Snickersnee-wielded early return, strong/
  shield/silver gate with `oc_big`, oselect +
  `(otmp == mwep || !mweponly)` ✓.
- `:589–607` AKLYS single-row walk
  (`BOOMERANG` commented out in C too),
  `AKLYS_LIM²` range, mindless/animal/
  mweponly gates ✓.
- `:611–626` gem-sling: `i == DART &&
  !likes_gems` (no mweponly in C — kept),
  double `m_carrying(SLING)` in C order, gem
  loop with the LOADSTONE-cursed carve-out ✓.
- `:628–651` launcher switch in C shape
  (CROSSBOW fall-out ≡ explicit `break`;
  welded-no-launcher → null) ✓.
- `:652–672` use/skip arm: `!= null` for
  `&hands_obj`-vs-`0`, no-`m_carrying` for
  LOADSTONE, **no mweponly gate and no
  `otmp == mwep` check** — the old code had
  both; C has neither. Verified removal ✓.
  `:675` null failure ✓.
- Callers: all four mirrored in JS
  (`monmove.js:2439`, `mthrowu.js:1414/1470`,
  `weapon.js:848`) ✓.
- Named: `can_touch_safely` inside `oselect`
  (`monmove.js:230` always-safe stub,
  select_hwep precedent, map-named) ✓.

## Hallucinations / overclaim

None. "Whole 143-line body" holds — every arm
is live or map-named, and the one named item
is a registered subsystem stub, not a silent
skip.

## Density

One 145-line C function, one file, ~178
insertions. Right-sized per §2b.

## Verification

- D-log: `verify.mjs --fn select_rwep` → PASS,
  honestly framed as ranged-choice path /
  0-blocked.
- Re-run here: `hidden-proxy.mjs verify
  select_rwep --base fe99f208~1 --reach-all` →
  0 blocked both trees (vacuous, honestly
  reported) + smoke 24 PASS, 0 regressed →
  REACH-OK. Matches.
- `imports.mjs --rulecheck`: clean (re-run this
  iteration). Diff grep: 0 hits for FORCE/DIAG/
  getRngLog/fastforward.

## Actionable C-wrongs

None. Branch order, table contents, caller
wiring, and the clone→import re-point all
check out against pinned C.

Verdict: **ACCEPT**
