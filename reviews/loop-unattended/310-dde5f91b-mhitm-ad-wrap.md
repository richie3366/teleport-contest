# Review 310 — dde5f91b — uhitm.c mhitm_ad_wrap you-as-agr (D-1348)

## Metadata
- Full / short hash: `dde5f91b2ddc534b4f3e08b4d2297a0a69a83dcf` / `dde5f91b`
- Parent: `1651816e` (D-1347). This file audits **this SHA only**. Archive **Addressed:** D-1348 `dde5f91b` already has the short hash (filled by D-1349).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 07:56:56 +0200
- D-id: **D-1348**
- Stats: 12 files, +256 / −131 — `js/uhitm.js` +75 / −7; `js/mhitu.js` comment-only. Journal rotate in this SHA.
- Claims to close: Open `uhitm.c` `m_slips_free` AD_WRAP (uhitm you-as-agr; named from D-1331 / review **293**). Not mhitu wrap. `reviews/loop-2026-08-15/` has no unpaid wrap Must-fix.
- JS / map: `uhitm.js` `mhitm_ad_wrap` + `damageum_adtyping` `AD_WRAP`; callee `m_slips_free` D-1307; `c-js-map/turns.md` + `debt.md`. mhitm brush still named.
- Prior reviews this SHA claims to close: **293** named the uhitm arm after mhitu `mhitm_ad_wrap_u`; **269** / D-1307 shipped `m_slips_free` with no wrap caller.

## Intent vs deliverable

Git subject promises: “Match C uhitm.c mhitm_ad_wrap so a poly'd eel/python wrap actually slips, grabs, drowns, or brushes, instead of skipping AD_WRAP in damageum.”

C `mhitm_ad_wrap` uhitm arm (`uhitm.c:3344–3375`) after `coil = slithy(pa) && (S_SNAKE || S_NAGA)`:

```
    if (magr == &gy.youmonst) {
        if (!sticks(pd)) {
            boolean tailmiss = !gn.notonhead;
            if (!u.ustuck && !tailmiss && !rn2(10)) {
                if (m_slips_free(mdef, mattk)) mhm->damage = 0;
                else { You("%s yourself around %s!", coil?"coil":"swing", …);
                       set_ustuck(mdef); }
            } else if (u.ustuck == mdef && !tailmiss) {
                if (is_pool(u.ux,u.uy) && !cant_drown(pd)) { drown; damage=mhp; }
                else if (mattk->aatyp == AT_HUGS) crush pline;
            } else { damage=0; verbose coil-or-tail/LEG brush; }
        } else damage=0;
```

C mhitu arm `:3376–3417` is D-1331 (`mhitm_ad_wrap_u`). C mhitm brush `:3418+` still named.

Old JS: `damageum_adtyping` PHYS/POLY/DRIN only. `m_slips_free` live with no wrap caller.

The diff **does** add `mhitm_ad_wrap` (early-return unless `magr===youmonst`) and wire `AD_WRAP` in `damageum_adtyping`. It does **not** port the mhitm brush arm. Named. Comment-only mhitu.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `mhitm_ad_wrap` uhitm arm | C `:3344–3375`, **wired** | new export; mhitu/mhitm **not** in this function |
| `damageum_adtyping` `AD_WRAP` | C `mhitm_adtyping` via `damageum`, **wired** | |
| `m_slips_free` | C `:2053–2093`, **imported live** | D-1307; wrap verb `"slip off of"` |
| `sticks` | C `mondata.c:654–658`, **clone** | `dmgtype(STCK) \|\| (WRAP && !AT_ENGL) \|\| AT_HUGS` — **all slots**, matches C `dmgtype`/`attacktype` |
| `cant_drown` | C `mondata.h:28`, **clone** | `is_swimmer \|\| amphibious \|\| breathless` — **imported live** macros |
| `slithy` | C `mondata.h:67`, **imported live** | `M1_SLITHY` |
| `mlet === 'S_SNAKE'` | C `S_SNAKE` char, **port token** | JS mlet is the `S_*` string everywhere; same as D-1331 mhitu |
| `set_ustuck` | C `mon.c:3421–3435`, **clone** | botl + `u.ustuck`; clear swallow on null; skips C sanity `impossible` |
| `s_suffix` | C `hacklib.c`, **clone** | pre-existing local |
| `mbodypart` | C, **imported live** | `polyself.js` |
| `is_pool` | C, **imported live** | `hack.js` |
| mhitm brush | C `:3418+`, **named omit** | `some_mon_nam` |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** `!rn2(10)` on grab (C `:3349`); `m_slips_free` may `rn2(3)` / `rn2(2)` when greased — callee already live.

## C ↔ JS fidelity

Early `if (magr !== youmonst) return` is the split clone: mhitu lives in `mhitm_ad_wrap_u` (D-1331); this SHA only implements the `magr==&youmonst` arm. `damageum_adtyping` always passes `game.youmonst`. Not a stub of the C symbol as a whole; do not call this export expecting mhitm.

`tailmiss = !game.notonhead` matches C **as written**. Grab is `!ustuck && !tailmiss && !rn2(10)` → grab only when `notonhead` is true (worm-tail / `bhitpos != mx,my`). Head hits (`notonhead` default false) never grab; they brush (or crush/drown if already stuck). `hmonas` already sets `game.notonhead` from `bhitpos` (`:2709–2711`). Match the quirk; do not “fix” it.

`sticks(pd)`: C uses `dmgtype`/`attacktype` (any `mattk[]` slot), not `mattk[0]` only. JS clone walks all slots. Match `mondata.c:656–658`. `coil`: `slithy(pa) && (S_SNAKE \|\| S_NAGA)`. Match. Messages: `You coil/swing yourself around %s!`; drown `You drown %s...` + `damage=mhp`; AT_HUGS `"%s is being crushed."` keeps leftover dice; brush zeros dice; `flags.verbose` (JS `!== false`; `jsmain` stores boolean). Match `:3353–3371`. `cant_drown` uses live `M1_SWIM` / `M1_AMPHIBIOUS` / breathless. Match `:28`. Already-held non-pool non-hugs keeps dice (no crush pline). Match.

`m_slips_free` wrap: cloak then suit then shirt; oilskin/grease; wrap verb `"slip off of"`. Live. `set_ustuck` matches C body minus debug `impossible`.

Hallucination check: “Match C `mhitm_ad_wrap`” while **mhitm brush is omitted** is an overclaim on mon→mon wrap. The **uhitm arm** matches `:3344–3375`. Callee `m_slips_free` is live, not a stub. “Grabs” is the `notonhead` true arm, not ordinary head melee. Do **not** stamp “Match C mhitm wrap.” Do **not** stamp “Match C mhitu wrap” (that is D-1331).

## Hallucinations / overclaim

Subject says a poly'd eel/python wrap actually slips, grabs, drowns, or brushes instead of skipping AD_WRAP. **True for the uhitm arm when `damageum` runs.** Grab on a normal (head) hit does **not** happen — C `tailmiss=!notonhead` forbids it; JS matches. D-1348 **Not this iter** names mhitm brush. Stamping **Addressed:** D-1348 for the you-as-agr arm is fair. Do **not** treat fortress PASS as a python coil.

## Density

One C function arm plus already-live slip callee. ~60 lines of JS. Playbook §2b right size. Did not glue mhitm brush / `abuse_dog`. Acceptable.

## Branch-by-branch confirm

1. `sticks(pd)`: zero leftover, no grab. Match `:3374–3375`.
2. Head hit (`!notonhead` → tailmiss): no grab; verbose brush (coil whole vs tail/LEG). Match.
3. `notonhead` + `!ustuck` + `!rn2(10)`: slip or coil/swing + `set_ustuck`. Match `:3349–3356`.
4. Grease/oilskin: `m_slips_free` zeros damage. Match.
5. Already-held + pool + `!cant_drown`: drown to `mhp`. Match `:3358–3361`.
6. Shark / swimmer: `cant_drown`, no drown. Match.
7. Already-held + AT_HUGS: crush pline, dice kept. Match `:3362–3363`.
8. `verbose===false`: no brush pline, still zero dice. Match.
9. mhitm: this function returns. Named.
10. **Public-unhit** unless a session polys into wrap (and usually only brushes).

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `tailmiss=!notonhead` is the C predicate, not a seed-shaped skip. Plain ESM.

## Verification

Journal: private canary **22**/22; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** on poly wrap. This audit cadence: full `sessions` at HEAD `533e732f` **44**/44 Scr **11,405** RNG 100% speed `37+0.30/turn`. I did not re-run the private canary. Fortress PASS is not a coil pline.

## Actionable C-wrongs

None for Must-fix. The uhitm arm matches C `:3344–3375` branch-for-branch including the `tailmiss=!notonhead` quirk. `sticks` clone matches C `dmgtype`/`attacktype` (not a `mattk[0]`-only wrong). mhitm brush is a named omit of a **different** arm, not a diverging clone of this one.

Named omits (map, not Must-fix):

1. mhitm wrap brush (`some_mon_nam`)
2. `set_ustuck` sanity `impossible` (debug)
3. remaining `mhitm_ad_*` in `damageum_adtyping`

Do not Must-fix “grab on head hits” (C does not). Do not Must-fix “compare `mlet` to `'S'`” (this port stores `S_SNAKE` tokens; D-1331 same). Do not Must-fix “crush should zero dice” (C keeps them).

## Callers / RNG ledger

C: `damageum` → `mhitm_adtyping` AD_WRAP → `!rn2(10)` then maybe `m_slips_free` rng. JS: same when hmonas poly-wraps. Public fortress is not that path.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: uhitm wrap is wired and matches C `tailmiss=!notonhead`; mhitm brush stays named.
- Must-fix stays empty for this SHA.
