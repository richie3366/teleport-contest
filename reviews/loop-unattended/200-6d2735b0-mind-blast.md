# Review 200 — 6d2735b0 — monmove.c `mind_blast` (D-1238)

## Metadata
- Full / short hash: `6d2735b0742f4c2a4953c50f04cec6d52ed57ba1` / `6d2735b0`
- Parent: `f217e059` (reviews **196–199** + cadence **#1570**). JS parent `d81367e2` (D-1237). This file audits **this SHA only**. Archive row **Addressed:** D-1238 `6d2735b0` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 23:45:39 +0200
- D-id: **D-1238**
- Stats: 10 files, +203 / −40 — `js/monmove.js` +107 / −10; comment `js/display.js`.
- Claims to close: Open `monmove.c` `mind_blast` (named from D-1227 / D-1237 / review **189** / **199**). Not msg_mon_movement. `reviews/loop-2026-08-15/` has no unpaid mind_blast Must-fix.
- JS / map: `monmove.js` `mind_blast` + `dochug`; `c-js-map/turns.md`. bee_eat / iron bars / `mon_yells` still named.
- Prior reviews this SHA claims to close: **189** named omit `mind_blast` among remaining `pline_mon`; **199** next Open was mind_blast.

## Intent vs deliverable

Git subject promises: “Match C monmove.c mind_blast so a mind flayer's !rn2(20) psychic wave concentrates, soothes or locks on, then refreshes apparxy/distfleeck.”

C `mind_blast` (`monmove.c:581–645`): `canseemon` → `pline_mon` concentrates; `mdistu > BOLT_LIM²` You-sense `return` (skips fmon); wave; peaceful `!Conflict || resist_conflict` soothing; else `!u.uinvulnerable` then `sensemon || (Blind_telepat && rn2(2)) || !rn2(10)` unhide / `U_AP_TYPE` clear + lock-on + `rnd(15)` + Half_spell `(dmg+1)/2` + `losehp(..., KILLED_BY_AN)`; fmon `nmon` walk skip dead/same-peace/mindless/self, `(telepathic && (rn2(2)||mblinded)) || !rn2(10)`, `wakeup(FALSE)`, cansee lock-on, `mhp -= rnd(15)`, `monkilled("", AD_DRIN)`. Caller `dochug` (`:827–835`): `is_watch` else `is_mind_flayer && !rn2(20)` then body + `set_apparxy` + `distfleeck`.

Old JS: burned the `!rn2(20)` gate, skipped the body and the fleeck refresh.

The diff **does** the body + `dochug` refresh. It does **not** pull `bee_eat_jelly`, postmov iron bars, or `mon_yells`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `mind_blast` | C `:581–645`, **new** | |
| `dochug` watch/flayer | C `:827–835`, **wired** | `is_watch` else `!rn2(20)` |
| `pline_mon` | C `pline.c:137–150`, **imported live** | D-1215; `display_canseemon` not a local stub |
| `sensemon` | C `display.h`, **imported live** | |
| `wakeup` | C `mon.c`, **imported live** | `FALSE` → no `setmangry` |
| `monkilled` | C `mon.c` via mhitm, **imported live** | `AD_DRIN=32` matches `monattk.h` |
| `losehp` / `finish_maybe_wail` | C `hack.c`, **imported live** | fatal `_losehp_needs_done` skips fmon like C noreturn |
| `set_apparxy` | C same file, **already live** | |
| `distfleeck` | C same file, **already live, thin** | still `scared=0`; refreshes `inrange`/`nearby` |
| `Blind_telepat` / `Half_spell_damage` | C `youprop.h:156` / `:295`, **clone** | `H\|\|E` like C; extra `u.Blind_telepat` / `u.Half_spell_damage` OR is the pre-existing prop clone, not a new gate |
| `hero_conflict` / `resist_conflict` | C `Conflict` / `resist_conflict`, **imported** | resist RNG only when Conflict |
| `telepathic` / `mindless` | C `mondata.h`, **imported** | |
| bee_eat / iron bars / `mon_yells` | C later `dochug`/`postmov`, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. Dynamic `end.js` is scored ESM, not `node:`. New RNG: hero `rn2(2)` / `!rn2(10)` / `rnd(15)`; per other-mon `rn2(2)` / `!rn2(10)` / `rnd(15)` in C order. `dochug` still burns `!rn2(20)` only when not watch.

## C ↔ JS fidelity

Pinned C body (`monmove.c:587–644`):

```
    if (canseemon(mtmp))
        pline_mon(mtmp, "%s concentrates.", Monnam(mtmp));
    if (mdistu(mtmp) > BOLT_LIM * BOLT_LIM) {
        You("sense a faint wave of psychic energy.");
        return;
    }
    pline("A wave of psychic energy pours over you!");
    if (mtmp->mpeaceful
        && (!Conflict || resist_conflict(mtmp))) {
        pline("It feels quite soothing.");
    } else if (!u.uinvulnerable) {
        ...
            losehp(dmg, "psychic blast", KILLED_BY_AN);
        }
    }
    for (m2 = fmon; m2; m2 = nmon) {
        nmon = m2->nmon;
        ...
            if (DEADMONSTER(m2))
                monkilled(m2, "", AD_DRIN);
    }
```

JS uses `display_canseemon` then live `pline_mon`. Far You-sense `return` **before** fmon. Wave always if in range. Peaceful soothing still runs fmon (soothing is not an early return). `uinvulnerable` skips only the hero lock-on. Match.

Hero gate is C short-circuit: `m_sen` burns no `rn2`; else `Blind_telepat && rn2(2)`; else `!rn2(10)`. Lock string: telepathy / latent / mind. `rnd(15)` then integer half. `losehp` live; fatal `finish_losehp_done` returns from `mind_blast` so fmon does not run (C `losehp` is noreturn). `dochug` then `gameover` return 0 so `set_apparxy` does not run after death. Match.

fmon: JS `slice()` then skip `mhp<1` / same-peace / mindless / self. C saves `nmon` before `monkilled` may `mondead`. Snapshot is the JS stand-in for that walk; newly spawned mons are unseen in both. `wakeup(m2, false)` matches `FALSE` (no growl/`setmangry`). Other-mon dmg is raw `rnd(15)` (no Half_spell). Match.

`BOLT_LIM` is 8 (`hack.h:49`). `U_AP_TYPE` in C is `m_ap_type & M_AP_TYPMASK`; JS `M_AP_TYPE` is the stored field. If extra bits were packed this would diverge; they are not packed here.

`distfleeck` after the blast still returns `scared=0` (pre-existing thin helper, `onscary`/flees_light named long before this SHA). `inrange`/`nearby` **do** refresh from `mux` after `set_apparxy`. Do **not** stamp “Match C `distfleeck` onscary.” The claimed fleeck refresh is the pointer rewrite C does, not a new scared classifier.

## Hallucinations / overclaim

Subject + D-1238 say concentrate / soothe-or-lock / apparxy+distfleeck. **The body + live `pline_mon`/`losehp`/`monkilled`/`wakeup`/`set_apparxy` are the hunk.** Stamping **Addressed:** D-1238 is fair. This is **not** “Match C dispatch, callee is a stub.” Do **not** stamp “Match C `bee_eat_jelly`” or “Match C `mon_yells`” or “Match C `distfleeck` sanctuary/onscary.”

## Density

One C function plus the `dochug` caller arm that already burned `!rn2(20)`. ~70 JS lines in the new function. Right size. Did not glue bee/bars/yells.

## Branch-by-branch confirm

1. Seen flayer: `pline_mon` concentrates. Match.
2. `mdistu > 64`: faint wave; no fmon. Match.
3. Peaceful + `!Conflict`: soothing; fmon still. Match.
4. Peaceful + Conflict: `resist_conflict` RNG; resist soothes, fail can lock. Match.
5. `uinvulnerable`: no hero dmg; fmon still. Match.
6. `sensemon`: lock telepathy; no `rn2(2)`/`rn2(10)`. Match.
7. Latent `Blind_telepat && rn2(2)` vs `!rn2(10)` mind. Match.
8. `uundetected` clear vs `U_AP_TYPE` furniture/object clear. Match.
9. Half_spell integer `(dmg+1)/2`. Match.
10. Fatal hero: skip fmon + skip post-blast fleeck. Match.
11. Same-peace / mindless / self skip. Match.
12. Other-mon telepathic `(rn2(2)||mblinded) || !rn2(10)` then `wakeup(FALSE)` + maybe `monkilled(AD_DRIN)`. Match.
13. Watch takes the `if`, so a watch-flayer does not blast. Match C `if / else if`.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM.

## Verification

Journal: private canary **31**/31 (C body+caller; short-circuit; far return; soothing; uinvulnerable; m_sen; latent; Half_spell; uundetected; U_AP_TYPE; same-peace; mindless; jackal `rn2(10)`; telepathic; DEADMONSTER; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a mind flayer `dochug`s with `!rn2(20)`. Cadence this audit: full `sessions`.

## Actionable C-wrongs

None for Must-fix. Body + live death/message callees. `distfleeck` scared stay-zero is a pre-existing named thin helper this SHA calls, not a fake blast.

Named omits (map, not Must-fix):

1. `bee_eat_jelly` after the wield phase
2. postmov iron bars `pline_mon`
3. `mon_yells`
4. `distfleeck` onscary / flees_light / sanctuary (`scared` still 0)

Do not Must-fix “burn `rn2(20)` without the body” (this SHA shipped the body). Do not wrap the wave as `pline_mon`.

## Callers / RNG ledger

C: `dochug` only, after muse, before wield. JS same. Public fortress is not evidence a flayer blasted.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: a mind flayer that passes `!rn2(20)` now concentrates, soothes or locks on, and damages hero/others through live `pline_mon`/`losehp`/`monkilled`, then refreshes apparxy; bee/bars/yells stay named.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1238 `6d2735b0`.
