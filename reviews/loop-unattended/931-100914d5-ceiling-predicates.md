# Review 931 — 100914d5 — dungeon.c has_ceiling/avoid_ceiling ceiling predicates singleton (D-1961)

Metadata: SHA `100914d5`, D-1961, `js/dungeon.js` (two functions +
one import name) + `js/read.js` (`seffect_earth` rewire + import
swap). Reviewer re-ran both C bodies, the C `seffect_earth` guard,
all callers, sym on both new symbols + `Is_earthlevel`, the
`--can` edge, one named clone, banned grep, and `hidden-proxy
verify --base`.

Intent vs deliverable: subject promises both ceiling predicates as
live exports with `seffect_earth` calling them. Diff actually adds
`has_ceiling`/`avoid_ceiling` after `In_W_tower` and re-points the
`:1927` guard and `:1936` arm, dropping the two inline consts and
the now-unused `In_quest` name on the `const.js` edge. Promise
kept.

Inventory: two new functions (`has_ceiling`, `js/dungeon.js:902`;
`avoid_ceiling`, `:911`; both sync per `sym.mjs`). One re-pointed
symbol: `Is_earthlevel` (`const.js:3198`, live). One deleted local
name: the two inlined consts (replaced by calls, not by a clone).
`In_quest`/`In_endgame` were already on `dungeon.js`'s `const.js`
edge (lines 118–119); only `Is_earthlevel` is added — no new-edge
surprises (`--can` at HEAD: ALREADY, body-use inside
`seffect_earth` only).

C ↔ JS fidelity — against `dungeon.c:1689–1698` and `:1700–1711`
(via `csym.mjs`), exact:

- `if (In_endgame(lev) && !Is_earthlevel(lev)) return FALSE;
  return TRUE;` → identical with `false`/`true`.
- `if (In_quest(lev) || !has_ceiling(lev)) return TRUE; return
  FALSE;` → identical, including the internal `has_ceiling`
  call (not inlined).
- Call sites vs `read.c:1927–1936` (read at HEAD):
  `!Is_rogue_level && has_ceiling && (!In_endgame ||
  Is_earthlevel)` guard and `!avoid_ceiling` arm match
  token-for-token modulo `&u.uz`→`uz`. C evaluates
  `has_ceiling` twice (guard + inside `avoid_ceiling`); JS now
  does the same — pure predicates, no observable difference
  from the old shared consts (which review 866 verified exact,
  so the rewire is behavior-neutral by construction).

No RNG either side. Remaining C callers (`do_wear.c:284`,
`dothrow.c:1265`, `insight.c:1740`, `mon.c` ×4, `polyself.c:1845`,
`potion.c:1199`, `trap.c:2823`, `mondata.h:24`, via `--callers`)
are separate clusters; the three pre-existing JS clones
(`dothrow.js:1036`, `mon.js:2883`, `potion.js:570`, per `sym.mjs`)
stay named with their C callers in this commit — correctly not
glued into this cluster per §2b. Spot-checked `dothrow.js:1036`:
textually identical to the new export.

Hallucinations / overclaim: none. D-log's double-evaluation note,
clone list with C citations, and edge claim all verified. No
dispatch-over-stub shape (leaf predicates, no callees beyond the
live `const.js` names).

Density: §2b right size — one predicate pair + its single caller
arm, two modules. OK.

Verification: D-log Verify shows preflight PASS, `verify.mjs --fn
avoid_ceiling` → PASS syntax/rule2/green/strict/cohort,
explicitly vacuous hidden note with no corpus-PASS claim, plus a
4-case probe (doom/endgame-non-earth/earth/quest, PROBE PASS).
Reviewer re-measured: `hidden-proxy verify avoid_ceiling --base
100914d5~1` → "0 session(s) blocked (0 at baseline, 0 in working
scoreboard)". Honest. Diff-body banned grep clean; Rule #2 clean
(intra-`js/` ESM only).

Actionable C-wrongs: none.

Verdict: **ACCEPT**
