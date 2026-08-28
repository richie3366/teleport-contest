# Review 538 — 38c61b34 — worm.c redraw_worm tamedog / abuse_dog (D-1577)

## Metadata
- Full / short hash: `38c61b347c3147b0acd5b2c43cc0c56774836a52` / `38c61b34`
- Parent: `f709ad71` (C3 oracle docs; not `js/`). This file audits **this SHA only** (second of nine `js/` commits since review **536**). Archive **Addressed:** D-1577 `38c61b34`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-28 15:32:36 +0200
- D-id: **D-1577**
- Stats: `js/worm.js` +25 / −4, `js/dog.js` +11 / −4. Band 150–350 (js/ insertions **27**).
- Claims to close: Open `redraw_worm` after D-1570/D-1573. Not cutworm. Not FULL_MOON S_DOG. `reviews/loop-2026-08-15/` has no unpaid redraw Must-fix.
- JS / map: `worm.js` `redraw_worm`; `dog.js` `tamedog`/`abuse_dog`; `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **531** named `redraw_worm` omit; **507** named it among tamedog leftovers.

## Intent vs deliverable

Git subject promises: taming or abusing a long worm to wild re-`newsym`s every segment including the dummy head, not only `see_wsegs` body cells.

Pinned C `worm.c` `redraw_worm` `:989–998` (`wtails[worm->wormno]` walk; `newsym` every `curr` including dummy). Contrast `see_wsegs` `:486–495` (`while (curr != wheads[worm->wormno])` — stops before dummy). Callers `dog.c` `tamedog` `:1274–1276` (head `newsym` then `if (mtmp->wormno) redraw_worm`). `abuse_dog` `:1380–1391` (`mx != 0`; yelp/growl; `!mtame` then head `newsym` + `wormno` redraw).

```989:998:nethack-c/upstream/src/worm.c
void
redraw_worm(struct monst *worm)
{
    struct wseg *curr = wtails[worm->wormno];

    while (curr) {
        newsym(curr->wx, curr->wy);
        curr = curr->nseg;
    }
}
```

```486:494:nethack-c/upstream/src/worm.c
    struct wseg *curr = wtails[worm->wormno];

    while (curr != wheads[worm->wormno]) {
        newsym(curr->wx, curr->wy);
        curr = curr->nseg;
    }
```

```1274:1276:nethack-c/upstream/src/dog.c
    newsym(mtmp->mx, mtmp->my);
    if (mtmp->wormno)
        redraw_worm(mtmp);
```

Old JS: `see_wsegs` live (D-1529); tamedog/abuse_dog comments named the walker. Dummy never refreshed on tame/wild.

The diff **does** add the walker and wire both C callers. It **does not** port `flip_worm_segs_*`, save/rest wsegs, mondead/dog `wormgone`, muse/mhitu `worm_move`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `redraw_worm` | C `:989–998`, **LIVE this SHA** | export; one home |
| `tamedog` `wormno` arm | C `:1275–1276`, **LIVE this SHA** | after head `newsym` |
| `abuse_dog` untame arm | C `:1386–1390`, **LIVE this SHA** | inside `mx != 0` |
| `newsym` | **LIVE** | already imported in both files |
| `see_wsegs` | **LIVE** D-1529 | still stops before `wheads` |
| `wtails` / `wheads` | **LIVE** module arrays | `worm.js:26–28` |
| `flip_worm_segs_*` / save/rest / `wormgone` callers | **OMIT named** | |

`node scripts/csym.mjs redraw_worm` → `:989-998`. `--callers`: `dog.c:1276`; `dog.c:1389` only. `see_wsegs` → `:486-495`; `--callers`: display `:1512`; monmove `:1686`; worn `:483`. `tamedog` → `:1142-1282`. `abuse_dog` body `:1363–1393`.

RNG: **none** in `redraw_worm`. `abuse_dog` `rn2(mtame)` yelp path unchanged. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
redraw_worm      js/worm.js:441   sync
see_wsegs        js/worm.js:423   sync
newsym           js/display.js:2822   sync
tamedog          js/dog.js:355   ASYNC
abuse_dog        js/dog.js:986   ASYNC
```

`--can dog.js worm.js redraw_worm`: ALREADY statically imported (this SHA added the named import). `--can worm.js display.js newsym`: ALREADY. No new TDZ edge. Do **not** add `redraw_worm` clone #2 in `dog.js`.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

Walker. `curr = wtails[worm.wormno]`; `while (curr) { newsym; curr = nseg; }`. No inner `wormno` re-check (C does not). Callers gate. Dummy at `wheads` is on the chain so it **is** `newsym`'d — that is the difference from `see_wsegs`, which JS still stops with `curr !== head`. **Match `:989–998` vs `:486–495`.** Head cell is also `newsym`'d by the caller first; dummy shares `(mx,my)` so the dummy pass is a second `newsym` of the head cell. **Match C.**

`tamedog`. After friendly `pline_mon`, `newsym(mx,my)` then `if (wormno) redraw_worm`. **Match `:1274–1276`.** AT_WEAP `mon_wield_item` after. **Match.** FULL_MOON / ustuck still named (not this SHA).

`abuse_dog`. `mx != 0` then yelp/growl; `!mtame` then head `newsym` + `if (wormno) redraw_worm`. **Match `:1380–1390`.** Leaving-level `mx==0` skips sound **and** redraw. **Match C comment.** `m_unleash` when unleashed-and-untame is pre-existing.

Callee closure (both caller arms). LIVE: `newsym`, `redraw_worm`. OMIT named: none **inside** the redraw arm. STUB: **none**. Combined-arm may ship. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject dummy-inclusive `newsym` vs `see_wsegs` body-only: **true.** Both C callers wired: **true.** D-log “not a public FAIL”: map-driven; do not invent a FAIL peel. Do **not** stamp “Match C `see_wsegs` now includes dummy” — it still stops before `wheads`. Do **not** stamp “Match C `flip_worm_segs`.” Do **not** stamp “Match C mondead `wormgone`.” Do **not** stamp “Match C FULL_MOON S_DOG.”

## Density

One C 10-line walker + its two production callers. +27 JS. Playbook §2b “unless C is that small” applies. Did not glue force_invmenu / FULL_MOON. OK.

## Branch-by-branch confirm

1. Grown worm tame: head `newsym` then every wseg including dummy. **Match.**
2. Dummy-only worm (`wtails === wheads`): walker still `newsym`s that one cell. **Match.** `see_wsegs` would skip it.
3. `!wormno`: callers skip; walker not entered. **Match.**
4. Abuse still tame: growl/yelp; no redraw. **Match.**
5. Abuse to wild, `mx != 0`: head + full chain. **Match.**
6. Abuse `mx == 0`: no `newsym` / no redraw. **Match.**
7. `see_wsegs` after this SHA: still `curr !== wheads`. **Match** (must not “fix” it to include dummy).

## Callers / RNG ledger

C `redraw_worm`: **only** `tamedog` and `abuse_dog`. JS same two. No other site silently omitted. **No RNG** in the walker. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. Export from `worm.js` (C home); `dog.js` imports — do not clone into dog. `newsym` is the display export.

## Verification

D-log private canary **20**/20 (C/JS locus; dummy-only vs grown; `see_wsegs` skips dummy; tamedog/abuse_dog refresh body; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** unless a session tames or wilds a long worm. Do not treat tourist green as worm-tame proof.

## Actionable C-wrongs

None for Must-fix. Named: `flip_worm_segs_vertical` / `flip_worm_segs_horizontal`; save/rest wsegs; mondead/dog `wormgone`; muse/mhitu `worm_move`; restore/replmon `place_wsegs`; FULL_MOON S_DOG `rn2(6)`; ustuck expels. Do not make `see_wsegs` include the dummy. Do not add `redraw_worm` #2 in `dog.js`.

Verdict: **ACCEPT-WITH-DEBT**
