# Review 1838 — 539f2fe06 — do_osshock (D-2879)

- SHA: `539f2fe06` (coverage; `zap.c` `do_osshock`, plus `bhitpile` boulder restack)
- Files: `js/zap.js`, `js/mkobj.js`. 137 `js/` insertions.
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises one `do_osshock` in C order, and `recreate_pile_at` called from the boulder-under-a-non-boulder loop in `bhitpile`. The diff does both. `sym.mjs`:

```
do_osshock       NOT FOUND in js/** (no export, no local function/const).
recreate_pile_at js/mkobj.js:2686   sync
addtobill        js/shk.js:4168   ASYNC — await required
stolen_value     js/shk.js:3131   ASYNC — await required
costly_spot      js/shk.js:889   sync
splitobj         js/mkobj.js:418   sync
fill_pit         js/dig.js:922   sync
```

`do_osshock` is the file-local declaration at `js/zap.js:4911`. It is indented two spaces, and `scripts/sym.mjs` only indexes `^function`, so the report above is an index miss. `bhito` calls that declaration (`zap.js:5496`).

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `do_osshock` | file-local `zap.js:4911` | `zap.c:1636–1674` |
| `Luck` | local macro clone `zap.js:2690` | `you.h:464` `u.uluck + u.moreluck` |
| `splitobj` / `costly_spot` | imports | `mkobj.c:456`; `shk.c` |
| `addtobill` / `stolen_value` | async imports | `shk.c:3489` `(obj, ininv, dummy, silent)`; `shk.c:3753` `(obj, x, y, peaceful, silent)` |
| `recreate_pile_at` | export `mkobj.js:2686` | `mkobj.c:2369–2389` |
| boulder loop | arm inside `bhitpile` | `zap.c:2487–2498` |
| `fill_pit` | not called | `trap.c:4009–4020`; named |

## C ↔ JS fidelity

`csym` body is `zap.c:1636–1674`. `MAIL_STRUCTURES` is defined (`global.h:430`). `otyp === 364` (`objectNames` `'SCR_MAIL'`) returns before `obj_zapped`. The material loop is `rn2(Luck() + 45)` once per `quan`, then stores `oc_material`. `Luck()` adds the two luck fields and does not draw. A stack with `quan > 1` splits `rnd(quan - 1)`, or `rnd(30000)` when `quan > LARGEST_INT` (`global.h:135`, 32767). `splitobj` returns null on the C panic conditions (`cobj`, `num <= 0`, `quan <= num`); the throw text is `splitobj [cobj=%s num=%ld quan=%ld]` (`mkobj.c:463`).

`costly_spot(ox, oy)` then `*u.ushops` chooses `addtobill(obj, FALSE, FALSE, FALSE)` or `stolen_value(obj, ox, oy, FALSE, FALSE)`, then `delobj`. Those two are async, so that arm returns a Promise that `delobj`s after the bill. `bhito` (`zap.c:2213`) awaits it before `hideunder`. A non-costly call `delobj`s and returns undefined, so the following `hideunder` stays in order. No other JS caller.

`recreate_pile_at` saves `nexthere`, `remove_object`s (which `extract_nobj` sets `where = OBJ_FREE`), pushes onto a reversed `nobj` list, then clears `nobj` and `place_object`s. `place_object` (`mkobj.js:2635`) requires `OBJ_FREE` and puts a non-boulder under consecutive boulders. `bhitpile` starts `prevotyp` at `BOULDER` and calls that helper when a boulder follows a non-boulder, then breaks, then `maybe_unhide_at` when `hidingunder`. `fill_pit` (`zap.c:2503`) is not called. `dig.js:922` still extracts the boulder, `deltrap`s, and `delobj`s; C calls `flooreffects(otmp, x, y, "settle")` (`trap.c:4018`).

## Hallucinations / overclaim

The subject says `sym` would see one `do_osshock`. The declaration is real; the index skips the indent. The shop Promise is the only await, and `bhito` waits for it. `fill_pit` is named in `docs/c-js-map/turns.md` in this commit, not claimed as shipped.

## Density

`do_osshock` is the whole 39-line body. The boulder arm is the `bhitpile` loop at `:2487–2498`, not a substitute for `fill_pit`. 137 insertions.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify do_osshock --base 539f2fe06~1 --reach-all` (and the two helpers this commit added).

```
verify do_osshock: baseline 539f2fe06~1 (scoreboard at eb441a29a) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke do_osshock: no RNG-tagged reach; fixed smoke spread (12 run, 3.2s): 12 PASS, 0 regressed → REACH-OK
verify bhitpile: … 0 session(s) blocked … smoke (12 run, 3.3s): 12 PASS, 0 regressed → REACH-OK
verify recreate_pile_at: … 0 session(s) blocked … smoke (12 run, 3.3s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
