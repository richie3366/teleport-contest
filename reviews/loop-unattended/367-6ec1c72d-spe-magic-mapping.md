# Review 367 — 6ec1c72d — spell.c SPE_MAGIC_MAPPING seffects (D-1407)

## Metadata
- Full / short hash: `6ec1c72d8a34afda55721087de635e1191b5a9c0` / `6ec1c72d`
- Parent: `61936a70` (D-1406). This file audits **this SHA only** (third of nine `js/` commits since review **364**). Archive **Addressed:** D-1407 `6ec1c72d` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-22 02:56:33 +0200
- D-id: **D-1407**
- Stats: 12 files, +270 / −168 — `js/spell.js` +19 / −6 (SPE_MAGIC_MAPPING onto CREATE_MONSTER `seffects`); `js/read.js` +61 / −28 (`seffect_magic_mapping` nommap/`notice_mon`); `js/detect.js` comment. Journal rotate is docs.
- Claims to close: Open `spell.c` `spelleffects` SPE_MAGIC_MAPPING seffects (named from D-1401 / review **361**). Not create monster. `reviews/loop-2026-08-15/` has no unpaid mapping Must-fix.
- JS / map: `spell.js` `spelleffects`; `read.js` `seffects` / `seffect_magic_mapping`; callee `detect.js` `do_mapping` (D-0075). `c-js-map/turns.md`. peffects / Rogue `unblock_point` still named.
- Prior reviews this SHA claims to close: **361** named MAGIC_MAPPING after CREATE_MONSTER (same C case).

## Intent vs deliverable

Git subject promises: “Match C spell.c spelleffects SPE_MAGIC_MAPPING so casting that spell maps via seffects/do_mapping, instead of printing Nothing happens.”

C `spell.c` `:1528–1531`: `SPE_MAGIC_MAPPING` / `SPE_CREATE_MONSTER` `(void) seffects(pseudo);` **without** skilled-bless FALLTHROUGH (`:1517–1526` is REMOVE_CURSE..CHARM_MONSTER only). Pseudo already unblessed/uncursed (`:1479` area). Spell still TIME after energy.

Callee `read.c` `seffects` `:2263–2265` both SCR and SPE. `seffect_magic_mapping` `:2102–2153`:

```
    if (is_scroll) {
        if (nommap) { crazy lines; Hallu modern art else body_part(HEAD);
                      make_confused(HConfusion+rnd(30), FALSE); return; }
        if (sblessed) { convert SDOOR; Rogue unblock_point; }
        gk.known = TRUE;
    }
    if (nommap) { body_part(HEAD) + something blocks; make_confused(...); return; }
    "A map coalesces"; cval = scursed && !confused;
    if (cval) HConfusion = 1;
    notice_mon_off(); do_mapping(); notice_mon_on();
    if (cval) { HConfusion = 0; unfortunately... }
```

`do_mapping` (`detect.c:1422–1444`) already live. `Confusion` ≡ `HConfusion` (`youprop.h:83–84`). `something` is `c_common_strings.c_something` (literal). `notice_mon_off/on` are `flag.h:233–236` counter bumps.

Old JS: other-otyp `Nothing happens.`; `seffect_magic_mapping` lived only on SCR; nommap `make_confused` and `notice_mon_off/on` deferred.

The diff **does** dispatch the same dynamic `seffects` as CREATE_MONSTER, add `SPE_MAGIC_MAPPING` to the switch, fill nommap `make_confused` + `body_part(HEAD)` + `notice_mon_off/on`. It does **not** skilled-bless the mapping pseudo. Match C. It does **not** port peffects. Named. Rogue `unblock_point` stays `vision_recalc`+`newsym`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| SPE_MAGIC_MAPPING arm | C `:1528–1531`, **wired** | seffects, no skilled bless |
| `seffects` | C `read.c`, **imported live** | dynamic read.js |
| `seffect_magic_mapping` | C `:2102–2153`, **wired** | this SHA fills deferred nommap/notice_mon |
| `do_mapping` | C `:1422–1444`, **imported live** | detect.js D-0075 |
| `make_confused` | C `potion.c`, **imported live** | HConfusion TIMEOUT + sticky mirror |
| `body_part` | C `polyself.c`, **imported live** | HEAD |
| `notice_mon_off` / `notice_mon_on` | C `flag.h:233–236`, **imported live** | hack.js a11y counter |
| `rnd(30)` | C, **imported live** | rng.js |
| `cvt_sdoor_to_door` | C, **already live** | blessed scroll only |
| `something` | C `decl.h:36`, **literal** | not hallu rndmonnam |
| Rogue `unblock_point` | C `:2128–2129`, **named omit** | JS `vision_recalc(1)`+`newsym` |
| cval `HConfusion=1` | C `:2144–2145`, **JS sticky** | `u.Confusion` because `do_mapping` reads that |
| SPE_HASTE_SELF peffects | C `:1534–1546`, **named omit** | next Open |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** nommap `rnd(30)` into `make_confused`; `do_mapping` still `rn2(7)` per cell when confused. Spell keep-path (uncursed pseudo, typical `!nommap`) adds **no** new die beyond D-0075 `exercise` already in `do_mapping`. Public fortress never casts this spell; seed2200 scroll mapping still uses the SCR arm.

## C ↔ JS fidelity

Dispatch: `otyp === SPE_MAGIC_MAPPING \|\| SPE_CREATE_MONSTER` then `seffects(pseudo)` with `pseudo.blessed/cursed` already false. Skilled bless is on the **next** SHA’s HASTE arm, not this one. Match `:1528–1531` vs `:1534–1541`. Spell still `ECMD_TIME`. Match.

`seffects` switch includes SPE. Match `:2263–2265`. Callee is the same function the scroll used (D-0075), not a new stub.

Scroll nommap: crazy-lines; Hallu “Wow!  Modern art.” else `body_part(HEAD)` bewilderment; `make_confused(HConfusion+rnd(30), FALSE)`; return **before** `known=true`. Match `:2112–2119`. Spell nommap (second `if`): head + “something blocks the spell”; same confuse; return. Match `:2136–2140`. Literal `something` matches `decl.h`.

Keep-path: “A map coalesces in your mind!”; `notice_mon_off`; `do_mapping`; `notice_mon_on`. Match `:2142–2148`. `do_mapping` is live hero_memory mapping (`show_map_spot`, `exercise(A_WIS)`), not a no-op. `notice_mon_*` bump `a11y.mon_notices_blocked` like C `flag.h`. Completelyburns-style browse_map when `!hero_memory` stays deferred in `do_mapping` (ordinary dungeon has hero_memory). Named pre-existing, not this SHA inventing a fake map.

cval cursed-unconfused: C writes `HConfusion=1` then `do_mapping(Confusion)`. JS writes `u.Confusion=1` because `do_mapping` reads `u.Confusion`, then restores `u.Confusion=0`. Spell pseudo is never cursed, so cval is false on the **cast** path. Scroll cursed screw-up is the D-0075 path this SHA also wrapped with notice_mon. Encoding named in the D-log; the map still screws via the flag `do_mapping` actually tests. Not a silent “always clear map” lie.

Blessed scroll SDOOR convert + `known=true` already lived; Rogue still `vision_recalc` not `unblock_point`. Named.

Hallucination check: “Match C SPE_MAGIC_MAPPING seffects” while **`seffects` → live `seffect_magic_mapping` → live `do_mapping`** is not a dispatch-stub lie. `make_confused` and `notice_mon_off` are imported C callees, not `return`. Do **not** stamp “Match C skilled blessed mapping” (C forbids it). Do **not** stamp “Match C Rogue `unblock_point`.” Do **not** stamp “Match C `HConfusion` bitfield on cval” (JS sticky). Do **not** stamp “Match C SPE_HASTE_SELF.”

## Hallucinations / overclaim

Subject says casting the spell maps via seffects/`do_mapping` instead of “Nothing happens.” **True on the keep-path** for `!nommap` (coalesce + full-level `show_map_spot`). **True that skilled does not bless.** **True that CREATE_MONSTER still shares the arm.** **False until named for peffects / Rogue unblock / `browse_map` when `!hero_memory`.** D-log “uncursed coalesce + seenv SVALL + SDOOR kept; skilled still unblessed; nommap spell block + rnd(30); nommap scroll bewilderment; Hallu modern-art; cursed scroll cannot-grasp; CREATE_MONSTER / CHAIN / CURE / JUMPING / FORCE / HEALING regression” are the right falsifiers. Stamping **Addressed:** D-1407 for `:1528–1531` + filling `:2136–2148` is fair. Do **not** treat fortress PASS as a cast of magic mapping (seed2200 is the **scroll**).

## Density

One C case already shared with CREATE_MONSTER, plus the nommap/`notice_mon` deferrals **this callee needs** for the spell path. ~80 lines of JS. Playbook §2b caller/callee cluster. Did not glue HASTE_SELF (next SHA). Right size.

## Branch-by-branch confirm

1. Uncursed spell `!nommap`: coalesce; `do_mapping`; no cval; no skilled bless. Match.
2. Skilled spell: still unblessed pseudo; no SDOOR convert (not a scroll). Match.
3. Spell `nommap`: head-spins block; `rnd(30)` confuse; no map. Match.
4. Scroll nommap: crazy-lines + Hallu or head; confuse; no `known`. Match.
5. Cursed unconfused scroll: cval screw + “can't grasp”; notice_mon wrap. Match intent; sticky vs `HConfusion` named.
6. CREATE_MONSTER still `seffects`. Match D-1401.
7. Other otyps still “Nothing happens.” Match named.
8. **Public-unhit** for the **spell**; scroll mapping already public-hit (D-0075).

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Dynamic `import('./read.js')` is the existing cycle split, not Node `fs`. Plain ESM.

## Verification

Journal: private canary **18**/18 (C/JS grep; uncursed coalesce + seenv SVALL + SDOOR kept; skilled still unblessed; nommap spell block + rnd(30); nommap scroll bewilderment; Hallu modern-art; cursed scroll cannot-grasp; CREATE_MONSTER / CHAIN / CURE_BLINDNESS / JUMPING / FORCE_BOLT / HEALING regression; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** for the spell. I did not re-run the private canary. Cadence full `sessions` runs at HEAD this audit.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Dispatch matches `:1528–1531`; callee maps via live `do_mapping`; nommap confuse and notice_mon are live C callees.

Named omits (map / Open, not Must-fix):

1. `spell.c` `spelleffects` SPE_HASTE_SELF peffects (already next Open after this SHA)
2. Rogue `unblock_point` on blessed SDOOR (`:2128–2129`)
3. `do_mapping` `browse_map` when `!hero_memory` / unconstrained
4. cval writes `HConfusion` bitfield (JS sticky `u.Confusion` for the reader `do_mapping` actually has)

Do not Must-fix “skilled mapping should bless” (C FALLTHROUGH stops before this case). Do not Must-fix “spell should convert SDOOR” (C only `is_scroll`). Do not Must-fix “notice_mon is a no-op” (counter is live). Do not Must-fix “CREATE_MONSTER lost its arm” (shared `else if`).

## Callers / RNG ledger

C spell keep-path: no extra `rn2` in `seffect_magic_mapping`; `do_mapping` may `rn2(7)` per cell if confused. Nommap: one `rnd(30)`. JS same. Public fortress never casts the spell. `seffects` still `exercise(A_WIS)` for `oc_magic` before the switch (C same) — pre-existing.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: SPE_MAGIC_MAPPING now `seffects`→`do_mapping` without skilled bless, with live nommap confuse and notice_mon; peffects and Rogue unblock stay named.
- Must-fix stays empty for this SHA; archive **Addressed:** D-1407 `6ec1c72d` already has the short hash.
