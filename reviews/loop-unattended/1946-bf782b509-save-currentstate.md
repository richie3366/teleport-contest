# Review 1946 — bf782b509 — do.c save_currentstate insurance checkpoint (D-2987)

## Metadata

- Full / short hash: `bf782b509a1bad23834482d70af8e5fb88f18cb7` / `bf782b509`
- Parent: `dceb8a7b3` (D-2986 argcheck, review 1945 ACCEPT).
- Author, date: debian (Co-authored-by Cursor), 2026-09-27 20:15:46 +0200
- D-id: **D-2987** (first of two commits; second is `05a11d7e9`)
- Stats: `js/do.js` +44/−6, `js/allmain.js` +3/−1, `js/wizcmds.js` +3/−1. `js/` insertions **~50**. Band 80–350.
- Claims to close: coverage row `do.c save_currentstate` (0 corpus blocks cited).

## Intent vs deliverable

Subject promises: "`save_currentstate` brackets the insurance checkpoint".
Body promises one exported `save_currentstate` in C order, the counter
bracketing the call, `savestateinlock`'s file body staying named, the
level-rewrite arm not calling `create_levelfile`, the null-handle return
not taken.

Diff actually adds: `save_currentstate()` in `js/do.js:1538` (sync,
exported) + three caller wirings (`newgame`, `goto_level`,
`makemap_prepost`). No helper added. Promise matches deliverable.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `save_currentstate` | LIVE import | new export, `js/do.js:1538`, sync |
| `newgame` / `goto_level` / `makemap_prepost` call sites | LIVE repaired | one-line wirings |
| `currentlevel_rewrite` / `bufon` / `savelev` / `close_nhfile` | OMIT named | NHFILE level-rewrite arm, D-entry + code comment |
| `savestateinlock` file body (`save.c:369–421`) | OMIT named | D-entry; non-file tail ported |

`node scripts/sym.mjs save_currentstate`:

```
save_currentstate js/do.js:1538   sync
```

No symbol deleted or re-pointed (pure addition). `--can allmain.js do.js`
and `--can wizcmds.js do.js`: **ALREADY** both. Diff grep
`FORCE|DIAG|getRngLog|fastforward`: 0. `imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

C locus: `node scripts/csym.mjs save_currentstate` →
`nethack-c/upstream/src/do.c:1373-1395` (23 lines, `#ifdef INSURANCE`;
`config.h:435` defines it — compiled arm). Callers: `allmain.c:838`,
`cmd.c:1064`, `do.c:1969`.

Branch walk (`:1379–1394`):

- `:1379` `in_checkpoint++` → `ps.in_checkpoint = (...|0)+1`. Match.
- `:1380–1391` `if (flags.ins_chkpt)` level-rewrite arm → empty `if`
  block with per-callee cites (`do.c:1347`, `sfstruct.c:414`, `save.c`,
  `files.c:517`). Named NHFILE omit; the `:1383–1384` null-handle early
  return is correctly not taken since the rewrite is never called.
  `flags.ins_chkpt` ≡ `game.flags.checkpoint` (`js/options.js:7337`). Match.
- `:1393` `savestateinlock()` → `saving` raised and lowered with nothing
  between. C `save.c:349-425`: `saving++` at `:357`, `saving--` at `:422`,
  everything between is `open_levelfile`/`Sfi`/`Sfo`/`close_nhfile` file
  I/O (named). The `gl.looseball/loosechain` scratch writes (`:415–416`)
  feed only the save stream (no reader outside `save.c`/`decl.*`) — no
  live consumer lost. Match.
- `save.c:423` `gh.havestate = flags.ins_chkpt` → `game.havestate =
  !!game.flags?.checkpoint`. Match.
- `:1394` `in_checkpoint--`. Match.

Caller wiring (all three C call sites):

- `allmain.c:838` (newgame, after `urealtime`, before
  `something_worth_saving`) → `js/allmain.js` same order. Match.
- `do.c:1969` (goto_level, after uz0 reset, before `notice_mon_on`) →
  `js/do.js:goto_level` same order. Match.
- `cmd.c:1064` (`makemap_prepost`, inside the `!pre` else arm `:1041–1066`)
  → `js/wizcmds.js:648`; JS early-returns for `pre` at `:615`, so `:648`
  runs only on the post path. Match.

No RNG in C; none in JS. No translate risk: sync function, counters only.

## Hallucinations / overclaim

None. The D-log's "level-rewrite arm does not call `create_levelfile`"
reason (LFILE_EXISTS / game.lock stash) is stated as the rationale, and
the arm is named, not claimed ported.

## Density

§2b breadth phase: C is 23 lines; ~50 JS lines + three caller wirings is
the whole function, not an arm-only port. Right size for a small C locus.

## Verification

D-log Verify bullet: vacuous hidden note (queue row cited 0 blocks) +
`REACH-OK` + green + strict + cohort + full 44/44. Re-ran here:

```
verify save_currentstate: baseline bf782b509~1 ... 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify save_currentstate: no corpus session is blocked on it at bf782b509~1 — a vacuous verify is NOT a corpus PASS...
smoke save_currentstate: no RNG-tagged reach; fixed smoke spread (12 run, 3.7s): 12 PASS, 0 regressed → REACH-OK
```

Vacuous check honestly presented as such (row cited 0 blocks) with
REACH-OK. No REGRESSED session. Claim holds.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
