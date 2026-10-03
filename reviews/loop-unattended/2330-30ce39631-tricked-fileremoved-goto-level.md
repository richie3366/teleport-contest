# Review 2330 — 30ce39631 — tricked_fileremoved whole port + goto_level wiring

**SHA:** `30ce39631` — "`save.c` tricked_fileremoved whole port (vanished-file guard) + goto_level wiring (D-3375)."
**Scope:** js/save.js +27/−1, js/do.js +14/−8, map data.md line, scripts/tricked-fileremoved.test.mjs (new). No clone deleted — no re-point sym required (export-shape sym below).
**Prior reviews closed:** none.

## Intent vs deliverable

Promise: whole C body of `tricked_fileremoved` at C-home plus the do.c:1705 caller wiring with the wizard-mode `error()` arm rendered. Diff delivers exactly that: the async export, `{ s }` errbuf holder through `open_levelfile`, TRUE-arm pline + `nh_terminate(EXIT_FAILURE)` + return, stale-comment replacement, map line update, 3-case test. No drift.

## Inventory

| # | JS symbol/change | Kind | C locus (csym range) |
|---|------------------|------|----------------------|
| 1 | `tricked_fileremoved` js/save.js:531 | C callee port (whole body) | save.c:336–347 |
| 2 | goto_level stash arm js/do.js:1994–2009 | C caller wiring (do.c:1704–1708) | do.c:1704–1708 |

`sym.mjs`: `tricked_fileremoved js/save.js:531 ASYNC`, `done js/end.js:2087 ASYNC`, `nh_terminate js/end.js:1012 sync`, `TRICKED js/const.js:524 export const`. Async is forced by `await done(TRICKED)` (C `done` is sync; JS done is async) — correct, no sync-async mismatch at the call site (`await` used).

## C ↔ JS fidelity

**Body** (C save.c:336–347): `if (!nhfp) { pline1(whynot); pline("Probably someone removed it."); Strcpy(svk.killer.name, whynot); done(TRICKED); return TRUE; } return FALSE;` JS executes the same 4 statements in C order, then `return true` / `return false`. Line-by-line: pline1→pline rendering matches the cited precedent (js/apply.js:3151 `pline(nothing_happens) // C: pline1(nothing_happens)`); killer write uses the end.js shape with object-ensure; `String(whynot ?? '')` is defensive-only (C arg is NONNULLARG2 per extern.h:2824). No RNG. **Confirm.**

**Caller do.c:1705** (`--callers` confirms exactly do.c:1705 + save.c:377 + the extern decl): C TRUE arm is `error("Cannot continue this game.")` — sys/share noreturn exit, with the C comment "we'll reach here if running in wizard mode". JS renders pline + `nh_terminate(EXIT_FAILURE)` (sets `exiting`/`exit_status`/`gameover`, end.js:1023–1025) + `return`, so the FALSE-arm fallthrough to getlev is skipped exactly as C's noreturn skips reseed/getlev. `whynot` holder contract verified both ends: caller passes `{ s: '' }`, `open_levelfile` clears (`files.js:831`) and writes the failure text (`:862`) into `errbuf.s`. **Confirm.**

**Caller save.c:377** (inside unported INSURANCE-only `savestateinlock`): NAMED in this commit's map line (data.md:113: "do.c:1705 wired, save.c:377 with savestateinlock") and the D-log — ships with that function. Legitimate named omission, not a silent stub.

Callee closure: `pline` LIVE, `done` LIVE (partial but live), `nh_terminate` LIVE, `open_levelfile` LIVE. No clones, no stubs.

Quoted C body (save.c:336–347, the whole function):

```c
boolean tricked_fileremoved(NHFILE *nhfp, char *whynot)
{
    if (!nhfp) {
        pline1(whynot);
        pline("Probably someone removed it.");
        Strcpy(svk.killer.name, whynot);
        done(TRICKED);
        return TRUE;
    }
    return FALSE;
}
```

Caller contexts: do.c:1704–1708 (`nhfp = open_levelfile(new_ledger, whynot); if (tricked_fileremoved(nhfp, whynot)) { /* we'll reach here if running in wizard mode */ error("Cannot continue this game."); }` then reseed×2 + getlev) — JS TRUE arm (pline + nh_terminate + return) skips getlev exactly as C's noreturn `error()` does. save.c:376–380 (inside INSURANCE-only `savestateinlock`: TRUE arm does `program_state.saving--; return;`) — named with that unported function. The `whynot` holder contract holds at both ends: caller passes `{ s: '' }`, `open_levelfile` clears (`files.js:831`) and writes the failure text (`:862`) into `errbuf.s`, and the guard reads `whynot.s`.

| Callee | Status | Evidence |
|---|---|---|
| pline | LIVE | display.js; pline1→pline per apply.js:3151 precedent |
| done | LIVE | end.js:2087 async, awaited |
| nh_terminate | LIVE | end.js:1012; sets exiting/exit_status/gameover |
| open_levelfile | LIVE | files.js:829; (lev, errbuf) shape |

## Hallucinations / overclaim

None. "Whole C body" is exact (12-line C body, all arms). "Reached only in wizard mode" quotes the C comment's meaning accurately. The stale-comment claim ("JS has no pline1/error()") was actually stale — both now have established renderings — so replacing it was correct, not churn.

## Density

Breadth phase, §2b: 1 whole C function + its C caller wiring, own C-locus / Callers / Verify / Named-omissions sub-bullets, own `Ledger: tricked_fileremoved ported`. ~40 js/ insertions, below the ~80 bar; D-log Status states the exception (both callees already live, same-file `free_dungeons` FREE_ALL_MEMORY-only, coverage block at 0 rows). Single-function cluster precedent (D-3371/D-3374) applies. Whole-function verdict: whole.

## Verification

Re-measured (`verify tricked_fileremoved --base 30ce39631~1 --reach-all`): 0 blocked + vacuous-note + smoke 24/24 REACH-OK — matches the D-log line exactly. Verbatim:

```text
verify tricked_fileremoved: baseline 30ce39631~1 … 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke tricked_fileremoved: no RNG-tagged reach; fixed smoke spread (24 run, 11.0s): 24 PASS, 0 regressed → REACH-OK
``` D-log also claims full 44/44 auto (shared file js/do.js changed) with cohort 7/7 — consistent. Maintained test re-run by me: 3/3 pass. Diff grep: no FORCE/DIAG/RNG-log/fastforward/coordinate hits. Scoreboard hunk is header-only (checked pattern from 2329; same verify-stamp shape).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
