# Review 1988 — 72bf1dec2 — cmd.c dokeylist restart + spkey_name (D-3028)

Metadata: SHA `72bf1dec2` (D-3028). Coverage restart
(dokeylist_lines split + spkey_name) + ledger-only
get_mplname stale pop. Scored diff: `js/dokeylist.js`
(+235/−73). Subject promises a C-order restart with live
spkeys + num_pad arms plus spkey_name.

## Intent vs deliverable

Promise: restarted `dokeylist_lines` with per-arm cites,
file-local live_spkey + spkey_name over a C-order table,
menu-controls call re-pointed, NO_SIGNAL arm analysis. Diff
actually adds exactly that. Promise kept.

## Inventory

- `dokeylist_lines` (js/dokeylist.js:808, export): restarted.
- `spkey_name` (js/dokeylist.js:157, file-local — correct,
  C staticfn): new.
- `live_spkey` (js/dokeylist.js:~170, file-local): new.
- No deleted exports: `show_menu_controls_lines` still lives
  (`js/dokeylist.js:280`) with its remaining caller (:948,
  dolist=false) — only the dokeylist call site was re-pointed.
  The "collapsed" wording is call-site-only; verified no
  breakage.

## C ↔ JS fidelity

### dokeylist — verdict: exact-C, ACCEPT

C (`cmd.c:2866–3013`, csym range) walked part 1, cites for
the untouched tail: memsets → NO_SIGNAL ^C pre-mark
(`:2884`; NO_SIGNAL verified absent from config.h/unixconf.h,
so the `:2955` live arm is right and `:2957–2958` is
cited-not-compiled) → mov_seen clone → misc prefix scan →
extcmd `ef_txt`-terminated loop (`if (!extcmd.txt) break`
matches C's loop condition) → directional keys → num_pad
Shift/Meta fork (`:2921–2932`, correctly dropping the Ctrl
lines, not just the word) → bound-misc loop → ^C interrupt
line → keyless loop via `spkey_name(j)` → IGNORECMD/keylist
sections (cite-only, logic untouched) → wizard gate →
display/destroy split. Old hardcodings fixed: live
`game.Cmd.spkeys` (seeded `js/cmd.js:2004–2006` from
SPKEYS_BINDS) and live `game.iflags.num_pad`. Confirm.

### spkey_name — verdict: exact-C, ACCEPT

C (`:3208–3220`): null-init, linear scan over
`spkeys_binds`, ESC→"escape" special-case, break — exact.
SPKEY_NAMES verified row-for-row against `:3161–3191`: 29
rows, order, keys, and name column all match (incl.
`all.next/prev`, `filter`, ESC null). Sole C caller
`:2972` wired. Confirm.

### pfxSeen sentinel — verdict: consistent adaptation, ACCEPT

C stores `pfx_seen[key] = j` where `j = misc_keys[i].nhkf`
(`:2894–2897`) — j IS the nhkf, 0 means unset. JS stores
`mk.nhkf + 1` because JS NHKF_ESC is 0. Store and both
compares use the +1 consistently, so outcomes equal C on
all reachable tables; divergence needs two misc entries
sharing one key with ESC involved — impossible in the
shipped MISC_KEYS (ESC/COUNT, distinct keys). Documented.

### Duplication note — not a C-wrong

`cmd.js:4616 cmd_spkey` already reads the same live table
with the same fallbacks (`| 0` vs `& 0xff` differ only for
impossible >255 values; no rebind path writes yet).
Behavior-identical cross-file clone; merging is optional
cleanup, not queued.

## Hallucinations / overclaim

None. Hidden checks labeled notes; `--full` run claimed and
plausible (shared-file heuristic). get_mplname stale locus
exists with C cite (light check).

## Density

One restarted function + one staticfn port, one file.
Right-sized.

## Verification

Re-measured (both `--base 72bf1dec2~1 --reach-all`):

```text
verify dokeylist: 0 session(s) blocked (vacuous, honest)
smoke dokeylist: 24 PASS, 0 regressed → REACH-OK
verify spkey_name: 0 session(s) blocked (vacuous, honest)
smoke spkey_name: 24 PASS, 0 regressed → REACH-OK
```

Zero REGRESSED. Matches D-log.

## Actionable C-wrongs

None.

Ledger: `dokeylist` split + `spkey_name` ported, REACH-OK ×2.
Verify lines: hidden vacuous ×2 (honest) + smoke ×2.

Verdict: **ACCEPT**
