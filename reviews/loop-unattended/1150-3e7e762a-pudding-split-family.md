# Review 1150 — 3e7e762a — pudding-split family (D-2184)

Metadata: SHA `3e7e762a`, js/ +75/−~15 across `uhitm.js`
(splitmon block + passive_obj async/AD_CORR), `mhitu.js`
(fission wiring), `sit.js` (heat reason), `dothrow.js` (5th
await). D-log D-2184. Subject promises: splitmon + mold
fission + AD_CORR erode — 2 collect_coords sessions PASS,
1 re-homed.

Intent vs deliverable: promise matches diff. Actually adds:
the `hmon_hitmon_splitmon` guard block, the fission call, the
`s_suffix` reason, live AD_CORR erode + async ripple. One
C family (pudding/mold split + hitting-weapon erosion).

Inventory: no new/deleted functions (`passive_obj` sync→async
with all 5 call sites awaited — verified by grep: 4× uhitm
passive arms + dothrow thitmonst, no stragglers). New static
imports (`clone_mon`, `s_suffix`, `ERODE_CORRODE`,
`EF_GREASE`, `NO_TRAP_FLAGS`) + two dynamic trap.js imports
(file convention). `sym.mjs`: `clone_mon` makemon.js:3371
async, `erode_obj` trap.js:3816 async, `mintrap` trap.js:4759
async, `s_suffix` do_name.js:383 sync, `is_pole/is_ammo/
is_missile` wield.js sync LIVE. `is_ammo`/`yname` have
pre-existing local clones elsewhere — this commit adds none
(it uses the wield.js `is_ammo` import line :43 and the
uhitm-local `yname`). No deleted symbols.

**C ↔ JS fidelity**: confirm, three loci read at HEAD.

- Splitmon guards (`uhitm.c:1603–1634`): pudding pair, mhp>1,
  !mcan, obj==uwep||(twoweap&&uswapwep), IRON/METAL,
  !(ammo||missile) — all verbatim. `!offmap` ↔ `(mx|0)!==0`:
  exact, because C sets `offmap=TRUE` exactly at `mx == 0`
  (`:1851–1862`, joust/mhurtle path). `hand_to_hand`
  (`:1780–1782`, MELEE or APPLIED+pole(uwep)) ↔ JS identical
  including `is_pole(game.u?.uwep)`. IRON=11/METAL=12 verified
  against `objclass.h:24–25`. Placement after pet / before
  msg_hit matches C `:1866–1870`. Message
  (`Monnam divides…with yname`, hittxt, `mintrap(mclone,
  NO_TRAP_FLAGS)`) verbatim.
- Fission (`mhitu.c:2570–2574`): JS keeps the full gate
  (mh/mhmax update + `(mlevel+1)*8` compare) — the call it
  replaces was a deferred comment, and the surrounding arms
  are untouched.
- Heat reason (`potion.c:2880–2884`): youmonst→`the_your[1]`
  ("your") else `s_suffix(mon_nam)` — JS identical.
- AD_CORR (`uhitm.c:6174–6178`): `erode_obj(obj, 0,
  ERODE_CORRODE, EF_GREASE)` under `!mcan` — exact, args
  included. AD_RUST stays a gated no-op comment (pre-existing
  defer, named below).
- Observation (not actionable): the twoweap suffix uses the
  pre-existing uhitm-local `yname` (`carried?"your":"the"` +
  cxname) while C `objnam.c:2358–2374` routes through
  `shk_your` with pname/artifact conditions. On this path obj
  is always the wielded weapon (carried → "your" both sides
  for ordinary weapons); residual divergence needs an early
  artifact with pname naming in a verbose twoweap split —
  no corpus session shows it, and the clone predates this
  commit and serves dozens of messages. Global yname repair
  is its own iteration, not this SHA's Must-fix.

RNG: split/fission/erode draw nothing on these paths (clone,
pline, mintrap dice live downstream of the fixed divergence);
Knight mid-state confirmed RNG-match + screen-only before the
erode wiring closed it.

Hallucinations / overclaim: none. Tourist-92100 explicitly
excluded ("writer NOT this cluster") and re-homed to the live
`mv_bubble` Open row — correct, not a silent drop.

Density: ~75 insertions across one caller/callee cluster
(uhitm+mhitu+sit share the split path) — in-envelope for a
combined-arm port whose every callee is LIVE.

Verification: D-log cites `verify.mjs --fn collect_coords` →
2 PASS + 44/44 full. Re-measured independently:
`hidden-proxy.mjs verify collect_coords --base 3e7e762a~1` →
baseline 3 blocked, `2 PASS, 0 moved, 1 unchanged, 0 worse →
PROGRESS` (92185/92169 PASS; 92100 still @131). Exact match —
and the "unchanged" (not "moved") status for 92100 is
consistent with the re-home claim. `rulecheck` clean (re-ran
this iter). No DIAG/FORCE/seed gates.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
