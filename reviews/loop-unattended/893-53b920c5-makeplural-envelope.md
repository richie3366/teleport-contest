# Review 893 — 53b920c5 — makeplural full envelope (D-1923)

Metadata: SHA `53b920c5`, D-1923. Files: `js/objnam.js`
(+270/−38: helpers + tables + `makeplural` rewrite).
Map-driven Open row, 0 corpus blocks cited. Next index 893.

Intent vs deliverable: subject promises the full plural envelope
with `singplur_lookup`, `badman`, `ch_ksound` live. The diff
delivers it: head/excess split (recursion removed, as C), strip,
`'s`, lookup, ya, man→men, f→ves, ium/alga/us/sis/eau/matzoh/dex/
zxs-ato-dingo/y/default. `makesingular` untouched (second hunk is
`makeplural` only; the first hunk only inserts helpers after
`makesingular`'s tail). Promise ≡ diff.

Inventory: new file-local CLONEs of static C fns — `badman`,
`ch_ksound`, `singplur_lookup_plural`, `strcasecpy_at`/
`chrcasecpy`/`eqCI`/`plural_lowc`/`plural_letter` — plus tables.
No cross-module edge added, no stub, no symbol deleted (old fox
hack and suffix loop were inline code). `badman`'s `!to_plural`
direction is ported-but-uncalled, named for the future
`makesingular` port. `impossible()` log named-omit with the `"s"`
return kept (C `:2841` behavior).

**C ↔ JS fidelity** (`csym makeplural` → `objnam.c:2835-3022`,
`singplur_lookup` → `:2707-2779`, `badman` → `:3193-3239`,
`ch_ksound` → `:3167-3191`, `strcasecpy`/`chrcasecpy` →
`hacklib.c:300-341`, all read in full): arm order and every guard
verified literal-for-literal — pronoun/highc, pair-of pre-split,
compound split, blank strip with `end>0`, `'s`, lookup-before-ya,
man→men `Strcasecpy(spot-1,"en")`, f→ves with erf falling through
the later arms exactly as C's sequential ifs do (the C comment
says "fall through to default" but the structure falls through
the arms — the D-log's reading is correct), ium/alga/us with the
lotus/wumpus guards, sis, eau with the BSTRCMPI bureau guard
(`len<6 || !bureau` — exact, including the short-word-true
subtlety), matzoh-6 before matzo-5, dex with the index guard,
zxs/ch/sh with the k-sound guard + ato/dingo, consonant-y
(including quy-keeps-s via the vowel set), default +s.
`no_men` 36/36 and `no_man` 31/31 entry-identical in order;
`ch_k` 19/19; `already_plural` covered via the `alt_as_is`
parameter slot; `BSTRNCMPI` underflow guards (`spot<0 → continue`,
`len>=k` checks) exact. One real gap (see below): the
`strcasecpy_at` overrun case source.

Hallucinations / overclaim: none. The `supermen` probe note
correctly blames the probe (C `no_men[]` carries `superhu`, so C
also yields `supermen`) — port unchanged. 116/116 C-derived
expectations genuinely pass.

Density: 308-line single-function envelope — at the ceiling but a
single locus with table data; justified, not two subsystems.

Verification: re-measured `hidden-proxy verify makeplural --base
53b920c5~1` → `0 session(s) blocked on it (0 at baseline, 0 in the
working scoreboard)` — vacuous as stated, nothing owed.
`imports.mjs --rulecheck` → Rule #2 clean (HEAD). D-log gates:
green 2/2 + strict ×2, cohort 7/7. Diff grep: no FORCE/DIAG/seed/
coordinate patterns.

**Actionable C-wrongs**:

1. `strcasecpy_at` overrun case source (`js/objnam.js`): the
   fallback reads `base[at - 1]`, but C `strcasecpy`
   (`hacklib.c:321-341`) reads the just-written char
   (`oc = *(dst - dst_exhausted)`). Replicated with an isolated
   copy of the shipped helper: `CHILD`→`CHILDren`,
   `OX`→`OXen`, `MUMAK`→`MUMAKil`; C gives
   `CHILDREN`/`OXEN`/`MUMAKIL`. Fires only on all-caps heads
   hitting longer one_off plurals (Title-case `Child`→`Children`
   matches; all append arms use `at=len>0` where both rules
   coincide) — no in-game caller produces such input, gates stay
   green. Fix: replace the `base[at - 1]` fallback with the
   just-written char `out[out.length - 1]` (exactly C in all
   reachable states; `out` is provably non-empty at any overrun).
   One line, no caller changes, queueable in one port iter.

Verdict: **ACCEPT-WITH-DEBT**
