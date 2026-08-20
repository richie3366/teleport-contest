# Review 273 — 3633eb61 — dothrow.c throwit tethered DISP_TETHER / BACKTRACK (D-1311)

## Metadata
- Full / short hash: `3633eb61862c405e89a8ed0fd25faff53ac04d76` / `3633eb61`
- Parent: `59177f02` (reviews **269–272**). This file audits **this SHA only**. Archive row **Addressed:** D-1311 `3633eb61` already has the short hash (filled by D-1312).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 22:01:47 +0200
- D-id: **D-1311**
- Stats: 10 files, +205 / −61 — `js/display.js` +74 / −~8; `js/dothrow.js` +61 / −~20; journal rotate.
- Claims to close: Open `dothrow.c` throwit tethered DISP_TETHER / BACKTRACK (named from D-1303 / review **272**). Not leader catch. `reviews/loop-2026-08-15/` has no unpaid tether Must-fix.
- JS / map: `dothrow.js` `throwit` / `throwit_returning_missile` / `throwit_tether_end`; `display.js` `tmp_at` / `tether_glyph`; `c-js-map/turns.md`. zap `bhit` `THROWN_TETHERED_WEAPON` / `isqrt` / ACURRSTR urange named.
- Prior reviews this SHA claims to close: **265** named outbound DISP_TETHER and BACKTRACK after `sho_obj_return_to_u`; **272** set Next Open to this row.

## Intent vs deliverable

Git subject promises: “Match C dothrow.c throwit so a wielded aklys shows a tether cord outbound and BACKTRACK on return, instead of snapping home with no DISP_TETHER.”

C `throwit` (`dothrow.c:1523`) `tethered_weapon = (arw && arw->tethered && (wep_mask & W_WEP) != 0)`. Swallow (`:1577–1578`) opens `tmp_at(DISP_TETHER, obj_to_glyph(obj, rn2_on_display_rng))`. Horizontal fly is `bhit(..., THROWN_TETHERED_WEAPON, ...)` (`:1674–1675`); `zap.c` bhit (`:3863–3866`) opens the same TETHER then steps with `tmp_at(x,y)` + `nh_delay_output` (`:4087–4088`); a monster cell does **not** `tmp_at(DISP_END)` (`:4023–4024`) so the cord stays open for the caller. Success AutoReturn (`:1712–1713`) `tmp_at(DISP_END, BACKTRACK)`; fail/consumed (`:1688–1689` / `:1702–1703` / `:1761–1762`) `DISP_END, 0`. Non-tethered AutoReturn still FLASH-walks (`sho_obj_return_to_u`, D-1303). `display.c` `tether_glyph` (`:1127–1133`) is `zapdir_to_glyph(sgn(u-x), sgn(u-y), 2)`. BACKTRACK (`:1228–1237`) walks `sidx-1` delays then erases.

Old JS: D-1303 FLASH for Mjollnir; wielded aklys took an empty BACKTRACK `if`; fly never opened DISP_TETHER; `tmp_at` recorded cells but skipped the cord and the delay walk.

The diff **does** open TETHER on swallow and on the JS fly stand-in, paint `tether_glyph` on prior cells, delay empty-cell steps, BACKTRACK on return, END 0 on fail/consumed. It does **not** port `zap.js` `bhit` `THROWN_TETHERED_WEAPON`, `isqrt(arw->range)`, or ACURRSTR urange (fly still stubs range 5). Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `throwit_tethered_weapon` | C `:1523`, **clone of predicate** | `autoreturn_weapon` AKLYS `{tethered:1}` already live |
| swallow `tmp_at(DISP_TETHER, …)` | C `:1577–1578`, **wired** | no flight steps |
| fly TETHER open + step | C bhit `:3863–4088`, **JS fly stand-in** | zap.js bhit still named |
| `tether_glyph` | C `:1127–1133`, **new** | zap type 2 toward @ |
| `sgn_tether` | C `hacklib.c` `sgn`, **clone** | |
| `tmp_at` TETHER step | C `:1264–1292`, **wired** | cord on prev, object glyph at tip |
| `tmp_at_tether_backtrack` | C `:1225–1240`, **clone** | await; C delays inside `tmp_at` |
| `throwit_tether_end` | C END BACKTRACK\|0, **helper** | no-op if not tethered |
| `obj_glyph` | C `obj_to_glyph(..., rn2_on_display_rng)`, **imported live** | Hallu display stream |
| `isqrt` tether range | C `:1664–1667`, **named omit** | |
| zap.js `THROWN_TETHERED_WEAPON` | C `zap.c:3863`, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new positional RNG.** Hallu `obj_glyph` at TETHER open is the display ISAAC stream, same callback C passes. Outbound `nh_delay_output` is animationFrame, not ISAAC.

## C ↔ JS fidelity

Pinned C (`dothrow.c:1710–1762` + `display.c:1225–1237` + `:1264–1292`):

```
        if (iflags.returning_missile) {
            if (rn2(100)) {
                if (tethered_weapon)
                    tmp_at(DISP_END, BACKTRACK);
                else
                    sho_obj_return_to_u(obj);
                …
            } else {
                if (tethered_weapon)
                    tmp_at(DISP_END, 0);
                pline("%s to return!", Tobjnam(obj, "fail"));
```

JS `throwit_returning_missile` now takes the precomputed `tethered_weapon` flag (no second `autoreturn_weapon` read). Fail-to-return (`!rn2(100)`) END 0 then the fail pline then swallowit — order matches `:1760–1774`. Success BACKTRACK then the existing return-to-hand / drop arms. Mjollnir (`!tethered`) still FLASH-walks.

TETHER step: if `sidx` then `show_glyph(prev, tether_glyph(prev))`, save new cell, then `show_glyph(x,y, object glyph)` + flush. JS copies that, including painting the object at the tip after the cord. Monster cell: JS `m_at` then `break` **before** `tmp_at(x,y)` — matches C bhit leaving the tether open without painting the occupied cell (`:4021–4029`).

`DISP_TETHER=-3` / `BACKTRACK=-1` match `display.h:229` / `:238` (`BACKTRACK` collides with `DISP_BEAM=-1` in both trees; the selector is the first `tmp_at` arg, so END+BACKTRACK is `(-7,-1)`).

This is **not** “Match C throwit tether dispatch, `tmp_at` BACKTRACK is a no-op.” The delay walk is live. It **is** a fly-loop stand-in, not `zap.js` `bhit`.

## Hallucinations / overclaim

Subject + D-1311 say a wielded aklys shows an outbound cord and BACKTRACK on return. **Open TETHER + cord + BACKTRACK + END 0 are the hunk.** Stamping **Addressed:** D-1311 is fair. Do **not** stamp “Match C `zap.c` `bhit` `THROWN_TETHERED_WEAPON`.” Do **not** stamp “Match C `isqrt(arw->range)`.” Do **not** stamp “Match C ACURRSTR urange.” Do **not** stamp “Match C `throwit_mon_hit`” — this SHA still calls `thitmonst` after the fly (see review **275**).

## Density

One throwit envelope (tethered open/step/close) plus the `tmp_at` TETHER/BACKTRACK arms C uses for that caller. ~90 executable JS lines. Leader catch and isqrt correctly not glued. Right size (§2b).

## Branch-by-branch confirm

1. Wielded AKLYS, empty cells: open TETHER, `tmp_at`+delay per cell, cord on prior. Match bhit `:4087–4088` + `:1272`.
2. Adjacent monster: open TETHER, no step paint, sidx 0. Match `:4023` skip END.
3. AutoReturn `rn2(100)` success: BACKTRACK. `sidx>1` delays `sidx-1` then erase. Match `:1228–1240`.
4. `sidx<=1` BACKTRACK: erase only, no delay. Match the `sidx>1` gate.
5. Fail-to-return / consumed / bars destroy: END 0, no BACKTRACK. Match `:1688` / `:1761`.
6. Swallow: open TETHER, no steps. Match `:1577–1578`.
7. Mjollnir / non-W_WEP aklys: FLASH `sho_obj_return_to_u`. Match `:1714–1715`.
8. Range still 5, not `min(range, isqrt)`. Named omit of `:1664–1667`.
9. **Public-unhit** unless a session throws a wielded aklys.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `obj_glyph` is not a glyph stand-in invented this SHA. Plain ESM.

## Verification

Journal: private canary **31**/31; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a wielded aklys flies. Cadence this audit: full `sessions` at HEAD `a1d48196` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `37+0.32/turn` (R² 0.85). I did not re-run the private canary.

## Actionable C-wrongs

None for Must-fix on **this** SHA’s promised envelope. TETHER open, cord, empty-cell delay, monster cell unpainted, BACKTRACK `sidx>1`, END 0, and Mjollnir FLASH skip match C `:1523` / `:1577–1578` / `:1712–1762` / `display.c:1127–1292`.

Named omits (map, not Must-fix):

1. `zap.c` `bhit` `THROWN_TETHERED_WEAPON` (JS fly stands in)
2. `isqrt(arw->range)` tether cap
3. ACURRSTR urange (fly stub 5)
4. `throwit` still calling `thitmonst` not `throwit_mon_hit` — **not this SHA’s Open**; see review **275**

Do not Must-fix “await BACKTRACK Promise.” Do not Must-fix `sgn` clone. Do not Must-fix `You()` vs `pline`. Next Open after this SHA was leader catch (now D-1312).

## Callers / RNG ledger

C: `#throw` wielded aklys → `throwit` → bhit TETHER → AutoReturn BACKTRACK. JS: fly loop. Public fortress is not evidence a cord glyph or `sidx-1` delays fired.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: wielded aklys now opens DISP_TETHER, paints a zap-type-2 cord, and BACKTRACKs on return; `zap.js` bhit / `isqrt` / ACURRSTR stay named.
- Must-fix stays empty for this SHA; archive **Addressed:** D-1311 `3633eb61` already filled by the next port commit.
