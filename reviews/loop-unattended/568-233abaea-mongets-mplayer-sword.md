# Review 568 — 233abaea — makemon.c mongets mplayer-sword spe (D-1607)

## Metadata
- Full / short hash: `233abaeaf545664430ec185c8b29ec0093527257` / `233abaea`
- Parent: `f9d27e3f` (D-1606). This file audits **this SHA only** (fifth of nine `js/` commits since review **563**). Archive **Addressed:** D-1607 `233abaea`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 01:06:01 +0200
- D-id: **D-1607**
- Stats: `js/makemon.js` +52/−7, `js/objects.js` +12, `js/dothrow.js` +6/−5. Band **150–350** (js/ insertions **70**).
- Claims to close: Open `mongets` mplayer-sword spe after D-1606. Not `mk_mplayer` kit (D-1584). Not `gain_guardian_angel`. `reviews/loop-2026-08-15/` has no unpaid mongets-spe Must-fix.
- JS / map: `makemon.js` `mongets`; `objects.js` `is_sword`. `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **545** / **557** named `mongets` after `mk_mplayer` / `create_mplayers`.

## Intent vs deliverable

Git subject promises: a role-monster sword from `mongets` gets `spe=3+rn2(4)`, with the same-function demon / lminion / invocation arms.

Pinned C `makemon.c` `mongets` `:2180–2230`. `obj.h:223–226` `is_sword`. `monst.h:281–282` `is_lminion`. `mkobj.c` `curse` `:1782–1819`. `--callers mongets`: 138 sites (`m_initweap` / bones / …). `--callers` of the new helpers: `is_sword` is a macro; `is_lminion` used here.

```2189:2202:nethack-c/upstream/src/makemon.c
        if (mtmp->data->mlet == S_DEMON) {
            if (otmp->blessed)
                curse(otmp);
        } else if (is_lminion(mtmp)) {
            otmp->cursed = FALSE;
            if (otmp->spe < 0)
                otmp->spe = 0;
            otmp->oerodeproof = 1;
            otmp->oeroded = otmp->oeroded2 = 0;
        } else if (is_mplayer(mtmp->data) && is_sword(otmp)) {
            otmp->spe = (3 + rn2(4));
        }
```

Old JS: prince bump + `mpickobj` only; comment named the rest omitted.

The diff **does** the remaining `mongets` body in C order, one `is_sword` export (dothrow local retired), and import live `is_lminion`. It **does not** change `mk_mplayer` (still `mksobj`+`mpickobj`, not `mongets`). Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `mongets` remaining body | C `:2188–2228`, **LIVE this SHA** | prince/`mpickobj` already |
| `mksobj(otyp, TRUE, FALSE)` | C `:2188`, **LIVE** | |
| S_DEMON `curse` | C `:2189–2192`, **LIVE** | `mkobj.js` `curse` |
| `is_lminion` | C `monst.h:281`, **LIVE** | teleport.js |
| `is_mplayer && is_sword` spe | C `:2200–2201`, **LIVE this SHA** | `rn2(4)` |
| `is_sword` | C `obj.h:223`, **LIVE this SHA** | objects.js; dothrow clone gone |
| candelabrum / Bell / Book | C `:2204–2214`, **LIVE this SHA** | direct blessed/cursed |
| `is_prince` gear | C `:2217–2222`, **LIVE** | already |
| `mpickobj` merge | C `:2224–2227`, **LIVE** | |
| `mk_mplayer` sword path | C `mplayer.c`, **OMIT named** | D-1584; not `mongets` |

`node scripts/csym.mjs mongets` → `:2180-2230`. `--macro is_sword` → `obj.h:223-226`. `is_lminion` → `monst.h:281-282`. `curse` → `:1782-1819`.

RNG: `rn2(4)` only on the mplayer-sword arm. Demon/lminion/invocation consume none here. Extra `rn2` lives in `mksobj` (pre-existing). No seed gate.

`node scripts/sym.mjs` on new / re-pointed names (dothrow local `is_sword` → `objects.js` export):

```
is_sword         js/objects.js:118   sync
is_lminion       js/teleport.js:358   sync
mongets          js/makemon.js:1579   sync
curse            js/mkobj.js:487   sync
mpickobj         js/makemon.js:1498   sync
is_mplayer       js/monsters.js:750   sync
```

`--can dothrow.js objects.js is_sword`: ALREADY. `--can makemon.js objects.js is_sword`: ALREADY. `--can makemon.js teleport.js is_lminion`: ALREADY. Do **not** stamp “cycle-forced clone.” Do **not** write `is_sword` clone #2 in `makemon.js` or restore the dothrow local.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

Order. `!otyp` → null; `mksobj`; if otmp: demon else lminion else mplayer-sword; then candelabrum else Bell else Book; then prince; then `mpickobj` maybe null. **Match `:2185–2229` branch order.**

Demon. `mlet === 'S_DEMON'` and blessed → `curse(otmp)` (sets blessed 0 / cursed 1 plus `curse()` side effects). Fresh `mksobj` is not `uwep`/carried. **Match `:2189–2192`.**

Lminion. Direct `cursed = false`, clamp `spe`, `oerodeproof=1`, clear oeroded. **Match `:2193–2199`.** Not `uncurse()` (C does not call it). `is_lminion` is `is_minion(data) && mon_aligntyp === A_LAWFUL`. **Match `:281–282`.**

Mplayer sword. `is_mplayer(data) && is_sword(otmp)` → `spe = 3 + rn2(4)`. **Match `:2200–2201`.** `is_sword`: WEAPON_CLASS and `oc_skill` in `P_SHORT_SWORD..P_SABER`. **Match `obj.h:223–226`.** JS extra `!otmp` guard is not on this path.

Invocation. Candelabrum spe/age/lamplit/buc; Bell buc false; Book blessed false cursed true. **Match `:2204–2214`.** Direct assigns, not `curse()`/`uncurse()`.

Prince + `mpickobj`. Unchanged shape. **Match.**

Callee closure (every arm this SHA opened). LIVE: `mksobj`, `curse`, `is_lminion`, `is_mplayer`, `is_sword`, `is_prince`, `mpickobj`, `rn2`. STUB: **none**. Combined-arm may ship. Not “dispatch ported, callee stubbed.”

`mk_mplayer` still does not call `mongets` for the kit. Endgame role-monsters from D-1584/`create_mplayers` do not take this `spe` bump unless some other caller uses `mongets`. The subject says “from `mongets`.” Fair. Named.

## Hallucinations / overclaim

Subject `mongets` mplayer-sword `spe=3+rn2(4)` plus demon/lminion/invocation: **true.** D-log “one `is_sword`”: **true** (dothrow local gone). Do **not** stamp “Match C `mk_mplayer` sword spe.” Do **not** stamp “Match C `uncurse` on lminion.” Do **not** stamp “Astral `create_mplayers` kit uses `mongets`.” Public suite has no `mongets` mplayer-sword.

## Density

One C function’s remaining arms plus the `is_sword` home. +70 JS. Did not glue `gain_guardian_angel`. §2b OK.

## Branch-by-branch confirm

1. `!otyp` → null. **Match.**
2. Demon blessed → `curse`. **Match.**
3. Lminion: uncursed, spe≥0, erodeproof. **Match.**
4. Mplayer sword: `3+rn2(4)`. **Match.**
5. Candelabrum / Bell / Book. **Match.**
6. Prince then `mpickobj`. **Match.**
7. `mk_mplayer` kit. **Named (D-1584).**

## Callers / RNG ledger

`mongets` already wired. New RNG only `rn2(4)` on the sword arm. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. Do not restore dothrow `is_sword`. Do not add `is_sword` #2. Do not `uncurse` the lminion arm. Do not wrap `wildmiss` as `pline_mon`. Do not rewrite `mk_mplayer` as the spe “fix.”

## Verification

D-log private canary **31**/31; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for mplayer-sword spe / invocation items. Fortress `m_initweap` `mongets` does not prove the new arms. `mk_mplayer` kit unhit by this SHA.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): `mk_mplayer` weapon path (`mksobj`+`mpickobj`, D-1584); `gain_guardian_angel`; `m_unleash`; initedog ogoal. Do not add `is_sword` #2. mplayer_talk is D-1606.

Verdict: **ACCEPT-WITH-DEBT**
