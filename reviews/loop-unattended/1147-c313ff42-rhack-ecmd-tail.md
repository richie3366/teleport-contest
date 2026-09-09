# Review 1147 — c313ff42 — cmd.c rhack ECMD_OK tail for ^W wiz_wish (D-2181)

Metadata: SHA `c313ff42`, js/ +18/−5 in `cmd.js` (^W arm) and
`wizcmds.js` (two `return ECMD_OK`). D-log D-2181. Subject
promises: `^W wiz_wish` must run `reset_cmd_vars` so a declined
mid-wish death doesn't trip `unmul` a turn early
(Valkyrie-92014 PASS).

Intent vs deliverable: promise matches diff. Actually adds: the
three-branch ECMD tail on the captured `wishRes` + ECMD_OK
returns. One arm, one session, no new imports (`wiz_wish`
already imported, `reset_cmd_vars` module-local).

Inventory: no new/deleted functions. `wiz_wish`
(wizcmds.js:380, async — `sym.mjs` confirms) now returns a value
on both paths. Other callers: `cmd.js:2249` (dispatch binding —
res flows into the ECMD-bit dispatch, which is exactly the C
contract) and `getline.js:731` (extended-command `run` — same
contract). No clone→import re-point.

**C ↔ JS fidelity**: confirm, two loci read at HEAD.

- Tail: C `cmd.c:3810–3826` — `(res & (CANCEL|FAIL))` →
  `reset_cmd_vars(TRUE)`; `(res & (OK|TIME)) == OK` →
  `reset_cmd_vars(multi < 0)`; `res & TIME` → `move = 1` (+
  kickedloc reset). JS mirrors all three predicates. The
  "verbatim" claim is literally true, not loose: `ECMD_OK =
  0x00` (const.js:1937), so C's second predicate reduces to
  `(res & TIME) == 0` — exactly what JS (and the house
  `rhack_dispatch_bound`, cmd.js:736) tests. `| 0` coercion and
  `(game.multi | 0) < 0` are the house undefined-safe idiom.
- wiz_wish: C `wizcmds.c` returns `ECMD_OK` both paths ↔ JS now
  does. "Value-equivalent to undefined" holds because OK=0 and
  every consumer uses bitwise ops (`undefined & x` ≡ `0 & x`).
- Omissions, both dead on this path: kickedloc reset (only the
  TIME arm; wishRes never has TIME) and `encumber_msg()`
  (pre-existing named defer, message/RNG-neutral here since the
  bow is never picked up).
- Mechanism: declined mid-wish death leaves multi=-1 via
  savelife; without the tail reset the next command trips
  `unmul`'s nomovemsg pline a turn early — consistent with the
  observed 67-vs-66 step fallout and its disappearance.

RNG: zero draws in the window either side (positional match
through step 49); display-timing fix only.

Hallucinations / overclaim: none. Single-session PROGRESS
presented as exactly that.

Density: ~18 insertions for one dispatch arm — density
exception (C arm that small).

Verification: D-log cites `verify.mjs --fn touch_artifact` → 1
PASS + manual 44/44. Re-measured independently:
`hidden-proxy.mjs verify touch_artifact --base c313ff42~1` →
baseline 1 blocked, `1 PASS, 0 moved/unchanged/worse →
PROGRESS` (Valkyrie-92014). Exact match. `rulecheck` clean
(re-ran this iter). No DIAG/FORCE/seed gates.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
