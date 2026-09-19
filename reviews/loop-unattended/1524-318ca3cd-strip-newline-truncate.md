# Review 1524 — 318ca3cd — hacklib.c strip_newline splice-vs-truncate (D-2565)

## Metadata

- SHA: `318ca3cd`
- D-id: D-2565. Next index: 1524.
- Files: `js/pager.js` (+4/−4: one-line return change + export), new `scripts/strip-newline.test.mjs` (6 cases).
- C locus: `nethack-c/upstream/src/hacklib.c:179–190` (`strip_newline`, 12 L; `csym.mjs` range).
- Closes review 1517 QUALITY-RISK C-wrong 1 (splice-vs-truncate).

## Intent vs deliverable

Subject promises: return `str.slice(0, end)` per C `*p = '\0'`, export it (C is extern), plus a 6-case unit test. Diff delivers exactly that — one return line, `function` → `export function`, JSDoc re-cited `:179–190`. Promise matches deliverable.

## Inventory

- Changed: `strip_newline(s)` (`js/pager.js:2843`, now exported sync).
- No new callees, no deleted symbols. `sym.mjs`: single export, `js/pager.js:2843` — no clone #2. C shows no `static` qualifier, so the export matches linkage (review 1517's "staticfn stays local" framing was loose, but the outcome here is the C-faithful one).

## C ↔ JS fidelity

C `:179–190` in order: `strrchr(str, '\n')` → JS `lastIndexOf('\n')` ✓; `p > str && *(p-1) == '\r'` → `end = i-1` ✓; `*p = '\0'` (tail dropped) → `slice(0, end)` ✓; NULL-arm: C would crash on NULL, JS `?? ''` passthrough — a safe extension, named in the D-log ✓. The interior-newline case from review 1517 (`"a\nb"` → C `"a"`) is now covered by the committed test (interior-newline tail-drop + last-newline truncation cases) ✓. 6/6 tests pass (re-run here).

## Hallucinations / overclaim

None. The D-log frames the verify as vacuous/0-blocked honestly and does not claim a corpus movement.

## Cited evidence

C (`nethack-c/upstream/src/hacklib.c:179–190`, via `node scripts/csym.mjs strip_newline`):

```c
char *
strip_newline(char *str)
{
    char *p = strrchr(str, '\n');

    if (p) {
        if (p > str && *(p - 1) == '\r')
            --p;
        *p = '\0';
    }
    return str;
}
```

JS after this SHA (`js/pager.js:2843`):

```js
export function strip_newline(s) {
    const str = String(s ?? '');
    const i = str.lastIndexOf('\n');
    if (i < 0) return str;
    const end = (i > 0 && str[i - 1] === '\r') ? i - 1 : i;
    return str.slice(0, end);
}
```

Line-by-line: `strrchr` ≡ `lastIndexOf` ✓; `p > str && *(p-1) == '\r'` ≡ the `end` ternary ✓ (index-0 `\n` keeps `end = 0`, matching C where `p == str` skips the decrement); `*p = '\0'` ≡ `slice(0, end)` — the exact line this SHA fixes ✓. `String(s ?? '')` is a null-safe extension (C would crash on NULL); every in-tree input is a string.

Symbol + test + verify outputs (re-run here):

```text
strip_newline    js/pager.js:2843   sync        # sym.mjs: single export, no clone #2
ℹ pass 6 / fail 0                                # strip-newline.test.mjs (6 cases)
verify strip_newline: baseline 318ca3cd~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke strip_newline: no RNG-tagged reach; fixed smoke spread (24 run, 3.8s): 24 PASS, 0 regressed → REACH-OK
```

## Density

One-line fix + export + pinning suite for a Must-fix item, alone in the iteration. Right-sized per §2b (Must-fix stays one item, alone).

## Verification

- D-log: `verify.mjs --fn strip_newline` → PASS.
- Re-run here: `hidden-proxy.mjs verify strip_newline --base 318ca3cd~1 --reach-all` → 0 blocked both trees (vacuous, honestly reported in the D-log) + smoke 24 PASS, 0 regressed → REACH-OK. Matches.
- `imports.mjs --rulecheck`: clean (re-run this iteration). Diff grep: 0 hits for FORCE/DIAG/getRngLog/fastforward.

## Actionable C-wrongs

None. The single C-wrong this SHA was enqueued for is fixed exactly.

Verdict: **ACCEPT**

**Addressed:** — (this SHA *is* the address of review 1517's Must-fix; stamped there as D-2565 `318ca3cd`)
