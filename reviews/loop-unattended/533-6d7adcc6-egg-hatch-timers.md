# Review 533 — 6d7adcc6 — timeout.c attach_egg_hatch_timeout / obj_split_timers (D-1572)

## Metadata
- Full / short hash: `6d7adcc6fafb65d0d1d1810e0bcf108432ee598d` / `6d7adcc6`
- Parent: `9772b028` (D-1571). This file audits **this SHA only** (sixth of nine `js/` commits since review **527**). Archive **Addressed:** D-1572 `6d7adcc6`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-28 08:15:05 +0200
- D-id: **D-1572**
- Stats: `js/mkobj.js` +24 / −1, `js/zap.js` +25 / −3, `js/timeout.js` +11 / −8. Band 150–350 (js/ insertions **60**).
- Claims to close: Open hatch timeout after D-0533/D-1036. Not Plan-B. `reviews/loop-2026-08-15/` D-1036 is hatch body (already live); this is split/poly leftover, not that Must-fix unpaid.
- JS / map: `obj_split_timers` / splitobj / `poly_obj` egg / `hatch_egg`; `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **532** named attach hatch.

## Intent vs deliverable

Git subject promises: `splitobj` copies object timers and `poly_obj` re-arms hero-laid eggs (`obj_split_timers` + `set_corpsenm`) instead of dropping the child hatch and skipping the egg re-roll.

Pinned C `timeout.c` `attach_egg_hatch_timeout` `:980–1005` (already JS-live D-0533). `obj_split_timers` `:2358–2370`. `splitobj` `:498–499`. `poly_obj` `:1756–1779`. `hatch_egg` remainder `:1172` `rnd(12)` (already JS); MINVENT `is_pool(mon)` `:1147`; `learn_egg_type` `:1192–1199`; default `impossible` `:1160`. `random_monster(rn2)` is `display.h:186` `(*rng)(NUMMONS)`.

```2358:2369:nethack-c/upstream/src/timeout.c
void
obj_split_timers(struct obj *src, struct obj *dest)
{
    for (curr = gt.timer_base; curr; curr = next_timer) {
        next_timer = curr->next;
        if (curr->kind == TIMER_OBJECT && curr->arg.a_obj == src) {
            (void) start_timer(curr->timeout - svm.moves, TIMER_OBJECT,
                               curr->func_index, obj_to_any(dest));
        }
    }
}
```

```1756:1778:nethack-c/upstream/src/zap.c
    if (obj->otyp == EGG && obj->spe) {
        ...
        while (tryct--) {
            mnum = can_be_hatched(random_monster(rn2));
            if (mnum != NON_PM && !dead_species(mnum, TRUE)) {
                otmp->spe = 1;
                set_corpsenm(otmp, mnum);
                break;
            }
        }
    }
```

Old JS: attach/kill/`set_corpsenm` live; splitobj skipped timers; poly skipped hero eggs; hatch `is_pool(carrier)`.

The diff **does** `obj_split_timers` + splitobj `if (obj.timed)`, poly egg arm before charged_objs, hatchling `is_pool(mon)`, `learn_egg_type` → `update_inventory`, `impossible` default. It **does not** port SetVoice, migrating `#if 0`, `copy_oextra`, `obj_split_light_source`. Named. `attach` body unchanged (D-0533).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `obj_split_timers` | C `:2358–2370`, **LIVE this SHA** | in mkobj.js beside `start_timer` |
| `splitobj` timed | C `:498–499`, **LIVE** | dest.timed starts 0; start_timer bumps |
| `poly_obj` hero-egg | C `:1756–1779`, **LIVE** | `rn2(NUMMONS)` ≡ `random_monster(rn2)` |
| `kill_egg` / `set_corpsenm` / `can_be_hatched` | **LIVE** | |
| `attach_egg_hatch_timeout` | **LIVE unchanged** | D-0533 |
| leftover `rnd(12)` | **LIVE unchanged** | hatch_egg already |
| `learn_egg_type` `update_inventory` | C `:1199`, **LIVE this SHA** | |
| MINVENT `is_pool(mon)` | C `:1147`, **LIVE** | was carrier |
| SetVoice / migrating / light split / `copy_oextra` | **OMIT named** | |

`node scripts/csym.mjs obj_split_timers` → `:2358-2370`. `--callers`: mkobj `:499`. `attach_egg_hatch_timeout` `:980-1005` (apply/mkobj/timeout leftover/zap). `random_monster` → `display.h:186`.

RNG: poly `rn2(NUMMONS)` up to 100 times; leftover `rnd(12)` pre-existing; attach `when==0` `rnd(i)` pre-existing. Split copies remaining ticks — **no extra** `rnd`.

`node scripts/sym.mjs` on new / re-pointed names:

```
obj_split_timers         js/mkobj.js:995   sync
attach_egg_hatch_timeout js/mkobj.js:1054  sync
kill_egg                 js/mkobj.js:1072  sync
set_corpsenm             js/mkobj.js:1274  sync
can_be_hatched           js/mon.js:531     sync
learn_egg_type           js/timeout.js:1114 sync
```

`node scripts/imports.mjs --can zap.js mkobj.js kill_egg`: ALREADY. timeout→invent `update_inventory`: ALREADY. `obj_split_timers` is a mkobj local export; splitobj calls it in-file — no new timeout edge, no TDZ.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

Split. Save `next` because `start_timer` inserts; `timeout - moves`; `TIMER_OBJECT` + same action; dest.timed 0 then ++. Copies **every** object timer (hatch and figurine), not only HATCH_EGG. **Match `:2358–2369` + `:498–499`.**

Poly. `obj.otyp==EGG && obj.spe`; kill_egg if still egg else force EGG+weight; corpsenm NON_PM; spe 0; tryct 100; `can_be_hatched(rn2(NUMMONS))`; `!dead_species`; spe 1; `set_corpsenm` (re-arms). **Match `:1756–1778`.** Before charged_objs so spe is rewritten then wand/weapon copy can overwrite — C order same; eggs are not charged_objs. **Match.**

Hatch. MINVENT water uses hatchling `mon`, not carrier. **Match `:1147`.** `learn_egg_type` flag then `update_inventory`. **Match `:1192–1199`.** default `impossible`. **Match `:1160`.** leftover `rnd(12)` already. **Match `:1172`.**

Callee closure (split + poly egg). LIVE: `start_timer`, `kill_egg`, `set_corpsenm`, `can_be_hatched`, `dead_species`, `weight`, `rn2`. OMIT named: light split, `copy_oextra`. STUB: **none**. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject split copy + poly re-arm: **true**. D-log “attach was live (D-0533) but still named”: **true** — this SHA does **not** rewrite attach’s `rnd(i)>150` loop. Do **not** stamp “Match C SetVoice.” Do **not** stamp “Match C `obj_split_light_source`.” Do **not** stamp “Match C `random_monster` as a JS export” — it is `rn2(NUMMONS)`. This is **not** “dispatch ported, callee stubbed.”

## Density

One timeout family: split copy + poly egg + hatch pool/learn/impossible. +60 JS. Did not glue `newcham`. §2b OK.

## Branch-by-branch confirm

1. Split egg with hatch: child gets remaining ticks. **Match.**
2. Split untimed: no copy. **Match.**
3. Poly hero egg → new hatched species + timer. **Match.**
4. Poly hero egg, 100 misses: generic egg spe 0. **Match.**
5. Hatch MINVENT, hatchling in pool: “empty water.” **Match.**
6. learn: `update_inventory`. **Match.**
7. unknown `where`: `impossible`. **Match.**
8. leftover quan: `rnd(12)`. **Match (pre-existing).**

## Callers / RNG ledger

C splitobj is the only `obj_split_timers` caller. Poly `rn2(NUMMONS)` × tryct. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. Timer helper lives next to `start_timer` (C timeout.c / JS mkobj.js timer home).

## Verification

D-log canary **22**/22 (locus; when=12 / when=0 rnd; split copy; kill_egg; poly hero-egg; learn flag; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict. Hero-egg poly / split-hatch remain **public-unhit**.

## Actionable C-wrongs

None for Must-fix. Named: SetVoice; migrating `#if 0`; `copy_oextra`; `obj_split_light_source`; `obj_move_timers`; splitbill. `newcham` cancel was the next Open at the time.

Verdict: **ACCEPT-WITH-DEBT**
