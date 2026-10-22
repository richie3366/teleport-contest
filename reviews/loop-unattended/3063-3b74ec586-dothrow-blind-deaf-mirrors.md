# Review 3063 — 3b74ec586 — dothrow.js drops the phantom Blind clone and mirror reads

- SHA: `3b74ec586` (cliffs head at the parent: `mkobj.c` hornoplenty,
  scen-sweep-Rogue-53250089 step 900, @19281aa6e)
- D-entry: D-4223; Ledger: hero_breaks ported; throw_obj ported
- `js/` diff: dothrow.js +11 −28

## Intent vs deliverable

Promise: hero_breaks decides `in_view` from youprop.h Blind ≡
`(HBlinded || EBlinded) && !BBlinded`. dothrow.js used a local Blind()
that read `u.Blind || u.ublind`, so a blindfolded, levitating hero whose
wished-for potion slipped read «A potion shatters!» where C says «You
hear something shatter!». The clone is deleted for the invent.js
export. The same file's "mirror family" is also made C-exact:

- the throw_obj multishot gate;
- throw_impaired;
- three Deaf copies folded into one.

Diff:

1. `function Blind()` deleted; `Blind` added to the invent.js import.
2. throw_obj `:1087`: `!(u.Confusion || u.Stunned || game.Confusion ||
   game.Stunned)` → `!(HConfusion | HStun)`, and `game.Fumbling ||
   u.Fumbling` → `Fumbling()` (attrib.js).
3. throw_impaired drops `u.Confusion`, `u.Stunned`, `game.Confusion`,
   `game.Stunned` and `game.Fumbling`.
4. `Deaf_youprop` and `Deaf_boom` deleted. The local `Deaf()` becomes
   `HDeaf || EDeaf || uroleplay.deaf`. Its three users (thitmonst
   `:649`, boomhit «Klonk!» `:2160`, throwit `:2510`) call it, and the
   unused `DEAF` const import goes.

The promise matches the diff.

## Inventory

- hero_breaks — js/dothrow.js:1503–1517 (body unchanged); C dothrow.c
  `:2416–2436`.
- throw_obj multishot gate — js/dothrow.js:1084–1096; C `:161–176`.
- throw_impaired — js/dothrow.js:1782–1790; C throwit `:1521–1522`.
- Deaf (local) — js/dothrow.js:1197–1201; C youprop.h `:123–125`.
- Callers of the Blind sites: breakmsg callers `:1607`, `:1634`; venom
  arms `:1656`, `:1662`; `:561`; hero_breaks `:1506`; breaks `:1522`;
  throwit tethered return `:1980`, `:1989`; throw_impaired `:1787`.
  That is 10 call sites (`git show 3b74ec586:js/dothrow.js | grep -c
  'Blind()'` → 10). The D-log says 13.

Deleted / re-pointed symbols:

```text
$ node scripts/sym.mjs Blind
Blind            js/invent.js:372   sync
             !! ALSO 25 LOCAL CLONE(S) in 25 files — IMPORT the export; do NOT add another
$ node scripts/sym.mjs Deaf
Deaf             NOT EXPORTED — but 14 LOCAL CLONE(S) in 14 file(s):
               js/detect.js:143  js/do.js:482  js/dothrow.js:1198  … 
$ node scripts/sym.mjs Fumbling
Fumbling         js/attrib.js:1198   sync
$ node scripts/sym.mjs Deaf_youprop     → NOT FOUND in js/**
$ node scripts/sym.mjs Deaf_boom        → NOT FOUND in js/**
$ node scripts/sym.mjs Hallucination
Hallucination    js/display.js:1396   sync
                 js/do_name.js:275   sync
             !! multiple exports — import the C-locus one
```

dothrow.js is no longer in the Blind clone list. Deaf has no export to
import, so a single C-exact local is the best available (14 clones
remain repo-wide, named in the D-log).

## C ↔ JS fidelity

**Blind.** invent.js:372:
`uroleplay.blind || ((HBlinded || EBlinded) && !BBlinded)`. This is C
youprop.h `:103`. The roleplay term is redundant, because u_init.c
`:1027` sets `HBlinded |= FROMOUTSIDE` for it. The measured state
(EBlinded 524288 from a worn blindfold, HBlinded 0) gives true, so
hero_breaks `in_view = Blind ? FALSE : …` (C `:2425`) is false and
breakmsg prints the «You hear» form. The deleted clone read `u.Blind`
(a stale mirror written only by do_wear.js:2186 / do.js:3831) and
`u.ublind`.

**throw_obj `:161–176`.** C: `quan > 1 && (is_ammo ? matching_launcher
: oclass == WEAPON_CLASS) && !(Confusion || Stunned)`. youprop.h `:81`
`Stunned HStun`, `:84` `Confusion HConfusion`. JS reads the flat
`u.HConfusion` / `u.HStun`. Every writer I found keeps the flat field
in step with `uprops[…]`:

- potion.js make_confused / make_stunned `:912`, `:979`;
- timeout.js set_HStun `:356–358` and the decrement arms
  `:1117–1141`;
- polyself.js propset_fromform `:659–671`.

The old reads of `game.Confusion` / `game.Stunned` / `game.Fumbling`
are true phantoms (nothing writes them). weakmultishot `|| Fumbling` is
now attrib.js Fumbling: `(HFumbling | uprops.intrinsic) ||
(EFumbling | uprops.extrinsic)` = youprop.h `:129`. The ammo arm uses
ammo_and_launcher where C uses matching_launcher. That is equivalent
inside the `is_ammo` branch, and it was not touched.

This gate is an RNG path: multishot feeds `rnd(multishot)` further down
(unchanged).

**throw_impaired** vs C `:1521–1522` `Confusion || Stunned || Blind ||
Hallucination || Fumbling`. The Confusion, Stunned, Blind and Fumbling
terms are now C-exact. Hallucination is still the do_name.js export,
which reads the sticky `u.Hallucination` before the H/E flats. Its own
doc says "Not youprop.h:116–120 (that reader is display.js
Hallucination)". Today the sticky bit is re-mirrored at every writer I
found (potion.js `:1167`, `:1185`; timeout.js `:1290`; artifact.js
`:1097` on Grayswandir), with C's formula, so I can show no divergence.
But the "C-exact" claim rests on a mirror, which is exactly what this
commit set out to remove.

**Deaf.** C youprop.h `:123–125`: `HDeaf ≡ uprops[DEAF].intrinsic`,
`EDeaf ≡ .extrinsic`, `Deaf (HDeaf || EDeaf || u.uroleplay.deaf)`. The
flat `u.HDeaf` is the superset store:

- music.js `:159` writes the flat field only;
- potion.js make_deaf `:875`, timeout.js set_HDeaf `:368` and eat.js
  `:565–570`, `:2474–2479` write both;
- pinned C has no EDeaf writer at all.

So the new local is at least as complete as the deleted Deaf_youprop
(uprops only, which missed music.js), and it drops the `u.Deaf` phantom
that the old Deaf / Deaf_boom read. Sites: C thitmonst `:2120`
`mon->mpeaceful && !Deaf`, boomhit (zap.c) «Klonk!» `if (!Deaf)`, and
throwit `:1794` `!Deaf && !Underwater`. All three JS sites match.

## Hallucinations / overclaim

- "13 sight gates" — I count 10 `Blind()` call sites at the commit.
  This is a count error only; every site now reads the live export.
- "throw_impaired … made C-exact": true for four of its five terms. The
  Hallucination term goes through do_name.js's sticky-first reader,
  not the youprop-exact display.js export (see above). No session is
  shown to diverge, so this is debt rather than a C-wrong.
- "Named omissions: none in dothrow.js" — the Hallucination import is
  the one exception.

## Density

One measured cliff (the Blind clone), plus same-file mirror cleanup on
the same C macro family (youprop.h). §10.19 allows this: same C file,
same root cause, no other file touched. It is right-sized, and the
multishot RNG gate rides along with a sweep.

## Verification

```text
$ node scripts/hidden-proxy.mjs verify hornoplenty,hero_breaks,throw_obj --base 3b74ec586~1 --no-reach
verify hornoplenty: baseline 3b74ec586~1 (scoreboard at 19281aa6e) — 1 session(s) blocked on it
  scen-sweep-Rogue-53250089: PASS
verify hornoplenty: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
verify hero_breaks: 0 blocked (vacuous: not an owner)
verify throw_obj: 0 blocked (vacuous: not an owner)
```

D-log: frozen runner PASS (RNG 29057/29057, Screen 1373/1373), reach
hornoplenty 2/2, hero_breaks 24/24, throw_obj 80/110, green 2/2, strict
×2, cohort 7/7, full 44/44, sweep 715 baseline-PASS 0 regressed. That
sweep covers the multishot RNG gate on the reached throw_obj sessions.
The end-of-audit rescore re-checks the window.

## Actionable C-wrongs

None proven. Debt (no session shown to diverge):

1. js/dothrow.js throw_impaired `:1788` (C dothrow.c throwit
   `:1521–1522`) imports do_name.js `Hallucination`, which ORs the
   sticky `u.Hallucination` mirror first. Import display.js
   `Hallucination` (`:1396`, youprop.h `:120` exact) instead, as done
   here for Blind. dothrow.js `:1371` (the picture-painting demon) uses
   the same import.

Verdict: **ACCEPT-WITH-DEBT**
