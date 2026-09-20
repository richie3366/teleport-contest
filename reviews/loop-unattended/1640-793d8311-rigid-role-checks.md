# Review 1640 — 793d8311 — `role.c` rigid_role_checks whole-body port (D-2681)

Metadata: commit `793d8311`, D-2681, js/player_selection.js + js/roles.js.
No prior review claimed closed.

## Intent vs deliverable

Subject promises: whole-body `rigid_role_checks` with the ROLE_RANDOM
fallback now `randrole_filtered`. Diff actually adds: restarted body with
per-arm C cites, `randrole_filtered` local→export in js/roles.js, +1
import name. Matches the promise; the only behavior change is the one
fallback line.

## Inventory

Changed JS: `rigid_role_checks` (restarted, js/player_selection.js:567);
`randrole_filtered` (export keyword + comment, js/roles.js:1033 — body
untouched).

## C ↔ JS fidelity

C locus: `role.c:1234–1281` (csym range; D-log `:1235–1281`). Callers
(csym --callers): exactly 2 — `:2243` genl_player_setup, `:2814`
plsel_startmenu; D-log wires both (js/player_selection.js:1535 and the
4 split menu entry points :1144/:1232/:1313/:1394). Confirm.

Branch-by-branch confirm: RANDOM role pick + `< 0 → randrole_filtered`
fallback; RACE/ALIGN/GEND PICK_RANDOM narrowing each guarded by
`!== ROLE_NONE`; PICK_RIGID fill of still-NONE facets under
`initrole != ROLE_NONE` — all in C order with matching args. Confirm.

`randrole_filtered` body vs C `:730–744`: same 4 `ok_*` predicates, same
`set[rn2(n)]` / `randrole(FALSE)` fallback. Apparent off-by-one checked:
C loops `SIZE(roles)-1` (terminator), JS `roles.length` — but the JS
`roles` table excludes the C terminator by file convention (documented
js/roles.js:979 and :1021–1022), so the bounds are identical. Not a
C-wrong. Required `sym.mjs` output pasted in-session:
`randrole_filtered js/roles.js:1033 sync` — single live export, no clone.

No new import edge (player_selection→roles pre-exists; roles→
player_selection back-edge call-time only — D-log's `--can` ALREADY
claim is consistent with the static import already present in the diff
context). No RNG in `rigid_role_checks` itself; the fallback change is
RNG-identical when no filter masks are set (set = all roles → same
`rn2` draw shape). Diff grep: no FORCE/DIAG/seed/coordinate. Rule #2
clean (iteration-wide).

## Hallucinations / overclaim

None. "One live-callee wiring" is accurate — the rest of the body
already matched. The adjacent `genl_player_setup` pick4u pline note is
correctly left as a candidate, not queued (refill only via port-coverage).

## Density

Minimal whole-function fix (~20 insertions on a 48 L C function) —
right-sized; Must-fix-class single-item iteration per §2b.

## Verification

D-log: syntax, rule2, hidden 0-blocked, reach smoke 24 PASS, green/
strict/cohort, full 44/44. Re-ran
`hidden-proxy.mjs verify rigid_role_checks --base 793d8311~1 --reach-all`:
"0 blocked (0 at baseline…)" — queue cited 0, vacuous note properly
stated — plus "24 PASS, 0 regressed → REACH-OK". No REGRESSED.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
