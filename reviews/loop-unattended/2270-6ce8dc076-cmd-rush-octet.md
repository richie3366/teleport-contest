# Review 2270 — 6ce8dc076 — cmd rush octet + rnd_extcmd_idx

Metadata: SHA `6ce8dc0761dfc24b89c7cfb2e22ec1c736466c46`
(D-3313, 2026-10-02). `js/cmd.js` (+29/−3): seven module-local
rush leaves + seven FUNCT_TXT rows + one live export.
`scripts/rnd-extcmd-idx.test.mjs` (new). Cluster of 8, one C file.

Intent vs deliverable: subject promises the head
`do_rush_northwest` + 6 siblings + `rnd_extcmd_idx`, "whole remaining
cmd.c Open set". The diff adds exactly that: seven one-liner leaves
in C order, seven FUNCT_TXT identity rows, the `rnd_extcmd_idx`
export in C file order, and a widened family comment. No caller
rewires needed beyond the FUNCT_TXT rows (other two dispatch
channels pre-existed). Delivers what it promises.

Inventory (per function — cluster rule):

- `do_rush_northwest` — js/cmd.js:618 module-local one-liner;
  FUNCT_TXT row :2070.
- `do_rush_north` — js/cmd.js:619; FUNCT_TXT row :2071.
- `do_rush_northeast` — js/cmd.js:620; FUNCT_TXT row :2072.
- `do_rush_east` — js/cmd.js:621; FUNCT_TXT row :2073.
- `do_rush_southeast` — js/cmd.js:622; FUNCT_TXT row :2074.
- `do_rush_south` — js/cmd.js:623; FUNCT_TXT row :2075.
- `do_rush_southwest` — js/cmd.js:624; FUNCT_TXT row :2076.
- `rnd_extcmd_idx` — js/cmd.js:553 live sync export (C extern).
- Nothing deleted, nothing re-pointed; `sym.mjs` flags the rush
  leaves as "LOCAL CLONE" only in its non-exported sense — each is a
  single module-local definition in the do_move/do_run/do_rush_west
  idiom (D-3307 precedent), not drift. `rnd_extcmd_idx` resolves
  `js/cmd.js:553 sync`.

**C ↔ JS fidelity** (per function):

C bodies (`csym.mjs`, all eight in one call): cmd.c:1467–1472
(northwest), :1474–1479 (north), :1481–1486 (northeast),
:1488–1493 (east), :1495–1500 (southeast), :1502–1507 (south),
:1509–1514 (southwest) — each `set_move_cmd(DIR_*, 3); return
ECMD_TIME;` — and cmd.c:3600–3604
(`return rn2(extcmdlist_length + 1) - 1;`). No branches anywhere;
sole RNG is the one `rn2` in `rnd_extcmd_idx`.

- `do_rush_northwest`: DIR_NW + run 3 + ECMD_TIME — exact.
  Dispatch: C extcmdlist row :2028 + move_funcs row :2072;
  JS FUNCT_TXT row :2070 (new) + MOVE_FUNC_TXT MV_RUSH column
  :1892 (pre-existing) + generated EXTCMDLIST txt row
  (extcmdlist_data.js:153, pre-existing). Callee `set_move_cmd`
  is same-module live (js/cmd.js:587). Confirm.
- `do_rush_north`: DIR_N — exact; same three channels
  (:2071 / :1893 / data :154). Confirm.
- `do_rush_northeast`: DIR_NE — exact (:2072 / :1894 /
  data :155). Confirm.
- `do_rush_east`: DIR_E — exact (:2073 / :1895 / data :156).
  Confirm.
- `do_rush_southeast`: DIR_SE — exact (:2074 / :1896 /
  data :157). Confirm.
- `do_rush_south`: DIR_S — exact (:2075 / :1897 / data :158).
  Confirm.
- `do_rush_southwest`: DIR_SW — exact (:2076 / :1898 /
  data :159). Confirm.
- `rnd_extcmd_idx`: `rn2(EXTCMDLIST.length + 1) - 1` — exact
  formula; `rn2` imported from rng.js (cmd.js:10). Length
  equivalence re-checked by hand: C `extcmdlist_length =
  SIZE(extcmdlist) - 1` (cmd.c:2097); the table (cmd.c:1667–2066)
  holds 171 `{`-start entry lines including the :2066 sentinel,
  so length = 170; generated EXTCMDLIST runs "#" → "altunwield"
  (sentinel omitted), length 170. ≡ holds. C `--callers` shows
  0 refs (dead but extern — live export is the right call).
  The new test asserts exactly one `rn2(171)` draw and
  `idx == drawn - 1`; I ran it: 2 pass, 0 fail. Confirm.

Direction constants cross-checked against the C bodies (NW/N/NE/
E/SE/S/SW each land on the matching DIR_*); no transposition.
Rush leaves draw no RNG themselves; `set_move_cmd` run=3 arm is
pre-existing live code, untouched.

Hallucinations / overclaim: none. "Whole remaining cmd.c Open set"
is a ledger claim consistent with the 8 archived rows; the D-log's
per-function C cites (:1468–1472 etc.) match the `csym.mjs` ranges
modulo the 1-line signature offset. "No JS function-pointer column
— txt dispatch" accurately describes the pre-existing architecture
shared with do_run_*.

Density: 8 whole functions, one C file, callee closure
(set_move_cmd, rn2) already ported — within the §10.17 ceiling
(≤10 fns). ~30 insertions is below ~80 and defended on the whole-
remaining-set ground; each function has its own `Ledger:` entry
(8× ported) and its own Verify sub-bullet. Per-function verdicts:
all eight confirm. SHA verdict is the best of them, not the worst,
only because all agree.

Verification: D-log claims per-function hidden vacuous note +
REACH-OK smoke 24/24, cluster gates syntax/Rule #2/green/strict/
cohort + focused tests. Re-measured in one call:
`hidden-proxy.mjs verify <all eight> --base 6ce8dc076~1
--reach-all` → every function "0 session(s) blocked on it (0 at
baseline, 0 in the working scoreboard)" + the explicit vacuous
note + "fixed smoke spread (24 run): 24 PASS, 0 regressed →
REACH-OK" (northwest's three lines confirmed in a follow-up call
after the tail cut them). Queue rows cited 0 blocks, so vacuous is
legitimate. Diff grep: no FORCE/DIAG/getRngLog/seed/fastforward/
coordinates. Rule #2 covered by the iteration-wide clean scan.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
