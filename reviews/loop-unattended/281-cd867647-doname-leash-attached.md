# Review 281 — cd867647 — objnam.c doname LEASH attached (D-1319)

## Metadata
- Full / short hash: `cd86764758fafc2b629eca17e1da44bf40f8f07b` / `cd867647`
- Parent: `a40f5920` (reviews **277–280**). JS parent `ccdc8670` (D-1318). This file audits **this SHA only**. Archive **Addressed:** D-1319 `cd867647` already has the short hash (filled by D-1320).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 23:58:51 +0200
- D-id: **D-1319**
- Stats: 11 files, +255 / −145 — `js/objnam.js` +50 / −~8; `js/do_name.js` +4 / −1 (late-bind).
- Claims to close: Open `objnam.c` doname LEASH attached (named from D-1308). Not candle. `reviews/loop-2026-08-15/` has no unpaid leash Must-fix.
- JS / map: `objnam.js` `doname`; `do_name.js` `set_noit_mon_nam`; `c-js-map/turns.md`. POT_OIL `(lit)` named (next SHA).
- Prior reviews this SHA claims to close: **280** named LEASH as the next Open after worn; **270** named leash after candle `(lit)`.

## Intent vs deliverable

Git subject promises: “Match C objnam.c doname so a leash on a live pet shows (attached to the pet), instead of a bare leash.”

C `doname_base` TOOL (`objnam.c:1431–1445`) is the **second** TOOL arm, after worn (`:1427–1429`), before candelabrum (`:1447`). Predicate `obj->otyp == LEASH && obj->leashmon != 0`. `find_mid(obj->leashmon, FM_FMON)` (`light.c:376–395`) walks `fmon` and skips `DEADMONSTER` (`monst.h:214` `mhp < 1`). Live → `ConcatF1 " (attached to %s)"` `noit_mon_nam` (`do_name.c:1054–1059` = `x_monnam` ARTICLE_YOUR + SUPPRESS_IT). Else `impossible` (dead vs not-found) then `leashmon = 0`. **Always `break`** — skips candelabrum, lamp `(lit)`, and `oc_charged` goto charges. Worn `W_TOOL` already broke, so a worn leash never takes this arm. `xname` stays bare. Callers: invent `doname` / `prinv` / `xprname`.

Old JS: worn D-1318; candelabrum D-1317; lamp/candle D-1308; leash omit.

The diff **does** the attached suffix, skip-dead fmon walk, `leashmon=0` on miss, and `!leashArm` gates on candelabrum / lamp / charges. It does **not** emit `impossible()` (named: doname is sync). It does **not** import `js/mon.js` `find_mid` (that clone does **not** skip DEADMONSTER). It does **not** port POT_OIL `(lit)`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| doname TOOL LEASH | C `:1431–1445`, **wired** | second TOOL arm; always break |
| `find_mid(FM_FMON)` | C `light.c:382–385`, **clone** | inline fmon + skip `mhp<1`; matches this flag |
| `js/mon.js` `find_mid` | C callee, **not used** | no DEADMONSTER skip; would be a worse clone |
| `noit_mon_nam` | C `do_name.c:1054`, **imported live** | late-bind `set_noit_mon_nam`; same cycle as `y_monnam` |
| `DEADMONSTER` | C `mhp<1`, **inlined** | not a diverging predicate |
| worn skip | C first TOOL `break`, **wired** | `!toolWorn` on `leashArm` |
| candelabrum/lamp/charges skip | C `break` `:1445`, **wired** | `!leashArm` |
| `impossible` pline | C `:1437–1442`, **named omit** | state `leashmon=0` still matches |
| POT_OIL `(lit)` | C POTION `:1488`, **named omit** | not TOOL |
| `xname` | C, **unchanged** | still no `(attached to …)` |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new gameplay RNG** (`doname` is a formatter).

## C ↔ JS fidelity

Pinned C (`objnam.c:1431–1445` + `light.c:382–385`):

```
        if (obj->otyp == LEASH && obj->leashmon != 0) {
            struct monst *mlsh = find_mid(obj->leashmon, FM_FMON);
            if (mlsh && !DEADMONSTER(mlsh)) {
                ConcatF1(bp, 0, " (attached to %s)", noit_mon_nam(mlsh));
            } else {
                /* impossible dead / not-found */
                obj->leashmon = 0;
            }
            break;
        }
```

FM_FMON only:

```
    if (fmflags & FM_FMON)
        for (mtmp = fmon; mtmp; mtmp = mtmp->nmon)
            if (!DEADMONSTER(mtmp) && mtmp->m_id == nid)
                return mtmp;
```

JS `leashArm` is `TOOL_CLASS && oname==='LEASH' && leashmon && !toolWorn`. Enum name equals C `otyp==LEASH`. Inline loop: skip `mhp<1`, match `m_id`, then `mlsh && mhp>=1` Concat else `leashmon=0`. Redundant live check matches C `mlsh && !DEADMONSTER` after find_mid already skipped dead (FM_FMON never returns a dead `mlsh`; both miss paths clear the id). `leashArm` is computed **before** the clear, so candelabrum/lamp/charges stay skipped after a miss — C `break`. Match.

`_noit_mon_nam(mlsh)` is the live `do_name.js` export (tame `"your …"`, given name, `the` + type). Fallback `'it'` only if the setter never ran. `allmain.js` imports `polyself.js`, which imports `do_name.js`, which calls `set_noit_mon_nam` at load. **Not a stub callee.** Unset fallback is cycle-init, not a production path.

This is **not** “Match C `doname` TOOL dispatch.” Sibling POTION oil stays named. The second TOOL arm plus the skips `break` implies **are** the hunk. Inline find_mid is a **C-matching clone** of the FM_FMON arm, not a diverging `mon.js` import.

## Hallucinations / overclaim

Subject + D-1319 say a leash on a live pet shows `(attached to the pet)` instead of a bare leash. **The TOOL suffix, skip-dead lookup, miss clear, and later-arm skips are the hunk.** Stamping **Addressed:** D-1319 is fair. Do **not** stamp “Match C `impossible` wizard pline.” Do **not** stamp “Match C `find_mid` FM_MIGRATE/MYDOGS.” Do **not** stamp “Match C `js/mon.js` `find_mid` DEADMONSTER skip.” Do **not** stamp “Match C POT_OIL `(lit)`.” Do **not** treat fortress PASS as an inventory `leash (attached to your little dog)`.

## Density

One C TOOL `if` plus the three later suffixes `break` must suppress, plus the late-bind the Concat needs. ~40 executable JS lines. Did not glue oil. Right size (§2b). Sequential with D-1318 (sibling TOOL `if`s), not an unrelated subsystem. Tiny vs token cost, but it is the whole C arm.

## Branch-by-branch confirm

1. Live tame fmon, `leashmon==m_id`: `" (attached to your <name>)"`. Match `:1434–1435`.
2. Named pet: `noit_mon_nam` given-name path. Match SUPPRESS_IT + has_mgivenname.
3. Hostile on fmon: `" (attached to the <type>)"`. Match ARTICLE_THE via the live helper.
4. Dead on fmon (`mhp<1`): skip in walk, `leashmon=0`, no suffix. Match find_mid miss + `:1443`.
5. Missing id: same clear. Match.
6. `leashmon==0`: arm not taken; no charges on a leash (not `oc_charged`). Match.
7. Worn `W_TOOL` leash: `(being worn)` only, no attached. Match first-arm `break`.
8. Unworn candelabrum / lamp `(lit)` / TOOL charges still D-1317/D-1308. Match `!leashArm`.
9. `xname` still bare `"leash"`. Match.
10. **Public-unhit** unless a session `doname`s a leashed pet.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Did not hardcode `" (attached to your little dog)"` for a recorded inventory. Plain ESM. Late-bind, not a Node builtin.

## Verification

Journal: private canary **30**/30; green+strict seed8000/0900; cohort **8**/8 + strict 1500/1800/0012/0004/0007/2200/0383/0361. **Public-unhit** unless leashed-pet `doname`. Cadence this audit: full `sessions` at HEAD `b7a0c3c7` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `37+0.30/turn` (R² 0.85). I did not re-run the private canary.

## Actionable C-wrongs

None for Must-fix. Concat `" (attached to %s)"`, FM_FMON skip-dead, miss `leashmon=0`, worn-first skip, and later-arm `break` match C `:1431–1445` / `light.c:382–385`. `noit_mon_nam` is not a stub.

Named omits (map, not Must-fix):

1. `impossible()` dead / not-found pline (doname sync)
2. `js/mon.js` `find_mid` still lacks DEADMONSTER skip (this SHA inlined C correctly instead)
3. POTION `POT_OIL` `(lit)` — **this was the next Open; now D-1320**

Do not Must-fix “inline vs import `find_mid`.” Do not Must-fix `xname` remaining bare. Do not Must-fix the `'it'` unset fallback (`do_name` loads via `polyself` at startup).

## Callers / RNG ledger

C: invent `doname` / `prinv` / farlook. JS: same `xprname` → `doname`. No RNG. Public fortress is not evidence `(attached to …)` painted.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: a live-pet leash now `doname`s `(attached to %s)` via live `noit_mon_nam` and skips later TOOL arms; oil `(lit)` stayed named.
- Must-fix stays empty for this SHA; archive **Addressed:** D-1319 `cd867647` already filled by the next port commit.
