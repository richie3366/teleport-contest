# Review 2194 — 07cfb4831 — end_menu prompt inverse + blank (3 menus)

SHA `07cfb4831`, D-3233; 2026-10-01; js/cmd.js (+9/−4) +
js/options.js (+7/−1). Three-function cluster (paint-only).
Closes no prior review.

## Metadata

- Subject: "end_menu prompt style: handler_rebind_keys +
  handle_add_list_remove + handler_rebind_keys_add paint inverse
  + blank (4 scen-options blocks move) (D-3233)."
- Promises: each prompt header gains attr ATR_INVERSE + a
  following blank row, in C order [prompt, blank, items];
  selectors/counts/pick logic untouched; 4 blocks move to later
  owners.

## Intent vs deliverable

Kept. The diff touches exactly the 3 header constructions (2
"Do what?", 1 Bind prompt). No logic, selector, count, or pick
line moves.

## Inventory — handler_rebind_keys

Changed: header rows only (js/cmd.js:2432 area). No new imports
(ATR_INVERSE :128 pre-existing), no deleted/re-pointed symbols.

## C ↔ JS fidelity — handler_rebind_keys

C `cmd.c:2407–2446` (csym): `end_menu(win, "Do what?")` at :2432
✓. The style claim is verified against pinned C, not trusted:
tty_end_menu (win/tty/wintty.c:2680–2690, read) prepends the
prompt with `tty_menu_promptstyle` plus a `""` separator item
(each add goes to the head, yielding [prompt, blank, items] ✓),
and the style defaults to ATR_INVERSE + NO_COLOR (options.c:
7188–7189, read) relayed from core (:2905, verified) — matching
the probe (prompt attr=1, blank row 1, items from row 2). JS now
`[Do what?/INVERSE, blank, a_int 1, a_int 2]` ✓. Caller :8340
(pre-existing wire, unchanged) ✓. Dispatch/pick untouched ✓.

## Inventory — handle_add_list_remove

Changed: header rows only (js/options.js:6748 area). No new
imports (:190 pre-existing).

## C ↔ JS fidelity — handle_add_list_remove

C `options.c:9207–9251`: `end_menu(tmpwin, "Do what?")` at :9241
(read in pinned C) ✓ — same tty_end_menu mechanism, same fix ✓.
This is the true writer of the 4 captured menus (doset add/list/
remove); the D-log says the owner heuristic misnamed the head
and fixed the writer anyway — honest attribution, correct
closure. Callers :6343/:6418/:6511 (pre-existing wires) ✓.
a_int loop untouched ✓.

## Inventory — handler_rebind_keys_add

Changed: header rows only (js/cmd.js:2367 area). Double-unshift
yields [prompt, blank, …items] ✓ — order verified, not assumed.

## C ↔ JS fidelity — handler_rebind_keys_add

C `cmd.c:2290–2405`: `Sprintf(buf, "Bind …")` + `end_menu(win,
buf)` at :2347–2351 (read in pinned C) ✓ — same mechanism ✓.
Latent (no session captures this menu yet): fixing it in the
same commit is the right closure, explicitly labeled latent, not
sold as movement. Caller :2440 (pre-existing) ✓.

Diff grep on both js hunks: 0 hits. Rule #2 clean (no new
imports). Precedent confirmed in-tree (options.js:2862 inverse
end_menu prompt; blank-row pattern file-wide).

## Hallucinations / overclaim

None. The heuristic-vs-writer distinction is stated explicitly,
and the latent _add fix is labeled latent. The retired
bind->param omit (live bind_param_set :1733, D-3222 display) is
consistent with review 2182's shipped arm.

## Density

Three paint sites of one menu-style family, two js files, no
Must-fix bundled ✓. Below the ~80 guideline with the eligible
pool at 4 rows — legitimate, named in the D-log.

- Ledger: handler_rebind_keys partial — ACCEPT (paint fixed; crash-path remainder genuinely unportable).
- Ledger: handle_add_list_remove ported — ACCEPT.
- Ledger: handler_rebind_keys_add ported — ACCEPT.

## Verification

Re-measured (current tree, one call):

```text
verify handler_rebind_keys: 4 blocked → 0 PASS, 4 moved past, 0 worse → PROGRESS
  94011 → handler_autounlock@16; 94091 → do_statusline2@38; 94211 → do_statusline2@41; 94151 → status_enlightenment@40
smoke ×3: 24 PASS, 0 regressed → REACH-OK each
```

Sessions, owners, and steps identical to the D-log claim — not
vacuous, not rewritten. No REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
