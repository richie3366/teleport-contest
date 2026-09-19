# Review 1482 — 4cc8a6c0 — do.c canletgo whole body + throw wire (D-2523)

## Metadata

- SHA: `4cc8a6c0`
- D-id: D-2523. Next index: 1482.
- Files: `js/do.js` (restart), `js/dothrow.js` (+8, caller wire).
- C locus: `nethack-c/upstream/src/do.c:664–711` (`canletgo`, 48 L).

## Intent vs deliverable

Subject promises: whole `canletgo` in C order (PARTIAL → live). Diff actually
adds: restarted `canletgo` (`js/do.js:2283`) with `:line` cites for all five
gates, four import words on ALREADY edges, and the `dothrow.c:118` caller
wire. Old thin clone (hardcoded hand, missing LEASH arm, `bknown = 1`
direct) is gone. Promise matches deliverable.

## Inventory

- Changed: `canletgo` (restart, exported async — same name/signature).
- Changed: `throw_obj` (`js/dothrow.js:1014`) — new `await canletgo(obj,
  'throw') → ECMD_OK` gate; import added.
- Untouched: `drop` (`js/do.js:2676`), `do_wear.js:3363/3391`,
  `polyself.js:1030/1032` (pre-existing LIVE wires), `ball.js`/`muse.js`
  silent clones (pre-existing, named below).

## C ↔ JS fidelity

`csym.mjs` body `:664–711`; callers: 14 refs (ball/do/do_wear/dothrow/
invent-comment/muse/polyself). Arm walk:

- `:667–672` worn armor/accessory + `*word` gate + `Norep("…something you
  are wearing.")`: verbatim; `*word` → explicit `hasWord` (all real
  callers pass `""` or a non-empty literal). `something` is the literal
  C string. Confirm.
- `:673–686` welded uwep: `welded()` LIVE (`js/wield.js:185`),
  `body_part(HAND)` LIVE (`js/polyself.js:589`), `bimanual` LIVE
  (`js/wield.js:1024`), `makeplural` LIVE (`js/objnam.js:2101`),
  message shape `You cannot <word> something welded to your <hand>.`
  exact. The no-`weldmsg` silent-bknown note is carried in the comment.
  Confirm.
- `:687–702` cursed loadstone: `LOADSTONE && cursed` gate, `throw`+quan>1
  corpsenm kludge (`word === 'throw' && (obj.quan|0) > 1` — exact),
  `" any of"` + singular/plur message (plur inline, singular iff
  quan==1), unconditional `corpsenm = 0` + `set_bknown(obj, 1)` LIVE
  (`js/mkobj.js:605`) outside the word gate, `return false`. Confirm.
- `:703–708` leash: `LEASH && leashmon !== 0`, `pline_The("leash is tied
  around your <hand>.")` via `You`/`pline_The` LIVE (`js/display.js:7547/
  :7559`, awaited). Confirm.
- `:709–711` saddle: `W_SADDLE`, `You("cannot … sitting on.")`. The old
  code used `pline`; the restart uses `You` per C. Confirm.
- No RNG in C; none in JS. Return shape boolean; all five FALSE arms +
  TRUE tail present, in C order.
- New caller: C `dothrow.c:118` (`if (!canletgo(obj,"throw")) { res =
  ECMD_OK; goto unsplit_stack; }`, coin gate just above at `:112–116`)
  → JS coin gate then `if (!(await canletgo(obj,'throw'))) return
  ECMD_OK;` — order coin→canletgo→Mjollnir kept; nothing is split yet at
  this point in JS (multishot split comes later), so plain `return`
  satisfies the `unsplit_stack` goto. ECMD consts pre-imported. Confirm.

Callee closure: `Norep`/`You`/`pline_The` (display), `welded`/`bimanual`
(wield), `set_bknown` (mkobj), `body_part` (polyself), `makeplural`
(objnam) — all LIVE; `--can` on the new words: ALREADY edges, no TDZ
surface. No STUB in any live arm. No `sym.mjs` delete/re-point paste owed
(same-name restart, no clone removed).

Callers audit (all 14 C refs accounted): `do.c:718` drop ✓, `dothrow.c:118`
✓ newly wired, `do_wear.c:2586/2624` ✓, `polyself.c:1317–1318` ✓ (all LIVE
imports of the restarted function); `invent.c:2084` is a comment only;
`ball.c:973` → file-local `canletgo_silent` (`js/ball.js:84`);
`muse.c:2189–90/2558–59` → file-local `canletgo_silent` (`js/muse.js:290`).
The clones are pre-existing (not this diff) and cycle-motivated; both are
named in the D-log. Reachability check done here: ball's site only ever
sees ball/chain (BAll/CHAIN otyp can never hit the omitted loadstone/leash
arms, and C has no side effects off those arms for other otyps) — provably
equivalent there. Muse's clone keeps all five boolean gates (booleans
identical to C on every input); it omits only the loadstone `corpsenm = 0`
reset and the `set_bknown` refresh side effect. The only divergence I can
construct needs a stale-corpsenm cursed loadstone to pass through a
monster-use check and then be hero-thrown at quan 1 — a 4-deep
contrivance (getobj never leaves quan-1/corpsenm-1 loadstones unsplit).
Not a real path; not queued. The map section (`turns.md:306`) records the
restart + throw wire but does not index the two clone names — minor doc
gap, noted, not queueable as a C-wrong.

## Hallucinations / overclaim

None. "Match C" is claimed for the body and every arm is present; the
`imports.mjs --can` ALREADY claim re-verified here (display, wield).

## Density

One 48-line C function + its single missing caller wire, two files that
already call each other. Right-sized per §2b.

## Verification

- D-log: syntax (2 changed) · rule2 · hidden note (0 blocked) · smoke
  24/24 · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 → VERIFY: PASS.
- Re-run here: `hidden-proxy.mjs verify canletgo --base 4cc8a6c0~1
  --reach-all` → 0 blocked at baseline and working tree (vacuous note,
  honestly reported — the row cited no blocks) + smoke 24 PASS,
  0 regressed → REACH-OK. Matches.
- Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed/coordinate logic.

## Actionable C-wrongs

None. No Must-fix, no CURRENT change.

Verdict: **ACCEPT**
