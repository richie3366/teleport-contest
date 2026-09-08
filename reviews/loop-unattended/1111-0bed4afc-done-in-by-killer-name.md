# Review 1111 — 0bed4afc — done_in_by killer-name arms (D-2145)

Metadata: SHA `0bed4afc`, `js/end.js` only (+39/−14 in `js/`).
Queue row fired: Open `mkobj.c start_corpse_timeout`
(scen-wish-Barbarian-92102). No prior review claimed closed.

## Intent vs deliverable

Subject promises NEUTRAL-epitaph + 2-col-overview-shift fixes via
`done_in_by` killer-name arms. Diff delivers the killer-name arms
(G_UNIQ gate, minvis/distorted prefixes, isshk append fix, gendered
`pmname` + mgivenname suffix). No positioning code changes — the
overview shift resolved as a name-length consequence (see below).

## Inventory

- `done_in_by` (extended): mptr/champtr/distorted/mimicker/imitator
  decls, G_UNIQ gate, prefix arms, isshk append, plain-arm rewrite.
- Imports: same-edge extensions only (display/do_name/const/monsters);
  `pmnames` dropped (verified zero remaining uses in `end.js`);
  local `PM_HIGH_CLERIC` const.

## C ↔ JS fidelity

Walked `end.c:184–282` against the new JS. Decls match C exactly
(`mptr=mtmp->data`, `champtr`, `distorted=Halluc&&canspotmon`,
`mimicker`, `imitator`), with null-safe `?? mons(mnum)` adapters.
G_UNIQ gate reproduces all three conjuncts including
`!(imitator && !mimicker)` and the High-Cleric `!ispriest` condition
(`mnum`-compare stands in for C's `mptr==&mons[...]`; identical on the
non-imitator path). `type_is_pname` no-`the` arm exact. minvis +
`hallucinogen-distorted` in C order (monhealthdescr slot stays a named
omit — `monhealthdescr` not live in `js/`). isshk arm now appends
(`+=`) per C `Sprintf(eos(buf))` — the old overwrite (`=`) was a real
latent C-wrong this commit fixes. Plain arm is
`pmname(mnum, Mgender) + of/called + MGIVENNAME`, matching C's
`pmname(mptr, Mgender)` + `has_ebones?of:called` (mptr≡mons[mnum] here).
Imitator/ghost/priest-minion arms are named omits, and the map edit in
this commit actually names them (`turns.md:1693`, ghost/imitator+
vampshifter/m_monnam/monhealthdescr/multi_reason). Callee closure all
LIVE, exports imported (not the file-local clones flagged by `sym.mjs`
for canspotmon/type_is_pname — end.js takes the display.js/do_name.js
exports; correct). Notably end.js imports the live `Hallucination`
(display.js), avoiding the artifact.js-clone trap. Branch-by-branch
confirm for the shipped arms.

## Hallucinations / overclaim

Minor subject-scope note, not a fidelity issue: the subject advertises
a "2-col overview shift" fix but no positioning/wintty code changed
(D-log discloses H2344 left untouched). The shift in 92102 was
name-length-derived (wrong gendered name → recentered block) and is
gone (71/71 screens PASS); residual overview-header divergence in
92140/92050 is disclosed with its distinct cause (unported helpless
suffix). Body is honest throughout, including the stale-row analysis:
the recorded step-39 RNG divergence did not reproduce (dice-level
evidence given), and the commit shipped the live residual instead of
force-fitting the recorded owner. No seed/step/coordinate gates.

## Density

One function envelope, ~39 insertions — right-sized §2b unit.

## Verification

D-log Verify: `verify.mjs --fn start_corpse_timeout` → 1 PASS +
green/strict/cohort + full 44/44. Re-measured myself:
`hidden-proxy.mjs verify start_corpse_timeout --base 0bed4afc~1` →
`1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS`
(scen-wish-Barbarian-92102: PASS). Exact match.
`imports.mjs --rulecheck`: Rule #2 clean. No FORCE/DIAG/seed gates.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
