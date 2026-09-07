# Review 969 — d8b4a676 — makemon byyou set_apparxy + live Invis (D-1999)

Metadata: SHA `d8b4a676`, D-1999, Open-row port (`monmove.c`
set_apparxy, row cited 6/553; 8 blocked at HEAD baseline). js/
touches 3 files (+19/−~8: `makemon.js` +3, `monmove.js` +11/−4,
`timeout.js` +5/−1). `c-js-map/turns.md` updated. No stamp owed.

## Intent vs deliverable

Subject promises: (a) missing `set_apparxy` call in the `makemon`
`byyou` branch (RNG theft: creation draws where C draws gotu
`rn2(3)/rn2(4)` first); (b) live `Invis()` macro in place of the
stale `u.Invis` flat in `set_apparxy`/`m_move` (invisible-hero
scatter never fired on the JS side). Diff actually adds: exactly
those three hunks. Promise == diff.

## Inventory

- Changed JS functions: `makemon` (one call added), `set_apparxy`
  (predicate source swapped), `m_move` (predicate source swapped),
  `Invis` (`function` → `export function`, body untouched).
- Deleted symbols: two local `const Invis = !!(u[.Invis])` shadows
  (monmove.js `set_apparxy`, `m_move`) — re-pointed to the import.
- New helpers: none. No STUB, no CLONE added.

## C ↔ JS fidelity

C loci: `makemon.c:1391–1396` (`else { if (byyou) { newsym;
set_apparxy; } }` — read verbatim above); `monmove.c` notseen
`notseen = (!mtmp->mcansee || (Invis && !perceives(mtmp->data)))`
(statement reads verbatim; D-log cites `:2223`, my pinned read puts
it ~6 lines earlier — citation approximate, statement exact);
`monmove.c:1865–1866` appr `(should_see && Invis && !perceives(ptr)
&& rn2(11))` (verbatim match incl. short-circuit position before
peaceful/stalker arms); `youprop.h:198` `#define Invis ((HInvis ||
EInvis) && !BInvis)`.

- Call order: JS `byyou` branch (makemon.js:2968, newsym +
  `set_apparxy`) precedes the main-flow `m_initweap(mtmp)`/
  `m_initinv(mtmp)` (:3039–3040) — matches C (apparxy `:1393–1394`
  before invent `:1441–1445`). The commented-out intent ("newsym +
  set_apparxy before invent") is now true. No RNG in the added lines
  themselves; the fix restores C's draw order (gotu/scatter before
  `m_initweap rn2(3)` / `m_initinv rn2(50)`). ✓
- `Invis()` body (`timeout.js:1130`): `(H||E) && !BInvis()` from
  flat+`uprops[INVIS]` — exact macro shape, pre-existing and C-cited;
  this commit only exports it (right direction: IMPORT the export,
  per the playbook clone rule). ✓
- Callee closure: `set_apparxy` already imported in makemon.js (no
  new edge); `monmove.js → timeout.js` `--can` → `ALREADY: monmove.js
  already statically imports timeout.js. No new edge needed.` Calls
  are runtime-only (inside function bodies), so no TDZ read. All
  LIVE; deleted shadows were the C-wrong (flat synced only by the
  magic-trap toggle, per D-log `trap.js:4204`), correctly removed.

Required `sym.mjs` outputs (symbols this diff deletes/re-points):

```text
Invis            js/timeout.js:1130   sync
             !! ALSO 4 LOCAL CLONE(S) in 4 files — IMPORT the export; do NOT add another
               js/mhitu.js:215  js/potion.js:660  js/trap.js:4039  js/zap.js:691
set_apparxy      js/monmove.js:694   sync
```

## Hallucinations / overclaim

One trivial nit: D-log says "five local `Invis` clones already exist
elsewhere"; `sym.mjs` shows 4 (mhitu/potion/trap/zap). No new clone
was added either way, so no fidelity impact — noting for accuracy,
not action. Everything else checks: the mid-iteration narrative
(7/8 then Healer-92147 moved by the Invis hunks) is consistent with
the final 8-mover verify.

## Density

~19 insertions across one caller/callee cluster (`makemon` →
`set_apparxy` + shared macro export). Right-sized per §2b (tight
caller/callee cluster, one falsifier: first-move RNG + invis
scatter).

## Verification

Re-measured myself: `hidden-proxy verify set_apparxy --base
d8b4a676~1` → `0 PASS, 8 moved past, 0 unchanged, 0 worse →
PROGRESS`, same 8 sessions → same later owners/steps as the D-log
(91139 one_characteristic@54, 92073 @73, 92126 x_monnam@38, 92151
@84, Healer-92147 wildmiss@186, 91103 gcrownu@79, 92155
mhitm_mgc_atk_negated@144, 92212 exercise@66). Claim holds exactly.
D-log also reports `PASS full 44/44` (shared-file auto-trigger) —
plausible for this envelope; green/cohort PASS on the port iter.
Grep of the js hunks: no `FORCE`/`DIAG`/`getRngLog`/seed/coordinate/
`fastforward`. Rule #2 clean.

## Actionable C-wrongs

None. Residuals (other `u.Invis`-flat readers at mon/mhitu/uhitm/shk/
do_wear/pager; remaining C `set_apparxy` call sites; `m_move` appr
`uundetected`/mappear/stalker arms) are all named in the map section
as future rows, not Must-fix.

Verdict: **ACCEPT**
