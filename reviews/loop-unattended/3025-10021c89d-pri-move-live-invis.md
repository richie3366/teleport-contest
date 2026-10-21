# Review 3025 — 10021c89d — pri_move / intemple read the live Invis and Hallucination

- SHA: `10021c89d` (cliff; owner-null board row behind distfleeck,
  scen-sweep-Rogue-51650031 s616, Sanctum, extra `rn2(28)` in m_move)
- D-entry: D-4185; Ledger: pri_move, intemple
- `js/` diff: shk.js ±1, priest.js ±1

## Intent vs deliverable

Promise: priest.c pri_move clears `avoid` for a peaceful priest when the
hero is `Invis` (`:205–206`). `Invis` is the youprop.h macro
`(HInvis || EInvis) && !BInvis`. JS read the flat `game.u?.Invis`, which
nothing writes. intemple's sanctum test read the flat
`u.Hallucination` (`:438`).

Diff: `game.u?.Invis` → `Invis()` (timeout.js export, already imported
in shk.js) and `u.Hallucination` → `Hallucination()` (display.js,
already imported in priest.js). The promise matches the diff.

## Inventory

- pri_move — shk.js:4751 (C priest.c:177–216).
- intemple — priest.js:513 (C priest.c:438).

`sym.mjs` on the two re-pointed names:

```text
Invis            js/timeout.js:1749   sync
             !! ALSO 4 LOCAL CLONE(S): mhitu.js:265 potion.js:721 trap.js:5014 zap.js:754
Hallucination    js/display.js:1396   sync
                 js/do_name.js:275    sync   (multiple exports)
             !! ALSO 8 LOCAL CLONE(S) in 8 files
```

Both sites use the C-locus export (timeout.js Invis reads H/E through
`uprops[INVIS]` and `!BInvis()`; display.js Hallucination is the
timeout-backed macro, D-1493).

## C ↔ JS fidelity

C `:196–207`:

```c
if (!priest->mpeaceful || (Conflict && !resist_conflict(priest))) {
    if (monnear(...)) { ... mattacku; return 0; }
    else if (strchr(u.urooms, temple)) { ... avoid = FALSE; }
} else if (Invis)
    avoid = FALSE;
```

JS shk.js:4730–4752 follows the same arms, and only the predicate
changed. intemple `:438` is `if (sanctum && !Hallucination)
priest->ispriest = 0;`, and JS is the same with the live call.

## Hallucinations / overclaim

None. The D-log's "Named" bullet admits the same flat-field idiom
remains in shk.c code: shk.js `hero_invis()` (:594–599) returns TRUE on
a sticky `u.Invis` with H/E unset and ignores `uprops`. The `:2253`
inline `!!(u.Invis || u.HInvis || u.EInvis)` ignores BInvis. Both are
clones of the youprop.h macro that diverge from C (u_entered_shop's
"senses your presence" arm, shk.js:706, and pay_for_damage's "Your
invisibility does not fool"). No corpus row is blocked on either today.

## Density

Two predicates on the writer of an owner-null row. Right-sized.

## Verification

```text
verify distfleeck,pri_move,intemple --base 10021c89d~1 --no-reach
  distfleeck: 0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS
  pri_move, intemple: 0 blocked (vacuous)
```

The full rescore leaves scen-sweep-Rogue-51650031 at step 838/839 with
owner null, which is the D-log's "moved to step 838 of 839". Because the
full score replayed this active-tier row itself, the owner-null claim is
re-measured.

## Actionable C-wrongs

None queued. Debt: shk.js `hero_invis` and the pay_for_damage inline
copy should import timeout.js `Invis` when an shk row reaches them
(§10.19: no session blocked, so no Must-fix).

Verdict: **ACCEPT-WITH-DEBT**
