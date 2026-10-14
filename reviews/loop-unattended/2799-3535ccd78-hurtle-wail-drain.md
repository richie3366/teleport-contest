# Review 2799 — 3535ccd78 — hurtle_step drains done + wail after losehp

- **SHA:** `3535ccd78` (Wed 2026-10-14) — cliffs-head writer (D-3949).
- **D-entry:** D-3949. **Ledger:** `hurtle_step` D-tagged ported.
- **Diff size:** `js/dothrow.js` +15/−0, +1 test.
- **Method:** cliff (≤10 fns) — whole Method on the drain + movement re-measure.

## Intent vs deliverable (promise vs diff)

The subject promises: the `if (why)` collision arm drains the fatal
done-gate then the deferred wail in C order before `wake_nearto`,
suspending the knockback chain at s577 (HP:12) and landing the wail +
mdamageu at s578, moving Healer-50055087 to s1028.

The diff adds exactly that drain. Promise and diff agree.

## Inventory

| # | JS change | C source | Status |
|---|-----------|----------|--------|
| 1 | done-gate after `losehp` (lazy `./end.js`, return false on true death) | losehp :4284–4288 (`done(DIED)` noreturn) | exact |
| 2 | `await finish_maybe_wail()` before `wake_nearto` | losehp :4289–4291 + `maybe_wail` :4210–4243 | exact |
| 3 | hurtle-wail-drain test (s577/s578 pins) | — | fail→pass per D-log |

No helper, no new module edge (lazy `./end.js` import sites pre-exist
at dothrow.js:1756/1775/2010; `finish_maybe_wail` already imported at
:22, LIVE export hack.js:2007). `hurtle_step` was already ported
(D-3218); D-3949 appended — an honest touch.

## C ↔ JS fidelity

C `hurtle_step` :834–839: `dmg = rnd(2 + *range); losehp(...);
wake_nearto(x, y, 10); return FALSE` — with `losehp` inline, so a
fatal hit `done(DIED)`s at :4284–4288 and never reaches `wake_nearto`,
while survival with `n > 0 && uhp*10 < uhpmax` prints `maybe_wail()`
at :4289–4291 (throttle `moves <= wailmsg + 50`, :4210–4243) whose
`--More--` wait suspends the chain. JS reproduces the order on both
paths: fatal → `finish_losehp_done()` (drains showdamage +
rehumanize first per its own C-order comment, then `You die...` +
`done`) and returns false only when gameover survives (lifesave
resumes); survival → `finish_maybe_wail()` (showdamage +
rehumanize + wail, no-op when `_needs_maybe_wail` is unset) then
`wake_nearto`. This is the established dig.js falling-rock shape
(:1402–1412), now in its third call site. Callers unchanged and
pre-wired (D-3218); C `maybe_wail` callers are losehp's two elif arms
only, both setting the JS flag. ✓

One fix, two heals: pre-fix code not only skipped the wail's
More-wait but also skipped `done(DIED)` on fatal hurtles (the sync
`losehp` only set `_losehp_needs_done`) — the drain heals death too,
in C order.

Diff grep: no FORCE/DIAG/`getRngLog`/seed/fastforward/coords. Rule #2
clean (iteration-wide, SHA 2796).

## Hallucinations / overclaim

None. The "1 stale-baseline WORSE" is disclosed with a stash A/B
proof and correctly attributed off this fix; the vacuous
`verify hurtle_step` is not sold as a PASS (the reach line carries
the evidence: 19/19).

## Density

Cliff discipline holds: one writer, one arm, probe session +451
agreed screens with RNG untouched (rngM identical 69395 — the s1028
gnome-identity divergence pre-existed behind the screen mask, as
disclosed).

## Verification

Re-measured myself
(`verify do_statusline2,hurtle_step --base 3535ccd78~1 --reach-all`):

```
verify do_statusline2: 0 PASS, 12 moved past, 8 unchanged, 0 worse → PROGRESS
reach hurtle_step: 19 baseline-PASS reach it: 19 PASS, 0 regressed → REACH-OK
```

Probe Healer-50055087: 577→m_move@1028 ✓ (exact D-log landing). The
ship-time "worse" session (Healer-50058517) moved 0→298 here —
confirming pre-existing drift, not this fix. No REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
