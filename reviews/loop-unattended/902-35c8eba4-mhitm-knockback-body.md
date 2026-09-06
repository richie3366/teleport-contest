# Review 902 — 35c8eba4 — mhitm_knockback hurtle/steadfast/size/weapon body (D-1932)

Metadata: SHA `35c8eba4`, D-1932. Files: `js/mhitm.js`
(+313/−~150: full knockback body + 15 threaded call
sites), export-openings in `js/dothrow.js`,
`js/steed.js`, `js/worn.js`, `js/mhitu.js`, `js/uhitm.js`
(+23: hmon destroyed + hmonas sum writeback). Map-driven
Open row, 0 corpus blocks cited. Next index 902.

Intent vs deliverable: subject promises the full
knockback body (replacing the RNG-burning stub) with
hitflags threaded as `mhm` at every caller. The diff
delivers exactly that; nothing else. Promise ≡ diff.

Inventory: one new file-local `is_blunt_weapon_mm`
(verified against `obj.h:253–255` + `WHACK=4` at
`objclass.h:81` — exact; no JS port exists, so local is
correct, not drift). Pre-existing `_mm` locals
`attacktype_mm`/`dmgtype` reused for the grabber gate —
their union `{ENGL, HUGS, STCK, WRAP&!ENGL}` is exactly C
`sticks()` (`mondata.c:653–659`, which itself includes
AT_HUGS) plus the two attacktype disjuncts. Opened
exports all resolve to single canonical sync/async
definitions (`sym.mjs`: test_move_ok, is_flimsy,
will_hurtle, doorless_door, m_is_steadfast, unstuck,
set_apparxy, mhurtle, make_stunned — async ones awaited);
`is_flimsy`'s two other clones are pre-existing debt, and
this commit correctly imports the export.

**C ↔ JS fidelity** (`uhitm.c:5246–5420` via csym):
gate order exact — `rn2(3)` distance → Ogresmasher
`chance=2` → `rn2(chance)` → AD_PHYS+aatyp →
grabber/sticks → sgn direction → `test_move`
(hero) / isok+door-diagonal (mon) → saddle
redirect/dismount → alive → size `>+1` →
flimsy/blunt → unsolid → hitflag → steadfast →
knockedhow (`will_hurtle`→backward/back) → shared
pline / You_feel → unstuck → hurtle/dismount/stun
(hero) or mhurtle/HIT/DEF_DIED/mstun (mon) +
AGR_DIED tail. RNG positions match (message `rn2(2)`×2,
effect `rn2(4)`); fail paths burn byte-identical draws
to the stub (`rn2(3)`+`rn2(6)` — verified order).
Rogue-level diagonal: C `doorless_door`
(`hack.c:4062–4074`) returns FALSE on rogue, so
`!doorless` fires; JS inlines `Is_rogue_level(uz) ||`
(the steed clone omits that arm) — outcome-equivalent,
and `Is_rogue_level(game.u?.uz)` is the established repo
idiom (5 existing sites). Callers: `mhitm.c:1061–1065`
preempt shape repeated per exclusive mdamagem arm (each
arm returns — exactly-once per attack verified at
`mhitm.js:2949+`; AD_PHYS done-path runs knockback
without preempt then returns, value-equivalent to C);
`uhitm.c:1928` destroyed and `:5833` sum[i] writeback
both position-exact. Named in-commit: test_move full
arms, vtense you-arm (hero keeps literal `knock`).

Hallucinations / overclaim: none. "20 call sites" ≈ 15
mdamagem arms + tail + hitmu + hmon_hitmon + hmonas —
count consistent with the file.

Density: 399 insertions, one C function + its callers —
large but single-locus; justified per §2b.

Verification: re-measured `hidden-proxy verify
mhitm_knockback --base 35c8eba4~1` → `0 session(s)
blocked on it (0 at baseline, 0 in the working
scoreboard)` — vacuous as stated, nothing owed. Rule #2
clean. D-log gates: green 2/2 + strict ×2, cohort 7/7,
full 44/44. Added/removed lines grep: zero banned hits.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
