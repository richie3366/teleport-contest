# Review 2954 — 5550508a3 — Vlad's Tower des.monster through create_monster

- SHA: `5550508a3` (cliff, live-queue owner `mswings_verb`, 2 rows; writer
  = sp_lev.c create_monster's `:2125` female clobber)
- D-entry: D-4114; Ledger: create_monster split
  js=mklev.js:splev_create_monster+mklev.js:l_create_monster
- `js/` diff: `js/mklev.js` +23/−57 (load_tower1/2/3)

## Intent vs deliverable

Promise: create_monster ends with `mtmp->female = m->female`, so a
class or random pick is male whatever makemon rolled. JS's three
hand-coded tower loaders called makemon directly and kept makemon's
gender, so a tower2 erinys and a tower3 barrow wight were «her». Diff:
every tower `des.monster` now calls `splev_create_monster`, the existing
whole port. The hand copies are deleted. The owner `mswings_verb` itself
is untouched: it was the symptom, and the writer is the clobber. Promise = diff.

## Inventory

- `load_tower1` — mklev.js:14238–14264: Vlad, 3× "V", 3 named waiting
  vampire ladies; tower1.lua:29–47.
- `load_tower2` — mklev.js:14466–14482: 2× "&", 2 hell hound pups, a
  winter wolf; tower2.lua:30–34.
- `load_tower3` — mklev.js:14674–14683: "D", 2 random at fixed coords;
  tower3.lua:32–34 (the 6 random were already routed).
- Callee `splev_create_monster` — mklev.js:22232; C sp_lev.c:1924–2187
  (unchanged by this SHA).

## C ↔ JS fidelity

```c
amask = sp_amask_to_amask(m->sp_amask);            /* :1943 */
... pm = mkclass(class, G_NOGEN);                  /* :1955 */
if (MON_AT(x, y) && enexto(&cc, x, y, pm)) ...     /* :1977 */
mtmp = makemon(pm, x, y, m->mm_flags);             /* :1987 */
if (m->name.str) mtmp = christen_monst(...);       /* :1994–1995 */
mtmp->female = m->female;                          /* :2125 */
tmpmons.female = 0;                                /* lspo_monster :3230 */
```

The callee follows C's order for each kind of call. A named id calls
find_montype_gender (Lua parse), then `sp_amask_to_amask` (AM_SPLEV_RANDOM
→ `induced_align(80)`, C :1916–1917), the G_UNIQ/G_EXTINCT and G_GONE
checks, the location, `splev_resolve_occupied` (enexto), makemon,
christen, the appear fixup, and finally `female = m->female`. A class
letter gets amask and then mkclass, as in C (class is decoded before
:1943, but only a panic can tell the difference). Null (random) gets no
pm and a DRY location. The deleted hand copies drew the same RNG in the
same order (find_montype → induced_align → mkclass → makemon), so only the
gender changes. Tower1 now runs C's enexto for Vlad too.

Coordinates: `get_location_coord` adds `game.splev_xstart/ystart`. Each
tower loader sets these to the same `xstart/ystart` its local `mx/my`
used (mklev.js:14175, :14374), so `rx/ry` land on the cells the old
`mx + rx` used.

`waiting=1` maps to C :2160–2167: STRAT_WAITFORU and a vampshifted
newcham unless appear is M_AP_MONSTER. The old copy tested
`mlet !== S_VAMPIRE` instead of `vampshifted`. `name` maps to christen at
C :1994. C sets `female` for a named id from find_montype. JS's
`id_or_class.length > 1 ? female : 0` matches the 0 that lspo_monster
gives class and random picks.

## Hallucinations / overclaim

None. The subject's claim that the RNG order is the same as the hand
copies holds, by the walk above.

## Density

Three loaders made to call the C-shaped callee, net −34 lines. The
D-log names the other hand loaders that still call makemon for class
or random picks without the clobber: load_bar_loca's placeMon,
load_castle, load_medusa_1 and load_arc_strt. No board row reaches them.

## Verification

```text
verify mswings_verb (--base 5550508a3~1): 2 blocked
  scen-sweep-Rogue-50456034: PASS
  scen-worldtour-Archeologist-50750040: PASS
verify mswings_verb: 2 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
verify create_monster: 0 blocked (vacuous; the D-log cites its 23-session reach)
```

Exact match with the D-log.

## Actionable C-wrongs

None that is reached. The four named hand loaders are pre-existing
C-divergent copies. They are unreached debt, and the next cliff that
lands on one of those levels should route it through
`splev_create_monster` the same way.

Verdict: **ACCEPT-WITH-DEBT**
