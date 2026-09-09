# Review 1206 — 66b8bd60 — pooleffects full port (leave-water / steed / ceiling-hider)

Metadata: SHA `66b8bd60` (D-2240). Queue row `hack.c` pooleffects,
no corpus block. js/ pickup.js +118/−30ish, dbridge.js +8, mon.js +2
(export keyword only).

## Intent vs deliverable

Subject promises the full C-order port of `pooleffects`: the deferred
leave-water half (pop / lava-leave / back_on_ground / set_uinwater +
vision restore), the steed arms, the ceiling-hider stay-out, and the
Wwalking/Swimming/Amphibious/Breathless gates computed once. Diff adds
exactly that: one rewritten `pooleffects` body, one new `is_waterwall`
export, one `export` keyword on the existing `ceiling_hider`. Promise
kept.

## Inventory

Changed: `pooleffects` (rewrite), `is_waterwall` (new export,
dbridge.js:131), `ceiling_hider` (local → export, mon.js:3053). No
other functions touched.

Callee closure for the combined arm walk: `pline`, `back_on_ground`,
`set_uinwater`, `docrt`, `dismount_steed`, `check_special_room`,
`ceiling_hider`, `lava_effects`, `drown`, `is_pool`, `is_lava`,
`is_waterwall`, `hliquid` — all LIVE imports on pre-existing edges;
`sym.mjs` output pasted: `pooleffects js/pickup.js:1871 ASYNC`,
`ceiling_hider js/mon.js:3053 sync + 2 LOCAL CLONEs (engrave.js:306,
music.js:143)`, `is_waterwall js/dbridge.js:131 sync`. The two
remaining `ceiling_hider` locals are pre-existing debt in untouched
files, not a 4th clone from this commit (D-log says so explicitly).
`is_pool_or_lava` stays inline as `is_pool||is_lava` with the
proven-identical cite — no new clone. No STUB in any live arm; no new
named omits (turns.md:1094 `wizterrainwish` stays named — different C
function).

## C ↔ JS fidelity

Branch-by-branch vs `hack.c:3231–3309` (`csym.mjs` range; body pasted
in full during audit):

- Leave-water `:3236–3265`: `!is_pool` → waterlevel air-bubble +
  `last_msg` / lava-leave / `back_on_ground(FALSE)`; `is_pool` +
  waterlevel → still; Levitation cork / Flying / Wwalking rise /
  else still — exact order, exact messages (`hliquid("water")`).
  `was_underwater ≡ uinwater && !Is_waterlevel`, `set_uinwater(0)` +
  `docrt()` + `vision_full_recalc = 1` — exact.
- Enter `:3267–3307`: `!ustuck && !Lev && !Fly && is_pool_or_lava`;
  floating/clinging steed FALSE; mounted dismount with
  `uinwater ? FELL : GENERIC`, air/water early FALSE,
  `check_special_room(FALSE)` on newspot, TRUE — exact;
  ceiling-hider stay-out — exact; lava → `lava_effects()`;
  `(!Wwalking || is_waterwall) && (newspot || !uinwater ||
  !(Swim||Amph||Breath))` → `drown()` — exact.
- Prop macros vs `youprop.h:240–279`: Wwalking `:260`
  `(HW||EW) && !Is_waterlevel` — JS ORs uprops-intrinsic/extrinsic
  with the H/E flats (same value twice, house idiom, harmless);
  Swimming `:266` incl. the `u.usteed && is_swimmer` disjunct — exact;
  Amphibious `:272` / Breathless `:276` via MAGICAL_BREATHING flats +
  data fn on `game.youmonst?.data` ≡ `gy.youmonst.data` — exact;
  `Underwater :279` ≡ `u.uinwater` — exact.
- RNG: `pooleffects` draws nothing itself; `| 0` int idiom on the
  prop reads. No RNG order to break.

## Hallucinations / overclaim

None. D-log labels the hidden check vacuous-0 explicitly (not a corpus
PASS) and the re-run below confirms it. `imports --can` claims
(mon ALREADY, dbridge cycle-safe hoisted) consistent with pre-existing
edges; no new edge introduced beyond them.

## Density

One C function (79 lines) + canonical export + home-shape helper in one
handoff. In-band (§2b right size).

## Verification

Audit re-ran the corpus claim itself:

```text
verify pooleffects: baseline 66b8bd60~1 — 0 session(s) blocked on it
(0 at baseline, 0 in the working scoreboard)
```

Vacuous-0-confirmed, exactly as labeled — no `--base` owed (row cited
0 blocks). Green 2/2 + strict ×2 + cohort 7/7 pasted; 44/44 full-suite
pasted. Diff grep: no FORCE/DIAG/`getRngLog`/seed/fastforward/
coordinates. Rule #2 clean (re-run here, repo-wide:
`Rule #2 clean: no bare/node specifiers or fs calls in js/`).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
