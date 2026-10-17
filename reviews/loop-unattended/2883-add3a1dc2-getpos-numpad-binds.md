# Review 2883 — add3a1dc2 — getpos num_pad binds: ndir walk + unbound-Enter Done (D-4042)

- SHA: `add3a1dc2` (cliff, 1 C family: `getpos` dispatch + `reset_commands` binds)
- D-entry: D-4042; Ledger: getpos.c (getpos partial)
- `js/` diff: `js/getpos.js` +38/−13 (4 tables + numPad/wdx dispatch + quitchar key 10); tests `scripts/getpos-numpad-enter.test.mjs`, `scripts/getpos-numpad-walk.test.mjs` (new)

## Intent vs deliverable

Promise: probe #name→m→Enter @91 shows C «Done.» vs JS «stone», and
×12 force-caller sessions show C «Unknown direction: 'h' (use '4', '2',
'8', '6' or '.').» vs JS autodescribe — all 13 rcs carry number_pad;
port the num_pad direction dispatch (ndir walk tables incl. phone
layout, highc/C rush-run binds only under !num_pad, unbound Enter falls
to quitchars Done). Diff actually adds exactly that: `numPad`
predicate, `wdx/wdy` selection, `!numPad` gates on the highc/CTRL arms,
key 10 in the quitchar arm. No new helpers, clones, imports, or edges.
Promise = diff.

## Inventory

- `NUMPAD_DX/DY`, `NUMPAD_DX_PHONE/DY_PHONE` (js/getpos.js:245–256):
  new — data tables from C ndir strings.
- `getpos` dispatch (:1606–1650): changed — numPad/wdx selection + use.
- `getpos` quitchar arm (:1671): changed — `key === 10` added.
  C: `cmd.c:3343–3476` reset_commands (range per `csym.mjs`),
  `getpos.c:769–1167` getpos, `decl.c:96` quitchars — all verified in
  pinned source.

## C ↔ JS fidelity

(a) Walk tables. C `cmd.c:3348–3349` ndir `"47896321><"` /
ndir_phone_layout `"41236987><"`; dirchars selection `:3433–3436`
verified; `decl.c:77–78` xdir/ydir verified. Position-by-position:
4→W(−1,0), 7→NW, 8→N, 9→NE, 6→E, 3→SE, 2→S, 1→SW — JS `NUMPAD_DX/DY`
matches all 8; phone table matches the 1↔7/2↔8/3↔9 swap of C
`:3424–3428`. `g.Cmd.phone_layout` is the live C-derived flag
(js/cmd.js:2411–2427 ports the `:3417–3436` selection). No RNG either
side.

(b) Rush/run gating. C `:3444–3450` (verified): `if (!num_pad)`
highc/C else M/M. JS gates both arms on `!numPad` — exact. M(digit)
under num_pad is the named omission (1); no corpus input path (0 high
bytes across the 16 moves) — credible, and the arm is named in the
D-entry, not silent.

(c) Quitchars. C `decl.c:96` `" \r\n\033"` includes LF; C getpos
`:1040` quitchars gate → `:1132–1141` force?nxtc:Done verified. Under
num_pad LF is unbound (no M/C bind at 10), so it reaches Done — JS
`key === 10` arm (:1671) with `if (force) continue` + `ccp=(−1,0)` +
return 0 mirrors C. Under !num_pad LF is C('j') rush (CTRL_DIR[10],
pre-existing) — JS keeps that path, so the arm is a no-op there.
ESC −1 above is pre-existing (:1534, C `:893–898`). Pre-existing
branch-order note (not this SHA): JS tests quitchars before the
spkeys arms while C tests them last (`:1040` after all spkeys) —
identical outcome unless a quitchar is rebound to a spkey; untouched
by this diff.

(d) Fall-through. Under num_pad hjkl miss `wdx`, skip the gated arms,
and reach the pre-existing matching[]/Unknown-direction tail
(:1817–1847, note via live `cmd_from_func`, C `:1122–1128` shape) —
exactly the claimed C «Unknown direction» behavior; the phone-order
note ('4','8','2','6') follows from the live binds.

Cite drift (nit, not C-wrong): JS comments and D-log cite `:3463–3472`
for the highc/C-vs-M branch; the branch is at `:3444–3450`
(`:3461+` is the bind-new-keys loop). Semantics described are exact.

Helper classes: tables are C data, not clones; no callee changes;
no symbol deleted or re-pointed (nothing to `sym.mjs`). `getpos` →
js/getpos.js:1381 ASYNC per `sym.mjs`.

## Hallucinations / overclaim

None. The ×13 same-cause claim is pinned to quoted toplines both
sides plus rc evidence (number_pad modes 0–4, 2 phone-layout with the
distinct note order). Rows 1–9 above the probe re-verified first-hand
as D-4016/D-4028 parks (falsifier states named), per D-4041 precedent
— the head-selection is auditable, not assumed.

## Density

Cliff-phase: unattributed-row writer (getpos dispatch), probe session
FULL PASS plus the whole blocked set adjudicated (9 PASS + 3 moved +
4 provably-out-of-cause with identical toplines and non-num_pad rcs).
The 4 unchanged are a named different-cause item with session/step
ids, not NO MOVEMENT dressed as omission — the gate is provably a
no-op for them. Not a no-op: `js/` + 2 tests + 10 PASS + 3 moved.
`Ledger: getpos partial` updated.

## Verification

- Re-measure (this review, one call):
  `hidden-proxy.mjs verify getpos --base add3a1dc2~1 --no-reach` →
  `9 PASS, 3 moved past, 4 unchanged, 0 worse` — exact match to the
  D-log line, same sessions (Monk-50455043 →look_here@371,
  Ranger-50155013 →x_monnam@429, Valkyrie-50255069
  →dotogglepickup@694; the 4 unchanged at identical steps/toplines).
  Non-vacuous (16 blocked).
- D-log Verify bullet: probe `score --ids` FULL PASS (869/869,
  22590/22590), REACH smoke 24/24, syntax, rule2, green + strict ×2,
  cohort 7/7, forced full 44/44, focused tests 2/2 (fail pre, pass
  post) — shipped; final rescore below is the regression check.
- `imports.mjs --rulecheck` → clean (this iteration); no
  FORCE/DIAG/seed/coordinate gates in the diff.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
