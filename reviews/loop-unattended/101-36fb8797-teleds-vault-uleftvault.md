# Review 101 — 36fb8797 — teleds vault_guard uleftvault (D-1140)

## Metadata
- Full / short hash: `36fb879767e58324364339062210f3bb355a5983` / `36fb8797`
- Parent: `4071a74d` (D-1139). This file audits **this SHA only**. The fix stamped **Addressed:** D-1140 without the short hash; this review commit fills `36fb8797`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 06:11:32 +0200
- D-id: **D-1140**
- Stats: 10 files, +130 / −24 — `js/teleport.js` +30 / −7 (origin capture + dest fake/restore); `js/vault.js` +33 / −2 (`uleftvault`).
- Claims to close: Open queue `teleport.c` `teleds` `vault_guard` `uleftvault` (named). Not swallow docrt. Review **82** named vault_guard; **100** next Open. `reviews/loop-2026-08-15/` has no open uleftvault Must-fix.
- JS / map: `teleport.js` `teleds`; `vault.js` `uleftvault` / `vault_occupied` / `findgd` / `gd_move` / `in_fcorridor`. `c-js-map/turns.md` teleport + vault. `invocation_message`, `notice_mon_*`, hostile `gd_move` rloc/`gd_letknow`/`wallify_vault`, migrating `findgd` park still named.
- Prior reviews this SHA claims to close: **82** named vault_guard; **92** do-not pull vault into hideunder; D-1139 next-port.

## Intent vs deliverable

Git subject promises: “Match C teleport.c teleds so leaving a vault with a live guard fakes dest VAULT occupancy, runs uleftvault (gold+um_dist irate/mpeaceful=0), then restores u.urooms before spoteffects, instead of skipping the guard alarm.”

Old JS went from dest-typ `switch_terrain` straight to `spoteffects(TRUE)`. C `teleport.c:454` captures `vault_guard = vault_occupied(u.urooms) ? findgd() : 0` at the **origin**, then `:557–566` saves `u.urooms`, fakes dest `in_rooms(u.ux,u.uy,VAULT)`, calls `uleftvault` if the dest is not a vault, restores so `spoteffects`→`move_update` still sees origin rooms (D-0639 temple/shop). `vault.c:256–277` `uleftvault`: gold (`money_cnt` or `hidden_gold(TRUE)`) and `um_dist(...,1)` → irate pline + `mpeaceful=0` (bypass `setmangry`); `!in_fcorridor` → extra `gd_move`.

The diff **does** that capture, fake, call, restore, and ports `uleftvault`. It does **not** fill hostile `gd_move` (`vault.c:915–928` rloc/wallify/`clear_fcorr`/`gd_letknow`) — JS `gd_move` still `if (!grd.mpeaceful) return -1` (`vault.js:722`) **after** `uleftvault` just cleared peace. Named. It does **not** port `invocation_message` or `notice_mon_*`. Named. `findgd` still skips migrating_mons park.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `teleds` vault_guard capture | C body, **new** | `teleport.c:454` origin, before buried-ball |
| dest fake / restore | C body, **new** | `teleport.c:557–566` after `switch_terrain` |
| `uleftvault` | C callee, **new** | `vault.c:256–277` |
| `vault_occupied` | C callee, **imported** | `vault.js:244` analog; real room rtype |
| `findgd` | C callee, **imported** | fmon only; migrating park named |
| `in_rooms(..., VAULT)` | C callee, **imported** | `hack.js` |
| `money_cnt` / `hidden_gold` | C callees, **clones** | local in `vault.js`; invent array |
| `um_dist` | C callee, **clone** | Chebyshev > n |
| `in_fcorridor` | C callee, **imported** | same-file fakecorr walk |
| `canspotmon` / `Monnam` | C callees, **imported** | irate pline |
| `gd_move` | C callee, **partial** | peaceful escort live; **hostile arm no-op** |
| `invocation_message` | C later arm, **named omit** | live Open |
| `notice_mon_*` | C later arms, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Dest `u.ux/uy` after `u_on_newpos` are live cells. Rule #2 clean. Frozen contracts untouched.

**New RNG on this path:** none in capture/fake/`uleftvault` irate/`mpeaceful=0`. Hostile `gd_move` would `rloc(RLOC_MSG)` in C; JS does not take that arm, so **no** extra rloc rng on gold vault-leave. Public seed0012 escort stays peaceful (no gold leave). Path public-unhit on gold vault teleport.

## Constitution / playbook

Grep of the two JS hunks: no trace-index gates. Contest Rule #2: in-process ESM; dynamic `import('./vault.js')` because vault→trap→teleport. Do not leave `u.urooms` as the dest fake across `spoteffects` (D-0639). Do not `setmangry` (C bypasses). Do not pull `invocation_message` into this SHA. Do not treat hostile `gd_move` as shipped.

## C ↔ JS fidelity

### `teleds` envelope

C `teleport.c:454, 553–566`:

```
struct monst *vault_guard = vault_occupied(u.urooms) ? findgd() : 0;
/* ... move, vision, switch_terrain ... */
if (vault_guard) {
    char save_urooms[5];
    Strcpy(save_urooms, u.urooms);
    Strcpy(u.urooms, in_rooms(u.ux, u.uy, VAULT));
    if (!vault_occupied(u.urooms))
        uleftvault(vault_guard);
    Strcpy(u.urooms, save_urooms);
}
spoteffects(TRUE);
```

JS `1204–1208`, `1332–1344`: same capture at origin (dynamic import); after dest-typ `switch_terrain`, `save_urooms = u.urooms \|\| ''`; `u.urooms = in_rooms(u.ux, u.uy, VAULT)`; if `!vault_occupied` then `await uleftvault`; restore; `spoteffects(true)`. Stay-in-vault dest: `vault_occupied` true → skip `uleftvault`. No occupancy at origin: `vault_guard` null → skip the block. Match on the Open **fake/restore**. `invocation_message` / `notice_mon_on` still absent after `spoteffects`. Named.

Capture **before** buried-ball / `u_on_newpos` matters: dest `u.urooms` is not yet rewritten; origin vault bit is what `findgd` keys off. JS same.

`vault_occupied` returns the room character or `'\0'` / `0`. JS returns the char code or `0` (false). `in_rooms(x,y,VAULT)` returns only VAULT room letters at the dest cell; a corridor dest is `""` so `vault_occupied` is false and `uleftvault` runs. D-0639: `spoteffects`→`move_update` compares **origin** `u.urooms` to dest occupancy to print temple/shop entry. Leaving the fake in place would make origin look like the dest vault-or-not and skip `u_entered_shop` / `intemple`. Restore matches C `Strcpy` back. seed0367 Pri ^T temple is the cohort lock for that restore.

### `uleftvault` body

C `vault.c:256–277`:

```
if (!grd || !grd->isgd || DEADMONSTER(grd)) {
    impossible("escaping vault without guard?");
    return;
}
if ((money_cnt(gi.invent) || hidden_gold(TRUE))
    && um_dist(grd->mx, grd->my, 1)) {
    if (grd->mpeaceful) {
        if (canspotmon(grd))
            pline("%s becomes irate.", Monnam(grd));
        grd->mpeaceful = 0; /* bypass setmangry() */
    }
    if (!in_fcorridor(grd, u.ux, u.uy))
        (void) gd_move(grd);
}
```

JS `347–365`: dead/`!isgd` return (no `impossible`); gold (`money_cnt(game.invent) \|\| hidden_gold(true)`) and `um_dist(mx,my,1)` → if peaceful: `canspotmon` irate + `mpeaceful=0`; `!in_fcorridor` → `await gd_move`. No-gold: skip (guard stays peaceful). Adjacent dest (`um_dist` false): skip. `in_fcorridor` dest: hostile bits but no extra `gd_move`. Match the **irate / mpeaceful** Open line.

`money_cnt` sums `COIN_CLASS` on the invent array. `hidden_gold(TRUE)` walks carried containers (`cknown \|\| even_if_unknown`). `um_dist` is Chebyshev > n (`apply.c`). Those clones match C’s predicates (0 is false).

### `gd_move` after `mpeaceful=0` — named no-op, not a fake uleftvault

Say it explicitly: **`uleftvault` itself is not a stub.** The gold/irate/`mpeaceful=0` arm is C. The extra `gd_move` **is** dispatched.

C `gd_move` (`vault.c:915–928`) when `!mpeaceful`: if hero is out of vault and the guard is in vault or fakecorr-not-with-hero → `rloc(RLOC_MSG)`, `wallify_vault`, maybe `clear_fcorr`, `gd_letknow`, return −1; else maybe `clear_fcorr`, return −1. That runs **after** `uleftvault` clears peace, with `u.urooms` still the **dest fake** (`u_in_vault` false).

JS `gd_move:722` `if (!grd.mpeaceful) return -1` **before** that hostile block (and before C’s both-out `wallify_vault` at `:912–913`). So the extra move is a no-op: guard stays on the vault map, already hostile. D-log / map / `teleds` header name this. It is **not** “Match C `gd_move` hostile.” It **is** “Match C `uleftvault` irate.” Do not Must-fix it as this peel — next Open is `invocation_message`; hostile escort rloc is a vault family, public-unhit on gold vault-teleport.

`findgd` (`vault.js:314–326`) returns the first `isgd` on `fmon` for this level. C also parks a migrating guard at `<0,0>` and heals `!mx && !gddone`. Named. A guard only on `migrating_mons` yields `vault_guard==null` and skips the alarm. Not the seed0012 live-escort path.

## Hallucinations / overclaim

D-log / CURRENT / subject say leaving a vault with a live guard fakes dest VAULT occupancy, runs `uleftvault` (gold+`um_dist` irate/`mpeaceful=0`), then restores `u.urooms` before `spoteffects`. That is the hunk. They **name** hostile `gd_move` rloc/`gd_letknow`/`wallify`. Stamping **Addressed:** D-1140 is fair for the Open **teleds envelope + irate**. Fill hash `36fb8797` in this commit. Do **not** stamp it as “Match C hostile `gd_move`” or a close of `invocation_message`. This is **not** “Match C dispatch, callee is a stub” for `uleftvault`; the hostile `gd_move` callee is a **named no-op** of a call `uleftvault` makes.

## Density

Caller `teleds` vault block plus the `uleftvault` callee (gold/irate + `gd_move` dispatch). One C family. ~60 JS lines. Related deferral (hostile `gd_move`) named in that envelope, not a second hypothesis. Not “finish vault.c.”

## Verification

Journal: private canary **23**/23 (leave+gold hostile + irate + urooms0 origin vault + uentered dest; no-gold peaceful; stay-in-vault skip; no occupancy skip; adjacent dest skip; hidden_gold; in_fcorridor hostile still on map; dead/!isgd no-op); green+strict seed8000/0900; cohort **24**/24 including 0012 vault + 0367 Pri ^T temple (D-0639) + 0004 scroll + 0009 swim + 0360/0373/4500/2200 + strict 0012/0367/0004/0360/4500/2200/0030/0009/0002. Path **public-unhit** on gold vault teleport; 0012 escort stays peaceful (no gold leave). This audit’s full `sessions` (cadence **#1450**) **44**/44 Scr **11405**/11405 RNG **792838**/792838 — no regression, D-0639 temple still green.

C read of `teleport.c:448–572`, `vault.c:192–277`, `:888–928`; JS `teleport.js:1204–1208`, `:1332–1344`, `vault.js:48–77`, `:314–365`, `:431–436`, `:702–722`. Hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| origin vault + live gd + dest not vault + gold + not adjacent | fake, irate, `mpeaceful=0`, `gd_move` | **irate + mpeaceful**; **`gd_move` no-op** |
| no gold | skip `uleftvault` body | **same** (peaceful) |
| dest still vault | skip `uleftvault` | **same** |
| no `vault_occupied` origin | `vault_guard==0` | **same** |
| adjacent dest | `um_dist` false | **same** |
| dest in fakecorr | skip extra `gd_move` | **same** |
| restore `u.urooms` | before `spoteffects` | **same** (D-0639) |
| `invocation_message` | after `spoteffects` | **named skip** |

## Actionable C-wrongs

None that Must-fix this next iter. The Open fake/restore + irate/`mpeaceful=0` match `teleport.c:557–566` / `vault.c:265–271`. Hostile `gd_move` is named map debt, not a silent stub of `uleftvault`.

Named omits / do-nots (map / Open, not Must-fix):

1. Hostile `gd_move` after `mpeaceful=0`: `rloc(RLOC_MSG)` / `wallify_vault` / `clear_fcorr` / `gd_letknow` (`vault.c:915–928`). JS early-returns. Map, not this Must-fix.
2. `findgd` migrating_mons park-at-`<0,0>` + `!mx` heal (`vault.c:216–231`).
3. Next Open: `teleport.c` `teleds` `invocation_message` (`teleport.c:569`). Not vault_guard.
4. `notice_mon_off` / `notice_mon_on` / `notice_all_mons`.
5. Do not leave dest `u.urooms` across `spoteffects`. Do not `setmangry`. Do not restore the vault_guard skip. Do not pull invocation into a vault peel.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- Score: **7 / 10**
- One sentence: `teleds` now captures a live vault guard at the origin, fakes dest VAULT occupancy, runs real `uleftvault` gold/irate/`mpeaceful=0`, and restores `u.urooms` before `spoteffects`, while the extra hostile `gd_move` (rloc/letknow/wallify) stays a named no-op.
- Must-fix stays empty for this SHA; next port pops Open `teleds` `invocation_message`. Not vault_guard.
