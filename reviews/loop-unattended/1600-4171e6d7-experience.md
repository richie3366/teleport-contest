# Review 1600 — 4171e6d7 — exper.c experience whole-body port (D-2641)

**Metadata:** SHA `4171e6d7`, `exper.c` `experience`, D-2641.
JS: `js/exper.js` only (+53/−...: two deferred arms ported, `void
AD_WRAP` placeholder removed, per-arm re-cites; 3 extended import
lines, no new edges). No prior review claimed closed.

## Intent vs deliverable

Subject promises: port the two named-omitted arms — eel AD_WRAP
+1000 (`:125–126`) via file-local Amphibious expansion, mail-daemon
tmp=1 (`:139–140`) via mndx compare in C order — removing the
placeholder. Diff delivers exactly that; all other arms are
re-cited context, byte-unchanged. Promise matches deliverable.

## Inventory

- `experience` (exper.js, sync) — two arms added, rest re-cited.
- `Amphibious_hero` (exper.js:52) — new file-local (C macro
  expansion, see fidelity).
- `PM_MAIL_DAEMON` const via `monsterNames.indexOf` (idx 314,
  verified — no −1 hazard).
- No deleted symbol, no local→import re-point.

## C ↔ JS fidelity

C locus `exper.c:84–166` (83 L, via `csym.mjs experience`; no RNG
in C body or JS — nothing to walk). Arm-by-arm confirm:

- `:90` base, `:93–94` AC, `:97–98` speed (`Math.trunc` integer
  halve ≡ C `/2` on NORMAL_SPEED) — unchanged, exact.
- aatyp loop `:101–111`, heavy-damage `:123–124`, extra_nasty
  `:130–131`, level bonus `:134–135`, revive scale-down `:143–163`
  — unchanged context, exact.
- Eel `:125–126` NEW: `tmp2===AD_WRAP && ptr.mlet==='S_EEL' &&
  !Amphibious_hero()` → +1000 ≡ C `AD_WRAP && mlet==S_EEL &&
  !Amphibious` ✓ (`mlet` string shape per allmain.js:425).
- Mail `:137–141` NEW: `(ptr?.mndx ?? −1)===PM_MAIL_DAEMON` →
  tmp=1, placed between the level bonus and the revive block =
  C order ✓; `MAIL_STRUCTURES` always on (global.h:430), so no
  ifdef arm is missing ✓; pointer-compare → mndx-compare is the
  monmove.js:1854 / mhitm.js:3586 shape ✓.
- `Amphibious_hero` vs C macro youprop.h:272 (`HMagical_breathing
  || EMagical_breathing || amphibious(youmonst.data)`, where H/E
  are the uprops intrinsic/extrinsic fields): the file-local reads
  legacy `u.HMagical_breathing`/`u.EMagical_breathing` plus
  `uprops[MAGICAL_BREATHING]` intrinsic/extrinsic plus live
  `amphibious()` (monsters.js:417) — textually identical to
  teleport.js `_uprop_he`'s body (read here) and the same shape as
  the teleport.js:273 / mhitu.js:2453 sites. `sym.mjs Amphibious`
  warns "do NOT write clone #3" — checked: C has a macro, not a
  function, so per-site expansion is the norm, all three expansions
  agree, and no export exists to import. Verified CLONE, no drift —
  not a row (a shared export would touch two files for zero
  behavior change).
- Callee closure: find_mac / extra_nasty / amphibious / NATTK /
  NORMAL_SPEED — all LIVE. Named: null-data guard (pre-existing,
  kept), exp_percent_changing/SCORE_ON_BOTL (botl scope, map line
  stands).

## Hallucinations / overclaim

D-log's C cites (`:125–126`, `:139–140`, `:134–143` order,
youprop.h:272, global.h:430) all check against the read bodies.
"ALREADY" for the amphibious edge — `sym.mjs` confirms the live
monsters.js export. No dispatch-vs-stub overclaim (both arms are
straight-line arithmetic, no callees to stub).

## Density

83-line C function, one module, ~53 JS insertions. Right-sized
(one function, two arms + cites).

## Verification

- `node scripts/imports.mjs --rulecheck` → Rule #2 clean (whole `js/`).
- Diff added-lines grep: 0 `FORCE`/`DIAG`/`getRngLog`/`fastforward`.
- Re-measured: `hidden-proxy.mjs verify experience --base
  4171e6d7~1 --reach-all` → `0 session(s) blocked` (vacuous-note
  path, honestly labeled — coverage row, no corpus owner) + `smoke
  24/24 PASS, 0 regressed → REACH-OK`. Both summary lines cited;
  no REGRESSED session. Matches the D-log's bullet.

## Actionable C-wrongs

None. Both arms C-exact in C order; the macro expansion is
verified equivalent to its siblings.

Verdict: **ACCEPT**
