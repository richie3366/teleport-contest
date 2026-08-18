# Review 174 — fc314871 — do.c `revive_corpse` MINVENT/CONTAINED + Adjmonnam (D-1212)

## Metadata
- Full / short hash: `fc314871fd25a404e987388dfdc06e37d720f4c8` / `fc314871`
- Parent: `481e005b` (D-1211). This file audits **this SHA only**. Archive row **Addressed:** D-1212 lacked the short hash; this review commit fills `fc314871`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 09:41:07 +0200
- D-id: **D-1212**
- Stats: 13 files, +296 / −123 — `js/do.js` +193 / −20; `js/do_name.js` +14; `js/zap.js` +1 import.
- Claims to close: Open queue `do.c` `revive_corpse` OBJ_MINVENT / OBJ_CONTAINED (named from D-1081 / D-1202 / review **164**). Not BURIED. `reviews/loop-2026-08-15/` has no unpaid MINVENT Must-fix.
- JS / map: `do.js` `revive_corpse` + local get_obj/get_container/`locomotion` copies; `do_name.js` `Adjmonnam`; `zap.js` `OBJ_FREE`. `c-js-map/data.md` / `debt.md`. BURIED `!is_zomb` FALLTHROUGH `impossible` / `Soundeffect` still named. Next Open is `rot_corpse` worn.
- Prior reviews this SHA claims to close: **164** Actionable “`revive_corpse` MINVENT/CONTAINED + … `Adjmonnam` bite-covered.”

## Intent vs deliverable

Git subject promises: “Match C do.c revive_corpse so a corpse in monster inventory or a container prints drop/appear/sack plines (and Adjmonnam when chewed), instead of reviving silently.”

Old JS messaged INVENT/FLOOR/BURIED-zomb only; MINVENT/CONTAINED fell off. FLOOR always `Monnam`. `cxname_singular` without bite-covered. C `do.c:2111–2246` snapshots `where` / chewed / `cname` via `corpse_xname` / `mcarry` / container loc **before** `revive()`, then switches those arms.

The diff **does** MINVENT drop/appear, CONTAINED pack/floor/minvent sack, FLOOR+MINVENT `Adjmonnam` when chewed, and a `bite-covered` prefix on `cname`. It does **not** FALLTHROUGH buried non-zomb to `impossible` or `Soundeffect(se_scratching)`. Named. `zap.js` imports `OBJ_FREE` for contained `obfree_corpse` (`zap.js:2272` already assigned it — was an unbound ident on that path).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `revive_corpse` MINVENT / CONTAINED | C sites, **new** | `:2183–2215` |
| `Adjmonnam` | C callee, **new** | `do_name.c:1142–1148`; `x_monnam` ARTICLE_THE+adj+highc |
| `get_obj_location_revive` | **clone** of `zap.c:654–688` | CONTAINED_TOO\|BURIED_TOO; cycle vs timeout.js |
| `get_container_location_revive` | **clone** of `zap.c:841–858` | outermost where + minvent carrier |
| `locomotion_revive` | **clone** of `mondata.c:1380–1392` | pack verb; flys/flyl both `"fly"`/`"Fly"` |
| `yname` / `mon_nam` / `Amonnam` / `The` / `an` / `xname` | C callees, **imported** | `yname` is live `objnam.c` |
| `revive` | C callee, **imported** | D-0964 contained/buried extract |
| `impossible` default | C site, **new** on JS default | `:2238–2240`; `%d` interpolates |
| BURIED `!is_zomb` FALLTHROUGH | C, **named omit** | JS `break` still silent |
| `Soundeffect(se_scratching)` | C, **named omit** | buried cansee-else |
| `corpse_xname` adj placement | C, **named omit** | JS prefix on `cxname_singular` |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new RNG** (`locomotion` is table, not `rn2`). `Something` is `decl.h` `c_Something` (literal), not Hallu `rndmonnam`.

## C ↔ JS fidelity

Pinned C MINVENT/CONTAINED (`do.c:2183–2215`):

```
        case OBJ_MINVENT:
            if (cansee(mtmp->mx, mtmp->my)) {
                if (mcarry && canseemon(mcarry))
                    pline("Startled, %s drops %s as it %s!", ...);
                else if (canspotmon(mtmp))
                    pline("%s suddenly appears!", chewed ? Adjmonnam : Monnam);
            }
            break;
        case OBJ_CONTAINED:
            mnam = canspotmon ? Amonnam : Something;
            if (!container) impossible(...);
            else if (mcarry && canseemon(mcarry))
                pline("%s writhes out of %s!", mnam, yname(container));
            else if (container_where == OBJ_INVENT)
                pline("%s %s out of %s in your pack!", mnam, locomotion(..., "writhes"), ...);
            else if (FLOOR && cansee(corpsex, corpsey))
                pline("%s escapes from %s!", mnam, sackname);
```

`Adjmonnam` (`do_name.c:1142–1148`) is `x_monnam(ARTICLE_THE, adj, SUPPRESS_SADDLE if named, FALSE)` then `highc`. JS `do_name.js:603–611` is that wrapper. **C callee, not a glyph stand-in.**

Local clones vs `zap.c:654–688` / `:841–858`: invent→`u.ux,uy`; floor→`ox,oy`; minvent→`ocarry.mx` if nonzero (migrating skip); buried if `BURIED_TOO`; contained recurse if `CONTAINED_TOO`. JS `get_obj_location_revive` (`do.js:2409–2434`) matches those arms. On miss, C zeros `xp,yp`; JS falls back to `corpse.ox` (`:2504–2505`). MINVENT messages use `mtmp.mx` after `revive`, so the fallback is unused there. CONTAINED floor uses `CONTAINED_TOO`, so loc should succeed. Clone debt, not a silent skip of the sack pline. `get_container_location` nesting counter is unused here: C `revive_corpse` passes `(int *) 0`.

Anti-pattern grep of this SHA’s `js/` hunks: empty. `Something` is `decl.h` `c_Something` (literal), not Hallu `rndmonnam`.

### Snapshot vs `do.c:2123–2150`

C: `where`; `is_zomb`; `is_uwep`; `chewed = oeaten != 0`; `cname = corpse_xname(..., chewed ? "bite-covered" : 0, CXN_SINGULAR)`; `mcarry` if MINVENT; `get_obj_location(..., CONTAINED_TOO\|BURIED_TOO)`; if CONTAINED, `container = ocontainer`, `get_container_location` → maybe `mcarry`; **then** `revive`.

JS (`do.js:2488–2514`): same order. `inInvent` override of `where` is **pre-existing**, not this SHA. Chewed `cname` is ``bite-covered ${cxname_singular}`` — ordinary “newt corpse” matches C `corpse_xname` adj; unique/pname adjective placement named. `loc` fallback to `corpse.ox` when get_obj returns null: C zeros xp,yp. MINVENT messages use `mtmp.mx` after revive, not `corpsex`. CONTAINED floor uses loc with `CONTAINED_TOO` so loc should succeed. Clone debt, not a silent skip of the sack pline.

### MINVENT vs `:2183–2194`

C: `if (cansee(mtmp->mx, my))` then if `mcarry && canseemon(mcarry)` `"Startled, %s drops %s as it %s!"` (`mon_nam`, `an(cname)`, revives/disappears) else if `canspotmon(mtmp)` `"%s suddenly appears!"` (chewed `Adjmonnam` else `Monnam`).

JS `:2544–2556` same gates and strings. `an(cname)` on bite-covered is C. Unseen carrier + unseen revive: no pline. Match.

### CONTAINED vs `:2195–2215`

C: `mnam = canspotmon ? Amonnam : Something`; `!container` `impossible`; else if `mcarry && canseemon(mcarry)` writhes out of `yname(container)`; else if `container_where == OBJ_INVENT` `"%s %s out of %s in your pack!"` with `locomotion(mtmp->data, "writhes")` + `an(xname(container))`; else if FLOOR && `cansee(corpsex, corpsey)` escapes from sack.

JS `:2557–2573` same if/else chain. `yname` (`objnam.js:1262–1268`) is `cxname` + `shk_your`, not a `"the sack"` stand-in. Nested boxes: both walk `while where==CONTAINED`. Minvent sack of an **unseen** carrier does not print pack/floor (else-if). Match.

`locomotion(..., "writhes")`: first char lowercase → locoindx 0. `flys[0]==flyl[0]=="fly"` so JS collapsing small/large flyer to `'fly'` **matches** locomotion (stagger indices 2/3 are `stagger()`, unused here). `slithy` ≡ `mflags1 & M1_SLITHY`. `amorphous` / `!mmove` / `nolimbs` / else `def`. **Clone matches C for this call.** Poly pack “slither/ooze/crawl/wiggle/writhes” is C, not a no-op.

### FLOOR chewed vs `:2172–2176`

C `canseemon` uses `Adjmonnam` when chewed; `!canseemon` uses `The(cname)` with bite-covered already in `cname`. JS same. INVENT uwep uses `The ${cname}` vs C `pline_The("%s writhes...")` — ordinary corpses match; unique named.

### `Adjmonnam` vs `do_name.c:1142–1148`

C: `x_monnam(..., ARTICLE_THE, adj, has_mgivenname ? SUPPRESS_SADDLE : 0, FALSE)` then `*bp = highc(*bp)`. JS `highc_name(x_monnam(...))` — first-char cap, same as `Amonnam`/`Monnam` in this file. Unseen still `"It"` via `x_monnam` `do_it`. **C callee, not a glyph stand-in.** Named: invis adj / priest polish already on `x_monnam`.

### BURIED / default vs `:2217–2241`

Zomb buried pit/claw/`fill_pit` unchanged (D-1202). C `!is_zomb` FALLTHROUGH `impossible`. JS comments the omit and `break`s — still silent. **Named.** `default` now `impossible('revive_corpse: lost corpse @ %d', where)`; JS `impossible` interpolates `%d` (`display.js:3688–3691`). C always had that arm.

`is_zomb` (`do.js:2493–2495`) still uses `mlet === 'S_ZOMBIE' || (BURIED && (is_rider || S_TROLL))`. C `:2127–2128` is `S_ZOMBIE || (BURIED && is_reviver(&mons[montype]))`. `zap.js:2062` already has `is_reviver`. That rider/troll stand-in is **D-1202** named clone debt, not a D-1212 silent skip of MINVENT. Do not Must-fix as this SHA.

### `OBJ_FREE` import

`obfree_corpse` assigned `obj.where = OBJ_FREE` without importing it. Contained `revive` hits that. Adding the import is a real C `OBJ_FREE==0` bind, not an unused token. Line `3321` still uses literal `0` with a comment — pre-existing, not this claim.

## Hallucinations / overclaim

Subject + D-1212 say MINVENT/CONTAINED print drop/appear/sack plines and `Adjmonnam` when chewed instead of silent. **Those switch arms plus live `Adjmonnam`/`yname`/`revive` are the hunk.** This is **not** “Match C dispatch, callee is a stub.” Do **not** stamp “Match C `corpse_xname` unique adjective slot” or “Match C buried non-zomb `impossible`” or “Match C `Soundeffect`” or “Match C `locomotion` `stagger`.” Say so: sack/nymph messages are C; get_obj/locomotion are local copies that match the cited bodies for this call; worn `rot_corpse` is the next Open, not this SHA.

## Density

One C function family: `revive_corpse` MINVENT/CONTAINED + the three helpers the snapshot needs + `Adjmonnam`. ~200 lines in `do.js` that already called `revive`. High end of §2b, not “finish `do.c`.” BURIED FALLTHROUGH correctly stayed out.

## Branch-by-branch confirm

1. MINVENT, seen carrier, canspot revive → Startled drop + revives. Match.
2. MINVENT, seen carrier, unseen revive → disappears. Match.
3. MINVENT, unseen carrier, canspot → Adjmonnam/Monnam suddenly appears. Match.
4. CONTAINED minvent, seen carrier → writhes out of `yname`. Match.
5. CONTAINED invent pack → locomotion + sack in pack. Match.
6. CONTAINED floor + cansee → escapes from sack. Match.
7. CONTAINED no container → impossible. Match.
8. FLOOR chewed canseemon → `Adjmonnam`. Match.
9. INVENT uwep chewed → `The bite-covered … writhes`. Ordinary match.
10. BURIED zomb → pit/claw (pre-existing). Match.
11. BURIED non-zomb → C impossible; JS silent. **Named.**

No `rn2` added. `revive` keeps its placement dice.

## Verification

Journal: private canary **20**/20 (MINVENT drop/appear + Adjmonnam; CONTAINED pack writhes/slither + floor escape + minvent yname; invent backpack + floor chewed); green+strict seed8000/0900; cohort **4**/4 + strict 1500/1800/0012/0004. **Public-unhit** unless a public timer revives from nymph/sack. Admit that. This audit’s full `sessions` at this SHA: **44**/44 Scr **11405**/11405 RNG **792838**/792838 (100%) speed `32+0.27/turn` (R² 0.829) does not prove sack plines.

## Actionable C-wrongs

Named omits (map / next Open), not Must-fix:

1. `OBJ_BURIED && !is_zomb` FALLTHROUGH `impossible` (`do.c:2236–2240`).
2. `Soundeffect(se_scratching, 50)` before buried `You_hear` (`:2230`).
3. `corpse_xname` unique/pname adjective placement vs ``bite-covered ${cxname_singular}``.
4. `dig.c` `rot_corpse` invent/minvent worn plines — **next Open**, not this SHA.

`get_obj_location` / `locomotion` clones match the cited C for these arms. Do not Must-fix “dedupe with zap.js” (cycle). `set_corpsenm` `oeaten` rescale remains review **164** map debt.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: a corpse that revives from minvent or a sack now prints C’s drop/appear/pack/escape lines (and `Adjmonnam` when chewed) instead of staying silent; buried non-zomb `impossible` and `Soundeffect` stay named, not Must-fix.
- Must-fix stays empty for this SHA; fill **Addressed:** D-1212 `fc314871`. Next port is already Open `rot_corpse` worn plines. Not REVIVE, not `disturb_buried_zombies`.
