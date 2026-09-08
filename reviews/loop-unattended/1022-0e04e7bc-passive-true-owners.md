# Review 1022 — 0e04e7bc — passive proxy: find_roll maybe_polyd + abon poly + mdamageu lethality (D-2052)

Metadata: SHA `0e04e7bc`, D-2052, Open-row port
(queue proxy-owner `passive`, 3 sessions, three
distinct true causes). js/ touches 1 file:
`uhitm.js` (+49/−... ). No stamp owed.

## Intent vs deliverable

Subject promises: (1) `find_roll_to_hit` adds the
poly-form level term; (2) `abon` early-returns the
poly arm; (3) all five passive arms call
`mdamageu` (not losehp) with a gameover bail, and
`hmonas` bails before knockback on death. Diff
actually does all three, plus one import-name
extension on a pre-existing edge. Promise ≡ diff.

## Inventory

- Changed JS: `abon` (`uhitm.js:334`), early
  poly return; `find_roll_to_hit` (`:449`),
  `formlevel` term; `passive` (`:1587+`), dynamic
  `mdamageu` import + 5 call-site swaps + bails;
  `hmonas` (`:2633`), gameover bail.
- `sym.mjs`: `adj_lev js/makemon.js:828 sync`
  (LIVE, extends the existing makemon import —
  no new edge); `mdamageu js/mhitu.js:562 ASYNC`
  (LIVE, awaited at all 5 sites ✓).
- No symbol deleted or re-pointed.

## C ↔ JS fidelity

C loci read directly:

- `uhitm.c:376-379`: `tmp = 1 + abon() +
  find_mac + uhitinc + luckbon +
  maybe_polyd(youmonst.data->mlevel, u.ulevel)`;
  `youprop.h:22`: `#define maybe_polyd(if_so,
  if_not) (Upolyd ? (if_so) : (if_not))` → JS
  `Upolyd(u) ? data.mlevel : u.ulevel` ✓ exact.
  (Rogue-92026: same `rnd(20)=16` both sides,
  verdict flipped — the term is the whole cause.)
- `weapon.c:955-956`: `if (Upolyd) return
  (adj_lev(&mons[u.umonnum]) - 3);` → JS
  `if (Upolyd(game.u) && game.youmonst?.data)
  return adj_lev(data) - 3;` ✓. The `?.data`
  guard only fires when unpoly'd-or-missing
  (then falls to STR/DEX bands, C-identical for
  non-poly) — safe, not a behavior fork.
- Passive arms (`uhitm.c:5915/5988/6077/6100/6113`):
  C calls `mdamageu(mon, tmp)` in every arm
  (MAGM `:5988` and COLD `:6077` read verbatim;
  the other three are the same identifier at the
  same switch positions). JS swapped all five
  `losehp` sites — the old call was the C-wrong:
  losehp can never `done_in_by` a killer-named
  death, and (c) Wizard-92153's whole divergence
  was the missing cold-pline + death path ✓.
  AD_COLD order kept: mdamageu → bail-check →
  `healmon((tmp+rn2(2))/2…)` → split gate, matching
  C `:6077-6082` for the survived path ✓.
- Lethality: C `mdamageu` → `done_in_by(mtmp,
  DIED)` (noreturn); JS `mdamageu` awaits
  `done_in_by` which sets `program_state.gameover`
  — the `dead()` bail + `hmonas` pre-knockback
  bail mirror the noreturn ✓. (Knockback draws
  RNG, so bailing before it is load-bearing, not
  cosmetic.)
- Dynamic `import('./mhitu.js')` inside passive:
  static uhitm↔mhitu would cycle; runtime-only
  import dodges TDZ exactly like the existing
  hitum caller below ✓.

Callee closure: adj_lev/mdamageu LIVE and awaited
where async; monstunseesu/shieldeff/ugolemeffects
stay named omits (RNG-free display/knowledge;
no blocked session reaches them).

## Hallucinations / overclaim

None. "Proxy owner was symptom for (a)/(b), true
owner for (c)" is the honest attribution split —
(a)/(b) move on the hit-verdict terms, (c) passes
on the mdamageu arm.

## Density

Three causes, one proxy row, one file, one
subsystem (uhitm hit-verdict + passive). Playbook
§5 requires triaging every failing session's first
divergence and fixing each cause once — splitting
this into three iters would triple the fixed cost
for three hunks that share one falsifier family.
Right-sized as a cluster.

## Verification

- Diff-hunk grep: zero FORCE/DIAG hits; no
  getRngLog/seed/fastforward/coords.
- Re-measured `hidden-proxy verify passive
  --base 0e04e7bc~1`: `1 PASS, 2 moved past,
  0 unchanged, 0 worse → PROGRESS` (Healer-92107
  → readobjnam_postparse1@126 was 121;
  Rogue-92026 → mattacku@163 was 102;
  Wizard-92153 PASS) — matches the D-log
  owner-for-owner, step-for-step.
- Green 2/2 + strict, cohort 7/7, then `--full`
  44/44 per the commit message (uhitm.js is
  shared — full correctly ran).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
