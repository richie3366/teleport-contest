# Review 1584 — a5342d8b — cmd.c readchar_core whole-body port (D-2625)

**Metadata:** SHA `a5342d8b`, `cmd.c` `readchar_core` + `hangup` /
`click_to_cmd` / `readchar` / `readchar_poskey`, D-2625. JS: `js/cmd.js`
(+167/−~3) plus comment-only map-pointer updates in `js/invent.js` /
`js/lock.js`.

## Intent vs deliverable

Subject promises: `readchar_core` in C order (fuzzer/queue/in_doagain/
nh_poskey, NR_OF_EOFS drain, EOF-hangup, ALTMETA, click) plus the four
sibling commands. Diff delivers all five plus queue-shape helpers; the
invent.js/lock.js hunks only retire "named omit" comments. Promise
matches deliverable.

## Inventory

- `readchar_core(pos)`, `hangup(sig)`, `click_to_cmd(x, y, mod)`,
  `readchar()`, `readchar_poskey(pos)` (new exports), `nh_poskey_read`
  + `readchar_queue_peek` + queue state (new file-locals).
- `otherInp` / `getposInp` joined to the existing const.js import.
- No deleted symbol, no local→import re-point.

## C ↔ JS fidelity

C loci via `csym.mjs`: `readchar_core :5212–5272` (61 L), `hangup
:5158–5180`, `click_to_cmd :4905–4913`, `readchar :5275–5295`. All
four ifdefs resolved LIVE for the unix build, each cited in-code:
NR_OF_EOFS=20 (`cmd.c:15`), ALTMETA (`unixconf.h:224`),
HANGUPHANDLING (`global.h:278`), SAFERHANGUP (`unixconf.h:301`).
Branch-by-branch confirm:

- Fuzzer `randomkey()` lands on the `input_state=otherInp` tail like
  C's `goto readchar_done` (`:5217–5220`) — exact.
- Queue / in_doagain / nh_poskey (`:5221–5226`): `game.in_doagain` is
  the established shape (set cmd.js:3131, read across invent.js/cmd.js);
  `tty_nh_poskey ≡ tty_nhgetch` per wintty, mouse pos passes through
  (clicks arrive via cmdq/clicklook_cc) — documented, exact.
- EOF drain `do { sym = pgetchar(); } while (--cnt && sym == EOF)`
  exact minus `clearerr` (C-sanctioned omit, cited) — exact.
- EOF → `hangup(0)` + ESC (`:5243–5247`) — exact.
- ALTMETA queue-first second read, EOF/0→ESC, else `|=0x80` ≡ C `0200`
  (`:5248–5260`) — exact.
- Click stamps {-1,-1} then `click_to_cmd(x,y,mod)` (`:5261–5265`) —
  exact; tail reset runs on every path (`:5267–5271`) — exact.
- `hangup` keeps C order (exiting→in_moveloop=0, `nhwindows_hangup`
  named, done_hup++, defer, else `end_of_input`) — exact.
- `click_to_cmd` stamps + queues `mousebtn[mod-1]`: `game.Cmd.mousebtn`
  stays undefined until `bind_mousebtn` (`cmd.c:2624`, named) lands, so
  the arm is inert as named; `cmdq_add_ec(q, fn, tab=null)` 3-arg shape
  is valid (cmd.js:205) — exact.
- `readchar` (hero pos) / `readchar_poskey` (sets getposInp) match
  `:5275–5295` — exact; `otherInp=0` / `getposInp=2` match
  `hack.h:827–832` — exact.

RNG: none in C beyond fuzzer `randomkey()` (live in-file cmd.js:542);
none added. Convention note (not a C-wrong): `return sym | 0` keeps
M-c codes positive where C's `(char)` cast could sign-extend — matches
the repo-wide positive key-code convention (pgetchar/nhgetch).

Callee closure (`sym.mjs`): `randomkey js/cmd.js:542`,
`end_of_input js/cmd.js:136`, `pgetchar js/cmd.js:509`,
`nhgetch js/input.js:21` — all LIVE. `nhwindows_hangup` /
`bind_mousebtn` OMIT with cites; parse/get_count/getpos/getdir are
ALTMETA-comment context only, not calls (as named).

## Hallucinations / overclaim

None. The "upstream has no writer — always empty" queue claim is
C-true (only read sites at `:5221`/`:5255`); the shape stays for a
future pushback port.

## Density

One input family, ~170 lines across three files (two comment-only).
Right-sized.

## Verification

- `node scripts/imports.mjs --rulecheck` → Rule #2 clean (whole `js/`).
- Diff grep: 0 `FORCE`/`DIAG`/`getRngLog`/`fastforward`/RNG/seed/
  coordinate reads in added lines.
- Re-measured: `hidden-proxy.mjs verify readchar_core --base
  a5342d8b~1 --reach-all` → `0 session(s) blocked` at baseline and
  working tree (vacuous-note path, honestly labeled) + `smoke 24/24
  PASS, 0 regressed → REACH-OK`. Both summary lines cited;
  green/strict/cohort + 26/26 scratch probe per D-log.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
