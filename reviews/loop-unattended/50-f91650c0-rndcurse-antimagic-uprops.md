# Review 50 — f91650c0 — sit `rndcurse` `Antimagic()` via `uprops[ANTIMAGIC]` (D-1089)

## Metadata
- Full / short hash: `f91650c0204e93fcd4b0f217e88fce3cbd473ebe` / `f91650c0`
- Parent: `8bb7d93f` (review **46–49** + cadence **#1385**). JS-touching since last dedicated `reviews/loop-unattended/` *creation* (`8bb7d93f`): **this SHA**, D-1090, D-1091, D-1092. This file audits **this SHA only**.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 16:49:15 +0200
- D-id: **D-1089**
- Stats: 11 files, +129 / −62 — `js/sit.js` +21 / −2 (`Antimagic()` body + `ANTIMAGIC` import + comments). Live JS is that helper, not a new `shieldeff`.
- Claims to close: Must-fix from review **48** QUALITY-RISK — `sit.js` `rndcurse` `Antimagic()` must be C `youprop.h` Antimagic ≡ `uprops[ANTIMAGIC]` intrinsic||extrinsic (plus existing H/E flats). Stamped **Addressed:** D-1089 `f91650c0` on the archive row (filled by D-1090). `reviews/loop-2026-08-15/` has no open Antimagic-uprops Must-fix.
- JS / map: `sit.js` `Antimagic` / `rndcurse`. `c-js-map/data.md` sit row names D-1089. `Half_spell_damage()` sit clone and other modules’ `Antimagic()` still named.
- Prior reviews this SHA claims to close: **48** item 1. Review **49** said the next port ships this, not another makemon peel.

## Intent vs deliverable

Git subject promises: “Match C youprop.h Antimagic so rndcurse worn cloak-of-MR and gray DSM flash shieldeff and use the reduced curse count.”

The Must-fix was that one helper, used both as the `if (Antimagic)` `shieldeff` gate and as the `!!Antimagic` term in `rnd(6 / ((!!Antimagic)+…))`. Not `confer_oc_oprop`. Not `update_inventory`. Not every other `Antimagic()` clone. Not `Half_spell_damage()`.

The diff **does** that envelope: OR sticky/H/E flats **and** `uprops[ANTIMAGIC]` intrinsic/extrinsic, same shape as `invent.js` `hero_Antimagic`. Comment says `confer_oc_oprop` writes worn `CLOAK_OF_MAGIC_RESISTANCE` / gray DSM to uprops and never mirrors `EAntimagic`. `rndcurse` still `await shieldeff` then `You_feel`, then the `rnd` divisor using `Antimagic()`.

It does **not** retouch `Half_spell_damage()` (`sit.js:183–187` still H/E/sticky). Named, and the Must-fix forbade pulling it. It does **not** rewrite `zap.js` / `pray.js` / `explode.js` / `mhitm.js` `Antimagic()` clones.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `Antimagic()` | **clone** of `youprop.h:55–57` | now ORs uprops; was H/E/sticky only |
| `ANTIMAGIC` | C enum, **imported** | `const.js` 12 = `prop.h` |
| `rndcurse` Antimagic arm | C caller, **untouched this SHA** except comments | still `await shieldeff` then `You_feel` then `rnd` (D-1087) |
| `shieldeff` | C callee, **imported** | real; D-1087 |
| `confer_oc_oprop` | C callee, **untouched** | still no `EAntimagic` mirror |
| `hero_Antimagic` | sibling clone, **untouched** | already ORs uprops (`invent.js:1735–1738`) |
| `Half_spell_damage()` | sibling clone, **untouched** | H/E/sticky; `youprop.h:293–295` via `uprops[HALF_SPDAM]` |
| zap/pray/explode/mhitm `Antimagic()` | sibling clones, **untouched** | still H/E/sticky |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched. Zero RNG in this helper. `rndcurse` still burns `rn2(20)` Magicbane then `rnd(6/(Antimagic+Half+1))`.

## Constitution / playbook

Grep of the `js/sit.js` hunk: no trace-index gates, no recorded coordinates, no `fastforward` burns. `ANTIMAGIC=12` is `prop.h`, not a seed cloak otyp. Contest Rule #2: no Node builtins. Dynamic `import('./steal.js')` in `take_gold` is pre-existing ESM, not this SHA.

## C ↔ JS fidelity

### Macro — `youprop.h` Antimagic, then both `rndcurse` uses

C `youprop.h:55–57`:

```
#define HAntimagic u.uprops[ANTIMAGIC].intrinsic
#define EAntimagic u.uprops[ANTIMAGIC].extrinsic
#define Antimagic (HAntimagic || EAntimagic)
```

`ANTIMAGIC = 12` (`prop.h`; JS `const.js:2345`). Worn `CLOAK_OF_MAGIC_RESISTANCE` and gray dragon scales/mail have `oc_oprop ANTIMAGIC` (`objects.h:503`/`531`/`646`). `setworn` → `confer_oc_oprop` writes `uprops[12].extrinsic`. **No** `EAntimagic` mirror (`do_wear.js:261–288` list is Blinded/Fast/Telepat/Stealth/Levitation only). Gray DSM uses `W_ARM`; the cloak uses `W_ARMC`. Both write the same `uprops[ANTIMAGIC].extrinsic` bit. Intrinsic sources (eat/poly `HAntimagic`) still hit the flat OR.

JS `sit.js:175–180`:

```
function Antimagic() {
    const u = game.u || {};
    const e = u.uprops?.[ANTIMAGIC];
    return !!((u.Antimagic || u.HAntimagic || u.EAntimagic)
        || (e?.intrinsic | 0) || (e?.extrinsic | 0));
}
```

That is `invent.js:1735–1738` `hero_Antimagic` copied into the file that owns `rndcurse`. Sticky `u.Antimagic` is a JS extra (not a C field); review **48** already classified it as extra-true, not the confer miss. Intrinsic `HAntimagic` still works. Worn cloak now reads the extrinsic confer actually writes.

### `rndcurse` call order — Magicbane, then Antimagic, then You, then invent

C `sit.c:576–593`: Magicbane `rn2(20)` return; `if (Antimagic) shieldeff(u.ux, u.uy)`; `You(mal_aura, "you")`; count non-COIN; `cnt = rnd(6 / ((!!Antimagic) + (!!Half_spell_damage) + 1))`.

JS `sit.js:291–309`: same Magicbane; `await shieldeff`; `You_feel` surround you; same `rnd` divisor using `Antimagic()` / `Half_spell_damage()`. Call order matches **and** `Antimagic()` is now C `youprop.h` Antimagic for confer writes.

Integer division: C `6/2=3`, `6/3=2`, `6/1=6`. JS `/` on those integers is `3`/`2`/`6` before `rnd`. Pre-existing formula; this SHA only changes when the Antimagic term is 1. `Antimagic()` is evaluated twice (gate + divisor) in both; the helper has no RNG.

Magicbane `rn2(20)` success still returns **before** `shieldeff` in both. A worn cloak plus Magicbane absorb still skips the flash on that roll — C same. `You_feel` vs C `You(mal_aura, "you")` is pre-existing wording (`feel a malignant aura surround you` vs the same plus a period in C’s format string). Not this SHA.

`shieldeff` itself is unchanged: `flags.sparkle === false` skip, `cansee`, 21 ASCII `shield_static`, `newsym` restore (review **48** ACCEPT’d the body). This SHA only changes when `rndcurse` calls it.

### Confer path vs review **48** canary

| Source | C Antimagic | JS after D-1087 | JS after D-1089 |
|--------|-------------|-----------------|-----------------|
| Intrinsic `HAntimagic` | true | true | **true** |
| Sticky `u.Antimagic` | n/a | true | true (JS extra, pre-existing) |
| **Cloak of MR / gray DSM** (`uprops[ANTIMAGIC].extrinsic`, `EAntimagic` unset) | true | **false** | **true** |
| Same cloak, `cnt` divisor | `6/2` or `6/3` | `6/1` | **`6/2` or `6/3`** |
| No cloak, no H/E | false | false | **false** |

Journal canary **21**/21: `setworn` cloak `W_ARMC` extrinsic, `EAntimagic` unset → 21 `shield_static` frames + `rnd(3)`; no-cloak 0 frames + `rnd(6)`; gray DSM `W_ARM`; cloak+Half `rnd(2)`; `HAntimagic` regression. That is the review **48** falsifier, not another H/E-only sparkle test.

### `Half_spell_damage` — named omit, same confer family

C `youprop.h:293–295`: `Half_spell_damage (HHalf_spell_damage || EHalf_spell_damage)` ≡ `uprops[HALF_SPDAM]` (`prop.h:78` = 55). `confer_oc_oprop` would write that extrinsic the same way and still not mirror `EHalf_spell_damage`.

JS `sit.js:183–187` still `u.Half_spell_damage \|\| u.HHalf_spell_damage \|\| u.EHalf_spell_damage`. Review **48** item 4 said do not pull this into the Antimagic Must-fix. This SHA obeyed. Map / later Open, not Must-fix on this SHA. Cloak+Half canary in the journal used a forced Half flag, not a confer write — that is the remaining hole, honestly named.

### Callers that ride the helper without a sit retouch

`rndcurse` is also reached from throne case 3 / confuse / other sit arms that already called this function. Those paths inherit the new gate. `pray.js` / `zap.js` still have their own `Antimagic()` clones and do **not** import sit’s helper — named, as required.

## Hallucinations / overclaim

“Match C youprop.h Antimagic so rndcurse worn cloak-of-MR and gray DSM flash shieldeff and use the reduced curse count” is **true for sit `Antimagic()` and for both `rndcurse` uses of it.** `shieldeff` remains the D-1087 callee (real `show_glyph_cell` / `flush_screen` / `newsym`). This is **not** “Match C dispatch, callee is a stub.”

It is **not** true that sit `Half_spell_damage()` is C `youprop.h`, or that zap/pray `Antimagic()` clones read uprops. The comments say so.

Stamping **Addressed:** D-1089 is fair for review **48** item 1. Hash `f91650c0` is on the archive row (filled by `43caa8ff`).

## Density (§2b)

One Must-fix cluster: the sit `Antimagic()` clone the previous SHA chose as the C `if`. ~10 executable lines. Right size for a forced fix. Not “finish every Antimagic clone.” Not `is_pool`. Sibling `Half_spell_damage` left named on purpose (review **48**).

## Verification

Journal: private canary **21**/21 (`setworn` cloak / gray DSM / Half / HAntimagic); green+strict seed8000/0900; sit/pray cohort **9**/9 (0106/0107/0108/4500/1500/1800/0017/0360/2200) + sit strict. Path **public-unhit** for worn-cloak `rndcurse`. Cadence **#1390** **44**/44 — fortress, not a public cloak-of-MR screen. Canary **did** `setworn` `CLOAK_OF_MAGIC_RESISTANCE` with `EAntimagic` unset (the review **48** miss).

C read of `youprop.h:55–57`/`293–295`, `sit.c:576–593`, `prop.h` ANTIMAGIC/HALF_SPDAM, `objects.h` ANTIMAGIC items, `do_wear.js:261–288`; JS `sit.js:175–187`/`288–309`, `invent.js:1735–1738`. Hunk grepped FORCE/fs/seed.

Call-for-call `rndcurse` Antimagic (worn cloak, not Magicbane absorb, cansee, sparkle On):

| Call | C | JS |
|------|---|-----|
| Magicbane `rn2(20)` | yes | **yes** |
| `Antimagic` (uprops extrinsic) | true | **true** |
| `shieldeff(u.ux,u.uy)` 21 frames | yes | **yes** |
| You malignant aura | yes | **yes** (`You_feel` wording pre-existing) |
| `rnd(6/2)` without Half | yes | **yes** |
| `rnd(6/3)` with Half flag | yes | **yes** (Half confer still named) |

## Actionable C-wrongs

None that Must-fix this next iter. The claimed `Antimagic()` clone now matches `youprop.h` for confer writes.

Named omits / do-nots (map / Open, not Must-fix):

1. `Half_spell_damage()` sit clone vs `uprops[HALF_SPDAM]` — same confer hole; review **48** forbade pulling it into this peel.
2. `update_inventory` after the invent walk; Hallucination `hcolor`.
3. zap/pray/explode/mhitm/muse `Antimagic()` clones still H/E/sticky. Do not rewrite them in the next `dogmove` peel.
4. DEC/showsyms `S_ss*` remap; explode.c inline sparkle; `shieldeff_mon`; other `shieldeff` callers still unwired.

Do not restore H/E-only sit `Antimagic()`. Do not rewrite `confer_oc_oprop` to save a youprop clone. Do not skip Magicbane before `shieldeff`. Do not pop `is_pool` as a substitute for this Must-fix (already shipped).

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: sit `rndcurse` now treats a worn cloak of magic resistance / gray DSM as C `Antimagic` via `uprops[ANTIMAGIC]`, so `shieldeff` and the reduced `rnd` count run, while `Half_spell_damage()` and other modules’ clones stay named.
- Must-fix stays empty for this SHA; next port after the remaining JS commits in this bundle pops Open `dogmove.c` pal/target numeric `ptr.msound`.
