# Review 485 — 2c688c98 — pager.c object_from_map SLIME_MOLD spe (D-1524)

## Metadata
- Full / short hash: `2c688c98302a66f6dca8105c57c0fc5eb636920f` / `2c688c98`
- Parent: `e13f38ae` (D-1523). This file audits **this SHA only** (third of nine `js/` commits since review **482**). Archive **Addressed:** D-1524 `2c688c98`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-26 04:07:12 +0200
- D-id: **D-1524**
- Stats: 10 files, +262 / −44 — `js/pager.js` +165 / −12, `js/getpos.js` +3 / −1 comment. Band 150–350 (js/ insertions 158).
- Claims to close: Open `pager.c` look SLIME_MOLD `spe = current_fruit` (named from D-1523 / review **484**). Not xname. `reviews/loop-2026-08-15/` has no unpaid look-spe Must-fix.
- JS / map: `pager.js` `object_from_map` / `look_at_object`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **484** / **472** named pager fakeobj `spe`; **482** named it after fake_arti.

## Intent vs deliverable

Git subject promises: a looked-at slime mold that is not a live floor object gets `spe = current_fruit` (or mimic `MCORPSENM`), not leftover spe 0.

Pinned C `pager.c` `object_from_map` `:284–377`:

```313:357:nethack-c/upstream/src/pager.c
    if (!otmp || otmp->otyp != glyphotyp) {
        if (OBJ_NAME(objects[glyphotyp])) {
            otmp = mksobj(glyphotyp, FALSE, FALSE);
        } else {
            otmp = mkobj(objects[glyphotyp].oc_class, FALSE);
        }
        if (otmp->timed)
            obj_stop_timers(otmp);
        fakeobj = TRUE;
        if (otmp->oclass == COIN_CLASS)
            otmp->quan = 2L;
        else if (otmp->otyp == SLIME_MOLD)
            otmp->spe = svc.context.current_fruit;
        if (mtmp && has_mcorpsenm(mtmp)) {
            if (otmp->otyp == SLIME_MOLD)
                otmp->spe = MCORPSENM(mtmp);
            else
                otmp->corpsenm = MCORPSENM(mtmp);
        } else if (otmp->otyp == CORPSE && glyph_is_body(glyph)) {
            ...
        }
```

Callees: `sobj_at` then buried walk (`:300–303`); `m_at` + `is_obj_mappear` (`:306–311`); `mksobj`/`mkobj`/`obj_stop_timers`; `observe_object` if `next2u && !Blind && !Hallucination && (fakeobj \|\| OBJ_FLOOR) && !terrainmode` (`:361–369`); mimic `M_AP_F_DKNOWN` (`:370–373`). Caller `look_at_object` `:380–399`: `distant_name` + `doname_with_price` / `doname_vague_quan`; fake → `OBJ_FREE` + `dealloc_obj`. Also `lookat` `:717`, `look_all` `:2017`, `mhidden_description` `:219`, `uhitm.c` `that_is_a_mimic`, `do_name.c` `namefloorobj`.

Old JS: `look_shown_at` + `doname` on real piles (mkobj already set spe). Fakeobj named.

The diff **does** port `object_from_map` / `look_at_object` with glyphotyp (not integer `glyph_to_obj`), fake SLIME_MOLD `spe`, mimic override, coin quan 2, leash 0, `observe_object`, and point `brief_at` / `look_all` at it. It **does not** port `doname_with_price` / `doname_vague_quan` (doname stand-in). It **does not** port cmap trapped-chest CHEST|LARGE_BOX or `glyph_is_body`/`glyph_is_statue`. It **does not** rewire `that_is_a_mimic` / `namefloorobj` / `mhidden_description` / getpos. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `object_from_map` | C `:284–377`, **LIVE this SHA** | glyphotyp, not glyph id |
| `look_at_object` | C `:380–399`, **LIVE this SHA** | doname stand-in |
| `mksobj` / `mkobj` / `obj_stop_timers` | C mkobj.c, **LIVE** | `FALSE,FALSE` |
| `observe_object` | C `o_init.c`, **LIVE** | invent.js |
| `distant_name` | C objnam, **LIVE** | |
| `costly_spot` | C shk.c, **LIVE** | |
| `sobj_at_look` | C `sobj_at`, **CLONE** | 13th local; not exported |
| `Blind_look` / `next2u_look` / `is_obj_mappear_look` / `has_mcorpsenm_look` | C macros, **CLONE** | match cited macros |
| `doname_with_price` | C, **LIVE elsewhere** | not used here |
| `doname_vague_quan` | C, **OMIT named** | `sym` **NOT FOUND** |
| cmap chest / body-statue corpsenm | C `:293–296` / `:346–349`, **OMIT named** | |
| `that_is_a_mimic` / `namefloorobj` / getpos fakeobj | C, **OMIT named** | still local mksobj / `look_shown_at` |

`node scripts/sym.mjs object_from_map look_at_object mksobj mkobj obj_stop_timers observe_object distant_name doname_with_price doname_vague_quan sobj_at that_is_a_mimic costly_spot`:

```
object_from_map  js/pager.js:604   sync
look_at_object   js/pager.js:681   sync
mksobj           js/mkobj.js:1535   sync
mkobj            js/mkobj.js:1623   sync
obj_stop_timers  js/mkobj.js:763   sync
observe_object   js/invent.js:695   sync
distant_name     js/objnam.js:792   sync
doname_with_price js/shk.js:2599   sync
doname_vague_quan NOT FOUND in js/** (no export, no local function/const).
sobj_at          NOT EXPORTED — but 12 LOCAL CLONE(S) in 12 file(s):
               … => Do NOT write clone #13.
that_is_a_mimic  js/uhitm.js:2382   ASYNC — await required
costly_spot      js/shk.js:547   sync
```

This SHA **does** add `sobj_at_look` (clone #13) because `sobj_at` is not exported. Body is C `sobj_at` (first `nexthere` of `otyp`). Do **not** write clone #14. `doname_vague_quan` stays named, not a re-point.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **RNG:** `mksobj(otyp,false,false)` skips `mksobj_init`; SLIME_MOLD is not CORPSE/STATUE `rndmonnum`. `mkobj(oclass)` for shuffled-out names can roll — only the named extra-type arm. `Hallucination()` is a timeout predicate (D-1493), not a `rn2`. **Public-unhit** (fake named-fruit look). seed0367 still **PASS** at this SHA (bisect: break is D-1526).

## C ↔ JS fidelity

Floor/buried. C `:300–303`: `sobj_at` then buried `ox/oy/otyp`. JS `sobj_at_look` then `buriedobjlist` `nobj`. **Match.** Mimic: C `m_at` then `is_obj_mappear` → `otmp=0`, `mimic_obj`; else `mtmp=0`. JS `mon_at` + `is_obj_mappear_look` (`M_AP_TYPMASK` + `mappearance`). **Match `monst.h:243`.**

Fake alloc. C `OBJ_NAME(objects[glyphotyp])` → `mksobj(..., FALSE, FALSE)` else `mkobj(oc_class, FALSE)`. JS `objectNameStrs[otyp]` (null for shuffled extras). **Match the gate.** `obj_stop_timers` if `timed`. **LIVE.** Coin `quan=2`. **Match `:334–335`.** SLIME_MOLD `spe = current_fruit` (`game.context.current_fruit`). **Match `:336–337`.** Then `has_mcorpsenm` override: slime mold `spe = MCORPSENM`, else `corpsenm`. **Match `:338–345`.** Body/statue glyph corpsenm. **Named omit** (no integer glyphs). LEASH `leashmon=0`. `where=OBJ_FLOOR`, `ox/oy`, `no_charge` if STRANGE_OBJECT && `costly_spot`. **Match `:351–356`.**

Observe. C `next2u` is `distu<=2` (`you.h:558`). JS `dx*dx+dy*dy<=2`. **Match.** `Blind` is `(HBlinded\|\|EBlinded)&&!BBlinded`. JS also ORs `uroleplay.blind` (same as other JS Blind clones; C playmode sets `HBlinded`). `Hallucination()` is the D-1493 timeout, not a sticky-only flag. `fakeobj \|\| OBJ_FLOOR`, `!terrainmode`. Then `observe_object`. **Match `:361–369`.** Mimic `M_AP_F_DKNOWN` or `dknown` → set flag + observe again. **Match `:370–373`.**

`look_at_object`. C `distant_name(otmp, dknown ? doname_with_price : doname_vague_quan)`. JS `distant_name(otmp, doname)`. **Named stand-in.** Fake: `where=OBJ_FREE`; C also `dealloc_obj`. JS never `place_object`; GC. **Match the leak rule.** No `" (buried)"` suffix (`:401–402`). Named with the rest of look_at_object terrain. `brief_at` / `look_all` pass `top.otyp` / `shown.obj.otyp` so a real pile hits `sobj_at` and **does not** allocate fakeobj. **Match the public look path.**

Callee closure (fake SLIME_MOLD arm). LIVE: `mksobj`, `obj_stop_timers`, `observe_object`, `costly_spot`, `fruit_from_indx` via later doname. CLONE: `sobj_at_look` / Blind / next2u / mappear / mcorpsenm matched here. OMIT named: vague_quan, glyph body, getpos, `that_is_a_mimic`. STUB: none. **Arm may ship.** Not “dispatch ported, callee stubbed”: `mksobj` is LIVE.

## Hallucinations / overclaim

Subject fake slime mold `spe = current_fruit` or mimic `MCORPSENM`, not spe 0: **true of the fakeobj arm**. **False as getpos / `that_is_a_mimic` / remembered-gone glyphs.** D-log fake spe / look names fruit / real+buried keep spe / mimic override / coin / leash / observe / no pile leak: **true of that canary**. Stamping **Addressed:** D-1524 for **`:336–343` + look_at_object callers that pass otyp** is fair. Do **not** stamp “Match C `doname_vague_quan`.” Do **not** stamp “Match C integer `glyph_to_obj`.” Do **not** stamp “Match C `that_is_a_mimic`.” Do **not** treat fortress screens as a fake-fruit look. `mksobj` is **not** a stub.

## Density

+158 JS: the C function plus the two pager callers that already named this omit. Did not glue `that_is_a_mimic`. Playbook §2b. Acceptable.

## Branch-by-branch confirm

1. Live floor slime mold: `sobj_at` hit; spe unchanged. **Match.**
2. Buried same otyp: buried walk; no fake. **Match.**
3. No object: `mksobj(FALSE)` then `spe = current_fruit`. **Match `:336–337`.**
4. Mimic + `has_mcorpsenm`: override spe. **Match `:338–343`.**
5. Mimic other otyp: `corpsenm = MCORPSENM`. **Match `:344–345`.**
6. Coin fake: quan 2. **Match.**
7. Adjacent, seen, not Blind/Hallu: `observe_object`. **Match.**
8. `doname_vague_quan` / price. **Named omit.**
9. cmap chest / body glyph. **Named omit.**
10. **Public-unhit** unless a look hits a missing slime-mold glyph.

## Callers / RNG ledger

C: look_at_object / look_all / mhidden / that_is_a_mimic / namefloorobj. JS: brief_at + look_all only. No new `rn2` on the SLIME_MOLD fake arm (`init=FALSE`, not corpse). No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No fs. No FORCE. 13th `sobj_at` clone is cycle cost, not Rule #2.

## Verification

D-log: private canary **16**/16 (C/JS grep; fake spe; look names fruit; real/buried keep spe; mimic override; coin quan=2; leash; observe dknown; no pile leak; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** (fake named-fruit look). This SHA’s seed0367 still PASS. Honest.

## Actionable C-wrongs

None at the claimed fake `spe`. Remaining **named** (map / Open): `doname_vague_quan`; `doname_with_price` in this caller; cmap trapped-chest; glyph body/statue corpsenm; `that_is_a_mimic`; `namefloorobj`; getpos fakeobj; remembered-gone glyphs. Do not Must-fix “export `sobj_at`” this iter (12 existing clones; this copy matches C). Do not Must-fix GC vs `dealloc_obj` (never placed).

Verdict: **ACCEPT-WITH-DEBT**
