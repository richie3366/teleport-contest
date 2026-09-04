# Review 764 — efcb3fd4 — mhitu.c mattacku remaining + getmattk (D-1795)

## Metadata
- Full / short hash: `efcb3fd41f68ec253926fb2510ba45ef312f2aff` / `efcb3fd4`
- Parent: `22bc5c1e` (D-1794). Map-driven Open. No prior QUALITY-RISK on this locus.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-04 01:00:52 +0200
- D-id: **D-1795**
- Stats: `js/mhitu.js` +209/−27; `js/mhitm.js` +76/−25; `js/objnam.js` +32; `js/do_name.js` +10/−1; makemon/trap exports. Total `js/` insertions **329** (>250 → ceiling **450**). Band **80–350**.
- Claims to close: Open `mhitu.c` `mattacku` remaining body + `getmattk` substitutions. Not `hitmu`.
- JS / map: `mhitu.js` `mattacku`; `mhitm.js` `get_mattk`; helpers `m_monnam` / `simple_typename` / `mimic_obj_name` / `ceiling` / `is_home_elemental`. `c-js-map/turns.md`.
- Archive **Addressed:** D-1795 `efcb3fd4` — stamp is the remaining body; **nomul/unmul vs `usleep` is not C.**

## Intent vs deliverable

Git subject promises: Match C `mhitu.c` `mattacku` remaining body so hidden/mimic/`getmattk` substitutions, Snickersnee `hitval`, AT_ENGL flush, and `bot`/sleep actually run, instead of skipping them after the attack-type switch.

`node scripts/csym.mjs mattacku` → `mhitu.c:490–952`. `getmattk` `:309–444`. `calc_mattacku_vars` `:448–463`. `--callers mattacku`: `monmove.c:954/:971`, `dogmove.c:911/:1286`, `priest.c:202`, `shk.c:4900`, `worm.c:359`. `getmattk` callers `:786` (here), `mhitm.c:383`, `uhitm.c:5441/:5463`. `nomul` `hack.c:4160–4173` (caller `:512–513`). Sleep-wakeup `:939–943`.

Parent: attack-type switch without those gates; `get_mattk` only `mspec_used` + lich cold; `hitval(wep, null)`. The diff **does** add Underwater / undetected / mimic / Invis `tmp-=2` / eel vis / prayer / DISE→STUN / DREN / cancelled WEAP→PHYS / home-elemental / Snickersnee / `flush_screen(1)` / `bot` / `rn2(10)`. Subject’s *control flow* is delivered. **The sleep arm is live against a `usleep` C clears and JS never does.**

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `mattacku` | LIVE repaired | remaining C body |
| `get_mattk` | LIVE repaired | `prev_result` + else-if order |
| `hitmu` | LIVE local | C `staticfn` `mhitu.c:1143–1267` — **not** clone #2; remaining ads named |
| `m_monnam` | LIVE new | `do_name.c:1108–1113` |
| `simple_typename` / `mimic_obj_name` | LIVE new | `objnam.c:296–308` / `:5605–5615`; lock.js clone remains |
| `is_home_elemental` | LIVE export | `makemon.c:32–50`; mon.js / teleport.js clones remain |
| `ceiling` | LIVE export | `dungeon.c:1713–1747`; vault/shop `in_rooms` named |
| `bot` / `flush_screen` | LIVE | display.js; bot is status, **no RNG** |
| `nomul` / `unmul` | **STUB vs C on `usleep`** | live callee of this function (`:512`) |
| `hitval(..., youmonst)` | LIVE call | vs-mon blessed/spear/trident/pick still named |
| SEDUCE=0 `c_sa_no` | OMIT named | |
| `uhitm` `hmonas` `prev_result` | OMIT named | |

`node scripts/sym.mjs` (clone → import):

```
mattacku         js/mhitu.js:2770   ASYNC
get_mattk        js/mhitm.js:339   sync
m_monnam         js/do_name.js:701   sync
simple_typename  js/objnam.js:2760   sync  + lock.js:924 clone — do NOT add another
mimic_obj_name   js/objnam.js:2775   sync
is_home_elemental js/makemon.js:496   sync  + mon.js:1422 / teleport.js:2779 — do NOT add #4
ceiling          js/trap.js:2978   sync
nomul            js/hack.js:966   sync
unmul            js/hack.js:1019   ASYNC
hitval           js/weapon.js:191   sync
spec_abon        js/artifact.js:1724   sync
hitmu / summonmu C staticfns, local in mhitu.js (the real functions)
```

`--can mhitu.js do_name.js m_monnam`: **ALREADY**. `--can mhitu.js objnam.js mimic_obj_name`: **ALREADY**. `--can mhitu.js trap.js ceiling`: **ALREADY**. `--can mhitm.js makemon.js is_home_elemental`: **ALREADY**. FORCE/DIAG/`getRngLog`/`fastforward`/seed-in-control-flow: **none**. Rule #2 **clean**.

## C ↔ JS fidelity

**Pre-loop (`:512–764`) — match except sticky fields.** `!ranged` → `nomul(0)`. Dead → 1. `Underwater`=`u.uinwater` (`youprop.h:279`) non-swimmer → 0. Swallow only `ustuck`; pin mux/muy; invulnerable stomach → 0. Steed: `rn2(is_orc?2:4)` then `mattackm`. Undetected ceiling/surface + `m_monnam`; `#monster` mimic; object-mimic + `mimic_obj_name`. AC `+ m_lev`, helpless `+4`, `(Invis && !perceives) \|\| !mcansee` `tmp-=2`, trapped `-=2`, clamp 1. Eel `minvis`. `summonmu`. Prayer `uinvulnerable` plines → 0. `find_offensive`. **Match C’s `if`s as written.**

**`getmattk` (`:309–444`) — match the ported else-if chain.** DISE/PEST/FAMN consecutive hit → STUN; DREN vs you scale; `mspec_used` engl/hugs/STCK/POLY → weak claw/tuch; cancelled/Stormbringer/Vorpal AT_WEAP→PHYS; lich cold→PHYS (`damn+1)/2`, 10→6) if shade skipped; then `!substituted && is_home_elemental` double `damn`. SEDUCE=0 **named omit**. `mattacku` passes `sum`; `mattackm` passes `res`. **Match.**

**Switch extras.** AT_WEAP bash `is_pole && !Snickersnee && m_next2u`; `hitval(wep, youmonst)` (C `:908`; parent passed `null`). AT_ENGL `flush_screen(1)` then `gulpmu`. Per-slot `if (disp.botl) bot()`. Sleep: `sum[i]==M_ATTK_HIT && usleep && usleep < moves && !rn2(10)` → `multi=-1` + nomovemsg. **Match C text.**

**The C-wrong this peel made load-bearing.** C `nomul` `:4167` and `unmul` `:4197` set `u.usleep = 0`. C `nomul` `:4166` sets `u.uinvulnerable = FALSE`. JS `nomul` (`hack.js:966–977`) and `unmul` (`:1019–1040`) do **neither**. `fall_asleep` is the **only** JS `usleep =` write. After any sleep, JS `usleep` stays a past `moves` stamp forever. C `mattacku` `:512` `nomul(0)` clears it when `multi >= 0` (awake); JS does not. The new `:939–943` arm then draws **`rn2(10)` on every `M_ATTK_HIT`** while C’s `usleep` is 0. That is extra combat RNG, not a named omit.

**Public proof.** `seed0030` **PASS** RNG 105529/105529 at parent `22bc5c1e`. **FAIL** RNG **39912**/105529, Screen **989**/1953 at **this SHA** — same totals as HEAD `b14236d6`. D-1796 did not move the first desync. D-log “green + combat cohort hold” / “suite was 44/44” is an overclaim for the public fortress.

**Callee closure.** `hitmu` is a real `staticfn` body, not an empty stub — remaining `mhitm_ad_*` stay named. `nomul`/`unmul` in a **live** pre-loop / sleep envelope are **not** LIVE vs C on `usleep`. One STUB-shaped callee in a live arm → this should have been its own Open/Must-fix, not “Match C mattacku.”

## Hallucinations / overclaim

Do **not** stamp “Match C `hitmu`.” Do **not** stamp “fortress 44/44 through D-1795.” Do **not** export a second `simple_typename` or a fourth `is_home_elemental`. `hitval` vs-youmonst is C; the missing blessed/spear/trident/pick bonuses remain named (D-1793). `Invis()` is still the `u.Invis` flag (`:200–202`), thinner than `youprop.h` H/E/`!B` — not the seed0030 smoking gun (sticky `usleep` is).

## Density

§2b: remaining `mattacku` + `getmattk` + the helpers those arms call. +329. Did **not** glue `hitmu` ads. Right size. The miss is **callee completeness** (`nomul`), not thinness.

## Verification

D-log probes: PEST→STUN, DREN dice, ENGL `mspec_used`, cancelled wight, mimic gold. Green + a combat cohort are claimed; **this audit’s seed0030 bisect falsifies the fortress.** save-oracle skip. Rule #2 clean. `csym` `:490–952` / `:309–444` vs HEAD `js/mhitu.js:2770–3160` and `js/mhitm.js:339–437`.

## Actionable C-wrongs

1. **Match C `hack.c` `nomul` `:4160–4173` and `unmul` `:4177–4198` so `u.usleep = 0` and `nomul`’s `u.uinvulnerable = FALSE` actually run**, instead of leaving those fields sticky so this SHA’s sleep-wakeup `rn2(10)` (`mhitu.c:939–943`) and prayer gate (`:743–754`) fire when C would not. Do **not** delete the mattacku sleep arm — it is C. Do **not** invent a seed0030 peel. One port: those two assignments (nomul also already misses `uinvulnerable`).

Named (not Must-fix): `hitmu` remaining ads; SEDUCE=0; ceiling `in_rooms`; `uhitm` `prev_result`; lock.js `simple_typename`; `is_home_elemental` clones; `hitval` vs-mon bonuses.

Verdict: **QUALITY-RISK**

**Addressed:** D-1797 `819bccab`
