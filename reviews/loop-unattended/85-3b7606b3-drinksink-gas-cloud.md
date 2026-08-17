# Review 85 — 3b7606b3 — drinksink case 13 `create_gas_cloud` (D-1124)

## Metadata
- Full / short hash: `3b7606b33c946297fb6eca05d5f0ecbfd3cc0001` / `3b7606b3`
- Parent: `a55c4b24` (D-1123). This file audits **this SHA only**. The fix stamped **Addressed:** D-1124 without the short hash; this review commit fills `3b7606b3`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 01:44:02 +0200
- D-id: **D-1124**
- Stats: 10 files, +105 / −42 — `js/fountain.js` +16 / −8 (case 13 call + import).
- Claims to close: Open queue `fountain.c` `drinksink` case 13 `create_gas_cloud` (named). Not polyself. Review **79** named omit 3 / D-1123 next-port. `reviews/loop-2026-08-15/` has no open drinksink-gas Must-fix.
- JS / map: `fountain.js` `drinksink`; `region.js` `create_gas_cloud` / `make_gas_cloud` (untouched this SHA). `c-js-map/data.md` fountain + region. Hallucination `hcolor`, enveloped pline, `inside_gas_cloud` dam>0, `m_poisongas_ok` inside_cloud gate still named.
- Prior reviews this SHA claims to close: **79** named omit case 13 `create_gas_cloud`.

## Intent vs deliverable

Git subject promises: “Match C fountain.c drinksink so a stench quaff creates a size-1 poison gas cloud instead of stopping at the pline.”

Old JS case 13 printed `Ew, what a stench!` and commented `// create_gas_cloud(ux,uy,1,4) deferred`. C `fountain.c:696–698` always calls `create_gas_cloud(u.ux, u.uy, 1, 4)` after that pline. Size 1: BFS expand loop hits `newidx >= cloudsize` immediately (no Fisher–Yates `rn2`, no `rn2(2)` disrupt); then `ttl = rn1(3, 4)` scaled by `cloudsize/newidx` (=1).

The diff **does** import and call existing `js/region.js` `create_gas_cloud`. It does **not** port `make_gas_cloud` enveloped `"noxious gas"` / `set_heros_fault`, `inside_gas_cloud` dam>0, or Hallucination `hcolor` on other drinksink strings. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `drinksink` case 13 | C body, **rewritten** | `fountain.c:696–698`; was pline-only |
| `create_gas_cloud` | C callee, **imported** | `region.js:342–411`; real BFS + ttl |
| `make_gas_cloud` | C callee, **imported** | `region.js:164–204`; pushes `game.regions` |
| `rn1(3, 4)` | C RNG, **imported** | ttl; size-1 skips expand `rn2` |
| `INSIDE_GAS_CLOUD` | C callback id, **imported** | `inside_f` set; `run_regions` walks it |
| `inside_gas_cloud` dam>0 | C body, **named omit** | `region.js:148–157` returns false when `arg>=1` |
| enveloped pline / `set_heros_fault` | C body, **named omit** | `region.c:1187–1204` / `:1197–1203` |
| `m_poisongas_ok` inside_cloud gate | C predicate, **named omit** | `region.c:1233–1236`; JS only `!damage` |
| Hallucination `hcolor` | C callee, **named omit** | other drinksink messages |
| `dowatersnakes` `rndmonnam` | C arm, **named omit** | live Open; not this switch |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. `u.ux`/`u.uy` are the live hero cell. Rule #2 clean. Frozen contracts untouched.

**New RNG on this path:** after `drinksink`’s `rn2(20)` hits 13, **only** `rn1(3, 4)` for ttl (then integer scale 1/1). C size-1 skips the 4× `rn2(i)` shuffle and the `nvalid==4 && !rn2(2)` disrupt. JS `create_gas_cloud` `358–359`: `if (newidx >= cloudsize) break` before building `dirs`. Match call-for-call.

## Constitution / playbook

Grep of the `js/fountain.js` hunk: no trace-index gates. Contest Rule #2: `create_gas_cloud` is in-process ESM, not `fs`. The call is sync (C is sync); no extra `nhgetch`. Do not hardcode ttl 4/5/6. Do not pull `dowatersnakes` `rndmonnam` into this SHA.

## C ↔ JS fidelity

### drinksink case 13

C `fountain.c:604` `switch (rn2(20))` then `:696–698`:

```
case 13:
    pline("Ew, what a stench!");
    create_gas_cloud(u.ux, u.uy, 1, 4);
    break;
```

JS `355–362` still `switch (rn2(20))`. Case 13 `472–479`: same pline, then `create_gas_cloud(u.ux, u.uy, 1, 4)` (not awaited — callee is sync). Match. Levitation still returns before the switch (`fountain.c:600–603` / JS `356–359`). Case 10 `polyself` (D-1118) untouched.

### Callers of `drinksink`

C `potion.c` `#quaff` / dodrink on SINK: yn then `drinksink()`. JS `potion.js:992` `await drinksink()` after that yn (D-0434). No other C caller. Guard: C `if (Levitation) { floating_above("sink"); return; }` then `rn2(20)`. JS same. Fate 13 is one arm of that lottery; this SHA does not change `rn2(20)` or cases 0–12 / 19 / default. `create_gas_cloud` is also used from Hezrou / fog / steam with other sizes; those paths already called the same function. Size 1 from the sink is the new fountain caller.

### `create_gas_cloud` size-1

C `region.c:1213–1308`: seed `(x,y)` as index 0; `newidx=1`; loop `curridx < newidx` **breaks at once** when `newidx >= cloudsize` (1); `create_region`; one rect; `ttl = rn1(3,4)`; `ttl = (ttl * cloudsize) / newidx`; `make_gas_cloud`.

JS `342–411`: same arrays, same immediate break, same `rn1(3,4)`, `Math.trunc((ttl * cloudsize) / newidx)` ≡ C integer division. One rect at the hero. Match. Cloudsize 1 never enters the shuffle loop — D-log “size-1: no expand RNG” is true of the **code**, not a comment-only claim.

`rn1(3,4)` is `rng.js` `rn2(3)+4` → ttl 4, 5, or 6, then ×1/1. C `region.c:1303–1305` same. A second overlapping stench would push a second `NhRegion` (C allows overlap; JS `game.regions` is a list). `run_regions` ages every gas `ttl` and, at 0, removes when `arg < 5` (this cloud is 4). Vision: C `add_region` `block_point` per cell; JS `recalc_block_point` on the first rect. Named glyph stand-in (`'S_poisoncloud'` string vs cmap glyph) is the existing mfndpos poisoncloud tag, not a new fountain fake.

### `make_gas_cloud` is not a stub

C `region.c:1182–1204`: `set_heros_fault` (named skip); `inside_f = INSIDE_GAS_CLOUD`; `expire_f = EXPIRE_GAS_CLOUD`; `arg = damage`; visible glyph poison vs steam; `add_region`; maybe enveloped pline.

JS `164–204`: sets `inside_f`, `arg = 4`, `glyph = 'S_poisoncloud'` when damage, `visible`, `NO_CALLBACK` enter/leave (D-1119), `set_hero_inside` if `inside_region` (hero is on the single cell), **`game.regions.push(cloud)`**, `m_at` scan into `reg.monsters`, `recalc_block_point`. Enveloped pline / `set_heros_fault` named. `expire_f` is tagged `INSIDE_GAS_CLOUD` rather than a distinct expire id; `run_regions` inlines C’s expire (`arg>=5` thicken else `remove_region`) and does **not** dispatch `expire_f`. Damage 4 < 5 → remove when ttl hits 0, same as C expire for this cloud.

Say it explicitly: this is **not** “Match C dispatch, callee is a stub.” Case 13 calls `create_gas_cloud`. That function allocates a region, burns `rn1(3,4)`, and registers it. `inside_gas_cloud` **damage** is a **different** function that still returns false when `arg >= 1` (`region.js:154–156`). Named on region.js and in this D-log. Do not read “creates a poison gas cloud” as “the cloud deals 4 HP via `inside_f`.”

### inside_cloud message gate

C `region.c:1231–1236`: if hero-made size-1 at `u_at` and (`!damage` **or** `m_poisongas_ok == M_POISONGAS_OK`), force `inside_cloud` so `make_gas_cloud` skips enveloped. Damage 4: only Breathless / Underwater / `uinvulnerable` / eel-in-pool return OK; Poison_resistance is MINOR, so a normal hero **would** get `"You are enveloped in a cloud of noxious gas!"` after `add_region`. JS only forces `inside_cloud` when `!damage` (`352–354`) and then **ignores** `_inside_cloud` because the pline is deferred. A poison-vulnerable tourist therefore misses C’s enveloped line. Named omit, not a Must-fix of the Open “create the cloud” line.

`run_regions` still ages `ttl` and calls `inside_gas_cloud` (fog TTL refresh; dam>0 no-op). The region exists and expires.

C `m_poisongas_ok` (`mon.c` ~330–357): eel-in-pool / poison-gas breath / (hero) `uinvulnerable` / Breathless / Underwater → `M_POISONGAS_OK`; Poison_resistance → `MINOR`; else `BAD`. Size-1 + damage 4 uses **OK only** to suppress enveloped, so a ring of poison resistance still hears C’s noxious-gas line. JS never prints it. `inside_gas_cloud` dam>0 would then apply HP; JS returns false. Two named region.js tails, not a fountain lottery miss: `rn2(20)` then `rn1(3,4)` still match C’s case-13 stream.

## Hallucinations / overclaim

D-log / CURRENT / subject say a stench quaff creates a size-1 poison gas cloud instead of stopping at the pline. That is the hunk: the call, size-1 skip of expand RNG, ttl `rn1(3,4)`, `arg=4`, `S_poisoncloud`. They name enveloped / `inside_f` / `hcolor`. Stamping **Addressed:** D-1124 is fair for the Open case-13 line. Fill hash `3b7606b3` in this commit. Do **not** stamp it as a close of gas damage or Hallucination synonyms.

## Density

One `switch` arm that was the named Open row. ~16 JS lines. Same shape as D-1121’s one call: queue-sized, not a wasted FAIL peel, not “finish `region.c`.” `dowatersnakes` `rndmonnam` left for the next Open row.

## Verification

Journal: private canary **29**/29 (source call; Levitation skip; fate 13 1-rect `arg=4` ttl 4/5/6; size-1 RNG `rn2(20)` then `rn1` only; fate 0 no cloud; overlap two regions; live ux/uy; case 10/11 unchanged); green+strict seed8000/0900; cohort **20**/20 including 0014 fountain + 0002 drinksink + 0108 + 0360/2200/4500; path **public-unhit** on fate 13. Cadence fortress is not a stench-cloud proof. This audit’s full `sessions` (cadence **#1430**) **44**/44 Scr **11405**/11405 RNG **792838**/792838 — no regression (extra `rn1` only on unhit fate 13).

C read of `fountain.c:595–711`, `region.c:1182–1308`; JS `fountain.js:355–479`, `region.js:148–411`. Hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| `rn2(20)==13` | stench + cloud size 1 dmg 4 | **same call** |
| size-1 expand | no shuffle `rn2` | **same** |
| ttl | `rn1(3,4)` then ×1/1 | **same** |
| region list | `add_region` | **`game.regions.push`** |
| enveloped pline (normal hero) | yes after add | **named skip** |
| `inside_f` HP | gas callback damage | **named no-op** (`arg>=1`) |
| Levitation | no drinksink | **same** |
| case 10 | `polyself` D-1118 | **untouched** |

## Actionable C-wrongs

None that Must-fix this next iter. Case 13 matches `fountain.c:696–698`; size-1 RNG matches `region.c:1243–1305`.

Named omits / do-nots (map / Open, not Must-fix):

1. `make_gas_cloud` enveloped `"noxious gas"` / `iflags.last_msg` / `set_heros_fault` (`region.c:1187–1204`).
2. `inside_gas_cloud` dam>0 hero/mon HP (`region.c` inside callback). JS still returns false when `arg>=1`.
3. `m_poisongas_ok` size-1 `inside_cloud` gate (`region.c:1233–1236`).
4. Hallucination `hcolor` on drinksink sip strings.
5. `dowatersnakes` Hallucination `rndmonnam` — live Open, not gush, not this case.
6. Do not restore the case-13 comment skip. Do not await a sync `create_gas_cloud`. Do not burn expand `rn2` on size 1. Do not pull `inside_f` damage into a fountain peel.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: drinksink fate 13 now registers a size-1 poison cloud (`arg=4`, ttl `rn1(3,4)`, no expand shuffle) instead of stopping after the stench pline, while enveloped text and `inside_f` damage stay named on `region.js`.
- Must-fix stays empty for this SHA; next port pops Open `fountain.c` `dowatersnakes` Hallucination `rndmonnam`. Not gush.
