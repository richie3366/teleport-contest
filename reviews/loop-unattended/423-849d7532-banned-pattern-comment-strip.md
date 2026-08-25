# Review 423 — 849d7532 — banned-pattern comment strip (no D-id)

## Metadata
- Full / short hash: `849d7532cc296b42bb27dfbd23bf33178a1b622f` / `849d7532`
- Parent: `2173fc2d` (D-1462). This file audits **this SHA only** (fifth of nine `js/` commits since review **418**). No D-id. No archive **Addressed:** line (not a map Open pop).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 10:54:15 +0200
- D-id: none
- Stats: 5 files, +106 / −39 — `js/lock.js` +1 / −1; `js/zap.js` +1 / −1; also `docs/GROK-PLAYBOOK.md`, `docs/AGENT-PORT-LOOP.md`, `scripts/agent-port-loop.sh`.
- Claims to close: supervisor banned-pattern hit on D-1462 comments (`\bFORCE\b`), not a C omit. `reviews/loop-2026-08-15/` has no matching Must-fix. Review **422** already accepted D-1462’s `doorlock` against C.
- JS / map: two comment tokens in `lock.js` `doorlock` default and `zap.js` `bhit` named-omit list. No function body change. No map row.
- Prior reviews this SHA claims to close: none. It is a heal of D-1462’s comment grep, not a new C locus.

## Intent vs deliverable

Git subject promises: “Keep the unattended loop up after a banned-pattern hit so the next iteration can strip DIAG/FORCE tokens instead of stopping for a human revert.”

That is a **process** promise, not “Match C”. D-1462’s `js/` added comments containing a bare word `FORCE` (`STRIKING / FORCE named`, `LOCKING/STRIKING/ FORCE`). Supervisor `dump_banned_hits` uses word-bound `\bFORCE\b` on `+` lines, so `SPE_FORCE_BOLT` / `FORCE_BOLT` pass and a standalone `FORCE` fails.

The **js/** diff **does** replace those two comment tokens with `WAN_STRIKING` / `SPE_FORCE_BOLT`. It **does not** change `doorlock`, `bhit`, RNG, or control flow. Executable JS after this SHA is identical to `2173fc2d`.

The same commit also edits loop authority files (playbook §10 banned-pattern continue; `agent-port-loop.sh` heal instead of STOP; `AGENT-PORT-LOOP.md`). Constitution forbids loop agents from editing the playbook / loop scripts. That is **process debt for a human**, not a C↔JS fidelity bug. This review does not Must-fix “revert the playbook” — that is not a port cluster.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `doorlock` default comment | comment only | `FORCE` → `SPE_FORCE_BOLT` |
| `bhit` named-omit comment | comment only | `FORCE` → `SPE_FORCE_BOLT` |
| `doorlock` OPENING/KNOCK body | C `:1113–1125` / `:1193–1200`, **unchanged** | still D-1462 |
| `bhit` `IS_DOOR\|\|SDOOR` | C `:4056–4074`, **unchanged** | |
| playbook / loop script | **not C** | supervisor policy; out of this audit’s Must-fix |

No `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Remaining `js/` `FORCE` hits are `SPE_FORCE_BOLT` / `FORCE_BOLT` (underscore is a word char, so `\bFORCE\b` does not match). Rule #2 clean. **New gameplay RNG:** none.

## C ↔ JS fidelity

C `lock.c` `doorlock` `:1103–1272` and C `zap.c` `bhit` `:4056–4074` are **byte-identical in JS behavior** to review **422**. This SHA does not add, remove, or reorder any `if` / `switch` / `rn2`.

Walk the still-live OPENING/KNOCK envelope (unchanged bodies):

1. `bhit` ZAPPED_WAND + `IS_DOOR(typ) || typ === SDOOR` (`rm.h` `IS_DOOR` is `DOOR` only; `SDOOR=14`). Match `:4056`.
2. JS still calls `doorlock` only for `WAN_OPENING` / `SPE_KNOCK`. C switch also lists LOCKING/STRIKING/FORCE — named omit, not introduced here.
3. SDOOR OPENING/KNOCK: `typ=DOOR`, `D_CLOSED|D_TRAPPED`, pline, **return true** (skip picking_at). Match `:1113–1125`.
4. Locked `DOOR`: “The door unlocks!”, `D_CLOSED|D_TRAPPED`; `cansee` pline; `picking_at` → `stop_occupation`+`reset_pick`. Match `:1193–1200` / `:1267–1271`.
5. Unlocked door: `res=false`. Match `:1198–1199`.
6. `learnwand` if `cansee`; SPE_KNOCK SPBOOK skip. Match `:4064–4066` / `learnwand` `:133`.

Comment text is not a C callee, not a clone, not a no-op function. Rewriting `FORCE` to `SPE_FORCE_BOLT` does not change the named omit (LOCKING/STRIKING still default false).

Hallucination check: the subject does **not** say “Match C” for a new dispatch. There is **no** stub callee. Claiming this SHA ported STRIKING `doorlock` would be a lie; the comments still say named. They did not.

## Hallucinations / overclaim

Subject says strip DIAG/FORCE tokens so the loop can continue. **True for js/:** two comment lines. **Not a C port.** Do **not** stamp a D-id. Do **not** treat this as closing LOCKING/STRIKING doorlock. Do **not** treat playbook/script edits as scored-engine progress. Fortress PASS is unchanged because JS semantics are unchanged.

Overclaim risk: “banned-pattern heal” can be misread as “D-1462 was cheating.” D-1462’s **code** was C-faithful OPENING/KNOCK; the grep hit was **comment wording**. Review **422** stands.

## Density

Two comment substitutions. Playbook §2b “too small” if this were a port. As a supervisor heal of a false-positive-ish token in comments, it is the minimum that unblocks the loop. Not a quality-risk over-batch. The authority-file edits are a **separate** process cluster that should not have been bundled with `js/` — noted, not Must-fix.

## Branch-by-branch confirm

1. `git show 849d7532 -- js/` is comments only. Confirm by reading `doorlock` / `bhit` vs `2173fc2d`: bodies match.
2. OPENING/KNOCK SDOOR appear still returns true. Match C `:1124–1125`.
3. OPENING/KNOCK locked unlock still sets `D_CLOSED|D_TRAPPED`. Match C `:1195–1197`.
4. LOCKING/STRIKING still not implemented. Named.
5. No new RNG. No seed gate.
6. **Public-unhit** of new behavior (there is none).

## Anti-pattern / Rule #2 (this SHA `js/`)

The **reason this SHA exists** is the anti-pattern grep on comments. Production control flow was already clean (no `if (FORCE)`, no `DIAG`, no `getRngLog`). Rule #2: no `fs` / `node:*`. The heal uses full C names, which is what playbook §10 now tells the next iter to do.

## Verification

No focused session, no canary, no D-log. Correct: comments cannot change screens. D-1462 already ran green+cohort. I did not re-run those. This audit cadence: full `sessions` at HEAD after all nine SHAs. Unchanged JS semantics ⇒ fortress should still hold if D-1462 held.

## Actionable C-wrongs

None. No C locus changed. Do not Must-fix “rename comments.” Do not Must-fix “revert playbook” as a port Open/Must-fix row (wrong queue). Do not Must-fix “implement STRIKING doorlock in this SHA.”

Named omits remain those of **422** (LOCKING/STRIKING `doorlock`, `bhito` boxlock, `mbhit`).

Process note (not Must-fix): loop agents must not edit `GROK-PLAYBOOK.md` / `scripts/agent-port-loop.sh`. A human/auditor should decide whether those policy hunks stay.

## Callers / RNG ledger

Same callers as D-1462. Dice: none added or removed.

`\bFORCE\b` vs `SPE_FORCE_BOLT`: underscore keeps `FORCE_BOLT` from matching the supervisor word-bound grep. Bare `FORCE` in a comment will still fail a future `+` line. Port iters should keep writing `SPE_FORCE_BOLT`.

D-1462 `doorlock` SDOOR still returns true before `:1267` picking_at. Locked `DOOR` still sets `D_CLOSED|D_TRAPPED`. C `bhit` `:4056` is still `IS_DOOR || SDOOR`, not STONE. Those facts are **422**’s; this SHA only renamed comment tokens.

`js/zap.js` still has `FORCE_BOLT` in other comments (`SPE_FORCE_BOLT` / `FORCE_BOLT named`). Word-bound grep does not match those. A future `+` line with a standalone `FORCE` will fail again.

C `objects.h` / `spells.h` identifier is `SPE_FORCE_BOLT` (typ 21 in this port’s objects table). Commenting that name is the honest omit label. Using a shorthand `FORCE` was the only mistake this SHA fixed.

D-1462 already used `SPE_FORCE_BOLT` in executable `otyp` tests. Only the English comments used the banned token.

Verdict: **ACCEPT**
