# Review 1347 — 828e88b4 — trap.c float_up retires D-0956 residuals + dead-WEB C-wrong

- SHA: `828e88b4`, D-2381. JS files: `js/trap.js` (+51/−15ish), `js/dig.js`
  (1-line export), `js/mhitu.js` (1-line export).
- Prior reviews closed: none (Open queue head `float_up`; stamps 1339-file
  `**Addressed:**` line edit is docs-only).

## Intent vs deliverable

Subject promises: retire three D-0956 stand-ins (buried_ball coord,
Lev_at_will steed float, surface wording) plus one latent dead-WEB C-wrong.
Diff actually adds: `buried_ball(cc)` call + ball-cell `IS_ROOM` read;
`typ === WEB` (was `TT_WEB`); maw/husk/nonesuch inline via
`digests`/`enfolds`; inline `Lev_at_will` over H/E flats with
float-vs-dismount fork; `Flying()` canonical import replacing `Flying_fu()`;
`W_ARTI` const import; two one-word exports. Unchanged arms (PIT, lava,
uinwater, Hallu, airlevel, default, tails) untouched. Promise matches diff.

## Inventory

| JS symbol | Kind | Status |
|---|---|---|
| `float_up` (trap.js:2870) | C callee port (trap.c:3936–4006) | LIVE, arms fixed |
| `buried_ball` (dig.js:514) | C callee (dig.c:1884–1932) | LIVE, newly exported, body verified |
| `Flying` (mhitu.js:705) | C macro port (youprop.h:253–255) | LIVE, re-point target |
| `Flying_fu` (trap.js:2845) | local subset (no steed-flyer disjunct) | CLONE, un-wired here, kept for float_down (:3006/:3023) |
| `digests`/`enfolds` (mhitu.js:1103/1115) | C macros (mondata.h:71–74) | LIVE (enfolds newly exported) |
| `Lev_at_will` inline | C macro (youprop.h:242–245) | CLONE, exact transcription — verified below |
| `surface` inline (maw/husk only) | C fn (dungeon.c:1749–1788) first branch | CLONE of the only reachable branch; shared `sit.js:475` surface keeps the arm named |

Required `sym.mjs` output (deleted/re-pointed symbols):
`Flying → js/mhitu.js:705 sync` (+8 local clones elsewhere, none added here);
`Flying_fu → NOT EXPORTED, 1 local clone js/trap.js:2845` ("Do NOT write
clone #2" — none written); `buried_ball → js/dig.js:514 sync`;
`enfolds → js/mhitu.js:1115 sync` (+2 clones elsewhere, pre-existing).
`imports.mjs --rulecheck` → Rule #2 clean. All cross-module names arrive via
runtime `await import` — no new static edges, no TDZ surface.

## C ↔ JS fidelity

C body (`csym.mjs float_up` → `trap.c:3936–4006`, 71 lines) walked
branch-by-branch against the new JS; no RNG draws on any touched path either
side, so ordering is the whole contract:
- BURIEDBALL (`:3950–3962`): cc=hero cell → `buried_ball(&cc)` →
  `IS_ROOM(levl[cc.x][cc.y].typ)`. JS identical including cc mutation.
  `buried_ball` body vs C (`dig.c:1884–1932`): `!u.utrap || ==TT_BURIEDBALL`
  gate, HEAVY_IRON_BALL skip, exact-spot immediate return, dist2≤8 nearest
  (`!ball || odist<bdist` makes the JS `bdist=0` vs C `bdist=COLNO` init
  behaviorally identical), cc rewrite, return ball. Exact.
- WEB (`:3963`): C compares `u.utraptype == WEB` with trap-type `WEB=18`
  (`trap.h:77`) vs `TT_WEB=3` (`you.h:349`; JS `const.js:2524`/`2470` match
  both values). Old JS `typ === TT_WEB` fired where C never does (real
  C-wrong, message + no-fallthrough); new `typ === WEB` is literal-dead like
  C, so TT_WEB falls to the bear-trap leg arm (`:3966–3968`, wording
  confirmed identical at `js/trap.js:2904–2906`). Exact.
- uswallow-animal (`:3974–3975` → `surface(u.ux,u.uy)`): C first branch needs
  `u_at(x,y) && uswallow && is_animal`, and `u_at` (`you.h:562`) is trivially
  true at `(u.ux,u.uy)` — terrain arms unreachable. JS
  `digests→maw / enfolds→husk / else nonesuch` matches C
  (`mondata.h:71–74`: `dmgtype_fromattack(ptr,AD_DGST|AD_WRAP,AT_ENGL)` ≡ the
  JS mattk scans on `stuck.data`). Exact.
- Steed (`:3987–3995`): `Lev_at_will` macro transcribed operator-for-operator
  (`(H&I_SPECIAL || E&W_ARTI) && H&~(I_SPECIAL|TIMEOUT)==0 && E&~W_ARTI==0`);
  bit values match `prop.h` exactly (I_SPECIAL 0x20000000, W_ARTI 0x2000,
  TIMEOUT 0x00ffffff). Flat-maintenance cited live and spot-confirmed
  (`artifact.js:1587` ELevitation^W_ARTI; `hack.js:3193–3194`; potion
  `hlev_bits` I_SPECIAL; LEVITATION is one of the 5 `confer_oc_oprop`
  E-mirrored props — no 1339-class gap). `Monnam…magically floats up!` vs
  cannot-stay+dismount fork in C order. Exact.
- Tail (`:3997`): canonical `Flying` adds the steed-flyer disjunct the local
  lacked — old code dropped C's lose-control message when riding a flyer
  (second latent C-wrong, fixed by the re-point). Exact.
Callee closure per changed arm: every reached name is LIVE (list above) or a
verified CLONE (Lev_at_will, surface-first-branch). No STUB in a live arm.
`botl` head set and `spoteffects/float_vs_flight/encumber_msg` tails
pre-existing, disclosed (`flags.botl` extra as-shipped).

## Hallucinations / overclaim

Every checkable D-log claim re-measured true: buried_ball arm-for-arm,
constant values, flat-writer sites, `Flying_fu` retention (:3006/:3023),
`sit.js:475` naming the arm, botl head set, "no corpus PASS claimed". The
runtime shape probe is supplement, not basis. No overclaim.

## Density

~70 js insertions across 3 files for one C function + two one-word exports:
right-sized §2b, one locus family, no unrelated scope.

## Verification

- Diff grep `FORCE|DIAG|getRngLog|fastforward|seed|stepIndex|gx ===` → clean.
- Re-measured: `node scripts/hidden-proxy.mjs verify float_up
  --base 828e88b4~1` → "0 session(s) blocked on it (0 at baseline, 0 in the
  working scoreboard)". Row cited 0 blocks → vacuous correctly labeled.
- Green/cohort per D-log accepted (narrow, RNG-free change; no reason to
  doubt, and this review re-ran the corpus half itself).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
