# Review 1136 — 4a0daf23 — hack.c domove_bump_mon m-prefix bump (D-2170)

Metadata: SHA `4a0daf23`, js/ +35/−2 in `cmd.js` only (+ map row).
D-log D-2170. Subject promises: m-prefix bump onto monsters printed
swap/attack instead of Pardon/move-right-into (2 sessions PASS).

Intent vs deliverable: promise matches diff. Actually adds: new
exported async `domove_bump_mon(mtmp, glyph)` + call site in `domove`
before `do_attack` + 3 import edits. No scope creep.

Inventory: one new function (C home `hack.c`, non-static; same-module
placement as `domove` mirrors C, like `domove_fight_empty`). Callee
closure — all LIVE: `canspotmon` → `js/display.js:1236` sync,
`glyph_at` → `:812` sync, `glyph_is_warning` → `:822` sync,
`sensemon` (pre-existing edge), `stumble_onto_mimic` →
`js/uhitm.js:3134` ASYNC (awaited; joins existing edge),
`m_monnam` → `js/do_name.js:728` sync, `mon_nam` (same edge),
`Hallucination` (same edge — see debt below).
`glyph_is_invisible_id` is the pre-existing house glyph-id
equivalent of C `glyph_is_invisible`; `M_AP_TYPE`/`sensemon` were
already imported. No deleted/re-pointed symbols. New static cycle
cmd.js ⇄ do_name.js (do_name.js:26 imports cmdq_* from cmd.js) lands
inside the existing 82-module SCC; all three names are hoisted
function declarations used only at call time — no top-level TDZ
read. `--can` on both edges → ALREADY (post-commit tree).

**C ↔ JS fidelity**: confirm against pinned C (`hack.c:1925–1948`
body + `:2785–2796` call site, read at HEAD). Branch order exact:

```c
if (nopick && !travel && (canspotmon || glyph_is_invisible
        || glyph_is_warning)) {
    if (M_AP_TYPE && !Protection_from_shape_changers && !sensemon)
        stumble_onto_mimic(mtmp);
    else if (mpeaceful && !Hallucination)
        pline("Pardon me, %s.", m_monnam(mtmp));
    else
        You("move right into %s.", mon_nam(mtmp));
    return TRUE;
}
return FALSE;
```

JS matches gate-for-gate (Protection as inline H/E/base — the
display.js helper shape; `You()` as house `await pline`). Call site
matches C `:2794` (after the nomul line, before attack dispatch,
`glyph` recomputed from `glyph_at(newx, newy)` — C `:2785` shape, no
display writes between, so recompute is identical). The
`!is_safemon||forcefight nomul(0)` line ahead is named as a
pre-existing gap — benign on this path (a direct m-keypress has
multi=0). The arm is draw-free and wastes the turn, skipping the
spurious safemon `rn2(7)` (`uhitm.js:3260`) — predicts both PASS
sessions' RNG-first diffs exactly. One gap in new code: the
`!Hallucination()` gate imports the do_name.js predicate (`:252`),
which short-circuits true on the sticky flat `u.Hallucination` and
ignores the `uprops[HALLUC]` store — while the D-1493-vetted
timeout-only predicate is `display.js:963` ("sticky not sufficient").
Narrow (needs stale-sticky or uprops-only Hallucination + m-bump +
peaceful), zero corpus effect (2 PASS), but a C-wrong in new code,
not a named omit — hence the debt verdict, fixable in one line.

Hallucinations / overclaim: none — exemplary. D-log explicitly
marks `verify.mjs --fn domove_bump_mon` hidden as vacuous (no session
blocked on it at HEAD) and proves via `verify distfleeck` instead;
residuals are individually attributed (Priest same-step
re-attribution with RNG 2900/2900 matched; 3 unchanged with named
other writers per the distfleeck park).

Density: ~35 insertions for 23 lines of C + wiring — right-sized.

Verification: re-measured `hidden-proxy.mjs verify distfleeck --base
4a0daf23~1` → baseline 6 blocked, `2 PASS, 1 moved past (same-step
re-attribution), 3 unchanged, 0 worse → PROGRESS` (Caveman-92053 +
Healer-92218 PASS; Priest-91120 → were_change@108). Matches the
D-log exactly. Full `sessions` 44/44 per D-log (domove high-traffic;
cited as observed, not re-run here). `rulecheck` clean; zero
banned-pattern hits.

**Actionable C-wrongs**:

1. `domove_bump_mon` gates the peaceful arm on `Hallucination()`
   from `do_name.js:252` (sticky-flat short-circuit) instead of the
   C-faithful timeout-only `display.js:963` (D-1493). One-line fix
   for a port iter: import `Hallucination` from `./display.js`
   (edge already exists) instead of `./do_name.js`; name the debt
   in the turns.md domove line until shipped.

Verdict: **ACCEPT-WITH-DEBT**
