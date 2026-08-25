# Review 452 — f26e11aa — worm.c worm_move / shrink_worm / worm_nomove (D-1491)

## Metadata
- Full / short hash: `f26e11aa4215f89863dbeb49c82e18922abca338` / `f26e11aa`
- Parent: `69080895` (D-1490). This file audits **this SHA only** (seventh of nine `js/` commits since review **445**). Archive **Addressed:** D-1491 `f26e11aa` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 18:16:38 +0200
- D-id: **D-1491**
- Stats: 10 files, +198 / −32 — `js/worm.js` +121 / −4; `js/monmove.js` +7 / −1.
- Claims to close: Open `worm.c` `worm_move` (named from D-0544 initworm / reviews **190** / **198** after `msg_mon_movement`). Not cutworm. `reviews/loop-2026-08-15/` has no unpaid worm-move Must-fix.
- JS / map: `worm.js` `worm_move` / `shrink_worm` / `worm_nomove`; `monmove.js` `m_move`. `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **190** named `worm_move` after dest `pline_xy`; **198** still named it after a11y addr.

## Intent vs deliverable

Git subject promises: after `m_move` places the head, a long worm reconnects its dummy and grows or shrinks instead of leaving the tail frozen.

Pinned C `worm.c` `worm_move` `:196–278`: occupy old dummy via `place_worm_seg` + `newsym`; append a new dummy at `worm->mx/my`; if `wgrowtime[wnum] <= svm.moves` then first `rnd(5)` else `mcalcmove(worm, FALSE)` + `rn1(10,2)` scaled by `NORMAL_SPEED/max(mmove,1)` then `d(2,2)` HP with the 33/22/11 ladder and `MHPMAX`; else `shrink_worm`. `worm_nomove` `:288–297`: `shrink_worm` then maybe `mhp -= d(2,2)` floor 1. Caller `monmove.c` `m_move` `:2054–2071` after `place_monster`/`msg_mon_movement`, and on the failed-move arm after unicorn `rloc`.

Old JS: D-0544 `initworm` / dummy chain; `m_move` set `mx/my` and `msg_mon_movement` then skipped the reconnect.

The diff **does** export `worm_move` / `worm_nomove`, local `shrink_worm`, and both `m_move` call sites. It **does not** wire `muse.c` / `mhitu.c` `worm_move` after trapdoor/stairs/teleport (those JS paths are not live). Named. It **does not** port `cutworm` / `wormgone` / save-rest / `see_wsegs`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `worm_move` | C `:196–278`, **wired this SHA** | grow/shrink after place |
| `shrink_worm` | C `:175–186`, **wired** | local; tail==head no-op |
| `worm_nomove` | C `:288–297`, **wired** | failed `m_move` |
| `place_worm_seg` / `newseg` / `toss_wsegs` / `count_wsegs` | C, **already live** (D-0544) | occupancy Map |
| `newsym` | C display, **imported live** | |
| `worm_mcalcmove` | C `mon.c` `mcalcmove(mon, FALSE)` `:1126–1167`, **clone** | cycle vs `mon.js`; no `m_moving` `rn2` |
| `mcalcmove` in `mon.js` | C same, **already live** | not imported here |
| `m_move` place + fail arms | C `:2048–2071`, **wired** | unicorn `rloc` still first |
| `cutworm` / `wormgone` / `see_wsegs` | C, **named omit** | |
| muse.c / mhitu.c `worm_move` | C `:1059` etc., **named omit** | JS paths not live |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** first grow `rnd(5)`; later `rn1(10,2)` then integer scale (no extra `rn2`); grow and nomove `d(2,2)`. Clone `worm_mcalcmove` does **not** roll `m_moving` rounding (`FALSE`). Steed gallop `rn2(2)` is already deferred in `mon.js` `mcalcmove`; the clone matches that live JS, not a new skip unique to this SHA. Public fortress: seed0373 barbarian quest is the D-log focused session; long-worm grow is not a documented public FAIL.

## C ↔ JS fidelity

Caller order. C successful: `remove_monster` / `place_monster` / `msg_mon_movement` / `if (wormno) worm_move` / `maybe_unhide_at` / `mon_track_add` / `postmov`. JS still assigns `mx/my` instead of `place_monster` (pre-existing `m_move`); this SHA inserts `worm_move` **after** `msg_mon_movement` and **before** `maybe_unhide_at`. **Match C order for the new call.** Failed: C unicorn `rn2(2)` `rloc` return `MMOVE_MOVED`, else `worm_nomove`, then `postmov`. JS `MMOVE_NOTHING` arm: same unicorn then `worm_nomove` then `postmov`. **Match.**

`shrink_worm`. C `:179–185`: if `wtails==wheads` return; else detach list start, `nseg=0`, `toss_wsegs(seg, TRUE)`. JS identical. Dummy-only worm does not toss the hidden head. **Match.**

`worm_move` reconnect. C `:204–216`: `seg = wheads[wnum]`; `place_worm_seg(worm, seg->wx, wy)`; `newsym`; `newseg` at `mx/my`; attach; `wheads = new_seg`. JS same. Dummy that was co-located with the old head becomes a visible occupancy cell; new dummy rides the new head. **Match** given D-0544 occupancy.

Grow vs shrink. C `:218` `wgrowtime <= svm.moves`. JS `game.moves`. First time `!wgrowtime`: `moves + rnd(5)`. Else `incr = rn1(10, 2)` then `(incr * NORMAL_SPEED) / max(mmove, 1)` assigned as `moves + incr` (not `+=`). C comment “2..12” is **wrong** (`rn1(10,2)` is `2+rn2(10)` = 2..11); JS comment 2..11 matches the **code**. Integer divide matches C trunc toward 0 via `Math.trunc`. **Match the C statements, not the stale comment.**

`mcalcmove(worm, FALSE)`. C MSLOW `(2*mmove+1)/3` vs `4+mmove/3`; MFAST `(4*mmove+2)/3`; **then** optional steed gallop; **then** `if (m_moving)` `rn2(NORMAL_SPEED)` rounding. `FALSE` skips rounding. JS `worm_mcalcmove` copies the speed scale from `mon.js` `mcalcmove` and omits rounding. Cycle reason is real (`mon.js` already imports `worm_cross`). Clone vs imported callee: formulas match the live JS `mcalcmove(…, false)`. Gallop remains a **named** mon.js omit, not a worm-only C-wrong.

HP ladder. C `:244–270`: `whplimit = !m_lev ? 4 : 8*m_lev`; wsegs includes hidden dummy (`count_wsegs` starts at `wtails->nseg` — JS `:95–100` same); `>33` add 2, clamp 33; `>22` add 4, clamp 22; `>11` add 6, clamp 11; `+= 8*wsegs`; cap `MHPMAX` (C `global.h:416` / JS `const.js` both **500**). `mhp += d(2,2)`; `whpcap = max(whplimit, mhpmax)`; if `mhp < whpcap` then maybe clamp to `max(prev_mhp, whplimit)` and raise `mhpmax`; else clamp `mhp` to `mhpmax`. JS uses `else if` for the else-arm; same assignments. **Match.**

`worm_nomove`. Shrink then `if (mhp > count_wsegs) mhp -= d(2,2); if (mhp < 1) mhp = 1`. `mhpmax` untouched. **Match `:292–295`.**

## Hallucinations / overclaim

Subject “reconnects dummy and grows or shrinks” is **true** on the `m_move` path. D-log “callee already live” is not a dispatch lie: `place_worm_seg` / `toss_wsegs` / `count_wsegs` / `newsym` are the same D-0544 helpers, not stubs. Do **not** stamp “Match C `cutworm`.” Do **not** stamp “Match C muse trapdoor `worm_move`.” Do **not** treat fortress PASS as a long-worm grow trace (seed0373 FULL is a **quest** session; public-unhit for tail length unless a worm actually moved). Stamping **Addressed:** D-1491 for `m_move` reconnect is fair.

## Density

One C movement trio plus the two `m_move` call sites. ~110 JS lines. Did not glue `cutworm`. Playbook §2b. Acceptable.

## Branch-by-branch confirm

1. Head moved, `wgrowtime==0`: occupy old dummy, new dummy at `mx/my`, `rnd(5)` next grow, `d(2,2)` HP. **Match `:222–224` + `:256–257`.**
2. Head moved, `0 < wgrowtime <= moves`: `rn1(10,2)` scale, same HP ladder. **Match `:225–237`.** No `rn2(12)`.
3. Head moved, `wgrowtime > moves`: `shrink_worm` after insert (net same length, tail slides). **Match `:271–276`.**
4. Dummy-only worm shrink: no-op. **Match `:179–180`.**
5. Failed `m_move`: `worm_nomove` after unicorn miss; HP floor 1. **Match `:2068–2071` + `:292–295`.**
6. `worm_move` after `msg_mon_movement`, before `maybe_unhide_at`. **Match `:2053–2060`.**
7. muse.c trapdoor / stairs / mhitu swallow still omit. Named.
8. `cutworm` still named (`dothrow.js` comment).
9. **Public-unhit** for grow RNG unless a session’s long worm actually takes `m_move`.

## Callers / RNG ledger

C `worm_move` after place: `monmove.c` `:2057–2058` (this SHA); `muse.c` trapdoor/stairs/teleport (`:1059`, `:1155`, `:2540`, `:3132`); `mhitu.c` `:586`. JS wires **only** `m_move`. muse/mhitu still named.

C `mcalcmove(worm, FALSE)` `:1126–1167`:

```1138:1166:nethack-c/upstream/src/mon.c
    if (mon->mspeed == MSLOW) {
        if (mmove < NORMAL_SPEED)
            mmove = (2 * mmove + 1) / 3;
        else
            mmove = 4 + (mmove / 3);
    } else if (mon->mspeed == MFAST)
        mmove = (4 * mmove + 2) / 3;
    if (mon == u.usteed && u.ugallop && svc.context.mv)
        mmove = ((rn2(2) ? 4 : 5) * mmove) / 3;
    if (m_moving) {
        mmove_adj = mmove % NORMAL_SPEED;
        mmove -= mmove_adj;
        if (rn2(NORMAL_SPEED) < mmove_adj)
            mmove += NORMAL_SPEED;
    }
```

JS clone copies MSLOW/MFAST and skips both gallop and `m_moving` rounding. Gallop is already named in `mon.js`. `FALSE` correctly skips rounding. First grow `rnd(5)`; later `rn1(10,2)` then integer scale (no extra `rn2`); HP `d(2,2)` on grow and nomove. Public fortress does not document a long-worm grow trace.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No fs. No FORCE/DIAG. No seed names in control flow. No `fastforward.js` writes. Clone `worm_mcalcmove` is documented cycle avoidance, not a glyph stand-in.

## Verification

D-log: private canary **27**/27 (C/JS grep; first grow `rnd(5)`+`d(2,2)`; same-turn shrink; later grow `rn2(10)` not `rn2(12)`; nomove HP floor 1; Rule #2); green+strict seed8000/0900; focused seed0373 **FULL** RNG+Scr; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. Focused+green+**monmove** cohort is the right set. seed0373 is not a dedicated worm-tail canary; treat grow/shrink as **private + public-unhit**.

## Actionable C-wrongs

None that belong on Must-fix. Named omits (`cutworm`, muse/mhitu `worm_move`, `see_wsegs`) stay on the map. The `worm_mcalcmove` clone matches `mon.js` `mcalcmove(…, false)` including the already-named gallop skip.

Verdict: **ACCEPT-WITH-DEBT**
