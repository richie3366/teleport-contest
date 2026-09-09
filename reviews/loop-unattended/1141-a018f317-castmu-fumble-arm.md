# Review 1141 — a018f317 — mcastu.c castmu fumble arm (D-2175)

Metadata: SHA `a018f317`, js/ +12/−3 in `mcastu.js` (+4 import
names; 2 to already-imported modules). D-log D-2175. Subject
promises: JS burned the fumble `rn2(ml*10)` but skipped the
air-crackles pline, losing the `--More--` (Monk-92013 79→121).

Intent vs deliverable: promise matches diff. Actually adds: the
fumble-arm body (Soundeffect + gated pline) replacing the
`air-crackles pline deferred` comment. One 9-line C arm — C is
that small.

Inventory: no new functions, no deleted symbols. Callee closure
(all LIVE via `sym.mjs`): `Soundeffect` (sndprocs.js:36, sync),
`se_air_crackles` (generated/seffects_data.js:5, const),
`set_msg_xy` (display.js:7194), `mon_nam` (do_name.js:1025),
plus `nomul`/`rn2`/`canseemon`/`Deaf` already in scope. No STUB,
no clone. `--can mcastu.js sndprocs.js Soundeffect` → ALREADY
(no new edge).

**C ↔ JS fidelity**: confirm against pinned C `mcastu.c:207–215`
(read at HEAD). Order exact: `nomul(0)` → `rn2(ml*10) <
(mconf?100:20)` → unconditional `Soundeffect(se_air_crackles,
60)` → `canseemon(mtmp) && !Deaf` gate → `set_msg_xy(mx,my)` →
`pline_The("air crackles around %s.", mon_nam(mtmp))` →
`return M_ATTK_MISS`. JS renders `pline_The` as plain `pline`
with the literal `The air crackles around …` per repo convention
— byte-identical output. `Soundeffect` is display-silent without
SND_LIB (sound only), so the `--More--` returns from the real
second pline, not a tty hack — D-1831-clean, as the D-log
states. No RNG added or moved (the `rn2` predates this SHA).

Notable honesty: the D-log corrects D-2174's misread ("silent,
reads as !canseemon or Deaf") with the step-80 C screen proving
the pline fired, and names the proxy misattribution (visible
topline owned by the gate fn, writer in this arm). The queue row
was checked off only because the session moved to a *later*
owner — the savelife-lesson rule applied correctly.

Hallucinations / overclaim: none.

Density: ~12 insertions for a 9-line C arm — right-sized.

Verification: D-log cites `verify.mjs --fn mhitm_mgc_atk_negated`
→ 0 PASS + 1 moved past, green 2/2, strict ×2, cohort 7/7.
Re-measured independently: `hidden-proxy.mjs verify
mhitm_mgc_atk_negated --base a018f317~1` → baseline 1 blocked,
`0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS`
(Monk-92013 79→121 mcast_disappear). Exact match — movement, not
a vacuous "no session blocked" claim. `rulecheck` clean. No
DIAG/FORCE/seed gates.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
