# Review 1112 — bda8c297 — Mb_hit Magicbane specials (D-2146)

Metadata: SHA `bda8c297`, `js/artifact.js` only (+~170/−5 in `js/`).
Queue row fired: Open `artifact.c Mb_hit` (scen-wish-Archeologist-91134
step 110). No prior review claimed closed.

## Intent vs deliverable

Subject promises exported async `Mb_hit` in exact C order/short-circuit
plus AD_STUN-gate wiring. Diff delivers exactly that: tier cascade,
hit pline, cancel/scare/probe/stun/confuse arms, side-effect plines,
and `return await Mb_hit(...)` replacing the deferred stub.

## Inventory

- `Mb_hit` (new, exported async): full `artifact.c:1248–1434` port.
- `attacktype` (new, file-local clone of `mondata.h attacktype`,
  eat.js/engrave.js precedent); `MB_INDEX_*`/`MB_MAX_DIEROLL`/`MB_VERB`/
  `PM_CLAY_GOLEM`/`AT_MAGC` consts.
- AD_STUN gate re-point: deferred `return false` → live call.
- Imports: all names join already-existing static edges (`--can`:
  ALREADY on all five probed; no new edge anywhere).

## C ↔ JS fidelity

Walked `artifact.c:1248–1434` (static fn; `csym` has no index entry,
range from the D-log cite) call-for-call. `scare_dieroll` damping
(`Math.trunc` for C integer `/`), `!spec_dbon_applies→dr+1`, stun-gate
`rn2(11|7)` drawn first, cumulative tiers each adding `rnd(4)`,
cancel floor `dr<=trunc(scare/2)` — all exact, RNG in C order
(stun-gate → tier dice → probe `rn2(3|s|)` → scare `rn2(2)` → confuse
`rn2(12)`, all conditional draws on the same paths as C). Hit pline
before effects; `map_invisible` inside the vis-gate as C. CANCEL:
`cancel_monst` args, rehumanize `dmg=0`, uenmax/uen/uenpeak + botl both
flags, clay-golem `mhp=1`, AT_MAGC absorb — exact. SCARE: hero
`Antimagic→resisted` else `nomul(-3)` + multi_reason/nomovemsg +
stuck-release; mon `rn2(2)&&resist→monflee(3)` with
`(mhp>dmg)` flee-if-wounded flag; `!resisted→do_stun=FALSE` — exact.
PROBE `spe==0||!rn2(3|s|)` + `probe_monster` — exact. Redundant-STUN
noted, not ported (comment-only in C). Fakename/upstart/verbose
side-effect plines exact (`youdefend?raw:vtense('mon',·)` matches
`decl.c:51 fakename[]`). Caller `return Mb_hit(...)` matches C
`:1537–1540` verbatim, and C's "possibly modifies hittee[]" is
unobservable (both sides return immediately; JS-local `hb` reassign is
safe). `isHero` adapter (sentinel + `_youmonst`) resolves in scope
(`youmonst`, `js/artifact.js:238`); `Antimagic_hero`,
`spec_dbon_applies`, `vtense`, `upstart`, `attacks` all resolve.
Callee closure: every effect callee LIVE and correctly awaited where
async (`cancel_monst`, `monflee`, `make_stunned`, `make_confused`,
`probe_monster`, `resist`; `sym.mjs` confirms, clones flagged live in
other files but this commit imports the exports). `attacktype` clone is
a 5-line pure predicate verified identical. Branch-by-branch confirm.

## Hallucinations / overclaim

None. D-log names DRLI/destroy/ignite as still deferred and documents
the `attacktype`/`AT_MAGC` file-local choice with its cycle rationale.

## Density

~170 `js/` insertions for a 187-line C function — the §2b unit (one
function; >250-insertion ceiling not triggered).

## Verification

D-log Verify: `verify.mjs --fn Mb_hit` → 1 PASS + green/strict/cohort.
Re-measured myself: `hidden-proxy.mjs verify Mb_hit --base bda8c297~1`
→ `1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS`
(scen-wish-Archeologist-91134: PASS). Exact match.
`imports.mjs --rulecheck`: Rule #2 clean. No FORCE/DIAG/seed/coordinate
gates.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
