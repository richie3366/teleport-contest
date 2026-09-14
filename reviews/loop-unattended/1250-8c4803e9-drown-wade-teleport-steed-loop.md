# Review 1250 — 8c4803e9 — trap.c drown wade/Amphibious/teleport/steed/drowning-loop arms

Metadata: SHA `8c4803e9`, D-2284, queue row `trap.c drown`. js/ insertions
~194 (one function + import lines). Prior review 1249 covered `7942532c`;
this is the first of 5 JS SHAs since audit `13ba1306`.

Intent vs deliverable: subject promises the full `drown` envelope (wade /
Amphibious / teleport / steed / crawl-out / drowning loop) replacing the
D-1814 crawl-out stub. Diff actually delivers exactly that — one rewritten
`drown()` in `js/trap.js` plus import widening, no other JS function touched.

Inventory: changed `drown` (`js/trap.js:5285`); added static imports
(`under_water`, `can_teleport`, `DISMOUNT_GENERIC`, `TELEDS_TELEPORT`,
`TELEPORT`, `TELEPORT_CONTROL`, `safe_teleds`, `noteleport_level`, `dotele`,
`number_leashed`, `unleash_all`, `is_waterwall`, `hero_Swimming`,
`hero_Amphibious`, `hero_Breathless`); dynamic `split_mon` (sit.js),
`Unaware` (eat.js), `finish_losehp_done` (end.js). No deletions/re-points,
so no `sym.mjs` delete audit is owed.

## C ↔ JS fidelity

C locus `nethack-c/upstream/src/trap.c:5058–5199` (`csym drown`, 142 lines).
Branch-by-branch against the JS:

- `is_solid = is_waterwall` (`:5065`) — fixes the stub's WATER-typ check. LIVE.
- `feel_newsym` first (`:5067`) ✓.
- Wade early-out (`:5069–5076`): `uinwater && is_pool(ux-dx,uy-dy) &&
  Swim/Amph/Breath`, `rn2(5)` → `inpool_ok` else `return FALSE` ✓ verbatim.
- Fall/plunge punctuation (`:5078–5083`): `.` iff Amphib/Swim/Breath (order
  permuted inside an OR — same semantics); Titanic/rock gate
  `!Swimming && !is_solid` ✓.
- `water_damage_chain` ✓; gremlin `rn2(3)` → `split_mon` ✓; iron golem
  `You rust!` + `Maybe_Half_Phys(d(2,6))` + mhmax gate + `losehp KILLED_BY` ✓.
- `inpool_ok` early FALSE after the golem arm — C position ✓.
- Leash (`:5097`): `pline_The("leash%s slip%s loose.")` → `The leash(es)
  slip(s) loose.` ✓ (house `pline`-as-`The` idiom).
- Amphib/Breath/Swim survive arm (`:5103`): verbose gate, waterlevel
  bottom/keel, Punished unplacebc/placebc, `vision_recalc(2)`,
  `set_uinwater(1)`, `under_water(1)`, full-recalc, FALSE ✓.
- Teleport escape (`:5118`): `(Teleportation || can_teleport) && !Unaware
  && (Teleport_control || rn2(3) < Luck+2)`, `dotele(FALSE)`, `!is_pool` →
  TRUE, else attempted-fails pline ✓. Luck ≡ `uluck+moreluck` ✓.
- Steed `dismount_steed(DISMOUNT_GENERIC)` + pool check ✓; usleep/faint ✓.
- Crawl (`:5138`): multi/mm ove/`rnd_nextto_goodpos`, `lost`/`succ` out-param
  via ref object, `Is_waterlevel` skip, Pheew + `teleds ALLOW_DRAG`, `But in
  vain.` still present (`js/trap.js:5431`) ✓.
- Drowning loop (`:5155–5189`): `urgent_pline`, 2× killer rebuild
  (water→`deep water`/KILLED_BY, limitless→KILLED_BY), `done(DROWNING)`,
  `safe_teleds(ALLOW_DRAG|TELEPORT)` break, `You're still drowning.`,
  post-loop `set_uinwater(0)` + `rescued_from_terrain` + TRUE ✓.

Callee closure: every new import resolves LIVE — `under_water`
(js/display.js:5285, async, awaited), `can_teleport` (monsters.js:960),
`safe_teleds`/`dotele`/`noteleport_level` (teleport.js, async awaited),
`number_leashed`/`unleash_all` (apply.js:1370/1442, sync, unawaited ✓),
`is_waterwall`/`hero_Swimming` (dbridge.js:123/341), `Unaware`
(eat.js:497, canonical; the trap.js:4303 file-local clone is usleep-only so
the dynamic alias is correct, not a new clone), `split_mon` (sit.js:1003,
async), `finish_losehp_done` (end.js:1548, async). No CLONE, no STUB, no
new OMIT. RNG call-for-call in branch order: `rn2(5)`, `rn2(3)` gremlin,
`d(2,6)`, `rn2(3)` teleport.

One nuance, not queued: after fatal iron-golem rust + lifesave, C falls
through to the later arms while JS returns via the house
`finish_losehp_done` idiom (same as 4 sibling sites in trap.js). Iron golem
+ fatal rust + lifesave + a later observable arm is unreached by any corpus
session; consistent house behavior, not a distinct family.

Hallucinations / overclaim: none. D-log says "verbatim in C order" — it is.
No "Match C" dispatch-over-stub anywhere; all callees live.

Density: one C function, one JS function, ~194 insertions — right-sized §2b.

Verification: D-log Verify bullet is honest (vacuous note, explicitly NOT a
corpus PASS; green 2/2 + strict ×2 + cohort 7/7). Re-measured myself:
`hidden-proxy verify drown --base 8c4803e9~1` → "0 session(s) blocked on it
(0 at baseline, 0 in the working scoreboard)". No baseline rewrite, no false
PASS. `imports.mjs --rulecheck` → Rule #2 clean. Diff grep: no
FORCE/DIAG/getRngLog/seed/coordinate/RNG-index reads in js/ hunks.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
