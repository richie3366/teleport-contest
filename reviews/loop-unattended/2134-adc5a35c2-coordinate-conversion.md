# Review 2134 — adc5a35c2 — coordinate conversion widths

SHA `adc5a35c2`, D-3174; 2026-09-30; +87 JS; closes review 2128.

## Intent vs deliverable

“Preserve coordxy width and Lua 5.4.8 integer conversion” changes both
coordinate exports, two integer adapters; adds numeric-parser/float-integer
helpers. No imports or deleted symbols.

## Inventory — nhl_abs_coord

Changed whole export; cvt LIVE. lua_number_unpacked,
lua_integer_unpacked, checkinteger/tointeger/error are local CLONEs;
stack/newtable become JS values.

## C ↔ JS fidelity — nhl_abs_coord

sp_lev.c:4810–4836 preserves pair→table→error order. Pair failures become
zero; table failures throw. Exact BigInt low bits narrow to int16 before
origin addition. nhlua.c:1016–1025's intermediate int cast has identical
low 16 bits. Fractional pair returns zero; fractional table rejects.
Lua registration is the entry; no direct executable C caller.

External Lua bodies (csym reports no definition): Lua 5.4.8
lapi.c:389–396, lvm.c:122–157, lauxlib.c:437–451,
lobject.c:239–337 confirm exact integral conversion, decimal overflow
fallback and wrapping hexadecimal integers. CLONEs match these paths;
source-stack diagnostic suffix remains named absent.

## Inventory — cvt_to_abscoord

Changed leaf; no callees.

## C ↔ JS fidelity — cvt_to_abscoord

sp_lev.c:4771–4788: coder+croom chooses room offsets, else map origins;
all four writes now narrow signed-16. Verified 65536→0 and 32767+1→-32768.
Both abscoord call sites wired; other twelve sites in eleven Lua callers
remain individually map-named, keeping caller closure partial.
No RNG in either body or adapters.

## Hallucinations / overclaim

Claimed isolated 696-vector oracle is distinct from corpus proof; its
/tmp artifacts are unavailable here. Checked-in tests independently pass.
Diff anti-pattern scan empty; whole scored tree Rule #2 clean. No
cycle-forced clone claim; external Lua adapters have no native ESM export.

## Density

Ledger: nhl_abs_coord ported — ACCEPT-WITH-DEBT; cvt_to_abscoord partial —
ACCEPT-WITH-DEBT. One Must-fix closure, two complete bodies. Each has its
own Ledger and Verify lines, with caller omissions explicitly named.

## Verification

Historical `verify nhl_abs_coord,cvt_to_abscoord --base adc5a35c2~1
--reach-all`:

| Function | verify | smoke |
|---|---|---|
| nhl_abs_coord | 0 blocked, vacuous | 24 PASS, 0 regressed, REACH-OK |
| cvt_to_abscoord | 0 blocked, vacuous | 24 PASS, 0 regressed, REACH-OK |

Focused tests 15/15. D-log green/strict, cohort 7/7 and full 44/44.

## Actionable C-wrongs

None newly found; inherited Lua caller omissions remain map-named.

Verdict: **ACCEPT-WITH-DEBT**
