# Review 731 — 81276343 — mon.c peacefuls_respond / setmangry Halt (D-1772)

## Metadata
- Full / short hash: `81276343a8962fa18cb2668cd41c96bc78ff3c4c` / `81276343`
- Parent: `dd090eaf` (D-1771). Fourth of ten `js/` commits this audit. This file audits **this SHA only**.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-03 07:57:22 +0200
- D-id: **D-1772**
- Stats: `js/mon.js` +132/−19; `js/mondata.js` +25/−0; `js/sounds.js` +10/−8; await retargets dokick/explode/mthrowu/read/region/uhitm. Total `js/` insertions **176** <250. Band **150–350**.
- Claims to close: Open `peacefuls_respond` after D-1763. Not `qst_guardians_respond`. Not Elbereth hypocrite. Not victim `growl` else-arm. Review **724** named this omit. `reviews/loop-2026-08-15/` has no unpaid Halt Must-fix.
- JS / map: `mon.js` `peacefuls_respond`/`setmangry`; `mondata.js` `big_little_match`; growl `PLNMSG_GROWL`. `c-js-map/turns.md`.
- Prior: D-1762 `maybe_gasp`; D-1763 `beg`. Archive **Addressed:** D-1772 `81276343`.

## Intent vs deliverable

Git subject promises: Match C `mon.c` `peacefuls_respond` so `setmangry` witnesses Halt/gasp/flee via watch `angry_guards` and `maybe_gasp`, instead of omitting the helper after D-1763.

`node scripts/csym.mjs peacefuls_respond` → `mon.c:4162–4257`. `--callers`: prototype `:29`; `setmangry` `:4317`. `setmangry` → `mon.c:4260–4318`. `big_little_match` → `mondata.c:1329–1351` (only this caller). `maybe_gasp` → `sounds.c:545–610` (D-1762).

Parent: `setmangry` sync anger + always-pline humanoid; named omit of `peacefuls_respond`. The diff **does** port the helper (watch Halt; humanoid gasp/flee/anger; same-mlet `big_little_match`+growl+flee), wire `!mon_moving`, make `setmangry` async with `couldsee` `pline_mon`, export `big_little_match`, stamp `PLNMSG_GROWL`, await existing JS callers. It **does not** port Elbereth, victim `growl` else, or `qst_guardians_respond`. Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `peacefuls_respond` | LIVE new | staticfn; local `mon.js` (C is `staticfn` — not clone #2) |
| `setmangry` | LIVE repaired | async; `couldsee` + `!mon_moving` call |
| `big_little_match` | LIVE new | mondata.js; C `:1329–1351` |
| `maybe_gasp` | LIVE import | sounds.js D-1762 |
| `growl` | LIVE import | + `last_msg = PLNMSG_GROWL` |
| `angry_guards` | LIVE | same file |
| `is_watch` / `mindless` / `humanoid` | LIVE | monsters.js |
| `m_canseeu` / `couldsee` | LIVE | |
| `monflee` | LIVE | monmove.js |
| `SetVoice` / `verbalize` | LIVE | |
| `qst_guardians_respond` | OMIT named | `sym.mjs` NOT FOUND |
| Elbereth `sengr_at`/`onscary` | OMIT named | |
| victim `growl` else `:4308` | OMIT named | |
| tame tameness reduce | OMIT | C comment only |

`node scripts/sym.mjs`:

```
peacefuls_respond NOT EXPORTED — but 1 LOCAL in js/mon.js:967
             => Do NOT write clone #2. (C is staticfn — this is the body.)
setmangry        js/mon.js:1073   ASYNC — await required
big_little_match js/mondata.js:209   sync
maybe_gasp       js/sounds.js:498   sync
growl            js/sounds.js:654   ASYNC — await required
angry_guards     js/mon.js:1299   ASYNC — await required
is_watch         js/monsters.js:885   sync
mindless         js/monsters.js:613   sync
m_canseeu        js/mondata.js:599   sync
monflee          js/monmove.js:768   ASYNC — await required
             !! ALSO 1 LOCAL CLONE music.js:217
verbalize        js/display.js:5917   ASYNC — await required
SetVoice         js/sndprocs.js:50   sync
qst_guardians_respond NOT FOUND
```

`--can mon.js sounds.js maybe_gasp` / `--can mon.js mondata.js big_little_match`: **ALREADY**. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: **none**. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**Witness gate (`:4174–4176`).** `!mindless && mpeaceful && couldsee && !msleeping && mcansee && m_canseeu`. Skip DEADMONSTER and `mon==mtmp`. JS `fmon` array with `mhp<=0` skip. **Match.**

**Watch (`:4182–4185`).** `is_watch` → `SetVoice(mon,0,80,0)` → `verbalize("Halt!  You're under arrest!")` → `angry_guards(!!Deaf)`. JS `Deaf_respond()` is H/E/uroleplay/u.Deaf. **Match.** `angry_guards` is LIVE (wake peaceful watch, `mpeaceful=0`). Not a stub Halt.

**Humanoid else (`:4186–4238`).** RNG: `!Deaf && !rn2(5)` then `maybe_gasp`; `strncmpi(gasp,"gasp",4)` → “gasps” vs exclaims; shk/priest/`data==&mons[quest_info(MS_LEADER)] && mtmp->data != &mons[guardnum]` shrug+`continue`; `mlevel < rn2(10)` && not guardnum → `monflee(rn2(50)+25, TRUE, !exclaimed)`; pline buf; tame skip; else `mpeaceful=0`, `STRAT_WAITMASK`, `adjalign(-1)`, angry pline if !exclaimed. JS uses `urole.ldrnum` / `guardnum` mndx (C pointer identity is impossible with fresh `mons()`). **Match the branch order and RNG.** `maybe_gasp` is LIVE (D-1762), not a stub.

**Same-mlet (`:4239–4254`).** `mlet` equal && `big_little_match(mndx, monsndx(mon))` && `!rn2(3)`; then `!rn2(4)` growl + `exclaimed = (last_msg==PLNMSG_GROWL)`; `rn2(6)` → `monflee(rn2(25)+15)` + optional “And then starts to flee.” JS the same after growl now stamps `PLNMSG_GROWL`. **Match.** Without that stamp the exclaimed/flee sentence would be C-wrong; this SHA fixes it.

**`big_little_match`.** Same-pm; else mlet; walk `little_to_big` both directions. JS `mons(montyp)` mlet string. **Match.**

**`setmangry` (`:4291–4318`).** After peaceful clear + adjalign: humanoid/shk/gd `couldsee` `pline_mon`; **else `growl(mtmp)` named omit**; `qst_guardians_respond` named omit; `!mon_moving` → `peacefuls_respond`. Parent always plined without `couldsee`. JS now gates. **Match the new call and the couldsee fix.** Elbereth prefix still skipped (no `rnd(5)`).

**Callee closure (`peacefuls_respond`).** LIVE: `maybe_gasp`, `angry_guards`, `verbalize`, `SetVoice`, `monflee`, `growl`, `big_little_match`, `is_watch`, `adjalign`, `pline_mon`. OMIT named: `qst_guardians_respond` (caller `setmangry`, not this loop). STUB: **none** in a live arm. Not “dispatch ported, callee stubbed.”

**Await.** JS sites that already called `setmangry` now `await` (wakeup, dokick×2, ghitm, explode, mthrowu, read, region, uhitm cream/flash). C callers still absent in JS (`dothrow`, `polyself`, `priest`, `quest`, `trap` comment, `vault` guard) are pre-existing omits, not dropped awaits.

**RNG walk (humanoid else).** `!Deaf && !rn2(5)` then `maybe_gasp` (itself may `rn2`); `mlevel < rn2(10)`; `monflee(rn2(50)+25, …)`; same-mlet `!rn2(3)` then `!rn2(4)` growl then `rn2(6)` then `monflee(rn2(25)+15)`. JS the same order. Watch arm has **no** `rn2` (Halt + `angry_guards`).

## Hallucinations / overclaim

Subject / D-log “Match C `peacefuls_respond`” is true for Halt/gasp/flee/same-mlet. “via watch `angry_guards` and `maybe_gasp`” is true (both LIVE). Do **not** stamp “Match C `qst_guardians_respond`.” Do **not** stamp “Match C Elbereth hypocrite.” Do **not** stamp “Match C setmangry non-humanoid `growl`.” Journal “fortress held” is not a town-watch Halt screen.

## Density

§2b: one C helper + its only caller + the only-callee `big_little_match` + the `last_msg` growl stamp the same-mlet arm needs. +176. Did **not** glue `qst_guardians_respond` / Elbereth / `dog_hunger`. Did **not** invent a FAIL peel.

## Verification

D-log: save-oracle skip (untagged `mon.c:peacefuls_respond`); Halt canary watch+goblin `mpeaceful→0` via `angry_guards`; `big_little_match` dog/cat chains; green+strict seed8000/0900; CURRENT cohort **7**/7 + strict. Rule #2 clean. Watch Halt **public-unhit**. Admit that.

## Actionable C-wrongs

None for Must-fix (helper + `setmangry` wire match C; remaining named). Named: `qst_guardians_respond`; Elbereth `sengr_at`/`rnd(5)`/`del_engr_at`; victim `growl` else-arm; tame tameness. Do **not** write `peacefuls_respond` clone #2. Do **not** compare `mons()` object identity for leader/guard. Do **not** skip `PLNMSG_GROWL` after growl. Do **not** `peacefuls_respond` when `mon_moving`. Do **not** re-port D-1762 `maybe_gasp`.

C `setmangry` `:4308–4310` else-arm `growl(mtmp)` for non-humanoid victims is still named. C `:4313–4314` `qst_guardians_respond` when `mtmp->data == &mons[quest_info(MS_LEADER)]` is still named. Elbereth `:4268–4285` `sengr_at`/`rnd(5)`/`del_engr_at` is still named. Those are map rows, not this helper.

Verdict: **ACCEPT-WITH-DEBT**
