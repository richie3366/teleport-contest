# Review 395 — ebe912e0 — zap.c zapyourself WAN_PROBING (D-1435)

## Metadata
- Full / short hash: `ebe912e03ba01bc13ff496573611e7de62bc0547` / `ebe912e0`
- Parent: `4488f535` (D-1434). This file audits **this SHA only** (fourth of nine `js/` commits since review **391**). Archive **Addressed:** D-1435 `ebe912e0` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 02:41:31 +0200
- D-id: **D-1435**
- Stats: 11 files, +149 / −41 — `js/zap.js` +63 / −41; `js/insight.js` comments +2.
- Claims to close: Open `zap.c` `zapyourself` WAN_PROBING (named from D-1434). Not drain. `reviews/loop-2026-08-15/` has no unpaid probe-self Must-fix. Queue refill: `zap_steed` / `zap_updown` / `bhito` WAN_PROBING + zapyourself SPE_DRAIN + rustm poison leftover.
- JS / map: `zap.js` `zapyourself` / `probe_objchain`; callees `invent.js` `observe_object` / `update_inventory`; `insight.js` `ustatusline`. `c-js-map/turns.md` + `debt.md`. Drain / steed / updown / bhito still named.
- Prior reviews this SHA claims to close: **386** named zapyourself after bhitm probe; **394** queue follow-up.

## Intent vs deliverable

Git subject promises: “Match C zap.c zapyourself WAN_PROBING so self-zapping a wand of probing identifies carried items and prints ustatusline instead of doing nothing.”

C `zap.c` `zapyourself` `:2960–2965`:

```
    case WAN_PROBING:
        probe_objchain(gi.invent);
        update_inventory();
        learn_it = TRUE;
        ustatusline();
        break;
```

Always learns (empty pack still). Does **not** call `probe_monster` (`bhitm` D-1426 / `zap_steed`). `probe_objchain` `:611–623`: `observe_object`; container/statue `lknown` + `cknown` unless `SchroedingersBox`; tin `known`. Hero invent is JS Array (C `nobj`, D-1017). `ustatusline` `insight.c:3402–3488`: `"Status of %s (%s):  Level %d  HP %d(%d)  AC %d%s."` with ailment `info` and Upolyd `mh`/`mlevel`. `learnwand` at `:3011`. Caller `dozap` self-dir; wand is IMMEDIATE.

Old JS: `zapyourself` default break. `probe_objchain` nobj-only (hero Array missed items without `nobj` links).

The diff **does** add the WAN_PROBING arm, Array-or-nobj `probe_objchain`, `update_inventory`, always `learn_it`, `ustatusline`. It **does not** port SPE_DRAIN / `zap_steed` / `zap_updown` / `bhito`. Named. It **does not** fill `ustatusline` Sick/Stoned/Upolyd HP (already named on `insight.js`).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `zapyourself` WAN_PROBING | C `:2960–2965`, **wired** | |
| `probe_objchain` | C `:611–623`, **live + Array walk** | minvent still nobj |
| `observe_object` | C `o_init.c:442–451`, **imported live** | Hallu skip dknown |
| `update_inventory` | C `invent.c`, **imported live** | |
| `ustatusline` | C `insight.c:3402–3488`, **imported live subset** | ailments / Upolyd named |
| `SchroedingersBox` | C `obj.h`, **clone matching** | LARGE_BOX `spe==1` |
| `Is_container` | C, **imported live** | |
| `probe_monster` | C `:625–640`, **not called** (correct) | |
| SPE_DRAIN / `zap_steed` probe | C siblings, **named omit at this SHA** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** none in the arm (`observe_object` / `ustatusline` / `learnwand` are non-dice). Public fortress never self-zaps probing.

## C ↔ JS fidelity

JS:

```
        probe_objchain(game.invent);
        update_inventory();
        learn_it = true;
        await ustatusline();
```

Call order matches `:2961–2964`. Empty invent still sets `learn_it` (C does not gate on `gi.invent`). Does not call `probe_monster`. Match.

`probe_objchain` visit body matches `:614–621` field-for-field: `observe_object`; `Is_container||STATUE` → `lknown=1`, `cknown=1` unless Schroedinger; else TIN → `known=1`. No `cobj` recursion (C only `nobj`). The Array branch is the D-1017 hero-invent encoding of that same walk, not a second algorithm. Minvent keeps `nobj`. If invent is a holey Array, `for...of` skips empty slots the way a null `nobj` node would not appear — keep-path invent has real objects.

`observe_object`: C skips when `Hallucination` or generic otyp. JS returns immediately on Hallu (no dknown). Probe still sets lknown/cknown after. Match C’s split. FIRST_OBJECT generic skip still named on `invent.js`.

`ustatusline` prints the C format string with `piousness(false, align_str(ualign.type))`. `info` is hard `''` (Sick/Stoned/Slimed/Strangled/Vomiting/Confusion/Blind/Stunned/Wounded_legs/Glib/utrap/Fast/undetected/disguised/Invis/ustuck/gas named). Non-poly HP/AC/level match `:3485–3488`. Upolyd still uses `ulevel`/`uhp` not `mons[umonnum].mlevel`/`mh` — named. Callee is **not** a stub: it emits the Status line C always prints.

`update_inventory` is the live `invent.c` port (moveloop / suppress_map gates). `learnwand` after the switch always fires for this arm.

Hallucination check: “Match C `zapyourself` WAN_PROBING” while **`probe_objchain` / `observe_object` / `ustatusline` are live** is not a dispatch-stub lie. “Match C `ustatusline` `, dying from illness` / Upolyd `mh`” **would** be. “Match C `zap_steed` `probe_monster`” **would** be.

## Hallucinations / overclaim

Subject says self-zap identifies carried items and prints ustatusline instead of doing nothing. **True:** empty invent still learn+Status; chest dknown/lknown/cknown; tin `known`; dagger observe-only; Schroedinger skips cknown; statue lknown+cknown; Array walk without nobj; Blind still learns via invent observe; Hallu skip dknown with lknown still. **False until named** for SPE_DRAIN self, `zap_steed`/`zap_updown`/`bhito` probing, `ustatusline` ailments/Upolyd, and `observe_object` FIRST_OBJECT. Stamping **Addressed:** D-1435 for `:2960–2965` + Array `:611–623` is fair. Do **not** stamp “Match C `probe_monster` on self.” Do **not** treat fortress PASS as a probe self-zap.

## Density

One `zapyourself` arm plus the invent-encoding fix `probe_objchain` already needed for that arm. ~40 lines of JS. Playbook §2b caller/callee. Did not glue drain. Queue refill of named probing siblings is map-driven, not a second hypothesis in `js/`. Acceptable.

## Branch-by-branch confirm

1. Empty invent: Status; learn. Match.
2. Unlocked chest: dknown + lknown + cknown. Match.
3. Schroedinger box: lknown, **no** cknown. Match `:618–619`.
4. TIN: `known`. Match.
5. Non-container: observe only (no lknown). Match.
6. Two Array chests, no nobj: both visited. Match D-1017 encoding of `:614`.
7. Hallu: no dknown; lknown still. Match.
8. Blind: still learn (invent observe, not `learnwand` sight). Match canary; `learnwand` Blind path still exists for the wand object itself.
9. SPE_DRAIN still default at this SHA. Named.
10. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. No recorded coordinates. Plain ESM. Comment-only `insight.js` hunk is not gameplay.

## Verification

Journal: private canary **17**/17 (C/JS grep; Rule #2; empty invent still learn+Status; chest dknown/lknown/cknown; tin known; dagger observe-only; SchroedingersBox skips cknown; statue lknown+cknown; Array walk two chests no nobj; Blind still learns via invent observe; Hallu observe skip dknown with lknown still; SPE_DRAIN still default; WAN_LOCKING D-1434); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD `530eaa3c` **44**/44. Fortress PASS is not a probe self-zap.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Call order, always-learn, Array/`nobj` visit fields, and live `ustatusline` Status line match `:2960–2965` + `:611–623`.

Named omits (map / Open, not Must-fix):

1. `zap_steed` / `zap_updown` / `bhito` WAN_PROBING
2. `zapyourself` SPE_DRAIN_LIFE (later SHA in this audit is **bhitm** drain)
3. `ustatusline` ailment suffix + Upolyd `mh`/`mlevel`
4. `observe_object` FIRST_OBJECT / generic skip

Do not Must-fix “self should `probe_monster`” (C does not). Do not Must-fix “empty pack should skip learn” (C always learns). Do not Must-fix “dispatch is a stub.”

## Callers / RNG ledger

C callers: `dozap` self-dir → `zapyourself`. No new dice. Public fortress does not self-zap probing.

Verdict: **ACCEPT-WITH-DEBT**
