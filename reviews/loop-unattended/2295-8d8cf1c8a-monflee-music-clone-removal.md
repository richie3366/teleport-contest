# Review 2295 — 8d8cf1c8a — monflee music.js clone removal

Metadata: SHA `8d8cf1c8a`, D-3339, C `monmove.c:461–530` (70 lines),
JS live `js/monmove.js:1109` (untouched), sole site `js/music.js`
(`awaken_scare`). Stat: 11 files, `js/music.js +2/-30` (import + site
comment, clone deleted) + new test file.

Intent vs deliverable: subject promises "`monmove.c` monflee music.js
clone removal (sole site → live js/monmove.js export)". Diff actually:
adds `import { monflee } from './monmove.js'` (new static edge),
deletes the 30-line local clone, adds one C-cite comment above the
`await monflee(mtmp, 0, false, true)` call. Matches promise. (Message
says "rewired the sole site with `await`" — the `await` was already
present since the deleted clone was itself async; only the comment is
new. Cosmetic imprecision, not a fidelity issue.)

Inventory: 1 function: `monflee` (clone→import). The deleted clone
documented its own deferrals ("flees_light rn2(10)/verbalize and Vrock
gas deferred", "flees_light / immobile flinch deferred") — i.e. it was
a self-declared subset, and this SHA restores every deferred arm via
the live export.

C ↔ JS fidelity: C `monmove.c:461–530` (via `csym.mjs`): DEADMONSTER
exit → ustuck `release_hero` → fleetime accumulate (`==1` bump, 127
cap) → new-flight message (immobile flinch / flees_light with Unaware
+ `rn2(10)`/Deaf + lsrc + verbalize / turns-to-flee) → Vrock
`mspec_used = 75 + rn2(25)` + gas cloud → `mflee=1` → always
`mon_track_clear`. Live JS (`js/monmove.js:1117–1165`) implements the
same branch order arm-for-arm; RNG call-for-call (`rn2(10)` in the
flees_light arm, `rn2(25)` in the Vrock arm — no other draws). The
`!mtmp` null-guard beyond C's DEADMONSTER is benign and pre-existing
(the clone had it too). Deleted-clone drops now restored: ustuck
release, immobile flinch, flees_light arm, Vrock arm — exactly the
behavior delta the commit message claims. Call site `music.c:59
monflee(mtmp, 0, FALSE, TRUE)` matches `awaken_scare`'s `(mtmp, 0,
false, true)`. Branch-by-branch confirm.

Hallucinations / overclaim: none. Behavior-delta claims (stuck-hero
release, immobile flinch, gremlin light reaction, Vrock gas) are
exactly the arms the clone deferred and live carries.

Density: single-function rewire. One Inventory/fidelity block, one
`Ledger: monflee` entry. Maintained test
`scripts/monflee-rewire.test.mjs` (Vrock mspec_used case fails against
the deleted clone by construction). Verdict for the function: ACCEPT.

Verification: `hidden-proxy verify monflee --base 8d8cf1c8a~1
--reach-all` → 0 blocked at baseline and now + "no RNG-tagged reach;
fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK";
matches the D-log bullet. `--can music→monmove` now ALREADY (edge
added by this commit; D-log recorded SAFE at commit time —
consistent). `--rulecheck` clean (re-run at iteration end). Diff grep:
no FORCE/DIAG/getRngLog/fastforward/coords. `sym.mjs` output
(required paste):

```text
monflee          js/monmove.js:1109   ASYNC — await required
```

Single live definer, clone count 0. The ASYNC flag matters: the sole
site already awaits, so no fire-and-forget hazard.

Actionable C-wrongs: none.

Verdict: **ACCEPT**
