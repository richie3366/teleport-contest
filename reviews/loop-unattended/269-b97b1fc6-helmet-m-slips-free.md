# Review 269 — b97b1fc6 — uhitm.c helmet / m_slips_free (D-1307)

## Metadata
- Full / short hash: `b97b1fc67ce619153d9a02820badc26a78e19d2b` / `b97b1fc6`
- Parent: `3ecd2824` (reviews **265–268**). JS parent `49dab44b` (D-1306). This file audits **this SHA only**. Archive row **Addressed:** D-1307 `b97b1fc6` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 21:03:43 +0200
- D-id: **D-1307**
- Stats: 12 files, +209 / −42 — `js/uhitm.js` +135 / −~12; `js/eat.js` comment.
- Claims to close: Open `uhitm.c` mhitm_ad_drin helmet / `m_slips_free` (named from D-1298 / review **268**). Not eat_brains. `reviews/loop-2026-08-15/` has no unpaid tentacle Must-fix.
- JS / map: `uhitm.js` `m_slips_free` / headed `mhitm_ad_drin`; `c-js-map/turns.md` + `data.md` + `debt.md`. mhitu `u_slip_free`/`uarmh` + mhitm AD_DRIN + AD_WRAP caller named.
- Prior reviews this SHA claims to close: **268** named helmet `rn2(8)` / `m_slips_free` / lifsav skipdrin after headed `eat_brains`; **260** named the same after skipdrin.

## Intent vs deliverable

Git subject promises: “Match C uhitm.c mhitm_ad_drin helmet / m_slips_free so a poly'd mind flayer's tentacle can slip off greased helm or bounce on rn2(8), instead of always eating brains.”

C `m_slips_free` (`uhitm.c:2053–2093`): AD_DRIN → `which_armor(W_ARMH)`; else cloak then suit then shirt; `greased || OILSKIN_CLOAK` && (`!cursed || rn2(3)`); `You()` slip/grab line; grease wear-off `!rn2(2)`. Caller `mhitm_ad_drin` uhitm (`:3204–3220`) after headless return `:3202`: slip return (no skipdrin, dice kept); `helmet && rn2(8)` helm/hat block via `helm_simple_name` + `mhis` (no skipdrin); snapshot life-saving amulet; `eat_brains`; then skipdrin if the amulet vanished. `helm_simple_name` (`objnam.c:5513–5528`) via `hard_helmet` (`do_wear.c:567–573`). `cloak_simple_name` (`objnam.c:5492–5509`) for undiscovered oilskin.

Old JS: D-1306 headed path called `eat_brains` immediately (review **268** named omit).

The diff **does** port `m_slips_free`, the helmet `rn2(8)` gate, and lifsav skipdrin on the uhitm arm. It does **not** wire mhitu `u_slip_free`/`uarmh`, mhitm AD_DRIN, or the AD_WRAP caller of `m_slips_free`. Named. `eat.js` is a comment.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `m_slips_free` | C `:2053–2093`, **new** | whole function; AD_WRAP body idle until that caller |
| headed slip / helmet / lifsav | C `:3204–3220`, **wired** | after headless return |
| `which_armor` | C, **imported live** | W_ARMH / W_AMUL |
| `eat_brains` | C `eat.c`, **imported live** | D-1306 |
| `is_metallic` / `is_crackable` | C `objclass.h`, **imported live** | `mkobj.js` |
| `helm_simple_name` / `hard_helmet` / `is_helmet_uhitm` | C objnam/do_wear/obj.h, **clone** | `oc_skill` ≡ `oc_armcat` ARM_HELM=2 |
| `cloak_simple_name` | C `:5492–5509`, **clone** | robe/wrapping/smock\|apron/cloak |
| `mhis` | C `you.h:324` → `pronoun_gender`, **clone** | Hallu `rn2(4)` live; canspotmon/`type_is_pname` named |
| mhitu `u_slip_free` / `uarmh` | C `:3232–3239`, **named omit** | `magr!==youmonst` still returns |
| mhitm AD_DRIN | C `:3272–3301`, **named omit** | |
| AD_WRAP caller | C `mhitm_ad_wrap`, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** slip `rn2(3)` when cursed; wear-off `!rn2(2)` when greased; helmet `rn2(8)` when worn; Hallu `mhis` `rn2(4)`. Slip/helmet return **before** `eat_brains` `rnd(10)` — matches C (canary: greased slip no `rnd(10)`).

## C ↔ JS fidelity

Pinned C (`uhitm.c:3204–3220`):

```
        if (m_slips_free(mdef, mattk))
            return;
        if ((helmet = which_armor(mdef, W_ARMH)) != 0 && rn2(8)) {
            pline("%s %s blocks your attack to %s head.",
                  s_suffix(Monnam(mdef)), helm_simple_name(helmet),
                  mhis(mdef));
            return;
        }
        amu = which_armor(mdef, W_AMUL);
        lifsav = amu && amu->otyp == AMULET_OF_LIFE_SAVING;
        (void) eat_brains(&gy.youmonst, mdef, TRUE, &mhm->damage);
        if (lifsav && !which_armor(mdef, W_AMUL))
            gs.skipdrin = TRUE;
```

JS order matches: slip → helmet `rn2(8)` → snapshot amulet → `eat_brains` → skipdrin if gone. Helmet/slip do **not** set `skipdrin` and do **not** zero dice, so leftover AT_TENT+AD_DRIN still try (C comment at `:3177–3182`; D-1298 continue only after headless or used-up amulet). Oilskin **cloak** is ignored on AD_DRIN (C looks at W_ARMH). `You()` vs `pline("You …")` is the same more-owner debt review **268** refused to Must-fix.

`hard_helmet`: metallic or glass helm → `"helm"` else `"hat"` (`:5527`). Fedora/elven leather → hat; dwarvish iron → helm. `is_helmet_uhitm` uses `oc_skill===2`; `worn.js` `armcat` is the same objects-table field. Not a glyph stand-in.

`mhis` clone: C `pronoun_gender` (`mondata.c:1191–1207`) Hallu `rn2(4)` then `!canspotmon` → 2 then neuter then `humanoid\|\|G_UNIQ\|\|type_is_pname`. JS burns Hallu `rn2(4)` then skips canspotmon/`type_is_pname` (named on the helper). Visible humanoid helm bounce is `his`/`her` either way. This is **not** “Match C helmet dispatch, `eat_brains` is a stub” — `eat_brains` is the D-1306 callee and still runs when slip/helmet miss.

## Hallucinations / overclaim

Subject + D-1307 say a poly flayer can slip a greased helm or bounce `rn2(8)` instead of always eating. **The uhitm headed gates plus `m_slips_free` are the hunk.** Stamping **Addressed:** D-1307 is fair. Do **not** stamp “Match C mhitu `uarmh && rn2(8)` / `u_slip_free`.” Do **not** stamp “Match C mhitm helmet `misc_worn_check`.” Do **not** stamp “Match C AD_WRAP grab slip.” Do **not** stamp “Match C `pronoun_gender` canspotmon → its.”

## Density

One caller envelope: headed uhitm after D-1306. Whole `m_slips_free` (including idle non-DRIN walk) is that C function, not a second cluster. ~90 executable JS lines. Right size (§2b).

## Branch-by-branch confirm

1. Headless: return before slip/helmet/`eat_brains`. Match `:3189–3202` (D-1298).
2. Greased helm, not cursed: `rn2(3)` skipped; slip pline; no `rnd(10)`. Match `:2074–2090` + `:3204`.
3. Cursed greased: `rn2(3)==0` fail-through to helmet/`eat_brains`. Match.
4. Greased + `!rn2(2)`: “The grease wears off.” Match `pline_The`.
5. Worn helm `rn2(8)!=0`: hat/helm block, no skipdrin, leftover tentacles still roll. Match `:3207–3211`.
6. Worn helm `rn2(8)==0`: fall through to `eat_brains`. Match.
7. Oilskin cloak on AD_DRIN: ignored (W_ARMH only). Match `:2060–2062`.
8. Life-saving amulet used up inside `eat_brains`: `skipdrin`. Match `:3213–3220`.
9. mhitu/mhitm `mhitm_ad_drin`: JS `return`. Named.
10. **Public-unhit** unless a poly mind flayer lands a headed tentacle on a helmed or greased foe.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Local name clones, not Node builtins. Plain ESM.

## Verification

Journal: private canary **25**/25; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a poly mind flayer lands a headed tentacle on a helmed or greased foe. Cadence this audit: full `sessions` at HEAD `734449dc` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `36+0.30/turn` (R² 0.85). I did not re-run the private canary.

## Actionable C-wrongs

None for Must-fix. Slip/helmet/lifsav order, cursed `rn2(3)`, wear-off `!rn2(2)`, helmet `rn2(8)` before `eat_brains`, and skipdrin-only-after-amulet match C `:2053–2093` / `:3204–3220`.

Named omits (map, not Must-fix):

1. mhitu `u_slip_free` / `uarmh && rn2(8)` / `eat_brains` vs hero
2. mhitm AD_DRIN helmet `misc_worn_check` / vis pline
3. AD_WRAP caller of `m_slips_free`
4. `mhis` canspotmon → its / `type_is_pname` (Hallu `rn2(4)` already live)

Do not Must-fix “`You()` vs `pline('You …')`.” Do not Must-fix `oc_skill` as `oc_armcat`. Do not Must-fix idle cloak/suit/shirt walk inside `m_slips_free`. Do not wrap `wildmiss` as `pline_mon`. Next Open after this SHA was candle `partly used` (now D-1308).

## Callers / RNG ledger

C: uhitm / mhitu / mhitm `mhitm_ad_drin`; AD_WRAP → `m_slips_free`. JS: uhitm headed only. Public fortress is not evidence a greased helm slipped.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: headed uhitm now slips greased/oilskin helm or bounces `rn2(8)` before `eat_brains`; monster-flayer and wrap callers stay named.
- Must-fix stays empty for this SHA; archive **Addressed:** D-1307 `b97b1fc6` already filled by the next port commit.
