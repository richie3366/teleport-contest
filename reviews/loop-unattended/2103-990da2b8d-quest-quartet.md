# Review 2103 — 990da2b8d — questpgr.c quest-artifact search + pline delivery quartet

- SHA: `990da2b8d58ac140ef63dbe95c9c3ca985d341fd` (D-3143)
- Parent: `2f2a26da6`
- Files: `js/quest.js` (+28/−8), `js/questpgr.js` (+11/−5 + export), `js/do.js` (+1/−5);
  docs + ledger otherwise
- Cluster: 3 restarts + 1 verified-whole, one C file + the do.js caller the export serves

## Intent vs deliverable

Subject promises: "quest-artifact search + pline delivery quartet".
Diff actually adds: restarted `find_quest_artifact` (INVENT+MIGRATING arms) and `find_qarti`
(recursion via live `is_quest_artifact`), restarted + exported `deliver_by_pline` (copynchars
walk), and the do.js caller rewire with its split-clone deleted. Promise matches deliverable.

## Inventory

| JS function | kind | C locus (csym) |
|---|---|---|
| `find_qarti` (restart) | in-file, C staticfn | `questpgr.c:72–84` |
| `find_quest_artifact` (restart) | in-file | `questpgr.c:87–120` |
| `deliver_by_pline` (restart + export) | C staticfn, exported for do.js | `questpgr.c:422–436` |
| `skip_pager` | verified whole, no diff | `questpgr.c:458–465` |

No new clones. Re-pointed: do.js drops its `convert_line` import (now unused there — zero
remaining uses in do.js) for the `deliver_by_pline` import on the same questpgr edge.
Required `sym.mjs`: `convert_line js/questpgr.js:812 sync` (still live at its home);
`is_quest_artifact` has exports at quest.js:331 + dogmove.js:168 (pre-existing multi-export;
find_qarti uses the in-file C-locus one); `Has_contents js/const.js:3202 sync`;
`copynchars js/hacklib.js:246 sync` (stops at `\n`/n — verified body).

## C ↔ JS fidelity

**find_qarti** — confirm. nobj loop with `is_quest_artifact` first, then `Has_contents` +
recurse-cobj (`:80` order, `&&` short-circuit ≡ nested ifs). Array-head walker is the
documented D-1691 shaping (invent is an Array; null head finds nothing like C `:17`).
In-file `is_quest_artifact` (oartifact == questarti, C `:66–70`) replaces the inlined test.

**find_quest_artifact** — confirm in C chain order with `!qarti &&` gates: INVENT (`:94–95`),
FLOOR (`:96–97`), MINVENT over fmon with DEADMONSTER skip (`:98–103`), MIGRATING
(migrating_mons minvent with DEADMONSTER skip, then migrating_objs, `:104–114`, comment kept),
BURIED (`:117–118`). The `mhp != null && mhp <= 0` skip-guard is byte-identical in the old fmon
loop and the new migrating loop (pre-existing in-file shape for missing-mhp; C `mhp < 1` cannot
be missing). Sole C caller quest.c:81 → JS on_goal quest.js:201 with the exact C whichchains
(FLOOR|MINVENT|BURIED, INVENT omitted per quest.c:78–80) ✓.

**deliver_by_pline** — confirm, line-faithful: `msgend = eos`, `while (msgp < msgend)`,
`copynchars(slice(msgp, msgend), BUFSZ-1)` (slice-to-msgend ≡ C's NUL bound),
`msgp += len + 1`, `pline(convert_line(chunk))`. C quirks preserved exactly: >255-char lines
truncate and skip one char (+1 past a non-newline stop); blank lines pline empty;
trailing newline adds no extra pline. Both behavior deltas vs the old code (extra empty pline
on trailing `\n`; do.js skipping blank lines via `if (line)`) move toward C. Callers: C `:593`
(output 0/1 arm) → questpgr.js:1165 wired (verified in context); C `:659` → do.js:2278 now calls
the live export. Export-of-staticfn is justified by the cross-module C caller.

Grep: no FORCE/DIAG/getRngLog/seed-gates/fastforward/coords. Rule #2: clean (see 2096).

## Hallucinations / overclaim

None. "JS 11 vs C 23 code lines" is a measure, not a claim of divergence; the D-log Verify
bullet honestly reports VERIFY: PASS without corpus-PASS language (coverage rows).

## Density

Breadth-phase cluster: 4 questpgr.c functions (3 restarts + 1 verified-whole) + the do.js caller
the new export exists to serve, 84 js changed lines. Within §2b. Each function has its Ledger
entry (all ported) and Verify line. Per-function verdicts: all ACCEPT.

## Verification

Re-measured: `hidden-proxy.mjs verify find_quest_artifact,find_qarti,deliver_by_pline,skip_pager
--base 990da2b8d~1 --reach-all` → all four `0 blocked` + `smoke 24 PASS, 0 regressed → REACH-OK`.
No REGRESSED. Matches D-3143.

## Actionable C-wrongs

None.

## Verdict

Verdict: **ACCEPT**
