# Review 2504 — 4ecf787ca — optfn_boolean do_set restart (D-3623)

SHA: `4ecf787ca` — cliffs-head `optfn_boolean` writer (doset bool mirror).
D-3623.

## Intent vs deliverable

Promise: the doset bool mirror lacked the hilite_pet/color after-change
arms, so `opt_need_redraw` stayed clear and the post-toggle
`reset_needed_visuals → docrt → cls → more()` chain never flushed `--More--`.
Fix restarts `optfn_boolean_do_set` in C order: 3 moved (one step later
each, 0 PASS).

Diff actually adds: `js/options.js` (+75/−13: the restart + doset caller
gate) + `scripts/doset-bool-afterchange.test.mjs` (4 cases) + async-only
adaptations of two existing tests. No new imports. No other `js/`.

## Inventory

- `optfn_boolean_do_set` (`js/options.js:10688`, restarted, now async) — C
  `options.c:5192–5449` do_set. Status: fixed.
- `doset` bool-toggle caller (`js/options.js:11290–11299`, changed) — C
  `:5438–5439` toggle gate + `:8956–8958` preference_update. Status: fixed.

## C ↔ JS fidelity

Walked against C `options.c` in order: addr retreat `:5204` (silent, still
preference_updates) — exact; fuzzer gate `:5239–5244` (silent/perm_invent,
no set, no pline) — exact; perm_invent can_set `:5265–5267` via the live
`can_set_perm_invent(undefined, initial)` (`:4600`, extra params default
sensibly) — exact; SET `:5286` — exact; after-change ascii_map/tiled_map
`:5294–5299`, hilite_pet `:5300–5311` (tty/curses gate, wc2_petattr default
Inverse, `opt_need_redraw`) — exact; idlecheckpoint `:5314–5320` (notice
pline with the exact C string, force off, `give_opt_msg = FALSE`) — exact;
doset-only return `:5325–5326` — exact; lit/dark `:5362–5374`
(`vision_recalc(2)`, `vision_full_recalc`, use_color redraw) — exact;
color `:5399–5409` (TOS arm correctly build-gated out), customcolors/
customsymbols `:5411–5416`, menucolors/guicolor `:5417–5421`
(+`update_inventory`), mention_decor `:5422–5424` (prev_decor STONE) —
exact; toggle gate `:5438–5439` (`if (give_opt_msg) pline`, caller-side) —
exact. Pre-existing arms (terrainstatus group, wizweight, glyph-reset,
hitpointbar, rest_on_space, accessiblemsg) untouched and present.

Omissions verified truly unreachable: female `:5247–5263` and pauper
`:5290–5293` are `set_in_config` (`optlist.h:306/:559`) while doset lists
`set_gameview..set_in_game/set_wiznofuz` (`:8819–8820`); neither name is in
`DOSET_BOOL_ADDR` (addr retreat double-covers); the female/pauper arms live
in the whole `optfn_boolean` (`:10493`) for the config path. The setwhere
gates `:5207/:5211` and the op/valok parse cannot fire (listed rows only,
doset bufs carry no `:value` — C `:8923–8925` builds `[!]name`). The
`give_opt_msg` stickiness after idlecheckpoint mirrors C exactly (C's static
is likewise only re-armed at `:8733`).

The measured `--More--` chain (doset `:8974` → reset_needed_visuals `:9003`
→ docrt → cls `:2197` → more()) correctly identifies `opt_need_redraw` as
the missing link, set only by the newly ported arms on these probes.

Helper class: full C callee closure, all LIVE (pre-existing edges:
`vision_recalc`, `update_inventory`, `STONE`, in-file `windowport_*`,
`mark_opt_*`). No clone created or re-pointed. The two touched test files
are async/await adaptations only — assertions unchanged. No FORCE/DIAG/
seed/coordinate in the hunks.

## Hallucinations / overclaim

None. The `|| 'js-throw'` moved-target labels are caveated, and
`hidden-proxy show` on Valkyrie-94151 confirms `error: null`, owner null,
kind=screen at step 44 — the ownerless-row artifact, not a throw.

Observation (pre-existing, not this SHA): `wincap2-tty-bits.test.mjs` has 3
failing subtests on HEAD — but the identical 3 fail on the parent tree
(verified via clean worktrees at `14a653284` and `4ecf787ca`), so SHA8
neither caused nor fixed them. Left for a port iter to triage; not a
C-wrong of this SHA.

## Density

Cliff commit, one writer function restarted whole in C order (restart beats
patching — correct per playbook), own head per its HEAD queue. Movement is
0 PASS + 3 strictly-later — legitimate PROGRESS for a `--More--`-chain fix
whose residuals are ownerless one step later. Ledger: options.c row updated
(D-3623).

## Verification

Re-measured: `hidden-proxy.mjs verify optfn_boolean --base 4ecf787ca~1
--reach-all` → `0 PASS, 3 moved past, 0 unchanged, 0 worse → PROGRESS`
(23→24, 73→74, 43→44, exactly as claimed); smoke reach 24/24 → REACH-OK.
Exact match. New test: 4/4; whatis test: file PASS.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
