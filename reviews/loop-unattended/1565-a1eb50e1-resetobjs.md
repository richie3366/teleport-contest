# Review 1565 — a1eb50e1 — bones.c resetobjs save-arm completion (D-2606)

**Metadata:** SHA `a1eb50e1`, `bones.c` `resetobjs` save arm, D-2606.
JS: `js/bones.js` only (+133/−~10). Restore arm untouched (already
exact). Map `turns.md` updated (omit retired).

## Intent vs deliverable

Subject promises: save-arm restart in C order (known/name strip,
SLIME_MOLD/SCR_MAIL/EGG/TIN/corpse/invocation arms), 6 C callers wired.
Diff actually adds all ten save-arm branches with `:line` cites.
Matches the promise.

## Inventory

- Save-arm known-strip `:103–112`, name-strip `:123–128`.
- Type arms: SLIME_MOLD `:131–132`, SCR_MAIL `:134–138`, EGG `:140–141`,
  TIN `:142–145`, CORPSE/STATUE `:147–165`, mines/soko prize `:166–169`,
  AMULET `:170–173`, CANDELABRUM `:174–183`, BELL `:184–186`,
  BOOK_OF_THE_DEAD `:187–189`.
- New imports: `mons/monsterNames/SPECIAL_PM` (monsters.js),
  `cant_revive` (zap.js); rest extend existing edges.

## C ↔ JS fidelity

C locus `bones.c:50–193` (144 L, via `csym.mjs`); full save arm read
here. Arm-by-arm confirm:

- Known-strip: `oc_uses_known` gate, `dknown=bknown=0`,
  `rknown/lknown/cknown/tknown=0`, `invlet/no_charge=0`,
  `how_lost=LOST_NONE`: live verbatim.
- Name-strip with the exact C keep-set (`oartifact`, STATUE, SPE_NOVEL,
  CORPSE with `corpsenm >= SPECIAL_PM`): live. C's TODO comment is C's
  own note — no JS needed.
- SLIME_MOLD `goodfruit(spe)`; SCR_MAIL `spe==0 → 1` (MAIL_STRUCTURES
  is `#define`d at `global.h:430` — verified, arm compiled in); EGG
  `spe=0`; TIN unique-meat → `NON_PM` via `ismnum +
  unique_corpstat`: live.
- CORPSE/STATUE: `cant_revive(&mnum, FALSE, NULL)` via inout
  `{ mtype }` box (null from_obj, false shopkeeper flag match C),
  `free_omonst`, doppelganger-corpse `set_corpsenm`: live, C order kept.
- Prize `nomerge=0`; AMULET→FAKE + curse; CANDELABRUM (`end_burn` if
  lamplit → WAX_CANDLE, age 50, `spe>0 → quan=spe`, `spe=0`,
  `owt=weight`, curse); BELL→BELL; BOOK→BLANK_PAPER + curse: live.
- No RNG in the arm (`rn2/rnd` absent both sides).

Async audit (required — `curse` is ASYNC per `sym.mjs`): read
`js/mkobj.js:583` — all state changes (`cursed=true`,
`blessed=false`, luck/figurine) precede the first await; only the
`maybe_adjust_light` display tail floats, and only when lamplit.
Bones callers pass unlit items (amulet/bell/book never lamplit;
candelabrum `end_burn`d first via sync `timeout.js:1645`). The bare
`curse(otmp)` claim in the D-log is verified true, not assumed.
`cant_revive` sync, `end_burn` sync, `weight`/`unique_corpstat` sync.

Caller closure (C `--callers`: recursion `:58`, save `:543/:556/:558`,
restore `:727/:729/:730`): 6 sites pre-wired in `js/bones.js`
(restore arm already exact); this commit touches only the save arm.
"6 wired" confirmed as pre-existing + untouched.
Callee closure: all LIVE; `imports.mjs --can` on both new-module edges
(monsters.js, zap.js) → ALREADY (same SCC, no new edge). No clone, no
stub, no new omit.

## Hallucinations / overclaim

None. "Named: none new" accurate. The `mnumBox` inout-box adaptation
(JS has no `&int` out-param) is faithful: carries `corpsenm` in,
remap out, read after the call exactly where C reads `mnum`.

## Density

One C function arm, one JS module, ~133 insertions. Right-sized.

## Verification

- `node scripts/imports.mjs --rulecheck` → Rule #2 clean.
- Diff grep: 0 FORCE/DIAG/getRngLog/fastforward hits.
- D-log Verify claims PASS + smoke REACH-OK. Re-measured:
  `hidden-proxy.mjs verify resetobjs --base a1eb50e1~1 --reach-all` →
  0 blocked at baseline and working tree (vacuous-note path, correctly
  framed) + `smoke 24/24 PASS, 0 regressed → REACH-OK`. Confirmed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
