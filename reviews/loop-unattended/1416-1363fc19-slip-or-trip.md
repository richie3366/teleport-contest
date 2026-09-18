# Review 1416 — 1363fc19 — slip_or_trip whole-body port (D-2457)

Metadata: SHA `1363fc19`, `js/timeout.js` restart (:176–307) + one-word
`NODIAG` export (`mon.js`). Coverage PARTIAL → all arms live; also
parks `rloc_to_core` STALE. D-log: D-2457.

## Intent vs deliverable

Promise: port the six omitted arms — ONE_ITEM_HERE pronoun, Hallu
highc bite/bites, cockatrice-corpse instapetrify, mounted steed-name
+ vtense slip/slide, unseat + `rn2(10+DEX)` confdir/hurtle, mounted
`rn2(4)` switch + dismount. Diff ships all six in C order. No second
subsystem (the STALE park is a one-line queue move, same commit).

## Inventory

- Restarted: `slip_or_trip` (local fn, correct — C staticfn).
- One-word export: `NODIAG` (import, explicitly not clone #2).
- New edges (`which_armor`, `dismount_steed`, `hurtle`) IN-SCC,
  runtime-called (`--can timeout.js steed.js`: ALREADY); rest join
  existing edges. `Your` as `"Your "` pline (no clone #5); local
  `is_ice` reused, none added.

## C ↔ JS fidelity

C `timeout.c:1222–1341` vs JS, arm by arm:
- Pronoun chain (`:1240–1247`): ONE_ITEM_HERE it/they/them,
  dknown/!Blind doname, `sobj_at(ROCK)` rock/something — exact.
- Hallu (`:1248–1252`): first-char highc, `bite`+`s` iff single
  (dead `!otmp` preserved verbatim, harmless) — exact.
- Corpse (`:1256–1261`): `!uarmf` + CORPSE + `touch_petrifies` +
  resistance-flat + `an(pmname(NEUTRAL)) corpse` → `instapetrify` —
  exact. The `u.Stone_resistance ||` third disjunct matches the
  codebase idiom (`invent.js:1984`, `mthrowu.js:1181`); unset it is
  falsy and the expression reduces to C `youprop.h:65`
  `(H||E)` — no demonstrable divergence.
- Ice (`:1262–1299`): `ice_only` from extrinsic flat+uprops,
  `upstart(x_monnam(...SUPPRESS_SADDLE))`/`vtense('steed'/'you')` per
  the C comment, `rn2(2)` slip/slide, on/off ice, unseat
  short-circuit (`!ice_only || !rn2(3)`, uncursed saddle holds),
  `rn2(10+acurr(DEX))` + NODIAG-gated `confdir(true)` + start-square
  hurtle guard — RNG draws in C order, `which_armor` hoist is a pure
  read (no draw/state). Exact.
- Plain/mounted (`:1300–1339`): on_foot `rn2(4)` four messages;
  mounted re-reads `which_armor` (matches C `:1321`, not the hoisted
  copy), `rn2(4)` stirrups/reins/horn/side + DISMOUNT_FELL unless
  cursed — exact.

## Hallucinations / overclaim

None. "Named: none new, none remaining" is accurate for this body
(all six prior deferred arms now live).

## Density

One C function restart, ~130 insertions, one C file: right-sized.

## Verification

- `hidden-proxy verify slip_or_trip --base 1363fc19~1 --reach-all`
  (re-run): 0 blocked both sides (vacuous, as stated); reach 12/12
  PASS, 0 regressed → REACH-OK. Matches.
- Diff grep: no FORCE/DIAG/seed/coordinate logic.

## Actionable C-wrongs

None. Whole body ports C in order.

Verdict: **ACCEPT**
