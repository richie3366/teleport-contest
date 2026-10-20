# Review 2980 — 3326e1dd8 — handler_rebind_keys_add keeps C's uninitialized cmdstr

- SHA: `3326e1dd8` (cliff head; owner = writer handler_rebind_keys_add,
  5 rows)
- D-entry: D-4140; Ledger: handler_rebind_keys_add ported
- `js/` diff: `js/cmd.js` +11/−4

## Intent vs deliverable

Promise: C declares `char cmdstr[BUFSZ];` without initializing it, then
builds the name with `Strcat`. In the recorder build the leftover stack
bytes are never empty, so bind_key matches no extcmd and every recorded
«nothing» / plain-command pick prints «Key binding failed?!». JS had
"fixed" the C into an assignment and bound the key. Diff: a
`REBIND_UNINIT_PREFIX = '\x7f'` constant is prepended at both Strcat
sites. The CMD_PARAM arm (`Snprintf`) is untouched and still binds.
Promise = diff.

## Inventory

- `handler_rebind_keys_add` — cmd.js:2520 region; C cmd.c:2291–2405
  (cmdstr :2356, Strcat :2363 / :2379, Snprintf :2376).
- Callee `bind_key` — cmd.js:1831; C cmd.c:2661–2728.

## C ↔ JS fidelity

```c
char cmdstr[BUFSZ];                          /* :2356 — no initializer */
if (i == -1) { ec = NULL; Strcat(cmdstr, "nothing"); goto bindit; }
...  else Strcat(cmdstr, ec->ef_txt);        /* :2379 */
if (bind_key(key, cmdstr, TRUE)) { … } else pline("Key binding failed?!");
```

Followed through bind_key: `!strcmpi(command, "nothing")` fails on the
prefixed string (:2669). The paren split finds nothing. The extcmd loop
`strcmpi(buf, ef_txt)` matches nothing, so bind_key returns FALSE with
no `cmdbind_add` and no `cmdbind_remove` (:2689–2727). JS bind_key is
the same arm for arm (cmd.js:1835–1856). So JS takes the
«Key binding failed?!» branch with no side effect, as the recordings
show. Rule check: this models a fixed fact about the C binary (5/5
recordings, 0 successful rebinds). It reads no seed, step, coordinate
or RNG index, so it is not trace-shaped.

## Hallucinations / overclaim

None. The D-log states the model's limit ("a build whose stack slot
started with NUL would bind instead").

## Density

Two sites in the owner, with the cause measured in every corpus
recording that reaches the menu.

## Verification

```text
verify handler_rebind_keys_add (--base 3326e1dd8~1): 5 blocked
  Barbarian-50351011, Tourist-49959002, Valkyrie-50551011, Knight-50255908: PASS
  Caveman-50151031: moved → status_hilite_menu_add at step 40 (was 16)
```

Exact match with the D-log (4 PASS + 1 moved).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
