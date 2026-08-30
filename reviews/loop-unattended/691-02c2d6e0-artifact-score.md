# Review 691 — 02c2d6e0 — end.c artifact_score (D-1730)

## Metadata
- Full / short hash: `02c2d6e027d1d057b5ac3277fd43a7e5bf07bb74` / `02c2d6e0`
- Parent: `578b7088` (D-1729). This file audits **this SHA only** (fifth of nine `js/` commits since review **686**). Archive **Addressed:** D-1730 `02c2d6e0`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-30 10:50:17 +0200
- D-id: **D-1730**
- Stats: `js/end.js` +96/−14; `js/artifact.js` comment. Total `js/` insertions **97** <250. Band **150–350**.
- Claims to close: Open `artifact_score` after D-1719 / review **680** (`arti_cost`; score walk named). Not `hidden_gold`. `reviews/loop-2026-08-15/` has no unpaid artifact_score Must-fix.
- JS / map: `end.js` `artifact_score`. `c-js-map/turns.md` + `data.md`.
- Prior: **680** named `end.c:920` as omit.

## Intent vs deliverable

Git subject promises: escape/ascend unique items add `arti_cost*5/2` to `urexp` and list worth lines, instead of omitting the invent walk.

`node scripts/csym.mjs artifact_score` → `end.c:906–940`. `--callers`: `:1449` counting TRUE; `:1482` list FALSE when `!done_stopprint`; `:1486` DUMPLOG `endwin==0`. `nowrap_add` `integer.h:129`. `really_done` Demigod `:1418–1423`. `get_valuables` `:1437` before counting. Pet HP `:1454–1468` before the sentence.

```906:934:nethack-c/upstream/src/end.c
    for (otmp = list; otmp; otmp = otmp->nobj) {
        if (otmp->oartifact || otmp->otyp == BELL_OF_OPENING
            || otmp->otyp == SPE_BOOK_OF_THE_DEAD
            || otmp->otyp == CANDELABRUM_OF_INVOCATION) {
            value = arti_cost(otmp);
            points = value * 5 / 2;
            if (counting) {
                u.urexp = nowrap_add(u.urexp, points);
            } else {
                discover_object(otmp->otyp, TRUE, TRUE, FALSE);
                otmp->known = otmp->dknown = otmp->bknown = otmp->rknown = 1;
                Sprintf(pbuf, "%s%s (worth %ld %s and %ld points)",
                        the_unique_obj(otmp) ? "The " : "",
                        otmp->oartifact ? artiname(otmp->oartifact)
                                        : OBJ_NAME(objects[otmp->otyp]),
                        value, currency(value), points);
                putstr(endwin, 0, pbuf);
            }
        }
        if (Has_contents(otmp))
            artifact_score(otmp->cobj, counting, endwin);
    }
```

Parent: gold/depth `urexp` only; always “You died in …”. The diff **does** walk invent/cobj, count on ESCAPED/ASCENDED after gold/depth, list after the escape/reward sentence, Demigod title, `nowrap_add` for depth too. It **does not** port `get_valuables` or pet HP / Schroedinger. Named. It **does not** port DUMPLOG `:1486`. Named. It **does not** gate listing on `!done_stopprint`.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `artifact_score` | LIVE new | invent[] or nobj; recurse cobj |
| `nowrap_add` | CLONE first body | `integer.h:129`; JS `MAX_SAFE_INTEGER` |
| `arti_cost` / `artiname` | LIVE import | D-1719. Do **not** add #2 |
| `the_unique_obj` | LIVE import | `objnam.js` |
| `discover_object` | LIVE import | 4 args match C `:453` |
| `currency` | LIVE import | D-1720 |
| `Has_contents` | LIVE | `const.js` |
| `get_valuables` | OMIT named | `sym` NOT FOUND |
| DUMPLOG second walk | OMIT named | Rule #2 dump file |
| pet HP / Schroedinger | OMIT named | |

`node scripts/sym.mjs`:

```
artifact_score   js/end.js:92   sync
nowrap_add       NOT EXPORTED — 1 LOCAL  js/end.js:75  => Do NOT write clone #2.
arti_cost        js/artifact.js:391   sync
artiname         js/artifact.js:342   sync
the_unique_obj   js/objnam.js:1789   sync
discover_object  js/invent.js:3794   sync
currency         js/invent.js:1158   sync
Has_contents     js/const.js:3069   sync
get_valuables    NOT FOUND in js/**
```

`--can end.js artifact.js` / `invent.js`: ALREADY (named imports on existing edges). FORCE/DIAG/`getRngLog`/`fastforward`/seed names: none. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**Filter (`:917–919`).** C `oartifact \|\| Bell \|\| Book \|\| Candelabrum`. JS same otyp indexes. **Match.** No `rn2`.

**Points (`:920–921`).** C `value = arti_cost`; `points = value * 5 / 2` (long trunc toward 0 for ≥0). JS `Math.trunc((value * 5) / 2)`. **Match for non-negative costs.**

**Counting (`:922–923`).** C `nowrap_add(u.urexp, points)`. JS same. `nowrap_add`: C `LONG_MAX`; JS `Number.MAX_SAFE_INTEGER`. Contest scores will not hit either cap. Analogue, not a 32-bit LONG_MAX port. Do **not** add `nowrap_add` #2.

**Listing (`:924–934`).** C `discover_object(otyp, TRUE, TRUE, FALSE)` then four known flags then `The ` + artiname/OBJ_NAME + worth + currency + points. JS same 4-arg discover, same flags, `the_unique_obj` prefix, `artiname` / `objectNameStrs`, `currency(value)`. **Match the line.** `putstr` → `lines.push` (NHW_TEXT stand-in). DUMPLOG `endwin==0` skip named.

**Recurse (`:937–938`).** C `Has_contents` → `cobj`. JS same. **Match nested.** Invent as array vs nobj: JS walks `invent[]` then `cobj.nobj`. Same objects if invent[] is the chain order.

**Callers.** C `:1449` after `get_valuables` add, only ESCAPED/ASCENDED. JS after gold/depth `nowrap_add`, same how gate — **without** valuables/pets in `urexp`. Named. C `:1475–1482` sentence uses post-pet `urexp` then list if `!done_stopprint`. JS sentence then list always. **Match sentence verbs** (“went to your reward” / “escaped from the dungeon”). `done_stopprint` unnamed small omit — not Must-fix.

**Demigod (`:1418–1423`).** C `how != ASCENDED` → role name else Demigod(dess). JS `how === ASCENDED` same. **Match.**

**Callee closure.** LIVE: `arti_cost`, `artiname`, `discover_object`, `the_unique_obj`, `currency`, `Has_contents`. CLONE: `nowrap_add`. OMIT named: `get_valuables`, pet HP, DUMPLOG, `done_stopprint`. STUB: **none**. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject “add arti_cost*5/2 … and list worth lines”: **true** for unique/invocation items on ESCAPED/ASCENDED. Do **not** stamp “Match C `get_valuables` gems.” Do **not** stamp “Match C pet HP / Schroedinger.” Do **not** stamp “Match C DUMPLOG `artifact_score`.” Do **not** stamp “Match C `LONG_MAX` nowrap.” Journal “fortress held” is not an ascend-screen proof. Public sessions **do not** ascend/escape with Excalibur; canary was node 10000/12500. Admit public-unhit.

## Density

§2b: one C `artifact_score` + the two live callers. +97. Did not glue `get_valuables` / hidden_gold. Did **not** reopen D-1719 `arti_cost`.

## Verification

D-log: save-oracle skip (untagged `end.c:artifact_score`); node count+list+cobj (Excalibur 10000, Bell 12500, nested); green+strict seed8000/0900; CURRENT cohort **9**/9 + strict. Rule #2 clean. Escape/ascend **public-unhit**. Admit that.

## Actionable C-wrongs

None for Must-fix (helper matches C; valuables/pets/DUMPLOG are named). Named: `get_valuables` (`:1437–1446`); pet HP / Schroedinger (`:1454–1468`); DUMPLOG `:1486`; `done_stopprint` list gate; gold/depth ascend-align bonus. Do **not** add `nowrap_add` #2. Do **not** add `arti_cost` #2. Do **not** add `get_valuables` #1 in this review. Do **not** `fopen` a dump file. Do **not** re-port D-1719.

Verdict: **ACCEPT-WITH-DEBT**
