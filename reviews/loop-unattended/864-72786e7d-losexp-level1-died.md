# Review 864 — 72786e7d — exper.c losexp level-1 done(DIED) (D-1894)

Metadata: SHA `72786e7d`, D-1894. Files: `js/exper.js` (+12/−2
functional), `js/sit.js` (comment-only omit-line update). Next index
864.

Intent vs deliverable: subject promises the fatal level-1 drain path
(`killer` set + `done(DIED)`) for corpus session
tour-Valkyrie-70014 step 43/50, where C shows a `--More--` the JS
lacks. The diff delivers exactly that block plus two import names;
nothing else. Promise ≡ diff.

Inventory: `losexp` (exper.js) gains the drainer-fatal arm. New
callee `done` is LIVE: `sym.mjs done` → `js/end.js:1363` ASYNC
(awaited at the call site ✓). `imports.mjs --can js/exper.js
js/end.js done` → ALREADY (joins the existing static edge; no new
module edge). `KILLED_BY`/`DIED` join the existing `const.js` import
(both exported: const.js:527, const.js:507). Nothing deleted or
re-pointed. `sit.js` hunk is a comment.

**C ↔ JS fidelity** (branch-by-branch confirm against
`nethack-c/upstream/src/exper.c:206–291`): C `else /* ulevel==1 */`
arm: `if (drainer) { killer.format=KILLED_BY; if (name != drainer)
Strcpy; done(DIED); }`, then `if (u.ulevel > 1) return` (fuzz
savelife), then `uexp=0` + `lost all experience`, then the shared
uhpmax/uhp/uen tail. JS mirrors this order exactly: `if (drainer)
{ killer-guard; format; name-set; await done(DIED); if (ulevel>1)
return; }`, falling through to the pre-existing `uexp=0` + tail.
Two deviations, both benign and disclosed: (1) C's `name != drainer`
is a pointer guard, JS a value `!==` — outcome-identical (name ends
up equal to drainer either way); (2) `if (!game.killer)` init guard —
C's `svk.killer` always exists; harmless. The `await` is required
(`done` async: returns on Lifesaved/declined `Die?`, matching C's
"no drainer or lifesaved" fall-through). Named omits
(SoundAchievement, Upolyd mh-strip, uhpmax-up clamp) are pre-existing
and out of this screen's path.

Hallucinations / overclaim: none. The attribution note is exemplary:
proxy owner `hitmsg(mhitu.c:59)` needed no change; the true writer
`losexp(exper.c:224)` is named with the measured row evidence.

Density: one arm, one C locus — right-sized (below-40-insertions but
C is that small here; the arm is the whole gap).

Verification: D-log claims hidden PROGRESS with the session PASS.
Re-measured myself: `hidden-proxy.mjs verify hitmsg --base
72786e7d~1` → `1 session(s) blocked on it (1 at baseline, 0 in the
working scoreboard) / tour-Valkyrie-70014-d5-8-15-17-22: PASS` →
`1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS`. Genuine
corpus movement, not vacuous (the D-1831 failure mode is off). Full
44/44 fortress re-run also cited. No banned patterns in the diff.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
