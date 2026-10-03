# Review 2349 — 34473e95a — move_special re-entry arm + forget_temple_entry diagnostic

**SHA:** `34473e95a` — "priest.c move_special shop re-entry arm + forget_temple_entry diagnostic (D-3394)."
**Scope:** js/shk.js +5, js/priest.js +7/−1, +128 headless test. Two arms, one C file.
**Prior reviews closed:** none.

## Intent vs deliverable

Promise: (a) the post-move shk re-entry arm after newsym with both callees live and no new edge; (b) the non-priest `impossible` diagnostic with the exact C string, sync-safe, unreachable by construction. Delivered exactly + 4 headless pins. No drift.

## Inventory

| # | JS change | Kind | C locus (csym range) |
|---|-----------|------|----------------------|
| 1 | re-entry arm js/shk.js:4520–4521 | missing arm of live fn | priest.c:125–126 (fn :41–139) |
| 2 | diagnostic js/priest.js:64–71 | missing arm of live fn | priest.c:550 (fn :545–555) |
| 3 | scripts/move-special-shop-reentry.test.mjs | headless test ×4 | — |

No deletion/re-point; no re-point sym owed. Callee sym: `inhishop :833 sync` canonical in-file export (arm does NOT use the sounds/teleport clones ✓); `check_special_room hack.js:3035 ASYNC`, awaited ✓, import pre-exists at parent shk.js:52 ✓ no new edge; `impossible :8718 async`, `void`-floated per in-file precedent (:262/:266 current numbering) ✓.

## C ↔ JS fidelity

**move_special arm — Confirm.** C `:123–126`: `place_monster; newsym; if (isshk && !in_his_shop && inhishop) check_special_room(FALSE);` ≡ JS `mx/my=; newsym; if (mtmp.isshk && !in_his_shop && inhishop(mtmp)) await check_special_room(false);` — order, short-circuit, and post-move position (mx/my already set, like place_monster) all match ✓. `#if 0` dead-block claim verified: pline/Monnam/distant_name/obj_extract_self/mpickobj occur zero times in `:41–127` (two greps) — dead-block-only ✓. Callers: `:4651 await` in shk_move + `:4720 return` in `export async pri_move` (promise adoption, sound) — both pre-existing wirings, arm internal, no signature change ✓. No RNG.

**forget_temple_entry arm — Confirm.** C `:549–552` (verified by direct read):

```c
if (!epri_p) {
    impossible("attempting to manipulate shrine data for non-priest?");
    return;
}
```

≡ JS verbatim including the exact string ✓. C callers mkobj.c:2160 + save.c:894, both behind `ispriest` guards (:2159/:893 — the D-log cites guard lines, accurate) ✓. JS sites: do.js:1814 + lev_json.js:158 guarded ✓; mkobj.js:4372 pre-existing guarded inline (reachable-path identical; leaving it unwired avoids a mkobj→priest edge for an unreachable-path message — sound rationale) ✓. Unreachable-by-construction holds on both sides. Timer-zeroing arm untouched and live ✓.

## Hallucinations / overclaim

None. "42 reached, 42 PASS" re-measured exactly (below). "All 15 C callees live" — the checkable half (dead-block 5) verified; the live 10 are the long-standing move_special body, untouched.

## Density

Two missing-arm rows, one C file, +12 js/ lines + test — small but each arm is a complete ledger-omit resolution with its own pins; acceptable missing-arm density. One `Ledger:` entry per function. No Must-fix bundled. Per-function verdicts: move_special ACCEPT · forget_temple_entry ACCEPT.

## Verification

Re-measured (`verify move_special,forget_temple_entry --base 34473e95a~1 --reach-all`): move_special non-vacuous REACH-OK, forget vacuous + smoke — both match the D-log. Verbatim:

```text
reach move_special: 42 baseline-PASS session(s) reach it (42 run, 67.5s): 42 PASS, 0 regressed → REACH-OK
smoke forget_temple_entry: no RNG-tagged reach; fixed smoke spread (24 run, 11.1s): 24 PASS, 0 regressed → REACH-OK
```

Headless test re-run: 4/4 PASS. Caller proof: C guards `if (mtmp->ispriest)` at mkobj.c:2159 + save.c:893 directly above the :2160/:894 calls (the D-log cites guard lines); JS do.js:1814 + lev_json.js:158 + mkobj.js:4372 all `if (ispriest)`-guarded. D-log shows green/strict/cohort gates. Diff grep: no FORCE/DIAG/RNG-log/fastforward/seed hits. Rule #2: clean (iteration-wide run).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
