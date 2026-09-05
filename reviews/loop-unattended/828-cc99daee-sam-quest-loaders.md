# Review 828 — cc99daee — Samurai quest loaders Sam-strt/loca/goal/fila/filb (D-1858)

Metadata: SHA `cc99daee`, D-1858, `js/mklev.js` +569 (5 loaders + dispatch +
3 otyp consts). No Must-fix open.

## Intent vs deliverable

Subject promises the 5 Samurai quest `load_special` protos from the lua bodies.
Diff actually adds: `load_sam_strt/loca/goal/fila/filb`, 5 dispatch arms,
`SPLINT_MAIL`/`KATANA`/`TSURUGI` consts, doc-list line. Matches; no creep.

## Inventory

New JS: 5 file-local loaders (unexported — correct, same envelope as Val/Knox).
No deleted/re-pointed symbols, so no `sym.mjs` migration output required.

## C ↔ JS fidelity

Locus is content: `nethack-c/upstream/dat/Sam-{strt,loca,goal,fila,filb}.lua`
(port-from-lua rule). Independent check (`/tmp/sam-map-check.mjs`, lua
`des.map` rows vs `git show cc99daee:js/mklev.js`): strt 20/20, loca 20/20,
goal 20/20, filb 16/16 rows present verbatim; fila has no `des.map` (mines
fill — consistent with the D-log). D-log "byte-verified" claim holds.

Spot-checked semantics against lua, all in order:

- strt: level flags mazelevel/noteleport/hardfloor; lit whole-map region;
  COURT (18,03,26,07) FILL_LVFLAGS; levregion branch rect (62,12,70,17) after
  `flip_level_rnd(3)`; down stair (29,04); 2 locked + 8 closed doors at exact
  coords; Sato invent (splint mail +5 / katana +4, eroded −1, not-cursed) +
  chest + 8 roshi at exact chamber coords; whole-map non_diggable walls/bars;
  6 traps; siege list in exact lua order incl. `peaceful=0` → `0` hostiles and
  trailing random stalker.
- goal: up-stair `math.random(1,2)` → `rn2(2)` over {{02,11},{42,09}}, then
  three terrain holes `rn2(4)`, `rn2(4)`, `rn2(2)` — RNG order identical to
  lua lines 34–54. Tsurugi blessed spe-0 via `l_create_object`.
- loca: 16 locked + 8 closed doors, up (10,10) + down (25,14), 8/8/8/8 class
  objects at fixed coords, 18 fixed + 9 stalkers + 6 hostile samurai in lua order
  (read, order matches).
- fila/filb: mines fg/bg, stairs/objects/traps/monster counts as logged.

`sel_set_wall_property` walls/bars-only scope and `math.random(1,#place)` →
`rn2` mapping follow the Val/Knox convention. Named omits (humidity-aware
`get_location`, `ensure_way_out`) are in the map section, same family as
D-1852/D-1853. No STUB in a live arm; dispatch arms are pure wiring. Zero
FORCE/DIAG/seed/RNG-log hits in the js hunks; `rulecheck` clean (re-ran
at 827; content diff adds no imports).

## Hallucinations / overclaim

None. "Maps byte-compared (20/20/20/16 MATCH)" re-confirmed independently
above (fila correctly map-less).

## Density

569 insertions for a 5-level quest kit — one C-locus family (`Sam-*.lua`),
same envelope as Val 5/5. Right-sized; ceiling raised, not padded.

## Verification

D-log: syntax, rule2, green 2/2, strict, cohort 7/7, full 44/44 (shared file
auto-trigger). Hidden: "no corpus session blocked on makemaz — map-driven
content row". Re-ran `hidden-proxy.mjs verify makemaz --base cc99daee~1`:
`0 session(s) blocked`, proxy itself directs shipping on public gates with an
explicit D-log note — which exists. Honest vacuous check, allowed.

## Actionable C-wrongs

None found.

Verdict: **ACCEPT**
