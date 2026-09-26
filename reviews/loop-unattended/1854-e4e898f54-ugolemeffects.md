# Review 1854 — e4e898f54 — ugolemeffects (D-2895)

- SHA: `e4e898f54` (coverage; `polyself.c` `ugolemeffects`)
- Files: `js/mhitu.js` (export), `js/explode.js`, `js/uhitm.js`, `js/zap.js` (ten call sites)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunk. `imports.mjs --rulecheck`: "Rule #2 clean". `imports.mjs --can` for `explode.js`, `uhitm.js`, and `zap.js` into `mhitu.js` `ugolemeffects` → `ALREADY` (no new edge).

## Intent vs deliverable

Subject promises one exported `ugolemeffects` with the C `switch`, and the ten call sites that were not the monster-attack local. The diff exports the function, keeps the heal, and adds those calls. `sym.mjs`:

```
ugolemeffects js/mhitu.js:684   ASYNC
exercise      js/attrib.js:201   sync
```

No symbol was deleted. The five `mhitu.js` calls were already on the local function.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `ugolemeffects` | export `mhitu.js:684` | `polyself.c:2160–2188` |
| `exercise` | live import | `exercise(A_STR, TRUE)` at `:2186` |
| `pline` | live | the one sentence |
| explode | caller | `explode.c:619` `ugolemeffects(adtyp, damu)` |
| passive | callers | `uhitm.c:6072` COLD, `:6095` FIRE, `:6108` ELEC |
| `zapyourself` | callers | `zap.c:2742` ELEC, `:2760` FIRE, `:2781` COLD |
| `zhitu` | callers | `zap.c:4427` FIRE, `:4446` COLD, `:4516` ELEC |
| mhitu | callers, already live | `mhitu.c:1494`, `:1508`, `:1523`, `:1658`, `:1838` |

## C ↔ JS fidelity

`csym` body is `polyself.c:2160–2188`. No RNG. The comment above the switch says slow and haste are not implemented. The `switch` has `AD_ELEC` and `AD_FIRE` only. JS has the same two cases and an empty `default`.

Return unless `umonnum` is `PM_FLESH_GOLEM` or `PM_IRON_GOLEM` (`:2169`). Electricity heals a flesh golem by `(dam + 5) / 6` (`Math.trunc`, toward zero, same as C for a negative `dam`). Fire heals an iron golem by `dam`. Any other type leaves `heal` at 0. If `heal` is nonzero and `mh < mhmax`, add it, clamp to `mhmax`, set `disp.botl`, `pline`, then `exercise(A_STR, true)`. `bot()` reads `game.flags.botl` (`botl.js:590`), so both stores are set. `if (!u) return` does not run once `game.u` exists.

`explode.js:717` is after `destroy_items` and before the grab that doubles `damu`, matching `explode.c:617–619`. Passive resist arms call it with `tmp` and then `break`, before `mdamageu`. `zhitu` and `zapyourself` pass the `d()` result taken before the resist test (`orig_dam` / `orig_dmg`), which is the C `orig_dam` / `orig_dmg` argument. `mhitu.js:3912` passes `mattk.adtyp` (`:3842`), matching `:1658`. The fiery-gaze call is `ugolemeffects(AD_FIRE, d(12, 6))` (`:3787`, C `:1838`).

## Hallucinations / overclaim

`shieldeff` and `monstseesu` on the zap resist arms and on `passive` are still absent. The commit names those lines and does not pretend this SHA added them. Monster `golemeffects` at `explode.c:525` is a different function and stays unported. The subject says the ten missing sites. The other five C calls were already in `mhitu.js`. Counting both sets is the full caller list.

## Density

The whole 30-line body and every C call of this function. Not a heal formula left inside one attack.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify ugolemeffects --base e4e898f54~1 --reach-all`.

```
verify ugolemeffects: baseline e4e898f54~1 (scoreboard at 008e05138) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke ugolemeffects: no RNG-tagged reach; fixed smoke spread (12 run, 3.3s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. A polymorphed golem is not a baseline-PASS corpus frame for this name.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
