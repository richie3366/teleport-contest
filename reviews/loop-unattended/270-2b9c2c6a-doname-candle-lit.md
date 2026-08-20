# Review 270 — 2b9c2c6a — objnam.c doname candle / lamp (lit) (D-1308)

## Metadata
- Full / short hash: `2b9c2c6af185fcb581768ffd3ca77cf24ec27261` / `2b9c2c6a`
- Parent: `b97b1fc6` (D-1307). This file audits **this SHA only**. Archive row **Addressed:** D-1308 `2b9c2c6a` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 21:14:42 +0200
- D-id: **D-1308**
- Stats: 11 files, +136 / −34 — `js/objnam.js` +48 / −4; `js/mkobj.js` +2 / −2.
- Claims to close: Open `objnam.c` candle `partly used` (named from D-1295 / review **257** / **268**). Not MEAT_RING. `reviews/loop-2026-08-15/` has no unpaid candle Must-fix.
- JS / map: `objnam.js` `doname`; `mkobj.js` `mksobj_init`; `c-js-map/turns.md` + `data.md`. Candelabrum / leash / W_TOOL worn / POT_OIL `(lit)` named.
- Prior reviews this SHA claims to close: **257** named candle `partly used` after MEAT_RING; **268** landmark still listed it.

## Intent vs deliverable

Git subject promises: “Match C objnam.c doname so a burned-down candle shows partly used (and a lit lamp or candle shows (lit)), instead of skipping the TOOL lamp/candle arm.”

C `doname_base` TOOL (`objnam.c:1455–1478`): after candelabrum, `OIL_LAMP` / `MAGIC_LAMP` / `BRASS_LANTERN` / `Is_candle`. Candle: `turns_left = age`; if `lamplit`, `+= peek_timer(BURN_OBJECT, obj) - moves`; if `turns_left < 20L * oc_cost` then `"partly used "` on **prefix**. Then `" (lit)"` on **bp**. `break` before `oc_charged` charges. Producer `mksobj_init` (`mkobj.c:989–993`): tallow/wax `age = 20L * oc_cost` (200 / 400), `spe=1`, `quan = 1 + (rn2(2) ? rn2(7) : 0)`. `Is_candle` (`obj.h:382–383`): tallow or wax only. `peek_timer` (`timeout.c:2324–2332`): `func_index` + arg pointer, returns **absolute** timeout (not remaining).

Old JS: TOOL charges only; candle start-age comment deferred (age stayed generic).

The diff **does** the candle prefix, lamp/candle `(lit)`, skip charges on that arm, and `mksobj` start age. It does **not** port candelabrum `(n of 7)`, LEASH attached, W_TOOL\|W_SADDLE `(being worn)`, or POT_OIL `(lit)`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| doname TOOL lamp/candle | C `:1455–1478`, **wired** | prefix + `(lit)` + break before charges |
| `mksobj_init` candle age | C `:989–993`, **wired** | `20 * oc_cost` |
| `Is_candle_obj` | C `obj.h:382`, **clone** | tallow \|\| wax; cycle vs timeout |
| `peek_burn_object` | C `peek_timer`, **clone** | same walk as live `mkobj.js` `peek_timer` |
| `peek_timer` | C `timeout.c:2324`, **exists in mkobj.js** | not imported (objnam↔mkobj cycle) |
| `BURN_OBJECT` | C timeout index, **imported live** | |
| candelabrum `(n of 7)` | C `:1447–1454`, **named omit** | earlier arm, `break` |
| LEASH / W_TOOL worn | C `:1427–1445`, **named omit** | |
| POT_OIL `(lit)` | C POTION, **named omit** | not this TOOL arm |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new gameplay RNG** in `doname` (pure formatter). `mksobj` still `rn2(2)?rn2(7)` for quan (pre-existing); age is now deterministic from `oc_cost`.

## C ↔ JS fidelity

Pinned C (`objnam.c:1455–1478`):

```
        } else if (obj->otyp == OIL_LAMP || obj->otyp == MAGIC_LAMP
                   || obj->otyp == BRASS_LANTERN || Is_candle(obj)) {
            if (Is_candle(obj)) {
                … turns_left = obj->age;
                if (obj->lamplit)
                    turns_left += peek_timer(BURN_OBJECT, &timer) - svm.moves;
                if (turns_left < full_burn_time)
                    Strcat(prefix, "partly used ");
            }
            if (obj->lamplit)
                Concat(bp, 0, " (lit)");
            break;
        }
```

JS: `Is_candle_obj && TOOL` then `turns_left = age`, lit `+= peek_burn_object - moves`, strict `<` not `<=`. Fresh `mksobj` age equals `20*oc_cost` so a new candle is **not** partly used. Lit wished candle: C comment `:1465–1471` — `begin_burn` splits age into leftover + timer; reconstructing with `peek_timer - moves` avoids a false “partly used (lit)”. Local peek walks `game._timer_base` with `action===BURN_OBJECT && curr.obj===obj` and returns `timeout` — same as exported `mkobj.js` `peek_timer` (`timer_base()` is `game`). Cycle clone, not a no-op. If the walk missed, every lit candle would show partly used; journal canary **35**/35 includes `begin_burn` reconstruct.

`(lit)` is on lamps **and** candles; `partly used` is candles only. Magic lamp is in `isLampOrCandle` so it can show `(lit)` without a burn-age prefix. Charges skipped when `isLampOrCandle` — C `break` before `oc_charged`. MEAT_RING path untouched.

This is **not** “Match C doname TOOL dispatch, `peek_timer` is a stub.” The formatter plus producer age are the hunk; peek is a field-faithful clone of a live callee.

## Hallucinations / overclaim

Subject + D-1308 say a burned-down candle shows `partly used` and a lit lamp/candle shows `(lit)`. **Prefix + suffix + mksobj age are the hunk.** Stamping **Addressed:** D-1308 is fair. Do **not** stamp “Match C candelabrum `(n of 7)`.” Do **not** stamp “Match C leash attached.” Do **not** stamp “Match C W_TOOL `(being worn)`.” Do **not** stamp “Match C POT_OIL `(lit)`.” Do **not** stamp “Match C `begin_burn` split” beyond what peek reconstructs for the name.

## Density

One TOOL arm plus the producer field that makes `< 20*oc_cost` meaningful. ~40 JS lines. Candelabrum is a sibling `if` with its own `break`, correctly not glued. Right size (§2b).

## Branch-by-branch confirm

1. Fresh tallow: age 200, not partly used, not `(lit)`. Match `:992–993` + `:1473`.
2. Fresh wax: age 400. Match.
3. Burned `age < 20*oc_cost`, unlit: `"partly used "` on prefix after BUC/greased. Match.
4. `turns_left == full_burn_time`: not partly used (`<` not `<=`). Match.
5. Lit + live BURN_OBJECT: reconstruct; may drop the prefix. Match `:1462–1471`.
6. Lit lamp/lantern/magic lamp/candle: `" (lit)"` on bp. Match `:1476–1477`.
7. Identified oil lamp: no `(recharged:spe)` charges. Match `break`.
8. Candelabrum / leash / worn blindfold: unchanged. Named.
9. POT_OIL: still no `(lit)`. Named.
10. **Public-unhit** unless a session shows a burned-down or lit candle/lamp name (seed0361 tower candles journal **PASS**).

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Local timer walk, not `readFileSync`. Plain ESM.

## Verification

Journal: private canary **35**/35; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383; seed0361 PASS. **Public-unhit** unless a burned-down or lit candle/lamp is named on screen. Cadence this audit: full `sessions` at HEAD `734449dc` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `36+0.30/turn` (R² 0.85). I did not re-run the private canary.

## Actionable C-wrongs

None for Must-fix. Candle `< 20*oc_cost` prefix, lit reconstruct via absolute timeout − moves, lamp/candle `(lit)`, charge `break`, and `mksobj` 200/400 match C `:1455–1478` / `:989–993` / `timeout.c:2324–2332`.

Named omits (map, not Must-fix):

1. CANDELABRUM_OF_INVOCATION `(n of 7 candle{s attached|, lit})`
2. LEASH `(attached to …)`
3. W_TOOL\|W_SADDLE `(being worn)`
4. POTION POT_OIL `(lit)`

Do not Must-fix “local `peek_timer` vs import.” Do not Must-fix `(lit)` after the unused containing-items suffix on a candle. Do not Must-fix MEAT_RING. Next Open after this SHA was `mattacku` AT_TENT (now D-1309).

## Callers / RNG ledger

C: every `doname` / `xprname` of a lamp or candle; `mksobj` of tallow/wax. JS: same. This SHA adds **no** `rn2`. Public fortress default inventory is not evidence a partly-used candle printed.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: burned-down candles now take C’s `partly used` prefix and lit lamps/candles take `(lit)`; candelabrum / leash / worn tool / oil potion stay named.
- Must-fix stays empty for this SHA; archive **Addressed:** D-1308 `2b9c2c6a` already filled by the next port commit.
