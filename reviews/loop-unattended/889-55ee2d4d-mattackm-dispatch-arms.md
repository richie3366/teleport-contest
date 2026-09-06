# Review 889 — 55ee2d4d — mattackm remaining dispatch arms (D-1919)

Metadata: SHA `55ee2d4d`, D-1919. Files: `js/mhitm.js` (+126/−11:
imports, `mswingsm`, preamble, swing call, petrifier/unsolid/
pudding/BREA/SPIT/epilogue arms) and `js/mhitu.js` (one-word
`export` on the Conflict reader). Map-driven Open row, 0 corpus
blocks cited. Next index 889.

Intent vs deliverable: subject promises preamble guards,
`mswingsm`, petrifier/unsolid/pudding/BREA/SPIT arms, and epilogue
returns. The diff delivers all eight, plus the `Conflict` export so
mattackm imports instead of cloning. Promise ≡ diff.

Inventory: new `mswingsm` (file-local CLONE of the static C fn, in
C `:1282–1297` order — the only faithful shape for a staticfn).
`Conflict` re-pointed local-clone→import (`sym.mjs Conflict` →
`js/mhitu.js:195 sync`; pasted as required). New imports
`is_pole`/`mswings_verb`/`mon_offmap`/`mintrap`/`breamm`/`spitmm`/
`clone_mon`/`is_elf`/`is_orc`/`mhis`/`mon_visible`/`a_monnam`/
`ART_SNICKERSNEE` are all LIVE (`sym.mjs breamm` →
`js/mthrowu.js:427 ASYNC`, `spitmm` → `:351 ASYNC`, both awaited;
`--can` on both edges → ALREADY, no new cycle). No stub added; no
new omit beyond the named ones (distant-AT_WEAP `thrwmm` since
`monshoot` is still a clone in mthrowu; Unaware/HIDE_UNDER arms with
absent `Unaware`/`last_hider` state — all named in code + map).

**C ↔ JS fidelity** (`csym mswingsm` → `mhitm.c:1282-1297`;
`csym mattackm` → `mhitm.c:292-592`, both read in full): swing
gate/format/bash/`quan>1` exact (repo `verbose!==false` idiom;
`Blind_slee()` is a pre-existing C-cited Blind clone reused here,
not clone #2 — verified at `js/mhitm.js:942`). Grid-bug early MISS
(C `:316-317`) exact. mundetected clear + `newsym` + generic
notice arm (C `:327-352`; the Unaware-dream and HIDE_UNDER/
`last_hider` branches are the named omits). Elf-vs-orc `tmp++`
(C `:354-355`) exact. Swing call inside the MON_WEP arm guarded by
`_mm_vis` ≡ `gv.vis` (C `:413-414`) exact. Petrifier
`strike=0;break` with `attk` left set so passivemm still runs
(C `:434-439`) exact. Unsolid + `failed_grab` pre-check
(C `:447-453`) exact. Pudding split — IRON=11/METAL=12 with
objclass.h cites, `mhp>1`, `!mcan`, black/brown identity,
`clone_mon` + `mintrap(mclone, NO_TRAP_FLAGS)` + AGR_DIED fold,
message wording (C `:455-472`) — exact. BREA/SPIT `monnear` gate +
dead folds + else `strike=0;attk=0` (C `:538-559`) exact.
Epilogue AGR_DONE/helpless/`mon_offmap` returns (C `:581-586`)
exact. No RNG line reordered (`rnd(20+i)` untouched).

Hallucinations / overclaim: none. The D-log claims no corpus
movement and no probe, which matches a 0-block map row — no
"Match C dispatch, stubbed callee" gap: every wired callee is a
live import.

Density: ~126 insertions, one dispatch envelope — right-sized per
§2b (one switch, one locus family).

Verification: re-measured `hidden-proxy verify mattackm --base
55ee2d4d~1` → `0 session(s) blocked on it (0 at baseline, 0 in the
working scoreboard)` — vacuous as stated, nothing owed.
`imports.mjs --rulecheck` → Rule #2 clean (HEAD). D-log gates:
green 2/2 + strict ×2, cohort 7/7. Diff grep: no FORCE/DIAG/seed/
coordinate patterns.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
