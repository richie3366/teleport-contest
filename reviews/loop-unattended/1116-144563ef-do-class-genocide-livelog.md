# Review 1116 — 144563ef — do_class_genocide cmdassist prompt + livelog arms (D-2150)

Metadata: SHA `144563ef`, js/ +38/−5 across 2 files (`read.js`,
`insight.js` local→export). D-log D-2150. Subject promises:
`iflags.cmdassist` default-On prompt + livelog/update_inventory arms;
1 session PASS (scen-wish-Tourist-92230).

Intent vs deliverable: promise matches diff. Actually adds: (1) both
genocide prompts (`do_class_genocide` j>0 and `do_genocide` i>0) switch
to `!== false` default-On; (2) `ll_done` + declined-class livelog +
once-per-call first/genocided-class livelog; (3) `update_inventory()`
after `kill_genocided_monsters()`; (4) `num_genocides` local→export.

Inventory: no new functions; one re-point (local→export). All consumed
callees LIVE: `num_genocides js/insight.js:175 sync`,
`uhis js/roles.js:726 sync`, `monsym js/display.js:472 sync`,
`update_inventory js/invent.js:4075 sync`, plus `livelog_printf`
(pline.js) and LL_* consts on existing edges.

**C ↔ JS fidelity**: confirmed against `read.c:2637–2820`
(range from `csym.mjs`; key lines read directly).
Prompt (`:2653–2657`, same at `:2857–2861`): C tests bare
`iflags.cmdassist` (boolean, default On per optlist.h NHOPTB initval);
JS `!== false` reads an unset bag as On — exact house pattern,
C-cited. Declined livelog (`:2673`) placed after the none-check,
before return, verbatim string. Once-per-call livelog (`:2738–2745`):
`!ll_done++` gate, `num_genocides()` branch, `uhis()` + class sym —
order and short-circuit exact. `%c`→`%s` adaptation is display-exact
(1-char sym through livelog's %s path). `update_inventory()` sits
between `kill_genocided_monsters()` and the wipe pline exactly per
`:2750`. `monsym({mlet: monclass})` for `def_monsyms[class].sym` rides
the existing display edge both prompts already used. Dynamic
`import('./insight.js')` mirrors the existing `list_genocided` pattern
in the same function; static `uhis` from roles.js is SAFE (leaf data).
No STUB in a live arm; POLY_REVERT + `do_genocide`
livelog/Hallucination/cham/newcham stay named in map `turns.md:706`
in this commit, with a measured (not assumed) rationale for
POLY_REVERT (JS `polyself` voids it at `polyself.js:1265`).

Hallucinations / overclaim: none. "Match C" covers the shipped arms;
deferrals are named with C ranges.

Density: small but C-complete for the shipping arms (prompt pair +
full livelog envelope of one function); below-40-insertions shape
justified since C locus is 3 short arms, not a body port.

Verification: D-log bullet shows `verify.mjs --fn do_class_genocide` →
hidden 1 PASS + green/strict/cohort. Re-measured:
`hidden-proxy.mjs verify do_class_genocide --base 144563ef~1` →
"1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS"
(Tourist-92230 PASS). True claim. Banned-pattern grep over js/ hunks:
no code hits (single prose mention of "seed gates" in the No-line).
Rule #2 covered by D-log verify PASS (static `uhis`/`livelog_printf`
imports are plain ESM).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
