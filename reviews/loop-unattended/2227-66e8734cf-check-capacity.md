# Review 2227 — 66e8734cf — check_capacity whole-body port + 13 sites

Metadata: SHA `66e8734cf94c852de5be93e45ba9756142fac22d` (D-3266,
2026-10-02). 11 js/ files, +116/−97 (new export + 13 rewirings +
clone deletion). Single function + its full caller fan-in — one C
file's function with cross-file callers. Method below.

Intent vs deliverable: subject promises "check_capacity whole-body
port (async export in js/hack.js, 13 call sites wired, pickup.js
sync clone deleted)". The diff delivers the export, all 13
rewirings, and the clone deletion with zero `_check_capacity_msg`
remnants. Delivers what it promises.

Inventory:

- `check_capacity` (`js/hack.js:212`, C hack.c:4398–4409): `if
  (near_capacity() >= EXT_ENCUMBER) { str ? pline('%s',str) :
  You_cant('do that while carrying so much stuff.'); return
  true; } return false;` — C-exact (pline1 ≡ pline("%s",str)
  per hack.h:1026, verified).
- 13/13 C call sites rewired (verified each against C context):
  apply.c:4223→doapply (return false=ECMD_OK); dothrow.c:310→
  ok_to_throw (return false; newly gated); eat.c:2831→doeat
  (return 0); eat.c:3623→floorfood_eat (`(await
  check_capacity(msg)) && beartrap`, msg=qbuf verbatim incl.
  free-yourself/disarm ternary); engrave.c:538→u_can_engrave
  (return false); pickup.c:2194→doloot_core (ECMD_OK);
  pickup.c:3594→dotip (`!overloaded && able_to_loot`, buf
  verbatim incl. verbose/a-container/one/it logic);
  read.c:355→doread (return 0); spell.c:1279→spelleffects_check
  (ECMD_TIME, string verbatim); teleport.c:1126→dotele (return
  true=1, string verbatim); trap.c:5722→help_monster_out
  (return 1); uhitm.c:531→do_attack ("…heavily loaded."
  verbatim, atk_done flow kept); zap.c:2636→dozap (return 0;
  newly gated). Every polarity, return value, message string,
  and short-circuit order matches its C site; the two newly
  gated sites match C's gate position and return.
- Deleted: pickup.js:4716 sync clone + both
  `game._check_capacity_msg` consumers (verified 0 remnants).
  `sym.mjs check_capacity`: sole export hack.js:212 ASYNC, no
  clones anywhere ✓ (required output pasted here). Callees:
  near_capacity invent.js:1156 sync (hack.js:80 import);
  You_cant display.js:7882 ASYNC awaited; EXT_ENCUMBER=4 both
  (hack.h:462); pline pre-existing, awaited. All 11 files
  extend pre-existing hack.js edges — no new module edge.

**C ↔ JS fidelity — `check_capacity`**

- Body is 1:1 with C :4398–4409 (gate, pline1/You_cant split,
  1/0 returns) ✓. Bonus C-exactness: 9 sites previously printed
  the full "You can't…" via pline; the export routes through
  You_cant like C ✓. The old pickup clone deferred printing via
  a stash field (fire-and-forget ordering risk); C prints
  immediately — the export restores C's immediacy ✓.

Hallucinations / overclaim: none. "13 call sites" counted
against C's 13 references (extern.h decl excluded) — I verified
all 13 individually.

Density: 1 function + full fan-in, 11 files, +116/−97 — a
caller-closure port; coherent, under caps. `Ledger:
check_capacity ported` + Verify line present.

Verification: D-log Verify shows syntax-12/rule2/hidden-note/
smoke-REACH-OK/green/strict/cohort/full-44/44. Re-measured
(`hidden-proxy.mjs verify check_capacity --base 66e8734cf~1
--reach-all`): vacuous at baseline (row cited 0 blocks —
correctly a note) + `smoke … 24/24 → REACH-OK`. Zero
regressed. Banned-pattern grep on js/ hunks: clean. Rule #2
clean (2221 run).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
