# Review 912 — 48c80d04 — Armor_gone/count/any-worn family (D-1942)

Metadata: SHA `48c80d04`, D-1942. Files: `js/do_wear.js`
only (+73/−3: one async + two sync exports). Map-driven
Open row, 0 corpus blocks cited.

Intent vs deliverable: subject promises the
polymorph suit-shed + blessed destroy-armor getobj
pair. The diff delivers exactly that. Promise ≡ diff.

Inventory: three new exports (single definitions).
`setnotworn`/`Tobjnam` extend existing edges (no
prior local use — clean); one new edge
(artifact_light/end_burn from timeout.js, `--can`-
cleared in-commit). No stub, no new omit beyond
named caller wiring.

**C ↔ JS fidelity**: `Armor_gone`
(`do_wear.c:938–960` via csym) — uarm snapshot,
was_arti_light snapshot before setnotworn, mask
clear + setnotworn + cancelled_don reset, non-fatal
arti_light gate (end_burn + "stop shining" under
!Blind) before `dragon_armor_handling(otmp,F,F)`,
return 0 — exact. Two adaptations verified sound:
`game.context?.takeoff` guards stand in for C's
always-present struct (nothing to clear when
absent; `:425` shows the module idiom), and
`dragon_armor_handling` is the pre-existing
same-module clone (`do_wear.js:406`, not added
here) — correctly reused, order-correct.
`any_worn_armor_ok` (`:3478–3485`) and
`count_worn_armor` (`:3488–3502`) — verbatim,
seven slots in C order. Callee closure all LIVE:
artifact_light/end_burn (timeout.js),
Tobjnam (objnam.js export imported, not an 8th
clone), setnotworn (do.js). No RNG either side.

Hallucinations / overclaim: none. The lamplit-gate
causal note (snapshot-before-unwear) is real C
reasoning, checked against the body.

Density: 73 lines for a three-function family —
right-sized per §2b.

Verification: re-measured `hidden-proxy verify
Armor_gone --base 48c80d04~1` → `0 session(s)
blocked (0 at baseline, 0 working)` — vacuous as
stated. D-log gates: preflight + post green 2/2 +
strict ×2, cohort 7/7; full skipped (single file)
— legitimate. Rule #2 clean. Diff grep: zero
banned hits.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
