# Review 3050 — 0b2c76c03 — zapyourself's resistance arms call shieldeff + monstseesu

- SHA: `0b2c76c03` (cliffs head after Grow #21: owner distfleeck,
  parked SYMPTOM, scen-sweep-Valkyrie-52450012 step 506)
- D-entry: D-4210; Ledger: zapyourself ported (zap.c `2705–3013`; csym `:2704–3013`,
  js=zap.js:zapyourself)
- `js/` diff: zap.js +20 −6

## Intent vs deliverable

Promise: zap.c zapyourself tells every monster that sees the hero about
a resistance it just showed. Each resistance arm (striking, lightning,
fire, cold, magic missile, sleep) calls shieldeff + monstseesu(M_SEEN_x)
when resisted and monstunseesu(M_SEEN_x) when felt (`:2716–2863`). JS
had deferred all of them. So after a Valkyrie zapped cold at herself,
the adjacent silver dragon still treated frost breath as an available
ranged attack and breathed while fleeing, where C's dochug lets it
retreat. All six arms are now wired in C order.

Diff: in six arms, each "deferred" comment is replaced with C's calls,
18 in all: 6 `await shieldeff(u.ux, u.uy)`, 6 `monstseesu(M_SEEN_x)`
and 6 `monstunseesu(M_SEEN_x)`. All three callees were already imported.
No other lines changed. The promise matches the diff.

Owner/writer: distfleeck is the symptom painter. The commit fixes the
writer of the dragon's `mseenres` that a temporary stack at breamm
named (dochug's MMOVE_MOVED arm `monmove.c:944–948` →
ranged_attk_available `mhitu.c:2413–2425` → m_seenres(M_SEEN_COLD)), not
the symptom owner. This is a valid §10.18 cliff.

## Inventory

- zapyourself — js/zap.js (C zap.c `:2705–3013`), six arms touched:
  striking/force bolt :4843–4860, sleep :4785–4800, fire :4972–4984,
  cold :4995–5007, lightning :5018–5030, magic missile :5040–5055.
- Callees (all LIVE, none re-pointed, none deleted):

```text
node scripts/sym.mjs shieldeff
shieldeff        js/display.js:6183   ASYNC — await required
node scripts/sym.mjs monstseesu
monstseesu       js/mondata.js:1113   sync
node scripts/sym.mjs monstunseesu
monstunseesu     js/mondata.js:1124   sync
```

shieldeff is async and awaited at all 6 sites. monstseesu and
monstunseesu are sync and called bare, which is correct.

## C ↔ JS fidelity

Arm by arm against C (lines from the pinned body):

| arm | C resisted | C felt | JS |
|---|---|---|---|
| WAN_STRIKING/SPE_FORCE_BOLT | `:2716` shieldeff, `:2717` «Boing!», `:2718` seesu(MAGR) | `:2720–2725` bash/d(), exercise, `:2726` unseesu | same order ✔ |
| WAN_LIGHTNING | `:2739` shieldeff, msg, `:2741` seesu(ELEC), ugolemeffects | msg, exercise(A_CON), `:2737` unseesu | same ✔ |
| WAN_FIRE/FIRE_HORN | `:2757` shieldeff, «rather warm.», seesu(FIRE), ugolemeffects | afire, damage, `:2764` unseesu | same ✔ |
| WAN_COLD/SPE_CONE/FROST_HORN | `:2778` shieldeff, «a little chill.», seesu(COLD), ugolemeffects | popsicle, damage, `:2785` unseesu | same ✔ |
| WAN/SPE_MAGIC_MISSILE | `:2794` shieldeff, «missiles bounce!», seesu(MAGR) | d(4,6), Idiot, `:2800` unseesu | same ✔ |
| WAN/SPE_SLEEP | `:2855` shieldeff, «don't feel sleepy!», seesu(SLEEP) | msg, `:2863` unseesu, fall_asleep(-rnd(50)) | same ✔ |

The RNG order is unchanged: the `d(12,6)` orig_dmg still comes before
the resistance test, and `d(2,12)` / `d(1+spe,6)` / `d(4,6)` / `rnd(50)`
are in the same positions. None of the three callees draws RNG.

Callee bodies:
- monstseesu / monstunseesu (C mondata.c `:1557–1568`, `:1571–1582`).
  JS: the `M_SEEN_NOTHING || u.uswallow` return, then the fmon walk with
  `mhp < 1` (DEADMONSTER) skipped and `m_canseeu` → m_setseenres /
  m_clearseenres. Whole. ✔
- shieldeff (C display.c `:1109–1124`). JS: the `flags.sparkle` gate,
  `cansee`, a SHIELD_COUNT loop of show_glyph + flush_screen(1) +
  nh_delay_output, then newsym. Whole (its named DEC remap omission is
  pre-existing). ✔

Case-label closure vs C: JS lacks only `SPE_DETECT_UNSEEN` and
`WAN_NOTHING`, which C sends to a bare `break` (`:2955–2959`). JS sends
them to `default: break`, which is net-identical. C's default is
`impossible("zapyourself: object %d used?")` (`:3004–3006`), and JS's
default prints nothing. That only matters for an otyp no caller passes
(callers: apply.c:95/104/4122, music.c:619, spell.c:1428/1501,
zap.c:2658), so it is unreached and noted only.

## Hallucinations / overclaim

None. "All eighteen calls" counts correctly (6 × 3; grep of the
zapyourself body finds 18 C sites and 18 JS sites). "Named omissions:
none in the six arms" is true.

## Density

One C function's six resistance arms completed, on the cliffs-head
writer. Right-sized.

## Verification

```text
node scripts/hidden-proxy.mjs verify distfleeck,zapyourself --base 0b2c76c03~1 --no-reach
  scen-sweep-Valkyrie-52450012: PASS
verify distfleeck: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
verify zapyourself: no corpus session is blocked on it at 0b2c76c03~1 (vacuous; owner is distfleeck)
Rule #2: imports.mjs --rulecheck clean (HEAD, review 3047)
```

The diff grep hits only `SPE_FORCE_BOLT` for "FORCE", a case label and
not a FORCE flag. There are no seed, RNG-index or coordinate reads.
shieldeff adds flush_screen/delay frames to every resisted self-zap, so
the D-log's `sweep moveloop_core` (673 with 0 regressed) and
`reach zapyourself 27/27` are the relevant guards. The audit's final
rescore re-checks them.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
