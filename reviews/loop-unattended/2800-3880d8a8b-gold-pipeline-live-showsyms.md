# Review 2800 — 3880d8a8b — symset gold pipeline via live_showsyms

- **SHA:** `3880d8a8b` (Wed 2026-10-14) — cliffs-head writer (D-3950).
- **D-entry:** D-3950. **Ledger:** check/decode/putstatusfield tagged,
  do_statusline2 + assign_graphics partial (omits corrected by child `d8819cf04`).
- **Diff size:** `js/display.js` +57/−18, `js/botl.js` +27/−15, +1 test.
- **Method:** cliff (≤10 fns) — whole Method on the pipeline + movement re-measure.

## Intent vs deliverable (promise vs diff)

The subject promises: a live `live_showsyms` read (C's ov-?-carrier
expression) rewired through every gold consumer, with capture parity
(unprintable coin → space) on both paint paths, moving all 15
RogueEpyx symset@0 sessions.

The diff delivers exactly that, plus NUL truncation in
`tty_putstatusfield`. Promise and diff agree.

## Inventory

| # | JS change | C source | Status |
|---|-----------|----------|--------|
| 1 | `live_showsyms` export (display.js:3581) | symbols.c `assign_graphics` :224–239 / `switch_symbols` :257–260 | exact expression |
| 2 | `check_gold_symbol` → live read | botl.c :39–44 | exact (`<= ' '`) |
| 3 | `_statusLine2` gold arm → live + space rule | botl.c :130–138, wintty.c :4824 | exact + capture parity |
| 4 | mimic gold base → live | same slot | exact |
| 5 | `_goldsym` snapshot deleted (all readers rewired) | — | complete (zero `_goldsym` left) |
| 6 | `decode_mixed` → raw `fromCharCode(live)` | windows.c :1484–1486 | byte-exact |
| 7 | `tty_putstatusfield` NUL truncate + <0x20 → space | wintty.c :4814–4827 | exact + capture parity |
| 8 | `:1565` gold detector → live read | botl.c :1565–1570 | exact (cite drift, below) |
| 9 | rogueepyx-gold-status test (space row + `$` fallback) | — | 1/2 pre → 2/2 post per D-log |

`sym.mjs live_showsyms`: exported sync js/display.js:3581, single
definition. botl.js→display.js is a pre-existing edge (one added
name). No symbol deleted (a `game` field, not a symbol).

## C ↔ JS fidelity

**Chain verified end to end.** RogueEpyx spans dat/symbols 501–575
with `S_coin: \x0f` at :563 and Handling IBM; `optfn_symset` do_set
(:4167–4201) loads it into PRIMARYSET via `read_sym_file` +
`switch_symbols` with no restriction gate, so showsyms[COIN]=0x0f.
`check_gold_symbol` (`:39–44`: `invis = goldch <= ' '`) runs only at
S_-parse (:665), doset-commit (:8998), goto_level (do.c:1668) — all
confirmed present in C — none before the step-0 paint, so both sides
take the encglyph path with invis=FALSE. The gold arm (`:130–138`:
`in_dumplog \|\| invis ? "$" : encglyph(...)`, money clamp) and
`decode_mixed` (`:1484–1486`: `*put++ = gs.showsyms[so]`, raw byte)
match; `tty_putstatusfield` (`:4814` strlen, `:4821–4827`
loop/putchar/advance/store) matches including the new NUL
truncation. `live_showsyms` is C's expression verbatim: ov first,
carrier when that set has a symset loaded, else the showsyms copy —
and the copy equals C's carrier at default config on both sets
(primary coin `$` via DEF_OC_SYM:528; rogue coin `*` via
showsyms_defaults:3480, matching C's `def_r_oc_syms[COIN]=GEM_SYM`
drawing.c:72–82 — so the old rogue-`*` behavior is preserved
exactly). Recorder `nomux_putch` (`ch < 32 → return`, termcap.c:757)
grounds the <0x20→space rule in tooling source, applied uniformly
to all status bytes — capture parity, not trace tailoring (D-3941
doctrine). Callers: do.c:1668 → do.js:1980, options.c:665 →
options.js:12931, options.c:8998 → options.js:11213 (all live);
decode_mixed's `\G` callers beyond BL_GOLD named.

**Ledger:** the ship commit pasted the do_statusline2 omit onto
`assign_graphics`; the docs-only child `d8819cf04` (same subject, no
`js/`, no review owed) already corrected both rows — verified
correct at HEAD. **Cite drift (no row):** the "`:1579` gold
detector" is at :1565–1570 (shape as cited).

Diff grep: zero FORCE/DIAG/`getRngLog`/fastforward in added lines.
Rule #2 clean (iteration-wide, SHA 2796).

## Hallucinations / overclaim

None. The transient "js-throw" label on Ranger-50059072 is disclosed
with triple-null evidence (board/direct/show errors null) rather
than claimed; the capture-parity attr note (fresh vs stale cell
attr) and the `make_things_fit` repaint note are disclosed as
standing behavior, not hidden.

## Density

Cliff discipline holds: one writer (the status-gold pipeline), whole
(both paint paths + detector + mimic base + snapshot deletion),
15/15 gold sessions moved with the 8 distinct-writer sessions
correctly left for regen rows. The follow-up `d8819cf04` is a
ledger-text repair, not a second iteration of work.

## Verification

Re-measured myself
(`verify do_statusline2 --base 3880d8a8b~1 --reach-all`):

```
verify do_statusline2: 0 PASS, 16 moved past, 8 unchanged, 0 worse → PROGRESS
smoke do_statusline2: 24 PASS, 0 regressed → REACH-OK
```

All 15 D-log landings reproduce (optfn_symset@2,
there_cmd_menu_next2u@18, do_fight@28/27, do_screen_description@16/7,
were_change@55/16, test_move@15, mstrength@17, drown@74, …); the
16th move is later-commit progress. The 8 unchanged sit at identical
steps (106/397/1125/944/1012/373/763/543). No REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
