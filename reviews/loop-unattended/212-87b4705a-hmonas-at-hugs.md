# Review 212 — 87b4705a — uhitm.c hmonas AT_HUGS (D-1250)

## Metadata
- Full / short hash: `87b4705a0e180663ca90b2779bbb00ca7f29de1b` / `87b4705a`
- Parent: `a0c40286` (reviews **208–211** + cadence **#1585**). JS parent `7f54b762` (D-1249). This file audits **this SHA only**. Archive row **Addressed:** D-1250 `87b4705a` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-19 03:23:18 +0200
- D-id: **D-1250**
- Stats: 13 files, +396 / −36 — `js/uhitm.js` +201 / −8; `js/weapon.js` +117 / −3; comment `js/mhitm.js`.
- Claims to close: Open `uhitm.c` AT_HUGS (named from D-1233 / review **195**). Not remaining `pline_mon`. `reviews/loop-2026-08-15/` has no unpaid hug Must-fix.
- JS / map: `uhitm.js` `hmonas_hugs` / `do_attack` `notonhead`; `weapon.js` `special_dmgval` / `silver_sears`; `c-js-map/data.md` / `debt.md`. AT_EXPL / AT_ENGL / altwep / `demonpet` still named at this SHA (later SHAs in this batch).
- Prior reviews this SHA claims to close: **195** named omit AT_HUGS bodies + `special_dmgval` / `failed_grab` / `do_attack` `notonhead`.

## Intent vs deliverable

Git subject promises: “Match C uhitm.c hmonas AT_HUGS so a poly'd hug can grab after two hits or crush an already-held foe, instead of skipping the slot and its passive.”

C `hmonas` AT_HUGS (`uhitm.c:5671–5759`): skip holders/swallow/`notonhead`/byhand+`uwep`/headless via `continue` (bypass passive); `wakeup`; `special_dmgval` cloak/suit/shirt or gloves+rings; shade extra-dmg vs harmlessly-through; `failed_grab`; crush if `ustuck` else grab after two hits + `set_ustuck` + `damageum`. `do_attack` (`:518–520`) sets `gn.notonhead` from `bhitpos` vs `mx/my`. Callees: `weapon.c` `special_dmgval` (`:361–431`) / `silver_sears` (`:436–466`); `mondata.c` `can_be_strangled` (`:591–618`) / `sticks` (`:653–657`); `mondata.h` `hug_throttles`; `polyself.c` `uunstick`; `mhitm.c` `failed_grab` (`:597–640`).

Old JS: `hmonas` `continue` on AT_HUGS like AT_NONE (skipped grab and passive); `do_attack` set `bhitpos` but not `notonhead`.

The diff **does** the hug body, `notonhead`, and the two weapon.c callees. It does **not** pull AT_EXPL `explum`, AT_ENGL `gulpum`, altwep, or `demonpet`. Named at this SHA.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `hmonas_hugs` | C `:5671–5759`, **new** | `continue` via `return true` |
| `hug_throttles_umon` | C `mondata.h` `:70`, **clone** | `u.umonnum === PM_ROPE_GOLEM` |
| `can_be_strangled` | C `mondata.c:591–618`, **clone** | mdef path live; hero arm unused here |
| `sticks` | C `:653–657`, **clone** | AD_STCK / WRAP&&!ENGL / AT_HUGS |
| `set_ustuck` | C `mon.c:3421–3435`, **clone** | skip sanity `impossible` |
| `uunstick` | C `polyself.c:1941–1951`, **clone** | live `pline` |
| `failed_grab_you` | C `mhitm.c:597–640`, **clone** | `some_mon_nam` tail named |
| `special_dmgval` | C `weapon.c:361–431`, **new** | **clone callee `mon_hates_silver` diverges** |
| `which_armor_magr` | C `worn.c` youmonst switch, **clone** | `u.uarm*` vs minvent |
| `silver_sears` | C `:436–466`, **new** | rings only, like C |
| `do_attack` `notonhead` | C `:518–520`, **wired** | |
| `wakeup` / `damageum` / `pline` | **imported live** | |
| AT_EXPL / AT_ENGL / altwep | **named omit** this SHA | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New RNG:** `special_dmgval` `rnd(4)` blessed + `rnd(20)` silver (C `:396–422`). Hug body itself has none. `damageum` still rolls `d` then maybe `rn2(13)` (pre-existing).

## C ↔ JS fidelity

Pinned C skip + grab (`uhitm.c:5674–5758`):

```
            boolean byhand = hug_throttles(&mons[u.umonnum]),
                    unconcerned = (byhand && !can_be_strangled(mon));
            if (sticks(mon->data) || u.uswallow || gn.notonhead
                || (byhand && (uwep || !has_head(mon->data)))) {
                if (byhand && uwep && u.ustuck
                    && !(sticks(u.ustuck->data) || u.uswallow))
                    uunstick();
                continue;
            }
            dhit = 1;
            wakeup(mon, TRUE);
            specialdmg = special_dmgval(&gy.youmonst, mon,
                                        byhand ? (W_ARMG | W_RINGL | W_RINGR)
                                               : (W_ARMC | W_ARM | W_ARMU),
                                        &silverhit);
```

JS skip predicate matches. `hug_throttles` uses `u.umonnum`, not `youmonst.data` identity (C `&mons[u.umonnum]`). `get_mattk` already returns a copy, so unconcerned `damn=damd=1` does not mutate the permonst slot (C copies onto `alt_attk`). `continue` bypasses passive. Shade / `failed_grab` / crush / two-hit grab `return false` then passive. Match those arms.

`sticks` walks `mattk` for AD_STCK / (AD_WRAP && !AT_ENGL) / AT_HUGS — same as C `dmgtype`/`attacktype`. `set_ustuck` sets `flags.botl`, `u.ustuck`, clears swallow. `uunstick` plines after clear. `failed_grab_you` always plines because magr is youmonst (C `magr == &youmonst`). Tail uses `mon_nam`+`s` regex, not `s_suffix(some_mon_nam)` — named.

**C-wrong:** C `hates_silver` (`mondata.c:524–528`) is were / `S_VAMPIRE` / demon / **`PM_SHADE`** / (`S_IMP` && not tengu). `mon_hates_silver` ORs `is_vampshifter`. JS `weapon.js` local clone is only `M2_WERE | M2_DEMON`. C’s own hug comment (`:5720–5722`) says a shade hug succeeds on blessed outer armor **or silver rings** for the choke. Blessed still works (`mon_hates_blessings` is the live `monsters.js` import: undead|demon). Silver vs shade / vampire / imp never adds `rnd(20)`, so the shade arm prints “passes harmlessly through” when C would `You hug` + `damageum`. That is not a named omit of a different function; it is a diverging clone inside the callee this SHA added for this arm.

JS does not assign outer `dhit = 1` (C `:5693`). `dhit === -1` rehumanize is D-1251; hug-only `0` vs `1` both skip it. After AT_EXPL, `!Upolyd` breaks. Latent, not this SHA’s hit-vs-miss bug.

`which_armor_magr` youmonst uses `u.uarm*` (C `which_armor` switch). Gloves present ⇒ rings skipped; no gloves ⇒ ring `rnd(20)` with the left-then-right “don’t double” rule. `silver_sears` prints only for `W_RINGL|W_RINGR` (C `magr UNUSED`). Match C’s ring-only message.

## Hallucinations / overclaim

Subject + D-1250 say grab after two hits or crush an already-held foe instead of `continue` like AT_NONE. **The hug dispatch + live `damageum`/`wakeup`/`set_ustuck` are the hunk** for ordinary foes. Stamping **Addressed:** D-1250 overclaims the **shade/silver** success rule: `special_dmgval` is not a stub, but its `mon_hates_silver` clone is not C `hates_silver`. Do **not** stamp “Match C AT_EXPL `explum`” or “Match C `gulpum`” or “Match C `hates_silver`.” This is **not** “Match C dispatch, callee is a no-op”: `damageum` is live. It **is** “Match C hug, silver-vs-shade callee is a truncated clone.”

## Density

One `hmonas` case plus the two `weapon.c` callees C actually calls from that case, plus the small `sticks`/`can_be_strangled`/`failed_grab`/`uunstick` cluster. ~200 + ~110 JS lines. Two modules that already import each other. Right size (upper bound). Did not glue AT_EXPL in this SHA.

## Branch-by-branch confirm

1. Two prior hits, not a holder: `You grab` + `set_ustuck` + `damageum`. Match.
2. Already `ustuck`: crushed/throttled + `damageum`. Match.
3. `i<2` and not held: wakeup, no grab, `sum[i]` stays MISS, passive. Match.
4. Python / other `sticks`: `continue`, no passive. Match.
5. `notonhead` / swallow: skip. Match (`do_attack` now sets the flag).
6. Rope golem + `uwep`: `uunstick` if holding a non-holder, then skip. Match.
7. Fog `unsolid` `failed_grab`: through-pline, no grab. Match (hero magr).
8. Shade, no blessed/silver: harmlessly through. Match.
9. Shade, blessed cloak: `rnd(4)` via live `mon_hates_blessings`, hit. Match.
10. Shade, silver ring, no gloves (choke): C `rnd(20)` + hit; **JS specialdmg 0, miss.** C-wrong.
11. Vampire / imp, silver armor: C silver bonus; **JS none.** Same clone.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `notonhead` is C’s bhitpos-vs-mx/my, not a recorded coordinate. Plain ESM.

## Verification

Journal: private canary **35**/35 (skip/grab/crush; owlbear ustuck; two-claw grab; python skip; notonhead; shade **no** specialdmg; fog `failed_grab`; rope-golem wield `uunstick`; `do_attack` notonhead; blessed-cloak `rnd(4)` vs **demon**); green+strict seed8000/0900; cohort **9**/9 + strict 1500/1800/0012/0004/0007/2200/0383. Canary never contradicted silver-vs-shade. **Public-unhit** unless a public session Upolyd-hugs. Cadence this audit: full `sessions` at HEAD `d384e339` **44**/44.

## Actionable C-wrongs

1. `weapon.js` `special_dmgval` local `mon_hates_silver` must match C `mondata.c` `hates_silver` + `mon_hates_silver` (`:517–528`): were, `S_VAMPIRE`, demon, `PM_SHADE`, `S_IMP` except tengu, plus `is_vampshifter`. Replace the `M2_WERE|M2_DEMON` clone (one function). Do not pull AT_ENGL. **Addressed:** D-1254 `fd5ebd92`

Named omits (map, not Must-fix):

1. `failed_grab` tail `some_mon_nam` (uses `mon_nam`+`s`)
2. AT_ENGL `gulpum`; altwep; remaining `mhitm_ad_*`
3. JS hug omits outer `dhit = 1` (latent vs later AT_EXPL)

Do not Must-fix “blessed cloak vs demon canary.” Do not Must-fix “local `sticks` instead of `monmove.js`.”

## Callers / RNG ledger

C: `hmonas` AT_HUGS from `do_attack` Upolyd. JS same. RNG: `rnd(4)` / `rnd(20)` inside `special_dmgval` when the truncated hate-test fires. Public fortress is not evidence a hug grabbed.

## Verdict

- Verdict: **QUALITY-RISK**
- One sentence: ordinary grab/crush now run through live `damageum`, but silver vs shade/vampire/imp cannot connect because `special_dmgval`’s `mon_hates_silver` is not C `hates_silver`.
- Must-fix prepend: item 1. Archive already has **Addressed:** D-1250 `87b4705a` (dispatch shipped; silver clone still wrong).
