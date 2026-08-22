# Review 369 — fa039634 — spell.c spell_backfire (D-1409)

## Metadata
- Full / short hash: `fa0396349b329f28ab59ada4852b3e574492f2c6` / `fa039634`
- Parent: `5c71fc34` (D-1408). This file audits **this SHA only** (fifth of nine `js/` commits since review **364**). Archive **Addressed:** D-1409 `fa039634` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-22 13:11:06 +0200
- D-id: **D-1409**
- Stats: 9 files, +176 / −111 — `js/spell.js` +57 / −6 (`spell_backfire` + call from `spelleffects_check`). NOTES shrink is docs.
- Claims to close: Open `spell.c` `spell_backfire` (named from D-1408 / review **368**). Not peffects. `reviews/loop-2026-08-15/` has no unpaid backfire Must-fix.
- JS / map: `spell.js` `spell_backfire` / `spelleffects_check`. Callees `potion.js` `make_confused` / `make_stunned` (already live). `c-js-map/turns.md`. Remaining peffects / WAN_SPEED still named.
- Prior reviews this SHA claims to close: **368** named backfire after haste.

## Intent vs deliverable

Git subject promises: “Match C spell.c spell_backfire so a forgotten spell confuses or stuns via rn2(10) TIMEOUT increment, instead of only burning Pw.”

C `spell.c` `spell_backfire` `:1179–1217` from `spelleffects_check` `:1251–1260` **before** `u.uen -= rnd(*energy)`:

```
    duration = (spellev(spell) + 1) * 3; /* 6..24 */
    old_stun = (HStun & TIMEOUT); old_conf = (HConfusion & TIMEOUT);
    switch (rn2(10)) {
    case 0..3: make_confused(old_conf + duration, FALSE);           /* 40% */
    case 4..6: make_confused(old_conf + 2*duration/3, FALSE);
               make_stunned(old_stun + duration/3, FALSE);          /* 30% */
    case 7..8: make_stunned(old_stun + 2*duration/3, FALSE);
               make_confused(old_conf + duration/3, FALSE);         /* 20% */
    case 9:    make_stunned(old_stun + duration, FALSE);            /* 10% */
    }
```

Increments existing TIMEOUT (does not override). talk=FALSE. Stun increment is hypothetical: `rejectcasting` `:690–692` blocks `Stunned` before this check. Abort TIME; no `spelleffects` body. uen clamped at 0.

Old JS: twisted + nightmare plines + `rnd(energy)` debit; **no** `rn2(10)`.

The diff **does** add `spell_backfire` with the four `rn2(10)` arms and call it **before** the Pw debit. It does **not** port remaining peffects or WAN_SPEED. Named. It does **not** change `rejectcasting`.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `spell_backfire` | C `:1179–1217`, **wired** | |
| `spelleffects_check` forgotten arm | C `:1251–1260`, **wired** | backfire then `rnd(energy)` |
| `rn2(10)` | C, **imported live** | rng.js |
| `make_confused` / `make_stunned` | C `potion.c`, **imported live** | talk false |
| `spellev` | C, **already live** | `spl_book.sp_lev` |
| `HStun`/`HConfusion` TIMEOUT | C `prop.h:135`, **wired** | snapshot before switch |
| `rnd(energy)` | C, **already live** | after backfire |
| `rejectcasting` Stunned | C `:690–692`, **already live** | stun increment hypothetical |
| remaining peffects / WAN_SPEED | **named omit** | not this function |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** one `rn2(10)` per forgotten cast, **before** the existing `rnd(energy)`. Public fortress never casts a forgotten spell, so the extra die is public-unhit (would desync if a session did).

## C ↔ JS fidelity

Duration `(spellev+1)*3`. `sp_lev` 1..7 → 6..24. Match `:1183`. Snapshots `HStun&TIMEOUT` / `HConfusion&TIMEOUT` **before** the switch so mixed arms do not feed each other. Match `:1184`.

`rn2(10)` arms: 0–3 confuse +duration; 4–6 confuse `2*d/3` then stun `d/3`; 7–8 stun `2*d/3` then confuse `d/3`; 9 stun +duration. C `2L * duration / 3L` is left-to-right `(2*duration)/3`. JS `Math.trunc((2 * duration) / 3)` same for positive. `duration/3` truncates toward zero. Match `:1194–1214`. talk=FALSE so no “You stagger/feel less confused” from the increment. Match.

Callees are live `potion.c` ports (`itimeout` TIMEOUT field + sticky mirror), not stubs. `make_confused(xtime)` **sets** the timeout to `xtime` (C `set_itimeout`), and the argument is already `old + delta`, so this is increment-not-override. Match the 3.6.0 comment.

Caller: twisted + nightmare; `spell_backfire`; then `uen = max(0, uen - rnd(energy))`; botl; abort TIME. Match `:1252–1260`. Order **rn2 then rnd** is the keep-path RNG ledger. Previously JS burned only `rnd` — that was the omit.

`rejectcasting` still runs first (`:1236`). Stunned hero never reaches backfire, so case 7–9 stun bumps stay hypothetical as C says. Confuse increment is the real public-unhit path (confused heroes can still attempt a forgotten spell if `Confusion` does not reject). C `confused` local in `spelleffects_check` is unused for this abort. Match.

Hallucination check: “Match C `spell_backfire`” while **`make_confused`/`make_stunned` are imported live functions** is not a dispatch-stub lie. Do **not** stamp “Match C remaining peffects.” Do **not** stamp “Match C WAN_SPEED.” Do **not** stamp “forgotten stun is reachable while Stunned” (`rejectcasting` forbids it).

## Hallucinations / overclaim

Subject says a forgotten spell confuses or stuns via `rn2(10)` TIMEOUT increment instead of only burning Pw. **True on the keep-path** for the four arms and the debit-after-backfire order. **True that stun increment is hypothetical for a Stunned caster.** **False until named for sibling peffects / WAN_SPEED.** D-log “forgotten TIME+nightmare no haste; `rn2(10)` then `rnd(energy)` TIMEOUT matches all four arms; Confusion increment; uen clamp 0; Stunned second-cast reject” are the right falsifiers. Stamping **Addressed:** D-1409 for `:1179–1217` + the `:1254` call is fair. Do **not** treat fortress PASS as a forgotten-spell cast.

## Density

One C function plus the one-line caller C already had. ~50 lines of JS. Playbook §2b right size. Did not glue WAN_SPEED (next SHA). Did not rewrite `rejectcasting`.

## Branch-by-branch confirm

1. `spellknow>0`: no `rn2(10)`; body runs. Match.
2. Forgotten: two plines; `rn2(10)`; `rnd(energy)`; TIME abort; no haste body. Match.
3. `rn2` 0–3: confuse +duration only. Match 40%.
4. `rn2` 4–6: confuse 2d/3 then stun d/3. Match 30%.
5. `rn2` 7–8: stun 2d/3 then confuse d/3. Match 20%.
6. `rn2` 9: stun +duration. Match 10%.
7. Pre-existing confuse: TIMEOUT adds, does not replace. Match.
8. uen below `rnd(energy)`: clamp 0. Match.
9. Stunned: `rejectcasting` abort OK, no time, no backfire. Match.
10. **Public-unhit** until a session casts a forgotten spell.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Duration is `(spellev+1)*3`, not a recorded 6. Plain ESM.

## Verification

Journal: private canary **14**/14 (C/JS grep; forgotten TIME+nightmare no haste; `rn2(10)` then `rnd(energy)` TIMEOUT matches all four arms across seeds 1..80; Confusion increment; uen clamp 0; Stunned second-cast reject; D-1408 force haste; INVISIBILITY still omit; CURE_BLINDNESS live; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. Cadence full `sessions` runs at HEAD this audit.

## Actionable C-wrongs

None for Must-fix on **this** SHA. `spell_backfire` matches `:1179–1217` call-for-call (`rn2(10)`, snapshots, truncating `2d/3` / `d/3`, talk false) and the caller order matches `:1251–1260`.

Named omits (map / Open, not Must-fix):

1. remaining `spelleffects` peffects (DETECT_TREASURE / DETECT_MONSTERS / LEVITATION / RESTORE_ABILITY / INVISIBILITY)
2. `zap.c` `zapyourself` WAN_SPEED_MONSTER (already next Open after this SHA)

Do not Must-fix “override confuse instead of increment” (C 3.6.0 adds). Do not Must-fix “stun while Stunned” (`rejectcasting`). Do not Must-fix “debit Pw before `rn2`” (C backfire first). Do not Must-fix “float division for 2d/3” (C integer).

## Callers / RNG ledger

C forgotten abort: `rn2(10)` then `rnd(energy)`. JS same after this SHA (was `rnd` only). Public fortress never needs the new `rn2(10)`. `SPELL_LEV_PW` still sets `energy` before the test (C same) — that value is the `rnd` argument, not an extra die.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: forgotten spells now `rn2(10)`-increment confuse/stun TIMEOUT via live `make_confused`/`make_stunned` before `rnd(energy)` debit; remaining peffects and WAN_SPEED stay named.
- Must-fix stays empty for this SHA; archive **Addressed:** D-1409 `fa039634` already has the short hash.
