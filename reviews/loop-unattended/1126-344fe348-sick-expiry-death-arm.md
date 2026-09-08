# Review 1126 — 344fe348 — timeout.c SICK expiry death arm (D-2160)

Metadata: SHA `344fe348`, js/ +57/−5 in `timeout.js` only (import
names + one arm). D-log D-2160. Subject promises: the missing
`case SICK` in the `nh_timeout` uprops-expiry switch
(`timeout.c:692–724`, explicitly NOT `sickness_dialogue` `:322`);
food-poisoning recovery vs "You die from your illness." +
`done_timeout(POISONING, SICK)`; scen-intrinsic-Rogue-91111 PASS
(rngM 3495/3495, scrM 134/134). JS had eaten the More-dismissal
space as «Unknown command ' '.» because the death line never
printed.

Intent vs deliverable: promise matches diff. Actually adds: the
`p === SICK` arm (recovery branch + death tail) plus 9 names
(SICK_ALL, POISONING, LOW_PM, make_sick, acurr, adjattrib, the,
name_to_mon, type_is_pname) appended to existing import lists —
all on ALREADY edges, no new module edge. No scope creep.

Inventory: one new arm, no new functions. Callee closure per
`sym.mjs`: `make_sick → js/potion.js:946 ASYNC` (awaited),
`acurr → js/attrib.js:98 sync`,
`adjattrib → js/attrib.js:491 ASYNC` (awaited),
`the → js/objnam.js:1569 sync`,
`name_to_mon → js/mondata.js:405 sync`,
`type_is_pname → js/do_name.js:587 sync`,
`find_delayed_killer/dealloc_killer → js/end.js sync` — all LIVE.
Two `sym.mjs` cautions checked and cleared: `the` and
`type_is_pname` each have a local clone in one *other* file, but
this commit imports the real exports rather than cloning — the
correct resolution. `done_timeout` is a pre-existing local clone
(`js/timeout.js:685`, already serving the STONED arm), not
introduced here; this session's full PASS exercises it through
the POISONING path. Nothing deleted or re-pointed.

**C ↔ JS fidelity**: confirmed against pinned C, read directly
(`timeout.c:670–724`): expiry loop
`if ((intrinsic & TIMEOUT) && !(--intrinsic & TIMEOUT))` with
`kptr = find_delayed_killer(idx)` (`:670–673`), then `case SICK`
(`:692–724`). JS gate `!(next & TIMEOUT) && p === SICK` matches
the house pattern of the sibling STONED/SLIMED arms. Branch walk:
`find_delayed_killer(SICK)` first; short-circuit
`(usick_type & SICK_NONVOMITABLE)==0 && rn2(100) < ACURR(A_CON)`
(JS `&&` skips the draw exactly like C); recovery `You(...)` +
`make_sick(0,NULL,FALSE,SICK_ALL)` + `exercise(A_CON,FALSE)` +
`adjattrib(A_CON,-1,1)` + `break` (JS if/else skips the death
tail, so `usick_type=0` stays death-path-only per C); death
`urgent_pline` (`:703`), killer delayed-entry-else-KILLED_BY_AN
(`:704–710`), `dealloc_killer`, `name_to_mon >= LOW_PM` →
`type_is_pname`→KILLED_BY / G_UNIQ→`the()`+KILLED_BY (`:713–721`),
`done_timeout(POISONING, SICK)` + `usick_type = 0` (`:722–723`;
JS correctly guards the tail with the gameover return since C
`done()` is noreturn unless life-saved). Arm position between
SLIMED and STRANGLED is immaterial (independent `p ===` guards,
no fallthrough — C order STONED/SLIMED/VOMITING/SICK needs no
positional match). Single `rn2(100)` call-for-call. "Named: none"
accurate; no STUB in a live arm.

Hallucinations / overclaim: none. One naming wrinkle, disclosed
in the D-log itself: the corpus verify key is `sickness_dialogue`
while the locus is the `case SICK` expiry arm ("NOT
`sickness_dialogue`"). No dispatch-vs-callee overclaim.

Density: ~50 js/ insertions for a 33-line C arm plus 9 import
names — right-sized. (Full `sessions` skipped per matrix:
single-module change.)

Verification: D-log bullet shows `verify.mjs
--fn sickness_dialogue` → syntax + rule2 + hidden full PASS +
green/strict + cohort 7/7. Re-measured:
`hidden-proxy.mjs verify sickness_dialogue --base 344fe348~1` →
"1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS"
(Rogue-91111 PASS). True claim. Diff grep: no FORCE/DIAG/seed/
coordinate gates.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
