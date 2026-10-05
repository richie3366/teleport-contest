# Review 2390 — f482d6954 — wincap2 caps wire + 3 audits (D-3455)

Metadata: SHA `f482d6954`, D-3455, 5 functions (≤10 → whole Method each).
Files: `js/botl.js` (+30/−13), D-log + ledger (allmain/botl/insight/windows).

## Intent vs deliverable

Promise: wire the two hardened `const wincap2 = 0` sites to a live tty
caps read (C reads `windowprocs.wincap2` at botl.c:1671/:1674/:1295);
audit newgame / record_achievement / genl_status_init as unshippable-omits-only.
Diff actually adds: file-local `windowprocs_wincap2()` (js/botl.js:1064),
2 call sites (:1105, :2827), +1 import. Matches the promise; no scope drift.

## Inventory

| fn | status | JS | C |
|----|--------|----|---|
| evaluate_and_notify_windowport | ported (wire) | js/botl.js:1077 | botl.c:1620–1680 |
| stat_update_time | ported (wire) | js/botl.js:2809 | botl.c:1284–1299 |
| newgame | audited | js/allmain.js:813 | allmain.c:765–850 |
| record_achievement | audited | js/insight.js:640 | insight.c:2406–2472 |
| genl_status_init | audited | js/botl.js:292 | windows.c:892–906 |

## C ↔ JS fidelity

**evaluate_and_notify_windowport — confirm.** 9 skip gates in C order
(:1633–1641, incl. the XP||EXP/Upolyd double-gate); RESET/FLUSH dispatch
is C's `if/else-if` with the `(updated \|\| botlx)` FLUSH gate (:1671–1676);
flag clear + `update_all` (:1678–1679) present. The wire reads the
installed value or TTY_WINCAP2 fallback — C-exact for a status-incapable
tty port; dormant arms stay dormant. Caller C botl.c:1277 →
js/botl.js:2804 wired (dead VIA_WINDOWPORT path, behavior-null).

**stat_update_time — confirm.** idx/fld, moves push, valset shelf,
field push, FLUSH dispatch, void return — all C :1287–1298 in order.
Caller C botl.c:287 → js/display.js:7864 timebot arm wired (dead path).

**record_achievement — confirm.** Range check + impossible, dup scan,
repeat return, slot store, gameover return, rank/soko-mine/else livelog
arms — all C :2414–2471 in order. SoundAchievement compile-out verified:
`SND_LIB_INTEGRATED` requires a `SND_LIB_*` backend (sndprocs.h:193–200),
none is defined in this build, so the empty definition applies. True no-op.

**genl_status_init — confirm.** Loop (alloc→`''`, active FALSE, fmt NULL),
WIN_STATUS sentinel for `create_nhwindow`, display_nhwindow named (no
window sys). Whole modulo the named omit.

**newgame — WRONG AUDIT.** Ledger note `audited D-3455: remaining omit
cannot ship` is false: C allmain.c:832 `com_pager(u.uroleplay.pauper ?
"pauper_legacy" : "legacy")` — JS js/allmain.js:955 → `com_pager_legacy`
→ `legacy_lines()` (js/questpgr.js:66) always renders the standard text.
C quest.lua:157 `pauper_legacy` differs (last paragraph: "an untrained
%r ... unable to adequately prepare"). Reachable via OPTIONS=pauper
(opt_pauper; optlist default On/Off per-option, pauper initval false).
Root cause is shippable: JS parses pauper to `game.flags.pauper`
(js/options.js:11886) but nothing propagates it to `u.uroleplay.pauper`,
so the dispatch and all six `uroleplay.pauper` readers (dog/spell/u_init/
insight/topten) are dead. Listed in neither the D-entry Named list nor
the ledger omit (which also drops the D-entry's signal/tributesz names).

Helper class: `windowprocs_wincap2` — `sym.mjs` reports 2 local clones
(js/botl.js:1064, js/options.js:1343), byte-identical, same live value.
Not C-wrong (no divergence), but clone #2 of an unexported helper is
debt: one export would do. `TTY_WINCAP2` live export js/const.js:1519.

## Hallucinations / overclaim

"Match C" for the caps wire holds — both dispatches verified dormant
per C-with-status-incapable-port, callers dead-gated. No dispatch/callee
inversion. The overclaim is the newgame `audited` note (above), plus an
old-D-log staleness surfaced: "com_pager_legacy owns menu incl.
pauper_legacy" is false today (no pauper branch in code).

## Density

Breadth-phase whole-function bar: 4 of 5 functions whole; newgame is an
arm-shy audit sold as complete. Per-function Ledger entries + Verify
lines present; Left open: none (correct for the other four).

## Verification

D-log: 5× hidden vacuous note + 5× REACH-OK (smoke 24/24), green,
strict, cohort 7/7. Re-ran `hidden-proxy.mjs verify <5 fns> --base
f482d6954~1 --reach-all`: 0 blocked at baseline (rows cited none —
vacuous notes legitimate), 5× REACH-OK (24/24, 0 regressed). Claim true.
`imports.mjs --rulecheck`: Rule #2 clean. Diff grep: no FORCE/DIAG/
seeds/coords/fastforward.

## Actionable C-wrongs

1. **newgame pauper_legacy dispatch unlisted (wrong `audited`).** Ship
   C :832: propagate pauper option → `u.uroleplay.pauper` (+nudist per
   C options.c:5290–5292) before the legacy call and render
   `pauper_legacy` text (quest.lua:157) when set; or narrow the ledger
   omit + audit note to name it. One iter, pauper-only behavior delta.
   **Addressed:** D-3463 `0c517b25`.

Verdict: **QUALITY-RISK**
