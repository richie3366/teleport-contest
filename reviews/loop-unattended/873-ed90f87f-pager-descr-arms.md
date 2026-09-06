# Review 873 — ed90f87f — pager.c history/descr arms (D-1903)

Metadata: SHA `ed90f87f`, D-1903. Files: `js/pager.js` (+277/−24:
`look_region_nearby`, `append_str`, `add_cmap_descr`,
`add_quoted_engraving`, 7 `dispfile_*`, `dohistory`, 5 `hmenu_*`,
`dohelp` rewiring), `docs/c-js-map/turns.md` (+16). Next index 873.

Intent vs deliverable: subject promises the `?`-menu wrappers plus
the farlook description helpers, with `look_region` deduped onto the
new export. The diff delivers all of it and nothing else. Promise ≡
diff.

Inventory: 11 new exports, 9 file-local functions, 1 re-point
(`look_region` → delegating wrapper, same `{lo_x,lo_y,hi_x,hi_y}`
shape; 3 callers `:1608,1666,1714` untouched ✓). Callee closure:
`display_file` (pre-existing local clone), `doextversion`,
`dowhatis`, `dowhatdoes` (same-file ✓), dynamic `doextlist`
(pre-existing 'k'-item pattern, no new static edge),
`glyph_is_trap`/`glyph_to_trap` (`display.js:755,765` sync ✓),
`waterbody_name` (`hack.js:1402` ✓), `engr_at` (`engrave.js:126`
✓), `the`/`an` (`objnam.js` ✓), `strstri` (`hacklib.js:261` —
`--can`: edge ALREADY static, no new edge ✓). Nothing deleted.

**C ↔ JS fidelity**: `look_region_nearby` ≡ `pager.c:1965–1974`
(write order lo_y/lo_x/hi_y/hi_x, clamps `uy,0 / ux,1 /
ROWNO-1 / COLNO-1`) ✓; `append_str` ≡ `:79–104` (strstri dup-gate,
`BUFSZ-1` cap, `sep.slice` + truncated tail, 1/0; C's
`impossible()` on overfull buf dropped — can't-happen diagnostic,
accepted) ✓; `add_cmap_descr` is a REAL C staticfn (body at
`:1133–1245`; `csym` misses the name, verified via `sed`) and the
port is branch-exact: NO_GLYPH water arm, levl-typ +
`EHalluc_resistance=1` save/restore, pool→`pool` / molten-lava→
`lava` shortening, the 13-entry article-suppression list (first-
space ` indexOf` + case-insensitive ` ice` ≡ `strchr`+`strcmpi`),
first-match `a trap` arm, all three append guards, `found +=`
return ✓ (`mon_nam` scratch → string value is documented and
neutral); `add_quoted_engraving` ≡ `:1631–1667` (exact match
strings, eread/unread arms, `BUFSZ-len-1` strncat cap, TRUE) ✓;
`dohistory` ≡ `:2960–2965` ✓; `dispfile_help` ≡ `:2747–2751` ✓
(siblings same shape). `dohelp` rewiring is byte-neutral: every
const value matches the literal it replaces (`HELP="help"`,
`SHELP="hh"`, `HISTORY`, `opthelp`, `optmenu`, `usagehlp`,
`license`, `wizhelp` per `const.js:903–915`). Named deferrals
(`do_screen_description` wiring, `look_engrs` call sites,
`sysopt.hideusage`, `PORT_HELP`) are genuine omits with owners.

Hallucinations / overclaim: the D-log discloses `Inhell_pager`
as a local Gehennom-dnum check rather than claiming a C match —
but disclosure does not make it correct (see below). The vacuous-
verify note is honest.

Density: ~277 insertions, one pager family + map rows — right size
(>250 raises the ceiling only).

Verification: D-log gates PASS (green + strict ×2, cohort 7/7,
`skip full` — pager.js shared? claimed not-shared; `skip full`
taken). Re-measured myself: `hidden-proxy.mjs verify dohistory
--base ed90f87f~1` → `0 blocked (0 at baseline, 0 working)` —
vacuous exactly as stated. Diff grep: no FORCE/DIAG/seed/
coordinate patterns. Rule #2 clean at HEAD.

**Actionable C-wrongs**:

1. `Inhell_pager` drops the C predicate. C `dungeon.c:1941–1945`
   `In_hell` returns the dungeon's `hellish` flag; both JS
   siblings (`do.js:1202`, `trap.js:604`) read
   `game.dungeons[dnum].flags.hellish`. The new pager clone
   checks `dnum === GEHENNOM` instead — clone #3 (`sym.mjs`
   warns against exactly this) diverging from C and its
   siblings, i.e. the D-1849 `inside_shop` anti-pattern. Latent
   today (`add_cmap_descr` has no live caller until
   `describe_looked` is rewired) but it guards the
   vibrating-square arm. One-iter fix: read the hellish flag
   like the siblings (or hoist one shared helper).

Verdict: **QUALITY-RISK**

**Addressed:** D-1909 `7924e8a5`
