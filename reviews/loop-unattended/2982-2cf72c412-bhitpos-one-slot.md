# Review 2982 — 2cf72c412 — one `game.bhitpos` for C's gb.bhitpos

- SHA: `2cf72c412` (near-pass cliff; owner = writer zap.c probe_monster /
  bhitm, 1 row)
- D-entry: D-4142; Ledger: bhitm ported; flooreffects ported;
  probe_monster ported
- `js/` diff: 8 files, +26/−28 (apply, do, dokick, dothrow, insight,
  light, muse, zap)

## Intent vs deliverable

Promise: C keeps one `gb.bhitpos`. JS split it into `game._bhitpos`
(bhitm, muse, dothrow, flooreffects) and `game.bhitpos` (uhitm, mhitu,
trap, dogmove…). A probing zap from inside an energy vortex (weffects
`u.uswallow` → bhitm without bhit) read a stale `_bhitpos`, set
notonhead, and skipped «… is not carrying anything besides you.». Diff:
every `_bhitpos` read and write is renamed to `bhitpos`. flooreffects'
save / restore now reads a zero-defaulted copy. Promise = diff.
`grep -a _bhitpos js/*.js` → only comments.

## Inventory

- `bhitm` — zap.js:4124; C zap.c:160–… (notonhead :185).
- `probe_monster` — zap.js:3997; C zap.c:625–640 (:628–629).
- `flooreffects` — do.js:777–971; C do.c:161–359 (save :183–184,
  restore :358).
- Renamed readers: use_stethoscope, do_break_wand, really_kick_object,
  throw_gold, mstatusline, show_transient_light, mbhitm, fhito_loc,
  bhit (zap.js:6319), bhit_skiprange, zap_steed.

## C ↔ JS fidelity

The rename is correct at every site, and the owner arm now matches:
`gn.notonhead = (mtmp->mx != gb.bhitpos.x || …)` reads the slot that
use_stethoscope / weffects last wrote. JS gets the value right only if
`game.bhitpos` is a single object that everyone mutates. Several
capturers rely on that: bhit (`const bhitpos = game.bhitpos`, then
`bhitpos.x += ddx` per step), bhitm, bhit_skiprange, zap_steed,
fhito_loc, throw_gold. C's slot is a by-value struct, so a nested
save/restore leaves the outer writer's view intact. JS still
**reassigns** the slot in three places:

```js
game.bhitpos = { x: x | 0, y: y | 0 };   // do.js:783  flooreffects
game.bhitpos = save;                       // do.js:971  flooreffects
game.bhitpos = save_bhitpos;               // zap.js:2773 dobuzz
game.bhitpos = { x: cc.x, y: cc.y };       // apply.js:3818 / :3987 use_pole / use_grapple
```

C names the case this breaks (do.c:178–182): "erode_obj() … needs
bhitpos, but that was screwing up wand zapping that called us from
rloco(), so we now restore bhitpos before we return". In JS, a
WAN_TELEPORTATION beam whose bhito → rloco → flooreffects
(teleport.c:2141) runs mid-bhit leaves `game.bhitpos` pointing at the
restored copy, which stays frozen at that square. bhit keeps stepping
its captured object, so every later bhitm on the same beam reads a stale
bhitpos, and notonhead is wrong (probe, long-worm arms). Monster death
inside bhitm → relobj → mdrop_obj → flooreffects (steal.c:837) does the
same. Before this SHA the same break existed on `_bhitpos`. The rename
carries it over onto the unified slot. The fix is in-place
`game.bhitpos.x/.y` save / restore, the shape uhitm.js:3687 and
trap.js:6563 already use.

## Hallucinations / overclaim

"One slot, as in C" holds for naming, not for aliasing. The D-log's
Named line lists only the `|| {}` fallbacks. No corpus session reaches
the rloco-mid-beam path (0 blocked on bhitm / flooreffects at
`2cf72c412~1`, 0 PASS→FAIL in this audit's full rescore).

## Density

A mechanical rename across eight files that fixes the owner's arm.

## Verification

```text
verify probe_monster (--base 2cf72c412~1): scen-worldtour-Wizard-95207 PASS → PROGRESS
verify bhitm / flooreffects: 0 blocked
```

Exact match with the D-log (644/644).

## Actionable C-wrongs

1. do.c flooreffects `:183–184` / `:358`, zap.c dobuzz `:4826` /
   `:5036`, apply.c use_pole / use_grapple: write `game.bhitpos` in
   place (fields), never replace the object, so bhit / bhitm capturers
   keep C's by-value slot. Unreached → ledger flooreffects `partial`
   (omit names it), not Must-fix. It rides with the next zap.c / do.c
   cliff.

Verdict: **ACCEPT-WITH-DEBT**
