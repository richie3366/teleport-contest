# Review 3069 — 1f9aec9ab — invault runs makemon's appear/occupation tail

- SHA: `1f9aec9ab` (last cliffs row: invault, scen-vault-Tourist-53456001
  step 387)
- D-entry: D-4229; Ledger: invault ported
- `js/` diff: vault.js +6 −1 (import + one awaited call + comment)

## Intent vs deliverable

Promise: vault.c invault summons the guard with `makemon(PM_GUARD, x,
y, MM_EGD | MM_NOMSG)`. makemon's tail (makemon.c `:1502–1504`, outside
the MM_NOMSG gate) runs `if (go.occupation) dochugw(mtmp, FALSE)`. That
stops the counted search, so C prints «You stop searching.» before
«Suddenly one of the Vault's guards enters!». JS's makemon is sync and
leaves that tail to `makemon_appear_msg`, which invault never called.

Diff: import `makemon_appear_msg` from makemon.js, and `await
makemon_appear_msg(guard, guard.mx, guard.my, MM_EGD | MM_NOMSG)` right
after the null check, before `isgd` / `mpeaceful`. The diff matches the
promise.

## Inventory

- invault — js/vault.js (C vault.c `:316–629`, per `csym.mjs
  invault`). The touched lines follow C `:407–410`.
- Callee newly called: makemon_appear_msg (makemon.js:3900, async, the
  JS split of makemon `:1430–1504`). It is LIVE: appear Norep under
  `!MM_NOMSG`, then the `game.occupation` → `dochugw(mtmp, false)` tail.

```text
$ node scripts/sym.mjs makemon_appear_msg
makemon_appear_msg js/makemon.js:3900   ASYNC — await required
$ node scripts/sym.mjs makemon
makemon          js/makemon.js:3355   sync
```

  Nothing was deleted or re-pointed. The import edge already existed
  (vault.js → makemon.js).

## C ↔ JS fidelity

C makemon tail `:1472–1504` (makemon `:1146–1510`): `if (!in_mklev) {
newsym; if (!(mmflags & MM_NOMSG)) {…Norep…}; if (go.occupation)
dochugw(mtmp, FALSE); }`.

- newsym: done by sync makemon (makemon.js:3851–3852, `!in_mklev`).
  Matches.
- Appear Norep: makemon_appear_msg skips it under MM_NOMSG, as C
  does.
- Group drain (`_grpAppearPending`, MM_ASYNCGROUP): a guard has no
  group, so it is a no-op.
- `dochugw(mtmp, false)` when occupied: JS `typeof game.occupation ===
  'function'`. JS dochugw (monmove.js:3002) ports C monmove.c
  `:203–238` arm for arm.
- Placement: in C the tail runs inside makemon, before invault's
  `:408–410` (`isgd`, `mpeaceful`, set_malign). JS awaits it at the
  same point, so it matches. Everything after (EGD init, `++uinvault`,
  reset_faint `:423`, boulder shatter, the `:442` entry pline,
  stop_occupation `:494`) is unchanged and in C order.

No RNG: dochugw with chug FALSE does not call dochug.

**The stated mechanism is wrong.** The subject, the D-entry and the new
JS comment all say dochugw stops the search "against the
still-hostile guard". It does not. PM_GUARD carries `M2_PEACEFUL`
(monsters.h `:2724`), so makemon's `mtmp->mpeaceful = … peace_minded(ptr)`
(`:1299`) returns TRUE at `always_peaceful` (`:2272–2273`). The guard is
already peaceful when the tail runs, and invault's `mpeaceful = 1` is
redundant. The stop comes from dochugw's **Hallucination** arm (`:225`,
`Hallucination || (!mpeaceful && …)`). The recorded session's status
line reads «… Xp:3 Hallu» at steps 380–391. So in a non-hallucinating
game neither side stops at makemon. The code is right whichever arm
fires, but the comment tells the next reader the wrong thing.

The arm that fires depends on JS dochugw's `game.u?.Hallucination`.
That is the stored mirror (written in potion.js:1167/1185,
timeout.js:1290, artifact.js:1097), not the imported `Hallucination()`
that monmove.js already has at `:62`. That is the same mirror family as
the Blind clone (reviews 2960/3044). It belongs to monmove.c, so it is
outside this SHA's scope, and it held for this session.

## Same-C-file sites

vault.c has a single makemon call (`:407`), and it is now followed by
its tail. No vault.js site is left.

## Hallucinations / overclaim

- The mechanism text is false, as shown above. The JS comment at
  vault.js:695–698 repeats it.
- C cite drift in the D-entry: "invault `:380–620`, makemon `:500`,
  isgd/mpeaceful `:502–503`, entry pline `:534`". Pinned values are
  invault `:316–629`, makemon `:407`, isgd/mpeaceful `:409–410`, pline
  `:442`. stop_occupation `:494` and makemon `:1502–1504` are right.

## Density

One awaited callee, the last cliffs row. Right-sized.

## Verification

```text
hidden-proxy verify invault --base 1f9aec9ab~1 --no-reach
  verify invault: baseline 1f9aec9ab~1 (scoreboard at 22e31f276) — 1 blocked
    scen-vault-Tourist-53456001: PASS
  verify invault: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
```

This agrees with the D-log (green 2/2, strict ×2, cohort 7/7, full
44/44, sweep 772/0 regressed → REACH-OK, active board 773/773).
`--rulecheck` is clean, and the diff has no FORCE, DIAG or seed reads.

## Actionable C-wrongs

None in the code of this SHA.

Debt (doc, next touch of vault.js or D-4229): reword the vault.js
`:695–698` comment and the D-entry mechanism. The guard is peaceful out
of makemon (`:1299`, M2_PEACEFUL), and makemon's `:1502–1504` dochugw
stops the occupation through its Hallucination arm. Fix the invault C
cites too.

Verdict: **ACCEPT-WITH-DEBT**
