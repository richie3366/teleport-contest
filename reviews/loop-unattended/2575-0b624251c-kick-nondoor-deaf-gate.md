# Review 2575 — 0b624251c — kick_nondoor pudding-arm Deaf-macro gate (D-3705)

## Metadata

- SHA: `0b624251c19a6124433bf1ccba8415305bb5318f` (2026-10-09, D-3705)
- Scope: ≤10-function refill — whole Method on `kick_nondoor` (1 gate)
- Diff: `js/dokick.js` +5/−1 (gate swap + cites, no import change),
  new `scripts/kick-nondoor-gushing-deaf-gate.test.mjs` (107 lines),
  ledger `kick_nondoor` D-tag, scoreboard header re-stamp only
- Context: omit-2 family, D-3704 Next lead; queue empty, batch no gap

## Intent vs deliverable

Subject promises: C's pudding arm gates the gushing message under the
outer `!Deaf` macro; JS read raw `!(u.Deaf||u.HDeaf)`, dropping
EDeaf/uroleplay.deaf — so an extrinsic/roleplay-deaf + Unaware blind
hero dreamed the gushing where C stays silent. Fix: call the already
imported `hero_Deaf()` in C order. The diff delivers exactly that: one
gate swap plus comment cites, nothing else in `js/`. Promise matches
deliverable.

## Inventory

- `kick_nondoor` (`js/dokick.js`, pudding arm now :757–762): 1 gate
  changed. No new JS function.
- Callee: `hero_Deaf js/monmove.js:1197 sync` — canonical export,
  already imported (js/dokick.js:68, D-3704); no new edge, no
  `imports.mjs --can` needed (nothing re-pointed or deleted).
- The failure analysis is precise: `You_hear`'s inner silence gate is
  `(Deaf && !Unaware) || !acoustics`, so without C's outer `!Deaf` an
  Unaware macro-deaf hero falls through to the dream arm — the old
  raw read's hole is real, not theoretical.

## C ↔ JS fidelity

C locus (`csym.mjs`: body `dokick.c:973–1253`; sole caller `:1468`;
pudding arm `:1209–1223` read in pinned C):

```c
} else if (!(...looted & S_LPUDDING) && !rn2(3) && !(...G_GONE)) {
    Soundeffect(se_gushing_sound, 100);
    if (Blind) {
        if (!Deaf) You_hear("a gushing sound.");   /* :1212–1214 */
    } else {
        pline("A %s ooze gushes up from the drain!", hcolor(NH_BLACK));
    }
    (void) makemon(&mons[PM_BLACK_PUDDING], x, y, MM_NOMSG);
    exercise(A_DEX, TRUE); newsym(x, y); ...looted |= S_LPUDDING;
```

JS: same `rn2(3)`/`G_GONE` ladder, `Blind()` split, new
`if (!hero_Deaf()) await You_hear('a gushing sound.')` — string
byte-identical, gate polarity and position exact. Post-message order
(makemon MM_NOMSG → exercise → newsym → looted) matches C arm for
arm. RNG call-for-call: `You_hear` draws nothing, so — as the subject
states — no RNG delta. Soundeffect correctly absent (no SND_LIB
build). The Klunk "dedup-only" claim was checked, not trusted:
js/dokick.js:749 reads `u.Deaf||u.HDeaf||u.EDeaf||u.uroleplay?.deaf`
inline — macro-equivalent to `hero_Deaf()` — and C's Klunk ladder
(`:1201–1208`: `if (rn2(5))`, `!Deaf` noisy / else plain, exercise,
return) matches JS. ✓ Nit (pre-existing, not this diff): the
!Blind arm hardcodes `'black ooze'` where C prints `hcolor(NH_BLACK)`
(hallu-varying); a live `hcolor` exists (js/do_name.js:356). Future
refill material, not a Must-fix from this SHA.

## Hallucinations / overclaim

None. "No corpus divergence", no movement claimed; sole-caller mapping
(C :1468 → js/dokick.js:1812, unchanged signature) stated and
plausible, module-local `staticfn` shape respected by driving the test
through exported `dokick`.

## Density

Legitimate refill under the D-3699 precedent: one C gate,
`js/dokick.js` only + its test, ledger `ported` kept `ported` with a
D-3705 tag, sibling suite re-run (5/5). Not a no-op, no bundling.

## Verification

- Focused test: `node --test
  scripts/kick-nondoor-gushing-deaf-gate.test.mjs` → 5/5 pass
  (re-ran here).
- Re-measure (`verify kick_nondoor --base 0b624251c~1 --reach-all`):
  `0 session(s) blocked on it` at baseline — matches the D-log's
  "note hidden" honestly — and `reach kick_nondoor: 9 baseline-PASS
  session(s) reach it (9 run, 3.7s): 9 PASS, 0 regressed → REACH-OK`.
  Zero regressions, both summary lines cited.
- Scoreboard hunk is a header-only re-stamp, zero row changes.
- Diff greps clean; Rule #2 clean per the iteration
  `imports.mjs --rulecheck` (review 2573).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
