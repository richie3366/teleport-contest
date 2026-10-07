# Review 2498 — 4bb46c746 — m_throw dmgval hero form (D-3617)

SHA: `4bb46c746` — cliffs-head dmgval writer m_throw. D-3617.

## Intent vs deliverable

Promise: `js/mthrowu.js` called `dmgval(singleobj, null)` where C passes
`&gy.youmonst`; the hero's poly form (trapper, MZ_HUGE) drives the big/small
dice arm, so JS drew `rnd(5)` where C drew `rnd(3)`. Fix passes
`game.youmonst`; scen-engulf-Valkyrie-94212 → PASS.

Diff actually adds: `js/mthrowu.js` (+3/−1) — the one call site plus a C
cite; plus `scripts/mthrowu-dmgval-youmonst.test.mjs` (session replay pins
RNG indices 8539–8542). No other `js/`.

## Inventory

- `m_throw` missile-reaches-hero default arm (`js/mthrowu.js:1289–1292`,
  changed) — C `mthrowu.c:722` `dam = dmgval(singleobj, &gy.youmonst)`.
  Status: fixed.

## C ↔ JS fidelity

C `mthrowu.c:716–736` verified: `default:` arm computes
`dam = dmgval(singleobj, &gy.youmonst)` (`:722`), then the elf-bow `:727–734`
and `bigmonst(gy.youmonst.data)` hitv `:735–736` arms. JS `:1289–1305` now
matches call-for-call: `dmgval(singleobj, game.youmonst)`, same hitv clamp,
same elf/bow/arrow gates, same `:735` bigmonst read (which already used
`game.youmonst?.data` — the fix makes the `:722` site consistent with its
own neighbor two lines down).

`game.youmonst` is the live `gy.youmonst` alias: `set_uasmon`
(`js/polyself.js:776–800`) points it at `mons[umonnum]` via `set_mon_data`,
and `dmgval` (`js/weapon.js:227`) reads `mon?.data` → `bigmonst(ptr)` →
`rnd(oc_wldam)` exactly like C `weapon.c:220–227`. The same-idiom precedent
`dmgval(obj, game.youmonst)` already exists at `js/dothrow.js:1698`. Grep
confirms this was the only null-mon `dmgval` site in `js/` (all others pass
`mon`/`mdef`/`youmonst`), so the "every mon-dependent arm read the wrong
form" claim is bounded to this one site.

Helper class: C callee (`dmgval` live export, `sym.mjs` clean, single
definition). No clone created, deleted, or re-pointed; no new import (reads
the already-imported `game`). No FORCE/DIAG/seed/coordinate in the hunk.

## Hallucinations / overclaim

None. The temp weapon.js entry probe (RNG index 8541 = C's `rnd(3)` index,
otyp ELVEN_DAGGER, big false, mon null, umonnum 99) is cited as reverted,
and the session replay test pins exactly those indices. The D-log correctly
does not re-port `dmgval` itself (symptom owner per the parked tag).

## Density

Cliff commit, one arm of the writer, writer correctly chosen over the parked
symptom owner. Ledger: `m_throw ported` — the function was already ported
and this ships one corrected arm; acceptable cliff-phase ledger use (no new
omit). Own cliff head per its HEAD queue.

## Verification

Re-measured: `hidden-proxy.mjs verify dmgval --base 4bb46c746~1 --reach-all`
→ `1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS`
(scen-engulf-Valkyrie-94212: PASS);
`reach dmgval: 351/351 → REACH-OK` (full 351, stronger than the D-log's
80-spread). Unit test: 1 pass, 0 fail.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
