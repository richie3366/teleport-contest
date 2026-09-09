# Review 1159 — caa4ff0d — expels tail land-hard + spoteffects

Subject promises: `mhitu.c` expels tail — `um_dist` land-hard pline + `spoteffects(TRUE)` (D-2193, queue owner `look_here`, 1 session moved past).
Diff actually adds: `js/mhitu.js` `expels` tail (+14/−2: `um_dist` gate + Brrooaa pline + dynamic-import `spoteffects(true)`) + `export` on `um_dist` in `js/mon.js` (+1/−1). Nothing else.

## Intent vs deliverable

Promise matches diff. The diagnosis (look_here already arm-for-arm per D-1835/D-1599, `spoteffects→pickup(1)` already live —
a re-port of either would be NO MOVEMENT; the writer is the expels tail) is argued from reads, not assumed. Recorded case:
screen-first at step 121 with 0 blocked RNG (4392/4392 matched); step keys show step 120 `.` → C «You get expelled!--More--»,
step 121 ` ` (More dismissal) → feel-floor message — the post-expulsion trap/autopickup path never ran in JS.

## Diff (`js/mhitu.js` tail hunk)

```js
    // C: mnexto(mtmp, RLOC_NOMSG) — expel must not STRAT_APPEARMSG
    await mnexto(mtmp, RLOC_NOMSG);
    newsym(game.u.ux, game.u.uy);
+    /* C mhitu.c:302-304 — the monster may fail to land next to the hero. */
+    if (um_dist(mtmp.mx, mtmp.my, 1)) {
+        await pline('Brrooaa...  You land hard at some distance.');
+    }
+    /* C mhitu.c:305 — expulsion ends on the new square: trap +
+     * autopickup (Blind hero feels the floor here via look_here).
+     * Dynamic import: pickup.js already imports this module (mdamageu). */
+    const { spoteffects } = await import('./pickup.js');
+    await spoteffects(true);
```

`js/mon.js`: `function um_dist` → `export function um_dist`, added to mhitu.js's existing mon.js import line — no new static edge.

## Inventory

- `expels` (`js/mhitu.js`): tail only; message arms/unstuck/mnexto/newsym untouched.
- `um_dist` (`js/mon.js`): visibility change only.

## C ↔ JS fidelity

C `mhitu.c:263–306` (`node scripts/csym.mjs expels`) tail verbatim:

```c
    unstuck(mtmp); /* ball&chain returned in unstuck() */
    mnexto(mtmp, RLOC_NOMSG);
    newsym(u.ux, u.uy);
    /* to cover for a case where mtmp is not in a next square */
    if (um_dist(mtmp->mx, mtmp->my, 1))
        pline("Brrooaa...  You land hard at some distance.");
    spoteffects(TRUE);
```

JS appends exactly this sequence after the pre-existing `mnexto`/`newsym` lines, in C order, awaited where async.
`um_dist` matches C `apply.c:691–695` (`abs(ux-x)>n || abs(uy-y)>n`, Chebyshev; `|0` coercions only) — verified CLONE, and the
commit exports the existing clone rather than adding one.

Callee closure:

| symbol | status | use |
|--------|--------|-----|
| `spoteffects` | LIVE `js/pickup.js:1913`, ASYNC | awaited ✓ |
| `um_dist` | verified CLONE (C `apply.c:691–695`) | existing mon.js import widened ✓ |

No STUB/OMIT in the arm. Cycle handling is correct and evidenced: `js/pickup.js:111` statically imports `mhitu.js`
(`mdamageu, digests`), so the dynamic `import('./pickup.js')` follows the file's house idiom (`invent.js`/`eat.js`/`spell.js`
dynamic precedents at mhitu.js:1603/2240/2248) instead of closing a static cycle. No deleted/re-pointed symbols.

## Hallucinations / overclaim

None. "Dispatch ported, callee live" holds on both callees; the "expels is now complete" claim enumerates only arms present
in the C range.

## Density

~15 JS lines for a 7-line unported C delta, all-live envelope — stated density exception, legitimate.

## Verification

D-log claims `verify --fn look_here` PROGRESS (Wizard-92223 121→130, steps 121–129 byte-match, RNG 4392/4392) + green/strict/cohort
+ full 44/44, and pre-discloses that the step-130 "js-throw" label is the null-owner fallback (`hidden-proxy.mjs:388`), not an
exception, with direct-replay `error null`. Re-measured:

```text
verify look_here: baseline caa4ff0d~1 (scoreboard at e66b8789) — 1 session(s) blocked on it (1 at baseline, 0 in the working scoreboard)
  scen-genesis-Wizard-92223: moved → js-throw at step 130 (was 121)
verify look_here: 0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS
```

The move corroborates (9 steps byte-matched forward); the residual owner label matches the D-log's own disclosure, which names
the step-130 swallow-release-state writer and routes it to the rescore rather than re-queueing look_here. Diff grep: no
FORCE/DIAG/getRngLog/seed/coordinate gates. Rule #2 clean (re-run this iteration).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
