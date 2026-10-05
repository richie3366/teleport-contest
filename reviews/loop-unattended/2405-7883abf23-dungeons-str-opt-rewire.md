# Review 2405 — 7883abf23 — dungeons str-opt rewire

## Metadata

- SHA: `7883abf23` (2026-10-05) — D-3486.
- Subject: Open head: impossible audit + dungeons
  bonetag/protofile/lvlfill/themerooms→get_table_str_opt rewire
  (dungeon.c:1008/1009/1016/1017 ||-gap).
- Diff: `js/dungeon.js` (+11/−4 in `init_dungeon_dungeons`), new
  `scripts/dungeon-dungeons-str.test.mjs` (66 lines), docs/ledger/scoreboard
  (+ journal rotation crumb bundle).
- Review mode: ≤10-function SHA — whole Method per function. Batch manifest
  empty; the rewire rides the Open head per the D-3467…D-3484 precedent. No
  prior review claimed closed.

## Intent vs deliverable (promise vs diff)

Promises: (a) `impossible` re-audited whole, no JS change; (b) four sites
restarted through the live whole helper in the same module, placed to keep
C's pcall order (bone→proto after name/before base; fill/rooms after
flags); (c) behavior delta is exactly the C conversion (emptystr default).

The diff actually adds: four helper calls with C comments; deletes the
four `|| ''` adapters (which also read in non-C order). No import change
(same module). Delivered = promised.

## Inventory

| JS symbol | Kind | C locus | Status |
|---|---|---|---|
| 4 sites (:952–953, :961–962) | C call wiring | dungeon.c:1008/:1009/:1016/:1017 via :996–1017 | whole |
| `get_table_str_opt` (dungeon.js:388, unchanged) | LIVE same-module export | nhlua.c:1053–1076 | whole (see 2403) |
| `impossible` (display.js:8970) | `audited`, no JS change | pline.c:583–634 | re-verified (see 2403; body untouched by this SHA) |

## C ↔ JS fidelity

C (dungeon.c:996–1017, read at the cited range): name :1006 (mandatory
`get_table_str`), bonetag :1008, protofile :1009 (both `emptystr`
default), base :1010, range :1011, align :1012, entry :1013, chance :1014,
flags :1015, lvlfill :1016, themerooms :1017 (both `emptystr`).

Branch-by-branch confirm:

- All four reads — `get_table_str_opt(entry, key, emptystr)` with
  `emptystr = ''` (dungeon.js:176), matching C's `decl.h emptystr[]`.
  `entry` is a non-null object past the caller's table gate (init_dungeons
  throws on non-tables), so `lua_field` ≡ `entry[key]`; classifications
  match C (helper verified in 2403). OK.
- Pcall order — JS: bonetag→protofile after name and before base, then
  base/range/align/entry/chance/flags, then lvlfill→themerooms: exactly C's
  :1008→:1009→…→:1015→:1016→:1017. The old code read
  fill/themerms/proto/bone (non-C order) and is deleted. OK.
- Conversion delta — strings verbatim and absent→`''` on both sides
  (unchanged); functions now pcall with optstring conversion (old: flowed
  through as objects — `charCodeAt` on a function would TypeError);
  falsy/truthy direct non-strings now throw like nhl_error (old: degraded
  to `''` or passed as garbage into boneschar/protoname/fill_lvl/themerms).
  Exactly C. OK.
- Entry census (re-run) — generated `dungeonProto` has 9 entries; all four
  keys are strings-or-absent in every entry (node census, 0 non-strings).
  (Nested branch-level `bonetag` keys belong to the :817 read, wired
  D-3175 — a different function.) No in-tree behavior change. OK.
- Untouched pre-existing gap (not this SHA's): `dgn_name = entry.name`
  still raw-reads where C :1006 `get_table_str` is mandatory
  (throws/converts). Out of scope; the D-entry never claims it.

Required `sym.mjs` output (diff re-points four local reads to the
same-module export):

```text
get_table_str_opt js/dungeon.js:388   sync
```

No symbol deleted; no import change (same module).

## Hallucinations / overclaim

None material. One prose citation nit: the subject/D-entry cite "name
:1007" — :1007 is the `TODO: accept single char` comment; the name read is
:1006. The code order is C-correct regardless. Corpus framing is the
correct vacuous note.

## Density

Breadth-phase small SHA: manifest empty (nothing to cover); impossible
audit + 4-site rewire ride the Open head per precedent. Per-function
verdicts:

- 4 call-site rewires — whole :1008/:1009/:1016/:1017 ports, order fixed,
  census clean. OK.
- `impossible` `audited` — body really whole modulo named Rule #2 omits
  (verified in 2403; untouched here). OK.
- `get_table_str_opt` partial — helper unchanged (whole); 4-caller omit
  accurate and unclipped. OK.
- No `Left open:`, no bundled Must-fix (Must-fix ×7 deferred per declared
  override, still queued).

Banned-pattern grep on the `js/` hunk: 0 hits. Rule #2 clean (cited in
2403; no new imports).

## Verification

- D-log: `verify.mjs --fn impossible,get_table_str_opt` → syntax/rule2
  PASS, 2× hidden note (none blocked), 2× REACH-OK (smoke 24/24), green
  2/2, strict ×2, cohort 7/7, full 44/44 (manual: dungeon.js not in the
  shared auto-full list); node:test 24/24 (four files).
- Audit re-measure (`hidden-proxy.mjs verify
  impossible,get_table_str_opt --base 7883abf23~1 --reach-all`): 0 blocked
  both functions (vacuous, correctly labeled); smoke 24 PASS / 0 regressed
  → REACH-OK each. No REGRESSED session. Matches the D-log.
- `node --test scripts/dungeon-dungeons-str.test.mjs`: 6/6 pass on this
  tree.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
