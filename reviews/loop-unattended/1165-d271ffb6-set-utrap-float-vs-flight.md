# Review 1165 — d271ffb6 — set_utrap float_vs_flight wiring (D-2199)

Metadata: SHA `d271ffb6`, `js/trap.js` +5/−5 (one import name, one
call, doc lines). D-log: D-2199. Queue: map-driven row, 0 corpus
sessions blocked.

## Intent vs deliverable

Subject promises: wire the unwired unconditional `float_vs_flight()`
call at C `set_utrap` (`trap.c:1041`). Diff actually adds exactly
that: import name + `float_vs_flight()` in C position + doc update.
Promise kept, nothing else.

## Inventory

Changed JS: `set_utrap` (`js/trap.js`). `float_vs_flight` was already
LIVE at `js/polyself.js:520` (sync, untouchanged). Import is same-edge
(trap.js←polyself.js already imports `polymon, body_part,
mbodypart`); `imports.mjs --can` ALREADY per D-log, no new edge, both
ends hoisted `export function` declarations so no TDZ read; D-log
records a live-import smoke test. Nothing deleted or re-pointed.

## C ↔ JS fidelity

C locus `trap.c:1029–1042` (csym, 14 lines): `!u.utrap ^ !tim →
disp.botl`; store `u.utrap = tim`, `u.utraptype = tim ? typ :
TT_NONE`; `float_vs_flight()` unconditionally. JS matches line for
line: `was !== now` botl gate (plus the house `flags.botl` mirror) ✓;
store with `now ? typ : TT_NONE` ✓; `float_vs_flight()` after the
store with C's comment ✓.

Callee audit (`polyself.c:130–154` vs `js/polyself.js:520–541`):
`stuck_in_floor = utrap && utraptype != TT_PIT` ✓; BFlying
I_SPECIAL set on `H/E-Lev || (H/E-Fly && stuck)`, else clear ✓;
BLevitation I_SPECIAL only on `Lev && stuck`, else clear ✓;
`steed_vs_stealth()` then botl ✓. Arm-for-arm confirm — the "Match C"
claim covers a real body, not a stub.

Routing check I ran beyond the D-log: C `reset_utrap`
(`trap.c:1044–1057`) routes through `set_utrap(0,0)`, so JS
`reset_utrap → set_utrap` inherits the call exactly like C — all ~15
JS `reset_utrap` sites (dig/music/pray/do/trap callers listed above)
now toggle Lev/Fly as C does. The `msg` restore arms
(`float_up()`/`You("can fly.")`) stay named-deferred in the map with
the stated reason (async `float_up` vs sync call sites) — map omits,
not Must-fix.

## Hallucinations / overclaim

None. D-log states the verify is vacuous (0 blocked) and ships on
public gates + a six-case truth-table probe — no PASS invented.

## Density

10-line wiring of a named omission with its callee live: small but C
is 14 lines; §2b floor (~40) is for non-Must-fix ports, and this
retires a queue row with zero risk. Acceptable.

## Verification

D-log Verify: syntax, rule2, green 2/2, strict ×2, cohort 7/7, full
44/44 via the sibling gate (no shared-file change so full-suite skip
is honest). Re-measured myself:
`verify float_vs_flight --base d271ffb6~1` → 0 blocked at baseline,
0 now — "vacuous verify is NOT a corpus PASS" per the tool itself,
exactly as the D-log says. No D-1831 shape (no baseline rewrite
claimed as movement). Rule #2 re-run clean this iteration. No
FORCE/DIAG/seed/coordinate in the hunk.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
