# Review 116 — df99ab32 — expire_gas_cloud dissipation plines (D-1155)

## Metadata
- Full / short hash: `df99ab322ea1522e989f5a287871b9adae284b4f` / `df99ab32`
- Parent: `10904562` (D-1154). This file audits **this SHA only**. Archive row **Addressed:** D-1155 `df99ab32` was filled by D-1156.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 12:50:33 +0200
- D-id: **D-1155**
- Stats: 12 files, +236 / −68 — `js/region.js` +145 / −27 (`expire_gas_cloud` + `run_regions` plines); `js/fountain.js` comment.
- Claims to close: Open queue `region.c` `expire_gas_cloud` dissipation plines (named). Not inside_gas HP. Review **107** named omit of expire_f scan. `reviews/loop-2026-08-15/` has no open expire Must-fix.
- JS / map: `region.js` `expire_gas_cloud` / `run_regions`; `allmain.js` already awaits `run_regions`. `c-js-map/turns.md` region. `create_gas_cloud_selection`, geometric `hero_inside` bit, mfndpos subset, full `remove_region` unblock loop still named.
- Prior reviews this SHA claims to close: **107** named dissipation; D-1154 next-port.

## Intent vs deliverable

Git subject promises: “Match C region.c expire_gas_cloud so a thin cloud prints around-you / You_see dissipation plines, instead of removing silently.”

Old JS `run_regions` inlined thick `arg>=5` → half arg, `ttl=2`, else `remove_region`, and never set `gg.gas_cloud_diss_within` / `diss_seen`. C `region.c:1046–1087` `expire_gas_cloud`: thick `damage>=5` `/=2`, `ttl=2`, return FALSE (keep); thin two-pass (Blind one-pass) over `bounding_box` ∩ `inside_region`; pass 1 `!does_block` → `unblock_point`; pass 2 `!uswallow` `u_at` → within else `cansee` → seen++. Return TRUE. `run_regions:419–473` resets gg, `expire_f==NO_CALLBACK || callback()` then `remove_region`, then the two plines (`xray_range<=1` zeros seen when within).

The diff **does** port that function and the post-inside_f plines. Pass 1 unblock is left empty with a comment that C `does_block` still sees the live region (`visible_region_at` skips only `ttl==-2`, which `remove_region` sets later). It does **not** port `create_gas_cloud_selection` or flip geometric `is_hero_inside_gas_cloud`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `expire_gas_cloud` | C callee, **new** | `region.c:1046–1087` |
| `run_regions` gg reset + plines | C body, **new** | `region.c:419–421, 460–473` |
| `run_regions` expire dispatch | C body, **rewritten** | `:427–429`; JS always `expire_gas_cloud` if not `NO_CALLBACK` |
| `make_gas_cloud` `expire_f` | C field, **retouched** | C `EXPIRE_GAS_CLOUD=1`; JS same value |
| `plur` | C macro, **clone** | `hack.h`; `n==1` → `""` else `"s"` |
| `You_see` | C `pline.c:455–468`, **clone** | Blind → “You sense”; Unaware named |
| `region_bounding_box` | C `NhRegion.bounding_box`, **clone** | union of 1×1 BFS rects |
| `inside_region` / `u_at` / `cansee` / `Blind` | C callees, **imported or local** | Blind youprop `(H\|\|E)&&!B` + roleplay |
| `remove_region` vision | C, **pre-existing thin** | first-rect `recalc_block_point`; full box named |
| `create_gas_cloud_selection` | C, **named omit** | `region.c` selection create |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean.

**New RNG on this path:** none in expire or the plines. Thick half uses integer `/=2` (JS `(damage/2)|0`). Path **public-unhit** on dissipation plines (fog ttl still matches without printing).

## Constitution / playbook

Grep of the JS hunks: no trace-index gates. Do not restore silent `remove_region` for thin clouds. Do not print You_see when Blind (C skips pass 2). Do not count overlapping rects twice (scan box then `inside_region`). Do not pull fumaroles whoosh into this SHA.

## C ↔ JS fidelity

### Thick then thin

C `region.c:1055–1062` / `:1086`:

```
if (damage >= 5) {
    damage /= 2;
    reg->arg.a_int = damage;
    reg->ttl = 2L;
    return FALSE;
}
/* …scan… */
return TRUE;
```

JS `:576–581` / `:605`: same `>=5`, trunc half, `ttl=2`, `return false`; thin falls through to `return true`. Match. `arg=5` → 2 (C `int` `/`). Drinksink cloud is arg=4 (D-1124) → thin on first ttl==0.

### Pass 1 unblock is a C no-op while the region is live

C `vision.c:194–196` `does_block`: `visible_region_at` returns 2 for a visible cloud. `visible_region_at` (`region.c:718–728`) skips only `ttl==-2`. Expire runs **before** `remove_region` sets that. So pass 1 `!does_block` is false on gas-only cells. C then `remove_region` (`:360`) sets `ttl=-2` and unblocks. JS empty pass 1 + existing `remove_region` rebuild is equivalent **for dissipation counting** (pass 2 `cansee` still runs with the cloud in the list). Pre-existing JS `remove_region` only `recalc_block_point`s `rects[0]` — named vision debt, not this Open pline miss.

Blind: C `pass <= (Blind ? 1 : 2)` skips the seen/within scan. JS `passes = Blind() ? 1 : 2` same. Swallow: pass 2 gated `!u.uswallow`. Match.

### `u_at` vs `cansee` count

C pass 2: `u_at` → `diss_within=TRUE`; else `cansee` → `diss_seen++`. One cell is not both (hero is `u_at`). Overlapping rects: box scan + `inside_region` counts a point once. JS `region_bounding_box` union then `inside_region` same. Match.

### `run_regions` order

C: reset gg → ttl==0 expire/remove → age + inside_f → within pline → seen You_see. JS `:615–666` same. Within: `pline('The gas cloud around you dissipates.')` ≡ C `pline_The("gas cloud around you dissipates.")`. Then `xray_range<=1` zeros seen. You_see `"a"`/`"some"` + `plur` + `" dissipate."` (not “dissipates”). Match.

Dispatch clone: C `callbacks[f_indx]`. JS `expire_f ?? NO_CALLBACK` then always `expire_gas_cloud` if not −1. Gas `expire_f=1` (`make_gas_cloud` `:1189–1190` / JS `:363`). Force fields `#if 0`. Live C never has another expire index. Match for gas. `INSIDE_GAS_CLOUD` JS tag stays 1 (C callbacks inside is 0) — inside_f still compared to the JS tag, not mixed with expire.

### `You_see` clone

C `pline.c:455–468`: Unaware “dream that you see”; else Blind “You sense”; else “You see”. JS local: Blind sense / else see. Unaware named. Blind already skipped pass 2 so this caller’s You_see Blind arm is dead. Harmless.

### inside_f tag vs expire_f index

C `callbacks[]`: `INSIDE_GAS_CLOUD=0` → `inside_gas_cloud`; `EXPIRE_GAS_CLOUD=1` → `expire_gas_cloud`. `make_gas_cloud` sets `inside_f=0`, `expire_f=1`. JS keeps `INSIDE_GAS_CLOUD=1` as a **tag** (inside_f compared to that tag, not used as a table index) and sets `expire_f=1`. `run_regions` age loop still `inside_f !== INSIDE_GAS_CLOUD` continue then geometry `inside_region(u.ux,u.uy)` (walk `in_out_region` still named — not the `hero_inside` bit). Expire does not go through `callbacks[0]`. Live C never expires via inside. Match for gas.

### `remove_region` after TRUE

C `remove_region:360` sets `ttl=-2` so `visible_region_at` ignores the dying cloud, then unblocks the whole box. JS splices the array and `recalc_block_point`s `rects[0]` only (D-0674 vision subset). Dissipation **counts** happen in expire pass 2 **before** remove, so the thin rebuild does not change the pline. Named vision debt. Do not Must-fix it as this Open line.

## Hallucinations / overclaim

D-log / CURRENT / subject say a thin cloud prints around-you / You_see dissipation instead of removing silently. **That is the hunk:** expire scan + `run_regions` plines. Thick keep is the same arithmetic the old inline already had. Stamping **Addressed:** D-1155 is fair for the Open **pline** line. Hash `df99ab32` is on the archive row (filled by D-1156). Do **not** stamp it as “Match C `does_block` unblock in expire” or “walk uses `hero_inside`.” This is **not** “Match C dispatch, callee is a stub”: `pline` / `cansee` / `u_at` / `remove_region` are real; expire is new C, not a no-op.

## Density

Expire body + `run_regions` envelope is one C function family. ~145 JS. Right size (§2b). Not fumaroles. Not selection create.

## Verification

Journal: private canary **54**/54 (src order; thick 8→4 ttl age 2→1 silent; 5/2 trunc; within; seen a/some; unseen; Blind/uswallow; xray −1/1/>1; overlap; two clouds; NO_CALLBACK; ttl>0; stale gg; arg=4 thin; second expire after half); green+strict seed8000/0900; cohort **14**/14 (0002 drinksink + 0014 fountain + 0361/0383 fog + 0006/0007/0360/2200/0030/0004/1500/1800/0012/0108) + strict 8000/0900/0002/0014/0361/0383/0360/2200/0030/0004/0006/0012. Path **public-unhit** on dissipation plines. Cadence fog ttl still matches.

C read of `region.c:45–50`, `:414–473`, `:718–728`, `:1046–1087`, `:1188–1190`, `vision.c:194–196`, `pline.c:455–468`; JS SHA expire + `run_regions`. Hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| arg>=5 ttl==0 | half, ttl=2, keep, silent | **same** |
| thin, hero inside | around-you; seen suppressed if xray<=1 | **same** |
| thin, cansee cells | You_see a/some … dissipate. | **same** |
| Blind / swallow | no pass-2 counts | **same** |
| expire_f −1 | remove, no scan | **same** |

## Actionable C-wrongs

None that Must-fix this next iter. Thin dissipation plines match `region.c:1066–1086` / `:460–473`.

Named omits / do-nots (map / Open, not Must-fix):

1. `You_see` Unaware prefix (`pline.c:461–462`).
2. `remove_region` full bounding-box `unblock_point` / `newsym` (`region.c:360–380`); JS first-rect rebuild.
3. `callbacks[]` table (inside index 0 vs JS tag 1); `create_gas_cloud_selection`.
4. Geometric `is_hero_inside_gas_cloud` vs `hero_inside` bit (walk `in_out_region` still named).
5. Do not restore silent thin remove. Do not skip `xray_range<=1` suppress. Do not pull fumaroles whoosh into this SHA — **Addressed:** D-1156 `16e8d88b`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: ttl==0 thin gas now scans like C and prints the around-you / You_see dissipation lines; thick clouds still halve and linger two turns.
- Must-fix stays empty for this SHA; next port popped Open fumaroles whoosh. **Addressed:** D-1156 `16e8d88b`. Not selection create.
