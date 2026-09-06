# Review 919 — 80d833fb — steed.c exercise_steed riding-skill training singleton (D-1949)

## Metadata

- SHA: `80d833fb` (D-1949). JS: `js/steed.js` +19/−2 (new sync export `exercise_steed`), `js/cmd.js` +4 (domove wiring).
- Subject promises: C-order port, `|0` for unset `urideturns`, wired at hack.c:2883, `use_skill` import extension, probe, pre-existing TDZ note.
- Prior reviews closed: none.

## Intent vs deliverable

Promise matches diff. No DIAG/FORCE/seed gates. Rule #2 clean.

## Inventory

| Symbol | Class |
|---|---|
| `exercise_steed()` | new export; ports C `steed.c:386–398` |
| `use_skill` (weapon.js:1189, sync), `P_RIDING` (already imported) | LIVE; call is sync-correct |

## C ↔ JS fidelity

Body against `steed.c:386–398`: `!u.usteed` early return, `++urideturns >= 100` → reset + `use_skill(P_RIDING, 1)` ≡ JS (pre-increment folded into assignment; `|0` reproduces C decl zero-init on saves that never set the field — verified claim, no behavior change where C has the field). Call site verified in C (`hack.c:2879–2883`, read verbatim): tentative `u.ux += u.dx` / `u.uy += u.dy`, `m_postmove_effect`, then `if (u.usteed)` { mx/my set; `exercise_steed(); /* train riding skill */` } — JS domove wiring sits exactly there (after mx/my set, before the safemon-swap arm) with the C citation, including the C `[if move attempt ends up being blocked, should training count?]` comment carried over. No RNG in C; none added.
- `sym.mjs`: `use_skill` weapon.js:1189 sync — the extended `P_SKILL, use_skill` import reuses the existing steed.js→weapon.js edge (no new module edge for the callee); `P_RIDING` was already imported (steed.js:33). The `cmd.js → steed.js` static edge is new but follows the do.js/dog.js/dogmove.js/dokick.js precedent; `exercise_steed()` is sync-called, correct since both it and `use_skill` are sync.
- The `| 0` idiom interacts correctly with the threshold: `urideturns` 98→99 (no train), 99→0 + train (D-log probe) — exactly C's `++ >= 100` boundary. Fresh-save `undefined | 0 = 0` then +1 = 1, matching a fresh C game (decl zero-init, first riding turn → 1).
- spell.js:1099 `use_skill` clone noted in passing — pre-existing drift in another file, untouched here; this commit imports the export, the correct direction.

## Hallucinations / overclaim

None. The steed.js-first standalone-import TDZ note is honest (verified pre-existing on stashed HEAD, no code changed for it). Vacuous hidden note explicit.

## Cited ranges (tool-pinned)

- C body in full (`steed.c:386–398`, via `csym.mjs`):
  `if (!u.usteed) return;`
  `if (++u.urideturns >= 100) { u.urideturns = 0;`
  `use_skill(P_RIDING, 1); } return;`
- C site (`hack.c:2879–2883`): tentative move, `m_postmove_effect`,
  `if (u.usteed)` { mx/my set; `exercise_steed();` }.
- JS: `exercise_steed` steed.js:425–437 (before `maybewakesteed`);
  wiring cmd.js domove (~3344); `P_RIDING` import steed.js:33.
- D-log probe (inline, no file): no-usteed no-op; 98→99 no train;
  99→0 with skill advance 0→1 — the exact C boundary.

## Density

Right-sized §2b: one 13-line C function + its single call site.

## Verification

- `hidden-proxy verify exercise_steed --base 80d833fb~1`: 0 blocked at baseline and now — matches D-log.
- `cmd.js → steed.js` static edge follows existing precedent edges; call is runtime-only. Callee closure: all LIVE. (spell.js `use_skill` clone is pre-existing drift elsewhere; this commit imports the export — correct.)

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
