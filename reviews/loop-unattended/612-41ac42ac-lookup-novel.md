# Review 612 — 41ac42ac — do_name.c lookup_novel (D-1651)

## Metadata
- Full / short hash: `41ac42ac9127b5c22053c96f554ddfb75565d30f` / `41ac42ac`
- Parent: `f92f0d66` (D-1650). This file audits **this SHA only** (fourth of nine `js/` commits since review **608**). Archive **Addressed:** D-1651 `41ac42ac`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 13:04:12 +0200
- D-id: **D-1651**
- Stats: `js/do_name.js` +50/−2, `js/mklev.js` +13/−2, `js/mkobj.js` +3/−2, `js/readobjnam.js` +7/−1. Band **150–350** (`js/` insertions **73** <250; id >454). C body is 36 lines plus two call sites.
- Claims to close: Open `lookup_novel` after D-1633. Not `'o'` getobj. Not `Death_quote`. `reviews/loop-2026-08-15/` has no unpaid novel Must-fix.
- JS / map: `do_name.js` `lookup_novel`; `mkobj.js` `SIR_TERRY_NOVELS`; `readobjnam.js`; `mklev.js` `create_object`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **594** named `lookup_novel`.

## Intent vs deliverable

Git subject promises: wished and named novels get canonical Discworld titles and `novelidx`, instead of skipping the table after D-1633.

Pinned C `do_name.c` `lookup_novel` `:1626–1661` (`node scripts/csym.mjs lookup_novel`). Table `:1591–1608`. `--callers lookup_novel`: `objnam.c:5357`, `sp_lev.c:2270`. Callee `The` `objnam.c:2233–2240` (`:1637/:1643/:1650`). `noveltitle` `:1610–1623` already live (`--callers` `mkobj.c:1248`, `spell.c:515`).

```1637:1659:nethack-c/upstream/src/do_name.c
    if (!strcmpi(The(lookname), "The Color of Magic"))
        lookname = sir_Terry_novels[NVL_COLOUR_OF_MAGIC];
    else if (!strcmpi(lookname, "Sorcery"))
        lookname = sir_Terry_novels[NVL_SOURCERY];
    ...
    if (idx && IndexOk(*idx, sir_Terry_novels))
        return sir_Terry_novels[*idx];
    return (const char *) 0;
```

Old JS: `noveltitle` + table in mkobj; wish `oname` with the raw string; `create_object` skipped `oname`/`novelidx`. The diff **does** C-home `lookup_novel` (inline fold, not `strcmpi` #3), export the existing table, wish replace `d.name`, `create_object` `oname` then void lookup. It **does not** port `'o'` getobj `"call"`, `Death_quote`, or mksobj `oname(noveltitle, ONAME_NO_FLAGS)`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `lookup_novel` | C `:1626–1661`, **LIVE this SHA** | `int *idx` → `otmp.novelidx` |
| `sir_Terry_novels` | C `:1591–1608`, **LIVE** | export `SIR_TERRY_NOVELS` mkobj.js |
| `NVL_*` | C `:1604–1608`, **CLONE** (const) | 0/4/17/27/33 |
| `The` | C objnam.c `:2233–2240`, **LIVE** | dothrow/mthrowu clones — **do not add #3** |
| `oname` | C do_name.c, **LIVE** | wish `ONAME_WISH`; lua `ONAME_LEVEL_DEF` |
| `noveltitle` | C `:1610–1623`, **LIVE** | not re-ported |
| `readobjnam` SPE_NOVEL | C `:5355–5358`, **LIVE this SHA** | |
| `create_object` named | C `:2266–2271`, **LIVE this SHA** | |
| `strcmpi` | C, **CLONE** inline `eq` | vault/write still #2 — **do not add #3** |
| `'o'` getobj `"call"` | C docallcmd, **OMIT named** | |
| mksobj `oname(noveltitle)` | C mkobj.c `:1248`, **OMIT named** | |

`node scripts/csym.mjs lookup_novel` → `do_name.c:1626-1661`. `noveltitle` → `:1610-1623`. `The` → `objnam.c:2233-2240`. `--callers lookup_novel`: `:5357`, `sp_lev.c:2270`. `--callers The`: includes `do_name.c:1637/:1643/:1650`. `--callers noveltitle`: `mkobj.c:1248`. `--callers create_object`: `sp_lev.c:3735`. `IndexOk` `hack.h:1498–1499` `(idx)>=0 && (idx)<SIZE`.

RNG: none in `lookup_novel`. `noveltitle` `rn2` unchanged. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
lookup_novel     js/do_name.js:966   sync
noveltitle       js/mkobj.js:1643   sync
The              js/objnam.js:1363   sync
             !! ALSO 2 LOCAL CLONE(S) in 2 files — js/dothrow.js:431  js/mthrowu.js:621
oname            js/do_name.js:919   sync
SIR_TERRY_NOVELS js/mkobj.js:1628   sync   export const
strcmpi          NOT EXPORTED — 2 LOCAL js/vault.js:93  js/write.js:77
```

`--can do_name.js mkobj.js SIR_TERRY_NOVELS`: ALREADY. `--can do_name.js objnam.js The`: ALREADY. `--can mklev.js do_name.js lookup_novel`: ALREADY. `--can readobjnam.js do_name.js lookup_novel`: ALREADY. Do **not** stamp “cycle-forced clone.” Do **not** write `strcmpi` #3. Do **not** add `The` #3.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

Aliases. C `The(lookname)` vs `"The Color of Magic"` / `"The Amazing Maurice"`; bare `"Sorcery"` / `"Masquerade"` / `"Thud"`; then rebind `lookname` to `sir_Terry_novels[NVL_*]`. JS the same five, NVL 0/4/17/27/33 **Match `:1604–1608`.** Table strings **Match `:1591–1603`** (Colour, Sourcery, Maskerade, Amazing Maurice…, Thud!).

Walk. C `strcmpi` vs table or `The(lookname)`; store `*idx=k`; return canonical. JS `eq` (case-fold, not `strcmpi` #3); `otmp.novelidx = k`. **Match `:1648–1654`.**

Miss. C `idx && IndexOk(*idx)` return `novels[*idx]` else NULL. JS if `otmp` and `0 <= novelidx < length` return that title else `null`. **Match `:1656–1659`** (`hack.h` IndexOk). Wish after `mksobj` SPE_NOVEL already has a `noveltitle` index, so a garbage name still becomes that title. **Match C.**

`readobjnam` `:5355–5358`. After artifact_name, if SPE_NOVEL and lookup non-null, `d.name = novelname`; then `oname(..., ONAME_WISH)`. JS the same order. **Match.**

`create_object` `:2266–2271`. After `set_corpsenm`, `oname(..., ONAME_LEVEL_DEF)` then `(void) lookup_novel(o->name.str, &novelidx)`. JS `o.name` string or `.str`; then lookup. **Match the call.** Named omits after eroded still named.

Callee closure (both callers). LIVE: `The`, `oname`, `SIR_TERRY_NOVELS`, `lookup_novel`. CLONE: NVL consts; inline `eq`. OMIT named: `'o'` getobj; mksobj `oname(noveltitle)`. STUB: **none**. Combined-arm ships. Not “dispatch ported, callee stubbed.” `noveltitle` stays the random picker, not a stub of lookup.

## Hallucinations / overclaim

Subject wish + lua named novels canonical + novelidx: **true.** D-log inline fold not strcmpi #3: **true.** Do **not** stamp “Match C `'o'` getobj.” Do **not** stamp “Match C mksobj `oname(noveltitle, ONAME_NO_FLAGS)`.” Do **not** stamp “Match C `Death_quote`.” Public wish SPE_NOVEL is **public-unhit**. Fortress does not prove `Color of Magic` → Colour.

## Density

+73: C 36 + two call sites + export. §2b one `lookup_novel` family after D-1633. Did not glue `'o'`. Above a one-`if` peel; C is that small.

## Verification

Wired: five aliases; walk; IndexOk miss; wish; lua oname. Unwired C: `'o'`; mksobj oname wrapper. Conf: no `rn2` here. No seed gate.

D-log green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for novel wish. Fortress does not prove `create_object` `o.name`.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): `'o'` getobj `"call"`; mksobj SPE_NOVEL `oname(noveltitle, ONAME_NO_FLAGS)`; `Death_quote` / `u_have_novel` (next Open). Do **not** add `strcmpi` #3. Do **not** add `The` #3. Do **not** duplicate `SIR_TERRY_NOVELS`. Do **not** re-port `read_tribute` (D-1633). Do **not** re-port `dooverview` (D-1650).

Verdict: **ACCEPT-WITH-DEBT**
