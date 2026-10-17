# Review 2896 — fa254e8f4 — improvised_notes canonical Unchanging read

- SHA: `fa254e8f4` (cliff, writer port: 1 predicate)
- D-entry: D-4055; Ledger: music.c (`improvised_notes ported`,
  D-4055 appended)
- `js/` diff: `js/music.js` +4/−1 (import + cite + call site);
  new `scripts/music-unchanging-same-song.test.mjs`

## Intent vs deliverable

Promise (subject + D-log): replace the single-flat
`game.u?.Unchanging` read with the canonical polyself
`Unchanging()` (D-4037 class); all three probe sessions move (1
PASS + 2 later owners). Delivers exactly that: one import, one
call site, nothing else touched. Promise = diff.

## Inventory

- `improvised_notes` gate read — music.js:394:
  `Unchanging(game.u || {})`. C: music.c:732–753 (gate :740),
  macro youprop.h:372.

## C ↔ JS fidelity

C (music.c:732–753, csym):

```c
staticfn char *
improvised_notes(boolean *same_as_last_time)
{
    static const char notes[7] = { 'A', 'B', 'C', 'D', 'E', 'F', 'G' };
    /* target buffer has to be in svc.context, otherwise saving game
     * between improvised recitals would not be able to maintain
     * the same_as_last_time context. */

    /* You can change your tune, usually */
    if (!(Unchanging && svc.context.jingle[0] != '\0')) {   /* :740 */
        int i, notecount = rnd(SIZE(svc.context.jingle) - 1); /* 1-5 */
        for (i = 0; i < notecount; ++i) {
            svc.context.jingle[i] = ROLL_FROM(notes);
        }
        svc.context.jingle[notecount] = '\0';
        *same_as_last_time = FALSE;
    } else {
        *same_as_last_time = TRUE;
    }
    return svc.context.jingle;
}
```

```c
#define HUnchanging u.uprops[UNCHANGING].intrinsic  /* youprop.h:370 */
#define EUnchanging u.uprops[UNCHANGING].extrinsic  /* :371 */
#define Unchanging (HUnchanging || EUnchanging)     /* :372 */
```

Old JS read one flat (`!!(game.u?.Unchanging)`); new JS calls
the canonical `Unchanging()` (polyself.js:438: flats + uprops
H||E — same dual-store union as the D-4050 `hallucResisted`
shape). On the probe state (poly + unchanging amulet,
EUnchanging via uprops, all flats unset) C keeps the tune and JS
now does too — the exact fork.
Rest of the body (pre-existing, verified whole): `rnd(5)` = C
`rnd(SIZE(jingle)-1)` 1..5; `NOTES[rn2(7)]` = `ROLL_FROM(notes)`
over the same 7 letters (music.js:97); `jingle.length > 0` ≡
`jingle[0] != 0`; `sameRef.v` = `*same_as_last_time`. RNG
call-for-call: regen arm draws rnd(5)+notecount×rn2(7) on both
sides; keep arm draws nothing. Sole C caller :586 → JS
music.js:729 (same module, pre-wired); `do_play_instrument`
chain pre-wired.
Import safety: polyself `Unchanging` is a hoisted `export
function` — no TDZ on the new music.js→polyself edge (`--can`
at HEAD: ALREADY, since this commit added it; IN-SCC membership
is the norm, not a blocker). The jingle save-persistence gap
(music.c:734–736 comment) is named in the D-entry as latent —
true: no probe crosses save/restore here.
Note: the pre-existing ledger note already claimed "full
Unchanging/jingle/same-flag logic" while the read was
single-flat — the audit note overstated; D-4055 makes it true
without editing the note. History now carries D-4055. Prose only.

## Hallucinations / overclaim

None. Owner-vs-writer discipline is explicit
(do_improvisation verified whole via brief + D-0454, not
re-ported). The RNG-lost=8612 attribution to the regen arm's
draws is the correct direction (C skips what JS drew).

## Density

Cliff writer with movement on all three owned sessions (1 PASS +
2 strictly later owners). Whole-function holds. One `Ledger:`
entry, accurate. No unreached work.

## Verification

Re-measure:

```text
verify do_improvisation: baseline fa254e8f4~1 — 3 session(s) blocked on it
  scen-sweep-Caveman-610105: moved → process_menu_window at step 1484 (was 1355)
  scen-sweep-Ranger-50055084: moved → chwepon at step 1092 (was 1047)
  scen-sweep-Rogue-50055102: PASS
verify do_improvisation: 1 PASS, 2 moved past, 0 unchanged, 0 worse → PROGRESS
```

Exact match, same owners and steps. Focused test RED
(byte-identical joined line) → GREEN claimed. No FORCE/DIAG/seed
strings. Rule #2 clean (window rulecheck).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
