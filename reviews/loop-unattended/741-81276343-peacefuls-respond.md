# Review 741 — 81276343 — mon.c peacefuls_respond / setmangry Halt (D-1772)

## Metadata
- Full / short hash: `81276343a8962fa18cb2668cd41c96bc78ff3c4c` / `81276343`
- Parent: `dd090eaf` (D-1771). **Re-audit** of review **731** (ACCEPT-WITH-DEBT). Independent pinned-C walk.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-03 07:57:22 +0200
- D-id: **D-1772**
- Stats: `js/mon.js` +132/−19; `js/mondata.js` +25; `js/sounds.js` +10/−8; await retargets. Total `js/` insertions **176** ≤250. Band **150–350**.
- Claims to close: Open `peacefuls_respond` after D-1763. Not `qst_guardians_respond`. Not Elbereth. Review **724** named this omit.
- JS / map: `mon.js` `peacefuls_respond`/`setmangry`; `mondata.js` `big_little_match`. `c-js-map/turns.md`.
- Archive **Addressed:** D-1772 `81276343`.

## Intent vs deliverable

Git subject promises: Match C `mon.c` `peacefuls_respond` so `setmangry` witnesses Halt/gasp/flee via watch `angry_guards` and `maybe_gasp`, instead of omitting the helper after D-1763.

`node scripts/csym.mjs peacefuls_respond` → `mon.c:4162–4257`. `--callers`: proto `:29`; `setmangry` `:4317`. `setmangry` → `mon.c:4260–4318`. `big_little_match` → `mondata.c:1329–1351`. `maybe_gasp` → `sounds.c:545–610` (D-1762). `quest_info(MS_LEADER)` → `urole.ldrnum`.

Parent: `setmangry` sync anger + always-pline humanoid; named omit of `peacefuls_respond`. The diff **does** port the helper (watch Halt; humanoid gasp/flee/anger; same-mlet growl+flee), wire `!mon_moving`, make `setmangry` async with `couldsee` `pline_mon`, export `big_little_match`, stamp `PLNMSG_GROWL`. It **does not** port Elbereth, victim `growl` else, or `qst_guardians_respond`. Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `peacefuls_respond` | LIVE new | C `staticfn`; local `mon.js` — do not write #2 |
| `setmangry` | LIVE repaired | async; `couldsee` + `!mon_moving` |
| `big_little_match` | LIVE new | mondata.js |
| `maybe_gasp` | LIVE import | sounds.js D-1762 |
| `growl` | LIVE import | + `last_msg = PLNMSG_GROWL` |
| `angry_guards` | LIVE | same file `:1299` |
| `qst_guardians_respond` | OMIT named | `sym.mjs` NOT FOUND |
| Elbereth / victim `growl` else | OMIT named | |

`node scripts/sym.mjs`:

```
peacefuls_respond NOT EXPORTED — 1 LOCAL js/mon.js:967
             => Do NOT write clone #2. (C is staticfn — this is the body.)
setmangry        js/mon.js:1073   ASYNC — await required
big_little_match js/mondata.js:209   sync
maybe_gasp       js/sounds.js:498   sync
growl            js/sounds.js:654   ASYNC — await required
angry_guards     js/mon.js:1299   ASYNC — await required
is_watch         js/monsters.js:885   sync
mindless         js/monsters.js:613   sync
m_canseeu        js/mondata.js:599   sync
monflee          js/monmove.js:768   ASYNC
verbalize        js/display.js:5917   ASYNC
SetVoice         js/sndprocs.js:50   sync
qst_guardians_respond NOT FOUND
```

`--can mon.js sounds.js maybe_gasp` / `--can mon.js mondata.js big_little_match`: **ALREADY**. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: **none**. Rule #2 **clean**.

## C ↔ JS fidelity

**Witness gate (`:4174–4176`).** `!mindless && mpeaceful && couldsee && !msleeping && mcansee && m_canseeu`. Skip DEADMONSTER and `mon==mtmp`. JS `fmon` with `mhp<=0` skip. **Match.**

**Watch (`:4182–4185`).** `is_watch` → `SetVoice` → `verbalize("Halt!  You're under arrest!")` → `angry_guards(!!Deaf)`. C `!!Deaf` is the timeout/intrinsic, not a sticky `u.Deaf`. JS `angry_guards` is LIVE at `mon.js:1299`. **Match.** Not a stub Halt.

**Humanoid else (`:4186–4238`) RNG order.** `!Deaf && !rn2(5)` then `maybe_gasp`; gasp vs exclaim; shk/priest/quest-leader shrug+`continue`; `mlevel < rn2(10)` → `monflee(rn2(50)+25, TRUE, !exclaimed)`; tame skip; else anger. JS uses `urole.ldrnum` / `guardnum` mndx (C pointer identity is impossible with fresh `mons()`). **Match branch order and RNG.** `maybe_gasp` is LIVE (D-1762). Skipping `PLNMSG_GROWL` after growl would make the same-mlet flee sentence C-wrong; this SHA stamps it.

**Same-mlet (`:4239–4254`).** `mlet` equal && `big_little_match` && `!rn2(3)`; then `!rn2(4)` growl + `exclaimed = (last_msg==PLNMSG_GROWL)`; `rn2(6)` → `monflee(rn2(25)+15)`. **Match.**

**`setmangry` (`:4291–4318`).** After peaceful clear: humanoid/shk/gd `couldsee` `pline_mon`; else `growl` named omit; `qst_guardians_respond` named omit; `!mon_moving` → `peacefuls_respond`. Parent always plined without `couldsee`. JS now gates. **Match the new call.** Elbereth prefix still skipped (no `rnd(5)`).

**Callee closure.** LIVE: `maybe_gasp`, `angry_guards`, `verbalize`, `SetVoice`, `monflee`, `growl`, `big_little_match`. OMIT named: `qst_guardians_respond`. STUB: **none** in a live arm. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject “Halt/gasp/flee via watch `angry_guards` and `maybe_gasp`” is true. Review **731** holds. Do **not** stamp “Match C `qst_guardians_respond`.” Do **not** stamp “Match C Elbereth hypocrite.” Do **not** stamp “Match C victim `growl` else.” Journal fortress is not a watch-Halt screen.

## Density

§2b: one C helper + its only caller + `big_little_match`. +176. Did **not** glue Elbereth / quest guardians.

## Verification

D-log: save-oracle skip; green+strict; cohort. Rule #2 clean. Watch Halt **public-unhit**. Admit that. This re-audit re-reads C against the hunks.

## Actionable C-wrongs

None for Must-fix. Named: `qst_guardians_respond`; Elbereth `sengr_at`/`rnd(5)`; victim `growl` else `:4308`. Do **not** write `peacefuls_respond` clone #2. Do **not** skip `PLNMSG_GROWL` after growl. Do **not** Halt without `angry_guards`. Do **not** call `peacefuls_respond` when `mon_moving`.

**Pinned-C walk this overlay.**
`csym.mjs peacefuls_respond` → `mon.c:4162–4257`.
`--callers`: only `setmangry` `:4317`.
`big_little_match` `mondata.c:1329–1351`.
Watch Halt string is exact (`Halt!  You're under arrest!`).
`angry_guards(!!Deaf)` is LIVE, not a no-op.
Humanoid `!rn2(5)` is gated on `!Deaf`, so a Deaf hero draws **zero**
of that `rn2`.
Quest-leader identity in JS is `mndx === urole.ldrnum`
(C compares `mtmp->data == &mons[urole.ldrnum]`).
Same-mlet `!rn2(3)` then `!rn2(4)` growl then `rn2(6)` flee —
three draws, in that order, only after `big_little_match`.
`qst_guardians_respond` remains NOT FOUND.
Elbereth `sengr_at`/`rnd(5)` still absent on the hypocrite prefix.
No FORCE/DIAG. Rule #2 clean.

Verdict: **ACCEPT-WITH-DEBT**
