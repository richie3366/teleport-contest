# Review 2195 — 6c82dd6e1 — region gas family: live selection_getpoint + impossible arm

Metadata: SHA `6c82dd6e1`, D-3234, js/region.js only (+10/−8), 5-fn cluster
(all region.c gas-creation closure). Parent baseline `6f6236385`.

## Intent vs deliverable

Subject promises: "selection membership via live export +
`create_gas_cloud` impossible arm (coverage)". The D-log scopes it
honestly: coverage PARTIAL on the head, two real C gaps, no stale, and
an explicit below-~80-insertions disclosure. The diff delivers exactly
that: import-line extension, one call-site swap, one impossible arm,
one deleted local. No scope drift.

## Inventory

- `create_gas_cloud_selection` (js/region.js:1215, call :1225): loop
  membership `selection_getpoint_sel(...)` → live `selection_getpoint`
  from `./mklev.js` (existing edge extended, line 58).
- Deleted local `selection_getpoint_sel` (sole caller was :1225).
- `create_gas_cloud` (js/region.js:1129, arm :1144–1148): bare clamp →
  `await impossible("create_gas_cloud: cloud too large (...)!")` +
  clamp, C order.
- Untouched-but-declared-ported: `make_gas_cloud` (:608),
  `is_hero_inside_gas_cloud` (:388), `create_region` (:214).

## C ↔ JS fidelity

`create_gas_cloud_selection` — C region.c:1312–1336. JS keeps the C
shape (bounds :1323, create_region :1325, x-outer/y loop :1326–1332,
make :1334). The swapped callee is the point: C selvar.c:167–178
guards `!sel || !sel->map` (:172–173) and bounds-tests
`sel->wid/sel->hei` (:174–175). The live JS export (js/mklev.js:30149)
does `!sel || !sel.pts`, sel-scoped `wid ?? COLNO / hei ?? ROWNO`,
Set-backed membership — a faithful rendering of the C body (the `??`
defaults mirror `selection_new`; C always has wid/hei set). The
deleted local tested COLNO/ROWNO, so for sub-selections it read
out-of-sel points as members — a genuine D-1849-class C-wrong, now
gone. Verdict: exact.

`create_gas_cloud` — C region.c:1211–1309. Singleton gate
(:1233–1236: `!mon_moving && u_at && size==1 && (!dmg ||
m_poisongas_ok==OK)`) is live in JS (:1138–1143; m_poisongas_ok is the
documented D-1159 local, pre-existing). New arm matches :1238–1241
(impossible text + `%d` value, then clamp). BFS/Fisher-Yates
(:1243–1293): `rn2(i)` shuffle, `nvalid==4 && !rn2(2)` skip, dup-scan,
both `newidx >= cloudsize` breaks — all present in C order. Tail
(:1297–1307): create_region(NULL,0), 1×1 rects, `ttl = rn1(3,4)`,
`(ttl*cloudsize)/newidx` via Math.trunc (non-negative, exact), make.
RNG call-for-call. Verdict: exact.

`make_gas_cloud` — C region.c:1180–1205 (staticfn). JS :608: heros_fault
gate (:1187–1188), inside/expire tags, arg.a_int=damage, damage-gated
glyph, add_region (:1195), envelop gate (:1197–1204) with exact
"You are enveloped in a cloud of %s!" text and
`last_msg=PLNMSG_ENVELOPED_IN_GAS`. Disclosed deltas: glyph tags
(port idiom D-1137), pline rendering of You (text-identical),
inert `game.gi?.in_mklev` conjunct (`game.gi` is always `{}`, so the
conjunct is always true). All three pre-existing and D-log-named.
Verdict: exact modulo named idiom.

`is_hero_inside_gas_cloud` — C region.c:1167–1177. JS :388: region
scan, `hero_inside && inside_f==INSIDE_GAS_CLOUD`. Exact.

`create_region` — C region.c:78–127. JS :214: bbox seed/expand,
rects copy, ttl −1, NO_CALLBACK ×6, clear_hero_inside +
clear_heros_fault, zero monster list, arg 0 (alloc/memset folded to
the literal — GC, D-2297). Exact.

Helper classification: `selection_getpoint` = C callee now LIVE
(deleted clone confirmed gone: `sym.mjs selection_getpoint_sel` →
NOT FOUND; `sym.mjs selection_getpoint` → js/mklev.js:30146 sync).
`impossible` = live import, pre-existing edge. No new clones, no
stubs. Callers: D-log lists all 14 C `create_gas_cloud` sites with
JS wires and both in-region callers of the other four; spot-checked
sp_lev.c:4955/4957 → js/mklev.js:1119/1121 — present. No caller C
never calls from.

## Hallucinations / overclaim

None. The D-log says "no corpus session blocked (coverage rows,
expected)" — explicitly not a corpus PASS claim — and the vacuous
verify note agrees. The below-guideline size is disclosed with the
closure-whole justification, not hidden.

## Density

5-function single-file callee closure, §10.17-shaped (head + sibling
+ shared staticfns + create_region), one C file, ≤10 functions, no
Must-fix bundled. Each function has its own C-locus, Callers, Verify
and Named-omissions sub-bullets and its own `Ledger:` entry. The
~18-line js diff is below the ~80 guideline; the D-log invokes the
stated exception (head's file held no other queue-eligible row; the
two further closure names are measured-ok, hence not Open). Taken at
face value — the queue block did drain to 0 rows after the next
commit, corroborating a dry well.

## Verification

- Banned-pattern grep on the js diff (FORCE/DIAG/getRngLog/seed/coords):
  clean. `imports.mjs --rulecheck`: "Rule #2 clean".
- Re-measured per fn (all five in one call):
  `hidden-proxy.mjs verify ... --base 6c82dd6e1~1 --reach-all` →
  all five "0 session(s) blocked" (vacuous, as logged) and
  REACH-OK: create_gas_cloud 60/60 reaching baseline-PASS, other
  four smoke 24/24 each. Zero regressed. Matches the D-log numbers
  exactly; no REGRESSED session, no false PASS claim.
- Green/strict/cohort/full claims are D-log-stated; the re-run
  covers the corpus half. No seed/step/coordinate reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
