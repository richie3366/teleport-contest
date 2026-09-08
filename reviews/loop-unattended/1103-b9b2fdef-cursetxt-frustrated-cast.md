# Review 1103 — b9b2fdef — mcastu.c cursetxt frustrated-cast feedback (D-2137)

Metadata: SHA `b9b2fdef`, `js/mcastu.js` only (+41/−2 in `js/`).
Queue row fired: Open `objnam.c readobjnam_postparse1` (1 session,
scen-poly-Tourist-92047 step 166). No prior review claimed closed.

## Intent vs deliverable

Subject promises: the `castmu` unable-to-cast arm
(`mcan || mspec_used || !ml`) now calls `cursetxt` instead of
returning silently, restoring the frustrated-cast pline and its
`--More--`. Diff actually adds: module-local `async cursetxt(mtmp,
undirected)`, a `STRANGE_OBJECT = 0` const, extended `const.js`
(`M_AP_TYPE`, `M_AP_OBJECT`) and `display.js` (`pline_mon`,
`Norep`) imports on existing edges, and one `await cursetxt(...)`
line in `castmu`. Promise matches diff; nothing extra.

## Inventory

One new function (`cursetxt`), one new const
(`STRANGE_OBJECT`), one changed function (`castmu`: single added
call + comment). Callees: `canseemon`/`pline_mon`/`Norep` LIVE
(`display.js`), `couldsee` LIVE (`vision.js:1110`), `Monnam` LIVE
(`do_name.js:1149`), `M_AP_TYPE`/`M_AP_OBJECT` LIVE (`const.js`);
`perceives`/`Deaf()`/`is_undirected_spell` are pre-existing
same-module C-cited locals, not new clones. `cursetxt` itself is
correctly module-local — C declares it `staticfn`, so a local port
is the faithful shape, not clone drift.

## C ↔ JS fidelity

Audited against `nethack-c/upstream/src/mcastu.c:62–85` (24 lines,
via `csym`). Branch order is exact: `canseemon && couldsee(mx,my)`
→ `undirected` first → `Invis && !perceives && mux|muy-shifted`
`||` hero-mimic `||` `uundetected` → `Displaced && shifted` → else.
The blind arm keeps C's short-circuit, which is the load-bearing
property here (the Tourist-92047 session syncs on the blind-arm
`rn2(4)`):

```c
} else if ((!(svm.moves % 4) || !rn2(4))) {
```

```js
} else if (!(((game.moves || 0) % 4)) || !rn2(4)) {
```

Same gate, same short-circuit: `moves % 4 == 0` skips the draw,
otherwise `rn2(4)` burns exactly when C burns it. `pline_mon(mtmp,
"%s points %s.")` format matches; `Deaf` gate + `Norep` match.
Hero-mimic expansion verified against the macro
(`monst.h:243–244`):

```c
#define is_obj_mappear(mon,otyp) (M_AP_TYPE(mon) == M_AP_OBJECT \
                                  && (mon)->mappearance == (otyp))
```

JS (`mcastu.js:793–794`) tests exactly `M_AP_TYPE(game.youmonst)
=== M_AP_OBJECT && mappearance === STRANGE_OBJECT` with
`STRANGE_OBJECT = 0` per `objects.h`. Call site matches C `:177`
(verified via `csym --callers`: refs at `:38` decl, `:177`
castmu, `:997` buzzmu). `buzzmu`'s `:997` call stays a named
omission in the map — whole zap path deferred, an acceptable arm
split. The untouched `m_seenres` 4th disjunct is out of cluster.

## Hallucinations / overclaim

None. D-log correctly labels the queue owner a topline-literal
misattribution and names the re-attribution (`do_statusline2`,
same step, topline+More now matching both sides); no "Match C"
claim beyond the ported arm. No dispatch-with-stubbed-callee —
every callee in the new arm is live or a pre-existing cited local.

## Density

One C function, one JS module, 41 insertions. Right-sized per
§2b (one falsifier, one C locus family, one module).

## Verification

D-log Verify bullet shows `verify.mjs --fn cursetxt` → PROGRESS
+ green 2/2 + strict ×2 + cohort 7/7. Re-measured myself:
`hidden-proxy verify cursetxt --base b9b2fdef~1` → `0 PASS, 1
moved past, 0 unchanged, 0 worse → PROGRESS` (Tourist-92047
cursetxt@166 → fig_transform@169). Claim true; no vacuous check
(the bullet names the moved-past session and its new owner).
Added-code grep: no FORCE/DIAG/RNG-log/seed/coordinate gates.
`imports.mjs --rulecheck` → Rule #2 clean (run once, covers all
of scored `js/`).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
