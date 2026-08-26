# Review 483 — aac21a74 — objnam.c reorder_fruit fid sort (D-1522)

## Metadata
- Full / short hash: `aac21a745c7b83d3642c3e9bd9af4a592c476137` / `aac21a74`
- Parent: `a34102f4` (audit #1910). This file audits **this SHA only** (first of nine `js/` commits since review **482**). Archive **Addressed:** D-1522 `aac21a74`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-26 03:40:38 +0200
- D-id: **D-1522**
- Stats: 9 files, +122 / −28 — `js/objnam.js` +35. Band 150–350 (js/ insertions 35).
- Claims to close: Open `objnam.c` `reorder_fruit` (named from D-1521 / review **482**). Not `fruit_from_indx`. `reviews/loop-2026-08-15/` has no unpaid fruit-sort Must-fix.
- JS / map: `objnam.js` `reorder_fruit`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **482** named `reorder_fruit` after fake_arti; **481** / **472** named it after the fruitadd walker / `fruit_from_indx`.

## Intent vs deliverable

Git subject promises: the named-fruit chain is rebuilt by fid (forward low-to-high), not left in prepend order.

Pinned C `objnam.c` `reorder_fruit` `:521–554`:

```521:554:nethack-c/upstream/src/objnam.c
void
reorder_fruit(boolean forward)
{
    struct fruit *f, *allfr[1 + 127];
    int i, j, k = SIZE(allfr);

    for (i = 0; i < k; ++i)
        allfr[i] = (struct fruit *) 0;
    for (f = gf.ffruit; f; f = f->nextf) {
        j = f->fid;
        if (j < 1 || j >= k) {
            impossible("reorder_fruit: fruit index (%d) out of range", j);
            return; /* don't sort after all; should never happen... */
        } else if (allfr[j]) {
            impossible("reorder_fruit: duplicate fruit index (%d)", j);
            return;
        }
        allfr[j] = f;
    }
    gf.ffruit = 0;
    for (i = 1; i < k; ++i) {
        j = forward ? (k - i) : i;
        if (allfr[j]) {
            allfr[j]->nextf = gf.ffruit;
            gf.ffruit = allfr[j];
        }
    }
}
```

`SIZE(allfr)` is 128. Valid fid is 1..127. Slot `[0]` stays empty; the rebuild loop starts at `i = 1` so `k - i` is in bounds. Caller `insight.c` `:1957–1974` is `#ifdef DEBUG` wizard `explicitdebug("fruit")` only — not production `^X`. `extern.h:2217` declares it. `fruitadd` still prepends (`options.c`); order is arbitrary until this sorts.

Old JS: named omit after D-1521; `game.ffruit` stayed fruitadd prepend order.

The diff **does** export `reorder_fruit(forward)` that buckets by fid, early-returns on out-of-range or duplicate **before** clearing `ffruit`, then rebuilds by prepend. It **does not** call `impossible()` (named: helper is sync). It **does not** wire the insight DEBUG dump into `enlightenment`. It **does not** port bones `goodfruit`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `reorder_fruit` | C `:521–554`, **LIVE this SHA** | `allfr[1+127]`; forward TRUE → 1,2,3… |
| `impossible` range/dup pline | C `:533–538`, **OMIT named** | sync helper; same as missing `fruit_from_indx` |
| insight DEBUG fruit dump | C `insight.c:1960–1974`, **OMIT named** | `#ifdef DEBUG`; not `^X` |
| `fruit_from_indx` / `fruit_from_name` | C `:431` / `:443`, **LIVE elsewhere** | unchanged this SHA |
| `fruitadd` prepend | C `options.c`, **LIVE** | still prepends; C same |
| bones `goodfruit` | C `bones.c:42`, **OMIT named** | next Open at this SHA |
| pager look `spe` | C `pager.c:336`, **OMIT named** | later D-1524 |

`node scripts/sym.mjs reorder_fruit fruit_from_indx fruit_from_name`:

```
reorder_fruit    js/objnam.js:1241   sync
fruit_from_indx  js/objnam.js:1167   sync
fruit_from_name  js/objnam.js:1182   sync
```

This SHA does **not** delete a symbol or re-point a clone to an import. `reorder_fruit` is a new export, one definition, no clones. `sym` “import it into insight” is the DEBUG dump omit, not a second copy.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **No gameplay RNG** (fid bucket + prepend). **Public-unhit** (no production C caller).

## C ↔ JS fidelity

Bucket. C `:528–541`: zero `allfr[0..127]`, walk `gf.ffruit` via `nextf`, `j = f->fid`. `j < 1 \|\| j >= k` → `impossible` then **return without mutating the list**. Duplicate `allfr[j]` already set → same. Else `allfr[j] = f`. JS `:1241–1254`: `k = 1+127`, fill `null`, `j = f.fid | 0` (same integer as C `int fid` in `objclass.h:164–168`), same two early returns, same store. **Match the control flow.** The `| 0` is not a second RNG or a truncation of a C `long`; JS fruit `fid` is already an integer from `fruitadd`.

Rebuild. C `:542–553`: `gf.ffruit = 0` then `i = 1 .. k-1`, `j = forward ? (k-i) : i`, prepend if occupied. Forward TRUE: first attach is fid 127, last attach is fid 1 → chain **1→2→3…**. Forward FALSE: first attach is fid 1 → chain **127→…→1**. Holes skip (`if (allfr[j])`). JS `:1256–1262`: `game.ffruit = null`, same `j`, same prepend onto `nextf`. **Match.** Empty chain: both loops no-op, `ffruit` stays null. **Match.**

Early-return does **not** rewrite `nextf` of already-scanned nodes and does **not** clear `ffruit`. Prepend-order list is left as fruitadd built it. **Match C `:535` / `:538`.**

Callee closure (this function). LIVE: none besides the list walk. CLONE: none. STUB: none. OMIT named: `impossible` pline. **Arm may ship.** Not “dispatch ported, callee stubbed”: there is no dispatch; the body is the C function minus the named wizard pline.

C caller. `insight.c:1960`: `if (wizard && explicitdebug("fruit")) { reorder_fruit(TRUE); … dump fid/fname/pl_fruit/made_fruit }`. Wrapped in `#ifdef DEBUG`. JS `enlightenment` (`invent.js`) does **not** call `reorder_fruit`. **Match production C** (contest build is not that DEBUGFILES dump). Wiring it into `^X` would be a C-wrong. Leaving the dump named is honest.

`fruitadd` still prepends. C `options.c` `newfruit` inserts at head. This SHA does not change that. **Match C.** Sorting is not a fruitadd post-step in production.

## Hallucinations / overclaim

Subject rebuilt by fid, forward low-to-high, not prepend: **true of the function body** when `forward` is true. **False as a production chain mutation** because nothing in JS (or non-DEBUG C) calls it. D-log prepend 2,1,3 → forward 1,2,3 / reverse 3,2,1; holes; fid 127; fid 0/128/dup unsorted; empty: **true of that canary**, not a public `^X`. Stamping **Addressed:** D-1522 for **`:521–554`** is fair. Do **not** stamp “Match C insight DEBUG fruit dump.” Do **not** stamp “Match C `impossible` pline.” Do **not** stamp “Match C bones `goodfruit`.” Do **not** treat fortress 44/44 as a sorted-fruit screen. This is **not** “dispatch ported, callee stubbed.”

## Density

+35 JS: the whole C function is ~32 lines. Playbook §2b “below ~40 unless C is that small” — C is that small. Did not glue `goodfruit`. Acceptable.

## Branch-by-branch confirm

1. Empty `ffruit`: both loops skip; head stays null. **Match.**
2. Prepend 2,1,3 then `TRUE`: rebuild 1→2→3. **Match `:546–548`.**
3. Same then `FALSE`: rebuild 3→2→1. **Match.**
4. Hole (fid 2 missing): chain skips the empty slot; remaining fids stay sorted. **Match `if (allfr[j])`.**
5. fid 127: `j >= k` is 128; slot 127 is valid; `i=1` attaches it first when forward. **Match.**
6. fid 0 or 128: return before `ffruit = 0`; original prepend order kept. **Match `:533–535`.**
7. Duplicate fid: second node hits `allfr[j]`; return unsorted. **Match `:536–538`.**
8. `impossible` strings. **Named omit.**
9. insight DEBUG dump. **Named omit.**
10. **Public-unhit** (no production caller).

## Callers / RNG ledger

C: only `insight.c` DEBUG. JS: export unused. No `rn2`/`rnd`/`rn1`/`d`. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No fs. No FORCE. Exporting an unused C helper is not a Rule #2 hit.

## Verification

D-log: private canary **14**/14 (C/JS grep; prepend 2,1,3 → forward 1,2,3 / reverse 3,2,1; holes; fid 127; fid 0/128/dup unsorted; empty; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** (no production caller). Cohort is shared-startup. Honest.

## Actionable C-wrongs

None at the claimed sort. Remaining **named** (map / Open at this SHA): `impossible` range/dup pline; insight.c DEBUG fruit dump; bones `goodfruit`; pager look `spe = current_fruit`. Do not Must-fix “call `reorder_fruit` from `enlightenment`” (C is `#ifdef DEBUG`). Do not Must-fix “sort inside `fruitadd`” (C prepends). Do not Must-fix `fid | 0` — C `int fid`.

Verdict: **ACCEPT-WITH-DEBT**
