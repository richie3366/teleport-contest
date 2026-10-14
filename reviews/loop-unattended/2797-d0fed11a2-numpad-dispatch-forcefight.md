# Review 2797 — d0fed11a2 — rhack num_pad dispatch whole + m-reject stop

- **SHA:** `d0fed11a2` (Wed 2026-10-14) — cliffs-head writer (D-3947).
- **D-entry:** D-3947. **Ledger:** `rhack` D-tagged ported.
- **Diff size:** `js/cmd.js` +215/−~60, +3 tests.
- **Method:** cliff (≤10 fns) — whole Method on the dispatch arms + movement re-measure.

## Intent vs deliverable (promise vs diff)

The subject promises: num_pad-aware classifiers, C's bound-only
F/g/G prefix gates with `cmd_from_func` naming, an ECMD_FAIL m-reject
stop, a shared Unknown helper verbatim from C `:3833–3841`, a redraw
arm, and CQ_REPEAT rows for the num_pad binds.

The diff delivers all six. Promise and diff agree — except the
"verbatim" Unknown helper carries a house `forcefight = 0` that C
`:3833–3841` does not have (C-wrong #1 below, fixed in-window by
`2276f30eb`).

## Inventory

| # | JS change | C source | Status |
|---|-----------|----------|--------|
| 1 | `NUMPAD_WALK` + num_pad classifiers | `reset_commands` :3430–3475 | exact (ndir↔sdir alignment verified) |
| 2 | `RHACK_REPEAT_*` rows + num_pad arms in repeat fn/txt | `move_funcs` :2070–2083, `:3462–3472`, `:2770–2772` | matches C binds |
| 3 | `rhack_unknown_command` helper, both sites re-pointed | rhack bad_command :3833–3841 | **C-wrong: clears forcefight** (child-fixed) |
| 4 | F/g/G gates → tlist bound-only + `cmd_from_func` names | rhack :3693–3700, `cmd_from_func` :3036–3066 | gate shape exact; **reads persistent forcefight, C reads call-local prefix_seen** (child-fixed) |
| 5 | m-reject `reset_cmd_vars(true)` + return | :3705–3714 → :3812–3816 tail | equivalent (verified below) |
| 6 | walk arm `wch`, `metaRunDir`, `numPadPrefix`, redraw arm | `:3439`, `:3470`, `:2770–2771`, extcmdlist :1818, `doredraw` :1694–1699 | exact |
| 7 | 3 numpad tests | — | 0/3 pre → 3/3 post per D-log |

No export deleted. Re-pointed symbols (local→local): both inline
Unknown blocks → `rhack_unknown_command`. `sym.mjs`:
`rhack_unknown_command NOT EXPORTED — 1 LOCAL CLONE in js/cmd.js:5501`
(single house helper for a C arm — correct shape, no drift);
`doredraw js/display.js:6880 ASYNC` (LIVE, awaited at the redraw arm).
`cmd_from_func` (dokeylist.js:553, LIVE) re-verified against C
:3036–3066: space skip, digit/`-` skip under !num_pad, first-printable
wins, non-printable fallback, space last resort — all present.

## C ↔ JS fidelity

**Verified exact.** `NUMPAD_WALK` = ndir "47896321" index-aligned with
sdir "hykulnjb" (`:3433–3435`). `commands_init` `:2761–2772` binds
confirmed (C-l→redraw, h/j/k/l/u/N letters, '5'→run, M-'5'→rush,
'-'→fight). Under num_pad C binds only M(digit)→run (`:3469–3472`,
"can't bind highc() or C() of digits") — `isRunKey→false`,
`rushDirFromCtrl→null`, `metaRunDir` all match. The `:3693` gate sits
inside `if (tlist != 0)` (`:3685`) after
`cmdbind_get(key & 0xFF)` (`:3678`) — JS `afterFightTab`/`afterRushTab`
(`cmdbind_get(key & 0xff)`, null falls to Unknown) is the same shape.
C `:3721–3722` sets `res = ECMD_FAIL` after the prefix pline and falls
into the `:3812–3816` reset+return tail with the command never run —
JS's `reset_cmd_vars(true); return;` is equivalent. `doredraw` is
`docrt()` + ECMD_OK (`:1694–1699`); C-r survives both modes ('r' is no
dirchar); C-l is rush-west under !num_pad and redraw under num_pad —
the arm condition matches. '0' is unbound in C (only a `:2586`
help-text mention and `:5054` count handling; no bind, no ndir slot)
→ Unknown ✓. do_rush→run=2 / do_run→run=3 (`:1599`/`:1615`) confirms
`run === 3 ? 'run' : 'rush'` ✓. The `update_rest_on_space` owner is
indeed the `:3498` comment text («Unknown command ' '.») ✓. Walk arm
`isMovementKey` + `wch` routes digits under num_pad ✓.

**C-wrong #1 (shipped, child-fixed): Unknown clears forcefight.** C
`:3833–3841` is custompline + 2× cmdq_clear + sanity skip + move
FALSE + multi 0 — no reset of any kind. The helper's
`if (game.context?.forcefight) game.context.forcefight = 0`
contradicts its own cite. D-3953 proved it live against the C
recording (F/b/F never doubled) and deleted the line (`2276f30eb`).
Fail-to-heal at ship, not a regression (0 worse then and now).

**C-wrong #2 (latent at ship, child-fixed): F gate reads persistent
forcefight.** C `:3693` fires on call-LOCAL `prefix_seen` (a
parameter-position local, NULL on the next call). JS read the
persistent `game.context.forcefight`, masked at ship by wrong #1;
D-3953 proved the over-fire (Monk-50059064 '>' after F/b) and made
the gate call-local. Same child fix.

**Observation (no row):** C `:3713–3715` also treats
`ef_funct == doup/dodown` as up/down for the suffix; JS checks
`ch` only. No bind other than `</>` targets those functions, so the
difference is unreachable.

Diff grep: no FORCE/DIAG/`getRngLog`/fastforward/coords (one
pre-existing `seed4500` comment cite). Rule #2 clean (iteration-wide,
SHA 2796).

## Hallucinations / overclaim

One: "shared rhack_unknown_command helper = C `:3833–3841`
verbatim" — the helper is not verbatim (forcefight clear,
`end_running`, `command_count` reset are all house extras; only the
first proved live-wrong). The remaining two extras are now named
omissions in D-3953. Everything else checked out, including the
'0'-unbound and newest-printable-wins claims I re-derived from C.

## Density

Cliff discipline holds: one writer (rhack dispatch), whole (all six
pieces + callers unchanged and wired), shipped with movement on both
probe owners. The two C-wrongs above are the debt; both are already
fixed in-tree by the in-window child `2276f30eb` (D-3953 review 2802
verifies the fix), so no Must-fix row is queued — a row for landed
work would be a stale busywork row.

## Verification

Re-measured myself on current code
(`verify update_rest_on_space,rhack --base d0fed11a2~1 --reach-all`,
baselines = 13 + 8 sessions blocked at the parent):

```
verify update_rest_on_space: 2 PASS, 11 moved past, 1 unchanged, 0 worse → PROGRESS
verify rhack: 3 PASS, 5 moved past, 0 unchanged, 0 worse → PROGRESS
smoke ×2: 24 PASS, 0 regressed → REACH-OK
```

Superset of the D-log's ship-time claims (1+12 / 1+7, 0 worse) —
later commits moved more. The 1 unchanged (scen-options
Caveman-50162006@129, an options-family Unknown-'y') is a different
writer, not a regression. No REGRESSED session.

## Actionable C-wrongs

1. `rhack_unknown_command` cleared `forcefight`; C `:3833–3841` keeps
   it — **fixed in-window by `2276f30eb`** (verified in review 2802).
2. The F-prefix gate read persistent `forcefight`; C `:3693` reads
   call-local `prefix_seen` — **fixed in-window by `2276f30eb`**
   (verified in review 2802).

Verdict: **ACCEPT-WITH-DEBT**
