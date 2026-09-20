# Review 1567 — dba7a580 — display.c wall_angle whole-body completion (D-2608)

**Metadata:** SHA `dba7a580`, `display.c` `wall_angle` + `t_warn`, D-2608.
JS: `js/display.js` only (+197/−110, mostly cites). No new imports.
Named: six `impossible` diagnostic reports (cite-only).

## Intent vs deliverable

Subject promises: C-order restart with cites, live `t_warn`, SDOOR
arboreal arm, C caller wired. Diff actually adds: cited restart of the
whole `:3511–3787` block, new live `t_warn` called at both C sites,
new SDOOR `arboreal_sdoor → S_TREE_CMAP` arm, `do_twall(lev)` scope
threading. The return-value logic lines are otherwise unchanged —
this is a completion + citation pass, honestly framed as such.

## Inventory

- `t_warn(lev)` (new, live) — C `:3452–3498` typ→name switch; the
  `impossible` report stays a `// C:` cite.
- SDOOR arm: `if (lev.arboreal_sdoor) return S_TREE_CMAP`.
- `do_twall` takes `lev` for the two `t_warn` sites (`:3548`, `:3563`).
- Per-arm `:line` cites across wall/matrix/cross/crwall helpers.

## C ↔ JS fidelity

C loci read via `csym.mjs` (`t_warn` `:3452–3498`, 47 L) and direct
reads (`:3540–3570`, `:3595–3610`, caller `:2295–2330`). Confirm:

- `t_warn` switch (TUWALL/TLWALL/TRWALL/TDWALL, VWALL, HWALL, four
  corners, default "unknown"): exact. Returns the name for debuggers;
  C is void and callers ignore it — no behavior change. The
  `impossible(warn_str, ...)` report is cite-only because JS
  `impossible()` is ASYNC (`js/display.js:8055`, `sym.mjs` confirmed)
  and `wall_angle` is a sync hot path — same convention as
  `display_warning`'s `// C: impossible(...)`. Named, zero screen
  effect on reachable states.
- Warn sites exact: `else { t_warn(lev); col = T_STONE; }` (`:3548–3550`)
  and `if (!only_sv(seenv, SV0|SV1|SV2)) t_warn(lev)` (`:3563`, with the
  "only SV0|SV1|SV2" comment). `do_twall(lev, ...)` threading matches C
  scope (C `t_warn(lev)` takes the map cell).
- SDOOR arm exact vs C `:3599–3607` (arboreal → `S_tree`, horizontal →
  horiz, else fallthrough to VWALL). `S_tree` ≡ cmap 18 verified in
  `js/generated/glyphsyms_data.js:42`; `S_TREE_CMAP` already module-local.
- Caller closure: sole C caller `back_to_glyph` `:2322`
  (`ptr->seenv ? wall_angle(ptr) : S_stone`, arboreal-SDOOR guard at
  `:2305`) → JS `back_to_glyph` mirrors guard + call; the new
  in-`wall_angle` arm double-covers that path (same result) and covers
  the JS-only `wall_glyph` caller (`:3316`, unguarded, same result as
  C's guard-then-call). Correct.
- Unchanged logic lines (matrices, rotations, corner/cross chains) are
  cite-only additions — diff shows no altered predicates. The six
  `impossible` defaults are cite-only + stone returns, as C's
  unreachable arms require.
- No RNG in the function (RNG-0 display path, both sides).

Doc nit (not code): the D-log writes "`t_warn` (`:3079`)" — wrong
number; the true locus is `:3452–3498` (csym range, and the code
comment cites it correctly).

## Hallucinations / overclaim

None material. "Two C items were genuinely absent" verified true (no
`t_warn` symbol, no arboreal arm pre-commit). The `:3079` typo is a
D-log line-number slip, not a fidelity claim.

## Density

One C staticfn block + its diagnostic callee, one JS module. The
bulk is citations on pre-existing logic — appropriate for a
"completion" that proves the existing arms rather than rewriting them.

## Verification

- `node scripts/imports.mjs --rulecheck` → Rule #2 clean (no new imports).
- Diff grep: 0 FORCE/DIAG/getRngLog/fastforward hits.
- D-log Verify claims PASS + full 44/44 (shared file) + smoke
  REACH-OK. Re-measured: `hidden-proxy.mjs verify wall_angle
  --base dba7a580~1 --reach-all` → 0 blocked at baseline and working
  tree (vacuous-note path, correctly framed — RNG-0 function) +
  `smoke 24/24 PASS, 0 regressed → REACH-OK`. Confirmed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
