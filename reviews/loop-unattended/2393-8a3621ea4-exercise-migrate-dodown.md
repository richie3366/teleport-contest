# Review 2393 — 8a3621ea4 — exercise/migrate wires + dodown/doup/impossible audits (D-3461)

Metadata: SHA `8a3621ea4`, D-3461, 6 functions (whole Method each).
Files: `js/attrib.js` (+import, +tail), `js/invent.js` (oldcap reorder),
`js/teleport.js` (+import, +guard).

## Intent vs deliverable

Promise: wire exercise's :516–517 encumber_msg tail and
migrate_to_level's mon.c:2703 unstuck; retire dodown's misfiled omit;
audit doup/impossible. Diff actually adds: tail gate + float call,
oldcap commit moved pre-await, guarded `void unstuck(mtmp)`, 2 import
names on pre-existing edges. Matches; no scope drift.

## Inventory

| fn | status | JS | C |
|----|--------|----|---|
| exercise | ported | js/attrib.js:224 | attrib.c:488–518 |
| encumber_msg | ported | js/invent.js:1177 | pickup.c:1977–2020 |
| migrate_to_level | partial | js/teleport.js:2816 | dog.c:887–932 + mon.c:2696–2732 |
| dodown | ported | js/do.js:3390 | do.c:1130–1294 |
| doup | audited | js/do.js:3562 | do.c:1297–1344 |
| impossible | audited | js/display.js:8970 | pline.c:583–634 |

## C ↔ JS fidelity

**exercise — confirm.** INT/CHA + Upolyd/WIS guards, AEXE gate,
`rn2(19) > ACURR : -rn2(2)` (RNG call-for-call), tail gate
`(moves > 0) && (STR \|\| CON)` exactly C :516–517. Rationale
correction (no behavior): debugpline0/3 are NOT "`#ifdef DEBUG`
compiled out" — DEBUG is always defined (patchlevel.h:35–37 via
config.h) — they compile to a runtime `showdebug` check, dead unless
wizard + SYSCF DEBUGFILES names the file (files.c:3126). Dead in every
scored context, so "none — whole" stands, but the D-2586 slogan is
wrong as stated.

**encumber_msg — confirm.** Switch texts/botl exact (incl. double
spaces, stagger interpolation, can-barely/can't-even gate); stagger
verified pure lookup (mondata.c:1367–1377 arrays match js/mhitm.js:1117,
single export, no RNG) so the float is RNG-safe. The oldcap commit
reorder (C :2019 post-pline → pre-await) is the C-faithful emulation
under float: C's blocking pline admits no interleave, and early commit
gives a second crossing reader the settled value (no duplicate
message); message/switch arms untouched.

**migrate_to_level — confirm (partial, honestly disclosed).** Guard
`u.ustuck === mtmp` is exactly C unstuck's entry gate (mon.c:3440), so
the common case never floats — exact sync no-op. Callee LIVE + whole:
```
unstuck          js/mhitu.js:1567   ASYNC — await required
```
(set_ustuck/swallowed placebc+docrt/mspec_used rnd(2) all C :3440–3466).
The rare guard-true float (incl. late rnd(2)) is named in code + D-log;
`partial` correct. Both new import names ride ALREADY edges
(`--can`: attrib→invent, teleport→mhitu pre-exist) — zero new edges,
no TDZ (call-time use). No deleted/re-pointed symbols.

**dodown — confirm (ported).** All 14 arms in C order: move cmd,
rooted, stucksteed, stairway, levitation (artifact rnz(100) loop,
float_down, latent, Blind glyph recheck, air/water/floating), lurker
unhide, stuck, pit/shaft, autodig/You_cant (+VIBRATING " yet"), valley
gate, pet hold, squeeze (rn2(3) → losehp Maybe_Half_Phys(rnd(4))),
locomotion message, stronghold/dst/ladder dispatch. RNG order exact;
losehp sync (no float). Callees live.

**doup — confirm.** All 11 arms in C order incl. pit climb, load gate,
ledger-1 fuzzer/yn, pet hold, prev_level. Micro-note: JS adds
`\|\| stway.isladder` to C's grid-only at_ladder read — fires only on
model inconsistency (consistent model: identical); behavior-null, unqueued.

**impossible — confirm.** Recursion throw, latch, BUFSZ-1 chop, fuzzer
panic pre-pline, URGENT pline, sanity early return, disorder/report/
support (null-check matches C pointer test) — all C :591–620.
:598 paniclog (filesystem) + :621–631 CRASHREPORT (live on Linux but
sysconf-url-gated, network submission) are true Rule #2 omits.

## Hallucinations / overclaim

None. The unstuck override of D-3429 ("cannot ship" → guarded float)
is disclosed in code + D-log with the remaining float named. NO
MOVEMENT is disclosed as VERIFY: FAIL, not smuggled as omission.

## Density

6 Ledger entries; Verify lines cover 4 — doup/impossible lack their
own (no JS change; my re-run below fills the gap — nit, not a miss).
NO MOVEMENT triage is sound: the s97 block is an RNG draw at :509,
upstream of the RNG-free tail; tail cannot move it. Left open: none.

## Verification

Re-ran all 6 `--base 8a3621ea4~1 --reach-all`: exercise 1 blocked →
NO MOVEMENT (0/0/1/0 — still s97, not WORSE, as disclosed) +
REACH-OK 677/677; other 5 vacuous (rows cited none) + REACH-OK
(24/24 each, 0 regressed). Matches the D-log. Diff grep clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
