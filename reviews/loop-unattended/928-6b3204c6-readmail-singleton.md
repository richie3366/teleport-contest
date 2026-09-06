# Review 928 — 6b3204c6 — mail.c readmail mail-read singleton (D-1958)

Metadata: SHA `6b3204c6`, D-1958, new `js/mail.js` + `seffect_mail`
default-arm rewire in `js/read.js`. Reviewer re-ran all three C
`readmail` bodies with guards, config defines, caller, sym on both
symbols, banned grep, and `hidden-proxy verify --base`.

Intent vs deliverable: subject promises the scroll-of-mail default
reader and fixes the wrong-arm text. Diff actually adds `js/mail.js`
with async `readmail(otmp)` and re-points the `seffect_mail`
default arm from the hardcoded text to `await readmail(sobj)`.
Promise kept.

Inventory: one new JS function (`readmail`, `js/mail.js:22`, ASYNC
per `sym.mjs`, awaited at the call site). One callee:
`flush_topl_more` (`js/display.js:6062`, ASYNC, LIVE — read at HEAD,
real pending-`--More--` flush, same idiom as the `fountain.js`
precedent for `display_nhwindow(WIN_MESSAGE, FALSE)`). No clones,
no deleted symbols. `mail.js` imports only inside-body-used
bindings (`game`, `flush_topl_more`) — no top-level TDZ read, so
the disclosed display.js cycle is safe as claimed (`--can` at HEAD
reports the edge ALREADY present).

C ↔ JS fidelity — arm selection verified against build config, not
just the cited range:

- Three `readmail` definitions exist: `:486–541` fake-junk-mail
  inside `#if !defined(UNIX) && !defined(VMS)` (`:458`) —
  compiled out; `:703–733` UNIX+DEF_MAILREADER — live in this
  build (MAIL defined `unixconf.h:146`; DEF_MAILREADER defined
  `:168–191`; SIMPLE_MAIL commented out `:200`); `:762–798`
  VMS/SHELL (`:737`) — compiled out. JS ports the live one. Right
  arm.
- Body order vs `:703–733` (via `csym.mjs`): `debug_fuzzer` early
  return → `display_nhwindow(WIN_MESSAGE, FALSE)` →
  MAILREADER/child/execl spawn → `getmailstatus()`. JS ships the
  first two (`void otmp` ARGSUSED kept), names the spawn
  (`nh_getenv`/`child`/`execl`) and `stat`-based `getmailstatus`
  as Rule #2 omits in file header + map. Correct split — the
  omitted tail is unportable subprocess/filesystem, not logic.
- Caller `read.c:2179` (sole reference via `--callers`) sits in
  the `#ifdef MAIL` default arm of `seffect_mail` (`read.c:2178`;
  the `#else` "That was a scroll of mail?" is MAIL-undefined-only
  per its own comment). Old JS printed the `#else` text although
  this build defines MAIL — the rewire fixes a real wrong-arm
  C-wrong. `spe==2`/`spe==1` arms untouched. No RNG in this path.

Hallucinations / overclaim: none. D-log's arm citations
(`:703–733`, SIMPLE_MAIL off, compiled-out list) all verified
against headers. No dispatch-over-stub shape — the shipped prefix
is complete; the omitted tail is named, not stubbed live.

Density: §2b right size — one function + its single caller arm,
new module justified (mail subsystem envelope). OK.

Verification: D-log Verify shows preflight PASS, `verify.mjs --fn
readmail` → PASS syntax/rule2/green/strict/cohort, explicitly
vacuous hidden note with no corpus-PASS claim, plus a
fuzzer-on/fuzzer-off probe (PROBE PASS). Reviewer re-measured:
`hidden-proxy verify readmail --base 6b3204c6~1` → "0 session(s)
blocked (0 at baseline, 0 in working scoreboard)". Honest.
Diff-body banned grep clean; Rule #2 clean (no fs/subprocess; the
spawn is deliberately left out).

Actionable C-wrongs: none.

Verdict: **ACCEPT**
