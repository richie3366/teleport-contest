# Review 1319 — 589d9acb — invent.c getobj: drop/apply/rub clones retire to live getobj (D-2353)

Metadata: SHA `589d9acb`, D-2353, Open queue head (no review
stamp owed). Method: full `js/` hunks read (2 files,
+24/−251); C `getobj` (`nethack-c/upstream/src/invent.c:1751-2089`
via `csym.mjs`, signature + `SORTLOOT_INVLET` / `in_doagain` /
`force_invmenu` / `yn_function` / `botl` lines) + `--callers`
(`do.c:35`, `apply.c:1793`, `apply.c:4226` confirmed) + C
`do.c:35-36` flags read; `sym.mjs` on the re-point target, all
9 deleted symbols, the 7 dropped imports, and the 3 flag
consts (all output pasted below); live `getobj`
(`js/invent.js:8047`) feature spot-check; orphan grep in
`do.js` (0 refs); added-line banned grep (0 hits);
`imports.mjs --rulecheck` (clean, re-run) + `--can` on both
new call edges (ALREADY); `hidden-proxy verify getobj --base
589d9acb~1` re-run.

## Intent vs deliverable

Subject promises retiring `getobj_drop` / `getobj_apply` /
`getobj_rub` + six letter helpers to live `getobj` with the C
word/ok/flags, enumerating each clone deficiency. Diff
delivers exactly that: 4 call sites re-pointed, 9 defs
deleted, imports trimmed, zero new modules/edges. Promise
kept.

## Inventory

- `js/do.js`: `dodrop` shop + non-shop arms →
  `getobj('drop', drop_obj_ok, GETOBJ_PROMPT | GETOBJ_ALLOWCNT)`;
  imports gain `GETOBJ_PROMPT`/`GETOBJ_ALLOWCNT`, drop 5
  invent + 1 display names now unused there.
- `js/apply.js`: `doapply` →
  `getobj('use or apply', apply_ok, GETOBJ_NOFLAGS)`;
  `dorub` → `getobj('rub', rub_ok, GETOBJ_NOFLAGS)`; 7 defs
  deleted, replaced by C-cited retirement comments.
- Named: wield/ready/dip/stash/charge/write/zap/rub_on_stone
  clones, `display_pickinv` body, `readchar_core` fuzzer (own
  rows).

## C ↔ JS fidelity

Call-site closure, each against pinned C: `do.c:35-36`
`getobj("drop", any_obj_ok, GETOBJ_PROMPT | GETOBJ_ALLOWCNT)`
≡ JS word/flags ✓ (`drop_obj_ok` keeps the `:1709-1715`
shape, NULL → EXCLUDE); `apply.c:4226`
`getobj("use or apply", apply_ok, GETOBJ_NOFLAGS)` ≡ JS ✓;
`apply.c:1793` `getobj("rub", rub_ok, GETOBJ_NOFLAGS)` ≡ JS ✓
(all three ok-fns return EXCLUDE on NULL — `apply.js:297`,
`:5013`, `do.js` drop arm). Target is LIVE, not a clone:
`getobj` (`js/invent.js:8047`, ASYNC) carries the exact
features the clones missed — `SORTLOOT_INVLET` sort
(`:7909`, invletter_value not charCode), `in_doagain`,
`force_invmenu`, `yn_function`, `display_pickinv`,
`silly_thing`, `botl` — each confirmed in the live body and
in C (`invent.c` same names). Both `--can` edges ALREADY (no
new module pairs); all 3 flag consts live in `const.js`.
No STUB in any live arm — callee closure holds.

Required `sym.mjs` output:

```text
getobj           js/invent.js:8047   ASYNC — await required
getobj_drop / getobj_apply / getobj_rub / drop_raw_lets /
drop_suggest_lets / apply_lets / apply_prompt_lets /
apply_has_downplay / rub_suggest_lets — all NOT FOUND in js/**
compactify_invlets js/invent.js:7456 sync; getobj_take_count :7530 ASYNC;
getobj_apply_count :7830 ASYNC; getobj_from_cmdq :7657 sync;
getobj_display_pickinv :7790 ASYNC; mark_topline_prompt js/display.js:2716 sync;
getobj_record_repeat js/invent.js:7615 sync (all still live at their homes)
GETOBJ_NOFLAGS const.js:2212; GETOBJ_PROMPT :2211; GETOBJ_ALLOWCNT :2210
```

Dropped imports have zero remaining refs in `do.js` (grep
clean); deleted defs have zero refs tree-wide. Net behavior
moves toward C on every listed deficiency (yn_function,
?/* pickinv, DOWNPLAY altlets, silly_thing, botl).

## Hallucinations / overclaim

None. The deficiency list is verifiable line-by-line
against the deleted bodies (raw `nhgetch`, charCode sort,
rub `?`/`*` re-prompt, hardcoded silly_thing all present in
the `-` lines). No dispatch/stub shape.

## Density

One envelope (three prompt clones of one C function),
+24/−251. Deletion-heavy clone retirement — right-sized.

## Verification

D-log: `verify.mjs --fn getobj` PASS (syntax 2 files / rule2
/ hidden-vacuous-disclosed / green 2/2 / strict ×2 / cohort
7/7 / full 44/44 auto). Re-measured:

```text
verify getobj: baseline 589d9acb~1 — 0 session(s) blocked on it
  (0 at baseline, 0 working) — vacuous, NOT a corpus PASS
```

Matches; row cited 0 blocks so no older `--base` owed.
Added-line banned grep 0 hits; `--rulecheck` clean; both new
call edges ALREADY.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
