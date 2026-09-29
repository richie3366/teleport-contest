# Review 2083 — cd4bc2a21 — make_version + dig/mdlib dispositions

- SHA: `cd4bc2a21` (D-3123)
- Subject: "`mdlib.c` make_version whole-body + dig.c DEBUG/`#if 0` by-design set (10 functions; coverage)"
- js/ insertions: ~70 net (js/version.js + js/date.js; interim deleted)
- Prior index: 2082; queue Must-fix at review time: empty

## Intent vs deliverable

Promise: port MISSING `make_version` whole (static struct +
`:841` wire, collapsing the date.js interim) + 4 by-design and
5 stale ledger dispositions.

Diff actually adds: module-local `version` + `make_version()`,
the runtime_info_init `:841–842` wire, interim deletion, hook
forwarding, 3 generated-leaf imports + EDITLEVEL pin, and the
D-1881 comment narrowing. Matches the promise.

## Inventory

Per function (cluster of 10 = 1 code + 4 by-design + 5 stale):

- `make_version` (js/version.js:640, module-local) — C
  mdlib.c:244–295 (csym range). Live: whole body. Local is
  correct: C is staticfn in game builds (:244–246 `#ifndef
  SFCTOOL`).
- `wiz_debug_cmd_bury` — by-design: def inside `#ifdef DEBUG`
  (:2285–2321) + sole caller cmd.c:1944–1948 under the same
  guard; no `-DDEBUG` in unix Makefiles/unixconf/recorder or
  any of the 6 patches (verified).
- `bury_monst`/`bury_you`/`bury_obj` — by-design: all inside
  `#if 0` :2191–2283 (verified boundaries; bury_you has 0 C
  refs, the others extern.h decls only).
- `is_digging` (js/dig.js:281) / `watchman_canseeu`
  (:1034) — stale, both bodies verified exact vs C :194–201
  / :1361–1368.
- `version_id_string` (js/version.js:69) — stale; body
  verified vs C :315–344 (RELEASED → statusbuf "", no
  PORT_SUB_ID, "build").
- `build_savebones_compat_string` (:364) — stale; exact
  (VERSION_COMPATIBILITY commented at patchlevel.h:62 →
  "5.0.0 only" arm).
- `count_and_validate_winopts` (:436) — stale; exact (WIN32
  block compiled out → count + valid).

Helpers: none added. Three generated-data imports are
import-free leaves (0 `^import` lines each — no cycle/TDZ);
the D-1881 ban narrowing (no version.js → const/hacklib/date
edge) is accurate — none of those edges exists. Nothing
deleted (interim collapse is a restart, pre-announced by
review 1612) or re-pointed.

## C ↔ JS fidelity

`make_version`: incarnation `(5<<24)|(0<<16)|(0<<8)|0` with
EDITLEVEL=0 verified at patchlevel.h:20; feature_set bits
6+17+18 with 19 off — MAIL_STRUCTURES unconditional
(global.h:430 ✓), INSURANCE defined (config.h:435 ✓),
SCORE_ON_BOTL commented (config.h:627, verified in 2081 ✓);
entity_count counts artilistRaw[1..] ≡ C :286–287 over
(["", 33 names] — no NULL fence needed, same fence result
33), then C shift order :288–292. `>>> 0` exact (all values
< 2^32). No RNG either side. The /tmp convergence probe
(bit-identical 83886080/393280/555618687) corroborates.

Wiring: C runtime_info_init :834–846 read in full — JS order
(savebones :839, make_version :841, populate :842,
idxopttext :843, build_options :844) identical. The hook's
sole caller forwards the filled struct — no undefined-version
path (sole `populateNomakedefsHook(` site).

Callers: make_version :841 → :675 (new); makedefs.c:309 +
sfctool.c:136 are build tools (named, never ported) ✓.
Stale callers per D-log table with JS sites (spot-verified
shapes; bodies complete).

Observation (pre-existing, not this SHA): unearth_you/
escape_tomb sit inside the same `#if 0` yet ship as live JS
(D-3058). Verified unreachable — no live C caller, and the
only JS refs are the defs + escape_tomb's internal call. Dead
code, no behavioral gap; disclosed in the D-log. No action.

Diff grep: no FORCE/DIAG/getRngLog/seed/coordinates. Rule #2
clean (iteration-wide).

## Hallucinations / overclaim

None. "0 blocked ×10" framed as notes; the unearth disclosure
is honest; prior reviews 1494/1612 cited as prior art.

## Density

10-function cluster at the ceiling, spanning two C files —
legitimate chaining, not padding: the head (dig.c bury) was
undispositionable without code, so the second row (mdlib.c
make_version) shipped as code head; every disposition is
same-file with one of the two popped rows (D-3121 precedent).
~70 js/ insertions: the <80 exception holds (parent block
shows no other dig.c/mdlib.c rows). Per-function verdicts:
all ten ACCEPT. SHA: ACCEPT.

## Verification

Re-measured (`--base cd4bc2a21~1 --reach-all`, all 10 in one
call): 0 blocked at baseline and working tree each, vacuous
notes, smoke 24/24 → REACH-OK ×10. Matches the D-log; no
REGRESSED session. Shared gates per D-log: syntax 2 files,
rule2, green 2/2, strict ×2, cohort 7/7 (full skipped — no
shared file).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
