# Review 55 — 46775b20 — `role_init` quest-pm overlay + MS_NEMESIS Bell (D-1094)

## Metadata
- Full / short hash: `46775b20dd5ed2fea15804d0d21930b4ea1d317b` / `46775b20`
- Parent: `e0b68f1d` (D-1093). JS-touching since last dedicated review file creation (`685625fb`): D-1093, **this SHA**, D-1095, D-1096. This file audits **this SHA only**.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 18:02:43 +0200
- D-id: **D-1094**
- Stats: 16 files, +195 / −67 — `js/u_init.js` +51 (`role_init_quest_pm_fixup`); `js/monsters.js` +29 (`commit_pm_fixup` + `mons()` overlay); `js/makemon.js` +17 / −8 (leader_m_id / gender / mitem gates).
- Claims to close: Open queue `makemon.c` `m_initweap` MS_NEMESIS mitem `ptr.msound` not `urole.neminum` (named). Not S_ORC peace. Stamped **Addressed:** D-1094 `46775b20` on the archive row (filled by D-1095). Also stamped reviews **14** / **49** / **53**. `reviews/loop-2026-08-15/` has no open Bell-neminum Must-fix.
- JS / map: `u_init.js` / `monsters.js` / `makemon.js`. `c-js-map/data.md` makemon row names D-1094. PM_NINJA weap / `mon_learns_traps(ALL_TRAPS)` / dprince bribe / raven `BEC_DE_CORBIN` still named. `ldrgend` writer still absent (see fidelity).
- Prior reviews this SHA claims to close: **49** named omit 2; **53** named omit 2; **14** leftover neminum mitem.

## Intent vs deliverable

Git subject promises: “Match C role.c/makemon.c so the Bell of Opening follows ptr.msound after role_init, not urole.neminum.”

Static `msounds[]` still has Master of Thieves as `MS_LEADER` (Rogue leader). Tourist nemesis is the same mndx. C `role_init` writes `mons[neminum].msound = MS_NEMESIS` (and hostile/nasty/stalk / `M3_WANTSARTI|WAITFORU`, clears `M2_PEACEFUL`). Old JS mitem gated `ptr.mndx === urole.neminum`, which accidentally gave Tourist the Bell **and** would give it to a silent mndx-match, while missing a synth `MS_NEMESIS` that is not `neminum`.

The diff **does** C’s mutation analog: `commit_pm_fixup` on `game.pm_fixup`; `mons()` reads overlay for `msound` / `mflags2` / `mflags3` / `maligntyp`; `role_init_quest_pm_fixup` after pantheon, before nemesis gender. Leader: `MS_LEADER`, `M2_PEACEFUL`, `M3_CLOSE`, `maligntyp = alignmnt*3`. Guardian: `M2_PEACEFUL` + maligntyp (no msound write — C none). Nemesis: `MS_NEMESIS` + flag surgery. `makemon` mitem is `ptr.msound == MS_NEMESIS`. `leader_m_id` / gender add `ptr.msound == MS_LEADER|NEMESIS` beside `ldrnum`/`neminum` (`quest_info` analog).

It does **not** insert `PM_NINJA` weap. Named. It does **not** call `mon_learns_traps(ALL_TRAPS)` for leader/nemesis (`makemon.c:1288–1289`). Named. It does **not** write `quest_status.ldrgend` (C `role.c:2036–2039` sits **in** the claimed overlay block). Comment says ldrgend “stays in `role_init_nemesis_gender`”; that function only sets **nemgend**. See fidelity.

`resetGame()` assigns `game = {}` (`gstate.js:6–8`), so overlay does not leak Tourist-thief `MS_NEMESIS` into a later Rogue session. That is the C fresh-process analog. Generated `msounds[]` stay the `monsters.h` baseline.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `role_init_quest_pm_fixup` | C body, **new** | `role.c:2027–2056` flag/msound/maligntyp writes |
| `commit_pm_fixup` / `mons()` overlay | **clone** of in-place `mons[]` mutate | per-game; not a second table |
| `makemon` mitem Bell | C body, **retouched** | `makemon.c:1378–1379`; was `neminum` |
| `leader_m_id` / gender msound gates | C body, **retouched** | `makemon.c:1253–1273`; `quest_info` ≡ `urole.ldrnum/neminum` (`questpgr.c:31–41`) |
| `role_init_nemesis_gender` | C sibling, **untouched** | only `nemgend`; `rn2(100)<50` |
| `ldrgend` assignment | C in overlay block, **still absent** | makemon reads `quest_status?.ldrgend\|0` |
| `mon_learns_traps(ALL_TRAPS)` | C sibling, **named omit** | after gender |
| PM_NINJA weap | C sibling, **named omit** | between priest and guardian |
| `quest_info` | C callee, **not imported** | inlined as `urole.ldrnum` / `neminum` |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched. Overlay itself has **no RNG**. Gender `rn2(100)` stays in the existing nemesis function, after overlay, like C nemgend after nemesis flag writes. Leader `rn2(100)` for ungendered `ldrgend` is still not burned (C would, if `!is_male && !is_female && !is_neuter`).

## Constitution / playbook

Grep of the three JS hunks: no trace-index gates, no recorded coordinates, no `fastforward` burns. Overlay is C `role_init` mutation, not a seed-shaped “Tourist thief = 37” gate. Contest Rule #2: no Node builtins. `mons()` still builds a plain object from `js/generated/` tables.

## C ↔ JS fidelity

### Overlay fields — call-for-call with C `role_init`

C `role.c:2021–2056`: `alignmnt = aligns[flags.initalign].value`; then three `if (…num != NON_PM)` blocks.

Leader (`2028–2033`): `pm->msound = MS_LEADER`; `mflags2 |= M2_PEACEFUL`; `mflags3 |= M3_CLOSE`; `maligntyp = alignmnt * 3`. JS `1731–1738`: `mons(ldr)` then those four writes via overlay. `is_male`/`is_female`/`is_neuter` read `mflags2` (`monsters.js:665–671` ≡ `mondata.h`). Overlay does **not** touch `M2_MALE`/`M2_FEMALE`, so gender macros still see the generated bits. Match.

Guardian (`2043–2046`): `mflags2 |= M2_PEACEFUL`; `maligntyp = alignmnt * 3`. No msound. JS `1741–1746` same.

Nemesis (`2050–2056`): `msound = MS_NEMESIS`; `mflags2 &= ~M2_PEACEFUL`; `mflags2 |= M2_NASTY|M2_STALK|M2_HOSTILE`; `mflags3 &= ~M3_CLOSE`; `mflags3 |= M3_WANTSARTI|M3_WAITFORU`. **No** maligntyp write. JS `1749–1755` same. `commit_pm_fixup` spread over `prev` then `patch` does not invent a maligntyp for nemesis unless patch has one. Match.

`alignmnt` uses `aligns[game.flags.initalign]` like C. Arc lawful → `maligntyp 3` on Carnarvon. Journal canary.

C `role.c:2034–2039` sits **inside** the leader `if`, after the four flag writes:

```
        svq.quest_status.ldrgend =
            is_neuter(pm) ? 2 : is_female(pm) ? 1 : is_male(pm)
                                                        ? 0
                                                        : (rn2(100) < 50);
```

JS overlay never writes `ldrgend`. `role_init_nemesis_gender` only writes `nemgend` (`u_init.js:1760–1771`, `rn2(100)<50` when the nemesis is unsexed). Comment at the overlay (`u_init.js:1725`) is therefore a lie: `ldrgend` is not “staying” in that function; it is omitted. Stock leaders are `is_male` or `is_female` first in `makemon` (`2119–2124`), so they never read `ldrgend`. An unsexed `ldrnum` would burn `rn2(100)` in C here and not in JS. Named, not a live stock RNG miss.

C `questpgr.c:31–41`: `quest_info(MS_LEADER)` returns `gu.urole.ldrnum` (same for NEMESIS/`neminum`, GUARDIAN/`guardnum`). JS inlines those fields. That is a **C callee expansion**, not a stub.

### `mons()` snapshot vs C pointer

C `mtmp->data` is `&mons[mndx]`. After `role_init`, every reader sees the mutated struct. JS `mons()` returns a **new** object each call with overlay applied at read time. `makemon` takes `ptr = mons(mndx)` **after** `setup_role_race_from_rc`. Spawned `mtmp.data` therefore has Tourist-thief `msound==37`. A stale `data` object created **before** overlay would not update; `role_init` runs at newgame before `makemon`. Analog, not a silent second lava-style clone of a different predicate.

### mitem / leader_m_id / gender

C `makemon.c:1378`: `else if (ptr->msound == MS_NEMESIS) mitem = BELL_OF_OPENING;` — **no** mndx check. JS `2257–2259` same. Tourist Master of Thieves: overlay 37 → Bell. Rogue Master of Thieves: overlay 36 (leader) → **no** Bell; assassin `neminum` is 37 → Bell. Silent `neminum` mndx would no longer get Bell — C neither. Synth HUMAN+`MS_NEMESIS` would — C too.

Else-if order around the Bell: C Vlad candelabrum is **before** this cham/WoY/ghost/Croesus chain (`makemon.c` earlier); JS still sets Vlad `mitem` before the chain (`2238`). Croesus TWO_HANDED_SWORD is `else if` **before** MS_NEMESIS; Pestilence POT_SICKNESS **after**. A Croesus is not `MS_NEMESIS`. Wizard SPE_DIG on first earth WoY stays named omit (`1369–1373`). `mongets` after `mitem != STRANGE_OBJECT && allow_minvent` — JS `mitem >= 0 && allow_minvent_local`. Unchanged this SHA except the nemesis predicate.

C `1253–1254` / `1270–1273`: `ptr->msound == MS_LEADER && quest_info(MS_LEADER) == mndx`. `quest_info(MS_LEADER)` is `gu.urole.ldrnum` (`questpgr.c:36–37`). JS `ldrnum` + msound is that macro expanded. Same for NEMESIS/`neminum`. A poly form that is `MS_LEADER` but not `ldrnum` does **not** steal `leader_m_id`. C same.

Gender: C `is_female` / `MM_FEMALE` / `is_male` / `MM_MALE` **before** the ldrgend/nemgend else-ifs. JS same order (`2119–2129`). Stock gendered leaders never reach `ldrgend`. `ldrgend` unread-or-zero only matters for a leader with none of M2_MALE/FEMALE/NEUTER. C would still **assign** `ldrgend` (and maybe `rn2(100)`) at `role_init`. JS never writes it. Pre-existing hole **inside** the C line range this SHA cited. Comment is wrong. Not Must-fix: stock roles do not burn that `rn2`; makemon still genders via `is_male`/`is_female`.

Nemesis gender **does** run after overlay (`role_init_nemesis_gender` uses `mons(neminum)` so `is_male` sees post-overlay `mflags2`). Overlay does not add `M2_MALE`. C uses the mutated `pm` for the same ternary (`role.c:2059–2060`). `rn2(100)<50` only if the nemesis is not inherently sexed. Unchanged this SHA; order relative to overlay now matches C (mutate first).

`peace_minded` / `set_malign` already read `ptr.msound` (D-1079). Overlay makes Tourist thief `always_hostile` + `MS_NEMESIS` (not `MS_LEADER −20`). Rogue thief stays `always_peaceful` + `MS_LEADER −20`. That is why overlay had to ship with the mitem gate — otherwise Tourist thief stays table `MS_LEADER` and `set_malign` would give −20 to the nemesis. One cluster, not two hypotheses.

`always_peaceful` / `always_hostile` read `mflags2` (`M2_PEACEFUL` / `M2_HOSTILE`). Overlay ORs those bits **before** `makemon` calls `peace_minded`. Stock Tourist thief therefore returns at `always_hostile` and never reaches the D-1079 `MS_NEMESIS → false` line — C same (`role.c` sets `M2_HOSTILE` then `peace_minded` sees `always_hostile` first, `makemon.c:2272–2279`). The msound short-circuit is for poly/synth that dropped the mflags2 bits. Overlay still has to set `msound=37` for **mitem**, which does **not** look at `always_*`.

`setup_role_race_from_rc` calls overlay after `urole` is copied from `roles[]` (`u_init.js:1613–1674`). C copies `gu.urole = roles[flags.initrole]` then mutates `mons[]` (`role.c:2023–2056`). JS `ldrnum`/`neminum`/`guardnum` come from that copy. Sparse `ldrnum == NON_PM` skips the leader block like C. `role_init_cleric_spe_light` between pantheon and overlay is a JS-only Priest spell-skill write (pre-existing); it has no RNG and does not touch `mons()`.

## Hallucinations / overclaim

“Match C so the Bell of Opening follows ptr.msound after role_init, not urole.neminum” is **true for overlay + mitem + leader_m_id/gender msound gates.** It is **not** true that `ldrgend` is chosen in `role_init_nemesis_gender`, that `mon_learns_traps(ALL_TRAPS)` ran, or that `quest_info` exists as a JS function.

This is **not** “Match C dispatch, callee is a stub.” `mongets(BELL_OF_OPENING)` was already real. The miss was the gate and the `mons[]` mutation the gate reads. Stamping **Addressed:** D-1094 is fair. Hash `46775b20` is on the archive row (filled by D-1095).

## Density (§2b)

One Open cluster: C `role_init` quest-pm writes (the reason static `msounds[]` lied for Tourist) plus the three `makemon` readers of that field. ~80 executable lines across two modules that already call each other. Right size. Ninja weap / ALL_TRAPS left named. Not “finish `role.c`.”

## Verification

Journal: private canary **30**/30 (Tourist thief 37 hostile Bell; reset → 36 peaceful; Rogue thief stays leader / assassin Bell; Arc minion + Carnarvon maligntyp 3); green+strict seed8000/0900; cohort **20**/20 (incl. 0361/0367/0373/0360/1800/1500/0014/2200/4500) + strict 1800/0361/0367/0360/0014/2200/0004. Path **public-unhit** (Tourist quest nemesis spawn). Quest tours hit leaders (overlay MS_LEADER + peace), not Tourist-thief Bell. Cadence **#1395** **44**/44.

C read of `role.c:1980–2061`, `makemon.c:1252–1279` / `1369–1382`, `questpgr.c:31–41`, `monflag.h:51–53`; JS `u_init.js:1671–1771`, `monsters.js:184–218`, `makemon.js:2105–2131` / `2255–2261`; hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| Tourist `PM_MASTER_OF_THIEVES` | `msound=37`, hostile, Bell | **same** (overlay) |
| Rogue same mndx | `msound=36`, peaceful, no Bell | **same** |
| Rogue assassin | `msound=37`, Bell | **same** |
| resetGame then Rogue | fresh `mons[]` | **`pm_fixup` gone** |
| Arch Priest `leader_m_id` | msound 36 && ldrnum | **same** |
| `ldrgend` at role_init | written (maybe `rn2`) | **unset** (named) |

## Actionable C-wrongs

None that Must-fix this next iter. Overlay + mitem match `role.c` / `makemon.c` at the claimed gates.

Named omits / do-nots (map / Open, not Must-fix):

1. Write `quest_status.ldrgend` in the leader overlay block (`role.c:2036–2039`); do not claim it lives in `role_init_nemesis_gender`.
2. `mon_learns_traps(mtmp, ALL_TRAPS)` when `ptr.msound == MS_LEADER \|\| MS_NEMESIS` (`makemon.c:1288–1289`).
3. PM_NINJA weap between priest and guardian. Drown/`mhitu` `split_mon` later **Addressed:** D-1095 `a86a7111` for rust/minliquid/uhitm AD_COLD only.

Do not restore mitem `urole.neminum`. Do not mutate generated `msounds[]` in place (leak across `resetGame`). Do not skip overlay and only change the mitem compare (Tourist thief would stay `MS_LEADER` for peace/malign).

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `role_init` now overlays quest leader/guardian/nemesis `msound` and flags like `role.c`, so Tourist Master of Thieves is `MS_NEMESIS` and gets the Bell from `ptr.msound`, not `neminum`.
- Must-fix stays empty for this SHA; `ldrgend` stays a named comment-lie, not a live stock RNG miss.
