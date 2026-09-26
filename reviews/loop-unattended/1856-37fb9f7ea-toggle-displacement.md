# Review 1856 — 37fb9f7ea — toggle_displacement (D-2897)

- SHA: `37fb9f7ea` (coverage; `do_wear.c` `toggle_displacement`)
- Files: `js/do_wear.js` (body), `js/timeout.js` (flat mirror + expiry call), `js/display.js` (`export` only)
- Queue row: Open coverage PARTIAL, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunk. `imports.mjs --rulecheck`: "Rule #2 clean". `imports.mjs --can` for the new edges is `ALREADY` (no new cycle edge).

## Intent vs deliverable

Subject promises one `toggle_displacement` in C order, including `(Blind_telepat && Blind)`, and a `nh_timeout` DISPLACED expiry that calls it with a null object when `Displaced` is already false. The diff does that. It also exports two existing display helpers and deletes the local `hero_Invisible` clone in `do_wear.js`. `sym.mjs` on the deleted and re-pointed names:

```
hero_Invisible   js/display.js:4772   sync
hero_Blind_telepat js/display.js:1080   sync
             !! ALSO 1 LOCAL CLONE(S) in 1 files — IMPORT the export; do NOT add another
               js/invent.js:5484
hero_Unblind_telepat js/display.js:1083   sync
Detect_monsters  js/display.js:1135   sync
             !! ALSO 2 LOCAL CLONE(S) in 2 files — IMPORT the export; do NOT add another
               js/mcastu.js:140  js/potion.js:740
toggle_displacement js/do_wear.js:1278   ASYNC — await required
```

`do_wear.js` imports the exports. The leftover clones are in other files and are not this function's callees. Callers of `toggle_displacement` `await` it.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `toggle_displacement` | export `do_wear.js:1278` | `do_wear.c:148–178` (`csym` span `:144–178`) |
| `hero_Invisible` | live import, replaces local clone | `youprop.h:199` `Invisible` |
| `hero_Unblind_telepat` | live import; body unchanged, now exported | `youprop.h:157` `ETelepat` |
| `hero_Blind_telepat` | live import | `youprop.h:156` `HTelepat \|\| ETelepat` |
| `Detect_monsters` | live import; body unchanged, now exported | `youprop.h:190` plus the sticky the commit names |
| `Blind` | local `do_wear.js:1759`, not the display helper | `youprop.h:103` |
| `makeknown` | live import `invent.js` | `do_wear.c:173` |
| `You_feel` | live import `display.js` | `do_wear.c:175` |
| DISPLACED arm in `nh_timeout` | caller, not a second function | `timeout.c:858–861` |

## C ↔ JS fidelity

`csym` body is `do_wear.c:144–178`. No RNG. Four callers: `do_wear.c:345` `Cloak_on` (`js/do_wear.js:1338`), `do_wear.c:405` `Cloak_off` (`:896`), `eat.c:1267` only when `!Displaced` and before `incr_itimeout` (`js/eat.js:2021`), `timeout.c:860` only when `!Displaced` (`js/timeout.js:1349`).

Early return (`:154–156`): `on ? gi.initial_don : takeoff.cancelled_don`. `set_wear` stores `game._initial_don = !obj` (`do_wear.js:1554`) and clears it after the worn-slot walk. The takeoff flag is `game.context.takeoff.cancelled_don`.

Then one conjunction (`:158–171`): `!oldprop && !uprops[DISPLACED].intrinsic && !blocked && (see-self || sense)`. JS `intrinsic` is `(uprops[DISPLACED].intrinsic | 0) || (u.HDisplaced | 0)`. `youprop.h:202` is one field. `eat.js` `incr_itimeout_prop` writes only the flat (`eat.js:431–433`), so the `||` is that field read from both stores. A nonzero flat still suppresses the message, which is what `!(intrinsic)` does in C.

See-self is `!Blind && !u.uswallow && !Invisible`. Sense is `Unblind_telepat || (Blind_telepat && Blind) || Detect_monsters`. JS uses the same `&&` / `||` order, so `Blind` is evaluated again only on the telepathy term, as the macro is.

`hero_Unblind_telepat` is `hero_ETelepat()` only (`display.js:1083–1084`): flat `ETelepat` or `uprops[TELEPAT].extrinsic`. That is `youprop.h:157`, not "telepathy while unblind". `hero_Blind_telepat` is H or E (`:1080–1081`), and the `&& Blind()` sits in the caller. `hero_Invisible` is `hero_Invis() && !hero_See_invisible()` (`display.js:4772–4774`). The deleted local clone treated sticky `u.Invis` as invisible even when blocked, and it ignored `uprops[SEE_INVIS]`. The export follows `youprop.h:195–199` on the flats and the prop slots, with one sticky early return when `u.Invis` is set and both H and E flats are 0.

`Detect_monsters()` (`display.js:1135–1141`) is `H || E` plus `uprops[DETECT_MONSTERS]` and sticky `u.Detect_monsters`. C `youprop.h:190` is only `H || E`. The commit names the sticky. The old sense arm already tested `u.Detect_monsters`.

Local `Blind()` (`do_wear.js:1759–1762`) is `(HBlinded || EBlinded) && !BBlinded` on the flats, after sticky `u.Blind || u.ublind` returns true. C `youprop.h:87–103` is the same formula on `uprops[BLINDED]`, with no sticky. Blindfold wear copies the extrinsic onto `u.EBlinded` (`confer_oc_oprop`, `do_wear.js:382–384`). This commit does not change `Blind()`. The comment above the predicate calls it a `display.js` macro; `hero_Blind` in that file is not exported and is not called.

If `obj` is set, `makeknown(obj.otyp)` (`:172–173`). Then `You_feel` with `""` or `" no longer"` (`:175–176`). The timeout and eat callers pass `null`, so they skip `makeknown`.

The new expiry arm runs only after the generic `--` has cleared the TIMEOUT bits (`timeout.js:1138–1148`, then `:1341`). `sync_timeout_flats` copies `HDisplaced`'s TIMEOUT into `uprops[DISPLACED].intrinsic` when that slot has none (`:126–129`, `:433–449`), which is why a corpse timer that lived only on the flat now reaches the arm. `still` is `HDisplaced || EDisplaced` on both the flats and the prop, which is `youprop.h:204` across the split. `blocked` stays inside `toggle_displacement`, as in C (`Displaced` does not consult it). `oldprop` is 0 and `on` is false. `TIMEOUT_DEDICATED` does not include `DISPLACED`, so the generic loop does not skip the arm.

## Hallucinations / overclaim

The D-log says the old test "treated any telepathy as enough". The replaced arm was `u.ETelepat || u.Unblind_telepat` or a detect bit. Extrinsic telepathy without a `Blind` test is what `Unblind_telepat` already is. The hole was the missing `(Blind_telepat && Blind)` term, so intrinsic telepathy never noticed. The shipped OR matches `do_wear.c:164–170`.

"No arm omitted" matches the body. Other `nh_timeout` cases are not callees of this function. The `Detect_monsters` sticky is named, not sold as a pure `youprop.h:190` read. The vacuous hidden line matches a queue row that cited 0 blocks.

## Density

One 35-line C function, its four callers, and the flat mirror those callers need so the timeout arm can see the corpse timer. `display.js` only adds `export`. Under the small-function floor. The `sym.mjs` clones in `invent.js`, `mcastu.js`, and `potion.js` are outside this diff.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify toggle_displacement --base 37fb9f7ea~1 --reach-all`.

```
verify toggle_displacement: baseline 37fb9f7ea~1 (scoreboard at e4e898f54, 2026-09-26T20:13:17.072Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify toggle_displacement: no corpus session is blocked on it at 37fb9f7ea~1 — a vacuous verify is NOT a corpus PASS. If the queue row cited N corpus blocks, re-run with --base <the commit that row was queued at>; otherwise ship with the public gates + the reach line below and say so in the D-log.
smoke toggle_displacement: no RNG-tagged reach; fixed smoke spread (12 run, 3.2s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The D-log's public gates (green, strict, cohort, full 44/44) are the port's own verify line; this audit re-measured reach, not those gates.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
