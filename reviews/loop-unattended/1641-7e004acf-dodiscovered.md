# Review 1641 — 7e004acf — `o_init.c` dodiscovered whole-body port (D-2682)

Metadata: commit `7e004acf`, D-2682, js/invent.js + js/o_init.js
(+164/-86 in invent.js). No prior review claimed closed.

## Intent vs deliverable

Subject promises: whole-body `dodiscovered` (discosort o/c/a/s +
relic/artifact pseudo-classes + sortloot key) plus 5 local→export
wirings and a `choose_disco_sort` selector fix. Diff actually adds:
restarted `dodiscovered`, new file-local `sortloot_descr`,
exports for DISCO_ORDER_LET/DISCO_ORDERS_DESCR/UNIQ_OBJS/
disco_fmt_uniq/disco_output_sorted, `selector` line in
choose_disco_sort. Matches the promise; no extras.

## Inventory

New/changed JS: `dodiscovered` (restarted, js/invent.js:4590);
`sortloot_descr` (new file-local, js/invent.js:4554);
`choose_disco_sort` (1-line selector addition).

## C ↔ JS fidelity

C loci (csym): `dodiscovered` `o_init.c:763–873` (111 L);
`sortloot_descr` `:566–591`; `disco_output_sorted` `:740–760`.
Caller: cmd.c:59 → wired at js/cmd.js:3049/:3728 (D-log; unchanged
by this diff).

Branch-by-branch confirm: discosort validate→'o'; menu_requested →
choose_disco_sort(1)/ECMD_OK; o/c/a/s flags + sortindx; header +
blank; uniq loop (first-flag, Amulet exclusion, fmt_uniq);
`disp_artifact_discoveries` (LIVE js/artifact.js:520);
flags.inv_order + VENOM strkitten (via `inv_order_classes()`,
js/invent.js:1384 — reads flags.inv_order, DEF fallback; matches C's
Strcpy from the always-set C field); class walk over
`bases[oclass]` with the `oc_class == oclass` bound (identical to C's
loop condition); prev_class forced-different incl. the header-only
assignment (so 'a' mode accumulates without per-item flush — correct);
prefix + `&buf[2]` sortloot key + append + putstr-vs-collect split;
ct==0 → You-message with no window; sorted flush + "Discovered items"
header condition `(uniq||arti) && alphabetized && !alphabyclass`;
ECMD_OK return (fixes prior `undefined`). Confirm throughout.

`sortloot_descr`: zeroobj dummy (dknown/known/corpsenm NON_PM/
slime-mold spe=current_fruit via pre-existing OTYP_SLIME_MOLD const),
live same-file `loot_classify` (js/invent.js:2152), 6-char key shape
(padStart keeps >99 expansions like C `%02d`). Confirm.

Strip-logic audit (the risky line): C `p[6]=p[0]; p+=6` on
prefix(2)+key(6)+name prints mark+key-trailing-space+name; JS
`s.charAt(0)+s.slice(7)` is exactly that (index 7 is the key's trailing
space). Confirm — correct, and pre-existing code in any case.

Callee closure: all LIVE (`loot_classify`, `disp_artifact_discoveries`,
`choose_disco_sort` async, `interesting_to_discover`,
`disco_append_typename`, `let_to_name`); 5 exports unique per `sym.mjs`
(no clone #2). No STUB, no OMIT. `choose_disco_sort` selector fix cites
C `:624` (accelerator = sort letter) — consistent one-line callee fix
in the same function family.

No RNG. Diff grep: no FORCE/DIAG/seed/coordinate. Rule #2 clean
(iteration-wide). `--can` ALREADY on both import edges (only export
keywords +1 import name changed — no new edge needed).

## Hallucinations / overclaim

None. "Whole-body" accurate; scratch `/tmp` probe documented as
uncommitted (correctly outside the deliverable).

## Density

Breadth-phase whole-function port, ~200 JS insertions for C 111+26 L
across two modules — within §2b cap, one C file family.

## Verification

D-log: syntax, rule2, hidden 0-blocked, reach smoke 24 PASS, green/
strict/cohort (no full — shared-file? invent.js is shared, but D-log
claims no full with 2 changed files; cohort 7/7 + smoke passed).
Re-ran `hidden-proxy.mjs verify dodiscovered --base 7e004acf~1
--reach-all`: "0 blocked (0 at baseline…)" — queue cited 0, vacuous
note properly stated — plus "24 PASS, 0 regressed → REACH-OK".
No REGRESSED.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
