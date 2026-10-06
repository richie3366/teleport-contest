# Review 2456 — 0745728bf — rhack post-command `reset_cmd_vars` on every arm (D-3574)

**Metadata.** SHA `0745728bf` (2026-10-06, D-3574). Type: **cliff**:
writer port for the cliffs head `botl.c do_statusline2`. `js/`
insertions: ~200 (`js/cmd.js` +222/−13 across ~45 arms) + 1 test file.

## Intent vs deliverable

Promise: wire C's post-command rule — CANCEL|FAIL →
`reset_cmd_vars(TRUE)`, else `(res&(OK|TIME))==OK` →
`reset_cmd_vars(multi<0)` (cmd.c:3810–3816) — into every rhack result
site: full two-branch rule on ECMD-bit arms + canned fall-through,
OK-branch on boolean/void arms; movement/run, PREFIXCMD, digits,
bad-tail deliberately untouched; 3 T-lag sessions PASS.

Diff actually adds: the rule at every result site (verified by arm
audit below), the canned `cmdq_clear()` line replaced by the full
rule. Promise matches diff.

## Inventory

| # | Function | Status | JS | C range |
|---|----------|--------|----|---------|
| 1 | rhack (post-command tail only) | ported | [cmd.js](/home/debian/dev/teleport-contest/js/cmd.js:5435) | cmd.c:3810–3827; reset_cmd_vars :3606–3624 |

Helpers: none added. `reset_cmd_vars` is module-local (correct for
C `staticfn`; `sym.mjs`'s "LOCAL CLONE" tag is the faithful shape,
not drift). ECMD_* already imported; constants match hack.h:1456–1459
exactly (OK 0, TIME 1, CANCEL 2, FAIL 4).

## C ↔ JS fidelity

**The rule is exact.** C :3810–3816 read ✓. With ECMD_OK=0 and
CANCEL|FAIL excluded by the first branch, JS `(res & ECMD_TIME) === 0`
≡ C `(res & (OK|TIME)) == OK` ✓. **The callee is line-identical:**
C reset_cmd_vars (:3606–3624 via `csym`) vs JS (cmd.js:564–582, read)
— run/nopick/forcefight/move/mv/attempting/multi( unconditional
)/menu_requested/travel/travel1/travelmap-null + both queues iff
reset_cmdq ✓. Reset-before-move-lines matches C :3817–3826 ✓; the
dokick kickedloc exemption is pre-existing ✓.

**Arm audit (mine):** all 90 `else if` fragments in rhack contain
`reset_cmd_vars`, a `domove(`, a prefix `continue`, dispatch-bound
routing, or a `return` — except (a) the digits arm (disclosed Named
2, no C counterpart) and (b) one `#`-head REPEAT-clear fragment that
carries no command call (the real `#` fall-through got the rule).
^W-precedent, grid-bug `:3783`, overlay/dispatch — all pre-existing
resets, confirmed in current code. Movement/run arms correctly reset-free
per C :3785–3801 ✓.

**Mechanism cites spot-checked:** hack.c:1407–1409 (`nomul(0)` then
`run = 8`) ✓; allmain.c:262 (`flags.time && !run` → time_botl) ✓.

**Disclosed residuals (in-map, not Must-fix):** (1) bad-command tail
keeps JS `end_running`+move=0 vs C :3833–3842 (run preserved) —
pre-existing, confirmed at cmd.js:5648–5654, out of probe path; (3)
boolean/void arms apply the OK branch, so a collapsed CANCEL/FAIL
keeps REPEAT/CANNED where C clears — correct tradeoff given the
discarded res, bounded and named. Note: the `rhack` ledger row is
`ported` with D-3574 but carries no omit text for (1)/(3) — the D-log
holds them durably; a `ledger.mjs set` note can ride a future real
iteration, never a row.

## Hallucinations / overclaim

None. The canned-queue parenthetical checks out (`cmdq_clear()`
defaults to CQ_CANNED only, cmd.js:313). The `run_active()` no-strand
argument is sound (legit runs return TIME = no reset, same as C).

## Density

Cliff §10.18: head writer, one rule across its result sites, own
`Ledger:` touch. Per-function verdict ACCEPT → SHA ACCEPT.

## Verification

- Added-code grep: clean (resets + cites only).
- Rule #2: clean this iteration (see 2453).
- Re-measure (mine): `verify do_statusline2 --base 0745728bf~1
  --reach-all` → **8 PASS, 1 moved, 11 unchanged, 0 worse** + smoke
  24/24 REACH-OK. The 3 claimed sessions (Healer-94307, Samurai-94207,
  ride-Knight-94412) are all still PASS; the extra 5 PASS + 1 move are
  D-3575/D-3576's later work on the same 20 sessions (forward-only);
  the 11 stills are exactly the D-log's predicted non-T residuals
  (options pagination ×10 + Monk-92194 Pw).
- Committed test pins run==0 after `;` + T:38; forced full `sessions`
  44/44 claimed in-ship, re-covered by this audit's gates.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
