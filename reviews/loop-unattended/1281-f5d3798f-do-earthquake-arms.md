# Review 1281 — f5d3798f — music.c do_earthquake quake-arm residuals: SCORR unblock_point, ALTAR altarmask_at, se_thump/se_scream (D-2315)

Metadata: SHA `f5d3798f`, D-2315, C-fidelity residuals (row cited 0 blocks). Method: `git show` full `js/music.js` hunk (+15/−4); C `music.c:268` (scream), `:380` (thump), `:420` (altar), `:443` (SCORR) via grep + direct reads (line numbers differ slightly from the D-log's `:277/:384/:416/:430` — same arms, patch-shifted); JS SCORR fallthrough (`js/music.js:714–722`) + `altarmask_at` mimic edge (`js/pray.js:261–276`) read; `sym.mjs unblock_point`; `se_thump`/`se_scream` const grep; `hidden-proxy verify do_earthquake --base f5d3798f~1` re-run; added-lines banned-pattern grep.

## Intent vs deliverable

Subject promises four quake-arm residuals: unconditional `unblock_point` on SCORR→CORR, mimic-aware `altarmask_at` on the ALTAR arm, and both dropped `Soundeffect` calls restored in C order.
Diff actually changes (`js/music.js` only): exactly that. Promise kept.

## Inventory

- `do_pit` unseen-humanoid arm — `Soundeffect(se_scream, 50)` before `You_hear('a scream!')`.
- `do_earthquake` ceiling-hider arm — `Soundeffect(se_thump, 50)` before `You_hear('a thump.')`.
- ALTAR arm — `lev.altarmask | 0` → `altarmask_at(x, y) | 0` via dynamic `pray.js` import.
- SCORR arm — `recalc_block_point(x, y)` → `unblock_point(x, y)`.

## C ↔ JS fidelity

All four arms verified against pinned C (cited lines are the actual `grep` hits; the D-log's pointers are off by ~7–13 lines of patch shift but name the right arms):
1. Scream: C `:266–270` (`cansee → Monnam pline; else-if humanoid → se_scream + scream`) — JS guard structure identical, Soundeffect first ✓.
2. Thump: C `:375–381` (`cansee → Amonnam pline; else-if !is_flyer → se_thump + thump`, under `ceiling_hider` + `mundetected`) — JS identical ✓.
3. Altar: C `:420` `amsk = altarmask_at(x, y)` — JS now calls the live callee (`js/pray.js:261`), whose body carries the `M_AP_FURNITURE` + `S_altar` corpsenm edge the raw-mask read missed ✓.
4. SCORR: C `:442–447` (`typ = CORR; unblock_point(x, y);` unconditional, then `FALLTHROUGH` to CORR) — JS now calls `unblock_point` unconditionally and the `// FALLTHRU` into `case CORR` is intact (`js/music.js:721–722`) ✓.

Callee closure: `unblock_point` LIVE (vision.js:413 sync, existing edge); `altarmask_at` LIVE sync via the file's dynamic-`pray.js` convention (no static-cycle risk); `se_thump`/`se_scream` consts exist (`seffects_data.js:192/:150`); `Soundeffect` joins the existing import and is a verified no-op in this build (`sndprocs.js:42–50`, same as the file's `:1108` convention) — restoring the calls is zero-behavior today, C-ordered for a future SND build. Named omits (`set_levltyp` side effects, boulder `flooreffects` full, `goto_hell`-class `do_pit` tails) carry owning rows. No STUB in a live arm.

On the D-log's full re-read claim (every other arm matching): spot-checked the two highest-risk neighbors of the touched arms rather than taking it on faith.

- ALTAR neighbor: `Amask2align(amsk & AM_MASK)` + `desecrate_altar(FALSE, algn)` intact below the new call — the mask now flows from the mimic-aware source, which is the whole point (a mimicked altar previously desecrated with the wrong alignment).
- SCORR neighbor: `// FALLTHRU` into `case CORR: case ROOM: await do_pit(...)` preserves C's `:447–448` fallthrough, so the revealed corridor still pits correctly.
- `M_AP_TYPE`/`M_AP_TYPMASK` masking (monst.h:73 vs const.js:3200) governs the `seemimic` reveal just above the thump arm — untouched by this diff but load-bearing for whether the thump path is reached; confirmed present, not re-audited.

## Hallucinations / overclaim

None — and the message's honesty paragraph ("unreached by any corpus session … said plainly, not a PASS claim") is exactly what §6 demands. Minor: the D-log's four line pointers (`:277/:384/:416/:430`) are stale by patch shift (actual `:268/:380/:420/:443`); harmless, arms unambiguous.

## Density

Fifteen lines for four arms of one C quake envelope. OK.

## Verification

D-log: clean-tree preflight, `verify --fn do_earthquake` full PASS with hidden note explicitly vacuous, green 2/2 + strict ×2 + cohort 7/7. Re-measured by this review:

```text
verify do_earthquake: baseline f5d3798f~1 (scoreboard at 775e5959) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
```

Matches — vacuous-honest, no `--base` debt. Added-lines grep: no FORCE/DIAG/`getRngLog`/`fastforward`. Full-44 cadence run follows at iteration end.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
