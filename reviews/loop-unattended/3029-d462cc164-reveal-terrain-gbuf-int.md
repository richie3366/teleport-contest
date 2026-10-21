# Review 3029 — d462cc164 — reveal_terrain_getglyph classifies the displayed gbuf int

- SHA: `d462cc164` (cliff; board row reveal_terrain,
  scen-symset-Healer-50555020 s478, map (11,4) C `^` vs JS `%`)
- D-entry: D-4189; Ledger: reveal_terrain_getglyph ported
- `js/` diff: display.js +35 −4

## Intent vs deliverable

Promise: detect.c reveal_terrain_getglyph starts from
`glyph = !swallowed ? glyph_at(x, y) : levl_glyph` (`:2209`) and
classifies that int (`:2213–2231`). JS rebuilt the displayed layer from
live state and let an unseen rock pile beat the displayed trap.

Diff: in the non-swallowed branch, read `glyph_at(x, y)` first. When it
is a real int (not NO_GLYPH / GLYPH_UNEXPLORED), build the cell from
`loc.disp_*` and set `kind` from the int. The gascloud test reads the
int too. The swallow kind now takes levl_glyph whatever keep_mons says.
The ch-match trap fallback is skipped for gbuf cells. The promise
matches the diff.

## Inventory

- reveal_terrain_getglyph — display.js:5568–5880 (C detect.c:2166–2288).
- glyph_at, glyph_is_monster/warning/swallow/object/trap, glyph_to_cmap
  — existing display.js / glyph helpers, already imported. No helper is
  added or deleted.

## C ↔ JS fidelity

C `:2209–2218`:

```c
glyph = !swallowed ? glyph_at(x, y) : levl_glyph;
if (keep_mons && u_at(x, y) && swallowed) {
    glyph = mon_to_glyph(u.ustuck, rn2_on_display_rng);
} else if ((!keep_mons && (glyph_is_monster(glyph)
                         || glyph_is_warning(glyph)))
           || glyph_is_swallow(glyph)) {
    glyph = levl_glyph;
    was_mon = TRUE;
}
```

Walked arm by arm against JS:

- Monster‖warning → `kind 'mon'`, then `!keep_mons` → levl_glyph with
  was_mon. Same as C.
- Swallow → `kind 'swallow'` → levl_glyph with was_mon, keep_mons or
  not. This was missing before the commit (`kind === 'swallow'` arm).
- GLYPH_INVISIBLE → 'invisible'; object → 'obj'; trap → 'trap'. These
  feed the unchanged `:2219–2231` arms (trap_to_glyph under an object or
  `I` when keep_traps and tseen; strip test).
- Gascloud: C tests `glyph` after the was_mon substitution, so it tests
  levl_glyph. JS tests the pre-substitution gbuf int. These agree,
  because C newsym's region path paints through show_glyph and leaves
  levl.glyph as the background, so levl_glyph is never a cloud. A
  displayed monster over a region is caught by `(reg && was_mon)`, as
  in C.

The Healer cell (displayed trap int 4028, tseen rock trap, an unseen
rock pile) now classifies 'trap' from the int. The live `objects_at`
pile no longer wins, which matches C.

## Hallucinations / overclaim

None. The named stand-in is stated honestly: the old reconstruction
still runs for NO_GLYPH (JS-only id-less paints) and GLYPH_UNEXPLORED.
In C, an unexplored int matches no arm and stays unexplored. In JS the
reconstruction runs instead. That is a JS-only path with no corpus
evidence. It is debt, not a C-wrong in this diff.

## Density

One function, one causal arm, on the cliffs-head writer. Right-sized.

## Verification

```text
verify reveal_terrain,reveal_terrain_getglyph --base d462cc164~1 --no-reach
  reveal_terrain:          1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
                           (scen-symset-Healer-50555020: PASS)
  reveal_terrain_getglyph: 0 blocked (vacuous)
```

This reproduces the D-log.

## Actionable C-wrongs

None queueable. Debt: GLYPH_UNEXPLORED could classify as 'other'
directly instead of going through the reconstruction. This is unreached,
so it is noted here, not queued.

Verdict: **ACCEPT-WITH-DEBT**
