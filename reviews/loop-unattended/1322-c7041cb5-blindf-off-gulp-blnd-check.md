# Review 1322 — c7041cb5 — do_wear.c Blindf_off residual arms + mhitu.c gulp_blnd_check live (D-2356)

Metadata: SHA `c7041cb5`, D-2356, debt-named row (0 sessions
blocked on Blindf_on/Blindf_off/gulp_blnd_check). Method:
full `js/` hunks read (3 files, +50/−12); C
`gulp_blnd_check` (`nethack-c/upstream/src/mhitu.c:1272-1285`
via `csym.mjs`, full body) + C `Blindf_off`
(`do_wear.c:1494-1534`, full body) + C `Blinded` macro
(`youprop.h:92`: `(HBlinded && !BBlinded)`); C callers of
`gulp_blnd_check` (3: `apply.c:178` use_towel, `do.c:2376`
wipeoff, `do_wear.c:1526`); `sym.mjs` on `gulp_blnd_check` /
`attacktype_fordmg` / `can_blnd` / `impossible` (pasted
below); added-line banned grep (0 hits); `imports.mjs
--rulecheck` (clean, re-run) + `--can` on both new edges
(ALREADY — no new edge); `hidden-proxy verify Blindf_off
--base c7041cb5~1` re-run. Deleted symbol: the `return false`
`gulp_blnd_check` stub in `js/do.js` → re-pointed at the
`mhitu.js` export; `sym.mjs` output pasted (export async,
awaited at both call sites).

## Intent vs deliverable

Subject promises four latent C-wrongs: missing `impossible`
defensive arm, missing takeoff.mask clear, constant `W_TOOL`
instead of `otmp->owornmask`, and an unconditional see-again
path where C gates on `gulp_blnd_check()` (whose helper was a
`return false` stub). Diff delivers all four plus the real
helper in C conjunct order, no new modules. Promise kept.

## Inventory

- `js/mhitu.js`: new exported async `gulp_blnd_check`
  (`:1781`) next to `gulpmu`; `attacktype_fordmg`/`can_blnd`
  join the existing `uhitm.js` edge; `AT_ENGL` already
  imported, `AD_BLND` file-local.
- `js/do.js`: stub deleted; `gulp_blnd_check` joins the
  existing `mhitu.js` import; `wipeoff` awaits it; `dowipe`
  doc drops the stale omit.
- `js/do_wear.js`: `gulp_blnd_check` on a new `mhitu.js`
  import; `Blindf_off` awaits `impossible`, clears
  `takeoff.mask & ~W_TOOL`, passes `otmp.owornmask`, gates
  see-again on the gulp check. `Blindf_on` untouched.
- Named: `use_towel` `apply.c:178` gulp arm (own follow-up
  row); `steal.js` raw `setworn(null, W_TOOL)` (pre-existing
  `steal.c:269` omit).

## C ↔ JS fidelity

Branch-by-branch confirm. (1) Helper: C `!Blinded &&
u.uswallow && (mattk = attacktype_fordmg(ustuck->data,
AT_ENGL, AD_BLND)) && can_blnd(ustuck, &youmonst,
mattk->aatyp, NULL)` then `++uswldtim`, `gulpmu`, TRUE — JS
same conjuncts in order; `blinded` ≡ `HBlinded && !BBlinded`
matches the pinned macro exactly (no EBlinded arm — the code
comment is right); `?.` on `ustuck` only softens a C
deref that `uswallow` already guards (undefined → falsy
callee result → false, same outcome); `++u.uswldtim`
pre-`gulpmu` ✓; both sync callees LIVE (`uhitm.js:517/285`),
`gulpmu` awaited ✓. Import, not a 5th clone, despite the 4
local `attacktype_fordmg` clones elsewhere ✓. (2)
`Blindf_off`: C `:1503-1506` impossible-then-return — JS
awaits ASYNC live `impossible` (`display.js:7531`) ✓; C
`:1507` unconditional `takeoff.mask &= ~W_TOOL` — JS guards
only on `game.context?.takeoff` existing (crash guard, same
effect where defined) ✓; `setworn(null, otmp.owornmask)` ≡ C
✓; C `:1526` see-again gated on `!gulp_blnd_check()` — JS
`if (!(await gulp_blnd_check()))` ✓. Untouched `if (Blind)`
arm out of diff scope. (3) `wipeoff`: matches C `do.c:2376`
`if (!gulp_blnd_check())` ✓. Callee closure: 2 of 3 C
callers now live; the third (`use_towel`) is named, own row.

## Hallucinations / overclaim

None. Subject never claims full `use_towel` coverage and
names it as the follow-up. The `--can` caveat in the message
("TDZ-safe … no top-level reads") verified: both edges
ALREADY existed, so no new cycle surface at all.

## Density

Right-sized: one helper + its two in-scope callers, one
tight cluster. Full `44/44` run justified by the shared-file
touch.

## Verification

D-log honest (vacuous stated as vacuous; full suite run for
the shared change). Re-run `--base c7041cb5~1`: "0
session(s) blocked (0 at baseline, 0 working)" — matches.
`/tmp` probe deleted after run, nothing in tree.

```
gulp_blnd_check  js/mhitu.js:1781   ASYNC — await required
attacktype_fordmg js/uhitm.js:517   sync (+4 local clones elsewhere; this use imports the export)
can_blnd         js/uhitm.js:285   sync
impossible       js/display.js:7531   ASYNC — await required
ALREADY: do_wear.js already statically imports mhitu.js. No new edge needed.
ALREADY: do.js already statically imports mhitu.js. No new edge needed.
```

## Actionable C-wrongs

None. Conjuncts, order, and macro all verified; residuals
are named omits with owners.

Verdict: **ACCEPT**
