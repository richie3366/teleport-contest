# Review 984 — a1c71d43 — engrave() occupation full port (D-2014)

Metadata: SHA `a1c71d43`, D-2014, Open-row port (queue row
`engrave.c` engrave, 5 sessions). js/ touches 1 file
(`js/engrave.js`, +~190/−55: `engrave_occupation` →
`async engrave()` full body + six import names). No stamp owed.

## Intent vs deliverable

Subject promises: multi-action finish message plus full
wear/rate/room body in exact C order. Diff actually adds: the
whole `engrave.c:1267–1493` body (teleport stop with message,
invent-walk stylus, actionct, sanity impossibles, rate,
non-space scan, dull/split + marker ink, finishverb switch,
BUFSZ room, truncate print, make_engr_at + eread/erevealed,
continue-vs-finish). Promise == diff.

## Inventory

- Rewritten JS function: `engrave()` only (`js/engrave.js:984`,
  file-local — correct, C is `staticfn`; `sym.mjs`'s "LOCAL
  CLONE" label is placement-correct here, and the rename from
  `engrave_occupation` makes the C name findable).
- Deleted symbol `engrave_occupation`: `sym.mjs` NOT FOUND
  anywhere — no dangling refs; sole caller updated to
  `set_occupation(engrave, …)`.
- New imports all LIVE, awaited correctly: `impossible`
  (display, async ✓), `hold_another_object`/`prinv` (invent,
  async ✓), `update_inventory` (invent, sync),
  `splitobj`/`obj_extract_self` (mkobj, sync). `--can`:
  engrave→mkobj edge ALREADY static (name extension only);
  invent/mkobj hold no static back-edge to engrave. (The
  `prinv` clone in `do_wear.js:213` is pre-existing; this
  commit rightly imports the export.)
- Named omits kept: altar/jello/swallow/lava/pool floor gates,
  yn add-to, livelog (pre-existing map defers, untouched).

## C ↔ JS fidelity

Walked `engrave.c:1266–1493` against the new body
statement-by-statement — teleport message ✓, hands-vs-invent
stylus walk with same-message missing arm ✓, dulling/marker
predicates computed before `actionct++` (C order; `ATHAME`
via existing `objectNames.indexOf` idiom) ✓, sanity
impossibles verbatim ✓, rate-1 vs `min(rate, spe*2)` ✓,
non-space scan not consuming rate on spaces ✓, quan>1
split (`One of … gets dull.`, `owornmask=0`; null guard is
harmless) ✓, odd-actionct dull with `*endc||actionct==1`
→ `rest0||actionct===1` (post-increment `===1` is C's `==1`)
✓, `spe<=-3` truncate-before-deduct ✓, splitstack
`obj_extract_self` + `hold_another_object('You drop one
%s!')` ✓ (`nhUse` correctly omitted as no-op),
dulled&&known `prinv+update_inventory` ✓, marker
`max(rate/2,1)` via `Math.floor` ✓ with dry/dries-out arms
✓, six-arm finishverb switch verbatim ✓, `buf` from existing
engraving ✓, `space_left = BUFSZ-len-1` with room message +
clamp ✓, `*endc=0` modeled as `eng.text = consumed + chunk`
with the `only able to write` print ✓, `strncat` min ✓,
`moves-multi` ✓, eread/erevealed ✓, `*endc`-nonempty
continue with `newsym(pos)` ✓, finish (`cannot write any
more` vs `finish %s.` iff multi-action) clearing only
text/nextc/stylus as C does ✓. No RNG in this body on either
side. `game.occupation` awaited at `allmain.js:1174` ✓.

## Hallucinations / overclaim

None. "Exact C order" is earned — including the
compute-before-increment placement the old code got wrong.

## Density

~245 js/ lines for a 228-line C function. At parity, not
padded — the envelope is one C function.

## Verification

Re-measured myself: `hidden-proxy verify engrave --base
a1c71d43~1` → `2 PASS, 3 moved past, 0 unchanged, 0 worse →
PROGRESS` (Samurai-92043 / Priest-92085 PASS; Caveman-92006
→ x_monnam@80; Rogue-92209 → x_monnam@83; Barbarian-92152 →
peffect_acid@71) — identical to the D-log. Plus cited green
2/2 + strict ×2, cohort 7/7. js/ hunk grep: no
`FORCE`/`DIAG`/`getRngLog`/seed/coordinate/`fastforward`
(one hit is the message quoting Rule #2). Rule #2 clean.

## Actionable C-wrongs

None in this delta.

Verdict: **ACCEPT**
