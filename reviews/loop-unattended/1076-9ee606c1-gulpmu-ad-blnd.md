# Review 1076 — 9ee606c1 — gulpmu AD_BLND engulf blinding

Metadata: SHA `9ee606c1`, D-2110, `js/mhitu.js` only (65 lines).
No prior review claims this SHA.

Intent vs deliverable: the subject promises the swallowed-hero AD_BLND
arm ("You can't see in here!").
The diff delivers exactly that: new local `gulpmu_can_blnd(mtmp, mattk)`
(the `can_blnd` projection for obj NULL) + the AD_BLND arm in C order.

Inventory: one new helper (local clone), one extended arm;
no new imports.

**C ↔ JS fidelity**: C arm `mhitu.c:1471–1484`, call-for-call:

```c
case AD_BLND:
    if (can_blnd(mtmp, &gy.youmonst, mattk->aatyp, (struct obj *) 0)) {
        if (!Blind) {
            long was_blinded = Blinded;
            if (!Blinded)
                You_cant("see in here!");
            make_blinded((long) tmp, FALSE);
            if (!was_blinded && !Blind)
                Your1(vision_clears);
        } else
            incr_itimeout(&HBlinded, 1L);
    }
```

JS matches: outer `!Blind()` where local `Blind()` (mhitu.js:618) ≡ C
`Blind` (`youprop.h:103` `(HBlinded||EBlinded) && !BBlinded`, plus
pre-existing roleplay/ublind extensions outside this diff);
`was_blinded = HBlinded && !BBlinded` ≡ C `Blinded` (`youprop.h:92`);
`make_blinded(tmp, false)` is the live `do.js` import (talk FALSE ✓);
the else-branch TIMEOUT-mask arithmetic replicates `incr_itimeout` +1.

Clone `gulpmu_can_blnd` vs C `can_blnd` (`mondata.c:304–398`):

- haseyes ✓ (perma-blind N/A — mdef is you)
- raven-vs-raven via `mons()` identity ✓
- EXPL / BOOM / GAZE / MAGC / BREA: mcan + resists ✓
  (`resists_blnd_you` live)
- WEAP / SPIT / NONE → false ✓ (obj NULL makes C's cream-pie / venom /
  potion arms unreachable)
- ENGL `EBlinded || Unaware || ucreamed` ✓ — the identical expression
  already sits at mhitu.js:1693, established idiom, not invented here
- CLAW ublindf ✓, with the visor scan explicitly named as omission
  (same debt as `can_blnd_u`)
- TUCH / STNG mcan ✓; default TRUE ✓

RNG: all arms draw-free ✓ (session replay 4392/4392 positional cited).
No `sym.mjs` re-point applies (no symbol deleted or re-pointed; all
callees pre-existing live or same-module locals).

Hallucinations / overclaim: none — and credit: the D-log explicitly
reports `verify gulpmu` NO MOVEMENT on Monk-92194 (AD_DREN arm, a
different pre-existing omission) instead of hiding it.

Density: 65 insertions, one C arm family + its gate clone — §2b ok.

Verification: D-log cites hidden 0 / 1-moved / PROGRESS
(Wizard-92223 → look_here@121).
Re-measured (`--base 9ee606c1~1`):

```text
scen-genesis-Wizard-92223: moved → look_here at step 121 (was 108)
verify dolook: 0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS
```

Matches. No seed / step / coordinate read.

**Actionable C-wrongs** (debt, not Must-fix — latent, zero observable
effect today; map-pointed in turns.md D-2110 row as R-1076):

1. The AD_BLND else-branch writes `u.HBlinded` inline
   (mhitu.js:1845–1846) without syncing the
   `u.uprops[BLINDED].intrinsic` mirror the canonical setter maintains
   (`do.js:2748–2758` "C: same storage via macro").
   C has one storage; JS has two mirrors that must agree.
   Currently nothing reads `.intrinsic` (every site is a write: do /
   polyself / timeout), so no live divergence — but the next reader of
   the mirror inherits a stale value.
   One-iter fix: route through the canonical setter path (export
   `incr_itimeout_HBlinded`, currently a do.js local per `sym.mjs`)
   or mirror-sync inline, and note it in the map section.

Verdict: **ACCEPT-WITH-DEBT**
