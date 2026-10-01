# Review 2149 — c47034f0d — audit ledger sample

Date: 2026-10-01. Docs-only audit overlay, not a ninth JS port.
Scope: five random seeded ported rows, sampled after reviews 2141–2148.
No JS or upstream C edits. This records inherited audit findings.

## Intent vs deliverable

The audit requires a snapshot and five seeded ported briefs.
The random sample was drop_uswapwep, mon_break_armor, mhitm_ad_famn,
weight_cap and shuffle_customizations. All five briefs were read.

## Inventory

Snapshot: 5,329 pinned functions, initially 1,190 declared ported.
drop_uswapwep wield.c:807–831, JS wield.js:1188–1207.
mon_break_armor worn.c:1176–1335, JS worn.js:523–676.
mhitm_ad_famn uhitm.c:3776–3805, JS mhitm.js:1100–1107,
plus mhitu.js:2595–2601.
weight_cap hack.c:4294–4346, JS invent.js:1024–1114.
shuffle_customizations glyphs.c:644–732, JS glyphs.js:1211–1281;
the earlier #if 0 body is not the compiled implementation.

## C ↔ JS fidelity

mon_break_armor queues message thunks while immediately mutating armor.
C worn.c:1196–1201 calls pline_mon/You_hear before m_useup; JS :546–549
queues the message, consumes the suit, then starts the message at :674.
Likewise the other break/slip/drop arms and the riding rnl(3) branch can
run before earlier messages complete. Awaiting the returned Promise in
new_were does not correct this internal ordering. m_lose_armor is a local
C-callee clone (C worn.c:1039–1051); its own synchronous assumptions must
be checked in the next port's closure.

The other four samples represent their C arms: drop_uswapwep's three
messages precede dropx; weight_cap restores levitation after all capacity
arms; shuffle preserves both offsets and duplicate unicode/color copies.
mhitm_ad_famn's hero-target arm exists in the second JS helper, with the
message/exercise/fainted/rn1 order preserved; the row must be split.

## Hallucinations / overclaim

mon_break_armor's ported row hides a real continuation-order C-wrong.
This predates the reviewed SHAs; D-3181 fixes its caller's initial message,
not the armor callee's internals. mhitm_ad_famn is distributed, not missing.

## Density

Ledger: mon_break_armor corrected ported → partial. QUALITY-RISK.
Ledger: mhitm_ad_famn corrected ported → split with both JS mappings.
The other three sampled rows need no status correction.

## Verification

Actual JS suspension probe /tmp/review-audit-armor-order.mjs:
“armor consumed → message waiting” before dismissal, opposite C.
The full public suite is 44/44; this is latent ordering, not an invented
corpus FAIL. No Rule #2 or trace-shaped production finding.

## Actionable C-wrongs

1. Restart mon_break_armor in C continuation order: wait before each
   mutation/RNG arm, preserve all armor/riding branches, and propagate
   any necessary m_lose_armor closure waits to the existing callers.

Verdict: **QUALITY-RISK**
