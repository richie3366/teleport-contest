# Review 1983 — 73b53df4b — monmulti whole + canonical matching_launcher (D-3023)

Metadata: SHA `73b53df4b` (D-3023). Coverage head (`mthrowu.c`
monmulti PARTIAL, C 33 code L / JS 21). Scored diff:
`js/weapon.js` (restart) + `js/wield.js` (+canonical macro pair).
Subject promises monmulti whole (guard/mplayer/racial arms) +
canonical `matching_launcher`.

## Intent vs deliverable

Promise: restart `monmulti` whole in C order, add canonical
`matching_launcher`, re-express `ammo_and_launcher`, new
`scripts/monmulti.test.mjs`. Diff actually adds exactly that.
Promise kept.

## Inventory

- `monmulti` (js/weapon.js:1685, sync): restarted whole.
- `matching_launcher` (js/wield.js:137, sync): new canonical
  export from the `obj.h:242–243` macro.
- `ammo_and_launcher` (js/wield.js:145, sync): re-pointed to
  `is_ammo && matching_launcher` (was an inline triple-guard).

## C ↔ JS fidelity

### monmulti — verdict: exact-C, ACCEPT

C (`mthrowu.c:199–258`, csym range) walked arm-for-arm against
JS: `quan > 1` guard with the
is_ammo?matching_launcher:WEAPON_CLASS ternary + `!mconf` →
prince +2 / lord +1 / mplayer +1 else-chain (the missing
`:227–229` arm now present) → ELVEN_ARROW !cursed →
ELVEN_BOW + ammo_and_launcher + !cursed → `spe > 1` +=
rounddiv(spe,3) → single `rnd(multishot)` (`:245`, the only RNG
call, call-for-call) → class bonus `monsndx(mtmp->data)`
(`:248`, fixes the `mtmp.mnum` misread) → racial elf/orc/gnome
block `:251–257` in C order with C's own `mwep &&` guards →
quan/min-1 clamps. Numeric `otyp(...)` compares over the same
`objectNames.indexOf` table. Confirm.

### matching_launcher — verdict: exact-C (safer on null), ACCEPT

C (`obj.h:242–244`):

```c
#define matching_launcher(a, l) \
    ((l) && objects[(a)->otyp].oc_skill == -objects[(l)->otyp].oc_skill)
#define ammo_and_launcher(a, l) (is_ammo(a) && matching_launcher(a, l))
```

JS null-guards both sides, then `ask === -lsk` with the same
`?? 0` defaults. Strictly safer than C (false where C would
deref null — unreachable in practice); all reachable inputs
identical. The re-expressed `ammo_and_launcher` is
provably identical to the old body: `is_ammo` null-guards
(verified `js/wield.js` body, `if (!obj) return false`), so
false-on-null is preserved on every path and non-null
compares are byte-identical.

### Callee closure — verdict: ACCEPT

Required `sym.mjs` outputs:

```text
matching_launcher js/wield.js:137   sync
ammo_and_launcher js/wield.js:145   sync
rounddiv         NOT EXPORTED — 3 LOCAL CLONES (eat/polyself/weapon)
```

All six consuming files of `ammo_and_launcher` (dothrow ×12,
mthrowu, uhitm, invent, iactions, weapon) see identical
behavior — verified by reading the old vs new bodies, not by
trust. `rounddiv` stays the pre-existing file-local clone
(`js/weapon.js:185`); drift predates this commit, disclosed in
the D-log, not introduced here. New imports
(`is_mplayer/is_elf/is_orc/is_gnome`, `monsndx`) join existing
edges — no new module edges. Sole C caller of monmulti
(mthrowu.c:268 monshoot) stays wired (`js/mthrowu.js:1464`,
pre-existing).

## Hallucinations / overclaim

None. D-log calls the hidden check a note (0 blocked) and pins
evidence on the 27-session reach + 12/12 unit test; the
stash-check caveat is stated honestly.

## Density

One partial function restarted whole + one macro canonicalized
with all call sites verified. Right-sized.

## Verification

Re-measured (`hidden-proxy.mjs verify monmulti
--base 73b53df4b~1 --reach-all`):

```text
verify monmulti: 0 session(s) blocked (vacuous, honest)
reach monmulti: 27 baseline-PASS session(s) reach it (27 run): 27 PASS, 0 regressed → REACH-OK
```

Zero REGRESSED. Matches D-log (27/27, 49.8s on re-run).

## Actionable C-wrongs

None.

Ledger: `monmulti` ported, REACH-OK via 27-session reach.
Verify lines: hidden vacuous (honest) + reach + green/cohort
per D-log, re-run confirms.

Verdict: **ACCEPT**
