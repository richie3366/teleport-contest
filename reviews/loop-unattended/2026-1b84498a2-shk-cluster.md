# Review 2026 — 1b84498a2 — shk.c breadth cluster (6 fns + 9 stale)

Metadata: SHA `1b84498a2`, D-3066, js/shk.js + js/apply.js + js/do.js +
js/lev_json.js + js/bones.js (~189 ins). Cluster: `onbill`, `restshk`,
`cad`, `pacify_shk`, `rouse_shk`, `use_unpaid_trapobj` — all C-home
shk.c (use_unpaid_trapobj's JS home is apply.js, matching its C caller).

## Intent vs deliverable

Promise: port the 6, retire 9 same-file stale. Diff delivers exactly
that: onbill restructured to C order; new exported restshk + lev_json
wiring + ghostly threading; cad rewritten on live poly_gender with the
clone deleted; pacify_shk price-undo walk; rouse_shk async + 6 awaits;
use_unpaid_trapobj full verbalize arm; assign_level/muteshk newly
exported. Kept.

## Inventory (per function)

- `onbill` (js/shk.js:3769, sync, file-local): restructured, both
  impossible arms, `silent` honored.
- `restshk` (NEW export js/shk.js:271, sync) + lev_json deserMon wiring
  + bones ghostly opt.
- `cad` (js/shk.js:1878, sync, file-local): rewritten; local clone
  `poly_gender_shk` DELETED → live `poly_gender` import.
- `pacify_shk` (js/shk.js:245, sync, file-local): surcharge price-undo
  walk added.
- `rouse_shk` (js/shk.js:4950, now async): verbosely pline + 6 site
  awaits (rob_shop/sellobj/inherits×3/dopay).
- `use_unpaid_trapobj` (js/apply.js:4902, async): full verbalize arm.
- Helpers: `muteshk`, `assign_level` newly exported (were file-local);
  `strncmpi`/`poly_gender`/`find_objowner` imports are pre-existing
  live exports. No new clones, no stubs.

Required `sym.mjs` paste for deleted/re-pointed symbols:

```text
poly_gender      js/polyself.js:912   sync
             !! ALSO 5 LOCAL CLONE(S) in 5 files — IMPORT the export; do NOT add another
               js/apply.js:667  js/detect.js:269  js/dokick.js:219  js/mhitm.js:2077  js/sounds.js:1226
muteshk          js/shk.js:227   sync
assign_level     js/do.js:1338   sync
             !! ALSO 3 LOCAL CLONE(S) in 3 files — IMPORT the export; do NOT add another
               js/dig.js:1648  js/dungeon.js:1317  js/potion.js:1789
restshk          js/shk.js:271   sync
find_objowner    js/shk.js:2492   sync
```

## C ↔ JS fidelity (per function)

`onbill` — C shk.c:1135–1155: shkp-guarded billct walk, paid-on-bill
impossible, fallthrough unpaid-not-on-bill impossible with the
!shkp ternary. JS matches branch-for-branch in C order. `bill_p ||
bill` fallback vs C's bare `bill_p`: benign (poisoned -1000 is truthy
so it safely no-matches; C would UB). Callers: 22 C call sites, all
in-file; JS has 23 `onbill(` lines (def + sites) — "all wired" holds
(the D-log "~15" is an undercount, not an overclaim). Confirm.

`restshk` — C shk.c:289–305: dlevel gate ✓, bill_p re-alias unless
-1000 ✓, ghostly assign_level + ANGRY&&strncmpi→pacify(TRUE) ✓.
Sole C caller restore.c:447 → `if (mtmp.isshk) restshk(mtmp, ghostly)`
(js/lev_json.js:212), ghostly TRUE from bones (:650), FALSE on
save/load. New lev_json→shk edge closes a module cycle
(shk→do→lev_json pre-exists) but every call is runtime-deferred —
no TDZ evidence, suite green. Confirm.

`cad` — C shk.c:5907–5941: demon→3 switch, 4 nouns, impossible
default + 'thing', altusage `"X!  ` with highc. JS matches all arms;
altusage string builds the identical bytes (buffer reuse unobservable,
named). Clone deletion is a real fix: live `poly_gender`
(js/polyself.js:912) returns 2 for neuter, the deleted clone returned
0/1. Callers 3/3 at the D-log lines (:831/:2215/:3734). Confirm.

`pacify_shk` — C shk.c:1343–1358: NOTANGRY ✓, surcharge=FALSE before
the walk ✓, `(price+3)/4` floor undo over billct ✓ (`bill_p||bill`
benign as onbill). Callers 5/5 at D-log lines (:281 new restshk,
:676/:2009/:2229/:5136). Confirm.

`rouse_shk` — C shk.c:1380–1392: helpless gate (early-return ≡ C's
wrap) ✓, verbosely&&canspotmon pline with Shknam + wakes/can-move ✓,
3 flag writes ✓. All 6 JS sites awaited; C↔JS caller map (rob_shop/
dopay/inherits×3/sellobj) verified at the D-log lines. Confirm.

`use_unpaid_trapobj` — C shk.c:6100–6114: unpaid gate ✓, !Deaf ✓,
find_objowner + !muteshk ✓, SetVoice(shkp,0,80,0) ✓, verbalize ✓,
bill_dummy_object ✓ (live async, awaited). Sole caller apply.c:2909
→ js/apply.js:5179 awaited ✓. All callees LIVE (Deaf_hero local
:1796, SetVoice/verbalize imports, muteshk/find_objowner this
commit). Confirm.

9 stale: the two symbol-less rows resolve to documented split names —
shk_owns ≡ `shk_owns_prefix` (full predicate verified at
js/shk.js:1099) and mon_owns ≡ inline in `shk_your`
(js/objnam.js:2773, OBJ_MINVENT→s_suffix verified); other 7 have JS
symbols. Confirm.

## Hallucinations / overclaim

None. "6 needed code, 9 already complete" verified; caller counts
match or exceed the claims.

## Density

6 whole functions, one C file, ≤10, no Must-fix bundled — §2b-shaped.
Per-function verdicts: onbill ACCEPT, restshk ACCEPT, cad ACCEPT,
pacify_shk ACCEPT, rouse_shk ACCEPT, use_unpaid_trapobj ACCEPT.
`Ledger:` covers all 15 rows (jsonl in-stat).

## Verification

Re-measured `hidden-proxy verify
onbill,restshk,cad,pacify_shk,rouse_shk,use_unpaid_trapobj --base
1b84498a2~1 --reach-all`: all six 0-blocked (correctly labelled
vacuous; queue cited no blocks) + fixed smoke 24 PASS, 0 regressed →
REACH-OK each; no REGRESSED session. Diff ban-grep clean;
`imports.mjs --rulecheck` clean (see 2024). Confirm.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
