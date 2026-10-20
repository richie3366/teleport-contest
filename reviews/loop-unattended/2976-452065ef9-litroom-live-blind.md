# Review 2976 — 452065ef9 — read.js reads the live Blind macro

- SHA: `452065ef9` (near-pass cliff; board owner invent.c getobj, writer
  read.c litroom)
- D-entry: D-4136; Ledger: litroom ported; seffect_light ported;
  seffect_blank_paper ported
- `js/` diff: `js/read.js` +23/−33

## Intent vs deliverable

Promise: litroom's «on» arm prints «A lit field surrounds you!» only when
`!Blind`. read.js computed a local `Blind = u.Blind || u.ublind`, which
misses a blindfold (EBlinded). So a blindfolded hero zapping a cursed
wand of light got the message where C stays silent. Diff: litroom,
seffect_light and seffect_blank_paper (the old seffect_mail locals),
stripspe / p_glow2 / recharge / seffect_enchant_armor / seffect_fire /
punish all call the imported `Blind()`. The `Blind_read` clone and three
locals are deleted. Promise = diff (more than the subject says, all in
the same family).

## Inventory

- `litroom` — read.js:432; C read.c:2490–2635, Blind sites :2522, :2530,
  :2551, :2554, :2564, :2577, :2612.
- `seffect_light` — read.js:568; C read.c:1740–1785 (:1748).
- `seffect_blank_paper` — read.js:1970; C read.c:2004–2012.
- Callee `Blind` — invent.js:372 (youprop.h:103
  `(HBlinded || EBlinded) && !BBlinded`).

`sym.mjs Blind_read` → `NOT FOUND in js/**`. `sym.mjs Blind` →
`js/invent.js:372 sync`, plus 26 local clones in other files (cross-file
debt, not this SHA).

## C ↔ JS fidelity

litroom, walked arm by arm. Off arm: artifact-light loop
`impact_arti_light(…, !Blind)`, then `if (!Blind)` pline. On arm:
blessed artifact loop, `u.uswallow` → `if (Blind) ;` else the
digests / is_whirly / glistens choice (JS folds that into
`!Blind() && u.ustuck`, the same branches), else
`!Blind && (!Is_rogue_level || typ != CORR)`. Then `no_op` return, the
Punished move_bc `!Blind`, and the final `if (!Blind)` at :2612. Each
site now evaluates the macro when it runs, as C does. The old code
captured it once at entry. No RNG on these paths.

`grep -a 'u\.Blind\b\|u\.ublind' js/read.js` → only a comment
(:1472). No flat Blind reader remains in read.c's JS file.

## Hallucinations / overclaim

None. Named: read.js still reads the `u.HConfusion || u.Confusion` and
`u.Hallucination` mirrors (seffect_light :578, do_mapping,
seffect_remove_curse). timeout.js keeps those mirrors in sync
(TIMEOUT_FLAT), and C Confusion has no extrinsic. This is the known
mirror family.

## Density

Whole Blind family for one C file. That is the intended unit.

## Verification

```text
verify getobj (--base 452065ef9~1): impaired-Monk-51251030 PASS;
  options-Rogue-50557417 PASS (moved by later SHAs c8aa62e0d/08a01c311)
verify litroom / seffect_light / seffect_blank_paper: 0 blocked
```

Consistent with the D-log (the Rogue row was "separate cause" here and
passes at HEAD).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
