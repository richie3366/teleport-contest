# Review 2948 — f4dcc77fb — hitmsg « again» compares the same mattk[] array

- SHA: `f4dcc77fb` (cliff, board owner `passivemm`, 2 sweep rows)
- D-entry: D-4108; Ledger: hitmsg ported; getmattk ported
  js=mhitm.js:get_mattk
- `js/` diff: `js/mhitm.js` +3/−1, `js/mhitu.js` +3

## Intent vs deliverable

Promise: C's « again» test is the pointer compare `mattk ==
gh.hitmsg_prev + 1`. JS compared only slot indices. When a vampshifter
rose as a vampire in the middle of mattacku (vamprises → newcham), its
next bite therefore matched the previous form's slot and printed «It
bites again!». Diff: `get_mattk` also records `_slots` (the
`magr.data.mattk` array the slot belongs to), and hitmsg requires
`mattk._slots === prev._slots`. Promise = diff.

## Inventory

- `hitmsg` « again» expression — mhitu.js:464–475; C mhitu.c :73–76, :80.
- `get_mattk` record — mhitm.js:476–491; C mhitu.c getmattk :309–444.
- Consumers unchanged: hitmsg_prev reset at mattacku start (C :88).

## C ↔ JS fidelity

```c
again = (gh.hitmsg_prev != NULL
         && mattk == gh.hitmsg_prev + 1
         && mattk->aatyp == gh.hitmsg_prev->aatyp) ? " again" : "";
gh.hitmsg_prev = mattk;                         /* mhitu.c :73–80 */
```

`mattk == prev + 1` holds only when both pointers are into the same
`permonst.mattk[]` array and the index rises by one. JS now models both
halves: `_slots` identity is the array, and `_indx + 1` is the
increment. After newcham, `magr.data` is a different permonst, so the
arrays differ and C's compare fails. The JS compare now fails the same
way.

The substitution case also matches. When getmattk substitutes (SEDUCE=0,
DISE/PEST/FAMN → STUN, DREN, lich cold→PHYS…), C returns
`&alt_attk_buf`, the caller's local. That pointer is never `prev + 1` of
a mattk[] entry, and a `prev` that pointed at alt_attk has no
`mattk[i+1]` that equals `&alt_attk + 1`. JS `subst()` nulls `_slot`,
and the `_slot && prev._slot` guard yields '' in both directions. No RNG
is involved.

## Hallucinations / overclaim

None. The D-log says hitmsg's own baseline block (Monk-587105 s501) is
a different arm (AD_DRST «golden haze» vs «eyes sting») and has its own
queue row. My re-measure shows that row unchanged.

## Density

Two-line fix of a pointer-identity model. Small, and it moved its two
probe sessions.

## Verification

```text
verify passivemm (--base f4dcc77fb~1): 2 blocked
  scen-sweep-Barbarian-50556043: PASS
  scen-sweep-Samurai-50055076: PASS
verify passivemm: 2 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
verify hitmsg: 1 blocked
  scen-sweep-Monk-587105: still hitmsg at step 501 (golden haze arm)
  → NO MOVEMENT (named, own row)
verify getmattk: 0 blocked
```

Exact match with the D-log. Full public 44/44 on HEAD.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
