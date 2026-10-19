# Review 2965 — b37c5a9d5 — revive: enexto before the twitch arm, live useup, default panic

- SHA: `b37c5a9d5` (Must-fix from Review 2956; reach-only, no blocked row)
- D-entry: D-4125; Ledger: revive ported; destroy_items ported
- `js/` diff: `js/zap.js` +14/−31

## Intent vs deliverable

Review 2956 asked for three things: (a) `MON_AT → enexto` ahead of the
norevive / S_EEL twitch arm, (b) the `useup_invent` clone replaced by the
live invent.js `useup` at both C sites, and (c) C's `panic("revive default
case %d")`. The diff does all three and deletes the clone. It also fixes a
fourth thing the review missed: `christen_monst`'s return value is now
assigned (`mtmp = christen_monst(...)`, C :1096). Promise = diff.

## Inventory

- `revive` — zap.js:3297–3555; C zap.c:883–1140 (enexto :961–964, twitch
  :966–972, christen :1095–1096, disposal :1105–1137).
- `maybe_destroy_item` / destroy_items loop — zap.js:1730; C :5929–5933.
- Deleted `useup_invent` — `grep -n useup_invent js/zap.js` → none. The
  D-log names the lock.js:1818 copy, which belongs to lock.c.
- `useup` (invent.js:5173) is already imported at zap.js:239. `panic`
  (end.js) is newly imported.

## C ↔ JS fidelity

```c
mptr = &mons[montype];
if (MON_AT(x, y)) { if (enexto(&xy, x, y, mptr)) x = xy.x, y = xy.y; }  /* :961 */
if (corpse->norevive || (mons[montype].mlet == S_EEL && !IS_POOL(...))) /* :966 */
```

JS now runs `m_at && enexto` on `mptr` right after `mptr = mons(montype)`,
then tests norevive / IS_POOL / cansee at the moved square, as in C. The
enexto `rn2` therefore happens on the norevive path too. Disposal:
OBJ_INVENT → `useup` (useupall → setnotworn, freeinv, obfree, as C :1108).
OBJ_BURIED non-zombie falls through to `default`, which panics
(OBJ_FREE/MIGRATING/ONBILL/LUAFREE), as C :1129–1137. JS `panic` throws
synchronously (end.js:1065). In destroy_items, C's u_carry block does the
owornmask Ring_gone/setnotworn and the current_wand clear **before** the
`useup` loop, and JS keeps that order (zap.js:1719–1734). So useupall's
own setnotworn finds nothing left to clear, as in C.

## Hallucinations / overclaim

None. The D-log names its retained deviations: the inline zombie speed,
which Review 2956 verified as a clone, the `!ismnum` guard and the
invent-membership `where` fallback. None of them draws RNG.

## Density

The Must-fix, whole, plus one adjacent C-order bug (the christen return).

## Verification

```text
verify revive,destroy_items (--base b37c5a9d5~1): 0 blocked each (reach-only)
```

The D-log's `sweep revive,destroy_items` (656 re-run, 0 regressed) and
this audit's full rescore are the regression check.

## Actionable C-wrongs

None. Review 2956's Must-fix is closed.

Verdict: **ACCEPT**
