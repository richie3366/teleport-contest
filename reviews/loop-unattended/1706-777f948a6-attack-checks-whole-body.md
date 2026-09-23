# Review 1706 — 777f948a6 — `uhitm.c` attack_checks whole body (D-2747)

Metadata: commit `777f948a6`, D-2747, `js/uhitm.js` only. Coverage row (C 136 L / JS was 63 L), 0 corpus blocks. No prior review claimed closed.

**Addressed:** D-2752 `937267d19`

## Intent vs deliverable

Subject promises the warning-glyph, hides_under, mimic, mundetected, and sensemon arms, and retirement of the local `set_ustuck` clone. Those arms are in the diff. The pool reveal tests `u.Underwater` instead of `u.uinwater`. Promise matches the rest.

## Inventory

Changed JS: `attack_checks` restarted (`js/uhitm.js:4167`). Deleted local `set_ustuck`. New import names: `l_monnam`, `set_ustuck`, `hides_under`, `glyph_at`, `glyph_is_warning`, `glyph_is_invisible_id`, `Protection_from_shape_changers`, `dmgtype`, `tp_sensemon`, `objects_at`, `an`, `doname`, `is_pool`. No other function body edited.

## Callee closure

Deleted clone vs live (`sym.mjs`):

```text
set_ustuck       js/mhitu.js:1645   sync
Protection_from_shape_changers js/were.js:58   sync
             !! ALSO 3 LOCAL CLONE(S) in 3 files — IMPORT the export; do NOT add another
               js/display.js:1077  js/monmove.js:749  js/wizard.js:229
```

The deleted `uhitm.js` function was the same six assignments as `mhitu.js:1645` (botl, `ustuck`, clear swallow on null). `uhitm.js` is not in the clone list. `--can` for `set_ustuck` and `Protection_from_shape_changers` is **ALREADY**. `glyph_at` returns `disp_glyph` (`display.js:816`), and `glyph_is_invisible_id` is the right test for that id (`display.h:773` on a glyph, not a loc). `m_next2u` is `distu <= 2` and `distu` is `dist2` (`hack.h:1531`); JS `dist2(...) <= 2` matches.

## C ↔ JS fidelity

C `uhitm.c:188–327` (`csym`). No RNG in this function.

- `mstrategy &= ~STRAT_WAITMASK` (skipped only when the field is null). Engulf → false. `forcefight` → false. The `map_invisible` in that arm is inside a C block comment. ✓
- `glyph = glyph_at(bhitpos)`. Fallback `?? mtmp.mx` only when `bhitpos.x` is nullish. ✓
- Wait!: `!canspotmon && !glyph_is_warning && !glyph_is_invisible && !(!Blind && mundetected && hides_under)` → `pline` with `something`, `map_invisible`, then mimic `AD_STCK` `set_ustuck` when `!ustuck && !mflee && dist2<=2`, then `wakeup(..., true)`, return true. ✓
- Disguised mimic: `M_AP_TYPE && !PfSC && !sensemon && !warning`. Invisible glyph → `seemimic`, return false. Else `stumble_onto_mimic`, return true. ✓
- `mundetected && !canseemon && !warning && (hides_under || mlet==='S_EEL')`: clear flags, `newsym`. Invisible glyph → `seemimic`, false. `mlet === 'S_EEL'` is this tree's `mlets[]` spelling. Hallu arm uses live `Hallucination()` (`HHallucination && !resist`). ✓ except the pool test below.
- Sensemon wakeup of a still-hidden or mimicked monster. ✓
- Confirm: `flags.confirm !== false`, peaceful, flat `!u.Confusion && !u.Hallucination && !u.Stunned && !(HStun)`. Stormbringer sets `override_confirmation` and returns false. `paranoid_query` gets `(paranoia_bits & PARANOID_HIT) !== 0`, which is C `ParanoidHit` (`flag.h:564`), and abort sets `context.move = 0`. The flat Hallucination/Stunned test is the pre-existing confirm condition (the diff only rewrapped the comment). ✓ as kept.
- Return false. ✓

Pool reveal does **not** match. C `:289` is `Blind || (is_pool && !Underwater)` and `youprop.h:279` is `#define Underwater (u.uinwater)`. JS `:4247` uses `!game.u.Underwater`. `trap.js:3597` already records that `u.Underwater` is never written. A hero with `u.uinwater` set still takes the "hidden monster there" line, and never the following "hiding under %s" line, whenever the monster is in a pool.

Callers at this SHA: `apply.js:3831` (polearm), `:4006` and `:4016` (whip), `dokick.js:829`, `uhitm.js:4380` (`do_attack`). `dokick.js:1737` is a comment. Matches the five C calls the D-log lists.

## Hallucinations / overclaim

"new edges … SAFE" for `Protection_from_shape_changers` and `set_ustuck` — both `--can` ALREADY. "none new — whole C body live" misses the Underwater field. No FORCE/DIAG/seed/coordinate/`fastforward`. Rule #2 clean.

## Density

One C function, one module. Right-sized.

## Verification

Re-measured (`--base 777f948a6~1 --reach-all`). Parent scoreboard is `db6e0c3f6`. Row cited 0 blocks.

```text
verify attack_checks: baseline 777f948a6~1 (scoreboard at db6e0c3f6) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify attack_checks: no corpus session is blocked on it at 777f948a6~1 — a vacuous verify is NOT a corpus PASS. [...]
smoke attack_checks: no RNG-tagged reach; fixed smoke spread (24 run, 2.9s): 24 PASS, 0 regressed → REACH-OK
```

0 REGRESSED. The pool/underwater line is not corpus-hit. Green/strict/cohort per the D-log. That does not make `u.Underwater` into `u.uinwater`.

## Actionable C-wrongs

1. `attack_checks` pool reveal (`js/uhitm.js:4247`) tests `game.u.Underwater`. C `uhitm.c:289` tests `!Underwater`, which is `u.uinwater` (`youprop.h:279`). Use `u.uinwater`.

Verdict: **QUALITY-RISK**
