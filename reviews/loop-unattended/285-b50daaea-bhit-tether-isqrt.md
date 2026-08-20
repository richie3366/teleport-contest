# Review 285 — b50daaea — zap.c bhit THROWN_TETHERED_WEAPON / isqrt (D-1323)

## Metadata
- Full / short hash: `b50daaea3b4bd0bc80a3a77478d26f85bfa1e22e` / `b50daaea`
- Parent: `843343cc` (D-1322). This file audits **this SHA only**. Archive **Addressed:** D-1323 `b50daaea` already has the short hash (filled by D-1324).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 00:52:38 +0200
- D-id: **D-1323**
- Stats: 11 files, +172 / −61 — `js/zap.js` +50 / −~16; `js/dothrow.js` +65 / −~20.
- Claims to close: Open `zap.c` bhit THROWN_TETHERED_WEAPON / isqrt (named from D-1311 / review **273**). Not throwit tether open/BACKTRACK. `reviews/loop-2026-08-15/` has no unpaid bhit-tether Must-fix.
- JS / map: `zap.js` `bhit`; `dothrow.js` `throwit` / `throwit_calc_range` / local `isqrt`; `c-js-map/turns.md`. THROWN_WEAPON fly / WEB stick still named.
- Prior reviews this SHA claims to close: **273** named `zap.js` bhit + `isqrt(arw->range)` after DISP_TETHER/BACKTRACK; **278** named the isqrt cap after ACURRSTR urange.

## Intent vs deliverable

Git subject promises: “Match C zap.c bhit so a wielded aklys opens a tether cord and is capped at isqrt of the cord length, instead of FLASH-and-always-END with an uncapped fly loop.”

C `throwit` (`dothrow.c:1664–1677`) after Mjollnir:

```
        else if (tethered_weapon)
            range = min(range, isqrt(arw->range));
        …
        mon = bhit(u.dx, u.dy, range,
                   tethered_weapon ? THROWN_TETHERED_WEAPON : THROWN_WEAPON,
                   0, 0, &obj);
```

`weapon.c:512–516` `AKLYS_LIM = BOLT_LIM/2` (8/2=4); `arwep[]` `{ AKLYS, AKLYS_LIM², 1 }` so `arw->range==16`, `isqrt==4`. `hacklib.h:50` `int isqrt(int)` (odd-subtraction; `hacklib.c` is not in this tree).

C `zap.c` bhit (`:3863–3866`, `:4023–4024`, `:4125–4127`):

```
    } else if (weapon == THROWN_TETHERED_WEAPON && obj) {
        tethered_weapon = TRUE;
        weapon = THROWN_WEAPON;
        tmp_at(DISP_TETHER, obj_to_glyph(obj, rn2_on_display_rng));
    } else if (weapon != ZAPPED_WAND && weapon != INVIS_BEAM)
        tmp_at(DISP_FLASH, obj_to_glyph(obj, rn2_on_display_rng));
    …
            } else if (weapon != ZAPPED_WAND) { /* THROWN / KICKED */
                if (!tethered_weapon)
                    tmp_at(DISP_END, 0);
                result = mtmp;
                goto bhit_done; /* skips after-loop END */
            }
    …
    if ((weapon != ZAPPED_WAND && weapon != INVIS_BEAM && !tethered_weapon)
        || (was_returning && was_returning != iflags.returning_missile))
        tmp_at(DISP_END, 0);
 bhit_done:
```

`hack.h:119–126` enum: `THROWN_TETHERED_WEAPON=2`, `KICKED_WEAPON=3` — JS `const.js` matches. Swallow still opens TETHER in throwit (`:1577–1578`), not via bhit.

Old JS: fly stand-in opened TETHER itself; `throwit_calc_range` skipped the isqrt arm; `bhit` FLASH + always `DISP_END, 0` in `finally` (a real `THROWN_TETHERED` call would snap the cord before throwit’s BACKTRACK).

The diff **does** remap+DISP_TETHER, skip END on monster hit and after-loop unless `returning_missile` was cleared, `min(range, isqrt(arw.range))`, and throwit `bhit(THROWN_TETHERED_WEAPON)` (dynamic import; `export { bhit }` already live). It does **not** route ordinary `THROWN_WEAPON` through `bhit` (fly stand-in stays). WEB `!rn2(3)`, `shade_miss` / `M_AP_OBJECT`, FLASHED_LIGHT `DISP_BEAM`, `show_transient_light` named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `bhit` TETHER remap | C `:3863–3866`, **wired** | then `weapon=THROWN_WEAPON` |
| monster-hit skip END | C `:4023–4024`, **wired** | `bhit_done` ≈ `goto bhit_done` |
| after-loop skip END | C `:4125–4127`, **wired** | unless returning cleared |
| `throwit` → `bhit(THROWN_TETHERED)` | C `:1674–1677`, **wired** | dynamic `import('./zap.js')` |
| `isqrt` | C `hacklib.h:50`, **clone** | odd-subtraction; same as `spell.js` / `apply.js` |
| `min(range, isqrt(arw->range))` | C `:1664–1667`, **wired** | `else if` after Mjollnir |
| `autoreturn_weapon` range | C `weapon.c:516`, **pre-existing** | `AKLYS_LIM²` |
| `obj_glyph` | C `obj_to_glyph(..., rn2_on_display_rng)`, **imported live** | Hallu display stream |
| swallow TETHER | C `:1577–1578`, **pre-existing** | throwit, not bhit |
| THROWN_WEAPON fly | C always `bhit`, **named omit** | JS still inlines |
| WEB stick `!rn2(3)` | C `:3926–3938`, **named omit** | sibling in the loop they edited |
| `shade_miss` / mimic-as-object | C `:3984–3992`, **named omit** | |
| FLASHED_LIGHT `DISP_BEAM` | C `:3861–3862`, **named omit** | |
| `transient_light_cleanup` | C `:4135–4136`, **named omit** | no-op while `show_transient_light` is omitted |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new positional RNG** on the tethered path (`isqrt` is deterministic). WEB `rn2` is the named omit (C would burn it after remap; JS does not). Hallu `obj_glyph` at TETHER open is the display ISAAC stream C passes.

## C ↔ JS fidelity

Throwit no longer opens TETHER itself on the horizontal path; `bhit` does, then steps with `tmp_at(x,y)` + `nh_delay_output` like `:4087–4088`. Monster cell: `if (!tethered_weapon) END` then `bhit_done` so `finally` skips — cord stays open for BACKTRACK. Empty flight: `!tethered || returning_cleared` — skip END. Bars destroy: C bhit `break`s with obj possibly null, skip END (tethered), then throwit `:1684–1691` END 0. JS now hurtles first (C `:1680–1682` is before the null check) then `throwit_tether_end(true, false)`. That is a fidelity **fix** versus the old fly-loop early return.

`isqrt` clone: `while (v >= odd) { v -= odd; odd += 2; rt++; }` — `isqrt(16)===4`. Range `else if` chain matches C `:1660–1669` (boulder / Mjollnir / tethered / uball-infloor), then `uinwater` → 1 (C `Underwater`; pre-existing D-1316).

Kicked callers already used this `bhit`. Non-tethered monster hit ENDs in-loop then `bhit_done` skips `finally` — same as C `goto`. Empty kicked flight ENDs in `finally`. Enum values match `hack.h`.

This is **not** “Match C `bhit` for every throw.” `THROWN_WEAPON` still uses the fly stand-in (FLASH would add delays on every dart). The subject’s aklys dispatch **is** live `bhit`, not a stub.

WEB / shade_miss sit in the same `while` this SHA edited. They are sibling branches, not the remap / END ifs. D-log names them. Not the same drop-on-rewritten-if as review **283**.

## Hallucinations / overclaim

Subject + D-1323 say a wielded aklys opens a tether cord and is capped at `isqrt` of the cord length instead of FLASH-and-always-END with an uncapped fly. **Remap + skip END + isqrt + throwit→bhit are the hunk.** Stamping **Addressed:** D-1323 is fair. Do **not** stamp “Match C `THROWN_WEAPON` `bhit`.” Do **not** stamp “Match C WEB stick `rn2(3)`.” Do **not** stamp “Match C `shade_miss`.” Do **not** treat fortress PASS as an aklys stopping at range 4.

## Density

One caller/callee cluster: throwit isqrt + `bhit(THROWN_TETHERED)` + the three bhit display/END sites C uses for that arg. ~90 executable JS lines. Vanish pline / dokick snuff correctly not glued. Right size (§2b).

## Branch-by-branch confirm

1. Wielded AKLYS, empty cells: `bhit` opens DISP_TETHER, steps, leaves cord open. Match `:3863–3866` + `:4125`.
2. Adjacent monster: open TETHER, no END, return `mtmp`. Match `:4023–4029`.
3. STR18 / owt15 range 9 → `min(9,4)=4`. Match `:1664–1667` + `weapon.c:516`.
4. Weak / underwater: floor 1, isqrt does not raise it. Match `:1632–1633` / `:1671–1672`.
5. Bars destroy tethered: hurtle then END 0 then `throwit_return(FALSE)`. Match `:1680–1691`.
6. Swallow: throwit still `tmp_at(DISP_TETHER)` with no bhit. Match `:1577–1578`.
7. Dart / non-W_WEP: fly stand-in, uncapped by isqrt. Named omit of `:1675` `THROWN_WEAPON`.
8. Kicked: still FLASH + END. `KICKED_WEAPON=3` unchanged.
9. WEB / shade: JS skip (no `rn2`). Named `:3926` / `:3984`.
10. **Public-unhit** unless a session throws a wielded aklys.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Local `isqrt` is not a recorded `4` for one seed. Dynamic `import('./zap.js')` is an ESM cycle, not filesystem. Plain ESM.

## Verification

Journal: private canary **25**/25; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** on wielded aklys. Cadence this audit: full `sessions` at HEAD `2cdf2b1f` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `37+0.30/turn` (R² 0.84). I did not re-run the private canary. Fortress PASS is not evidence the cord cap fired.

## Actionable C-wrongs

None for Must-fix. TETHER remap, skip END, isqrt cap, and throwit→`bhit(THROWN_TETHERED_WEAPON)` match C `:1664–1677` / `:3863–4127`. `bhit` is not a stub for that enum.

Named omits (map, not Must-fix):

1. `THROWN_WEAPON` fly → `bhit` (JS still inlines)
2. WEB stick `!rn2(3)` (`:3926–3938`)
3. `shade_miss` / `M_AP_OBJECT` skip (`:3984–3992`)
4. FLASHED_LIGHT `DISP_BEAM` / `show_transient_light`

Do not Must-fix “await `nh_delay_output`.” Do not Must-fix the local `isqrt` name (algorithm matches `spell.js`). Do not Must-fix vanish pline (next SHA).

## Callers / RNG ledger

C: `#throw` wielded aklys → throwit → `bhit(THROWN_TETHERED)` → AutoReturn BACKTRACK. JS: now the same for tethered; other throws still fly. Public fortress is not evidence `isqrt(16)` or a cord glyph.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: a wielded aklys now flies through live `bhit` with DISP_TETHER, skip-END, and an isqrt cord cap; ordinary throws still use the fly stand-in.
- Must-fix stays empty for this SHA; archive **Addressed:** D-1323 `b50daaea` already filled by the next port commit.
