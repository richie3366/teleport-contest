# Review 2343 — 14e98dbc1 — losehp showdamage/rehumanize + BARRACKS/wake arms

**SHA:** `14e98dbc1` — "`hack.c` losehp showdamage/rehumanize + check_special_room BARRACKS/wake_msg arms (D-3388)."
**Scope:** js/hack.js +105/−37 (captures, 2 finishers, showdamage param, BARRACKS, wake_msg), js/end.js +7/−1 (drains). 2 functions + 1 helper — per-function blocks below.
**Prior reviews closed:** none.
**Addressed:** D-3446 `7d9b2864f`

## Intent vs deliverable

Promise: losehp's two showdamage sites via a snapshot queue, the Upolyd mh<1 arm converted from wrong-fatal to deferred rehumanize, and check_special_room's BARRACKS/wake_msg arms — all three ledger rows to ported. Delivered exactly; the old fatal-treatment of poly mh<1 (mh=0 + gameover + killer) is deleted, which the C body (:4275–4276 bare `rehumanize();`) confirms was C-wrong. No drift in `js/`; one stale ledger note (see Actionable 1).

## Inventory (per function)

| # | JS change | Kind | C locus (csym range) |
|---|-----------|------|----------------------|
| L1 | showdamage captures ×2 :1909–1913/:1930–1934 | missing sites (deferred) | hack.c:4255–4292, :4269 + :4280 |
| L2 | rehumanize flag :1936–1943 (fatal block deleted) | C-wrong fix + missing arm | hack.c:4275–4276 |
| L3 | finish_losehp_showdamage :1959 + finish_losehp_rehumanize :1974 | new finishers (drain-first ×2) | :4269/:4280 + :4275–4276 |
| L4 | showdamage hpLeft param :1889–1899 | additive snapshot (mdamageu unchanged) | hack.c:4247–4253 |
| C1 | BARRACKS 4-chain :3112–3119 | missing arm | hack.c:3702–3710 |
| C2 | wake_msg await :3179 | missing call | hack.c:3773 |

No deletion/re-point; no re-point sym owed. Sym: `wake_msg mon.js:1616 ASYNC` (awaited ✓, ALREADY edge), `rehumanize polyself.js:1224 ASYNC` (awaited, lazy import — no static back-edge ✓ D-2349), `monstinroom` in-file local (C staticfn, all 4 C sites in hack.c — sym's "clone" flag is a same-file-static false positive). PM_SOLDIER/SERGEANT/LIEUTENANT/CAPTAIN mirror the PM_ORACLE `monsterNames.indexOf` precedent. No stubs, no new clones.

## C ↔ JS fidelity

**losehp — Confirm.** Captures gate on `showdamage && n` ≡ C's `!showdamage||!dmg` early-out (:4249–4250); snapshots are post-decrement mh/uhp, which is exactly what C prints (showdamage runs right after the decrement, before the clamp — and the clamp only raises max, never current ✓ comment accurate). Drain replays in capture order with explicit hp, bypassing the Upolyd selection correctly. Rehumanize: flag-only, no killer/gameover/clamp — C sets none (verified in body) and returns for callers to continue ✓; drain order showdamage→rehumanize→done/wail matches C (:4269 before :4276 before any branch end) in BOTH finishers, so single-finisher sites still drain ✓. Flag-drop on newly-died rehumanize is the right noreturn analogue (avoids double-death from JS-continued calls C never reached; guarded by wasGameover ✓). Multi-call coalescing (C would rehumanize on the first mh<1, JS once at drain) is the D-log-named omit, same class as the done/wail flags. `#if 0` block correctly named compiled-out. No RNG added. Convention limitation (no action — same class as done/wail): message ORDER vs C when the option is on (drain-time vs immediate print) and stale-drain windows on sites that never drain; the option defaults off in all scored paths.

**check_special_room — Confirm.** BARRACKS 4-mon `||` + both strings verbatim (`You()` ≡ "You "+… ✓). Wake: `!Stealth && !rn2(3)` guard pre-existing with DEADMONSTER/isok/roomno checks matching C :3766–3770; the added `await wake_msg(mtmp,false)` sits before sleep-clear exactly like :3773. No RNG added (rn2 position kept).

**Callers:** losehp still sync — no per-site edits needed ✓ (the design point); check_special_room unchanged signature, 9 JS sites inherit ✓. The two disclosed unwired C callers are tracked elsewhere, not this SHA's: priest.c:126 has its own live Open row; restore.c:949 sits in unported dorecover (welcome-then-check load path — ships-with, standard). No JS call from a non-C site.

```c
/* hack.c:4267–4278 */ u.mh -= n; showdamage(n);
    if (u.mhmax < u.mh) u.mhmax = u.mh;
    if (u.mh < 1) rehumanize();
    else if (n > 0 && u.mh * 10 < u.mhmax && Unchanging) maybe_wail();
/* hack.c:3771–3774 */ if (!Stealth && !rn2(3)) {
        wake_msg(mtmp, FALSE); mtmp->msleeping = 0; }
```

## Hallucinations / overclaim

None. The "124 sites / 67 drain sites / 24 files" structural claims are consistent with the read code (sync-in/drain-out split verified at both finishers); the /tmp probe's 11/11 is uncommitted but its assertions match the code paths.

## Density

Breadth §2b: 2 same-file functions (+1 helper param), each with own C-locus/Callers/Verify/Named sub-bullets and own `Ledger:` entry; no Must-fix bundled. ~105 insertions. Per-function verdicts: both whole. Unanimous modulo the recording debt.

## Verification

Re-measured (`verify losehp,check_special_room,showdamage --base 14e98dbc1~1 --reach-all`): 0 blocked + vacuous-note each, 3× smoke 24/24 REACH-OK — matches the D-log (which shows 2×; showdamage identical), 0 regressed. D-log Verify also shows green 2/2 + strict ×2 + cohort 7/7 + full 44/44 (shared files) → VERIFY: PASS. Verbatim:

```text
smoke losehp: no RNG-tagged reach; fixed smoke spread (24 run, 10.9s): 24 PASS, 0 regressed → REACH-OK
smoke check_special_room: no RNG-tagged reach; fixed smoke spread (24 run, 11.1s): 24 PASS, 0 regressed → REACH-OK
``` Diff grep: no FORCE/DIAG/RNG-log/fastforward/coordinate hits. Rule #2: clean (iteration-wide run, cited in 2338).

## Actionable C-wrongs

1. **showdamage ledger row keeps a stale "measured MISSING" note (refresh bug, same family as 2333.1/2336.1).** The flip correctly deleted the row's `rounddiv`-bullet omit (a 2333-family paste error — this SHA cleans rather than adds), but `note:"refresh: no JS symbol (measured MISSING)"` contradicts the row's own `js:["js/hack.js:showdamage"]` + ported status. Fix in one iter with the planned 2333.1/2336.1 ledger pass (CURRENT already scopes it — now five rows): `ledger.mjs set showdamage ported` with a true note (or note-clear). Docs-only; zero behavioral impact. Source: reviews/loop-unattended/2343-14e98dbc1-… (debt, not Must-fix).

Verdict: **ACCEPT-WITH-DEBT**
