# Review 1335 — 229bdd8a — dovspell VIEW swap/sort + sort cluster (D-2369)

Metadata: SHA `229bdd8a`, `js/spell.js` only (+202/−14). No new modules
or edges (all names ride pre-existing imports/edges, runtime-only).
D-log: D-2369, map-named row, 0 blocked. 11/11 hand probe
(`/tmp/probe_dovspell.mjs`, kept for re-run).

## Intent vs deliverable

Subject promises the unreachable VIEW swap/sort: letter/`+` returned
cancel; `dospellmenu` ignored `spl_orderindx`; `spellsortmenu` /
`sortspells` / `spell_cmp` absent. Diff adds the SORTBY enum +
` spl_sortchoices` + `strcmpi3` + `spell_cmp` + `sortspells` +
`spellsortmenu`, rewires `dospellmenu` (orderindx display, VIEW
letter/`+` → ok:true, swap-call preselected → decline), and runs the C
`dovspell` loop with the C tail. Matches the promise.

## Inventory

- `spell_cmp`, `sortspells`, `spellsortmenu` — new file-local functions
  (C `staticfn`, correct locality); enum consts + choices table.
- `strcmpi3` — new file-local 3-way compare. The vault.js/write.js
  lookalikes are boolean-eq only, so no retire was available; adding
  the 3-way here is correct, not clone drift.
- `dospellmenu`, `dovspell` — rework. No stubs added; four residual
  arms doc-named with C citations.

## C ↔ JS fidelity

`spell_cmp` vs C `:1867–1921`: arm order LETTER/ALPHA/LVL_LO/LVL_HI/
SKL_AL/SKL_LO/SKL_HI exact incl. fallthrough-to-tie-break shape;
CURRENT/default → 0 (C compares element addresses = keep; JS `sort` is
stable per Constitution §4.5, matching the contest patch — disclosed).
Tie-break `strcmpi(OBJ_NAME)` → `strcmpi3(objectNameStrs)` per the
spell.js:711 idiom. Confirm.

`sortspells` vs C `:1926–1972`: CURRENT early-out, n-count, <2 return,
orderindx alloc shape, RETAIN two-pass permute + mode reset, `slice(0,
n).sort(spell_cmp)` ≡ `qsort(orderindx, n, ...)` (only first n
touched). Confirm.

`spellsortmenu` vs C `:1978–2017`: letters a–h + z, blank separator,
`View known spells list sorted` heading, Return/Space accepts current
mode → TRUE (re-sort idempotent), Esc → FALSE; `n > 1` second-pick
needs multi-select, unreachable single-key — doc-named. Confirm.

`dospellmenu` vs C `:2119` + return protocol: orderindx display index
✓ (wizard `spellknow(i)` keeps the loop index per C); `+` sort entry
(pre-existing display, now reachable: VIEW letter/`+` → ok:true);
swap-call preselected pick → FALSE (C `*spell_no == splaction`) ✓;
Return/Space → FALSE both calls (C first-call n==0 → FALSE; swap-call
accept-preselected → FALSE) ✓. The C `:2159–2163` `splaction >= 0`
cancel-path arm (Esc-on-swap → TRUE self-swap no-op + reshow) is NOT
ported — JS Esc-on-swap breaks the loop. This is a real behavioral
delta in menu flow, but: self-swap mutates nothing and draws no RNG,
so game state/screens-after-dismiss are identical (one menu reshow vs
exit, in a path no corpus/public session reaches); it is doc-named on
`dovspell` with the exact C range. Named omit, not a C-wrong. Noted.

`dovspell` vs C `:2021–2053`: empty-book pline, VIEW loop, SORT
dispatch, `Reordering...swap 'x' with` qbuf via `spellet`, struct swap,
decline/ESC break, conditional free → null, mode reset, `ECMD_OK`
(imported at `:178`, callers ignore). Confirm.

## Hallucinations / overclaim

None. Residuals (`n > 1` arms, SPELLMENU_DUMP, de-select arm) are named
with C citations; the probe claim is concrete (11/11, kept for re-run).

## Density

~202 insertions, one C cluster (dovspell + menu + sort trio) in one
module — at the §2b ceiling but one locus family. Acceptable.

## Verification

- Added-line banned grep: clean.
- Re-measured: `verify dovspell --base 229bdd8a~1` → `0 blocked (0 at
  baseline, 0 working)` — vacuous as disclosed; row cited 0 blocks.
  Confirm.
- Green/strict/cohort per D-log `verify.mjs --fn dovspell` → VERIFY:
  PASS (quoted; tree has since moved).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
