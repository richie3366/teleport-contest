# Review 1465 — e27f24bf — `options.c` handler_menu_colors + menucoloring core (D-2506)

Metadata: SHA `e27f24bf`, `js/options.js` +398/−13 (ceiling 450 applies: >250 insertions). C `options.c:6406–6499` + `coloratt.c` helpers + `handle_add_list_remove :9207–9251`. D-log: D-2506.

## Intent vs deliverable

Promise: whole menu-colors subsystem in C order — tables, count/free/add, basic-swap, query_color/attr, test_regex, add/list/remove menu, done, handler. Diff delivers all of it, `options.js`-only, with a /tmp 18/18 probe. Largely delivered — but two ported arms contradict C (one with a false "like C" cite).

## Inventory

- New: `MENU_COLORNAMES` (16 rows), C-valued `MC_ATR_*`, `MENU_ATTRNAMES`, module `menuColorings`/`save*` slots, `attr2attrname`, `count_menucolors`, `free_one_menu_coloring`, `add_menu_coloring_parsed`, `basic_menu_colors`, `query_color`, `query_attr`, `test_regex_pattern`, `handle_add_list_remove`, `menucolors_done`, `handler_menu_colors`.
- No new module edges (`--can` ALREADY on the artifact edge; rest same-edge words). No symbols deleted/re-pointed. `select_menu_pick_*` helpers pre-exist in invent.js (not this diff).

## C ↔ JS fidelity

Confirmed faithful: tables ≡ `coloratt.c:14–30`/`40–48` ✓; `basic_menu_colors` skip set + LIFO prepend + plain-`%s` unix format ≡ `:543–566` ✓; `query_color` dflt/−1-on-cancel ✓; `query_attr` Choose-prefix gate, ATR_NONE-exclusion, ATR→HL switch, PICK_ONE dflt arms ≡ `coloratt.c:425–460` line-for-line ✓; add-arm short-circuit chain `:6437–6441`, ESC→done, truncation math, remove `-k` shift, done arm ✓.

Three C-wrongs, all in the submenu plumbing:

1. **Empty-menu `a_int` (C-wrong + false cite).** C `:9227–9231` increments `any.a_int++` *before* the list/remove skip, so with zero colorings the exit row carries `a_int=4` → `opt_idx=3` (done). JS increments *after* the skip (options.js:1569–1571) → exit returns **1** (list arm): with no colorings `x` shows an empty list and re-loops instead of exiting. The D-log's "exit-with-empty returns 1 like C" is false — C returns 3.
2. **Suffix bytes.** C builds `"PAT"\"=color[&attr]` (`Sprintf(buf,"\"\\\"=%s%s%s")` + `&buf[1]`); JS options.js:1638 emits `"PAT"\\=color[&attr]` (two literal backslashes per `od -c`, missing quote).
3. **PICK_ANY finish-empty.** C `pick_cnt==0 → goto again` (`:6495`); JS `[] → return optn_ok`. Disclosed in-code as a helper delta, still divergent.

## Hallucinations / overclaim

Finding 1's D-log sentence misstates C semantics ("like C" for behavior C never has). The rest of the D-log's C cites check out.

## Density

Whole subsystem, one module, 398 insertions — within the raised 450 ceiling, no padding.

## Verification

Re-ran `hidden-proxy.mjs verify handler_menu_colors --base e27f24bf~1 --reach-all`: 0 blocked both trees (row cited 0 blocks); smoke 24/24 PASS → REACH-OK, matching the D-log. Interactive submenu, zero corpus reach — the C-wrongs above are invisible to the fortress, which is why the audit (not REACH) catches them. Diff grep clean. Rule #2 clean globally.

## Actionable C-wrongs

1. Menu-colors submenu trio (one iter, `js/options.js` only): move `a_int++` before the list/remove skip so empty-menu exit returns 3 per C `:9227–9231`; fix the suffix to `\"` (single backslash + quote) per C `:6466–6477`; make PICK_ANY finish-empty re-loop per C `:6495` (or distinguish ESC from empty in the helper). Source: this review. **Addressed:** D-2512 `3322beff`.

## Evidence appendix

Finding 1, C text (`options.c:9227–9235`): `any.a_int++` executes
*before* `if (!numtotal && (i == 1 || i == 2)) continue;` — so with zero
colorings the rows are add(1) + exit(4); picking exit yields
`opt_idx = 4-1 = 3` (done), and cancel/empty-pick also yields 3 via the
`else opt_idx = 3` arm. JS options.js:1569–1571 `continue`s *before*
`a_int++`, giving add(1) + exit(2) → return 1 (list arm): with no colorings
`x` shows an empty PICK_NONE list and re-loops instead of exiting. Only ESC
(`res.kind !== 'pick'` → 3) still exits. User-visible, C-contradicted.

Finding 2, bytes: C `Sprintf(buf, "\"\\\"=%s%s%s\",…)` renders
`"\"=COLOR[&attr]` (one backslash); `Strcat(mcbuf, &buf[1])` appends from
the backslash. `od -c` on js/options.js:1638 shows the template literal
contains `\\` `\\` (two literal backslashes) and no quote: JS renders
`"PAT"\\=COLOR[&attr]`. One-char-class divergence, confirmed at the byte
level, not inferred from the diff view.

Finding 3, C text (`:6485–6496`): `pick_cnt = select_menu(PICK_ANY)`; the
remove loop runs only `if (pick_cnt > 0)`; `if (pick_cnt >= 0) goto
menucolors_again` — so finish-empty (0) re-loops and only ESC (−1) returns.
JS `if (!picks.length) return optn_ok` conflates both (the helper reports
ESC and empty identically as `[]`). Disclosed in-code, still divergent.

Verified faithful (cited so the Must-fix stays scoped): `basic_menu_colors`
skip set + LIFO prepend + plain-`%s` unix format ≡ `coloratt.c:543–566`;
`query_attr` Choose-gate, ATR_NONE-exclusion, ATR→HL switch, PICK_ONE dflt
arms ≡ `:425–460` line-for-line; add-arm short-circuit `:6437–6441`;
truncation math; remove `-k` shift; `MC_ATR_*` values 0/1/2/3/4/5/7 ≡
`wintype.h:128–134`. New artifact edge `--can` ALREADY.

Re-run output: `verify handler_menu_colors: baseline e27f24bf~1 — 0 blocked
(0 at baseline, 0 working)` + `smoke: 24/24 PASS → REACH-OK`. The fortress
cannot see this submenu (zero corpus reach, RNG 0) — the C-wrongs above are
exactly the class per-SHA audits exist to catch.

Verdict: **QUALITY-RISK**
