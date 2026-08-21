# Review 319 — 0be5135b — objnam.c the()/CapitalMon (D-1357)

## Metadata
- Full / short hash: `0be5135bb967930eefc85183450f972125b1deaf` / `0be5135b`
- Parent: `6fd45ec4` (D-1356). This file audits **this SHA only**. Archive **Addressed:** D-1357 `0be5135b` already has the short hash (filled by D-1358). Journal rotate in this SHA.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 11:36:54 +0200
- D-id: **D-1357**
- Stats: 10 files, +312 / −148 — `js/objnam.js` +148 / −38 (`CapitalMon` / `init_CapMons` / rewrite `the()`).
- Claims to close: Open `objnam.c` `the()` CapitalMon (named from D-1335 / reviews **297** / **308**). Not warn_obj. `reviews/loop-2026-08-15/` has no unpaid article Must-fix.
- JS / map: `objnam.js` `the` / `CapitalMon` / `init_CapMons`; `the_unique_pm` already in this file; hallu names from embedded `BOGUSMON_BUF` (no fs); `c-js-map/turns.md`. fruit_from_name + artifact_name still named (invent cycle).
- Prior reviews this SHA claims to close: **297** / D-1335 named CapitalMon inside `killer_xname`’s article gate; **308** listed it again.

## Intent vs deliverable

Git subject promises: “Match C objnam.c the()/CapitalMon so capitalized type and title names (Oracle, Archon) get "the", instead of looking like personal names.”

C `the()` (`objnam.c:2171–2231`): already-`the ` → lowc first char; else lowercase **or** `CapitalMon` **or** fruit-and-not-artifact → insert; else last space/hyphen lowercase next → insert unless apostrophe; else first-space `<` last sep and `" of "` / named / PYEC.

C `CapitalMon` (`rumors.c:791–822`) + `init_CapMons` (`:829–935`): skip `G_UNIQ && !the_unique_pm`; collect capitalized `pmnames`; then bogusmon lines with `!bogon_is_pname` (`do_name.c:1415–1419`: `-+=` personal, `_|` type).

Old JS: capitalized names without a lowercase last space/hyphen segment returned bare; `" of "` used `lastIndexOf(' ')` so `"Amulet of Yendor"` / `"Staff of Aesculapius"` missed the article.

The diff **does** port `CapitalMon`/`init_CapMons` from mons[] + `BOGUSMON_BUF` (extractor already drops the plaintext don’t-edit header; Rule #2) and rewrite `the()` to C order including first-space `" of "` and PYEC. It does **not** call `fruit_from_name` / `artifact_name`. Named (cycle).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `the()` | C `:2171–2231`, **wired** | already-the / CapitalMon / last-sep / first-space of / PYEC |
| `CapitalMon` | C `rumors.c:791–822`, **wired export** | prefix + space/`'`/end; case-sensitive |
| `init_CapMons` | C `:829–935`, **wired** | one-pass JS list; C two-pass alloc |
| `the_unique_pm` | C `:1121–1139`, **pre-existing live** | skip pname uniques; force Wizard |
| `xcrypt_objnam` | C `hacklib.c:400–415`, **clone** | same involution as `rumors.js` |
| `unpadline_objnam` | C `rumors.c:67`, **clone** | strip trailing `_` |
| `bogon_is_pname_objnam` | C `do_name.c:1415`, **clone** | `-+='` personal |
| `BOGON_CODES` | C `do_name.c:1365` `"-_+|="`, **wired const** | |
| `BOGUSMON_BUF` | C `dat/bogusmon.txt` via makedefs, **embedded** | D-0477; no `fs` |
| fruit_from_name + artifact_name | C `:2188–2193`, **named omit** | invent cycle |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean (`BOGUSMON_BUF` is generated embed, not runtime filesystem). **New gameplay RNG:** none.

## C ↔ JS fidelity

Already-`the `: C `strncmpi` + `lowc(*str)` + rest. JS lowercases only the first ASCII letter. `"THE Foo"` → `"tHE Foo"` in both (old JS forced `"the Foo"`). Match `:2181–2184`.

Insert gate: `c0` not A–Z **or** `CapitalMon(str)`. Fruit conjunct omitted, so a capitalized player fruit that is not in CapMons stays bare unless a later arm fires. Named. Oracle/Archon/Green-elf/Wizard-of-Yendor titles: `the_unique_pm` true, capitalized, in CapMons, insert. Medusa: `M2_PNAME` → `the_unique_pm` false → skipped in `init_CapMons` → bare. Match C comment at `rumors.c:784–788`.

Last space-or-hyphen: C `strrchr` space else hyphen; lowercase next → insert unless `'`. Apostrophe Unique’s corpse stays bare when CapitalMon missed the Unique. Match `:2203–2208`. `" of "` uses **first** space `< tmp` (`strchr` vs JS `indexOf`), then `strstri " of "` before named/called. Old last-space bug is gone. PYEC last-31 strcmp when no named. Match `:2209–2223`.

`CapitalMon` prefix: `strncmp` + next NUL/space/`'`. `"Archon's corpse"` hits Archon+`'`. `"Foobar"` does not match Foo. Match `:817–819`. `init_CapMons` hallu: skip header (embed), xcrypt+unpad, strip bogon code, keep capitalized **types** (`!bogon_is_pname`). C `bogon_codes` includes `_|=` strip codes that are **not** pname; JS same `BOGON_CODES`. Match `:885–894`.

`xcrypt` clone matches `rumors.js` / `hacklib.c` bit-for-bit (bitmask 1..16, toggle 32\|64). Not a broken cipher. CapMons mons[] count 27 is C’s own comment (`rumors.c:788`).

Hallucination check: “Match C `the()`” while **fruit_from_name is omitted** is an overclaim on **capitalized player fruit**. The **CapitalMon + first-space `" of "`** path is live, not a stub that still returns `"Oracle"`. Do **not** stamp “Match C fruit carve.” Do **not** stamp “Match C `artifact_name`.”

## Hallucinations / overclaim

Subject says Oracle/Archon get `"the "` instead of looking like personal names. **True via CapMons.** Medusa stays bare. AoY/Staff `" of "` now insert from the first-space arm. PYEC special-case is wired. Fruit carve still named. Stamping **Addressed:** D-1357 for CapitalMon + `the()` order is fair. Do **not** treat fortress PASS as an `"the Oracle"` topline.

## Density

One C function plus its rumors.c helper and the hallu table it reads. ~148 lines. Playbook §2b caller/callee cluster. Did not glue `see_monsters` warn_obj (different function). Acceptable. Slightly dense (xcrypt clone duplicated from `rumors.js`) but no extra subsystem.

## Branch-by-branch confirm

1. `"Oracle"` / `"Archon"` / `"Green-elf"`: CapitalMon, `"the …"`. Match `:2186–2195`.
2. `"Medusa"`: not in CapMons, bare. Match pname skip `:854`.
3. `"Archon's corpse"`: CapitalMon via `'`. Match `:818`.
4. `"Medusa's corpse"`: no CapitalMon, apostrophe blocks last-sep insert. Match `:2208`.
5. `"Amulet of Yendor"` / `"Staff of Aesculapius"`: first-space `" of "`. Match `:2217–2218`.
6. `"Excalibur"`: capitalized, not CapMons, no space, bare. Match else.
7. already `"the foo"` / `"The foo"`: lowc first. Match `:2181–2184`.
8. `"Platinum Yendorian Express Card"`: PYEC tail. Match `:2220–2223`.
9. Capitalized fruit not in CapMons: JS may omit `"the "`. Named fruit.
10. **Public-unhit** unless a session names a capitalized type via `the()`.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Embed via `js/generated/bogusmon_data.js` (D-0477). Plain ESM. `xcrypt` is an involution clone, not a filesystem read of `dat/bogusmon.txt`.

## Verification

Journal: private canary **26**/26; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** on Oracle/Archon articles. This audit cadence: full `sessions` at HEAD `fbfc72d9` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `37+0.32/turn` (R² 0.85). I did not re-run the private canary. Fortress PASS is not `"the Oracle"`.

## Actionable C-wrongs

None for Must-fix. `CapitalMon` matches `:791–822`. `init_CapMons` matches `:852–894` given the embed. `the()` matches `:2171–2231` except the **named** fruit/artifact conjunct. `the_unique_pm` is the C callee in this file, not a glyph stand-in. `xcrypt` matches C.

Named omits (map, not Must-fix):

1. `fruit_from_name` + `artifact_name` fruit carve (`:2188–2193`)
2. warn_obj `see_monsters` cnt / SPFX_WARN / ARMOR `:1412` (other Open)

Do not Must-fix “Medusa should get `the `” (C `the_unique_pm` false for pname). Do not Must-fix “skip PYEC” (C `:2220–2223`). Do not Must-fix “import `artifact.js`” as a Keep of this SHA (named cycle).

## Callers / RNG ledger

C/JS `the()` / `CapitalMon`: no RNG. `killer_xname` article gate now sees CapitalMon. Public fortress is not an Oracle corpse killer string.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: type/title CapMons and first-space `" of "` now insert `"the "`; fruit/artifact carve stays named.
- Must-fix stays empty for this SHA.
