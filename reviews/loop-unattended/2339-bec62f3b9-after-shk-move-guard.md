# Review 2339 — bec62f3b9 — after_shk_move occupancy arm + three callers

**SHA:** `bec62f3b9` — "`after_shk_move` occupancy re-check + all three C callers wired (D-3384)."
**Scope:** js/shk.js +18/−7 (export async, occupancy arm, 2 awaits, import), js/monmove.js +7/−2 (postmov wiring). Single-function.
**Prior reviews closed:** none.

## Intent vs deliverable

Promise: the bill_p==-1000 re-entry arm gains its C-order `!gameover → check_special_room(FALSE)` re-check, and all three C callers are wired (2 in-file awaits + monmove postmov). Delivered, except the postmov wiring drops C's outer guard (see Actionable 1). Body, import, and both in-file call sites match C.

## Inventory

| # | JS change | Kind | C locus (csym range) |
|---|-----------|------|----------------------|
| 1 | occupancy arm js/shk.js:4975–4980 | missing arm of live fn | shk.c:4996–5008, arm :5004–5007 |
| 2 | `export async` + 2 in-file awaits | signature + call sites | shk.c:4990 (`z>0`), shk.c:1327 (home_shk tail) |
| 3 | postmov wiring js/monmove.js:1878–1881 | unwired C caller now wired | monmove.c:1700–1702 **inside :1660 guard** |
| 4 | stale header line removed | docs | — |

No symbol deleted or re-pointed; no re-point sym owed. Callee sym: `check_special_room js/hack.js:3035 ASYNC` (awaited ✓); `ESHK js/const.js:3161 sync`; `inhishop js/shk.js:833 sync` (in-file C-home export; the sounds/teleport clones sym flags are untouched). All LIVE, no new clones/stubs. `game.program_state?.gameover` matches the allmain/apply/artifact idiom (`?.`-safe; undefined ≡ C false).

## C ↔ JS fidelity

**Body Confirm.** C :5000–5007: `if (bill_p==-1000 && inhishop)` → reset (comment verbatim) → `if (!program_state.gameover) check_special_room(FALSE)`. JS :4974–4980 is the same shape with FALSE→false. csym callers are exactly the three wired sites (+extern.h decl) — no fourth caller missed.

**In-file callers Confirm.** shk_move `if (z>0) await` ≡ :4990; home_shk unconditional tail await sits after the killkops `}` exactly like :1327.

**postmov wiring — guard dropped (QUALITY-RISK, Actionable 1).** C :1700–1702 is nested inside `:1660 if (mmoved == MMOVE_MOVED || MMOVE_DONE)` (verified :1658 `} /* mmoved==MMOVE_MOVED */`, :1660 guard, :1703 close). JS wires it at the unguarded tail: `} // end MMOVE_MOVED` at :1840, then pickup/spin_web/hides/isshk with no mmoved check. C and JS both reach postmov with MMOVE_NOTHING (C :2073 fall-through; JS :2355 explicit `return postmov(..., MMOVE_NOTHING, ...)`), so on every no-move shk turn with `bill_p==-1000 && inhishop` JS resets + rechecks where C holds the sentinel. Reachability is narrow (sentinel needs shk-away at hero-leave (:776); in-shop needs a return without a MOVED postmov, i.e. teleport/mnearto; then a NOTHING turn) and the effect is near-silent — check_special_room(FALSE) on steady state recomputes with no transitions, and the only other -1000 consumer is restshk's preserve (:295) — but the D-log's "No call from a site C never calls from" is false for NOTHING-entry postmov, and the Method-required guarding `if` is exactly what was dropped. Pre-existing context (not queued): the whole JS tail after :1840 already lacks the :1660 guard for pickup/spin_web/hides; the Must-fix scopes to the new call only.

```c
/* monmove.c:1660,1700–1702 */ if (mmoved == MMOVE_MOVED || mmoved == MMOVE_DONE) {
        ... pickup ... spin_web ... hides_under ...
        if (mtmp->isshk) { after_shk_move(mtmp); } }
```

## Hallucinations / overclaim

One, material-adjacent: the Callers bullet's "No call from a site C never calls from" overclaims — NOTHING-entry postmov is such a site (C :1660 excludes it). Saying so explicitly per the Method. The "ALREADY, no new cycle" import claim and full-44 PASS claim are consistent with the gates (full re-run in this audit's overlay).

## Density

Single-function cluster, ~25 js/ insertions, below bar; the D-log states the exception (no generatable coverage row left in shk.c — only unknown/absent/scaffold rows generate, and none remain; the many `partial` ledger rows are map-driven singletons, not popped). Exception legitimate per queue rules. One function, one `Ledger:` entry, own Verify bullet. No Must-fix bundled.

## Verification

Re-measured (`verify after_shk_move --base bec62f3b9~1 --reach-all`): 0 blocked + vacuous note + smoke 24/24 REACH-OK — matches the D-log, 0 regressed. Verbatim:

```text
smoke after_shk_move: no RNG-tagged reach; fixed smoke spread (24 run, 11.1s): 24 PASS, 0 regressed → REACH-OK
``` Diff grep: no FORCE/DIAG/RNG-log/fastforward/coordinate hits. Rule #2: clean (iteration-wide run, cited in 2338).

## Actionable C-wrongs

1. **postmov after_shk_move call drops C's :1660 MOVED|DONE guard.** C monmove.c:1700–1702 fires only inside `if (mmoved == MMOVE_MOVED || MMOVE_DONE)` (:1660); JS js/monmove.js:1878–1881 fires on every postmov tail including MMOVE_NOTHING entries (reachable via js/monmove.js:2355 / C :2073). Fix in one iter: guard the new call (`(mmoved===MMOVE_MOVED||mmoved===MMOVE_DONE) && mtmp.isshk`, C order) + `verify.mjs --fn after_shk_move` incl. full (shared file). Do NOT re-guard the whole pre-existing tail (pickup/spin_web/hides) in the same iter — that gap predates this SHA and needs its own corpus read. Source: reviews/loop-unattended/2339-bec62f3b9-… (Must-fix — prepended).

Verdict: **QUALITY-RISK**
