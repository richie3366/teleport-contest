# Review 1437 — 67ecc58a — newmail whole-body port (D-2478)

Metadata: SHA `67ecc58a`, `js/mail.js` (+259) + one-word `export` in
`js/worm.js`. C `mail.c:148–456` (`md_start`/`md_stop`/`md_rush`/
`newmail`, all staticfn). D-log: D-2478.

## Intent vs deliverable

Promise: whole `newmail` family in C order (macro equivalents,
start/stop/rush, daemon delivery). Diff ships that plus the
`place_worm_seg` export so the rush-restore arms import the live
export instead of cloning. No stubs in live arms.

## Inventory

- Added (module-local, matching C staticfn): `Deaf`/`Blind`/
  `Blind_telepat`/`distu`, `mail_text` + `md_exclamations`
  (`rn2(3)`), `md_start`, `md_stop`, `md_rush`; exported async
  `newmail`.
- Callee closure (all LIVE): `enexto` (teleport.js:657),
  `accessible` (monmove.js:736 — correctly the export, not the
  teleport.js:151 clone), `makemon`, `mongone` (async, awaited),
  `m_at`, `Hello`, `SetVoice`, `mksobj`/`oname`/`new_omailcmd`,
  `hold_another_object` (async, awaited), `place_monster`/
  `remove_monster`, `place_worm_seg` (worm.js:40, newly exported —
  required `sym.mjs` output confirms the single live definition).
- `sym.mjs` (required): `Hello` roles.js:766 sync,
  `new_omailcmd` mkobj.js:3344 sync, `hold_another_object`
  invent.js:7468 async, `place_worm_seg` worm.js:40 sync,
  `mons(mndx)` monsters.js:203 accessor idiom (dog.js:769 sibling).

## C ↔ JS fidelity

Walked C `:148–456` against the diff arm-by-arm — exact:

- `md_start`: Blind-nontelepat `enexto` arm; stair loop over
  `game.stairs` with `tolev.dnum` + `couldsee` (dog.js:753 sibling
  idiom for the linked list); farthest-edge `viz_rmin/rmax` loop
  with strict `>` max updates, lax retry as `for(;;)/continue`,
  `enexto && !cansee && couldsee` short-circuits — all verbatim.
  Missing-row null guard is the Named adaptation (C arrays always
  set; falls into C's found-nothing FALSE path).
- `md_stop`: 3×3 `isok`/`u_at`/`accessible`/`m_at` scan,
  closest-to-start with `rn2(2)` ties, `enexto` fallback with the
  daemon type — verbatim. Type check: C `distance`/`min_distance`
  are `coordxy` = `int16_t` (`global.h:71`), `dist2` max ~6641
  fits — no truncation divergence (checked, not assumed).
- `md_rush`: off-map greedy descent skipping only `!isok`/
  `IS_STWALL`, `m_at == md` prologue, destination/crowded breaks,
  displacement shouts (`verbalize('%s', …)` per D-2476 precedent —
  `mail_text` has no `%`), `"Excuse me."` through the hero,
  per-step place/newsym/flush/delay with monster restore, worm-seg
  restore via the `mx/my` test verbatim, crowded-destination
  refusal with the Deaf `pline('%s.', Never_mind)` arm — verbatim.
- `newmail`: `md_start && md_stop` short-circuit gates `makemon`
  (same eval order as C's sequential gotos); message block only on
  inward-rush success; greeting/Deaf arms; SCR_MAIL + `object_nam`/
  `response_cmd`; `"Catch!"` on `distu > 2` (= C `!m_next2u`,
  adjacency ≡ dist2 ≤ 2) with C's empty Deaf else kept as a
  comment; `display_nhwindow` as `flush_topl_more` (readmail
  precedent); `void obj` for `nhUse`; zip-back with `mx=my=0`
  fallback + `mongone`; `MSG_OTHER` `"Hark!"` fallback — verbatim.
- `plname || 'Hero'` matches the established codebase idiom
  (allmain/askname/display/do_name/invent); `PM_*/SCR_*` via
  `*Names.indexOf` matches apply.js precedent. RNG (`rn2(3)`,
  `rn2(2)`) call-for-call.

## Hallucinations / overclaim

None. Named omits (`ckmailstatus` stat/broadcast — Rule #2;
`m_next2u`/`MON_AT`/`distu` macro reads; viz-row nulls) are in the
message and the file header.

## Density

Right-sized: one C function family, one module + one-word export.

## Verification

- `hidden-proxy verify newmail --base 67ecc58a~1 --reach-all`
  (re-run): 0 blocked both sides (vacuous, as stated); smoke 24/24
  → REACH-OK. Matches.
- Diff grep: no FORCE/DIAG/`getRngLog`/seed/fastforward/coords.
- `verify.mjs --fn newmail` PASS tail (syntax/rule2/green/strict/
  cohort) per D-log; no corpus session blocked, so no REGRESSED
  possible.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
