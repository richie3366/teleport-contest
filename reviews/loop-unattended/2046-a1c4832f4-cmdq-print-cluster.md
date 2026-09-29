# Review 2046 — a1c4832f4 — cmdq_print + bind_mousebtn + get_adjacent_loc (D-3086)

Metadata: SHA `a1c4832f4`, D-3086, js/cmd.js (+~100/−8), js/lock.js
(+~20/−10). Three-function cmd.c cluster (2 MISSING + 1 PARTIAL
restart) + 2 stale-ported + 2 test scripts (10 cases).

## Intent vs deliverable

Promise: cmdq_print whole (queue via cmdq_qname, CQ header, 5-arm
switch + default, live key2txt, EXTCMD ef_txt); bind_mousebtn whole
(range gate, nothing-unbind, ef_txt walk, MOUSECMD gate, store) wired
into commands_init with the parsebindings arm named; get_adjacent_loc
restart (live isok, Never_mind const, collapsed signature). Diff
delivers all three + imports + wirings + tests. Kept.

## Inventory (per function)

- `cmdq_print` (NEW export js/cmd.js:481): queue head, CQ header,
  KEY/EXTCMD/DIR/USER_INPUT/INT arms + default. Callees: pline LIVE
  (async), key2txt LIVE (dokeylist.js:86 sync), cmdq_qname same-file
  helper. No clones/stubs. Deleted/re-pointed: none.
- `bind_mousebtn` (NEW export js/cmd.js:1676): range gate, btn-- index,
  nothing→null, EXTCMDLIST walk, MOUSECMD gate, store, FALSE tail.
  Callees: config_error_add (live export, pre-existing map-named no-op
  body — callee's row, see below), EXTCMDLIST data. commands_init
  :2758–2759 wired in-commit; three stale doc omits refreshed.
- `get_adjacent_loc` (RESTARTED js/lock.js:766): getdir fail → pline
  Never_mind/null; new_x/new_y; isok gate → coords or emsg/null.
  Callees: getdir/isok/pline all LIVE. No clones/stubs (the leash
  clone is pre-existing, named, untouched).

## C ↔ JS fidelity (per function)

cmdq_print (C cmd.c:219–249): queue head :223 ≡ cmdq_qname+`||[]` ✓;
`CQ:%i` ✓; all 5 arms + default with exact formats — `(key:%s)` via
live key2txt (string-key charCodeAt / numeric `|0`, buf≡GC; key2txt
`&0xff` + named specials ≡ C :3229–3237) ✓, `(extcmd:#%s)` from
ec_entry.txt (ef_txt≡txt; wrapper fallback only fires where C has no
shape) ✓, `(dir:%i,%i,%i)` ✓, `(userinput)` ✓, `(int:%i)` (CMDQ_INT
newly imported) ✓, `(ERROR:%i)` no-space ✓; while/next ≡ for..of ✓.
Callers: repo-wide grep finds cmdq_print only at its own def
(cmd.c:220) — genuinely 0, no table entry (checked properly after the
2045 lesson) ✓. No RNG. Verdict: ACCEPT.

bind_mousebtn (C cmd.c:2623–2659): range gate :2628–2631 ✓ (return
FALSE control flow exact; the message goes to config_error_add —
see below); btn-- ≡ b−1 ✓; nothing-strcmpi ≡ lowercase compare ✓
(null→'' guard only touches C-impossible input); ef_txt walk to
terminator ≡ for..of (generated table has none) ✓; strcmpi/MOUSECMD
gates ✓ (no INTERNALCMD skip — clicklook carries it, verified
flags 0x840&0x800; therecmdmenu 0x80A&0x800 ✓); store + TRUE ✓;
#if 0 note omitted (dead in C, bind_key precedent) ✓; FALSE tail ✓.
Callers: cmd.c:2758–2759 → js/cmd.js:1991–1992 wired in-commit ✓
(activates the click_to_cmd arm — green/cohort passed); options.c:7637
parsebindings MOUSEBTN arm named in D-log Callers + Named omissions ✓.
config_error_add: the export exists and is called with (fmt, arg) ✓,
but its body is a pre-existing map-named no-op (js/botl.js:1471) — so
the D-log's "every callee live" is loose wording; substance is the
2041-accepted callee's-row treatment (control flow exact, sink gap
visible as ledger THIN on the callee's own row, sibling bind_key same
shape). Documentation nit, not a C-wrong. No RNG. Verdict: ACCEPT.

get_adjacent_loc (C cmd.c:3930–3953): signature collapse VALIDATED —
all 4 C sites pass u.ux, u.uy, &cc (apply.c:793; lock.c:424–425;
lock.c:804; pickup.c:2298–2299 — each read, not trusted) so x/y≡u.ux/
u.uy and cc is never null ✓; getdir-fail → pline1(Never_mind)/return 0
✓ with pline1≡pline PROVED (hack.h:1026 `#define pline1(cstr)
pline("%s", cstr)`, and no % in Never_mind/"Invalid location!"/"Invalid
loot location") ✓; new_x/new_y `|0` ✓; `cc && isok` ≡ isok (cc
non-null proven) ✓ with JS isok char-identical to C cmd.c:4326–4330
(`x>=1`, "x==1 is the first column" — both sides exclude x=0) ✓;
emsg/null/return-1 ✓. Callers: lock.c:804 → lock.js:837 (null
prompt ≡ C dirprompt=NULL :793) ✓; lock.c:424 → lock.js:1204 ✓;
pickup.c:2298 → pickup.js:4415 (both literals exact) ✓; apply.c:793 →
named pre-existing leash clone ✓. No RNG. Verdict: ACCEPT.

`sym.mjs` output (Method §3):

```text
key2txt js/dokeylist.js:86 sync | pline js/display.js:8141 ASYNC (awaited)
config_error_add js/botl.js:1471 sync | NUM_MOUSE_BUTTONS/MOUSECMD const.js ✓
cmdq_qname local js/cmd.js:288 (same-file) | Never_mind const.js:539 ✓
isok const.js:2304 (imported; hacklib.js:7 twin identical) | getdir lock.js:653 ASYNC (awaited)
```

No deleted/re-pointed symbols (no clone→import output required beyond
this read). No new module edges (D-log claim true — all imports extend
existing edges).

Stales: find_pmmonst def js/monmove.js:2325 ✓ + both wired callers
(dogmove.js:231, monmove.js:2341 — lines verified) ✓; cmdq_add_int def
(drifted 8523→8621, same body) ✓ + caller invent.js:8660 (drifted
8562) ✓.

## Hallucinations / overclaim

None material. "every callee live" for bind_mousebtn overstates the
no-op sink (should say callee's-row); the Named omissions + Callers
sections are otherwise complete and the control flow is exact. The
2045-trap ("0 callers") does not repeat: cmdq_print's zero is
repo-grep-proven, bind_mousebtn names its unwired caller, and the
wired callers were verified line by line.

## Density

One C file, 3 whole functions + 2 stales + 10 committed test cases —
§2b-shaped ✓ (activates a live path with gates green, tests included).
`Ledger:` 3 ported ✓. Per-function: 3× ACCEPT → SHA ACCEPT.

## Verification

- Re-measured `hidden-proxy verify
  cmdq_print,bind_mousebtn,get_adjacent_loc --base a1c4832f4~1
  --reach-all`: all three `0 session(s) blocked (0 at baseline, 0 in
  working)` + `smoke 24/24 PASS, 0 regressed → REACH-OK`. Matches the
  D-log's three bullets; honestly vacuous (rows cited 0), 0 regressed.
- `node --test` both scripts: 10/10 pass (observed).
- Ban-grep on the js hunks: clean. `imports.mjs --rulecheck`: Rule #2 clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
