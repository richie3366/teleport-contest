# Review 1180 — 68ea2480 — givit ACID/STONE missing period (D-2214)

Metadata: SHA `68ea2480`, `js/eat.js` only (+2/−2),
D-2214. Queue row `givit` (scen-wish-Rogue-91119
step 70/275 at `eat.c:1093`: C «...becoming
petrified. The grid bug bites!--More--» vs JS
«...petrified The grid bug bites!--More--» —
period missing, double-space kept).

Intent vs deliverable: subject promises C's `"%s."`
period restored on the ACID/STONE arms. Diff appends
`.` to all four literals (normal + hallu on both
arms). Nothing else. Promise == diff.

Inventory: changed JS function — `givit` (ACID_RES +
STONE_RES arms only). No helpers added, removed, or
re-pointed. No callee changes.

**C ↔ JS fidelity**: confirmed exactly. C
`eat.c:1082–1095` puts the period in the format
string, literals bare:
`You_feel("%s.", Hallucination ? "secure from
flashbacks" : "less concerned about being harmed
by acid")` and `You_feel("%s.", Hallucination ?
"unusually limber" : "less concerned about becoming
petrified")`. JS `You_feel` appends no punctuation —
proven by the symptom itself (JS printed «…petrified
The grid bug…» with the double-space intact but no
stop). So baking `.` into each of the four JS
literals reproduces C byte-for-byte on both hallu
branches: 'secure from flashbacks.',
'less concerned about being harmed by acid.',
'unusually limber.', 'less concerned about becoming
petrified.'. Branch guards (`!Acid_resistance` /
`!Stone_resistance`), `d(3,6)` timeout draws, and
arm order untouched. No RNG surface, no clones or
stubs involved. Named omits unchanged (debugpline
only; should/temp/incr wiring already live).

Hallucinations / overclaim: none. Subject, symptom
(step-70 row-0 diff quoted), and fix all match
the diff line-for-line.

Density: +2/−2 is below the §2b ~40-line floor, but
the commit honestly invokes the C-is-that-small
clause — the 99-line function was already ported
and the corpus-blocking remainder was four literals.
A real session moves; not padding, not a split that
should have been glued.

Verification: D-log Verify bullet cites
`verify.mjs --fn givit` → PROGRESS (70 →
nh_timeout@108, strictly later step, different
owner) + green/strict/cohort, final verify after
the last js/ edit (no D-1831 gap). Re-measured:
`hidden-proxy.mjs verify givit --base 68ea2480~1`
→ "0 PASS, 1 moved past, 0 unchanged, 0 worse →
PROGRESS" (Rogue-91119 step 70 → nh_timeout@108).
Claim true. Punctuation-only diff: no banned
patterns possible.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
