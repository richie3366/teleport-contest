# Review 1989 — da6d0e8ae — wizcmds.c wizcustom_callback whole (D-3029)

Metadata: SHA `da6d0e8ae` (D-3029). Single-function cluster
(head's file/closure hold nothing else Open). Resolves the
review-1730 debt (stamped `**Addressed:** D-3029` in-commit;
hash filled by this audit). Subject promises the #wizcustom
menu-line callback whole with the C caller wired.

## Intent vs deliverable

Promise: new `wizcustom_callback` in C order, glyphmap via
`ensure_glyphmap()`, printf-idiom mappings, raw-array
add_menu, caller wired, two named omits. Diff actually adds
exactly that. Promise kept.

## Inventory

- `wizcustom_callback` (js/wizcmds.js:1609, exported sync):
  whole C body.
- `ensure_glyphmap` (js/glyphs.js:1066): export promotion,
  body untouched.
- No deleted symbols.

## C ↔ JS fidelity

### Body — verdict: exact-C, ACCEPT

C (`wizcmds.c:1986–2027`, csym range) walked whole:

```c
if (win && id) {
    cgm = &glyphmap[glyphnum];
    if (cgm->u || cgm->customcolor != 0) {   /* ENHANCED_SYMBOLS live */
        Sprintf(bufa, "[%04d] %-44s", glyphnum, id);
        Sprintf(bufb, "'\\%03d' %02d",
                gs.showsyms[cgm->sym.symidx], cgm->sym.color);
        Sprintf(bufc, "%011lx", (unsigned long) cgm->customcolor);
        /* bufu empty; U+%04lx + NUL-terminated byte walk */
        any.a_int = glyphnum + 1; /* avoid 0 */
        Snprintf(buf, sizeof buf, "%s %s %s %s", ...); /* trailing
            space when bufu empty */
        add_menu(win, &nul_glyphinfo, &any, 0, 0, ATR_NONE, clr, buf,
                 MENU_ITEMFLAGS_NONE);
    }
}
```

Every arm present in C order. Type checks against
wintype.h:82–95: customcolor and utf32ch are both uint32,
so `>>>0` + lowercase-hex padStart is exact (no 64-bit
`%lx` truncation — values never exceed 32 bits). showsyms
read is undefined-safe and pins 0 until init_symbols lands
(named, symbols.c unported). Zero-fill entries carry
`.sym/.customcolor/.u` (verified in-tree), so uncustomized
rows format without throwing. UTF-8 re-encode handles
surrogate pairs (probe: U+00E9 → `<195> <169>`, U+1F600 →
4-byte form); 0-byte ends the walk like NUL; `!= null`
pointer check lets empty strings enter like C. add_menu →
raw-array push (options.js `raw` idiom); consumer
wiz_custom `:1969` unported with its own row (named).
`sym.color | 0` + padStart(2): negative char values (if
any) render like C `%02d` without truncation. No RNG.

### Callee closure — verdict: ACCEPT

Brief lists 0 C callees. JS-side `ensure_glyphmap` is the
live glyphmap mirror. No stub, no clone, no omit in a live
arm.

### Imports — verdict: TDZ-safe, ACCEPT

Required `--can` outputs (both directions):

```text
ALREADY: glyphs.js already statically imports wizcmds.js.
ALREADY: wizcmds.js already statically imports glyphs.js.
```

No new module edge either way; both uses are
function-declaration runtime-only calls with no top-level
reads. `sym.mjs`: both single-definition sync exports:

```text
wizcustom_callback js/wizcmds.js:1609   sync
ensure_glyphmap  js/glyphs.js:1066   sync
```

### Caller — verdict: wired, ACCEPT

Sole C caller glyphs.c:818 (wizcustom_glyphids) →
`js/glyphs.js:1194` live call this commit, replacing the
empty named-omission arm. The 1730-era comments updated to
match.

## Hallucinations / overclaim

None. The behavioral probe (/tmp, uncommitted) is honestly
labeled as such; the hidden check is labeled a note, not a
corpus PASS.

## Density

One whole function + caller wiring + debt stamp.
Right-sized; coverage singles ship per §2b.

## Verification

Re-measured (`hidden-proxy.mjs verify wizcustom_callback
--base da6d0e8ae~1 --reach-all`):

```text
verify wizcustom_callback: 0 session(s) blocked (vacuous, honest)
smoke wizcustom_callback: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
```

Zero REGRESSED. Matches the pasted tail.

## Actionable C-wrongs

None.

Ledger: `wizcustom_callback` ported, REACH-OK via smoke.
Verify lines: hidden vacuous (honest) + smoke.

Verdict: **ACCEPT**
