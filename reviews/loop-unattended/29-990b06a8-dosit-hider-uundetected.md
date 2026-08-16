# Review 29 — 990b06a8 — `dosit` hider `u.uundetected` clear except trapper (D-1068)

## Metadata
- Full / short hash: `990b06a88ae049d49d7e12cbba6fede351762335` / `990b06a8`
- Parent: `dee3b2c6` (docs-only queue refill; last `reviews/loop-unattended/` file is `b84af56a` reviews **27**/**28**). JS-touching since that file: **this SHA only**. Docs-only in the same window: `dee3b2c6` (refill to 12 Open rows after the empty-queue halt; not a JS audit).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 09:29:11 +0200
- D-id: **D-1068**
- Stats: 11 files, +126 / −64 — `js/sit.js` +16 / −6 (header + `is_hider` import + `PM_TRAPPER` + one `if` that does not return). Live JS change is the three-predicate clear.
- Claims to close: Open queue `sit.c` `dosit` hider: `u.uundetected && is_hider` except trapper. Not `can_reach_floor` / ustuck. Stamped **Addressed:** D-1068 on the archive row **without** the short hash (chicken-egg). This review commit fills `990b06a8`.
- JS / map: `sit.js` `dosit`; `c-js-map/data.md` sit row now names D-1068 and still omits `can_reach_floor` / ustuck / `uteetering` / wizard getlin / `lay_an_egg`.
- Prior reviews this SHA claims to close: **28** ACCEPT next was remaining `dosit` early gates (hider / reach / ustuck). D-1033 listed hider as a named `dosit` omit, not a numbered Must-fix. `reviews/loop-2026-08-15/` has no open hider Must-fix.

## Intent vs deliverable

Git subject promises: “Match C dosit so sitting as a ceiling hider clears uundetected except for trapper.” Body is empty beyond Co-authored-by. D-log: `#sit` never dropped a ceiling hider. C `sit.c` after the usteed return: if `u.uundetected && is_hider(youmonst.data) && u.umonnum != PM_TRAPPER` then `u.uundetected = 0` (“no longer on the ceiling”). Trapper hides on the floor and stays undetected. No `newsym` at this locus.

C `sit.c:406–412` is usteed `You`+`mon_nam` `return ECMD_OK`, then the hider clear **with no return**. C `sit.c:414–421` is `!can_reach_floor(FALSE)` → swallow / Levitation / sit-on-air, `return ECMD_OK`. C `sit.c:422–429` is ustuck `!sticks` lap. C `mondata.h:36–38` is `is_hider` = `M1_HIDE`. C `mondata.h:43–45` is `ceiling_hider` (clinger except mimic, or flyer) — **not** the predicate this arm uses. C `engrave.c:187–214` is `can_reach_floor`: among other gates, `u.uundetected && ceiling_hider(data)` returns FALSE, then `Flying || msize >= MZ_HUGE` returns TRUE. Clearing hide **before** that call is why a lurker who sits is then allowed to reach the floor (Flying) rather than “sitting on air” because they are still on the ceiling.

The queue line was exactly that three-line clear and explicitly excluded reach / ustuck. The diff adds the same predicate after the usteed return, before the Levitation-only stub, imports shared `is_hider`, and indexes `PM_TRAPPER` from `monsterNames`.

It does **not** port `can_reach_floor(FALSE)` swallow / sit-on-air. Named, and excluded from this Open line. It does **not** port ustuck lap. Named. It does **not** add `newsym`. Correct: C has none here (`mhitu.c:577` is a different reveal). It does **not** port `#monster` `dohide` / `youhiding` that **sets** `u.uundetected` for hiders. Named in `polyself.js` `domonability`.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `dosit` hider arm | C call site, new | `sit.c:410–412`; after usteed, before `can_reach_floor`; **no return** |
| `is_hider` | imported C callee | `mondata.h:38` `M1_HIDE`; `monsters.js:312–315` |
| `PM_TRAPPER` | imported C enum | `monsters.h` `TRAPPER`; JS `monsterNames.indexOf` → **99** (extractor order) |
| `u.uundetected = 0` | C field write | no `newsym`; continues into reach |
| `ceiling_hider` | C sibling, **not used** | `mondata.h:43–45`; would skip mimics; C `dosit` does not use it |
| `can_reach_floor` | C next gate, **not this SHA** | `engrave.c:187–214`; JS `dosit` still Levitation-only; `engrave.js` still defers `uundetected && ceiling_hider` |
| `dohide` / `youhiding` | C setter, **not this SHA** | `polyself.c:1865–1873`; `cmd.c:889–913` `domonability` hide arm |
| `hideunder` | C callee, **not this SHA** | `mon.c`; JS sets hero `uundetected` only for eel / `hides_under` (M1_CONCEAL), not M1_HIDE |
| usteed `mon_nam` | imported, **not this SHA** | D-1067; early-return still skips the clear |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names in control flow / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched.

## Constitution / playbook

Grep of the `js/sit.js` hunk: no trace-index gates, no recorded coordinates, no `fastforward` burns. The predicate is C’s three-clause `if`, not a seed-shaped polyform. Contest Rule #2: no Node builtins in scored code.

## C ↔ JS fidelity

### Call site — after usteed, no return, no `newsym`

C `sit.c:406–412`:

```
    if (u.usteed) {
        You("are already sitting on %s.", mon_nam(u.usteed));
        return ECMD_OK;
    }
    if (u.uundetected && is_hider(gy.youmonst.data)
        && u.umonnum != PM_TRAPPER) /* trapper can stay hidden on floor */
        u.uundetected = 0; /* no longer on the ceiling */
```

JS (`sit.js:996–1009`): `if (u.usteed)` → `pline` + `return ECMD_OK`; then `if (u.uundetected && is_hider(game.youmonst?.data) && (u.umonnum | 0) !== PM_TRAPPER) u.uundetected = 0`. No `newsym`. No return. Match for the gate.

Usteed still skips the clear: C returns before the `if`. JS same. Private node claimed that. Match.

C then does `can_reach_floor` (`414–421`) then ustuck (`422–429`). JS still jumps to Levitation-only (`sit.js:1010–1013`) and still names reach / ustuck deferred. **A levitating hider** in C: hide is already cleared, then `can_reach_floor` hits `Levitation && !air && !water` → FALSE → `"You tumble in place."` JS: clear, then the Levitation stub tumbles. Same order: drop ceiling hide **even when sit then fails**. That is why C writes the flag before the reach test, not after a successful sit.

### `is_hider` is M1_HIDE, not `ceiling_hider`

C `mondata.h:36–45`:

```
#define is_hider(ptr) (((ptr)->mflags1 & M1_HIDE) != 0L)
#define ceiling_hider(ptr) \
    (is_hider(ptr) && ((is_clinger(ptr) && (ptr)->mlet != S_MIMIC) \
                       || is_flyer(ptr))) /* lurker above */
```

Pinned `monsters.h` M1_HIDE set: small/large/giant mimic; rock/iron/glass piercer; lurker above; trapper. Only those eight.

- Lurker: `M1_HIDE | M1_FLY` → `is_hider` and `ceiling_hider` (flyer). Sit clears hide. Then `can_reach_floor`: `uundetected` is 0 so the ceiling-hider floor-block does not fire; `Flying` returns TRUE. Sit proceeds.
- Piercers: `M1_CLING | M1_HIDE`, not `S_MIMIC` → ceiling hiders. After clear, not Flying, `check_pit` is FALSE → `can_reach_floor` TRUE. Sit proceeds.
- Trapper: `M1_HIDE` only (no FLY, no CLING) → `is_hider` true, `ceiling_hider` false. C **keeps** `uundetected` via `umonnum != PM_TRAPPER`. Floor hider stays hidden while sitting.
- Mimics: `is_hider` true; `ceiling_hider` false (small mimic has no CLING; large/giant are clingers but `mlet == S_MIMIC` is excluded). C `dosit` still uses `is_hider`, so a mimic with `u.uundetected` set would clear. Mimics normally hide via `m_ap_type`, not `uundetected` (`polyself.c:1865–1868`). Same predicate in JS.

JS `is_hider` (`monsters.js:312–315`) is `((ptr?.mflags1 ?? 0) & M1_HIDE)` with `M1_HIDE = 0x00000100` matching `monflag.h:93`. Imported callee, not a sit.js clone. `PM_TRAPPER` is `monsterNames.indexOf('PM_TRAPPER')` → 99, same extractor index as C `PM_TRAPPER`. Not −1. Match.

Using `ceiling_hider` here would **diverge**: mimics with `uundetected` would not clear; C would. The SHA copies `is_hider` + `!= PM_TRAPPER`. Correct.

### Why the clear must precede `can_reach_floor`

C `engrave.c:191–207`: swallow / hugging ustuck / Levitation (not air/water) → FALSE; unskilled riding → FALSE; **then** `u.uundetected && ceiling_hider` → FALSE; **then** Flying or huge → TRUE.

If `dosit` did not clear hide first, a lurking hero’s `can_reach_floor(FALSE)` would be FALSE (still on the ceiling) and the message would be `"You are sitting on air."` (not Levitation, not swallow). C clears first so that path is not taken. JS `dosit` does not call shared `can_reach_floor` yet (`engrave.js:237` still comments `uundetected + ceiling_hider deferred`), so a lurking hero **already sat** before this SHA; the new work is dropping the flag. Once the next Open item wires `can_reach_floor` into `dosit`, this order is load-bearing. Shipping the clear **before** that wire is the C order, not a leftover.

JS Levitation-only stub is still wrong for swallow / sit-on-air / air-level Levitation. Named Open head. Not introduced by this SHA.

Lurker `msize` is `MZ_HUGE` (`monsters.h:985`) **and** `M1_FLY`. After hide is cleared, either `Flying` or `msize >= MZ_HUGE` would make C `can_reach_floor` TRUE (`engrave.c:206–207`). JS `engrave.js:238–239` already returns true for `u.Flying` and still names the huge-size arm as a deferral that would also return TRUE. For a sitting lurker those two C true-paths agree with “keep sitting”; they do not excuse leaving swallow / sit-on-air out of `dosit`.

### RNG

No `rn2`/`rnd`/`rn1`/`d` at this locus. No display RNG. Fortress path unchanged.

### Setter is not this SHA — not a stub callee

C `cmd.c:889–913` `domonability`: `might_hide = is_hider(uptr) || hides_under(uptr)`; hide+web `yn_function`; later `dohide()`. C `polyself.c:1860–1873`: if already hidden, `youhiding` and return; mimic → `m_ap_type = M_AP_OBJECT`; else `u.uundetected = 1`; `newsym`; `youhiding`.

JS `domonability` (`polyself.js:1143–1160`) is breathe / unicorn horn / reflexive pline. Named omit: `hide/web/...`. JS `hideunder` (`mon.js:1686–1716`) can set hero `u.uundetected` for eel / `hides_under` (M1_CONCEAL: scorpion etc.), **not** for M1_HIDE ceiling forms. A player cannot reach the lurker/piercer sit arm without a test harness until `dohide` is ported.

This SHA does **not** dispatch to `dohide`. `is_hider` is the real macro. The D-log’s private node force-sets `uundetected` and `umonnum`. Fair for the sit gate. The setter remains a named omit on `domonability`, not a Must-fix against this three-line `if`.

`set_uasmon` (`polyself.js:443–450`) points `youmonst.data` at `mons[umonnum]`, so `is_hider(data)` and `umonnum == PM_TRAPPER` stay in sync on the poly path C uses. Optional chaining `game.youmonst?.data` is a JS null-guard; `is_hider(undefined)` is false (`mflags1` 0). Unpolyd humans are not M1_HIDE. `(u.umonnum | 0)` is the same integer coerce this file already uses for `PM_GREMLIN`. Match in practice.

## Hallucinations / overclaim

“Match C dosit so sitting as a ceiling hider clears uundetected except for trapper” is **true for `sit.c:410–412`**: `is_hider` + `umonnum != PM_TRAPPER`, no return, no `newsym`, after usteed, before the reach stub. It is **not** true that `dosit` is now C for `can_reach_floor` / ustuck, that `#monster` hide works, that `engrave.js` `can_reach_floor` implements `ceiling_hider`, or that sitting as a hider is on any public screen.

This is **not** “Match C dispatch, callee is a stub.” `is_hider` is the shared `M1_HIDE` predicate. The missing piece is the **setter** (`dohide`), which this subject does not claim.

Stamping the Open item **Addressed:** D-1068 is fair for the three-predicate clear. Fill hash `990b06a8` in this commit (archive row).

D-log “Fix: … before the Levitation / `can_reach_floor` stub” is honest that reach is still a stub. Map row names D-1068 and keeps the remaining `dosit` omits. Match.

## Density (§2b)

Too small: one `if` (plus import/comment). Playbook §2b “one deferred if alone.” Review **28** already said the next port should take remaining `dosit` early gates together, not another one-line sit peel.

The live Open line after `dee3b2c6` refill **forbade** combining: “Not `can_reach_floor` / ustuck.” Queue law is “Do not combine items.” The port followed the queue. The split happened at refill, not in this SHA. Density is a process miss on the queue split, not a C-wrong: do not enqueue “make the peel bigger.” Next port should take Open head `can_reach_floor(FALSE)` as C `sit.c:414–421` (swallow / Levitation including air-water exception / sit-on-air), not another adjacent one-liner if the queue line already is that whole `if`.

## Verification

Journal: private node lurker/piercer `uundetected` 1→0; trapper stays 1; human (not hider) stays 1; usteed skips the clear. green+strict PASS; cohort **9**/9 (8000/0900/0106/0107/4500/1500/1800/0060/2200). Path **public-unhit**. Fair: no scored `#sit` while polyd-hidden. `#monster` hide is still stubbed, so the public suite cannot grow this arm without that omit.

seed0106/0107/4500 exercise `#sit` but not as M1_HIDE. Cohort is a regression check, not a hide-drop proof.

Cadence still **#1350** **44**/44 (this is not a %5 score iter; next @**#1355**). C read of `sit.c:398–429`, `mondata.h:36–45`, `monsters.h` mimic/piercer/lurker/trapper flags, `engrave.c:187–214`, `cmd.c:889–913`, `polyself.c:1860–1873`, JS `sit.js:996–1014`, `monsters.js:136`/`312–315`, `engrave.js:225–244`, `polyself.js:443–450`/`1143–1160`, `mon.js:1686–1716`. Grep of the JS hunk: no `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / seed names in control flow.

## Actionable C-wrongs

None in the `dosit` hider clear this SHA shipped.

Named omits (map / Open, not Must-fix): `can_reach_floor(FALSE)` swallow / sit-on-air / air-level Levitation; ustuck lap; `uteetering` / `uescaped_shaft`; wizard getlin; `lay_an_egg`; `engrave.js` `can_reach_floor` `ceiling_hider` gate; `domonability` `dohide` / `youhiding` / hide+web `yn`.

Do not skip `dosit` hider clear. Do not clear trapper `uundetected`. Do not add `newsym` at this locus. Do not swap in `ceiling_hider` for `is_hider`.

Do not put trailing `confdir` inside shared `getdir`.

## Verdict

- Verdict: **ACCEPT**
- Score: **7 / 10**
- One sentence: the hider gate is C `sit.c:410–412` (`is_hider` + trapper exception, no `newsym`, clear before reach), but `#monster` still cannot set the flag and `dosit` still fakes `can_reach_floor` with Levitation-only.
- Must-fix stays empty; next port pops Open `can_reach_floor(FALSE)`.
