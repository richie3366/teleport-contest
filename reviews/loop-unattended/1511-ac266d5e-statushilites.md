# Review 1511 — ac266d5e — botl.c all_options_statushilites [campaign 6/7] (D-2552)

## Metadata

- SHA: `ac266d5e`
- D-id: D-2552. Next index: 1511.
- Files: `js/botl.js` (+302: `condition_aliases`,
  `split_clridx`, `conditionbitmask2str`, `hlattr2attrname`,
  linestr store + `add/done/countfield/gather_conditions/
  gather/2str`, import extensions), `js/hacklib.js` (+18:
  exported `stripchars`), `js/options.js` (+33: exported
  `all_options_statushilites` + import extension),
  `scripts/all-options-statushilites.test.mjs` (+94, new).
- C loci (`csym.mjs` ranges): `botl.c:4476–4495` (writer,
  20 L), `:2575–2582` (`split_clridx`), `:3140–3168`
  (`conditionbitmask2str`), `:3368–3401`
  (`hlattr2attrname`), `:3403–3459` (store + add/done),
  `:3462–3474` (`countfield`), `:3487–3567`
  (`gather_conditions`), `:3569–3586` (`gather`),
  `:3589–3669` (`status_hilite2str`); `hacklib.c:499–517`
  (`stripchars`).

## Intent vs deliverable

Subject promises: the hilite store + gather/done chain in C
order with the strbuf caller wired and the doset counter +
[7/7] caller named. Diff delivers exactly that plus a
committed test. Promise matches deliverable. No RNG in C;
none added. This SHA retires the campaign's last bare
identifier in `all_options_strbuf` (key_binds went live in
D-2550) — the writer is now fully resolvable.

## Inventory

- New exports: `status_hilite_linestr_done/gather`
  (C staticfns, exported like `opt_next_cond` for the extern
  writer), `stripchars` (`js/hacklib.js`), `all_options_
  statushilites` (`js/options.js`). Rest file-local mirrors
  of staticfns. `sym.mjs`: `clr2colorname` LIVE
  (`js/artifact.js:733`, sync) — no clone; `imports.mjs
  --can`: botl.js→artifact.js edge already static, no new
  edge. Const imports extend the same-module const.js edge.
- No deleted or re-pointed symbols → no clone→import audit.

## C ↔ JS fidelity

Writer vs C `:4476–4495`: done → gather (head folded into
gather's return, `opt_next_cond` precedent) → walk with the
`BUFSZ - sizeof "OPTIONS=hilite_status:  " - 1` slice →
done. Exact; the 230-char slice arithmetic is byte-exact in
the comment.

Helpers, each checked against its C range:

- `split_clridx`: low-byte color / high-byte attr, out-pair
  folded to return. Exact.
- `condition_aliases` (6 rows) + `conditionbitmask2str`:
  alias search from index 1, union-name concat with `+`,
  whole-union alias override, empty→`''`, fresh string ≡
  immediately-copied static buf. Exact.
- `hlattr2attrname`: NULL on 0 (`HL_NONE = 0x01`, verified in
  `botl.h:252` and `js/const.js:806` — the `'normal'` arm is
  reachable, not dead), `bold+dim+…` order, BUFSZ fit gate
  (both call sites pass BUFSZ; the 38-char max output can
  never trip it — dead arm both sides, JS null is cleaner).
  Exact.
- Store (`:3413–3414` module-private, never in struct g —
  honored), `add` (pre-increment id, tail-append, BL_TITLE
  Strcpy vs `stripchars` space-strip), `done` (drop chain +
  zero id), `countfield` (BL_FLUSH counts all). Exact.
  `countfield`'s only reader (`count_status_hilites`,
  doset helper) is named with the doset row — live dead
  code, no throw, correct to ship.
- `gather_conditions` vs `:3487–3567`: condmaps zeroed,
  CLR_MAX first-hit color scan, six HL_ATTCLR_* slots,
  `atr != HL_NONE → &= ~HL_NONE`, same-union merge else
  first-free-slot, split + `:3549` re-gate, `strNsubst`
  space→dash, `&attr` suffix, `condition/mask/color`
  format, `add(BL_CONDITION, null, bm, …)`. Arm-for-arm
  exact; `game.gc?.cond_hilites ?? []` missing-reads-0 is
  disclosed (unconfigured hilites).
- `gather` vs `:3569–3586`: done first, blstats threshold
  walk (`game.gb?.blstats?.[0]`, missing reads null),
  then conditions. Exact.
- `status_hilite2str` vs `:3589–3669`: op table, all seven
  behavior arms, `impossible()` arms as comments leaving
  `behavebuf` empty (C logs-and-continues with empty buf —
  same observable string; arms unreachable in valid state
  and the whole function is dormant while threshold chains
  stay null), `split_clridx`, `attr != HL_UNDEF` gate,
  `initblstats[].name` ≡ C `fldname` (spot-checked: "HD",
  "time", "hunger" match C `:719–722`). Exact.
- `stripchars` vs `hacklib.c:499–517`: BUFSZ-1 cap, strip
  set, return-the-result fold for immutable strings. Exact
  (ASCII strip set — code-point iteration is output-
  identical).
- Enum/const spot-checks: `BL_FLUSH = -1`, `BL_TITLE = 0`,
  `CLR_MAX = 16`, `BL_TH_NONE = 0`, `EQ/LT/TXT_VALUE`
  chain all present in `js/const.js` with C-shaped
  derivations.

Callers: C `options.c:9741` → live `:9741` call site now
resolves (comment flipped bare→live this commit). Named:
`count_status_hilites` (doset row), threshold producers
(parse_status_hl1/hl2 — chains stay null), `status_hilites_
viewall` + menu chain, caller `do_write_config_file`
[7/7]. No stub in any live arm; the store gathers empty
exactly like C with no thresholds configured.

## Hallucinations / overclaim

None. The "joins the edge / cycle-safe" claims check out
(`--can` confirms no new edge either direction for the two
named imports).

## Density

One 20-line writer + its 9-helper closure + test, three
files, ~350 insertions. Right-sized per §2b (a tight
caller/callee family); every helper is on the writer's live
path — no speculative ports.

## Verification

- D-log: `verify.mjs --fn all_options_statushilites` →
  VERIFY: PASS.
- Re-run here: `hidden-proxy.mjs verify
  all_options_statushilites --base ac266d5e~1 --reach-all`
  → 0 blocked both trees (vacuous, honestly reported) +
  smoke 24 PASS, 0 regressed → REACH-OK. Matches.
- `imports.mjs --rulecheck`: clean (re-run this iteration).
- Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed gates
  or hardcoded coordinates.

## Actionable C-wrongs

None. Writer, all nine helpers, the store, and the caller
wiring check out against pinned C; the remaining family
member ([7/7]) is named with its row.

Verdict: **ACCEPT**
