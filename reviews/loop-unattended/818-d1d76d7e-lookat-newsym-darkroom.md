# Review 818 — d1d76d7e — pager.c lookat cmap default defsyms; newsym DARKROOMSYM (D-1848)

## Metadata

- Full / short hash: `d1d76d7e7a414a7e60c3bd650028e66cb152ef7f` / `d1d76d7e`
- Parent: `a2e946b8` (audit D-1841…D-1847, reviews 811–817). Map-driven Must-fix first: review **813** `lookat` `S_room`/`S_darkroom` arms.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-05 08:28:57 +0200
- D-id: **D-1848**
- Stats: `js/display.js` 67 changed / `js/pager.js` 24 changed. `js/` insertions **~60** (Must-fix ships alone per §2b; below the 80–350 port band by design).
- Claims to close: review 813 Must-fix (extra floor arms + `newsym` DARKROOMSYM). Does **not** claim corpus PASS. Names `do_screen_description` ROOM parenthetical as the later owner of the four moved sessions.
- JS / map: `lookat` / `newsym` / `memory_is_cmap`. `c-js-map/turns.md`. Archive **Addressed:** D-1848 `d1d76d7e`.

## Intent vs deliverable

Git subject promises: delete the `S_room`/`S_darkroom` lookat arms C does not have; port `newsym` out-of-sight DARKROOMSYM (keep floor tty; Rogue unlit → `S_stone`) so `glyph_at` already holds `S_darkroom`.

`node scripts/csym.mjs newsym` → `display.c:916–1099`. The out-of-sight correction is the `else if (Is_rogue_level…)` / `else if (!lev->waslit || (flags.dark_room && iflags.use_color))` chain at the tail of the printed body (`:1079–1096` per the D-log; consistent with the 916–1099 range). `lookat` cmap switch `pager.c:779–795` per review 813.

The diff **does** exactly those two things: pager.js loses the two arms (plus `S_room`/`S_darkroom` imports); display.js gains `memory_is_cmap` + the Rogue / non-Rogue memory-correction block. No unrelated subsystem glued.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `lookat` (arm deletion) | LIVE repaired | `default:` → `defsym_explanation` |
| `newsym` memory correction | LIVE new | `:1079–1096` shape |
| `memory_is_cmap` | helper (new, local) | glyph-int compare + tty fallback for old memory |
| `room_cmap_explanation` | kept, still LIVE | `js/getpos.js:506` sync; still used by `do_screen_description` |
| `S_room` / `S_darkroom` imports | removed from pager.js only | `S_darkroom` still exported `js/const.js:117` |
| `look_at_monster` / `doname_with_price` / buried suffixes | OMIT named | in this commit |

`node scripts/sym.mjs` (deleted/re-pointed names):

```
room_cmap_explanation js/getpos.js:506   sync
S_darkroom       js/const.js:117   sync   export const
memory_is_cmap   NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/display.js:1130
darkroom_sym     NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/display.js:3141
Is_rogue_level   js/const.js:3225   sync
```

No second `memory_is_cmap` / `darkroom_sym` clone written. No cycle-forced claim, so no `--can` needed.

FORCE/DIAG/`getRngLog`/`fastforward`/recorded coords in the diff: **none**. `node scripts/imports.mjs --rulecheck` over all of scored `js/`: **Rule #2 clean**.

## C ↔ JS fidelity

**lookat arms.** Current `js/pager.js:1099–1125`: `S_ice` → waterbody, `S_engroom`/`S_engrcorr` → engraving, `S_stone` (unexplored / underwater / stone / FALLTHROUGH), `default:` → `defsym_explanation(symidx)`. No `S_room`/`S_darkroom` case remains. That is C `:779–795` (`S_stone` then `default: defsyms[symidx].explanation`). **Match.** The re-indent of the engraving arms is whitespace only.

**newsym Rogue.** C: glyph==`S_litcorr`+CORR → `S_corr`; glyph==`S_room`+ROOM+`!waslit` → `S_stone`; else show_mem. JS: `Is_rogue_level(game.u?.uz)` → `isLitcorr` → `S_corr`; `isRoomFloor && !loc.waslit` → `S_stone`. **Match**, plus a tty fallback (`ch==='#'` white) inside `isLitcorr`/`isRoomFloor` for memory predating stored glyph ints — lenient only when `mem.glyph` is absent, converges to the C test on fresh memory.

**newsym non-Rogue.** C: `!waslit || (dark_room && use_color)` → litcorr→corr, `S_room`+ROOM→DARKROOMSYM, else show_mem. JS block sits in the `!cansee` path (`js/display.js:4644–4656` early-returns precede it: u_at, sensed-monster, warning). Outer guard `!loc.waslit || darkRoomColor`, same two conversions, same fall-through. **Match**, with two disclosed/undisclosed deltas:
  1. `darkRoomColor` adds `flags.color !== false`, which C does not test — monochrome-mode-only delta, same idiom as `getpos.js:515` / `display.js:4250,4458`. No corpus signal; not queueable as a C-wrong on its own.
  2. The DARKROOMSYM arm keeps tty `ch`/`color` and swaps only the glyph int (D-log discloses "keep floor tty"; screen paint for dark rooms lives at `display.js:4233–4250`). lookat is glyph-first, so floor strings now come from `defsyms[]` as C requires.

**Callee closure.** One `lookat`+`newsym` family. `cmap_to_glyph` / `cmap_idx_to_glyph` (`display.js:575` / `:1619`, both sync), `darkroom_sym`, `Is_rogue_level` LIVE. No STUB in a live arm.

## Hallucinations / overclaim

None. The D-log says PROGRESS (0 PASS, 4 moved past), not PASS; `do_screen_description` is named as the later owner rather than stamped done. The "Match C" posture is earned here: dispatch **and** callee both ported, unlike the D-1843 shape this fixes.

## Density

§2b: Must-fix ships alone — one C-wrong family (`lookat` floor arms + the `newsym` prerequisite the falsifier named). No glued subsystem. Right size for a Must-fix.

## Verification

This audit: `node scripts/hidden-proxy.mjs verify lookat --base 70d84800~1` (D-1843 baseline, re-run on current code) → `2 PASS, 2 moved past, 0 unchanged, 0 worse → PROGRESS`:

```
explore-seed0360-wizard-world-tour-19199bfa: moved → hitum at step 848 (was 826)
explore-seed0360-wizard-world-tour-77350e1f: PASS
explore-seed0367-priest-quest-tour-1cbaa856: PASS
explore-seed0367-priest-quest-tour-b0096089: moved → trapeffect_rolling_boulder_trap at step 347 (was 323)
```

Forward of the D-log's claim (0 PASS / 4 moved to `do_screen_description`@836/835/314/326): the two PASSes and two further moves are the later D-1854 `do_screen_description` port, not a D-1848 regression — no session is blocked on `lookat`, none worse. The Must-fix held. Not vacuous: baseline had 4 blocked, re-run accounts for all 4. D-log also cites green 2/2 + strict + cohort 7/7 + full 44/44 (shared file), which the audit cadence re-checks at the end of this iteration.

## Actionable C-wrongs

None. The review-813 family is closed (arms deleted, `newsym` prerequisite ported branch-for-branch). The `flags.color` extra conjunct is a mono-mode nit shared with three sibling sites — not a one-iter queueable C-wrong; do not file it.

Verdict: **ACCEPT**
