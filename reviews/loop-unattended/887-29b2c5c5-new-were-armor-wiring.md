# Review 887 — 29b2c5c5 — were.c new_were mon_break_armor caller wiring (D-1917)

Metadata: SHA `29b2c5c5`, D-1917. Files: `js/were.js` (+14/−4:
1 import, 1 call site, doc lines). Queue row archived, map
`turns.md` updated. Next index 887.

Intent vs deliverable: subject promises the `were.c:129` caller
wiring — `mon_break_armor(mon, FALSE)` before `possibly_unwield`
in `new_were`. The diff delivers exactly that call plus its import
and the named-omit doc update (`mon_break_armor` leaves the omit
list; `monflee` onscary, howl, Soundeffect stay). Promise ≡ diff.

Inventory: 0 new functions, 0 promotions, 1 call site changed
(`new_were`, `js/were.js:173–179`), 0 deletions. Smallest possible
diff for the locus — correct.

**C ↔ JS fidelity** (`csym new_were` →
`nethack-c/upstream/src/were.c:95–138`, 44 lines, read in full):
C `:129–130` is two sequential sync calls —
`mon_break_armor(mon, FALSE); possibly_unwield(mon, FALSE);`. JS
runs both in C order with the same args (`false` ≡ `FALSE`). The
only shape delta is the sync-or-async chain (`const mba =
mon_break_armor(mon, false)`; `if (mba) return
Promise.resolve(mba).then(after_armor); return after_armor();`),
which is forced by the callee's `void|Promise` contract: canonical
`mon_break_armor` (review 884, `worn.js`) flushes message thunks
(`You_hear`/`pline`/`instapetrify`/`dismount_steed` awaits) and
returns a Promise exactly when thunks are pending, `undefined`
otherwise. The chain preserves both halves — armor mutations run
inline before unwield in all cases, thunks flush first when present
— and it is the same `after_armor` shape newcham uses (review 884
verified that discipline, including the `!pending.length →
undefined` boolean contract). Return-contract check: old code
returned `possibly_unwield(mon, false)` directly; new code returns
`after_armor()` (= the same value) on the sync path and a Promise
resolving to it on the async path. Both existing callers tolerate
`void|Promise` (`mhitu.js` fire-and-forget, `potion.js` `await`) —
stated in the D-log, and the call sites are untouched in this diff,
so no caller re-proof is owed here. Callee closure: `mon_break_armor`
LIVE canonical import (`sym.mjs mon_break_armor` → `js/worn.js:449
sync`); `possibly_unwield` unchanged (D-1744). No RNG in either arm
at this call site (`monflee`'s `rn1(9,2)` is in the still-named
onscary arm, untouched). Named omits (`monflee` onscary with its
`svc.context.mon_moving` + mux/muy arm, file-level howl
`You_hear`/`wake_nearto`, Soundeffect, `impossible()`
unknown-lycanthrope) are real rows in untouched code — the diff's
"unchanged" claims are trivially true (only `were.js` hunks shown).

Hallucinations / overclaim: none. D-log says "none on any suite"
and marks the hidden verify vacuous by name. No dispatch-vs-callee
gap: the dispatched callee is the reviewed canonical export, not a
stub.

Density: one C call site, ~14 js lines — C is that small, so the
below-40 handoff is honest, not a density fail. Single-locus.

Verification: D-log gates PASS (green 2/2 + strict ×2, cohort 7/7)
plus an import smoke (`new_were: function`, `mon_break_armor:
function`, no TDZ/cycle break). Re-measured: `hidden-proxy verify
mon_break_armor --base 29b2c5c5~1` → `0 session(s) blocked on it (0
at baseline, 0 in the working scoreboard)` — vacuous as stated,
map-driven row. `sym.mjs` output pasted above. `imports.mjs --can
were.js worn.js mon_break_armor` → ALREADY (no new edge; same
module SCC, function binding, no top-level TDZ read — the D-log's
hoisted-SAFE claim checks out). `imports.mjs --rulecheck` → Rule #2
clean (HEAD, covers all three SHAs). Diff grep: no FORCE/DIAG/seed/
coordinate patterns.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
