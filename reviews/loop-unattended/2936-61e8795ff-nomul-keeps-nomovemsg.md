# Review 2936 — 61e8795ff — nomul(0) no longer clears nomovemsg

- SHA: `61e8795ff` (cliff, writer behind `lesshungry`)
- D-entry: D-4095; Ledger: hack.c (`nomul`, `unmul`), eat.c
  (`lesshungry`, comment only), D-4095
- `js/` diff: `js/hack.js` +5/−1, `js/eat.js` comment ±2

## Intent vs deliverable

Promise: when nval is 0, JS `nomul` also set `game.nomovemsg = null`.
No C line does that. So when a monster interrupted a meal, lesshungry's
«You're finally finished.» was gone before `done_eating` could print
it. Diff: the clear is removed, `multireasonbuf = ''` is added to
`nomul(0)` and to `unmul`, and lesshungry's stale omission note is
replaced. Promise = diff.

## Inventory

- `nomul` — hack.js:1683–1702; C hack.c:4160–4173. Whole body
  compared.
- `unmul` reset tail — hack.js:1825–1828; C hack.c:4176–4208 (resets
  :4196–4198).
- `multireasonbuf`: a real field, not a phantom. Its writers are
  uhitm.js:271 (paralysis reason «m_id:verb by …») and end.js:455, and
  end.js:1534–1541 reads it (C end.c :288–316 killer). LIVE.

## C ↔ JS fidelity

```c
if (gm.multi < nval) return;
disp.botl |= (gm.multi >= 0);
u.uinvulnerable = FALSE; u.usleep = 0;
gm.multi = nval;
if (nval == 0) gm.multi_reason = NULL, gm.multireasonbuf[0] = '\0';
end_running(TRUE); cmdq_clear(CQ_CANNED);
```

Line by line, JS now matches C: the early return, botl, uinvulnerable,
usleep, multi, the reason pair, end_running, and the canned-queue
clear. No `nomovemsg` write remains. In C, `nomovemsg` is cleared only
by unmul :4196 (`gn.nomovemsg = 0` after printing) and by done_eating,
and JS unmul already has both. unmul's `multi_reason = NULL,
multireasonbuf[0] = '\0'` (:4198) is now whole in JS. No RNG in either
function.

Risk check: a JS-only `nomovemsg` writer would have been hidden by the
old clear, and is now stale until the next unmul. That is why the
window-wide full rescore below is the regression check for this SHA.
D-4101 (`cfce30f52`, review 2942) is in the same family: a C NULL
`nomovemsg` ported as a value unmul can't default.

## Hallucinations / overclaim

None. The note «adj_victual_nutrition ported at eat.js:1503» replaces a
stale omission line. It is a comment, not a code claim.

## Density

One C function made whole (one statement removed, one added), plus
unmul's missing reset. Ledger bullets for nomul/unmul/lesshungry.

## Verification

```text
verify lesshungry (--base 61e8795ff~1): 3 blocked
  scen-extcmd-Ranger-51257062, scen-sweep-Archeologist-50055004,
  scen-sweep-Monk-620073: PASS
verify lesshungry: 3 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
verify nomul: 0 blocked (vacuous; owner is lesshungry)
```

Exact match with the D-log (3 → FULL PASS). Public 44/44 at HEAD.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
