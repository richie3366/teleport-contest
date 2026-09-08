# Review 1092 — c0bd7edc — Invis/See_invisible uprops fallback (D-2126)

Metadata: SHA `c0bd7edc`, `js/display.js` +16/−4 only (plus journal
rotation crumbs in the same SHA — docs-only, not in audit scope).
Queue row `potion.c` self_invis_message, scen-wish-Healer-92010 step
62/264: identical toplines («Gee! All of a sudden, you can't see
yourself.--More--»); real diff is row 5 col 60, C `<` vs JS `@` —
hero on stairs dons a blessed +3 ring of invisibility (`P`), C
repaints the under-cell, JS keeps `@`. No prior review claimed closed.

## Intent vs deliverable

Subject promises: worn-ring invisibility hides `@` via newsym
canspotself. Diff actually adds: `uprops[INVIS]`
intrinsic/extrinsic/blocked OR-ed into `hero_Invis()`,
`uprops[SEE_INVIS]` intrinsic/extrinsic (+ sticky flat) into
`hero_See_invisible()`, plus `INVIS`/`SEE_INVIS` const imports.
Promise matches diff. Notably the D-log correctly identifies the queue
owner (`self_invis_message`) as a misattributed message printer and
ports the writer (the hero-visibility gate behind `newsym`) instead —
the right call per §7 (geometry/visibility owners).

## Inventory

Changed JS: `hero_Invis`, `hero_See_invisible` (display.js, private
helpers). No new callees — pure reads of `u.uprops` slots already
maintained by `setworn`/`confer_oc_oprop`. No STUB/OMIT/CLONE in this
arm; same-edge const import only (no TDZ risk, no `--can` needed).

## C ↔ JS fidelity

C loci verified by direct read (not just the D-log's word):

- `youprop.h:198`: `#define Invis ((HInvis || EInvis) && !BInvis)`
  with `H/E/BInvis ≡ uprops[INVIS].intrinsic/extrinsic/blocked`
  (header lines 190–198). Since JS flats mirror the same uprops
  slots, OR-ing flats + slots is idempotent and exactly C.
- `See_invisible ≡ HSee_invisible || ESee_invisible`
  (`uprops[SEE_INVIS]`, no blocked arm) — JS correctly adds no
  blocked read there. The sticky `u.See_invisible` disjunct is
  pre-existing, untouched.
- `display.h:174` `canseeself` chain (`Invisible ≡ Invis &&
  !See_invisible`) is the consumer; the fix flows through the
  existing `hero_Invisible()` → canspotself → newsym path.

Mechanism proven, not inferred: `confer_oc_oprop` (do_wear.js:330)
mirrors flats only for BLINDED/FAST/TELEPAT/STEALTH/LEVITATION — I
read the if-chain and there is no `EInvis` mirror — so a worn ring
sets only `uprops[INVIS].extrinsic` and the old flat-only read missed
it. Sibling readers confirm display was the lone flat-only reader
(`potion.js` Invis already ORs uprops; TELEPAT/Detect read through).
`hero_Blind` staying flat-only is justified in the entry (EBlinded is
mirrored by confer_oc_oprop; no corpus session proves an uprops-only
blind path this iter). No RNG either side; stepFns were
`exercise`-only per the D-log.

## Hallucinations / overclaim

None. "Writer behind queue row" framing is accurate; the entry does
not claim the message printer moved. The C-locus chain (do_wear
`setworn` → `Ring_on` RIN_INVISIBILITY → `newsym` → canspotself) is
stated with line ranges.

## Density

+16/−4 for a 3-macro locus — the whole envelope. Small but complete;
acceptable.

## Verification

D-log Verify bullet: `verify.mjs --fn self_invis_message` → PASS
syntax + PASS rule2 + hidden PROGRESS + green 2/2 + strict ×2 +
cohort 7/7 + full 44/44 (shared file changed, auto-run). Re-measured
myself: `hidden-proxy.mjs verify self_invis_message --base
c0bd7edc~1` → `0 PASS, 1 moved past, 0 unchanged, 0 worse →
PROGRESS` (Healer-92010 moved 62 → `next_ident`@120). Grep: no
FORCE/DIAG/seed/fastforward/coords. Queue row archived; map updated.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
