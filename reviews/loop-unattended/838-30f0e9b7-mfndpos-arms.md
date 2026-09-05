# Review 838 — 30f0e9b7 — mon.c mfndpos amorphous-door + tele-track + cursed-dig arms (D-1868)

Metadata: SHA `30f0e9b7`, D-1868, `js/mon.js` (+44/−9, three `mfndpos`
arms + import names), `js/objects.js` (+12/−1, canonical `is_pick`),
`js/trap.js` (+9, `fixed_tele_trap`), map + queue/archive stamps. Journal
rotated in this commit (crumb file added — fine).

## Intent vs deliverable

Subject promises three `mfndpos` arms for the `m_move` corpus owner
(amorphous-door exemption, ALLOW_DIG cursed-wield branch, fixed-tele-track
arm). Diff delivers all three plus the two canonical helpers. Matches.

## Inventory

Changed: `mfndpos` (three regions); new exported sync `is_pick`
(`js/objects.js:135`), `fixed_tele_trap` (`js/trap.js:865`) — `sym.mjs`
confirms both. New import *names* in mon.js (`hastrack`, `MON_WEP`,
`is_axe`/`is_pick`, `fixed_tele_trap`, `NO_WEAPON_WANTED`, `engulfing_u`)
— all pre-existing LIVE exports (re-points, no clones). No deleted symbols.

## C ↔ JS fidelity

C locus `mon.c:2139–2382` (via csym; arms read directly):

1. **Door arm** (`mon.c:2231–2238`): `IS_DOOR && !((amorphous(mdat) ||
   can_fog(mon)) && !engulfing_u(mon)) && ((CLOSED && !OPENDOOR) ||
   (LOCKED && !UNLOCKDOOR)) && !thrudoor → continue`. JS restructures to
   nested `if`s — logically equivalent given the omission — with
   `/* || can_fog(mon) */` commented inline + map-named. `engulfing_u`
   is a real C function and the JS const.js version matches
   (`u.uswallow && u.ustuck === mon`). ✓
2. **ALLOW_DIG arm** (`mon.c:2176–2191`): `!needspick → both; else if
   ((mw_tmp = MON_WEP(mon)) && cursed && weapon_check == NO_WEAPON_WANTED)
   → is_pick/is_axe split; else carried-tools`. JS is line-for-line the
   same including the `| 0` on `weapon_check`. ✓ (Prior JS had the cursed
   gate "deferred" per its own comment — now ported.)
3. **Tele-track arm** (`mon.c:2354–2370`): corrupt-ttyp `impossible()`
   guard (named-omit, comment; no JS impossible path — consistent with the
   rest of the port), then `fixed_tele_trap && hastrack → ALLOW_TRAPS`,
   else harmless/knows flow with the `info |= ALLOW_TRAPS` fall-through
   (confirmed present at `js/mon.js:2577`). ✓

Helpers: `is_pick` matches `obj.h:220` exactly (WEAPON/TOOL gate +
`P_PICK_AXE`); `fixed_tele_trap` matches `trap.h:125` (`TELEP_TRAP` +
`isok(teledest)`). Callee closure per arm: LIVE only
(`amorphous`/`needspick`/`m_carrying`/`MON_WEP`/`is_axe`/`t_at`/
`m_harmless_trap`/`mon_knows_traps`/`hastrack` all imported; `can_fog`
and `impossible()` OMIT with C citations). No STUB in a live arm.

Cycle check: `--can mon.js track.js/objects.js` reports ALREADY (names
added to pre-existing static imports — the commit message's "three new
edges … SAFE" overstates novelty, but the safety conclusion holds; no TDZ
risk, function-scope use).

## Hallucinations / overclaim

One real inaccuracy, in the D-log "Named" line, not the code: it says
"`is_pick` file-local clones in monmove/dig/apply still lack the oclass
gate" — but `js/apply.js:272` and `js/dig.js:1190` **have** the gate
(measured). The actually gateless clones are `js/monmove.js:474` and
`js/lock.js:1346` (lock.js unnamed anywhere). Debt item 1 below. The
corpus diagnosis (`rn2(1..4)` chcnt prefix + one-position-later `rn2(5)`
match) is concrete rng-diff evidence, not narrative.

## Density

Three arms of one C function + two canonical one-screen helpers, three
already-coupled modules. Right-sized; full 44/44 run voluntarily after
the heuristic skip. The scoreboard bonus flip (friday13 restore session)
is reported as bonus, not claimed as the falsifier. Fine.

## Verification

Re-ran `hidden-proxy.mjs verify m_move --base 30f0e9b7~1` myself:
`1 blocked → tour-Healer-70012 PASS → PROGRESS`. D-log claim true. Green
+ strict ×2 + cohort + full 44/44 per D-log. Rule #2 clean. No
FORCE/DIAG/seed/coordinate hits in the diff.

## Actionable C-wrongs

1. (Debt, map only) Fix the `is_pick`-clone note: `monmove.js:474` and
   `lock.js:1346` lack the `obj.h:220` oclass gate (divergent clones);
   `apply.js`/`dig.js` already have it — correct the D-1868 Named line
   and the map row, migrate the two clones to the canonical import when a
   nearby iter touches those files. Pre-existing divergence, not
   introduced here — not Must-fix.

Verdict: **ACCEPT-WITH-DEBT**
