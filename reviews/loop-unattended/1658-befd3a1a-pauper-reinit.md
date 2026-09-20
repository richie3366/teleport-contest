# Review 1658 — befd3a1a — `u_init.c` pauper_reinit whole body (D-2699)

Metadata: commit `befd3a1a`, D-2699, `js/u_init.js` only (+65/−2). Pops the first Open-coverage row. No prior review claimed closed.

## Intent vs deliverable

Subject promises: whole C body of `pauper_reinit`. Diff actually adds a file-local `pauper_reinit()` plus import extensions (`P_UNSKILLED`/`P_NUM_SKILLS` from `const.js`, `P_SKILL` from `weapon.js`) and the caller line post-`skill_init`. Promise matches deliverable.

## Inventory

New JS: one file-local function, zero exports, zero deleted/re-pointed symbols (`sym.mjs` run on `P_SKILL` → live at `js/weapon.js:1272`; `knows_object` → pre-existing same-file local at `js/u_init.js:1173`, reused not cloned).

## Callee closure

```text
P_SKILL          js/weapon.js:1272   sync
knows_object     NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/u_init.js:1173
```

`P_SKILL` LIVE import (macro-expansion writes verified against
`skills.h:115–117`). `knows_object` pre-existing same-file local — reused,
not cloned; its pauper-guard gap is the named omit below, not a new STUB.
`otypByName` pre-existing; all 8 otyp values verified per the D-log
(SPE_HEALING 374, SPE_PROTECTION 403, SPE_FORCE_BOLT 376, TOUCHSTONE 472,
FLINT 473, SACK 217, FOOD_RATION 293, STRANGE_OBJECT 0). No symbol
deleted or re-pointed.

## C ↔ JS fidelity

C locus: `pauper_reinit` `u_init.c:867–925` (csym, 59 L incl. comment, whole body read). Branch-by-branch: pauper guard → early return ✓; `P_NUM_SKILLS` loop with `P_UNSKILLED` reset + advance 0 ✓ — and the lvalues are exact macro expansions (`P_SKILL` ≡ `u.weapon_skills[type].skill`, `P_ADVANCE` ≡ `.advance` per `skills.h:115–117`, confirmed via header read); `weapon_slots = 2` ✓; 13-role switch in exact C order including the trailing `default:`-first fall-through group (Barb/Ranger/Valk) ✓; `preknown != STRANGE_OBJECT` → `knows_object(preknown, TRUE)` ✓. `Role_switch` ≡ `gu.urole.mnum` (`you.h:248`, header read) → JS `game.urole?.mnum` with PM_* cases, matching the file's established role-dispatch idiom. Confirm throughout.

Callers: C has exactly 4 references — `:29` fwd decl (hoisting covers), `:663`/`:735` comments, `:1406` live call → JS wires post-`skill_init` at `js/u_init.js:1989`. Confirm. RNG: none both sides.

Caller context read (`js/u_init.js:1983–1990`):

```js
skill_init(skills_for_role());
// C: u_init.c — if (u.uroleplay.pauper) pauper_reinit()
if (game.u?.uroleplay?.pauper) pauper_reinit();
```

Two consequences verified: (1) order matches C's `:1406` (post-`skill_init`
inside `u_init_skills_discoveries`); (2) `skill_init` runs first, so
`u.weapon_skills[]` is initialized before the loop's direct
`.skill`/`.advance` writes — the JS lvalue writes carry the same
no-throw guarantee C gets from the fixed array (the `exper.js` precedent
cited for missing-field coercion is a backstop, not the mechanism here).
The double gate (comment-C + `if` on `uroleplay.pauper`) mirrors C's
call-site `if` plus the body's own guard — both must agree for the body
to run, exactly as in C.

Named omit (in-commit, verified both sides): C `knows_object :575` early-returns for paupers unless `override_pauper`; the JS local names its 2nd param `_override_pauper` and ignores it. Behavior-identical for this port's `TRUE` call; fixing the guard would alter every `ini_inv` FALSE call — correctly deferred to its own row, not silently stubbed.

## Hallucinations / overclaim

None. "Whole C body" earned; the one divergence is named with C citation and mechanism.

## Density

Breadth phase: one whole small C function, +65 lines, one module. Right-sized (§2b minimum is C-size-relative; C is 55 L).

## Verification

Full verify transcript (both summary lines cited):

```text
verify pauper_reinit: baseline befd3a1a~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify pauper_reinit: no corpus session is blocked on it at befd3a1a~1 — a vacuous verify is NOT a corpus PASS. [...]
smoke pauper_reinit: no RNG-tagged reach; fixed smoke spread (24 run, 24 PASS, 0 regressed → REACH-OK
```

0-blocked vacuous + REACH-OK, exactly as disclosed. No REGRESSED. No RNG
draws (pauper opt-in, no session exercises it) — consistent. Switch-order
cross-check: C lists healer → cleric/knight/monk → wizard → archeologist
→ cave-dweller → rogue/tourist → samurai → default+barb/ranger/valk, and
the JS arms follow in that exact order (read both side by side). Diff
grep: no FORCE/DIAG/seed/fastforward/coords. Rulecheck clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
