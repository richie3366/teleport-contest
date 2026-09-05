# Review 820 — 46021314 — invent.c display_inventory → display_pickinv PICK_ONE (D-1850)

## Metadata

- Full / short hash: `4602131484af1b039f072a61fde8ba236a8d5bee` / `46021314`
- Parent: `b08c5dcc` (loop strategy doc). Map-driven Open: 2 corpus owned as `inuse_classify` (`invent.c:116` `/* "Weapons" */`).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-05 10:36:08 +0200
- D-id: **D-1850**
- Stats: `js/invent.js` 140 changed / `js/end.js` + `js/pickup.js` 1 line each. `js/` insertions **~130**. Band **80–350**.
- Claims to close: 2 corpus `inuse_classify` blocks **by reassigning the owner** to `display_inventory`/`display_pickinv_reply` (PICK_ONE stays on non-selector; PICK_NONE bells). Claims 2 corpus PASS.
- JS / map: `display_inventory` / `display_pickinv_reply` / `dismiss_nhw_menu` / `add_menu_heading_attr`. `c-js-map/turns.md`.

## Intent vs deliverable

Git subject promises: `display_inventory` calls `display_pickinv_reply` with `want_reply`; PICK_NONE bells on letters; headings use gameover-aware attr; fullscreen pickinv dismiss keeps status; pickup/end pass TRUE.

`node scripts/csym.mjs display_inventory` → `invent.c:3427–3453`: cmdq_pop KEY fast-path, else `display_pickinv(lets, 0, 0, FALSE, want_reply, 0)`. C `display_pickinv` (`invent.c:3057–~3410`, staticfn) ends `n = select_menu(win, wizid ? PICK_ANY : want_reply ? PICK_ONE : PICK_NONE, …)` (`:3380–3382`); `n == 0` → `pline("%s.", not_carrying_anything)` (`:3140–3143`).

The diff **does** all of it: deletes the bespoke fullscreen/corner paint + `nhgetch` dismiss in `display_inventory`, routes through `display_pickinv_reply(letsArg, null, null, {want_reply})`, adds the PICK_NONE bell arm, gates gacc on `want_reply`, threads `keep_status` dismiss, and updates the two TRUE callers. No unrelated subsystem.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `display_inventory` | LIVE re-point | `:3427–3452` incl. cmdq/lets-`""`≡NULL |
| `display_pickinv_reply` PICK_ONE/PICK_NONE split | LIVE repaired | `wintty.c:1353` + `:1738–1740` below |
| `add_menu_heading_attr` | helper (new, local) | `windows.c add_menu_heading :1815–1828` gameover rule, deduped ×4 |
| `dismiss_nhw_menu(opts)` | LIVE extended | default `null` → old behavior for all other callers |
| `invent_lines` | kept exported | named |
| `inuse_classify` body (D-1589), perm_invent `InvInUse` (D-1600) | OMIT named | not this C-wrong |
| n==0 full-invent `"Not carrying anything appropriate."` vs C `"Not carrying anything."` | OMIT named | string gap disclosed in-commit |

`node scripts/sym.mjs` (re-pointed names):

```
display_inventory js/invent.js:3558   ASYNC — await required
dismiss_nhw_menu js/invent.js:2492   ASYNC — await required
select_menu_pick_none js/invent.js:2519   ASYNC — await required
```

No deleted export, no new clone, no cycle claim. FORCE/DIAG/`getRngLog`/`fastforward`/coords in diff: **none**. Rule #2: clean.

## C ↔ JS fidelity

**PICK_ONE vs PICK_NONE.** C `select_menu(how = want_reply ? PICK_ONE : PICK_NONE)` maps exactly onto JS `want_reply` (default `opts?.want_reply !== false`; `display_inventory` passes `!!want_reply`; `lets ""` ≡ NULL per `:3451–3452` comment). C caller audit: end.c `:592/:638` TRUE (JS `end.js:745` now `true` ✓); `invent.c:2279` TRUE (JS `:1727` true, checks `'\x1b'` ≡ C `'\033'` ✓); `pager.c:1828` TRUE (JS `pager.js:1604` true ✓); `pickup.c:223` TRUE (JS `pickup.js:3060` true ✓); `wizcmds.c:61` FALSE (JS `wizcmds.js:417` bare call → falsy → PICK_NONE ✓). The `invent.c:2986` menumode and `:5655` FALSE paths route through `display_pickinv_reply` directly — unchanged by this commit.

**PICK_NONE bell.** `wintty.c:1738–1740`: `how == PICK_NONE || !strchr(resp, morc)` → `tty_nhbell()`, stay. JS: `if (!want_reply) { tty_nhbell(); continue; }` before gacc/page arms, plus terminal `tty_nhbell()` for PICK_ONE non-resp (same C line). **Match.**

**gacc gate.** `wintty.c:1353`: gacc collected only when `how != PICK_NONE`. JS: `if (want_reply && menu_digit_is_gacc(…))`. **Match.**

**Headings.** `add_menu_heading` gameover→`ATR_NONE` factored once, applied to `invent_lines`, in-use, Miscellaneous, class, Special headings (previously hardcoded `ATR_INVERSE`, which was the gameover bug). Return shape `''`/`'\x1b'`/letter ≡ C `'\0'`/`'\033'`/letter; both value-callers null/ESC-check. **Match.**

**keep_status dismiss.** Previously every pickinv exit blanked committed status; now `dismissPickinv` keeps it with the C rationale (select_menu restores bot state, caller `bot()` repaints; D-0467 blanking stays itemed-only). Behavior change beyond strict C text, but it is the disclosed mechanism fix the two corpus sessions required, and all 44 public sessions still pass.

**Callee closure.** One `display_inventory` family. No STUB in a live arm.

## Hallucinations / overclaim

None. "2 PASS" names both sessions; `inuse_classify` is credited as already-D-1589 rather than claimed. The n==0 string gap is named, not hidden.

## Density

§2b: one owner family (`display_inventory` + its reply loop), +~130/−~129. Did not glue the next Open row. Right size.

## Verification

This audit: `node scripts/hidden-proxy.mjs verify inuse_classify --base 46021314~1` → `2 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS` (`explore-seed0015-valk-level2-pit-dog-wait-49ecd01f` PASS; `explore-seed0700-samurai-explore-descend-b922c948` PASS). Exactly the D-log claim; baseline had 2 blocked, both accounted — not vacuous. D-log also cites green/strict/cohort/full 44/44; cadence re-checks at end of iteration.

## Actionable C-wrongs

None. The shipped behavior contradicts no cited C line; the leftover string gap is a named omit.

Verdict: **ACCEPT**
