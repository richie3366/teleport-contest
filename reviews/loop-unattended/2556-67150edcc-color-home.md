# Review 2556 — 67150edcc — color option home (D-3681)

- SHA: `67150edccad17f6cf161d614b76f655ef8c012d2`
- Subject: `color` option home: paint gates read phantom `iflags.use_color`, toggles wrote `wc_color`; reset_glyphmap mono gate missing (Ranger-94031 74→PASS, Archeologist-94051 44→PASS) (D-3681)
- D-entry: D-3681. Type: next-live-head (owner-null class, 2 riders).
- Diff size: `js/display.js` 11 sites, `js/getpos.js` 1, `js/pager.js` 1, `js/options.js` 5; + test; ledger D-tags.

## Intent vs deliverable

Promise: (1) re-home the 14 paint gates from never-written
`iflags.use_color` to `wc_color`, polarity preserved
(unset≡on); (2) delete the three `flags.color` phantom
conjuncts; (3) point config parse at `result.iflags.wc_color`;
(4) add the reset_glyphmap mono kill to `map_glyphinfo` in C
order. Ranger-94031 + Archeologist-94051 → FULL PASS.

Diff actually does: all four, nothing else in `js/`. No new
imports/edges. No DIAG/FORCE/seed/coordinate reads (grep 0).

## Inventory

| JS site | Change | C locus |
|---|---|---|
| 10 display.js gates (altar, hero ladder, zap, 6 darkroom/memory, reglyph) | `use_color` → `wc_color` | `flag.h:507`, `optlist.h:236–237` |
| `map_glyphinfo` (`js/display.js:4471`) | `wc_color===false → NO_COLOR` after the `:2612` copy, before the ladder | `display.c:3077–3083`, `:2593–2655` |
| magic_map/newsym darkroom conjuncts | `flags.color` phantom deleted | `display.c:245/:840/:855/:895/:1087/:1850` |
| `js/getpos.js:600`, `js/pager.js:1260` | same two fixes | same |
| `js/options.js:5310` config parse | `result.flags.color` → `result.iflags.wc_color` | `optlist.h:237` |
| `js/options.js:10826/:10993` redraw gates | `use_color` → `wc_color` | `options.c:5373` |
| addr-table row cites | comment-only | `optlist.h:237` |

No symbols deleted or re-pointed (`sym.mjs` check N/A).
Helpers: none added; `mark_opt_need_redraw/glyph_reset`
pre-existing.

## C ↔ JS fidelity

Every cited C line verified in pinned C:

- `optlist.h:236–237`: `NHOPTB(color, …, On, …, &iflags.wc_color,
  …)` — the addr is `wc_color`, initval `On` (unset≡on
  matches). `flag.h:507`: `#define use_color wc_color` — one
  field. C has no `flags.color` (grep over src+include: zero
  hits), so all three deleted conjuncts were phantoms and
  every darkroom condition in C is exactly
  `dark_room && use_color` (`:245/:840/:855/:895/:1087/:1850`).
- Kill: C `:3077–3083` ends
  `if ((!has_color(…) || …) || !iflags.use_color) color =
  NO_COLOR`. JS gates the base copy identically
  (`=== false → NO_COLOR`).
- C order (`csym`: `display.c:2593–2655`): `:2612` table copy,
  then the is_you ladder whose FIRST arm is
  `if (!iflags.use_color || Upolyd || glyph != hero_glyph) ;`
  with CLR_YELLOW/HI_DOMESTIC only in the else chain. JS
  places the kill after the copy and before the ladder, and
  keeps the ladder's own `wc_color === false` first disjunct
  — so the overrides apply exactly when C applies them.
- After-change: `options.c :5399` `case opt_color` sets
  `opt_need_redraw + opt_need_glyph_reset` (both TRUE);
  JS `if (name === 'color')` calls both markers
  unconditionally. The two renamed redraw gates belong to the
  lit_corridor/dark_room arm (C `:5373`
  `if (iflags.use_color)`), where the rename preserves the
  gate. `muse.c:3277`'s `use_color` read sits inside `#if 0`
  as claimed; `windows.c :1399` `has_color` (wincap query, no
  JS counterpart) is genuinely named, not silently dropped.
- Polarity preserved at all 14 sites (`=== false` stays off,
  `!== false` stays on). No live `iflags.use_color` /
  `flags.color` code reads remain (only C-cite comments).

Combined-arm check: pure predicate re-homing + one ordered
kill; every callee pre-existing and live. No STUB.

## Hallucinations / overclaim

None. The "three homes, no gate" diagnosis is exactly what
the diff shows, and the D-log's "causality is by
construction" argument (every other read evaluates
identically unless color-off) is sound — the git scoreboard
diff below confirms only color-off sessions moved. Rule #2
clean (iteration `--rulecheck`).

## Density

Next-live-head pop per the D-3660 Next precedent (Must-fix
empty, head maxed recorder-artifact, coverage empty, batch
dry), top owner-null head by screens lost with a same-writer
rider. Both functions keep their own `Ledger:` entries
(D-3681 appended, `ported` stands). Right-sized.

## Verification

D-log claim: focused test 1/2 → 2/2; full rescore 923→925
(both riders FULL PASS), 0 regressed; `verify
optfn_boolean,map_glyphinfo` → vacuous-hidden (owner-null,
D-3672 precedent) + REACH-OK ×2 + full 44/44.

Audit re-measure: git scoreboard diff
`67150edcc~1 → 67150edcc` shows exactly 2 changed rows —
Ranger-94031 step 74 → PASS (6493/6493 RNG, 167/167 scr) and
Archeologist-94051 step 44 → PASS — with PASS 923→925 and
zero other rows touched (0 regressed, non-vacuous).
`verify optfn_boolean,map_glyphinfo --base 67150edcc~1
--reach-all` reproduces 0-blocked ×2 + REACH-OK ×2
(24/24 each). Claim reproduced exactly.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
