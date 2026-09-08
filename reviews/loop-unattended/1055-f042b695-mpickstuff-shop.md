# Review 1055 — f042b695 — mpickstuff shop gates + prize + corpse arms (D-2085)

## Metadata

- SHA: `f042b695` — `mon.c mpickstuff dropped the shop gates, prize skip and corpse thru-arms (queue owner mpickstuff) (D-2085).`
- JS diff: `js/monmove.js` +~20/−10 (2 import lines, `PM_LIZARD` const, 3 guards, comment).
- Docs: D-2085 D-log/D-index/CURRENT/NOTES/queue/turns.md map.
- Next index: 1055.

## Intent vs deliverable

Subject promises the shopkeeper/shop/`rn2(25)` gates, the prize
skip, and the corpse thru-arms. Diff ports exactly those in C
order, retiring four map-named omits. Promise == diff; no scope
creep.

## Inventory

- Changed: `mpickstuff` (monmove.js:353+) — three guards, no new
  helpers.
- Callee closure per `sym.mjs` (all pasted in-session):
  `inhishop` live sync `js/shk.js:704`, `touch_petrifies` live
  sync `js/monsters.js:445`, `acidic` live sync
  `js/monsters.js:932`, `is_mines_prize`/`is_soko_prize` live sync
  `js/mkobj.js:2729/2735`, `in_rooms` live sync `js/hack.js:1220`
  — all joined to pre-existing module imports (same-SCC,
  call-time use, no TDZ). No stub in a live arm.
  (`inhishop`/`in_rooms` clones lingering in sounds/teleport/mklev
  are pre-existing drift, untouched here.)
- Diff grep: no `FORCE`/`DIAG`/seed reads, no coordinates.

## C ↔ JS fidelity

C `mon.c:1847–1910` (read directly), branch by branch:

```c
if (mtmp->isshk && inhishop(mtmp))
    return FALSE;
if (!mtmp->mtame && *in_rooms(mtmp->mx, mtmp->my, SHOPBASE) && rn2(25))
    return FALSE;
```

`isshk && inhishop` verbatim (replacing the over-broad `if
(isshk)`). `!mtame && in_rooms && rn2(25)` verbatim with the draw
shop-gated by short-circuit — `in_rooms` returns `''` or a
char-string (hack.js:1220+, read directly), so truthiness matches
C `*p` exactly. Prize skip sits in C position ahead of
`mon_would_take_item`. Corpse thru-arm (`touch_petrifies` /
`!== PM_LIZARD` / `acidic`) verbatim. The structural flattening
(`if (!take) continue` vs C nesting) is equivalent.
`mons(corpsenm)` null-safe vs C's unchecked `&mons[…]` —
identical on valid floor corpses, safer otherwise. No gap found.

## Hallucinations / overclaim

None — the `o_id`-nonzero audit for the prize skip is a checkable
`mkobj.js` cite, and the remaining named omits (`pline_mon`
routing, m_search_items envelope) are honestly retained.

## Density

One C function envelope, ~20 lines — the accepted corpus-row
exception.

## Verification

D-log Verify bullet: `verify --fn mpickstuff` → `0 PASS,
1 moved past, 0 unchanged, 0 worse → PROGRESS` (Tourist-92100
100→level_tele@108) + green + strict + cohort + full 44/44
(shared file). Re-measured myself:
`hidden-proxy.mjs verify mpickstuff --base f042b695~1` →
identical, 0 worse. Claim reproduced exactly. Rule #2 clean
(prior step).

## Actionable C-wrongs

None.

## Verdict

Verdict: **ACCEPT**
