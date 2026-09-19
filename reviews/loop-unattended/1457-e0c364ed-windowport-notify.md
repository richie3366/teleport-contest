# Review 1457 — e0c364ed — `botl.c` evaluate_and_notify_windowport whole-body port (D-2498)

Metadata: SHA `e0c364ed`, new `js/botl.js` (489 L), `js/const.js` +8,
new `scripts/botl-notify.test.mjs` (222 L, 9 tests). C `botl.c:1620–1680`
(`evaluate_and_notify_windowport`, staticfn) + `:1492–1618`
(`eval_notify_windowport_field`) + helpers. D-log: D-2498.

## Intent vs deliverable

Promise: new `js/botl.js` in C order — `initblstats[]`, `init_blstats`,
dual buffers, compare/stringify/percentage helpers, the field loop with
option gates, botlx tail, flag clearing — with the windowport dispatch
named. Diff delivers that. Promise = deliverable.

## Inventory

- New: `sgn`, `unionNonzero`, `zeroAnything`, `initblstats[]`,
  `init_blstats`, `compare_blstats`, `anything_to_s`, `percentage`,
  `exp_percentage`, `eval_notify_windowport_field`,
  `evaluate_and_notify_windowport`; local `hilite_reset_needed`,
  `get_hilite`, `status_update` (throw-loud named omits).
- Changed: `const.js` BL_WEAPON/BL_ARMOR/BL_TERRAIN/BL_VERS.
- `sym.mjs` (required): new module — nothing deleted or re-pointed.
  `status_update`/`get_hilite` are module-locals (correct shape for C
  `staticfn`/windowport-pointer targets).

## C ↔ JS fidelity

Field loop ≡ `:1630–1650`: all nine option gates (showscore/showexp/
time/Upolyd-HD/XP-or-EXP-while-poly/showvers/terrainstatus/weaponstatus/
armorstatus) in C order ✓; `eval_notify_windowport_field` → `updated++`
✓. Tail ≡ `:1671–1679`: `wincap2 = 0` (no windowport registry in JS —
reads as a status-incapable port, both arms skip exactly as in C) ✓;
`botl = botlx = time_botl = FALSE`, `update_all = FALSE` ✓ (JS
flags-first with disp fallback per the display.js `bot()` convention).
BL enum: C `botl.h:57–59` BL_CONDITION 22 → WEAPON/ARMOR/TERRAIN 23–25 →
VERS 26; JS `BL_WEAPON = BL_CONDITION+1` chain ✓.
Field function `:1492–1618`: dual-buffer compare, percent arm with the
HP-bar second disjunct (`:1540–1542`), rndencode/goldsym arm pinned off
(svc/gs state unported — reads undefined-safe), update_all/timeout arms,
`chg==2` color reset, `curr.val` fill, `hilite_rule` copy, both
`status_update` call shapes (`(unsigned long *) 0` vs `cond_hilites`)
✓. No RNG in either body.

Callee closure — the one hard look: `status_update` **throws**
(`named omit ... not yet ported`) and sits in live arms (`:1621–1627`
equivalents fire on any changed field). Three facts keep this out of
Must-fix: (1) **unreachable** — no `js/` file imports `botl.js`
(verified by grep; only the test imports it), so the throw cannot fire
in the shipped game; wiring the C caller (`bot():1277`, named in the
map line this commit adds to `c-js-map/startup.md`) without the dispatch
would crash, so leaving it unwired is load-bearing, not a miss;
(2) **fail-loud, test-pinned** — the test asserts quiet-path silence
(`evaluate_and_notify_windowport(valset, 0)` must not throw) AND the
notify-path throw (`assert.throws ... get_hilite/status_update unwired:
loud, never silent`); a silent no-op would be the real C-wrong here;
(3) **map-named** — `status_update` dispatch, `get_hilite`/
`hilite_reset_needed`, svc/gs gold-hack state, and the `bot():1277`
caller wiring are all in the `startup.md` line. Re-ran the test here:
9/9 pass.

## Hallucinations / overclaim

None. The D-log names the dispatch, the hilite stubs, and the caller
wiring rather than claiming a closed loop.

## Density

One C function family + staticfn + helpers, one new module + const
lines + test. Right-sized breadth work (~490 JS lines for ~190 C lines
with verbatim tables).

## Verification

Re-ran here (`--base e0c364ed~1 --reach-all`):

```text
verify evaluate_and_notify_windowport: baseline e0c364ed~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke evaluate_and_notify_windowport: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
```

0 blocked both sides (vacuous, as stated). Diff grep: no FORCE/DIAG/
`getRngLog`/seed/fastforward/coords. Rule #2 covered by the iteration
`--rulecheck` pattern (new module imports only gstate/terminal/exper).

## Actionable C-wrongs

None queueable: the remaining windowport dispatch + `bot()` wiring are
named omits in the map (startup.md), not Keep'd C-wrongs. Debt recorded
here: `status_update`/`get_hilite`/`wincap2` + `bot():1277` wiring.

Verdict: **ACCEPT-WITH-DEBT**
