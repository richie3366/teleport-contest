# Review 1164 — fb866daa — heal_legs call-site wiring (D-2198)

Metadata: SHA `fb866daa`, `js/eat.js` +44/−4, `js/steed.js` +13/−4.
D-log: D-2198. Queue: Open `do.c` heal_legs (map-driven, 0 blocked) +
sibling Open `do.c` legs_in_no_shape (scen-normal-Healer-91123).

## Intent vs deliverable

Subject promises: wire two unwired C `heal_legs(0)` call sites —
`eat.c:2558` (royal-jelly fpostfx tail) and `steed.c:236`
(mount_steed wizard-force heal). Diff actually adds: (1) `done_eating`
royal-jelly arm in `js/eat.js`; (2) wounded-gate rewrite in
`js/steed.js` `mount_steed` with `legs_in_no_shape` print + wizard heal
prompt. No more, no less. Promise kept.

## Inventory

New/changed JS: `done_eating` royal-jelly branch (`js/eat.js`);
`mount_steed` wounded gate (`js/steed.js`). New imports all same-edge:
`heal_legs` (eat.js←trap.js), `setuhpmax` (eat.js←exper.js),
`legs_in_no_shape` (steed.js←trap.js) — `imports.mjs --can` →
ALREADY on both checked edges, no new edge. Callees per sym:
`heal_legs` js/trap.js:3018 ASYNC (awaited ✓),
`legs_in_no_shape` js/trap.js:3003 ASYNC (awaited ✓),
`polymon` js/polyself.js:1072 ASYNC (awaited ✓),
`setuhpmax` js/exper.js:104 sync (called sync ✓),
`gainstr` js/attrib.js:554 ASYNC (awaited ✓),
`rehumanize` js/polyself.js:819 ASYNC (awaited ✓). All LIVE, no
clones, no stubs. Nothing deleted or re-pointed, so no sym census owed
beyond this.

## C ↔ JS fidelity

C loci (csym ranges): `do.c:2449–2486` heal_legs body (already live,
not touched); `eat.c:2540–2562` royal-jelly arm; `steed.c:228–238`
wounded gate; `youprop.h:136–138` Wounded_legs macro.

Royal-jelly, branch by branch vs `eat.c:2540–2562`: queen-bee morph
break (`formndx === PM_KILLER_BEE && !Unchanging && polymon(QUEEN)`
→ break) ✓; `gainstr(piece,1,true)` ✓; Upolyd `mh` vs hero `uhp`
`cursed ? -rnd(20) : rnd(20)` — single-draw ternary preserves C's
short-circuit (only one branch draws) ✓; `disp.botl` on the HP line
(JS also sets the house `flags.botl` mirror — file-wide idiom, not a
divergence) ✓; `u.mh > mhmax → !rn2(17) → setuhpmax(+1,FALSE) →
clamp` ✓; `mh<=0 → rehumanize()` ✓; `uhp<=0 → killer
KILLED_BY_AN "rotten lump of royal jelly" + done(POISONING)` ✓;
`!cursed → heal_legs(0)` ✓. RNG order identical (rnd(20), then
rn2(17) only on overflow). Confirm.

Mount gate vs `steed.c:228–238`: `legs_in_no_shape("riding", FALSE)`
restored where JS previously refused silently ✓; `Heal your leg%s?`
with the `(HWounded_legs & BOTH_SIDES)` plural quirk verbatim ✓;
`force && wizard && y_n=='y' → heal_legs(0)` else `return FALSE` ✓.
Two house idioms noted, neither a C-wrong: gate is
`u.Wounded_legs || (HWounded&TIMEOUT) || EWounded` (the canonical
shape shared with `js/trap.js:2977`; C macro is `HWounded||EWounded`
raw, but the flat cache is OR'd first so coverage is
broader-or-equal); wizard check is the file's `(debug||wizard)` idiom.
`y_n` awaited, no RNG drawn on this path either side. Confirm.

## Hallucinations / overclaim

None. D-log explicitly says heal_legs verify is vacuous (0 blocked)
and ships on public gates + the side-effect `legs_in_no_shape` PASS —
no "Match C" laundering of a stub; every callee above is LIVE.

## Density

57 js insertions for one tight caller/callee cluster (fpostfx arm +
its heal_legs site + the steed gate), retiring two queue rows. §2b
right-sized.

## Verification

D-log Verify bullet: syntax 2 files, rule2, green 2/2, strict ×2,
cohort 7/7, full 44/44 — plus `verify legs_in_no_shape` → 1 PASS
PROGRESS. Re-measured myself:
`verify legs_in_no_shape --base fb866daa~1` →
`1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS`
(Healer-91123 PASS at baseline-blocked step). Claim true, no D-1831
regression shape. `imports.mjs --rulecheck` → clean (re-run this
iteration). No FORCE/DIAG/seed/coordinate in the hunks.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
