# Review 1446 — db42061d — parse_id whole-body port + glyphid cache (D-2487)

Metadata: SHA `db42061d`, new `js/glyphs.js` (634 L), new `js/generated/glyphsyms_data.js` (212 L), `js/display.js` +109/−15, extractor `scripts/extract-glyphsyms.py`. C `glyphs.c:183–197,234–319,335–458,797–803,823–1162` + `display.h` macros. D-log: D-2487.

## Intent vs deliverable

Promise: whole `parse_id` in C order + hash/cache/fan-out family + generated loadsyms table + 10 display.h macro ports. Diff delivers it: every named helper present, G_/S_ arms complete, extractor checked in with cross-checked counts. Promise = deliverable.

## Inventory

- Added (new module `js/glyphs.js`): `zero_find`, `strcmpi`, `fix_glyphname`, `glyph_hash`, `init/add/find/free/cache_status`, `parse_id` + `glyph_find_core` + `fill_glyphid_cache` + `dump_all_glyphids` (exports; C-staticfns exported deliberately for options/symbols ports and probes — stated).
- Added (display.js): `glyph_is_normal_piletop_obj`, `glyph_is_body_piletop`, `glyph_to_body_corpsenm`, `glyph_is_male/fem_statue_piletop`, `glyph_is_fem/male_statue`, `glyph_to_statue_corpsenm`, `glyph_to_swallow`, `glyph_to_explosion` + piletop peel in `glyph_to_obj`; 10 macro `function`→`export` (bodies untouched) + 3 const exports.
- `sym.mjs` (required): `parse_id`, `glyph_find_core`, `fill_glyphid_cache`, `dump_all_glyphids`, `glyph_is_normal_piletop_obj` — each single-definition, no clones. No deleted/re-pointed symbols. `strcmpi` is local-clone #3 (vault/write pre-exist) — see below; `fix_glyphname` sole instance.

## C ↔ JS fidelity

Hash/cache exact: `glyph_hash` rotl-1/XOR uint32 (`>>> 0`, A-Z fold; ASCII-only inputs so C `char` sign is moot); double-hash odd-step probe, `2*MAX_GLYPH` sizing, panic→throw, fill/free/status all ≡ C `:303–458`. `monsdump[].nm ≡ monsterNames[m].slice(3)` verified at the source (`monsters.h:14` `{ PM_##bn, #bn }` under DUMP_ENUMS). `obj_descr oc_name ?: oc_descr` ≡ `objectNameStrs ?? objectDescrs` (all 15 otyp consts resolve, none −1; ranges verified numerically). G_ chain arm-by-arm ≡ C `:893–1107`: 8-prefix monster chain in order, body/statue piletop ternaries, object skip ranges + wand/scroll/potion (`flask of n`)/ring/unset arms + blank/slime specials, cmap bank chain with `_gehennom/_knox/_main/_mines/_sokoban` suffixes, altar `j != altar_other`, zap `PARSE_ZAP_TEXTS[j/4] + ' zap ' + fix(symname)`, swallow `mnum = j/8` (`S_sw_br = S_sw_tl+7` local; C `defsym.h:228` confirms 8 cells), explosion `expl = j/9`, `Math.trunc` ≡ non-negative int division throughout, `<= pm_count` S_ quirk kept, S_ cmap→oc→pm order, `(%04d)` dump format, overflow panic→throw, tail `dump||fill → 1`. `glyph_find_core` ≡ C `:234–283` (MLET_ORDINAL≡1-based MONSYM idx; numeric-compare corner behaves the same).

display.h ports verified macro-by-macro against `display.h`:

```c
#define glyph_to_swallow(glyph) \
    (glyph_is_swallow(glyph) ? (((glyph) - GLYPH_SWALLOW_OFF) & 0x7) : 0)
#define glyph_to_explosion(glyph) \
    (glyph_is_explosion(glyph) ? (((glyph) - GLYPH_EXPLODE_OFF) % (S_expl_br - S_expl_tl + 1)) : 0)
```

both ≡ the JS (guards included — C has the same ternaries). `glyph_to_body/statue_corpsenm` incl. NO_GLYPH tail ≡ `:915–928`; piletop/body/statue predicates ≡ `:814–855`; `glyph_to_obj` peel folds generic/normal order to identical arithmetic (fencepost OFF peels to 0 ≡ C).

Data-table evidence (live probe, not trusted from the message): `LOADSYMS.length` is 196 with range counts `{1:8, 2:105, 3:17, 4:60, 5:6}` and `SYM_MON=4, SYM_OC=3, SYM_PCHAR=2` — matching C `symbols.c:403` (8 CONTROL + PCHAR + OBJCLASS + MONSYMS + 6 OTH + fencepost, omitted). Entries are `[range, name]` pairs in C order, so `loadsyms_offset` values agree with C. Full-bank probe: all 481 piletop glyphs (`PILETOp_OFF..+480`) return `glyph_is_object` TRUE and peel to the right otyp (e.g. `+100 → 100`).

`sym.mjs` (required — new exports, single-definition, no clones):

```text
parse_id         js/glyphs.js:261   sync
glyph_find_core  js/glyphs.js:552   sync
fill_glyphid_cache js/glyphs.js:607   sync
dump_all_glyphids js/glyphs.js:628   sync
glyph_is_normal_piletop_obj js/display.js:922   sync
```

`strcmpi` is local-clone #3 (vault.js:121, write.js:78 pre-exist) — but the older two return *boolean* while C and glyphs.js use int convention, and every call site in each file is consistent locally, so no live bug; a future unification must not blindly swap conventions. All glyphs.js `strcmpi` uses test `=== 0`, so magnitude is moot.

Callee closure: all LIVE (display/const/generated imports); `find_struct` consumers + C callers (options/symbols/wizcmds/earlyarg) OMIT with citations in map + D-log.

1. (Debt, not Must-fix) **One-hole divergence from pre-existing wide `glyph_is_piletop_generic_obj`.** C `display.h:842–844` bounds it to `(OFF, OFF+FIRST_OBJECT−1)` (FIRST_OBJECT=18); JS `display.js:849` spans the whole piletop bank (pre-existing, untouched by this commit). Consequence for the NEW code: glyph `PILETOp_OFF+17` enters the object arm and caches a `G_piletop_*` id where C generates none (`glyph_is_object` FALSE, `glyph_to_obj` NUM_OBJECTS). Single strange-object-boundary glyph, no RNG, no live callers, no corpus reach. Queueable fix: map-name the hole with the `display.h:842–844` citation, or narrow the predicate after auditing its live render callers.

## Hallucinations / overclaim

None material. "Whole body" holds for parse_id and every helper; omits are map-named with C cites. `strcmpi` note: the two older clones return boolean while C/new code use int convention — each call site is consistent locally, so no live bug, but a future unification must not blindly import one convention into the other.

## Density

Large but legitimate: one C function family + its data table + macro ports, under the 1500 cap; full 44/44 run since shared display.js changed.

## Verification

`hidden-proxy verify parse_id --base db42061d~1 --reach-all` (re-run here):

```text
verify parse_id: baseline db42061d~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke parse_id: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
```

0 blocked both sides (vacuous, as stated). Matches. `imports.mjs --rulecheck` (whole scored `js/`): Rule #2 clean — notable here because the commit adds a new scored module plus a generated data file and a scripts/ extractor; the extractor is tools-side (not scored `js/`), and the line-sink `dump_all_glyphids` adaptation keeps stdio out. Diff grep: no FORCE/DIAG/`getRngLog`/seed/fastforward/coords. No RNG in the port (lookup-only; `Math.trunc` is arithmetic, not draws).

## Actionable C-wrongs

1. (Debt) Single-glyph piletop hole (`PILETOp_OFF+17`): map-name or narrow per item 1 above. No Must-fix (pre-existing predicate, nil blast radius).

Verdict: **ACCEPT-WITH-DEBT**
