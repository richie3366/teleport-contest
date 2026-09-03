# Review 719 — 0b5f451a — youprop.h Deaf in mhitu doseduce/mayberem (D-1758)

## Metadata
- Full / short hash: `0b5f451a503d328b59465f234d3ea7fa7bfca720` / `0b5f451a`
- Parent: `77cc3bab` (audit #2170 / reviews **710–718**). JS parent `2d66f69e` (D-1757). This file audits **this SHA only** (first of nine `js/` commits since review **718**). Archive **Addressed:** D-1758 `0b5f451a`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-03 04:19:37 +0200
- D-id: **D-1758**
- Stats: `js/mhitu.js` +13/−7. Total `js/` insertions **13** <250. Band **150–350**. Must-fix (review **711** item 1), so sub-40 density is allowed.
- Claims to close: Must-fix `doseduce`/`mayberem` `hero_Deaf` drops `EDeaf`/`uroleplay.deaf`. Source: `reviews/loop-unattended/711-b6c42dd0-doseduce.md`. Review **711** item 2 (`noit_mhim` Hallu) named, not this Open. `reviews/loop-2026-08-15/` has no unpaid Deaf Must-fix.
- JS / map: `mhitu.js` `hero_Deaf`. `c-js-map/turns.md` D-1758 + named `noit_mhim`.
- Prior: **711** QUALITY-RISK; stamp `**Addressed:** D-1758 `0b5f451a`` already on that file.

## Intent vs deliverable

Git subject promises: `youprop.h` Deaf in mhitu `doseduce`/`mayberem` so `EDeaf` and `uroleplay.deaf` skip Cha `rn2`/`y_n` instead of the HDeaf-only clone after D-1750.

`node scripts/csym.mjs doseduce` → `mhitu.c:1984–2305`. `--callers doseduce`: `sounds.c:1112`; `uhitm.c:4763`. `mayberem` `:2308–2352` (callers `:2027`/`:2058`/`:2119–2128`). `Deaf` `youprop.h:125`. `HDeaf` `:123`. `EDeaf` `:124`. `hitmsg` `mhitu.c:28–81`. `You_hear` `pline.c:435–452`. `mhitm_ad_sedu` mhitu arm `uhitm.c:4633–4656`. `mhitm_ad_ston` mhitu arm `uhitm.c:4212–4229`. `noit_mhim` `you.h:328–329`. `Unaware` `youprop.h:399`.

```123:125:nethack-c/upstream/include/youprop.h
#define HDeaf u.uprops[DEAF].intrinsic
#define EDeaf u.uprops[DEAF].extrinsic
#define Deaf (HDeaf || EDeaf || u.uroleplay.deaf)
```

```2322:2328:nethack-c/upstream/src/mhitu.c
    if (Deaf) {
        pline("%s takes off your %s.", seducer, str);
    } else if (rn2(20) < ACURR(A_CHA)) {
        SetVoice(mon, 0, 80, 0);
        Sprintf(qbuf, "\"Shall I remove your %s, %s?\"", str,
                (!rn2(2) ? "lover" : !rn2(2) ? "dear" : "sweetheart"));
```

Parent `hero_Deaf` was `u.Deaf || u.HDeaf`. The diff **does** rewrite that local to `HDeaf || EDeaf || uroleplay.deaf || u.Deaf` and route `hitmsg` / `You_hear` / `mhitm_ad_sedu` / `mhitm_ad_ston_u` through it. It **does not** import `do.js` `Deaf` or add clone #12/#4. It **does not** port `noit_mhim` Hallu (`you.h:328`). Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `hero_Deaf` | CLONE repaired | now matches invent.js:4367 / do.js:395 / monmove.js:813 |
| `doseduce` `:1984–2305` | LIVE kept | Cha/`y_n` behind `!hero_Deaf()` |
| `mayberem` `:2308–2352` | LIVE kept | Deaf take-off vs `rn2(20)`/`y_n` |
| `hitmsg` `:40` | LIVE repaired | Blind/Deaf smiles/talks/touches |
| `You_hear` `pline.c:435–452` | CLONE kept | Deaf now youprop; Unaware/Underwater still clone |
| `mhitm_ad_sedu` `:4647–4651` | LIVE repaired | Deaf brag wording |
| `mhitm_ad_ston_u` `:4216–4228` | LIVE repaired | cough/hiss `!Deaf` |
| `noit_mhim` | OMIT named | pay line still `mon.female ? her : him` |

`node scripts/sym.mjs`:

```
hero_Deaf        NOT EXPORTED — 3 LOCAL  invent.js:4367  mhitu.js:923  monmove.js:813
                 => Do NOT write #4. Predicates match (this SHA repaired mhitu).
Deaf             NOT EXPORTED — 11 LOCAL  do.js:395 matches C
                 => Do NOT write #12.
You_hear         NOT EXPORTED — 14 LOCAL  mhitu.js:1723
                 => Do NOT write #15.
doseduce         js/mhitu.js:989   ASYNC
mayberem         NOT EXPORTED — 1 LOCAL  mhitu.js:955  => Do NOT write #2
hitmsg           js/mhitu.js:307   ASYNC
mhitm_ad_sedu    NOT EXPORTED — 1 LOCAL  mhitu.js:1641
mhitm_ad_ston_u  NOT EXPORTED — 1 LOCAL  mhitu.js:1752
noit_mhim        NOT EXPORTED — 1 LOCAL  shk.js:210  => Do NOT write #2
Unaware          NOT EXPORTED — 8 LOCAL  mhitu.js:537
HDeaf / EDeaf    NOT FOUND (flats on game.u, not functions)
```

Re-points: none (local body only). `node scripts/imports.mjs --can` N/A. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: **none**. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**Predicate (`youprop.h:125`).** C `HDeaf || EDeaf || u.uroleplay.deaf`. JS `!!((u.HDeaf\|0) \|\| (u.EDeaf\|0) \|\| u.uroleplay?.deaf \|\| u.Deaf)`. Extra `u.Deaf` flag matches invent/do/monmove (JS stores the compiled property on `u` as well as H/E flats). **Match C plus the shared JS flag.** Canary: EDeaf-only and roleplay-deaf skip Cha `rn2`.

**`mayberem` (`:2322–2351`).** Deaf → take-off pline, **zero** rng; else `rn2(20)<Cha` → SetVoice + `y_n` with clang `!rn2(2) lover : !rn2(2) dear : sweetheart`; else SetVoice + why verbalize; then `remove_worn_item(TRUE)`. JS `hero_Deaf()` then the same. Parent burned `rn2`/`y_n` when only `EDeaf` was set. **Match C after this SHA.**

**Succubus ring (`:2031–2039`) / incubus ring (`:2062–2070`).** `!Deaf && rn2(20)<Cha` → qbuf/`y_n`; else take/wear pline. JS `!hero_Deaf() && rn2(20)<acurr(A_CHA)`. **Match.** Callers `:2027`/`:2058` still `mayberem` gloves first.

**Murmur (`:2114–2118`).** `Deaf ? seems to murmur : naked ? sweet nothings : murmurs` + undress suffix. JS `hero_Deaf()` ternary. **Match.** No rng on this line.

**Leftover armor (`:2139–2159`).** `!Deaf` then `!(ld() && mon->female)` verbalize vs gloves; else `seewho` sigh. JS the same behind `!hero_Deaf()`. **Match.** `ld` LIVE (D-1742). Leap-day gloves verbalize has no C SetVoice — already D-1752.

**House (`:2287–2292`).** `!Deaf` SetVoice + “It's on the house!” else “No charge.” JS `!hero_Deaf()`. **Match.** Pay `rn2(20)` is **not** behind Deaf (C `:2265` too).

**`hitmsg` (`:40`).** C `!Blind ? "smiles at" : !Deaf ? "talks to" : "touches"`. JS `Blind ? (hero_Deaf() ? 'touches' : 'talks to') : 'smiles at'`. **Match.** Parent used HDeaf-only `Deaf` local.

**`mhitm_ad_sedu` mhitu (`uhitm.c:4647–4651`).** `Deaf ? can't hear : minvent brags : remarks`. JS `hero_Deaf()` in that ternary. **Match the mhitu arm.** Named: uhitm steal_it.

**`mhitm_ad_ston` mhitu (`uhitm.c:4216–4228`).** `mcan` + `!Deaf` cough You_hear; else Hallu+!Blind You_hear hissing (You_hear deals with Deaf) else `!Deaf` hiss else !Blind grimace. JS `hero_Deaf()` for cough/hiss/grimace; Hallu path still calls local `You_hear`. **Match the `!Deaf` gates.**

**`You_hear` clone (`pline.c:435–452`).** C `(Deaf && !Unaware) \|\| !flags.acoustics` then Underwater “barely” / Unaware “dream” / “You hear”. JS `hero_Deaf() \|\| acoustics===false` then always `You hear`. Deaf part is now youprop (parent missed EDeaf). **Unaware exception and Underwater/Unaware prefixes still diverge** — pre-existing 14-clone debt; this SHA did not name them here. Conscious Deaf: both skip. Unaware+Deaf dream-hear remains clone. Do **not** treat that as the Must-fix this SHA promised. D-1760 later names explode `You_hear` Underwater/Unaware.

**RNG (doseduce + mayberem).** Behind Deaf: ring `rn2(20)` × N, mayberem `rn2(20)` then up to two `rn2(2)`. Not behind Deaf: `rn2(35)` outcome, pay `rn2(20)`, gold `rnd`, `!rn2(25)` mcan. Parent with only EDeaf burned the Cha `rn2(20)` first. This SHA’s canary: EDeaf/roleplay/HDeaf first burn is `rn2(35)`. **Match C when the predicate matches.**

**Callee closure (Deaf sites this SHA).** LIVE: `doseduce`, `mayberem`, `hitmsg`, `mhitm_ad_sedu` mhitu, `mhitm_ad_ston_u`, `SetVoice`, `y_n`, `verbalize`, `remove_worn_item`. CLONE verified: `hero_Deaf` ≡ invent/do. CLONE remaining: `You_hear` Unaware/Underwater. OMIT named: `noit_mhim`. STUB: **none**. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject “EDeaf and uroleplay.deaf skip Cha `rn2`/`y_n`”: **true**. D-log “same helper in hitmsg/You_hear/sedu/ston”: **true** for the Deaf predicate. D-log “did not add Deaf clone #12”: **true**. Do **not** stamp “Match C `noit_mhim`.” Do **not** stamp “Match C `You_hear` Unaware/Underwater prefixes.” Do **not** stamp “Match C uhitm/mhitm AD_SSEX.” Journal “fortress held” is not a public succubus+EDeaf screen. **Public-unhit**; admit that.

## Density

§2b Must-fix one item: the diverging `hero_Deaf` clone. +13. Related same-file Deaf sites (hitmsg/You_hear/sedu/ston) in the envelope. Did **not** glue `noit_mhim`. Did **not** re-port D-1750 `doseduce`.

## Verification

D-log: save-oracle skip (untagged `mhitu.c:doseduce`); node 21/21 including **EDeaf / uroleplay.deaf / HDeaf first rng `rn2(35)` not `rn2(20)`**; green+strict seed8000/0900; CURRENT cohort **7**/7 + strict. Rule #2 clean. Seduction **public-unhit**. Admit that.

## Actionable C-wrongs

None for Must-fix (`hero_Deaf` now matches `youprop.h:125`; review **711** item 1 is the fix). Named (map, not Must-fix): `noit_mhim` Hallu (`you.h:328`; shk clone drops Hallu — do **not** write #2); uhitm hero-as-seducer; mhitm mon-mon AD_SSEX; `c_sa_no`; steal `:517`; mhitu `You_hear` Unaware/Underwater (`pline.c:435–452`). Do **not** import `do.js` for Deaf. Do **not** add `hero_Deaf` #4. Do **not** restore HDeaf-only. Do **not** re-port D-1750.

Verdict: **ACCEPT-WITH-DEBT**
