# Review 2886 — de00fc255 — pickinv MENUCOLOR + doname slippery quirk (D-4045)

- SHA: `de00fc255` (cliff, 1 owner `inuse_classify`, 2 writers:
  pickinv menu-color + doname slippery)
- D-entry: D-4045; Ledger: invent.c / objnam.c
- `js/` diff: `js/invent.js` +62/−24 (new `pickinv_menu_coloring` +
  10 call sites + multi-page color/split + 2 import names),
  `js/objnam.js` +7/−1 (slippery append + quirk comment); test
  `scripts/pickinv-menucolor.test.mjs` (new, 2 tests)

## Intent vs deliverable

Promise: 37 symset kind=screen sessions at invent.c:116 (RNG fully
matched, visible-identical text) are missing MENUCOLOR paint — C row
bytes carry `\x1b[32m…\x1b[39m` from rc `MENUCOLOR="uncursed"=green`
while JS is plain; residual worldtour-Monk (no MENUCOLOR) is offx-by-one
from C `(being worn); slippery)` vs JS `(being worn; slippery)`.
Diff ports windows.c add_menu :1803–1807 coloring into every pickinv
builder plus the strncat quirk. No clones; 2 import names on an
existing edge. Promise = diff.

## Inventory

- `pickinv_menu_coloring` (js/invent.js:3713–3740): new — attr_n
  split + bare-str match + cell attr.
- 10 call sites (:3866/:3888/:3894/:3935–3936/:3943/:4086/:4145/:4157/
  :4372/:4377) + multi-page map (:4214–4217) + query/blank cite
  (:4173): changed.
- `doname_base` slippery arm (js/objnam.js:3646): changed — append.
  C: `windows.c:1803–1807` add_menu + `:1841–1853` get_menu_coloring,
  `wintty.c:1442–1447` attr_n + `:2685–2689` prompt bypass,
  `invent.c:3081` clr + `:3232–3235`/`:3372–3375` add_menu_str,
  `objnam.c:70/:72–74/:1406` Concat quirk — all verified in pinned
  source (`wintty.c` lives at `win/tty/wintty.c`).

## C ↔ JS fidelity

(a) Menu color. C windows.c:1803–1807 verified: under
use_menu_color without SKIPMENUCOLORS, `get_menu_coloring(str)`
replaces color+attr. JS `get_menu_coloring` (options.js:6216, sync
per `sym.mjs`) ports :1841–1853 exactly (off-gate, first-match-wins
replace); `cattr_to_cell` (:6294) maps the C attr. C-side match
input is the bare pre-selector str — JS passes `t.slice(attr_n)`
✓. attr_n predicate is char-for-char C :1442–1447 (incl. the
`[-+#]` class) ✓. Caller color/attr ATR_NONE/NO_COLOR matches
invent.c:3081 `clr = NO_COLOR` ✓. Empty/wizid rows use whole-row
attr_n=0 via add_menu_str (:3372–3375, :3232–3235 verified) ✓;
query/blank stay plain per the tty_end_menu direct-tty_add_menu
bypass (:2685–2689 verified) ✓. Consumers live: menu painter
reads color/attr/descStart (:3155–3168), perm path threads clr
into `ttyinv_populate_slot` (:851), multi-page map matches the
pre-existing :3351 shape. `imports.mjs --can js/invent.js
js/options.js` → "ALREADY … No new edge needed" (verbatim). No
RNG either side.

(b) Slippery quirk. C objnam.c:70 `Strncat ≡ strncat` + :72–74
header comment + :1406 `Concat(bp, 1, "; slippery)")` all verified;
recorder tree byte-identical here (verified). strncat appends at
dst's NUL — it does NOT overwrite `dst[0]` — so the delta-1
"replace the final character" comment does not hold and C emits
`(being worn); slippery)` (recorded bytes confirm). JS `bp += ';
slippery)'` is exact. The audit claim re-verified: :1406 is the
ONLY plain-Concat delta-1 site in objnam.c (grep lists 11
Concat(bp sites, rest delta 0); lit/aum/glow are ConcatF/snprintf
true overwrites, so the neighboring JS slices stand.

(c) Helpers: `pickinv_menu_coloring` is a C-arm port (add_menu +
attr_n rule), not a clone; no symbol deleted or re-pointed.

Cite nit (not C-wrong): "C attr UNUSED :3054" — :3054 is the
display_pickinv header comment, not an attr statement; the
threading itself is correct.

## Hallucinations / overclaim

None. The scorer-strip mechanism (`m` of `\x1b[32m` surviving the
strip → `man uncursed` vs `an uncursed`) is pinned to recorded C
row bytes. The two "js-throw" verify labels are explained as the
D-4014-class artifact with falsifiable `show` evidence — re-checked
first-hand below (error=null, jsPanic=null, RNG full).

## Density

Cliff-phase: one owner (`inuse_classify`), two writers — the
second (objnam, different C file) serves the SAME verify blocked
set (Monk-50056062 → PASS inside it) and delivers 0 unchanged,
so the bundle is one delivered owner, not two cliffs. 33→34 PASS
+ 4–5 moved + 0 unchanged + 0 worse. Named (1)–(2) honestly list
the unported menu builders (no session blocks on them). Not a
no-op: `js/` + test + 38 adjudicated. `Ledger` updated (2 files).

## Verification

- Re-measure (this review, one call):
  `hidden-proxy.mjs verify inuse_classify --base de00fc255~1
  --no-reach` → `34 PASS, 4 moved past, 0 unchanged, 0 worse`.
  D-log said 33+5 at commit time; the delta is Rogue-50555036
  (moved →s807 then, PASS now) — a later window SHA healed its
  new owner, the expected HEAD-code effect. Same 38 sessions, 0
  unchanged, 0 worse: the commit-time claim is corroborated
  (strictly better), not contradicted. Non-vacuous (38 blocked).
- `hidden-proxy.mjs show scen-symset-Knight-50455017` (this
  review): kind=screen, owner-null, error=null, jsPanic=null, RNG
  23503/23503 — the "js-throw" label is confirmed artifact, no
  real throw.
- D-log Verify bullet: focused test red→green, full `verify.mjs
  --fn` twice stable (syntax 2 files, rule2, hidden line, REACH
  smoke 24/24, green + strict ×2, cohort 7/7) + `--full` 44/44 —
  shipped; final rescore below is the regression check.
- `imports.mjs --rulecheck` → clean (this iteration); no
  FORCE/DIAG/seed/coordinate gates in the diff.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
