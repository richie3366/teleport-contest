# Review 1240 — 075d9c80 — scatter landmine arm + blow_up_landmine wiring

- SHA: `075d9c80` — "`explode.c` scatter landmine arm (D-2274)"
- D-log: D-2274. Queue row: `explode.c` scatter (data.md:1046 named omit).
  No corpus session reaches a landmine scatter.
- Character: omission fix + caller wiring, no corpus divergence.

## Intent vs deliverable

Subject promises: MAY_FRACTURE/MAY_DESTROY/uball/flooreffects/tail arms in
`scatter` plus `blow_up_landmine` wiring. Diff actually adds: the
impossible site-gate, uball/uchain shatter, fracture/destroy arms,
`flooreffects`-gated placement, hideunder/mtrapped/maybe_unhide tail in
`js/explode.js`, and the async `scatter(...)` call with C flags in C
position in `js/trap.js` with both call sites awaited. Promise matches diff
exactly.

## Inventory

- Changed JS: `scatter` (`js/explode.js:856-1050`); `blow_up_landmine`
  (`js/trap.js:4733-4745`, sync→async); two call sites awaited (`:4816`,
  `:4860`). New imports ride existing edges; `scatter` already imported in
  `trap.js:29` (shared with `launch_obj`).
- Required `sym.mjs` output (all LIVE, none deleted/re-pointed, so no paste
  owed beyond this): `fracture_rock js/dig.js:1564 sync` (called sync ✓);
  `break_statue js/dig.js:1589 ASYNC` (awaited ✓);
  `breaks js/dothrow.js:1323 ASYNC` (awaited ✓);
  `flooreffects js/do.js:677 ASYNC` (awaited ✓);
  `maybe_unhide_at js/monmove.js:1246 ASYNC` (awaited ✓);
  `hideunder js/mon.js:3106 sync` (canonical export imported, not the
  `monmove.js:1189` clone ✓); `unpunish js/read.js:1843 sync` (called sync
  ✓). `blow_up_landmine` stays module-local; both call sites are in-file and
  awaited — no floating promise.

## C ↔ JS fidelity

C loci (via `csym.mjs`): `scatter` `explode.c:720-947`;
`blow_up_landmine` `trap.c:3171-3219`.

- Site gate `:747-749`: `await impossible(...)` with the C format. ✓
- Shop baseline `:753-756` omitted — named (no live `credit_report`),
  with the gold-`addtobill`/restack/`lostgoods` dependents named alongside. ✓
- uball/uchain `:762-771`: identity vs `u.uball`/`u.uchain` (ball.js house
  idiom), `se_chain_shatters`, "The chain shatters!" (≡ C `pline_The`),
  `unpunish()`, `waschain → continue`, else fall through to the quan split —
  C order preserved. ✓
- MAY_FRACTURE `:782-821`: `rn2(10)` 9/10 gate; boulder cansee→`Tobjnam`
  pline vs sound+`You_hear`; `fracture_rock` + place; statue `t_at`+
  STATUE_TRAP `deltrap`, crumble pline/sound, `await break_statue` + place;
  `newsym` + `used_up`. The `sobj_at` restack is named (12 local clones, no
  canonical export). ✓
- MAY_DESTROY `:823-829`: `!rn2(10) || material == GLASS(19) || EGG` →
  `await breaks` gates `used_up`. ✓
- Placement/tail: `flooreffects(obj,x,y,"land")` gates place+stack (C
  verbatim); `u_at && uundetected && hides_under` → `hideunder`;
  `m_at && mtrapped → 0`; `maybe_unhide_at`. The `credit_report lostgoods`
  tail falls with the named shop omit. ✓
- `blow_up_landmine`: `scatter(x,y,4,MAY_DESTROY|MAY_HIT|MAY_FRACTURE|
  VIS_EFFECTS,null)` first, then del_engr/wake/door — C `:3176-3184` order
  verbatim. VIS_EFFECTS is commented out in C too. ✓
- RNG call-for-call on the new arms: `rn2(10)` fracture, `rn2(10)` destroy
  (short-circuit before material/egg, as in C), flight `rn2(N_DIRS)`/`rnd`
  untouched below. ✓

No C-wrong.

## Hallucinations / overclaim

None. The "/tmp probes" are throwaway (kept out of tree); no corpus PASS
claimed; hidden note honestly vacuous.

## Density

~150 insertions for a 228-line C function minus the pre-existing flight
core — one C locus family plus its single caller. At the top of §2b but the
arms are one envelope (one falsifier: landmine blast pile). Acceptable.

## Verification

- Re-measured: `node scripts/hidden-proxy.mjs verify scatter --base
  075d9c80~1` → "0 session(s) blocked on it (0 at baseline, 0 in the working
  scoreboard)". Matches the D-log; row cited 0 blocks so no older `--base`
  owed.
- Diff-hunk grep clean; `imports.mjs --rulecheck` clean (re-run review
  1239). D-log cites green 2/2 + strict ×2 + cohort 7/7 + hand full 44/44;
  the end-of-iteration cadence run re-covers the fortress.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
