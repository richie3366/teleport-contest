# Review 378 — e611ef84 — spell.c spelleffects SPE_DETECT_MONSTERS peffects (D-1418)

## Metadata
- Full / short hash: `e611ef8445e8cee433d05319e061e9d9318fa13b` / `e611ef84`
- Parent: `e78d7780` (D-1417). This file audits **this SHA only** (fifth of nine `js/` commits since review **373**). Archive **Addressed:** D-1418 `e611ef84` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-22 19:02:41 +0200
- D-id: **D-1418**
- Stats: 13 files, +361 / −166 — `js/potion.js` +95; `js/spell.js` +19; `js/detect.js` +25; `js/timeout.js` +13; journal rotate is docs.
- Claims to close: Open `spell.c` `spelleffects` SPE_DETECT_MONSTERS peffects (named from D-1417). Not LEVITATION. `reviews/loop-2026-08-15/` has no unpaid detect-monsters Must-fix.
- JS / map: `spell.js` `spelleffects`; `potion.js` `peffect_monster_detection`; `detect.js` `monster_detect`; `timeout.js` DETECT_MONSTERS expiry. `c-js-map/turns.md`. Cursed wake / blessed WIN_MAP / worm segs still named.
- Prior reviews this SHA claims to close: **377** named DETECT_MONSTERS after treasure.

## Intent vs deliverable

Git subject promises: “Match C spell.c spelleffects SPE_DETECT_MONSTERS so casting that spell detects monsters via peffects/monster_detect (or a blessed timeout), instead of printing Nothing happens.”

C `spell.c` `:1534–1546` same skilled-bless + peffects arm as haste/treasure. Callee `potion.c` `peffect_monster_detection` `:914–952`: blessed `incr_itimeout(&HDetect_monsters)` — `rn1(40,21)` SPBOOK else `rn2(100)+100`, or 1 if `(HDetect_monsters & TIMEOUT) >= 300`; unmap `GLYPH_INVISIBLE`; `MON_AT` clears `potion_unkn`; `!u.uswallow && !Underwater` (`youprop.h:279` `u.uinwater`) → `see_monsters` then `You_feel("lonely.")` if still unkn, return 0. Else / unblessed: `monster_detect(otmp,0)` then `exercise(A_WIS,TRUE)`; empty returns 1. `detect.c` `monster_detect` `:816–821`: empty + otmp → `strange_feeling` hallu `"You get the heebie jeebies."` else `"You feel threatened."`. `timeout.c` `:932–934` expiry `see_monsters()`.

Old JS: SPE_DETECT_MONSTERS still other-otyp `Nothing happens.`; `monster_detect` voided otmp on empty.

The diff **does** add the otyp to the skilled-bless arm, port `peffect_monster_detection` (timeout + lonely vs `monster_detect`), empty `strange_feeling`, and DETECT_MONSTERS expiry `see_monsters`. It **does not** port cursed wake / blessed `display_nhwindow(WIN_MAP)` persist / `unconstrain_map` / worm segs. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `spelleffects` SPE_DETECT_MONSTERS | C `:1534–1546`, **wired** | skilled bless then peffects |
| `peffect_monster_detection` | C `:914–952`, **wired** | |
| `incr_itimeout HDetect_monsters` | C, **wired** | TIMEOUT bits; uprops sync |
| `rn1(40,21)` / `rn2(100)+100` | C, **imported live** | SPBOOK vs potion |
| `see_monsters` | C, **imported live** | blessed non-swallow |
| `You_feel("lonely.")` | C `:944`, **wired** | if potion_unkn |
| `monster_detect` empty | C `:816–821`, **wired** | strange_feeling |
| `timeout` DETECT_MONSTERS | C `:932–934`, **wired** | `see_monsters` |
| cursed wake / WIN_MAP / worms | C, **named omit** | |
| LEVITATION siblings | C same arm, **named omit** | this SHA |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** blessed SPBOOK `rn1(40,21)` = `rn2(40)+21` (21..60); potion `rn2(100)+100` (100..199); already-TIMEOUT>=300 burns **no** extra `rn2`. Unblessed empty: no new dice. Found-monsters `exercise(A_WIS,TRUE)` may `rn2(19)`. Public fortress never casts this.

## C ↔ JS fidelity

Spell arm matches `:1539–1546` for this otyp (unskilled unblessed → map browse, no timeout; skilled blessed → timeout). `Underwater` is `u.uinwater` — JS `(u.uinwater | 0)` matches `:279`. Swallow/underwater blessed **falls through** to `monster_detect`. Match `:940–951`.

Dice: `rn1` is `rn2(x)+y`. TIMEOUT>=300 → i=1, no roll. Match `:923–928`. Unmap invisible + `m_at` clears unkn. Match the nested loops (`x=1..COLNO-1`, `y=0..ROWNO-1`). Lonely only if unkn after `see_monsters`. Match.

Empty `monster_detect`: hallu heebie jeebies vs threatened; crystal-ball `otmp==null` skips strange_feeling. Match `:816–821`. Presence path already live (D-0370); cursed wake still named (helpless monsters stay asleep).

Expiry: when TIMEOUT bits hit 0, `see_monsters()`. Match `:932–934`. Other timeout-switch arms still silent. Named.

`Detect_monsters()` here ORs H/E **and** `uprops[DETECT_MONSTERS]` — closer to C `H\|\|E` than review **374**’s `knowninvisible` See_invisible clone. Conferral-only detect-monsters gear is rare; not a keep-path lie for the potion/spell TIMEOUT this SHA writes via `set_HDetect_monsters`.

Hallucination check: “Match C peffects/monster_detect/timeout” while **`incr_itimeout`, `monster_detect` map, and `see_monsters` expiry are live** is not a dispatch-stub lie. “Match C cursed `monster_detect` wake” **would** be. Do **not** stamp “Match C blessed WIN_MAP persist.” Do **not** stamp “Match C SPE_LEVITATION.”

## Hallucinations / overclaim

Subject says casting detect monsters maps via `monster_detect` or a blessed timeout instead of `Nothing happens.` **True for unskilled (browse) and skilled (TIMEOUT 21..60, lonely if no MON_AT).** **True that empty unblessed threatened/heebie + potion useup once.** **False until named for cursed wake and persistent WIN_MAP.** Stamping **Addressed:** D-1418 for `:914–952` + `:1534–1546` + expiry is fair. Do **not** treat fortress PASS as a detect-monsters cast.

## Density

One C peffect plus the empty `monster_detect` arm and the expiry the timeout needs. ~110 lines of JS. Playbook §2b. Did not glue LEVITATION. Right size.

## Branch-by-branch confirm

1. Unskilled, live fmon: `monster_detect` browse; no TIMEOUT; WIS exercise. Match.
2. Unskilled, empty: threatened / heebie; return 1; no TIMEOUT. Match.
3. Skilled, not swallow/water: `rn1(40,21)`; `see_monsters`; lonely iff no MON_AT. Match.
4. Skilled, already TIMEOUT>=300: i=1, no `rn2`. Match.
5. Blessed + swallow: fall through `monster_detect`. Match.
6. POT_MONSTER_DETECTION unblessed vs blessed potion `rn2(100)+100`. Match SPBOOK vs potion split.
7. Expiry: `see_monsters`. Match.
8. Cursed wake / WIN_MAP / worms. Named.
9. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Dice are C `rn1`/`rn2`, not a recorded index. Plain ESM.

## Verification

Journal: private canary **22**/22 (C/JS grep; unskilled empty threatened no timeout; skilled empty lonely TIMEOUT 21..60; unskilled presence browse; skilled presence timeout no browse; POT empty useup; blessed potion 100..199; null detector; hallu heebie; nh_timeout expiry; LEVITATION still omit; TREASURE/HASTE regression; Rule #2). green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD (score rewrite at end of this review iter). Fortress PASS is not detect monsters.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Blessed timeout vs unblessed `monster_detect` matches `:914–952`; empty strings match `:818–820`.

Named omits (map / Open, not Must-fix):

1. cursed-otmp `monster_detect` wake (`msleeping`/`mfrozen`)
2. blessed persistent `display_nhwindow(WIN_MAP)`
3. `unconstrain_map` / worm `detect_wsegs` / pet glyphs
4. SPE_LEVITATION / RESTORE_ABILITY / INVISIBILITY (already Open)
5. potionhit / mix monster-detection

Do not Must-fix “skilled empty should threatened” (C lonely+timeout, no `monster_detect`). Do not Must-fix “unskilled should `incr_itimeout`” (C unblessed skips that). Do not Must-fix “dispatch is a stub.”

## Callers / RNG ledger

C callers: `spelleffects` SPE_DETECT_MONSTERS; `dopotion` POT_MONSTER_DETECTION. New RNG: blessed duration only. Public fortress does not cast this.

Verdict: **ACCEPT-WITH-DEBT**
