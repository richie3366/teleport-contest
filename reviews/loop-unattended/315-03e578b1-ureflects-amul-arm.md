# Review 315 — 03e578b1 — muse.c ureflects W_AMUL/W_ARM/dragon (D-1353)

## Metadata
- Full / short hash: `03e578b1b37630aacd469418cf20fb3a6690908d` / `03e578b1`
- Parent: `160de986` (D-1352). This file audits **this SHA only**. Archive **Addressed:** D-1353 `03e578b1` already has the short hash (filled by D-1354).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 10:19:23 +0200
- D-id: **D-1353**
- Stats: 12 files, +130 / −90 — `js/mhitu.js` +17 / −6 (export `ureflects`, OR uprops extrinsic, `Reflecting` otyp/form); `js/zap.js` +56 / −56 (delete local clone, import, expand `Reflecting`); `js/pray.js` +47 / −34 (same).
- Claims to close: Open `zap.c` `ureflects` W_AMUL/W_ARM/dragon (named from D-1342 / review **304**). Not W_WEP. `reviews/loop-2026-08-15/` has no unpaid ureflects Must-fix.
- JS / map: shared `mhitu.js` `ureflects`; zap dobuzz + pray `god_zaps_you` callers; `c-js-map/data.md` + `turns.md`. mcastu caller / setworn `EReflecting` flat / cspfx still named.
- Prior reviews this SHA claims to close: **304** / D-1342 named zap/pray W_AMUL after W_WEP; **314** follow-up queued this Open row.

## Intent vs deliverable

Git subject promises: “Match C muse.c ureflects so a worn amulet of reflection, silver dragon armor, or silver-dragon form actually names that slot when a ray bounces, instead of stopping after shield/weapon.”

C `ureflects` (`muse.c:2836–2866`), outermost to innermost:

```
    if (EReflecting & W_ARMS) { pline(fmt,str,"shield"); makeknown(SoR); }
    else if (EReflecting & W_WEP) { pline(fmt,str,"weapon"); }
    else if (EReflecting & W_AMUL) { pline(fmt,str,"medallion"); makeknown(AoR); }
    else if (EReflecting & W_ARM) { pline(fmt,str, uskin?"luster":"armor"); }
    else if (youmonst.data == &mons[PM_SILVER_DRAGON]) { pline(fmt,str,"scales"); }
    return FALSE;
```

`EReflecting` is `u.uprops[REFLECTING].extrinsic` (`youprop.h:380`). Bounce **gate** is C `Reflecting` = `H\|\|E` (`:381`); poly silver dragon sets `HReflecting` via `polyself.c:106` `PROPSET`. Worn AoR/DSM confer bits in `worn.c`.

Old JS: zap/pray **clones** stopped after shield otyp + `EReflecting&W_WEP` (D-1342). mhitu already had the full chain with otyp fallbacks.

The diff **does** export mhitu `ureflects` (`er = EReflecting | uprops.extrinsic`), delete the zap/pray clones, import the shared function, and expand zap/pray `Reflecting()` with uprops + AoR + silver DSM/scales + silver-dragon form. It does **not** wire `mcastu`. Named. It does **not** make `confer_oc_oprop` write `EReflecting`. Named — otyp fallbacks stand in.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `ureflects` mhitu | C `:2836–2866`, **wired export** | sprintf2 like C `pline(fmt,str,what)` |
| zap local `ureflects` | C same, **deleted clone** | now imports mhitu |
| pray local `ureflects` | C same, **deleted clone** | now imports mhitu |
| W_AMUL / W_ARM / scales | C `:2850–2864`, **wired** | medallion+makeknown; uskin luster; silver form |
| `Reflecting()` zap/pray/mhitu | C `youprop.h:381`, **clones** | H\|\|E plus otyp/form while conferral named |
| `makeknown` SoR/AoR | C `:2842` / `:2853`, **wired** | not on weapon/armor/scales |
| mcastu `ureflects` | C other caller, **named omit** | `mcastu.js` has no import |
| `PROPSET(REFLECTING)` | C `polyself.c:106`, **named omit** | form mndx fallback on `Reflecting()` |
| `confer_oc_oprop` EReflecting | C `worn.c:611`, **named omit** | otyp fallback |
| chromatic in `ureflects` | C omits (mon_reflects only) | JS ureflects silver only — match |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** none.

## C ↔ JS fidelity

Identity chain matches `:2839–2864` order: ARMS → WEP → AMUL → ARM → silver-dragon data. Outermost wins. `fmt && str` then `sprintf2` then `makeknown` only when `known>=0` (shield/amulet). Match. Chromatic form is **not** in C `ureflects`; JS same. `uskin` chooses `"luster"` vs `"armor"` on the W_ARM arm. Match `:2856–2858`.

Zap caller `ureflects('But %s reflects from your %s!', 'it')` is the C dobuzz fmt (`zap.c` ~4964-area). Shared `sprintf2` → `"But it reflects from your medallion!"` instead of the old hardcoded shield string. More faithful than D-1342’s clone. Pray `'%s reflects from your %s.', 'It'` → `"It reflects from your armor."` Match `god_zaps_you`.

`er` ORs `u.EReflecting` with `uprops[REFLECTING].extrinsic`. C is one lvalue. When D-1342 conferral wrote both, either bit is enough. When only uprops is set, JS still names the slot. Not a stub.

`Reflecting()` clones are **not** the C macro. They add worn otyp + silver form so the bounce gate fires while `confer_oc_oprop` / `PROPSET` stay named. That is conferral debt, the same pattern review **304** already accepted for shield otyp. After this SHA the three clones agree with each other (AoR/DSM/form). They still diverge from C source text (`H\|\|E` only) — named conferral, not a Must-fix of `ureflects` itself.

Hallucination check: “Match C `ureflects`” while **mcastu never calls it** is an overclaim on that caller. The **function body** matches `:2836–2866` including AMUL/ARM/scales. Zap/pray dispatch is the real export, not a stub that still only names shield. Do **not** stamp “Match C `mcastu` `ureflects`.” Do **not** stamp “Match C `worn.c` `EReflecting` conferral.”

## Hallucinations / overclaim

Subject says a worn AoR, silver DSM, or silver-dragon form names that slot when a ray bounces. **True for zap dobuzz and pray `god_zaps_you` when `Reflecting()` is true and `ureflects` runs (Blind zap uses the other pline, same as C).** False until named for mcastu. Production bounce without conferral depends on the otyp/`mndx` fallbacks — honest in the D-log. Stamping **Addressed:** D-1353 for the identity arms is fair. Do **not** treat fortress PASS as a `"medallion"` bounce (seed0002 Healer is shield).

## Density

One C function plus the two clones that were skipping its later arms. ~70 lines net across modules that already called each other. Playbook §2b (caller/callee cluster). Did not glue `dmgval` shade. Acceptable.

## Branch-by-branch confirm

1. Shield bit/otyp: `"shield"` + `makeknown`. Match `:2839–2843`.
2. W_WEP only: `"weapon"`, no makeknown. Match `:2845–2848`.
3. W_AMUL bit or AoR otyp: `"medallion"` + `makeknown`. Match `:2850–2854`.
4. W_ARM / silver DSM: `"armor"`; `uskin` → `"luster"`. Match `:2856–2858`.
5. Silver-dragon form, no worn: `"scales"`. Match `:2860–2862`.
6. Chromatic form: ureflects false (C same). Match.
7. Gray DSM: no W_ARM fallback. Match conferral types.
8. Outermost shield beats amulet. Match if-else.
9. `fmt` null: return true, no pline. Match `if (fmt && str)`.
10. mcastu: still no call. Named.
11. **Public-unhit** on AoR/DSM/form identity unless a session bounces those slots.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Otyp fallbacks are conferral stand-ins, not seed-shaped strings. Plain ESM.

## Verification

Journal: private canary **20**/20; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** on AMUL/ARM/scales identity (Healer seed0002 is shield). This audit cadence: full `sessions` at HEAD `6570ddba` **44**/44 Scr **11,405** RNG 100% speed `37+0.31/turn`. I did not re-run the private canary. Fortress PASS is not a medallion pline.

## Actionable C-wrongs

None for Must-fix. Shared `ureflects` matches C `:2836–2866` branch-for-branch (order, nouns, `makeknown` slots, silver not chromatic). Deleting zap/pray clones removes the D-1342 hardcoded-fmt drift. `Reflecting()` otyp/form extras are named conferral clones, not a `ureflects` that names the wrong slot when bits are set.

Named omits (map, not Must-fix):

1. mcastu / uhitm-passive `ureflects` callers
2. `worn.c` / `confer_oc_oprop` → `EReflecting`
3. `polyself.c` `PROPSET(REFLECTING)`
4. cspfx extract (no artilist row has `cspfx&SPFX_REFLECT`)
5. Keep the three `Reflecting()` clones in sync if conferral ships

Do not Must-fix “ureflects should name chromatic scales” (C `mon_reflects` only). Do not Must-fix “makeknown on armor” (C does not). Do not Must-fix “bounce gate must ignore otyp” while conferral is named (would un-bounce worn AoR).

## Callers / RNG ledger

C: dobuzz / `god_zaps_you` `Reflecting()` then `ureflects` (no RNG). JS: same two callers now share the C body. Public fortress hits shield (seed0002), not AMUL/ARM/form.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: zap/pray now share C `ureflects` AMUL/ARM/scales; mcastu and real `EReflecting` conferral stay named.
- Must-fix stays empty for this SHA.
