# Review 1932 — b170be897 — store_version (D-2973)

- SHA: `b170be897` (coverage; `version.c` `store_version` plus `store_critical_bytes` and the `sfo_*` writers it calls)
- Files: `js/files.js` (`+210/−1`), `js/save.js` (`+19/−1`), `js/end.js` (`+18/−3`), `js/bones.js` (`+3/−1`)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, or `fastforward` in the `js/` hunks. The commit message names `seed0013`; the code does not. `imports.mjs --rulecheck`: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- `sym.mjs`:

```
store_version    js/files.js:1168   sync
store_critical_bytes js/files.js:1143   sync
sfo_char         js/files.js:1065   sync
sfo_uchar        js/files.js:1090   sync
sfo_version_info js/files.js:1116   sync
new_nhfile       js/files.js:644   sync
write_bonesfile  js/bones.js:407   sync
```

`imports.mjs --can js/end.js js/files.js store_version` and `--can js/save.js js/files.js store_version` print `ALREADY`. `bones.js` already imported `end.js`. The new calls are inside `dosave0` and `savebones`.

## Intent vs deliverable

Subject: there was no `store_version`. `dosave0` and `savebones` wrote a JSON save with schema `version: 1` and never recorded incarnation, feature set, entity count, or the critical-size header.

The diff adds the writers, and both callers build an `NHFILE` and store `nhfp.sf` as `version_header` beside schema `version: 1`.

## Inventory

| JS | Class | C |
|----|-------|---|
| `store_version` | live sync `files.js:1168` | `version.c:511–537` |
| `store_critical_bytes` | live sync `files.js:1143` | `version.c:674–694` |
| `sfo_char` | live; historical bag | `sfbase.c:248–262` → `historical_sfo_char` `sfstruct.c:105–110` |
| `sfo_uchar` | live; one byte appended | `SF_A(uchar)` `sfbase.c:119–133` |
| `sfo_version_info` | live; three fields | `sfbase.c:329–346` |
| `bufoff` / `bufon` | empty when `structlevel` | `sfstruct.c:435` / `:414`, named |
| `bwrite` | not called | POSIX write named omit; bytes sit on `nhfp.sf` |

Callers: `save.c:157` `dosave0` → `js/save.js` (mode `WRITING|FREEING` at `save.c:156`). `bones.c:613` `savebones` → `js/end.js` `savebones`, header copied in `write_bonesfile`. `save.c:411` `savestateinlock` and `files.c:2991` `recover_savefile` have no JS. `extern.h:3574` is the prototype.

## C ↔ JS fidelity

No `rn2`. `version_info` starts at zero, then three fields.

`incarnation` is `(VERSION_MAJOR<<24)|(VERSION_MINOR<<16)|(PATCHLEVEL<<8)|EDITLEVEL` (`mdlib.c:255–258`). `patchlevel.h` is 5, 0, 0, 0, so `0x05000000`. JS stores that.

`feature_set` is bit 6 when `MAIL_STRUCTURES` (`global.h:430`, defined), bit 17 always, bit 18 when `INSURANCE` (`config.h:435`, defined). `SCORE_ON_BOTL` is commented out (`config.h:627`), so bit 19 is absent. JS is `(1<<6)|(1<<17)|(1<<18)`.

`entity_count` is `(nartifacts<<24)|(NUM_OBJECTS<<12)|NUMMONS` (`mdlib.c:286–292`). JS uses `NROFARTIFACTS`, `NUM_OBJECTS`, and `NUMMONS` in that shift. `ignored_features` is bit 19 plus `SFCTOOL_BIT` (`mdlib.c:236–241`); `store_version` does not write it. `check_version` already masks with it.

`structlevel` then the `bufoff` comment, then `store_critical_bytes`, then `sfo_version_info(..., "version_info")`, then the `bufon` comment. Buffering does not change the tagged record.

`store_critical_bytes` writes only when `mode & WRITING`. Indicate starts `'u'`, then `'h'` if `structlevel`, else `'a'` if `fnidx == exportascii` (2, `hack.h:977`), else `'?'`. Both live callers set `structlevel`, so the byte is `'h'`. Count is `(char) SIZE(critical_sizes)`. The JS table has the same names as `version.c:546–664`: unused, the scalar types through `xint8`, the structs through `version_info`, `anything`, `you_LO` / `you_HI`, then ten zero spares. `SF_INCLUDE_SUBSTRUCTS` is not defined. `toSignedChar` is the signed-char promotion; the length is under 128, so the loop bound is the length. Each `ucsize` is one `sfo_uchar` under `"critical_sizes"`. Primitive widths are LP64 (short 2, int 4, long 8, pointer 8). `version_info` is three `unsigned long`s, 24, matching `global.h:348–352`. `you_LO` 200 and `you_HI` 10 are the low and high bytes of a 2760-byte `struct you`. This review did not recompile that probe.

`sfo_char` / `sfo_uchar` / `sfo_version_info` follow `sfbase.c`: optional `sf_log` is skipped (`fplog` is unset; stdio), `structlevel` dispatches `fnidx`. `sf_init` (`sfbase.c:646–655`) installs historical procs only (`historical` is 1, `hack.h:976`). Other structlevel slots are the zero procs, and JS writes nothing for them. The fieldlevel arm saves and clears `fplog` and does not call a proc. `sfoflprocs[exportascii]` is `zerosfoflprocs`. Historical char bytes are stored under the tag (`myname` is `UNUSED` in `historical_sfo_char`; the fd append is the `bwrite` omit). Repeated `sfo_uchar` with one tag appends, which is the critical-size loop. `sfo_version_info` stores the three unsigned values, not a 24-byte image.

`dosave0` sets the `create_savefile` fields (`files.c:1168–1176`: savefile, `WRITING`, structlevel, not fieldlevel, `addinfo` false, `deflt` false, binary, historical) and ORs `FREEING` the way `save.c:156` does before the call. `fd` is 0 instead of the `creat` result; `store_version` does not read `fd` once `bufoff` is omitted. `savebones` matches `create_bonesfile` (`files.c:853–860`): bones, `WRITING`, structlevel, `addinfo` true, `deflt` true, binary, historical. `bones.c:612` assigns `WRITING` again; the bits are the same. `write_bonesfile` copies `nhfp.sf` onto the payload when it is present.

## Hallucinations / overclaim

`savestateinlock` and `recover_savefile` are the two C callers left unwired, and the D-log says those functions are not in `js/`. `creat`, `chown`, and the bones `paniclog` stay out. Schema `version: 1` is still the JSON envelope; the C header is `version_header`. No arm of `store_version` or `store_critical_bytes` is a TODO.

## Density

Both compiled bodies shipped, with the three `sfo_*` callees they actually call. The two live C callers are wired. The header is small; the insertions are the critical-size table and the dispatch.

## Verification

```
verify store_version: baseline b170be897~1 (scoreboard at 45ea89017, 2026-09-27T14:16:36.452Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify store_version: no corpus session is blocked on it at b170be897~1 — a vacuous verify is NOT a corpus PASS. ...
smoke store_version: no RNG-tagged reach; fixed smoke spread (12 run, 3.4s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks. D-2973 records green 2/2, strict ×2, cohort 7/7, skip full, and seed0013 save/restore PASS. This re-run shows no `REGRESSED` session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
