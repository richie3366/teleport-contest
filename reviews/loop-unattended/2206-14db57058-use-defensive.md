# Review 2206 — 14db57058 — use_defensive heal channels + default

Metadata: SHA `14db57058`, D-3245, `js/muse.js` only (6 small
edits, no new imports). Parent `2ad1aa828`.

## Intent vs deliverable

Subject promises: heal-arm `pline_mon`, `unbless` await,
C-exact default — while the cited session was re-attributed
to `digactualhole` since queue time. Delivered exactly the
three fixes; the re-attribution is stated up front with
owner/step/toplines, not buried. No drift.

## Inventory

- `use_defensive` (js/muse.js:2465): POT_HEALING /
  POT_EXTRA_HEALING / POT_FULL_HEALING arms `pline` →
  `pline_mon(mtmp, …)`; FULL_HEALING `unbless(otmp)` awaited;
  `default: return 2` → `await impossible('%s wanted to
  perform action %d?', Monnam(mtmp), m.has_defense)` + break
  + trailing `return 0`; `case 0` comment; doc updated.

## C ↔ JS fidelity

`use_defensive` — C muse.c:795–1219 (csym range, 425 lines).
The three changed spots, verified against C: (1) C uses
`pline_mon(mtmp, "%s looks better/much better/completely
healed.", …)` in all three heal arms → JS now `pline_mon`
(async display.js:7811, awaited; sets msg_xy where `pline`
does not — the substance of the fix) ✓; (2) C FULL_HEALING
`if (otyp == POT_SICKNESS) unbless(otmp) /* Pestilence */` →
JS `await unbless(otmp)` (was a floating promise) ✓, arm
order mquaffmsg → unbless → healmon(mhpmax, blessed?8:4) →
mcureblindness → pline_mon → makeknown → m_useup → return 2
exact ✓; (3) C default `:1212–1215`
`impossible("…action %d?", Monnam(mtmp), gm.m.has_defense)`
+ `break` + trailing `return 0` (`:1217`) → JS identical
with `m.has_defense` from `museState()` (game._muse ≡ gm.m)
✓; `case 0: return 0` ✓. The default change flips unknown
codes from 2 ("acted") to 0 ("didn't act") at caller
js/monmove.js:2655 (`!== 0` ≡ C monmove.c:795 `!= 0`) —
exactly C's semantics; no corpus session reaches the
default (smoke-only reach), so no behavior change anywhere
measured. Callers: both C code sites wired + awaited
(js/monmove.js:2211/2655; D-log says 2654, off-by-one in
prose, site confirmed); muse.c:1821/:3060 comments,
extern.h decl — no other sites. Pre-existing body: all 20
MUSE_ cases + case 0 + default present in C order (grep
inventory both sides) ✓; spot-walked UNICORN_HORN arm —
channels/order/impossible exact, incl. the named `pline('The
…')` ≡ pline_The ✓. That arm's pre-existing `pline_mon`
use corroborates the heal-arm fix direction. Named omits
(`!otmp`→0 vs C panic ×12; `vtense(null,…)`; pline_The×2)
are pre-existing D-1809/D-1970 patterns, restated, not new.
Verdict: whole exact.

Helpers: pline_mon/impossible/Monnam/unbless all imported
live; `await` correct at every touched site. No clones, no
stubs, no re-points. (Pre-existing file idiom renders
Monnam into the fmt string instead of passing it as an
arg — a latent `%` hazard, but pervasive pre-existing
style, out of scope for this SHA.)

## Hallucinations / overclaim

None. The vacuous verify is labeled vacuous with the
re-attribution evidence, not presented as a PASS.

## Density

One whole 425-line function audited, 3 real gaps fixed. ~10
insertions under the floor with the evidenced exception
(coverage block 0 rows at ship, no other muse.c residuals,
57-callee closure live; D-3242/D-3244 precedent). Own
bullets + `Ledger:` entry. No Must-fix bundled.

## Verification

- Banned-pattern grep on the js hunks: clean.
- Re-measured in one call: `hidden-proxy.mjs verify
  use_defensive --base 14db57058~1 --reach-all` → 0 blocked
  (vacuous, as logged) + smoke 24/24 REACH-OK. Re-attribution
  confirmed independently from the committed scoreboard:
  scen-hazard-Monk-94153 s57 kind=screen owner
  `digactualhole` @ dig.c:785, toplines "The werewolf falls
  through..." both sides — exactly the D-log's claim. Zero
  REGRESSED.
- No seed/step/coordinate reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
