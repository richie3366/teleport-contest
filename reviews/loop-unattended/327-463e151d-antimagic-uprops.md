# Review 327 — 463e151d — youprop.h Antimagic uprops[ANTIMAGIC] (D-1367)

## Metadata
- Full / short hash: `463e151d806e25ae0f9c68cb1f0e7e096b31393c` / `463e151d`
- Parent: `508abab3` (reviews **323–326** + cadence **#1735**). This file audits **this SHA only** (first of four `js/` commits since review **326**). Archive **Addressed:** D-1367 `463e151d` already has the short hash (filled by D-1368).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 14:14:12 +0200
- D-id: **D-1367**
- Stats: 11 files, +99 / −40 — `js/zap.js` +23 / −6 (`Antimagic()` + comments).
- Claims to close: Must-fix from review **324** — MAGIC_MISSILE bounce vs `d(4,6)` used a sticky-only clone. `reviews/loop-2026-08-15/` has no unpaid Antimagic Must-fix.
- JS / map: `zap.js` `Antimagic()`; callers `zapyourself` WAN/SPE_MAGIC_MISSILE + WAN_STRIKING `"Boing!"`. `c-js-map/turns.md` + `debt.md`. shieldeff / monstseesu / `spell.c` SPE_MAGIC_MISSILE still named.
- Prior reviews this SHA claims to close: **324** QUALITY-RISK Must-fix item 1. **326** named AD_ELEC as the next Open after lightdamage — this SHA popped Must-fix first (correct).

## Intent vs deliverable

Git subject promises: “Match C youprop.h Antimagic so a cloak of magic resistance actually bounces a self-aimed magic missile, instead of still rolling d(4,6).”

C `youprop.h:55–57`:

```
#define HAntimagic u.uprops[ANTIMAGIC].intrinsic
#define EAntimagic u.uprops[ANTIMAGIC].extrinsic
#define Antimagic (HAntimagic || EAntimagic)
```

C `zapyourself` (`zap.c:2790–2802`) `if (Antimagic)` bounce, else `d(4,6)`. Same macro gates WAN_STRIKING `:2715` `"Boing!"`. `confer_oc_oprop` writes cloak-of-MR / gray DSM **only** to `uprops[ANTIMAGIC].extrinsic` — it never mirrors `EAntimagic` (D-1089; `do_wear.js:262–289` still has no ANTIMAGIC flat).

Old JS: `u.Antimagic || HAntimagic || EAntimagic` only. Conferral cloak took Idiot + six dice.

The diff **does** OR `uprops[ANTIMAGIC].intrinsic||extrinsic`. It does **not** rewrite `confer_oc_oprop`. It does **not** port `shieldeff` / `monstseesu`. Named. The MAGIC_MISSILE **arm** is unchanged this SHA (D-1364).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `Antimagic()` | C `youprop.h:55–57`, **clone now matching** | sticky + H/E + uprops (D-1089 shape) |
| MAGIC_MISSILE arm | C `:2790–2802`, **pre-existing live** | predicate retouch only |
| WAN_STRIKING `"Boing!"` | C `:2715`, **pre-existing live** | same helper |
| `confer_oc_oprop` | C `do_wear.c`, **untouched** | extrinsic-only ANTIMAGIC |
| `d(4,6)` | C, **imported live** | only `!Antimagic()` |
| `shieldeff` / `monstseesu` | C `:2794–2796`, **named omit** | bounce sparkle |
| `spell.c` SPE_MAGIC_MISSILE | C dispatcher, **named omit** | still `"Nothing happens."` |
| sit/invent/teleport clones | C same macro, **other files** | already D-1089; not this SHA |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** none. Bounce now **skips** `d(4,6)` for conferral MR (six rolls C never burned).

## C ↔ JS fidelity

Helper after this SHA:

```
function Antimagic() {
    const u = game.u || {};
    const e = u.uprops?.[ANTIMAGIC];
    return !!((u.Antimagic || u.HAntimagic || u.EAntimagic)
        || (e?.intrinsic | 0) || (e?.extrinsic | 0));
}
```

C has no sticky `u.Antimagic` member — H/E **are** the uprops fields. The extra sticky OR is a superset (eat/poly flats). Conferral cloak/gray DSM now take the bounce arm: `learn_it`; `"The missiles bounce!"`; **zero** `d()`. Match `:2792–2796` minus shield/seen. Seeing hero with no bits still `d(4,6)` + two spaces after `Idiot!`. Match `:2798–2800`. WAN_STRIKING Boing vs `d(2,12)` uses the same predicate. Match `:2715`.

`confer_oc_oprop` untouched — review **324** forbade rewriting it. The helper now reads the field confer actually writes. That is the Must-fix.

Hallucination check: “Match C `youprop.h` Antimagic” while **`shieldeff` is omitted** is an overclaim on **sparkle**. The **predicate is not a stub** that still misses conferral. Do **not** stamp “Match C `shieldeff`.” Do **not** stamp “Match C `spelleffects` SPE_MAGIC_MISSILE.” Do **not** stamp “Match C sit.js `Antimagic`” as this SHA (already D-1089).

## Hallucinations / overclaim

Subject says a cloak of MR bounces a self-aimed magic missile instead of rolling `d(4,6)`. **True for conferral-only ANTIMAGIC** (cloak, gray DSM) and for sticky H/E. **False for `#cast` SPE_MAGIC_MISSILE** until `spelleffects` stops dropping other otyps. D-log “Did not rewrite confer” is honest. Stamping **Addressed:** D-1367 for the helper is fair. Do **not** treat fortress PASS as `"The missiles bounce!"`.

## Density

One youprop helper plus the two zap callers already on it. ~23 lines. Playbook §2b Must-fix pop — right size. Did not glue AD_ELEC (next Open at this SHA). Did not retouch sit/invent clones (already D-1089). Consecutive thin zap peels after this SHA are later-review density notes.

## Branch-by-branch confirm

1. Cloak of MR, `EAntimagic===0`, uprops extrinsic set: bounce; no `d(4,6)`. Match C macro. **This was 324’s C-wrong.**
2. Gray DSM conferral: same. Match.
3. Sticky `HAntimagic` / `EAntimagic` without uprops: bounce. Match (superset).
4. No bits: `d(4,6)` + Idiot two spaces; `dozap` `losehp`. Match `:2798–2800`.
5. WAN_STRIKING conferral MR: `"Boing!"`; no `d(2,12)`. Match `:2715`.
6. SPE_MAGIC_MISSILE same case if `zapyourself` is called. `spelleffects` still drops it. Named.
7. `learn_it` always, including bounce. Match.
8. `shieldeff` / `monstseesu` still absent. Named.
9. `confer_oc_oprop` still extrinsic-only. Required.
10. **Public-unhit** unless a session self-zaps missile/striking under conferral MR.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `ANTIMAGIC` is the `const.js` prop index, not a recorded coordinate. Plain ESM. The extra sticky OR is not a trace index.

## Verification

Journal: private canary **22**/22 (C macros; confer cloak/gray DSM bounce no `d(4,6)` with `EAntimagic` still 0; sticky H still bounce; seeing no-bits still Idiot; SPE cloak; WAN_STRIKING Boing!; MAKE_INVISIBLE still default; lightning regression; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** on conferral bounce. This audit cadence: full `sessions` at HEAD `90eca343` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `37+0.30/turn` (R² 0.84). I did not re-run the private canary. Fortress PASS is not a missile self-zap under a cloak of MR.

## Actionable C-wrongs

None for Must-fix on **this** SHA. The helper now reads the field confer writes. Remaining bounce sparkle is a named omit of **other** functions.

Named omits (map / Open, not Must-fix):

1. `shieldeff` / `monstseesu` / `monstunseesu` on MAGIC_MISSILE
2. `spell.c` `spelleffects` SPE_MAGIC_MISSILE dispatcher
3. `maybe_destroy_item` AD_ELEC (shipped next SHA as D-1368 — see review **328**)
4. pray/muse/explode `Antimagic()` clones in other files (already D-1089-shaped where ported)

Do not Must-fix “skip `learn_it` on bounce” (C always learns). Do not Must-fix “rewrite `confer_oc_oprop` to set `EAntimagic`.” Do not Must-fix “drop the sticky OR” (eat/poly flats; C has one storage).

## Callers / RNG ledger

C: RNG only `d(4,6)` on `!Antimagic`. JS: same **iff** the predicate matches. Conferral cloak no longer burns six extra rolls. Public fortress is not a self-aimed missile.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: conferral cloak-of-MR now bounces with no dice; sparkle and spell dispatch stay named.
- Must-fix stays empty for this SHA (the 324 item is shipped).
