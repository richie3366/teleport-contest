# Review 2131 — f02c9df5f — playmode/config closure

SHA `f02c9df5f`, D-3171; 2026-09-30; +254 JS. No older review closure
claimed.

**Addressed:** D-3172

## Intent vs deliverable

Subject promises “playmode authorization and option dispatch cluster”. Seven
bodies, status continuation, sysconf asset/startup and restore wiring ship;
config-error callee stays stubbed.

## Inventory — set_playmode

Restarted export; authorization exports LIVE.

## C ↔ JS fidelity — set_playmode

options.c:10130–10152 wizard grant/rename/length, refusal→explore, deferred
clearing and authorization order match. Startup unixmain.c:193 and
restore.c:594 wired.

## Inventory — authorize_wizard_mode

New export; check_user_string LIVE with named OS-identity OMIT.

## C ↔ JS fidelity — authorize_wizard_mode

unixmain.c:627–636 nonempty list, matcher, refusal flag match. Sole caller
options.c:10137 wired.

## Inventory — optfn_o_status_hilites

New export + async handler CLONE; menu/count LIVE, preference no-op.

## C ↔ JS fidelity — optfn_o_status_hilites

options.c:8444–8474 init/set/get/NULL/handler order matches. Handler awaits
menu; preference no-op matches effective tty hilite behavior
(wintty.c:595–631→windows.c:460–469). Menu body botl.c:4497–4578 verified.

## Inventory — optfn_menuinvertmode

New export; config_error_add STUB.

## C ↔ JS fidelity — optfn_menuinvertmode

options.c:2289–2317 atoi/0–2/store/gets match; invalid-value diagnostic
disappears.

## Inventory — optfn_msghistory

New export; env/int CLONEs; bad_negation→STUB.

## C ↔ JS fidelity — optfn_msghistory

options.c:2522–2546 env gate, bare-negation zero, value/unsigned gets match;
error reporting lost.

## Inventory — optfn_name

New export; env/nmcpy CLONEs verified :6682–6690/:6859–6871.

## C ↔ JS fidelity — optfn_name

options.c:2548–2571 env gate and bounded comma copy match; missing-value
reporting lost.

## Inventory — bad_negation

Changed local body; config_error_add STUB.

## C ↔ JS fidelity — bad_negation

options.c:6692–6697 format/conditional words match, but imported
botl.js:1583 discards them. All 26 caller guards audited; perminv caller
explicitly named unwired.

## Inventory / C ↔ JS fidelity — integration

start maps initoptions_init (:7118–7305); try_restore_save maps
restgamestate (:521–736), override/saved-special guard matches :587–595.
rc/menu dispatch matches parseoptions (:488–691), doset (:8757–8975).
However startup reads sysconf before replacing flags/name with defaults: a
VFS sysconf `OPTIONS=!autopickup,name:SysName` stores pickup=false/SysName,
then start loses both. C initializes defaults before system options and
retains them through user rc. read_config_file failure is ignored; C
:7293–7296 checks it. No RNG added.

## Hallucinations / overclaim

“Live config-error sink” is false. New body does not close reviews
2127/2129. Required repointed-symbol sym output:

```text
status_hilite_menu js/botl.js:3561   ASYNC — await required
count_status_hilites js/botl.js:2996   sync
preference_update NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/options.js:9465
status_hilite_count NOT FOUND in js/** (no export, no local function/const).
```

Diff scan: getRngLog unchanged import; seed only comments. Rule #2 clean;
save→options import check ALREADY. No trace-shaped controls.

## Density

Ledger/verdict: set_playmode ported/ACCEPT; authorize_wizard_mode documented
Unix/ACCEPT-WITH-DEBT; o_status_hilites split/ACCEPT; menuinvertmode
ported/QUALITY-RISK; msghistory ported/QUALITY-RISK; name
ported/QUALITY-RISK; bad_negation partial/QUALITY-RISK. Seven-function
caller closure; startup integration QUALITY-RISK. Individual Verify +
green/strict/cohort/full present.

## Verification

Historical SHA, seven together, `--base f02c9df5f~1 --reach-all`; both
summaries individually:

| Function | verify | smoke |
|---|---|---|
| set_playmode | 0 blocked | 24 PASS, 0 regressed, REACH-OK |
| authorize_wizard_mode | 0 blocked | 24 PASS, 0 regressed, REACH-OK |
| optfn_o_status_hilites | 0 blocked | 24 PASS, 0 regressed, REACH-OK |
| optfn_menuinvertmode | 0 blocked | 24 PASS, 0 regressed, REACH-OK |
| optfn_msghistory | 0 blocked | 24 PASS, 0 regressed, REACH-OK |
| optfn_name | 0 blocked | 24 PASS, 0 regressed, REACH-OK |
| bad_negation | 0 blocked | 24 PASS, 0 regressed, REACH-OK |

## Actionable C-wrongs

1. Preserve system OPTIONS/name through rc/startup; handle system-config
   failure in C order.
2. Replace the config-error no-op callee and verify newly wired error arms;
   consolidated queue cites 2127/2129/2131.

Verdict: **QUALITY-RISK**
