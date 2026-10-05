# Review 2406 — d57340a2a — questpgr str-opt rewire

## Metadata

- SHA: `d57340a2a` (2026-10-05) — D-3488.
- Subject: Open head: impossible audit + questpgr fallback/text/synopsis→
  get_table_str_opt rewire (questpgr.c:524/:543/:549 adapter gap).
- Diff: `js/questpgr.js` (+37/−20: import name + lookup arms + lazy
  synopsis), new `scripts/questpgr-str-opt.test.mjs` (83 lines),
  docs/ledger/scoreboard.
- Review mode: ≤10-function SHA — whole Method per function. Batch manifest
  empty; the rewire rides the Open head per the D-3476…D-3486 precedent. No
  prior review claimed closed.

## Intent vs deliverable (promise vs diff)

Promises: (a) `impossible` re-audited whole, no JS change; (b) three sites
restarted through the live helper on the existing questpgr→dungeon edge
(name added, no new edge): fallback via helper + `if (fb != null)` (C
:526), text converted in the lookup (C :543 before the rawtext arm),
synopsis threaded as synsrc and converted in com_pager_core after the
rawOut arm (C :549 after :544–548); (c) behavior delta is exactly the C
conversion; (d) `get_table_str_opt` flips to `ported` (last unwired site
owned by by-design `nhl_test`).

The diff actually adds: the import name, four `text:` helper reads (one
per entry shape), the synsrc threading (incl. META-table synsrc for
flattened role strings), the fallback helper + `!= null` retry, and the
lazy `:1272` synopsis read. Delivered = promised.

## Inventory

| JS symbol | Kind | C locus | Status |
|---|---|---|---|
| fallback site (:1123) | C call wiring | questpgr.c:522–527 | whole |
| text sites (:1101/:1106/:1132/:1137) | C call wiring | questpgr.c:543 | whole |
| synopsis site (:1272) | C call wiring | questpgr.c:549 | whole |
| `get_table_str_opt` (dungeon.js:388, unchanged) | LIVE import (edge :22 extended) | nhlua.c:1053–1076 | whole (see 2403) |
| `impossible` (display.js:8970) | `audited`, no JS change | pline.c:583–634 | re-verified (see 2403; untouched here) |

## C ↔ JS fidelity

C (questpgr.c:517–570, read at the cited range): miss → msg_fallbacks
read :522–524, pointer-test retry :526; text :543; rawtext arm :544–548
returns before :549; synopsis :549; output :550; `!text` array arm :552.

Branch-by-branch confirm:

- `:524` fallback — `get_table_str_opt(QUEST_MSG_FALLBACKS, msgid, null)`
  + `if (fb != null)` retry: C's :526 pointer test ("" would retry too —
  the old `if (fb)` missed that). Old code also recursed function values
  as msgids; C pcalls them. Exactly C now. OK.
- `:543` text — converted in the lookup, before the rawtext arm, like C.
  Array-form entries read "text" off the entry table itself (nil → NULL),
  exactly C's getfield on a keyless table → the :552 arm runs. Flattened
  strings keep the extractor's :543 answer (no table to read). OK.
- `:549` synopsis — converted in com_pager_core AFTER the rawOut arm via
  the threaded synsrc, exactly where C reads it (the :544–548 arm returns
  before :549). Common flattened strings carry synsrc null → NULL, matching
  C's nil read on a text-only table. OK.
- Equivalence — sources are non-null objects/arrays (miss arm returns
  before the reads; `meta` defaults to `{}`), so `lua_field` ≡ `[key]`;
  classifications match C (helper verified in 2403). OK.
- Common-branch no-retry — C would attempt a fallback for common misses
  too, but msg_fallbacks holds only goal_alt→goal_next and common has
  neither key (QUEST_COMMON re-read: 5 keys + 2 cuss arrays, no goal_*),
  so C's retry provably misses in-tree and both sides return false.
  Outcome-identical; lookup structure otherwise unchanged. OK.
- Census (re-run) — fallbacks 1 string pair; QUEST_COMMON 2 string-field
  objects + 3 bare strings; META `synopsis:` all string literals (0
  non-string hits); generated nemesis `text`/`synopsis`/`output` all
  strings (52 text keys, 0 non-strings). No in-tree behavior change. OK.
- `ported` flip — TRUE. `csym.mjs --callers` enumerates 24 call sites +
  the extern decl; every one is now wired (dungeon 7, nhlua :261, questpgr
  3, sp_lev 12) except nhlua.c:1412, which sits inside `nhl_test`
  (:1400–1419, a test-only `test({x,y})` binding) whose ledger row is
  by-design ("no scored analogue"). Body whole + no shippable caller left
  = correct `ported` with the omit dropped.
- Unreachable corners (pre-existing, behavior-identical old-vs-new): C's
  `if (!text)` :552 and `if (synopsis)` :597 are pointer tests while JS
  uses truthiness, so a `""` text/synopsis takes different arms than C —
  but old and new JS take the SAME arms (`??`/`||` also funneled `""` to
  falsy), and no empty text/synopsis exists in-tree. Debt note only.

Required `sym.mjs` output (diff re-points the reads to the import):

```text
get_table_str_opt js/dungeon.js:388   sync
```

Import-edge check: `imports.mjs --can js/questpgr.js js/dungeon.js
get_table_str_opt` → "ALREADY: questpgr.js already statically imports
dungeon.js. No new edge needed." No new edge; helper is a hoisted
function used at call time (no TDZ read).

## Hallucinations / overclaim

None. The C-order claims (:543-before-rawtext, :549-after) match the C
arms read above; the common-no-retry justification reproduces from the
tables; the `ported` flip survives a full 24-site caller enumeration.

## Density

Breadth-phase small SHA: manifest empty (nothing to cover); impossible
audit + 3-site rewire ride the Open head per precedent. This SHA closes
the get_table_str_opt caller series (D-3467…D-3488). Per-function verdicts:

- 3 call-site rewires — whole :524/:543/:549 ports, order kept, census
  clean. OK.
- `impossible` `audited` — body really whole modulo named Rule #2 omits
  (verified in 2403; untouched here). OK.
- `get_table_str_opt` `ported` — TRUE (body whole, 23/24 callers wired,
  last owned by-design). OK.
- No `Left open:`, no bundled Must-fix (Must-fix ×7 deferred per declared
  override, still queued).

Banned-pattern grep on the `js/` hunk: 0 hits. Rule #2 clean (cited in
2403; import name only, no new edge).

## Verification

- D-log: `verify.mjs --fn impossible,get_table_str_opt` → syntax/rule2
  PASS, 2× hidden note (none blocked), 2× REACH-OK (smoke 24/24), green
  2/2, strict ×2, cohort 7/7, full 44/44 (manual: questpgr.js not in the
  shared auto-full list); node:test 18/18 (three files).
- Audit re-measure (`hidden-proxy.mjs verify
  impossible,get_table_str_opt --base d57340a2a~1 --reach-all`): 0 blocked
  both functions (vacuous, correctly labeled); smoke 24 PASS / 0 regressed
  → REACH-OK each. No REGRESSED session. Matches the D-log.
- `node --test scripts/questpgr-str-opt.test.mjs`: 6/6 pass on this tree.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
