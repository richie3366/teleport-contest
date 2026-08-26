# Review 482 — 6a42c40e — objnam.c doname_base slime-mold fake_arti (D-1521)

## Metadata
- Full / short hash: `6a42c40ebebae241263c4063b6e505b936d85136` / `6a42c40e`
- Parent: `5dd0ba20` (D-1520). This file audits **this SHA only** (ninth of nine `js/` commits since review **473**). Archive **Addressed:** D-1521 needs short hash `6a42c40e` (filled in this review commit).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-26 03:12:32 +0200
- D-id: **D-1521**
- Stats: 9 files, +137 / −46 — `js/objnam.js` +51 / −10. Band 150–350 (js/ insertions 51).
- Claims to close: Open `objnam.c` doname_base slime-mold fake_arti (named from D-1520 / D-1511). Not `fruit_from_indx`. `reviews/loop-2026-08-15/` has no unpaid fake_arti Must-fix.
- JS / map: `objnam.js` `doname` / `xname`; local `artifact_name_objnam`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **448** verified the FALSE clone; **472** named fake_arti; **481** named this as next Open.

## Intent vs deliverable

Git subject promises: a slime-mold fruit whose name matches an artifact uses that artifact’s article (`"the "` or none), not `"a "`/`"an "`.

Pinned C `objnam.c` `doname_base` `:1275–1299`:

```1275:1299:nethack-c/upstream/src/objnam.c
    /* fruits are allowed to be given artifact names; when that happens,
       format the name like the corresponding artifact, which may or may not
       want "the" prefix and when it doesn't, avoid "a"/"an" prefix too */
    fake_arti = (obj->otyp == SLIME_MOLD
                 && (aname = artifact_name(bp, (short *) 0, FALSE)) != 0);
    force_the = (fake_arti && !strncmpi(aname, "the ", 4));
    ...
    } else if (force_the || obj_is_pname(obj) || the_unique_obj(obj)) {
        if (!strncmpi(bp, "the ", 4))
            bp += 4;
        Strcpy(prefix, "the ");
    } else if (!fake_arti) {
        Strcpy(prefix, "a ");
    }
```

Callee `artifact.c` `artifact_name` `:329–353` (fuzzy FALSE, `otyp_p` NULL). `xname_flags` `:1011–1012` pointer-bumps leading `"the "` so `bp` entering doname_base is already stripped. Caller `doname()` flags 0. `just_an` redo at `:1686–1693` runs only when `prefix` starts with `"a "` (case-sensitive).

Old JS: always `"a "` unless pname/unique; `pretty_base` kept a `"The …"` fname; fake_arti named after D-1511.

The diff **does** (1) strip leading `"the "` in `xname` after the named suffix (C `:1011`), (2) rebuild that lookup string in `doname` from `pretty_base` + optional `" named "+ONAME`, (3) slime-mold-strip `base` so the displayed fruit does not keep `"The "`, (4) set `fake_arti` / `force_the` / `else if (!fake_arti) "a "`. It **does not** import `artifact.js` `artifact_name` (invent cycle). It **does not** port `reorder_fruit`, bones `goodfruit`, pager look `spe`, or `doname_vague_quan` `"some "`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `doname` fake_arti / force_the | C `:1278–1299`, **LIVE this SHA** | article envelope |
| `xname` the-strip | C `:1011–1012`, **LIVE this SHA** | all xname, not fruit-only |
| `artifact_name_objnam` | C `artifact.c:329–353`, **CLONE** | fuzzy=FALSE subset; D-1487 |
| `artifact_name` (artifact.js) | C same, **LIVE elsewhere** | not imported; cycle |
| `fruit_from_indx` | C `:431`, **LIVE** | pretty_base SLIME_MOLD |
| `obj_is_pname` / `the_unique_obj` | C, **LIVE** | unchanged arms |
| `just_an` redo | C `:1686–1693`, **LIVE** | only if prefix `"a "` |
| `reorder_fruit` / `goodfruit` / pager `spe` | C, **OMIT named** | Open |
| `doname_vague_quan` `"some "` | C `:1284–1287`, **OMIT named** | quan path still numeric |
| BAG_OF_TRICKS empty / ARMOR gloves `:1412` | C, **OMIT named** | not this SHA |

`node scripts/sym.mjs doname xname artifact_name artifact_name_objnam fruit_from_indx obj_is_pname the_unique_obj`:

```
doname           js/objnam.js:1958   sync
xname            js/objnam.js:738   sync
artifact_name    js/artifact.js:605   sync
artifact_name_objnam NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/objnam.js:1236
             => Do NOT write clone #2. Check pinned C; if C has one
                function, this is clone drift (map debt / Open row).
fruit_from_indx  js/objnam.js:1166   sync
obj_is_pname     js/objnam.js:1760   sync
             !! ALSO 1 LOCAL CLONE(S) in 1 files — IMPORT the export; do NOT add another
               js/do_wear.js:159
the_unique_obj   js/objnam.js:1747   sync
```

This SHA does **not** delete a symbol or re-point a clone to an import. `artifact_name_objnam` stays the one allowed objnam copy (review **448**). `sym` “import artifact.js” is the invent cycle: **do not**. `obj_is_pname` clone in `do_wear.js` is pre-existing, not this diff.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **No new gameplay RNG** (article is string-only). **Public-unhit** unless OPTIONS/doset fruit is an artifact name.

## C ↔ JS fidelity

`artifact_name` FALSE. C `:337–349`: strip `"the "` on `name` and `aname`, `!strcmpi`, return stored `a->name`, loop `artilist+1` while `a->otyp`. JS clone `:1236–1249`: same strip + `toLowerCase() ===` (ASCII `strcmpi`), return `a.name`, start at raw index 1, skip `!a?.name`. Live `artifact.js` adds `otyp<0` skip and fuzzy. `hack_artifacts` mutates role/align, **not** `.name`, so raw names match C’s runtime names for this caller. Last raw row is a named artifact (no colliding sentinel). **Verified CLONE** for `fuzzy=FALSE` / `otyp_p=NULL`. Not a stub.

`xname` the-strip. C `:1011–1012` runs after `has_oname && dknown` Concat, for **every** class. JS `:778–782` slices the same after the named suffix. **Match.** This is not a fruit-only gate. A fruit fname `"The Apple"` via xname becomes `"Apple"`; C already did that. doname still uses `pretty_base`, so this SHA also slime-mold-strips `base` in doname (`:2008–2011`) so the displayed name matches C’s already-stripped `bp`.

Lookup rebuild. C `bp` is xname: fname, optional ick (`:758–771` singular then plural when `pluralize`), optional `" named " ONAME`, then the-strip, then doname poisoned-strip `:1270–1272`. JS doname cannot call `xname` (observe / unique-known side effects). It rebuilds from `pretty_base` (fname / `"fruit"`) after the same poisoned strip (`:1982–1985`) and the same ick (`:1989–1991`), then appends `" named "` when `dknown && oname`, then the-strip. **Match that string for SLIME_MOLD.** Named-ONAME in the lookup so `"Excalibur named Foo"` misses. **Match C Concat-then-lookup.**

Article. quan ≠ 1 → `"%ld "` (JS `` `${quan} ` ``). **Match the numeric arm.** CORPSE skip unchanged. `force_the \|\| obj_is_pname \|\| the_unique_obj` → strip leftover `"the "` on `base`, prefix `"the "`. **Match `:1292–1295`.** `else if (!fake_arti)` `"a "`. **Match `:1296–1298`.** fake_arti && !force_the → empty prefix (Excalibur, Sting, Frost Brand). **Match.** `just_an` redo only `prefix.startsWith('a ')` (`:2153–2157`). Empty / `"the "` prefixes skip it. **Match `:1686`.** Apple fruit still `"a "` then `"an "`. **Match.**

`force_the` uses the **canonical** `aname` (`a->name`), not the stripped lookup key. `"The Eyes of the Overworld"` / `"The Orb of Fate"` keep `"the "`. **Match `:1280`.** JS `slice(0,4).toLowerCase() === 'the '` is `strncmpi(..., 4)`. **Match.**

Callee closure (fake_arti arm). LIVE: `fruit_from_indx` (pretty_base), `obj_is_pname`, `the_unique_obj`, `just_an`. CLONE: `artifact_name_objnam` matched to C FALSE here. OMIT named: `vague_quan` `"some "`, `reorder_fruit`, `goodfruit`, pager `spe`. STUB: none in this arm. **Arm may ship.** Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject artifact article (the / none) not a/an: **true of the canary and of the article `if`**. D-log Excalibur/Sting/Frost Brand no article; Orb/Eye `force_the`; the-Excalibur strip; quan 2; blessed; Apple a/an; named-Foo miss: **true of that canary**, not a public OPTIONS fruit. Stamping **Addressed:** D-1521 for **`:1278–1299` + xname `:1011` + FALSE `artifact_name`** is fair. Do **not** stamp “Match C `reorder_fruit`.” Do **not** stamp “imported `artifact.js` `artifact_name`.” Do **not** stamp “Match C `doname_vague_quan`.” Do **not** treat fortress 44/44 as an artifact-named fruit screen. This is **not** “dispatch ported, callee stubbed”: the callee is a verified FALSE clone, not a TODO.

## Density

+51 JS: article envelope + the xname the-strip C already does before that lookup. Playbook §2b. Did not glue `reorder_fruit`. Acceptable. Using the existing D-1487 clone is the cycle-correct callee, not a second copy.

## Branch-by-branch confirm

1. `otyp != SLIME_MOLD`: `fake_arti` false; old pname/unique/`"a "` path. **Match.**
2. Slime-mold `"Excalibur"`: clone hit, canonical name has no `"the "`, prefix empty. **Match.**
3. Slime-mold `"The Eyes of the Overworld"` / `"Orb of Fate"`: xname/doname strip lookup `"the "`; `force_the`; prefix `"the "`. **Match.**
4. Fname already `"the Excalibur"` (any case): strip then hit; `force_the` false; no a/an. **Match.**
5. `"Apple"` / `"anise"`: miss; `"a "` then `just_an`. **Match.**
6. quan 2: numeric prefix; `fake_arti` still computed, unused for article. **Match `:1283`.**
7. `dknown` ONAME `"Excalibur named Foo"`: lookup includes `" named Foo"` → miss → `"a "`. **Match Concat `:998–1005` then `:1278`.**
8. Blessed / BUC prefix after article: unchanged; canary blessed Excalibur has no `"a "`. **Match order.**
9. `vague_quan` `"some "`. **Named omit.**
10. **Public-unhit** unless fruit OPTIONS is an artifact name.

## Callers / RNG ledger

C: `doname` / `xname` / inventory / messages. JS the same. No `rn2`/`rnd`. No seed gate.

`the()` already used this clone (D-1487). doname_base is a second C caller of `artifact_name(..., FALSE)` on fruit `bp`. Wish/fuzzy still lives only in `artifact.js`. **Do not write clone #2.**

C `just_an` `:2118–2125` also drops the article for `"the "` / `"molten lava"` / `"iron bars"` / `"ice"` when prefix was `"a "`. fake_arti empty prefix never reaches that. A fruit literally named `"ice"` still takes `"a "` then just_an clears it — pre-existing `just_an`, not this SHA. **Match C for fake_arti.**

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No fs. No FORCE. Local clone is documented cycle cost, not a Rule #2 hit.

## Verification

D-log: private canary **21**/21 (C/JS grep; Excalibur/Sting/Frost Brand; Orb/Eye `force_the`; the-Excalibur strip; quan 2; blessed; Apple a/an; named-Foo miss; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless OPTIONS/doset fruit is an artifact name. Cohort is shared-startup. Honest.

## Actionable C-wrongs

None at the claimed article. Remaining **named** (map / Open): `reorder_fruit`; bones `goodfruit`; pager look `spe = current_fruit`; `doname_vague_quan` `"some "`; BAG_OF_TRICKS/HORN empty prefix; ARMOR gloves `:1412`. Do not Must-fix “import `artifact.js` `artifact_name`” (invent cycle; FALSE clone matches C `:329–353` for this caller). Do not Must-fix “doname should call `xname`” (observe side effects; rebuilt bp matches SLIME_MOLD). Do not Must-fix `artilistRaw` vs `artilist()` — `hack_artifacts` does not rename.

Verdict: **ACCEPT-WITH-DEBT**
