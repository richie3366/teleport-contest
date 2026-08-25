# Review 403 — 4a0aa5cc — zap.c zap_steed WAN_PROBING (D-1443)

## Metadata
- Full / short hash: `4a0aa5cca3ce21a97185658e8d985a7ab1c41ec1` / `4a0aa5cc`
- Parent: `892be171` (D-1442). This file audits **this SHA only** (third of nine `js/` commits since review **400**). Archive **Addressed:** D-1443 `4a0aa5cc` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 04:24:19 +0200
- D-id: **D-1443**
- Stats: 10 files, +138 / −33 — `js/zap.js` +68 / −11. Docs-only besides that file.
- Claims to close: Open `zap.c` `zap_steed` WAN_PROBING (named from D-1435 / review **395** / **386**). Not zapyourself. `reviews/loop-2026-08-15/` has no unpaid steed-probe Must-fix.
- JS / map: `zap.js` `zap_steed` / `weffects`; callee `probe_monster` (D-1426). `c-js-map/turns.md` + `debt.md`. Teleport / bhitm-routed zap_steed / zap_updown / bhito still named at this SHA.
- Prior reviews this SHA claims to close: **395** queue follow-up `zap_steed`; **386** named `zap_steed` `probe_monster` as a different caller than `bhitm`.

## Intent vs deliverable

Git subject promises: “Match C zap.c zap_steed WAN_PROBING so a downward probing wand while riding calls probe_monster on the steed instead of skipping the mount.”

C `zap.c` `weffects` `:3437–3439`:

```
    if (u.usteed && (objects[otyp].oc_dir != NODIR) && !u.dx && !u.dy
        && (u.dz > 0) && zap_steed(obj)) {
        disclose = TRUE;
    } else if (objects[otyp].oc_dir == IMMEDIATE) {
```

`WAN_PROBING` is `objects.h:1484` IMMEDIATE. Unmounted (or dx/dy or dz≤0) still takes `bhit`/`zap_updown`. Mounted straight down: `zap_steed` `:3087–3140` sets `gb.bhitpos` to steed mx/my and `gn.notonhead = FALSE`, then `:3099–3103`:

```
    case WAN_PROBING:
        probe_monster(u.usteed);
        learnwand(obj);
        steedhit = TRUE;
        break;
```

Not via `bhitm` (`:376–381` also probes, but that is the unmounted beam). Disclose then `learnwand` a **second** time at `:3470–3473`. Callee `probe_monster` `:625–640` already live (D-1426). Teleport `:3104–3113` and the bhitm-routed list `:3116–3134` return TRUE and **do not** fall through.

Old JS: `weffects` had no steed prefix and tested NODIR first. Mounted-down probing fell into IMMEDIATE `u.dz` → empty `zap_updown`.

The diff **does** add `zap_steed` with WAN_PROBING + default-false, and a C-shaped weffects prefix (`usteed && !NODIR && !dx && !dy && dz>0 && zap_steed`). It **does** move NODIR after IMMEDIATE so the chain matches C. It **does not** port teleport / bhitm-routed steed otyps (they still return false and fall through — same as pre-prefix JS). Named. It **does not** port `zap_updown` / `bhito` probing. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `weffects` steed prefix | C `:3437–3439`, **wired this SHA** | short-circuit on true |
| `zap_steed` | C `:3087–3140`, **partial C callee** | WAN_PROBING live; other arms named |
| `probe_monster` | C `:625–640`, **imported live** (D-1426) | not a stub |
| `learnwand` (in zap_steed) | C `:3101`, **imported live** | weffects disclose learns again |
| `gb.bhitpos` / `notonhead` | C `:3091–3092`, **wired** | `game._bhitpos` / `game.notonhead` |
| WAN_TELEPORTATION / SPE_TELEPORT_AWAY | C `:3104–3113`, **named omit** | default false |
| bhitm-routed steed otyps | C `:3116–3134`, **named omit** | invis/cancel/poly/striking/slow/speed/heal/drain/knock |
| `zap_updown` / `bhito` probing | C siblings, **named omit** | later SHAs in this window |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** none in this SHA (`probe_monster` has no `rn2`). Public fortress does not probe downward while mounted.

## C ↔ JS fidelity

Prefix predicate matches `:3437–3439` call-for-call: `usteed`, `oc_dir !== NODIR`, `!(dx\|dy)`, `dz > 0`, then `zap_steed`. True → `disclose = true` and **skip** IMMEDIATE `zap_updown`/`bhit`. False → same IMMEDIATE/NODIR/RAY chain as C. NODIR-first JS is gone; for a given `oc_dir` NODIR vs IMMEDIATE never both fire, so that reorder is fidelity not a new effect. Match.

WAN_PROBING arm: `bhitpos` = steed mx/my; `notonhead = false`; `probe_monster(usteed)`; `learnwand`; `steedhit = true`. C does **not** set `wake`/`reveal_invis` here (those are `bhitm` only). JS does not call `bhitm`. Match. Steed is not a long-worm tail, so `notonhead` false means status **and** minvent. Canary leftover `notonhead` still probes because this SHA clears it.

`probe_monster` is the D-1426 export: `mstatusline`; `notonhead` return; else `probe_objchain` + `display_minventory(MINV_ALL|MINV_NOLET|PICK_NONE)` or “not carrying anything”. **Callee is not a stub.** INCLUDE_HERO / `mstatusline` ailments remain named on that helper.

Double `learnwand`: C `:3101` then `:3470`. JS same. `was_unkn` XP only on the weffects pass. Match.

Default false: C `default:` is for otyps **not** in the two lists. JS uses default for **everything except probing**, including otyps C would handle. That is a **named omit on those otyps**, not a WAN_PROBING C-wrong: locking/drain still fall through as they did before the prefix. Do **not** treat default-false as “zap_steed is a no-op stub” for probing — probing returns true.

Hallucination check: “Match C zap_steed WAN_PROBING `probe_monster`” while **`probe_monster` is live D-1426** is **not** a dispatch-stub lie. “Match C zap_steed `tele()` / `bhitm(usteed)`” **would** be (those still return false). “Match C `zap_updown` probing” **would** be at this SHA.

## Hallucinations / overclaim

Subject says a downward probing wand while riding calls `probe_monster` on the steed instead of skipping the mount. **True:** prefix + WAN_PROBING → status + minvent (or not-carrying) + `learnwand` + disclose; no-steed / dx / dz<0 skip the prefix; self-zap still D-1435 `probe_objchain(invent)`. **False until named** for teleport-together, bhitm-routed steed otyps, `zap_updown` / `bhito` probing. Stamping **Addressed:** D-1443 for `:3099–3103` + `:3437–3439` is fair. Do **not** stamp “Match C `zap_steed` teleport.” Do **not** treat fortress PASS as a mounted probe.

## Density

One otyp of `zap_steed` plus the weffects prefix that every later steed arm needs. ~50 lines of JS. Playbook §2b right size. Did not glue teleport. Acceptable.

## Branch-by-branch confirm

1. Riding, dx=dy=0, dz>0, WAN_PROBING, empty minvent: not-carrying + learn + disclose XP. Match `:3099–3103` + `:3470`.
2. Steed minvent: observe / lknown / cknown / tin; Schroedinger skips cknown. Match D-1426 callee.
3. `notonhead` leftover true: this SHA forces false; full probe. Match `:3092`.
4. No steed / nonzero dx / dz<0: prefix false; IMMEDIATE path. Match `:3437`.
5. NODIR wand while mounted: `oc_dir !== NODIR` false; `zapnodir`. Match.
6. WAN_LOCKING / SPE_DRAIN: default false; fall through. Named omit vs C `:3116–3134`.
7. Unmounted probing beam still `bhitm` D-1426. Unchanged.
8. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. `game._bhitpos` is C `gb.bhitpos`, not a recorded coordinate. Default-false is a named remaining switch, not ALIGN.

## Verification

Journal: private canary **18**/18 (C/JS grep; Rule #2; riding down empty not-carrying+learn+disclose XP; minvent observe/lknown/cknown/tin; SchroedingersBox; statue; leftover notonhead still probes; no-steed / dx / dz<0 skip; locking/drain default; zapyourself still D-1435); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD after all nine SHAs. Fortress PASS is not a mounted probe.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Prefix + WAN_PROBING reach live `probe_monster`. Not a stub.

Named omits (map / Open, not Must-fix):

1. `zap_steed` WAN_TELEPORTATION / SPE_TELEPORT_AWAY `tele()` (`:3104–3113`)
2. `zap_steed` bhitm-routed otyps (`:3116–3134`)
3. `zap_updown` / `bhito` WAN_PROBING — later SHAs in this window
4. D-1426 `mstatusline` ailments / INCLUDE_HERO

Do not Must-fix “steed probing should go through `bhitm`” (C calls `probe_monster` directly). Do not Must-fix “should skip the second `learnwand`.” Do not Must-fix “NODIR should still be tested first.” Do not Must-fix “dispatch is a stub.”

## Callers / RNG ledger

C callers: `weffects` only. No new `rn2`. Public fortress does not ride-and-probe.

Verdict: **ACCEPT-WITH-DEBT**
