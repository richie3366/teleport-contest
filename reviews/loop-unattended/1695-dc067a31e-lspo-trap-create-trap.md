# Review 1695 — dc067a31e — lspo_trap + create_trap whole bodies (D-2736)

Metadata: commit `dc067a31e`, D-2736, `js/mklev.js` only. Coverage row, 0 corpus blocks stated. No prior review claimed closed.

## Intent vs deliverable

Subject promises: `des.trap` binding + `create_trap` whole body with table, byname/opt helpers, dispatch, teledest and NO_TRAP arms, STAIRS/LADDER retry. The diff delivers all of it as same-file locals plus two exports. Promise matches deliverable.

## Inventory

Changed JS: new `LSPO_TRAPTYPES` table, file-local `lspo_traptype_byname`/`lspo_traptype_opt`, exported `create_trap` and `lspo_trap`. No import changes at all (`maketrap` already imported). No deleted symbols, no clones of exports.

## Callee closure

Required `sym.mjs` outputs pasted verbatim (sampled helpers):

```text
NO_TRAP          js/const.js:2518   sync   export const
create_des_coder NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mklev.js:2661
get_table_xy_or_coord NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mklev.js:21206
splev_opt_boolean NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mklev.js:992
```

Each helper is a single same-file local — the established lspo unpacked-opts pattern (cf. `lspo_exclusion`/`lspo_gas_cloud`), not export-duplication: no live export exists to import, one use site each, no drift. Zero new module edges. No STUB in any arm.

## C ↔ JS fidelity

C loci read: trap table `:4322–4347`, `get_table_traptype_opt :4350–4364`, `get_traptype_byname :4379–4389`, `create_trap :1812–1846`, `lspo_trap :4397–4470` — all read verbatim. Branch-by-branch:

- Table: all 24 name/type pairs in C order, verbatim (the `{0, NO_TRAP}` terminator correctly has no JS counterpart — the loop simply falls through to `NO_TRAP`).
- byname: case-insensitive scan, miss → NO_TRAP ✓ (`strcmpi` → lowercase compare, exact).
- opt: empty/missing → defval, non-match keeps defval, match overrides ✓ verbatim.
- create_trap: MAZEFLAG init ✓; VIBRATING_SQUARE via `pick_vibrasquare_location` + `maketrap(inv_pos)` + return ✓; croom arm ✓; DRY loop with `(STAIRS||LADDER) && ++trycnt<=100` kept verbatim ✓ and `trycnt>100` return ✓; three flags ✓; `mktrap(type, flags, NULL, tm)` ✓.
- lspo_trap: coder init + defaults ✓; string/pair/triple dispatch on argc+type (checkstring/checkinteger → throw = `luaL_` abort) ✓; table-or-empty via argc-0 `{}` ✓; xy-or-coord ✓; type-opt defval -1 ✓; booleans with C defaults incl. victim-negate ✓; launchfrom then teledest both writing launchplace (teledest wins) ✓; NO_TRAP → throw (= `nhl_error`) ✓; x=y=-1 → RANDOM via the unpacked -1 convention ✓; coder-croom passed ✓; launchplace reset ✓; return 0 ✓.
- Audited the one suspicious shape — the guarded reset (`if (lp)` vs C unconditional zero): observably equivalent, because every reader defaults an absent launchplace to zeros (`trap.js:786` `|| {x:0,y:0}`, `launchplace_state` creates it), and only table-form entries ever create it (resetting in the same call). Not a divergence.
- RNG: draws only inside `pick_vibrasquare_location`/location helpers in C positions; none added/reordered.

## Hallucinations / overclaim

None. No FORCE/DIAG/seed/coordinate logic. Named omits (Lua argc dispatch, `lcheck_param_table`, return counts, split-named `lspo_object`) are explicit.

## Density

Two whole C bodies + table, one module, zero new edges, full 44/44 claimed. Right-sized.

## Verification

Re-measured per-SHA re-run (`--base dc067a31e~1 --reach-all`) — both lines, matching the D-log:

```text
verify lspo_trap: baseline dc067a31e~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify lspo_trap: no corpus session is blocked on it at dc067a31e~1 — a vacuous verify is NOT a corpus PASS. [...]
smoke lspo_trap: no RNG-tagged reach; fixed smoke spread (24 run, 3.7s): 24 PASS, 0 regressed → REACH-OK
```

Vacuous note stated, not sold; smoke REACH-OK. Green/strict/cohort/full-44 per D-log. Rule #2 clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
