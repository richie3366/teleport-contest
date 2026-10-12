# Review 2746 — 98181c650 — disintegrate_arm surface()

Metadata: SHA `98181c650`, D-3889, `js/do_wear.js` only (+ focused test),
1 function. Cliff-phase writer fix.

Intent vs deliverable: subject promises the suit arm's hardcoded "the
ground" replaced by `surface(u.ux, u.uy)`, moving Barb-582708 s472 to
PASS. Diff actually adds: the `surface` import plus the one-line
interpolation with the `:3226–3229` cite. Promise = diff.

Inventory: `disintegrate_arm` (js/do_wear.js:4294) — changed, suit arm
only.

C ↔ JS fidelity: C `nethack-c/upstream/src/do_wear.c:3200-3256` (via
`csym.mjs`): the suit arm is `urgent_pline("Your %s %s to dust and %s
to the %s!", suit, vtense(suit,"turn"), vtense(suit,"fall"),
surface(u.ux, u.uy))`. JS now interpolates exactly `surface(u.ux, u.uy)`
in the same position with the same `vtense` verbs. `surface` is LIVE:
exported sync at js/sit.js:474, a full C-shaped body (u_at/swallow,
air, pool, ice, lava, bridge, altar, grave arms visible). Classification:
C callee import, not a clone. Verbatim C arm (do_wear.c:3226–3229):

```c
urgent_pline("Your %s %s to dust and %s to the %s!",
             /* suit might be "dragon scales" so vtense() is needed */
             suit, vtense(suit, "turn"), vtense(suit, "fall"),
             surface(u.ux, u.uy));
```

against the new JS:

```js
await urgent_pline(
    `Your ${suit} ${vtense(suit, 'turn')} to dust and `
    + `${vtense(suit, 'fall')} to the ${surface(u.ux, u.uy)}!`,
);
```

— same verbs, same interpolation slot. Minor subject imprecision in the
safe direction: it claims a "new edge (IN-SCC)" but `imports.mjs --can`
reports ALREADY — do_wear.js statically imports sit.js already, so no
new edge at all. The imported `surface` (js/sit.js:474) walks the full
C arm ladder (swallow-maw/husk, air/cloud, pool-bottom/water, ice, lava,
bridge, altar, grave, floor/ground) rather than a floor-only stub. No
RNG in the arm.

Hallucinations / overclaim: none. The pre-existing
`armor_doff_simple_name` name-polish omission is honestly kept as named,
not claimed fixed ("mail" already matched).

Density: one cliff writer, one arm, one probe session, movement claimed.
Ledger touch present. Session-reaching.

Verification: re-measured myself. `verify disintegrate_arm --base
98181c650~1 --reach-all`: 1 blocked at baseline,
`scen-sweep-Barbarian-582708: PASS`, `1 PASS, 0 moved past, 0 unchanged,
0 worse → PROGRESS`, smoke 24/24 REACH-OK. D-3889 movement claim
reproduces; no REGRESSED row. `sym.mjs surface`: exported sync,
js/sit.js:474 (pasted above via the --can/sym run). Rule #2 clean
(checked this iteration). No FORCE/DIAG/seed/coordinate reads in the
diff.

Actionable C-wrongs: none.

Verdict: **ACCEPT**
