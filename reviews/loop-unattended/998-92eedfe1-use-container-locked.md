# Review 998 — 92eedfe1 — use_container sack-name + locked Tobjnam arm (D-2028)

Metadata: SHA `92eedfe1`, D-2028, Open-row port
(sack-vs-bag menu + locked-box message, 2 PASS + 3 moved).
js/ touches `js/pickup.js` only (+27/−27 across import
block, `in_or_out_menu`, `use_container` ×3 sites).
No stamp owed.

## Intent vs deliverable

Subject promises: discovery-aware sack naming (thesimpleoname
export: known sack → "the sack") + C-verbatim locked arm
(`Tobjnam(obj,'are')` + held put-down, Hmmm retired to
`do_loot_cont`). Diff actually adds: two import names on the
pre-existing `./objnam.js` edge, one call-site swap in
`in_or_out_menu`, one arm rewrite + two `Ysimple_name2` →
export swaps in `use_container`. Promise == diff. No new
functions; three re-points (import → live export).

## Inventory

- Changed JS: `in_or_out_menu` Look row (1 line);
  `use_container` olocked arm (rewrite), emptymsg + 2
  loot-out fallbacks (`Ysimple_name2` → export).
- `sym.mjs` on all three re-pointed symbols:
  `Tobjnam js/objnam.js:1604 sync`;
  `thesimpleoname js/objnam.js:2534 sync` (1 local clone
  in pickup.js:170 kept for non-cluster sites);
  `Ysimple_name2 js/objnam.js:2552 sync` (clones in
  do_name.js:176, pickup.js:195 kept). All LIVE.
- No STUB / no-op. Named: chest trap, bag-of-tricks/horn,
  cursed-mbag `boh_loss`+`"now "`, `sellobj_first`,
  non-cluster clones (NOTES drift, untouched).

## C ↔ JS fidelity

Against `pickup.c:2971–3226` (`csym` range):

- olocked arm (`:2994–2999`): C is `pline("%s locked.",
  Tobjnam(obj,"are"))` + held `You("must put it down…")`
  + `return ECMD_OK`, no lknown touch *in the arm*.
  JS now matches verbatim. The retired Hmmm/`lknown`
  shape was indeed `do_loot_cont`'s (`:2106–2111`
  floor-#loot autounlock), correctly left untouched.
- **Gap:** C has an `lknown` pre-branch *above* the lock
  check (`:2985–2989`: `if (!obj->lknown) { obj->lknown
  = 1; if (held) update_inventory(); }`). Neither parent
  nor child JS has it — old JS set `lknown=1` only inside
  the locked arm; new JS sets it nowhere in
  `use_container`. The D-log "Named: `lknown` pre-branch
  (pre-existing, untouched)" and map "no `lknown` touch"
  overclaim: C touches lknown before the branch, JS never
  does. State-only (held locked box keeps lknown=0, no
  inventory refresh); messages now match, no blocked
  session covers it. Actionable item 1 below.
- `in_or_out_menu` (`:3397` staticfn; `:3420`
  `Sprintf(buf,"Look inside %s",thesimpleoname(obj))`):
  export swap is exact; C discovery-awareness cited
  correctly (known sack → "the sack").
- emptymsg (`:3043–3046` `Ysimple_name2` + quantum/
  cursed `"now "`): export swap exact; `"now "` kept.
  No RNG in this envelope — branch order preserved.

## Hallucinations / overclaim

One: the "no `lknown` touch / pre-existing, untouched"
framing (see Gap). Everything else checks out —
`--can` SAFE/ALREADY claims, Hmmm-attribution to
`do_loot_cont`, "2 PASS + 3 moved" counts.

## Density

~27 insertions on a two-arm message fix; below the ~40
soft floor but C is exactly that small (two pline arms,
no new control flow). One locus family, one module.
Not padding — ok.

## Verification

- `imports.mjs --rulecheck` (all scored js/): clean.
- Diff grep: no FORCE/DIAG/getRngLog/seed-gate/
  fastforward/coordinates.
- Re-measured `hidden-proxy verify use_container --base
  92eedfe1~1`: `2 PASS, 3 moved past, 0 unchanged,
  0 worse → PROGRESS` — matches the D-log line
  (Archeologist-92228, Rogue-92160 PASS; three named
  moves). Baseline was 0/0/5. Not vacuous.
- Green + strict ×2, cohort 7/7 per D-log; pickup.js is
  not a shared startup/RNG file, full-suite skip ok.

## Actionable C-wrongs

1. Port the `:2985–2989` `lknown` pre-branch
   (`if (!obj.lknown) { obj.lknown = 1; if (held)
   await update_inventory(); }` before the olocked
   check) or name it in the turns.md use_container row;
   correct the "no `lknown` touch" map note to say
   "pre-branch `:2985–2989` deferred". One iter, no
   corpus owner — debt, not Must-fix.

Verdict: **ACCEPT-WITH-DEBT**
