# Review 415 — ad3eca95 — zap.c zap_steed WAN_TELEPORTATION (D-1455)

## Metadata
- Full / short hash: `ad3eca9507aa6bc33db692c3185fa2b0f9d21e58` / `ad3eca95`
- Parent: `68635edb` (D-1454). This file audits **this SHA only** (sixth of nine `js/` commits since review **409**). Archive **Addressed:** D-1455 `ad3eca95` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 07:07:53 +0200
- D-id: **D-1455**
- Stats: 10 files, +195 / −135 — `js/zap.js` +98 / −29. NOTES rotate accounts for most docs churn.
- Claims to close: Open `zap.c` `zap_steed` WAN_TELEPORTATION (named from D-1454 / D-1443). Not probing. `reviews/loop-2026-08-15/` has no unpaid steed-tele Must-fix.
- JS / map: `zap.js` `zap_steed` / `zapyourself` / `Teleport_control` / `Stunned`; callee `teleport.js` `tele` / `teleds`. `c-js-map/turns.md` + `debt.md`. Remaining bhitm-routed zap_steed still named.
- Prior reviews this SHA claims to close: **403** named remaining zap_steed after probing; **414** D-log follow-up was this Open row.

## Intent vs deliverable

Git subject promises: “Match C zap.c zap_steed WAN_TELEPORTATION so a downward teleport wand or teleport-away spell while riding moves the hero and steed together instead of skipping zap_steed.”

C `weffects` `:3437–3439` mounted `!dx && !dy && dz>0` → `zap_steed`. C `zap_steed` `:3104–3113`:

```
    case WAN_TELEPORTATION:
    case SPE_TELEPORT_AWAY:
        /* you go together */
        tele();
        if ((Teleport_control && !Stunned) || !couldsee(u.ux0, u.uy0)
            || distu(u.ux0, u.uy0) >= 16)
            learnwand(obj);
        steedhit = TRUE;
        break;
```

Not `bhitm` / `u_teleport_mon` (those are the monster-aimed arm `:341–347`). `tele()` → `scrolltele` → `teleds` writes `u.ux0 = u.ux` **before** `u_on_newpos` (`teleport.c:490–491`, `:525` also moves `usteed`). Unmounted `zapyourself` `:2876–2882` is the same criteria. `youprop.h:231` `Teleport_control` is `H||E`; `:81` `Stunned` is `HStun` only (not EStun). `distu` is `dist2` (squared). Caller still sets `disclose` so weffects `learnwand` + `more_experienced(0,10)` fire even on a short hop.

Old JS: probing-only `zap_steed`; teleport fell through to empty `zap_updown`. `zapyourself` snapshotted `ux0` **before** `tele()` (`?? ux`), which is not the post-`teleds` origin C reads.

The diff **does** add WAN/SPE_TELEPORT `await tele()` then the C criteria on live `ux0`, shared `Teleport_control()` / `Stunned()` helpers (uprops conferral; Stunned not EStun), and the same post-tele `ux0` on `zapyourself`. It **does not** route this otyp through `bhitm`. It **does not** add remaining bhitm-routed zap_steed (invis/cancel/poly/striking/slow/speed/heal/drain/opening). Named. It **does not** rewrite `confer_oc_oprop`.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `zap_steed` WAN/SPE_TELEPORT | C `:3104–3113`, **wired this SHA** | |
| `tele` / `teleds` | C `teleport.c`, **imported live** | moves usteed with hero |
| `Teleport_control()` | C `youprop.h:231`, **clone matching C** | H\|\|E ≡ uprops; sticky flats |
| `Stunned()` | C `youprop.h:81`, **clone matching C** | HStun only, not EStun |
| `zapyourself` WAN/SPE_TELEPORT | C `:2876–2882`, **C-wrong fixed** | post-`teleds` ux0 |
| `bhitm` WAN/SPE_TELEPORT | C `:341–347`, **pre-existing live** | not this caller |
| remaining zap_steed bhitm otyps | C `:3116–3133`, **named omit** | still default false |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** existing `tele()`/`scrolltele` dice. Public fortress does not zap teleport while riding down.

## C ↔ JS fidelity

`weffects` already calls `zap_steed` first when mounted down. New arm returns `steedhit = true` always (even noteleport no-move), so disclose/learnwand still fire. Match `:3437–3439` + `:3112`. SPE_TELEPORT SPBOOK still skips `makeknown`.

`tele()` is live `scrolltele(null)` → `teleds`. `teleds` sets `ux0/uy0` to origin (`ox/oy`) then `u.ux/uy = nux/nuy` and `usteed.mx/my` to the new cell. “You go together” is that usteed copy, **not** `u_teleport_mon`. **Callee is not a stub.** Comment on `bhitm` correctly says zap_steed does not take that path.

Learnwand criteria after `tele()`: `(Teleport_control && !Stunned) || !couldsee(ux0,uy0) || distu(ux0,uy0) >= 16`. JS `dx*dx+dy*dy >= 16` is `dist2`. `Teleport_control()` is H\|\|E plus conferral `uprops[TELEPORT_CONTROL]` (same reason as D-1423 See_invisible: `confer_oc_oprop` writes the array). `Stunned()` is `HStun` / sticky / `uprops[STUNNED].intrinsic` — **no EStun**. Match `:81` / `:231`.

`zapyourself` previously used a pre-`tele()` snapshot of `ux0 ?? ux`. C reads `u.ux0` **after** `tele()`, which `teleds` has already set to this hop’s origin. Using a stale `ux0` from an earlier move is a C-wrong. This SHA fixes it to `u.ux0` after `await tele()`. Same helpers. Match `:2876–2882`.

Hallucination check: “Match C zap_steed WAN_TELEPORTATION `tele()` together” while **`tele`/`teleds` already move the steed** is **not** a dispatch-stub lie. “Match C `zap_steed` OPENING `bhitm`” **would** be. “Match C `u_teleport_mon` on the steed” **would** be (C does not).

## Hallucinations / overclaim

Subject says downward teleport while riding moves hero and steed together. **True:** `tele()` + usteed coords; learnwand on control/unseen/long hop; weffects disclose still learns on a short hop; SPE skips makeknown. **False until named** for remaining bhitm-routed zap_steed. Stamping **Addressed:** D-1455 for `:3104–3113` plus the sibling `zapyourself` ux0 fix is fair. Do **not** stamp “Match C `u_teleport_mon(usteed)`.” Do **not** treat fortress PASS as a mounted-down teleport.

## Density

One `zap_steed` otyp plus the sibling `zapyourself` criteria that C comments as the same test, plus the two youprop helpers that test needs. ~70 lines of JS. Playbook §2b caller/callee cluster. Did not glue OPENING `bhitm`. Acceptable. Fixing the pre-tele `ux0` snapshot is the same C criterion, not a second subsystem.

## Branch-by-branch confirm

1. Mounted down WAN_TELEPORTATION: `tele()`; steed cell follows; `steedhit` true. Match `:3104–3113`.
2. SPE_TELEPORT_AWAY: same arm; SPBOOK skip makeknown. Match.
3. `Teleport_control && !Stunned`: learnwand even on a 1-step hop. Match.
4. Uncontrolled short hop `distu < 16` and `couldsee` origin: no extra learnwand in `zap_steed`; weffects disclose still learns. Match.
5. `distu >= 16` or `!couldsee`: learnwand. Match.
6. noteleport: no move; still `steedhit` / disclose. Match canary claim.
7. No steed / `dx` / `dz<=0`: `weffects` skips `zap_steed`. Match `:3437–3439`.
8. Self-dir `zapyourself`: same post-tele ux0. Match `:2876–2882`.
9. Directed at a monster: still `bhitm` `u_teleport_mon`. Unchanged.
10. Locking/drain `zap_steed` still default. Named.
11. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. Helpers read `uprops[]` rather than rewriting `confer_oc_oprop`.

## Verification

Journal: private canary **17**/17 (C/JS grep; Rule #2; riding-down wand moves together + disclose learn+XP; SPE skips makeknown; noteleport no move still disclose; probing sibling D-1443; locking/drain still default; no-steed / dx / dz<0 skip; zapyourself still `tele()`); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD `01edf8b9`. Fortress PASS is not a mounted-down teleport.

## Actionable C-wrongs

None for Must-fix on **this** SHA. `tele()` is live; learnwand order matches post-`teleds` ux0. The old pre-tele snapshot is gone.

Named omits (map / Open, not Must-fix):

1. remaining `zap_steed` bhitm-routed (OPENING / SLOW / drain / …) — Open already
2. `zap_updown` STRIKING/LOCKING/STONE (STRIKING is next Open at this SHA)
3. `bhit` doorlock / `bhito` boxlock
4. `tele` engulfing limbo / shop-bill polish (pre-existing on `u_teleport_mon`)

Do not Must-fix “zap_steed should `u_teleport_mon` the pony” (C `tele()` together). Do not Must-fix “OPENING should have shipped in this SHA.” Do not Must-fix “dispatch is a stub.” Do not Must-fix “rewrite `confer_oc_oprop`.”

## Callers / RNG ledger

C callers: `weffects` mounted down. Dice live inside `tele()`. Public fortress does not hit this.

Verdict: **ACCEPT-WITH-DEBT**
