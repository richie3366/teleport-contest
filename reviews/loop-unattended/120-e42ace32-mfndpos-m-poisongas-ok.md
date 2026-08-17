# Review 120 — e42ace32 — mon.c `m_poisongas_ok` mfndpos vamp/eel/breath (D-1159)

## Metadata
- Full / short hash: `e42ace32811f3834d1fd3f7a5bbcef2977d1c0fa` / `e42ace32`
- Parent: `7cc347fc` (D-1158). This file audits **this SHA only**. Archive row **Addressed:** D-1159 `e42ace32` was filled by D-1160.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 14:13:04 +0200
- D-id: **D-1159**
- Stats: 12 files, +197 / −55 — `js/mon.js` +98 (`m_poisongas_ok` + clones); `js/region.js` +8 / −3 (comment; clone body already full); `js/fountain.js` comment.
- Claims to close: Open queue `mon.c` `m_poisongas_ok` mfndpos vamp/eel/breath (named). Not inside_f. Reviews **107** / **118** named the thinner `mon.js` copy. `reviews/loop-2026-08-15/` has no open mfndpos-gas Must-fix.
- JS / map: `mon.js` `m_poisongas_ok` / `mfndpos`; `region.js` keeps a local clone (import cycle). `c-js-map/turns.md` `mon.c`. `Resists_Elem` worn/artifact still named.
- Prior reviews this SHA claims to close: **107** named omit 3 (mfndpos subset); D-1158 next-port.

## Intent vs deliverable

Git subject promises: “Match C mon.c m_poisongas_ok so mfndpos treats vampshifters, eels in pool, and poison-breath as OK instead of always avoiding gas.”

Old JS `mfndpos` called a **thinner** `m_poisongas_ok` that only returned OK for `nonliving`/`breathless`, else 0 (`BAD`). C `mon.c:330–357` also OK’s vampshifter / Hezrou|Vrock / eel-or-waterlevel+pool / AT_BREA AD_DRST|RBRE / youmonst invuln|Breathless|Underwater, and MINOR for poison resistance. `mfndpos` `:2172` / `:2240` still treats only `== OK` as willing (MINOR avoids). `region.js` already had the full local clone for `inside_gas_cloud` (D-1146).

The diff **does** port the C order into `js/mon.js` and **export** it. `mfndpos` still gates `=== M_POISONGAS_OK`. `region.js` keeps its clone (comment: `mon.js` imports `visible_region_at`). It does **not** port `Resists_Elem` worn/artifact grants (`mondata.c:173–196`). Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `m_poisongas_ok` (`mon.js`) | C callee, **rewritten** | `mon.c:330–357`; was thin |
| `mfndpos` `=== OK` | C caller, **untouched gate** | `:2172`, `:2240` |
| `immune_poisongas` | C `mondata.h:16–17`, **clone** | Hezrou\|Vrock **mndx** (`mons()` allocs) |
| `attacktype_fordmg` | C `mondata.c:42–49`, **clone** | first mattk; `AD_ANY` ≡ −1 |
| `resists_poison` | C `Resists_Elem`, **subset clone** | `mresists\|mextrinsics\|mintrinsics`; worn named |
| `Poison_resistance` / `Breathless` | C `youprop.h`, **clones** | extra bag ORs like other JS |
| `is_vampshifter` | C callee, **imported** | `monst.h:217–219` via `monsters.js` |
| `is_pool` / `Is_waterlevel` / `nonliving` / `breathless` | C callees, **imported** | |
| `m_poisongas_ok` (`region.js`) | C clone, **pre-existing full** | D-1146; comment only this SHA |
| AT_BREA / AD_DRST / AD_RBRE | C `monattk.h`, **literals** | 12 / 7 / 242 |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean.

**New RNG on this path:** none in `m_poisongas_ok`. `mfndpos` neighbour scan is unchanged except which monsters `continue` on poisoncloud. Path **public-unhit** on vamp/eel/breath walking **into** poisoncloud (MINOR kobolds still avoid, same as before).

Grep of this SHA’s `js/` hunks: no `FORCE`, `DIAG`, `getRngLog`, `readFileSync`, `from 'fs'`, `node:`, `fastforward` writes, seed names in control flow, or recorded coordinates. AT_BREA/AD_DRST/AD_RBRE are C macros, not traced attack slots.

## Constitution / playbook

Grep of this SHA’s `js/` hunks: no trace-index gates. Do not treat MINOR as OK in `mfndpos` (C still skips). Do not restore the thin `nonliving\|\|breathless` body. Do not import `m_poisongas_ok` from `region.js` (cycle). Do not pull `rloc_to` `set_apparxy` into this peel.

## C ↔ JS fidelity

### Branch order vs `mon.c:330–357`

C:

```
if (nonliving(mtmp->data) || is_vampshifter(mtmp)
    || breathless(mtmp->data) || immune_poisongas(mtmp->data))
    return M_POISONGAS_OK;
px = is_you ? u.ux : mtmp->mx;
py = is_you ? u.uy : mtmp->my;
if ((mtmp->data->mlet == S_EEL || Is_waterlevel(&u.uz)) && is_pool(px, py))
    return M_POISONGAS_OK;
if (attacktype_fordmg(mtmp->data, AT_BREA, AD_DRST)
    || attacktype_fordmg(mtmp->data, AT_BREA, AD_RBRE))
    return M_POISONGAS_OK;
if (is_you && (u.uinvulnerable || Breathless || Underwater))
    return M_POISONGAS_OK;
if (is_you ? Poison_resistance : resists_poison(mtmp))
    return M_POISONGAS_MINOR;
return M_POISONGAS_BAD;
```

JS `mon.js:256–281`: same order. `is_you` is `mtmp === game.youmonst` (C `&gy.youmonst`). `Underwater` is `u.uinwater` (`youprop.h:279`) — JS uses `u.uinwater`, not a sticky `u.Underwater` bag. Match.

`immune_poisongas`: C pointer `== &mons[PM_HEZROU] \|\| == &mons[PM_VROCK]`. JS `mndx` because `mons()` allocates. Equivalent.

`attacktype_fordmg`: C walks `mattk[0..NATTK)`. JS `slots.length` (generated NATTK=6). `aatyp`/`adtyp` are numeric in `js/generated/monsters_data.js`. AT_BREA=12, AD_DRST=7, AD_RBRE=242 match `monattk.h:22,49,89`. Adult green dragon is AT_BREA+AD_DRST; Chromatic AD_RBRE. Match.

`is_vampshifter`: C `cham == PM_VAMPIRE \|\| VAMPIRE_LEADER \|\| VLAD`. JS `is_vampire(mons(cham))` ≡ `mlet === 'S_VAMPIRE'` after `cham >= LOW_PM`. Those three PMs are S_VAMPIRE; vampire bat is S_BAT and is not a cham in C either. Equivalent on live chams.

`mlet === 'S_EEL'`: JS generated mlets are those strings. Match C `S_EEL`.

### `mfndpos` still only OK

C `:2172` `poisongas_ok = (m_poisongas_ok(mon) == M_POISONGAS_OK)`; `:2240–2243` skip neighbour poisoncloud when `!poisongas_ok && !in_poisongas`. JS `:1618` / `:1675–1678` same. MINOR (kobold `mresists`) still avoids. The subject’s “treats as OK” is the vamp/eel/breath **OK** arms, not MINOR. Honest.

`in_poisongas` still `visible_region_at` + poisoncloud glyph tag (D-0770). Fog/steam `S_cloud` is not avoided. Unchanged.

### `resists_poison` subset

C `resists_poison` → `Resists_Elem(POISON_RES)`: bits **then** wielded artifact `defends` **then** worn `oc_oprop` / alchemy smock / carried artifact (`mondata.c:171–196`). JS ORs `data.mresists | mextrinsics | mintrinsics` only. A ring of poison resistance on a living monster would be MINOR in C and BAD in JS → `mfndpos` still avoids in both (MINOR and BAD both `!= OK`). Difference is `inside_gas_cloud` HP via the **region.js** clone (also subset, D-1146 named). Not a new mfndpos C-wrong: worn grant still would not enter gas. Named map debt on the clone, as this SHA’s D-log says.

### Two clones

`region.js:179–203` already had the full C order (D-1146). This SHA only retouched the comment. `inside_gas_cloud` did not keep the thin copy. Import cycle (`mon.js` → `visible_region_at`) is a real reason not to share. Drift risk is named, not a stub of `mfndpos`.

`region.js` treats `!mtmp` as hero; `mon.js` export does not. C never passes NULL (`inside_gas_cloud` uses `&youmonst`; `mfndpos` passes `mon`). Not a live miss.

### Breathless / Poison_resistance clones

C `Breathless` is `HMagical_breathing || EMagical_breathing || breathless(youmonst.data)` (`youprop.h:276–277`). JS ORs an extra `u.Magical_breathing` bag like fountain.js. Extra true without H/E/form would OK the hero in gas when C would not. Pre-existing clone pattern on the youmonst arm only (`is_you &&`). `mfndpos` is a **monster** caller — that bag does not fire. `Poison_resistance` ORs H/E/flag/uprops; C is H||E|| intrinsic from `u.uprops[POISON_RES]`. Same split-storage clone as D-1146. Not a new mfndpos C-wrong.

## Hallucinations / overclaim

D-log / CURRENT / subject say mfndpos treats vampshifters, eels in pool, and poison-breath as OK instead of always avoiding gas. **That is the hunk:** thicken the `mon.js` copy; gate unchanged. Stamping **Addressed:** D-1159 is fair for the Open **mfndpos** line. Hash `e42ace32` is on the archive row (filled by D-1160). Do **not** stamp it as “Match C `Resists_Elem` worn” or “MINOR now walks into gas.” This is **not** “Match C dispatch, callee is a stub”: `m_poisongas_ok` is the real C function in `mon.js`; `attacktype_fordmg` / `immune_poisongas` are matching clones, not no-ops.

## Density

One C function + the `mfndpos` gate that was the queue item. Clones are callees of that envelope. Right size (§2b). Did not combine with `rloc_to` `set_apparxy`.

## Verification

Journal: private canary **32**/32 (nonliving/breathless; vampshifter bat vs plain bat; Hezrou/Vrock; eel pool vs land; waterlevel pool; green/chromatic vs red dragon; hero invuln/breath/water/resist; kobold mresists MINOR; mintrinsics/mextrinsics; mfndpos enter vs skip vs already-in-gas vs `S_cloud`); green+strict seed8000/0900; cohort **39**/39 (CURRENT shared + 0014/0383) + isolated strict 0012. Path **public-unhit** on vamp/eel/breath **entering** poisoncloud.

C read of `mon.c:330–357`, `:2172`, `:2240–2243`, `mondata.h:16–17`, `mondata.c:42–49`, `:171–196`, `monst.h:217–219`, `youprop.h:276–279`, `monattk.h:22,49,89`; JS SHA `m_poisongas_ok` + `mfndpos` gate. Hunk grepped FORCE/fs/seed. This audit’s full `sessions` (cadence **#1475**) **44**/44 — MINOR still avoids; no public vamp/eel/breath enter.

| Case | C | JS after |
|------|---|---------|
| vampshifter | OK | **same** |
| eel in pool | OK | **same** |
| eel on land | not this arm | **same** |
| green / Chromatic breath | OK | **same** |
| Hezrou / Vrock | OK | **same** |
| resist bits | MINOR (still avoid) | **same** |
| worn `oc_oprop` | MINOR via `Resists_Elem` | **named skip** (still avoid) |
| `mfndpos` MINOR | skip cloud | **same** |

## Actionable C-wrongs

None that Must-fix this next iter. The Open mfndpos arms match `mon.c:330–357` call-for-call. Worn `Resists_Elem` is named clone debt, and it would not change the `=== OK` enter gate.

Named omits / do-nots (map / Open, not Must-fix):

1. `Resists_Elem` artifact/worn/smock (`mondata.c:173–196`).
2. Share one `m_poisongas_ok` (cycle); keep clones in lockstep.
3. `rloc_to` `set_apparxy` (D-1160 next).
4. Do not restore the thin body. Do not let MINOR enter gas. Do not pull `set_apparxy` into this SHA — **Addressed:** D-1160 `8efa62e9`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `mfndpos` now uses C’s `m_poisongas_ok` OK arms (vamp/eel/breath/Hezrou) while MINOR still avoids poisoncloud, matching `mon.c:2172` / `:2240`.
- Must-fix stays empty for this SHA; next port popped Open `rloc_to` `set_apparxy`. **Addressed:** D-1160 `8efa62e9`. Not vanish-msg.
