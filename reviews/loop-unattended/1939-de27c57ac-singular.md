# Review 1939 — de27c57ac — singular (D-2980)

- SHA: `de27c57ac` (coverage; `objnam.c` `singular`, plus the `read.c` grease caller that this name exists for)
- Files: `js/objnam.js` (`+6/−1`), `js/read.js` (`+9/−1`)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, seed name, coordinate, or `fastforward` in the `js/` hunks. Rule #2 on this tree: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- `sym.mjs` (no symbol deleted; `read.js` newly calls `singular`):

```
singular         js/objnam.js:1818   sync
cxname           js/objnam.js:1327   sync
xname            js/objnam.js:1001   sync
```

`imports.mjs --can js/read.js js/objnam.js singular` prints `ALREADY`.

## Intent vs deliverable

Subject: `singular(obj, xname)` left a corpse as "corpse". C rewrites that pair to `cxname` before forcing quantity to 1. Reading a can of grease said it was a silly thing to read.

The diff adds the corpse rewrite in `singular`, and a `doread` arm that prints `This ${singular(scroll, xname)} has no label.` and returns 0. Shirt, credit card, marker, coin, orb, and candy stay on the silly-thing path.

## Inventory

| JS | Class | C |
|----|-------|---|
| `singular` | live sync `objnam.js:1818` | `objnam.c:2090–2105` |
| `cxname` | live same file `:1327` | `objnam.c:1923–1929` |
| `corpse_xname` | live `:1232` (callee of `cxname`) | `objnam.c:1822–1920` |
| `doread` grease arm | one arm of the live function | `read.c:491–493` |

## C ↔ JS fidelity

No `rn2` in `singular`. C (`objnam.c:2097–2104`): if `otyp == CORPSE` and `func == xname`, set `func = cxname`; save `quan`, set `1L`, call `func`, restore `quan`, return the name. JS (`objnam.js:1818–1826`) does that with `(obj.otyp | 0) === CORPSE` (`CORPSE` is `objectNames.indexOf('CORPSE')` at `:69`) and `func === xname` (the same binding `read.js` imports). `cxname` (`:1327–1331`) calls `corpse_xname(obj, null, CXN_NORMAL)` for a corpse and `xname` otherwise, which is `objnam.c:1926–1928`. Quantity is already 1, so `CXN_NORMAL` still names one corpse. The `if (!obj) return func(obj)` guard is not a C path (`extern.h:2233` `NONNULLPTRS`).

`doread` (`read.c:329–647`) reaches grease only through the type chain. Cookie returns at `:365–374`. Shirt / alchemy smock / Hawaiian shirt is `:375`. Credit card is `:449–490` and returns `ECMD_TIME`. Grease is the next else (`:491–493`): `pline("This %s has no label.", singular(scroll, xname))` and `return ECMD_OK`. A can of grease matches none of the earlier arms, so JS checking cookie and then grease (`read.js:2178–2203`) is the same path for that otyp. `ECMD_OK` is `0x00` (`const.js:1951`); the function returns 0. No `useup`, no literate increment, no blind gate, matching that arm. The `CAN_OF_GREASE` case at `read.js:1008` is the charging effect, not `doread`.

C callers of `singular` are the 18 sites in the csym list plus `extern.h:2233`. This commit wires the one at `read.c:492`. The others already call `js/objnam.js` `singular` or remain on their own functions. `read.c:375–547` (shirt, card, marker, coin, orb, candy) is still the silly-thing message. The commit comment names those arms. They are not arms of `singular`.

## Hallucinations / overclaim

The subject describes the corpse rewrite and the grease message. Both are in the diff. "No arm of `singular` is omitted" matches the 16-line body. It does not say `doread` is finished. Ledger is `objnam.c` only. `cxname` is the real corpse namer, not a stub.

## Density

`singular` is the whole 16-line function. The grease arm is the same-iteration caller that made the old message wrong. The rest of `doread` was already a partial port. Under the 200-line band because C is that small.

## Verification

```
verify singular: baseline de27c57ac~1 (scoreboard at 4ce18a4e0, 2026-09-27T16:17:50.671Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify singular: no corpus session is blocked on it at de27c57ac~1 — a vacuous verify is NOT a corpus PASS. ...
smoke singular: no RNG-tagged reach; fixed smoke spread (12 run, 3.6s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks. D-2980 records green 2/2, strict ×2, cohort 7/7, skip full. This re-run shows no `REGRESSED` session. The same command on `doread` (the other file in the diff): 0 blocked at `de27c57ac~1`, smoke 12 PASS, 0 regressed, REACH-OK.

## Actionable C-wrongs

None in `singular`. The unwired `doread` type arms stay the pre-existing omission the commit comment names.

Verdict: **ACCEPT**
