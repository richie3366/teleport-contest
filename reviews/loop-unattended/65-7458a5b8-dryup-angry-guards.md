# Review 65 — 7458a5b8 — `dryup` `angry_guards` after real dryup (D-1104)

## Metadata
- Full / short hash: `7458a5b86f8258b8a00fe88df07aecb10f6f93fb` / `7458a5b8`
- Parent: `130e7e21` (D-1103). This file audits **this SHA only**. This review commit fills D-1104 archive hash `7458a5b8` (chicken-egg on the fix SHA).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 20:26:00 +0200
- D-id: **D-1104**
- Stats: 13 files, +113 / −55 — `js/fountain.js` +24 / −11 (import + one `if` after `newsym`).
- Claims to close: Open queue `fountain.c` `dryup` `angry_guards` after real dryup (named). Not wizard yn. Stamped **Addressed:** D-1104 on the archive row **without** the short hash; this review fills `7458a5b8`. Filled D-1103 hash `130e7e21`. Review **57** named omit 1. `reviews/loop-2026-08-15/` has no open dryup-guards Must-fix.
- JS / map: `fountain.js` `dryup`. `c-js-map/data.md` fountain row. Deaf shake/wave and cloud-glyph skip still named (live Open).
- Prior reviews this SHA claims to close: **57** item 1 (`angry_guards` after yn).

## Intent vs deliverable

Git subject promises: “Match C fountain.c so dryup angers town watchmen after a real dry.” Body: peaceful guards stay peaceful on the town-warn return and wizard `n`, then `angry_guards(FALSE)` runs after ROOM/`newsym` when `isyou && in_town`.

Old JS `dryup` warned on first town use (D-0894), asked wizard `y_n` (D-1096), replaced the fountain, `newsym`’d, and left a comment where C calls `angry_guards(FALSE)`. Peaceful watchmen stayed peaceful after a real town dry. C `fountain.c:236–237` angers them only on that successful path.

The diff **does** that call: `import { angry_guards } from './mon.js'`; after `newsym`:

```
if (isyou && in_town(x, y)) {
    await angry_guards(false);
}
```

It does **not** port Deaf shake/wave in `watchman_warn_fountain`. Named, already Open. It does **not** skip the dryup pline when the glyph is `S_cloud`. Named. It does **not** pull Excalibur `dipfountain` `angry_guards` (`fountain.c:446`). Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `dryup` angry call | C body, **retouched** | `fountain.c:236–237` after ROOM/`newsym` |
| `angry_guards` | C callee, **imported** | `mon.js:905–951`; real D-0941 port of `mon.c:5711–5759` |
| `in_town` | C callee, **imported** | `hack.js:1325–1340`; pre-existing |
| `watchman_warn_fountain` | C, **untouched** | Deaf shake/wave still named |
| cloud-glyph skip | C `glyph_to_cmap != S_cloud` | named omit |
| `set_levltyp` | C, **pre-existing analog** | JS `loc.typ = ROOM` + `nfountains--` |
| dipfountain Excalibur `angry_guards` | C `fountain.c:446` | named, not this peel |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched. **No new RNG** (`angry_guards` does not call `rn2`; town `rn2(3)` is the pre-existing outer gate).

## Constitution / playbook

Grep of the `js/fountain.js` hunk: no trace-index gates, no recorded coordinates. `angry_guards(false)` is C’s `FALSE` (not silent), not a seed-shaped skip. Contest Rule #2: no Node builtins. One await at `nhgetch` still owns input; `angry_guards` only `pline`s.

## C ↔ JS fidelity

### Order — warn return, wizard abort, then dry, then angry

C `fountain.c:201–238`:

```
if (IS_FOUNTAIN(typ) && (!rn2(3) || FOUNTAIN_IS_WARNED(x, y))) {
    if (isyou && in_town(x, y) && !FOUNTAIN_IS_WARNED(x, y)) {
        SET_FOUNTAIN_WARNED(x, y);
        mtmp = get_iter_mons(watchman_warn_fountain);
        if (!mtmp) pline_The("flow reduces to a trickle.");
        return;
    }
    if (isyou && wizard) {
        if (y_n("Dry up fountain?") == 'n')
            return;
    }
    if (cansee(x, y)) { … maybe pline … }
    set_levltyp(x, y, ROOM);
    levl[x][y].flags = 0;
    levl[x][y].blessedftn = 0;
    newsym(x, y);
    if (isyou && in_town(x, y))
        (void) angry_guards(FALSE);
}
```

JS `647–682`: same envelope. Town first-use **returns before** the new call. Wizard `'n'` **returns before** it. `!isyou` (minliquid D-1095) never takes the `if`. Wizard `'y'` in town dries **and** angers — that is the case review **57** table marked “dry only (named)” and this SHA closes.

`cansee` still always `pline('The fountain dries up!')` with no `S_cloud` skip. Named. `loc.typ = ROOM` / flags / blessedftn / `nfountains--` / `newsym` unchanged. The new `if` sits after `newsym`, not before ROOM and not on the warn return. Match for the claimed slot.

Outer gate unchanged: `!(!rn2(3) || FOUNTAIN_IS_WARNED)` then proceed. A non-warned out-of-town fountain still burns `rn2(3)` before any angry. In-town first use sets WARNED and returns **without** angry (guards stay peaceful). Second use (warned) can dry and angry. C same.

### Callee `angry_guards` is not a stub

C `mon.c:5711–5759`: walk `fmon`, skip `DEADMONSTER`, `is_watch && mpeaceful` → count, `canspotmon && mcanmove` → `m_next2u` adjacent vs approaching, wake sleepers/frozen, `mpeaceful = 0`. If `ct` and `!silent`: wake / get angry / approaching / `You_hear` whistle.

JS `905–951`: same counters, `m_next2u_angry` ≡ `you.h` `m_next2u` squared dist ≤ 2 (`mon.js:892–897` and `1669–1673` are the same formula). `is_watch` imported from `monsters.js`. `silent === false` from this SHA matches C `FALSE`. Return value discarded (`(void)` in C; JS `await` without using the boolean). Match for the dryup call.

Deaf whistle: C `You_hear`. JS local `HDeaf|EDeaf|uroleplay.deaf|u.Deaf` then skip the whistle `pline`. confer-uprops `DEAF` without those flats is a **pre-existing** `angry_guards` analog (D-0941), not a dryup invention. Wake / get angry / approaching are `pline_The` in C (not `You_hear`) and still fire when Deaf. JS same. Not Must-fix of this SHA.

`fmon` as a JS array vs C linked `nmon` is the established monster list. Watchmen already on `fmon` from town generation. No new iteration order invented here.

`in_town` (`hack.js:1325–1340`) is the pre-existing helper `dryup` already used for the warn arm. The angry `if` uses the same predicate C uses at both sites (`fountain.c:205` and `:236`). Match.

### What does **not** angry

| Path | Angry? |
|------|--------|
| first town use (warn + return) | no — C `return` before `:236` |
| wizard `'n'` / space-def | no — abort before ROOM |
| `!isyou` minliquid dry | no — `isyou &&` |
| `!in_town` | no |
| no watch / already hostile / dead | `angry_guards` returns false; no pline |
| wizard `'y'` in town after warned | **yes** — this SHA |

Excalibur `dipfountain` still has its own `angry_guards(FALSE)` at C `fountain.c:446`. JS dipfountain does not gain that call. Named (Open Excalibur body). Do not treat this SHA as a close of that site.

## Hallucinations / overclaim

“Match C so dryup angers town watchmen after a real dry” is **true for the post-`newsym` `isyou && in_town` call, the warn-return skip, the wizard `'n'` skip, `!isyou` skip, and the imported D-0941 callee.** It is **not** true that Deaf shake/wave ran, that cloud glyphs suppress the dryup pline, that `set_levltyp` side effects beyond typ/flags/nfountains ran, or that Excalibur dip angers.

This is **not** “Match C dispatch, callee is a stub.” `angry_guards` is the real `mon.c` function (wake/hostile/pline). Stamping **Addressed:** D-1104 is fair for the Open line. Fill hash `7458a5b8` in this commit.

## Density (§2b)

One Open cluster: the call C writes after the real dry. ~8 executable lines. Playbook “one deferred `if`” is the **too-small** column. Review **57** already noted that pairing yn + angry in one peel would have been denser; the queue forbade pulling angry into D-1096, so this SHA is the leftover conjunct. The callee already existed. Density smell, not a shipped C-wrong of the call. Do not Must-fix Deaf shake onto this SHA — it is the live Open fountain row.

## Verification

Journal: private canary **37**/37 (isyou+town angers; `!isyou` / `!town` / first-use / wizard `'n'`/space-def no angry; wizard `'y'` angers; sleeper/frozen/captain/jackal/dead/hostile/no-watch); green+strict seed8000/0900; cohort **15**/15 (0014 fountain + 0006/2200/0108/0360/5002 wizard + 1500/1800/0060/0102/0700/0017/4500/0009/0106) + strict 0014/0006/2200/0360/4500/0009. Path **public-unhit** (public seats do not dry a warned town fountain). Cadence **#1405** (this audit) **44**/44 Scr **11405**/11405 RNG **100%** — fortress, not a town-dry proof.

C read of `fountain.c:201–238` / `446`, `mon.c:5711–5759`; JS `fountain.js:129–141` / `647–682`, `mon.js:892–951`, `hack.js:1325–1340`; hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| isyou + town + warned + dry | `angry_guards(FALSE)` | **same** |
| first town use | warn, return, peaceful | **same** |
| wizard `'n'` | abort, peaceful | **same** |
| wizard `'y'` in town | dry + angry | **same** (was dry only) |
| `!isyou` minliquid | dry, no angry | **same** |
| `!in_town` | dry, no angry | **same** |
| cloud glyph + cansee | maybe no pline | **still pline** (named) |
| Deaf watchman warn | shake/wave | **yell skip only** (named) |

## Actionable C-wrongs

None that Must-fix this next iter. The call sits where `fountain.c` puts it and the callee is real.

Named omits / do-nots (map / Open, not Must-fix):

1. `fountain.c` `watchman_warn_fountain` Deaf shake/wave (named). Live Open. Not dryup yn.
2. `dryup` cansee cloud-glyph skip of the dryup pline (`fountain.c:223–227`). Live Open.
3. `dipfountain` Excalibur `LONG_SWORD` body / that site’s `angry_guards` (`fountain.c:446`). Live Open. `wash_hands` / `dipsink` still named.

Do not skip `angry_guards` after a real town dry. Do not angry on the warn return or wizard `'n'`. Do not angry when `!isyou`. Do not restore the commented-out call. Do not pull Deaf shake into this SHA’s subject.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: town `dryup` now calls real `angry_guards(FALSE)` after ROOM/`newsym` when the hero actually dries the fountain, while first-use warn and wizard `'n'` still leave watchmen peaceful and Deaf shake stays the live Open row.
- Must-fix stays empty for this SHA; next port pops Open `watchman_warn_fountain` Deaf shake/wave.
