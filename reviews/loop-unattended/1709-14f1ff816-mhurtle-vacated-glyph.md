# Review 1709 — 14f1ff816 — vacated cell drops the chickatrice glyph (D-2750)

Metadata: commit `14f1ff816`, D-2750, closes review 1708 Must-fix (`scen-genesis-Archeologist-91135` screen step 178, owner `mhitm_knockback`). JS change is `mon_at_display` in `js/display.js`, not `mhurtle_step`. Seven insertions. No prior review of this SHA.

## Intent vs deliverable

Subject promises the vacated cell after `remove_monster` + `newsym` stops keeping the chickatrice glyph, because `mon_at_display` skips `MON_OFFMAP` the way `m_at` does. The diff does that and nothing else: one `continue` in the `fmon` scan, plus `MON_OFFMAP` on the existing `const.js` import, plus the comment. `mhurtle_step` is not edited. No new function.

## Inventory

Changed JS: `mon_at_display` (`js/display.js:426–445`). No symbol deleted or re-pointed (local clone → import). `sym.mjs` on the helper this diff edits:

```text
mon_at_display   NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/display.js:426
MON_OFFMAP       js/const.js:1563   sync   export const
m_at             js/mon.js:1714   sync
             !! ALSO 4 LOCAL CLONE(S) in 4 files — IMPORT the export
               js/dig.js:203  js/shknam.js:271  js/teleport.js:122  js/uhitm.js:471
level_mon_at     js/worm.js:63   sync
```

`mon_at_display` is the display-side clone of exported `m_at`. `node scripts/imports.mjs --can display.js mon.js m_at` is **SAFE** (same 98-module SCC; `m_at` is a hoisted function, no TDZ). This commit did not switch the call. The new predicate is the one `m_at` already applies in its own `fmon` scan (`js/mon.js:1728`).

Classification: **clone** of C `m_at` (`rm.h:516`, the live `#else` arm: `svl.level.monsters[x][y]`). Not a no-op. Not a new C callee.

## C ↔ JS fidelity

C `remove_monster` (`rm.h:534`, the live arm) stores a null grid pointer and does not touch `mx`/`my`. C `m_at` (`rm.h:516`) is that pointer. C `newsym` (`display.c:916–1099`) reads it at `:969` (can see) and again at `:1046` (cannot). After the clear, both reads are null, and the can-see tail is `_map_location(x, y, 1)` (`display.c:1034`).

`mhurtle_step` (`dothrow.c:1003–1007`) is `remove_monster(old)`, `newsym(old)`, `place_monster`, `newsym(new)`. JS already calls that order (`js/dothrow.js`, unchanged here). `remove_monster` (`js/steed.js:1161–1174`) deletes the grid key and sets `MON_OFFMAP` on the head whose `mx`/`my` still match. `place_monster` (`js/steed.js:1148–1152`) then writes `mx`/`my`, the grid key, and `mstate = MON_FLOOR`.

`level_mon_at` (`js/worm.js:63–71`) already returns null on `MON_OFFMAP`. The bug was the scan after that: `mon_at_display` walked `fmon` by `mx`/`my` and drew the head on the cell `remove_monster` had just cleared. The pre-`1b2e6cd12` `rloc_to` path zeroed `mx`/`my`, so the same scan missed. The new `continue` matches `m_at`'s skip (`js/mon.js:1728`).

With the head skipped, `newsym` (`js/display.js:5081`) gets a null monster. Can-see, not the hero, not a region, not a warning, not a memory `I`: `map_location(x, y, true)` at `:5129`, the empty-cell arm. Destination `newsym` runs after `place_monster` cleared `MON_OFFMAP` and wrote the grid, so `level_mon_at` returns the head and `display_monster` still runs (`:5109`).

Same lookup, same result, at the other `mon_at_display` sites (`look_shown_at` `:1505`, glyph class `:3702`, `glyph_at` `:4166`, invisible-memory guard `:4843`). C `display.c:764` is `glyph_is_invisible && m_at`; an off-map head is not `m_at`. `dokick.js:902` sets `MON_OFFMAP` then `newsym` of the old cell before moving `mx`/`my`; that first `newsym` was the same stale draw, and the comment there already said `m_at` skips the bit.

Residual vs exported `m_at`, not this delta: the `fmon` arm still treats `mhp == null` as alive (`m.mhp == null || m.mhp > 0`) while `m_at` treats `(m.mhp | 0) <= 0` as dead. C `m_at` does not read `mhp`. `level_mon_at` already drops `mhp <= 0` before this scan. A vacated hurtling head has `mhp > 0` and `MON_OFFMAP`, so the null-`mhp` arm does not decide this cell. Not a second Must-fix.

No RNG in the changed function.

## Hallucinations / overclaim

The subject names `dothrow.c` `mhurtle_step`. The patch is the display lookup `newsym` uses. The D-log says that, and says `mhurtle_step` control flow is unchanged. That matches the diff. "Same predicate `m_at` uses" is the JS `MON_OFFMAP` skip, not the C macro (C has no such bit). No "whole body / every callee live" claim on this SHA. No FORCE, DIAG, `getRngLog`, seed name, coordinate gate, or `fastforward` in the `js/` hunk. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## Density

One predicate on the lookup the previous iteration's `remove_monster`/`newsym` pair depends on. Right size for a Must-fix. Not an arm-only port sold as a function.

## Verification

Re-measured on the working tree (`display.js` unchanged since this SHA). `--base 14f1ff816~1 --reach-all`. The parent scoreboard blob is stamped `cc5059beb`. The row was a screen owner, not N blocks on `mhurtle_step`.

```text
verify mhurtle_step: baseline 14f1ff816~1 (scoreboard at cc5059beb, 2026-09-23T09:14:38.646Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify mhurtle_step: no corpus session is blocked on it at 14f1ff816~1 — a vacuous verify is NOT a corpus PASS. If the queue row cited N corpus blocks, re-run with --base <the commit that row was queued at>; otherwise ship with the public gates + the reach line below and say so in the D-log.
smoke mhurtle_step: no RNG-tagged reach; fixed smoke spread (24 run, 3.0s): 24 PASS, 0 regressed → REACH-OK
```

0 REGRESSED. The tagger reports no corpus session executes `mhurtle_step`, so the 0-block line is the vacuous note, not a hidden PASS sold as corpus movement. The session review 1708 named was re-run directly (hidden worker): `scen-genesis-Archeologist-91135` **passed**, RNG 6017/6017, screens 186/186, owner null. That is the D-log's 186/186 claim, confirmed. Green/strict/cohort/full 44 are the D-log's `verify.mjs` bullet; this re-measure did not re-run those gates.

## Actionable C-wrongs

None. The `mhp == null` difference from exported `m_at` does not change the vacated cell.

Verdict: **ACCEPT**
