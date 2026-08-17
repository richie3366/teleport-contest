# Review 144 — d2512b22 — teleport.c `rloc_to_core` ustuck-together (D-1183)

## Metadata
- Full / short hash: `d2512b22eb2bcc7df31bc117ba0f56642de6bc85` / `d2512b22`
- Parent: `01c8c41f` (D-1182). This file audits **this SHA only**. Archive row **Addressed:** D-1183 `d2512b22` was filled by D-1184.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 22:21:43 +0200
- D-id: **D-1183**
- Stats: 10 files, +123 / −57 — `js/teleport.js` +48 / −21 (`rloc_post_move_msg` first arm + else-if).
- Claims to close: Open queue `teleport.c` `rloc_to_core` ustuck-together pline (named). Not telemsg. Review **141** named `:1710–1711` as the sibling of the reappear pline (D-1180). `reviews/loop-2026-08-15/` has no open ustuck-together Must-fix.
- JS / map: `teleport.js` `rloc_post_move_msg`. `c-js-map/turns.md` `teleport.c`. wand `makeknown(WAN_TELEPORTATION)`; `set_msg_xy` still named.
- Prior reviews this SHA claims to close: **141** named omit; D-1182 next-port was mx==0 (shipped).

## Intent vs deliverable

Git subject promises: “Match C teleport.c rloc_to_core ustuck-together so a swallowed or still-stuck grabber whose hero cell left ux0 prints You and %s teleport together, instead of falling through to vanish or appear.”

Old JS after dest ran telemsg reappear **or** appear/arrives. C `:1710–1726` is `if (ustuck && !u_at(ux0,uy0)) You("and %s teleport together.")` else-if telemsg reappear else appear. Swallow `u_on_newpos` already ran (`:1690–1694`); grab-far `unstuck` already cleared `u.ustuck` (`:1695–1697`).

The diff **does** insert that first arm and fold the appear pline into `else` (C `else if` / `else`, not an early `return` after reappear that skipped wand `makeknown` — `makeknown` still named after all three arms). It does **not** call `set_msg_xy` or `makeknown(WAN_TELEPORTATION)`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| ustuck-together arm | C first post-msg, **new** | `teleport.c:1710–1711` |
| `You()` | C, **via `pline`** | C prefixes `"You "`; JS `"You and ${mon_nam} teleport together."` |
| `mon_nam` | C callee, **imported** | `do_name.js`; “the foo” not `Monnam` “The foo” |
| telemsg reappear | C else-if, **untouched logic** | D-1180; now `else if` not `if` + `return` |
| appear/arrives | C else, **moved** | same Blind clone as before |
| `u_at` | C macro, **local** | `teleport.js:94–96`; `ux === x && uy === y` |
| `u.ux0` / `u.uy0` | C hero origin | `jsmain` zeros; `cmd.js` `domove` snapshots |
| `set_msg_xy` | C `:1708`, **named omit** | a11y msg loc |
| wand `makeknown` | C `:1730–1731`, **named omit** | after any delivered msg |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` writes / seed names / recorded coordinates. Suffix still from live `distu`. Rule #2 clean.

**New RNG on this path:** none. Name helpers and `couldsee` / `sensemon` are not dice. Path **public-unhit** unless a swallowed/ustuck monster relocates with `RLOC_MSG`.

Grep of this SHA’s `js/` hunks: no banned gates.

## Constitution / playbook

Grep of the JS hunks: no trace-index gates. Do not print together **and** reappear (C `else if`). Do not use `Monnam` on the together line. Do not skip grab-far unstuck (together must not fire after `u.ustuck` cleared). Do not pull wand discovery into a line that said “Not telemsg.”

## C ↔ JS fidelity

### Gate vs `:1703–1709`

C: `domsg && (canspotmon \|\| appearmsg \|\| mtmp == u.ustuck)`; then `set_msg_xy`; clear `STRAT_APPEARMSG`; compute `du` / `next` / `nearu`. JS: `domsg` early return; then `canspotmon \|\| appearmsg \|\| mtmp === u.ustuck`; clear strategy; `distu_xy` / `next` / `nearu`. **Skips** `set_msg_xy` (named). `ustuck` is in the outer gate so a grabber the hero cannot spot still reaches the together arm — C same (`mtmp == u.ustuck` in the `\|\|`). Match the Open together path.

### First arm vs `:1710–1711`

C: `if (mtmp == u.ustuck && !u_at(u.ux0, u.uy0)) You("and %s teleport together.", mon_nam(mtmp));`

JS: `if (mtmp === u.ustuck && !u_at(u.ux0, u.uy0)) await pline(\`You and ${mon_nam(mtmp)} teleport together.\`);`

`You("and %s...")` expands to `"You and %s..."`. `mon_nam` is article-the, not capitalized `Monnam`. Match.

Place order (pre-existing D-1123, required for the predicate): swallow `u_on_newpos` then `docrt` **before** this pline, so `ux != ux0` typically. Grab that stays `m_next2u` does not move the hero → `u_at(ux0,uy0)` true → together **does not** print. Grab-far `unstuck` clears `ustuck` **before** the message, so the first conjunct is false and C falls through to telemsg/appear. JS `rloc_to_flag` is pre_msg → `rloc_to` (ustuck handling) → post_msg. Match.

C `You()` is `pline` with a `"You "` prefix (`pline.c` `You_buf`). Punctuation is a period, not `!` (appear uses `!`). JS period matches. Do not switch this arm to `Monnam` / `Amonnam` — C is `mon_nam` (the-).

`domsg` is `!in_mklev && (vanishmsg || appearmsg) && !preventmsg`. Together cannot fire in mklev or under `RLOC_NOMSG`. `STRAT_APPEARMSG` alone can still make `domsg` true with `RLOC_MSG` clear; if that monster is also `ustuck` and the hero moved, C still prints together (outer gate includes `mtmp == u.ustuck`). JS outer gate now uses `u.ustuck` consistently (this SHA replaced `game.u?.ustuck` in the gate with the same `u` local). Match.

### Else-if / else vs `:1712–1726`

Telemsg + `couldsee \|\| sensemon` → reappear ternary (D-1180). Else appear/arrives with `next \|\| nearu` (no closer/farther on this arm). This SHA moved appear into `else` instead of falling through after a telemsg `return`. C never used `return`; `makeknown` is after the if/else-if/else. JS still omits `makeknown` after all three (named). Blind appear clone is pre-existing (`youprop.h` Blind ≡ `(H\|\|E) && !B`; JS also ORs sticky `u.Blind` / `u.ublind`). Not this peel’s new clone.

Old JS `return` after the reappear pline skipped the appear arm (correct vs C `else if`) but also skipped any later code in the function. C runs `makeknown` after the whole if/else. JS still has no `makeknown` after together **or** reappear **or** appear — same named omit as D-1180, now honest for all three arms instead of only the appear path. Do not Must-fix `makeknown` onto “Not telemsg.”

`rloc_pre_move_msg` is untouched: on-map spotted dest-visible sets `telemsg`; dest not visible prints `"%s vanishes!"` and clears `appearmsg`. Together is **post**-place only. A vanish-away (telemsg false) plus ustuck+hero-moved still hits together because the outer gate includes `ustuck` even when `canspotmon` is false. C same.

| Case | C | JS after |
|------|---|---------|
| swallow, dest ≠ ux0, `RLOC_MSG` | together You() | **same** |
| grab adjacent, ux==ux0 | not together; telemsg/appear | **same** |
| grab far, already unstuck | telemsg/appear | **same** |
| telemsg, dest visible | reappear suffix | **same** (else-if) |
| `RLOC_NOMSG` | `domsg` false | **same** |
| `in_mklev` | `domsg` false | **same** |
| wand in `current_wand` | `makeknown` | **named skip** |

`ux0` is initialized `0` in `jsmain` and snapshotted on `domove`. A pre-move monster `rloc` while `ux0` is still 0: `!u_at(0,0)` is true if the hero is not at (0,0). C also starts `ux0` at 0 until the first move. Same.

### Place-before-msg vs `teleport.c:1690–1711`

C after worm tail: `if (u.ustuck == mtmp)` swallow `u_on_newpos` + `check_special_room` + `docrt`, else-if `!m_next2u` `unstuck`. Then `maybe_unhide_at` / `newsym` / `set_apparxy`, **then** the `domsg` block. Together therefore sees the **post-place** hero cell vs `ux0`.

JS `rloc_to_flag`: `rloc_pre_move_msg` → `rloc_to` (D-1123 swallow/`unstuck`) → `rloc_post_move_msg`. Together is only in post. Match the C order. Do not move together into pre (that would print before `u_on_newpos` and invert `!u_at(ux0,uy0)` for swallow).

JS as shipped (`teleport.js:1081–1082`): `pline(\`You and ${mon_nam(mtmp)} teleport together.\`)`. Not `You_feel`. Not `Amonnam`. Period, not `!`.

C `You()` (`pline.c`) prefixes `"You "`. `mon_nam` is `do_name.c` the-foo. JS imports `mon_nam` from `do_name.js` — C callee, not an `Amonnam_apply`-style clone. Local `Amonnam` in `teleport.js:63–66` is the appear arm only (pre-existing D-1180).

`u_at` (`teleport.js:94–96`) is `ux===x && uy===y`. C `you.h` `u_at(x,y)` is the same. `distu_xy` is squared Euclidean like C `distu`; together does not use `du` (C neither — suffix locals are computed before the if but unused on this arm). Match.

Wand `makeknown` (`invent.js`) is already imported in `teleport.js:51`. This SHA does not call it after the if/else. Named skip of a live callee, not a missing import.

JS `rloc_to` `:768–785` (D-1123, not this SHA): swallow sets `u.ux/uy` from `mtmp.mx/my`, `check_special_room(false)`, `docrt()`; grab uses `distu_xy > 2` as `!m_next2u` then `unstuck` from `mhitu.js`. C `m_next2u` is squared `distu <= 2` (orthogonal 1, diagonal 2). Together therefore cannot fire on a grab-far that already cleared `ustuck`. Adjacent grab keeps `ustuck` and `ux==ux0` (hero did not move) so `!u_at(ux0,uy0)` is false. Swallow typically moves the hero with the engulfer → together. Match C `:1690–1711`.

Prior review **141** named `:1710–1711` as the sibling of telemsg (D-1180). This SHA is that row. `reviews/loop-2026-08-15/` has no unpaid ustuck-together Must-fix.

C callers that reach `rloc_to_core` with messages: `rloc_to_flag` (`:1777–1782`) passes caller `rlocflags`; `rloc` success (`:1893`) same; `rloc_to` (`:1773`) forces `RLOC_NOMSG` so `domsg` is false and together cannot print. JS `rloc_to` is the place helper; `rloc_to_flag` is the msg envelope. `mnexto` / `mnearto` (`mon.c:3981,4075`) call `rloc_to_flag` — if they relocate `u.ustuck` with `RLOC_MSG` or `STRAT_APPEARMSG`, C would print together when the hero cell moved. JS same once `ustuck` and `ux0` are live. Level-teleport trap `rloc_to_core` (`:1988`) is a later named path. No new RNG on this SHA.

Branch order after dest newsym (`:1703–1731`): outer `domsg && (canspotmon \|\| appearmsg \|\| ustuck)` → `set_msg_xy` (JS skip) → clear `STRAT_APPEARMSG` → compute `du`/`next`/`nearu` → together if ustuck and hero left ux0 → else-if telemsg and (`couldsee` or `sensemon`) reappear with next/close-by/closer/farther/same → else appear/arrives with next/close-by only (no closer/farther) → `makeknown` if `current_wand` is WAN_TELEPORTATION. JS walks that chain except `set_msg_xy` and `makeknown`. Telemsg closer/farther uses `distu(oldx,oldy)` vs `du` — JS `distu_xy(oldx,oldy)`. Together ignores those suffixes. Appear uses `!Blind` for arrives vs appears — JS Blind clone ORs sticky `u.Blind`/`u.ublind` (pre-existing, named in D-1180, not this peel).

## Hallucinations / overclaim

D-log / CURRENT / subject say a swallowed or still-stuck grabber whose hero cell left ux0 prints `You and %s teleport together` instead of reappear/appear. **That is the hunk:** C `:1710–1711` plus the else-if chain. Stamping **Addressed:** D-1183 is fair for the Open **ustuck-together** line. Hash `d2512b22` is on the archive row (filled by D-1184). Do **not** stamp it as “Match C wand discovery” or “Match C `set_msg_xy`” or “Match C `scrolltele` `make_blinded`.” This is **not** “Match C dispatch, callee is a stub”: `pline` / `mon_nam` / `u_at` / swallow `u_on_newpos` are live.

### Clone classification (this SHA)

- ustuck-together arm — C first post-msg branch, new.
- `You()` — C via `pline` prefix `"You "`; not a new helper.
- `mon_nam` — C callee imported from `do_name.js`.
- `u_at` — C macro local already in this file.
- telemsg reappear / appear-arrives — C else-if / else, restructured not rewritten.
- local `Amonnam` — pre-existing appear clone (D-1180), unused on together.
- Blind appear clone — pre-existing, unused on together.
- `set_msg_xy` / wand `makeknown` — live callees, named skip (not stubs).
- No no-op helper added.

## Density

One C `if` / `else if` / `else` restructure. ~20 JS lines. Thin vs §2b “one deferred `if` alone,” but it is the named sibling of D-1180 in the same function, not an unrelated peel. Did not pull `make_blinded`. Not QUALITY-RISK.

## Verification

Journal: private canary **44**/44 (order; together beats telemsg; grab adjacent silent; grab ux!=ux0 together; grab far unstuck; `RLOC_NOMSG`; same-cell; `in_mklev`; Blind arrives; `mon_nam` the- not The-); green+strict seed8000/0900; cohort **12**/12. Path **public-unhit** unless swallowed/ustuck teleports with messages. Cadence **#1505** **44**/44 is the fortress check, not an engulfer-rloc canary.

Grep of `git show d2512b22 -- js/`: no FORCE/DIAG/`getRngLog`/`readFileSync`/`fs`/`node:`/`fastforward`/seed names/hardcoded coordinates. `mon_nam` interpolates the live monster, not a recorded glyph. `ux0` is the hero snapshot, not a trace index.

C read of `teleport.c:1645–1732` (place ustuck `:1690–1698` then messages `:1703–1731`). JS SHA `rloc_post_move_msg` / `rloc_to_flag` order / `rloc_to` `:768–785`. Hunk grepped FORCE/fs/seed. This audit’s full `sessions` Scr **11405**/11405 RNG **792838**/792838 (100%). Speed `33+0.28/turn` (R² 0.87) on `8c51cfe8`.

## Actionable C-wrongs

None that Must-fix this next iter. The Open together arm matches `:1710–1711`. Else-if telemsg / else appear match C. Not a stub.

Named omits / do-nots (map / Open, not Must-fix):

1. `set_msg_xy(x,y)` before the if (`:1708`). Open.
2. wand `makeknown(WAN_TELEPORTATION)` after any delivered msg (`:1730–1731`). Open.
3. Do not print together and reappear. Do not `Monnam` the together line. Do not pull `make_blinded` into this SHA — **Addressed:** D-1184 `1b94d8d3`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: a swallowed or still-stuck grabber whose hero cell is no longer `ux0,uy0` now prints C’s `You and %s teleport together.` via `mon_nam`, then else-if reappear else appear, while wand `makeknown` and `set_msg_xy` stay named.
- Must-fix stays empty for this SHA; next port in this window popped Open `scrolltele` `make_blinded`. **Addressed:** D-1183 `d2512b22`. Not telemsg, not `makeknown`.
