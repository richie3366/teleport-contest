# Review 1663 — 1e6811b7 — `weapon.c` add_skills_to_menu restart + show_skills (D-2704)

Metadata: commit `1e6811b7`, D-2704, `js/weapon.js` only (~30 net lines + new export). Pops the head Open-coverage row (PARTIAL). No prior review claimed closed.

## Intent vs deliverable

Subject promises: whole-body restart of `add_skills_to_menu` + `show_skills`. Diff actually restarts the body (pass loop, tab arms, gameover heading, single `skill_level_name`) and adds the `show_skills` export. Promise matches deliverable.

## Inventory

Changed JS: `add_skills_to_menu` restarted in place (same signature/contract), `show_skills` new export (`js/weapon.js:1595`, async). One import name added (`ATR_NONE`, existing terminal.js edge). No deleted/re-pointed symbols. Helpers (`can_advance` same-file `:974`, `peaked_skill` same-file clone, `practice_needed_to_advance` same-file, `wizardMode` file-local clone) all pre-existing and reused — no new clones, no stubs.

## Callee closure

Required `sym.mjs` outputs pasted verbatim (no symbol deleted or
re-pointed — `show_skills` is an addition, the restart is in place):

```text
show_skills      js/weapon.js:1595   ASYNC — await required
can_advance      js/weapon.js:974   sync
wizardMode       NOT EXPORTED — but 4 LOCAL CLONE(S) in 4 file(s):
               js/getline.js:1122  js/insight.js:157  js/readobjnam.js:127  js/weapon.js:959
practice_needed_to_advance NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/weapon.js:1299
peaked_skill     NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/weapon.js:996
```

| JS callee | Class |
|---|---|
| `can_advance` / `could_advance` / `skill_level_name` / `P_NAME` / `P_RESTRICTED` / `P_SKILL` / `P_ADVANCE` | LIVE or pre-existing same-file (all reused, none added here) |
| `peaked_skill` / `practice_needed_to_advance` | pre-existing same-file locals (single clones, reused) |
| `wizardMode` | pre-existing file-local clone (1 of 4 tree-wide; reads the C `wizard` flag; reused) |
| `select_menu_pick_none` | LIVE (PICK_NONE path) |

No new clones, no STUB in any live arm. The `skill: i` + `selectable`
contract for C's `any.a_int = i + 1` is pre-existing (enhance consumer at
`:1166` unchanged) — this restart preserves it byte-for-byte on the
default path.

## C ↔ JS fidelity

C loci: `add_skills_to_menu` `weapon.c:1226–1302` (csym, 77 L) + `show_skills :1305–1318` (csym, 14 L), both whole bodies read. Callers: `:1314` → new export; `:1380` `enhance_weapon_skill` → pre-existing JS `:1166`, unchanged ✓; `show_skills`'s caller `end.c:602` stays DUMPLOG-retired (D-1776, correctly not wired).

- Longest-name scan over unrestricted skills ✓; pass-indexed `SIZE` loop ✓; heading before the `P_RESTRICTED` skip ✓ — the exact defect class the old `for (const range…)` port had, now fixed.
- Heading attr: C `add_menu_heading` (`windows.c:1815–1828`, range read) uses `menu_headings.attr` normally, ATR_NONE when gameover. JS keeps the tree's ATR_INVERSE heading convention and adds the gameover→ATR_NONE gate. Confirm (the unported `menu_headings` customization is tree-wide, not this row's scope).
- Prefix order and literals exact ✓; `skill_level_name` once per row ✓.
- All four Snprintf arms verified format-for-format: `%-*s`→`padEnd(longest)`, `%-12s`→`padEnd(12)`, `%5d(%4d)`→`padStart(5)/(4)` (C prints full width on overflow; `padStart` agrees), tab arms with literal `\t` ✓.
- `any.a_int = … ? i+1 : 0` → `skill: i` + `selectable` flag; the enhance pick-back contract is pre-existing and unchanged by this commit ✓.
- `show_skills`: pline + FALSE/FALSE + empty end_menu + PICK_NONE → `select_menu_pick_none`; lifecycle in helper (enhance precedent). Exact ✓.

## Hallucinations / overclaim

None. "Byte-identical by construction" is scoped to the default path (tabsep false, non-gameover) — the only path the old port covered — and the mechanism (same literals, same padding) supports it.

## Density

Breadth phase: one C-function restart + one small caller, ~30 net lines, one module. Right-sized (restart, not greenfield).

## Verification

Full verify transcript (both summary lines cited):

```text
verify add_skills_to_menu: baseline 1e6811b7~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify add_skills_to_menu: no corpus session is blocked on it at 1e6811b7~1 — a vacuous verify is NOT a corpus PASS. [...]
smoke add_skills_to_menu: no RNG-tagged reach; fixed smoke spread (24 run, 24 PASS, 0 regressed → REACH-OK
```

0-blocked vacuous + REACH-OK, as disclosed. No REGRESSED. RNG 0 both
sides. Format-arm audit: `%-*s`→`padEnd(longest)`, `%-12s`→`padEnd(12)`,
`%5d(%4d)`→`padStart(5)/(4)` — and C prints full width on overflow, which
`padStart` reproduces (no truncation either side). The old defects (tab
arms absent, double `skill_level_name`, hardcoded heading attr) are each
visibly gone in the restarted body quoted above. Diff grep: no
FORCE/DIAG/seed/fastforward/coords. Rulecheck clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
