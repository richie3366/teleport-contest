# Review 1221 — ae53dac2 — getbones full C body (D-2255)

Metadata: SHA `ae53dac2` (D-2255). Queue row `bones.c` getbones,
3 sessions in traces (not as owner); also review 657 Actionable 1.
js/ +353/−214 (bones.js +284/−151 plus end/engrave/makemon/mklev/
options/sounds). Ceiling 450.

## Intent vs deliverable

Subject promises validate/trickery/Get-Unlink, `deserLevel` getlev
+ ghostly `propagate` DEFUNCT purge, `resetobjs` restore,
`fix_shop_damage`, `sanitize_engravings`. Diff moves `getbones`
into bones.js, deletes `try_load_bones` / mklev `getbones` /
`medusa_statue_propagate` / options `sanitize_name` clone, and
adds those callees. Promise kept. Review 657 item 1 is the
`deserLevel` hydrate.

## Inventory

New/moved: `export async function getbones`; `getlev_bones`;
`trickery` (local — C restore.c, JS has no restore.js, one
copy); `export function propagate`; `export function
sanitize_engravings`; `done` TRICKED arm. Changed: `resetobjs`
restore arm; `tended_shop` export; mklev Medusa sites call
`propagate`. Deleted: `try_load_bones`, mklev `getbones`,
`medusa_statue_propagate`. Re-pointed `sanitize_name`. `sym.mjs`:

```text
getbones         js/bones.js:489   ASYNC
try_load_bones   NOT FOUND
propagate        js/makemon.js:1473   sync
sanitize_name    js/bones.js:70   sync
sanitize_engravings js/engrave.js:140   sync
deserLevel       js/lev_json.js:755   sync
trickery         NOT EXPORTED — 1 LOCAL in bones.js:403
fix_shop_damage  js/shk.js:1297   ASYNC
in_rooms         js/hack.js:1257   sync
tended_shop      js/sounds.js:195   sync
medusa_statue_propagate NOT FOUND
```

`--can` bones→hack/sounds/engrave, engrave→bones, mklev→makemon/
bones all ALREADY (function imports, no top-level TDZ read).
Callee closure for getbones — LIVE or named OMIT: `rn2(3)`,
`no_bones_level`, VFS `open_bonesfile` analogue, `yn_function`,
`deserLevel`, `propagate`, `sanitize_name`, `mongone`,
`resetobjs` restore, `fix_shop_damage`, `sanitize_engravings`,
`delete_bonesfile`, `trickery`→`done(TRICKED)`. Save-arm
resetobjs remainder and RANGE_LEVEL install after getlev are
OMIT in-commit. `in_rooms` is the hack.js export, not mklev's
empty-string local.

## C ↔ JS fidelity

- Envelope vs `bones.c:639–656`: explore/discover, bones-off,
  `rn2(3) && !wizard`, `no_bones_level`, VFS miss → 0. C.
- Validate vs `:663–668`: JSON+`version===1` ≡ `SF_UPTODATE`;
  !wizard "Discarding unusable bones…"; ok=0.
- Wizard Get vs `:670–676`: `'n'` returns 0, keeps the file
  (no numbones). bonesid length+1 > 40 abandon vs `:682–691`.
- Mismatch vs `:693–703`: wizard pline + ok=0 then `trickery`
  (three plines + `done(TRICKED)`); wizard `done` returns
  (`end.c:1029–1032`, paniclog named Rule #2).
- Match vs `:707–733`: `getlev_bones` = `deserLevel` (relink
  kept) + fruitchn + restmonchn `propagate(mndx, true, true)`
  with cham-else-mnum, DEFUNCT cookie, peace/malign, install,
  `rest_track`. Then MGIVENNAME sanitize, DEFUNCT `mongone`,
  else `resetobjs(minvent, true)`; fobj/buried restore;
  `fix_shop_damage`.
- Common tail vs `:734–755`: `sanitize_engravings`,
  `numbones++`, wizard Unlink `'n'` keeps file, delete fail → 0.
- `resetobjs` restore vs `:66–99`: artifact exist/quest revert
  vs `artifact_exists(..., ONAME_BONES)`, oname sanitize,
  partly-eaten shop `no_charge` via `inside_shop`+`in_rooms`+
  `tended_shop`. C.
- `propagate` vs `makemon.c:957–982`: G_GONE, unique→extinct
  except high cleric, tally `!ghostly || result`, auto-extinct
  at `mbirth_limit`. Medusa sites now pass `(wastyp, true,
  false)` like C.
- `_stale_map_flush` / leave-gbuf paint is moved from
  `try_load_bones` (parent `:346–364`), not a new D-1831 grid
  snapshot. Public Get/Unlink yn.

## Hallucinations / overclaim

None. Hidden is labeled not a corpus PASS (trace reach; no
corpus bones file). "Full C body" is the getbones envelope with
named save-arm / RANGE_LEVEL-install omits, not a stubbed
dispatch. Review 657's deserLevel+ghostly is what shipped.

## Density

+353 for 128-line getbones + restore arm + propagate +
trickery + sanitize_engravings. One bones-load cluster. In-band.

## Verification

Audit re-ran the corpus claim itself:

```text
verify getbones: baseline ae53dac2~1 — 0 session(s) blocked
(0 at baseline, 0 in the working scoreboard)
```

Vacuous-0-confirmed as owner, matching the D-log. Green 2/2 +
strict ×2 + cohort 7/7 + full 44/44 (public bones yn) pasted.
Diff grep: no FORCE/DIAG/seed/coordinates/fs. Rule #2 clean
(re-run here, repo-wide; persist is frozen VFS).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
