# Review 978 — 6d8641bf — surface() stairs arm (D-2008)

Metadata: SHA `6d8641bf`, D-2008, Open-row port (break_armor helm
fall `to the floor` vs `to the stairs`; scen-poly-Ranger-92133
step 91, diagnosed drop_weapon residual). js/ touches 2 files
(`js/sit.js` full `surface()` rewrite, `js/hack.js` one-word
`export`). No stamp owed.

## Intent vs deliverable

Subject promises: full `surface()` in exact C branch order
(SURFACE_AT look-through, air-bubble, pool, ice, lava, bridge on
raw typ, altar/grave/fountain, On_stairs, SDOOR wall, earthlevel
floor gate) plus exporting the existing `On_stairs`. Diff actually
adds: exactly that. Promise == diff. The misattribution note
(owner is `surface()`, not the `drop_weapon` literal at
polyself.c:1331) is corroborated by the fix working.

## Inventory

- Changed JS function: `surface()` (shared home, used by
  break_armor helm + moverock_core).
- `On_stairs`: function → `export`, body untouched (the
  playbook-correct direction — notably, dogmove.js:82 keeps a
  pre-existing local clone, untouched by this SHA, not new debt).
- No deleted symbols, no clone→import re-points — no `sym.mjs`
  delete audit required (resolutions informational): `On_stairs`
  hack.js:2526 sync, `db_under_typ` hack.js:1371 sync.
- Named omits: swallow maw/husk arm (cycle sit.js↔mhitu.js) +
  the three per-context partial clones (dig.js:235,
  dokick.js:251, engrave.js:121) deliberately not unified.

## C ↔ JS fidelity

C locus: `dungeon.c:1749–1788` (read verbatim). Branch-by-branch:

- Swallow arm: OMITTED, named in commit and map (turns.md:341)
  with the cycle rationale and the no-corpus-session claim. An
  arm ships iff callees are LIVE/OMIT/CLONE — this one is OMIT
  with citation. ✓
- `SURFACE_AT` (`rm.h:146`): DRAWBRIDGE_UP looks through via
  `db_under_typ(mask & DB_UNDER)`. JS passes the full
  `drawbridgemask` — equivalent because `db_under_typ`
  masks `& DB_UNDER` internally (hack.js:1372). Verified, not
  assumed. ✓ Only the bridge arm reads raw `lev->typ` — JS
  `rawtyp === DRAWBRIDGE_DOWN`. ✓
- Order after look-through: air(+waterlevel bubble/cloud),
  pool (`Underwater() && !Is_waterlevel` → bottom else
  `hliquid`), ice, lava, bridge, altar, headstone, fountain,
  stairs, wall/SDOOR, doorway, room-not-earthlevel floor, ground
  — exact C order, exact strings. The old JS had fountain before
  altar/grave and no stairs/earthlevel arms; the reorder is the
  fix (STAIRS ≥ ROOM misread). ✓
- Clones: `is_ice` (sit.js:569) matches C arm-for-arm (ICE typ
  or DRAWBRIDGE_UP over DB_ICE); `Underwater()` (sit.js:150)
  matches `youprop.h:279` (`u.uinwater`) — both verified CLONEs,
  both pre-existing locals reused, not newly cloned. ✓
- `hliquid` draws only under Hallucination on both sides —
  parity preserved by calling the same live function. No RNG
  reorder. ✓
- Callee closure: `On_stairs`/`db_under_typ`/`is_pool`/`is_lava`
  extend the existing hack.js edge (`--can` ALREADY per D-log);
  `SDOOR`/`Is_earthlevel` extend the const.js edge. No new module
  cycle. Every shipped arm's callees LIVE or verified CLONE. ✓

## Hallucinations / overclaim

None. The "focused replay before verify" numbers are presented
as raw replay state, not as gates — the gate is the hidden-verify
line, which my re-run reproduces exactly.

## Density

45 changed lines for a 40-line C function in its shared home,
plus a one-word export. Right-sized. (The old partial — "enough
for fountain / room floor" — is fully replaced, not stacked.)

## Verification

Re-measured myself: `hidden-proxy verify drop_weapon --base
6d8641bf~1` → `0 PASS, 1 moved past, 0 unchanged, 0 worse →
PROGRESS` (92133 → Blindf_off@129 was 91), identical to the
D-log. Plus cited green 2/2 + strict ×2, cohort 7/7, full 44/44
(shared file changed — full run claimed; fortress re-confirmed
in this iteration's cadence). Grep of the js hunk: no
`FORCE`/`DIAG`/`getRngLog`/seed/coordinate/`fastforward`. Rule #2
clean (re-ran this iteration).

## Actionable C-wrongs

None in this delta.

Verdict: **ACCEPT**
