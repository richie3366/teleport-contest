# Review 2254 — 3df1abeb4 — sanity/merge quartet (mkobj.c + eat.c arm)

Metadata: SHA `3df1abeb416d95c5ea7a6f784eabbdfe897da5c3` (D-3293,
2026-10-02). `js/mkobj.js` + `js/eat.js`
(~30 ins). Four functions: `nomerge_exception`
(C mkobj.c:3277–3286, new whole),
`obj_nexto` null-arm report (C :3643–3650),
`rottenfood` Rotten/Awful gate (C eat.c:1815–
1816, callee `is_rottable` mkobj.c:2289–2296),
`mk_named_object` verified-complete (C
:2251–2267, no edit).

Intent vs deliverable: subject promises the
quartet. The diff ships the new staticfn,
both arms, and the ledger-only verifications
(+ stairway_find stale→split). Delivers all.

Inventory — `nomerge_exception`: module-local
(:2000), disjunct + boolean return, no
imports (same-file callees). `sym.mjs`:
is_mines_prize mkobj.js:4105 sync,
is_soko_prize mkobj.js:4111 sync, LIVE ✓.

Inventory — `obj_nexto`: null arm gains `void
impossible("obj_nexto: wasn't given an object
to check")` + return null (:3371); sync fn,
fire-and-forget idiom, no import change.

Inventory — `rottenfood`: `is_rottable` added
to the existing mkobj import (eat.js:52);
pline gates Rotten/Awful (:2482). `sym.mjs`:
is_rottable mkobj.js:854 sync, LIVE ✓.

Inventory — `mk_named_object`: no edit; local
end.js:1493 serves end.js:1215 + :1747.

**C ↔ JS fidelity — `nomerge_exception`**:
≡ C :3277–3286 verbatim (comment, disjunct
order, TRUE/FALSE→true/false); staticfn →
module-local ✓. No RNG ✓. Sole C caller
insane_obj_bits :3259 unwired — but the
caller is ledger `by-design` (verified:
"seed: wizard sanity check (debug build
path)"), named in the D-log, not a live-
code caller miss (D-2393/D-2395 class).
Verdict: ACCEPT.

**C ↔ JS fidelity — `obj_nexto`**: null arm
≡ C :3645–3647, report text byte-identical
(confirmed at the cited lines) ✓. Single C
caller mon.c:725 → mhitm.js:3295 disclosed
✓. Verdict: ACCEPT.

**C ↔ JS fidelity — `rottenfood`**: gate ≡ C
:1815–1816 (`is_rottable(obj) ? "Rotten" :
"Awful"`, confirmed at the cited lines);
`foodword` stays 'food' — pre-existing
deferral, disclosed, untouched ✓. RNG order
kept (pline draws none; `rn2(4)` follows
unchanged) ✓. 8 is_rottable call sites
mapped ✓. Verdict: ACCEPT.

**C ↔ JS fidelity — `mk_named_object`**: body
≡ C :2251–2267 (CORPSTAT flag select,
mkcorpstat NULL-mon shape, `oname(nm, 0)`;
`0` == ONAME_NO_FLAGS const.js:2281
verified; `&& otmp` guard harmless — C
notes non-null) ✓. Both C callers wired:
bones.c:483 LEAVESTATUE → end.js:1747 (C
:480–489 cite in tree ✓; savebones lives
in end.js) and end.c:1313 → end.js:1215 ✓.
Single local, no drift. Verdict: ACCEPT.

Hallucinations / overclaim: none. "No corpus
divergence — coverage rows" disclosed; no
corpus PASS claimed; the unwired caller is
ledger-grounded by-design, not hand-waved.

Density: 4 fns ≤ 10, no Must-fix bundled;
composition is mkobj.c ×3 + one eat.c arm
whose substance is the mkobj callee gate
(callee-closure-linked, not an unrelated
second file) + a ledger-only stale — within
§10.17 spirit; own `Ledger:` + Verify
sub-bullet per function ✓ (ledger diff
confirms all four + stairway_find split).

Verification: D-log Verify shows hidden-vacuous
+ smoke 24/24 per fn. Re-measured (`verify
nomerge_exception,is_rottable,mk_named_object,
obj_nexto --base 3df1abeb4~1 --reach-all`,
one call): all four `0 blocked` + vacuous
note + `smoke 24 PASS, 0 regressed →
REACH-OK`. Exact match; zero REGRESSED.
Banned-pattern grep: clean. Rule #2 clean
(iteration-wide).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
