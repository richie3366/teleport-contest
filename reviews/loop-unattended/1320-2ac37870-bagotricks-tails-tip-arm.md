# Review 1320 — 2ac37870 — makemon.c bagotricks: bad-bag impossible, perm_invent refresh, tipcontainer BoT-target arm (D-2354)

Metadata: SHA `2ac37870`, D-2354, Open queue head (no review
stamp owed). Method: full `js/` hunks read (2 files,
+25/−5); C `bagotricks` (`nethack-c/upstream/src/makemon.c:2553-2601`
via `csym.mjs`, full body read) + C `tipcontainer_checks`
(`pickup.c:3951-4055`, targetbox arm + box-check order) + C
`tipcontainer` (gettarget → checks order) + C
`tipcontainer_gettarget` (BoT menu-exclusion lines) via
`csym.mjs`; `sym.mjs` on `impossible` / `update_inventory` /
`bagotricks` / `tipcontainer` (pasted below); JS gettarget
exclusion (`pickup.js:4395`) + pre-existing dynamic-import
pattern (`:4512`) read; added-line banned grep (0 hits);
`imports.mjs --rulecheck` (clean, re-run) + `--can`
(ALREADY); `hidden-proxy verify bagotricks --base 2ac37870~1`
re-run. No symbol deleted or re-pointed (one import name
added to an existing edge) → no clone→import `sym.mjs`
beyond the liveness checks below.

## Intent vs deliverable

Subject promises three latent C-wrongs around the live BoT
body: bad-bag silence, two missing `perm_invent` refreshes,
and the missing tip-onto-undiscovered-BoT arm. Diff delivers
all three with C line citations, no new modules/edges.
Promise kept.

## Inventory

- `js/apply.js` `bagotricks`: bad-bag `await
  impossible("bad bag o' tricks")` + return 0; `update_inventory()`
  in the known-empty and seen-monsters tails; `impossible`
  joins the existing `display.js` import.
- `js/pickup.js` `tipcontainer`: post-gettarget/cancelled
  targetbox-is-BoT arm → dynamic `bagotricks(targetbox,
  false, {n: 0})` + return; "BoT-target apply" dropped from
  the Named header.
- Named: otrapped `chest_trap`/`nomul`, recursive checks for
  non-BoT targets, floor-coord sync, shop-bill items
  (`subfrombill`/`addtobill`), charged-path makemon behavior
  (D-1023 core) — all cited, untouched.

## C ↔ JS fidelity

Arm-by-arm confirm. (1) Bad bag: C `:2562-2563`
`impossible("bad bag o' tricks")`, falls to `return
moncount` (0) — JS awaits the ASYNC live `impossible`
(`display.js:7531`) then returns 0 ✓ (same outcome; C's
fall-through returns the still-0 counter). (2) Empty: C
`:2568-2571` `cknown = 1` + `update_inventory()` under
`dknown && oc_name_known` — JS identical predicate
(`bag.dknown && game.objects?.[bag.otyp]?.oc_name_known`)
with the refresh added ✓. (3) Seen: C `:2591-2594`
`makeknown` + `update_inventory()` under `bag->dknown`
inside `if (seecount)` — JS same nesting (seencount block
untouched above) ✓. (4) Tip arm: C `tipcontainer_checks`
leads with the targetbox-BoT arm (`bagotricks(targetbox,
FALSE, &seencount)`, local seencount discarded, return
`TIPCHECK_CANNOT`) before the box lknown/lock/trap checks —
JS fires first after gettarget/cancelled, before its own box
checks ✓; `FALSE` ≡ `false`, discarded `{n: 0}` ≡ unused
C local ✓. Reachability is exact: C gettarget skips BoT
only when `dknown && oc_name_known`, and JS `:4395` carries
the identical exclusion — so only undiscovered BoT reaches
the arm on both sides ✓. The skipped shop-`maybeshopgoods`
computation before the arm is draw-free and unconsumed on
the CANNOT path — no delta. Callee closure: `impossible`
LIVE ASYNC, `update_inventory` LIVE sync (already imported,
`apply.js:51`), `bagotricks` LIVE ASYNC; no STUB in any
live arm; dynamic import repeats the file's own `:4512`
pattern (no new static edge).

Required `sym.mjs` output:

```text
impossible       js/display.js:7531   ASYNC — await required
update_inventory js/invent.js:4086   sync
bagotricks       js/apply.js:4965   ASYNC — await required
tipcontainer     js/pickup.js:4467   ASYNC — await required
```

Nit (not queued): D-log cites `bagotricks` `:2554–2601`,
`csym.mjs` prints `:2553-2601` — one-line citation drift,
no behavior content.

## Hallucinations / overclaim

None. "No new edge" holds both ways (static ALREADY +
dynamic pattern pre-exists). The deleted-probe claim is
specific; lavatory details (cknown 0→1 exercising
`update_inventory`) match the added lines.

## Density

Two files, one BoT envelope (body + its direct caller arm
in `tipcontainer_checks`). Right-sized; the caller arm is
the same C family, not a glued subsystem.

## Verification

D-log: `verify.mjs --fn bagotricks` PASS (syntax 2 files /
rule2 / hidden-vacuous-disclosed / green 2/2 / strict ×2 /
cohort 7/7) + pre-change `--no-cohort` PASS. Re-measured:

```text
verify bagotricks: baseline 2ac37870~1 — 0 session(s) blocked on it
  (0 at baseline, 0 working) — vacuous, NOT a corpus PASS
```

Matches; row cited 0 blocks so no older `--base` owed.
Added-line banned grep 0 hits; `--rulecheck` clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
