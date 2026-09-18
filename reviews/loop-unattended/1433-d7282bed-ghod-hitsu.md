# Review 1433 — d7282bed — ghod_hitsu whole-body port (D-2474)

Metadata: SHA `d7282bed`, `js/priest.js` (+100/−2) + `js/mon.js`
(+8/−2) + `js/pray.js` (+5/−1) + `js/uhitm.js` (+23/−3). C
`priest.c:795–874` (80 L). D-log: D-2474.

## Intent vs deliverable

Promise: whole `ghod_hitsu` in C order (temple bolt-origin arms,
anger plines, null-wand lightning) + wakeup/hmon wires. Diff
ships that, including the well-executed `hmon`→`hmon_hitmon`
rename with a new C-shaped wrapper (export name unchanged, old
callers unaffected). Queue side-effect is a clean pop-2 /
refill-3 / STALE-park-1 (getmattk parked same-commit after its
brief showed the split-named live body — correct stale handling).

## Inventory

- Added: `export async function ghod_hitsu` (C global ✓),
  `export function a_gname_at` in pray.js (C global via
  extern.h:2570 — canonical home ✓, single definition),
  file-local `sgn` + `AD_ELEC = 6` (= `monattk.h:48` ✓).
- Wired: mon.js wakeup (inside `was_peaceful`, after setmangry,
  before the shk arm = C `mon.c:4352–4360` order) and the new
  uhitm `hmon` wrapper (`mon.ispriest && !rn2(2)` — rn2 burns iff
  ispriest, runs even when the priest died, = C `:827–830`).
- `sym.mjs` (required): no deleted symbols (priest.js deletion is
  only the do_name import widened for `s_suffix`). `a_gname_at`
  single export, no prior clone. `temple_occupied`/`has_shrine`
  LIVE priest.js exports. `sgn` is clone #17 with **no shared
  exporter** (C `sgn` is hacklib macro-class) — disclosed,
  3-line pure function, acceptable. `AD_ELEC` local-const idiom
  (cf. mhitu.js) — no exporter to import.

## C ↔ JS fidelity

- Gates: `temple_occupied(u.urooms)` char gate (`'\0'` check —
  correct: the helper returns 1-char strings) + `has_shrine`;
  `svr.rooms[roomno-ROOMOFFSET]` via the charCodeAt idiom —
  exact.
- Bolt origin: shrine default; `u_at || !linedup` → door
  4-arm / `rn2(4)` edge switch in order; second linedup →
  return — exact, RNG conditional on path exactly as C.
- Anger `rn2(3)` plines with `a_gname_at(ax, ay)` / `s_suffix`
  (double space after the colon preserved) — exact. Note: both
  interpolate runtime god-name strings into single-arg `pline`
  (re-scan class of the 1430 Must-fix); god names are
  data-fixed and %-free, so safe in practice — in-scope for that
  audit, no new row.
- `a_gname_at`: `align_gname(game.urole, a_align(x, y))` is the
  correct house spelling of C `align_gname(a_align(x, y))`
  (roles.js `(urole, algn)` convention, 4+ users); `''`
  vs C NULL unreachable past the shrine gate.
- Bolt trailer: `current_wand` null/restore hits the **live**
  channel (readers at apply.js:973, shk.js:2029,
  teleport.js:1137) with try/finally restore (= C oldcurrwand);
  `buzz(BZ_M_SPELL(BZ_OFS_AD(AD_ELEC)), 6, x, y,
  sgn(_tbx), sgn(_tby))` — live const.js constructors;
  `exercise(A_WIS, FALSE)` — exact.
- **Debt (latent, not live): the `gb.buzzer` save/null/restore
  writes `game.buzzer`, which has no readers.** The live channel
  is `game._buzzer` (mcastu.js:995: "C: gb.buzzer (JS
  game._buzzer…)"; readers at muse.js:778 et al.), copied from
  the pre-existing dead-field precedent (mthrowu:487,
  timeout:1360 — the latter even cites `gb.buzzer = 0` while
  writing the dead field, and its buzz is a named omit).
  Behaviorally inert today: every `_buzzer` writer restores
  symmetrically and hero paths never set it, so it is null at
  every reachable `ghod_hitsu` entry (single-threaded, no
  interleaving hero action inside a monster zap window). The only
  divergence needs a re-entrant zap window (monster zap →
  wakeup(P, via_attack) → god-bolt with stale attribution).
- `hmon` anger_guards tail (`:826–827` + `:831–833`): confirmed
  absent in the parent too — pre-existing unwired, named in code
  + map. Not a regression.

## Hallucinations / overclaim

None live. The map's "wand/buzzer-null" overclaims only the
latent buzzer half (the headlined null-wand half is live).

## Density

One 80-line C function + two wires + one rename across 4 files,
126 ins: right-sized.

## Verification

- `hidden-proxy verify ghod_hitsu --base d7282bed~1 --reach-all`
  (re-run): 0 blocked both sides — vacuous, as stated. Smoke
  24/24 → REACH-OK. Matches.
- Diff grep: no FORCE/DIAG/`getRngLog`/seed/fastforward.

## Actionable C-wrongs

1. (Debt — map-noted, no Must-fix) Retarget the `gb.buzzer`
   save/null/restore in `ghod_hitsu` (`js/priest.js:258–266`)
   from dead `game.buzzer` to live `game._buzzer`; audit the
   sibling dead writes (`mthrowu.js:487`, `timeout.js:1360`).

Verdict: **ACCEPT-WITH-DEBT**
