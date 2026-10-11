# Review 2709 — c5e7a97a3 — rhack kickedloc tail (D-3848)

Metadata: SHA `c5e7a97a3`, D-3848, cliffs-head `dogmove.c`
dog_move writer (owner C-whole; divergence names the pet
selection state). JS: `js/cmd.js` (+17/−1: three branch
resets + canned exemption). Test:
`scripts/rhack-kickedloc-extcmd.test.mjs` (new, 1 `it`).

## Intent vs deliverable

Promise: Rogue-578129@138 — a step-131 kick sets kickedloc,
the #dip completing at 138 takes time, so C's rhack tail
resets it before monmove but JS's `#` branch never did, and
the pet wrongly avoids (68,4); add the TIME-gated reset to
`#`/`:`/`^T`, exempt canned kicks from the canned clear;
session moves 138→263. Diff actually does that. Match.

## Inventory

- `#` (js/cmd.js:6396), `:` (:6332), `^T` (:6279) — TIME-gated
  `game.kickedloc = {x:0,y:0}`, each after its branch's reset
  block. C: cmd.c rhack tail `:3819–3826` (read): TIME →
  move=TRUE, `func != dokick` → kickedloc=(0,0). Funcs:
  doextcmd/dolook/dotelecmd — none is dokick. `#` sits below
  the prefix-continue: C's PREFIXCMD arm `goto got_prefix_input`
  (:3760–3770, read) skips the tail — placement matches.
  C's own comment confirms "if func is doextcmd, tlist is for
  '#'" and the ext_tlist swap re-points tlist, never func —
  the JSDoc claim is C-verbatim.
- Canned (js/cmd.js:5514–5519): unconditional clear → exempt
  `run === dokick || txt === 'kick'` (bare shape compared
  directly). Grounded: cmdq_add_ec stores `{run: fn, txt:
  funct→txt}` (cmd.js:467, read); FUNCT_TXT maps dokick→'kick'
  (:2033); producers at :3010/:3142 queue real dokicks. Bound
  path already had the `txt !== 'kick'` shape (:2882).
- TIME-capability cites verified in pinned C: dotelecmd
  `dotele() ? ECMD_TIME : ECMD_OK` (teleport.c:933);
  dolook returns look_here's `!!Blind ? ECMD_TIME : ECMD_OK`
  (invent.c:4314); wiz_wish always ECMD_OK (`return ECMD_OK`,
  wizcmds.c:43–44) — `^W needs no clear` is true.

## C ↔ JS fidelity

Tail-for-tail confirm across all four shapes (bound pre-existing
+ per-key now complete + canned + extcmd). The mechanism is
measured, not inferred: kickedloc=(68,4) at moves 204–205 with
m_avoid_kicked_loc true, C evaluating (68,4) first (rn2(2))
while JS skipped it. The focused test discriminates (stashed
cmd.js fails with (68,4) held). Sibling arms ship without
isolated replays — honestly stated, same C arm, full suite
green. No RNG/prints in the change; dokick already imported
(cmd.js:80) — no new edge, no throw risk.

## Hallucinations / overclaim

None. "Bound, per-key, canned, and extcmd dispatch shapes now
all match" holds: ~35 kickedloc sites idiom-complete across
rhack branches (only Ctrl-D/dokick and domove's unconditional
clear differ, both C-cited).

## Density

Cliff-phase: head writer correct (selection-state divergence
→ the reset writer, not a dog_move re-port). One tail, Ledger
`rhack ported` + D-3848, Verify bullet with movement + both
spreads + green + strict + cohort + forced full 44/44.
Reached: probe moved 138→263.

## Verification

js-hunk grep: 0 hits. Rule #2 clean (iteration-wide run).
Re-measure (mine): `verify dog_move --base c5e7a97a3~1` →
`1 session(s) blocked on it (1 at baseline, 0 in the working
scoreboard)`, `scen-sweep-Rogue-578129: moved →
mhitm_knockback at step 263 (was 138)`, `0 PASS, 1 moved past,
0 unchanged, 0 worse → PROGRESS`; reach 80/80 REACH-OK
(spread of 828). Zero regressed. The movement claim is exactly
true.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
