# Review 2889 — b93dbc4d9 — wall fg via stamped glyphmap customcolor (D-4048)

- SHA: `b93dbc4d9` (cliff, 1 C path: wall-fg color via glyphmap stamp)
- D-entry: D-4048; Ledger: wintty.c
- `js/` diff: `js/display.js` +30/−28 (restart of `wall_cmap_color`
  + idx threading at 2 callers + 1 import name); no test file

## Intent vs deliverable

Promise: owner-null probe s39 (MAC mines wall corners — JS brown
SGR fg vs C default fg, RNG lost 0) is the wall-fg writer: C's
branch colors reach the tty ONLY through the stamped glyphmap
customcolor, and MACgraphics stamps nothing, so C paints gray
while JS hardcoded branch colors. Diff restarts `wall_cmap_color`
as a glyphmap read (basic-bit → COLORVAL, else CLR_GRAY) threaded
with idx at both callers. No helpers or clones; 1 import name.
Promise = diff.

## Inventory

- `wall_cmap_color` (js/display.js:4277–4306): restarted —
  glyphmap-customcolor read.
- `cmap_idx_to_tty` wall arm (:1950) + `wall_glyph` (:4314):
  changed — pass idx (S_STONE early-returns preserved).
  C: `display.c:2677` wallcolors + `:2943–2965` reset_glyphmap,
  `wintty.c:3899–3909` tty_print_glyph + `:122` wincap2,
  `color.h:57/:59` NH_BASIC_COLOR/COLORVAL, `display.h:598`
  cmap_walls_to_glyph — all verified in pinned source.

## C ↔ JS fidelity

C verified at every cite: wallcolors[] all CLR_GRAY (:2677–2680 —
the brown/red/blue line is commented out, so branch colors can
only come from customization); reset_glyphmap wall arms
`wall_color(bank)` (:2947–2965); tty_print_glyph :3899–3909
(wincap2 EXTRACOLORS + customcolor≠0 + colorcount≥256 +
!calling_from_update_inventory → RGB bit-clear takes the
:3903–3906 extracolor arm, basic-bit set takes COLORVAL :3907);
NH_BASIC_COLOR 0x1000000 / COLORVAL (&0xffffff) (color.h:57/:59);
wincap2 EXTRACOLORS unconditional on unix tty (:122). JS mirrors
the decision exactly: absent cell ≡ BSS-zero ≡ unstamped
(glyphs.js:1177 inits `customcolor: 0`), basic bit → `cust &
0xffffff`, else CLR_GRAY. Glyph id from same-module
`cmap_walls_to_glyph`, whose bank order (mines→hell→knox→soko→
main) is line-identical to display.h:598 ✓. The stamp path it
depends on is LIVE, not assumed: `apply_customizations` ports
glyphs.c:531–574 incl. the CUSTOM_NHCOLOR → set_map_customcolor
arm, called from jsmain.js:206 and the options.js symset paths —
graphical symsets stamp brown/red/yellow/blue, MAC/ASCII stamp
nothing → gray. The RGB-extracolor divergence (C takes the
:3903–3906 arm, JS falls to gray) is the named D-4031-class
recorder gap: the recorder doesn't hook extracolor, so captured
C screens show the base — JS matches the capture. `sym.mjs
NH_BASIC_COLOR` → js/const.js:867 export const (value verified).
No RNG either side. No symbol deleted or re-pointed.

## Hallucinations / overclaim

None. The "branch colors ONLY through the stamp" claim rests on
the commented-out wallcolors line plus the TEMP-C cust
measurement (0x100000B, D-3896) — C text, not inference. The
D-log explicitly marks its own hidden verify vacuous ("NOT a
corpus PASS per the tool's own line") and presents movement via
the board diff instead — honest framing, corroborated below.

## Density

Cliff-phase: row-11 writer (wall-fg path, painter untouched —
correct writer-vs-painter call). Probe FULL PASS + 14 more PASS +
4 moved + 1 documented unchanged, 0 worse. Named (1)–(2) cover
the RGB arm and new owners. Not a no-op: restart + 15 PASS.
`Ledger` updated.

## Verification

- Re-measure (this review): `hidden-proxy.mjs verify
  tty_print_glyph --base b93dbc4d9~1 --no-reach` → 0 blocked
  (vacuous, as the D-log states — owner-null row). Movement
  corroborated first-hand on HEAD (= this SHA for display.js):
  probe 50150039 FULL PASS (704/704, RNG 69021/69021);
  Rogue-50555036 PASS (816 steps); Tourist-50255025 at
  gulpmu@599 (claimed 1→599 ✓); Knight-50455017 at step 630
  (claimed 604→630 ✓, seen in the D-4045 re-run). 0 worse is
  checked by the full rescore below.
- D-log Verify bullet: focused test FAIL→PASS (stash check with
  the exact probe symptom: color 3 vs 8 at screen(17,20)), full
  `verify.mjs --fn` (syntax, rule2, REACH smoke 24/24, green +
  strict ×2, cohort 7/7, auto full 44/44 on shared-file change) —
  shipped; final rescore below is the regression check.
- `imports.mjs --rulecheck` → clean (this iteration); no
  FORCE/DIAG/seed/coordinate gates in the diff.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
