# Review 1768 — 27a017b11 — Boots_on fumble TIMEOUT (D-2809)

- SHA: `27a017b11` (Must-fix from review 1762; same mask on `Gloves_on`)
- Files: `js/do_wear.js` `Boots_on` (`:1459`), `Gloves_on` (`:1404`)
- Queue row: review 1762 C-wrong, 0 corpus blocks cited
- Banned grep: 0 hits in the hunk. `imports.mjs --rulecheck` on this SHA: "Rule #2 clean".
- `imports.mjs --can do_wear.js potion.js incr_itimeout` → `ALREADY`.

## Intent vs deliverable

Subject promises the fumble-boots arm seeds the slot from the merged flat, calls `incr_itimeout(prop, rnd(20))`, and copies `prop.intrinsic` back to `u.HFumbling`, so a sum at `TIMEOUT` stays `TIMEOUT` instead of `(sum & TIMEOUT)`. The diff does that for `FUMBLE_BOOTS` and the same expression on `GAUNTLETS_OF_FUMBLING`. The rest of each function is untouched.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `Boots_on` | C body, file-local async | `do_wear.c:186–259` |
| `Gloves_on` | C body, file-local async | `do_wear.c:575–603` |
| `incr_itimeout` | imported `potion.js:540`, sync | `potion.c:82–85` |
| `itimeout` / `itimeout_incr` / `set_itimeout` | same module, used by the import | `potion.c:55–79` |

`csym --callers Boots_on` prints `do_wear.c:1560` `set_wear` → `do_wear.js:1586`, plus comments at `:26`, `:2375`, `:2405`, and `hack.c:881`. The live function-pointer stores are the next lines after that comment: `do_wear.c:2385` `afternmv = Boots_on` → `do_wear.js:3218`, and `:2383` `afternmv = Gloves_on` → `:3217`. `csym --callers Gloves_on` prints only the declaration and `do_wear.c:1562` → `do_wear.js:1587`. No call from a site C never uses.

`sym.mjs` (the diff adds an import of an existing export; it does not delete a symbol):

```
incr_itimeout    js/potion.js:540   sync
Boots_on         NOT EXPORTED — 1 LOCAL at js/do_wear.js:1457
Gloves_on        NOT EXPORTED — 1 LOCAL at js/do_wear.js:1404
```

Those two "LOCAL" lines are the C functions, one each, not a second clone. At this SHA the bodies start at `:1459` and `:1404` (the tool's line is the `async function` header's neighbor).

## C ↔ JS fidelity

Fumble boots (`do_wear.c:231–234`):

```231:234:nethack-c/upstream/src/do_wear.c
    case FUMBLE_BOOTS:
        if (!oldprop && !(HFumbling & ~TIMEOUT))
            incr_itimeout(&HFumbling, rnd(20));
        break;
```

`incr_itimeout` is `set_itimeout(which, itimeout_incr(*which, incr))` (`potion.c:82–85`). `itimeout_incr` is `itimeout((old & TIMEOUT) + incr)` (`:67–71`). `itimeout` (`:55–64`) sets `val = TIMEOUT` when `val >= TIMEOUT` (`const.js:2643` `0x00FFFFFF`) and `0` when `val < 1`. `set_itimeout` (`:74–79`) clears the timeout field and ORs that clamped value back, keeping bits above `TIMEOUT`.

JS (`do_wear.js:1483–1491`) ORs `u.HFumbling` with `uprops[oc_oprop].intrinsic`, and enters only when `!oldprop && !(hCur & ~TIMEOUT)`. Inside the gate the high bits are already clear, so the C preserve-high-bits step is a no-op. It writes that merged value into the slot (C has one `HFumbling` long; JS keeps a flat and a slot), calls `incr_itimeout(prop, rnd(20))` — one `rnd`, and only when the gate passes — then copies the slot back. `incr_itimeout` → `set_itimeout` → `itimeout` is the saturate, not `(sum & TIMEOUT)`. `TIMEOUT + 20` stays `16777215`. `TIMEOUT - 5 + 20` stays `TIMEOUT`. `3 + 7` stays `10`. The old mask turned `0x01000013` into `19`.

Gauntlets (`do_wear.c:584–586`) are the same gate and the same `incr_itimeout(&HFumbling, rnd(20))`. JS `:1416–1422` matches. `rnd` stays inside the `if`.

The other `Boots_on` arms are the body review 1762 already walked; this hunk does not change them. Null `uarmf` / `uarmg` still return 0 before the switch (`:1461`, `:1406`). C would dereference. Named for boots. `Gloves_on` still has no `default: impossible` (`do_wear.c:596–597`) and still calls `find_ac()` after the known bit (`:1442`). Those are outside the hunk.

## Hallucinations / overclaim

The subject describes the saturate and the gauntlet twin. Both are in the diff. It does not claim a new `Boots_on`. D-2809's caller list includes the `afternmv` stores `csym` does not print as `Boots_on(`; the assignments at `:2383` and `:2385` are those stores.

## Density

One C-wrong, the same expression in the same file. Not a second subsystem.

## Verification

Re-run on this SHA: `node scripts/hidden-proxy.mjs verify Boots_on --base 27a017b11~1 --reach-all`.

```
verify Boots_on: baseline 27a017b11~1 (scoreboard at 7041ab3e4) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke Boots_on: no RNG-tagged reach; fixed smoke spread (12 run, 3.3s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note, not a false PASS. D-2809's green 2/2, strict ×2, and cohort 7/7 were not re-run here. The saturation probe in the D-log was not re-executed; the `itimeout` branch above is what that probe claims.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
