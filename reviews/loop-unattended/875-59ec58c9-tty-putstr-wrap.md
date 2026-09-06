# Review 875 — 59ec58c9 — wintty.c tty_putstr NHW_TEXT wrap remainder consumes break space (D-1905)

Metadata: SHA `59ec58c9`, D-1905. Files: `js/pager.js` (1-line fix
+ doc correction), `docs/c-js-map/turns.md` (map row),
`hidden-corpus/scoreboard.json` (rescore). Next index 875.

Intent vs deliverable: subject promises the one-character wrap fix
plus the doc correction for a corpus-misattributed screen diff. The
diff delivers exactly that. Promise ≡ diff.

Inventory: 0 new functions; 1 changed line in
`wrap_text_window_line` + 3 comment lines. No imports touched, no
helpers added. Nothing deleted or re-pointed.

**C ↔ JS fidelity** (`win/tty/wintty.c` NHW_TEXT arm, verified by
direct read — the D-log's `:2412–2420`):
```c
for (i = CO - 1; i && str[i] != ' ' && str[i] != '\n';)
    i--;
if (i) {
    cw->data[cw->cury - 1][++i] = '\0';
    tty_putstr(window, attr, &str[i]);
}
```
The scan stops with `i` ON the break space; `++i` advances past
it, so the stored fragment (`data[++i]=0`) keeps the space while
the recursion (`&str[i]`) starts after it. Both JS halves now
match: `s.slice(0, i + 1)` keeps the space (fragment ✓), new
`s.slice(i + 1)` consumes it (remainder ✓) — the old `s.slice(i)`
contradicted C on the remainder. The no-break-point arm (`!i` →
stored whole) and the recursion-through-`compress_str` shape are
pre-existing and untouched. No symbol deleted or re-pointed, so
`sym.mjs` has nothing to resolve on this SHA.

Hallucinations / overclaim: none — and a positive note: the
commit correctly reattributes the corpus block from
`suit_simple_name` (proxy owner) to the wrap, with page-1
evidence (step 837 fully matched incl. the wish line content)
showing the noun was never wrong.

Density: one-line fix + rescore — minimal and complete.

Verification: the D-log Verify bullet is weakly worded
(preflight-only phrasing — it documents green gates BEFORE the
edit, not after), but the shipped evidence is the strongest in
this batch: `scoreboard.json` flips
`random-seed0360-wizard-world-tour-4ac145da` FAIL step 838
(owner `suit_simple_name`, `scrM` 838/861) → PASS 861/861
(`kind`/`step`/`owner` nulled, `commit` re-baselined to the
parent). The falsifier is byte-level: `wrap_text_window_line`
on the 92-char compressed wish line returned ` dragon scale
mail"` before (identical to the failing JS row) and `dragon
scale mail"` after (identical to the C row). Re-measured
myself: `hidden-proxy.mjs verify suit_simple_name --base
59ec58c9~1` → `1 session(s) blocked (1 at baseline, 0 in the
working scoreboard)… 1 PASS, 0 moved past, 0 worse →
PROGRESS`. Genuine blocked→PASS on the exact session the queue
row cited — no vacuous check, nothing worse. Diff grep: no
banned patterns. Rule #2 clean at HEAD.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
