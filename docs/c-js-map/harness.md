# C→JS map — Harness and contracts

Parent index: `docs/C-JS-MAP.md`. Do not load other map sections
unless this subsystem is in scope.

## Harness and contracts

| C / contract | JS | Status | Evidence / known omissions |
|---|---|---|---|
| ISAAC64 engine | `js/isaac64.js` | frozen | Judge-owned; never edit |
| terminal grid/serialization | `js/terminal.js` | frozen | Judge-owned; cursor is scored with screen |
| scoring serialize (contestant) | `js/display.js` `serialize_for_scoring` | partial | Leading inv/uline spaces (D-0129); **space+attr0+CLR_GRAY → NO_COLOR** (D-0930; D-0480 glyph remap still banned D-0483); S_altar raw `{` (D-0293); DEC pool `` ` `` vs ROCK_CLASS grave still ambiguous without cell decgfx; cyan/bold blank leftovers named in D-0930 |
| persistence VFS | `js/storage.js` | frozen | Contract exists; bones + **JSON save/restore** (D-0335) use VFS; binary NHFILE deferred |
| `tty_nhgetch` boundary | `js/input.js`, `js/jsmain.js` | partial | Boundary capture passes green + seed0017; capture hook still repairs Count/`--More--` cursor instead of deriving it entirely from display semantics; **askname before newgame when no OPTIONS=name** (D-0102); **`player_selection` before newgame** (D-0111); **`attempt_restore` before player_selection/newgame** (D-0335) |
| core RNG wrappers | `js/rng.js` | partial | Green paths match; **`rnl` ported** (D-0059; Luck bias + internal `rn2` log); `rn1` is a macro over logged `rn2`; display-stream wrappers still absent |
| Lua RNG bindings/provenance | — | absent | `nh.rn2`/`nh.random` must consume core; patch 004 adds Lua callsite provenance, not a third ISAAC stream |
| display/hallucination RNG | — | absent | No hallucination parity |
| per-segment contestant API | `js/jsmain.js` | partial | Fresh game + shared storage; **`S`/`dosave` + restore segment via VFS JSON** (D-0335); multi-level ledger / binary savelev deferred |

