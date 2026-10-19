# Review 2961 — 067c831df — doname_base's inlined xname preamble find_artifact()s

- SHA: `067c831df` (cliff, live-queue owner `pluslvl`, first of its 2 rows;
  writer = objnam.c xname :660–661 via doname_base)
- D-entry: D-4121; Ledger: doname_base partial
- `js/` diff: `js/objnam.js` +5

## Intent vs deliverable

Promise: doname_base starts with `bp = xname(obj)`, and xname calls
find_artifact on a seen artifact. JS doname_base inlines xname's preamble
and calls pretty_base, so it skipped that arm. An artifact first seen
through doname (a monster picking it up, `distant_name(otmp, doname)`)
never got its «found …» livelog, and `#chronicle` lacked row 56. Diff:
`if (obj.oartifact && obj.dknown && _find_artifact) _find_artifact(obj)`
right after the inlined observe step. Promise = diff.

## Inventory

- `doname_base` — objnam.js:3278–3299 preamble; C objnam.c:1223–1751
  (`:1247` `bp = xname(obj)`).
- Mirrored arm in `xname_flags` — objnam.js:1096; C xname :660–661.
- Hook `_find_artifact` — objnam.js:2537 (set by artifact.js, TDZ-safe
  setter idiom).

## C ↔ JS fidelity

```c
if (!nn && ocl->oc_uses_known && ocl->oc_unique) obj->known = 0;  /* :625 */
if (!Blind && !gd.distantname) observe_object(obj);               /* :627 */
if (Role_if(PM_CLERIC)) obj->bknown = 1;                           /* :629 */
if (iflags.override_ID) { known = dknown = bknown = TRUE; ... }   /* :632 */
...
if (obj->oartifact && obj->dknown) find_artifact(obj);           /* :660 */
```

The JS preamble does the unique-known clear (`clear_unique_known_leak`),
the cleric bknown, observe under `!Blind && !distantname`, and now
find_artifact on the **real** `obj.dknown`, not the override_ID copy. C's
comment at :655–658 says the real field is deliberate (wizard ^I must not
"find" an artifact the hero has not seen). JS sets cleric bknown before
observe, where C observes first. Neither writes the other's field and
neither draws RNG, so the swap changes nothing. The `Blind()` used here
is objnam.js:89, a local copy that is C's youprop.h:103 expression (with
D-0716's note that it does not read sticky `u.Blind`). That is a
**verified clone**, unlike timeout.js's (Review 2960). If pretty_base
reaches xname_flags too, find_artifact runs twice. That is harmless:
found_artifact returns early once `found` is set.

## Hallucinations / overclaim

None in the code claim. The commit's "Named:" paragraph is the ledger
row's inherited omit (D-4045's "other menu builders still don't apply
windows.c add_menu :1803–1807"). That text has nothing to do with this
fix: it is the finish-iteration Named-text copy described in the
project's gotchas. The text is stale, not false about this SHA.

## Density

A one-arm fix in the writer, and the right size for one dropped C call.
doname_base still inlines xname's preamble instead of calling xname. That
structural clone stays `partial`.

## Verification

```text
verify pluslvl (--base 067c831df~1): 2 blocked
  scen-extcmd-Tourist-51257053: PASS
  scen-shop-Priest-49959522: PASS     (D-4122's writer, next SHA)
verify pluslvl: 2 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
verify doname_base: 1 blocked, still at step 1048 (scen-chain-Priest-50557210)
  → NO MOVEMENT (pre-existing, not claimed)
```

This matches the D-log, which attributes the Tourist row to this fix
alone and the Priest row to D-4122.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
