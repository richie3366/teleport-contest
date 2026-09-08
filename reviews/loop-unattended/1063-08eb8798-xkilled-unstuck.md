# Review 1063 — 08eb8798 — xkilled unstuck wiring (D-2093)

Metadata: SHA `08eb8798`, `js/uhitm.js` +6, queue owner unstuck (1
session). D-log D-2093.

## Intent vs deliverable

Subject promises: hero-kill path never ran `unstuck`, skipping the
`rnd(2)` mspec_used draw and shifting xkilled treasure dice one slot
early. Diff actually adds: after the lifesaved early-return,
`mtmp.mtrapped = 0` + dynamic-import `unstuck(mtmp)` before treasure.
Promise == deliverable; 6 lines.

## Inventory

Changed: `xkilled` only. No new functions, no new static edges (dynamic
`import('./mhitu.js')` = the file's existing `mon.js:1714` cycle
idiom, call-time use). `sym.mjs unstuck → js/mhitu.js:1616 ASYNC`,
awaited — callee LIVE. No deleted/re-pointed symbols.

## C ↔ JS fidelity

`unstuck`, `mon.c:3437–3467` (csym): gated on `u.ustuck == mtmp`; the
`rnd(2)` draw sits under `!mspec_used && (AD_STCK || AT_ENGL ||
AT_HUGS)`. That is the exact missing draw (prev draw matched at
`dmgval weapon.c:265`, next JS draw was treasure `rn2(6)`).

Call-path order, verified against C: `mondead :3092 lifesaved_monster`
→ `:3108` "after life-saving and before m_detach" → `:3175 m_detach`
→ `:2756 mon_leaving_level` → `mon_leaving_level :2702
mon->mtrapped = 0` → `:2703 unstuck(mon)`. JS `xkilled` now does
lifesaved-return → `mtrapped = 0` → `unstuck` → treasure. The two
ported statements replicate C :2702–2703 in order. Confirm.

Deliberately not ported (all disclosed): `remove_monster /
mundetected / seemimic / fill_pit` remainder of `mon_leaving_level`,
`mhitm.js`/`trap.js` `mondead` unstuck on mon-kill/trap-kill paths (no
corpus session blocks there). Named omits, not silent skips — an arm
ships iff callees are LIVE/OMIT/verified-CLONE, and here the arm's only
callee (`unstuck`) is LIVE.

## Hallucinations / overclaim

None. "imports.mjs verdict for the static shape was already SAFE —
hoisted function" is belt-and-braces for a dynamic import that needs no
verdict at all; harmless, not an overclaim. (D-log line refs
`m_detach :2760` vs measured :2756 — 4-line recorder/upstream drift,
immaterial.)

## Density

+6, one arm, one owner — minimal complete cluster. OK.

## Verification

- Rule #2 clean (global rulecheck). Ban grep 0.
- Re-measured `hidden-proxy.mjs verify unstuck --base 08eb8798~1`:
  "0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS"
  (Rogue-92210 step 120 → prisoner_speaks step 146) — matches D-log.
- Green/strict/cohort recorded; full suite correctly skipped (no shared
  file changed — `uhitm.js` is not in the shared set per verify matrix).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
