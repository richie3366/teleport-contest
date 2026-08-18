# Review 184 — 7b0f9da7 — do.c `revive_corpse` `Soundeffect(se_scratching)` (D-1222)

## Metadata
- Full / short hash: `7b0f9da743d35a3eb8157c47c50362c558d6893e` / `7b0f9da7`
- Parent: `c416301b` (loop-continue docs; JS parent of the port is `c7071a4a` D-1221). This file audits **this SHA only**. Archive row **Addressed:** D-1222 `7b0f9da7` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 18:43:17 +0200
- D-id: **D-1222**
- Stats: 15 files, +448 / −92 — `js/do.js` +13 / −3; new `js/sndprocs.js` +22; new `js/generated/seffects_data.js` +202; `scripts/extract-seffects.py` +62; `js/timeout.js` comment.
- Claims to close: Open `do.c` `revive_corpse` `Soundeffect` se_scratching (named from D-1081 / D-1202 / D-1212 / review **174** / **182**). Not BURIED pit. `reviews/loop-2026-08-15/` has no unpaid Soundeffect Must-fix.
- JS / map: `do.js` buried hear arm; `sndprocs.js` empty `Soundeffect`; extracted `se_scratching=145`. `c-js-map/data.md`. Other Soundeffect sites / unique pname `corpse_xname` still named.
- Prior reviews this SHA claims to close: **182** named “Next Open is that Soundeffect”; **182** also said do **not** Must-fix a silent no-op — this SHA is the queued Open row, not a Must-fix peel.

## Intent vs deliverable

Git subject promises: “Match C do.c revive_corpse so a buried nearby You_hear is preceded by Soundeffect(se_scratching, 50), using the contest-empty sndprocs macro and extracted se_scratching enum.”

C `OBJ_BURIED` hear arm (`do.c:2229–2231`): `Soundeffect(se_scratching, 50);` then `You_hear("scratching noises.");`. Contest recorder has no `SND_LIB_*`, so `sndprocs.h:272` `#define Soundeffect(seid, vol)` is **empty**. The call still exists in C; arguments are constants (no RNG).

The diff **does** insert that call before `You_hear`, extract `seffects.h` into `js/generated/seffects_data.js` (`se_scratching = 145`, `number_of_se_entries = 198`), and add an empty `Soundeffect(seid, vol)`. It does **not** wire other `Soundeffect` sites. Named.

The diff does **not**: play audio; branch on Deaf/`iflags.sounds`; call `Hero_playnotes` / `SoundAchievement`; put `Soundeffect` on the cansee claw arm (C has none there); change `is_zomb` / FALLTHROUGH. Review **182**’s silent-break fix stays.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `Soundeffect` | C macro, **empty** on contest build | JS no-op `void seid; void vol;` |
| `se_scratching` | C enum `seffects.h` | extracted 145; first `air_crackles`, last `zap_then_explosion` |
| `se_zero_invalid` / `number_of_se_entries` | C enum fenceposts | 0 / 198 |
| `extract-seffects.py` | generator, **not scored** | `scripts/` + `js/generated/` (D-0477 pattern) |
| buried hear arm | C site `:2230`, **wired** | before `You_hear`; `dist2 < 25` unchanged |
| other `Soundeffect(...)` | C callees, **named omit** | not this SHA |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates in scored `js/`. The extractor uses Python `pathlib` in `scripts/` (not scored). Rule #2 clean.

## C ↔ JS fidelity

Pinned C (`do.c:2217–2234` + `sndprocs.h:266–272`):

```
                } else if (mdistu(mtmp) < 5*5) {
                    Soundeffect(se_scratching, 50);
                    You_hear("scratching noises.");
                }
                fill_pit(mtmp->mx, mtmp->my);
```

Contest: `#else /* NO SOUNDLIB */` → `#define Soundeffect(seid, vol)`. Expands to nothing. No `rn2`. Order is still Soundeffect then You_hear then `fill_pit`.

JS (`do.js:2587–2594`): `dist2 < 25` ≡ `mdistu < 5*5`; `Soundeffect(se_scratching, 50); await You_hear('scratching noises.');` then `fill_pit`. Match order. The JS function is a **C callee** of an empty macro, not a fake audio engine.

Enum: `sndprocs.h` `se_zero_invalid = 0`, then `seffect()` X-macro, then `number_of_se_entries`. `seffects.h` first row `air_crackles`, `scratching` is the 145th `seffect()`, last `zap_then_explosion`. Generated file matches (145 / 198). Extractor refuses a different first/last basename. Match.

`se_scratching` is only **re-exported** from `sndprocs.js` (plus fenceposts). Other 196 names live in `generated/` unused. That is table extract, not a stub of `se_roar`. Call-site identity is the enum value C would pass into a no-op.

C `include/sndprocs.h` enum is `se_zero_invalid = 0`, then `#define seffect(name) se_##name` + `#include "seffects.h"`, then `number_of_se_entries`. JS `export const se_${name} = i` for `i` in 1..197 plus fenceposts. The extractor skips `#` lines and requires first=`air_crackles` last=`zap_then_explosion`. That is the D-0477 pattern (`js/generated/` embed so scored ESM never `readFileSync`s `include/`).

Callers of buried revive: `timeout.js` `revive_mon` → `revive_corpse` (comment-only change this SHA). `zombify_mon` can chain to `revive_mon`. The hear arm is only `OBJ_BURIED` + `is_zomb` + `!cansee` + `mdistu < 25`. `Soundeffect` is **before** `You_hear` so a future live sndlib would play then print, like C. Empty today: no extra `--More--`, no RNG, no topline.

Grep of scored `js/` after this SHA: the only `Soundeffect(` call is this hear arm. C has many more (doors, `se_crash`, `se_squeak`, …). Named. Do not invent a Must-fix “wire se_alarm.”

No new RNG. `You_hear` still runs. `fill_pit` still only in the zomb arm (D-1220 FALLTHROUGH unchanged).

Pinned empty macro (`sndprocs.h:266–272`):

```
#else  /*  NO SOUNDLIB IS INTEGRATED AFTER THIS */
...
#define Soundeffect(seid, vol)
#define Hero_playnotes(instrument, str, vol)
```

JS `void seid; void vol;` is the empty expansion, not a `sound_soundeffect` function pointer. The integrated branch (`:209–214`) would call `soundprocs.sound_soundeffect` when `iflags.sounds && !Deaf`. Contest recorder is the `#else`. Porting the integrated `do { ... } while(0)` would be a C-wrong for this build (would need `iflags.sounds` and a proc table the contest never links).

`seffects.h:15` `seffect(air_crackles)`, `:159` `seffect(scratching)`, `:211` `seffect(zap_then_explosion)`. 145 is 1-based index after `se_zero_invalid`. Match generated `se_scratching = 145`.

## Hallucinations / overclaim

Subject + D-1222 say the nearby hear arm is preceded by `Soundeffect(se_scratching, 50)` using the **contest-empty** macro. That is honest: they did **not** claim a playing sound library. This is **not** “Match C dispatch, callee is a stub of a live audio hook.” C’s callee is empty here. Stamping **Addressed:** D-1222 is fair. Do **not** stamp “Match C every `Soundeffect` site” or “Match C `SND_LIB_INTEGRATED` Play_usersound.”

Review **182** warned not to Must-fix a silent no-op. This SHA is the named Open row that **is** that no-op, matching pinned C. Queue-faithful, not a Must-fix sneak.

## Density

One C call site + the enum it needs (D-0477 embed). The 202-line generated file is data, not a second subsystem. `timeout.js` is a comment only. Did not glue unique `corpse_xname` or other Soundeffect sites. Slightly thin on logic, right size for the named row. Not half of `sounds.c`.

## Branch-by-branch confirm

1. Buried zomb, `cansee`: pit, claw, `newsym`, `fill_pit`. **No** Soundeffect (C `:2220–2228` has none). Match.
2. Buried zomb, `!cansee`, `dist2 < 25`: Soundeffect then You_hear then `fill_pit`. Match. Empty macro: no RNG, no extra `--More--`.
3. Buried zomb, `!cansee`, `dist2 >= 25`: neither Soundeffect nor You_hear. Match.
4. Buried non-zomb success: FALLTHROUGH `impossible` (D-1220). No Soundeffect. Match.
5. `revive()` failure: return before switch. Match.
6. Floor/invent/minvent/contained: unchanged. Match.
7. `se_scratching === 145`. Match X-macro index.
8. `Soundeffect` arguments unused. Match empty `#define`.
9. `se_zero_invalid === 0`, `number_of_se_entries === 198`. Match C fenceposts (197 seffects + invalid).
10. Extractor run is not in this SHA’s handoff (generated file is committed). Regenerating later must keep 145.
11. `timeout.js` `revive_mon` does not call Soundeffect itself. Match C (`Soundeffect` lives in `revive_corpse`, not `revive_mon`).
12. Deaf / `iflags.sounds`: empty macro ignores both. Match contest C (no `SND_LIB_INTEGRATED` branch).

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Generated embed is the Rule #2-legal way to carry `seffects.h`. Do not `readFileSync` `dat/` or `include/` from scored code — they did not.

## Verification

Journal: private canary **12**/12 (hear arm call-before-You_hear; cansee skips Soundeffect; dist≥25 silent; empty macro no RNG; enum 145; FALLTHROUGH untouched); green+strict seed8000/0900; cohort **5**/5 + strict 1500/1800/0012/0004/0007. **Public-unhit** unless a buried zombie revives off-screen within 5. Admit that. Cadence this audit: fortress **44**/44 (this SHA does not burn positional RNG).

## Actionable C-wrongs

None for Must-fix. Empty `Soundeffect` **is** C for this build.

Named omits (map, not Must-fix):

1. Other `Soundeffect(seid, vol)` call sites (dig, doors, etc.)
2. Unique/pname `corpse_xname` adjective on revive plines
3. `SND_LIB_INTEGRATED` live `soundprocs.sound_soundeffect` (contest has none)

Do not Must-fix “implement PortAudio.” Do not skip the empty call on a later peel (order is C even when empty).

## Callers / RNG ledger

C `Soundeffect` at `do.c:2230` is the only site this SHA ports. `mdistu` is squared distance; JS `dist2`. No `rn2` in the macro or the JS function. `You_hear` may already `--More--` (pre-existing). `fill_pit` may already RNG (pre-existing D-1202 zomb arm). This SHA adds zero positional RNG. Public buried-revive is rare; fortress held because the call is a no-op.

`seffects.h` X-macro is include-only data. Contest `config` has `SND_LIB_PORTAUDIO` false (`extract-optlist`). Shipping a playing backend would be a different cluster and would violate “contest-empty.”

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: the buried nearby hear arm now calls contest-empty `Soundeffect(se_scratching, 50)` before `You_hear` with a faithful extracted enum; other Soundeffect sites stay named.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1222 `7b0f9da7`.
