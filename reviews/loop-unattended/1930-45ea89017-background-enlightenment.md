# Review 1930 — 45ea89017 — background_enlightenment (D-2971)

- SHA: `45ea89017` (coverage; `insight.c` `background_enlightenment`)
- Files: `js/insight.js` (`+220/−7`), `js/invent.js` (`+20/−329`). The two inlined copies in `enlightenment` and `doattributes` are deleted. Both call the export.
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunks. `imports.mjs --rulecheck`: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- `sym.mjs`:

```
background_enlightenment js/insight.js:282   sync
strncmpi         js/hacklib.js:419   sync
Blind            js/invent.js:357   sync
             !! ALSO 31 LOCAL CLONE(S) — this file imports the export
rank_of          js/roles.js:810   sync
u_gname          js/roles.js:888   sync
align_gname      js/roles.js:848   sync
just_an          js/objnam.js:2319   sync
endgamelevelname js/display.js:5908   sync
newuexp          js/exper.js:64   sync
body_part        js/polyself.js:622   sync
depth            js/hacklib.js:85   sync
lowc             js/hacklib.js:200   sync
```

`imports.mjs --can js/invent.js js/insight.js background_enlightenment` and `--can js/insight.js js/invent.js Blind` both print `ALREADY`. `insight.js` imports `Blind`; `invent.js` imports this function. Both uses are inside functions, not module top level, so the cycle is not a TDZ read.

## Intent vs deliverable

Subject: there was no `background_enlightenment`. Final disclosure and ^X each inlined a partial copy. ^X still printed experience while polymorphed. Handedness forced an empty prefix unless `Upolyd`, instead of testing `body_part(HANDED)`.

The diff adds one exported function and points both callers at it. Experience is skipped while polymorphed. Handedness uses `body_part(HANDED)`.

## Inventory

| JS | Class | C |
|----|-------|---|
| `background_enlightenment` | live sync `insight.js:282` | `insight.c:467–722` |
| `rank_of` | live | `botl.c:331–358`; `Role_switch` is `you.h:248` `urole.mnum` |
| `u_gname` / `align_gname` | live | `pray.c:2523–2555` |
| `just_an` | live | `objnam.c:2108–2142` |
| `strncmpi` / `lowc` / `depth` | live | `strcmpi` is `strncmpi(..., -1)` |
| `endgamelevelname` | live | `dungeon.c:3409–3437` |
| `newuexp` | live | `exper.c:13–23` |
| `body_part` | live | handedness test |
| `Blind` | live export | `youprop.h:103` plus `uroleplay.blind` |
| `enlght_line` / `enl_msg` | file-local | `insight.c:105–156` |
| `Upolyd` | live | `you.h` `umonnum != umonster` (`const.js:3190`) |
| `observable_depth` | not called | compiled body is `depth` (`topten.c:203`) |
| `botl_score` | absent | `#ifdef SCORE_ON_BOTL` is commented out (`config.h:627`) |

Caller: `insight.c:408` inside `if (mode & BASICENLIGHTENMENT)`. `enlightenment` with `final` calls it at `invent.js:6204`. `enlightenment` with `!final` goes to `doattributes`, which calls it at `invent.js:6949` with `0` (`ENL_GAMEINPROGRESS`, `hack.h:1355`). C `doattributes` (`insight.c:2009–2018`) is `enlightenment(mode, ENL_GAMEINPROGRESS)`. `insight.c:27` is the prototype.

## C ↔ JS fidelity

No `rn2`. `unused_mode` is unread, matching `UNUSED`.

Saved gender is `Upolyd ? u.mfemale : flags.female`, then 0 or 1. Role title is `name.f` when that gender is set and `name.f` exists, else `name.m`. `rank_of(ulevel, urole.mnum, innategend)` matches `Role_switch`. Blank line, then `Background:`.

Polymorph form: current `flags.female`, not the saved gender. Ungendered monster gets `genders[female].adj`. `vampshifted` uses `pmname` of `mons[cham]` plus `" in "`. Article is `just_an(tmpbuf)` only in that phrasing, else `"in "`. Then `pmname` of the current form and `" form"`. `"currently "` only when `!final`. `you_are` is `enl_msg` → `" You are/were …."` with the six contractions.

Role line: gender adjective only when there is no female role name and either both genders are allowed (`ROLE_GENDMASK == ROLE_MALE|ROLE_FEMALE`) or `innategend != initgend`. `initgend` is coerced to 0 or 1; C stores that same index. `"actually "` when polymorphed. `strncmpi(rank, role, -1) === 0` drops the role name (`an(rank), level N adj noun`). Otherwise `an(rank), a level N adj role`. `you_are` again.

Mission adverb: type vs `A_CURRENT` is `currently` / `temporarily`; else vs `A_ORIGINAL` is `now` / `belatedly`; else `!gnostic && moves > 1000` is `nominally`; else empty. `u_gname()` is `align_gname(u.ualign.type)`. The call passes `atype`, which is that field (`?? A_NEUTRAL` only when the field is null). The other two gods are lawful, then neutral (with `" and"` unless chaotic), then chaotic, then `"."`. `align_gname(game.urole, algn)` reads `lgod` / `ngod` / `cgod` and strips a leading `_`, which is `gu.urole` in C.

`difalgn` bit 1 is the helm; that arm `you_are("actually " + align of A_CURRENT)` and clears the bit. Sex change and/or permanent conversion print ` You started out ….`

Handedness: `normally ` unless `body_part(HANDED) === "handed"`. Side is `uhandedness == RIGHT_HANDED` (`URIGHTY`, `you.h:564`).

Place: endgame uses `depth` (the `#if 0` plane remap in `observable_depth` is off) and `endgamelevelname`, which returns the same Astral / Plane of Water|Fire|Air|Earth / `unknown plane #` strings. `"Elemental "` when the name starts with `"Plane"` (`strncmp` of 5). Knox is `on the <dname> level`. Otherwise `strncmpi` of `"The "` then `lowc` of the first byte only, quest uses `dunlev` (`dungeon.c:1324–1328`, `lev->dlevel`), else `depth`, then rogue `", a primitive area"` or bigroom `", a very big room"` when `!Blind`. The `|| 'Fort Knox'` and `|| 'The Dungeons of Doom'` strings replace a missing `dname`. C prints the dungeon field with no English substitute. Those fire only when the branch table has no name.

Turns: `moves == 1` is `you_have("just started your adventure")`. Else `enlght_line(You_, "entered ", "the dungeon N turn(s) ago", "")` in both tenses. `plur` is empty only for 1.

Midnight, else night, using `iflags.at_midnight` / `at_night` when `final`, else `midnight()` / `night()`. Full or new moon only; the quarter strings sit in the same unreachable arm C writes. Friday the 13th: `can happen` / `could have happened` when `final == ENL_GAMEOVERALIVE` (`hack.h:1356`) / `happened`.

Experience only when `!Upolyd`. `%-1ld` is the number. Next-level text when `ulevel < 30 && (final || wizard)`. `newuexp` matches `exper.c:13–23`. `wizard` is `flags.debug` (`flag.h:30`). `wizardMode` also accepts `flags.wizard`; the only assignment in `js/` sets that flag false, so the arm that runs is `flags.debug`. `SCORE_ON_BOTL` is not compiled. The block is absent. That omit is real.

`!final` pushes `` ` ${buf}` ``. `enlght_line` already starts with one space (`insight.c:148`). `add_menu_str` (`windows.c:1831–1838`) stores the buffer unchanged. The extra space is the same overlay prefix `doattributes` already applies to every other ^X body row (`invent.js:6981`, `:7000`). `final` disclosure does not add it, matching `putstr`.

## Hallucinations / overclaim

The subject does not claim `basics_enlightenment` or the rest of `enlightenment`. The deleted invent.js copies were the partial backgrounds, not a second compiled C function. `SCORE_ON_BOTL` and the `observable_depth` `#if 0` body are named and match the preprocessor. No arm of the compiled function is a TODO.

## Density

The whole compiled body shipped: form, role, mission, pantheon, origin, hands, place, turns, clock, moon, Friday, experience. Both C call paths (`final` and `ENL_GAMEINPROGRESS`) use that one function. Insertions are the body; the invent.js deletion is the old copies.

## Verification

```
verify background_enlightenment: baseline 45ea89017~1 (scoreboard at a5772c318, 2026-09-27T13:45:42.279Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify background_enlightenment: no corpus session is blocked on it at 45ea89017~1 — a vacuous verify is NOT a corpus PASS. ...
smoke background_enlightenment: no RNG-tagged reach; fixed smoke spread (12 run, 3.2s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks. D-2971 records green 2/2, strict ×2, cohort 7/7, and skip full. This re-run shows no `REGRESSED` session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
