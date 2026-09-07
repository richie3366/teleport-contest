# Review 1001 — ee5d6d71 — dodrink Strangled/underwater/worn/occupant (D-2031)

Metadata: SHA `ee5d6d71`, D-2031, Open-row port
(Strangled gate + underwater prompt + worn split +
milky/smoky occupant rolls, 3 moved). js/ touches
`js/potion.js` (+98/−) and `js/apply.js` (1-word
`export`). No stamp owed.

## Intent vs deliverable

Subject promises: Strangled gate first, underwater yn
prompt, worn-stack split/unwear, new `ghost_from_bottle`,
milky-then-smoky occupant arms with `13+2*born`
chance + G_GONE gates, `objdescr_is` export (no clone
#5). Diff actually adds: exactly those, plus
STRANGLED/G_GONE/PM_GHOST/rndmonnam/remove_worn_item
imports. Promise == diff. One new function
(`ghost_from_bottle`); one visibility change.

## Inventory

- New JS: `ghost_from_bottle` (static, potion.js).
  Changed: `dodrink` (5 arms). Visibility:
  `objdescr_is` local → exported in apply.js.
- `sym.mjs`: `objdescr_is js/apply.js:1046 sync`
  (potion.js held no local — no dup; 3 remaining
  clones in eat/muse/steed pre-existing, untouched);
  `remove_worn_item js/steal.js:173 ASYNC` (awaited
  ✓); `rndmonnam` extends the pre-existing do_name
  edge (ALREADY). No STUB / no-op. Named: none new —
  djinni/fountain/sink/getobj/splitobj/dopotion all
  live; djinni-internal SetVoice stays named (D-1144).

## C ↔ JS fidelity

Against `potion.c:525–615` + `:480–500`, arm-by-arm:

- Strangled first (`:530–533`): C `Strangled` macro
  ≡ uprops intrinsic; JS ORs uprops intrinsic with
  flat `u.Strangled` — same C value, dual-store
  (do.js danger_uprops note); truthiness OR cannot
  double-count. Message + ECMD_OK exact.
- Underwater (`:535–572` envelope, water arm):
  `Underwater`=u.uinwater (youprop.h:279 ✓) &&
  !uswallow; `y_n("Drink the water around you?")`
  shape kept; 'y' → «Do you know what lives in this
  water?» + TIME; refusal → drink_ok_extra++.
  Fountain/sink arms untouched above it, C order kept.
- Worn split (`:577–590` comment honored):
  owornmask → quan>1 split+owornmask=0 else
  remove_worn_item(FALSE). The `if (split)` guard is
  defensive-only (splitobj does not fail here).
- Occupant rolls (`:600–612`): milky/GHOST then
  smoky/DJINNI, `objdescr_is` first (no draw when
  unmatched — C short-circuit preserved), G_GONE
  gate, `!rn2(13+2*born)` with POTION_OCCUPANT_CHANCE
  = `13+2*(n)` (hack.h:1409 ✓); ghost/djinni +
  useup + TIME. `if`+early-return ≡ C if/else-if.
- `ghost_from_bottle` vs `:480–500`: MM_NOMSG GHOST
  at hero, empty-bottle, Blind→`something`, hallu
  `rndmonnam` else "ghost", verbose fright,
  `nomul(-3)` + multi_reason/nomovemsg. Verbatim
  (`verbose !== false` ≡ C default-true).

## Hallucinations / overclaim

None. The rngM tick-down footnote (6612→6609,
2657→2635) is disclosed, direction is forward under
new owners, script verdict PROGRESS/0-worse — my
re-run agrees (below).

## Density

~100 insertions on a 91-line C function with a
21-line callee — one locus family, one falsifier.
Right-sized.

## Verification

- `imports.mjs --rulecheck`: clean. Diff grep: no
  FORCE/DIAG/getRngLog/fastforward/coords.
- Re-measured `hidden-proxy verify dodrink --base
  ee5d6d71~1`: `0 PASS, 3 moved past, 0 unchanged,
  0 worse → PROGRESS` — step-for-step the D-log
  (Priest-92096→doturn@149, Knight-91128→x_monnam@82,
  Rogue-92137→mcalcmove@26). Not vacuous.
- Green + strict ×2, cohort 7/7 per D-log; potion.js
  + one-word apply.js export, full-suite skip ok
  (no shared RNG/startup path).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
