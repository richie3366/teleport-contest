# Review 1717 — a93c20957 — getspell cmdq + traditional prompt (D-2758)

- SHA: `a93c20957` (`spell.c` getspell: cmdq replay + traditional yn prompt, D-2758)
- Files: `js/spell.js` (+85), `js/lock.js` (1-word export)
- D-log: D-2758; queue row: Open (`getspell` THIN), 0 corpus blocks
- Banned grep on diff: 0 hits

## Intent vs deliverable

Subject promises the cmdq-replay arm + traditional yn prompt. Diff
delivers: new `spell_let_to_idx`, `getspell` restarted in C order
(guards → cmdq → traditional → CAST menu), `QUITCHARS` exported from
lock.js. Promise kept.

## Inventory

| JS symbol | Class | C counterpart |
|-----------|-------|---------------|
| `spell_let_to_idx` (local — C staticfn ✓) | C callee | `spell.c:114–126` |
| `getspell` (local, restarted) | C body | `spell.c:714–783` |
| `QUITCHARS` (now exported) | C const | `decl.c:96` |

`sym.mjs`: `cmdq_pop`, `yn_function` (async, awaited), `num_spells`,
`can_chant`, `MENU_TRADITIONAL`, `CMDQ_KEY`, `Never_mind` all live;
`dospellmenu` pre-existing same-file local. No deleted symbols.

## C ↔ JS fidelity

`spell_let_to_idx`: a-z→0–25, A-Z→26–51, else −1 — exact. `getspell`:
no-spells `You("don't know any spells right now.")` — the
`pline("You don't…")`→`You("don't…")` refactor is output-identical;
rejectcasting guard prints the same three C strings in C order
(`Stunned` → `can_chant` → arms), and the clone tests the predicates in
the same order, so the site-print split is observable-identical at this
call site (map-named debt stands); cmdq arm pops, accepts `CMDQ_KEY`
plus the legacy `'key'` tag whose pushers I verified still exist
(apply.js:5221, dig.js:2445, iactions.js:59), bounds-checks, FALSE
otherwise — matches `:729–743`; traditional arm: `lets` 4-way
construction, `qbuf` with ` *?`, retry cap 10 + "That's enough tries.",
`yn_function(qbuf, null, '\0', true)`, `*`/`?` break, quitchars →
`pline(Never_mind)`, unknown → "don't know that spell." retry — exact
vs `:745–781`. `QUITCHARS ' \r\n\x1b'` ≡ C `" \r\n\033"`. `yn_function`
null-resp: verified the explicit `if (!resp)` accept-any arm in
`tty_yn_function` (getline.js) — no throw. `menu_style` default
MENU_FULL only applies when `game.flags` is absent; otherwise direct
compare like C. Caller `docast :824` pre-wired, signature unchanged. No RNG.

Note (not this SHA's wrong, no queue): the clone has a pre-existing
second caller (`spelleffects_check`, spell.js:1841) that stays silent on
TRUE exactly as before this SHA; C calls `rejectcasting` only from
`getspell`. Untouched here.

## Hallucinations / overclaim

None. "Output-identical" claims check out string-for-string; the
`pline1 ≡ pline` note is correct (no `%` in Never_mind).

## Density

~85 insertions for a 68-line C body + callee + prompt table: right-sized.

## Verification

Re-ran `hidden-proxy.mjs verify getspell --base a93c20957~1 --reach-all`
→ 0 blocked, smoke 24/24 REACH-OK. Matches the bullet (row cited 0).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
