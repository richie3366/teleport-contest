# Review 2266 — 2bcda1027 — monst monst_globals_init overlay reset

Metadata: SHA
`2bcda10276be0c8cf8fb5f7bcb2cb3104062215a`
(D-3308, 2026-10-02).
`js/monsters.js` (+21),
`js/jsmain.js` (+2),
`js/makemon.js` (+2/−2):
one new export + two
caller wirings + doc-omit
retirement.

Intent vs deliverable:
subject promises the
export (overlay clear ≡
memcpy-to-baseline) wired
at both live C caller
sites. The diff ships the
export, the jsmain start()
call in C order, the
dump_mongen call with
corrected line cites, and
retires the named omit.
Delivers the shape it
promises — but the ≡
claim is false (below).

**Addressed:** D-3311 `bdd35be25`

Inventory:

- `export function
  monst_globals_init()`
  (js/monsters.js:220):
  `game.pm_fixup =
  Object.create(null)`.
- jsmain.js:16 import + :133
  call (after
  decl_globals_init,
  before sys_early_init).
- makemon.js:98 import +
  :883 call (before
  init_mongen_order);
  doc omit retired, cites
  :1841/:1842 corrected.
- No symbol deleted; no
  clone added.

**C ↔ JS fidelity**:

C body (monst.c:71–76):
`memcpy(mons, mons_init,
sizeof mons)` — restores
EVERY permonst field of
every monster type. JS
clears only the
`game.pm_fixup` overlay
(msound/mflags2/mflags3/
maligntyp for role-fixup
targets). The D-log sells
this as “single memcpy ≡
overlay clear”, “exactly
like the memcpy”, with
“Sole live writers of C
`mons[]` are role.c
role_init :2029–2056”.

That writer survey is
wrong. `adj_erinys`
(mon.c:5918–5966, live
game code, callers
attrib.c:1309 +
restore.c:727) writes
`mons[PM_ERINYS]` in place:
mflags1 (:5927–5953),
mattk[0..2] (:5940–5961),
mlevel + difficulty
(:5964–5965). I enumerated
the other writer shapes
to bound this: zero
`data->` permonst-field
writes in src/, zero
direct `mons[i].field =`
writes (the role.c:2109
infravision fixup is
inside `#if 0` —
confirmed), and the only
memcpy into mons is :74
itself. So the live-writer
set is {role_init,
adj_erinys} — two, not
one. JS models the second
channel OUTSIDE the
overlay: `adj_erinys`
(js/monsters.js:288)
mutates the generated
baseline arrays in place
(“Mutates generated
mons[] arrays”, its own
comment), with a separate
`reset_erinys()` (:270)
restoring from ERINYS_BASE.
The new function never
calls it — so after
`adj_erinys(60)`,
C `monst_globals_init()`
resets erinys while the JS
namesake leaves it
boosted. The doc comment's
“generated per-field
arrays are the immutable
baseline” and “the only
live-game divergence
channel is the overlay”
are both contradicted in
the same file. The memcpy
port is missing its
erinys effect — Actionable
1.

Mitigating (why latent,
not live): both wired
sites run with clean
erinys — dump_mongen is a
pre-game argcheck path,
and newgame/restore
already call
`reset_erinys()`
(allmain.js:771,
save.js:986, documented).
No corpus/public session
can observe the gap today;
the fix is a no-op at
both sites. But the
function as shipped does
not implement its C
contract, and the D-log
claims it does.

Correct in this SHA:
callers allmain.c:42 →
jsmain.js:133 and
makemon.c:1841 →
makemon.js:883, both in C
order (dump_mongen C
:1841/:1842 re-read — the
corrected cites are
right); makedefs.c:306 is
a util/ build tool,
by-design correct ✓.
`commit_pm_fixup`
lazily creates the
container, so re-clearing
is safe; `mons()` reads
`fix?.field ?? baseline`
✓. The mvitals analysis
(genocide outside mons[])
is accurate and keeps
scope tight ✓. No RNG in
C ✓. jsmain→monsters edge:
monsters.js imports only
gstate/const — leaf, no
TDZ risk ✓. (Side note, not
this SHA: C early_init
also calls
objects_globals_init
between decl and monst;
the JS export exists but
is wired only on the
restore path (save.js:796)
— belongs to that
function's row, not here.)

Hallucinations / overclaim:
yes — “sole live writers”,
“only divergence channel”,
“exactly like the memcpy”
are all falsified by
adj_erinys (mon.c:5918–
5966), live code in the
same file as the port.
A “whole C body live”
claim over a partial
effect is the arm-only
shape.

Density: single function,
28 insertions, monst.c is
a 1-function file
(ledger: 1/1 ported) with
0 C callees — nothing
more Open to grow with ✓.
One `Ledger:` entry, one
Verify line ✓.

Verification: D-log claims
hidden vacuous note +
REACH-OK smoke 24/24,
green 2/2, strict ×2,
cohort 7/7, full 44/44.
Re-measured: “0 blocked”
+ vacuous note + “fixed
smoke spread (24 run): 24
PASS, 0 regressed →
REACH-OK” — matches ✓
(queue cited 0 blocks).
Diff grep: no FORCE/DIAG/
getRngLog/seed/fastforward/
coords ✓. Rule #2: ESM
imports only ✓.

**Actionable C-wrongs**:

1. `monst_globals_init`
   missing erinys-reset
   effect: call the
   same-module `reset_erinys()`
   inside
   `monst_globals_init()`
   (restores the memcpy's
   erinys effect; no-op at
   both wired sites) and
   correct the “sole/only/
   immutable” wording in
   the doc comment to name
   the adj_erinys channel.
   Verify: full 44/44 +
   probe
   adj_erinys(60)→monst_globals_init→baseline.

Verdict: **QUALITY-RISK**
