# Review 1548 — 8c2867e4 — uhitm.c mhitm_ad_rust + hitum_cleave (D-2589)

## Metadata

- SHA: `8c2867e4`
- D-id: D-2589. Next index: 1548.
- Files: `js/mhitm.js` (+95/−0), `js/uhitm.js` (+98/−9: cleave port
  + Cleaver guard + rust damageum arm).
- C locus:
  - `nethack-c/upstream/src/uhitm.c:2280–2335` (`mhitm_ad_rust`),
    via `node scripts/csym.mjs` plus full direct read here.
  - `nethack-c/upstream/src/uhitm.c:649–731` (`hitum_cleave`,
    staticfn) + `:767–771` (hitum Cleaver guard), direct reads here.

## Intent vs deliverable

Subject promises the rust 3-arm port (uhitm arm, mhitu `_u` split,
mhitm arm, both dispatches) and the cleave 3-swing port (module-level
clockwise, per-swing boxes, plain `tmp > dieroll`, bhitpos save/
restore, hitum guard). Diff delivers all of it. Promise matches
deliverable.

## Inventory

- New exported: `mhitm_ad_rust(magr, mattk, mdef, mhm)`
  (`js/mhitm.js:940`, ASYNC). `sym.mjs` → single export. LIVE.
- New module-local: `hitum_cleave` (`js/uhitm.js:2848`, ASYNC) +
  module `hitum_cleave_clockwise` — correct single local for a C
  staticfn (delete_ls precedent), not drift.
- New arms: `mdamagem` AD_RUST (`js/mhitm.js:4245`) + damageum AD_RUST
  (`js/uhitm.js:2391`) + hitum Cleaver guard (`js/uhitm.js:2924`).
- No deleted symbols.
- Joined symbols checked here:
  - `XKILL_NOMSG js/const.js:2438 export const` — LIVE.
  - `erode_armor js/mhitm.js:2140 ASYNC` — LIVE, awaited.
  - `mhitm_ad_rust_u`: 1 local in mhitu.js:2607 (split precedent).
  - `--can uhitm.js→artifact.js` and `→display.js`: both ALREADY.
- Callees: `erode_armor`, `xkilled` (dynamic import — the
  mhitm↔uhitm static-cycle convention), `monkilled`, `grow_up`,
  `mlifesaver`, `find_roll_to_hit`, `known_hitum`, `passive`,
  `unmap_invisible` — all LIVE (dcay/elec precedents).
- RNG: rust draws none of its own (callee draws live); cleave draws
  `rnd(20)` per swing exactly where C does — and no baseline session
  wields Cleaver, honestly stated.

## C ↔ JS fidelity

Callee closure per arm — no STUB in any live arm:

- Rust uhitm `:2286–2298`: ungated falls/starts-to-fall pline with
  the lifesaver ternary, `xkilled(NOMSG)`, `hitflags |= DEF_DIED`,
  erode, damage 0. Match. `completelyrusts` as `mndx ===
  PM_IRON_GOLEM` — verified against `mondata.h:227` here
  (`((ptr) == &mons[PM_IRON_GOLEM])`). Match.
- Rust mhitu `:2299–2316` vs pre-existing `mhitm_ad_rust_u` (read in
  full here): hitmsg, mcan return, golem → "You rust!" +
  rehumanize + return, else erode youmonst. Verified CLONE, complete.
- Rust mhitm `:2317–2335`: mcan keep (returns with leftover intact —
  JS `if (magr.mcan) return` before touching damage, correct);
  vis-gated `pline_mon` falls-to-pieces; `monkilled(null, AD_RUST)`;
  lifesaved → MISS + done; else `DEF_DIED | grow_up AGR_DIED` +
  done; else erode + WAITFORU clear + damage 0. Match on every line.
- Cleave `:651–731` (walked statement by statement): DIR_ERR →
  impossible + TRUE; ±2 pre-adjust; umort/bhitpos/notonhead saves;
  3-loop with in-loop `{v:0}` boxes; step direction; isok continue;
  `m_at` with the invisible-unmap branch; fresh `u.uwep` reads;
  `tmp > dieroll` plain (no uswallow fold — correct, C cleave has
  none); bhitpos/notonhead set; `known_hitum` with `armorpenalty.v`;
  `passive(..., mhp>=1, AT_WEAP, !uwep)`; break on gone-weapon /
  multi<0 / umortality rise; clockwise flip; restores; `!(target &&
  mhp<1)` return. Match throughout.
- The cleave invisible check (`memory_glyph_is_invisible` on
  `game.level.at`) was audited, not trusted: `unmap_invisible`
  itself guards on the same helper (`js/display.js:1438`), and the
  identical idiom is live at mhitm.js:3123/3568 + uhitm.js:4306 —
  engine convention for C `levl[x][y].glyph` checks, not a new
  divergence.
- Hitum guard `:767–771` (`u_wield_art(CLEAVER) && !twoweap &&
  !uswallow && !ustuck && !NODIAG`) returning the cleave result in
  malive shape. Match.

## Hallucinations / overclaim

None. The D-log keeps `mhitm_ad_fire`'s uhitm arm named with its
exact location instead of claiming it.

## Density

193 insertions for a 56-line C function + an 83-line C staticfn +
three dispatch wirings — two function families in one file pair,
right size (§2b).

## Verification

- D-log claims both `verify.mjs --fn` → VERIFY: PASS (coverage rows,
  0 blocked — honestly stated).
- Re-ran here (required), both fns:
  - `hidden-proxy verify mhitm_ad_rust --base 8c2867e4~1 --reach-all`
    → 0 blocked both sides + smoke 24/24 REACH-OK.
  - `hidden-proxy verify hitum_cleave --base 8c2867e4~1 --reach-all`
    → 0 blocked both sides + smoke 24/24 REACH-OK.
- Claims confirmed, not vacuous-by-rewrite.
- Diff grep: no FORCE/DIAG/`getRngLog`/seed/coordinate/`fastforward`.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
