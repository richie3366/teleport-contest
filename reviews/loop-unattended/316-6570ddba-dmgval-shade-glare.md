# Review 316 — 6570ddba — weapon.c dmgval shade / shade_glare (D-1354)

## Metadata
- Full / short hash: `6570ddba1b926e7456349f91e7ad8e63c57995c3` / `6570ddba`
- Parent: `03e578b1` (D-1353). This file audits **this SHA only** (last of four `js/` commits since review **312**). Archive **Addressed:** D-1354 lacked the short hash; this review commit fills `6570ddba`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 10:36:04 +0200
- D-id: **D-1354**
- Stats: 11 files, +108 / −30 — `js/artifact.js` +23; `js/weapon.js` +12 / −3; `js/mhitm.js` comment-only.
- Claims to close: Open `weapon.c` `dmgval` shade/`shade_glare` (named from D-1341 / reviews **303** / **313**). Not hitmm `shade_miss`. `reviews/loop-2026-08-15/` has no unpaid shade Must-fix.
- JS / map: `weapon.js` `dmgval`; callee `artifact.js` `shade_glare`; `shade_miss` already used `obj && dmgval` (D-1341); `c-js-map/turns.md`. Thick-skin / blessed / silver / axe / iron-ball / `artifact_light` / `spec_dbon` / erosion; hmon `:892` ranged `shade_glare`; mthrowu / zap `bhit` / hmon / `mhitm_ad_phys` `shade_miss` callers still named.
- Prior reviews this SHA claims to close: **303** named the club-still-hurts lie inside live `shade_miss`; **313** still listed `dmgval` shade as named; **315** follow-up queued this Open row.

## Intent vs deliverable

Git subject promises: “Match C weapon.c dmgval so a non-silver club vs a shade actually deals no damage (shade_glare), instead of still hurting.”

C `dmgval` (`weapon.c:216–348`); shade after spe and thick-skin (`:304–308`):

```
    if (objects[otyp].oc_material <= LEATHER && thick_skinned(ptr))
        tmp = 0;
    if (ptr == &mons[PM_SHADE] && !shade_glare(otmp))
        tmp = 0;
    /* then iron-ball / blessed rnd(4) / silver rnd(20) / … */
```

C `shade_glare` (`artifact.c:555–571`): silver `oc_material`, else artifact `SPFX_DFLAG2` and `mtype==M2_UNDEAD`. Comment: does **not** consider blessed vs undead (that bonus is the later `dmgval` line).

C `shade_miss` (`uhitm.c:2016+`): false if not shade **or** `(obj && dmgval(obj,mdef))`. Review **303** recorded that JS `dmgval` still returned dice+spe, so a club failed the miss.

Old JS: dice + small-otyp switch + spe, then return. Comment “thick-skin/shade/silver… deferred.”

The diff **does** add `shade_glare` (silver or `get_artifact` DFLAG2+UNDEAD) and zero `tmp` when `ptr.mndx==PM_SHADE && !shade_glare`. Dice still roll first. It does **not** port thick-skin or the blessed/silver bonuses **after** the zero. Named. It does **not** add hmon’s separate `shade_glare` at `uhitm.c:892` (ranged 1–2 dmg). Named. Comment-only `mhitm.js`.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `dmgval` shade line | C `:307–308`, **wired** | after spe; thick-skin still named so this sits where the port has reached |
| `shade_glare` | C `:555–571`, **wired export** | C callee, not a hitmm clone |
| `get_artifact` | C, **imported live** | null/`!oartifact` → `list[ART_NONARTIFACT]` (0) |
| `SPFX_DFLAG2` | C `artifact.h:38` `0x00800000`, **pre-existing** | |
| `M2_UNDEAD` | C `monflag.h:124` `0x00000002`, **imported live** | |
| `SILVER` | C `objclass.h:27` `=14`, **local const** | matches `mhitm.js` |
| `PM_SHADE` | C mons index, **wired** | mndx vs `&mons[PM_SHADE]` (D-0928) |
| thick_skinned | C `:304–306`, **named omit** | |
| blessed / silver / axe bonuses | C `:327–334`, **named omit** | after shade zero in C |
| hmon ranged `shade_glare` | C `uhitm.c:892`, **named omit** | not `dmgval`; 1–2 thrown dmg |
| mthrowu / zap `bhit` / hmon `shade_miss` | C other callers, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** none inside `shade_glare`. `dmgval` still burns `rnd(oc_wsdam)` **before** the zero (C same). Blessed `rnd(4)` after the zero is still skipped — named, and it **is** a leftover C RNG the public suite does not hit.

## C ↔ JS fidelity

`shade_glare`: silver material first (Sunsword is LONG_SWORD but silver? No — Sunsword is LONG_SWORD with `SPFX_DFLAG2`+`M2_UNDEAD` in `artilist.h:209`, so the **second** arm is what glares). Grimtooth/Orcrist are DFLAG2+`M2_ORC` → false unless the otyp is silver (they are not). Club: both arms false. Match `:560–566`. `get_artifact` dummy is `list[0]==list[ART_NONARTIFACT]`. Match.

`dmgval` shade: `mndx==PM_SHADE` (JS never compares `mons()` identity; D-0928). `!shade_glare` then `tmp=0`. Cream pie still returns 0 before dice. Match `:222–223` / `:307–308`. Spe already applied; negative spe clamped. Match `:297–302`.

C then adds blessed `rnd(4)` vs `mon_hates_blessings` **after** the zero. A **blessed** non-glare club vs a shade is `0+rnd(4)` in C and **0** in JS (early return). D-log canary states “blessed club still 0 named.” That is a named omit of `:327–328`, not a `shade_glare` that treats blessed as glare (C’s function explicitly does not). Unblessed club: both 0. Silver saber: glare true, tmp kept; C then adds `rnd(20)` (`:331–332`); JS keeps dice+spe only. Named silver bonus.

`shade_miss` third clause is now true-zero for a club, so `hitmm` returns `M_ATTK_MISS` and prints harmlessly-through. That is the subject’s “instead of still hurting” for **unblessed** non-glare weapons. Review **303**’s armed-melee hole is closed for that case.

Hallucination check: “Match C `dmgval`” while **blessed/silver bonuses after the zero are omitted** is an overclaim on **blessed clubs** and **silver extra dice**. The **`:307–308` line** and **`shade_glare` body** match. Dispatch is live (`shade_miss` → `dmgval` → `shade_glare`), not a stub that still returns dice for a club. Do **not** stamp “Match C `dmgval` blessed/silver.” Do **not** stamp “Match C hmon `:892`.” Do **not** stamp “Match C mthrowu `shade_miss`.”

## Hallucinations / overclaim

Subject says a non-silver club vs a shade deals no damage. **True for unblessed non-glare weapons via `dmgval` and therefore via `hitmm` `shade_miss`.** **False for a blessed club** until `:327–328` ships (C still `rnd(4)` after the zero). False for hmon’s ranged 1–2 path until `:892`. D-1354 **Not this iter** names those. Stamping **Addressed:** D-1354 for `:307–308` + `shade_glare` is fair. Do **not** treat fortress PASS as a jackal-club-vs-shade harmlessly-through.

## Density

One C line plus its one callee. ~25 lines of JS. Playbook §2b: this was the named lie inside live `shade_miss` (**303**), not a one-line comment peel. Did not glue hmon `:892` or mthrowu callers (different functions). Acceptable; slightly thin, but the queued row was exactly this `if`.

## Branch-by-branch confirm

1. Club vs shade: `shade_glare` false, tmp=0 after dice. Match `:307–308`.
2. Club vs gnome: not shade, tmp stays dice+spe. Match.
3. Silver saber vs shade: glare true, tmp not zeroed. Match `:560–561`.
4. Sunsword (LONG_SWORD, DFLAG2+UNDEAD): glare true. Match `:563–566`.
5. Grimtooth/Orcrist (DFLAG2+ORC): glare false. Match.
6. Cream pie: early 0, no shade test. Match `:222–223`.
7. Blessed club vs shade: JS 0; C `rnd(4)`. Named.
8. `hitmm` unarmed vs shade: still miss (`obj` null skips `dmgval`). Match D-1341.
9. `hitmm` club vs shade: now miss (was hurt). Match `shade_miss` + this SHA.
10. hmon `:892` thrown 1–2: still omit. Named.
11. **Public-unhit** unless a session hits a shade with a non-glare weapon.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `PM_SHADE` is a mons token, not a recorded coordinate. Plain ESM.

## Verification

Journal: private canary **20**/20; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** on club-vs-shade. This audit cadence: full `sessions` at HEAD `6570ddba` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `37+0.31/turn` (R² 0.85). I did not re-run the private canary. Fortress PASS is not a shade miss.

## Actionable C-wrongs

None for Must-fix. `shade_glare` matches C `:555–571` (silver, else DFLAG2+`M2_UNDEAD`, not blessed). `dmgval` `:307–308` matches. Blessed/silver-after-zero are named omits of **later** lines that were already unported, not a clone that rolls `rnd(4)` then discards it. hmon `:892` is a different caller of the same live `shade_glare`.

Named omits (map / already-Open, not Must-fix):

1. `dmgval` thick-skin / blessed / silver / axe / iron-ball / `artifact_light` / `spec_dbon` / erosion
2. hmon ranged `shade_glare` (`uhitm.c:892`)
3. mthrowu / zap `bhit` / hmon / `mhitm_ad_phys` `shade_miss` callers
4. Next Open: `zap.c` `zapyourself` WAN_LIGHTNING (C `:2730–2746`)

Do not Must-fix “blessed should `shade_glare`” (C’s function forbids that). Do not Must-fix “skip dice `rnd` when shade” (C rolls then zeros). Do not Must-fix “use `mons()` identity” (this port uses mndx).

## Callers / RNG ledger

C: `dmgval` `rnd(wsdam)` → maybe thick (no RNG) → shade zero → maybe blessed `rnd(4)` / silver `rnd(20)`. JS: `rnd(wsdam)` → shade zero → return. `shade_miss` has no RNG. Public fortress is not that path.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: club vs shade now zeros in `dmgval` so `hitmm` misses; blessed-after-zero and hmon `:892` stay named.
- Must-fix stays empty for this SHA; this review commit fills archive **Addressed:** D-1354 `6570ddba`.
