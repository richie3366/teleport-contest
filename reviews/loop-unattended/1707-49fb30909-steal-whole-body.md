# Review 1707 — 49fb30909 — `steal.c` steal whole body (D-2748)

Metadata: commit `49fb30909`, D-2748, `js/steal.js` `steal` plus `export` on the existing `doffing` in `js/do_wear.js`. Coverage row, 0 corpus blocks. No prior review claimed closed.

## Intent vs deliverable

Subject promises a C-order restart of nothing_to_steal, cant_take, monkey stickiness, leash, doffing, armor charm, unpaid billing, and petrify. The diff is that body (`js/steal.js:347–623`) and a one-word `export` on `doffing`. Promise matches the functions added. The Blind arm does not match the macro it cites.

## Inventory

Changed JS: `steal` (`js/steal.js:347`); closures `nothing_to_steal` and `cant_take`; file-local `Adornment`, `bimanual`, `Blind_steal`. `doffing` was already the live body; this commit only exports it. No deleted symbol.

```text
doffing          js/do_wear.js:3611   sync
o_unleash        js/apply.js:1483   sync
                 !! ALSO 1 LOCAL CLONE(S) — js/eat.js:2733 (not this diff)
minstapetrify    js/trap.js:3430   ASYNC — await required
openholdingtrap  js/trap.js:6778   ASYNC — await required
stop_donning     js/do_wear.js:3663   ASYNC — await required
mpickobj         js/makemon.js:2157   sync
can_carry        js/monmove.js:275   sync
nomul            js/hack.js:1570   sync
maybe_finished_meal js/eat.js:2269   ASYNC — await required
Blind            js/invent.js:359   sync
```

Awaited: `maybe_finished_meal`, `openholdingtrap`, `stop_donning`, `minstapetrify`, `worn_item_removal`, `remove_worn_item`, `stop_occupation`, `urgent_pline`, `encumber_msg`. `mpickobj` and `nomul` are sync. `--can` for `o_unleash`, `minstapetrify`, `doffing`, and `Blind` is **ALREADY**.

## C ↔ JS fidelity

C `steal.c:342–614` (`csym`, 273 lines). Real call: `uhitm.c:4673` only (`do_wear.c:1600` / `:1686` and `trap.c:6827` are comments; `extern.h:3127` is the decl). JS caller: `mhitu.js:2208` `switch (await steal(mtmp, buf))`. No extra caller.

- Entry: clear `objnambuf`, `!monnear` → 0, snapshot `Some_Monnam`, `maybe_finished_meal` when `occupation` is set. ✓
- `nothing_to_steal`: `uball && !animal && rn2(4)` → `worn_item_removal(uchain)`; buried ball `!rn2(4)` → pline + `openholdingtrap(youmonst)` (C's `dummy` is discarded; JS returns `{happened,noticed}` and the caller ignores it). ✓
- **Blind:** C `:384` `else if (Blind)` is `youprop.h:103` `(HBlinded || EBlinded) && !BBlinded`. JS `:381` calls `Blind_steal` (`:813`), `u.Blind || u.ublind`. The live `Blind()` at `invent.js:359` is the macro (plus `uroleplay.blind`) and `steal.js` already imports `invent.js`. A sticky field that `do.js:3160` sometimes copies is not the test. ✗
- Gold-only vs generic pline, then `return 1`. ✓
- Adornment ring skip when animal or `uarmg`; `LEFT_RING` / `RIGHT_RING` take `uleft` / `uright`. `Adornment()` is `uprops[ADORNED].extrinsic` (`youprop.h:193`). ✓
- Weighted walk (5 vs 1), glove/cloak/shirt substitutions, `Steal fails!` → 0. ✓
- `stealoid` compare returns 0. Null `o_id` skips it (named). C `assert(uball)` is a debug no-op (named). ✓
- Boulder: `!retrycnt++` retries the pick; second time `cant_take`. ✓
- Monkey `ostuck`: uball; quiver / `uswapwep && !twoweap` exempt; cursed worn; `RING_ON_PRIMARY` / `SECONDARY` via `you.h:565–567`; `welded`; `bimanual` matches `obj.h:257–259`. `can_carry == 0` joins `cant_take`. ✓
- `cant_take`: `how[rn2(4)]`, armor `your` + `armor_simple_name` else `yname`. C `:488` `return !rn2(inv_cnt(FALSE)/5+2)` is 1 (flee) when `rn2` is 0. JS `:422` `rn2(...) ? 0 : 1` is the same polarity. ✓
- Leash: cursed animal → `cant_take`; else `o_unleash`. ✓
- `doffing` then `stop_donning` then `stop_occupation`. Tool/amulet/ring/food → `worn_item_removal`. Armor: delay clamp, animal/unresponsive `rn2(10)` give-up, else curse-clear, female/male `urgent_pline` verb chain, `named++`, `nomul(-armordelay)`, `stealoid`/`stealmid`/`afternmv = stealarm`, `return 0` when `multi < 0`. ✓
- Weapon / ball: uball message uses `uchain` (`|| otmp` only if `uchain` is missing). `W_WEAPONS` then `remove_worn_item(otmp, false)`. ✓
- `yname` into the out-buf; `mavenge` unless `hero_conflict()` or the ball just came off (`was_punished && !u.uball`). `hero_conflict` (`mondata.js:116`) is the live export and is wider than `youprop.h:218` `HConflict || EConflict` (also rings and flat flags). That width is the helper, not a new clone. ✓
- Unpaid `subfrombill(shop_keeper(ushops[0]))` is `*u.ushops`. `freeinv`, nymph `last_msg` → `named`, `She`/`Monnambuf` stole, `encumber_msg`, corpse `touch_petrifies` without `W_ARMG` → `minstapetrify` and `-1`, else `(multi<0)?0:1`. `mlet === 'S_NYMPH'` is this port's mlet spelling. ✓
- RNG order on each arm matches the `rn2` sites above. No other rolls.

## Hallucinations / overclaim

"New live edges apply.js `o_unleash` + trap.js `openholdingtrap`/`minstapetrify` (imports.mjs SAFE)" — all three `--can` results are ALREADY. "Blind" in the subject is the arm that calls `Blind_steal`, not `youprop.h` `Blind`. No FORCE/DIAG/seed/coordinate/`fastforward`. Rule #2 clean.

## Density

One 273-line C function, one real module (`do_wear.js` is an export keyword). Right-sized for the coverage row. The Blind predicate is one line inside an otherwise closed body.

## Verification

Re-measured (`--base 49fb30909~1 --reach-all`). Parent scoreboard is `09c5d65ab`. Row cited 0 blocks.

```text
verify steal: baseline 49fb30909~1 (scoreboard at 09c5d65ab, 2026-09-21T23:57:18.591Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify steal: no corpus session is blocked on it at 49fb30909~1 — a vacuous verify is NOT a corpus PASS. If the queue row cited N corpus blocks, re-run with --base <the commit that row was queued at>; otherwise ship with the public gates + the reach line below and say so in the D-log.
reach steal: 24 baseline-PASS session(s) reach it (24 run, 9.0s): 24 PASS, 0 regressed → REACH-OK
```

0 REGRESSED. The reach line is real (24 sessions execute `steal`). The 0-block note matches the row. It does not exercise the Blind arm. Green/strict/cohort claimed in the D-log.

## Actionable C-wrongs

1. `nothing_to_steal` Blind test — C `steal.c:384` `Blind` (`youprop.h:103`) vs `js/steal.js:381` `Blind_steal` (`:813`). Call `Blind()` from `invent.js:359`.

Verdict: **QUALITY-RISK**
