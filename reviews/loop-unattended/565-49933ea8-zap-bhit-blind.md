# Review 565 — 49933ea8 — youprop.h Blind in zap.js bhit (D-1604)

## Metadata
- Full / short hash: `49933ea81990021568f7053d30b007a77ae05bef` / `49933ea8`
- Parent: `d1a832a1` (D-1603). This file audits **this SHA only** (second of nine `js/` commits since review **563**). Archive **Addressed:** D-1604 `49933ea8`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 00:29:21 +0200
- D-id: **D-1604**
- Stats: `js/zap.js` +26/−11. Band **150–350** (js/ insertions **26**).
- Claims to close: Must-fix review **558** (thrown/kicked + FLASHED_LIGHT `!Blind` on sticky `u.Blind||u.ublind`). Not apply camera Blind. Not worm tails. Not Blind clone #29 in `light.js`. `reviews/loop-2026-08-15/` has no unpaid zap-Blind Must-fix.
- JS / map: `zap.js` `Blind` / `bhit`; callee `light.js` `show_transient_light` (D-1597). `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **558** Actionable #1 (QUALITY-RISK). Review file already stamped `**Addressed:** D-1604 49933ea8`.

## Intent vs deliverable

Git subject promises: zap `bhit` `show_transient_light` uses `(HBlinded||EBlinded)&&!BBlinded` instead of sticky `u.Blind`.

Pinned C `youprop.h:103` `#define Blind ((HBlinded || EBlinded) && !BBlinded)`. `zap.c` `bhit` `:3826–4139`. Thrown/kicked + FLASHED_LIGHT gates `:3901–3917`. Cleanup `:4135–4136` thrown/kicked only. `zapyourself` WAN_MAKE_INVISIBLE `:2825–2842` `int msg = !Invis && !Blind && !BInvis`. `--callers bhit`: apply FLASHED_LIGHT `:63` / INVIS_BEAM `:1096`; dokick `:736`; dothrow `:1674`/`:2706`; weffects `:3448`. `--callers show_transient_light`: minion `:166`; zap `:3903`/`:3916`. Camera cleanup is apply `:75` (FLASHED_LIGHT caller, not `bhit_done`).

```103:103:nethack-c/upstream/include/youprop.h
#define Blind ((HBlinded || EBlinded) && !BBlinded)
```

```3901:3917:nethack-c/upstream/src/zap.c
        if (weapon == THROWN_WEAPON || weapon == KICKED_WEAPON) {
            if (obj->lamplit && !Blind)
                show_transient_light(obj, x, y);
            ...
        } else if (weapon == FLASHED_LIGHT) {
            if (!Blind)
                show_transient_light((struct obj *) 0, x, y);
        }
```

Old JS: local `Blind()` was `game.u.Blind || game.u.ublind`. apply.js camera already youprop + `uroleplay.blind` (D-0716). `Blinded_for_invis` was sticky-OR-youprop.

The diff **does** rewrite zap `Blind()` to apply’s shape and collapse `Blinded_for_invis` onto that helper. Both live `bhit` gates still call `Blind()`. It **does not** add Blind in `light.js`, change apply camera, port worm tails, or delete `Blind_props()` (still sticky-OR for `resists_blnd_you`). Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| zap `Blind()` | C `:103`, **LIVE this SHA** (local clone) | same as apply.js D-0716 |
| `bhit` thrown/kicked `!Blind` | C `:3902–3903`, **LIVE this SHA** | now youprop |
| `bhit` FLASHED_LIGHT `!Blind` | C `:3915–3916`, **LIVE this SHA** | same helper |
| `show_transient_light` | C `light.c:255–324`, **LIVE** | D-1597 body |
| `transient_light_cleanup` | C `:327–357`, **LIVE** | thrown/kicked `bhit_done` |
| `Blinded_for_invis` | C `zapyourself` `!Blind`, **LIVE this SHA** | now `return Blind()` |
| apply.js `Blind()` | C `:103` + uroleplay, **CLONE** | unchanged; camera |
| minion S_ANGEL Blind | C `:162`, **CLONE** | inlined youprop; not this SHA |
| `Blind_props()` | **CLONE leftover sticky-OR** | `resists_blnd_you` only |
| worm tails / FLASHED_LIGHT `tmp_at` | **OMIT named** | |
| Blind in `light.js` | **not added** | Must-fix constraint |

`node scripts/csym.mjs --macro Blind` → `youprop.h:103`. `csym.mjs bhit` has no single-line def (multiline signature `:3826`); body is `zap.c:3826–4139`. `zapyourself` → `:2704-3013`. `--callers` as above.

RNG: none in Blind. Extra `hits_bars` `rn2(5)` after thrown flash is C order (D-0990). No seed gate.

`node scripts/sym.mjs` on new / re-pointed names (`Blinded_for_invis` → `Blind()`; no import of apply’s Blind):

```
Blind            NOT EXPORTED — but 28 LOCAL CLONE(S) in 28 file(s):
               js/apply.js:951  js/artifact.js:1031  … js/zap.js:654 …
             => Do NOT write clone #29.
Blinded_for_invis NOT EXPORTED — 1 LOCAL (zap.js:679). Do NOT write clone #2.
show_transient_light js/light.js:176   ASYNC — await required
```

`--can zap.js light.js show_transient_light`: ALREADY. `--can zap.js apply.js Blind`: IN-SCC; apply does **not** export `Blind` (VERDICT CHECK is the missing export, not a TDZ on a live import). They correctly kept a local clone. Do **not** stamp “cycle-forced clone.” Do **not** add Blind #29 in `light.js`. Do **not** import apply.js for Blind.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

Must-fix gate. Thrown/kicked `obj.lamplit && !Blind()` then FLASHED_LIGHT `!Blind()` still sit where C puts them (before iron bars / as the else-if). `Blind()` is now `(H||E)&&!B` plus `uroleplay.blind`. **Match `:3901–3917` + `:103`.** Conferral that writes H/E without sticky `u.Blind` no longer flashes when C would skip, or skip when sticky was stale. That is the **558** C-wrong.

D-0716 house. C Blind does not mention `uroleplay.blind`. apply.js adds it so born-blind `#conduct` matches the rest of the port. zap now matches apply, not a third formula. **Match the house clone.** minion already inlined the same; not this SHA.

`Blinded_for_invis`. C WAN_MAKE_INVISIBLE is `!Invis && !Blind && !BInvis` (`:2829`). Old JS was sticky-OR-youprop (could learn the wand when sticky was true and youprop false, or the reverse). Collapse to `Blind()` **matches C `!Blind`.** Same helper also feeds telepathy-in-dark (`:740`); C `tp_sensemon` uses Blind too. Not a drive-by C-wrong.

Other `Blind()` sites in `zap.js` (fire-smoke puff, `zap_updown` trap lines, `dknown && !Blind`, etc.) now share youprop. C uses one macro. **Match those C `!Blind` tests**; they were already calling the same sticky helper, so this SHA fixes them as a consequence, not a new envelope.

`Blind_props()`. Still `uroleplay || sticky || youprop` for `resists_blnd_you`. C `resists_blnd` uses Blind. Pre-existing dual-store; **not** the `bhit` gate; this SHA did not touch it. Named leftover, not a reopened Must-fix.

Callee closure (`bhit` flash arms). LIVE: `show_transient_light`, `hits_bars` `rn2(5)`, `zap_map` (wand arm). CLONE: `Blind()` now C-matched. OMIT named: worm tails / `tmp_at` DISP_BEAM. STUB: none in the flash arms. Combined-arm may ship. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject `bhit` flash uses youprop: **true** (both arms). D-log “FLASHED_LIGHT sticky vs H/E/B + uroleplay”: **true of the helper.** D-log “Apply camera Blind unchanged”: **true.** Do **not** stamp “retired 28 Blind clones.” Do **not** stamp “Match C `Blind_props` / `resists_blnd_you`.” Do **not** stamp “Match C worm tails.” Do **not** stamp “Match C FLASHED_LIGHT `tmp_at` DISP_BEAM.” Do **not** stamp “imported apply.js Blind.” Public suite has little thrown-lamp / camera coverage.

## Density

Must-fix one item: rewrite the helper the live `bhit` gates already call. +26 JS. Playbook §2b Must-fix stays alone. Did not glue `#seeall` or apply camera. OK.

## Branch-by-branch confirm

1. Thrown lamplit, youprop Blind false: `show_transient_light(obj)`. **Match.**
2. Thrown lamplit, H/E Blind true, sticky `u.Blind` false: skip. **Match** (the 558 miss).
3. FLASHED_LIGHT `!Blind()` then Null-id flash. **Match `:3914–3916`.**
4. Cleanup thrown/kicked at `bhit_done`; FLASHED_LIGHT caller. **Match `:4132–4136`.**
5. WAN_MAKE_INVISIBLE `!Blind`. **Match `:2829`.**
6. Worm / `tmp_at` / `Blind_props` sticky. **Named / leftover.**

## Callers / RNG ledger

Awaited: zap `bhit` (apply camera still uses apply’s Blind). Extra `hits_bars` `rn2` after thrown flash is C. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. Do not add Blind #29 in `light.js`. Do not import `apply.js` for Blind. Do not wrap `wildmiss` as `pline_mon`. Do not skip apply camera because zap `bhit` has FLASHED_LIGHT. Do not restore sticky `u.Blind||u.ublind` on this helper.

## Verification

D-log private canary **12**/12 (FLASHED_LIGHT sticky vs H/E/B + uroleplay; thrown shares `Blind()`; cleanup clears `mtemplit`); green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for conferral Blind ≠ sticky `u.Blind` on a thrown lamp. Fortress does not prove the 558 miss. Worm tails unhit.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): worm tails (`light.c` `:319` comment); FLASHED_LIGHT `tmp_at` DISP_BEAM; `save_light_sources` discard; `Blind_props()` sticky-OR (`zap.js:4109`, `resists_blnd` youmonst); remaining 27 Blind clones in other files. Do not add Blind #29. Do not change apply camera Blind as a “fix.” show_transient_light body is D-1597.

Verdict: **ACCEPT-WITH-DEBT**
