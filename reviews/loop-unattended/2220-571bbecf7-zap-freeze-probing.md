# Review 2220 — 571bbecf7 — zap_over_floor freeze + zap_map probing

Metadata: SHA `571bbecf7a74c6001679c5e653424764a1cdf00a` (D-3259, 2026-10-02).
`js/zap.js` only (+69/−~20) + `scripts/zap-over-floor.test.mjs` (2/2,
re-run green). Cluster: 1 function completed whole + 3 arms of a
same-file sibling — one C file. Method per function below.

Intent vs deliverable: subject promises "zap_over_floor underfoot
freeze arms + zap_map probing arms". The diff delivers the uinwater/
TT_LAVA underfoot arms, two Soundeffect lines, the dead `t=null`
mirror, and three probing fixes (glyph_at compare, SCORR unblock,
vibrating-square use_the). Delivers what it promises.

Inventory:

- `zap_over_floor` (`js/zap.js:1097`): `t=null` (:5192 mirror),
  Soundeffect ×2 (:5246/:5278), uinwater 4-call arm + TT_LAVA
  Passes_walls/INFLOOR arm (:5293–5308).
- `zap_map` (`js/zap.js:6456`): glyph_at int compare (:3730/:3732),
  SCORR unblock_point (:3753), use_the (:3786–3788).
- Six import extensions, all pre-existing edges (display/hack/trap/
  dungeon/seffects_data/const — verified in the hunks; unblock_point
  already imported at :296, so no 7th): `sym.mjs` — set_uinwater
  hack.js:3365 ASYNC (awaited); docrt display.js:5900 ASYNC
  (awaited); set_utrap trap.js:3017 sync; Invocation_lev
  dungeon.js:2372 sync (correctly the export, not hack.js:3379's
  local); reset_utrap ASYNC (awaited). No symbols deleted or
  re-pointed. No clones added.

**C ↔ JS fidelity — `zap_over_floor`**

- `t=null` mirrors C :5192 in the same gate; the later `if (t)` use
  (:1121) sits behind a ROOM gate unreachable from the non-POOL water
  arm — the "dead" note is accurate, and mirroring C is safe either
  way. Soundeffect :5246 ✓ (position before see_it, inside the
  IS_WATERWALL||(lavawall&&rn2) gate — RNG order untouched, macro is a
  no-op build); :5278–5280 ✓ (post-bury_objs, `!lava` gate).
- Underfoot :5293–5308, in order: `u.uinwater` (not Underwater —
  C's own comment kept) → set_uinwater(0) + uundetected=0 + docrt() +
  vision_full_recalc=1 ✓ all four; else-if utrap&&TT_LAVA →
  Passes_walls ? You('pass…')+reset_utrap(TRUE) : set_utrap(rn1(50,20),
  TT_INFLOOR)+You('are firmly stuck…') ✓; rn1(50,20) only in the else
  arm on both sides ✓. Passes_walls read: C `youprop.h:286` is
  H||E; JS ORs a third `uu.Passes_walls` that is never assigned
  anywhere in `js/` (verified by grep) — reduces to C-exact; dead
  disjunct, one line, not a C-wrong.

**C ↔ JS fidelity — `zap_map`** (probing, C :3720–3795)

- oldglyph=glyph_at → show_map_spot → lastseentyp||glyph_at compare
  :3730–3733 ✓ (replaces a disp-string compare — real fix: strings
  miss id-only changes). SCORR :3751–3756 ✓ typ=CORR + unblock_point
  (unconditional, no cansee gate — matches C; the SDOOR arm's
  recalc_block_point :3741 is correctly left alone — good
  discrimination). use_the :3786–3788 ✓ exact ternary incl. RNG
  (rn2(4) only when hallu).
- Banned-pattern grep on js/ hunks: clean. Rule #2 clean (2212 run).

Hallucinations / overclaim: none. "Whole C body live" for
zap_over_floor holds for the shipped arms; the retained "dotrap
polish" doc phrase is disclosed as having no C arm behind it. The
message is explicit that the new arms are cold paths pinned by the
focused test (0/2 pre-fix via stash) rather than by REACH — honest
evidence grading.

Density (§2b): 69 js ins (+82 test) — at the ~80 floor; one function
completed whole + 3 same-file arms + committed test. ACCEPT (at-floor,
complete, tested).

Verification: re-measured:
`verify zap_over_floor,zap_map --base 571bbecf7~1 --reach-all` →
both vacuous (message says "rows cited 0 blocks") + reach 12/12 and
smoke 24/24 REACH-OK, 0 regressed. Test re-run 2/2 at HEAD.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
