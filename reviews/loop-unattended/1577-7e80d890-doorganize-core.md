# Review 1577 — 7e80d890 — invent.c doorganize_core whole-body restart (D-2618)

**Metadata:** SHA `7e80d890`, `invent.c` `doorganize_core`, D-2618.
JS: `js/invent.js` (+141/−102: restart + `is_c_letter` + `Your` import).

## Intent vs deliverable

Subject promises: whole-body restart in C order — first-predecessor split
detect, floating truncate, C `letter()`, `Your` pack-full, `obj`/`bumped`
nobj head-link. Diff actually adds: the restarted `doorganize_core`
(`js/invent.js:9129`), file-local `is_c_letter` (`:9108`), one `Your`
binding on the existing display.js import. Promise matches deliverable.
(The `:9101` hunk touches only the doc comment + new helper; neighboring
`display_used_invlets` body unchanged — no unaccounted scope.)

## Inventory

- `doorganize_core(obj)` — restarted body with per-arm `:line` cites.
- `is_c_letter(ch)` (new file-local) — C `letter()` clone.
- No deleted symbol, no local→import re-point (nothing to `sym.mjs`).

## C ↔ JS fidelity

C locus `invent.c:5067–5286` (220 L, via `csym.mjs doorganize_core`;
callers `:5003`, `:5064` via `--callers`). Full C body read here.
Arm-by-arm confirm:

- Split detect (`:5092–5096`): break at the FIRST `otmp->nobj == obj`
  predecessor, `splitting` only on invlet match — JS identical (the old
  invlet-gated break was the C-wrong; fixed).
- `lets[]` layout (`:5101–5113`): 54-slot array ($ + a-zA-Z + overflow;
  C's 55th is the NUL) with overflow index `1 + INVLET_BASIC` both sides;
  `GOLD_SYM_ADJ`/`NOINVSYM` consts verified `$`/`#`. Floating truncate
  (`:5109–5110`): C writes one NUL at `ix + (splitting?1:2)`; JS
  `slice(0, nlet + (splitting?1:2))` — identical visible string, and
  past-truncation blank writes are dropped by the length guard exactly as
  C's NUL hides them.
- Blanking (`:5114–5129`, skip-self + mergable, NOINVSYM→overflow on),
  blank-compact + `cur > 5 → compactify` (`:5131–5136`, filter-join with
  `length > 5` ≡ cur) — exact.
- Prompt loop (`:5138–5177`): `Split ${quan}` vs `Adjust letter` + `(?
  see used letters)` (C `gi.invent ? …` — obj's own membership guarantees
  non-emptiness both sides, so no empty-array divergence here);
  `yn_function` with default 4th-arg `addcmdq=true` = C TRUE (signature
  verified `js/getline.js:1589`); `?`/`*` → `display_used_invlets`,
  ESC `\x1b`, quitchars + split-to-same-slot → noadjust, gold-only `$`,
  `letter()`-minus-`@` / lets-minus-`-` gate, 5-tries give-up — exact.
- `is_c_letter` verified against C `hacklib.c:69–71` (`'@'..'Z'` incl.
  `[\]^_` + `'a'..'z'`): ranges identical. The old `/[a-zA-Z]/` was the
  C-wrong; fixed.
- Collect/merge/swap/split arms (`:5194–5259`) via the pre-existing
  `names_ok_for_adjust_merge`/`invent_merged` wrappers (bodies untouched
  here), `Your('pack is too full.')` via the new live binding, bumped
  occupant — exact.
- Inline head-insert (`:5261–5277`): `obj.invlet = let_`, `obj/bumped.nobj`
  linked onto the head before unshift — the missing head-link C-wrong,
  fixed. Tail `prinv`/`Moving:`/`clear_splitobjs`/`update_inventory`/
  `ECMD_OK` (`:5279–5285`) — exact (via the pre-existing `prinv_adjust`
  wrapper).
- `noadjust`'s `unsplitobj(obj)` vs C `:5159` `merged(&splitting, &obj)`:
  **pre-existing** (parent line 9154, untouched by this diff) — noted,
  not this SHA's deliverable, no queue from this review.

RNG: none in C or JS. Callers: both wired — `js/invent.js:9406`
(`doorganize` ← `:5003`), `:9379` (`adjust_split` ← `:5064`).
Callee closure: `Your` newly live (same display.js edge);
`mergable`/`merged`/`unsplitobj`/`clear_splitobjs` (mkobj.js),
`inv_cnt` (steal.js), `assigninvlet` (u_init.js), `prinv` (display.js),
`yn_function`, `compactify_invlets`, `reorder_invent_adjust`,
`extract_invent` all live or pre-existing file-locals per the in-code map.
No stub, no silent omit; "Named: none new" accurate.

## Hallucinations / overclaim

No dispatch/stub split. "Coverage row" framing accurate (0 blocked,
re-measured). The `quitchars`/`QUITCHARS` "verified identical" claim is
consistent with the untouched line in context.

## Density

One C function (220 L), one JS module + helper + import word.
Right-sized.

## Verification

- `node scripts/imports.mjs --rulecheck` → Rule #2 clean (whole `js/`).
- Diff grep: 0 `FORCE`/`DIAG`/`getRngLog`/`fastforward` in added lines.
- Re-measured: `hidden-proxy.mjs verify doorganize_core --base
  7e80d890~1 --reach-all` → `0 session(s) blocked` at baseline and
  working tree (vacuous-note path, correctly framed — the D-log claims
  smoke REACH-OK, not a corpus PASS) + `smoke 24/24 PASS, 0 regressed →
  REACH-OK`. Both summary lines cited; matches D-log.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
