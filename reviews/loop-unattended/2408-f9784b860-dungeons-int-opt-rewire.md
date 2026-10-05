# Review 2408 — f9784b860 — dungeons int-opt rewire

## Metadata

- SHA: `f9784b860` (2026-10-05) — D-3492.
- Subject: Open head: impossible audit + dungeons
  range/entry/chance→get_table_int_opt rewire (dungeon.c:1011/:1013/:1014
  ??-gap).
- Diff: `js/dungeon.js` (+8/−3 in `init_dungeon_dungeons`), new
  `scripts/dungeon-dungeons-int.test.mjs`, docs/ledger/scoreboard.
- Review mode: ≤10-function SHA — whole Method per function. Batch manifest
  empty; the rewire rides the Open head per the D-3476…D-3488 precedent. No
  prior review claimed closed.

## Intent vs deliverable (promise vs diff)

Promises: (a) `impossible` re-audited whole, no JS change; (b) three sites
restarted through the live whole helper in the same module, in place
(already C order :1011→:1012→:1013→:1014→:1015); (c) behavior delta is
exactly the C conversion (`(int) luaL_checkinteger`).

The diff actually adds: three helper calls with the C-order comment;
deletes the three `??` adapters. No import change (same module).
Delivered = promised.

## Inventory

| JS symbol | Kind | C locus | Status |
|---|---|---|---|
| 3 sites (:961/:963/:964) | C call wiring | dungeon.c:1011/:1013/:1014 via :996–1017 | whole |
| `get_table_int_opt` (dungeon.js:351, unchanged) | LIVE same-module export | nhlua.c:1028–1039 | whole |
| `impossible` (display.js:8970) | `audited`, no JS change | pline.c:583–634 | re-verified (see 2403; untouched) |

## C ↔ JS fidelity

C (dungeon.c:996–1017, read at the cited range): name :1006, bonetag
:1008, protofile :1009, base :1010, range :1011 (def 0), align :1012,
entry :1013 (def 0), chance :1014 (def 100), flags :1015, lvlfill :1016,
themerooms :1017. Helper C (nhlua.c:1028–1039 via `csym.mjs`):
ret=defval :1031, getfield :1033, nil-check :1034, `(int)
luaL_checkinteger` :1035, pop :1037, return :1038.

Branch-by-branch confirm:

- Helper — JS :351–359 replays :1031→:1038 line-for-line (`|0` on defval
  is a no-op for 0/0/100). Conversion runs through canonical
  `luaL_checkinteger_unpacked(v, 32)` (nhlua.js:65): integral
  floats/numeric strings convert, fractions and non-numerics throw like
  argerror, beyond-int32 truncates via asIntN(32) like the `(int)` cast.
  Functions are non-nil on both sides and both throw. OK.
- All three reads — defaults 0/0/100 match C. `entry` is a non-null
  object past the caller's table gate (dungeon.js:1700–1703 throws on
  non-tables), so `lua_field` ≡ `entry[name]`; nil/non-nil
  classifications identical. OK.
- Read order — JS range→align→entry→chance→flags is exactly C's
  :1011→:1012→:1013→:1014→:1015. In-place; no reorder needed. OK.
- Conversion delta — integers unchanged incl. negatives; absent stays
  defval; integral floats and numeric strings now convert (old: flowed
  through); direct non-numerics now throw (old: passed as garbage into
  range/entry/chance). Exactly C. OK.
- Entry census (re-run) — generated `dungeonProto` has 9 entries: range
  5/5/2/2 + 5 absent; entry −1 (Sokoban, Vlad's), −2 (Planes) + 6 absent;
  chance all absent (→100). All integers-or-absent: no in-tree behavior
  change. Matches the D-entry Callers audit exactly. OK.
- Omit arithmetic — 25 sites listed = 4+2+4+1+1+1+6+6 by group; wired 18
  = 15 (D-3485) + 3. Consistent. OK.
- Ledger write — this SHA's own row carries its own omit text, unclipped,
  no paste (the later impossible-paste corruption at fb381cf65 is already
  a queued Must-fix, not this SHA's). OK.

Required `sym.mjs` output (diff re-points three local reads to the
same-module export):

```text
get_table_int_opt js/dungeon.js:351   sync
```

No symbol deleted; no import change (same module).

## Hallucinations / overclaim

One prose nit (same class as 2405): the D-entry parenthetical cites
"name :1007" — :1007 is the TODO comment; the name read is :1006. The
three rewired cites (:1011/:1013/:1014) are exact and the code order is
C-correct. Corpus framing is the correct vacuous note.

## Density

Breadth-phase small SHA: manifest empty (nothing to cover); impossible
audit + 3-site rewire ride the Open head per precedent. This SHA opens
the int_opt remainder series (str_opt closed at D-3488). Per-function
verdicts:

- 3 call-site rewires — whole :1011/:1013/:1014 ports, order kept, census
  clean. OK.
- `impossible` `audited` — body really whole modulo named Rule #2 omits
  (verified in 2403; untouched here). OK.
- `get_table_int_opt` partial — helper unchanged (whole); 25-site omit
  accurate and unclipped. OK.
- No `Left open:`, no bundled Must-fix (Must-fix ×7 deferred per declared
  override, still queued).

Banned-pattern grep on the `js/` hunk: 0 hits. Rule #2 clean (fresh
`--rulecheck` this iteration, see 2407; no new imports).

## Verification

- D-log: `verify.mjs --fn impossible,get_table_int_opt` → syntax/rule2
  PASS, 2× hidden note (none blocked), 2× REACH-OK (smoke 24/24), green
  2/2, strict ×2, cohort 7/7, manual full 44/44 (dungeon.js not in the
  shared auto-full list); node:test 18/18 (three files).
- Audit re-measure (`hidden-proxy.mjs verify
  get_table_int_opt,impossible --base f9784b860~1 --reach-all`): 0
  blocked both functions (vacuous, correctly labeled); smoke 24 PASS / 0
  regressed → REACH-OK each. No REGRESSED session. Matches the D-log.
- `node --test scripts/dungeon-dungeons-int.test.mjs`: 6/6 pass on this
  tree.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
