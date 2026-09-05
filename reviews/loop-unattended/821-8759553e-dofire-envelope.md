# Review 821 — 8759553e — dothrow.c dofire empty-quiver NEED_MORE + full envelope (D-1851)

## Metadata

- Full / short hash: `8759553eeedca562b35904d6816354929a60875d` / `8759553e`
- Parent: `46021314` (D-1850). Map-driven Open: 2 corpus blocked at `dofire` (`dothrow.c:527` empty-quiver `You()` vs fire-getobj).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-05 10:49:38 +0200
- D-id: **D-1851**
- Stats: `js/dothrow.js` +235/−~90 / `js/apply.js` 2 one-word exports. `js/` insertions **~240**. Band **80–350** (near top; justified below).
- Claims to close: 2 corpus `dofire` blocks; full `dofire` envelope (throw-and-return, pole/whip/swap, autoquiver, `in_doagain`, fireassist, `throw_obj(shotlimit)`). Claims 2 corpus PASS, skips full `sessions` (no shared file changed).
- JS / map: `dofire` / `autoquiver` / `find_launcher` / `ok_to_throw` / `use_pole` / `use_whip`. `c-js-map/turns.md`.

## Intent vs deliverable

Git subject promises: drop the pre-doquiver `mark_topline_seen` (D-0484 revert) so `You()` leaves NEED_MORE; port C order throw-and-return → empty-quiver pole/whip/swap/`You()` → autoquiver → `in_doagain=0` → doquiver → fireassist (`could_pole_mon` / launcher swap / `find_launcher` canned wield) → `throw_obj(shotlimit)`; export `use_pole`/`use_whip` via dynamic import.

`node scripts/csym.mjs dofire` → `dothrow.c:468–586`. The diff **does** the whole envelope: new `autoquiver` (`:381–441`), `find_launcher` (`:447–465`), rewritten `dofire` (`:469–586`), `ok_to_throw(shotlimit_p)` (`:297–300`), plus `dothrow` passing `shot.n`. Nothing unrelated glued.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `dofire` | LIVE rewritten | `:469–586` arm-for-arm (below) |
| `autoquiver` | LIVE new (local, 1st) | `:381–441` |
| `find_launcher` | LIVE new (local, 1st) | `:447–465` |
| `ok_to_throw(shotlimit_p)` | LIVE extended | `:299–300` clamp + `multi=0` |
| `use_pole` / `use_whip` | LIVE re-point | one-word exports `apply.js:3825/:3365` |
| `ecmd_took_time` | helper (new, local) | `(res & ECMD_TIME) ? 1 : 0` — the 0/1 lens `cmd.js f` needs |
| `uslinging` / `throwing_weapon` / `cmdq_add_ec` | pre-existing locals | reused, not new clones |
| `ok_to_throw` `check_capacity((char *)0)`, getdir-in-caller, D-0485 mark-after-ready, `cmd.js f` 0/1 | OMIT/Named | in this commit |

`node scripts/sym.mjs` (re-pointed/new-import names):

```
use_pole         js/apply.js:3825   ASYNC — await required
use_whip         js/apply.js:3365   ASYNC — await required
prinv            js/invent.js:5659   ASYNC — await required
cmdq_add_key     js/invent.js:6488   sync
throw_obj        js/dothrow.js:884   ASYNC — await required
dowield          js/wield.js:563   ASYNC — await required
```

No deleted export, no clone #2. `apply.js` already top-level-imports `dothrow.js:78`, so the dynamic `await import('./apply.js')` (established pattern, 25 sites in apply.js alone) correctly avoids a new static edge; no `--can` claim made.

FORCE/DIAG/`getRngLog`/`fastforward`/coords in diff: **none**. No RNG added (C arms have none). Rule #2: clean.

## C ↔ JS fidelity

**Gate.** C `:498` `!ok_to_throw(&shotlimit)` → `ECMD_OK`. JS → `0` ✓. `uwep_Throw_and_Return` decl (AutoReturn + Mjollnir STR gate) ✓; `(!obj \|\| is_ammo(obj))` → wielded weapon + skip ✓.

**Empty quiver.** C order pole → bullwhip → fireassist-swap (canned swap+fire, `return ECMD_OK`) → `You("have no ammunition readied.")`; autoquiver arm with `prinv("You ready:")` unmask/remask vs `You("have nothing appropriate…")`. JS matches arm-for-arm, including the swap-retry `return 0`. The D-0484 `mark_topline_seen` before doquiver is **deleted** as promised — `pline You()` leaves NEED_MORE so `doquiver_core`→`getobj_ready`→`more()` like C `getobj`/`yn_function`. That deletion is the corpus fix, not a regression.

**doquiver.** C `:545–551` `in_doagain=0`, `res=doquiver_core`, non-OK/TIME → `return res`. JS returns `ecmd_took_time(res)` instead of raw `res` — faithful through the 0/1 lens (`ECMD_OK=0/TIME=1/CANCEL=2`: cancel→0 no-time ✓). `if (obj) mark_topline_seen()` keeps D-0485 ✓ named.

**fireassist.** C `:556–575` guard `uquiver && is_ammo && fireassist && !skip` + three arms (pole/could_pole, wielded-launcher, swap-retry `return res`, find_launcher canned wield `return res`). JS mirrors all four including the `pushweapon` guard. Returns pass through `ecmd_took_time` (TIME→1) ✓ same lens.

**Tail.** C `:582–585` `throw_obj(obj, shotlimit) : ECMD_CANCEL`, `(res==TIME) ? res : altres`. JS: `!obj` → TIME?1:0 (CANCEL≡no-time ✓); else `throw_obj(obj, shotlimit)` wrapped in the same TIME override ✓. `dothrow` now threads `shot.n` into `throw_obj(obj, n)` (C `:375`), fixing the previously hardcoded `0` — multishot clamp `:236–246` now sees real limits.

**`autoquiver` / `find_launcher`.** Rock/flint/glass → sling-vs-altammo-vs-first-omisc; gem skip; ammo→oammo/altammo/**last**-omisc overwrite; missile; dagger-first/AKLYS-continue/weapon-misc; priority oammo>omissile>altammo>omisc — all match `:381–441`. `find_launcher` cursed-known skip + known-BUC preference matches `:447–465` verbatim.

**Callee closure.** Whole `dofire` envelope in one commit; every callee LIVE or pre-existing local. No STUB in a live arm.

## Hallucinations / overclaim

None. "Match C" covers dispatch **and** callees here. Skipping full `sessions` is justified on the record (only `dothrow.js`/`apply.js` function bodies changed; green+strict+cohort 7/7 run) — and this audit's cadence re-runs full `sessions` anyway.

## Density

§2b: one C function + its static callees (`autoquiver`, `find_launcher`) + the shared gate fix. ~240 insertions for a 119-line C function with two 60/20-line callees is proportionate, not padded.

## Verification

This audit: `node scripts/hidden-proxy.mjs verify dofire --base 8759553e~1` → `2 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS` (`random-seed0200-monk-north-search-d169ccc2` PASS; `random-seed1500-rogue-explore-move-2a788f95` PASS). Exactly the D-log claim; baseline had 2 blocked, both accounted.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
