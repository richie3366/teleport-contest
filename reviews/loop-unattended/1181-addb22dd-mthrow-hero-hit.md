# Review 1181 — addb22dd — m_throw hero-hit envelope (D-2215)

Metadata: SHA `addb22dd`, `js/mthrowu.js` (~85 new
lines in the hero-hit branch) + one-word `can_blnd`
export in `js/uhitm.js`, D-2215. Queue row
`dosearch0` (symptom owner `detect.c:2099`):
scen-intrinsic-Samurai-92017 step 54/143, counted
`20s` search, goblin dagger mid-search («You stop
searching.» lost).

Intent vs deliverable: subject promises the full
`mthrowu.c:702–786` hero-hit envelope in C order,
headlined by the dropped `stop_occupation()`. Diff
delivers that plus the `:836–841` blindinc tail: EGG
impossible/petrifier-FALLTHROUGH, pie/venom
`thitu(8,0)`, default-arm elf/elven/bigmonst/
acid-venom gates, poisoned, can_blnd messages, EGG
make_stoned, unconditional stop_occupation,
ucreamed/make_blinded/vision-clears tail. No scope
creep beyond the envelope.

Inventory: reworked region — `m_throw` hero-hit
branch. New imports extend pre-existing static edges
only (`touch_petrifies/bigmonst/is_elf/
poly_when_stoned/eyecount`, `killer_xname`,
`polymon`, `is_poisonable`, `make_stoned`,
`poisoned`, `Blind`, `stop_occupation`,
`impossible`, `AT_WEAP/AT_SPIT`, `make_blinded`);
new consts EGG/CREAM_PIE/ELVEN_BOW/ELVEN_ARROW/
PM_STONE_GOLEM + local `BlindedTimeout`. One-word
change: `can_blnd` local → exported (body
untouched, now a shared C callee).

**C ↔ JS fidelity**: walked branch-by-branch vs
`mthrowu.c:702–786` + `:836–841`. `oldumort`
baseline before the switch ✓. EGG non-petrifier
impossible + hitu=0 / petrifier FALLTHROUGH to
`thitu(8,0)` ✓ (`:705–714`). Pie/venom `thitu(8,0)`
✓ (`:715–717`). Default arm hitv/dam math incl. elf
`oc_skill==-P_BOW`/ELVEN_BOW/ELVEN_ARROW, bigmonst,
acid-venom-skip-half-phys ✓ in C order (`:727–741`).
Poisoned with `(umortality>oldumort)?0:10` lifesave
gate + xname/killer_xname bufs ✓ (`:745–754`).
can_blnd AT_SPIT-vs-AT_WEAP select + `rnd(25)`
blindinc + all four message arms ✓ (`:755–778`) —
literals verified: «Yecch!  You've been creamed.»
(2 spaces both), «There's something sticky…»
(`something`="something" per `decl.c:45`), «The
venom blinds you.» (`pline_The`), «Your %s sting.»
(`Your`). EGG stoning gate (Stoned/Stone_resistance/
poly_when_stoned+polymon/KILLED_BY) ✓ (`:779–785`).
Unconditional `stop_occupation()` in C position ✓
(`:786`). Tail `ucreamed+=blindinc`,
`make_blinded(BlindedTimeout+blindinc,FALSE)`,
`Your1(vision_clears)`→«Your vision clears.» ✓
(`:836–841`). Early gameover returns mirror C
losehp→done noreturn; non-petrifier EGG (hitu=0)
still runs stop_occupation exactly as C does.
Callee closure: every reached callee LIVE
(`sym.mjs`: poisoned `attrib.js:390` async,
make_stoned `potion.js:924` async, can_blnd
`uhitm.js:265`, all awaited); AT_SPIT/AT_WEAP
exported from mhitm.js (`:235/:242`, export list
`:688` — `sym.mjs` has a constants index gap, but
the import resolves or the suite would not load).
`--can mthrowu.js do.js make_blinded` → ALREADY
static, no new edge. Residuals (dmgval
defender-null, can_blnd Blindfolded/ublindf/visor
you-gates, thitu quan>1 doname, forcehit
MT_FLIGHTCHECK) are pre-existing and all named at
turns.md:3034 — map debt, not new C-wrongs.

Hallucinations / overclaim: none. «Match C» covers
dispatch + all callees live — true.

Density: §2b right-size — one C locus family, one
envelope; full-suite 44/44 re-run for the
combat-math change.

Verification: D-log cites `verify.mjs --fn dosearch`
→ 1 PASS + 2 moved + parked residual + green/strict/
cohort/full. Re-measured: `hidden-proxy.mjs verify
dosearch --base addb22dd~1` → "1 PASS, 2 moved
past, 1 unchanged, 0 worse → PROGRESS" (Samurai-92017
54→142, Archeologist-92012 PASS, Wizard-92127 31→72,
92023 residual still dosearch@65, identical toplines
both sides). Claim true. Only new RNG call is C's
`rnd(25)`; no FORCE/DIAG/seed/coordinate.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
