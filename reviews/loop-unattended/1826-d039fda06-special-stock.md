# Review 1826 — d039fda06 — special_stock and shkcatch (D-2867)

- SHA: `d039fda06` (coverage; `shk.c` `special_stock`, `shkcatch`)
- Files: `js/shk.js` (+88/−13), `js/zap.js` (+18/−5)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises `special_stock` (Izchak keeps the Candelabrum and counts candles) and `shkcatch` (a thrown pick). The diff adds both. `sym.mjs`:

```
special_stock    NOT EXPORTED — local js/shk.js:2704
shkcatch         js/shk.js:2748   ASYNC — await required
```

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `special_stock` | local `shk.js:2704` | `shk.c:3102–3144` |
| `shkcatch` | export `shk.js:2748` | `shk.c:4361–4396` |
| `SetVoice` | existing `!SND_LIB` no-op | `shk.c` voice calls |
| `mnearto` | import `mon.js:2160`, returns 2 | displaced monster |
| `mpickobj` | import, sync | `shk.c:4392` |

## C ↔ JS fidelity

`special_stock` (`shk.c:3102–3144`). Callers: `:3994` inside `sellobj` (`:131` is the static declaration). Both the shop type and `CANDELABRUM_OF_INVOCATION` are required. `quietly` skips the speech and still returns true. Izchak before invocation: deaf or mute is the horrified/concerned `pline` from `spe < 7`; otherwise the hang-onto line, then when `spe < 7` the candle count `7 - spe`, the word " more" only when `spe > 0`, and `plur`. Anyone else: the two-space "I won't stock that.  Take it out of here!" when they can speak, else the head-shake. Then true. Any other object is false. No RNG. The `:3124–3125` candle note is a comment. `sellobj` (`shk.js:2890–2892`) passes `false` and prints "seems uninterested" only when this returns false, matching `:3993–3995`.

`shkcatch` (`shk.c:4361–4396`). Caller `zap.c:3886` inside `bhit`, after `isok` and before terrain. A null keeper or one not in the shop returns null. The catch requires not helpless, the hero not in this shop (`*u.ushops != shoproom` or not `inside_shop` at the hero; empty `ushops` is 0), `dist2 < 3`, and not already on the square. `mnearto` returning 2 plus a keeper who can speak says "Out of my way, scum!". `mnearto` (`mon.js:2204–2212`) sets that 2 when another monster was moved. `cansee` prints the catch line, " reaches over and" only when the keeper is not yet on the square, then `map_invisible` when the keeper is unseen, then `nh_delay_output`. `mark_synch` is `tty` `fflush` with no JS stdout, named. Then `subfrombill`, `mpickobj`, return the keeper. Otherwise null.

`bhit` (`zap.js:5955–5961`) calls it on a pick inside a shop, ends the beam, sets `bhit_done`, and breaks. The post-loop `tmp_at` and shop-door bill (`:6201`, `:6213`) both require `!bhit_done`. `transient_light_cleanup` still runs for thrown and kicked weapons, which is after the C `bhit_done` label (`zap.c:4132–4136`).

`hero_deaf` (`shk.js:1713`) is the existing local `Deaf` and also reads `u.Deaf`. `youprop.h:125` is `HDeaf || EDeaf || u.uroleplay.deaf`. That extra flag is the module's existing stand-in, not a new arm.

## Hallucinations / overclaim

Both functions are the C bodies. `SetVoice` and `mark_synch` are named omissions, not claimed as speech or a flush.

## Density

The candle shop is the whole `special_stock` body. `shkcatch` is the whole catch predicate plus the `bhit` call. 106 insertions.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify <fn> --base d039fda06~1 --reach-all`. Neither body is edited by a later SHA.

```
verify special_stock: baseline d039fda06~1 (scoreboard at 9d403156e) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke special_stock: no RNG-tagged reach; fixed smoke spread (12 run, 3.4s): 12 PASS, 0 regressed → REACH-OK
verify shkcatch: baseline d039fda06~1 (scoreboard at 9d403156e) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke shkcatch: no RNG-tagged reach; fixed smoke spread (12 run, 3.2s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
