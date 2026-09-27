# Review 1941 — 529e9bfc5 — check_wornmask_slots (D-2982)

- SHA: `529e9bfc5` (coverage; `worn.c` `check_wornmask_slots`, wired from `you_sanity_check`)
- Files: `js/worn.js` (`+203/−1`), `js/wizcmds.js` (`+10/−4`)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, seed name, coordinate, or `fastforward` in the `js/` hunks. Rule #2 on this tree: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- `sym.mjs`:

```
check_wornmask_slots js/worn.js:1264   ASYNC — await required
Is_dragon_scales js/makemon.js:450   sync
is_launcher      js/wield.js:122   sync
             !! ALSO 1 LOCAL CLONE: js/u_init.js:1225
is_ammo          js/wield.js:129   sync
             !! ALSO 1 LOCAL CLONE: js/u_init.js:1238
is_missile       js/wield.js:145   sync
             !! ALSO 1 LOCAL CLONE: js/u_init.js:1245
could_twoweap    js/wield.js:1126   sync
fmt_ptr          js/mkobj.js:1795   sync
```

`--can js/worn.js js/makemon.js Is_dragon_scales`, `--can js/worn.js js/wield.js could_twoweap`, and `--can js/wizcmds.js js/worn.js check_wornmask_slots` all print `ALREADY` on this tree (the new imports are the static edges). The `u_init.js` clones are not called from this function.

## Intent vs deliverable

Subject: `you_sanity_check` never walked worn slots, so a suit missing from the pack, a second object with the same bit, embedded scales that are not the hero's dragon, or a bad two-weapon state never reached `impossible()`.

The diff adds `check_wornmask_slots` and calls it from `you_sanity_check` immediately before `check_invent_gold('invent')`.

## Inventory

| JS | Class | C |
|----|-------|---|
| `check_wornmask_slots` | live async `worn.js:1264` | `worn.c:354–471` |
| `Is_dragon_scales` | imported `makemon.js:450` | `obj.h:347–348` |
| `is_launcher` / `is_ammo` / `is_missile` | imported `wield.js` | `obj.h:235–248` |
| `could_twoweap` | imported `wield.js:1126` | `mondata.h:129–132` |
| `is_weptool` / `bimanual` | file-local, matched | `obj.h:249–250`, `:257–259` |
| `heroInvent` | pack walk, not a C function | `gi.invent` / `nobj` |

## C ↔ JS fidelity

No `rn2`. C walks `worn[]` until `w_mask` is 0 (`worn.c:18–34`, terminator at `:34`). JS uses the same 16 slots in that order and has no terminator because the array is fixed. `IGNORE_SLOTS` is `W_ART|W_ARTI|W_SADDLE|W_BALL|W_CHAIN`. A mask that is only those bits is skipped, so ball and chain are not checked here. `config.h:637` defines `EXTRA_SANITY_CHECKS`, so both `#ifdef` blocks are live.

For a filled slot, C searches `gi.invent` by pointer. Missing object, bit unset, or any bit outside `m|IGNORE_SLOTS` is `impossible("Worn-slot insanity: %s.", whybuf)` with the C wording, including `0x%08lx`. JS `hex08` is `>>> 0` padded to 8; these masks fit in 32 bits (`I_SPECIAL` is `0x20000000`). The pack is `game.invent` in array order. A second object with the bit set is reported, except `uskin` on `W_ARM` when `I_SPECIAL` is set. That exception matches `worn.c:398–401`.

`uskin` then requires `W_ARM|I_SPECIAL` both set, no extra bits, `Is_dragon_scales`, and `Dragon_scales_to_pm(o) == &mons[u.umonnum]`. JS compares `PM_GRAY_DRAGON + otyp - GRAY_DRAGON_SCALES` to `u.umonnum` (`obj.h:353–354`). The failure text uses `pmnames[umonnum][NEUTRAL]` (`NEUTRAL` is 2). `Is_dragon_scales` is the otyp range in `obj.h:347–348`.

`u.twoweap` checks the same else-if chain: missing `uwep`/`uswapwep` with the `"without %s%s%s"` splice, shield, not a weapon, launcher/ammo/missile, `bimanual`, then `!could_twoweap(youmonst.data)`. File-local `bimanual` reads `oc_big`, which is the generated `oc_bimanual` field (`objects_data.js`). `is_weptool` is tool class and `oc_skill != P_NONE`. `could_twoweap` counts `AT_WEAP` in the first three `mattk` slots and requires more than one (`mondata.h:129–132`). If `youmonst.data` is missing, JS uses `mons(u.umonnum)` (or the role `mnum`). C would dereference `youmonst.data`. That fallback is outside the live path once `set_uasmon` has run.

The only C call is `wizcmds.c:1439`, after the HP/Pw clamps and before `check_invent_gold("invent")`. JS `you_sanity_check` (`wizcmds.js:715–716`) does that. `sanity_check_worn` is a comment at `worn.c:398`, not a call.

## Hallucinations / overclaim

The subject describes this walk. "No arm omitted" matches the body, including both `EXTRA_SANITY_CHECKS` blocks. The `u_init.js` launcher/ammo/missile clones are not this function. Ledger is `worn.c`. The data-pointer fallback is a guard, not a claimed C arm.

## Density

The whole 118-line C function and its one caller shipped together. About 200 lines of JS, inside the breadth band.

## Verification

```
verify check_wornmask_slots: baseline 529e9bfc5~1 (scoreboard at de27c57ac, 2026-09-27T16:38:44.388Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify check_wornmask_slots: no corpus session is blocked on it at 529e9bfc5~1 — a vacuous verify is NOT a corpus PASS. ...
smoke check_wornmask_slots: no RNG-tagged reach; fixed smoke spread (12 run, 3.6s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks. D-2982 records green 2/2, strict ×2, cohort 7/7, skip full (`wizcmds.js` / `worn.js` are not on the shared-file list). This re-run shows no `REGRESSED` session. Sanity checks are opt-in, so a public session not running `sanity_check` does not exercise the new `impossible` paths.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
