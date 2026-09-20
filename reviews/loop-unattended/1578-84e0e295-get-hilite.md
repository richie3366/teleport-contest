# Review 1578 — 84e0e295 — botl.c get_hilite whole-body port (D-2619)

**Metadata:** SHA `84e0e295`, `botl.c` `get_hilite` + `noneoftheabove`,
D-2619. JS: `js/botl.js` (+241/−~15: restart + caller rewire) and a 1-line
`export` in `js/pray.js:299`.

## Intent vs deliverable

Subject promises: the whole STATUS_HILITES rule engine — percentage /
absolute / updown / textmatch / always / critical-hp selection plus the
color out-param — replacing a throwing named-omit stub. Diff actually
adds: restarted `get_hilite` with per-arm `:line` cites, new file-local
`noneoftheabove`, the caller `eval_notify_windowport_field` rewired with
a `{ v }` color holder, `fuzzymatch` joined to the existing hacklib
import, `critically_low_hp` exported from pray.js and imported.
Promise matches deliverable; no scope creep.

## Inventory

- `noneoftheabove(hl_text)` (new file-local) — C `botl.c:2334–2344`.
- `get_hilite(idx, fldidx, vp, chg, pc, colorBox)` — restarted body
  (was a throwing stub).
- `critically_low_hp` — local → canonical import (re-point; `sym.mjs`
  pasted below).
- `fuzzymatch` — joined an already-existing import edge (no new edge).

## C ↔ JS fidelity

C locus `botl.c:2363–2570` (208 L, via `csym.mjs get_hilite`; callers
`:1597` live-wired here, `:2117` `exp_percent_changing` named omit).
Full C body read here. Arm-by-arm confirm:

- Out-of-range returns Null WITHOUT touching colorptr (`:2374–2375`):
  JS `if (fldidx < 0 || fldidx >= MAXBLSTATS) return null` before any
  colorBox write — exact.
- `has_hilite` macro (`:673`, `#undef :2572`) inlined as
  `gbstats?.[0]?.[fldidx]?.thresholds` — exact.
- Best-fit trackers (`:2380–2388`): `max/min_pc`, `max/min_ival` with
  `-LARGEST_INT` (live from const.js), `max/min_lval` with
  `-MAX_SAFE_INTEGER` (LONG_MAX approximation, cited in-code; status
  longs are ≪ 2^53, safe), five flags — exact.
- Precedence gates (`:2400/2405/2409`): crit_hp skips non-critical,
  updown/changed skips non-updown, perc_or_abs skips always — exact,
  in C order.
- PERCENTAGE EQ + LT/LE/GT/GE best-fit (`:2414–2443`) — exact,
  including the `exactmatch` short-circuit (`:2418–2419`).
- UPDOWN down/up/changed with up-beats-changed (`:2449–2457`) — exact.
- ABSOLUTE int/long twins (`:2466–2531`) — exact, kept in step.
- TEXTMATCH (`:2534–2547`): `gb.blstats[idx][fldidx].val`, BL_TITLE
  skip `strlen(plname)+5-1` = `length+4` (sizeof " the " is 5, sizeof ""
  is 1 — arithmetic verified, not just cited), `fuzzymatch(hl.textmatch,
  txtstr, '" -_', true)`, `Upolyd(game.u)` + `noneoftheabove` — exact.
  `Upolyd(player)` form matches file precedent (botl.js:730–731).
- ALWAYS (`:2551`), CRITICALHP with flag reset (`:2555–2558`),
  NONE/default no-ops (`:2561–2564`) — exact.
- Color write + return (`:2568–2569`): `if (colorBox)` guard is the
  only delta vs unconditional `*colorptr` — harmless, the one live
  caller always passes the holder.
- `noneoftheabove` ignore-sets `'" -_'` / `'"()'` / `'" -_()'` match
  `:2338–2341` — exact.

RNG: none in C, none in JS. `critically_low_hp` body verified against
`pray.c:115–156` (hplim, divisor ladder 5/6/7/8/9, `curhp <= 5 ||
curhp * divisor <= maxhp` tail) — C-exact, no clone #2.

Callee closure (`sym.mjs` output): `critically_low_hp js/pray.js:299
sync`; `fuzzymatch js/hacklib.js:254 sync`; `Upolyd js/const.js:3184
sync`. `imports.mjs --can`: "ALREADY: botl.js already statically
imports pray.js. No new edge needed." No stub, no silent omit;
"Named: none new" plus the map-resident `:2117` caller is accurate.

## Hallucinations / overclaim

None. The "Match C" claim covers the rule body, and the callee is
live — not the dispatch-ported/callee-stubbed shape. Named omits live
in the map section, not silent.

## Density

Breadth-phase whole-function row: ~215 JS lines for 208 C lines, one
C family, two files (one a 1-line export). Right-sized.

## Verification

- `node scripts/imports.mjs --rulecheck` → Rule #2 clean (whole `js/`).
- Diff grep: 0 `FORCE`/`DIAG`/`getRngLog`/`fastforward`/RNG/seed/
  coordinate reads in added lines.
- Re-measured: `hidden-proxy.mjs verify get_hilite --base 84e0e295~1
  --reach-all` → `0 session(s) blocked` at baseline and working tree
  (vacuous-note path, honestly labeled in the D-log) + `smoke 24/24
  PASS, 0 regressed → REACH-OK`. Both summary lines cited; green 2/2,
  strict 2/2, cohort 7/7 per D-log.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
