# Review 2557 — 53f820e2c — magic_map_background Rogue stone (D-3682)

- SHA: `53f820e2ce720ef9db334835cd3602ed25abcc1d`
- Subject: next-live-head `display.c` magic_map_background: Rogue-level DARKROOMSYM stored stone glyph with stale floor paint (Archeologist-92023 85→PASS) (D-3682)
- D-entry: D-3682. Type: next-live-head (owner-null, 1 session).
- Diff size: `js/display.js` +9/-1 (1 branch + doc); + test; ledger D-tag.

## Intent vs deliverable

Promise: in the DARKROOMSYM arm, render the stored glyph —
Rogue (`S_stone`) paints blank, non-Rogue (`S_darkroom`)
keeps floor paint because the arm implies the `:1850`
equate. Archeologist-92023 → FULL PASS.

Diff actually does: exactly that plus the doc comment. No new
imports (all module-local). No DIAG/FORCE/seed/coordinate
reads.

## Inventory

| JS site | Change | C locus |
|---|---|---|
| `magic_map_background` DARKROOMSYM arm (`js/display.js:5468`) | `dsym===S_STONE → tg blank`; darkroom keeps floor tg | `display.c:241–246`, `sym.h:96`, `:1850–1853` |

No symbols deleted or re-pointed (`sym.mjs` check N/A).
Helpers: `darkroom_sym()` (module-local, verified
`Is_rogue_level ? S_STONE : S_DARKROOM` = `sym.h:96`
verbatim), `cmap_to_glyph` (pre-existing).

## C ↔ JS fidelity

- `sym.h:96`: `DARKROOMSYM (Is_rogue_level(&u.uz) ? S_stone :
  S_darkroom)` ✓. `display.c:241–246`: `ROOM →
  (dark_room && use_color) ? DARKROOMSYM : GLYPH_NOTHING` ✓
  (re-verified in review 2556's read).
- Stone paints blank: `defsym.h:90`
  `PCHAR2(0, ' ', S_stone, "dark part of a room", "stone",
  NO_COLOR)` — the new `tg = {ch:' ', NO_COLOR}` is the
  stone showsym exactly, in the NOTHING-arm shape of the
  adjacent branch.
- Non-Rogue floor is C-correct *in this arm*: entry requires
  `darkRoom && useColor`, which is precisely the `:1850`
  equate condition
  (`if (flags.dark_room && iflags.use_color)
  showsyms[S_darkroom] = showsyms[S_room]`), so
  S_darkroom-as-floor is what C paints here. The `else` half
  (`:1852–1853`, no-color → blank) is genuinely named as
  omission (1) with a falsifier — it lives in
  `reglyph_darkroom`, untouched by this arm's precondition.
- tg/glyph consistency on all four paths (NOTHING/blank,
  stone/blank, darkroom/floor, CORR) as claimed; no RNG in
  the function (RNG 22348/22348 flat both sides).
- Callers (`csym --callers`: 5 sites + 1 doc comment):
  `detect.c:1105/:1400/:1403/:1657/:1664` — exactly the
  D-log's five, all pre-wired in JS (import `js/detect.js:59`,
  live calls `:619/:627/:970/…`), unchanged. Behavior-only
  change inside the shared callee, riding every mapping path.

## Hallucinations / overclaim

None. The geom-probe measurement (208 cells, all
C-blank/JS-floor, zero structural diffs) correctly
localized a paint-only divergence, and the fix cites the
exact C lines that decide each half. Rule #2 clean
(iteration `--rulecheck`).

## Density

Next-live-head pop per the D-3681 Next pointer (Must-fix
empty, head maxed recorder-artifact, coverage empty, batch
dry). Single function, own `Ledger:` entry (D-3682 appended,
`ported` stands). Right-sized.

## Verification

D-log claim: test 0/1 → 1/1; direct replay FULL PASS
(22348/22348 + 116/116); targeted rescore 925→926, 0
regressed; `verify` vacuous-hidden (owner-null) + REACH-OK +
full 44/44.

Audit re-measure: git scoreboard diff
`53f820e2c~1 → 53f820e2c` shows exactly 1 changed row —
Archeologist-92023 step 85 → PASS (22348/22348 RNG,
116/116 scr), PASS 925→926, zero other rows (0 regressed,
non-vacuous). `verify magic_map_background --base
53f820e2c~1 --reach-all` reproduces 0-blocked + REACH-OK
(24/24). Claim reproduced exactly.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
