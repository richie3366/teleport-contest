# Review 175 — c85424f4 — dig.c `rot_corpse` invent/minvent worn plines (D-1213)

## Metadata
- Full / short hash: `c85424f4942048501ef83602ac3041a8c05d2df8` / `c85424f4`
- Parent: `d68e554e` (review **171–174** + cadence #1540). This file audits **this SHA only**. Archive row **Addressed:** D-1213 `c85424f4` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 10:20:48 +0200
- D-id: **D-1213**
- Stats: 10 files, +183 / −50 — `js/mkobj.js` +86 / −9.
- Claims to close: Open queue `dig.c` `rot_corpse` invent/minvent worn plines (named from D-0405 / D-1202 / review **174**). Not REVIVE. `reviews/loop-2026-08-15/` has no unpaid rot_corpse Must-fix.
- JS / map: `mkobj.js` `rot_corpse` + `obj_extract_self` OBJ_INVENT splice. `c-js-map/data.md`. Hideunder expose / `rot_organic` contents bury / unique `corpse_xname` CXN_NO_PFX / `setmnotwielded` `artifact_light` still named. Next Open at this SHA was `disturb_buried_zombies`.
- Prior reviews this SHA claims to close: **174** Actionable “`dig.c` `rot_corpse` invent/minvent worn plines — **next Open**.”

## Intent vs deliverable

Git subject promises: “Match C dig.c rot_corpse so a corpse rotting in hero or monster inventory prints the named worn plines and clears wielded/owornmask, instead of vanishing silently.”

Old JS `rot_corpse` only snapshotted floor `ox,oy`, then `obj_extract_self` + `newsym`. Invent/minvent/migrating were silent and left worn. `obj_extract_self` had no `OBJ_INVENT` arm (invent extract fell through to `where=OBJ_FREE` without splicing `game.invent`).

C `dig.c:2146–2189` snapshots `on_floor` / `in_invent`, then: invent verbose `Your [wielded ]<cname> rot(s) away[!/.]`; `owornmask` → `remove_worn_item(TRUE)` + `stop_occupation`; minvent wielded → `setmnotwielded`; migrating → `owornmask=0`; then `rot_organic` (extract + obfree); floor hideunder + `newsym`; invent `update_inventory`.

The diff **does** those four `where` arms, invent splice + figurine `FIG_TRANSFORM` stop, and invent `update_inventory` after extract. It does **not** hideunder/`mundetected` expose, `rot_organic` contents `bury_an_obj`, unique `corpse_xname(..., CXN_NO_PFX)`, or `setmnotwielded` `artifact_light` shine. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `rot_corpse` invent/minvent/migrating | C sites, **new** | `:2156–2174` then `:2187–2188` |
| `otense_corpse` | **clone** of `objnam.c` `otense` | quan≠1 vs C `is_plural`; ART_EYES named |
| `setmnotwielded_rot` | **clone** of `weapon.c` `setmnotwielded` | MON_NOWEP + `~W_WEP`; artifact_light named |
| `remove_worn_item` | C callee, **imported** | `steal.js`; `TRUE` unchain |
| `stop_occupation` | C callee, **imported** | `hack.js` |
| `cxname` | C-adjacent, **imported** | `objnam.js`; not `corpse_xname` CXN_NO_PFX |
| `obj_extract_self` OBJ_INVENT | C `freeinv` via extract, **new** | splice + `pickup_prev` + figurine; `freeinv_core` u.uhave/luck/artifact named |
| `update_inventory` | C callee, **imported** | invent tail; extract skips the extra redraw |
| hideunder / mundetected | C floor after rot_organic, **named omit** | `:2179–2185` |
| `rot_organic` contents bury | C, **named omit** | `:2129–2137` |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new RNG.** Dynamic `import()` of display/steal/hack/invent is cycle avoidance, not a Node filesystem.

Grep of this SHA’s `js/` hunks: no banned gates. `W_WEP` import is the C worn bit, not a seed mask. Dynamic `import('./display.js')` is the existing floor-`newsym` cycle split, not `fs`.

`Your()` in C is `vpline` with a `"Your "` prefix (`pline.c`). JS bakes the prefix into `pline`. After D-1207 both consume `msg_loc` even when `accessiblemsg` is Off. The invent rot line does not first `set_msg_xy`; C does not either.

C `rot_organic` takes `timeout UNUSED`. JS does not thread the timer timeout into extract. Equivalent.

## C ↔ JS fidelity

Pinned C (`dig.c:2146–2189`):

```
    boolean on_floor = obj->where == OBJ_FLOOR,
            in_invent = obj->where == OBJ_INVENT;
    if (on_floor) { x = obj->ox; y = obj->oy; }
    else if (in_invent) {
        if (flags.verbose) {
            char *cname = corpse_xname(obj, 0, CXN_NO_PFX);
            Your("%s%s %s away%c", obj == uwep ? "wielded " : "", cname,
                 otense(obj, "rot"), obj == uwep ? '!' : '.');
        }
        if (obj->owornmask) {
            remove_worn_item(obj, TRUE);
            stop_occupation();
        }
    } else if (obj->where == OBJ_MINVENT) {
        if (obj->owornmask && obj == MON_WEP(obj->ocarry))
            setmnotwielded(obj->ocarry, obj);
    } else if (obj->where == OBJ_MIGRATING) {
        obj->owornmask = 0L;
    }
    rot_organic(arg, timeout);
    if (on_floor) { /* hideunder named */ newsym(x, y); }
    else if (in_invent) update_inventory();
```

Callers: `timeout.c` `run_timers` ROT_CORPSE / `zombify_mon` fail path. JS already dispatched those (D-0405 / D-1202). This SHA fills the body those callers already hit. **Not a stub dispatch.**

### Invent verbose vs `:2156–2166`

C `Your(...)` is a `vpline` wrapper (`pline.c`); JS `pline(\`Your ${wielded}${cname} ${verb} away${punct}\`)` is the same string into live `pline` (D-1207 consume). `flags.verbose` vs `game.flags?.verbose !== false` (unset treats as On; C default is On). Wielded prefix and `!` vs `.` match `obj == uwep`.

`cname`: C `corpse_xname(..., CXN_NO_PFX)` (`hack.h:63` suppress `"the"` on unique). JS `cxname` → `corpse_xname(obj, null, false)` whose third arg is **singular**, not CXN_NO_PFX. The JS helper never inserts `"the "` (`objnam.js:770–776` is `"${mnam} corpse"`). Ordinary newt matches C NO_PFX. Unique/pname article/possessive is **named**, not a silent `"Your the Wizard…"` for this thin namer.

### `otense` vs `objnam.c:2531–2546`

C: `if (!is_plural(otmp)) return vtense(0, verb);` else return the plural verb. JS `otense_corpse`: `(quan|0) !== 1` → raw `"rot"`; else `vtense(null, "rot")` → `"rots"` (`objnam.js:1126–1134`, null subj is singular). Stacked corpses: both plural `"rot"`. Pair-item `is_plural` (ART_EYES) is named. **Clone matches this call.** Not a no-op.

### Worn / minvent / migrating vs `:2163–2174`

C invent `owornmask` always `remove_worn_item(obj, TRUE)` then `stop_occupation`. JS same imports. `steal.js` `remove_worn_item` is the D-1086 live callee, not a glyph stand-in.

C minvent: only if `owornmask && obj == MON_WEP(ocarry)` then `setmnotwielded` (which `&= ~W_WEP` and `MON_NOWEP`). JS `obj.owornmask && obj === obj.ocarry?.mw` then `setmnotwielded_rot`. Armor-corpse minvent without `mw` match: C also skips `setmnotwielded`. Match.

C `setmnotwielded` (`weapon.c:1814–1828`) also `artifact_light` `end_burn` + canseemon shine. JS clone skips that. Rotting corpses are not shining artifacts. **Named omit**, not a fake `MON_NOWEP`.

C migrating **always** `owornmask = 0L` (comment: so `obfree` worn-check is honest). JS same, not only-if-set.

### `rot_organic` / extract vs `:2124–2139` / `mkobj.c:2557–2574`

C `rot_organic` buries contents then `obj_extract_self` + `obfree`. JS comments contents bury, then extract, `quan=0`, `where=OBJ_FREE`, `timed=0`. Floor `newsym`; invent `update_inventory`. Match the claimed arms.

C `obj_extract_self` OBJ_INVENT is `freeinv`: `extract_nobj(&gi.invent)`, `pickup_prev=0`, `freeinv_core`, `update_inventory`. JS splice + `pickup_prev` + figurine `stop_timer` (the one `freeinv_core` arm that applies to figurines, not corpses). Common tail (`mkobj.js:2263–2265`) still sets `nobj`/`nexthere` null and `where=OBJ_FREE` after the new invent arm — same as floor/minvent. Duplicate `update_inventory` skipped in extract because `rot_corpse` tail does it (`perm_invent` Off default is a no-op). `freeinv_core` (`invent.c:1356–1398`) also clears `u.uhave` for Amulet/Bell/Book/Candelabrum, artifact intrinsic, loadstone curse, luck `botl`, and tin context. A rotting **corpse** hits none of those. **Clone debt on the shared extract**, not a silent skip of the Your-pline. Do not Must-fix “port full `freeinv_core`” as this SHA — that is a later invent peel, and this envelope’s callee for worn is `remove_worn_item`, which already ran.

JS invent is an Array; C invent is an `nobj` chain. `indexOf`+`splice` is the JS analogue of `extract_nobj(&gi.invent)` for this representation (pre-existing invent model). Not a fake extract.

`remove_worn_item(obj, true)`: C `TRUE` is unchain-ball. JS `steal.js` takes that boolean. Occupation stop after worn clear matches `:2163–2166` order (pline first, then worn, then extract via `rot_organic`). JS prints then `remove_worn_item` then `stop_occupation` then extract. Match.

C `MON_WEP` is `ocarry->mw`. JS `obj.ocarry?.mw`. Missing `ocarry` would skip; C would also crash or skip if `ocarry` were null on MINVENT (it is not). Optional chaining is a JS guard, not a skipped `setmnotwielded` when `mw` is live.

## Hallucinations / overclaim

Subject + D-1213 say invent/minvent print named worn plines and clear wielded/owornmask instead of vanishing silently. **Those `where` arms plus live `remove_worn_item`/`stop_occupation`/`update_inventory` are the hunk.** Stamping **Addressed:** D-1213 is fair. This is **not** “Match C dispatch, callee is a stub.” Do **not** stamp “Match C `corpse_xname` CXN_NO_PFX unique article” or “Match C `setmnotwielded` artifact_light” or “Match C `rot_organic` bury contents” or “Match C `freeinv_core` Amulet `u.uhave`.” Say so: newt/wielded bang/verbose-off/minvent `mw`/migrating mask are C; `otense`/`setmnotwielded` are local copies that match the cited bodies for this call.

## Density

One C function family: `rot_corpse` invent/minvent/migrating + the invent extract the tail needs. ~86 lines in `mkobj.js` that already owned ROT_CORPSE. §2b right size. Hideunder correctly stayed out. Did not pull `disturb_buried_zombies`.

## Branch-by-branch confirm

1. Invent, verbose, not uwep, quan=1 → `Your newt corpse rots away.` Match.
2. Invent, uwep → `wielded ` + `!`. Match.
3. Invent, verbose Off → no Your; still extract. Match.
4. Invent, quan>1 → `rot` not `rots`. Match `otense` for corpses.
5. Invent, `owornmask` → `remove_worn_item(TRUE)` then `stop_occupation`. Match.
6. Minvent, wielded `mw` → `MON_NOWEP` + `~W_WEP`. Match.
7. Minvent, worn but not `mw` → no `setmnotwielded`. Match.
8. Migrating → `owornmask=0` even if already 0. Match.
9. Floor → silent extract + `newsym`; no Your. Match (pre-existing).
10. Floor hideunder expose → C does it; JS named skip.
11. Contained → no invent/minvent arm; extract contained path (pre-existing). Match fall-off.

No `rn2` added. Timer fire stays `run_timers`. `W_WEP` is `const.js` worn bit (C `worn.h`), used only to clear the wield mask in the minvent clone.

## Anti-pattern / Rule #2 (this SHA `js/`)

`git show c85424f4 -- js/` has no `FORCE`, `DIAG`, `getRngLog(`, `readFileSync`, `from 'fs'`, `node:`, `fastforward` writes, seed names, or recorded coordinates. Dynamic `import()` of steal/hack/invent/display is cycle avoidance (mkobj already did that for `newsym`). Contest Rule #2: `mkobj.js` stays plain ESM.

## Verification

Journal: private canary **28**/28 (invent Your / wielded bang / verbose-off / plural otense / occupation stop / minvent MON_NOWEP / migrating mask / floor silent / contained skip); green+strict seed8000/0900; cohort **4**/4 + strict 1500/1800/0012/0004. **Public-unhit** unless a public ROT_CORPSE expires in invent/minvent. Admit that. This audit’s full `sessions` `__RESULTS_JSON__` at `517cb217`: **44**/44 Scr **11405**/11405 RNG **792838**/792838 (100%) speed `31+0.27/turn` (R² 0.873) does not expire a backpack corpse. Fortress is not proof of the Your-pline.

## Actionable C-wrongs

Named omits (map / later Open), not Must-fix:

1. Floor hideunder / `mundetected` expose after rot (`dig.c:2179–2185`).
2. `rot_organic` `while (Has_contents)` `bury_an_obj` (`:2129–2137`).
3. Unique/pname `corpse_xname(..., CXN_NO_PFX)` vs JS thin `"${mnam} corpse"`.
4. `setmnotwielded` `artifact_light` `end_burn` + shine (`weapon.c:1819–1823`).
5. Shared `obj_extract_self` INVENT skips `freeinv_core` `u.uhave` / luck / artifact — unused for this corpse envelope.

`otense_corpse` matches `otense` for quan 1 / stacked corpses. Do not Must-fix “import `is_plural`.” Next Open at this SHA was already `disturb_buried_zombies`, not this residue.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: a corpse that finishes rotting in hero or monster inventory (or migrating) now prints C’s verbose Your-line and clears wielded `owornmask` instead of vanishing silently; hideunder, contents bury, unique CXN_NO_PFX, and artifact_light stay named, not Must-fix.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1213 `c85424f4`. Next port in this window popped Open `disturb_buried_zombies`. Not REVIVE, not BURIED `impossible`.
