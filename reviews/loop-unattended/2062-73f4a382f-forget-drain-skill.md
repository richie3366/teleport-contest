# Review 2062 — 73f4a382f — forget + drain_weapon_skill await/panic fidelity

- SHA: `73f4a382f` (D-3102)
- Subject: "read.c forget + weapon.c drain_weapon_skill: await chain + panic/message fidelity (coverage)"
- js/ insertions: ~36 (read.js +20, weapon.js +33 with deletions)
- Prior index: 2061; queue Must-fix at review time: empty

## Intent vs deliverable

Promise: restart PARTIAL `forget` async with an awaited drain call and
an awaited sole caller, and restart `drain_weapon_skill` with the C
panic arm (was silent `continue`) and the live `You` export (was an
inlined pline template).

Diff actually adds: async `forget` + `await` at seffect_amnesia, loud
throw on the panic arm, `You('forget %syour training in %s.', …)`
message loop, mirrored C comments. Matches the promise; no extra scope.

## Inventory

Per-function (cluster of 2, head + weapon.c callee):

- `forget` (js/read.js:773, file-local ≡ C staticfn) — C read.c:1019–1040
  (csym range; D-log cites 1020–1040, off by one on the signature line —
  citation nit only). Whole body: Punished arm, ALL_SPELLS arm, drain
  call, both meverseen loops.
- `drain_weapon_skill` (js/weapon.js:1102, async export) — C
  weapon.c:1475–1514. Whole body: memset, pick/unlink/decrement loop,
  panic arm, slot refund, P_ADVANCE clip, per-skill You loop.

Helpers: all LIVE — losespells, rnd/rn2, slots_required (file-local),
practice_needed_to_advance, P_SKILL/P_ADVANCE + setters, P_NAME, `You`
(joins the pre-existing display.js import — no new module edge, no
local clone deleted, so the `sym.mjs` re-point check is not triggered).
No clones, no stubs.

## C ↔ JS fidelity

`forget`, branch order verified: `howmuch|0` norm (C int param);
`u.uball` truthy ≡ `Punished` (`uball != 0`); `howmuch & ALL_SPELLS` →
losespells; `await drain_weapon_skill(rnd(howmuch ? 5 : 3))` — one rnd,
call-for-call; fmon loop with the `usteed`/`ustuck` guard exact;
migrating_mons loop exact (js/read.js:782). Async is forced by the
callee's pline await; the sole caller's `await` (read.js:1436) keeps
the "You forget …" messages in C order — the floated-message C-wrong
is fixed.

`drain_weapon_skill`, call-for-call: memset→fill(0); `while (--n >= 0)`
with `n|0`; `rn2(skills_advanced)` pick + left-shift unlink +
`skills_advanced--` exact; panic `:1497` → `throw
('drain_weapon_skill (skill)')` — message byte-matches C's
`"drain_weapon_skill (%d)"`, house panic≡throw mapping with the
same-file lose_weapon_skill precedent; slot refund at the new rank
exact; P_ADVANCE clip `prevadv + rn2(curradv - prevadv)` gated on
`>= curradv` exact (rn2 only on the taken arm); message loop via live
`You` with the verbatim format string. Exact.

Callers: forget's sole C caller read.c:1836 → JS read.js:1436 awaited
(in-diff). drain's C callers read.c:1031 → JS read.js:778 awaited
(in-diff); uhitm.c:3269 → JS mhitu.js:2373 `await
drain_weapon_skill(rnd(2))` verified wired (import at mhitu.js:42).
No unwired caller.

Diff grep: no FORCE/DIAG/getRngLog/seed/fastforward/coordinates.

## Hallucinations / overclaim

None. Both "whole body, every callee live" claims check out; the
mhitu caller wiring claimed "verified" is verified.

## Density

Breadth-phase cluster: 2 functions, one caller/callee closure
(read.c head + its weapon.c callee) — §10.17 shape. ~36 insertions is
below the ~80 line, but the D-log invokes the unless-clause (head's
file + callee closure hold nothing more Open) and I spot-checked it:
`learnscroll` is clone-drift debt (2 local clones, not missing),
`doread` is live at js/read.js:2176 (300-line campaign scale),
matching the D-log's specifics — same excuse shape as the ACCEPTed
D-3099/2059. Each function has its own Inventory block, `Ledger:`
entry (both `ported`), and Verify line. Verdict per function:
ACCEPT / ACCEPT.

## Verification

Re-measured at this SHA (`--base 73f4a382f~1 --reach-all`, one call):
`forget` 0 blocked + vacuous note + 1 baseline-PASS reach (1 run,
1 PASS, 0 regressed) → REACH-OK; `drain_weapon_skill` 0 blocked +
vacuous note + smoke 24/24 → REACH-OK. Matches the D-log bullets
exactly. No REGRESSED session. Shared gates per D-log: syntax, rule2,
green 2/2, strict ×2, cohort 7/7, VERIFY PASS. No-test-file rationale
(no new interface; committed sessions are the check) is reasonable.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
