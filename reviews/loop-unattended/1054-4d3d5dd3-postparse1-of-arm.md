# Review 1054 — 4d3d5dd3 — readobjnam postparse1 corpse-type arm (D-2084)

## Metadata

- SHA: `4d3d5dd3` — `objnam.c postparse1 dropped the " of <monster>" corpse-type arm (queue owner rnd_otyp_by_namedesc) (D-2084).`
- JS diff: `js/readobjnam.js` ~60 lines (2 import lines, `d` defaults, `tin of`/`of` arm, `:5342–5344` tail, comments).
- Docs: D-2084 D-log/D-index/CURRENT/NOTES/queue/turns.md+eat map.
- Next index: 1054.

## Intent vs deliverable

Subject promises the `" of <monster>"` corpse-type arm (figurine
truncation) so `srch` draws C's `rn2(26)`. Diff ports the full
`:4371–4397` conditional plus init defaults and the tin-variety
tail. Promise == diff; no scope creep.

## Inventory

- Changed: `readobjnam` (readobjnam.js) — new parse arm, no new
  helpers.
- Callees per `sym.mjs` (all pasted in-session; the commit
  re-points `tin_variety_txt`/`set_tin_variety` from map-named to
  imported): `tin_variety_txt` live sync `js/eat.js:2256`,
  `set_tin_variety` live sync `js/eat.js:2276`, `name_to_mon` live
  sync `js/mondata.js:405`, `strstri` live sync
  `js/hacklib.js:261` (its 2 clones live elsewhere, untouched),
  `RANDOM_TIN` live const export. No stub in a live arm.
- Diff grep: no `FORCE`/`DIAG`/seed reads, no coordinates.

## C ↔ JS fidelity

All three C cites read directly. Guards verbatim (`wand ` /
`spellbook ` / `gauntlets ` / `gloves ` / `finger `). The
`tin of` exact-spinach vs variety + `name_to_mon(s.slice(tmp))`
matches C; the `of`-truncate (`slice`, C `*d->p = 0`) with the
`LOW_PM` gate and `mgend` box matches C; init defaults match
`:3946–3949`; the tail matches `:5342–5344` with `rn2(4)` drawn
before the `|| wizardMode()` short-circuit exactly as C.

Fall-through audit (C tin arm does `return 2` = goto typfnd, JS
falls through): the amulet / makesingular / alt-spellings /
class-words / gem blocks are all `!d.typ`-guarded — safe. The
no-`of` scan runs but is prefix-anchored (`mondata.js:343`
`startsWith`) and no monster name prefixes a `"tin of …"` string
— safe. ONE gap: the gold block (`isGold` suffix check) is NOT
`!d.typ`-guarded, so wish `"tin of gold piece"` returns a
GOLD_PIECE object in JS where C's `return 2` skips postparse
Case 3 and makes a tin. Genuine live-arm divergence on a
constructible input — see Actionable 1. It also contradicts the
D-log's blanket «every block below is !d.typ-guarded or a no-op».

## Hallucinations / overclaim

The fall-through blanket claim above is the only overclaim. The
same-step re-attribution reading (§3 «later owner») is disclosed
with row-diff evidence (Priest RNG fully matched 3097/3097).

## Density

One C conditional family, ~60 lines — right-sized per §2b.

## Verification

D-log Verify bullet: `verify --fn rnd_otyp_by_namedesc` →
`0 PASS, 2 moved past, 0 unchanged, 0 worse → PROGRESS` (both
same-step re-attributed to checkfile). Re-measured myself:
`hidden-proxy.mjs verify rnd_otyp_by_namedesc --base 4d3d5dd3~1`
→ identical `0 PASS, 2 moved past (2 re-attributed at the same
step), 0 unchanged, 0 worse → PROGRESS`. The owner flip with
fully matched RNG is the expected signature of the parse now
resolving. Claim reproduced exactly. Rule #2 clean (prior step).

## Actionable C-wrongs

1. Gold-block fall-through on tin-typed `bp`: guard the `isGold`
   block with `!d.typ` (C `return 2` skips postparse Case 3;
   one-line, same-file fix). Falsifier: wish `"tin of gold
   piece"` → tin (C) vs gold pieces (JS now). Queued as Must-fix,
   Next cluster set.

## Verdict

Verdict: **QUALITY-RISK**

**Addressed:** D-2089 fd3f5f38
