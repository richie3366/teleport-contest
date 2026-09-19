# Review 1509 — 70089ac6 — cmd.c get_changed_key_binds [campaign 4/7] (D-2550)

## Metadata

- SHA: `70089ac6`
- D-id: D-2550. Next index: 1509.
- Files: `js/cmd.js` (+76: exported `get_changed_key_binds`
  + `strbuf_append` import), `js/options.js` (+7: static import
  + call-site comment flip bare→live),
  `scripts/get-changed-key-binds.test.mjs` (+65, new).
- C locus: `nethack-c/upstream/src/cmd.c:2234–2287`
  (`get_changed_key_binds`, 54 L; `csym.mjs` range, cited as
  that range).

## Intent vs deliverable

Subject promises: the userbind-delta + unbound-defaults loops
in C order with the sbuf caller wired and the NULL display arm
named. Diff delivers exactly that plus a committed test; it
also retires the campaign's deferred `ReferenceError` for this
callee (the strbuf `:9734` call now resolves live —
`all_options_statushilites` remains the last bare identifier).
Promise matches deliverable. No RNG in C; none added.

## Inventory

- New: `get_changed_key_binds(sbuf)` (exported,
  `js/cmd.js:785` per `sym.mjs`, sync). Callees per the
  combined-arm rule: `key2txt` LIVE (`js/dokeylist.js:69`),
  `strbuf_append` LIVE (import extended on the pre-existing
  cmd.js→options.js edge), `cmdbind_get` LIVE
  (`js/dokeylist.js:290`). No local clones added (`sym.mjs`
  notes a pre-existing `key2txt` clone in `js/pager.js:2915`
  — untouched by this SHA, and this port imports the export).
- No deleted or re-pointed symbols → no clone→import audit.

## C ↔ JS fidelity

Loop 1 (`:2248–2267`) vs JS overlay loop: C walks the
`cmdbinds` list most-recent-first. Order equivalence verified
here against C, not taken on trust — `cmdbind_add`
(`cmd.c:2129–2160`): existing key updates **in place** (no
move-to-front), new keys prepend; so list order = reverse of
first-insertion order ≡ JS `[...Map].reverse()` (Map keeps
first-insertion position on re-set). Match. `bind->userbind`
gate ≡ overlay-only iteration (RC parse is the sole writer of
`game.Cmd.binds`). `bind->cmd->key != bind->key` → `ext.key
=== key → continue`. `uchar`/key-0 handling → `& 0xff` +
`!key` skip. The re-match uses the `bind_key` `:2686–2692`
predicate (`ef_txt` case-insensitive match, INTERNALCMD skip)
— verified identical to the live `parsebindings`
(`js/options.js:543–577`), which is also the reason a miss is
impossible. C `Sprintf` newline gating (`sbuf ? "\n" : ""`) →
`emit` closure exact for the sbuf arm; the putstr arm
accumulates `winLines` with the sink named (see below).

Loop 2 (`:2269–2281`) vs JS: `i < extcmdlist_length`
(terminator skipped) ≡ exhausting the terminator-free
generated table; `ec->key && !keys[ec->key]` → `!ec.key`
skip + `cmdbind_get` oracle skip. Oracle equivalence checked:
C `keys[]` = defaults + user nodes incl. removals; JS
`cmdbinds_live` = `build_default_cmdbinds` + overlay where a
falsy overlay name (`parsebindings` "nothing" → null) clears
the default — so `cmdbind_get` returns null exactly where C's
`keys[key]` stays 0, and loop 2 emits `BIND=key:nothing` on
both sides. The `keys[]`-marking side effect of loop 1 has no
other consumer. `BIND=%s:nothing` format exact.

Named (not stubbed): the `:2240–2246`/`:2282–2285` NULL
display tail — sole C NULL caller is `handler_rebind_keys`
(`cmd.c:2442`, unported); `winLines` has no sink yet, with the
future `show_text_pages` path named in the comment. The
CMD_PARAM `(param)` fold is forced by the verified
`parsebindings` strip (named omission at the parser, owned
there — round-trip param loss belongs to that row, not this
one). Loop-1 output *order* can differ from C when a default
key is rebound (C emits at the default node's deep slot, JS
among user binds) — same line set, order-only, semantically
inert on reparse; noted, not queued.

Callers: `options.c:9734` → live `all_options_strbuf` call
wired this commit; `cmd.c:2442` → named. No call from a site
C never calls from.

## Hallucinations / overclaim

Same wording slip as D-2549, not a C-wrong: the subject calls
the new options.js→cmd.js edge "lazy-only", but the diff adds
a top-level **static** import (extending the already-static
reverse edge into a bidirectional static cycle). Substance
holds — `imports.mjs --can` reports the edge safe (hoisted
function, called only inside function bodies; full suite
green) — but "lazy-only" misdescribes it twice running. No
queue row (no behavior at stake); port iters should stop
writing "lazy-only" for static imports.

## Density

One 54-line C function + test, two files, ~80 insertions.
Right-sized per §2b.

## Verification

- D-log: `verify.mjs --fn get_changed_key_binds` → VERIFY:
  PASS (tail pasted verbatim).
- Re-run here: `hidden-proxy.mjs verify get_changed_key_binds
  --base 70089ac6~1 --reach-all` → 0 blocked at baseline and
  working tree (vacuous, honestly reported) + smoke 24 PASS,
  0 regressed → REACH-OK. Matches; unreachable until [7/7].
- `imports.mjs --rulecheck`: clean (re-run this iteration).
- Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed gates
  or hardcoded coordinates.

## Actionable C-wrongs

None. Both loops, the oracle mapping, the predicates shared
with the RC parser, and the caller wiring check out against
pinned C; the NULL arm and CMD_PARAM shape are named in the
map with owners, not silent stubs.

Verdict: **ACCEPT**
