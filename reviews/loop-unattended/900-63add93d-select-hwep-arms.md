# Review 900 — 63add93d — select_hwep HTH weapon-select arms (D-1930)

Metadata: SHA `63add93d`, D-1930. Files: `js/weapon.js`
only (+56/−35: artifact loop gate, giant/Balrog specials,
CORPSE gate, oselect filter, is_giant dedup). Map-driven
Open row, 0 corpus blocks cited. Next index 900.

Intent vs deliverable: subject promises the HTH
weapon-select arms (oselect filter, Balrog, resists_ston,
touch_artifact order) plus is_giant dedup. The diff delivers
exactly that; nothing else. Promise ≡ diff.

Inventory: `oselect` gains the CORPSE/EGG cockatrice skip;
`select_hwep` gains the `touch_artifact` conjunct, the
Balrog `else if`, and the `resists_ston` conjunct; local
`is_giant` + `M2_GIANT` deleted for the canonical
`monsters.js:596` export (`sym.mjs` shows the single sync
export, zero remaining clones — identical body, pure
dedup). All extended imports same-edge (`--can` ALREADY ×4:
monsters, artifact, const; EGG/BULLWHIP consts beside
CORPSE/CLUB). `oc_big` kept with the `objclass.h:65`
alias comment — verified direction, not a rename. No RNG
in these arms either side.

**C ↔ JS fidelity** (`weapon.c:469–496`, `:704–741` via
csym): artifact loop conjunct order exact (`oclass &&
oartifact && touch_artifact && ((strong && !shield) ||
!oc_big)`); giant `Oselect(CLUB)` / `else if Balrog &&
uwep → Oselect(BULLWHIP)` structure-exact with
fallthrough-on-miss like the macro (`mndx === PM_BALROG`
is the `data == &mons[]` idiom; `game.u.uwep` is C's bare
`uwep`); CORPSE gate `&& !resists_ston(mtmp)` in C
position; oselect first-match walk with the
`(CORPSE||EGG) && (corpsenm==NON_PM ||
!touch_petrifies)` skip in C position. Callee closure,
audited against `artifact.c:907–974`: JS `touch_artifact`
implements the hero path only — for a monster caller every
deferred arm (covetous/mplayer split, `bane_applies`,
role/align deny) is skipped, so it returns 1
unconditionally, where C returns 0 for self-willed
role-mismatched, misaligned, and bane artifacts. Likewise
`oselect` never calls `can_touch_safely` (`mon.c:1957–1974`
petrify/rider/silver/deny), so monsters may select weapons
C refuses. Both gaps are real remaining C-wrongs — and
both are named in-commit in turns.md
(`can_touch_safely` inside oselect; touch_artifact
non-yours arms), with the monmove.js:230 stub correctly
left unwired rather than called. Debt, not hidden stub.

Hallucinations / overclaim: one doc-level overclaim — the
new `oselect` comment's first sentence describes "skipping
... anything `can_touch_safely` refuses" as implemented,
while its own Named paragraph admits the call site is not
wired. Comment contradicts code; listed below.

Density: 56 insertions, one C locus family — §2b-clean.

Verification: re-measured `hidden-proxy verify select_hwep
--base 63add93d~1` → `0 session(s) blocked on it (0 at
baseline, 0 in the working scoreboard)` — vacuous as
stated, nothing owed. Rule #2 clean. D-log gates: green
2/2 + strict ×2, cohort 7/7; full skipped (single-file, no
shared import edge added) — legitimate. Probe is honest
about the no-uwep case. Added/removed lines grep: zero
banned-pattern hits.

**Actionable C-wrongs** (map-named debt, not Must-fix):
1. Wire `can_touch_safely` in `oselect` once
`monmove.js:230` goes live (turns.md-named).
2. Port `touch_artifact` non-yours arms (covetous/mplayer,
`bane_applies`, role/align deny) so the artifact loop's
conjunct bites for monsters (turns.md-named).
3. Fix the `oselect` doc comment to state the
`can_touch_safely` skip as deferred, not implemented.

Verdict: **ACCEPT-WITH-DEBT**
