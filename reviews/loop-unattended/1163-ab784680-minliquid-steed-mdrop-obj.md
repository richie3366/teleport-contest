# Review 1163 — ab784680 — minliquid steed + engulfed arms, mdrop_obj body

Subject promises: `mon.c` minliquid_core steed + engulfed-hero arms + `steal.c` mdrop_obj full body (D-2197, map-driven; corpus PASS held).
Diff actually adds: `mdrop_obj` full body replacing the `mdrop_obj_overcrowd` subset + `mdrop_special_objs` async-ification in `js/mon.js` (+~66/−~32); steed gate + engulfing flush in `minliquid_core`; four call-site awaits (`mon.js` ×2, `dog.js`, `shk.js`). No other files.

## Intent vs deliverable

Promise matches diff. The three named gaps on the gush→minliquid path (steed Flying/Levitation gate, `engulfing_u` drown flush,
`mdrop_special_objs` worn/saddle/`extract_from_minvent`) are all addressed. The corpus row is honestly labeled stale (PASS
pre-edit on the clean tree, still PASS post-edit — no movement claimed for the port).

## Inventory

- `mdrop_obj` (`js/mon.js:1503`): new full body, module-private; old subset name gone, zero remaining references (grep clean).
- `mdrop_special_objs`: sync→async; on-map → `mdrop_obj(FALSE)`; off-map gains `extract(TRUE,TRUE)` + rloco.
- `minliquid_core`: steed gate + engulfing flush.

## C ↔ JS fidelity

C `steal.c:813–846` (`node scripts/csym.mjs mdrop_obj`), in order:

```c
    coordxy omx = mon->mx, omy = mon->my;
    long unwornmask = obj->owornmask;
    char *obj_name = distant_name(obj, doname);   /* before extract */
    extract_from_minvent(mon, obj, FALSE, TRUE);
    if (unwornmask && mon->mtame && (unwornmask & W_SADDLE) != 0L
        && !obj->unpaid && costly_spot(omx, omy)
        && strchr(in_rooms(u.ux, u.uy, SHOPBASE), levl[omx][omy].roomno))
        obj->no_charge = 1;
    if (verbosely && cansee(omx, omy))
        pline_mon(mon, "%s drops %s.", Monnam(mon), obj_name);
    if (!flooreffects(obj, omx, omy, "fall")) { place_object(obj, omx, omy); stackobj(obj); }
    if (!DEADMONSTER(mon) && unwornmask)
        update_mon_extrinsics(mon, obj, FALSE, TRUE);   /* saddle removal last */
```

JS follows the order exactly: distant_name-before-extract ✓ (canonical `objnam.js`, pre-imported); `extract_from_minvent`
via canonical `worn.js:645` ✓ (the extra `unlink_minvent` fallback is null-safe and a no-op when the obj is already unlinked —
covers untagged overcrowding objs); saddle no_charge with the same short-circuit order ✓ (`W_SADDLE=0x00100000` confirmed at
`prop.h:125`; `in_rooms` returns a fromCharCode string — read at `hack.js:1257–1274` — so `.includes(fromCharCode(roomno))` ≡
C `strchr` ✓); `verbosely && cansee → pline_mon` ✓; `flooreffects "fall"` gate before place+stack ✓; alive+worn →
`update_mon_extrinsics(...,FALSE,TRUE)` last with the saddle-throws-rider comment carried ✓.

C `steal.c:849–871` specials: on-map → `mdrop_obj(mon,obj,FALSE)` ✓; off-map → `extract(TRUE,TRUE)` + `rloco` ✓ (unlink/nulls
are JS chain housekeeping the old code did). Steed gate matches C `mon.c:975–981`
(`== usteed && (Flying||Levitation) && !waterwall → return 0`) in C position (after inpool/inlava/infountain, before gremlin)
with the house youprop shape (flat cache or `(H||E)&&!B`, as in do.js) ✓. Engulfing flush matches C `:1088–1093` (after the
drown pline, before mondied/xkilled, plain `pline`, `hliquid("water")`), confirmed inside the pool-drown arm ✓.

Callee closure: `extract_from_minvent`/`update_mon_extrinsics` LIVE same-file-edge widenings (`worn.js`); `hliquid` LIVE
(`do_name.js:370`); `flooreffects`/`costly_spot` via dynamic import — zero new static edges ✓. All four specials call sites
awaited; `dogmove.js:580` is a separate file-local subset (pre-existing, untouched) — no clash with the module-private
`mon.js` port. No STUB in a live arm; named omits: none new (the verbosely-TRUE arm is implemented though unreached from
specials — same body, disclosed).

## Hallucinations / overclaim

None. The 1-PASS verify is explicitly attributed to a stale scoreboard, not to this port — the one honest way to report it.

## Density

~100 JS lines for three arms of two C functions in one caller path — single-cluster, legitimate §2b (ceiling note respected;
this review stays compact).

## Verification

D-log claims `verify --fn minliquid_core` 1 PASS (stale row, PASS pre- and post-edit) + green/strict/cohort + forced full 44/44.
Re-measured:

```text
verify minliquid_core: baseline ab784680~1 (scoreboard at 3fbdad72) — 1 session(s) blocked on it (1 at baseline, 0 in the working scoreboard)
  scen-genesis-Priest-91110: PASS
verify minliquid_core: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
```

Consistent: the session passes on this SHA's code with nothing left blocked, and the D-log does not credit the port with moving
it (some earlier commit did; scoreboard stale). Diff grep: no FORCE/DIAG/getRngLog/seed/coordinate gates. Rule #2 clean
(re-run this iteration).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
