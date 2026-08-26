# Review 499 — e7574dc9 — dog.c mon_arrive wander/somexy (D-1538)

## Metadata
- Full / short hash: `e7574dc96385323ee39929ba1aa77f8589ed9926` / `e7574dc9`
- Parent: `4508a3cb` (D-1537). This file audits **this SHA only** (eighth of nine `js/` commits since review **491**). Archive **Addressed:** D-1538 `e7574dc9`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-26 07:34:37 +0200
- D-id: **D-1538**
- Stats: 10 files, +336 / −149 — `js/dog.js` +125 / −2. Band 150–350 (js/ insertions 125).
- Claims to close: Open `dog.c` `mon_arrive` wander/`somexy` (named from D-1537 / D-1505 leftovers). Not a public FAIL. `reviews/loop-2026-08-15/` has no unpaid wander Must-fix.
- JS / map: `js/dog.js` `mon_arrive_after_you` / `arrive_wander_xy`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: none unpaid.

## Intent vs deliverable

Git subject promises: a long-limbo arrival jitters locale via `in_rooms`+`somexy` or a corridor `rn1` box, not a named omit that placed at the raw destination.

Pinned C `dog.c` `mon_arrive` `:491–500` `wander = min(nmv, 8)` else 0; `:506` `MIGR_EXACT_XY` zeros wander; `:576–580` leftovers; `:582–605` after leftovers, before `my=xyflags`. Callees `hack.c` `in_rooms` `:3498`; `mkroom.c` `somex`/`somey` `:666–675`, `inside_room` `:678–687`, `somexy` `:694–740`. Corridor: `max(1,x-wander)` / `min(COLNO-1,x+wander)` then `rn1(j-i,i)` (`[i,j-1]`); y min 0. somexy fail zeros locale → `rloc`. With_you returns first (`:468–480`).

```582:605:nethack-c/upstream/src/dog.c
    if (xlocale && wander) {
        char *r = in_rooms(xlocale, ylocale, 0);
        if (r && *r) {
            coord c;
            if (somexy(&svr.rooms[*r - ROOMOFFSET], &c))
                xlocale = c.x, ylocale = c.y;
            else
                xlocale = ylocale = 0;
        } else {
            int i, j;
            i = max(1, xlocale - wander);
            j = min(COLNO - 1, xlocale + wander);
            xlocale = rn1(j - i, i);
            i = max(0, ylocale - wander);
            j = min(ROWNO - 1, ylocale + wander);
            ylocale = rn1(j - i, i);
        }
    }
```

Old JS: catchup without wander; leftovers then raw `xlocale` / `rloc`.

The diff **does** set wander after catchup, zero it on EXACT_XY, then `arrive_wander_xy` with live `in_rooms` and a local mkroom clone. It **does not** port kops dismiss, `MIGR_EXACT_XY` Before_you, failed_arrivals/`m_into_limbo`, `Wiz_arrive`, full `mnearto` yank, or teleport.js thin `somexy`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| wander / EXACT_XY | C `:491–506`, **LIVE this SHA** | After_you only |
| `arrive_wander_xy` | C `:582–605`, **LIVE this SHA** | extracted helper |
| `in_rooms` | C `hack.c:3498`, **LIVE** | import `hack.js` |
| `somex`/`somey` | C `mkroom.c:666`, **CLONE** | cycle: mklev→trap→dog |
| `inside_room` | C `:678`, **CLONE** | `roomnoidx` vs `croom-svr.rooms` |
| `somexy` | C `:694`, **CLONE** | 3rd local clone; body matches mklev |
| `rn1` | C `hack.h:1535`, **LIVE** | `rn2(x)+y` |
| `Wiz_arrive` / failed_arrivals | C `:481` / `:615`, **OMIT named** | |
| teleport `somexy` | C same, **OMIT named** | irregular/subroom skip |

`node scripts/sym.mjs somexy somex somey inside_room in_rooms arrive_wander_xy mon_arrive_after_you rn1`:

```
somexy           NOT EXPORTED — but 3 LOCAL CLONE(S) in 3 file(s):
               js/dog.js:611  js/mklev.js:19000  js/teleport.js:937
somex            js/mklev.js:18985   sync
             !! ALSO 2 LOCAL CLONE(S) — js/dog.js:587  js/teleport.js:926
somey            js/mklev.js:18986   sync
             !! ALSO 2 LOCAL CLONE(S) — js/dog.js:590  js/teleport.js:929
inside_room      NOT EXPORTED — but 2 LOCAL CLONE(S):
               js/dog.js:595  js/mklev.js:18989
in_rooms         js/hack.js:1132   sync
             !! ALSO 1 LOCAL CLONE in js/mklev.js:1199
arrive_wander_xy js/dog.js:663   sync
mon_arrive_after_you NOT EXPORTED — 1 LOCAL in js/dog.js:700
rn1              js/rng.js:95   sync
```

This SHA adds the dog clones; it does not re-point a local clone to an import (`in_rooms` was already exported). Cycle comment is real (`mklev` imports `trap` which imports `dog`). Do **not** write clone #4.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates in `js/dog.js`. Rule #2 clean.

## C ↔ JS fidelity

Catchup. C `:491–500`: `mlstmv < moves-1` → `nmv = moves-1-mlstmv`, `mon_catchup_elapsed_time`, `wander = min(nmv,8)`; else wander 0. JS the same (`Math.min(nmv,8)|0`). **Match.** RNG inside catchup is pre-existing; this SHA adds none there.

Switch. APPROX_XY keeps wander; EXACT_XY zeros it (`:506`); WITH_HERO overwrites locale; stairs/ladder/sstairs/portal/endgame `rn1` unchanged; default/RANDOM zeros locale. **Match C `:502–574` for After_you.** `Wiz_arrive` still named (this helper is After_you only).

Leftovers then jitter. C `:576–605` leftovers, then `if (xlocale && wander)`. JS the same order. **Match.** `xlocale==0` (RANDOM / somexy fail) skips jitter. **Match.**

Room arm. C `in_rooms(x,y,0)` then `*r`; `somexy(&svr.rooms[*r-ROOMOFFSET], &c)`. JS imports live `in_rooms` (char-coded roomnos, SHARED scan, reverse prepend). Index `charCodeAt(0)-ROOMOFFSET` equals C `*r-ROOMOFFSET`. somexy fail or missing `croom` → `{0,0}` → `rloc`. C missing-room is not a defined hole; JS extra-fail is conservative, not a live-arm stub.

Corridor arm. `i=max(1,x-wander)`, `j=min(COLNO-1,x+wander)`, `rn1(j-i,i)`; y min 0, `ROWNO-1`. JS identical. `rn1` is `rn2(x)+y` → range `[i,j-1]`. Two `rn1` when not in a room. **Match call-for-call.** `xlocale && wander` uses C truthiness (column 0 unused).

`somexy` clone vs C `:694–740`. Irregular: 100 `somex`+`somey` rejecting edge/wrong `roomno`, then exhaustive bbox. `!nsubrooms`: one `somex`+`somey`, always true. Else: 100 tries, skip `IS_WALL`, skip `inside_room` of each subroom; `try_cnt>=100` false. Can return a non-accessible cell. **Match C, and matches mklev’s existing clone.** `roomnoidx` stands in for `croom-svr.rooms` (same pattern as mklev `:18991`). `!croom` early-false is a JS guard; live rooms have `roomnoidx`. teleport.js still skips irregular/subroom (named, other call site).

Callee closure (After_you jitter arm). LIVE: `in_rooms`, `rn1`/`rn2`, `mon_catchup_elapsed_time`, leftovers `deliver_obj_to_mon`. CLONE: `somex`/`somey`/`inside_room`/`somexy` verified against `mkroom.c` here. OMIT named: `Wiz_arrive`, failed_arrivals, kops, Before_you, full `mnearto` yank. STUB: none in the jitter arm. **The arm may ship.**

## Hallucinations / overclaim

Subject After_you jitter via `in_rooms`+`somexy` or corridor `rn1`, not raw destination: **true.** D-log “local mkroom clone”: **true**, and the clone matches C (not a stub). Do **not** stamp “Match C `Wiz_arrive`.” Do **not** stamp “Match C teleport.js `somexy` irregular.” Do **not** stamp “imported `somexy` from mklev.” This is **not** “dispatch ported, callee stubbed.”

## Density

One C block (`:491–605`) + the mkroom callees that block needs. Did not glue `cspfx`. §2b OK. Third `somexy` clone is cycle debt, not a second cluster.

## Branch-by-branch confirm

1. No catchup (`mlstmv >= moves-1`): wander 0, no jitter RNG. **Match.**
2. Catchup + EXACT_XY: wander 0, place at locale. **Match.**
3. Catchup + room `*r`: `somex`/`somey` (possibly 100+) then maybe exhaustive; success replaces locale. **Match.**
4. Room somexy fail: locale 0 → `rloc`. **Match.**
5. Corridor: two `rn1`, x≥1 y≥0. **Match.**
6. RANDOM/`xlocale==0`: skip jitter. **Match.**
7. Leftovers before jitter. **Match.**

## Callers / RNG ledger

C: `losedogs` After_you `:397`. JS `losedogs` → `mon_arrive_after_you`. Public-unhit (no public After_you catchup+locale). New RNG only on `xlocale && wander`: room `somex`/`somey` (`rn1` each) or two corridor `rn1`. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No scored `fs`. No FORCE. Clone is not a mklev import (cycle).

## Verification

D-log canary **31**/31 (grep; wander=0 / xlocale=0 no RNG; corridor widths; edge x≥1 y≥0; irregular one-good-cell / miss 200 `rn2` then 0,0; subroom wall/`inside_room`; missing `croom` zeros; leftovers before jitter; Rule #2); green+strict; cohort **7**/7. **Public-unhit.** Admit it.

## Actionable C-wrongs

None for Must-fix. Named: kops; Before_you EXACT_XY; failed_arrivals; `Wiz_arrive`; teleport thin `somexy`.

Verdict: **ACCEPT-WITH-DEBT**
