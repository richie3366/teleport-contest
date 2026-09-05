# Review 825 — 5983e72d — cmd.c '&' dispatches dowhatdoes (D-1855)

## Metadata

- Full / short hash: `5983e72da6506f92acdba0c6308c0c935290ee6d` / `5983e72d`
- Parent: `532d3c44` (D-1854). Map-driven Open: 2 corpus blocked at `dowhatdoes` (`Unknown command '&'`).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-05 11:40:22 +0200
- D-id: **D-1855**
- Stats: `js/cmd.js` +6/−1 / `js/pager.js` 1 word. `js/` insertions **~7** — dispatch-only; the callee body predates this commit.
- Claims to close: 2 corpus `dowhatdoes` blocks. Claims 2 PASS.
- JS / map: `rhack` `&` arm / `dowhatdoes` export. `c-js-map/turns.md`.

## Intent vs deliverable

Git subject promises: `&` dispatches `dowhatdoes` (was "Unknown command"); export from pager.js, import into cmd.js (existing pager edge, no new module). The diff **does** exactly that: one-word export, one import word, one 5-line arm. Nothing else.

C locus: `cmd.c:1934–1935` — `{ '&', "whatdoes", …, dowhatdoes, IFBURIED | GENERALCMD, NULL }` (read at those lines ✓). `pager.c:2658–2715` `dowhatdoes`.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `rhack` `&` arm | LIVE new dispatch | `cmd.js:2833`; sole `&` site; `move = 0` ≡ ECMD_OK like `/`/`?` arms |
| `dowhatdoes` | LIVE re-point (local → export) | `pager.js:1875` async; body audited below |
| `dowhatdoes_core` / `whatdoes_help` | pre-existing, reused | |
| ALTMETA ESC-double; UNIX/VMS introff/intron | OMIT named | platform-specific, in this commit |

`node scripts/sym.mjs dowhatdoes` → `js/pager.js:1875 ASYNC`. No deleted symbol, no new clone, no cycle claim (cmd.js already imports pager.js).

FORCE/DIAG/`getRngLog`/`fastforward`: **none**. No RNG. Rule #2: clean.

## C ↔ JS fidelity

**Dispatch.** `'&'` → `dowhatdoes` with no-turn semantics matches the key table. No earlier `rhack` arm claims `&`; no double-dispatch.

**Callee (dispatch-ported + callee-live, not stubbed).** The body predates this commit but is newly reachable from live input, so audited here against `:2658–2715`: once-tip (ALTMETA suffix named) ✓; `yn_function("What command?")` via the established prompt+`nhgetch` emulation ✓; `dowhatdoes_core` null-gating ✓; `&`/`?` (38/63) → `whatdoes_help` ✓; embedded-newline split (`%s,` + `%8.8s%s` ≡ slice(0,nl)+',' / slice(0,8)+rest) ✓; `No such command '%s', char code %d (0%03o or 0x%02x)` format mirrored ✓; returns 0 ≡ ECMD_OK ✓. **Match.**

**Callee closure.** One dispatch arm; callee LIVE. No STUB in a live arm — the step-5 overclaim pattern ("Match C" for dispatch while callee stubbed) does not apply.

## Hallucinations / overclaim

None. "2 PASS" names both sessions. Full `sessions` skipped with the stated reason (no shared-file change) — cadence re-checks at end of iteration.

## Density

§2b: minimum viable Open pop — a missing key-table row. One arm, one export. Right size.

## Verification

This audit: `node scripts/hidden-proxy.mjs verify dowhatdoes --base 5983e72d~1` → `2 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS` (`random-seed0367-priest-quest-tour-c32340b1` PASS; `random-seed0900-tourist-explore-actions-26ba12bb` PASS). Exactly the D-log claim; both baseline-blocked sessions accounted.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
