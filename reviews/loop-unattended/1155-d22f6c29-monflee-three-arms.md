# Review 1155 — d22f6c29 — monmove.c monflee release_hero/flees_light/Vrock arms (D-2189)

Metadata: SHA `d22f6c29`, js/ +53/−10 in `monmove.js`
only (`flees_light` helper, three arms, 2 consts, 5
import lines). D-log D-2189. Subject promises: Vrock
`rn2(25)` gas cloud — RNG-first step 80, 1 session
moved past (80→96).

Intent vs deliverable: promise matches diff. Actually
adds: `release_hero` wiring + full gremlin message arm
+ Vrock cloud, in C order. No new module edge for the
new names (`--can` cycle-safe; Unaware/SetVoice/
artifact_light/bare_artifactname/yname join existing
edges).

Inventory: +1 file-local helper (`flees_light`, the
macro has no C function home — correct placement), +0
exports, +0 clones. Reuses the same-file `release_hero`
(D-1798) rather than cloning — right call.

**C ↔ JS fidelity**: confirm against C
`monmove.c:461–530` + macro `:450–457` + `release_hero`
`:361–372`, all read at HEAD — branch-for-branch:

- `flees_light`: C macro = gremlin-pointer &&
  ((uwep lamplit arti) || (uarm lamplit arti)) &&
  mcansee && couldsee. JS uses `mndx === PM_GREMLIN`
  (≡ pointer compare via the mons[] index) with the
  same conjunction order. ✓
- `release_hero` local (`monmove.js:2166`) matches C
  `:361–372` (expels / unstuck + "get released!");
  wired as `mtmp === u.ustuck`, C's exact gate. ✓
- Message arm: gate (`!mflee && fleemsg && canseemon
  && M_AP furniture/object`) and fleetime
  accumulate/`==1` bump/127 cap untouched; flinch /
  Unaware-"frightened" / `rn2(10) || Deaf` painful-light
  with `lsrc` = bare_artifactname(uwep) / yname(uarm) /
  "[its imagination?]" (no lamplit re-check, per C's
  own comment) / SetVoice+verbalize / turns-to-flee —
  exact C order, including `||` short-circuit RNG
  order. ✓
- Vrock: `mndx === PM_VROCK && !mspec_used` →
  `mspec_used = 75 + rn2(25)` drawn before
  `create_gas_cloud(mx,my,5,8)` — C `:521–524` order;
  this draw is the recorded step-80 divergence. ✓
  `mflee = 1`, unconditional `mon_track_clear`. ✓
- Callee closure all LIVE or verified local:
  `sym.mjs` → Unaware eat.js:495 sync (body =
  `multi<0 && unconscious||is_fainted`, the youprop.h
  gate); hero_Deaf = same-file clone of the Deaf gate
  (no export exists anywhere — correct reuse);
  SetVoice/artifact_light/bare_artifactname sync;
  create_gas_cloud async + awaited; yname/couldsee/
  verbalize pre-existing imports. No STUB in any arm. ✓
- Debt correctly left out: music.js:220 `monflee`
  clone (import-the-export debt, out of envelope);
  the 8 other-file Unaware clones (pre-existing).

RNG: `rn2(10)` gremlin + `rn2(25)` Vrock, both in C
order, both previously absent (the recorded gap).

Hallucinations / overclaim: none. The D-log's
"js-throw is the null-owner fallback label, not an
exception" is source-true (`hidden-proxy.mjs:388`
`r.owner || 'js-throw'`), with direct replay
(RNG 23948/23948, error null) cited. Residual step-96
owner-null screen diff is explicitly not claimed.

Density: +53 for three arms of one function on an Open
row — right-sized (§2b).

Verification: D-log cites `verify.mjs --fn monflee` →
PROGRESS (80→96) + green + cohort + auto full 44/44.
Re-measured independently: `hidden-proxy.mjs verify
monflee --base d22f6c29~1` → baseline 1 blocked,
`0 PASS, 1 moved past, 0 unchanged, 0 worse →
PROGRESS` (Monk-91117 → step 96). Exact match.
`rulecheck` clean (re-ran). No DIAG/FORCE/seed/
coordinate gates in added lines.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
