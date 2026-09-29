# Review 2047 — ffb380a5c — doborn + enlightenment leaves (D-3087)

Metadata: SHA `ffb380a5c`, D-3087, js/insight.js (+29), js/invent.js
(+~120/−30), js/getline.js (+11 wizborn runner), js/dbridge.js (+1/−1
export). Four-function insight.c cluster + 2 same-iteration splits.

## Intent vs deliverable

Promise: doborn whole (#wizborn census + runner) and three
enlightenment leaves whole (enlght_halfdmg, cause_known,
walking_on_water) with every deferred call site wired. Diff delivers
all four bodies + the wizborn EXT_CMDS runner + 8 call-site wirings
(status arm, 3 cause_known conditions, 2× halfdmg guards, 2× Wwalking
potential) + the hero_Wwalking export. Kept.

## Inventory (per function)

- `doborn` (NEW export js/insight.js:1578): fmt closure, header,
  LOW_PM..NUMMONS census, blank, totals, show_text_pages, ECMD_OK.
  Callees: show_text_pages/pmname_neutral/mvitals LIVE-or-const. Plus
  the 'wizborn' EXT_CMDS runner (getline.js, wiz:true,
  autocomplete:false) — wired in-commit, D-2779 pattern.
- `enlght_halfdmg_lines` (NEW local js/invent.js:5674, ledger split):
  3-arm switch + default, half/reduced, enlght_line_txt + from_what.
  Callees LIVE. Guard helpers Half_physical/spell_damage (NEW locals):
  C-macro mirrors, see below.
- `cause_known` (NEW js/invent.js:5335, deletes cause_known_sleepy
  subset): mask, invent walk, oprop+name+dknown. Zero C callees
  (table reads). 3 conditions rewired.
- `walking_on_water` (NEW js/invent.js:5367): uinwater/Levitation/
  Flying gate, Wwalking + pool/lava. Callees: Levitation/Flying LIVE
  imports (mhitu.js), hero_Wwalking (newly exported), is_pool/is_lava
  LIVE. Status arm + 2 potential arms wired.

## C ↔ JS fidelity (per function)

doborn (C :3144–3176): fmt `"%4i %4i %c %-30s"` ≡ padStart/padStart/
flag/padEnd with died-BEFORE-born arg order both sides ✓; header
'died born' ✓; skip iff !born&&!died&&!gone ✓; E/G/X/blank nested
ternary exact ✓; pmname_neutral ≡ pmnames[i][NEUTRAL] (same-file
helper, 'monster' fallback only OOB) ✓; totals fmt(ndied,nborn,' ',"")
✓; show_text_pages {moreAtEnd:true} = file idiom (dogenocided :1597
identical) ✓; ECMD_OK ✓. Caller: "wizborn" cmd.c:1942–1943
(IFBURIED|WIZMODECMD, unconditional — the #ifdef DEBUG at :1944 is
for wizbury) → EXT_CMDS runner with matching flags ✓. No RNG.
Verdict: ACCEPT.

enlght_halfdmg (C :200–220): switch physical/spell/unknown ✓
(`|0` ≡ int); ` %s %s damage` with half iff final||wizard ✓
(JS wizard = flags.wizard||flags.debug ≡ C wizard per the 2035
equivalence); enl_msg(You_,"take","took",buf,from) ≡
enlght_line_txt('You ',final?'took':'take',buf,from_what) ✓ (macro
 enl_msg = enlght_line(prefix, final?past:present,...) :105–106, and
enlght_line_txt is char-identical to C enlght_line incl. the 6
contractions). Callers :1811/:1813 → both copies with Half_* guards
✓ (positions after magic_negation ✓). The adjacent :1814–1815
Half_gas_damage direct-enl_msg arm is correctly NOT claimed (D-log
scopes it to attributes_enlightenment, whose ledger row stays
unknown/MISSING — the owner's row). No RNG. Verdict: ACCEPT.

cause_known (C :264–283): mask ✓; invent walk ✓; owornmask skip ✓;
`(int)oc_oprop==propindx && oc_name_known && dknown` ✓ exact;
artifacts/wielded exclusions kept ✓. The old "oc_oprop not in
objects table" comment was STALE: generated r[9] carries it —
amulet-of-restful-sleep=27=SLEEPY, gauntlets/fumble-boots=25=
FUMBLING, hunger-ring=28=HUNGER (all verified live) — so the
generalization is sound and the Sleepy arm keeps working (strictly
more faithful: every conveyer, not one otyp). Callers :1178/:1182/
:1191 → `magic || cause_known(PROP)` under Fumbling()/hero_Sleepy()/
HHunger||EHunger ✓ (bodies pre-existing, conditions only). No RNG.
Verdict: ACCEPT.

walking_on_water (C :223–229): gate `u.uinwater||Levitation||Flying`
✓; `Wwalking && is_pool_or_lava` ≡ hero_Wwalking()&&(is_pool||
is_lava) ✓ (C dbridge.c:77–83 is exactly that disjunction). Caller
:994's elif chain (`Underwater → u.uinwater → walking`) vs JS
standalone `if`: EQUIVALENT — proved, not assumed (predicate is
FALSE whenever u.uinwater, covering both earlier arms; no Riding
arm exists in this chain; Levitation/Flying excluded by the
predicate itself) ✓; `walking on water|lava|surface` text exact
and wrap(wbuf,from) ≡ you_are ✓ (mid=final?were:are). Caller
:1755 → `hero_Wwalking() && !walking_on_water()` in both copies
with you_can ≡ enlght_line_txt(You_,'can '/'could ',...) ✓
(C can[]="can ", could[]="could " :44–46). No RNG. Verdict: ACCEPT.

Helper classification (Method §3): Half_physical/spell_damage are
C-MACRO mirrors (youprop.h:295 `#define`, no C function exists),
shape-identical to allmain.js:398 (flat + uprops dual read is the
repo-wide prop pattern) — same-file use only, not clone drift.
hero_Wwalking local→export is the correct re-point (single def,
no other Wwalking locals). Levitation/Flying correctly IMPORT the
mhitu.js exports despite 10/7 pre-existing clones elsewhere.
`sym.mjs` key lines: `hero_Wwalking js/dbridge.js:317 sync`,
`Levitation/Flying js/mhitu.js:715/723 sync`,
`pmname_neutral` same-file local, `from_what js/attrib.js:1163
sync`. `imports.mjs --can invent→mhitu` → ALREADY (no new edge).

## Hallucinations / overclaim

None. "none in-body" holds for all four (cause_known: zero C
callees — true, table reads). The gas-arm scoping sentence is
accurate. The standalone-if≡elif claim is proved above. Caller
file:lines in the D-log match the diff.

## Density

One C file, 4 whole functions + 2 splits, every caller wired —
§2b-shaped ✓. `Ledger:` 4 + 2 split rows ✓. Full `sessions` 44/44
forced beyond the minimum. Per-function: 4× ACCEPT → SHA ACCEPT.

## Verification

- Re-measured `hidden-proxy verify
  doborn,enlght_halfdmg,cause_known,walking_on_water --base
  ffb380a5c~1 --reach-all`: all four `0 session(s) blocked (0 at
  baseline, 0 in working)` + `smoke 24/24 PASS, 0 regressed →
  REACH-OK`. Matches the four D-log bullets; honestly vacuous
  (rows cited 0), 0 regressed.
- Ban-grep on the js hunks: clean. `imports.mjs --rulecheck`: clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
