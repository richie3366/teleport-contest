# Review 2602 — 611f68ced — randomize_gem_colors-head writer post-done gates (D-3732)

Metadata. SHA `611f68ced` (2026-10-09), D-3732, parent `11a3c5f79`.
js diff: `js/allmain.js` +16/−2 (two gameover gates), `js/pray.js`
+10/−0 (one gate); new `scripts/done-noreturn-gates.test.mjs`.
Ledger: `moveloop_core` ported + `angrygods` ported (D-3732
appended). Filed a Must-fix in-commit (ledger_to_dnum throw; later
D-3733 → C-CRASH). No prior review claimed closed.

## Intent vs deliverable

Promise (subject + D-log): cliffs-head `randomize_gem_colors` (10
blocks) is misattributed by concatenated scoring — per-segment
replay shows JS drawing 4–5 EXTRA tail draws after a fully matched C
prefix, always after a death: 7× timeout-expiry death
(`done_timeout ← nh_timeout ← moveloop_core`) with JS then drawing
turn maintenance (regen_hp/dosounds/gethungry/wipe), 1× god-wrath
fry (`angrygods`) with JS then drawing the `rnz(300)` pray-timer
tail. Root cause: C `done()` never returns on a real death
(`nh_terminate` NORETURN → `exit`); JS `really_done` returns with
`gameover` set, and the callers marched on. Fix: gameover gates at
the two resumption sites. Claimed: 2 PASS + 6 moved (3 same-step
re-attributions with FULL RNG) + 2 unchanged (filed throw) + 0
worse, REACH-OK, full 44/44.

Diff actually adds: `if (g.program_state?.gameover) return;` after
`nh_timeout()` and after `run_regions()` in `moveloop_core`, and
`if (game.program_state?.gameover) return;` after the `angrygods`
switch before the `rnz(300)` tail. No imports, no signature changes.
Promise and diff match.

## Inventory

Changed JS functions (2):

- `moveloop_core` — `js/allmain.js:1274–1293` (two gates).
  C: `allmain.c:273–274` (`nh_timeout(); run_regions();` before
  maintenance) + `end.c` done → `nh_terminate` (NORETURN,
  `extern.h:997`) → `nethack_exit` = `exit` (`:2385–2387`).
- `angrygods` — `js/pray.js:1325–1342` (one gate).
  C: `nethack-c/upstream/src/pray.c:703–784` (`csym.mjs` range;
  D-log `:704–784` = body), fry fall-through in `god_zaps_you`
  (`:609–644`), `rnz(300)` tail after the switch.

Ledger lines present: both rows bumped (`at` + D-3732), status
`ported` kept.

## C ↔ JS fidelity

C moveloop turn block (verified by read): `nh_timeout();`
`run_regions();` then `if (u.ublesscnt) u.ublesscnt--;` and the
maintenance sequence (regen_hp/dosounds/gethungry/wipe). C
`extern.h:997`: `ATTRNORETURN extern void nh_terminate(int)
NORETURN;` and `nethack_exit` = `exit` on this platform (`:2385–2387`)
— a real death never resumes the turn; `done()` returns only via
the lifesave/wizard-Decline path before `really_done`. C
`angrygods` tail (verified by read): after the switch, `new_ublesscnt
= rnz(300); if (new_ublesscnt > u.ublesscnt) u.ublesscnt =
new_ublesscnt;` — reachable in C only when the fry arms return,
i.e. lifesave/decline.

JS gates: each is `if (gameover) return;` placed exactly at the
resumption point C never reaches on death. Lifesave-safety — the
one thing that could make these gates C-wrong — verified in
`js/end.js:2215–2224`: the survive path (savelife / wizard-Discover
`Die?` decline) clears `game.program_state.gameover = false` and
returns *without* `really_done`, so the gates fall through exactly
where C falls through. Real deaths set gameover (`end.js:1036,1058`)
and return early exactly where C exits. Branch order: C order is
death → no continuation; the gates implement precisely that. RNG:
the gates remove draws C never makes (maintenance draws,
`rnz(300)` + its `rn2(1000)/rn2(4)/rne(4)/rn2(2)` callees) —
call-for-call this *restores* the C keystream, as the segment counts
prove (Priest-95402 seg1 3259/3259 post-fix per the focused test).

Callees: no new callees; `nh_timeout`/`run_regions`/`god_zaps_you`
all LIVE with internal gates already C-exact (stated, matches the
idiom cites). No STUB, no clone, no re-point — `sym.mjs` has no
deleted/re-pointed symbol to check in this diff (gates only; no
import touched). Callers: `angrygods` 5/5 C sites
(`pray.c:1442,:1656,:1770,:2312,:2325` — confirmed via `csym.mjs
--callers`, 7 refs = 5 sites + decl + comment) already wired per
the D-log table; `moveloop_core` gate is inside the turn block, no
call-site change.

## Hallucinations / overclaim

None. The delicate claims are all hedged with the evidence: the
owner was proven whole first (D-3241 read once per the history tag;
JS body + sole C caller cited), the writer mechanism is traced per
session (7+1 stacks, segment counts quoted), the same-step
re-attributions disclose FULL RNG counts per session, the 2
unchanged are explained (throw voids, rngM/scrM 0) and filed as
Must-fix *in this commit* rather than hidden. Ungated same-idiom
sites are named with falsifiers instead of being silently dropped.
Diff grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or
coordinate/seed conditionals. Rule #2: clean (global re-check this
audit).

## Density

Cliff-phase §2b: at the parent commit the generated cliffs head is
`o_init.c randomize_gem_colors` — 10/1113 sessions, RNG lost 611113,
top row (verified via `git show 11a3c5f79:docs/LOOP-QUEUE.md`). This
commit works its HEAD's cliffs head through the writer (post-done
continuation at 2 resumption sites) — legitimate §10.18/§10.19 (owner
proven whole, writer named by traces). One cliff, code + ledger +
verify + focused test in one handoff. Filing (not popping) a
Must-fix discovered mid-iteration is correct queue discipline; the
"ships alone" rule constrains popping, and D-3733 popped it next.
Full 44/44 run (shared `allmain.js`) — correct gate.

## Verification

D-log Verify (`verify.mjs --fn angrygods,randomize_gem_colors`):
syntax PASS, rule2 PASS, hidden writer-note, reach 51/51 + 80/80 →
REACH-OK, `randomize_gem_colors`: 2 PASS + 6 moved + 2 unchanged + 0
worse → PROGRESS, green/strict/cohort/full PASS → VERIFY: PASS. Plus
moveloop_core reach 80/80 and the pre-existing-owner disclaimer.

Re-measured by this audit
(`verify randomize_gem_colors,angrygods --base 611f68ced~1 --reach-all`;
`js/allmain.js` + `js/pray.js` untouched between this SHA and HEAD):

```text
verify randomize_gem_colors: 2 PASS, 6 moved past (3 re-attributed at the same step), 2 unchanged, 0 worse → PROGRESS
reach randomize_gem_colors: 992 baseline-PASS session(s) reach it (992 run): 992 PASS, 0 regressed → REACH-OK
verify angrygods: ... 0 session(s) blocked on it ...
reach angrygods: 51 baseline-PASS session(s) reach it (51 run): 51 PASS, 0 regressed → REACH-OK
```

Per-session lines match the ship claim exactly (Ranger-95403 +
Tourist-95425 PASS; 3 later-step moves; 3 same-step re-attributions
to process_menu_window; the 2 unchanged are the step-0 C-crash voids
D-3733 later proved unpassable). 0 worse, 0 regressed across 1043
reach sessions. No vacuous check (row cited 10; all 10 accounted).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
