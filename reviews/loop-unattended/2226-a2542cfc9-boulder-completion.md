# Review 2226 — a2542cfc9 — boulder_hits_pool whole-body completion

Metadata: SHA `a2542cfc9b292bce9d7bd388676aad210ee1cc1b` (D-3265,
2026-10-02). `js/do.js` only (+23/−14). Single function, one C
file. Method below (C do.c:49–155, fetched for 2222).

Intent vs deliverable: subject promises "boulder_hits_pool
whole-body completion (pushing useupf, lava burn_away_slime, steed
whobuf, sfx, impossible arm; boomhit head stale)". The diff
delivers all five arms and the D-log proves the boomhit head stale
with file:line. Delivers what it promises.

Inventory:

- `boulder_hits_pool` (`js/do.js:971`): +impossible arm
  (C :57, then FALSE); +steed whobuf
  (y_monnam/upstart/vtense, C :103–109); +splash Soundeffect ids
  (C :117–121); +burn_away_slime before the lava roll + live
  d(1|3,6) replacing the rn2 loop (C :131–139); tail now
  pushing→useupf(otmp,quan) else obfree(otmp,null) (C :148–151).
- Edges: do_name +y_monnam and shk +obfree extend pre-existing
  edges; new do.js→timeout.js burn_away_slime (D-log cites
  --can SAFE hoisted — verified: `export async function`,
  call-time await); new do.js→generated/seffects_data.js
  (verified 0 imports — pure const leaf, cycle impossible).
  `sym.mjs`: obfree shk.js:4098 sync (sole export — full
  canonical body incl. BOULDER next_boulder, not a stub);
  useupf invent.js:4851 sync export (do.js:128 import — not
  zap.js:885's clone); burn_away_slime timeout.js:1709 ASYNC
  awaited; Soundeffect sndprocs.js:43 sync; y_monnam do_name
  export; impossible display.js:8589 ASYNC awaited (pre-existing
  import); d() rng.js:126 sync. No symbols deleted or
  re-pointed. No clones added (whobuf uses the hacklib upstart
  live import, do.js:14 — no local def exists).

**C ↔ JS fidelity — `boulder_hits_pool`**

- Impossible: C calls impossible() then falls to FALSE; JS
  awaits impossible + returns false ✓.
- Whobuf: `whobuf = usteed ? y_monnam(usteed) : 'you'` +
  upstart/vtense/the(xname)/what — C :103–109 exact ✓.
- Sfx: `Soundeffect(lava ? se_sizzling : se_splash, 100)` +
  shared You_hear — C :117–121 exact ✓.
- Lava: burn_away_slime() before the roll (C :137 order ✓);
  `d(1|3,6)` replaces the `1+rn2(6)` loop — draw-identical
  (rn2(x)=RND(x)+log per rng.js:89–94; d() sums 1+RND;
  only log verbosity changes) ✓; losehp(maybe_half_phys,
  'molten lava', KILLED_BY) ✓.
- Tail: pushing→useupf(otmp, otmp.quan|0) else obfree(otmp,
  null) — C :148–151 exact, replacing the quan=0/OBJ_FREE
  inline for both arms ✓.
- Callers: all 4 C sites wired, signature unchanged ✓ (per
  D-log table; spot-checked moverock pushing=TRUE path).

Hallucinations / overclaim: none. Stale-head claims verified
independently: boomhit is `export async function` at
dothrow.js:2118 (D-log :2116 — 2-line drift) with the wired
caller at :2411 ✓; badspot has zero C references but a
commented-out declaration (do.c:25) — dead ✓. Doc nit (not a
C-wrong): the Fix bullet lists "hacklib upstart" among
"extended" edges, but upstart was already imported (do.js:14)
— no edge changed there.

Density: 1 function whole, 1 file, +23/−14 — below the ~80
floor with the exception documented (generator 0 rows, do.c
otherwise ok/by-design/dead, closure live). `Ledger:
boulder_hits_pool ported` + Verify sub-bullet present. The
D-log's Named omissions now durably records the m_in_air
file-local clone debt I flagged in 2222 — consistent.

Verification: D-log Verify shows green/strict/cohort/full 44/44
+ vacuous + smoke REACH-OK. Re-measured (`hidden-proxy.mjs
verify boulder_hits_pool --base a2542cfc9~1 --reach-all`):
vacuous at baseline (row cited 0 blocks — correctly a note) +
`smoke … 24/24 → REACH-OK`. Zero regressed. Banned-pattern
grep on js/ hunks: clean. Rule #2 clean (2221 run).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
