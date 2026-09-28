# Review 1956 — 9ee8217df — get_mon_location whole-body port (D-2996)

Metadata: SHA `9ee8217df`, D-2996, `zap.c` get_mon_location + light.c
caller wiring. Stat: `js/light.js` (+1 import, arm +6/−5),
`js/timeout.js` (+18), `scripts/get-mon-location.test.mjs` (+50). No
`reviews/loop-unattended/*-9ee8217df-*.md` on disk before this review.

## Intent vs deliverable

Subject promises: "`zap.c` get_mon_location whole-body port +
do_light_sources caller wiring (D-2996)." The body adds that the
`do_light_sources` LS_MONSTER arm refreshed inline with the
youmonst/usteed-identity + `mburied` gate as named omits, and this
retires the D-2157 inline refresh.

Diff actually adds: exported `get_mon_location(mon, locflags)` in
`js/timeout.js`, one import name on the existing light→timeout edge,
the LS_MONSTER arm rewritten to call it at `js/light.js:516`, the
arm doc comment re-scoped to obj-side omits only, and 9 arm tests.
Promise and diff match; nothing else in `js/`.

## Inventory

- `get_mon_location` (NEW, exported, sync, `js/timeout.js:1670` at
  this SHA): whole C body port, house `{x,y}|null` shape.
- `do_light_sources` LS_MONSTER arm (CHANGED, `js/light.js:516`):
  inline `(m.mx|0)<=0 → 0,0 else mx,my+SHOW` replaced by the call
  with locflags 0. No other JS function touched.

## C ↔ JS fidelity

C locus per `node scripts/csym.mjs get_mon_location`:
`nethack-c/upstream/src/zap.c:691–709` (19 lines). Callers per
`--callers`: sole call site `light.c:192`, plus the `extern.h:3963`
decl. C body:

```c
if (mon == &gy.youmonst || (u.usteed && mon == u.usteed)) {
    *xp = u.ux; *yp = u.uy; return TRUE;          /* :697–699 */
} else if (mon->mx > 0 && (!mon->mburied || locflags)) {
    *xp = mon->mx; *yp = mon->my; return TRUE;    /* :700–703 */
} else { *xp = *yp = 0; return FALSE; }           /* :704–707 */
```

JS (`js/timeout.js:1670`):

```js
if (!mon) return null;                            /* sibling null guard */
if (mon === game.youmonst || mon._youmonst
    || (game.u?.usteed && mon === game.u.usteed))
    return { x: game.u?.ux|0, y: game.u?.uy|0 };   /* :697–699 */
else if ((mon.mx|0) > 0 && (!mon.mburied || locflags))
    return { x: mon.mx|0, y: mon.my|0 };           /* :700–703 */
return null;                                      /* :704–707 */
```

Branch-by-branch confirm: identity arm first (C `:697`), then the
`mx>0 && (!mburied||locflags)` arm (C `:700`), else zeroes/FALSE
(C `:704–707`) rendered as `null` with the caller zeroing —
matches the sibling `get_obj_location` house shape and the C
caller `light.c:191–194` (`if (get_mon_location(...,0)) SHOW`,
else C-held `0,0` from the FALSE arm; JS zeroes explicitly).
RNG: zero `rn2/rnd/rn1/d` calls on both sides — call-for-call
trivially exact. The `!mon` guard has no C counterpart (C would
deref NULL) but the sole C caller never passes NULL for
LS_MONSTER, so it is unreachable defensive shape, not a C-wrong.
The `_youmonst` disjunct matches the house marker idiom
(`js/mhitm.js` `is_youmonst`: `m===game.youmonst || !!m._youmonst`).

Helpers: zero C callees. `game.youmonst` / `game.u.usteed` /
`game.u.ux/uy` are LIVE gstate reads. No clone, no stub, no omit.
`sym.mjs` (no symbol deleted or re-pointed by this diff — the
inline code was not a named clone, so no re-point output is owed):

```text
get_mon_location js/timeout.js:1684   sync
```

Exported sync, matching C `boolean` sync.

Diff grep (`FORCE|DIAG|getRngLog|fastforward|seed\d{4}|TODO`):
no hits in the `js/` hunks. Rule #2 across scored `js/`:
`node scripts/imports.mjs --rulecheck` → "Rule #2 clean: no
bare/node specifiers or fs calls in js/." No new edge (the
light→timeout import already existed), so no `--can` check is owed.

## Hallucinations / overclaim

None. The D-log says "full port, caller wired" for a leaf with
zero callees and cites the sole call site with the no-other-caller
check (2 refs = 1 call + decl) — all verified above. No "Match C"
dispatch-over-stub shape. The `light.c:191–194` caller citation is
accurate (SHOW set only on TRUE).

## Density

Breadth-phase single-function port, one C file (`zap.c`), callee
closure empty, caller wired. `Ledger: get_mon_location ported` and
per-function Verify lines present. Not a cluster, so the ≤10 /
same-file / no-Must-fix-bundle rules are trivially met. No arm
sold short: all three C arms plus the caller gate are in JS.

- `get_mon_location`: whole body, sole caller wired → density OK.

## Verification

D-log Verify bullet: `verify.mjs --fn get_mon_location` → PASS
(syntax 2 files; rule2; hidden note no corpus session blocked;
reach smoke 12/12 REACH-OK; green 2/2; strict ×2; cohort 7/7) +
focused test 9/9 with pre-change absence proven. Re-measured here:

```text
verify get_mon_location: baseline 9ee8217df~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke get_mon_location: no RNG-tagged reach; fixed smoke spread (12 run, 3.7s): 12 PASS, 0 regressed → REACH-OK
```

Both summary lines cited. The vacuous-verify note is honest here:
the queue row was coverage MISSING, never N corpus blocks, and the
D-log says "no corpus session blocked", not "PASS hidden". No
REGRESSED session. No seed/step/coordinate/RNG-index reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
