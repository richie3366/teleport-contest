# Review 1187 — b3f4d2f8 — weldmsg caller wiring (D-2221)

Metadata: SHA `b3f4d2f8`, `js/wield.js` only,
D-2221. Queue row `wield.c` weldmsg (1 blocked:
scen-wish-Priest-92041 step 158) — C «Your grappling
hook is welded…» vs JS «Your weapon is welded…».

Intent vs deliverable: subject promises the three
caller arms. Diff delivers `await weldmsg(u.uwep)` at
all three plus `reset_remarm()` at the two C sites
that have it. Nothing else.

Inventory: no new function, no new module edge
(`reset_remarm` joins the pre-existing static
`do_wear.js` edge — `imports.mjs --can` → ALREADY).
`sym.mjs`: weldmsg `wield.js:192` async,
reset_remarm `do_wear.js:1642` sync. No symbol
deleted or re-pointed (import list extended within an
existing edge).

**C ↔ JS fidelity**: checked against pinned C call
sites plus the `weldmsg` body (`:1060–1074`, csym
range). Body (pre-existing): bimanual plural,
owornmask save/clear/restore, Yobjnam2 — matches C;
local `Yobjnam2` clone stays named (chwepon
D-0435/D-1692), untouched. Call sites, each in C
position/order: (a) dowield `:383–385`
weldmsg→reset_remarm→unsplit-undo ✓ (JS
`is_split_child` guard ≡ C's o_id/child_oid check —
pre-existing, unchanged); (b) doswapweapon `:473`
weldmsg with NO reset_remarm ✓ — correctly not
added; (c) doquiver `:572–573` with
`weld_res = !bknown` pre-computed and
`weld_res ? 1 : 0` ✓. Callee closure: both LIVE, no
STUB in any touched arm.

Hallucinations / overclaim: none. "Match C" claim
covers dispatch + callee, and the callee is live —
no dispatch-behind-stub pattern.

Density: §2b right-size — three arms of one envelope,
one module.

Verification: re-measured —
`hidden-proxy verify weldmsg --base b3f4d2f8~1` →
"1 session(s) blocked (1 at baseline, 0 in working
scoreboard); scen-wish-Priest-92041: PASS; 1 PASS, 0
moved, 0 worse → PROGRESS". D-log claim confirmed
call-for-call, not vacuous. Rule #2 clean; no
FORCE/DIAG/seed gates. Green/strict/cohort claimed;
HEAD re-confirmation with the cadence run.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
