# Review 2747 — a7b741138 — cursetxt live Invis

Metadata: SHA `a7b741138`, D-3890, `js/mcastu.js` only (+ committed
test), 1 function. Cliff-phase writer fix.

Intent vs deliverable: subject promises the `:69` Invis arm now reads
the live `timeout.js Invis()` instead of stale flats, moving
Cave-582707 s900 to PASS. Diff actually adds: `Invis as hero_Invis`
added to the existing timeout import edge, and the flat read replaced
by `hero_Invis()` with a youprop.h:198 cite. Promise = diff.

Inventory: `cursetxt` (js/mcastu.js:900) — changed, Invis predicate only.

C ↔ JS fidelity: C `nethack-c/upstream/src/mcastu.c:62-85` (via
`csym.mjs`): `else if ((Invis && !perceives && (mux≠ux||muy≠uy)) ||
is_obj_mappear(STRANGE_OBJECT) || u.uundetected)` →
"general direction"; `else if (Displaced && mux≠)` → "displaced image";
else "at you, then curses"; unseen arm `(!(moves%4)||!rn2(4))` + `!Deaf`
→ mumbled curse. JS keeps this exact arm order and predicates; only the
`Invis` atom changed from flats to the live reader. Macro check: C
`Invis` is `((HInvis || EInvis) && !BInvis)` (youprop.h:198);
`timeout.js Invis()` (js/timeout.js:1752) computes `!!(H||E) &&
!BInvis()` from live uprops — the same reader `set_apparxy`/`m_move`
use. Classification: C-callee import (aliased `hero_Invis` per the
file's `hero_Hallucination` convention), not a clone; added to an
already-present timeout edge, so no new edge. The Displaced arm's
deliberate stay-on-flats is justified by the D-3763 C-field measurement
cited in the subject — a measured exception, not a miss. The two readers side by side:

```c
#define Invis ((HInvis || EInvis) && !BInvis)   /* youprop.h:198 */
```

```js
export function Invis() {                        /* js/timeout.js:1752 */
    const u = game.u || {};
    const p = u.uprops?.[INVIS];
    const H = (u.HInvis | 0) || (p?.intrinsic | 0);
    const E = (u.EInvis | 0) || (p?.extrinsic | 0);
    return !!(H || E) && !BInvis();
}
```

— flats-or-live H/E union (superset of C's H/E, stale-safe) AND-NOT the
live BInvis gate, exactly the D-1999 reader contract. The deleted JS
(`!!(u.Invis || u.HInvis || u.EInvis)`) dropped the `!BInvis` conjunct
as well as liveness; the measured session state (worn-item extrinsic,
zero flats) fired through the live-uprops half. No RNG in the seen
arms; the unseen arm's `(!(moves%4)||!rn2(4))` short-circuit plus `!Deaf`
gate are untouched.

Hallucinations / overclaim: none. Evidence is C-state-measured
(temp-TMLOG: liveInvis=true vs flatInvis=false, stale mux), reverted
after. No dispatch-over-stub: `perceives`, `pline_mon`, `Deaf` gate all
live.

Density: one cliff writer, whole-function claim (`:63–85`) now true,
one probe session, movement claimed. Ledger touch present.
Session-reaching, message-only (full RNG matched, 1 screen).

Verification: re-measured myself. `verify cursetxt --base a7b741138~1
--reach-all`: 1 blocked at baseline, `scen-sweep-Caveman-582707: PASS`,
`1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS`, reach 69/69
REACH-OK. D-3890 movement claim reproduces; no REGRESSED row. `sym.mjs
Invis`: exported sync at timeout.js:1752 (4 pre-existing clones
elsewhere untouched, out of scope). Rule #2 clean (checked this
iteration). No FORCE/DIAG/seed/coordinate reads in the diff.

Actionable C-wrongs: none.

Verdict: **ACCEPT**
