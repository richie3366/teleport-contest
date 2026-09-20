# Review 1651 — bddd66f8 — `mon.c` adj_erinys restore-caller wiring (D-2692)

Metadata: commit `bddd66f8`, D-2692, `js/save.js` (+8) and
`js/monsters.js` (+2/−1 doc/convert lines). No prior review
claimed closed. Corrects D-2691's same-day Stale park (whose
premise — "restgamestate caller in unported save-infra" — this
commit falsifies); park line removed, unchecked row `- [x]` +
archived with `**Addressed:** D-2692` in this commit (observed
in the queue diff; the D-2691 archive row also gains its short
hash here).

## Intent vs deliverable

Subject promises: restore-caller wiring correcting the D-2691
park. Diff actually wires `reset_erinys() + adj_erinys(abuse)`
into `try_restore_save` after `relink_light_sources(false)` and
tightens the `uabuse` conversion. Matches the promise.

## Inventory

Changed JS: `try_restore_save` (js/save.js:924–925) — new call
site; `adj_erinys` (js/monsters.js:267) — doc + `| 0`→`>>> 0`
only. No deleted symbols. Import edge save.js→monsters.js
pre-exists (`imports.mjs --can` returns ALREADY — output
pasted in-session, stronger than the D-log's "SAFE"): no new
cycle surface, runtime-only reads, no top-level TDZ.

## C ↔ JS fidelity

C locus: `adj_erinys` `mon.c:5921–5966` (csym, 46 L — whole body
read). Callers: `attrib.c:1309` → `js/attrib.js:752`
(pre-existing, unchanged); `restore.c:727` → new `js/save.js:925`.
No RNG, no callees (pure flag/attack mutation).

- Threshold arms: C tests the `abuse` *parameter* (`unsigned`,
  `align.h:13`) nine times; JS tests `ab` (`abuse >>> 0`) nine
  times in the same order with the same constants and the same
  attack writes (`damn = 3`; second attack WEAP/DRST 3d4;
  third MAGC/SPEL 3d4). Confirm.
- Level arms: C uses `u.ualign.abuse` (not the parameter) for
  `mlevel = min(7 + abuse, 50)` / `difficulty = min(10 +
  abuse/3, 25)`; JS reads `game.u?.ualign?.abuse >>> 0` for
  both. The param/global split is preserved exactly — this is
  the distinction the old `| 0` comment blurred, and the new
  comment states it. Confirm.
- Restore site: C `:727` `adj_erinys(u.ualign.abuse)` runs in a
  fresh process (baseline `mons[]`); JS `reset_erinys()` (live
  export, `ERINYS_BASE` snapshot, allmain.js newgame precedent)
  restores baseline first, then re-applies the restored abuse —
  same end state under module reuse. Position matches C order
  (after `:726` relink). `game.u` is restored at js/save.js:848,
  well before :925, so the `?? 0` guard only fires in
  degenerate state. The focused restore session
  (`seed0013-friday13-save-then-fullmoon-restore` 4804/4804 +
  strict, cited in D-log) exercises the new call. Confirm.
- `| 0`→`>>> 0` is behavior-identical for realistic abuse
  values (unsigned per C); a type-fidelity nicety, not a fix
  claiming behavior change. Honestly commented as such.

Diff grep: no FORCE/DIAG/seed/coordinate. Rule #2 clean
(iteration-wide check at end of audit).

## Hallucinations / overclaim

None. The D-log explicitly frames this as a park correction,
not a fresh port, and the queue hygiene (park removal +
`- [x]` + archive in the same commit) is complete. The
D-2395-class caller miss that D-2691's park introduced survived
less than one iteration — the process self-corrected.

## Density

17 changed lines for a caller-wiring correction: Must-fix-class
single item, ships alone per §2b. Not padding.

## Verification

D-log Verify pattern per siblings, plus a focused restore-path
proof (save/load session PASS with strict). Re-ran
`hidden-proxy.mjs verify adj_erinys --base bddd66f8~1
--reach-all`: "0 blocked (0 at baseline…)" — vacuous note
properly stated — plus "24 PASS, 0 regressed → REACH-OK". No
REGRESSED. Queue row cited 0 blocks, so honest, not D-1831.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
