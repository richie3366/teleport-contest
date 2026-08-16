# Review 34 — 1f21183f — `dosit` OBJ_AT picnic skip `uteetering` / `uescaped_shaft` (D-1073)

## Metadata
- Full / short hash: `1f21183f2e2a49b9a448ee0fda551dc88959916d` / `1f21183f`
- Parent: `0844d7ae` (review **33** ACCEPT of `55906000` D-1072; Must-fix empty; popped Open picnic). JS-touching since last `reviews/loop-unattended/` file (`33-55906000-…`, written in `0844d7ae`): **this SHA** and `962e07a9` D-1074 (review **35**). Docs-only in the same window: none.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 11:03:22 +0200
- D-id: **D-1073**
- Stats: 12 files, +126 / −67 — `js/sit.js` +22 / −13 (header + picnic `if`); `js/trap.js` +23 (export the two helpers); `js/do.js` +20 / −18 (import; delete local clones). Live JS is the picnic conjunct and the `trap.c` home for the helpers, not a new helper file.
- Claims to close: Open queue `sit.c` `dosit` OBJ_AT gate: skip picnic when `uteetering_at_seen_pit` or `uescaped_shaft` like C. Stamped **Addressed:** D-1073 `1f21183f` on the archive row (hash present — filled by D-1074, not predicted here). This review also stamps review **33** named omit 1.
- JS / map: `sit.js` `dosit`; `trap.js` exports; `do.js` `flooreffects` callers. `c-js-map/data.md` names D-1073 and still omits `can_reach_floor(check_pit)` teeter (now Open on `engrave.js`), hero pit/hole `dotrap` bodies (D-1039), `lay_an_egg`.
- Prior reviews this SHA claims to close: **33** ACCEPT named omit “ship picnic `uteetering`/`uescaped_shaft` next; do not pull meager / `lay_an_egg` / `ceiling_hider`”. Review **32** / **30** still name helper `check_pit` teeter — that is a **different** call site (`engrave.c:209–211`), not this SHA. `reviews/loop-2026-08-15/` has no open picnic Must-fix.

## Intent vs deliverable

Git subject promises: “Match C dosit so sitting on a seen pit or hole skips the picnic and takes the trap arm.” Body is empty beyond Co-authored-by. D-log: JS `#sit` picnic (`objects_at`) fired even when the hero stood on a seen pit precipice or a seen hole/trapdoor. C `sit.c` `dosit` requires `OBJ_AT && !(uteetering_at_seen_pit(trap) || uescaped_shaft(trap))` so picnic does not hide the trap `else if`.

Review 33’s Open line was exactly that conjunct, with those “do not”s: do not pull dragon meager hoard / `lay_an_egg` / helper `ceiling_hider` this iter.

The diff **does** that envelope: picnic `if` is `obj && !(uteetering_at_seen_pit(trap) || uescaped_shaft(trap))`. Helpers move from `do.js` locals to `trap.js` exports (C `trap.c` home). `do.js` `flooreffects` uses the exports (bodies identical to the deleted locals). In-pit `utraptype==TT_PIT` still picnics (C teeter is false). Unseen pits still picnic (`tseen` required).

It does **not** port `can_reach_floor(check_pit)` teeter/shaft (`engrave.js:298–300` still a no-op). Named, and queued as a separate Open line. It does **not** port hero pit/hole `dotrap` `VIASITTING` bodies (D-1039). Named. It does **not** port dragon meager hoard (next SHA) or `lay_an_egg`. Correct.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `dosit` OBJ_AT picnic conjunct | C call site, **retouched** | `sit.c:437–439`; was `if (obj)` only |
| `uteetering_at_seen_pit` | **clone** of `trap.c:6648–6653`, **moved** | was local in `do.js`; now `trap.js` export |
| `uescaped_shaft` | **clone** of `trap.c:6660–6664`, **moved** | same move |
| `is_pit` / `is_hole` | imported C macros | `trap.h:113–114`; `const.js:2320–2321` |
| `u_at` | imported C | `const.js:2930`; hero `ux,uy` vs trap `tx,ty` |
| `TT_PIT` | imported C enum | `you.h:348` `= 2`; `const.js:2254` |
| `t_at` | imported C callee | already used; `trap` still bound after pool/gremlin |
| `objects_at` | clone of `OBJ_AT` + `level.objects[x][y]` | pre-existing; `rm.h:500` |
| `do.js` `flooreffects` teeter arm | C call site, **not rewritten** | `do.c:288–302`; now calls the exports |
| `can_reach_floor(check_pit)` | C later arm, **named omit** | `engrave.c:209–211`; Open line |
| `dotrap` VIASITTING pit/hole | C later arm, **named omit** | D-1039; trap **arm** still taken |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names in control flow / hardcoded coordinates. Dynamic `import('./engrave.js')` is pre-existing cycle avoidance, not filesystem. Rule #2 clean. Frozen contracts untouched. `FORCETRAP` in `trap.js` is the C `hack.h` flag, not a trace FORCE.

## Constitution / playbook

Grep of the `js/sit.js`, `js/trap.js`, and `js/do.js` hunks: no trace-index gates, no recorded coordinates, no `fastforward` burns. Predicates are `trap.h` / `you.h`, not a seed-shaped pit table. Contest Rule #2: no Node builtins in scored code.

## C ↔ JS fidelity

### Picnic gate — C `&& !()` order, no RNG at the `if`

C `sit.c:437–442`:

```
    if (OBJ_AT(u.ux, u.uy)
        && !(uteetering_at_seen_pit(trap) || uescaped_shaft(trap))) {
        struct obj *obj;
        obj = svl.level.objects[u.ux][u.uy];
```

JS `sit.js:1122–1123`: `const obj = objects_at(u.ux, u.uy);` then `if (obj && !(uteetering_at_seen_pit(trap) || uescaped_shaft(trap)))`. `OBJ_AT` is `level.objects[x][y] != 0` (`rm.h:500`). JS `_objects_at.get(\`${x},${y}\`)` is that top-of-pile pointer. Fetch-then-test is equivalent: `objects_at` has no side effects. C short-circuit `OBJ_AT` then teeter; JS truthy `obj` then teeter. No `rn2`/`rnd`/`rn1`/`d` at the `if`.

C evaluates `trap = t_at(u.ux, u.uy)` at `dosit` entry (`sit.c:403`). JS still binds `trap` after the lap return and the pool/gremlin early `goto` (`sit.js:1104`). `t_at` has no side effects. On the picnic path both have the same trap pointer. Match.

C picnic is `if` / `else if (trap…)` / … then `return ECMD_TIME` at `sit.c:564`. JS `return ECMD_TIME` immediately after the picnic body. Equivalent: the picnic arm does not fall into the trap arm.

### Helpers — C bodies, C numbers, not no-ops

C `trap.c:6648–6664`:

```
uteetering_at_seen_pit(trap):
    trap && is_pit(trap->ttyp) && trap->tseen
    && u_at(trap->tx, trap->ty)
    && !(u.utrap && u.utraptype == TT_PIT)

uescaped_shaft(trap):
    trap && is_hole(trap->ttyp) && trap->tseen
    && u_at(trap->tx, trap->ty)
```

JS `trap.js:1122–1135` is that short-circuit, with `!!` for boolean. `is_pit` is `PIT \|\| SPIKED_PIT` (`trap.h:113`). `is_hole` is `HOLE \|\| TRAPDOOR` (`trap.h:114`). `TT_PIT` is `2` (`you.h:348`). `u_at(trap.tx, trap.ty)` is C: teeter is false if `t_at` returned a trap whose coords are not the hero (should not happen for `t_at(u.ux,u.uy)`). `tseen` is C’s 1-bit field; JS truthy `trap.tseen`. No RNG.

`!(u.utrap && type==TT_PIT)`: trapped-in-pit is **not** teetering. Sitting in a pit with floor gold still picnics. C the same. A seen pit the hero is **not** trapped in (precipice after escape / flying over / not-yet-fallen) **is** teetering → picnic off → trap `else if`. A seen hole/trapdoor under the hero is `uescaped_shaft` with **no** `utrap` conjunct — C the same.

Call-for-call with live sit states (no RNG):

| State | `uteetering` | `uescaped` | C picnic | JS picnic | Next arm |
|-------|--------------|------------|----------|-----------|----------|
| objects, no trap | false | false | yes | **yes** | (skip trap) |
| objects, unseen PIT | false (`!tseen`) | false | yes | **yes** | skip trap |
| objects, seen PIT, `utraptype==TT_PIT` | false | false | yes | **yes** | skip trap (in-pit) |
| objects, seen PIT, not `utrap` | **true** | false | **no** | **no** | trap `else if` |
| objects, seen SPIKED_PIT, not `utrap` | **true** (`is_pit`) | false | **no** | **no** | trap arm |
| objects, seen HOLE / TRAPDOOR | false | **true** | **no** | **no** | trap arm |
| objects, seen WEB / BEAR | false | false | yes | **yes** | skip trap |
| no objects, seen PIT precipice | (gate off) | | no | **no** | trap arm |

Unseen pit (`!tseen`): both helpers false → picnic. Web / bear trap under objects: not pit/hole → picnic. Match.

### Trap arm after skip — dispatch matches C; pit **body** still named

C `sit.c:466–504`: `else if (trap != 0 || (u.utrap && utraptype >= TT_LAVA))`. When picnic is skipped because of teeter, `trap` is the pit/hole, `u.utrap` is typically false, so the **not-already-trapped** arm runs: `You("%s.", Flying ? "land" : "sit down"); dotrap(trap, VIASITTING)`. JS `sit.js:1158+` already had that envelope (D-1039). This SHA does not retouch it. Hero pit/hole `dotrap` bodies remain the D-1039 named omit (live Open). The **gate** still does what the subject promised: picnic does not hide that arm.

In-pit (`utraptype==TT_PIT`) **with** objects: teeter false → picnic → skip trap. C: you picnic instead of “sit down in the pit.” JS `return ECMD_TIME` after picnic. Match.

### `do.js` move — same clone, C home

Deleted `do.js` locals were byte-for-byte the new `trap.js` exports. `flooreffects` (`do.c:288–289`) already called them; now it imports. C re-fetches `t = t_at(x,y)` in that `else if`; JS uses `t0` captured at `flooreffects` entry. Boulder-plug and teeter are mutually exclusive `else if` arms, so on the teeter path the trap still exists. Pre-existing, not introduced. This SHA does not change that arm’s messages or `ship_object`.

C `pickup.c:710–717` also skips pickup when `uteetering \|\| uescaped`. JS `pickup.js` still omits those helpers (pre-existing named omit). `hack.c:3852` uses teeter for “cannot reach the bottom of the pit.” JS `hack.js` pickup-reach still named. `dig.c:1323` likewise. Exporting from `trap.js` does not silently fix those callers; they were not this Open line.

`engrave.c:209–211`:

```
    if (check_pit && (t = t_at(u.ux, u.uy)) != 0
        && (uteetering_at_seen_pit(t) || uescaped_shaft(t)))
        return FALSE;
```

JS `engrave.js:298–300` still comments the arm as deferred and returns TRUE. `dosit` passes `FALSE`, so `#sit` never consults `check_pit`. Wiring it is the live Open line from this SHA’s map update — a **named omit**, not a picnic-gate C-wrong.

## Hallucinations / overclaim

“Match C dosit so sitting on a seen pit or hole skips the picnic and takes the trap arm” is **true for the OBJ_AT conjunct and for falling into the existing trap `else if`**. It is **not** true that `dotrap(trap, VIASITTING)` now implements C pit/hole bodies (still named D-1039), or that `can_reach_floor(TRUE)` now refuses a teetering hero (`engrave.js` still no-ops the `check_pit` arm). D-log “in-pit still picnics” is true of C `uteetering`.

This is **not** “Match C dispatch, callee is a stub.” `uteetering_at_seen_pit` / `uescaped_shaft` are clones of the real `trap.c` bodies with C `is_pit`/`is_hole`/`TT_PIT`. Classify: **C callees cloned at the C home**, not diverging clones. `dotrap` pit bodies are a **named omit of a later arm**, not a stub standing in for these helpers.

Stamping the Open item **Addressed:** D-1073 `1f21183f` is fair for the picnic gate. Fill review **33** named omit 1 in this commit.

## Density (§2b)

One Open cluster: C `sit.c:437–439` plus the `trap.c` helpers that conjunct needs, moved to `trap.js` so `do.js` does not keep a second clone. Review 33 asked for this, not another one-line sit peel and not “finish `dotrap` / `can_reach_floor(check_pit)`.” ~45 executable lines + comments. Right size. Not meager / `lay_an_egg` in the same commit (unrelated later arms; review 33 forbade them this iter). Three JS files, but they already called each other (`sit←trap`, `do←trap`).

## Verification

Journal: private helper/gate canary; green+strict seed8000/0900; cohort seed1500/1800/0060/0102/0700/0017. Path **public-unhit**. Green+cohort is regression cover (including `flooreffects` still calling the same predicates), not a public precipice `#sit`. Cadence **#1360** **44**/44 ran **before** this SHA — fortress, not picnic-sit proof. This review iter’s cadence **#1365** (below) re-measured the fortress **after** D-1073 and D-1074: still **44**/44.

C read of `sit.c:400–504`/`564`, `trap.c:6644–6664`, `trap.h:113–114`, `you.h:345–348`, `rm.h:500`, `do.c:162–189`/`288–302`, `engrave.c:209–211`, `pickup.c:710–717`; JS `sit.js:1104–1158`, `trap.js:1117–1135`, `do.js:628–733`, `const.js:2250–2258`/`2320–2321`, `engrave.js:280–301`, hunk grepped FORCE/fs/seed.

## Actionable C-wrongs

None from this SHA. The picnic conjunct and the moved helpers match C.

Named omits / do-nots (map / Open, not Must-fix):

1. **`can_reach_floor(check_pit)` teeter/shaft** (`engrave.c:209–211`): live Open line. Helpers now exist in `trap.js` — wire them; do not pull `ceiling_hider` / `MZ_HUGE` this next iter. **Not** this SHA’s miss; `dosit` passes `FALSE`, so the helper arm is dead at `#sit`.
2. Hero pit/hole `dotrap` `VIASITTING` bodies (D-1039 Open). Picnic skip makes that arm reachable from a seen precipice. **Addressed:** D-1076 `87b4b7cb`
3. `pickup.c` / `hack.c` `pickup` / `dig.c` still omit teeter callers. Pre-existing. Do not expand this next iter.
4. Dragon meager hoard shipped next as D-1074. `lay_an_egg` remains Open.

Do not skip picnic teeter / restore always-picnic on a seen pit. Do not treat in-pit `TT_PIT` as teetering. Do not import a second helper clone. Do not put trailing `confdir` inside shared `getdir`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: the picnic `if` is C `OBJ_AT && !(uteetering \|\| uescaped)` with `trap.c` helpers at the C home, so a seen precipice skips picnic into the trap arm, and an in-pit hero still picnics.
- Must-fix stays empty; next port after D-1074 pops Open `dosit` `lay_an_egg`.
