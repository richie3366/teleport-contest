# Review 2307 — c7c586e3c — histemple_at canonical export + rewire

Metadata: SHA `c7c586e3c`, D-3351, C `priest.c:152–158`
(staticfn), JS live `js/priest.js:88` (new export, body unchanged).
Stat: `priest.js +6/-6`, `shk.js +14/-14`, `teleport.js +15/-15`;
no new test file (full `verify.mjs` tail cited instead).

Intent vs deliverable: subject promises "histemple_at canonical
export + shk/teleport rewire". Diff actually: exports the priest.js
local unchanged, extends the ALREADY teleport→priest edge, adds 1
new shk→priest edge, deletes both out-of-home clones. Matches
promise.

Inventory: 1 function: `histemple_at` (1 canonical port + 2
clone→import). Deleted clones are **clones** (textually identical
to live). Callees `in_rooms`/`on_level` are **LIVE**. No stubs.
Teleport's `has_shrine`/`inhistemple` clones stay local, named out
of scope in the message.

C ↔ JS fidelity: C (`priest.c:152–158`, via `csym.mjs`):

```c
return (boolean) (priest && priest->ispriest
                  && (EPRI(priest)->shroom == *in_rooms(x, y, TEMPLE))
                  && on_level(&(EPRI(priest)->shrlevel), &u.uz));
```

No RNG. Live JS (`js/priest.js:88–96`): same conjunction with
null-guards (`!priest`, `!epri`, `!rooms` — C would crash on
those; benign), `charCodeAt(0)` for `*in_rooms`, live `on_level`.
Branch-by-branch confirm. Behavior-identical: both deleted clones
are line-for-line the live body. C is staticfn with in-file
callers only (`--callers`: priest.c:167/186/400); the JS sites
(shk.js pri_move, teleport.js inhistemple) are the JS homes of
those C functions, so the rewire crosses no C boundary.

Hallucinations / overclaim: none on fidelity. One test-
maintenance miss (not a C-wrong): extending the teleport.js
priest import breaks the D-3347 `mon-aligntyp-rewire.test.mjs`
exact-line regex (see review 2303) — this SHA should have relaxed
that regex. Substance still holds; noted, not queued.

Density: single-function canonical port + 2-file rewire; one
fidelity block, one `Ledger: histemple_at` entry. Verdict for the
function: ACCEPT.

Verification: `hidden-proxy verify histemple_at --base c7c586e3c~1
--reach-all` → "0 session(s) blocked (0 at baseline, 0 working)" +
"no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0
regressed → REACH-OK"; matches the D-log's full `verify.mjs` tail
(syntax 3 files, rule2, green 2/2, strict ×2, cohort 7/7), queue
row cited 0 blocks. `--can` shk/teleport →priest both ALREADY
now (shk edge new at commit time). Diff grep: no banned patterns.
`sym.mjs` output (required paste):

```text
histemple_at     js/priest.js:88   sync
```

Single live definer, clone count 0.

Actionable C-wrongs: none.

Verdict: **ACCEPT**
