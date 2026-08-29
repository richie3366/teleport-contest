# Review 569 — 43209cfb — minion.c gain_guardian_angel (D-1608)

## Metadata
- Full / short hash: `43209cfb8c3b2aab90040908f38f8e689aa420e5` / `43209cfb`
- Parent: `233abaea` (D-1607). This file audits **this SHA only** (sixth of nine `js/` commits since review **563**). Archive **Addressed:** D-1608 `43209cfb`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 01:20:15 +0200
- D-id: **D-1608**
- Stats: `js/minion.js` +143/−5, `js/do.js` +9/−3, `js/mklev.js` +9/−4, `js/eat.js` +4/−1, `js/mplayer.js` +4/−2. Band **150–350** (js/ insertions **169**).
- Claims to close: Open `gain_guardian_angel` after D-1596. Not `reset_hostility`. Not ACH_ASTR. Not dogmove Conflict caller. `reviews/loop-2026-08-15/` has no unpaid guardian-angel Must-fix.
- JS / map: `minion.js` `gain_guardian_angel` / `lose_guardian_angel`; `do.js` `goto_level`; `mklev.js` `mk_roamer`. `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **557** named `gain_guardian_angel` after `create_mplayers`.

## Intent vs deliverable

Git subject promises: Astral `final_level` can spawn a fervent named angel or Conflict hostiles.

Pinned C `minion.c` `gain_guardian_angel` `:497–565`. `lose_guardian_angel` `:467–494`. `priest.c` `mk_roamer` `:723–752`. `eat.c` `Hear_again` `:1800–1809`. Caller `do.c` `final_level` `:2045–2052` (`reset_hostility` then `create_mplayers` then this). `--callers gain_guardian_angel`: `:2052` only. `--callers lose_guardian_angel`: dogmove `:1051`; this file `:514`. `youprop.h:218` `Conflict (HConflict || EConflict)`. `youprop.h:125` `Deaf (HDeaf || EDeaf || u.uroleplay.deaf)`.

```506:528:nethack-c/upstream/src/minion.c
    if (Conflict) {
       if (!Deaf)
            pline("A voice booms:");
        else
            You_feel("a booming voice:");
        ...
        lose_guardian_angel((struct monst *) 0);
    } else if (u.ualign.record > 8) { /* fervent */
```

Old JS: `create_mplayers` live; `gain_guardian_angel` named omit. `mk_roamer` was a mklev-local `mk_roamer_splev`. `Hear_again` was eat-local.

The diff **does** live both minion functions, wire `goto_level` after `create_mplayers`, export one `mk_roamer` / `Hear_again`, and skip `tamedog`. It **does not** call `iter_mons(reset_hostility)`, `record_achievement(ACH_ASTR)`, or dogmove `:1051`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `gain_guardian_angel` | C `:497–565`, **LIVE this SHA** | |
| `lose_guardian_angel` | C `:467–494`, **LIVE this SHA** | Conflict `null`; dogmove named |
| `Hear_again` | C `:1800–1809`, **LIVE export** | TIMEOUT poke vs `make_deaf` |
| `mk_roamer` | C `:723–752`, **LIVE this SHA** (export) | was `mk_roamer_splev` |
| `enexto` / `mongone` / `verbalize` | **LIVE** | |
| `select_hwep` | C `:704–741`, **LIVE import, clone drift** | `oc_big` vs `oc_bimanual`; no `touch_artifact` |
| `mksobj` / `mpickobj` / `bless` / `mongets` | **LIVE** | saber + amulet |
| `which_armor` / `m_dowear` | **LIVE** | do not add which_armor #3 |
| `Conflict` / `Deaf` / `Blind` | C youprop, **CLONE inlined** | extra sticky `u.Deaf` |
| `SetVoice` | SND_LIB, **OMIT named** | |
| `reset_hostility` | C `:2046`, **OMIT named** | |
| ACH_ASTR | C after angel, **OMIT named** | |
| dogmove Conflict caller | C `:1051`, **OMIT named** | |

`node scripts/csym.mjs gain_guardian_angel` → `:497-565`. `lose_guardian_angel` → `:467-494`. `mk_roamer` → `:723-752`. `Hear_again` → `:1800-1809`. `select_hwep` → `:704-741`. `m_dowear` → `:756-796`. `make_deaf` → `:442-457`. `--macro Conflict` → `:218`. `--macro Deaf` → `:125`.

RNG: Conflict none after Hear_again’s `rn2(2)`. Hostiles `rn1(3,2)` then per-angel `enexto`. Fervent `rn1(8,15)` + `d(m_lev,10)+30+rnd(30)` + maybe `rnd(4)` on spe. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names (`mk_roamer_splev` → `mk_roamer`; eat `Hear_again` local → export):

```
gain_guardian_angel js/minion.js:457   ASYNC — await required
lose_guardian_angel js/minion.js:422   ASYNC — await required
mk_roamer        js/mklev.js:14888   sync
mk_roamer_splev  NOT FOUND
Hear_again       js/eat.js:1785   sync
select_hwep      js/weapon.js:472   sync
m_dowear         js/worn.js:632   sync
which_armor      js/worn.js:323   sync
             !! ALSO 2 LOCAL CLONE(S) (sit.js, trap.js) — Do NOT add #3
mongone          js/mon.js:2586   ASYNC — await required
enexto           js/teleport.js:649   sync
```

`--can minion.js mklev.js mk_roamer`: ALREADY. `--can minion.js eat.js Hear_again`: ALREADY. `--can minion.js weapon.js select_hwep`: ALREADY. `--can do.js minion.js gain_guardian_angel`: ALREADY. Do **not** stamp “cycle-forced clone.” Do **not** add `mk_roamer` #2 in `minion.js` or `priest.js`. Do **not** add `Hear_again` #2. Do **not** add `which_armor` #3.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

Caller. Astral `madeNew`: `create_mplayers(rn1(4,3), true)` then `await gain_guardian_angel()`. **Match `:2048–2052`.** `iter_mons(reset_hostility)` still skipped. Named.

Hear_again. C `make_deaf(0L, FALSE)` (`set_itimeout(&HDeaf,0)`, talk false). JS clears `HDeaf` TIMEOUT bits and sets botl. **Match the timeout-clear / no-pline part**; not the full `make_deaf` XOR-botl when `old` was zero. Occupation afternmv still named.

Conflict. `HConflict || EConflict` then Deaf branch, verbalize, `lose_guardian_angel(null)`. **Match `:506–514` + `:218`.** Extra sticky `u.Deaf` in the inlined Deaf test. SetVoice named.

lose_guardian_angel(null). Skip rebuke/`mongone`; `rn1(3,2)` hostile `enexto`+`mk_roamer(..., false)`. **Match `:487–493`.** Live `mon` arm (rebuke / vanish / `mongone`) is C-matched but unwired from dogmove. Named.

Fervent. `ualign.record > 8`; whisper/soft; `enexto` then `mk_roamer(..., true)`; clear `STRAT_APPEARMSG`; `mtame=10` only if `uconduct.pets`; `pets++`; `newsym`; Blind appear vs feel; `m_lev=rn1(8,15)`; hp `d(lev,10)+30+rnd(30)`; `select_hwep` or silver saber + `mpickobj` + `impossible` (C `panic`); `bless`; `spe+=rnd(4)` if `<4`; if no reflection shield `mongets(AMULET_OF_REFLECTION)` + `m_dowear(true)`. **Match `:519–563` control flow.** No `tamedog`. **Match the comment.**

`mk_roamer`. emin align/renegade, isminion, traps, peaceful, `set_malign`. **Match `:735–749`.** Occupied `rloc` is fire-and-forget (JS `rloc` async). Named. `enexto` usually yields an empty cell so insurance rarely runs.

`select_hwep`. C artifact loop requires `touch_artifact` and `!oc_bimanual` (unless strong && !shield). JS uses `oc_big` and skips `touch_artifact`. Pre-existing clone; this SHA newly calls it on a live angel. Fresh `makemon` kit is usually non-artifact, so the saber fallback often still matches. **Clone drift, not a stub.** Named.

Callee closure (Conflict arm). LIVE: `lose_guardian_angel`, `enexto`, `mk_roamer`, `verbalize`. OMIT named: SetVoice / reset_hostility. STUB: none. Fervent arm adds LIVE `mongets` / `m_dowear` / `bless` / `mksobj` / `which_armor` and the `select_hwep` clone. Combined-arm may ship. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject fervent named angel or Conflict hostiles: **true of `goto_level` Astral `madeNew`.** D-log “no tamedog”: **true.** D-log “one `mk_roamer`”: **true** (`mk_roamer_splev` gone). Do **not** stamp “Match C `reset_hostility`.” Do **not** stamp “Match C ACH_ASTR.” Do **not** stamp “Match C dogmove `:1051`.” Do **not** stamp “Match C `select_hwep` `touch_artifact` / `oc_bimanual`.” Do **not** stamp “Match C `make_deaf` talk XOR.” Do **not** stamp “awaited `rloc` insurance.” Public suite never reaches Astral `final_level`.

## Density

Caller/callee cluster: `gain` + `lose` + export `mk_roamer`/`Hear_again` + one `goto_level` site. +169 JS. Did not glue dogmove. §2b OK.

## Branch-by-branch confirm

1. Conflict + !Deaf: boom + hostiles `rn1(3,2)`. **Match.**
2. Conflict + Deaf: feel booming + hostiles. **Match.**
3. Fervent + pets conduct: `mtame=10`. **Match.**
4. Fervent + petless: angel appears, not tame. **Match.**
5. `ualign.record <= 8` and no Conflict: nothing. **Match.**
6. `reset_hostility` / ACH_ASTR / dogmove. **Named.**

## Callers / RNG ledger

Wired: `goto_level` only, as C `final_level`. dogmove unwired. Hear_again `rn2(2)` always runs first. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. Do not add `mk_roamer` #2. Do not add `Hear_again` #2. Do not add `which_armor` #3. Do not `tamedog` the angel. Do not wrap `wildmiss` as `pline_mon`. Do not glue dogmove Conflict in the same iter as this Open.

## Verification

D-log private canary **21**/21; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for Astral `final_level`. Fortress does not prove fervent vs Conflict. dogmove `/ Conflict` unhit.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): `reset_hostility` (`do.c:2046`); ACH_ASTR; dogmove `lose_guardian_angel(mtmp)` (`:1051`); `select_hwep` `touch_artifact` / `oc_bimanual` vs `oc_big`; `Hear_again` occupation afternmv / full `make_deaf`; `mk_roamer` awaited `rloc`; SetVoice; sticky `u.Deaf` in the inlined Deaf test. Do not add `mk_roamer` #2. create_mplayers is D-1596.

Verdict: **ACCEPT-WITH-DEBT**
