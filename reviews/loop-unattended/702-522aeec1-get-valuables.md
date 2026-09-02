# Review 702 — 522aeec1 — end.c get_valuables / sort_valuables (D-1741)

## Metadata
- Full / short hash: `522aeec13cc71eaf61450c8fd7df063e2376b23d` / `522aeec1`
- Parent: `b712f3b6` (D-1740). This file audits **this SHA only** (second of nine `js/` commits since review **700**). Archive **Addressed:** D-1741 `522aeec1`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-02 23:01:13 +0200
- D-id: **D-1741**
- Stats: `js/end.js` +162/−11. Total `js/` insertions **162** <250. Band **150–350**.
- Claims to close: Open `get_valuables` after D-1730 / reviews **691** and **701** (unique-item score live; amulet/gem tally named). Not pet HP. Not `shopper_financial_report`. `reviews/loop-2026-08-15/` has no unpaid valuables Must-fix.
- JS / map: `end.js` `get_valuables` / `sort_valuables` / score+list helpers. `c-js-map/turns.md`.
- Prior: **691** named `:762–791` / `:1437–1446` / `:1490–1519`. **701** named the same as not-this-SHA.

## Intent vs deliverable

Git subject promises: escaped/ascended score and disclose tally invent amulets and gems (skipping artifacts, combining glass) instead of omitting the valuables walk after D-1730.

`node scripts/csym.mjs get_valuables` → `end.c:762–791`. `--callers get_valuables`: prototype `:22`; recurse `:771`; `really_done` `:1437`. `sort_valuables` `end.c:797–818`. `--callers sort_valuables`: prototype `:23`; list loop `:1492`. `decl.c` `gv.valuables[0]=gg.gems` / `[1]=ga.amulets` / `[2]=NULL` `:1132–1137`. `decl.h` amulet size `LAST_AMULET+1-FIRST_AMULET`; gem size `LAST_REAL_GEM+1-FIRST_REAL_GEM+1`. `objects.h` MARKER `FIRST_AMULET`=`AMULET_OF_ESP`, `LAST_AMULET`=`AMULET_OF_YENDOR`, `LAST_GLASS_GEM`=`WORTHLESS_VIOLET_GLASS`. `mksobj` `mkobj.c:1178–1259` (`end.c:1501` `FALSE,FALSE`). `obfree` `shk.c:1186`. `free_oname` `do_name.c:80–87`.

```762:791:nethack-c/upstream/src/end.c
    for (obj = list; obj; obj = obj->nobj)
        if (Has_contents(obj)) {
            get_valuables(obj->cobj);
        } else if (obj->oartifact) {
            continue;
        } else if (obj->oclass == AMULET_CLASS) {
            i = obj->otyp - FIRST_AMULET;
            ...
        } else if (obj->oclass == GEM_CLASS && obj->otyp <= LAST_GLASS_GEM) {
            i = min(obj->otyp, LAST_REAL_GEM + 1) - FIRST_REAL_GEM;
            ...
```

Parent: `artifact_score` only. The diff **does** walk Array/`nobj`, recurse `Has_contents` first, skip `oartifact`, slot amulets and glass-collapsed gems, `nowrap_add` `count*oc_cost` before unique counting, then list after `artifact_score(false)` (gems before amulets). It **does not** port pet HP / Schroedinger (`:1454–1468`) or DUMPLOG `:1486`. Named. Luckstones sit past `LAST_GLASS_GEM` — C skips them; JS does too.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `get_valuables` | LIVE export | C `:762–791` |
| `sort_valuables` | LIVE local | C `:797–818` insertion by count |
| `reset_valuables` | LIVE local | C `:1433–1436` + `decl.c` sizes; recreate for second game |
| `score_collected_valuables` | LIVE local | C `:1439–1446` |
| `list_valuables` | LIVE local | C `:1490–1519` extracted |
| `mksobj` | LIVE import | `FALSE,FALSE` listing dummy |
| `obfree` | LIVE import | D-1727; sync |
| `free_oname` / `has_oname` | LIVE import | |
| `discover_object` / `xname` / `currency` | LIVE import | `currency(2)` like C `2L` |
| `nowrap_add` | verified CLONE | end.js D-1730 |
| `plur` | verified CLONE | local end.js |
| `Has_contents` | LIVE const | artifact bags still scanned |
| pet HP / Schroedinger | OMIT named | `:1454–1468`; `d(m_lev,8)` |
| DUMPLOG `artifact_score` / valuables | OMIT named | |
| `done_stopprint` list gate | OMIT named | review **691** |

`node scripts/sym.mjs`:

```
get_valuables    js/end.js:162   sync
sort_valuables   NOT EXPORTED — 1 LOCAL  js/end.js:206
reset_valuables  NOT EXPORTED — 1 LOCAL  js/end.js:141
score_collected_valuables NOT EXPORTED — 1 LOCAL  js/end.js:220
list_valuables   NOT EXPORTED — 1 LOCAL  js/end.js:242
mksobj           js/mkobj.js:1739   sync
obfree           js/shk.js:3306   sync
free_oname       js/do_name.js:990   sync
has_oname        js/const.js:3115   sync
discover_object  js/invent.js:3794   sync
xname            js/objnam.js:683   sync
currency         js/invent.js:1158   sync
nowrap_add       NOT EXPORTED — 1 LOCAL  js/end.js:81
artifact_score   js/end.js:98   sync
```

Re-points: `obfree` / `mksobj` / `free_oname` / `has_oname` added to existing static imports. `--can end.js shk.js obfree`: **ALREADY**. `--can end.js mkobj.js mksobj`: **ALREADY**. No new TDZ. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: none. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**. Do **not** add `sort_valuables` #2 / `nowrap_add` #2 / `plur` #8.

## C ↔ JS fidelity

**Walk (`:762–791`).** C `nobj`. JS Array invent **or** `nobj` chain (cobj). `Has_contents` recurse **before** `oartifact` so an artifact bag still contributes inner gems. Else skip artifacts. Amulet slot `otyp-FIRST_AMULET`; first stack sets `count`+`typ`, else `+= quan`. Gem `otyp<=LAST_GLASS_GEM`, index `min(otyp, LAST_REAL_GEM+1)-FIRST_REAL_GEM` so all glass share one slot (first glass `typ` wins). **Match branch order.** No `rn2`/`rnd` in the walk.

**Tables (`decl.c:1132–1137`, `decl.h`).** C gems then amulets then NULL. JS `game.valuables` the same three rows. Sizes match the MARKER spans plus the extra glass slot. Recreate-on-collect is the JS analogue of BSS zero-once (a second `done` in-process must not keep stale `typ` identity). **Match the identity model.**

**Score (`:1427–1449`).** C zeros, `get_valuables(gi.invent)`, `count * objects[typ].oc_cost` via `nowrap_add`, **then** `artifact_score(..., TRUE)`. JS `reset` / `get` / `score_collected_valuables` / `artifact_score(..., true)` only when `ESCAPED||ASCENDED`. `objects()` is `game.objects`. **Match order.** Pets after unique counting remain named — sentence `urexp` is still short of C by companion HP.

**List (`:1482` then `:1490–1519`).** C artifacts then valuables. JS `artifact_score(false, lines)` then `list_valuables(lines)` after the “went to your reward / escaped … with N points” line. Sort is insertion by `count` descending, skip empty, structure-copy (JS `{count,typ}` not alias). Real gem/amulet: `mksobj(typ,FALSE,FALSE)`, `discover_object`, `dknown`/`known`, `free_oname` if named, `quan=count`, `"%8ld %s (worth %ld %s),"` with `currency(2L)`, `obfree`. Glass: `"%8ld worthless piece%s of colored glass,"` + `plur(count)`. JS `padStart(8)` / `currency(2)` / local `plur`. **Match the two formats.** `mksobj` init-false still `next_ident`+`unknow_object`; gem/amulet otyps miss the corpse/novel RNG arms. **Match listing dummy.**

**Callee closure (ESCAPED/ASCENDED valuables arm).** LIVE: `get_valuables`, `sort_valuables`, `mksobj`, `obfree`, `discover_object`, `xname`, `currency`, `free_oname`, `has_oname`, `Has_contents`, `artifact_score`. CLONE: `nowrap_add`, `plur`. OMIT named: pet HP / Schroedinger; DUMPLOG; `done_stopprint`. STUB: **none**. Reviews **691**/**701** named omit is now LIVE. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject “tally invent amulets and gems (skipping artifacts, combining glass)”: **true**. D-log `count*oc_cost` then list after unique items, gems-before-amulets: **true**. Do **not** stamp “Match C pet HP / Schroedinger `d(m_lev,8)`.” Do **not** stamp “Match C DUMPLOG valuables.” Do **not** stamp “Match C `done_stopprint`.” Do **not** stamp “Match C luckstone score” — C excludes them. Journal “fortress held” is not an ascend-with-diamonds screen proof. Public sessions **do not** escape/ascend with a gem stash; canary was node 10/10 + listing smoke. Admit public-unhit.

## Density

§2b: C `get_valuables` + `sort_valuables` + the two `really_done` sites. +162. Did not glue companion HP. Did **not** reopen D-1730 `artifact_score` or D-1740 `$` shop report.

## Verification

D-log: save-oracle skip (untagged `end.c:get_valuables`); node empty / ESP+FLY quan / diamond / glass combine first-typ / luckstone skip / artifact amulet skip + artifact-sack recurse / nobj / oc_cost 12300 + pad-8 / gems-before-amulets / glass plural / diamond+ESP worth; green+strict seed8000/0900; CURRENT cohort **9**/9 + strict. Rule #2 clean. Escape/ascend valuables **public-unhit**. Admit that.

## Actionable C-wrongs

None for Must-fix (the tally/list arm matches C; pets/DUMPLOG are named). Named: pet HP / Schroedinger (`:1454–1468`); DUMPLOG; `done_stopprint`; gold/depth ascend-align bonus. Do **not** add `get_valuables` #2. Do **not** add `sort_valuables` #2. Do **not** score luckstones. Do **not** skip `Has_contents` on artifact bags. Do **not** list valuables before `artifact_score(false)`. Do **not** `fopen` a dump file. Do **not** re-port D-1730 / D-1740.

Verdict: **ACCEPT-WITH-DEBT**
