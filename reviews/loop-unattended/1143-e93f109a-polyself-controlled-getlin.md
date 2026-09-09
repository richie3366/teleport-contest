# Review 1143 — e93f109a — polyself.c polyself controlled-getlin gate (D-2177)

Metadata: SHA `e93f109a`, js/ +14/−10 in `polyself.js` only (no
new imports). D-log D-2177. Subject promises: non-force
controllable getlin was a named omission, so poly-control +
POLY_NOFLAGS went random (Ranger-92133 PASS).

Intent vs deliverable: promise matches diff. Actually adds four
behavior changes in one getlin block: (a) gate widened to
`(controllable_poly || forcecontrol)`, (b) non-force ESC falls
to `"*"` random instead of abort, (c) `"random"` exact-match
instead of case-fold, (d) `thats_enough_tries` falls through to
the random funnel instead of abort. One C block, one session —
coherent, not glued subsystems. Map omission retired in the same
commit (doc comment updated both sides).

Inventory: no new functions, no deleted symbols.
`controllable_poly` is a pre-existing function-local `const`
(polyself.js:1289, citing C `:480`) — a C local, not a clone; no
import needed, no TDZ risk (same function scope, defined above
use). No STUB.

**C ↔ JS fidelity**: confirm against pinned C (read at HEAD).

- Gate: C `polyself.c:513` `if (controllable_poly || forcecontrol)`
  — JS identical, with `!vampyr_goto` ≡ C `:510–511`
  (`monsterpoly && isvamp → goto do_vampyr`, pre-existing).
- ESC: C `:521–528` — `*buf == '\033'` returns only under
  forcecontrol (wizard `#polyself`), else `Strcpy(buf, "*")`.
  JS identical.
- Random: C `:529` `!strcmp(buf,"*") || !strcmp(buf,"random")`
  with `tryct = 0; continue` — JS identical including the exact
  match (old case-fold fixed) and the tryct-0 skip of
  thats_enough (loop `continue` exits via `--tryct > 0` false).
- Exhaustion: C `:616–619` `if (!tryct) pline1(...)` with NO
  return — JS `return` deleted; fall-through lands in the live
  `:698` random funnel (`mntmp < LOW_PM → tryct=200` below).
- C local `:480` `controllable_poly = Polymorph_control &&
  !(Stunned || Unaware)` ≡ JS:1289 (HStun|sticky + `Unaware()`).
- The `--More--` needed no display change: `getline.js:245
  flush_topl_more` on getlin entry ≡ C `wintty` NEED_MORE flush —
  claimed with a file:line cite, plausible and session-proven.

RNG: no draws added; the session's C dice (`rn2(5)` +
newman/newman-exp) now fire because the prompt path runs.

Hallucinations / overclaim: none. D-log names the symptom owner
(`peffect_polymorph`, body already faithful per D-1428 — writer
is this gate) and honestly notes the `verify polyself` extra is
vacuous (0 blocked), leaning on green/cohort instead.

Density: ~20 insertions; C arm is the block conditions, rest of
`polyself` already live — density exception (C arm that small).

Verification: D-log cites `verify.mjs --fn peffect_polymorph` →
1 PASS, green 2/2, strict ×2, cohort 7/7. Re-measured
independently: `hidden-proxy.mjs verify peffect_polymorph --base
e93f109a~1` → baseline 1 blocked, `1 PASS, 0 moved past, 0
unchanged, 0 worse → PROGRESS` (Ranger-92133 PASS). Exact match.
`rulecheck` clean. No DIAG/FORCE/seed gates.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
