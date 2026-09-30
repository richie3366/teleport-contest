# Review 2125 — 4d4f8e851 — there command

SHA `4d4f8e851`, D-3165; 2026-09-30. Read review 2104: its named unwired
dotherecmdmenu caller is now supplied.

## Intent vs deliverable

Subject promises “dotherecmdmenu whole port”. Diff adds the async export,
getdir import, and EXT_CMDS lazy runner.

## Inventory

dotherecmdmenu is whole; runner is JS dispatch plumbing. getdir is LIVE
async; here_cmd_menu and there_cmd_menu are local C-static body ports
(verified CLONE, cmd.c:4898–4903/:4841–4896), not no-ops. isok and
click/ECMD constants are LIVE macro expansions. Nothing deleted or
re-pointed.

## C ↔ JS fidelity

C cmd.c:4342–4375: snapshot click coordinates; enable both clicks;
stamped-self/stamped-other menu, reset coordinates and flag, return TIME
only for nonzero/non-ESC. Otherwise await getdir, snapshot click before
clearing, cancel invalid direction/location, choose there for dx/dy or here
for self, same return. JS preserves every branch and explicitly treats
string NUL as zero. No RNG added; getdir retains C confusion RNG. `csym
--callers` returns declaration :104; function-pointer row :1899–1900 is
wired by runner. Menu clones preserve raw deltas, fallback walk/travel, fast
action and pick/cancel; here discards the result like C.

## Hallucinations / overclaim

Prior omission is closed. No stub dispatch. Diff scan finds no trace-shaped
controls; full Rule #2 scan clean.

## Density

dotherecmdmenu: ACCEPT; Ledger: ported. Whole-function closure, short
exception justified by stale same-file peers. D-log has vacuous verify,
REACH-OK, green/strict and cohort.

## Verification

Historical-SHA re-run `verify dotherecmdmenu --base 4d4f8e851~1
--reach-all`:

```text
verify dotherecmdmenu: 0 session(s) blocked
smoke dotherecmdmenu: 24 PASS, 0 regressed → REACH-OK
```

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
