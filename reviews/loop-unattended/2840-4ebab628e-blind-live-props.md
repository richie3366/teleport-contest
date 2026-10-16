# Review 2840 — 4ebab628e — Blind() live props + Blindf_off re-sync

## Metadata

- SHA: `4ebab628e7a9b100834eb0b745c2fd8e1ba4901f` (D-3995)
- Cliff writer: `makemon.c` makemon_rnd_goodpos symptom, 1 block
  (Samurai-50156038 s186)
- js/ diff: `js/do_wear.js` 12 lines (predicate + tail sync); new
  `scripts/blindf-off-see-again.test.mjs`
- Method: full per-function (≤10-function cliff commit)

## Intent vs deliverable

Promise: do_wear `Blind()` short-circuited true on the sticky
`u.Blind`/`u.ublind` mirrors, so after blindfold removal it read
blind where C sees again — wrong message, no `toggle_blindness`,
stale viz, and downstream the makemon cansee gate accepted a
candidate C rejects. Take the D-0716 live-props shape and re-sync
the mirror at the `Blindf_off` tail. 1 PASS.

Diff actually: `Blind()` drops both sticky terms, gains the
`uroleplay.blind` birth-blind gate + live
`((HBlinded||EBlinded)&&!BBlinded)`; `Blindf_off` ends with
`u.Blind = Blind()`. Promise == diff.

## C ↔ JS fidelity

- C `Blind ≡ ((HBlinded || EBlinded) && !BBlinded)`
  (`youprop.h:103` read, with the robustness comment) — JS
  char-equivalent on the flats ✓. C has no mirror; the sticky
  terms were pure hysteresis (D-log's probe: `u.Blind=true`
  with H=E=0, uprops zero).
- C `Blindf_off` (`do_wear.c:1494-1534` via `csym.mjs`, body
  read): was_blind/changed/nooffmsg, ublindf default,
  `setworn(0, mask)` clearing the extrinsic, `off_msg`, the
  Blind/was_blind message arms, `toggle_blindness` iff changed.
  JS body pre-existing whole; this commit ships only its gate
  plus the tail sync — the D-log says exactly that.
- Birth-blind gate: C-real. `u.uroleplay.blind` is the
  OPTIONS:blind roleplay flag (`optlist.h:211`); C realizes it
  as `HBlinded |= FROMOUTSIDE` at `u_init.c:1027-1028` (read),
  and JS does the same at `u_init.js:2018-2019` (read). Both
  clear the flag (not the bit) when the Eyes of the Overworld
  go on (C `:1480-1485`, JS `do_wear.js:2116-2118`, both read).
  The extra disjunct is value-identical on all reachable
  states — redundant, not wrong. The D-0716 shape holds.
- Causal chain: `makemon.c:1087-1090` (read) is the
  `rn1(COLNO-3,2)`/`rn2(ROWNO)` + `cansee(nx,ny)` reject gate —
  the cited `rn2(77)=12` is rn1's inner rn2 (COLNO-3 = 77),
  consistent with the recorder's logging, not a cite error.
- Mirror sync: `u.Blind` writers are `do.js:3812`
  (make_blinded), the new `:2176`, and a value-preserving
  save/restore pair in `lock.js:1873/1877` — the D-log's
  "written only by make_blinded" misses the lock pair, but a
  save/restore preserves value, so the "sticky mirror,
  sync ≡ live props ≡ C" claim stands. One imprecise line, not
  a C-wrong.
- 18 in-file `Blind()` readers go live together; the change is
  internal to the predicate + tail, so all 6 paired C
  `Blindf_off` call sites inherit with no rewiring.

No RNG in the diff; no branch reorder. Diff grep clean
(no `FORCE`/`DIAG`/seed/coordinate reads). Rule #2:
iteration-wide clean (review 2838). No symbol deleted or
re-pointed (`Blind` is file-local) — no `sym.mjs` paste required.

## Hallucinations / overclaim

None. "Owner is a symptom" is argued, not asserted (loop body
faithful per D-2264, cMsgOwners name the message path, prefix
probe shows the stale state). "No omission" for the callers is
backed by a 6-site pairing table.

## Density

Cliff phase §10.18: one cliff writer, one file, code + ledger +
verify + focused test. The remaining D-0716-class readers in
~20 files are explicitly session-gated, not swept — correct
per the anti-busywork rule. Right-sized.

## Verification

Re-measured on HEAD, baseline parent:

- `hidden-proxy.mjs verify makemon_rnd_goodpos,Blindf_off --base 4ebab628e~1 --no-reach`
- `verify makemon_rnd_goodpos: 1 PASS, 0 moved past, 0 unchanged, 0 worse`
  (Samurai-50156038: PASS)
- `verify Blindf_off: no corpus session is blocked` — expected
  (writer); D-log says so.

Exact match to ship-time. Ship-time reach 80/80 + 24/24, green,
strict, cohort 7/7, full 44/44 corroborate.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
