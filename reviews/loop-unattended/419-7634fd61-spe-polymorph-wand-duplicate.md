# Review 419 — 7634fd61 — spell.c SPE_POLYMORPH IMMEDIATE wand-duplicate (D-1459)

## Metadata
- Full / short hash: `7634fd619980faa3a479ae2acd3bedb54a62dc5a` / `7634fd61`
- Parent: `854eaa21` (audit #1840, reviews **410–418**). This file audits **this SHA only** (first of nine `js/` commits since review **418**). Archive **Addressed:** D-1459 `7634fd61` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 08:34:41 +0200
- D-id: **D-1459**
- Stats: 10 files, +117 / −34 — `js/spell.js` +25 / −7; `js/zap.js` comments only (+16 / −4).
- Claims to close: Open `zap.c` `weffects` SPE_POLYMORPH IMMEDIATE wand-duplicate (named from D-1458 / review **418**). Not CANCELLATION. `reviews/loop-2026-08-15/` has no unpaid polymorph-cast Must-fix.
- JS / map: `spell.js` `spelleffects` / `wand_duplicate_weffects`; callees `zap.js` `weffects` / `bhit` / `bhitm` WAN/SPE/POT poly / `zapyourself` `polyself`. `c-js-map/turns.md`. Remaining CANCEL/STONE/TELE named at this SHA.
- Prior reviews this SHA claims to close: **418** remaining IMMEDIATE after TURN (POLY first); **410–412** named POLY after KNOCK/SLOW/LOCK.

## Intent vs deliverable

Git subject promises: “Match C spell.c SPE_POLYMORPH IMMEDIATE wand-duplicate so casting polymorph calls weffects bhit instead of printing Nothing happens.”

C `spell.c` `:1469` is in the `:1457–1514` wand-duplicate fallthrough (after TURN, before TELE/CANCEL/FINGER). `objects.h:1388–1390` `SPELL("polymorph", … IMMEDIATE … SPE_POLYMORPH)`. `oc_dir == IMMEDIATE` so `:1479` takes getdir / atme / self vs `weffects`. Self: `zapyourself` `:2804–2810` `!Unchanging` then `polyself(POLY_NOFLAGS)` already live (D-0156). Directed: `weffects` `:3440–3451` IMMEDIATE `bhit(rn1(8,6), bhitm, bhito)`. Fake book is SPBOOK so `learnwand` skips `makeknown`. `physical_damage` is FORCE_BOLT-only (`:1458–1459`).

C `bhitm` `:263–334`: long-worm `has_mcorpsenm` skip; else `resists_magm` → `shieldeff_mon`; else `!resist(..., NOTELL)` then inventory `bypass_obj` if `otyp != POT_POLYMORPH`; `cham == NON_PM && !rn2(25)` system shock (`xkilled` NOCORPSE) else `newcham(NULL, ncflags)` with `NC_VIA_WAND_OR_SPELL` / `NC_SHOW_MSG` and cham fallback; surviving long worm gets `newmcorpsenm` + `MCORPSENM = PM_LONG_WORM` + `bypasses`. Floor `bhito` `:2191–2221` `obj_unpolyable` / `obj_shudders` / `poly_obj` already live. `zap_steed` `:3120–3133` would `bhitm` the mount.

Old JS: SPE_POLYMORPH fell through “Nothing happens.” `weffects` IMMEDIATE `bhit(rn1(8,6))` already live (D-1388). `bhitm` / `zapyourself` / `bhito` SPE_POLYMORPH already live for wand poly.

The diff **does** add `const SPE_POLYMORPH` and `else if (otyp === SPE_POLYMORPH)` → `wand_duplicate_weffects(pseudo, atme, false)`. It **does not** change `weffects` / `bhit` / `bhitm` / `zapyourself` / `bhito` bodies (`zap.js` comments only). It **does not** dispatch CANCEL/STONE/TELE. Named. It **does not** add `zap_steed` poly, long-worm `mcorpsenm` skip/tag, or `shieldeff_mon`. Named on the D-log.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `spelleffects` SPE_POLYMORPH arm | C `:1469–1514`, **wired this SHA** | |
| `wand_duplicate_weffects` | C `:1479–1514`, **pre-existing wrapper** | |
| `weffects` IMMEDIATE | C `:3440–3451`, **imported live** (D-1388) | `rn1(8,6)` then `bhit` |
| `bhit` ZAPPED_WAND | C `:3869+`, **imported live** | monster → `bhitm`; pile → `bhito` |
| `bhitm` WAN/SPE/POT_POLYMORPH | C `:263–334`, **imported live** | resist / `rn2(25)` / `newcham` |
| `newcham` | C `makemon.c`, **imported live, partial** | `_ncflags` unused |
| `zapyourself` SPE_POLYMORPH | C `:2804–2810`, **imported live** (D-0156) | `!Unchanging` `polyself(0)` |
| `polyself` | C `polyself.c`, **imported live** | `POLY_NOFLAGS` ≡ 0 |
| `bhito` WAN/SPE_POLYMORPH | C `:2191–2221`, **imported live** | `obj_unpolyable` / shudder / `poly_obj` |
| long-worm `mcorpsenm` skip/tag | C `:266–269` / `:321–332`, **named omit** | empty `if`; no `newmcorpsenm` |
| `shieldeff_mon` on `resists_magm` | C `:270–273`, **named omit** | magm still skips poly |
| remaining IMMEDIATE CANCEL/STONE/TELE | C same fallthrough, **named omit** | still “Nothing happens.” |
| `zap_steed` WAN/SPE_POLYMORPH | C `:3120–3133` `bhitm`, **named omit** | JS still default |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. Grep hits on `FORCE` are `SPE_FORCE_BOLT` comments only. **New gameplay RNG:** directed cast uses existing `rn1(8,6)` plus `bhitm` `resist` then `rn2(25)` / `newcham` dice (already there for wand poly). Public fortress does not `#cast` polymorph.

## C ↔ JS fidelity

`wand_duplicate_weffects` already matches `:1479–1514`: atme zeros dirs; cancelled getdir reuses leftover `u.dx/dy/dz` and prints “The magical energy is released!”; self → `zapyourself` (poly damage 0, no `losehp`); else `weffects`; `update_inventory()`. `physical_damage` false. Match.

`oc_dir` IMMEDIATE. JS `weffects` still does steed-down then IMMEDIATE then NODIR then RAY (`:3437–3468`). Directed horizontal: `zapsetup` / `bhit(rn1(8,6), bhitm, bhito)` / `zapwrapup`. SPBOOK skip makeknown. **Callees are not stubs.** Hallucination check: “Match C SPE_POLYMORPH weffects bhit” while **`weffects` IMMEDIATE + `bhit` + `bhitm` poly + `zapyourself` `polyself` + `bhito` poly are live** is **not** a dispatch-stub lie. `newcham` is partial (`_ncflags` ignored so `NC_SHOW_MSG` / `NC_VIA_WAND_OR_SPELL` do not change form-select or message), but it **does** change `mtmp.data` — not a no-op.

`bhitm` `:263–334` at this SHA:

1. Long worm: C skips only if `has_mcorpsenm`. JS empty `if` on `PM_LONG_WORM` then falls through — first hit still polys (match); later tail hits also poly (named omit; no tag written either).
2. `resists_magm`: C `shieldeff_mon` then skip resist/poly. JS empty magm body then `else if (!resist)` — magm still skips poly. Visual only named.
3. `!resist` NOTELL: `polyspot = otyp !== POT_POLYMORPH`; `give_msg = !Hallucination && (canseemon || engulfing)`. JS uses `uswallow && ustuck === mtmp` for engulfing. Spell path is SPE so `polyspot` true; `bypass_obj` on `minvent` matches `:283–285`.
4. System shock: `cham == NON_PM && !rn2(25)` then optional shudder pline + `xkilled` NOCORPSE. Order matches. `xkilled` is imported `uhitm.js`.
5. Else `newcham(null, ncflags)` then cham fallback `ismnum(mtmp.cham)`. JS computes flags then calls `newcham` which ignores them. Form change still happens.
6. Post-poly long-worm `mcorpsenm` tagging (`:321–332`) absent. Named with the skip.

Self-dir `:2804–2810`: `!Unchanging` → `learn_it` + `polyself(POLY_NOFLAGS)`. JS reads `Unchanging` / H / E / `uprops[UNCHANGING]`. `polyself(0)` is `POLY_NOFLAGS`. Cast self therefore does not no-op unless Unchanging.

`bhito` poly: `obj_unpolyable` / `obj_shudders` / `poly_obj(STRANGE_OBJECT)` live. Missing C `uconduct.polypiles`, box `boxlock`, hideunder cover — pre-existing, not this SHA’s claim.

## Hallucinations / overclaim

Subject says casting polymorph calls weffects bhit instead of Nothing happens. **True:** `#cast` getdir → self `polyself` or `weffects` → `bhit` → `bhitm` resist/`rn2(25)`/`newcham`; KNOCK/SLOW/LOCK/TURN/RAY stay wired; CANCEL/STONE still Nothing happens. **False until named** for remaining IMMEDIATE, `zap_steed` poly, long-worm `mcorpsenm`, `shieldeff_mon`. Stamping **Addressed:** D-1459 for the **cast dispatch** is fair. Do **not** stamp “Match C SPE_CANCELLATION.” Do **not** treat fortress PASS as a polymorph cast. Comment “bhitm WAN/SPE/POT poly already live” is true for the resist/shock/`newcham` spine; it is **not** true for the named long-worm tag. The TURN-arm comment this SHA added (“undead dmg already D-0955”) still overclaims multipliers that D-1458 shipped; comment-only, not a new C-wrong.

## Density

One IMMEDIATE otyp dispatch through the existing wrapper. ~40 lines of real JS plus header comment churn in `zap.js`. Playbook §2b caller/callee. Did not glue CANCEL. Acceptable. Comment-only `zap.js` is not a second subsystem.

## Branch-by-branch confirm

1. `#cast` SPE_POLYMORPH directed: `weffects` `bhit(rn1(8,6))`. Match `:1469–1510`.
2. atme / cancelled getdir leftover 0,0,0: `zapyourself`; `!Unchanging` `polyself`; no `losehp`. Match `:1500–1508` / `:2804–2810`.
3. Unchanging self-dir: no `polyself`, no learn. Match.
4. Monster hit: `resists_magm` skips poly (no shield flash). Magm branch match except visual.
5. Else `resist` NOTELL then `rn2(25)` shock or `newcham`. Match `:274–316` spine.
6. SPBOOK skip makeknown. Match `learnwand` `:133`.
7. Floor object via `bhito` still unpolyable/shudder/`poly_obj`. Unchanged live.
8. CANCEL/STONE/TELE still Nothing happens. Named.
9. Mounted down poly still misses `zap_steed` `bhitm`. Named.
10. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. `rn2(25)` is C `:290`, not a recorded index.

## Verification

Journal: private canary **19**/19 (C/JS grep; IMMEDIATE SPBOOK; atme Unchanging no-op; zapyourself skip makeknown; bhitm kobold `rn2(25)`/`newcham`; east cast TIME; CANCEL/STONE still Nothing happens; prior TURN/KNOCK/SLOW/LOCK/RAY/NODIR stay; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD after all nine SHAs. Fortress PASS is not a polymorph cast.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Dispatch reaches live `weffects`/`bhit`/`bhitm`. Spine `resist` / `rn2(25)` / `newcham` / self `polyself` match C. Long-worm skip is an empty `if` (clone that diverges) but the D-log **names** it — map omit, not a silent “Match C” lie.

Named omits (map / Open, not Must-fix):

1. SPE_CANCELLATION / STONE_TO_FLESH / TELEPORT_AWAY IMMEDIATE — Open already (CANCEL first at this SHA)
2. `zap_steed` WAN/SPE_POLYMORPH via `bhitm` (C `:3120–3133`)
3. long-worm `has_mcorpsenm` skip + post-poly `newmcorpsenm` tag (`:266–269`, `:321–332`)
4. `shieldeff_mon` on `resists_magm`; `newcham` `_ncflags` / `NC_SHOW_MSG`
5. `bhit` doorlock / `zap_updown` LOCKING/STONE / `bhito` boxlock

Do not Must-fix “CANCEL should have shipped in this SHA.” Do not Must-fix “dispatch is a stub.” Do not Must-fix “`newcham` is a no-op” (it mutates `mtmp.data`).

## Callers / RNG ledger

C callers: `spelleffects`; wand poly already reached `bhitm`/`bhito`/`zapyourself`. Dice: `rn1(8,6)` then `resist` (maybe `rn2`) then `rn2(25)` or `select_newcham_form`; self `polyself` has its own dice. Public fortress does not hit the new cast.

`weffects` IMMEDIATE does not set `disclose` on the horizontal `bhit` arm (`:3447–3449`), so type-id is from `bhitm` `learn_it` only. Fake SPBOOK still skips `makeknown` in `learnwand` (`:133`). `physical_damage` stays false so self-zap never `Maybe_Half_Phys`.

Verdict: **ACCEPT-WITH-DEBT**
