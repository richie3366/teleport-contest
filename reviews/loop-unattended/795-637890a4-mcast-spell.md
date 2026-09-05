# Review 795 — 637890a4 — mcastu.c mcast_spell remaining 14 arms (D-1825)

## Metadata
- Full / short hash: `637890a403016b2c7380503acda9719cf3ded93d` / `637890a4`
- Parent: `54f9b6df` (review 789 stamp). Map-driven Open `castmu` remaining arms.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-04 21:38:38 +0200
- D-id: **D-1825**
- Stats: `js/mcastu.js` +511/−82; `js/attrib.js` +50/−3; `js/wizard.js` +36/−2; `js/mhitu.js` +2/−1. `js/` insertions **599** >250. Band **80–450**.
- Claims to close: Open remaining 14 `mcast_*` / `touch_of_death` past `default:`. Not `buzzmu`.
- JS / map: `mcast_spell` dispatcher; `losestr`; `clonewiz`; `ureflects` empty-str. `c-js-map/turns.md`. Archive **Addressed:** D-1825 `637890a4`.

## Intent vs deliverable

Git subject promises: `castmu` `mcast_spell` `default:` zeroed dmg for 14 remaining cases; port those arms; `mcast_spell` dispatches and `mdamageu`s leftover dmg.

`node scripts/csym.mjs mcast_spell` → `mcastu.c:800–897`. `--callers mcast_spell`: `mcastu.c:298` (`castmu`). `touch_of_death` `:321–354`; `--callers`: `mcastu.c:398`, `uhitm.c:3863`. `losestr` `attrib.c:220–270` (caller `mcastu.c:481`). `clonewiz` `wizard.c:515–534` (caller `mcastu.c:415` only).

Parent: six live arms; `default:` dmg=0. The diff **does** add `mcast_spell` with all 20 cases, the 14 missing bodies, `death_inflicted_by`, exported `touch_of_death` / `losestr` / `clonewiz`, and the `ureflects` `""` pointer check. `castmu` now rolls dice + `Half_spell_damage` then one `mcast_spell` call.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `mcast_spell` | LIVE new dispatcher | C `:800–897` |
| `mcast_death_touch` / `touch_of_death` / `death_inflicted_by` | LIVE | C `:388–408` / `:321–354` / `:357–382` |
| `mcast_clone_wiz` / `clonewiz` | LIVE | `wizard.c:515–534`; `wizapp[]` 12 PMs match |
| `mcast_destroy_armor` / `destroy_arm` | LIVE callee | `do_wear.c:3276–3316` |
| `mcast_weaken_you` / `losestr` | LIVE | `attrib.c:220–270`; `rn1(4,3)` loop |
| `mcast_disappear` / `mcast_stun_you` / `mcast_paralyze` / `mcast_confuse_you` | LIVE | |
| `mcast_geyser` / `mcast_fire_pillar` / `mcast_lightning` | LIVE | floor `mon_spell_hits_spot` OMIT |
| `mcast_insects` | LIVE | `i <= quan`; `!enexto` return |
| AGGRAVATION / CURSE_ITEMS | LIVE | `aggravate` / `rndcurse` |
| `m_cure_self` / HASTE / PSI / OPEN_WOUNDS / BLIND / SUMMON | LIVE | pre-existing or extracted |
| `mon_spell_hits_spot` | OMIT named | fire-pillar / lightning floor |
| `has_aggravatables` | OMIT named | chooser, not the arm |
| `uhitm.c` `touch_of_death` | OMIT | C caller; JS `uhitm.js` unwired |
| `buzzmu` / AD_FIRE/COLD/MAGM / `cursetxt` | OMIT named | |

`node scripts/sym.mjs` (exports, not clone→import delete):

```
minuhpmax        js/attrib.js:282   sync
adjuhploss       js/attrib.js:293   sync
losestr          js/attrib.js:307   ASYNC — await required
clonewiz         js/wizard.js:181   sync
touch_of_death   js/mcastu.js:385   ASYNC — await required
destroy_arm      js/do_wear.js:2830   ASYNC — await required
aggravate        js/wizard.js:159   sync
rndcurse         js/sit.js:273   ASYNC — await required
ureflects        js/mhitu.js:2368   ASYNC — await required
mcast_spell      NOT EXPORTED — 1 LOCAL js/mcastu.js:686
```

`imports.mjs --can mcastu.js wizard.js clonewiz` / `attrib.js losestr` / `do_wear.js destroy_arm`: **ALREADY** static imports. FORCE/DIAG/`getRngLog`/`fastforward`/seed-in-control-flow: **none**. Rule #2: clean.

## C ↔ JS fidelity

**Dispatcher.** C switch zeros dmg except CURE/PSI/GEYSER/FIRE_PILLAR/LIGHTNING/PARALYZE/OPEN_WOUNDS, then `if (dmg) mdamageu`. JS `:696–748` same case order and leftover `mdamageu`. Directed dmg==0 impossible matches `:809–813`.

**Callee closure (14 new arms).** DEATH_TOUCH: C `:388–408` `!Antimagic && rn2(m_lev)>12` then Hallu vs `touch_of_death`; else shield + “Lucky”. JS `:418–437` same RNG. `touch_of_death` `:321–354` `50+d(8,6)`, drain `/2`, Upolyd `mh=0`/`rehumanize`, else `minuhpmax(3)`/`setuhpmax`/`adjuhploss`/`losehp`. JS `:385–415` same; extra `finish_losehp_done` is JS longjmp stand-in. CLONE_WIZ: `iswiz && no_of_wizards==1` → `clonewiz`. `clonewiz` `makemon(PM_WIZARD_OF_YENDOR)`, `rn2(2)` fake amulet, `wizapp[rn2(12)]` matches `wizard.c:52–56`. DESTROY_ARMOR: Antimagic field vs `destroy_arm()` itch — LIVE `rn2(4)+1` hits. WEAKEN: overwrites incoming dmg with `m_lev-6` then `losestr(rnd(dmg),…)`. DISAPPEAR / STUN (`d(DEX<12?6:4, 4)` then `HStun&TIMEOUT`) / CONFUSE (`HConfusion+m_lev`) match C line-for-line. GEYSER: pline + `d(8,6)` + `Half_physical_damage`; `#if 0` water_damage skipped in both. FIRE_PILLAR / LIGHTNING: `d(8,6)`, resist zeros dmg, `Half_spell_damage`, `destroy_items` / `ignite_items` / `flashburn(rnd(100))`; lightning `ureflects` early-return skips flashburn. `mon_spell_hits_spot` **OMIT** (after ignite / before flashburn). INSECTS: `mkclass(S_ANT)` else snakes; `quan = m_lev<2?1:rnd(m_lev/2)` then `quan<3→3`; **`for (i=0; i<=quan; i++)`** (quan+1) and **`return` on `!enexto`** match C `:662–664`. Hallu `bogusmon` uses `rn2_on_display_rng`. PARALYZE: C comment “dmg=1 not actual damage” is about `nomul`; C **still** returns dmg and `mcast_spell` `mdamageu`s it (`:745–768` + `:896–897`). JS same — do not “fix” by zeroing. AGGRAVATION/CURSE_ITEMS: C always `You_feel` + `aggravate`/`rndcurse`; `has_aggravatables` is chooser-only (OMIT).

**castmu envelope.** Dice `d(ml/2+damn, damd)` then `Half_spell_damage` then dispatch — matches C `castmu` before `:298`. Fumble `rn2(ml*10)` unchanged. `cursetxt` still named.

No STUB in a shipped arm. Named OMITs only.

## Hallucinations / overclaim

“Match C remaining 14 arms” is a **dispatch + body** claim; callees are LIVE or named OMIT, not stubbed. Do **not** stamp `mon_spell_hits_spot`, `has_aggravatables`, `buzzmu`, or `uhitm.c:3863` `touch_of_death`. Do **not** treat 44/44 as proof of Wizard Double Trouble. Vacuous hidden verify is **not** a corpus PASS.

## Density

§2b: one `mcast_spell` switch remainder. +599 is large but one C function family; did **not** glue `buzzmu` or medusa loaders. Right size.

## Verification

This audit: `node scripts/hidden-proxy.mjs verify castmu --base 637890a4~1` → `0 session(s) blocked` / `no corpus session is blocked on it`. Queue row did **not** cite N corpus blocks (remaining-arm Open). D-log green + cohort; skip full (no shared file). Cadence this iter: 44/44.

## Actionable C-wrongs

None that must block the next port. Named: `mon_spell_hits_spot`; `has_aggravatables`; `uhitm` death-touch caller; `cursetxt`; `buzzmu`; AD_FIRE/COLD/MAGM.

Verdict: **ACCEPT-WITH-DEBT**
