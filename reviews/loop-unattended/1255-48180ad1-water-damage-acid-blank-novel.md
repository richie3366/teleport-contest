# Review 1255 — 48180ad1 — water_damage residuals + blank_novel

Metadata: SHA `48180ad1`, D-2289, queue row `apply.c` splash_lit residuals.
js/: 3 files, +160/−34 (trap.js pot_acid_damage + arms + chain; zap.js
blank_novel + cancel arm; potion.js comment truth).

Intent vs deliverable: subject promises the acid-boom port, grease
`described` flag, scroll/book/potion message arms, chain acid_ctx/bhitpos,
and `blank_novel` + cancel wiring. Diff delivers all of it, nothing else.

Inventory: new file-local `pot_acid_damage` (`js/trap.js:5063`);
changed `water_damage`, `water_damage_chain`; new sync export
`blank_novel` (`js/zap.js:3389`, `sym.mjs` confirms); changed
`cancel_item` novel arm; comment-only `js/potion.js` hunk.

## C ↔ JS fidelity

C loci via `csym`: `trap.c:4656–4707` (pot_acid_damage),
`trap.c:4710–4852` (water_damage), `trap.c:4854–4888` (chain),
`zap.c:1365–1376` (blank_novel), `zap.c:1327` (cancel call site).

- pot_acid_damage: Blind off-invent `dknown = 0` ✓; ctx-valid-guarded
  `exploded` from dkn/unk_boom ✓; described arm `pline_The("potion%s…")`
  with `plur(quan)` ≡ `quan!==1?'s':''` ✓; else `simpleonames`+`vtense`
  with A/Some vs Another/More ✓; ctx counters, `setnotworn`+`delobj`+
  invent `update_inventory` in C order ✓. No RNG in C, none added. ✓
- water_damage: grease `described = TRUE` + acid call (`:4745–4751`) ✓;
  SCR_MAIL early-out under MAIL_STRUCTURES — `#define` confirmed live at
  `global.h:430`, same idiom as the file's acid-damage arm ✓; scroll
  `Your…fade` + `update_inventory` (`:4793`) ✓; Book steam with
  `CONTAINED_TOO|BURIED_TOO` locate + `isok`/`cansee` (`:4796–4806`) ✓;
  `blank_novel` on old-type SPE_NOVEL (`:4819–4820`) ✓; potion
  dilute/dilute-further arms with `Your` + updates (`:4828/:4838/:4845`)
  ✓. All five `Your` sites gate on `in_invent` as C does. ✓
- Chain: acid_ctx init/reset, bhitpos save/restore, head locate with
  `CONTAINED_TOO` only (`:4871`), otmp snapshot before the call — all
  match. (JS creates `game.bhitpos` if absent; C always has the struct —
  harmless, not a C-wrong.)
- blank_novel: `novelidx = 0`, `free_oname`, `container_weight` verbatim;
  called sync (no await) at both sites, matching C void calls. ✓
- potion.js `ER_DESTROYED && obj.in_use`: matches C `potion.c:2355–2357`
  token-for-token (short-circuit preserved — delobj'd acid never read). ✓
- Helpers: `otense`/`setnotworn`/`free_oname` all resolve to live sync
  exports (`sym.mjs`); all added names join existing import lists — no
  new module edge, no clone→import re-point, so no `--can` owed.

Hallucinations / overclaim: none. Every C citation (`:4657–4710`,
`:4712–4851`, `:4854–4890`, `:1367–1380`, `potion.c:2355`) resolves.

Density: one staticfn + its shared helper + row-named arms — §2b
right-sized (~125 lines of C-faithful JS for ~95 row-named C lines).

Verification: D-log reports `verify --fn water_damage` PASS
(syntax/rule2/green 2/2/strict/cohort 7/7) plus forced full 44/44, with
an honest vacuous hidden note. Re-measured:
`hidden-proxy verify water_damage --base 48180ad1~1` → 0 blocked at
baseline and working — confirms the vacuous claim, no regression hidden.
`imports.mjs --rulecheck` → clean. Diff grep: no FORCE/DIAG/seed/coordinate.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
