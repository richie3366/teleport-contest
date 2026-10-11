# Review 2702 — 53add89a1 — domove autodig arm (tunnels-chain skip lost)

Metadata: SHA `53add89a1`, D-3839, cliffs-head `dig.c` dig
writer (D-3247 read once per the tag — dig + use_pick_axe2
whole; the open arm is the domove autodig CALLER). JS:
`js/cmd.js` (+20/−2: arm + import + docs). Test:
`scripts/autodig-domove-pick.test.mjs` (new, 1 `it`).

## Intent vs deliverable

Promise: sweep-Wizard-578213@482 bumps VWALL with autodig +
wielded pick; C takes test_move :1042–1048 → use_pick_axe2 →
same-turn dig tick, JS fell to the silent mention_walls bump.
New arm in domove after the tunnels chew, in C order;
session PASSes. Diff actually does: the arm + `is_pick` added
to the existing objects.js import (canonical export —
correctly NOT a 5th local clone per `sym.mjs`) +
`use_pick_axe2` already imported + deferred-doc update. Match,
except the Actionable below.

## Inventory

- `domove` (js/cmd.js:6770–6787) — new arm. C:
  `nethack-c/upstream/src/hack.c:1011–1048` (read): obstructed
  chain `Passes_walls+may_passwall (:1014) → Underwater (:1017,
  message + FALSE) → IRONBARS chew (:1024) → tunnels &&
  !needspick (:1037, still_chewing TRUE → FALSE) → autodig
  `flags.autodig && !run && !nopick && uwep && is_pick(uwep)`
  (:1042, use_pick_axe2 + FALSE) → else bump prose`. JS gate
  matches the autodig conjunct term-for-term
  (`destTyp !== IRONBARS && IS_OBSTRUCTED && !uinwater &&
  autodig && !run && !nopick && uwep && is_pick`), sits after
  the tunnels arm, and ends `move=0; nomul(0); return` per
  domove_core :2843–2848 (read; door_opened is false on the
  rock path, same as the D-3819 tunnels arm above).
- `is_pick` (js/objects.js:138, sync, canonical) — LIVE; body
  verified identical to C `obj.h:220–222` (WEAPON/TOOL_CLASS +
  oc_skill == P_PICK_AXE). `use_pick_axe2` (js/dig.js:2636,
  async per `sym.mjs`) — LIVE, awaited. No re-points of
  deleted symbols — no `sym.mjs` paste required.

## C ↔ JS fidelity

The common path is C-exact (probe to PASS, prefix probe
pins uwep/autodig/run/nopick/dx/VWALL). But the inline port
loses C's else-chain skip: in C, when the tunnels arm matches
(`tunnels && !needspick`, :1037) but `still_chewing` returns
FALSE (chewed through this move), control skips the rest of
the chain — autodig (:1042) does NOT evaluate — and test_move
continues to the boulder checks and `return TRUE` (:1253,
read: "OK, it is a legal place to move"). In JS, the tunnels
`if` merely fails to return, and the new autodig `if` fires on
the STALE `destTyp` (captured cmd.js:6736, before
still_chewing ran): a poly'd umber hulk (M1_TUNNEL without
M1_NEEDPICK, has hands — monsters.h:2275; xorn/mole are
NOHANDS) wielding a pick with autodig on, chewing through
rock, gets `use_pick_axe2` + move=0 in JS where C moves onto
the fresh cell with no dig occupation. No session reaches it
(all greens + 16/16 reach hold), but JS contradicts C on a
legal conjunction — a C-wrong, not a named omit. Fix: one
guard clause (names already in scope).

## Hallucinations / overclaim

None on the claim (movement real, C order cited correctly for
the shipped path). The review's finding above is a gap the
D-log doesn't discuss, not an overclaim — the arm was
presented as C-ordered, and it is except for the chain-skip
interaction.

## Density

Cliff-phase: head writer correct (the domove caller D-3247
left open; D-3819 precedent honored). One arm, Ledger
`test_move partial` + D-3839. Verify bullet: 1 PASS +
REACH-OK + green + strict + cohort + forced full 44/44
(domove change, D-3819 precedent). Reached: probe FULL
PASSES. Verdict drivers: the C-wrong below.

## Verification

js-hunk grep: 0 hits. Rule #2 clean (iteration-wide run).
Re-measure (mine, default spread + all blocked): `verify dig
--base 53add89a1~1` → `1 PASS, 0 moved past, 0 unchanged,
0 worse` (Wizard-578213 PASS — exact claim); reach 16/16
REACH-OK. Zero regressed. The movement claim is true; the
C-wrong is latent (no corpus session poly'd-tunneling with a
pick at chew-through).

## Actionable C-wrongs

1. (Must-fix — js/cmd.js domove autodig arm fires where C's
   else-chain skips it.) Guard the :1042–1048 arm with the
   tunnels-match exclusion, e.g. `&& !(ydat && tunnels(ydat)
   && !needspick(ydat))` (hoist `ydat` from the tunnels block
   above), so a tunnels&&!needspick polyform that chewed
   through (still_chewing FALSE) falls past to the live bump
   re-read like C instead of starting a dig occupation. C:
   hack.c:1037–1048 (else-if chain) + :1253 (return TRUE);
   monsters.h:2275 (umber hulk witness). Add a focused test
   (poly'd tunnels form + pick + autodig + chew-through →
   no use_pick_axe2, move proceeds). One port iter.

Verdict: **QUALITY-RISK**
