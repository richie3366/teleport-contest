# Review 1125 — 43f6a519 — fprefx full C port incl. tripe vomit gate (D-2159)

Metadata: SHA `43f6a519`, js/ +152/−57 in `eat.js` only (one
function rewritten). D-log D-2159. Subject promises: full C port
of `fprefx` including the tripe `rn2(2)` vomit gate;
scen-wish-Knight-92105 moves fprefx@99 → next_ident@151 (+52
steps, later owner). Toplines were identical («Yak - dog food!
You finish eating the tripe ration.») — JS skipped the tripe-arm
draw, shifting every later draw.

Intent vs deliverable: promise matches diff. Actually adds:
EGG / FOOD_RATION / TRIPE_RATION / LEMBAS_WAFER / MEAT* / GARLIC /
default arms rebuilt with a `feedback` flag emulating C's `goto
give_feedback`; local `Race_if` (you.h macro, house pattern per
makemon.js:655); 4 object-type consts; import-name extensions on
pre-existing edges. No scope creep.

Inventory: one rewritten private function, no new exports. New
imports all LIVE per `sym.mjs`: `humanoid/is_orc/is_elf →
js/monsters.js sync`, `more_experienced → js/exper.js:256 sync`,
`newexplevel → js/exper.js:279 ASYNC` (awaited),
`explode → js/explode.js:397 ASYNC` (awaited),
`EXPL_FIERY → js/const.js` const; `explode.js` edge ALREADY, rest
on existing edges. `MEAT_RING` const pre-existed (`eat.js:147`);
`Upolyd`/`hero_form_data` pre-existed. Nothing deleted or
re-pointed.

**C ↔ JS fidelity**: confirmed against
`nethack-c/upstream/src/eat.c:2098–2217` (csym range), arm by arm.
EGG: pyrolisk useup/useupf + `explode(ux,uy,−11,d(3,6),0,
EXPL_FIERY)` + FALSE; stale_egg (`moves−age > 800`, obj.h:316)
rotten-egg + `make_vomiting(Vomiting&TIMEOUT + d(10,4), TRUE)`;
else feedback — match. FOOD_RATION thresholds (≤200 / <700) and
both Hallu variants match, no feedback — match. TRIPE:
carnivorous&&!humanoid → orc (`maybe_polyd` ≡
`Upolyd ? is_orc : Race_if`, youprop.h:22) → else Yak +
`more_experienced(1,0)` + `newexplevel()` +
`rn2(2) && !CANNIBAL_ALLOWED()` → `make_vomiting(rn1(reqtime,14),
FALSE)` — order and short-circuit match, including the
previously missing XP/vomit draws that shifted the keystream (the
old code printed only «Yak - dog food!» and returned). LEMBAS
orc/elf/feedback, MEAT quartet feedback, GARLIC undead-vomit vs
`iter_mons(garlic_breath)` + FALLTHROUGH — match. Default:
SLIME_MOLD fruit match; cursed-APPLE sleep-gated silence;
MACOS APPLE arm catching APPLE before the UNIX PEAR/joke arm
(correct `#if` nesting emulation — C prints Macintosh for APPLE
regardless of Hallu, joke ladder for PEAR only); `give_feedback`
adjective ladder including `grody!`/`gnarly!`, which old JS lacked
— match. "Named: none" is accurate: even the APPLE-cursed arm's
silence is ported behavior, not an omit. No STUB in a live arm.

Hallucinations / overclaim: none. The old undead-garlic arm
(returning true with the vomit draw deferred and never made) was
a genuine C-wrong, now fixed; the D-log does not oversell it.

Density: ~95 net js/ insertions for a 120-line C function —
right-sized. (Full `sessions` skipped per matrix: single-module
change, cohort suffices.)

Verification: D-log bullet shows `verify.mjs --fn fprefx` →
syntax + rule2 + hidden + green/strict + cohort 7/7. Re-measured:
`hidden-proxy.mjs verify fprefx --base 43f6a519~1` → "0 PASS,
1 moved past, 0 unchanged, 0 worse → PROGRESS" (Knight-92105
fprefx@99 → next_ident@151). True claim, no vacuous check. Diff
grep: no FORCE/DIAG/seed/coordinate gates.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
