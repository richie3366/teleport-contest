# Review 2921 — 4c6d7434f — animate_statue runs the makemon tail

- SHA: `4c6d7434f` (cliff, owner `animate_statue`)
- D-entry: D-4080; Ledger: trap.c (`animate_statue`, D-4080)
- `js/` diff: `js/trap.js` +5

## Intent vs deliverable

Promise: JS `makemon` is sync, and C's tail (appear Norep +
`if (go.occupation) dochugw(mtmp, FALSE)`) lives in the async
`makemon_appear_msg`. animate_statue's two makemon calls never ran it,
so a counted search beside a statue trap printed «You find a jabberwock
posing as a statue.  You stop searching.» in the wrong order (2
sessions). Diff: `await makemon_appear_msg(mon, mon.mx, mon.my, mmflags)`
after both calls, with the doppelganger one before `newcham`. Promise =
diff.

## Inventory

- `animate_statue` makemon arms — trap.js:383–405; C trap.c:770–788.
- Callee `makemon_appear_msg` — makemon.js:3898 (ASYNC; sym.mjs
  `makemon_appear_msg js/makemon.js:3898 ASYNC — await required`).

## C ↔ JS fidelity

```c
mmflags |= MM_NOCOUNTBIRTH | MM_ADJACENTOK;
mon = makemon(&mons[PM_DOPPELGANGER], x, y, mmflags);
if (mon && ismnum(mon->cham)) (void) newcham(mon, mptr, NO_NC_FLAGS);
} else { if (cause == ANIMATE_SPELL) mmflags |= MM_ADJACENTOK;
         mon = makemon(mptr, x, y, mmflags); }
```

C makemon.c:1472–1504 runs inside makemon, so before newcham:
`newsym`, then `!(mmflags & MM_NOMSG)` → appear Norep, then
`if (go.occupation) dochugw(mtmp, FALSE)`. animate_statue always sets
`MM_NOMSG` (trap.js:381, C :770), so only the occupation check fires.
That is what the session needs. JS `makemon_appear_msg` returns early
in_mklev. It skips the ASYNCGROUP block here, because MM_ASYNCGROUP is
not set. It drains only this primary's group queue (none), honours
MM_NOMSG, then `if (typeof game.occupation === 'function') await
dochugw(mtmp, false)` (makemon.js:3999–4001). Placing it before newcham
matches C. The `montraits` (statue-with-monster) path does not call
makemon in C either. No new RNG: dochugw's chug=FALSE path only runs the
threat check.

## Hallucinations / overclaim

None. The Named line says other modules' sync `makemon` callers were not
audited for a missing tail. That is the real residual family.

## Density

Two call sites in one C function, the whole makemon arm checked. One
Ledger bullet.

## Verification

```text
verify animate_statue: 2 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-worldtour-Valkyrie-50556507, scen-worldtour-Wizard-610120: PASS
```

This is an exact match with the D-log. No FORCE/DIAG/seed strings.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
