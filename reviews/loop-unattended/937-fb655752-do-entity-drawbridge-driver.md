# Review 937 — fb655752 — dbridge.c do_entity drawbridge crush/jump/relocate driver (D-1967)

Metadata: SHA `fb655752`, D-1967, `js/dbridge.js` only (+445/−11,
largest in this audit; ceiling 450). Reviewer re-ran all six C
bodies (`:379–399`, `:401–480`, `:485–490`, `:495–525`,
`:530–551`, `:553–759` via `csym.mjs`), the relocation section
at HEAD, the `helpless` macro, sym on ~30 callees, two `--can`
edges, Rule #2, banned grep, and `hidden-proxy verify --base`.

Intent vs deliverable: subject promises seven exports
(`automiss`, `e_survives_at`, `e_died`, `e_missed`, `e_jumps`,
`do_entity`, `nokiller`) in C order with live imports and named
omits. Diff actually adds all seven plus file-local hero-prop
readers. Promise kept.

Inventory: seven new functions (all sync except `e_died` /
`do_entity` async — correct, pline/done/teleds can reach
nhgetch). Callee closure, all LIVE: `passes_walls` /
`noncorporeal` / `is_swimmer` / `is_flyer` / `is_floater` /
`likes_lava` (monsters.js), `is_pool` / `is_lava` (hack.js),
`Unaware` (eat.js), `Fumbling` (attrib.js), `spoteffects`
(pickup.js, async, awaited), `remove_monster` / `place_monster`
(steed.js), `update_monster_region` (region.js), `enexto` /
`teleds` (teleport.js, teleds awaited), `done` (end.js,
awaited), `monkilled` (mhitm.js) / `xkilled` (uhitm.js),
`drown` / `lava_effects` (trap.js, awaited), `mon_nam` /
`hliquid` (do_name.js), `mhe` (mondata.js), `Soundeffect`
(sndprocs.js), `rnd` (rng.js). Both `--can` spot-checks:
ALREADY (same 89-module SCC, call-time use, no top-level TDZ).
No STUBs, no OMITs inside live arms beyond the named map rows.

C ↔ JS fidelity, function by function:

- `automiss` (`:486–490`): identical modulo `edata` / `!!`.
- `e_survives_at` (`:380–399`): noncorporeal → pool (six hero
  props + swimmer/flyer/floater) → lava (Levitation/Flying +
  likes_lava + flyer) → db_wall (Passes_walls/passes_walls) →
  TRUE. Branch and arm order exact.
- `e_died` (`:401–480`): hero DROWNING/BURNING killer-clear +
  `drown`/`lava_effects`, else "falling drawbridge" (only when
  killer name empty) + `done` + `!e_survives_at` →
  `enexto` + Hallucination-gated force-teleport pline +
  `teleds`, then `etmp.ex = u.ux` re-sync — all present in C
  order. Monster arm: `mon_moving ? monkilled(msg, corpse) :
  xkilled(flags)` with the `mk_message`/`mk_corpse` macros
  expanded inline (NOMSG→null, NOCORPSE→AD_DGST=26), the
  `DEADMONSTER` (`mhp < 1`) re-kill with `NOMSG|NOCONDUCT`, the
  still-crushed pline, `edata = null`, and the worm-tail
  occupants sweep. Exact.
- `e_missed` (`:496–525`): automiss → flyer+mobility 5 →
  floater/Levitation 3 → chunks+pool 2 → 0, db_wall −3,
  `misses >= rnd(8)`. Exact, RNG call-for-call.
- `e_jumps` (`:531–551`): immobile-FALSE gate (Unaware/Fumbling
  hero; helpless/`!mmove`/wormno monster), Confusion −2,
  Stunned −3, db_wall −2, `tmp >= rnd(10)`. Exact.
- `do_entity` (`:554–759`): automiss-ride, e_missed branch
  (portcullis-miss pline live, drawbridge-miss debugpline
  D_DEBUG-only omitted), DRAWBRIDGE_DOWN crush with
  NO_KILLER_PREFIX killer, must_jump portcullis split
  (relocate vs crush + crushing sound when `!Deaf`), `{x,y}`
  pt-passing for `find_drawbridge`/`get_wall_for_db`,
  occupancy recursion, relocation move, portcullis-chamber and
  bridge-square tails ("tumble towards", "pass through it" /
  "closes in...", splash, "fall from the bridge", pool/lava
  drink/fall plines, "fell from a drawbridge" killer with
  DROWNING/BURNING/CRUSHING select). Exact in C order.
- `nokiller` (`:763–769`): killer clear + both occupants via
  `m_to_e`. Exact (extra `format = 0` benign).

One investigated non-issue: the `while (e_at(newx,newy) &&
!== etmp) await do_entity(other)` loop reuses a stale `other`
— but C `:667–668` does literally the same (`do_entity(other)`
with `other` fetched once). Faithful, quirk included.
`helpless_mon` matches `monst.h:251` (`msleeping ||
!mcanmove`); `helpless` has no JS export anywhere (6 local
clones house-wide), and likewise none of the youprop names is
exported — file-local readers follow the house pattern, not
clone drift. D-log's "no new clones of exported Unaware/
Fumbling" verified: both imported live.

Hallucinations / overclaim: none. "Dispatch ported, callee
stubbed" does not occur — every callee in every arm is live.

Density: §2b right size for a combined-arm port — one C
function family, one module, every callee LIVE or named. The
+445 lines are C-faithful by construction; ceiling 450
respected.

Verification: D-log Verify shows preflight PASS, `verify.mjs
--fn do_entity` → PASS syntax/rule2/green/strict/cohort (full
skipped: no shared file changed — correct, single-module).
Explicitly vacuous hidden note (row cited 0 blocks, no
corpus-PASS claim). Reviewer re-measured: `hidden-proxy verify
do_entity --base fb655752~1` → "0 session(s) blocked (0 at
baseline, 0 in working scoreboard)". Honest. Diff-body banned
grep clean (only D-log prose hits); Rule #2 clean.

Actionable C-wrongs: none. (Unwired caller wiring —
`set_entity`+`do_entity` in close/open/destroy,
`block_point`/`unblock_point` — stays named in this commit.)

Verdict: **ACCEPT**
