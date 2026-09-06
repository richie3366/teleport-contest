# Review 932 — 5e47ff6a — region.c inside_rect/inside_region rect-containment predicates singleton (D-1962)

Metadata: SHA `5e47ff6a`, D-1962, `js/region.js` only (+26/−8).
Reviewer re-ran the C bodies, C callers, sym on both new symbols +
`region_bounding_box`, Rule #2, banned grep, and `hidden-proxy
verify --base`.

Intent vs deliverable: subject promises exported `inside_rect` in C
order plus `inside_region` promoted to exported and rewired to C
shape (null guard + bounding-box early-out + per-rect loop). Diff
actually adds exactly that: one new export, one function made
exported with the guard added and the inline containment replaced by
`inside_rect` calls. Promise kept.

Inventory: one new function (`inside_rect`, `js/region.js:173`,
sync per `sym.mjs`). One promoted symbol (`inside_region`,
`:187`, sync). One reused helper: `region_bounding_box`
(`js/region.js:739`, LOCAL clone per `sym.mjs`, pre-existing,
same-module, hoisted — no new import edge). No deleted symbols.

C ↔ JS fidelity — against `region.c:53–57` and `:62–73` (via
`csym.mjs`), exact:

- `x >= r->lx && x <= r->hx && y >= r->ly && y <= r->hy` →
  identical with `| 0` int idiom on all four comparisons.
- `if (reg == 0 || !inside_rect(&bounding_box, x, y)) return
  FALSE;` → `if (!reg || !inside_rect(...)) return false;` —
  short-circuit order preserved, so the box is never read on null
  reg (old JS threw on null; now C FALSE).
- `for (i = 0; i < nrects; i++) if (inside_rect(&rects[i], x,
  y)) return TRUE;` → indexed loop over `rects.length` calling
  `inside_rect` per rect. `nrects` has no JS analogue (regs carry
  `rects` only); length-iteration is the faithful equivalent.
- Box source `reg.bounding_box ?? region_bounding_box(reg)`: C
  reads the stored box (`create_region`); JS prefers a stored box
  when present, else recomputes. The stored-field gap is the named
  `create_region` omit in this commit — correctly map debt, not a
  C-wrong.

No RNG either side. C callers of `inside_rect` are only the two
lines inside `inside_region` (`:67`, `:70` via `--callers`); no
caller rewiring owed. Same-module change, no new edge, no TDZ
read.

Hallucinations / overclaim: none. D-log's clone description, edge
claim, and null-guard note all verified. No dispatch-over-stub
shape (leaf predicates).

Density: §2b right size — one predicate pair, one module. OK.

Verification: D-log Verify shows preflight PASS, `verify.mjs --fn
inside_rect` → PASS syntax/rule2/green/strict/cohort, an explicitly
vacuous hidden note (row cited 0 blocks, no corpus-PASS claim),
plus an 8-case inline probe (edges, null-reg, empty-rects,
stored-box) PROBE PASS. Reviewer re-measured: `hidden-proxy
verify inside_rect --base 5e47ff6a~1` → "0 session(s) blocked (0
at baseline, 0 in working scoreboard)". Honest. Diff-body banned
grep clean (only hit is the D-log prose line); Rule #2 clean.

Actionable C-wrongs: none.

Verdict: **ACCEPT**
