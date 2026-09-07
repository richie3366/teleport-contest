# Review 977 — 450fd66d — polymon verbose-tip block (D-2007)

Metadata: SHA `450fd66d`, D-2007, Open-row port (polymon
`flags.verbose` tips; 4 poly sessions cited). js/ touches 1 file
(`js/polyself.js`, +54/−…: twelve tip arms). Popped its own queue
row and refilled 5 Open rows (engrave/disclose/doup/newmonhp/
tipcontainer) in the same commit — per the keep-8–12 rule.
Journal rotated in-commit. No stamp owed.

## Intent vs deliverable

Subject promises: full tip block in exact C branch order (hide+web
combined arm, `u.umonnum == PM_GREMLIN`, `MS_SHRIEK`,
`is_vampshifter` on the monst struct). Diff actually adds: exactly
the twelve arms plus two same-edge binding extensions and two eel
consts. Promise == diff.

## Inventory

- Changed JS function: `polymon` verbose block only (breath tip
  pre-existing, D-0725).
- New helpers: none (two `PM_*_EEL` consts, `monsterNames.indexOf`
  idiom). No deleted symbols — no `sym.mjs` delete audit required.
- No STUB; doc-comment omission retired ("non-breath verbose
  tips" clause deleted — the block is now complete vs C).

## C ↔ JS fidelity

C locus: `polyself.c:1030–1070` (read verbatim). Twelve arms,
branch-by-branch confirm — order, predicates, and strings all
match:

- spit/gaze via `attacktype(uptr, AT_SPIT/AT_GAZE)`; nymph via
  `mlet === 'S_NYMPH'` (established JS mlet-string idiom). ✓
- hide+web three-way (`might_hide && webmaker` → combined
  `"hide or to spin a web"` / `might_hide` / `webmaker`) exact,
  including `might_hide = is_hider || hides_under` hoist. ✓
- were/gremlin/unicorn/mindflayer/shriek in C order; gremlin
  correctly reads `u.umonnum` (not uptr) per C. ✓
- `uptr->msound == MS_SHRIEK` with local `MS_SHRIEK = 18`,
  verified against `monflag.h:32` (`MS_SHRIEK = 18`). ✓
- vampire arm passes the monst struct —
  `is_vampshifter(game.youmonst)` — matching C
  `is_vampshifter(&gy.youmonst)` and the apply.js:703 precedent;
  callee reads `mon.cham` (monsters.js:808). ✓
- egg arm: `lays_eggs && flags.female && !(eel || electric eel)`
  with `eggs_in_water ? "spawn in the water" : "lay an egg"` on
  the `#sit` command. Both callees LIVE with bodies matching the
  C macros (`mondata.h:77–79`: M1_OVIPAROUS flag; eel-swimmer).
  Eel exclusion by `mndx` (commented: `mons()` allocates, so no
  `&mons[]` identity) — semantics equal since `mndx` is the
  `mons[]` index. ✓
- All twelve strings byte-match the `use_thec`/`monsterc`
  expansion (`"Use the command #monster to …."`). No RNG in the
  block on either side. ✓
- Callee closure: everything was already imported except
  `lays_eggs`/`eggs_in_water`, which extend the existing
  monsters.js edge — no new module edge. Every arm's callees
  LIVE. ✓ `flags.verbose !== false` gate is the pre-existing
  line/idiom, untouched.

## Hallucinations / overclaim

None. The drop_weapon cross-verify is genuinely useful triage
(three residuals moved past there; 92133 still drop_weapon@91
correctly identified as the queued surface-stairs arm, which the
next SHA D-2008 then ports — cascade confirmed, not churn).

## Density

54 insertions for a 40-line C block in one function. Right-sized.

## Verification

Re-measured myself: `hidden-proxy verify polymon --base
450fd66d~1` → `1 PASS, 1 moved past, 0 unchanged, 0 worse →
PROGRESS` (92217 PASS; 91133 → polyself@67 was 58) — identical
to the D-log down to the session lines. This independently
confirms the landing I flagged as merely "explained" in review
976: 91133's post-tip divergence is polyself `rn2(4)` at step 67.
Plus cited green 2/2 + strict ×2, cohort 7/7. Grep of the js
hunk: no `FORCE`/`DIAG`/`getRngLog`/seed/coordinate/`fastforward`.
Rule #2 clean (re-ran this iteration).

## Actionable C-wrongs

None in this delta.

Verdict: **ACCEPT**
