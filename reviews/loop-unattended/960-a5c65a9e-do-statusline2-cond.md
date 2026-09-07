# Review 960 — a5c65a9e — botl.c do_statusline2 full cond list (D-1990)

- SHA: `a5c65a9e` — "botl.c do_statusline2 ports the full cond list (Stone/Slime/Strngl/Sick before hunger) + Hallu/Fly fidelity + COLNO reorder (D-1990)."
- D-id: D-1990. JS: `js/display.js` (+137/−84 across the hunk; new `./getline.js` edge). C locus: `nethack-c/upstream/src/botl.c` `:100–250` (cond `:165–211`, fit `:212–250`); `youprop.h` Stoned/Sick/Strangled/Slimed `:108–113`, Hallucination `:120`, Deaf `:125`, Levitation `:240`, Flying `:253–255` (all fetched this review).
- Verdict: **ACCEPT**

## Intent vs deliverable

Subject promises the full cond list in C order plus fit reorder.
Diff actually adds: fatal-four arms, hu/enc/Blind/Deaf/Stun/Conf/
Hallu/Lev/Fly/Ride in C order, `suppress_map_output` guard,
uen/gold clamps, piece assembly with overflow chain + mungspaces,
one new import. Promise matches deliverable.

## Inventory

- Changed: `_statusLine2` body (cond builder + fit chain), 2 import lists.
- New edge: `./getline.js` `mungspaces` (`--can` SAFE per D-log; hoisted, lazy).
- No deletions/re-points, so no `sym.mjs` delete audit owed.

## C ↔ JS fidelity

Cond vs `:165–211` ✓ exact order and strings (Stone/Slime/
Strngl/FoodPois/TermIll/hunger/enc/Blind/Deaf/Stun/Conf/Hallu/
Lev/Fly/Ride). Macro checks: C `Stoned/Sick/Strangled/Slimed`
are pure `uprops[].intrinsic`, while JS also makes/stoned paths
write flats (`potion.js:871/889`, `mhitu.js:1821`) and
`#wizintrinsic` writes uprops — so the flat-OR-uprops read is
required, matching the `intr_bits` precedent (timeout.js:259)
✓. Flying steed-`is_flyer` arm verified in the C macro ✓.
`Hallucination()` carries the resistance gate (display.js:943)
✓. Fit chain vs `:212–250` ✓: arm order, conditions (dx 0,
vrn 0), mungspaces on overflow arms only, MAXCO panic named.
`%-2d` pads + showvers named in D-log + code comment + map row
(startup.md:25). No RNG.

Callee closure: `mungspaces`/`is_flyer`/prop consts live or
same-module; `Hallucination`/`hero_Blind` pre-existing matched
helpers. No STUBs, no new clones.

## Hallucinations / overclaim

None — exemplary: the five misattributed same-owner rows are
dissected (polymon `u.mh`, menu pagination, eat `u.uhs`) with
byte-identical-step evidence, and the 1-worse is stash-proven
pre-existing drift rather than hidden.

## Density

+137 net in one function + edge, 13 corpus rows. Right-size per
§2b (one envelope: the status line).

## Verification

`verify do_statusline2 --base a5c65a9e~1` re-run this review →
"2 PASS, 8 moved past, 4 unchanged, 0 worse → PROGRESS"
(D-log said 0/8/4/1 REGRESSION on its baseline with the worse
stash-proven pre-existing; now 2 PASS via later fixes, 0 worse
— improvement, not drift). Green + strict + cohort 7/7 + full
44/44. `--rulecheck` clean (re-run). Added-line grep: no banned
tokens.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
