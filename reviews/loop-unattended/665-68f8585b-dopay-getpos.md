# Review 665 — 68f8585b — shk.c dopay multi-shk getpos (D-1704)

## Metadata
- Full / short hash: `68f8585b7b8f977de03436f99b79699bbf405c3a` / `68f8585b`
- Parent: `3d728adf` (D-1703). Twelfth of fifteen `js/` commits since **653**. Archive **Addressed:** D-1704 `68f8585b`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-30 04:19:12 +0200
- D-id: **D-1704**
- Stats: `js/shk.js` +45/−10. Total `js/` insertions **45** <250. Band **150–350** (id >454 floor **200**).
- Claims to close: Open `dopay` multi-shk getpos. Not Traditional itemize. Not mute/Deaf nod. `reviews/loop-2026-08-15/` has no unpaid dopay-getpos Must-fix.
- JS / map: `shk.js` `dopay`. `c-js-map/turns.md`.
- Prior: **664** named this Open.

## Intent vs deliverable

Git subject promises: paying among multiple spotted shopkeepers uses `getpos`, instead of silently picking the resident after D-1703.

`node scripts/csym.mjs dopay` → `shk.c:1742–2035`. Multi-shk arm `:1811–1856`. `--callers`: `cmd.c` `'p'`; `uhitm.c:494`. `getpos` `getpos.c:769–1167`. `m_next2u` `you.h:560`. `m_at` / `cansee` / `canspotmon` / `Monnam` / `Shknam`.

```1816:1848:nethack-c/upstream/src/shk.c
        pline("Pay whom?");
        cc.x = u.ux;
        cc.y = u.uy;
        if (getpos(&cc, TRUE, "the creature you want to pay") < 0)
            return ECMD_CANCEL;
        cx = cc.x; cy = cc.y;
        if (cx < 0) { pline("Try again..."); return ECMD_OK; }
        if (u_at(cx, cy)) { You("are generous to yourself."); return ECMD_OK; }
        mtmp = m_at(cx, cy);
        if (!cansee(cx, cy) && (!mtmp || !canspotmon(mtmp))) {
            You("can't %s anyone there.", !Blind ? "see" : "sense");
            return ECMD_OK;
        }
        ...
        shkp = mtmp;
```

Parent: `shkp = resident` in the `else` of `seensk === 1`; invented “no shopkeeper” when `!resident`. The diff **does** live getpos pay-whom with C branch order and messages; `ECMD_CANCEL` on ESC; `if (!shkp) return` before proceed. It **does not** port `debugpline0`. Named-as-debug. It **does not** change `seensk === 1` / `sk == 1 && resident` / `nexttosk`. Those already matched C.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `dopay` seensk>1 arm | LIVE | `:1811–1848` |
| `getpos` | LIVE import | force TRUE; `< 0` cancel |
| `m_at` | LIVE import | was not a local clone in `shk.js` |
| `cansee` / `canspotmon` / `u_at` / `Blind` / `Monnam` / `Shknam` | LIVE | already in file |
| `m_next2u` | CLONE | `you.h:560`; 5 locals — do **not** add #6 |
| `debugpline0` | OMIT | debug-only |

`node scripts/sym.mjs`:

```
dopay            js/shk.js:4509   ASYNC — await required
getpos           js/getpos.js:1068   ASYNC — await required
m_at             js/mon.js:1234   sync  (+ 4 clones in other files — IMPORT, do not add)
cansee           js/vision.js:1059   sync
canspotmon       js/display.js:577   sync
Monnam           js/do_name.js:870   sync
Shknam           js/shknam.js:467   sync
m_next2u         NOT EXPORTED — 5 LOCAL (shk.js:3431 among them)
```

`node scripts/imports.mjs --can shk.js getpos.js getpos` → **ALREADY** (static import; no new edge). `--can shk.js mon.js m_at` → **ALREADY**. FORCE/DIAG/`getRngLog`/`fastforward`: none. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**When the arm runs.** C: after `nexttosk==1` goto; after no-shk / `!seensk`; after `sk==1 && resident`; `seensk==1` picks the spotted shk; **else** (`seensk > 1`) getpos. JS `else if` chain the same; getpos only in the last else. **Match.** Do **not** steal the `sk==1 && resident` shortcut.

**getpos.** C `cc = (u.ux,u.uy)`, `getpos(&cc, TRUE, "the creature you want to pay") < 0` → `ECMD_CANCEL`. JS `{x: ux, y: uy}`, `getpos(cc, true, ...)`. JS `getpos` mutates `ccp.x/y` on pick (`getpos.js:1163–1164`) and returns `-1` on cancel. `cx < 0` → `"Try again..."` is C’s out-of-map / aborted-with-negative-x path, not ESC. **Match `:1816–1826`.**

**Branch order after pick.** `u_at` generous; `m_at`; `!cansee && (!mtmp || !canspotmon)` can’t see/sense (`!Blind()` → `"see"` else `"sense"`); no mtmp; `!isshk` `Monnam` not interested; `mtmp !== resident && !m_next2u` `Shknam` too far; else `shkp = mtmp`. JS the same order and strings (`You`/`There` folded into `pline`). **Match `:1827–1848`.** `m_next2u`: `distu <= 2` ≡ `dx*dx+dy*dy <= 2`. **Match the macro.**

**Null shkp.** C `:1851–1853` `debugpline0` then `ECMD_OK`. JS silent return. Not a scored message.

Callee closure. LIVE: `getpos`, `m_at`, `cansee`, `canspotmon`, `Monnam`, `Shknam`, `u_at`, `Blind`. CLONE: `m_next2u`. STUB: **none**. Combined-arm ships. `getpos` is the real async input, not a no-op.

**`seensk === 1` not this else.** C `:1800–1810` walks `next_shkp` for the one spotted shk; too-far is `"is not near enough"` (not `"too far"`). JS that arm unchanged. The new strings `"too far to receive your payment"` only in the getpos else **Match `:1844–1846`.** Mixing the two messages would be a C-wrong. `force=TRUE` getpos keeps unknown keys in-loop (`getpos.js` comment). **Match C TRUE.**

**RNG.** `getpos` itself has no `rn2` on the pick. `hidden_gold` is not this arm. **Match.**

**`nexttosk` / resident still first.** C `goto proceed` skips getpos when `nexttosk==1` or `sk==1 && resident`. JS `if / else if` **Match**. This SHA must not run getpos in those arms. **Match.** `ECMD_CANCEL` is 0x80-ish in contest; JS `ECMD_CANCEL` from const. **Match.**

## Hallucinations / overclaim

Subject “uses getpos instead of silently picking the resident”: **true** for `seensk > 1`. Do **not** stamp “Match C `debugpline0`.” Do **not** stamp “Match C Traditional itemize.” Do **not** route `seensk === 1` through getpos. Do **not** add `m_at` clone #5 in `shk.js`. Do **not** add `m_next2u` #6. Do **not** treat `getpos < 0` as `"Try again..."` (`cx < 0` is that line).

## Density

§2b: one `dopay` arm + its C callees. Related. +45.

## Verification

D-log: save-oracle skip; green+strict seed8000/0900; focused seed0116 127/127; cohort 10/10. Public `p` **is** hit; `seensk > 1` (two spotted shks) is **public-unhit**. Admit that. ESC/`ECMD_CANCEL` is a canary, not a FAIL peel.
`getpos` force TRUE.

## Actionable C-wrongs

None for Must-fix. Named: FullyUsedUp/PartlyUsedUp; Traditional itemize ynq; mute/Deaf thank-you nod; `bill_box_content` (D-1705); `SetVoice`. Do **not** add `m_next2u` #6. Do **not** add `m_at` clone in `shk.js`. Do **not** restore `shkp = resident` in this else. Do **not** import a second `getpos`. No `rn2` in this arm.

Verdict: **ACCEPT-WITH-DEBT**
