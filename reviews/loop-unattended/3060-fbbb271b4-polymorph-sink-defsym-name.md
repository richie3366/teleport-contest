# Review 3060 — fbbb271b4 — polymorph_sink names the result through defsyms

- SHA: `fbbb271b4` (cliffs head at the parent: `do.c` polymorph_sink,
  scen-symset-Wizard-53050007 step 325, @41014a186)
- D-entry: D-4220; Ledger: polymorph_sink ported
- `js/` diff: fountain.js +14 −11

## Intent vs deliverable

Promise: do.c polymorph_sink keeps a `uchar sym` per outcome and prints
`an(defsyms[sym].explanation)` (`:449–450`). For S_throne that
explanation is the PCHAR2 desc «opulent throne». JS hard-coded
«throne», so C's «The sink transforms into an opulent throne!» came out
as «…into a throne!».

Diff:

- `let sym = S_sink` at entry.
- Each arm sets `sym = S_fountain / S_throne / S_altar / S_room` (and
  `S_grave` when make_grave succeeded) instead of a literal.
- The message calls `an(defsym_explanation(sym))`, the uhitm.js
  `defsyms[].explanation` table.
- New imports: the six S_* constants from const.js and
  `defsym_explanation` from uhitm.js.

The promise matches the diff.

## Inventory

- polymorph_sink — js/fountain.js:1029–1071; C do.c `:402–455`.
- Callees: rn2, dipsink_set_levltyp (fountain.js, the set_levltyp port),
  SET_FOUNTAIN_LOOTED, Inhell, Align2amask, make_grave, an, pline,
  newsym. All unchanged LIVE imports. defsym_explanation is newly
  imported (LIVE, uhitm.js:4544).
- Callers: `csym --callers polymorph_sink` → do.c:583 (dosinkring
  RIN_POLYMORPH) and fountain.c:744 (dipsink POT_POLYMORPH), which map
  to do.js dosinkring and fountain.js dipsink. Both unchanged.
- Deleted / re-pointed symbols: none (the local `expl` string is gone).

```text
$ node scripts/sym.mjs defsym_explanation
defsym_explanation js/uhitm.js:4544   sync
$ node scripts/sym.mjs polymorph_sink
polymorph_sink   js/fountain.js:1029   ASYNC — await required
$ node scripts/imports.mjs --can js/fountain.js js/uhitm.js defsym_explanation
ALREADY: fountain.js already statically imports uhitm.js. No new edge needed.
```

## C ↔ JS fidelity

Branch walk against C `:406–454`:

- `:406` `sym = S_sink`. JS `let sym = S_sink`. C can never print it,
  because the `default:` label sits on case 0.
- `:410` early return unless SINK. JS has the same, plus `!loc`.
- `:413–415` `sinklooted = looted != 0; flags = 0`. JS also writes
  `loc.looted = 0`. rm.h `:218` `#define looted flags`, so in C that is
  the same store. JS keeps two properties, and the extra store makes
  them agree. Net-identical.
- `rn2(4)`. This is the only draw before the arms, and it is unchanged.
- case 0/default: S_fountain, set FOUNTAIN, `blessedftn = 0`, and
  SET_FOUNTAIN_LOOTED when looted. Matches.
- case 1: S_throne, set THRONE, `looted = T_LOOTED` when looted. Matches.
- case 2: S_altar, set ALTAR, `algn = rn2(3) - 1`, then
  `(Inhell && rn2(3)) ? AM_NONE : Align2amask(algn)`. The RNG order
  (rn2(3), then Inhell-gated rn2(3)) is unchanged and matches.
- case 3: S_room, set ROOM, make_grave, and `S_grave` iff typ is now
  GRAVE. Matches.
- `:449–452`: `typ != ROOM` → pline_The «sink transforms into %s!»,
  else «sink vanishes.». The JS literal «The sink …» is what pline_The
  produces for a lowercase head. Then newsym. Matches.

Table values: in C, drawing.c builds defsyms with PCHAR_DRAWING
`{ ch, desc, clr }`, and PCHAR2 falls back to `PCHAR(idx, ch, sym,
desc, clr)` (defsym.h `:69–70`, `:85–87`). So `explanation` is the
second string. I ran the JS table on the six constants:

```text
S_room 19 "floor of a room"   defsym.h:112 PCHAR
S_altar 33 "altar"            :129 PCHAR
S_grave 34 "grave"            :131 PCHAR
S_throne 35 "opulent throne"  :132 PCHAR2(…, "throne", "opulent throne")
S_sink 36 "sink"              :133
S_fountain 37 "fountain"      :134
```

All six match C. Only S_throne changes output; the other arms printed
the same words before. The S_room case never reaches the «transforms»
message (`typ == ROOM` → «vanishes»), so «floor of a room» stays
unreachable, as in C.

No RNG change.

## Hallucinations / overclaim

None. The commit also corrects the old doc comment («PCHAR strings
(not PCHAR2 extra)»), which was the source of the error. Named
omissions: none, and none are needed. The body is whole against C.

## Density

A one-message cliff, fixed by porting C's `sym` mechanism rather than
swapping the literal «throne» for «opulent throne». That is the right
shape, and it is right-sized.

## Verification

```text
$ node scripts/hidden-proxy.mjs verify polymorph_sink --base fbbb271b4~1 --no-reach
verify polymorph_sink: baseline fbbb271b4~1 (scoreboard at 41014a186) — 1 session(s) blocked on it
  scen-symset-Wizard-53050007: PASS
verify polymorph_sink: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
$ node scripts/imports.mjs --rulecheck
Rule #2 clean: no bare/node specifiers or fs calls in js/.
```

D-log: frozen runner PASS (RNG 8466/8466, Screen 506/506), reach 1/1,
green 2/2, strict ×2, cohort 7/7, full 44/44, sweep 713 baseline-PASS
0 regressed. The end-of-audit rescore re-checks the window.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
