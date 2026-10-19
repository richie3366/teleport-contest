# Review 2934 — 584fdf37d — hmon_hitmon venom/pie block takes do_hit's cxname snapshot

- SHA: `584fdf37d` (cliff, writer behind `doclassdisco`)
- D-entry: D-4093; Ledger: uhitm.c (`hmon_hitmon`, D-4093)
- `js/` diff: `js/uhitm.js` +4 (one call + comment)

## Intent vs deliverable

Promise: in C, `hmon_hitmon_do_hit` copies `saved_oname = cxname(obj)`
before it dispatches to `hmon_hitmon_misc_obj`. That cxname → xname →
`observe_object` adds a thrown splash of venom to disco[]. JS handles
CREAM_PIE/BLINDING_VENOM in an early block that returns before its
do_hit port, so `\` never listed «Venoms / splash of venom». Diff: the
early block calls `cxname(obj)` first. Promise = diff.

## Inventory

- `hmon_hitmon` early pie/venom block — uhitm.js:1924–1975; C uhitm.c
  `hmon_hitmon_do_hit` :1386–1433 (snapshot :1408–1411, misc_obj
  dispatch :1424–1430).
- Callee `cxname` — imported from objnam.js (uhitm.js:106; `sym.mjs`:
  objnam.js:1368, sync, one definition). LIVE.

## C ↔ JS fidelity

```c
if (!(artifact_light(obj) && obj->lamplit))
    Strcpy(hmd->saved_oname, cxname(obj));
else
    Strcpy(hmd->saved_oname, bare_artifactname(obj));
…
} else {
    if (hmd->mdat == &mons[PM_SHADE] && !shade_aware(obj)) hmd->dmg = 0;
    else hmon_hitmon_misc_obj(hmd, mon, obj);
```

C order is snapshot then misc_obj, and the stone-missile early return
(:1400–1407) cannot fire for a pie/venom (not `stone_missile`). A pie
or venom is never `artifact_light`, so the cxname arm is the one C
takes. JS now calls `cxname(obj)` at the top of the early block, before
the `msleeping` clear, `can_blnd`, and the message. That is the same
place in C's order. The return value is discarded, which is right
because the early block never reads `saved_oname`. xname has no RNG, so
the `rn1(25, 21)` blind draw stays where it was.

Out of scope, pre-existing: the early block has no PM_SHADE /
`shade_aware` gate (C :1426). JS's do_hit port has it at
uhitm.js:1895. A venom hitting a shade would print «Splash!» in JS,
where C prints nothing. No corpus session reaches this, so it is noted
here and not queued (§10.19).

## Hallucinations / overclaim

None. «Cream pies thrown or melee'd are now observed too, as in C» is
true: the call is not gated on otyp.

## Density

One C statement at its C position, inside a block that already stands
in for the misc_obj arm. One Ledger bullet. No clone added.

## Verification

```text
verify doclassdisco (--base 584fdf37d~1): 2 blocked
  scen-sweep-Caveman-50050055: PASS
  scen-town-Tourist-630002: still doclassdisco at step 228 (named)
verify doclassdisco: 1 PASS, 0 moved past, 1 unchanged, 0 worse → PROGRESS
verify hmon_hitmon: 0 blocked (vacuous; the D-log says so itself)
```

Exact match with the D-log (1 → FULL PASS, Tourist named). Full public
44/44 at HEAD `cfce30f52`. No FORCE/DIAG/seed/RNG-index strings in the
hunk.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
