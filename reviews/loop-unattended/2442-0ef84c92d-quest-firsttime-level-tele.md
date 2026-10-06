# Review 2442 — 0ef84c92d — quest firsttime texts (level_tele cliff)

**Metadata.** SHA `0ef84c92d` (2026-10-06, D-3558). Type: **cliff**: writer
port (quest home-arrival `firsttime` data) for the cliffs head
`teleport.c level_tele` (13 blocked). `js/` insertions: 75, all in
`js/questpgr.js` (data tables only). No later questpgr.js touches, so HEAD
reads are at-SHA reads.

## Intent vs deliverable

Promise: six role `firsttime` bodies + meta entries verbatim from quest.lua
— the second message C prints behind the arrival `--More--`; 3 PASS + 4
moved + 6 measured-unchanged.

Diff actually adds: Hea/Kni/Ran/Rog/Sam/Tou bodies, six
`{output:'text', synopsis}` meta entries, header role-list update. Data
only, no new edges. Promise matches diff.

## Inventory

| # | Function | Status | JS | C range |
|---|----------|--------|----|---------|
| 1 | `com_pager_core` (firsttime data for 6 roles; body pre-existing) | ported | [questpgr.js](/home/debian/dev/teleport-contest/js/questpgr.js:1324) (data `:272–317`, `:627–650`) | questpgr.c:467–621 (`csym.mjs`) |

## C ↔ JS fidelity

**Data verbatim — all six blocks diffed against pinned quest.lua:** Hea
:941–953, Kni :1178–1187, Ran :1824–1832, Rog :2044–2050, Sam :2260–2272,
Tou :2492–2503 — bodies and `synopsis` strings exact, including double
spaces after periods, truly-empty blank lines (`cat -A` on Hea), and the
Rog "AND word" / Sam "%n" / Tou "%x" conversions. Synopsis is dat (each
block's own `synopsis = ...` line), not invented. Conversions
H/l/n/d/x confirmed as shipped cases in the converter (D-1649).
`common` carries no `firsttime` (13 `firsttime` blocks = 13 roles), so the
JS miss→common-retry→silence path for Cav/Mon/Val can only ever miss —
matching the named gap (C never misses because dat is complete).

**`com_pager_core` whole:** JS body walked against C :467–621 in order —
skip_pager gate, nhl shuffle, lookup+msg_fallbacks tryagain, miss→silent
(named: showerror-impossible named in doc), text, rawtext-before-array,
synopsis+output options, array `rn2(nelems)` (one draw, same element),
default+multiline promote-to-window with synthesized synopsis,
pline/window delivery (3→menu else text), synopsis convert+putmsghistory —
all present, no stubs. `qt_pager` common retry live (js/questpgr.js:1428,
≡ C :629–634). Callers wired: C do.c:1892 → js/do.js:2318, quest.c:98 →
js/quest.js:208, quest.c:29 → js/quest.js:78 (`on_start` first-visit
`qt_pager('firsttime')`, read and confirmed). No RNG on the firsttime path
(text-form, output=text → window) either side. No clones (pure data add).

Named omissions verified real and map-homed: Cav/Mon/Val bodies at the
cited quest.lua lines (:720/:1388/:2713 — all contain `firsttime = {`);
nexttime/othertime beyond Arc/Bar/Pri pre-existing; the six map writers have
per-session geom-probe evidence named in the D-log.

## Hallucinations / overclaim

None. "11/13 screen-first at teleport.c:1427" with the `--More--` mechanism
is confirmed by my re-measure (the 4 revealed-downstream sessions now show
identical `--More--` toplines both sides — the arm demonstrably delivers).
The `cMsgOwners` comment-literal dismissal is specific and falsifiable.

## Density

Cliff §10.18: `level_tele` confirmed as the head row at the parent (13
blocked). Writer port is the prescribed deliverable (the divergence names
the arrival-message writer, not the teleporter). One cliff, one function,
own `Ledger:` entry ✓. All 3 named probes of the row moved (94016 PASS,
94396 →mfind0@64, 94256 →yn_function@127); the 6 unchanged non-probe
sessions each carry a C-side measurement + named writer — §7 discipline,
not NO-MOVEMENT-as-omission. Per-function verdict ACCEPT → SHA ACCEPT.

## Verification

- Added-code grep (`^+.*FORCE|DIAG|getRngLog|fastforward`): clean (the one
  grep hit is the commit message's own "no DIAG/FORCE/seed gates" line).
- Rule #2: clean this iteration (see 2439).
- Re-measure (mine, `--base 0ef84c92d~1 --reach-all`):
  `verify level_tele`: **3 PASS, 4 moved past, 6 unchanged, 0 worse →
  PROGRESS** — session-for-session identical to the D-log (PASS
  94016/94056/94076; 94396 →mfind0@64, 94256 →yn_function@127,
  94376 →usmellmon@234, 94316 →inuse_classify@150); smoke 24/24, 0
  regressed → REACH-OK. No REGRESSED, no vacuity.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
