# Review 1508 — c9884cd8 — options.c all_options_conds + botl.c opt_next_cond [campaign 3/7] (D-2549)

## Metadata

- SHA: `c9884cd8`
- D-id: D-2549. Next index: 1508.
- Files: `js/botl.js` (+21: exported `opt_next_cond`),
  `js/options.js` (+50: static import + exported
  `all_options_conds` + comment refresh),
  `scripts/all-options-conds.test.mjs` (+91, new).
- C loci: `nethack-c/upstream/src/botl.c:1457–1490`
  (`opt_next_cond`, 34 L; `csym.mjs` range, cited as that
  range) and `nethack-c/upstream/src/options.c:9553–9591`
  (`all_options_conds`, staticfn, 39 L; cited as that range).

## Intent vs deliverable

Subject promises: the cond-writer pair live in C order with
the 75-column wrap, C callers wired-or-named. Diff delivers
exactly that plus a committed test. Promise matches
deliverable. No RNG in C; none added. Coverage gap, 0 blocked
at baseline — honestly stated.

## Inventory

- New: `opt_next_cond(indx)` (exported, `js/botl.js:683` per
  `sym.mjs`, sync), `all_options_conds(sbuf)` (exported,
  `js/options.js:4053`, sync), one static import
  options.js→botl.js, one committed test.
- No deleted or re-pointed symbols → no clone→import audit
  needed.

## C ↔ JS fidelity

`opt_next_cond` vs C `:1457–1490`: pre-clear `*outbuf = 0`
folded into the default `return ''`; `indx >=
CONDITION_COUNT → FALSE` folded into `return null`;
internal-order (no sort) preserved with the C comment's
substance kept; the `:1484–1488` non-default gate
(`opt_in+enabled || opt_out+!enabled` → `[!]cond_<useroption>`)
exact, including `enabled ? '' : '!'`. Enum values verified
here: `global.h:576` `enum optchoice { opt_in, opt_out }` =
0,1 ≡ JS `OPT_IN = 0, OPT_OUT = 1` (`js/botl.js:580–581`).
Table values spot-checked: barehanded OPT_IN/false, blind
OPT_OUT/true, busy OPT_IN/false — identical to C
`botl.c:820–822`. The outbuf+boolean→return fold (null =
FALSE, '' = default, token otherwise) is documented at the
definition and matches the sole caller's use.

`all_options_conds` vs C `:9553–9591`, branch order kept:
`buf[0] = 0` → `''`; `idx = 0`, `gotone = FALSE`; `while
(opt_next_cond(...))` → `for(;;)` + null-break; `idx == 0 →
Strcpy "OPTIONS="` exact; wrap `Strlen(buf)+1+Strlen(nextcond)
>= 75` → length arithmetic exact (content is ASCII-only, so
chars ≡ bytes); `",\\\n"` byte-exact; `Sprintf(buf, "%8s",
" ")` → 8 spaces with the strlen("OPTIONS=") rationale kept;
`nextcond[0] && gotone` → length checks; `++idx` stays at the
loop bottom; tail `strcmp(buf, "OPTIONS=")` → `!==` with
append-`\n` — including the degenerate empty-table behavior
(C would append a lone newline; JS does the same).
Sole C caller `options.c:9563` (opt_next_cond) and
`options.c:9729` (all_options_conds ← strbuf) both live in JS
now; the other two C references are the comment at
`botl.c:1456` and the `options.c:378` decl — no action.

## Hallucinations / overclaim

One wording overclaim, not a C-wrong: the subject says the
"new edge options.js→botl.js is lazy-only inside function
bodies", but the diff adds a top-level **static** `import {
opt_next_cond } from './botl.js'` (no such import at the
parent). Substance still holds — `imports.mjs --can`
reports the edge cycle-safe, `opt_next_cond` is a hoisted
function declaration called only inside function bodies, and
`verify` + full suite pass — but "lazy-only" misdescribes the
mechanism. Noted for precision; no queue row (no behavior
at stake).

## Density

Two small C functions + test, two files, ~70 insertions.
Right-sized per §2b; the committed test is the campaign's
hand-written evidence, not padding.

## Verification

- D-log: `verify.mjs --fn all_options_conds` → VERIFY: PASS
  (tail pasted verbatim in the D-log).
- Re-run here: `hidden-proxy.mjs verify all_options_conds
  --base c9884cd8~1 --reach-all` → 0 blocked at baseline and
  working tree (vacuous, honestly reported) + smoke 24 PASS,
  0 regressed → REACH-OK. Matches.
- `imports.mjs --rulecheck`: clean (re-run this iteration).
- Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed gates
  or hardcoded coordinates.

## Actionable C-wrongs

None. Both bodies, the enum/table values, and the callers
check out against pinned C; remaining family members
([4/7]–[7/7]) are named in the map with queued rows.

Verdict: **ACCEPT**
