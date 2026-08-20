# Review 264 — 1a7839f7 — dothrow.c throw_gold swallow (D-1302)

## Metadata
- Full / short hash: `1a7839f7a28f378d774a5c5f318060c40c63bd1f` / `1a7839f7`
- Parent: `18fa6c89` (D-1301). This file audits **this SHA only**. Archive row **Addressed:** D-1302 lacked the short hash; this review commit fills `1a7839f7`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 19:48:43 +0200
- D-id: **D-1302**
- Stats: 9 files, +146 / −34 — `js/dothrow.js` +75 / −~8.
- Claims to close: Open `dothrow.c` throw_gold swallow (named from D-1283 / review **245**). Not boomhit. `reviews/loop-2026-08-15/` has no unpaid throw_gold Must-fix.
- JS / map: `dothrow.js` `throw_gold` / `throw_obj` gate; `c-js-map/turns.md`. You() self / unsplit / dz / bhit / ghitm / quivered throwit / `sho_obj_return_to_u` named.
- Prior reviews this SHA claims to close: **245** named omit throw_gold swallow (`:2671–2679`) as a different function from `swallowit`/`mpickobj`.

## Intent vs deliverable

Git subject promises: “Match C dothrow.c throw_gold swallow so gold thrown while engulfed is add_to_minv'd with an entrails pline, instead of a silent coin no-op.”

C `throw_gold` (`dothrow.c:2656–2679`) after the self-cancel gate (`:2661–2668`): `freeinv`; if `u.uswallow` then `mon_nam(ustuck)`, `digests` → `strcat(s_suffix(swallower), " entrails")`, `pline_The("gold disappears into %s.")`, `add_to_minv(u.ustuck, obj)`, `ECMD_TIME`. That is **not** `swallowit`/`mpickobj` (no `carry_obj_effects`). Caller `throw_obj` (`:112–115`): `COIN_CLASS && obj != uquiver` → `return throw_gold(obj)` (no `unsplit_stack`).

Old JS: named omit after D-1283; all coins `throw_obj` returned 0.

The diff **does** the swallow arm (`freeinv` + wallet `_goldCount` + entrails `pline` + live `add_to_minv`) and the `throw_obj` coin gate (quivered gold still `return 0`). It does **not** port You() self pline / `unsplitobj`, dz ceiling, `bhit`/`ghitm`/`ship_object`/`flooreffects`/`sellobj`, or quivered gold via throwit. Named. Non-swallow gold remains a silent no-op (`return 0` without `freeinv`).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `throw_gold` swallow | C `:2671–2679`, **new** | after self-dot cancel |
| `throw_obj` coin gate | C `:112–115`, **wired** | quivered → named omit (not throwit) |
| `freeinv` | C `invent.c`, **local splice** | sets `OBJ_FREE`; wallet field extra |
| `add_to_minv` | C `makemon.c:1054`, **imported live** | not `mpickobj` |
| `digests` | C `mondata.h:71–72`, **imported live** | AT_ENGL+AD_DGST |
| `s_suffix_throw_gold` | C `hacklib.c:345–359`, **clone** | it→its / you→your / `s`→`'` / else `'s` |
| `pline_The` | C `pline.c`, **expanded** | `"The gold disappears into …"` |
| `mon_nam` | C `do_name.c`, **imported live** | |
| You() self / unsplit | C `:2661–2668`, **named omit** | JS `return 0` with no pline |
| dz / bhit / ghitm / floor | C `:2682–2730`, **named omit** | |
| quivered gold `throwit` | C continues `throw_obj`, **named omit** | |
| `sho_obj_return_to_u` | C throwit, **named omit** | different function |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new gameplay RNG** on the swallow path (`s_suffix` is string-only). `add_to_minv` merge of existing gold stacks stays named on that pre-existing callee.

## C ↔ JS fidelity

Pinned C (`dothrow.c:2661–2679`):

```
    if (!u.dx && !u.dy && !u.dz) {
        You("cannot throw gold at yourself.");
        ... unsplitobj ...
        return ECMD_CANCEL;
    }
    freeinv(obj);
    if (u.uswallow) {
        ... digests → s_suffix + " entrails" ...
        pline_The("gold disappears into %s.", swallower);
        add_to_minv(u.ustuck, obj);
        return ECMD_TIME;
    }
```

JS self-dot: `return 0` without You()/unsplit (named; `ECMD_CANCEL` — cmd treats truthy as time, so 0 is cancel). Swallow: `freeinv` then `_goldCount -= quan` (local `freeinv` splices invent but does not touch the wallet field; C gold is the invent object). `digests(ustuck.data)` → `` `${s_suffix(mon_nam)} entrails` ``. `pline("The gold disappears into ${swallower}.")` matches `pline_The`. `add_to_minv(ustuck, obj)` not `swallowit`/`mpickobj`. Returns `ECMD_TIME`. Cube (no AD_DGST engl) keeps bare `mon_nam`; purple worm gets entrails.

`s_suffix` clone matches C `strcmpi` it/you and trailing `s`/`S`. `throw_obj`: `COIN_CLASS && obj !== uquiver` → `throw_gold`; quivered `return 0` (C would continue into split/throwit). Non-swallow `throw_gold` `return 0` without `freeinv` — gold stays in invent. That is the named rest-of-function omit, not a fake “Match C bhit gold.”

This is **not** “Match C throw_gold dispatch, callee is a stub.” `add_to_minv` and `digests` run. Do **not** stamp “Match C You() gold-at-self.” Do **not** stamp “Match C `ghitm`.”

## Hallucinations / overclaim

Subject + D-1302 say gold thrown while engulfed is `add_to_minv`'d with an entrails pline. **The swallow arm plus the coin gate are the hunk.** Stamping **Addressed:** D-1302 is fair. Do **not** stamp “Match C unsplitobj.” Do **not** stamp “Match C gold `bhit`/`ghitm`.” Do **not** stamp “Match C quivered sling coins.” Do **not** stamp “Match C `swallowit`” — C deliberately uses `add_to_minv`. Do **not** stamp “Match C `add_to_minv` gold merge.”

## Density

One C arm plus the `throw_obj` gate that must not send coins through `swallowit`. ~75 JS lines. Did not glue dz/bhit. Right size.

## Branch-by-branch confirm

1. Swallowed, digests (purple worm): freeinv, entrails pline, `add_to_minv`. Match `:2671–2679`.
2. Swallowed, cube: no entrails; still `add_to_minv`. Match `digests` false.
3. Self-dot `.`: no ingest, `return 0`. Match cancel; You()/unsplit named.
4. Not swallowed: `return 0`, gold stays. Named rest-of-`throw_gold`.
5. `throw_obj` non-quiver coins → `throw_gold`. Match `:112`.
6. Quivered coins → `return 0`. Named (C throwit).
7. Not `mpickobj` (no `carry_obj_effects` / thrownobj clear from steal.c). Match `add_to_minv`.
8. `sho_obj_return_to_u` still skipped. Named. **Public-unhit** unless a session throws gold while `u.uswallow`.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM.

## Verification

Journal: private canary **33**/33; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a session throws gold while swallowed. Cadence this audit: full `sessions` at this HEAD `1a7839f7` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `36+0.30/turn` (R² 0.85). I did not re-run the private canary.

## Actionable C-wrongs

None for Must-fix. Swallow `freeinv` + `add_to_minv` + entrails `pline` and the coin gate match C `:112–115` / `:2671–2679`.

Named omits (map, not Must-fix):

1. You() gold-at-self + `unsplitobj` (D-0720)
2. dz ceiling / `bhit` / `ghitm` / `ship_object` / `flooreffects` / `sellobj`
3. quivered gold via throwit
4. `sho_obj_return_to_u`; `add_to_minv` stack merge

Do not Must-fix “`_goldCount` beside splice `freeinv`.” Do not Must-fix “`s_suffix` clone in `dothrow.js`.” Do not wrap `wildmiss` as `pline_mon`. Next Open is `dothrow.c` `sho_obj_return_to_u`.

## Callers / RNG ledger

C: `throw_obj` non-quiver coins. JS same. Swallow adds **no** `rn2`. Public fortress is not evidence gold vanished into entrails.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: gold thrown while swallowed now `add_to_minv`s with C's entrails pline; the rest of `throw_gold` and quivered coins stay named.
- Must-fix stays empty for this SHA; this review commit fills archive **Addressed:** D-1302 `1a7839f7`.
