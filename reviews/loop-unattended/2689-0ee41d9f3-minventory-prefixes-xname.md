# Review 2689 — 0ee41d9f3 — minventory PICK_NONE prefixes + xname oc_name tail

Metadata: SHA `0ee41d9f3`, D-3826, cliffs head `invent.c`
display_minventory (two writers, one probe: analog geometry +
row-10 item name). JS: `js/invent.js` (analog), `js/objnam.js`
(tail). Test: `scripts/display-minventory-pick-none.test.mjs`.

## Intent vs deliverable

Promise: the PICK_NONE analog omitted tty "X - " prefixes and
the prompt blank (offx 38 vs C 37), and the xname tail used the
lossy macro name ("c ration"); bake C's prefixes/geometry and
read oc_name. Claimed: 95327 → PASS; 95234 stays xname_flags@624
(separate row, 0 worse). Diff actually does: exactly that. Match.

## Inventory

- `display_minventory` analog (js/invent.js:4509) — changed:
  entries `[hdr, "", ...]`, first-gold `$`, per-page menu
  letters baked into text; MINV_NOLET comment corrected. C
  `display_minventory :5340–5386` (csym): qflags are
  `INVORDER_SORT | INCLUDE_HERO?` — USE_INVLET absent, so
  selectors are `$`/0 and letters are menu-assigned (the old
  comment was false); `query_objlist :1105–1139` (read): `first`
  flag + `:1133–1135` selector rule; `tty_add_menu :2593–2623`
  (read): PREPENDS with `"%c - "` (`?` while unassigned);
  `tty_end_menu :2680–2762` (read): prompt → ["", prompt]
  prepended = `[prompt, "", ...items]`, letters `:2716–2726`,
  maxcol `:2728–2762`; offx `:1914–1915` (read):
  `max(10, cols-maxcol-1)`.
- `pretty_base` tail (js/objnam.js:1013) — changed:
  `PRETTY[n] || objectNameStrs[otyp] || lossy`. C FOOD `:792`
  Concat(actualn) / ROCK `:825` Strcpy(actualn) / TOOL known-arm
  Strcat(actualn) (read); `objectNameStrs` is indexed by otyp,
  auto-generated from upstream objects.h (verified: 481 entries,
  C-ration@295, K-ration@294).
- No new helpers, imports, or re-points — nothing for `sym.mjs`.

## C ↔ JS fidelity

Analog, arm-by-arm: `[hdr, ""]` ≡ C's prepend-pair order;
`first`-gold-`$` ≡ `:1133–1135` (flag cleared after the first
allowed item either side); the letter loop ≡ `:2716–2726` — n
over every slot, `n%lmax==0` reset, skips preset selectors
without consuming a letter, `'z'→'A'` wrap, unreachable past
'Z' (lmax ≤ 52) in both; baked `"X - "` text ≡ the `:2602`
prefix + `:2723` patch; morestr `'(end) '` ≡ `:2749`;
`select_menu_pick_none` paints texts verbatim (no double-prefix
on the multi-page path). End-to-end: maxcol 42 → offx 37 ≡ the
measured C `\x1b[38C`. Tail: enumerated every tail-reacher
(TOOL/FOOD/ROCK minus PRETTY/early arms) — exactly 5 names
change (C/K-ration, pick-axe, Candelabrum/Bell capitals), all
lossy→actualn, all C-exact; the probe measures two, the other
three ride the same cited arm (closing full rescore + 44/44
bound them). Tool dknown/dn selection stays where it was
(pre-existing shape, untouched dimension). No RNG; none added.
Gap: none.

## Hallucinations / overclaim

None. The 95234 xname_flags@624 non-move is disclosed in the
Verify bullet itself (separate region-owner row, 0 worse) — and
my re-measure reproduces it byte-for-byte. The "only two foods"
claim is the FOOD slice of my 5-name enumeration (the other
three are tools, same arm).

## Density

Cliff-phase: head correct, both value-writers shipped (geometry
+ name), each C-whole on its path; standing D-3401 omits
(INCLUDE_HERO fake rows, sortloot order, invdisp polish, next_
boulder) kept, none re-audited. Ledger: `display_minventory
ported; xname_flags split`. Verify bullet: 1 PASS + REACH-OK ×2
+ green + strict + cohort. Not unreached: probe PASSES.

## Verification

js-hunk grep: 0 hits. Rule #2 clean (iteration-wide run).
Re-measure (mine): `verify display_minventory,xname_flags --base
0ee41d9f3~1 --reach-all` → `verify display_minventory: 1 PASS, 0
moved past, 0 unchanged, 0 worse → PROGRESS` (95327 PASS),
smoke 24/24 REACH-OK ×2; `verify xname_flags: 0 PASS, 0 moved
past, 1 unchanged, 0 worse` (95234 still xname_flags@624 —
disclosed, not a regression). Exactly the D-log claim, zero
regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
