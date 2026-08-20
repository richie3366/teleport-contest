# Review 247 — 965d2beb — mon.c meatcorpse (D-1285)

## Metadata
- Full / short hash: `965d2bebafde36ecd6f179e1cc20cf09023596f0` / `965d2beb`
- Parent: `433ad843` (D-1284). This file audits **this SHA only**. Archive row **Addressed:** D-1285 `965d2beb` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 15:40:37 +0200
- D-id: **D-1285**
- Stats: 11 files, +178 / −38 — `js/mon.js` +70; `js/monmove.js` +17; `js/monsters.js` +15.
- Claims to close: Open `mon.c` `meatcorpse` (named from D-1271 / review **246**). Not meatobj. `reviews/loop-2026-08-15/` has no unpaid meatcorpse Must-fix.
- JS / map: `mon.js` `meatcorpse`; `monmove.js` `postmov`; `monsters.js` `corpse_eater`; `c-js-map/turns.md`. `mon_would_consume_item` / consume meatbox/poly named.
- Prior reviews this SHA claims to close: **233** / **246** named omit `corpse_eater` `meatcorpse` after cube `meatobj`.

## Intent vs deliverable

Git subject promises: “Match C mon.c meatcorpse so a purple worm (or ghoul/piranha) that postmovs onto a floor corpse eats it, instead of leaving the corpse for mpickstuff.”

C `meatcorpse` (`mon.c:1653–1722`): tame return 0; `sobj_at(CORPSE)` then `nxtobj(…, TRUE)` (skips globs); vegan or `flesh_petrifies && !resists_ston` continue; rider `revive_corpse` then break; `quan>1` `splitobj(1)`; cansee+canseemon eat `pline_mon` else You_hear masticating; `m_consume_obj`; `ptr != original_ptr` → `!ptr ? 2 : 1`; return 1 after **one** corpse. Instant (no `meating`). Macro `mondata.h:243–247` purple worm / baby / ghoul / piranha. Caller `monmove.c` `postmov` `:1674–1678` after cube, before `mpickstuff`.

Old JS: `// corpse_eater meatcorpse named` after D-1284 `meatobj`.

The diff **does** live `meatcorpse`, `corpse_eater` by mndx, and the `postmov` call. It does **not** wire `mon_would_consume_item` (still `return false`) or expand `m_consume_obj`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `meatcorpse` | C `:1656–1722`, **new** | |
| `corpse_eater` | C `mondata.h:243–247`, **new** | mndx analog |
| postmov call | C `:1674–1678`, **wired** | after cube |
| `sobj_at_otyp(CORPSE)` | C `sobj_at`, **clone** | skips globs by otyp |
| `nxtobj` / `splitobj` | C `invent.c` / `mkobj.c`, **imported live** | |
| `vegan` / `flesh_petrifies` | C `mondata.h`, **imported live** | Medusa in `flesh_petrifies` |
| `revive_corpse` | C `do.c`, **imported live** | dynamic `do.js` |
| `m_consume_obj` | C `:1392`, **imported live partial** | heal+`delobj`; meatbox/poly named |
| `mon_would_consume_item` | C `monmove.c`, **named omit** | still stub false |
| Soundeffect masticating | C `:1704`, **named omit** | empty without SND_LIB |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new gameplay RNG** in `meatcorpse` itself (`splitobj` `next_ident` `rnd(2)` is C ident, not positional combat).

## C ↔ JS fidelity

Pinned C loop (`mon.c:1667–1719`):

```
    for (otmp = sobj_at(CORPSE, x, y); otmp;
         otmp = nxtobj(otmp, CORPSE, TRUE)) {
        corpsepm = &mons[otmp->corpsenm];
        if (vegan(corpsepm) || (flesh_petrifies(corpsepm) && !resists_ston(mtmp)))
            continue;
        if (is_rider(corpsepm)) { revive; newsym; if (!revived) continue; break; }
        if (otmp->quan > 1) otmp = splitobj(otmp, 1L);
        if (cansee(x,y) && canseemon(mtmp)) { distant_name; verbose pline_mon; }
        else { Soundeffect; verbose You_hear masticating; }
        m_consume_obj(mtmp, otmp);
        if (ptr != original_ptr) return !ptr ? 2 : 1;
        if (mtmp->minvis) newsym(x,y);
        return 1;
    }
```

JS copies that order. `sobj_at_otyp(CORPSE)` then `nxtobj(…, true)` is the floor-chain analog of C `sobj_at`+`nxtobj` (globs are not `CORPSE`). `vegan` matches `mondata.h:232–238` (blob/jelly/fungus/vortex/light/elemental!stalker/golem!flesh!leather/noncorporeal). `flesh_petrifies` includes Medusa. `distant_name` runs even if `!verbose` when cansee+canseemon (C side effects). `else if (verbose) You_hear` skips empty Soundeffect — no RNG.

`m_consume_obj` is the same live-partial as D-1271/D-1284: heal+`delobj`, not a no-op. This is **not** “Match C dispatch, callee is a stub.” Poly early-out is mndx (D-0928 #1130). Return 1 after the first eaten corpse — does not walk the rest. Match.

`corpse_eater`: C pointer `== &mons[PM_*]`. JS `mndx === PM_*` because `mons()` allocates. Four species only. Match the macro.

Caller: after cube `meatobj`, `etmp >= 2` return, else `mpickstuff`. Match `:1674–1680`. Pets still 0 (dog.c). Jackal not a corpse_eater.

`mon_would_consume_item` still false: a worm that never steps on a CORPSE will not path toward one. That is a **different** C function, named, not a meatcorpse body C-wrong.

## Hallucinations / overclaim

Subject + D-1285 say a purple worm / ghoul / piranha that `postmov`s onto a floor corpse eats it. **The function + macro + caller are the hunk.** Stamping **Addressed:** D-1285 is fair. Do **not** stamp “Match C `mon_would_consume_item`.” Do **not** stamp “Match C `m_consume_obj` meatbox/poly/`mon_givit`.” Do **not** stamp “Match C rider off-level return 3.”

## Density

One C function plus its macro plus the one `postmov` site. ~85 JS lines. Sibling of D-1284, not glued into that SHA. Right size.

## Branch-by-branch confirm

1. Tame worm: 0. Match `:1664–1665`.
2. No CORPSE / only glob: 0. Match `sobj_at` skip.
3. Jackal on corpse: `corpse_eater` false; `mpickstuff` (nymph skip still). Match caller.
4. Worm on lichen (vegan): continue, return 0. Match `:1674`.
5. Worm on cockatrice, `!resists_ston`: continue. Match `:1676`.
6. Rider corpse: `revive_corpse`; break; no eat. Match `:1678–1689`.
7. quan 3: `splitobj(1)`; consume one; leftover 2. Match `:1692–1693`.
8. cansee+canseemon: `pline_mon` eats. Match `:1695–1702`.
9. unseen verbose: You_hear masticating. Match `:1703–1706`.
10. Instant (no `meating`). Match comment `:1715`. Public-unhit unless a corpse_eater `postmov`s onto a CORPSE.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Dynamic `import('./do.js')` is relative ESM. Plain ESM.

## Verification

Journal: private canary **19**/19 (C body+caller+macro; JS live; tame / empty / non-corpse; eat+heal; glob skip; vegan skip; petrify skip; split quan 3→2; postmov worm vs jackal vs cube; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a corpse_eater `postmov`s onto a CORPSE. Cadence this audit: full `sessions` at HEAD `9486280d` **44**/44 Scr **11,405**/11,405 RNG **100%**.

## Actionable C-wrongs

None for Must-fix. Skip/eat/split/return-1 match C; `corpse_eater` is the four-species macro; devour callee is live `delobj`.

Named omits (map, not Must-fix):

1. `mon_would_consume_item` (path toward corpses)
2. `m_consume_obj` meatbox / poly / uball / grow / stone / `mon_givit`
3. rider off-level return 3 (C unimplemented)
4. Soundeffect; `You_hear` Unaware/Underwater

Do not Must-fix “mndx `corpse_eater`.” Do not Must-fix “stub `mon_would_consume_item`” as if it were inside `meatcorpse`. Do not pull missmu this SHA.

## Callers / RNG ledger

C: `postmov` corpse_eater. JS: same. No new positional combat RNG. Public fortress is not evidence a purple worm ate a floor corpse.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: corpse_eater `postmov` now eats one floor CORPSE via live `splitobj`/`delobj`; `mon_would_consume_item` stays named.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1285 `965d2beb`.
