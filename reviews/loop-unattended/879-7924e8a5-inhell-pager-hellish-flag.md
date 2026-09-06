# Review 879 — 7924e8a5 — pager.c Inhell_pager reads the dungeon hellish flag, not the Gehennom dnum (D-1909)

Metadata: SHA `7924e8a5`, D-1909. Files: `js/pager.js` (1 predicate
body + doc line + 1 import word dropped), review-873 stamp (`Addressed: D-1909`), Must-fix row archived.
Next index 879.

Intent vs deliverable: subject promises `Inhell_pager` reads the
dungeon `hellish` flag instead of comparing dnum to Gehennom. The
diff delivers exactly that one-line body swap plus the doc-line fix
and the now-unused `GEHENNOM` import drop, nothing else. Promise ≡
diff.

Inventory: 0 new functions, 1 body changed (`Inhell_pager`,
`js/pager.js:804`), 0 callers re-pointed (sole call site
`js/pager.js:899` untouched).

**C ↔ JS fidelity** (`csym In_hell` →
`nethack-c/upstream/src/dungeon.c:1941–1945`, 5 lines):
`return (boolean)(svd.dungeons[lev->dnum].flags.hellish)` — a flag
read, no dnum comparison anywhere; `dungeon.h:140` confirms
`Inhell` ≡ `In_hell(&u.uz)`. New JS
`!!(game.dungeons?.[game.u?.uz?.dnum | 0]?.flags?.hellish)` ports
that read field-for-field, and is byte-shape-identical to the two
live siblings (`js/do.js:1202`, `js/trap.js:604` — both
`!!(game.dungeons?.[lev?.dnum…]?.flags?.hellish)`; pager passes the
implied `&u.uz` inline, matching its local-clone shape). The dropped
`GEHENNOM` import leaves zero refs (grep: none in pager.js). The old
doc line ("Gehennom dnum") was itself the D-1849 `inside_shop`
anti-pattern — claiming a dnum shape C never had; the new doc cites
`dungeon.c:1941–1945` correctly. Branch-by-branch: single boolean
predicate, no RNG, no branches to walk. Confirmed.

Hallucinations / overclaim: none. D-log states the latent status
openly (no live caller, no suite movement) and marks the hidden
verify vacuous by name rather than claiming a PASS.

Density: 6-line Must-fix, alone in the commit — correct shape
(Must-fix stays one item, not glued).

Verification: D-log gates PASS (green 2/2 + strict ×2, cohort 7/7,
`skip full` — pager.js not shared). The hidden-verify bullet says
`no corpus session is blocked` with 0 blocks cited and explicitly
declines a `--base` re-run as vacuous. I checked the load-bearing
premise myself: `describe_looked` (`js/pager.js:1471`) never calls
`add_cmap_descr` (only cites it in a comment at :1484), and
`add_cmap_descr` (`:819` export) has no other JS caller — so the
latent/no-movement claim is true, not a rewritten-baseline dodge.
Diff grep: no FORCE/DIAG/seed/coordinate patterns.
`imports.mjs --rulecheck` → Rule #2 clean (run at HEAD, covers this
SHA). `sym.mjs`: `Inhell_pager` local clone `pager.js:804` (no
second clone written ✓); `In_hell` clones remain exactly the two
siblings — the fix unifies shape without adding a third divergent
clone. (Nit, not queueable: three `In_hell` clones instead of one
shared export; D-log already names the hoist as a future iter.)

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
