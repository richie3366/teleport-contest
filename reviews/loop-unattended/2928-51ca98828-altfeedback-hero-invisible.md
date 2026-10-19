# Review 2928 — 51ca98828 — altfeedback reads youprop.h Blind/Invisible

- SHA: `51ca98828` (cliff, owner `doread`)
- D-entry: D-4087; Ledger: read.c (`seffect_confuse_monster`, D-4087);
  the uhitm.c sites are call-site edits
- `js/` diff: `js/read.js` +4 −5, `js/uhitm.js` +6 −11

## Intent vs deliverable

Promise: `altfeedback = (Blind || Invisible)` read phantom flats
(`u.Invisible`, and uhitm's flat-only `Invisible_you` clone), so a hero
invisible by worn extrinsic got «glow red» instead of «tingle» (2
sessions). Diff: read.js computes `altfeedback = Blind() ||
hero_Invisible()` once at the top. uhitm.js deletes `Invisible_you` and
calls display.js `hero_Invisible` at nohandglow, start_engulf and
end_engulf. Promise = diff.

## Inventory

- `seffect_confuse_monster` — read.js:1475–1525; C read.c:1400–1460
  (`altfeedback` at :1405).
- `nohandglow` — uhitm.js:2270–2290; C uhitm.c:6324.
- `start_engulf`/`end_engulf` — uhitm.js:3986–4006; C uhitm.c:4936, :4951.
- Deleted clone `Invisible_you` (uhitm.js:3949):

```text
Invisible_you    NOT FOUND in js/** (no export, no local function/const).
hero_Invisible   js/display.js:6208   sync
```

## C ↔ JS fidelity

C youprop.h:199 `Invisible (Invis && !See_invisible)`, with :198 Invis =
`(HInvis || EInvis) && !BInvis` and :152 See_invisible = `H || E`.
`hero_Invisible` = `hero_Invis() && !hero_See_invisible()`. Each one
reads both the flat and `uprops[]` intrinsic/extrinsic, and Invis gates
on `blocked`. That is the macro. `Blind()` (invent.js:371, imported at
read.js:108) is `(HBlinded || EBlinded) && !BBlinded`. The old local
also ORed `u.ublind`.

In C, `altfeedback` is computed once at function entry, before
`make_confused`. JS now computes it once, before the branches, so the
`HConfusion + rnd(100)` arms can't change it mid-function. The three
arms (`!sblessed` tingle/glow, blessed buzz, not-confused `umconf`
tingle/glow) keep C's text and order. In uhitm the engulf `tmp_at`
display gate now matches C `if (!Invisible)`. No RNG change.

One caveat on the reader (pre-existing): `hero_Invis` returns true on
the phantom `u.Invis` flat before the BInvis gate (display.js:6189),
the same shape as mhitu `Flying()` (review 2919).

## Hallucinations / overclaim

None. Removing a divergent clone is the right direction (sym output
above).

## Density

Two C files, one macro. One Ledger bullet (seffect_confuse_monster);
nohandglow and the engulf pair only swap a reader.

## Verification

```text
verify doread (--base 51ca98828~1): 2 PASS, 0 moved past, 0 unchanged, 0 worse
  scen-sweep-Caveman-50055067, scen-sweep-Rogue-620093: PASS
```

This is an exact match with the D-log's direct-score claim. No
FORCE/DIAG/seed strings.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
