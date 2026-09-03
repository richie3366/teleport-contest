# Review 735 — 24ced3ef — mondata.c pronoun_gender / you.h mhe (D-1776)

## Metadata
- Full / short hash: `24ced3ef1b23ae136202a37cc12c756a9cb581ea` / `24ced3ef`
- Parent: `b4d526e9` (D-1775). Eighth of ten `js/` commits this audit. This file audits **this SHA only**.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-03 17:37:09 +0200
- D-id: **D-1776**
- Stats: `js/mondata.js` +67/−0; fountain/mhitu/mthrowu/shk/sit/steed/uhitm/vault clone deletes. Total `js/` insertions **103** <250. Band **150–350**.
- Claims to close: queue `mhitu.c` noit_mhim Hallu **and** retire `end.c` DUMPLOG. Not apply.c corpse `PRONOUN_NO_IT`. Not `mon_nam_too`. `reviews/loop-2026-08-15/` has no unpaid pronoun Must-fix.
- JS / map: `mondata.js` `pronoun_gender` + six you.h wrappers. `c-js-map/data.md`.
- Archive **Addressed:** D-1776 `24ced3ef`.

## Intent vs deliverable

Git subject promises: Match C `mondata.c` `pronoun_gender` so `mhe`/`mhim`/`mhis` and `noit_*` draw Hallu `rn2(4)` from one C-faithful port, instead of eight local clones that dropped the roll or the visibility gates.

`node scripts/csym.mjs pronoun_gender` → `mondata.c:1188–1207`. `--callers`: `apply.c:238` `PRONOUN_NO_IT`; `do_name.c:1199` `PRONOUN_HALLU`; you.h macros `:322–331`. `PRONOUN_NO_IT`/`PRONOUN_HALLU` in `you.h:317–331`.

```1188:1207:nethack-c/upstream/src/mondata.c
int
pronoun_gender(struct monst *mtmp, unsigned pg_flags)
{
    boolean override_vis = (pg_flags & PRONOUN_NO_IT) ? TRUE : FALSE,
            hallu_rand = (pg_flags & PRONOUN_HALLU) ? TRUE : FALSE;

    if (hallu_rand && Hallucination)
        return rn2(4); /* 0..3 */
    if (!override_vis && !canspotmon(mtmp))
        return 2;
    if (is_neuter(mtmp->data))
        return 2;
    return (humanoid(mtmp->data) || (mtmp->data->geno & G_UNIQ)
            || type_is_pname(mtmp->data)) ? (int) mtmp->female : 2;
}
```

Parent: eight clones. Subject’s RNG-wrong three (shk noit_* female ternary; mthrowu `mhim` constant `'it'`; vault `mhe` no Hallu) and text-wrong two (mhitu/uhitm `mhis` skipped gates) are in the deleted hunks. The diff **does** put one port in `mondata.js` over `roles.js` `genders[]`, export the six macros, delete the eight clones, re-export from fountain, pass `PRONOUN_HALLU` from steed, wire shk `getcad` `noit_mhis` and partial-pay `noit_mhim`. It **does not** port `apply.c:238`. Named. DUMPLOG is **retired with build evidence**, not ported — correct for `macosx-minimal` without `-DDUMPLOG`.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `pronoun_gender` | LIVE new | Hallu `rn2(4)` **first** |
| `mhe`/`mhim`/`mhis` | LIVE new | `PRONOUN_HALLU` |
| `noit_mhe`/`noit_mhim`/`noit_mhis` | LIVE new | `NO_IT\|HALLU` |
| `Hallucination` / `canspotmon` / `is_neuter` / `humanoid` / `type_is_pname` | LIVE | |
| `genders[]` | LIVE | roles.js |
| eight local clones | deleted | 0 remaining (`sym.mjs`) |
| `apply.c:238` | OMIT named | |
| `mon_nam_too` / `monverbself` | OMIT named | mhitm clone |
| `end.c` DUMPLOG | retired | not a JS stub |

`node scripts/sym.mjs` (deleted clones → one export):

```
pronoun_gender   js/mondata.js:726   sync
mhe              js/mondata.js:739   sync
mhim             js/mondata.js:744   sync
mhis             js/mondata.js:749   sync
noit_mhe         js/mondata.js:758   sync
noit_mhim        js/mondata.js:763   sync
noit_mhis        js/mondata.js:768   sync
```

No `!! ALSO LOCAL CLONE` lines. `--can shk.js mondata.js noit_mhim`: **ALREADY**. FORCE/DIAG/`getRngLog`/`fastforward`: **none**. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**. RNG: `rn2(4)` iff `PRONOUN_HALLU && Hallucination()`, **before** `canspotmon`. Gameplay stream (not display rng).

## C ↔ JS fidelity

**`pronoun_gender`.** Flags; Hallu return `rn2(4)` first; else `!NO_IT && !canspotmon` → 2; neuter → 2; else humanoid/`G_UNIQ`/`type_is_pname` → `female` else 2. JS `mtmp.female ? 1 : 0` matches C `(int)female`. Extra `!ptr → 2` is defensive. **Match call-for-call.** `PRONOUN_NO_IT` does **not** skip Hallu and does **not** force gender on neuters. That was the clone lie (shk ternary / mthrowu `'it'`).

**Macros.** `mhe` = `genders[pronoun_gender(..., HALLU)].he` (and him/his). `noit_*` OR `NO_IT`. **Match you.h.** fountain re-export does not add clone #2.

**shk consumers.** `getcad` Deaf arms `noit_mhis` vs hardcoded `'his'`; partial-pay uses `currency(loss)` + `"you "` when customer matches `plname` + `noit_mhim`. Named: C unspecified printf arg order (`ROLL_FROM` vs `noit_mhis`) only when Hallu+Deaf; JS left-to-right like the live angry-return site. Not Must-fix.

**apply.c `:238`.** Still not wired. Named Open. **Not** “Match C apply corpse gender.”

**Callee closure.** LIVE: `rn2`, `Hallucination`, `canspotmon`, `is_neuter`, `humanoid`, `type_is_pname`. STUB: **none**. Not “dispatch ported, callee stubbed.”

**Deleted clone lies (why this cluster).** shk `noit_*` was a female ternary — no `rn2(4)`, no `canspotmon`. mthrowu `mhim` returned `'it'` — no Hallu draw. vault `mhe` had no Hallu arm. Those would desync the **gameplay** stream on the first hallucinating call. One `mondata.js` port fixes all six macros because they are the same `pronoun_gender` with different flag bits.

## Hallucinations / overclaim

Subject “one C-faithful port, eight clones dropped the roll or gates” is true (`sym.mjs` 0 clones; deleted shk/mthrowu/vault were RNG-wrong). “DUMPLOG retired” is true for the scored macosx-minimal build — do **not** re-enqueue it as a port. Do **not** stamp “Match C `apply.c` `PRONOUN_NO_IT`.” Do **not** stamp “Match C `mon_nam_too`.” Journal 44/44 is no-regression; Hallu `rn2(4)` is **public-partial** (seed0383/0399 strict cited).

## Density

§2b: one C helper + the six macros + delete the eight clones that contradicted it + the two shk sites that used the bad noit_*. +103 / net smaller. DUMPLOG is a **docs retirement** in the same SHA because it was queue head — not a second C body. Did **not** glue apply corpse / `mon_nam_too`. Did **not** invent a FAIL peel.

## Verification

D-log: green+strict seed8000/0900; full `sessions` **44**/44; strict seed0383/0399 (Hallu) and seed0116 (shop). `sym.mjs` 0 clones. Rule #2 clean. apply.c NO_IT **public-unhit**. Admit that.

## Actionable C-wrongs

None for Must-fix (helper + macros match C; apply/`mon_nam_too` named). Named: `apply.c` corpse `PRONOUN_NO_IT`; `do_name.c` `mon_nam_too`/`monverbself`. Do **not** write `pronoun_gender` clone #2. Do **not** draw `rn2(4)` after `canspotmon`. Do **not** let `NO_IT` override neuter/humanoid. Do **not** restore shk `'his'` / mthrowu `'it'`. Do **not** re-enqueue DUMPLOG.

C `you.h:322–331` macros are the only production callers besides `apply.c:238` and `do_name.c:1199`. `roles.js` `genders[]` is the C `genders` table (he/him/his/himself). Index 3 is Hallu “they”. `type_is_pname` remains an insight clone elsewhere; inside this helper it is the same export the rest of the port uses. fountain re-exports must not grow a second body.

```1188:1206:nethack-c/upstream/src/mondata.c
    if (hallu_rand && Hallucination)
        return rn2(4); /* 0..3 */
    if (!override_vis && !canspotmon(mtmp))
        return 2;
    if (is_neuter(mtmp->data))
        return 2;
    return (humanoid(mtmp->data) || (mtmp->data->geno & G_UNIQ)
            || type_is_pname(mtmp->data)) ? (int) mtmp->female : 2;
```

Verdict: **ACCEPT-WITH-DEBT**
