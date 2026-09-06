# Review 883 — 05c03076 — trap.c lava_effects remaining arms (Fire/Wwalking survive, invent burn, sink-and-die) (D-1913)

Metadata: SHA `05c03076`, D-1913. Files: `js/trap.js` (+256/−24:
full `lava_effects` port replacing the fall-only stub), data map
section, queue row archived. Next index 883.

Intent vs deliverable: subject promises the remaining arms in
C order. The diff delivers them — `d(6,6)` first, early-outs,
in_use flagging, boots burst, !Fire envelope, done/teleds loop,
countermeasures, sink arm, burn_stuff tail — and retires the
stub's named omissions. Promise ≡ diff structurally. One arm is
behaviorally wrong (below).

Inventory: 0 new top-level functions (`export async function
lava_effects` already existed as a stub — both callers,
`pickup.js:1766` and `trap.js:2714`, already await ✓), 1 closure
added (`gotoBurnStuff`, duplicated by the `burn_stuff_tail`
labeled block — 8 lines twice, style only), 13 dynamic imports
(same-edge file-cycle pattern, hoisted-safe), 0 deleted names.

**C ↔ JS fidelity** (`csym lava_effects` →
`trap.c:6792–6987`, 196 lines, read in full): `d(6,6)` before the
`in_lava_effects` early-out ✓; `feel_newsym`/`burn_away_slime`/
`likes_lava` FALSE ✓; entry `usurvive` with uprops-slot + flat
reads ✓; protect_oid/one-item + `impossible(%d)` + organic||
POTION/`!oerodeproof`/oc_oprop/SCR_FIRE/SPE_FIREBALL/
`obj_resists` flag loop ✓ (snapshot iteration ≡ saved-`nextobj`
idiom); boots burst first with `in_lava_effects` guard,
`Boots_off`, protect-exempt `useup` ✓; Wwalking burns-you +
`losehp(dmg)`→burn_stuff vs fall pline ✓ textually; Lifesaved/
discover/wizard recompute ✓; guarded invent burn with Book-glow
spare, worn burst + `remove_worn_item(TRUE)` + `useupall` ✓;
Another/Other/An/Some summary (C's `burncount==1` else-branch
kept verbatim) ✓; boil-away poly check ✓; 2× `uhp=-1` +
killer rebuild + `urgent_pline` + `done(BURNING)` +
`safe_teleds(ALLOW_DRAG|TELEPORT)` loop ✓ (`TELEDS_ALLOW_DRAG`
is a pre-existing static import, `:101` — no dangling ref);
`burncount==2` countermeasure timeouts via `set_itimeout_prop`
✓; `rescued_from_terrain` + `spoteffects(FALSE)` → TRUE ✓;
sink arm with `rn1(4,4)`-then-`rn1(4,12)` order and `!boil_away`
short-circuit ✓, `set_utrap`/`monstseesu`/`losehp 1|uhp/2` ✓;
`destroy_items(youmonst,AD_FIRE=2,dmg)` (`const AD_FIRE = 2`
matches 5-file repo idiom and `monattk.h:44`) + `ignite_items`
→ FALSE ✓. No RNG invented or dropped anywhere.

C-wrong (one family): **Wwalking is snapshotted at entry
(`heroWwalking`, `:5047`) but C re-reads the `Wwalking` macro
(`youprop.h:260`) after the boots-burn.** Water walking boots
are `LEATHER` (`objects.h:710–712`) ≤ `WOOD`, hence organic:
an ungreased pair worn as the sole WW source bursts on lava
contact in both C and JS. In C the burst clears `EWwalking`,
so the post-burn `if (Wwalking)` / sink-arm `else if
(!Wwalking…)` observe FALSE; in JS the snapshot stays TRUE.
Consequences, both reachable: (1) no-Fire lava step — C
`"You fall into the lava!"` → invent burn → `done(BURNING)`
loop (likely death), JS `"The lava here burns you!"` →
`losehp(dmg)` → burn_stuff → walks on; (2) Fire + WW-boots
lava step — C takes the sink arm (`set_utrap`, sink pline,
half-HP `losehp`, `monstseesu`), JS skips it entirely.
Verified the fix stays in one locus: `Boots_off`→`setworn`→
`confer_oc_oprop(off)` clears `uprops[WWALKING].extrinsic`
synchronously (`do_wear.js:330–331`), and no code ever sets the
`u.EWwalking`/`u.Wwalking` flats (zero writers in `js/`), so a
live re-read after `await Boots_off()` observes the flip —
only the snapshot stands in the way. Fire needs no re-read
(no worn burnable Fire source; boots don't grant Fire).
Falsifier for the fix iter: WW boots + no Fire + lava step
must take the fall path (`done` reached), deterministically.

Hallucinations / overclaim: D-log "Named: none new — all arms
live (no stub in a live arm)" overclaims exactly the family
above — the Wwalking-survive arm is ported but misbehaves when
boots are the source. The `plsel`-style "Match C" envelope
claim does not survive the boots case. Said explicitly.

Density: one function, +256 — right-sized. Not the issue.

Verification: D-log gates PASS (green 2/2 + strict ×2, cohort
7/7; no full-suite line for this shared-file change — gap
noted, though the end-of-iteration cadence run covers HEAD).
Re-measured: `hidden-proxy.mjs verify lava_effects --base
05c03076~1` → 0 blocked at baseline and now — vacuous as
stated, TOP30 map row. Diff grep: no FORCE/DIAG/seed/
coordinate patterns. `imports.mjs --rulecheck` → clean (at
HEAD). `sym.mjs`: `lava_effects` sole async export, no clones.

**Actionable C-wrongs**:

1. lava_effects post-boots-burn Wwalking staleness — re-read
   the macro (slot+flats idiom) at the three post-boots points
   (`if (Wwalking)` burns-you gate, sink-arm `else if
   (!Wwalking…)`, countermeasure `if (!Wwalking)`); keep the
   entry snapshot only for entry `usurvive` + flag loop, where
   C also reads pre-burn values. One iter, probe falsifier
   above. → Must-fix (prepended).

Verdict: **QUALITY-RISK**

**Addressed:** D-1918
