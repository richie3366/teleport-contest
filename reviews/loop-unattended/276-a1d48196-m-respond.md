# Review 276 — a1d48196 — mon.c m_respond (D-1314)

## Metadata
- Full / short hash: `a1d481962a884d947943f0e2ed1a2e0fd6cc244c` / `a1d48196`
- Parent: `27751021` (D-1313). This file audits **this SHA only**. Archive **Addressed:** D-1314 lacked the short hash; this review commit fills `a1d48196`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 22:44:55 +0200
- D-id: **D-1314**
- Stats: 12 files, +213 / −45 — `js/mon.js` +106 / −~8; `js/monmove.js` +6; `js/zap.js` +9; `js/dothrow.js` comments + boomhit call.
- Claims to close: Open `mon.c` m_respond (named from D-1301 / D-1313 / review **263**). Not snuff_candle. `reviews/loop-2026-08-15/` has no unpaid shrieker Must-fix.
- JS / map: `mon.js` `m_respond`; `monmove.js` `dochug`; `dothrow.js` `boomhit`; `zap.js` `bhitm`; `c-js-map/turns.md`. `gazemu` named.
- Prior reviews this SHA claims to close: **263** named `m_respond` after boomhit; D-1313 follow-up Open named this row.

## Intent vs deliverable

Git subject promises: “Match C mon.c m_respond so an adjacent shrieker shrieks/aggravates (and may summon) and a hostile Erinys who can see the hero wakes the level, instead of skipping those responses.”

C `m_respond` (`mon.c:4120–4131`) is three **independent** `if`s, not else-if: adjacent `MS_SHRIEK` → `m_respond_shrieker`; `data == &mons[PM_MEDUSA] && couldsee` → `m_respond_medusa`; hostile Erinys `m_canseeu` → `aggravate`. Shrieker (`:4088–4105`): `!Deaf` pline + `stop_occupation`; `!rn2(10)` then `makemon(rn2(13) ? NULL : &mons[purple/baby], 0, 0, NO_MM_FLAGS)` via `montoostrong(PM_PURPLE_WORM, monmax_difficulty_lev())`; **always** `aggravate`. Medusa (`:4109–4118`): first `AT_GAZE` slot → `gazemu`. Callers: `dochug` (`monmove.c:753–755`) then `DEADMONSTER` return 1; `boomhit` (`zap.c:4188`) before nhits; `bhitm` (`zap.c:552–557`) after `wakeup`, then `isshk && !*u.ushops` → `hot_pursuit`.

Old JS: `dochug` comment “m_respond deferred”; boomhit comment named omit; `bhitm` wakeup without respond.

The diff **does** wire shrieker / Erinys / the three callers / `bhitm` hot_pursuit. Medusa walks AT_GAZE then **no-ops** (`void atks[i]`). D-log names `gazemu`.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `m_respond` | C `:4120–4131`, **wired** | independent ifs; mndx not `mons()` identity (D-0928) |
| `m_respond_shrieker` | C `:4088–4105`, **wired** | |
| `um_dist` | C `apply.c`, **clone** | Chebyshev `> n` |
| `Deaf_respond` | C `youprop.h:125`, **clone** | H\|\|E\|\|uroleplay\|\|u.Deaf |
| `makemon` | C `makemon.c`, **imported live** | `x,y==0` random |
| `makemon_appear_msg` | C in-body Norep, **imported live** | D-0559 split |
| `aggravate` | C `wizard.c`, **imported live** | dynamic (cycle: wizard→`mnexto`) |
| `montoostrong` / `monmax_difficulty` | C `monst.h:259–264`, **imported live** | |
| `m_respond_medusa` | C `:4109–4118`, **dispatch only** | `gazemu` **no-op** |
| `gazemu` | C `mhitu.c`, **named omit** | |
| `m_canseeu` | C `vision.h`, **imported live** | |
| `dochug` / boomhit / `bhitm` | C callers, **wired** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG on shrieker:** `rn2(10)` always when adjacent; on hit, `rn2(13)` then maybe `makemon` creation RNG; `aggravate` may `!rn2(5)` thaw frozen mons. Far shrieker: no RNG (gate is `!um_dist(...,1)` before the helper). Erinys/Medusa gates have **no** RNG in this function. `gazemu` would have Hallu/reflect RNG — not burned (named).

## C ↔ JS fidelity

Pinned C (`mon.c:4122–4131` + shrieker `:4091–4104`):

```
    if (mtmp->data->msound == MS_SHRIEK && !um_dist(mtmp->mx, mtmp->my, 1))
        m_respond_shrieker(mtmp);
    if (mtmp->data == &mons[PM_MEDUSA] && couldsee(mtmp->mx, mtmp->my))
        m_respond_medusa(mtmp);
    if (mtmp->data == &mons[PM_ERINYS] && !mtmp->mpeaceful && m_canseeu(mtmp))
        aggravate();
```

JS uses `data.mndx` for Medusa/Erinys — correct for this port (`mons()` allocates; D-0928). `MS_SHRIEK=18` matches `monflag.h:32`. `AT_GAZE=15` matches `monattk.h:25`. `NATTK=6`. `NO_MM_FLAGS=0`. `monmax_difficulty_lev` is `(level_difficulty()+ulevel)/2` (`monst.h:259–261`); JS `monmax_difficulty(level_difficulty(), u.ulevel)` matches. Purple vs baby: `montoostrong(PM_PURPLE_WORM, lev)` then baby. `makemon(NULL,0,0)` is random monster; JS `mdat=null` same.

`makemon_appear_msg` after a successful summon is the D-0559 split of C’s in-body Norep, not a second `makemon`. `aggravate` is the real `wizard.js` callee (clears wait/sleep, `!rn2(5)` thaw).

Medusa: C calls `gazemu(mtmp, &mattk[i])` and breaks. JS finds the slot and `void`s it. Say so: this is **not** “Match C Medusa gaze stone/reflect.” The subject did not claim gazemu; D-log names it. Dispatch exists; callee is a no-op.

`dochug` `mhp<1` return 1 matches `DEADMONSTER` after gaze-kill. With gazemu omitted that return is dead structure until gazemu lands — same shape as C, not a fake kill.

`bhitm` `isshk && !ushops[0]` → `hot_pursuit` matches `:556–557`. Live `hot_pursuit`.

## Hallucinations / overclaim

Subject + D-1314 say an adjacent shrieker shrieks/aggravates (maybe summons) and a hostile seeing Erinys wakes the level. **Those two arms plus the three callers are the hunk.** Stamping **Addressed:** D-1314 is fair for shrieker/Erinys/callers. Do **not** stamp “Match C `gazemu`.” Do **not** stamp “Match C `qst_guardians_respond`.” Do **not** treat fortress PASS as a shriek `rn2(10)`.

## Density

One C function plus its three existing call sites (the `bhitm` `hot_pursuit` line sits on the same C envelope as `m_respond` there). ~80 executable JS lines. gazemu correctly not glued. Right size (§2b).

## Branch-by-branch confirm

1. Adjacent shrieker, hearing: pline, `stop_occupation`, `rn2(10)`, always `aggravate`. Match `:4091–4104`.
2. `rn2(10)` hit then `rn2(13)==0`: purple or baby `makemon(0,0)`. Match ternary.
3. `rn2(13)!=0`: `makemon(NULL)`. Match.
4. Far shrieker (`um_dist`): no pline, no `rn2(10)`. Match `:4124`.
5. Deaf: skip pline/stop; still summon roll + aggravate. Match `!Deaf` wrapping only the message.
6. Hostile Erinys `m_canseeu`: `aggravate`. Match `:4129–4130`.
7. Peaceful / cannot see hero: skip. Match.
8. Visible Medusa: AT_GAZE walk, **no** `gazemu`. Named omit of `:4115`.
9. boomhit / `bhitm` / `dochug` call. Match the three C sites.
10. **Public-unhit** unless a session has adjacent `MS_SHRIEK`, visible Medusa, or hostile seeing Erinys.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Did not wrap `wildmiss` as `pline_mon`. Dynamic `wizard.js` import is an ESM cycle, not filesystem. Plain ESM.

## Verification

Journal: private canary **14**/14; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless shrieker/Medusa/Erinys. Cadence this audit: full `sessions` at this HEAD `a1d48196` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `37+0.32/turn` (R² 0.85). I did not re-run the private canary.

## Actionable C-wrongs

None for Must-fix. Shrieker `!um_dist(1)` / `!rn2(10)` / `rn2(13)` purple-or-rnd / always `aggravate`, Erinys `m_canseeu`, and the three callers match C `:4088–4131` / `dochug:753` / `boomhit:4188` / `bhitm:552–557`. `aggravate` / `makemon` are not stubs.

Named omits (map, not Must-fix):

1. `mhitu.c` `gazemu` (Medusa AT_GAZE body)
2. `qst_guardians_respond` / `peacefuls_respond`
3. ACURRSTR urange / vanish pline / dokick snuff (other rows)

Do not Must-fix “mndx vs `&mons[]`.” Do not Must-fix `makemon_appear_msg` split. Do not Must-fix early `mhp<=0` return. Next work is review **275** Must-fix (throwit→`throwit_mon_hit`), not ACURRSTR.

## Callers / RNG ledger

C: `dochug` every monster turn; boomhit on hit; `bhitm` after wakeup. JS: same. Public fortress is not evidence a shrieker rolled `rn2(10)`.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: adjacent shriekers now shriek/summon-roll/`aggravate` and hostile seeing Erinyes wake the level; Medusa still walks AT_GAZE into a named `gazemu` no-op.
- Must-fix stays empty for this SHA; this review commit fills archive **Addressed:** D-1314 `a1d48196`.
