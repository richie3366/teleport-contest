# Review 2987 — 521fd733a — basics' find_ac and gold lines run only under BASIC

- SHA: `521fd733a` (cliff; owner exercise → writer doattributes /
  basics_enlightenment, 2 rows)
- D-entry: D-4147; Ledger: basics_enlightenment split
  js=invent.js:enlightenment+invent.js:doattributes; doattributes ported
- `js/` diff: js/invent.js +20/−20 (code moved, not changed)

## Intent vs deliverable

Promise: insight.c enlightenment runs basics_enlightenment only when
`mode & BASICENLIGHTENMENT` (`:406–413`). Its gold lines call
`currency()`, which draws `rn2` while hallucinating (invent.c
`:1545–1554`). A blessed/uncursed potion of hallucination's enlightenment
is MAGIC-only (potion.c `:707–712`). JS doattributes built the wallet
strings and called find_ac at the top for every mode, so each MAGIC-only
enlightenment while hallucinating spent one extra core `rn2`.

Diff: the `wallet` / `walletCont` block (currency ×≤2, hidden_gold,
money_cnt_local) and `find_ac(); acBuf = …` move from the prologue into
`if (mode & BASICENLIGHTENMENT) { … }`, after
`background_enlightenment`. The promise matches the diff. No line
changes text.

## Inventory

- `doattributes` — invent.js:7911–…; C insight.c doattributes /
  enlightenment `:383–…` (BASIC block `:406–413`).
- `basics_enlightenment` (split) — C insight.c `:728–826`: HP `:732–744`,
  find_ac `:772–777`, gold `:779–802`.
- Callee `currency` — invent.js (live); C invent.c:1545–1554 (`rn2` under
  Hallucination).
- Callee `find_ac` — live import; C do_wear.c find_ac (no RNG).

## C ↔ JS fidelity

C order inside `if (mode & BASICENLIGHTENMENT)`: background_enlightenment
→ basics_enlightenment (HP, Pw, AC via find_ac, gold) →
characteristics_enlightenment. JS now runs background, then find_ac +
acBuf, then the gold strings, all inside the same mode test. The HP / Pw
/ hit-dice strings stay in the prologue. They read fields only (no RNG,
no output), so computing them early is unobservable.

I scanned the doattributes prologue (invent.js:7911–7968) for `rn2`,
`rnd`, `currency`, `hcolor`, `rndmonnam`, `bogus` and `await`. Nothing
is left before the mode test. The two `currency()` calls keep C's
order: wallet `:788`, then the stashed line `:799`, the latter only when
`umoney == 0`. So a hallucinating BASIC enlightenment still draws 1–2
`rn2`, as C does.

## Hallucinations / overclaim

None. "No longer roll currency or run find_ac" for MAGIC-only callers is
literally what the move does. The Named line keeps the D-2579 split omit
(basics spread across doattributes and enlightenment's final path), and
the ledger records the split.

## Density

A pure move into the C guard. It fixed both owner rows.

## Verification

```text
verify exercise (--base 521fd733a~1): scen-intrinsic-Healer-51152004 PASS,
  scen-sweep-Barbarian-50456006 PASS → PROGRESS
verify enlightenment / doattributes: 0 blocked
```

Exact match with the D-log (2 PASS).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
