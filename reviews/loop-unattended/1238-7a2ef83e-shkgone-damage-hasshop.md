# Review 1238 — 7a2ef83e — shkgone damage + has_shop arms

- SHA: `7a2ef83e` — "`shk.c` `shkgone` damage + `has_shop` arms (D-2272)"
- D-log: D-2272. Queue row: `shk.c` shkgone damage + has_shop (mondead-tail
  D-2231 named omit). No corpus session reaches a shopkeeper death with damage.
- Character: omission fix + clone canonicalization, no corpus divergence.

## Intent vs deliverable

Subject promises: `discard_damage_owned_by` + the `has_shop` clear in
`shkgone`, canonicalizing `search_special` on the `sounds.js` export. Diff
actually adds: the new `shk.js` export, three lines in `shkgone`, the
`function`→`export function` flip in `sounds.js`, three names on existing
edges, and comment updates. Promise matches diff exactly.

## Inventory

- New JS: `discard_damage_owned_by` (`js/shk.js:1091-1108`); changed:
  `shkgone` (`js/mhitm.js:2999-3005`); re-pointed: `search_special`
  local → exported canonical (`js/sounds.js:147`).
- Required `sym.mjs` output: `search_special  js/sounds.js:145  sync` + 1
  remaining clone (`js/teleport.js:885`) — matching the file the D-log names
  as drifted and deliberately untouched. No symbol deleted.
- Required `--can` output: `ALREADY: mhitm.js already statically imports
  sounds.js. No new edge needed.` — pasted, confirmed. (The D-log's "new
  edge / CHECK/lazy-safe" phrasing is overcautious in the safe direction;
  there is no new module edge at all — same for `discard_damage_owned_by` on
  the existing `mhitm→shk` edge and `ANY_SHOP` on `const.js`.) Call-time use
  only; both targets are hoisted function declarations, so no TDZ read even
  in principle.

## C ↔ JS fidelity

C loci (via `csym.mjs`): `shkgone` `shk.c:234-269`; `discard_damage_owned_by`
`:4529-4552`; `search_special` `mkroom.c:764-780`.

- Order in `shkgone`: C `discard_damage_owned_by` → `resident = 0` →
  `!search_special(ANY_SHOP) → has_shop = 0` → floor-stock → bill. JS inserts
  the three lines in exactly that order inside the pre-existing `on_level`
  gate, ahead of the pre-existing floor-stock/bill code. ✓
- `discard_damage_owned_by`: prevdam walk, unlink-owned (prev-link + head),
  drop-without-memset (GC), prevdam frozen on removal, `dam = dam2` in both
  branches. JS traces C line-for-line. Ownership via the pre-existing
  `shop_owns_cell` (`shk.js:1029-1032`), which is the exact
  `strchr(in_rooms(x,y,SHOPBASE), shoproom)` test. ✓ (C `staticfn` → JS export
  is the required cross-module idiom, as with `discard_damage_struct`.)
- `search_special`: triple condition (`ANY_TYPE && != OROOM`, `ANY_SHOP && >=
  SHOPBASE`, `== type`), rooms-then-subrooms, `hx < 0` sentinel. JS
  arm-for-arm. (C keeps scanning past a mid-array negative `hx`; JS breaks —
  equivalent on the contiguous C array; pre-existing, not this commit's.) The
  `teleport.js:885` twin lacking the `ANY_TYPE` arm is named in the comment
  and in data.md, correctly left for its own row. ✓
- `has_shop = 0` verbatim like C (`:247`); every JS reader is falsy-gated
  (`sounds.js:532` jingle gate, `shk.js:767` early-out), and the setter
  (`shk.js:4160` `= 1`) is consistent. The D-log's downstream-effect claim
  (successor billing via `fix_shop_damage`, jingle gating) follows from these
  live readers. ✓ No RNG in any arm.

No C-wrong. Remaining data.md:373 rows (minimal_monnam, mongone FALSE,
vamprises, xkilled readers, kill_genocided nuance) correctly stay separate.

## Hallucinations / overclaim

None. The "18/18 probe" claim is consistent with the arms I verified; no
corpus PASS claimed.

## Density

~45 insertions for a 60-line C family + canonicalization, one falsifier,
modules already coupled. Right-sized.

## Verification

- Re-measured: `node scripts/hidden-proxy.mjs verify shkgone` → "0 session(s)
  blocked on it (0 at baseline, 0 in the working scoreboard)". Matches the
  D-log's vacuous note; row cited 0 blocks so no `--base` owed.
- `imports.mjs --rulecheck` clean (re-run this review, review 1232). D-log
  cites green 2/2 + strict ×2 + cohort 7/7 plus a hand-run full 44/44 for the
  (believed-new) edge; the end-of-iteration cadence run re-covers the fortress.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
