# Review 1311 — dd78cfac — amulet offering arms (D-2345)

Metadata: SHA `dd78cfac`, D-2345, C-fidelity residual (queue row cited 0 blocks; turns.md:399 dosacrifice family). Method: full `js/` hunks read (`pray.js` only, +156/−15ish); C `offer_too_soon pray.c:1478-1498` + `offer_real_amulet :1526-1589` + `offer_fake_amulet :1601-1627` bodies plus `dosacrifice :1870-1895` dispatch (via `csym.mjs`/read); `sym.mjs` on `Soundeffect`/`You_hear`/`Amulet_off`/`se_thunderclap`; `imports.mjs --can` pray→sndprocs (ALREADY); `You_feel`/`hcolor`/Deaf-idiom/`MOLOCH` checks; added-lines banned grep (0 hits); `--rulecheck` clean (iteration run); `hidden-proxy verify offer_real_amulet --base dd78cfac~1` re-run.

## Intent vs deliverable

Subject promises file-local `offer_too_soon` / `offer_real_amulet` / `offer_fake_amulet` in C order, wired into `dosacrifice` replacing the bare `ECMD_TIME` returns. Diff delivers all three + 4 import names + dispatch wiring. Promise kept exactly.

## Inventory

- `offer_too_soon`: Gehennom-A_NONE `gods_upset` arm + Hallu/aligned/ashamed `You_feel` — exact vs `:1478-1498` (`You_feel` takes a complete sentence, so `'homesick.'` ≡ C `"homesick"+"%s."`).
- `offer_real_amulet`: worn-check `Amulet_off` → carried/useup/useupf → A_NONE Moloch arm (record−99, killer `s_suffix(MOLOCH)+' indifference'` + KILLED_BY, done(DIED) → lifesave-gated fry → ESCAPED) / wrong-align (`adjalign(-99)`, orange cloud, ESCAPED) / own-align (`ascended=1`, `adjalign(10)`, godvoice, verbalize, Demigod-dess, ASCENDED) — all in C order vs `:1526-1589`.
- `offer_fake_amulet`: low+unknown → too_soon; thunderclap; unknown (boo-boo/mistake, known=1, luck−1) / known-fool (Deaf "Oh, no.", luck−3, adjalign−1, ugangr+3, `offer_negative_valued`) — exact vs `:1601-1627`.
- `dosacrifice`: real (`!highaltar → too_soon`, else real) / fake dispatches exact vs `:1874-1889` (ECMD_TIME return is the correct `done()`-can-return adaptation of NOTREACHED).

## C ↔ JS fidelity

Branch order and texts verified arm-for-arm against the three C bodies above; RNG-silent on both sides except inside the pre-existing `offer_negative_valued`/`gods_upset` tails (order unchanged). `hcolor('black'/'orange')` ≡ `hcolor(NH_BLACK/NH_ORANGE)` (string pref returned verbatim when !Hallu; same display draw under Hallu both sides). Deaf formula is the file's own 3-site idiom (`pray.js:974/1720/2445`). `display_nhwindow(WIN_MESSAGE)` correctly absent (no-op; D-1831-clean) and `SetVoice` deferred per file convention — both named in situ.

Callee closure, all LIVE: `Soundeffect` (sync, called sync), `se_thunderclap` (generated const), `You_hear`/`Amulet_off` (async, awaited — the export, not one of the 12 pre-existing `You_hear` clones). No deleted symbols (comments → live calls); nothing to re-point.

## Hallucinations / overclaim

None. "No draws in real/too_soon on either side" holds against both bodies. Killer field-assignment order (format-then-name vs C name-then-format) is unobservable.

Companion details confirmed while auditing (no action):
- `You_feel` takes a complete sentence (`display.js:7321`, no added period), so `'homesick.'`-style literals ≡ C's `"%s."` formats exactly.
- `MOLOCH` is the file's pre-existing `'Moloch'` local (`pray.js:176`); killer `"Moloch's indifference"` both sides.
- Deaf formula byte-identical at three pray.js sites (`:974`/`:1720` pre-existing + `:2445` new) — file idiom, not a new clone.
- `hcolor('black'/'orange')` returns the pref verbatim when !Hallu; same display-RNG arm under Hallu both sides.
- `Soundeffect` is sync (called sync, correctly un-awaited).
- Dosacrifice dispatch (real `!highaltar → too_soon` / fake / corpse) matches `:1874-1889`; ECMD_TIME is the correct `done()`-can-return adaptation of NOTREACHED.
- `otmp.known = 1` ≡ C `TRUE`.

Lifesave-gate idiom verified (not just cited):
- `if (game.program_state?.gameover) return;` after `done()`/`fry_by_god` is the file pattern (cf. `pray.js:1103-1106`).
- `done`/`fry_by_god`/`gods_upset`/`offer_negative_valued` were already imported — no new edges beyond the ALREADY sndprocs one.
- The `if (!game.killer)` guard is unreachable-defensive (killer init'd at game start), identical whenever it exists.

## Density

One `pray.js` envelope (three `staticfn`s + their dispatch). Good.

## Verification

D-log tail PASS (syntax/rule2/green/strict/cohort, after last `js/` edit) with the hidden bullet honestly vacuous. Re-measured:

```text
verify offer_real_amulet: baseline dd78cfac~1 — 0 session(s) blocked (0 at baseline, 0 working)
```

Matches (vacuous note, no `--base` owed). Banned grep 0 hits; `--rulecheck` clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
