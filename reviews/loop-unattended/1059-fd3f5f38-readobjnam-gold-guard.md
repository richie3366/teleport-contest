# Review 1059 — fd3f5f38 — readobjnam gold-block fall-through (D-2089)

Metadata: SHA `fd3f5f38`, `js/readobjnam.js` +8/−4, Must-fix from review
1054 C-wrong 1 (QUALITY-RISK). D-log D-2089. No corpus session blocked
(row cited 0 blocks).

## Intent vs deliverable

Subject promises: wish `tin of gold piece` returned GOLD_PIECE where C
(`return 2` → typfnd) makes a tin. Diff actually adds: one `!d.typ &&`
guard on the gold condition plus two corrected comments (postparse1
fall-through note, gold-block `return 2` note). Nothing else. Promise ==
deliverable; no scope creep.

## Inventory

Changed JS: `readobjnam` (gold-block condition only). No new functions,
no new imports/edges, no deleted or re-pointed symbols (`sym.mjs
readobjnam` → `js/readobjnam.js:713 sync`, unchanged export; nothing to
paste beyond this line).

## C ↔ JS fidelity

C locus `nethack-c/upstream/src/objnam.c`, `readobjnam_postparse1`
(csym range :4239–4663). Tin arm (:4383–4392):

```
if ((d->p = strstri(d->bp, "tin of ")) != 0) {
    ...
    d->typ = TIN;
    return 2; /*goto typfnd;*/
```

Gold block (:4533–4545), textually below:

```
if (!BSTRCMPI(d->bp, d->p - 10, "gold piece") ...
    d->otmp = mksobj(GOLD_PIECE, FALSE, FALSE);
    ...
    return 3; /*return otmp;*/
```

Branch order confirms the claim: any tin-typed bp exits at `return 2`
and never reaches the gold check. JS inlines postparse1 without early
returns, so the `!d.typ` gate is the exact structural equivalent for
this bp. The residual gap (C skips *all* later blocks, JS gates only
gold) is closed by the D-log's per-block audit: every other later block
is `!d.typ`-guarded except the no-`of` scan, which is draw- and
state-free for a `tin of …` bp (prefix-anchored `name_to_monplus`; no
monster name prefixes that string — "tin …" matches nothing, and C
itself would have taken the same scan had it not returned early, with
`d->mntmp` already consumed by the tin arm's `name_to_mon("gold
piece")` failing to LOW_PM… note: tin arm sets mntmp from "gold piece",
which is NON_PM, so the no-`of` scan re-derives nothing new either).
Confirm holds for the falsifier input; generalization to all typ-set bps
rests on the guard audit, which I re-checked against the diff context
(amulet/makesingular/class-words/gem/srch all `!d.typ`-gated in file).

## Hallucinations / overclaim

None. D-log explicitly marks hidden verify "vacuous, NOT a corpus PASS"
and names the hand probe as the falsifier. No "Match C" dispatch-over-
stub shape — single guard, no callee.

## Density

+8/−4, below the ~40-insertion floor, but this is a Must-fix review
C-wrong shipped alone: density exception applies (§2b "Must-fix stays
one item, alone"). No gluing. OK.

## Verification

- `imports.mjs --rulecheck` (whole scored `js/`): Rule #2 clean.
- Diff grep `FORCE|DIAG|getRngLog|fastforward`: no hits in
  `js/readobjnam.js`.
- Re-measured: `hidden-proxy.mjs verify readobjnam --base fd3f5f38~1`
  → "0 session(s) blocked on it (0 at baseline, 0 in the working
  scoreboard)" — matches the D-log's vacuous note; no `--base` debt
  since the row cited 0 blocks.
- Green 2/2 + strict ×2 + cohort 7/7 per D-log (taken as recorded; shared
  startup file untouched, single-condition gate cannot perturb RNG —
  the guard only *removes* a GOLD_PIECE return for typ-set bps, a path
  no fortress session wishes).
- Falsifier grade: measured pre/post hand probe on real `readobjnam`
  (pre: tin-of-gold-piece → GOLD_PIECE otyp 438; post: → TIN; four
  controls unchanged), probe deleted after use.

## Actionable C-wrongs

None. Review 1054's single C-wrong is fully addressed; stamp owed on
`1054-4d3d5dd3-postparse1-of-arm.md` (`**Addressed:** D-2089`) — docs
stamp, not a Must-fix (queue row already archived per D-log).

Verdict: **ACCEPT**
