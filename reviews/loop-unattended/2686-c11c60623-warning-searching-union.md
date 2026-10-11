# Review 2686 — c11c60623 — Warning/Searching uprops union (worn ring)

Metadata: SHA `c11c60623`, D-3822, cliffs row `objnam.c`
doname_base writer (owner untouched — topline-literal tie-break).
JS: `js/display.js` (mon_warning → `hero_Warning`), `js/attrib.js`
(Searching union), `js/invent.js` (export only). Test:
`scripts/warning-searching-uprops-union.test.mjs`.

## Intent vs deliverable

Promise: a worn ring's property lands only in
`uprops[p].extrinsic`, but mon_warning and Searching read only
flat mirrors — no warning digits, no ring autosearch/attributes
line; read the live slots. Claimed: 95210 → PASS. Diff actually
does: exactly that — one clone collapsed to the live export, one
union widened, zero caller changes. Match.

## Inventory

- `mon_warning` (js/display.js:1398) — changed: inline
  flats-only `Warning` → live `hero_Warning(u)` (newly exported
  from invent.js; display→invent edge pre-existing). C
  `display.h:64–66` `_mon_warning` (read): Warning &&
  !mpeaceful && mdistu<100 && m_lev/4 ≥ warnlevel — the rest of
  the JS body already matched; only the Warning reader changed.
- `Searching` (js/attrib.js) — changed: flats-only →
  flats+uprops union, same shape as `Fast()`. C `youprop.h:175–
  177` (read): `Searching ≡ HSearching || ESearching` over
  uprops; `Warning ≡` uprops `:163–165` (csym --macro).
- `hero_Warning` (js/invent.js:5777) — export keyword only.
- Callers (pre-existing, verified live by the probe): newsym/
  display_warning, `see_monsters` refresh, allmain.js:1322
  autosearch (C `allmain.c:342`, read), enlightenment copies.
- `sym.mjs` (required — local clone → import): `hero_Warning
  js/invent.js:5777 sync`; `mon_warning js/display.js:1398
  sync`. One clone fewer, no new edge.

## C ↔ JS fidelity

C has one store (uprops); JS has two mirrors with disjoint
writers, which is why the union — not slot-only — is the C-exact
read here. Verified writer-by-writer: `confer_oc_oprop`
(js/do_wear.js:410) sets/clears `uprops[p].extrinsic`
symmetrically and mirrors E-flats for only 5 props (WARNING/
SEARCHING not among them — the bug); `set_spfx_extrinsic`
co-writes slot+flat; `adjabil` (js/attrib.js:1096) writes the
H-flat only (Ranger-9 Searching lives there). No writer clears
one mirror while leaving the other set, so the union cannot read
stale-true. Behavioral delta is exactly the two measured cases:
uprops-only Warning (ring of warning digits at put-on) and
uprops-only Searching (ring autosearch + attributes line). The
`u.Warning` sticky arm in hero_Warning is pre-existing (was in
the old inline too) — no delta. No RNG in the predicates; the
newly-enabled autosearch draws are C's `dosearch0(1)` at the C
gate. Gap: none.

## Hallucinations / overclaim

None. The D-log is explicit that the ring-autosearch arm has no
new corpus witness (no hidden spot next to a ring-of-searching
wearer) — disclosed, not oversold — and the full-rescore
footnote (1082, 0 lost) plus my zero-regression re-measure bound
it. The stale-park retirement (Rogue-92037 PASS) is board-
checkable, not a code claim.

## Density

Cliff-phase: row writer correct (property reads, not a re-port
of the doname owner). Both readers now whole against their C
macros; remaining 294-clone drift explicitly not swept (right —
one cliff). Ledger: `mon_warning ported`. Verify bullet: 1 PASS
+ REACH-OK ×3 + green + strict + cohort + full 44 (`--full`) +
full-corpus rescore. Not unreached: probe PASSES.

## Verification

js-hunk grep: 0 hits. Rule #2 clean (iteration-wide run).
Re-measure (mine): `verify doname_base,Searching,mon_warning
--base c11c60623~1 --reach-all` → `verify doname_base: 1 PASS, 0
moved past, 0 unchanged, 0 worse → PROGRESS` (95210 PASS),
smoke 24/24 REACH-OK ×3; Searching/mon_warning vacuous at
baseline (as the D-log says). Exactly the D-log claim, zero
regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
