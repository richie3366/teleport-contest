# Review 2548 — 55d6cffda — map_glyphinfo :2653 showsyms arm (D-3673)

- SHA: `55d6cffda8e390ec2fdecb10fde0be5d77ccf01d`
- Subject: display.c map_glyphinfo `:2653` ttychar-from-showsyms arm: SYMBOLS overrides consulted at render (Caveman-94257 pool `~` → PASS) (D-3673)
- D-entry: D-3673. Type: cliff (writer port, 2 changed functions in one module).
- Diff size: `js/display.js` +70/−~20; + test `scripts/map-glyphinfo-showsyms.test.mjs` (120 lines); ledger `map_glyphinfo` D-tag.

## Intent vs deliverable

Promise: port the `:2653` `ttychar = gs.showsyms[symidx]` arm in C
order (symidx seeded from the glyph id via the live
`glyphmap_symidx`; hero arm keeps its direct value and skips the
general read; pet arm re-points at the mlet slot; ov side read from
the current set's table, nonzero wins, high-bit → DEC); rework
`mlet_symidx` from char-code to MONSYM-positional slots;
Caveman-94257 → PASS.

Diff actually adds: exactly that, in `map_glyphinfo` +
`mlet_symidx` + doc updates. No other `js/` file touched.

## Inventory

| JS function | Change | C locus |
|---|---|---|
| `map_glyphinfo` (`js/display.js:4465–4530`) | + symidx seed, hero/pet flags, `:2653` ov read | `display.c:2593–2655` |
| `mlet_symidx` (`js/display.js:341–344`) | char-code → MONSYM-positional | `display.c:2651`, `defsym.h:295–366` |
| `glyphmap_symidx` | reused (comment only) | `display.c:2739–3086` rows |

No symbols deleted or re-pointed. `sym.mjs` re-point check: not
applicable. Helper class: `glyphmap_symidx` is a pre-existing
C-machinery stand-in (deferred-table symidx column), now reused as
the `:2612` seed — not a clone.

## C ↔ JS fidelity

C `map_glyphinfo` (`display.c:2593–2655`, via `csym.mjs`) confirms
every cited arm:

- `:2612` `glyphinfo->gm = *gmap` (symidx seeded from the
  deferred table) → JS seeds via `glyphmap_symidx(gid)` for valid
  banked ids; NO_GLYPH/JS-only takes no arm (C's NO_GLYPH never
  reaches `show_glyph`). Sound.
- `:2619–2644` hero ladder + accessibility override (nonzero X
  slot wins) → JS applies `heroOverride` directly and skips the
  general read. Equivalent: C would then read
  `showsyms[heroOff]` = that same nonzero ov. The skip flag is the
  only behavior delta vs the pre-existing hero arm (which already
  set `out.ch` directly) — no regression possible.
- `:2647–2652` pet arm `symidx = mons[…].mlet + SYM_OFF_M` → JS
  `symidx = mlet_symidx(…)`; general read yields the M override
  when set, else the plain MLET_CH letter — byte-identical to the
  old unconditional assignment when no override exists.
- `:2653` `ttychar = gs.showsyms[symidx]` → JS reads only the ov
  side (`switch_symbols` ov-?:-symset confirmed at
  `symbols.c:258–260`; base ch already encodes the symset side).
  High-bit → DEC + 7-bit ch matches `wintty.c:3757–3762`
  (`graph_on()` + `putchar(ch ^ 0x80)`). ROGUESET vs PRIMARYSET
  follows `game.currentgraphics`, whose `assign_graphics` swap is
  live (`js/do.js:1931` goto_level).

`mlet_symidx` rework verified:

- C `mlet` is the MONSYM **number** 1..60 (`permonst.h:59`
  `char mlet`; `defsym.h:270` `sym = idx`; `MONSYM( 1, 'a', ANT,
  S_ANT)` at `:295`). Old JS (charCode + SYM_OFF_M) addressed
  slots 220+ — out of range; new positional
  `DEF_MONSYM_CH.indexOf(ch)+1 + SYM_OFF_M` addresses 124..183.
- `DEF_MONSYM_CH` order verified letter-by-letter against
  `defsym.h:295–366`, including the tail
  53–60 `@`, ` `, `'`, `&`, `;`, `:`, `~`, `]` — exact.
- Unknown letters → slot 123 (`SYM_OFF_M`), which C never
  addresses (mlet ≥ 1) and JS zeroes (`ov_*_table` fill 0,
  `showsyms_defaults` `m===0 → 0`). Readers fall back. Sound.
- Propagation via `decode_mixed` (`\G` now resolves the letter):
  disclosed in Named with the contrapositive (sole caller
  `botl.js:434` on compared status lines); 44/44 + corpus
  confirm no fallout.

## Hallucinations / overclaim

None. "Match C" covers the `:2653` arm + slot arithmetic, both
verified above. No dispatch-vs-callee gap. No FORCE/DIAG/seed
reads. Rule #2 clean (this iteration's `--rulecheck`).

## Density

Cliff phase: owner-null SYMBOLS-override cliff (next live head
class after the unworkable `mon_wield_item` head) — one C arm
family, whole, code + ledger + verify in one handoff.
Right-sized. Sampled verdicts: `map_glyphinfo` — faithful;
`mlet_symidx` — faithful (fixes a real slot bug).

## Verification

D-log claim: 8/8 focused; `score --ids`: Caveman-94257 FULL PASS,
engrave-94198 unchanged (separate writer), board 916→917, 0
regressions across all 27 SYMBOLS sessions; vacuous `--fn` (D-3672
precedent); REACH-OK; full 44/44.

Audit re-measure
(`verify map_glyphinfo --base 55d6cffda~1 --reach-all`):
0 blocked (vacuous, as D-logged) + smoke 24/24 → REACH-OK.
Committed board diff at this SHA independently confirms movement:
exactly 1 `false→true` flip (`scen-special-Caveman-94257`), 0
`true→false`. No REGRESSED session. Not a vacuous-PASS claim —
the D-log presents the rescore, and the rescore is real.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
