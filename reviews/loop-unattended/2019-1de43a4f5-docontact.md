# Review 2019 — 1de43a4f5 — pager.c docontact

Metadata: SHA `1de43a4f5`, D-3059, js/pager.js (+45/−~12).
Single-function cluster (0 C callees, no other pager.c Open row).

## Intent vs deliverable

Subject promises "support-contact text window". Diff actually adds
`docontact_lines()` + async `docontact()` in C order and rewires the
dohelp 'o' row from the D-0131 tail-only inline to the new function.
Matches promise; the old inline is deleted, no duplication left.

## Inventory

- `docontact_lines` (new export js/pager.js:3273, sync) — C line
  building, pager.c:2717–2745.
- `docontact` (new export js/pager.js:3292, async) — C display idiom.
- Re-point: dohelp 'o' row → `docontact` (same file).
- No deleted symbols besides the superseded inline; no clone→import
  re-points.

## C ↔ JS fidelity

Body vs C `:2718–2745` (csym), line-for-line: `support` arm
`:2723–2727` ("To contact local support, %s" + blank) ✓; wizards
else-if `:2728–2732` ("…contact %s." + blank) ✓; devteam tail
`:2733–2741` (5 lines incl. blank) ✓ — verified byte-identical to
the deleted inline by inspection of both hunks. DEVTEAM_EMAIL/URL
literals match hack.h:1556–1557 ✓. C pointer truthiness preserved:
`!= null` keeps empty-string truthy as in C ✓ (comment says so).
NHW_TEXT create/putstr/display/destroy folded into in-file
`show_text_pages` (js/pager.js:241, LIVE) — the file's NHW_TEXT
convention, disclosed. Zero RNG both sides. Caller: C help-table row
`:2848` `{ docontact, "Support information." }` (confirmed by sed —
function-pointer table, which is why csym --callers shows only the
:35 fwd decl) → JS dohelp 'o' row, same text ✓ wired. C staticfn is
exported in JS (lines/emitter split convention) — harmless shape
liberty in the same file. Verdict: exact.

Named omit (data producer, not this function): `:2728` reads
`game.sysopt.fmtd_wizard_list`, which stays null — verified:
js/sys.js:79 null-initializes the slot, js/cfgfiles.js:634 only
`cnf_store_str('wizards', …)`, no builder anywhere. The arm itself is
live code; the gap belongs to a future cfgfiles coverage row, so
Ledger `ported` is correct (not `partial`).

sym.mjs: no symbols deleted or re-pointed; the only callee edge
(show_text_pages) is intra-file. Nothing to paste per step 3.

## Hallucinations / overclaim

None. "Default output matches the old inline exactly" verified true.
The WIZARDS-producer gap is named with file:line evidence, not
hidden. "Not stale" justification (old inline lacked both sysopt
arms) confirmed by the deleted hunk.

## Density

One 21-line C function, ~45 `js/` insertions, own Ledger entry and
Verify line. Under the 200-line target but correctly unpadded: 0
callees, no same-file Open rows. Right-sized.

## Verification

Re-measured (`hidden-proxy.mjs verify docontact --base 1de43a4f5~1
--reach-all`): 0 blocked + 24/24 smoke REACH-OK — matches the D-log,
honestly vacuous (row cited 0 blocks). Diff grep for banned
patterns: clean outside CURRENT boilerplate. No seed/step/coordinate
reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
