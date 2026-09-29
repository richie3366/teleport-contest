# Review 2042 — e09865e97 — get_uchars wait_synch named omit (D-3082)

Metadata: SHA `e09865e97`, D-3082, js/cfgfiles.js (+4/−3, comment-only).
Must-fix for review 2041 item 1 (D-3081 `get_uchars` dropped `wait_synch()`).
Ships alone. No behavior change (disclosed).

## Intent vs deliverable

Promise: "named omit + ledger partial (review 2041 Must-fix)" — name the
`wait_synch()` :433 omit in the doc comment + inline, flip the ledger row
`get_uchars` ported → partial, add a node:test pinning the error arm.
Diff delivers exactly that: 2 comment hunks in js/cfgfiles.js (doc :442,
inline :479), ledger row → partial, new scripts/get-uchars.test.mjs (3
cases via exported parse_config_line). No JS statement touched. Kept.

## Inventory

- `get_uchars` (COMMENT-ONLY js/cfgfiles.js:442/479): doc now names
  `wait_synch` :433 as a windowed-input-boundary omission (SFCTOOL-only
  macro :116–120, game build blocks in tty_wait_synch wintty.c:3624–3631,
  parser stays sync — parseautocomplete precedent); inline `// C :433
  wait_synch — named omission`. Zero code delta.
- scripts/get-uchars.test.mjs (NEW, 66 lines): 3 node:test cases driving
  the gi_error arm through parse_config_line (WARNINGS partial/all-bad,
  BOULDER modlist seed). Test-only, not scored js/.
- No new/changed JS function bodies, no deleted or re-pointed symbols
  (nothing to run the re-point check on; `sym.mjs get_uchars` below is
  the status read).

## C ↔ JS fidelity

C locus (csym range): nethack-c/upstream/src/cfgfiles.c:380–437; error
arm `default:` + `gi_error:` :427–435 with `raw_printf` :432,
`wait_synch();` :433, `return count;` :434. Callers: decl :27, BOULDER
:1158, WARNINGS :1185 — both wired (js/cfgfiles.js:562/:575, unchanged
since review 2041's confirm).

The 2041 C-wrong was the false "empty macro in this TU" claim burying a
real dropped callee. This SHA replaces both comments with the true
statement: the empty `#define wait_synch()` is `#ifdef SFCTOOL`-gated
(:116–120; utility build only, Makefile.utl:324), while the game build
takes the real window call (winprocs.h:140) that blocks for input on the
startup/rawprint path (wintty.c:3624–3631). JS still prints
(`raw_printf` live) and returns count without blocking — now an
explicitly named omission instead of a misdescribed no-op. C order and
branch structure untouched (comment-only delta cannot diverge).

`sym.mjs get_uchars` output (pasted per Method §3):

```text
get_uchars       NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/cfgfiles.js:453
```

File-local is correct here: C declares it `staticfn` (:380), so one
file-local definition is the faithful shape, not clone drift. No RNG in
C body (no rn2/rnd/rn1/d) — nothing to walk call-for-call.

Ledger: `ledger.mjs show get_uchars` → `partial ... omit: wait_synch
:433 ...` ✓ (the "refresh: no JS symbol (measured MISSING)" note tail
is a stale auto-note — the local exists at js/cfgfiles.js:453 — cosmetic
only, not a C-wrong, not queued).

Per-function verdict: ACCEPT — the 2041 C-wrong is closed as specified
(review offered "name the omit + ledger partial, or wire"; this names).

## Hallucinations / overclaim

None. The D-log says "No behavior change" and gives the true reason
(async cascade through handlers/table/parse_config_line/parse_conf_buf
for a malformed-config arm). It does not claim a corpus PASS movement
("REACH-OK is the evidence", "no corpus session is blocked"). The "not
queued (phase 2)" tail for the async-wiring campaign is a disclosed
non-enqueue of a hypothetical, not a buried gap.

## Density

Must-fix ships alone (§2b: "Must-fix stays one item, alone") ✓. One
`Ledger:` entry (get_uchars partial) ✓. Comment-only js delta + a
focused regression test is the right size for a naming fix; the test is
new durable collateral for the error arm, not padding. No cluster-shape
concerns (not a breadth cluster).

## Verification

- Re-measured `hidden-proxy verify get_uchars --base e09865e97~1
  --reach-all`: `0 session(s) blocked on it (0 at baseline, 0 in the
  working scoreboard)` + `no RNG-tagged reach; fixed smoke spread (24
  run, 6.5s): 24 PASS, 0 regressed → REACH-OK`. Matches the D-log's
  "no corpus session is blocked + smoke-spread REACH-OK (24 run, 24
  PASS, 0 regressed)" exactly — honestly vacuous (Must-fix fidelity
  row cited 0 blocks), 0 regressed.
- `node --test scripts/get-uchars.test.mjs`: 3 pass, 0 fail (observed).
- Ban-grep on the js hunk (FORCE/DIAG/getRngLog/fastforward/rn2/rnd):
  clean. `imports.mjs --rulecheck`: "Rule #2 clean" (full scored js/).

## Actionable C-wrongs

None. Review 2041 item 1 is closed: omit named in code + D-entry Named
omissions + ledger partial.

Verdict: **ACCEPT**
