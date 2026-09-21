# Review 1690 — addccb0a7 — `questpgr.c` com_pager_core whole body (D-2731)

Metadata: commit `addccb0a7`, D-2731, `js/questpgr.js` only. Coverage row, 0 corpus blocks stated. No prior review claimed closed.

## Intent vs deliverable

Subject promises: array `rn2` angel_cuss/demon_cuss + banished live, rawtext-before-array order, miss → silent FALSE. The diff delivers the function restarted in C order with embedded verbatim tables. Promise matches deliverable.

## Inventory

Changed JS: `com_pager_core` (restarted), `lookup_quest_entry` (array-form + object-form entries), new `QUEST_CUSS_ARRAYS` (14 + 27 strings) and `banished` entry in `QUEST_COMMON`, `quest_portal` to object form, `rn2` import. No deleted symbols, no clones.

## Callee closure

`rn2` verified live sync (`js/rng.js:89`); `--can questpgr.js→rng.js rn2`: `ALREADY: questpgr.js already statically imports rng.js. No new edge needed.` — again better than the message's "new edge" phrasing; zero new module edges. All other callees pre-existing. No STUB in any arm.

## C ↔ JS fidelity

C locus read: `com_pager_core — questpgr.c:468–575` (csym range for the head; message cites `:468–621`), order verified verbatim: skip_pager → nhl_init/load (embedded, cannot fail) → entry+fallback lookup → text → rawtext arm (`rawOut.text=text`, TRUE even when null) → synopsis/output → array `rn2` arm → window-promote → delivery → `convert_line(synopsis)` + `putmsghistory(FALSE)`. Branch checks:

- Entry-miss → silent FALSE: C calls `impossible()` on miss paths; the named rationale (embedded tables cannot fail to load; JS misses also cover unported role bodies where C shows text and never calls impossible) is recorded in the function doc — legitimate named omit, map-tracked.
- Array arm: `nelems<2` → miss ✓; `arr[rn2(nelems)]` (0-based) picks the same element as lua/C `rn2(nelems)+1` (1-based) with one `rn2` draw ✓ — RNG position preserved, which matters: the old code drew zero RNG here, so cuss scrolls now consume one draw exactly as C does.
- Tables verified against pinned upstream `nethack-c/upstream/dat/quest.lua`: angel_cuss 14/14 verbatim in order, demon_cuss 27, banished synopsis/output/text verbatim, quest_portal `output="pline"` (so the removed JS special case is data-driven and identical).
- `howtoput2i` mapping verified against C's table (`HOWTOPUT` names → `[1,2,2,3,0]`, `js/questpgr.js:920`): pline→1, window/text→2, menu→3, default→0 — banished (`text`) lands on the NHW_TEXT + synopsis path as C ✓; unknown names fall back to default→0, matching C's `howtoput2i` default arm.
- Delivery tail (`:570–610`, read verbatim this review): output-0 promote on newline/`BUFSZ-1` length with `[text]` synopsis fabrication (newlines→spaces, C FIXME kept in the helper) ✓; 0/1→pline else window (3→MENU rides `deliver_by_window`, legacy-menu path named) ✓; `convert_line` + `putmsghistory(FALSE)` for ^P recall (C `#else` Strcpy arm — no added brackets) ✓; frees + `nhl_done` correctly GC/no-op ✓.
- Lua-stack adaptations are honest: `void showerror` / miss→silent-FALSE (documented in the function doc with the unported-role-bodies rationale), `nhl_init` load-failure arms dropped (embedded tables cannot fail), `l_selection_push_copy` return-1 ≡ returning the live selection.
- The rawtext arm is already consumed by a live caller (`stinky_nemesis`, `js/questpgr.js:1116`, citing `:148–194` — killed_nemesis text with no display), proving the arm's contract, not just its code.
- Callers: `wizard.c:873/:880` → `js/wizard.js:764/:771` ✓; `quest.c:339` → `js/quest.js:437` ✓ — all pre-wired, no caller missed.
- RNG: exactly one `rn2` added in the C position; none removed/reordered.

## Hallucinations / overclaim

One conservative-direction imprecision: "rn2 via new ./rng.js edge" where `--can` says ALREADY. No FORCE/DIAG/seed/coordinate logic.

## Density

Whole-function restart (149-line C body), one module, zero new edges, tables embedded. Right-sized.

## Verification

Re-measured per-SHA re-run (`--base addccb0a7~1 --reach-all`) — both lines, matching the D-log:

```text
verify com_pager_core: baseline addccb0a7~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify com_pager_core: no corpus session is blocked on it at addccb0a7~1 — a vacuous verify is NOT a corpus PASS. [...]
smoke com_pager_core: no RNG-tagged reach; fixed smoke spread (24 run, 3.7s): 24 PASS, 0 regressed → REACH-OK
```

Vacuous note stated, not sold; smoke REACH-OK. Green/strict/cohort per D-log. Rule #2 clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
