# Review 2286 — 5f8e9743f — m_at uhitm/dig + on_level dokick rewires

- SHA: `5f8e9743f` (D-3330)
- Files: `js/uhitm.js`, `js/dig.js`, `js/dokick.js`, `js/dungeon.js`
  (comment) (+ 2 extended rewire tests)
- Insertions: ~30 js/ across 4 files; 2-symbol rewire pair

## Intent vs deliverable

Subject promises: "`rm.h` m_at uhitm+dig rewires + `dungeon.c`
on_level dokick rewire (live-export clone removals)". The diff
delivers exactly that: 3 clones deleted, 1 ALREADY edge extended
(uhitm→mon), 2 new static edges (dig→mon, dokick→dungeon), one
C-cite comment per site, all call-site expressions unchanged. No
DIAG/FORCE/seed (the DIAG grep hit is the pre-existing `NODIAG`
import name); Rule #2 clean (iteration-wide rulecheck).

## Inventory

- `m_at`: deleted uhitm bare-scan clone (5 sites) and dig mhp>0-only
  clone (4 sites) → live mon.js:1745; stale dig↔mon cycle comment
  voided with `--can` evidence.
- `on_level`: deleted dokick `!!(a&&b&&…)` clone (sole site
  down_gate) → live dungeon.js:1810; remaining-clone comment 7→6.

## C ↔ JS fidelity

C `m_at` (rm.h:510–511, alt :516): grid read — monster iff the
square is occupied, else 0. Live JS (mon.js:1745, read in full):
worm-seg grid read, then fmon scan skipping steed (remove_monster'd
while mounted in C), dead (`mhp<=0`, off-grid in C), and
MON_OFFMAP — the documented grid semantics. Both deleted clones
were genuine C-wrongs: uhitm's bare `m.mx===x` scan returned
dead/steed monsters (e.g. a corpse-square passing the :3687 second-
swing `m_at(x,y) != mon` identity check against a stale pointer);
dig's mhp>0-only scan returned steed/offmap monsters at the
minliquid/madeby/rockit/do_attack sites. All 9 sites now read the
grid faithfully. Required `sym.mjs` output:

```
m_at             js/mon.js:1745   sync
             !! ALSO 1 LOCAL CLONE(S) in 1 files — IMPORT the export; do NOT add another
               js/teleport.js:133
```

The 1 remaining clone is teleport.js:133 — a documented steed-
finding variant, NOT this SHA's debt: D-3281 (review 2242 ACCEPT)
kept it deliberately ("retiring it is a teleport.js-wide semantic
change, out of cluster"), D-3328 reiterated it, and the in-code
comment (teleport.js:86-91) plus the aliased canonical import
(`mon_m_at`, used at :2909/:2913 for the take-off gate) pin the
status. It diverges from C's grid read (returns the steed, which C
keeps off-grid while mounted — observable in `goodpos` :501 when
mounted), but that decision was made and ACCEPTed two audits ago;
re-litigating it against this SHA would misattribute ownership.
The census test pin matches D-3328's accepted documentation.

C `on_level` (dungeon.c:1438–1443): NONNULL equality. Sole dokick
site passes `u.uz` + `qstart_level`, both non-null mid-game, so the
deleted `!!` guard differed from live only on pairs C never passes
(`lev1->dnum` would fault on NULL). Behavior-neutral rewire.

## Hallucinations / overclaim

None. The "intentional steed-finding variant, D-3328" cite checks
out (D-3328 D-log + teleport.js:88 comment both say so — the claim
is inherited, not invented here). "Whole C body live" holds for
both symbols (macro + 6-line body, verified above).

## Density

Two-symbol rewire; ~30 insertions below the bar, defended with the
D-3328/D-3329 batch precedent. Per-function Verify lines present;
`Ledger:` names on_level only because `m_at` is an rm.h macro
(`ledger.mjs show` reports "not a pinned-C function") — same
fail-closed precedent as D-3328, with the full rewire list in the
Unindexed bullet. No RNG in either body. Cluster gates pasted:
syntax · rule2 · hidden-note ×2 · reach ×2 · green · strict ·
cohort 7/7 · skip full (no shared file changed — dig.js/dokick.js/
uhitm.js are leaf-ward; correct call).

## Verification

Re-measured (`hidden-proxy.mjs verify m_at,on_level --base
5f8e9743f~1 --reach-all`): both 0 blocked (rows cited 0 — honestly
vacuous, D-log says so) + smoke 24/24 PASS, 0 regressed → REACH-OK
×2. Matches the D-log.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
