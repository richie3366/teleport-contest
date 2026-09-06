# Review 942 — 22f18ded — display.c map_glyphinfo glyphinfo render singleton (D-1972)

- SHA: `22f18ded` — "display.c map_glyphinfo glyphinfo render singleton (D-1972)."
- D-id: D-1972. JS: `js/display.js` (+112/−? single file). C locus: `nethack-c/upstream/src/display.c` `map_glyphinfo` `:2593–2655` (csym range; D-log cites `:2594–2656`, off-by-one citation nit, body correct).
- Verdict: **ACCEPT**

## Intent vs deliverable

Subject promises the `map_glyphinfo` render singleton closing the named
omit in D-1964's `row_refresh` force source (paints kept caller color;
C re-derives hero color + accessibility treatment per paint at
`show_glyph` `:2006`). Diff actually adds: `MG_FLAG_NORMAL`/
`MG_FLAG_NOOVERRIDE`/`MG_HERO` consts, exported `map_glyphinfo(x, y,
base, mgflags)`, exported `hero_glyph`, `show_glyph_cell` wiring at
mgflags-0, `_paint_gbuf_cell` doc update. Promise matches deliverable.

## Inventory

- New: `map_glyphinfo` (exported sync), 3 MG_* consts.
- Changed: `hero_glyph` (function → export, body untouched),
  `show_glyph_cell` (+8-line wiring), `_paint_gbuf_cell` doc comment.
- No symbols deleted or re-pointed (clone → import); `sym.mjs`:
  `map_glyphinfo` single definition, `hero_glyph` single, no duplicate
  clones.

## C ↔ JS fidelity

Walked against C `:2593–2655` branch by branch (no RNG on this path):

- `is_you = u_at && glyph_is_monster(glyph)` ✓ verbatim, C comment
  preserved.
- Base copy `:2612` (`glyphinfo->gm = *gmap`): structural adaptation —
  caller passes the resolved `{ch,color,dec,glyph}` record since JS has
  no glyphmap[]/showsyms[]/tileidx machinery. Deferred + named in code
  header, D-log, and map ✓. Only sound because the constructors produce
  the same tty values the table would carry; consistent with the
  deferred-`reset_glyphmap` premise already in the map.
- Skip `:2619` (`!use_color || Upolyd || glyph != hero_glyph`) ✓:
  `use_color === false` matches the repo's default-On convention
  (C default TRUE, so `!use_color` ⟺ `=== false` whenever set);
  `Upolyd(u)`; integer compare via `hero_glyph().glyph`. Read
  `hero_glyph` body (js/display.js:1848): pure reads, **no RNG burn** —
  safe to call on every paint ✓. Hallucination/gender variants named
  as deferred on that function, out of this SHA's scope ✓.
- RogueIBM `:2630–2634`: C arm is compiled out upstream
  (`HAS_ROGUE_IBM_GRAPHICS`); JS ports the body (`CLR_YELLOW`) behind a
  live-read gate (ROGUESET + H_IBM + nocolor==0) that stays shut because
  JS ROGUESET always sets nocolor=1. Condition text differs from C, but
  both sides are always-false → outcome-identical, and the D-log states
  the shut condition plainly. Transparent, not a wrong.
- showrace → `HI_DOMESTIC` `:2635–2636` ✓, `H_IBM`/`HI_DOMESTIC` on the
  ALREADY `./const.js` edge (`--can` re-checked this review: ALREADY) ✓.
- Accessibility hero-override `:2637–2644`: live reads
  (`sysopt.accessibility === 1`, `!(mg & NOOVERRIDE)`) with
  `heroOverride = null` (ov_* tables deferred, named) → gate shut,
  matching default-C empty tables ✓; `MG_HERO` stamp inside is_you but
  outside the gate ✓ exactly as C `:2645`.
- Pet-NOOVERRIDE `:2647–2652`: gate shape ✓; `MLET_CH[mons(
  glyph_to_mon(gid))?.mlet]` renders the same letter C indexes via
  `mlet + SYM_OFF_M` ✓ (`glyph_to_mon` local-live, `mons` already used
  in-module). The `|| '?'` fallback only fires where C would index
  showsyms with garbage — harmless guard, not a behavior change.
- Echo `:2653–2655` (`out.glyph = gid`, ch carried) ✓ structural.

Callee closure: `u_at`, `glyph_is_monster`, `glyph_is_pet`, `Upolyd`,
`glyph_to_mon`, `mons` all live; no STUBs, no clones introduced, no
dispatch-with-stubbed-callee. Wiring call passes `MG_FLAG_NORMAL`
(= 0), the exact C `:2006` shape ✓. Strip-first order (rogue strip
before the arms) is the documented reset_glyphmap-base model, carried
over from D-1964's force source — unchanged here.

## Hallucinations / overclaim

"Exact C arm order" verified above — holds. "MG_HERO is write-only in
C — no reader in src/win/include" is a verifiable claim I did not
re-grep (constants claim, low risk); the stamp itself matches C `:2645`.
No dispatch/callee mismatch. No "Match C" for stubbed callees.

## Density

Single C function (63 lines) + caller wiring + consts, one module.
Right-size per §2b.

## Verification

Honest vacuous note again (row cited 0 blocks, no corpus-PASS claimed);
green + strict + cohort + auto-full 44/44 (shared file). Re-measured:
`hidden-proxy.mjs verify map_glyphinfo --base 22f18ded~1` → "0
session(s) blocked (0 at baseline, 0 in working scoreboard)" — claim
true, no re-run owed. The /tmp 4/4 arm probe is throwaway-verification
of unreached arms (deleted after), appropriate for display code no
suite reaches. `imports.mjs --rulecheck` clean (re-run this review).
Added-line grep: no FORCE/DIAG/getRngLog/fastforward/seed tokens.

## Actionable C-wrongs

None. Citation nit (`:2594–2656` vs csym `:2593–2655`) is docs-only,
not queueable.

Verdict: **ACCEPT**
