# Review 2204 — f247f6b3c — lock.c force/pick 9-function cluster

Metadata: SHA `f247f6b3c`, D-3243, `js/lock.js` only (imports +
consts + 4 bodies; 162 changed lines). Parent `1634fa4fa`.

## Intent vs deliverable

Subject promises: `doforce` prompt-order fix (Barbarian container
200→285) + `picklock`/`forcelock`/`breakchestlock` whole bodies.
Delivered: the prompt fix plus whole-body completion of all
three, with 5 more lock.c functions verified-no-change in the
same cluster (9 total, one C file). Cause analysis is a measured
C-order comparison (safe_qbuf-before-lknown), not a guess.

## Inventory (per function)

- `doforce`: prompt via live `safe_qbuf` before `lknown=1` +
  live `ynq`; guards/messages on live `You_cant`/`You`/`There`/
  `cant_reach_floor`; `xlock.door = null` removed.
- `picklock`: magic-key trap-find + `y_n` disarm arm (two-space
  message); trapped-door arm reordered to C (b_trapped first,
  `unblock_point`, SHOP_DOOR_COST); box `chest_trap`;
  post-increment give-up; D_ISOPEN `You`.
- `forcelock`: post-increment give-up; live `You` channels.
- `breakchestlock`: cobj-hiding COST_BRKLCK billing; ICE_BOX
  corpse-age arm; live loss `You`.
- `u_have_forceable_weapon`, `chest_shatter_msg`, `reset_pick`,
  `picking_lock`, `picking_at`: untouched, claimed whole.

## C ↔ JS fidelity (per function)

`doforce` — C lock.c:675–756 (csym; D-log 676–756, same body).
Guards uswallow → weapon → can_reach_floor, all ECMD_OK ✓;
`picktyp = is_blade && !is_pick` ✓; resume gate
`usedtime && box && picktyp==xlock.picktyp` ✓; box scan:
broken/unlocked arm lknown=0 → There → lknown=1 ✓; safe_qbuf
args `(null, 'There is ', ' here; force its lock?', otmp,
doname, ansimpleoname, 'a box')` match C ✓, `lknown=1` after
✓; `ynq(qbuf)` (live wrapper: ynqchars/'q' ≡ C
yn_function(..., 'q', TRUE)) ✓; q→OK, n→continue ✓; pry/bash
✓; chance = oc_wldam*2 ✓; magic_key FALSE, usedtime 0, no
door write ✓; box → occupation else "decide not to force"
+ ECMD_TIME ✓. No RNG. Callers: signature unchanged, extcmd
table + #force + CQ_CANNED stay wired. Verdict: whole exact.

`picklock` — C lock.c:67–159 (csym; D-log 68–159). Moved gates
✓; `usedtime++ >= 50` post-increment now exact (JS oldtime
idiom) ✓; NODOOR/BROKEN pline, ISOPEN You ✓; rn2(100) vs
chance ✓; magic-key arm: trap predicate
`(!door ? box.otrapped : doormask&D_TRAPPED) && magic_key` ✓,
chance+=20 ✓, tknown find ✓, y_n disarm with door/box
branches and the exact two-space message ✓, A_WIS T/F ✓,
usedtime=0 ✓; success: trapped door b_trapped → D_NODOOR →
unblock_point → in_rooms/SHOPBASE → add_damage(SHOP_DOOR_COST)
→ newsym ✓ (add_damage live sync shk.js:1380 via dynamic
import — cycle-safe idiom); locked↔closed toggle ✓;
box olocked toggle + lknown=1 + chest_trap(FINGER,FALSE)
awaited ✓. Micro-gap (not queued): JS calls `newsym(tx,ty)`
in the two locked↔closed toggle arms where C has none —
locked/closed share glyph '+', no RNG, unobservable repaint;
reviewed-benign. Verdict: whole, one benign extra call.

`forcelock` — C lock.c:215–256 (csym; D-log 216–256). Moved
gate ✓ (JS adds `!box`, unreachable under C, defensive);
post-increment ✓ with C's post-increment `usedtime >= 50`
exercise check preserved exactly ✓; blade
`rn2(1000-spe) > 992-erosion*10 && !cursed &&
!obj_resists(uwep,0,99)` call-for-call ✓; "One of y/Your …
broke!" ✓; useup via local async clone (named: setuwep may
promise) ✓; blunt wake_nearby(FALSE) ✓; rn2(100) ✓;
destroyit = !picktyp && !rn2(3), short-circuit so rn2 fires
only when blunt ✓; breakchestlock + reset_pick ✓. Verdict:
whole exact.

`breakchestlock` — C lock.c:161–212 (csym; D-log 162–212).
!destroyit: hide-cobj → costly_alteration(COST_BRKLCK) →
restore → olocked 0/obroken 1/lknown 1 ✓ (costly_alteration
live async shk.js:2436, awaited). Destroy: shkp/costly/
peaceful from ushops[0] + costly_spot ✓; "In fact…" pline
✓; spill loop obj_extract_self → `!rn2(3) || POTION` (RNG
first ✓) → shatter_msg + stolen_value(otmp,…,peaceful,TRUE)
✓ → quan==1 obfree-inline (quan=0, OBJ_FREE) else
useup-clone ✓; ICE_BOX+CORPSE age + start_corpse_timeout
(live sync mkobj.js:2350) ✓; place + stack ✓; box
stolen_value ✓; loss You ✓; delobj ✓. Callers: lock.c:252 →
js/lock.js:2013 ✓; dokick unchanged (signature same).
Verdict: whole exact.

`u_have_forceable_weapon` — C lock.c:659–670. JS
js/lock.js:2019: !uwep→false; WEAPON||weptool → skill
range test (P_DAGGER/FLAIL/LANCE) ✓; else ROCK_CLASS ✓.
Restructured ternary, identical predicate. Verdict: whole.

`chest_shatter_msg` — C lock.c:1275–1318 (csym; D-log
1276–1318). JS js/lock.js:1827: POTION You hear/see +
an(bottlename) + breathless/haseyes potionbreathe ✓;
HBlinded/BBlinded save-force-restore around singular(xname)
✓ (JS also pins sticky u.Blind — required by JS xname,
restored; sound adaptation); 6-arm material switch in C
order + default ✓; An(thing) pline ✓. Verdict: whole.

`reset_pick` — C lock.c:258–265: 5-field clear ✓ + kept
door_x/door_y bookkeeping (named). `picking_lock` — C
lock.c:16–27 ✓ (occupation identity + ux+dx fill).
`picking_at` — C lock.c:29–34 ✓ (occupation + door
pointer identity). Verdicts: whole.

Helpers: y_n/ynq (live, correct tables), unblock_point,
COST_BRKLCK/SHOP_DOOR_COST, A_WIS, start_corpse_timeout,
cant_reach_floor (async, awaited), chest_trap (async,
awaited), safe_qbuf (live full port) — all LIVE, 7
pre-existing edges extended, zero new module edges. No
deletions/re-points, so no sym.mjs paste required; names
resolved by direct export reads (async-ness matches every
call site: chest_trap/costly_alteration/cant_reach_floor
awaited, add_damage/unblock_point/start_corpse_timeout
sync).

## Hallucinations / overclaim

None. "Whole body" claims hold per function above; the
vacuous verifies are presented as smoke + movement under
the owner fn.

## Density

9 whole lock.c functions, one C file, ≤10, no Must-fix
bundled — textbook §2b cluster. Own C-locus/Callers/Verify/
Named-omissions bullets and own `Ledger:` entries per
function (all 9). Verdict per function: whole (picklock:
whole + benign extra newsym).

## Verification

- Banned-pattern grep on the js hunks: clean.
- Re-measured in one call: `hidden-proxy.mjs verify
  doforce,…,picking_at --base f247f6b3c~1 --reach-all` →
  doforce "0 PASS, 1 moved past … → PROGRESS"
  (Barbarian-94366 200→doname_base@285 ✓) + smoke 24/24;
  forcelock 14/14, breakchestlock 13/13, picklock 3/3
  REACH-OK; other six smoke 24/24 each. D-log reproduced
  exactly; zero REGRESSED.
- No seed/step/coordinate reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
