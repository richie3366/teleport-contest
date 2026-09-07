# Review 1000 — 525cbba9 — covetous pursuit tactics/target_on/mnearto (D-2030)

Metadata: SHA `525cbba9`, D-2030, Open-row port (parked
`collect_coords` proven symptom owner; true writer is the
tactics/mnearto envelope, 4 moved). js/ touches
`js/wizard.js` (+270/−) and `js/mon.js` (+121/−).
No stamp owed.

## Intent vs deliverable

Subject promises: `you_have` + `target_on` statics,
`strategy` bands/pursuit chains, full `tactics` (HEAL +
harass + default pursuit), `mon_leaving_level` +
exported `mnearto`; 7 new import edges `--can` SAFE;
dynamic `unstuck` across the mon↔mhitu cycle; `m_at`
for MON_AT and lazy `mgoal` as documented judgment
calls. Diff actually adds: `you_have`, `target_on`,
rewritten `strategy`, rewritten `tactics`,
`mon_leaving_level`, exported `mnearto`, the listed
imports. Promise == diff. `choose_stairs` is pre-existing
(6 refs in parent), not new.

## Inventory

- New JS: `you_have`, `target_on` (static, wizard.js);
  `mon_leaving_level` (static, mon.js), `mnearto`
  (exported). Rewritten: `strategy`, `tactics`.
- Callee closure, all LIVE: `which_arti`/`mon_has_arti`/
  `other_mon_has_arti`/`on_ground` (wizard.js:220–271
  sync); `mnexto` (mon.js:1646 async, awaited);
  `unstuck` (mhit**u**.js:1586 async — the one-letter
  trap noted correctly; taken via dynamic import);
  `choose_stairs`/`healmon`/`goodpos`/`rloc_to_flag`/
  `deal_with_overcrowding` pre-existing edges.
- No STUB / no-op. Named: none (every arm's callee
  live); the two judgment calls are documented, not
  deferred.

## C ↔ JS fidelity

- `you_have` vs `wizard.c:215–233`: five-case switch on
  uhave fields verbatim; insight.c macro collision
  noted correctly (unrelated same name).
- `target_on` vs `:235–267`: M_Wants gate inlined
  (`mflags3 & mask`), PLAYER/GROUND/MONSTR arms in C
  order with the Amulet-vs-Wizard/priest guard
  (`otyp != AMULET || (!iswiz && !inhistemple))`),
  mgoal-zero + STRAT_NONE fallthrough. Exact.
- `strategy` vs `:269–327`: covetous/shk-priest gates
  (ispriest now `&& inhistemple`, matching C), bands
  0–3 with `default:`→HEAL (JS `default: case 0:`
  preserves C's band≥4 → HEAL edge), dstrat + Amulet
  then invoked ARTI/BOOK/BELL/CAND vs non-invoked
  BOOK/BELL/CAND/ARTI chains in C order. Exact,
  including the subtle default-band arm.
- `tactics` vs `:368–468`, RNG call-for-call:
  `rn2(3+mhp/10)` rloc gate (int-division shape kept),
  stair `mnearto`+`rloc_to` fallback, `distu`→`dist2`
  (exact: hack.h:1531 `#define distu(xx,yy)
  dist2(...u.ux,u.uy)`), `mhp<=max-8` guard *outside*
  `rnd(8)` as in C, C FALLTHROUGH to harass kept as
  real switch fallthrough, `rn2(5/33)` harass,
  `rn2(5)` occupied-harass with C's operand order
  (`!rn2(5) && !noteleport`). Ground pickup pline +
  extract + mpickobj + return 1 verbatim.
- `mnearto` vs `mon.c:4030–4085`: early-out,
  move_other lift (MON_OFFMAP + mx/my=0), goodpos
  else enexto/isok, rloc_to_flag, single FALSE
  recursion, overcrowding on both failure paths,
  1/2/0 returns. Verbatim modulo await.
- `mon_leaving_level` vs `mon.c:2694–2730`:
  mtrapped clear, unstuck, <0,0> vault guard,
  worm-vs-grid removal, `#if 0` zeroing correctly
  left out (documented), mundetected/seemimic/
  fill_pit/newsym on-map block, polearm-hitmon
  forget. Exact.

## Hallucinations / overclaim

One, non-material: "nothing imports wizard.js so no
new cycle" is false — 9 files (monmove, polyself,
spell, pray, sounds, shk, mcastu, potion, do) already
imported wizard.js at both this SHA and its parent.
The edges added are still TDZ-safe in effect
(hoisted/async function decls, runtime-only calls;
`--can` on mon→mhitu confirms SCC-membership
reasoning, full 44/44 green), so this is a D-log
accuracy slip, not a code defect. No Must-fix.

## Density

421 insertions on a five-function cluster in two
already-coupled modules — at the top of §2b but one
C locus family (covetous pursuit) with one falsifier.
Ceiling raised, justified; not two hypotheses.

## Verification

- `imports.mjs --rulecheck`: clean. Diff grep: no
  FORCE/DIAG/getRngLog/seed-gate/fastforward/coords.
- "verify tactics: vacuous" is honest (tactics owns
  no scoreboard row); the real falsifier
  `collect_coords` re-measured `--base 525cbba9~1`:
  `0 PASS, 4 moved past, 0 unchanged, 0 worse →
  PROGRESS` — matches the D-log step-for-step
  (Healer-92107→passive@121, Priest-92235→dochug@59,
  Samurai-91113→mhitm_ad_samu@53,
  Wizard-92103→mhitm_ad_samu@99).
- Green + strict ×2, cohort 7/7, **full 44/44** (mon.js
  shared → --full forced). No D-1831 gap; the two
  reverted false starts left no residue in the tree.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
