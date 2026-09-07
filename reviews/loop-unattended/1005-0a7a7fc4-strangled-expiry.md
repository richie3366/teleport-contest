# Review 1005 — 0a7a7fc4 — timeout.c STRANGLED expiry arm (D-2035)

Metadata: SHA `0a7a7fc4`, D-2035, Open-row port
(strangulation-death writer behind a dosearch-attributed
row; 2 death sessions FULL). js/ touches
`js/timeout.js` (+26/−3). Also rewrites
`hidden-corpus/scoreboard.json` (rescore, not js/).
No stamp owed.

## Intent vs deliverable

Subject promises: new `!(next & TIMEOUT) && p ===
STRANGLED` arm after SLIMED in C order (killer init
mirroring STONED, `done_timeout(DIED, STRANGLED)` +
gameover early-return, amulet-vanishes via `u.uamul`
+ `useup`). Diff actually adds: exactly that, plus
`DIED`/`useup` import extensions and the
`AMULET_OF_STRANGULATION` otyp const. Promise ==
diff. No deletes / re-points.

## Inventory

- New JS: STRANGLED expiry arm (nh_timeout).
  Changed: expiry-switch summary comment.
- `sym.mjs`: `done_timeout` file-local
  `js/timeout.js:669` (= C staticfn, body ports
  `:574–585`: I_SPECIAL set → done → clear + botl
  ✓); `useup js/invent.js:4093 sync` (called sync,
  extends pre-existing edge ✓). `choke_dialogue`
  stays a timeout.js local (named live in the D-log;
  untouched here). No STUB / clone / no-op. Named:
  none new.

## C ↔ JS fidelity

Against `timeout.c:890–900` (STRANGLED case) plus
`done_timeout :573–585`, line-for-line confirm:

- `svk.killer.format = KILLED_BY; Strcpy(name,
  uburied ? "suffocation" : "strangulation")` →
  identical, behind a `if (!game.killer)` null-guard
  that mirrors the sibling STONED arm's idiom
  (`:1041–1056` read — same guard, same
  gameover-return shape). JS-null adaptation only.
- `done_timeout(DIED, STRANGLED)` ✓, then the C
  comment's explore/wizard-decline path ("treat like
  being cured by prayer"): `uamul &&
  otyp==AMULET_OF_STRANGULATION` → `Your("amulet
  vanishes!")` + `useup(uamul)` → JS
  `pline('Your amulet vanishes!')` (Your() =
  capitalised literal ✓) + sync `useup` ✓.
  `u.uburied`/`u.uamul` both live state (uburied read
  in cmd.js/detect.js; uamul is the do_wear
  precedent cited).
- Placement after the SLIMED arm matches C switch
  order (SLIMED `:686–688` precedes STRANGLED
  `:890`); order is cosmetic anyway (single-valued
  `p`). RNG: none drawn in this envelope (death
  prompt draws nothing — consistent with the
  pre-port RNG match cited).

## Hallucinations / overclaim

None. The message's `--can` sentence is accurate
this time (end.js edge ALREADY exists; file-local
useup_amulet correctly not added since C calls
plain `useup` — csym confirms `:899` is
`useup(uamul)`).

## Density

~26 insertions on an 11-line C case + comment touch.
One arm, one falsifier. Right-sized (C is that
small).

## Verification

- `imports.mjs --rulecheck`: clean (whole-tree, at
  HEAD). Diff-hunk grep: no FORCE/DIAG/getRngLog/
  fastforward (exit 1, zero hits).
- Re-measured `hidden-proxy verify dosearch --base
  0a7a7fc4~1`: `2 PASS, 0 moved past, 2 unchanged,
  1 worse` — matches the D-log exactly (92121 FULL
  3808/3808 + 83/83; 92191 FULL 3280/3280 + 70/70;
  92012 `WORSE: now dosearch at step 10 (was
  10)`). The WORSE is disclosed as WORSE, not
  laundered into a PASS: same-step re-attribution
  with counts drift (scoreboard rngM 3084 vs
  measured 3039) that the D-log attributes to
  pre-D-2035 drift with a stashed A/B (identical
  `dosearch@10 rngM 3039/3443` both ways). My
  re-run reproduces the identical line, corroborating
  no new divergence from this arm (which cannot fire
  on the 92012 search path — no STRANGLED expiry in
  a step-10 search session).
- Green 2/2 + strict ×2, cohort 7/7, full 44/44 per
  D-log (timeout.js is turn-central, so the full run
  was owed and is claimed).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
