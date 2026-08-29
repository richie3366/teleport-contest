# Review 639 — 8a8124d1 — pray.c offer_corpse (D-1678)

## Metadata
- Full / short hash: `8a8124d11a7f4ec7aee0ac0361c3695305e81b9c` / `8a8124d1`
- Parent: `478f2710` (D-1677). This file audits **this SHA only** (fourth of nine `js/` commits since review **635**). Archive **Addressed:** D-1678 `8a8124d1`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 20:06:18 +0200
- D-id: **D-1678**
- Stats: `js/pray.js` +416/−20; `js/pickup.js` +2/−1. Total `js/` insertions **418** >250. Band **200–450**.
- Claims to close: Open `offer_corpse` after D-1667 ECMD_TIME-with-no-body. Not `offer_too_soon` / amulet offers. Not `offer_different_alignment_altar` / `bestow_artifact` / `angry_priest`. `reviews/loop-2026-08-15/` has no unpaid corpse-sacrifice Must-fix.
- JS / map: `pray.js` `offer_corpse` + same-file helpers; `pickup.js` export `rider_corpse_revival`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **626** named `offer_corpse` bodies (QUALITY-RISK was ECMD, shipped D-1667).

## Intent vs deliverable

Git subject promises: a CORPSE sacrifice runs eval/consume/luck and same-race handling, instead of returning ECMD_TIME with no body after D-1667.

Pinned C `offer_corpse` `:1958–2120` (`node scripts/csym.mjs offer_corpse`). `--callers`: `dosacrifice` `:1890` (csym lists the staticfn). Callees: `eval_offering` `:1898–1956`; `consume_offering` `:1445–1475`; `sacrifice_your_race` `:1697–1778`; `sacrifice_value` `:1838–1850`; `offer_negative_valued` `:1591–1599`; `a_gname` `:2506–2510`; `rider_corpse_revival` `pickup.c:302–313`; `feel_cockatrice`; `desecrate_altar` `:1500–1523`; `gods_upset` `:1435–1443`; `dlord` `minion.c:404–416`; `bestow_artifact` `:1780–1836`; `offer_different_alignment_altar`; `angry_priest` `priest.c:876–911`. `MAXVALUE` 24. `ugod_is_angry` `:104`.

```1874:1892:nethack-c/upstream/src/pray.c
    if (otmp->otyp == AMULET_OF_YENDOR) {
        ...
            return ECMD_TIME;
    ...
    if (otmp->otyp == CORPSE) {
        offer_corpse(otmp, highaltar, altaralign);
        return ECMD_TIME;
    }
```

Old JS: CORPSE arm `return ECMD_TIME` with the body omitted (D-1667). The diff **does** `offer_corpse` plus the same-file helpers, wires `dosacrifice` `:1891–1893`, exports `rider_corpse_revival`. It **does not** port `offer_different_alignment_altar` (early `return`), `bestow_artifact` (falls through to luck as if false), `angry_priest` (two comments in `sacrifice_your_race`), amulet offers. Named. `bestow_artifact` / `angry_priest` `sym.mjs` NOT FOUND.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `offer_corpse` | C `:1958–2120`, **LIVE this SHA** | local; do not export/#2 |
| `eval_offering` | C `:1898–1956`, **LIVE this SHA** | |
| `consume_offering` | C `:1445–1475`, **LIVE this SHA** | `rn2(3)` hallu |
| `sacrifice_your_race` | C `:1697–1778`, **LIVE this SHA** | `angry_priest` OMIT |
| `sacrifice_value` | C `:1838–1850`, **LIVE this SHA** | blob / age≤50 / `eaten_stat` |
| `offer_negative_valued` | C `:1591–1599`, **LIVE this SHA** | `desecrate_altar` / `gods_upset` |
| `a_gname` / `a_gname_at` | C `:2506–2520`, **LIVE this SHA** | |
| `dosacrifice` CORPSE | C `:1890–1892`, **LIVE this SHA** | still `ECMD_TIME` |
| `rider_corpse_revival` | C `:302–313`, **LIVE** (export this SHA) | body pre-existed |
| `feel_cockatrice` | **LIVE** | invent.js |
| `desecrate_altar` / `gods_upset` / `angrygods` | **LIVE** | already in pray.js |
| `dlord` / `makemon` / `nomul` | **LIVE** | `makemon` is **sync** |
| `your_race` / `get_mtraits` / `has_omonst` | **LIVE** | |
| `ugod_is_angry` | C `:104`, **LIVE** | `record < 0` |
| `bestow_artifact` | C `:1780–1836`, **OMIT named** | NOT FOUND |
| `offer_different_alignment_altar` | C `:2065–2068`, **OMIT named** | early return, corpse stays |
| `angry_priest` | C `:1723` / `:1736`, **OMIT named** | NOT FOUND |
| amulet `offer_*` | C `:1874–1888`, **OMIT named** | TIME still |

RNG: `consume_offering` `rn2(3)` hallu (`:1448`); `dlord` `rn1` (`:410`) when same-race chaotic/Moloch summon; `hcolor` hallu in the vanish-cloud arm. Mollify/blesscnt/luck paths have **no** `rn2`. `bestow_artifact` RNG is the named skip. No seed gate.

`node scripts/sym.mjs` on new / deleted / re-pointed names:

```
offer_corpse     NOT EXPORTED — 1 LOCAL js/pray.js:1717  => Do NOT write clone #2.
eval_offering    NOT EXPORTED — 1 LOCAL js/pray.js:1523
consume_offering NOT EXPORTED — 1 LOCAL js/pray.js:1571
sacrifice_your_race NOT EXPORTED — 1 LOCAL js/pray.js:1624
sacrifice_value  NOT EXPORTED — 1 LOCAL js/pray.js:1508
offer_negative_valued NOT EXPORTED — 1 LOCAL js/pray.js:1610
rider_corpse_revival js/pickup.js:979   ASYNC — await required
desecrate_altar  js/pray.js:1159   ASYNC — await required
gods_upset       NOT EXPORTED — 1 LOCAL js/pray.js:1274
dlord            js/minion.js:268   sync
a_gname          NOT EXPORTED — 1 LOCAL js/pray.js:1499
u_gname          js/roles.js:767   sync
feel_cockatrice  js/invent.js:1552   ASYNC — await required
get_mtraits      js/mkobj.js:2696   sync
your_race        js/monsters.js:451   sync
angrygods        NOT EXPORTED — 1 LOCAL js/pray.js:1190
bestow_artifact  NOT FOUND in js/**
angry_priest     NOT FOUND in js/**
```

`--can pray.js pickup.js rider_corpse_revival`: **ALREADY**. `--can pray.js minion.js dlord`: **ALREADY**. Do **not** stamp “cycle-forced clone.” Do **not** add `offer_corpse` #2 / export. Do **not** invent `bestow_artifact` / `angry_priest` stubs that consume RNG.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

`offer_corpse` C `:1958–2120` (`node scripts/csym.mjs offer_corpse`). JS local `pray.js:1717`. Walk in C order.

**`dosacrifice` CORPSE.** C `:1890–1892` `offer_corpse` then `ECMD_TIME`. JS the same. Empty pick still `ECMD_OK`. Amulet arms still TIME without bodies (named). **Match the ECMD contract D-1667 already fixed.**

```1890:1893:nethack-c/upstream/src/pray.c
    if (otmp->otyp == CORPSE) {
        offer_corpse(otmp, highaltar, altaralign);
        return ECMD_TIME;
```

**Gnostic / cockatrice / rider.** C `if (!u.uconduct.gnostic++)` livelog `LL_CONDUCT` with `corpse_xname` + `a_gname()`, then the increment always happens. JS livelog when was 0 (`gnostic = 1`), else `++`. `feel_cockatrice(otmp, TRUE)` then `rider_corpse_revival(otmp, FALSE)` return. JS `await` both. **Match `:1976–1987`.** Rider C `:302–313`: not corpse / not rider → FALSE; else pline touch vs acquisition, `revive_corpse`, `exercise(A_WIS, FALSE)`, TRUE. JS export is that body (pre-existing `revive`); this SHA only exports it. Remotely is FALSE from the altar path.

**Same race / former pet.** C `ptr = &mons[otmp->corpsenm]` then `your_race(ptr)` → `sacrifice_your_race` return even when value would be 0. `has_omonst` + `get_mtraits(..., FALSE)` + `mtame` → loyalty pline, `adjalign(-3)`, `HAggravate_monster |= FROMOUTSIDE`, `offer_negative_valued` return. JS `mons(otmp.corpsenm)` then the same; `u.HAggravate_monster |= FROMOUTSIDE`. **Match `:1991–2007`.**

**`sacrifice_value` `:1838–1850`.** Acid blob **or** `moves <= peek_at_iced_corpse_age+50` → `difficulty+1`; `oeaten` → `eaten_stat`. Else 0 (too old). JS the same. **Match.**

**`eval_offering` `:1898–1956`.** Value 0 returns 0 before undead/unicorn. Undead: `+1` if not chaotic, **or** chaotic and `ptr == &mons[PM_WRAITH]` and `unvegetarian`. JS `ptr.mndx === PM_WRAITH` (C pointer identity; `mons()` is not a stable `&mons[]`). Unicorn `sgn(maligntyp)`: same-as-altar insult `adjattrib(A_WIS,-1,TRUE)` return −1; you-on-your-altar `adjalign(5)` `+3` plus ALIGNLIM feel; your-unicorn on foreign altar `record = -1` value=1; else `+3`. **Match.** `ALIGNLIM()` is the attrib helper, not rewritten.

**Value 0 / negative / highaltar desecrate / cross-align.** C `nothing_happens`; `offer_negative_valued` (`:1591–1599` highaltar foreign → `desecrate_altar` else `gods_upset`); highaltar foreign after a **positive** value → `desecrate_altar`; then `u.ualign.type != altaralign` → `offer_different_alignment_altar` return. JS the first three LIVE. Cross-align: **return without converting** (named `:2065–2068`). Corpse stays on the altar. That is the named omit, not a fake `uchangealign`.

**`consume_offering` `:1445–1475`.** Hallu `rn2(3)`: 0 wings/propeller, 1 puff/pop, 2 dancing particles. Else Blind lawful “disappears”; else flash / plume / burst by `A_LAWFUL` / `A_NEUTRAL` / chaotic. `carried` → `useup` else `useupf(..., 1)`; `exercise(A_WIS, TRUE)`. JS `switch` 0/1/`default` for 2. **Match call-for-call including the one `rn2`.** `carried` ≡ `OBJ_INVENT`.

**Mollify (`ugangr`).** C subtract `(value * (chaotic?2:3))/MAXVALUE` toward 0; if anger moved: remaining → slightly mollified / groovy + luck+1 if `uluck<0`; zero anger → mollified / cosmic + `uluck=0` if negative; unchanged → inadequacy / gods tall. JS `Math.trunc` on non-negative ints ≡ C toward-0. `u_gname(game.urole, u.ualign.type)` ≡ C `u_gname()`. **Match `:2032–2057`.**

**Absolve (`ugod_is_angry` `:104` `record<0`).** Cap value at `MAXVALUE` and at `-record`; `adjalign(value)`; “partially absolved.” **Match `:2058–2064`.**

**Blesscnt.** Subtract `(value * (chaotic?500:300))/MAXVALUE`; remaining → hopeful / gods-not-like-you + luck+1 if negative luck; zero → reconciliation / fried onions + `uluck=0`. Unchanged cnt: no extra pline in C. **Match `:2065–2087`.**

**Luck (`else` after blesscnt).** C `if (bestow_artifact(value)) return;` then `luck_increase = (value * LUCKMAX) / (MAXVALUE * 2)`; if `orig_luck > value` increase 0; else clamp so `orig+increase` cannot exceed `value`; `change_luck`; negative luck → 0; if luck changed Blind foot / four-leaf clover. JS **skips** `bestow_artifact` (`sym.mjs` NOT FOUND) and runs the luck arm as if it returned 0. **Match the luck formula.** If C would have given an artifact, JS still changes luck — named omit, not a silent extra `rn2`.

**`sacrifice_your_race` `:1697–1778`.** Demon-you satisfying / non-chaotic infamous + WIS. Highaltar and (altar not chaotic or you not chaotic) → `desecrate_altar` return. Lawful/neutral altar: stain `altarmask = AM_CHAOTIC`, `newsym`, **`angry_priest` named omit**. Chaotic-altar + you-not: blood floods, `typ=ROOM`, `altarmask=0`, `newsym`, **`angry_priest` omit**, cloud dissipates; else blood covers, `change_luck(A_NONE?-2:2)`. Then `dlord`+`makemon(..., MM_NOMSG)` (JS **sync** `makemon`); `a_monnam`/`it`→dreadful; `sgn` peaceful; `nomul(-3)` terrified. Miss → demonless_msg. Then non-chaotic `adjalign(-5)` `ugangr+=3` WIS `angrygods` luck−5 else `adjalign(5)`; `useup`/`useupf`. **Match except priest `:1723` / `:1736`.** Extra JS `loc.flags = AM_CHAOTIC` beside `altarmask` is not C (C only `altarmask`). `dlord` `rn1` loop matches `minion.c:407–415`.

Callee closure (`offer_corpse`). LIVE: gnostic/livelog, `feel_cockatrice`, `rider_corpse_revival`, `your_race`, `sacrifice_your_race` (minus priest), `get_mtraits`, `eval_offering`, `sacrifice_value`, `offer_negative_valued`, `desecrate_altar`, `consume_offering`, mollify/absolve/blesscnt/luck, `dlord`/`makemon`. CLONE: none new beyond same-file staticfns. OMIT named: `offer_different_alignment_altar`, `bestow_artifact`, `angry_priest`, amulet offers. Combined-arm: those three are **named OMIT with C citations**, not silent stubs claiming Match C `uchangealign` / `mk_artifact` / priest. “Dispatch ported, callee stubbed” for **`#offer` CORPSE luck/mollify/same-race** is **false**. For conversion / artifact / priest it is **named**.

## Hallucinations / overclaim

Subject “eval/consume/luck and same-race”: **true** on a coaligned altar with a valued non-race corpse, and for `your_race`. D-log “Wraith via `ptr.mndx === PM_WRAITH`”: **true** (C `&mons[PM_WRAITH]`). Do **not** stamp “Match C `bestow_artifact`.” Do **not** stamp “Match C `offer_different_alignment_altar` / `uchangealign`.” Do **not** stamp “Match C `angry_priest`.” Do **not** stamp “Match C amulet offers.” Do **not** add `offer_corpse` export. Private canary (jackal/blob value, rider false, luck trunc, swallow `ECMD_OK`) does not hit high-altar desecrate, unicorn insult, or `dlord` `rn1`. Public-unhit for `#offer`. Fortress 44/44.

## Density

+418: one `offer_corpse` family (eval/consume/race/value/negative) plus `dosacrifice` wire. §2b “whole practical function,” not half of `mon.c`. Did not glue amulet offers or `bestow_artifact`.

## Verification

Wired: gnostic; cockatrice; rider export; race/pet; eval undead/unicorn; consume `rn2(3)`; mollify/absolve/blesscnt/luck clamp; `dosacrifice` TIME. Unwired C: conversion altar, artifact gift, `angry_priest`, amulet bodies. Conf: hallu consume `rn2(3)` only on that path; `dlord` `rn1` only on race-chaotic/Moloch summon. No seed gate.

Journal: private canary (jackal/blob, rider false, luck trunc, swallowed OK); green+strict seed8000/0900; cohort **7**/7 + strict. Cadence **#2090** at HEAD: **44**/44.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): `offer_different_alignment_altar`; `bestow_artifact`; `angry_priest`; `offer_too_soon` / `offer_real_amulet` / `offer_fake_amulet`; stain `altarmask` vs extra `loc.flags`. Do **not** add `offer_corpse` #2. Do **not** invent `bestow_artifact` that skips `rn2`/`mk_artifact`. Do **not** import `priest.js` for a no-op `angry_priest`. Do **not** re-port D-1667 ECMD_TIME. Do **not** `await makemon` (it is sync).

Verdict: **ACCEPT-WITH-DEBT**
