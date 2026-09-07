# Review 980 — dad22c02 — touch_artifact hero blast (D-2010)

Metadata: SHA `dad22c02`, D-2010, Open-row port (wished quest
artifacts never blasted; 7 corpus sessions). js/ touches 7 files
(`js/artifact.js` full hero blast + `bane_applies` + 4 helpers;
`js/objnam.js` downcase ×3 sites; async propagation to
invent/minion/mon/pickup/weapon call sites). No stamp owed.

## Intent vs deliverable

Subject promises: full hero `touch_artifact` in exact C order
(now async), `Role_if`/`Race_if` badclass, bane via same-file
`spec_applies`, short-circuit-preserving blast gate, blast body
(pline, `touch_blasted`, `d()`, silver `rnd(10)`+half-phys,
`losehp`, WIS exercise), evade/control via live carried+Tobjnam,
plus the `:1006–1008` downcase at three build sites. Diff actually
adds: all of that. Promise == diff.

## Inventory

- Changed JS functions: `touch_artifact` (hero path completed;
  monster covetous/mplayer arms stay map-named omits),
  `retouch_object`/`select_hwep` (async only; their deferred arms
  untouched), `xname`/`doname` (downcase rule).
- New helpers: `bane_applies` (C `:992–1005`, exact: NONART
  guard, DBONUS-only copy, same-file `spec_applies`), `Race_if`
  (`urace.mnum`, matches `you.h:297`; `Role_if` matches `:247`),
  `Hate_silver_hero`, `Antimagic_hero`, module `touch_blasted`.
- No deleted symbols — no `sym.mjs` delete audit required.
- Async sweep verified complete by grep: every
  `touch_artifact(`/`retouch_object(`/`select_hwep(` call site in
  `js/` awaits (artifact ×2, do_wear, invent, minion, mon ×2,
  pickup, weapon ×2, wield) — no missed caller.

## C ↔ JS fidelity

C locus: `artifact.c:907–974` + `bane_applies :994–1005`, read
verbatim.

- Reset/NONART/yours/self_willed/badclass/badalign: exact. The
  `mon == null → yours` and `hero`/`_youmonst` identity disjuncts
  predate or are same-object defensives — no behavior change.
  Monster covetous/mplayer arms omitted with citation (monster
  badclass/badalign stay false; bane still applies to monsters
  exactly as C's post-branch `if (!badalign)` does). ✓
- Blast gate `((badclass||badalign) && self_willed) ||
  (badalign && (!yours || !rn2(4)))`: single `if`, identical
  operator order — `rn2(4)` draws only when C draws it (on the
  falsifying path the first disjunct short-circuits true, so no
  `rn2(4)` either side; C's `d(4,10)` @ :953 is the first draw).
  ✓
- Blast body: `You are blasted by %s power!` via
  `s_suffix(the(xname(obj)))` ✓; `touch_blasted = true` ✓;
  `d(Antimagic?2:4, self_willed?10:4)` ✓; silver arm
  (`oc_material == SILVER && Hate_silver` → `rnd(10)` +
  `maybe_half_phys`) ✓; `` `touching ${oart.name}` `` + `losehp`
  + `KILLED_BY` ✓; `exercise(A_WIS, false)` ✓. `losehp`/
  `maybe_half_phys`/`exercise` sync-called-correct.
- Refuse arm (`badclass && badalign && self_willed` →
  evade/beyond-control via live same-file `carried` + imported
  `Tobjnam`) exact. ✓
- Downcase: C `if (oartifact && !strncmp(obufp,"The ",4))
  *obufp = lowc` at the post-`" named "` pointer — JS applies
  the identical test-and-lower-T at all three build sites;
  repeat application is idempotent, so the doname sites are safe
  even where xname already lowered. ✓
- New-edge precision note (not a wrong): artifact.js→hack.js
  (`losehp`, `maybe_half_phys`) is a genuinely NEW static edge
  closing a cycle with hack.js:69→artifact.js — the D-log's "no
  new edge" overstates. It is hoisted-function-safe (both sides
  `export function`, call-time use only; `js/` is one SCC
  regardless), `--can` reports ALREADY, and green + full 44/44
  prove loadability. Observation only.
- Observation (not Must-fix): `touch_blasted` is currently
  write-only (C's reader lives in `retouch_object`, whose
  silver/bane arms are still deferred) — the reader arrives with
  the named follow-up; C-shaped state, correctly placed.

## Hallucinations / overclaim

None. "0 PASS, 7 moved past" is the honest shape for a gate that
unblocks RNG rather than finishing sessions, and every landing is
strictly later.

## Density

Largest SHA of the batch (7 files), but one C function plus
mechanically-required async propagation (a half-awaited tree
would break every caller) plus a 3-site one-line rule. One
semantic cluster — justified, not scope creep.

## Verification

Re-measured myself: `hidden-proxy verify touch_artifact --base
dad22c02~1` → `0 PASS, 7 moved past (1 still touch_artifact at a
later step), 0 unchanged, 0 worse → PROGRESS`, identical to the
D-log session-for-session. Plus cited green 2/2 + strict ×2,
cohort 7/7. Grep of the js hunks: no `FORCE`/`DIAG`/`getRngLog`/
seed/coordinate/`fastforward`. Rule #2 clean (re-ran this
iteration).

## Actionable C-wrongs

None in this delta.

Verdict: **ACCEPT**
