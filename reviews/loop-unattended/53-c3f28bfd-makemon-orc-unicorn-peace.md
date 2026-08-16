# Review 53 — c3f28bfd — `makemon` S_ORC / S_UNICORN mlet peace (D-1092)

## Metadata
- Full / short hash: `c3f28bfdb5a55c49bb7b62ed89ef572fe2ca231e` / `c3f28bfd`
- Parent: `278521f1` (D-1091). JS-touching since last dedicated review file creation (`8bb7d93f`): D-1089–D-1091, **this SHA**. This file audits **this SHA only**. This SHA also touched `reviews/loop-unattended/38-…` (filled D-1091 hash) — that is a stamp, not a new review file.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 17:21:39 +0200
- D-id: **D-1092**
- Stats: 11 files, +125 / −48 — `js/makemon.js` +22 / −1 (`Race_if` helper + `S_ORC`/`S_UNICORN` else-if arms + `is_unicorn` import).
- Claims to close: Open queue `makemon.c` S_ORC / S_ELF / unicorn mlet peace override after `m_initweap` (named omit on makemon row). Stamped **Addressed:** D-1092 on the archive row **without** the short hash (chicken-egg). This review commit fills `c3f28bfd`. `reviews/loop-2026-08-15/` has no open orc/unicorn-peace Must-fix.
- JS / map: `makemon.js` `makemon` mlet switch. `c-js-map/data.md` names D-1092. 5.0 has **no** `S_ELF` mlet (elves are `S_HUMAN`); the queue’s “S_ELF” was the 3.4 name. dprince bribe / raven `BEC_DE_CORBIN` / emin roaming / `MM_ANGRY` still named. `dogmove.js` string `'MS_LEADER'` still live Open.
- Prior reviews this SHA claims to close: D-1088 named omit “S_ORC/S_ELF/unicorn peace”; D-1079 / review **40** did not claim this switch.

## Intent vs deliverable

Git subject promises: “Match C makemon.c so orcs stay hostile to elves and co-aligned unicorns are always peaceful.”

The queue line mixed `S_ELF` into a 5.0 tree that has no such `mlet`. C `makemon.c:1335–1342` is `case S_ORC` + `Race_if(PM_ELF)`, then `case S_UNICORN` + `is_unicorn && sgn(u.ualign.type)==sgn(ptr->maligntyp)`. The port follows **C**, not the sloppy queue wording. It does **not** invent `S_ELF`.

The diff **does** those two arms in the mlet switch **before** `set_malign` / `m_initweap`, after `peace_minded` has already run (and burned any `rn2`). `S_ORC` + `Race_if(pm('ELF'))` → `mpeaceful=0`. `S_UNICORN` + imported `is_unicorn` + matching `sgn` → `mpeaceful=1` (pony/horse skip because `!likes_gems`).

It does **not** add `MM_ANGRY` before `peace_minded` (C `makemon.c:1299`; JS `makemon.js:2129` still always calls `peace_minded`). Named in the D-log. It does **not** port dprince `MS_BRIBE` / raven `BEC_DE_CORBIN` / emin roaming. Named. It does **not** retouch MS_NEMESIS mitem (`urole.neminum`). Named, live Open.

The queue’s “after `m_initweap`” is **wrong about C order**. C applies these overrides in the mlet switch, then `set_malign`, then groups, then `m_initweap`. JS put the arms in the switch. That is C, not the queue’s later slot.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `makemon` `S_ORC` / `S_UNICORN` arms | C body, **ported** | `makemon.c:1335–1342` |
| `Race_if` | **clone** of `you.h:297` | `game.urace.mnum === X` |
| `is_unicorn` | C macro, **imported** | `monsters.js:410–412` = `mondata.h:149` |
| `sgn` | local helper, **pre-existing** | same as `peace_minded` |
| `pm('ELF')` | C `PM_ELF` | `monsterNames` index 264 = generated `PM_ELF` |
| `peace_minded` | C callee, **untouched** | still runs first; `rn2` consumed |
| `set_malign` | C callee, **untouched** | still after the switch |
| `MM_ANGRY` skip of `peace_minded` | C sibling, **named omit** | JS always burns `peace_minded` |
| `S_ELF` mlet | **absent in 5.0 C** | correctly not invented |
| dprince / raven / emin | C after switch, **named omit** | before invent in C |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched. No new RNG in the new arms (`peace_minded` `rn2` is earlier and unchanged).

## Constitution / playbook

Grep of the `js/makemon.js` hunk: no trace-index gates, no recorded coordinates, no `fastforward` burns. `pm('ELF')` is the generated `PM_ELF` index, not a seed orc mndx. Contest Rule #2: no Node builtins.

## C ↔ JS fidelity

### Order — `peace_minded`, then mlet switch, then `set_malign`

C `makemon.c:1299` then `1303–1346`:

```
    mtmp->mpeaceful = (mmflags & MM_ANGRY) ? FALSE : peace_minded(ptr);
    switch (ptr->mlet) {
    case S_MIMIC: …
    case S_SPIDER: case S_SNAKE: …
    case S_LIGHT: case S_ELEMENTAL: …
    case S_EEL: …
    case S_LEPRECHAUN: …
    case S_JABBERWOCK: case S_NYMPH: …
    case S_ORC:
        if (Race_if(PM_ELF))
            mtmp->mpeaceful = FALSE;
        break;
    case S_UNICORN:
        if (is_unicorn(ptr) && sgn(u.ualign.type) == sgn(ptr->maligntyp))
            mtmp->mpeaceful = TRUE;
        break;
    case S_BAT: …
    }
    /* emits_light … cham … then set_malign after peaceful changes */
```

JS `makemon.js:2129` then `2155–2218`: `mpeaceful = peace_minded(ptr) ? 1 : 0` (no `MM_ANGRY`); else-if chain mimic → spider/snake → **eel → light/elemental** (pre-existing swap vs C; mutually exclusive `mlet`, not this SHA) → leprechaun → jabberwock/nymph → **S_ORC** → **S_UNICORN** → S_BAT. New arms sit **after nymph, before bat**, which is C. `set_malign` at `2290` after cham/worm. Match for the claimed arms.

`peace_minded` still runs for an elf-race orc spawn even though the next line forces hostile. C same (unless `MM_ANGRY`). Co-aligned unicorn still burns `peace_minded`’s `rn2(16+rec)` / `rn2(2+|mal|)` then overrides to peaceful. C same. Public RNG prefix unchanged when the override does not fire; when it fires, the extra `rn2` already happened in both.

### `Race_if(PM_ELF)` — clone, not `Role_if`

C `you.h:297`: `#define Race_if(X) (gu.urace.mnum == (X))`. Not `Role_if` (`urole.mnum`, D-1088).

JS `makemon.js:449–452`: `(game.urace?.mnum | 0) === (pmnum | 0)`. `u_init.js:1630–1639` writes `game.urace.mnum = race.mnum`. Same field `peace_minded` already uses for `hatemask` (`makemon.js:1019–1023`). Match.

`pm('ELF')` (`makemon.js:264–266`) is `monsterNames.indexOf('PM_ELF')`. Generated `PM_ELF = 264`. C `PM_ELF` is the elf player-race monster index. An elf **monster** (player-monster elf, elf-lord, …) is `S_HUMAN`, not `S_ORC`; this arm never runs for them. Orc `mlet` + elf **player race** is the C test. Match.

`peace_minded` `race_hostile` already returns false for elf vs `M2_ORC` when `hatemask` is set (D-0172). The `S_ORC` arm still runs: it forces hostile even if hatemask were 0 (journal canary) or if `peace_minded` had returned true via some other path. Redundant on a stock elf hatemask, **required** by C. Do not delete it because “hatemask already hates orcs.”

### `is_unicorn` + `sgn` — imported callee

C `mondata.h:149`: `#define is_unicorn(ptr) ((ptr)->mlet == S_UNICORN && likes_gems(ptr))`.
C `mondata.h:144`: `#define likes_gems(ptr) (((ptr)->mflags2 & M2_JEWELS) != 0L)`.

JS `monsters.js:410–412` / `532–534`: `mlet === 'S_UNICORN' && likes_gems(ptr)`; `likes_gems` is `mflags2 & M2_JEWELS`. **Imported real function**, not a local clone. Pony/horse are `S_UNICORN` without jewels → skip. White/gray/black unicorns take the arm.

`sgn(u.ualign.type) == sgn(ptr->maligntyp)`: lawful white (`+`/`+`), neutral gray (`0`/`0`), chaotic black (`-`/`-`) → `mpeaceful=1`, then `set_malign` negative. Cross-align (chaotic vs white) → leave `peace_minded` result (usually hostile via `sgn(mal) !== sgn(ual)` already). Amulet + black unicorn: `peace_minded` would force hostile (`mal < 0 && uhave.amulet`); this arm still sets peaceful. C same. Journal canary.

JS `sgn(game.u?.ualign?.type ?? 0)`: missing `ualign` becomes 0 (neutral). C always has `u.ualign.type` after init. Play path sets it. Not a production seed gate.

`MM_ANGRY` unicorn: C sets peaceful **false**, then the unicorn arm may set **true**. JS never special-cases `MM_ANGRY`, so `peace_minded` may already be true; the unicorn arm still forces 1 when co-aligned. Diverges only when `MM_ANGRY` would have skipped `peace_minded` RNG **and** the unicorn is not co-aligned. Named omit, not this subject.

### No `S_ELF`

5.0 `mons[]` elves are `S_HUMAN`. There is no `case S_ELF`. Inventing one would be a C-wrong. This SHA does not. The Open line’s “S_ELF” is retired as a 3.4 leftover, not as a missing arm.

## Hallucinations / overclaim

“Match C makemon.c so orcs stay hostile to elves and co-aligned unicorns are always peaceful” is **true for those two mlet arms.** `is_unicorn` is a real import. `Race_if` is a one-line clone of `you.h`, not a stub. `set_malign` still runs after. This is **not** “Match C dispatch, callee is a stub.”

It is **not** true that `MM_ANGRY` skips `peace_minded`, that dprince/raven/emin peace ran, or that `dogmove.js` stopped comparing `msound` to the string `'MS_LEADER'` (still `dogmove.js:709`/`722`/`870`). The D-log names those.

Stamping **Addressed:** D-1092 is fair for the Open line as C wrote it (orc+unicorn, no invented `S_ELF`). Fill hash `c3f28bfd` in this commit.

## Density (§2b)

One Open cluster: the two adjacent `switch` arms C places after nymph and before bat, plus the `Race_if` helper those arms need. ~20 executable lines. Right size. Sibling dprince/raven/emin left named. `MM_ANGRY` is a different site (the assignment before the switch) — correctly not glued in. Not “finish `makemon` peace.”

## Verification

Journal: private canary **12**/12 (elf+goblin hatemask-0 always hostile; human+goblin mixed; lawful white / neutral gray / chaotic black always peaceful + malign<0; chaotic white hostile; amulet+black still peaceful; pony mixed; elf MH_ORC hatemask still hostile); green+strict seed8000/0900; cohort **22**/22 (incl. 0060 orc, 0004/0103 pony, 0399 unicorn-history, 0360/0361/0367/0373/4500/0014/2200) + strict 0014/0360/0399/0004/0060/4500/2200/0367. Override **public-unhit** or already matching the `peace_minded` roll. Cadence **#1390** **44**/44 — fortress, not an elf-vs-goblin screen.

C read of `makemon.c:1299–1346`, `you.h:297`, `mondata.h:149`, `peace_minded` callers; JS `makemon.js:264–266`/`449–452`/`1028–1049`/`2129`/`2152–2290`, `monsters.js:410–412`/`532–534`, `u_init.js:1630–1639`. Hunk grepped FORCE/fs/seed.

| Spawn | C after switch | JS after D-1092 |
|-------|----------------|-----------------|
| Elf player, goblin (`S_ORC`) | `mpeaceful=0` | **0** |
| Human player, goblin | `peace_minded` only | **same** |
| Lawful, white unicorn | `mpeaceful=1` (override) | **1** |
| Chaotic, white unicorn | `peace_minded` (hostile) | **same** |
| Chaotic + Amulet, black unicorn | override peaceful | **1** |
| Pony (`S_UNICORN`, `!likes_gems`) | no override | **no override** |

`set_malign` after a forced-peaceful unicorn still uses the peaceful formula (not MS_LEADER −20). Unicorns are not `MS_LEADER`. Match.

## Actionable C-wrongs

None that Must-fix this next iter. The claimed mlet arms match `makemon.c`.

Named omits / do-nots (map / Open, not Must-fix):

1. `dogmove.c` pal/target tests must compare numeric `ptr.msound` not string `'MS_LEADER'` (live Open; still `'MS_LEADER'` at `dogmove.js:709`/`722`/`870`).
2. `makemon.c` `m_initweap` MS_NEMESIS mitem `ptr.msound` not `urole.neminum` (live Open).
3. `MM_ANGRY` before `peace_minded` (`makemon.c:1299`).
4. dprince `MS_BRIBE` peace; raven `BEC_DE_CORBIN`; emin/angel roaming.
5. Do not invent `S_ELF` mlet. Do not skip `peace_minded` `rn2` because the override will fire.

Do not restore mndx-only orc/unicorn lists. Do not use `Role_if` / `urole.mnum` for this arm. Do not treat hatemask as a substitute for `Race_if(PM_ELF)`. Do not import `peace_minded` into `dogmove` pal tests.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `makemon` now forces orcs hostile to elf-race heroes and co-aligned unicorns always peaceful like `makemon.c`, using `Race_if` and imported `is_unicorn`, while 5.0 correctly has no `S_ELF` arm and `dogmove` still string-compares `msound`.
- Must-fix stays empty for this SHA; next port pops Open `dogmove.c` pal/target numeric `ptr.msound`.
