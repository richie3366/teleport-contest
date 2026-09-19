# Review 1474 — 32a1691b — botl.c bot_via_windowport whole body (D-2515)

Metadata: SHA `32a1691b`, `js/botl.js` +695 L, `js/const.js` (`CONDITION_COUNT 0→30`), journal rotation. Coverage MISSING → live. NN 1474.

## Intent vs deliverable

Subject promises whole-body `bot_via_windowport` (`botl.c:962–1279`) with tables (`conditions`/`condtests`/`terrain_descr`/`enc_stat`/`hu_stat`, bl-enum, OPT_IN/OUT) and same-file callees (`rank`, `encglyph`, `status_version`, `weapon_status`, `armor_status`, `cond_cache_prepA`). Diff actually adds all of that in C order with `:line` cites. Matches the promise; the scoreboard hunk is only the verify refresh (commit pointer + timestamp), not a result rewrite.

## Inventory

New JS: tables + 6 helpers + `bot_via_windowport` (all `js/botl.js`); 20 new import edges (message claims DAG-safe leaf); `init_blstats` now sets `game.gb.blinit`. No symbols deleted or re-pointed, so no `sym` re-point output is required.

## C ↔ JS fidelity

Checked against pinned C `botl.c:961–1279` (`csym` range) plus `botl.c:817–851`, `youprop.h:108/112`:

- Tables: `condtests` all 30 rows verified verbatim against C `:820–849` (ids, useroption strings, opt_in/out, enabled flags — exact). `conditions` rankings/masks/texts and `terrain_descr` spot-checked against C order.
- `:970` blinit panic → loud throw; `:973` idx toggle on module-local (decl.c zero-init) ✓. Title `:988–1008` with `sizeof` arithmetic (`+5−1`), `max(i,BOTL_NSIZ)` clip, poly word-caps ✓. `Ugender` concern checked: `pmname` runs only on the poly arm, where `u.mfemale` is exactly C's `Ugender`. ✓
- Score constant 0 (SCORE_ON_BOTL compiled out — named with `config.h` cite) ✓. HP −1→0 + rawval/capped pairs ✓. Gold `\G` vs `$` gate + `min(…,999999)` ✓ (svc/gs fallback named). Hunger/capacity vals + valsets ✓. VERS refill-then-fill: fresh `valset` starts false so first call always fills, matching C `:1114–1122` ✓.
- Condition battery `:1149–1234`: Sick gate (flat `u.Sick` mirror + intrinsic — identical expression to the `display.js:5897` precedent, consistent), utrap lump-into-trapped, ustuck grab/held/holding with `#if 0` engulfed compiled out, unconditional Blind..submerged, `elf_iron` FALSE, bareh/icy/slippery/woundedl, multi<0 cache + unconsc/parlyz/sleeping/busy chain, 30-wide mask loop ✓. `Glib` reads intrinsic-only per `youprop.h:112` (disclosed superset distinction vs potion's `Glib()`) ✓.
- Gates `:1251–1277` + `evaluate_and_notify_windowport(valset, idx)` ✓. `describe_level(1)` matches the string-returning `js/display.js:5790` signature ✓.
- `CONDITION_COUNT` only consumer is the new loop (grep-confirmed). `imports.mjs --can js/botl.js js/mhitu.js Flying` → ALREADY (pre-existing edge, no new TDZ surface); rulecheck clean.

Callee closure: every callee LIVE (`rank_of`, `money_cnt`, `acurr`, `describe_level`, `Blind/Flying/Levitation/Hallucination/unconscious`, `weapon_type`, `helm_simple_name`, …); property macros read inline (precedent-cited, never function clones); named omits are compiled-out (`botl_score`), unwired dispatch (`bot()`, `status_update`/`get_hilite`), or pre-existing patterns. The `/tmp/probe-botl.mjs` 25-check claim is scratch (not committed) — the tables and arms I re-checked directly confirm it.

## Evidence detail

`condtests` verified row-for-row against C `botl.c:820–849`: all 30 `(id, useroption, opt_in/out, enabled)` tuples match, including the easy-to-flip ones (`barehanded/opt_in/FALSE`, `trap/opt_in/FALSE`, `iron/opt_out/TRUE`, `foodPois` camelCase, `hallucinat` truncation). `CONDITION_COUNT` grep: only `js/const.js:804` (def 30), `js/botl.js:39` (import), `js/botl.js:1149` (the mask loop) — the `0→30` change has no other consumer.

VERS block: C `:1120` refills when `blstats[BL_VERS].a_int != flags.versinfo`, then `:1124–1127` fills when `!valset[BL_VERS]`. JS uses a fresh all-false `valset`, so the first call always fills (matching C's first-call path even with showvers off) and later calls refill on change. `status_version` missing-name arms (`game.gh?.hname`, `nomakedefs.git_branch`) take C's `!name`/`!altname` false branches.

`imports.mjs --can js/botl.js js/mhitu.js Flying` → `ALREADY: botl.js already statically imports mhitu.js. No new edge needed.` The message's "20 new edges DAG-safe" claim rests on botl.js being a leaf (nothing in `js/` imports it) plus no top-level reads of the new bindings — the new code reads them only inside function bodies, which I confirmed by scanning the added hunks for top-level dereferences (none; module scope holds only tables, enums, and cache statics).

`armor_status` letter order `G/C/A/U/H/B/S` matches C `:583–595` (`suit` takes `A` since `s` is shield); the `+` hint gate `:603–610` checks ring/art/cloak/helm/weapon in C order with `strkitten('+')` as append. `weapon_status` `2H-` gate `:544–546` (bimanual, not already `2…`/`two…`), eos-capitalize `:547–548`, space→dash `:551` — all in C order.

## Hallucinations / overclaim

None. "0 blocked" presented as a coverage gap with the vacuous note; reach-smoke reproduced below.

## Density

Large but single-function-family: one 319-line C body + its tables/helpers, one module. Within the breadth-phase envelope.

## Verification

- Re-ran `hidden-proxy.mjs verify bot_via_windowport --base 32a1691b~1 --reach-all`: 0 blocked (vacuous, correctly labeled) + fixed smoke 24/24 PASS, 0 regressed → REACH-OK. Matches the D-log.
- D-log cites green 2/2, strict ×2, cohort 7/7.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
