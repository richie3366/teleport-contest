# Review 443 — f0cb5942 — zap.c bhit doorlock WAN_STRIKING/SPE_FORCE_BOLT (D-1482)

## Metadata
- Full / short hash: `f0cb59426df27c00b2f011f75f7ce900cf0a36d4` / `f0cb5942`
- Parent: `4642b8b1` (D-1481). This file audits **this SHA only** (seventh of nine `js/` commits since review **436**). Archive **Addressed:** D-1482 `f0cb5942` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 15:43:02 +0200
- D-id: **D-1482**
- Stats: 10 files, +252 / −57 — `js/lock.js` +151; `js/zap.js` +43.
- Claims to close: Open `zap.c` `bhit` doorlock WAN_STRIKING/SPE_FORCE_BOLT (named from D-1475 / review **436**). Not LOCKING. `reviews/loop-2026-08-15/` has no unpaid striking-doorlock Must-fix.
- JS / map: `lock.js` `doorlock` / local `mb_trapped`; `zap.js` `bhit`. Callees `wake_nearto`, `add_damage`, `pay_for_damage`. `c-js-map/turns.md`. muse `mbhit` named.
- Prior reviews this SHA claims to close: **436** named STRIKING doorlock after LOCKING; **422** named STRIKING crash after OPENING.

## Intent vs deliverable

Git subject promises: “Match C zap.c bhit / lock.c doorlock so a WAN_STRIKING/SPE_FORCE_BOLT zap that hits a locked or closed door crashes it open instead of skipping the door.”

C `bhit` `:4056–4074`: `ZAPPED_WAND && (IS_DOOR || SDOOR)` then OPENING/LOCKING/**STRIKING**/KNOCK/WIZARD_LOCK/**FORCE** `doorlock`; `learnwand` iff `cansee` **or** (`WAN_STRIKING && !Deaf`); `D_BROKEN` shop `add_damage(SHOP_DOOR_COST)` then after the walk `:4129–4130` `pay_for_damage("destroy")`. Callee `lock.c` `doorlock` `:1201–1253`: SDOOR STRIKING appear then **continue** (`:1117–1126`); locked|closed + trapped → `D_NODOOR` explode (`:1207–1232`) or smash `D_BROKEN` (`:1234–1250`); `mb_trapped` if `m_at`; loudness 40/20 then `:1260–1265` `wake_nearto` + shop `add_damage(0)`. Open/broken `res=FALSE`.

Old JS: `bhit` called `doorlock` only for OPENING/KNOCK/LOCKING; SDOOR STRIKING returned false; `doorlock` defaulted STRIKING to false.

The diff **does** wire STRIKING/FORCE in `bhit`, port smash/explode + SDOOR continue, `!Deaf` learnwand, shop `D_BROKEN`. It **does not** add muse `mbhit`. Named. It **does not** call `mondied` / `mon_learns_traps` inside `mb_trapped`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `bhit` doorlock WAN_STRIKING/SPE_FORCE | C `:4056–4074`, **wired this SHA** | |
| `doorlock` STRIKING/FORCE body | C `:1201–1253`, **wired this SHA** | SDOOR `:1117–1126` |
| `mb_trapped` | C `monmove.c` `:54–74`, **local clone** | mondied / `mon_learns_traps` named |
| `wake_nearto` | C `mon.c`, **imported live** | |
| `add_damage` / `pay_for_damage` | C `shk.c`, **imported live** | D-0948 / D-1178 |
| `Deaf` | C `youprop.h:125`, **clone** | H\|\|E\|\|uroleplay; sticky extra |
| `Unaware` | C `youprop.h:399`, **clone** | faint named |
| `in_rooms` / `SHOP_DOOR_COST` 400 | C, **imported live** | |
| `recalc_block_point` ≡ `unblock_point` | C, **imported live** | existing port stand-in |
| muse `mbhit` doorlock | C `muse.c`, **named omit** | |
| `Soundeffect` | C, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Grep `FORCE` is `SPE_FORCE_BOLT`. Rule #2 clean. **New gameplay RNG:** `mb_trapped` `rnd(15)` when a monster stands on a trapped door. Smash/explode without `m_at` has no dice. Public fortress does not zap striking at a door.

## C ↔ JS fidelity

`bhit` now includes STRIKING/FORCE next to OPENING/LOCKING. `learnwand` if `cansee || (WAN_STRIKING && !Deaf())`. SPE_FORCE_BOLT does **not** get the `!Deaf` extra. Match `:4065–4066`. Shop: `doormask === D_BROKEN` (not `D_NODOOR` explode) + `in_rooms` → `add_damage(SHOP_DOOR_COST)` then after `tmp_at END` `pay_for_damage("destroy", false)`. Match `:4067–4070` / `:4129–4130`. **Callee `doorlock` is not a stub.** Hallucination check: “Match C doorlock STRIKING smash” while **`:1201–1253` is ported** is **not** a dispatch-stub lie.

SDOOR `:1117–1126`: STRIKING/FORCE appear `D_CLOSED|(mask&D_TRAPPED)` then **break** into the striking case (smash or explode). OPENING still early-returns. LOCKING still SDOOR false. Match. Old JS returned true for SDOOR OPENING only and never continued — that C-wrong is gone.

Trapped locked/closed: snapshot `sawit` (`m_at` → `canseemon` else `cansee`), `D_NODOOR`, unblock, `newsym`, `seeit`, then `mb_trapped` or loudness 40 + KABOOM/`You_hear` distant iff `distu>7*7`. JS `dist2_lock` is C `distu`/`mdistu` (`hack.h:1531–1532`). Empty-door explode does **not** `mondied`. Match keep path.

Untrapped locked/closed: `D_BROKEN`, recalc, crash pline / `You_hear` crashing, `vision_recalc` if `vision_full_recalc`, loudness 20. `pline_The("door crashes open!")` ≡ JS `"The door crashes open!"`. Match `:1234–1250`. Open/broken/nodoor: `res=false`. Match `:1251–1252`.

Loudness>0: `wake_nearto` + shop `add_damage(0)` (not `SHOP_DOOR_COST` — that is the **caller**). Match `:1260–1265`. `picking_at` still `stop_occupation`+`reset_pick` if `res`. Match.

`mb_trapped` clone: verbose KABOOM/`You_hear`, `wake_nearto(mx,my,7*7)`, `mstun=1`, `mhp-=rnd(15)`. **Keep path matches `:56–65`.** Death: C `mondied` then maybe lifesave then **always** `mon_learns_traps(TRAPPED_DOOR)` if still alive. JS zeros `mx/my` and returns true — **diverges**. D-log names it. Playbook: diverging clones are C-wrongs; this review leaves it as **named omit** because the shipped smash/explode-without-mon and survivor path match, and inventing `mondied` is a separate cluster (D-log “Not this iter”). Do **not** Must-fix it in the same breath as “STRIKING should smash” — that arm is live.

## Hallucinations / overclaim

Subject says a striking/force zap that hits a locked or closed door crashes it open instead of skipping the door. **True:** smash `D_BROKEN`+learnwand; SPE skip makeknown; trapped explode `D_NODOOR`; SDOOR appear then smash/explode; Blind `!cansee` WAN_STRIKING `!Deaf` still learns; shop `D_BROKEN` bill; OPENING/LOCKING regression. **False until named** for `mondied`/`mon_learns_traps`, `Soundeffect`, muse `mbhit`. Stamping **Addressed:** D-1482 for **bhit wire + STRIKING `doorlock` body** is fair. Do **not** stamp “Match C `mondied` on a door trap.” Do **not** treat fortress PASS as a door smash.

## Density

One `doorlock` otyp pair plus the `bhit` caller C uses (learnwand/`!Deaf`/shop). ~150 lines. Playbook §2b. Did not glue `mbhit`. Acceptable.

## Branch-by-branch confirm

1. Lateral WAN_STRIKING + locked: “The door crashes open!”, `D_BROKEN`, learnwand if cansee or `!Deaf`. Match `:1234–1250` / `:4065`.
2. SPE_FORCE_BOLT: same body; SPBOOK skip makeknown; Blind+`!cansee` does **not** use the `!Deaf` extra. Match.
3. Trapped locked, no mon: `D_NODOOR`, KABOOM or distant hear, loudness 40, shop `add_damage(0)`. Match `:1207–1232`.
4. Trapped + `m_at` survivor: `mb_trapped` stun+`rnd(15)`, doorlock loudness stays 0. Match `:1215–1218`.
5. Open/broken: `res=false`, no smash. Match `:1251–1252`.
6. SDOOR STRIKING: appear then smash/explode. Match `:1117–1126`.
7. SDOOR LOCKING still no-op. Unchanged (D-1475).
8. OPENING still unlocks (D-1462). Unchanged.
9. Shop `D_BROKEN`: `SHOP_DOOR_COST` + `pay_for_damage("destroy")`. Explode `D_NODOOR` skips that caller bill. Match.
10. STONE / non-door: skip `doorlock`. Match.
11. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. `SHOP_DOOR_COST` is `hack.h:76` 400, not a recorded gold amount.

## Verification

Journal: private canary **20**/20 (C/JS grep; locked smash+learnwand; SPE_FORCE_BOLT SPBOOK skip makeknown; trapped explode D_NODOOR; open/broken no-op; SDOOR appear+smash / appear+explode; LOCKING/OPENING regression; Blind !cansee !Deaf still learns; Blind+Deaf skip learnwand; STONE skip; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. Canary did not claim `mondied`. This audit cadence: full `sessions` at HEAD after all nine SHAs.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Smash/explode/SDOOR continue/`!Deaf` learnwand/shop `D_BROKEN` match. `doorlock` is a C callee.

Named omits (map / Open, not Must-fix):

1. `muse.c` `mbhit` doorlock — Open after this SHA (later D-1484)
2. `mb_trapped` `mondied` / lifesave / `mon_learns_traps(TRAPPED_DOOR)`
3. `Soundeffect`; `Unaware` faint
4. `zap_updown` default — Must-fix from review **437**

Do not Must-fix “SDOOR STRIKING should return without smash” (C continues). Do not Must-fix “explode should `add_damage(SHOP_DOOR_COST)` in `bhit`” (C only bills `D_BROKEN`). Do not Must-fix “`mbhit` should have shipped in this SHA.”

## Callers / RNG ledger

C callers: `bhit` ZAPPED_WAND on door/SDOOR. New dice: `rnd(15)` only with `m_at` on a trapped door. Public fortress does not hit the new arm.

Verdict: **ACCEPT-WITH-DEBT**
