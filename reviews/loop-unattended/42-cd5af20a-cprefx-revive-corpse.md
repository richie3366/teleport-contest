# Review 42 — cd5af20a — `cprefx` rider `revive_corpse` after lifesave (D-1081)

## Metadata
- Full / short hash: `cd5af20ac9ad66a0547902257a41fb46882769e0` / `cd5af20a`
- Parent: `f284655b` (review **39–41**). JS-touching since last `reviews/loop-unattended/` file: **this SHA**, D-1082, D-1083, D-1084. This file audits **this SHA only**.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 14:16:27 +0200
- D-id: **D-1081**
- Stats: 13 files, +174 / −95 — `js/do.js` +66 (`revive_corpse` moved from apply); `js/eat.js` +23 / −8 (`cprefx` rider arm); `js/apply.js` −35 (local helper deleted, import from `do.js`). Live JS is that move plus the `cprefx` call, not a new module.
- Claims to close: Open queue `eat.c` `cprefx` `revive_corpse` after rider lifesave (`debt.md`). Review **41** next-port line. Stamped **Addressed:** D-1081 `cd5af20a` on the archive row (filled by D-1082). `reviews/loop-2026-08-15/` has no open rider-revive Must-fix.
- JS / map: `eat.js` `cprefx`; `do.js` `revive_corpse`; apply tinning re-imports. `c-js-map/debt.md` names D-1081; MINVENT/CONTAINED/BURIED and Adjmonnam still named on `do.js`.
- Prior reviews this SHA claims to close: **41** “next port pops Open eat.c `cprefx`”. Review **39** forbade stealing this for a clone peel.

## Intent vs deliverable

Git subject promises: “Match C cprefx so a lifesaved rider meal revives the corpse.” Body: eating Death/Pestilence/Famine used to return after `done(DIED)`; C calls `revive_corpse` on the actual corpse (not a tin) and zeros victual.

The queue line was that remaining `cprefx` arm after D-0939’s rider `done(DIED)`, plus the C home of `revive_corpse` (`do.c`) so eat can call it without an apply↔eat cycle. Not MINVENT/CONTAINED/BURIED zombie-pit messages. Not Adjmonnam bite-covered. Not `polymon` stone-golem polish.

The diff **does** that envelope: after `done`+`exercise`, `piece && otyp==CORPSE && revive_corpse(piece)` then `victual = {}`. Helper lives in `do.js` (C `do.c:2111`). Floor Death/Pestilence/Famine suffixes use `data.mndx` because JS `mons()` allocates per call. Apply tinning still awaits the shared helper.

It does **not** port OBJ_MINVENT / OBJ_CONTAINED / OBJ_BURIED switch arms. Named. It does **not** use `Adjmonnam(mtmp, "bite-covered")` when `oeaten`. Named. It does **not** call C `get_obj_location` inside `revive_corpse` (coords captured from `ox/oy` before `revive`, which itself locates). Analog.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `eat.js` `cprefx` rider arm | C body, **retouched** | `eat.c:831–849` |
| `do.js` `revive_corpse` | C body, **moved + rider suffixes** | `do.c:2111–2246`; was apply-local |
| `zap.js` `revive` | C callee, **imported** | `zap.c:884+`; real body (`cant_revive` / `newcham`) |
| `cxname_singular` | C analog of `corpse_xname(..., CXN_SINGULAR)` | no “bite-covered” prefix |
| `zero_victual` | **clone** as `victual = {}` | same eat.js convention as `bite` / `done_eating` |
| `PM_DEATH` / `PESTILENCE` / `FAMINE` | **clone** of `mons[]` indices | `monsterNames.indexOf` |
| OBJ_MINVENT / CONTAINED / BURIED | C other arms, **named omit** | zombie pit / sack writhe |
| `Adjmonnam` | C floor `canseemon` polish, **named omit** | chewed rider |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched. Apply dropped unused `cxname_singular` import with the local helper.

## Constitution / playbook

Grep of the `js/eat.js` / `js/do.js` / `js/apply.js` hunks: no trace-index gates, no recorded coordinates, no `fastforward` burns. Rider names are `mons[]` indices, not a seed-shaped unique table. Contest Rule #2: no Node builtins. Dynamic import is not used here; `revive` is a static `zap.js` import.

## C ↔ JS fidelity

### `cprefx` rider — order, then revive, then zero; no RNG in this arm

C `eat.c:831–849`:

```
    case PM_DEATH:
    case PM_PESTILENCE:
    case PM_FAMINE: {
        pline("Eating that is instantly fatal.");
        Sprintf(svk.killer.name, "unwisely ate the body of %s",
                mons[pm].pmnames[NEUTRAL]);
        svk.killer.format = NO_KILLER_PREFIX;
        done(DIED);
        /* life-saving needed to reach here */
        exercise(A_WIS, FALSE);
        if (svc.context.victual.piece /* Null for tins */
            && svc.context.victual.piece->otyp == CORPSE
            && revive_corpse(svc.context.victual.piece))
            svc.context.victual = zero_victual;
        return;
    }
```

JS `eat.js:2665–2683`: same pline, killer, `done(DIED)`, `exercise(A_WIS, false)`, then `piece && otyp===CORPSE && await revive_corpse(piece)` then `victual = {}`. Tin path: `consume_tin` calls `cprefx(mnum)` with `context.tin.tin` set and `victual.piece` null — the conjunct skips. Match.

`eatfood` (`eat.js:1650–1654`) already aborts the meal if `!victual.piece || !victual.eating` after `cprefx`. Empty `{}` makes both falsy. C `zero_victual` zeros `piece` and `o_id`. Analog used everywhere else in `eat.js`. Do not invent a struct copy.

Call-for-call RNG in **this** arm: none. `done(DIED)` / `revive` may consume RNG on other paths (lifesave, `makemon`, bag-of-holding `rn2(40)`). Those are the callees, not this `if`.

### `revive_corpse` — invent / floor; rider suffix after `revive`

C `do.c:2123–2181`: save `where = corpse->where` **before** `revive` (corpse is gone if successful). `is_uwep = (corpse == uwep)`. `cname` from `corpse_xname` with `"bite-covered"` if `oeaten`. `get_obj_location(..., CONTAINED_TOO|BURIED_TOO)`. Then `mtmp = revive(corpse, FALSE)`. Invent: uwep “writhes out of your grasp” else backpack squirm. Floor: if `cansee || canseemon`, rider `effect` from `mtmp->data == &mons[PM_DEATH|PESTILENCE|FAMINE]`, then `canseemon` ? `Adjmonnam`/`Monnam` “rises from the dead%s!” : `The(cname) disappears%s!`.

JS `do.js:2329–2366`: `where` from `corpse.where` **or** `invent.includes` (zap.js `revive` already treats missing `where` as invent). `is_uwep` vs `game.u.uwep`. `cname = cxname_singular` — no bite-covered. `ox/oy` captured before `revive`. Invent strings match C `pline_The` / `You_feel` (hardcoded `"The "` vs C `pline_The` macro). Floor suffixes: `mndx = data.mndx ?? mnum` vs C pointer identity. JS `mons()` returns a new object each call, so `&mons[PM_DEATH]` cannot be `===`. After `cant_revive` unique→doppelganger, C `newcham(mtmp, mptr)` restores `mtmp->data` to the unique template; JS `zap.js:2365–2366` does the same. `data.mndx === PM_DEATH` is the C analog **if** `newcham` wrote that `permonst`. Pre-existing `revive` (D-0964), not a stub.

This is **not** “Match C dispatch, callee is a stub.” `revive` is `zap.c`. Apply tinning (`apply.js:2444`) still calls the real helper for rider tinning-kit.

### Unique rider → doppelganger → `newcham`

C `read.c:3126–3131` `cant_revive`: `unique_corpstat && (!from_obj || !has_omonst)` → `PM_DOPPELGANGER`. C `zap.c:982–994`: `makemon` doppelganger then `newcham(mtmp, mptr)` with `mptr` the **original** unique. Floor message then sees Death’s `data`. JS matches that sequence. A failed `newcham` would skip suffixes in **both**. Journal canary used `data.mndx` after that path — honest.

### Named location arms still return true

C MINVENT/CONTAINED/BURIED still emit; default `impossible`. JS falls off the invent/floor `if` and **returns true** anyway (comment: named omit). A minvent corpse that `revive` succeeds on is silent in JS and talkative in C. Pre-existing apply-local helper had the same invent/floor-only envelope. Moving it to `do.js` does not invent that omit. Keep named. Do not Must-fix a zombie-pit peel this next iter.

`inInvent` extra `includes` can reclassify a floor object that is also in the invent array. C uses `where` only. Same analog already in `zap.js` `revive`. For `cprefx`, `victual.piece` is the meal object (`OBJ_INVENT` or `OBJ_FLOOR`). Not a new C-wrong.

C `revive_corpse` also sets `chewed = (corpse->oeaten != 0)` and `montype` / `is_zomb` **before** `revive`. JS does not compute `is_zomb` here — buried zombie pit is the named BURIED arm. `oeaten` is unread, so Adjmonnam stays named. `get_obj_location` in C feeds `corpsex/y` even when invent (unused on that arm). JS invent path ignores coords. Floor eating: corpse `ox/oy` is the hero cell; `revive` also writes `ox/oy` when `x` is nonzero (`zap.c:940–941` / `zap.js:2317–2319`). Capturing before `revive` matches C’s pre-destroy snapshot for a floor meal.

Apply tinning (`apply.c` rider after petrify) already called the local helper; the move preserves `await revive_corpse(corpse)` then War verbalize. Tinning a rider corpse is a **different** caller of the same C function (`apply.c` `use_tinning_kit`). Not a stub. Cycle reason for the move is real (`eat.js` cannot import `apply.js`).

## Hallucinations / overclaim

“Match C cprefx so a lifesaved rider meal revives the corpse” is **true for the `cprefx` conjunct and for invent/floor `revive_corpse` plus rider suffixes.** `revive` is not a stub. Tin skip is C.

It is **not** true that MINVENT/CONTAINED/BURIED messages run, that chewed floor text uses `Adjmonnam`, or that `cxname_singular` is `corpse_xname(..., "bite-covered", CXN_SINGULAR)`.

Stamping **Addressed:** D-1081 `cd5af20a` is fair for the Open line. Hash is on the archive row (filled by `453e759c`).

## Density (§2b)

One Open cluster: C `eat.c` rider arm plus C `do.c` `revive_corpse` (the callee eat needed, moved off apply to break the cycle). Review **41** asked for this, not `can_reach_floor` ceiling. ~50 executable lines in `do.js` + ~8 in `cprefx`. Whole practical function family. Apply delete is the move, not a second hypothesis. MINVENT left named on purpose.

## Verification

Journal: private canary (tin-skip / norevive keep victual; lizard floor zeros; invent/uwep; Death/Pestilence/Famine `data.mndx` after unique→doppelganger `newcham`); green+strict seed8000/0900; cohort **14**/14 (incl. 1800 eat-throw, 0004 feeding, 0361, 4500, 0360, 2200) + strict on those. Path **public-unhit** except ordinary eating already D-0939. Cadence **#1380** (this audit) **44**/44 after this SHA and D-1082–D-1084.

C read of `eat.c:791–864`/`1514`/`1610`/`2041`, `do.c:2111–2246`, `zap.c:884–994`, `read.c:3112–3134`; JS `eat.js:2618–2683`/`1648–1654`, `do.js:2329–2366`, `zap.js:2160–2178`/`2260–2383`, `apply.js:2444–2452`; hunk grepped FORCE/fs/seed.

Private canary vs C (journal):

| Path | C | JS after |
|------|---|---------|
| tin rider `cprefx` | `victual.piece` null → skip revive | **skip** |
| corpse, `revive` fails | keep victual | **keep** |
| floor lizard (non-rider control) | zeros on success | **`{}`** |
| invent uwep | “writhes out of your grasp” | **same** |
| invent not uwep | backpack squirm | **same** |
| floor Death after `newcham` | spectral-skulls suffix | **`mndx`** |
| chewed `oeaten` + `canseemon` | `Adjmonnam` “bite-covered” | **`Monnam` only** (named) |

Public 1800/0004 exercise ordinary eat, not rider lifesave. Admit **public-unhit** for the new arm.

## Actionable C-wrongs

None that Must-fix this next iter. Do not steal `can_reach_floor` Flying / steal.c for a rider-message peel.

Named omits / do-nots (map / Open, not Must-fix):

1. OBJ_MINVENT / OBJ_CONTAINED / OBJ_BURIED `revive_corpse` arms (zombie pit / sack).
2. Floor `canseemon` `Adjmonnam(..., "bite-covered")` when `oeaten`.
3. `polymon` stone-golem failure polish in `cprefx` (still named on the eat row).

Do not restore `cprefx` return after `done(DIED)` without revive. Do not skip the CORPSE/`piece` tin conjunct. Do not put apply-local `revive_corpse` back (cycle). Do not put trailing `confdir` inside shared `getdir`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: after rider lifesave, `cprefx` now calls C-home `do.js` `revive_corpse` on a real CORPSE (tins skip) and zeros victual, with floor Death/Pestilence/Famine suffixes via `data.mndx` after `newcham`.
- Must-fix stays empty for this SHA; MINVENT/Adjmonnam stay named.
