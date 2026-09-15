# Review 1275 — 6ce28063 — pray.c god_zaps_you lifesave fall-through + shieldeff + astral-block placement (D-2309)

Metadata: SHA `6ce28063`, D-2309, C-fidelity residuals (queue row cited 0 blocks). Method: `git show` stat + full `js/pray.js` hunk; C `pray.c:609–691` via `csym.mjs god_zaps_you` (range `:609–691`); current `js/pray.js:1106–1190` read; `sym.mjs shieldeff`; `imports.mjs --rulecheck`; `hidden-proxy verify god_zaps_you --base 6ce28063~1` re-run; added-lines banned-pattern grep.

## Intent vs deliverable

Subject promises: three `god_zaps_you` arms fixed — shieldeff in both survive-lightning arms, lifesave fall-through past each `fry_by_god` (no-C-return bridge), Disint arm restructured so the astral/sanctum block sits outside the resist if/else.
Diff actually changes (`js/pray.js` +19/−9, only scored file): exactly those three arms plus ledger lines. Promise kept.

## Inventory

- `god_zaps_you` lightning arms (js/pray.js:1121/1129) — `await shieldeff(u.ux, u.uy)` replacing `// shieldeff deferred`.
- `god_zaps_you` lightning-fry arm — `return` → `if (game.program_state?.gameover) return`.
- `god_zaps_you` Disint arm — if/else restructure, astral block moved outside.
- Ledger/doc lines only otherwise.

## C ↔ JS fidelity

Walked arm-by-arm against C `:609–691` (csym range `:609–691`):

1. Survive-lightning arms: C `:627`/`:634` calls `shieldeff(u.ux, u.uy)` FIRST, before the Blind check / before the "not affect you" pline. JS now awaits `shieldeff(u.ux, u.uy)` first in both arms. `shieldeff` is LIVE (`js/display.js:4412`, ASYNC, awaited). Order, args, placement all match.
2. Lightning-fry fall-through: C has no `return` after `fry_by_god(resp_god, FALSE)` — `done(DIED)` returns on lifesave/wizard-decline and C falls into "is not deterred..." + beam. JS gates on the gameover flag (the `mhitu.c:938–950` idiom, live at `js/mhitu.js:4244`). Correct longjmp bridge; a lifesaved hero now reaches the beam exactly as C.
3. Disint arm: C `:672–687` is `if (!Disint_resistance) { fry; monstunseesu } else { bask; godvoice; monstseesu }` with the astral/sanctum `summon_minion` ×3 block AFTER the if/else (inside the non-swallow else). JS now has exactly this shape — pre-fix the fry path `return`ed (missing beam+minions) and the astral block sat inside the resist-else (unreachable after a survived fry). Both C-wrongs closed in one restructure.
4. Untouched surroundings re-confirmed: uswallow lightning/dust arms, four `disintegrate_arm` gate conditions (`EReflecting`/`EDisint` + `!uarmc`/`!uarm` shape), beam plines, `monstseesu/monstunseesu` flags — all match C.

Callee closure: `shieldeff` LIVE; `fry_by_god`/`summon_minion`/`godvoice`/`ureflects` pre-existing live; `SetVoice` stays named with a verified C-side justification (`sndprocs.h` empty `#define` without SND_LIB — confirmed at `js/sndprocs.js:42–50`, live no-op export). `mcastu ureflects` and post-death caller continuation named as pre-existing/out-of-row. No STUB in a live arm.

Untouched surroundings re-read for regressions (this SHA restructured the Disint arm around them):

- Uswallow lightning arm: `xkilled` with `XKILL_NOMSG | XKILL_NOCONDUCT`, no `XKILL_NOCORPSE` — matches C `:618`. (The rider-credit comment is not ported, but it is message/RNG-neutral.)
- Uswallow dust arm: `XKILL_NOCORPSE` present — matches C `:650`. Both intact.
- Swallow gate shape: JS tests `u.uswallow && u.ustuck` where C tests `u.uswallow` alone. Defensive and behavior-preserving — C sets `ustuck` whenever `uswallow` is set, so a null-`ustuck` swallow state is unreachable on both sides.
- Gameover bridge: matches the cited precedent exactly (`js/mhitu.js:4243–4244`, `if (game.program_state?.gameover) return 1;` after the death path) — same flag, same optional-chaining guard, same early-return shape.
- `align_gname(game.urole, resp_god)` threading of `urole` is pre-existing and untouched (JS passes explicitly what C reads from globals).

## Hallucinations / overclaim

None. The "review-32 debt #1" pointer names a file (`32-e3c6cff4-desecrate-altar.md`) present in neither `reviews/loop-unattended/` nor `reviews/loop-2026-08-15/` on disk, so the ACCEPT-WITH-DEBT/§Risques citation is unverifiable from the tree — but the debt itself (shieldeff deferred, fry return, astral placement) is real, was visible in the pre-fix JS, and is fixed here, so this is a citation gap, not an overclaim. Not queueable.

## Density

Nineteen lines for three arms of one C function, the tail of the D-0963 cluster (+538). Right-sized.

## Verification

D-log: clean-tree preflight, discriminating hand probe (post-fix PASS `gameover:false, uhp:10, minionDelta:3` vs pre-fix `minionDelta:0` on stashed tree), `verify --fn god_zaps_you` full PASS with the hidden note explicitly vacuous, green 2/2 + strict ×2 + cohort 7/7. Re-measured by this review:

```text
verify god_zaps_you: baseline 6ce28063~1 (scoreboard at 775e5959) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
```

Matches the D-log exactly — vacuous-honest, no `--base` debt (row cited 0). Added-lines grep: no FORCE/DIAG/`getRngLog`/seed/coordinate/`fastforward`. `imports.mjs --rulecheck`: clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
