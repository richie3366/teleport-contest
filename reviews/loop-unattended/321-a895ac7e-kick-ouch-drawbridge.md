# Review 321 — a895ac7e — dokick.c kick_ouch find_drawbridge remap (D-1361)

## Metadata
- Full / short hash: `a895ac7e63a93dc7ce853da7468f5f5cc90484ef` / `a895ac7e`
- Parent: `bdf4c27e` (D-1360). This file audits **this SHA only** (first of two `js/` commits since review **320**). Archive **Addressed:** D-1361 `a895ac7e` already has the short hash (filled by D-1362). Index row for D-1361 was dropped when D-1362 was prepended — process miss, not a JS C-wrong.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 12:27:19 +0200
- D-id: **D-1361**
- Stats: 9 files, +107 / −36 — `js/dokick.js` +17 / −8 (import + portcullis arm). `kick_ouch` also exported.
- Claims to close: Open `dokick.c` kick_ouch drawbridge `find_drawbridge` remap (named from D-1343 / reviews **305** / **320** chain). Not no_kick. `reviews/loop-2026-08-15/` has no unpaid drawbridge-kick Must-fix.
- JS / map: `dokick.js` `kick_ouch` / `kickstr`; callees `dbridge.js` `is_drawbridge_wall` / `find_drawbridge` (D-0959); `wake_nearto` from `mon.js` (D-1007). `c-js-map/turns.md`. Air/Lev `hurtle` still named.
- Prior reviews this SHA claims to close: **305** named `kick_ouch` `:892–897` remap as the omit that left DBWALL deaths as `"kicking a wall"`.

## Intent vs deliverable

Git subject promises: “Match C dokick.c kick_ouch so kicking a drawbridge portcullis remaps maploc via find_drawbridge, instead of naming "kicking a wall" and waking from the wall cell.”

C `kick_ouch` (`dokick.c:881–906`):

```
    if (isok(x, y)) {
        if (Blind)
            feel_location(x, y); /* we know we hit it */
        if (is_drawbridge_wall(x, y) >= 0) {
            pline_The("drawbridge is unaffected.");
            /* update maploc to refer to the drawbridge */
            (void) find_drawbridge(&x, &y);
            gm.maploc = &levl[x][y];
        }
        wake_nearto(x, y, 5 * 5);
    }
    if (!rn2(3))
        set_wounded_legs(RIGHT_SIDE, 5 + rnd(5));
    dmg = rnd(ACURR(A_CON) > 15 ? 3 : 5);
    losehp(Maybe_Half_Phys(dmg), kickstr(buf, kickobjnam), KILLED_BY);
    if (Is_airlevel(&u.uz) || Levitation)
        hurtle(-u.dx, -u.dy, rn1(2, 4), TRUE);
```

C `is_drawbridge_wall` (`dbridge.c:137–161`): `!isok` or typ not DOOR/DBWALL → −1; else adjacent IS_DRAWBRIDGE with matching `DB_DIR`. C `find_drawbridge` (`:180–204`): already-span → TRUE; else wall dir mutates `*x,*y` onto the span.

Old JS: comment stub; `kickstr` already mapped `IS_DRAWBRIDGE` → `"a drawbridge"` (D-1343) but `maploc` stayed the portcullis, so `IS_STWALL`/`IS_DOOR` won and `wake_nearto` used the wall cell.

The diff **does** call live `is_drawbridge_wall` / `find_drawbridge`, paint `The drawbridge is unaffected.` (`pline_The` ≡ `"The "` + rest, `pline.c:414–420`), mutate local x,y, write `game.maploc`, then `wake_nearto(x,y,25)`. It does **not** call `hurtle`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `kick_ouch` portcullis arm | C `:892–897`, **wired** | after Blind feel, before `wake_nearto` |
| `is_drawbridge_wall` | C `dbridge.c:137–161`, **imported live** | D-0959; not a dokick clone |
| `find_drawbridge` | C `:180–204`, **imported live** | mutates `{x,y}`; return ignored as C `(void)` |
| `wake_nearto` | C `mon.c`, **imported live** | `mon.js`; remapped coords; `dist2 < 25` |
| `kickstr` | C `:794–830`, **pre-existing live** | D-1343; now sees span `IS_DRAWBRIDGE` |
| `pline('The drawbridge…')` | C `pline_The`, **wired string** | not a `pline_The` helper |
| air/Lev `hurtle` | C `:904–905`, **named omit** | `rn1(2,4)` never burned |
| `kick_ouch` export | JS-only | no control-flow change |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** none in the remap (geometry). Existing `rn2(3)` / `rnd(CON)` / `rnd(5)` unchanged. Hurtle RNG still omitted.

## C ↔ JS fidelity

Order inside `isok` matches `:889–898`: Blind feel, then portcullis test, then wake. JS `is_drawbridge_wall(x,y) >= 0` is C’s signed dir (`DB_NORTH` etc. are ≥0; miss is −1). `find_drawbridge` is the D-0959 body: first `IS_DRAWBRIDGE` (portcullis is DOOR/DBWALL, so this falls through), then `is_drawbridge_wall` again, then N `y++` / S `y--` / E `x--` / W `x++`. Match `:189–200`. After that JS writes `game.maploc = game.level.at(x,y)` ≡ C `&levl[x][y]` even if find returned false (C still assigns). `wake_nearto` uses the mutated coords so a sleeper at Chebyshev 4 from the **wall** but 5 from the **span** stays asleep — that is the D-log’s private canary, and it is what C does.

`kickstr` is not edited in this SHA. After remap, `IS_DRAWBRIDGE(typ)` hits `"a drawbridge"` before `IS_STWALL` `"a wall"`. Killer string is `"kicking a drawbridge"` (`KILLED_BY`, no extra article). Match `:319` JS / `:794–830` C once maploc is the span.

Hallucination check: “Match C `kick_ouch`” while **`hurtle` is omitted** is an overclaim on **air/Lev recoil**. The **`:892–897` remap** is live (`dbridge.js`, not a stub that still names a wall). Do **not** stamp “Match C `hurtle`.” Do **not** stamp “Match C `dokick` no_kick.” Do **not** stamp “Match C trap.js `wake_nearto`” (this SHA uses `mon.js`).

## Hallucinations / overclaim

Subject says a portcullis kick remaps maploc so the name and wake come from the span. **True on the keep-path** when `is_drawbridge_wall >= 0`. **False until named for hurtle.** Ordinary STONE/DOOR kicks unchanged (the new `if` is false). Stamping **Addressed:** D-1361 for the remap is fair. Do **not** treat fortress PASS — including seed0060 kick — as `"The drawbridge is unaffected."` unless that session struck a portcullis.

## Density

One C `if` plus two already-live callees. ~17 lines of JS. Playbook §2b “one deferred `if` alone” is **thin**, but this was the queued Open row after D-1343, not an invented polish peel. Did not glue no_kick (different function, already next Open at this SHA). Acceptable as a fortress map pop; do not stack another caller-only peel on the same `kick_ouch` envelope next iter — hurtle is the remaining arm **inside this function**.

## Branch-by-branch confirm

1. `!isok`: skip feel/remap/wake; still `rn2(3)` / `losehp` / `kickstr` nowhere `"nothing"`. Match `:889` (the `if (isok)` does not run).
2. isok, typ STONE / ordinary DOOR: no remap; wake at the kicked cell; `kickstr` `"a wall"` / `"a door"`. Match.
3. DBWALL portcullis, west span: `is_drawbridge_wall` → `DB_WEST`; find `x++`; maploc span; pline; wake at span. Match `:149–150` / `:198–199`.
4. Down-bridge DOOR portcullis: same wall helper (typ DOOR allowed). Match `:145–146`.
5. Blind: `feel_location` before remap. Match `:890–891`.
6. Fatal kick: `losehp(..., kickstr, KILLED_BY)` after remap. Match `:903`.
7. `Is_airlevel` / Levitation: C `hurtle(-dx,-dy,rn1(2,4),TRUE)`. JS comment. Named.
8. **Public-unhit** unless a session kicks a portcullis.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Remap uses live terrain, not recorded coordinates. Plain ESM. Export of `kick_ouch` is not a trace gate.

## Verification

Journal: private canary **22**/22 (order; four find dirs; kickstr wall vs span; STONE wakes dist2=16; DBWALL/DOOR remap leaves far sleeper asleep; fatal `"kicking a drawbridge"`; live dokick DBWALL vs STONE; Rule #2); green+strict seed8000/0900; focused seed0060; cohort **8**/8 + strict 1500/1800/0012/0004/0007/2200/0383 + seed0060. **Public-unhit** on portcullis. This audit cadence: full `sessions` at HEAD `a979a9ac` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `37+0.30/turn` (R² 0.85). I did not re-run the private canary. Fortress PASS is not a drawbridge kick.

## Actionable C-wrongs

None for Must-fix. The remap matches C `:892–897` call-for-call (live dbridge helpers, then wake, then existing `kickstr`). Hurtle is a named omit of the **next** lines (`:904–905`), already an Open row (`dokick.c` kick_ouch/kick_dumb airlevel/Levitation `hurtle`).

Named omits (map / already-Open, not Must-fix):

1. airlevel / Levitation `hurtle(-u.dx,-u.dy,rn1(2,4),TRUE)` (`dokick.c:904–905`)
2. `dokick` no_kick poly/steed/lizard/uinwater/boulder (shipped next SHA as D-1362)
3. shop-town watchman

Do not Must-fix “wake from the wall cell after remap” (C wakes from the span). Do not Must-fix “`kickstr` should keep saying `a wall` on DBWALL” (C remaps first). Do not Must-fix “call `pline_The` by name” (string matches).

## Callers / RNG ledger

C: geometry only in the new `if`; then existing `rn2(3)` / `rnd` / `losehp`; hurtle `rn1` named. JS: same minus hurtle. Public fortress is not a portcullis.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: `kick_ouch` now remaps portcullis `maploc` through live `find_drawbridge` before wake/`kickstr`; air/Lev `hurtle` stays named.
- Must-fix stays empty for this SHA.
