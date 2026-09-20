# Review 1603 — c1f00cd4 — light.c relink_light_sources whole-body port (D-2644)

**Metadata:** SHA `c1f00cd4`, `light.c` `relink_light_sources`, D-2644.
JS: `js/light.js` (+66: new export) + `js/save.js` (+12: two guard
calls); 3 new edges (find_oid/find_mid/lookup_bones_id) + FM_EVERYWHERE
const, all ALREADY/IN-SCC. No prior review claimed closed.

## Intent vs deliverable

Subject promises: new exported `relink_light_sources(ghostly)` in C
order (walk, flag gate, type arms, ghostly remap, assign-then-check
obj/mon arms, miss/bad-type panics≡throws, flag clear) plus both
restore.c caller guards in save.js. Diff delivers all of it. Promise
matches deliverable.

## Inventory

- `relink_light_sources` (light.js, sync) — new C-home export.
- save.js: two `relink_light_sources(false)` guards (restgamestate
  `:726` + getlev `:1300` positions).
- No deleted symbol, no local→import re-point (the canonical
  `find_mid` is imported, not region.js:422's clone — right
  direction).

## C ↔ JS fidelity

C locus `light.c:516–563` (48 L, read here). Structure first: C's
outer `if (flags & FIXUP)` gate with the flag-clear INSIDE ≡ JS
`if (!gate) continue` + clear at loop end — equivalent ✓. Arm by
arm (no RNG either side):

- `:538` walk, `:539` flag gate ✓ (`game.light_base` array).
- `:540` OBJ/MON arms; `:541` bare-numeric nid (`ls.id | 0` —
  the deserLightList shape: flagged entries hold unrestored ids;
  a linked ref would `| 0` to 0 and throw LOUD, never silently
  relink — panic-equivalent behavior on violated assumptions).
- `:542–543` ghostly remap via live `lookup_bones_id`, miss⇒throw
  ≡ C `!lookup_id_mapping ⇒ panic` ✓ as control flow, with one
  documented semantic narrowing: C's map covers obj AND mon ids
  (restore.c:1484 bucket/list state) while JS's covers mon ids
  only — so a ghostly OBJ light would miss→throw where C remaps.
  Unreachable today: getlev_bones installs no lights (named bones
  omission, bones.js:564) and no caller passes `true`; the D-log
  files C `lookup_id_mapping` as its own row. LIVE callee +
  dedicated future row + unreachable arm = named, not a stub.
- `:545` `which = '\0'` with explicit escape (0 NUL bytes in both
  files, verified) ✓.
- `:546–551` assign-then-NULL-check shape exact (`ls.id =
  find_oid(nid)` / `find_mid(nid, FM_EVERYWHERE)`); FM_MIGRATE/
  FM_MYDOGS is mon.js's pre-existing named omit, flag passed for
  fidelity ✓ (`find_oid` shk.js:4907, `find_mid` mon.js:3455,
  both sync-live).
- `:553–557` miss/bad-type panics≡throws with C-exact texts
  (`%u`→`>>> 0`, `%d`→parens — the probe-caught parens bug was
  fixed in-commit, good signal) ✓; `:559` flag clear inside the
  gate ✓.
- Callers: C restore.c:726 FALSE + :1300 ghostly; JS save.js
  mirrors both positions, `false` on the save path (ghostly ⇔
  bones, correct) ✓. C getlev order (lights :1145 → fmon :1146
  → regions :1225 → relink :1300) is preserved in shape; both
  calls are flag-gated no-ops today (entries arrive pre-linked
  via relinkLevelTimersLights), so ordering is unobservable —
  the guards are forward cover, honestly commented as such.
- Named (same commit, with owners): lookup_id_mapping row,
  find_mid flag arms, ghostly light install, LSF producers. No
  live-arm stubs.

## Hallucinations / overclaim

`/tmp/relink_probe.mjs → 11/11` is scratch evidence, not
re-runnable here; the audit rests on the C comparison. The
"entries arrive already linked, so flag-gated skip" framing is
explicit that the calls are guards today — no inflated effect
claim. No dispatch-vs-stub overclaim.

## Density

48-line C function + 2 caller guards, two modules, ~78 JS
insertions. Right-sized (one function + its wiring).

## Verification

- `node scripts/imports.mjs --rulecheck` → Rule #2 clean (whole `js/`).
- Diff added-lines grep: 0 `FORCE`/`DIAG`/`getRngLog`/`fastforward`.
- Re-measured: `hidden-proxy.mjs verify relink_light_sources --base
  c1f00cd4~1 --reach-all` → `0 session(s) blocked` (vacuous-note
  path, honestly labeled — coverage row, no corpus owner) + `smoke
  24/24 PASS, 0 regressed → REACH-OK`. Both summary lines cited;
  no REGRESSED session. Matches the D-log's bullet.

## Actionable C-wrongs

None. Full arm closure, C-exact panic texts, both callers wired;
the one narrowing (obj-id ghostly map) is unreachable and has its
own named row.

Verdict: **ACCEPT**
