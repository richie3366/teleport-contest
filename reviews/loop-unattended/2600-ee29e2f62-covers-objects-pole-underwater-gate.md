# Review 2600 — ee29e2f62 — covers_objects pole-clone Underwater gate (D-3730)

Metadata. SHA `ee29e2f62` (2026-10-09), D-3730, parent `908879f0a`
(audit 2591–2599). js diff: `js/apply.js` +9/−2 (one gate + comment);
new `scripts/covers-objects-pole-underwater-gate.test.mjs` (76 lines).
Ledger: `use_pole partial`. No prior review claimed closed.

## Intent vs deliverable

Promise (subject + D-log): Underwater-idiom family, D-3729 Next lead —
pole-clone `covers_objects_pole` reads sticky `game.u?.Underwater`
(zero writers, dead false); C shows floor objects to a submerged
hero's polearm probe over pool, so the gate must read the live
`u.uinwater` bit via the file's in-file `Underwater_hero()` (D-3400
idiom). Pure gate, no RNG; "no corpus divergence — C-fidelity
residual". Row-brief correction shipped in the message: the "lava arm
runs either side" given is FALSE on DRAWBRIDGE_UP-over-lava, queued as
the refill successor, not shipped here.

Diff actually adds: one changed return expression in
`covers_objects_pole` (`!game.u?.Underwater` → `!Underwater_hero()`)
with a C-cited comment, plus a 5-iteration focused test through the
exported `glyph_is_poleable_at()` statue arm. No new export, no new
edge, no import. Promise and diff match exactly.

## Inventory

Changed JS functions (1):

- `covers_objects_pole` — `js/apply.js:3557–3565` (gate at :3564).
  C: `nethack-c/upstream/include/display.h:218–220`
  (`covers_objects` macro), `youprop.h:279` (`Underwater`).
- Touched helper (pre-existing, in-file): `Underwater_hero` —
  `js/apply.js:1803` (`!!(game.u?.uinwater | 0)`).
- Live imports reused: `is_pool`/`is_lava` from `js/hack.js` (:83).

Ledger line present: `use_pole partial` (pole path belongs to the
`use_pole` family; status unchanged by a one-gate fix).

## C ↔ JS fidelity

C `display.h:218–220`:

```c
#define covers_objects(xx, yy) \
    ((is_pool(xx, yy) && !Underwater) || (levl[xx][yy].typ == LAVAPOOL) \
      || (levl[xx][yy].typ == LAVAWALL))
```

C `youprop.h:279`: `#define Underwater (u.uinwater)`.

JS after (`js/apply.js:3564`):

```js
return (is_pool(x, y) && !Underwater_hero()) || is_lava(x, y);
```

Branch-by-branch: pool arm `is_pool && !Underwater` — JS now reads
the live bit (`uinwater`) instead of the dead flat. Confirmed the
flat is dead: the D-log's zero-writers claim matches the family's
established enumeration (prior reviews 2591–2599 accepted the same
claim for 9 siblings; sticky-flat sweep completed in this commit's
Next bullet: only `dothrow.js:937` disjunct + `read.js:1870`
live-first remain, both harmless). Lava arms: C tests typ
`LAVAPOOL`/`LAVAWALL`; JS `is_lava(x, y)` (`dbridge.c:62–74`) is a
superset that also covers bridge-over-lava — the commit message
itself states this divergence, verified at ship time, and the exact
fix (typ arms à la canonical `js/display.js:2291`) is queued as the
missing-arm successor row. No RNG in the macro; no RNG in the gate.
No call-order question: single boolean expression.

Clone classification: `covers_objects_pole` is a documented pole-path
clone of the macro (canonical `covers_objects` at
`js/display.js:2287`, detect clone at `js/detect.js:1052`, both
untouched). The pool arm is now C-exact; the lava arm diverges on one
cell shape and is a **named** successor, not a silent stub — correct
handling per playbook §2a (name the deferral, queue the row).

`sym.mjs` (no symbol deleted or re-pointed to an import in this diff;
in-file helper confirmed live):

```text
Underwater_hero  NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/apply.js:1803
             => Do NOT write clone #2. Check pinned C; if C has one
                function, this is clone drift (map debt / Open row).
```

Single in-file definition, no proliferation. No `--can` question
arises (no import added).

## Hallucinations / overclaim

None. "Match C" is claimed only for the pool gate; the lava-arm gap
is disclosed in the subject commit message, the D-log Symptom and
Named omissions, and the live queue row — with the C reason
(`dbridge.c:46` vs `:62–74`) quoted. The test file header still says
"Lava arm runs on both sides (is_lava unconditional)" while the
commit message corrects exactly that sentence; the tests themselves
cover only LAVAPOOL (where the sentence holds), so this is a stale
comment, not a wrong test or a wrong port. Not queueable.

Grep of the diff: no `FORCE`, `DIAG`, `getRngLog`, seed names in
control flow, `fastforward`, or hardcoded coordinates (test uses a
staged 5,5 cell, not a recorded coordinate). Rule #2 across scored
`js/`: `node scripts/imports.mjs --rulecheck` → "Rule #2 clean".

## Density

Cliff-phase §2b / §10.18 rules (this commit predates §10.19: parent
is the `908879f0a` audit, marathon corpus `2abecd585` lands later).
At the parent commit both generated blocks are empty — verified:
`git show 908879f0a:docs/LOOP-QUEUE.md` shows empty cliffs and
coverage blocks — and `ledger.mjs batch` named no gap. A missing-arm
row ship was the legitimate pop source then; there was no cliffs
head to be "not the head of". The §10.19 "empty slot belonged to
growth" reading cannot apply retroactively (grow mode was specified
in `326c32ee2`, after this ship). Judged under its own HEAD's rules:
right size (one gate family, code + ledger + verify in one handoff),
not a ledger-text iteration (real `js/` + focused test), not a
re-audit.

Callees: `is_pool`/`is_lava` LIVE imports, `Underwater_hero` verified
in-file helper. Callers unchanged (name/signature identical); the
D-log enumerates the pole cone (`shown_floor_obj_pole`,
statue/boulder arms, `glyph_is_poleable_at` → `get_valid_polearm_position`,
`find_poleable_mon`, `use_pole` sites). Whole-function question is
N/A at macro scale: the one changed expression is the whole gate,
and the remaining lava arm is queued, not dropped.

## Verification

D-log Verify: focused 3/5 pre → 5/5 post; `verify.mjs --fn
covers_objects` → syntax PASS, rule2 PASS, hidden note (no session
blocked), reach fixed-smoke 24/24 PASS → REACH-OK, green 2/2, strict
×2, cohort 7/7, full skipped (not shared) → VERIFY: PASS.

Re-measured by this audit
(`verify covers_objects --base ee29e2f62~1 --reach-all`;
`js/apply.js` untouched between this SHA and HEAD, so current-code
re-run is valid for this function):

```text
verify covers_objects: baseline ee29e2f62~1 — 0 session(s) blocked on it
smoke covers_objects: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
```

Both summary lines confirm the D-log. The "no session blocked" note
is honest here, not vacuous: the queue row cited zero blocks
(C-fidelity residual) and the D-log says so explicitly. No
`REGRESSED` session. Movement is N/A (nothing blocked); no movement
was claimed.

## Actionable C-wrongs

None.

## Other observations (not queueable)

- Stale sentence in the new test header ("Lava arm runs on both
  sides") vs the commit's own correction. Fix by rewording when the
  queued lava-arm successor ships; no action now.

Verdict: **ACCEPT**
