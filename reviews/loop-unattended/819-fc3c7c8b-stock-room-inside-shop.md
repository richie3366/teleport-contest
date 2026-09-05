# Review 819 — fc3c7c8b — shknam.c stock_room closed-shop engraving via inside_shop edge (D-1849)

## Metadata

- Full / short hash: `fc3c7c8bdc8469c13592067c18320479a2a6c986` / `fc3c7c8b`
- Parent: `77d45652` (stamp review 813). Map-driven Open: 2 corpus still `mineralize` (Knight d5, Monk d6).
- Author, date: Raphaël Hervier (Co-authored-by Claude Fable 5.1), 2026-09-05 10:04:00 +0200
- D-id: **D-1849**
- Stats: `js/shknam.js` 19 changed / `js/dungeon.js` 1 changed. `js/` insertions **~10** — a measurement-localized one-cell fix, not a thin port.
- Claims to close: Open `mineralize` 2 corpus blocks **by reassigning the owner** to `stock_room`; falsifies D-1847's "1-cell TRC" with a C `^F` map. Claims 2 corpus PASS + hidden 222/265.
- JS / map: `stock_room` / `inside_shop` / `Is_special`. `c-js-map/data.md`.

## Intent vs deliverable

Git subject promises: import edge-aware `shk.js` `inside_shop`; port the `(Is_special || *in_rooms) ? ROOM : CORR` rewrite (`shknam.c:750–766`); export `Is_special` from `dungeon.js`.

`node scripts/csym.mjs stock_room` → `shknam.c:717–801`; the engraving branch matches `:750–766` (`inside_shop(sx±1,sy)` / `(sx,sy±1)`, `"Closed for inventory"` at `(m,n)`, `typ != CORR && != ROOM` → `(Is_special(&u.uz) || *in_rooms(m,n,0)) ? ROOM : CORR`). `node scripts/csym.mjs inside_shop` → `shk.c:567–576` (10 lines: `rno < ROOMOFFSET || levl[x][y].edge || !IS_SHOP` → `NO_ROOM`).

The diff **does** exactly that: clone deleted, three imports added, `"always ROOM"` replaced by the C ternary. Nothing else touched.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `stock_room` engraving arm | LIVE repaired | `:750–766` branch-for-branch |
| `inside_shop` (shk.js) | LIVE import | edge test present `:731` |
| `Is_special` (dungeon.js) | LIVE re-point | one-word export |
| `in_rooms` (hack.js) | LIVE import | returns `''` / room char — boolean use matches C pointer |
| local `inside_shop` clone | deleted | the D-1849 C-wrong itself |
| `Is_special` clones `end.js:523` / `quest.js:40`, `mineralize` inline `on_level` walk | OMIT named | in this commit |
| rest of `stock_room` (goodpos, tribute, Orcus) | OMIT named | untouched |

`node scripts/sym.mjs` (deleted clone → import):

```
inside_shop      js/shk.js:727   sync
in_rooms         js/hack.js:1187   sync
Is_special       js/dungeon.js:2015   sync
```

No second clone written; the pre-existing `end.js`/`quest.js` clones are named debt, not new drift. No `--can` needed (no cycle claim).

FORCE/DIAG/`getRngLog`/`fastforward`/recorded coords in the diff: **none**. Rule #2: clean (prior scan this iteration; diff adds imports only).

## C ↔ JS fidelity

**`inside_shop`.** C `shk.c:567–576` returns `rno` with the `edge` disqualifier. JS `shk.js:727–735`: `roomno`, `rno < ROOMOFFSET || loc.edge || !IS_SHOP` → `NO_ROOM`, returns `rno`. Call sites use it as a boolean (`if (inside_shop(sx+1, sy)) m--`), and C's `char` return is likewise truth-tested. **Match.**

**`stock_room` arm.** Order in JS `:699–710` mirrors C: x-neighbours first (`m∓`), then y-neighbours (`n∓`), engrave, then the guarded ternary. `Is_special(game.u?.uz)` ≡ `Is_special(&u.uz)`; `in_rooms(m, n, 0)` ≡ `*in_rooms(m, n, 0)` as a truth test (JS returns `''` on miss, a char string on hit — `hack.js:1187–1205`). **Match call-for-call.** No RNG in the arm, so no keystream question.

**Callee closure.** One `stock_room` arm. All callees LIVE (`inside_shop`, `Is_special`, `in_rooms`, `make_engr_at` pre-existing). No STUB in a live arm. The D-1847 "1-cell TRC" is not reverted code — it was a JS-FORCE-era inference, and this commit replaces inference with the C `^F` measurement (0 differing cells post-fix per the D-log). Correct handling of a falsified hypothesis.

## Hallucinations / overclaim

None. "mineralize 2 corpus PASS" is precise: the sessions were *blocked at* `mineralize` and now pass; the D-log explicitly says mineralize "was the symptom owner, never the C-wrong" rather than claiming a mineralize port. Score 222/265 (was 217) is arithmetic, +2 for the two passes plus earlier drift — re-scored at the end of this iteration.

## Density

§2b: one falsifier (geom-probe single differing cell), one C locus family, one JS module + a one-word export. Minimal correct size.

## Verification

This audit: `node scripts/hidden-proxy.mjs verify mineralize --base fc3c7c8b~1` → `2 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS` (`tour-Knight-70020-d5-8-15-17-22` PASS; `tour-Monk-70009-d3-6-10-11-12` PASS). Exactly the D-log claim — not vacuous (baseline had 2 blocked, both accounted). D-log also cites green 2/2 + strict + cohort 7/7 + full 44/44; cadence re-checks at end of iteration.

## Actionable C-wrongs

None. The clone that contradicted C is deleted; the remaining `Is_special` clones are named map debt.

Verdict: **ACCEPT**
