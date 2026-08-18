# Review 158 — d0cbc6e3 — teleport.c `rloc_to_core` dest-msg `set_msg_xy` (D-1196)

## Metadata
- Full / short hash: `d0cbc6e3c8c31c343330a1abf0187f2c61c30bba` / `d0cbc6e3`
- Parent: `143f9a46` (D-1195). This file audits **this SHA only**. Archive row **Addressed:** D-1196 lacked the short hash; this review commit fills `d0cbc6e3`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 01:32:24 +0200
- D-id: **D-1196**
- Stats: 11 files, +113 / −51 — `js/teleport.js` +21 / −10; `js/hack.js` export `set_msg_xy` +1 / −1.
- Claims to close: Open queue `teleport.c` `rloc_to_core` `set_msg_xy` (named from D-1195 / D-1183 / D-1180). Not makeknown. `reviews/loop-2026-08-15/` has no unpaid `msg_loc` Must-fix.
- JS / map: `teleport.js` `rloc_post_move_msg`; callee `hack.js` `set_msg_xy` (already used by `notice_mon`). `c-js-map/turns.md`. `vpline` consume / `accessiblemsg` prefix still named. `scrolltele` W-tower Override yn next Open.
- Prior reviews this SHA claims to close: **157** “not `set_msg_xy`”; **144** named dest-msg omit.

## Intent vs deliverable

Git subject promises: “Match C teleport.c rloc_to_core dest-msg set_msg_xy so a relocate message stores a11y.msg_loc at dest.”

Old JS dest-msg gate printed together / telemsg / appear (and after D-1195 discovered the wand) without writing `a11y.msg_loc`. C `rloc_to_core:1708` calls `set_msg_xy(x, y)` **after** computing `du` / `next` / `nearu` and **before** clearing `STRAT_APPEARMSG` and the dest plines.

The diff **does** export `hack.js` `set_msg_xy` and call it at that point, and **moves** the strategy clear to after the store so order matches C (old JS cleared `mstrategy` first, with `set_msg_xy` only a comment). It does **not** pull `vpline` snapshot/reset/prefix of `msg_loc`. Named. Default `accessiblemsg` Off so public plines do not show a coordinate prefix either in C.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| dest-msg `set_msg_xy(x,y)` | C site, **new** | `teleport.c:1708` |
| `set_msg_xy` | C callee, **imported** (export this SHA) | `pline.c:93–97`; already used by `notice_mon` |
| `a11y.msg_loc` | C field, **live store** | `hack.js` `a11y_state()` |
| `vpline` consume / prefix | C `pline.c:162–189`, **named omit** | snapshot, reset 0,0, `accessiblemsg` `coord_desc` |
| vanish `set_msg_xy` | C does **not** | JS also only dest-msg |
| `scrolltele` W-tower Override | C sibling, **named omit** | next Open |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new RNG.** `| 0` on x/y is coordxy truncation, not a roll.

Grep of this SHA’s `js/` hunks: no banned gates.

## C ↔ JS fidelity

### Call site vs `teleport.c:1703–1711`

C inside `domsg && (canspotmon || appearmsg || ustuck)`:

```
        int du = distu(x, y), olddu;
        const char *next = (du <= 2) ? " next to you" : 0,
                   *nearu = (du <= BOLT_LIM * BOLT_LIM) ? " close by" : 0;

        set_msg_xy(x, y);
        mtmp->mstrategy &= ~STRAT_APPEARMSG; /* one chance only */
        if (mtmp == u.ustuck && !u_at(u.ux0, u.uy0)) {
```

JS after this SHA (`teleport.js:1073–1088`): same early returns for `!domsg` and the dest-msg triple; `distu_xy` / next / nearu; **`set_msg_xy(x, y)`**; then `if (mtmp.mstrategy != null) mtmp.mstrategy &= ~STRAT_APPEARMSG`; then ustuck / telemsg / appear. **Store-before-clear-before-plines matches `:1708–1710`.** The `mstrategy != null` guard is pre-existing (C always `&=`); not introduced as a skip of the store. `x,y` here are dest args of `rloc_to_flag` / `rloc_post_move_msg`, not origin — C `rloc_to_core` dest. Silent `rloc_to` / `RLOC_NOMSG` / same-cell / `in_mklev` / unspotted dest never enter; `msg_loc` stays whatever it was (C same: no `set_msg_xy` on those paths).

Old JS cleared strategy **above** the omitted store. Moving the clear down is the C order, not a behavior change for `STRAT_APPEARMSG` (still cleared before plines).

### Callee vs `pline.c:91–97`

C:

```
void
set_msg_xy(coordxy x, coordxy y)
{
    a11y.msg_loc.x = x;
    a11y.msg_loc.y = y;
}
```

JS (`hack.js:1767–1771`): writes `a11y.msg_loc.x/y` via `a11y_state()`, `| 0`. **That is the store. Not a stub.** `notice_mon` already used the local function; exporting it is the D-1196 wiring, not a second implementation.

### Consume vs `pline.c:162–189` — named omit, not this callee

C `vpline` **always** copies `a11y.msg_loc` then resets it to 0,0, even when `accessiblemsg` is Off. If On and `isok(saved xy)`, it prefixes `coord_desc: ` and recurses. JS `pline.js` has **no** `msg_loc` read (grep empty). After a dest pline:

- C: `msg_loc` is **0,0** (consumed by the relocate pline itself).
- JS: `msg_loc` **still dest** until the next `set_msg_xy` / `notice_mon`.

That is a **C-wrong of `vpline`**, not a lie about `set_msg_xy`. Subject says “stores … at dest” — true. D-log names consume. Default `accessiblemsg: false` so C would not prefix publicly either; C would still reset. Leftover dest coords can leak into a later `notice_mon` store or a future consume port. ACCEPT-WITH-DEBT, not Must-fix (do not steal Open `scrolltele`).

`pline_xy` / `pline_mon` / `set_msg_dir` still unnamed as extra writers. Dest-msg uses `pline()` after `set_msg_xy`, which is C’s `You` / `pline` too.

`notice_mon` (`hack.c:1717–1719` / `hack.js:1788–1789`) also `set_msg_xy(mtmp->mx, mtmp->my)` before “You see/notice”. Default `mon_notices` Off so that writer is idle on the fortress. If both dest-msg and notices were On, C dest pline consumes loc to 0,0 then a later notice writes the monster cell; JS dest pline would **leave dest**, then notice overwrite to the monster. Observable only with both options On. Named consume peel covers it.

`a11y_state()` defaults `msg_loc: {x:0,y:0}`, `accessiblemsg: false` — C `flag.h` zeros. `| 0` matches coordxy store of possibly-undefined JS `x`. `mx==0` dest (migrating place) still writes 0 — C would too; `isok(0,y)` would fail a future prefix anyway.

| Case | C | JS after |
|------|---|---------|
| dest-msg gate | set dest xy | **same** |
| order vs strategy clear | store then `&= ~STRAT_APPEARMSG` | **same** (moved) |
| together / telemsg / appear | store then pline | **same** |
| RLOC_NOMSG / same-cell / mklev | no store | **same** |
| vanish-only | no store | **same** |
| `vpline` after dest pline | msg_loc 0,0 | **still dest** (named) |
| `accessiblemsg` prefix | if On | **named omit** |

## Constitution / playbook

No FORCE / getRngLog / recorded `(gx,gy)` written into `msg_loc`. The store is C `:1708` dest coordinates from `rloc_to_core`’s `x,y`. Rule #2: no fs. Do not invent an accessiblemsg prefix in `teleport.js` to fake consume. Frozen contracts untouched. Default `accessiblemsg` Off matches C optlist; leftover dest after pline is still a `vpline` diverge.

## Hallucinations / overclaim

D-log / CURRENT / subject say a relocate message stores `a11y.msg_loc` at dest. **The `:1708` call is the hunk.** Stamping **Addressed:** D-1196 is fair; fill hash `d0cbc6e3` in this commit. This is **not** “Match C dispatch, callee is a stub”: `set_msg_xy` writes the struct field. Do **not** stamp “Match C `accessiblemsg`” or “Match C `vpline` consume” or “Match C `scrolltele` Override.” Say so: the store is C; the next `pline` in JS does **not** snapshot/reset like `vpline:162–164`.

Exporting a function `notice_mon` already called is not a second clone.

### Clone classification (this SHA)

- dest-msg `set_msg_xy` — C site, new.
- `set_msg_xy` — C callee, export of existing body, live store.
- `vpline` consume — C sibling, **named omit** (JS pline is the diverge).
- No no-op helper. Strategy-clear move is C order, not a new function.

`You("and %s teleport together.")` is `pline` under the hood in C, so it consumes `msg_loc` immediately after the store. JS `pline(\`You and ${mon_nam} teleport together.\`)` does not consume. Telemsg and appear arms same. All three dest strings therefore leave dest coords in JS and 0,0 in C.

## Density

One call + reorder of `STRAT_APPEARMSG` clear (~10 lines of real JS). Thin. It is the whole queued Open row. Did not pull consume or W-tower Override. Same one-row-peel note as D-1194/D-1195: constitution says do not combine Open items; this audit batches the four peels’ C read. Zero RNG: `set_msg_xy` is a field write. `| 0` is not `rn2`.

## Verification

Journal: private canary **18**/18 (write dest; `|0`; telemsg / appearmsg / ustuck / swallow set dest; silent `rloc_to` / RLOC_NOMSG / same-cell / `in_mklev` / unspotted skip; mx==0 dest; dest≠origin; Null wand still sets; no fs); green+strict seed8000/0900; cohort **14**/14 + strict 1500/0012/0360/4500/2200/0014. Path public-unhit unless `accessiblemsg` is On (default Off) **and** consume exists. Cadence **#1520** **44**/44 does not read `msg_loc`.

Grep of `git show d0cbc6e3 -- js/`: no FORCE/DIAG/`getRngLog`/`readFileSync`/`fs`/`node:`/`fastforward`/seed names/hardcoded coordinates.

C read of `teleport.c:1703–1732`, `pline.c:91–97` / `:152–189`. JS SHA `teleport.js` dest-msg; `hack.js` export; `pline.js` absence of consume.

`isok` on dest is **not** checked at `set_msg_xy`; C writes even if x,y would fail a later prefix. JS same. `BOLT_LIM` next/nearu strings are independent of `msg_loc`. Swallow `u_on_newpos` dest still uses the monster’s new `x,y`. `rloc_to` silent wrapper never reaches this store.

## Actionable C-wrongs

None that Must-fix this next iter (do not steal Open `scrolltele` W-tower Override yn). Claimed store matches `:1708`.

C-wrong family remaining (map / later peel, not new Must-fix prepends):

1. `vpline` must snapshot `a11y.msg_loc`, reset to 0,0, then optionally prefix when `accessiblemsg` (`pline.c:162–189`). Until then JS leaves dest coords stuck after the relocate pline; C zeros them.
2. Do not skip consume by reading `msg_loc` from a later invented hook.

Named omits / do-nots:

3. `scrolltele` W-tower Override yn (next Open). `set_msg_dir` / `pline_xy` / `pline_mon`. `coord_desc` formats.
4. Do not revert D-1196. Do not FORCE a recorded dest into `msg_loc`. Do not put `set_msg_xy` on vanish-only. Do not clear `STRAT_APPEARMSG` after the dest pline. Do not write `msg_loc` from `oldx,oldy`.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- Score: **7 / 10**
- One sentence: dest-msg now stores `a11y.msg_loc` at the relocate dest before strategy clear and plines, matching `teleport.c:1708`; `set_msg_xy` is live, but JS `pline` still does not consume/reset like C `vpline`, so the store has no public prefix and leftover coords survive the message.
- Must-fix stays empty for this SHA; fill **Addressed:** D-1196 `d0cbc6e3`. Next port is already Open `scrolltele` W-tower Override yn. Not makeknown, not consume.
