# Review 1080 — 229b25e1 — prisoner_speaks + quest_talk MS_DJINNI arm

Metadata: SHA `229b25e1`, D-2114, `js/quest.js` only (50 lines).
No prior review claims this SHA.

Intent vs deliverable: the subject promises `prisoner_speaks` in exact C
order plus the `quest_talk` MS_DJINNI arm.
The diff delivers exactly that: new `prisoner_speaks` + `quest_talk`
switch with the DJINNI arm and the previously-missing C-order leader
`return`.

Inventory: one new function, one extended function, two file-local
consts, five extended import edges.

**C ↔ JS fidelity**: C `prisoner_speaks` (`quest.c:450–470`, 21 lines):

```c
if (mtmp->data == &mons[PM_PRISONER]
    && (mtmp->mstrategy & STRAT_WAITMASK)) {
    if (canseemon(mtmp))
        pline("%s speaks:", Monnam(mtmp));
    SetVoice(mtmp, 0, 80, 0);
    verbalize("I'm finally free!");
    mtmp->mstrategy &= ~STRAT_WAITMASK;
    mtmp->mpeaceful = 1;
    adjalign(3);
    (void) angry_guards(FALSE);
}
```

JS walks it line by line: mndx-compare (the correct pointer→value
idiom) + STRAT_WAITMASK → canseemon / Monnam pline → SetVoice (kept
despite the !SND_LIB no-op, C order ✓) → verbalize → clear waitmask →
mpeaceful=1 → adjalign(3) → `await angry_guards(false)` (async lift is
call-safe).
C `quest_talk` (`quest.c:495–511`): leader check + `return` (the old JS
fell through — adding it matches C and can only remove a double-speak),
`switch (msound)` with DJINNI→prisoner_speaks ✓.
MS_NEMESIS→`nemesis_speaks` correctly named — required check:

```text
nemesis_speaks   NOT FOUND in js/** (no export, no local function/const).
```

So the named omit is legitimate, not a hidden stub.
`MS_DJINNI = 29` verified against `monflag.h:44`.
STRAT_WAITMASK is a pre-existing import.
Callee closure (`--can` output):

```text
ALREADY: quest.js already statically imports mon.js. No new edge needed.
ALREADY: quest.js already statically imports do_name.js. No new edge needed.
```

RNG: none on this path (pline / verbalize / align draw nothing).

Hallucinations / overclaim: none.
The old header already listed `prisoner_speaks` as deferred and the
diff retires exactly that line.

Density: 50 insertions, one C function + one switch arm — §2b ok.

Verification: D-log cites hidden 1 PASS (Rogue-92210).
Re-measured (`--base 229b25e1~1`):

```text
scen-wish-Rogue-92210: PASS
verify prisoner_speaks: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
```

Genuine full PASS. No seed / step / coordinate read.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
