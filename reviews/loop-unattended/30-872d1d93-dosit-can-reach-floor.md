# Review 30 — 872d1d93 — `dosit` `can_reach_floor(FALSE)` swallow / tumble / sit-on-air (D-1069)

## Metadata
- Full / short hash: `872d1d93fa3c3684ff59eb6110bdd716546c20dc` / `872d1d93`
- Parent: `7588d66c` (review **29** ACCEPT of `990b06a8` D-1068; Must-fix empty; next Open was this `can_reach_floor(FALSE)` cluster). JS-touching since last `reviews/loop-unattended/` file (`29-990b06a8-…`): **this SHA only**. Docs-only in the same window: `8314cc94` cadence **#1355** score refresh (filled Addressed hash `872d1d93` on the archive row; not a JS audit).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 09:45:28 +0200
- D-id: **D-1069**
- Stats: 10 files, +127 / −50 — `js/sit.js` +39 / −4 (header + local `Levitation()` + replace Levitation-only early return with dynamic `can_reach_floor(false)` + three messages). Live JS is the `dosit` gate, not a new helper file.
- Claims to close: Open queue `sit.c` `dosit` `can_reach_floor(FALSE)`: swallow “no seats” / Levitation tumble / sitting on air. Replace JS Levitation-only early return. Stamped **Addressed:** D-1069 `872d1d93` on the archive row in the **next** SHA (`8314cc94`) — hash present, not chicken-egg.
- JS / map: `sit.js` `dosit`; callee `engrave.js` `can_reach_floor` **not edited**. `c-js-map/data.md` names D-1069 and still omits ustuck lap; helper hugs / ceiling_hider / MZ_HUGE / uteetering.
- Prior reviews this SHA claims to close: **29** ACCEPT next was this Open line (not a Must-fix). `reviews/loop-2026-08-15/` has no open reach Must-fix. Review **19** QUALITY-RISK (Fire/Cold sit clones vs `youprop.h`) is the same *class* as the Levitation miss below.

## Intent vs deliverable

Git subject promises: “Match C dosit so sitting uses can_reach_floor for swallow seats, levitation tumble, and sitting on air.” Body is empty beyond Co-authored-by. D-log: `#sit` used a Levitation-only early return; C after the hider clear calls `can_reach_floor(FALSE)` then swallow / Levitation / sit-on-air; air/water Levitation may sit; JS swallowed heroes sat on the floor.

C `sit.c:406–421` is usteed return, hider clear (no return), then `if (!can_reach_floor(FALSE)) { if (u.uswallow) There("are no seats in here!"); else if (Levitation) You("tumble in place."); else You("are sitting on air."); return ECMD_OK; }`. C `engrave.c:187–214` is the callee. C `youprop.h:235–240` is `Levitation` ≡ `(HLevitation || ELevitation) && !BLevitation` (not a sticky `u.Levitation` field). C `pline.c:366–374` / `425–432` is `You` / `There` prefixes.

The queue line was that three-message `if` replacing the Levitation-only stub. The diff does ship that `sit.c` envelope: dynamic-import shared `can_reach_floor(false)`, swallow / `Levitation()` / else air, `ECMD_OK`. Air/water exception lives in the helper, not a sit.js special case. Ustuck lap is still after the gate and still named. No `newsym`. No RNG.

It does **not** retouch `engrave.js` `can_reach_floor`. The helper’s Levitation arm is still sticky `u.Levitation` only. That is the load-bearing predicate this SHA claimed to “Match C.” The new sit.js `Levitation()` clone knows `(H||E)&&!B` but is only used for the **message**, and only after the helper already returned false.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `dosit` reach arm | C call site, new | `sit.c:414–421`; after hider, before ustuck lap; `ECMD_OK` |
| `can_reach_floor` | imported C callee, **partial** | `engrave.c:187–214`; `engrave.js:225–244`; **not this SHA** |
| `Levitation()` | **clone** of `youprop.h:240` | sit.js local; sticky-true **ignores** `BLevitation`; message only |
| `There` / `You` | C callees, inlined | `"There "` / `"You "` + format; JS full pline strings |
| `Is_airlevel` / `Is_waterlevel` | imported C | `const.js`; used **inside** the helper, not sit.js |
| `u.uswallow` | C field | first message; helper also returns false |
| hugs / `sticks` / `AT_HUGS` | C callee arm, **named omit** | `engrave.c:192–197`; `mondata.c:654–658` `sticks` |
| `ceiling_hider` | C callee arm, **named omit** | `engrave.c:203–204`; dead at this site after D-1068 |
| `Flying` / `MZ_HUGE` | C early-true, **named** | `engrave.c:206–207`; `check_pit==FALSE` fallthrough is also TRUE |
| unskilled `P_RIDING` | C callee arm | `engrave.c:201–202`; **dead from `dosit`** (usteed already returned) |
| ustuck lap | C next `else if`, **not this SHA** | `sit.c:422–429` |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names in control flow / hardcoded coordinates. Dynamic `import('./engrave.js')` is an ESM cycle (`sit←engrave←hack←eat←sit`), not filesystem. Rule #2 clean. Frozen contracts untouched.

## Constitution / playbook

Grep of the `js/sit.js` hunk: no trace-index gates, no recorded coordinates, no `fastforward` burns. The three strings are C `There`/`You` text, not seed-shaped sit. Contest Rule #2: no Node builtins in scored code.

## C ↔ JS fidelity

### Call site — after hider, `ECMD_OK`, three messages in C order

C `sit.c:410–421`:

```
    if (u.uundetected && is_hider(gy.youmonst.data)
        && u.umonnum != PM_TRAPPER)
        u.uundetected = 0;

    if (!can_reach_floor(FALSE)) {
        if (u.uswallow)
            There("are no seats in here!");
        else if (Levitation)
            You("tumble in place.");
        else
            You("are sitting on air.");
        return ECMD_OK;
```

JS (`sit.js:1020–1037`): hider clear (D-1068), then `can_reach_floor(false)`, then `u.uswallow` / `Levitation()` / else air, `return ECMD_OK`. `There("are no seats in here!")` is `"There "` + the format (`pline.c:425–432`). `You("tumble in place.")` / `You("are sitting on air.")` same with `"You "` (`pline.c:366–374`). `ECMD_OK` is `0x00`. `check_pit` is FALSE like C — pit teeter in the helper is not live here. Match **for the sit.c envelope** if the callee’s false-set matches C.

C then `else if (u.ustuck && !sticks(youmonst.data))` lap (`sit.c:422–429`). JS still skips that arm (named Open). For a swallowed or levitating hero both return before lap. Match for those two.

### Callee branch order — C `engrave.c:191–213` vs JS `engrave.js:225–243`

C, in order:

1. `u.uswallow` → FALSE
2. `u.ustuck && !sticks(youmonst.data) && attacktype(ustuck->data, AT_HUGS)` → FALSE
3. `Levitation && !(Is_airlevel(&u.uz) || Is_waterlevel(&u.uz))` → FALSE
4. `u.usteed && P_SKILL(P_RIDING) < P_BASIC` → FALSE
5. `u.uundetected && ceiling_hider(youmonst.data)` → FALSE
6. `Flying || youmonst.data->msize >= MZ_HUGE` → TRUE
7. `check_pit && t_at && (uteetering_at_seen_pit || uescaped_shaft)` → FALSE
8. TRUE

JS: (1) swallow FALSE — match. (2) hugs **deferred** — named. (3) `u.Levitation && !(Is_airlevel || Is_waterlevel)` — **wrong predicate** (below). (4) usteed + `weapon_skills[P_RIDING] < P_BASIC` (`P_BASIC=2` matches `skills.h:95`) — dead from `dosit` because usteed already returned. (5) ceiling_hider **deferred** — named; after D-1068 a non-trapper hider is already `uundetected=0`, and trapper is not `ceiling_hider`, so this arm is dead at this call site either way. (6) `u.Flying` early-true; MZ_HUGE named. With `check_pit==false` the later pit arm is skipped, so Flying vs fallthrough both return TRUE — **no live `dosit` gap**. (7) pit named; not live (`FALSE`). (8) TRUE.

Hugs is the only named omit that would make C return FALSE here for a non-levitating, non-swallowed hero. JS then sits (same as the pre-SHA Levitation-only stub). The new `"You are sitting on air."` arm is therefore **unreachable from `dosit`** given the current helper: the helper’s only live FALSE paths at this site are swallow and sticky `u.Levitation`. Named, not this Must-fix — but the next Open (ustuck lap) must not ship before hugs, or a hugged hero would get lap instead of air (C never reaches `sit.c:422` when hugs already made `can_reach_floor` FALSE).

### Hallucination: “Match C `can_reach_floor`” while Levitation is a sticky stand-in

C `youprop.h:235–240`:

```
#define HLevitation u.uprops[LEVITATION].intrinsic
#define ELevitation u.uprops[LEVITATION].extrinsic
#define BLevitation u.uprops[LEVITATION].blocked
#define Levitation ((HLevitation || ELevitation) && !BLevitation)
```

There is no `u.Levitation` field in C. Worn levitation boots / ring go through `confer_oc_oprop` → `uprops[LEVITATION].extrinsic` and, in JS, the D-0976 flat `u.ELevitation` (`do_wear.js:284–288`). Potion / timeout levitation writes `u.HLevitation` (`timeout.js` `TIMEOUT_FLAT`, `eat.js`). Grep of scored `js/`: **no** `u.Levitation =` assignment. Sticky `u.Levitation` is read in many files and essentially never written.

JS `engrave.js:229–231` (unchanged this SHA):

```
    if (u.Levitation && !(Is_airlevel(u.uz) || Is_waterlevel(u.uz))) {
        return false;
    }
```

Worn boots / potion: `ELevitation` / `HLevitation` set, sticky unset → helper returns **TRUE** → `dosit` sits on the floor. C `Levitation` is TRUE → helper FALSE → `"You tumble in place."` **C-wrong.** Air/water with H/E: both sit (C exception). Accidental match, not proof the predicate is C.

This SHA **replaced** `if (u.Levitation) tumble` with a call to a helper that still uses `u.Levitation`. Swallow and the air/water exception are real gains. Dungeon H/E levitation tumble is **not** gained. The D-log’s private node “dungeon Levitation → tumble” only holds if the harness set the sticky field. That is not how the port stores levitation. Same class as review **19** / D-1060: sit claimed C `youprop.h` while the live bits live on H/E / `uprops[]`.

### Message clone diverges from the same macro

New `sit.js:491–497`:

```
function Levitation() {
    const u = game.u || {};
    if (u.Levitation) return true;
    return !!(((u.HLevitation | 0) || (u.ELevitation | 0))
        && !(u.BLevitation | 0));
}
```

Comment cites `(H||E)&&!B`. Sticky-first returns true **even when `BLevitation` is set** (floor trap `I_SPECIAL` via `float_vs_flight`, `polyself.js:423–426`). C `Levitation` is false when blocked — hero can reach the floor. The clone is also **dead for H/E**: the helper never returns false on H/E, so `dosit` never asks the clone. Dispatch is a real function, not a no-op; the Levitation **arm** of that function is a stand-in. Say so: this is “Match C dispatch, callee Levitation is not C.”

`Is_airlevel` / `Is_waterlevel` (`const.js:2961–2964`) compare `u.uz` to `game.air_level` / `game.water_level`. That matches the C macros’ dnum/dlevel test for the exception. Keep it. Do not special-case air/water in `dosit`.

### RNG

No `rn2`/`rnd`/`rn1`/`d` at `sit.c:414–421` or in `can_reach_floor`. Fortress path unchanged. Public `#sit` while swallowed or levitating is unhit.

## Hallucinations / overclaim

“Match C dosit so sitting uses can_reach_floor for swallow seats, levitation tumble, and sitting on air” is **true for the sit.c control structure and the swallow string**. It is **not** true that dungeon levitation tumble now follows C `Levitation`, that `"sitting on air"` can fire from `dosit`, or that the shared helper is C `engrave.c:187–214`. D-log “air/water Levitation may sit (helper)” is true **only** for sticky `u.Levitation`; H/E levitation already “sat” everywhere, including the dungeon. Map row D-1069 repeats the overclaim. Stamping the Open item Addressed is fair for swallow + the three-message envelope, **not** for the Levitation predicate.

This is **not** a stub callee in the D-1067 `mon_nam` sense: `can_reach_floor` is the imported function. The hallucination is treating a **partial helper’s sticky Levitation** as C `youprop.h`.

**Addressed:** D-1070 `9d3545c9`

## Density (§2b)

One Open cluster: C `sit.c:414–421` (the whole `if (!can_reach_floor(FALSE))` with three messages). Review **29** asked for that envelope, not another one-line sit peel. ~35 lines `sit.js`. Right size for the **call site**. Too small on the **callee**: the SHA did not touch `engrave.js` even though the queue line was “uses `can_reach_floor`” and the helper’s Levitation arm is the tumble/sit distinction. Not “finish `engrave.c`.” Hugs / ceiling_hider / MZ_HUGE correctly left named.

## Verification

Journal: private node swallow no-seats; dungeon tumble; air/water sit; lurker still sits after hide clear. green+strict PASS; cohort **9**/9 (8000/0900/0106/0107/4500/1500/1800/0060/2200). Path **public-unhit**. Green+cohort is regression cover, not proof of worn `ELevitation` / potion `HLevitation`. Cadence **#1355** (`8314cc94`) **44**/44 Scr **11405**/11405 RNG **100%** — fortress, not reach-sit proof.

C read of `sit.c:398–429`, `engrave.c:187–214`, `youprop.h:235–255`, `pline.c:366–374`/`425–432`, `mondata.c:654–658`, `mondata.h:43–45`, `skills.h:95`, `monattk.h:19`; JS `sit.js:491–497`/`1020–1039`, `engrave.js:219–244`, `do_wear.js:261–288`, `polyself.js:413–427`, grep `u.Levitation=` empty, hunk grepped FORCE/fs/seed.

## Actionable C-wrongs

1. **`can_reach_floor` Levitation (and `sit.js` `dosit` message `Levitation()`) must be C `youprop.h` `Levitation` ≡ `(HLevitation || ELevitation) && !BLevitation`.** Replace the helper’s sticky `u.Levitation` test; keep `!(Is_airlevel || Is_waterlevel)`. Drop sticky-true that ignores `BLevitation` in the sit clone (same macro). Do **not** rewrite `confer_oc_oprop` (LEVITATION already mirrors `ELevitation`, D-0976). Do **not** OR `uprops[LEVITATION]` as a substitute for skipping H/E — flats are written; the miss is the helper not reading them. Do **not** pull hugs / `ceiling_hider` / `MZ_HUGE` / pit teeter this iter. Do **not** rewrite every other `Levitation()` clone in the repo. Falsifier: `setworn` levitation boots (`ELevitation` set, sticky unset), not air/water, not swallow → `can_reach_floor(false)` is false → `"You tumble in place."` `ECMD_OK`; potion `HLevitation` same; `BLevitation` `I_SPECIAL` with H/E → sit proceeds; air/water with ELevitation still sits; swallow still `"There are no seats in here!"`. **Addressed:** D-1070 `9d3545c9`

Named omits (map / Open, not Must-fix): ustuck `!sticks` lap (`sit.c:422–429`); helper hugs **Addressed:** D-1071; `ceiling_hider` / `MZ_HUGE` / `uteetering` / `uescaped_shaft`; `Flying` sticky vs `(H||E||steed flyer)&&!B` (not live at `dosit`+`FALSE`); wizard getlin; `lay_an_egg`. Do not pop ustuck lap before hugs is in the helper (C order: hugs → air, not lap).

Do not restore Levitation-only `dosit` (skip swallow / skip air sit / skip air-water exception). Do not add `newsym` at the hider clear. Do not put trailing `confdir` inside shared `getdir`.

## Verdict

- Verdict: **QUALITY-RISK**
- Score: **6 / 10**
- One sentence: the sit.c three-message envelope and swallow string match C, but `can_reach_floor` still keys Levitation on unset sticky `u.Levitation`, so potion/boots `#sit` sits on the dungeon floor instead of tumbling.
