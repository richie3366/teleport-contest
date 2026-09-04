# Review 768 — 638c92dd — hack.c spoteffects recursion / lev timeout / ice / surprise (D-1799)

## Metadata
- Full / short hash: `638c92dd745375c165d21c6c85080325e6684033` / `638c92dd`
- Parent: `8767a241` (D-1798 AWD). Map-driven Open.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-04 02:28:55 +0200
- D-id: **D-1799**
- Stats: `js/pickup.js` +159/−35; `js/potion.js` +2/−1; `js/invent.js` +1/−1. Total `js/` insertions **162** ≤250. Band **80–350**.
- Claims to close: Open `hack.c` `spoteffects` recursion guards / levitation timeout / Warning ice. Not `dotrap`.
- JS / map: `pickup.js` `spoteffects`; `potion.js` `incr_itimeout_HLevitation` export; invent `Blind` export. `c-js-map/turns.md`. Archive **Addressed:** D-1799 `638c92dd`.

## Intent vs deliverable

Git subject promises: Match C `hack.c` `spoteffects` so recursion guards, levitation-timeout `rn2(2)`, Warning ice, and hidden-monster surprise actually run, instead of returning early on steed dismount and skipping those arms.

`node scripts/csym.mjs spoteffects` → `hack.c:3311–3462`. `--callers`: 42 code sites (`domove`, `teleds`, `do_wear`, lava land, …). `helm_simple_name` `objnam.c:5512–5528` ≡ `!hard_helmet ? "hat" : "helm"`. `hard_helmet` `do_wear.c:567–573`. `spot_time_left` `timeout.c:2458–2463`.

Parent: dest-typ / pooleffects / sink / pickup+dotrap with **`return` on `in_steed_dismounting`**. The diff **does** add static recursion / `in_lava_effects`, keep ice+surprise after dismount, lev `rn2(2)`, Warning ice, piercer/`mnexto`. Subject is delivered.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `spoteffects` | LIVE repaired | try/finally ≡ C `spotdone` |
| `incr_itimeout_HLevitation` | LIVE export | was local in potion.js |
| `Blind` | LIVE export | invent.js; **do not add clone #29** |
| `helm_simple_name` | CLONE inlined | this site only; 4 clones remain |
| `hard_helmet` / `float_down` / `spot_time_left` / `is_ice` / `mdamageu` / `mnexto` / `ceiling` / `maybe_half_phys` / `x_monnam` / `Amonnam` / `a_monnam` / `sensemon` | LIVE | |
| `pooleffects` leave-water / `failing_untrap` writer / dotrap plunge | OMIT named | reader of `failing_untrap` is LIVE |

`node scripts/sym.mjs`:

```
Blind            js/invent.js:260   sync  + 28 clones — do NOT add another
incr_itimeout_HLevitation js/potion.js:694   sync
helm_simple_name NOT EXPORTED — 4 LOCALS (dothrow/mhitu/trap/uhitm) — do NOT write #5
hard_helmet      js/do_wear.js:185   sync
maybe_half_phys  js/hack.js:938   sync
spot_time_left   js/mkobj.js:1072   sync
float_down       js/trap.js:2505   ASYNC
is_ice           js/zap.js:850   sync  + 5 clones — do NOT add #6
mdamageu         js/mhitu.js:502   ASYNC
mnexto           js/mon.js:1611   ASYNC
ceiling          js/trap.js:2978   sync
x_monnam         js/do_name.js:758   sync
```

`--can pickup.js` invent/potion/do_wear/trap/zap/mkobj/mhitu/mon: **ALREADY**. FORCE/DIAG/`getRngLog`/`fastforward`/seed-in-control-flow: **none**. Rule #2 **clean**.

## C ↔ JS fidelity

**Guards (`:3324–3338`).** Recursion no-op when same `u_at(spotloc)` + same typ + trap type unchanged. `in_lava_effects` return. `++inspoteffects` then record typ/xy. `pooleffects(TRUE)` → C `goto spotdone`; JS `return` inside `try`/`finally` still `--inspoteffects` and zeros loc when the counter hits 0. **Match.**

**Dismount (`:3356`).** C skips only the pickup/dotrap inner block. Parent returned from the whole function. JS now matches C: ice + `m_at` surprise still run.

**Lev timeout (`:3363–3374`).** `trap && (HLevitation & TIMEOUT)==1 && !(ELevitation || (HLevitation & ~(I_SPECIAL|TIMEOUT)))`. Then `rn2(2)`: incr +1 vs `float_down` then `trap=0; pick=FALSE`. JS ORs `u.HLevitation` with `uprops[LEVITATION].intrinsic` (C’s field). **Match RNG.** `incr_itimeout_HLevitation` is the TIMEOUT-bits helper.

**dotrap typ guard (`:3382–3388`).** Static `spottrap`/`spottraptyp` so fire-trap `melt_ice` re-entry does not re-trigger the same type; morph still fires. `trapflag` from `iflags.failing_untrap` — **writer named**, so this is 0 until `move_into_trap` ships.

**Warning ice (`:3404–3417`).** `spot_time_left < 15` then index `<5`/`<10`/else. No RNG. **Match.** `Warning` is `HWarning||EWarning` (`youprop.h:165`); JS also ORs `u.Warning` / uprops — same bits if those aliases stay in sync.

**Surprise (`:3419–3456`).** Clear `mundetected`/`msleeping`. `S_PIERCER` (JS mlet token): `Amonnam` + `ceiling`; tame no-op; `hard_helmet` glance (`helm_simple_name` ≡ helm in this arm); else `u.uac+3 <= rnd(20)` almost-hit else `d(4,6)` then `Half_physical_damage` `(dmg+1)/2` via `maybe_half_phys` then `mdamageu`. Default: tame jump / peaceful `You surprise` + anger / hostile. Then `mnexto(..., RLOC_NOMSG)`. **Match branch order and RNG.** At this SHA `x_monnam` already prefixed `adjective` (`falling `).

**Callee closure.** LIVE for every callee in the new arms except named `pooleffects` leave-water, `dotrap` plunge, `failing_untrap` writer, `ceiling` `in_rooms`. No STUB in a shipped live arm. Did **not** add helm_simple_name clone #5.

## Hallucinations / overclaim

Subject is **true**. Do **not** stamp “Match C `pooleffects` leave-water / `dotrap` plunge / `failing_untrap` writer.” Do **not** export `helm_simple_name` as a fifth clone. Extra JS `gameover` return after `dosinkfall` is not C (C would continue to ice/surprise); not RNG on the live path. Do **not** invent a seed0030 `spoteffects` peel.

## Density

§2b: one C function’s remaining body. +162. Did **not** glue `test_move`. Right size.

## Verification

D-log: green + movement/riding cohort. save-oracle skip. Public-unhit for timeout-1 Levitation-on-trap `rn2(2)` and piercer `rnd(20)`/`d(4,6)`. This audit: `csym` `:3311–3462` vs HEAD `js/pickup.js:1630–1764`. Rule #2 clean.

## Actionable C-wrongs

None for Must-fix. Named: pooleffects leave-water / Wwalking / steed / ceiling_hider; dotrap plunge (D-1188); `failing_untrap` writer; helm_simple_name clones; ceiling `in_rooms`.

Verdict: **ACCEPT-WITH-DEBT**
