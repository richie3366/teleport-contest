# Review 745 — 24ced3ef — mondata.c pronoun_gender / you.h mhe (D-1776)

## Metadata
- Full / short hash: `24ced3ef1b23ae136202a37cc12c756a9cb581ea` / `24ced3ef`
- Parent: `b4d526e9` (D-1775). **Re-audit** of review **735** (ACCEPT-WITH-DEBT). Independent pinned-C walk.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-03 17:37:09 +0200
- D-id: **D-1776**
- Stats: `js/mondata.js` +67; eight files lose local `mhe`/`mhim`/`mhis` clones. Total `js/` insertions **103** ≤250. Band **150–350**.
- Claims to close: Open `pronoun_gender` after D-1763. Not `apply.c` corpse `PRONOUN_NO_IT` `:230–248`. Not `do_name.c` `mon_nam_too`. Review **724** named clones.
- JS / map: `mondata.js` one home; `c-js-map/data.md` / `turns.md`.
- Archive **Addressed:** D-1776 `24ced3ef`. `end.c` DUMPLOG retirement is this SHA’s docs note (build-config, not a JS stub).

## Intent vs deliverable

Git subject promises: Match C `mondata.c` `pronoun_gender` so `mhe`/`mhim`/`mhis` and `noit_*` draw Hallu `rn2(4)` from one C-faithful port, instead of eight local clones that dropped the roll or the visibility gates.

`node scripts/csym.mjs pronoun_gender` → `mondata.c:1188–1207`. Hallu `rn2(4)` **first**. `PRONOUN_NO_IT` overrides only `canspotmon`, not neuter/humanoid. `you.h:317–331` macros. Callers include `apply.c:238` `PRONOUN_NO_IT` (named omit).

Parent: eight clones; some skipped Hallu, some skipped `canspotmon`. The diff **does** put one body in `mondata.js`, delete those eight exact-name clones, and wire shk `getcad`/partial-pay. It **does not** port `apply.c:230–248`. Named. Suffixed leftovers (`mhis_mtoss`, `mhis_leash`, …) remain.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `pronoun_gender` | LIVE new | `:1188–1207`; Hallu first |
| `mhe`/`mhim`/`mhis`/`noit_*` | LIVE new | `you.h` macros |
| eight exact-name clones | deleted | Keep |
| `apply.c:238` `PRONOUN_NO_IT` | OMIT named | |
| suffixed `mhis_*` / `mhe_*` | CLONE leftover | mthrowu/mhitm/apply/monmove |
| DUMPLOG `end.c` | retired | macosx-minimal has no `-DDUMPLOG` |

`node scripts/sym.mjs`:

```
pronoun_gender   js/mondata.js   sync
mhe              js/mondata.js   sync
mhim             js/mondata.js   sync
mhis             js/mondata.js   sync
noit_mhe         js/mondata.js   sync
fountain.js re-exports mhe/mhis from mondata.js (not body #2)
```

FORCE/DIAG/`getRngLog`/`fastforward`/seed names: **none**. Rule #2 **clean**.

## C ↔ JS fidelity

**`pronoun_gender` (`:1188–1207`).** If Hallu (unless `PRONOUN_NO_HALLU`): **`rn2(4)` first** — 0/1/2/3 → it/he/she/it. Then if not `canspotmon` and not `PRONOUN_NO_IT`: it. Then neuter/humanoid/female. JS draws `rn2(4)` before either gate. **Match RNG order.** `PRONOUN_NO_IT` does **not** skip Hallu and does **not** force gender on neuters. **Match.** Drawing `rn2(4)` after `canspotmon` would be a live C-wrong; this SHA does not.

**Macros (`you.h:317–331`).** `mhe(mtmp)` → `pronoun_gender(mtmp, 0)` etc. `noit_*` passes `PRONOUN_NO_IT`. JS the same. **Match.**

**Deleted clones.** shk ternary / mthrowu `'it'` / vault no-Hallu were the RNG-wrong three. Retiring them is the Keep. fountain.js re-exports from mondata.js (not body #2).

**Leftover suffixed clones.** `sym.mjs` only sees exact names. `mhis_mtoss` (Hallu `rn2(4)` then female ternary, no `canspotmon`/neuter), `mhis_disp`, `mhis_leash`, `mhis_apply`, `mhis_yell`, `mhe_grow` still exist. They can still burn gameplay `rn2(4)` off the single port. Named debt, not this SHA’s claimed eight. Do **not** write `pronoun_gender` body #2 — import.

**`apply.c:238`.** “He’s dead, Jim.” `PRONOUN_NO_IT` still absent. Named. Open row remains.

**DUMPLOG.** macosx-minimal has no `-DDUMPLOG`. Do **not** re-enqueue. `DUMPLOG_CORE` `saved_plines[]` is write-only (reader is `report.c` crash path).

**Callee closure.** LIVE: `rn2`, `canspotmon`, humanoid/neuter. OMIT named: apply corpse arm. STUB: **none** in the new macros.

## Hallucinations / overclaim

Subject “eight local clones” is true for exact `mhe`/`mhim`/`mhis` names. It is **not** true that every pronoun helper is gone. Review **735** holds if read as exact-name clones. Do **not** stamp “Match C `apply.c` `PRONOUN_NO_IT`.” Do **not** stamp “DUMPLOG is deferred” — it is **retired** (no `-DDUMPLOG` in scored C). Do **not** draw `rn2(4)` after `canspotmon`.

## Density

§2b: one C function + the macros + clone deletion. +103. Did **not** glue apply corpse / `mon_nam_too`.

## Verification

D-log: green+strict; fortress; Hallu probe of `rn2(4)` first. Rule #2 clean. Apply `PRONOUN_NO_IT` **public-unhit**. Admit that.

## Actionable C-wrongs

None for Must-fix. Named: `apply.c:238` `PRONOUN_NO_IT`; leftover `mhis_*`/`mhe_*` clones (import, do not clone the body). Do **not** skip Hallu `rn2(4)` when `PRONOUN_NO_IT`.
Do **not** re-enqueue DUMPLOG.
Do **not** write `pronoun_gender` body #2 — import `js/mondata.js`.
fountain.js re-exports `mhe`/`mhis` (not a second body).
Hallu probe of `rn2(4)` first was this SHA’s private check;
apply `PRONOUN_NO_IT` remains public-unhit.

**Pinned-C walk this overlay.**
`csym.mjs pronoun_gender` → `mondata.c:1188–1207`.
Hallu `rn2(4)` is the **first** statement (unless `PRONOUN_NO_HALLU`).
0/1/2/3 → it/he/she/it.
Then `!canspotmon && !PRONOUN_NO_IT` → it.
Then neuter/humanoid/female.
`PRONOUN_NO_IT` does not skip Hallu.
`you.h:317–331` macros: `mhe` flag 0, `noit_*` passes `PRONOUN_NO_IT`.
Eight exact-name clones deleted; suffixed `mhis_mtoss` / `mhis_leash`
/ `mhe_grow` remain and can still draw `rn2(4)`.
`apply.c:238` corpse “He’s dead, Jim.” still absent.
DUMPLOG retired (no `-DDUMPLOG` in macosx-minimal).
Rule #2 clean.

Verdict: **ACCEPT-WITH-DEBT**
