# Review 2090 — f789bb94f — oextra family C-signature + stamps

- SHA: `f789bb94f` (D-3130)
- Subject: "`mkobj.c` oextra family whole: newoextra C-signature + fracture_rock mislabel fix + 8 verify-stamp (coverage head dealloc_oextra)"
- js/ insertions: +57/−25 across js/mkobj.js + js/do_name.js
- Prior index: 2089; queue Must-fix at review time: empty

## Intent vs deliverable

Promise: export C-signature `newoextra()`, convert all 5
call sites, fix `newomid` to unconditional, restart
`free_omonst` in C order, fix the fracture_rock mislabel,
verify-stamp the rest (init_oextra by-design).

Diff actually adds: exactly that — 4 mechanical ensure-site
conversions, the newomid/free_omonst behavior fixes, the
do_name import + site, and doc ranges. Matches the promise.
No new helpers.

## Inventory (per function)

- `newoextra` (js/mkobj.js:4182, NEW export) — C :85–93.
  Whole; the old `(obj)` ensure-bag local is gone.
- `newomid` (:4223) — C :142–148. Unconditional `= 0` now.
- `free_omonst` (:4211) — C :127–140. C-order restart.
- `newomonst` (:4198), `new_omailcmd` (:4250),
  `copy_oextra` (:4294) — mechanical ensure conversions.
- `free_omid`, `free_omailcmd`, `dealloc_oextra` — doc-only
  (bodies pre-existing, re-verified below).
- `init_oextra` — by-design ledger set, no code (C
  staticfn :79–83).
- `new_oname` (js/do_name.js:1484) — 5th conversion site.

Callees: none (leaf family; alloc/GC named). `--can`
do_name→mkobj: ALREADY. Nothing deleted besides the old
local (re-pointed to the export).

```text
newoextra        js/mkobj.js:4182   sync (clone-drift flag cleared)
newomid          js/mkobj.js:4223   sync
```

## C ↔ JS fidelity

`newoextra`: `return {}` ≡ alloc+init+return (init_oextra
by-design: fresh `{}` reads zero under every `has_*` gate;
the lev_json.js:142 `!= null` cite is accurate — read).
All 5 call sites assign under C's `if (!oextra)` guard:
newomonst :117, newomid :146, new_omailcmd :160,
copy_oextra :423 (all four read in JS), new_oname
do_name.c:68 (C read: identical guard+else-free_oname).

`newomid`: unconditional `OMID = 0` ≡ C :142–148 (the old
`== null` keep-stale was the C-wrong). All 3 JS callers
assign after: copy :4309 (C :445–447 shape),
obj_attach_mid :4319 (C :2151 `newomid; OMID = mid`, read),
shk.js:4208 (C shk.c:3357 `newomid; OMID = owt`, read).

`free_omonst`: early-return + local `m` + drop ≡ C
:127–140; mextra GC stands (D-2275, pre-existing named).

`newomonst`: ensure + `{}` shell; `{}` ≡ zeroed monst at
every reachable reader — has_omonst is truthiness both
sides, and all fill happens immediately after: copy
memcpy-shape (delete-keys + assign, read), save_mtraits
key-copy (read in full), restore restmon (named save path).
No bare-shell reader reachable.

`dealloc_oextra`: body exact (oname/omonst-via-free_omonst/
omailcmd, drop bag; omid untouched like C). Mislabel fix
confirmed: zap.c:5564 sits in fracture_rock (:5537; poly_obj
is :1702), wired from js/dig.js:1934 inside fracture_rock.

`new_omailcmd`/`free_omailcmd`: bodies exact (ranges
:156–164/:166–173 verified via csym). The `dupstr('')`
edge is unreachable as claimed: only 2 JS callers, both
gated (mail.js:435 `if (response_cmd)`, copy :4307
has_omailcmd-gated); restore never calls it.

`free_omid`: unconditional body + `?.oextra` guard that
never fires — all 5 JS callers has_omid-guarded, including
zap.js:3342 whose C twin :1093 sits inside `if
(has_omid(corpse))` (:1065, read both sides).

`copy_oextra`: guard + ensure + oname/omonst/memcpy-shape/
omailcmd/omid arms ≡ :416–448; the :433 assert and `#if 0`
m_id renewal correctly excluded (named, D-2275).

Caller lists in docs spot-checked (bones.js:286,
timeout.js:2552, zap.js:3250, mkobj.js:502, shk.js:1350):
all hold with C-cited guards.

Diff grep: no FORCE/DIAG/getRngLog/seed/coordinates.

## Hallucinations / overclaim

None. "Zero behavior delta by construction" is earned —
each conversion site was re-verified fresh-`{}` both sides,
and the two real behavior changes (newomid reset,
free_omonst order) move toward C. Ranges in docs match
csym exactly.

## Density

One C file + one C-caller file, exactly 10 functions (the
cap, not over), no Must-fix bundled. 57 ins is structural
on a thin family; the D-log names the excluded same-file
PARTIALs as other subsystems. Per-function: all 10 ACCEPT.

## Verification

Re-measured (`--base f789bb94f~1 --reach-all`, all ten one
call): 0 blocked at baseline and working tree each,
vacuous notes, smoke 24/24 → REACH-OK ×10. Matches the
D-log; no REGRESSED session. Gates per D-log: syntax 2
files, rule2, green 2/2, strict ×2, cohort 7/7.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
