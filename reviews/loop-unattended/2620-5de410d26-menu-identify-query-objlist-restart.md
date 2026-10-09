# Review 2620 — 5de410d26 — menu_identify restart onto query_objlist (D-3753)

Metadata. SHA `5de410d26` (2026-10-09), D-3753, parent
`9d1f099fd`. js diff: `js/invent.js` −47 net (89-line
hand-rolled menu clone → 42-line C-order restart +
SIGNAL_* import) and `js/pickup.js` +7/−5 (PICK_ANY
ESC-vs-empty tail) +
`scripts/menu-identify-armor-heading.test.mjs` (new, 1
it). Ledger: `menu_identify` ported + `query_objlist`
ported (D-3753 appended). Works its HEAD's cliffs head
(`invent.c` menu_identify, 1 blocked: 95231 — verified
in the parent queue; region-heuristic row, but the owner
IS the writer here).

## Intent vs deliverable

Promise (subject + D-log): 95231@152 C row 2 «Armor»
(inverse class heading) vs JS «g - a +3 pair of speed
boots» — the shipped body was a hand-rolled menu clone
(no INVORDER_SORT headings) instead of C's query_objlist
call. Restart menu_identify onto the live query_objlist
(headings live per D-3406) with C's exact qflags, clamp,
identify loop, wait_synch, and -2/-1/tryct arms; fix the
PICK_ANY tail so ESC-cancel maps via SIGNAL_ESCAPE
while empty-confirm stays 0 per C `:1210–1213`. Zero
blast radius via a 6-site audit.

Diff actually adds exactly that. Promise and diff match.
No signature change; sole caller untouched.

## Inventory

Changed JS (1 restart + 1 tail):

- menu_identify — `js/invent.js:3580–3611` (restart).
  C: `invent.c` menu_identify `:2659–2695` (printed
  range; body verified whole below).
- query_objlist PICK_ANY tail — `js/pickup.js:972–991`.
  C: `pickup.c` `:1210–1213` (`else if (n < 0) n =
  SIGNAL_ESCAPE ? -2 : 0` — verified); heading arm
  `:1098–1125` add_menu_heading under INVORDER_SORT
  (verified present).

## C ↔ JS fidelity

**Restart branch-for-branch confirm.** buf first/next
✓; qflags exactly C's four ✓; PICK_ANY over
not_fully_identified ✓; `n>0` clamp + identify loop
with `id_limit--` ✓ (C free() ⇔ GC); `if (id_limit)
await tty_wait_synch()` ✓; `first=false` ✓; -2 break
✓; -1 pline + break ✓; `!--tryct → pline(
thats_enough_tries)` + break ✓ (C `pline1`; the
pline-for-pline1 idiom is established in-tree —
`js/apply.js:3149` `pline(nothing_happens)` for C
`pline1`, verified); else re-prompt pline ✓. Stays
local — C is staticfn ✓. Sole C caller `:2742`
(`n == 0 || n < -1`) matches JS `:3638–3640` unchanged
✓. Callees all LIVE: query_objlist (import :354),
identify (in-file), not_fully_identified (in-file
export :3496), tty_wait_synch (import :54).

**Tail exact.** `select_menu_pick_any(raw,
{cancelValue: null})`: ESC returns null (`:10295`,
verified in the ESC arm), Enter/space return the picks
array — [] on empty confirm (`:10302/:10310`,
verified). So null→(SIGNAL_ESCAPE?-2:0), empty→0 —
exactly C `:1210–1213`. The cancelValue idiom has 7
prior in-tree users. No other query_objlist path
touched.

**Zero-blast-radius audit re-verified.** All 6 other
sites confirmed no SIGNAL_ESCAPE with PICK_ANY:
do.js:3301 (USE_INVLET|INVORDER_SORT|INCLUDE_VENOM),
do_wear.js:2718 (+SIGNAL_NOMENU, no ESCAPE), invent
:4533 (INVORDER_SORT|INCLUDE_HERO?, how=pickings≠NONE),
pickup :2906 menu_loot (INVORDER_SORT|INCLUDE_VENOM+
JUSTPICKED); invent :1892 PICK_ONE and :4793 PICK_NONE
take untouched paths. ESC→0/empty→0 mapping is
bit-identical for every existing caller. (D-log cites
invent 4578/4838 — pre-edit numbers; post-edit 4533/
4793. Cite note only.)

**Test.** Replay pins row 2 «Armor» + row 3 boots line;
0/1 pre-fix (stash A/B) → 1/1 post-fix. Adequate.

## Hallucinations / overclaim

None. The "clone skipped headings" diagnosis matches
the deleted code (no heading entries, doname not the
query path), and the mapping bug (empty-confirm → -2
under SIGNAL_ESCAPE, skipping the re-prompt) follows
from the old tail. Diff grep (FORCE / DIAG / getRngLog
/ fastforward / seed / coords): zero hits. Clone
deleted → live import (no symbol re-pointed; imports
pre-existing): `sym.mjs` paste not required. Edge check:
`--can invent→const` = ALREADY. Rule #2: global
re-check this audit → clean.

## Density

Cliff-phase §2b: parent head is menu_identify (1
blocked, RNG lost 55120); this commit restarts the
owner whole (preferred over shims per playbook) and
moves the probe +384 with the pre-existing query
omits honestly standing. One cliff, one C locus, no
bundling. Correct gates (green/strict/cohort; full
skipped per gate — honestly stated with the nil-blast
proof).

## Verification

D-log Verify (`verify.mjs --fn menu_identify`): 0 PASS
+ 1 moved + 0 + 0 → PROGRESS (95231 152→536 level_tele);
smoke 24/24 → REACH-OK; green/strict/cohort PASS.

Re-measured by this audit (`verify menu_identify
--base 5de410d26~1 --reach-all`; HEAD code includes 2
later SHAs):

```text
verify menu_identify: 0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS
smoke menu_identify: no RNG-tagged reach; fixed smoke spread (24 run, 11.9s): 24 PASS, 0 regressed → REACH-OK
```

95231 sits exactly where named (level_tele@536). No
vacuous check (row cited 1; itemized).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
