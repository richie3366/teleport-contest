# Review 2959 — c39a259f0 — makemon_rnd_goodpos reads live Blind()

- SHA: `c39a259f0` (cliff, live-queue owner `hmonas` (parked symptom since
  D-4112), writer = makemon.c makemon_rnd_goodpos)
- D-entry: D-4119; Ledger: makemon_rnd_goodpos ported
- `js/` diff: `js/makemon.js` +4/−2

## Intent vs deliverable

Promise: the fallback scan skips its "not in sight" first pass only when
`gi.in_mklev || Blind`. JS read a local `u.ublind || u.Blind` copy, and
the stale `u.Blind` mirror was true for a seeing hero. So after 50 failed
random tries a random newt took the first good square of the second
pass, in plain view, and «A newt suddenly appears close by!» printed.
Diff: `Blind()` (invent.js export, already imported). Promise = diff.
This is the writer of hmonas's parked block (Review 2952 left
Caveman-610084 s559 parked there), so it does not re-port the symptom.

## Inventory

- `makemon_rnd_goodpos` — makemon.js:3196–3262; C makemon.c:1075–1137.
- Callee `Blind` — invent.js:372; C youprop.h:103.

## C ↔ JS fidelity

```c
int bl = (gi.in_mklev || Blind) ? 1 : 0;              /* :1100 */
#define Blind ((HBlinded || EBlinded) && !BBlinded)  /* youprop.h:103 */
```

JS `Blind()` is `((HBlinded || EBlinded) && !BBlinded)`, plus a
`uroleplay.blind` arm. In C, roleplay blindness sets HBlinded at u_init,
so the extra arm gives the same answer. I walked the rest of the
function, since it is ledgered ported. The random loop is `rn1(COLNO-3,
2)`, `rn2(ROWNO)` and `!in_mklev && cansee` → FALSE, else goodpos, up to
50 tries. The fallback has `xofs/yofs` from the last try, two passes, the
`!bl` GP_CHECKSCARY clear on the parameter (so it carries into pass 1 and
the stairway retry, as in C), the `% (COLNO-1) + 1` / `% (ROWNO-1) + 1`
walk, and `bl == 0 && cansee` skip. The stairway arm is guarded by
`!mon || mmove` and draws `!rn2(2)` per same-dnum stairway in list order,
then calls goodpos. The `goto gotgood` exits become early
`cc = …; return true`. Line for line with C.

## Hallucinations / overclaim

None. The D-log names the remaining drift: 29 local Blind clones
(`sym.mjs Blind`) and the `u.Blind` mirror writers (do.js, do_wear.js,
lock.js). This is the clone-drift family in project memory; only this
site was proven wrong by a session.

## Density

A one-site fix to the writer of a parked owner, at the right size for a
one-predicate C-wrong.

## Verification

```text
verify hmonas (--base c39a259f0~1): 1 blocked
  scen-worldtour-Caveman-610084: PASS
verify hmonas: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
verify makemon_rnd_goodpos: 0 blocked (vacuous; writer, not owner)
```

Exact match with the D-log.

## Actionable C-wrongs

None in this diff. The other `u.Blind` / local-Blind readers are the
known clone-drift debt, and each needs session evidence before it is a
Must-fix row.

Verdict: **ACCEPT**
