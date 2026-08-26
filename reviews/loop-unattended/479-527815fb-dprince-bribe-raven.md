# Review 479 — 527815fb — makemon.c dprince MS_BRIBE / raven BEC_DE_CORBIN (D-1518)

## Metadata
- Full / short hash: `527815fbb06b9830899594729af255a34b63da78` / `527815fb`
- Parent: `8bfe0bc8` (D-1517). This file audits **this SHA only** (sixth of nine `js/` commits since review **473**). Archive **Addressed:** D-1518 `527815fb`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-26 02:38:34 +0200
- D-id: **D-1518**
- Stats: 9 files, +117 / −36 — `js/makemon.js` +28 / −3. Band 150–350 (js/ insertions 28).
- Claims to close: Open `makemon.c` dprince MS_BRIBE / raven `BEC_DE_CORBIN` (named from D-1517). Not emin. `reviews/loop-2026-08-15/` has no unpaid bribe-prince Must-fix.
- JS / map: `makemon.js` `makemon` after byyou/`in_mklev` sleep. `c-js-map/data.md`.
- Prior reviews this SHA claims to close: map omit after D-1092 mlet peace; D-1517 named this as next Open.

## Intent vs deliverable

Git subject promises: MS_BRIBE demon princes spawn peaceful and invisible (hostile if Excalibur or Demonbane is wielded) and ravens with a bec de corbin spawn peaceful.

Pinned C `makemon.c` `makemon` `:1397–1404`, after `in_mklev` sleep / `byyou` `newsym`+`set_apparxy`, **before** LONG_WORM. `is_dprince(ptr) && ptr->msound == MS_BRIBE` → `mpeaceful = minvis = perminvis = 1`, `mavenge = 0`; then if `u_wield_art(ART_EXCALIBUR) || u_wield_art(ART_DEMONBANE)` → `mpeaceful = mtame = FALSE` (invis **kept**). Independent `if (mndx == PM_RAVEN && uwep && uwep->otyp == BEC_DE_CORBIN) mpeaceful = TRUE`. `set_malign` follows. `is_dprince` `mondata.h:141` `is_demon && is_prince`. `u_wield_art` `obj.h:441` → `is_art(uwep, art)` `artifact.c:2808–2813` (`oartifact == art`). `MS_BRIBE = 33` `monflag.h:48`. Bribe princes: Geryon/Dispater/Baalzebub/Asmodeus. Orcus is `MS_ORC` + prince; Demogorgon is not this msound.

Old JS: jumped to LONG_WORM then `set_malign`. `M2_HOSTILE` + `peace_minded` left them angry.

The diff **does** insert both `if`s with live `is_dprince` and a local `u_wield_art` (cannot import `artifact.js`: artifact → display → mkobj → makemon). It **does not** port emin/angel roaming (`:1414–1424`). Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| dprince MS_BRIBE block | C `:1397–1402`, **LIVE this SHA** | |
| raven BEC_DE_CORBIN | C `:1403–1404`, **LIVE this SHA** | |
| `is_dprince` | C `mondata.h:141`, **LIVE** | `monsters.js:830` |
| `u_wield_art` | C `obj.h:441`, **CLONE this SHA** | 5th local; matches `is_art` |
| `is_art` | C `:2808`, **LIVE in artifact.js** | not imported here |
| `MS_BRIBE` | C `monflag.h:48` `=33`, **CLONE this SHA** | local const |
| `ART_EXCALIBUR` / `ART_DEMONBANE` | C artilist 1 / 12, **LIVE** | generated |
| `set_malign` | C, **LIVE** | after this block |
| emin/angel roaming | C `:1414`, **OMIT named** | |

`node scripts/sym.mjs is_dprince u_wield_art is_art set_malign MS_BRIBE`:

```
is_dprince       js/monsters.js:830   sync
u_wield_art      NOT EXPORTED — 5 LOCAL CLONE(S):
               js/apply.js:3516  js/artifact.js:477  js/makemon.js:466
               js/minion.js:76  js/sit.js:220
             => Do NOT write clone #6.
is_art           js/artifact.js:1586   sync
set_malign       js/makemon.js:483   sync
MS_BRIBE         NOT FOUND in js/** (no export, no local function/const).
```

`MS_BRIBE` is `const MS_BRIBE = 33` in `makemon.js` (indexer misses a non-exported const). `u_wield_art` clone #5 is the allowed cycle pattern; body is `uwep && oartifact === art`, same as C `is_art` and `artifact.js` `u_wield_art`. **Verified CLONE.** Do not import artifact.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** none. **Public-unhit** until a bribe prince or raven-with-bec spawn.

## C ↔ JS fidelity

Placement. After `in_mklev` sleep / `else if (byyou) newsym`, before LONG_WORM, then `set_malign`. **Match `:1387–1404` then malign.** JS byyou still omits `set_apparxy` (pre-existing, not this SHA).

Dprince. C chained `mpeaceful = minvis = perminvis = 1` then `mavenge = 0`. JS the same (`= 1` is 1, not boolean `true`, which still tests truthy). Wield Excalibur **or** Demonbane: `mpeaceful = mtame = 0`; does **not** clear invis. **Match.** `is_dprince` is live `is_demon && is_prince`. **Match `:141`.** `ptr.msound === 33`. Extracted `msounds[]` for those four princes is 33 (D-1053). Orcus/Demogorgon/amorous demon fail the conjunct. **Match canary.**

`u_wield_art`. C `is_art(uwep, art)` TRUE iff `obj && oartifact == art`. JS clone the same. **Match `:2808–2813`.** Does not require otyp to match the artifact base (C doesn’t either).

Raven. Independent `if`; needs `uwep` and `otyp == BEC_DE_CORBIN`. Bat / long-sword do not. **Match `:1403–1404`.** Does not require the raven to be a dprince. **Match.**

Callee closure. LIVE: `is_dprince`, `set_malign`, generated ART_ ids, `otyp('BEC_DE_CORBIN')`. CLONE: `u_wield_art` / `MS_BRIBE=33` matched here. OMIT named: emin. STUB: none. **Arm may ship.** Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject peace+invis for MS_BRIBE princes, hostile if Excalibur/Demonbane, raven+bec peace: **true**. D-log four bribe princes / Orcus not / keep invis when hostile: **true of the canary**. Stamping **Addressed:** D-1518 for **`:1397–1404`** is fair. Do **not** stamp “Match C `newemin`.” Do **not** stamp “imported `artifact.js` `u_wield_art`.” Do **not** treat fortress PASS as a hell-court bribe (public-unhit). This is **not** “dispatch ported, callee stubbed.”

## Density

+28 JS: two C `if`s + cycle clone. Playbook §2b C-small. Did not glue emin. Acceptable. Fifth `u_wield_art` body is cycle cost.

## Branch-by-branch confirm

1. Geryon/Dispater/Baalzebub/Asmodeus, no those arts: peace+invis, `mavenge=0`. **Match.**
2. Same + Excalibur or Demonbane: hostile+untame, **still invis**. **Match.**
3. Mundane long sword: still peace. **Match** (`u_wield_art` false).
4. Orcus / Demogorgon: skip this `if`. **Match.**
5. Raven + bec: `mpeaceful=1`. **Match.**
6. Raven + other weapon / bat + bec: no. **Match.**
7. Then LONG_WORM then `set_malign`. **Match order.**
8. emin roaming still omitted. Named.
9. **Public-unhit** until those spawns.

## Callers / RNG ledger

C: `makemon` itself. No new `rn2`. Hell unique `G_NOGEN` until the corresponding special.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No fs. No FORCE. Cycle clone documented.

## Verification

D-log: private canary **21**/21 (four bribe princes peace+invis; Orcus/Demogorgon/amorous not; Excalibur/Demonbane hostile+untame keep invis; mundane long sword still peace; raven+bec peace, bat/long-sword not); green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** until a bribe prince or raven-with-bec. Cohort is shared-startup. Honest.

## Actionable C-wrongs

None. Remaining **named** (map / Open): emin/angel roaming after worm. Do not Must-fix “import `is_art`” (cycle). Do not Must-fix “should clear invis when hostile” (C keeps it).

Verdict: **ACCEPT-WITH-DEBT**
