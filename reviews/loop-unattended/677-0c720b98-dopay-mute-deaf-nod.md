# Review 677 — 0c720b98 — shk.c dopay mute/Deaf thank-you nod (D-1716)

## Metadata
- Full / short hash: `0c720b98da08361e9d7be3ce7be338c0e2ca7639` / `0c720b98`
- Parent: `a197ef44` (D-1715). This file audits **this SHA only** (ninth of nine `js/` commits since review **668**). Archive **Addressed:** D-1716 (this audit fills `0c720b98`).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-30 06:59:47 +0200
- D-id: **D-1716**
- Stats: `js/shk.js` +23/−9. Total `js/` insertions **14** <250. Band **150–350**. C envelope is ~15 lines — density floor does not apply.
- Claims to close: Open mute/Deaf thank-you nod after D-1715 skipped the else. Not getpos (D-1704). Not `remote_burglary`. `reviews/loop-2026-08-15/` has no unpaid dopay-nod Must-fix.
- JS / map: `shk.js` `dopay` tail. `c-js-map/turns.md`.
- Prior: none written; D-1715 named this Open.

## Intent vs deliverable

Git subject promises: Deaf or muteshk heroes get a nod after a successful pay, instead of skipping the else after D-1715.

`node scripts/csym.mjs` `dopay` thank-you is `shk.c:2010–2028`. `Deaf` `youprop.h:125`. `muteshk` `shk.c:58`. `Shknam` `shknam.c:842–850`. `noit_mhis` `you.h:330–331`. `--callers muteshk` include `:2012`.

```2010:2027:nethack-c/upstream/src/shk.c
    /* {mute shk,deaf hero}-aware thank you message */
    if (pay_done && !ANGRY(shkp) && paid) {
        if (!Deaf && !muteshk(shkp)) {
            SetVoice(shkp, 0, 80, 0);
            verbalize("Thank you for shopping in %s %s%s",
                      s_suffix(shkname(shkp)),
                      shtypes[eshkp->shoptype - SHOPBASE].name,
                      !eshkp->surcharge ? "!" : ".");
        } else {
            pline("%s nods%s at you for shopping in %s %s%s",
                  Shknam(shkp), !eshkp->surcharge ? " appreciatively" : "",
                  noit_mhis(shkp), shtypes[eshkp->shoptype - SHOPBASE].name,
                  !eshkp->surcharge ? "!" : ".");
        }
    }
    if (paid)
        update_inventory();
```

Parent: hearing verbalize only; Deaf as `u.Deaf \|\| HDeaf \|\| EDeaf` (no roleplay); no else nod; no tail `update_inventory`. The diff **does** else nod via `hero_deaf()`/`muteshk`; surcharge `appreciatively` / bang; `if (paid) update_inventory()`. It **does not** call `SetVoice`. Named (NOT FOUND; SOUNDLIB no-op).

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `dopay` thank-you | LIVE repaired | both arms + paid inventory |
| `hero_deaf` | CLONE local | youprop + sticky `u.Deaf`. Do **not** add #2 |
| `muteshk` | LIVE local | helpless / `msound <= MS_ANIMAL` |
| `Shknam` | LIVE import | `shknam.js:467` |
| `noit_mhis` | CLONE local | female her/his; C `pronoun_gender` Hallu. Do **not** add #2 |
| `s_suffix` | CLONE local | `do_name.js` already exports — do **not** add #8 |
| `verbalize` / `pline` | LIVE | |
| `update_inventory` | LIVE import | C `:2026–2027` |
| `SetVoice` | OMIT named | NOT FOUND |

`node scripts/sym.mjs`:

```
dopay            js/shk.js:4633   ASYNC
hero_deaf        NOT EXPORTED — 1 LOCAL js/shk.js:1134
muteshk          NOT EXPORTED — 1 LOCAL js/shk.js:195
Shknam           js/shknam.js:467   sync
noit_mhis        NOT EXPORTED — 1 LOCAL js/shk.js:173
s_suffix         js/do_name.js:363   sync  (+ shk.js local — IMPORT later, not this peel)
verbalize        js/display.js:4880   ASYNC
update_inventory js/invent.js:3893   sync
SetVoice         NOT FOUND
```

No clone→import re-point this SHA (`hero_deaf`/`muteshk`/`Shknam` already in `dopay`’s file). `--can js/shk.js js/shknam.js Shknam`: **ALREADY**. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: none. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**Gate.** C `pay_done && !ANGRY && paid`. JS unchanged. **Match `:2011`.**

**Hearing arm.** C `!Deaf && !muteshk` then `SetVoice` then `verbalize("Thank you for shopping in %s %s%s", s_suffix(shkname), shop name, bang)`. JS skips SetVoice (named) then the same verbalize. Bang: `surcharge ? '.' : '!'` ≡ C `!surcharge ? "!" : "."`. **Match the spoken string.** `muteshk`: helpless or `msound <= MS_ANIMAL`; JS fills missing table `msound` as `MS_SELL` for `isshk`. Shopkeepers who can talk stay un-mute. **Match `:58` for live shk.**

**Deaf.** C `youprop.h:125` is `HDeaf \|\| EDeaf \|\| u.uroleplay.deaf` — **no** sticky `u.Deaf`. Parent missed roleplay. JS `hero_deaf()` adds roleplay **and** still tests sticky `u.Deaf`. Extra JS true → nod when only sticky is set. Same conservative sticky used elsewhere in `shk.js`; not a new Must-fix. Roleplay path **Match C**.

**Nod else.** C `Shknam` + (`!surcharge ? " appreciatively" : ""`) + `noit_mhis` + shop + bang. JS template the same (`nods` empty vs ` appreciatively`). **Match `:2018–2022`.** `Shknam` LIVE capitalizes `shkname`. `noit_mhis` JS is sex-only; C `pronoun_gender(..., PRONOUN_NO_IT\|PRONOUN_HALLU)`. Hallu “it”/other **named clone**, not this peel’s C-wrong. Female `her` matches the canary.

**`update_inventory`.** C after the thank-you, if `paid`. Parent omitted. JS added. **Match `:2026–2027`.** `menu_requested = false` already.

No RNG in this envelope (`angrytexts` `rn2` is a different site).

**Callee closure.** LIVE: `muteshk`, `Shknam`, `verbalize`, `pline`, `shkname`, `shtypes`, `update_inventory`. CLONE: `hero_deaf`, `noit_mhis`, `s_suffix` (pre-existing locals). OMIT named: `SetVoice`. STUB: **none**. Not “dispatch ported, callee stubbed” — the else was missing, not stubbed.

## Hallucinations / overclaim

Subject “Deaf or muteshk heroes get a nod … instead of skipping the else”: **true**. D-log “SetVoice remains named”: **true** (NOT FOUND). Do **not** stamp “Match C `SetVoice`.” Do **not** stamp “Match C `pronoun_gender` Hallu.” Do **not** add `hero_deaf` #2. Do **not** import `s_suffix` in this peel (pre-existing local). Do **not** restore hearing-only. Journal “fortress held” is not a nod-string proof.

## Density

§2b: one `dopay` thank-you else + the `paid` `update_inventory` C places next. Related. +14. C is that small. Did not glue `remote_burglary`.

## Verification

D-log / journal: save-oracle skip (untagged `dopay`); canary 8/8 (hearing; HDeaf / roleplay / sticky / `MS_ANIMAL` nod; surcharge period; female her; angry skip); green+strict; focused seed0383/0116; cohort 8/8. Public shop pay **is** hit (hearing verbalize). Deaf/muteshk nod **public-unhit**. Admit that. Canaries are the else-arm check.

## Actionable C-wrongs

None for Must-fix. Named: `remote_burglary`; gem glass pseudo-ID; `arti_cost`; Hallu currency; `SetVoice`; `noit_mhis` Hallu pronouns; `s_suffix` local vs `do_name.js`. Do **not** add `SetVoice` #1 without SOUNDLIB. Do **not** add `hero_deaf` #2. Do **not** skip `update_inventory` when `paid`. Do **not** put the nod inside the hearing `if`. Do **not** use sticky-only Deaf and drop `uroleplay.deaf`.

Verdict: **ACCEPT-WITH-DEBT**
