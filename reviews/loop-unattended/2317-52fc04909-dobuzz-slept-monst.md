# Review 2317 — 52fc04909 — dobuzz completion + slept_monst canonical

Metadata: SHA `52fc04909`, D-3361, C `zap.c:4788–5037`
(csym misses the K&R signature — body read via sed,
:4780–5037) + `mhitm.c:1249–1257`. Stat: js/zap.js +268/−73,
js/mhitm.js +23/−23, new test (70 lines, 5/5).

Intent vs deliverable: subject promises "dobuzz completion
(uswallow/reflect/Rider/Death/otmp/steed/mines/bhitpos) +
slept_monst canonical export". Diff actually: 11 dobuzz
arms in C order behind a `buzzmonst` closure, canonical
async `slept_monst`, 6 same-edge import additions. Matches
promise — but the steed exit is wrong (see C-wrong 1).

Inventory (dobuzz): 11 arms ported; all callees LIVE
(mon_reflects mhitu.js:3501 async deterministic;
map_invisible/unmap_invisible display.js; eyecount
monsters.js:1022; slept_monst new; m_useup mthrowu sync;
sticks via mhitm's engrave import — the C-exact definer).
No stub, no clone. `buzzmonst` closure models the C :4867
label.

Inventory (slept_monst): 1 new **C callee** at
js/mhitm.js:1422 + 1 same-file clone deleted (2 sites
rewired). music.js:268 + potion.js:3745 (`slept_monst_pot`)
clones remain; zap.c:486 bhitm WAN_SLEEP arm unwired.

C ↔ JS fidelity (dobuzz): branch-by-branch confirm except
the steed exit. hdmgtype rn2(6) first even when swallowed
(:4799) ✓; uswallow zhitm→rips-into→MAGIC_COOKIE→killed
(:4804–4821) ✓; newsym→rn1(7,7)→save_bhitpos order ✓;
invis map/unmap (:4843–4847) + post-floor re-fetch (:4861)
✓; reflect reversal-outside-canseemon + gas_hit-inside
(:4874–4884) ✓ with C-exact `exclam(0)` (:4875); Rider
reintegrate/resurrect + mhp restore outside canseemon +
break (:4887–4905) ✓; PM_DEATH absorb + break (:4906–4911)
✓; otmp armor pline + m_useup (:4934–4941) ✓; slept/wakeup
in both sub-arms (:4942–4944) ✓; Mines bchance 20
(:5014–5016) ✓; bhitpos restore (:5035) ✓. RNG
call-for-call: rn2(6), rn1(7,7), steed rn2(3) after nomul
in C position; mon_reflects draws none.

C-wrong 1 (steed exit): C :4956–4959 `goto buzzmonst`
jumps into the `if (mon)` branch — after the labeled block,
control leaves the whole if/else-if chain, SKIPPING the
u_at tail (`flashburn(d(nd,50))` :4988–4989,
`stop_occupation()` :4990, `nomul(0)` :4991). JS
(js/zap.js:2586) falls through to that tail (:2630–2634):
a bolt meeting the steed burns an extra `d(nd,50)` RNG draw
+ flashburns (lightning), stops the occupation and clears
multi — C does none. The code comment ("still runs
flashburn/stop_occupation below") asserts the wrong exit as
intended, and js/zap.js:2590 still says "Steed rn2(3) still
named". Trigger: riding + bolt through hero square +
rn2(3)==0; rare, real (ride-pony sessions exist).

C ↔ JS fidelity (slept_monst): exact — `helpless &&
mon===ustuck && !sticks(youmonst.data) && !uswallow` →
pline + live `unstuck()` (replaces hand-clear + adds the
sticks arm). Callers: uhitm.c:3490/3519 verified inside C
`mhitm_ad_slee` (:3479) = JS mhitm_ad_slee ✓; zap.c:4946 →
buzzmonst both post-hit branches ✓. C-wrong 2: 3 of 5 C
call sites unwired while Ledger says "ported" — music.c:95
(js/music.js:286→local clone), potion.c:1806
(js/potion.js:4003→`slept_monst_pot`), zap.c:486 (no JS
bhitm WAN_SLEEP arm). D-log names them ("queued next") but
no row was ever written and the map has no slept/WAN_SLEEP
line — the gaps evaporate unless queued.

Hallucinations / overclaim: (a) the "queued next" promise
is false — D-3361's refill wrote 5 other rows; no
flash_str/slept/WAN_SLEEP row exists at HEAD. The
flash_str omit survives via the map (turns.md:3367) but the
slept/WAN_SLEEP omits are D-log-only. (b) "message-text-only"
for the nohallu suppression is imprecise: C flash_str(FALSE)
under Hallucination calls `rnd_hallublast()` (zap.c:4811ff
body) — RNG + message, not message-only. The suppression
pattern itself is pre-existing and map-named; only the
characterization is corrected here, no row.

Density: 2-function cluster (dobuzz whole modulo named
omits; slept_monst whole body, 3 callers pending), each
with D-log C-locus/JS/Callers/Verify/Named + `Ledger:`
(dobuzz partial ✓ accurate; slept_monst ported — overstated
while 3 callers dangle, feeds C-wrong 2) + combined
`verify.mjs` + 5/5 test (fails pre-change ✓ re-ran: 5 pass,
0 fail). Per function: dobuzz QUALITY-RISK (C-wrong 1);
slept_monst QUALITY-RISK (C-wrong 2).

Verification: re-measured — `verify dobuzz,slept_monst
--base 52fc04909~1 --reach-all` → dobuzz "1 blocked at
baseline → scen-impaired-Rogue-94110 moved →
rnd_hallublast at step 89 (same step), 0 worse → PROGRESS"
+ "reach: 40 baseline-PASS reach it: 40 PASS, 0 regressed →
REACH-OK"; slept_monst "0 blocked" + "smoke 24/24 →
REACH-OK". Matches every D-log number (40/40 exact). The
zero-regressions do not cover the steed path (no corpus
session rides into a bolt). `--can`: zap→mhitm,
zap→mhitu ALREADY (all 6 edits extend existing braces).
Rule #2 clean. Diff grep: 0 banned hits. `sym.mjs`
(required paste):

```text
mon_reflects     js/mhitu.js:3501   ASYNC — await required
unmap_invisible  js/display.js:1500   sync
eyecount         js/monsters.js:1022   sync
slept_monst      js/mhitm.js:1422   ASYNC — await required
             !! ALSO 1 LOCAL CLONE(S) in 1 files — IMPORT the export; do NOT add another
               js/music.js:268
slept_monst_pot  NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/potion.js:3745
```

Actionable C-wrongs:

1. dobuzz steed exit skips the u_at tail in C — Must-fix
   row 1 (skip flashburn/stop_occupation/nomul on the
   steed path; sweep the :2590 stale comment).
2. slept_monst music/potion/bhitm callers unwired —
   Must-fix row 2 (rewire 2 clone-callers + bhitm
   WAN_SLEEP arm; edge checks).

Verdict: **QUALITY-RISK**

**Addressed:** D-3367 `2c22a94c3`

**Addressed:** D-3368
