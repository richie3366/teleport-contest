# Review 723 — ac94ec34 — sounds.c maybe_gasp (D-1762)

## Metadata
- Full / short hash: `ac94ec34d298d44e208ab608461446dfd2f83259` / `ac94ec34`
- Parent: `45bb8ff3` (D-1761). This file audits **this SHA only** (fifth of nine `js/` commits since review **718**). Archive **Addressed:** D-1762 `ac94ec34`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-03 05:06:37 +0200
- D-id: **D-1762**
- Stats: `js/sounds.js` +97/−. Total `js/` insertions **97** <250. Band **150–350**.
- Claims to close: Open `maybe_gasp` after D-1761 / review **713** (named `beg`/`maybe_gasp`). Not `beg`. Not `peacefuls_respond`. `reviews/loop-2026-08-15/` has no unpaid maybe_gasp Must-fix.
- JS / map: `sounds.js` `maybe_gasp` + remaining `MS_*`. `c-js-map/data.md`.
- Prior: **713** named maybe_gasp; **722** did not glue it.

## Intent vs deliverable

Git subject promises: `sounds.c` `maybe_gasp` so Exclam `ROLL_FROM`/`NULL` after guardian/priest/angel rewrite and the msound switch instead of omitting the helper after D-1761.

`node scripts/csym.mjs maybe_gasp` → **NOT FOUND** (definition is `const char *` then newline then `maybe_gasp(` at `sounds.c:545–610`). `--callers maybe_gasp`: `mon.c:4188` (`peacefuls_respond`); `extern.h:3005`. `peacefuls_respond` `mon.c:4162–4257` (from `setmangry`). `p_coaligned` `priest.c:369–373` (callers include `sounds.c:557`/`:561`). `mon_aligntyp` `priest.c:279–289`. `has_emin`/`EMIN` `mextra.h:222`/`:231`. `ROLL_FROM` `hack.h:1493` `array[rn2(SIZE(array))]`. `MS_*` `monflag.h:10–59`.

```555:609:nethack-c/upstream/src/sounds.c
    if ((msound == MS_GUARDIAN && mptr != &mons[gu.urole.guardnum])
        || (msound == MS_PRIEST && !p_coaligned(mon)))
        msound = MS_SILENT;
    else if (msound == MS_CUSS && has_emin(mon)
           && (p_coaligned(mon) ? !EMIN(mon)->renegade : EMIN(mon)->renegade))
        msound = MS_HUMANOID;
    switch (msound) {
    case MS_HUMANOID: ... case MS_IMITATE:
        dogasp = TRUE; break;
    case MS_ORC: ... case MS_SPELL:
        dogasp = (mptr->mlet == gy.youmonst.data->mlet); break;
    default:
        break;
    }
    if (dogasp)
        return ROLL_FROM(Exclam);
    return (const char *) 0;
```

Parent: no `maybe_gasp`; `setmangry` comments omit `peacefuls_respond`. The diff **does** port the C body (Exclam 5, rewrite, switch, `rn2(5)`), import `p_coaligned`/`has_emin`/`EMIN`, add missing `MS_*` locals matching `monflag.h`. It **does not** wire `peacefuls_respond` into `setmangry` (would add `!rn2(5)` attack RNG). Named. It **does not** port `beg`. Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `maybe_gasp` `:545–610` | LIVE new | body ports C; no production caller |
| `Exclam[]` | LIVE table | 5 strings, same order |
| `ROLL_FROM` | CLONE inlined | `Exclam[rn2(SIZE)]`; SIZE=5 |
| `p_coaligned` | LIVE import | priest.js; see fidelity |
| `has_emin` / `EMIN` | LIVE import | const.js |
| `MS_*` locals | LIVE consts | match `monflag.h` 0–44 |
| `peacefuls_respond` | OMIT named | NOT FOUND |
| `beg` | OMIT named | next Open |

`node scripts/sym.mjs`:

```
maybe_gasp       js/sounds.js:498   sync
p_coaligned      js/priest.js:117   sync  (mklev.js still clones — do not write #3)
has_emin         js/const.js:3109   sync
EMIN             js/const.js:3101   sync
ROLL_FROM        NOT FOUND (inlined)
peacefuls_respond NOT FOUND
```

Re-points: none deleted. New: `maybe_gasp`, `p_coaligned` import, `MS_LAUGH`…`MS_SPELL`. `node scripts/imports.mjs --can sounds.js priest.js p_coaligned`: **ALREADY**. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: **none**. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**Exclam (`:548–550`).** `"Gasp!"` `"Uh-oh."` `"Oh my!"` `"What?"` `"Why?"`. JS the same 5. **Match.**

**Guardian/priest rewrite (`:555–558`).** Other-role `MS_GUARDIAN` (`mptr != &mons[urole.guardnum]`) or `MS_PRIEST && !p_coaligned` → `MS_SILENT`. JS `mndx !== guardnum` because `mons()` is a fresh permonst (same as `reset_hostility`). **Match the predicate.**

**Angel CUSS (`:559–562`).** `MS_CUSS && has_emin && (p_coaligned ? !renegade : renegade)` → `MS_HUMANOID`. LIVE `has_emin`/`EMIN`. **Match the emin test.**

**Always-gasp switch (`:568–582`).** HUMANOID, ARREST, SOLDIER, GUARD, NURSE, SEDUCE, LEADER, GUARDIAN, SELL, ORACLE, PRIEST, BOAST, IMITATE. JS the same cases. **Match.**

**Same-`mlet` (`:584–595`).** ORC, GRUNT, LAUGH, ROAR, BELLOW, DJINNI, VAMPIRE, WERE, SPELL → `mptr->mlet == youmonst.data->mlet`. JS `mptr.mlet === youmonst?.data?.mlet`. **Match.**

**Never (`:597–604`).** BRIBE, CUSS, RIDER, NEMESIS, SILENT, default. **Match.**

**`ROLL_FROM` (`:607`).** `rn2(SIZE(Exclam))` = `rn2(5)`. Comment in C still has the unused `m_id % SIZE` idea; JS uses `rn2` like the live line. **Match call-for-call.** Not wired, so public sessions do not burn this `rn2`.

**`MS_*` numbers.** Added locals `MS_LAUGH=20` … `MS_SPELL=42` match `monflag.h`. Pre-existing SILENT..GROAN already matched. **Match.** Did not change `domonnoise` dispatch.

**`p_coaligned` (`priest.c:369–373`).** C `u.ualign.type == mon_aligntyp(priest)`. `mon_aligntyp` `:279–289`: ispriest `EPRI.shralign`, isminion `EMIN.min_align`, else `maligntyp`, then A_NONE or sign-compress. JS priest.js uses `EPRI?.shralign` else `maligntyp` — **no isminion `min_align`, no sign-compress.** Pre-existing priest.js body; this SHA did not rewrite it. CUSS emin angels would need `mon_aligntyp` when `peacefuls_respond` is wired. Not a live public path this SHA.

**Caller (`mon.c:4188`).** Inside `peacefuls_respond`, humanoid/shk/priest, not watch: `!Deaf && !rn2(5)` then `maybe_gasp`. JS `setmangry` still comments the omit. **Match the named deferral.** Wiring it would add attack-time `rn2(5)` — do **not** glue that in this Open.

**RNG.** Body: `rn2(5)` only on `dogasp`. Unwired → zero public burns. seed0006 still PASS at this SHA (bisect). **Match.**

**Callee closure.** LIVE: `p_coaligned` (import), `has_emin`, `EMIN`, `rn2`/`SIZE`. CLONE verified: Exclam table; `ROLL_FROM` inline. OMIT named: `peacefuls_respond` / MS_ARREST Halt; `beg`. STUB: **none**. Not “dispatch ported, callee stubbed” — the helper is live and unused, which is what C looks like until `setmangry` calls `peacefuls_respond`.

## Hallucinations / overclaim

Subject “Exclam ROLL_FROM/NULL after guardian/priest/angel rewrite and msound switch”: **true** for the helper. D-log “did not wire `peacefuls_respond`”: **true**. Do **not** stamp “Match C `peacefuls_respond`.” Do **not** stamp “Match C `mon_aligntyp` isminion/sign.” Do **not** stamp “Match C `beg`.” Journal “fortress held” is not a gasp screen. **Public-unhit.** Admit that. Cadence FAILs start at D-1765, not here.

## Density

§2b: one C function (`maybe_gasp`) + the `MS_*` ids the switch needs. +97. Did **not** glue `peacefuls_respond`/`beg`. Did **not** re-port D-1761.

## Verification

D-log: save-oracle skip (untagged `sounds.c:maybe_gasp`); node canary (HUMANOID/`MS_*` gasp `rn2(5)`; SILENT/RIDER/BRIBE null; own vs other GUARDIAN; priest EPRI co/cross; CUSS emin renegade; same-mlet vs not); green+strict seed8000/0900; CURRENT cohort **7**/7 + strict. Rule #2 clean. `maybe_gasp` **public-unhit**. Admit that. Focused seed0006 at this SHA: **PASS**.

## Actionable C-wrongs

None for Must-fix (`maybe_gasp` body matches C; remaining named). Named: `peacefuls_respond` / MS_ARREST Halt; `beg`; priest `mon_aligntyp` isminion/sign when that caller is wired. Do **not** add `maybe_gasp` #2. Do **not** `setmangry`→`peacefuls_respond` in the same peel as this helper. Do **not** rewrite `p_coaligned` here. Do **not** use `m_id % 5` instead of `rn2(5)`.

Verdict: **ACCEPT-WITH-DEBT**
