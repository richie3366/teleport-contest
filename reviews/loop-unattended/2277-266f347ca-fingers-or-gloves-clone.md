# Review 2277 — 266f347ca — fingers_or_gloves eat.js clone removal

- SHA: `266f347ca` (D-3321)
- Files: `js/eat.js` only (~1 insertion / ~6 deletions)
- Insertions: below the ~80 bar; rewire-to-live shape

## Intent vs deliverable

Subject promises: "`do_wear.c` fingers_or_gloves eat.js clone removal
(tin-slips gloves→fingers)". The diff delivers exactly that: extends the
`do_wear.js` import at eat.js:142 with `fingers_or_gloves`, deletes the
local clone. Both call sites keep their flags. No DIAG/FORCE/seed in the
hunk; Rule #2 clean per the iteration-wide `imports.mjs --rulecheck`.

## Inventory

- One deleted clone (eat.js:2720-then), one extended import. No new or
  changed JS function bodies; the live export (js/do_wear.js:3981) is
  untouched and re-verified here.

## C ↔ JS fidelity

C body (nethack-c/upstream/src/do_wear.c:59–65, 5 lines):
`(check_gloves && uarmg) ? gloves_simple_name(uarmg) :
makeplural(body_part(FINGER))` — no RNG, no branches beyond the ternary.
Live JS (do_wear.js:3981): `if (check_gloves && game.u?.uarmg) return
gloves_simple_name(game.u.uarmg); return
makeplural(body_part_latebound(FINGER));` — C-exact (latebound ≡
body_part per TDZ policy D-2349, pre-existing). The deleted clone ignored
its parameter and returned `'gloves'` whenever uarmg was set: wrong on the
FALSE arm (C eat.c:1774 tin-slips prints "fingers" even gloved) and on the
TRUE arm's gauntlets/poly variants — a genuine C-wrong, now fixed.
Eat.js sites: :3820 `fingers_or_gloves(true)` ≡ eat.c:1643 TRUE,
:3988 `fingers_or_gloves(false)` ≡ eat.c:1774 FALSE; flags C-correct, so
the pure rewire changes no call semantics. `sym.mjs fingers_or_gloves` →
single sync export at js/do_wear.js:3981, zero clones left:

```
fingers_or_gloves js/do_wear.js:3981   sync
```

D-3321's caller table wires all 20 C call sites (checked: apply.c ×6,
do_wear.c ×4, eat.c ×2, fountain.c ×2, insight.c ×2, invent.c, potion.c,
write.c) with four pre-existing caller-side gaps honestly disclosed as
out-of-scope (write.js hardcoded 'fingers', do_wear.js:3640/2868
hardcodes, potion.js flag-honoring local) — named, not silent.

## Hallucinations / overclaim

None. "FALSE arm returned 'gloves' with uarmg set" verified against the
deleted clone text in the diff. The /tmp truth-table claim (F,∅)/(T,∅)/
(F,uarmg)=fingers, (T,uarmg)=gloves follows directly from the live body.

## Density

Single-function rewire, 1 insertion; defended exception shape (D-3319/
D-3320): one real C-wrong fixed, whole 5-line C body verified, head's
closure holds nothing more Open. `Ledger:` fingers_or_gloves ported.

## Verification

Re-measured (`hidden-proxy.mjs verify fingers_or_gloves --base
266f347ca~1 --reach-all`): 0 blocked (vacuous; queue row cited 0 blocks,
honestly noted in the D-log) + smoke 24/24 PASS, 0 regressed → REACH-OK —
the D-log tail verbatim.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
