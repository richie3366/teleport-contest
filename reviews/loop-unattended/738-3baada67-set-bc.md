# Review 738 — 3baada67 — ball.c set_bc Punished blind snapshot (D-1769)

## Metadata
- Full / short hash: `3baada67cc67832cba8da6ccb742e2f323ee5591` / `3baada67`
- Parent: `566ab3d4` (D-1768 Unaware talk=FALSE). **Re-audit** of the same SHA previously filed as review **728** (ACCEPT-WITH-DEBT). This file is an independent pinned-C walk, not a restatement of 728.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-03 07:19:20 +0200
- D-id: **D-1769**
- Stats: `js/ball.js` +74/−5; `js/do.js` +4/−3; `js/do_wear.js` +9/−4; `js/read.js` +8/−7. Total `js/` insertions **95** ≤250. Band **150–350**.
- Claims to close: Open `ball.c` Punished `set_bc` after D-1768. Not Blind `move_bc` / `unplacebc` glyph restore (those land in `cd3e1091` / D-1777). Not `ballfall` (`c4a32e7c` / D-1778). `reviews/loop-2026-08-15/` has no unpaid `set_bc` Must-fix. Review **716** named this omit.
- JS / map: `ball.js` `set_bc`; callers `do.js` `make_blinded`, `do_wear.js` `Blindf_on`/`Blindf_off`, `read.js` `punish`. `c-js-map/turns.md`.
- Archive **Addressed:** D-1769 `3baada67` (hash already filled). Later SHA `cd3e1091` replaced this SHA’s integer `u.bglyph`/`u.cglyph` with cell snapshots; that is **not** this commit.

## Intent vs deliverable

Git subject promises: Match C `ball.c` `set_bc` so Punished going-blind and punish-while-Blind snapshot `bc_felt`/`cglyph`/`bglyph` under the ball and chain, instead of omitting the helper after D-1768.

`node scripts/csym.mjs set_bc` → `ball.c:379–424`. `--callers set_bc`: comment `:374`; `do_wear.c` `Blindf_on` `:1476`; `Blindf_off` `:1523`; `potion.c` `make_blinded` `:309`; `read.c` `punish` `:3059`. `Punished` is `youprop.h:77` `uball != 0`. `Blind` is `youprop.h:103` `((HBlinded || EBlinded) && !BBlinded)` — **not** `uroleplay.blind`. `BCPOS_DIFFER/CHAIN/BALL` are `ball.c:107–109` = 0/1/2. `BC_BALL`/`BC_CHAIN` are `you.h:411`. `carried` is `obj.h:332` `(o)->where == OBJ_INVENT`.

```379:412:nethack-c/upstream/src/ball.c
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
    remove_object(uchain);
    if (ball_on_floor)
        remove_object(uball);
    newsym(uchain->ox, uchain->oy);
    u.cglyph = levl[uchain->ox][uchain->oy].glyph;
    if (u.bc_order == BCPOS_DIFFER) { /* different locations */
        /* place chain; if floor, peek+place ball */
```

Parent: no `set_bc`; the four C sites were named-omit comments. The diff **does** port the helper, wire all four sites (`Punished` as `u.uball`), and add `levl_glyph_at` as the `levl[].glyph` stand-in. It **does not** restore those glyphs in Blind `move_bc` / `unplacebc`. Named. Snapshots are write-only at this SHA.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `set_bc` | LIVE new | `:379–424`; already-blind/swallow vs sighted peek |
| `bc_order` | CLONE local | already `ball.js`; `carried(uball)\|\|uswallow` → DIFFER |
| `carried` | CLONE local | `ball.js:37` `invent.includes`; C is `where==OBJ_INVENT` |
| `obj_extract_self` | LIVE import | floor arm ≡ C `remove_object` (`mkobj.c:2564–2565`) |
| `place_object` | LIVE import | `mkobj.js` |
| `newsym` | LIVE import | `display.js` |
| `levl_glyph_at` | CLONE stand-in | local; integer `.glyph` / `disp_glyph` at **this** SHA |
| `make_blinded` `:309` | LIVE repaired | lose-sight arm; `u.uball` ≡ `Punished` |
| `Blindf_on` `:1476` | LIVE repaired | after lose-sight talk, before `toggle_blindness` |
| `Blindf_off` `:1523` | LIVE repaired | lose-sight arm only |
| `punish` `:3059` | LIVE repaired | `Blind_read()` then `set_bc(1)` after `placebc` |
| Blind `move_bc` / `unplacebc` restore | OMIT named | consumers unused until D-1777 |
| `gulp_blnd_check` | STUB pre-existing | `do.js` `return false`; not a `set_bc` callee |
| `ballfall` / `drop_ball` / `unpunish` | OMIT named | |

`node scripts/sym.mjs` (every symbol this SHA adds or re-points):

```
set_bc           js/ball.js:294   sync
Punished         NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/pray.js:195
             => Do NOT write clone #2.
carried          js/eat.js:1960   sync
             !! ALSO 3 LOCAL CLONE(S) in 3 files — IMPORT the export; do NOT add another
               js/artifact.js:1110  js/ball.js:43  js/timeout.js:618
bc_order         NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/ball.js:242
             => Do NOT write clone #2.
newsym           js/display.js:4406   sync
obj_extract_self js/mkobj.js:2461   sync
place_object     js/mkobj.js:1862   sync
levl_glyph_at    NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/ball.js:265
             => Do NOT write clone #2.
Blind_read       NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/read.js:545
             => Do NOT write clone #2.
make_blinded     js/do.js:2760   ASYNC — await required
Blindf_on        js/do_wear.js:1031   ASYNC — await required
Blindf_off       js/do_wear.js:1063   ASYNC — await required
punish           js/read.js:1140   ASYNC — await required
BC_BALL          js/const.js:2165   sync
BC_CHAIN         js/const.js:2166   sync
BCPOS_DIFFER     file-local const in ball.js = 0 (sym.mjs does not index file consts)
BCPOS_CHAIN      file-local const in ball.js = 1
```

`--can do.js ball.js set_bc` / `--can do_wear.js ball.js set_bc` / `--can read.js ball.js set_bc`: **ALREADY** (static `placebc` imports already existed; this SHA adds `set_bc` to those lists). FORCE/DIAG/`getRngLog`/`fastforward`/seed names / hardcoded coords: **none**. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**. No RNG in `set_bc` (`rn2`/`rnd`/`rn1`/`d` none). `set_bc` is sync; `newsym` is sync — no missing await inside the helper.

## C ↔ JS fidelity

**`bc_order` (`:353–371`) — callee of `set_bc`, already in-file.** C returns `BCPOS_DIFFER` when chain/ball coords differ **or** `carried(uball)` **or** `u.uswallow`. Else walks `level.objects[ball]` and returns CHAIN or BALL on first match; `impossible` then DIFFER if neither. JS at this SHA walks the same four gates (`objects_at` / `nexthere`) and skips `impossible`. Carried ball therefore **always** takes the DIFFER arm of `set_bc`, so the sighted same-cell `place_object(uball)` path cannot run on a carried ball. **Match the live arms.** Do not add `bc_order` clone #2.

**`set_bc` body (`:382–423`).** `ball_on_floor = !carried(uball)`; `bc_order()`; `bc_felt` = both bits iff floor else `BC_CHAIN`. Then `already_blind || uswallow` copies **hero** `levl.glyph` into both `cglyph` and `bglyph` and returns — no extract. Sighted: `remove_object(uchain)` always; `remove_object(uball)` only if floor; `newsym` chain cell; `cglyph` from that cell. `BCPOS_DIFFER`: put chain back + `newsym`; if floor, `newsym` ball (see under), `bglyph`, `place_object` ball, `newsym` restore. Else: `bglyph = cglyph`; place ball-then-chain or chain-then-ball; one `newsym` on the ball cell. JS walks the same arms.

**`remove_object` vs `obj_extract_self`.** C `remove_object` (`mkobj.c:2508–2521`) panics unless `where == OBJ_FLOOR`. C `obj_extract_self` (`:2557–2592`) switch: `OBJ_FLOOR` **is** `remove_object(obj)`. JS calls `obj_extract_self` for the floor extract. On a live Punished chain (always floor) and a floor ball, the floor case is the C call. Extra-lenient if `where` were wrong (JS would freeinv instead of panic) — not a live-arm C-wrong. **Match given OBJ_FLOOR.**

**Carried + DIFFER.** Because `bc_order` forces DIFFER when carried, sighted `set_bc` with a carried ball: extract chain only, snapshot `cglyph` under the chain, place chain, **do not assign `bglyph`**. C the same. Leftover `bglyph` is C’s leftover too.

**Early `if (!uball || !uchain) return`.** Extra vs C. Every C caller is already behind `Punished` / post-`setworn` ball+chain. Does not change a live arm. Not Must-fix.

**`levl.glyph` stand-in.** C stores the integer `levl[][].glyph` after `newsym`. JS `levl_glyph_at` at **this SHA** returns `remembered_glyph.glyph` if that field is a number, else `disp_glyph|0`. Display-model stand-in from D-1767 (`gbuf.glyph` ≈ `disp_glyph`). Not a second C function. Blind restore still omitted, so the snapshot is write-only here. D-1777 later stores **cells** in `u.bglyph`/`u.cglyph`; do not judge this SHA by that later type change. **Match the C assignment shape given this port’s map memory.** Integer-vs-cell is not a Must-fix on **this** SHA — consumers are named-omit.

**`make_blinded` (`potion.c:300–309`).** Lose-sight arm only: talk, then `if (Punished) set_bc(0)`, then later `set_itimeout` + XOR `toggle_blindness`. JS `:2783–2792` the same with `u.uball`. Regain-sight and timeout-without-toggle do **not** call `set_bc`. **Match the new call.** Unaware talk=FALSE is parent D-1768. `set_bc` is sync; no await required at the site.

**`Blindf_on` (`:1469–1476`).** `Blind && !already_blind` → verbose cant-see → `Punished` `set_bc(0)` → `toggle_blindness` if `changed`. JS after the pline, `game.u?.uball`. Regain-sight Eyes arm does not call `set_bc`. **Match.** Local `Blind()` also returns true on sticky `u.Blind\|\|u.ublind` (pre-existing helper, not this SHA). If that sticky bit were true while C `Blind` is false, this arm could fire extra `set_bc(0)`. No desync proof in this commit; do not Must-fix a pre-existing Blind helper on a `set_bc` wiring SHA.

**`Blindf_off` (`:1511–1523`).** Only the lose-sight (`Blind && !was_blind`) arm calls `set_bc(0)`. Still-blind and regain-sight do not. JS `:1073–1082` in that arm only. **Match.** `gulp_blnd_check` remains named (pre-existing `return false` in `do.js`); C regain-sight is `if (!gulp_blnd_check())`, so the stub matches C’s taken arm. C also clears `takeoff.mask` and `impossible` on missing eyewear; JS silent-returns — pre-existing, not this helper.

**`punish` (`:3056–3059`).** `!uswallow`: `placebc`; `if (Blind) set_bc(1)`; `newsym(ux,uy)`. JS `Blind_read()` then `set_bc(1)` then `newsym`. `Blind_read` is `uroleplay.blind` **or** `(H\|\|E) && !B`. C `Blind` is the timeout/eyewear bits only. Birth-blind in this port also keeps HBlinded / PermaBlind (`hack.js` comment: `uroleplay.blind` is PermaBlind). If a hero were `uroleplay.blind` with H/E/B all clear, JS would `set_bc(1)` and C would not. That is a `Blind_read` clone vs `youprop.h` Blind, not a missed `set_bc` call. **Match the C call under ordinary Blind.** Named still: flooreffects via `placebc`; angrygods `HEAVY_IRON_BALL` reuse.

**Callee closure (`set_bc` + four callers).** LIVE: `bc_order` (local clone, same file, C-matched stacking walk including carried/swallow → DIFFER), `carried` (local clone already), `obj_extract_self`, `place_object`, `newsym`. OMIT named: Blind `move_bc`/`unplacebc` **consumers** of the snapshot (not callees of `set_bc`). STUB inside `set_bc`: **none**. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject / D-log “Match C `set_bc`” is true for the helper and all four C call sites. “not a public FAIL” is true: no public session is Punished **and** going Blind. Review **728**’s ACCEPT-WITH-DEBT holds under this re-walk: the extra `!uball\|\|!uchain` return, integer glyph stand-in, `Blind_read` vs `Blind`, and `invent.includes` `carried` are named debt / pre-existing clones, not live-arm contradictions in the helper. Do **not** stamp “Match C Blind `move_bc` glyph restore” — this SHA’s own map comment still names those arms. Do **not** stamp “Match C `ballfall`.” `Punished` vs `u.uball` is not a lie (`youprop.h:77`). Journal “fortress held” is a suite claim, not a Punished-blind screen. D-log “node canary 6/6” is a private probe, not a public session; admit public-unhit.

## Density

§2b: one C helper + the four C callers that were the named omit. +95. Did **not** glue Blind `move_bc` / `unplacebc` restore or `ballfall`. Did **not** invent a FAIL peel. Did **not** add `carried` clone #5. Consecutive Open rows of the same `ball.c` family were correctly split: snapshot this SHA, restore later.

## Verification

D-log: save-oracle skip (untagged `ball.c:set_bc`); node canary (already-blind / carried / swallow / no-uball + sighted DIFFER peek); green+strict seed8000/0900; CURRENT cohort **7**/7 + strict. Rule #2 clean. Punished going-blind **public-unhit**. Admit that. Cadence at this SHA remains the public fortress (parent D-1768). This re-audit does not re-run those canaries; it re-reads pinned C against the `js/` hunks.

## Actionable C-wrongs

None for Must-fix (`set_bc` / four callers match C; remaining named). Named: Blind `move_bc` glyph/felt; `unplacebc` Blind `levl.glyph = bglyph/cglyph`; `ballfall`; `drop_ball`; `unpunish`; `gulp_blnd_check`; `carried` clone in `ball.js` (import `eat.js` later, do not add #5). Do **not** write `bc_order` clone #2. Do **not** call `set_bc(0)` on the still-blind Blindf_off arm. Do **not** `remove_object` on the already-blind/swallow return. Do **not** `place_object` a carried ball in the DIFFER arm. Do **not** treat later D-1777 cell-typed `bglyph` as a defect of this SHA.

Verdict: **ACCEPT-WITH-DEBT**
