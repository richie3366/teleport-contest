# Review 1997 — d4eca01f7 — decl.c decl_globals_init + validate stale (D-3037)

Metadata: SHA `d4eca01f7` (D-3037). New `js/decl.js` with one
exported reset function, wired into `NethackGame.start()`
in C order, + `validate` stale-retire (no JS). Subject
promises the whole `decl.c:1080–1187` body with the
unmodeled namespaces and MAGICCHECKs named.

## Intent vs deliverable

Promise: `decl_globals_init()` resetting all modeled `g*`
(16) + `svi`/`svc`, fresh flags/iflags/disp/u (+17 worn
NULLs), ubirthday/urealtime zeros, `WIN_* = WIN_ERR`;
caller order matches C `early_init :40–43`. Diff adds
exactly that (new 124-line file + 2-line wiring). Kept.

## Inventory

- `decl_globals_init` (js/decl.js:82, exported sync):
  whole C body, new.
- `reset_instance_globals` / `reset_saved_globals`
  (file-local): arm groups, new.
- `jsmain.js start()` wiring: 1 import + 1 call.
- `validate`: ledger stale-retire only.
- No deleted symbols.

## C ↔ JS fidelity

### decl_globals_init — verdict: exact-C, ACCEPT

C (`decl.c:1079–1187`, csym range) walked whole, arm by
arm:

- `#if 0 g = g_init` dead — correctly skipped.
- 26 `g_init_*` assigns: 16 modeled namespaces reset to
  fresh `{}` (ga,gb,gc,gd,gf,gg,gh,gi,gm,gn,go,gp,gr,gs,
  gu,gw — cites `:1085–1107` match C line-for-line); the
  other 10 (ge,gj,gk,gl,gq,gt,gv,gx,gy,gz) named with the
  verified claim of no JS readers/writers (nothing to
  reset — creating tables no one reads would be dead
  state, not fidelity).
- 20 `init_sv*` assigns: `svi`/`svc` reset; 18 unmodeled
  named. Counts close (16+10=26, 2+18=20).
- `gv.valuables` wiring `:1132–1137` → split, verified
  live (`end.js:178 reset_valuables`, lazily ensured
  at :201).
- 26 `MAGICCHECK`s → named omit. Justified: they validate
  C static initializers at process start; a JS module
  literal either evaluates or throws at load — there is no
  re-checkable state.
- `gs.subrooms` freelist head → named (JS rooms are arrays
  + `nsubroom`; verified pattern, no freelist pointer).
- `ZERO(u)` + 17 worn NULLs: JS *replaces* `game.u` with
  exactly the 17 C NULLs (counted: 7+7+3 like C
  `:1179–1181`) — replacement ≡ zero-then-NULL. No other
  `u` field can survive, matching ZERO. Adjacent to
  `resetGame()` with nothing interleaved, so no state is
  lost between the two baselines.
- `ZERO(a11y)` deliberately skipped — verified load-bearing:
  `jsmain.js:159` creates the `msg_loc` default under
  `!g.a11y`; pre-creating `{}` here would suppress it.
  Correctly a named omit, not a miss.
- `WIN_* = WIN_ERR` ×4 ✓; `urole`/`urace` sentinels →
  split, verified live (`jsmain.js:214–215` placeholders).
- Sibling inits (`objects/monst_globals_init`, C `:41–42`)
  are separate C functions with their own rows — correctly
  not in this commit.

C-order caller: `allmain.c:40 decl_globals_init` …
`:43 sys_early_init` ≡ JS `resetGame →
decl_globals_init → sys_early_init`. New edges
(jsmain→decl, decl→gstate/const) are leaves; no cycle risk.

### validate (stale) — verdict: verified, ACCEPT

C (`version.c:839–856`): utdflags assembly + `uptodate`.
JS (`js/files.js:1370`, async on the JS NHFILE handle)
ports the flag arms with per-line cites; all four C
callers are unported load-save paths named in the map.
Stale-retire earned.

### Callee closure — verdict: ACCEPT

No C callees (pure assignment body). No stub, no clone.
Named list is complete against the body above.

## Hallucinations / overclaim

None. Every named omit was verified to exist where cited
(end.js:178/201, jsmain.js:159/214–215, roles.js copy per
D-log). The "C assigns unconditionally" framing is accurate
(struct copy per namespace, not merge).

## Density

One whole 109-line C function as a new module + wiring +
verified stale. Right-sized.

## Verification

Re-measured (`hidden-proxy.mjs verify decl_globals_init
--base d4eca01f7~1 --reach-all`):

```text
verify decl_globals_init: 0 session(s) blocked (vacuous, honest)
smoke decl_globals_init: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
```

Zero REGRESSED. Matches the pasted tail (incl. full
44/44 on the shared-file change).

## Actionable C-wrongs

None.

Ledger: `decl_globals_init` ported, REACH-OK via smoke.
Verify lines: hidden vacuous (honest) + smoke.

Verdict: **ACCEPT**
