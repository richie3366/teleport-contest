# Review 1387 — 7fd86533 — can_fog → mfndpos closed-door arm (D-2428)

- SHA: `7fd86533`, D-2428 (Open row: 2/553 blocked at the `m_move`
  track-check, both Valkyries; writer `can_fog` door). JS files:
  `js/monmove.js` (1 word: `function can_fog` → `export function
  can_fog`) + `js/mon.js` (import + one disjunct in the `mfndpos`
  door gate). Test: `scripts/mm-aggression-mfndpos.test.mjs` +3 its.
- Prior reviews closed: none (writer row from D-2424 measure).

## Intent vs deliverable

Subject promises the export, the import on the existing static edge,
and the `!((amorphous(mdat) || can_fog(mon)) && !engulfing_u(mon))`
wiring in C order (`mon.c:2232–2238`), keeping the
`stuff_prevents_passage` deferral. Diff delivers exactly that.
Promise == diff.

## Inventory

| JS symbol | Kind | Status |
|---|---|---|
| `can_fog` (`js/monmove.js:761`, now exported) | C callee (local, pre-existing) | LIVE — C `monmove.c:2364–2371`; hoisted `function`, no TDZ risk |
| `mfndpos` door gate (`js/mon.js:2692`) | changed branch | LIVE — C `mon.c:2232–2238` verbatim |
| `amorphous` / `engulfing_u` operands | C callees | LIVE — canonical (`monsters.js:486`, `const.js:3201`) |
| `stuff_prevents_passage` inside `can_fog` | deferred arm | OMIT — pre-existing map note, kept and re-named |
| `m_move:1488` door-shift `can_fog` block, `cant_squeeze_thru:191`, bigmonst `:175` | not ported | OMIT — named in D-2428, row-excluded |

Required `sym.mjs` output (symbol re-pointed local → import):

```text
can_fog          js/monmove.js:761   sync
```

Single definition, no clones elsewhere — the import resolves to the
audited body. `imports.mjs --can mon.js monmove.js can_fog` →
`ALREADY: mon.js already statically imports monmove.js. No new edge
needed.` (re-ran myself; matches D-log).

## C ↔ JS fidelity

C `can_fog` (`monmove.c:2364–2371`, via `csym.mjs`): four conjuncts —
`!(mvitals[FOG] & G_GENOD)`, `is_vampshifter`, `!Protection…`,
`!stuff_prevents_passage`. JS implements the first three
(`fogGone || !is_vampshifter || Protection… → false`) and returns
`true`, i.e. treats the fourth as pass. The D-log is explicit that
this deferral is pre-existing and that D-2424 measured it C-true on
both blocked sessions — so treat-as-pass matches C here. Branch
order and the `||`-chain short-circuit match.

C gate (`mon.c:2231–2238`, read directly): `IS_DOOR(ntyp) &&
!((amorphous(mdat) || can_fog(mon)) && !engulfing_u(mon)) && (CLOSED
&& !OPENDOOR || LOCKED && !UNLOCKDOOR) && !thrudoor`. JS hunk shows
the same predicate shape with the disjunct uncommented in place —
C order preserved.

One observation (not a C-wrong): the clone's deferral now fans out
to a second live call site — `can_fog` was already called at
`monmove.js:833` before this commit (`git grep` at `7fd86533~1`
confirms), and this commit adds the `mfndpos` gate. Any future
session where a vampshifter carries blocking inventory will diverge
at two arms instead of one. The deferral stays named in the map and
in the function doc comment, so this ships as documented debt, not
a silent widening.

## Hallucinations / overclaim

None. "Dispatch ported, callee stubbed" does not apply: the callee
was already a live, audited local body before this commit; this
commit only exports and wires it.

## Density

~10 net JS lines + 3 test its for a 2-session writer arm — dense
and right-sized. The maintained pin (`mm-aggression-mfndpos`) has a
negative control (stashed-to-HEAD fails `7 !== 8`), so it covers
exactly this disjunct.

## Verification

D-log claims `hidden-proxy verify m_move` → PROGRESS (92040:
`m_move`@113 → `newmonhp`@116; 92162: `m_move`@72 →
`wiz_levltyp_legend`@129) + green + cohort + full 44/44.
Re-measured myself at the parent baseline:

`node scripts/hidden-proxy.mjs verify m_move --base 7fd86533~1` →
`0 PASS, 2 moved past, 0 unchanged, 0 worse → PROGRESS`, both
sessions to the same later owners and steps. Confirmed, not
vacuous. Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed gates.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
