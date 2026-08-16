# Review 43 — 453e759c — `can_reach_floor` ceiling_hider / Flying||MZ_HUGE (D-1082)

## Metadata
- Full / short hash: `453e759c67cf30ecb975bd866b577c8c921a429e` / `453e759c`
- Parent: `cd5af20a` (D-1081; review **42**). JS-touching since last `reviews/loop-unattended/` file: D-1081, **this SHA**, D-1083, D-1084. This file audits **this SHA only**.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 14:30:03 +0200
- D-id: **D-1082**
- Stats: 12 files, +159 / −71 — `js/engrave.js` +47 / −16 (`ceiling_hider`, `Flying()`, two arms); `js/sit.js` comments only. Live JS is the helper, not a new file.
- Claims to close: Open queue `engrave.c` `can_reach_floor` ceiling_hider / MZ_HUGE (named from D-1069/D-1071). Reviews **30** / **32** named omit. Stamped **Addressed:** D-1082 `453e759c` on the archive row (filled by D-1083). `reviews/loop-2026-08-15/` has no open ceiling-hider Must-fix.
- JS / map: `engrave.js` `can_reach_floor`. `c-js-map/turns.md` / `data.md` name D-1082; `check_pit` was still named (next SHA). `display.js` `feel_can_reach_floor` clone still omits these arms.
- Prior reviews this SHA claims to close: **32** named omit 2 (`ceiling_hider` / `MZ_HUGE`); **30** same. Review **34** forbade pulling ceiling into the picnic peel.

## Intent vs deliverable

Git subject promises: “Match C can_reach_floor so an undetected ceiling hider cannot reach the floor and huge or flying forms skip the pit gate.” Body: undetected piercer/lurker still reached; sticky `u.Flying` stood in for C `youprop.h` Flying.

The queue line was those two C arms after unskilled `P_RIDING`, not `check_pit` teeter/shaft (explicitly “Not check_pit”).

The diff **does** the ceiling FALSE arm and the Flying||MZ_HUGE TRUE arm in C order. `ceiling_hider` is `mondata.h` (hider && (clinger && mlet≠S_MIMIC || flyer)). Trapper is HIDE-only → still reaches. Large mimic `mlet === 'S_MIMIC'` (JS string table) is excluded. `MZ_HUGE = 4` matches `monflag.h:182`.

It does **not** wire `check_pit` (next Open; D-1083). Named. It does **not** retouch `display.js` `feel_can_reach_floor`. Named.

It claims Flying is `youprop.h` `(H||E||steed is_flyer)&&!B`, not sticky `u.Flying`. The **clone reads `u.HFlying` / `u.EFlying` / `u.BFlying` and does not read `u.uprops[FLYING]`**. That is the C-wrong.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `can_reach_floor` ceiling / Flying / MZ_HUGE | C body, **retouched** | `engrave.c:203–207` |
| `ceiling_hider` | **clone** of `mondata.h:43–45` | uses imported `is_hider` / `is_clinger` / `is_flyer` |
| `is_hider` / `is_clinger` / `is_flyer` | C macros, **imported** | `monsters.js`; `M1_HIDE` / `M1_CLING` / `M1_FLY` |
| `MZ_HUGE` | C enum, **imported** | `monsters.js` `4` |
| `Flying()` | **clone** of `youprop.h:253–255` | **diverges**: H/E flats, no `uprops[FLYING]` |
| `Levitation()` / `sticks` / hugs | pre-existing, **untouched** | D-1070 / D-1071 |
| `feel_can_reach_floor` | pre-existing **diverging clone** | `display.js`; still sticky Lev/Fly |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched. Zero RNG in these arms.

## Constitution / playbook

Grep of the `js/engrave.js` hunk: no trace-index gates, no recorded coordinates, no `fastforward` burns. `S_MIMIC` is the generated `mlets[]` string, not a seed glyph. Contest Rule #2: no Node builtins.

## C ↔ JS fidelity

### Ceiling hider — FALSE, before Flying; no RNG

C `engrave.c:203–204`: `if (u.uundetected && ceiling_hider(gy.youmonst.data)) return FALSE;`

C `mondata.h:43–45`:

```
#define ceiling_hider(ptr) \
    (is_hider(ptr) && ((is_clinger(ptr) && (ptr)->mlet != S_MIMIC) \
                       || is_flyer(ptr))) /* lurker above */
```

JS `engrave.js:252–255` / `321–324`: `is_hider` then `(is_clinger && mlet !== 'S_MIMIC') || is_flyer`. Generated `mlets` store `'S_MIMIC'` not `'m'` (`mklev.js` `m: 'S_MIMIC'`). The exclusion is live. `is_hider`/`is_clinger`/`is_flyer` are `mflags1` bits matching `mondata.h:19`/`22`/`38`.

Piercer: HIDE+CLING, not mimic → ceiling_hider true → undetected FALSE. Lurker above: HIDE+FLY → true via `is_flyer`. Trapper: HIDE only → false → still TRUE later. Detected (`uundetected==0`) skips the arm. Match for this predicate.

`dosit` (D-1068) clears non-trapper hiders before `can_reach_floor(FALSE)`, so the ceiling arm is **dead at `#sit`**. It is live for `TRUE` callers (`u_wipe_engr`, eat `floorfood`, lock, engrave). That is C.

### MZ_HUGE — TRUE before check_pit

C `engrave.c:206–207`: `if (Flying || gy.youmonst.data->msize >= MZ_HUGE) return TRUE;`

JS `326–328`: `Flying() || (youdata?.msize|0) >= MZ_HUGE`. `MZ_HUGE` is 4. Giant / titan / etc. skip the pit gate. Match for the size arm. `youdata` undefined → `msize` 0, not a false huge.

### Flying — claimed `youprop.h`, clone misses worn extrinsic

C `youprop.h:247–255`:

```
#define HFlying u.uprops[FLYING].intrinsic
#define EFlying u.uprops[FLYING].extrinsic
#define BFlying u.uprops[FLYING].blocked
#define Flying \
    ((HFlying || EFlying || (u.usteed && is_flyer(u.usteed->data))) \
     && !BFlying)
```

`FLYING = 49` (`prop.h:71`). Worn **amulet of flying** (`objects.h:859`, `oc_oprop FLYING`): C `setworn` writes `uprops[FLYING].extrinsic` (`do_wear.c:1056–1058` “setworn() has already set extrinsic flying”). Poly flyer: `PROPSET(FLYING, ...)` (`polyself.c:100`) writes **intrinsic**. Steed: `is_flyer(usteed->data)`. Levitation blocks via `BFlying` (`float_vs_flight` / `I_SPECIAL`).

JS `engrave.js:241–245`:

```
    return !!(((u.HFlying | 0) || (u.EFlying | 0) || steedFlyer)
        && !(u.BFlying | 0));
```

`confer_oc_oprop` (`do_wear.js:261–288`) writes `uprops[p].extrinsic` for **every** `oc_oprop`, but mirrors flats only for BLINDED / FAST / TELEPAT / STEALTH / **LEVITATION**. **FLYING is not mirrored.** Grep: **no** `u.EFlying =` anywhere in `js/`. `u.Flying =` also never assigned (old sticky was already dead). `HFlying` **is** written by `propset_fromform(FLYING, 'HFlying', ...)` (`polyself.js:469`) — poly flyer works.

So:

| Source | C Flying | JS engrave `Flying()` |
|--------|----------|------------------------|
| Poly flyer (`HFlying` FROMFORM) | true | **true** |
| Basic rider + flying steed | true | **true** |
| Unskilled rider | FALSE earlier (`P_RIDING < P_BASIC`) | **FALSE earlier** |
| **Amulet of flying** (`uprops[FLYING].extrinsic`) | true | **false** (EFlying unset) |
| Timed `HFlying` if only uprops TIMEOUT | true | depends whether timeout wrote the flat |

`eat.js:806–815` already ORs `uprops[FLYING]` intrinsic/extrinsic (D-1060 shape). This SHA cloned the **wrong** helper in the file that owns `can_reach_floor`. Review **19** QUALITY-RISK’d sit Fire/Cold H||E without uprops for the same confer hole. Review **30** Must-fix’d Levitation sticky; that peel worked because `confer_oc_oprop` **does** mirror `ELevitation` (D-0976). Flying is the Fire_resistance class, not the Levitation class.

### Why this is live (not “dosit+FALSE so both TRUE”)

With `check_pit==false` (this SHA still no-ops the pit arm), Flying vs fallthrough both return TRUE — **no `dosit` gap**, same as review **32** said. The miss is for **`TRUE` callers** once D-1083 wires teeter:

- C: amulet of flying → Flying TRUE → **skip** `check_pit` → can reach a seen pit.
- JS: Flying() false → D-1083 `uteetering` FALSE → **cannot** reach.

Private canary tested H/E Flying and steed-skill, **not** `setworn` amulet of flying. Overclaim.

`display.js` `feel_can_reach_floor` still `u.Flying` sticky then fallthrough TRUE. Named; not this queue line. Do not peel display in the Flying Must-fix (cycle + FALSE so check_pit N/A).

## Hallucinations / overclaim

“Match C can_reach_floor so an undetected ceiling hider cannot reach the floor and huge or flying forms skip the pit gate” is **true for ceiling_hider and MZ_HUGE, and for poly/steed Flying.** It is **not** true that `Flying()` is C `youprop.h` Flying for worn `AMULET_OF_FLYING`. This is **not** “Match C dispatch, callee is a stub” — `is_hider` / `is_flyer` are real. It **is** “Match C youprop, clone reads unwritten flats.”

Stamping **Addressed:** D-1082 is fair for ceiling + MZ_HUGE + poly/steed Flying. It is **not** fair for worn-amulet Flying. Hash `453e759c` is on the archive row.

## Density (§2b)

One Open cluster: the two C arms the queue named together (ceiling FALSE + Flying||MZ_HUGE TRUE). ~25 executable lines. Small, but it is the whole remaining gap **except** `check_pit` (left named on purpose). Sibling `check_pit` in the next iter is §2b “separate iters for sibling arms” waste; the Open line forbade pulling it. Not “finish `engrave.c`.”

## Verification

Journal: private canary (undetected piercer/lurker false; detected lurker/trapper/giant true; large mimic S_MIMIC true; H/E Flying true; unskilled flying steed false; basic rider flying steed true; swallow/Levitation/hugs still false); green+strict seed8000/0900; cohort **20**/20 + strict 1800/0004/0101/0103/0360/2200/4500. Path **public-unhit**. Cadence **#1380** **44**/44 after this SHA.

C read of `engrave.c:187–214`, `mondata.h:19–45`, `youprop.h:247–255`, `prop.h:71`, `objects.h:859`, `do_wear.c:1056–1066`, `polyself.c:100`; JS `engrave.js:237–337`, `do_wear.js:261–288`, `eat.js:806–815`, `polyself.js:467–469`, `display.js:1915–1923`; hunk grepped FORCE/fs/seed.

Private canary vs C (journal) **did not** include amulet of flying. Cohort 0101 (engrave) / 0004 (feeding) / 0103 (ride) do not wear that amulet on a seen pit.

## Actionable C-wrongs

1. **`engrave.js` `can_reach_floor` `Flying()` must be C `youprop.h` Flying ≡ `(uprops[FLYING].intrinsic \|\| uprops[FLYING].extrinsic \|\| steed is_flyer) && !blocked`.** Copy the `eat.js:806–815` shape (OR the flats **and** the uprops pair; keep steed; keep `!BFlying` / `prop.blocked`). Worn `AMULET_OF_FLYING` must skip `check_pit` (TRUE after D-1083). Do **not** rewrite `confer_oc_oprop` this iter (D-1060 / review **19** same do-not). Do **not** pull steal.c `remove_worn_item`. Do **not** rewrite every other `Flying()` clone. Falsifier: `setworn` amulet of flying (`uprops[FLYING].extrinsic` set, `EFlying` unset), not poly-flyer, not steed, `check_pit` true, `uteetering_at_seen_pit` true → `can_reach_floor(true)` is **true**; unskilled rider still false before Flying; poly `HFlying` still true; `BFlying` still blocks.

**Addressed:** D-1085 `3e1a74e8`

Named omits / do-nots (map / Open, not Must-fix):

2. `check_pit` teeter/shaft — shipped next as D-1083 (caller `t && is_pit` still named).
3. `display.js` `feel_can_reach_floor` clone (uses FALSE).
4. `float_vs_flight` BFlying when wearing the amulet under Levitation — C `do_wear.c` after setworn; not this queue line.

Do not restore sticky `u.Flying` as the only Flying test. Do not skip `ceiling_hider` before Flying. Do not treat large mimic as a ceiling hider. Do not import `monmove.js` `sticks`.

## Verdict

- Verdict: **QUALITY-RISK**
- Score: **5.5 / 10**
- One sentence: ceiling_hider and MZ_HUGE match `engrave.c` / `mondata.h`, but `Flying()` claims `youprop.h` while ignoring `uprops[FLYING]` that `confer_oc_oprop` actually writes for the amulet of flying.
- Must-fix prepends item 1; next port ships that, not steal.c `remove_worn_item`.
