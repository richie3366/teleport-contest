# Review 1507 — 1da9555d — options.c get_option_value + allopt registry [campaign 2/7] (D-2548)

## Metadata

- SHA: `1da9555d`
- D-id: D-2548. Next index: 1507.
- Files: `js/options.js` (+512: SET_*/OPTN_*/REQ_* consts,
  217-row `allopt` table, `opt_set_in_config`, `PFX_COND_IDX`,
  exported `get_option_value`).
- C locus: `nethack-c/upstream/src/options.c:8480–8505`
  (`get_option_value`, 26 L; `csym.mjs` range `:8480–8505`,
  cited here as that range). Table source:
  `include/optlist.h` NHOPT_PARSE rows, materialized by
  `allopt_array_init` (`options.c:7405`, named omit).

## Intent vs deliverable

Subject promises: the whole `get_option_value` body in C order
plus the unix-tty 217-row `allopt` registry with per-row cites,
callers wired-or-named. Diff actually adds exactly that: consts,
table, exported function; no other `js/` file touched. Promise
matches deliverable. No RNG in C; none added. Coverage gap, not
a corpus divergence (0 blocked at baseline — honestly stated).

## Inventory

- New: `SET_HIDDEN/WIZONLY/WIZNOFUZ`, `OPTCOUNT = 217`,
  `allopt` (217 `name:` rows, verified by count),
  `opt_set_in_config`, `PFX_COND_IDX = 215`,
  `OPTN_SILENTERR/ERR/OK`, `REQ_DO_*/REQ_GET_*`,
  `EMPTY_OPTSTR`, exported `get_option_value(optname, cnfvalid)`.
- No deleted symbols; `DOSET_BOOL_ADDR` twin table pre-existed
  (5 hits at the parent) → no clone→import audit needed.

## C ↔ JS fidelity

`get_option_value` body, arm-by-arm against C `:8480–8505`:

- Loop `:8487` `for (i = 0; allopt[i].name != 0; i++)` → JS
  `for (i = 0; i < allopt.length && allopt[i].name; i++)`.
  Equivalent: the JS table holds exactly the 217 compiled rows
  with no sentinel, so length-termination ≡ the null-name
  terminator. The C sentinel omission is named in the D-log.
- Name match `:8488` `strcmp` → `===`. Exact for the ASCII
  option names in the table.
- BoolOpt arm `:8489–8492` (`bool_p = addr; != 0` →
  `Sprintf %s true/false`) → JS reads the `{obj,key}` game-bag
  ref and returns `'true'`/`'false'`. Shape match; null-addr
  rows fall through exactly like C's `bool_p == 0` rows.
- CompOpt arm `:8493–8501` (`optfn` null-check, `reslt =
  (*optfn)(idx, cnfvalid ? get_cnf_val : get_val, FALSE,
  retbuf, empty_optstr)`, `reslt == optn_ok && retbuf[0]` →
  return, else NULL) → JS mirrors the call shape with
  `REQ_GET_CNF_VAL : REQ_GET_VAL`, `OPTN_ERR` init,
  `OPTN_OK && retbuf.length > 0` → return, else null.
  Dormant: every `optfn` is null (named omits), so the arm can
  only fall through to null today.
- Tail `:8503` NULL → `return null`. Exact.

Enum values verified here against pinned C, not taken on
trust: `options.c:84` `optn_silenterr = -1, optn_err = 0,
optn_ok` (= 1) ≡ JS `OPTN_SILENTERR = -1, OPTN_ERR = 0,
OPTN_OK = 1`; `options.c:87` request enum `{ do_nothing,
do_init, do_set, do_handler, get_val, get_cnf_val }` = 0–5 ≡
JS `REQ_DO_NOTHING..REQ_GET_CNF_VAL` = 0–5. Both match.

Table spot-checks against `include/optlist.h`: row idx 215 is
`cond_` (the hidden prefix row → `PFX_COND_IDX = 215`
correct); `mention_map` bp `&a11y.glyph_updates`
(`optlist.h:427–428`) ≡ JS `{obj:'a11y',key:'glyph_updates'}`;
`safe_pet` bp `&flags.safe_dog` (`optlist.h:634`) ≡ JS
`{obj:'flags',key:'safe_dog'}`; `whatis_menu` → `getloc_usemenu`
has 10 live readers in `js/getpos.js` at this SHA. Every row
carries its own `optlist.h:` line cite; all 217 present.

Callers (`csym.mjs --callers`): `options.c:9712` (parent
`all_options_strbuf` CompOpt arm — already calls
`get_option_value(name, true)`, live but dormant since all
`opt_set_in_config` are false) and `nhlua.c:683`
(`nhl_get_config`, named Lua omit). Both wired-or-named; no
call from a site C never calls from.

Latent note (NOT a C-wrong, no queue row): the CompOpt arm
passes `retbuf` as an immutable JS string, so a future live
`optfn` could not fill it C-style. All optfns are null today;
the row that ports `optfn_*`/`pfxfn_*` owns the out-param
signature then. Flagging here so the follow-up doesn't copy
the string shape blindly.

The pre-existing `doset`-writes-twin-field skew (6 addrs read
the live gameplay field while `doset` toggles the
`DOSET_BOOL_ADDR` twin) is disclosed in the D-log as
pre-existing and out of scope — it predates this SHA and this
diff doesn't touch `doset`. Not this SHA's debt to queue.

## Hallucinations / overclaim

None material. The OPTCOUNT-217 claim rests on /tmp `cc -E`
probes (not committed, can't re-run cheaply here), but its
checkable consequences all hold: 217 rows, idx 215 = `cond_`,
per-row optlist.h cites, platform-variant rows
(WIN32/MICRO/CURSES/CHANGE_COLOR) absent. The D-log's probe
bullet (`/tmp/probe_gov.mjs` ALL PASS incl. "parent loop runs
all 217 then throws only the named `get_changed_key_binds`")
is consistent with the tree state at this SHA (key_binds still
a bare identifier until the next commit — the blessed campaign
pattern, queued as [4/7]).

## Density

One C function + its registry table, one file, ~500
insertions. Right-sized per §2b (a whole function family with
its data). The table is data, not logic padding.

## Verification

- D-log: `verify.mjs --fn get_option_value` → VERIFY: PASS
  (syntax 1 file; rule2; 0 blocked; smoke 24/24 REACH-OK;
  green 2/2 + strict ×2; cohort 7/7; full 44/44 on shared
  options.js).
- Re-run here: `hidden-proxy.mjs verify get_option_value
  --base 1da9555d~1 --reach-all` → 0 blocked at baseline and
  working tree (vacuous, honestly reported) + smoke 24 PASS,
  0 regressed → REACH-OK. Matches; no corpus session reaches
  this reader (live only via the [7/7] writer path).
- `imports.mjs --rulecheck`: clean (re-run this iteration).
- Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed gates or
  hardcoded coordinates in the added rows.

## Actionable C-wrongs

None. Body, enums, table bps, and callers all check out
against pinned C; omissions (optfn family, Lua caller,
config writers, `allopt_array_init`) are named in the map
with queued rows, not silent stubs.

Verdict: **ACCEPT**
