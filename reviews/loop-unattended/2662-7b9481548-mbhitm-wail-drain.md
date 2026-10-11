# Review 2662 — 7b9481548 — mbhitm striking wail drain (D-3798)

Metadata. SHA `7b9481548` (2026-10-10), D-3798, parent
`7f838064f`. js diff: `js/muse.js` +7/−1 — `await
finish_maybe_wail()` in the WAN_STRIKING hits-you arm
+ import name on the existing hack.js edge. Works
cliffs row-2 maybe_wail (95342 737→1197).

## Intent vs deliverable

Promise: 95342@737 — a monster's striking wand hit
the hero: C's losehp prints the low-HP CwnAnnwn wail
inline, while JS set `_needs_maybe_wail` and never
drained it at this site (D-3795 mechanism, different
losehp site). Diff adds exactly the drain. Promise
and diff match.

## Inventory

Changed JS (1 writer arm):

- mbhitm WAN_STRIKING hits-you — `js/muse.js:808`
  (module-local; C `staticfn`). C: `muse.c:1618–
  1626` (arm read in full) + losehp `hack.c:4283–
  4291`.

## C ↔ JS fidelity

**C-exact order.** C: `rnd(20)` gate `:1618`,
"wand hits you!" `:1621`, `d(2,12)` `:1622`,
half-spell `:1623–1624`, `losehp` `:1625` (wail
inside), `learnit = TRUE` `:1626`, then
stop_occupation/nomul. JS: losehp → done-check →
`finish_maybe_wail()` → learnit — the drain lands
exactly where C's inline wail runs, before
learnit/stop_occupation/nomul/makeknown. The drain
is correctly a no-op when lifesaved (fatal path
sets no flag) or out of wail range. Callee
`finish_maybe_wail` is LIVE (audited under D-3795:
drains showdamage/rehumanize queues first, then
the flag-gated wail). No symbol deleted or
re-pointed, so no sym.mjs paste is owed.

## Hallucinations / overclaim

None. Diff grep: zero hits. The D-entry names the
next same-mechanism site honestly
(`drop_boulder_on_player` — different C file, left
for a demonstrating session) instead of sweeping
it in.

## Density

Cliff-phase §2b: one row-2 writer arm, D-3795 oil
shape reused. Row-1 randomize falsifier re-verified
unfired live.

## Verification

D-log Verify: focused 0/1 → 1/1; maybe_wail
1 moved (737 → mfind0@1197, +460); reach 24/24 +
23/23; gates PASS.

Re-measured by this audit (`verify
maybe_wail,mbhitm --base 7b9481548~1 --reach-all`,
re-run on HEAD code):

```text
verify maybe_wail: 0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-sweep-Healer-95342: moved → mfind0 at step 1197 (was 737)
smoke maybe_wail: 24 PASS, 0 regressed → REACH-OK
reach mbhitm: 23 PASS, 0 regressed → REACH-OK (writer, vacuous as logged)
```

Matches the D-log exactly, step and owner.
Committed scoreboard: 1045 → 1045 (moved, no
PASS flip), 0 lost.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
