# Review 297 — 31d32cad — objnam.c killer_xname (dokick kickobjnam) (D-1335)

## Metadata
- Full / short hash: `31d32cadd84be4a1b128aa19abe7a0cea64b3498` / `31d32cad`
- Parent: `487daa2f` (D-1334). This file audits **this SHA only**. Archive **Addressed:** D-1335 `31d32cad` already has the short hash (filled by D-1336).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 04:19:02 +0200
- D-id: **D-1335**
- Stats: 10 files, +206 / −33 — `js/objnam.js` +109; `js/dokick.js` +14 / −6.
- Claims to close: Open `dokick.c` `killer_xname` (kickobjnam still `xname`; named from D-1334 / review **295**). Not `special_dmgval`. `reviews/loop-2026-08-15/` has no unpaid killer_xname Must-fix.
- JS / map: `objnam.js` `killer_xname`; callers `dokick.js` `kick_object` `:498` + petrify `:551–554`; `c-js-map/turns.md`. `kickstr` still named. Remaining eat/zap/dothrow callers named.
- Prior reviews this SHA claims to close: **295** named `killer_xname` after throwit land; **287** named kickobjnam still `xname` after dokick snuff.

## Intent vs deliverable

Git subject promises: “Match C objnam.c killer_xname so a kicked object's death or petrify name is fully identified with article, instead of storing bare xname in kickobjnam.”

C `killer_xname` (`objnam.c:1942–2005`):

```
    if (obj->oartifact)
        return bare_artifactname(obj);
    save_obj = *obj;
    … known=dknown=1; bknown=rknown=greased=0;
    if (otyp != POT_WATER) blessed=cursed=0; else bknown=1;
    opoisoned=0; strip oname unless artifact;
    objects[].oc_name_known=1; oc_uname=0;
    buf = CORPSE ? corpse_xname(..., CXN_NORMAL)
        : SLIME_MOLD ? "deadly slime mold%s" : xname(obj);
    if (quan==1 && !strstri("'s ") && !strstri("s' "))
        buf = (obj_is_pname || the_unique_obj) ? the(buf) : an(buf);
    restore objects[] + *obj = save_obj;
```

`bare_artifactname` (`:2502–2514`): `artiname`, `"The "` → `'t'`. Callers `dokick.c` `kick_object` `:498` `Strcpy(kickobjnam, killer_xname(gk.kickedobj))` and petrify `:551–554` `"kicking %s barefoot"`. `kickstr` (`:793`) still prefixes `"kicking "` for `kick_ouch` and is **not** this function.

Old JS: `kickobjnam.value = xname(...)`; petrify `` `kicking ${cxname(kicked)} barefoot` ``.

The diff **does** port `killer_xname` and wire both dokick sites. It does **not** port `kickstr`. It does **not** rewire eat choke / zap `zapyourself` / dothrow `throwit` `losehp`. Named. Local `bare_artifactname_objnam` so objnam does not import artifact.js (invent cycle).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `killer_xname` | C `:1942–2005`, **wired** | new export |
| `bare_artifactname_objnam` | C `:2502–2514`, **clone** | `artilistRaw[a].name`; `"The "` → `the ` |
| `strstri_objnam` | C `hacklib.c` `strstri`, **clone** | case-insensitive `includes` |
| `corpse_xname` | C, **imported live** | `CXN_NORMAL` |
| `xname` / `an` / `the` | C, **imported live** | article after format |
| `obj_is_pname` / `the_unique_obj` | C, **imported live** | article gate |
| `has_oname` / `ONAME` | C macros, **imported live** | `const.js` |
| `kick_object` `:498` | C, **wired** | was `xname` |
| petrify `:551–554` | C, **wired** | was `cxname` |
| `kickstr` | C `:793`, **named omit** | `kick_ouch` still raw `kickobjnam` |
| eat/zap/dothrow callers | C, **named omit** | |
| `the()` CapitalMon | C `the()`, **named omit** | D-log: AoY may omit `"the "` |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new gameplay RNG.** Format-only; restore walks `objects()` + the object fields this helper mutates.

## C ↔ JS fidelity

Artifact bypass returns `bare_artifactname` without twiddling. `artilistRaw` is 0-indexed dummy then `ART_EXCALIBUR=1` … `NROFARTIFACTS=33`. `"The Orb of Detection"` → `the Orb of Detection` via `name.slice(0,4)==='The '` (C `strncmp` + `lowc` of first char). `"Excalibur"` unchanged. Match `:2506–2513`.

Non-artifact: force known/dknown, clear BUC/poison/grease/rknown, keep holy/unholy water (`POT_WATER` keeps blessed/cursed and sets `bknown`), strip user `oname`, set `oc_name_known` and clear `oc_uname`. CORPSE → `corpse_xname(CXN_NORMAL)`; SLIME_MOLD → `deadly slime mold` + `s` when `quan!=1` (C `plur(quan)`); else `xname`. Article iff `quan==1` and the buffer has no `"s "` / `"s' "` possessive; `the` vs `an` from `obj_is_pname || the_unique_obj`. Restore type-name flags and the saved object fields. That is `:1959–2002` field-for-field for the fields this helper writes.

C restores with `*obj = save_obj` (full struct). JS saves known/dknown/bknown/rknown/greased/blessed/cursed/opoisoned/next_boulder/oname. `xname` / `corpse_xname` do not allocate a new `oextra` here; oname is nulled and restored in place. Priest `bknown` toggle inside `xname` (C comment at `:1964`) still affects the **formatted** `buf`, then both restore the object. Not a live-path miss for kickobjnam.

`kick_object` now copies `killer_xname` into `kickobjnam` before `really_kick_object`. Petrify formats `"kicking ${killer_xname(kicked)} barefoot"`. Match `:498` and `:551–554`.

`kick_ouch` still `losehp(..., kickobjnam || 'a wall', KILLED_BY)` — C `kickstr` prefixes `"kicking "` onto that name. Named. Hallucination check for “Match C dispatch, callee is a stub” is clean: `killer_xname` **is** the callee; `xname` / `corpse_xname` / `an` / `the` are live. `bare_artifactname_objnam` is a clone of C `bare_artifactname` from the same `artilist` names, not a stub that returns `xname` for artifacts.

This is **not** “Match C `kickstr`.” The subject’s kickobjnam / petrify claim is the two wired sites.

## Hallucinations / overclaim

Subject + D-1335 say a kicked object’s death or petrify name is fully identified with article instead of bare `xname`. **The helper plus those two dokick sites are the hunk.** Stamping **Addressed:** D-1335 is fair. Do **not** stamp “Match C `kickstr` / `kick_ouch` `'kicking '` prefix.” Do **not** stamp “Match C eat choke / zap `zapyourself` / dothrow `throwit` `losehp` `killer_xname`.” Do **not** stamp “Match C `the()` CapitalMon unique.” Do **not** treat fortress PASS as a kicked-corpse killer string.

## Density

One C function plus its two queued dokick callers. ~100 executable JS lines in `objnam.js` + two call-site swaps. Playbook §2b cluster. Did not glue `maybe_mnexto` or `splash_lit`. Remaining eat/zap/dothrow callers named as separate Open rows. Acceptable size.

## Branch-by-branch confirm

1. Ordinary dart, `quan==1`: force ID, `an(xname)` → `"a dart"`, restore. Match `:1992–1996`.
2. Named non-artifact: oname stripped; no `" named Foo"`. Match `:1973–1975`.
3. Wand: `oc_name_known` then restore; death name is the type, not `"wand called bar"`. Match `:1977–1980`.
4. Slime mold: `"deadly slime mold"` / `"deadly slime molds"`. Match `:1985–1990`.
5. Newt / cockatrice corpse: `corpse_xname(CXN_NORMAL)` + article. Match `:1983–1984`.
6. Holy water: keep BUC, `bknown=1`. Match `:1965–1968`.
7. Excalibur: `bare_artifactname` `"Excalibur"`. Match `:1949–1950`.
8. Orb of Detection: `"the Orb of Detection"`. Match `:2509–2510`.
9. Poisoned weapon: `opoisoned` cleared so the name is not `"poisoned …"`. Match `:1969–1972`.
10. Petrify barefoot: `"kicking "+killer_xname+" barefoot"`. Match `:551–554`.
11. `kickstr` / eat / zap / dothrow. Still omitted. Named.
12. **Public-unhit** unless a session dies to a kicked object / cockatrice corpse kick.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `artilistRaw` is generated data already in `js/generated/`, not a filesystem read. Plain ESM. Local `bare_artifactname` is a cycle break, not a second naming theory.

## Verification

Journal: private canary **29**/29; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** on kick-death strings. Cadence this audit: full `sessions` at HEAD `2bd70a77` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `36+0.30/turn` (R² 0.84). I did not re-run the private canary. Fortress PASS is not evidence `kickobjnam` held `"a dart"`.

## Actionable C-wrongs

None for Must-fix. The two dokick sites call the live helper; artifact / corpse / slime / article / restore match C `:1942–2005` given named `kickstr` / `the()` CapitalMon.

Named omits (map, not Must-fix):

1. `kickstr` (`dokick.c:793` — `kick_ouch` still raw `kickobjnam`)
2. eat choke `killer_xname` (remaining caller)
3. zap `zapyourself` `killer_xname`
4. dothrow `throwit` `losehp` `killer_xname` (C `:1747`)
5. `the()` CapitalMon unique (AoY)

Do not Must-fix “prefix `kicking ` inside `killer_xname`” (C does that in `kickstr`). Do not Must-fix full-struct `*obj = save_obj` unless a later caller proves `xname` mutates an unrestored field on this path.

## Callers / RNG ledger

C: `kick_object` `:498` + petrify `:551–554` → `killer_xname`. JS: same sites. No RNG in the helper. Public fortress is not evidence a kick death used `an(xname)`.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: kickobjnam and barefoot petrify now use `killer_xname`; `kickstr` and eat/zap/dothrow callers stay named.
- Must-fix stays empty for this SHA.
