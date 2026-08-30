# Review 681 — 7381e463 — invent.c currency Hallu ROLL_FROM (D-1720)

## Metadata
- Full / short hash: `7381e4638a3ceffd00a0531b381a24d3d3508975` / `7381e463`
- Parent: `7466d184` (D-1719). This file audits **this SHA only** (fourth of nine `js/` commits since review **677**). Archive **Addressed:** D-1720 `7381e463`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-30 08:07:41 +0200
- D-id: **D-1720**
- Stats: `js/invent.js` +42/−9; `objnam.js` +4/−3; `dokick.js` +2/−4; `trap.js` +3/−7; `dig.js`/`lock.js` +1/−1; `shk.js` omit-comment. Total `js/` insertions **53** <250. Band **150–350**.
- Claims to close: Open Hallu `currency` ROLL_FROM after D-1719 / review **680**. Not `hidden_gold`. Not `artifact_score`. `reviews/loop-2026-08-15/` has no unpaid currency Must-fix.
- JS / map: `invent.js` `currency`; callers `xprname` / wallet / dokick/dig/lock/trap. `c-js-map/turns.md`.
- Prior: **680** named this.

## Intent vs deliverable

Git subject promises: Hallucination uses `ROLL_FROM(currencies[])` instead of always zorkmid.

`node scripts/csym.mjs currency` → `invent.c:1545–1554`. `currencies[]` `:1521–1543` (21 strings). `hack.h:1493` `ROLL_FROM(array) array[rn2(SIZE(array))]`. `youprop.h:120` `Hallucination` = `HHallucination && !Halluc_resistance`. `--callers`: 66 (xprname, doprgold, insight wallet, shk, dokick, dig, lock, trap, end, …). `shk.c:4070–4071` traded/relinquish stays hardcoded `zorkmid%s`.

```1545:1554:nethack-c/upstream/src/invent.c
const char *
currency(long amount)
{
    const char *res;

    res = Hallucination ? ROLL_FROM(currencies) : "zorkmid";
    if (amount != 1L)
        res = makeplural(res);
    return res;
}
```

Parent: `currency()` always `'zorkmid'` + `makeplural`; `xprname` local zorkmid; dokick/dig/lock/trap local `(amt===1)?'zorkmid':'zorkmids'`. The diff **does** the 21-string table + `Hallucination()? CURRENCIES[rn2(n)] : 'zorkmid'` + `amount!=1` `makeplural`; re-points those clones to the export; wallet/`doprgold`/`xprname` use it. It **does not** port `hidden_gold` / `shopper_financial_report` on `$`. Named. It **does not** change `shk_names_obj` `zorkmid%s`. That **matches C**.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `currency` | LIVE repaired | ROLL_FROM then plural |
| `currencies[]` | LIVE local const | 21 strings, C order |
| `Hallucination` | LIVE import | `display.js:370` C-locus |
| `rn2` | LIVE import | `rng.js:66` |
| `makeplural` | LIVE import | `objnam.js:1514` |
| `xprname` Iu/Ix | LIVE repaired | was local zorkmid |
| dig/dokick/lock/trap clones | deleted | import the export |
| `shk_names_obj` zorkmid%s | LIVE C-match | **not** `currency()` |
| `hidden_gold` / `shopper_financial_report` | OMIT named | `$` stash / shop report |
| `artifact_score` currency | OMIT named | `end.c:933` |

`node scripts/sym.mjs`:

```
currency         js/invent.js:1156   sync
Hallucination    js/display.js:370   sync  (+ do_name export; 8 locals — IMPORT)
makeplural       js/objnam.js:1514   sync
rn2              js/rng.js:66   sync
hidden_gold      3 LOCAL clones (end/shk/vault) — do NOT write #4
shopper_financial_report NOT FOUND
```

Re-points: local zorkmid helpers in `dig.js`/`dokick.js`/`lock.js`/`trap.js`/`objnam.js` `xprname` → import `currency`. `--can js/objnam.js js/invent.js currency` / `dig` / `lock` / `trap` / `dokick`: **ALREADY** (modules already imported `invent.js`; this SHA adds the specifier, except objnam which **gains** the `invent.js` edge). `invent.js` already imports `xprname` from `objnam.js` — new edge completes a cycle. `currency` is used **inside** `xprname` / bury/kick/chest functions, not at module top level. No TDZ. Cycle is not a blocker. Do **not** add `currency` #2. Do **not** add `Hallucination` #9. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: none. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**Table (`:1521–1543`).** Walked all 21 C strings vs JS `CURRENCIES`: Altarian Dollar, Ankh-Morpork Dollar, auric, buckazoid, cirbozoid, credit chit, cubit, Flanian Pobble Bead, fretzer, imperial credit, Hong Kong Luna Dollar, kongbuck, nanite, quatloo, simoleon, solari, spacebuck, sporebuck, Triganic Pu, woolong, zorkmid. Same order, same spelling (including spaces / Hitchhiker capitals). `SIZE` 21 ≡ `.length`. **Match.**

**ROLL_FROM / Hallu.** C `Hallucination ? array[rn2(SIZE)] : "zorkmid"`. JS `Hallucination() ? CURRENCIES[rn2(CURRENCIES.length)] : 'zorkmid'`. Import is `display.js:370`: `HHallucination \|\| uprops[HALLUC].intrinsic` then `!Halluc_resistance` (no sticky `u.Hallucination` — D-1493). **Match `youprop.h:120`.** One `rn2(21)` only when Hallu; sober path **no** RNG. **Match `hack.h:1493`.**

**Plural.** C `amount != 1L` then `makeplural(res)`. JS `Number(amount) !== 1`. `0` and `2` plural; `1` singular. **Match `:1551–1552`.** `makeplural` LIVE.

**`xprname` (`invent.c:2932–2933`).** C `currency(cost)` for the Iu/Ix column. Parent hardcoded zorkmid. JS `currency(costn)`. **Match.** That is the billed unpaid menu path public seeds **can** hit if Hallu is on; typically **public-unhit** for the roll.

**Wallet / `$`.** C `doprgold` `:4519–4536` uses `currency(umoney)` **and** `hidden_gold` stash / `currency(total)` / `shopper_financial_report()`. JS swapped the umoney zorkmid string only. `hidden_gold` / shop report still named in the `doprgold` comment (`invent.js:5484`). Insight `enlightenment` `:787–788` and `doattributes` wallet now call `currency` — **Match those C sites** for the known-gold clause.

**Clone retirement.** C `dig.c:2079` / `lock.c:209` / `dokick.c` credit+damage / `trap.c` chest owe all call `currency()`. JS deleted the 1/`zorkmids` locals and imported. **Match those call sites.** `dokick` ghitm credit pline now `currency(credit)` vs C `:342`. **Match.**

**`shk_names_obj` (`shk.c:4068–4072`).** C **hardcodes** `zorkmid%s` in the traded/relinquish format strings, explicitly not `currency()` (Hallu would burn `rn2(21)` inside a shop name). JS the same fmt. Do **not** “fix” that to `currency()`.

```4068:4072:nethack-c/upstream/src/shk.c
            shk_names_obj(shkp, obj,
                          ((gs.sell_how != SELL_NORMAL)
                           ? "traded %s for %ld zorkmid%s in %scredit."
                    : "relinquish %s and acquire %ld zorkmid%s in %scredit."),
```

**`Hallucination` import.** C `youprop.h:120` is the timeout ∧ !resist macro, not a sticky `u.Hallucination` boolean. JS `display.js:370` already matches that (D-1493). This SHA imports that export into `invent.js`. Do **not** add `Hallucination` #9 as `!!u.Hallucination`.

**Callee closure (`currency`).** LIVE: `Hallucination`, `rn2`, `makeplural`. CLONE: none (table is the C array). OMIT named: `hidden_gold` `$` clause; other C callers (detect/end/minion/pickup/priest/rumors). STUB: **none**. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject “Hallucination uses ROLL_FROM(currencies[]) instead of always zorkmid”: **true** for `currency()` and the callers this SHA re-pointed. Do **not** stamp “Match C `doprgold` `hidden_gold` `:4522–4526`.” Do **not** stamp “Match C `shopper_financial_report`.” Do **not** stamp “Match C `shk_names_obj` uses currency” — C does **not**. Journal “fortress held” is not a Hallu `rn2(21)` proof. Public sober shop text still says zorkmid(s) — that **is** C.

## Density

§2b: `currency` + the C array + the JS clones that were a second `currency`. One family. +53. Did not glue `hidden_gold` / `artifact_score` / `getdir`.

## Verification

D-log / journal: save-oracle skip (untagged; they wrote `shk.c:currency` — C home is `invent.c`); focused seed0116/0383; green+strict; CURRENT cohort **9**/9 + strict. Public **is** hit for sober `currency()` (zorkmid). Hallu `rn2(21)` **public-unhit** unless a seed is hallucinating at a billed pline. Admit that.

## Actionable C-wrongs

None for Must-fix. Named: `doprgold` `hidden_gold` + `shopper_financial_report` (`invent.c:4511–4536`); `end.c` `artifact_score` `currency(value)`; remaining C callers (detect/dogmove/mhitu/minion/pickup/priest/rumors); `getdir` yn_function (next). Do **not** add `currency` #2. Do **not** add `Hallucination` #9. Do **not** wire `shk_names_obj` through `currency()` (C hardcodes zorkmid). Do **not** restore always-zorkmid. Do **not** `rn2` on the sober path. Do **not** use sticky-only `u.Hallucination` here (C is timeout ∧ !resist). Do **not** drop trailing `"zorkmid"` from the table (it is a Hallu roll, not the sober default).

Verdict: **ACCEPT-WITH-DEBT**
