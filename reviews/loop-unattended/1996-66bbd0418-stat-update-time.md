# Review 1996 — 66bbd0418 — botl.c stat_update_time + status_finish (D-3036)

Metadata: SHA `66bbd0418` (D-3036). Two-function cluster of
one C file + `t_warn` stale-retire (no JS) + the `timebot`
VIA_WINDOWPORT caller wiring. Subject promises both ports
whole with the wincap2 registry named.

## Intent vs deliverable

Promise: `status_finish` (js/botl.js:1061) whole — hook
null-check, both-row free+NULL, hilite/threshold teardown
(STATUS_HILITES live); `stat_update_time` (js/botl.js:2685)
whole — moves fill, false shelf, FLUSH arm skipped on caps
0; `timebot` takes the windowport arm on the C-exact mask;
`t_warn` stale with both callers wired. Diff adds exactly
that (two constructor hunks + caller wiring). Kept.

## Inventory

- `status_finish` (js/botl.js:1061, exported sync): new,
  whole.
- `stat_update_time` (js/botl.js:2685, exported sync):
  new, whole.
- `timebot` (js/display.js:7442): caller wiring only.
- `t_warn` (js/display.js:3170, local): untouched;
  ledger stale-retire.
- No deleted symbols.

## C ↔ JS fidelity

### status_finish — verdict: exact-C, ACCEPT

C (`botl.c:1722–1756`, csym range) walked whole: hook
null-check first ✓; `for i < MAXBLSTATS` freeing + NULLing
both rows' `val` ✓ (JS nulls; GC frees); STATUS_HILITES
arm confirmed compiled (`config.h:616`, verified) and
ported — both rows' `hilite_rule = 0`, row-0 threshold
chain dropped and BOTH mirrors nulled inside the same
`if (thresholds)` gate as C `:1743–1752` ✓. Sparse-shelf
guards (`?.`) are JS-only null-safety for on-demand rows,
honestly commented. Sole C caller `save.c:1173`
(freedynamicdata save-teardown, no JS counterpart) named
with precedent cites — correctly a caller omit, not an
arm omit. No RNG.

### stat_update_time — verdict: exact-C, ACCEPT

C (`botl.c:1284–1299`, csym range): `idx` without toggle
✓, `fld = BL_TIME` ✓, `blstats[idx][fld].a_long = moves`
✓ (`game.moves`, `:2506` precedent). `gv.valset[fld] =
FALSE` becomes a fresh false-filled shelf: verified
outcome-equivalent — the callee reads exactly one slot
(`!valsetlist?.[fld]`, js/botl.js:979; the only
`valsetlist` read in the function), so a shelf that is
false at `[fld]` is observationally identical to C's
mutated global here, and it cannot clobber other fields'
flags. FLUSH arm: `wincap2 = 0` hardcoded with the named
registry omit — consistent with the only value JS ever
installs (`install_tty_wincap2` sets URGENT|SUPPRESS only
and documents that HILITE/FLUSH stay off so
VIA_WINDOWPORT stays false). The throwing `status_update`
is unreachable behind the dead arm — correctly stays a
named omit rather than a live-arm stub.

### timebot caller — verdict: wired, ACCEPT

C (`botl.c:286–290`): `if (VIA_WINDOWPORT())
stat_update_time(); else bot();`. JS uses the C-exact mask
(`botl.h:213`: `wincap2 & (WC2_HILITE_STATUS |
WC2_FLUSH_STATUS)`, verified) over the live
`game.windowprocs?.wincap2`. Behavior-preserving today
(installed caps never set those bits → `bot()`, the old
path) and C-faithful if a future port sets them.

### t_warn (stale) — verdict: verified, ACCEPT

JS switch (js/display.js:3170) carries all 10 C wall cases
+ default `unknown` in C order (checked against
`display.c:3452–3498`); both C callers wired (`:3251`
for `:3548`, `:3259` for `:3563`); `impossible()` cite
per D-2608. Stale-retire earned.

### Callee closure — verdict: ACCEPT

`eval_notify_windowport_field` LIVE,
`anything_to_s`/`compare_blstats` LIVE paths, `hook`
optional-call ≡ C null check. No stub in a live arm.
`sym.mjs`: `stat_update_time js/botl.js:2685 sync`,
`status_finish js/botl.js:1061 sync` — single definitions.

## Hallucinations / overclaim

None. The registry omits are named per function, and the
"skips exactly as with a status-incapable windowport"
claim is true against the installed caps value.

## Density

Two whole C functions + caller wiring + verified stale.
Right-sized cluster.

## Verification

Re-measured (both in one call, `--base 66bbd0418~1
--reach-all`): 0 blocked (honest vacuous) per function +
smoke 24 PASS, 0 regressed per function → REACH-OK both.
Zero REGRESSED. Matches the pasted tail.

## Actionable C-wrongs

None.

Ledger: both ported, REACH-OK via smoke. Verify lines:
hidden vacuous (honest) + smoke, per function.

Verdict: **ACCEPT**
