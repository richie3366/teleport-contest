# Review 1984 — f4390cd9a — hacklib.c string cluster, six functions (D-3024)

Metadata: SHA `f4390cd9a` (D-3024). Coverage cluster: tabexpand
PARTIAL (unexported pager.js local) + five same-file MISSING
siblings. Scored diff: `js/hacklib.js` (+137) + pager/objnam
import extensions and local deletions (−19). Subject promises
six canonical exports with two locals promoted.

## Intent vs deliverable

Promise: six canonical exports in C order, immutable-string
adaptations documented per site, no new module edges, locals
deleted, new `scripts/hacklib.test.mjs`. Diff actually adds
exactly that. Promise kept.

## Inventory

- `upwords` (js/hacklib.js:268, sync): new.
- `c_eos` (js/hacklib.js:295, sync): new.
- `chrcasecpy` (js/hacklib.js:310, sync): new, promoted from
  the arm-identical objnam.js local (deleted).
- `strcasecpy` (js/hacklib.js:334, sync): new.
- `tabexpand` (js/hacklib.js:360, sync): new, promoted from
  the pager.js local (deleted).
- `sitoa` (js/hacklib.js:391, sync): new.
- Deleted locals were file-locals (no `sym.mjs` entries by
  construction); deletion + import-rewire verified by grep:
  pager.js:765/2939 and objnam.js:2058 now resolve to the
  canonical exports.

## C ↔ JS fidelity (per function)

### tabexpand — verdict: exact-C, ACCEPT

C (`hacklib.c:428–464`, csym range): `:436–437` empty
passthrough, `:438–448` tab→8-stop do/while, `:449–452` copy
arm, `:453–456` BUFSZ rewind-break, `:458–459` NUL + strcpy.
All present in C order. BUFSZ=256 both sides (js/const.js:947).
Overshoot case verified by hand: old clone broke holding 256
chars, C and new JS both yield 255 (`slice(0, BUFSZ-1)`) — the
D-log "one char looser" claim is correct, and the new code
matches C exactly.
Callers: pager.c:1109 → pager.js:765 (pre-existing, now via
import); version.c:254 → pager.js:2939 (doextversion, D-2558);
pager.c:2630–2632 + wintty.c:2502 named with C citations.
Confirm.

### upwords — verdict: exact-C, ACCEPT

C (`:122–138`, csym range): `:124` space=TRUE, `:126` scan,
`:127–128` blank arm, `:129–132` letter+highc arm, `:133–134`
else arm, `:136` return s. `letter()` (`:68–72`) verified:

```c
return (boolean) ('@' <= c && c <= 'Z') || ('a' <= c && c <= 'z');
```

JS expands it inline exactly; `highc` identity outside a-z
verified in `js/hacklib.js` (early return, `& ~0x20` fold).
Caller read.c:512 named (JS doread lacks the arm — no wire
site). Confirm.

### chrcasecpy — verdict: exact-C, ACCEPT

C (`:300–317`, csym range): `:303–305` disabled `#if 0` kept
disabled, `:306–309` lower arm, `:310–313` upper arm, `:315`
return nc — arm-identical, including the deleted objnam clone.
Sole C caller is in-cluster strcasecpy (`:337`). Confirm.

### strcasecpy — verdict: exact-C, ACCEPT

C (`:321–341`, csym range): `:326` dst_exhausted, `:332` src
scan (C stops at embedded NUL; JS `s[i] !== '\0'` matches),
`:333–334` exhaustion latch, `:335` last-char propagation,
`:336` chrcasecpy, `:338–339` NUL + result. Empty-dst `?? ''`
falls through to `nc`; C's `dst[-1]` is a caller
tail-pointer, unreachable, documented. No live C caller
 UNUSED macro). Confirm.

### c_eos — verdict: adapted analogue, ACCEPT

C (`:202–208`) returns the end *pointer*; JS returns the
length — the documented pointer-free analogue. Callers:
files.c:2132 wired (adapted pre-existing `length-1` with C
cite, verified in-tree), cfgfiles.c:1554 wired
(`punctTail`), sounds.c:2198 named (SND_SPEECH compiled-out,
`sound_speak` the documented no-op). Confirm.

### sitoa — verdict: exact-C, ACCEPT

C (`:637–644`, csym range): `Sprintf(buf, (n<0) ? "%d" :
"+%d", n)` over a static buf → JS `|0` int + sign select,
fresh string for the static buffer. No live C callers
(objnam.c:1423/1501 cite it only in comments). Confirm.

No RNG in any of the six; no stubs; assign-the-return holds
at all three JS call sites.

## Hallucinations / overclaim

None. Every live C caller of all six functions is enumerated
as wired-or-named in this commit's D-entry — the strongest
caller-closure section in this batch. The scratch-probe red
cases are disclosed as probe-side misreads, corrected
pre-commit.

## Density

Six whole same-file functions + two clone promotions, one C
file, ≤10 functions. Textbook §2b cluster.

## Verification

Re-measured (all six `--base f4390cd9a~1 --reach-all`): 0
blocked each (labeled notes, not PASS), REACH-OK ×6 (smoke
24/24 each, ~7.4s). Zero REGRESSED. Matches D-log.

## Actionable C-wrongs

None.

Ledger: all six ported, REACH-OK ×6.
Verify lines: hidden vacuous ×6 (honest) + smoke ×6.

Verdict: **ACCEPT**
