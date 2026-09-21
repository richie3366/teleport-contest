# Review 1665 — 29baae20 — `cmd.c` there_cmd_menu_common glyph arm + export (D-2706)

Metadata: commit `29baae20`, D-2706, `js/cmd.js` (+27/−12) + committed `scripts/there-cmd-menu-common.test.mjs`. Pops the head Open-coverage row (MISSING: C 11 L / JS no symbol). No prior review claimed closed.

## Intent vs deliverable

Subject promises: whole C body of `there_cmd_menu_common` — the missing glyph arm plus a same-name export. Diff actually does that: renames local `there_cmd_menu_common_items` → exported `there_cmd_menu_common`, adds the third disjunct, replaces literal `2` with `CLICK_2`, imports `hero_glyph` + `CLICK_2` on existing edges. Promise matches deliverable.

## Inventory

Changed JS: one function renamed/exported at `js/cmd.js:1714`; two import identifiers added to pre-existing import lines (display + const edges). No deleted/re-pointed symbols (old local name is gone by rename — see sym output below). Committed test: 5 cases, re-ran green (pass 5, fail 0).

## Callee closure

Required `sym.mjs` outputs pasted verbatim (rename deletes the old local name):

```text
there_cmd_menu_common js/cmd.js:1714   sync
there_cmd_menu_common_items NOT FOUND in js/** (no export, no local function/const).
             This index includes js/generated/. Do not add a local clone.
hero_glyph       js/display.js:1963   sync
```

| JS callee | Class |
|---|---|
| `glyph_at` | LIVE (`display.js:816`, returns int `disp_glyph`) |
| `hero_glyph` | LIVE (`display.js:1963`) — JS returns a descriptor; `.glyph` is the int field (`display.js:457` `glyph: n + off` constructor) |
| `Upolyd` | LIVE, unchanged |
| `mcmd_addmenu` | OMIT by architecture — C's add_menu+`++K` becomes items-array push; the menu assembly in live caller `there_cmd_menu` is the actual consumer (map turns.md) |

No STUB in the arm. No `--can` needed: both imports join pre-existing import lines, no new module edge. Caller: C `:4862 there_cmd_menu` → JS `there_cmd_menu` (`js/cmd.js:1737` concat site updated to the new name). No C caller left unwired; none invented.

## C ↔ JS fidelity

C locus: `there_cmd_menu_common` `cmd.c:4638–4654` (csym, 17 L — whole body read) + callers (csym `--callers`: declaration `:132`, call `:4862` only). RNG: none either side. Branch walk, in C order:

- `mod == CLICK_1 || mod == CLICK_2` gate ✓ (literal `2` replaced by `CLICK_2` — same value, named).
- `!u_at(x, y) || Upolyd || glyph_at(x, y) != hero_glyph` — all three disjuncts present in C short-circuit order ✓. The new third arm compares `glyph_at(x, y) !== hero_glyph().glyph`: `glyph_at` returns the int (`display.js:816–824`), `.glyph` extracts the int from the descriptor — observably C's int `!=` (strict vs loose is safe: both sides numbers).
- C `int *act` UNUSED dropped ✓; `K` counting subsumed by the items array ✓ (architecture, named in the map).

## Hallucinations / overclaim

None. D-log names the architecture substitutions (`mcmd_addmenu`→push, `act` dropped) and the C-int-vs-JS-descriptor `.glyph` point explicitly.

## Density

Breadth phase: one 17 L C staticfn completed under its own name + 5-case committed test. Right-sized (C is that small).

## Verification

Re-measured per-SHA re-run (`--base 29baae20~1 --reach-all`):

```text
verify there_cmd_menu_common: baseline 29baae20~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify there_cmd_menu_common: no corpus session is blocked on it at 29baae20~1 — a vacuous verify is NOT a corpus PASS. [...]
smoke there_cmd_menu_common: no RNG-tagged reach; fixed smoke spread (24 run, 3.6s): 24 PASS, 0 regressed → REACH-OK
```

0-blocked vacuous + REACH-OK, no REGRESSED — matches the D-log claim (which disclosed "none blocked"). Diff grep: no FORCE/DIAG/seed/fastforward/coords. Rulecheck clean (re-ran this iteration).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
