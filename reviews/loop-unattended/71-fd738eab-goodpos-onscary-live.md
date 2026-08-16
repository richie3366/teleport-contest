# Review 71 — fd738eab — `goodpos` live-mon `onscary` when `m_id != 0` (D-1110)

## Metadata
- Full / short hash: `fd738eab817e6076cc1760b6aadd9b099deb9b7e` / `fd738eab`
- Parent: `5bf81ca7` (D-1109). This file audits **this SHA only**. Archive row **Addressed:** D-1110 `fd738eab` was filled by D-1111. This review fills D-1109 hash (already `5bf81ca7` on the archive row).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 22:13:29 +0200
- D-id: **D-1110**
- Stats: 10 files, +246 / −46 — `js/teleport.js` +139 / −6 (`goodpos` ternary + local `onscary` and shop/temple/align clones).
- Claims to close: Open queue `teleport.c` `goodpos` live-mon `onscary` when `m_id != 0` (named). Not `goodpos_onscary`. Review **63** named omit 1. `reviews/loop-2026-08-15/` has no open live-onscary Must-fix.
- JS / map: `teleport.js` `goodpos` / local `onscary`. `c-js-map/turns.md` teleport row. `mon.js` mfndpos `onscary` still the partial (sengr_at stringify / no `is_lminion` / shop-temple fall-through) — named.
- Prior reviews this SHA claims to close: **63** item 1 (live `m_id` ternary).

## Intent vs deliverable

Git subject promises: “Match C teleport.c goodpos so live monsters use onscary instead of the fakemon helper.”

Old JS `goodpos` always called `goodpos_onscary` under `GP_CHECKSCARY`. After D-1102 that helper rejects any strict Elbereth, so live `rloc_pos_ok` over-rejected hero-less Elbereth and skipped vampshifter altar / lawful-minion / shop-temple immunities. C `teleport.c:168–169` is `mtmp->m_id ? onscary(x,y,mtmp) : goodpos_onscary(x,y,mdat)`.

The diff **does** that ternary and ports a local `monmove.c` `onscary` (mon.js cycle). Fakemon `{data}` with no `m_id` still uses D-1102 `goodpos_onscary`.

It does **not** rewrite `mon.js` `onscary` used by `mfndpos`. Named. It does **not** pull `teleok` vibrating/pit-fly (next SHA).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `goodpos` checkscary ternary | C body, **retouched** | `teleport.c:168–169` |
| `onscary` | C callee, **clone** | `monmove.c:241–303`; local (cycle) |
| `goodpos_onscary` | C callee, **untouched** | fakemon arm; D-1102 |
| `unique_corpstat` | C macro, **clone** | pre-existing D-1102 `G_UNIQ` |
| `sengr_at` / `engr_at` | C callee, **clone** | pre-existing D-1102 |
| `sobj_at` | C callee, **clone** | pre-existing |
| `is_lminion` | C macro, **clone** | `monst.h:281–282` |
| `mon_aligntyp` | C callee, **clone** | `priest.c:280–289` |
| `is_minion` | C callee, **imported** | `monsters.js` `M2_MINION` |
| `is_vampshifter` | C callee, **imported** | `monsters.js` cham vampire |
| `is_rider` | C callee, **imported** | `monsters.js` |
| `Displaced` | C macro, **clone** | `youprop.h:204` via `_uprop_he` |
| `inhishop` | C callee, **clone** | `shk.c:1039–1048` |
| `on_level` | C callee, **clone** | `dungeon.c:1439–1443` |
| `in_rooms` | C callee, **imported** | `hack.js` string of room chars |
| `histemple_at` / `has_shrine` / `inhistemple` | C callee, **clone** | `priest.c:153–171` / `376–389` |
| `EPRI` / `ESHK` / `EMIN` | C macros, **imported** | `const.js` mextra |
| `objects_at` | C `vobj_at`, **imported** | `mkobj.js` first floor obj |
| `mon.js` `onscary` | C callee, **named omit** | mfndpos still partial |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched. **No new RNG** in `onscary` (Elbereth / altar / scroll are predicates).

## Constitution / playbook

Grep of the `js/teleport.js` hunk: no trace-index gates. Local clones are cycle breaks (`mon.js` / `shk.js` / `priest.js` already import `teleport.js`). Contest Rule #2: no Node builtins.

## C ↔ JS fidelity

### The ternary C actually writes

C `teleport.c:163–170`:

```
if (passes_walls(mdat) && may_passwall(x, y))
    return TRUE;
if (amorphous(mdat) && closed_door(x, y))
    return TRUE;
if (checkscary && (mtmp->m_id ? onscary(x, y, mtmp)
                              : goodpos_onscary(x, y, mdat)))
    return FALSE;
```

JS `486–494`: same three tests, wallwalk/amorph **before** scary. `mtmp.m_id` is JS-truthy for live ids (≥1) and falsy for fakemon `{ data }` (`undefined`) and C’s `m_id==0`. Makemon random place still uses fakemon + `GP_CHECKSCARY` → `goodpos_onscary`. `rloc_pos_ok` passes a live `mtmp` → `onscary`. Match.

Xorn on Elbereth still returns true at wallwalk before scary. **C same.** `GP_CHECKSCARY` off still accepts Elbereth cells. Match.

### `onscary` branch order (`monmove.c:241–303`)

C:

1. `auditory_scare = (x==0 && y==0)`; `magical_scare = !auditory`.
2. `iswiz || is_lminion || data==&mons[PM_ANGEL] || is_rider` → FALSE (immune to **any** scare).
3. magical && (`mlet==S_HUMAN` || `unique_corpstat`) → FALSE.
4. `(isshk && inhishop) || (ispriest && inhistemple)` → FALSE.
5. auditory → TRUE.
6. `IS_ALTAR` && (`S_VAMPIRE` || `is_vampshifter`) → TRUE.
7. `sobj_at(SCR_SCARE_MONSTER)` → TRUE.
8. `sengr_at("Elbereth", TRUE)` && (`u_at` || (`Displaced` && mux,muy) || (`guardobjects` && `vobj_at`)) && !(isshk || isgd || !mcansee || mpeaceful || PM_MINOTAUR || Inhell || In_endgame).

JS `381–416`: same order. `PM_ANGEL` is `ptr.mndx === PM_ANGEL` (`mons()` always stamps `mndx`) ≡ C `&mons[PM_ANGEL]`, **not** all `S_ANGEL` (fakemon helper still oversimplifies `S_ANGEL`; C comment). Lawful minion uses `is_minion(data) && mon_aligntyp==A_LAWFUL`. `A_NONE` priests are not lawful. Match.

`unique_corpstat` is `geno & G_UNIQ` (D-1102). Humans/uniques resist **magical** scare only; auditory `<0,0>` still scares them unless step 2 immune. C same. D-1112 NO_TRAP uses `onscary(0,0)`: Wizard/rider/Angel/lminion return false (migrate); ordinary return true (stay). C comment on that call is backwards; JS matches the **code**. Canary named wiz/rider migrate.

Altar: live vampshifter bat **is** scary here; fakemon `goodpos_onscary` still mlet-only. That is the whole point of the ternary. Match.

Elbereth: local `sengr_at` strict, HEADSTONE skip, future `engr_time` skip (D-1102). `u_at` / Displaced image / `guardobjects && objects_at`. `objects_at` is the floor chain head ≡ C `vobj_at`. Player-engraved Elbereth leaves `guardobjects==0` unless `in_mklev` (`engrave.c:442–449` / `engrave.js:506–508`) — C same, so the object-only arm is mklev Elbereth. Inhell/endgame still kill the Elbereth conjunct. Match.

`Displaced()`: C `HDisplaced || EDisplaced` (no B). JS `_uprop_he` also reads `uprops[DISPLACED]` because `confer_oc_oprop` writes the cloak there, not `EDisplaced` (same youprop pattern as D-1085/D-1089). Extra leftover flats can only **take** displacement, not invent a mux,muy image. Match for worn cloak.

### Shop / temple clones

C `inhishop`: `on_level(shoplevel, u.uz)` then `strchr(in_rooms(mx,my,SHOPBASE), shoproom)`. JS: same, `in_rooms` from `hack.js` returns a string of `fromCharCode(rno)`; `includes(fromCharCode(shoproom))` ≡ `strchr`. Missing `ESHK` → false (C would crash; live shk has mextra).

C `histemple_at`: `ispriest && shroom == *in_rooms(x,y,TEMPLE) && on_level(shrlevel,u.uz)`. JS: `charCodeAt(0)` is `*in_rooms`. Empty rooms: C `*""` is 0, shroom usually ≥ `ROOMOFFSET` → false; JS `!rooms` → false. `has_shrine`: `IS_ALTAR` at `shrpos` and `AM_SHRINE` and `shralign == Amask2align(mask & ~AM_SHRINE)`. `inhistemple`: histemple_at then has_shrine. Match.

`mon_aligntyp`: priest `EPRI.shralign` else minion `EMIN.min_align` else `data.maligntyp`; `A_NONE` stays; else sign. JS `?? data.maligntyp` is extra-defensive if mextra is missing; real priests have EPRI. Not a live C-wrong.

### Dual `onscary`

`mon.js:198–233` still skips `is_lminion` / unique resist / real `inhishop`/`inhistemple`, and stringifies `ep.engr_txt` (object → not `"Elbereth"`). That is **mfndpos**, not `goodpos`. The SHA names it. Do not treat a second copy as this subject’s stub. Drift later would be a new family.

## Hallucinations / overclaim

“Match C so live monsters use onscary instead of the fakemon helper” is **true for `goodpos`/`rloc_pos_ok`/`enexto` that pass a live `m_id` and `GP_CHECKSCARY`:** hero-less Elbereth no longer over-rejects; vampshifter altar scares; Wizard/rider/Angel/lminion/human/uniq/shop-in-shop/priest-in-temple immunities match `monmove.c`. It is **not** true that `mfndpos` now uses this helper, or that fakemon placement switched off `goodpos_onscary`.

This is **not** “Match C dispatch, callee is a stub.” Local `onscary` is a full `monmove.c` body with real `sengr_at` / `inhishop` / `inhistemple` clones, not the D-1102 approx and not the `mon.js` partial.

Stamping **Addressed:** D-1110 is fair for the Open ternary line. Hash `fd738eab` is on the archive row (filled by D-1111).

## Density (§2b)

One Open cluster: C’s one ternary plus the live `onscary` callee that ternary requires (and the shop/temple/align helpers `onscary` calls). ~120 executable lines in the module that already owned `goodpos`. Sibling `teleok` vibrating correctly left for the next SHA. Not “finish teleport.c.” Right size (large end).

## Verification

Journal: private canary **61**/61 (live vs fake Elbereth no-hero; hero+`GP_ALLOW_U`; peaceful/blind/guard/minotaur; cube `!haseyes` vs `mcansee`; Displaced mux + uprops; guardobjects+obj; scare; human/uniq/Angel/S_ANGEL/rider/iswiz/lminion; altar vamp vs bat vs vampshift; Inhell/endgame; HEADSTONE/substring/future/strcmpi; xorn wallwalk; shk in/out; priest shrine/desecrated; undef `m_id`); green+strict seed8000/0900; cohort **14**/14 + strict 0014/4500/0360/2200/0367/0009. Path **public-unhit** (no public live Elbereth `rloc`). Cadence fortress is not an Elbereth proof.

C read of `teleport.c:163–170`, `monmove.c:241–303`, `shk.c:1039–1048`, `priest.c:153–171` / `280–289` / `376–389`, `monst.h:281–282`, `youprop.h:202–204`, `engrave.c:442–449`; JS `teleport.js:296–416` / `486–494`, `hack.js:622–669`, `engrave.js:490–508`, `mon.js:198–233`. Hunk grepped FORCE/fs/seed.

| Case | C live `onscary` | JS after |
|------|------------------|----------|
| jackal + hero-less Elbereth | not scary (`!u_at`) | **same** (was fakemon scary) |
| jackal + hero on Elbereth | scary | **same** |
| vampshifted bat on altar | scary | **same** (fakemon still not) |
| Angel (PM_ANGEL) | never | **same** |
| `S_ANGEL` non-Angel | can be scary | **same** (not fakemon `S_ANGEL`) |
| shk in own shop | never | **same** |
| priest, desecrated shrine | can be scary | **same** |
| `onscary(0,0)` ordinary | true | **same** |
| `onscary(0,0)` Wizard | false | **same** |
| xorn + Elbereth + wallwalk | `goodpos` true first | **same** |
| fakemon + Elbereth | `goodpos_onscary` | **same** |

## Actionable C-wrongs

None that Must-fix this next iter. The ternary and local `onscary` match `teleport.c:168–169` / `monmove.c:241–303`.

Named omits / do-nots (map / Open, not Must-fix):

1. `mon.js` mfndpos `onscary` — still partial (`sengr_at` stringify; no `is_lminion`; shop/temple commented). Not `goodpos`.
2. `teleok` vibrating / pit-fly — **Addressed:** D-1111 `b0847b88` (next SHA).
3. Do not import `mon.js` `onscary` into `goodpos` (cycle). Do not restore always-`goodpos_onscary`. Do not treat vampshifter altar as the fakemon helper.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: live `goodpos` now calls a `monmove.c`-matching `onscary` (hero/image Elbereth, vampshifter altar, shop/temple/minion immunities) while fakemon placement keeps D-1102 `goodpos_onscary` and mfndpos keeps the named `mon.js` partial.
- Must-fix stays empty for this SHA; next port popped Open `teleok` vibrating/pit-fly (D-1111).
