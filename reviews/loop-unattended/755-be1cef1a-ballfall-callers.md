# Review 755 — be1cef1a — do.c/trap.c ballfall callers gate on uball (D-1786)

## Metadata
- Full / short hash: `be1cef1a68faf837222ba0dfc0f9cd753e271df0` / `be1cef1a`
- Parent: `0c2e880a` (audit overlay 738–754). Claims to close review **747** QUALITY-RISK (`c4a32e7c` D-1778 dead `u.Punished` gates).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-03 22:07:50 +0200
- D-id: **D-1786**
- Stats: `js/do.js` +5/−3; `js/trap.js` +5/−4. Total `js/` insertions **10** ≤250. Band **80–350** (Must-fix, one item).
- Claims to close: Must-fix **747** — `do.c:1805` / `trap.c:1955` gate on C `Punished`. Not `drop_ball`. Not other sticky `u.Punished` reads.
- JS / map: `do.js` `goto_level`; `trap.js` `trapeffect_pit`. `c-js-map/turns.md` + `data.md`.
- Archive **Addressed:** D-1786 `be1cef1a`.

## Intent vs deliverable

Git subject promises: Match C `do.c`/`trap.c` `ballfall` callers so a Punished hero falling actually invokes `ballfall`, instead of gating on never-written sticky `u.Punished`.

`node scripts/csym.mjs ballfall` → `ball.c:42–67`. `--callers`: `do.c:1807`; `trap.c:1957`. `Punished` → `youprop.h:77` `#define Punished (uball != 0)`. `goto_level` `:1478–1998`. `trapeffect_pit` `:1824–2010`. `welded` `wield.c:1050–1058`. `carried` `obj.h:332`. `unplacebc` `ball.c:211–219`. `placebc` `ball.c:191–209`.

```1805:1810:nethack-c/upstream/src/do.c
        if (falling) {
            if (Punished && !welded(uball))
                ballfall();
            selftouch("Falling, you");
            do_fall_dmg = TRUE;
        }
```

```1955:1959:nethack-c/upstream/src/trap.c
            if (Punished && !carried(uball)) {
                unplacebc();
                ballfall();
                placebc();
            }
```

Parent D-1778 wrote both C sites behind `u.Punished` / `game.u?.Punished`. The diff **does** replace those two predicates with `u.uball` / `game.u?.uball`, keep `!welded` / `!carried`, and keep pit `unplacebc`/`ballfall`/`placebc`. It **does not** invent a sticky `u.Punished = true`. Subject is delivered for the two live callers.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `goto_level` falling arm | LIVE repaired | `:1805–1808`; `u.uball && !welded` |
| `trapeffect_pit` Punished arm | LIVE repaired | `:1955–1958`; `uball && !carried` then unplace/fall/place |
| `ballfall` | LIVE (D-1778) | body unchanged |
| `welded` / `carried` / `unplacebc` / `placebc` / `selftouch` | LIVE | |
| `Punished` macro | inlined as `uball` | `pray.js:195` local `Punished()` is a **verified CLONE** (`!!uball`); callers here do not use it |
| `drop_ball` | OMIT named | |
| other sticky `u.Punished` | OMIT named (D-log) | `uhitm.js` `\|\| !rn2(7)`, `steed.js`, `dothrow.js` |

`node scripts/sym.mjs` (no clone→import this SHA; gates only):

```
ballfall         js/ball.js:99   ASYNC — await required
welded           js/wield.js:178   sync
carried          js/eat.js:2137   sync
             !! ALSO 3 LOCAL CLONE(S) — do NOT add another
               js/artifact.js:1118  js/ball.js:43  js/timeout.js:1064
unplacebc        js/ball.js:389   sync
placebc          js/ball.js:359   sync
selftouch        js/trap.js:2853   ASYNC — await required
Punished         NOT EXPORTED — 1 LOCAL CLONE js/pray.js:195
uball            NOT FOUND (field, not a function)
```

`--can do.js ball.js ballfall`: **ALREADY**. `--can trap.js ball.js ballfall`: **ALREADY**. `--can do.js wield.js welded`: **ALREADY**. `--can trap.js eat.js carried`: **ALREADY**. FORCE/DIAG/`getRngLog`/`fastforward`/seed-in-control-flow: **none**. Rule #2 **clean**.

## C ↔ JS fidelity

**Macro expansion — match C.** `Punished` is `uball != 0`, not a `struct you` flag. JS falling: `u.uball && !welded(u.uball)`. Pit: `game.u?.uball && !carried(game.u?.uball)`. **Match.** Do not assign `u.Punished`.

**`do.c:1805–1809` order.** Gate, then `ballfall`, then `selftouch("Falling, you")`, then `do_fall_dmg = TRUE`. JS the same (`await` on both). `welded` short-circuits when `uball` is null. **Match.**

**`trap.c:1955–1959` order.** After pit `losehp`/`rnd(adj_pit?3:6)`, then `Punished && !carried(uball)` → `unplacebc(); ballfall(); placebc();`, then `selftouch` unless `conj_pit`. JS: `maybe_half_phys(rnd(...))` then the same three calls then `selftouch`. **Match call order.** `carried` is `obj->where == OBJ_INVENT` (`obj.h:332`); JS uses the `eat.js` export, not a new clone.

**`ballfall` RNG (unchanged, now reachable).** `gets_hit` uses `rn2(5)` **before** `ballrelease`; wielded-on-spot short-circuit draws zero. Then hit arm `rn1(7,25)`. Probe with sticky `Punished` unset and `uball` set: pit `rn2(6)` (`set_utrap`) → `rnd(6)` (fall dmg) → `rn2(5)` (`gets_hit`). That is the C pit-then-ballfall sequence. **Match.**

**Callee closure (both arms).** LIVE: `welded`, `carried`, `ballfall`, `unplacebc`, `placebc`, `selftouch`. OMIT named: `drop_ball`; W-tower rndspot bit 2. STUB **inside these two arms**: **none**. Dispatch is no longer a dead gate.

**Leftover sticky reads — named, not this SHA.** `goto_level` `unplacebc`/`placebc` still `u.uball || u.Punished` (`do.js:1451` / `:1815`). C `:1813` is `if (Punished) placebc()`. The `uball` disjunct is the live C expansion; the `Punished` disjunct is dead. Harmless. `uhitm.js` `game.u?.Punished || !rn2(7)` still always draws `rn2(7)` when the hero is chained — real C-wrong, **named** as not this iter.

## Hallucinations / overclaim

Subject “actually invokes ballfall, instead of gating on never-written sticky `u.Punished`” is **true** for both C callers. D-log “do not assign `u.Punished` as a second source of truth” is followed. Do **not** stamp “Match C `drop_ball`.” Do **not** stamp “every sticky `u.Punished` read is gone.” Fortress 44/44 is no-regression; CURRENT already says no public session is Punished-while-falling — **public-unhit**, probed.

## Density

§2b Must-fix: one predicate family, two C sites, +10. Did **not** glue `drop_ball` / `uhitm` / `steed`. Allowed.

## Verification

D-log: green+strict; cohort seed1500/0014/0004; pit+`uball` probe draws `rn2(5)`; `goto_level.toString()` has `u.uball && !welded`. save-oracle `do.c:goto_level` tagged ledger-seed0015 (pre-existing stairs-vs-pickup, not this arm); `trap.c:trapeffect_pit` / `ball.c:ballfall` untagged skip. Rule #2 clean. This audit re-read `youprop.h:77`, `do.c:1805–1810`, `trap.c:1955–1959` vs HEAD `js/do.js:1798–1805` / `js/trap.js:1908–1915`.

## Actionable C-wrongs

None for Must-fix. Named leftover: `uhitm.js` `Punished || !rn2(7)` (`uhitm.c` hit-vs-Punished skip); `steed.js` / `dothrow.js` sticky `u.Punished`; `drop_ball`; `ball.js` `carried` clone; `u_init.js`/`worn.js` `is_helmet`. Do **not** write `u.Punished = true`. Do **not** draw `rn2(5)` after `ballrelease`.

Verdict: **ACCEPT-WITH-DEBT**
