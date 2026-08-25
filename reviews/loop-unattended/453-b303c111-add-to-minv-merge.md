# Review 453 — b303c111 — mkobj.c add_to_minv merge (D-1492)

## Metadata
- Full / short hash: `b303c111003918a0f52e171759c25152fa2445d1` / `b303c111`
- Parent: `f26e11aa` (D-1491). This file audits **this SHA only** (eighth of nine `js/` commits since review **445**). Archive **Addressed:** D-1492 `b303c111` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 18:27:46 +0200
- D-id: **D-1492**
- Stats: 12 files, +122 / −45 — `js/mkobj.js` +22; `js/makemon.js` −12 / +4; comment-only `dokick.js` / `mklev.js`.
- Claims to close: Open `makemon.c` `add_to_minv` merge (named from D-0029 prepend / D-1193 / D-1363 / D-1490 / reviews **323** / **264**). Not stolen_booty. `reviews/loop-2026-08-15/` has no unpaid minvent-merge Must-fix.
- JS / map: `mkobj.js` `add_to_minv`; re-export `makemon.js`. `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **323** named merge after stolen_booty; **264** named merge on swallow gold; **451** told this review not to credit D-1490.

## Intent vs deliverable

Git subject promises: a monster’s second gold stack or matching stackable merges into minvent instead of always prepending a new chain node.

Pinned C `mkobj.c` `add_to_minv` `:2648–2665`: panic if `obj->where != OBJ_FREE`; walk `mon->minvent`; `if (merged(&otmp, &obj)) return 1`; else prepend `OBJ_MINVENT` / `ocarry` / `nobj` / `minvent = obj`; return 0. Callee `invent.c` `merged` `:814–948` after `mergable` `:4379–4499`. Callers already imported the prepend helper (`mpickobj`, `mkmonmoney`, `deliver_obj_to_mon`, `throw_gold`, `shiny_orc_stuff`).

Old JS: prepend-only in `makemon.js` (D-0029 `OBJ_MINVENT`).

The diff **does** move the function to `mkobj.js` next to `add_to_container`, walk+`merged`, prepend on miss, re-export from `makemon.js` so existing imports keep working. It **does not** widen `mergable` (unpaid / erosion / oname / candle age / mail still skipped). Named. It **does not** port gnome `begin_burn` after `!mpickobj` or dog `MIGR_LEFTOVERS`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `add_to_minv` | C `:2648–2665`, **moved+merge this SHA** | was prepend-only in `makemon.js` |
| `merged` | C `invent.c` `:814–948`, **already live** (local in `mkobj.js`) | not a stub |
| `mergable` | C `:4379–4499`, **already live, subset** | unpaid/erosion/oname/candle/mail named |
| `obj_extract_self` / `weight` | C, **imported/live in file** | extract instead of C panic |
| `add_to_container` | C `:2676–2695`, **already live** | same walk+merged envelope |
| `mpickobj` | C `steal.c` `:618+`, **already live** | now sees merge return |
| gnome `begin_burn` after `!mpickobj` | C makemon, **named omit** | |
| dog `MIGR_LEFTOVERS` | C dog.c, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **No new gameplay RNG** (`merged` / gold `weight` are arithmetic). Public fortress: second gold stack on a monster is **public-unhit** unless a session already merged minvent (D-log does not claim a public FAIL).

## C ↔ JS fidelity

Envelope. C for-loop `otmp = minvent; otmp; otmp = nobj` then `merged(&otmp, &obj)`. JS `{ obj: otmp }` / `{ obj }` is the established `add_to_container` stand-in for C double pointers. First success returns 1 (C-freed). Miss prepends and returns 0. Newest object is the chain head. **Match `:2656–2664`.** Walking past a dagger to merge later gold matches C (first `mergable` hit wins, not “must be head”).

Panic vs extract. C `:2652–2653` panics if not `OBJ_FREE`. JS extracts when `where` is truthy and not free — **same softness as live `add_to_container`**, documented. Not a new C-wrong unique to minvent. Null `mon`/`obj` returns 1 (old prepend helper); C would not get NULL.

`merged` callee. Live function: `mergable` then age blend, `quan +=`, coin `owt=weight` + `bknown=0`, else `owt=weight`, `obj_extract_self`, timers, known bits, bypass, `where=OBJ_FREE`. Globby early `obj_absorb`. Hallucination check: “Match C `add_to_minv`” while **`merged` is a stub** — **false**. The merge **is** the live `invent.c` port already used by containers and `stackobj`.

`mergable` subset. C gold `:4391–4393` always TRUE before unpaid. JS `:1731` same. C then cursed/blessed, `how_lost`, then globby TRUE, then unpaid/spe/no_charge/obroken/otrapped/lamplit, food oeaten, dknown/bknown/erosion, corpse/egg/tin corpsenm, candle `age/25`, oil lamplit, `same_price`, oextra, oname lengths. JS after gold: **globby TRUE before cursed** (C cursed-checks globs); then cursed, how_lost, spe, corpsenm, food, dknown, **owornmask reject**. Skips unpaid/erosion/oname/candle/`same_price`. D-log names that unpaid list. **Pre-existing** `mergable`, not this SHA’s walk. Gold and same-spe daggers merge; spe mismatch prepends; wands `oc_merge` false prepend. That is what the canary claims.

C `merged` extras this JS skip: `oname` copy into `*potmp`, `obj_merge_light_sources`, worn-slot fixup, discovered `pline`, `obfree` vs `where=OBJ_FREE`. Minvent callers do not `#adjust` worn hero stacks. Named with mergable, not a dispatch lie.

`mpickobj`. C `return add_to_minv(...)` after `carry_obj_effects`. JS same. Merge now returns 1 so `!mpickobj` gnome `begin_burn` stays skipped — C would also skip burn on the **freed** object; burn on the **kept** stack is the named gnome follow-up.

Re-export. `makemon.js` `export { add_to_minv }` after importing from `mkobj.js`. Callers (`dothrow`, `dokick`, `mklev`, `shk`, `zap`, `mthrowu`) keep the old module path. **Match “do not churn imports.”**

## Hallucinations / overclaim

Subject second gold / stackable merges: **true** on the live `merged`/`mergable` subset. Stamping **Addressed:** D-1492 for the **walk+prepend** is fair. Do **not** stamp “Match C `mergable` unpaid/erosion/oname/candle.” Do **not** stamp “Match C gnome `begin_burn`.” Do **not** stamp “Match C `MIGR_LEFTOVERS`.” Do **not** treat fortress PASS as a second-gold minvent trace. Comment edits in `dokick.js` / `mklev.js` are not a second port.

## Density

One C function, same envelope as `add_to_container`, ~22 JS lines plus a move. Did not glue leftovers or `mergable` unpaid. Playbook §2b. Acceptable (tight, not a fake cluster).

## Branch-by-branch confirm

1. Empty minvent: prepend, return 0, head is obj. **Match `:2660–2664`.**
2. Second gold, same otyp: `mergable` TRUE, quan/owt merge, return 1. **Match `:4391–4393` + `:837–839`.**
3. Matching daggers (spe/BUC/dknown): merge. **Match subset.**
4. spe mismatch: prepend second node. **Match `mergable` spe.**
5. Dagger then gold: walk past dagger, merge gold. **Match for-loop.**
6. Wand (`!oc_merge`): prepend. **Match `:4388`.**
7. `mpickobj` return 1 when merged. **Match steal.c return of `add_to_minv`.**
8. unpaid/erosion/oname/candle still JS-merge when C would refuse. **Named mergable omit, not this walk.**
9. **Public-unhit** for a second gold stack unless a session already exercised it.

## Callers / RNG ledger

C `add_to_minv` `:2648–2665`:

```2655:2664:nethack-c/upstream/src/mkobj.c
    /* merge if possible */
    for (otmp = mon->minvent; otmp; otmp = otmp->nobj)
        if (merged(&otmp, &obj))
            return 1; /* obj merged and then free'd */
    obj->where = OBJ_MINVENT;
    obj->ocarry = mon;
    obj->nobj = mon->minvent;
    mon->minvent = obj;
    return 0;
```

Callers already imported the prepend helper: `steal.c` `mpickobj`; `makemon.c` `mkmonmoney`/`mongets`; `dokick.c` `deliver_obj_to_mon`; `dothrow.c` `throw_gold`; `mkmaze.c` `shiny_orc_stuff`. Re-export keeps those paths. C gold `mergable` returns TRUE before unpaid (`:4391–4393`); JS `:1731` same. No new dice. Public fortress does not document a second gold stack on a monster.

C `merged` extras JS still skips (oname into `*potmp`, light-source merge, worn `#adjust`, discovered pline, `obfree`): not this walk. `mpickobj` `return add_to_minv` so merge is 1 (freed). Named gnome `begin_burn` after `!mpickobj` stays map debt.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No fs. No FORCE/DIAG. `{ obj }` pointer boxes are the existing container pattern, not a glyph stand-in. No `fastforward.js` writes.

## Verification

D-log: private canary **30**/30 (re-export; empty prepend; gold quan; dagger merge; spe mismatch; walk past dagger; wand; mpickobj flag; null; newest head); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. Focused+green+**inventory/makemon** cohort is relevant. No dedicated public session for minvent merge — **public-unhit**.

## Actionable C-wrongs

None that belong on Must-fix. Named omits (`mergable` unpaid/erosion/oname/candle/mail, gnome `begin_burn`, dog leftovers) stay on the map. Pre-existing `mergable` glob-before-cursed order is not this SHA.

Verdict: **ACCEPT-WITH-DEBT**
