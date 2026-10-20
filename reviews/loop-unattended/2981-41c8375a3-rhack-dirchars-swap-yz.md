# Review 2981 — 41c8375a3 — rhack walk / run / rush keys from Cmd.dirchars

- SHA: `41c8375a3` (near-pass cliff; board owner update_rest_on_space,
  writer cmd.c rhack / reset_commands binds)
- D-entry: D-4141; Ledger: rhack ported
- `js/` diff: `js/cmd.js` +26/−12

## Intent vs deliverable

Promise: reset_commands binds the walk / run / rush keys from
`Cmd.dirchars`. Under the QWERTZ number_pad mode that is `sdir_swap_yz`
(«hzkulnjb»), so `z` walks northwest and `y` is unbound («Unknown command
'y'.»). JS's bind table already agreed, but rhack's isMovementKey /
isRunKey / rushDirFromCtrl hard-coded «hjklyubn». Diff: new
`dirchar_sdir(ch)` (index in `Cmd.dirchars` → sdir letter; numpad
layouts via numpad_walk_dir), used by all three predicates and both
rhack walk / run sites. Promise = diff.

## Inventory

- `dirchar_sdir` — cmd.js:3717 (local; `sym.mjs`: 1 local def, no clone
  elsewhere).
- `isMovementKey`, `isRunKey`, `rushDirFromCtrl` — cmd.js:3730–3750.
- `rhack` walk / run dispatch — cmd.js:5803, :5862; C cmd.c reset_commands
  :3342–3476 (walk :3462–3463, run highc :3464–3466, rush C() :3467).
- `numpad_walk_dir` — cmd.js:3684 (local; unchanged).

## C ↔ JS fidelity

```c
for (i = 0; i < N_DIRS; i++) {                          /* :3462 */
    (void) bind_key_fn(gc.Cmd.dirchars[i], move_funcs[i][MV_WALK]);
    if (!gc.Cmd.num_pad) {
        (void) bind_key_fn(highc(gc.Cmd.dirchars[i]), move_funcs[i][MV_RUN]);
        (void) bind_key_fn(C(gc.Cmd.dirchars[i]), move_funcs[i][MV_RUSH]);
```

move_funcs is in sdir order «hykulnjb». JS maps index *i* < 8 of
`dirchars` to `'hykulnjb'[i]`, which is exactly move_funcs[i].
Swap_yz: `z` (index 1) → `y` sdir (NW), and `y` is not in dirchars →
undefined → not a movement key, so rhack reaches the unknown-command
arm. Run: `ch` uppercase and its lowercase a dirchar (C
`highc(dirchars[i])`). Rush: `C(dirchars[i])`, so the control letter of a
dirchar. The num_pad branch keeps numpad_walk_dir and has no
run / rush binds, as C `if (!num_pad)` says.

## Hallucinations / overclaim

None. Named: rhack_repeat_command / rhack_repeat_txt still map y/Y/z/Z by
the default letters for the `^A` CQ_REPEAT record. That is a known wrong
arm under swap_yz, and no session reaches it.

## Density

Every reader of the hard-coded letter set in rhack, plus one helper.

## Verification

```text
verify update_rest_on_space (--base 41c8375a3~1): scen-options-Caveman-50162006 PASS → PROGRESS
verify rhack: 0 blocked
```

Exact match with the D-log.

## Actionable C-wrongs

None beyond the named rhack_repeat swap_yz arm (unreached).

Verdict: **ACCEPT**
