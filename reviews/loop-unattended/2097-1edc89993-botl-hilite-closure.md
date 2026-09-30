# Review 2097 — 1edc89993 — botl.c hilite small-function closure

- SHA: `1edc89993acecf0a1c52f5b7feed8fc929dbf4b1` (D-3137)
- Parent: `92b27a5b5`
- Files: `js/botl.js` (+73/−1), `js/options.js` (+2/−2); docs + ledger otherwise
- Cluster: 6 new ports + 4 verified-complete (all botl.c) + 2 stale dispositions (lock.c, ball.c)

## Intent vs deliverable

Subject promises: "clear/stat_idx/fldname/repad/count ports + 4 verified-complete".
Diff actually adds: 6 new `js/botl.js` exports (`stat_cap_indx`, `stat_hunger_indx`,
`bl_idx_to_fldname`, `repad_with_dashes`, `clear_status_hilites`, `count_status_hilites`),
one import name (`eos`), and two `js/options.js` doset-row wirings. No diff for the 4
verified-complete (ledger-only) or the 2 stale pops (ledger-only). Promise matches deliverable.

## Inventory

| JS function | kind | C locus (csym) |
|---|---|---|
| `stat_cap_indx` | new export | `botl.c:2128–2141` |
| `stat_hunger_indx` | new export | `botl.c:2144–2156` |
| `bl_idx_to_fldname` | new export | `botl.c:2159–2165` |
| `repad_with_dashes` | new export | `botl.c:2168–2178` |
| `clear_status_hilites` | new export | `botl.c:3350–3366` |
| `count_status_hilites` | new export | `botl.c:3476–3485` |
| 4 verified-complete | no diff | linestr_done/countfield, hilite2str, split_clridx |

No clones added; no deleted symbols. `eos` is a new name on the existing hacklib edge
(`export function eos`, returns NUL-or-length index — matches C pointer arithmetic as an index).

## C ↔ JS fidelity

**stat_cap_indx / stat_hunger_indx** — confirm. `STATUS_HILITES` is `#define`d (config.h:616),
so the `#else` arms (`near_capacity`, `u.uhs`) are compiled out and correctly absent.
JS reads `game.gb?.blstats?.[now_or_before_idx]?.[BL_CAP|BL_HUNGER]?.a?.a_int | 0` where
`now_or_before_idx` is the module-local `let = 0` (botl.js:2231, decl.c zero-init + :2559 toggle);
`?.` + `| 0` yields 0 unbuilt. No RNG.

**bl_idx_to_fldname** — confirm. Bounds `[0, MAXBLSTATS)` → `initblstats[idx].name`, else null.
C returns `.fldname`; `struct istat_s`'s first field is `fldname` (botl.h:283) and `INIT_BLSTAT(name, …)`
fills it positionally (botl.c:683–686), so C fldname values ("title", "carrying-capacity", …) are
exactly the JS `name` values — the `name` field is the pre-existing JS shape, not a renaming.
`idx \|= 0` matches the C int param. No C callers (extern.h:286 decl only) — exported unwired like C.

**repad_with_dashes** — confirm. `p = eos(s)`; `while (p >= 2 && ch[p-1] === ' ' && ch[p-2] === ' ')`
is exactly C `p >= inoutbuf+2 && p[-1]==' ' && p[-2]==' '` (`:2175`) with `ch[p-1]='-'`, `p-=2`
(`:2176–2177`). Return-new-string vs C in-place mutation is documented; sole C caller is
wintty.c:5137 (tty HP bar, unwired in JS), so the difference is currently unobservable. No C-wrong.

**clear_status_hilites** — confirm. `for i < MAXBLSTATS`, both buffers' `thresholds` + `hilite_rule`
nulled — matches C `:3356–3365` (free chain of buffer 0, then zero both buffers; GC ≡ free).
Sole C caller options.c:1867 verified via `--callers`; JS `hilite_status` optfn is null
(options.js:9812), so the named-omission wiring claim holds.

**count_status_hilites** — confirm. gather → count(BL_FLUSH) → done → return (`:3481–3483`),
all three callees live in-file. Both C callers wired and text-exact: options.c:1887
`count ? "(see \"status highlight rules\" below)" : "(none)"` → options.js:9100;
options.c:8461 `Sprintf(opts, n_currently_set, …)` with `n_currently_set == "(%d currently set)"`
(options.c:340) → `currently_set_val(…)` → `` `(${n} currently set)` `` (options.js:7605).

**4 verified-complete (no diff):** D-log names per-caller wiring with JS line cites and puts
`status_hilite2str` at ledger `partial` (5 corrupt-rule-only `impossible()` arms dropped, named).
**2 stale pops:** `lock_action` body present at js/lock.js:355 with the merged LOCK_PICK/CREDIT_CARD
arm as claimed; `Unplacebc…` sits under `#else /* BREADCRUMBS */` (ball.c:256) with
`/* #define BREADCRUMBS */` commented out (config.h:644) and no `-D` in the unix makefiles —
by-design correct.

Grep: no FORCE/DIAG/getRngLog/seed-gates/fastforward/coords in the diff. Rule #2: clean (see 2096).

## Hallucinations / overclaim

None. D-log labels all ten hidden checks "vacuous … NOT corpus PASSes". The `/tmp/botl-smoke.mjs`
probe claims (fldname 0/9/−1/99 → title/carrying-capacity/null/null) match the verified table values.

## Density

Breadth-phase cluster: 10 botl.c functions (6 new + 4 verified-complete) — exactly the §2b ceiling,
one C file, 79 js insertions. The 2 stale pops are the sanctioned ≤3-call detour, not padding.
Each function has its own Ledger entry and Verify line. Per-function verdicts: all ACCEPT
(hilite2str ACCEPT as a named partial disposition).

## Verification

Re-measured: `hidden-proxy.mjs verify <all 10 fns> --base 1edc89993~1 --reach-all` → all ten
`0 session(s) blocked` (vacuous, correctly labelled) + `smoke … 24 PASS, 0 regressed → REACH-OK`.
No REGRESSED, no WORSE. Matches the D-log Verify bullet.

## Actionable C-wrongs

None.

## Verdict

Verdict: **ACCEPT**
