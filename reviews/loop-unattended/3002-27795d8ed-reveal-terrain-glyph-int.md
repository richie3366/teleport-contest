# Review 3002 — 27795d8ed — #terrain strips by the remembered int; recalc_mapseen live Levitation

- SHA: `27795d8ed` (cliff; board head getpos, 4 rows; writers detect.c
  reveal_terrain_getglyph, dungeon.c recalc_mapseen)
- D-entry: D-4162; Ledger: reveal_terrain_getglyph ported; recalc_mapseen ported
- `js/` diff: display.js +20 −3, dungeon.js +4 −2

## Intent vs deliverable

Promise: C reveal_terrain_getglyph classifies the *int* it holds. That is
`glyph_at` (`:2209`), or `levl_glyph` after the `!keep_mons` swap
(`:2213–2218`). JS re-classified the swapped memory by matching its char
against the live pile, and drew `seenv` terrain where the displayed cell
is GLYPH_UNEXPLORED. Separately, recalc_mapseen read the sticky flat
`u.Levitation`. The two causes ship together because the Caveman session
needs both.

Diff: (1) the `!keep_mons` arm classifies `levl_glyph.glyph` with
glyph_is_object / glyph_is_trap / GLYPH_INVISIBLE, and keeps the char
match only for a memory with no int. (2) The kind-'other' fallback
returns GLYPH_UNEXPLORED first when `glyph_at(x, y)` is unexplored.
(3) recalc_mapseen tests `!Levitation_st()`. The promise matches the diff.

## Inventory

- reveal_terrain_getglyph — display.js:5494 (C detect.c:2166–2288).
- recalc_mapseen — dungeon.js:2566 (C dungeon.c:3191–3192 arm only).
- Re-pointed: `u.Levitation` → hack.js `Levitation_st`.

```text
sym.mjs Levitation_st → js/hack.js:3275   sync   (1 def, no clones)
```

`grep u.Levitation|u.Flying|u.Blind|u.Hallucination js/dungeon.js` → only
the new comment. No flat-mirror reads remain in dungeon.js.

## C ↔ JS fidelity

C `:2213–2218`: when `!keep_mons` and the displayed glyph is a monster or
warning (or a swallow glyph), `glyph = levl_glyph; was_mon = TRUE`. The
tests at `:2219–2231` then act on that int: the trap restore for
`!keep_objs && glyph_is_object || glyph_is_invisible`, then the strip arm.
JS now reads `memId` from the copied levl_glyph and maps it to
obj / trap / invisible / other, as the swallowed path above it already
did. For a never-remembered spot, levl_glyph carries GLYPH_UNEXPLORED
(display.js:5541), so it lands in 'other' and is drawn unexplored, as C
draws an untouched levl glyph.

C `:2209`: if glyph_at is GLYPH_UNEXPLORED, no strip arm can fire
(it is not an object, trap, invisible or cloud). It is then returned as
is. Only the darkroom/litcorr hack can touch it, and that does not apply.
JS reaches its 'other' fallback only after the mon/I/obj/trap tests fail,
and returns the unexplored cell before the `seenv` terrain arm. This
matches for every cell where the JS live-state tests agree with the
displayed int.

The function still rebuilds the displayed layer from live state instead
of reading `glyph_at` directly (a pre-existing structural divergence).
This commit narrows it, and does not widen it.

C recalc_mapseen `:3191–3192` `if (!Levitation) update_lastseentyp(u.ux,
u.uy)`. Levitation_st is the youprop macro, ring/boots extrinsic included
(review 2997 checked it, blocked included). The JS line now matches.

## Hallucinations / overclaim

None. The D-log Verify names the 2 rows that did not move then
(Healer-51152023, Priest-50556014) as garbage-cursor recorder artifacts.
D-4164 later fixed them (both PASS in my re-measure below).

## Density

Two writers named by measurement (temp log + Proxy trap), ~25 lines.
Right-sized.

## Verification

```text
verify getpos,reveal_terrain_getglyph,recalc_mapseen --base 27795d8ed~1 --no-reach
  getpos: 3 PASS (chain-Monk-50450082, sweep-Priest-50556014,
          tour-Healer-51152023), 1 moved (sweep-Caveman-50055035
          885 → nh_timeout 1109) → PROGRESS
  reveal_terrain_getglyph / recalc_mapseen: 0 blocked (vacuous)
```

This reproduces the claim. The two extra PASS rows come from D-4164 at
HEAD.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
