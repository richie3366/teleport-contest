# Review 2050 — 56c8b137b — lose_weapon_skill + abon + show_skills (D-3090)

Metadata: SHA `56c8b137b` (HEAD), D-3090, js/weapon.js (+71/−1),
js/attrib.js (+15/−3 tail wiring), js/dig.js + js/uhitm.js (clone
deletion + import rewire). Two ports + one verified-complete.

## Intent vs deliverable

Promise: lose_weapon_skill whole + adjabil tail wiring; canonical
abon whole (both drifted clones deleted, both call sites rewired);
show_skills verified complete. Diff delivers all three + the
adj_lev import move. Kept.

## Inventory (per function)

- `lose_weapon_skill` (NEW export js/weapon.js:1081): `--n` loop,
  free-slots-first, record pop, panic-guard throw, rank--, refund.
  Callees: slots_required/P_SKILL/set_P_SKILL LIVE (same file),
  P_UNSKILLED const. Caller attrib.c:1072 wired in the adjabil tail.
- `abon` (NEW export js/weapon.js:1362, canonical home): ACURR pair,
  Upolyd → adj_lev−3, full STR ladder via live STR18(), ulevel
  kludge, full DEX ladder. Callees: acurr/adj_lev LIVE. Deleted:
  dig.js:1596 + uhitm.js:481 local clones (re-pointed to the import
  — `sym.mjs` pasted below, Method §3). Callers rewired at both
  sites, adj_lev dropped from uhitm's import.
- `show_skills` (PRE-EXISTING export :1665, no code change):
  pline + add_skills_to_menu(FALSE/FALSE) + house PICK_NONE. Sole C
  caller retired (DUMPLOG, D-1776) — correctly unwired.

## C ↔ JS fidelity (per function)

lose_weapon_skill (C :1452–1473): `--n>=0` ✓; slots-first ✓
(truthiness ≡ nonzero); `skill_record[--skills_advanced]` ✓;
`P_SKILL<=P_UNSKILLED` → throw ≡ panic (insert_branch precedent;
P scale 1/2/3/4 ≡ C skills.h:92–97, verified — the guard is exact,
not off-by-one) ✓; rank-- via setter ✓ (C `P_SKILL(skill)--`);
refund `slots_required−1` ✓. Caller C attrib.c:1068–1073 ≡ JS
tail :1004–1012 char-for-char in structure (`oldlevel>0`,
gain→await add (async disclosed), else→lose) ✓; postadjabil stays
deferred above it (pre-existing, C calls it per-ability earlier —
order preserved for live code) ✓. No RNG. Verdict: ACCEPT.

abon (C :949–989): ACURR pair ✓ (A_DEX import added); Upolyd →
`adj_lev(youmonst.data)−3` ✓ (`?.data` guard fires only where C
cannot be — disclosed); STR ladder with live STR18(50)/STR18(100)
✓ — restores sbon 3, CLOSING the D-2052-named `sbon=3` deferral;
ulevel<3 kludge ✓; DEX ladder all five arms ✓ exact. Callers: C
dig.c:366 ≡ js/dig.js:2309 (`10+rn2(5)+abon()+spe−erosion…`) ✓;
C uhitm.c:376 ≡ js/uhitm.js:571 (`1+abon()+find_mac+uhitinc`) ✓;
exactly one call each, no others ✓. Both old clones' gaps fixed
(dig's missing DEX+Upolyd arms; both STR caps). The deleted poly
comment's substance lives in D-2052 (Upolyd arm fix, session
moved past) — nothing buried. Behavior change is fortress-safe:
full 44/44 + cohort + smoke all green (changed states unreached
there; pure function → smoke-spread methodology correct). The
`?.data` guard and Upolyd arm are byte-identical to the old
uhitm clone on the poly path — zero change there. No RNG.
Verdict: ACCEPT.

show_skills (C :1305–1318): pline/create/start/add(FALSE,FALSE)/
end("")/select PICK_NONE/destroy ≡ JS lines ✓ (house menu
mapping, D-2704). Caller end.c:602 is DUMPLOG-retired → no JS
caller, correctly (doc says so) ✓. "Verified complete" holds.
Verdict: ACCEPT.

`sym.mjs abon` (REQUIRED — deleted clones):

```text
abon             js/weapon.js:1362   sync
```

Single export, zero clones — unification complete. New-edge
`--can` ×2 (attrib→weapon, weapon→makemon) → both ALREADY
(pre-existing edges; D-log's "joins the SCC" overstates novelty
but the safety conclusion holds — runtime body-use only, no
top-level reads). No stubs.

## Hallucinations / overclaim

None. "no other C/JS callers" verified (csym 2 refs + grep 1+1).
`sbon 3` restore claim true (and closes D-2052's deferral).
Edge `--can` claims hold (trivially — pre-existing edges).

## Density

One C file, 2 whole ports + 1 verified-complete + caller wiring —
§2b-shaped ✓. `Ledger:` 3 ported ✓ (abon/show_skills measured
PARTIAL is the line-counter's opinion; bodies verified whole
here). Per-function: 3× ACCEPT → SHA ACCEPT.

## Verification

- Re-measured `hidden-proxy verify
  lose_weapon_skill,abon,show_skills --base 56c8b137b~1
  --reach-all`: all three `0 blocked (0/0)` + `smoke 24/24,
  0 regressed → REACH-OK`. Matches the D-log; honestly vacuous.
- Ban-grep on js hunks: clean. Rule #2 clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
