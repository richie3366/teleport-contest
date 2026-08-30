# C→JS map — Harness and contracts

Parent index: `docs/C-JS-MAP.md`. Do not load other map sections
unless this subsystem is in scope.

## Harness and contracts

| C / contract | JS | Status | Evidence / known omissions |
|---|---|---|---|
| ISAAC64 engine | `js/isaac64.js` | frozen | Judge-owned; never edit |
| terminal grid/serialization | `js/terminal.js` | frozen | Judge-owned; cursor is scored with screen |
| scoring serialize (contestant) | `js/display.js` `serialize_for_scoring` | partial | Leading inv/uline/bold spaces (D-0129/D-0932); **space+attr0+CLR_GRAY → NO_COLOR** (D-0930; D-0480 glyph remap still banned D-0483); **flush paints S_air spaces + mid-row space runs >4 → CSI CUF** (D-0931); S_altar raw `{` (D-0293); DEC pool `` ` `` vs ROCK_CLASS grave still ambiguous without cell decgfx; LB gap cohort 13/13 local PASS @#1201 awaiting cron |
| persistence VFS | `js/storage.js` | frozen | Contract exists; bones + **JSON save/restore** (D-0335) use VFS; **current-level traps** (D-1694 `serTraps`); **`payload.current` `serLevel`/`deserLevel`** (D-1696); **other `LFILE_EXISTS` `payload.levels`** (D-1697; M2); **RANGE_GLOBAL pack-lamp relink** (D-1698); **dorecover getlev place/`restore_cham`/`run_timers` + restlevelfile omoves restamp** (D-1699; M6); binary NHFILE deferred |
| `tty_nhgetch` boundary | `js/input.js`, `js/jsmain.js` | partial | Boundary capture passes green + seed0017; capture hook still repairs Count/`--More--` cursor instead of deriving it entirely from display semantics; **askname before newgame when no OPTIONS=name** (D-0102); **`player_selection` before newgame** (D-0111); **`attempt_restore` before player_selection/newgame** (D-0335) |
| core RNG wrappers | `js/rng.js` | partial | Green paths match; **`rnl` ported** (D-0059; Luck bias + internal `rn2` log); `rn1` is a macro over logged `rn2`; display-stream wrappers still absent |
| Lua RNG bindings/provenance | — | absent | `nh.rn2`/`nh.random` must consume core; patch 004 adds Lua callsite provenance, not a third ISAAC stream |
| display/hallucination RNG | — | absent | No hallucination parity |
| per-segment contestant API | `js/jsmain.js` | partial | Fresh game + shared storage; **`S`/`dosave` + restore segment via VFS JSON** (D-0335); **current-level `savetrapchn` JSON** (D-1694); **in-memory `goto_level` savelev lights/billobjs/mlstmv** (D-1695); **`payload.current` serLevel codec** (D-1696); **other-ledger `levels{}`** (D-1697); **RANGE_GLOBAL worn/`owornmask` relink** (D-1698); **dorecover envelope `run_timers` last + `check_special_room`** (D-1699); binary savelev deferred |

