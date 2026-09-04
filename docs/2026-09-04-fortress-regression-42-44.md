# Fortress regression — 42/44 (2026-09-04)

Human investigation (loop was stopped). **Read this before coding either
Must-fix.** Do not pop Open `lava_effects` until both items below are
shipped. Do not treat 42/44 as map-driven fortress.

Last full public PASS was **44/44** at **D-1790** (`31181641`,
`monverbself`) / docs-only `d38ea9c7`. Overnight the Open queue was
re-pointed at `PORT-GAP-TOP30.md` and dense ports **D-1791…D-1815**
shipped without recovering the two public FAILs. Cadence kept recording
42/44 as if that were the new normal.

Reproduced at HEAD **D-1815** `462e1338` (same two sessions, same
shape). Green gate still PASS.

| Session | Channel | HEAD | Introduced | Not this |
|---|---|---|---|---|
| `seed0030-ten-diverse-deaths` | RNG + screen | RNG **39912**/105529 positional; Screen **989**/1953 | **D-1795** `efcb3fd4` `mattacku` | D-1797 `usleep`; gem colors |
| `seed4500-knight-coverage` | screen only | Screen **1801**/1814; RNG **108275**/108275 | **D-1792** `9c160502` `nh_timeout` | drown / untrap / getdir |

Two Must-fix items, **one per iteration**, in this order.

---

## 1. seed0030 — `mattacku` continues after `done()` (pop first)

**Addressed:** D-1816

### Measured (HEAD)

`seed0030` is **10 independent new games** (seeds 31–40, different
names/roles), concatenated by the runner. **Do not diagnose off the
concatenated first miss.** `rng-diff --all-segments` reports C seg4
`rn2(2)` vs JS `rnd(21)` at concat index 38053 because JS seg3 emitted
**four extra calls**; later segments are new games and match C in
isolation.

Per-segment RNG at HEAD:

| seg | who | C RNG | JS RNG | first miss |
|----:|---|-------:|-------:|---|
| 0–2, 4–9 | nine games | = JS | = C | none |
| **3** | Beatrix, chaotic elf Wizard, seed 34 | **9892** | **9896** | JS +4 after a full C prefix |

Seg3 extra JS calls after C’s last `rn2(1)=0 @ can_make_bones(bones.c:377)`:

```
rnd(21)=5
d(4,4)=10
rn2(3)=2
rn2(6)=5
```

That is **exactly** `mattacku` NATTK slot `i=1`: JS
`rnd(20 + i)` (`js/mhitu.js` ~3003 / ~3104), then `hitmu` `d(damn,damd)`,
then `mhitm_knockback` `rn2(3)` / `rn2(6)` (`uhitm.c:5258/:5269`).

C’s last matching combat on that game:

```
rnd(20)=17 @ mattacku(mhitu.c:912)     # i=0 → rnd(20+0)
d(4,4)=12 @ hitmu(mhitu.c:1187)
rn2(3)=2 @ mhitm_knockback(uhitm.c:5258)
rn2(6)=0 @ mhitm_knockback(uhitm.c:5269)
rn2(1)=0 @ can_make_bones(bones.c:377) # inside done()/really_done
```

C last screens: `You die... Maganasipi takes all your possessions.--More--`
then disclose blanks. JS last extra screen: **`Maganasipi hits again!--More--`**.
JS emitted 292 screens vs C 291 in seg3; suite Screen 989/1953 is the
concatenated fallout of that one extra frame (next seg’s welcome vs leftover
combat), not a separate display bug.

Positional suite RNG **39912**/105529 is **not** a matched prefix (the
runner counts equal slots after desync too). Concat first mismatch is
index **38053**. Do not chase 39912.

### C vs JS

C `mhitu.c` `mattacku` `:938–950` after each slot:

- sleep-wakeup `rn2(10)` if `sum[i]==M_ATTK_HIT`
- `M_ATTK_AGR_DIED` → `return 1`
- `M_ATTK_AGR_DONE` → `break`
- **no `M_ATTK_DEF_DIED` check** — when the hero dies, `mdamageu` →
  `done_in_by` → `done` → `really_done` **longjmp** out. The `i=1`
  slot never runs.

JS `js/mhitu.js` `mattacku` copies those three tests and already aborts
if `mtmp.mhp < 1`. `done()` (`js/end.js`) **returns** after
`really_done` (sets `program_state.gameover`). `hitmu` then returns
`M_ATTK_HIT` and the `for (i = 0; i < NATTK; i++)` loop starts `i=1`.

Same pattern already used elsewhere in JS (`muse.js`, `zap.js`,
`monmove.js`, `allmain.js`): `if (game.program_state?.gameover) return`.
`mattacku` does not.

D-1797 `nomul`/`unmul` `usleep=0` was the right fix for review **764**’s
sticky-sleep `rn2(10)` and **did not** move this miss (review **766**).
Do not reopen usleep.

Wizard/explore `done()` “OK, so you don’t die” (`savelife`, `survive`)
returns **without** `gameover`. A `gameover` gate must **not** block
that path (seed4500 screen 1794 already matches).

### Work packet

```text
Objective:        Must-fix seed0030 — mattacku abort after done()
C locus:          nethack-c/upstream/src/mhitu.c:mattacku :938–951
                  nethack-c/upstream/src/end.c:done (longjmp; does not return)
JS locus:         js/mhitu.js:mattacku NATTK loop (~2969–3150)
                  js/end.js:done / really_done (returns; sets gameover)
Symptom channel:  RNG (4 extra draws) + one extra --More-- screen
Hypothesis:       After Maganasipi’s killing i=0 hit, JS still runs i=1
                  because done() returned; C longjmp’d. gameover abort
                  at the AGR_DIED site matches C and existing JS callers.
C reads done:     mattacku loop tail + hitmu hp<1 mdamageu + done/really_done
Branch envelope:  gameover abort in mattacku only; do not throw DoneError;
                  do not change wizard survive; do not glue hitmu ads
Falsifier:        node frozen/ps_test_runner.mjs \
                    sessions/seed0030-ten-diverse-deaths.session.json
                  FAIL if seg3 still has JS RNG 9896 or topline
                  "Maganasipi hits again"
Focused verify:   seed0030 full session (10 segs, shared VFS)
                  Per-seg: seg3 C 9892 / JS 9892; other segs still equal
Green gate:       CURRENT.md seed8000 + seed0900 + strict
Cohort:           combat: seed0004 / seed0007 / seed0012 / seed1500
                  + seed2200 + seed0383 + strict lengths
```

**Do not:** FORCE/RNG; gem-color / `randomize_gem_colors` peel; delete
the D-1795 sleep `rn2(10)` arm; skip D-1797; invent `M_ATTK_DEF_DIED`
on `hitmu` unless C actually sets it on that path (it longjmps instead).

Bisect already done: parent **D-1794** `22bc5c1e` seed0030 RNG
105529/105529 (review **764**). D-1795 made the remaining NATTK body
live, which made the missing longjmp analogue load-bearing.

---

## 2. seed4500 — `#wizintrinsic` shows `deafness [2]` (pop second)

### Measured (HEAD)

RNG **full** 108275/108275. Screen **1801**/1814. **13 cell misses, 0
cursor misses**, all the same row:

| JS (wrong) | C (right) |
|---|---|
| `j - deafness                    [2]` | `j - deafness` |
| (one pick: `j + deafness [2]`) | `j + deafness` |

Miss indices: **556, 557, 558, 559, 574, 575, 576, 1092, 1093, 1151,
1152, 1167, 1168** — four `#wizintrinsic` menus (T:97, T:97 again,
T:191 Blind, T:198 Blind). First miss is the **first** menu of the
session (screen 556), so `u.HDeaf` TIMEOUT bits are already 2 **before
any menu selection**. Status line on those frames does **not** show
`Deaf` (rows 22–23 match). Screens after 1168, including Valley/Home 5
look_here / attributes, **match**.

CURRENT’s “DEAF `[2]` leftover” label was right about the glyph; it was
wrong if read as “expiry talk” or “count-prefix 2”. C never prints
“You can hear again.” / “unable to hear” on this session.

### Bisect

| SHA | seed4500 |
|---|---|
| D-1790 `31181641` | **PASS** 1814/1814 |
| D-1791 `2619827e` `newuhs` | **PASS** 1814/1814 |
| D-1792 `9c160502` `nh_timeout` dialogues + `stone_luck` | FAIL 1801/1814 (same 13) |
| HEAD D-1815 `462e1338` | FAIL 1801/1814 (same 13) |

`wizcmds.js` was **not** in the D-1792 commit. Same
`prop_old_timeout`: if `u.HDeaf` is truthy, the menu shows
`[HDeaf & TIMEOUT]`. So D-1792 **wrote** `u.HDeaf` TIMEOUT=2 (or made
a previously unused flat live). D-1791 had `HDeaf` falsy at those menus.

### C vs JS (starting points, not a finished write-trace)

C `wizcmds.c` `wiz_intrinsic` `:1029–1031`:

```c
case DEAF:
    make_deaf(newtimeout, TRUE);
    break;
```

C `timeout.c` `:752–757` expiry: `set_itimeout(&HDeaf, 1L); make_deaf(0L, TRUE);`.
C stores Deaf in **one** field (`HDeaf` ≡ `u.uprops[DEAF].intrinsic`).

JS `wiz_intrinsic` named-omits the DEAF special arm and uses generic
`incr_prop_timeout` + `Timeout for deafness set to 30.` JS
`nh_timeout` DEAF arm inlines a silent TIMEOUT clear and **does not**
call `make_deaf`. `prop_old_timeout` prefers the `HDeaf` flat over
`uprops[DEAF]`.

D-1792 added `set_itimeout_HDeaf` and the stoned/slime “Deaf bump”
(`if (HDeaf TIMEOUT in 1..4) set 5` — C `timeout.c:173/:433`). Those
arms print stoned/slime lines if they run; the first 555 seed4500
screens **match**, so a live Stoned/Slimed countdown is unlikely. The
next iter still **must dump** `u.HDeaf`, `u.uprops[DEAF]`, Stoned,
Slimed at screen 556 / T:97 and find the D-1792 write. Candidates:
`set_itimeout_HDeaf`, `sync_timeout_flats` + new `TIMEOUT_FLAT` rows,
the dedicated DEAF `--` arm, `Popeye` / luck (no RNG on this path —
stream is already full).

### Work packet

```text
Objective:        Must-fix seed4500 — wizintrinsic deafness [2]
C locus:          timeout.c nh_timeout + stoned/slime Deaf bump
                  wizcmds.c wiz_intrinsic :1029 make_deaf
                  potion.c make_deaf :442
JS locus:         js/timeout.js nh_timeout / set_itimeout_HDeaf
                  js/wizcmds.js prop_old_timeout / wiz_intrinsic
                  js/potion.js make_deaf
Symptom channel:  screen (menu [2]); RNG already full
Hypothesis:       D-1792 left HDeaf TIMEOUT=2 on a dual-storage flat
                  that C’s single uprops[DEAF] field does not have.
                  Menu reads the flat; status does not show Deaf.
C reads done:     make_deaf, wiz_intrinsic DEAF arm, nh_timeout DEAF
                  case, HDeaf macro, prop_old_timeout C :1003
Branch envelope:  restore C’s single-field Deaf timeout + menu display;
                  call make_deaf from wiz_intrinsic / expiry if that is
                  the write. Do not hide [2] in the menu painter.
Falsifier:        node frozen/ps_test_runner.mjs \
                    sessions/seed4500-knight-coverage.session.json
                  FAIL if any of screens 556/574/1092/1151/1167 still
                  differ on the deafness row
Focused verify:   seed4500 (RNG must stay 108275/108275)
Green gate:       CURRENT.md seed8000 + seed0900 + strict
Cohort:           wizard: seed2200 + seed0383 + seed0108 + strict
```

**Do not:** hide `[2]` with a seed4500 / menu special case; skip
`flush_screen(1)` (NOTES leftover); glue `region_dialogue` /
`sleep_dialogue` / `done_timeout`; “correct” luck to skip when
invulnerable; assume count-prefix `2` (JS count-prefix is still named
omit `DEFAULT_TIMEOUT_INCR=30`, and C never shows `[2]` here).

---

## What the overnight loop should have done

Playbook §2: while public FAILs exist, prefer the shared blocker over
Open map rows. After D-1795 broke seed0030, review **764** queued
`usleep` (D-1797). That Must-fix was real and **insufficient**. Cadence
audits then kept “Must-fix empty → Open `dochug` / … / `lava_effects`”
for ~20 denser TOP30 ports. Restore fortress before another Open cluster.

---

## Verify after each item

```bash
node frozen/ps_test_runner.mjs \
  sessions/seed8000-tourist-starter.session.json \
  sessions/seed0900-tourist-explore-actions.session.json
node scripts/strict-output-check.mjs \
  sessions/seed8000-tourist-starter.session.json \
  sessions/seed0900-tourist-explore-actions.session.json
```

Item 1 focused:

```bash
node frozen/ps_test_runner.mjs \
  sessions/seed0030-ten-diverse-deaths.session.json
```

Expect PASS RNG 105529/105529 Screen 1953/1953. If still FAIL, dump
**per-segment** RNG lengths (seg3 must be 9892/9892) before concatenating.

Item 2 focused:

```bash
node frozen/ps_test_runner.mjs \
  sessions/seed4500-knight-coverage.session.json
```

Expect PASS RNG 108275/108275 Screen 1814/1814.

After **both** items: full `node frozen/ps_test_runner.mjs sessions`
should be **44/44** (re-measure; do not invent). Then Open
`trap.c` `lava_effects` is allowed again.
