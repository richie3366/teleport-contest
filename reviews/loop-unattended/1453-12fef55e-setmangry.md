# Review 1453 — 12fef55e — `mon.c` setmangry whole-body port (D-2494)

Metadata: SHA `12fef55e`, `js/mon.js` +106/−24, `js/vault.js` +31/−5 (js total ~137 insertions).
C `mon.c:4260–4318` (`setmangry`), `mon.c:4134–4159` (`qst_guardians_respond`, staticfn),
caller `vault.c:526`. D-log: D-2494.

## Intent vs deliverable

Promise: restart thin `setmangry` in C order — Elbereth hypocrite arm
(`:4272–4284`, `rnd(5)` RNG), `qst_guardians_respond` arm (`:4311–4313`),
plus wire the unwired C caller `vault.c:526` (dead-Croesus guard anger).
Diff delivers exactly that: Elbereth arm, waitmask/mpeaceful/tame gates,
priest coalign arms, humanoid/shk/gd `couldsee` arm, quest-leader gate,
`peacefuls_respond` gate, new module-local `qst_guardians_respond`,
`Blind()`/`Hallucination()` locals, and the `invault` Croesus split.
Promise = deliverable.

## Inventory

- Changed: `setmangry` restarted; new locals `Blind`, `Hallucination`,
  `qst_guardians_respond`; import lines extended (HEADSTONE, pline_The,
  del_engr_at, makeplural — all existing edges).
- Changed: `invault` Croesus branch split on `mvitals[PM_CROESUS].died`;
  new imports `MON_WEP`/`mon_wield_item` (weapon.js), `setmangry` (mon.js),
  `NEED_HTH_WEAPON` (const.js).
- `sym.mjs` (required): `setmangry` js/mon.js:1393 ASYNC; `MON_WEP`
  js/weapon.js:86 sync; `mon_wield_item` js/weapon.js:724 ASYNC (awaited ✓);
  `qst_guardians_respond` NOT EXPORTED + 1 local in js/mon.js:1361 —
  expected: C declares it `staticfn`, so a module-local JS function is the
  correct shape, not a clone.

## C ↔ JS fidelity

`setmangry` ≡ C `:4260–4318`, branch by branch:

```c
if (via_attack && sengr_at("Elbereth", u.ux, u.uy, TRUE)
    && (onscary(u.ux, u.uy, mtmp) || mtmp->mpeaceful)) {
    You_feel("like a hypocrite.");
    adjalign((u.ualign.record > 5) ? -5 : -rnd(5));
    if (!Blind) pline("The engraving beneath you fades.");
    del_engr_at(u.ux, u.uy);
}
```

JS inlines strict `sengr_at` (`engrave.c:250–261`: type ≠ HEADSTONE,
time ≤ moves, strict `!strcmpi(actual_text)`) via live `engr_at` +
`txt.toLowerCase() === 'elbereth'` — strict equality ≡ `!strcmpi` ✓;
HEADSTONE skip ✓, `engr_time <= game.moves` ✓, `onscary || mpeaceful` ✓,
`record > 5 ? -5 : -rnd(5)` verbatim ✓, `!Blind()` pline ✓, `del_engr_at` ✓.
RNG: single `rnd(5)` in the false-record arm only, call-for-call.

Remainder: waitmask clear before the mpeaceful gate ✓ (C order);
`!mpeaceful`/`mtame` early returns ✓; priest `p_coaligned ? -5 : +2`
else `-1` ✓; humanoid/shk/gd `couldsee` → `pline_mon` else `growl` ✓.
Quest-leader gate: C compares `mtmp->data == &mons[quest_info(MS_LEADER)]`;
`quest_info(MS_LEADER)` returns `urole.ldrnum` (`questpgr.c:31–44`), so the
JS mndx-vs-`urole.ldrnum` compare is pointer-identity by index ✓ (same for
`qst_guardians_respond`: `MS_GUARDIAN` → `urole.guardnum`, `who` from
`pmnames[guardnum][NEUTRAL]` ≡ `q_guardian->pmnames[NEUTRAL]` ✓).
`qst_guardians_respond` ≡ `:4134–4159`: fmon sweep, DEADMONSTER skip
(C `#define DEADMONSTER ((mon)->mhp < 1)`, `monst.h:214` ≡ JS `mhp <= 0` ✓),
guardian-mndx + mpeaceful → clear, `canseemon` → `got_mad`,
Hallucination-gated `pline_The` with `makeplural` past one ✓.
`peacefuls_respond` under `!mon_moving` ✓.

`invault` dead arm ≡ `vault.c:513–542`: `setmangry(guard, FALSE)` →
Deaf ? Blind-gated mouths-very-angry `pline` : `SetVoice` + `verbalize`
("Back from the dead…") → `!MON_WEP` → `NEED_HTH_WEAPON` +
`mon_wield_item`, then return ✓. Cycle: `imports.mjs --can vault.js
weapon.js mon_wield_item` → ALREADY; `--can vault.js mon.js setmangry` →
ALREADY (no new edge, existing SCC).

Callee closure: all LIVE (You_feel, adjalign, pline, pline_mon,
pline_The, makeplural, vtense, canseemon, growl, del_engr_at, engr_at,
onscary, p_coaligned, SetVoice, verbalize, MON_WEP, mon_wield_item) or
C-matched locals (Blind/Hallucination follow the do.js youprop idiom;
`sym.mjs Blind` shows 31 pre-existing per-module clones — #32 follows the
established convention, semantics match `youprop.h`). No STUB in a live arm.

## Hallucinations / overclaim

None. "No new module pair" true (both `--can` ALREADY). "REACH-OK, no
session blocked" matches the re-run below. Alive-Croesus dialogue
(`:514–523` waves-goodbye/sorry) is named in the D-log, not hidden.

## Density

Breadth-phase correct: one C function + its staticfn + one C caller in the
same iteration, ~137 JS lines for a 59+26-line C pair. Right-sized.

## Verification

Re-ran here (`--base 12fef55e~1 --reach-all`):

```text
verify setmangry: baseline 12fef55e~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke setmangry: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
```

0 blocked both sides (vacuous, as the D-log states — coverage row, no
queue row cited blocks). `imports.mjs --rulecheck`: Rule #2 clean. Diff
grep: no FORCE/DIAG/`getRngLog`/seed/fastforward/coords (one `BOLT_LIM`
false positive on the pattern).

## Actionable C-wrongs

None. No Must-fix.

Verdict: **ACCEPT**
