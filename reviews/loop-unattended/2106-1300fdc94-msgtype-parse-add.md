# Review 2106 — 1300fdc94 — msgtype_parse_add error arms + sscanf fidelity

- SHA: `1300fdc9457e616cabc1f26d684e5caf2d2792d0` (D-3146)
- Date: 2026-09-30. `js/` delta: +20/−12 (`js/options.js` only).
- Cluster: `msgtype_parse_add` restart + 4 same-file stale proofs
  (`handler_disclose`, `all_options_msgtypes`, `handler_align_misc`,
  `determine_ambiguities`).
- Prior-review closure claimed: none.

## Intent vs deliverable

Subject promises: "`options.c` msgtype_parse_add error arms + sscanf
fidelity". Diff actually adds: the restarted `msgtype_parse_add` (`:694`)
— `if (m)` hit path, unknown-type arm, malformed arm, `return false` —
plus `{0,255}`→`{1,255}` and a doc comment. No new helpers. Promise
matches deliverable exactly.

## Inventory

| JS function | Change | Class |
|---|---|---|
| `msgtype_parse_add` (options.js:694, exported — C is extern) | whole-body restart in C order | whole C function |
| 4 stale proofs | none (bodies pre-existing) | verified below |

Callee closure of the restart: `msgtype_add` (LIVE, same file `:593`),
`str_start_is` (LIVE, `js/hacklib.js:176`, imported `:171`),
`config_error_add` (LIVE no-op sink, `js/botl.js:1583`, imported `:206`;
`(_fmt, ..._args)` shape accepts both call forms). No clones, no stubs.
Named omit: sink body (map-precedented; the *calls* are now present).

`sym.mjs` (required — nothing deleted/re-pointed; all four symbols):

```text
msgtype_parse_add js/options.js:694   sync
config_error_add js/botl.js:1583   sync
msgtype_add      js/options.js:593   sync
str_start_is     js/hacklib.js:176   sync
```

## C ↔ JS fidelity

**`msgtype_parse_add`** — C `options.c:7843–7866` (`csym` range cited).
Arm-by-arm: sscanf `== 2` hit path (`:7848`) → `if (m)`; SIZE walk
(`:7852–7856`) → same loop with `str_start_is(name, token, true)`;
`typ != -1` → `msgtype_add(typ, pattern)` (`:7857–7858`); else
`config_error_add("Unknown message type '%s'", msgtype)` (`:7860`) with
the exact C format string; sscanf-else → `config_error_add("Malformed
MSGTYPE")` (`:7862`); `return FALSE` (`:7864`). Order, strings, and
return shape all match. The `{1,255}` fix is correct: C `%255[^"]`
needs 1+ chars, so `TYPE ""` yields sscanf→1→Malformed on both sides.
No RNG in C; none in JS.

Micro-gap (unobservable — see Actionable 1): the regex uses `\s+`
between token and quote, but C's format space matches *zero or more*
whitespace. Divergence needs an exactly-10-char token immediately
followed by `"`: shorter tokens make C's `%10s` swallow the quote
(Malformed both sides); longer tokens fail C's `"` match (Malformed
both sides). And even there C can never reach `msgtype_add`: the match
is `str_start_is(name, token)` = "name starts with token", longest
name is `noshow` (6 chars), so C lands in the unknown-type arm →
no-op sink → FALSE, identical to JS's malformed arm → no-op sink →
false. The D-log's "8-case probe all C-agreeing" stands for the cases
tested; the probe just didn't include the exactly-10-char no-space case.

Callers: C `cfgfiles.c:634` → JS `cfgfiles.js:622` (direct, `// C :634`)
plus the pre-existing `options.js:3736` startup split; C `sounds.c:1611`
→ JS `sounds.js:304` (both confirmed by grep). No unwired caller.

**Stale proofs:** `handler_disclose` (D-2788/R1747 ACCEPT cited) and
`handler_align_misc` (R1781 ACCEPT cited) rest on prior reviews — not
re-audited. I verified the two uncited ones branch-by-branch:
`all_options_msgtypes` (JS `:10704–10709`) emits exactly
``MSGTYPE=${mtype} "${tmp.pattern}"\n`` per `gp.plinemsg_types` node via
live `msgtype2name`/`strbuf_append` = C `:9627–9640`; `determine_ambiguities`
(JS `:10356–10378`) ports the pairwise lowc prefix scan, dual max-update,
and min-3/len clamp = C `:6700–6736` (memo-guard is the R1520 adaptation
of an idempotent function). Both stale-complete claims hold.

Diff grep: no `FORCE`/`DIAG`/`getRngLog`/seed/step/coordinate reads,
`fastforward`, or hardcoded coordinates. No import added → no `--can`/TDZ
question. Rule #2: `imports.mjs --rulecheck` → clean (run this iteration).

## Hallucinations / overclaim

None. "Calls live config_error_add" is true (live export, sink body
named in the D-entry). No dispatch-vs-callee split: `msgtype_add` and
`str_start_is` are real bodies, not stubs.

## Density

- Whole-function verdicts: `msgtype_parse_add` whole (modulo the
  unobservable micro-gap); all four stale proofs whole bodies with live
  callees and wired callers.
- Cluster: one C file, 5 functions ≤ 10, no Must-fix bundled.
  Ledger/Verify: one `Ledger:` entry and one Verify sub-bullet per
  function — present for all five.
- Size note: +20/−12 is below the breadth target, but the head's
  closure here is one restart + four stale proofs; nothing more was
  claimed. Waste, not risk.

## Verification

Re-measured myself (`--base 1300fdc94~1 --reach-all`, one call, all 5):

```text
verify <each>: baseline 1300fdc94~1 — 0 session(s) blocked on it
smoke <each>: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
```

All five functions: vacuous verify correctly labeled a hidden note +
smoke 24/24. Zero `REGRESSED`. Matches the D-log exactly. No
seed/step/coordinate read anywhere.

## Actionable C-wrongs

1. `msgtype_parse_add` separator `\s+` vs C zero-or-more format space:
   exactly-10-char token immediately followed by `"` parses in C but
   reports Malformed in JS. Unobservable today (names ≤ 6 chars, sink is
   a no-op — both sides return false with no other effect) — tracked as
   live review debt, not Must-fix. Fix: `\s+` → `\s*` (verified C-agreeing
   on the backtrack cases).

Verdict: **ACCEPT-WITH-DEBT**
