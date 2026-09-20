# Review 1564 — d46334a6 — eat.c floorfood whole-body completion (D-2605)

**Metadata:** SHA `d46334a6`, `eat.c` `floorfood`, D-2605. JS:
`js/eat.js` only (+60/−28 across the three split loops + dispatcher).
Map `turns.md` updated (omit retired).

## Intent vs deliverable

Subject promises: three genuinely-absent arms (cockatrice touch,
otense/safe_qbuf question, impossible tail) added to the split
`floorfood_eat`/`_sacrifice`/`_tin`, 3 C callers wired. Diff actually
adds exactly that, and retires the stale omit lines. Matches.

## Inventory

- Cockatrice arm `:3688–3691` ×3 loops (eat/tin/sacrifice).
- Question arm `:3696–3702` ×3 loops (verb-specific `qsfx`).
- Dispatcher tail `:3717–3719` (`impossible`, unreachable).
- Import extensions only (objnam/invent/display edges pre-existing).

## C ↔ JS fidelity

C locus `eat.c:3578–3731` (154 L, via `csym.mjs`); loop body
`:3680–3705` and tail `:3708–3729` read here. Confirm:

- Loop filters per split match the unified C filter exactly: eat =
  non-coin + edible; tin = CORPSE + tinnable; sacrifice = CORPSE
  (C `corpsecheck ? (CORPSE && (cc==1 || tinnable)) : ...`). ✓
- Cockatrice arm precedes the question in all three loops (fatal
  before asking, per the C comment); eat-loop keeps the redundant
  `otyp==CORPSE` guard like C; tin/sacrifice loops omit it (filter
  guarantees CORPSE — equivalent). `feel_cockatrice` is ASYNC and
  awaited; `will_feel_cockatrice` sync (`sym.mjs`: invent.js:1989 /
  :2005). ✓
- Question: `There ${otense(otmp,'are')} ` + `qsfx=" here; <verb>
  it/one?"` via `safe_qbuf(null, prefix, qsfx, otmp, doname,
  ansimpleoname, something/things)` — matches C `Sprintf` pair and the
  `safe_qbuf(qbuf, qbuf, qsfx, ...)` argument order (JS first param
  `_qbuf`, ignored — null safe). Verb varies per split (eat/tin/${verb})
  as C's `verb` does. ✓
- `getobj_else++` after each declined question in all three loops;
  `getobj_else = 0` after dispatch; tin keeps the
  `You can't tin that!` post-validation (`:3722–3726` shape). ✓
- Dispatcher tail: `impossible('floorfood: unknown request (%s)', verb)`
  for non-0/1/2, unreachable from the three live callers. ✓
- No RNG in the new arms (yn_function is input, not RNG). Pre-existing
  deferrals (`is_pool_or_lava` drawbridge, IRONBARS wall_info) untouched
  as D-0953/D-0937 left them — named, not widened.

Caller closure (C `--callers`: apply.c:2189, eat.c:2829, pray.c:1870 +
comment :2847): JS `apply.js:2365` (`floorfood('tin', 2)`),
`eat.js:4115` (`floorfood("eat", 0)`), `pray.js:2722`
(`floorfood('sacrifice', 1)`). All 3 wired.
Callee closure: all LIVE (`sym.mjs` outputs in notes). No clone, no
stub, no new omit.

## Hallucinations / overclaim

None. The "6 L ratio misread the split" framing is verified true —
the three arms were genuinely absent (previously `// deferred`
comments, now live). "Named: none new" accurate.

## Density

Completion of 3 arms in one split function, one JS module. Small but
whole (the remaining body shipped in D-0937/D-0953/D-1027/D-1665);
right-sized.

## Verification

- `node scripts/imports.mjs --rulecheck` → clean (no new module edges).
- Diff grep: 0 FORCE/DIAG/getRngLog/fastforward hits.
- D-log Verify claims PASS + smoke REACH-OK. Re-measured:
  `hidden-proxy.mjs verify floorfood --base d46334a6~1 --reach-all` →
  0 blocked at baseline and working tree (vacuous-note path, correctly
  framed) + `smoke 24/24 PASS, 0 regressed → REACH-OK`. Confirmed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
