# Review 1952 — e74c75d1f — options.c handler_autounlock pair (D-2992)

## Metadata

- Full / short hash: `e74c75d1f2608bbf1d70c843d71a0caae5b3bffe` / `e74c75d1f`
- Parent: `1b2296131` (D-2991, review 1951 ACCEPT-WITH-DEBT).
- Author, date: debian (Co-authored-by Cursor), 2026-09-27 21:19:52 +0200
- D-id: **D-2992**
- Stats: `js/options.js` +~150/−15, new
  `scripts/optfn-autounlock.test.mjs`. `js/` insertions **~150**. Band
  80–350.
- Claims to close: coverage row `handler_autounlock` + callee (0 blocks).

## Intent vs deliverable

Subject promises the handler + optfn whole-pair port. Body promises
C-order `UNLOCKTYPES`/`optfn_autounlock`/`handler_autounlock` with
doset/allopt wiring and a 5/5 focused test.

Diff actually adds all of that: table, both functions, `doset` arm,
compound-row live get_val + handler, `simple_opt_get_val` delegation,
allopt idx 22 wiring, test file. Promise matches deliverable.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `optfn_autounlock` | LIVE new | `js/options.js:2489`, sync, exported |
| `handler_autounlock` | LIVE new | `js/options.js:2573`, ASYNC, exported |
| `UNLOCKTYPES` | LIVE new | file-local table, C `:207–212` |
| `fuzzymatch` / `trimspaces` | LIVE import | ALREADY edge, +2 names |
| `select_menu_pick_any` | LIVE same-file | file idiom, 2 prior call sites |
| do_handler in optfn | async-split | `doset_optfn_do_handler` arm (disclose precedent) |

`node scripts/sym.mjs`:

```
optfn_autounlock js/options.js:2489   sync
handler_autounlock js/options.js:2573   ASYNC — await required
```

One deletion: the hardcoded autounlock block in `simple_opt_get_val`
→ live `doset_compopt_get_val` delegation (C-faithful; the old block
returned `'apply-key'` for unknown-bits-only where C joins `""`).
Diff grep `FORCE|DIAG|getRngLog|fastforward`: 0. Rule #2 clean.

## C ↔ JS fidelity

C loci: `optfn_autounlock` `options.c:1065-1168` (104 lines),
`handler_autounlock` `:5623-5672` (50 lines),
table `:207–212`, bits `flag.h:74–77` (1/2/4/8 = `1<<i` order).

- do_init default, valueless do_set (`negated ? 0 : APPLY_KEY`),
  `+`/space sep detect, trim/split loop, `none` arm, `str_start_is` +
  `fuzzymatch(" -_")` match, first-char switch **without** lowc,
  both silenterr arms, get_val `none`/`" + "` join. All match,
  including switch-before-validate order (`default:` un-matches into
  the `:1129` error).
- get_val unset reads as the do_init default (`??` default): matches C
  post-init and the predecessor's display; do_init runs via the wired
  allopt row. The `flagsBag` 6th param follows the `optfn_symset`
  store precedent.
- Handler: oldflags/optname/tab-sep, `%-10.10s`/`%.40s` rows,
  `a_int = i+1`, first-char selector, `(1<<i)` preselect, `%.20s`
  header, n>0 rebuild / n==0 zero / cancel-keeps, chngd/verbose/
  `give_opt_msg` pline via live get_val. All match; `!== false`
  idioms match the file's default-true globals.
- Wiring: sole C caller `:1165` do_handler → `doset_optfn_do_handler`
  arm → doset `handler: true` row (`:8935–8939` shape); compound row
  and `simple_opt_get_val` delegate to live get_val; allopt idx 22
  enables rcfile parse + `#saveoptions`. End-to-end verified.

No RNG in the C pair; the menu helper is pre-existing shared code.

## Hallucinations / overclaim

None. "Named: None" holds — every arm ported, both callees live, the
sole caller wired.

## Density

§2b: tight caller/callee pair + wiring + test, ~150 JS lines for 154
C lines. Right size.

## Verification

D-log: both `--fn` verifies PASS (vacuous + REACH-OK + full 44/44) and
the focused test 5/5. Re-ran here:

```
verify handler_autounlock: baseline e74c75d1f~1 ... 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke handler_autounlock: ... 12 PASS, 0 regressed → REACH-OK
verify optfn_autounlock: ... 0 session(s) blocked ...
smoke optfn_autounlock: ... 12 PASS, 0 regressed → REACH-OK
node --test scripts/optfn-autounlock.test.mjs → pass 5, fail 0
```

Honest vacuous ×2 + REACH-OK, no REGRESSED; test reproduced 5/5.
Claims hold.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
