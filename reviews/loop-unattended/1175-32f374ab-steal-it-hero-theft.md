# Review 1175 — 32f374ab — steal_it hero theft (D-2209)

Metadata: SHA `32f374ab`, `js/uhitm.js` only (+176/−16), D-2209.
Queue row `steal_it` (scen-poly-Priest-92097 step 152). Largest SHA
this batch (176 js insertions; ceiling stays 350).

Intent vs deliverable: subject promises poly-hero SEDU/SSEX/SITM
theft via file-local `steal_it` + `theft_petrifies` + dispatch arm.
Diff actually adds both staticfns, the `damageum_adtyping` three-way
arm, and import extensions on existing edges. Promise == diff.

Inventory: two new functions (`steal_it`, `theft_petrifies` — both
C `staticfn`, correctly file-local, not clones of anything), one
extended dispatcher. Named omits recorded in-map (mon→mon
`mhitm_ad_sedu/ssex`, mhitu arms stay in `js/mhitu.js`).

**C ↔ JS fidelity**: call-for-call confirm vs
`uhitm.c:2147–2278`. `theft_petrifies`: uarmg / non-CORPSE /
non-petrifying / Stone-resistance gates, `#if 0` arm stays omitted,
`instapetrify(corpse_xname(otmp, "stolen", CXN_ARTICLE))` — exact.
`steal_it`: nothing-to-take gate, prev/cur pointer surgery
(equivalent to C's `minvent_ptr` double-pointer, incl. end-append
and NULL-tail no-op), charm/seduce pline texts (dynamic pronoun,
"most of " gold gate), gold shuffle-out/in, loop order
(put-back → Upolyd gate → unwornmask → artifact-doname ordering →
extract → ustealo message → hold_another_object with exact C args →
OBJ_INVENT check → petrify break → W_WEP/W_ARMG fixups → one-item
break → gold re-extract), final put-back. Dispatch: C
`mhitm_ad_sedu :4629–4632` (steal_it + damage=0),
`mhitm_ad_ssex :4754–4758` (delegates; `done` never set by steal_it,
so lumping is equivalent), `AD_SITM` falls into `AD_SEDU` at
`:4798–4799` — the JS three-way arm is exactly C's table. No RNG in
the new code, matching C (the arm draws nothing itself). Callee
closure: `findgold`/`mselftouch`/`instapetrify`/`hold_another_object`
all LIVE (`sym.mjs`), async ones awaited; `could_seduce` resolves
via `export {}` list (`js/mhitm.js:685–694`) — `sym.mjs` "NOT
EXPORTED" is a tool false negative, verified by direct read; the
clone itself is C-cited (`mhitu.c could_seduce`), not a stub. New-edge
claim in the message is overstated: `imports.mjs --can` reports both
steal.js/trap.js edges ALREADY exist — extended imports, zero new
cycle risk. `impossible` import additionally fixes a latent
unimported call (`:2856`→`:3016`) — same-file, justified.
Second-suit `impossible()` vs C `panic`: unreachable by slot
exclusivity; not a C-wrong.

Hallucinations / overclaim: none material (one D-log wording nit
above, no code impact). No dispatch-with-stubbed-callee. Rule #2:
no new imports outside plain ESM (suite-wide re-check below).

Density: one C staticfn family, one module — right-sized.

Verification: D-log Verify bullet shows hidden PROGRESS + green +
cohort. Re-measured myself:
`hidden-proxy.mjs verify steal_it --base 32f374ab~1` →
"0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS"
(Priest-92097 152→do_statusline2@180, strictly later step, no
worse). Not vacuous.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
