# Review 2573 — 94f9c2270 — mon_yells You_hear clone → live export (D-3703)

## Metadata

- SHA: `94f9c22703a2dd7e3756795fa7428c997ee19da7` (2026-10-09, D-3703)
- Scope: ≤10-function refill — whole Method on `mon_yells` (1 arm)
- Diff: `js/monmove.js` +4/−7 (clone deleted, 1 call site re-pointed),
  new `scripts/mon-yells-live-you-hear.test.mjs` (110 lines),
  ledger `mon_yells` D-tag, scoreboard header re-stamp only
- Context: D-3702 Next lead, same-iteration map refill+ship; queue empty,
  batch no gap (D-3699…D-3702 refill precedent)

## Intent vs deliverable

Subject promises: `mon_yells`' !canspotmon arm called a local
`You_hear_yell` clone that dropped C's inner gates (Underwater "barely",
Unaware "dream"); delete the clone, call the live `You_hear` export in
C gate order, outer `if (Deaf)` untouched. The diff delivers exactly
that: the clone is gone, the one call site awaits the live export with
a `:124` cite, nothing else in `js/` touched. Promise matches
deliverable.

## Inventory

- `mon_yells` (`js/monmove.js:1238` now): 1 arm changed (the
  !canspotmon `You_hear` emit). No new JS function.
- Deleted: local `You_hear_yell` (was a **clone**: acoustics/Deaf only,
  plain `pline('You hear …')`, own doc "Unaware/Underwater deferred").
- Callee: `You_hear js/hack.js:193 ASYNC` — single definition, no
  clones; awaited at the site. LIVE.
- `sym.mjs` on the deleted symbol (required — re-point audit):

```text
You_hear_yell    NOT FOUND in js/** (no export, no local function/const).
You_hear         js/hack.js:193   ASYNC — await required
```

- `imports.mjs --can js/monmove.js js/hack.js You_hear` → `ALREADY:
  monmove.js already statically imports hack.js. No new edge needed.`
  — subject's claim confirmed verbatim.

## C ↔ JS fidelity

C locus (`csym.mjs`: body `monmove.c:105–129`, 5 call sites + extern):

```c
if (Deaf) {
    if (canspotmon(mon)) pline_mon(mon, "%s angrily ..." ...);
} else {
    if (canspotmon(mon)) pline_mon(mon, "%s yells:", ...);
    else { /* Soundeffect(...) commented out */ You_hear("someone yell:"); }
    SetVoice(mon, 0, 80, 0);
    verbalize1(shout);
}
```

Branch-by-branch: outer `if (Deaf)` → JS `if (hero_Deaf())` (D-3572
macro reader: HDeaf||EDeaf||uroleplay.deaf + dead `u.Deaf` disjunct;
C macro confirmed at `youprop.h:125`). Deaf arm (unchanged): spotted
waves/shakes + `mhis` + limb part + `!` — same order, same
`nolimbs` predicates. Else arm: spotted `pline_mon "yells:"`, else
`You_hear("someone yell:")` — string byte-identical, same ladder
position. SetVoice empty (ledger-noted build shape) and the commented
Soundeffect both correctly absent; `verbalize(shout)` follows in both.
Gate order: the outer macro gate excludes Deaf heroes — even Unaware
ones — before the live export's inner `(Deaf && !Unaware)` arm, so
that arm is vacuous here exactly as C's nesting dictates. The live
`You_hear` body was verified whole against `pline.c:436–452` in
review 2572 (acoustics silence, Underwater "barely", Unaware "dream",
`On`-default acoustics reading) — not re-walked. RNG: none either
side on this arm (the Deaf-arm hallu `rn2(4)` is pre-existing,
unchanged). Branch-by-branch confirm.

Callers: C's 5 sites (dokick.c:838/851/855, monmove.c:186/189) map to
the JS sites the D-log lists (dokick.js:396/415/418, watch_on_duty
:1276/:1280); name/signature unchanged, no rewiring needed. ✓

## Hallucinations / overclaim

None. The D-log opens "no corpus divergence" and claims no movement.
The "NOT a refill" call on `mhis_yell` was checked, not trusted: the
clone (rn2(4)-first hallu → genders index, `!canspotmon → its`,
neuter/humanoid/UNIQ/pname tail) matches the live `mhis`
(js/mondata.js:1245) via `pronoun_gender(mtmp, PRONOUN_HALLU)`
(js/mondata.js:1222) arm for arm, and `display_canspotmon` is an import
alias of the same `canspotmon` (js/monmove.js:84) — the "dead end, do
not re-check" is accurate. (`sym.mjs` does not resolve import aliases;
found by grep.)

## Density

Legitimate refill under the D-3699 precedent: one C arm, `js/monmove.js`
only + its test, ledger `ported` row kept `ported` with a D-3703 tag
(correct — no status inflation), successor row written to missing-arm
with brief evidence. Not a no-op, no bundling.

## Verification

- Focused test: `node --test scripts/mon-yells-live-you-hear.test.mjs`
  → 6/6 pass (re-ran here).
- Re-measure (`verify mon_yells --base 94f9c2270~1 --reach-all`): `0
  session(s) blocked on it` at baseline — matches the D-log's "note
  hidden" honestly — and `smoke mon_yells: no RNG-tagged reach; fixed
  smoke spread (24 run, 11.8s): 24 PASS, 0 regressed → REACH-OK`. Zero
  regressions, both summary lines cited.
- Scoreboard hunk is a header-only re-stamp (commit/at/full:false), zero
  row changes — no baseline-rewrite vacuity.
- Diff greps clean (no FORCE/DIAG/coords/seeds); Rule #2 clean per the
  iteration `imports.mjs --rulecheck` (review 2573).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
