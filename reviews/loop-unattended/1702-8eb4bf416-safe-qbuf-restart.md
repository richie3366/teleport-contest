# Review 1702 — 8eb4bf416 — `objnam.c` safe_qbuf whole-body restart (D-2743)

Metadata: commit `8eb4bf416`, D-2743, `js/objnam.js` only. Coverage row (C 67 L / JS was 36 L), 0 corpus blocks. No prior review claimed closed. `csym safe_qbuf` finds no definition line (the body is `objnam.c:5624–5698`, read directly); `--callers` lists the sites.

## Intent vs deliverable

Subject promises a C-order restart: alias arm, pointer-checked suffix, per-arm cites. The diff is that restart plus a longer doc comment. `short_oname` is not logic-changed (the hunk is the comment that sits under it). Promise matches the function body. Callers are not all switched to the export; the ones left inlined are named.

## Inventory

Changed JS: `safe_qbuf` (`js/objnam.js:3015`). No new function, no deleted symbol, no new import. `QBUFSZ` is already `128` (`js/const.js:947`).

## Callee closure

No symbol was deleted or re-pointed. `sym.mjs`:

```text
safe_qbuf        js/objnam.js:3015   sync
short_oname      js/objnam.js:2924   sync
```

`short_oname` is the same module (LIVE). `impossible` is the named omit (not imported). `releaseobuf` has no JS pool (named GC no-op). No new edge.

## C ↔ JS fidelity

C `objnam.c:5624–5698`. No RNG.

- Lens: `lenlimit = QBUFSZ - 1`. Prefix length is `buf.length` after the prefix arms, which is C `:5668` `strlen(qbuf)` (the separate `len_qpfx` is only for the omitted `impossible` checks). ✓
- Prefix: `_qbuf === qprefix` slices to `lenlimit` (C `:5657–5659` `*endp = '\\0'` on the same buffer). JS strings are immutable, so callers that pass the same string twice converge with the copy arm; the branch is not a no-op in source order. `qprefix != null` copy arm and empty start match `:5660–5666`. Pointer test, not truthiness: an empty prefix is kept. ✓
- Truncation arm `:5670–5681`: if `len + lastR + suffix > lenlimit`, skip `short_oname`, `strncpy` lastR into the remainder, then suffix only when `qsuffix != null` (C pointer check, not the old truthiness test). `slice(0, lenlimit)` is `*endp = '\\0'`. ✓
- Format arm `:5682–5695`: `len += len_qsfx`, `short_oname(..., lenlimit - len)`, strcat name if it fits else `lastR`, then suffix on `qsuffix != null`. ✓
- `lastR == null → ''` is extra. C `strlen(lastR)` would fault. Every real call passes a literal. Harmless.
- `impossible` `:5646–5653` not called. C continues after it, so the buffer is unchanged. Named.
- `releaseobuf` `:5691` not called. Named GC no-op.

Callers (`--callers`, comments and the `extern.h` decl set aside): 24 calls. At this SHA, `git grep` shows the live export at do_name (2), eat floorfood (3 JS copies of `eat.c:3698`), mhitu (2), pickup (5), shk dopayobj (1), trap (2) — 15 JS calls for the 13 C sites the D-log lists. Not called from here, and named as such: apply `:1410/:1415/:3935`, eat `:3112`, invent `:2462/:5453`, lock `:729`, shk `:4058/:4154` (inlined in those ports) and lock `:474/:495` (left on the then-open `pick_lock` row). `potion.c:2290` is a comment, not a call. No new call from a site C never calls.

## Hallucinations / overclaim

"25 call sites" counts the potion comment plus 24 calls. The disposition (13 wired / 9 inlined / 2 lock-owned / 1 comment) adds up. "no new cross-module edge" is true. No FORCE/DIAG/seed/coordinate/`fastforward`. Rule #2 clean.

## Density

One 75-line C function, one module, under 60 JS lines changed. Right-sized. Leaving the inlined callers named, rather than rewriting nine other modules, matches the two-fix rule.

## Verification

Re-measured (`--base 8eb4bf416~1 --reach-all`). Parent scoreboard is `d44374fc8`. Row cited 0 blocks. D-log says "note 0 blocked", not a fake PASS.

```text
verify safe_qbuf: baseline 8eb4bf416~1 (scoreboard at d44374fc8) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify safe_qbuf: no corpus session is blocked on it at 8eb4bf416~1 — a vacuous verify is NOT a corpus PASS. [...]
smoke safe_qbuf: no RNG-tagged reach; fixed smoke spread (24 run, 3.0s): 24 PASS, 0 regressed → REACH-OK
```

0 REGRESSED. Green/strict/cohort per the D-log; `objnam.js` is not in the shared set.

## Actionable C-wrongs

None. `impossible` and `releaseobuf` are named omits in the function comment and the D-log. The nine inlined callers and the two `pick_lock` prompts are named there too (the lock pair is wired by the next SHA, reviewed separately). Not Must-fix.

Verdict: **ACCEPT-WITH-DEBT**
