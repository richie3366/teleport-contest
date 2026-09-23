# Review 1705 — 09c5d65ab — `do_wear.c` Boots_off whole body (D-2746)

Metadata: commit `09c5d65ab`, D-2746, `js/do_wear.js` plus a comment-only edit in `js/hack.js` `dosinkfall`. Missing-arm row (`do_wear.c:274–306`), 0 corpus blocks. No prior review claimed closed.

## Intent vs deliverable

Subject promises a C-order restart of SPEED, water, FUMBLE, and LEVITATION. The diff is that switch, the plain-boot breaks, and the default `impossible`. `hack.js` only retires the "Boots_off LEVITATION omitted" comment. Promise matches deliverable.

## Inventory

Changed JS: `Boots_off` (`js/do_wear.js:932`); file-local `Levitation_dw` / `Flying_dw`. New import names on existing edges: `is_pool`, `is_lava`, `has_ceiling`, `is_clinger`, `spoteffects`, `float_down`, `float_vs_flight`, `You_feel`, boot otyp consts. No deleted symbol.

## Callee closure

```text
Very_fast        js/attrib.js:1023   sync
Fast             js/attrib.js:994   sync
has_ceiling      js/dungeon.js:914   sync
is_clinger       js/monsters.js:485   sync
float_down       js/trap.js:3105   ASYNC — await required
float_vs_flight  js/polyself.js:659   sync
spoteffects      js/pickup.js:2289   ASYNC — await required
```

`float_down` and `spoteffects` are awaited. `float_vs_flight` is sync and called bare. `--can js/do_wear.js js/dungeon.js has_ceiling` is **ALREADY**, not a new edge. `clear_worn` is `setworn(null, mask)`.

## C ↔ JS fidelity

C `do_wear.c:261–323` (`csym`). Real calls: `do_wear.c:1989`, `:2858`, `:3166`, `hack.c:912`, `polyself.c:1283`, `steal.c:252`, `trap.c:6864`. At this SHA: `afternmv = Boots_off` (`do_wear.js:1607`) and immediate `await Boots_off` (`:1625`), `do_wear.js:2098`, `:3737`, `hack.js:3769`, `polyself.js:1332`, `steal.js:259`, `trap.js:6532`. No extra caller.

- `oldprop` is `uprops[oc_oprop].extrinsic & ~WORN_BOOTS`, then mask clear, then `setworn` before the switch. ✓
- SPEED: `!Very_fast && !cancelled_don` → `makeknown` + `You_feel("yourself slow down%s.", Fast ? " a bit" : "")`. ✓
- WATER: pool or lava, `!Levitation_dw`, `!Flying_dw`, `!(is_clinger && has_ceiling(u.uz))`, `!cancelled_don`, `!iflags.in_lava_effects` → `makeknown` + `spoteffects(true)`. `has_ceiling` is `dungeon.c:1689–1698` (endgame non-earth has no ceiling). ✓
- ELVEN: `toggle_stealth(otmp, oldprop, false)`. ✓
- FUMBLE: clear when `!oldprop` and the non-timeout half is 0. JS ORs the flat `HFumbling` with `uprops[oprop].intrinsic` before `~TIMEOUT`, then zeros flat H/E and both uprops halves. C assigns `HFumbling = EFumbling = 0`, which are those uprops fields. Same clear when the two stores match. ✓
- LEVITATION: `!oldprop && !HLevitation && !(BLevitation & FROMOUTSIDE) && !cancelled_don` → `float_down(0,0)` unless `in_lava_effects`, then `makeknown`; else `float_vs_flight`. ✓
- LOW/IRON/HIGH/JUMPING/KICKING break. Default `impossible` with the otyp. Tail always clears `cancelled_don`. ✓
- Null `uarmf` returns after `clear_worn` and skips the tail. C would dereference. Named as the Helmet_off-style guard.
- `Levitation_dw` / `Flying_dw` also return true on a flat `u.Levitation` / `u.Flying`. Nothing in `js/` assigns those fields (`rg "\.Levitation\s*="` is empty), so the extra disjunct is dead and the `(H||E) && !B` arm is the one that runs. `Flying_dw`'s steed-flyer omit is in its comment.
- No RNG.

## Hallucinations / overclaim

"new `has_ceiling` edge, imports.mjs SAFE" — `--can` is ALREADY. "every callee live" matches the switch. No FORCE/DIAG/seed/coordinate/`fastforward`. Rule #2 clean.

## Density

One 63-line C function, one real module (hack.js is a comment). Right-sized for the missing-arm row.

## Verification

Re-measured (`--base 09c5d65ab~1 --reach-all`). Parent scoreboard is `51018d7f6`. Row cited 0 blocks.

```text
verify Boots_off: baseline 09c5d65ab~1 (scoreboard at 51018d7f6) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify Boots_off: no corpus session is blocked on it at 09c5d65ab~1 — a vacuous verify is NOT a corpus PASS. [...]
smoke Boots_off: no RNG-tagged reach; fixed smoke spread (24 run, 2.9s): 24 PASS, 0 regressed → REACH-OK
```

0 REGRESSED. D-log's full 44/44 is the shared-file gate (`hack.js` comment). Green/strict/cohort claimed there.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
