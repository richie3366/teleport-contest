# Review 1235 — a7db375d — enlightenment Vision head + Sunsword chain

- SHA: `a7db375d` — "`insight.c:1564–1570` Vision-head arms + Sunsword `EBlnd_resist` conferral/`what_gives`/`from_what` chain (D-2269)"
- D-log: D-2269. Queue row: `insight.c` enlightenment (scen-wish-Rogue-92037).
- Corpus session: scen-wish-Rogue-92037 step 226 (quaffed enlightenment; menu
  `offx` shifted by a missing 66-char longest row). RNG 3788/3788 matched,
  draw-free display divergence.

## Intent vs deliverable

Subject promises: the two Vision-head arms in both `invent.js` builders plus
the three-link Sunsword chain (conferral, `what_gives`, `from_what`). Diff
actually adds: `BLND_RES`/`ART_SUNSWORD` on existing edges; the conferral arm
in `set_artifact_intrinsic`; the `what_gives` BLND_RES arm; the
`from_what(-BLINDED)` Eyes arm (`is_art` on the existing `attrib→artifact`
edge); both Vision arms in `enlightenment` and `doattributes`. Promise matches
diff; no unrelated edits.

## Inventory

- Changed JS: `set_artifact_intrinsic` + `what_gives` (`js/artifact.js`),
  `from_what` (`js/attrib.js`), two arms × two builders (`js/invent.js`).
- Callees: `set_spfx_extrinsic` (module-private JS helper, writes flat+slot,
  symmetric on/off — verified at `js/artifact.js:779-794`, not a C clone);
  `is_art` (`js/artifact.js:2029`, `sym.mjs` sync, LIVE); `bare_artifactname`,
  `what_gives` (LIVE); `you_are`/`enlght_line_txt` builder helpers (LIVE).
- Required `--can` output: `ALREADY: attrib.js already statically imports
  artifact.js. No new edge needed.` — pasted, confirmed. `BLND_RES` rides
  existing `const.js` edges in all three files.

## C ↔ JS fidelity

C loci (all via `csym.mjs` with printed ranges):

- Vision head (`insight.c`, `attributes_enlightenment` body `:1486-2005`;
  arms at the `/*** Vision and senses ***/` block): `(HBlinded || EBlinded) &&
  BBlinded` → `you_can("see", from_what(-BLINDED))`, then `Blnd_resist &&
  !Blind` → `you_are("not subject to light-induced blindness",
  from_what(BLND_RES))`, then `See_invisible`. Both JS builders add the two
  arms in exactly this order immediately before the See_invisible arm. ✓
- Macros (`youprop.h:103,161`): `Blind = ((HBlinded || EBlinded) && !BBlinded)`,
  `Blnd_resist = (HBlnd_resist || EBlnd_resist)`. JS inlines both macro-exact
  (flats OR slots under the mirror idiom); deliberately not calling
  `invent.js` `Blind()` because that adds a `uroleplay.blind` gate C's macro
  lacks — the D-log states this and I confirmed the macro has no such gate. ✓
- Tenses: `enlightenment` builder uses the `you_are` helper (`final?were:are`,
  `:5201`) and inline `final?'could ':'can '` for the `you_can` arm, matching
  C `enl_msg(You_, "can", "could", …)`; `doattributes` uses its builder's
  pre-existing fixed-tense idiom, consistent with every neighboring arm. ✓
- Conferral (`artifact.c:886-891`, tail of body `:715-893`): `if (wp_mask ==
  W_WEP && is_art(otmp, ART_SUNSWORD)) { on ? EBlnd_resist |= wp_mask :
  &= ~wp_mask }`. JS `:906-909` exact, including the `==` (not bit-test)
  distinction from the neighboring REFLECT arm. Symmetric unwield rides the
  pre-existing `on` plumbing. ✓
- `what_gives` (`artifact.c:2375-2424`; arm `:2411-2417`): inside the artifact
  branch after the spfx check, `obj == uwep && abil == &EBlnd_resist &&
  (*abil & W_WEP)` → return. JS arm sits inside `if (obj.oartifact)` after the
  spfx check before `continue`, with `propidx === BLND_RES` ⟺ `abil ==
  &EBlnd_resist` and `bits` = the extrinsic. The missing `is_art` gate is
  sound: only Sunsword ever sets `EBlnd_resist&W_WEP`, so bit-set ⟹ Sunsword
  wielded ⟹ `obj === uwep` is Sunsword — exactly C's invariant (C comments
  it `/* Sunsword */`). ✓
- `from_what` negative arm (`attrib.c:977-993`): `case BLINDED: if (BBlinded &&
  is_art(ublindf, ART_EYES_OF_THE_OVERWORLD)) Sprintf(buf, because_of /* "
  because of %s" */, bare_artifactname(ublindf))`. JS exact, including the
  leading-space suffix and the preserved `wizard` gate. Named deferrals
  (INVIS/CLAIRVOYANT blocking, birth blind/deaf, Blindfolded_only/cream,
  strangulation) correctly stay as-was. ✓
- No RNG in any arm; order + predicates are the whole surface, and both match.

No C-wrong.

## Hallucinations / overclaim

None. The "only-Sunsword-sets-it" justification for omitting the `is_art` gate
is a real C invariant, not an excuse — C's own arm has no artifact-identity
check either.

## Density

~60 insertions across 3 already-coupled files, one C family + its conferral
chain, one falsifier. Right-sized.

## Verification

- `imports.mjs --rulecheck` clean (re-run this review, review 1232).
- Re-measured: `node scripts/hidden-proxy.mjs verify enlightenment --base
  a7db375d~1` → "1 session(s) blocked on it (1 at baseline, 0 in the working
  scoreboard) … moved → drinkfountain at step 227 (was 226) … 0 PASS, 1 moved
  past, 0 unchanged, 0 worse → PROGRESS". Step-226 screen now passes; the
  step-227 `drinkfountain@fountain.c:292` residual is a strictly later step
  with its own Open row (D-2269 residual) — correctly not folded in. The
  scratch probe's byte-identical menu claim is consistent with the measured
  move-past. Matches the D-log.
- D-log cites green 2/2 + strict ×2 + cohort 7/7; full `sessions` skipped (only
  three non-shared files changed — though `artifact.js`/`attrib.js` are widely
  imported, the arms are additive lines on previously-unreached paths; the
  end-of-iteration cadence run re-covers the fortress).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
