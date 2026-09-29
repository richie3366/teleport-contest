# Review 2031 — 7e25e3c42 — coloratt.c cluster (1 port + 2 complete + 1 partial)

Metadata: SHA `7e25e3c42`, D-3071, js/options.js (+21). Cluster:
`free_menu_coloring` (ported) + `query_attr`/`query_color` (claimed
complete, no code) + `add_menu_coloring_parsed` (partial, no code) +
`alternative_palette` by-design + `bones_include_name` stale.

## Intent vs deliverable

Promise: port free_menu_coloring; verify query_attr/query_color
complete; leave add_menu_coloring_parsed partial on the desc arm;
retire alternative_palette (compiled out) and bones_include_name
(stale). Diff adds the one export; the rest is ledger + D-log.
Kept, except finding (1) below.

## Inventory

- `free_menu_coloring` (NEW export js/options.js:4505, sync): whole
  C body. Sole C caller save.c:1084 `freedynamicdata` unported,
  named. Callees: live `regex_free` (:526), module `let`
  menuColorings/colorColorings (:4449/:4452). No clones/stubs.
- No other JS changes; no deleted symbols.

## C ↔ JS fidelity (per function)

`free_menu_coloring` — C coloratt.c:663–680 (csym range): do-loop,
tmp2 save, regex_free per node, unlink≡free ×2, chain swap,
`while(menu_colorings)` — JS matches line-for-line. Confirm.

`query_attr` (no code) — C :394–472 vs js/options.js:5226:
allow_many ≡ strncmpi-6 incl. short/exact prompt edges ✓;
MENU_ATTRNAMES ≡ pre-alias attrnames (7 rows, order verified) ✓;
PICK_ANY HL-mask + ATR_NONE-exclusion verbatim ✓; PICK_ONE: C
always resolves to the explicit pick (dflt-skip), helper returns
explicit — collapse SOUND ✓; ESC/empty → -1 ✓. Callers 4/4 at
D-log lines (:5273/:6127/:5565 + botl named). Confirm.

`query_color` (no code) — C :474–518 vs :5203: basic_menu_colors
bracket ✓, MENU_COLORNAMES ≡ pre-alias order ("no color" last —
verified both sides) ✓, PICK_ONE helper mapping mostly ✓, BUT:
C :505–508 with count==2 returns `picks[0]` unless it is NO_COLOR.
tty letter-press toggles + finishes (wintty.c:1755–1759, pure
toggle — no PICK_ONE deselect) and picks come back in menu order
(:2808–2817), so count==2 is {preselected X, explicit Y} in menu
order and C ≡ menu-earlier(X,Y). The D-log proves the NO_COLOR
redirect dead (true — "no color" sorts last) but concludes
"collapse stands", which does not follow: gate-dead ⟹
menu-earlier, not explicit. DIVERGENCE: dflt X≠NO_COLOR with
explicit letter pick Y sorting strictly after X → C returns X,
JS returns Y (helper returns the hit directly, :7623). E.g.
dflt black + letter for green: C keeps black, JS applies green.
(query_attr has no such flaw — its skip condition is dflt, so C
there always yields explicit.) Affects query_color_attr flows
only (options.c:6439 passes NO_COLOR → unaffected); menu-value,
no RNG. C-WRONG (1).

`add_menu_coloring_parsed` (no code) — C :584–613 vs :4524: NULL
gate, alloc+regex_init, prepend, use_menu_color — all present;
the :601–607 recompile-failure `config_error_add("Menucolor
regex error: …")` arm absent and CORRECTLY NAMED (no JS
regex_error_desc; precedents :5283/:5409). Ledger `partial` ✓.
Callers 3/3 at D-log lines. Confirm.

`alternative_palette` by-design — def :1048 inside `#ifdef
CHANGE_COLOR` (:1033–:1166, read); contest build leaves it
undefined (windconf.h:29, established 2029). Confirm.
`bones_include_name` stale — live export js/bones.js:482 ✓.

## Hallucinations / overclaim

(1) D-3071 "none — whole body" for query_color rests on "the :507
i==NO_COLOR gate is provably dead … collapse stands per
review-2007 pattern". The deadness proof is correct; the
conclusion is not (shown above), and review-2007 never examined
this gate (it reviewed query_color_attr, the caller) — the
citation is empty. A real, keystroke-reachable behavior delta
ships under a false proof. This is the finding.

## Density

1 port + 3 dispositions + 1 by-design + 1 stale, one C file —
§2b-shaped. Per-function: free_menu_coloring ACCEPT, query_attr
ACCEPT, query_color QUALITY-RISK, add_menu_coloring_parsed
ACCEPT (partial correctly named). SHA verdict = worst =
QUALITY-RISK. `Ledger:` rows present (jsonl in-stat).

## Verification

Re-measured `hidden-proxy verify
free_menu_coloring,query_attr,query_color,add_menu_coloring_parsed
--base 7e25e3c42~1 --reach-all`: all four 0-blocked (correctly
labelled vacuous) + smoke 24 PASS, 0 regressed → REACH-OK each.
No REGRESSED session (menu-value delta, no corpus reach).
Ban-grep clean; rulecheck clean (see 2024). Corpus claim honest;
the C-wrong is outside corpus reach, found by C audit. Confirm.

## Actionable C-wrongs

1. query_color PICK_ONE resolves explicit-pick-after-default to the
   explicit pick; C resolves to menu-earlier (the default). Fix in
   one port iter: after the helper returns explicit Y with
   dflt X≠NO_COLOR, return X when Y sorts strictly after X in
   MENU_COLORNAMES (index compare); headless test with dflt black
   + explicit green → black, + explicit-before → explicit; keep
   NO_COLOR-default path unchanged. Docs: correct the D-3071 proof
   note (gate-dead ⟹ menu-earlier). Narrow, interactive-only, no
   RNG — size it as a small Must-fix.

Verdict: **QUALITY-RISK**
