# Review 2198 — 0148914f2 — digactualhole pit-vision flag + arms; grave channels

Metadata: SHA `0148914f2`, D-3237, js/dig.js only, 2-fn cluster.
Parent baseline `caf1b5991`.

## Intent vs deliverable

Subject promises: pit-vision flag + buried-ball/impossible arms +
You channels for `digactualhole`, channels for `dig_up_grave`. The
diff delivers exactly those plus doc-block corrections (stale
ship_object/liquid_flow/add_damage omits fixed with C-callee
evidence). The commit message's root-cause narrative (dead
`game.vision` guard) is the fix's justification, and the re-measure
below confirms the predicted session movement. No drift.

## Inventory

- `digactualhole`: TT_BURIEDBALL → live `buried_ball_to_punishment()`;
  `!Can_dig_down` → live `impossible("digactualhole: can't dig %s on
  this level.", trapname(ttyp,true))`; PIT at_u → live
  `game.vision_full_recalc = 1`; `wake_nearby` awaited; 6 message
  sites → live `You()`/`pline_The()`; both mon arms → entry `mtmp0`.
- `dig_up_grave`: 4 message sites → live `You()`/`pline_The()`.

## C ↔ JS fidelity

`digactualhole` — C dig.c:639–829. Entry `m_at` read once (:649) →
both JS mon arms now use entry `mtmp0` (the old `mtmp0 || m_at`
re-read after `desecrate_altar` wrath could summon onto the cell —
genuine order C-wrong, now gone). TT_BURIEDBALL (:656–657) →
awaited live same-module async (`sym.mjs`: js/dig.js:594 ASYNC).
`!Can_dig_down` (:663–667): impossible string and `trapname(ttyp,
TRUE)` arg exact, then `ttyp=PIT`. Channels: `You("dig an adjacent
%s.")`, `You("dig %s %s the %s.")`, `pline_The("%s crumbles…")`,
`pline_The("%s falls…")`, `You("are jerked back by your pet!")`
(:762–763), `You("fall through...")` (:781) — all six match C's
channel and text. PIT at_u (:736–738): `gv.vision_full_recalc = 1;
/* vision limits change */` — JS writes the live flag with the C
comment; the flag is consumed (vision.js:864 `if
(game.vision_full_recalc) vision_recalc(0)`), replacing a guarded
write to a never-created `game.vision` object — the reported root
cause, and a real dead-store C-wrong. `wake_nearby(FALSE)` (:726)
awaited = C completion order. D-log's "none" in-body (25+ live
callees enumerated) stands — no stub in any arm I walked. Verdict:
whole body exact.

`dig_up_grave` — C dig.c:1026–1089. All four channel swaps match C:
`You("disturb the honorable dead!")`, `You("have violated the
sanctity of this grave!")`, `You("unearth a corpse.")`,
`pline_The("grave is unoccupied.  Strange...")`. Rest of body
(exercise/align/rn2(5)/ROOM/clear/del_engr/newsym) untouched and
previously live. Verdict: exact.

Callers: C's 4 `digactualhole` sites (apply.c:4071, dig.c:960/1016/
1018) → js/apply.js:1375, js/dig.js:2164/2226/2228, all present;
`dig_up_grave` sole C caller dig.c:961 → js/dig.js:2165 per D-log.
No caller C never calls from. Helpers: all C callees LIVE; no
clones added or removed; doc corrections accurate (`add_damage`
live shk.js import at the PIT arm; ship_object/liquid_flow absent
from C :639–829 — verified by reading the body).

## Hallucinations / overclaim

None. The "moved → js-throw" label for 94035 is pre-emptively
explained as the `owner || 'js-throw'` display default — I
re-checked: `error: null, kind: screen, owner: null`. Not a throw.
The two unmoved sessions are queued as other writers with session
evidence, not claimed.

## Density

2-function same-C-file cluster with measured movement (3 PASS, 4
moved past): right-sized for a residual fix. Per-function Verify
sub-bullets, per-function Named lines, individual `Ledger:` entries.
No Must-fix bundled, no second file.

## Verification

- Banned-pattern grep on the diff hunks: clean (the message-text
  coordinates are probe evidence in prose, not control flow).
- Re-measured: `hidden-proxy.mjs verify digactualhole,dig_up_grave
  --base 0148914f2~1 --reach-all` → digactualhole "3 PASS, 2 moved
  past, 1 unchanged, 0 worse → PROGRESS" (94315/94395/94260 PASS;
  94215→use_pick_axe2@32; 94015→exercise@60; 94153 unchanged);
  dig_up_grave "0 PASS, 2 moved past, 1 unchanged, 0 worse →
  PROGRESS" (94035→owner-null@44; 94355→stop_donning@39; 94040
  unchanged); reach 1/1 REACH-OK each. Matches the D-log
  session-for-session. No REGRESSED.
- HEAD-baseline note ("rows' cited 6+3 reproduced, no --base owed"):
  my re-run used the parent baseline and reproduced the same 6+3
  blocked sets. No seed/step/coordinate reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
