# Review 09 — e395bb74 — Vlad case 10 HConfusion only (D-1048)

## Metadata
- Full / short hash: `e395bb742b3ac38378c55c29f33a04018bbf891c` / `e395bb74`
- Parent: `1d2b6460` (reviews 07/08; queued this Must-fix)
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-15 23:56:04 +0200
- D-id: **D-1048**
- Stats: 11 files, +88 / −38 — `js/sit.js` +12 / −9, `js/read.js` +5 / −3
- Claims to close: D-1033 **risk 2** (case 10 also forced flat `u.Confusion`). Stamped **Addressed:** D-1048 `e395bb74` on that review in the same SHA.
- JS / map: `sit.js` case 10 + `read.js` `seffect_remove_curse`; `c-js-map/data.md` sit row; cadence **#1320** **44**/44 (this review iter)

## Intent vs deliverable

Git subject promises: “Match C special_throne_effect case 10 HConfusion only so confused remove-curse does not force a flat u.Confusion flag.”

D-1033 risk 2: C `sit.c:310–323` saves `HConfusion`, writes `HConfusion = 1L`, calls `seffects(&fake)` with a blessed `SPE_REMOVE_CURSE` book, then restores the saved long. JS also saved/set/restored a separate flat `u.Confusion`. Pinned `youprop.h:83–84` is `#define HConfusion u.uprops[CONFUSION].intrinsic` / `#define Confusion HConfusion`. There is **no** `EConfusion` in this pin. Forcing then restoring a JS-only flat flag desynced readers that ORed one field or the other.

The diff **does** drop the flat save/set/restore in case 10, and change `seffect_remove_curse` from
`!!(u.Confusion || (u.HConfusion|0) || (u.EConfusion|0))` to `!!(u.HConfusion|0)`.

It does **not** retouch sibling `seffect_*` that still OR a flat `u.Confusion` mirror (`seffect_magic_mapping`, `seffect_teleportation`, `seffect_enchant_weapon`, …). D-log names that. The subject does not claim a whole-file Confusion cleanup.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `special_throne_effect` case 10 | C function, retouched | `sit.c:310–323`; save / `= 1` / `seffects` / restore on `HConfusion` only |
| `seffects` | imported C callee | `read.js`; `SPE_REMOVE_CURSE` arm already dispatched D-1033 |
| `seffect_remove_curse` | C function, retouched reader | `read.c:1489–1605`; confused flag only this SHA |
| fake SPE_REMOVE_CURSE object | pre-existing | C `cg.zeroobj` then three fields; JS literal `{otyp,oclass,blessed,cursed}` |
| `u.Confusion` flat | JS mirror | `make_confused` still copies `HConfusion` onto it (`potion.js:474`); case 10 no longer writes it |
| `EConfusion` | **no-op / absent in C** | not in `youprop.h`; JS OR was a hallucination of 3.6-style props |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates in the JS hunks. Rule #2 clean. Frozen contracts untouched.

## C ↔ JS fidelity

### Case 10 — call-for-call, no RNG

C `sit.c:310–323`:

```
case 10:
{
    struct obj fake_spellbook;
    long save_confusion = HConfusion;
    fake_spellbook = cg.zeroobj;
    fake_spellbook.otyp = SPE_REMOVE_CURSE;
    fake_spellbook.oclass = SPBOOK_CLASS;
    fake_spellbook.blessed = 1;
    HConfusion = 1L;
    (void) seffects(&fake_spellbook);
    HConfusion = save_confusion;
    break;
}
```

JS `sit.js:577–592` after this SHA: `save_confusion = u.HConfusion`; `u.HConfusion = 1`; dynamic `import('./read.js')`; `await seffects({ otyp: SPE_REMOVE_CURSE, oclass: SPBOOK_CLASS, blessed: 1, cursed: 0 })`; `u.HConfusion = save_confusion`.

| Step | C | JS | Match |
|------|---|----|-------|
| save | `long save_confusion = HConfusion` | `const save_confusion = u.HConfusion` | yes (full long, not TIMEOUT bits only) |
| set | `HConfusion = 1L` | `u.HConfusion = 1` | yes; overwrites FROMOUTSIDE/FROMFORM for the call, then restore |
| fake | `zeroobj` + otyp/oclass/blessed; cursed stays 0 | same four fields; other zeros implicit/`undefined` | yes for this reader (`scursed` false, `sblessed` true) |
| call | `seffects(&fake)` | `await seffects(...)` | yes; C `seffects` takes `struct obj *` then passes `&sobj` into `seffect_remove_curse` |
| restore | `HConfusion = save_confusion` | same | yes; wipes any `make_confused` the callee might have done — C does too; this callee does not mutate HConfusion |
| flat `u.Confusion` | **does not exist** | **no longer written** | yes (this was the C-wrong) |

**No `rn2`/`rnd`/`rn1`/`d` in case 10.** `seffects` still `exercise(A_WIS)` when `oc_magic` (`read.c:2199–2200`; JS `read.js:843–844`). Pre-existing. Blessed confused remove-curse walks invent and `blessorcurse(obj, 2)` (`read.c:1556`) — that RNG is the callee, not this SHA.

C `1L` is timeout 1 (TIMEOUT is the low 16 bits). JS `1` is the same integer. Restoring the saved long puts a prior 50-turn confusion back. Match.

`seffects` dispatch: C `read.c:2225–2227` `case SCR_REMOVE_CURSE: case SPE_REMOVE_CURSE: seffect_remove_curse(&sobj);`. JS `read.js:856–858` the same two otyps, `await seffect_remove_curse(sobj)` by value. C’s `**` is so a scroll can be `useup`’d inside other seffects; this fake book is not in invent and is not used up. Pre-existing D-1033 shape. Not a new stub.

Fake object: C copies `cg.zeroobj` so `quan==0`, `cursed==0`, `unpaid==0`. JS literal omits `quan`. The self-skip `obj === sobj && obj->quan == 1` (`read.c:1521–1522`; JS `read.js:479`) is for a singleton scroll hiding from its own invent walk. The fake is not on `game.invent`. Harmless.

### `seffect_remove_curse` confused predicate

C `read.c:1495`: `boolean confused = (Confusion != 0);` with `Confusion` ≡ `HConfusion` (`youprop.h:83–84`). Any non-zero intrinsic bit is confused, including FROMOUTSIDE.

JS before: ORed flat `u.Confusion` and `u.EConfusion`. A leftover flat 1 with `HConfusion === 0` would take the confused “need some help” / `blessorcurse` arm. C would not. That is exactly the D-1033 risk: case 10 wrote the flat flag, then restored it, leaving a sticky JS-only confused if restore of flat and HConfusion diverged, **and** any reader that trusted the flat flag while HConfusion was the C truth.

JS after: `!!(u.HConfusion | 0)`. Same as `Confusion != 0`. **Not** `HConfusion & TIMEOUT` — FROMOUTSIDE still counts. Match.

Feel strings (`read.c:1499–1503`): unconfused “like someone is helping you.” / confused “like you need some help.” / Hallu unconfused Universal Oneness / Hallu confused “the power of the Force against you!”. JS `read.js:464–468` same four. The confused boolean is the only input this SHA changed. With `HConfusion = 1` and `blessed = 1`, C takes the confused invent walk (`blessorcurse(obj, 2)`, `bknown = 0`) not `uncurse`. JS does too once the predicate is HConfusion-only.

This SHA does **not** rewrite the invent walk, `wornmask` uswapwep/uquiver carve-outs, LOADSTONE/LEASH, or deferred Punished/`unpunish` / buried-ball / saddle glow. Those were D-1033 body; still named. `blessorcurse(obj, 2)` still consumes `rn2` inside the confused arm — callee RNG, not case 10.

### What C does *not* do (so JS must not)

Pinned C has **no** `EConfusion`:

```
#define HConfusion u.uprops[CONFUSION].intrinsic
#define Confusion HConfusion
```

(`youprop.h:83–84`.) Blindness has `HBlinded`/`EBlinded`/`BBlinded` (`youprop.h:87–103`). Confusion is intrinsic-only, like `Stunned` ≡ `HStun` (`youprop.h:80–81`). The old JS OR of `EConfusion` was a 3.6-shaped guess, not this pin. Dropping it in this one reader is C, not a new omit.

`make_confused` (`potion.js:461–475`) still mirrors `u.Confusion = u.HConfusion` for JS gates. Case 10 no longer pokes that mirror. After restore, the mirror can be stale until the next `make_confused` / timeout tick. That is **JS-internal**: C has one location. `seffect_remove_curse` now ignores the stale flat, which is what C does. Sibling seffects that still OR the flat flag can still see a stale 1. D-log deferred that; it is the remaining JS-shaped debt, not a regression of case 10.

Timeout (`timeout.js:258–269`) still writes both `u.HConfusion` and `u.Confusion` on the CONFUSION prop tick. C only has `HConfusion`. A public path that sits Vlad’s throne mid-timeout is unhit; if it ever hits, case 10 restore of `HConfusion` is still the C write, and this reader no longer consults the extra field.

## Hallucinations / overclaim

“Match C special_throne_effect case 10 HConfusion only” is **true for the writer and for this callee’s confused predicate.** This is **not** “Match C dispatch, callee is a stub.” `seffect_remove_curse` is the real function (partial body since D-1033); this SHA only corrected how it reads Confusion.

It is **not** a claim that every `seffect_*` now reads `HConfusion` only, or that Punished/`unpunish` / buried ball / steed saddle / `update_inventory` / SPE_REMOVE_CURSE `#cast` now run. Stamping D-1033 risk 2 **Addressed** is fair. Risk 4 (steed `"your steed"`) stays named, not Must-fix.

Cadence **#1320** 44/44 does not prove a Vlad throne sit. Journal admits public **unhit**. Private 12/12 (no flat write; HConfusion restore; leftover flat/EConfusion not confused; HConfusion-only is) is the right falsifier.

## Density (§2b)

One Must-fix: stop writing a flag C does not have, and make the one reader that case 10 actually calls match `Confusion != 0`. ~10 lines of JS. Playbook “too small” is a one-`if` map peel with no queued C-wrong. This was the **queued** D-1033 risk 2. Not “finish seffects.” Sibling OR-flat readers left on purpose.

## Verification

Journal: green+strict PASS; sit cohort seed0106 Scr **267**/267, seed0107 **98**/98, seed4500 **1814**/1814, seed0108 **303**/303. Private node **12**/12. Path **unhit**. This review’s cadence **#1320** full `sessions` **44**/44 Scr **11405**/11405 RNG **792838**/792838 (100%) speed `31+0.26/turn` (R² 0.871). Adequate: fortress plus private flag checks. Public `#sit` seeds are not on Vlad’s throne.

## Actionable C-wrongs

None that belong on Must-fix from **this** SHA. D-1033 risk 2 (extra flat `u.Confusion`) is actually closed.

Named omits (map, not queue): other `seffect_*` still OR a flat Confusion mirror; Punished/`unpunish`; `buried_ball_to_freedom`; steed saddle `Yobjnam2`/`hcolor`; `update_inventory`; SPE_REMOVE_CURSE `#cast`; fake book is not a full `zeroobj`. Remaining Must-fix below this review is still `pickup_object` telekinesis, then `u_wipe_engr`/`tmp_at`, cursed-lamp `make_glib` `HGlib|EGlib`, `cry_sound` `msound`, `get_obj_location` flags.

Do not restore case 10 `u.Confusion = 1`. Do not OR `EConfusion` into this pin’s Confusion. Do not pop tut-1 as a substitute while Must-fix is open.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: case 10 now save/set/restores only `HConfusion` like `sit.c:310–323`, and `seffect_remove_curse` reads that same intrinsic; sibling seffects still OR a JS flat mirror.
