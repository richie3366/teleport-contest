# Review 501 — 53f71db1 — shk.c make_happy_shk adjalign/home/migrate/shoppers (D-1540)

## Metadata
- Full / short hash: `53f71db1d17647e2f89abba108d4f9b3f1bc5877` / `53f71db1`
- Parent: `2a0adb9e` (audit #1930). This file audits **this SHA only** (first of nine `js/` commits since review **500**). Archive **Addressed:** D-1540 `53f71db1`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-26 08:30:53 +0200
- D-id: **D-1540**
- Stats: 13 files, +248 / −72 — `js/shk.js` +143 / −31, `js/mon.js` +1 / −1, `js/dog.js` +1. Band 150–350 (js/ insertions 145).
- Claims to close: Must-fix review **493** (`make_happy_shk` stub in live `tamedog` isshk arm). Not a public FAIL. `reviews/loop-2026-08-15/` has no unpaid shk Must-fix.
- JS / map: `shk.js` `make_happy_shk` / shoppers / `kops_gone` / `home_shk`; export `mdrop_special_objs`. `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **493** QUALITY-RISK (stamped **Addressed:** D-1540 `53f71db1` in the same port commit).

## Intent vs deliverable

Git subject promises: taming a shopkeeper adjaligns, homes or migrates, and dismisses kops/guards, not pacify plus “calms down” only.

Pinned C `shk.c` `make_happy_shk` `:1395–1435`; `make_happy_shoppers` `:1438–1445`; `angry_shk_exists` `:1330–1339`; `home_shk` `:1317–1327`; `kops_gone` `:5606–5623`; `mon.c` `pacify_guards` `:5769–5772` / `pacify_guard` `:5762–5767` / `iter_mons` `:4527–4537`. Caller `dog.c` `tamedog` `:1235–1238`. `attrib.c` `adjalign` `:1298–1315`. `hacklib.c` `sgn` `:650–653`. `dungeon.h` `MIGR_APPROX_XY` 1.

```1395:1435:nethack-c/upstream/src/shk.c
void
make_happy_shk(struct monst *shkp, boolean silentkops)
{
    boolean wasmad = ANGRY(shkp);
    struct eshk *eshkp = ESHK(shkp);

    pacify_shk(shkp, FALSE);
    eshkp->following = 0;
    eshkp->robbed = 0L;
    if (!Role_if(PM_ROGUE))
        adjalign(sgn(u.ualign.type));
    if (!inhishop(shkp)) {
        /* home_shk or mdrop_special_objs + migrate_to_level */
        ...
    } else if (wasmad)
        pline("%s calms down.", Shknam(shkp));

    make_happy_shoppers(silentkops);
}
```

Old JS: pacify, zero follow/robbed, “calms down” if angry; `_silentkops` unused; comment deferred home/migrate/shoppers. Review **493** classified that as **STUB in a live arm**.

The diff **does** port adjalign (skip Rogue), `!inhishop` home-or-migrate, vanish/return/calms plines, `make_happy_shoppers` → `kops_gone` + `pacify_guards`, `after_shk_move` `bill_p==-1000`, and export `mdrop_special_objs`. It **does not** call `mnearto` (not in `js/**`), occupancy `check_special_room`, or `losedogs` shoppers. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `make_happy_shk` `:1395` | C, **LIVE this SHA** | no longer pacify-only |
| `pacify_shk` | C `:1344`, **LIVE** | local |
| `adjalign` / `sgn` | C `attrib.c` / `hacklib.c`, **LIVE** / **CLONE** | import; local sgn matches `:650` |
| `Role_if(PM_ROGUE)` | C `you.h`, **CLONE** | `urole.mnum` |
| `inhishop` | C `:1039`, **LIVE** (partial) | roomno; on_level+`in_rooms` named |
| `on_level` | C `dungeon.c`, **CLONE** | local `dnum`/`dlevel` |
| `home_shk` `:1317` | C, **LIVE this SHA** | coord set; `mnearto` **OMIT named** |
| `mdrop_special_objs` | C `steal.c`, **LIVE this SHA** | export; was local |
| `migrate_to_level` | C `dog.c`, **LIVE** | import; `MIGR_APPROX_XY`=1 |
| `ledger_no` | C `dungeon.c`, **LIVE** | `dungeon.js` (not mon.js clone) |
| `make_happy_shoppers` | C `:1438`, **LIVE this SHA** | |
| `angry_shk_exists` / `next_shkp` | C `:1330` / `:1068`, **LIVE** | |
| `kops_gone` | C `:5606`, **LIVE this SHA** | static in shk.c; `mongone` import |
| `pacify_guards` | C `mon.c:5769`, **CLONE** | cycle; `iter_mons` skip + `is_watch` |
| `is_watch` | C `mondata.h:159`, **LIVE** | import |
| `mongone` | C `mon.c`, **LIVE** | dynamic import |
| `mnearto` | C `mon.c:4031`, **OMIT named** | **not in js/\*\*** |
| `check_special_room` | C `hack.c`, **OMIT named** | LIVE `hack.js:1808`; not called |
| `losedogs` shoppers | C, **OMIT named** | |

`node scripts/sym.mjs mdrop_special_objs make_happy_shk make_happy_shoppers adjalign inhishop migrate_to_level ledger_no mongone is_watch pacify_guards kops_gone home_shk angry_shk_exists next_shkp mnearto check_special_room pacify_shk`:

```
mdrop_special_objs js/mon.js:1333   sync
make_happy_shk   js/shk.js:1325   ASYNC — await required
make_happy_shoppers js/shk.js:1313   ASYNC — await required
adjalign         js/attrib.js:585   sync
inhishop         js/shk.js:493   sync
             !! ALSO 2 LOCAL CLONE(S) — js/sounds.js js/teleport.js
migrate_to_level js/teleport.js:2634   sync
ledger_no        js/dungeon.js:575   sync
mongone          js/mon.js:2574   ASYNC — await required
is_watch         js/monsters.js:882   sync
pacify_guards    NOT EXPORTED — 1 LOCAL js/shk.js:1301
kops_gone        NOT EXPORTED — 1 LOCAL js/shk.js:1278
home_shk         NOT EXPORTED — 1 LOCAL js/shk.js:3535
angry_shk_exists NOT EXPORTED — 1 LOCAL js/shk.js:1264
next_shkp        NOT EXPORTED — 1 LOCAL js/shk.js:3488
mnearto          NOT FOUND in js/**
check_special_room js/hack.js:1808   ASYNC — await required
pacify_shk       NOT EXPORTED — 1 LOCAL js/shk.js:202
```

This SHA **re-points** `mdrop_special_objs` local → export (still one body). `pacify_guards` is a **new** C-matched clone, not a second copy of an export (none exists). `kops_gone`/`home_shk`/`angry_shk_exists` are C-static locals. Do **not** import `mon.js` `ledger_no` clone.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean.

## C ↔ JS fidelity

Pacify + follow/robbed. `wasmad = ANGRY` then `pacify_shk(FALSE)` then zero following/robbed. **Match `:1397–1402`.** Extra `if (eshkp)` vs C’s always-ESHKed isshk.

Adjalign. `!Role_if(PM_ROGUE)` then `adjalign(sgn(ualign.type))`. Local `sgn` is `-1/0/1` like `hacklib.c:650` (`n<0 ? -1 : n!=0`). Live `adjalign` clamps record / ALIGNLIM. Neutral `sgn(0)=0` is a no-op. **Match `:1403–1404`.**

`!inhishop` vs in-shop. C `:1039–1048` is `on_level(shoplevel,u.uz)` and `strchr(in_rooms(...,SHOPBASE), shoproom)`. JS is `loc.roomno === shoproom` (D-0205 named). A doorway shk can be C-in-shop / JS-out and take home/migrate instead of “calms down”. **Named, not this SHA’s envelope.**

Same-level home. `on_level` clone then `home_shk(FALSE)`. C `:1321` `mnearto(..., TRUE, RLOC_NOMSG)` yanks `m_at` (`mon.c:4046`). JS writes `mx/my` + `newsym`; occupancy overlap possible. **Callee `mnearto` is absent from JS, named.** Return pline + `vanished=false` **Match `:1412–1416`.** `killkops` false here; kops go through shoppers.

Other-level migrate. `sensemon` forces vanished; `mdrop_special_objs` (quest/Amulet/`obj_resists(0,0)` `rn2`); `migrate_to_level(ledger_no(shoplevel), MIGR_APPROX_XY, shd)`; `dismiss_kops=true`. **Match `:1417–1428` call-for-call.** Vanish pline **Match `:1430–1431`.** In-shop `wasmad` “calms down” **Match `:1432–1433`.** Old JS printed that even when `!inhishop`.

Shoppers. `!angry_shk_exists()` → `kops_gone` + `pacify_guards`. **Match `:1442–1444`.** `next_shkp(..., false)` riles unpaid angry like C. `kops_gone`: snapshot `mhp>=1` + `mlet==='S_KOP'` (JS class string ≡ C `S_KOP`), `canspotmon` then `mongone`, pline Kop/Kops vanish/vanishes unless silent. C also skips only `DEADMONSTER`, not `mon_offmap`. **Match `:5606–5623`.** `pacify_guards` clone: skip dead / `mstate!==MON_FLOOR` (`iter_mons` `:4533` `DEADMONSTER||mon_offmap`) then `is_watch` → `mpeaceful=1`. C `is_watch` is `PM_WATCHMAN||PM_WATCH_CAPTAIN`. **Verified CLONE.**

`home_shk` now runs `after_shk_move` (bill_p sentinel → `&bill[0]`). **Match `:5001–5003`.** Skips `!gameover` `check_special_room(FALSE)` (`:5005–5006`). **Named.** `pay_for_damage`/`inherits` now `await home_shk` so they get that hook too.

Callee closure (isshk / `make_happy_shk` arm). LIVE: pacify, adjalign, inhishop (partial), home_shk coord, mdrop, migrate, ledger_no, shoppers, kops_gone, mongone, angry_shk_exists, next_shkp, cansee/spot/sense, Shknam. CLONE: sgn, Role_if, on_level, pacify_guards, noit_mhis, plur. OMIT named: mnearto, occupancy, losedogs shoppers, inhishop `in_rooms`. STUB: none. **The arm may ship.** Review **493** item 1 is closed.

## Hallucinations / overclaim

Subject adjalign / home-or-migrate / kops+guards: **true of the C block.** D-log “not pacify+calms only”: **true.** Stamping **Addressed:** D-1540 is fair for **493**’s Must-fix. Do **not** stamp “Match C `mnearto` yank.” Do **not** stamp “Match C `losedogs` `make_happy_shoppers`.” Do **not** stamp “Match C `inhishop` `in_rooms`.” This is **not** “dispatch ported, callee stubbed”: `tamedog` still dynamic-imports the now-LIVE body.

## Density

One C function plus the shoppers/`kops_gone`/`pacify_guards`/`angry_shk_exists` envelope those lines always reach. +145 JS. Did not glue `ghostfruit`. §2b OK. Must-fix shipped **alone**.

## Branch-by-branch confirm

1. Rogue: skip adjalign. **Match.**
2. Lawful non-Rogue: `adjalign(+1)`. **Match.**
3. Neutral: `sgn(0)` no-op. **Match.**
4. In-shop was-angry: “calms down”, then shoppers. **Match.**
5. In-shop already peaceful: no calms pline, still shoppers. **Match.**
6. Same-level `!inhishop`: home + return pline if `canspotmon`. **Match the calls; not mnearto.**
7. Other-level: drop special + migrate `MIGR_APPROX_XY` + `dismiss_kops`. **Match.**
8. Other angry shk exists: kops/watch stay. **Match.**
9. No other angry: mongone S_KOP + pacify watch. **Match.**
10. Occupancy `check_special_room` / `losedogs`: skipped. **Named.**

## Callers / RNG ledger

C: `tamedog` isshk; dokick unpaid; shk pay paths. JS the same (`dog.js` still `make_happy_shk(mtmp,false)`). **New RNG** on migrate: `obj_resists(0,0)` inside `mdrop_special_objs`. `kops_gone`→`mongone` may consume more. Public-unhit (no public shk taming). No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. Dynamic `mon.js` for `mongone`/`mdrop_special_objs` (shk↔mon cycle). No scored `fs`. No FORCE.

## Verification

D-log canary **14**/14 (C/JS grep; in-shop adjalign+kops+watch; Rogue skip; neu/chaotic sgn; home; migrate `MIGR_APPROX_XY`+`dismiss_kops`; other-angry kops stay; silentkops; Rule #2); green+strict; cohort **7**/7 incl. seed0004. **Public-unhit.** Admit it. Canary does not exercise `mnearto` yank or `losedogs`.

## Actionable C-wrongs

None for Must-fix. Named: `mnearto` (`mon.c:4031`, not in JS); `after_shk_move` occupancy `check_special_room`; `losedogs` `make_happy_shoppers`; `inhishop` `on_level`+`in_rooms`.

Verdict: **ACCEPT-WITH-DEBT**
