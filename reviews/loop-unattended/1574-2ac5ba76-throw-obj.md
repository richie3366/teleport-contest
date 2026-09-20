# Review 1574 — 2ac5ba76 — dothrow.c throw_obj whole-body restart (D-2615)

**Metadata:** SHA `2ac5ba76`, `dothrow.c` `throw_obj`, D-2615.
JS: `js/dothrow.js` (+182/−145: `throw_obj` restart + 2 import-line edits +
3 retired clones).

## Intent vs deliverable

Subject promises: whole-body restart in C order — `ECMD_TIME` init,
objsplit snapshot + `unsplit_stack` closure on every early return,
Mjollnir/too-heavy/self/petrify/welded/towel gates, racial switch on otyps,
quest-artifact + crossbow multishot extras, volley loop ending in
`unsplit_stack`. Diff actually adds: the restarted `throw_obj`
(`js/dothrow.js:1061`), `is_quest_artifact` (quest.js) +
`multishot_class_bonus` (weapon.js) import bindings, and deletion of the
three file-local clones. Promise matches deliverable.

## Inventory

- `throw_obj(obj, shotlimit)` — restarted body with per-arm `:line` cites.
- Deleted clones: file-local `The`, `is_quest_artifact`,
  `multishot_class_bonus` (the 38→6 hunk at old `:812`).
- Retained file-locals: `freeinv`, `weapon_type`, `Role_if`/`Race_if`/
  `P_SKILL` (pre-existing one-liners).

## C ↔ JS fidelity

C locus `dothrow.c:86–293` (208 L, via `csym.mjs throw_obj`; callers
`:375`, `:582` via `--callers`). Full C body read here. Arm-by-arm confirm:

- `:93–94` `res = ECMD_TIME` + objsplit snapshot; `:274–292`
  `unsplit_stack` epilogue (restore + `unsplitobj` iff obj matches
  parent/child oid and isn't quivered) as a closure on **every** early
  return — exact. The coin early-return correctly bypasses it
  (`:112–116`: "throw_gold will unsplit the stack itself"), matching C's
  `return throw_gold(obj)` that skips the `goto`.
- `:96–100` getdir: C prompts inside; JS prompts in the callers (doc
  comment states this; both callers wired — `js/dothrow.js:2781` ← `:375`,
  `:2762` ← `:582`).
- canletgo/Mjollnir/too-heavy gates (`:118–132`), self-refuse
  (`:133–137`, `You()` text), `u_wipe_engr(2)` (`:138`), petrify arm with
  fall-through (`:139–148`), welded (`:149–153`), wet towel (`:154–155`) —
  all exact, including `killer_xname` kill-buffer text passed inline.
- Multishot (`:160–236`): proficiency fallthrough, role extras via the now-
  live `multishot_class_bonus` (NINJA fallthrough restored — the clone had
  dropped it), racial switch on otyps with HUMAN/DWARF no-op `default`
  (`:195–214`), quest-artifact `++multishot` (`:216–220`), crossbow
  `acurrstr < 16/18` gate (`:222–226`), `rnd` roll + quan/shotlimit clamps
  (`:228–236`) — exact. RNG call-for-call (`rnd` twice on the taken paths).
- Volley (`:238–273`): `m_shot` snapshot, shoot/throw pline (C `You()` ≡
  JS `pline('You …')`, text-identical), `wep_mask`/`oldslot`/`m_shot.o/n`
  setup, split-vs-last-item loop with `freeinv` after split and
  `remove_worn_item` on the worn path, `throwit` + `encumber_msg` per
  iteration, `m_shot` clear — exact. `oldslot` as invent-array successor
  is the named JS-array adaptation of C `:262` `obj->nobj` (in-code + map).
  `if (!otmp) break` is a JS-null safety extra with no C-visible effect.

Callee closure: `is_quest_artifact` now the live quest.js export
(`sym.mjs`: `js/quest.js:275 sync`; body re-read — `oartifact ==
questarti` per C `questpgr.c:66–70`, plus a `want !== 0` guard that is
dead-safe since every role has a quest artifact). Required `sym.mjs`
outputs pasted in notes: `multishot_class_bonus` live
(`js/weapon.js:384`, no clone warning — retirement complete); `The`
clone gone from dothrow.js (remaining `js/mthrowu.js:711` clone
pre-existing, untouched here).
Retained clones verified here, not trusted: `weapon_type` drops C's
`!obj → P_BARE_HANDED_COMBAT` arm and the W/T/G class gate
(`weapon.c:1516–1529` via `csym.mjs`), but (a) `!obj` is unreachable at
this call site (obj provably non-null where called), and (b) every
non-WEAPON/TOOL/GEM otyp in C `include/objects.h` carries `P_NONE`
(measured: all non-`P_NONE` skill tokens sit in WEAPON/WEPTOOL/TOOL/GEM
macros — mattock, hose, pick-axe, unicorn horn, sling-gems checked) with
`P_NONE = 0`, so `abs(oc_skill)` ≡ C on all reachable inputs. Verified
CLONE, behaviorally C-exact here. `freeinv` (array-splice + gold-cache,
C-cited `freeinv_core`) likewise. `Role_if`/`Race_if`/`P_SKILL` are the
house-wide identical one-liners (21-file pattern), pre-existing.
No stub, no silent omit; Named list accurate.

## Hallucinations / overclaim

None — and credit: the D-log openly reports the mid-iteration
`PM_HUMAN is not defined` ReferenceError (cohort seed1800 + 9 REACH
workers aborted) and the one-line fix. `PM_HUMAN` count in the shipped
tree is 0; my re-run below confirms no regression survived.

## Density

One C function (208 L), one JS module. Right-sized.

## Verification

- `node scripts/imports.mjs --rulecheck` → Rule #2 clean (whole `js/`).
- Diff grep: no `fastforward`/`getRngLog`/seed reads in `js/` hunks.
- Re-measured: `hidden-proxy.mjs verify throw_obj --base 2ac5ba76~1
  --reach-all` → `0 session(s) blocked` + `reach: 22 baseline-PASS
  sessions reach it (22 run): 22 PASS, 0 regressed → REACH-OK`. This is a
  **real** reach set (not the vacuous path) — it executes the restarted
  body on the shipped code and confirms the ReferenceError fix held. Both
  summary lines cited; stronger than the D-log's claim, consistent with it.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
