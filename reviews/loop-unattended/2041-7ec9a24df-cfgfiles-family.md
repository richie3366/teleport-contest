# Review 2041 — 7ec9a24df — cfgfiles.c config-line family (D-3081)

Metadata: SHA `7ec9a24df`, D-3081, js/cfgfiles.js (+182/−9).
10 functions (ceiling): get_uchars + 9 handlers; 10 Ledger
ported rows + adjust_prefix by-design.

## Intent vs deliverable

Promise: port get_uchars + 9 handlers off the
cnf_line_named_true catch-all, rewire 9 table rows. Diff
delivers all ten + 9 rewires + imports. Kept — except
get_uchars drops a real C call behind a false macro
claim (below).

## Inventory (per function)

- `get_uchars` (NEW :450 local): separator flush,
  digit accumulate, error arm. Callees: raw_printf
  LIVE; **wait_synch dropped** (claimed empty macro —
  false, see below).
- 9 × `cnf_line_*` (NEW locals): BOULDER (get_uchars +
  live symset commit), WARNINGS (get_uchars + live
  assign_warnings), 6 sysconf stores, BINDINGS (live
  parsebindings). All callees LIVE or named (cnf_error
  file omission, parsebindings PARTIAL = callee's row).
  No clones, no deleted symbols.

## C ↔ JS fidelity (per function)

get_uchars (C :380–437): separator 4-arm + modlist
zero-skip ✓, count==size/end return ✓ (=== safe),
digit accumulate ✓ (overflow: JS &0xFF ≡ C uchar
narrow incl. u32 wrap ✓), backslash→error ✓,
raw_printf exact format ✓. BUT the error arm drops
`wait_synch()` (:433) as "empty macro in this TU
per cfgfiles.c:120" — the empty `#define
wait_synch()` sits inside `#ifdef SFCTOOL`
(:116–120), and -DSFCTOOL is only set for the
sfctool utility build (Makefile.utl:324), NOT the
game. In the game build wait_synch is the real
window call (winprocs.h:140); tty_wait_synch blocks
for input on the startup/rawprint path
(wintty.c:3624–3631, getret). So C prints the syntax
error and BLOCKS; JS prints and continues. The
identical call was named an omit (→ partial) in
D-3079/2039 — opposite treatment 2 iters apart. The
"none — whole body" + ledger `ported` bury a real
gap from the picker. Per-function verdict:
QUALITY-RISK. (Live tty_wait_synch is already
imported in cfgfiles.js — wiring or partial-naming
is a one-line fix.)

BOULDER (C :1155–1161): in-place slot seeded from
the live store ✓ — store holds 0|1-char (display.js
updater normalizes), seed handles both ✓; zero/empty
/error inputs keep the old value exactly like C's
modlist skip (walked all 5 shapes) ✓. WARNINGS (C
:1180–1188): zero-filled translate ✓ (assign_warnings
reads WARNCOUNT=6, skips 0 — options.c:7545–7547 ✓;
C's tail is indeterminate stack, zero is the sane
defined choice, disclosed) ✓; MAXPCHARS fencepost
mirrored ✓. CHECK_SAVE_UID/CHECK_PLNAME (C :905–921):
atoi→int ✓ (NaN→0 ≡ atoi-0 ✓). SEDUCE (C :923–943):
!!atoi ✓, SYSCF-on (config.h:233 ✓), in_sysconf from
parse_config_file_src ✓, gate + cnf_error + n=0 ✓,
store + sysopt_seduce_set ✓. HIDEUSAGE/MAXPLAYERS/
PERSMAX: gates + fallbacks + exact error strings ✓.
BINDINGS (C :618–622): parsebindings over the Map
overlay ensured like cmd.js:1511 ✓; PARTIAL gaps
named as callee's row ✓. Callers: get_uchars :1158/
:1185 both wired (csym: decl + those 2 only) ✓; all
9 handlers dispatched via configLineStmt rewires ✓.
adjust_prefix by-design verified (NOCWD-gated :439,
undefined in unix/config headers) ✓. Confirm all
nine handlers.

## Hallucinations / overclaim

YES — material: "wait_synch() is an empty macro
here, not an omission" + "none — whole body". The
cite (cfgfiles.c:120) omits the `#ifdef SFCTOOL`
gate 4 lines above it. A dropped callee with a false
justification is a C-wrong, not a named omit.

## Density

10 whole-claimed functions, one C file — at the
ceiling but §2b-shaped ✓. `Ledger:` 10 ported + 1
by-design; get_uchars must be partial (the fix).
Per-function verdicts: 9 ACCEPT + get_uchars
QUALITY-RISK → SHA QUALITY-RISK.

## Verification

Re-measured `hidden-proxy verify <all ten> --base
7ec9a24df~1 --reach-all`: 0 blocked each (honestly
vacuous) + ten 24/24 smokes → REACH-OK, 0 regressed
✓. Ban-grep clean. Rulecheck clean (2033).

## Actionable C-wrongs

1. `get_uchars` error arm drops real `wait_synch()`
   (C :433; game build — SFCTOOL-only macro): name
   the omit + ledger partial (2039 precedent), or
   wire the already-imported live tty_wait_synch.

Verdict: **QUALITY-RISK**

**Addressed:** D-3082
