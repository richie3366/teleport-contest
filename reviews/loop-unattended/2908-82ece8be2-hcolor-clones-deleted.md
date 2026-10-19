# Review 2908 — 82ece8be2 — four local hcolor clones → do_name.js hcolor

- SHA: `82ece8be2` (cliff, writer port: clone deletion ×4)
- D-entry: D-4067; Ledger: do.c (`doaltarobj`), sit.c, read.c
  (crystal ball / rndcurse callers), apply.c (`flip_through_book`); D-4067
- `js/` diff: apply.js, detect.js, do.js, sit.js (+9/−29)

## Intent vs deliverable

Promise: the local `hcolor` / `hcolor_apply` clones were identity (or a
core-RNG pick) and skipped C's Hallucination display-RNG colour, giving
«a black flash» for «a bistre flash». Delete them and import the live
`hcolor` (Valkyrie-50156016 → FULL PASS, Samurai-49956004 1170→1290).
The diff deletes four clones, adds three imports, and re-points apply.js
to its existing import. Promise = diff.

## Inventory

sym.mjs after the diff:

```text
hcolor           js/do_name.js:356   sync
```

Deleted clones (all diverging from C, now gone):
- apply.js `hcolor_apply(colorpref)` → `colorpref || 'colorless'`
- detect.js `hcolor(colorword)` → word, or a **core** `rn2(11)` pick
  for null (C draws the *display* RNG)
- do.js `hcolor(colorword)` → identity
- sit.js `hcolor(colorword)` → `colorword || 'odd'`

## C ↔ JS fidelity

C (csym do_name.c:1460–1466):

```c
const char *
hcolor(const char *colorpref)
{
    return (Hallucination || !colorpref)
        ? hcolors[rn2_on_display_rng(SIZE(hcolors))]
        : colorpref;
}
```

JS do_name.js:356–361 matches: same table (`HCOLORS`), the display-RNG
draw, and the null-pref arm. The detect.js deletion also removes a
**core** RNG draw (`rn2(colors.length)`) on the null-pref path. That was
a latent core-RNG divergence, now fixed.

One callee caveat. do_name.js `hcolor` reads do_name.js's own
`Hallucination` (:275, "sticky `u.Hallucination`, then the H/E flats"),
not display.js's youprop.h:120 reader. The sticky flat is a mirror
(`timeout && !hallucResisted`, written at potion.js:1220/1238,
timeout.js:1271, artifact.js:1097). It agrees with C except inside a
temporary `EHalluc_resistance = 1` override (pager.c:1185). That is the
window D-4068 fixed for `waterbody_name` one commit later. None of the
re-pointed callers (altar flash, sink ring, crystal ball, book glow) run
inside that window, so they get the C colour. It remains a non-C reader
in a canonical function: debt.

## Hallucinations / overclaim

None. The D-log's extra regression sweep (215 board-PASS hallu/symset/
sweep sessions, 0 regressed) is consistent with this audit's full
rescore. The «js-throw at step 1290» verify label is flagged as the
D-4014 owner-null mislabel, which is honest.

## Density

Four clones deleted for one live export. The kind of change the clone
drift ledger wants. One `Ledger:` entry. No unreached work: 2 probe
rows move.

## Verification

Re-measure (`--base 82ece8be2~1 --no-reach`, HEAD code):

```text
verify doaltarobj: 2 blocked
  scen-sweep-Samurai-49956004: PASS    (D-4067 → s1290, D-4068 → PASS)
  scen-sweep-Valkyrie-50156016: PASS
verify doaltarobj: 2 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
verify hcolor: vacuous (no hcolor-owned row)
```

This matches the D-log, with the later D-4068 finishing Samurai. There
were no FORCE/DIAG/seed strings, and the rulecheck is clean.

## Actionable C-wrongs

1. (debt, no session cited) `hcolor` (do_name.js:356, and `rndcolor`'s
   gate at :378) reads do_name.js's sticky-mirror `Hallucination`
   instead of display.js's youprop.h:120 reader. It diverges only under
   a temporary EHalluc_resistance override. Switch to
   `youprop_Hallucination` when a session names it.

Verdict: **ACCEPT-WITH-DEBT**
