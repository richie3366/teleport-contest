# Review 2977 — c8aa62e0d — get_count reads through readchar

- SHA: `c8aa62e0d` (cliff movement; board owner invent.c getobj, writer
  cmd.c get_count)
- D-entry: D-4137; Ledger: get_count ported; parse ported
- `js/` diff: `js/cmd.js` +11/−6

## Intent vs deliverable

Promise: C get_count reads every key with `readchar()` after restoring
the caller's `input_state`. Under parse's `commandInp`, readchar_core's
altmeta arm pairs a lone ESC with the next key. JS read with raw
`nhgetch`, so with `altmeta` on, an ESC after a cancelled getobj cleared
the topline one key early. Diff: get_count saves `input_state`, restores
it before each `readchar()`, and tests `cmd_spkey(NHKF_ESC)`. parse drops
its compensating `input_state = otherInp` store. Promise = diff.

## Inventory

- `get_count` — cmd.js:5118; C cmd.c:5009–5090.
- `parse` — cmd.js:5427; C cmd.c:5096–5151 (commandInp :5108/:5116).
- Callees: `readchar` cmd.js:1281 (C :5275–5284 → readchar_core),
  `cmd_spkey` cmd.js:5416 (local, C gc.Cmd.spkeys).

## C ↔ JS fidelity

```c
int key, save_input_state = program_state.input_state;      /* :5018 */
...
    program_state.input_state = save_input_state;           /* :5039 */
    key = readchar();                                        /* :5040 */
...
} else if (key == gc.Cmd.spkeys[NHKF_ESC]) { break; }        /* :5061 */
```

JS matches line for line. Removing parse's store is correct: C
readchar_done (:5267–5271) resets `input_state = otherInp`, and JS
readchar_core now does that on the get_count path. All three C callers
(`csym --callers`: cmd.c:5118, invent.c:1944, invent.c:5031) map to
cmd.js:5456, invent.js:10089 and invent.js:11260. The two getobj callers
now also go through readchar, as in C. Digit / backspace / allowchars
arms and the «Count: N» echo are unchanged and match :5043–5080.

`sym.mjs`: `readchar js/cmd.js:1281 ASYNC`, `nhgetch js/input.js:21
ASYNC` (no longer used here).

## Hallucinations / overclaim

None. The D-log claims movement (s145 → s149), not a PASS, and that is
what it measured.

## Density

Whole function, wired at every caller.

## Verification

```text
verify getobj (--base c8aa62e0d~1): scen-options-Rogue-50557417 PASS at HEAD
  (D-log s145 → s149 at this SHA; D-4138 finished it)
verify get_count / parse: 0 blocked
```

Consistent.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
