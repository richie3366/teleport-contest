# Review 2007 — 0ce2fb847 — handler_menu_headings + query_color_attr ports

Metadata: SHA `0ce2fb847`, D-3047, js/options.js only (+49).

## Intent vs deliverable

Subject promises "handler_menu_headings + query_color_attr whole ports".
Diff actually adds both exports with per-arm cites, no import changes.
Matches promise.

## Inventory

- `query_color_attr` (new export) — C coloratt.c:303–317.
- `handler_menu_headings` (new export) — C options.c:5779–5792 (staticfn).

## C ↔ JS fidelity

`query_color_attr` vs C `:303–317` (csym): `query_color(prompt,
ca->color)` :308 ✓; `-1 → FALSE` before the second prompt :309–310 ✓;
`query_attr(prompt, ca->attr)` :311 ✓; `-1 → FALSE` :312–313 ✓;
write-back both fields only on joint success :314–316 ✓. Async since
both callees are async (query_color js/options.js:5139, query_attr :5162
— both ASYNC per sym, both awaited) ✓. No RNG.

`handler_menu_headings` vs C `:5779–5792` (csym): query over
`iflags.menu_headings` with the C prompt :5782–5783 ✓; `gotca +
perm_invent → update_inventory()` :5785–5788 ✓ (sync callee
js/invent.js:4737, called sync, pre-existing edge); `return optn_ok`
:5791 ✓ (`optn_ok` file-local js/options.js:936 = 1 — again invisible
to `sym.mjs`, confirmed by grep). Missing-struct default
`{ color: NO_COLOR, attr: ATR_INVERSE }` matches C optfn_menu_headings
:2197–2199 verified above (non-negated empty-OPTSTR → INVERSE +
NO_COLOR) — exact. Named omit: `adjust_menu_promptstyle` :5790 —
`sym.mjs` confirms no JS symbol, by-design omit is legitimate; C caller
optfn_menu_headings unported (wires later) — named.

Observation (not a C-wrong): C `handler_menu_headings` is a staticfn
but ships as an export, unlike the file-local staticfns in D-3039/3045.
Harmless and forward-compatible (its future caller lives in options.c),
but the file convention is drifting — worth one line in the runbook,
not a Must-fix.

## Hallucinations / overclaim

None. "Every callee live" holds (query_color, query_attr,
update_inventory all LIVE).

## Density

2 whole functions, caller/callee closure across two C files — small but
complete (closure holds nothing more Open). OK.

## Verification

D-log cites verify.mjs → PASS + REACH-OK ×2 + green/strict/cohort + full
44/44. Re-measured: `hidden-proxy.mjs verify
handler_menu_headings,query_color_attr --base 0ce2fb847~1 --reach-all`
→ 0 blocked (vacuous, expected — D-log says so), smoke 24/24 PASS each
→ REACH-OK, no regressions. Diff grep: no FORCE/DIAG/RNG-log reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
