# Review 1142 — a0957c9d — engrave.c doengrave mix-up predicates (D-2176)

Metadata: SHA `a0957c9d`, js/ +9/−10 in `engrave.js` only (2
import names to already-imported modules). D-log D-2176. Subject
promises: local `Blind()` missed timed `HBlinded`, skipping every
`rn2(11)` (Samurai-92071 PASS).

Intent vs deliverable: promise matches diff. Actually adds:
deletion of the `Blind`/`Hallucination` locals → canonical
imports; `Confusion`/`Stunned` locals rewritten to the timed
storage; one C citation comment. Classic D-1849 clone-drift fix —
delete wrong JS + import the export.

Inventory: two deleted symbols (`Blind`, `Hallucination`
locals), two rewritten locals. Required `sym.mjs` output:
canonical `Blind` (invent.js:320, sync) and `Hallucination`
(display.js:963, sync) both live; engrave's locals gone from the
clone lists. `Confusion`/`Stunned` have NO export anywhere (6
local clones each across the tree) — so in-place rewrite, not
import, is the only option; no new clone written. No STUB.

**C ↔ JS fidelity**: confirm against pinned C `youprop.h`
(read at HEAD).

- `Blind ≡ (HBlinded || EBlinded) && !BBlinded` (`:103`).
  Canonical import matches verbatim (+ `uroleplay.blind` house
  extension). Old local read only sticky `u.Blind||u.ublind` —
  false under timed blindness, skipping each char's `rn2(11)`.
  Root cause confirmed.
- `Confusion ≡ HConfusion` (`:84`), `Stunned ≡ HStun` (`:81`).
  Rewritten locals read `(HConfusion|0)||sticky` /
  `(HStun|0)||sticky` — C-timed-first with the sticky flat kept
  per repo convention. Strictly C-closer than before (sticky-
  only); the sticky-OR is the documented house mirror, not a
  semantic invention.
- `Hallucination ≡ HHallucination && !Halluc_resistance`
  (`:120`); canonical import matches (D-1493).
- Mix-up loop order untouched; added comment cites
  `engrave.c:1219–1226` draw order. Same fix propagates to the
  module's other `Blind()` call sites (wand sfx, wipeout,
  add-to), all meaning C `Blind` — a genuine shared-predicate
  repair, not scope creep.

RNG call-for-call: zero draws added/removed by the diff itself —
it restores C's per-char `rn2(11)` by fixing the gate, which is
exactly the recorded divergence (`rn2(11)=7` vs shifted
`rn2(25)=8`).

Hallucinations / overclaim: none. Dice quoted with step, values,
and the Blind-both-sides status observation.

Density: ~15 insertions; the C arm is the 8-line mix-up loop and
the rest of `doengrave` is already live — density exception
(C arm that small).

Verification: D-log cites `verify.mjs --fn doengrave` → 1 PASS,
green 2/2, strict ×2, cohort 7/7. Re-measured independently:
`hidden-proxy.mjs verify doengrave --base a0957c9d~1` →
baseline 1 blocked, `1 PASS, 0 moved past, 0 unchanged, 0 worse
→ PROGRESS` (Samurai-92071 PASS). Exact match. `rulecheck`
clean; same-module import additions only (no new edges, call-
time use, no TDZ). No DIAG/FORCE/seed gates.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
