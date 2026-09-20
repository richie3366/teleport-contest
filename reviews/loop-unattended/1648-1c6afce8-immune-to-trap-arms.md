# Review 1648 — 1c6afce8 — `trap.c` immune_to_trap remainder arms (D-2689)

Metadata: commit `1c6afce8`, D-2689, `js/trap.js` only (+30/−? lines
in `immune_to_trap` plus one import and two consts). No prior review
claimed closed. Pops the brief-verified PARTIAL coverage row (removed
from the queue in this commit).

## Intent vs deliverable

Subject promises: TELEP/POLY/ANTI_MAGIC/FIRE arms. Diff actually
adds: `mon_has_amulet` import (deletes the inlined amulet loop +
now-unused `AMULET_OF_YENDOR` const), new consts `SCR_FIRE`/
`SPE_FIREBALL`, new local `firetrap_fuel`, and the four arm
rewrites. Matches the promise; untouched arms byte-identical.

## Inventory

Changed JS: `immune_to_trap` (js/trap.js:1662) — four arms.
New helper: `firetrap_fuel` (js/trap.js:1648, file-local).
Re-pointed: inlined amulet walk → canonical `apply.js`
`mon_has_amulet` (`sym.mjs`: `js/apply.js:1440` sync export —
output pasted in-session). Deleted local loop gone; no remaining
`AMULET_OF_YENDOR` reference in `js/trap.js` (grep this session) —
the const removal is safe.

## C ↔ JS fidelity

C locus: `immune_to_trap` `trap.c:2782–2934` (csym, 153 L — whole
body read). Caller: sole C caller `hack.c:2561` → pre-existing
`js/hack.js:1999` (unchanged, still wired). No RNG in C.

Arm-by-arm confirm against the C body printed above:

- TELEP: C `:2823` `In_endgame(&u.uz) || mon_has_amulet(mon)` →
  JS `In_endgame(u.uz) || mon_has_amulet(mon)`. The imported body
  matches C `wizard.c:105–114` exactly (csym: minvent walk,
  AMULET check; JS adds null/index guards only). The C subtlety
  (hero's Amulet lives in `gi.invent`, not `youmonst.minvent`,
  so hero-with-Amulet is not CLEARLY via this arm) is preserved
  by using the canonical walk — the old inlined loop had the
  same shape, so no behavior change beyond de-duplication.
  Confirm.
- POLY: C `:2828` `resists_magm(mon)` → `is_you ? HIDDEN :
  CLEARLY`, with the "covers Antimagic for player" comment
  carried over. JS is C-exact (`resists_magm` already imported
  from mondata.js). The old hero-only `Antimagic_prop` test is
  subsumed per C. Confirm.
- ANTI_MAGIC: hero branch C-exact (`Antimagic` → NOT_IMMUNE;
  `uenmax == 0` → HIDDEN with the "won't lose HP" comment);
  monster branch C-exact `!resists_magm(mon) && (mon.mcan ||
  (!attacktype(pm, AT_MAGC) && !attacktype(pm, AT_BREA)))` →
  CLEARLY with the "lifted from mintrap" comment. `attacktype`
  is a pre-existing file-local (js/trap.js:5353, already used
  at :5458) — not a new clone, no second definition added.
  Confirm.
- MAGIC/FIRE: fallthrough preserved with `/*FALLTHRU*/`;
  resistance gate C-exact (`is_you ? !Fire_resistance :
  !resists_fire`); invent walk matches C `:2908–2920` predicate
  for predicate (scroll/potion/spbook or worn-`is_flammable`;
  known-fire-SCR/SPE exemption with hero `dknown &&
  oc_name_known`, monsters always know). Hero iterates the
  `game.invent` array per the D-2477 idiom, monsters the
  `minvent` chain — same predicate, same exemption. Terminal
  `is_you ? HIDDEN : CLEARLY` matches C `:2921`. Confirm.

Classify: `mon_has_amulet`/`resists_magm`/`resists_fire` = LIVE
imports; `firetrap_fuel` = CLONE of an inline C loop predicate
(matched here — C has no such function, it is the `:2911–2919`
loop body factored out; factoring is faithful, order and
predicates identical); no STUB in any live arm. The two
`impossible()` paths stay named omissions (sync-port precedent
per D-1868, stated in the map comment).

Diff grep: no FORCE/DIAG/seed/coordinate. Import edge
trap.js→apply.js pre-exists (line 152); no new cycle surface.
Rule #2 clean (iteration-wide check at end of audit).

## Hallucinations / overclaim

None. "Whole-body port" in the comment header means the four
remaining gap arms (the rest of the body was already C-ordered);
the D-log names exactly which arms shipped and which two
`impossible()` paths stay omitted. No dispatch-with-stubbed-
callee shape: every callee in the four arms is LIVE or the
verified `firetrap_fuel` clone.

## Density

~108 insertions for four C arms + one factored predicate: within
the breadth-phase band for a remainder port. Not padded.

## Verification

D-log Verify pattern per siblings. Re-ran
`hidden-proxy.mjs verify immune_to_trap --base 1c6afce8~1
--reach-all`: "0 blocked (0 at baseline…)" — vacuous note
properly stated — plus "24 PASS, 0 regressed → REACH-OK". No
REGRESSED. Queue row cited 0 blocks, so honest, not D-1831.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
