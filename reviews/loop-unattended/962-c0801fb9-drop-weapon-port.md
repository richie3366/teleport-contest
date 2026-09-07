# Review 962 — c0801fb9 — polyself.c drop_weapon full port (D-1992)

- SHA: `c0801fb9` — "polyself.c drop_weapon full port: live weapon_descr/is_sword names, gone-function drops, could_twoweap arm (D-1992)."
- D-id: D-1992. JS: `js/polyself.js`, `js/wield.js` (+133/−140 with scoreboard). C locus: `nethack-c/upstream/src/polyself.c` `drop_weapon` `:1304–1362` (fetched this review); `wield.c` `untwoweapon` `:905–914` (fetched).
- Verdict: **ACCEPT**

## Intent vs deliverable

Subject promises live names, gone-function drops, the
could_twoweap arm. Diff actually adds: clone deletion,
is_sword/weapon_descr/makeplural message, uswapwepgone/u wepgone
drops with updateinv, untwoweapon arm, wield.js
update_inventory fix. Promise matches deliverable.

## Inventory

- Deleted: local `poly_weapon_descr` clone (`sym.mjs`: NOT FOUND
  anywhere incl. generated — clean kill, do-not-reclone).
- Changed: `drop_weapon` body, `untwoweapon` tail, 3 import lines.
- Required `sym.mjs` output (re-pointed callees): `weapon_descr`
  invent.js:4376 sync, `is_sword` objects.js:154 sync,
  `uswapwepgone` wield.js:333 sync, `uwepgone` wield.js:312
  ASYNC (JS awaits it ✓). All `--can` ALREADY (existing edges).

## C ↔ JS fidelity

Walked `:1304–1362` line-by-line ✓: uwep outer guard,
`:1313` gate verbatim (superfluous-`!alone` comment kept),
canletgo pair verbatim, `:1320–1321` is_sword→sword else
weapon_descr, `:1325–1326` strcmp collapse, `:1328–1329`
quan/twoweap makeplural (replacing the naive `+'s'`),
`:1331` the_your corpse gate, `:1334–1349` swap-then-main
drops with in_use→updateinv=FALSE else dropx, `:1351–1353`
updateinv, `:1354–1356` untwoweapon arm. wield.js one-liner
matches C `:905–914` exactly ✓. Two null-guards beyond C
(canletgo(NULL)→FALSE, twoweap-without-swapwep skip) are
safe-side only (C would deref NULL; twoweap implies set) and
disclosed ✓. P_NONE/ammo arms stay named in invent.js with
the skill-path C-match stated ✓. No RNG.

Callee closure: every callee LIVE. No STUBs, no remaining
clones on this path.

## Hallucinations / overclaim

None. Residuals disclosed with byte-exact text
(Valkyrie-92195/Wizard-92076 `--More--` timing, cause pinned
to Next).

## Density

Net −7 JS lines replacing a clone with live calls across two
modules. Right-size per §2b.

## Verification

Baseline archaeology, stated plainly: `verify drop_weapon
--base c0801fb9~1` re-run this review → "0 PASS, 4 moved past
(2 still drop_weapon at a later step), 2 unchanged, 0 worse"
where the D-log said 7 moved past. Not a false claim: the
re-run resolves its base set from the scoreboard committed at
7ed1c205 (pre-D-1990/D-1991, 4–6 sessions), while the D-log
ran against the D-1992 working set that D-1991 had just moved
into drop_weapon. Direct check on current code: all three
delta sessions sit exactly where the D-log says (Caveman-92202
encumber_msg@98, Priest-92021 next_ident@157, Ranger-92217
polymon@127) — 0 worse, claim true. Green + strict + cohort
7/7. `--rulecheck` clean (re-run). Added-line grep: no banned
tokens.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
