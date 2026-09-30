# Review 2122 — 7fce929bc — optfn DEC/playmode/hilite/term/autocomplete cluster

- SHA: `7fce929bcd51abce8b2a37ed54a2510b95f32b6f` (D-3162)
- Date: 2026-09-30. `js/` delta: +308/−~15 options.js, +18 cmd.js;
  +25-test suite (25/25 + siblings 20+15+7+6=48, all re-ran).
- Cluster: 7 ports + 1 by-design + 6 walk retirements = 14 ledger rows
  — see Density.
- Prior-review closure claimed: none.

## Intent vs deliverable

Subject promises the seven-function cluster. Diff actually adds: the
seven ports, allopt + rc + doset + dump wirings, three import-names
on pre-existing edges, and the suite. Promise matches deliverable.

## Inventory (per function)

| JS function | Change | Class |
|---|---|---|
| `optfn_DECgraphics` (options.js, sync export) | new, BACKWARD_COMPAT arm | whole minus named file-IO remainder |
| `optfn_playmode` (options.js, sync export) | new, C order | whole |
| `optfn_hilite_status` (options.js, sync export) | new, C order | whole |
| `optfn_term_cols` / `optfn_term_rows` (options.js, sync exports) | new twins | whole |
| `optfn_o_autocomplete` (options.js, sync export) | new | whole |
| `count_autocompletions` (cmd.js:2521, sync export — C extern) | new | whole |
| `optfn_cursesgraphics` | no code, by-design | disposition (verified) |
| `is_ltgt_percentnumber`, `_q1.._q4_path` | ledger stale/split | dispositions (verified) |
| `choose_soundlib` | ledger by-design | disposition (verified) |

Callee closure, all LIVE: same-module `string_for_opt`,
`opt_atoi`, `allopt_name`, `set_optbuf`, `CURRENTLY_SET`,
`duplicateOpt` machinery; `clear_status_hilites`/`parse_status_hl1`
(botl.js, edge extended); `LARGEST_INT` 32767 = `global.h:135`
(const.js); both edges `imports.mjs --can` → ALREADY (verified).
No stubs. Nothing deleted/re-pointed.

Diff grep: no `FORCE`/`DIAG`/`getRngLog`/seed/step/coordinate reads,
`fastforward`, or hardcoded coordinates. Rule #2 clean (run this iteration).

## C ↔ JS fidelity (per function)

**`optfn_DECgraphics`** — C `options.c:1393–1439` (`csym`):
BACKWARD_COMPAT on (`optlist.h:15`) so the `#else` ERR arm is out ✓;
single-PRIMARYSET load, no rogue set, dupstr, read_sym_file failure
arm + `switch_symbols(TRUE)` named (Rule #2 / by-design — IBM
precedent) ✓; badflag → error + ERR ✓; gets write empty ✓; table-only
in C (0 refs, verified). Ledger marks it `ported` where twin IBM is
`partial` with the same remainder — a ledger-shape inconsistency
worth one line (remainder is named in doc + D-log either way;
terminal state correct; unqueued). Confirm.

**`optfn_playmode`** — C `:3470–3504`: `duplicate||negated` → ERR ✓
(generic dispatch sets `duplicateOpt` per `:621`, verified);
empty → ERR ✓ (`!op` ≡ sentinel here; explicit-empty `playmode:`
yields the same ERR code with the message sunk — void sink,
equivalent); mode families with prefix lengths 6/4/6/6/5/6 and the
length-gated `strcmpi("play")` ✓; get spells debug/explore/normal ✓.
Store is `game.wizard`/`game.discover` (C globals; `discover` new
dynamic field like `wizard`, no conflicts). The rc arm does not set
`duplicateOpt` — checked against C `:513–520`: comma lists process
**right-to-left**, so C's first-processed (last token) wins; the rc
left-to-right last-wins store is identical, ERR-vs-silent differing
only in the void sink. No divergence. Confirm.

**`optfn_hilite_status`** — C `:1851–1894`: STATUS_HILITES on
(`config.h:616`) so `#else` arms out ✓; valued+negated → clear + OK,
empty → mandatory ERR, else parse→ERR passthrough ✓ (order exact);
gets write empty then GET_VAL-only count message ✓. Doset row now
via the live optfn, output-identical to the retired lambda. Confirm.

**`optfn_term_cols`/`optfn_term_rows`** — C `:4238–4277`/`:4279–4318`:
`string_for_opt(opts, negated)` ✓, atol sanity `<=0||>=LARGEST_INT`
→ error + ERR else store ✓ (`opt_atoi` prefix-parse matches `atol`
on every gate outcome incl. "abc"→0→ERR and huge→ERR), bare →
silent OK with retval ✓; gets digit/empty/`defopt` ✓. Twins exact. Confirm.

**`optfn_o_autocomplete`** — C `:8345–8365`: do_set `;` ✓, gets
share `n_currently_set` with `!opts` → ERR ✓, do_handler stays
inlined at the doset dispatch (`:10113`, async precedent) ✓. Doset
row now live (was hardcoded). Confirm.

**`count_autocompletions`** — C `cmd.c:3311–3322`: null-terminated
scan for AUTOCOMP_ADJ; JS loops the generated list to the end (no
null row by construction — same set) ✓. Sole C caller `:8358`
wired. Confirm.

**Dispositions:** `optfn_cursesgraphics` fully under `#ifdef
CURSES_GRAPHICS` (`:1343–:1391`), commented out in `config.h:58`
(both trees) — by-design correct. `choose_soundlib` inside `#if 0`
(`sounds.c:1807–1859`) ✓. `is_ltgt_percentnumber` whole body +
caller at claimed sites ✓. All four `q?_path` locals exist and are
wired in `clear_path` ✓.

## Hallucinations / overclaim

None. "No corpus session blocked on any of the eight" matches my
re-run; every remainder is named per function.

## Density

- Whole-function verdicts: all seven whole (every arm verified;
  table-only C functions wired at allopt + rc + doset + dump).
- Cluster: one C file (+ its `cmd.c` callee) for the shipped code —
  but 7 ports + 1 by-design + 6 walk retirements = 14 ledger rows,
  over the 10-count. Per the review-1962 precedent (11-fn overage →
  review-debt, unqueued): the 6 walk rows are zero-code ledger
  updates, each verified correct above; the shipped code is 8
  same-file functions. Recorded here as review-debt, unqueued — no
  Must-fix exists for verified-correct rows. One `Ledger:` entry per
  function — present.

## Verification

Re-measured myself (`--base 7fce929bc~1 --reach-all`, all 8):

```text
verify <each of 8>: baseline 7fce929bc~1 — 0 session(s) blocked on it
smoke <each of 8>: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
```

Zero `REGRESSED`; D-log claims match. Suites 25/25 + 20/20 + 15/15 +
7/7 + 6/6 (all re-ran). No seed/step/coordinate read.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
