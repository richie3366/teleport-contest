# Review 2985 — af684ebfc — mcast_insects runs makemon's occupation tail

- SHA: `af684ebfc` (cliff; owner castmu → writer mcast_insects, 1 row)
- D-entry: D-4145; Ledger: mcast_insects ported
- `js/` diff: js/mcastu.js +8/−2 (import + one await)

## Intent vs deliverable

Promise: C makemon ends with `if (go.occupation) (void) dochugw(mtmp,
FALSE);` (makemon.c:1502–1504), outside the `!(mmflags & MM_NOMSG)`
block. JS moves that tail into `makemon_appear_msg`, which callers must
await, and mcast_insects never did. So «You stop searching.» was missing
during a summon-insects spell. Diff: after each successful `makemon(pm,
bypos, MM_ANGRY | MM_NOMSG)`, `await makemon_appear_msg(mtmp2, mx, my,
MM_ANGRY | MM_NOMSG)`, placed before the field clears. The promise
matches the diff.

## Inventory

- `mcast_insects` — mcastu.js:695–…; C mcastu.c:644–726 (makemon :664–665,
  clears :667–668).
- Callee `makemon_appear_msg` — makemon.js:3900 (`sym.mjs`: one export,
  ASYNC, awaited here). It covers the C tail: group-member drain
  (:1432–1437), appear Norep only when `!MM_NOMSG` (:1476–1500), then
  `dochugw(mtmp, false)` under occupation (:1502–1504).
- Callee `dochugw` — C monmove.c:203–238.

## C ↔ JS fidelity

C order inside one `makemon` call: … newsym, (MM_NOMSG skips the appear
line), `if (go.occupation) dochugw(mtmp, FALSE)`, return. Only then does
mcast_insects clear `msleeping/mpeaceful/mtame` and call set_malign. JS
awaits the tail right after makemon returns and before the clears, so
the order is the same. The order matters little anyway: dochugw's
threat test reads `mpeaceful` (already 0 from MM_ANGRY), `noattacks`,
distance, `canspotmon`, `couldsee`, `mcanmove` and `onscary`. It does
not read `msleeping`.

A side effect is also C-correct. Insects with G_SGROUP / G_LGROUP get
group members inside the sync makemon, and JS queues their appear tails
in `_grpAppearPending` with `primary = mtmp`. Before this SHA nothing
drained that queue for mcast_insects, and a later unrelated drain
dropped the entries as stale. Now each member's dochugw runs before the
primary's, as C's nested makemon does.

The rest of mcast_insects (census, quan `rnd(m_lev/2)` floor 3,
`i <= quan`, enexto early return, mkclass per iteration) is unchanged
and matches C :657–672 (census to census).

## Hallucinations / overclaim

None. The Named line ("other JS makemon callers outside mcastu.c that
never await makemon_appear_msg are not audited") is honest. A text scan
finds about 39 `makemon(` sites outside mklev.js with no
`makemon_appear_msg` within 8 lines (fountain 5, read 3, dokick 3, zap 2,
potion 2, muse 2, …). Some drain elsewhere. The 71 in mklev.js run under
`in_mklev`, where the tail is skipped. This is a family, not this SHA's
debt.

## Density

A one-call fix on the writer the owner needed.

## Verification

```text
verify castmu (--base af684ebfc~1): zapfest-Caveman-51150068 PASS;
  hallu-Ranger-51450008 still castmu s762 (hallucinated caster name, other arm)
verify mcast_insects: 0 blocked
```

The re-measure matches the D-log (1 PASS, 1 no-movement on a named
other arm).

## Actionable C-wrongs

None in this SHA. The makemon-tail family (callers that skip
`makemon_appear_msg`) is unmeasured and stays a Named omission. It
becomes a cliff when the board names one of those callers.

Verdict: **ACCEPT**
