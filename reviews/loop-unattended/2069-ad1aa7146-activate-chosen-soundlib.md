# Review 2069 — ad1aa7146 — activate_chosen_soundlib port

- SHA: `ad1aa7146` (D-3109)
- Subject: "sounds.c activate_chosen_soundlib port + 6 same-file dispositions (coverage)"
- js/ insertions: ~45 (js/options.js + js/allmain.js wire)
- Prior index: 2068; queue Must-fix at review time: empty

## Intent vs deliverable

Promise: port MISSING `activate_chosen_soundlib`
(sounds.c:1779–1795, 1 caller) into js/options.js next to the D-2785
soundlib family, wire the allmain.c:703 call, plus 6 same-file
ledger dispositions after a 9-stale pop chain.

Diff actually adds: `activate_chosen_soundlib` export, the
nosound_procs 2→11 field extension, the allmain.js import + call,
one header omit retirement. Matches the promise; no extra scope.

## Inventory

Single changed function:

- `activate_chosen_soundlib` (js/options.js:6763, sync export) — C
  sounds.c:1778–1795 (csym range). Live: idx, IndexOk panic, exit
  arm, struct copy, init, active/chosen publish. Named: SND_LIB_*
  table rows (compiled out, contest table nosound-only).

Helpers: `soundlibIndexOk` is a pre-existing local (js/options.js:6732,
D-2785), not introduced here — C IndexOk is a macro, so a local
predicate is the right shape. No clones added, no stubs, no
deletions or re-points (sym.mjs N/A beyond the new export, which
resolves to the single home). Callee closure: none — both hooks
are null in the contest build; the only reader (cmd.js:359) is
typeof-guarded, verified.

## C ↔ JS fidelity

Against C :1778–1795, in order: `int idx = gc.chosen_soundlib`
→ `?? 0 | 0` (BSS 0) exact; IndexOk gate → throw ≡ panic (same
precedent as assign_soundlib); `||` exit arm reads the *outgoing*
`game.soundprocs` hook before the overwrite, typeof-guarded like C's
NULL check, with the verbatim reason string; `{...}` struct copy;
init hook read after the copy; `active_soundlib = soundlib_id`
then `chosen = active`. Caller allmain.c:703 wired at
js/allmain.js:188; the other two C references are comments
(options.c:3839, unixmain.c:111 — both lines start with `*`,
verified). C struct sounds.c:1726–1737: SOUNDID (2 fields) + 0L +
8 NULL hooks = 11 fields — the JS extension matches field for
field. No RNG in C; sync like C.

Nit (not a C-wrong): the jsdoc/commit text calls the field
`uint32_t` ("idx `|0` (C uint32→int)", "`>>>0` (uint32_t)") — C
decl.h:291 declares `enum soundlib_ids chosen_soundlib`. The `|0`
/ `>>>0` conversions are behavior-neutral for the reachable
values, but the cited type name is wrong.

Stale/by-design dispositions: mon_is_gecko (local js/sounds.js:1246;
C staticfn, so file-local is the correct shape), dotalk (:1954),
cry_sound (:1050), maybe_play_sound (:108 stub) all resolve where
cited. USER_SOUNDS compiled-out claim: the only `-D` site in the
tree is outdated WinCE wceconf.h — absent from the contest unix
build, verified. SND_LIB_*: no defines in sys/unix hints or
Makefiles, verified.

Diff grep: no FORCE/DIAG/getRngLog/seed/coordinates (the one
"fastforward" hit is a pre-existing import in context). Rule #2:
`imports.mjs --rulecheck` clean across scored js/.

## Hallucinations / overclaim

None. "Whole body" is accurate — every C line has a JS line;
the compiled-out rows are named with the build-config evidence.

## Density

Single-function cluster + ledger dispositions, ~45 js/
insertions — below the ~80 line, excused per the §2b
unless-clause: the sounds.c remainder samples as
shipped-undeclared (growl/yelp/get_soundlib_name/assign_soundlib
live; mon_in_room/dochat live locals), compiled-out
(choose_soundlib is `#if 0`, sounds.c:1807), or 0-line stub
(nosound_init_nhsound :1916–1919) — the D-log's trichotomy holds
on every sample. One Inventory block, per-function `Ledger:`
entries (ported ×5, by-design ×2), per-function Verify lines.
Verdict: ACCEPT.

## Verification

Re-measured at this SHA (`--base ad1aa7146~1 --reach-all`, all 7
functions in one call): 0 blocked at baseline and working tree
for each, vacuous note printed, smoke 24/24 → REACH-OK ×7.
Matches the D-log exactly — the "no corpus session blocked"
framing is honest, never presented as a corpus PASS. No REGRESSED
session. Shared gates per D-log: syntax 2 files, rule2, green
2/2, strict ×2, cohort 7/7, full 44/44 auto.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
