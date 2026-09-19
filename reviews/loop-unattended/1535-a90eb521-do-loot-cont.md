# Review 1535 — a90eb521 — pickup.c do_loot_cont (D-2576)

## Metadata

- SHA: `a90eb521`
- D-id: D-2576. Next index: 1535.
- Files:
  - `js/pickup.js` (+70/−27: restarted `do_loot_cont`, static lock/cmd
    imports, new const imports).
  - `js/lock.js` (+1/−1: `u_have_forceable_weapon` exported).
  - `js/cmd.js` (+1/−1: `cmdq_add_ec` exported).
- C locus:
  - `nethack-c/upstream/src/pickup.c:2087–2162` (`do_loot_cont`,
    staticfn; `csym.mjs` range).
  - Callers `pickup.c:2262` (menu multi-loot) + `:2279` (floor scan).

## Intent vs deliverable

Subject promises:

> `pickup.c` do_loot_cont whole-body port (UNTRAP/FORCE autounlock,
> destroyed-box scan, Bag of Tricks) (D-2576).

Diff delivers that with no new module edges. Promise matches
deliverable.

## Inventory

- Restarted: `do_loot_cont(cobj, cindex, ccount)`
  (`js/pickup.js:3971`, file-local — correct, C is `staticfn`).
- Re-pointed (required `sym.mjs` output, pasted here):
  - `u_have_forceable_weapon` now exported (`js/lock.js:1815`, single
    export; body pre-existing C-cited).
  - `cmdq_add_ec` now exported (`js/cmd.js:203` — canonical export;
    note 4 local clones persist in apply/dig/dothrow/iactions as
    pre-existing debt; this commit correctly adds no 6th clone and
    imports the canonical one).
  - `pick_lock`/`autokey`/`doforce` converted from dynamic to static
    import on ALREADY-edges (`--can` clean for both pickup→lock and
    pickup→cmd).
- Callees, all LIVE: `pick_lock`, `autokey`, `u_have_forceable_weapon`
  (lock.js), `cmdq_add_ec` + `doforce` (cmd.js), `objects_at`, `You`,
  `rnd`, `maybe_half_phys`, `losehp`, `makeknown` (existing imports).
- `finish_losehp_done` via dynamic end.js import matches the
  apply.js/artifact.js precedent (cycle avoidance, not a new pattern).
- No STUB in any live arm. `#if 0` copy honestly noted as compiled out
  upstream (`:2100–2105`).

## C ↔ JS fidelity

Walked against C `:2087–2162`, in order:

- Null guard (`:2095–2096`). Match.
- Locked plines: `The(xname)` → upstart/theArt, `the(xname)` → theArt
  (pre-existing house rendering, untouched here). Match.
- `lknown = 1` (`:2110`). Match.
- `u.dz = 0` present (`js/pickup.js:3991`, `:2116–2117`). Match.
- Short-circuit `unlocktool || UNTRAP` exactly mirrors C `:2121–2123`:
  autokey is called whenever APPLY_KEY is set and the result is kept
  even when untrap runs first (assignment-in-condition preserved).
- `pick_lock(unlocktool, ox, oy, cobj)` → ECMD_TIME (`:2124–2126`).
  Match.
- Destroyed-box `objects_at` rescan with `*cobjp = 0` → local null
  (`:2127–2134`). Match — and the "no caller effect" claim was checked
  against C itself here: neither caller (`:2262` reassigns from
  pick_list each iteration; `:2279` advances via saved `nobj`) reads
  `*cobjp` after return, so the local-null drop is exactly equivalent.
  (The D-log's "re-read their own refs" phrasing is loose; the
  conclusion is right.)
- FORCE arm gates in C order (`:2137–2139`; `res !== ECMD_TIME` is
  vacuously true post-early-return but positionally faithful) →
  `cmdq_add_ec(CQ_CANNED, doforce)` + `abort_looting` (`:2142–2143`).
  Match.
- Unlocked `lknown = 1` (`:2148`, no update_inventory). Match.
- Bag-of-Tricks arm:
  - You/teeth plines (`:2153–2154`). Match.
  - `rnd(10)` (`:2155`). Match — sole RNG, same gate and position.
  - `losehp(Maybe_Half_Phys(tmp), "carnivorous bag", KILLED_BY_AN)`
    (`:2156`). Match.
  - Death path `finish_losehp_done` + ECMD_TIME replicates C `done()`
    noreturn (makeknown/abort skipped). Match.
  - Survival makeknown + abort + ECMD_TIME (`:2157–2159`). Match.
- Tail `use_container` (`:2161`, args unchanged). Match.

## Hallucinations / overclaim

None. "Named: none new" is accurate — UNTRAP mechanics defer to the
previously ported `pick_lock`, `#if 0` to C itself.

## Density

~72 `js/` insertions for a 76-line C staticfn + two 1-line exports —
right size (§2b).

## Verification

- D-log claims VERIFY PASS (coverage row, 0 blocked at baseline).
- Re-ran here (required):
  - `hidden-proxy verify do_loot_cont --base a90eb521~1 --reach-all`
  - → 0 blocked both sides (vacuous note, expected)
  - → smoke 24/24 REACH-OK.
- Claim confirmed.
- Diff grep: no FORCE/DIAG/seed/coordinate/`fastforward` content.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
