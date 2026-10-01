# Review 2182 — 5139f3d2e — get_changed_key_binds CMD_PARAM arm

SHA `5139f3d2e`, D-3222; 2026-10-01; cmd.js (+10/−6, one arm + docs).
Two-function cluster (cmd.c arm completion + strutil.c declare). Closes
no prior review.

## Metadata

- Subject: "cmd.c get_changed_key_binds CMD_PARAM arm
  (BIND=key:cmd(param)) + strbuf_append declared (D-3222)".
- Promises: the `:2253–2257` arm in C order; unset-param `()` per the
  keylist_putcmds sibling idiom; no new edge; stale doc corrected.

## Intent vs deliverable

Kept. The arm completes a previously partial function to whole (the
rest shipped under D-2550/D-2762); strbuf_append is a declare of a
pre-existing live body.

## Inventory — get_changed_key_binds

One arm added to `get_changed_key_binds` (cmd.js:1472): CMD_PARAM
flag test → `BIND=key:cmd(param)` emit, else plain emit. No new
imports (CMD_PARAM + bind_param_get already local). Deleted/
re-pointed: none.

## C ↔ JS fidelity — get_changed_key_binds

C `cmd.c:2234–2287` (csym range):

- Flag test `:2253` `((ext.flags|0) & CMD_PARAM) !== 0` ≡ C
  `(bind->cmd->flags & CMD_PARAM) != 0` ✓; format
  `BIND=%s:%s(%s)` ✓ via the pre-existing emit (sbuf → strbuf_append
  + `\n`, null → winLines — C `:2263–2266` shape, unchanged) ✓.
- `bind->param` → `bind_param_get(key) ?? ''`: equivalent store —
  C's cmdbind_add (`:2138–2154`, read) keeps one entry per key
  (in-place on rebind), and the JS `_bindParam[key]` array is
  written on the same paths (bind_key cmd.js:1733 with C's
  `:2701–2707` min(30)+NUL truncation, `slice(0, maxlen-1)` ✓;
  overlay_bind_key per message) ✓.
- `toggle` is the only CMD_PARAM extcmd ✓ (sole flag holder at
  cmd.c:1908; the rest are flag tests).
- Unset-param `()` vs glibc `(null)`: error-path-only as claimed —
  C bind_key (`:2696–2700`, read) raises `config_error_add` when a
  CMD_PARAM bind lacks parens (or has empty parens), leaving
  bind->param NULL; so NULL ⟺ config error already raised ✓. The
  `?? ''` matches the keylist_putcmds sibling verbatim
  (dokeylist.js:757, C `:2830–2833`) ✓. Named, not hidden.
- No RNG in C; none added ✓. Callers (:9734 sbuf, :2442 NULL)
  pre-wired, untouched ✓.

## Inventory + fidelity — strbuf_append (declare)

No JS change; body pre-existed live at options.js:11051. Read it:
reserve(len+1+strlen) + Strcat ≡ C `strutil.c:16–24` (csym range)
exactly; JS-string NUL note correct ✓. Legit declare, not theater.

Diff grep: 0 hits. Rule #2 clean (iteration-wide rulecheck).

## Hallucinations / overclaim

None. The "param stripped at parse" doc it corrects was indeed stale
(the store exists and is written); the round-trip claim
(`x:toggle(verbose)` → `BIND=x:toggle(verbose)`) follows from the
verified parse/store/emit chain.

## Density

One arm (~10 js lines) completing its function to whole + one
declare. Below the ~80 floor for a non-Must-fix port — noted for the
supervisor (density self-heal is supervisor-owned; fidelity here is
exact, so no Must-fix-bearing verdict attaches to size). One C file
per function, no Must-fix bundled.

- Ledger: get_changed_key_binds ported — ACCEPT.
- Ledger: strbuf_append ported — ACCEPT (declare verified).

## Verification

Re-measured (one call, current tree incl. this SHA):

```text
smoke get_changed_key_binds: no RNG-tagged reach; fixed smoke spread (24 run, 11.1s): 24 PASS, 0 regressed → REACH-OK
smoke strbuf_append: no RNG-tagged reach; fixed smoke spread (24 run, 10.8s): 24 PASS, 0 regressed → REACH-OK
```

(both vacuous-with-cause at baseline.) Matches the D-log (vacuous +
REACH-OK, green/strict/cohort). No REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
