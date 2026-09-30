# Review 2128 — e79d836f7 — absolute coordinate width

SHA `e79d836f7`, D-3168; 2026-09-30; +68 JS. No closure claimed.

**Addressed:** D-3174

## Intent vs deliverable

Subject promises “nhl_abs_coord + cvt_to_abscoord ports”. Diff adds both
exports and lua_tointeger_unpacked; retires symset ledger row.

## Inventory — nhl_abs_coord

Whole dispatch; cvt LIVE; lua_tointeger_unpacked/checkinteger/error local
CLONEs; table/stack operations replaced by JS values. No deletion/repoint.

## C ↔ JS fidelity — nhl_abs_coord

C sp_lev.c:4810–4836 preserves argc=2 pair, argc=1 table and error arms,
conversion then returns, no RNG. However `(coordxy)` casts are int16_t
(global.h:71), whereas JS uses int32 `|0`. Historical-SHA probe:
nhl_abs_coord(65536,0) returns [65536,0]; C narrowing gives [0,0]. csym
cannot locate external Lua integer bodies; the truncation assertion is
unproven, not pinned-C confirmation.

## Inventory — cvt_to_abscoord

New whole leaf; no callees.

## C ↔ JS fidelity — cvt_to_abscoord

C sp_lev.c:4771–4788 coder+croom versus map-origin branch matches. Compound
assignment writes int16 coordinates; JS retains int32. Probe: x=32767,
xstart=1 yields 32768 instead of -32768. `--callers` lists thirteen calls
plus declarations: two abscoord arms wired; eleven other sites have named
unported callers/absolute timer analogue. Caller guards and coordinate casts
read at nhlobj.c:398/:424/:616, nhlsel.c:888–889,
nhlua.c:428/:483/:541/:1545/:1575/:1602/:1628. abscoord registration is the
Lua entry, not a direct C call.

## Hallucinations / overclaim

“Whole” does not mean faithful integer width. Tests encode broad JS
arithmetic and miss C narrowing. Diff anti-pattern scan empty; full Rule #2
scan clean.

## Density

nhl_abs_coord: QUALITY-RISK; Ledger: ported. cvt_to_abscoord: QUALITY-RISK;
Ledger: ported. Same-file closure; individual Verify notes/REACH plus
green/strict/cohort/full recorded.

## Verification

On this SHA, `verify nhl_abs_coord,cvt_to_abscoord --base e79d836f7~1
--reach-all`:

```text
verify nhl_abs_coord: 0 blocked
smoke nhl_abs_coord: 24 PASS, 0 regressed → REACH-OK
verify cvt_to_abscoord: 0 blocked
smoke cvt_to_abscoord: 24 PASS, 0 regressed → REACH-OK
```

Focused tests 11/11; overflow probes expose omissions.

## Actionable C-wrongs

1. Apply signed-16 narrowing at both input casts and both offset
   assignments; verify room/map overflow against C and establish external
   Lua integer conversion semantics.

Verdict: **QUALITY-RISK**
