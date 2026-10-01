# Review 2187 — e0549fe8b — ephemeral VFS for null-storage harnesses

SHA `e0549fe8b` (human hotfix, no D-id); 2026-10-01; js/jsmain.js
(+35/−4) only. Not a C port — harness default-argument fix.
Closes no prior review.

## Metadata

- Subject: "Fix playability: ephemeral VFS when harness passes no
  storage (null-storage startup fatal)."
- Promises: per-game Map-backed store when `opts.storage` is
  missing (constructor + belt-and-braces in start); scoring and
  /play/ unaffected (they always pass storage); playability runner
  back to PLAYABLE.

## Intent vs deliverable

Kept. The diff adds file-local `createEphemeralStorage()`
(Web-Storage-shaped: getItem/setItem/removeItem/length/key),
defaults `this._storage` to it, and re-defaults in `start()` if
nulled. No other behavior touched.

## Inventory — jsmain harness

Added: `createEphemeralStorage` (js/jsmain.js:44, file-local, not
exported — correct, it has no C counterpart). Changed:
`NethackGame` constructor default + `start()` null-guard. No new
imports, no deleted/re-pointed symbols (`sym.mjs` re-point check
vacuous):

```text
createEphemeralStorage NOT EXPORTED — 1 LOCAL in js/jsmain.js:44
```

## C ↔ JS fidelity — harness default (no C function ported)

No C function is ported, so there is no branch-order audit; the C
citations are context, verified: `assure_syscf_file`
(cfgfiles.c:2028–2068, csym range) calls `exit(EXIT_FAILURE)`
when SYSCF_FILE is unreadable ✓ — the "fatals" claim is accurate,
and the JS startup path seeds the embedded sysconf into VFS, so a
missing backing store breaking that seed is a coherent causal
chain for the D-3182 early-return / 'Input queue empty' cascade.

Behavior neutrality for scored paths: every scored harness passes
`opts.storage`, and `opts.storage || ephemeral` keeps a provided
handle untouched (probed: `g2._storage === shared` → true), so
scored sessions cannot observe this change. The ephemeral store
itself is a faithful Web-Storage shape (probed: missing key →
null, String coercion, length, key(i)). No RNG, no seeds, no
coordinates, no session branching — nothing trace-shaped. Rule #2
clean (no new imports; Map is plain JS).

Diff grep on the js hunk: 0 hits.

## Hallucinations / overclaim

None checked. The "88/88 failed" / "0 failures, PLAYABLE" claims
are about the upstream playability runner, not verifiable from
this repo; the mechanism (VFS seed → assure → early return) is
consistent with the cited D-rows and the C exit above. Process
note (not a C-wrong): no D-entry, journal crumb, or docs touch for
a production behavior change — acceptable for a human hotfix, but
the loop's paper trail skips it.

## Density

Not a breadth-phase cluster (harness fix, no C function) — the
cluster rules don't apply. One file, minimal diff, no Must-fix
bundled.

- Ledger: no entry applicable (no C function).

## Verification

No `hidden-proxy verify` applies (no C function ported; nothing
corpus-reachable changed). Evidence instead:

```text
probe: no-storage _storage null? false; roundtrip v/1/k/null; shared kept? true
PASS: seed8000-tourist-starter.session.json (RNG 3130/3130, Screen 23/23)
```

Full 44/44 re-confirmation comes from this audit's end-of-
iteration `sessions` run below.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
