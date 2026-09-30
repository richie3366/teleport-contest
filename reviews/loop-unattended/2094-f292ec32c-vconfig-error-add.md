# Review 2094 — f292ec32c — vconfig_error_add + 4 dispositions

- SHA: `f292ec32c` (D-3134)
- Subject: "`cfgfiles.c` vconfig_error_add whole port + copy_bytes by-design, role_abil/is_izchak/role_selection_prolog stale (coverage head)"
- js/ insertions: ~20 across js/cfgfiles.js + js/display.js
- Prior index: 2093; queue Must-fix at review time: empty

## Intent vs deliverable

Promise: port `vconfig_error_add` whole (expand via
exported vpline_expand, DEBUG arm out, chop, forward);
export vpline_expand; 4 ledger dispositions.

Diff actually adds: the 12-line local, the import name,
and the export keyword + 2 doc lines. Matches the
promise. No new helpers.

## Inventory

- `vconfig_error_add` (js/cfgfiles.js:352, module-local =
  C staticfn) — C cfgfiles.c:1874–1890 (csym range).
  Whole in-body; sole-C-caller wiring named (below).
- `vpline_expand` (js/display.js:8040, newly exported) —
  pre-existing body, unchanged.

Sole callee `config_erradd` LIVE (cfgfiles.js:279);
`vpline_expand` LIVE. Nothing deleted or re-pointed.

```text
vconfig_error_add  js/cfgfiles.js:352  local (C staticfn, C-home — not drift)
vpline_expand    js/display.js:8040   sync
config_error_add js/botl.js:1540   sync (established no-op sink)
copy_bytes       NOT FOUND (by-design)
```

## C ↔ JS fidelity

Line-by-line against :1874–1890: vsnprintf →
`vpline_expand(...).text` (the `%`-gate is behavior-
neutral — the helper returns input unchanged without
`%`; full expansion then chop ≡ C's BIGBUFSZ-then-BUFSZ
since BUFSZ < BIGBUFSZ); DEBUG panic arm correctly
compiled out (NH_DEVEL_STATUS is RELEASED per
patchlevel.h:33, so the `#if` is false regardless of
DEBUG — the `#else nhUse(vlen)` is what's compiled, and
JS drops `.ln` identically); `slice(0, BUFSZ-1)` ≡
`buf[BUFSZ-1] = 0` (BUFSZ 256 both sides); forward to
live config_erradd. The width/precision strip is the
map-named vpline_expand limitation (turns.md:2764 —
only unported `%*s` debug tables), pre-existing, named.
config_erradd's own pre-existing chop makes the new one
a harmless idempotent double. Sole C caller :1870
(config_error_add, body read — pure va_list forward)
correctly named unwired: JS botl.js:1540 is the
established map-named no-op sink. No RNG either side.

Dispositions hold: copy_bytes by-design (raw-fd loop,
Rule #2; scored callers files.c:3011/3021/3040 all
inside recover_savefile :2865 — binary path; util/
callers are build tools); role_abil switch ≡ 13-row
table + sentinel for all inputs (default null, r=0
checked); is_izchak 5 arms present with one pre-existing
micro-edge — `/[A-Za-z]/` vs C letter() which admits
'@'..'Z' (hacklib.c:71 read): diverges only for
shknam[0] ∈ {@, [, \, ], ^, _, `} + "Izchak", unreachable
(names generated alphabetic; '+' handled identically
both sides) — reviewed, not queued; role_selection_prolog
C-cited structure + 5 putstr lines (D-2672 port, review
1631 ACCEPT).

Cosmetic (3rd instance): the vconfig ledger row kept its
"measured MISSING" refresh note under ported. Harmless.

Diff grep: no FORCE/DIAG/getRngLog/seed/coordinates.

## Hallucinations / overclaim

None. Every "named" pointer (map line, no-op sink,
precedent shape at display.js:8173 — read, identical
expand-then-chop) resolves.

## Density

One function + 4 dispositions at ~20 insertions — below
the floor with the unless-clause holding (head + queue-
named dispositions; single-callee closure). Verdict:
ACCEPT.

## Verification

Re-measured (`--base f292ec32c~1 --reach-all`, all five
one call): 0 blocked at baseline and working tree each,
vacuous notes, smoke 24/24 → REACH-OK ×5. Matches the
D-log; no REGRESSED session. Gates per D-log: syntax 2
files, rule2, green 2/2, strict ×2, cohort 7/7, full
44/44 (display.js shared — correct).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
