# Review 2951 — d49199189 — look_here keeps the stale topline; fountain.c Blind reads go live

- SHA: `d49199189` (cliff, board owner `x_monnam`, 2 rows, one writer each)
- D-entry: D-4111; Ledger: look_here ported; dowatersnakes, dowaterdemon,
  dowaternymph, dofindgem, drinkfountain, drinksink, sink_backs_up,
  wash_hands ported
- `js/` diff: `js/fountain.js` +20/−25, `js/display.js` +9/−1, `js/invent.js` +4/−3

## Intent vs deliverable

Promise, in two parts. (a) look_here's `display_nhwindow(WIN_MESSAGE,
FALSE)` (toplin EMPTY, no wipe) was a flush_topl_more, so a getpos
autodescribe left on row 0 under the pile menu was wiped by the next
parse() clear. C keeps it. (b) fountain.c's eight `Blind` reads were a
`u.Blind || u.ublind` clone, so a blind hero saw «An endless stream of
snakes pours forth!» where C has you hear hissing. Diff: look_here calls
`display_nhwindow_message()`. `mark_topline_empty` records
`_stale_topline`, and `clear_nhwindow_message` treats that leftover as
C's EMPTY no-op. Every fountain.js Blind read uses the invent.js `Blind`
export, and the file-local `Blind()` clone is deleted. Promise = diff.

## Inventory

- `look_here` menu prologue — invent.js:9578; C invent.c look_here.
- `mark_topline_empty` / `clear_nhwindow_message` — display.js:3384, :3338.
- fountain.js `dowatersnakes` :557, `dowaterdemon` :592, `dowaternymph`
  :621, `dofindgem` :251, `sink_backs_up` :335, `drinksink` :399/:421,
  `drinkfountain` case 25 :899; C fountain.c :44/:71/:101/:108/:167/
  :337/:629/:643/:809/:818.
- Callee `Blind` — invent.js:372, sync. Deleted local clone.

```text
Blind            js/invent.js:372   sync
             !! ALSO 29 LOCAL CLONE(S) in 29 files — IMPORT the export
Invisible        NOT FOUND in js/** (no export, no local function/const).
```

## C ↔ JS fidelity

The invent.js `Blind` is `uroleplay.blind || ((HBlinded || EBlinded) &&
!BBlinded)`, which is C youprop.h Blind. The old `u.Blind || u.ublind`
read missed EBlinded (blindfold, towel) and BBlinded, so the
dowatersnakes sighted/blind arm diverged for a blindfolded hero. All
eight C `Blind` sites in the touched functions now read the live
predicate. The sink_backs_up Deaf read predates this commit.

The look_here half matches C: with toplin EMPTY, tty_clear_nhwindow's
NHW_MESSAGE arm does nothing (wintty.c :1048), so the leftover text
stays until something overwrites it. `_stale_topline` makes the JS
parse-time extension (which erases an un-flagged painter prompt) skip
exactly the text C would leave. No RNG.

The same lines still read two C-wrong clones that this commit touched
but did not fix:

```c
case 25: /* See invisible */
    if (Blind) {
        if (Invisible) You("feel transparent.");   /* fountain.c :337–339 */
#define Invisible (Invis && !See_invisible)        /* youprop.h :199 */
if (!(Blind || Hallucination)) observe_object(otmp); /* fountain.c :644 */
```

- fountain.js:900 tests `u.HInvis || u.EInvis || u.Invis`. That drops
  `!BInvis` (from `Invis`) and `!See_invisible`, so a blind, invisible
  hero with See invisible gets «You feel transparent.» where C prints
  «You feel very self-conscious.».
- fountain.js:424 reads the sticky `u.Hallucination` mirror. display.js
  :1363 documents that mirror as insufficient (D-1493), and the live
  `Hallucination()` is right there.

Both functions are marked `ported` in the ledger.

## Hallucinations / overclaim

The Ledger marks `drinkfountain` and `drinksink` `ported` while each
keeps a diverging property clone on a line this SHA edited. That
overclaims. Neither is reached: the board has 0 failing rows owned by
any fountain.js function. So under §10.19 this is debt, not a Must-fix.
This audit corrects both ledger rows to `partial` with the clone named
(`ledger.mjs set`).

## Density

One owner with two writers, each the minimal C-site fix. The eight-site
Blind sweep stays inside the one file the second session needed.

## Verification

```text
verify x_monnam (--base d49199189~1): 2 blocked
  scen-shop-Knight-50455511: PASS
  scen-sweep-Caveman-50850017: PASS
verify x_monnam: 2 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
verify dowatersnakes: 0 blocked
verify look_here: 5 blocked (symset, parked D-3946), unchanged
```

Exact match with the D-log. Full public 44/44 on HEAD.

## Actionable C-wrongs

1. fountain.js drinkfountain case 25 :900 — replace the `Invisible`
   clone with C's `Invis && !See_invisible` (youprop.h :199). Unreached;
   ledger partial.
2. fountain.js drinksink :424 — `u.Hallucination` → live
   `Hallucination()`. Unreached; ledger partial.

Verdict: **ACCEPT-WITH-DEBT**
