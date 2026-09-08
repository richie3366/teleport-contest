# Review 1020 — b11c9f44 — polymon eyeless-form see-again arm (D-2050)

Metadata: SHA `b11c9f44`, D-2050, Open-row port
(queue owner `Blindf_off`, screen-first, 2
sessions). js/ touches 1 file: `polyself.js`
(+24/−2). No stamp owed.

## Intent vs deliverable

Subject promises: capture `wasBlind` at polymon
entry, add the `:899-902` see-again arm after
break_armor/drop_weapon and before newsym, drop
"Blind restore" from Named omits. Diff actually
does exactly that, with no import changes.
Promise ≡ diff.

## Inventory

- Changed JS: `polymon` (`js/polyself.js:976-1088`),
  async (pre-existing awaits kept).
- `sym.mjs` not needed for new names (none added:
  `make_blinded`, `BLINDED`, `TIMEOUT` already
  imported — confirmed at `polyself.js:120` import
  block). No symbol deleted or re-pointed; the
  envelope comment only drops two words.

## C ↔ JS fidelity

C locus `nethack-c/upstream/src/polyself.c:734-1071`
(338 lines via `csym.mjs`; entry `:739`, arm
`:899-902` read directly):

- Entry `was_blind = !!Blind` (`:739`, before
  `set_uasmon`) → JS `wasBlind` captured at
  function entry with the identical inline
  predicate as the `polyman` arm (`:600`), incl.
  `uroleplay.blind` ✓.
- Arm `if (was_blind && !Blind) {
  set_itimeout(&HBlinded,1L);
  make_blinded(0L,TRUE); }` after
  `break_armor(); drop_weapon(1);` (`:888-889`)
  and before `newsym` (`:902`) → JS places the arm
  after `await break_armor(); await
  drop_weapon(1);` and before `newsym(u.ux,u.uy)`
  ✓. The C items between (find_ac, hideunder,
  utrap) are pre-existing named omits; ported-arm
  order is exact.
- Body is line-identical in shape to the
  already-shipped `polyman` see-again arm
  (`:618-631` vs new `:1074-1088`): TIMEOUT-bit
  set on `HBlinded` + `uprops[BLINDED].intrinsic`,
  then `await make_blinded(0, true)` ✓ — a
  verified clone, not a fresh invention. End state
  (timeout cleared, sees, "can see again" pline)
  follows from the shared `make_blinded`
  (`js/do.js:2823`) both arms already use.
- `Blindf_off`-then-this-arm double-print edge:
  no corpus session reaches it; arm order mirrors
  C exactly (break_armor's Null arm runs first by
  construction). Honestly stated in D-log Named.

Callee closure: `make_blinded` LIVE; no new
callee; `gulp_blnd_check` gate stays a named map
omit (untouched, unreached by both sessions).

## Hallucinations / overclaim

None material. One measurement note: my re-run
(see Verification) moves 92133 to
peffect_polymorph@175 where the D-log recorded
damageum@150. Direction identical (strictly later
step + later owner, 0 worse); the drift is six
intervening ports (D-2051…D-2056) landing between
commit time and this re-run's working tree. The
PROGRESS claim stands, with the at-commit owner
preserved in the D-log.

## Density

+24/−2, one function, one falsifier (the missing
"can see again" line). Right-sized. Queue-owner
name (`Blindf_off`) was a misattribution the
D-log corrects with session evidence (no eyewear
doff on either path; RNG drawn in
exercise+polymon) — the true writer is ported.

## Verification

- Diff-hunk grep: no FORCE/DIAG/getRngLog/seed
  gates/fastforward (only hit is the commit message
  quoting its own Verify line).
- Re-measured `hidden-proxy verify Blindf_off
  --base b11c9f44~1`: `0 PASS, 2 moved past,
  0 unchanged, 0 worse → PROGRESS` (92090 →
  mhitm_knockback@236 was 211; 92133 →
  peffect_polymorph@175 was 129) — counts match
  the D-log; owner drift on one session noted
  above.
- Green 2/2 + strict ×2, cohort 7/7 per pasted
  `verify.mjs` tail.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
