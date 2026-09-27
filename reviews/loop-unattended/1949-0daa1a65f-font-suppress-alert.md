# Review 1949 — 0daa1a65f — options.c font/suppress_alert trio (D-2989)

## Metadata

- Full / short hash: `0daa1a65fc1bc9931fa6d55a0c5f984ef59b712a` / `0daa1a65f`
- Parent: `080c16023` (D-2988, review 1948 ACCEPT).
- Author, date: debian (Co-authored-by Cursor), 2026-09-27 20:53:17 +0200
- D-id: **D-2989**
- Stats: `js/options.js` +293/−~30, `js/version.js` +60. `js/`
  insertions **~353** (>250 → ceiling 450). Band 80–350.
- Claims to close: coverage rows `pfxfn_font` + `feature_alert_opts` (0
  blocks) plus a `next_opt` ledger split and two stale rows
  (`whatdoes_cond` by-design, `blessorcurse` stale).

## Intent vs deliverable

Subject promises the font/suppress_alert trio: `pfxfn_font`,
`feature_alert_opts`, `next_opt` split. Body promises whole `pfxfn_font`
in C order, ten `optfn_font_*` wrappers wired to allopt idx 55–64,
`wc_set_font_name`, the two version.c callees, async
`feature_alert_opts`/`optfn_suppress_alert`, and an awaited
doset_compound arm.

Diff actually adds all of that (`next_opt` is a ledger split, no JS —
confirmed in the D-log + `docs/ledger/options.c.jsonl`). Promise
matches deliverable.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `pfxfn_font` | LIVE new | `js/options.js:7972`, sync, exported |
| `optfn_font_*` ×10 | LIVE new | thin wrappers, C order |
| `wc_set_font_name` | LIVE new | file-local, C staticfn |
| `feature_alert_opts` / `optfn_suppress_alert` | LIVE new | ASYNC, exported |
| `get_feature_notice_ver` / `get_current_feature_ver` | LIVE new | `js/version.js:111/:143`, sync |
| `feature_notice_ver` / `notice_atoi` | local helpers | macro + atoi, no C symbol |
| `bad_negation` / `complain_about_duplicate` | STUB kept | file-idiom config-error sinks, map-named |
| `set_font_name` (MACOS9) | compiled out | not this build |
| `next_opt` | SPLIT | body in `next_opt_lines` (D-0091), verified below |

`node scripts/sym.mjs` (new exports):

```
pfxfn_font       js/options.js:7972   sync
feature_alert_opts js/options.js:8119   ASYNC — await required
optfn_suppress_alert js/options.js:8159   ASYNC — await required
get_feature_notice_ver js/version.js:111   sync
```

No symbol deleted or re-pointed. `--can options.js version.js` and
`--can options.js display.js You_cant`: **ALREADY** both. Diff grep
`FORCE|DIAG|getRngLog|fastforward|gx ===|gy ===`: 0. Rule #2 clean.

## C ↔ JS fidelity

C loci: `pfxfn_font` `options.c:5038-5165` (128 lines),
`optfn_font_map` `:1615-1622` (+9 siblings `:1630–1702`),
`wc_set_font_name` `:9978-10010`, `feature_alert_opts` `:7557-7585`,
`optfn_suppress_alert` `:4134-4161`, `get_feature_notice_ver`
`version.c:430-461`, `get_current_feature_ver` `:463-467`.

- `pfxfn_font`: do_init/do_set/get_val/fallthrough all match, including
  the size-arm `!negated` gate that the plain-font arm lacks (`:5082`
  vs `:5108` — JS keeps the asymmetry), `return FALSE` → OPTN_ERR
  (`:5106`; `optn_err = 0`), get_val order (map/message/status/menu/text
  then sizes), `defopt[] = "default"` (`:126`). `duplicate` →
  `duplicateOpt` (file idiom `:8691`), `atoi` → `opt_atoi`, get_val →
  `set_optbuf` holder. All 10 C callers (`:1621–1702`) ported in C order.
- `wc_set_font_name`: NULL → return, 5-arm switch, free/dupstr →
  assignment. Match.
- `feature_alert_opts`: `fnv == 0` → 0; future → You_cant/config_error +
  0; store + pline + 1. The `FEATURE_NOTICE_VER_MAJ/MIN/PATCH` macros
  read `flags.suppress_alert` (`hack.h:1509–1513`); JS reads the
  just-assigned `game.flags.suppress_alert` with exact bit math. Match.
- `optfn_suppress_alert`: do_init/do_set (negation → OPTN_ERR, valueless
  → silent OK, `(void)` callee result) / get_val (`""` vs `"(none)"`
  vs packed; `none[] = "(none)"` `:124`). Match.
- `get_feature_notice_ver`: NULL → 0, strcpy, dot/digit/else walk with
  break at `j == 2`, `j != 2` → 0, `atoi` ×3 → pack. JS
  `notice_atoi` matches C atoi (blanks/sign/digits); `"1.2.3.4"` reads
  patch 3 like C. `VERSION_*` = 5.0.0 both sides (`patchlevel.h:10–15`).
  Adversarial tails (patch `atoi` overflow, 64-vs-32-bit pack) agree on
  outcome (rejected); not queueable.
- Async-at-sync-dispatch (first async optfn in the table; `optfn_symset`
  is sync): all three `.optfn(` sites (`:8856` init, `:9034`
  parseoptions, `:9101` get_option_value) observe the same outcome as
  the previous null — return discarded / Promise ≠ OPTN_OK so
  `opt_set_in_config` unset / null returned — while state writes
  (`suppress_alert = fnv`) run synchronously before any await. Verified
  by reading each site; in-game sets go through the awaited doset arm.
- Doset arm matches C `:8672–8680` "pass the buck" (getlin, ESC skip,
  `name:abuf`) with `:639–640` `opt_set_in_config` on OPTN_OK.
- `next_opt` split: sole code callers `:9488/:9490`, and
  `next_opt_lines` matches `next_opt` (`:9754-9785`) arm-for-arm (", "→".",
  COLNO−2 flush, empty-line terminator). Legitimate split.

No RNG in C; none in JS.

## Hallucinations / overclaim

None. "Sync dispatch sites observe the same outcome as the previous
null optfn" is exactly what the three sites do.

## Density

§2b: two whole C functions + pair + split + stale rows, ~353 JS lines.
Right size; the trio shares one C file and one subsystem.

## Verification

D-log: vacuous hidden note (rows cited 0) + REACH-OK + full 44/44, plus
probes (pack edges, font round-trip, suppress arms). Re-ran both:

```
verify pfxfn_font: baseline 0daa1a65f~1 ... 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke pfxfn_font: no RNG-tagged reach; fixed smoke spread (12 run, 3.7s): 12 PASS, 0 regressed → REACH-OK
verify feature_alert_opts: ... 0 session(s) blocked ... 
smoke feature_alert_opts: ... 12 PASS, 0 regressed → REACH-OK
```

Honest vacuous ×2 + REACH-OK, no REGRESSED. Claims hold.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
