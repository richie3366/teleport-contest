# Review 1287 — 95c162ad — dig.c zap_dig pitdig branch: adj_pit_checks + pit_flow (D-2321)

Metadata: SHA `95c162ad`, D-2321, Open queue head (row cited 0 blocks). Method: `git show` full `js/` hunk (`js/dig.js` +188/−12); C `zap_dig dig.c:1547-1754` (pitdig setup `:1617-1623`, arm `:1628-1662`, tail `:1742-1750`), `adj_pit_checks dig.c:1762-1838`, `pit_flow dig.c:1843-1882` (all via `csym.mjs` full bodies); `sym.mjs` on all 12 pitdig callees; `imports.mjs --can` ×3 + `--rulecheck`; added-lines banned-pattern grep (0 hits); `hidden-proxy verify adj_pit_checks --base 95c162ad~1` re-run.

## Intent vs deliverable

Subject promises: pit-trapped dig beam digs the adjacent cell (adj_pit_checks gate → dighole → conjoin bits → pit_flow tail) instead of `break`-ing out. Diff delivers exactly that: exported `adj_pit_checks`, exported async `pit_flow`, setup + arm + tail in `zap_dig`, docstring omit retired. Promise kept.

## Inventory

- `adj_pit_checks(cc, msg)` with `{v:''}` out-param (C `char *msg`, caller `pline1(buf)`).
- `pit_flow(trap, filltyp)` async, by-value `{tx,ty,conjoined}` copy, `liquid_flow` + conjoined recursion, `#if 0` back-check omitted with comment.
- `zap_dig`: pitdig setup (`t_at` hero cell + `xytodir`), full adjacent-pit arm (was bare `break`), pitflow tail (was `// pit_flow deferred`).
- Import joins only, all ALREADY (verified): `s_suffix` (do_name.js), `On_ladder` (mklev.js), `DBWALL`/`xdir`/`ydir`/`N_DIRS` (const.js).

## C ↔ JS fidelity

`adj_pit_checks` vs C `:1762-1838`, arm-for-arm: null/isok gates leave msg untouched ✓; `*msg='\0'` after isok ✓; `ltyp` saved then `flags=0` ✓; pool/lava FALSE-empty ✓; closed_door/SDOOR + IS_WALL foundation ✓; TREE roots ✓; STONE/SCORR nondiggable-only rock-glows (diggable falls through to TRUE) ✓; IRONBARS/SINK/On_ladder messages ✓; supporting chain (fountain/throne/altar/stairs/DRAWBRIDGE_DOWN||DBWALL via `s_suffix`) ✓; final TRUE ✓. The C `#if 0` lava/ice/pool/grave block is compiled-out dead code — omission exact.

`pit_flow` vs C `:1843-1882`: gate, whole-struct copy (JS copies only the three fields C ever reads post-copy — equivalent), `typ/flags` set, `liquid_flow(t.tx,t.ty,filltyp,trap, u_at?…:null)` passing the live pointer (not the copy) ✓, N_DIRS conjoined recursion ✓. Same-file `liquid_flow(x,y,typ,ttmp,fillmsg)` signature matches the call ✓.

`zap_dig` arm vs C: setup predicate/order ✓; `diridx!=DIR_ERR && !conjoined_pits(…,false)` ✓; vestigial `digdepth=0` kept, `nhUse` dropped (no-op macro — named, exact); checks-fail→`pline(buf)` / pass→`dighole(TRUE,TRUE)` + re-read ✓; conjoin-bit pair with `DIR_180` ✓; pool/lava previous-cell flow ✓; `break` nested inside the inner `if` exactly as C (conjoined case falls through to `zx+=dx` both sides) ✓. Tail `pitflow && isok → t_at → is_pit → fillholetyp(tx,ty,TRUE) → filltyp!=ROOM → pit_flow` ✓.

Callee closure: `s_suffix`/`On_ladder`/`liquid_flow`(async awaited)/`dighole`(async awaited)/`conjoined_pits`/`fillholetyp`/`is_pit`(canonical const.js, not the mklev clone)/`xytodir`/`is_pool`/`is_lava`/`u_at` all LIVE. `closed_door` resolves to the file-local clone (`dig.js:174`) — verified matched to C here (`IS_DOOR && doormask&(D_LOCKED|D_CLOSED)` ≡ `monmove.c:2180-2185`; `|` order irrelevant), so CLONE-verified, not a C-wrong. No STUB in a live arm. Named omits (swallowed pierce = the live next Open row; nhUse; `#if 0`) each name an owner.

RNG walk: no `rn2/rnd/rn1/d` in any added line; `dighole`/`liquid_flow` draws fire in C order through live callees.

Two fine points checked: (1) `diridx` init `8` + `xytodir` + `!== DIR_ERR` is self-consistent on each side — `diridx` is always overwritten by `xytodir` before any read (both sides), so the sentinel's numeric value cannot diverge behavior. (2) `s_suffix` in `dig.js` is import-only (`js/dig.js:51`, used `:1141`) — the commit adds no seventh local clone despite the six pre-existing ones elsewhere, so the D-1849 clone warning does not fire here. `nhUse(digdepth)` is absent from the new tree while `digdepth = 0` is kept — exact, since `nhUse` is a compile-time no-op macro and the `break` makes the store dead on both sides.

The D-log's 14/14 probe detail (incl. the exact `The fountain's supporting structures remain intact.` string) cross-checks against C's `Sprintf("The %s supporting structures remain intact.", s_suffix(...))` — template-literal operand order matches the format string.

## Hallucinations / overclaim

None. Vacuous-explicit hidden note ×3 functions, no `--base` owed (row cited 0 — confirmed by this review's re-run), probe honesty (kept-in-/tmp 14/14, disclosed as deleted-or-kept scratch, not a committed test).

## Density

~188 insertions against ~172 C lines across three loci in one branch family — one envelope, one falsifier. At the §2b ceiling's sweet spot. Good.

## Verification

D-log: preflight clean-tree PASS, all three `verify --fn` tails PASS (syntax/rule2/green 2/2/strict ×2/cohort 7/7) after the last `js/` edit with no D-1831 gap. Re-measured by this review:

```text
verify adj_pit_checks: baseline 95c162ad~1 (scoreboard at 775e5959) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
```

Matches. Added-lines grep: 0 banned-pattern hits. `imports.mjs --rulecheck`: clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
