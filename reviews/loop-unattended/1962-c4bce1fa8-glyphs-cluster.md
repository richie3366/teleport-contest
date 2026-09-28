# Review 1962 — c4bce1fa8 — glyphs.c customization cluster (D-3002)

Metadata: SHA `c4bce1fa8`, D-3002, eleven-function SYMBOLS
customization pipeline cluster. Stat: `js/glyphs.js` (+264/−8),
`js/options.js` (+277/−9), `js/generated/colortable_data.js`
(new, 155 rows), `scripts/extract-colortable.py` (new),
`scripts/glyphs-custom.test.mjs` (new, 13 tests). Total js/ ≈
+700 across 3 files. No prior review file on disk. Cluster
commit → Method applied per function below.

## Intent vs deliverable

Subject promises: "`glyphs.c` breadth cluster:
apply_customizations + glyphrep_to_custom_map_entries +
callback/urep closure; coloratt/utf8map pipeline;
parsesymbols :837 wired (D-3002)." The body enumerates eleven
functions with no JS symbol, the latent ReferenceError fixed
along the way, and the options→glyphs TDZ crash with its
constant fold.

Diff actually adds the eleven ports with per-arm cites, the
155-row generated table + extractor, the `:837` import wiring,
three doc retirements, and the S_sw_br fold. Promise and diff
match; nothing outside the pipeline.

## Inventory (per function)

- `apply_customizations` (NEW, exported, `js/glyphs.js:938`):
  stamp loop, urep + nhcolor arms, pending write.
- `glyphrep_to_custom_map_entries` (NEW, exported, `:688`):
  `glyphid[:U+][/rgb]` spec parser + find run.
- `to_custom_symset_entry_callback` (NEW, module-local,
  `:636`): glyph_find_core callback (C staticfn).
- `add_custom_urep_entry` (NEW, exported, `:871`): urep
  refresh/create (C utf8map.c).
- `unicode_val` (NEW, exported, `js/options.js:4856`): U+
  hex parse (C utf8map.c).
- `set_map_u` (NEW, exported, `:4884`): cell urep attach
  (C utf8map.c).
- `colortable_to_int32` (NEW, exported, `:4653`): table row
  fold (C coloratt.c).
- `check_enhanced_colors` (NEW, exported, `:4706`): name/
  #hex/table resolve (C coloratt.c) + local `scanHashRgb`.
- `onlyhexdigits` (NEW, exported, `:4748`): hex/dash check
  (C coloratt.c).
- `rgbstr_to_int32` (NEW, exported, `:4769`): triple/name
  parse (C coloratt.c).
- `set_map_customcolor` (NEW, exported, `:4835`): cell color
  stamp (C coloratt.c).
- Support: `S_sw_br` const + `S_sw_tl` import DELETED
  (TDZ fold); COLORTABLE/dupstr/glyphrep imports into
  options.js; `closest_color` doc line updated.

## C ↔ JS fidelity (per function)

`apply_customizations`, `csym` `glyphs.c:530–574`
(D-log `:531`, 1-line start drift — nit): mask `:538–540`,
set loop `:543`, urep arm + H_UTF8 gate `:552–560`, nhcolor
arm `:562–568`, pending write `:573` → all in C order.
ENHANCED_SYMBOLS verified live (`config.h` defines it).
Callees `set_map_u`/`set_map_customcolor` LIVE. Callers: 5
live + 1 commented-out (`options.c:4231`) — matches the
D-entry exactly; all five wrappers unported, map-named.

`glyphrep_to_custom_map_entries`, `csym` `glyphs.c:111–181`:
last-separator-wins cuts with next-cut ends `:129–149` →
equivalent slice logic ✓; sanity `:150–161` (one space for
id/color, all for codepoint, emptied dropped) ✓; color gate
+:163–164` with the exact short-circuit (bad color leaves
find.color at zero) ✓; nonzero_black marker `:171–173` →
`NONZERO_BLACK = CLR_BLACK|NH_BASIC_COLOR` = C
`glyphs.c:35` verbatim (0|0x1000000 both sides) ✓; out-box +
callback + find run `:177–180` ✓. The `:122–124` reslt=1 is
dead C (overwritten at `:179`) — correctly omitted, noted.
`symbols.c:837` wired (import; one-arg call stands — C
declares `glyph` at `:835` and never reads it after `:837` ✓);
other four callers unported, map-named. This retires a live
ReferenceError — confirmed fixed, not just moved.

`to_custom_symset_entry_callback`, `csym` `glyphs.c:52–104`:
extraval `:63–64` (null-tolerant) ✓; `:66` assert elided
with cite (BSS-range, no JS writers) ✓; unicode arm `:68–90`
with the `:71–79` FIXME preserved in the nag arm ✓; color
arm `:92–103` ✓; static nags → module lets; config message
byte-identical. `String.fromCodePoint(uval)` renders the
accepted bytes — gated behind `unicodeval_to_utf8str`,
which returns 0 on surrogates/`>U+10FFFF`/short bufs
(`js/hacklib.js:672`), so it cannot throw ✓.

`add_custom_urep_entry`, `csym` `utf8map.c:147–207`: gdc
setup, find (FIXME kept `:166–167`), refresh
(clear-then-set-or-clear `:170–181`), create `:186–206`
(nonempty utf8str check, append, count++, return 1) ✓ all
in C order. Sole caller `glyphs.c:81` ✓ (live above).

`unicode_val`, `csym` `utf8map.c:17–34`: U/u+plus+hex gate,
`(dp-hexdd)/2` accumulate, `++dcount<7` → JS `hexdd pair
idiom + dcount>=7 break`. Both sides cap at **7** digits —
the D-log/JS-doc "8-digit cap" prose is off by one, but the
code is C-exact (counted both). Doc nit only.

`set_map_u`, `csym` `utf8map.c:36–56`: null/zero guard,
alloc-once, free-old, dupstr, set, return 1 ✓ exact.

`colortable_to_int32`, `csym` `coloratt.c:236–246`: default,
rgb pack, nh row ✓. Enum verified: C `{no,nh,rgb}` = 0,1,2
(`color.h:61`) = JS consts ✓. Generated table: 155 rows,
all read fields present, extractor enforces the
tableindex 0..N-1 gap guard ✓.

`check_enhanced_colors`, `csym` `coloratt.c:722–760`:
basic-name `:729` (match_str2clr LIVE, `true` flag) ✓;
`#%02x%02x%02x%c` `:731–732` via scanHashRgb — literal #,
6-char whitespace skip, 0x-inside-width, width-2 hex via
the pair table (uppercase covered), %c junk catcher with
count>=3 + `!xtra` pack ✓; grey→gray altbuf `:739–747`
(strstri-first-offset + 4-char memcpy shape) ✓;
fuzzymatch walk `:748–755` (LIVE import, same args) ✓.
Micro-gap (see Debt): C `%x` also accepts a `+`/`-` sign,
which scanHashRgb rejects — divergent only on pathological
`#-…` specs no config or session produces. Callers:
`:860` ✓ live; `options.c:10088/10094` unported, named.

`onlyhexdigits`, `csym` `coloratt.c:800–810`: hexdd-or-dash,
empty TRUE ✓ exact.

`rgbstr_to_int32`, `csym` `coloratt.c:812–865`: dash-cut walk
with c_g-after-first / c_b-after-last-overwrite semantics
(`1-2-3-4`→r1/g2/b4 verified against the pointer trace) ✓;
1–3-digit sanity ✓; atoi pack with NO clamp ✓; hex-letter
walk-fail → immediate -1 (no enhanced fallback, like C)
✓; name fallback `:858–863` ✓. Callers: `glyphs.c:163` ✓
live; `:1083` under CHANGE_COLOR — verified dead in the
contest unix build (only mac/amiga confs define it) ✓.

`set_map_customcolor`, `csym` `coloratt.c:867–883`: null
guard, stamp, closest_color resolve (LIVE, `{v}` boxes),
uint16 mask, return 1 ✓. Sole caller `glyphs.c:565` ✓.

No stub, no silent omit in any arm. Callee closure: every
C callee LIVE (imports verified at use), `scanHashRgb` a
faithful local sscanf model, the callback correctly
module-local. `sym.mjs` (S_sw_br is the one deleted symbol):

```text
S_sw_br          NOT FOUND in js/** (no export, no local function/const).
S_sw_tl          js/display.js:680   sync   export const
```

TDZ fold verified: `(S_sw_br - S_sw_tl) + 1` with
`S_sw_br = S_sw_tl + 7` is 8 for ANY base — algebraically
exact, not value-dependent; the folded site was the single
runtime use (only comments mention the symbols now); the
top-level display.js read is gone. The first-run
`ReferenceError: Cannot access 'S_sw_tl'` FAIL → inlined →
PASS narrative in the Verify bullet is consistent with
this mechanism.

Diff grep: three FIXME hits are all "FIXME preserved/kept"
C citations in comments — no new TODOs. No FORCE/DIAG/
getRngLog/seed. Rule #2 re-verified clean under 1956; new
edges (options→glyphs, options→generated, glyphs→options)
are ESM-static with hoisted-fn runtime-only use.

## Hallucinations / overclaim

None material. "Exact `#%02x%02x%02x%c` emulation" overclaims
by the sign case (see Debt) — the named sub-cases (whitespace
skip, 0x-in-width) are all correct. The bare-`match_glyph`
call (`js/options.js:9720`, G_ names) stays bare as disclosed
— pre-existing (parent tree `:9460`), no corpus witness, a
breadth-picker row, not this SHA's wrong. No dispatch-over-
stub anywhere: eleven bodies, eleven ports.

## Density

One caller/callee closure (the SYMBOLS customization
pipeline: parsesymbols → glyphrep → callback → urep/color/
utf8 writers) spanning three C files — the closure prong is
satisfied. But the cluster ports **11** C functions against
the §2b ceiling of 10 ("Ten functions is a ceiling, not a
target"; the review Method names >10 as QUALITY-RISK). The
audit above proves the overage caused no skimping — every
function whole, every gate green — so there is no C-wrong to
Must-fix (unshipping a faithful function is not a fix). Per
the 1951 review-debt precedent this lands as debt, not risk:
flagged here + recorded in CURRENT Live debts, unqueued.

- All 11 functions: whole bodies, callers wired-or-named → OK.
- Count: 11 > 10 → DEBT (process overage, unqueued).

## Verification

D-log: focused 13/13; first `verify.mjs --fn (all 11)` FAIL
(TDZ ReferenceError, every session) → fold → PASS (syntax;
rule2; hidden note ×11; smoke 24/24 ×11; green 2/2; strict
×2; cohort 7/7; full 44/44). The FAIL→fix→PASS arc is the
honest kind — the TDZ broke everything loudly, then green.
Re-measured here in one call (`--base c4bce1fa8~1`,
`--reach-all`): all 11 report 0 blocked at baseline and in
the working scoreboard with `fixed smoke spread (24 run):
24 PASS, 0 regressed → REACH-OK` — e.g.:

```text
verify apply_customizations: baseline c4bce1fa8~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke apply_customizations: no RNG-tagged reach; fixed smoke spread (24 run, 8.0s): 24 PASS, 0 regressed → REACH-OK
```

(identical pairs for the other ten, captured in-session).
Coverage cluster, so the vacuous notes are honest. Zero
REGRESSED. No seed/step/coordinate/RNG-index reads.

## Actionable C-wrongs

None queued. Debts recorded (review-debt, unqueued —
1951 precedent):

1. Cluster size 11 over the §2b 10-function ceiling (all
   eleven whole; no skimping found — sizing note for the
   next cluster, not a fix).
2. scanHashRgb `%x`-sign micro-gap (`#-…` specs rejected
   where C sscanf accepts; pathological input, no witness).

Verdict: **ACCEPT-WITH-DEBT**
