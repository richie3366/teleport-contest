# Review 1475 — aa0ca8b2 — wizcmds wiz_map_levltyp + legend (D-2516)

Metadata: SHA `aa0ca8b2`, `js/wizcmds.js` (+177 L) + `js/detect.js` cases 5/6 wiring. Coverage MISSING → live, plus one recorded corpus residual. NN 1475.

## Intent vs deliverable

Subject promises whole-body `wiz_map_levltyp` (`:693–835`) + `wiz_levltyp_legend` (`:839–877`) and wiring the `doterrain` cases 5/6 deferred no-ops (Valkyrie-92162 step-129 screen). Diff actually adds the table, both functions, and replaces the `case 5: case 6:` no-op with lazy dynamic imports of the live bodies. Matches the promise.

## Inventory

New JS: `LEVLTYP_NAMES`, `wiz_map_levltyp`, `wiz_levltyp_legend` (async per `sym`); `DEF_FOUNTAIN_SINK_SYM` hoist (with rationale: `{` literal defeats `port-coverage` brace-count). Changed: `doterrain` cases 5/6. No symbols deleted or re-pointed.

## C ↔ JS fidelity

Checked against pinned C `wizcmds.c:692–835` + `:839–877` (`csym`), `cmd.c:1072–1084`:

- `LEVLTYP_NAMES` verified verbatim against C (39 entries incl. `unreachable/undiggable` marker + `""` padding).
- Base-36 rows: `'*'` for undiggable STONE else `0–9a–zA–Z` via `fromCharCode` — matches C `:710–716`. Col-0 `'!'` arm: C appends at `row[x++]` past the row end; JS `row += '!'` — equivalent. C `x--` bookkeeping has no JS analogue needed. ✓
- dsc line: `D/L` ✓; special-level proto + maze/hell/town/roguelike arms, branch + alignment omitted per C comments ✓; fountain/sink counts with `{` defaults per `defsym.h:133–134` ✓; all 20 feature/flag arms in C order `:758–793` (verified in the diff) ✓.
- `Sokoban` (`:795`): C macro is `rm.h:538` `sokoban_rules` only; JS `lf.sokoban_rules || lf.sokoban || game.Sokoban` adds mirror disjuncts — but this is the established repo-wide idiom (`dungeon.js:1722`, `hack.js:226` identical), wizard-only text, disclosed as inlined mirror. Consistent, not a new invention.
- 8-branch chain `:804–824` with `the `-strip (`/^the /i` = C `strncmpi(brname,"the ",4)`, no 4th clone) ✓; COLNO-1 truncation ✓; NHW_TEXT via shared `show_text_pages` (D-2508 precedent) ✓.
- Legend: header lines, even `last`, pair loop with `'*'`/`' '`/`%-28s`→`padEnd(28)` — verified against C `:855–869`, exact.

Callee closure: `may_dig`/`Is_special`/`Invocation_lev`/`On_W_tower_level`/`show_text_pages` all LIVE, read lazily inside the body (`--can` SAFE/CHECK per message — lazy, never top-level); `In_sokoban`/`Is_knox`/`In_endgame` static const imports. Named omits are genuine no-JS-export or compiled-out items. No clones, no stubs, no FORCE/DIAG/coords/seeds.

## Evidence detail

Col-0 arm: C does `x--` (x = COLNO−1), then `if (levl[0][y].typ != STONE || may_dig(0, y)) row[x++] = '!'`, then `row[x] = '\0'`. So a normal row is COLNO−1 chars and the `!` appends a COLNOth char only on the abnormal arm. JS `row += '!'` under the same condition is exactly that — no off-by-one, no skipped column (the message's "reads `game.level.at(0, y)`, not skipped" checks out in the diff).

Legend loop vs C `:855–869`: `last = SIZE(levltyp) & ~1` → JS `LEVLTYP_NAMES.length & ~1` (39 & ~1 = 38); pair loop `for i < last/2, for j = i; j < last; j += last/2`; `c = !*dsc ? ' ' : !strncmp(dsc,"unreachable",11) ? '*' : …` → JS `!name ? ' ' : name.slice(0,11)==='unreachable' ? '*' : …` (equivalent predicate); `Sprintf(eos(buf), " %c - %-28s")` → `` ` ${c} - ${name.padEnd(28)}` ``; `if (j > i)` push-and-clear. Exact.

Feature arms `:758–793` verified present in C order in the diff (vault/shop/temple/throne/zoo/morgue/barracks/hive/swamp/noTport/noDig/noMMap/noMem/shortsight/graveyard/maze/cave/tree) plus Sokoban `:795` and the invoke/tower/8-branch chain `:799–824`. Truncation `if (strlen(dsc) >= COLNO) dsc[COLNO-1] = '\0'` → `dsc.slice(0, COLNO-1)` under `dsc.length >= COLNO` — equivalent.

`sym`: `wiz_map_levltyp js/wizcmds.js:736 ASYNC`, `wiz_levltyp_legend js/wizcmds.js:851 ASYNC` — both awaited at the `doterrain` call sites. `Sokoban` macro confirmed at `rm.h:538` (`svl.level.flags.sokoban_rules`); the JS mirror disjunction is the repo-wide idiom, not a new invention.

## Hallucinations / overclaim

 investigated one apparent flag: my re-run printed `moved → js-throw at step 144`, while the D-log claims `error null`. Resolved: `hidden-proxy.mjs:468` prints `${r.owner || 'js-throw'}` — "js-throw" is the tool's null-owner fallback label, not a throw. `show scen-tour-Valkyrie-92162` confirms `error: null`, kind=screen at step 144, RNG 14975/14975, a map-glyph row diff — exactly the D-log's "error null, screens 144/149". No overclaim; the step-144 later owner is correctly left as a future writer row.

## Density

Right-sized: two small related C functions + caller wiring, two modules.

## Verification

- Re-ran `hidden-proxy.mjs verify wiz_levltyp_legend --base aa0ca8b2~1 --reach-all`: 1 blocked at baseline → 0 now, PROGRESS (129 → 144, full RNG match) + smoke 24/24 REACH-OK. Matches the D-log's PROGRESS claim.
- `verify wiz_map_levltyp` per D-log: PASS + REACH-OK (same run family).
- D-log cites green 2/2, strict ×2, cohort 7/7.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
