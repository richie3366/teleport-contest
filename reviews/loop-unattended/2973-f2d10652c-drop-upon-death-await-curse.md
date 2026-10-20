# Review 2973 — f2d10652c — drop_upon_death awaits curse

- SHA: `f2d10652c` (near-pass cliff; board owner glyphs.c parse_id, writer
  bones.c drop_upon_death)
- D-entry: D-4133; Ledger: drop_upon_death ported
- `js/` diff: `js/end.js` +3/−1

## Intent vs deliverable

Promise: bones.c drop_upon_death curses each dropped object with
`if (rn2(5)) curse(otmp);`, and mkobj.c curse calls book_cursed for a
spellbook. JS called the async `curse` without `await`, so «The spellbook
of knock slams shut!» ran detached and was lost when a hero who died while
studying saved bones. Diff: `if (rn2(5)) await curse(otmp);` plus a
comment. Promise = diff.

## Inventory

- `drop_upon_death` — end.js:1652; C bones.c:258–303 (curse :290–291).
- Callee `curse` — mkobj.js:636 (`sym.mjs`: `ASYNC — await required`);
  C mkobj.c:1782–1819, SPBOOK arm :1813–1814 → spell.c book_cursed
  :342–351.

## C ↔ JS fidelity

Walked drop_upon_death in C order: `u.twoweap = FALSE` (JS :1654),
obj_extract_self (JS shift + revoke_invoked_property for the freeinv
W_ART half), `!mtmp || is_undead` → obj_no_longer_held, the burning-light
smother before `owornmask = 0`, SLIME_MOLD goodfruit, then
`if (rn2(5)) curse(otmp)` before the mtmp / cont / `!rn2(8)`
give_to_nearby_mon / place_object chain. Every arm and both RNG calls
are in C order. The `await` only changes when book_cursed's pline lands.
It now prints before the next object is extracted, as C does.

```c
if (book->cursed && gm.multi >= 0
    && go.occupation == learn && svc.context.spbook.book == book) {
    pline("%s shut!", Tobjnam(book, "slam"));   /* spell.c:346 */
```

## Hallucinations / overclaim

None. The D-log names bones.c resetobjs (bones.js:312–329, four
un-awaited `curse` calls from a sync body). A repo grep finds other
un-awaited `curse(` sites (extralev.js ×6, makemon.js ×4, mkobj.js ×3,
do_wear.js:1390, fountain.js:891, invent.js:9903). The level-creation
sites cannot reach book_cursed, which needs `occupation == learn`. The
other three curse a helmet, a dipped object and a non-book. No session
reaches any of them with a book that is being studied.

## Density

A one-token fix in the writer. The board owner was a `cMsgOwners`
name match (parse_id), and the D-log says so.

## Verification

```text
verify parse_id (--base f2d10652c~1): 1 blocked
  scen-sweep-Archeologist-49956056: PASS → PROGRESS
verify drop_upon_death: 0 blocked (vacuous; owner was parse_id)
```

Exact match with the D-log (1076/1076).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
