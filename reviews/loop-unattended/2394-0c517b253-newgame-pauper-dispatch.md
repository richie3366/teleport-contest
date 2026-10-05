# Review 2394 — 0c517b253 — newgame pauper_legacy dispatch + propagation (D-3463)

Metadata: SHA `0c517b253`, D-3463, Must-fix review 2390 Actionable 1.
1 function + 2 support edits (≤10 → whole Method each).
Files: `js/allmain.js` (+11/−2), `js/options.js` (+9), `js/questpgr.js`
(+24/−7). No new imports. No test file (probe in /tmp, kept).

## Intent vs deliverable

Promise: close 2390.1 — ship C allmain.c:832
`com_pager(u.uroleplay.pauper ? "pauper_legacy" : "legacy")` by (1) an
rc valueless `pauper` arm with C's implies-nudist, (2) a newgame bridge
`flags.*` → `u.uroleplay.*`, (3) threading `pauper` through
`com_pager_legacy` → `legacy_lines` with the quest.lua:157 text.
Diff actually adds: exactly those three edits, same-module only.
Matches the promise; no scope drift.

## Inventory

| fn | status | JS | C |
|----|--------|----|---|
| newgame (bridge + dispatch) | partial (fix) | js/allmain.js:886–895, :964–973 | allmain.c:765–850 |
| parseNethackrc pauper arm | ported (arm) | js/options.js:5249–5256 | options.c:5289–5293 |
| legacy_lines/com_pager_legacy pauper text | ported (arm) | js/questpgr.js:72–115, :179 | dat/quest.lua:157 |

## C ↔ JS fidelity

**Dispatch — confirm.** `csym.mjs newgame` → allmain.c:765–850;
`:831–833` is `if (flags.legacy) com_pager(u.uroleplay.pauper ?
"pauper_legacy" : "legacy")`. JS `:973` passes
`!!g.u?.uroleplay?.pauper`; sole-caller verified (only js use is
:973; questpgr.js:1210 is a comment). Default `false` preserves the
legacy path for any other caller.

**Implies-nudist — confirm.** C options.c:5289–5293 `case opt_pauper:
u.uroleplay.nudist = u.uroleplay.pauper` sits in the FIRST
after-change switch, before the `go.opt_initial` early return
(:5327) — unconditional at config parse. JS sets both flags to
`value` in parse order. Sequence table matches C exactly:
`pauper,!nudist`→(1,0), `!nudist,pauper`→(1,1), `!pauper`→(0,0)
(C assigns `nudist = pauper`, so clearing pauper clears nudist),
`nudist,!pauper`→(0,0), `!pauper,nudist`→(0,1). Addrs
`&u.uroleplay.*` confirmed in optlist.h (nudist :529, pauper :559;
D-entry cites :530/560 — off-by-one citation, substance right).

**Bridge placement — confirm.** C parses pauper into uroleplay before
newgame; C u_init_misc :947/:959 saves/restores it across the memset.
JS bridges after `u_init_misc()` (:886–895). Every pauper/nudist
reader runs later: `u_init_role`/`u_init_race` are called from
`u_init_inventory_attrs` (js/u_init.js:2049–2050, post-mklev), so
knows_object (:1289/:1301), ini_inv (:1478/:1520) and pauper_reinit
(:2070/:2129) all read bridged values; makedog, skills, legacy
dispatch likewise. JS `u_init_misc` reads only `blind` (:2017), not
pauper/nudist. No reader observes the pre-bridge `{}`.

**Readers — confirm.** All six families live on `u.uroleplay.*`:
dog.js:307 saddle, spell.js:458, weapon.js:1728, u_init.js (4
sites), insight.js:901 enlightenment, topten.js:397 (`:604`) +
end.js:1083. The bridge revives exactly the dead set 2390 named.

**Text — confirm.** quest.lua pauper_legacy last paragraph is 5
lines; JS `lastPara` is byte-identical modulo `%r`/`%d` →
rank/deity substitution (existing convert_arg path). Both branches
5 lines; geometry flows through the existing maxcol/offx recompute.
No RNG in any new arm (parse/bridge/text only).

Helper class: none — no new helpers, no clones, no re-pointed
symbols (`sym.mjs com_pager_legacy` → single def js/questpgr.js:179;
no `sym.mjs` re-point output owed).

Observation (not a C-wrong): valued-form `OPTIONS=pauper:x` still
falls to the generic `result.flags[key] = val` (pre-existing), never
reaching the nudist arm; C's optfn_boolean ignores the value and
still applies implies-nudist. Corner only — valueless is the
documented boolean syntax, and the arm this SHA owns is exact.

## Hallucinations / overclaim

None. "C-exact for every sequence" holds for the valueless syntax it
covers (table above). The D-entry does not claim the doset path or
blind/deaf/reroll (explicitly deferred to a future review in Next).
No dispatch/callee inversion: dispatch and all six reader families
verified live.

## Density

Breadth-phase whole-function bar: 1 function fixed whole (dispatch
+ propagation + text); the two support edits are the arms C names.
`Ledger: newgame partial` + Verify line present; Left open: none.
Named omits (reset_glyphmap own row, NEWS default-off,
get_nhuuid retired) unchanged from D-3455 minus the shipped pauper
arm. Does not bundle a Must-fix item (it IS the Must-fix item).

## Verification

D-log: hidden note (none blocked — row cited none) + REACH-OK smoke
24/24, green, strict, cohort 7/7, full 44/44. Re-ran
`hidden-proxy.mjs verify newgame --base 0c517b253~1 --reach-all`: 0
blocked at baseline and working scoreboard; smoke 24/24, 0
regressed → REACH-OK. Claim true; vacuous note legitimate (Must-fix
row cited no corpus blocks). `imports.mjs --rulecheck`: Rule #2
clean. Diff grep: no FORCE/DIAG/seeds/coords/fastforward.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
