# Review 2054 — 9fca9cdda — pfxfn_cond_ + condopt + parse_cond_option (D-3094)

Metadata: SHA `9fca9cdda`, D-3094, 3-function coverage cluster
(options.c head + botl.c callee + closure). js/botl.js (+69),
js/options.js (+62/−1).

## Intent vs deliverable

Promise: port C's `cond_<name>` config path — the cond_ allopt row
had `optfn: null`. Diff actually adds: `cond_idx` export, `condopt`
+ `parse_cond_option` exports in botl.js (+ match_optname import),
`pfxfn_cond_` export in options.js (+ botl import), cond_ row wired.
Promise kept.

## Inventory (per function)

- `pfxfn_cond_` (NEW js/options.js:9123): do_init → condopt(0,null,0);
  do_set → parse + full 0/3/1/2/default switch, OPTN_ERR on nonzero,
  FIXME kept, mark_opt_need_redraw; get arms → set_optbuf '';
  do_handler → OPTN_OK (cond_menu() named omission); trailing
  OPTN_OK. Callees: condopt/parse_cond_option LIVE (this commit),
  config_error_add LIVE no-op sink (house precedent), set_optbuf
  LIVE (5+ sibling precedents), mark_opt_need_redraw LIVE
  (go.opt_need_redraw ✓). No clones/stubs.
- `condopt` (NEW js/botl.js:1258): sanity, null-addr init arm
  (sortorder reset, cond_idx fill, choice:=enabled, sort), set arm
  (enabled/choice/test). Callee cond_cmp LIVE (pre-existing). The
  `&choice` pointer rides the entry object — consistent: the only
  two JS call sites pass null / condtests[i], matching C's two
  callers (botl.c:1366, options.c:5002) ✓.
- `parse_cond_option` (NEW js/botl.js:1318): shape gate → 2,
  leading-substring loop via live match_optname → condopt → 0,
  else 1. No deleted/re-pointed symbols (pure add).

## C ↔ JS fidelity (per function)

pfxfn_cond_ (C options.c:4993–5036): do_init ✓; do_set reslt +
switch arms verbatim incl. message formats (`'Ambiguous condition
option %s'`, `'Unknown condition option %s (%d)'` with reslt) ✓;
`opt_set_in_config[PFX_COND_IDX]` — PFX_COND_IDX=215 = the cond_
row idx ✓; nonzero → OPTN_ERR ✓; FIXME ✓; redraw ✓; get arms
`opts[0]='\0'` ≡ set_optbuf ✓ (sibling idiom); trailing return ✓.
do_handler skips `(void) cond_menu()` — named omission, verified
sound: set_hidden=7 ("never show it", global.h:588), doset endpass
caps at set_wiznofuz=6 (options.c:8820), so the row is never
listed/selected and the arm is C-unreachable; return value
OPTN_OK matches C either way. No RNG. Confirm.

condopt (C botl.c:1302–1329): sanity `(idx<0||idx>=COUNT) ||
(addr && addr!=&choice)` ≡ JS identity check ✓; init arm
sortorder/loop/sort ✓; set arm enabled/choice/test ✓. qsort →
stable `.sort(cond_cmp)`: no-tie claim PROVED — 30 condtests
useroptions, 30 unique, so (ranking,useroption) pairs are unique
and every qsort order equals the sorted order. The `game.gc`
guard mirrors C's always-present global (house pattern). No RNG.
Confirm.

parse_cond_option (C botl.c:1353–1371): `strlen<=sizeof prefix-1`
(=5) ≡ `length<=5` ✓ ('cond_' bare → 2 both sides); slice(5) ≡
opts+5 ✓; match loop with `(sl>=4)?4:sl, false` ≡ C ✓ (JS
match_optname valAllowed=false skips the val strip, same as C
FALSE); condopt+0 ✓; miss 1 ✓. C never returns 3 (body returns
0/1/2 only) so the pfxfn case-3 arm is defensive both sides ✓.
No RNG. Confirm.

Callers: cond_ row wired; all three generic dispatch sites reach
`allopt[i].optfn` (do_init :10072–10073, do_set :10249–10251,
get_val :10312–10318) ✓. doset/do_handler/display sites are
C-unreachable for set_hidden rows (above) ✓. New botl→options
edge: `--can` → ALREADY (edge pre-exists; no cycle question).

`sym.mjs` output (no deletions; new-export roll):

```text
pfxfn_cond_      js/options.js:9123   sync
condopt          js/botl.js:1258   sync
parse_cond_option js/botl.js:1318   sync
cond_idx         js/botl.js:1247   sync   export const
match_optname    js/options.js:9967   sync
```

## Hallucinations / overclaim

None. Every D-log C citation re-verified (ranges, flag values,
unreachability proof, uniqueness proof).

## Density

One C file + callee closure, 3 whole functions, 131 js insertions
✓. `Ledger:` partial + ported + ported ✓. Per-function: all
ACCEPT → SHA ACCEPT.

## Verification

- Re-measured `hidden-proxy verify
  pfxfn_cond_,condopt,parse_cond_option --base 9fca9cdda~1
  --reach-all`: all three `0 blocked (0/0)` + `smoke 24/24, 0
  regressed → REACH-OK`. Matches the D-log; honestly vacuous.
- Ban-grep: 0. Rule #2 clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
