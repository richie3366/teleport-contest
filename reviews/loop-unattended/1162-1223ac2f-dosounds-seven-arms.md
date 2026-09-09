# Review 1162 — 1223ac2f — dosounds seven arms

Subject promises: `sounds.c` dosounds deferred room/guard arms — swamp You1, barracks/court You_hear, temple_priest, oracle canseemon, beehive/morgue bodies (D-2196, map-driven, vacuous corpus verify).
Diff actually adds: seven arm bodies in `js/sounds.js` (+160/−38, one file) + import widenings (roles, vision, priest, monsters, const). Five helpers go sync→async with awaited callers (`get_iter_mons` ×2 sites confirmed awaited).

## Intent vs deliverable

Promise matches diff. All seven previously RNG-burn-only/constant-false stubs now print. Named gaps closed exactly as listed
(swamp `You1` / barracks `You_hear1` / court-throne + beehive + morgue bodies / `temple_priest_sound` body / oracle canseemon gate).

## Inventory

- `throne/beehive/morgue/temple_priest/oracle_mon_sound` + dosounds swamp/barracks arms (`js/sounds.js`): bodies only, one C file family.

## C ↔ JS fidelity

C `sounds.c:29–339` (`node scripts/csym.mjs` per helper), arm by arm, draw-for-draw:

| arm | C | JS |
|-----|---|----|
| throne `:33–62` | `which=rn2(3)+hallu`; `!=2 → You_hear1` (Soundeffect named); `==2 → pline(msg[2], uhis())` | ✓ (hallu 3 → cats arm preserved) |
| beehive `:65–91` | `rn2(2)+hallu` 3-case incl. `uarmh ? "" : "(nonexistent) "` | ✓ verbatim |
| morgue `:94–119` | gate `is_undead\|\|is_vampshifter`; `rn2(2)+hallu`; `You(quiet)` + two `pline_The` (`body_part`+`vtense`) | ✓ (`You(…)` ≡ `pline('You …')`, byte-identical) |
| temple `:137–185` | ispriest/inhistemple/!helpless/outside-temple gate; `rn2(3+hallu)`; speechless/in_sight 50-retry; strip flag chars; `%s` → `halu_gname` | ✓ gate/loop/draws; `%s` → `align_gname` (Hallu-pantheon RNG delta named — same debt as pray.js `halu_gname`) |
| oracle `:188–208` | print gated on `Hallu\|\|!canseemon`; `ora_msg[rn2(3)+hallu*2]` | ✓ — removes a real over-burn (old code drew `rn2(3)` even for a clearly visible oracle) |
| swamp | `You1(swamp_msg[rn2(2)+hallu])` + return (`hack.h:1028` You1≡You("%s")) | `pline('You '+msg)` byte-identical + return ✓ |
| barracks | DEADMONSTER-skip / merc / BARRACKS / `(msleeping\|\|++count>5)` → `You_hear1(barracks_msg[rn2(3)+hallu])` + return | ✓ (`(mhp\|0)<1` ≡ DEADMONSTER; C `#if 0` watch/guard exclusion correctly unported) |

Callee closure (`node scripts/sym.mjs` each): `uhis` (`roles.js:726`), `align_gname` (`roles.js:823`), `inhistemple`/`temple_occupied`
(`priest.js:106/69`), `EPRI` (`const.js:3129`), `is_vampshifter` (`monsters.js:812`) all LIVE; `helpless` is the pre-existing
same-file clone (`sounds.js:768`) matching `monst.h:251` (`msleeping || !mcanmove`) verbatim — verified CLONE; `data.msound`
raw read matches C's direct struct read ✓. Both "new" static edges are widenings (`--can sounds.js roles.js` → ALREADY,
`--can sounds.js vision.js` → ALREADY). OMITs (Soundeffect ×3, Is_sanctum, findgd migrating_mons, Hallu pantheon) all named
in-commit. `hallu` flat-read at dosounds:422 and the `helpless` clone predate the commit.

## Hallucinations / overclaim

None. "Identical draw sequences" verified per arm above (same `rn2` calls, same gates, no added draws — `Hallucination()` is a
state read); the named omits sit in the map comment in-commit.

## Density

~160 insertions for seven arms of one C function family — one envelope, legitimate §2b cluster (raises the ceiling to 450 only;
this review stays well under).

## Verification

D-log states the corpus check is vacuous (map-driven, 0 blocked) and ships on green/strict/cohort + forced full 44/44. Re-measured:

```text
verify dosounds: baseline 1223ac2f~1 (scoreboard at 3fbdad72) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify dosounds: no corpus session is blocked on it at 1223ac2f~1 — a vacuous verify is NOT a corpus PASS.
```

Vacuous claim true and explicitly labeled. Diff grep: no FORCE/DIAG/getRngLog/seed/coordinate gates. Rule #2 clean (re-run this iteration).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
