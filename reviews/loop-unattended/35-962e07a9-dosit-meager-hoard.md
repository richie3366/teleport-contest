# Review 35 — 962e07a9 — `dosit` dragon `money_cnt` meager hoard (D-1074)

## Metadata
- Full / short hash: `962e07a94aae38f381193c3269fcb7d0710b1d8e` / `962e07a9`
- Parent: `1f21183f` (D-1073 ACCEPT this review iter; Must-fix empty; popped Open meager). JS-touching since last `reviews/loop-unattended/` file (`33-55906000-…`): `1f21183f` (review **34**) and **this SHA**.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 11:11:55 +0200
- D-id: **D-1074**
- Stats: 10 files, +115 / −46 — `js/sit.js` +33 / −19 (header + local `money_cnt` + dragon `You("%shoard")` prefix). Live JS is that one arm, not a new helper file.
- Claims to close: Open queue `sit.c` `dosit` dragon coin hoard: `money_cnt(invent)` meager vs `ulevel * 1000` (JS always bare “hoard”). Stamped **Addressed:** D-1074 on the archive row **without** the short hash (chicken-egg). This review commit fills `962e07a9`. Also fills D-1073’s archive hash (already `1f21183f` from this SHA).
- JS / map: `sit.js` `dosit` dragon `COIN_CLASS` arm. `c-js-map/data.md` names D-1074 and still omits `lay_an_egg` / `clone_mon` split_mon. Other JS `money_cnt` sum clones (end/shk/invent/fountain/monmove) left as-is.
- Prior reviews this SHA claims to close: **33** named omit said do **not** pull meager in the picnic iter (D-1073 honored that). This is the queued follow-up. `reviews/loop-2026-08-15/` has no open meager Must-fix. Review **34** ACCEPT left Must-fix empty.

## Intent vs deliverable

Git subject promises: “Match C dosit so a dragon sitting on gold prints a meager hoard when the pile plus wallet is under ulevel*1000.” Body is empty beyond Co-authored-by. D-log: JS dragon `#sit` on floor gold always printed `You coil up around your hoard.` C `sit.c` `dosit` prefixes `"meager "` when `obj->quan + money_cnt(gi.invent) < u.ulevel * 1000`. Equal-to-threshold is bare (`<`, not `<=`). `hack.c` `money_cnt` returns the **first** `COIN_CLASS` `quan` on the nobj chain, not a sum (gold merges).

The queue line was that prefix + `money_cnt` — not `lay_an_egg`, not `clone_mon` split_mon, not rewriting every other `money_cnt` clone.

The diff **does** that envelope: local `money_cnt` walks `game.invent` and returns the first `COIN_CLASS` `quan` (or 0). Dragon arm: `meager = (obj.quan + money_cnt(invent) < u.ulevel * 1000) ? 'meager ' : ''` then `You coil up around your ${meager}hoard.` Sit cannot import end/shk clones (cycles); a local clone of `hack.c` is the right call.

It does **not** port `lay_an_egg` / `clone_mon` monster `split_mon`. Named, and excluded. It does **not** retouch end.js / shk.js / invent.js / fountain.js / monmove.js `money_cnt` **sum** clones. Named in the D-log. Correct for this cluster; those sums are equivalent while gold merges to one pile, and they are not this `#sit` site.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `dosit` dragon `COIN_CLASS` arm | C call site, **retouched** | `sit.c:443–446`; was always bare `"hoard"` |
| `money_cnt` | **clone** of `hack.c:4514–4521` | local; first `COIN_CLASS` `quan`, not a sum |
| `S_DRAGON` `mlet` | pre-existing predicate | JS table uses `'S_DRAGON'` strings (`mlets[]`); C `monsym.h` char |
| `COIN_CLASS` | imported C | `objects_data.js` `= 12` |
| `You("%shoard.")` | C `pline.c:366–374` `You` + `"You "` | JS `pline` includes the prefix |
| `lay_an_egg` / `clone_mon` | C later/other arms, **named omit** | next Open is `lay_an_egg` |
| end/shk/invent `money_cnt` | **clones**, **not this SHA** | those **sum**; unused here |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names in control flow / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched.

## Constitution / playbook

Grep of the `js/sit.js` hunk: no trace-index gates, no recorded coordinates, no `fastforward` burns. Threshold is `u.ulevel * 1000`, not a seed-shaped gold table. Contest Rule #2: no Node builtins in scored code.

## C ↔ JS fidelity

### Dragon arm — C `You` format, `<` not `<=`, no RNG

C `sit.c:443–446`:

```
        if (gy.youmonst.data->mlet == S_DRAGON && obj->oclass == COIN_CLASS) {
            You("coil up around your %shoard.",
                (obj->quan + money_cnt(gi.invent) < u.ulevel * 1000)
                ? "meager " : "");
```

JS `sit.js:1125–1133`: `youdata?.mlet === 'S_DRAGON' && obj.oclass === COIN_CLASS` was already the gate (pre-existing; generated `mlets` are `'S_DRAGON'` for gray/gold/…/baby/Chromatic/Ixoth, same class as C `S_DRAGON`). New: `meager` ternary then `` You coil up around your ${meager}hoard. ``.

C `You` (`pline.c:366–374`) prefixes `"You "` onto the format, so the scored line is `You coil up around your meager hoard.` or `You coil up around your hoard.` JS `pline` of the full sentence matches. `%s` glued to `hoard` is why the prefix includes the trailing space (`"meager "` vs `""`). JS `'meager '` / `''` is that. C clang evaluates the ternary before `You`/`vpline`; JS builds `meager` then interpolates — same string, no RNG in either order.

Comparison is C `<`. Floor pile **plus** wallet. `u.ulevel * 1000`: level 1 → 1000; 10 → 10000; 30 → 30000. Equal-to-threshold is **bare**. Zero wallet + floor `quan` 999 at XL 1 is meager; 1000 is bare. No `rn2`/`rnd`/`rn1`/`d` in this arm.

Numeric cases (C and JS the same; no RNG):

| XL | floor `quan` | invent gold | sum | vs `XL*1000` | prefix |
|----|--------------|-------------|-----|--------------|--------|
| 1 | 999 | 0 | 999 | `< 1000` | `"meager "` |
| 1 | 1000 | 0 | 1000 | not `<` | `""` |
| 1 | 500 | 500 | 1000 | not `<` | `""` |
| 1 | 499 | 500 | 999 | `<` | `"meager "` |
| 10 | 9999 | 0 | 9999 | `< 10000` | `"meager "` |
| 10 | 1 | 9999 | 10000 | not `<` | `""` |
| any | 0 (not `COIN_CLASS` top) | * | n/a | n/a | not this arm |

`obj` is the **top** of the floor pile (`objects_at` ≡ C `level.objects[u.ux][u.uy]`). If a non-gold object is on top of gold, C does not take this arm (towel / slithy / sit-on-`the(xname)` instead). JS the same. Not a new miss.

Baby dragons and adult dragons share `S_DRAGON`; C `mlet == S_DRAGON` includes them. Chromatic Dragon / Ixoth too. JS `'S_DRAGON'` table matches that class, not a gray-dragon-only gate.

### `money_cnt` — first pile, call-for-call with `hack.c`

C `hack.c:4509–4521`:

```
long money_cnt(struct obj *otmp)
{
    while (otmp) {
        if (otmp->oclass == COIN_CLASS)
            return otmp->quan;
        otmp = otmp->nobj;
    }
    return 0L;
}
```

Comment says “Counts the money in an object chain”; the body **returns on the first coin**. Gold merges in invent, so the first pile **is** the wallet. JS:

```
function money_cnt(invent) {
    for (const otmp of invent || []) {
        if (otmp.oclass === COIN_CLASS) return otmp.quan | 0;
    }
    return 0;
}
```

`game.invent` is an array whose order is the C nobj walk. `invent || []` and missing gold → 0, same as C `money_cnt(NULL)` (`extern.h` `NO_NNARGS`; the `while` does not enter). `COIN_CLASS` is 12. Container gold is **not** walked (C `money_cnt` does not recurse `cobj`; `hidden_gold` is a different function). Floor `obj->quan` is added **outside** `money_cnt`, so dropping the pile does not double-count the floor gold as wallet.

`| 0` is ToInt32. C `quan` is `long`. Against a threshold of `ulevel*1000` (≤ ~30k in ordinary play, 100k at XL 100) a wrapped 2³² pile would mis-classify meager vs bare. Pathological; gold in this port is ordinary `quan`. Not Must-fix. Do not “fix” it as a peel.

C `addinv` / `merged` keeps a single gold object in `gi.invent`. JS `addinv` does the same for `COIN_CLASS` (botl `_goldCount` tracks that pile). First-pile ≡ wallet under that invariant. The sit clone still matches C if invent ever had two gold objects: **first** `quan` only.

Other JS `money_cnt` clones **sum** all `COIN_CLASS` piles (`end.js:126–131`, `shk.js:2807–2812`, `invent.js:2230–2235`, `fountain.js:150–155`, `monmove.js:521–526`). Several comments wrongly cite `invent.c`; the C function is `hack.c`. While invent gold merges to one object, sum ≡ first. If a merge bug ever produced two piles, C and this sit clone would count the first only; those sums would overcount. Pre-existing, unused at this site. D-log correctly left them. Do not rewrite them as part of `lay_an_egg`.

### Picnic envelope already C (D-1073) — this SHA does not reopen it

The dragon arm lives **inside** `if (obj && !(uteetering \|\| uescaped))`. A dragon teetering on a seen pit with floor gold skips picnic entirely (trap arm), so meager/bare never prints. C the same: the hoard `You` is inside that `if`. This SHA does not retouch the conjunct. Match.

## Hallucinations / overclaim

“Match C dosit so a dragon sitting on gold prints a meager hoard when the pile plus wallet is under ulevel*1000” is **true for this arm and for the local first-pile `money_cnt`**. It is **not** true that every JS `money_cnt` now matches `hack.c` (several still sum), or that `dosit` is complete C (`lay_an_egg` still named).

This is **not** “Match C dispatch, callee is a stub.” `money_cnt` is a clone of the real `hack.c` body (first `COIN_CLASS`, not a hardcoded `"meager "` / not a no-op). Classify: **clone that matches C at this call site**. The D-log’s “not a sum” is the C function, not a denial that merged gold’s first pile equals the wallet.

Stamping the Open item **Addressed:** D-1074 is fair. Fill hash `962e07a9` in this commit.

## Density (§2b)

One Open cluster: C `sit.c:443–446` plus the `hack.c` `money_cnt` callee that comparison needs. Review 33 forbade folding this into picnic; D-1073 left it queued. ~20 executable lines. **Small** on the playbook “too small / one deferred `if`” axis (waste of a fresh-agent tax, not a fidelity miss). Not “finish invent.c money.” Not `lay_an_egg` in the same commit (later `else if`, unrelated). Acceptable follow-up; do not split `lay_an_egg` further into message vs return.

## Verification

Journal: private canary (meager/bare/ulevel/first-coin-not-sum); green+strict seed8000/0900; cohort seed1500/1800/0060/0102/0700/0017. Path **public-unhit** (no public dragon `#sit` on gold). Green+cohort is regression cover, not a public meager-hoard proof. Cadence **#1360** ran before D-1073. This review iter’s cadence **#1365** full `sessions` after both SHAs: **44**/44 Scr **11405**/11405 RNG **100%** speed `31+0.26/turn` (R² 0.87) at `962e07a9`.

C read of `sit.c:437–446`, `hack.c:4509–4521`, `pline.c:359–374`, `extern.h:1249–1250`; JS `sit.js:1043–1054`/`1123–1133`, `end.js:125–131`, `shk.js:2806–2812`, hunk grepped FORCE/fs/seed.

## Actionable C-wrongs

None from this SHA. The prefix, the `<` threshold, and the local first-pile `money_cnt` match C.

Named omits / do-nots (map / Open, not Must-fix):

1. **`dosit` `lay_an_egg`** (`sit.c:559–560`): live Open line. `return lay_an_egg();` at the end of the furniture/`IS_THRONE` chain. Do not pull `clone_mon` split_mon / wizard getlin / `shieldeff` this next iter. **Addressed:** D-1075 `f21410e1`
2. Other JS `money_cnt` sum clones (end/shk/invent/fountain/monmove). Equivalent under merge. Do not “align” them in the egg iter.
3. Helper `ceiling_hider` / `MZ_HUGE`; `can_reach_floor(check_pit)` (Open); hero pit/hole `dotrap` bodies **Addressed:** D-1076 `87b4b7cb`.

Do not restore dragon sit always-bare `"hoard"`. Do not sum invent gold at this site. Do not skip picnic teeter. Do not import `monmove.js` `sticks`. Do not put trailing `confdir` inside shared `getdir`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: the dragon arm prefixes `"meager "` iff floor `quan` plus first invent gold pile is `< u.ulevel * 1000`, which is C `sit.c` / `hack.c` `money_cnt`, not a sum and not a stub.
- Must-fix stays empty; next port pops Open `sit.c` `dosit` `lay_an_egg`.
