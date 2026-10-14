# Review 2805 — 5b7ec6f87 — do_screen_description looked path reads live showsyms

- **SHA:** `5b7ec6f87` (Wed 2026-10-14) — cliffs-head owner (D-3956).
- **D-entry:** D-3956. **Ledger:** `do_screen_description` ported.
- **Diff size:** `js/pager.js` 153 lines (rewired banks + matches);
  `js/display.js` 2 words (export SYM_OFF_M/SYM_OFF_W); +1 test (7 its).
- **Method:** cliff (1 fn) — whole Method per arm + movement re-measure.

## Intent vs deliverable (promise vs diff)

The subject promises: the looked path compared `sym` against
Primary/DEC house tables, so rogue-level stairs (`%`) and
RogueWindows stairs (`p`) listed the wrong stair group — rewire every
looked compare to the live showsyms table, keep unlooked on Primary
per C, delete the superseded house tables (1 PASS + 1 moved; 4
map-cell sessions are separate writers).

The diff is exactly that, plus the committed test. Promise and diff
agree.

## Inventory

| # | JS change | C source | Status |
|---|-----------|----------|--------|
| 1 | `cmap_showsym_code` → `live_showsyms(idx)` (darkroom rewrite kept) | symbols.c showsyms slot; display.c:1850–1853 | exact |
| 2 | `glyph_showsym_code` all banks → live (M/O/cmap/trap/swallow/W/X) | display.c:2651, :2774–2786; pager.c:1359–1361 | exact |
| 3 | mon match looked-gated live vs Primary | pager.c:1332–1333 | verbatim |
| 4 | `@` arm + HERO override → live S_HUMAN slot | pager.c:1345–1348, :1573–1576 | verbatim |
| 5 | obj match looked-gated live vs Primary (boulder arm kept) | pager.c:1367–1372, :1359–1364 | verbatim |
| 6 | dark-room / unexplored → live X slots | pager.c:1419–1421, :1430–1431 | verbatim |
| 7 | PET tail letter → `mlet_showsym_code` | pager.c:1564–1571 (letter only) | toward C, see below |
| 8 | delete `DEC_CMAP_BYTE` + `showsym_x_code` | — (superseded house tables) | zero refs on HEAD |
| 9 | export `SYM_OFF_M`/`SYM_OFF_W` (values unchanged) | sym.h:111–119 | 1 word each |

No symbol re-pointed across modules (`live_showsyms` already
imported by pager.js? — no: newly added to the existing display.js
import block, so no new module edge).

## C ↔ JS fidelity

Re-read every cited C arm against the new JS:

- **Mon `:1332–1333`** `sym == (looked ? gs.showsyms[i+SYM_OFF_M]
  : def_monsyms[i].sym)` — JS `looked ?
  live_showsyms(i+SYM_OFF_M) : monsym({mlet})` ✓, and `monsym`
  reads the Primary `MLET_CH` (display.js:675) ✓. Loop index: C
  `i=1..MAXMCLASSES`; JS `i=1..DEF_MONSYM_MLET.length` with
  `[0]=null, [1]=S_ANT` (mondata.js) and last `S_MIMIC_DEF` =
  C `MONSYM(60, ...)` (defsym.h) — C-aligned ✓. `S_invisible`
  skip kept ✓.
- **`@` `:1345–1348`** and **HERO `:1573–1576`** (`sym =
  gs.showsyms[S_HUMAN+SYM_OFF_M]`) — JS resolves `human_mlet()`
  via `indexOf('S_HUMAN')` = 53 = C `MONSYM(53, '@', ...)`
  (defsym.h:356, verified); unlooked `0x40` ≡ Primary `@` ✓.
  `jumped` ≡ `goto check_monsters` (pre-existing shape) ✓.
- **Obj `:1367–1372`**, ROCK_CLASS contrapositive, **dark-room**,
  **unexplored** — all three compare shapes verbatim ✓.
- **PET `:1564–1571`**: C calls `map_glyphinfo NOOVERRIDE`; JS
  (pre-existing structure) substitutes the pet's class letter —
  this SHA only moves that letter Primary→live, i.e. toward C.
  The NOOVERRIDE-call gap predates this commit; not its debt.
- **Callee:** `live_showsyms` is LIVE (review 2800 ACCEPT); the
  warning-match arm keeps the house `gw.warnsyms` read, untouched
  as claimed (pager.js:1631).
- **Cite nit (mechanism true):** the X-slot comment cites
  `:2775 :2779 :3030` for invisible/unexplored/nothing, but
  `:2775` is the NOTHING arm and `:2779` UNEXPLORED
  (invisible is `:2785`) — line numbers scrambled, slots right.
  Same class as 2801's cite note; not queued.
- **Test:** 7 its derive `SYM_OFF_M/W` from the C formula
  independently and drive real `init_symbols`/`read_sym_file` —
  no trace shaping.

Diff grep: no banned patterns. Rule #2 clean iteration-wide
(review 2803). No `js/display.js`→`pager.js` edge added (existing
import block extended).

## Hallucinations / overclaim

None. "Warning arm untouched" and "is_swallow_sym untouched" both
verified (no hunk touches them). The "4 unchanged = map-cell
own-pops" claim matches the identical-topline shape in the re-run
below and the named Next entries.

## Density

Cliff discipline holds: one owner, whole-function rewiring (every
looked compare + the sym source), probe sessions move, Ledger
entry present, Next names all 4 own-pops with per-cell evidence.
Closes the D-2447 rogue/ov omissions for this function. No bundled
work.

## Verification

Ship-time truth from the committed scoreboards (parent → this SHA):
6 blocked → 49956018 PASS, 50059078 → getpos@460, 4 unchanged —
the D-log claim **exactly**. My HEAD-code re-measure (`verify
do_screen_description --base 5b7ec6f87~1 --reach-all`):

```
verify do_screen_description: 3 PASS, 0 moved past, 5 unchanged, 0 worse → PROGRESS
smoke do_screen_description: 24 PASS, 0 regressed → REACH-OK
```

Deviation from ship-time is strictly later-SHA improvement
(50059042 + 50059078 healed to PASS by D-3957/D-3959) plus 2 new
Grow-#8 sessions still blocked — 0 worse, no REGRESSED session.
The 5 unchanged all show identical `C«staircase down»
J«staircase down»` toplines, i.e. the named map-cell shape.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
