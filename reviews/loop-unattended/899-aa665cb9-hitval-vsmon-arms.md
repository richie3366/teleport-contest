# Review 899 — aa665cb9 — hitval blessed/spear/trident/pick arms (D-1929)

Metadata: SHA `aa665cb9`, D-1929. Files: `js/weapon.js`
(+16/−1: four vs-mon arms), `js/objects.js` (+9: canonical
`is_spear`). Map-driven Open row, 0 corpus blocks cited.
Next index 899.

Intent vs deliverable: subject promises the four remaining
vs-mon arms of `hitval` plus a canonical `is_spear` home.
The diff delivers exactly that; nothing else. Promise ≡
diff.

Inventory: `is_spear` → `js/objects.js:145 sync` (C
`obj.h:233–234` macro expanded exactly: WEAPON_CLASS +
`oc_skill === P_SPEAR`); the two remaining file-local
clones (`dothrow.js:354`, `u_init.js:1037`) named in-commit,
not re-cloned. `KEBABABLE_MLETS` file-local (C static
array shape). Callees: `mon_hates_blessings` /
`thick_skinned` already imported (same edge, extended
import lines only); `is_pick` joins the existing objects.js
edge; `is_swimmer`/`passes_walls` extend the existing
monsters.js edge; `is_pool` → `hack.js:1321 sync`, edge
pre-exists (`--can` ALREADY). `ptr = mon?.data` mirrors
`dmgval`. No stub, no new omit.

**C ↔ JS fidelity** (`weapon.c:148–187` via csym): branch
order exact — blessed `Is_weapon && blessed &&
mon_hates_blessings` +2; spear `is_spear && kebabable` +2
with the array verified member-for-member against
`weapon.c:71–75` (XORN, DRAGON, JABBERWOCK, NAGA, GIANT);
TRIDENT + `is_swimmer` → `is_pool(mx,my)` +4 else
eel/snake +2; pick + `passes_walls && thick_skinned` +2.
`objectNames[otyp] === 'TRIDENT'` is the live repo idiom
(uppercase identifier table — `eat.js:153` indexes it the
same way; `dmgval` switches on the same strings), so the
arm is live, not a dead string compare. No RNG in `hitval`
either side. Named in-commit: sibling `is_spear` clones,
and the row's "silver" correctly identified as `dmgval`
territory (no silver arm exists in C `hitval`) — good
stale-row hygiene.

Hallucinations / overclaim: none. The probe covers
spear/pick/base only; the D-log says so explicitly
(blessed/trident "ride the same live calls") rather than
claiming full-arm coverage — honest scoping, and both
uncall paths verified here by convention + import.

Density: ~25 insertions closing a named row — small like
897, justified as a single-locus arm completion.

Verification: re-measured `hidden-proxy verify hitval --base
aa665cb9~1` → `0 session(s) blocked on it (0 at baseline, 0
in the working scoreboard)` — vacuous as stated, nothing
owed. `imports.mjs --rulecheck` → Rule #2 clean (HEAD).
D-log gates: green 2/2 + strict ×2, cohort 7/7, full 44/44.
Added/removed lines grep: zero banned-pattern hits.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
