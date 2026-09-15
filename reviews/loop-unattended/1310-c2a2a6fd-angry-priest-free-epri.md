# Review 1310 — c2a2a6fd — angry_priest + free_epri (D-2344)

Metadata: SHA `c2a2a6fd`, D-2344, C-fidelity residual (queue row cited 0 blocks; closes review 1309's `angry_priest` OMIT). Method: full `js/` hunks read (`priest.js` +50, `pray.js` 3 sites, `dig.js` 1 site); C `angry_priest priest.c:876-911` + `free_epri :27-35` bodies plus all 4 C call sites (`dig.c:429`, `pray.c:1685/:1722/:1736`) and their contexts (via `csym.mjs`/read); `sym.mjs` on `wakeup`/`setmangry`/`newemin`/`altar_wrath`/`EPRI`/`EMIN`; `imports.mjs --can` ×3 (all ALREADY); added-lines banned grep (0 hits); `--rulecheck` clean (iteration run); `hidden-proxy verify angry_priest --base c2a2a6fd~1` re-run.

## Intent vs deliverable

Subject promises `free_epri` + `angry_priest` in C order with all four C call sites wired (dig down-dig, conversion glow, stain, vanish). Diff delivers exactly that: 2 priest.js exports + 3 pray.js `await angry_priest()` (replacing `/* named */` comments, no clone deleted) + dig.js gated site. Promise kept exactly.

## Inventory

- `priest.js`: exported `free_epri` (sync) + exported async `angry_priest`; imports `AM_MASK` (const), `newemin` (makemon), `wakeup`/`setmangry` (mon) — all existing edges, no new modules.
- `pray.js`: `angry_priest` joins the existing priest import; docstrings retire the named omits.
- `dig.js`: down-dig `IS_ALTAR` gate → dynamic-import `altar_wrath` + `angry_priest` (file idiom); docstring retires two of four omits.

## C ↔ JS fidelity

`free_epri` statement-for-statement vs `:27-35` (slot-null + `ispriest=0`, with null-safety C doesn't need). `angry_priest` in C order vs `:876-911`: findpriest/temple_occupied early-return → eprip capture → wakeup+setmangry → shrpos-cell read → `!IS_ALTAR || Amask2align(mask & AM_MASK) != shralign` (AM_SHRINE deliberately unstripped, matching C) → newemin-if-missing → ispriest=0/isminion=1 → min_align from the pre-free epri ref → renegade=false → free_epri. No RNG or display on either side before or inside.

Callee closure, all LIVE: `wakeup`/`setmangry` (`mon.js`, async, awaited), `newemin` (`makemon.js:239`, keeps pre-existing emin object identity and `parentmid`), `altar_wrath` (single canonical export `pray.js:970`, async — no dig.js clone ever existed), `EPRI`/`EMIN` (`const.js:3131-3132`, mextra slots). `renegade=false` matches all readers (truthiness; `do_name.js:792`). C's `assert(has_emin)` has no JS counterpart (allocation cannot fail) — correctly absent, not an omit.

Call-site audit (4/4 C sites, each in C position): conversion glow with the `pri && !p_coaligned` guard (`:1685`) ✓; stain arm after newsym (`:1722`) ✓; vanish arm after newsym (`:1736`) ✓; dig `IS_ALTAR(lev.typ) → altar_wrath(dpx,dpy) → angry_priest()` (`dig.c:427-430`) ✓. This closes 1309's OMIT as promised.

Companion details confirmed while auditing (no action):
- `newemin` (`makemon.js:239`) creates the slot with `parentmid = m_id` only when absent (identity kept on pre-existing emin, as claimed).
- C's `assert(has_emin)` has no JS counterpart because allocation cannot fail — correctly absent, not omitted.
- `EPRI`/`EMIN` are pure mextra accessors (`const.js:3131-3132`).
- `renegade=false` matches every reader (`do_name.js:792` truthiness; sibling writers already mix `false`/`0`/`1`).
- `eprip?.shrpos` is unreachable-defensive (ispriest ⟹ epri), identical whenever epri exists.
- Early return precedes all RNG/display (`findpriest`/`temple_occupied` are pure scans).

Adjacent stain/vanish writes (pre-existing context, re-read because the new calls sit inside them):
- Stain: `altarmask = AM_CHAOTIC` (≡ C) plus the JS-rep `flags` mirror.
- Vanish: `typ = ROOM` + `altarmask = 0` + flags mirror (≡ C `:1731-1733`).
- Both keep pline → mask → newsym → `angry_priest()` order; the high-altar `desecrate_altar` guard above is untouched.

## Hallucinations / overclaim

None. "No draws in this function on either side" verified against both bodies. `eprip?.` optional chains are unreachable-defensive (ispriest ⟹ epri), not behavior.

## Density

One C function + its four call sites, one envelope. Good.

## Verification

D-log tail PASS (forced `--full` 44/44, after last `js/` edit) with the hidden bullet honestly vacuous. Re-measured:

```text
verify angry_priest: baseline c2a2a6fd~1 — 0 session(s) blocked (0 at baseline, 0 working)
```

Matches (vacuous note, no `--base` owed). Banned grep 0 hits; `--rulecheck` clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
