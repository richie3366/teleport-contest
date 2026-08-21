# Review 350 — b5b5eb34 — spell.c SPE_PROTECTION cast_protection (D-1390)

## Metadata
- Full / short hash: `b5b5eb34f58c749d734d61dc285369fd13893e18` / `b5b5eb34`
- Parent: `5e8d1fbd` (D-1389). This file audits **this SHA only** (fourth of nine `js/` commits since review **346**). Archive **Addressed:** D-1390 `b5b5eb34` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 20:54:57 +0200
- D-id: **D-1390**
- Stats: 11 files, +213 / −30 — `js/spell.js` +107 / −5 (`cast_protection` + arm); `js/timeout.js` +28 / −3 (`usptime` tick); `js/u_init.js` +4 BSS-zero.
- Claims to close: Open `spell.c` `cast_protection` SPE_PROTECTION (named). Not familiar. Review **349** named this next otyp. `reviews/loop-2026-08-15/` has no unpaid protection Must-fix.
- JS / map: `spell.js` `cast_protection`; `timeout.js` `nh_timeout`; `u_init.js` `find_ac` / `u_init_misc`. `c-js-map/turns.md`. CLAIRVOYANCE / insight Protection line / ugallop still named.
- Prior reviews this SHA claims to close: **349** follow-up Open; **338** named PROTECTION among other otyps.

## Intent vs deliverable

Git subject promises: “Match C spell.c cast_protection SPE_PROTECTION so the spell raises uspellprot from log2(ulevel) and timeout dissipates it, instead of printing Nothing happens.”

C `spell.c` `cast_protection` `:1104–1177`: `natac = u.uac + u.uspellprot` (find_ac already subtracted spell prot); `loglev` via `while (l) { loglev++; l /= 2; }` (log2(ulevel)+1); `natac = (10-natac)/10`; `gain = loglev - uspellprot / (4 - min(3, natac))`. If `gain > 0`: !Blind haze plines (recast denser vs first-cast atmosphere); `u.uspellprot += gain`; expert clerical `uspmtime` 20 else 10; `if (!u.usptime) u.usptime = u.uspmtime`; `find_ac()`. Else warm skin. Caller `spelleffects` `:1581–1583`. `objects.h:1400–1402`: SPELL protection `P_CLERIC_SPELL`, **NODIR**. Fields `you.h:473–475` **uchar** `uspellprot` / `usptime` / `uspmtime`.

C `timeout.c` `:652–661` after `mtimedone` / `ucreamed`, before `ugallop` / uprops: `if (u.usptime) { if (--u.usptime == 0 && u.uspellprot) { usptime = uspmtime; uspellprot--; find_ac(); !Blind Norep less-dense / disappears; } }`.

Old JS: other-otyp `Nothing happens.`; `find_ac` already subtracted `uspellprot` (`u_init.js:1228`); `nh_timeout` had no usptime arm; process-reuse might leave stale uchar fields.

The diff **does** port `cast_protection` (log2, natac, gain, haze, expert 20/10, arm usptime only if 0, dynamic `find_ac`), the `SPE_PROTECTION` arm, `nh_timeout` uchar tick + Norep, and BSS-zero in `u_init_misc`. It does **not** port CLAIRVOYANCE, ugallop, insight Protection line, or reorder JS uprops vs C. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `cast_protection` | C `:1104–1177`, **wired** | log2 + gain + find_ac |
| SPE_PROTECTION arm | C `:1581–1583`, **wired** | NODIR; no getdir |
| `find_ac` | C `do_wear.c`, **imported live** | already −uspellprot |
| `nh_timeout` usptime | C `:652–661`, **wired** | uchar -- then Norep |
| `hcolor` / `an` / `Norep` | C, **imported live** | |
| `is_whirly` / `is_animal` | C `mondata.h`, **imported live** | |
| `Blind()` (spell.js) | C `youprop.h Blind`, **clone** | sticky + (H\|\|E)&&!B |
| `Blind()` (timeout.js) | C Blind, **pre-existing clone** | no BBlinded; used for Norep |
| `enfolds` | C `mondata.h`, **clone** | AT_ENGL=11 AD_WRAP=28 |
| u_init BSS-zero | C `you.h` uchar, **wired** | process reuse |
| CLAIRVOYANCE | C `:1572–1580`, **named omit** | later D-1391 |
| ugallop / ucreamed | C timeout, **named omit** | |
| insight Protection line | C `insight.c`, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** `cast_protection` itself none (hcolor hallu uses **display** rng). Timeout tick none. Energy/`mksobj` already ran. Do not invent a `rn2` on this envelope.

## C ↔ JS fidelity

Energy/WIS before the switch. NODIR: no getdir. `use_skill` after. Match `:1581–1599` except `obfree` (pre-existing).

log2: `while (l) { loglev++; l = trunc(l/2); }` — C int `/`. ulevel 1 → 1; 8 → 4. natac adds uspellprot back then `(10-natac)/10` trunc. gain `loglev - trunc(uspellprot / (4-min(3,natac)))`. ulevel 1 AC 10: successive uspellprot 1,2,3,4 then gain 0 warm. Match the C comment table `:1121–1137`. Recast with usptime already running **does not** reset the tick (`if (!usptime)`). Recast **does** refresh `uspmtime` from current skill. Match `:1169–1172`.

uchar: JS `uspellprot = (old+gain)&0xff`; timeout `usptime = (old-1)&0xff` then `uspellprot = (old-1)&0xff`. C uchar wrap. Match.

`find_ac` is the real `u_init.js` function (form AC, ARM_BONUS, rings, HProtection, **−uspellprot**, AC_MAX 99, botl). Dynamic import because `u_init.js` already imports `spell.js`. Not a stub AC write.

First-cast atmosphere: swallow fog/whirly/enfolds/animal/ooze else water/cloud/tree/stone/air. `enfolds` clone is the same AT_ENGL+AD_WRAP test as `mhitm.js`. Recast: denser haze. Blind: skip pline, still apply gain. Warm: `Your skin feels warm for a moment.` Match `:1142–1176`.

Timeout: `--usptime == 0 && uspellprot` then refill from `uspmtime`, decrement prot, `find_ac`, Norep. Last point (`uspellprot` 1→0) says disappears. Match `:654–660`. C order is after mtimedone/ucreamed, before ugallop/uprops. JS already ran uprops earlier; this SHA inserts after mtimedone, before `run_timers`. Comment is honest. ugallop still named. Independent uchar fields: keep-path dissipation does not need uprops order.

Hallucination check: “Match C `cast_protection`” while **the body is live and `find_ac` is the real function** is not a dispatch-stub lie. Do **not** stamp “Match C `nh_timeout` uprops-vs-usptime order.” Do **not** stamp “Match C insight Protection.” Do **not** stamp “Match C SPE_CLAIRVOYANCE.”

## Hallucinations / overclaim

Subject says the spell raises uspellprot from log2(ulevel) and timeout dissipates it instead of `Nothing happens.` **True on the keep-path** (gain>0, expert 20, recast keeps usptime, 10-tick Norep, BSS-zero). **False until named for Blindfolded dissipation** if timeout.js `Blind()` (no `BBlinded`) disagrees with `youprop.h` — cast messages use the closer spell.js clone. D-log “ulevel 1 AC 10 → 1,2,3,4 then warm” / “ulevel 8 → 4” / “expert 20” / “recast keeps usptime” / “10-tick Norep disappear” are the right falsifiers. Stamping **Addressed:** D-1390 for `:1104–1177` + `:652–661` is fair. Do **not** treat fortress PASS as protection (public-unhit).

## Density

One C function plus the timeout callee that makes the uchar fields do something, plus BSS-zero so process reuse does not inherit a leftover haze. ~135 lines of JS. Playbook §2b caller/callee cluster. Did not glue CLAIRVOYANCE (next Open). Did not rewrite `find_ac`. Did not add trailing `confdir`.

## Branch-by-branch confirm

1. SPE_PROTECTION: `cast_protection()`, not `Nothing happens.` Match `:1582`.
2. XL1 AC10: gain 1,2,3,4 then warm. Match table.
3. XL8: loglev 4. Match D-log.
4. Expert clerical: `uspmtime` 20 else 10. Match `:1169–1170`.
5. Recast while ticking: keep `usptime`; still add gain + refresh `uspmtime`. Match.
6. Blind: silent gain + find_ac. Match.
7. First-cast air / water / cloud / stone atmosphere. Match `:1153–1163`.
8. Warm: no uchar change. Match `:1174–1176`.
9. 10-tick: Norep less dense; last tick disappears + find_ac. Match `:654–660`.
10. CREATE_FAMILIAR / FORCE_BOLT unchanged. Match.
11. CLAIRVOYANCE: still `Nothing happens.` Named (later D-1391).
12. **Public-unhit** until a session casts protection.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. log2 loop and `4-min(3,natac)` are C. `& 0xff` is uchar, not a seed cap. Plain ESM. Dynamic `import('./u_init.js')` is in-process.

## Verification

Journal: private canary **17**/17 (C/JS grep; NODIR clerical; ulevel 1 AC 10 → 1,2,3,4 then warm; ulevel 8 → 4; expert 20; recast keeps usptime; Blind silent gain; water/cloud atmosphere; 10-tick Norep disappear; CLAIRVOYANCE still omit; FORCE_BOLT east still IMMEDIATE; HEALING atme; Rule #2). green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. Cadence full `sessions` is at later HEAD; fortress PASS is not protection.

## Actionable C-wrongs

None for Must-fix on **this** SHA. `cast_protection` matches `:1104–1177` on the keep-path; timeout `--usptime` matches `:652–661` on the uchar fields; `find_ac` is live.

Named omits (map / already-Open, not Must-fix):

1. SPE_CLAIRVOYANCE `do_vicinity_map` (already Open at this SHA; later D-1391)
2. insight.c Protection line; ugallop; ucreamed vs usptime vs uprops order
3. timeout.js `Blind()` clone vs `youprop.h` `BBlinded` on the Norep
4. `obfree(pseudo)`; JUMPING / CURE / CHAIN / seffects / peffects
5. heal/tele directional `weffects`

Do not Must-fix “reset usptime on every recast” (C only arms when 0). Do not Must-fix “skip find_ac on warm” (C only find_ac when gain>0). Do not Must-fix “use `rn2` for haze color when not hallu” (C `hcolor(NH_GOLDEN)`). Do not Must-fix “ubuzz protection” (C NODIR, not RAY).

## Callers / RNG ledger

C protection: no gameplay `rn2`. JS same. Hallu `hcolor` display rng only. Public fortress never casts this envelope.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: protection now applies log2(ulevel) `uspellprot` through live `find_ac` and dissipates on the uchar timeout tick; CLAIRVOYANCE and exact `nh_timeout` order stay named.
- Must-fix stays empty for this SHA; archive **Addressed:** D-1390 `b5b5eb34` already stamped.
