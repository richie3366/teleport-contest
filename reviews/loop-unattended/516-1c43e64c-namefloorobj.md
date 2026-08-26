# Review 516 — 1c43e64c — do_name.c namefloorobj getpos / call_ok / Hallu (D-1555)

## Metadata
- Full / short hash: `1c43e64cf1778044135b1740473e95228f26d864` / `1c43e64c`
- Parent: `1918ea61` (D-1554). This file audits **this SHA only** (seventh of nine `js/` commits since review **509**). Archive **Addressed:** D-1555 `1c43e64c`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-26 13:44:08 +0200
- D-id: **D-1555**
- Stats: `js/do_name.js` +124 / −18, `js/iactions.js` +3 / −34. Band 150–350 (js/ insertions **127**).
- Claims to close: Open `namefloorobj` (named from D-1547 / D-1554 / review **508**). Not that_is_a_mimic. `reviews/loop-2026-08-15/` has no unpaid namefloorobj Must-fix.
- JS / map: `do_name.js` `namefloorobj` / `call_ok` / `objtyp_is_callable`; iactions import. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **508** named `namefloorobj`; **515** named it again.

## Intent vs deliverable

Git subject promises: `#name-f` uses getpos, floor/glyph objects, Hallu unames, and `call_ok`/`docall` instead of an Esc-only stub.

Pinned C `do_name.c` `namefloorobj` `:678–757` (`csym` 80 lines). Caller `docallcmd` `:590–591` `'f'`. Callees `call_ok` `:479–495`; `objtyp_is_callable` `:428–463`; `getpos`; `object_from_map`; `simpleonames`/`The`; `docall`; Hallu `unames[6]` + `rn2_on_display_rng`.

```687:751:nethack-c/upstream/src/do_name.c
    if (getpos(&cc, FALSE, buf) < 0 || cc.x <= 0)
        return;
    if (u_at(cc.x, cc.y)) {
        obj = vobj_at(u.ux, u.uy);
    } else {
        glyph = glyph_at(cc.x, cc.y);
        if (glyph_is_object(glyph))
            fakeobj = object_from_map(glyph, cc.x, cc.y, &obj);
    }
    /* … simpleonames / STRANGE_OBJECT; Hallu unames[6]; else call_ok /
       !dknown / docall; fakeobj dealloc */
```

Old JS: `namefloorobj_stub` set a pending message and looped until Esc. No getpos, no objects, no Hallu, no `docall`.

The diff **does** port the body, move `call_ok`/`objtyp_is_callable` to C’s home (iactions **deletes** those clones and imports `call_ok`), wire `'f'`/`','`. It **does not** port `docallcmd` `m`/`o`/`d`, `dealloc_obj`, `rename_disco`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `namefloorobj` | C `:678`, **LIVE this SHA** | local (C `staticfn`) |
| `call_ok` | C `:479`, **LIVE this SHA** | was iactions clone |
| `objtyp_is_callable` | C `:428`, **LIVE this SHA** | |
| `getpos` | C getpos.c, **LIVE** | force FALSE |
| `object_from_map` | C pager.c, **LIVE** | D-1524 |
| `glyph_to_obj_at` | C `glyph_is_object`, **LIVE** | D-1547 |
| `objects_at` | C `vobj_at`, **LIVE** | pile head |
| `docall` | C, **LIVE** | |
| `rank_of` / `bogusmon` / `roguename` | C, **LIVE** | Hallu unames |
| iactions `call_ok` / `objtyp_is_callable` | **deleted** → import | |
| `docallcmd` m/o/d | C `:593+`, **OMIT named** | |
| `dealloc_obj` | C `:755–756`, **OMIT named** | `OBJ_FREE` + GC |

`node scripts/csym.mjs namefloorobj` → `do_name.c:678-757`. `--callers`: proto `:14`; `docallcmd` `:591`. `call_ok --sig` → `:479-495`. `--callers call_ok`: `do_name.c:582` (`#if 0`), `:744`; `iactions.c:68`.

`node scripts/sym.mjs namefloorobj call_ok objtyp_is_callable object_from_map glyph_to_obj_at docall vobj_at objects_at rank_of`:

```
namefloorobj     NOT EXPORTED — 1 LOCAL js/do_name.js:875
             => Do NOT write clone #2
call_ok          js/do_name.js:98   sync
objtyp_is_callable js/do_name.js:72   sync
object_from_map  js/pager.js:656   sync
glyph_to_obj_at  js/display.js:716   sync
docall           js/do_name.js:966   ASYNC — await required
vobj_at          NOT FOUND
objects_at       js/mkobj.js:2130   sync
rank_of          js/roles.js:709   sync
```

**Re-point:** iactions **deleted** local `call_ok` / `objtyp_is_callable` → import `call_ok` from `do_name.js`. Do **not** add those clones back. `vobj_at` remains unnamed; `objects_at` is the pile-head stand-in (do not add a `vobj_at` clone). `namefloorobj` stays unexported (C `staticfn`).

`node scripts/imports.mjs --can do_name.js pager.js object_from_map`: **ALREADY** (this SHA added the static import). pager already imported do_name. Cycle is the 82-module SCC; `object_from_map` is **not** a top-level TDZ read (only inside `namefloorobj`). Not a Rule #2 issue.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. `node scripts/imports.mjs --rulecheck`: Rule #2 clean. **Display RNG** on the Hallu path (`rn2_on_display_rng(30)` + `bogusmon` + pick 6); `roguename` still burns **core** `rn2` like C.

## C ↔ JS fidelity

getpos. `force=false`; goal over/under from `uundetected && hides_under(youmonst.data)`. Cancel `<0` or `x<=0`. **Match `:687–695`.**

Hero cell. `u_at` → `objects_at(u.ux,u.uy)` not `cc` (C `vobj_at(u.ux,u.uy)`). **Match.** Else `glyph_to_obj_at` then `object_from_map`. **Match glyph_is_object + object_from_map.** Empty → “There doesn't seem to be any object under you/there”. **Match `There()` text.**

STRANGE_OBJECT. Skip `simpleonames` (would be “glorkum”). **Match `:715–717`.** Always fails Hallu? C says it fails Hallu test — wait, C: “always fail the Hallucination test and pass the !callable test”. Hallu is about the **hero**, not the object. Mimic STRANGE_OBJECT still takes the Hallu **hero** branch if the hero is Hallu. The comment means simpleonames is unsafe and the object will EXCLUDE if not Hallu. JS: Hallu hero still uses `The(buf)` with strange-object name then unames. **Match C control flow** (Hallu is first). Non-Hallu EXCLUDE. **Match.**

Hallu unames. [0] role m/f with `Upolyd?u.mfemale:flags.female`; [1] `rank_of(rn2_on_display_rng(30)+1, Role_switch, flags.female)` — JS `urole.mnum` ≡ C `Role_switch` (`you.h:248`); `rank_of` looks up by mnum; third arg `flags.female` not polyd. **Match.** [2]=[3] `bogusmon`; [4] `roguename`; [5] `"Wibbly Wobbly"`; pick `rn2_on_display_rng(6)`. **Match SIZE.** `The(buf)` + decide/decides. **Match.**

`call_ok`. EXCLUDE if !callable; DOWNPLAY if !dknown or (known && !uname); else SUGGEST. **Match `:482–494`.** `objtyp_is_callable`: oc_uname; Yendor amulets false; listed classes if OBJ_DESCR (`objectDescrs[oc_descr_idx]`). **Match `:428–462`.** Floor path: EXCLUDE → “can't be assigned”; !dknown → “don't know … well enough”; else `docall`. **Match `:744–751`.**

Fakeobj. `OBJ_FREE`. **Named vs dealloc.**

Callee closure. LIVE: `getpos`, `objects_at`, `glyph_to_obj_at`, `object_from_map`, `call_ok`, `objtyp_is_callable`, `simpleonames`, `The`, `docall`, `rank_of`, `bogusmon`, `roguename`, `Hallucination`. CLONE: none of a C function. OMIT named: `dealloc_obj`, `docallcmd` m/o/d. STUB: **none.** The `'f'` arm may ship.

## Hallucinations / overclaim

Subject getpos / floor / Hallu / call_ok: **true**. Stamping **Addressed:** D-1555 is fair for **508**. Do **not** stamp “Match C `docallcmd` monster/discoveries.” Do **not** stamp “Match C `dealloc_obj`.” Do **not** stamp “Match C `vobj_at` under that name.” This is **not** “dispatch ported, callee stubbed” — `call_ok` and `object_from_map` are LIVE. iactions no longer has a second `call_ok` (CURRENT Keep).

## Density

+127 JS: one C `staticfn` + its callees moved home. Did not glue DELPHI fountain. §2b OK.

## Branch-by-branch confirm

1. Esc / `x<=0`: return. **Match.**
2. Hero cell, live pile: `objects_at` → `docall` if callable+dknown. **Match.**
3. Other cell, object glyph: fakeobj path. **Match.**
4. No object: There-text. **Match.**
5. Hallu: six unames, display rng pick, core rng in `roguename`. **Match.**
6. EXCLUDE (gold, Yendor, …): can't assign. **Match.**
7. !dknown: don't know well enough. **Match.**
8. Fakeobj after: `OBJ_FREE`. **Named vs dealloc.**

## Callers / RNG ledger

C: `docallcmd` `'f'` only. JS same (`'f'` and lootabc `','`). Public-unhit until a session `#name`s a floor object. Display rng on Hallu only.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. Direct do_name→pager is a new static edge in an existing SCC; no top-level TDZ.

## Verification

D-log canary **20**/20; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit.** Admit it.

## Actionable C-wrongs

None for Must-fix. Named: `docallcmd` `m`/`o`/`d`; `dealloc_obj`; `rename_disco`; iactions still has a local `name_ok` (do not add `call_ok` clone #2). DELPHI `S_fountain` is the **next** Open (D-1556), not this SHA.

Verdict: **ACCEPT-WITH-DEBT**
