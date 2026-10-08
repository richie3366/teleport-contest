# Review 2559 — b3845d7d0 — dosh shellers gate (D-3685)

- SHA: `b3845d7d07bdb4c01d0d03940380346f72da661a`
- Subject: next-live-head `sys/unix/unixunix.c` dosh SYSCF shellers gate: '!' printed the !SHELL text, recorder prints the port-gate text (2x '!' pair →PASS) (D-3685)
- D-entry: D-3685. Type: next-live-head (owner-null, `!` pair).
- Diff size: `js/cmd.js` +24/-6 (new `dosh()` + rewired `dosh_core`); + test; ledger D-tag.

## Intent vs deliverable

Promise: carry the whole unix `dosh()` body in C order with
the literal three-disjunct shellers gate (rejecting with
C's `:352` text since scored ESM has no sysconf), replacing
the wrong `!SHELL` fallback text in `dosh_core`. `!` pair →
FULL PASS.

Diff actually does: exactly that. No new imports
(`Norep`/`check_user_string` in-file). `cmdnotavail` still
live at `:1499` (dosuspend_core) — no dead const. No
DIAG/FORCE/seed reads.

## Inventory

| JS site | Change | C locus |
|---|---|---|
| new `dosh()` (`js/cmd.js:1516`) | three-disjunct gate + `:352` Norep + `return 0`; subshell arm named | `sys/unix/unixunix.c:343–365` |
| `dosh_core` (`:1530`) | `await dosh()` between unchanged accounting lines, replacing the `:5693` fallback | `cmd.c:5681–5696` |

`sym.mjs dosh`: exactly one symbol (`js/cmd.js:1516`,
ASYNC) — no conflict, no clone. Caller `dosh_core` is the
sole JS caller; C's sole caller is `dosh_core` (`:5690`).

## C ↔ JS fidelity

- Gate is literal: C `:348–350`
  `if (!sysopt.shellers || !sysopt.shellers[0] ||
  !check_user_string(sysopt.shellers))` → identical JS over
  `game.sysopt?.shellers`. Text byte-exact
  (`unixunix.c:352`). `return 0` both arms (`:353`, `:364`).
- Build-arm analysis verified, not assumed: `SHELL` is
  defined (`unixconf.h`, unless NOSHELL) and `SYSCF` is
  defined (`config.h:232–233`) — and the recorded C bytes
  («Unavailable command '!'.») independently prove the
  recorder compiled the gate arm in while the old JS
  printed the `#else` (`:5693`) text that build never
  compiles. The diagnosis is airtight.
- `dosh_core` order: accounting → `dosh()` → re-stamp →
  ECMD_OK matches C. `check_user_string` is a live in-file
  export (`:199`); unreachable in contest play (shellers
  always null → first disjunct short-circuits), so its
  inner fidelity is moot here. `shellers: null` default
  (`js/sys.js`) + `SHELLERS` sysconf parse
  (`js/cfgfiles.js:1043`) both confirmed.
- Named (1) is a genuine by-design omit: `child(0)` +
  `execl` subprocess spawn cannot exist in scored ESM
  (Rule #2), and the gate fires first whenever sysconf
  does not authorize — always in contest play. Named (2)
  (`^Z`/ioctl text) is a different C file, correctly not
  riding along.

Nit (comment-only, never a row): the `dosh_core` line
cites drift ±1 (`:5686/:5688/:5689` for `:5685/:5687/:5688`;
new call cites `:5690–5691` for the one-line `:5690` call)
— pre-existing style, behavior unaffected.

## Hallucinations / overclaim

None. Owner-null is explained (C literal outside the
`src/*.c` + `win/tty/*.c` matcher), the e46d5e21 +1
post-divergence screen is reported as a side observation
with its env-artifact owner rather than as movement, and
the subshell arm is named, not smuggled. Rule #2 clean
(iteration `--rulecheck`).

## Density

Next-live-head pop (Must-fix empty, head maxed
recorder-artifact, coverage empty, batch dry). One port
function + its core caller, own `Ledger:` entry. Right-sized.

## Verification

D-log claim: test 0/2 → 2/2; targeted rescore 929→931
(pair FULL PASS), 45 bang recipes steady, 0 regressed;
`verify` vacuous-hidden (owner-null) + REACH-OK + explicit
full 44/44.

Audit re-measure: git scoreboard diff
`b3845d7d0~1 → b3845d7d0` shows the pair at steps 29/31 →
FULL PASS (3773/3773 + 68/68 each), PASS 929→931, plus
only the disclosed e46d5e21 side row (still FAIL@158,
env:config-path, scrM 248→249 — post-divergence +1, first
divergence unmoved). Zero other rows: 0 regressed,
non-vacuous. `verify dosh_core --base b3845d7d0~1
--reach-all` reproduces 0-blocked + REACH-OK (24/24).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
