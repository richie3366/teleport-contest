# Review 728 — 3baada67 — ball.c set_bc Punished blind snapshot (D-1769)

## Metadata
- Full / short hash: `3baada67cc67832cba8da6ccb742e2f323ee5591` / `3baada67`
- Parent: `566ab3d4` (D-1768 Unaware talk=FALSE). First of ten `js/` commits since the last `reviews/loop-unattended/` touch (`566ab3d4`). This file audits **this SHA only**.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-03 07:19:20 +0200
- D-id: **D-1769**
- Stats: `js/ball.js` +74/−5; `js/do.js` +4/−3; `js/do_wear.js` +9/−4; `js/read.js` +8/−7. Total `js/` insertions **95** <250. Band **150–350** (id >454 → 200-floor).
- Claims to close: Open `ball.c` Punished `set_bc` after D-1768 / D-1755 named omit. Not Blind `move_bc` / `unplacebc` glyph restore. Not `ballfall`. `reviews/loop-2026-08-15/` has no unpaid `set_bc` Must-fix. Review **716** named this omit.
- JS / map: `ball.js` `set_bc`; callers `do.js` `make_blinded`, `do_wear.js` `Blindf_on`/`Blindf_off`, `read.js` `punish`. `c-js-map/turns.md`.
- Prior: D-1768 named `set_bc`. Review **716** ACCEPT-WITH-DEBT (Sting; `set_bc` named). Archive **Addressed:** D-1769 `3baada67` (hash already filled).

## Intent vs deliverable

Git subject promises: Match C `ball.c` `set_bc` so Punished going-blind and punish-while-Blind snapshot `bc_felt`/`cglyph`/`bglyph` under the ball and chain, instead of omitting the helper after D-1768.

`node scripts/csym.mjs set_bc` → `ball.c:379–424`. `--callers set_bc`: comment `:374`; `do_wear.c` `Blindf_on` `:1476`; `Blindf_off` `:1523`; `potion.c` `make_blinded` `:309`; `read.c` `punish` `:3059`. `Punished` is `youprop.h:77` `uball != 0`.

```379:424:nethack-c/upstream/src/ball.c
void
set_bc(int already_blind)
{
    int ball_on_floor = !carried(uball);

    u.bc_order = bc_order(); /* get the order */
    u.bc_felt = ball_on_floor ? BC_BALL | BC_CHAIN : BC_CHAIN; /* felt */

    if (already_blind || u.uswallow) {
        u.cglyph = u.bglyph = levl[u.ux][u.uy].glyph;
        return;
    }
    /* sighted: remove_object chain (+ ball if floor), newsym peek, place back */
}
```

Parent: no `set_bc`; `make_blinded` / Blindf_* / `punish` had named-omit comments. The diff **does** port `set_bc`, wire all four C call sites (`Punished` as `u.uball`), and add `levl_glyph_at` as the `levl[].glyph` stand-in (`remembered_glyph.glyph`, else `disp_glyph`). It **does not** restore those glyphs in Blind `move_bc` / `unplacebc`. Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `set_bc` | LIVE new | `:379–424`; already-blind/swallow vs sighted peek |
| `bc_order` | CLONE local | already `ball.js`; `BCPOS_*` file consts |
| `carried` | CLONE local | already `ball.js:43` (eat.js export exists — do **not** write #5) |
| `obj_extract_self` | LIVE import | floor arm ≡ C `remove_object` (`mkobj.js`) |
| `place_object` | LIVE import | `mkobj.js` |
| `newsym` | LIVE import | `display.js` |
| `levl_glyph_at` | CLONE stand-in | local; C `levl[x][y].glyph` int; JS memory cell `.glyph` / `disp_glyph` |
| `make_blinded` caller `:309` | LIVE repaired | `u.uball` ≡ `Punished` |
| `Blindf_on` `:1476` | LIVE repaired | after lose-sight talk, before `toggle_blindness` |
| `Blindf_off` `:1523` | LIVE repaired | lose-sight arm only |
| `punish` `:3059` | LIVE repaired | `Blind_read()` then `set_bc(1)` after `placebc` |
| Blind `move_bc` / `unplacebc` restore | OMIT named | snapshots unused until a later SHA |
| `gulp_blnd_check` | STUB pre-existing | `do.js` `return false`; not this helper |
| `ballfall` / `drop_ball` / `unpunish` | OMIT named | |

`node scripts/sym.mjs` (every symbol this SHA adds or re-points):

```
set_bc           js/ball.js:223   sync   (at this SHA; HEAD line moved)
Punished         NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/pray.js:195
             => Do NOT write clone #2.
carried          js/eat.js:1960   sync
             !! ALSO 3 LOCAL CLONE(S) in 3 files — IMPORT the export; do NOT add another
               js/artifact.js:1110  js/ball.js:43  js/timeout.js:618
bc_order         NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/ball.js:184   (at this SHA)
             => Do NOT write clone #2.
newsym           js/display.js:4387   sync
obj_extract_self js/mkobj.js:2461   sync
place_object     js/mkobj.js:1862   sync
levl_glyph_at    NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/ball.js:201   (at this SHA)
             => Do NOT write clone #2.
Blind_read       NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/read.js:540
             => Do NOT write clone #2.
make_blinded     js/do.js:2760   ASYNC — await required
Blindf_on        js/do_wear.js:1031   ASYNC — await required
Blindf_off       js/do_wear.js:1063   ASYNC — await required
punish           js/read.js:1121   ASYNC — await required
BC_BALL          js/const.js:2165   sync   export const
BC_CHAIN         js/const.js:2166   sync   export const
BCPOS_DIFFER     NOT FOUND as export (file-local `const` in ball.js = 0)
BCPOS_CHAIN      NOT FOUND as export (file-local `const` in ball.js = 1)
```

`--can do.js ball.js set_bc` / `--can do_wear.js ball.js set_bc` / `--can read.js ball.js set_bc`: **ALREADY** (static imports of `placebc` already existed; this SHA adds `set_bc` to those import lists). FORCE/DIAG/`getRngLog`/`fastforward`/seed names / hardcoded coords: **none**. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**. No RNG in `set_bc` (`rn2`/`rnd`/`rn1`/`d` none).

## C ↔ JS fidelity

**`set_bc` body (`:382–423`).** `ball_on_floor = !carried(uball)`; `bc_order()`; `bc_felt` = both bits iff floor else `BC_CHAIN`. Then `already_blind || uswallow` copies **hero** `levl.glyph` into both `cglyph` and `bglyph` and returns — no extract. Sighted: `remove_object(uchain)` always; `remove_object(uball)` only if floor; `newsym` chain cell; `cglyph` from that cell. `BCPOS_DIFFER`: put chain back + `newsym`; if floor, `newsym` ball (see under), `bglyph`, `place_object` ball, `newsym` restore. Else: `bglyph = cglyph`; place ball-then-chain or chain-then-ball; one `newsym` on the ball cell. JS walks the same arms with `obj_extract_self` for the floor extract (C `remove_object` is that arm of `obj_extract_self`). `BCPOS_*` local consts are 0/1/2 matching `ball.c`. **Match the helper.** Early `if (!uball || !uchain) return` is extra vs C; every C caller is already behind `Punished` / post-`setworn` ball+chain, so it does not change a live arm.

**`levl.glyph` stand-in.** C stores the integer `levl[][].glyph` after `newsym`. JS `levl_glyph_at` at **this SHA** returns `remembered_glyph.glyph` if that field is a number, else `disp_glyph|0`. That is the display-model stand-in D-1767 made (`gbuf.glyph` ≈ `disp_glyph`). It is not a second C function. Blind restore still omitted, so the snapshot is write-only here. **Match the C assignment shape given this port’s map memory.** Do not treat integer-vs-cell as a Must-fix on **this** SHA — consumers are named-omit.

**`make_blinded` (`potion.c:300–309`).** Lose-sight arm: talk, then `if (Punished) set_bc(0)`, then later `set_itimeout` + XOR `toggle_blindness`. JS `:2786–2795` the same with `u.uball`. **Match the new call.** Unaware talk=FALSE is parent D-1768.

**`Blindf_on` (`:1469–1476`).** `Blind && !already_blind` → verbose cant-see → `Punished` `set_bc(0)` → `toggle_blindness` if `changed`. JS after the pline, `game.u?.uball`. **Match.**

**`Blindf_off` (`:1511–1523`).** Only the lose-sight (`Blind && !was_blind`) arm calls `set_bc(0)`. Still-blind and regain-sight do not. JS `:1066` in that arm only. **Match.** `gulp_blnd_check` remain named (pre-existing `return false` in `do.js`).

**`punish` (`:3056–3059`).** `!uswallow`: `placebc`; `if (Blind) set_bc(1)`; `newsym(ux,uy)`. JS `Blind_read()` then `set_bc(1)` then `newsym`. `Blind_read` is `(H\|\|E) && !B` plus `uroleplay.blind` — C `Blind` is the timeout/eyewear bits; birth-blind is `uroleplay.blind` which also keeps the hero Blind in this port. **Match the call.** Named still: flooreffects via `placebc`; angrygods `HEAVY_IRON_BALL` reuse.

**Callee closure (`set_bc` + four callers).** LIVE: `bc_order` (local clone, same file, C-matched stacking walk), `carried` (local clone already), `obj_extract_self`, `place_object`, `newsym`. OMIT named: Blind `move_bc`/`unplacebc` **consumers** of the snapshot (not callees of `set_bc`). STUB inside `set_bc`: **none**. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject / D-log “Match C `set_bc`” is true for the helper and all four C call sites. “not a public FAIL” is true: no public session is Punished **and** going Blind. Do **not** stamp “Match C Blind `move_bc` glyph restore” — this SHA’s own map comment still names those arms. Do **not** stamp “Match C `ballfall`.” `Punished` vs `u.uball` is not a lie (`youprop.h:77`). Journal “fortress held” is a suite claim, not a Punished-blind screen.

## Density

§2b: one C helper + the four C callers that were the named omit. +95. Did **not** glue Blind `move_bc` / `unplacebc` restore or `ballfall`. Did **not** invent a FAIL peel. Did **not** add `carried` clone #5.

## Verification

D-log: save-oracle skip (untagged `ball.c:set_bc`); node canary (already-blind / carried / swallow / no-uball + sighted DIFFER peek); green+strict seed8000/0900; CURRENT cohort **7**/7 + strict. Rule #2 clean. Punished going-blind **public-unhit**. Admit that. Cadence at this SHA remains the public fortress (parent D-1768).

## Actionable C-wrongs

None for Must-fix (`set_bc` / four callers match C; remaining named). Named: Blind `move_bc` glyph/felt; `unplacebc` Blind `levl.glyph = bglyph/cglyph`; `ballfall`; `drop_ball`; `unpunish`; `gulp_blnd_check`; `carried` clone in `ball.js` (import `eat.js` later, do not add #5). Do **not** write `bc_order` clone #2. Do **not** call `set_bc(0)` on the still-blind Blindf_off arm. Do **not** `remove_object` on the already-blind/swallow return.

Verdict: **ACCEPT-WITH-DEBT**
