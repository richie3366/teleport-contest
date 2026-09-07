# Review 970 — 136921ce — doride wizard force-mount arm (D-2000)

Metadata: SHA `136921ce`, D-2000, Open-row port (`steed.c`
doride/mount_steed, row cited 6/553; 7 blocked at baseline). js/
touches 1 file (`js/steed.js`, +9/−2). No map edit (envelope comment
already named the deferral). No stamp owed (review 79 names
`use_saddle`, not this arm).

## Intent vs deliverable

Subject promises: wizard-mode `#ride` prompt `Force the mount to
succeed? [yn] (n)` (`steed.c:185`) wired into `mount_steed(mtmp,
forcemount)`, preserving the C short-circuit (no prompt in normal
mode). Diff actually adds: one static `y_n` import + 5-line
`forcemount` block replacing the `// wizard force yn deferred`
comment and hardcoded `false`. Promise == diff.

## Inventory

- Changed JS function: `doride` (prompt block only; getdir/isok/
  return shape untouched).
- New helpers: none. Deleted/re-pointed: none (comment → code;
  `false` literal → variable). No `sym.mjs` delete audit required;
  resolution below informational.

## C ↔ JS fidelity

C locus: `doride` `steed.c:177–193` (read verbatim): `boolean
forcemount = FALSE; … else if (getdir(0) && isok(…)) { if (wizard &&
y_n("Force the mount to succeed?") == 'y') forcemount = TRUE; return
mount_steed(m_at(…), forcemount) ? ECMD_TIME : ECMD_OK; }`.

- Gate: C `wizard` ≡ `flags.debug` (`flag.h:30` `#define wizard
  flags.debug`). JS `(game.flags?.debug || game.flags?.wizard)` is
  the established port idiom (10+ files: cmd/detect/dungeon/end/…),
  covering both port-side flags. Short-circuit preserved: `&&`
  means no `y_n` prompt in normal mode, matching C. ✓
- Prompt: `y_n('Force the mount to succeed?')` — JS `y_n` =
  `yn_function(query, ynchars, 'n', true)` (getline.js:1531),
  default `'n'` matching C `[yn] (n)`; returns Promise, `await`ed
  (same shape as the `mhitu.js` precedent `await y_n(qbuf)`).
  `sym.mjs y_n → js/getline.js:1531 sync` (non-async-keyword returning
  a promise — `await` correct). Single live callee, no clone. ✓
- Wire is live, not a no-op: `mount_steed(mtmp, force)`
  (steed.js:586) tests `force` in three gates (`u.Hallucination &&
  !force`, encumbrance `!force && …`, `!mtmp || (!force && …)` — the
  last being the reported `I see nobody there.` arm). Dispatch ported
  AND callee honors the arg. ✓
- Import: `--can steed.js ./getline.js y_n` → `ALREADY: steed.js
  already statically imports getline.js. No new edge needed.`
  `y_n` hoisted plain function; call is runtime-only. No TDZ. ✓
- No RNG in this arm (pure `yn` prompt); branch order identical to C.

## Hallucinations / overclaim

None. "doride is now complete vs C" is bounded (mount_steed's own
deferred arms explicitly excluded and still named in the envelope
comment). "Cycle-safe per --can; mhitu.js precedent" both verified
true above.

## Density

9 insertions for one recorded first-diff arm — below the 80-line
port target, but this is a 5-line C arm plus import; C is that small
(§2b allows it). Solo commit is correct (Open row, one owner).

## Verification

Re-measured myself: `hidden-proxy verify doride --base 136921ce~1`
→ `3 PASS, 4 moved past, 0 unchanged, 0 worse → PROGRESS` — the
three named probes (Ranger-92193, Valkyrie-92131, Healer-92231) PASS
and the four movers land on the exact later owners/steps the D-log
lists (Priest-92020 monster_detect@58, Valkyrie-92200
doquiver_core@46, Barbarian-92079 attributes_enlightenment@57,
Barbarian-92054 yn_function@111). Claim holds exactly. Grep of the
js hunk: no `FORCE`/`DIAG`/`getRngLog`/seed/coordinate/`fastforward`.
Rule #2 clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
