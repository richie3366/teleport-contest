# Review 1035 — dd88a89c — pline.c You_hear Unaware dream arm (D-2065)

## Metadata

- SHA: `dd88a89c` — `pline.c You_hear Unaware dream arm (queue owner zapyourself, writer You_hear; sounds.js clone removed) (D-2065).`
- JS diff: `js/hack.js` +11/−2 (You_hear gate + Unaware arm, 2 new imports);
  `js/sounds.js` +1/−8 (local clone deleted, import extended).
- Docs: D-2065 D-log/D-index/CURRENT/NOTES/queue/turns.md map.
- Next index: 1035.

## Intent vs deliverable

Subject promises: port C `You_hear`'s Unaware dream arm so the bounced
sleep-ray + fountain `dosounds` no longer appends the awake line behind
«The sleep ray hits you!», and delete the drifted `sounds.js` clone.
Diff actually adds: `(Deaf && !Unaware)` gate + `unaware → "You dream
that you hear …"` arm in the `hack.js` export; `sounds.js` drops its
local `You_hear` and imports the export. Also re-attributes the owner:
the «hits you!» line is `dobuzz` (zap.c:4964), not `zapyourself:2860`
(`zhitu` ZT_SLEEP prints nothing). Promise == diff.

## Inventory

- Changed: `You_hear` (js/hack.js:146) — gate + arm, no signature change.
- Deleted: file-local `You_hear` clone (js/sounds.js, −8); re-pointed to
  the `hack.js` export (existing edge extended, no new edge).
- New imports: `unconscious` (teleport.js), `is_fainted` (eat.js).
- Diff grep: no `FORCE`/`DIAG`/`getRngLog`/seed/step/coordinate reads,
  no `fastforward`, no hardcoded coordinates.

## C ↔ JS fidelity

C `You_hear` (`nethack-c/upstream/src/pline.c:435–452`, via `csym.mjs`):
`if ((Deaf && !Unaware) || !flags.acoustics) return;` then Underwater →
«barely hear», Unaware → «dream», else «hear». JS now matches gate and
order exactly; Underwater stays named-deferred (pre-existing map omit,
no blocked session reaches it). `Unaware` macro (`youprop.h:399`):
`(gm.multi < 0 && (unconscious() || is_fainted()))` — JS
`(game.multi|0)<0 && (unconscious() || is_fainted())` is verbatim
(including the redundant multi test C keeps deliberately). Zero RNG in
the arm (pure predicates), so no keystream risk.

Callee closure: `unconscious` (js/teleport.js:1682, sync export, hoisted,
C trap.c:6776 body) and `is_fainted` (js/eat.js:447, sync export) are
both LIVE. `imports.mjs --can js/hack.js js/teleport.js unconscious` →
`ALREADY: hack.js already statically imports teleport.js. No new edge
needed.` `is_fainted` extends the existing `eat.js` import. No STUB in
a live arm. The 12 remaining file-local `You_hear` clones (dbridge, do,
dokick, dothrow, fountain, lock, mhitm, mhitu, mthrowu, music, trap,
zap) are named in `turns.md`, none reached by a blocked session.

`sym.mjs You_hear` (required, deleted-clone check): single export
`js/hack.js:146 ASYNC` + `12 LOCAL CLONE(S) in 12 files — IMPORT the
export` — sounds.js clone gone, no dangling reference (the only
`sounds.js` caller now resolves to the import).

Behavioral delta beyond the arm: deaf-but-aware heroes still suppressed
(`Deaf && !unaware`), deaf-and-unaware now dream — exactly C's gate.
Old code's flat `u.Deaf` read is preserved as the first disjunct (full
`HDeaf||EDeaf||…` widening came later in D-2070, correctly not glued here).

## Hallucinations / overclaim

None. «Both JS bodies already match C» spot-checked true (teleport.js
usleep/nomovemsg shape; eat.js `uhs===FAINTED`). The dosounds/CO-8
append-gate mechanism cited in the comment is consistent with the
observed frame pair (110 sleep-only + 111 dream+wake, both byte-exact
post-port per the bullet).

## Density

~12 net insertions across 2 files: one C function arm + a clone
deletion in the same envelope (runbook §7 clone-drift). Right-sized.

## Verification

D-log Verify bullet: `verify --fn zapyourself` → 0 PASS, 2 moved past
(Knight 17→mcalcmove@20 re-measured; Rogue 110→unstuck@120) +
green/strict/cohort + full 44/44. Re-measured myself:
`hidden-proxy.mjs verify zapyourself --base dd88a89c~1` → `0 PASS, 2
moved past, 0 unchanged, 0 worse → PROGRESS` with both moves identical
to the claim. No WORSE, no vacuous check (2 sessions at baseline, both
named). Full-suite re-run justified (hack.js is shared).

## Actionable C-wrongs

None.

## Verdict

Verdict: **ACCEPT**
