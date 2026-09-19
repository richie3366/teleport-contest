# Review 1532 — d56627bd — pline.c raw_printf/vraw_printf (D-2573)

## Metadata

- SHA: `d56627bd`
- D-id: D-2573. Next index: 1532.
- Files: `js/display.js` (+45: exported `raw_printf`, file-local `vraw_printf`, module-local `_early_raw_messages`), `js/files.js` (+29/−~8: two caller wirings + JSDoc updates, 1 import join).
- C locus: `nethack-c/upstream/src/pline.c:548–558` (`raw_printf`) + `:562–581` (`vraw_printf`, staticfn; both `csym.mjs` ranges); callers `version.c:730–732` (uptodate) + `:774–777` (compare_critical_bytes).

## Intent vs deliverable

Subject promises: whole-body port of both functions in C order + wiring the two version-check callers, with `raw_print` sink / remaining callers / `ge` consumers map-named. Diff delivers that. Promise matches deliverable.

## Inventory

- New: `raw_printf(fmt, ...args)` (exported sync, `js/display.js:7821`; `sym.mjs` single export), `vraw_printf(fmt, args)` (file-local; `sym.mjs` single local — correct, C is `staticfn`), `_early_raw_messages` (module-local counter).
- Import join: `raw_printf` into files.js's existing display.js import (`imports.mjs --can`: ALREADY, no new edge).
- Callees: `vpline_expand` (live; covers expansion), `execplinehandler` (live), no RNG. `raw_print` text sink is OMIT (map-named — no pre-window stdout channel in dual-runtime ESM; the vpline `:243–249` raw path is the cited precedent).
- No deleted symbols.

## C ↔ JS fidelity

`raw_printf` vs C `:548–558`: va-forward → `vraw_printf(fmt, args)` ✓; second `early_raw_messages++` gated on `!beyond_savefile_load` ✓ — one call adds exactly 2 pre-load / 0 after, matching C's two count sites (`:556–557` + `:579–580`) ✓. `vraw_printf` vs C `:562–581`: `%`-gated expansion ✓ (C's BIGBUFSZ-then-BUFSZ two-stage chop collapses to one `slice(BUFSZ-1)` — same prefix since BUFSZ < BIGBUFSZ); chop without last-3 preservation ✓ (the distinction from vpline is even cited); `execplinehandler` at the C position ✓; first count ✓. `_early_raw_messages` is write-only (3 sites, no readers) — correct, its consumers (restore.c:933 pause, unixmain/windmain pauses) are unported platform paths, named. Callers, both exact against version.c: `:730–732` format + `critical_sizes[idx]` fields (resolved the int-vs-pointer read: `idx_1st_mismatch` is a plain int at `:721`, so `CRITICAL_SIZES[idx_holder.value]` is exactly right) with the `:728–729` double gate ✓; `:774–777` format + `file_csc_count`/`SIZE` args with the `!quietly` gate inside the count arm ✓ (stays dead via the feed omit — honestly noted, not presented as live).

## Hallucinations / overclaim

None. The D-log says "arm stays dead" for the compare site and names every remaining caller family instead of claiming full wiring.

## Cited evidence

C pair (`pline.c:548–581`, via `node scripts/csym.mjs raw_printf` + `vraw_printf`):

```c
void
raw_printf(const char *line, ...)
{
    va_list the_args;
    va_start(the_args, line);
    vraw_printf(line, the_args);
    va_end(the_args);
    if (!program_state.beyond_savefile_load)
        ge.early_raw_messages++;
}
staticfn void
vraw_printf(const char *line, va_list the_args)
{
    char pbuf[BIGBUFSZ]; /* will be chopped down to BUFSZ-1 if longer */
    if (strchr(line, '%')) {
        (void) vsnprintf(pbuf, sizeof(pbuf), line, the_args);
        line = pbuf;
    }
    if ((int) strlen(line) > BUFSZ - 1) {
        if (line != pbuf)
            line = strncpy(pbuf, line, BUFSZ - 1);
        /* unlike pline, we don't futz around to keep last few chars */
        pbuf[BUFSZ - 1] = '\0'; /* terminate strncpy or truncate vsprintf */
    }
    raw_print(line);
    execplinehandler(line);
    if (!program_state.beyond_savefile_load)
        ge.early_raw_messages++;
}
```

Double-count check: one `raw_printf` call increments exactly twice pre-load (once per function) — JS `vraw_printf` counts at `:579–580`-position and `raw_printf` at `:556–557`-position ✓. The two-stage chop (BIGBUFSZ then BUFSZ-1) collapses to one `slice(BUFSZ-1)` with the same prefix (BUFSZ < BIGBUFSZ) ✓.

Caller formats verbatim vs `version.c` (read directly, not via the wrong-file `files.c` lines):

```text
:730–732  raw_printf("comparison of critical bytes mismatched at %d (%s).", critical_sizes[idx_1st_mismatch].ucsize, critical_sizes[idx_1st_mismatch].nm);
:774–777  raw_printf("critical byte counts do not match, file:%d, critical_sizes:%d.", file_csc_count, SIZE(critical_sizes));
```

`idx_1st_mismatch` is a plain `int` at `:721` (address passed at `:726`), so JS `CRITICAL_SIZES[idx_holder.value]` indexes exactly as C does. The `:774` arm keeps C's `!quietly` gate inside the count arm and stays dead via the named feed omit.

Symbols + edge (re-run here):

```text
raw_printf   js/display.js:7821   sync    # sym.mjs: single export
vraw_printf  file-local js/display.js:7833   # single local — correct, C is staticfn
imports.mjs --can files.js display.js raw_printf → ALREADY (no new edge)
_early_raw_messages: 3 sites in display.js (decl + 2 counts), 0 reads — write-only counter, consumers unported as named
```

Verify output (re-run here):

```text
verify raw_printf: baseline d56627bd~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke raw_printf: no RNG-tagged reach; fixed smoke spread (24 run, 4.2s): 24 PASS, 0 regressed → REACH-OK
```

## Density

Two small C functions + 2 same-family caller wirings, 2 files, ~74 insertions. Right-sized per §2b. Scoreboard hunk is a commit/at re-stamp only.

## Verification

- D-log: `verify.mjs --fn raw_printf` → PASS.
- Re-run here: `hidden-proxy.mjs verify raw_printf --base d56627bd~1 --reach-all` → 0 blocked both trees (vacuous, honestly reported) + smoke 24 PASS, 0 regressed → REACH-OK. Matches.
- `imports.mjs --rulecheck`: clean (re-run this iteration). Diff grep: 0 hits for FORCE/DIAG/getRngLog/fastforward.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
