# Review 1657 — eb298d17 — `cmd.c` domouseaction + dotoggleoption whole bodies (D-2698)

Metadata: commit `eb298d17`, D-2698, `js/cmd.js` (+136) + `js/mklev.js` (+12) + `js/options.js` (+31) + `js/getline.js` (+13). Pops the `wearsot` row as Stale (brief: body complete at `js/worn.js:356`, 0 blocked) and ships this same-file pair instead. No prior review claimed closed.

## Intent vs deliverable

Subject promises: whole C bodies of `domouseaction` + `dotoggleoption`. Diff actually adds both bodies plus two callee ports (`On_stairs_up/dn`, `toggle_bool_option`), the `#toggle` EXT_CMDS runner, live imports (`dosit`, `m_at`, `test_move`, `TEST_MOVE`, `toggle_bool_option`, `On_stairs_*`), and the `gc.cmd_bind` stamp. Promise matches deliverable; callees live, not stubbed.

## Inventory

New JS functions: `domouseaction` (async, exported), `dotoggleoption` (async, exported), `On_stairs_up/dn` (sync, exported), `toggle_bool_option` (async, exported). No deleted/re-pointed symbols — `sym.mjs` run on all five (outputs: `toggle_bool_option js/options.js:4032 ASYNC`, `On_stairs_up js/mklev.js:395 sync`, `dosit`/`m_at`/`objects_at`/`Is_container`/`test_move` all live exports). `move_funcs_walk` is pre-existing (3 refs at parent), reused, not added.

## C ↔ JS fidelity

`domouseaction` C `cmd.c:4915–5006` (csym, 92 L, whole body read) vs JS arm-by-arm: travel near-clamp `:4927–4928` ✓; far travel stamp (`travelcc`/`tx`/`ty`, `dotravel_target`, ECMD_OK) ✓; here-arms fountain/sink→dodrink, throne→dosit, stairs up/dn, `vobj_at`→container?doloot:dopickup, else donull ✓; directional `xytodir`, `!m_at && !test_move(TEST_MOVE)` ✓ (JS awaits: `test_move` is async at `js/hack.js:349`); kick-locked / open-closed / search `typ<=SCORR` / `move_funcs[dir][MV_WALK]` ✓; sloppy-click quantize `:4984–4993` ✓; self-click→donull ✓; tail walk ✓. `flags.travelcmd` → `game.flags?.travel`: tree-wide stand-in (`js/options.js:2886` maps `travelcmd→travel`, documented at `:2800`). Confirm, not a C-wrong. `move_funcs_walk` order (W/NW/N/NE/E/SE/S/SW) matches C's MV_WALK column row-for-row (`cmd.c:2070–2078` table read: each row's first element). Confirm.

`dotoggleoption` C `cmd.c:1373–1384` (csym, 12 L): bind&&param → toggle, else pline + ECMD_OK. Exact. Stamp site matches C `:3679` (`gc.cmd_bind = cmdbind_get(...)` ↔ `tlist = cmdbind_get(key)` + stamp on the next line).

`On_stairs_up` C `stairs.c:161–167` (csym, 7 L): exact (`stway && stway->up`; dn mirrors). `toggle_bool_option` C `options.c:9277–9297` (csym, 21 L): prefix match `strlen(p)`, BoolOpt/set_in_game/addr gates, `!`-negation via the in-file `simple_bool_value` reader, `parseoptions(buf,FALSE,FALSE)`, no-break loop with per-match visual reset, ECMD_FAIL→OK. Confirm. Async-only-because-visuals is disclosed.

## Callee closure

Per-arm callee census for `domouseaction` (every name the body touches):

| JS callee | `sym.mjs` resolution | Class |
|---|---|---|
| `m_at` | `js/mon.js:1714 sync` (4 pre-existing local clones elsewhere — this diff imports the export) | LIVE |
| `test_move` | `js/hack.js:349 ASYNC` (awaited, short-circuit kept) | LIVE |
| `TEST_MOVE` | `js/const.js` const | LIVE |
| `objects_at` (for C `vobj_at`, display.h:22) | `js/mkobj.js:3088 sync` | LIVE |
| `Is_container` | `js/const.js:3193 sync` (1 pre-existing clone in mkobj — untouched) | LIVE |
| `On_stairs_up/dn` | `js/mklev.js:395 sync` (new this commit, exact vs `stairs.c:161–175`) | LIVE |
| `move_funcs_walk` | pre-existing same-file const (3 refs at parent; order verified vs C `:2070–2078` rows above) | verified CLONE |
| `xytodir`, `cmdq_add_ec`, `dodrink/dosit/doup/dodown/doloot/dopickup/donull/dokick/doopen/dosearch/dotravel_target` | pre-existing live imports / same-file | LIVE |
| `dosit` | `js/sit.js:1146 ASYNC` — only ever queued via `cmdq_add_ec`, never awaited; no sync violation | LIVE |
| `toggle_bool_option` | `js/options.js:4032 ASYNC` (async only because in-file `reset_needed_visuals` awaits docrt; disclosed) | LIVE |

Required `sym.mjs` outputs pasted verbatim:

```text
toggle_bool_option js/options.js:4032   ASYNC — await required
On_stairs_up     js/mklev.js:395   sync
dosit            js/sit.js:1146   ASYNC — await required
m_at             js/mon.js:1714   sync
objects_at       js/mkobj.js:3088   sync
Is_container     js/const.js:3193   sync
test_move        js/hack.js:349   ASYNC — await required
```

No symbol deleted or re-pointed by this diff (all imports are additions).
No STUB in any live arm. Named omits in-commit: `bind_mousebtn` :2624
(dispatch stays inert while `mousebtn` undefined — pre-existing),
CMD_PARAM bind params (`dokeylist` "no bound params in default binds" —
pre-existing; the `cmd_bind->param` arm is live code waiting on it),
`optfn_boolean` flip (`options.c:5191`, every allopt `optfn` null —
pre-existing; `toggle_bool_option` routes to `parseoptions` per C and
returns ECMD_FAIL until it lands — disclosed end-to-end gap, owned by a
future row). The `cmd_bind` stamp matches C `:3679`
(`gc.cmd_bind = cmdbind_get(key & 0xFF)` ↔ `tlist = cmdbind_get(key)` +
stamp on the next line, diff-verified).

## Hallucinations / overclaim

None. "Whole C bodies" is earned — no arm deferred, stubs named, vacuous verifies disclosed as normal-for-coverage.

## Density

Breadth phase: two whole C functions + two callee ports, ~192 JS lines over 4 already-coupled modules. Right-sized per §2b.

## Verification

Re-ran both: `verify domouseaction --base eb298d17~1 --reach-all` → 0 blocked vacuous + smoke 24/24 REACH-OK; `verify dotoggleoption` → identical transcripts:

```text
verify domouseaction: baseline eb298d17~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke domouseaction: no RNG-tagged reach; fixed smoke spread (24 run, 24 PASS, 0 regressed → REACH-OK
verify dotoggleoption: baseline eb298d17~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke dotoggleoption: no RNG-tagged reach; fixed smoke spread (24 run, 24 PASS, 0 regressed → REACH-OK
```

Both summary lines cited per fn; both match the D-log. No REGRESSED. Diff grep: no FORCE/DIAG/seed/fastforward/coords. Global rulecheck clean. Throwaway probe stays in /tmp, uncommitted. Full 44/44 + green + cohort taken from the D-log (nothing names these fns as owner, so reach + gates carry the weight).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
