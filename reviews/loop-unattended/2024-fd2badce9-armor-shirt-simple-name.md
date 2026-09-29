# Review 2024 — fd2badce9 — armor_simple_name xname wiring + shirt_simple_name

Metadata: SHA `fd2badce9`, D-3064, js/objnam.js + js/do_wear.js + js/invent.js
(~40 js insertions). Cluster: `armor_simple_name` + `shirt_simple_name`
(one C file, caller/callee closure).

## Intent vs deliverable

Promise (subject): "objnam.c armor_simple_name xname :741 wiring +
shirt_simple_name port". Diff actually adds: new exported
`shirt_simple_name()` in js/do_wear.js; ARM_SHIRT arms in
`armor_simple_name` and `armor_doff_simple_name` now call it; destroy-armor
pline and invent.js `item_what` W_ARMU arm call it; objnam.js xname ARMOR
`un` arm calls `armor_simple_name(obj)` via new `set_armor_simple_name`
late-bind. Promise kept, nothing extra.

## Inventory

- `shirt_simple_name` (NEW export, js/do_wear.js:1812, sync): whole C body.
- `armor_simple_name` (js/do_wear.js:1828, sync): one-arm change
  (`'shirt'` literal → call); rest pre-existing.
- `set_armor_simple_name` (NEW export, js/objnam.js:2580, sync): late-bind
  slot, doffing `var` idiom.
- Call-site edits in js/do_wear.js:1866/:4090, js/invent.js:5629,
  js/objnam.js:962. No helper clones, no stubs, no deleted symbols
  (no re-pointed-symbol `sym.mjs` output required).

## C ↔ JS fidelity

`shirt_simple_name`: C objnam.c:5599–5603 (csym range) is UNUSED-param +
`return "shirt"`. JS `void shirt; return 'shirt'` — exact, 0 callees.
All 4 C code call sites (`csym --callers`: do_wear.c:1959, do_wear.c:3233,
objnam.c:5460, zap.c:5738; 5th hit is the extern.h decl) are wired in
this diff (:1843, :1866, :4090, invent.js:5629) — each confirmed present
in the hunks. No RNG. Confirm.

`armor_simple_name`: C objnam.c:5434–5468 (csym range): 7-arm
oc_armcat switch in order suit/cloak/helm/gloves/boots/shield/shirt,
default = simpleonames + impossible + return. JS matches arm-for-arm in
C order; default falls out of the switch to `simpleonames` +
fire-and-forget `impossible` + return — same value, same message args
(`result`, armcat). `armcat` reads `oc_skill`; the generated object
table documents `oc_skill: r[8], /* also oc_subtyp / oc_armcat */`
(js/generated), so the D-log's convention claim is measured, not
assumed. (Pre-existing 2-file `armcat` local-clone pair per `sym.mjs`
is prior debt, not this diff.) Confirm.

xname ARMOR `un` arm: C objnam.c:740–741
`xcalled(buf, BUFSZ - PREFIX, armor_simple_name(obj), un)` — cited
range verified by direct read. JS passes
`_armor_simple_name_fn(obj)` with `dn` fallback when do_wear is not
loaded; registration runs at do_wear top level after its objnam import,
so the fallback only fires in graphs without do_wear (pre-existing
behavior there). The static back-edge TDZ is stated as measured
(`_body_part` reorder); the `var` hoisting matches the established
doffing idiom. Confirm.

## Hallucinations / overclaim

None. D-log "none — every arm ported, every callee live" is accurate
for both functions; the `dn`-fallback limitation is disclosed in the
Named line rather than hidden.

## Density

Breadth-phase cluster of 2 whole functions from one C file in a
caller/callee closure — §2b-shaped (not multi-file, ≤10 fns, no
Must-fix bundled). Small (~40 js insertions) is "too small (waste)",
not quality risk, and the iteration also retired 3 stale rows per the
D-log. Per-function verdicts: shirt_simple_name ACCEPT,
armor_simple_name ACCEPT. SHA verdict = best/worst = ACCEPT.

`Ledger:` armor_simple_name ported; shirt_simple_name ported (D-entry
present; ledger jsonl touched in-stat).

## Verification

D-log Verify bullet claims vacuous hidden ("no corpus session blocked,
expected for a coverage row") + fixed smoke spread 24/24 REACH-OK +
green/strict/cohort/full 44/44. Re-measured here:

- `hidden-proxy verify armor_simple_name,shirt_simple_name --base
  fd2badce9~1 --reach-all` → both: "0 session(s) blocked" (vacuous,
  correctly labelled, queue row cited no blocks) + "no RNG-tagged
  reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK".
- Diff grep for FORCE/DIAG/getRngLog/fastforward/seed/coords: no hits.
- `imports.mjs --rulecheck` (whole scored js/): "Rule #2 clean".

No REGRESSED session, no vacuous-PASS overclaim. Confirm.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
