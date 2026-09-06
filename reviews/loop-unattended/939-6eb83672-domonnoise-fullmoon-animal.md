# Review 939 — 6eb83672 — sounds.c domonnoise FULL_MOON howl + animal MS_MEW..MS_ORC (D-1969)

Metadata: SHA `6eb83672`, D-1969, `js/sounds.js` only (+153/−20).
Reviewer re-ran the C arms (`sounds.c:823–1003` at HEAD), the new
JS envelope line by line, all MS_ constants against
`monflag.h`, `FULL_MOON` against `flag.h:81`, sym on
`night`/`aggravate`/`wake_nearto`, both `--can` edges, Rule #2,
banned grep, and `hidden-proxy verify --base`.

Intent vs deliverable: subject promises the MS_WERE FULL_MOON
arm, the MS_BARK FULL_MOON arm + dingo fix, and the animal
envelope MS_MEW..MS_ORC in C order. Diff actually adds all of
that (MOO/BELLOW already lived above the insertion point, so
the envelope is complete). Promise kept.

Inventory: no new functions — ~20 new `else if` arms in
`domonnoise` plus three PM_ consts and four MS_ consts. One
fixed predicate (`ptr?.name !== 'PM_DINGO'` → `mndx` compare —
a real C-wrong killed: `ptr.name` is never that string, so
dingos barked). Callees: `night` (calendar.js:177, sync, live),
`aggravate` (wizard.js:167, sync, live), `wake_nearto` (local
`sounds.js:187` clone — pre-existing, C-cited with the
sounds↔mon↔uhitm cycle reason, already used by four other arms;
reuse, not a new clone). `--can` on both static edges:
ALREADY.

C ↔ JS fidelity — arm by arm against `:823–1003`:

- WERE: `moonphase == FULL_MOON && (night() ^ !rn2(13))` →
  identical with `&&` short-circuit, so the `rn2(13)` draw fires
  exactly when C fires it. Wererat shriek vs howl via `mndx`
  (house pattern for `ptr == &mons[...]`). Immediate pline +
  `wake_nearto(11*11)`, else the whisper string — exact.
- BARK: FULL_MOON+night howl first, then peaceful
  whine/yip/bark (dingo-gated), else growl — exact, in C order.
- MEW tame 4-way (yowl/meow/purr/mew) then `GROWL || MEW`
  fallthrough arm — the chain structure reproduces C's
  FALLTHRU (tame MEW consumed above, so MEW reaching GROWL is
  untame). Exact.
- ROAR/SQEEK/SQAWK (hostile-raven Nevermore)/HISS (peaceful
  `return ECMD_OK`)/BUZZ/GRUNT/NEIGH/CHIRP/WAIL/GROAN
  (`!rn2(3)`-gated silence)/GURGLE/BURBLE/TRUMPET (msg then
  `wake_nearto` before epilogue)/SHRIEK (msg then sync
  `aggravate()`)/IMITATE/BONES (immediate double pline +
  `nomul(-2)` + `multi_reason`/`nomovemsg` + `ECMD_TIME`)/
  LAUGH (`laugh_msg[rn2(4)]`)/MUMBLE/ORC — all message strings
  and orders match C; RNG (`rn2(3)`, `rn2(4)`) call-for-call.
- Constants verified: GURGLE=15, BURBLE=16, TRUMPET=17=ANIMAL,
  SHRIEK=18, BONES=19 (`monflag.h:26–33`); FULL_MOON=4
  (`flag.h:81`).

Hallucinations / overclaim: none. Minor wording quirk: D-log
says `night` is "NEW-CYCLE" while `--can` reports the
calendar.js edge ALREADY exists — either way no new edge, no
TDZ risk; not a fidelity issue.

Density: §2b right size — one msound envelope (WERE + animal
run), one module. OK.

Verification: D-log Verify shows preflight PASS, `verify.mjs
--fn domonnoise` → PASS syntax/rule2/green/strict/cohort (full
skipped: single-module — correct), an explicitly vacuous hidden
note (row cited 0 blocks, no corpus-PASS claim), plus a
36-string static C-vs-JS probe PROBE PASS and an import smoke.
Reviewer re-measured: `hidden-proxy verify domonnoise --base
6eb83672~1` → "0 session(s) blocked (0 at baseline, 0 in working
scoreboard)". Honest. Diff-body banned grep clean (only D-log
prose hits).

Actionable C-wrongs: none. (Remaining MS_VAMPIRE/DJINNI/ARREST/
BRIBE/CUSS/SPELL/NURSE/GUARD/SOLDIER + mcan epilogue stay named
in this commit.)

Verdict: **ACCEPT**
