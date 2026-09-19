# Review 1471 — 3322beff — options.c menu-colors submenu trio (D-2512)

Metadata: SHA `3322beff`, `js/options.js` only (+ `scripts/menu-colors-submenu.test.mjs`, docs). Closes review-1465 Must-fix. NN 1471.

## Intent vs deliverable

Subject promises three C-wrongs in the menu-colors submenu plumbing, invisible to the fortress (0 blocked, RNG 0, interactive-only): (1) empty-menu exit index, (2) list suffix bytes, (3) PICK_ANY finish-empty vs ESC. Diff actually adds: reorder of `a_int++` before the skip in `handle_add_list_remove`, suffix template fix in `handler_menu_colors`, `{ cancelValue }` option on `select_menu_pick_any` + its use in the remove arm. Matches the promise; no scope creep (6 other `select_menu_pick_any` callers keep default `[]`).

## Inventory

Changed JS: `handle_add_list_remove` (reorder), `handler_menu_colors` remove/list arms (suffix + pick handling), `select_menu_pick_any` (optional cancelValue). New: `scripts/menu-colors-submenu.test.mjs` (3 headless key-scripted tests; not scored `js/`).

## C ↔ JS fidelity

Checked against pinned C `options.c:9207–9251` (`csym` range) and `options.c:6406–6499`, suffix lines `:6466–6468` + tail `:6495–6498`.

1. Empty-menu exit: C `:9227` `any.a_int++` precedes `:9229–9230` the `if (!numtotal && (i==1||i==2)) continue`. With empty menu only rows 0 (a_int 1) and 3 (a_int 4) are added, so picking `x` yields `pick_list[0].a_int - 1 = 3` (done). Old JS incremented after the skip → exit carried 2 → 1 (list arm). New JS increments before the skip → 4 → 3. Branch-exact.
2. List suffix: C `Sprintf(buf, "\"\\\"=%s%s%s", …)` makes buf = `"` `\` `"` `=color[&attr]`, then `Strcat(mcbuf, &buf[1])` skips the initial quote, so the painted suffix is `\` `"` `=color…` with no trailing quote. New JS `` `"\\\"=…` `` (no trailing quote) is byte-equal; verified by template eval quoted in the message. Old JS had backslash-equals plus a trailing quote — wrong on both ends. Branch-exact.
3. Remove arm: C tail is `if (pick_cnt >= 0) goto menucolors_again`, so finish-empty (0) re-loops and only ESC (-1) returns. New JS `null → return`, `[] → continue` matches. The shared-helper change is safe: ESC arm returns `opts.cancelValue` only when the key is present, else `[]` as before.

Callee closure: no new C callees; `free_one_menu_coloring`, `select_menu_pick_none/any` all LIVE. No clones, no stubs, no FORCE/DIAG/coords/seeds in the diff. `imports.mjs --rulecheck` clean.

## Evidence detail

C `handle_add_list_remove` (`options.c:9207–9251`): the `any.a_int++` at `:9227` precedes the `:9229–9230` skip, and the tail is `pick_cnt > 0 → opt_idx = pick_list[0].a_int - 1` else `opt_idx = 3`. So with an empty menu the exit row carries a_int 4 → 3 (done), never 1. The old JS (increment after skip) produced 2 → 1 (list) — the false comment it carried ("exit-with-empty returns 1 like C") is corrected in this diff.

C suffix (`:6466–6468`): `Sprintf(buf, "\"\\\"=%s%s%s", …)` then `Strcat(mcbuf, &buf[1])`. Byte walk: buf = `"` `\` `"` `=color[&attr]`; `&buf[1]` drops the leading quote, so the painted suffix is `\` `"` `=color…` with no trailing quote. New JS `` `"\\\"=…` `` (no trailing backtick-quote) reproduces exactly those bytes; the D-log's node template-eval proof (`"PAT\"=bright-green&bold"` both sides) is consistent with this walk.

C remove tail: `if (pick_cnt >= 0) goto menucolors_again` — only −1 (ESC) returns. `sym`: `select_menu_pick_any js/options.js:2251 ASYNC`. The `{ cancelValue }` default (`[]`) preserves all 6 other callers; only the remove arm passes `{ cancelValue: null }`.

Test: `scripts/menu-colors-submenu.test.mjs` ran this session — fail 0 (3/3 headless key-scripted: empty+`x` single-key exit, remove+Enter-empty re-loop with exact key consumption, remove+ESC intact exit). The D-log additionally records a pre-fix stash check (remove-arm test "Missing expected rejection"; empty+`x` threw Input-queue-empty via the list-arm detour), so the test is proven to discriminate rather than vacuously pass.
No `js/` behavior beyond the submenu changes: the `{ cancelValue }` default keeps the other 6 `select_menu_pick_any` callers on byte-identical paths, and the full-44 re-run in the D-log confirms no fortress movement.
Density note: three one-line-class C-wrongs plus a regression test in one module — a Must-fix done at the right size, not three separate iterations.

## Hallucinations / overclaim

None. "0 blocked" and "reach smoke 24/24" reproduce exactly (see Verification). Named omits (C `pick_cnt>1` arm; list-arm PICK_NONE ESC returning void → re-loop) are pre-existing helper limits outside the trio, named in the message — not silent. Neither is reachable from the corpus (0 blocked, RNG 0 — options UI only), so both are map debt rather than Must-fix by the queue's own evidence rule. The `handle_add_list_remove` header comment now documents the corrected a_int semantics (`:9227` pre-skip increment, exit-with-empty carries 4 → 3), replacing the false "returns 1 like C" note.

## Density

Right-sized Must-fix: three one-line-class C-wrongs in one submenu family, one module, plus a regression test. Not padding, not a second subsystem.

## Verification

- Re-ran `hidden-proxy.mjs verify handler_menu_colors --base 3322beff~1 --reach-all`: 0 blocked at baseline and working scoreboard (vacuous note, correctly presented as such, not as a corpus PASS) + fixed smoke spread 24/24 PASS, 0 regressed → REACH-OK. Matches the D-log.
- `scripts/menu-colors-submenu.test.mjs`: fail 0 (this session).
- D-log cites green 2/2, strict ×2, cohort 7/7, full 44/44 (shared file) — plausible for an interactive-only path; the headless test is the real evidence here and it passes.

## Actionable C-wrongs

None. The two named items are pre-existing helper-scope limits, map-named, not Must-fix.

Verdict: **ACCEPT**
