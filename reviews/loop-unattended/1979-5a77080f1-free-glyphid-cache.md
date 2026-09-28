# Review 1979 — 5a77080f1 — free_glyphid_cache C-order re-port

Metadata: SHA `5a77080f1` (D-3019). Scored diff: `js/glyphs.js` only
(+16/−3, restart of one export). Subject promises: replace the 2-line GC
shorthand with the C-order body (guard, per-entry id release over the
size bound, table release + NULL); wire the one live caller, name five.

## Intent vs deliverable

Promise: per-entry `id = null` loop + table null in C order, stale
`:353–366` cite fixed to `:355–369`, 1 caller wired + 5 named.
Diff actually adds exactly that. Promise kept.

## Inventory

- `free_glyphid_cache` (glyphs.js:185, exported — C `glyphs.c:354–369`
  global): restarted.

## C ↔ JS fidelity

### Body — verdict: exact-C, ACCEPT

C (`glyphs.c:354–369`, csym range):

```c
if (!glyphid_cache)
    return;
for (idx = 0; idx < glyphid_cache_size; ++idx) {
    if (glyphid_cache[idx].id) {
        free(glyphid_cache[idx].id);
        glyphid_cache[idx].id = (char *) 0;
    }
}
free(glyphid_cache);
glyphid_cache = (struct glyphid_cache_t *) 0;
```

JS mirrors it line-for-line: null guard (`:359–360`), `for` over
`glyphidCacheSize` (`:361`), per-entry `if (id)` (`:362`) → `id = null`
(`:363–364`, JS analogue of `free` + `= 0`; GC reclaims the string),
table `= null` (`:367–368`, analogue of `free` + `= NULL`). Range-safety
claim verified in situ, not trusted: `init_glyph_cache` (glyphs.js:166)
fills exactly `glyphidCacheSize` entries, so the index stays in range
like C, and nothing else mutates the array length (only `id` fields).
No live callees in C (only `free`), none in JS. RNG: none. Confirm.

### Callers — 1 wired + 5 named, verdict: ACCEPT

All 6 C sites from `--callers`:

```text
nethack-c/upstream/src/glyphs.c:317  free_glyphid_cache();
nethack-c/upstream/src/options.c:4230  free_glyphid_cache();
nethack-c/upstream/src/options.c:7378  free_glyphid_cache();
nethack-c/upstream/src/save.c:1179  free_glyphid_cache();
nethack-c/upstream/src/symbols.c:1077  free_glyphid_cache();
nethack-c/upstream/src/wizcmds.c:1979  free_glyphid_cache();
```

Wired: `fill_glyphid_cache` parse-fail arm (`glyphs.c:317`) →
js/glyphs.js:762, arm shape verified in situ (matches C `:316–319`:
`if (!parse_id(...)) free_glyphid_cache()`). Named in the D-log Callers
table with the blocking reason each: `optfn_symset` do_handler arm
(`options.c:4226–4230` — `handler_symset`/`do_symset` unported),
`initoptions_finish` (`options.c:7378` — no JS function),
`freedynamicdata` (`save.c:1179` — save-freeing infra, never ported per
NOTES guard), `do_symset` (`symbols.c:1077` — no live JS port),
`wiz_custom` (`wizcmds.c:1979` — no JS port). Complete wiring table, no
silent unwired caller.

## Hallucinations / overclaim

None. "Every arm ported, no live callee" is accurate. Diff grep: no
banned patterns.

## Density

Breadth-phase: one whole function (9 C lines), minimal diff. Below the
80-insertion guideline but whole-function-complete with nothing more Open
in its closure — not a padding case, no quality risk.

## Verification

Re-measured (`hidden-proxy.mjs verify free_glyphid_cache
--base 5a77080f1~1 --reach-all`):

```text
verify free_glyphid_cache: 0 session(s) blocked at baseline (vacuous, honest)
smoke free_glyphid_cache: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
```

Zero REGRESSED. Matches D-log.

## Actionable C-wrongs

None.

Ledger: `free_glyphid_cache` ported, REACH-OK via smoke.
Verify lines: hidden vacuous (honest) + smoke + green/cohort per D-log,
re-run confirms.

Verdict: **ACCEPT**
