# Review 1097 — 98e0bb9e — polyman sticking release via exported uunstick (D-2131)

Metadata: SHA `98e0bb9e`, `js/polyself.js` +25/−3 and `js/uhitm.js`
+1/−10. Queue row `polyself.c` uunstick, scen-poly-Ranger-91131 step
207/243, screen-first at `polyself.c:1950`: C «The fire giant hits!
The fire giant is no longer in your clutches.--More--» vs JS «The
fire giant hits! You return to elven form!». No prior review claimed
closed (D-log notes review 212-87b4705a named uunstick only as a
shipped hmonas callee).

## Intent vs deliverable

Subject promises: `polyman` dropped the sticking release, so
rehumanize printed only the return-to-form line; fix wires the
release in. Diff actually adds: exported async `uunstick()` in
polyself.js (impossible + set_ustuck + Monnam pline), a `sticking`
capture at polyman entry with `if (sticking) await uunstick()` in C
position, deletion of the silent uhitm.js local clone, and one import
line re-point. Promise matches diff.

## Inventory

New/changed JS: `uunstick` (polyself.js:648, ASYNC per `sym.mjs`),
`polyman` (two added lines). Callees: `impossible` (pre-existing
display.js edge), `set_ustuck` (mhitu.js:1602 sync export — LIVE;
`--can js/polyself.js js/mhitu.js set_ustuck` → ALREADY statically
imports, same-edge extension, no TDZ risk), `Monnam`
(pre-existing do_name.js edge). `sticks` already imported
(polyself.js:27, engrave.js edge). uhitm.js re-points to the import
instead of its local clone — required `sym.mjs` output pasted:
`uunstick js/polyself.js:648 ASYNC`; `set_ustuck js/mhitu.js:1602
sync` + `ALSO 1 LOCAL CLONE(S) in 1 files: js/uhitm.js:1976`
(pre-existing, untouched, out of row scope — not this commit's
debt). No DIAG/FORCE/seed gates; `imports.mjs --rulecheck` clean.

## C ↔ JS fidelity

C locus `polyself.c:1940-1951` (`csym.mjs uunstick`, 12 lines):
`mtmp = u.ustuck`; `if (!mtmp) impossible(...)` + return;
`set_ustuck(0)` *before* `pline("%s is no longer in your
clutches.", Monnam(mtmp))`. JS is line-identical in order
(`set_ustuck(null)` before pline; null ≡ 0 here since both
set_ustuck impls normalize to null). Callers (`--callers`: mon.c:2930,
mon.c:5443, polyself.c:221, polyself.c:952, uhitm.c:5688, uhitm.c:5752):
this commit wires the `:221` polyman arm. C `polyman :199-268`
confirms both placements — `sticking` computed at entry from
`sticks(youmonst.data) && u.ustuck && !u.uswallow` (current poly
form, before `set_uasmon`), consumed after `u.uundetected = 0` and
before `find_ac()` + `urgent_pline`. JS matches both exactly.
The deleted clone's missing `impossible()` is now restored; both
hmonas call sites (uhitm.js:2030 `u.ustuck && ...`, :2075
`u.ustuck && u.ustuck !== mon`) keep C non-null guards, so the
impossible arm fires only on a C-precondition violation. No RNG in
the function; branch order confirmed, no clone, no stub, no omit in
the arm.

## Hallucinations / overclaim

None. "Exact C order" and "exact C position" both check out against
the cited ranges. The D-log does not claim the other five call sites
(mon.c:2930, :5443, polyself.c:952, uhitm :5688/:5752 are covered by
the import, not newly wired) — it names polymon :952 + mon.c:2930
as staying named, correctly scoped.

## Density

Small (+25/−3, +1/−10) but C is 12 lines plus a 2-line call site —
nothing more exists to port. One falsifier, one C locus, map note in
the same handoff. Right-sized per §2b.

## Verification

D-log Verify bullet shows `verify.mjs --fn uunstick` → hidden 1 PASS
(Ranger-91131) + green 2/2 + strict ×2 + cohort 7/7. Re-measured:
`hidden-proxy.mjs verify uunstick --base 98e0bb9e~1` → `1 PASS, 0
moved past, 0 unchanged, 0 worse → PROGRESS` (Ranger-91131: PASS).
Claim true, no vacuous check, no seed/step/coordinate reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
