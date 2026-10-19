# Review 2920 — 8f42be36e — object_from_map body/statue corpsenm arm

- SHA: `8f42be36e` (cliff, writer behind `glibr`/`auto_describe` rows)
- D-entry: D-4079; Ledger: pager.c (`object_from_map`, D-4079)
- `js/` diff: `js/pager.js` +20 −9

## Intent vs deliverable

Promise: the fake object built for a remembered corpse kept mksobj's
random corpsenm, so farlook/autodescribe named «an iguana corpse» where
C said «a watchman corpse» (26 sessions). Diff: `object_from_map(glyphotyp,
x, y, glyph = null)` ports C :346–349 after the mimic arm.
`look_at_object` gains `glyph`, and the two lookat callers (lookat's
object arm, look_all) pass the map glyph. Promise = diff.

## Inventory

- `object_from_map` — pager.js:1826–1890; C pager.c:284–377.
- `look_at_object` — pager.js:1923; C :381–.
- `lookat` object arm — pager.js:2178; `look_all` — pager.js:2336
  (C :2015–2018).

## C ↔ JS fidelity

```c
if (mtmp && has_mcorpsenm(mtmp)) { … MCORPSENM(mtmp) … }
else if (otmp->otyp == CORPSE && glyph_is_body(glyph))
    otmp->corpsenm = glyph_to_body_corpsenm(glyph);
else if (otmp->otyp == STATUE && glyph_is_statue(glyph))
    otmp->corpsenm = glyph_to_statue_corpsenm(glyph);
if (otmp->otyp == LEASH) otmp->leashmon = 0;
```

The JS chain has the same order: mimic first, then body, statue, leash.
The helpers match display.h:915–928 (piletop before plain, fem before
male):

```text
glyph_to_body_corpsenm   js/display.js:1264 sync
glyph_to_statue_corpsenm js/display.js:1302 sync
object_from_map          js/pager.js:1826   sync
```

Live C callers (`csym --callers`): pager.c:386 look_at_object (wired),
pager.c:219 mhidden_description (JS pager.js:2007, no glyph),
do_name.c:701 (JS do_name.js:1694, no glyph), and uhitm.c:6233
`that_is_a_mimic` (JS uhitm.js:4604, which passes `mtmp.mappearance` and
no glyph). In C every caller passes the glyph, so the arm always runs.
In JS the optional `glyph = null` silently skips it for three of four
callers. The D-log names two of them. **uhitm.js that_is_a_mimic is not
named.** None of the three is a corpus block today: a mimic with
mcorpsenm takes the mimic arm first.

## Hallucinations / overclaim

The D-log says the rows were "owned by auto_describe/getpos callers".
At the parent, the board owned **24 of them by `glibr`** (wield.c): the
attribution put corpse-name toplines on glibr. The fix is still right.
But the 4 rows still blocked under `glibr` are the same farlook/getpos
shape (C «an orc corpse» vs JS getpos help/«unexplored area»), not
wield.c. The port slot should read them as autodescribe rows.

## Density

One C arm plus the threading through one file's callers. One Ledger
bullet. No RNG: the arm reads the glyph only.

## Verification

```text
verify glibr (--base 8f42be36e~1): 28 blocked → 24 PASS, 4 unchanged, 0 worse
  unchanged: chain-Healer-50450034 s712, chain-Ranger-50255604 s114,
  chain-Tourist-610146 s587, sweep-Barbarian-50456033 s218
verify auto_describe: 5 blocked → 3 PASS (shop Archeologist/Monk/Rogue), 2 unchanged
verify lookat: 4 blocked → 1 PASS (shop-Tourist-50159024), 3 unchanged (fog cloud / unexplored)
verify look_at_object, object_from_map: 0 blocked (vacuous)
```

The D-log says 26 FULL PASS out of 37. The re-measure finds 28 rows
flipped (24 + 3 + 1); two of the auto_describe ones are shared with
D-4077's window. The numbers are consistent. No FORCE/DIAG/seed strings.

## Actionable C-wrongs

1. Make the three no-glyph callers pass the map glyph, as C does:
   do_name.js:1694, pager.js:2007 (mhidden_description), uhitm.js:4604
   (that_is_a_mimic). This is debt, not reached by any session (§10.19).

Verdict: **ACCEPT-WITH-DEBT**
