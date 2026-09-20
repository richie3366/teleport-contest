# Review 1598 — c48fc89f — region.c rest_regions whole-body port (D-2639)

**Metadata:** SHA `c48fc89f`, `region.c` `rest_regions`, D-2639.
JS: `js/region.js` (+121: `rest_regions` export + file-local
`reset_region_mids`), `js/bones.js` (+bones id map + getlev_bones
wire), `js/do.js` (stash-restore wire), `js/save.js` (save-restore
wire). No prior review claimed closed.

## Intent vs deliverable

Subject promises: new `rest_regions(stored, elapsed, ghostly)` in C
order (security wipe, ghostly tick, per-field rebuild, ttl rebase,
hero-bit clear, monster lists, reverse post-pass), file-local
`reset_region_mids` via a new bones ghostly id map, and all three
JS getlev-class caller wires (stash/save/bones). Diff delivers all
of it. Promise matches deliverable.

## Inventory

- `rest_regions` (`js/region.js:700`, sync per `sym.mjs`) — new export.
- `reset_region_mids` (region.js:664) — new file-local (C staticfn).
- `record_bones_id` / `lookup_bones_id` / `clear_bones_ids` (bones.js)
  — new exports (C `add/lookup/clear_id_mapping` shape, boolean+
  out-param collapsed to value-or-null, same contract).
- `remapMonChainIds` — records old→new id before overwriting
  (C `:400–405` order).
- `getlev_bones` — `clear_bones_ids()` at start (C `:1068`) and end
  (C `:1304`) + `rest_regions(info.regions || [], 0, true)` ghostly.
- `goto_level` (do.js) + `try_restore_save` (save.js) — stash/save
  wires with `elapsed = game.moves - info.omoves`; `omoves` is
  stamped on both stash writes (save.js:483, do.js:1636), so elapsed
  is well-defined on both paths.
- No deleted symbol, no local→import re-point (nothing for the
  `sym.mjs` paste beyond the new-export confirmation above).

## C ↔ JS fidelity

C loci `region.c:798–892` (95 L) + `:927–943` reset_region_mids
(17 L), both read here via `csym.mjs`. Branch-by-branch confirm
(no RNG anywhere in either C body or the JS — nothing to walk):

- `:806` security wipe → `clear_regions()` first ✓.
- `:807–811` ghostly⇒tmstamp 0 else `moves − tmstamp` → `tick =
  ghostly ? 0 : elapsed`, callers pass `moves − omoves` / 0 ✓.
- `:818–829` bounding_box / nrects+rects / attach pair → fresh
  object literal per record (alloc⇔GC), field order kept ✓ (rect
  loop bounded by stored nrects with `{}` fallback).
- `:830–847` enter/leave msgs, length 0 ⇔ NULL → `s.x ? String :
  null` ✓.
- `:860–864` ttl rebase floored at 0 → `ttl > tick ? ttl − tick :
  0`, missing ttl ⇒ −1 ("forever", never 0-dropped) ✓.
- `:871` player_flags then `:872–875` ghostly hero-bit clear →
  same order, live `clear_hero_inside` / `clear_heros_fault`
  (region.js:277/285) ✓.
- `:876–884` n_monst/monsters/**max_monst = n_monst** → JS sets
  `reg.max_monst = nMonst` (C does NOT restore max separately —
  confirmed against the body; the worry was unfounded), null when
  empty ✓.
- `:885–887` visible/glyph/arg → `!!`, `?? null` (numeric⇔tag
  named), `?? 0` passthrough (named) ✓.
- Direct push, never `add_region` — matches C (restore skips its
  block/newsym/hero scan) ✓.
- Post-pass `:879–891` reverse, ttl==0 drop without expire_f hook,
  else ghostly+mids ⇒ reset — exact, including `else if` shape;
  `#ifndef SFCTOOL` is live in the real build, JS always runs it ✓.
- `reset_region_mids`: shrink-in-place with order-doesn't-matter
  swap, `n_monst` updated, max untouched — exact; JS extras (array
  truncation so `mon_in_region` agrees, null guard) are GC-shape
  adaptations, documented in the comment ✓.
- `lookup_bones_id` null-when-unmapped ⇔ C FALSE arm → shrink ✓.
- Callee closure: clear_regions / remove_region / hero-bit clears /
  id-map fns — all LIVE. Binary `save_regions`/`Sfi_*` decode ⇔
  stash-field copy is the named data.md omission (Constitution
  §1.6 JSON architecture), stated in-commit — not a silent stub.
- Caller closure: C's sole caller restore.c:1225 (getlev) splits in
  JS into three restore paths — stash (do.js), save-file (save.js),
  bones (bones.js) — all three wired ✓. Named futures (light.c:543
  / timeout.c:2760 ghostly lookups, lastseentyp, free_region
  teardown) are same-commit named rows, not live-arm stubs.
- Cycle check: region.js ↔ bones.js edges are runtime-only
  function-decl calls; `--can` both directions reports the edges
  already static with no new top-level reads — no TDZ risk.

## Hallucinations / overclaim

D-log's per-arm `:line` cites all check against the read body
(:806, :807–811, :818–829, :830–847, :860–864, :872–875, :876–884,
:885–887, :879–891, reset :928–941 modulo the 927/943 fence —
body text matches). No dispatch-vs-stub overclaim; every deferred
item is named with its owner row.

## Density

95-line C function + 17-line staticfn + id-map + 3 caller wires
across 4 modules (~180 JS insertions). One function family.
Right-sized.

## Verification

- `node scripts/imports.mjs --rulecheck` → Rule #2 clean (whole `js/`).
- Diff added-lines grep: 0 `FORCE`/`DIAG`/`getRngLog`/`fastforward`.
- Re-measured: `hidden-proxy.mjs verify rest_regions --base
  c48fc89f~1 --reach-all` → `0 session(s) blocked` (vacuous-note
  path, honestly labeled — coverage row, no corpus owner) + `smoke
  24/24 PASS, 0 regressed → REACH-OK`. Both summary lines cited;
  no REGRESSED session. Matches the D-log's bullet.

## Actionable C-wrongs

None. Field order, rebase floors, ghostly arms, and all three
restore paths match C.

Verdict: **ACCEPT**
