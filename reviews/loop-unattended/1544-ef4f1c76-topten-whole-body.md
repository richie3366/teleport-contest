# Review 1544 — ef4f1c76 — topten.c topten whole-body port (D-2585)

## Metadata

- SHA: `ef4f1c76`
- D-id: D-2585. Next index: 1544.
- Files:
  - `js/topten.js` (+83/−18: ordin import, `hup_ok` gates, uid/
    birthdate arms, `:line` cites across the body).
  - `scripts/topten-message.test.mjs` (new, 138 lines: 3 unit tests).
  - Also re-stamps review 1536 (`**Addressed:**` hash — docs only).
- C locus: `nethack-c/upstream/src/topten.c:627–926` (`topten`), via
  `node scripts/csym.mjs topten` plus direct reads of `:636–660`
  (uid/HUP define), `:690–760` (birthdate/wizard arm/open blank),
  `:785–800` (didn't-beat pair), `:830–840` (ordin arm).

## Intent vs deliverable

Subject promises three restored arms (ordin rank>10 message,
game-start birthdate, HANGUPHANDLING gates) with no caller/RNG/
display-order change. Diff delivers exactly that plus a pinning unit
test. Promise matches deliverable.

## Inventory

- Changed: `topten(how, when)` — export retained, signature unchanged.
- No new/changed JS function besides the import join; no deleted
  symbols — no `sym.mjs` delete/re-point output owed.
- Required `sym.mjs` output (the one joined symbol):
  - `ordin js/hacklib.js:421 sync` — LIVE export.
  - Note (pre-existing, not this SHA): `sym.mjs` also reports 1 local
    clone in `js/dothrow.js:850`. This commit correctly imports the
    export; the clone is untouched debt, not a new C-wrong.
- `--can` not re-run for this edge (existing static import extended —
  same ALREADY pattern as the last three import joins); `imports.mjs
  --rulecheck` clean this iteration (see review 1542).
- Callees joined: `ordin` (LIVE). `yyyymmdd`, `getuid`, `hup_ok` are
  file-local/pre-existing.
- No RNG in the C arms touched and none added.

## C ↔ JS fidelity

Each restored arm checked against the C read:

- HUP gates: `HANGUPHANDLING` is `#define`d unconditionally
  (`global.h:278`), so `HUP` is live — the D-log's claim holds.
  - `:725–736` wizard||discover arm: C wraps message + blank in
    `HUP {…}` inside `how != PANICKED` → JS `if (how !== PANICKED &&
    hup_ok)`. Match.
  - `:754` post-open blank: `HUP topten_print("")` → `if (hup_ok)
    emit('', false)`. Match.
  - `:791–799` didn't-beat pair: read here — both `topten_print`s sit
    inside one `HUP {…}` → JS gates both emits in one `if (hup_ok)`.
    Match.
- uid: C `:639` `int uid = getuid()` (file-local, returns 0) → JS
  `t0.uid = getuid()` with the file-local `js/topten.js:630` stub,
  now C-cited. Match.
- birthdate: C `:695` `yyyymmdd(ubirthday)` → JS
  `yyyymmdd(game.ubirthday ?? 0)`; producer confirmed at
  `js/u_init.js:1839` (`g.ubirthday = getnow()`, contest patch 001
  cited). Old `yyyymmdd(0)` was a real C-wrong, fixed here. Match.
- ordin: C `:836–837` `rank0, ordin(rank0)` → JS
  `` `${rank0}${ordin(rank0)}` ``. Match; the trailing `:839` blank
  stays ungated in JS (`emit('', false)` outside the if/else) as in C.
- The rest of the diff is `:line` cites + comment-only re-framing of
  pre-existing VFS/file-local mechanics — no behavior change, verified
  by reading both hunk halves.

## Hallucinations / overclaim

None. The D-log's named-omits list (LOGFILE/XLOGFILE, lock/fopen arms,
toptenwin, UPDATE_RECORD_IN_PLACE fpos, GC, TOS colors, two
pre-existing file-local clones) each carries a C cite and a structural
reason. The "one exact VFS write of the same bytes" claim for the
in-place collapse is architecture rationale, stated as such.

## Density

83 `js/` insertions for one 300-line C function's three missing arms
plus full-body cites — one function family, right size (§2b).

## Verification

- D-log claims `verify.mjs --fn topten` → VERIFY: PASS (coverage row,
  0 blocked at baseline — honestly stated).
- Re-ran here (required):
  - `hidden-proxy verify topten --base ef4f1c76~1 --reach-all`
  - → 0 blocked both sides (vacuous note, expected — draws no RNG)
  - → smoke 24/24 REACH-OK.
- `node --test scripts/topten-message.test.mjs` → 3 pass, 0 fail.
- Claim confirmed, not vacuous-by-rewrite.
- Diff grep: no FORCE/DIAG/`getRngLog`/seed/coordinate/`fastforward`.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
