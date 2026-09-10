# Review 1224 — a74f318a — trapeffect_magic_trap steedintrap (D-2258)

Metadata: SHA `a74f318a` (D-2258). Queue row `trap.c`
trapeffect_magic_trap, 2 sessions in traces (not as owner).
js/trap.js +137/−40.

## Intent vs deliverable

Subject promises C envelope (explosion returns, else `domagictrap`
then `steedintrap`), full `steedintrap` switch replacing the PIT-only
clone, fate 13 `body_part(SPINE)`, fate 15 qstart prodigal /
`at_dgn_entrance`, fate 20 `seffects(SPE_REMOVE_CURSE)` with
`HConfusion` saved. Diff is that. Promise kept.

## Inventory

New: `steedintrap(trap, otmp)`. Deleted: `steedintrap_pit`. Changed:
`trapeffect_magic_trap` tail, `domagictrap` 13/15/20, pit caller.
`sym.mjs`:

```text
steedintrap      NOT EXPORTED — 1 LOCAL js/trap.js:1789
steedintrap_pit  NOT FOUND
seffects         js/read.js:1915   ASYNC
resist           js/zap.js:1737   ASYNC
newcham          js/makemon.js:1869   sync
thitm            NOT EXPORTED — 1 LOCAL js/trap.js:1196
sleep_monst      NOT EXPORTED — 1 LOCAL js/trap.js:3869
dismount_steed   js/steed.js:776   ASYNC
body_part        js/polyself.js:525   sync
on_level         js/dungeon.js:1185   sync
at_dgn_entrance  js/dungeon.js:937   sync
helpless         6 LOCAL (trap.js:3859 — you.h `msleeping||!mcanmove`)
```

`--can trap.js zap.js resist` and `trap.js read.js seffects` ALREADY.

Callee closure — `trapeffect_magic_trap` (`trap.c:2292–2320`):
`seetrap`/`deltrap`/`losehp`/`domagictrap` LIVE; `steedintrap` LIVE
(same-file); monster `rn2(21)`→`trapeffect_fire_trap` LIVE.

`steedintrap` (`:3101–3168`): ARROW/DART `thitm` LIVE; SLP_GAS
`resists_sleep`/`breathless`/`helpless`/`sleep_monst(rnd(25),-1)`
CLONE (how<0 skips resist, matches this call); LANDMINE/PIT `thitm`
LIVE; POLY `resists_magm` LIVE, `resist` LIVE, `newcham` LIVE;
death `dismount_steed(DISMOUNT_POLY)` LIVE; default no-op. MAGIC_TRAP
is that default (mx/my only).

`domagictrap` 13/15/20: `body_part` LIVE; `on_level`/`In_quest`/
`at_dgn_entrance`/`is_neuter`/`Upolyd` LIVE; `seffects` →
`seffect_remove_curse` LIVE (not a stub). Named: dart/arrow
`!rn2(2)` sites, slp-gas hero, landmine, poly trapeffect still do
not call the helper.

## C ↔ JS fidelity

- Envelope vs `:2298–2313`: `!rn2(30)` explosion returns (no steed);
  else `domagictrap` then `steedintrap(trap, null)`. `uen =
  (uenmax += 2)` + peak. C.
- `steedintrap` switch vs `:3115–3161`: `!otmp` impossible on
  arrow/dart; SLP_GAS always `steedhit`; POLY `!resists_magm &&
  !resist(WAND_CLASS, NOTELL)` then `newcham(NULL, NC_SHOW_MSG)`;
  PIT `mhp<1 || thitm rnd(6|10)`. C. RNG: `rnd` on those arms
  only; MAGIC_TRAP default draws none.
- Fate 13 vs `:4385–4387`: `body_part(SPINE)`. C.
- Fate 15 vs `:4392–4405`: `on_level(uz, qstart_level)` prodigal
  with `female || (Upolyd && is_neuter)` `"oddly "`; else yearn
  Hallu Cleveland / `In_quest || at_dgn_entrance("The Quest")`. C.
- Fate 20 vs `:4433–4444`: save `HConfusion`, set 0, pseudo
  `{otyp: SPE_REMOVE_CURSE, oclass: SPBOOK_CLASS}` (C `zeroobj`
  uncursed ≡ missing cursed), `seffects`, restore. C. Confused
  blessorcurse is suppressed the same way.
- Pit hero path now calls the shared helper
  (`trap.c:1921`). C.

## Hallucinations / overclaim

None. Hidden is labeled not a corpus PASS. Fate 20 is not
“dispatch ported, callee stubbed”: `seffect_remove_curse` is the
C `read.c` arm. Named call-site omits are other trapeffects, not
a stub inside this switch.

## Density

+137 for the 68-line helper + three fate arms + one envelope
line. One magic-trap cluster. In-band.

## Verification

Audit re-ran the corpus claim itself:

```text
verify trapeffect_magic_trap: baseline a74f318a~1 — 0 session(s)
blocked on it (0 at baseline, 0 in the working scoreboard)
```

Vacuous-0-confirmed as owner (row was trace reach). Green 2/2 +
strict ×2 + cohort 7/7; skip full (trap.js not auto-full); hand
44/44 pasted (seed0012 fate 13, seed0030 `rn2(30)`, seed4500
knight `rn2(21)`, seed0103/0104 ride). Diff grep: `FORCEBUNGLE`
is a C trap flag, not DIAG/FORCE. No seed/coordinates/fs.
Rule #2 clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
