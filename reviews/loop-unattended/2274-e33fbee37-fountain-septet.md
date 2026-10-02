# Review 2274 — e33fbee37 — fountain septet (floating_above)

Metadata: SHA `e33fbee37b5a1fd76c8080554e456d470fe48fb3`
(D-3318, 2026-10-02). `js/fountain.js` (+25/−7: trapped arm,
FACE fix, 2 import names + 1 import line on a pre-existing
edge). `scripts/floating-above.test.mjs` (new, 6 cases).
5 stale-complete bookings, no `js/` delta. Cluster of 7.

Intent vs deliverable: subject promises the floating_above
utrap-arm head + sink_backs_up FACE fix + 5 stale-complete.
The diff ports the :25–30 arm in C order, swaps the hardcoded
"face" for live `body_part(FACE)`, and wires the two imports
the arm needs. Delivers what it promises.

Inventory (per function):

- `floating_above` — js/fountain.js:279–291: default umsg →
  gate → override + `surface()` → `You(umsg, what)`.
- `sink_backs_up` — js/fountain.js:357: one-line FACE fix;
  rest of body pre-existing (read whole body below).
- `dowatersnakes` — stale-complete, js/fountain.js:562 (read).
- `dowaternymph` — stale-complete, js/fountain.js:630 (read).
- `dofindgem` — stale-complete, js/fountain.js:266 (read).
- `watchman_warn_fountain` — stale-complete, js/fountain.js:206
  (read).
- `dogushforth` — stale-complete, js/fountain.js:715 (read).
- Imports: TT_INFLOOR/TT_LAVA/FACE added to the const.js line;
  `surface` from sit.js — `--can` reports ALREADY (fountain.js
  already imports sit.js statically), and `surface` is a hoisted
  `export function` (sit.js:475), so no new edge and no TDZ
  risk. Nothing deleted or re-pointed.

**C ↔ JS fidelity** (per function):

- `floating_above` (fountain.c:19–32): default → `u.utrap &&
  (INFLOOR||LAVA)` gate → override + `surface(u.ux,u.uy)` →
  `You(umsg, what)`. JS is the identical order with identical
  strings ✓. C's own comment ("must be attempting to move
  down") backs the doc's reachability note ✓. `You` is the live
  async `(fmt, ...args)` export (display.js:7899), awaited ✓;
  no RNG in C or JS ✓. Callers: all 5 C sites wired — do.c:1198
  → do.js dodown ✓, fountain :250/:400/:601 → dip/drink/sink
  ✓, potion.c:2343 → potion.js dip_into ✓. Confirm.
- `sink_backs_up` (fountain.c:804–826): the Blind+Deaf arm is
  `Sprintf(buf, "…the %s", body_part(FACE))` — JS now calls
  the already-imported live `body_part` (polyself.js:110) with
  the real FACE const (const.js:583) ✓. Whole-body check: 3
  msg arms + `!Deaf` Flupp prefix + S_LRING once-per-sink with
  You_see/mkobj_at(RING,TRUE)/newsym/exercise×2/bit-set, all in
  C order ✓. "Whole C body live" confirmed; omit retired.
- `dowatersnakes` (fountain.c:37–60, staticfn → module-local
  ✓): `rn1(5,2)` before the G_GONE gate ✓, Hallucination
  ternary evaluated only under hallu (display-RNG order kept)
  ✓, makemon MM_NOMSG + t_at→mintrap loop ✓, G_GONE furious-
  bubbling arm ✓. `Soundeffect` ×2 named: verified empty —
  no `SND_LIB_*` is defined anywhere in include/ or sys/, so
  sndprocs.h takes the `:268` else branch (`#define
  Soundeffect(seid, vol)` empty) ✓. Confirm.
- `dowaternymph` (fountain.c:93–116): `!G_GONE && makemon`
  short-circuit preserved (JS only calls makemon when !gone,
  so no draw on the extinct path) ✓, attract/seductive arms,
  msleeping=0, mintrap, bubble+pop / loud-pop else arms ✓;
  `Soundeffect` ×3 empty per the same header proof ✓. Confirm.
- `dofindgem` (fountain.c:164–176): Blind arms, mksobj_at
  `rnd_class(DILITHIUM_CRYSTAL, LUCKSTONE−1)` FALSE/FALSE,
  SET_FOUNTAIN_LOOTED, newsym, exercise WIS ✓. Confirm.
- `watchman_warn_fountain` (fountain.c:178–198): gate,
  !Deaf yell+verbalize, Deaf visual with the nolimbs
  verb/part split evaluated left-to-right as in C ✓. Confirm.
- `dogushforth` (fountain.c:119–131): do_clear_area+gush over
  radius 7, then drinking?thirst-quenched:sprays. JS collects
  the same traversal order then awaits each gush (pre-existing
  D-0954 async adaptation — order-preserving), with identical
  tail arms ✓. Callee `gush`'s set_levltyp side-effect omit is
  named in gush's own doc — callee debt, correctly not booked
  against this function. Confirm.

Hallucinations / overclaim: none. The commit message's
cycle-safety note is accurate (ALREADY, hoisted function).
"Only reachable via dodown" matches C's own comment.

Density: 7 whole functions, one C file — within §10.17. Below
~80 insertions; the whole fountain.c closure ships here (next
SHA completes the file). Each function has its own `Ledger:`
entry and Verify line. All seven confirm.

Verification: D-log claims 7× vacuous note + smoke REACH-OK +
gates + focused 6/6. Re-measured in one call:
`hidden-proxy.mjs verify <all seven> --base e33fbee37~1
--reach-all` → every function "0 blocked (0 at baseline, 0 in
working)" + explicit vacuous note + "smoke (24 run): 24 PASS, 0
regressed → REACH-OK". Queue cited 0 — vacuous legitimate. I
ran the new test: 6 pass, 0 fail. Diff grep: no FORCE/DIAG/
getRngLog/seed/fastforward/coordinates. Rule #2 iteration-wide
clean. (Pre-existing note, not this SHA: fountain.js still
carries a local summing `money_cnt` clone at :238 — fixed by
the next SHA, D-3319.)

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
