# Review 1184 — 44843418 — shop-welcome remainder (D-2218)

Metadata: SHA `44843418`, `js/shk.js` + `js/shknam.js`,
D-2218. Queue row u_entered_shop family (0 blocked) —
three named-deferred arms in the welcome envelope
(deserted/angry/Invis/doorway shipped D-1080):
robbed-hearing Soundeffect, shkname Hallu arm,
`!inhishop` bill_p poison.

Intent vs deliverable: subject promises all three
arms. Diff delivers them plus doc updates retiring
the omits. Nothing else.

Inventory: `u_entered_shop` gains 2 statements
(poison, Soundeffect — both LIVE callees); `shkname`
gains the Hallu arm (main-stream `rn2`, already
imported); new leaf data import
`se_mutter_imprecations` extending the pre-existing
sndprocs edge (`shk.js:119`). No bodies deleted,
no clones added.

**C ↔ JS fidelity**: verified against pinned C.
(a) Mutter: C `shk.c:833–834`
`Soundeffect(se_mutter_imprecations, 50)` before the
mutter pline inside `!Deaf` — JS `:624` identical
position/guard/volume; the Deaf else arm («combing
through… inventory list», `:630`) pre-exists. No-op
≡ contest C macro, zero behavior change. (b)
shkname: C `shknam.c:873–890` — `Hallucination &&
!gameover` gate ✓; prob!=0 break-loop ≡ JS `while`
(both count 11: C's 12-entry table breaks at the
lighting prob-0 entry, JS's 12-entry table ends with
lighting prob:0 at `:249`) ✓; `rn2(num)` type pick
+ NULL-terminated count + `rn2(count)` ≡ JS
`rn2(num)` + `rn2(nlp.length)` (JS arrays drop the C
`0` terminator; spot-checked shkliquors 31 = 31,
commit measured all 11 lists incl. 31-entry
healthfoods and 40-entry shktools sans
platform-`#ifdef` extras) ✓; both draws main-stream
`rn2` exactly as in C (unlike halu_gname's display
stream) ✓; the strip-non-letter step (pre-existing
JS line) now correctly applies to hallu-picked names
too, matching C's post-pick `++shknm` ✓.
Impossible/panic arms stay named with the `''`
fallback. (c) Poison: C `:776` `(bill_x *)-1000` on
the `!inhishop` path before deserted_shop ✓ JS
`:557` same position; consumer contract confirmed
at C `:5001` (`== -1000 && inhishop` reset) ≡ JS
`after_shk_move :4111–4112`. Callee closure:
Soundeffect LIVE no-op, Hallucination/rn2 live, no
STUB in any touched arm. `sym.mjs`: shkname
`shknam.js:446` sync, u_entered_shop `shk.js:535`
async.

Hallucinations / overclaim: none. List-parity and
range claims check out statically (tables read on
both sides; direct node import of shknam.js is
impossible outside the harness — pre-existing init
order, not this diff).

Density: §2b right-size — one envelope, two modules
that already call each other.

Verification: D-log notes hidden vacuous (0 blocked,
NOT a corpus PASS). Confirmed: `verify
u_entered_shop` → 0 blocked + vacuous warning.
Honest; no `--base` owed. Green/strict/cohort
claimed; cadence re-run at end of iteration
re-confirms HEAD.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
